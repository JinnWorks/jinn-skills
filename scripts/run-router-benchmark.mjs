#!/usr/bin/env node
/**
 * run-router-benchmark.mjs — measure skill activation accuracy.
 *
 * "Activation accuracy" = given a realistic user task and ONLY the catalog a buyer's
 * agent sees (skill names + frontmatter descriptions, never skill bodies), does the
 * router rank the correct skill first (top-1) or in the top three (top-3)? Weak
 * descriptions are the failure mode; this quantifies it per model and per skill.
 *
 * LOCAL-ONLY: shells out to `claude -p` (headless), which cannot run in CI. See
 * benchmarks/README.md. Zero npm dependencies — Node ≥20 stdlib only.
 *
 * Modes:
 *   --standard  haiku + sonnet × 1 rep × (core + hard prompts). The routine,
 *               cost-bounded regression run — comes in under the --budget ceiling
 *               (default $20). Opus is dropped (it is the cost driver, ~half a deep
 *               run) and belongs to --deep; at 100%-saturation with two models a
 *               second replication adds negligible signal, so regression-detection
 *               lives in the hard tier + --paraphrase, not in reps. Bump --reps for
 *               a heavier routine run (watch the budget).
 *   --deep      haiku + sonnet + opus × 3 reps × (core + hard prompts). The
 *               pre-release / cited-claim run (~$50). Alias: --full.
 *   --smoke     fixtures file only, 1 model (haiku), 1 replication — cheap gate.
 *               Exits 1 if any fixture's top-1 lands in that fixture's rejected_skills.
 *
 * The core set and the hard tier are scored and reported SEPARATELY: the hard tier
 * is the true-frontier sibling-confusion set where a description regression is most
 * likely to show. Headline top-1 is over original wording only.
 *
 * Flags:
 *   --out <path>          report destination (default: stdout for smoke, a dated file otherwise)
 *   --models a,b,c        override the model list
 *   --reps N              override replication count
 *   --concurrency N       parallel `claude -p` calls (default 6)
 *   --prompts <path>      override the core prompt set
 *   --hard <path>         override the hard-tier prompt set (default router/prompts-hard.jsonl)
 *   --no-hard             skip the hard tier
 *   --paraphrase N        also run N deterministic wording variants per prompt (robustness; default 0)
 *   --paraphrase-tier T   only paraphrase prompts of tier T (e.g. `hard`); default: all loaded prompts
 *   --budget N            stop dispatching once summed cost reaches $N (default: 20 for --standard, off otherwise)
 *   --limit N             only run the first N core prompts (smoke-testing the runner itself)
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdtempSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = process.cwd()
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)
const val = (f, d) => { const i = argv.indexOf(f); return i >= 0 && argv[i + 1] ? argv[i + 1] : d }

const MODE = has('--smoke') ? 'smoke' : has('--standard') ? 'standard' : 'deep' // --deep / --full / default → deep
const CONCURRENCY = Number(val('--concurrency', '6'))
const LIMIT = val('--limit') ? Number(val('--limit')) : Infinity
const DEFAULT_MODELS = { smoke: ['haiku'], standard: ['haiku', 'sonnet'], deep: ['haiku', 'sonnet', 'opus'] }
const DEFAULT_REPS = { smoke: 1, standard: 1, deep: 3 }
const MODELS = val('--models') ? val('--models').split(',') : DEFAULT_MODELS[MODE]
const REPS = Number(val('--reps', String(DEFAULT_REPS[MODE])))
const PARAPHRASE = Number(val('--paraphrase', '0'))
const PARAPHRASE_TIER = val('--paraphrase-tier', null)
// Default budget ceiling: only the routine run is guarded; deep/smoke run uncapped unless asked.
const BUDGET = val('--budget') ? Number(val('--budget')) : (MODE === 'standard' ? 20 : Infinity)
const PROMPTS_PATH = val('--prompts', MODE === 'smoke'
  ? join(ROOT, 'benchmarks/fixtures/activation-cases.jsonl')
  : join(ROOT, 'benchmarks/router/prompts.jsonl'))
const HARD_PATH = val('--hard', join(ROOT, 'benchmarks/router/prompts-hard.jsonl'))
const USE_HARD = MODE !== 'smoke' && !has('--no-hard')

// --- Inputs ------------------------------------------------------------------
function parseFrontmatter(src) {
  if (!src.startsWith('---')) return {}
  const end = src.indexOf('\n---', 3)
  if (end === -1) return {}
  const out = {}
  for (const line of src.slice(3, end).split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
  return out
}

function loadCatalog() {
  const dir = join(ROOT, 'skills')
  const entries = []
  for (const slug of readdirSync(dir).sort()) {
    const p = join(dir, slug, 'SKILL.md')
    if (!statSync(join(dir, slug)).isDirectory() || !existsSync(p)) continue
    const fm = parseFrontmatter(readFileSync(p, 'utf8'))
    entries.push({ slug, description: fm.description || '' })
  }
  return entries
}

function loadPrompts(path, tier) {
  return readFileSync(path, 'utf8').split('\n').filter((l) => l.trim()).map((l, i) => {
    let obj
    try { obj = JSON.parse(l) } catch { throw new Error(`${path} line ${i + 1}: invalid JSON`) }
    return { tier: obj.tier || tier, ...obj }
  })
}

// Deterministic, zero-LLM wording variants. Meaning-preserving conversational
// envelopes only — never a synonym/semantic rewrite (that would need an LLM and
// leak the "zero-LLM" property into the benchmark). variant 0 is always the
// original; 1..N wrap it so we measure robustness to surface phrasing, not intent.
const ENVELOPES = [
  (t) => t,
  (t) => `Hey — ${t}`,
  (t) => `${t} Thanks!`,
  (t) => `Quick one: ${t}`,
  (t) => `Could you help me with this? ${t}`,
]
function paraphrase(text, variant) {
  const fn = ENVELOPES[variant % ENVELOPES.length]
  return fn(text)
}

const catalog = loadCatalog()
const catalogSlugs = new Set(catalog.map((c) => c.slug))
const catalogBlock = catalog.map((c) => `- \`${c.slug}\`: ${c.description}`).join('\n')
const template = readFileSync(join(ROOT, 'benchmarks/router/routing-prompt.md'), 'utf8')

let prompts = loadPrompts(PROMPTS_PATH, MODE === 'smoke' ? 'fixture' : 'core')
if (Number.isFinite(LIMIT)) prompts = prompts.slice(0, LIMIT)
if (USE_HARD && existsSync(HARD_PATH)) prompts = prompts.concat(loadPrompts(HARD_PATH, 'hard'))

// Empty MCP config so `claude -p` loads no MCP servers (smaller, cheaper context).
const tmp = mkdtempSync(join(tmpdir(), 'router-bench-'))
const emptyMcp = join(tmp, 'empty-mcp.json')
writeFileSync(emptyMcp, '{"mcpServers":{}}')

// --- One model call ----------------------------------------------------------
function buildPrompt(task) {
  return template.replace('{{CATALOG}}', catalogBlock).replace('{{TASK}}', task)
}

function callClaude(model, promptText) {
  return new Promise((resolve) => {
    const child = spawn('claude',
      ['-p', '--model', model, '--output-format', 'json', '--strict-mcp-config', '--mcp-config', emptyMcp],
      { stdio: ['pipe', 'pipe', 'pipe'] })
    let out = '', err = ''
    child.stdout.on('data', (d) => (out += d))
    child.stderr.on('data', (d) => (err += d))
    child.on('error', (e) => resolve({ ok: false, reason: `spawn: ${e.message}` }))
    child.on('close', () => {
      let resultStr = null, cost = 0
      try {
        const parsed = JSON.parse(out)
        const resultObj = Array.isArray(parsed)
          ? [...parsed].reverse().find((e) => e && e.type === 'result')
          : parsed
        if (!resultObj || resultObj.is_error) return resolve({ ok: false, reason: `cli: ${resultObj?.subtype || err.slice(0, 120) || 'no result'}` })
        resultStr = typeof resultObj.result === 'string' ? resultObj.result : JSON.stringify(resultObj.result)
        cost = resultObj.total_cost_usd || 0
      } catch { return resolve({ ok: false, reason: `unparseable CLI output: ${err.slice(0, 120) || out.slice(0, 120)}` }) }
      // Strip markdown fences the model often wraps JSON in, then take the first {...}.
      let s = resultStr.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
      const lo = s.indexOf('{'), hi = s.lastIndexOf('}')
      if (lo >= 0 && hi > lo) s = s.slice(lo, hi + 1)
      try {
        const obj = JSON.parse(s)
        if (!Array.isArray(obj.ranking)) return resolve({ ok: false, reason: 'no ranking array', cost })
        return resolve({ ok: true, ranking: obj.ranking, confidence: obj.confidence, rationale: obj.rationale, cost })
      } catch { return resolve({ ok: false, reason: 'malformed routing JSON', cost }) }
    })
    child.stdin.write(promptText)
    child.stdin.end()
  })
}

async function callWithRetry(model, promptText) {
  const first = await callClaude(model, promptText)
  if (first.ok) return first
  const second = await callClaude(model, promptText) // retry once on any failure
  return second.ok ? second : { ...second, cost: (first.cost || 0) + (second.cost || 0) }
}

// --- Build the job list ------------------------------------------------------
// Each prompt expands into (1 + PARAPHRASE) wording variants when paraphrase is on
// and the prompt's tier matches --paraphrase-tier (or no tier filter). variant 0 is
// the original wording and carries the headline score; variants 1..N feed robustness.
const jobs = []
for (const model of MODELS) for (let rep = 0; rep < REPS; rep++) for (const p of prompts) {
  const doParaphrase = PARAPHRASE > 0 && (!PARAPHRASE_TIER || p.tier === PARAPHRASE_TIER)
  const variants = doParaphrase ? PARAPHRASE + 1 : 1
  for (let v = 0; v < variants; v++) jobs.push({ model, rep, variant: v, p })
}

// --- Run pool (with optional budget ceiling) ---------------------------------
const results = []
let done = 0
let runningCost = 0
let budgetHit = false
const started = Date.now()
async function worker(iter) {
  for (const job of iter) {
    if (runningCost >= BUDGET) { budgetHit = true; break } // stop pulling new jobs once the ceiling is reached
    const task = job.variant === 0 ? job.p.prompt : paraphrase(job.p.prompt, job.variant)
    const res = await callWithRetry(job.model, buildPrompt(task))
    runningCost += res.cost || 0
    results.push({ ...job, res })
    done++
    if (done % 10 === 0 || done === jobs.length) {
      process.stderr.write(`\r  ${done}/${jobs.length} calls  $${runningCost.toFixed(2)}/${Number.isFinite(BUDGET) ? '$' + BUDGET : '∞'}  (${((Date.now() - started) / 1000).toFixed(0)}s)   `)
    }
  }
}
function* drain(arr) { for (const x of arr) yield x }
const shared = drain(jobs)
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, jobs.length) }, () => worker(shared)))
process.stderr.write('\n')
if (budgetHit) process.stderr.write(`\n⚠ budget ceiling $${BUDGET} reached — ran ${done}/${jobs.length} calls. Report is partial.\n`)

// --- Score -------------------------------------------------------------------
const top1 = (ranking, expected) => Array.isArray(ranking) && ranking[0] === expected
const top3 = (ranking, expected) => Array.isArray(ranking) && ranking.slice(0, 3).includes(expected)

// Headline bins are computed over ORIGINAL wording only (variant 0); paraphrase
// variants feed a separate robustness section so the headline stays comparable.
const original = results.filter((r) => r.variant === 0)
const paraVariants = results.filter((r) => r.variant > 0)

const byModel = {}
for (const m of MODELS) byModel[m] = { n: 0, t1: 0, t3: 0, fmt: 0 }
const bySkill = {}   // expected_primary -> {n,t1}
const byTier = {}    // tier -> {n,t1,t3,fmt}
let totalCost = 0
for (const r of results) totalCost += r.res.cost || 0
for (const r of original) {
  const exp = r.p.expected_primary_skill
  const mm = byModel[r.model]
  const sk = (bySkill[exp] ||= { n: 0, t1: 0 })
  const tr = (byTier[r.p.tier] ||= { n: 0, t1: 0, t3: 0, fmt: 0 })
  mm.n++; sk.n++; tr.n++
  if (!r.res.ok) { mm.fmt++; tr.fmt++; continue }
  if (top1(r.res.ranking, exp)) { mm.t1++; sk.t1++; tr.t1++ }
  if (top3(r.res.ranking, exp)) { mm.t3++; tr.t3++ }
}
const totalFmt = original.filter((r) => !r.res.ok).length

// Paraphrase robustness: over variant>0 calls, does the router still rank the
// expected skill first despite the reworded surface? Reported per tier.
const paraByTier = {}
for (const r of paraVariants) {
  const tr = (paraByTier[r.p.tier] ||= { n: 0, t1: 0, fmt: 0 })
  tr.n++
  if (!r.res.ok) { tr.fmt++; continue }
  if (top1(r.res.ranking, r.p.expected_primary_skill)) tr.t1++
}

// --- Report ------------------------------------------------------------------
const pct = (num, den) => (den ? ((num / den) * 100).toFixed(1) + '%' : 'n/a')
const now = new Date().toISOString()
let md = `# Router activation benchmark — ${now.slice(0, 10)}\n\n`
if (MODE === 'standard') md += `> Mode: **standard** (routine cost-bounded regression run). The cited public claim comes from a **deep** run — see README.\n\n`
if (budgetHit) md += `> ⚠ **Partial run** — the $${BUDGET} budget ceiling was reached after ${done}/${jobs.length} calls.\n\n`
md += `Measures whether the correct skill ranks first (top-1) or in the top three (top-3) `
md += `for a realistic task, given only the catalog's names + descriptions — exactly what a buyer's agent sees.\n\n`
md += `## Per-model activation accuracy (original wording)\n\n`
md += `| Model | Prompts×reps | Top-1 | Top-3 | Format failures |\n|---|---|---|---|---|\n`
for (const m of MODELS) {
  const s = byModel[m]
  md += `| ${m} | ${s.n} | ${pct(s.t1, s.n - s.fmt)} | ${pct(s.t3, s.n - s.fmt)} | ${s.fmt} |\n`
}
const grandN = original.length, grandT1 = MODELS.reduce((a, m) => a + byModel[m].t1, 0)
const grandT3 = MODELS.reduce((a, m) => a + byModel[m].t3, 0)
md += `| **all** | ${grandN} | ${pct(grandT1, grandN - totalFmt)} | ${pct(grandT3, grandN - totalFmt)} | ${totalFmt} |\n\n`
md += `_Top-1/top-3 are over successfully-parsed calls; format failures are reported separately._\n\n`

md += `## Per-tier activation (original wording)\n\n`
md += `| Tier | Prompts×reps | Top-1 | Top-3 | Format failures |\n|---|---|---|---|---|\n`
for (const [tier, s] of Object.entries(byTier).sort()) {
  md += `| ${tier} | ${s.n} | ${pct(s.t1, s.n - s.fmt)} | ${pct(s.t3, s.n - s.fmt)} | ${s.fmt} |\n`
}
md += `\n_The **hard** tier is the true-frontier sibling-confusion set — where a description regression shows first._\n\n`

if (paraVariants.length) {
  md += `## Paraphrase robustness (reworded surface, same intent)\n\n`
  md += `Each prompt re-asked under ${PARAPHRASE} deterministic wording envelope(s)${PARAPHRASE_TIER ? ` (tier: ${PARAPHRASE_TIER})` : ''}; measures whether routing survives phrasing changes it wasn't tuned on.\n\n`
  md += `| Tier | Variant calls | Top-1 | Format failures |\n|---|---|---|---|\n`
  for (const [tier, s] of Object.entries(paraByTier).sort()) {
    md += `| ${tier} | ${s.n} | ${pct(s.t1, s.n - s.fmt)} | ${s.fmt} |\n`
  }
  md += `\n`
}

md += `## Per-skill top-1 (worst first, original wording)\n\n`
md += `| Skill (expected primary) | Prompts×reps | Top-1 |\n|---|---|---|\n`
for (const [slug, s] of Object.entries(bySkill).sort((a, b) => a[1].t1 / a[1].n - b[1].t1 / b[1].n)) {
  md += `| \`${slug}\` | ${s.n} | ${pct(s.t1, s.n)} |\n`
}
md += `\n## Run config (reproducibility)\n\n`
md += `- Mode: \`${MODE}\`${budgetHit ? ' (PARTIAL — budget ceiling hit)' : ''}\n- Models: ${MODELS.join(', ')}\n- Replications: ${REPS}\n`
md += `- Core prompts: \`${PROMPTS_PATH.replace(ROOT + '/', '')}\`\n`
if (USE_HARD && existsSync(HARD_PATH)) md += `- Hard tier: \`${HARD_PATH.replace(ROOT + '/', '')}\`\n`
md += `- Prompts loaded: ${prompts.length}  ·  Paraphrase variants/prompt: ${PARAPHRASE}${PARAPHRASE_TIER ? ` (tier ${PARAPHRASE_TIER})` : ''}\n`
md += `- Total calls: ${done}${budgetHit ? ` of ${jobs.length} planned` : ''}  ·  Concurrency: ${CONCURRENCY}\n`
md += `- Format failures: ${totalFmt}/${grandN} original (${pct(totalFmt, grandN)})\n`
md += `- Budget ceiling: ${Number.isFinite(BUDGET) ? '$' + BUDGET : 'none'}\n`
md += `- Approx. cost (sum of \`total_cost_usd\`): $${totalCost.toFixed(2)}\n`
md += `- Wall clock: ${((Date.now() - started) / 1000).toFixed(0)}s\n`
md += `- Command: \`node scripts/run-router-benchmark.mjs ${argv.join(' ')}\`\n`
md += `- Generated: ${now}\n`

// --- Smoke gate --------------------------------------------------------------
let exitCode = 0
if (MODE === 'smoke') {
  const violations = []
  for (const r of results) {
    if (!r.res.ok) continue
    const rejected = r.p.rejected_skills || []
    if (rejected.includes(r.res.ranking[0])) {
      violations.push(`${r.p.prompt_id}: top-1 \`${r.res.ranking[0]}\` is a rejected skill (expected \`${r.p.expected_primary_skill}\`)`)
    }
  }
  md += `\n## Smoke gate (boundary fixtures)\n\n`
  if (violations.length) {
    md += violations.map((v) => `- ✗ ${v}`).join('\n') + '\n'
    exitCode = 1
  } else {
    md += `✓ no fixture's top-1 landed in its rejected list (${prompts.length} fixtures, model ${MODELS.join('/')}).\n`
  }
}

const outPath = val('--out', MODE === 'smoke' ? null : join(ROOT, `benchmarks/router/results/${now.slice(0, 10)}.md`))
if (outPath) { writeFileSync(outPath, md); process.stderr.write(`\nReport written to ${outPath}\n`) }
else { process.stdout.write('\n' + md) }
process.exit(exitCode)

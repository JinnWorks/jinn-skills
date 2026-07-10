#!/usr/bin/env node
/**
 * skill-health.mjs — deterministic, zero-LLM, zero-dependency corpus lint.
 *
 * Complements validate-skills.mjs: the validator checks the Agent Skills *schema*
 * (frontmatter name + description, slug match); this checks *body quality* — that
 * every SKILL.md carries the house anatomy the catalog's grounding contract depends
 * on, and that the README stays in sync with the directory.
 *
 * The canonical hard-required section list was derived empirically by reading the
 * shipped catalog, not invented: only checks that ALL 21 shipped skills satisfy are
 * hard failures, so a green corpus stays green. Habits the catalog does NOT yet hold
 * uniformly (the ~250-350 char band, the "Sharpest when connected…" closer, the
 * field→drives table, dead links) are warnings that name the outliers without failing.
 *
 *   Hard failures (exit 1): a missing anatomy section, or a README↔directory parity break.
 *   Warnings (exit 0):      description-band / closer / field-table / footer / dead-link /
 *                           stale-date / unbacked-numeric-claim / claim-drift outliers.
 *
 * Usage: node scripts/skill-health.mjs            # human report, exit 1 on hard failure
 *        node scripts/skill-health.mjs --json      # machine-readable report to stdout
 *        node scripts/skill-health.mjs --selftest  # exercise the heuristic detectors, exit 1 on regression
 *        node scripts/skill-health.mjs --stale-days N   # override the stale-date window (default 180)
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'

const ROOT = process.cwd()
const argv = process.argv.slice(2)
const JSON_OUT = argv.includes('--json')
const SELFTEST = argv.includes('--selftest')
const STALE_DAYS = (() => { const i = argv.indexOf('--stale-days'); return i >= 0 && argv[i + 1] ? Number(argv[i + 1]) : 180 })()
const NOW = new Date()

const CLOSER = "Sharpest when connected to Jinn's Brand DNA over MCP." // straight-apostrophe house closer
const CLOSER_CURLY = 'Sharpest when connected to Jinn’s Brand DNA over MCP.'
const DESC_MIN = 250
const DESC_MAX = 350

// A quantitative *claim* shape (a percentage, a multiplier, an N-of-M, an N%+ / N+
// count) — NOT a deliverable count like "5 headlines" or "4–6 personas", which are
// instructions, not claims that need backing. Kept deliberately narrow to stay quiet.
const NUMERIC_CLAIM = /(\b\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?x\b|\b\d+\s+of\s+\d+\b|\b\d{2,}\+)/i
// A backing signal near a claim: a link, a footnote, a parenthetical source, a
// benchmarks/ reference, or an explicitly illustrative marker.
const HAS_BACKING = /\]\(|\[\^|benchmarks\/|\(source|\(see |\be\.g\.|\bfor example\b|`/i
const ISO_DATE = /\b(\d{4})-(\d{2})-(\d{2})\b/g

/** Dates in `src` older than `windowDays` before `now` — surfaces rotting examples/claims. */
function staleDates(src, now, windowDays) {
  const cutoff = now.getTime() - windowDays * 86400_000
  const stale = []
  for (const m of src.matchAll(ISO_DATE)) {
    const t = Date.parse(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`)
    if (!Number.isNaN(t) && t < cutoff) stale.push(m[0])
  }
  return [...new Set(stale)]
}

/** Prose lines carrying a quantitative claim with no adjacent backing. Skips tables + fenced code. */
function unbackedNumericClaims(body) {
  const hits = []
  let inFence = false
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (line.startsWith('```')) { inFence = !inFence; continue }
    if (inFence || line.startsWith('|') || line.startsWith('#')) continue // tables + headings aren't prose claims
    if (NUMERIC_CLAIM.test(line) && !HAS_BACKING.test(line)) hits.push(line.slice(0, 80))
  }
  return hits
}

/** Parse a leading `---\n...\n---` frontmatter block into a flat key→value map. */
function parseFrontmatter(src) {
  if (!src.startsWith('---')) return null
  const end = src.indexOf('\n---', 3)
  if (end === -1) return null
  const block = src.slice(3, end).trim()
  const out = {}
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
  return out
}

/** A single check result. hard=true contributes to exit-1 on failure. */
function check(name, pass, hard, detail) {
  return { name, pass: !!pass, hard, detail: detail || '' }
}

/** Resolve relative markdown links in `src` (a file at `file`) and flag any that miss on disk. */
function deadLinks(src, file) {
  const dead = []
  const re = /\]\(([^)]+)\)/g
  let m
  while ((m = re.exec(src))) {
    let target = m[1].trim()
    if (/^(https?:|#|mailto:)/.test(target)) continue // external / anchor / mail
    target = target.split('#')[0].replace(/\/$/, '') // drop anchor + trailing slash
    if (!target) continue
    const abs = resolve(dirname(file), target)
    if (!existsSync(abs)) dead.push(m[1].trim())
  }
  return dead
}

function lintSkill(slug) {
  const file = join(ROOT, 'skills', slug, 'SKILL.md')
  const checks = []
  if (!existsSync(file)) {
    return { slug, checks: [check('skill-md-present', false, true, 'no SKILL.md')], score: 0 }
  }
  const src = readFileSync(file, 'utf8')
  const fm = parseFrontmatter(src) || {}
  const desc = fm.description || ''
  const body = src.replace(/^---[\s\S]*?\n---/, '') // strip frontmatter

  // Hard anatomy — every shipped skill satisfies all four.
  checks.push(check('section:procedure', /^##\s+Procedure/im.test(src), true, 'no `## Procedure` heading'))
  checks.push(check('section:failure-block', /^##\s+When a .*call fails/im.test(src), true, 'no `## When a … call fails` heading'))
  checks.push(check('grounding-2call', /get_token_context/.test(src) && /get_brand_dna_public/.test(src), true,
    'missing the invariant get_token_context → get_brand_dna_public sequence'))

  // Soft habits — majority holds; outliers reported, never failed.
  // deliverable-stated is a warning, not hard: 18/21 use the word, but brand-messaging-audit,
  // know-your-brand-dna, and product-launch-playbook state the deliverable in prose instead.
  checks.push(check('deliverable-stated', /deliverable/i.test(body), false, 'no explicit Deliverable line/section (states output in prose)'))
  checks.push(check('desc-length-band', desc.length >= DESC_MIN && desc.length <= DESC_MAX, false,
    `description ${desc.length} chars (house band ${DESC_MIN}-${DESC_MAX})`))
  checks.push(check('desc-house-closer', desc.endsWith(CLOSER) || desc.endsWith(CLOSER_CURLY), false,
    'description does not end with the house closer'))
  checks.push(check('field-drives-table', /Projection field/i.test(body) || /→\s*Drives/i.test(body) || /\|\s*Drives\s*\|/i.test(body), false,
    'no field→Drives grounding table'))
  const lastLine = body.trim().split('\n').filter(Boolean).pop() || ''
  checks.push(check('generic-footer', /^\*.*Jinn.*\*$/.test(lastLine.trim()), false, 'no italic Jinn footer line'))
  const dead = deadLinks(src, file)
  checks.push(check('no-dead-links', dead.length === 0, false, dead.length ? `dead links: ${dead.join(', ')}` : ''))
  const stale = staleDates(src, NOW, STALE_DAYS)
  checks.push(check('no-stale-dates', stale.length === 0, false, stale.length ? `dates older than ${STALE_DAYS}d: ${stale.join(', ')}` : ''))
  const unbacked = unbackedNumericClaims(body)
  checks.push(check('numeric-claims-backed', unbacked.length === 0, false, unbacked.length ? `unbacked numeric claim(s): ${unbacked.map((h) => `"${h}"`).join('; ')}` : ''))

  const score = checks.filter((c) => c.pass).length / checks.length
  return { slug, checks, score }
}

/** Slugs listed in the README `## Skills` table (backtick-wrapped, one per row). */
function readmeSkillSlugs(readme) {
  const start = readme.indexOf('## Skills')
  if (start === -1) return null
  const rest = readme.slice(start + 1)
  const end = rest.indexOf('\n## ')
  const section = end === -1 ? rest : rest.slice(0, end)
  const slugs = new Set()
  for (const m of section.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|/gim)) slugs.add(m[1])
  return slugs
}

/**
 * Claim drift: the results file cited in the README vs the newest *deep/full* run on
 * disk. Standard (routine) runs are not citation candidates, so they never trip this.
 * Returns { cited, newest } basenames when a newer deep run exists uncited, else null.
 */
function claimDrift(readme) {
  const dir = join(ROOT, 'benchmarks/router/results')
  if (!existsSync(dir)) return null
  const citedM = readme.match(/results\/([0-9A-Za-z._-]+\.md)/)
  const cited = citedM ? citedM[1] : null
  if (!cited) return null
  // Rank by the in-file `Generated:` timestamp, never by filename — same-date files
  // with a `-v2` suffix sort the wrong way lexically (`-` < `.`).
  const meta = (f) => {
    const src = readFileSync(join(dir, f), 'utf8')
    const mode = (src.match(/^-\s*Mode:\s*`?(\w+)/im) || [])[1]
    const gen = (src.match(/^-\s*Generated:\s*(\S+)/im) || [])[1]
    return { f, mode, t: gen ? Date.parse(gen) : NaN }
  }
  const deep = readdirSync(dir).filter((f) => f.endsWith('.md')).map(meta)
    .filter((x) => (x.mode === 'full' || x.mode === 'deep') && !Number.isNaN(x.t))
  if (!deep.length) return null
  const newest = deep.reduce((a, b) => (a.t >= b.t ? a : b))
  const citedT = deep.find((x) => x.f === cited)?.t ?? (existsSync(join(dir, cited)) ? meta(cited).t : NaN)
  if (newest.f !== cited && (Number.isNaN(citedT) || newest.t > citedT)) return { cited, newest: newest.f }
  return null
}

// --- Self-test: exercise the heuristic detectors (one pass + one fail each) ------
if (SELFTEST) {
  const fails = []
  const t = (name, cond) => { if (!cond) fails.push(name) }
  // stale-date: a 2019 date trips a 180d window; today's date does not.
  t('stale-date/fail', staleDates('shipped 2019-01-01 baseline', NOW, 180).length === 1)
  t('stale-date/pass', staleDates(`updated ${NOW.toISOString().slice(0, 10)} today`, NOW, 180).length === 0)
  // unbacked-numeric: a bare "40% faster" trips; the same with a link does not; a
  // deliverable count ("5 headlines") is not a claim and must never trip.
  t('numeric/fail', unbackedNumericClaims('Our users see 40% faster onboarding.').length === 1)
  t('numeric/pass-linked', unbackedNumericClaims('Users see 40% faster onboarding ([proof](./benchmarks/)).').length === 0)
  t('numeric/pass-deliverable', unbackedNumericClaims('Produces 5 headlines and 3 primary-text options.').length === 0)
  t('numeric/pass-multiplier-backed', unbackedNumericClaims('Ranked 2x better `see results`.').length === 0)
  if (fails.length) { console.error('✗ skill-health self-test FAILED: ' + fails.join(', ')); process.exit(1) }
  console.log('✓ skill-health self-test passed (stale-date + unbacked-numeric detectors)')
  process.exit(0)
}

// --- Run ---------------------------------------------------------------------
const skillsDir = join(ROOT, 'skills')
const agentsDir = join(ROOT, 'agents')
const skillSlugs = existsSync(skillsDir)
  ? readdirSync(skillsDir).filter((e) => statSync(join(skillsDir, e)).isDirectory()).sort()
  : []

const perSkill = skillSlugs.map(lintSkill)

// Repo-level parity (hard).
const repoChecks = []
const readmePath = join(ROOT, 'README.md')
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8')
  const listed = readmeSkillSlugs(readme)
  const onDisk = new Set(skillSlugs)
  if (listed) {
    const missingFromReadme = [...onDisk].filter((s) => !listed.has(s))
    const extraInReadme = [...listed].filter((s) => !onDisk.has(s))
    repoChecks.push(check('readme-skill-parity',
      missingFromReadme.length === 0 && extraInReadme.length === 0, true,
      [missingFromReadme.length ? `on disk not in README: ${missingFromReadme.join(', ')}` : '',
       extraInReadme.length ? `in README not on disk: ${extraInReadme.join(', ')}` : ''].filter(Boolean).join('; ')))
  } else {
    repoChecks.push(check('readme-skill-parity', false, true, 'could not find the `## Skills` table in README'))
  }
  // Persona count line ("Personas — 29 …") vs agents/*.md count.
  const agentCount = existsSync(agentsDir) ? readdirSync(agentsDir).filter((e) => e.endsWith('.md')).length : 0
  const pm = readme.match(/Personas?\s*[—-]\s*(\d+)/)
  repoChecks.push(check('readme-persona-parity', pm ? Number(pm[1]) === agentCount : false, true,
    pm ? `README says ${pm[1]} personas, agents/ has ${agentCount}` : 'no "Personas — N" count line in README'))
  const dead = deadLinks(readme, readmePath)
  repoChecks.push(check('readme-no-dead-links', dead.length === 0, false, dead.length ? `dead links: ${dead.join(', ')}` : ''))
  const rStale = staleDates(readme, NOW, STALE_DAYS)
  repoChecks.push(check('readme-no-stale-dates', rStale.length === 0, false, rStale.length ? `dates older than ${STALE_DAYS}d: ${rStale.join(', ')}` : ''))
  // Claim drift (Unit 4): a newer deep run exists but the README still cites an older one.
  const drift = claimDrift(readme)
  repoChecks.push(check('claim-not-stale', !drift, false,
    drift ? `README cites ${drift.cited} but ${drift.newest} is a newer deep run — re-run scripts/sync-readme-claim.mjs to re-cite` : ''))
} else {
  repoChecks.push(check('readme-present', false, true, 'no README.md'))
}

const allChecks = [...perSkill.flatMap((s) => s.checks), ...repoChecks]
const hardFails = allChecks.filter((c) => c.hard && !c.pass)
const warns = allChecks.filter((c) => !c.hard && !c.pass)
const corpus = perSkill.length ? perSkill.reduce((a, s) => a + s.score, 0) / perSkill.length : 0

if (JSON_OUT) {
  console.log(JSON.stringify({
    corpus_health: Number(corpus.toFixed(4)),
    skills: perSkill.map((s) => ({ slug: s.slug, score: Number(s.score.toFixed(3)),
      fails: s.checks.filter((c) => !c.pass).map((c) => ({ check: c.name, hard: c.hard, detail: c.detail })) })),
    repo: repoChecks.map((c) => ({ check: c.name, pass: c.pass, hard: c.hard, detail: c.detail })),
    hard_failures: hardFails.length, warnings: warns.length,
  }, null, 2))
  process.exit(hardFails.length ? 1 : 0)
}

console.log('Skill-health lint\n=================')
for (const s of perSkill) {
  const flags = s.checks.filter((c) => !c.pass)
  const tag = flags.some((c) => c.hard) ? 'FAIL' : flags.length ? 'warn' : 'ok  '
  console.log(`  [${tag}] ${s.slug.padEnd(30)} ${(s.score * 100).toFixed(0).padStart(3)}%`)
  for (const c of flags) console.log(`         ${c.hard ? '✗' : '·'} ${c.name}: ${c.detail}`)
}
console.log('\nRepo-level')
for (const c of repoChecks) {
  if (c.pass) { console.log(`  [ok  ] ${c.name}`); continue }
  console.log(`  [${c.hard ? 'FAIL' : 'warn'}] ${c.name}: ${c.detail}`)
}
console.log(`\nCorpus health: ${(corpus * 100).toFixed(1)}%   hard failures: ${hardFails.length}   warnings: ${warns.length}`)
if (hardFails.length) {
  console.error('\n✗ hard failures present — fix before merge.')
  process.exit(1)
}
console.log('\n✓ no hard failures (warnings do not block).')

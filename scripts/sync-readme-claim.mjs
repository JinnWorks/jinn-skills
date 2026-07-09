#!/usr/bin/env node
/**
 * sync-readme-claim.mjs — regenerate the README "Measured activation" block from a
 * benchmark results file, so the published claim's numbers are NEVER hand-typed.
 *
 * The block lives between two markers in README.md:
 *   <!-- measured-activation:start -->  …generated…  <!-- measured-activation:end -->
 * Everything outside the markers is left byte-for-byte untouched.
 *
 * Which results file backs the claim:
 *   default        the file the README currently cites (so a no-arg run is a no-op /
 *                  reproduces the current block byte-for-byte).
 *   --from <path>  render from a specific results file (use to *promote* a new deep
 *                  run to the public claim). Only a full/deep run should back the
 *                  public claim — a standard (routine) run drops opus.
 *   --check        don't write; exit 1 if the block is out of sync (zero-LLM, CI-safe).
 *
 * Zero dependencies — Node ≥20 stdlib only.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'

const ROOT = process.cwd()
const argv = process.argv.slice(2)
const val = (f) => { const i = argv.indexOf(f); return i >= 0 && argv[i + 1] ? argv[i + 1] : null }
const CHECK = argv.includes('--check')

const START = '<!-- measured-activation:start -->'
const END = '<!-- measured-activation:end -->'
const readmePath = join(ROOT, 'README.md')
const readme = readFileSync(readmePath, 'utf8')

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const word = (n) => (n >= 0 && n < WORDS.length ? WORDS[n] : String(n))
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

function fail(msg) { console.error(`✗ ${msg}`); process.exit(1) }

// Resolve the source results file.
let fromArg = val('--from')
if (!fromArg) {
  const m = readme.match(/results\/([0-9A-Za-z._-]+\.md)/)
  if (!m) fail('no results file cited in README and no --from given')
  fromArg = join(ROOT, 'benchmarks/router/results', m[1])
}
if (!existsSync(fromArg)) fail(`results file not found: ${fromArg}`)
const results = readFileSync(fromArg, 'utf8')
const file = basename(fromArg)

// --- Extract the measured facts (never invent one) ---------------------------
const grab = (re, label) => { const m = results.match(re); if (!m) fail(`could not read ${label} from ${file}`); return m }

const prompts = Number(grab(/\((\d+)\s+prompts\)|Prompts loaded:\s*(\d+)/i, 'prompt count').slice(1).find(Boolean))
const models = grab(/^-\s*Models:\s*(.+)$/im, 'models')[1].split(',').map((s) => s.trim()).filter(Boolean)
const reps = Number(grab(/^-\s*Replications:\s*(\d+)/im, 'replications')[1])
const trials = Number(grab(/^-\s*Total calls:\s*(\d+)/im, 'total calls')[1])
const ff = Number(grab(/^-\s*Format failures:\s*(\d+)\s*\//im, 'format failures')[1])
const top1 = grab(/\|\s*\*\*all\*\*\s*\|[^|]*\|\s*([\d.]+%)\s*\|/i, 'top-1 (all models)')[1]
// Skill count = distinct rows in the per-skill table.
const skillMatches = [...results.matchAll(/^\|\s*`[a-z0-9-]+`\s*\|/gim)]
const skills = skillMatches.length
if (!skills) fail(`could not count skills in the per-skill table of ${file}`)

const top1Short = top1.replace(/\.0%$/, '%')
const modelNames = models.map(cap).join(', ')

const block = `${START}
## Measured activation — ${top1Short} top-1

A skill only helps if your agent picks the right one when you ask. We benchmark exactly that: ${prompts} realistic marketing requests, shown to ${word(models.length)} frontier Claude models (${modelNames}) ${word(reps)} times each — ${trials} trials — with only the catalog's names and descriptions to go on, the same view your agent gets.

**Result: the correct skill ranked first in ${top1} of trials — every model, all ${skills} skills, ${word(ff)} format failures.** The benchmark measures routing (the right skill fires), not output quality. Harness, prompts, and full results are in this repo — run it yourself: [\`benchmarks/\`](./benchmarks/), latest report [\`benchmarks/router/results/${file}\`](./benchmarks/router/results/${file}).
${END}`

// --- Splice into README ------------------------------------------------------
const si = readme.indexOf(START), ei = readme.indexOf(END)
if (si === -1 || ei === -1) fail(`README is missing the ${START} … ${END} markers — add them around the claim block once, then re-run`)
const next = readme.slice(0, si) + block + readme.slice(ei + END.length)

if (next === readme) { console.log(`✓ README claim block already in sync with ${file}`); process.exit(0) }
if (CHECK) fail(`README claim block is OUT OF SYNC with ${file} — run: node scripts/sync-readme-claim.mjs${fromArg !== readmePath ? ` --from ${fromArg.replace(ROOT + '/', '')}` : ''}`)
writeFileSync(readmePath, next)
console.log(`✓ README claim block regenerated from ${file}`)

#!/usr/bin/env node
/**
 * Validate every skills/<name>/SKILL.md and agents/<name>.md against the Agent
 * Skills spec (agentskills.io): a YAML frontmatter block with non-empty `name`
 * and `description`, and a `name` that matches the directory/file slug.
 *
 * This mirrors the checks `skills-ref validate` performs; it's inlined so CI is
 * self-contained and locally runnable (`node scripts/validate-skills.mjs`).
 * Swap in `skills-ref` here once it's a pinned dependency.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const errors = []

/** Parse a leading `---\n...\n---` frontmatter block into a flat key→value map. */
function parseFrontmatter(src, file) {
  if (!src.startsWith('---')) {
    errors.push(`${file}: missing YAML frontmatter (must start with ---)`)
    return null
  }
  const end = src.indexOf('\n---', 3)
  if (end === -1) {
    errors.push(`${file}: unterminated frontmatter (no closing ---)`)
    return null
  }
  const block = src.slice(3, end).trim()
  const out = {}
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
  return out
}

// Strict-YAML discoverability: installers (skills.sh CLI et al.) parse frontmatter
// with a real YAML parser and SILENTLY DROP any skill whose block doesn't parse.
// Our regex parser above is lenient, so it can't see the failure — this check
// replicates the two plain-scalar killers: an unquoted value containing ': '
// (reads as a nested mapping → parse error) or ' #' (starts a YAML comment →
// truncated value). 9 skills shipped undiscoverable this way on 2026-07-11.
function checkYamlDiscoverable(file, src) {
  const end = src.indexOf('\n---', 3)
  if (!src.startsWith('---') || end === -1) return
  for (const line of src.slice(3, end).trim().split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) continue
    const raw = m[2]
    const isQuoted = /^".*"$/.test(raw) || /^'.*'$/.test(raw)
    if (isQuoted) continue
    if (raw.includes(': '))
      errors.push(`${file}: unquoted '${m[1]}' value contains ': ' — strict YAML reads a nested mapping and installers silently DROP the skill; quote the whole value or swap the colon for a dash`)
    if (raw.includes(' #'))
      errors.push(`${file}: unquoted '${m[1]}' value contains ' #' — strict YAML truncates it as a comment; quote the whole value`)
  }
}

function checkDoc(file, expectedName) {
  const src = readFileSync(file, 'utf8')
  const fm = parseFrontmatter(src, file)
  if (!fm) return
  checkYamlDiscoverable(file, src)
  if (!fm.name) errors.push(`${file}: frontmatter missing 'name'`)
  if (!fm.description) errors.push(`${file}: frontmatter missing 'description'`)
  if (fm.description && fm.description.length < 20)
    errors.push(`${file}: 'description' too short (<20 chars) — spec wants a real trigger description`)
  if (fm.name && expectedName && fm.name !== expectedName)
    errors.push(`${file}: frontmatter name '${fm.name}' != slug '${expectedName}'`)
}

// Post-install intro convention (playbook §1.10, 2026-07-15): every skill ships a
// first-run intro — "What just became possible" + "Try this now" (3–5 paste-ready
// prompts) + "Compounds with". Mandatory for every NEW skill. The 2026-07-16 backfill
// sweep landed the intro on 58 of the 59 pre-convention skills, so the convention is
// now hard-enforced on them. The list below is the remaining debt — remove each slug as
// its intro lands, so the list stays the debt tracker.
// know-your-brand-dna is STOP'd pending Dan's decision #29 (2026-07-16) and stays grandfathered.
const PRE_INTRO_LEGACY = new Set([
  'know-your-brand-dna',
])
const warnings = []

function checkIntroConvention(file, slug) {
  const src = readFileSync(file, 'utf8')
  const missing = []
  if (!/^#{2,3}\s+.*what just became possible/im.test(src)) missing.push('What just became possible')
  if (!/^#{2,3}\s+.*try this now/im.test(src)) missing.push('Try this now')
  if (!/^#{2,3}\s+.*compounds with/im.test(src)) missing.push('Compounds with')
  if (missing.length === 0) {
    // Sections present — hold the prompt floor regardless of legacy status.
    const tryBlock = src.split(/^#{2,3}\s+.*try this now.*$/im)[1]?.split(/^#{2,3}\s+/m)[0] ?? ''
    const prompts = (tryBlock.match(/`[^`\n]{10,}`/g) || []).length
    if (prompts < 3)
      errors.push(`${file}: 'Try this now' has ${prompts} paste-ready prompt(s) in backticks — §1.10 wants 3–5`)
    return
  }
  const msg = `${file}: missing post-install intro section(s): ${missing.join(', ')} (playbook §1.10)`
  if (PRE_INTRO_LEGACY.has(slug)) warnings.push(`${msg} — grandfathered pending backfill`)
  else errors.push(msg)
}

// skills/<slug>/SKILL.md
const skillsDir = join(ROOT, 'skills')
if (existsSync(skillsDir)) {
  for (const entry of readdirSync(skillsDir)) {
    const dir = join(skillsDir, entry)
    if (!statSync(dir).isDirectory()) continue
    const skillMd = join(dir, 'SKILL.md')
    if (!existsSync(skillMd)) {
      errors.push(`skills/${entry}: missing SKILL.md`)
      continue
    }
    checkDoc(skillMd, entry)
    checkIntroConvention(skillMd, entry)
  }
}

// agents/<slug>.md
const agentsDir = join(ROOT, 'agents')
if (existsSync(agentsDir)) {
  for (const entry of readdirSync(agentsDir)) {
    if (!entry.endsWith('.md')) continue
    checkDoc(join(agentsDir, entry), entry.replace(/\.md$/, ''))
  }
}

if (warnings.length) {
  console.warn(`⚠ ${warnings.length} warning(s) (non-blocking):`)
  for (const w of warnings) console.warn(`  - ${w}`)
}
if (errors.length) {
  console.error(`✗ ${errors.length} validation error(s):`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('✓ all skills + agents valid (frontmatter, slug match, §1.10 intro on post-legacy skills)')

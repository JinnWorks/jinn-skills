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

function checkDoc(file, expectedName) {
  const src = readFileSync(file, 'utf8')
  const fm = parseFrontmatter(src, file)
  if (!fm) return
  if (!fm.name) errors.push(`${file}: frontmatter missing 'name'`)
  if (!fm.description) errors.push(`${file}: frontmatter missing 'description'`)
  if (fm.description && fm.description.length < 20)
    errors.push(`${file}: 'description' too short (<20 chars) — spec wants a real trigger description`)
  if (fm.name && expectedName && fm.name !== expectedName)
    errors.push(`${file}: frontmatter name '${fm.name}' != slug '${expectedName}'`)
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

if (errors.length) {
  console.error(`✗ ${errors.length} validation error(s):`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('✓ all skills + agents valid (name + description frontmatter, slug match)')

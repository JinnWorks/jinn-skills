---
name: llms-txt-generator
description: Turn one URL into a spec-compliant llms.txt — the llmstxt.org file that tells AI agents who a brand is, what it offers, and what makes it different, built only from what the site states publicly, nothing invented. Use when publishing or refreshing a brand's AI-discovery file. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# llms.txt Generator

Deliverable: **one `llms.txt` file** for a given site — a spec-compliant markdown manifest (the llmstxt.org format) that tells AI agents who the brand is, what it offers, and what makes it different, ready to drop at the domain root.

Standalone, it reads the site itself and writes only what the site actually says — no invented mission statement, no guessed differentiator. Connected to Jinn, the file describes the brand the way its own Brand DNA record defines it, not the way one page happened to word it that week — that's the whole delta.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Site URL | Required — the domain the file will describe and where it will be deployed. |
| Known key pages (optional) | About, product, and pricing URLs to read directly instead of guessing where they live. |
| Contact channel (optional) | A real support/contact email or page, if the site doesn't expose one obviously. |

### 2. Read the site — verbatim only

Read the homepage plus the handful of pages that actually carry the brand's self-description: about, product/pricing, and — if one already exists — the site's current `/llms.txt` or `/robots.txt` for hints of a structure it has already chosen. Pull only what the site states: the tagline or value proposition, product names with their one-line descriptions, named differentiators, stated values, and a real contact channel.

**Never invent.** Don't write a mission statement, founding story, or differentiator the site doesn't say — this file is read by systems that will repeat it as fact, so hold it to the same bar as an about page, not ad copy. If the site's own language is thin or vague, say so in the delivery note rather than padding it with plausible-sounding specifics.

### 3. Structure to the llms.txt spec

The format itself is public and fixed (llmstxt.org) — get this part exactly right regardless of the brand:

- `# {Official name}` — one H1, the brand's real legal or trading name.
- `> {one-line summary}` — a single blockquote, the value proposition as the site states it (a tight paraphrase is fine; a stretch isn't).
- Optional short context paragraph(s) directly under the blockquote, before the first `##` heading — use sparingly, only when the H1/blockquote alone under-explains the brand.
- `## {Section}` headings, each a markdown link list — e.g. `- [Title](https://example.com/page): one-line description.` Solid defaults for a brand site: **About**, **Products** (or **Offerings**), **What Makes Us Different**, **Contact**. Add or drop sections to match what the site actually has — don't force a section with nothing real to put in it.
- `## Optional` — the spec's own convention for lower-priority links (privacy, terms, careers) that a context-constrained reader can skip. Keep these out of the primary sections.

### 4. Quality gate (fixed — run before you deliver)

- Every fact in the file traces to something the site states publicly — no invented mission, founding story, or differentiator.
- Exactly one H1, one blockquote, and valid `[title](https://…): description` link syntax in every link line.
- The Contact section carries a real channel — never a guessed address (no `hello@brandname.com` assembled from the domain).
- Plain markdown, no HTML, opens correctly as a `.txt` file.
- Anything in `## Optional` is genuinely secondary — not a core section demoted to hit the pattern.

### 5. Deliver with a placement note

Hand over the file plus: where it goes (the domain root — `yourdomain.com/llms.txt`, never a subfolder or behind auth), and, in a couple of lines, how to get a static file served from root on the platform in play — Vercel/Netlify: drop it in the `public/` directory; WordPress: upload to the site root via SFTP or use a redirect plugin; Shopify: Settings → Files, plus a URL redirect rule, since Shopify won't serve an arbitrary root file directly; Webflow: custom code or hosting root. Flag anything you inferred loosely so the user can tighten it before publishing.

## If a Jinn MCP connection is present (grounded)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `brandName`, `officialName` | The H1 — the record's real name, not a guess off the page title. |
| `mission` | The blockquote value prop and the About section, in the brand's own recorded words instead of a paraphrase of whatever the homepage says this week. |
| `positioningWedge`, `messagingPillars` | The **What Makes Us Different** section — the wedge as the headline line, pillars as the supporting bullets. |
| `foundingStory` | A short About addition, when the field is present. |
| `coreValues` | A **Values** section — add it even when the free rung's site read found nothing to put there. |
| `tonalAttributes` | The register every description line is written in. |
| `bannedWords` | Hard filter — no line in the file uses one; flag it if the site's own copy already does. |

That's the concrete delta: instead of paraphrasing whatever marketing copy happens to be live on the page, the value prop, differentiators, and values come from the brand's own DNA record — the file describes the brand the way its record defines it, not the way one page worded it. **State which fields you used** when you deliver, same as every other grounded skill here.

Guardrail: the file still describes the brand's own real domain — never invent one from a slug guess; if the user hasn't supplied a real domain, ask. The projection carries no competitor data and no pricing — don't reference or request either.

**Best rung:** once the brand is Connected on Jinn, the file doesn't need hand-regenerating each time the brand's story shifts — the platform serves it live and keeps it current with the DNA record.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the file still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the file still ships from the site read alone. Note it's not brand-verified in the delivery note, and connect Jinn to ground the value prop and differentiators in the real record.

---

*Grounding + three-state contract by Jinn. File format is the public llmstxt.org spec. MIT.*

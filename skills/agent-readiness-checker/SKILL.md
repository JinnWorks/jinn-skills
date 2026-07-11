---
name: agent-readiness-checker
description: "Audit whether AI agents can make sense of a site once inside it: llms.txt content quality, schema.org coverage across key pages, brand-context consistency, emerging MCP-endpoint discoverability, and site-wide extraction-readiness. Use when a site is reachable but its readiness is unproven. Sharpest when connected to Jinn's Brand DNA over MCP."
---

# Agent Readiness Checker

Deliverable: **one readiness scorecard** for a given site across five dimensions — llms.txt content quality, schema.org/structured-data coverage across a key-page set, machine-readable brand-context consistency, MCP/agent-endpoint discoverability, and site-wide extraction-readiness — each dimension scored with what it is, how it was verified, and the fix.

Standalone, it runs the full readiness methodology against public fetches — the same checks any agent's own tools could run. This asks a different question than `agent-access-checker`'s: that skill checks whether a crawler can physically **reach** the site (robots.txt policy per named bot, an llms.txt structural presence/format check, one homepage Organization block) — the door. This skill assumes the door is open (or flags if it isn't, and points there) and asks whether what's behind it **makes sense to an agent that's already in**: does the llms.txt content actually describe the brand accurately, does structured-data coverage extend past the homepage to the pages that carry real information, is the brand's identity consistent across those pages, does the site expose (or plan for) the endpoints an autonomous agent would look for, and is the site's own content shaped so an agent can extract and act on it. Three more boundaries worth stating up front: this is not `llms-txt-generator` (which **writes** the file; this **audits** its quality as one of five dimensions), not `aeo-formatter` (which **rewrites one page** for answer-engine extraction; this scores extraction-readiness as a site-wide **infrastructure pattern**, across a page set, without rewriting anything), and not `citability-checker` (which scores **one piece of content** before it publishes; this audits the site's standing infrastructure, not a single draft).

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Site URL | Required — the domain to audit. |
| Key pages (optional) | About/company, primary product or pricing, one editorial/blog post, an FAQ page — URLs to check directly instead of guessing where they live. |
| Agent-access status (optional) | If `agent-access-checker` has already run, its result — skip re-deriving robots.txt/llms.txt-presence and start from readiness. |

If no key pages are supplied, infer up to four from site navigation: home, about/company, the primary product-or-pricing page, and — if present — one blog/editorial post and an FAQ page.

### 2. Fetch, no JS

Same discipline as the access check: `GET` the raw HTML response for each key page, no JS execution — this is what an agent's fetch tool sees, not what a browser renders after hydration. **Three-state rule** for every fetch and every sub-check below: a clean 200 with a real body → evaluate it. A genuine 404 → say the thing is absent, plainly. Anything else (0, 403, 5xx, a challenge page, a soft-404 served over 200, a fetch that timed out) → **unknown** — never render a positive "present" or "consistent" claim off a fetch that didn't actually resolve.

### 3. Dimension 1 — llms.txt content quality (not structural format)

If `/llms.txt` is missing or structurally malformed, say so and stop here for this dimension — that's `agent-access-checker`'s check (structural presence + the llmstxt.org shape); hand off to it if it hasn't run. If the file exists and parses, this dimension asks whether it's actually **right**, not just well-formed:

- **Name/entity match** — does the H1 match the brand's real, correctly-cased name as it appears on the site itself (not a variant, an abbreviation, or a stale legal name)?
- **Value-prop specificity** — is the blockquote line a real, specific value proposition, or generic filler ("innovative solutions for your business") that says nothing an agent could act on?
- **Differentiation substance** — does the "what makes us different" section (or equivalent) name something concrete — a wedge, a proof point, a named capability — or is it a restated tagline?
- **Section-to-site consistency** — spot-check two or three linked pages: does the file's one-line description of each match what that page actually says, or has the site drifted since the file was written?
- **Freshness** — do the linked URLs resolve (not a stale link to a retired page)?

### 4. Dimension 2 — schema.org / structured-data coverage across key pages

`agent-access-checker` checks for **any** `Organization` JSON-LD on the homepage as a binary present/absent crawlability signal. This dimension goes wider: across the full key-page set, using the shape that actually matters for AI-agent consumption —

| Page type | Expected schema | What "pass" looks like |
|-----------|------------------|-------------------------|
| Homepage / every page (sitewide) | `Organization` | Legal/trading name, logo, `sameAs` links to the brand's real social/profile URLs (helps an agent disambiguate the entity) |
| About/company | `Organization` (extended) | Founding info, address/contact where genuinely public |
| Product or pricing | `Product` (or `Offer`) | Name, description, `offers` (price, currency, availability) — what an agent pulls into a comparison or shopping answer |
| Editorial/blog post | `Article` | Headline, `datePublished`, author |
| FAQ page (if one exists) | `FAQPage` | Real question/answer pairs, not a decorative "FAQ" heading with no markup |

Score each present page type pass / partial (schema present but missing key fields) / missing / couldn't-verify. A brand with rich JSON-LD on the homepage and nothing on its product page is a partial-credit story, not a pass — say so.

### 5. Dimension 3 — machine-readable brand-context consistency

Distinct from dimension 1 (is llms.txt itself accurate) — this checks whether the brand's identity is **consistent across every machine-readable surface**, not just internally coherent in one file:

- Does the `Organization` JSON-LD `name` match the llms.txt H1 match the visible site branding — three sources, one identity?
- Do `sameAs` links (if present) actually resolve to real, currently-owned profiles?
- Is there any conflicting machine-readable claim across pages (two different taglines in two different JSON-LD blocks, a stale product name in one place and a current one in another)?

Note honestly: there is no ratified public standard for a general-purpose "brand.json" file the way there is for robots.txt or llms.txt — don't check for one as if it were a compliance requirement. This dimension is a **consistency** read across the machine-readable surfaces that do exist, not a check against a file format that doesn't.

### 6. Dimension 4 — MCP/agent-endpoint discoverability (emerging, not a standard yet)

Check for a `/.well-known/mcp.json` (or the sibling paths some early implementations use — `/.well-known/mcp-server`, `/.well-known/mcp`). **State plainly in the report that this is forward-looking, not a compliance check**: as of this pass, MCP server discovery via a well-known URI has multiple competing, unratified proposals in front of the Model Context Protocol spec process (server-card and well-known-endpoint SEPs, plus an independent IETF draft) — none is yet the standard the way RFC 9309 is for robots.txt. A miss here is an opportunity to watch, not a finding to score against the brand. If a site does expose one, note what it advertises (capabilities, auth requirements) as a genuine positive signal ahead of the field.

### 7. Dimension 5 — site-wide extraction-readiness (infrastructure, not one page)

Across the key-page set (not one page, and not rewriting anything — that's `aeo-formatter`'s job), check whether the site's own **patterns** support extraction:

- Do section openings lead with the answer, or warm up first ("In this article, we'll explore...")?
- Is there an actual FAQ section/page with real Q&A content, not just a contact form mislabeled "FAQ"?
- Are headings phrased as questions or claims ("How does X work") rather than vague labels ("Overview", "More")?
- Is enumerable information (steps, features, pricing tiers) presented as lists/tables, or buried in paragraph prose an agent has to parse out?

Score this as a pattern read across the sampled pages — e.g. "3 of 4 key pages lead with the answer, one buries it" — not a single pass/fail.

### 8. Assemble the report

Worst finding first, ranked by leverage:

```
AGENT READINESS CHECK — {domain}

Overall: <plain-English one-liner — e.g. "Reachable and mostly legible, but the product
page carries no structured data and the llms.txt differentiation line is generic.">

llms.txt content quality:      NEEDS WORK  → blockquote is generic filler; see fix below
Structured data coverage:      2 / 4 key pages pass  → [which, and what's missing]
Brand-context consistency:     CONSISTENT  → name/sameAs agree across all checked surfaces
MCP-endpoint discoverability:  NOT PRESENT (no standard yet — informational only)
Extraction-readiness:          3 / 4 pages answer-first  → [the one that doesn't]

Fixes, ranked by leverage:
  1. <the single highest-impact fix>
  2. ...
```

### 9. Fix guidance (public schema.org/llms.txt practice + our taste for ordering)

- **Generic llms.txt content** — rewrite the blockquote and differentiation section with something concrete; a well-formed file with nothing specific in it reads as noise to an agent, not signal.
- **Missing Product/Article/FAQPage schema** — add the JSON-LD block with the fields in the table above; `Organization` sitewide first, then whichever page type carries the most commercial or informational weight for this brand.
- **Identity drift across surfaces** — pick the canonical name/description and propagate it; a disambiguation failure (does "Acme" in this JSON-LD block mean the same entity as "Acme Inc." on the llms.txt) costs more than any single missing field.
- **No FAQ section on a site full of real Q&A content in prose** — extracting it into an actual `FAQPage`-marked section is usually the cheapest high-leverage fix on the whole report.
- **Order fixes by leverage, not by dimension order** — a generic-content llms.txt or a name inconsistency outranks a missing MCP well-known file every time; the latter is genuinely optional today.

## If a Jinn MCP connection is present (grounded)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `brandName`, `officialName` | Replaces a guessed canonical name for the consistency check (dimension 3) — is every machine-readable surface naming the brand the way its own record does, not just agreeing internally. |
| `mission`, `positioningWedge` | Grounds the llms.txt content-quality read (dimension 1) — is the blockquote/differentiation section actually saying what the brand's record says it is, not merely specific-sounding. |
| `messagingPillars` | Whether `Product`/`Article` schema descriptions and page copy land inside territory the brand is actually known for. |
| `tonalAttributes` | Register for any drafted fix copy (a rewritten llms.txt line, a JSON-LD description field). |
| `bannedWords` | Hard filter on any drafted fix copy. |

That's the concrete delta: instead of judging llms.txt content and schema descriptions against generic "does this sound specific" heuristics, the read is against what the brand's own record actually says. **State which fields you used** when you deliver.

Guardrail: this skill audits and recommends; it never claims to have deployed a fix — the user (or their platform) still ships the file or the schema. The projection carries no competitor data, no crawl-log history, and no pricing — don't reference or request either.

**Best rung:** once the brand is Connected on Jinn, an agent querying it doesn't need to infer identity or positioning from scraped structured data at all — the Agents product serves the brand's public context live over MCP (`get_token_context` → `get_brand_*`), and the llms.txt this checker scores can be generated straight from that same DNA record (the sibling `llms-txt-generator` skill). This skill's grounded rung approximates that read from the outside; it doesn't run the live serving path itself. Nothing here runs on a schedule — this is a one-shot check, not continuous monitoring.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the checklist still runs in full ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the checklist runs in full against the published dimensions above; note the read is ungrounded in the delivery note, and connect Jinn to check llms.txt/schema content against the brand's real record instead of generic specificity heuristics.

---

*Grounding + three-state contract by Jinn. Structured-data guidance is public schema.org/JSON-LD practice; MCP discovery is cited as an in-progress, unratified proposal, not a standard. Structure inspired by open marketing-skill patterns. MIT.*

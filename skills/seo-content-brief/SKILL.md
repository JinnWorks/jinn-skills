---
name: seo-content-brief
description: Turn 1–20 keywords plus a site URL and ICP notes into SEO content briefs — coverage check, competitor-SERP scan by web search, differentiation angle, and a section-by-section outline. No paid SEO APIs — web-search inference only. Use when deciding what to write to rank. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# SEO Content Brief

Deliverable: **one content brief per keyword** — coverage verdict, a competitor-SERP read, a differentiation angle, and a section-by-section outline a writer can draft from without guessing. Several keywords also get a ranked opportunity table. Not a keyword dump — a decision about what to write and why it beats what ranks.

This skill uses **web search only** — never a paid SEO API (no Ahrefs, Semrush, Moz, no volume/difficulty numbers from a tool). Everything about the SERP is inferred by reading it; say so, so no one reads an inference as a metric.

Works standalone. Connected to Jinn, the differentiation angle and voice come from the brand's real strategy — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Gather the inputs

| Input | What it's for |
|-------|---------------|
| Keywords (1–20) | The queries you want to rank for — head terms or long-tail, one brief each. |
| Site URL | The domain whose existing content you check for coverage and link into. |
| ICP notes | Who the reader is and the pain they're searching with — sets the angle and the sections. |
| Customer voice (optional) | Pasted reviews, support tickets, sales-call notes — the phrasing real buyers use. Sharpens the angle. |

If the keyword list is fuzzy, tighten it with the user first — a brief on the wrong query is wasted work.

### 2. Coverage check — update, net-new, or link

For each keyword, look at what the site already has (search `site:<domain>` for the term, or use pages the user names). Return one verdict:

- **Update** — a page already targets this; the brief is a rework, not a new URL. Say what it's missing.
- **Net-new** — nothing covers it; the brief is a new page.
- **Internal-link candidate** — an existing page already serves the intent; don't write a thin duplicate, add an internal link instead. This is how you avoid cannibalizing your own rankings.

### 3. Competitor scan — read the SERP

Search the keyword and read the top results. For each leader, note three things: **what ranks** (page type — listicle, guide, tool, product page), **what shape it takes** (length, structure, intro promise), and **what it consistently misses** — the question every result dances around, the outdated example, the missing depth. That miss is the opening. This is a read of live results, not tool data — say so.

### 4. Differentiation angle — the gap, in customer voice

The angle is the reason your page wins: the gap from step 3, made concrete by how real buyers talk. Pull phrasing from the user's supplied reviews/support text, or from public forum research (Reddit, communities, review sites) if none was supplied — and quote the source. One sharp angle beats out-lengthing the incumbents.

### 5. Write the brief

Assemble it:

- **2–3 title options** — each carrying the keyword *and* the angle, not just the keyword.
- **Meta description** — one sentence, the promise, ~150 characters.
- **Section-by-section outline** — every H2/H3 with a line of guidance (what it must answer, the customer-voice phrase to land) and a rough word target.
- **Internal-link plan** — which existing pages this links to, and which should link back.

### 6. Self-check

- The angle names a gap a competing page actually leaves open — not a generic "better" claim.
- Section word targets sum to a length that fits the intent (a definition query doesn't need 3,000 words).
- Every customer-voice phrase is sourced, not invented.
- The coverage verdict is stated, so no one writes a duplicate by accident.

**Batch mode:** briefing several keywords, open with a summary table ranking them by opportunity — gap size against how credibly the site can serve the intent — so the user writes the highest-leverage pages first.

| Keyword | Verdict | Angle (the gap) | Opportunity |
|---------|---------|-----------------|-------------|

## If a Jinn MCP connection is present (grounded)

Grounding makes a whole content calendar cohere — every brief points at one position instead of drifting. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|------------------|--------|
| `positioningWedge` | **The differentiation angle.** Lock every brief's angle to the wedge so the whole calendar argues one coherent position — not 20 pages each inventing a different reason to win. |
| `tribes[]` (`{name, description, motivation}`) | **Who the outline is written for** — the audience sections and the reader the guidance addresses. |
| `painPoints` | **The sections that convert** — the pains to answer on-page and the search intent behind the keyword. |
| `tonalAttributes[]` | **Voice notes for the writer** — the register every section is drafted in. |
| `bannedWords[]` | **Hard filter** — titles, meta, and section guidance use none of these; flag any keyword phrasing that trips it. |

Grounded, the delta is concrete: instead of a guessed angle per keyword, every brief's angle rotates on the brand's real `positioningWedge`, the outline speaks to a named `tribe` and its `painPoints`, and voice notes carry `tonalAttributes` with a `bannedWords` filter — so the calendar reads as one brand. **State which fields you used** when you deliver.

Guardrail: the competitor-SERP read stays yours — done by web search, never by the gateway. The projection carries **no** competitor data, no keyword volume, no difficulty, no SERP intel. Never reference or request those; if you want the gateway to tell you what ranks, stop — it isn't there, and paid-tool metrics are out of scope by design.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the briefs still ship ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill works generically as written above. Guess the angle from the ICP notes and note the calendar is ungrounded; connect Jinn to lock every brief to a real positioning wedge.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

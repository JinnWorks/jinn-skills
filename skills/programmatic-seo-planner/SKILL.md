---
name: programmatic-seo-planner
description: Turn one page pattern (e.g. "[service] in [city]") plus a data source into a page-set plan: viability verdict, data-source audit, a worked template with a uniqueness floor, and a rollout plan. Refuses sets that are one page with a word swapped. Use for planning a SET of pages, not one page. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Programmatic SEO Planner

Deliverable: **a page-set plan** — a pattern-viability verdict, a data-source quality audit, one worked template (with a stated per-page uniqueness floor and an internal-linking structure), a competitive/cannibalization read, and a rollout plan with kill criteria. Not a page. Not a spreadsheet of URLs to spin up. A decision about whether this pattern is worth building at all, and if so, exactly how to keep every page in it honest.

**Boundary:** `seo-content-brief` briefs *one page* from a keyword. This skill plans a *set* of pages that share one template and vary along a data axis (city, competitor, integration, role — whatever the pattern's bracketed variable is). Once a pattern earns a viable verdict here, hand each row to `seo-content-brief` for the page-level brief, or — once the brand is Connected — straight into Fama's pipeline (see **Best rung** below).

Standalone, it runs on published quality-gating method for pattern-based content: the viability test, the uniqueness floor, and the rollout discipline. Connected to Jinn, the template's angle and the axis worth building are grounded in the brand's real positioning and audience instead of "build every row the data source has."

## The rule this skill will not skip

**A page set that adds no per-page value is spam, and this skill will not plan one.** If the pattern-viability test in step 2 comes back **not viable** and the request is to build it anyway — "just swap the city name in and publish all of them," "we don't need it to be different, we just need the URLs to exist" — say so plainly, name the specific failure (query collapse or no per-row substance), and offer the narrowed or genuinely differentiated version instead. Don't quietly comply, and don't quietly refuse without explaining what would make it pass.

This isn't caution for its own sake. Search engines already treat large batches of near-identical, low-value pages generated primarily to capture search traffic as a policy violation ("scaled content abuse" in Google's own spam guidance), and doorway pages — many pages built to funnel searchers toward one real destination, differing only in a swapped keyword — are named explicitly. A set that trips this doesn't just fail to rank; it can drag down how the rest of the domain is trusted. Answer engines summarizing search results have the same incentive from the other direction: a templated page with no distinct substance gives them nothing worth quoting over a competitor's genuinely different one. A smaller set of pages that each earn their own existence outperforms a large set that doesn't, on every measure that matters after week one.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Pattern | the templated shape and its bracketed axis/axes — e.g. `[service] in [city]`, `[our tool] vs [competitor]`, `[integration] for [platform]`, `[role] job description for [industry]` |
| Data source | what supplies the values per row — a spreadsheet/CSV, an API, a directory, existing product or inventory data — and roughly how many rows it could yield |
| Site URL | the domain the set would live on, for coverage and internal-linking context |
| Search intent | what someone typing one instantiated query is actually trying to accomplish |
| Existing examples (optional) | competitor page-sets already running a similar pattern, for the SERP read in step 5 |

If the pattern has no clear bracketed axis yet — it's still "we want more pages about X" — tighten it with the user first. A pattern without a named axis isn't a pattern, it's a content calendar, and that's a different skill.

### 2. Pattern viability test — the gate before anything else

Run this before touching the data source or the template. Take **3 sample rows** spread across the range the data source offers (not the 3 easiest) and check two things for each:

- **Query distinctness.** Write the literal search query a person would type for row A and for row B. Would fully answering query A also fully satisfy someone who typed query B? If yes, the pages collapse into one page wearing two URLs — the pattern doesn't support a set.
- **Information distinctness.** For the same rows, is there real, row-specific information beyond the templated noun — a price, a stat, an availability fact, a compatibility note, a local detail sourced from the data — or would the page read identically with the bracketed term blanked out? A page that only differs by the noun in its own title fails this regardless of how the query test went.

**Verdict — pick one and say why:**
- **Viable** — both tests pass across the sample; the axis produces real per-row difference.
- **Viable with narrowing** — some rows pass and some don't (e.g. the pattern works for cities with enough local data and collapses for the rest); name exactly which subset to build and which to drop.
- **Not viable** — refuse per **The rule this skill will not skip**, name the specific failure, and offer the narrowed alternative if one exists.

### 3. Data-source audit

- **Yield** — realistic row count after removing duplicates and near-duplicates (rows the pattern would treat as the same axis value).
- **Completeness** — what share of rows carry enough real per-row facts to clear the uniqueness floor set in step 4; flag the rows that don't (they're candidates for narrowing, not building).
- **Freshness and ownership** — who maintains this data and how often; a page-set built on stale data decays as a set, not one page at a time.
- **The one differentiating fact per row** — name the specific field in the data source that a template variable alone can't produce (a real number, a real quote, a real availability state) and that every page will actually surface.

### 4. Template design

Build one skeleton, not one example page:

| Section | Shared boilerplate or per-row-unique | Source of the per-row content |
|---------|---------------------------------------|-------------------------------|
| (intro, comparison block, FAQ, CTA, etc. — one row per section) | | |

Set an explicit **uniqueness floor**: which named sections must carry real, row-specific substance for every page in the set — not decoration, not a re-stated noun. State it as a rule the template enforces, not a hope ("the intro and at least one comparison block must cite a fact from the data source that's specific to this row; the FAQ answers may not repeat verbatim across rows").

**Common pattern families and where their natural uniqueness tends to live** (a starting menu, not a constraint — the viability test in step 2 is the real check, not this table):

| Family | Typical shape | Where real per-row substance usually comes from |
|--------|----------------|---------------------------------------------------|
| Comparison | `[us] vs [competitor]` | The competitor's actual feature set, pricing, and positioning — thin without real research per competitor |
| Integration | `[tool] + [platform]` | Setup steps and compatibility details that genuinely differ per platform |
| Location | `[service] in [city]` | Local data (pricing, regulation, availability) — collapses fast without it; the weakest family by default |
| Use-case | `[product] for [use case]` | The workflow and outcome specific to that use case |
| Alternative | `[competitor] alternatives` | An honest, sourced comparison — not a rewritten homepage |
| Directory/glossary | `[term]` definition pages | The term's actual definition and context — thin if it's a one-line dictionary lookup with no added value |

Also design the **internal-linking structure**: one hub/index page listing the set, every page linking back to the hub, and — where the axis allows it — pages linking to genuinely related neighbors (not every page to every other page).

### 5. Competitive and cannibalization check

Checking every row isn't feasible at plan time — sample **2–3 instantiated queries** by web search and read what currently ranks: page type, structure, and what the top results consistently miss (that's the opening for the template). Separately, check the target site for pages that already cover part of the intended axis; the plan should say **update** (fold into the set), **net-new**, or **skip** per overlapping row, the same discipline `seo-content-brief` applies per keyword.

### 6. Rollout plan

Never plan a full-set launch as step one:

- **Pilot batch** — a small slice of rows across the range (not just the easiest ones), sized to be reviewable by a human before scaling.
- **Quality gate before scaling** — do the pilot pages actually get indexed, do they read as genuinely useful on their own when a person who isn't building the set reads one cold, does the uniqueness-floor rule survive contact with real content.
- **Kill criteria** — the specific result that means "stop, narrow, or abandon this pattern" versus the result that means "scale it." State both before the pilot runs, not after, so the pilot's outcome can't be rationalized either way.

### 7. Assemble the plan

One table:

```
Pattern | Axis sampled (rows checked) | Viability verdict | Uniqueness floor | Rollout size | Kill criteria
```

Followed by the template skeleton (step 4) and the internal-linking structure.

### 8. Quality gate (fixed — run before you deliver)

- The viability verdict is stated for the actual sampled rows, never assumed from the pattern's description alone.
- A **not viable** or **viable with narrowing** verdict is delivered as such — never soft-pedaled into a full build because the request asked for one.
- The uniqueness floor names specific sections and a specific rule, not "make each page feel unique."
- The rollout plan has a pilot batch and stated kill criteria, not "build them all and see."
- Every competitor/coverage claim in step 5 comes from an actual search or an actual site check, never invented.

## If a Jinn MCP connection is present (grounded)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | The angle the template's per-row content argues, so a set of pages still reads as one brand position — not one template copy-pasted with no point of view. |
| `tribes[]` (`{name, description, motivation}`) | Which axis values are actually worth building for. A data source with 400 possible rows rarely has 400 worth this brand's audience — the DNA record narrows the axis to the tribes that matter instead of "every row the source offers." |
| `painPoints` | Sharpens the per-row substance check in steps 2 and 4 — the real, row-specific pain each page should resolve, so per-row differentiation is functional, not cosmetic. |
| `messagingPillars[]` | What each page-type in the set reinforces, tying the template back to a real conviction instead of generic pattern copy. |
| `tonalAttributes[]` | Voice notes for the shared boilerplate and the per-row prose alike. |
| `safeWords[]` / `bannedWords[]` | A set-wide vocabulary filter — checked once here across the whole pattern, not page by page. |

Grounded, the delta is concrete: instead of narrowing the axis by guesswork or building every row a data source happens to offer, the plan keeps only the axis values that map to a real `tribe`, argues the brand's actual `positioningWedge` on every page, and answers a `painPoint` the brand can genuinely speak to — the same discipline that made the viability test pass, now backed by the brand's real strategy instead of a judgment call.

**Best rung.** Once the brand is Connected, this plan feeds Fama's own generation pipeline — worth describing honestly, because it isn't a literal fill-in-the-axis engine. Fama's content-calendar generator (`content-calendar/generate.ts`) runs an embedding-based topic-gap analysis against the brand's named competitors and turns each real coverage gap into a scheduled, formatted calendar item; `generated-assets/generate-prose-asset.ts` then drafts that item in the brand's actual voice. That's not a shortfall against classic axis-fill programmatic SEO — it's the same discipline this skill enforces by hand, run automatically: every page Fama would generate is already justified by a real, measured gap against a competitor, not a data-source row that happened to exist. Once Connected, treat this plan's viable rows as the shortlist to feed that pipeline; this skill is where the set earns the right to be built, Fama is where it gets built.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the plan still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the plan still ships in full against published viability method and any user-supplied pattern/data. Note it's ungrounded, and that **The rule this skill will not skip** applies regardless of connection state.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

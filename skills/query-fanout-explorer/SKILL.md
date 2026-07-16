---
name: query-fanout-explorer
description: Turn one buyer question into the 8-15 sub-queries answer engines actually decompose it into — comparative, constraint, persona, and freshness variants — organized as a coverage map for content briefs and topic clusters. Maps the query space; writes no single brief (seo-content-brief's lane). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Query Fan-Out Explorer

Deliverable: **one coverage map** for a single buyer question — 8–15 sub-queries an answer engine would actually research before it synthesizes a reply, each tagged with the decomposition pattern it came from, why an engine would ask it, and the content shape that answers it best.

**Read this first — it's the boundary that keeps this skill in its own lane.** A sibling skill, `seo-content-brief`, takes a keyword and writes **one** brief for it — coverage verdict, competitor-SERP read, outline. This skill runs a step earlier and wider: given **one** buyer question, it maps the **space** of sub-queries around it, so you know which keywords are even worth a brief and how they cluster into a pillar-and-satellite set. Want the query space around a question mapped → this skill. Want one brief written for one keyword you already have → `seo-content-brief`. The two chain: run this first, then hand each row of the coverage map to `seo-content-brief` one at a time.

Works standalone off a published decomposition method. Connected to Jinn, each sub-query gets a right-to-win read against the brand's actual positioning instead of a guess — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Buyer question | The one question in — a real thing a prospect types or asks a voice/chat assistant, not a head keyword. |
| Category / product | What's being bought, so pattern selection isn't generic. |
| Known competitors (optional) | Names to sanity-check comparative sub-queries against real alternatives instead of invented ones. |

If the question is really a head keyword ("project management software"), tighten it into an actual buyer question first ("what project management software should a 10-person agency use") — fan-out only works on a question with a real intent behind it.

### 2. Decompose using the pattern library

Answer engines don't just answer the literal string — they research a spread of angles before synthesizing one reply, and that spread is what this step reconstructs. Work through the pattern families below; pull 8–15 sub-queries total, drawn only from the families that are genuinely real for this category. Skipping a family is fine — say why. Forcing a family that doesn't fit produces a sub-query nobody would actually ask, and that's worse than a shorter map.

| Pattern | What it captures | Example shape |
|---------|-------------------|---------------|
| **Core restatement** | The buyer question itself, cleaned to how an engine would fire it | "best {category} for {use case}" |
| **Definitional** | Baseline framing the reader may need first | "what is {category}", "how does {mechanism} work" |
| **Comparative** | Head-to-head or ranked-list framing | "{option A} vs {option B}", "best {category} for {segment}" |
| **Constraint-filtered** | A hard requirement narrowing the field | "{category} under ${budget}", "{category} for {compliance regime}" |
| **Persona-scoped** | Same question, different reader | "{category} for freelancers" vs "for enterprise teams" |
| **Job-to-be-done** | The practical task behind the purchase | "how to use {category} to {outcome}" |
| **Objection / risk** | The skepticism every buying decision spawns | "is {category} worth it", "{category} pros and cons" |
| **Freshness / temporal** | Recency-sensitive framing engines re-decompose on every fresh crawl | "best {category} in {current year}", "{option} latest version" |
| **Locality / jurisdiction** | Geography or regulation-specific framing | "{category} in {region}", "{category} compliant with {local rule}" |
| **Alternative / substitute** | The switching-cost sub-query | "{category} alternatives", "free {category}", "{category} vs doing it manually" |
| **Integration / ecosystem** | Compatibility with what the buyer already runs | "does {option} work with {other tool}" |
| **Social proof / trust** | Verification before commitment | "{option} reviews", "who actually uses {option}" |

Not every family applies to every question — a low-consideration purchase rarely needs a locality variant, a B2C category rarely needs a compliance-constraint variant. Pick real ones over a forced full set.

### 3. Build the coverage map

One row per sub-query:

| Sub-query | Pattern | Why an engine asks it | Best content shape |
|-----------|---------|------------------------|---------------------|
| | | | e.g. comparison table, FAQ, pricing page, review roundup, definition page |

Word each sub-query the way a real person would type or ask it — not a keyword-stuffed fragment. Two sub-queries that only differ by synonym aren't two rows; collapse them.

### 4. Self-check

- 8–15 rows, each traceable to a named pattern, no near-duplicate phrasing.
- Comparative, constraint, persona, and freshness are represented if genuinely applicable to the category — any skipped family is named with a one-line reason, not silently dropped.
- The map covers both what an engine researches *before* answering and the natural follow-up a curious reader asks *after* — a map that's all "before" questions misses half of how these decompositions actually work.
- No row is a bare keyword; every row reads as something a person would actually ask.

### 5. Deliver — how to use the map

Lead with the map itself, then say how to act on it:

- **As a content brief queue:** each row is a candidate input for `seo-content-brief` — hand it the sub-query as the keyword and this row's "why" as the ICP note.
- **As a topic cluster:** the core-restatement row is the pillar page; every other row is a satellite piece in that pattern's shape, interlinking back to the pillar. This is what turns a fan-out into a cluster instead of a scattered list.

## If a Jinn MCP connection is present (grounded)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | **The right-to-win read.** Does the brand's actual chosen wedge give it something genuinely different to say on this sub-query, or would a page here just repeat category-average copy? |
| `messagingPillars[]` (`{pillar, description}`) | **Which sub-queries already have proof behind them.** A row that matches a real pillar is a publish-now gap; a row with no matching pillar is a build-proof-first gap. |
| `painPoints` | Flags which sub-queries are pain-driven rather than curiosity-driven — pain-driven gaps are the ones worth prioritizing, they convert harder once closed. |
| `tribes[]` (`{name, description, motivation}`) | Confirms a persona-scoped row matches a real documented segment instead of an invented persona variant. |
| `bannedWords[]` | Hard filter on any sub-query phrasing or content-shape note the skill writes out. |

Add a **Right to win** column to the coverage map: **Strong** (wedge and a matching pillar both back it) / **Contested** (one of the two backs it) / **Not yet** (neither — no authentic proof to publish against yet). Rank "which gaps matter most" by crossing intent centrality (how core the sub-query is to the original buyer question) against right-to-win: the sub-queries closest to the core question that land **Not yet** are the priority list — they're what a buyer asks early, and the brand currently has nothing real to say. **State which fields you used** when you deliver.

Boundary, restated: the public projection carries positioning and messaging, not market data — no live citation counts, no competitor coverage numbers, no keyword volume. The "why an engine asks it" and "content shape" columns stay methodology, not measured data, at this rung.

**Best — a Connected brand on Jinn.** Once the brand is Connected, unclaimed gaps in this map don't stay a hand-written queue: Fama's content-engine can turn a gap into a scheduled brief on its own, drawing on the same kind of embedding-based topic-clustering machinery that finds what competitors cover and a brand doesn't. That machinery isn't reachable from a public token — this skill can only point at it, not call it. The map above is the same map either way; Best just means someone (or something) already queued the fix.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the map still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the map still ships from the pattern library alone. Note it's ungrounded in the delivery note, and connect Jinn to get the right-to-win read on every row.

## What just became possible

Before writing a single content brief, you can now see the whole shape of sub-questions an answer engine actually researches around one buyer question — comparative, constraint, persona, and freshness variants — mapped and tagged by pattern with the content shape that answers each one best. It runs off a published decomposition method the moment it's installed, no account needed.

## Try this now

1. **Map a real buyer question** — `Fan out this buyer question into the sub-queries an answer engine would research: what project management software should a 10-person agency use` → a coverage map of sub-queries tagged by pattern (comparative, constraint, persona, freshness) with a best content shape each.
2. **Sanity-check against named competitors** — `Fan out "best CRM for solo real estate agents" and check the comparative sub-queries against these real alternatives: Follow Up Boss, kvCORE, and LionDesk` → a coverage map with comparative rows anchored to real named tools instead of invented ones.
3. **Turn a head keyword into a real question first** — `I only have the keyword project management software — turn that into a real buyer question and fan it out` → a tightened buyer question plus its full coverage map.
4. **Connected: rank gaps by right-to-win** *(requires a Jinn token)* — `Add a right-to-win read to this coverage map using our brand's real positioning wedge and pillars` → the same map with a Strong / Contested / Not-yet column ranking which sub-queries the brand can genuinely win today.

## Compounds with

- `seo-content-brief` — hand each row of the coverage map here, one at a time, for the page-level brief.
- `topical-authority-mapper` — check how deep the site already runs on a pillar row before deciding what to build next.
- `topic-gap-analyzer` — confirm which sub-queries are gaps competitors already own before prioritizing them.

---

*Grounding + three-state contract by Jinn. Decomposition patterns are our own synthesis of public query-fan-out and generative-engine-optimization practice — not lifted from any single source. MIT.*

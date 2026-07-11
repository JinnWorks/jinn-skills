---
name: market-map-lite
description: Map a category into segments with named players, claims, and sources — unsourced placements are labeled inference, never invented — then surface the white space. Use when scoping an unfamiliar market before a positioning call, not axes for named competitors, one company deep, or the buyer side. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Market Map Lite

Deliverable: **one category landscape map** — the category broken into segments, the real players named in each segment with a one-line claim and a source, a confidence tag on every placement, and a white-space read: where the category has no credible player yet.

**Read this first — it's the boundary that keeps this skill in its own lane.** Three sibling skills cover adjacent ground, and the difference is the shape of the question:

- **`competitor-positioning-map`** takes competitors the user already named and plots them on two strategic axes. This skill does the step *before* that's possible: it inventories **who even exists** in a category, segmented, when the user doesn't have a competitor list yet — or wants to check theirs against a fresh read.
- **`competitor-profiler`** goes deep on **one** company — a full structured profile, every claim sourced. This skill stays wide: shallow-but-sourced coverage across a whole category, not one company in depth.
- **`buyer-snapshot`** maps the **demand** side of a category — who actually buys, in what segments. This skill maps the **supply** side — who sells, and what they claim.

If the ask names its competitors and wants a 2x2, or wants one company torn apart, or wants the buyer landscape — route there instead. If the ask is "who's actually in this space and where's the opening," this is the tool.

**"Lite" is a stated limit, not a caveat to bury.** This is a hand-run spot map: one search pass per segment, a handful of players each, done in one sitting. It is not continuous market monitoring and it is not a licensed market-intelligence database. Say the limit out loud in the deliverable, not just here.

Standalone, it produces a real sourced category map from your own reading. Connected to Jinn, the map orients around where *this brand* already claims to sit — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Category | Required — named as precisely as the user can manage. "Project management software" maps nothing useful; "async project management for remote agencies" maps something real. If the user's category is fuzzy, ask one clarifying question before starting — a fuzzy category produces a fuzzy map no amount of sourcing fixes. |
| Vantage point (optional) | A brand or product the map is being built *for* — sharpens which segments and which white space actually matter to the deliverable. Not required; the map still works as a neutral category read. |
| Known players (optional) | Any names the user already has. Fold them in; don't treat this skill's own search as the only source. |

### 2. Segment the category

Segments are the analysis — get this wrong and every player lands in one crowded bucket. Split the category by a dimension that actually separates how companies compete in it: business model, target-customer size, technical approach, price tier, or a genuine strategic fork the category argues about. Aim for **3–6 segments** — fewer and the map says nothing, more and it stops being "lite." State *why* you chose these segments; that reasoning is part of the deliverable, the same way axis choice is in `competitor-positioning-map`.

### 3. Populate each segment — with a source for every player

For each segment, search for who's actually in it: category-specific searches ("best `<category>` tools," "`<category>` companies," "`<category>` vs" comparisons), directories, and roundups. For each player you place, fetch the source and capture three things:

- **Name** — the company or product.
- **The claim** — one line, in *their* words or a tight paraphrase of what they say they do, pulled from something you actually read (their homepage, a listing, a comparison piece) — not your prior impression of the brand.
- **The source** — the URL you fetched it from.

Aim for **3–6 named players per segment.** Depth beats padding — a segment with two well-sourced players is worth more than one with six guessed ones.

### 4. Tag every placement's confidence — the discipline that makes this "lite" map honest

This is the core discipline the skill exists to enforce. Every single player-and-segment placement gets exactly one tag:

| Tag | What it means | When to use it |
|-----|----------------|-----------------|
| **Sourced** | You fetched a specific page and it directly supports both the segment assignment and the claim. | Default target for every placement — this is what "with sources" means. |
| **Inference** | No single page confirms it, but you're reasoning from something real: an adjacent category you do know, a pattern across sourced competitors, general reputation. State *what* the inference rests on in the same line. | Fine to use, never fine to hide — an inference presented as sourced is the failure mode this skill is built to prevent. |
| **Unconfirmed** | A name surfaced (a mention, a directory listing) but you could not verify what they actually claim or where they sit. | Keep it in the map labeled this way rather than dropping it silently, or drop it and say you dropped it — never silently promote it to Sourced. |

Never invent a player that didn't come from a real search result. If a segment turns up thin, say the segment is thin — don't pad it with guesses to make every bucket look even.

### 5. Find the white space

The payoff. Read across the finished grid for:

- **Empty segments** — a segment you defined that turned up no credible player, or only Unconfirmed ones.
- **Uncontested claims** — a claim no player in the category is making, visible because every sourced claim you collected clusters around the same two or three angles.
- **Crowded corners** — where the named players pile up making near-identical claims, which is itself useful: it tells you where *not* to compete on message alone.

State the white space as a finding, not a foregone conclusion — if the category genuinely has no opening (every segment is dense, every angle taken), say that plainly instead of manufacturing a gap to deliver one.

### 6. Deliver

```
MARKET MAP (LITE) — <category>
Segmented by: <the dimension chosen, and why>
Coverage: one search pass per segment, <N> players total — a spot map, not exhaustive research.

Segment: <name>
| Player | Claim | Source | Confidence |
|--------|-------|--------|------------|
| ...    | ...   | <url>  | Sourced / Inference / Unconfirmed |

Segment: <name>
| ... |

White space:
  - <finding> — <what the grid shows that supports it>
  - <finding> — <what the grid shows that supports it>
```

Lead the delivered map with a one-line finding ("Six segments, eighteen players, all sourced but three — the accessible/self-serve corner is dense, the enterprise-compliance corner has one player and it's weak"), then the segment tables, then the white-space read.

### 7. Self-check before delivering

- Every player has a tag — none silently defaulted to Sourced without a fetched page behind it.
- No segment was padded with guessed names to look fuller than the search actually supported.
- The white-space read points at specific empty or thin cells in the grid the reader can verify themselves, not a vibe.
- The "lite" limit (one pass, a spot map) is stated in the deliverable itself, not just implied.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the map is a neutral category read — useful, but it doesn't know which corner matters most to any one brand. Grounded, the same map gets read through where *this* brand already claims to stand. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | **Which segment is "home."** Place the brand's own claimed wedge on the map like any other player — Sourced, since it's the brand's own record — and read the rest of the grid relative to it. |
| `brandEnemy` | **Which white space actually matters.** A category can have several open corners; the enemy-framing says which one this brand is built to contest, so the white-space section can rank findings instead of listing them flat. |
| `tribes[]` (`{name, description, motivation}`) | **Whose lens the map is drawn for.** A category map reads differently for different buyers — ground it in the tribe this brand is actually building for. |

State which fields grounded which part of the map when you deliver it: *"Segment placement and white-space ranking oriented around `<brandName>`'s live Brand DNA (wedge: `<positioningWedge>`, enemy: `<brandEnemy>`)."* Every competitor's name, claim, and source still comes from your own search — the projection has no competitor data in it, and never will; if you catch yourself wanting the gateway to already know who's in the category, stop and go fetch it yourself.

**Best rung:** once the brand is Connected on Jinn, this same discipline runs at full depth inside Chart, Jinn's research product. Chart's category and competitive-intelligence engine retrieves against real sources, verifies claims one at a time against what was actually retrieved, and gates the finished report on a faithfulness score before anything ships — the same "every placement traceable" rule this skill applies by hand, run wider, deeper, and continuously rather than as a single spot map. That engine isn't reachable from a public token; this skill can only point at it, not run it. The map above still ships in full at the Better rung — Best replaces "here's a spot map, refresh it yourself" with "verified and kept current."

## When a call fails

Read `data.code` on the JSON-RPC error and act — the map still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real, fully sourced category map; connect Jinn later to orient the white-space read around the brand's own claimed wedge.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns.*

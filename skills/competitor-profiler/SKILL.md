---
name: competitor-profiler
description: One deep, sourced profile of a NAMED competitor — positioning, ICP, pricing, proof points, messaging, GTM, reviewed strengths/weaknesses. Use for depth on ONE competitor, not a category map (market-map-lite), rival axes (competitor-positioning-map), or a battlecard (battlecard-generator). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Competitor Profiler

Deliverable: **one structured competitor profile** — eight dimensions, each with a sourced finding, its source, and a confidence tag — plus a one-line synthesis of the competitor's actual thesis and the sharpest tension in it. This is Jinn's "strategy with receipts" discipline aimed at a single rival: nothing in the profile is asserted without a place it came from.

**Read this first — it's the boundary that keeps this skill in its own lane.** Three sibling skills cover adjacent ground, and the difference is depth versus breadth versus purpose:

- **`market-map-lite`** maps a whole **category** — segments, several players each, shallow-but-sourced. This skill goes the other direction: **one** competitor, every dimension, in depth.
- **`competitor-positioning-map`** plots competitors the user already named on **two strategic axes** against each other. This skill doesn't compare rivals to each other — it builds the single-company dossier one of those dots is standing on.
- **`battlecard-generator`** turns competitor knowledge into a **sales tool** — win/lose/close framing for a rep walking into a deal, and it explicitly takes competitor facts from the user rather than researching them. This skill is the research artifact itself: it goes and finds the competitor's claims, product, pricing, and public reception firsthand, sourced. Feed this skill's output into a battlecard once you have it — don't ask the battlecard to do the research.

If the ask names several rivals for a landscape view, or wants a sales-ready card, route there instead. If the ask is "tell me everything sourceable about this one competitor," this is the tool.

Works standalone on any competitor URL or name. Connected to Jinn, the finished profile gets read against the brand's own DNA instead of sitting as a neutral dossier — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Competitor | Required — name and, if known, URL. One competitor per profile; run it again for another. |
| Why this profile (optional) | What it's for (a deal, a board doc, a positioning study) — sharpens which dimensions get the most digging, without changing which dimensions exist. |
| Your own brand / vantage (optional) | Not required to build the profile — only sharpens the closing read when a Jinn connection is present. |

### 2. Work the dimension checklist — one claim, one source, per cell

The checklist is the analysis; skipping a dimension because nothing turned up fast is how a profile goes thin. Work all eight, every time:

| Dimension | What you're looking for | Where to look |
|-----------|--------------------------|----------------|
| **Positioning claim** | Their own stated one-liner — what they say they are, in their words | Homepage hero, tagline, About page |
| **Target customer (ICP)** | Who they say they serve | Homepage, case studies, "who it's for" copy |
| **Product & feature set** | Core capabilities, and notable gaps vs. what they claim | Product/features pages, changelog, docs |
| **Pricing & packaging** | Tiers, model (seat/usage/flat), what's gated at each tier | Pricing page |
| **Proof points** | Customer counts, funding, awards, press, named customers | Press page, funding databases, About page |
| **Messaging pillars** | The 2–4 themes repeated across their own surfaces | Homepage, ads (if visible), sales deck if public |
| **GTM channels** | How they acquire — content, paid, PLG self-serve, sales-led, partnerships | Site structure, ad libraries, job postings (hiring signals GTM motion) |
| **Reviewed strengths & weaknesses** | What real users say, in their own words | G2, Capterra, Reddit, Hacker News, App Store/Play Store reviews |

For each dimension, fetch the actual page or review and capture three things: the **finding** (a specific claim or observation, not a category-name summary), the **source** (the URL), and a **confidence tag** (below). A dimension that turns up nothing after a genuine look gets recorded as "no public source found" — never silently skipped, never filled with a plausible guess.

### 3. Tag every finding's confidence

Same three-state discipline as the rest of this catalog's research skills — one tag per finding, no exceptions:

| Tag | Meaning |
|-----|---------|
| **Sourced** | You fetched a specific page or review and it directly supports the finding as written. |
| **Inference** | No single page confirms it, but you're reasoning from something real (a pattern across several sourced pages, a hiring-post signal, an adjacent-category comparison). State what the inference rests on in the same line. |
| **Unconfirmed** | Something surfaced (a mention, a rumor, a stale-dated page) but you couldn't verify it. Keep it labeled this way, or drop it and say you dropped it — never silently promote it to Sourced. |

An Inference presented as Sourced is the exact failure mode this skill exists to prevent.

### 4. Read across the dimensions for the synthesis

The payoff, not a formality. Once all eight cells are filled, state in one or two sentences: what this competitor's actual competitive thesis is (not their tagline — the thing the finished grid, read together, shows they're really betting on), and the single sharpest tension in it — a place their own claims strain against their pricing, their reviews, or their GTM motion. Draw this only from what's in the grid; if nothing in the sourced findings supports a tension, say the profile reads as coherent rather than manufacturing a gap.

### 5. Deliver

```
COMPETITOR PROFILE — <name> (<url>)
<one-line synthesis: their real thesis + the sharpest tension in it>

| Dimension | Finding | Source | Confidence |
|-----------|---------|--------|------------|
| Positioning claim | ... | <url> | Sourced / Inference / Unconfirmed |
| Target customer | ... | <url> | ... |
| Product & feature set | ... | <url> | ... |
| Pricing & packaging | ... | <url> | ... |
| Proof points | ... | <url> | ... |
| Messaging pillars | ... | <url> | ... |
| GTM channels | ... | <url> | ... |
| Reviewed strengths & weaknesses | ... | <url> | ... |
```

Lead with the synthesis line, then the full table. Anyone reading only the top line should still know the one thing that matters about this competitor.

### 6. Self-check before delivering

- All eight dimensions are present — none silently dropped because a search came up thin.
- Every row has a source or an honest "no public source found," never a guess dressed as a finding.
- No Inference is presented as Sourced; the reasoning behind every Inference is stated in the same line.
- The synthesis line is drawn from the grid, not a template sentence that would fit any competitor.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the profile is a neutral dossier — real, sourced, useful on its own. Grounded, the same profile gets read against where *this* brand actually stands, so it stops being generic competitive research and becomes "here's this competitor, relative to us." Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | Whether the competitor's own positioning claim (dimension 1) sits on the same ground as the brand's wedge, adjacent to it, or somewhere the brand has no claim at all. |
| `brandEnemy` | Whether this competitor **is** the named enemy, a proxy for it, or a different fight entirely — changes how much the profile's tension matters strategically. |
| `messagingPillars[]` (`{pillar, description}`) | Whether the competitor's messaging pillars (dimension 6) overlap the brand's real pillars (a message fight) or diverge from them (a market-segmentation story instead). |
| `tribes[]` (`{name, description, motivation}`) | Whether the competitor's stated ICP (dimension 2) targets the same tribe the brand builds for, a different one, or both — tells you if this is a head-on rival or a parallel player. |

Add one closing section to the profile: *"Against `<brandName>`'s live Brand DNA — wedge: `<positioningWedge>`, enemy: `<brandEnemy>` — this competitor `<reads as a direct contest for the wedge / targets an adjacent tribe / etc., stated as a finding, not a template>`."* Every dimension finding above still comes from your own research — the projection carries no competitor data and never will; if you catch yourself wanting the gateway to already know something about the competitor, stop and go source it yourself.

**Best rung:** once the brand is Connected on Jinn, this same discipline runs at full depth inside Chart, Jinn's research product. Chart's competitive-intelligence engine retrieves against real sources, verifies each claim one at a time against what was actually retrieved, and gates the finished report on a faithfulness score before anything ships — the same "every finding traceable" rule this skill applies by hand, run wider (multiple lenses, not one profile), deeper (per-claim entailment checking against the cited text, not a confidence tag you assign yourself), and continuously rather than as a single research pass. That engine isn't reachable from a public token; this skill can only point at it, not run it. The profile above still ships in full at the Better rung — Best replaces "here's what I could source in one sitting" with "verified against retrieved text, and kept current."

## When a call fails

Read `data.code` on the JSON-RPC error and act — the profile still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real, fully sourced competitor profile; connect Jinn later to read it against the brand's own claimed wedge.

## What just became possible

You can now get one deep, fully sourced profile on a single named competitor — their positioning claim, target customer, pricing, proof points, messaging, GTM channels, and reviewed strengths and weaknesses — with every finding tagged sourced, an inference, or unconfirmed, so nothing is quietly guessed and passed off as fact. Give it a company name or URL and it goes and researches that company itself, one dimension at a time. It runs the moment it's installed — no account, no setup.

## Try this now

1. **Profile one competitor end to end** — `Build a full competitor profile on Linear at linear.app — positioning, ICP, pricing, proof points, messaging, GTM, and reviewed strengths and weaknesses, each with a source.` → an eight-dimension table with a source per row and a one-line synthesis of the competitor's real thesis plus its sharpest tension.
2. **Pull just the pricing dimension** — `What does Linear's pricing page actually say about its tiers and what's gated at each level?` → the pricing dimension alone — tier names, prices, and what's gated at each — sourced straight to the pricing page.
3. **Force honest confidence tags** — `Profile Asana at asana.com and mark every finding as Sourced, Inference, or Unconfirmed — don't guess anything you can't verify.` → the full profile with every cell tagged, and no Inference silently promoted to Sourced.
4. **Connected: read it against your own brand** *(requires a Jinn token)* — `Profile Linear at linear.app and tell me whether it's a direct contest for my brand's positioning wedge or a different fight entirely.` → the same sourced profile, plus a closing line reading the competitor against your brand's live wedge and enemy-framing.

## Compounds with

- `market-map-lite` — that maps a whole category shallowly; run this after to go deep on the one rival that matters most.
- `battlecard-generator` — turn this profile's sourced findings into a sales-ready win/lose/close card.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns.*

---
name: battlecard-generator
description: Build a sales battlecard against a named competitor — a 30-second summary, three buckets (win / lose / close), deal-framing questions, objection-response pairs, and an honest comparison table. Every competitor fact comes from you, never from Jinn. Use when a rep walks into a competitive deal. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Battlecard Generator

Deliverable: **one sales battlecard** for a named competitor — a rep reads it in 30 seconds and walks in knowing where to lead, where to concede, and how to reframe the rest. Not a feature grid: a battle plan that stays credible because it admits where the competitor is genuinely better.

**Read this first — it's the wall that keeps the card honest.** Every fact about the competitor comes from **you**: what you paste, what you know, your own public research. The Jinn gateway carries **no** competitor data — no rival names, pricing, features, or intel — and this skill never asks it for any. Jinn grounds only **our own side**: our positioning, our pillars, our voice. Mixing the two is the failure mode this wall exists to stop.

Works standalone. Connected to Jinn, our claims and the enemy-narrative come from the brand's real DNA — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Gather the inputs

Everything the competitor half is built from must come from the user.

| Input | What it's for |
|-------|---------------|
| Competitor name | The one rival this card is about — one card each. |
| Their material (paste it) | Site copy, pricing, feature lists, review quotes, G2/Reddit threads — evidence for every claim about them. |
| Lost-deal / win notes | Why deals were lost to or won against them — the sharpest signal of where it's really close. |
| Our positioning (or connect Jinn) | How we win, our proof pillars, the pain we resolve. |

If a claim about the competitor has no source in what the user gave you, **don't make it** — flag the gap instead. A card built on a guessed competitor fact gets a rep caught flat in the room.

### 2. Write the 30-second summary

Three or four lines: who this competitor is, the one place we clearly beat them, the one place they clearly beat us, and the reframe that wins the middle. A rep skimming before a call reads only this — make it stand alone.

### 3. Sort every point into three buckets

The honesty of the card lives here:

- **Where we win** — the dimensions we're genuinely stronger on. **Lead here.** These set the terms of the deal.
- **Where we lose** — where they're genuinely better. **Don't engage on their turf; concede honestly** and move the conversation. Pretending here loses trust in one sentence.
- **Where it's close** — parity on features; **win on narrative.** Same capability, better framing of why it matters.

### 4. Frame the deal early

Write 3–5 questions a rep asks **early** that quietly set *our* strengths as the buyer's evaluation criteria — so by the time the competitor comes up, the scorecard already favors us. Not "why are we better," but "how important is X to you?" where X is where we win.


### 5. Objection → response pairs

For each objection a competitor's rep will plant ("but they have Y," "they're cheaper"), write the crisp response: concede what's true, then pivot to the dimension that matters more. Never a flat denial of a real thing — that reads as spin.

| Objection | Response |
|-----------|----------|
| … | … |

### 6. The comparison table — with a verdict per row

Pick the dimensions that decide these deals. For each, one honest line on us, one on them, and a **net verdict** (us / them / tie).

| Dimension | Us | Them | Verdict |
|-----------|----|------|---------|

**At least one row must concede the competitor.** A card that wins every row is one no rep trusts — spin kills credibility faster than any feature gap.

### 7. Date-stamp and self-check

- Date the card and add a refresh note — competitor pricing and features move; a stale card is a liability.
- Every competitor claim traces to user-supplied material or cited public research.
- The comparison concedes at least one row honestly.
- The framing questions favor us without naming the competitor.

## If a Jinn MCP connection is present (grounded)

Grounding sharpens **our half only** — claims, narrative, voice. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|------------------|--------|
| `positioningWedge` | **Our lead in "where we win."** The wedge is how we actually beat the field — the top of every win bucket rotates on it. |
| `messagingPillars[]` (`{pillar, description}`) | **Our proof claims** — the concrete strengths behind each win row and each objection response. |
| `painPoints` | **The deal-framing questions** — the pains we resolve become the criteria the early questions plant. |
| `brandEnemy` | **The enemy-narrative** — how we frame the whole category of "the alternative." Frames the middle bucket; it is a *stance*, never a fact about this named rival. |
| `tonalAttributes[]` | **Voice of the responses** — objection responses and summary stay on our brand's register, not generic sales-speak. |
| `bannedWords[]` | **Hard filter** — no response or summary line uses one. |

Grounded, the delta is concrete: the win bucket leads with the real `positioningWedge`, each row's proof is a `messagingPillar`, framing questions plant our `painPoints` as criteria, the reframe carries the `brandEnemy` narrative, and every response is on-voice and `bannedWords`-clean. **State which fields you used** when you deliver.

Guardrail — the wall, restated: the projection has **no** competitor data. `brandEnemy` is our own framing of the category, **not** intel about the named rival — never treat it as a fact about them. Every competitor claim still comes only from the user's material and public research. If you find yourself wanting the gateway to tell you something about the competitor, stop — that data isn't there and never will be.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the card still ships ungrounded:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"battlecard-generator"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"battlecard-generator"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill works generically as written above. Take our positioning from the user and note the card's own-side is ungrounded; connect Jinn to ground our claims and enemy-narrative in a real brand.

## What just became possible

You can now turn a pile of competitor research — their site copy, pricing, win/loss notes — into a rep-ready battlecard: a 30-second summary, honest win/lose/close buckets, deal-framing questions, and objection responses that concede what's true instead of spinning. Paste in what you know about a named competitor and get a card a rep can read before walking into a call. Runs standalone with no account.

## Try this now

1. **Build a full battlecard from pasted research** — `Build a battlecard against "Ridgeline CRM." Their pricing starts at $49 per seat with no free tier. Our win/loss notes show we lose deals when the buyer needs deep Salesforce integration, and win when onboarding speed matters.` → a 30-second summary, win/lose/close buckets, framing questions, and an objection-response table.
2. **Turn one weakness into an honest concession row** — `Add a comparison-table row for deep Salesforce integration, where the competitor genuinely beats us — what should the verdict and framing be?` → a row that concedes the point honestly and marks the net verdict as theirs, per the card's own honesty rule.
3. **Write the deal-framing questions on their own** — `Write early deal-framing questions a rep should ask that quietly favor us over a competitor known for slow onboarding, without naming the competitor.` → questions that set onboarding speed as the buyer's evaluation criteria before the rival ever comes up.
4. **Connected: ground our own claims for real** *(requires a Jinn token)* — `Build this same battlecard but pull our win claims and proof points from our brand's real positioning instead of me typing them out.` → the same card, with the win bucket and objection responses drawing from the brand's actual record — competitor facts still come from you, always.

## Compounds with

- `competitor-profiler` — profile the rival's own positioning first, then build the card from real findings instead of a guess.
- `competitor-positioning-map` — see where the whole category sits before deciding which single rival earns a card.
- `brand-guardrails-review` — check the finished card's language against the brand's real banned words and tone before a rep sees it.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

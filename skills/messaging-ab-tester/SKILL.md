---
name: messaging-ab-tester
description: Design a message A/B test — 3–5 versions of a headline, subject line, or value prop, each a distinct strategic bet with a hypothesis — then judge pasted-back results against honest sample thresholds. Use when you want message variants to test against each other or a verdict on which won. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Messaging A/B Tester

This skill runs in two beats: **design a test worth running**, then **read the results honestly**. The design half rejects the usual failure — three rewordings of one sentence, which teach nothing. Each variant is a different *strategic bet* about why someone buys, carrying a hypothesis you can be wrong about. The adjudication half refuses the other failure: crowning a winner off a handful of clicks. Below the thresholds, the honest answer is "keep running," not a fake result.

Deliverable: **a test design (3–5 variants, each a distinct bet with a one-line hypothesis, rendered in the formats you need) — then, when results come back, a per-channel scorecard and a defensible verdict.**

Works standalone from one core message. Connected to Jinn, the angles are seeded only from claims the brand's DNA actually backs, and every variant is checked against its banned and safe words before it ever ships.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Fix the core message and the formats

Lock these before drafting. Blank row → ask one question or take the bracketed default.

| Input | Capture |
|-------|---------|
| Core message | The single idea all variants express — the destination, in one sentence |
| Formats needed | Where this runs: social post, email subject line, opening hook, headline [default: subject line + post] |
| Channel(s) | Where you'll measure — each is scored separately |
| Success metric | Per channel: open rate, CTR, reply rate, saves — the one number that means "it worked" |
| Constraints | Length, register, words to avoid [default: no hype words] |

### 2. Draft 3–5 variants as distinct strategic bets

Pull each variant from a **different angle** in this fixed typology. Reject any variant that's a wording tweak of another — if two share a bet, cut one and pull a fresh angle.

| Angle | The bet | Hypothesis shape |
|-------|---------|------------------|
| **Outcome-led** | They buy the destination | "They'll move for the result, stated plainly" |
| **Pain-led** | They buy the escape | "The ache outpulls the aspiration" |
| **Identity-led** | They buy who they become | "They act to belong / to be seen as X" |
| **Proof-led** | They buy the evidence | "Skeptics need a number or a name first" |
| **Contrast-led** | They buy the break from the status quo | "Framing it against the old way is the hook" |

Write each variant with an explicit **one-line hypothesis** — the claim about the buyer that a win or loss would confirm or refute. No hypothesis, no variant.

### 3. Render each variant in the needed formats

Take each variant's core angle and cast it into every format from step 1 — the subject line, the post, the opening hook, the headline all express the *same bet* in that format's shape and length. Keep the angle constant across formats so a channel result maps cleanly back to a hypothesis.

### 4. Self-check

- Are the variants genuinely different bets, not synonyms? Name each one's angle to prove it.
- Does each carry a falsifiable one-line hypothesis?
- Does every rendering stay inside the format's constraints and the brand's word rules?

### 5. Adjudicate the results (when the user reports back)

The user pastes results in whatever form they have — a screenshot's numbers, a table, a sentence. Normalize into a per-channel scorecard:

| Channel | Variant | Angle | Sample (n) | Metric | Result vs control |
|---------|---------|-------|-----------|--------|-------------------|

Then apply two gates **before** naming any winner:

- **Minimum sample** — each variant needs enough events (e.g. opens, clicks, impressions) to be more than noise. Thin data → no call.
- **Minimum relative lift** — the leader must beat the control by a real margin (a meaningful relative lift, not a point or two inside the noise band).

If either gate fails, say so plainly: **"keep running, or accept the ambiguity"** — never manufacture a winner from a coin-flip. If different channels crown different variants, that is **signal, not noise** — report it: the angle that wins in email may lose in-feed, and that tells the user where each bet belongs.

## If a Jinn MCP connection is present (grounded)

Seed the angles from what the brand can actually stand behind, and filter every variant through its voice rules. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|------------------|--------|
| `messagingPillars[]` ({pillar, description}) | **Angle seeds.** Each strategic bet must map to a pillar the brand claims — you may only test messages the DNA backs. |
| `positioningWedge` | **The contrast-led and outcome-led angles** — the wedge is how the brand wins; frame the destination and the break-from-status-quo bets on it. |
| `painPoints` | **The pain-led angle** — draw it from the brand's real, stated pains, not an invented one. |
| `tonalAttributes[]` | **The register** every rendering is written in. |
| `bannedWords[]` | **Hard filter** — no variant may contain one; rewrite any that trips it before it ships. |
| `safeWords[]` | **Approved claim language** — prefer these in the proof-led and outcome-led variants. |

Grounded, the delta is concrete: every angle traces to a `messagingPillar` or the `positioningWedge`, the pain bet comes from real `painPoints`, and each variant is provably clean of `bannedWords` and written in the brand's `tonalAttributes`. **State which fields seeded each variant** when you deliver the design. When a winner clears both adjudication gates, frame the winning message for write-back into the user's canonical messaging docs — the tested, verified line the brand should adopt.

Only the fields above exist on a public token. There is no competitor, differentiation, platform-fit, or pricing data in the projection — don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It designs and adjudicates a real test from your core message; connect Jinn later to seed the angles from the brand's live pillars and wedge.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

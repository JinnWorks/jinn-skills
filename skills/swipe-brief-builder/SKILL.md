---
name: swipe-brief-builder
description: Turn 3 reference ads into ONE structured creative brief — concept, visual direction, copy angle, format, and CTA — one coherent direction, not three teardowns. Use when you have swipe-file inspiration and need a brief before writing copy. Free front door to Jinn's ad-intelligence Library. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Swipe Brief Builder

Deliverable: **one structured creative brief** synthesized from 3 reference ads — a single direction a designer, copywriter, or a render job can build from, not three separate teardowns stapled together.

Distinct from its nearest neighbors: **ad-teardown** analyzes one ad (or a whole library) and stops at analysis — it never merges. **campaign-brief** is the strategy layer above this one (objective, audience, channels); this skill is the single-creative layer below it. **ad-copy-variants** writes finished headline and body copy; this skill specifies the creative direction copy should follow, it doesn't write the final lines.

Standalone, it turns three saved ads into a usable brief from taste and pattern-matching alone. Connected to Jinn, the copy angle and visual direction are checked against the brand's real voice and palette instead of your best guess.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake — the 3 references

| Ref | What it is | Where you saw it (platform, if known) |
|-----|------------|----------------------------------------|
| A | screenshot / URL / description | |
| B | | |
| C | | |

Takes 3 (2 works in a pinch). Past 3, this stops being a synthesis and starts being a library scan — that's **ad-teardown**'s job, not this one.

### 2. Extract per-reference — same 5 questions on every ad

Run the identical lens across A, B, and C so the rows actually compare:

| | Ref A | Ref B | Ref C |
|---|---|---|---|
| **Hook** — the first thing you see or read | | | |
| **Format** — the layout pattern (product-hero shot, before/after, testimonial-style, comparison, stat callout, lifestyle scene…) | | | |
| **Visual direction** — color, mood, composition | | | |
| **Offer / angle** — the claim, and the persuasion mechanism it leans on (proof, urgency, identity, curiosity, contrast) | | | |
| **CTA** — the action, and how it's presented | | | |

### 3. Find the through-line

Compare the three rows and name the ONE pattern all three share — that's the thing you're actually stealing, not any single ad wholesale. Then pick complementary elements across references (A's hook + B's layout + C's CTA is a normal, good outcome) — but only pull an element in if it serves that one through-line. If two references pull in genuinely different directions, drop the weaker one; don't average two ideas into a brief that serves neither.

### 4. Write the brief

```
CREATIVE BRIEF — <name>

Concept / hook:      <the one idea, stated the way the ad would open>
Visual direction:    <layout + mood + composition — name which reference(s) it draws from>
Copy angle:          <the claim + the persuasion mechanism driving it>
Format:               <aspect ratio / platform this is built for>
CTA:                  <the action + how it's presented>
Why this works:       <the through-line from step 3, in one sentence>
```

### 5. Coherence gate (run before you deliver)

- **One direction, not three stapled ideas.** If two people reading this brief could reasonably build genuinely different ads from it, it isn't merged yet — go back to step 3.
- **Every field serves the same through-line.** A visual direction that doesn't reinforce the copy angle is a leftover from one reference that didn't survive the merge; cut it.
- **The brief stands alone.** Someone who never saw the 3 originals should be able to build from it without asking "wait, what did the references look like?"

## Grounding ladder (when a Jinn MCP connection is present)

Climb to the highest rung your token supports; each rung is a superset of the one below.

**Rung 1 — Connected tokens (design trio present).** If `tools/list` includes the design trio, call `get_token_context` for a slug, then `get_brand_kit({ slug })` + `get_brand_design_tokens({ slug })` + `get_brand_design_md({ slug })`, plus `get_brand_dna_public({ slug })` for voice. The brief's **Visual direction** field takes its colour and type language from the DTCG tokens verbatim — never approximate a hex the token already gives you.

**Rung 2 — DNA-only (trio absent, `get_brand_dna_public` works).** Call `get_token_context` → `get_brand_dna_public({ slug })`. Check the brief against the brand's real voice — see the field table below. Visual direction stays your read of the 3 references; label it an unverified inference in the brief.

**Rung 3 — no token.** The brief still ships from steps 1–5 alone. Note it's not brand-verified.

| Projection field | Drives |
|-------------------|--------|
| `tonalAttributes` | Register of the **Copy angle** — the persuasion mechanism gets phrased in the brand's actual tone. |
| `painPoints` | Which of the 3 references' offers/angles is the sharpest fit — lead the through-line with the pain the brand's audience actually feels. |
| `messagingPillars` | Sanity-check that **Concept / hook** reinforces a pillar the brand already owns, not a competing idea. |
| `safeWords` / `bannedWords` | Vocabulary check on every field — no `bannedWords`, prefer `safeWords`. |
| `tribes` | Confirms who the brief's angle is actually speaking to. |

Only the fields above exist on a public token. There is no competitor, pricing, or performance data in the projection — the brief's "why this works" reasoning is your read of the 3 references, never a borrowed metric.

## Once the brief is set (Connected)

A Connected brand's next step lives in Vermeer, not in this skill: the brief becomes the seed for an actual render, matched against Jinn's ad-intelligence Library and turned into a real creative. This skill is that Library's free front door — the render step itself runs inside Jinn, authenticated, and isn't a tool call this skill makes. State the brief is ready for Vermeer and point the user to connect Jinn if they want to go from brief to rendered ad.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the brief still ships in its ungrounded form:

- **`token_expired`** → request a fresh demo token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on any brand call → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → drop to Rung 3. The brief still ships; note it's not brand-verified and connect Jinn to ground it.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

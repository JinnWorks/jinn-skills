---
name: marketing-decision
description: Make a marketing call without the spiral — triage the decision, answer 6–8 targeted questions instead of the whole bank, and land a clear call with a revisit date, logged to a local decision record. Use for campaign go/no-go, pricing-page changes, rebrands, killing a channel, or an event sponsorship. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Marketing Decision

Deliverable: **a decided call, written down** — decide / decide-smaller / wait / don't-decide, with a revisit date and the record filed. This skill exists to end a specific failure mode: a reversible marketing call getting weeks of meetings it never needed. It caps the questions on purpose. The cap is the feature.

Works standalone from the question bank below. Connected to Jinn, the brand-fit and customer-impact questions are answered against the brand's real DNA and its own past decisions instead of your recollection.

## The decision record (a small local file this skill maintains)

Every call gets logged, so "what happened last time" is a lookup, not a memory. First run with no file: create `.jinn/marketing-decisions.md` under the working directory and say you made it. Grounded to a brand, namespace it: `.jinn/marketing-decisions.<slug>.md`. Append newest at the top:

```markdown
## 2026-07-07 — Move pricing to 3 tiers
- Decision (one line): Restructure the pricing page from 2 plans to 3.
- Stakes: high · Reversibility: hard · Deadline: end of quarter
- First instinct: yes, do it
- Call: DECIDE-SMALLER — ship a 3rd tier as an A/B on 20% of traffic first
- Why (esp. if it diverged from instinct): instinct was full rollout; the questions
  surfaced that it's a hard-to-reverse public change with no evidence yet, so test it.
- Revisit: 2026-08-07 — what should be true: the 3rd tier wins on revenue-per-visitor,
  not just clicks; if it's flat, revert.
```

## Procedure (works with no connection)

Run these four steps in order. The order matters — instinct is captured *before* the questions so the questions can't quietly launder it.

### 1. Intake — frame the decision in four lines

Pull these from the user; ask only for what's missing.

| Field | Capture |
|-------|---------|
| The decision | one sentence, an actual choice ("kill the podcast," not "think about audio") |
| Stakes | low / medium / high — what's riding on getting it right |
| Reversibility | easy (undo in days) / hard (undo is costly) / one-way door (can't undo — a public price cut, a rename, a burned list) |
| Deadline | the real date a decision is forced, or "none — we're choosing to decide now" |

### 2. First instinct — capture it before anything else

Ask for the gut call in one line and write it down *now*: "yes / no / smaller / not yet." This is the anchor you'll test. **If the final call diverges from the instinct, the record must say why** — a decision that talks itself out of its own gut without a reason is usually the questions rationalizing, not reasoning.

### 3. Triage the questions — 6–8, never the whole bank

Ask the **always-ask core (5)**, then pull **1–3 add-ons** matched to the decision's shape. Stop at 8. If you're reaching for a ninth, you have your answer and you're stalling.

**Always-ask core (every decision):**

1. What actually breaks if we don't decide this at all this quarter?
2. If this goes wrong, how many days does it take to undo — and who cleans it up?
3. Which tribe feels this first, and do they feel it as a gift or a tax?
4. Does this sharpen the positioning wedge, or blur it?
5. What do we actually *know* here versus what are we assuming?

**Add-ons — pull the group that matches the decision:**

*Reversibility is "hard" or "one-way door" → pull 1–2 from here:*
6. Is this a door that only opens one way — a rename, a public price drop, a list we can't un-email?
7. What's the worst realistic outcome, and could we survive it happening twice?
8. Does this touch something a customer already paid for or built a habit around?

*Stakes are "high," or real money moves → pull 1–2 from here:*
9. What does this cost if it works, and what does it cost if it flops?
10. What's the opportunity cost — the thing we *won't* do because we did this?
11. If it returned nothing measurable, would we still be glad we ran it?

*Customer-facing change (pricing page, packaging, a channel customers follow) → pull 1–2:*
12. Does this make the product easier to explain to a stranger, or harder?
13. Would a current best customer notice — and would they cheer or quietly churn?
14. Are we solving a pain customers actually name, or one we assume they feel?

*Brand / identity call (rebrand, new voice, a bold creative swing) → pull 1–2:*
15. Does this sound like us said out loud, or like us copying someone louder?
16. Would we be proud to publish the "why we did this" post next to it?
17. Is there a banned word or an off-voice move hiding in the execution?

*Evidence feels thin, or the room is split → pull 1–2:*
18. If we're wrong, what's the first signal we'd see — and are we watching for it?
19. Has anyone we trust done the near-version of this, and what happened to them?
20. Are we choosing this because it's right, or because it's the loudest option in the meeting?

*Timing is the crux (why now?) → pull 1–2:*
21. Why now and not next quarter — what makes the window real, not just impatience?
22. Is there a cheaper experiment that buys the same confidence before the full commit?

*Scope feels big → pull 1:*
23. Is this one decision, or three smaller ones hiding in a trench coat?
24. What's the smallest version we could ship that teaches us the same thing?
25. Who has to live with this call — and are they in the room for it?

Answer only the ones you pulled. Thin, honest answers beat exhaustive ones.

### 4. Make the call — one of four, stated without hedging

Pick exactly one, and say it plainly:

- **DECIDE** — commit. The reversibility is fine or the evidence is strong. Say what you're doing.
- **DECIDE-SMALLER** — do the smallest reversible version now (test, pilot, one segment), commit fully once it proves out. The default when stakes are high but the door isn't one-way.
- **WAIT — and name the trigger** — hold, but state the *one thing that would change the answer* ("wait until we have 4 weeks of the current test"). A wait without a trigger is just avoidance; don't ship one.
- **DON'T-DECIDE** — this isn't a decision worth making now; the status quo wins. Say why so it doesn't come back next week as new.

Then set the **revisit date** and **what should be true by then** — the concrete signal you'll check to know if the call held. Write the whole thing to the record file (step 0's format), including the divergence reason if the call moved off the first instinct.

Hand back: the call, the revisit date, and the one line of what-should-be-true. That's the deliverable — short on purpose.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the brand-fit and customer questions run on the user's memory. Grounded, they run on the brand's real DNA — and on its own decision history. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then answer the triage questions against the projection instead of guessing. Field → question map:

| Projection field | Answers |
|------------------|---------|
| `positioningWedge`, `brandEnemy` | **"Sharpen or blur the wedge?"** (core Q4) — judge the decision against the brand's real edge and what it stands against, not a vibe. |
| `tribes[]` ({name, description, motivation}) | **"Which tribe feels this first?"** (core Q3) — name the actual tribe and read gift-vs-tax off its `motivation`. |
| `painPoints` | **"A pain they name or one we assume?"** (Q14) — check the decision against pains the brand has actually documented. |
| `tonalAttributes[]`, `bannedWords[]`, `slangPolicy` | **The brand-fit block** (Q15–17) — "sounds like us?" and "off-voice move hiding in it?" are answerable, not subjective, once you have the real voice rules. |
| `mission`, `coreValues`, `archetype` | **The "proud to publish the why?" test** (Q16) — does the call serve the mission and values, or just the quarter? |
| `messagingPillars[]` | **"Easier or harder to explain?"** (Q12) — a decision that muddies the top pillar makes the product harder to pitch. |

**Prior decisions inform "what happened last time."** Before you finalize, read the brand's own `.jinn/marketing-decisions.<slug>.md` — if a near-version of this call was made before, its outcome is evidence for Q18–19 ("first signal," "anyone done this?"). Note when a past record shaped the call.

**State which fields you used** when you deliver — the wedge you judged against, the tribe you named, the prior decision you weighed — so the grounding is visible.

Only the fields above exist on a public token. There is no competitor, ROI, pricing, or analytics data in the projection — the money and timing questions stay answered from the user's own numbers, never from hidden gateway fields.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the decision workflow still runs ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill works generically. Run the triage from the bank above and note the brand-fit answers are from the user's recollection, not verified DNA; connect Jinn to ground them.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: launch-readiness-scorecard
description: Grade a launch plan across six dimensions — channels, per-stage assets, measurement, positioning lock, stage gates, rollback — with a grade, gap, and fix each. Use once a plan exists; not for drafting (product-launch-playbook), positioning (launch-positioning), or one call (marketing-decision). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Launch Readiness Scorecard

Deliverable: **one launch readiness scorecard** — six dimensions, each graded READY / AT RISK / NOT READY against the plan's own evidence, with the specific gap named and what closing it takes — plus one overall verdict a launch lead can act on this week.

**Read this first — it's the boundary that keeps this skill in its own lane.** Three sibling skills sit right next to this one, and the difference is *what already exists*:

- **`product-launch-playbook`** builds the plan from scratch — phases, assets, sequencing, messaging beats. If there's no written plan yet, that's the tool; this skill has nothing to grade until one exists. Don't try to reverse-engineer a plan from a bare idea just to score it — route there first.
- **`launch-positioning`** writes the positioning brief — one-liner, wedge, enemy, pillars, tribe — that sits *inside* a launch plan. This skill doesn't write positioning; it checks whether the positioning a plan already claims actually holds together and stays consistent everywhere it appears.
- **`marketing-decision`** triages one open marketing call to a decision and a revisit date. This skill doesn't decide anything — it audits an entire plan across six fixed dimensions and hands back a scorecard, not a single ruling.

If the ask is "help me plan a launch," "write our positioning," or "should we do X," route there. If the ask is "here's our launch plan, is it actually ready" — this is the tool.

Works standalone on any pasted plan. Connected to Jinn, the positioning-lock dimension and the audience half of channel/asset coverage get checked against the brand's real strategy instead of just internal consistency — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| The plan | the launch plan itself — as much as exists: a doc, a deck, bullet notes, even a Slack thread laying out phases/channels/assets. Paste it whole; don't summarize it for the audit yourself. |
| What's launching | product/feature/campaign, in one line, so the grading has a scope to hold it against. |
| Launch window | the date or window this is being graded against — a gap two months out reads differently than the same gap two days out. |

**Gate check before grading:** if what's pasted is an idea or a goal ("we want to launch X next quarter") rather than an actual plan with any structure to it, stop and say so — route to `product-launch-playbook` to build the plan first. A scorecard needs something written down to score; grading a blank page just invents a plan and scores the invention.

### 2. Extract the plan's own claims — before judging anything

Read the whole plan once and pull out, in its own words: every channel named, every asset named per channel, any success metric or number stated, any phases or sequence described, any entry criteria for moving between phases, any rollback or kill language. This extraction is itself evidence. **An item the plan never mentions is not "probably fine" — it's a gap, and it gets graded like one.** Don't fill in a channel, asset, or metric the plan didn't actually name, even if it seems like an obvious oversight the team surely covered elsewhere — score what's written, not what's likely true.

### 3. Grade the six dimensions

Every grade needs a line of evidence from the plan (a quote or a tight paraphrase) or the honest word "unmentioned." A grade with no evidence line is a guess dressed as an audit — the failure mode this whole skill exists to catch.

| Grade | What it means |
|-------|----------------|
| **READY** | The plan's own evidence clears the bar for this dimension — ships as written. |
| **AT RISK** | Partial evidence — present but thin, inconsistent, or missing one load-bearing piece. Closeable before launch; the gap is named below the grade. |
| **NOT READY** | No evidence, or a genuine blocker — the gate should not open on this dimension until it closes. |

#### Dimension 1 — Channel coverage (owned / earned / paid)

| Type | What counts |
|------|-------------|
| **Owned** | Email list, website/landing page, in-product messaging, existing community you control. |
| **Earned** | Press, community/forum posts, partner or customer amplification, organic social reach you don't pay for. |
| **Paid** | Paid social, paid search, sponsorships, paid influencer placement. |

Check each type against the launch's actual scope. A plan that deliberately skips a type and *says so* ("paid deferred until post-GA demand is proven") reads differently than one that simply never mentions it — the first is a decision, the second is an unexamined gap. Grade NOT READY only when a channel type central to reaching the stated audience is silently absent; AT RISK when a type is named but under-specified (no owner, no asset, no timing).

#### Dimension 2 — Asset coverage (per-channel, per-funnel-stage)

Build the matrix: rows are the channels the plan actually uses, columns are funnel stages — **awareness, consideration, conversion, retention**. For each cell, is an asset named? A channel with a conversion column empty is traffic with no destination; a channel with no retention asset means the launch has no plan for what happens to the people it just converted. Grade the dimension from how full the matrix is, and call out any channel that's present in Dimension 1 but has no assets assigned here — that combination is always at least AT RISK.

#### Dimension 3 — Measurement

Two separate questions, both must clear:

- **Is success actually defined?** A number and a threshold ("2,000 signups in week one," not "raise awareness") — vague intent doesn't count.
- **Is it observable?** Named instrumentation — analytics events, UTM plan, a dashboard, and who looks at it and when.

Grade READY only when both hold. A plan with a real target number but no way to observe it is AT RISK at best — you'll find out you missed it after it's too late to matter.

#### Dimension 4 — Positioning lock

Pull the core message from every asset the plan names and compare them side by side. Same wedge, same one-liner idea, everywhere it shows up → READY. Same idea, drifting wording channel to channel → AT RISK. Different or contradicting claims depending on which asset you read → NOT READY — a launch that says one thing on the landing page and another in the outreach email undercuts itself before anyone even notices, because it reads as incoherent rather than dishonest.

#### Dimension 5 — Sequencing / stage gates

**The house discipline this dimension exists to enforce: a launch advances through gates, each gate has entry criteria, and a plan without kill criteria isn't a plan — it's a hope with a date attached.** Check three things, in order:

1. **Phases named** — does the plan move through stages (internal → limited → general, or similar), or is it one all-at-once event?
2. **Entry criteria per phase** — what has to be true before the plan advances to the next phase?
3. **Kill / no-go criteria per phase** — what result would *stop* the advance, and who makes that call?

Grade READY only when all three are present. The single most common gap in real plans: phases and entry criteria exist, but nothing says what would make the team *not* advance — grade that AT RISK and name it explicitly, since it's usually invisible to the person who wrote the plan. A genuinely small, single-phase launch (a minor feature ship) doesn't need multiple gates — but it still needs *a* rollback trigger, which folds into Dimension 6; don't demand phase structure a launch this size doesn't need.

#### Dimension 6 — Rollback / contingency

If this goes wrong — a bug, a backlash, a metric that craters — does the plan say what happens? Three components, proportional to the launch's actual size:

- **Technical rollback** — how does it get turned off (feature flag, revert, pause the campaign)?
- **Comms rollback** — what gets said, and to whom, if it has to be walked back?
- **Owner** — who has the authority to make that call, named, not implied?

Grade on how many of the three the plan actually names. A large launch missing all three is NOT READY; a small one with a clear technical rollback and an obvious owner can be READY without a comms plan it will never need — scale the bar to the blast radius, and say so.

### 4. Aggregate to one verdict

A single **NOT READY** dimension caps the overall verdict at NOT READY — one hard-blocked gate blocks the whole launch, the same logic Dimension 5 applies to any one phase. Otherwise, state the split plainly: how many of six are READY, how many AT RISK, and whether the AT RISK gaps are closeable inside the time left before the stated launch window.

### 5. Deliver

```
LAUNCH READINESS SCORECARD — <what's launching>

Overall: <READY / READY WITH GAPS / NOT READY> — <one-line reason>

| Dimension                        | Grade | Evidence                    | Gap                | What closes it        |
|-----------------------------------|-------|------------------------------|---------------------|------------------------|
| Channels (owned/earned/paid)      | ...   | ...                           | ...                 | ...                    |
| Assets (channel × funnel stage)   | ...   | ...                           | ...                 | ...                    |
| Measurement                       | ...   | ...                           | ...                 | ...                    |
| Positioning lock                  | ...   | ...                           | ...                 | ...                    |
| Sequencing / stage gates          | ...   | ...                           | ...                 | ...                    |
| Rollback / contingency            | ...   | ...                           | ...                 | ...                    |

Priority fixes, ordered by what's most likely to actually block or embarrass this launch:
1. ...
2. ...
3. ...
```

Lead with the overall verdict line, then the table, then the ordered fix list — the fix list is the part someone actually acts on this week.

### 6. Self-check before delivering

- Every dimension carries a traceable evidence line — a quote/paraphrase from the plan, or the honest word "unmentioned." No grade rests on an assumption about what the team "probably" has.
- No dimension was graded READY because the gap seemed unlikely to matter — likelihood isn't evidence.
- Dimension 5 was checked for kill criteria specifically, not just phases — the most commonly missing piece is also the easiest to overlook.
- The overall verdict wasn't averaged past a single NOT READY — one real blocker caps the whole score, it doesn't get diluted by five good dimensions.
- The rollback bar (Dimension 6) was scaled to the launch's actual size, not applied as a flat checklist regardless of blast radius.

## If a Jinn MCP connection is present (grounded)

Ungrounded, Dimension 4 checks only whether the plan is internally consistent — the same message everywhere. Grounded, it checks whether that message is actually *this brand's* real strategy, not just a message the plan agrees with itself about. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Grounds which check |
|-------------------|----------------------|
| `positioningWedge` | Does the plan's stated core message match the brand's real wedge — a plan can be perfectly consistent with itself and still be off-strategy. That gap is invisible to the ungrounded audit and real here. |
| `messagingPillars[]` (`{pillar, description}`) | Do the assets' claims trace back to a real, documented pillar, or were they invented fresh for this launch with nothing behind them? |
| `tribes[]` (`{name, description, motivation}`) | Does the plan's stated audience match a tribe the brand has actually documented, or is "who this is for" a guess that doesn't map to anyone real? |
| `painPoints` | Does the awareness-stage messaging lead with a pain the brand has actually documented, or an assumed one? |
| `bannedWords[]` / `tonalAttributes[]` | Any launch copy quoted in the plan that breaks a banned-word rule or misses the brand's register folds straight into the Dimension 4 grade. |

State which fields grounded which grade when you deliver: *"Positioning lock and audience checks grounded against `<brandName>`'s live Brand DNA — wedge, N pillars, M tribes."* Every other dimension — channels, assets, measurement, sequencing, rollback — still grades entirely on what's actually written in the plan; the projection carries no channel-performance, budget, or execution data to check them against.

### Best — once the brand is Connected

This scorecard, however sharply grounded, still only grades a plan a person wrote by hand. For a brand Connected on Jinn, the suite goes a step further: Jinn can run the launch end-to-end once the brand is Connected — sequencing the phases, generating the assets per channel and funnel stage, wiring the measurement, and holding each stage gate open or closed on real data, rather than someone drafting a plan and someone else auditing it after the fact. That machinery isn't reachable from a public token; this skill can only point at it, not run it. The scorecard above still runs in full at the Better rung — Best replaces "here's what to fix before you launch" with "the launch runs itself, and the gates hold on their own."

## When a call fails

Read `data.code` on the JSON-RPC error and act — the audit still runs ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a complete, evidence-based scorecard against the plan as written; connect Jinn later to check the positioning-lock dimension against the brand's live strategy instead of just its own internal consistency.

## What just became possible

You can now grade an entire launch plan across six fixed dimensions — channels, assets, measurement, positioning, stage gates, rollback — and get back a specific gap and fix for each, instead of a gut "looks fine." Every grade carries its own evidence line, so nothing gets marked ready because a gap seemed unlikely to matter. It runs on any plan you paste in, no account needed.

## Try this now

1. **Grade a real launch plan** — `Grade this launch plan across your six readiness dimensions and tell me what's not ready: [paste plan]` → a six-dimension scorecard with grade, evidence, gap, and fix per row, plus one overall verdict.
2. **Stress-test the gate logic specifically** — `Does this plan have real kill criteria for its phased rollout, or just phases? [paste plan]` → a direct check of the sequencing/stage-gates dimension, evidence quoted from the plan.
3. **Sanity-check positioning consistency** — `Compare the core message across every asset in this plan and tell me if it's actually consistent: [paste plan]` → a positioning-lock grade with any drift between assets called out.
4. **Connected: check positioning against real strategy** *(requires a Jinn token)* — `Grade this plan's positioning lock against our actual Brand DNA, not just internal consistency` → the same dimension re-graded against the brand's live wedge and pillars, not just self-agreement.

## Compounds with

- `launch-positioning` — writes the positioning brief this skill checks for consistency and strategic fit.
- `product-launch-playbook` — builds the plan this skill grades; route there first if nothing's written down yet.
- `marketing-decision` — triage any single gap this scorecard surfaces into an actual call with a revisit date.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

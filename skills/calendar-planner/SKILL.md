---
name: calendar-planner
description: Turn one positioning line and an audience into a 30-day content calendar — derived themes, per-slot format/platform/angle, batching guidance, and a sustainability check the team can keep. Use for a month's strategy from scratch, not an existing property rotation (that's content-rotation's job). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Calendar Planner

Deliverable: **a 30-day content calendar** — 3–5 recurring themes derived from one positioning line, a platform mix with the reasoning behind it, a day-by-day grid of format + platform + angle, batching guidance for how to actually produce it, and a sustainability check that flags a plan the team can't keep before it ships as one.

Works standalone from a positioning line and an audience description. Connected to Jinn, the themes stop being a guess at what the positioning implies and become the brand's own named messaging pillars, wedge, pains, and tribes — the same narrative spine, not a paraphrase of one sentence.

**This is not `content-rotation`.** That skill manages a *rotation* — a small state file of existing properties, deciding what's overdue and what to post next, week to week. This skill builds the *strategy* a rotation executes: where do the month's themes come from, how much can realistically get made, and does the platform mix make sense for this audience. Run this once at the start of a month (or when the positioning changes); once the calendar exists, hand its themes to `content-rotation` to track week-to-week execution, or to `x-content` / `linkedin-content` to draft individual slots.

## The deliverable

```
CONTENT CALENDAR — <positioning line, one line> — 30 days

Themes (derived from positioning):
  1. <theme> — ties to: "<phrase from the positioning line>"
  2. <theme> — ties to: "<phrase from the positioning line>"
  ...

Platform mix: <platform>: <n>/wk · <platform>: <n>/wk · ...
  Why this split: <one line — where this audience actually spends attention>

Week 1
| Day | Theme | Format | Platform | Angle |
|-----|-------|--------|----------|-------|
| Mon | <theme> | <format> | <platform> | <angle, one line> |
| ... | ... | ... | ... | ... |

[Weeks 2–4, same shape]

Batching guidance:
  <which slots to make in the same sitting, and why>

Sustainability check: <est. hours/week> vs <stated or assumed capacity>
  Verdict: HOLDS / OVERCOMMITTED — <if overcommitted, the trimmed version>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Positioning line | Required — one sentence: what the brand does, for whom, and the edge it claims. |
| Audience | Required — who the calendar is written for and where they actually pay attention. |
| Platforms in play | Optional — if not given, infer 2–3 from the audience description and say so. |
| Team capacity | Optional — hours per week available for content production. If not given, **assume 3–5 hrs/week (a solo marketer or small team's realistic ceiling)** and say that's an assumption, not a fact about this team. |
| Existing cadence preference | Optional — a house minimum/maximum posts per week, if the user has one. |

### 2. Derive themes from the positioning line

Don't invent themes from nothing — pull them out of the sentence you were given. A positioning line carries three components worth separating: the **outcome** it promises, the **audience** it names, and the **edge** it claims over the alternative. Turn each into a theme the calendar can return to across the month without repeating the same post twice — 3 to 5 themes is the right range; fewer and the month reads as one note, more and no theme gets enough reps to land. State the one-line tie back to the positioning for each theme, so the connection is checkable, not asserted.

### 3. Set the platform mix (house taste, not a blanket split)

Match content shape to what each platform actually rewards, don't spread slots evenly across platforms by default:

| Platform pattern | Tends to reward |
|-------------------|------------------|
| LinkedIn | build-in-public, thought-leadership takes, outcome/case narratives |
| X | quick takes, threads that unspool one idea, timely reaction |
| Blog / owned | the deep dive — the piece other slots point back to |
| Newsletter | the recap and the argument, not the news |

Weight the mix toward the platforms where the stated audience actually spends attention — a technical B2B audience skews LinkedIn/blog over a visual-first platform, for instance. Say which platforms got more slots and why in one line; this is a judgment call, present it as one.

### 4. Build the 30-day grid

Lay out four weeks. Rotate the themes so **no theme repeats within the same week**, and give each platform at least one **recurring anchor format** — a slot type the audience learns to expect (e.g., "Monday build-in-public on LinkedIn") — consistency compounds more than novelty does. Each cell gets a format, a platform, and a one-line angle — not a full draft; drafting is `x-content` / `linkedin-content` / `seo-content-brief`'s job downstream.

### 5. Batching guidance

State, plainly, how the month should actually get made — **not by calendar date, by production mode.** Group every quick-take slot into one sitting; group the month's deep-dive(s) into their own dedicated block; group any visual/design assets together so context-switching cost is paid once, not thirty times. A calendar that assumes each day gets its own fresh session is a calendar nobody batches, and un-batched content is where cadence dies first.

### 6. Sustainability check — the check that makes this a real calendar, not a wish list

**A calendar the team can't keep is a failed calendar.** This is the house rule the whole skill exists to enforce, so run it explicitly rather than letting the grid speak for itself:

1. Assign each slot an effort tier: **quick** (a native post, ~15–30 min), **standard** (a platform post needing a graphic or a real draft pass), or **deep** (a blog piece, a produced asset — the multi-hour tier).
2. Sum estimated hours for the month, divide by four for a weekly figure.
3. Compare against the stated or assumed capacity from step 1.
4. State the verdict plainly: **HOLDS** (capacity covers it with room) or **OVERCOMMITTED** (it doesn't). If overcommitted, don't ship the ambitious version anyway — propose the trimmed one: fewer deep-tier slots, more repurposing one asset across platforms instead of drafting each from scratch, or a longer runway (6 weeks instead of 4) at the same weekly pace.

### 7. Deliver with a customization note

Hand over the calendar plus: which fields were assumed (capacity, platform list) versus given, and — whenever built ungrounded — that the themes are inferred from one sentence, not verified against the brand's actual strategy.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the themes are your best read of one sentence. Grounded, they're the brand's own recorded narrative. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then let the projection replace the guesswork in steps 2–3. Field → decision map:

| Projection field | Drives |
|-------------------|--------|
| `messagingPillars[]` ({pillar, description}) | **Replaces step 2 entirely.** Each pillar is a real, brand-verified theme — use these instead of deriving themes from the positioning line alone, and spread them across the four weeks so the month covers the brand's whole narrative, not one note on repeat. |
| `positioningWedge` | The differentiator theme — at least one week's arc should carry the wedge directly, in the brand's own words for it. |
| `painPoints` | Problem-led angles, drawn from pains the brand has actually named — never an invented one. |
| `tribes[]` ({name, description, motivation}) | Who a given week's angle speaks to; `motivation` sets that week's tone. |
| `tonalAttributes[]` | The voice register every angle line is drafted in. |
| `brandEnemy` | An occasional contrast angle ("not X") when the field is present — used sparingly, not every week. |
| `safeWords[]` / `bannedWords[]` | Diction guardrails on every angle line — prefer the former, hard-filter the latter. |

**What doesn't change:** the platform-mix logic in step 3 stays house taste — the public projection carries no platform-fit or engagement data (deliberately; that's product-side, not in the public record), so state the mix reasoning as judgment either way. The sustainability check in step 6 also stays as-is; capacity is a fact about the team, not the brand, and no projection field speaks to it.

**State which fields you used** — the pillars a month spans, the wedge a week carries — when you deliver, so the grounding is visible rather than asserted.

**Best rung:** once the brand is Connected on Jinn, this calendar stops being a table to copy into another tool. Ghost holds the brand's own strategy record (positioning, topics, content mix) and tracks a weekly cadence goal against what's actually published and scheduled — so a Connected brand's calendar can anchor to a real campaign with its own goal, and the plan becomes scheduled drafts on the calendar instead of a grid you re-type by hand.

Only the fields above exist on a public token — there is no product-inventory, competitor, engagement-analytics, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the calendar still ships from the positioning line and audience alone:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the calendar still builds in full from the positioning line and audience. Note the themes are inferred, not brand-verified, and connect Jinn to ground them in the brand's real pillars.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

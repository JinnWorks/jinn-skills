---
name: content-rotation
description: Plan what to post and when across your properties on rotation — a balanced 7-day plan, the single best next post, or a per-property overdue audit — then hand the chosen post to x-content or linkedin-content to write. Use when several products or properties compete for the same feed and you need a cadence instead of another one-off. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Content Rotation

Deliverable: **a posting decision, not a post** — a 7-day plan, one next post, or a rotation audit. This is the planner that sits above the per-post skills. It decides *what* to post and *when*; `x-content` and `linkedin-content` decide the words. Hand any slot it produces to one of those to draft, and it composes cleanly — this skill picks the property and angle, that skill writes it in voice.

Works standalone from a property list you keep in a small local file. Connected to Jinn, the angles, hooks, and educational topics ground in the brand's real pillars, pains, and voice instead of a plausible guess at them.

## The rotation state (a small local file this skill maintains)

No agent remembers what you posted last week, so this skill keeps a file. First run with no file present: create `.jinn/content-rotation.yaml` under the working directory and tell the user you made it. Grounded to a brand, namespace it: `.jinn/content-rotation.<slug>.yaml`, so two brands never share a rotation.

```yaml
# .jinn/content-rotation.yaml
platform: linkedin            # the lane this rotation governs (one platform per file)
properties:                   # the things that can be promoted
  - name: Atlas API           # a product, property, or offer
    last_promo: 2026-06-10     # date of its last DIRECT promo post (null = never)
  - name: Onboarding revamp
    last_promo: 2026-07-01
log:                          # recent posts, newest first — trims to ~14 days
  - { date: 2026-07-05, type: educational, property: null }
  - { date: 2026-07-03, type: promo,        property: Atlas API }
  - { date: 2026-07-02, type: build-in-public, property: Onboarding revamp }
```

Three post types run through it:

- **promo** — a direct pitch for one property. The scarce slot; overuse burns the feed.
- **build-in-public** — a moment from making the thing: the mess, the fix, the decision.
- **educational** — a lesson useful on its own. It may *implicitly* show a product, but the moment it carries a link it becomes promo, not educational. That line is the whole discipline.

If the user has no file and hasn't given a property list, ask once for the properties and the platform, then write the file. Never invent properties.

## Rules the rotation obeys (they hold in every mode)

- **Weekly mix target:** about **2 promo, 2–3 build-in-public, 2–3 educational** per 7 days. More promo than that and the account reads like an ad unit.
- **Never two promo posts on consecutive days.** Space them; the feed forgives education back-to-back, not pitches.
- **A property with no direct promo for >21 days is overdue** — it's fading from the audience's memory. Surface it.
- **Cadence cap ~2 posts per day per platform.** Past that, reach drops and you train the audience to scroll past you.
- **Links never sit in the post body.** Put the link in the first comment on LinkedIn, or a reply on X — and the default is *no link at all*. A body link suppresses reach and marks the post as an ad.
- **A promo hook is an outcome, a take, or a story — never an announcement.** "We shipped X" is a press release; "X cut our onboarding from 3 days to 20 minutes" is a promo that earns the read.

## Procedure (ungrounded — works from your local file)

Load the state file (or create it, above). Then run the mode the user asked for; default to **pick-next** if they just say "what should I post."

### Mode: `plan` — a 7-day plan

Build a week that hits the mix target, then print it as a table. Fill the **promo** slots with the most-overdue properties first (largest days-since-`last_promo`). Separate the two promo days by at least one non-promo day. Fill the rest with build-in-public and educational, alternating so no type triples up.

| Day | Type | Property / topic | Angle |
|-----|------|------------------|-------|
| Mon | educational | — | one lesson the audience can use today |
| Tue | promo | <most-overdue property> | the outcome it delivers, as a hook |
| Wed | build-in-public | <property> | the decision or trade-off behind it |
| … | … | … | … |

End the plan with the two or three properties still not scheduled and when they'll next come due, so nothing silently rots.

### Mode: `pick-next` — the single next post

One decision, stated flat:

1. Find the most-overdue property (largest days-since-`last_promo`). **If it's >14 days overdue → the next post is a promo for it.** (14, not 21: pick-next leans in before a property hits the overdue wall.)
2. Otherwise → the next post is **build-in-public or educational**, whichever type is *less recent* in the log. Ties go to educational.
3. Never return promo if yesterday's log entry was promo — bump to the less-recent of build-in-public / educational instead.

Return the type, the property (or topic), a one-line angle, and the rule that decided it ("Atlas API is 27 days out — overdue"). Then offer to draft it.

### Mode: `audit` — where the rotation stands

Report every property's days-since-promo, flag the overdue ones (>21), and give the next one or two moves. This is the "am I neglecting something" check.

| Property | Days since promo | Status | Next move |
|----------|------------------|--------|-----------|
| Atlas API | 27 | ⚠ overdue | promo this week, lead on the onboarding-time outcome |
| Onboarding revamp | 6 | ok | hold; build-in-public if a moment comes up |

Close with the single most-neglected property and the one post that fixes it.

### Mode: `draft` — hand off to the writer

Skip the rotation math. Take the already-chosen post (type + property + angle) and pass it to the per-post skill for the platform: **`linkedin-content`** for LinkedIn, **`x-content`** for X. Give that skill the property as the subject, the angle as the one claim, and repeat the two rules it must honor: **the link goes in the first comment / reply, never the body**, and a promo leads on an outcome, not an announcement. When the post is written and the user confirms it's going out, append it to the `log` and, if it was a promo, update that property's `last_promo` to today.

### After any mode that results in a post going live

Update the file: add the post to `log` (newest first, trim entries older than ~14 days), and set `last_promo` on the property if it was a promo. The rotation is only as honest as the file.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the angles are your best guess. Grounded, they come from the brand's real strategy. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then let the projection drive the rotation. Field → decision map:

| Projection field | Drives |
|------------------|--------|
| `messagingPillars[]` ({pillar, description}) | **The rotation's spine.** Each pillar is a real theme worth returning to — spread promo, build-in-public, and educational slots *across* the pillars so a week covers the brand's whole narrative, not one note on repeat. |
| `positioningWedge` | **Every promo angle.** The brand's real edge; a promo hook should express the wedge, not a generic benefit. |
| `painPoints` | **Educational and problem-led hooks.** Open on a pain the audience actually names, drawn from here — never an invented one. |
| `tribes[]` ({name, description, motivation}) | **Who each slot speaks to.** Aim posts at named tribes; their `motivation` sets the angle for that day. |
| `tonalAttributes[]` | **The voice of every angle line** you write into the plan — match them, so the handoff to `x-content`/`linkedin-content` starts on-voice. |
| `safeWords[]` / `bannedWords[]` | **Diction.** Prefer `safeWords` in hooks; keep every angle line clear of `bannedWords`. |

**On the property roster:** the public projection has no product list, so the *named* properties in your file still come from the user. What grounding changes is everything the rotation says *about* them — every angle, hook, and topic now runs on the brand's real pillars, pains, tribes, and voice. If the user hasn't given a roster at all, seed candidate topics from the `messagingPillars` as a starting point and say so. **State which fields you used** — the pillars a week spans, the wedge a promo carries, the tribe a post targets — when you deliver, so the grounding is visible.

Only the fields above exist on a public token. There is no product-inventory, competitor, engagement-analytics, or pricing data in the projection — don't reference or request it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the rotation still works from your local file:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Run the rotation from the local file's property list and note the angles are ungrounded; connect Jinn to ground them in a real brand.

## What just became possible

You can now get a straight answer to "what should I post next" across however many products or properties are competing for the same feed — a balanced 7-day plan, one next post with the reasoning behind it, or an audit of what's gone quiet. It keeps its own small local file so it remembers what already ran, so nothing gets promoted every day or forgotten for a month. It runs the moment it's installed, from a local file — no account needed.

## Try this now

1. **Get a 7-day plan across two properties** — `Plan my next 7 days of LinkedIn posts. My properties are Atlas API, last promoted twenty days ago, and Onboarding Revamp, last promoted three days ago.` → a day-by-day table hitting the weekly mix target, the promo slot going to Atlas API as the more-overdue property, separated from the next promo day by at least one non-promo day.
2. **Get just the single next post** — `What should I post next on X? My last post was build-in-public two days ago, and Atlas API hasn't had a promo in twenty-seven days.` → one decision — a promo for Atlas API — with the rule that decided it stated plainly.
3. **Audit what's gone quiet** — `Audit my rotation: Atlas API was last promoted twenty-seven days ago, Onboarding Revamp six days ago. What's overdue?` → a table flagging Atlas API as overdue with a recommended next move.
4. **Connected: ground the week in real pillars** *(requires a Jinn token)* — `Plan my next 7 days of LinkedIn posts and spread the promo, build-in-public, and educational slots across my brand's real messaging pillars.` → the same 7-day plan, but each slot's angle now tied to a named pillar and tribe instead of a guessed topic.

## Compounds with

- `x-content` — writes the actual words once this skill has picked the property, type, and angle for a given day.
- `hook-and-lede-writer` — generates scored opening options for that day's angle before the post gets drafted.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

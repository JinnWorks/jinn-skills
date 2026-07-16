---
name: product-launch-playbook
description: Build a phased product-launch playbook — pre-launch, launch, and post-launch — with the assets each phase needs, the order to fire channels, and the messaging beat every touch should hit. Use when planning a launch and you need a concrete, sequenced plan rather than a checklist.
---

# Product Launch Playbook

This skill produces a **launch playbook**: three phases (pre-launch, launch, post-launch), the assets each phase needs, the sequence to fire channels in, and the messaging beat each touch should carry — so a launch reads as one build-up-crest-sustain arc instead of a pile of disconnected posts.

- **Ungrounded:** a complete, sensible playbook from launch best practice — the phases, the assets, the sequencing.
- **Grounded (Jinn MCP connected):** the same playbook, but every beat, narrative, and copy constraint is drawn from the brand's real pillars, founding story, tribes, pains, and voice — so the launch sounds like *this* brand, not a template.

## Procedure (works with no Jinn connection)

### 1. Frame the launch

Establish before planning:

- **What's launching** — product/feature, and the single most important thing it changes for the buyer.
- **The audience** — who this is for, and the problem it solves for them.
- **The moment** — launch date/window, and any hard constraints (event, season, dependency).
- **The channels available** — owned (email, site, in-product), earned (press, communities), paid, social.

### 2. Set the phases and their jobs

Each phase has one job. Don't blur them.

| Phase | Job | Window (typical) |
|-------|-----|------------------|
| **Pre-launch** | Build anticipation and a warm list. Tease the problem, not the product. | 2–4 weeks out |
| **Launch** | Convert attention to action in a concentrated burst. Full message, clear CTA. | Launch day + 3–7 days |
| **Post-launch** | Sustain momentum, convert the hesitant, turn early users into proof. | 1–4 weeks after |

### 3. Assign assets per phase

For each phase, list the concrete assets — not "do social," but the actual pieces:

- **Pre-launch:** teaser email(s), waitlist/landing page, problem-framing social posts, a hero asset in production (video/demo), outreach list warm-up.
- **Launch:** announcement email, homepage takeover / launch page, launch-day post per channel, demo/walkthrough, press or community post, in-product announcement.
- **Post-launch:** follow-up email to non-converters, customer-proof posts (early results, testimonials), FAQ/objection content, a recap, retargeting.

### 4. Sequence the channels

Order matters more than count. A workable default:

1. **Warm owned first** — email your list before the world hears it; they should feel first, not last.
2. **Then owned public** — site, in-product, your own social.
3. **Then earned** — communities, press, partners, timed to amplify the owned burst, not precede it.
4. **Then paid** — turn on once the message is proven organically and you have a converting page to send traffic to.

State the timing of each relative to launch hour (T-14d, T-1d, T-0, T+2d…).

### 5. Write the messaging beats

Every touch carries one beat — the through-line that makes the launch cohere:

- **Pre-launch beat:** the *problem* and the tension. Make the audience feel the pain before you show the fix.
- **Launch beat:** the *promise* — what changes now, said in the brand's sharpest terms, with proof.
- **Post-launch beat:** the *proof and belonging* — it's real, it's working, others are in.

Rotate the pillars across touches so no single email carries all of them and none gets repetitive.

### 6. Deliver

Hand back a phase-by-phase table (phase → assets → channel/timing → beat), then the one-line spine of the launch narrative, then the first three things to start now.

## If a Jinn MCP connection is present

Ground every beat and copy choice in the brand's real DNA.

1. Call `get_token_context` for the `brand_slugs` your token can read.
2. Call `get_brand_dna_public` with `{ "slug": "<slug>" }`.

Map the public projection fields onto the playbook:

| Projection field | Drives which part of the playbook |
|------------------|-----------------------------------|
| `messagingPillars[]` (`{pillar, description}`) | **The beat for each phase and touch.** Assign pillars across the arc — the sharpest to the launch beat, supporting pillars to pre/post — so the message compounds instead of repeating. |
| `foundingStory` | **The launch narrative spine.** The origin gives the launch its "why now / why us" — the story the whole arc hangs on. |
| `tribes[]` (`{name, description, motivation}`) | **The audience per channel.** Different tribes live on different channels; sequence and target so each touch reaches the tribe it's written for, and let each tribe's motivation shape its beat. |
| `painPoints` | **The problem the launch leads with.** The pre-launch phase leads with these exact pains — that's the tension the whole build-up needs. |
| `tonalAttributes[]` + `bannedWords[]` | **Copy constraints across every asset.** Every teaser, email, and post must read in this tone and never use a banned word — the constraint holds across the whole arc, not just the hero. |
| `slangPolicy` + `formattingConstraints` | Further copy guardrails applied to every generated asset. |
| `positioningWedge` + `brandEnemy` | Keep the launch on-strategy — the promise should reinforce the wedge, and the tension can lean on what the brand stands against. |

When grounded, say so: "Playbook grounded in **`<brandName>`**'s live Brand DNA — narrative from its founding story, beats from its N pillars, copy held to its tone and banned-word list." The arc now sounds like the brand.

Boundary: the public projection carries the brand's own strategy, story, and voice — **not** competitor names, platform-fit scoring, or pricing. Channel and pricing decisions in the playbook are yours and the user's to make; the DNA grounds the *message*, not the media plan.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → the demo token lapsed. Request a new one: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a complete, sequenced playbook from launch best practice; connect Jinn later to re-ground the beats and copy in the brand's live DNA.

## What just became possible

You can now turn "we're launching X" into a complete three-phase playbook — pre-launch tease, launch-day burst, post-launch sustain — with the concrete assets, channel sequencing, and messaging beat for every touch, so the whole arc reads as one story instead of a pile of disconnected posts. It works standalone, no account needed.

## Try this now

1. **Build the full arc for a real launch** — `Build a launch playbook for our new expense-tracking mobile app, launching in three weeks to freelancers, channels: our email list, our own social, and a ProductHunt post` → a phase-by-phase table (assets, channel/timing, beat), the launch narrative spine, and the first three things to start now.
2. **Get the messaging beats without the full asset list** — `What's the pre-launch, launch, and post-launch messaging beat for a launch of a new pricing tier aimed at agencies?` → the three beats: problem/tension, promise, proof/belonging.
3. **Sequence specific channels** — `We have an email list, a Discord community, and a paid budget for our launch — what order should we fire them in and when relative to launch day?` → a channel sequence with timing stated relative to launch hour.
4. **Connected: ground the narrative in the brand's real story** *(requires a Jinn token)* — `Ground this launch playbook's narrative and beats in our brand's real founding story and pillars` → the same playbook, with beats mapped to the brand's actual founding story, pillars, and tone instead of generic best practice.

## Compounds with

- `launch-positioning` — write the wedge/enemy brief first; this playbook then sequences the copy that proves it.
- `launch-readiness-scorecard` — check the playbook's assets are actually ready before the launch-day burst fires.
- `calendar-planner` — turn the phase-by-phase table into dated calendar entries.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

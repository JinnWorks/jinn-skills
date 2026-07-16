---
name: hook-and-lede-writer
description: 10 scored hook-and-lede pairs for one topic and audience, tagged to a framework and checked against the content behind it — unearned hooks flagged. Use when picking an opening before writing, any format. Not the finished post (x-content, linkedin-content) or ad copy (ad-copy-variants). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Hook & Lede Writer

Deliverable: **10 scored hook-and-lede pairs** for one topic and audience — each tagged to a named framework, scored for specificity and tension, and checked against whether the material actually pays off what the hook promises. Pick the strongest, then hand it to whichever skill writes the finished piece: `linkedin-content` or `x-content` for a post, `ad-copy-variants` for paid copy, or straight into a blog draft, video script, or email subject line.

This writes **openings**, not pieces, and it's format-agnostic — one topic in, ten candidate hooks out, for whatever you're about to write. It isn't `campaign-brief` (a one-page strategy doc where "hooks" is one field among several, written before any creative exists) and it isn't `messaging-ab-tester` (which tests finished variants against each other and judges results — this generates and ranks candidates before a word of the piece is written).

**The house rule:** a hook only earns its spot if the content behind it actually pays it off. A curiosity gap with nothing behind it, a specific-number hook with no real number supplied, a before/after with no real "after" — that's clickbait wearing a framework's name. This skill flags it, every time, instead of quietly shipping a strong-sounding hook the piece can't cash.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Topic | the subject the opening leads into |
| Audience | who reads or watches this, one line — what they already believe, what would make them stop |
| The real content behind it | what the piece actually delivers: the proof, the argument, the story, the number. This is what the earned check runs against — leave it blank and every hook defaults to unearned rather than inventing backing for it |
| Format | optional — blog, video script, email subject + preview, landing-page hero, social post, ad [default: format-agnostic prose that ports cleanly into any of these] |
| Tone / words to avoid | optional, if not connected to a brand |

### 2. Generate one hook per framework

Write one hook against each framework below, aimed at the real topic and audience from step 1 — not a generic placeholder. Ten frameworks, ten hooks:

| Framework | What it does | Example (illustrative, not brand copy) |
|-----------|---------------|------------------------------------------|
| Curiosity gap | Names that an answer exists without revealing it | "There's one setting in most CRMs that quietly caps your pipeline — almost nobody checks it." |
| Contrarian | States the field's common advice is wrong, flat, no hedge | "Stop split-testing your homepage. That's not where the money is leaking." |
| Specific-number | Leads with the exact figure, never a rounded one | "We took onboarding from 14 steps to 3. Here's what we actually cut." |
| Story-open | Drops the reader mid-scene, no preamble | "The renewal email landed at 4:58pm on a Friday: 'We're moving to a competitor.'" |
| Enemy-naming | Names the real antagonist — a tool, a belief, a status quo | "The weekly status meeting killed this launch. Not the deadline." |
| Direct-question | Asks the reader's exact unspoken question back at them | "Why does your best rep still miss quota every Q1?" |
| Before/after | The gap between the old way and the new is the whole hook | "Eighteen months ago we shipped once a quarter. Now it's every Tuesday." |
| Confession | Opens on a real mistake or a surprising admission | "We shipped a pricing page that cost us our best customer. Here's the line that did it." |
| Second-person-diagnosis | Describes the reader's exact situation back to them, precisely | "You've got three dashboards open right now and still don't trust any of the numbers." |
| Pattern-interrupt | An oddly precise, unexpected detail that snags attention before the point lands | "It took exactly eleven Slack messages to lose a forty-thousand-dollar deal." |

If a framework genuinely doesn't fit the topic (a confession hook forced onto a neutral how-to piece reads as manufactured), skip it and note why rather than padding out a weak tenth entry — nine honest hooks beat ten, one of which is filler.

### 3. Write the matching lede

For each hook, write the one to three sentences that follow it — the lede delivers a first real piece of the payoff and pulls the reader into the body, it doesn't just restate the hook in different words. Write it like you're picking back up a conversation you already started with this person, not opening a pitch to a stranger: short, direct sentences, a real detail instead of an adjective, no throat-clearing ("in today's landscape…"), no hedging ("this can help…"). If a format was given in step 1, respect its real shape — a video hook is spoken and short (roughly five seconds, 15-20 words); an X hook and its lede together still need to clear the platform in one post; a blog or landing-page hook can run a full sentence with a fuller lede paragraph behind it; an email subject/preview pair is two short fragments, not sentences.

### 4. Score each hook

Score every hook 0–10 on each axis, total out of 20:

- **Specificity** — does it carry a name, number, or concrete detail, or does it float on adjectives and abstractions?
- **Tension** — does it open a real, unanswered gap that only the piece closes, or is the "gap" already obvious from the hook itself?

Bands: **15–20 strong** · **8–14 workable** · **0–7 weak, rewrite or cut.**

### 5. Run the earned check

Separately from the score, check every hook against the "real content behind it" from step 1: does the material actually supply what the hook promises? A hook can score a strong 18 on specificity and tension and still fail this check if the number, story, or proof it teases isn't in what was supplied.

- **Earned** — the content backs the promise. Ships as scored.
- **Unearned** — flag it by name, state exactly what's missing ("promises a specific figure; none was supplied" / "implies a before/after; only the after was described"), and offer the fix: supply the missing piece, or rewrite the hook down to what the content actually supports. Never quietly soften it for the user and ship it as if it passed.

### 6. Rank and deliver

```
HOOK & LEDE SET — <topic>, for <audience>

10 hooks, scored on specificity + tension (0-10 each). An unearned
hook is flagged here, not buried in the score — a high score and a
broken promise are two different problems.

1. [enemy-naming]        18/20 (spec 9, tension 9)   EARNED
   Hook: "..."
   Lede: "..."

2. [contrarian]           16/20 (spec 8, tension 8)   EARNED
   Hook: "..."
   Lede: "..."

...

7. [specific-number]      17/20 (spec 9, tension 8)   UNEARNED
   Flag: promises an exact figure; none was supplied in "the real
   content behind it" — either add the real number or rewrite this
   one as a directional claim instead.
   Hook: "..."
   Lede: "..."

Top pick: #1 — highest-scoring hook that's also fully earned.
```

Lead with the ranked list, strongest earned hook first; unearned hooks stay in the set (cutting them silently hides a real gap worth knowing about) but never claim the top spot over an earned hook with a comparable score.

## If a Jinn MCP connection is present

### Better — ground the frameworks in the brand's real signals

Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `brandEnemy` | **Enemy-naming, directly** — the brand's actual chosen antagonist, not a guessed one. |
| `positioningWedge` | **Contrarian hooks** — the brand's real competitive edge, not a generic hot take. |
| `painPoints` | **Direct-question and second-person-diagnosis hooks** — the reader's actual documented frustration. |
| `tribes[]` (`{name, description, motivation}`) | **Who each hook is aimed at** — pick the tribe, write to its real `motivation`. |
| `foundingStory` | **Story-open hooks** — a real scene from the brand's own record, not an invented one. |
| `messagingPillars[]` (`{pillar, description}`) | **Which claims are safe to tease** — a specific-number or before/after hook only promises what a real pillar can back, which sharpens the earned check itself. |
| `coreValues`, `archetype` | **How far confession/pattern-interrupt can go** — some archetypes read as candid when self-deprecating; others read as reckless. |
| `tonalAttributes[]` | **Voice on every hook and lede** — write in these adjectives verbatim. |
| `slangPolicy` / `formattingConstraints` | **Cadence and register** — how casual, how much punctuation-as-emphasis, emoji/hashtag policy. |
| `safeWords` / `bannedWords` | **Diction** — reach for one, hard-filter the other, in both hook and lede. |

State which fields grounded which hooks when you deliver — "enemy-naming built on `<brandName>`'s real `brandEnemy`," not just "on-brand." Only the fields above exist on a public token; there is no competitor, differentiation, engagement-analytics, or pricing data in the projection — don't reference or request it.

### Best — a Connected brand on Jinn

Ghost's own daily writing-brief pipeline already does a narrower version of this job for real, every morning: it picks the brand's top-scored open listening signal, pairs it with the brand's live voice and active campaign, and composes one hook the writer can open and ship before lunch — autonomously, at Connected-brand scale. This skill produces ten candidates for a human to choose from; Ghost's pipeline produces one, chosen for you, tied to a real signal instead of a topic you typed in.

That pipeline isn't reachable from a public token; this skill can only point at it, not run it. The audit above still runs in full at the Better rung — Best replaces "pick the strongest of these ten" with "Ghost already picked one this morning, and it's sitting in your queue."

## When a call fails

Read `data.code` on the JSON-RPC error and act — the procedure still runs ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the ten-hook procedure still runs in full against the topic, audience, and content you supplied; note the set is ungrounded and connect Jinn to ground the frameworks in a real brand.

## What just became possible

You can now get ten scored opening options for whatever you're about to write — a blog post, a video script, an ad, a social post — each built on a named framework, scored for how specific and tense it is, and checked against whether the piece behind it can actually deliver on what the hook promises. Give it a topic, an audience, and what the piece really contains, and it hands back a ranked list with the weak or unearned ones called out by name. It runs the moment it's installed — no account, no setup.

## Try this now

1. **Get ten scored hooks for a real topic** — `Give me ten hook-and-lede pairs for a blog post about why most onboarding flows lose users in the first session, aimed at product managers who already assume users are just impatient.` → ten framework-tagged hooks with specificity and tension scores, ranked, top pick called out.
2. **Check whether a hook is earned** — `I want a hook that says we cut onboarding time in half, but I only have a customer quote saying it feels faster with no actual numbers — is that hook earned?` → that specific hook flagged UNEARNED, with the missing piece named and a fix offered.
3. **Get hooks shaped for one format only** — `Give me hook options for a fifteen-second video script about a pricing change, for existing customers who are anxious about cost going up.` → hooks written in a spoken register with a short matching lede, sized to a five-second video hook.
4. **Connected: name the real enemy** *(requires a Jinn token)* — `Give me ten hooks for a post about switching away from spreadsheets, and build the enemy-naming hook on my brand's actual named enemy, not a guess.` → the same ranked set of ten, with the enemy-naming hook grounded in the brand's live brandEnemy field.

## Compounds with

- `content-atomizer` — pick the strongest hook here before atomizing a long source, so every derivative opens strong.
- `ad-copy-variants` — hand the top-ranked hook straight into paid-copy variant generation.

---

*Grounding + three-state contract by Jinn.*

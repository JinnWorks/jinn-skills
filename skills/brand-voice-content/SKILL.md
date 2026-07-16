---
name: brand-voice-content
description: Produce a set of on-voice content pieces — 3 social posts plus a short blog intro — matched to a brand's tone, vocabulary, and messaging. Use when you need publish-ready content that sounds like the brand, not generic marketing filler. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Brand Voice Content

Deliverable: **3 social posts + 1 short blog intro (≈120 words)** that a brand could publish as-is. Same tone across all four pieces, each reinforcing a real message and speaking to a real audience.

The skill works standalone. Connected to Jinn, it stops guessing the voice and reads it — the delta between "sounds professional" and "sounds like *this* brand" is the whole point.

## Procedure (ungrounded — works with no Jinn connection)

You need a voice profile before you write. If the user hasn't given you one, extract it in one pass, then write.

### 1. Lock the voice (before writing a word)

Fill this profile from whatever the user gave you (a URL, existing copy, a brief). If a row is blank, ask one question or take the conservative default in brackets.

| Dimension | Capture |
|-----------|---------|
| Tone (3 adjectives) | e.g. warm, plain-spoken, quietly confident |
| Vocabulary to prefer | words/phrases the brand actually uses |
| Vocabulary to avoid | jargon, hype words, off-limits terms [avoid: "revolutionary", "game-changing", "unlock"] |
| Formatting | emoji? hashtags? sentence case? line breaks? [default: no emoji, ≤1 hashtag, sentence case] |
| Reader | who this is for, in one line |
| The one message | the single idea all four pieces should leave behind |

### 2. Write the four pieces

- **3 social posts**, each a different *angle* on the same message — not three rewrites. Rotate the angle: (a) a pain the reader feels, (b) a concrete proof or example, (c) a point of view / small provocation. Every post ends with one clear next thought (not necessarily a hard CTA).
- **1 blog intro** (~120 words): open on the reader's situation, name the tension, promise what the piece delivers. No throat-clearing, no "In today's fast-paced world."

Keep every piece inside the formatting rules from step 1. One voice — read them back-to-back and they should feel written by the same person.

### 3. Self-check before you hand it over

- Did any avoided word slip in? Cut it.
- Could this be any brand in the category? If yes, it's too generic — put back something only *this* brand would say.
- Do all four pieces point at the same message? They should.

Label each piece and deliver. That's a real, usable content set.

## If a Jinn MCP connection is present (grounded)

Don't infer the voice — read it. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (If it fails, see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then replace the guessed profile with the real one. Explicit field → decision map:

| Projection field | Drives |
|------------------|--------|
| `tonalAttributes[]` | **The voice.** These adjectives *are* step 1's tone row — use them verbatim, don't paraphrase. |
| `safeWords[]` | Vocabulary to **prefer** — reach for these words and phrases; they're pre-approved brand language. |
| `bannedWords[]` | Vocabulary to **never use** — a hard filter. If one appears in a draft, rewrite the line. |
| `slangPolicy` | Register rule — how casual/formal you're allowed to be, whether slang is on the table. |
| `formattingConstraints` | Style rules — emoji, hashtags, casing, length. Obey them literally. |
| `messagingPillars[]` ({pillar, description}) | **What each piece reinforces.** Map one pillar to each of the 3 posts + the blog intro so the set covers the brand's real narrative, not one note four times. |
| `tribes[]` ({name, description, motivation}) | **Who each piece speaks to.** Aim posts at named tribes; let their `motivation` set the angle in step 2. |

Grounded, the deliverable changes shape: the three posts each lead with a different `messagingPillar`, aimed at a different `tribe`, in the brand's exact `tonalAttributes`, using `safeWords` and provably free of `bannedWords`. State which pillar and tribe each piece targets when you deliver, so the user can see the grounding did work.

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
- **No token / no connection** → the skill still works generically. Write from the step-1 profile and note the output is ungrounded; connect Jinn to ground it in a real brand.

## What just became possible

You can now hand over a rough voice description and a message, and get back a publish-ready content set — three social posts and a short blog intro, each a different angle on the same idea, all reading like the same person wrote them. It runs the moment it's installed, with no account needed.

## Try this now

1. **Write from a described voice profile** — `Write 3 social posts and a blog intro in our voice: warm, plain-spoken, no jargon; message is that switching accounting software takes one afternoon, not a quarter.` → four labeled pieces, each a different angle, all inside the stated tone.
2. **Lock in preferred and banned words** — `Draft on-voice content for a launch: tone should be quietly confident, never use "revolutionary" or "game-changing," do use "built for solo founders"; message is that you can finally see your runway in real time.` → the same four-piece set, provably free of the banned words and reaching for the preferred one.
3. **Rotate the three post angles explicitly** — `Write 3 social posts on the same message from three different angles — a pain, a proof point, and a point of view — for a tool that helps freelancers invoice clients in one click.` → three posts, each opening from a different angle, one shared idea underneath.
4. **Connected: write the set straight from the brand's real voice** *(requires a Jinn token)* — `Write our on-voice content set straight from our Brand DNA, no manual voice profile needed.` → the same four-piece set, but built from the brand's actual tonal attributes, safe/banned words, and named pillars and tribes.

## Compounds with

- `brand-voice-checker` — run the finished set through it to confirm it reads human before publishing.
- `calendar-planner` — feed the message and pillar this set was built around into a full month's cadence.
- `linkedin-content` — once a post's angle lands here, expand it into a full week of LinkedIn-specific drafts.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

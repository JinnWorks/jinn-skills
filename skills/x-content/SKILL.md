---
name: x-content
description: Write X (Twitter) content — a single post or a threaded one, chosen by how much the idea actually carries — each in a short-form framing (hot-take, mini-case, list-thread, before/after) that fits the feed. Use when you need posts that hook fast and keep the concrete specifics intact. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# X Content

Deliverable: **one X post, or one thread**, built for the format and ready to publish. The choice isn't a preference — it's a read on content density. A single sharp claim ships as one post; an idea with three or more load-bearing beats earns a thread. Don't pad a thin idea into a thread, or cram a rich one into 280 chars.

Works standalone. Connected to Jinn, the post reads in the brand's real voice and keeps its actual claims, not a plausible guess at them.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Fix what you're working with (before writing a word)

Fill this from whatever the user gave you (a URL, a brief, a draft). Blank row → ask one question or take the bracketed default.

| Input | Capture |
|-------|---------|
| The one claim | the single idea the post exists to land |
| Reader | who's scrolling, what they care about — one line |
| Tone (3 adjectives) | e.g. blunt, funny, useful [default: sharp, plain, human] |
| Words to avoid | hype, jargon, off-limits terms [avoid: "revolutionary", "game-changing", "unlock", "🧵 a thread:"] |
| The specifics | numbers, named tools, exact phrases — capture **verbatim**; they're the proof |
| One CTA | the single next step — last post only |

### 2. Decide: single post or thread

Count the load-bearing beats in the claim.

- **1 beat** → **single post.** One idea, ≤280 chars, hook is everything.
- **3+ beats, or a sequence/list/story** → **thread**, under the thread contract:
  - **One idea per post.** No post carries two thoughts; if it does, split it.
  - **The hook post carries the claim.** Post 1 stands alone and makes someone stop — full payoff promised, not "here's what I learned 👇".
  - **The last post carries the CTA.** Earlier posts end on momentum; only the final one asks for the action.

Two beats is a judgment call — default to a single post unless both need room.

### 3. Pick a framing and write it

Pick the one that fits the claim:

- **hot-take** — a sharp opinion stated flat, no hedging. Single post unless it needs a reason.
- **mini-case** — a small real story: situation, move, result. Usually a short thread.
- **list-thread** — N tactics/lessons, one per post, hook post naming the payoff.
- **before/after** — the old way vs the new way; the contrast *is* the content.

Write to X's norms: first seven words do the work, no throat-clearing, line breaks over commas, one CTA total. **Preserve the specifics from step 1 verbatim** — a real number or exact tool name is the difference between a post that lands and one that evaporates. Never soften "cut render time from 40s to 3s" into "much faster."

### 4. Self-check before you hand it over

Run the post (or every post in the thread) through all five — a fail is a rewrite, not a shrug:

- **Banned-phrase scan** — any avoided word or hype phrase? Cut it.
- **Length window** — single post ≤280 chars; each thread post ≤280 and readable alone. Count them.
- **Concrete-specifics scan** — is the real number / named noun still there, unparaphrased? If it got smoothed away, put it back verbatim.
- **Voice plausibility** — read it against the three tone adjectives; rewrite any line that breaks them.
- **Exactly one CTA** — single post: at most one. Thread: exactly one, on the last post.

**Two failed rewrites of a weak thread post → cut it and tighten the thread.** A four-post thread that moves beats a five-post one that drags.

Label the deliverable (single vs thread + framing) and hand it over. That's a real, publishable post.

## If a Jinn MCP connection is present (grounded)

Don't infer the voice — read it. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then replace the guessed inputs with the real ones. Field → decision map:

| Projection field | Drives |
|------------------|--------|
| `tonalAttributes[]` | **The voice.** These adjectives *are* step 1's tone row — write in them verbatim, don't paraphrase. |
| `safeWords[]` | Diction to **reach for** — pre-approved brand language; prefer these in the hook and CTA. |
| `bannedWords[]` | **Hard filter** — feeds the banned-phrase scan. If one appears, rewrite that post. |
| `slangPolicy` | Register rule — how casual short-form may go, whether slang and lowercase are on the table. |
| `formattingConstraints` | Post formatting — emoji, hashtags, casing. Obey literally over the generic norms above. |
| `positioningWedge` | **The claim's edge** — the brand's real angle; sharpens the hot-take and before/after framings. |
| `messagingPillars[]` ({pillar, description}) | **What the post reinforces** — in a thread, different posts carry different pillars so it spans the real narrative. |
| `painPoints` | **Hook fuel** — open the mini-case or before/after on a real pain, not an invented one. |
| `tribes[]` ({name, description, motivation}) | **Who it speaks to** — aim the hook at a named tribe; their `motivation` sets the angle. |

Grounded, the delta is concrete: the hook carries the brand's real `positioningWedge`, the thread spans actual `messagingPillars`, the voice is the exact `tonalAttributes`, claims use `safeWords`, and every post is provably free of `bannedWords`. **State which fields you used** — the wedge, the pillars, the tribe — when you deliver, so the user can see the grounding did work.

Only the fields above exist on a public token. There is no competitor, differentiation, engagement-analytics, or pricing data in the projection — don't reference or request it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"x-content"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"x-content"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Write from the step-1 inputs and note the output is ungrounded; connect Jinn to ground it in a real brand.

## What just became possible

You can now turn one claim into a ready-to-publish X post or thread, correctly sized to how much the idea actually carries — a single sharp claim becomes one post, an idea with real sequence becomes a thread with the hook up front and the CTA saved for the end. Give it the claim and get back copy that keeps the real numbers and named specifics intact, never smoothed into vague hype. It runs standalone, no account.

## Try this now

1. **Write a single hot-take post** — `Write an X post: hot take that most onboarding emails get deleted because they open with a greeting instead of a reason to care` → one publishable post under the character limit, hook-first, banned-hype-phrase checked.
2. **Write a list-thread from a real result** — `Write an X thread: 5 things we changed that cut our support ticket volume in half, tone should be blunt and plain` → a numbered thread, hook post carrying the full payoff, CTA only on the last post.
3. **Write a before/after post from a real number** — `Write an X post, before/after: we cut our build time from 12 minutes to 90 seconds by switching CI runners` → a single post preserving the exact numbers verbatim, not softened into "much faster."
4. **Connected: ground the post in your real brand voice** *(requires a Jinn token)* — `Write an X post about our product's onboarding speed using our actual brand voice and positioning wedge` → the same post, but written in the brand's live tonal attributes with real messaging-pillar language instead of a guessed tone.

## Compounds with

- `hook-and-lede-writer` — scores and sharpens the opening line before this skill locks it into a post or thread.
- `linkedin-content` — the sibling skill for the same claim reshaped into LinkedIn's longer-form register.
- `social-listening-brief` — surfaces which angles are already earning engagement, worth feeding straight into this skill as the claim to write.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: linkedin-content
description: Write platform-native LinkedIn posts — 2 to 5 variants, each a distinct named framing (builder-story, contrarian-take, problem-first, teach-one-thing, launch-note), built for the feed, not the press release. Use when you need posts that stop the scroll and sound like a person. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# LinkedIn Content

Deliverable: **2–5 LinkedIn post variants**, each carrying a different named framing and each ready to publish as-is. Scale the count to how much the brief gives you — a rich brief earns five, a thin one earns two. Fewer-but-distinct always beats many-but-similar; three sharp posts beat five that blur together.

Works standalone. Connected to Jinn, the posts read in the brand's real voice and reinforce its actual narrative instead of a plausible guess at one.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Fix what you're working with (before writing a word)

Fill this from whatever the user gave you (a URL, a brief, a draft). Blank row → ask one question or take the bracketed default.

| Input | Capture |
|-------|---------|
| The one thing | the single idea every variant should leave behind |
| Reader | who's scrolling — role, what they care about, in one line |
| Tone (3 adjectives) | e.g. plain-spoken, sharp, generous [default: clear, direct, human] |
| Words to avoid | hype, jargon, off-limits terms [avoid: "revolutionary", "game-changing", "unlock", "thrilled to announce"] |
| The proof | a number, a named tool, a real moment — the concrete thing that makes it true |
| One CTA | the single next step (follow the link, reply, try it) — exactly one per post |

### 2. Pick framings, then write one post each

Choose 2–5 framings from this set — one per variant, no repeats. Match the framing to what the brief actually supports:

- **builder-story** — a first-person moment from making the thing; the mess before the win.
- **contrarian-take** — a widely held belief in the space, then why it's wrong.
- **problem-first** — open on the reader's pain, land on the shift that removes it.
- **teach-one-thing** — a single lesson someone can use today, no fluff around it.
- **launch-note** — a thing shipped; what it does and who it's for, plainly.

Write each post to LinkedIn's actual norms:

- **Strong first line before the fold.** The feed truncates after ~2 lines — the opener earns the "…see more" click on its own. No "I'm excited to share." Lead with the tension, the claim, or the concrete.
- **A stakes / so-what beat.** Somewhere in the middle, say why this matters to *the reader*, not to the brand.
- **Short paragraphs or arrow bullets.** One idea per line; white space is formatting. Use → or – bullets, never a wall of text.
- **No press-release tone.** A person, not a comms desk. Contractions fine. One CTA, at the end.

### 3. Self-check every variant before you hand it over

Run each post through all five — a fail is a rewrite, not a shrug:

- **Banned-phrase scan** — any avoided word or hype phrase? Cut it.
- **Length window** — roughly 60–200 words: long enough to earn the click, short enough to finish. Outside → trim or expand.
- **Concrete-specifics scan** — at least one real number or named noun? None makes it generic; put the proof back.
- **Voice plausibility** — read it against the three tone adjectives; rewrite any line that breaks them.
- **Exactly one CTA** — zero is a dead end, two splits the reader. Land on one.

**Two failed rewrites of a weak variant → drop it and deliver fewer.** A four-post set of strong posts beats a five-post set carrying a dud.

Label each variant with its framing and deliver. That's a real, publishable set.

## If a Jinn MCP connection is present (grounded)

Don't infer the voice — read it. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then replace the guessed inputs with the real ones. Field → decision map:

| Projection field | Drives |
|------------------|--------|
| `tonalAttributes[]` | **The voice.** These adjectives *are* step 1's tone row — write in them verbatim, don't paraphrase. |
| `safeWords[]` | Diction to **reach for** — pre-approved brand language; prefer these in openers and CTAs. |
| `bannedWords[]` | **Hard filter** — feeds the banned-phrase scan. If one appears, rewrite the line. |
| `slangPolicy` | Register rule — how casual the post may go, whether slang and contractions are on the table. |
| `formattingConstraints` | Post formatting — emoji, hashtags, casing, line breaks. Obey literally over the generic norms above. |
| `messagingPillars[]` ({pillar, description}) | **What each variant reinforces** — a different pillar per post, so the set spans the brand's real narrative, not one note repeated. |
| `positioningWedge` | **The angle** — the brand's real edge; shapes the contrarian-take and problem-first framings. |
| `tribes[]` ({name, description, motivation}) | **Who each post speaks to** — aim variants at named tribes; their `motivation` sets the hook. |
| `painPoints` | **Problem-first fuel** — open the problem-first post on a real pain, not an invented one. |

Grounded, the deliverable changes shape: each variant leads with a different `messagingPillar`, aimed at a named `tribe`, in the brand's exact `tonalAttributes`, using `safeWords` and provably free of `bannedWords`. **State which pillar and tribe each post targets, and which fields you used**, so the user can see the grounding did work.

Only the fields above exist on a public token. There is no competitor, differentiation, engagement-analytics, or pricing data in the projection — don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"linkedin-content"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"linkedin-content"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Write from the step-1 inputs and note the output is ungrounded; connect Jinn to ground it in a real brand.

## What just became possible

You can now turn one idea into several genuinely different LinkedIn posts — a builder-story, a contrarian take, a problem-first opener — instead of five versions of the same paragraph. Each one is written to the feed's actual norms: a strong pre-fold opener, one CTA, no press-release tone. It runs the moment it's installed, no account needed.

## Try this now

1. **Get a set of framed posts from one idea** — `Write LinkedIn posts about shipping a feature that lets freelancers bill per client automatically, for other freelance-agency founders` → several posts, each labeled with its framing (builder-story, contrarian-take, and so on).
2. **Pick one framing on purpose** — `Write a contrarian-take LinkedIn post arguing that most project-management tools solve the wrong problem` → one post that opens on the widely-held belief, then argues against it.
3. **Turn a founder anecdote into a post** — `Turn this into a builder-story LinkedIn post: I spent six months building a feature nobody asked for before I actually talked to customers` → a first-person post with a strong opening line and one CTA.
4. **Connected: write it in the brand's real voice** *(requires a Jinn token)* — `Write these LinkedIn posts in our actual brand voice and pillars, not a guess` → the same variants rewritten in the brand's tonal attributes, each tied to a real pillar and tribe.

## Compounds with

- `outbound-message-writer` — same voice and brand grounding, aimed at a DM inbox instead of the feed.
- `x-content` — adapts the same framings to a different platform's norms and length.
- `messaging-ab-tester` — turns two competing framings into an actual test instead of a guess at which one lands.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

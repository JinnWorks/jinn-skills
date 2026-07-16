---
name: content-atomizer
description: Turn one long-form source — an article, blog post, or video link (YouTube included) — into platform derivatives (LinkedIn post, X thread/single, newsletter blurb, Instagram carousel copy, short-form video script, blog recap). Transforms one real asset; doesn't write new posts from nothing. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Content Atomizer

Deliverable: **a set of platform-shaped derivatives pulled from one long-form source** — a subset of LinkedIn post, X thread, X single post, newsletter blurb, Instagram carousel copy, short-form video script, and blog recap, sized to however many distinct angles the source actually supports.

This skill **transforms one existing asset**; it doesn't invent content from a blank page. If there's no source — just a topic, an announcement, or an idea — that's a different job: use `linkedin-content`, `x-content`, or `brand-voice-content` to write net-new posts instead.

Standalone, the derivatives are an honest, generic split of the source's real angles. Connected to Jinn, they're written in the brand's actual voice, each mapped to a real messaging pillar instead of a generic split — that's the delta.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Source | pasted text, an article/blog URL, or a video link (YouTube and similar) — treat all three as first-class. A transcript atomizes exactly like an article. |
| Platforms wanted | which derivative types, or "whatever the source actually supports" |
| Angle budget | how many distinct angles to pull [default: as many as the source genuinely supports, capped small — don't pad] |

If the source is thin — a headline, a tweet, a two-paragraph note — say so and ask for the fuller piece. A thin source is the single biggest cause of a bad atomize run: there isn't enough underneath it to ground real derivatives, so the temptation is to pad, and padding is exactly what step 3 exists to catch.

### 2. Extract angles

Read the whole source once before writing anything. Pull out the genuinely **distinct** angles it supports — different theses, different entry points, different audiences — never reworded restatements of the same point. A single-thesis source earns one or two angles; a rich source earns more, still capped small. For each angle, capture:

- **The thesis** — the one sentence a reader takes away.
- **Supporting points** — 2–4, each traceable to something the source actually says (quote or close paraphrase, not invention).
- **Platform fit** — which derivative types actually suit this angle. Not every angle belongs on every platform; forcing one that doesn't fit is how atomized content reads as filler.

**Never pad to hit a count.** If the source only supports one strong angle, one is the correct output. A rich source that could support ten still ships fewer, sharper ones — quantity is not the win condition here.

### 3. Ground every supporting point before writing a single derivative

This is the step everything else depends on, and it's non-negotiable: before turning an angle into a derivative, verify every number, statistic, quote, or named person/company/place in that angle's supporting points actually appears in the source. A close paraphrase is fine. An invented statistic, a quote the source never said, or a detail that sounds plausible but isn't there is not — drop it. If an angle has nothing left standing after this pass, drop the whole angle rather than stretch what remains to fill it.

This matters more here than in most content work: an atomized derivative reads as *reporting on* the source, so a reader reasonably expects every claim in it to be real. A generic post that undersells the source is a missed opportunity. A post that invents a number the source never had is a trust problem the brand owns, not the tool.

### 4. Shape each angle for its platform

Each platform is a distinct discipline, not the same paragraph reformatted:

- **LinkedIn post** — a strong opening line that earns the "…see more" click (the feed truncates fast), a stakes beat that says why this matters to the reader, short paragraphs or arrow bullets, one CTA at the end.
- **X thread / single post** — let the angle's density decide the shape: one load-bearing beat is a single post; three or more beats, or a real sequence, earns a thread where the first post alone makes someone stop and the last one carries the only CTA.
- **Newsletter blurb** — written for an inbox, not a feed: a subject-line-shaped opener, the angle's thesis in the first two lines, one clear link back to the full source.
- **Instagram carousel copy** — one role per slide (cover, body, CTA), a density ceiling tuned to a 2–3 second mobile scan per slide — this is copy only; rendering the actual 1080×1080 slides is `on-brand-artifact-builder`'s job.
- **Short-form video script** — hook inside the first few spoken seconds, written in a spoken register (contractions, short clauses), one visual beat per line, not an essay read aloud.
- **Blog recap** — a short intro that states the angle's thesis plainly, headers that carry the supporting points, a link back to the original source rather than re-explaining it in full.

### 5. Derivative QA gate (run before you deliver)

- Every claim in every derivative still traces to the source — re-check after any copy tightening, since a "make it punchier" pass is exactly where an unsupported number sneaks back in.
- Each derivative is platform-native, not the same sentence reformatted with a different line-break style.
- Exactly one CTA per derivative, sized to that platform's norm (a hard CTA for a newsletter, often none but momentum for a mid-thread post).
- No angle duplicated across two derivatives unless that's a deliberate cross-platform echo, not an accident of running out of angles.

### 6. Deliver

Label every derivative with (a) which angle it came from and (b) the platform it's shaped for, so the source of each claim is traceable. Flag anything the source only thinly supported rather than smoothing over the gap.

**The video-link difference, stated plainly:** this skill accepts a video link the same way it accepts pasted text or an article URL — hand it a YouTube link and it works from the transcript. Most atomizer tools only take an article or plain text. If a transcript isn't available and can't be pasted in, fall back to a written source.

## If a Jinn MCP connection is present (grounded)

Don't guess the voice or the narrative — read them. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Then replace the guessed shaping with the real one. Field → decision map:

| Projection field | Drives |
|-------------------|--------|
| `tonalAttributes[]` | **The voice** every derivative is written in — verbatim adjectives, not a paraphrase. |
| `safeWords[]` | Diction to reach for across all derivatives — pre-approved brand language. |
| `bannedWords[]` | **Hard filter** on every derivative — a hit anywhere is a rewrite, not a shrug. |
| `slangPolicy` | Register rule — how casual the short-form pieces (X, carousel, video script) are allowed to go. |
| `formattingConstraints` | Literal formatting rules — emoji, hashtags, casing — override the generic per-platform defaults above. |
| `messagingPillars[]` ({pillar, description}) | **Map each derivative to the pillar its angle actually serves** — not a generic split, a real one. State the mapping when you deliver. |
| `positioningWedge` | Sharpens which angle gets the hot-take-shaped derivatives (X, LinkedIn contrarian framing). |
| `tribes[]` ({name, description, motivation}) | Who each derivative is aimed at — pick the platform's audience against a named tribe, not a generic reader. |

Grounded, the set changes shape: each derivative carries the brand's exact `tonalAttributes`, is provably free of `bannedWords`, and maps to a real `messagingPillar` and `tribe` rather than a mechanical per-platform split of the same generic angle. **State which pillar and tribe each derivative maps to** when you deliver, so the grounding is visible, not asserted.

Only the fields above exist on a public token. There is no competitor, engagement-analytics, or scheduling data in the projection — don't reference or request it.

### Best — a Connected brand on Jinn

For a brand Connected on Jinn, atomizing no longer ends at a copy-paste handoff: each derivative lands directly as a draft in Ghost's queue, scheduled rather than delivered as text for the user to place by hand. That machinery isn't reachable from a public token; this skill can only point at it, not run it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the atomize still runs. Deliver the ungrounded derivatives and note they're not brand-verified; connect Jinn to ground the voice and pillar mapping.

## What just became possible

You can now turn one long article, blog post, or video transcript into a set of platform-ready posts — a LinkedIn post, an X thread, a newsletter blurb, a carousel script — each pulled from a genuinely distinct angle in the source and checked so no invented number or quote sneaks in. Paste in a real piece and it splits it into only as many angles as it actually supports. It runs the moment it's installed — no account, no setup.

## Try this now

1. **Atomize a real essay into platform posts** — `Atomize this essay into a LinkedIn post, an X thread, and a newsletter blurb: [paste Paul Graham's "How to Do Great Work" essay text]` → distinct angles pulled straight from the essay (choosing what to work on, iterating instead of over-planning, original thinking), each shaped for its platform with every claim traceable back to the text.
2. **Turn a video transcript into a thread** — `Here's a video transcript on our new pricing model — atomize it into an X thread and a short-form video script: [paste transcript]` → the thread and script built only from what the transcript actually says, with no invented statistic slipped in.
3. **Check whether a source is thick enough to atomize** — `Is this note thick enough to atomize into multiple platform posts, or is it too thin: "We just crossed ten thousand users. Feels surreal looking back at where we started."` → an honest thin-source flag and a request for the fuller piece, instead of padded filler dressed up as extra angles.
4. **Connected: map derivatives to real pillars** *(requires a Jinn token)* — `Atomize this article for LinkedIn and X, and tell me which of my brand's messaging pillars each derivative actually serves: [paste article]` → the same derivatives, each labeled with the specific pillar and tribe it maps to instead of a generic per-platform split.

## Compounds with

- `hook-and-lede-writer` — generate scored opening options for an atomized angle before locking the derivative's first line.
- `content-rotation` — feed each derivative into the rotation's schedule instead of posting it ad hoc.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

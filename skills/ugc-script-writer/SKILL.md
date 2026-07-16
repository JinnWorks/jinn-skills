---
name: ugc-script-writer
description: "Turn a product and angle into a UGC-format video script: creator-voice, direct-response spine (hook, lived problem, product demo, objection flip, soft CTA), spoken-word register, platform length targets. Not `video-hook-analyzer` (grades a hook); not `brand-voice-content` (written posts). Sharpest when connected to Jinn's Brand DNA over MCP."
---

# UGC Script Writer

Deliverable: a **UGC-format video script** — the words a creator says on camera, not a caption or a shot list. It follows a direct-response spine (hook → lived problem → product-in-hand demo → objection flip → soft CTA), carries shot/beat timing against a platform length target, and is written in **spoken-word register** — read it aloud and it should sound like a person talking, not a person reading.

Not `video-hook-analyzer` (grades an existing hook's first 5 seconds; this writes the whole script). Not `brand-voice-content` (on-voice posts/blurbs, not a spoken video script). Not `customer-story-builder` (a real customer's own story, quotes verbatim; this is a creator performing a written script, clearly scripted content). Not `storyboard-from-dna` (the visual shot board a script rides on — pair the two, but this skill owns the words, that one owns the frames).

Works with no Jinn connection. Connected to a brand's Jinn Brand DNA, the voice, vocabulary limits, and the specific problem and objection the script leans on come from the brand's real system instead of your best guess — see **If a Jinn MCP connection is present**.

## The claim-slot rule (read this before writing a line)

A UGC script earns the sell by feeling like testimony — that only works if the testimony is true. **Never script a fact the creator can't personally verify** ("I've used this for two years," "it fixed my skin overnight," "I'm a nurse and I recommend it to patients"). Scripting a fake lived claim isn't a style problem, it's a disclosure problem — the FTC's endorsement rules and every platform's branded-content policy turn on the testimonial being the creator's own experience.

Instead, write **claim slots** — bracketed prompts the creator fills with whatever is actually true for them:

```
[CREATOR: name how long you've actually had it / how you found it]
[CREATOR: your real before-state — what were you dealing with, in your words]
[CREATOR: the specific thing you noticed, in the timeframe that's actually true for you]
```

Everything else in the script — structure, timing, beat order, the objection to name, the CTA — is fully written. Only the experiential claims are slots. Flag every slot explicitly in the delivered script; never quietly fill one in with a plausible-sounding guess.

## The deliverable

```
UGC SCRIPT — <product>, <platform> · <target length>

Creator persona:     <who's talking — a relatable someone, never a spokesperson voice>
Platform / length:    <format, target seconds, sound-on default, caption-on-by-default assumption>
Angle:                 <the one angle this script sells — not a list of angles>
Claim slots:           <every [CREATOR: ...] slot in this script, listed once so nothing gets missed>

BEAT              | Timing      | Say (spoken line)                    | Do (shot/action)                | Caption / on-screen text
Hook              | 0:00-0:0X   | ...                                    | ...                               | ...
Problem (lived)   | ...         | ...                                    | ...                               | ...
Product-in-hand   | ...         | ...                                    | ...                               | ...
Objection flip    | ...         | ...                                    | ...                               | ...
Soft CTA          | ...         | ...                                    | ...                               | ...

Running duration check: <sum> against <platform ceiling>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Product | what it is, in one line a stranger would understand |
| Angle | the single offer framing or use-case this script sells — one angle, not several |
| Platform / length | vertical (9:16) organic (15-30s) vs. paid UGC ad (30-60s) vs. long-form testimonial (60-90s) — this caps the beat count before you write the hook |
| Creator persona | who's plausibly saying this — their rough life stage or context, never a named real person unless supplied |
| Claim boundaries | what the creator can truthfully say (ask, don't assume) — anything unverifiable becomes a claim slot, no exceptions |

If the angle is missing, ask — a script built on a guessed angle sells the wrong thing convincingly.

### 2. Write the direct-response spine, beat by beat

- **Hook (first 2-3 seconds, always).** A pattern interrupt native to the platform — a mid-sentence start, a visible reaction, a question the viewer is already asking themselves. Never "hi guys, today I want to talk about." On a skippable feed, the hook is the only beat that matters if it fails.
- **Problem (lived).** The creator's own before-state, first person, concrete and specific — not the brand's marketing language back at the viewer. This is where a `painPoints` field (grounded rung) sharpens the specificity; ungrounded, ask what the real target customer actually struggles with and write that, not a generic frustration.
- **Product-in-hand demo.** The creator physically holding, using, or showing the product doing the one thing the angle promises — show, don't narrate. One concrete action, not a features tour.
- **Objection flip.** Name the skepticism the viewer is actually feeling ("I know this looks like every other ad" / "I thought it'd be like the last one that didn't work") and answer it honestly — this is the beat most scripts skip, and skipping it is why most UGC reads as an ad instead of a recommendation.
- **Soft CTA.** One action, in the creator's voice, not a hard-sell tag line. A UGC script's CTA works because it sounds like a tip from a friend, not a call to action read off a card.

### 3. Write it to be said, not read

- Contractions, sentence fragments, and the rhythm of actual speech — not clean written-English sentences.
- Short lines. If a sentence needs a breath in the middle, break it into two lines.
- Cut any word a real person wouldn't say out loud in this context (brand jargon, "utilize," "seamless," "game-changing") — read every line aloud before calling it done.
- Mark a beat or breath pause explicitly where the pacing needs it: `(pause)`, `(laughs)`, `(look at camera)`.

### 4. Self-check before delivering

- Every claim slot is bracketed and listed in the header — nothing that should be a slot got written as a stated fact.
- Read the whole script aloud. If any line sounds written rather than spoken, rewrite it.
- The hook lands in the first 2-3 seconds and doesn't spend them on a greeting or a setup.
- The objection flip actually names a real skepticism — not a strawman the brand finds easy to answer.
- Running duration matches the platform ceiling, checked beat by beat.
- This is clearly a **scripted, creator-performed** piece — not presented as an unscripted testimonial. Disclosure/labeling (e.g. `#ad`, "Paid partnership") is the creator's and platform's responsibility, not this skill's, but nothing in the script should coach around disclosure.

## If a Jinn MCP connection is present (grounded)

Don't guess the voice, the real pain, or the real objection — read them. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|------------------|--------|
| `painPoints` (via `tribes[]`) | **The problem-lived beat.** Use the brand's real, named pain — not a guessed frustration — so the "before" state is specific enough to feel true. |
| `positioningWedge` | **The objection flip.** The skepticism worth naming is almost always the thing the brand's own wedge is arguing against — flip that objection, don't invent an easier one. |
| `tonalAttributes[]` | Bounds the creator's register — even in a relatable, informal voice, a script for a clinical/precise brand reads differently than one for a playful/loud brand. Use these adjectives to keep the creator-voice on-brand, not to make it sound corporate. |
| `slangPolicy` | How casual the creator can be — whether slang, profanity-adjacent language, or heavy internet-speak is on the table for this brand at all. |
| `safeWords[]` / `bannedWords[]` | Prefer `safeWords` where they fit naturally in spoken language; treat `bannedWords` as a hard filter on every line, including ad-libbed-sounding ones — a scripted line is still a brand line. |
| `tribes[]` ({name, description, motivation}) | Shapes the creator persona — who plausibly has this problem and this motivation, so the casting brief (not just the words) is on-target. |

Grounded, the script stops being generically relatable and starts naming the brand's actual customer pain and actual competitive objection, in a register the brand's real `tonalAttributes` would allow. State which fields you used — the pain point, the wedge, the tone — when you deliver.

Only the fields above exist on a public token. There is no ad-performance, platform-fit, or competitor data in the projection — don't reference or request it.

### Best — a Connected brand on Jinn

Once a brand is Connected, Jinn's video studio (in beta) can render UGC-style video from scripts like this one, matching the creator persona and pacing this script specifies. This skill never calls that machinery and never promises to; it's a pointer. Hand the finished script to a real creator to perform, or to the video studio to render from — this skill stops at the script.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the script still ships in its ungrounded form:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the script still ships in full. Build it from the step-1 inputs, note the pain point and objection are inferred rather than verified, and connect Jinn to ground them in a real brand.

## What just became possible

You can now turn a product and an angle into the actual words a creator says on camera — hook, lived problem, product-in-hand demo, objection flip, soft CTA, timed against a platform length target and written to be spoken, not read. Every claim the creator can't personally verify ships as a bracketed slot instead of a fabricated testimonial. It runs standalone, no account.

## Try this now

1. **Write a UGC script for a product and angle** — `Write a UGC script for a reusable water bottle, angle is "finally drinking enough water at my desk," 30 seconds for TikTok` → a beat-by-beat script (hook, problem, demo, objection flip, CTA) with claim slots flagged for the creator to fill.
2. **Write a longer paid-ad UGC script** — `Write a 45-second UGC ad script for a meal-kit service, angle is switching from takeout because it's actually cheaper` → the same spine at ad length, with timing checked against the platform ceiling.
3. **Write a script for a specific creator persona** — `Write a UGC script for a productivity app, creator persona is a busy freelance parent, angle is reclaiming evenings, 20 seconds vertical` → a script cast to that persona's voice and lived problem.
4. **Connected: ground the pain point and objection in the real brand** *(requires a Jinn token)* — `Write a UGC script for our product using our actual customer pain points and the real objection our positioning argues against` → the same spine, but the problem-lived beat and objection flip trace to the brand's live Brand DNA instead of a guessed frustration.

## Compounds with

- `storyboard-from-dna` — the shot-by-shot visual board this script's words ride on.
- `video-hook-analyzer` — grades this script's opening for hook strength and retention risk before it's shot.
- `content-atomizer` — cuts a finished long-form asset into platform derivatives once this script exists as a real video.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

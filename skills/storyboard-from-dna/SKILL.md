---
name: storyboard-from-dna
description: Turn a video concept into a shot-by-shot storyboard carrying brand identity, with a continuity spine held across shots. Use before a shoot or AI-video render. Not `shoot-brief-builder` (shoot-day brief); not `on-brand-artifact-builder` (HTML artifact); not `ugc-script-writer` (spoken script). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Storyboard From DNA

Deliverable: a **shot-by-shot storyboard** — the document that turns "we need a video about X" into a numbered sequence a director, animator, editor, or AI-video render pipeline can follow without a clarifying call. It's a planning document, not a finished asset: no video comes out of this skill, a plan for one does.

Works with no Jinn connection. Connected to a brand's Jinn Brand DNA, the mood, narrative stance, and (when the token carries it) the exact palette and type come from the brand's real system instead of your best guess — see **If a Jinn MCP connection is present**.

## The deliverable

```
STORYBOARD — <concept>, <platform> · <target duration>

Concept:            <the one idea this video proves or shows>
Key message:        <the single thing a viewer should walk away believing>
Platform / format:  <aspect ratio, max duration, sound-on or sound-off default>
Audience:            <who's watching, and where they're watching it>

CONTINUITY SPINE (lock once, hold across every shot)
Setting / world:     <where this lives — one location or a consistent world, not a new set per shot>
Light quality:        <hard/soft, direction, warm/neutral/cool — the thing that reads as "one shoot" even across cuts>
Palette:               <the 2-4 colors every shot pulls from>
Mood in 3 words:      <the adjectives every shot has to earn>
POV / protagonist:    <whose eyes or which character carries the story, if any>

SHOT LIST
# | Duration | Framing / composition        | Action                          | On-screen text                 | Palette / mood note                  | Audio / VO
1 | 0:00-0:03| Wide, static, establishing    | ...                              | none (hook is visual)          | spine palette, full mood             | VO line 1 / sound cue
2 | 0:03-0:07| Medium, slow push-in          | ...                              | "<verbatim text>" — negative space, upper third, high contrast against dark bg | spine palette, slightly brighter (product beat) | VO line 2
...
N | ...      | ...                           | ...                              | ...                             | ...                                   | end card / logo lockup

Running duration check: <sum of shot durations> against <platform ceiling>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Concept | the one idea this video proves or shows — not a list of ideas, one |
| Key message | the single sentence a viewer should be able to repeat after watching |
| Platform / format | aspect ratio (9:16, 1:1, 16:9), max duration, sound-on vs sound-off default — this caps the shot count before you write shot 1 |
| Audience | who's watching and where — a 6-second vertical scroll-stopper and a 60-second brand film earn attention differently |
| Content readiness | script/VO **supplied** (use verbatim) or **to-draft** (write it on-voice, on-message, grounded from the DNA fields below when connected) |

If any field is missing, ask — a storyboard built on a guessed key message sends the shoot or render to the wrong idea.

### 2. Lock the continuity spine before shot 1

Write down the handful of decisions every shot has to hold, **once**, before boarding a single frame: setting/world, light quality, palette (2-4 colors, not "whatever looks nice"), mood in three words, and — if a person or character carries the story — their POV. This is the same discipline `shoot-brief-builder` uses for physical shoot days (its "continuity notes," section 6); a video storyboard needs it even more, because drift is easier to miss across cuts than across stills laid side by side. A storyboard that lets the palette or mood quietly shift from shot 3 to shot 7 produces a video that feels like three ads stitched together, even if every individual shot is well-composed.

### 3. Build the shot list

Don't start from "what should we show" — start from the key message and the platform's duration ceiling, then board only the shots that earn their seconds. For each shot, capture:

- **Framing / composition** — shot type (wide/medium/close/insert), camera movement (static, push-in, pan, handheld), and how it reads next to the shots before and after it.
- **Action** — what actually happens in the shot, and which beat of the concept it carries. Every shot should trace to the key message; a shot that doesn't is a cut, not a nice-to-have.
- **On-screen text** — the verbatim wording (if any) plus a placement note. Apply the legibility discipline: **text lives in negative space, never over a face or the product**, and sits against a high-contrast zone (a dark band under light text, a light band under dark text) — not dropped onto a busy background and hoped for. If the storyboard is headed for a real render, `creative-contrast-qa` is the sibling skill that pixel-checks the finished frame against this same discipline once shots exist as images.
- **Palette / mood note** — how this shot's specific look is a *variation within the spine*, not a departure from it (e.g., "spine palette, slightly brighter for the product reveal beat" — still the same three colors, not a new one).
- **Audio / VO line** — the spoken line, sound design cue, or explicit silence for this shot. If a script exists (from `ugc-script-writer` or supplied), place its lines against the shots that carry them — the storyboard is the visual plan the script rides on, not a rewrite of it.
- **Duration** — seconds for this shot and the running total, checked against the platform's duration ceiling as you go, not just at the end.

Weight the opening shot deliberately: on any platform with a scroll or skip option, the first 2-3 seconds decide whether the rest gets watched. The opening shot should either be the hook itself or set it up in one beat — never a slow establishing shot that spends the viewer's attention before the concept arrives.

### 4. Self-check before delivering

- Continuity spine is written down once, and every shot's palette/mood note reads as a variation on it, not a drift from it.
- Every shot traces to the key message — no "cool idea, no home" shots.
- On-screen text sits in negative space, never over a face or the product, and names a high-contrast placement.
- Running duration matches the platform's ceiling, checked shot by shot, not just totaled at the end.
- The opening shot earns the first 2-3 seconds, not just "shot 1 of the sequence."
- If a script/VO exists, every line has a shot to ride on, and no shot's action contradicts what the line is saying.

## If a Jinn MCP connection is present

Ground the board in the brand's real system instead of inferred taste. Climb to the highest rung your token supports.

**Rung 1 — Connected tokens (design trio present).** If `tools/list` includes the design trio, call `get_token_context` for a slug, then `get_brand_kit({ slug })` + `get_brand_design_tokens({ slug })` + `get_brand_design_md({ slug })`, plus `get_brand_dna_public({ slug })`. On-screen text treatments and the end-card lockup use the DTCG color/type tokens **verbatim — never approximate a hex or font stack**. Logo/wordmark placement on any end card or lower-third follows the brand kit. Where `get_brand_design_md` documents motion, imagery, or type-on-video conventions, they **override generic styling taste**.

**Rung 2 — DNA-only (trio absent, `get_brand_dna_public` works).** Call `get_token_context` → `get_brand_dna_public({ slug })`. Derive the continuity spine's mood and a palette direction from the personality fields below, and **label every visual choice as an unverified inference** in the storyboard's notes.

**Rung 3 — No token (generic-tasteful).** Use the ungrounded procedure above and add an explicit **"not brand-verified"** line to the storyboard.

| Source · field | Drives |
|-----------------|--------|
| `get_brand_design_tokens` — color / type (DTCG) | On-screen text styling and end-card colors/type, verbatim. |
| `get_brand_kit` — logo, wordmark, brand name | End-card / lower-third lockup. |
| `get_brand_design_md` — layout & usage conventions | Any documented motion, imagery, or type-on-video rules; overrides generic taste on conflict. |
| `get_brand_dna_public` — `tonalAttributes` | The continuity spine's "mood in 3 words" language. |
| `get_brand_dna_public` — `archetype` | The narrative stance — whose story this is and how it's told (a Hero-archetype brand boards differently than a Caregiver-archetype one telling the same concept). |
| `get_brand_dna_public` — `messagingPillars` | Which pillar the key shot has to visually carry. |
| `get_brand_dna_public` — `tribes` / `painPoints` | Who's in frame (if the board includes people) and what problem the story shows them solving. |

Grounded, the board stops guessing at "on-brand" mood and colors, and starts using the brand's real ones. State the rung you reached in the storyboard's notes so the user can see the grounding did work.

Only the fields above exist on a public token — there is no competitor, ad-performance, or platform-fit data in the projection. Don't reference it or ask for it.

### Best — a Connected brand on Jinn

Once a brand is Connected, Jinn's video studio (in beta) renders from boards like this one, holding the same continuity — setting, light, palette, mood — automatically across every shot instead of by hand. This skill never calls that machinery and never promises to; it's a pointer. Hand the finished storyboard to a director, animator, or the video studio to shoot or render from — this skill stops at the board.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the storyboard still ships in its ungrounded form:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"storyboard-from-dna"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"storyboard-from-dna"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on any brand call → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **`get_brand_design_md` returns `not_found` while `get_brand_dna_public` succeeds for the same slug** → that brand simply has no design-md yet (per-brand availability), **not** a wrong slug. Proceed on the kit + tokens, fall back to generic-tasteful type-on-video styling for the missing conventions, and note the gap in the storyboard.
- **No token / no connection** → the storyboard still ships in full; note it's not brand-verified and connect Jinn to ground the mood, palette, and messaging emphasis in a real brand.

## What just became possible

You can now turn a video idea into a numbered, shot-by-shot plan a director, animator, or AI-render pipeline can follow with no clarifying call — continuity spine locked once (setting, light, palette, mood), every shot's duration checked against the platform's ceiling as you go. Give it a concept and a platform and get back a board ready to shoot or render from. It works standalone, with no account.

## Try this now

1. **Board a concept for a specific platform** — `Storyboard a 30-second vertical video explaining why our onboarding is faster than switching from a spreadsheet, sound-on TikTok style` → a locked continuity spine plus a shot-by-shot board with timing and on-screen text placement.
2. **Board from a script you already have** — `Here's my script: [paste script]. Turn it into a shot-by-shot storyboard for a 60-second YouTube pre-roll ad` → the same script placed against numbered shots, framing, and duration checks.
3. **Board a before/after concept** — `Storyboard a before/after video showing a cluttered desk turning into an organized one, 15 seconds, Instagram Reels` → a board with the contrast structure boarded shot by shot, plus a mood-in-3-words spine.
4. **Connected: ground the board in the brand's real system** *(requires a Jinn token)* — `Storyboard this video concept using our actual brand palette, type, and narrative stance: [concept]` → the same board with colors, type, and mood pulled from the brand's live Brand DNA instead of inferred taste.

## Compounds with

- `ugc-script-writer` — writes the spoken words this board's shots ride on.
- `shoot-brief-builder` — the photographer-ready brief for a physical shoot day, sharing the same continuity-notes discipline.
- `creative-contrast-qa` — once shots exist as rendered frames, pixel-checks the on-screen text placement this board specified.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

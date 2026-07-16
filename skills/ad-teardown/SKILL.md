---
name: ad-teardown
description: "Paste or upload one ad — or a handful from one competitor's library — for a hook/angle/CTA/format teardown: what it's doing, why it works, and what to borrow. Use when analyzing specific creative you already have, not writing new copy or mapping a category's whole strategy. Sharpest when connected to Jinn's Brand DNA over MCP."
---

# Ad Teardown

Deliverable: **one teardown scorecard** per ad — the hook it opens on, the persuasion angle it's actually running, the CTA's strength, and a format/layout read — plus a plain "what to steal / what to avoid" verdict. Feed it several ads from the same advertiser and it also rolls the individual teardowns up into the recurring pattern across their library: which hook types they lean on, which angle they keep returning to, whether their format choices are consistent or scattered.

**This is not `swipe-brief-builder`, `ad-copy-variants`, or `competitor-positioning-map`.** Swipe-brief-builder takes up to 3 reference ads and *synthesizes* them into one new creative brief to build from — this skill *analyzes* any number of ads and never merges them into a single new direction; if you're tearing references down to build FROM them, hand the same ads to swipe-brief-builder instead. Ad-copy-variants writes new headline/primary-text options — this skill never drafts copy, on-brand or otherwise; it explains what's already on the page. Competitor-positioning-map works at the category level (a whole competitor's positioning and white space) — this skill works at the single-creative or single-library level, on the craft decisions inside one ad or one advertiser's ad set.

Input is ad creative you already have in hand: an uploaded image, a pasted screenshot, or a link to one specific ad you found yourself (a Meta Ad Library permalink, a landing-page screenshot, whatever you can paste). **This skill never scrapes an ad library at scale** — it tears down the ads you bring it, one at a time or a handful from one advertiser, not an automated pull of a category.

Standalone, it runs the full teardown framework below with zero Jinn calls — genuinely useful on its own. Connected to Jinn, it adds a "does this fit your brand" read grounded in the brand's real positioning instead of your best guess — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Ad(s) | Required — one image/screenshot, or several from the same advertiser (library mode). |
| Platform (optional) | Where it ran/runs (Meta, TikTok, Google Display, YouTube pre-roll, etc.) — sharpens the format read in step 5. |
| Your product/category (optional) | One line. Without it, step 6 stays platform-agnostic; with it, "what to steal" gets more specific. |

If more than one ad comes in from the same advertiser, run steps 2–5 on each individually first, then add step 6b (the rollup).

### 2. Read the hook

The hook is whatever the ad leads with — the first line of copy, the first visual beat, the first 1–3 seconds of video. Name which of these it's doing (an ad can blend two; name the dominant one):

| Hook type | What it looks like |
|-----------|---------------------|
| **Pattern interrupt** | A visual or verbal anomaly built to stop a scroll — not selling yet, just arresting. |
| **Direct-benefit lead** | States the value prop plainly and fast — no setup, no tease. |
| **Problem-agitate** | Names the pain before naming the fix — makes the reader feel the cost of not acting. |
| **Curiosity gap** | Opens a loop it deliberately doesn't close in the hook — you read on to get the payoff. |
| **Social-proof lead** | Opens with a number, a review, a "X people already…" |
| **Contrarian/myth-bust** | Challenges a belief the audience holds, inviting disagreement or curiosity. |
| **Stat/proof lead** | A specific number does the persuading before any claim is made. |
| **Authority/founder voice** | A named person speaking direct-to-camera or in a first-person quote opens the ad. |

### 3. Read the angle

The angle is the core persuasion mechanism the *whole* ad runs on, not just the opening — the argument it's making for why you should care:

| Angle | The argument |
|-------|---------------|
| **Before/after or comparison** | Then vs. now, or us vs. the alternative, laid out side by side. |
| **Testimonial/social proof** | Someone else's outcome does the convincing, not a claim from the brand. |
| **Product demo** | The thing itself, shown doing the thing — the product is the argument. |
| **Problem→solution** | Name the pain, then present the fix as the direct answer to it. |
| **Aspiration/identity** | Sells who you become by using it, not what it literally does. |
| **Urgency/scarcity** | Time or supply pressure is the reason to act now specifically. |
| **Authority/expert endorsement** | A credentialed voice vouches for the claim. |
| **Humor/entertainment-led** | Earns attention on its own merits first; the sell rides in after. |

Note where hook and angle diverge — a curiosity-gap hook riding a demo angle behaves differently from a curiosity-gap hook riding a testimonial angle; both facts matter.

### 4. Read the CTA

Score plainly, not just "good/bad":

- **Verb strength** — a concrete action verb (`Get your discount`) vs. a vague one (`Learn more`).
- **Friction implied** — does the CTA ask for a purchase, a signup, a "get a quote," or just a click-through? Higher-friction CTAs need more preceding conviction; check whether the hook/angle actually built enough.
- **Urgency device** — is there a reason to act *now* specifically, or is the CTA open-ended?
- **Singularity** — one clear next action, or does the ad compete against itself with a second implied CTA (a link in the visual plus a different one in the button)?
- **Platform fit** — does the CTA text match what the platform's own button/placement expects, or does it read like it was copy-pasted from a different channel?

### 5. Read the format

A lightweight structural pass — not a full legibility audit (for pixel-level contrast/safe-area QA on a creative you're about to run, use `creative-contrast-qa` instead):

- Static, video, or carousel — and does the format fit the angle (a demo angle usually wants motion; a stat-lead hook can live on a static)?
- Text density and placement — is copy sitting in negative space, or fighting the product/faces for attention?
- Platform-spec fit — aspect ratio and length conventions for the stated platform, if known.
- Brand-mark presence — is it clear whose ad this is without reading the copy?

### 6. Deliver the teardown

```
AD TEARDOWN — <advertiser / source, if known>

Hook:    <type>  — <one line on what makes it that type>
Angle:   <type>  — <one line on the argument it's running>
CTA:     <verb strength / friction / urgency / singularity / platform fit — one line each>
Format:  <static/video/carousel, density, placement — 2-3 lines>

Steal:   <1-3 specific, concrete things worth borrowing — and why they work>
Avoid:   <1-3 specific weaknesses — and what they'd cost if copied as-is>
```

### 6b. Library rollup (only when multiple ads from one advertiser)

```
LIBRARY PATTERN — <advertiser>, <N> ads reviewed

Hook mix:    <which hook types recur, and how often>
Angle mix:   <which angles recur, and how often>
CTA pattern: <consistent friction level / urgency device, or scattered>
Format mix:  <static vs video split, any format they clearly favor>

Read: <2-3 sentences on what the pattern says about their strategy —
       e.g. "leans almost entirely on testimonial angles with low-friction
       CTAs; they're optimizing for top-of-funnel trust, not direct response.">
```

### 7. Self-check

- Hook and angle are each named from the tables above, not invented on the fly — and the one-line "why" is specific to this ad, not generic.
- CTA scoring covers all five dimensions, even briefly.
- "Steal" and "avoid" name concrete elements (a specific line, a specific layout choice), not vague praise or criticism.
- Library rollup (when run) states a read on strategy, not just a tally.

## If a Jinn MCP connection is present (grounded)

Ungrounded, step 6's "steal/avoid" verdict is generic — good creative craft, no read on whether it actually fits *your* brand. Grounded, it adds a fit read against the brand's real positioning. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `messagingPillars[]` ({pillar, description}) | Does this ad's angle reinforce a pillar the brand already claims, contradict one, or sit outside all of them entirely? |
| `tribes[]` ({name, description, motivation}) | Whose ad is this actually speaking to — does that audience match a tribe the brand already targets, or a new one worth testing? |
| `painPoints` | Does the hook name a pain point the brand has already validated, or surface one worth testing? |
| `tonalAttributes` | Would this ad's voice read as on-brand if the user ran something like it, or does the register clash? |
| `safeWords` / `bannedWords` | Any collision if the user reused this ad's language directly? |

Add a **Fit** line to the teardown output: which pillar/tribe/pain point it connects to (or "no clear fit" — say so plainly when that's the honest read), and whether the tone clears the brand's own voice.

This fit read is a **judgment call against the brand's positioning, not a score** — it names which public DNA fields the ad connects to and reasons about the connection in prose. It is not, and does not claim to be, the calibrated fit-ranking Vermeer runs internally (below).

**Best rung:** once the brand is Connected on Jinn, this same fit read stops being a one-off judgment call. Vermeer's ad-intelligence Library runs a real fit-ranking pass on every Library read — against the brand's actual product category and package format, not just the public DNA fields, blended with a performance-floor signal from how long an ad's been running — over a live pool of ads (a shared base pool plus the brand's own private corpus). Any ad that clears the Library's re-skin safety gate (a clean graphic layout the engine can validate — not a real photographed scene, not video) can be pulled straight from the Library into a re-skin against the brand's own product, prepared and approved inside Vermeer, instead of staying a paper teardown. The ranking weights, the category/format matcher, and the re-skin safety classifier are Vermeer engine internals and aren't reproduced here — Connected is the pointer, not a formula this skill can approximate.

Only the fields above exist on a public token — there is no competitor, ad-performance, or fit-score data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the teardown still ships ungrounded:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"ad-teardown"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"ad-teardown"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the teardown still runs in full from the craft framework alone. Note the "steal/avoid" verdict has no brand-fit check yet, and connect Jinn to ground it against the brand's real positioning.

## What just became possible

You can now paste in a single ad — a screenshot, an image, a link — and get back a real teardown of why it works: the hook it opens on, the persuasion angle running underneath, how strong the CTA actually is, and what's worth stealing versus avoiding. Feed it several ads from one advertiser and it also names the recurring pattern across their whole library. Runs standalone with no account.

## Try this now

1. **Tear down a single ad** — `Tear down this ad: a Meta feed ad opens with "Still doing your invoicing by hand?" over a screenshot of a cluttered spreadsheet, then shows the app's clean invoice screen, ending with a "Try it free" button.` → a scorecard naming the hook as problem-agitate, the angle as problem-to-solution, a CTA read, a format read, and steal/avoid calls.
2. **Read just the CTA strength** — `Score only the CTA on this ad: a TikTok video ad ends with a voiceover saying "link in bio" over a plain text card reading "Learn More."` → a verb-strength/friction/urgency/singularity/platform-fit breakdown flagging the CTA as weak and mismatched to the platform.
3. **Roll up a pattern across one advertiser's ads** — `I'm pasting 3 ads from the same skincare brand: one opens with a before-after photo, one opens with a customer testimonial quote, one opens with a founder talking to camera. All end with "Shop now."` → individual teardowns for each ad plus a library rollup naming the recurring hook and angle mix and a read on their strategy.
4. **Connected: get a real fit-ranking, not a judgment call** *(requires a Jinn token)* — `Once my brand is connected, tell me if this ad's angle actually fits our brand and could be pulled into our creative library.` → a pointer to the live fit-ranking and re-skin pipeline instead of this skill's one-off reasoned judgment call.

## Compounds with

- `swipe-brief-builder` — hand the same reference ads there instead when the goal is synthesizing them into one new creative brief, not analyzing them.
- `ad-copy-variants` — turn a teardown's "steal" list into fresh on-brand headline options.
- `competitor-positioning-map` — zoom out from one advertiser's creative pattern to their whole category position.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

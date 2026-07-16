---
name: review-to-adcopy
description: Mine a competitor's reviews for customers' own pain language, cluster it, and score each theme into a hook-angle brief — quote-sourced, never invented. Use for ad angles from reviews, not finished copy. Not `ad-copy-variants` (finished copy) or `hook-and-lede-writer` (organic hooks). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Review to Ad Copy

Deliverable: a **hook-angle brief** — pain themes pulled from a competitor's real customer reviews, each backed by a verbatim quote, scored, and turned into one candidate ad angle. Not finished ad copy. Not five headlines ready to run. A brief a copywriter (or `ad-copy-variants`) picks up from.

It isn't `ad-copy-variants` (that skill writes finished platform ad copy from *your own* product inputs — this one starts from a competitor's reviews and stops at the angle). It isn't `hook-and-lede-writer` (format-agnostic organic hooks from a topic you supply, no review mining involved). It isn't `customer-story-builder` (turns *your own* customers' stories into proof assets — this one mines a competitor's, never your own).

**No review-scraping engine sits behind this skill — Jinn doesn't have one.** Every review that goes into this brief is either pasted in by the user or fetched by your own agent's tools (browser, `WebFetch`, whatever you have). This is pure methodology: how to mine reviews honestly, cluster them, and turn a customer's own complaint into an angle without inventing anything. If a source won't load — paywall, bot-block, JS-only render — say so and ask for pasted text; never fabricate a review to fill a gap.

Works standalone. Connected to Jinn, the angles get checked against the brand's real positioning and voice instead of your best guess.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Competitor product(s) | name + URL(s) to review sources, or pasted review text directly — pasted text is the reliable path; URLs depend on your agent's fetch access |
| Review sources to check | G2, Capterra, TrustRadius, Trustpilot, App Store / Play Store, Reddit threads, X complaints, Amazon (physical product), support-forum threads — use whatever's reachable, note what wasn't |
| Star-rating skew | pull mostly 1–3 star reviews (the pain lives there); keep a few 4–5 star reviews on hand too — they show what NOT to attack, since praised features make bad angles |
| Sample size target | aim for 15–30 reviews per competitor before clustering; fewer than that, say so plainly in the output rather than presenting three complaints as a pattern |
| Our own differentiation (optional) | if known, the one or two things the brand actually does differently — sharpens which pain themes are worth an angle vs a dead end |

### 2. Extraction pass — pull the customer's own words

Read every review once. For each one that carries real signal, pull:

- **The verbatim complaint phrase** — the customer's own wording, not your paraphrase. "Support ghosted me for two weeks" is signal; "poor customer service" is you erasing the signal.
- **Source + rough date** — platform name and the review's date if shown. A complaint from 2019 about a since-fixed bug is not current pain.
- **Star rating** — pain from a 1-star review reads differently than pain buried in an otherwise-happy 4-star review (the latter is often sharper: "loved it except for X" isolates X cleanly).

Never invent a quote, never round a vague complaint up into a sharp one, never attribute a phrase to a review you didn't actually read.

### 3. Cluster into pain themes

Group the extracted quotes into **4–8 themes** — a recurring complaint shape, not one review's specific gripe. A theme needs at least 2 independent reviews behind it to count as a pattern; a single outlier complaint gets logged separately as "isolated — watch, don't lead with."

For each theme, capture:

- **Theme label** — short, in plain language ("cancellation is a maze," not "poor offboarding UX").
- **Frequency** — how many of the reviews you read echoed it.
- **Intensity** — mild annoyance, workaround-required, or dealbreaker (the reviewer switched or is threatening to).
- **The sharpest verbatim quote** — the one line you'd actually put in front of someone.

### 4. Turn each theme into one candidate hook angle

One angle per theme, tagged to a type:

| Angle type | What it does |
|------------|--------------|
| Relief | Names the exact pain and offers the exhale — "no more chasing X." |
| Explicit contrast | States the competitor behavior by name and what happens here instead. |
| Not-alone | Validates the reader already suspects this is a widespread complaint, not a personal failure. |
| Named fix | Points at the precise mechanism that's different — a feature, a policy, a number — not a vibe. |
| Cost-of-staying | Frames what continuing to tolerate the pain actually costs (time, churned revenue, a bad renewal call). |

Write the angle as **one directional sentence**, not finished copy — "lead with the two-week support silence vs our same-day SLA," not a headline. The angle is a brief for whoever writes the copy next.

### 5. Self-check before delivering

- **Every quote traces to a source** you can point back to — platform, rough date, star rating. No quote, no theme.
- **Sample size is stated honestly** — if you only found 6 usable reviews, the brief says 6, not "customers consistently report."
- **Praised features are excluded**, not attacked — check step-1's 4–5 star sample; don't build an angle against something the competitor's own users like.
- **Dated pain is flagged** — a complaint that reads like an old, since-patched bug gets a note, not a confident lead.
- **Isolated complaints stay isolated** — logged, never promoted to a theme on one review's strength.

### 6. Deliver the brief

```
HOOK-ANGLE BRIEF — <competitor>, from <N> reviews (<sources used>, <date range>)

Sample honesty: <N reviews read; M usable; sources that didn't load, if any>

1. THEME: "cancellation is a maze"          freq: 7/22   intensity: dealbreaker
   Quote: "Took me three tries and a chat with support to actually cancel." — G2, 2026-04, ★2
   Angle [relief]: Lead with same-click cancellation vs their multi-step flow.

2. THEME: "onboarding takes weeks"          freq: 5/22   intensity: workaround-required
   Quote: "We were still configuring basic fields a month in." — Trustpilot, 2026-02, ★3
   Angle [named fix]: Name the specific setup step we've automated that they still do by hand.

...

Isolated (not a theme, logged): "billing math was confusing once" — Reddit, 2025-11, single mention.

Excluded (praised, don't attack): their mobile app UI — repeatedly called out as clean across 4-5★ reviews.
```

Rank themes by intensity × frequency, dealbreaker-and-frequent first. Hand the brief to a copywriter or to `ad-copy-variants` for finished platform copy — this skill stops at the angle.

## If a Jinn MCP connection is present

### Better — check angles against the brand's real position

Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | **The relevance filter.** Does a given pain theme actually map to how this brand wins? An angle the wedge can't back is a strategy mismatch, not a copy opportunity — flag it, don't force it. |
| `painPoints[]` | **New-vs-known check.** Cross-reference the mined themes against the brand's already-documented pain points. A theme that's genuinely new is the most valuable finding in the brief — call it out by name. |
| `tribes[]` (`{name, description, motivation}`) | **Who each angle is aimed at** — match the reviewer's implied situation to a tribe's real `motivation`. |
| `messagingPillars[]` (`{pillar, description}`) | **Which angles reinforce an existing pillar** vs stand alone — tag each. |
| `tonalAttributes[]` | **Voice on the angle sentences** — write the directional line in these adjectives, not neutral analyst prose. |
| `safeWords[]` / `bannedWords[]` | **Diction on the angle write-up** — prefer one set, hard-filter the other (the competitor's own review quotes stay verbatim regardless — never filter someone else's words). |

Grounded, the brief gains a verdict per angle: which wedge it proves, which tribe it's aimed at, whether the pain theme is new information the brand didn't already know it owned. State the wedge and any new-pain finding when you deliver — that's the delta a real connection buys.

Only the fields above exist on a public token. There is no competitor-scrape, ad-performance, or platform-fit data in the projection — this skill's review mining is entirely your agent's own work, not a Jinn capability, at every rung.

### Best — a Connected brand on Jinn

The brief is the input, not the output. Once angles are picked, Vermeer is where they become creative — rendered ad variants across formats, checked against the brand's real ad-intelligence library and creative sets. This skill never calls that machinery and never promises to; it only points at it. Pick the strongest angle, then hand it to Vermeer (or to `ad-copy-variants` for a standalone draft) to render.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the brief still ships in its ungrounded form:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the brief still runs in full against whatever reviews you gathered; note it's ungrounded and connect Jinn to check angles against a real brand's wedge and voice.

## What just became possible

You can now turn a competitor's own customer reviews into a set of ad angles built entirely from real, quoted pain — clustered into themes, each backed by a verbatim quote and scored by how often and how badly it hurts, never an invented complaint or a vague "customers say." You paste or fetch the reviews yourself; it runs the moment it's installed, no account needed.

## Try this now

1. **Mine pasted reviews into angles** — `Mine these reviews for pain themes and turn each into an ad angle: "Support ghosted me for two weeks." "Took three tries to cancel." "Onboarding took a month." — all from G2, 1-2 stars` → a hook-angle brief with pain themes, each with a verbatim quote and a scored angle.
2. **Fetch and mine reviews from a public page** — `Pull the 1-3 star reviews from g2.com/products/competitor-name/reviews and turn the recurring complaints into ad angles` → the same brief, sourced from a fetched public review page, or a request for pasted text if the fetch fails.
3. **Check sample-size honesty on a thin set** — `I only have 6 reviews for this competitor — mine them for pain themes anyway and be honest about the sample size` → a brief that states the sample was 6 reviews plainly, rather than implying a settled pattern.
4. **Connected: check angles against the brand's real wedge** *(requires a Jinn token)* — `Check these hook angles against our brand's real positioning wedge and flag any pain point we didn't already know we owned` → each angle tagged with the wedge it proves and any genuinely new pain finding.

## Compounds with

- `ad-copy-variants` — hand the strongest angle here to that skill for finished platform ad copy.
- `hook-and-lede-writer` — write organic, non-review-sourced hooks once the mined angles run out.
- `customer-story-builder` — turn your own customers' stories into proof once the competitor's weak spot is named.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

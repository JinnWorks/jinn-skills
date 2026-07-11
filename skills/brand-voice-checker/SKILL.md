---
name: brand-voice-checker
description: Detect whether copy reads like default-LLM writing — a 0-100 reads-human score, every generic-AI tell quoted and rewritten (hedging, em-dash cadence, empty intensifiers). Use when asking "does this sound like AI?" Red-lining against brand rules is brand-guardrails-review's lane. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Brand Voice Checker

Deliverable: **an on-brand score (0–100) plus a tell-by-tell breakdown** for one pasted piece of copy — each generic-AI writing tell quoted and rewritten, banned-word hits (if a list is supplied), and a structural checklist — so a marketer can tell in one pass whether copy reads like a person or like an LLM's default voice.

Works standalone against a published checklist of AI writing tells. Connected to Jinn, the banned words and tone calibration come from the brand's real Brand DNA instead of a guess or a generic list. This is a narrower tool than a full strategy audit — it's asking "does this sound like AI," not "does this hold the brand's line" (for the latter, see `brand-messaging-audit`; for a full tone/strategy red-line, see `brand-guardrails-review`).

## The deliverable

```
VOICE CHECK — <what was scored>

On-brand score: XX/100        Verdict: READS HUMAN / READS AI-ISH / READS AI

Generic-AI tells (N found):
  › "<quoted phrase, exact>"
    Tell:  <hedging | em-dash overuse | symmetric listicle | empty intensifier |
            throat-clearing open | vague superlative | signpost pile-up | ...>
    Why:   <one line — what makes it read as default-LLM voice>
    Fix:   "<rewrite that keeps the point, drops the tell>"

Banned-word hits (N found):     [only if a list was supplied or grounded]
  › "<word>" — "<quoted context>"

Structural checks:  sentence-length variance · specificity (names/numbers vs
                     vague claims) · passive-voice ratio · paragraph rhythm
                     [pass/fail each, one line why]

Clean:  <what's already good — say so, don't only flag problems>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Copy | the pasted text to score (required) |
| Banned words | a user-supplied list, if they have one [optional — skip that block and say so if absent] |
| Brand URL | optional. If given, fetch the visible text of the homepage or about page and derive a rough tone baseline (average sentence length, formality register, recurring phrases) to check the pasted copy for *consistency* against. This is a generic public-text read, not a brand-verified voice record — label it "unverified, from a quick site read" in the output. If no URL, score against professional-copy norms only. |

### 2. Run the generic-AI-tells checklist (published heuristics)

Scan line by line for each tell. Quote the exact phrase — never paraphrase the offending text — and write a fix that keeps the sentence's point.

| Tell | What to look for |
|------|-------------------|
| Hedging cushions | "it's worth noting," "in many ways," "arguably," "can help," "tends to" — softening a claim that should just be made |
| Em-dash / staccato overuse | repeated em-dash clause-chaining as a substitute for real sentence variety |
| Symmetric listicle cadence | "not just X, but Y" and rule-of-three triads repeated more than once in short copy |
| Empty intensifiers | "truly," "genuinely," "incredibly," "remarkably" stacked with no specific backing them up |
| Throat-clearing opens | "In today's fast-paced world," "In an era where...," "Let's dive in" |
| Vague superlatives | "industry-leading," "cutting-edge," "seamless," "world-class" with no name or number behind it |
| Signpost pile-up | "firstly... secondly... finally" in copy that isn't a formal list |
| Participle-opener pile-up | "Boosting X. Driving Y. Delivering Z." fragments doing the work full sentences should |
| Corporate warm-fuzzy closers | "we're excited to," "we can't wait to," "we're thrilled to announce" |
| Symmetric sentence-length monotony | every sentence landing at nearly the same length and rhythm — read it aloud, it sounds like a metronome |

### 3. Banned-word scan (if a list was supplied)

Case-insensitive match against the user's list. Quote each occurrence with its surrounding context (don't just say "found"), and flag the real casing used. No list supplied and no Jinn connection → skip this block and say so plainly rather than inventing one.

### 4. Structural checks

Run these four, pass/fail with one line of reasoning each:
- **Sentence-length variance** — is there real rhythm, or does every sentence run the same length?
- **Specificity** — do claims carry a name, number, or concrete detail, or do they float on adjectives?
- **Passive-voice ratio** — is the copy hiding its actor behind passive constructions more than occasionally?
- **Paragraph rhythm** — for longer copy, does paragraph length vary, or is every block the same size?

### 5. Score it

Start at 100. Subtract per generic-AI tell found (weight the flagrant ones — throat-clearing opens, stacked intensifiers — higher than a single mild hedge). Subtract more per banned-word hit than per tell — a banned word is a harder rule. Subtract a smaller amount per failed structural check. Bands: **85–100 READS HUMAN** · **60–84 READS AI-ISH** · **below 60 READS AI**. State the score plainly; don't round up to be nice.

### 6. Assemble and deliver

List what's already clean, not just what's flagged — the writer needs to know what to keep. Use the deliverable format above.

## If a Jinn MCP connection is present

Don't guess at banned words or tone calibration — read them.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`). Match the user's named brand, or use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Recalibrate the checklist against the projection:

| Projection field | Drives |
|-------------------|--------|
| `bannedWords[]` | **Replaces** the user-supplied list — the brand's real hard red-line, not a guess. |
| `safeWords[]` | Vocabulary to reach for in every rewrite — the brand's own approved language. |
| `tonalAttributes[]` | Recalibrates *which* generic-AI tells actually matter for this brand — an intensifier-heavy, hyperbolic brand may tolerate what a reserved, precise one can't. Judge each tell against these, not a universal list. |
| `slangPolicy` / `formattingConstraints` | The structural-check thresholds (casing, emoji, hashtags, register) become this brand's actual rules instead of generic-professional defaults. |
| `messagingPillars[]` | Optional note only — if a line drifts from a pillar, flag it as a strategy note, not a score deduction; the full tone/strategy red-line is `brand-guardrails-review`'s job, not this skill's. |

Drop the "unverified site read" URL step entirely once connected — the DNA record is the real thing it was approximating.

Ghost runs a deeper, two-pass voice analysis with a calibrated score server-side once you're working inside the product — this skill's score is the closest approximation reachable from the public projection, not that engine. State which state you reached ("scored against `<brandName>`'s real banned words and tone" vs. "scored against generic AI-tell heuristics") so the user can see the grounding did work. Once flagged copy needs a redraft rather than just a diagnosis, that's a one-click hand-off to Ghost inside the product — this skill stops at the score.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the checklist still runs in full against published heuristics and any user-supplied banned words; note the score is ungrounded and connect Jinn to check against the brand's real rules.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

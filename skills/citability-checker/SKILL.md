---
name: citability-checker
description: Paste a post or article for a 0-100 citability score plus a per-dimension breakdown (extractable answers, sourced claims, structure, entity clarity). Use when asking will an answer engine cite this. Scores citability, not AI-tells (brand-voice-checker) or sourcing (claim-provenance-checker). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Citability Checker

Deliverable: **a citability score (0–100) plus a dimension-by-dimension breakdown** for one pasted post or article — each dimension scored pass/fail with a one-line reason, every citability-killing passage quoted verbatim with a fix, and a verdict a writer can act on before hitting publish.

Works standalone against a published checklist drawn from answer-engine-optimization practice: what makes a passage the one an AI assistant lifts into its answer versus the one it skips. This is a narrower question than "does this sound human" (that's `brand-voice-checker`'s lane — reads-like-AI tells, tone, banned words) and a different direction than "is this claim sourced" (that's `claim-provenance-checker`'s lane — it audits whether a strategy/marketing claim can be verified before it ships; this skill audits whether the *passage itself is structured and evidenced* the way an answer engine's extraction pass rewards, regardless of whether every fact inside it happens to be true). A citability-checker PASS is not a truth claim.

## The deliverable

```
CITABILITY CHECK — <what was scored>

Citability score: XX/100        Verdict: HIGHLY CITABLE / PARTIALLY CITABLE / UNLIKELY TO BE CITED

Dimension breakdown:
  Extractable answers     PASS/FAIL   <one line why>
  Answer-first ordering   PASS/FAIL   <one line why>
  Specificity             PASS/FAIL   <one line why>
  Sourced claims          PASS/FAIL   <one line why>
  Scannable structure     PASS/FAIL   <one line why>
  Entity clarity          PASS/FAIL   <one line why>

Citability issues (N found):
  › "<quoted passage, exact>"
    Dimension: <which one>
    Why:       <one line — what an answer engine's extraction pass would skip past>
    Fix:       "<rewrite that keeps the point, fixes the dimension>"

Clean:  <what's already extractable — say so, don't only flag problems>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Content | the pasted post or article to score (required) |
| Target question | the query this piece is meant to answer, if the user names one — sharpens the extractable-answer and entity-clarity checks. If absent, infer the implied question from the headline/opening and say so. |
| Brand/product name | if given (or grounded — see below), used for the entity-clarity check. If absent, check clarity generically: does *some* named subject stay consistent, whatever it's called. |

### 2. Run the six-dimension checklist (published AEO/GEO practice)

Work through the whole piece section by section — don't sample. Quote the exact offending passage, never paraphrase it, and write a fix that keeps the sentence's point.

| Dimension | What to look for |
|-----------|-------------------|
| **Extractable answers** | Does every major section contain at least one sentence that fully answers a specific question on its own — quotable out of context, with no pronoun or "as mentioned above" reaching back into a prior paragraph? A section with no such sentence has nothing for an engine to lift. |
| **Answer-first ordering** | Does each section's *opening* line give the answer, or does it warm up first — "In this section we'll look at...", "Let's start by...", a scene-setting anecdote before the point? An engine's extraction pass weights the first sentence heaviest; a buried answer is a missed answer. |
| **Specificity** | Do claims carry a name, a number, a date, or a named entity — or do they float on adjectives ("industry-leading," "seamless," "a lot of customers")? Vague claims don't get quoted; specific ones do. |
| **Sourced claims** | Near every statistic or data point, is there a date, a named source, and — if it's from elsewhere — a link or clear attribution? An engine that can't tell where a number came from tends to skip it rather than risk repeating an unsourced figure. |
| **Scannable structure** | Do headings state a question or a claim (not a vague label like "Overview")? Is there a short summary/key-points block near the top, and — for anything FAQ-shaped — an actual FAQ section? Lists and short tables where a list of items is being described, not buried in prose? |
| **Entity clarity** | Is the subject (the brand, product, or person the piece is about) named explicitly at the start of each major section, or left to "it"/"we"/"the company" that only resolves by reading backward? An engine quoting one paragraph in isolation needs the subject named *in* that paragraph. |

### 3. Score it

Start at 100. Subtract per failed dimension — weight **extractable answers**, **answer-first ordering**, and **sourced claims** heaviest (a single hard miss on any of these should be enough on its own to drop a piece out of the top band); weight **specificity**, **scannable structure**, and **entity clarity** moderately. A piece that fails on evidence for a stat it makes central should score noticeably lower than one that's merely light on headings. Bands: **80–100 HIGHLY CITABLE** · **50–79 PARTIALLY CITABLE** · **below 50 UNLIKELY TO BE CITED**. State the score plainly — don't round up to be kind.

### 4. Assemble and deliver

List what's already extractable, not just what's flagged — a writer needs to know what to keep as-is. Use the deliverable format above.

## If a Jinn MCP connection is present

### Better — ground entity clarity and topical fit in the brand's real record

Don't guess at the brand's real name or what it's actually known for — read it.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`).
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Recalibrate against the projection:

| Projection field | Drives |
|-------------------|--------|
| `brandName`, `officialName` | **Replaces** a guessed name for the entity-clarity check — is the piece naming the brand by its real, correctly-cased identity rather than a variant an engine can't confidently resolve. |
| `messagingPillars[]` | Whether the piece's central claim lands inside territory the brand is actually known for, or drifts somewhere unrelated that dilutes what an engine would attribute to it. |
| `tribes[]` / `painPoints` | Sharpens the target-question inference and which FAQ-shaped questions are worth adding — grounded in who the brand's real audience is, not a guess. |
| `tonalAttributes[]` | Calibrates the specificity check against this brand's actual register — a brand that's deliberately terse and plainspoken shouldn't be dinged for short declarative sentences the way a data-heavy brand's copy would be. |

Boundary, restated: this rung checks whether claims are *stated* specifically, sourced, and attributed to the right entity — it still does not verify that a cited fact is *true*. Checking your own claims for evidence before they ship is `claim-provenance-checker`'s lane; checking what AI assistants already believe about the brand is `brand-fact-checker`'s lane.

### Best — a Connected brand on Jinn

Ghost scores every post against a citability gate and fact-checks cited stats before publishing, server-side, when Connected. That machinery isn't reachable from a public token — this skill approximates its discipline from the DNA projection above, it doesn't run it. Once a brand is Connected, posts drafted in Ghost clear (or get flagged against) that real gate automatically, before anything publishes — this skill stops at the diagnosis.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the checklist still runs in full ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the checklist runs in full against the published dimensions above; note the score is ungrounded and connect Jinn to check entity clarity and topical fit against the brand's real record.

## What just became possible

You can now paste any post or article and get a straight answer to "will an answer engine actually cite this" — a 0-100 score, a pass/fail on each of six dimensions, and every citability-killing passage quoted with a fix. It runs the moment it's installed, against a published checklist, with no account needed.

## Try this now

1. **Score a weak opening paragraph** — `Score this paragraph for citability: "In today's fast-paced world, our seamless platform helps a lot of customers get things done. Let's dive into how it works."` → a low score with the vague, buried-answer, and unspecific passages quoted and rewritten.
2. **Score a well-sourced FAQ answer** — `Score this FAQ answer for citability: "Q: How long does onboarding take? A: Onboarding typically takes 3-5 business days, based on our own tracking across customer accounts onboarded in 2025."` → a high score with extractable-answer and sourced-claims marked PASS.
3. **Ask it to name what's already working, not just what's broken** — `Check this how-to intro for citability and tell me what's already working, not just what to fix: "This guide covers three ways to reduce cart abandonment. First, send a reminder email within one hour."` → a breakdown plus a "clean" section listing what's already extractable.

## Compounds with

- `brand-voice-checker` — a different lens on the same passage: does it read human, not whether it gets cited.
- `claim-provenance-checker` — checks whether a stated stat is actually sourced and true; this checks only whether it's stated in a citable shape.
- `aeo-formatter` — once this scores a piece low, use it to restructure the content into the citable shape this checker is looking for.

---

*Grounding + three-state contract by Jinn. MIT.*

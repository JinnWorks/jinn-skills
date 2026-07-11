---
name: citation-source-mapper
description: Category or niche in → which domains AI engines actually cite for it, classified by type, checked for brand presence, and ranked into a presence plan by citation leverage. Not whether the brand gets mentioned (ai-visibility-snapshot) — which sources shape the answer. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Citation Source Mapper

Deliverable: **a citation source map** — every domain a set of reachable AI assistants actually cited while answering category questions, classified by type, checked for whether the brand already has a presence there, and rolled up into a presence plan ranked by citation leverage (how often a source gets cited, weighted by how directly the brand can act on it).

This is a different question than `ai-visibility-snapshot`'s: that skill asks *does the brand itself get mentioned* when someone asks a buyer-intent question. This skill asks *which sources are the answers built from* — the domains an assistant reaches for when it needs to back up a category claim — and whether the brand has a footprint on those domains at all. A brand can be invisible in `ai-visibility-snapshot`'s sense while still showing up here as absent-but-fixable on three sources that get cited constantly.

The map stops at *where it matters and whether you're on it*. Deciding how to actually earn standing on the sources that can't just be claimed — forums, subreddits, Discord — is `community-value-planner`'s job; hand this map straight to it once the earn-only sources are named.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Category / niche | the space the brand competes in, in plain terms |
| Brand / product name | including any name variants (short name, legal name) — used later for presence checks |
| Reachable assistants | which AI assistants you can actually query, and whether each one exposes citations/sources at all (see step 2 — this varies a lot) |
| Existing query set (optional) | if a buyer-intent query set already exists (e.g. from a prior `ai-visibility-snapshot` run), reuse its category and comparison questions here rather than writing new ones from scratch |

### 2. Design category questions built to surface citations

The goal here is different from a brand-recall audit — you're not trying to see if the brand gets named, you're trying to see what the assistant *leans on* to answer a category question. Write 8–12 questions that a genuinely curious buyer would ask before they know brand names, spanning:

- **Category education** — "what is `<category>` and how does it work," "what should I look for in a `<category>`."
- **Best-of / recommendation** — "what are the best `<category>` tools," "how do I choose between `<category>` options."
- **Comparison** — head-to-head questions naming known players in the space.
- **Problem-shaped** — "how do I `<solve the job this category does>`."

Before running anything, check which of your reachable assistants actually surface citations in their answers — some show explicit links or a sources list (Perplexity, browsing-enabled ChatGPT, Claude with web search, Gemini), others answer from trained knowledge with no citation trail at all. Note this per assistant up front; an assistant with no citation trail contributes nothing to this exercise even if it answers the question, and skipping it isn't a gap in your method, it's a fact about that assistant.

### 3. Run each question and record every cited source

For each question, on each citation-exposing assistant:

- Start a **fresh conversation** — no carried-over context from a prior question.
- Paste the question verbatim.
- Capture the **full response** plus **every source the answer references** — an explicit link, a numbered citation, or a named source in prose ("according to `<site>`," "per `<publication>`") even when it isn't hyperlinked. Don't only record the sources that look important; a source cited once in passing still tells you something once it repeats across questions.

One row per source-mention:

| Question | Assistant | Domain cited | How referenced | Context (what claim it backed) |
|----------|-----------|---------------|-----------------|----------------------------------|

### 4. Classify each unique domain

Visit the domain if the type isn't obvious from the name — don't guess from a domain string alone.

| Type | What it looks like |
|------|----------------------|
| **Editorial / publisher** | Independent journalism, trade press, blogs with their own editorial judgment |
| **Community / UGC** | Forums, Reddit, Q&A sites, Discord-adjacent public archives — value comes from many independent voices |
| **Review / directory** | G2-shaped comparison and review platforms, "best of" listicle sites |
| **Reference / documentation** | Wikipedia-shaped encyclopedic sources, official standards bodies, vendor-neutral docs |
| **Vendor-owned** | A competitor's or the brand's own site, cited as a primary source about itself |

### 5. Check brand presence on each domain that repeats

For every domain cited **two or more times** across the question set (a single mention is too thin to act on — note it, don't chase it), check by hand whether the brand already has a footprint there:

- **Owned/claimed** — a real profile, listing, or page the brand controls (a G2 profile, a docs mention, an owned Wikipedia entry).
- **Mentioned-by-others** — the brand comes up there, but didn't put it there (a forum thread naming it, a comparison article ranking it).
- **Absent** — no trace of the brand on that domain at all.

### 6. Score citation leverage

Leverage isn't just citation frequency — weight it by how directly the brand can act on the gap:

- **High leverage** — cited often, brand absent, and the domain type is one the brand can act on directly (claim a review profile, submit to a directory, get listed in documentation) — a concrete next step exists today.
- **Earn-only leverage** — cited often, brand absent, but the domain is community/UGC — there's no "claim a listing" move here; standing has to be earned. Flag these for `community-value-planner` rather than writing a fake action item.
- **Maintain** — cited often, brand already present — note it, don't ignore it; a claimed profile that's stale or thin is a different kind of gap.
- **Low priority** — cited once or rarely, regardless of presence — real signal, not yet worth acting on from a one-question sample.

### 7. Quality gate (fixed — run before you deliver)

- Every cited source was actually recorded from the captured response text, never from memory.
- Every domain classification was checked against the actual site, not inferred from the name.
- Every presence check reflects what's really on the domain today, not an assumption ("they're big, they must have a G2 profile").
- Community/UGC domains are flagged for hand-off, never given a fabricated "claim this listing" action.

### 8. Honest limits (required — always include this section, unabridged, in what you hand back)

- **This is a hand-run spot-check, not a continuous crawl.** A handful of questions on the assistants you can reach captures one moment; a source that doesn't show up here may still matter, and one that does may drop out next month as models update.
- **Not every assistant exposes citations, and that's a real constraint on the method, not a gap to explain away.** State plainly which assistants you queried and which of those actually returned attributable sources — a "no citations found" result from an assistant that never shows sources is not evidence the source list is short.
- **Phrasing changes what gets cited, not just what gets said.** Before concluding a domain never comes up, rerun 1–2 of the category questions with different phrasing.
- **Citation ≠ endorsement, and citation ≠ ranking signal.** A domain being cited tells you an assistant reached for it while answering — it says nothing about why that assistant's underlying retrieval favors it, and this method can't reverse-engineer that mechanism.
- **Presence checks are a manual look at one point in time.** A profile that's live today could be stale, and a domain marked absent today may have been claimed since.

### 9. Deliver the report

```
CITATION SOURCE MAP — <category/niche>

Assistants queried: <list, with citation-exposing ones marked>
Questions run: N

Sources cited (domains appearing ≥2x):

Domain | Type | Times cited (of N) | Brand present? | Presence type | Leverage
-------|------|----------------------|------------------|------------------|----------

Presence plan (ranked by leverage):
1. <domain> — <concrete next step, or "earn-only — feeds community-value-planner">
2. ...

Honest limits: <section 8, in full>
```

Lead with a one-line verdict ("Cited constantly on `<domain>` and `<domain>`, absent from both — those are the two moves worth making first"), then the source table, then the ranked plan, then the honest-limits section.

## If a Jinn MCP connection is present (grounded → Connected)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | Sharpens which category questions to run — write the best-of and comparison questions against the angle the brand actually claims to win on, not a guessed one. |
| `brandEnemy` | Guarantees at least one comparison question names the real competitor, so the sources an assistant cites when directly comparing the two get captured, not just generic category sources. |
| `tribes[]` (`{name, description, motivation}`) | Shapes the problem-shaped questions as real personas instead of a guessed generic buyer. |
| `painPoints` | The problem-shaped question source — write "how do I solve X" straight from the brand's own stated pains. |
| `messagingPillars[]` | Sharpens leverage scoring — a niche domain cited only once is worth chasing if it sits squarely on a pillar the brand is trying to own, and not worth it otherwise. |
| `brandName` / `officialName` | Replaces a guessed name for every presence check — searching a domain for the correct, correctly-cased identity avoids a false "absent" from missing a name variant. |

State which fields you used when you deliver the report — that's the whole delta over the ungrounded run.

**Best rung:** once the brand is Connected, Fama runs this same discipline end-to-end and continuously — parsing every engine citation down to the domain level and probing verified brand presence against a canonical source registry (`fama/src/lib/authority/citation-domains.ts`, `presence-engine.ts`). That machinery isn't reachable from a public token — this skill approximates its discipline by hand, once; it doesn't run it.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the map still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the map still ships in full against category questions you design by hand; note it's ungrounded, and that presence checks used a guessed brand name if no official name was confirmed.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

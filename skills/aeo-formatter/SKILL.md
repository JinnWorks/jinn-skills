---
name: aeo-formatter
description: Paste an existing page (or URL) for a rewrite built for answer-engine extraction: answer-first sections, definition blocks, sourced claims, schema recs. Retrofits a page for AI citation — not scoring (citability-checker), a manifest (llms-txt-generator), or new content (seo-content-brief). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# AEO Formatter

Deliverable: **a rewritten version of one existing page**, restructured for answer-engine extraction — answer-first sections, one-idea paragraphs, definition blocks, entity clarity, sourced claims — plus a **change log** naming every edit and why, a **schema recommendation** block, and a note on what was already extraction-ready and left alone.

This is a **rewrite** tool, not a scoring tool: it takes a page in and hands a fixed page back. Run `citability-checker` first if you want the 0–100 score and the flagged-passage diagnosis before committing to a rewrite — this skill picks up from there and does the fix.

## The deliverable

```
AEO REWRITE — <page title / URL>

Summary: <2-3 sentences — what was wrong, what changed, what stayed>

REWRITTEN PAGE
<full rewritten content, ready to paste back in>

CHANGE LOG (N edits)
  1. [Answer-first] <section> — moved the direct answer to the opening line.
     Before: "<quoted opening>"
     After:  "<quoted opening>"
  2. [Definition block] Added a crisp definition for "<term>" near the top —
     the page used it 6 times without ever stating it plainly.
  3. [Sourced claim] "<stat>" now carries <source, date> — was floating unattributed.
  ...

SCHEMA RECOMMENDATIONS
  <JSON-LD type>  — <why this page's shape earns it, or "none" if nothing fits>

KEPT AS-IS (already extraction-ready)
  <what the page already did right — don't rewrite what isn't broken>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Page content or URL | Required — the existing page to rewrite. If given a URL, read the live page; don't guess its content. |
| Target question(s) | The query/queries this page should win, if named. If absent, infer the implied question per section from its heading and current opening line, and say so. |
| Entity/brand name | If given (or grounded — see below), anchors the entity-clarity pass. If absent, hold *some* named subject consistent throughout, whatever it's called on the page today. |

### 2. Read the page whole, section by section

Don't sample — an extraction pass a rewrite is meant to survive reads every section, and a page can be strong in one place and buried in the next. For each section, note: what question it's implicitly answering, whether the answer sits in the opening line or gets warmed up to, whether its subject is named or left to a pronoun, and whether its claims carry a source.

### 3. Rewrite, section by section, against six named moves

Apply only the moves a section actually needs — a page that's already answer-first in three sections and buried in two gets two edits, not five imaginary ones. Every move is logged (see the deliverable format).

| Move | What it does |
|------|--------------|
| **Answer-first restructuring** | The section's opening line becomes the direct answer, quotable on its own — no "in this section we'll cover…" runway first. Supporting detail moves after, never before. |
| **One-idea paragraphs** | Split any paragraph carrying two or more distinct claims — an engine's extraction pass lifts a paragraph as a unit, and a compound one dilutes both ideas. |
| **Definition blocks** | Where a term or the page's core entity gets used repeatedly but never plainly defined, add a short stand-alone definition near its first real use — the single most-quoted block shape in AI answers. |
| **Entity clarity** | Name the subject explicitly at the start of each major section instead of leaving it to "it" / "we" / "the company," which only resolves by reading backward — a section quoted in isolation needs its subject named inside it. |
| **Sourced claims** | Every statistic or specific claim gets a date and a named source or link next to it, not just floating in prose. If the source doesn't exist, the claim gets softened to what's actually defensible — never dressed up with a source that isn't real. |
| **Section shapes engines can lift** | Where content is genuinely list-like (steps, comparisons, criteria) but buried in prose, reshape it into a list, table, or FAQ block. Only reshape content that's actually shaped that way — forcing a narrative passage into a table just to look structured is its own kind of stuffing. |

### 4. Schema recommendations

Recommend structured data only where the page's actual shape earns it — never bolt on a type the content doesn't support:

- **FAQPage** — the page (or the rewrite) now has genuine question-and-answer pairs.
- **HowTo** — the page walks through a genuine ordered procedure with real steps.
- **DefinedTerm** — the page's core job is defining one or more specific terms.
- **Article / Product / Organization** — note when one of these more generic types is the honest fit instead, rather than reaching for FAQ/HowTo everywhere.

State "none" plainly when nothing fits rather than forcing a recommendation to fill the section.

### 5. Quality gate (fixed — run before you deliver)

- **Every claim in the rewrite is still true of the original page's content.** A rewrite may restructure, clarify, and cut filler — it never adds a fact, a stat, or a source the source material didn't have. Honesty is a ranking strategy, not a constraint on one: an engine that catches a hallucinated stat stops trusting the whole page, and so should a reader.
- **No keyword-stuffing.** A term earns repetition because the page is genuinely about it, never because repeating it might help. If a rewrite reads worse to a human than the original for the sake of density, it failed this gate — extractability and readability are not in tension when done right.
- Every section still has a human reading it, not just an engine — the rewrite reads well aloud, not like a checklist wearing prose as a costume.
- The change log accounts for every edit — nothing changed silently.

### 6. Deliver

Use the deliverable format above. Always include the "kept as-is" section — a rewrite that only lists problems reads as an audit; a page usually gets several things right, and a writer needs to know what not to touch.

## If a Jinn MCP connection is present

### Better — ground the rewrite in the brand's real record

A rewrite done blind guesses at the brand's real name, what it's actually known for, and its voice. Grounded, it doesn't have to:

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`).
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Recalibrate against the projection:

| Projection field | Drives |
|-------------------|--------|
| `brandName`, `officialName` | **Replaces** a guessed name for the entity-clarity pass — every section names the brand by its real, correctly-cased identity. |
| `messagingPillars[]` | Which claims the rewrite foregrounds in the answer-first openings — the page argues the brand's actual position, not a generic version of it. |
| `tribes[]` / `painPoints` | Sharpens the inferred target question per section and which FAQ-shaped questions are worth adding, grounded in who the brand's real audience is. |
| `tonalAttributes[]` | The register the rewrite is written in — restructuring for extraction never means flattening the brand's actual voice into generic AEO-speak. |
| `bannedWords[]` | Hard filter on the rewrite — no line uses one; flag it if the original page already does. |

Boundary, restated: this rung rewrites the page's *structure and clarity*, grounded in the brand's real positioning — it still isn't checking whether the page's claims are the ones AI assistants already believe about the brand externally (`brand-fact-checker`'s lane) or whether a claim can be evidenced before it ships (`claim-provenance-checker`'s lane).

### Best — a Connected brand on Jinn

Connected, Fama builds a prioritized remediation playbook across the whole site from real visibility gaps — not one page rewritten on request, but every page the brand actually loses citations on, ranked and fixed in sequence. That machinery isn't reachable from a public token — this skill approximates its discipline one page at a time, it doesn't run it.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## Boundaries (read before reaching for this skill)

- **`citability-checker` scores a piece; this skill rewrites one.** If you want the 0–100 score, the per-dimension breakdown, and the flagged passages first, run that skill — this one picks up from its findings and produces the fixed page. Using aeo-formatter without a prior score is fine too; it diagnoses briefly in Procedure step 2, just without a number.
- **`llms-txt-generator` writes the site-level AI-discovery manifest** (who the brand is, site-wide, for the llms.txt spec). This skill fixes the content of one page. Different artifact, different scope — a site can need both.
- **`seo-content-brief` plans what to write for a page that doesn't exist yet.** This skill retrofits a page that already exists. If there's no page to paste in, you want the brief, not this.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the rewrite still ships in full ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the rewrite ships from the page content alone, in the brand's apparent voice rather than its verified one. Note it's not brand-verified in the delivery note, and connect Jinn to ground entity clarity and voice in the real record.

---

*Grounding + three-state contract by Jinn. AEO/GEO rewrite discipline is public practice; FAQPage/HowTo/DefinedTerm are the public schema.org spec. MIT.*

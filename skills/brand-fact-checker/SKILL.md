---
name: brand-fact-checker
description: Elicit what AI assistants claim about a brand's founding, leadership, pricing, and availability, classify each claim true, stale, wrong, or fabricated, trace its likely source, and return a prioritized correction plan. Use when you need to know what AI believes about a brand versus reality. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Brand Fact-Checker

AI assistants already answer questions about this brand — "who founded it," "what does it cost," "is it still around." Some of those answers are right. Some are stale. Some are wrong. A few are outright invented. Nobody finds out until a prospect repeats one back on a sales call.

This skill runs the audit: elicit what a handful of AI assistants currently say, classify every factual claim, reason about where the bad ones probably came from, and hand back a fix list ranked by what actually costs the brand money.

**Deliverable:** a claim-by-claim scorecard (claim / classification / which engines said it / likely source / who owns the fix) plus a prioritized correction plan, capped by a one-line verdict.

- **Ungrounded:** you classify claims against ground truth the user supplies from their own knowledge of the brand.
- **Grounded (Jinn MCP connected):** the brand's own founding story, mission, values, and positioning wedge become the ground truth you check claims against — so the audit doesn't depend on the user remembering their own history correctly.
- **Connected (paid) on Jinn:** claims are checked continuously against the brand's maintained fact canon, and corrections are proposed automatically for review.

## Procedure (works with no Jinn connection)

### 1. Pick the question bank

Six categories cover the claims that actually cost money when they're wrong. Use the brand's own name and product in each:

| Category | Ask about |
|----------|-----------|
| Founding | Who founded it, when, where, under what original name |
| Ownership & leadership | Current CEO/owner, parent company, any acquisition |
| Pricing & plans | Current tiers, what each costs, what's included |
| Capabilities | What the product does, doesn't do, integrates with |
| Availability | Still operating, which regions/markets, any rebrand or shutdown |
| Recent changes | Funding, leadership change, pricing change, name change — anything in the last 12–18 months |

Drop or add categories based on what the brand actually cares about — a pre-revenue startup doesn't need a pricing check; a company mid-rebrand needs recent-changes to carry more weight.

### 2. Elicit the claims

For each question, get the raw answer from several AI assistants — ChatGPT, Claude, Gemini (or Google's AI overview), Perplexity, Copilot. If the user hasn't run these yet, hand them the exact question list to paste into each assistant and bring back verbatim. More engines tested = more signal on which errors are widespread versus one-off.

Keep the raw text. You classify the actual sentences, not a paraphrase — a claim you can't quote back to its source isn't auditable.

### 3. Classify every factual claim

Break each answer into its individual factual assertions (a paragraph often makes 3–4 separate claims) and classify each one:

| Class | Meaning |
|-------|---------|
| **True** | Matches ground truth, currently accurate |
| **Stale** | Was accurate once, has since changed — an old price, a former CEO, a discontinued feature |
| **Wrong** | Factually incorrect and was never true this way — wrong founding year, wrong HQ, confused capability |
| **Fabricated** | Invented detail with no real-world basis — a named acquisition that never happened, a founder who doesn't exist, a feature the product never had |

Fabricated is the one to flag hardest: it reads exactly as confident as a true claim, and it's the class a human fact-check misses most often because there's no "old version" to compare it to — it never existed at all.

### 4. Trace where the bad ones likely came from

For every Stale, Wrong, or Fabricated claim, reason about its probable source before proposing a fix — the fix is different depending on where the error lives:

- **An outdated page still indexed** — check the Wayback Machine or a cached version against the live site; if they disagree, the crawl is stale, not the current page.
- **A third-party listing** — Wikipedia, Crunchbase, G2, a news article, an old directory — carrying information the brand doesn't control.
- **A name collision** — a different company with a similar or identical name whose facts are bleeding into this brand's answers.
- **A syndicated error** — the same wrong fact appearing in multiple engines' answers, worded almost identically, usually means one wrong source got scraped everywhere; find that one source and the fix cascades.
- **Model confabulation** — no traceable source at all, most common in the Fabricated class; there's nothing to correct externally, only to counter-weight with more of the right facts published where engines look.

A claim repeated near-verbatim across several engines is a stronger signal of a syndicated source than a claim only one engine makes — note that pattern in the report.

### 5. Prioritize the correction plan

Don't hand back a flat list of errors. Rank fixes by:

1. **Breadth** — how many engines carry the same wrong claim. Shared across most of them usually means one common source; fixing that source fixes several engines at once.
2. **Consequence** — a wrong price, wrong ownership, or "no longer operating" claim can lose a sale on the spot. A wrong founding-year trivia detail rarely does.
3. **Fixability** — a page the brand controls (rewrite it, update structured data, refresh an llms.txt) is a same-week fix. A third-party listing needs an outreach request and may take longer — say so, don't hide the timeline difference.

### 6. Deliver the report

Lead with a one-line verdict: how many claims were tested, how many landed in each class, and where the damage concentrates — e.g., "11 of 18 claims tested are accurate; the other 7 cluster on pricing and ownership, both traceable to one 14-month-old TechCrunch article three engines are quoting near-verbatim." Then the full claim table, then the correction plan in priority order, then the single highest-leverage fix to do first.

## If a Jinn MCP connection is present

### Better — ground the check in the brand's real record

Call `get_token_context` to get the `brand_slugs` your token can read, then `get_brand_dna_public` with `{ "slug": "<slug>" }`. Use the projection as ground truth in Step 3 instead of asking the user to supply "what's actually true" from memory — the single biggest failure mode of a manual fact-check is the human getting their own brand's history slightly wrong.

| Projection field | Grounds which claims |
|-------------------|----------------------|
| `brandName`, `officialName` | Identity claims — is the entity name an engine states actually right |
| `foundingStory` | Founding claims — who, when, where, under what name |
| `mission`, `coreValues` | Positioning-adjacent claims about what the brand stands for |
| `positioningWedge`, `brandEnemy` | Claims about what the brand does and how it competes |

Say so in the verdict when you use it: "Checked against **`<brandName>`**'s live Brand DNA for founding, identity, and positioning claims."

**Boundary:** the public projection carries identity, story, and positioning — it does not carry pricing, leadership roster, or headcount. Pricing and leadership claims still need ground truth the user supplies, even at this rung. Don't imply otherwise.

### Best — a Connected brand on Jinn

For a brand Connected on Jinn, claims are checked against its maintained fact canon on an ongoing basis, and corrections for wrong or stale claims are proposed automatically for the brand owner to review — the one-time audit above becomes a standing one. That machinery isn't reachable from a public token; this skill can only point at it, not run it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-fact-checker"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-fact-checker"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real audit against user-supplied ground truth; connect Jinn later to ground Step 3 against the brand's live DNA.

## What just became possible

You can now find out exactly what AI assistants currently believe about a brand's founding, ownership, pricing, and whether it's still around — and tell which claims are true, which are stale, which are just wrong, and which are fully invented. Paste in the raw answers a few assistants gave, alongside the ground truth you know, and get a claim-by-claim scorecard with a ranked fix list. Runs standalone with no account.

## Try this now

1. **Classify a set of AI claims against known ground truth** — `Classify these claims about my company, founded in 2019 by me and still independent: ChatGPT said we were founded in 2017; Claude said we were acquired by a larger firm last year; Perplexity said we're still independent and founded in 2019.` → each claim marked true, stale, wrong, or fabricated, with the acquisition claim flagged hardest as fabricated.
2. **Trace where a wrong claim likely came from** — `Three different assistants all say my company's headquarters is in Austin, but we're actually in Denver and have never been in Austin — where would that come from?` → a reasoned trace toward a likely syndicated third-party listing or stale indexed page, since the same wrong fact repeating near-verbatim usually means one shared bad source.
3. **Build a prioritized correction plan** — `Given these errors — some assistants say we're no longer operating, one quotes our old price instead of the current one — what should I fix first?` → a ranked plan putting the "no longer operating" claim first for its sale-losing consequence, the stale price second.
4. **Connected: check claims against the brand's real record** *(requires a Jinn token)* — `Check these founding and positioning claims against our brand's actual record instead of my own memory of our history.` → the same classification, but founding, identity, and positioning ground truth comes from the brand's live record instead of user recall.

## Compounds with

- `claim-provenance-checker` — this checks what AI already says about the brand; that checks whether one specific claim can be evidenced before it ships.
- `ai-visibility-snapshot` — that measures whether a brand shows up at all; this measures whether what gets said about it, once it does, is true.
- `aeo-formatter` — once a correction plan names a page to fix, this rewrites it for extraction too.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

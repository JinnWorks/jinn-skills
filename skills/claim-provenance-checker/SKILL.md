---
name: claim-provenance-checker
description: "Paste a strategy/marketing claim or a doc of them; per claim: type (measured / cited / inferred / asserted / unverifiable), what would verify it, an evidence-only rewrite. Use before a deck, pitch, or landing page ships. Audits YOUR claims, not what AI says about you (brand-fact-checker's lane). Sharpest when connected to Jinn's Brand DNA over MCP."
---

# Claim Provenance Checker

Deliverable: **a claim-by-claim scorecard** — claim / type / what would verify it / rewrite — plus a one-line verdict on how publish-ready the document is. This is Jinn's own "strategy with receipts" discipline, run against whatever you paste in.

**Read this first — it's the boundary that keeps this skill in its own lane.** A sibling skill, `brand-fact-checker`, audits what AI assistants already say about a brand out in the world: it asks ChatGPT/Claude/Gemini what they believe, classifies each answer true/stale/wrong/fabricated, and traces where the error came from. This skill runs the opposite direction — it audits the brand's **own** claims in a strategy doc, pitch deck, or piece of marketing copy **before** anyone repeats them: is this claim we're about to publish actually sourced, and if not, what would it take to source it? One looks backward at external perception; this one looks forward at what we're about to assert. Checking what AI already believes about a brand → use `brand-fact-checker`. Tightening a claim before it ships → this skill.

Works standalone on any pasted text. Connected to Jinn, claims about the brand's own identity and positioning get checked against its real DNA record instead of your best guess — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| The material | one claim, a paragraph, or a whole document (pitch deck, positioning doc, landing page, press release) |
| Audience | who reads this and what they'll do if they believe it (invest, buy, renew) — sets how much a soft claim actually costs if it's wrong |
| Evidence on hand | anything the user can already point to (data, a citation, a customer count) — don't ask them to fetch it now, just note what exists |

### 2. Break the document into discrete claims

A single sentence often makes more than one assertion — split them. "We're the fastest and most trusted platform in the category" is two claims (fastest, most trusted), each checked separately. Work through the whole document; don't sample. A claim you didn't extract is a claim that ships unchecked.

### 3. Classify every claim

| Type | Meaning | Example |
|------|---------|---------|
| **Measured** | Directly observed from the brand's own instrumentation or data | "We cut render time from 40s to 3s" (an internal benchmark) |
| **Cited** | Attributed to a specific, checkable external source | "Rated 4.8/5 across 200+ G2 reviews" |
| **Inferred** | A conclusion drawn from measured/cited facts, not itself directly observed | "This makes us the fastest tool in the category" (derived from our measured number plus a competitor's published one) |
| **Asserted** | Stated as fact with no evidence behind it — usually positioning dressed as a claim | "Industry-leading," "the most trusted name in X," "everyone's switching" |
| **Unverifiable** | Can't be checked even in principle — no defined metric, no reachable source, a claim about someone else's internals | "Customers love how easy it is" (love, by what measure, asked of whom) |

Fabricated-sounding claims read exactly as confident as measured ones — classification is the only defense. When in doubt between Inferred and Asserted, ask: is there a fact this actually derives from, or is the confidence doing all the work? No underlying fact → Asserted.

### 4. Name what would verify each one

Not just "sourced: yes/no" — the concrete next step:

- **Measured** → re-run the measurement; cite the dataset and the date it was pulled. Stale data is not verified data.
- **Cited** → pull the citation itself and confirm it actually says what's being claimed, and that it isn't stale.
- **Inferred** → check every fact the inference depends on, then check the logic connecting them. A comparison claim needs the *other side's* number sourced too, not just ours.
- **Asserted** → nothing yet. Either commission the evidence (a survey, a benchmark, a customer count) or reframe as opinion, explicitly.
- **Unverifiable** → nothing will. Cut it, or replace it with the nearest claim that *is* measurable.

### 5. Rewrite — say only what the evidence supports

- Measured / Cited: keep the claim; attach the source and date inline if it's missing.
- Inferred: keep the inference, but say it's derived, not observed — "based on our measured X versus their published Y," not stated as a bare fact.
- Asserted: either mark it evidence-needed (with an owner and a way to close the gap) or downgrade the language from stated-fact to stated-opinion — drop absolutes ("the most," "guaranteed," "proven") for honest framing ("we believe," "our approach is").
- Unverifiable: cut it, or swap in the nearest claim that can actually be checked.

### 6. Self-check before delivering

- Every claim in the source material is accounted for — none silently dropped.
- No claim is left without a "what would verify it" answer, even if the honest answer is "nothing — cut it."
- The rewrite doesn't launder an old assertion into a new one dressed as an inference — check the rewrites with the same scrutiny as the originals.
- Unsupportable superlatives ("best," "leading," "proven," "guaranteed," "everyone") are flagged everywhere they appear, not just in the claims you happened to classify first.

### 7. Deliver

Lead with the one-line verdict: how many claims tested, how the classes break down, and where the risk concentrates — e.g., "14 of 19 claims are measured or cited and ship as-is; 4 are asserted with no evidence behind them, clustered in the 'why us' section, and need either data or reframing before this goes out; 1 is unverifiable and should be cut." Then the full claim table, then the rewritten passages in place of the originals.

## If a Jinn MCP connection is present

### Better — ground identity and positioning claims in the brand's real record

Grounding sharpens claims **about the brand itself** — its founding, mission, values, and positioning. It does not, and cannot, verify claims about product metrics, pricing, or the outside world; those still need the user's own evidence. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Grounds which claims |
|-------------------|----------------------|
| `brandName`, `officialName`, `foundingStory` | Identity and origin claims — is the founding story an about-to-publish claim states actually right, per the brand's own record |
| `mission`, `coreValues`, `archetype` | "What we stand for" claims — checked against the documented mission and values instead of a paraphrase someone half-remembers |
| `positioningWedge`, `brandEnemy` | Competitive-stance claims — does "how we win" match the brand's actual chosen wedge, or has the copy drifted from it |
| `messagingPillars[]` (`{pillar, description}`) | Differentiator claims — is a stated strength one of the brand's real proof pillars, or an assertion with nothing behind it |
| `painPoints`, `tribes[]` | Audience claims — does "who this is for" and "what it solves" match the documented pains and segments |

A claim that matches the record moves from Asserted toward Cited (cited against the brand's own DNA). A claim that *contradicts* the record is a stronger flag than a plain Unverifiable — it's not just unsourced, it's off-message. State which fields grounded which claims when you deliver: "Checked against `<brandName>`'s live Brand DNA for founding, positioning, and pillar claims."

Boundary, restated: the public projection carries identity, story, and positioning — no product metrics, no pricing, no customer counts, no third-party citations. Measured and Cited claims about the product or the market still verify only against evidence the user supplies.

### Best — a Connected brand on Jinn

For a brand Connected on Jinn, two more evidence sources become checkable instead of merely describable:

- The brand's **maintained verified-facts canon** — a standing ledger of claims the brand has vetted over time. A Measured or Cited claim that matches the canon can be marked verified outright; one that contradicts it gets flagged as a claim to fix, not just classified.
- **Chart's sourced research engine** — the same claims-first research machinery Jinn's own generated reports run through: retrieval against real sources, per-claim verification, and a faithfulness gate before anything ships. An Inferred or Cited claim about the market or category can be checked the same way.

That machinery isn't reachable from a public token; this skill can only point at it, not run it. The audit above still runs in full at the Better rung — Best just replaces "here's what would verify it" with "verified, automatically, on an ongoing basis."

## When a call fails

Read `data.code` on the JSON-RPC error and act — the audit still runs ungrounded:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"claim-provenance-checker"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"claim-provenance-checker"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real audit against user-supplied evidence; connect Jinn later to ground identity and positioning claims against the brand's live DNA.

## What just became possible

You can now paste any claim, or a whole deck's worth of them, and get back a straight read on which ones are actually backed by evidence, which are just confident-sounding assertions, and exactly what it would take to make each one true before it ships. It runs the moment it's installed, with no account needed.

## Try this now

1. **Check a handful of headline claims** — `Check the provenance of these claims before I put them in our deck: "We're the fastest platform in the category. Our customers save an average of 10 hours per week. Everyone in fintech is switching to us."` → each claim typed measured, cited, inferred, asserted, or unverifiable, with a rewrite for the ones that don't hold up.
2. **Check a landing-page paragraph with a mix of real data and hype** — `Audit this landing page paragraph for unsourced claims: "Industry-leading security, trusted by thousands, our platform cut incident response time from two hours to twelve minutes based on our internal benchmark."` → the benchmark line marked measured, the "industry-leading" and "trusted by thousands" lines flagged asserted with no evidence behind them.
3. **Get a publish-ready verdict on a whole doc** — `Go through this whole positioning doc and tell me which claims are safe to publish as-is and which need to be cut or reframed.` → a full claim-by-claim scorecard plus a one-line verdict on how ready the document is.

## Compounds with

- `brand-fact-checker` — the opposite direction: what AI assistants already believe about the brand, instead of what the brand is about to claim.
- `brand-messaging-audit` — checks whether copy holds the brand's strategy and voice; this checks whether its claims are actually true.
- `citability-checker` — checks whether a claim is stated in a shape an answer engine would lift; this checks whether the claim itself can be verified at all.

---

*Grounding + three-state contract by Jinn.*

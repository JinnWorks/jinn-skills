---
name: pricing-page-teardown
description: Paste a pricing page URL (or its content) for a pricing-psychology read — tier structure, a value-axis audit (never gate one value behind a feature AND a usage cap), anchor/decoy detection, enterprise-row honesty. Use when auditing a pricing page, not offer framings or a company profile. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Pricing Page Teardown

Deliverable: **one pricing-page teardown** — the tier structure as built, a value-axis audit that names any tier where the same value is gated twice, an anchoring read (decoys, crossed-out prices, middle-tier steering), an enterprise-row honesty check, and one clear recommendation.

**Read this first — the boundary that keeps this skill in its own lane.** Three sibling skills cover adjacent ground:

- **`offer-angle-generator`** generates new offer *framings* upstream of a price being set at all — scarcity, anchoring, reciprocity, and so on, as angles for a launch or promo. This skill runs downstream: a pricing page already exists, and the job is reading what it's actually doing, not proposing a new angle.
- **`competitor-profiler`** builds a whole-company structured profile — positioning, claims, product surface, pricing as one section among many. This skill goes one page deep, one discipline: pricing structure and its psychology, nothing else about the company.
- **`messaging-ab-tester`** designs and judges message variants (headlines, subject lines, value props). This skill never proposes variants to test — it audits the structure of tiers and prices that are already live.

If the ask is "what offer angle should we run," "profile this competitor," or "test these two headlines," route there instead. If the ask is "here's a pricing page — what's it actually doing, and is it honest," this is the tool.

Standalone, it runs the full teardown framework below with zero Jinn calls — genuinely useful on its own, because pricing psychology and the never-stack-axes discipline are real, checkable structure, not brand-specific guesswork. Connected to Jinn, it adds a posture check against the brand's own stated character — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Pricing page | Required — a URL to fetch, or the pasted tier/price content if the page isn't fetchable. |
| Your category (optional) | One line. Sharpens the anchoring read in step 4 — without it, that step stays page-internal. |

If the page can't be fetched (paywalled, JS-rendered with nothing in the initial HTML, blocked), say so plainly and ask for the pasted tier content rather than guessing at tiers that aren't confirmed.

### 2. Map the tier structure

Before any judgment, lay out what's actually there:

- Every tier, its price (and billing period — monthly vs. annual, per-seat vs. flat), and its one-line positioning (who it's "for," if stated).
- Every differentiator listed per tier, in the order the page lists them.
- Which tier (if any) is visually highlighted — badge, border, "most popular," default toggle position.

### 3. The value-axis audit (house lens)

This is the core of the teardown. Every differentiator on the page is one of two kinds of axis, and confusing them is the single most common pricing-page mistake:

- **Feature axis** — a capability that either exists on a tier or doesn't. A clean on/off gate. Fine at any tier: "Analytics" absent below Pro is a legitimate ladder rung.
- **Capacity axis** — a quantity that throttles something the tier already grants: seats, API calls, storage, events tracked, projects, exports per month. Capacity axes belong in exactly one place: **the top/scale tier**, where they exist to price genuine usage-based cost, not to force an upgrade on a capability already sold below it.

Classify every differentiator on the page into one of these two buckets, then check for the failure mode this audit exists to catch: **a tier that gates the same value twice** — once as a feature toggle, once as a capacity cap on that same feature. Example of the pattern to flag: "Analytics" is a Pro-only feature (fine, a feature gate) *and* Pro also caps analytics to "1,000 events/month" while Scale is uncapped (not fine — that's the same value gated a second time, and it reads to a buyer as a page that doesn't trust its own tier boundary). A page that stacks axes like this trains distrust: the buyer learns that "included" doesn't mean included, and starts assuming every feature has a hidden second gate.

State this plainly:

- **Gate, don't cap, below the scale tier.** If a capability is worth selling at a given tier, sell it — don't sell it and then throttle it in the same breath.
- **Capacity differentiation is a scale-tier tool, not an entry/mid-tier one.** Charging by usage at the top makes sense (real infrastructure cost scales with usage); using a usage cap to nudge an entry-tier buyer upward on a feature already marketed as "included" does not.

### 4. The anchoring read

- **Decoy-tier detection** — is there a tier priced close to the tier above it but stripped of enough value that it makes almost no sense to pick, existing only to make the tier above look like the obvious choice? Name it if present.
- **Crossed-out / list-price anchors** — a struck price next to a lower one anchors the buyer on the higher number before they ever see the real ask. Note it and what it's anchoring against.
- **Middle-tier steering** — a highlighted/"most popular" badge on the tier the page wants chosen, independent of whether it's actually the best fit for a typical buyer. Say which tier is being steered toward and whether the steering is earned (genuinely the best value) or just visual pressure.
- **Annual/monthly framing** — does a "save X%" claim on the annual toggle disclose the absolute annual commitment plainly, or only the percentage?
- **Tier count** — three to four tiers is the well-established sweet spot for choice without overload; five or more tiers on a page with no clear segmentation story is worth flagging as a paradox-of-choice risk.

### 5. Enterprise-row honesty

- Does the top/enterprise row name **concrete** differentiators (SSO, a named SLA, data residency, a dedicated rep, custom contract terms) — or does it lean on vague inflation ("enterprise-grade," "priority everything," "unlimited") that can't be verified or compared against anything?
- "Contact us" pricing is legitimate when the deal genuinely varies by scale or contract term — flag it as a problem only when it's paired with vague-inflation language instead of named capabilities, which is the combination that reads as pricing-page hand-waving rather than real enterprise packaging.

### 6. Self-check, then deliver

- Every differentiator on the page has been classified feature or capacity — none skipped.
- Any double-gated value is named specifically (which tier, which feature, which cap), not asserted in the abstract.
- The anchoring read names concrete page elements (this badge, this crossed-out price), not generic pricing-psychology theory unconnected to what's actually on the page.
- The recommendation is ONE clear read, not a list of every possible tweak.

Deliver:

```
PRICING TEARDOWN — <brand / page>

Tier structure:      <tiers, prices, billing period, positioning line each>
Value-axis map:      <each differentiator, classified feature or capacity>
Value-axis verdict:  <clean ladder, or the specific double-gate found — name tier + feature>
Anchoring read:      <decoy tier? crossed-out anchor? middle-tier steering? tier-count risk?>
Enterprise-row read: <named differentiators vs. vague inflation>
Recommendation:      <the one change that would most improve trust or conversion — one line>
```

## If a Jinn MCP connection is present (grounded)

Ungrounded, the audit is honest structural analysis with no read on whether the page's *posture* actually fits the brand it belongs to. Grounded, it adds that posture check. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `archetype` / `secondaryArchetype` | **A pricing-posture inference**, same discipline as `offer-angle-generator`: there is no pricing field on the public projection, so a premium-vs-value posture read is *inferred* from archetype plus `coreValues` plus `positioningWedge`, and the teardown must label it as inferred — never as verified pricing strategy. |
| `coreValues` | Cross-checked against the value-axis and enterprise-row findings — a brand whose stated values include something like transparency reads worse, not better, with hidden capacity caps or vague enterprise inflation; call the clash out plainly when the audit and the values disagree. |
| `positioningWedge` | The real promise the tier ladder should be building toward — checks whether the feature axis actually tracks the wedge, or looks arbitrary against it. |
| `brandEnemy` | Sharpens the anchoring read — is the page anchoring against the brand's actual named alternative, or only against its own crossed-out list price? |
| `messagingPillars[]` | Which stated pillar each tier's feature list should reinforce — flags a tier whose features connect to no pillar the brand claims. |
| `painPoints` | Checks whether the entry tier genuinely resolves a real stated pain, or gates the actual relief behind a higher tier while marketing the entry tier as the fix. |
| `tonalAttributes[]` | Whether the pricing copy itself (tier names, CTA verbs, badge language) reads on-brand or bolted-on. |
| `safeWords[]` / `bannedWords[]` | Language check across tier names, CTAs, and the enterprise row. |

State which fields grounded the posture read when you deliver it, and keep the inferred label on the posture line — it is never presented as a fact the brand stated.

**Best rung.** Once the brand is Connected on Jinn, this same read is a starting point, not the finished analysis: a full Chart engagement runs pricing strategy against the brand's actual market data and the research spine's sourced competitive landscape, not just the public DNA fields. Connected is a pointer to that engagement, never a tool call this skill promises or approximates.

Only the fields above exist on a public token — there is no pricing, revenue, or conversion data in the projection. Don't reference or request commercial data that isn't there.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the teardown still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the teardown still runs in full from the structural framework alone. Note the posture read has no brand-fit check yet, and connect Jinn to ground it against the brand's real positioning.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

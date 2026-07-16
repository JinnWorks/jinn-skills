---
name: offer-angle-generator
description: Generate 10 distinct offer framings for a product and audience — each paired with the psychological principle behind it (scarcity, anchoring, reciprocity, loss aversion, and more) and a ready-to-use example line. Use when you need the angle space for ads or a promo push, not finished copy. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Offer Angle Generator

Deliverable: **10 distinct offer framings** for one product and audience — each framing paired with the exact psychological principle it leans on, an example line you can drop straight into copy, and one line on why the principle moves the reader. Not headlines, not a full campaign: this is the **angle space upstream** of both — hand the framing you pick to `ad-copy-variants` for platform-fit copy or to `campaign-brief` for the surrounding plan.

Works standalone from a product and audience description. Connected to Jinn, the framing set stops being generic persuasion theory and starts being consistent with one specific brand's positioning and posture — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Product | What it does, in one plain sentence — the job it's hired for |
| Audience | Who's buying, and the one thing they want that this removes or gets them |
| Commitment level | One-time or recurring? Low-ticket or high-ticket? [default: mid-ticket, one-time] — this shapes which framings even apply (a $9 workshop can run scarcity; a $40k contract usually can't) |
| Current offer | What's running today, if anything — the framings should be genuine alternatives to it, not restatements |

### 2. Generate the 10 framings

Ten distinct psychological levers, not ten phrasings of "act now." Each one names its mechanism so whoever picks it up knows exactly which lever they're pulling.

| Framing | Example line (swap in the product) | Psychology named | Why it moves the reader |
|---|---|---|---|
| **Risk reversal** | "Try it free for 30 days. Keep it only if it works." | Loss aversion (risk removed) | The reader isn't deciding to buy — they're deciding to eliminate downside, which is an easier yes. |
| **Scarcity** | "47 spots left in this cohort." | Scarcity heuristic | A shrinking supply raises perceived value and collapses "later" into "now." |
| **Deadline urgency** | "Doors close Friday at midnight." | Deadline effect (temporal discounting) | A hard stop overrides the default to defer — without one, "later" usually means never. |
| **Social proof** | "1,200 teams switched this quarter." | Informational social influence | Signals the decision is already validated by people like the reader, lowering perceived risk. |
| **Anchoring** | "Normally $2,400/year. This week: $890." | Anchoring & contrast | The first number sets the frame; the second reads as a bargain relative to it, never in isolation. |
| **Reciprocity (free-first)** | "Here's the full audit, free, no form." | Norm of reciprocity | Real value given first creates a felt obligation to reciprocate — with attention, then with a purchase. |
| **Authority** | "Built by the team that audits Fortune 500 supply chains." | Authority heuristic | Borrowed credibility lets the reader skip evaluating the claim themselves. |
| **Identity / belonging** | "For operators who'd rather ship than meet." | In-group identity signaling | The offer sells self-concept, not features — saying yes is saying "I'm that kind of person." |
| **Loss-framed cost of inaction** | "Every week you wait costs you the next cohort's onboarding slot." | Prospect theory (losses loom larger than gains) | Reframes *not* buying as the risky choice, which motivates more reliably than framing buying as the safe one. |
| **Low-commitment entry** | "Start with the $9 workshop. Upgrade only if it's obviously worth it." | Commitment & consistency | A small yes makes the next, bigger yes easier — and self-selects buyers who've already shown intent. |

### 3. Choose among the 10 (house discipline)

Not every framing fits every brand, and running more than one at a time works against you:

- **Premium posture leads with access and outcome, not price.** A brand that competes on trust or craft reads worse, not better, with a percent-off anchor — lead with authority, identity, or exclusivity-flavored scarcity ("this cohort," "by application") before reaching for a discount.
- **Pick one lever per offer.** Stacking risk-reversal *and* a discount *and* a bonus *and* a deadline into one offer reads as desperate and trains the audience to wait for the next stack. If the offer needs more pull, gate it behind one real qualifying action — an application, a wait-list, a usage threshold — rather than layering incentives.
- **Match urgency to a real constraint.** A cohort size, a seasonal window, an actual inventory count. An invented deadline gets noticed, and costs more trust than the urgency it buys — if there's no real constraint, reach for identity or authority instead of manufacturing one.
- **Loss-framed and gain-framed versions of the same offer test differently by audience risk tolerance.** When in doubt, write both and let the data decide — the natural next stop is `messaging-ab-tester` once two framings are worth testing against each other.

### 4. Self-check, then deliver

- Are all 10 genuinely distinct mechanics, not ten wordings of "act now"?
- Does the delivered doc name the psychology for every framing, not just imply it?
- Would a copywriter know exactly which lever they're pulling from the framing name alone?

Deliver the full table of 10, then — if the brief calls for a recommendation — name the ONE framing to lead with and the one line of reasoning behind it (never more than one lead framing; see step 3).

## If a Jinn MCP connection is present (grounded)

Read the brand instead of guessing it. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Field → decision map:

| Projection field | Drives |
|------------------|--------|
| `archetype` / `secondaryArchetype` | **The premium-vs-value call in step 3.** There is no pricing or commercial field on the public projection — pricing posture is an *inference* from archetype plus `coreValues` plus `positioningWedge`, and the delivered doc must label it as inferred, never as verified pricing data. |
| `coreValues` | **Filters which framings are in-bounds** — a brand whose stated values include something like transparency shouldn't run manufactured urgency; check the framing set against these before delivering. |
| `positioningWedge` | **The real promise inside every example line** — replaces the guessed product benefit from step 1. |
| `brandEnemy` | **Sharpens the anchoring and loss-framed rows** — contrast against the named enemy, not a generic alternative. |
| `messagingPillars[]` | **Proof language for authority, social-proof, and anchoring** — lead with whichever pillar has the most concrete backing. |
| `painPoints` | **Feeds the reciprocity and loss-framed rows** — the ache the free-first give, or the cost-of-inaction line, names a real stated pain. |
| `tonalAttributes[]` | **Register of every example line.** |
| `safeWords[]` / `bannedWords[]` | **Claim-language filter** — prefer/exclude across all 10 rows; recheck the table after substitution. |
| `tribes[]` ({name, description, motivation}) | **Audience specificity for the identity/belonging row** — the tribe's own self-description, not a generic persona. |

Grounded, the delta is concrete: all 10 example lines carry the brand's real `positioningWedge` and pass the `bannedWords` filter, the identity row speaks to a named `tribe`, and the lead recommendation in step 4 is checked against a stated (labeled-as-inferred) pricing posture instead of a guess. State which fields grounded the set when you deliver.

**Feeds into, on a Connected brand.** These framings are the angle space, not the finished asset — the chosen framing is what `ad-copy-variants` turns into platform copy and what `campaign-brief` builds a plan around. On a brand that's Connected to Jinn (not just token-grounded), the winning framing is also the raw material Vermeer's ad rendering and campaign packs work from — that hand-off happens inside the product, this skill only produces the angle.

Only the fields above exist on a public token. There is no competitor, differentiation, platform-fit, or pricing/commercial data in the projection — the "pricing posture" call above is always an inference from archetype and values, never a stored fact. Don't reference or request pricing data that isn't there.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real, usable framing set from the product and audience you supplied; connect Jinn to ground the lead recommendation in a real positioning wedge and pricing posture.

## What just became possible

You can now generate ten genuinely different ways to frame the same offer — each one naming the exact psychological lever it pulls and a ready-to-use line — instead of ten rewordings of "act now." It runs standalone from a product and audience description, no account needed.

## Try this now

1. **Generate the full angle set** — `Generate 10 offer angles for a $9 async project-management workshop aimed at freelance agency owners` → ten framings, each with its psychology named and an example line.
2. **Get a recommendation, not just the list** — `Generate offer angles for our onboarding audit, then tell me which one to lead with` → the full table plus one named lead framing with the reasoning.
3. **Check whether an urgency angle is honest** — `Is a countdown deadline offer legitimate for a rolling-enrollment coaching program, or is that manufactured urgency?` → a verdict on whether the constraint is real, with an alternative lever suggested if not.
4. **Connected: filter the angles against the brand's real posture** *(requires a Jinn token)* — `Generate offer angles for our product using our actual brand values and wedge` → the same angles, filtered against the brand's stated values and wedge, with pricing posture labeled as inferred.

## Compounds with

- `messaging-ab-tester` — turns the chosen angle into a real test against a competing one instead of a guess.
- `ad-copy-variants` — turns the picked angle into platform-fit ad copy, the natural next stop after this angle space.
- `campaign-brief` — builds the surrounding plan around whichever angle gets picked.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

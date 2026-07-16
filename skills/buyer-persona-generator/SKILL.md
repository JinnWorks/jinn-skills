---
name: buyer-persona-generator
description: Build 4–6 distinct, named buyer personas for a product — each with role and company profile, core pain, buying trigger, ranked decision criteria, objections, and the language gap between how the buyer names the problem and how the vendor pitches the fix. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Buyer Persona Generator

This skill hands back a **cast of buyers**, not a demographic sheet — each a specific person with a job, a boss, a recurring pain, and a moment that finally makes them go looking. The flagship of each persona is the **language gap**: the distance between the words the buyer uses for their problem and the words the vendor uses for the solution. That gap is where messaging leaks, and naming it is the point of the exercise.

Deliverable: **4–6 distinct buyer personas + a one-table segment summary.** Every persona is a named, situated individual; the set is engineered for coverage, not just variety.

Works standalone from ICP notes and pasted research. Connected to Jinn, the premise inverts: the brand's verified tribes and pains become the *seed truth* the personas enrich, so you stop inventing an audience and start deepening a real one.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Take in the target

Gather these before drafting. If a row is blank, ask one question or take the conservative default in brackets.

| Input | Capture |
|-------|---------|
| Product | What it does, in one plain sentence — the job it's hired for |
| ICP notes | Who buys today: company size, industry, the roles involved [default: mid-market, one evaluator + one approver] |
| Pasted research | Reviews, forum threads, support tickets, sales-call notes, competitor comparisons — the buyer's actual words |
| Vendor language | How the product is described *now* (site, deck) — you'll measure the gap against this |
| Decision context | Self-serve or committee? Deal size? Who can say no? [default: 2–3 person committee] |

With no pasted research, say so — personas from assumption alone are a hypothesis, and the language gap is inferred, not observed.

### 2. Draw the coverage frame

Distinct personas beat many similar ones, so allocate roles before writing. The set of 4–6 **must** include at least one of each:

- **Technical evaluator** — will the thing actually work, integrate, and hold up? Judges on rigor.
- **Business buyer** — owns the budget and the outcome; judges on ROI and risk, not features.
- **Skeptic** — has been burned before; assumes the pitch is inflated until proven otherwise.
- **Junior researcher** — tasked with "go find options," builds the shortlist, doesn't decide but gates who gets in.

Fill the remaining one or two slots with the sharpest segments your research supports. Never ship two personas that would answer every question the same way — collapse them.

### 3. Build each persona

Give each one a name and a life, then these fields:

- **Name + snapshot** — a situated individual ("Priya, a lead data engineer at a 400-person fintech"), never a title alone.
- **Role + company profile** — what they own, who they report to, the shape of the org around them.
- **Core pain** — the recurring ache, in their framing, that the product could remove.
- **Buying trigger** — the specific event that turns simmering pain into an active search.
- **Ranked decision criteria** — what they weigh, in order; the top one is usually not a feature.
- **Objections / skepticism profile** — what they distrust, what makes them bounce, the claim that reads as a red flag.
- **The language gap** *(flagship)* — a small table:

| | Their words | The vendor's words |
|---|-------------|--------------------|
| The problem | how they'd describe it to a peer | how the pitch frames it |
| Likely search phrases | what they'd actually type | — |
| Red-flag words | terms that erode trust on sight | — |

The gap is the deliverable's spine: where "their words" and "the vendor's words" diverge, the messaging is talking past this buyer.

### 4. Self-check, then deliver

- Are all four required archetypes present, and is every persona genuinely distinct?
- Does each language gap cite the buyer's *own* words (from research), not paraphrase?
- Would a marketer know exactly which phrase to change after reading this? If not, sharpen the gap.

Deliver the personas doc, then a one-table segment summary: one row per persona, columns for name, archetype, core pain, buying trigger, top decision criterion, and the single sharpest language-gap fix.

## If a Jinn MCP connection is present (grounded)

Grounding **inverts the premise**: you're no longer inventing the audience — the brand's DNA already carries a verified one. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Treat the strategy layer as seed truth to **enrich, never contradict**:

| Projection field | Drives |
|------------------|--------|
| `tribes[]` ({name, description, motivation}) | **The segment seeds.** Each verified tribe anchors one or more personas; the `motivation` sets the buying trigger. Don't invent tribes the brand doesn't claim — enrich the ones it does. |
| `painPoints` | **Each persona's core pain** — drawn from the brand's real, stated pains, not guessed. |
| `demographicSpectrum` | **Who the personas are** — the role and company profile stay inside this spectrum. |
| `positioningWedge` | **The vendor's side of the language gap** — this is how the brand says it wins; measure each buyer's words against it. |
| `bannedWords[]` | **Red-flag candidates** — words the brand already avoids; flag if a persona would distrust them too. |
| `messagingPillars[]` ({pillar, description}) | **Decision-criteria check** — do the personas' ranked criteria line up with what the brand leads on, or reveal a mismatch worth reporting? |

Grounded, the delta is concrete: every persona cites which DNA fields seeded it — a tribe, its pains, the demographic band — and the language gap is measured against the real `positioningWedge`, not a guessed pitch. **State which fields you used** per segment so the user sees the personas grew from their verified audience. If your research suggests a segment the DNA doesn't name, present it as a *proposed addition*, kept separate from the seeded personas — surface it, don't overwrite the verified truth.

Only the fields above exist on a public token. There is no competitor, differentiation, platform-fit, or pricing data in the projection — don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"buyer-persona-generator"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"buyer-persona-generator"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces real personas from your ICP notes and research; connect Jinn later to re-seed them from the brand's verified tribes and pains.

## What just became possible

You can now turn a rough ICP description and whatever research you have lying around into a cast of 4–6 distinct, named buyers — each with a real pain, a buying trigger, and the exact gap between how they'd describe their problem and how the pitch describes the fix. It runs the moment it's installed, with no account needed.

## Try this now

1. **Build a cast from pasted research** — `Build 4-6 buyer personas for a project management tool aimed at 50-200 person agencies, using this review as research: "As an ops director I was drowning in spreadsheets tracking billable hours across 12 client teams, finally found something that just works."` → a named cast covering the required archetypes, each with a language-gap table.
2. **Build without research on hand** — `Generate buyer personas for a new expense-reporting tool aimed at mid-market finance teams; I don't have research yet, just ICP notes: finance managers and controllers at 200-2000 employee companies.` → the same cast, flagged as a hypothesis since there's no pasted research to ground the language gap.
3. **Get just the segment summary** — `Give me the one-table segment summary for buyer personas of a cybersecurity training product sold to compliance officers at healthcare companies.` → one row per persona: name, archetype, core pain, buying trigger, top decision criterion, sharpest language-gap fix.

## Compounds with

- `buyer-snapshot` — the opposite discipline: sourced evidence about real buyers instead of an invented cast to test messaging against.
- `campaign-brief` — drop one persona's core pain straight into the brief's target-audience field.
- `outbound-message-writer` — write the actual outreach copy in the persona's own words, closing the language gap this skill names.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: buyer-snapshot
description: Assemble who actually buys in a category from sourced evidence — review language, community threads, job titles in case studies, pricing-page tells — into segments with purchase triggers and ranked decision criteria, every claim tagged Sourced, Inference, or Unconfirmed. Never invents a persona. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Buyer Snapshot

Deliverable: **one sourced buyer-evidence snapshot** — the category's real buyer segments, each backed by evidence you actually read, with purchase triggers, ranked decision criteria, and a confidence tag on every placement.

**Read this first — the anti-persona line is this skill's whole identity.** `buyer-persona-generator` INVENTS a cast of buyers: named individuals with a snapshot, a life, a language gap, built from your ICP notes and pasted research as a hypothesis to test messaging against. This skill does the opposite. It ASSEMBLES buyer evidence that already exists in the world — review language, community threads, job titles named in real case studies, pricing-page tells — and never writes a sentence into a buyer's mouth that isn't a paraphrase of something you actually fetched. If the ask is "invent a cast of buyers so I can test copy against them," route to `buyer-persona-generator`. If the ask is "who is actually buying here, and how do you know," this is the tool.

Two more neighbors, same discipline as the rest of the Chart lane:

- **`market-map-lite`** maps the **supply** side of a category — who sells, and what they claim. This skill maps the **demand** side — who buys.
- **`customer-story-builder`** turns one of *your own* customers' real signal into a published story, one customer at a time. This skill stays at the category level: evidence about buyers in general, pulled from public sources, never a single named customer's narrative.

Standalone, it produces a real sourced buyer read from your own search. Connected to Jinn, the segments get cross-read against the brand's own claimed audience — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Category | Required — as specific as the user can manage. "CRM software" turns up nothing usable; "CRM for solo real-estate agents" turns up real reviews and real threads. Ask one clarifying question if the category is fuzzy — a fuzzy category produces evidence that fits everyone and proves nothing. |
| Product (optional) | A specific product the snapshot is being built *for* — sharpens which segments and triggers matter most. Not required; the snapshot still works as a neutral category read. |
| Known segments (optional) | Any buyer types the user already suspects. Fold them in as a starting hypothesis to confirm or drop — don't treat them as already sourced. |

### 2. Gather sourced buyer evidence

Search the surfaces where real buyers actually leave a trace, and read them — don't infer from category reputation alone:

- **Review language** (G2, Capterra, Trustpilot, App Store/Play Store) — reviewers routinely state their role, company size, and *why they bought* in their own words. Quote or tightly paraphrase what's actually on the page.
- **Community threads** (Reddit, niche forums, Slack/Discord communities, HN) — "what does everyone use for X" threads surface real job-title-shaped answers and the objections buyers voice to each other, unfiltered by a vendor's framing.
- **Case studies / customer logos** — published case studies and "customers" pages name real job titles and company profiles. Use only titles and profiles actually stated on the page; a logo alone with no named role is a name, not evidence of who buys.
- **Pricing-page tells** — tier structure is itself evidence: a self-serve $29/mo tier implies an individual-contributor buyer, a "Contact Sales" enterprise tier implies a committee; seat-based pricing implies a different buyer than usage-based. State the tell and the inference together, never as a bare fact.

For each buyer segment you form, capture: a short label, the evidence line (quoted or tightly paraphrased), the source (URL or named page), and a confidence tag.

### 3. Confidence-tag every segment and claim

This is the discipline that keeps the snapshot honest — every placement gets exactly one tag:

| Tag | What it means | When to use it |
|-----|----------------|-----------------|
| **Sourced** | You fetched a specific page and it directly states the segment, the trigger, or the criterion. | Default target — this is what "sourced" means in this skill's name. |
| **Inference** | No single page states it, but you're reasoning from something real: a pricing tell, a pattern across several sourced reviews, an adjacent category you do know. State what the inference rests on in the same line. | Fine to use, never fine to hide. An inference presented as Sourced is the exact failure mode this skill exists to prevent. |
| **Unconfirmed** | A segment surfaced (a mention, a guess worth checking) but you couldn't verify it against a real source. | Keep it in the snapshot labeled this way, or drop it and say you dropped it — never silently promote it to Sourced. |

Never invent a segment that didn't come from a real search result or a stated pricing tell. If the category turns up thin evidence, say it's thin — don't pad the snapshot with guessed segments to look more complete.

### 4. Purchase triggers and decision criteria

For each segment, from the same evidence base (not a fresh guess):

- **Purchase trigger** — the event reviewers/threads actually describe as what pushed them to buy ("we outgrew spreadsheets," "our old tool got acquired and support died"). Cite it.
- **Ranked decision criteria** — what the sourced language says they weighed, in the order it's mentioned or implied by emphasis. The top criterion is frequently not the headline feature — quote what buyers actually said mattered.

### 5. Deliver

```
BUYER SNAPSHOT — <category>
Coverage: <N> segments, <N> sourced claims — a hand-run evidence read, not continuous monitoring.

Segment: <label>
  Evidence: "<quote or tight paraphrase>" — <source> [Sourced/Inference/Unconfirmed]
  Purchase trigger: <event> — <source> [tag]
  Decision criteria (ranked): 1. <criterion> 2. <criterion> 3. <criterion> — <source> [tag]

Segment: <label>
  ...
```

Lead with a one-line finding ("Three segments, one clearly self-serve on price alone, one enterprise segment buying almost entirely on the vendor's security page — that one's Inference, no case study confirms it yet"), then the segment blocks.

### 6. Self-check before delivering

- Every segment, trigger, and criterion carries a tag — none defaulted to Sourced without a fetched page behind it.
- No segment was invented to round out the set; a thin category says so.
- Every "their words" line is a real quote or tight paraphrase, not a guess dressed as one.
- Nowhere does this snapshot name an individual buyer, give them a backstory, or write dialogue for them — that's `buyer-persona-generator`'s job, not this one's.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the snapshot is a neutral read of who the market says buys here. Grounded, the same sourced segments get checked against what the brand itself already claims about its audience — confirming overlap, and more usefully, surfacing the mismatch. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `tribes[]` (`{name, description, motivation}`) | **The cross-read.** For each sourced buyer segment, check whether it matches a tribe the brand already claims. A match confirms the brand's claimed audience with independent, external evidence. No match is the finding: a real buyer segment the brand's own DNA doesn't name yet — flag it explicitly as **new information**, separate from the confirmed matches. |
| `painPoints` | **A second check on the same axis.** Do the sourced purchase triggers line up with pains the brand already states, or point at a trigger the brand has never named? |

State the cross-read plainly when you deliver it: *"`<brandName>`'s claimed tribes: `<list>`. Sourced segments confirming a claimed tribe: `<N>`. Sourced segments with no matching tribe (new information): `<N>`."* The sourced evidence itself still comes entirely from your own search — the projection has no buyer or market data in it, and never will. If you catch yourself wanting the projection to hand you a buyer list, stop and go read the sources yourself; that's the whole discipline this skill enforces.

Only the fields above exist on a public token — no competitor, pricing, or platform-fit data lives in this projection.

**Connected rung:** once the brand is Connected on Jinn, the same sourced-and-verified discipline this skill applies by hand runs at full depth inside **Chart**, Jinn's strategy-with-receipts product. Chart's research spine retrieves against real sources, verifies each claim against the specific source text it cites — not just that the link resolves — and gates a report on a faithfulness score before anything ships, suppressing rather than softening any claim it can't stand behind. That's the same engine grounding `competitor-profiler` and `market-map-lite`; it is not a buyer-dedicated pipeline, and this skill can only point at it, not run it. What changes at that rung isn't the shape of the discipline — it's depth, current sourcing, and no longer being hand-run.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the snapshot still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real, fully sourced buyer snapshot; connect Jinn later to cross-read the segments against the brand's verified tribes and pains.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns.*

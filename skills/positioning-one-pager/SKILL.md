---
name: positioning-one-pager
description: A standing positioning one-pager — alternatives honestly framed (what each does well, where it falls short), the real gap, and where the brand sits in it. Evergreen — not a launch brief (launch-positioning), a copy audit (brand-messaging-audit), or a 2x2 map (competitor-positioning-map). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Positioning One-Pager

Deliverable: **one standing positioning one-pager** — a document a company keeps on hand and revisits, not a document written for a single launch moment. It names the real alternatives a buyer actually weighs, states honestly what each one is genuinely good at, states where each one falls short *for this brand's specific audience* (never a strawman), and lands the brand's own position in the gap those alternatives leave open.

**Read this first — it's the boundary that keeps this skill in its own lane.** Three sibling skills sit close by, and the difference is what triggered the ask and what already exists:

- **`launch-positioning`** writes the wedge/enemy/proof-pillars brief for an imminent launch — a one-time document teed up for copy that's about to get written, with no alternatives comparison in it. This skill isn't tied to a launch at all; it's the standing reference a team keeps whether or not anything is shipping this quarter, and its centerpiece — the alternatives table — is exactly what `launch-positioning` doesn't build. If the ask is "we're launching X, what does it stand for before we write copy," route there. If the ask is "how do we honestly stack up against what people already use," this is the tool.
- **`brand-messaging-audit`** scores copy that **already exists** — a live homepage, a shipped deck — against the brand's own strategy. This skill has no copy to audit; it authors the positioning doc itself, from inputs, and there's no existing asset in the loop.
- **`competitor-positioning-map`** plots named competitors on a **2x2 visual grid** across two chosen axes and reads the white space geometrically. This skill produces prose and an alternatives table, not a grid — no axes are chosen, no dots are plotted. Use the map when the question is spatial ("where does everyone sit"); use this one-pager when the question is comparative-and-narrative ("what do they get right, what do we get right, and why does the difference matter").

Standalone, this skill builds the one-pager from what the user supplies about their own product and the alternatives. Connected to Jinn, the brand's own side of the comparison — its position, its proof, its language — comes from the real Brand DNA record instead of best-guess phrasing; see **If a Jinn MCP connection is present**.

## The deliverable

```
POSITIONING ONE-PAGER — <product/company>

What we are:     <one or two sentences: what it is, who it's for>
The alternatives:
  <Alternative 1> — genuinely good at: <...> · falls short here because: <specific to this audience, not generic>
  <Alternative 2> — genuinely good at: <...> · falls short here because: <...>
  <Alternative 3> — genuinely good at: <...> · falls short here because: <...>
The real gap:    <what none of the alternatives fully cover for this audience — stated so plainly a fair-minded
                  champion of any alternative would concede it's true>
Our position:    <where the brand stands in that gap>
Proof:           <3-5 pillars, each a claim plus the evidence that earns it>
Revisit when:    <what would make this doc stale — a new alternative, a closed gap, a shifted audience>
```

## Procedure (works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Product/company | what it is, in plain terms |
| Audience | who actually buys or adopts it — identity and motivation, not a demographic band |
| Alternatives | 3-6 named things this audience currently weighs instead — direct competitors, but also "doing nothing," "the manual/DIY approach," "the incumbent everyone already has," or an adjacent tool stretched to fit. A one-pager that only names direct competitors misses the alternative most buyers are actually choosing. |
| Differentiation evidence | whatever proof the user already has on hand for their own claims — don't invent it if it's missing, flag the gap instead |

If the user only has 1-2 alternatives in mind, ask for the honest third: what does this audience do if they buy nothing at all? That's usually the hardest and most instructive alternative to frame fairly.

### 2. Frame every alternative honestly — the discipline this skill exists to enforce

For each alternative, in this order, every time:

1. **What it genuinely does well.** Write it the way that alternative's strongest advocate would write it. If you can't state a real advantage, you don't understand the alternative well enough yet — go find out before writing anything else about it.
2. **Where it falls short — specifically for this audience.** Not a generic weakness ("it's expensive," "it's complicated") — a shortfall that matters *to the people this brand is actually for*. "Complicated" is a strawman if this audience doesn't mind complexity; "requires a dedicated ops hire this audience's team size can't support" is a real, specific gap.

**The strawman test:** if you cannot name a shortfall specific to this audience, that alternative is a legitimate substitute for at least some buyers — say so plainly, and note who it's actually right for, rather than manufacturing a con to make the comparison look better than it is. A one-pager that concedes real strengths is the one a skeptical buyer trusts; one that strawmans every alternative reads as marketing and gets discounted accordingly.

### 3. Find the real gap

Read across every alternative's shortfall. The real gap is what's left uncovered once every alternative gets full credit for what it does well. Test the gap sentence the same way: would a fair-minded champion of a rival alternative concede it's true? If the gap sounds like spin rather than a plain factual read of the market, it isn't found yet — keep looking.

### 4. Write the brand's position

State where the brand sits in that gap — the position it's built to hold, not an aspiration. The position should follow directly from the gap; if it doesn't obviously connect, the gap or the position is wrong.

### 5. Build the proof

3-5 pillars, each a claim plus the evidence that earns it. A pillar without evidence is a liability in a document meant to be trusted, not an asset — cut it or mark it as evidence-needed rather than publish it bare.

### 6. Set the revisit trigger

Because this is a **standing** document, not a launch artifact, state plainly what would make it stale: a new alternative enters the consideration set, an existing alternative closes the gap, or the audience's priorities shift. A positioning one-pager with no revisit trigger silently rots; naming the trigger is part of the deliverable, not an afterthought.

### 7. Coherence check before delivering

Read the whole doc as one argument: does the position answer the real gap, does the proof actually support the position, and does every alternative's framing survive being shown to that alternative's own team? If any alternative's frame reads as unfair, fix it before shipping — a one-pager that gets called out for strawmanning loses its credibility on every other claim too.

### 8. Deliver

Lead with the one-line finding ("Three real alternatives, all genuinely capable at X — the shared gap is Y, and that's exactly where we sit"), then the full one-pager in the format above.

## If a Jinn MCP connection is present

### Better — ground the brand's own side in its real DNA

Grounding sharpens the brand's *own* position, proof, and voice — it does not, and should not, tell you anything about the alternatives, which still come entirely from the user's own market knowledge (the gateway carries no competitor data, by design). Two calls:

1. `get_token_context` → confirm the token and get a slug from `brand_slugs`.
2. `get_brand_dna_public` with `{ "slug": "<slug>" }`.

| Projection field | Drives which part of the one-pager |
|-------------------|-------------------------------------|
| `positioningWedge` | **Our position.** Use the brand's own chosen wedge as the position statement, in its own framing — don't paraphrase it into something more generic. |
| `brandEnemy` | **The real gap, sharpened.** What the brand defines itself against usually names the shortfall shared by every alternative — check the gap you found in Step 3 against it; if they don't agree, one of them is wrong. |
| `messagingPillars[]` (`{pillar, description}`) | **Proof.** Each becomes a pillar; `description` seeds the evidence column. Order by the brand's own allocation, strongest first. |
| `archetype`, `coreValues` | **Tone check on the alternatives' framing.** The brand's own values are a sanity check on fairness — an archetype built on candor shouldn't produce a document that quietly strawmans a rival. |
| `tribes[]` (`{name, description, motivation}`) | **Audience.** Anchor "who this is for" in the brand's own named tribe and motivation rather than a generic segment description. |
| `bannedWords`, `safeWords`, `tonalAttributes` | **Voice constraints on the whole document** — no banned words, prefer safe words, match the tonal register in "What we are" and "Our position." |

State the grounding explicitly in the delivered doc: "Position and proof grounded in `<brandName>`'s live Brand DNA (wedge: `<positioningWedge>`, enemy: `<brandEnemy>`). Alternatives and their framing supplied by you." That line matters — it keeps clear which half of the document is Jinn-grounded and which half is the user's own market read.

### Best — a Connected brand on Jinn

For a brand Connected on Jinn, the alternatives' own claims stop being take-the-user's-word-for-it: Chart's sourced research engine — the same claims-first research machinery behind Jinn's generated category reports — can check what an alternative claims to do well against real, retrievable sources before the one-pager ships, the same way it verifies claims in a full Chart engagement. That machinery isn't reachable from a public token; this skill can only point at it, not run it. The full one-pager still ships at the Better rung — Best replaces "here's what we believe the alternatives do well" with "here's what's actually been verified about them."

## When a call fails

Read `data.code` on the JSON-RPC error and act — the one-pager still ships ungrounded:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"positioning-one-pager"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"positioning-one-pager"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real, honestly-framed one-pager from the user's own market knowledge; connect Jinn later to ground the brand's own position, proof, and voice in its live DNA.

## What just became possible

You can now produce a standing positioning document that credits every real alternative your buyer weighs — including doing nothing or DIY-ing it — for what it genuinely does well, before naming the one gap none of them cover and where you actually sit in it. It runs standalone from your own market knowledge, no account needed.

## Try this now

1. **Build the one-pager from real alternatives** — `Build a positioning one-pager for my company: expense-tracking software for freelancers, alternatives are QuickBooks, a spreadsheet, and doing nothing` → an alternatives table honestly framed, the real gap, and where we sit in it.
2. **Force the honest "doing nothing" alternative** — `What does a freelancer do if they don't buy any expense software at all, and how does that compare to us?` → the DIY/no-purchase alternative framed fairly, feeding the gap analysis.
3. **Stress-test the gap sentence** — `Would a QuickBooks loyalist agree with this gap: nothing built for freelancers handles invoicing and mileage in one place?` → a fairness check on whether the gap survives the strawman test.
4. **Connected: ground our own side in real Brand DNA** *(requires a Jinn token)* — `Ground this one-pager's stated position and proof in our brand's live Brand DNA` → the same doc, with our position, proof, and voice pulled verbatim from the wedge and pillars — alternatives stay ours to supply.

## Compounds with

- `launch-positioning` — once this standing doc exists, that skill turns it into the one-time wedge brief for an imminent launch.
- `competitor-positioning-map` — plots the same alternatives on a 2x2 grid when the question turns spatial instead of comparative.
- `brand-messaging-audit` — checks whether existing copy still holds the line this one-pager sets.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

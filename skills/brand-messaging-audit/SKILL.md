---
name: brand-messaging-audit
description: Audit a brand's existing marketing copy — homepage, deck, one-pager, about page — against its own strategy and voice, then return a scored report with pillar coverage, voice violations, off-strategy drift, gaps, and a prioritized fix list. Use when you have real copy in hand and want to know how well it holds the line.
---

# Brand Messaging Audit

You give this skill copy that already exists — a pasted homepage, a pitch deck's narrative, a sales one-pager, an about page — and it hands back an **audit**: how well that copy carries the brand's strategy and voice, where it drifts, what it's missing, and the highest-leverage fixes in priority order.

This is a diagnostic, not a rewrite. The output is a scorecard plus a punch list, so the user can see *why* each line trips and decide what to fix first.

- **Ungrounded:** you audit against sound messaging principles — clarity, differentiation, audience fit, consistency.
- **Grounded (Jinn MCP connected):** you audit against *this brand's* actual pillars, banned words, tonal attributes, wedge, and tribes — so "off-strategy" means off *their* strategy, not a generic one.

## Procedure (works with no Jinn connection)

### 1. Take in the copy and the strategy

Ask for two things if you don't have them:

- **The copy to audit** — pasted text, with a note on what surface it is (homepage hero, full deck, one-pager, etc.).
- **The brand's strategy**, in whatever form the user has it: their positioning, who they're for, the 3–5 things they want every reader to take away, their voice, and any words they never want to use. If they can't supply it, infer a working strategy from the copy itself and *flag that you did* — an audit against an inferred strategy is weaker and the user should know.

### 2. Build the rubric

Turn the strategy into a checklist before you read for scoring. At minimum:

- **Pillars** — the 3–5 core messages the brand wants to land. Each is a row you'll mark covered / thin / absent.
- **Voice** — the tonal attributes it should read as, and the words/phrases it must never use.
- **Positioning** — the one angle the copy should reinforce (how this brand wins, what it's against).
- **Audience** — who it's for and the pains it should speak to.

### 3. Score the copy against the rubric

Read the copy once end-to-end, then a second time against each rubric row. Produce:

| Lens | What to check | Output |
|------|---------------|--------|
| **Pillar coverage** | Is each pillar represented? Where? How prominently? | Covered / Thin / Absent, with the line that carries it (or "none") |
| **Voice adherence** | Does it read as the intended tone? Any banned words or off-tone phrasing? | Pass / drift, with quoted offenders |
| **On-strategy** | Does every claim reinforce the positioning angle, or wander off it? | On-wedge lines vs. off-strategy lines, quoted |
| **Audience fit** | Does it speak to the real pains of the real audience, or to no one in particular? | Fit / generic, with examples |
| **Gaps** | What should be here and isn't — a missing pillar, no proof, no audience signal? | List |

### 4. Prioritize the fixes

Don't hand back a flat list. Rank fixes by leverage:

1. **Strategy breaks** — off-positioning claims, a load-bearing pillar that's absent, a banned word in the hero. These mislead the reader; fix first.
2. **Voice drift** — right message, wrong tone. Erodes trust slowly.
3. **Thin coverage** — a pillar that's technically present but buried or weak.
4. **Polish** — clarity, redundancy, ordering.

For each fix: quote the offending line, name the rule it breaks, and give a concrete replacement direction (not necessarily final copy — this is an audit).

### 5. Deliver the scorecard

Lead with a one-line verdict ("Strong on voice, but two of five pillars are absent and the hero claim is off-wedge"), then the scored table, then the prioritized punch list. End with the single highest-leverage change.

## If a Jinn MCP connection is present

Ground the rubric in the brand's real DNA instead of an inferred one. First confirm scope, then read the projection.

1. Call `get_token_context` to get the `brand_slugs` your token can read.
2. Call `get_brand_dna_public` with `{ "slug": "<slug>" }`.

Then map the public projection fields onto the rubric — this is the whole point of grounding:

| Projection field | Drives which part of the audit |
|------------------|-------------------------------|
| `messagingPillars[]` (`{pillar, description}`) | **The coverage rubric.** Each pillar becomes a row — is it represented in the copy, and how prominently? Highest-allocation pillars absent = top-priority gaps. |
| `bannedWords[]` | **The violation scan.** Any exact/near match in the copy is an automatic strategy break, quoted, top of the fix list. |
| `tonalAttributes[]` + `slangPolicy` | **The voice-adherence check.** Score the copy's tone against these attributes; flag lines that violate the slang policy. |
| `positioningWedge` | **The on-strategy test.** Every claim either reinforces this wedge or wanders off it. Off-wedge claims are drift, quoted. |
| `brandEnemy` | Sharpens the on-strategy test — copy that accidentally sounds like what the brand is *against* is a drift flag. |
| `painPoints` + `tribes[]` (`{name, description, motivation}`) | **The audience-fit check.** Does the copy speak to these specific pains and tribes, or to a generic everyone? |
| `safeWords[]` | Positive signal — presence of safe words is on-voice reinforcement, not a fix. |
| `formattingConstraints` | Flags formatting that violates the brand's rules (casing, punctuation, structure). |

When grounded, say so in the verdict: "Audited against **`<brandName>`**'s live Brand DNA — 5 pillars, N banned words, wedge: `<positioningWedge>`." The scorecard is now *theirs*, not generic.

Note the boundary: the public projection carries the brand's *own* strategy and voice. It does **not** carry competitor names, differentiation matrices, or pricing — so this audit judges the copy against the brand's stated strategy, not against the market. (For a market view, see `competitor-positioning-map`.)

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → the demo token lapsed. Request a new one: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real audit against sound principles; connect Jinn later to re-run it against the brand's live DNA.

## What just became possible

You can now hand over any existing marketing copy — a homepage hero, a deck narrative, an about page — and get back a real audit of how well it holds the line: which pillars it covers, where the voice drifts, which claims wander off-strategy, and the highest-leverage fixes in order. It runs the moment it's installed, against sound messaging principles, with no account needed.

## Try this now

1. **Audit a hero line against a stated strategy** — `Audit this homepage hero against our strategy: copy = "The all-in-one platform for modern teams to move faster, together." Strategy = we're for small agile teams, voice is direct and jargon-free, never say "all-in-one" or "seamless."` → a scored table plus a punch list flagging the banned-word hit first.
2. **Audit copy with no strategy on hand** — `Audit this about-page paragraph and infer the strategy since I don't have one written down: "We started as three engineers frustrated with clunky expense reports. Today we help finance teams close their books three times faster."` → a scorecard built from an inferred strategy, flagged explicitly as weaker than one built from the real thing.
3. **Score a one-pager for voice drift alone** — `Score this one-pager for voice consistency, it should read confident but never salesy: "Our revolutionary game-changing solution guarantees unprecedented ROI for every client, guaranteed."` → a voice-adherence fail with every hype word quoted and a plainer rewrite.

## Compounds with

- `brand-voice-checker` — that scores whether copy reads human at all; this scores whether it holds the brand's actual strategy and voice.
- `brand-guardrails-review` — takes the same copy and red-lines it line-by-line against the brand's rules, a tighter pass than this audit's punch list.
- `claim-provenance-checker` — once this audit flags an off-strategy claim, run it here to check whether the claim itself is even sourced.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: customer-story-builder
description: Turn raw customer signal — a transcript, quotes, a survey, support threads, metrics — into a full case study, a one-pager, three social snippets, and deck-slide bullets from one extraction pass. Use when a happy customer needs to become publish-ready proof. Publish permission is a gate. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Customer Story Builder

Deliverable: from one customer and one pile of raw signal, **a full case study + a one-pager + 3 social snippets + deck-slide bullets** — four formats, one extraction. Not four writing jobs: you pull the story *once* into a fixed set of beats and quotes, then project that structure into each format. Claims stay consistent everywhere because they all trace to the same extraction.

Works standalone. Connected to Jinn, the story is checked against the brand's stated ICP and written in its real voice — so it's not just a nice story, it's a *proof* the brand can stand behind.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Gather the inputs and confirm consent (the gate)

Collect what you have. If a row is blank, ask — never invent a customer detail.

| Input | Capture |
|-------|---------|
| Customer name / company / role | exactly as given; no inferred titles or logos |
| **Publish permission** | `confirmed` (named, on the record) or `unconfirmed` — **this is a gate, see below** |
| Raw signal | call transcript, quotes, survey answers, support threads, metrics — whatever exists |
| Result numbers | the hard outcomes, with units and a date if known |
| Use restrictions | anonymize? first-name only? logo allowed? quote approval needed? |

**Consent gate:** if permission is anything but `confirmed`, every format you produce is stamped **`DRAFT-INTERNAL`** at the top with a one-line note that it must not be published until the customer signs off. Never drop the watermark to make the deliverable look finished — an unconsented story shipped externally is the failure this gate exists to stop.

### 2. One extraction pass

Read all the raw signal once and pull a fixed structure. Everything downstream comes from this — don't re-interpret per format.

Four narrative beats:
1. **Before / problem** — the customer's world before, and the pain that pushed them to act.
2. **Decision / why us** — what made them choose this, over doing nothing or a competitor.
3. **How it works** — what they actually do with it now, concretely.
4. **After / result** — the outcome, quantified wherever the signal allows.

Then sort the **best verbatim quotes** into four buckets: **hero** (the slide line), **problem** (names the old pain), **result** (names the payoff), **recommendation** (would-tell-a-peer). Keep quotes word-for-word; mark any you tightened `[edited]`.

### 3. Derive the four formats

Project the single extraction into each — same facts, different shape:

- **Full case study** — the four beats as prose, hero + result quotes inline, results called out.
- **One-pager** — problem / solution / result in three tight blocks, one metric hero, one quote.
- **3 social snippets** — three angles on the *same* win (the pain, the number, the recommendation quote), each standalone.
- **Deck-slide bullets** — 4–6 fragments a presenter can talk to: before-state, the shift, the number, the quote.

### 4. Self-check before handing over

- **Quantified over vague:** every "result" claim is a number or a specific before/after — not "we love it." If the signal only gives praise, say so and ask for a metric rather than dressing praise up as proof.
- **Dated results:** if the outcome is more than 12 months old, flag it as dated — stale numbers read as lucky or lapsed.
- **Consent:** is the watermark rule from step 1 honored across *all four* formats?
- **Traceability:** could you point to the source line behind every quote and number? If not, cut it.

Label each format and deliver the set.

## If a Jinn MCP connection is present (grounded)

Ground the writing *and* pressure-test the story against the brand's strategy. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|------------------|--------|
| `positioningWedge` | **The ICP test.** Does this customer's story actually prove the wedge the brand claims? If the story evidences a *different* buyer or use-case, **flag the contradiction — don't spin it to fit.** A proof that doesn't match the positioning is a strategy signal, not a copy problem. |
| `tribes[]` ({name, description, motivation}) | **Which segment this evidences.** Tag the story with the tribe(s) it proves; the customer's `motivation` match or mismatch is the sharpest ICP-fit read. |
| `messagingPillars[]` ({pillar, description}) | **Which pillar the story proves** — anchor the case-study framing and the hero quote to the pillar this win most supports. |
| `tonalAttributes[]` | **The voice.** Write every format in these adjectives verbatim — the story sounds like the brand telling it, not a template. |
| `safeWords[]` / `bannedWords[]` | Prefer `safeWords`; treat `bannedWords` as a hard filter across all four formats — rewrite any line that trips one (customer *quotes* stay verbatim regardless). |
| `formattingConstraints` | Emoji, hashtags, casing, length — obey literally in the social snippets. |

Grounded, the deliverable gains a verdict: the story is tagged to the tribe it evidences, checked against `positioningWedge` (contradiction surfaced, never hidden), framed on the `messagingPillar` it proves, and written in the brand's `tonalAttributes` clear of `bannedWords`. State which fields you used — the pillar, the tribe, and the wedge read — when you deliver.

Only the fields above exist on a public token. There is no competitor, pricing, or platform-fit data in the projection, and no other customer's story is reachable — don't reference or request any of it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the story still ships in its ungrounded form:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Build the story from the step-1 inputs and note the output is ungrounded (and untested against the ICP); connect Jinn to ground it in a real brand.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

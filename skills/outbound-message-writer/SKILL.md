---
name: outbound-message-writer
description: Write cold outbound — cold-email first-touch and follow-up, LinkedIn connection notes and DMs — under hard length ceilings, from prospect facts you supply. Use for short, personalized outreach that leads with the prospect and lands one CTA. Writes only; never sends, scrapes, or invents a detail. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Outbound Message Writer

Deliverable: **ready-to-review outbound copy** — cold-email first-touch, cold-email follow-up, LinkedIn connection note, LinkedIn DM — each under a hard length ceiling, plus a **tool-agnostic CSV column layout** for loading the batch into whatever sender the user runs. It writes; a human reviews and sends elsewhere.

This skill is writing-only: it **never sends and never scrapes.** Every fact about a prospect comes from what the user hands you — no detail, you ask or leave it out. Inventing a prospect's role, company fact, or recent post to make a line land is the one thing this skill must never do.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Collect prospect facts and pick the message type

Fill this from what the user gives you. Blank rows get a question, not a guess.

| Input | Capture |
|-------|---------|
| Prospect name / role / company | exactly as given |
| Prospect's own signal | a post, a quote, a trigger event, a shared connection — their words beat everything |
| What you're offering | the one thing, and the single proof point behind it |
| Segment | if writing to many, the shared trait that defines the group |
| Volume (N) | roughly how many prospects this batch covers — sets the personalization rule (step 3) |
| Message type + ceiling | see the table below |

| Type | Hard ceiling |
|------|--------------|
| LinkedIn connection note | **~280 characters** |
| LinkedIn DM | **~500 characters** |
| Cold email — first touch | **~120 words** |
| Cold email — follow-up | **~80 words** |

The ceilings are hard. If a draft runs over, **rewrite it shorter from scratch — never truncate a finished message.** A chopped message reads as chopped.

### 2. Write to the skeleton

Every message, regardless of type, is three moves:

1. **Hook — prospect-specific.** Open on *them*: their post, their role's real problem, their trigger event. Generic openers ("I came across your profile," "Hope you're well") burn the only attention you get. A hook that's true of anyone is no hook.
2. **Evidence — one proof point.** A single reason to care: one result, one relevant customer, one sharp claim. One, not three — extra proof is length you can't afford.
3. **CTA — single.** One ask, low-friction, answerable in a reply ("Worth a 15-min look next week?"). Two CTAs is zero CTAs; cut to one.

### 3. Match personalization to volume

Personalization has a hierarchy — use the highest tier the facts support:

- **Prospect's own words / posts** (best) — quote or react to something they actually said.
- **Role + company specifics** — a problem their exact title at their exact company feels.
- **Segment-level** (floor) — the shared trait of the group.

Volume sets how far up you can afford to reach: at **small N**, write unique-per-lead from their signal. Above that, write a **segment-level template** with marked merge slots — honest about being a template rather than faking one-to-one at scale.

### 4. Self-check before handing over

- **Under ceiling?** Count it. Over → rewrite shorter, don't trim.
- **One CTA?** Two → cut one.
- **Hook survives the swap test:** would this opener be false if pasted to a different prospect? If it's still true, it isn't personalized — fix it.
- **No invented facts:** every prospect-specific claim traces to something the user gave you.

Then produce the **CSV column layout** — a tool-agnostic header row the user can map into any sender (e.g. `first_name, company, message_type, subject, body, personalization_source, cta`), one row per prospect. **Sending, scheduling, and list handling happen in the user's own tools, after a human reads every message.** State that line explicitly on delivery.

## If a Jinn MCP connection is present (grounded)

The prospect facts still come only from the user — grounding supplies the *brand's* side: what to prove, how it's different, and the voice to say it in. Two calls:

1. `get_token_context` → confirm the token is live and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|------------------|--------|
| `messagingPillars[]` ({pillar, description}) | **The proof point** in the skeleton's evidence line — pull the single claim from the pillar that fits this prospect's pain, not a generic benefit. |
| `positioningWedge` | **The differentiation angle** — how to frame "why us, not the alternative" in one line, from the brand's real wedge (competitor specifics come from the user; none live in the projection). |
| `painPoints` | **Segment angles** — the pains that open messages to a segment; match the sharpest to the prospect's role. |
| `tribes[]` ({name, description, motivation}) | **Who the segment is** — align the template's angle to the tribe's `motivation` when writing at volume. |
| `tonalAttributes[]` | **The voice** — every message in these adjectives verbatim. |
| `safeWords[]` / `bannedWords[]` | Prefer `safeWords`; treat `bannedWords` as a hard filter — rewrite any line that trips one. |

Grounded, the copy changes substance: the evidence line carries a real `messagingPillar`, the differentiation comes from `positioningWedge`, the segment angle from a real `painPoint` aimed at a named `tribe`, all in the brand's `tonalAttributes` and clear of `bannedWords`. State which fields you used — the pillar, the wedge, the pain — when you deliver.

Only the fields above exist on a public token. No competitor data, no pricing, no other brand's material, and **nothing about the prospect** in the projection — the prospect side is always the user's to supply. Don't reference or request anything beyond these fields.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the copy still ships in its ungrounded form:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"outbound-message-writer"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"outbound-message-writer"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Write from the step-1 facts and note the copy is ungrounded; connect Jinn to ground the proof point, differentiation, and voice in a real brand.

## What just became possible

You can now turn prospect facts you already have into ready-to-review cold email and LinkedIn outreach — each under a hard length ceiling, built from one hook, one proof point, one ask — and never an invented detail about the prospect. It writes; you still review and send it yourself. Runs standalone, no account needed.

## Try this now

1. **Write a first-touch cold email** — `Write a cold email first-touch to Priya, VP of Ops at a 200-person logistics company, who posted last week about hating manual invoice reconciliation. We offer automated reconciliation software, proof point is we cut reconciliation time in half for a similar client` → one email under the word ceiling, hook from her post, one proof point, one CTA.
2. **Write a LinkedIn connection note under the ceiling** — `Write a LinkedIn connection note to a freelance agency founder who just posted about switching project-management tools` → a short note opening on that specific post, under the character ceiling.
3. **Get the batch-ready CSV layout** — `Write outbound messages for these three prospects and give me a CSV I can load into my sender: Priya (VP Ops, logistics co, posted about manual reconciliation), Sam (founder, design agency, hiring for ops), Lee (ops lead, retailer, just raised a round)` → per-prospect messages plus a tool-agnostic CSV column layout.
4. **Connected: ground the proof point in the brand's real pillars** *(requires a Jinn token)* — `Write this outbound copy using our actual messaging pillars and wedge` → the same messages with the evidence line pulled from a real pillar and the differentiation from the brand's actual wedge.

## Compounds with

- `linkedin-content` — same brand voice, aimed at the public feed instead of a DM inbox.
- `messaging-ab-tester` — test which hook or proof point actually earns replies instead of guessing.
- `offer-angle-generator` — source the proof point this skill's evidence line needs.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

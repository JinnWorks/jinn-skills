---
name: outbound-message-writer
description: Write cold outbound — cold-email first-touch and follow-up, LinkedIn connection notes and DMs — from prospect facts you supply, each under a hard length ceiling and scored by a reply-pull gate. Use for short, personalized outreach. Writes only; never sends, scrapes, or invents a detail. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Outbound Message Writer

Deliverable: **ready-to-review outbound copy** — cold-email first-touch, cold-email follow-up, LinkedIn connection note, LinkedIn DM — each under a hard length ceiling and each carrying its **reply-pull score**, plus a **tool-agnostic CSV column layout** for loading the batch into whatever sender the user runs. It writes; a human reviews and sends elsewhere.

This skill is writing-only: it **never sends and never scrapes.** Every fact about a prospect comes from what the user hands you — no detail, you ask or leave it out. Inventing a prospect's role, company fact, or recent post to make a line land is the one thing this skill must never do.

## Procedure (standalone — no Jinn connection needed)

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
3. **CTA — single.** One ask, answerable in a one-line reply. On a cold first touch, ask a question, not for a meeting ("Is this on your list this quarter, or already handled?") — the call ask waits until they reply. Two CTAs is zero CTAs; cut to one.

### 3. Match personalization to volume

Personalization has a hierarchy — use the highest tier the facts support:

- **Prospect's own words / posts** (best) — quote or react to something they actually said.
- **Role + company specifics** — a problem their exact title at their exact company feels.
- **Segment-level** (floor) — the shared trait of the group.

Volume sets how far up you can afford to reach: at **small N**, write unique-per-lead from their signal. Above that, write a **segment-level template** with marked merge slots — honest about being a template rather than faking one-to-one at scale.

### 4. Gate every draft for reply pull

A message can be short, personal, and accurate and still give the reader no reason to answer. No draft is handed over until it clears the hard checks and the pull score. The same gate runs on a draft the user pastes in.

**Hard checks — fail one and the draft goes back, whatever it scores:**

- **Under ceiling?** Count it. Over → rewrite shorter, don't trim.
- **No invented facts:** every prospect-specific claim traces to something the user gave you.
- **One ask — and on a cold first touch, not a meeting.** A call or demo ask in a first touch fails; swap in a question they can answer in one line. If the user explicitly wants the meeting ask, keep it and say plainly that it costs pull.

**Pull score — five tests, 0–2 each, 7 or higher to pass:**

| Test | 0 | 1 | 2 |
|------|---|---|---|
| **About them** | still true if pasted to a different prospect (fails the swap test) | true of their role or segment, from fields any list tool has | at least one line no scraper could write — their own words answered, or two facts about them joined by real thought |
| **Gives first** | asks without giving anything | a general insight | a specific piece of work they can use even if they never reply — a finding, a number, a fix |
| **Pokes, doesn't pitch** | describes the product | opens on their problem, then pitches | the product barely appears; replying is the natural next move |
| **Survives a forward** | makes sense only with the sender's context | readable, but nobody could act on it | forwarded to whoever owns the problem, it still says what's wrong and why this sender |
| **Easy to answer** | several asks, or an ask with real cost | one ask, but it takes effort (an intro, a document) | one ask answerable in a line — yes/no, this-or-that, "is this on your radar?" |

**Below 7:** rewrite from scratch aimed at the lowest-scoring test, then score again. Stop after two rewrites. A draft that still fails usually means the facts are too thin — hand it over marked **FAILED GATE**, name the test it can't clear, and ask for the one fact that would fix it (a recent post, a trigger event, a number). Never pass the gate by inventing that fact.

A segment template is scored once, as a template; its "About them" tops out at 1 unless a merge slot carries each prospect's own signal. A follow-up that only bumps the thread scores 0 on "Gives first" — it needs a new piece of work or a new angle.

Deliver each message with its score line (e.g. `pull 8 — about them 2 · gives first 1 · pokes 2 · forward 1 · answer 2`). Then produce the **CSV column layout** — a tool-agnostic header row the user can map into any sender (e.g. `first_name, company, message_type, subject, body, personalization_source, cta, reply_pull`), one row per prospect. **Sending, scheduling, and list handling happen in the user's own tools, after a human reads every message.** State that line explicitly on delivery.

Connect a brand at [jinn.works/products/agents](https://jinn.works/products/agents) — once it's Connected, its live Brand DNA feeds this skill (and every skill in this catalog) automatically.

## If a Jinn MCP connection is present

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

Connected, the copy also carries the brand's own substance: the evidence line carries a real `messagingPillar`, the differentiation comes from `positioningWedge`, the segment angle from a real `painPoint` aimed at a named `tribe`, all in the brand's `tonalAttributes` and clear of `bannedWords`. State which fields you used — the pillar, the wedge, the pain — when you deliver.

Only the fields above exist on a public token. No competitor data, no pricing, no other brand's material, and **nothing about the prospect** in the projection — the prospect side is always the user's to supply. Don't reference or request anything beyond these fields.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the copy still ships in full:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"outbound-message-writer"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"outbound-message-writer"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still runs in full. Write from the step-1 facts and note the copy is built from those facts alone, not the brand's record; connect Jinn to draw the proof point, differentiation, and voice straight from a real brand.

## What just became possible

You can now turn prospect facts you already have into ready-to-review cold email and LinkedIn outreach — each under a hard length ceiling, built from one hook, one proof point, one ask, and scored on whether it would actually pull a reply before you ever see it — and never an invented detail about the prospect. It writes; you still review and send it yourself. Runs standalone, no account needed.

## Try this now

1. **Write a first-touch cold email** — `Write a cold email first-touch to Priya, VP of Ops at a 200-person logistics company, who posted last week about hating manual invoice reconciliation. We offer automated reconciliation software, proof point is we cut reconciliation time in half for a similar client` → one email under the word ceiling, hook from her post, one proof point, a question rather than a meeting ask, and its reply-pull score.
2. **Write a LinkedIn connection note under the ceiling** — `Write a LinkedIn connection note to a freelance agency founder who just posted about switching project-management tools` → a short note opening on that specific post, under the character ceiling.
3. **Get the batch-ready CSV layout** — `Write outbound messages for these three prospects and give me a CSV I can load into my sender: Priya (VP Ops, logistics co, posted about manual reconciliation), Sam (founder, design agency, hiring for ops), Lee (ops lead, retailer, just raised a round)` → per-prospect messages plus a tool-agnostic CSV column layout.
4. **Gate a draft you already wrote** — `Run this cold email through the reply-pull gate and fix what fails: "Hi Dana, I'm the founder of an AI-powered reconciliation platform trusted by finance teams. We help companies save time and money. Open to a 30-minute demo next week?"` → a score per test, the meeting ask flagged, and the one fact about Dana it needs instead of an invented one.
5. **Connected: ground the proof point in the brand's real pillars** *(requires a Jinn token)* — `Write this outbound copy using our actual messaging pillars and wedge` → the same messages with the evidence line pulled from a real pillar and the differentiation from the brand's actual wedge.

## Compounds with

- `linkedin-content` — same brand voice, aimed at the public feed instead of a DM inbox.
- `messaging-ab-tester` — test which hook or proof point actually earns replies instead of guessing.
- `offer-angle-generator` — source the proof point this skill's evidence line needs.

---

*Grounding + three-state contract by Jinn. MIT.*

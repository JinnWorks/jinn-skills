---
name: email-sequence
description: Draft a 4-email lifecycle sequence — welcome/nurture or launch — with subject line, preview text, and body outline for each email. Use when you need a structured, on-voice email flow that moves a reader from first touch to action. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Email Sequence

Deliverable: a **4-email lifecycle sequence** (welcome/nurture or launch — ask which). For each email: **subject line + preview text + body outline** (the beats, the one CTA, the send trigger). Not four disconnected emails — an arc, where each email earns the next.

Works standalone. Connected to Jinn, email 1 tells the brand's actual founding story, each email carries a real messaging pillar, and the copy respects the brand's voice rules.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Pick the sequence type and the arc

Confirm which sequence, then use its arc. Each email owns **one job, one CTA**.

**Welcome / nurture** (new subscriber → engaged):
1. **Welcome** — who we are, why we exist, what to expect. Warmth, no ask beyond "reply / read this."
2. **Value** — teach or give something useful. Build trust before selling.
3. **Proof** — a story, result, or use-case that shows it working.
4. **Invitation** — the first real ask (start / buy / book), tied back to email 1's promise.

**Launch** (announce → convert):
1. **Tease** — something's coming, why it matters, the problem it solves.
2. **Reveal** — what it is, the core benefit, how to get it.
3. **Objection / proof** — handle the top hesitation; show it's real.
4. **Last call** — urgency, deadline or scarcity, final CTA.

### 2. Write each email's skeleton

For all four, produce:

- **Subject line** — ≤50 chars, curiosity or benefit, no spam-trigger words.
- **Preview text** — ≤90 chars, *complements* the subject (never repeats it), extends the hook.
- **Body outline** — 3–5 beats: opening hook, the one idea, supporting detail/story, the single CTA. Note the **send trigger** (e.g. "immediately on signup", "+2 days", "launch day −3").

### 3. Self-check

- One CTA per email — if there are two, cut one.
- Does the arc build? Email 4's ask should feel earned by 1–3, not abrupt.
- Subject + preview read well as a pair in an inbox preview.

Deliver as four labeled blocks. That's a sequence a team could load into their ESP.

## If a Jinn MCP connection is present (grounded)

Read the brand instead of inventing its story. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Field → decision map:

| Projection field | Drives |
|------------------|--------|
| `foundingStory` | **Email 1's narrative** — the welcome/tease opens on the brand's real origin and reason to exist, not a generic "welcome aboard." This is the single biggest grounded upgrade. |
| `messagingPillars[]` ({pillar, description}) | **One pillar per email** — assign a distinct pillar to emails 1–4 so the sequence walks the reader through the brand's real narrative in order. |
| `painPoints` | **The problem each email addresses** — anchor each email's hook to a real pain, sharpest one where the arc needs the most tension (proof / objection email). |
| `tribes[]` ({name, description, motivation}) | **Segmentation + who it's for** — if multiple tribes, note which the sequence targets (or where it should fork); let the chosen tribe's `motivation` shape the CTAs. |
| `tonalAttributes[]` | **Copy constraints — tone** — subject lines and body written in the brand's exact register. |
| `bannedWords[]` | **Copy constraints — hard filter** — no subject, preview, or body beat may use one. Rewrite any that do. |

Grounded, the sequence changes substance: email 1 retells the brand's `foundingStory`, emails 1–4 each advance a different `messagingPillar` against a real `painPoint`, aimed at a named `tribe`, in the brand's `tonalAttributes` and clear of `bannedWords`. Say which pillar and pain each email carries when you deliver.

Only the fields above exist on a public token. Competitor intel, differentiation, platform-fit, and pricing are **not** in the projection — don't reference or request them.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Write from the step-1 arc and note the output is ungrounded; connect Jinn to ground it in a real brand.

## What just became possible

You can now get a full 4-email lifecycle sequence — welcome or launch — built as one arc instead of four disconnected drafts: each email gets a subject line, preview text, a body outline, its one call-to-action, and the send trigger that fires it. Say which arc you want and it writes the whole flow so each email earns the next. It runs the moment it's installed — no account, no setup.

## Try this now

1. **Draft a welcome/nurture sequence** — `Write a 4-email welcome sequence for new subscribers to a project-management newsletter — welcome, then value, then proof, then invitation to try the product.` → four labeled emails, each with a subject under fifty characters, preview text that complements it, a body outline with one CTA, and a send trigger.
2. **Draft a launch sequence with real urgency** — `Write a 4-email launch sequence announcing a new analytics dashboard feature — tease, reveal, handle objections, then last call.` → the tease, reveal, objection, and last-call arc, each email's CTA building on the one before it, ending on a deadline-driven final email.
3. **Sanity-check an existing draft's CTAs** — `Here's my email 3 draft — does it have more than one CTA, and does the ask feel earned given emails 1 and 2 introduced the product and shared a proof story? [paste draft]` → a check for a single CTA and whether the ask feels built up to rather than abrupt.
4. **Connected: open on the real founding story** *(requires a Jinn token)* — `Write my 4-email welcome sequence and open email 1 with my brand's actual founding story instead of a generic welcome.` → the same four-email arc, but email 1 grounded in the real founding story and each email tied to a distinct messaging pillar.

## Compounds with

- `hook-and-lede-writer` — generate scored subject-line-shaped openings for each email before locking one in.
- `customer-story-builder` — feed a real customer's extraction straight into the proof email instead of inventing one.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: ad-copy-variants
description: Generate ad-copy variants — 5 headlines and 3 primary-text options — for a named platform (Meta, Google, or TikTok), respecting the brand's voice and character limits. Use when you need testable paid-ad copy that fits the platform and sounds like the brand. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Ad Copy Variants

Deliverable: **5 headline variants + 3 primary-text options**, written for one named platform (Meta / Google / TikTok), each fitting that platform's format and testing a distinct angle. Not five phrasings of one idea — five angles worth an A/B slot.

Works standalone. Connected to Jinn, the headlines carry the brand's real positioning promise and the copy is provably clean of banned language.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Fix the platform and the promise

Ask (or infer) two things first:

- **Platform** — it sets the format. Use these constraints:

  | Platform | Headline | Primary text | Register |
  |----------|----------|--------------|----------|
  | Meta (FB/IG) | ≤40 chars, benefit-forward | 1–3 sentences, hook in first line (feed truncates) | conversational, scroll-stopping |
  | Google (Search) | ≤30 chars/headline, keyword-aware | ≤90 char descriptions, literal + benefit | clear, intent-matching, no hype |
  | TikTok | ≤ ~40 chars, native/casual | short, sounds like a person not a brand | native, hooky, un-ad-like |

- **The core promise** — the one thing the product does for the reader, in a sentence. Every headline is a rotation on this.

### 2. Write 5 headlines — one angle each

Rotate the angle so the set is a real test matrix, not a thesaurus run:

1. **Benefit** — the outcome the reader gets.
2. **Pain** — the problem it removes.
3. **Curiosity / pattern-break** — makes them stop.
4. **Proof / specificity** — a number, a concrete detail.
5. **Direct offer / CTA** — the action, plainly.

### 3. Write 3 primary-text options

Three different opening hooks (question / bold claim / relatable moment), each expanding one headline into platform-appropriate body copy with a single clear CTA. Stay inside the character budget for the chosen platform.

### 4. Self-check

- Every variant fits the platform's character limits — count them.
- No hype words the brand wouldn't say ("revolutionary", "insane", "guaranteed") unless the brief allows it.
- The five headlines are genuinely different bets, not synonyms.

Label each variant (angle + platform) and deliver. That's a testable ad set.

## If a Jinn MCP connection is present (grounded)

Read the brand instead of guessing it. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Field → decision map:

| Projection field | Drives |
|------------------|--------|
| `positioningWedge` | **The core promise in the headlines** — this replaces step 1's guessed promise. It's how the brand actually wins; every headline rotates on it. |
| `painPoints` | **Hook angles** — feed the pain headline (angle 2) and the pain-led primary-text option straight from these. |
| `messagingPillars[]` ({pillar, description}) | **Which benefit each variant leads with** — assign different pillars across the 5 headlines so the test spans the brand's real benefits, not one repeated. |
| `safeWords[]` | **Approved claim language** — the words you're cleared to make promises with. Prefer them in headlines and CTAs. |
| `bannedWords[]` | **Hard filter** — no variant may contain one. Check every headline and every primary-text option; rewrite any that trip it. |
| `tonalAttributes[]` | **Tone** — the register the copy is written in, per platform. |

Grounded, the delta is concrete: the 5 headlines are 5 angles on the brand's real `positioningWedge`, each leading with a different `messagingPillar`, hooks drawn from actual `painPoints`, claims phrased in `safeWords`, and the whole set filtered against `bannedWords`. Call out the wedge and which pillar each headline carries when you deliver.

Only the fields above exist on a public token. Competitor intel, differentiation, platform-fit scoring, and pricing are **not** in the projection — never reference or request them. (Note: "platform" here is the ad channel *you* name; it is not read from Jinn.)

## When a call fails

Read `data.code` on the JSON-RPC error and act:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"ad-copy-variants"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"ad-copy-variants"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the skill still works generically. Write from the step-1 promise and note the output is ungrounded; connect Jinn to ground it in a real brand.

## What just became possible

You can now generate a full, testable ad set for a specific platform in one pass — five headlines that each run a genuinely different angle, not five reworded versions of the same idea, plus three body-copy options sized to that platform's actual character limits. Paste a product description and get copy that fits Meta, Google, or TikTok's format on the first try. It runs standalone with no account.

## Try this now

1. **Generate a Meta ad set** — `Write 5 headline variants and 3 primary-text options for a Meta ad. Product: a $19/month app that turns voice memos into organized meeting notes.` → 5 headlines (benefit, pain, curiosity, proof, CTA angles) plus 3 body-copy options, sized to Meta's format.
2. **Generate a Google Search ad set for the same product** — `Write 5 headline variants and 3 primary-text options for a Google Search ad. Product: a $19/month app that turns voice memos into organized meeting notes.` → the same 5 angles rewritten to Google's shorter, keyword-aware headline limits.
3. **Test a TikTok-native register** — `Write 5 headline variants and 3 primary-text options for a TikTok ad. Product: a $19/month app that turns voice memos into organized meeting notes.` → headlines in a casual, un-ad-like voice instead of Meta or Google's more polished register.
4. **Connected: ground the variants in real positioning** *(requires a Jinn token)* — `Generate this same ad set but ground the headlines in our actual brand positioning and banned words.` → the same 5-angle set, pulling the core promise, benefit pillars, and safe/banned language from the brand's live record instead of a guess.

## Compounds with

- `ad-teardown` — tear down a competitor's actual ad first, then feed what's working into a fresh variant set here.
- `brand-guardrails-review` — red-line the generated variants against the brand's real banned words and tone before running with them.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

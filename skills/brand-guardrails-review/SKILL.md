---
name: brand-guardrails-review
description: Red-line a piece of copy against a brand's voice and strategy — flag banned-word violations, off-tone lines, and off-strategy claims, each with a suggested rewrite. Use when someone pastes a draft (post, ad, email, landing page) and wants it checked before it ships.
---

# Brand Guardrails Review

Produces a **red-line review**: the user pastes copy, and you return a line-by-line markup of what breaks the brand's rules and how to fix each one. Three lenses, in order of severity — **banned words** (hard red-line), **tone** (off-voice), **strategy** (off-message). Every flag ships with a rewrite; a review that only says "this is wrong" makes more work, not less.

Works with no Jinn connection using whatever voice rules the user gives you. Connected to a brand's Jinn Brand DNA, the red-lines are the brand's *actual* banned words, tonal attributes, and messaging pillars — not a generic style guide. See **If a Jinn MCP connection is present**.

## The deliverable

```
GUARDRAILS REVIEW — <what was reviewed>

Verdict:  SHIP / SHIP WITH FIXES / REWORK
Red-lines (must fix):   banned words, off-strategy claims
Flags (should fix):     off-tone lines, format/slang issues
Clean:                  what's already on-brand (say so — don't only criticize)

Per issue:
  › "<the offending line, quoted exactly>"
    Problem: <banned-word | off-tone | off-strategy | format>
    Fix:     "<suggested rewrite that keeps the intent, on-brand>"
```

## Procedure (works with no connection)

If the user hasn't given you the brand's rules, ask for them (banned words, tone, key messages) or work from the strongest general standard you can, and say which you used. Then pass the copy through three lenses.

### Lens 1 — Banned words (hard red-line)

Scan for any word or phrase the brand forbids. These are non-negotiable: one banned word ships a broken brand promise regardless of how good the rest is. Quote each occurrence exactly, and rewrite the line to carry the same meaning without it. Match case-insensitively but flag the real casing. This lens alone can drop the verdict to REWORK.

### Lens 2 — Tone (off-voice)

Read each line against the brand's tonal attributes. Flag lines that are the *right meaning in the wrong voice* — too stiff for a playful brand, too jokey for an authoritative one, hedging where the brand is direct. Also catch format and slang breaks here: wrong casing conventions, emoji where they're not allowed, slang that violates the brand's policy. Rewrite to the target tone, preserving the point.

### Lens 3 — Strategy (off-message)

The subtlest lens. Flag claims that are *on-voice but off-strategy*: they contradict the brand's positioning, lean on the brand enemy's frame, promise something outside the messaging pillars, or dilute the wedge. These are the dangerous ones — they read fine and quietly move the brand off its position. Explain what strategic line each crosses, and rewrite to pull it back onto pillar.

### Assemble the verdict

- **Any banned word or off-strategy claim** → at least SHIP WITH FIXES; multiple, or a core-message contradiction → REWORK.
- **Only tone/format flags** → SHIP WITH FIXES.
- **Nothing flagged** → SHIP.

List what's already clean, too — the writer needs to know what to keep, not just what to change. Preserve lines that work; don't rewrite for the sake of it.

## If a Jinn MCP connection is present

Ground every lens in the brand's real rules instead of asking for them.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`). Match the user's named brand, or use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Run the three lenses against the projection:

| Lens | Projection field(s) | How to apply it |
|------|--------------------|-----------------|
| Banned words (red-line) | `bannedWords` (array) | The hard list. Any match is a must-fix, case-insensitive. |
| Approved vocabulary | `safeWords` (array) | Prefer these in rewrites; they're the brand's sanctioned language. |
| Tone | `tonalAttributes` (array) | Judge each line against these; off-voice lines get flagged and rewritten to match. |
| Format & slang | `slangPolicy`, `formattingConstraints` | Enforce casing, emoji, punctuation, and slang rules exactly as specified. |
| Off-strategy claims | `positioningWedge`, `messagingPillars` (array of `{pillar, description}`), `brandEnemy` | Flag claims that contradict the wedge, fall outside the pillars, or adopt the enemy's framing. |
| Identity sanity | `mission`, `coreValues`, `archetype` | Use as the backstop when a line "feels off" but doesn't trip a specific rule. |

Now the red-lines are the brand's own — `bannedWords` are literally banned, the pillars define what's on-strategy, and rewrites draw from `safeWords`. Note the review is grounded on `<brandName>`.

**Off-strategy detection uses only projection data.** There's no competitor intel in the projection, and you don't need it: a claim is off-strategy when it fights the brand's own `positioningWedge`/`messagingPillars`/`brandEnemy`, not when it compares poorly to a rival. Don't reach for hidden gateway fields — they aren't served (`not_found`).

## When a grounding call fails

Read `data.code` on the JSON-RPC error and act — the review still runs in its ungrounded form against the user's stated rules:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-guardrails-review"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh demo token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-guardrails-review"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your client likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI header form: `claude mcp add --transport http jinn https://app.jinn.works/api/mcp --header "Authorization: Bearer <token>"`.
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it lists.
- **No token / no connection** → this skill works generically against whatever rules the user provides; connect to Jinn to red-line against the brand's real banned words, tone, and pillars.

## What just became possible

You can now paste a piece of draft copy — a post, an ad, an email — and get back a red-line review against a brand's actual rules: every banned word flagged, every off-tone line called out, every off-strategy claim caught, each one with a suggested rewrite instead of just a complaint. Runs standalone against whatever voice rules you hand it, no account required.

## Try this now

1. **Red-line a draft against stated rules** — `Review this ad copy against our brand rules — banned words: "revolutionary," "game-changing"; tone: warm and direct, no hype. Copy: "Our revolutionary platform is a total game-changer for teams who hate slow software."` → a SHIP WITH FIXES verdict, both banned words quoted and rewritten, nothing else flagged.
2. **Catch an off-strategy claim that reads fine on the surface** — `Our positioning is "the simple alternative to bloated enterprise tools." Review this line: "New: now with dozens of configurable modules and a full admin console for total customization."` → a REWORK flag on the strategy lens, explaining the line quietly argues the opposite of the brand's simplicity wedge.
3. **Check tone against a stated voice** — `Our brand voice is playful and casual, never corporate. Review this: "Per our records, users are advised to update their payment information at their earliest convenience."` → a tone flag on the stiff, corporate phrasing with a casual rewrite that keeps the same request.
4. **Connected: red-line against the brand's real rules** *(requires a Jinn token)* — `Review this copy against our brand's actual banned words and tone instead of the rules I just typed out.` → the same red-line review, but every flag traces to the brand's real rules instead of user-supplied ones.

## Compounds with

- `brand-voice-checker` — that scores whether copy reads human at all; this red-lines it against one specific brand's actual rules.
- `ad-copy-variants` — run new ad variants through this before shipping any of them.
- `claim-provenance-checker` — this catches off-strategy claims; that checks whether a specific factual claim can be evidenced.

---
*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: brand-guardrails-review
description: Red-line a piece of copy against a brand's voice and strategy — flag banned-word violations, off-tone lines, and off-strategy claims, each with a suggested rewrite. Use when someone pastes a draft (post, ad, email, landing page) and wants it checked before it ships. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Brand Guardrails Review

Produces a **red-line review**: the user pastes copy, and you return a line-by-line markup of what breaks the brand's rules and how to fix each one. A mechanical first pass for **unrendered template tokens**, then three lenses in order of severity — **banned words** (hard red-line), **tone** (off-voice), **strategy** (off-message) — and a last **required-disclosures** pass that checks legal text is present without ever rewriting it. Every flag ships with a rewrite; a review that only says "this is wrong" makes more work, not less.

Works standalone against whatever voice rules the user gives you — a complete red-line review either way. Connected to a brand's Jinn Brand DNA, the red-lines are the brand's *actual* banned words, tonal attributes, and messaging pillars, straight from its own record. See **If a Jinn MCP connection is present**.

Connect a brand at [jinn.works/products/agents](https://jinn.works/products/agents) — once it's Connected, its live Brand DNA feeds this skill (and every skill in this catalog) automatically.

## The deliverable

```
GUARDRAILS REVIEW — <what was reviewed>
Input:    template / rendered message (and how you know)

Verdict:  SHIP / SHIP WITH FIXES / REWORK
Red-lines (must fix):   unrendered template tokens, banned words, off-strategy claims
Flags (should fix):     off-tone lines, format/slang issues
Template tokens:        templates only — each token listed, not a failure
Required disclosures:   legal text found (quoted verbatim, untouched) and any that look missing
Clean:                  what's already on-brand (say so — don't only criticize)

Per issue:
  › "<the offending line, quoted exactly>"
    Problem: <template-token | banned-word | off-tone | off-strategy | format>
    Fix:     "<suggested rewrite that keeps the intent, on-brand>"
```

## Procedure (standalone — no Jinn connection needed)

If the user hasn't given you the brand's rules, ask for them (banned words, tone, key messages) or work from the strongest general standard you can, and say which you used. Then settle two things before any lens runs.

### Before the lenses — template or rendered, and what's legal text

1. **Ask: is this a template or the rendered message?** A template is copy your email, SMS or ad tool fills in at send time, so merge tags in it are expected. A rendered message is what the recipient will see. If the user calls it final, send-ready or a proof, or pastes a screenshot of a send, treat it as rendered. If you can't tell and can't ask, treat it as rendered and say so in the `Input:` line; a false alarm costs a minute, a shipped `{{ first_name }}` costs the send.
2. **Set aside required legal text.** Mark any line that exists because law or a platform requires it: the FDA dietary-supplement statement ("These statements have not been evaluated by the Food and Drug Administration…"), "#ad" or other FTC material-connection disclosures, "Results may vary", "Terms apply", an email's unsubscribe line and postal address, safety or dosage warnings. Quote it verbatim under **Required disclosures**. Lenses 1–3 skip it; Lens 4 checks only that it's there.

### Lens 0 — Unrendered template tokens (mechanical red-line)

Scan for template syntax left in the copy: `{{ x }}` (including filters like `{{ first_name|default:"there" }}`), `{% … %}`, `{x}`, `%x%` and `%%x%%`, `*|X|*`, and bracket placeholders like `[First Name]` or `[INSERT …]` (a bracketed button label like `[Shop now]` is not one). Quote each token exactly as it appears.

- **Rendered message:** every token is a `template-token` red-line. The recipient would see raw syntax, so the fix is the text it should have become ("Hi {{ first_name }}," → "Hi Sam," or the fallback, "Hi there,") plus a note to fix the merge before it sends. One token is enough for REWORK.
- **Template:** list each token under **Template tokens** with what it fills in and whether it has a fallback (`|default:"there"` does; a bare `{{ first_name }}` would render "Hi ," for a contact with no name, so say so). These aren't failures and don't move the verdict. Run the other lenses on the surrounding copy and on any fallback text, since that text ships too.

### Lens 1 — Banned words (hard red-line)

Scan for any word or phrase the brand forbids. These are non-negotiable: one banned word ships a broken brand promise regardless of how good the rest is. Quote each occurrence exactly, and rewrite the line to carry the same meaning without it. Match case-insensitively but flag the real casing. This lens alone can drop the verdict to REWORK. Skip the required legal text you set aside: "cure" in the FDA statement, or "Drug" in the agency's name, is not a violation and gets no rewrite.

### Lens 2 — Tone (off-voice)

Read each line against the brand's tonal attributes. Flag lines that are the *right meaning in the wrong voice* — too stiff for a playful brand, too jokey for an authoritative one, hedging where the brand is direct. Also catch format and slang breaks here: wrong casing conventions, emoji where they're not allowed, slang that violates the brand's policy. Rewrite to the target tone, preserving the point.

### Lens 3 — Strategy (off-message)

The subtlest lens. Flag claims that are *on-voice but off-strategy*: they contradict the brand's positioning, lean on the brand enemy's frame, promise something outside the messaging pillars, or dilute the wedge. These are the dangerous ones — they read fine and quietly move the brand off its position. Explain what strategic line each crosses, and rewrite to pull it back onto pillar.

### Lens 4 — Required disclosures (presence, never voice)

Check the legal text you set aside for presence only. Report each one found, quoted verbatim, and never rewrite it for tone, banned words or brand style; its wording is fixed by whoever requires it. If the copy seems to need a disclosure it doesn't carry (a supplement benefit claim with no FDA statement, a paid endorsement with no "#ad", a marketing email with no unsubscribe line), flag it as missing and say which claim calls for it. You check presence, not legal sufficiency; say so when it matters, and point legal questions at the brand's counsel.

### Assemble the verdict

- **Any `template-token` red-line (rendered message)** → REWORK, whatever else the review finds. Tokens listed on a template don't count here.
- **Any banned word or off-strategy claim** → at least SHIP WITH FIXES; multiple, or a core-message contradiction → REWORK. Words inside required legal text never count.
- **A required disclosure that looks missing** → at least SHIP WITH FIXES.
- **Only tone/format flags** → SHIP WITH FIXES.
- **Nothing flagged** → SHIP.

List what's already clean, too — the writer needs to know what to keep, not just what to change. Preserve lines that work; don't rewrite for the sake of it.

## If a Jinn MCP connection is present

Ground every lens in the brand's real rules — no need to ask for them.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`). Match the user's named brand, or use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Run the lenses against the projection. Lens 0 needs no brand data, and required legal text stays exempt from every row below:

| Lens | Projection field(s) | How to apply it |
|------|--------------------|-----------------|
| Banned words (red-line) | `bannedWords` (array) | The hard list. Any match is a must-fix, case-insensitive. |
| Approved vocabulary | `safeWords` (array) | Prefer these in rewrites; they're the brand's sanctioned language. |
| Tone | `tonalAttributes` (array) | Judge each line against these; off-voice lines get flagged and rewritten to match. |
| Format & slang | `slangPolicy`, `formattingConstraints` | Enforce casing, emoji, punctuation, and slang rules exactly as specified. |
| Off-strategy claims | `positioningWedge`, `messagingPillars` (array of `{pillar, description}`), `brandEnemy` | Flag claims that contradict the wedge, fall outside the pillars, or adopt the enemy's framing. |
| Identity sanity | `mission`, `coreValues`, `archetype` | Use as the backstop when a line "feels off" but doesn't trip a specific rule. |
| Required disclosures | `formattingConstraints` | If it names required legal text, Lens 4 checks the copy carries it. Presence only; never rewrite it. |

Now the red-lines are the brand's own — `bannedWords` are literally banned, the pillars define what's on-strategy, and rewrites draw from `safeWords`. Note the review is grounded on `<brandName>`.

**Off-strategy detection uses only projection data.** There's no competitor intel in the projection, and you don't need it: a claim is off-strategy when it fights the brand's own `positioningWedge`/`messagingPillars`/`brandEnemy`, not when it compares poorly to a rival. Don't reach for hidden gateway fields — they aren't served (`not_found`).

**Factual claims — one `ask_brand` question per claim (Connected and up).** If `ask_brand` appears in `tools/list` (Connected tier and up; a demo token doesn't list it), check each factual claim in the copy (an ingredient, a certification, a number, an origin story) against the brand's record. If it isn't listed, skip this; the lenses above are the full review for your token.

1. **Tell the user first:** "The brand owner can see the questions asked." `ask_brand` logs each question verbatim against the brand, so put nothing in a question you wouldn't want the brand owner to read; that includes unpublished draft copy.
2. **One question per claim, ideally naming the field.** Name the field the claim would live in ("What is the founding story?", "What are the key ingredients?", "What are the certifications and claims?") and include the claim's key word ("Are the key ingredients ginger and B6?"). Retrieval is word matching, no model: your words match the record's field names, a few fixed synonyms ("customer" reaches the tribes, "against" the brand enemy), and words that appear inside a field's value. Naming the field still gives the surest hit; the claim's own word can now hit the field that holds it.
3. **Read the result.**
   - `matched_facts[]` (`{ key, source, matched_terms, value }`): read the `value` yourself. It supports the claim → mark it clean, citing `key` and `source`. It contradicts the claim → a red-line under the strategy lens (off-record claim), with a rewrite that says what the record says. A match means the record holds that field, or the word appears somewhere in it, not that it agrees: "ginger" matching inside a value that says "no ginger" is a contradiction.
   - `coverage.gaps` and `gap_terms`: `gap_terms` lists the same gaps in the words you typed, in the same order (`gaps` holds their normalized forms). When the claim's substance lands here, flag it **"the record can't confirm this"** with a rewrite that drops or softens the claim; never present it as confirmed. Filler words no longer land in gaps; the brand's own name still can, so ignore that one.
4. On the Brand plan the same questions also match the full DNA and per-product fields, so product and ingredient claims become checkable against the record.

## When a grounding call fails

Read `data.code` on the JSON-RPC error and act — the review still runs in full against the user's stated rules:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-guardrails-review"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh demo token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-guardrails-review"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your client likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI header form: `claude mcp add --transport http jinn https://app.jinn.works/api/mcp --header "Authorization: Bearer <token>"`.
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it lists.
- **`ask_brand` not in `tools/list`** → expected on a demo token, or where the brand's question tool is switched off. Skip the factual-claims step; the lenses run on the projection.
- **No token / no connection** → this skill still runs in full against whatever rules the user provides; connect to Jinn to red-line against the brand's own banned words, tone, and pillars as well.

## What just became possible

You can now paste a piece of draft copy — a post, an ad, an email — and get back a red-line review against a brand's actual rules: every banned word flagged, every off-tone line called out, every off-strategy claim caught, each one with a suggested rewrite instead of just a complaint. It also catches a `{{ first_name }}` left in a send-ready email, and it leaves required legal text like the FDA statement exactly as written. Runs standalone against whatever voice rules you hand it, no account required.

## Try this now

1. **Red-line a draft against stated rules** — `Review this ad copy against our brand rules — banned words: "revolutionary," "game-changing"; tone: warm and direct, no hype. Copy: "Our revolutionary platform is a total game-changer for teams who hate slow software."` → a SHIP WITH FIXES verdict, both banned words quoted and rewritten, nothing else flagged.
2. **Catch an off-strategy claim that reads fine on the surface** — `Our positioning is "the simple alternative to bloated enterprise tools." Review this line: "New: now with dozens of configurable modules and a full admin console for total customization."` → a REWORK flag on the strategy lens, explaining the line quietly argues the opposite of the brand's simplicity wedge.
3. **Check tone against a stated voice** — `Our brand voice is playful and casual, never corporate. Review this: "Per our records, users are advised to update their payment information at their earliest convenience."` → a tone flag on the stiff, corporate phrasing with a casual rewrite that keeps the same request.
4. **Catch a merge tag before it sends, and leave the legal line alone** — `This email is final and goes out tomorrow. Banned words: "cure". Copy: "Hi {{ first_name }}, our ginger blend helps settle morning nausea. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."` → REWORK with a `template-token` red-line on `{{ first_name }}`, and the FDA statement listed under Required disclosures word for word, with no banned-word flag on "cure".
5. **Connected: red-line against the brand's real rules** *(requires a Jinn token)* — `Review this copy against our brand's actual banned words and tone instead of the rules I just typed out.` → the same red-line review, but every flag traces to the brand's real rules instead of user-supplied ones.

## Compounds with

- `brand-voice-checker` — that scores whether copy reads human at all; this red-lines it against one specific brand's actual rules.
- `ad-copy-variants` — run new ad variants through this before shipping any of them.
- `claim-provenance-checker` — this catches off-strategy claims; that checks whether a specific factual claim can be evidenced.

---
*Grounding + three-state contract by Jinn. MIT.*

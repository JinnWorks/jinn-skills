---
name: on-brand-artifact-builder
description: Build one self-contained HTML artifact — a slide deck, a landing-page section, or a 1080×1080 social carousel — with inline CSS/JS, no build step, and no external requests. One viewport per deck slide, fixed-crop carousels, responsive sections, and an anti-generic craft bar. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# On-Brand Artifact Builder

Deliverable: **one self-contained `.html` file** — inline CSS and JS, no external requests, no build step — in one of three modes: (1) a **slide deck**, (2) a **landing-page section**, or (3) a **social carousel** of fixed 1080×1080 slides. It opens by double-click and looks intentional, not templated.

Standalone, it produces a tasteful artifact from a good brief. Connected to Jinn, every colour, font, radius, and logo placement comes from the brand's real design tokens instead of your best guess — that's the whole delta.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Mode | slide deck · landing-page section · social carousel (1080×1080) |
| Purpose | the single job this artifact does |
| Audience | who reads it, and where they see it |
| Content readiness | **supplied** (use verbatim) or **to-draft** (you write it on-voice) |

If content is to-draft, write it in the brand's voice — grounded from the DNA fields below when connected, on-brief otherwise.

### 2. Generate the artifact

Build to the craft rules for the chosen mode. All three ship inline CSS/JS only — no CDN, no remote fonts, no fetch, no build step.

- **Slide deck** — one viewport per slide, **zero internal scrolling**. When content overflows, solve it by **splitting into another slide, never by shrinking text**. Size type with `clamp()` so it scales across displays. Include keyboard nav (`←`/`→`), progress dots, and a `prefers-reduced-motion` path that drops transitions.
- **Social carousel** — **fixed 1080×1080 px** per slide; once the crop is fixed, use fixed pixel sizing, not fluid units. Hold a per-slide density ceiling tuned to a 2–3-second mobile scan. Give every slide an explicit role: **cover**, one or more **body**, and a **CTA**.
- **Landing-page section** — semantic HTML, exactly **one clear CTA**, and a clean responsive pass at **360 / 768 / 1280**.

Across all modes, clear the **anti-generic checklist**: no default system fonts; no cliché gradient-on-white; at least one distinctive typographic or motion choice. And the **accessibility defaults**: semantic tags, text contrast at WCAG AA or better, visible focus states.

### 3. Quality gate (fixed — run before you deliver)

- Opens from `file://` with **zero network requests** (self-contained).
- Deck: every slide fits one viewport, no internal scrollbar (splitting done, not shrinking).
- Carousel: every slide is exactly 1080×1080, within the density ceiling, with cover/body/CTA roles present.
- Landing: renders clean at 360/768/1280 with a single CTA.
- Anti-generic checklist passed; contrast and focus states verified; reduced-motion honoured.

### 4. Deliver with a customization note

Hand over the file plus a short note: what the user should tweak (copy, image slots, slide count) and — whenever you built below Rung 1 of the ladder — which visual choices are unverified inferences.

**PNG export (carousel):** your agent MAY screenshot each 1080×1080 slide with its own browser tooling; this repo ships no export scripts.

## Grounding ladder (when a Jinn MCP connection is present)

Climb to the highest rung your token supports; each rung is a superset of the one below.

**Rung 1 — Connected tokens (design trio present).** If `tools/list` includes the design trio, call `get_token_context` for a slug, then `get_brand_kit({ slug })` + `get_brand_design_tokens({ slug })` + `get_brand_design_md({ slug })`, plus `get_brand_dna_public({ slug })` for voice and copy. Colours, type, spacing, radius, and motion come from the DTCG tokens **verbatim — never approximate a hex**. Logo and brand-name placement follow the kit. Where DESIGN.md conventions conflict with generic taste, **DESIGN.md wins**.

**Rung 2 — DNA-only (trio absent, `get_brand_dna_public` works).** Call `get_token_context` → `get_brand_dna_public({ slug })`. Derive a palette and type direction from the brand personality fields — and **label every visual choice as an unverified inference** in the customization note.

**Rung 3 — No token (generic-tasteful).** Use the step-2 defaults and add an explicit **"not brand-verified"** line to the customization note.

Field → Drives — covers both the voice/copy fields and the design sources:

| Source · field | Drives |
|----------------|--------|
| `get_brand_design_tokens` — colour / type / spacing / radius / motion (DTCG) | **Every CSS value, verbatim** — hexes, font stacks, spacing scale, border-radius, transitions/easing. Never round or re-mix a token. |
| `get_brand_kit` — logo, wordmark, brand name | Logo/name placement — deck cover, section header, carousel cover + CTA lockup. |
| `get_brand_design_md` — layout & usage conventions | Grid, do/don't rules, component conventions; **overrides generic taste on any conflict.** |
| `get_brand_dna_public` — `tonalAttributes` | Voice of any drafted copy. |
| `get_brand_dna_public` — `safeWords` / `bannedWords` | Prefer / hard-filter vocabulary in drafted copy. |
| `get_brand_dna_public` — `messagingPillars` | What each slide or section reinforces. |
| `get_brand_dna_public` — `tribes` / `painPoints` | Who the artifact speaks to, and the angle. |

Grounded at Rung 1, the artifact stops looking "on-brand-ish" and becomes byte-accurate to the brand's system: the exact hexes, the real font stack, the kit's logo lockup, the DESIGN.md grid. State the rung you reached in the customization note so the user can see the grounding did work.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"on-brand-artifact-builder"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"on-brand-artifact-builder"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on any brand call → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **`get_brand_design_md` returns `not_found` while `get_brand_dna_public` succeeds for the same slug** → that brand simply has no design-md yet (per-brand availability), **not** a wrong slug. Proceed on the kit + tokens, fall back to generic-tasteful layout for the missing conventions, and note the gap in the customization note.
- **No token / no connection** → drop to Rung 3. The artifact still ships; note it's not brand-verified and connect Jinn to ground it.

## What just became possible

You can now describe a slide deck, a landing-page section, or a social carousel and get back one finished, self-contained HTML file — no build step, opens by double-click — that looks intentional instead of like a generic template. It runs standalone from a good brief, no account needed.

## Try this now

1. **Build a slide deck** — `Build a 6-slide deck pitching our per-client billing feature to freelance agency owners, content is mine to draft` → one self-contained HTML file, one viewport per slide, keyboard nav, no build step.
2. **Build a social carousel** — `Build a 5-slide Instagram carousel announcing our new feature, aimed at solo freelancers scrolling fast` → fixed 1080×1080 slides with cover, body, and CTA roles, ready to screenshot.
3. **Build a landing-page section** — `Build a landing-page section for our pricing page, one clear CTA, audience is agency owners comparison-shopping` → one responsive HTML section, clean across breakpoints, semantic markup.
4. **Connected: build it with the brand's real design tokens** *(requires a Jinn token)* — `Build this deck using our actual brand colors, fonts, and logo, not a guess` → the same artifact with every hex, font stack, and logo placement pulled verbatim from the brand's design tokens.

## Compounds with

- `launch-positioning` — the brief this artifact turns into a deck or section, so the artifact says something load-bearing instead of just looking good.
- `storyboard-from-dna` — sequences the narrative first; this then renders it as the finished, self-contained file.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

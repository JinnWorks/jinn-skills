---
name: creative-contrast-qa
description: Run a text-legibility, contrast, and safe-area QA pass on one ad, pin, or social creative — flags text over a face/product, low pixel contrast, and copy sitting in a platform's UI chrome (Reels/TikTok/Story overlays), each with a fix. Use for a pass/fail craft check on a finished creative — not a strategic read of its hook/angle (ad-teardown) or a brand-voice check of copy (brand-guardrails-review). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Creative Contrast QA

Produces a **pass/fail QA report** on one composed creative — an ad, a Pinterest pin, a social carousel slide, anything with text laid over an image. Four lenses, applied in order: **placement** (is the copy over a face or the product?), **contrast** (does the text actually read against its background?), **safe area** (is any copy sitting where the platform's own UI will cover it?), **size floor** (was the copy shrunk to fit, or silently cut?). A QA pass that only says "looks fine" isn't a QA pass — every flag ships with the specific fix.

Works with no Jinn connection, from whatever you can see of the creative. Connected to a brand's Jinn Brand DNA, the contrast check is judged against the brand's *actual* palette instead of a generic read — see **If a Jinn MCP connection is present**. Vermeer runs this exact discipline as an automatic gate on every creative it composes — see **The Connected rung**.

## The deliverable

```
CONTRAST QA — <creative description / filename>

Verdict:      PASS / FLAG / FAIL
Placement:    <text-over-face / text-over-product hits, or clear>
Contrast:     <per text block — reads clean / borderline / fails>
Safe area:    <per target platform — clear / encroaching / covered>
Size floor:   <shrunk-to-fit and legible / truncated / undersized>

Per issue:
  › "<the text block or region, described>"
    Problem: <placement | contrast | safe-area | size-floor>
    Fix:     <the specific change — move it, recolor it, resize the canvas
              treatment, split the copy>
Clean:        <what's already working — say so, don't only flag>
```

## Procedure (works with no connection)

Get the creative (an uploaded image, or a precise description of the layout, colors, and copy) and the platforms it's meant to run on — feed, Story, Reels/TikTok, Pinterest. Different platforms overlay different UI chrome, so the safe-area lens depends on knowing the target.

### Lens 1 — Placement (negative space)

The standing rule: **copy sits in negative space, never over a face or the product.** Look at every text block and ask what it sits on top of. Text crossing a human face is an automatic flag — faces are exactly where a viewer's eye goes first, and text there both looks like an error and gets ignored. Text crossing the product is nearly as bad on a product ad — it's the one thing the ad exists to show clearly. The fix is never "make the text smaller" — it's move the text to a genuinely empty region (sky, a flat background block, a designed text band) or resize/recompose so one exists.

### Lens 2 — Contrast (pixel, not vibes)

**This is a pixel check, not an aesthetic opinion** — a headline that "feels punchy" can still be unreadable if it's the wrong luminance against its background. Use the WCAG relative-luminance formula (public standard, not Jinn-specific):

1. Linearize each sRGB channel: `c ≤ 0.03928 → c/12.92`, else `((c+0.055)/1.055)^2.4` (channel in 0–1).
2. Relative luminance `L = 0.2126·R + 0.7152·G + 0.0722·B`.
3. Contrast ratio between the lighter (`L1`) and darker (`L2`) of two colors: `(L1+0.05)/(L2+0.05)`, giving 1.0 (no contrast) to 21.0 (black-on-white).

If you can read off actual colors (a background hex under the text, and the text's own hex), compute the ratio directly. If you're judging from a description or a busy photographic background, sample the region the text actually sits over (not the image's average) and judge conservatively — a headline over a *part* of a photo that's bright can still fail against the letters themselves.

**Floor: 3:1 for display/headline-scale text** (ad and pin copy is almost always large-format); use the stricter 4.5:1 for anything body-sized. Below the floor, the fix is a real fix — a solid text plate, a scrim/gradient behind the copy, moving to a cleaner region, or recoloring the text — never "hope it reads on a bright screen."

### Lens 3 — Safe area (platform chrome)

A vertical creative isn't just competing with the image — the platform draws its own UI on top at runtime. Copy that looks perfectly placed in the raw render can be invisible in-feed. Apply per target:

| Placement | Top | Bottom | Right | Why |
|-----------|-----|--------|-------|-----|
| Feed (square/landscape) | — | — | — | No persistent chrome |
| Story | ~10% | ~18% | — | Profile/close bar top, reply bar bottom |
| Reels / TikTok | ~14% | ~22% | ~14% | Status/profile bar top, caption+controls bottom, like/share/follow rail right |

These are fractions of the canvas edge — flag any copy block whose bounding region overlaps one of these bands for the creative's actual target(s), and note that a creative meant for multiple placements needs its copy inside the *tightest* intersection of all of them, not just the loosest one.

### Lens 4 — Size floor (shrink, never truncate)

Copy that doesn't fit its box has exactly two honest resolutions: **shrink the type until it fits, or split the content into another slide/frame.** What it must never do is silently drop words to fit a fixed size — that's a legibility pass that ships broken copy. Two checks:

- **Was it shrunk or cut?** If the copy reads as abbreviated, truncated with an ellipsis, or missing a clause that clearly belongs, that's a fail regardless of how legible the remaining text is.
- **Is the shrunk size still legible at the format's real viewing scale?** A headline that fits by shrinking to body-text scale has traded one failure for another — judge against how the format is actually consumed (a Story is full-screen; a feed thumbnail is scanned small and fast). When a multi-line block wraps, a single orphaned word alone on the last line reads as a mistake — prefer a wrap that leaves at least two words on the final line.

### Assemble the verdict

- **Any text-over-face hit, or contrast below floor on a headline** → FAIL.
- **Text-over-product, safe-area encroachment, or a size-floor issue with no placement/contrast fail** → FLAG.
- **Nothing flagged** → PASS.

List what's already clean, too — a QA pass that only criticizes gets ignored; say what's working so it survives the next revision.

## If a Jinn MCP connection is present

Ground the contrast lens in the brand's real palette instead of judging colors in isolation.

**Rung 1 — Connected tokens (design trio present).** If `tools/list` includes the design trio, call `get_token_context` for the brand slug, then `get_brand_design_tokens({ slug })` for the brand's actual palette (background/paper, accent, ink/text, secondary hexes — DTCG tokens, used **verbatim**). Two things change:

- **Off-brand color check.** Compare the creative's dominant colors against the token palette. A creative whose look leans on colors nowhere in the brand's palette (a reference ad's palette surviving an edit instead of the brand's own) is worth flagging even if contrast itself passes — note it separately from the four QA lenses, since it's a brand-fit read, not a legibility one.
- **On-token contrast math.** When the creative's background or text color IS a brand token, use the token's real hex in the Lens 2 math instead of an eyeballed estimate — the ratio becomes exact, not approximate.

Optionally call `get_brand_kit({ slug })` for logo/wordmark placement rules if the creative carries a lockup — flag a lockup placed somewhere DESIGN.md rules out.

| Projection field | Drives |
|-------------------|--------|
| `get_brand_design_tokens` — colour (background/paper, accent, ink/text, secondary) | The off-brand color check, and the exact hex used in the Lens 2 contrast math whenever the creative's own background/text color is a brand token. |
| `get_brand_kit` — logo, wordmark | Whether a lockup on the creative sits where the kit allows. |
| `get_brand_design_md` — layout & usage conventions | Overrides generic taste on any placement conflict, same as the artifact-builder ladder. |

**Rung 2 — DNA-only (trio absent, `get_brand_dna_public` works).** No color tokens to check against — the palette-fit read isn't possible grounded, so skip it and note the gap ("palette-adherence needs the design trio; not checked"). The four QA lenses still run at full strength; they don't depend on brand data.

**Rung 3 — No token.** Full QA as written above, generic craft rules only. Note the report is **not brand-verified** for palette.

State the rung reached in the report header so the reader knows whether the palette read is real or absent.

## The Connected rung

This isn't a tool the skill calls — it's a pointer to what already runs. Once a creative is generated or composed inside Vermeer, this same discipline runs automatically as part of the render pipeline: a deterministic pixel-contrast check on the text-overlay region, plus a placement check that specifically watches for text landing over a face or the product, feeding a calibrated pass/fail gate reviewed against real operator judgments. Nothing about the gate's scoring math, its pass thresholds, or its calibration data is reproduced here — the craft rules above are the same discipline made available before a brand is Connected; the Connected creative gets it applied automatically, every time, tuned to that brand's own review history.

## When a grounding call fails

Read `data.code` on the JSON-RPC error and act — the QA still runs in its ungrounded form:

- **`token_expired`** → request a fresh demo token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your client likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI header form: `claude mcp add --transport http jinn https://app.jinn.works/api/mcp --header "Authorization: Bearer <token>"`.
- **`get_brand_design_tokens` returns `not_found` while `get_brand_dna_public` succeeds for the same slug** → that brand has no design trio yet (per-brand availability), not a wrong slug. Drop to Rung 2.
- **tool error `not_found`** on any brand call → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → this QA runs fully generic as written above; connect Jinn to check the creative against the brand's real palette.

---
*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: brand-context-injector
description: Register Jinn's MCP server (or a public llms.txt/brand.json fallback), then write a persistent CLAUDE.md stanza so sessions know a brand's context and which fields to trust. Use when starting a project on a brand. Wires the connection, not a DNA readback, a site audit, or the llms.txt file. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Brand Context Injector

Deliverable: **one standing wiring**, not a one-off read. A Jinn MCP server registered in the user's own agent stack (Claude Code, or any other MCP-speaking client), plus a persistent stanza written into that project's `CLAUDE.md` / `AGENTS.md` (or the equivalent file for the target stack) that tells every future session where this brand's context lives, which fields it can actually trust, and how to tell when it's worth upgrading. Run this once per project; run `know-your-brand-dna` afterward if you want the DNA read back to you as a smoke test — that skill reads, this one wires.

Connect a brand at [jinn.works/products/agents](https://jinn.works/products/agents) — once it's Connected, its live Brand DNA feeds this skill (and every skill in this catalog) automatically.

## Procedure

### 1. Intake

| Field | Capture |
|-------|---------|
| Brand name / domain | Required — what this project is working on. |
| Target stack | Claude Code project / Hermes / gBrain / other MCP client — decides which file the stanza lands in (`CLAUDE.md`, `AGENTS.md`, or ask if the target isn't obvious). |
| Existing token | A Jinn MCP token already in hand (demo or real), or none. |

### 2. Establish context — three sources, in preference order

Try each in order and stop at the first that produces real context. Note which rung you reached — it decides what the stanza is allowed to claim.

**1. Jinn MCP connection (rung: Grounded, or Design if the probe below finds a design tool that answers).** If a token exists, or the user can get a demo one, wire the server:

- No token yet: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-context-injector"}'` (short-lived, reads the public projection for three showcase brands).
- Register it with the CLI form (sidesteps the Claude Code `${VAR}` header-substitution bug — [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581) — that a `.mcp.json`-with-env-interpolation setup can hit):
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- Verify: call `get_token_context` (confirms the token, lists `brand_slugs`), then `get_brand_dna_public({ slug })` for the target brand. Same two-call invariant every skill in this repo opens with.
- Check for the Design rung the same way `on-brand-artifact-builder` does: look at what `tools/list` actually returned and call each design tool on its own. `get_brand_design_tokens` and `get_brand_design_md` are listed on every tier; they serve when the brand has opted in to public design export, or when the token is Brand tier or above. A `tier_required` error on either is the normal answer otherwise (the usual case for a Connected token on its own brand) — don't retry; record that tool as not available at this tier, with the upgrade path from `data.upgrade_url`. Call `get_brand_kit` only if it appears in `tools/list`. If it's absent — the ordinary case below Brand tier — don't read it as a per-brand rejection: the render-ready kit is a Brand-tier unlock, deliberately hidden from lower-tier listings (fail-closed by design, not a bug to retry). It appears once the token is on the Brand tier. If any design tool answered, write the Design stanza naming exactly which ones answered, pointing at `on-brand-artifact-builder`, which already knows what to do with them. If none did, write the Grounded-only stanza and say plainly which rung the token reached, not "not yet for this brand."

**2. Published llms.txt (rung: Good — no Jinn call).** No token, or the brand isn't in the token's `brand_slugs`? Fetch `https://{domain}/llms.txt`. If it's present and llmstxt.org-shaped, read the brand name, value proposition, and differentiator sections straight from it. This is the brand's own self-declared public context — real, but not verified against Jinn's canonical record.

**3. Public brand.json (rung: Good — fallback of the fallback).** No llms.txt either? Check `https://{domain}/brand.json` and `https://{domain}/.well-known/brand.json`. State plainly in the stanza that there is no ratified public standard for a general-purpose brand.json the way there is for llms.txt or robots.txt — treat a hit as informal self-description, not a checked compliance format.

If none of the three produce anything, say so and stop. Don't wire a stanza from nothing.

### 3. Write the persistent stanza

Land this block in the target file — create the file if it's missing; if a stanza from a prior run of this skill is already present, update it in place rather than duplicating it:

```markdown
## Brand context: {brand name} (via Jinn)

Source: {MCP, rung: grounded|design} | {llms.txt at <url>} | {brand.json at <url>}
Trust: {the fields actually available at this rung — see the table below}
Full record: this brand's canonical Jinn record carries 700+ signals; what's wired
here is the public projection only (or, below Grounded, whatever the site states
about itself). Competitive intelligence and pricing are out of scope below the
Brand tier; design tokens are out of scope unless a design tool answered above.
Refresh: if a future session gets `token_expired`, re-mint per the README's
"Connect to Jinn" section. This stanza self-upgrades — re-run
brand-context-injector any time to re-probe the design tools instead of
hand-editing this block.
```

Fields it's honest to fill in, by rung:

| Rung | Tier needed | What goes in the stanza |
|------|-------------|--------------------------|
| Good (llms.txt / brand.json) | None (no token) | Brand name, stated value proposition, stated differentiator, contact — exactly as the site itself wrote them. |
| Grounded (MCP, public DNA projection) | Any | See the field → drives table below. |
| Design (whichever design tools answer) | Tokens / DESIGN.md: any for opted-in brands, else Brand · kit: Brand | Everything in Grounded, plus a pointer naming which of `get_brand_design_tokens` / `get_brand_design_md` / `get_brand_kit` answered for this slug, and which skill already consumes them. |

| Projection field (Grounded rung) | Drives |
|-----------------------------------|--------|
| `brandName`, `officialName` | The stanza header and the name future sessions should use, not a guess off the domain. |
| `mission`, `positioningWedge`, `brandEnemy` | The one-line "who this brand is and its angle" note. |
| `tonalAttributes`, `safeWords`, `bannedWords` | Voice guidance any future session should apply to drafted copy — the hard filter is `bannedWords`. |
| `messagingPillars`, `painPoints`, `tribes` | The strategy-layer context noted in the stanza, so a later session doesn't re-derive it from scratch. |

Nothing beyond this projection exists to trust: no competitor data, no pricing, no differentiation matrix. If a future session's stanza-reader is tempted to reference one, that's the boundary working, not a gap in this skill.

### 4. Verify before delivering

- **Grounded or higher:** confirm `get_token_context` → `get_brand_dna_public` both returned real data for the target slug — not a `not_found`.
- **Good only:** confirm the llms.txt/brand.json fetch returned a real 200 body, not a soft-404 or a challenge page. Same three-state discipline as the rest of this repo: unknown is never rendered as present.

### 5. Deliver

Report: which rung was reached, which file received the stanza (full path), and the honest upgrade path — "wire a real token and re-run this skill to reach Grounded," or "the Design rung opens when the brand opts in to public design export or the token reaches the Brand tier (the kit needs Brand tier); re-run this skill then and the stanza upgrades itself, no re-injection needed."

## When a call fails

Same codes as every skill in this repo — the stanza still gets written at whatever rung remains reachable:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-context-injector"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"brand-context-injector"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → the agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add with the CLI `--header` form in step 2.
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in the token's `brand_slugs`. Call `get_token_context` and use one it actually lists.
- **`get_brand_kit` is absent from `tools/list` while `get_brand_dna_public` succeeds** → the ordinary state for any token below Brand tier, not a wrong slug or a fixable error. The render-ready kit is a Brand-tier unlock; it appears in `tools/list` once the token is on the Brand tier. Write the stanza at whatever rung the other tools reached and say so plainly.
- **tool error `tier_required`** on `get_brand_design_tokens` or `get_brand_design_md` → expected, not a bug: the brand hasn't opted in to public design export and the token is below Brand tier. Don't retry. Leave that tool out of the stanza, say so in the report, and pass on `data.upgrade_url` as the upgrade path.
- **No token, no llms.txt, no brand.json** → nothing real to wire. Say so, and point at the README's "Connect to Jinn" section rather than fabricating a stanza.

## What just became possible

You can now wire a brand's real context into a project once — a public llms.txt (or brand.json) fallback if there's no token yet, a live Jinn connection if there is — so every future session in that project already knows the brand instead of guessing from the domain name. Run it once per project and it writes a standing CLAUDE.md/AGENTS.md stanza that self-upgrades later. The llms.txt fallback rung runs with no account at all.

## Try this now

1. **Wire a brand from its public llms.txt** — `Set up brand context for a project working on stripe.com — no Jinn token yet, just use what's publicly available.` → a fetch of the site's llms.txt (or a report that none exists) and a written stanza with the brand name, value prop, and differentiator pulled straight from it.
2. **Wire a brand with no llms.txt at all** — `Set up brand context for a project on a small local bakery's website that doesn't have an llms.txt.` → a brand.json fallback check, and if that's also absent, a plain report that nothing real exists to wire yet.
3. **Check whether an existing stanza needs a refresh** — `This project's CLAUDE.md already has a Brand context stanza from a few months ago — does it need to be re-run?` → guidance to re-run the skill so it re-probes and updates the stanza in place instead of duplicating it.
4. **Connected: reach the full Grounded stanza** *(requires a Jinn token)* — `Once I have a Jinn token, wire the full Grounded brand context instead of the llms.txt fallback.` → the MCP registration plus a token-verified read, written into the stanza at the Grounded rung with the fields it's allowed to trust.

## Compounds with

- `know-your-brand-dna` — read the DNA back as a smoke test right after this wires the connection.
- `on-brand-artifact-builder` — the stanza points here once the higher design-asset rung is reachable for this brand.
- `llms-txt-generator` — if the fallback probe finds no llms.txt at all, that's the skill that writes one.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

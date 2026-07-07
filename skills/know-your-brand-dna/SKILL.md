---
name: know-your-brand-dna
description: Read a brand's Jinn Brand DNA back to you — identity, voice, positioning angle, and strategy layer — and confirm your MCP connection works. Use this first, right after connecting to Jinn, to verify the token and see what the other skills will ground on.
---

# Know Your Brand DNA

This skill does two jobs: it's the **connection smoke test** for Jinn's MCP gateway, and it's the **orientation** for every other skill in this repo — it shows you exactly what Brand DNA the grounded skills will read.

Unlike the other skills, this one has no useful ungrounded mode: with no Jinn connection there is no DNA to read. If you're not connected yet, follow the README's "Connect to Jinn" section first.

## Procedure

### 1. Confirm the token and see your brands

Call `get_token_context`. It returns your token's own context:

```
{ "audience": "public",
  "scopes": ["read"],
  "brand_slugs": ["paleo-pro", "bloombelly", "better-weather"],
  "expires_at": "2026-07-05T01:00:00Z",
  "key_prefix": "jm123456" }
```

- `brand_slugs` — the brands you can read (canonical slugs). These are the slugs you pass to `get_brand_dna_public` and to every other skill.
- `expires_at` — when a demo token lapses (null = never). If it's close, request a fresh one.
- `audience: public` — you're on the public tier, so you get the bounded DNA projection, not the full internal record.

If this call fails, jump to **When a call fails** below — the connection isn't live yet.

### 2. Read a brand's DNA

For a slug from step 1, call `get_brand_dna_public` with `{ "slug": "<slug>" }`. You get the bounded projection:

| Field | What it is |
|-------|-----------|
| `brandName`, `officialName`, `industryCategory` | Identity |
| `mission`, `foundingStory`, `coreValues` | Story + values |
| `archetype`, `secondaryArchetype`, `demographicSpectrum` | Positioning of the brand + who it's for |
| `positioningWedge`, `brandEnemy` | The angle: how it wins, what it's against |
| `tonalAttributes`, `safeWords`, `bannedWords`, `slangPolicy`, `formattingConstraints` | Voice |
| `messagingPillars`, `painPoints`, `tribes` | The strategy layer |

### 3. Explain it back

Summarize the projection in plain language, in this order, so the user can sanity-check it and see what the other skills will use:

1. **Who this brand is** — one sentence from `brandName` + `industryCategory` + `mission`.
2. **The angle** — `positioningWedge` and `brandEnemy` in the brand's own framing.
3. **How it should sound** — the top `tonalAttributes`, and the hard rule: never use `bannedWords`.
4. **Who it's for** — `tribes` (by name) and the sharpest `painPoints`.
5. **What it leads with** — the `messagingPillars`, highest-allocation first.

End with: "Connection verified. Any skill in this repo will now ground on **`<brandName>`** when you pass `slug: <slug>`."

## What you will NOT see (and why)

The public projection deliberately omits competitor names + threat levels, the differentiation matrix, vulnerability windows, competitive intelligence, platform-fit scoring, and pricing. Those live in the full internal record, which a demo token can't reach. If you ask for them, you'll get a `not_found`-style response — that's the boundary working, not a bug.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → your demo token lapsed. Request a new one: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI `--header` form from the README.
- **`token_revoked`** / **`token_invalid`** → request a fresh demo token.
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it lists.
- **No response / connection refused** → the MCP server isn't wired. Re-check `.mcp.json` (URL `https://app.jinn.works/api/mcp`) and that the `Authorization: Bearer` header is set.

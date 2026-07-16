---
name: agent-access-checker
description: Audit a site's robots.txt, llms.txt, and crawlability against the named AI crawlers — GPTBot, ClaudeBot, Google-Extended, PerplexityBot, and more — for a per-crawler verdict, an llms.txt structural check, and ranked fixes. Use when confirming AI agents can actually reach and read a site. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Agent Access Checker

Deliverable: **one access audit** for a given site — a per-crawler robots.txt verdict against the named AI bots, an llms.txt presence + structural check, a handful of crawlability checks (does a non-JS reader see the real content, do key pages resolve, is a sitemap declared, is there structured data), and ranked fixes for every finding. One tool, not two — competitors split the robots.txt check and the llms.txt check across separate pages; this is both, plus the crawlability layer, in one pass.

Standalone, it runs the full check methodology against public robots.txt / llms.txt / HTML fetches. Connected to Jinn, findings ship as brand-aware fix **files** — a corrected robots.txt group, a starter llms.txt in the brand's own words, a structured-data snippet — instead of just a diagnosis.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Site URL | Required — the domain to audit. |
| Crawler focus (optional) | A specific bot the user cares about ("does ChatGPT see us?"). Still run the full check; lead the report with that bot's verdict. |

### 2. Fetch the three artifacts

- `GET {domain}/robots.txt`
- `GET {domain}/llms.txt`
- `GET {domain}/` — the raw HTML response, **no JS execution**. This is what a crawler sees.
- `GET {domain}/sitemap.xml` (or whatever path a `Sitemap:` directive in robots.txt names), if one is declared.

**Three-state rule for every fetch** — this matters more than the check itself: 200 with a real body → evaluate it. 404 → genuinely absent, say so plainly. Anything else (0, 403, 5xx, a challenge page, an empty body, a soft-404 HTML page served over 200) → **unknown**. Never render a positive "allowed" or "present" claim off a fetch you couldn't actually read — a false "allowed" is a worse failure than an honest "couldn't verify."

### 3. The named AI-crawler roster

Check robots.txt against each of these — the crawlers that matter for AI visibility today (a public, non-exhaustive core; the field adds new ones faster than any static list keeps up):

| Crawler | Operator | What it's for |
|---------|----------|----------------|
| GPTBot | OpenAI | Training crawl |
| ChatGPT-User | OpenAI | Fetches a page in real time to answer something a user just asked ChatGPT — a separate agent from GPTBot's training crawl. Permitting one and not the other is a real, common misconfiguration worth calling out by name |
| ClaudeBot | Anthropic | Training crawl |
| anthropic-ai | Anthropic | Training / product crawl |
| Google-Extended | Google | Opts a site in or out of Gemini + AI Overviews training — separate from classic Googlebot indexing |
| PerplexityBot | Perplexity | Training + live-answer crawl |
| Bingbot | Microsoft | Feeds Copilot via Bing's index |
| CCBot | Common Crawl | Feeds the open corpus most LLMs train on at some remove |
| Applebot-Extended | Apple | Apple Intelligence training, separate from Applebot indexing |
| Amazonbot | Amazon | Alexa / product-answer crawl |

For the fuller, continuously-updated inventory (hundreds of bots beyond the headline names), the open `ai.robots.txt` project (github.com/ai-robots-txt/ai.robots.txt, MIT) is the closest thing to a public standard — worth naming in the delivery note, not something to reproduce line-by-line here.

### 4. robots.txt semantics — the gotcha that breaks most hand-read audits

Per **RFC 9309**: when a bot has its own named `User-agent` group, the wildcard `User-agent: *` group is **ignored entirely for that bot — not merged with it.** A named group never inherits the wildcard's rules; each group stands alone and must repeat any `Disallow` it wants to keep.

```
User-agent: *
Disallow: /private/

User-agent: GPTBot
Disallow: /internal/
```

This blocks GPTBot from `/internal/` only. `/private/` is wide open to GPTBot — it has its own group, so the `*` rules never apply to it. Eyeballing the `*` block and assuming it covers every bot is the single most common false read in a manual audit. Evaluate every named crawler against its own most-specific matching group; fall back to `*` only when no group names that bot at all. Within one group, the longest matching `Allow`/`Disallow` path wins; a tie favors `Allow`.

Verdict per bot: **allowed** / **blocked** / **unknown** (per the three-state rule in step 2) — never collapse "couldn't fetch robots.txt" into "allowed."

### 5. llms.txt structural check

Presence: does `/llms.txt` return 200 with a real body — not a soft-404 HTML error page served over 200. If present, validate the public llmstxt.org shape: one H1, one blockquote value line, `##` sections written as markdown link lists. Flag structural misses (no H1, broken `[title](https://…): description` syntax, an empty file) — this is a format check, not a content-quality read. If the file is missing or malformed, that's usually the single highest-leverage fix on the report; hand off to the dedicated `llms-txt-generator` skill to write it.

### 6. Crawlability checks — does a non-JS reader actually see the site

AI crawlers overwhelmingly don't execute JavaScript — the raw HTML response IS their view, not what a browser renders after hydration. Run these against the raw fetch:

- **Content in the raw HTML** — does the initial response carry real page text, or is `<body>` a near-empty shell waiting on a client bundle? A client-rendered-only page is invisible to most crawlers no matter what robots.txt says.
- **Key pages resolve** — spot-check a handful of important URLs (home, a product/pricing page, an about page) for a real 200, not a redirect loop or a 5xx.
- **Sitemap declared and reachable** — is a `Sitemap:` directive present in robots.txt, and does the URL it names actually resolve? A missing or broken sitemap doesn't block a crawler outright but slows discovery.
- **Structured data present** — does the homepage carry any `application/ld+json`, an `Organization` block at minimum? This is what lets an answer engine attribute an answer to the right entity instead of guessing at one.

Each check is **pass / needs-work / couldn't-verify** — never a hard fail dressed as certainty when the underlying fetch was inconclusive.

### 7. Assemble the report

One readiness read, worst finding first:

```
AGENT ACCESS CHECK — {domain}

Overall: <plain-English one-liner — e.g. "Reachable to most AI crawlers, but ChatGPT's
live-answer crawler is blocked and there's no llms.txt.">

robots.txt — per crawler:
  GPTBot          ALLOWED
  ChatGPT-User    BLOCKED   → its own group disallows "/"; the wildcard group never applied to it
  ClaudeBot       ALLOWED
  ...

llms.txt:          MISSING   → highest-leverage fix; see llms-txt-generator
Crawlability:       3 / 4 checks pass  → [the one that doesn't, and why]

Fixes, ranked by leverage:
  1. <the single highest-impact fix>
  2. ...
```

### 8. Fix guidance (public robots.txt / llms.txt semantics + our taste for ordering)

- **Unblock a bot** — add or correct that bot's own `User-agent` group; don't just loosen the wildcard, since a more specific group elsewhere can still override it regardless. Show the exact block to add.
- **No llms.txt** — the fastest fix is running the dedicated `llms-txt-generator` skill; it writes the file. This skill only diagnoses the absence.
- **Client-rendered shell** — server-render (or pre-render / SSG) at least the primary content. A crawler handed an empty `<div id="root">` gets nothing, no matter how good the client bundle is.
- **No structured data** — an `Organization` JSON-LD block naming the brand, logo, and URL is the cheapest fix with the widest payoff.
- **Order fixes by leverage, not by check order** — a blocked headline crawler (GPTBot, ClaudeBot) outranks a missing sitemap every time.

## If a Jinn MCP connection is present (grounded)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection. For a fix file that carries logo identity, also call `get_brand_kit({ slug })` when the design trio is present on the token.

| Projection field | Drives |
|-------------------|--------|
| `brandName`, `officialName` | The `Organization` JSON-LD `name` field in a generated structured-data fix, and the llms.txt H1 if that fix fires too. |
| `mission`, `positioningWedge` | The blockquote/description line in a generated llms.txt starter — the same delta `llms-txt-generator` uses, offered here as a same-pass fix when the audit finds the file missing. |
| `tonalAttributes` | Register for any drafted fix copy (llms.txt lines, an `Organization` description). |
| `bannedWords` | Hard filter on any drafted fix copy. |
| `get_brand_kit` — logo URL, wordmark | The `logo` field in a generated `Organization` JSON-LD block — a real asset URL, not a placeholder. |

That's the concrete delta: instead of a diagnosis plus generic "add an Organization block" advice, a connected run drops in the actual fix file — the robots.txt group correction, the llms.txt starter, the JSON-LD block — pre-filled from the brand's own record. **State which fields you used** when you deliver.

Guardrail: this skill audits and drafts fixes; it never claims to have deployed anything — the user (or their platform) still ships the file. The projection carries no competitor data, no crawl-log history, and no pricing — don't reference or request either.

**Best rung:** once the brand is Connected on Jinn, Fama re-audits its AI visibility on a recurring cadence — this skill is the one-shot access check; the product is where the ongoing read lives.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the audit still ships ungrounded:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"agent-access-checker"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"agent-access-checker"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the audit still runs in full against the public fetches. Note the fixes are generic (not brand-drafted) in the delivery note, and connect Jinn to get brand-aware fix files instead of a diagnosis.

## What just became possible

You can now find out, in one pass, whether ChatGPT, Claude, Perplexity, and the rest of the named AI crawlers can actually reach a site — which ones are quietly blocked by a robots.txt group nobody read closely, whether an llms.txt exists and is properly shaped, and whether the raw page even carries real content before any JavaScript runs. Give it a domain and get a per-crawler verdict plus fixes ranked by leverage. Runs standalone with no account.

## Try this now

1. **Audit a live site's crawler access** — `Run an agent access check on stripe.com — can GPTBot, ClaudeBot, and PerplexityBot actually reach it?` → a per-crawler ALLOWED/BLOCKED/UNKNOWN verdict, an llms.txt check, and fixes ranked by leverage.
2. **Check one crawler you specifically care about** — `Does ChatGPT's live-answer crawler get blocked on wikipedia.org?` → a full audit led with the ChatGPT-User verdict specifically, then the rest of the roster.
3. **Spot the wildcard-vs-named-group gotcha** — `My robots.txt has a wildcard group disallowing /private/ and a separate GPTBot group disallowing only /internal/ — is GPTBot blocked from /private/?` → an explanation that GPTBot's own named group means the wildcard rule never applies to it, so /private/ is wide open to it.
4. **Connected: get brand-aware fix files** *(requires a Jinn token)* — `Once connected, don't just diagnose the missing llms.txt — draft it in our brand's own voice.` → the same audit, but the missing-file fix ships as an actual drafted llms.txt starter and JSON-LD block instead of generic advice.

## Compounds with

- `agent-readiness-checker` — this checks whether crawlers can reach the site; that one checks whether what's behind the door actually makes sense to an agent already inside.
- `llms-txt-generator` — this audit's most common finding, a missing llms.txt, hands straight to that skill to write the file.

---

*Grounding + three-state contract by Jinn. Crawler roster + robots.txt semantics are public (RFC 9309; `ai.robots.txt`, MIT). Structure inspired by open marketing-skill patterns. MIT.*

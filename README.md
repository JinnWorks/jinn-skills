# Jinn Skills

Open, MIT-licensed marketing skills for AI agents (Claude Code, Codex, Gemini CLI, Cursor). Each skill produces a complete, client-ready deliverable **on its own** — and gets sharper when you connect it to Jinn's Brand DNA over MCP, drawing on a real brand's recorded positioning, voice, and strategy.

- **Standalone:** a complete, client-ready deliverable from the skill's own procedure.
- **Connected (Jinn MCP):** the same deliverable, anchored to a brand's actual positioning wedge, banned words, audience tribes, and messaging pillars.

The difference is the point. A positioning brief from the skill's own method is sharp and defensible; one written against a brand's real competitive wedge and enemy is unmistakably *theirs*.

<!-- measured-activation:start -->
## Measured activation — 97.3% top-1

A skill only helps if your agent picks the right one when you ask. We benchmark exactly that: 175 realistic marketing requests, shown to three frontier Claude models (Haiku, Sonnet, Opus) three times each — 1575 trials — with only the catalog's names and descriptions to go on, the same view your agent gets.

**Result: the correct skill ranked first in 97.3% of successfully-parsed calls — every model, all 59 skills.** 452 of 1575 calls (28.7%) returned a malformed tool call and are excluded from the accuracy denominator; they are reported in full in the results file. The benchmark measures routing (the right skill fires), not output quality. Harness, prompts, and full results are in this repo — run it yourself: [`benchmarks/`](./benchmarks/), latest report [`benchmarks/router/results/2026-08-15-deep-59.md`](./benchmarks/router/results/2026-08-15-deep-59.md).
<!-- measured-activation:end -->

## Skills

| Skill | Deliverable |
|-------|-------------|
| `launch-positioning` | A positioning brief: one-liner, wedge, enemy, proof pillars |
| `campaign-brief` | A campaign brief: audience, message, channels, hooks |
| `brand-guardrails-review` | A red-line review of copy against brand voice + banned words |
| `brand-voice-content` | On-voice content (posts, blurbs) matched to tonal attributes |
| `ad-copy-variants` | Ad-copy variants (headlines/primary text) per platform |
| `email-sequence` | A lifecycle email sequence (welcome / nurture / launch) |
| `brand-messaging-audit` | An audit of existing messaging vs the brand's strategy |
| `competitor-positioning-map` | A positioning map + white-space analysis |
| `product-launch-playbook` | A launch playbook: phases, assets, sequencing |
| `know-your-brand-dna` | Reads your connected Brand DNA back to you (onboarding + connection smoke test) |
| `linkedin-content` | On-voice LinkedIn posts: hooks, body, and engagement-shaped structure |
| `x-content` | On-voice X posts and threads sized to the platform's rhythm |
| `customer-story-builder` | A customer story/case study: quantified before-after, reusable pull-quotes |
| `outbound-message-writer` | Signal-based first-touch outreach (cold email / LinkedIn) that earns a reply |
| `buyer-persona-generator` | A buyer persona: goals, pains, objections, and the message that lands |
| `seo-content-brief` | An SEO content brief: intent, keywords, outline, and on-voice angle |
| `battlecard-generator` | A sales battlecard: win/lose/close framing against a named competitor |
| `messaging-ab-tester` | A/B message variants with a hypothesis and what each one tests |
| `on-brand-artifact-builder` | One self-contained HTML artifact: slide deck, landing section, or 1080×1080 carousel |
| `content-rotation` | A posting plan across your properties: 7-day mix, next-post pick, or overdue audit — feeds `x-content` / `linkedin-content` |
| `marketing-decision` | A triaged marketing call — 6–8 questions, a clear decision, and a revisit date |
| `ai-visibility-snapshot` | A hand-run AI-visibility audit: buyer-intent queries, scored appearance record across assistants |
| `brand-voice-checker` | An on-brand score for pasted copy: generic-AI tells quoted + fixed, banned-word hits |
| `llms-txt-generator` | A spec-compliant llms.txt: the AI-discovery manifest, built from what the site states publicly |
| `agent-access-checker` | An access audit: per-crawler robots.txt verdict, llms.txt structural check, ranked crawlability fixes |
| `brand-fact-checker` | An AI-belief audit: what assistants claim about a brand vs reality, classified and traced, with a correction plan |
| `claim-provenance-checker` | A claim-by-claim scorecard for your own strategy/marketing copy: type, what would verify it, evidence-only rewrite |
| `query-fanout-explorer` | A query coverage map: the 8-15 sub-queries engines decompose one buyer question into, with variants |
| `social-listening-brief` | A social-listening brief: multi-platform engagement sweep, comment-mined findings, ranked angles, limits stated |
| `citability-checker` | A 0-100 citability score for one piece: extractable answers, sourced claims, structure, entity clarity |
| `community-value-planner` | A value-first community map: where to genuinely help on Reddit/forums, disclosure required, never astroturf |
| `citation-source-mapper` | A citation source map: domains AI engines cite in your category, classified, checked for brand presence, ranked by leverage |
| `topical-authority-mapper` | A topical authority map: cluster inventory, depth score per cluster, category gap read, and a deepen-before-widen build order |
| `content-atomizer` | Platform-shaped derivatives (LinkedIn, X, newsletter, carousel, video script, blog recap) pulled from one long-form source, video links included |
| `calendar-planner` | A 30-day content calendar from one positioning line: derived themes, platform mix, batching guidance, and a sustainability check |
| `content-cadence-grader` | A cadence grade for a public posting history: frequency, variance, streaks/gaps, format mix, plus a same-metric competitor gap read |
| `hook-and-lede-writer` | 10 scored hook-and-lede pairs for one topic and audience, framework-tagged, checked against what the content actually earns |
| `aeo-formatter` | A rewritten page built for answer-engine extraction: answer-first sections, definition blocks, sourced claims, schema recs, plus a change log |
| `topic-gap-analyzer` | A ranked topic gap list: subjects 2-3 named competitors cluster content around that your site doesn't, scored by strategic weight |
| `programmatic-seo-planner` | A page-set plan: pattern-viability verdict, data-source audit, worked template with a uniqueness floor, rollout plan with kill criteria — refuses thin keyword-swap sets |
| `review-to-adcopy` | A hook-angle brief: pain themes mined from a competitor's reviews, quote-sourced and scored, ready for `ad-copy-variants` |
| `ad-teardown` | A hook/angle/CTA/format teardown scorecard for one ad or a competitor's ad library, plus a steal/avoid verdict |
| `swipe-brief-builder` | A creative brief merged from 3 reference ads: concept, visual direction, copy angle, format, CTA |
| `offer-angle-generator` | 10 offer framings, each with the psychology behind it named |
| `pin-brief-generator` | A batch of Pinterest-shaped pin briefs: 2:3 format, layout role, overlay text, Pinterest-native copy per pin |
| `creative-contrast-qa` | Pass/fail QA on a creative — text-over-face/product, pixel contrast, platform safe-area, size floor |
| `shoot-brief-builder` | A photographer-ready shoot brief: shot list, lighting/mood, set/prop notes, deliverable specs |
| `competitor-profiler` | A structured competitor profile: 8 sourced dimensions + a synthesis line, every claim tagged Sourced/Inference/Unconfirmed |
| `market-map-lite` | A category landscape map: segments with named players, sourced claims, confidence-tagged placements, and the white-space read |
| `positioning-one-pager` | A standing positioning one-pager: alternatives honestly framed (real strengths named first), the honest gap, and where the brand sits in it |
| `pricing-page-teardown` | A pricing-psychology read of one pricing page: tier map, value-axis audit (never gated twice), anchor/decoy detection, enterprise-row honesty |
| `launch-readiness-scorecard` | A launch-plan readiness scorecard: per-dimension grades (channels, assets, measurement, positioning, sequencing, rollback) + the fix each gap needs |
| `buyer-snapshot` | A sourced buyer-evidence snapshot: segments backed by review/community/case-study evidence, purchase triggers, ranked decision criteria, confidence-tagged |
| `agent-readiness-checker` | A five-dimension agent-readiness scorecard for a site: llms.txt quality, schema.org coverage, brand-context consistency, MCP discoverability, extraction-readiness |
| `brand-context-injector` | A brand-aware agent stack: Jinn MCP registration (or llms.txt/brand.json fallback) + a persistent CLAUDE.md stanza — one-time setup, not a read |
| `suite-orchestrator` | A diagnosed, sequenced routing plan across this catalog for a vague marketing ask: which skills, what order, why, and the handoff |
| `video-hook-analyzer` | A hook-strength read for a video opening: hook type named, retention risks flagged with fixes, STRONG/WORKABLE/WEAK verdict |
| `ugc-script-writer` | A UGC-format video script: creator-voice, direct-response spine, shot/beat timing, claim slots the creator fills with their real experience |
| `storyboard-from-dna` | A shot-by-shot storyboard with a locked continuity spine, ready for a director, editor, or AI-video render pipeline |

Personas — 29 installable marketing agents, each complete on its own and sharper with a brand connected — live in [`agents/`](./agents/).

## Install

```bash
npx skills add JinnWorks/jinn-skills
```

Works across 70+ agents via [skills.sh](https://skills.sh). Or install manually:

```bash
git clone https://github.com/JinnWorks/jinn-skills.git
cp -r jinn-skills/skills/* ~/.claude/skills/       # Claude Code
# or point your agent's skills directory at jinn-skills/skills
```

Claude Code, Codex, and Gemini CLI auto-discover `skill-name/SKILL.md`. **Cursor** has no native skill discovery — paste a skill's body into your prompt, or reference the file directly.

## Connect to Jinn

The skills speak MCP natively — no client code, no npm package. Point your agent at Jinn's gateway and give it a token.

### 1. Get a demo token

```bash
curl -X POST https://app.jinn.works/api/agents/request-demo-token
```

Returns a short-lived token that can read the **public Brand DNA projection** for three showcase brands (`paleo-pro`, `bloombelly`, `better-weather`). The token is shown once.

**Usage transparency:** when a skill in this catalog requests a demo token, it includes its own name (e.g. `{"skill":"brand-voice-checker"}`) so we can see which skills people actually use. That's the entire payload — no content, no identity, nothing else. The field is optional; a bare request (like the one above) works identically.

### 2. Add the MCP server

`.mcp.json`:

```json
{
  "mcpServers": {
    "jinn": {
      "type": "http",
      "url": "https://app.jinn.works/api/mcp",
      "headers": { "Authorization": "Bearer ${JINN_MCP_TOKEN}" }
    }
  }
}
```

`.env`:

```
JINN_MCP_TOKEN=jmcp_...   # the token from step 1
```

> **Claude Code header-substitution caveat** ([anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)): some versions send `${JINN_MCP_TOKEN}` literally instead of expanding it. If a call returns `token_malformed`, use the CLI form, which is known-good:
> ```bash
> claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
>   --header "Authorization: Bearer jmcp_your_token_here"
> ```

### 3. Verify the connection

Run the `know-your-brand-dna` skill (or just ask your agent to call `get_token_context`). It'll list the brands your token can reach and read one back. Then run any other skill with a brand in scope — the deliverable comes back anchored to that brand.

### Tools your token can call

Your token's plan is the `tier` field that `get_token_context` returns: `demo` (the free token above, showcase brands only), then `connected`, `brand`, and `agency`. Each tier reaches everything the tier below it does. A tool above your tier doesn't appear in `tools/list` at all.

| Tool | Tier | What it returns |
|------|------|-----------------|
| `ping` | Any | A health check that the gateway is reachable |
| `get_token_context` | Any | Your token's plan (`tier`), subscription status (`subscription_status`, plus `grace_warning` and `renewal_url` when a payment is past due), allowed brands, scopes, and expiry |
| `get_brand_dna_public` | Any | A brand's bounded DNA projection (identity, voice, positioning angle, strategy layer: messaging pillars, pain points, audience tribes) by slug |
| `get_brand_design_tokens` | Any tier for brands that opted in to public design export; Brand tier for your own brand otherwise | The brand's DTCG design tokens — color, type, spacing, radius, motion |
| `get_brand_design_md` | Any tier for brands that opted in to public design export; Brand tier for your own brand otherwise | Render-ready visual guidelines (grid, do/don't, conventions) as `design.md` |
| `ask_brand` | Connected and up | Answers a question from the brand's record: the matched facts (each with its source) plus a coverage note listing what it could answer and the genuine gaps. At Brand tier it also matches the full DNA and per-product fields. The question text is logged so the brand owner can see what was asked. |
| `get_brand_kit` | Brand and up | Render-ready brand kit: colors, fonts, logo, name, spacing |
| `get_brand_dna` | Brand and up | The full canonical Brand DNA, including product and commercial fields and the competitive playbook |
| `get_brand_products` | Brand and up | Per-product detail: name, description, category, form factor, hero ingredients, ingredients, certifications and claims, dimensions, weight, URL |
| `get_brand_design_system` | Brand and up | The design system measured from the brand's live site; every value carries a confidence |
| `list_design_extraction_runs` | Brand and up | The design-extraction runs recorded for the brand |
| `get_product_design_system` | Brand and up | One product page's measured design, as overrides of the brand's design system |

`get_brand_dna_public` serves a **curated subset** at every tier — competitive intelligence, pricing, and internal metadata are never in it. The full canonical DNA is `get_brand_dna`, at Brand tier and up.

### If a call fails

Every failure carries a machine-readable code in the JSON-RPC error `data.code`:

| Code | Meaning | What to do |
|------|---------|-----------|
| `token_expired` | Demo token past its expiry | Request a new one (step 1) |
| `token_revoked` | Token was revoked | Request a new one |
| `token_malformed` | Bad `Authorization` header (often the substitution bug) | Use the `claude mcp add --header` form above |
| `not_found` (tool error) | Brand not in your token's allowlist (or no such brand) | Call `get_token_context` to see which brands you can read |
| `tier_required` (tool error) | The tool needs a higher plan (`data.required_tier` names it) | The error carries `data.upgrade_url`; the skill falls back to its lower rung and says so |

Each skill also surfaces its own remediation line for these states, so a connected skill falls back cleanly to its standalone form rather than erroring out.

## License

MIT — see [LICENSE](./LICENSE).

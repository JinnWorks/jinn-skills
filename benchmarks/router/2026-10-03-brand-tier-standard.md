# Router activation benchmark — 2026-10-03

> Mode: **standard** (routine cost-bounded regression run). The cited public claim comes from a **deep** run — see README.

> ⚠ **Partial run** — the $20 budget ceiling was reached after 245/350 calls.

Measures whether the correct skill ranks first (top-1) or in the top three (top-3) for a realistic task, given only the catalog's names + descriptions — exactly what a buyer's agent sees.

## Per-model activation accuracy (original wording)

| Model | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| haiku | 175 | 98.9% | 100.0% | 1 |
| sonnet | 70 | 97.1% | 100.0% | 0 |
| **all** | 245 | 98.4% | 100.0% | 1 |

_Top-1/top-3 are over successfully-parsed calls; format failures are reported separately._

## Per-tier activation (original wording)

| Tier | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| core | 211 | 98.6% | 100.0% | 1 |
| hard | 34 | 97.1% | 100.0% | 0 |

_The **hard** tier is the true-frontier sibling-confusion set — where a description regression shows first._

## Per-skill top-1 (worst first, original wording)

| Skill (expected primary) | Prompts×reps | Top-1 |
|---|---|---|
| `community-value-planner` | 2 | 50.0% |
| `topical-authority-mapper` | 3 | 66.7% |
| `buyer-persona-generator` | 8 | 75.0% |
| `competitor-positioning-map` | 6 | 83.3% |
| `linkedin-content` | 9 | 100.0% |
| `x-content` | 4 | 100.0% |
| `content-rotation` | 8 | 100.0% |
| `brand-voice-content` | 5 | 100.0% |
| `ad-copy-variants` | 9 | 100.0% |
| `email-sequence` | 7 | 100.0% |
| `outbound-message-writer` | 7 | 100.0% |
| `customer-story-builder` | 7 | 100.0% |
| `messaging-ab-tester` | 8 | 100.0% |
| `campaign-brief` | 5 | 100.0% |
| `launch-positioning` | 9 | 100.0% |
| `product-launch-playbook` | 8 | 100.0% |
| `battlecard-generator` | 6 | 100.0% |
| `brand-guardrails-review` | 6 | 100.0% |
| `brand-messaging-audit` | 5 | 100.0% |
| `marketing-decision` | 4 | 100.0% |
| `know-your-brand-dna` | 4 | 100.0% |
| `on-brand-artifact-builder` | 6 | 100.0% |
| `seo-content-brief` | 5 | 100.0% |
| `ai-visibility-snapshot` | 5 | 100.0% |
| `llms-txt-generator` | 4 | 100.0% |
| `agent-access-checker` | 6 | 100.0% |
| `brand-voice-checker` | 4 | 100.0% |
| `brand-fact-checker` | 4 | 100.0% |
| `claim-provenance-checker` | 6 | 100.0% |
| `content-atomizer` | 5 | 100.0% |
| `content-cadence-grader` | 5 | 100.0% |
| `social-listening-brief` | 2 | 100.0% |
| `citability-checker` | 3 | 100.0% |
| `hook-and-lede-writer` | 4 | 100.0% |
| `calendar-planner` | 2 | 100.0% |
| `citation-source-mapper` | 2 | 100.0% |
| `programmatic-seo-planner` | 3 | 100.0% |
| `query-fanout-explorer` | 1 | 100.0% |
| `topic-gap-analyzer` | 3 | 100.0% |
| `ad-teardown` | 2 | 100.0% |
| `aeo-formatter` | 5 | 100.0% |
| `swipe-brief-builder` | 5 | 100.0% |
| `creative-contrast-qa` | 2 | 100.0% |
| `review-to-adcopy` | 2 | 100.0% |
| `offer-angle-generator` | 2 | 100.0% |
| `pin-brief-generator` | 2 | 100.0% |
| `shoot-brief-builder` | 3 | 100.0% |
| `competitor-profiler` | 1 | 100.0% |
| `market-map-lite` | 2 | 100.0% |
| `positioning-one-pager` | 2 | 100.0% |
| `pricing-page-teardown` | 3 | 100.0% |
| `launch-readiness-scorecard` | 1 | 100.0% |
| `buyer-snapshot` | 2 | 100.0% |
| `brand-context-injector` | 3 | 100.0% |
| `suite-orchestrator` | 1 | 100.0% |
| `video-hook-analyzer` | 4 | 100.0% |
| `ugc-script-writer` | 1 | 100.0% |
| `agent-readiness-checker` | 1 | 100.0% |
| `storyboard-from-dna` | 1 | 100.0% |

## Run config (reproducibility)

- Mode: `standard` (PARTIAL — budget ceiling hit)
- Models: haiku, sonnet
- Replications: 1
- Core prompts: `benchmarks/router/prompts.jsonl`
- Hard tier: `benchmarks/router/prompts-hard.jsonl`
- Prompts loaded: 175  ·  Paraphrase variants/prompt: 0
- Total calls: 245 of 350 planned  ·  Concurrency: 3
- Format failures: 1/245 original (0.4%)
- Budget ceiling: $20
- Approx. cost (sum of `total_cost_usd`): $20.32 — API-equivalent estimate only; this run used the Claude subscription CLI (no API key), so nothing was billed. The $20 ceiling cut it at 245/350; the sonnet hard tier is under-sampled.
- Wall clock: 1146s
- Command: `node scripts/run-router-benchmark.mjs --standard --concurrency 3 --out benchmarks/router/2026-10-03-brand-tier-standard.md`
- Generated: 2026-10-03T16:36:03.102Z

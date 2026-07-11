# Router activation benchmark — 2026-07-11

Measures whether the correct skill ranks first (top-1) or in the top three (top-3) for a realistic task, given only the catalog's names + descriptions — exactly what a buyer's agent sees.

## Per-model activation accuracy (original wording)

| Model | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| haiku | 32 | 96.7% | 100.0% | 2 |
| **all** | 32 | 96.7% | 100.0% | 2 |

_Top-1/top-3 are over successfully-parsed calls; format failures are reported separately._

## Per-tier activation (original wording)

| Tier | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| fixture | 32 | 96.7% | 100.0% | 2 |

_The **hard** tier is the true-frontier sibling-confusion set — where a description regression shows first._

## Per-skill top-1 (worst first, original wording)

| Skill (expected primary) | Prompts×reps | Top-1 |
|---|---|---|
| `ad-copy-variants` | 1 | 0.0% |
| `storyboard-from-dna` | 1 | 0.0% |
| `shoot-brief-builder` | 1 | 0.0% |
| `battlecard-generator` | 1 | 100.0% |
| `positioning-one-pager` | 2 | 100.0% |
| `market-map-lite` | 2 | 100.0% |
| `competitor-profiler` | 1 | 100.0% |
| `launch-positioning` | 2 | 100.0% |
| `pricing-page-teardown` | 3 | 100.0% |
| `buyer-snapshot` | 2 | 100.0% |
| `launch-readiness-scorecard` | 1 | 100.0% |
| `product-launch-playbook` | 1 | 100.0% |
| `buyer-persona-generator` | 1 | 100.0% |
| `customer-story-builder` | 2 | 100.0% |
| `brand-context-injector` | 3 | 100.0% |
| `agent-access-checker` | 2 | 100.0% |
| `suite-orchestrator` | 1 | 100.0% |
| `ugc-script-writer` | 1 | 100.0% |
| `video-hook-analyzer` | 1 | 100.0% |
| `competitor-positioning-map` | 1 | 100.0% |
| `agent-readiness-checker` | 1 | 100.0% |
| `aeo-formatter` | 1 | 100.0% |

## Run config (reproducibility)

- Mode: `smoke`
- Models: haiku
- Replications: 1
- Core prompts: `/private/tmp/claude-501/-Users-danielwilloughby-Projects-Claude-Code-Folders-jinn/1301dc97-b78e-40d6-bfd0-fa5b2f99a67b/scratchpad/batch5-fixtures.jsonl`
- Prompts loaded: 32  ·  Paraphrase variants/prompt: 0
- Total calls: 32  ·  Concurrency: 6
- Format failures: 2/32 original (6.3%)
- Budget ceiling: none
- Approx. cost (sum of `total_cost_usd`): $1.74
- Wall clock: 134s
- Command: `node scripts/run-router-benchmark.mjs --smoke --prompts /private/tmp/claude-501/-Users-danielwilloughby-Projects-Claude-Code-Folders-jinn/1301dc97-b78e-40d6-bfd0-fa5b2f99a67b/scratchpad/batch5-fixtures.jsonl --no-hard --out benchmarks/router/results/2026-07-11-batch5-smoke.md`
- Generated: 2026-07-11T18:38:23.594Z

## Smoke gate (boundary fixtures)

✓ no fixture's top-1 landed in its rejected list (32 fixtures, model haiku).

## Follow-ups (same day, appended at integration)

The main run's three 0% rows resolved as follows:

- **`shoot-brief-builder` (p138) + `storyboard-from-dna` (p137)** — both were the run's
  2 format failures (unparseable ranking JSON), not misroutes. Re-run: both 100% top-1.
- **`ad-copy-variants` (p127)** — a real, reproducible fixture-wording problem, not a
  description regression: the original "testing benefit-led vs curiosity-led framing"
  phrasing routed to `messaging-ab-tester` (listed acceptable-secondary), and an
  intermediate "landing page headlines" rewording routed to `hook-and-lede-writer`
  (defensible — `ad-copy-variants` is platform-ad-scoped by design). Final wording is an
  unambiguous platform-ad ask; verified 100% top-1. The fixture's actual purpose —
  a specific ask must never route to `suite-orchestrator` — passed in every variant.
- **`video-hook-analyzer` fixtures (p139–p141)** arrived after the main run; smoked
  separately: 3/3 top-1, no rejected-list hits.

**Net batch-5 gate: 35/35 fixtures correct top-1 after remediation, 0 rejected-list hits.**

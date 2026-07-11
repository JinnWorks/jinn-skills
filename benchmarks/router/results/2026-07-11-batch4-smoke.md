# Router smoke — batch-4 Vermeer-lane fixtures (2026-07-11)

Smoke gate over the 20 new boundary fixtures (p87–p106) added with the batch-4 skills:
review-to-adcopy, ad-teardown, swipe-brief-builder, offer-angle-generator,
pin-brief-generator, creative-contrast-qa, shoot-brief-builder.

**Result: 20/20 correct top-1 (100%), 0 format failures, and no fixture's top-1 landed
in its rejected list.** This is the cheap per-batch gate, not the full 3-model catalog
benchmark — that run happens once the roster stabilizes after batch 5.

## Per-skill (top-1 accuracy, haiku)

| Skill | Fixtures | Top-1 |
|---|---|---|
| `swipe-brief-builder` | 5 | 100.0% |
| `ad-teardown` | 2 | 100.0% |
| `creative-contrast-qa` | 2 | 100.0% |
| `brand-guardrails-review` | 1 | 100.0% |
| `offer-angle-generator` | 2 | 100.0% |
| `ad-copy-variants` | 1 | 100.0% |
| `review-to-adcopy` | 2 | 100.0% |
| `messaging-ab-tester` | 1 | 100.0% |
| `pin-brief-generator` | 2 | 100.0% |
| `shoot-brief-builder` | 2 | 100.0% |

## Run config (reproducibility)

- Mode: `smoke`
- Models: haiku
- Replications: 1
- Prompts loaded: 20 · Paraphrase variants/prompt: 0
- Total calls: 20 · Concurrency: 6
- Format failures: 0/20 original (0.0%)
- Approx. cost (sum of `total_cost_usd`): $1.10 (notional — OAuth/Max quota)
- Wall clock: 261s
- Command: `node scripts/run-router-benchmark.mjs --smoke --prompts <batch4-fixtures subset of benchmarks/router/prompts.jsonl>`
- Generated: 2026-07-11T17:50:09.429Z

## Smoke gate (boundary fixtures)

✓ no fixture's top-1 landed in its rejected list (20 fixtures, model haiku).

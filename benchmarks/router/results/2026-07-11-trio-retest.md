# Router activation benchmark — 2026-07-11

Measures whether the correct skill ranks first (top-1) or in the top three (top-3) for a realistic task, given only the catalog's names + descriptions — exactly what a buyer's agent sees.

## Per-model activation accuracy

| Model | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| haiku | 6 | 100.0% | 100.0% | 0 |
| sonnet | 6 | 100.0% | 100.0% | 0 |
| opus | 6 | 100.0% | 100.0% | 0 |
| **all** | 18 | 100.0% | 100.0% | 0 |

_Top-1/top-3 are over successfully-parsed calls; format failures are reported separately._

## Per-skill top-1 (worst first)

| Skill (expected primary) | Prompts×reps | Top-1 |
|---|---|---|
| `brand-voice-checker` | 6 | 100.0% |
| `brand-guardrails-review` | 6 | 100.0% |
| `brand-messaging-audit` | 6 | 100.0% |

## Run config (reproducibility)

- Mode: `full`
- Models: haiku, sonnet, opus
- Replications: 1
- Prompts: `/tmp/retest.jsonl` (6 prompts)
- Total calls: 18  ·  Concurrency: 6
- Format failures: 0/18 (0.0%)
- Approx. cost (sum of `total_cost_usd`): $4.24
- Wall clock: 74s
- Command: `node scripts/run-router-benchmark.mjs --prompts /tmp/retest.jsonl --models haiku,sonnet,opus --reps 1`
- Generated: 2026-07-11T15:35:07.308Z

# Router activation benchmark — 2026-07-11

> Mode: **standard** (routine cost-bounded regression run). The cited public claim comes from a **deep** run — see README.

Measures whether the correct skill ranks first (top-1) or in the top three (top-3) for a realistic task, given only the catalog's names + descriptions — exactly what a buyer's agent sees.

## Per-model activation accuracy (original wording)

| Model | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| haiku | 3 | 100.0% | 100.0% | 0 |
| sonnet | 3 | 100.0% | 100.0% | 0 |
| **all** | 6 | 100.0% | 100.0% | 0 |

_Top-1/top-3 are over successfully-parsed calls; format failures are reported separately._

## Per-tier activation (original wording)

| Tier | Prompts×reps | Top-1 | Top-3 | Format failures |
|---|---|---|---|---|
| core | 6 | 100.0% | 100.0% | 0 |

_The **hard** tier is the true-frontier sibling-confusion set — where a description regression shows first._

## Per-skill top-1 (worst first, original wording)

| Skill (expected primary) | Prompts×reps | Top-1 |
|---|---|---|
| `content-atomizer` | 4 | 100.0% |
| `linkedin-content` | 2 | 100.0% |

## Run config (reproducibility)

- Mode: `standard`
- Models: haiku, sonnet
- Replications: 1
- Core prompts: `/private/tmp/claude-501/-Users-danielwilloughby-Projects-Claude-Code-Folders-jinn/38aa16c7-d205-4926-92ad-b774639a51b3/scratchpad/atomizer-fixtures.jsonl`
- Prompts loaded: 3  ·  Paraphrase variants/prompt: 0
- Total calls: 6  ·  Concurrency: 6
- Format failures: 0/6 original (0.0%)
- Budget ceiling: $20
- Approx. cost (sum of `total_cost_usd`): $0.96
- Wall clock: 40s
- Command: `node scripts/run-router-benchmark.mjs --standard --prompts /private/tmp/claude-501/-Users-danielwilloughby-Projects-Claude-Code-Folders-jinn/38aa16c7-d205-4926-92ad-b774639a51b3/scratchpad/atomizer-fixtures.jsonl --no-hard --reps 1 --models haiku,sonnet --concurrency 6`
- Generated: 2026-07-11T15:47:49.319Z

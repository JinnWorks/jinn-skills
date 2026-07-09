# Activation measurement

Does the right skill load for a given task? A skill's frontmatter `description` is
the only thing a buyer's agent sees before deciding whether to run it — so
description quality *is* activation accuracy. This directory measures it.

Three pieces:

| Piece | What it does | Runs in CI? |
|-------|--------------|-------------|
| **Router benchmark** (`scripts/run-router-benchmark.mjs`) | Ranks skills for realistic tasks using only names + descriptions; reports top-1 / top-3 per model and per skill. | No — needs `claude -p` (local only) |
| **Boundary fixtures** (`fixtures/activation-cases.jsonl`) | The hardest sibling-confusion cases, run in a cheap `--smoke` gate. | No — same `claude -p` dependency |
| **Skill-health lint** (`scripts/skill-health.mjs`) | Deterministic, zero-LLM corpus lint: house anatomy, README↔directory parity, dead links. | **Yes** — wired into `.github/workflows/validate.yml` |

The benchmark and smoke gate shell out to `claude -p` (headless Claude Code), which
cannot run in CI. They are **local-only** commands. The skill-health lint is pure
Node and runs on every push/PR beside `validate-skills.mjs`.

## Router benchmark (local)

```bash
# Full run: 3 models (haiku, sonnet, opus) × 3 replications × all router prompts.
# ~470 calls; writes benchmarks/router/results/<date>.md.
node scripts/run-router-benchmark.mjs --full

# Smoke gate: fixtures only, 1 model (haiku), 1 replication. Exits 1 if any
# fixture's top-1 lands in that fixture's rejected list.
node scripts/run-router-benchmark.mjs --smoke
```

Requires an authenticated local Claude Code (`claude -p` must work). Zero npm
dependencies — Node ≥20 stdlib only. Useful flags: `--models a,b,c`, `--reps N`,
`--concurrency N`, `--prompts <path>`, `--out <path>`, `--limit N` (first N prompts,
for testing the runner itself).

Each call feeds the model `routing-prompt.md` with the live catalog (names +
descriptions, never skill bodies) and one task, and expects strict JSON
(`{"ranking":[...],"confidence":0.0-1.0,"rationale":"..."}`). Malformed output is
retried once, then recorded as a format failure.

### Files

- `router/prompts.jsonl` — ~50 realistic tasks (2–3 per skill, weighted to hard
  sibling boundaries), each with `expected_primary_skill`, `acceptable_secondary_skills`,
  `rejected_skills`, and a one-line `reason`.
- `router/routing-prompt.md` — the strict-JSON routing template.
- `router/results/<date>.md` — published results with the full run config for
  reproducibility.
- `fixtures/activation-cases.jsonl` — the ~20 hardest sibling-boundary cases (same
  schema), used by the smoke gate.

Prompts respect the gateway's projection walls: no prompt implies the gateway
serves competitor data, marketing-truth, record IDs, cross-brand reads, or any
other surface a public token can't see. Competitor names, when present, are always
supplied by the user.

## Skill-health lint (CI + local)

```bash
node scripts/skill-health.mjs          # human report; exit 1 on hard failure
node scripts/skill-health.mjs --json   # machine-readable
```

Hard failures (block): a missing house-anatomy section (`## Procedure`, a
`## When a … call fails` block, the invariant `get_token_context` →
`get_brand_dna_public` sequence), or a README↔directory parity break (skill table
vs `skills/`, persona count vs `agents/`). Warnings (don't block): description
outside the ~250–350 char band, a description missing the house closer, a missing
field→Drives table, a missing footer, or a dead relative link.

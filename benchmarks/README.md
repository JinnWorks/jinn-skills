# Activation measurement

Does the right skill load for a given task? A skill's frontmatter `description` is
the only thing a buyer's agent sees before deciding whether to run it — so
description quality *is* activation accuracy. This directory measures it.

Three pieces:

| Piece | What it does | Runs in CI? |
|-------|--------------|-------------|
| **Router benchmark** (`scripts/run-router-benchmark.mjs`) | Ranks skills for realistic tasks using only names + descriptions; reports top-1 / top-3 per model, per skill, and **per tier** (core vs hard). | No — needs `claude -p` (local only) |
| **Boundary fixtures** (`fixtures/activation-cases.jsonl`) + **hard tier** (`router/prompts-hard.jsonl`) | The sibling-confusion cases at the true decision frontier — run in the `--smoke` gate and scored as their own tier. | No — same `claude -p` dependency |
| **Skill-health lint** (`scripts/skill-health.mjs`) | Deterministic, zero-LLM corpus lint: house anatomy, README↔directory parity, dead links, stale dates, unbacked numeric claims, claim drift. | **Yes** — wired into `.github/workflows/validate.yml` |
| **Claim sync** (`scripts/sync-readme-claim.mjs`) | Regenerates the README "Measured activation" block from a results file, so the published numbers are never hand-typed. | Local (zero-LLM; `--check` is CI-safe) |

The benchmark and smoke gate shell out to `claude -p` (headless Claude Code), which
cannot run in CI. They are **local-only** commands. The skill-health lint and claim
sync are pure Node; the lint runs on every push/PR beside `validate-skills.mjs`.

## Router benchmark (local)

```bash
# Standard run (routine gate): haiku + sonnet × 1 rep × (core + hard prompts).
# Stays under the --budget ceiling (default $20). Dispatch stops if the ceiling is hit.
node scripts/run-router-benchmark.mjs --standard

# Same, with paraphrase-robustness on the hard tier (reworded, same intent):
node scripts/run-router-benchmark.mjs --standard --paraphrase 2 --paraphrase-tier hard

# Deep run (backs the cited public claim): haiku + sonnet + opus × 3 reps. ~$50, opt-in.
node scripts/run-router-benchmark.mjs --deep      # alias: --full

# Smoke gate: fixtures only, 1 model (haiku), 1 replication. Exits 1 if any
# fixture's top-1 lands in that fixture's rejected list.
node scripts/run-router-benchmark.mjs --smoke
```

Requires an authenticated local Claude Code (`claude -p` must work). Zero npm
dependencies — Node ≥20 stdlib only. Useful flags: `--models a,b,c`, `--reps N`,
`--concurrency N`, `--prompts <path>`, `--hard <path>` / `--no-hard`, `--paraphrase N`,
`--paraphrase-tier <tier>`, `--budget N`, `--out <path>`, `--limit N` (first N core
prompts, for testing the runner itself).

**Standard vs deep — and why the public claim cites deep.** The standard run drops
opus (the cost driver) and runs one replication, so it is cheap enough for routine
regression checks but is a 2-model result. The cited README claim must be the
strongest *honest* measurement — the deep run (all three frontier models, three
reps) — so `sync-readme-claim.mjs` only promotes a deep/full run, and the
`claim-not-stale` lint flags when a newer deep run exists uncited.

Each call feeds the model `routing-prompt.md` with the live catalog (names +
descriptions, never skill bodies) and one task, and expects strict JSON
(`{"ranking":[...],"confidence":0.0-1.0,"rationale":"..."}`). Malformed output is
retried once, then recorded as a format failure. Headline top-1/top-3 are scored on
**original wording only**; paraphrase variants feed a separate robustness section.

### Files

- `router/prompts.jsonl` — ~50 realistic tasks (2–3 per skill, weighted to hard
  sibling boundaries), each with `expected_primary_skill`, `acceptable_secondary_skills`,
  `rejected_skills`, and a one-line `reason`.
- `router/prompts-hard.jsonl` — the hard tier: true-frontier cases where two skills
  legitimately compete under realistic wording. `reason` names the distinguishing
  signal. Scored and reported as its own tier — this is where a description
  regression shows first.
- `router/routing-prompt.md` — the strict-JSON routing template.
- `router/results/<date>.md` — published results with the full run config for
  reproducibility.
- `fixtures/activation-cases.jsonl` — the sibling-boundary cases used by the smoke gate.

Prompts respect the gateway's projection walls: no prompt implies the gateway
serves competitor data, marketing-truth, record IDs, cross-brand reads, or any
other surface a public token can't see. Competitor names, when present, are always
supplied by the user.

**Paraphrase is deterministic, zero-LLM.** Variants are meaning-preserving
conversational envelopes (a leading "Hey —", a trailing "Thanks!"), never a
semantic/synonym rewrite — generating variants with an LLM would leak model
behaviour into the benchmark's own inputs. They test that routing isn't overfit to
a fixture's exact phrasing, not robustness to genuinely different asks.

## Skill-health lint (CI + local)

```bash
node scripts/skill-health.mjs             # human report; exit 1 on hard failure
node scripts/skill-health.mjs --json      # machine-readable
node scripts/skill-health.mjs --selftest  # exercise the heuristic detectors
```

Hard failures (block): a missing house-anatomy section (`## Procedure`, a
`## When a … call fails` block, the invariant `get_token_context` →
`get_brand_dna_public` sequence), or a README↔directory parity break (skill table
vs `skills/`, persona count vs `agents/`). Warnings (don't block): description
outside the ~250–350 char band, a description missing the house closer, a missing
field→Drives table, a missing footer, a dead relative link, a **stale date** (an
ISO date older than `--stale-days`, default 180), an **unbacked numeric claim** (a
`%`/`x`/N-of-M/N+ claim in prose with no adjacent link, footnote, or `benchmarks/`
reference — deliverable counts like "5 headlines" are not claims and never flag),
or **claim drift** (`claim-not-stale`: a newer deep run exists but the README still
cites an older one — re-run `sync-readme-claim.mjs` to re-cite). New heuristic
checks land as warnings so a green corpus stays green; `--selftest` guards them
against regression.

## Claim sync (local; `--check` is CI-safe)

```bash
node scripts/sync-readme-claim.mjs                    # reproduce the block from the currently-cited results file (no-op if in sync)
node scripts/sync-readme-claim.mjs --from benchmarks/router/results/<date>.md   # promote a new DEEP run to the public claim
node scripts/sync-readme-claim.mjs --check            # exit 1 if README is out of sync (no writes)
```

The README claim block lives between `<!-- measured-activation:start -->` and
`<!-- measured-activation:end -->`; everything outside the markers is untouched.
The generator reads only measured facts (prompt count, models, reps, trials,
top-1, format failures, skill count) from the results file — it never invents a
number. Only a full/deep run should back the public claim.

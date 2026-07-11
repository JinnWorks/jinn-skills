---
name: suite-orchestrator
description: Diagnose a vague, multi-front marketing ask — "traffic's flat," "brand feels inconsistent" — into a sequenced plan across the free skill catalog — which skills, what order, why, and the handoff. Use only for broad, unscoped asks; a specific ask routes to that skill directly, never here. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Suite Orchestrator

Deliverable: **a diagnosed, sequenced routing plan** — which skills in this catalog apply to a vague ask, in what order, the one-line reason for each, and what each hands to the next. This skill doesn't do the marketing work itself; it decides which of the other skills in the catalog should, and in what sequence, so a broad ask turns into a concrete first move instead of a shrug.

## Read this first — when NOT to use this skill

This is the one skill in the catalog where getting invoked on the wrong ask is worse than not being invoked at all. If the ask already names a concrete deliverable and a single clear input — "write me three ad-copy variants for this landing page," "build a battlecard against Acme," "check if our robots.txt blocks GPTBot" — that ask already knows which skill it wants. Name that skill and stop; running the full diagnosis below on an ask that isn't lost is just overhead standing between the user and the answer.

This skill exists for the other case: the ask names a symptom ("flat," "inconsistent," "nothing's ready") or a scope ("where do we even start") without naming a deliverable. That's a diagnosis problem before it's a production problem, and diagnosis is what this skill does.

## The deliverable

```
ROUTING PLAN — <the ask, restated in one line>

Diagnosis: <1-3 domains this most likely traces to, and why>

Sequence:
  1. <skill-name>          — <one-line reason this runs first>
     → hands off: <what it produces, and what the next step does with it>
  2. <skill-name>          — <reason>
     → hands off: <...>
  3. <skill-name>          — <reason>
     → hands off: <...>

Where this could re-route: <the one finding from step 1 that would change the rest of the plan>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake the ask verbatim

Capture what was actually said, not a cleaned-up version of it. The exact words ("flat," "nothing's ready," "inconsistent") are the diagnostic signal — don't paraphrase them away before step 3.

### 2. Check the escape hatch

Before diagnosing anything: does this ask already name one skill's deliverable? If yes, stop here and hand off directly — see **When NOT to use this skill** above.

### 3. Diagnose — locate the domain(s)

Match the ask against the five domains below. Most vague asks land mostly in one domain with a secondary domain worth flagging; a genuinely all-fronts ask ("everything feels ad hoc") spans three or more, and that's a real diagnosis, not a failure to narrow down.

| Domain | The question it answers | Symptom language that points here |
|--------|--------------------------|-------------------------------------|
| **A. AI & search visibility** | Do buyers and AI answer engines even find us? | "traffic's flat," "nobody finds us," "we don't show up in ChatGPT," "SEO is dead" |
| **B. Content engine** | Is what we publish consistent, on-cadence, and worth citing? | "inconsistent," "off-brand," "we post ad hoc," "can't keep up," "content feels generic" |
| **C. Creative & ads** | Are the ads/creative actually converting, and do we know why? | "ads aren't working," "creative feels stale," "need new angles," a specific asset in hand |
| **D. Positioning & strategy** | Do we know what we stand for, versus whom, and can we prove it? | "losing deals," "can't explain what we do," "where do we stand vs [rival]," "the pitch doesn't land" |
| **E. Launch & campaign execution** | Is a specific push (launch, campaign) sequenced and resourced? | "launching in N weeks," "nothing's ready," "need a campaign plan" |

If the ask genuinely doesn't match any row's symptom language and is still too vague to route ("help with marketing," "where do we start"), don't guess — ask one clarifying question naming the five domains above and let the user point.

### 4. Route — pull candidates from the domain index

Once you have the domain(s), pull the specific skills from the index below. Don't run every skill in a matched domain — that's not a plan, it's a dump. Pick the 2-4 that actually chain: one diagnostic step (find out what's true), one or two fix steps (do something about it), and — only if the ask implies ongoing output — one systemize step.

### 5. Sequence — order by dependency, not by domain order

The sequencing taste that governs every plan this skill produces:

- **Diagnose before you generate.** A skill that scores or audits ("is this true / is this working") runs before a skill that writes or builds.
- **Positioning before content or creative.** If the wedge itself is shaky, every downstream draft inherits the shakiness — settle positioning first, even if the original ask was about content or ads.
- **Brief before draft.** A brief/angle skill (`swipe-brief-builder`, `seo-content-brief`, `campaign-brief`) precedes the skill that writes the actual copy from it.
- **One-shot before systemize.** Fix the immediate thing before building the cadence/calendar that prevents it recurring — a calendar built on an unfixed problem just automates the problem.
- **Named-competitor questions need a name first.** If rivals aren't named yet, `market-map-lite` (inventory the category) precedes `competitor-positioning-map` or `competitor-profiler` (which both assume you already know who you're plotting).
- **Draft before grade.** A skill that writes an artifact (`ugc-script-writer`'s script, `product-launch-playbook`'s plan) precedes the skill built to grade what it produced (`video-hook-analyzer`, `launch-readiness-scorecard`) — grading needs something to grade, not a description of one.
- **Setup precedes everything, once.** If this is the first time the session is working on this brand and no persistent Jinn context is wired in yet, `brand-context-injector` runs before step 1 of any sequence below — it's step 0, not part of the sequence, because every other skill's grounded rung depends on the connection it sets up.

### 6. Deliver

Use the deliverable format above. State the diagnosis's reasoning in one line per domain matched, then the sequence with a handoff for every step, then the one honest re-route condition (below).

## The domain index (the actual catalog, grouped)

**Outside the five domains:** `brand-context-injector` — registers Jinn's MCP server (or falls back to a public llms.txt/brand.json) and writes a persistent CLAUDE.md stanza so every later skill in the project knows the brand's context and which fields to trust. It's a one-time connection step, not a diagnostic or production one — see the setup-precedes-everything principle above.

**A. AI & search visibility** — start with a read on whether the brand is actually seen, before fixing any one page:
`ai-visibility-snapshot` (are we appearing in AI answers at all) → `agent-access-checker` (can crawlers/agents even reach the site) → `agent-readiness-checker` (once in, does it make sense to them) → `llms-txt-generator` (write the missing manifest) → `topic-gap-analyzer` (what content named rivals have that we don't) → `query-fanout-explorer` (the real sub-query shape behind one buyer question) → `topical-authority-mapper` (our own site's cluster depth + build order) → `aeo-formatter` (rewrite one existing page for extraction) → `programmatic-seo-planner` (a page-set plan at scale) → `citation-source-mapper` (which domains AI actually cites in the category) → `brand-fact-checker` (what AI currently believes about the brand vs reality) → `seo-content-brief` (brief for one new piece of content).

**B. Content engine** — diagnose the pattern before drafting into it:
`brand-voice-checker` (score one piece of pasted copy) → `brand-guardrails-review` (red-line one draft before it ships) → `brand-messaging-audit` (score everything already published against strategy) → `content-cadence-grader` (posting cadence vs named competitors) → `content-atomizer` (one long asset → platform derivatives) → `content-rotation` (what to post where, this week) → `calendar-planner` (the 30-day calendar) → `hook-and-lede-writer` (scored hooks for one topic) → `social-listening-brief` (what's working right now, angles worth taking) → `community-value-planner` (where to genuinely help on Reddit/forums) → `citability-checker` (will this get cited by an answer engine) → `linkedin-content` / `x-content` / `brand-voice-content` (write the actual posts).

**C. Creative & ads** — brief before render, teardown before remix, script before grade:
`review-to-adcopy` (competitor reviews → pain-language hook brief) → `ad-teardown` (analyze one ad or a rival's library) → `swipe-brief-builder` (3 reference ads → one brief) → `offer-angle-generator` (10 offer framings) → `pin-brief-generator` (Pinterest-shaped briefs) → `shoot-brief-builder` (photographer-ready shoot brief) → `storyboard-from-dna` (shot-by-shot board before a shoot/AI render) → `ugc-script-writer` (turn a product + angle into a UGC-format video script) → `video-hook-analyzer` (grade that script's opening for hook strength and retention risk before it's shot) → `ad-copy-variants` (headline/primary-text variants per platform) → `creative-contrast-qa` (QA a rendered creative before it ships).

**D. Positioning & strategy with receipts** — name the rival before you plot or profile it, source the buyer before you persona-ize them:
`claim-provenance-checker` (can this claim actually be sourced) → `pricing-page-teardown` (pricing-psychology read of one existing pricing page) → `market-map-lite` (category landscape when no rival list exists yet) → `competitor-positioning-map` (plot named rivals on two axes) → `competitor-profiler` (one deep, sourced profile) → `positioning-one-pager` (the evergreen positioning doc) → `launch-positioning` (the wedge/enemy/one-liner for a specific launch) → `battlecard-generator` (arm a rep against one named rival) → `buyer-snapshot` (sourced evidence on who actually buys — segments, triggers, ranked criteria, every claim tagged Sourced/Inference/Unconfirmed) → `buyer-persona-generator` (turn one sourced segment into a working persona) → `messaging-ab-tester` (variants to test against each other) → `marketing-decision` (triage one go/no-go call) → `know-your-brand-dna` (sanity-check the connected record itself).

**E. Launch & campaign execution** — positioning settled, now sequence, grade, and produce:
`product-launch-playbook` (phased launch plan) → `launch-readiness-scorecard` (grade that plan across channels/assets/measurement/positioning-lock/stage-gates/rollback before committing resources to it) → `campaign-brief` (one-page brief the team builds against) → `customer-story-builder` (case study) → `outbound-message-writer` (cold first-touch) → `email-sequence` (lifecycle emails) → `on-brand-artifact-builder` (the actual HTML deck/section/carousel).

## Canonical routing patterns (worked examples)

**"Traffic's flat."** (Domain A, visibility.) `ai-visibility-snapshot` — first, find out if the brand shows up in AI answers at all; a flat-traffic complaint is often actually an invisibility problem. → hands off: which buyer-intent queries came back empty. `agent-access-checker` — rule out a closed door (blocked crawlers, missing llms.txt) before blaming content. → hands off: a clean/blocked verdict. `topic-gap-analyzer` — if the door's open and visibility is still thin, find what rivals cover that this site doesn't. → hands off: a ranked gap list. `seo-content-brief` — brief the highest-weight gap into a piece worth writing.

**"We're launching in 6 weeks and nothing's ready."** (Domain E, with D underneath.) `launch-positioning` — settle the wedge/enemy/one-liner first; every asset below assumes this is decided. → hands off: the one-liner and the pillars. `product-launch-playbook` — phase the 6 weeks into pre/launch/post with the assets each needs. → hands off: the asset list and sequence. `launch-readiness-scorecard` — grade the phased plan across its six dimensions before the team commits real time to it; catching a missing rollback plan or an unlocked positioning now is cheap, catching it in week 5 isn't. → hands off: the gaps to close before anything fires. `campaign-brief` — turn the graded plan's launch-week beat into the one-pager the team builds against. → hands off: audience/message/channels the creative skills in Domain C draft against.

**"Our brand feels inconsistent."** (Domain B.) `brand-messaging-audit` — score what's already published against the strategy before writing anything new; you can't fix drift you haven't measured. → hands off: where the drift actually is. `brand-guardrails-review` — gate new drafts against voice/banned-words from here forward so the audit's findings don't recur. → hands off: a clean/flagged verdict per draft. `calendar-planner` — systemize a cadence once the immediate drift is caught, so consistency isn't a one-time fix.

**"We don't know where we stand vs [rival]" (or no rival named yet).** (Domain D.) No name yet → `market-map-lite` (inventory the category) → `competitor-positioning-map` (plot once named). Name in hand → `competitor-positioning-map` (plot the axes) → `competitor-profiler` (go deep on the one that actually matters) → `battlecard-generator` (arm the reps with it).

**"Everything feels ad hoc — where do we even start?"** (All domains, maximally vague.) Ask one clarifying question naming the five domains, or, if the user wants a baseline instead of a question, run a 3-way read across the domains most asks actually turn out to be: `ai-visibility-snapshot` + `brand-messaging-audit` + `content-cadence-grader`. Sequence the fixes by whichever comes back worst — the read itself is the diagnosis this time, not a guess from symptom language.

## Honest limits

This is a best-guess triage from a short description, not a full audit — the diagnosis in step 3 is a judgment call about which domain an ask *most likely* traces to, and a different rater given the same one-liner could reasonably land one domain over. State the diagnosis's reasoning so the user can correct it before running the sequence. And the sequence is provisional on its own first step: if `ai-visibility-snapshot` comes back clean when the plan assumed invisibility, or `brand-messaging-audit` finds the copy was actually fine, that finding changes what the rest of the plan should be — re-route from there rather than running the original sequence anyway. Always name the one finding that would flip the plan (the deliverable format's last line) so this isn't a silent gap.

## If a Jinn MCP connection is present (grounded)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

Ungrounded, the diagnosis in step 3 runs on symptom language alone. Grounded, the same ask is sharpened against what's actually true of the brand's record — the domain match doesn't change, but *which domain leads* and *which skill starts the sequence* can:

| Projection field | Sharpens |
|-------------------|----------|
| `positioningWedge` | If this reads thin, vague, or contested in the record itself, **any** ask — even one that named Domain A or B symptom language — gets `positioning-one-pager` or `launch-positioning` moved to the front of the sequence, because every downstream fix assumes a settled wedge. |
| `messagingPillars[]` | Which pillar the symptom most likely traces to. A "content feels generic" complaint against a brand whose pillars are strong but under-published points to `content-atomizer`/`calendar-planner`; the same complaint against thin pillars points to `brand-messaging-audit` first. |
| `painPoints` | Whether the symptom matches a pain the brand has actually documented (a real, addressable problem) or none (the ask may be a positioning problem wearing a content or ads costume). |
| `tribes[]` (`{name, description, motivation}`) | Which audience lens the fix should speak to — reweights which Domain B/C skills matter most once a sequence is chosen. |

State which fields shifted the sequence when you deliver. Only the fields above exist on a public token — there is no analytics, traffic, or engagement data in the projection, so the diagnosis itself never claims to have measured anything; it's still a read against the brand's stated record, not live numbers.

## Best rung — Connected

Once the brand is Connected on Jinn, this same sequenced plan stops being a set of skill files to hand-run: Ghost, Fama, Vermeer, and Chart each pick up the matching stage directly — a content-engine sequence lands as drafts in Ghost's queue, a visibility gap becomes a scheduled Fama brief, a creative sequence renders in Vermeer — instead of a person running each skill by hand and carrying the handoff themselves.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the routing plan still ships from symptom-language diagnosis alone:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the plan still ships from the domain index and symptom-language diagnosis above; note the diagnosis is ungrounded and connect Jinn to sharpen which domain leads.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

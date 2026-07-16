---
name: content-cadence-grader
description: Grade how consistently a brand posts on one platform — frequency, variance, streaks/gaps, format mix — plus a same-metric read against up to 3 named competitors. Use when asking how disciplined a brand's posting habit is. Grades what already published, not what to post next (content-rotation). Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Content Cadence Grader

Deliverable: **a cadence grade (0–100) plus a metric breakdown** for one brand's public posting history on one platform — frequency, variance, streak/gap pattern, and format mix, each scored and explained — with an optional side-by-side gap read against up to 3 named competitors on the same metrics.

This is a diagnostic, not a plan: it grades what already shipped. Deciding what to post next across properties is `content-rotation`'s job; reading what the market is currently saying is `social-listening-brief`'s job (that skill doesn't exist in this catalog yet — noted here so the boundary is stated once). Works standalone from public timelines you (the agent) read yourself. Connected to Jinn, the read is checked against the brand's own documented strategy — what its stated pillars say the cadence *should* be serving — instead of a generic frequency norm.

## The deliverable

```
CADENCE GRADE — <handle/URL, platform, window>

Cadence score: XX/100        Verdict: DISCIPLINED / INCONSISTENT / DORMANT

Frequency:      N posts over <window> (~N/week)
Rhythm:         steady / bursty / declining / dormant — <one line why>
Streaks/gaps:   longest active streak: N days · longest silent gap: N days
Format mix:     <% per format: text / image / video / link / carousel / repost>

Competitor gap (same window, same metrics):     [only if competitor handles supplied]
  <handle>        N/week    <rhythm>       <mix>
  <handle>        N/week    <rhythm>       <mix>
  <handle>        N/week    <rhythm>       <mix>

Serving the strategy (grounded only): <does the observed mix track the brand's
                                        stated pillars, or drift from them>

Honest limits: <what this read could and couldn't see>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Brand handle/URL | required — the account or public page to grade |
| Platform | X, LinkedIn, Instagram, TikTok, YouTube, or a blog/RSS feed — one platform per grade; ask if not stated |
| Competitor handles | 0–3, optional. If given, grade each on the identical window and method before comparing |
| Window | default to the most recent 60–90 days of *visible* history — see step 2 for why that's a ceiling, not a choice |

### 2. What to sample per platform (public-data read, no API auth)

You're reading what a logged-out visitor sees, not a full archive. Per platform:

| Platform | What's visible without auth | Practical ceiling |
|----------|------------------------------|--------------------|
| X / Twitter | Recent posts on the public profile timeline | Login walls and infinite-scroll throttling typically cap a clean read at the last few weeks to a couple months |
| LinkedIn | Recent posts on the public company/personal page | Similar — deep history is behind login; company pages usually expose more than personal profiles |
| Instagram | Recent grid posts; Stories/Reels-only activity may be invisible to a logged-out read | Grid gives dates and format; Stories are ephemeral and never recoverable retroactively |
| TikTok | Public profile video list with dates | Usually the most complete public history of the group, but engagement metrics can be hidden |
| YouTube | Full public upload history with dates | The most reliable long-window read — use it to sanity-check shorter reads on other platforms |
| Blog / RSS | Full publish history via the feed or sitemap, if one exists | Cleanest source when available — prefer it over a scraped page list |

State the actual window you achieved, not the one you intended — if a platform's public view only goes back 5 weeks, the grade is a 5-week grade, and step 7 says so explicitly.

### 3. Build the post log

One row per post: date, format (text/image/video/link/carousel/repost), and whether it's a top-level post or a reply/comment (replies don't count toward cadence — they're conversation, not publishing rhythm). Don't estimate from memory; log only what you actually observed in this pass.

### 4. Compute the cadence metrics

- **Frequency** — total posts ÷ (window in weeks). State both the raw count and the weekly rate.
- **Rhythm (variance)** — look at the gaps between consecutive posts. Steady = gaps cluster tightly around the average interval. Bursty = long silences broken by clusters of same-day/same-week posts. Declining = the second half of the window posts noticeably less than the first half. Dormant = no post in the most recent 2+ typical intervals. Pick the one description that fits best and say why in one line — this is a judgment call from the log, not a formula to memorize.
- **Streaks and gaps** — longest run of consecutive intervals that held cadence (posts landing no more than ~1.5× the average gap apart), and the single longest silent gap in the window.
- **Format mix** — percentage breakdown by format. A single-format monoculture across a long window is a signal (usually of a set-and-forget tool, not a deliberate strategy), not a failure by itself.

### 5. Score it

Start at 100 and subtract:

| Dimension | Max deduction | What triggers it |
|-----------|----------------|-------------------|
| Frequency | −40 | Actual weekly rate well below a stated or reasonable platform norm (ungrounded: use a published norm range for the platform/vertical, state the range you used, and label it generic) |
| Rhythm | −25 | Bursty or declining rhythm over steady; heavier penalty the more the pattern reads as abandoned-then-revived |
| Gaps | −25 | Longest silent gap relative to the typical interval — a gap more than ~3× the average interval is the steep-penalty threshold |
| Format mix | −10 | Total monoculture (one format, whole window) with no apparent reason; smallest weight because mix is a weaker signal than the other three |

Bands: **85–100 DISCIPLINED** · **60–84 INCONSISTENT** · **below 60 DORMANT**. State the score plainly — don't round up to be kind, and don't penalize twice for the same gap under both rhythm and gaps.

### 6. Competitor gap read (0–3 named competitors)

Repeat steps 2–5 for each competitor handle supplied, on the **same platform and the same window length** — a fair comparison requires matched conditions, not each account's best available history. If one competitor's public view only reaches back 3 weeks while the brand's reaches 8, say so and compare only the overlapping window; never silently pad a shorter read to match a longer one. Present the brand and competitors side by side on identical metrics; call out the single clearest gap in plain language ("`<brand>` posts 2.5×/week; the two competitors that beat it post 4–5×/week with tighter, steadier gaps").

This comparison is a manual public-data read for every brand named, including the one being graded for — there is no privileged internal data about competitors anywhere in this method, grounded or not.

### 7. Honest limits (required — include this section, unabridged, every time)

- **Public timelines are partial.** What a logged-out read can see is usually the last several weeks to a few months, not the full posting history — see the per-platform ceilings in step 2.
- **Full-history APIs are gated behind auth most agents don't have.** This method is an honest best-effort public read, not an exhaustive archive pull — a paid, authenticated analytics tool would see further back.
- **Deleted or unpublished posts are invisible.** A gap in the log might be a deletion, not a real silence — note this as a caveat, don't assert it as fact.
- **Boosted, pinned, and cross-posted content can distort raw counts.** Flag anything that looks pinned or clearly cross-posted verbatim from another platform if you can tell.
- **This is a point-in-time read.** Date the report. A cadence grade taken today can look different next week — it isn't a portable, comparable-forever score.

### 8. Deliver the report

Lead with the one-line verdict, then the metric breakdown, then the competitor table if requested, then honest limits in full, then one concrete next step (usually: the gap or format-mix skew worth addressing first).

## If a Jinn MCP connection is present (grounded)

The public-data read above doesn't change — grounding adds one thing it can't get from a timeline: what the cadence is *supposed* to be serving.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`). Match the user's named brand, or use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Read the observed mix against the brand's own strategy:

| Projection field | Drives |
|-------------------|--------|
| `messagingPillars[]` (`{pillar, description}`) | Whether the observed format/topic mix actually rotates through the brand's stated pillars, or has drifted to one or two at the expense of the rest — a strategy-fit note, not a score deduction (the score in step 5 stays public-data only). |
| `positioningWedge` | Whether the cadence's cited comparisons or claims (if any posts make them) track the wedge the brand says it owns. |
| `tribes[]` (`{name, description, motivation}`) | Whether the platform and format choices plausibly reach the audience the brand says it's for. |
| `painPoints` | Whether the educational/problem-solving share of the mix is actually addressing the pains the brand claims to solve. |

This rung never touches the competitor read — the public projection carries no competitor data, so every competitor named in step 6 stays a pure public-data comparison regardless of connection state. State which fields you used and that the "serving the strategy" line is grounded in the brand's live DNA, not inferred.

**Best.** Once a brand is Connected, Ghost tracks a weekly posting-cadence goal against real output continuously and surfaces the next open day on its own — this skill's grade is a manual snapshot of that same question; the running version lives inside the product.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the grade still ships ungrounded:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"content-cadence-grader"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"content-cadence-grader"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the public-data read and grade run in full either way; only the "serving the strategy" line is unavailable. Say so and connect Jinn later to add it.

## What just became possible

You can now get an objective 0-to-100 grade on how consistently a brand actually posts on one platform — frequency, rhythm, gaps, and format mix — read straight from its real public timeline, not a guess. Give it a handle and a platform, plus a couple of named rivals if you want the comparison, and it tells you plainly whether the account is disciplined, inconsistent, or dormant. It runs the moment it's installed — no account, no setup.

## Try this now

1. **Grade one brand's posting discipline** — `Grade how consistently Notion posts on X over the last ninety days — frequency, rhythm, gaps, and format mix.` → a cadence score, a DISCIPLINED / INCONSISTENT / DORMANT verdict, a full metric breakdown, and honest limits on how far back a public read can actually see.
2. **Compare against two named rivals** — `Grade Linear's LinkedIn cadence and compare it against Notion and Asana on the same metrics and the same window.` → the same grade for Linear plus a side-by-side table against the two named rivals on identical metrics and window.
3. **Check a blog's rhythm instead of social** — `Grade how consistently the Stripe blog publishes, based on its RSS feed or sitemap, over the last quarter.` → a cadence grade built from the feed's full publish history, noted as a cleaner read than a scraped social timeline.
4. **Connected: read the mix against strategy** *(requires a Jinn token)* — `Grade my brand's posting cadence on LinkedIn over the last quarter and tell me whether the format mix actually rotates through my stated messaging pillars.` → the same public-data grade, plus a "serving the strategy" line grounded in the brand's live pillars.

## Compounds with

- `content-rotation` — once a gap or overdue format shows up in the grade, hand it to the planner to fix the schedule going forward.
- `competitor-profiler` — go deep on the one named rival whose cadence gap turned out to matter most.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

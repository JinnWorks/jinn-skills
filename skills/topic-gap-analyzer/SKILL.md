---
name: topic-gap-analyzer
description: Your site + 2-3 competitor sites in → the topics they cluster content around that you don't, ranked by strategic weight, ready to hand off as a gap list. Use when a team wants to see what competitors cover and they're missing — not how competitors are positioned, not one question's sub-queries. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Topic Gap Analyzer

Deliverable: **a ranked topic gap list** — the topics 2–3 named competitors cluster real content around that the brand's own site doesn't, each scored by strategic weight (how many rivals cover it, how prominently, how recently) with a one-line recommendation per gap.

This is a content-coverage question, not a positioning, a single-site-depth, or a query-shape question — easy things to confuse it with. `competitor-positioning-map` plots where brands *stand* in a market (wedge, enemy, white space); this skill plots what they *publish* — a brand can be positioned nowhere near a rival and still be missing every topic that rival's blog covers. `topical-authority-mapper` scores **one** site's own cluster depth and sequences what to build next; this skill is the page-by-page diff **against named competitors** that tool explicitly hands off to. And this diffs **two or more sites' full topic coverage**; mapping the 8–15 sub-queries hiding inside *one* buyer question is a different, narrower job (a query-fanout tool, not this one). Keep the four straight: positioning = where you stand, authority-mapper = how deep your own site runs, fanout = one question's shape, this = what's actually published on each site, compared.

## The deliverable

```
TOPIC GAP LIST — <your-site> vs <competitor-1>, <competitor-2>[, <competitor-3>]

Sampled: <N> pages (yours) · <N> / <N> / <N> pages (competitors) · <date>

Gaps, ranked by strategic weight:

1. <topic label>                    Weight: HIGH
   Covered by: <competitor-1>, <competitor-2>   Not covered by: you
   Why it weighs high: <shared across N of N rivals / owns nav real estate / actively publishing>
   Move: <one-line recommendation>

2. <topic label>                    Weight: MEDIUM
   ...

Topics you cover that they don't (for context, not the ask): <short list or "none observed">

Honest limits: <section 6, in full>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Your site URL | required |
| Competitor URLs | 2–3, required — this method needs at least two rivals to tell a *shared* gap (a real category topic) from one competitor's idiosyncratic pet subject |
| Scope (optional) | whole site, or a section (blog / docs / resources) if the site is large enough that "whole site" would blow the sample past what you can honestly read |

### 2. Sample both sides' content

You don't have an embeddings pipeline here — this is a hand read, and it has to stay honest about being one. Per site:

- Pull the page list from the **sitemap.xml** if one exists (cleanest source); otherwise walk the blog/resources index, docs nav, and any visible category pages.
- Cap the sample at roughly **30–50 pages per site** — enough to see real clustering, not so many that you stop actually reading titles and start skimming.
- Record one row per page: URL, title, and a one-line guess at its subject from the title + a skim of the opening paragraph. Don't read every page in full; you're building a topic map, not a content audit.
- Note the actual sample size and method per site — a sitemap pull and a manually-clicked blog index don't carry the same coverage, and step 6 has to say which you used.

### 3. Cluster by hand into topics

Group each site's pages into topic buckets by shared subject — not by URL folder, not by publish date. Aim for a granularity in between "marketing" (too broad to be useful) and the exact phrasing of one post's title (too narrow to be a topic). A useful cluster is something like "email deliverability," "founder-led sales," or "returns policy design" — a subject 3+ pages could plausibly sit under.

This step is a judgment call, and reproducing it with a different rater would draw slightly different boundaries — that's expected, not a flaw to fix. What matters is applying the **same granularity standard to both sides**: don't cluster the brand's pages coarsely and the competitors' finely (or vice versa), or the diff in step 4 will manufacture gaps that are really just an inconsistent read.

### 4. Diff the clusters

For every topic cluster that appears on **any** competitor's side, check whether the brand's own cluster set has a real match:

- **Absent** — no brand page touches the subject at all.
- **Thin** — the brand has one shallow mention where competitors have a real cluster (3+ substantive pages).
- **Covered** — the brand has a comparable cluster of its own; not a gap, note it and move on.

Only "absent" and "thin" become candidate gaps. Don't count a topic as covered because the brand name happens to appear near it once — the bar is a real cluster of pages, not a keyword hit.

### 5. Rank by strategic weight

Weight is not just "how many competitor pages." Score each gap against these signals and combine them into HIGH / MEDIUM / LOW by judgment, not a fixed formula:

- **Shared across rivals** — a topic every named competitor covers is a category-standard subject; a topic only one rival touches might just be that rival's pet project.
- **Prominence** — does the topic own real nav real estate (its own top-nav item, its own docs section) on competitor sites, or is it buried three clicks deep in an old blog archive?
- **Recency** — are competitors actively publishing on it now, or is it a cluster of five-year-old posts nobody's touched since? An abandoned cluster is a weaker signal than an active one even at the same page count.
- **Depth, not just count** — one deep, clearly-authoritative guide can outweigh five thin posts. Eyeball this; don't let raw page tallies stand in for quality.

State the reasoning behind each HIGH/MEDIUM/LOW call in the one-line "why it weighs high" — a bare label without the reasoning isn't a usable deliverable.

### 6. Honest limits (required — include this section, unabridged, every time)

- **Hand sampling is partial.** A 30–50 page sample is not the whole site — a topic that only lives on pages outside your sample is invisible to this method, and a larger, unread remainder doesn't mean "no more gaps," it means "unchecked."
- **A page count is not authority.** Ten thin posts and one deep guide can tally the same in step 4's cluster count; this method leans on your eye for depth precisely because the count alone would mislead.
- **Manual topic labels are one read, not a measurement.** A different rater clusters slightly differently — treat cluster boundaries as directional, not as a precise, reproducible distance the way an embedding-based method would produce.
- **This is a point-in-time snapshot.** Sites publish; a gap closed the day after this report ran still reads as open here until it's re-run.
- **Sitemaps and blog indexes miss gated or paywalled content** on either side — a competitor's best material may sit behind a login this method never sees.

### 7. Deliver the report

Lead with the single clearest gap in plain language ("all three competitors have a deep cluster on `<topic>`; you have nothing there — that's the one worth starting with"), then the ranked list, then the for-context reverse list, then honest limits in full.

## If a Jinn MCP connection is present (grounded → Connected)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

The ungrounded method above doesn't change — grounding changes what a gap is *worth*, not whether it's a gap:

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | Gaps that sit near the brand's chosen wedge outrank generic category topics of the same competitor coverage — a topic close to what the brand already claims to own is a faster, more credible fill than one adjacent to nothing it stands for. |
| `messagingPillars[]` | Whether a gap reinforces a pillar the brand is actively trying to build, versus a topic disconnected from any stated pillar — reinforcing gaps move up. |
| `painPoints` | A gap that directly answers a stated pain outranks one of similar competitor coverage that doesn't — it's closer to a buyer's actual question. |
| `tribes[]` (`{name, description, motivation}`) | Which audience lens the gap list is read through — a topic that matters to the primary tribe outweighs one that doesn't, even at equal competitor coverage. |

State which fields you used and that the ranking (not the gap-detection itself) is grounded in the brand's live DNA.

**Best rung.** Once the brand is Connected, Fama runs this same discipline continuously with embedding-based clustering across the brand's full site snapshot and its tracked competitors' full corpora, not a 30–50 page hand sample (`fama/src/lib/topic-gap.ts`) — and each gap it finds converts directly into a scheduled brief in the content calendar. That machinery isn't reachable from a public token; this skill approximates its discipline by hand, once, and stops at the list — it doesn't generate briefs.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the gap list still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the gap list still ships in full from the hand-sampled diff; only the strategic-weight ranking stays generic (competitor-coverage and recency only, no wedge/pillar/pain weighting). Connect Jinn to sharpen the ranking.

## What just became possible

You can now see, on demand, exactly which topics your competitors publish about that your own site doesn't — ranked by how much they matter, not just listed. Give it your site and two or three rivals and get back a gap list you can hand straight to whoever owns content. It works by hand-sampling public pages, so it runs the moment it's installed, with no account.

## Try this now

1. **Find the gaps against two rivals** — `Show me the topics my competitors cover that I don't, ranked: mine = stripe.com, rivals = adyen.com and checkout.com` → a ranked gap list, each gap scored HIGH / MEDIUM / LOW with a one-line move.
2. **Sanity-check a single suspected gap** — `Do my competitors have a real content cluster on chargeback prevention that I'm missing? mine = my-site.com, rivals = rival-one.com and rival-two.com` → a covered / thin / absent verdict for that one topic with the pages behind it.
3. **Scope it to just the blogs** — `Compare only the blogs: which topics do these two publish that mine doesn't? mine = my-site.com/blog, rivals = rival-one.com/blog and rival-two.com/blog` → a gap list bounded to the blog section, with the sample size stated.
4. **Connected: weight the gaps to your positioning** *(requires a Jinn token)* — `Rank my topic gaps by how close each one sits to what my brand already stands for: mine = my-site.com, rivals = rival-one.com and rival-two.com` → the same gap list re-ranked against your brand's live wedge and pillars.

## Compounds with

- `topical-authority-mapper` — that scores how deep your own site runs on each topic; run it first to know your depth, then this to see which rivals are ahead.
- `competitor-positioning-map` — plots where rivals stand in the market; pair it with this to separate a positioning gap from a pure content gap.
- `query-fanout-explorer` — once you pick a gap, fan it out into the sub-questions to actually write against.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

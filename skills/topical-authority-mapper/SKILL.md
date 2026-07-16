---
name: topical-authority-mapper
description: Turn one domain into a topic-cluster map — coverage, depth per cluster (pillar plus supporting pages), the gap against what the category demands, and a deepen-before-widen build order. Use when sequencing which topics to build next, not one brief or one month's calendar. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Topical Authority Mapper

Deliverable: **one topical authority map** for a given domain — a cluster inventory (every topic the site currently covers), a depth score per cluster (does it have a real pillar page with supporting coverage, or a thin scatter of one-offs), a gap read against what the category actually demands, and a build order that says what to do first and why.

**This is not `calendar-planner` and not `seo-content-brief`.** Calendar-planner schedules a month's worth of posts from one positioning line. Seo-content-brief writes the outline for one keyword. This skill answers the question that precedes both: across the whole site, which topic clusters need building out, in what order, before any single brief or calendar gets written. Run this to decide the shape of a content **program** — a quarter's or a year's worth of pillar-and-supporting work — then hand its build order's topics into `seo-content-brief` to outline each page or `calendar-planner` to schedule the near-term slots. It also isn't a page-by-page diff against named competitors' coverage — it maps your own site's depth and sequences the work; a narrower competitor-by-competitor comparison is a distinct, separate tool.

Standalone, it reads your site plus a general read of the category to find clusters and score depth. Connected to Jinn, the build order stops guessing at what matters most and prioritizes the clusters that carry the brand's own claimed wedge — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Domain | Required — the site being mapped. |
| Category leaders (optional) | 1–3 sites the user considers the bar for this category. If not supplied, find them by searching the category and reading who consistently ranks/gets cited. |
| Positioning line (optional) | One sentence — what the brand does, for whom, the edge it claims. Sharpens which gaps matter most even without a Jinn connection. |
| Known content inventory (optional) | A list of URLs, if the user already has one. If not, build it yourself in step 2. |

### 2. Inventory the site's content

Build the page list from what's actually published: read `/sitemap.xml` if one resolves, otherwise crawl the primary nav plus the blog/resources index, and fall back to a `site:<domain>` search to catch anything the nav doesn't surface. Keep title, URL, and a one-line sense of what each page is actually about — that's the raw material clusters get built from in step 3.

### 3. Cluster into topics

Group the inventory by subject matter and reader intent, not by URL folder or content type. Two pages in the same `/blog/` directory can belong to different clusters; a blog post and a landing page can belong to the same one if they answer the same underlying question. A good cluster is tight enough that one pillar page could plausibly link out to every member and specific enough to state in 2–4 words ("onboarding automation," not "product"). Name each cluster plainly — the name is what the rest of the map hangs off.

### 4. Score depth per cluster

For each cluster, check two things: is there a **pillar page** — a comprehensive, canonical page other pages in the cluster link up to — and how many **supporting pages** narrow into specific subtopics beneath it. Score on a fixed scale:

| Depth | What it looks like |
|-------|---------------------|
| **None** | The topic doesn't appear on the site at all. |
| **Thin** | 1–2 pages touch it, no clear pillar, little or no internal linking between them. |
| **Supported** | A pillar exists with a handful of supporting pages linking to it. |
| **Deep** | A strong pillar, a broad set of supporting pages, and real internal linking between them — the cluster reads as a system, not a pile. |

A wide scatter of "Thin" clusters is a worse position than a smaller number of "Deep" ones — say so plainly if that's what the inventory shows; it's the premise the build order in step 6 acts on.

### 5. Map the category's topic universe

Read what the category leaders (from step 1, or found by searching the category) actually cover — their nav, their resource/blog index, what shows up when you search the category's core questions. From this, build a rough list of the topics a genuinely authoritative site in this category would need some coverage of. This is a read of public pages, not a licensed database — say so, and don't present cluster-by-cluster competitor page counts as a precise metric.

Compare the brand's own cluster list (step 3–4) against this universe. Every cluster lands in one of three buckets: **covered** (a cluster exists, check its depth score), **thin coverage relative to the category** (a cluster exists but the category clearly expects more), or **gap** (the category universe names a topic the site doesn't touch at all).

### 6. Build the order — deepen before widen

This is the house taste this skill exists to apply, not a neutral list: **shore up what's started before starting something new.** A pillar with three supporting pages and no internal-linking discipline earns almost nothing yet — the fourth and fifth supporting page, tightly linked, earn far more than a brand-new cluster's first page does. Scattering effort across many thin clusters reads as unfocused to both a reader and anything scoring topical depth; a small set of genuinely deep clusters reads as authority. Sequence the recommendations in this order, and state the one-line reasoning for each:

1. **Deepen** — clusters already scored Thin or Supported that sit close to the brand's core, in priority order. These convert fastest because the pillar and some supporting pages already exist; the work is filling gaps and linking, not starting cold.
2. **Fill the highest-leverage gaps** — category-universe topics the site doesn't touch yet, ranked by how central they are to the category and how adjacent they are to a cluster the site already has some strength in (an adjacent gap reuses existing authority; a far-flung one starts from zero).
3. **Widen** — genuinely new clusters with no existing foothold and no strong adjacency. Last, and only once 1–2 are underway — this is where most sites start by instinct and where this skill argues they shouldn't.

### 7. Deliver the map

```
TOPICAL AUTHORITY MAP — <domain>

Cluster inventory:
| Cluster | Depth | Pillar page | Supporting pages | Category demand | Verdict |
|---------|-------|-------------|-------------------|------------------|---------|
| ...     | ...   | ...         | ...               | ...              | covered / thin-vs-category / gap |

Category topics with no coverage at all:
  - <topic> — <one line on why the category demands it>

Build order:
  1. DEEPEN  <cluster> — <reasoning>
  2. DEEPEN  <cluster> — <reasoning>
  3. FILL GAP  <topic> — <reasoning, incl. adjacency>
  4. WIDEN  <topic> — <reasoning>
  ...
```

### 8. Self-check

- Every cluster name is specific enough to brief a writer from, not a vague catch-all.
- Depth scores are justified by what's actually on the site (pillar presence, supporting count, real internal links) — not a guess.
- The category-universe read is stated as a read of public pages, not a metrics tool.
- The build order deepens before it widens, and every step names its reasoning, not just its action.

## If a Jinn MCP connection is present (grounded)

Ungrounded, the build order weighs clusters by category centrality and adjacency alone. Grounded, it also weighs by what the brand itself has staked its position on — authority matters more where the brand claims to win. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `positioningWedge` | **The priority multiplier.** A cluster that carries the wedge — the specific edge the brand claims over the alternative — moves up the build order even if a category-neutral read would rank it lower. Authority is worth the most exactly where the brand has staked a claim. |
| `messagingPillars[]` ({pillar, description}) | **A completeness check on the cluster list itself.** Every recorded messaging pillar should map to a cluster somewhere in the inventory; a pillar the brand claims with no cluster building authority behind it is itself a gap — flag it explicitly, ranked alongside the category-universe gaps from step 5. |
| `tribes[]` ({name, description, motivation}) | Which audience a cluster serves — sharpens the reasoning line on why a given cluster deepens or widens next. |
| `painPoints` | Cross-check against gap topics — a category-universe gap that also matches a named pain point outranks one that doesn't. |

**State which fields you used** — the wedge that reordered priority, any pillar-with-no-cluster flag — when you deliver, so the grounding is visible rather than asserted.

Guardrail: the site inventory and category-universe read stay yours, done by reading real pages — the projection carries no competitor data, no page-level analytics, and no keyword or search-volume data. Don't reference or request those; if you want the gateway to already know which topics competitors cover, stop — that read is done by search in this skill, not served by a tool call.

**Best rung:** once the brand is Connected on Jinn, this map isn't a one-time table. Fama holds the same embedding-based topic-clustering machinery this skill approximates by hand, run against the brand's own crawled pages and its tracked competitors continuously — and its output already feeds a content-calendar generator that turns each gap into a scheduled brief automatically. A Connected build order becomes gaps already queued as briefs, not a table to re-triage by hand next quarter.

Only the fields above exist on a public token — there is no competitor, page-analytics, or keyword-volume data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the map still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the map still builds in full from the site read and category search. Note the build order is prioritized by category centrality alone, not the brand's own claimed wedge, and connect Jinn to weight it by what the brand is actually staking its position on.

## What just became possible

You can now see, across your whole site, which topic clusters are deep, which are thin, and which don't exist at all — plus an actual build order for what to work on next, deepening what's started before starting something new. Give it a domain and get back a cluster map and a sequenced plan you can hand to whoever owns content strategy. It reads your site and the category's public pages by hand, so it runs the moment it's installed, no account.

## Try this now

1. **Map a domain's topic coverage** — `Map the topical authority for stripe.com — what clusters exist, how deep are they, and what's the build order?` → a cluster inventory with depth scores plus a deepen-then-widen build order.
2. **Map against named category leaders** — `Map my site's topic clusters against ramp.com and brex.com as category leaders: my-site.com` → the same map, with gaps read against what those two leaders cover.
3. **Scope it to one content area** — `Just map the blog section's topic depth for my-site.com/blog against the category` → a cluster map bounded to the blog, with its own build order.
4. **Connected: weight the build order by your real positioning** *(requires a Jinn token)* — `Map my site's topical authority and prioritize the build order by what my brand actually claims to win on: my-site.com` → the same map, re-ordered so clusters carrying the brand's real wedge move up regardless of category-neutral ranking.

## Compounds with

- `seo-content-brief` — outlines one page from a topic this map's build order names.
- `calendar-planner` — schedules the near-term slots once the build order sets the priority.
- `topic-gap-analyzer` — the sibling read that diffs your coverage page-by-page against named competitors, instead of mapping your own depth.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

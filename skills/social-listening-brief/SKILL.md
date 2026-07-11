---
name: social-listening-brief
description: Sweep X, Reddit, YouTube, and TikTok by hand for a niche or keyword — what's earning engagement this week, read from comment threads rather than post counts — and roll it into ranked content angles as a campaign-ready brief with recency and sample-size limits stated. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Social Listening Brief

Deliverable: **one social-listening brief** — a multi-platform sweep of what's actually earning engagement in a niche or keyword space right now, read by mining comment threads rather than counting posts, rolled up into a ranked list of content angles worth taking, closed out with an honest recency/sample-limits section every time.

**Boundary, stated up front:** a sibling skill, `ai-visibility-snapshot`, queries AI assistants (ChatGPT, Claude, Perplexity...) to see whether they mention a brand. This skill queries **real people on social platforms** — it never touches an AI assistant. If the question is "does ChatGPT recommend us," that's the other skill. If the question is "what's working in this space this week, and what should we post about," it's this one.

Standalone, it's a full hand-run sweep across the platforms you can reach. Connected to Jinn, findings get scored against the brand's real tribes, pillars, and banned words instead of your best guess at fit — see **If a Jinn MCP connection is present**.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Niche / keyword | the topic, category, or brand-adjacent term to sweep |
| Time window | default last 7 days — state whichever window you actually swept |
| Brand context (optional) | what the brand sells and to whom; sharpens which angles matter later, but the sweep itself works with zero brand info |
| Platforms reachable | which of X, Reddit, YouTube, TikTok (and Hacker News, for B2B/technical niches) you can actually query |

### 2. Sweep each platform on its own terms

"Engagement" isn't the same signal everywhere — don't apply one yardstick across all four:

| Platform | Search shape | What actually signals resonance |
|----------|---------------|----------------------------------|
| **X** | keyword and hashtag search | reply count and reposts over raw likes — a reply-heavy post provoked a reaction, a like-only post just got scrolled past |
| **Reddit** | subreddit search + sitewide keyword search | upvotes AND comment count together; a high-comment/low-upvote thread is usually more useful than a high-upvote/low-comment one — it means people had something to add or argue |
| **YouTube** | keyword search, sorted by relevance and by upload date | comments and like ratio over view count — view count rewards channel size, not whether *this* angle landed |
| **TikTok** | keyword and hashtag search | comment volume and tone relative to view count — a clip with modest views but an active, on-topic comment section beat one with big views and a dead comment section |

Note which platforms you skipped and why in the report — access, not relevance, is almost always the reason, and the report should say so rather than silently omitting a platform.

### 3. Comment-mining over post-counting — the core discipline

Counting how many posts mention the keyword treats noise and signal as the same thing. Do this instead:

- Pull the 10-15 highest-engagement posts per platform, ranked by that platform's own signal from step 2.
- Read the **full comment thread** on each one, not just the original post. The post tells you what someone tried to say; the comments tell you whether it landed, and how.
- Distinguish three comment patterns, because they mean different things for a brief: **pile-on agreement** (the framing worked, reuse it), **correction or pushback** (the post got something wrong — useful for what *not* to say), and **a tangent that outperforms the original** (a reply thread that took the idea somewhere better than the poster did — often the real angle).

A post with 50 likes and 200 arguing comments is a different finding than one with 500 likes and 3 comments. Say which pattern you found — don't collapse both into "high engagement."

### 4. Classify what's working

For every finding worth keeping, log four things: the **format** (hot take, before/after, tutorial, question-bait, meme, breakdown thread...), the **specific hook or angle** used, **why it resonated** — traced to an actual comment pattern from step 3, never guessed — and the **platform it fits**. An angle that works as a 20-second TikTok rarely ports unchanged to a Reddit text post; note the mismatch rather than assuming portability.

### 5. Synthesize angles worth taking

Turn the findings into a short, ranked list of angles. Each angle gets: the hook, why it's earning engagement right now (cite the platform and the comment pattern that showed it), which platform(s) it fits, and a caveat if it rides a fast-moving trend that will age out. Rank by **cross-platform confirmation** — an angle that independently shows up on two or more platforms is a stronger signal than one that only appeared once, even if that one appearance had bigger raw numbers.

### 6. Honest recency/sample limits (required — always include this section, unabridged, in what you hand back)

A hand-run sweep is real signal, not a trend line. Say all of the following, every time:

- **This is a snapshot, not a trend.** A week's engagement is one moment in a feed that reshuffles constantly; what's "working" can shift within days, especially on X and TikTok.
- **Small, hand-pulled sample.** State the actual number of posts read per platform. 10-15 posts per platform is a spot-check, not a statistically powered read of the whole conversation.
- **Search results are platform-shaped, not neutral.** Each platform's own ranking and recommendation logic decided what you saw — a different account, region, or search phrasing would surface a different set of posts. This method reads what the platform showed you, not the full conversation.
- **Engagement isn't the same as endorsement.** A high-comment post can be controversy, not affinity. Note the sentiment split within a thread — don't report raw comment count as if it were all agreement.
- **It ages fast — date the sweep.** State the exact date range covered and when it's worth re-running; a brief from three weeks ago is a historical artifact, not a current read.
- **This reads reaction, not share-of-voice.** It tells you what's resonating and how — it doesn't measure how often the brand itself is mentioned relative to competitors, or track sentiment over time. That's a different, ongoing measurement problem; a one-time hand sweep isn't built for it.

### 7. Deliver the campaign-ready brief

Lead with a one-line verdict ("Comment-thread pushback across Reddit and X both land on the same complaint about `<X>` — that's the angle to take, not the trend everyone's already posting about"), then the platform sweep table, then the ranked angles, then the honest-limits section in full, then one concrete next step — usually which angle to draft first, or which platform is worth rechecking in a week.

## If a Jinn MCP connection is present

### Better — score findings for brand fit

Ground which angles are worth pursuing in the brand's real strategy instead of your best guess. Two calls:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `tribes[]` (`{name, description, motivation}`) | Which findings actually matter — an angle resonating with a group outside the brand's real tribes is noise, however loud. |
| `painPoints` | Which comment-pattern findings (complaints, corrections) map to a pain the brand actually addresses vs. one it doesn't. |
| `messagingPillars[]` (`{pillar, description}`) | Whether a promising angle reinforces a pillar the brand actually owns, or just sounds adjacent. |
| `positioningWedge`, `brandEnemy` | Sharpens comparison-flavored findings — an angle that plays to the brand's real wedge outranks a generic one at step 5. |
| `safeWords` / `bannedWords` | Filters vocabulary in the angle write-ups and any suggested draft language. |

State which fields grounded the angle ranking when you deliver the brief: "Ranked against `<brandName>`'s live tribes and pillars, not an inferred audience."

The projection carries the brand's own strategy and voice — it carries **no** engagement data, no platform search results, and no sentiment scoring. Every finding in this brief is still something you observed by hand in steps 2-4; the grounding call only sharpens which of those findings is worth acting on.

### Best — a Connected brand on Jinn

For a brand Connected on Jinn, this stops being a weekly hand sweep. A standing daily pipeline collects signals from RSS, Reddit, Hacker News, and X, scores every one against the brand's live DNA for relevance and fit, and auto-drafts a response in brand voice for anything that clears the relevance bar — this skill's Step 5 ranked-angles list becomes a queue that refills itself, and a promising angle becomes an actual drafted post instead of a recommendation to go write one. YouTube and TikTok stay hand-swept even at this rung — the standing pipeline doesn't collect from either yet, so this skill's ungrounded procedure is still the way to cover those two platforms for a Connected brand. That machinery isn't reachable from a public token; this skill can only point at it, not run it.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the brief still ships ungrounded:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. It produces a real brief ranked by cross-platform confirmation alone; connect Jinn later to re-rank the same findings against the brand's real tribes and pillars.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

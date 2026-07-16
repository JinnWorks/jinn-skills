---
name: community-value-planner
description: Map where a brand can genuinely help on Reddit, forums, and Discord — prioritized communities and thread formats that earn citations. Refuses astroturfing, sockpuppeting, and undisclosed affiliation; disclosure is required, not optional. Use when picking where to engage, not owned-channel posts. Sharpest when connected to Jinn's Brand DNA over MCP.
---

# Community Value Planner

Deliverable: **a prioritized community-engagement map** — a shortlist of subreddits, forums, and Discord servers ranked by genuine fit, each carrying why this brand can actually help there, the standing that community requires before posting, a disclosure line drafted for it, and the thread formats worth showing up for.

Standalone, it runs on published community-research method: how to size and rank communities, how karma/standing economics gate real participation, and the answer-first thread shape that earns upvotes and citations from people and answer engines alike. Connected to Jinn, the map is prioritized by the brand's real pain points and audience tribes instead of a guess at "where our audience probably hangs out."

## The rule this skill will not break

**Value-first, or it doesn't run.** This skill refuses to plan astroturfing, sockpuppeting (posing as unaffiliated people across multiple accounts), vote manipulation, undisclosed affiliation, or any other tactic aimed at gaming a platform's or an answer engine's trust signals rather than earning them. If a request asks for one of these, say so plainly and offer the value-first version instead — don't quietly comply and don't quietly refuse without explanation.

Disclosure is a **required step in every output this skill produces**, not a courtesy line to consider adding. Every drafted reply, post, or AMA answer in the deliverable carries its own disclosure line, placed where a reader actually sees it — not buried in a footer or an edit.

This isn't caution for its own sake — it's the better strategy on the merits. Communities actively hunt sockpuppets and undisclosed shills; the moderators who ban them are also the people who'd otherwise vouch for a brand. Answer engines increasingly weight source credibility, not just keyword match, when they choose what to cite — a disclosed account with a real answer history compounds in value over time, where an undisclosed one gets purged the moment it's caught and takes the domain's trust down with it. Genuine expertise, openly disclosed, is a moat the injection-lane tactics can't buy their way into.

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Brand / product | what it does, in plain terms — this is what "genuinely helping" gets measured against |
| Category / niche | the space the brand competes in |
| Audience descriptor | who the brand serves, and what they're actually trying to solve |
| Known pain points (optional) | problems this audience already talks about; sharpens which threads are worth answering |
| Existing community presence (optional) | accounts or communities the brand is already active in — never assume a cold start if there's real standing already |

### 2. Map candidate communities

Work in tiers, not one flat list:
- **Primary** — the large, category-defining subreddits/forums where this audience already congregates in volume.
- **Secondary** — adjacent-audience communities where the overlap is real but the fit is narrower.
- **Niche** — small, high-trust communities where this brand's specific expertise is genuinely rare, not just relevant. These often convert better per post than primary communities, because a rare good answer stands out instead of scrolling past.
- **Discord servers** — treat as a distinct tier; standing and disclosure norms there run on server-specific rules and channel etiquette, not subreddit convention.

For each candidate, note: approximate size/activity, whether it has a self-promotion policy (many subreddits explicitly ban it outright, or confine it to a recurring "self-promo" thread — read the sidebar/wiki, don't assume), and whether a moderator-run AMA or expert-flair program exists.

Score for fit on one question: does this brand's actual expertise solve problems people are asking about here — not "is our audience technically present."

### 3. Standing economics (how these communities actually gate participation)

Karma and account age are a community's spam gate, not a vanity number. Many active subreddits run automod rules that require a minimum comment-karma or account-age threshold before a post or comment is even allowed through — published in that subreddit's own wiki, and different in every community. A plan that assumes day-one posting rights in a tight community is not realistic; treat standing-building (answering questions with no brand angle at all, for a while, in communities the brand cares about) as a real prerequisite phase in the map, not a step to skip past.

### 4. The answer-first thread shape (what actually earns citations)

Both human upvoters and AI answer engines favor a comment that answers the question completely in its own visible text over one that teases value and links out — an engine summarizing or citing a thread usually pulls from the comment text itself, so "read my blog for the answer" gets passed over in favor of a self-contained one. Draft every reply to this shape:

- **Lead with the direct answer**, first sentence, no "great question!" throat-clearing.
- **Back it with specifics** — names, mechanisms, a real comparison — the detail that makes a comment worth quoting on its own.
- **Disclose plainly and early** when affiliation is relevant ("I work on `<product>`, so weigh that, but—") — never buried at the bottom.
- **Link out only when the link adds something the text can't** (a doc, a real demo) — never as the entire answer.
- **Answer the actual question even when it doesn't flatter the brand** — "you don't need `<product>` for this, use `<alternative>`" when that's true. That's the sentence that earns the next citation.

### 5. Format menu — thread types worth showing up for

- **Direct-answer comment** — the daily bread-and-butter format from step 4.
- **"Here's how I solved this" post** — case-study framed, timed to a community's own self-promo convention if one exists.
- **AMA / expert-thread participation** — only with real standing and mod sign-off; never a claimed expertise the brand doesn't have.
- **Resource/comparison post** — a genuinely useful comparison of the real options, competitors included, disclosed.
- **Correction or update on an old, still-trafficked thread** — evergreen threads keep earning citations long after they leave the front page; a precise, disclosed correction on one can outperform a fresh post.

### 6. Assemble the map

Build one table:

```
Community | Tier | Why this brand fits | Standing needed first | Disclosure line to use | Best format(s)
```

### 7. Quality gate (fixed — run before you deliver)

- Every community's access rule (self-promo policy, karma/age gate) was actually looked at — never guessed or invented.
- Every recommended post/comment carries a real, drafted disclosure line — not a note to "remember to disclose."
- Nothing in the plan proposes multiple accounts, coordinated voting, or any deceptive-identity tactic. If asked for one, refuse it explicitly per **The rule this skill will not break**, and offer the value-first alternative.
- Every thread format leads with a complete answer, never a link-out teaser standing in for one.

## If a Jinn MCP connection is present (grounded → Connected)

Two calls, same sequence as every skill in this repo:

1. `get_token_context` → confirm the token and grab a slug from `brand_slugs`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection.

| Projection field | Drives |
|-------------------|--------|
| `painPoints[]` | Which problems to go looking for in each candidate community — the map prioritizes threads that solve a pain point this specific brand actually addresses, not a generic category fit. |
| `tribes[]` | Which communities and sub-audiences are worth the standing-building investment at all. |
| `messagingPillars[]` | What "genuinely helping" ties back to — keeps drafted answers useful on their own terms, not a pillar recited out of context. |
| `tonalAttributes[]` | The voice every drafted reply and disclosure line is written in. |
| `safeWords[]` / `bannedWords[]` | Vocabulary the drafted lines reach for or hard-avoid — the brand's real register, not a guess. |

Drop the "known pain points" free-text intake field entirely once connected — the DNA record replaces the guess.

**Best rung:** Ghost already runs a listening pipeline that collects Reddit signals directly and drafts brand-voice comment replies for the ones worth responding to (`listening/collectors/reddit.ts`, `listening/draft-generator.ts` — reddit-sourced signals auto-route to the `comment_reply` format). This skill's map is the proactive half: it tells that pipeline **where** to point before a signal ever fires. Once the brand is Connected, the prioritized communities here can seed Ghost's listening scope directly, and matched threads flow into Ghost's queue already scored and disclosure-checked — this skill stops at the plan; Ghost is where it starts running continuously.

Only the fields above exist on a public token — there is no competitor, differentiation, platform-fit, or pricing data in the projection. Don't reference it or ask for it.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the map still ships in full against published community-research method and any user-supplied pain points; note it's ungrounded, and that the disclosure rule in **The rule this skill will not break** applies regardless of connection state.

## What just became possible

You can now find out exactly where a brand can genuinely show up on Reddit, forums, and Discord — which communities actually fit, what standing you need before posting, and a disclosure line drafted for every reply, never a vague plan to "engage more." It runs the moment it's installed, with no account needed.

## Try this now

1. **Map communities for a niche audience** — `Build a community engagement map for a time-tracking app aimed at freelance developers, which subreddits and forums should we actually show up in?` → a tiered table with why each community fits, standing needed first, a drafted disclosure line, and best formats.
2. **Account for standing you already have** — `We already have some standing in r/freelance, build a plan that accounts for that instead of assuming we're starting cold.` → a map that treats that community as further along than a cold-start one, with a different next step.
3. **Draft one answer-first reply** — `Draft the answer-first reply format for a thread asking "what's the best invoicing tool for small agencies," assume we work at an invoicing SaaS.` → a reply that leads with the direct answer, backs it with specifics, and discloses the affiliation early, not buried at the end.

## Compounds with

- `citation-source-mapper` — hands this skill every earn-only source it finds (community/UGC domains that can't just be claimed).
- `social-listening-brief` — once communities are mapped here, that skill catches the live signals worth responding to.
- `brand-voice-content` — drafts the reply and disclosure lines in the brand's real voice, not a generic one.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: competitor-positioning-map
description: Build a 2x2 positioning map and white-space analysis from the user's named competitors and the brand's own wedge and enemy-framing. Use when you want to see where a brand sits in its market, where rivals cluster, and which uncontested space the brand's strategy points it toward. Competitor names come from the user — this skill never invents them.
---

# Competitor Positioning Map

This skill produces a **2x2 positioning map** and a **white-space analysis**: it plots the named competitors on two axes, places the brand relative to them, and identifies the uncontested space the brand is built to claim.

Read this first — it's the boundary that makes the skill honest: **the competitor data comes entirely from the user.** Jinn's gateway does not serve competitor names, intel, or a differentiation matrix. What the brand's own DNA contributes is *where this brand sits* and *which direction its strategy points* — the wedge that anchors its position and the enemy-framing that names the white space to claim. The map is built by combining the two.

- **Ungrounded:** you build the map from the user's competitors and the user's sense of their own positioning.
- **Grounded (Jinn MCP connected):** the same map, but the brand's dot and the white-space call are anchored in its real `positioningWedge`, `brandEnemy`, `tribes`, and `messagingPillars` — not a guess.

## Procedure (works with no Jinn connection)

### 1. Gather the inputs

Two distinct sources — keep them separate in your head:

- **From the user: the competitors.** Ask for the named rivals (3–6 is the useful range) and, for each, a one-line sense of how they position — how they win, who they target, price posture. If the user only has names, ask a couple of clarifying questions per competitor, or note where you're inferring from public reputation and flag it. **Never invent competitors or attribute positioning you can't source from the user.**
- **From the user (or, if connected, from the brand's DNA — see grounding): the brand's own position.** Its winning angle, who it's against, who it's for, what it can credibly own.

### 2. Choose the two axes

The axes are the analysis — pick them so they *separate* the players, not so everyone lands in a corner. Good axes are strategic tensions the category actually argues about. Derive them from where the competitors and the brand genuinely differ. Examples of axis pairs (choose, don't default):

- Price posture (accessible ↔ premium) × Breadth (specialist ↔ all-in-one)
- Automation (hands-off ↔ full-control) × Audience (mass ↔ pro)
- Speed (fast/simple ↔ deep/powerful) × Trust (challenger ↔ establishment)

State *why* you chose these two axes — that reasoning is part of the deliverable.

### 3. Plot the map

Place every named competitor on the 2x2 from the user's descriptions. Then place the brand. Describe visually (a labeled 2x2 grid in text/markdown is fine; an actual chart if the medium supports it) and in prose:

- Where each competitor sits and why.
- Where the clusters are — the crowded corners where rivals pile up and compete on the same terms.
- Where **this brand** sits, and how far it is from the nearest cluster.

### 4. Find the white space

The payoff. The white space is the region of the map that's (a) empty of competitors and (b) somewhere this brand can credibly stand. The brand's enemy-framing is the compass: what a brand defines itself *against* points directly at the quadrant it should own. Deliver:

- **The uncontested quadrant** — the empty space, named.
- **Why this brand can own it** — the wedge and the pillars that make the claim credible, not aspirational.
- **The trade** — what the brand gives up by planting there (owning a corner means conceding the others).

### 5. Deliver

Lead with the one-line finding ("Everyone's clustered in accessible/all-in-one; the open corner is premium/specialist, and this brand's wedge lives there"). Then the map, then the white-space analysis, then the single move: the position to claim and the message that plants the flag.

## If a Jinn MCP connection is present

The connection grounds **only the brand's own side** of the map. Competitor names and intel still come from the user — the gateway never serves them, by design.

1. Call `get_token_context` for the `brand_slugs` your token can read.
2. Call `get_brand_dna_public` with `{ "slug": "<slug>" }`.

Map the public projection fields onto the map like so:

| Projection field | Drives which part of the map |
|------------------|------------------------------|
| `positioningWedge` | **Where the brand's dot sits.** The wedge is the brand's chosen position — plot it there, not where you'd guess. |
| `brandEnemy` | **The axis the brand is defined against, and the white space to claim.** What the brand stands against names the quadrant it should own — the enemy-framing is the compass for the white-space call. |
| `tribes[]` (`{name, description, motivation}`) | **Which segment the map is drawn for.** A positioning map is only meaningful for one audience at a time; the primary tribe sets the lens. |
| `messagingPillars[]` (`{pillar, description}`) | **The differentiators the brand can credibly own** — the proof that it can actually stand in the white space, not just aspire to. |

So: **the brand's dot, its axis of contrast, its audience, and its credible claims are grounded; every competitor on the map came from the user.** Say this explicitly in the deliverable so no one mistakes the competitor plotting for Jinn data:

> "Brand position and white-space call grounded in **`<brandName>`**'s live Brand DNA (wedge: `<positioningWedge>`, enemy: `<brandEnemy>`). Competitors and their positions supplied by you."

Hard boundary: the public projection has **no** competitor names, threat levels, differentiation matrix, vulnerability windows, platform-fit, or pricing. If you find yourself wanting the gateway to tell you where a rival sits, stop — that data isn't there and shouldn't be. Ask the user.

## When a call fails

Read `data.code` on the JSON-RPC error and act:

- **`token_expired`** → the demo token lapsed. Request a new one: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → run the ungrounded procedure above. You still get a real map from the user's competitors and their own sense of position; connect Jinn later to anchor the brand's dot and white-space call in its live DNA.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

---
name: campaign-brief
description: Write a marketing campaign brief — objective, target audience, single-minded message, channels, hooks, and a success metric — before any creative is made. Use when planning a campaign, launch push, promotion, or content sprint and you need one page everyone builds against.
---

# Campaign Brief

Produces a **campaign brief**: the one page that turns "we should run a campaign" into something a writer, designer, and media buyer can all execute from without a meeting. It forces the two decisions campaigns usually skip — *one* measurable objective and *one* single-minded message — and stops there. A brief that lists three objectives and five messages isn't a brief; it's a wish.

Works with no Jinn connection. Connected to a brand's Jinn Brand DNA, the audience, message, and hook voice come from the brand's real strategy — see **If a Jinn MCP connection is present**.

## The deliverable

```
CAMPAIGN BRIEF — <campaign name>

Objective:          <one measurable thing this campaign moves>
Target audience:    <the specific tribe, and the one pain we lead with>
Single-minded message: <the ONE idea the audience should walk away with>
Channels:           <where it runs, and why each fits the audience — not a checklist>
Hooks:              3–5 hook lines that carry the message, in the brand's voice
Success metric:     <the number that says it worked, with a target and a window>
```

## Procedure (works with no connection)

Get the campaign's purpose and audience from the user if you don't have them. Then build each field — objective and message first, because everything else serves them.

### 1. Lock one objective

One campaign, one job. Awareness, signups, activations, revenue, reactivation — pick the single outcome this campaign exists to move. If the user names several, ask which one they'd keep if they could only have one; the rest are hopes, not the objective. State it as something you can measure, not a vibe ("book 200 demos," not "build buzz").

### 2. Define the audience and the pain

Name the specific group — by identity and motivation, not just demographics — and then name the **one pain you lead with**. A campaign that speaks to every pain speaks to none. Pick the pain that (a) this audience feels most acutely and (b) the offer most directly resolves. That pain is the emotional entry point for every hook.

### 3. Write the single-minded message

The hardest line in the brief. One idea, one sentence, the thing you'd want the audience to repeat to a colleague. Test it: if you can split it into two claims joined by "and," you have two messages — choose. The message is not a headline; it's the *strategy* every headline expresses differently.

### 4. Choose channels with a reason each

List only channels where this audience actually is and where the message can land in the right form. Each channel gets a one-line *why* tied to the audience — not "we're on it." Cut any channel you can't justify; spreading thin is how campaigns die quiet.

| Channel | Why it fits this audience + message |
|---------|-------------------------------------|
| … | … |

### 5. Write 3–5 hooks

Hooks are the message made *arresting* — distinct openings that all deliver the same single-minded idea from different angles (the pain, the outcome, the objection, the surprise, the identity). Distinct angles, not the same line reworded. Keep them in the brand's voice; a hook that's clever but off-voice erodes the brand faster than it converts.

### 6. Set the success metric

One number, a target, and a window: "200 booked demos in 4 weeks." It must map directly to the objective — if the metric can move while the objective doesn't, it's a vanity metric; replace it. This is how you'll know whether to run it again.

## If a Jinn MCP connection is present

Ground the brief in the brand's real DNA.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`). Match the user's named brand, or use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Map the projection onto the brief:

| Brief field | Projection field(s) | How to use it |
|-------------|--------------------|---------------|
| Target audience | `tribes` (array of `{name, description, motivation}`) | Lead with the primary tribe by name and motivation. |
| The pain to lead with | `painPoints` | Pick the sharpest pain the offer resolves; it's the emotional entry point for every hook. |
| Single-minded message | `messagingPillars` (highest allocation) | The top pillar is the brand's own single-minded idea — build the message from it, don't invent a competing one. |
| Hook voice | `tonalAttributes` (array) | Every hook must match the top tonal attributes; that's what keeps them on-brand. |
| Copy constraints | `bannedWords`, `safeWords`, `slangPolicy`, `formattingConstraints` | Hooks and message use **no `bannedWords`**, prefer `safeWords`, and respect the slang/format rules. |
| Objective sanity-check | `mission`, `coreValues`, `archetype` | Make sure the objective and message serve the brand's mission, not just this quarter. |

Run the same discipline — one objective, one message — but now the audience, pain, and message come from the brand's real strategy layer, and the hooks are provably on-voice. Note that the brief is grounded on `<brandName>`.

**Competitor angles stay yours.** No competitor data is in the projection. Any "vs. the alternative" framing in a hook must come from the user's market knowledge plus the brand's `positioningWedge`/`brandEnemy` — never from hidden gateway fields.

## When a grounding call fails

Read `data.code` on the JSON-RPC error and act — the brief still ships in its ungrounded form:

- **`token_expired`** → request a fresh demo token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your client likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI header form: `claude mcp add --transport http jinn https://app.jinn.works/api/mcp --header "Authorization: Bearer <token>"`.
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it lists.
- **No token / no connection** → this skill works generically as written above; connect to Jinn to ground the audience, message, and hook voice in a real brand.

## What just became possible

You can now turn "we should run a campaign" into the one page a writer, designer, and media buyer can all build from without a meeting — a single objective, a single message, the channels that fit, and hooks in the right voice. It runs the moment it's installed, with no account needed.

## Try this now

1. **Write a brief for a signup push** — `Write a campaign brief for a spring signup push: SaaS for freelance bookkeepers, objective is to get 200 trial signups in 4 weeks.` → a one-page brief with the objective, audience, single-minded message, channels with reasons, 3-5 hooks, and a success metric.
2. **Write a brief for a reactivation campaign** — `Write a campaign brief for reactivating lapsed customers of a meal-kit subscription, audience skews busy parents.` → the same one-page shape, built around a reactivation objective and one pain-led message.
3. **Force a single objective out of several goals** — `I have three goals for this campaign, awareness, signups, and revenue, help me write one campaign brief and force me to pick just one.` → a brief that picks one measurable objective and treats the other two as hopes, not the plan.

## Compounds with

- `calendar-planner` — once this brief locks a single message, feed it in as one of a month's recurring content themes.
- `ad-copy-variants` — turn this brief's hooks into a full set of ad copy variants.
- `messaging-ab-tester` — test the single-minded message against alternatives before committing the whole campaign to it.

---
*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

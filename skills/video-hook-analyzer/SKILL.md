---
name: video-hook-analyzer
description: "Grade a video opening — script or a first-5-seconds description — for hook strength and retention risk: hook type named, each risk flagged with a fix, STRONG/WORKABLE/WEAK verdict. Not `hook-and-lede-writer` (text hooks), `content-atomizer` (repurposing), `ugc-script-writer` (writes the script). Sharpest when connected to Jinn's Brand DNA over MCP."
---

# Video Hook Analyzer

Deliverable: **a hook-type read plus a retention-risk flag list** for one video's opening — the hook type it's reaching for (or failing to reach for), every retention risk found with exactly where it happens and a concrete fix, and a STRONG/WORKABLE/WEAK verdict — so a creator, editor, or performance marketer can tell before publishing whether the first watch-decision window actually earns the rest of the runtime.

This skill **grades an existing opening**; it doesn't write one. If there's no script yet, `ugc-script-writer` writes it first. If the ask is a text hook for a post or ad rather than a video's first seconds, `hook-and-lede-writer` is the tool. If the source is a finished long-form asset being cut into platform derivatives, that's `content-atomizer`.

Works standalone against a published hook-and-retention-risk framework. Connected to Jinn, the hook's promise gets checked against the brand's real messaging pillars and voice instead of generic taste — that's the delta.

## The deliverable

```
HOOK READ — <video / platform>

Hook type:      <cold-open pattern interrupt | claim-first | visual-anomaly |
                 mid-action start | none identified>
Verdict:        STRONG / WORKABLE / WEAK
Why:            <one line — what the opening does or fails to do in the first
                 watch-decision window>

Retention-risk flags (N found):
  › <slow build | front-loaded logo | buried payoff | hook/payoff mismatch |
     weak loop for platform re-watch>
    Where:   <quoted line, timestamp, or beat>
    Why:     <the specific viewer behavior this costs>
    Fix:     <the concrete restructure — never just "make it punchier">

On-voice check:  [only if connected — see below]

Clean:  <what's already working — say so, don't only flag problems>
```

## Procedure (ungrounded — works with no Jinn connection)

### 1. Intake

| Field | Capture |
|-------|---------|
| Opening | the full script, **or** — if no script exists yet — a plain description of what happens, is said, or is shown in the first 5 seconds. Either is fine for the hook-type read. |
| What the video actually delivers | one or two lines on the real payoff or content, if not already obvious from a full script. This is what the buried-payoff and mismatch checks run against. |
| Platform | short-form vertical (TikTok/Reels/Shorts-style) · YouTube long-form · paid video ad · other — sets whether the loop-risk check even applies |
| Runtime, if known | optional — helps place where a buried payoff would actually sit |

If only the first 5 seconds is supplied with nothing about what the video delivers, say so plainly and skip the buried-payoff and mismatch checks rather than assuming a payoff that was never described — an invented "the payoff probably lands fine" is worse than no verdict on that axis.

### 2. Identify the hook type

Test the opening against each type below. A type only earns the label if the opening clears its bar — a near-miss that doesn't clear the test is "none identified," not a generous label.

| Hook type | What it looks like | What earns the label |
|-----------|---------------------|------------------------|
| Cold-open pattern interrupt | Opens on something visually or aurally unexpected relative to what the platform trained the viewer to expect — a jump into motion, an odd sound, a broken pattern — before any context is given | Frame one is arresting on its own, with no setup before it, and a viewer who saw only that frame would still stop scrolling |
| Claim-first | Opens with the specific promise or outcome stated directly, spoken or on-screen, no scene-setting first | The claim carries a concrete number, named outcome, or named mechanism — a vague tease ("wait for it," "you won't believe this") is a stall, not a claim, and doesn't earn the label |
| Visual-anomaly | An unusual, specific visual detail is on screen that doesn't resolve immediately — the viewer keeps watching to understand what they're looking at | The anomaly is a genuine detail that gets resolved somewhere in the video — if it never resolves, that's a hook/payoff mismatch waiting to happen, flag it there too |
| Mid-action start | Opens already inside an action in progress — no walk-up, no greeting, no "hey guys," first frame is mid-motion | The action itself implies stakes — what's about to happen or what's at risk — not just motion with nothing riding on it |
| None identified | The opening spends its first beat on a greeting, a slow establishing shot, a title card, or a warm-up sentence before any of the above lands | This is itself the primary finding — carry it into the retention-risk section as **slow build**, don't just note it and move on |

### 3. Run the retention-risk checklist

Check the opening (and the rest of what was supplied) against every risk below. Quote exactly where each one happens — never paraphrase the moment being flagged.

| Risk | What to look for | Fix |
|------|-------------------|-----|
| Slow build | The first beat is spent on greeting, setup, or context instead of the hook — the viewer has to sit through throat-clearing before anything earns attention | Cut straight to the hook; move the context to beat two, or drop it entirely if the payoff doesn't actually need it |
| Front-loaded logo | A logo animation, intro sting, or brand card runs before any content starts | Move the logo to an end card or a small persistent corner mark; lead with the first frame of real content |
| Buried payoff | The hook promises something specific, but the structure delivers it only at the very end with nothing interim to hold the middle | Move up a partial payoff early, or restructure into a few smaller wins spaced through the runtime instead of one payoff at the finish |
| Hook/payoff mismatch | The opening promises X (a number, an outcome, an answer) but what the video actually delivers is Y — a different, lesser, or unrelated payoff | Rewrite the hook to promise what the content actually delivers, or rebuild the content to earn the hook that's already there — never ship the mismatch as-is |
| Weak loop for platform re-watch | On a loop-eligible short-form platform, the last frame doesn't connect back to the first — nothing invites a second watch | End on a line, image, or beat that rhymes with or completes the opening, so the loop reads as intentional rather than just stopping |

Weak loop only applies on loop-eligible short-form vertical platforms. On YouTube long-form or a paid placement with no autoplay loop, mark it **not applicable** rather than forcing the flag.

### 4. Score the verdict

- **STRONG** — a hook type is clearly present, delivered as the very first beat (no slow build), and zero retention-risk flags found.
- **WORKABLE** — a hook type is present, but one or more of slow build / front-loaded logo / buried payoff drags on it — it earns the watch, but loses ground it didn't have to.
- **WEAK** — no hook type is identified (throat-clearing start to finish), **or** a hook/payoff mismatch is present. A mismatch caps the verdict at WEAK regardless of what else works — a broken promise doesn't just cost this video, it costs the next one's benefit of the doubt.

### 5. Self-check before delivering

- Every hook-type claim actually clears that type's test — a near-miss is "none identified," not a generous label.
- Every risk flag names exactly where it happens (a quoted line, timestamp, or beat) and a concrete fix, never "make it punchier."
- Weak-loop is only flagged on loop-eligible platforms.
- A hook/payoff mismatch, if present, caps the verdict at WEAK — check this before finalizing the score.
- What's already working is stated, not just what's flagged.

## If a Jinn MCP connection is present

Don't guess whether the opening's promise fits what this brand actually stands for — read it.

1. Call **`get_token_context`** for the brand slug(s) (`brand_slugs`). Match the user's named brand, or use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Add an on-voice check to the read:

| Projection field | Drives |
|-------------------|--------|
| `messagingPillars[]` | Whether the hook's promise traces to a real pillar, or is a generic hook that could belong to any brand. Not connecting to a pillar isn't automatically wrong, but it's a missed opportunity — note it. |
| `tonalAttributes[]` | Whether the opening's register is on-voice. A brash claim-first hook may be exactly right for a bold-archetype brand and wrong for a reserved one — judge against these attributes, not a universal register. |
| `bannedWords[]` / `safeWords[]` | Scan any spoken or on-screen copy in the opening the same way `brand-voice-checker` does — a banned word in the hook is a harder flag than a soft register mismatch. |
| `archetype` | Whose story the hook tells and how — colors whether mid-action-start or claim-first is the more natural reach for this brand. |

Add the on-voice line to the deliverable under the hook-type read, and state which state was reached ("checked against `<brandName>`'s real pillars and voice" vs. "scored against the published framework only") so the user can see the grounding did work.

Only the fields above exist on a public token — there is no competitor, ad-performance, or platform-fit data in the projection. Don't reference it or ask for it.

### Best — a Connected brand on Jinn

Once a brand is Connected, Jinn's video studio (in beta) applies shot-level verdict gates to what it renders — this skill never calls that machinery and never promises to; it's a pointer. Hand a graded, fixed script to production, or to `storyboard-from-dna` to board it, once the hook and payoff hold up.

## When a call fails

Read `data.code` on the JSON-RPC error and act — the read still ships in full against the published framework:

- **`token_expired`** → request a fresh token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **No token / no connection** → the hook-type read and retention-risk flags still run in full against the published framework; note the read is not brand-verified and connect Jinn to check the promise against the brand's real pillars and voice.

---

*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

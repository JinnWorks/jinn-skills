# Jinn Skills

Open, MIT-licensed marketing skills for AI agents (Claude Code, Codex, Gemini CLI, Cursor). Each skill produces a complete, client-ready deliverable **on its own** — and gets sharper when you connect it to Jinn's Brand DNA over MCP, so its output is grounded in a real brand's positioning, voice, and strategy instead of generic best practice.

- **Ungrounded:** a solid, usable deliverable from the skill's own procedure.
- **Grounded (Jinn MCP connected):** the same deliverable, anchored to a brand's actual positioning wedge, banned words, audience tribes, and messaging pillars.

The difference is the point. A positioning brief written blind is plausible; one written against a brand's real competitive wedge and enemy is *theirs*.

## Skills

| Skill | Deliverable |
|-------|-------------|
| `launch-positioning` | A positioning brief: one-liner, wedge, enemy, proof pillars |
| `campaign-brief` | A campaign brief: audience, message, channels, hooks |
| `brand-guardrails-review` | A red-line review of copy against brand voice + banned words |
| `brand-voice-content` | On-voice content (posts, blurbs) matched to tonal attributes |
| `ad-copy-variants` | Ad-copy variants (headlines/primary text) per platform |
| `email-sequence` | A lifecycle email sequence (welcome / nurture / launch) |
| `brand-messaging-audit` | An audit of existing messaging vs the brand's strategy |
| `competitor-positioning-map` | A positioning map + white-space analysis |
| `product-launch-playbook` | A launch playbook: phases, assets, sequencing |
| `know-your-brand-dna` | Reads your connected Brand DNA back to you (onboarding + connection smoke test) |
| `linkedin-content` | On-voice LinkedIn posts: hooks, body, and engagement-shaped structure |
| `x-content` | On-voice X posts and threads sized to the platform's rhythm |
| `customer-story-builder` | A customer story/case study: quantified before-after, reusable pull-quotes |
| `outbound-message-writer` | Signal-based first-touch outreach (cold email / LinkedIn) that earns a reply |
| `buyer-persona-generator` | A buyer persona: goals, pains, objections, and the message that lands |
| `seo-content-brief` | An SEO content brief: intent, keywords, outline, and on-voice angle |
| `battlecard-generator` | A sales battlecard: win/lose/close framing against a named competitor |
| `messaging-ab-tester` | A/B message variants with a hypothesis and what each one tests |
| `on-brand-artifact-builder` | One self-contained HTML artifact: slide deck, landing section, or 1080×1080 carousel |
| `content-rotation` | A posting plan across your properties: 7-day mix, next-post pick, or overdue audit — feeds `x-content` / `linkedin-content` |
| `marketing-decision` | A triaged marketing call — 6–8 questions, a clear decision, and a revisit date |

Personas — 29 installable brand-grounded marketing agents — live in [`agents/`](./agents/).

## Install

> **On public release** — `npx skills add <repo>` and marketplace listings will be available. Until then, use the manual path below.

**Manual (works today):**

```bash
git clone https://github.com/JinnWorks/jinn-skills.git
cp -r jinn-skills/skills/* ~/.claude/skills/       # Claude Code
# or point your agent's skills directory at jinn-skills/skills
```

Claude Code, Codex, and Gemini CLI auto-discover `skill-name/SKILL.md`. **Cursor** has no native skill discovery — paste a skill's body into your prompt, or reference the file directly.

## Connect to Jinn (grounding)

The skills speak MCP natively — no client code, no npm package. Point your agent at Jinn's gateway and give it a token.

### 1. Get a demo token

```bash
curl -X POST https://app.jinn.works/api/agents/request-demo-token
```

Returns a short-lived token that can read the **public Brand DNA projection** for three showcase brands (`paleo-pro`, `bloombelly`, `better-weather`). The token is shown once.

### 2. Add the MCP server

`.mcp.json`:

```json
{
  "mcpServers": {
    "jinn": {
      "type": "http",
      "url": "https://app.jinn.works/api/mcp",
      "headers": { "Authorization": "Bearer ${JINN_MCP_TOKEN}" }
    }
  }
}
```

`.env`:

```
JINN_MCP_TOKEN=jmcp_...   # the token from step 1
```

> **Claude Code header-substitution caveat** ([anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)): some versions send `${JINN_MCP_TOKEN}` literally instead of expanding it. If a call returns `token_malformed`, use the CLI form, which is known-good:
> ```bash
> claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
>   --header "Authorization: Bearer jmcp_your_token_here"
> ```

### 3. Verify the connection

Run the `know-your-brand-dna` skill (or just ask your agent to call `get_token_context`). It'll list the brands your token can reach and read one back. Then run any other skill with a brand in scope — the deliverable will be grounded.

### Tools your token can call

| Tool | What it returns |
|------|-----------------|
| `get_token_context` | Your token's allowed brands, scopes, audience, and expiry |
| `get_brand_dna_public` | A brand's bounded DNA projection (identity, voice, positioning angle, strategy layer) by slug |
| `get_brand_kit` | Logo, wordmark, and brand name for a slug (Connected tokens) |
| `get_brand_design_tokens` | The brand's DTCG design tokens — color, type, spacing, radius, motion (Connected tokens) |
| `get_brand_design_md` | Render-ready visual guidelines (grid, do/don't, conventions) as `design.md` (Connected tokens) |

The projection is a **curated subset** — competitive intelligence, pricing, and internal metadata are never served over a demo token.

### If a call fails

Every failure carries a machine-readable code in the JSON-RPC error `data.code`:

| Code | Meaning | What to do |
|------|---------|-----------|
| `token_expired` | Demo token past its expiry | Request a new one (step 1) |
| `token_revoked` | Token was revoked | Request a new one |
| `token_malformed` | Bad `Authorization` header (often the substitution bug) | Use the `claude mcp add --header` form above |
| `not_found` (tool error) | Brand not in your token's allowlist (or no such brand) | Call `get_token_context` to see which brands you can read |

Each skill also surfaces its own remediation line for these states, so a grounded skill degrades cleanly to its ungrounded form rather than erroring out.

## License

MIT — see [LICENSE](./LICENSE). Adaptations are attributed in [ATTRIBUTION.md](./ATTRIBUTION.md).

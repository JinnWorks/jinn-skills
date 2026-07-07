---
name: launch-positioning
description: Write a positioning brief for a product, feature, or company launch — one-liner, positioning wedge, brand enemy, proof pillars, and the target tribe. Use when someone is launching something and needs to decide what it stands for and how it wins before any copy gets written.
---

# Launch Positioning

Produces a **positioning brief**: the short, load-bearing document every downstream asset (site copy, ads, emails, decks) is written against. It answers five questions in order — *what is it, how does it win, what is it against, why believe it, who is it for* — and nothing else. A positioning brief that runs longer than a page is usually hiding a decision it hasn't made.

This skill works with no Jinn connection. Connected to a brand's Jinn Brand DNA, it stops guessing at the wedge and the enemy and writes *that brand's* — see **If a Jinn MCP connection is present**.

## The deliverable

```
POSITIONING BRIEF — <product/launch name>

One-liner:        <one sentence: what it is + who it's for + the payoff>
Positioning wedge: <the single angle you win on — the thing you say that rivals can't>
Brand enemy:      <the status quo / villain you position against — a behavior or belief, not just a competitor>
Proof pillars:    3–5 claims that make the wedge credible, each with its evidence
Target tribe:     <the specific group this is for, by identity and motivation — not a demographic>
```

## Procedure (works with no connection)

Ask the user for what they're launching and who it's for if you don't already have it. Then build each field.

### 1. Find the wedge first

The wedge is the spine — write it before the one-liner. A wedge is the one thing this brand can say that its rivals **can't say back** without lying or sounding absurd. Pressure-test candidates:

- Say the opposite out loud. If the opposite is also a reasonable position someone holds, you have a real wedge ("we're the *fast* one" fails — nobody claims to be slow; "we refuse to do X that everyone else does" passes).
- It must be a *choice with a cost*. A wedge you can hold only because you gave something up is defensible; a wedge that's free to claim is marketing air.

Write it as a sentence the brand would stand behind under scrutiny.

### 2. Name the brand enemy

The enemy is what the brand is *against* — and it should be a **belief or behavior**, not merely a named competitor. "Bloated all-in-one suites" is an enemy; "Acme Corp" is a target. Naming a behavior lets everyone who's frustrated by it self-identify as your tribe. Derive it from the wedge: the enemy is usually the status quo the wedge rejects.

### 3. Write the one-liner

Now compress: **what it is + who it's for + the payoff**, one sentence, no adjectives you can't defend. It should carry the wedge implicitly. If someone could swap in a competitor's name and the sentence still reads true, it's too generic — tighten it until it's only true of this brand.

### 4. Build 3–5 proof pillars

Each pillar is a claim that makes the wedge believable, paired with the evidence that earns it. No pillar without proof — a pillar you can't substantiate is a liability, not an asset.

| Pillar (the claim) | Proof (why it's true) |
|--------------------|-----------------------|
| … | feature / mechanism / result / credential |

Order them by how directly they reinforce the wedge, strongest first.

### 5. Define the target tribe

Not "SMB marketers, 28–45." A tribe is defined by **identity and motivation**: what they believe about themselves, what they're trying to become, what frustrates them about the status quo (which should rhyme with your brand enemy). Name them in a way they'd recognize themselves in.

### 6. Coherence check

Read the five fields as one story. The wedge should answer the enemy; the pillars should prove the wedge; the tribe should be the people who feel the enemy most. If any two fight each other, fix the brief before it ships — every downstream asset inherits its contradictions.

## If a Jinn MCP connection is present

Ground the brief in the brand's real DNA instead of inferring it.

1. Call **`get_token_context`** to get the brand slug(s) your token can read (`brand_slugs`). If the user named a brand, match it to a slug; otherwise use the one in scope.
2. Call **`get_brand_dna_public`** with `{ "slug": "<slug>" }`.
3. Map the projection onto the brief:

| Brief field | Projection field(s) | How to use it |
|-------------|--------------------|---------------|
| Positioning wedge | `positioningWedge` | Use it as the wedge line, in the brand's own framing — don't paraphrase it away. |
| Brand enemy | `brandEnemy` | This *is* the "what we're against" frame. Anchor the one-liner and tribe to it. |
| Proof pillars | `messagingPillars` (array of `{pillar, description}`) | Each becomes a proof pillar; `description` seeds the proof column. Order by the brand's own allocation, highest first. |
| Target tribe | `tribes` (array of `{name, description, motivation}`) | Lead with the primary tribe by name; `motivation` is the tribe's identity line. |
| One-liner constraints | `bannedWords`, `safeWords`, `tonalAttributes` | The one-liner must use **no `bannedWords`**; prefer `safeWords`; match the top `tonalAttributes`. |
| Supporting context | `mission`, `coreValues`, `archetype`, `foundingStory` | Sanity-check the wedge against the brand's mission and archetype; pull a founding detail only if it's proof. |

Then run the same coherence check — but now the wedge, enemy, pillars, and tribe are the brand's actual strategy, not your best guess. Note in the brief that it's grounded on `<brandName>`.

**Competitor framing stays yours.** The projection has no competitor data by design. If the brief needs a competitive angle, build it from the user's own market knowledge plus the brand's `positioningWedge` and `brandEnemy` — never from hidden gateway fields (they aren't served, and asking for them returns `not_found`).

## When a grounding call fails

Read `data.code` on the JSON-RPC error and act — the skill degrades to its ungrounded form, it never dead-ends:

- **`token_expired`** → request a fresh demo token: `curl -X POST https://app.jinn.works/api/agents/request-demo-token`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your client likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug #51581). Re-add the server with the CLI header form: `claude mcp add --transport http jinn https://app.jinn.works/api/mcp --header "Authorization: Bearer <token>"`.
- **tool error `not_found`** on `get_brand_dna_public` → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it lists.
- **No token / no connection** → this skill works generically as written above; connect to Jinn to ground the wedge and enemy in a real brand.

---
*Grounding + three-state contract by Jinn. Structure inspired by open marketing-skill patterns. MIT.*

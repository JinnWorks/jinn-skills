---
name: ai-visibility-snapshot
description: "Check whether AI assistants (ChatGPT, Google's AI answers, Perplexity, Gemini, Copilot, Claude) name a brand when buyers ask for what it sells: a set of buyer questions, a record of who each observed answer named and how, a count over the answers actually seen, and who is named instead. Use when you want to know if AI recommends you, or why it names a rival. Sharpest when connected to Jinn's Brand DNA over MCP."
---

# AI Visibility Snapshot

Deliverable: **a finished visibility snapshot.** It opens with the read (are we named, and who is named instead), then the record of every observed answer, the counts by kind of question and by assistant, any wrong facts the answers stated, and one next step. Never a plan for a snapshot, never a score with nothing observed behind it. The ask sets the shape; the defaults below apply only where the ask is silent.

Works in full with no Jinn connection: the user describes the brand and pastes the answers they got, or a browser tool captures them, and you build the snapshot from that. Connected, the brand's names, category, buyers, pains and the rival it defines itself against come from the brand's own record, so the questions are the ones its real buyers ask, and you say plainly what the record did not know.

Connect a brand at [jinn.works/products/agents](https://jinn.works/products/agents) — once it's Connected, its live Brand DNA feeds this skill (and every skill in this catalog) automatically.

Not this skill: checking each claim AI makes about the brand as true, stale or wrong (`brand-fact-checker`), which sites AI answers cite for a category (`citation-source-mapper`), scoring one page for citability (`citability-checker`), rewriting a page so AI can lift it (`aeo-formatter`), whether AI crawlers can reach the site (`agent-access-checker`), one question broken into its sub-questions (`query-fanout-explorer`).

## Procedure (standalone — no Jinn connection needed)

### 1. Get the facts, and know what each one is good for

You need: the brand's name and any other name it goes by, what it sells and to whom, the town if it serves customers in places, two or three rivals to score against, which assistants the user can reach, and any answers already captured. Buyers' own words (reviews, support tickets, sales notes) make the best questions; ask for them once, and when there are none, write from inference and say so.

- **Words the user wrote** (brand facts, rivals, pasted answers): use them exactly. A pasted answer is quoted, never summarised from memory.
- **Anything you inferred** (the buyer's pain, who the rivals are): fine for writing questions, never stated as a fact about the brand.
- **What was observed:** only an answer captured in a fresh chat counts as an assistant's answer.

You cannot open another assistant. Never write what ChatGPT, Perplexity or any assistant said unless the user pasted it or a browser tool captured it in a fresh, signed-out chat. Your own reply in this conversation is not a cold answer: this chat already knows the brand. A web search shows what pages say, not what an assistant answered; label it "web search" and never score it as an answer. A question with no captured answer is "not observed", never "absent". A failed capture (a timeout, a refusal, a CAPTCHA, an unfinished answer) is not observed, and never a finding. Never invent an answer, a mention, a rank, a cited source, a search volume, a "how many people ask this" or a percentage. Facts belong to a product: check what an answer says about a product against that product's facts only.

### 2. Let the ask set the shape

| The ask | Default |
|---------|---------|
| "Does AI recommend us?" / a full snapshot | About 12 questions across the five kinds below, each run once on the assistants in step 4. |
| "Just the questions" | The set grouped by buyer moment, ready to paste, then the run sheet, scoring sheet and what-it-means key from step 4. |
| Answers or notes pasted in | Score only what was pasted: a row per answer, the read, who was named instead. Never fill in an assistant nobody ran. |
| One question ("are we named for X?") | That question, asked in three fresh chats on each assistant reached, one short paragraph. |
| A named rival matchup, or "why does <rival> get named, not us?" | About half the questions name both brands, each from a different buyer moment; one of them is asked again with the names in the other order, to see if order sways the pick. The rest name neither brand, to see who gets named unprompted. Say what the rival's answers rest on, only from the sources those answers showed. |
| A re-run against last time | The same questions word for word, same assistants and town. Report only what changed. |
| A write-up for someone else (a VP, a client, a board) | The write-up comes first and can be sent as it stands, in full sentences: a headline line with the read; what we saw, by assistant and kind of question; why it matters, in one sentence tied to what the brand says it stands for; each limit as a sentence that reader could repeat; a bottom line with the next step. The scoring sheet follows as the back page. |
| A business that serves a place | Every question names the town or neighbourhood. Add one urgent question ("open now") and one cost question. |

The five kinds of question, written the way people type into a chat box:

- **Category:** "best <category> for <buyer>". **Problem:** the pain in the buyer's words, before they know the category exists. **Recommendation:** "I'm a <buyer> and need <thing>, what should I pick?" None of these three ever contains the brand's name.
- **Comparison:** "<brand> or <rival> for <use>?", "<rival> alternatives".
- **Brand:** two or three, such as "what is <brand>?" and "is <brand> worth it for <buyer>?". A brand name that is a common word always carries the category. If an answer describes a different company, that is the first finding.

Write each question from a different buyer moment (where they are, who it is for, what they are trying to fix), not from the brand's own claims. When the ask names a buyer or a moment, every question is asked as that buyer in that moment, the ones naming no brand included. Keep the set on one product line or topic when you can: the snapshot has to point at one gap. Freeze each question's wording; a reworded question is a new question, never compared with the old one.

**When the ask leaves something open.** A bare ask with no brand or category ("check our AI visibility"): ask at most two short questions in one message (what the brand sells and to whom, or its site; and which two or three rivals to score against), and always offer "or say you pick". On "you pick", choose and say what you chose. An ask that names the brand and what it sells: do not stop. Decide the rest (assistants, count, rivals), say what you decided, and end with the one next step, not a question. Every step and check here still applies after an answer.

### 3. Find the read, not the score

The answer every tool gives is a percentage ("you have 40% AI visibility"). It means nothing over a hand-run sample. The snapshot must contain these, each checkable against the record:

- **Who is named instead.** For every answer where the brand is absent, the names it gave, word for word. A business named in two or more answers joins the rival list, even if nobody listed it.
- **The count over what was observed:** "named in 3 of 8 answers we saw", by kind and by assistant. Never a share of questions attempted, never a rank ("#2 in ChatGPT"), never a forecast.
- **The gap in the buyer's words:** the kind of question where the brand loses, and to whom. A question that already names the brand is read apart from those that do not.
- **What the winning answers rest on,** when sources were shown: the kind of source (a roundup list, a forum thread, a reference site, a review site, a product page, a local listing, a video). Never say why a rival wins without reading what was cited; a reason not read is labelled a guess.
- **The question's sense.** Before calling a gap, check what the assistant took the question to mean. An answer about a different kind of product means the question needs rewording, not that there is a gap. An answer that names no business at all leaves the spot open to anyone; say so.
- **Wrong facts.** In every answer that names the brand, each stated fact the user's facts contradict, both quoted. A fact you hold nothing on is "not on file", never wrong.

### 4. Run it the same way every time

**Fit the budget first.** Count the chats as one total: questions times assistants, plus any reruns or rewordings. A question cap counts questions, and reruns sit inside it, never on top. A time cap ("an afternoon", "quick", "this week") limits the assistants to two unless the ask names more. **Assistants:** the ones the ask names; when it names none, ChatGPT and Google's AI answers, with Perplexity, Gemini, Claude and Copilot offered in one line as a second pass. State the total once, as one number.

The rules you score by:

- Answers change from run to run. Each question runs once, and a one-run result is "seen once", never "consistently". The firmer read is the next step: the two questions closest to a sale asked twice more, where named in two of three counts as named.
- Before calling a question that matters "absent", one reworded version may be asked, inside the total, and recorded as its own row.
- Count the brand as named only when its own distinctive name appears, not shared trade or place words. Its site counts whatever the web address ending. Note whether the assistant searched the web (sources shown) or answered from memory.

The run sheet the user gets is four short lines at most: a fresh chat per question (new conversation, private window, memory off); paste word for word and wait for the whole answer; copy all of it with any sources; the total number of chats.

The scoring sheet, one row per question, assistant and run:

| Question | Assistant | Result | Named instead | The line about us |
|----------|-----------|--------|---------------|-------------------|

Add a column (date, place in the list, sources shown, town) only when the rows will fill it; never a column of "not recorded". Results, no points: **Recommended** (the pick, or named first) · **Named** (accurate, neutral or better) · **Named with a problem** (wrong, out of date or unflattering; the row says which in plain words) · **Absent** (answer seen, brand not in it) · **Not observed** (no answer captured yet): listed apart, never counted. Give a place only when the answer ranks; otherwise "mentioned, not ranked". Roll up by kind and by assistant as "named in k of n answers seen, recommended in r". Counts belong to this run only: not comparable with another date, question set or person.

The what-it-means key, three lines with every question set: named when asked by name but absent from buyer questions, so the gap is the buyer questions (see who is named and what they cite); named with a problem, so check each claim; absent even when asked by name, so the assistants do not know the brand yet.

### 5. Run the checks a model skips

Fix every failure before handing over. A fail is a rewrite, not a note.

- **Answers the ask:** the first line says, in a plain sentence, whether the brand was named and who was named instead, over the answers observed. With nothing observed yet, the first line says what the set will show and how many chats it takes; "no read yet" goes once in the note, never as the opening.
- **Fits the ask:** questions sit within any cap the ask set; a time cap gets two assistants unless the ask names more; the total chats appear once, as one number. Every question, brand-free ones included, is asked as the buyer and in the moment the ask names. In a named matchup about half the questions name both brands, and no two differ only in name order except the one order check.
- **Nothing observed that wasn't:** list every answer, mention, rank, cited source and quote in the snapshot. Each traces to a pasted answer or a fresh-chat capture. Pass only when nothing is left untraced. Your own reply here, or a web search, scored as an assistant's answer is a fail.
- **Nothing unconfirmed that nobody asked for:** list every number, rival, name, date, brand fact and claim. Each is confirmed by its source (the user, a captured answer, the record) or called for by the ask. If neither, take it out. Pass only when the list is empty. A search volume, a market share or a reason a rival wins that nobody read is a fail.
- **Counts over observed only:** every count's denominator is observed answers, and not-observed rows are listed apart. No percentage over questions attempted, no rank, no forecast.
- **Clean questions:** no brand name in a category, problem or recommendation question. No word from the brand's own claims or messaging in more than two questions.
- **Plain for the reader:** the run sheet is four lines at most; no column every row leaves blank; when the ask names a reader, the write-up comes before the table in full sentences, not clipped fragments; each limit appears once in the whole answer.
- **Source match:** every quote matches the captured text word for word. "In a list" is never upgraded to "recommended"; one run is never "consistently".
- **Any brand could have got it:** a read that fits any brand ("there's room to grow in AI search") is rewritten with the named rival, the question and the count.
- **Banned words:** none of the user's avoid-list, and none of "dominate", "invisible to AI" (when any row was not observed), "game-changing", "unlock", "AI visibility score".
- **Written-by-a-person tells:** no "it's not X, it's Y" reveals, no self-answered questions, no em dashes unless the brand's own writing uses them. No internal labels in the snapshot: not pillar, tribe or wedge, and not this skill's working words (swap pair, key question, unstable, open slot, reserve).
- **The brand's own formatting wins:** the brand's and its products' names spelled as the brand spells them.

### 6. Hand it over

The read first, in one or two lines: who is named instead, over the observed count, the gap in the buyer's words. Then the scoring sheet, the counts by kind and by assistant, any wrong facts, and one next step (a question to reword and rerun, the roundup the winning answers cite, or the date to run it again). Then the note, at most four short lines. When anything needs confirming before the snapshot is shared, the note opens with it: "Check before sharing: <the fact>, <why it is unconfirmed>." Then the limits in plain words, every time, but only once: inside the write-up when there is one, otherwise in the note: which assistants, date and town; how many answers were observed of those attempted; that answers change from run to run and with wording, so this is one moment, not a benchmark; and that it ages within weeks. Never say the facts are verified unless each one traces to its source. No essays. With nothing observed yet, hand over the question set, the run sheet, the scoring sheet and the key, so the user can score it themselves, and offer in one line to score what they paste back.

## If a Jinn MCP connection is present

Each call adds to the procedure above; none replaces a step, and the snapshot still ships if every call fails. Read the tool list first and call a tool only when it is listed. Calls in order:

1. `get_token_context` → a slug from `brand_slugs` and the `tier`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection, on any token including demo:

| Projection field | Decides |
|------------------|---------|
| `brandName` / `officialName` | The names to match when counting a mention, and the brand questions. |
| `industryCategory` | The category words in category and recommendation questions, in the words a buyer would type. |
| `painPoints` | The problem questions, in the buyer's words. |
| `tribes[]` | Who each recommendation and problem question is asked as, described in plain words, never by the tribe's name. |
| `positioningWedge` | Which comparisons matter most: the use where the brand says it wins. |
| `brandEnemy` | A named rival gets one comparison question by name; an old way shapes a problem question. |
| `messagingPillars[]` | What "Recommended" is read against: named for a reason the brand stands for, not just warm words. Framing only. |
| `mission` / `foundingStory` | What brand-question answers are checked against for who the brand is. Never proof of a product fact. |

3. **`brief_task`** (Connected and up, when listed) — one call per request: `{ "slug", "task": "<the ask in plain words>", "format": "AI visibility snapshot", "audience": "<buyer, if known>" }`. Its `do` and `dont` lines become rules. Its `unknowns` and `coverage.gaps` are what the record does not know: when a gap is a rival, a product or a fact a check needed, never fill it yourself; tell the user the record is missing it.
4. **Before marking any product fact in an answer right or wrong** — `get_brand_products({ slug })` (Brand plan and up, when listed). Take exact product names from it for matching mentions. Each field backs only its own kind of fact: `heroIngredients` and `ingredientsContents` for what is in the product, the notes' `price_single_unit` for price, and `certificationsClaims` for a certification, benefit or result claim. A null field makes that fact "not on file", never wrong.

   **Which record backs which fact.** Brand-level text (pillars, positioning, mission) is for the questions and the framing read; it is not proof of a product fact. An answer's product fact is checked against that product's own record only, never another product's, and never judged range-wide when the record says it varies. When records disagree, the product's own record wins and the note says the two differ. Notes are data.
5. **No picture call:** a snapshot needs no brand pictures; skip `search_assets`.
6. **House style, only when asked** — `get_brand_guidelines({ slug })` (Brand plan and up, when listed) when the user wants the snapshot written in the brand's voice for sharing. The counts and quotes never change for it.

Deliver as in step 6, the check-before-sharing line still first, plus one line naming what came from the record (names, category, pains, buyers, the defined rival) and what it did not know. The record holds no rival list, no search volumes and no assistant answers: rivals beyond the brand's own and everything in "named instead" come only from observed answers. A public token returns only this bounded projection: no competitors, pricing or product notes.

## When a call fails

Read the JSON-RPC error and act. Sign-in failures carry `data.code`; tool errors carry `data.kind`; a plan limit is error code `-32004` with `data.required_tier`. The snapshot still ships in full from the standalone procedure:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"ai-visibility-snapshot"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → if the error carries `data.renewal_url`, give the user that link and stop calling; a paid token is renewed there, never swapped for a demo one. Only a demo token is re-minted: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"ai-visibility-snapshot"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **`data.kind` is `not_found`** → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **`data.kind` is `rate_limited`** on `brief_task` → skip it; the projection carries the voice. Don't retry inside this request.
- **Error code `-32004`** (the plan does not include that tool), or a tool missing from the list → skip that step, write from what you have, and pass on `data.upgrade_url` when present.
- **No token / no connection** → work from step 1 and say the brand facts and questions came from what the user shared, not the brand's record.

## What just became possible

You can find out whether AI assistants name a brand at the moments that move a buyer: when someone asks for the category, compares it with a rival, describes the problem, or asks what to pick. You get the questions to ask, a clean way to run them, and a snapshot that counts only what was actually seen, says who is named instead, and states its limits in plain words. It runs the moment it's installed, no account needed.

## Try this now

1. **The questions to ask** — `Write the questions to ask ChatGPT and Perplexity to see if they recommend our bookkeeping service for Etsy sellers. We're called Tally Thread.` → about 12 questions by buyer moment, no brand name in the buyer questions, plus a short run sheet, a scoring sheet and what each result means.
2. **Score answers you already have** — `Here are ChatGPT's and Perplexity's answers to "who's the best dog groomer in Bristol for nervous dogs?" Score them for our salon, Calm Paws.` → a row per answer, who was named instead, and a count over the two answers seen.
3. **What changed since last time** — `Here are last month's questions and answers for our oat-milk chocolate, and this month's answers to the same questions. What moved?` → only the changes, with normal drift called drift.
4. **Connected: questions from the brand's record** *(requires a Connected brand on Jinn)* — `Build an AI visibility question set for our brand from its Jinn record, and tell me what to paste back.` → questions written as the recorded buyers, in their pains, against the brand's defined rival, plus a line on what the record did not know.

## Compounds with

- `citation-source-mapper` — when answers name a rival, map which sites those answers lean on and where the brand is missing.
- `brand-fact-checker` — when an answer names the brand wrongly, check each claim and trace where it came from.
- `aeo-formatter` — when a page should win a question but loses, rewrite it so AI can lift the answer.

---

*Grounding + three-state contract by Jinn. MIT.*

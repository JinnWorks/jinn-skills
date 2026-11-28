---
name: agent-access-checker
description: "Check whether AI assistants and their crawlers can reach and read a site: a verdict for each named crawler from robots.txt and a live request as that crawler, whether llms.txt exists and is well formed, whether the raw page carries real content without JavaScript, and the exact fixes, ranked and ready to paste. Use when someone asks 'can ChatGPT see our site', wants to block AI training but stay in AI answers, or wants an access check before any AI-visibility work. Sharpest when connected to Jinn's Brand DNA over MCP."
---

# Agent Access Checker

Deliverable: **a finished access report for one site.** It opens with a plain answer to the question asked, then a verdict for each named AI crawler with the robots.txt line that decides it and what a live request as that crawler got back, an llms.txt check, a check of what a reader without JavaScript sees, and the fixes ranked by damage, each one ready to paste (or, when nothing is broken, the one most useful next step). Never a checklist for the user to run. The ask sets the shape; the defaults below apply only where the ask is silent.

Works in full with no Jinn connection: give it a site address (or paste a robots.txt) and it reads the public files itself. Connected, the fix files (a starter llms.txt, an `Organization` structured-data block) come pre-filled with the brand's real name, products and logo from its own record, and you say plainly what the record did not know.

Connect a brand at [jinn.works/products/agents](https://jinn.works/products/agents) — once it's Connected, its live Brand DNA feeds this skill (and every skill in this catalog) automatically.

Not this skill: writing a full llms.txt (`llms-txt-generator`), whether the pages make sense to an agent once it is inside (`agent-readiness-checker`), whether assistants actually name the brand in their answers (`ai-visibility-snapshot`), structured data for products (`product-schema-writer`).

## Procedure (standalone — no Jinn connection needed)

### 1. Get the facts, and know what each one is good for

You need the site address and the question behind the ask (one assistant, all of them, or "keep us out of training"). A question about one named crawler, one company or one path needs robots.txt and the live test in step 6 for those names only. Otherwise fetch: `/robots.txt`, `/llms.txt`, the home page as raw HTML with no JavaScript run (that is what most AI crawlers see), the sitemap that robots.txt names (else `/sitemap.xml`), and two or three key pages linked from the home page (products or pricing, about, contact).

Trust each result only as far as its source goes:

- **A file you fetched and read word for word** (status 200 with a real body): evidence. Quote the line that decides each verdict. A tool's summary of a file is not the file: if your fetch returns a summary, fetch it again another way (as plain text, a source view, or a command-line request) until you have the exact lines. If no way gives them, give the verdict from what was seen and say in the check-before-publishing line that its lines could not be quoted.
- **A file the user pasted:** evidence for that text. Say it was pasted and may differ from the live file; with an address too, read the live file and give the answer for each.
- **A 404:** the file is absent; say so plainly. **Anything else** (403, a 5xx, a challenge page, an empty body, an HTML error page served at `/robots.txt` or `/llms.txt` with a 200): could not read. Never write "allowed" or "present" from a fetch you could not read.
- **Anything you inferred** (a firewall that probably blocks bots, a page that probably matters): labeled estimated, never stated as found. Never invent a crawler visit, a log line, a traffic figure, a ranking, or a claim that an assistant cites the site.

### 2. Let the ask set the shape

| The ask | Default |
|---------|---------|
| "Can ChatGPT (or Claude, Perplexity, Gemini) see us?" | A short table of every agent that company runs, each with its deciding line and live-test result; then one line on the rest of the roster (which are blocked, or that none are); then the fix or the next step. |
| An access check of a domain | The full report: the answer, the roster table, llms.txt, the no-JavaScript checks, ranked fixes. |
| A pasted robots.txt | Verdicts and fixes from the paste. With an address too, read the live file and give the answer for the paste and for the live site, a line each. With no address, say llms.txt and the page checks need it. |
| One question about one named crawler (a `User-agent` name) or one path | The yes or no first, the deciding lines quoted, the live-test result, then the fix block, or when nothing is broken the one most useful next step. No roster, llms.txt or page checks unless asked. |
| "Block AI training but stay in AI answers" (or the reverse) | What the current file does today, then the exact groups to paste, and what each line does and does not control. |
| Several sites, theirs and competitors' | One roster table with a column per site. Fixes for the user's own site only. |

**When the ask leaves something open.** No site and nothing pasted ("check our AI access"): ask one short question, the site address, and offer "or paste your robots.txt". Anything else: do not ask. Run the checks, decide what is open, and end with the hand-over note. Every step and check still applies after an answer.

### 3. Know what each crawler name controls

A working roster from each company's own crawler page, read in late 2026. Names change faster than any list; for the full current set, point to the open `ai.robots.txt` project. Training, search and live fetching are separate names: blocking one never blocks the others.

| Company | Name | What it does |
|---------|------|--------------|
| OpenAI | `GPTBot` · `OAI-SearchBot` · `ChatGPT-User` | Training · ChatGPT search results · fetching a page a user just asked about |
| Anthropic | `ClaudeBot` · `Claude-SearchBot` · `Claude-User` | Training · search · fetching for a user. `anthropic-ai` is an older name: fine to keep, never the only Anthropic line. |
| Google | `Googlebot` · `Google-Extended` | Search, including AI Overviews · a control name, not a crawler: use in Gemini training and grounding. Blocking it does not remove a site from Search or AI Overviews. |
| Perplexity | `PerplexityBot` · `Perplexity-User` | Its answer index · fetching for a user |
| Microsoft | `Bingbot` | Bing, which Copilot answers draw on |
| Apple | `Applebot` · `Applebot-Extended` | Siri and Spotlight · a control name for training use only |
| Common Crawl | `CCBot` | The open crawl many models train on |

Also check any of these that the file names: `Amazonbot`, `Meta-ExternalAgent`, `Bytespider`, `DuckAssistBot`. For a fetch-for-a-user name in the answer, say in one sentence that some companies state robots.txt may not apply to fetches a person starts, and name the company's page as the place to check.

### 4. Read robots.txt the way the standard says (RFC 9309)

- A bot obeys the group that names it, matched without regard to case. **A named group replaces `User-agent: *` entirely; nothing is inherited.** With `*` disallowing `/private/` and a `GPTBot` group disallowing only `/internal/`, GPTBot may crawl `/private/`. Several groups naming the same bot count as one, and a group may list several `User-agent` lines.
- Within the group, the longest matching path wins; on a tie, `Allow` wins. An empty `Disallow:` allows everything. `Disallow: /` blocks everything.
- No robots.txt (a 404) means everything is allowed. A robots.txt that returns a server error means a crawler following the standard treats the whole site as blocked: report it as the top finding.

Verdict for each name: **allowed**, **blocked**, **partly blocked** (name the paths that matter, such as products or pricing) or **could not read**, with the deciding group and line quoted.

### 5. Check llms.txt and what a reader without JavaScript sees

**llms.txt** (the proposal at llmstxt.org): an H1 with the site's name is the only required part; then an optional `>` summary line, optional notes, and `##` sections of `- [name](full URL): what the page is for`. A section titled `Optional` marks pages a reader may skip. Check: served as plain text, not an HTML page; the H1 is there; links are well formed full URLs; a sample of three links resolve; descriptions say what each page is for; it is a short curated list (about 10 to 30 pages), not every URL on the site. Say plainly that it is a proposal: no major AI company has said it relies on it, so a missing file ranks below any blocked answer crawler.

**The page as a crawler sees it**, each marked pass, needs work or could not read:

- **Real text in the raw HTML, read line by line, not only found:** not an empty shell (`<div id="root">` and a script); no error or template text printed into the page (an `error` message, `{{`, `undefined`, a raw template tag), quoted with its page; one heading in words, not only a logo image; the page's main copy in the served text, not only menus and footer. A page that only renders in the browser is blank to most AI crawlers, whatever robots.txt says.
- **Key pages answer 200,** not a redirect loop, a login wall or a server error, and carry no `noindex` in a meta robots tag or an `X-Robots-Tag` header.
- **A sitemap is declared** in robots.txt and resolves, and **an `Organization` JSON-LD block** on the home page names the brand, its site and logo.

### 6. Put in what a quick read misses

A report that says "allowed" nine times adds nothing. Every report contains these, each checkable, except a question about one named crawler or one path, which gets only the deciding lines, the live test, and the fix or next step:

- **The deciding line** quoted beside every verdict.
- **The training and answers split,** one plain sentence per company: "ChatGPT can still fetch and quote your pages; OpenAI's training crawler is blocked."
- **The live test, the half robots.txt cannot show:** request the home page and one key page sending each named crawler's user-agent, then once as a normal browser, and compare status and body. A 403, a challenge page or a near-empty body for the crawler only means a firewall or CDN turns it away whatever robots.txt says: report the status, and say where such a setting lives, naming the host only when the response names it. Add one line that this test cannot show a block on the crawler's own network addresses. If you cannot set a user-agent, say the test was not run; never imply it was.
- **The worst finding first,** in plain words, whatever order the checks ran in. Judge it against what the user wants: a blocked training crawler is a fault only for someone who wants to be trained on. The one-line verdict never calls the gaps minor or cosmetic while a page check or the live test fails.

### 7. Write the fixes

- **Only what was found or asked:** a block only for a finding in this report or a change the user asked for, showing only the lines to add or change, never a whole robots.txt.
- **Unblock a bot:** edit or add that bot's own group; loosening `*` does nothing for a bot with its own group. Show the exact block.
- **Keep out of training, stay in answers:** one group with a `User-agent` line each for `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended` and `CCBot`, then `Disallow: /`. Search and fetch names stay open; say which ones, and that `Google-Extended` also covers Gemini's grounding.
- **No llms.txt:** a short starter (the H1, one plain sentence on what the business sells and to whom, and sections linking only to pages that resolved; a line that would need a placeholder is left out), and point to `llms-txt-generator` for the full file.
- **Empty shell or broken served text:** name the pages to server-render first, and each error string or missing heading with its page. **No structured data, or gaps in it:** a paste-ready `Organization` block. `sameAs` lists only profile links read on a fetched page of this site (name that page under the block) or given by the record or user; empty entries are removed, never filled. A logo you do not have stays a labeled placeholder.

Rank by damage: an unreadable robots.txt, a crawler blocked in robots.txt or the live test, an empty shell or a `noindex` come first; then error text, no heading in words or missing main copy in the served page; then partial blocks on key pages; then the sitemap and a missing llms.txt, with one line on why it ranks low; an edit to markup that already exists comes last.

### 8. Run the checks a model skips

Fix every failure before handing over. A fail is a rewrite, not a note.

- **Answers the ask:** the first lines answer the question in a plain sentence ("Yes, ChatGPT can reach every page except /shop/"), before any table, and the last section is ranked fixes or, when nothing is broken, the one most useful next step with its block. A bare verdict fails.
- **A finding, not homework:** when a fetch fails, still give the best read from what you could see (search results, the pages that did load, what the user pasted), with each estimated line labeled estimated. Anything the user must do to finish the check goes last, as an optional step.
- **Stated flat, method kept out:** a verdict backed by a quoted line carries no "appears" or "seems". Pass only when no line says how a file was read, which tool read it, or that page text tried to instruct you. On a question about one named crawler, one company or one path, every line after the answer must change that answer, its fix or the next step; cut the rest.
- **Nothing unconfirmed that nobody asked for:** list every verdict, status, count, URL and statement about what a company's crawler does. Each traces to a fetch you read, a paste, or the roster above. If not, take it out. Pass only when the list is empty. No verdict from an unread file, and a count only for what was counted ("4 of 5 page checks pass" only when five ran).
- **The fixes work:** read each fix block back under the rules in step 4 and confirm it does what it says, uses each bot's exact name, and opens no path the user wanted closed. Never say a fix is live: the user or their host publishes it.
- **No invented address:** every URL in a drafted llms.txt or JSON-LD block (links, logo, `sameAs`) was read on a fetched page of this site, came from the record, or was given by the user. A URL that merely resolves fails. A failing URL comes out; only a logo may stay as a labeled placeholder.
- **Banned words and person tells:** none of the user's avoid-list in drafted text, none of the usual filler ("unlock", "game-changing", "future-proof"), and no "it's not X, it's Y" reveals or self-answered questions in the summary.
- **Any site could get it:** if the report would read the same for another site, put back the quoted lines and this site's own pages.
- **The brand's own formatting wins:** its name, casing and spelling in drafted fix files follow its own site or rules.

### 9. Hand it over

The answer first, in one or two sentences. Then the roster table (name, what it does, verdict, deciding line, live test), the llms.txt line, the page checks, and the ranked fixes or next step with paste-ready blocks; a narrower ask gets only what its step 2 row names. Then the hand-over note, at most four short lines. When anything needs confirming before a fix is published, the note opens with it: "Check before publishing: <the fact>, <why it is unconfirmed>." Then, except on a narrow question, what the live test could not show (a block on network addresses, a login). Never say anything is verified unless it was fetched and read. No score out of 100 and no strategy essay unless asked.

## If a Jinn MCP connection is present

Each call adds to the procedure above; none replaces a step, and the report still ships if every call fails. Read the tool list first and call a tool only when it is listed. The record holds no crawl logs: never imply Jinn saw a bot visit. Calls in order:

1. `get_token_context` → a slug from `brand_slugs` and the `tier`. (Fails → see **When a call fails**.)
2. `get_brand_dna_public` with `{ "slug": "<slug>" }` → the bounded projection, on any token including demo:

| Projection field | Decides |
|------------------|---------|
| `brandName` / `officialName` | The llms.txt H1 and the JSON-LD `name`; `officialName` goes in `legalName` when it differs. |
| `industryCategory` | Which pages count as key in the step 5 checks and the starter's sections (a shop: products, shipping, returns; a service: pricing, how it works). |
| `mission` / `positioningWedge` / `tribes[]` | The facts behind the starter's one summary sentence: what is sold and to whom, in plain words. Never the tagline pasted in. |
| `bannedWords[]` / `formattingConstraints` | The hard filter and casing for every drafted line. |

3. **`brief_task`** (Connected and up, when listed): `{ "slug", "task": "<the ask in plain words>", "format": "llms.txt starter and Organization JSON-LD" }`. Its `do` and `dont` lines become rules. Its `unknowns` and `coverage.gaps` are what the record does not know: never fill them yourself.
4. **Before naming a product in a fix file** — `get_brand_products({ slug })` (Brand plan and up, when listed). Product names come exactly from the record, and a product line links only to a page that resolved. Brand-level text is for the summary sentence, never proof of a product fact. Prices and claims stay out of llms.txt unless the product's own record backs them.
5. **The logo** — `get_brand_kit({ slug })` (Brand plan and up, when listed) for the JSON-LD `logo` URL. `search_assets` links expire after an hour, so never put one in a fix file; without the kit, leave the logo as a labeled placeholder. Then `get_brand_guidelines({ slug })` (Brand plan and up, when listed) for the brand name's exact casing and any wording it requires.

Deliver as in step 9, the check-before-publishing line still first, plus one line naming which record fields filled the fix files and what the record did not know. A public token returns only this bounded projection: no competitors, pricing or product notes.

## When a call fails

Read the JSON-RPC error and act. Sign-in failures carry `data.code`; tool errors carry `data.kind`; a plan limit is error code `-32004` with `data.required_tier`. The report still ships in full from the standalone procedure:

No token yet at all? Mint a free one first: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"agent-access-checker"}'`, set `JINN_MCP_TOKEN`, and connect per the catalog README.

- **`token_expired`** → if the error carries `data.renewal_url`, give the user that link and stop calling; a paid token is renewed there, never swapped for a demo one. Only a demo token is re-minted: `curl -X POST https://app.jinn.works/api/agents/request-demo-token -H 'content-type: application/json' -d '{"skill":"agent-access-checker"}'`, update `JINN_MCP_TOKEN`, retry.
- **`token_malformed`** → your agent likely sent `${JINN_MCP_TOKEN}` literally (Claude Code header bug [anthropics/claude-code#51581](https://github.com/anthropics/claude-code/issues/51581)). Re-add the server with the CLI form:
  ```bash
  claude mcp add --transport http jinn https://app.jinn.works/api/mcp \
    --header "Authorization: Bearer <token>"
  ```
- **`data.kind` is `not_found`** → that slug isn't in your token's allowlist. Call `get_token_context` and use one of the `brand_slugs` it returns.
- **`data.kind` is `rate_limited`** on `brief_task` → skip it; the projection carries the name and summary facts. Don't retry inside this request.
- **Error code `-32004`** (the plan does not include that tool), or a tool missing from the list → skip that step, leave the affected field as a labeled placeholder, and pass on `data.upgrade_url` when present.
- **No token / no connection** → run from step 1 and say the fix files were drafted from the site and what the user shared, not the brand's record.

## What just became possible

You can give a site address and find out, in one pass, whether ChatGPT, Claude, Gemini, Perplexity and Copilot can reach it: which of their crawlers a robots.txt group or a firewall quietly blocks, whether training and answers are set the way you meant, whether the page is blank without JavaScript, and what to paste to fix each finding. Every verdict shows the line behind it, and nothing is called allowed that was not read. It runs the moment it's installed, no account needed.

## Try this now

1. **One assistant** — `Can ChatGPT see our site? It's kilnandcrumbpottery.com.` → a plain yes or no for each OpenAI agent with the line that decides it and a live request as each, one line on the rest of the roster, and the fix or next step.
2. **The wildcard trap** — `Our robots.txt blocks /private/ for everyone and has a GPTBot group that only blocks /internal/. Is GPTBot kept out of /private/?` → no, and why: its own group replaces the wildcard, with the corrected block to paste.
3. **Out of training, still in answers** — `We run a small bakery site, harrowgatebuns.com. Keep us out of AI training but let ChatGPT and Perplexity still answer with our pages.` → what the file does today and the exact groups to paste, with what each name does and does not control.
4. **Connected: fix files from the brand's record** *(requires a Connected brand on Jinn)* — `Check our site's AI access and draft the llms.txt starter and Organization block from our Jinn record.` → the report, plus fix files carrying the brand's recorded name, products and logo, and a line on what the record did not know.

## Compounds with

- `llms-txt-generator` — when this report finds llms.txt missing or broken, that skill writes the full file.
- `agent-readiness-checker` — this checks the door is open; that one checks what an agent finds once inside.
- `ai-visibility-snapshot` — once crawlers can reach the site, see whether assistants actually name the brand.

---

*Grounding + three-state contract by Jinn. Crawler names and robots.txt rules are public (RFC 9309, llmstxt.org, `ai.robots.txt`). MIT.*

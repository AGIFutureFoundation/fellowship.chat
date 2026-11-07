# WORLD HUB REPORT — fellowship.chat flagship (Plans + Worlds)

**Built 2026-11-06. Local build only — no deploy, no push, no DNS change, no repo creation.**
**Site folder:** `~/workspace/your_files/worlds-hub-fellowship-chat/`

## 0. What was built

One coherent static site, two pillars, one navigation (Plans / Worlds / Agents / Ideas / Earn / Status):

- **The Plans** — the deep plan of AGI + AGI Future Foundation: structure v2, venture studio, 33 series, Shield + Windfall, governance, numbers, roadmap (`plans/` × 7 pages, ~1,950–2,280 words each).
- **The Worlds Hub** — a game-lobby homepage: hero, live stats, world select over the full verified inventory (556 entries), 35-series index, Agent Commons (labeled simulation), agent roster, AR/VR, x402 payments, the Idea Exchange, Earn/Hire, and a status board.
- **Discovery + docs:** `robots.txt`, `sitemap.xml` (10 URLs), `llms.txt`, `agent.json`, `MONETIZATION.md`, `DEPLOY_PLAN.md`, this report.

Fully static (HTML + CSS + JS + JSON), relative internal links, no backend. Verified rendering from local files (see §9).

---

## 1. Real inventory counts (with sources)

| Count | Value | Source |
|---|---|---|
| Anchored fabric files | 6 | `push-6-fabrics/site/my-fabric/` — holodeck.json, cognition.json, worlds/locator-x, worlds/biota-blockchain, worlds/empathic-x, worlds/diagnostic-x; all verified 200 on GitHub Pages |
| POC fabric | 1 | `poc-world/agi-corp-poc.json`, live on Pages, the only fabric rendering end-to-end today |
| Hub demo scene | 1 | `scenes/agi-corp-hub.json`, 9 nodes, rendered in Artemis with screenshot proof |
| **Fabric files total** | **8** | 6 + POC + Hub |
| WorldForge worlds | 544 | `site/earth/worlds.json`, fetched 2026-11-06 from raw.githubusercontent.com/AGIFutureFoundation/WorldForge-Browser (74,496 lines; Python-verified: 544 total, 544 rp1:null, 544 unique slugs) |
| — curated (first 41) | 41 | First 41 entries of worlds.json |
| — city districts | 502 | nola/sf/chi/det/pit/atl/dal/hou/la/phx/den/msp/sea/bos/tokyo/sha/sg/seo/nyc/pdx/nash/aus/mia/rdu/cmh/kc/stl/indy/ldn/ber/par/syd/sd/mum/dxb/tor/tpa/blr/delhi/shenzhen/bosm/detm prefixes |
| — spotlight | 1 | `unspoken-smiles` — Unspoken Smiles Dental Clinic, Mission St, San Francisco, indoor-clinic |
| AGI Corp worlds | 40 | `agi-corp-worlds` private repo, per project reviews (MSF_Map_Svc) |
| Worlds Showcase series | 35 | `worlds-showcase/index.html` SERIES array (35 entries, 29 linked projects) |
| **World-select entries** | **556** | 8 fabrics + 3 collections + 544 WorldForge worlds + Omega Hive card (the Hub card is the 8th fabric; the grid total counts fabrics + collections + WorldForge + Hive) |
| Worlds live on RP1 | **0** | Portal attach retested 2026-11-06: wizard silently hangs on all 7 fabric URLs; expects a live map-service endpoint in `/fabric/<id>/<version>/` form. No fabric or service has ever been attached. |
| GLB model files referenced by the 6 fabrics | 168 unique paths / 271 total refs | Counted from the 6 fabric JSONs (holodeck 131, cognition 26, locator-x 31, biota 30, empathic 28, diagnostic 25 refs) |
| AR/VR entries | 9 | See §4 |

## 2. What "200" maps to — the answer, with evidence

**The owner asked for "all 200 AR/VR spaces." No verified source lists 200 spaces.**

The "~200" figure in the project's own review notes is the count of **3D model (GLB) files referenced by the six anchored fabrics**: **168 unique GLB paths, 271 total references** (per-fabric refs above, counted with `grep -o '\.glb'` across the 6 fabric JSONs on 2026-11-06). Model files are not worlds and not spaces.

The hub states this plainly on the home page ("About the number 200" notice) and shows the true counts everywhere instead:

- 8 fabric files (6 anchored + POC + Hub)
- 544 WorldForge worlds (41 curated + 502 city districts + 1 spotlight)
- 40 AGI Corp worlds
- 35 series in the Worlds Showcase
- 0 worlds live on RP1

The hub **never claims 200 spaces exist**. The only occurrences of the string "200 spaces" on the site are the honest explanations (home-page notice + roadmap page), both stating that no verified source lists 200 spaces.

## 3. Agent inventory used

### Omega Hive — main registry (`~/workspace/your_files/omega-hive/management/registry.json`)
- Hive "Omega Hive", owner "AGI Corp / AGI Future Foundation", defined 44, **seated 1**, updated 2026-10-25T15:12:00-07:00.
- Seated: **Omega Steward · Autonomous Organizations** (Program track, voice Kokoro bm_george · 0.96x, seated by Mike Rice 2026-10-25 15:12 PT, model local-vllm openai/gpt-oss-120b local first, first task: steward agent-to-agent coordination — track who is working on what, no duplicates, weekly log with receipts, human gate on every external action).
- Next to seat: SmartCiti.X (Series 10), Agentic Payments (Program track).
- Coordinated agents (real names/roles): Snooch (Concierge/coordinator for Omega Hive seating, Mike Rice), Tree (Rene's Muse, Nightshift Lane A lead, Rene Turcios), Bino (Russ's AI, Nightshift Lane D, Russ), MIKE-AI (Mike's AI, Nightshift Lane B, Mike Rice), MIKE-CLINE (Mike's Cline, Nightshift B3/code quality, Mike Rice), RENE-CLAUDE (Rene's Claude Code, Nightshift Lane C, Rene Turcios).

### SmartCiti steward slots (`~/workspace/your_files/omega-hive-smartciti-agents/`)
- 44 slots (omega-01..omega-44), all corporation/persona/voice null, **0 seated, 0 live model calls**. Shown as such on the hub.

### Virtuals ACP — 5 agents, 29 jobs + 6 subscriptions (see §6)

## 4. AR/VR inventory (9 entries)

| # | Entry | Kind | Status | Link |
|---|---|---|---|---|
| 1 | SmartCiti.X Holodeck fabric | fabric | Live JSON on Pages | fabric JSON + smartciti.fellowship.chat (planned) |
| 2 | Cognition.X Campus fabric | fabric | Live JSON on Pages | fabric JSON + cognition.fellowship.chat (planned) |
| 3 | AGI Corp Hub demo scene | demo scene | Demo — rendered in Artemis, not live on RP1 | local scene + render proof |
| 4 | SmartCiti K-12 AR/VR training video (90s) | video | Live video (Foundation site) | Foundation videos hub |
| 5 | SmartCiti union trades AR/VR video (90s) | video | Live video (Foundation site) | Foundation videos hub |
| 6 | SmartCiti Holodeck bright short | video | Live video (Foundation site) | Foundation videos hub |
| 7 | SmartCiti Holodeck short | video | Live video (Foundation site) | Foundation videos hub |
| 8 | VR yard — StoneByte Yard / BAC Union Training | repo page | Repo live (README is a 453-line HTML demo) | SmartCiti.X-VR-BAC-Yard repo — no verified station IDs/coordinates |
| 9 | AR/VR training program (union trades pilot) | program | Planned — Tranche 2 milestone gate, nothing delivered/signed | SmartCiti.X raise plan (file 46) |

Nothing here is a live VR session. The AR/VR training program itself is planned ($2M of the proposed $10M SmartCiti.X raise); the union trades AR/VR pilot is a Tranche 2 milestone gate.

## 5. Subdomains — `<world-slug>.fellowship.chat`

### Naming scheme
`<world-slug>.fellowship.chat` for every world in the inventory, slug from the world's verified slug/name. Owner examples first: **omega.fellowship.chat** (Omega Hive world — hub-assigned slug, not a WorldForge slug) and **cognition.fellowship.chat** (Cognition.X Campus fabric).

### Batch 1 — 46 subdomains (full list, in order)
omega, cognition, agentic-payments, agents-deploy-infrastructure, autonomous-organizations, biota-blockchain, cancer-dao, climate-dao, diagnostic-x, ecology-dao, education-dao, empathic-x, locator-x, public-health-dao, robotics-dao, s04-curable-x, s05-biopharma-go, s06-blockchain, s07-divine-dao, s09-astrological-x, s11-molecular, s12-parking-smart-x, s13-gonstead-x, s14-askdoc-x, s15-romanbridge-dao, s16-echodawn-dao, s17-curable-blockchain-dao, s19-moscone-x, s20-cmmc, s21-incubator-dao, s22-get-delivery-dao, s23-avatar-chat, s24-donatello-dao, s25-mypet-ai, s26-lyka-dao, s27-genomic-dao, s28-genomic-blockchain, s29-metaverse-dao, s31-aerospace-dao, s32-solar-dao, s33-infogurus, s34-als-dao, s35-parkinsons-dao, smartciti, hub, poc.

Composition: 41 curated WorldForge slugs + omega + cognition + smartciti (Holodeck fabric) + hub (AGI Corp Hub demo) + poc (AGI Corp POC). The 41 already include locator-x, biota-blockchain, empathic-x, and diagnostic-x, so those fabrics are covered once. **Planned total: 549** (544 WorldForge + 5 hub-assigned). Remaining 503 (502 city districts + unspoken-smiles) roll out in later batches or via wildcard.

### Hub links
World-select cards link to each world's subdomain as the primary "Enter world" link, with the direct file URL kept as a secondary "source" link where one exists. **No subdomain resolves today** — all subdomain links are labeled "planned" on the cards.

### Routing / hosting design (plan only — NOT executed)
- **GitHub Pages cannot serve per-world subdomains at scale** — one custom domain per Pages site, and GitHub explicitly warns against wildcard DNS records (subdomain-takeover risk).
- **Recommended design:** Cloudflare zone for fellowship.chat + **one wildcard DNS record** (`*.fellowship.chat`, proxied) + a **Cloudflare Worker (or Pages Function)** that reads the hostname, looks the slug up in the hub's mapping (`worlds.json` → `subdomains`), and serves/redirects to the matching world page. www.fellowship.chat serves the hub. Unknown slugs get the hub home page (never a 404 dead-end, never a takeover surface).
- **Limits (from docs, verify at build time):** Cloudflare Pages Free allows 100 custom domains per project (Pro 250, Business 500) — 549 individual records exceed Free, which is why the wildcard + Worker design is used. Cloudflare wildcard DNS proxying is available on all plans (announced 2026-07-15); Free DNS allows 1,000 records/zone.
- **Rollout:** Batch 1 (46) first, verified end-to-end; the remaining 503 via the same wildcard (the Worker already handles any slug in the mapping — batching is about verifying the mapping, not about DNS records).

### DNS state (verified 2026-11-06, read-only)
- **From this build machine, fellowship.chat DNS is NOT verifiable.** The VM resolver returns placeholder addresses in the 198.18.0.0/15 benchmarking range (fellowship.chat → 198.18.255.39, www.fellowship.chat → 198.18.255.40), NS/SOA queries return nothing, and direct queries to 1.1.1.1 / 8.8.8.8 return nothing — the sandbox blocks external resolvers.
- Last Hostinger check (2026-11-05): nameservers horizon/orbit.dns-parking.com (DNS parking), domain expires 2027-05-18.
- Parallel work (main chat, 2026-11-06 ~13:58–14:00 PST, **not independently verified by this chat**): nameservers for fellowship.chat were flipped to Cloudflare with DS records added; propagation up to 24h, not yet visible at 14:01 PST.
- **Re-verify from a real network before any DNS step.** Mail records must stay untouched. Full steps in `DEPLOY_PLAN.md`.

## 6. Virtuals integration (ACP)

- **Marketplace root (verified verbatim):** https://app.virtuals.io/acp — from two search results (JobRouter site: "Access JobRouter through the Virtuals Butler at app.virtuals.io/acp"; bountybook audit listing). app.virtuals.io itself is the token-trading front page, not the ACP marketplace.
- **Per-agent profile URLs: NOT on record — none guessed.** The ACP profile URL pattern exists (e.g. app.virtuals.io/acp/agent-details/3082), but our 5 agents' numeric/UUID IDs were not found (searches for unique job names hive_coordination_brief / seat_status_check returned no profile URLs; the ACP Python SDK `browse_agents` requires a registered agent with a wallet key — no keyless public browse exists). Hub links go to the marketplace root with "search the agent name"; IDs can be added from the Virtuals console.
- **Verified live 2026-11-06 15:00 PST (read-only reconciliation):** all 29 jobs + 6 subscriptions confirmed present with exact prices/SLAs, nothing missing. All Require Funds ON. All also in the public ACP Offerings marketplace (USDC prices).
- **Jobs by agent:** Omega 5 + 1 sub; Tactile 6 + 2; ALS 6 + 1; CMMC 6 + 1; WAVE 6 + 1. Full price/SLA table in `MONETIZATION.md` §1 and in `agents.json`. Payment rail: ACP USDC escrow on Base (Job created → Budget set → Job funded → Work submitted → Job completed; a verifier agent appears on completion — verification precedes payment release).
- **HONEST AVAILABILITY — the blocker, shown on every agent card and on every Earn row:** the agents are listed on ACP but their instances are **NOT deployed/online** to receive and deliver hires. Omega's and WAVE's consoles show "No Instance — Deploy to get online" (verified 2026-11-06); WAVE's console adds that a hosting payment must be settled before it can redeploy. Tactile/ALS/CMMC are listed with verified jobs/subs and no live instance verified. Every Hire control carries the status "Listed — fulfills after deploy". The Earn section has a "Why hiring is paused" note naming the exact unblocker (settle WAVE hosting, deploy an instance per agent). No button implies instant fulfillment.
- **Read-only integration only:** links + verified listings. No hire, funding, chat, transaction, wallet connection, or signature was attempted.

## 7. x402 payments layer

- **x402 is the hub's designed payment standard** (HTTP 402: server returns a 402 challenge — network e.g. eip155:8453 Base, USDC token, amount, recipient; agent signs EIP-3009 transferWithAuthorization, retries with an X-PAYMENT header; a facilitator such as Coinbase CDP verifies and settles on-chain; settlement ~2 seconds on Base, well under a cent in gas). Standard launched by Coinbase May 2025; x402 Foundation under the Linux Foundation, operational July 14, 2026.
- **Status: endpoint NOT yet live.** No live x402 endpoint was verified in the family's files or systems (grep found x402 only in the hub order itself, a repo description calling Metropolis-SmartCiti "ERC-8004 / x402 / Monad" — repo copy, not verified fact — and the "x402 Data Endpoints" heading on WorldForge's world.html, which is a UI label only, not evidence of a live endpoint).
- The hub presents x402 as the designed standard with the real priced services listed and their status marked "priced in USDC via Virtuals ACP escrow; x402 endpoint: not yet live". The "How agent payments work here" explainer on the page covers x402 + the ACP escrow flow as verified.
- Data: `agents.json` → `x402` block (standard, endpoint_status "not yet live", verified_mechanism ACP escrow).

## 8. The Idea Exchange — collaboration layer

- **Idea cards:** title, short description, author type (human/agent), tags drawn from the real series/worlds list, status (open / in discussion / in progress). Filters by tag and status, plus search. 16 seeded prompts.
- **Demo composer:** visitors can post an idea; it saves in their own browser only (localStorage key `worldshub_ideas_v1`). Labeled on the page: "Demo — ideas you post stay in your browser and are not shared or published." No backend, no fake persistence claims.
- **Seeded ideas — sources only (no invented attribution, no fake users/posts):**
  - 13 prompts drawn from the verified 33 W3 series list + the Foundation's real projects (SmartCiti AR/VR pilot, robotics training curriculum, physical-AI safety governor, Diagnostic eval gate, Cognition Flow Zone, Biota sound map, Locator anchor registry, Divine charter draft, compound library index, CMMC checklist, InfoGurus index, host the 168 GLBs, subdomain rollout batch 1) — each labeled with its source.
  - 3 "work available on ACP" prompts (Omega hive_coordination_brief $10/24h; WAVE expedition_sound_map $100/72h; CMMC full_readiness_assessment $150/72h) — each labeled with the real job, price, and SLA.
- **x402 value layer per idea:** "Tip in USDC (x402)" and "Place a bounty" buttons. Tip = x402 designed flow, endpoint not yet live, no payment taken. Bounty = funded job via ACP escrow (live mechanism), but bounties cannot be placed or paid on this page today — agents' instances are offline. "Match agents" shows the real Virtuals jobs with real USDC prices and links to the ACP marketplace.
- **Collaboration flow on the page** ("How an idea moves — demo vs live"): 1) human/agent posts an idea — DEMO (local only); 2) agents respond with matching work — LIVE LISTING (real jobs, hire not chat); 3) payment — x402 DESIGNED, ACP escrow LIVE; 4) delivery — BLOCKED today (instances offline); 5) status updates — DEMO (page edits only, no sync).
- Data: `ideas.json` (16 seeds, each with author_type "seed", source, match_agents, x402 tip/bounty strings).

## 9. The Plans pillar

**Sources read before writing:** corporate paperwork `complete/` files 11 (briefing memo), 12 (structure v2), 13 (register/intake), 16 (venture studio), 17 (stage gates), 27 (raise advice), 29 (PBC raise structure), 31 (pitch windfall + structure standards), 32 (valuations), 44 (PBC SAFE / Windfall / OGI draft), 46 (SmartCiti.X corporation), 52 (truth audit). File 45 not read in full (superseded issuer — Series 10 version of the SmartCiti SAFE; covered by files 32/46/52). Per-entity packs noted (01 Foundation, 02 Fellowship, 03 AGI Corp, 04 W3 LLC, 05 Delaware).

**Pages built** (`plans/`, each ~1,950–2,280 words in `<main>`, each with the filed-facts banner, shared nav, sources line, prev/next chain):

| Page | Contents (from the files) |
|---|---|
| structure.html | v2 stack: AGI Corp intended Wyoming head (NOT verified filed) → Foundation (verified filed, mission steward via written agreements, NOT owned) → W3 + Delaware series (intended). Fellowship separate, partnered. "Stanford model" = Stanford PACS stewardship principles, NOT a Stanford affiliation. Nonprofit-control tension + restructure fallback. Three money flows separate. DAO ≠ legal entity. Steward Council 3 humans / 2-of-3 — only authority to move funds or enact charters. |
| studio.html | Studio = AGI Corp function, not a separate entity unless counsel advises; portfolio = W3 + Delaware C1S1–S3; Fellowship = partner, not portfolio. Agent-managed vs agent-assisted. Agents NEVER sign/move funds/hire/fire/offer securities/enact doctrine. 8 functions, 8 roles. Economics = structure, not terms; agents hold no equity. Gates 0→5, human signature + filed evidence per gate, no-council series capped at Gate 1. |
| series.html | Full 33-row table (S1–S33). Verified descriptions only for S1, S3, S8, S10, S18, S20 (CMMC acronym not expanded), S27, S29, S30, S33; all others: "Series named in the April 2026 internal W3 list; no further verified description on file." Every row: "Intended/planned — not formed, funded, or offered." Count conflicts flagged. Biota has no series number. Intake checklist + legal name form "[Master LLC], Series C1S1". |
| shield-windfall.html | Shield = expanded business judgment under CA §§14620–14621 + §14630 annual benefit report — NOT "legally immune" (pitch Slide 6 corrected). Class A 1 vote/full economics, B 10 votes/restricted + screened, C 1,000 votes/Foundation-only/control-only/no economics. Gini figures are pitch illustrations. Windfall = pre-commitment before profits, all 33 series, threshold % of Global GDP (measure/scope blank for counsel), four Benefit Buckets + UN SDGs, amendment only by supermajority + Class C. OGI: no terms today. PBC fork: issuer chosen in writing first; AGI Corp SAFE and PBC SAFE are alternatives, never both. |
| governance.html | Steward Council (3 humans, 2-of-3), human gate (10-row table of human-only actions), board independence, nonprofit-control tension, four-powers separation (Council / AGI Corp board / Foundation board / Fellowship board — no single human, no agent, holds all four), Fellowship governance as separate church under human board/minister direction. |
| numbers.html | "Information only — not an offer to sell securities. Nothing has been issued." banner. Suggested valuations only: Foundation $50M PBC-track only / $5M illustrative first raise (nonprofit track N/A, donation target $250k–$750k, one track only); AGI Corp studio $20M / $2M seed; SmartCiti.X $25M / $10M tranched ($4M/$3M/$2M/$1M); other W3 + Delaware C1S1–S3 $100k–$500k each; Fellowship N/A, donation $50k–$250k. Never summed ($50M + $25M ≠ $75M). No site/union/customer named. |
| roadmap.html | What exists today vs what is planned (15-row table): filings, EINs, fabric JSONs, POC/Hub, 544 worlds rp1:null, 29 ACP jobs listed/instances offline, Fellowship site live (40 articles), Foundation site live on Pages (www still Kylon). Not done: both 501(c)(3) letters, Fellowship SOI (~2026-08-11, unverified), bylaws, AG registration, W3/Delaware filings, SmartCiti.X, Inc., any SAFE, any series raise, RP1 attach, GLB hosting, 5 agent deploys, named donation route, subdomains. Sequencing: cleanup → donations → AGI Corp SAFE → first series raise. |

**Filed vs intended:** every Plans page carries the gold banner: Foundation B20260196664 filed 2026-04-24; Fellowship B20260229217 filed 2026-05-13; no IRS 501(c)(3) determination letter for either; AGI Corp EIN only. "35 cells" / "66-W3" / "34 worlds" appear only as flagged conflicting figures. No invented partners, dates, amounts, sites, unions, or customers. No tax-deductible claims. PBC fork stated where relevant.

## 10. Honesty labels used (every one)

- Home-page "About the number 200" notice: no verified source lists 200 spaces; true counts shown instead.
- Status badges on every world card: Live JSON / Demo / Planned / Collection / WorldForge Earth world — with the status line: live = fabric JSONs on Pages; demo = Hub scene + Commons simulation; planned = RP1 attach pending a public map-service endpoint.
- Agent Commons: "SIMULATED COMMONS — DEMO, NOT LIVE AGENT TRAFFIC" + per-announcement "(simulated announcement — a real service listing, not a live chat)" + pause/play + "Next announcement". Messages drawn ONLY from the agents' real job/service descriptions; no invented agent names, quotes, or collaborations.
- Virtuals cards + Earn rows: "Listed — fulfills after deploy" + "Why hiring is paused" note (exact unblocker).
- x402: "Designed standard … Endpoint status: not yet live."
- Idea Exchange: "Demo — ideas you post stay in your browser and are not shared or published" + per-idea source labels + demo-vs-live flow steps.
- Plans pages: filed-facts banner on all 7; numbers page: "Information only — not an offer to sell securities. Nothing has been issued."
- Support/Partner lanes: Fellowship donation/tithe only via agent@agifellowship.church, no tax claim, no payment link; Foundation donation/grant only via x@agifuturefoundation.org, no tax claim; BuilderSpace "sponsorships open, none confirmed"; fellowship.chat: no premium tier, no paywall.
- Footer: "This hub carries no Fellowship church doctrine" + DNS-not-verifiable note + links to MONETIZATION.md and DEPLOY_PLAN.md.
- No Fellowship church doctrine anywhere on the hub (it is a worlds/agents playground on the fellowship.chat domain, kept separate from the church site at www.agifellowship.church).

## 11. Monetization summary (full inventory in MONETIZATION.md)

10 streams inventoried, each with real price(s) or "no price set", status, exact unblocker, source:

| Stream | Status | Unblocker |
|---|---|---|
| 29 Virtuals jobs ($1–$150 USDC) | Listed — blocked | Deploy an instance per agent |
| 6 subscriptions ($5–$30 USDC/period) | Listed — blocked | Deploy an instance per agent |
| x402 tips | Planned, no price set | x402 endpoint must exist |
| x402 / ACP bounties | Planned | Deploy an instance per agent |
| Idea Exchange matched hires | Listed — blocked | Deploy an instance per agent |
| Fellowship donations/tithes | Live (email-arranged), no price set | None — email only |
| Foundation donations/grants | Live (email-arranged), no price set | None — email only |
| BuilderSpace sponsorships | Open — none confirmed, no price set | Signed sponsor agreement |
| fellowship.chat premium tier | Does not exist | — |
| PBC / SmartCiti.X raises | Proposed only — NOT revenue, $0 raised | Formation + counsel + issuance |

**#1 unblocker overall: deploy the 5 Virtuals agents' instances** (settle WAVE hosting first). $0 has been earned through this site. Nothing on this site takes a payment today.

## 12. Design decisions

- **Game-lobby look:** dark navy/teal/gold, stat strip, world-select grid of cards (24/page, search + series/status/type filters), series index table, canvas Commons with wandering avatars, roster cards, idea cards, Earn table. Keyboard/pointer friendly, responsive, works as static files (no backend) and from `file://` (data also embedded as `hub-data.js` = `window.HUB_DATA`).
- **Data files as source of truth:** `worlds.json` (fabrics, collections, 35-series index, full 544-world list, subdomains, AR/VR, counts), `agents.json` (hive, SmartCiti slots, 5 Virtuals agents + jobs/subs, availability, x402), `ideas.json` (16 seeds + meta). Regenerate, don't hand-edit (`/tmp/build_hub_data.py` — made idempotent 2026-11-06 after the CSS-extraction step was found to truncate the file tail; batch-1 order fixed to omega/cognition first).
- **Subdomain-first links:** world cards link to `<slug>.fellowship.chat` as primary "Enter world", direct file URL as secondary "source" — because the owner asked for per-world subdomains; all labeled planned until DNS exists.
- **Showcase folded in:** a copy of the Worlds showcase lives at `showcase/` (linked from the hub) so the "host the showcase" item is covered inside the hub rather than as a separate deploy.
- **Two build quirks found and fixed during validation:** (1) the earlier CSS-extraction step had truncated index.html's tail (missing `</div></body></html>`) — restored with the script tags; (2) `hub.js` initCommons threw on canvas-less environments and blocked the Ideas init — now guarded (legend + text announcements still work without a canvas; the animation needs a real 2D canvas).

## 13. Validation performed (2026-11-06)

- **JSON parses:** worlds.json, agents.json, ideas.json, agent.json — all valid.
- **JS syntax:** `node --check hub.js hub-data.js` — clean.
- **Headless render (jsdom, canvas stubbed, served over local HTTP):** stats 8/544/40/35/29/6/1/44/0; 24 world cards on page 1 of 24 ("556 worlds"); 35 series rows; 12 Commons avatars in legend; 5 Virtuals cards; 9 AR/VR cards; 16 seeded idea cards; 31 tag checkboxes; 35 Earn rows; 5 offline badges; 7 Plans cards; search ("diagnostic" → 2 worlds) works; composer works (idea saved, localStorage key present, "saved in this browser only" message shown). No window errors. (Canvas animation itself can't run in jsdom — no 2D context — but the page degrades gracefully; in a real browser the 2D canvas works.)
- **Internal links:** all hrefs/srcs in index.html + plans/*.html resolve; showcase/, agi-corp-hub.json, assets/hub-render-proof.png all return 200 locally.
- **Forbidden-phrase scan:** "200 spaces" appears only in the honest explanations (home notice + roadmap); no "invest now"/"buy now"; no non-negated tax-deductible claim; "immune" appears only where the Shield page corrects the pitch slide.
- **Plans pages verified:** all 7 exist, link `../site.css`, carry the filed-facts banner, prev/next chain complete (structure → studio → series → shield-windfall → governance → numbers → roadmap), word counts 1,953–2,276 in `<main>`.

## 14. Deploy readiness + what needs approval to go live

**Ready:** the site is deploy-ready for Cloudflare Pages (fully static, relative links, no backend, robots/sitemap/llms/agent.json in place). Exact steps in `DEPLOY_PLAN.md` — plan only, nothing executed.

**Approvals needed (in order):**
1. Owner reviews the exact finished version locally (index + 7 plans pages + data files) and approves it.
2. Re-verify fellowship.chat DNS from a real network (VM cannot verify it; nameserver flip to Cloudflare reported by parallel work, unverified by this chat). Record authoritative nameservers, zone location, and mail records in writing. Mail records stay untouched.
3. Approve the repo (suggested `AGIFutureFoundation/fellowship.chat`, public) and the push (owner present — approval card expires after 30 min).
4. Approve the www CNAME step in Cloudflare Pages; decide the apex (leave / redirect to www).
5. Approve the subdomain phase separately (wildcard `*.fellowship.chat` + Worker router) — or defer it.
6. GitHub 2FA on the AGIFutureFoundation account before **November 24, 2026** (banner observed 2026-11-05 — account actions will be restricted after that date).

**Separate workstreams NOT in this build (flagged, not absorbed):**
- Fellowship deep content upgrade (ordered 2026-11-06 16:11 PST: expanded faith guides + 10 magazine features) — separate workstream, routed separately.
- Foundation 10 more features (12–21) + 15 press releases (5 each for Fellowship, Foundation, fellowship.chat) — ordered 2026-11-06 16:23 PST (MEMORY.md update during this build). Foundation deploy rule stands: sync local FROM the live repo first (live is ahead, 146 vs 142 URLs) — never push local without the sync; push only after Mike approves the exact version, with him present.
- Oracle VPS (blocked on Mike: verify the Oracle email in x@ before ~15:38 PST Nov 7, then the tenancy name arrives and instance creation can proceed). map.wasm upload (browser task running — Option A fix). Press approvals (6 releases + 6 outreach emails in webmail; corrected Foundation wording; Tier B contacts to re-confirm). Bino's reply to the RP1/repos invite (sent 2026-11-06 16:05 PST, Gmail id 1a1b35307e33a36e) still awaited.

## 15. File index

- `index.html` (24,576 bytes) — hub home page
- `hub-data.js` (161,234 bytes) — `window.HUB_DATA` (same data as the JSONs)
- `hub.js` (27,333 bytes) — all client logic
- `site.css` (11,163 bytes) — shared stylesheet
- `worlds.json` (130,968 bytes) — fabrics, collections, 35-series index, 544 worlds, subdomains, AR/VR, counts
- `agents.json` — hive, SmartCiti slots, 5 Virtuals agents + 29 jobs + 6 subs, availability, x402
- `ideas.json` — 16 seeded ideas + composer meta
- `plans/` — structure, studio, series, shield-windfall, governance, numbers, roadmap (7 pages)
- `showcase/` — Worlds showcase copy
- `agi-corp-hub.json`, `assets/hub-render-proof.png`
- `robots.txt`, `sitemap.xml`, `llms.txt`, `agent.json`
- `WORLD_HUB_REPORT.md` (this file), `MONETIZATION.md`, `DEPLOY_PLAN.md`

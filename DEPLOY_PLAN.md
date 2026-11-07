# DEPLOY PLAN — www.fellowship.chat via Cloudflare Pages

**PLAN ONLY. Do NOT execute any step below without the owner's explicit approval of the exact finished version. No deploy, push, repo creation, or DNS change has been made.**

## 0. What is being deployed

A fully static site (HTML + CSS + JS + JSON data + 1 PNG + the worlds-showcase copy). No backend, no build step, no server code. Relative internal links throughout. Files live locally at `~/workspace/your_files/worlds-hub-fellowship-chat/`.

Site contents at deploy time:
- `index.html` — the flagship hub (Plans overview, world select, Agent Commons, roster, AR/VR, x402, Idea Exchange, Earn, Status)
- `plans/` — 7 pages: structure, studio, series, shield-windfall, governance, numbers, roadmap
- `hub-data.js`, `hub.js`, `site.css`, `worlds.json`, `agents.json`, `ideas.json`
- `showcase/` — the Worlds showcase copy (linked from the hub)
- `agi-corp-hub.json`, `assets/hub-render-proof.png`
- `robots.txt`, `sitemap.xml`, `llms.txt`, `agent.json`
- `WORLD_HUB_REPORT.md`, `MONETIZATION.md`, `DEPLOY_PLAN.md` (documentation; harmless to publish, and linked from the hub footer)

## 1. DNS state — verified 2026-11-06 (read-only)

- **From this build machine, fellowship.chat DNS is NOT verifiable.** The VM resolver returns placeholder addresses in the 198.18.0.0/15 benchmarking range (fellowship.chat → 198.18.255.39, www.fellowship.chat → 198.18.255.40), NS/SOA queries return nothing, and direct queries to 1.1.1.1 / 8.8.8.8 return nothing — the sandbox blocks external resolvers.
- **Last Hostinger check (2026-11-05):** fellowship.chat nameservers horizon/orbit.dns-parking.com (DNS parking), domain expires 2027-05-18.
- **Parallel work (main chat, 2026-11-06 ~13:58–14:00 PST, NOT independently verified by this chat):** nameservers for fellowship.chat (and agifuturefoundation.org) were flipped to Cloudflare with DS records added; propagation up to 24h, not yet visible at 14:01 PST.
- **Therefore step 1 of any deploy is: re-verify the DNS state from a real network** (registrar + Cloudflare dashboard + `dig` from a non-sandbox machine) before touching anything. In particular, confirm: (a) which nameservers are authoritative now, (b) whether the zone lives at Cloudflare or Hostinger, (c) that mail records (if any) are identified and will stay untouched.

**Mail records must never be changed.** No MX/SPF/DKIM/DMARC record for fellowship.chat may be edited, deleted, or pointed elsewhere as part of this deploy.

## 2. Deploy steps (Cloudflare Pages)

**Approval gate: the owner approves the exact finished site version first (local build review), then approves each step below.**

1. **Re-verify DNS** (see §1). Record the authoritative nameservers, the zone location, and the existing records in writing before proceeding.
2. **Create a new GitHub repo** — suggested name `AGIFutureFoundation/fellowship.chat`, public, empty, default branch `main`. (The Muse GitHub App cannot create org repos — the repo was created via the browser web UI for the Foundation site; expect the same route here, signed in as the org owner.)
3. **Push the site files to the repo.** Text files via the snapshot push route (`github push-files`, NUL-delimited manifest, approval-safe batches — see the github_pages_deploy skill); the PNG + showcase files via the GitHub web upload route in sub-batches (the repo has only one small PNG, so a single text push may cover everything — verify at push time). Do NOT push while the owner is away: the approval card expires after 30 minutes.
4. **Create a Cloudflare Pages project** — connect the new repo, framework preset "None", build command empty, build output directory `/` (repo root). Deploy. Confirm the `*.pages.dev` preview URL serves the hub.
5. **Attach the custom domain `www.fellowship.chat`** in the Pages project (Custom domains → Set up a custom domain). Cloudflare will show the DNS record it needs (a CNAME to the Pages domain, proxied). Add ONLY that record, in the zone that is authoritative (§1). Do not touch mail records.
6. **Decide the apex (`fellowship.chat`, no www).** Options: (a) leave the apex as-is (parking page / nothing), (b) add a redirect apex → www in Cloudflare (a Page Rule / Redirect Rule, or an apex CNAME flattening to Pages). The hub links use `www.fellowship.chat` as canonical. The apex decision needs the owner's explicit choice; it is not part of the www deploy.
7. **Verify live:** `https://www.fellowship.chat/` returns 200; spot-check index, one plans page, one data file, the showcase link, and the sitemap. Re-run the internal-link check against the live URLs.
8. **Subdomains (separate phase, after the hub is live — see §3).** Do not attempt in the same change window.

## 3. Subdomain routing design (plan only — needs its own approval)

Goal: every world gets `<world-slug>.fellowship.chat` (batch 1 = 46 subdomains; planned total = 549 — see WORLD_HUB_REPORT.md §5).

**Why not GitHub Pages:** one custom domain per Pages site, and GitHub explicitly warns against wildcard DNS records (subdomain-takeover risk). GitHub Pages cannot serve per-world subdomains at this scale.

**Recommended design (Cloudflare):**
- Zone: fellowship.chat on Cloudflare (pending §1 verification).
- **One wildcard DNS record:** `*.fellowship.chat` (CNAME or A/AAAA, proxied) pointing at the Cloudflare Pages project / Worker. Cloudflare wildcard DNS proxying is available on all plans (announced 2026-07-15); Free DNS allows 1,000 records/zone.
- **One Cloudflare Worker (or Pages Function)** in front: reads the request hostname, strips `.fellowship.chat`, looks the slug up in the hub's subdomain mapping (`worlds.json` → `subdomains`), and serves/redirects to the matching world page (fabric JSON, WorldForge Earth viewer, or showcase). Unknown slugs get the hub home page (never a 404 dead-end, never a takeover surface).
- **Limits check:** Cloudflare Pages Free allows 100 custom domains per project (Pro 250, Business 500) — 549 individual custom-domain records would exceed Free, which is why the wildcard + Worker design is used instead of one record per world. Verify the current limits in the Cloudflare docs/dashboard at build time; they change.
- **Rollout:** Batch 1 (46: 41 curated WorldForge slugs + omega + cognition + smartciti + hub + poc) first, verified end-to-end; remaining 503 (502 city districts + the `unspoken-smiles` spotlight) in later batches or via the same wildcard (the Worker already handles any slug in the mapping — the batching is about verifying the mapping, not about DNS records).
- **Approval needed:** the wildcard record + Worker + which subdomains resolve first. Mail records untouched.

## 4. Rollback

- DNS: remove the www CNAME → www stops serving Pages (falls back to whatever the apex/zone served before). No data loss: the repo keeps every file.
- Pages: disconnect the custom domain or delete the Pages project; the `*.pages.dev` preview remains until deleted.
- Nothing on this deploy touches the Fellowship church site (www.agifellowship.church), the Foundation site, email, or any other domain.

## 5. Pre-deploy checklist (owner sign-off)

- [ ] Exact finished site version reviewed locally by the owner (index + 7 plans pages + data files).
- [ ] DNS state re-verified from a real network (§1) and recorded.
- [ ] Mail records identified and confirmed untouched.
- [ ] Repo name + visibility approved.
- [ ] www CNAME step approved.
- [ ] Apex decision made (leave / redirect to www).
- [ ] Subdomain phase approved separately (or deferred).
- [ ] GitHub 2FA enabled on the AGIFutureFoundation account before **November 24, 2026** (banner observed 2026-11-05 — account actions will be restricted after that date).

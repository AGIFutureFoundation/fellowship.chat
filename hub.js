/* STAGED M5 VARIANT — hub.js with the Option A Enter re-point applied.
   Source: live worlds-hub-fellowship-chat/hub.js (read, never edited) +
   deep-interop-build/m5-hub-enter/hub-enter-link-map.json (556 entries).
   STAGED ONLY under next-wiring/d-m5-hub/. Do NOT copy over the live Hub
   without Mike's decision (Option A vs Option B) — see APPLY.md.
   Differences from live, in order: (1) this header, (2) the HUB_ENTER_MAP /
   applyEnterMap() block before 'var D = ...', (3) worldEntries() returns
   applyEnterMap(out) instead of out. Everything else is byte-identical to
   the live file. */
'use strict';
/* Worlds Hub — client logic. Data comes from window.HUB_DATA (hub-data.js),
   generated from worlds.json + agents.json + ideas.json. No backend, no fetch:
   the page works from local files (file://) and over HTTP. */
/* ================= STAGED M5 Enter re-point (Option A) =================
   Added by next-wiring/d-m5-hub (gen-m5-hub.mjs), 2026-11-07. STAGED ONLY —
   the live hub.js is unchanged. Applies deep-interop-build/m5-hub-enter/
   hub-enter-link-map.json (556 entries, Option A targets) as a post-pass
   over worldEntries(). The original enterUrl construction below is kept
   verbatim: the planned-subdomain URL stays visible as the fallback, and
   applyEnterMap() records it on each entry as enterUrlPrevious /
   enterNotePrevious before replacing it. POC (agi-corp-poc) and Omega Hive
   have NO proposed target in the map (null) and are left exactly as they
   are, with the map note attached as enterMapNote. The 544 WorldForge
   targets are RELATIVE viewer links (viewer.html?world=<slug>) by design —
   the live served path of viewer.html is unverified, so no absolute viewer
   URL is asserted here; see m5-hub-enter/DECISION.md and APPLY.md.
   Decision needed before apply: M5 Option A vs Option B. */
var HUB_ENTER_MAP = {
  "fabric:smartciti-holodeck": {
    "kind": "flagship",
    "current": "https://smartciti.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=smartciti-holodeck",
    "note": null,
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/explore.html?world=smartciti-holodeck&station=st-tower-crane-lift"
  },
  "fabric:cognition-campus": {
    "kind": "flagship",
    "current": "https://cognition.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=cognition-x",
    "note": "Hub fabric id is 'cognition-campus' (worlds.json fabrics[].id) but the registry world id is 'cognition-x'; the proposed target uses the registry id. The Hub's fabric id and the registry id disagree — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/explore.html?world=cognition-x&station=st-k12-hall"
  },
  "fabric:locator-x": {
    "kind": "flagship",
    "current": "https://locator-x.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=locator-x",
    "note": "Also listed as a WorldForge world card under the same subdomain (see worldforge entry for locator-x); that card re-points at the viewer. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/explore.html?world=locator-x&station=st-master-dashboard"
  },
  "fabric:biota-blockchain": {
    "kind": "flagship",
    "current": "https://biota-blockchain.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=biota-blockchain",
    "note": "Also listed as a WorldForge world card under the same subdomain (see worldforge entry for biota-blockchain); that card re-points at the viewer. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/explore.html?world=biota-blockchain&station=st-ledger"
  },
  "fabric:empathic-x": {
    "kind": "flagship",
    "current": "https://empathic-x.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=empathic-x",
    "note": "Also listed as a WorldForge world card under the same subdomain (see worldforge entry for empathic-x); that card re-points at the viewer. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/explore.html?world=empathic-x&station=st-self-reader-grove"
  },
  "fabric:diagnostic-x": {
    "kind": "flagship",
    "current": "https://diagnostic-x.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=diagnostic-x",
    "note": "Also listed as a WorldForge world card under the same subdomain (see worldforge entry for diagnostic-x); that card re-points at the viewer. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/explore.html?world=diagnostic-x&station=st-medical-kiosk"
  },
  "fabric:agi-corp-hub": {
    "kind": "flagship",
    "current": "https://hub.fellowship.chat/",
    "proposed": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=agi-corp-hub",
    "note": "Demo world, no anchor coordinates. Recommended deep link is the welcome tour (quest q-welcome-tour, 5 steps, worlds/agi-corp-hub.json:481) — the tour the wired players now serve (player-wiring, LIVE).",
    "recommended_deep_link": "https://agifuturefoundation.github.io/worlds-3d/player.html?world=agi-corp-hub&tour=q-welcome-tour"
  },
  "fabric:agi-corp-poc": {
    "kind": "fabric_poc",
    "current": "https://poc.fellowship.chat/",
    "proposed": null,
    "note": "NO verified playable target exists: 'agi-corp-poc' is not one of the 7 registry worlds and not one of the 544 WorldForge slugs (checked). The only fabric that renders end-to-end (RP1 CDN stool + bucket) has no worlds-3d player and no viewer entry. Options: leave the planned subdomain, or drop the Enter button until a target exists. Do not invent a target.",
    "recommended_deep_link": null
  },
  "omega:omega-hive": {
    "kind": "omega_hive",
    "current": "https://omega.fellowship.chat/",
    "proposed": null,
    "note": "NO verified playable target exists: hardcoded in hub.js:125-133, 'no separate world file exists yet — do not treat this as a second Hub'. Not in the registry, not a WorldForge slug (checked). Its own detail text says it is reached through the AGI Corp Hub demo — so the honest interim target would be the AGI Corp Hub player link, but that is a judgement call for Mike, not a verified mapping; left null here.",
    "recommended_deep_link": null
  },
  "worldforge:agentic-payments": {
    "kind": "worldforge",
    "current": "https://agentic-payments.fellowship.chat/",
    "proposed": "viewer.html?world=agentic-payments",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:agents-deploy-infrastructure": {
    "kind": "worldforge",
    "current": "https://agents-deploy-infrastructure.fellowship.chat/",
    "proposed": "viewer.html?world=agents-deploy-infrastructure",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:autonomous-organizations": {
    "kind": "worldforge",
    "current": "https://autonomous-organizations.fellowship.chat/",
    "proposed": "viewer.html?world=autonomous-organizations",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:biota-blockchain": {
    "kind": "worldforge",
    "current": "https://biota-blockchain.fellowship.chat/",
    "proposed": "viewer.html?world=biota-blockchain",
    "note": "Also listed as a flagship fabric card under the same subdomain; that card re-points at the worlds-3d player. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": null
  },
  "worldforge:cancer-dao": {
    "kind": "worldforge",
    "current": "https://cancer-dao.fellowship.chat/",
    "proposed": "viewer.html?world=cancer-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:climate-dao": {
    "kind": "worldforge",
    "current": "https://climate-dao.fellowship.chat/",
    "proposed": "viewer.html?world=climate-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:diagnostic-x": {
    "kind": "worldforge",
    "current": "https://diagnostic-x.fellowship.chat/",
    "proposed": "viewer.html?world=diagnostic-x",
    "note": "Also listed as a flagship fabric card under the same subdomain; that card re-points at the worlds-3d player. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": null
  },
  "worldforge:ecology-dao": {
    "kind": "worldforge",
    "current": "https://ecology-dao.fellowship.chat/",
    "proposed": "viewer.html?world=ecology-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:education-dao": {
    "kind": "worldforge",
    "current": "https://education-dao.fellowship.chat/",
    "proposed": "viewer.html?world=education-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:empathic-x": {
    "kind": "worldforge",
    "current": "https://empathic-x.fellowship.chat/",
    "proposed": "viewer.html?world=empathic-x",
    "note": "Also listed as a flagship fabric card under the same subdomain; that card re-points at the worlds-3d player. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": null
  },
  "worldforge:locator-x": {
    "kind": "worldforge",
    "current": "https://locator-x.fellowship.chat/",
    "proposed": "viewer.html?world=locator-x",
    "note": "Also listed as a flagship fabric card under the same subdomain; that card re-points at the worlds-3d player. Dedupe needed — see HUB_ENTER_FIX.md section 5.",
    "recommended_deep_link": null
  },
  "worldforge:public-health-dao": {
    "kind": "worldforge",
    "current": "https://public-health-dao.fellowship.chat/",
    "proposed": "viewer.html?world=public-health-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:robotics-dao": {
    "kind": "worldforge",
    "current": "https://robotics-dao.fellowship.chat/",
    "proposed": "viewer.html?world=robotics-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s04-curable-x": {
    "kind": "worldforge",
    "current": "https://s04-curable-x.fellowship.chat/",
    "proposed": "viewer.html?world=s04-curable-x",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s05-biopharma-go": {
    "kind": "worldforge",
    "current": "https://s05-biopharma-go.fellowship.chat/",
    "proposed": "viewer.html?world=s05-biopharma-go",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s06-blockchain": {
    "kind": "worldforge",
    "current": "https://s06-blockchain.fellowship.chat/",
    "proposed": "viewer.html?world=s06-blockchain",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s07-divine-dao": {
    "kind": "worldforge",
    "current": "https://s07-divine-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s07-divine-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s09-astrological-x": {
    "kind": "worldforge",
    "current": "https://s09-astrological-x.fellowship.chat/",
    "proposed": "viewer.html?world=s09-astrological-x",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s11-molecular": {
    "kind": "worldforge",
    "current": "https://s11-molecular.fellowship.chat/",
    "proposed": "viewer.html?world=s11-molecular",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s12-parking-smart-x": {
    "kind": "worldforge",
    "current": "https://s12-parking-smart-x.fellowship.chat/",
    "proposed": "viewer.html?world=s12-parking-smart-x",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s13-gonstead-x": {
    "kind": "worldforge",
    "current": "https://s13-gonstead-x.fellowship.chat/",
    "proposed": "viewer.html?world=s13-gonstead-x",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s14-askdoc-x": {
    "kind": "worldforge",
    "current": "https://s14-askdoc-x.fellowship.chat/",
    "proposed": "viewer.html?world=s14-askdoc-x",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s15-romanbridge-dao": {
    "kind": "worldforge",
    "current": "https://s15-romanbridge-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s15-romanbridge-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s16-echodawn-dao": {
    "kind": "worldforge",
    "current": "https://s16-echodawn-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s16-echodawn-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s17-curable-blockchain-dao": {
    "kind": "worldforge",
    "current": "https://s17-curable-blockchain-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s17-curable-blockchain-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s19-moscone-x": {
    "kind": "worldforge",
    "current": "https://s19-moscone-x.fellowship.chat/",
    "proposed": "viewer.html?world=s19-moscone-x",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s20-cmmc": {
    "kind": "worldforge",
    "current": "https://s20-cmmc.fellowship.chat/",
    "proposed": "viewer.html?world=s20-cmmc",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s21-incubator-dao": {
    "kind": "worldforge",
    "current": "https://s21-incubator-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s21-incubator-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s22-get-delivery-dao": {
    "kind": "worldforge",
    "current": "https://s22-get-delivery-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s22-get-delivery-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s23-avatar-chat": {
    "kind": "worldforge",
    "current": "https://s23-avatar-chat.fellowship.chat/",
    "proposed": "viewer.html?world=s23-avatar-chat",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s24-donatello-dao": {
    "kind": "worldforge",
    "current": "https://s24-donatello-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s24-donatello-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s25-mypet-ai": {
    "kind": "worldforge",
    "current": "https://s25-mypet-ai.fellowship.chat/",
    "proposed": "viewer.html?world=s25-mypet-ai",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s26-lyka-dao": {
    "kind": "worldforge",
    "current": "https://s26-lyka-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s26-lyka-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s27-genomic-dao": {
    "kind": "worldforge",
    "current": "https://s27-genomic-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s27-genomic-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s28-genomic-blockchain": {
    "kind": "worldforge",
    "current": "https://s28-genomic-blockchain.fellowship.chat/",
    "proposed": "viewer.html?world=s28-genomic-blockchain",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s29-metaverse-dao": {
    "kind": "worldforge",
    "current": "https://s29-metaverse-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s29-metaverse-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s31-aerospace-dao": {
    "kind": "worldforge",
    "current": "https://s31-aerospace-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s31-aerospace-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s32-solar-dao": {
    "kind": "worldforge",
    "current": "https://s32-solar-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s32-solar-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s33-infogurus": {
    "kind": "worldforge",
    "current": "https://s33-infogurus.fellowship.chat/",
    "proposed": "viewer.html?world=s33-infogurus",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s34-als-dao": {
    "kind": "worldforge",
    "current": "https://s34-als-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s34-als-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:s35-parkinsons-dao": {
    "kind": "worldforge",
    "current": "https://s35-parkinsons-dao.fellowship.chat/",
    "proposed": "viewer.html?world=s35-parkinsons-dao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-french-quarter": {
    "kind": "worldforge",
    "current": "https://nola-french-quarter.fellowship.chat/",
    "proposed": "viewer.html?world=nola-french-quarter",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-garden-district": {
    "kind": "worldforge",
    "current": "https://nola-garden-district.fellowship.chat/",
    "proposed": "viewer.html?world=nola-garden-district",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-warehouse": {
    "kind": "worldforge",
    "current": "https://nola-warehouse.fellowship.chat/",
    "proposed": "viewer.html?world=nola-warehouse",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-bywater": {
    "kind": "worldforge",
    "current": "https://nola-bywater.fellowship.chat/",
    "proposed": "viewer.html?world=nola-bywater",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-uptown": {
    "kind": "worldforge",
    "current": "https://nola-uptown.fellowship.chat/",
    "proposed": "viewer.html?world=nola-uptown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-mid-city": {
    "kind": "worldforge",
    "current": "https://nola-mid-city.fellowship.chat/",
    "proposed": "viewer.html?world=nola-mid-city",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-treme": {
    "kind": "worldforge",
    "current": "https://nola-treme.fellowship.chat/",
    "proposed": "viewer.html?world=nola-treme",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-marigny": {
    "kind": "worldforge",
    "current": "https://nola-marigny.fellowship.chat/",
    "proposed": "viewer.html?world=nola-marigny",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-central-city": {
    "kind": "worldforge",
    "current": "https://nola-central-city.fellowship.chat/",
    "proposed": "viewer.html?world=nola-central-city",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nola-lower-ninth": {
    "kind": "worldforge",
    "current": "https://nola-lower-ninth.fellowship.chat/",
    "proposed": "viewer.html?world=nola-lower-ninth",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-financial": {
    "kind": "worldforge",
    "current": "https://sf-financial.fellowship.chat/",
    "proposed": "viewer.html?world=sf-financial",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-mission": {
    "kind": "worldforge",
    "current": "https://sf-mission.fellowship.chat/",
    "proposed": "viewer.html?world=sf-mission",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-soma": {
    "kind": "worldforge",
    "current": "https://sf-soma.fellowship.chat/",
    "proposed": "viewer.html?world=sf-soma",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-marina": {
    "kind": "worldforge",
    "current": "https://sf-marina.fellowship.chat/",
    "proposed": "viewer.html?world=sf-marina",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-chinatown": {
    "kind": "worldforge",
    "current": "https://sf-chinatown.fellowship.chat/",
    "proposed": "viewer.html?world=sf-chinatown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-sunset": {
    "kind": "worldforge",
    "current": "https://sf-sunset.fellowship.chat/",
    "proposed": "viewer.html?world=sf-sunset",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-nob-hill": {
    "kind": "worldforge",
    "current": "https://sf-nob-hill.fellowship.chat/",
    "proposed": "viewer.html?world=sf-nob-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-castro": {
    "kind": "worldforge",
    "current": "https://sf-castro.fellowship.chat/",
    "proposed": "viewer.html?world=sf-castro",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-haight": {
    "kind": "worldforge",
    "current": "https://sf-haight.fellowship.chat/",
    "proposed": "viewer.html?world=sf-haight",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-embarcadero": {
    "kind": "worldforge",
    "current": "https://sf-embarcadero.fellowship.chat/",
    "proposed": "viewer.html?world=sf-embarcadero",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-presidio": {
    "kind": "worldforge",
    "current": "https://sf-presidio.fellowship.chat/",
    "proposed": "viewer.html?world=sf-presidio",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-pacific-heights": {
    "kind": "worldforge",
    "current": "https://sf-pacific-heights.fellowship.chat/",
    "proposed": "viewer.html?world=sf-pacific-heights",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-excelsior": {
    "kind": "worldforge",
    "current": "https://sf-excelsior.fellowship.chat/",
    "proposed": "viewer.html?world=sf-excelsior",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-visitacion": {
    "kind": "worldforge",
    "current": "https://sf-visitacion.fellowship.chat/",
    "proposed": "viewer.html?world=sf-visitacion",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-bayview": {
    "kind": "worldforge",
    "current": "https://sf-bayview.fellowship.chat/",
    "proposed": "viewer.html?world=sf-bayview",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-potrero": {
    "kind": "worldforge",
    "current": "https://sf-potrero.fellowship.chat/",
    "proposed": "viewer.html?world=sf-potrero",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-dogpatch": {
    "kind": "worldforge",
    "current": "https://sf-dogpatch.fellowship.chat/",
    "proposed": "viewer.html?world=sf-dogpatch",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-western-addition": {
    "kind": "worldforge",
    "current": "https://sf-western-addition.fellowship.chat/",
    "proposed": "viewer.html?world=sf-western-addition",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-hayes-valley": {
    "kind": "worldforge",
    "current": "https://sf-hayes-valley.fellowship.chat/",
    "proposed": "viewer.html?world=sf-hayes-valley",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-nopa": {
    "kind": "worldforge",
    "current": "https://sf-nopa.fellowship.chat/",
    "proposed": "viewer.html?world=sf-nopa",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-richmond": {
    "kind": "worldforge",
    "current": "https://sf-richmond.fellowship.chat/",
    "proposed": "viewer.html?world=sf-richmond",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-outer-sunset": {
    "kind": "worldforge",
    "current": "https://sf-outer-sunset.fellowship.chat/",
    "proposed": "viewer.html?world=sf-outer-sunset",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-tenderloin": {
    "kind": "worldforge",
    "current": "https://sf-tenderloin.fellowship.chat/",
    "proposed": "viewer.html?world=sf-tenderloin",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-civic-center": {
    "kind": "worldforge",
    "current": "https://sf-civic-center.fellowship.chat/",
    "proposed": "viewer.html?world=sf-civic-center",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-south-beach": {
    "kind": "worldforge",
    "current": "https://sf-south-beach.fellowship.chat/",
    "proposed": "viewer.html?world=sf-south-beach",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-rincon-hill": {
    "kind": "worldforge",
    "current": "https://sf-rincon-hill.fellowship.chat/",
    "proposed": "viewer.html?world=sf-rincon-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-yerba-buena": {
    "kind": "worldforge",
    "current": "https://sf-yerba-buena.fellowship.chat/",
    "proposed": "viewer.html?world=sf-yerba-buena",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-telegraph-hill": {
    "kind": "worldforge",
    "current": "https://sf-telegraph-hill.fellowship.chat/",
    "proposed": "viewer.html?world=sf-telegraph-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-russian-hill": {
    "kind": "worldforge",
    "current": "https://sf-russian-hill.fellowship.chat/",
    "proposed": "viewer.html?world=sf-russian-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sf-north-beach": {
    "kind": "worldforge",
    "current": "https://sf-north-beach.fellowship.chat/",
    "proposed": "viewer.html?world=sf-north-beach",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-loop": {
    "kind": "worldforge",
    "current": "https://chi-loop.fellowship.chat/",
    "proposed": "viewer.html?world=chi-loop",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-west-loop": {
    "kind": "worldforge",
    "current": "https://chi-west-loop.fellowship.chat/",
    "proposed": "viewer.html?world=chi-west-loop",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-river-north": {
    "kind": "worldforge",
    "current": "https://chi-river-north.fellowship.chat/",
    "proposed": "viewer.html?world=chi-river-north",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-south-loop": {
    "kind": "worldforge",
    "current": "https://chi-south-loop.fellowship.chat/",
    "proposed": "viewer.html?world=chi-south-loop",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-lincoln-park": {
    "kind": "worldforge",
    "current": "https://chi-lincoln-park.fellowship.chat/",
    "proposed": "viewer.html?world=chi-lincoln-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-wicker-park": {
    "kind": "worldforge",
    "current": "https://chi-wicker-park.fellowship.chat/",
    "proposed": "viewer.html?world=chi-wicker-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-pilsen": {
    "kind": "worldforge",
    "current": "https://chi-pilsen.fellowship.chat/",
    "proposed": "viewer.html?world=chi-pilsen",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-bridgeport": {
    "kind": "worldforge",
    "current": "https://chi-bridgeport.fellowship.chat/",
    "proposed": "viewer.html?world=chi-bridgeport",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-hyde-park": {
    "kind": "worldforge",
    "current": "https://chi-hyde-park.fellowship.chat/",
    "proposed": "viewer.html?world=chi-hyde-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-ohare": {
    "kind": "worldforge",
    "current": "https://chi-ohare.fellowship.chat/",
    "proposed": "viewer.html?world=chi-ohare",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-chinatown": {
    "kind": "worldforge",
    "current": "https://chi-chinatown.fellowship.chat/",
    "proposed": "viewer.html?world=chi-chinatown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:chi-little-village": {
    "kind": "worldforge",
    "current": "https://chi-little-village.fellowship.chat/",
    "proposed": "viewer.html?world=chi-little-village",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-downtown": {
    "kind": "worldforge",
    "current": "https://det-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=det-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-midtown": {
    "kind": "worldforge",
    "current": "https://det-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=det-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-corktown": {
    "kind": "worldforge",
    "current": "https://det-corktown.fellowship.chat/",
    "proposed": "viewer.html?world=det-corktown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-eastern": {
    "kind": "worldforge",
    "current": "https://det-eastern.fellowship.chat/",
    "proposed": "viewer.html?world=det-eastern",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-detroit-river": {
    "kind": "worldforge",
    "current": "https://det-detroit-river.fellowship.chat/",
    "proposed": "viewer.html?world=det-detroit-river",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-new-center": {
    "kind": "worldforge",
    "current": "https://det-new-center.fellowship.chat/",
    "proposed": "viewer.html?world=det-new-center",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-lafayette": {
    "kind": "worldforge",
    "current": "https://det-lafayette.fellowship.chat/",
    "proposed": "viewer.html?world=det-lafayette",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-north-end": {
    "kind": "worldforge",
    "current": "https://det-north-end.fellowship.chat/",
    "proposed": "viewer.html?world=det-north-end",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-riverfront": {
    "kind": "worldforge",
    "current": "https://det-riverfront.fellowship.chat/",
    "proposed": "viewer.html?world=det-riverfront",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-west-side": {
    "kind": "worldforge",
    "current": "https://det-west-side.fellowship.chat/",
    "proposed": "viewer.html?world=det-west-side",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-hamtramck": {
    "kind": "worldforge",
    "current": "https://det-hamtramck.fellowship.chat/",
    "proposed": "viewer.html?world=det-hamtramck",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:det-highland-park": {
    "kind": "worldforge",
    "current": "https://det-highland-park.fellowship.chat/",
    "proposed": "viewer.html?world=det-highland-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-downtown": {
    "kind": "worldforge",
    "current": "https://pit-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=pit-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-oakland": {
    "kind": "worldforge",
    "current": "https://pit-oakland.fellowship.chat/",
    "proposed": "viewer.html?world=pit-oakland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-strip": {
    "kind": "worldforge",
    "current": "https://pit-strip.fellowship.chat/",
    "proposed": "viewer.html?world=pit-strip",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-lawrenceville": {
    "kind": "worldforge",
    "current": "https://pit-lawrenceville.fellowship.chat/",
    "proposed": "viewer.html?world=pit-lawrenceville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-shadyside": {
    "kind": "worldforge",
    "current": "https://pit-shadyside.fellowship.chat/",
    "proposed": "viewer.html?world=pit-shadyside",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-squirrel-hill": {
    "kind": "worldforge",
    "current": "https://pit-squirrel-hill.fellowship.chat/",
    "proposed": "viewer.html?world=pit-squirrel-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-hazelwood": {
    "kind": "worldforge",
    "current": "https://pit-hazelwood.fellowship.chat/",
    "proposed": "viewer.html?world=pit-hazelwood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-south-side": {
    "kind": "worldforge",
    "current": "https://pit-south-side.fellowship.chat/",
    "proposed": "viewer.html?world=pit-south-side",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-bloomfield": {
    "kind": "worldforge",
    "current": "https://pit-bloomfield.fellowship.chat/",
    "proposed": "viewer.html?world=pit-bloomfield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-point": {
    "kind": "worldforge",
    "current": "https://pit-point.fellowship.chat/",
    "proposed": "viewer.html?world=pit-point",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-tech-center": {
    "kind": "worldforge",
    "current": "https://pit-tech-center.fellowship.chat/",
    "proposed": "viewer.html?world=pit-tech-center",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pit-university": {
    "kind": "worldforge",
    "current": "https://pit-university.fellowship.chat/",
    "proposed": "viewer.html?world=pit-university",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-midtown": {
    "kind": "worldforge",
    "current": "https://atl-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=atl-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-buckhead": {
    "kind": "worldforge",
    "current": "https://atl-buckhead.fellowship.chat/",
    "proposed": "viewer.html?world=atl-buckhead",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-downtown": {
    "kind": "worldforge",
    "current": "https://atl-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=atl-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-sweet-auburn": {
    "kind": "worldforge",
    "current": "https://atl-sweet-auburn.fellowship.chat/",
    "proposed": "viewer.html?world=atl-sweet-auburn",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-west-end": {
    "kind": "worldforge",
    "current": "https://atl-west-end.fellowship.chat/",
    "proposed": "viewer.html?world=atl-west-end",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-inman-park": {
    "kind": "worldforge",
    "current": "https://atl-inman-park.fellowship.chat/",
    "proposed": "viewer.html?world=atl-inman-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-virginia-highland": {
    "kind": "worldforge",
    "current": "https://atl-virginia-highland.fellowship.chat/",
    "proposed": "viewer.html?world=atl-virginia-highland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-old-fourth": {
    "kind": "worldforge",
    "current": "https://atl-old-fourth.fellowship.chat/",
    "proposed": "viewer.html?world=atl-old-fourth",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-edgewood": {
    "kind": "worldforge",
    "current": "https://atl-edgewood.fellowship.chat/",
    "proposed": "viewer.html?world=atl-edgewood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-beltline": {
    "kind": "worldforge",
    "current": "https://atl-beltline.fellowship.chat/",
    "proposed": "viewer.html?world=atl-beltline",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-airport": {
    "kind": "worldforge",
    "current": "https://atl-airport.fellowship.chat/",
    "proposed": "viewer.html?world=atl-airport",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:atl-cumberland": {
    "kind": "worldforge",
    "current": "https://atl-cumberland.fellowship.chat/",
    "proposed": "viewer.html?world=atl-cumberland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-downtown": {
    "kind": "worldforge",
    "current": "https://dal-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=dal-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-uptown": {
    "kind": "worldforge",
    "current": "https://dal-uptown.fellowship.chat/",
    "proposed": "viewer.html?world=dal-uptown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-deep-ellum": {
    "kind": "worldforge",
    "current": "https://dal-deep-ellum.fellowship.chat/",
    "proposed": "viewer.html?world=dal-deep-ellum",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-oak-cliff": {
    "kind": "worldforge",
    "current": "https://dal-oak-cliff.fellowship.chat/",
    "proposed": "viewer.html?world=dal-oak-cliff",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-design": {
    "kind": "worldforge",
    "current": "https://dal-design.fellowship.chat/",
    "proposed": "viewer.html?world=dal-design",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-arts": {
    "kind": "worldforge",
    "current": "https://dal-arts.fellowship.chat/",
    "proposed": "viewer.html?world=dal-arts",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-victory": {
    "kind": "worldforge",
    "current": "https://dal-victory.fellowship.chat/",
    "proposed": "viewer.html?world=dal-victory",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-lakewood": {
    "kind": "worldforge",
    "current": "https://dal-lakewood.fellowship.chat/",
    "proposed": "viewer.html?world=dal-lakewood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-plano": {
    "kind": "worldforge",
    "current": "https://dal-plano.fellowship.chat/",
    "proposed": "viewer.html?world=dal-plano",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-richardson": {
    "kind": "worldforge",
    "current": "https://dal-richardson.fellowship.chat/",
    "proposed": "viewer.html?world=dal-richardson",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-irving": {
    "kind": "worldforge",
    "current": "https://dal-irving.fellowship.chat/",
    "proposed": "viewer.html?world=dal-irving",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-fort-worth": {
    "kind": "worldforge",
    "current": "https://dal-fort-worth.fellowship.chat/",
    "proposed": "viewer.html?world=dal-fort-worth",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-downtown": {
    "kind": "worldforge",
    "current": "https://hou-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=hou-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-med-center": {
    "kind": "worldforge",
    "current": "https://hou-med-center.fellowship.chat/",
    "proposed": "viewer.html?world=hou-med-center",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-midtown": {
    "kind": "worldforge",
    "current": "https://hou-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=hou-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-museum": {
    "kind": "worldforge",
    "current": "https://hou-museum.fellowship.chat/",
    "proposed": "viewer.html?world=hou-museum",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-montrose": {
    "kind": "worldforge",
    "current": "https://hou-montrose.fellowship.chat/",
    "proposed": "viewer.html?world=hou-montrose",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-heights": {
    "kind": "worldforge",
    "current": "https://hou-heights.fellowship.chat/",
    "proposed": "viewer.html?world=hou-heights",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-energy": {
    "kind": "worldforge",
    "current": "https://hou-energy.fellowship.chat/",
    "proposed": "viewer.html?world=hou-energy",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-galleria": {
    "kind": "worldforge",
    "current": "https://hou-galleria.fellowship.chat/",
    "proposed": "viewer.html?world=hou-galleria",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-ship-channel": {
    "kind": "worldforge",
    "current": "https://hou-ship-channel.fellowship.chat/",
    "proposed": "viewer.html?world=hou-ship-channel",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-nasa": {
    "kind": "worldforge",
    "current": "https://hou-nasa.fellowship.chat/",
    "proposed": "viewer.html?world=hou-nasa",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-east-end": {
    "kind": "worldforge",
    "current": "https://hou-east-end.fellowship.chat/",
    "proposed": "viewer.html?world=hou-east-end",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-third-ward": {
    "kind": "worldforge",
    "current": "https://hou-third-ward.fellowship.chat/",
    "proposed": "viewer.html?world=hou-third-ward",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-downtown": {
    "kind": "worldforge",
    "current": "https://la-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=la-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-hollywood": {
    "kind": "worldforge",
    "current": "https://la-hollywood.fellowship.chat/",
    "proposed": "viewer.html?world=la-hollywood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-silicon-beach": {
    "kind": "worldforge",
    "current": "https://la-silicon-beach.fellowship.chat/",
    "proposed": "viewer.html?world=la-silicon-beach",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-beverly-hills": {
    "kind": "worldforge",
    "current": "https://la-beverly-hills.fellowship.chat/",
    "proposed": "viewer.html?world=la-beverly-hills",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-santa-monica": {
    "kind": "worldforge",
    "current": "https://la-santa-monica.fellowship.chat/",
    "proposed": "viewer.html?world=la-santa-monica",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-venice": {
    "kind": "worldforge",
    "current": "https://la-venice.fellowship.chat/",
    "proposed": "viewer.html?world=la-venice",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-culver": {
    "kind": "worldforge",
    "current": "https://la-culver.fellowship.chat/",
    "proposed": "viewer.html?world=la-culver",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-pasadena": {
    "kind": "worldforge",
    "current": "https://la-pasadena.fellowship.chat/",
    "proposed": "viewer.html?world=la-pasadena",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-burbank": {
    "kind": "worldforge",
    "current": "https://la-burbank.fellowship.chat/",
    "proposed": "viewer.html?world=la-burbank",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-glendale": {
    "kind": "worldforge",
    "current": "https://la-glendale.fellowship.chat/",
    "proposed": "viewer.html?world=la-glendale",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-long-beach": {
    "kind": "worldforge",
    "current": "https://la-long-beach.fellowship.chat/",
    "proposed": "viewer.html?world=la-long-beach",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:la-compton": {
    "kind": "worldforge",
    "current": "https://la-compton.fellowship.chat/",
    "proposed": "viewer.html?world=la-compton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-downtown": {
    "kind": "worldforge",
    "current": "https://phx-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=phx-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-midtown": {
    "kind": "worldforge",
    "current": "https://phx-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=phx-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-arcadia": {
    "kind": "worldforge",
    "current": "https://phx-arcadia.fellowship.chat/",
    "proposed": "viewer.html?world=phx-arcadia",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-scottsdale": {
    "kind": "worldforge",
    "current": "https://phx-scottsdale.fellowship.chat/",
    "proposed": "viewer.html?world=phx-scottsdale",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-tempe": {
    "kind": "worldforge",
    "current": "https://phx-tempe.fellowship.chat/",
    "proposed": "viewer.html?world=phx-tempe",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-mesa": {
    "kind": "worldforge",
    "current": "https://phx-mesa.fellowship.chat/",
    "proposed": "viewer.html?world=phx-mesa",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-glendale": {
    "kind": "worldforge",
    "current": "https://phx-glendale.fellowship.chat/",
    "proposed": "viewer.html?world=phx-glendale",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-chandler": {
    "kind": "worldforge",
    "current": "https://phx-chandler.fellowship.chat/",
    "proposed": "viewer.html?world=phx-chandler",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-gilbert": {
    "kind": "worldforge",
    "current": "https://phx-gilbert.fellowship.chat/",
    "proposed": "viewer.html?world=phx-gilbert",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:phx-solar": {
    "kind": "worldforge",
    "current": "https://phx-solar.fellowship.chat/",
    "proposed": "viewer.html?world=phx-solar",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-downtown": {
    "kind": "worldforge",
    "current": "https://den-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=den-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-lohi": {
    "kind": "worldforge",
    "current": "https://den-lohi.fellowship.chat/",
    "proposed": "viewer.html?world=den-lohi",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-rino": {
    "kind": "worldforge",
    "current": "https://den-rino.fellowship.chat/",
    "proposed": "viewer.html?world=den-rino",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-five-points": {
    "kind": "worldforge",
    "current": "https://den-five-points.fellowship.chat/",
    "proposed": "viewer.html?world=den-five-points",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-cherry-creek": {
    "kind": "worldforge",
    "current": "https://den-cherry-creek.fellowship.chat/",
    "proposed": "viewer.html?world=den-cherry-creek",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-highlands": {
    "kind": "worldforge",
    "current": "https://den-highlands.fellowship.chat/",
    "proposed": "viewer.html?world=den-highlands",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-wash-park": {
    "kind": "worldforge",
    "current": "https://den-wash-park.fellowship.chat/",
    "proposed": "viewer.html?world=den-wash-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-tech": {
    "kind": "worldforge",
    "current": "https://den-tech.fellowship.chat/",
    "proposed": "viewer.html?world=den-tech",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-aerospace": {
    "kind": "worldforge",
    "current": "https://den-aerospace.fellowship.chat/",
    "proposed": "viewer.html?world=den-aerospace",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-boulder": {
    "kind": "worldforge",
    "current": "https://den-boulder.fellowship.chat/",
    "proposed": "viewer.html?world=den-boulder",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-downtown": {
    "kind": "worldforge",
    "current": "https://msp-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=msp-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-north-loop": {
    "kind": "worldforge",
    "current": "https://msp-north-loop.fellowship.chat/",
    "proposed": "viewer.html?world=msp-north-loop",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-warehouse": {
    "kind": "worldforge",
    "current": "https://msp-warehouse.fellowship.chat/",
    "proposed": "viewer.html?world=msp-warehouse",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-stadium": {
    "kind": "worldforge",
    "current": "https://msp-stadium.fellowship.chat/",
    "proposed": "viewer.html?world=msp-stadium",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-stpaul": {
    "kind": "worldforge",
    "current": "https://msp-stpaul.fellowship.chat/",
    "proposed": "viewer.html?world=msp-stpaul",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-midway": {
    "kind": "worldforge",
    "current": "https://msp-midway.fellowship.chat/",
    "proposed": "viewer.html?world=msp-midway",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-edin": {
    "kind": "worldforge",
    "current": "https://msp-edin.fellowship.chat/",
    "proposed": "viewer.html?world=msp-edin",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-bloomington": {
    "kind": "worldforge",
    "current": "https://msp-bloomington.fellowship.chat/",
    "proposed": "viewer.html?world=msp-bloomington",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-plymouth": {
    "kind": "worldforge",
    "current": "https://msp-plymouth.fellowship.chat/",
    "proposed": "viewer.html?world=msp-plymouth",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:msp-medical": {
    "kind": "worldforge",
    "current": "https://msp-medical.fellowship.chat/",
    "proposed": "viewer.html?world=msp-medical",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-downtown": {
    "kind": "worldforge",
    "current": "https://sea-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=sea-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-slu": {
    "kind": "worldforge",
    "current": "https://sea-slu.fellowship.chat/",
    "proposed": "viewer.html?world=sea-slu",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-capitol-hill": {
    "kind": "worldforge",
    "current": "https://sea-capitol-hill.fellowship.chat/",
    "proposed": "viewer.html?world=sea-capitol-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-ballard": {
    "kind": "worldforge",
    "current": "https://sea-ballard.fellowship.chat/",
    "proposed": "viewer.html?world=sea-ballard",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-fremont": {
    "kind": "worldforge",
    "current": "https://sea-fremont.fellowship.chat/",
    "proposed": "viewer.html?world=sea-fremont",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-queen-anne": {
    "kind": "worldforge",
    "current": "https://sea-queen-anne.fellowship.chat/",
    "proposed": "viewer.html?world=sea-queen-anne",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-uw": {
    "kind": "worldforge",
    "current": "https://sea-uw.fellowship.chat/",
    "proposed": "viewer.html?world=sea-uw",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-georgetown": {
    "kind": "worldforge",
    "current": "https://sea-georgetown.fellowship.chat/",
    "proposed": "viewer.html?world=sea-georgetown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-sodo": {
    "kind": "worldforge",
    "current": "https://sea-sodo.fellowship.chat/",
    "proposed": "viewer.html?world=sea-sodo",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-bellevue": {
    "kind": "worldforge",
    "current": "https://sea-bellevue.fellowship.chat/",
    "proposed": "viewer.html?world=sea-bellevue",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-redmond": {
    "kind": "worldforge",
    "current": "https://sea-redmond.fellowship.chat/",
    "proposed": "viewer.html?world=sea-redmond",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-tacoma": {
    "kind": "worldforge",
    "current": "https://sea-tacoma.fellowship.chat/",
    "proposed": "viewer.html?world=sea-tacoma",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-downtown": {
    "kind": "worldforge",
    "current": "https://bos-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=bos-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-back-bay": {
    "kind": "worldforge",
    "current": "https://bos-back-bay.fellowship.chat/",
    "proposed": "viewer.html?world=bos-back-bay",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-beacon-hill": {
    "kind": "worldforge",
    "current": "https://bos-beacon-hill.fellowship.chat/",
    "proposed": "viewer.html?world=bos-beacon-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-south-end": {
    "kind": "worldforge",
    "current": "https://bos-south-end.fellowship.chat/",
    "proposed": "viewer.html?world=bos-south-end",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-north-end": {
    "kind": "worldforge",
    "current": "https://bos-north-end.fellowship.chat/",
    "proposed": "viewer.html?world=bos-north-end",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-kendall": {
    "kind": "worldforge",
    "current": "https://bos-kendall.fellowship.chat/",
    "proposed": "viewer.html?world=bos-kendall",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-cambridge": {
    "kind": "worldforge",
    "current": "https://bos-cambridge.fellowship.chat/",
    "proposed": "viewer.html?world=bos-cambridge",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-fenway": {
    "kind": "worldforge",
    "current": "https://bos-fenway.fellowship.chat/",
    "proposed": "viewer.html?world=bos-fenway",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-charlestown": {
    "kind": "worldforge",
    "current": "https://bos-charlestown.fellowship.chat/",
    "proposed": "viewer.html?world=bos-charlestown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-seaport": {
    "kind": "worldforge",
    "current": "https://bos-seaport.fellowship.chat/",
    "proposed": "viewer.html?world=bos-seaport",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-allston": {
    "kind": "worldforge",
    "current": "https://bos-allston.fellowship.chat/",
    "proposed": "viewer.html?world=bos-allston",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bos-brookline": {
    "kind": "worldforge",
    "current": "https://bos-brookline.fellowship.chat/",
    "proposed": "viewer.html?world=bos-brookline",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-shibuya": {
    "kind": "worldforge",
    "current": "https://tokyo-shibuya.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-shibuya",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-shinjuku": {
    "kind": "worldforge",
    "current": "https://tokyo-shinjuku.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-shinjuku",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-akihabara": {
    "kind": "worldforge",
    "current": "https://tokyo-akihabara.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-akihabara",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-roppongi": {
    "kind": "worldforge",
    "current": "https://tokyo-roppongi.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-roppongi",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-odaiba": {
    "kind": "worldforge",
    "current": "https://tokyo-odaiba.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-odaiba",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-ginza": {
    "kind": "worldforge",
    "current": "https://tokyo-ginza.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-ginza",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-marunouchi": {
    "kind": "worldforge",
    "current": "https://tokyo-marunouchi.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-marunouchi",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-asakusa": {
    "kind": "worldforge",
    "current": "https://tokyo-asakusa.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-asakusa",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-ikebukuro": {
    "kind": "worldforge",
    "current": "https://tokyo-ikebukuro.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-ikebukuro",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-tsukuba": {
    "kind": "worldforge",
    "current": "https://tokyo-tsukuba.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-tsukuba",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-yokohama": {
    "kind": "worldforge",
    "current": "https://tokyo-yokohama.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-yokohama",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tokyo-kawasaki": {
    "kind": "worldforge",
    "current": "https://tokyo-kawasaki.fellowship.chat/",
    "proposed": "viewer.html?world=tokyo-kawasaki",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-pudong": {
    "kind": "worldforge",
    "current": "https://sha-pudong.fellowship.chat/",
    "proposed": "viewer.html?world=sha-pudong",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-bund": {
    "kind": "worldforge",
    "current": "https://sha-bund.fellowship.chat/",
    "proposed": "viewer.html?world=sha-bund",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-jingan": {
    "kind": "worldforge",
    "current": "https://sha-jingan.fellowship.chat/",
    "proposed": "viewer.html?world=sha-jingan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-huangpu": {
    "kind": "worldforge",
    "current": "https://sha-huangpu.fellowship.chat/",
    "proposed": "viewer.html?world=sha-huangpu",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-hongqiao": {
    "kind": "worldforge",
    "current": "https://sha-hongqiao.fellowship.chat/",
    "proposed": "viewer.html?world=sha-hongqiao",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-zhangjiang": {
    "kind": "worldforge",
    "current": "https://sha-zhangjiang.fellowship.chat/",
    "proposed": "viewer.html?world=sha-zhangjiang",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-yangpu": {
    "kind": "worldforge",
    "current": "https://sha-yangpu.fellowship.chat/",
    "proposed": "viewer.html?world=sha-yangpu",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-minhang": {
    "kind": "worldforge",
    "current": "https://sha-minhang.fellowship.chat/",
    "proposed": "viewer.html?world=sha-minhang",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-jiading": {
    "kind": "worldforge",
    "current": "https://sha-jiading.fellowship.chat/",
    "proposed": "viewer.html?world=sha-jiading",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sha-chongming": {
    "kind": "worldforge",
    "current": "https://sha-chongming.fellowship.chat/",
    "proposed": "viewer.html?world=sha-chongming",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-marina-bay": {
    "kind": "worldforge",
    "current": "https://sg-marina-bay.fellowship.chat/",
    "proposed": "viewer.html?world=sg-marina-bay",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-orchard": {
    "kind": "worldforge",
    "current": "https://sg-orchard.fellowship.chat/",
    "proposed": "viewer.html?world=sg-orchard",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-chinatown": {
    "kind": "worldforge",
    "current": "https://sg-chinatown.fellowship.chat/",
    "proposed": "viewer.html?world=sg-chinatown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-little-india": {
    "kind": "worldforge",
    "current": "https://sg-little-india.fellowship.chat/",
    "proposed": "viewer.html?world=sg-little-india",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-jurong": {
    "kind": "worldforge",
    "current": "https://sg-jurong.fellowship.chat/",
    "proposed": "viewer.html?world=sg-jurong",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-one-north": {
    "kind": "worldforge",
    "current": "https://sg-one-north.fellowship.chat/",
    "proposed": "viewer.html?world=sg-one-north",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-tampines": {
    "kind": "worldforge",
    "current": "https://sg-tampines.fellowship.chat/",
    "proposed": "viewer.html?world=sg-tampines",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-woodlands": {
    "kind": "worldforge",
    "current": "https://sg-woodlands.fellowship.chat/",
    "proposed": "viewer.html?world=sg-woodlands",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-changi": {
    "kind": "worldforge",
    "current": "https://sg-changi.fellowship.chat/",
    "proposed": "viewer.html?world=sg-changi",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sg-tuas": {
    "kind": "worldforge",
    "current": "https://sg-tuas.fellowship.chat/",
    "proposed": "viewer.html?world=sg-tuas",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-gangnam": {
    "kind": "worldforge",
    "current": "https://seo-gangnam.fellowship.chat/",
    "proposed": "viewer.html?world=seo-gangnam",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-gangbuk": {
    "kind": "worldforge",
    "current": "https://seo-gangbuk.fellowship.chat/",
    "proposed": "viewer.html?world=seo-gangbuk",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-mapo": {
    "kind": "worldforge",
    "current": "https://seo-mapo.fellowship.chat/",
    "proposed": "viewer.html?world=seo-mapo",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-jongno": {
    "kind": "worldforge",
    "current": "https://seo-jongno.fellowship.chat/",
    "proposed": "viewer.html?world=seo-jongno",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-yongsan": {
    "kind": "worldforge",
    "current": "https://seo-yongsan.fellowship.chat/",
    "proposed": "viewer.html?world=seo-yongsan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-songdo": {
    "kind": "worldforge",
    "current": "https://seo-songdo.fellowship.chat/",
    "proposed": "viewer.html?world=seo-songdo",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-pangyo": {
    "kind": "worldforge",
    "current": "https://seo-pangyo.fellowship.chat/",
    "proposed": "viewer.html?world=seo-pangyo",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-dongdaemun": {
    "kind": "worldforge",
    "current": "https://seo-dongdaemun.fellowship.chat/",
    "proposed": "viewer.html?world=seo-dongdaemun",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-yeouido": {
    "kind": "worldforge",
    "current": "https://seo-yeouido.fellowship.chat/",
    "proposed": "viewer.html?world=seo-yeouido",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:seo-itewon": {
    "kind": "worldforge",
    "current": "https://seo-itewon.fellowship.chat/",
    "proposed": "viewer.html?world=seo-itewon",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-manhattan": {
    "kind": "worldforge",
    "current": "https://nyc-manhattan.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-manhattan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-brooklyn": {
    "kind": "worldforge",
    "current": "https://nyc-brooklyn.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-brooklyn",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-queens": {
    "kind": "worldforge",
    "current": "https://nyc-queens.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-queens",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-bronx": {
    "kind": "worldforge",
    "current": "https://nyc-bronx.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-bronx",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-staten-island": {
    "kind": "worldforge",
    "current": "https://nyc-staten-island.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-staten-island",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-harlem": {
    "kind": "worldforge",
    "current": "https://nyc-harlem.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-harlem",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-chelsea": {
    "kind": "worldforge",
    "current": "https://nyc-chelsea.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-chelsea",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-williamsburg": {
    "kind": "worldforge",
    "current": "https://nyc-williamsburg.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-williamsburg",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-dumbo": {
    "kind": "worldforge",
    "current": "https://nyc-dumbo.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-dumbo",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-financial": {
    "kind": "worldforge",
    "current": "https://nyc-financial.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-financial",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-midtown": {
    "kind": "worldforge",
    "current": "https://nyc-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nyc-upper-east": {
    "kind": "worldforge",
    "current": "https://nyc-upper-east.fellowship.chat/",
    "proposed": "viewer.html?world=nyc-upper-east",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-downtown": {
    "kind": "worldforge",
    "current": "https://pdx-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-pearl": {
    "kind": "worldforge",
    "current": "https://pdx-pearl.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-pearl",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-hawthorne": {
    "kind": "worldforge",
    "current": "https://pdx-hawthorne.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-hawthorne",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-alberta": {
    "kind": "worldforge",
    "current": "https://pdx-alberta.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-alberta",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-lloyd": {
    "kind": "worldforge",
    "current": "https://pdx-lloyd.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-lloyd",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-division": {
    "kind": "worldforge",
    "current": "https://pdx-division.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-division",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-beaverton": {
    "kind": "worldforge",
    "current": "https://pdx-beaverton.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-beaverton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-gresham": {
    "kind": "worldforge",
    "current": "https://pdx-gresham.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-gresham",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-hillsboro": {
    "kind": "worldforge",
    "current": "https://pdx-hillsboro.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-hillsboro",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:pdx-oregon-city": {
    "kind": "worldforge",
    "current": "https://pdx-oregon-city.fellowship.chat/",
    "proposed": "viewer.html?world=pdx-oregon-city",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-downtown": {
    "kind": "worldforge",
    "current": "https://nash-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=nash-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-music-row": {
    "kind": "worldforge",
    "current": "https://nash-music-row.fellowship.chat/",
    "proposed": "viewer.html?world=nash-music-row",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-gulch": {
    "kind": "worldforge",
    "current": "https://nash-gulch.fellowship.chat/",
    "proposed": "viewer.html?world=nash-gulch",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-east-nash": {
    "kind": "worldforge",
    "current": "https://nash-east-nash.fellowship.chat/",
    "proposed": "viewer.html?world=nash-east-nash",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-germantown": {
    "kind": "worldforge",
    "current": "https://nash-germantown.fellowship.chat/",
    "proposed": "viewer.html?world=nash-germantown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-sobro": {
    "kind": "worldforge",
    "current": "https://nash-sobro.fellowship.chat/",
    "proposed": "viewer.html?world=nash-sobro",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-midtown": {
    "kind": "worldforge",
    "current": "https://nash-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=nash-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-vanderbilt": {
    "kind": "worldforge",
    "current": "https://nash-vanderbilt.fellowship.chat/",
    "proposed": "viewer.html?world=nash-vanderbilt",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-franklin": {
    "kind": "worldforge",
    "current": "https://nash-franklin.fellowship.chat/",
    "proposed": "viewer.html?world=nash-franklin",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:nash-murfreesboro": {
    "kind": "worldforge",
    "current": "https://nash-murfreesboro.fellowship.chat/",
    "proposed": "viewer.html?world=nash-murfreesboro",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-downtown": {
    "kind": "worldforge",
    "current": "https://aus-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=aus-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-south-congress": {
    "kind": "worldforge",
    "current": "https://aus-south-congress.fellowship.chat/",
    "proposed": "viewer.html?world=aus-south-congress",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-east": {
    "kind": "worldforge",
    "current": "https://aus-east.fellowship.chat/",
    "proposed": "viewer.html?world=aus-east",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-domain": {
    "kind": "worldforge",
    "current": "https://aus-domain.fellowship.chat/",
    "proposed": "viewer.html?world=aus-domain",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-warehouse": {
    "kind": "worldforge",
    "current": "https://aus-warehouse.fellowship.chat/",
    "proposed": "viewer.html?world=aus-warehouse",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-rainey": {
    "kind": "worldforge",
    "current": "https://aus-rainey.fellowship.chat/",
    "proposed": "viewer.html?world=aus-rainey",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-mueller": {
    "kind": "worldforge",
    "current": "https://aus-mueller.fellowship.chat/",
    "proposed": "viewer.html?world=aus-mueller",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-round-rock": {
    "kind": "worldforge",
    "current": "https://aus-round-rock.fellowship.chat/",
    "proposed": "viewer.html?world=aus-round-rock",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-georgetown": {
    "kind": "worldforge",
    "current": "https://aus-georgetown.fellowship.chat/",
    "proposed": "viewer.html?world=aus-georgetown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:aus-pflugerville": {
    "kind": "worldforge",
    "current": "https://aus-pflugerville.fellowship.chat/",
    "proposed": "viewer.html?world=aus-pflugerville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-downtown": {
    "kind": "worldforge",
    "current": "https://mia-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=mia-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-brickell": {
    "kind": "worldforge",
    "current": "https://mia-brickell.fellowship.chat/",
    "proposed": "viewer.html?world=mia-brickell",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-wynwood": {
    "kind": "worldforge",
    "current": "https://mia-wynwood.fellowship.chat/",
    "proposed": "viewer.html?world=mia-wynwood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-south-beach": {
    "kind": "worldforge",
    "current": "https://mia-south-beach.fellowship.chat/",
    "proposed": "viewer.html?world=mia-south-beach",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-little-havana": {
    "kind": "worldforge",
    "current": "https://mia-little-havana.fellowship.chat/",
    "proposed": "viewer.html?world=mia-little-havana",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-design": {
    "kind": "worldforge",
    "current": "https://mia-design.fellowship.chat/",
    "proposed": "viewer.html?world=mia-design",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-midtown": {
    "kind": "worldforge",
    "current": "https://mia-midtown.fellowship.chat/",
    "proposed": "viewer.html?world=mia-midtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-coral-gables": {
    "kind": "worldforge",
    "current": "https://mia-coral-gables.fellowship.chat/",
    "proposed": "viewer.html?world=mia-coral-gables",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-aventura": {
    "kind": "worldforge",
    "current": "https://mia-aventura.fellowship.chat/",
    "proposed": "viewer.html?world=mia-aventura",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mia-doral": {
    "kind": "worldforge",
    "current": "https://mia-doral.fellowship.chat/",
    "proposed": "viewer.html?world=mia-doral",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-downtown": {
    "kind": "worldforge",
    "current": "https://rdu-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-research": {
    "kind": "worldforge",
    "current": "https://rdu-research.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-research",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-durham": {
    "kind": "worldforge",
    "current": "https://rdu-durham.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-durham",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-chapel-hill": {
    "kind": "worldforge",
    "current": "https://rdu-chapel-hill.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-chapel-hill",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-cary": {
    "kind": "worldforge",
    "current": "https://rdu-cary.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-cary",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-apex": {
    "kind": "worldforge",
    "current": "https://rdu-apex.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-apex",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-morrisville": {
    "kind": "worldforge",
    "current": "https://rdu-morrisville.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-morrisville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-wake": {
    "kind": "worldforge",
    "current": "https://rdu-wake.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-wake",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-nc-state": {
    "kind": "worldforge",
    "current": "https://rdu-nc-state.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-nc-state",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:rdu-duke": {
    "kind": "worldforge",
    "current": "https://rdu-duke.fellowship.chat/",
    "proposed": "viewer.html?world=rdu-duke",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-downtown": {
    "kind": "worldforge",
    "current": "https://cmh-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-short-north": {
    "kind": "worldforge",
    "current": "https://cmh-short-north.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-short-north",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-german": {
    "kind": "worldforge",
    "current": "https://cmh-german.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-german",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-osu": {
    "kind": "worldforge",
    "current": "https://cmh-osu.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-osu",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-easton": {
    "kind": "worldforge",
    "current": "https://cmh-easton.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-easton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-dublin": {
    "kind": "worldforge",
    "current": "https://cmh-dublin.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-dublin",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-westerville": {
    "kind": "worldforge",
    "current": "https://cmh-westerville.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-westerville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-grove-city": {
    "kind": "worldforge",
    "current": "https://cmh-grove-city.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-grove-city",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-reynoldsburg": {
    "kind": "worldforge",
    "current": "https://cmh-reynoldsburg.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-reynoldsburg",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:cmh-pickerington": {
    "kind": "worldforge",
    "current": "https://cmh-pickerington.fellowship.chat/",
    "proposed": "viewer.html?world=cmh-pickerington",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-downtown": {
    "kind": "worldforge",
    "current": "https://kc-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=kc-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-crossroads": {
    "kind": "worldforge",
    "current": "https://kc-crossroads.fellowship.chat/",
    "proposed": "viewer.html?world=kc-crossroads",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-plaza": {
    "kind": "worldforge",
    "current": "https://kc-plaza.fellowship.chat/",
    "proposed": "viewer.html?world=kc-plaza",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-westport": {
    "kind": "worldforge",
    "current": "https://kc-westport.fellowship.chat/",
    "proposed": "viewer.html?world=kc-westport",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-power-light": {
    "kind": "worldforge",
    "current": "https://kc-power-light.fellowship.chat/",
    "proposed": "viewer.html?world=kc-power-light",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-northland": {
    "kind": "worldforge",
    "current": "https://kc-northland.fellowship.chat/",
    "proposed": "viewer.html?world=kc-northland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-opportunity": {
    "kind": "worldforge",
    "current": "https://kc-opportunity.fellowship.chat/",
    "proposed": "viewer.html?world=kc-opportunity",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-overland": {
    "kind": "worldforge",
    "current": "https://kc-overland.fellowship.chat/",
    "proposed": "viewer.html?world=kc-overland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-olathe": {
    "kind": "worldforge",
    "current": "https://kc-olathe.fellowship.chat/",
    "proposed": "viewer.html?world=kc-olathe",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:kc-independence": {
    "kind": "worldforge",
    "current": "https://kc-independence.fellowship.chat/",
    "proposed": "viewer.html?world=kc-independence",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-downtown": {
    "kind": "worldforge",
    "current": "https://stl-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=stl-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-central-west": {
    "kind": "worldforge",
    "current": "https://stl-central-west.fellowship.chat/",
    "proposed": "viewer.html?world=stl-central-west",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-soulard": {
    "kind": "worldforge",
    "current": "https://stl-soulard.fellowship.chat/",
    "proposed": "viewer.html?world=stl-soulard",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-delmar": {
    "kind": "worldforge",
    "current": "https://stl-delmar.fellowship.chat/",
    "proposed": "viewer.html?world=stl-delmar",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-cortex": {
    "kind": "worldforge",
    "current": "https://stl-cortex.fellowship.chat/",
    "proposed": "viewer.html?world=stl-cortex",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-ballpark": {
    "kind": "worldforge",
    "current": "https://stl-ballpark.fellowship.chat/",
    "proposed": "viewer.html?world=stl-ballpark",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-webster": {
    "kind": "worldforge",
    "current": "https://stl-webster.fellowship.chat/",
    "proposed": "viewer.html?world=stl-webster",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-kirkwood": {
    "kind": "worldforge",
    "current": "https://stl-kirkwood.fellowship.chat/",
    "proposed": "viewer.html?world=stl-kirkwood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-clayton": {
    "kind": "worldforge",
    "current": "https://stl-clayton.fellowship.chat/",
    "proposed": "viewer.html?world=stl-clayton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:stl-chesterfield": {
    "kind": "worldforge",
    "current": "https://stl-chesterfield.fellowship.chat/",
    "proposed": "viewer.html?world=stl-chesterfield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-downtown": {
    "kind": "worldforge",
    "current": "https://indy-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=indy-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-mass": {
    "kind": "worldforge",
    "current": "https://indy-mass.fellowship.chat/",
    "proposed": "viewer.html?world=indy-mass",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-broad-ripple": {
    "kind": "worldforge",
    "current": "https://indy-broad-ripple.fellowship.chat/",
    "proposed": "viewer.html?world=indy-broad-ripple",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-fountain": {
    "kind": "worldforge",
    "current": "https://indy-fountain.fellowship.chat/",
    "proposed": "viewer.html?world=indy-fountain",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-carmel": {
    "kind": "worldforge",
    "current": "https://indy-carmel.fellowship.chat/",
    "proposed": "viewer.html?world=indy-carmel",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-fishers": {
    "kind": "worldforge",
    "current": "https://indy-fishers.fellowship.chat/",
    "proposed": "viewer.html?world=indy-fishers",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-noblesville": {
    "kind": "worldforge",
    "current": "https://indy-noblesville.fellowship.chat/",
    "proposed": "viewer.html?world=indy-noblesville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-westfield": {
    "kind": "worldforge",
    "current": "https://indy-westfield.fellowship.chat/",
    "proposed": "viewer.html?world=indy-westfield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-avon": {
    "kind": "worldforge",
    "current": "https://indy-avon.fellowship.chat/",
    "proposed": "viewer.html?world=indy-avon",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:indy-plainfield": {
    "kind": "worldforge",
    "current": "https://indy-plainfield.fellowship.chat/",
    "proposed": "viewer.html?world=indy-plainfield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-city": {
    "kind": "worldforge",
    "current": "https://ldn-city.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-city",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-shoreditch": {
    "kind": "worldforge",
    "current": "https://ldn-shoreditch.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-shoreditch",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-canary": {
    "kind": "worldforge",
    "current": "https://ldn-canary.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-canary",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-camden": {
    "kind": "worldforge",
    "current": "https://ldn-camden.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-camden",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-westminster": {
    "kind": "worldforge",
    "current": "https://ldn-westminster.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-westminster",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-kings-cross": {
    "kind": "worldforge",
    "current": "https://ldn-kings-cross.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-kings-cross",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-battersea": {
    "kind": "worldforge",
    "current": "https://ldn-battersea.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-battersea",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-stratford": {
    "kind": "worldforge",
    "current": "https://ldn-stratford.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-stratford",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-greenwich": {
    "kind": "worldforge",
    "current": "https://ldn-greenwich.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-greenwich",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ldn-croydon": {
    "kind": "worldforge",
    "current": "https://ldn-croydon.fellowship.chat/",
    "proposed": "viewer.html?world=ldn-croydon",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-mitte": {
    "kind": "worldforge",
    "current": "https://ber-mitte.fellowship.chat/",
    "proposed": "viewer.html?world=ber-mitte",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-kreuzberg": {
    "kind": "worldforge",
    "current": "https://ber-kreuzberg.fellowship.chat/",
    "proposed": "viewer.html?world=ber-kreuzberg",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-friedrichshain": {
    "kind": "worldforge",
    "current": "https://ber-friedrichshain.fellowship.chat/",
    "proposed": "viewer.html?world=ber-friedrichshain",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-charlotten": {
    "kind": "worldforge",
    "current": "https://ber-charlotten.fellowship.chat/",
    "proposed": "viewer.html?world=ber-charlotten",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-neukolln": {
    "kind": "worldforge",
    "current": "https://ber-neukolln.fellowship.chat/",
    "proposed": "viewer.html?world=ber-neukolln",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-prenzlauer": {
    "kind": "worldforge",
    "current": "https://ber-prenzlauer.fellowship.chat/",
    "proposed": "viewer.html?world=ber-prenzlauer",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-wedding": {
    "kind": "worldforge",
    "current": "https://ber-wedding.fellowship.chat/",
    "proposed": "viewer.html?world=ber-wedding",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-tempelhof": {
    "kind": "worldforge",
    "current": "https://ber-tempelhof.fellowship.chat/",
    "proposed": "viewer.html?world=ber-tempelhof",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-spandau": {
    "kind": "worldforge",
    "current": "https://ber-spandau.fellowship.chat/",
    "proposed": "viewer.html?world=ber-spandau",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:ber-adlershof": {
    "kind": "worldforge",
    "current": "https://ber-adlershof.fellowship.chat/",
    "proposed": "viewer.html?world=ber-adlershof",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-louvre": {
    "kind": "worldforge",
    "current": "https://par-louvre.fellowship.chat/",
    "proposed": "viewer.html?world=par-louvre",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-marais": {
    "kind": "worldforge",
    "current": "https://par-marais.fellowship.chat/",
    "proposed": "viewer.html?world=par-marais",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-defence": {
    "kind": "worldforge",
    "current": "https://par-defence.fellowship.chat/",
    "proposed": "viewer.html?world=par-defence",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-montmartre": {
    "kind": "worldforge",
    "current": "https://par-montmartre.fellowship.chat/",
    "proposed": "viewer.html?world=par-montmartre",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-saclay": {
    "kind": "worldforge",
    "current": "https://par-saclay.fellowship.chat/",
    "proposed": "viewer.html?world=par-saclay",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-bastille": {
    "kind": "worldforge",
    "current": "https://par-bastille.fellowship.chat/",
    "proposed": "viewer.html?world=par-bastille",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-republique": {
    "kind": "worldforge",
    "current": "https://par-republique.fellowship.chat/",
    "proposed": "viewer.html?world=par-republique",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-bercy": {
    "kind": "worldforge",
    "current": "https://par-bercy.fellowship.chat/",
    "proposed": "viewer.html?world=par-bercy",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-saint-denis": {
    "kind": "worldforge",
    "current": "https://par-saint-denis.fellowship.chat/",
    "proposed": "viewer.html?world=par-saint-denis",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:par-evry": {
    "kind": "worldforge",
    "current": "https://par-evry.fellowship.chat/",
    "proposed": "viewer.html?world=par-evry",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-cbd": {
    "kind": "worldforge",
    "current": "https://syd-cbd.fellowship.chat/",
    "proposed": "viewer.html?world=syd-cbd",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-darling": {
    "kind": "worldforge",
    "current": "https://syd-darling.fellowship.chat/",
    "proposed": "viewer.html?world=syd-darling",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-barangaroo": {
    "kind": "worldforge",
    "current": "https://syd-barangaroo.fellowship.chat/",
    "proposed": "viewer.html?world=syd-barangaroo",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-surry": {
    "kind": "worldforge",
    "current": "https://syd-surry.fellowship.chat/",
    "proposed": "viewer.html?world=syd-surry",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-newtown": {
    "kind": "worldforge",
    "current": "https://syd-newtown.fellowship.chat/",
    "proposed": "viewer.html?world=syd-newtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-parramatta": {
    "kind": "worldforge",
    "current": "https://syd-parramatta.fellowship.chat/",
    "proposed": "viewer.html?world=syd-parramatta",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-chatswood": {
    "kind": "worldforge",
    "current": "https://syd-chatswood.fellowship.chat/",
    "proposed": "viewer.html?world=syd-chatswood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-macquarie": {
    "kind": "worldforge",
    "current": "https://syd-macquarie.fellowship.chat/",
    "proposed": "viewer.html?world=syd-macquarie",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-north-ryde": {
    "kind": "worldforge",
    "current": "https://syd-north-ryde.fellowship.chat/",
    "proposed": "viewer.html?world=syd-north-ryde",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:syd-liverpool": {
    "kind": "worldforge",
    "current": "https://syd-liverpool.fellowship.chat/",
    "proposed": "viewer.html?world=syd-liverpool",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-downtown": {
    "kind": "worldforge",
    "current": "https://sd-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=sd-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-gaslamp": {
    "kind": "worldforge",
    "current": "https://sd-gaslamp.fellowship.chat/",
    "proposed": "viewer.html?world=sd-gaslamp",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-la-jolla": {
    "kind": "worldforge",
    "current": "https://sd-la-jolla.fellowship.chat/",
    "proposed": "viewer.html?world=sd-la-jolla",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-mission": {
    "kind": "worldforge",
    "current": "https://sd-mission.fellowship.chat/",
    "proposed": "viewer.html?world=sd-mission",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-pacific-beach": {
    "kind": "worldforge",
    "current": "https://sd-pacific-beach.fellowship.chat/",
    "proposed": "viewer.html?world=sd-pacific-beach",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-hillcrest": {
    "kind": "worldforge",
    "current": "https://sd-hillcrest.fellowship.chat/",
    "proposed": "viewer.html?world=sd-hillcrest",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-north-park": {
    "kind": "worldforge",
    "current": "https://sd-north-park.fellowship.chat/",
    "proposed": "viewer.html?world=sd-north-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-sorrento": {
    "kind": "worldforge",
    "current": "https://sd-sorrento.fellowship.chat/",
    "proposed": "viewer.html?world=sd-sorrento",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-carlsbad": {
    "kind": "worldforge",
    "current": "https://sd-carlsbad.fellowship.chat/",
    "proposed": "viewer.html?world=sd-carlsbad",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sd-chula-vista": {
    "kind": "worldforge",
    "current": "https://sd-chula-vista.fellowship.chat/",
    "proposed": "viewer.html?world=sd-chula-vista",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-bandra": {
    "kind": "worldforge",
    "current": "https://mum-bandra.fellowship.chat/",
    "proposed": "viewer.html?world=mum-bandra",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-nariman": {
    "kind": "worldforge",
    "current": "https://mum-nariman.fellowship.chat/",
    "proposed": "viewer.html?world=mum-nariman",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-andheri": {
    "kind": "worldforge",
    "current": "https://mum-andheri.fellowship.chat/",
    "proposed": "viewer.html?world=mum-andheri",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-powai": {
    "kind": "worldforge",
    "current": "https://mum-powai.fellowship.chat/",
    "proposed": "viewer.html?world=mum-powai",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-lower-parel": {
    "kind": "worldforge",
    "current": "https://mum-lower-parel.fellowship.chat/",
    "proposed": "viewer.html?world=mum-lower-parel",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-worli": {
    "kind": "worldforge",
    "current": "https://mum-worli.fellowship.chat/",
    "proposed": "viewer.html?world=mum-worli",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-thane": {
    "kind": "worldforge",
    "current": "https://mum-thane.fellowship.chat/",
    "proposed": "viewer.html?world=mum-thane",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-navi-mumbai": {
    "kind": "worldforge",
    "current": "https://mum-navi-mumbai.fellowship.chat/",
    "proposed": "viewer.html?world=mum-navi-mumbai",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-borivali": {
    "kind": "worldforge",
    "current": "https://mum-borivali.fellowship.chat/",
    "proposed": "viewer.html?world=mum-borivali",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:mum-kalyan": {
    "kind": "worldforge",
    "current": "https://mum-kalyan.fellowship.chat/",
    "proposed": "viewer.html?world=mum-kalyan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-marina": {
    "kind": "worldforge",
    "current": "https://dxb-marina.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-marina",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-downtown": {
    "kind": "worldforge",
    "current": "https://dxb-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-jlt": {
    "kind": "worldforge",
    "current": "https://dxb-jlt.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-jlt",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-internet": {
    "kind": "worldforge",
    "current": "https://dxb-internet.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-internet",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-media": {
    "kind": "worldforge",
    "current": "https://dxb-media.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-media",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-difc": {
    "kind": "worldforge",
    "current": "https://dxb-difc.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-difc",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-al-barsha": {
    "kind": "worldforge",
    "current": "https://dxb-al-barsha.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-al-barsha",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-deira": {
    "kind": "worldforge",
    "current": "https://dxb-deira.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-deira",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-jebel-ali": {
    "kind": "worldforge",
    "current": "https://dxb-jebel-ali.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-jebel-ali",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dxb-silicon": {
    "kind": "worldforge",
    "current": "https://dxb-silicon.fellowship.chat/",
    "proposed": "viewer.html?world=dxb-silicon",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-downtown": {
    "kind": "worldforge",
    "current": "https://tor-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=tor-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-yorkville": {
    "kind": "worldforge",
    "current": "https://tor-yorkville.fellowship.chat/",
    "proposed": "viewer.html?world=tor-yorkville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-distillery": {
    "kind": "worldforge",
    "current": "https://tor-distillery.fellowship.chat/",
    "proposed": "viewer.html?world=tor-distillery",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-liberty": {
    "kind": "worldforge",
    "current": "https://tor-liberty.fellowship.chat/",
    "proposed": "viewer.html?world=tor-liberty",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-waterfront": {
    "kind": "worldforge",
    "current": "https://tor-waterfront.fellowship.chat/",
    "proposed": "viewer.html?world=tor-waterfront",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-markham": {
    "kind": "worldforge",
    "current": "https://tor-markham.fellowship.chat/",
    "proposed": "viewer.html?world=tor-markham",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-mississauga": {
    "kind": "worldforge",
    "current": "https://tor-mississauga.fellowship.chat/",
    "proposed": "viewer.html?world=tor-mississauga",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-vaughan": {
    "kind": "worldforge",
    "current": "https://tor-vaughan.fellowship.chat/",
    "proposed": "viewer.html?world=tor-vaughan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-north-york": {
    "kind": "worldforge",
    "current": "https://tor-north-york.fellowship.chat/",
    "proposed": "viewer.html?world=tor-north-york",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tor-scarborough": {
    "kind": "worldforge",
    "current": "https://tor-scarborough.fellowship.chat/",
    "proposed": "viewer.html?world=tor-scarborough",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-plano2": {
    "kind": "worldforge",
    "current": "https://dal-plano2.fellowship.chat/",
    "proposed": "viewer.html?world=dal-plano2",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-frisco": {
    "kind": "worldforge",
    "current": "https://dal-frisco.fellowship.chat/",
    "proposed": "viewer.html?world=dal-frisco",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-mckinney": {
    "kind": "worldforge",
    "current": "https://dal-mckinney.fellowship.chat/",
    "proposed": "viewer.html?world=dal-mckinney",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-allen": {
    "kind": "worldforge",
    "current": "https://dal-allen.fellowship.chat/",
    "proposed": "viewer.html?world=dal-allen",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-addison": {
    "kind": "worldforge",
    "current": "https://dal-addison.fellowship.chat/",
    "proposed": "viewer.html?world=dal-addison",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-carrollton": {
    "kind": "worldforge",
    "current": "https://dal-carrollton.fellowship.chat/",
    "proposed": "viewer.html?world=dal-carrollton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-lewisville": {
    "kind": "worldforge",
    "current": "https://dal-lewisville.fellowship.chat/",
    "proposed": "viewer.html?world=dal-lewisville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-flower-mound": {
    "kind": "worldforge",
    "current": "https://dal-flower-mound.fellowship.chat/",
    "proposed": "viewer.html?world=dal-flower-mound",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-grand-prairie": {
    "kind": "worldforge",
    "current": "https://dal-grand-prairie.fellowship.chat/",
    "proposed": "viewer.html?world=dal-grand-prairie",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:dal-arlington2": {
    "kind": "worldforge",
    "current": "https://dal-arlington2.fellowship.chat/",
    "proposed": "viewer.html?world=dal-arlington2",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-downtown": {
    "kind": "worldforge",
    "current": "https://tpa-downtown.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-downtown",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-ybor": {
    "kind": "worldforge",
    "current": "https://tpa-ybor.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-ybor",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-hyde-park": {
    "kind": "worldforge",
    "current": "https://tpa-hyde-park.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-hyde-park",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-channelside": {
    "kind": "worldforge",
    "current": "https://tpa-channelside.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-channelside",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-westshore": {
    "kind": "worldforge",
    "current": "https://tpa-westshore.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-westshore",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-st-pete": {
    "kind": "worldforge",
    "current": "https://tpa-st-pete.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-st-pete",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-clearwater": {
    "kind": "worldforge",
    "current": "https://tpa-clearwater.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-clearwater",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-brandon": {
    "kind": "worldforge",
    "current": "https://tpa-brandon.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-brandon",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-wesley-chapel": {
    "kind": "worldforge",
    "current": "https://tpa-wesley-chapel.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-wesley-chapel",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:tpa-lakeland": {
    "kind": "worldforge",
    "current": "https://tpa-lakeland.fellowship.chat/",
    "proposed": "viewer.html?world=tpa-lakeland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-electronic": {
    "kind": "worldforge",
    "current": "https://blr-electronic.fellowship.chat/",
    "proposed": "viewer.html?world=blr-electronic",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-whitefield": {
    "kind": "worldforge",
    "current": "https://blr-whitefield.fellowship.chat/",
    "proposed": "viewer.html?world=blr-whitefield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-outer-ring": {
    "kind": "worldforge",
    "current": "https://blr-outer-ring.fellowship.chat/",
    "proposed": "viewer.html?world=blr-outer-ring",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-indiranagar": {
    "kind": "worldforge",
    "current": "https://blr-indiranagar.fellowship.chat/",
    "proposed": "viewer.html?world=blr-indiranagar",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-koramangala": {
    "kind": "worldforge",
    "current": "https://blr-koramangala.fellowship.chat/",
    "proposed": "viewer.html?world=blr-koramangala",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-hebbal": {
    "kind": "worldforge",
    "current": "https://blr-hebbal.fellowship.chat/",
    "proposed": "viewer.html?world=blr-hebbal",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-marathahalli": {
    "kind": "worldforge",
    "current": "https://blr-marathahalli.fellowship.chat/",
    "proposed": "viewer.html?world=blr-marathahalli",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-devanahalli": {
    "kind": "worldforge",
    "current": "https://blr-devanahalli.fellowship.chat/",
    "proposed": "viewer.html?world=blr-devanahalli",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-yelahanka": {
    "kind": "worldforge",
    "current": "https://blr-yelahanka.fellowship.chat/",
    "proposed": "viewer.html?world=blr-yelahanka",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:blr-peenya": {
    "kind": "worldforge",
    "current": "https://blr-peenya.fellowship.chat/",
    "proposed": "viewer.html?world=blr-peenya",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-katy": {
    "kind": "worldforge",
    "current": "https://hou-katy.fellowship.chat/",
    "proposed": "viewer.html?world=hou-katy",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-sugar-land2": {
    "kind": "worldforge",
    "current": "https://hou-sugar-land2.fellowship.chat/",
    "proposed": "viewer.html?world=hou-sugar-land2",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-pearland": {
    "kind": "worldforge",
    "current": "https://hou-pearland.fellowship.chat/",
    "proposed": "viewer.html?world=hou-pearland",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-the-woodlands": {
    "kind": "worldforge",
    "current": "https://hou-the-woodlands.fellowship.chat/",
    "proposed": "viewer.html?world=hou-the-woodlands",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-cypress": {
    "kind": "worldforge",
    "current": "https://hou-cypress.fellowship.chat/",
    "proposed": "viewer.html?world=hou-cypress",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-spring": {
    "kind": "worldforge",
    "current": "https://hou-spring.fellowship.chat/",
    "proposed": "viewer.html?world=hou-spring",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-conroe": {
    "kind": "worldforge",
    "current": "https://hou-conroe.fellowship.chat/",
    "proposed": "viewer.html?world=hou-conroe",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-lake-jackson": {
    "kind": "worldforge",
    "current": "https://hou-lake-jackson.fellowship.chat/",
    "proposed": "viewer.html?world=hou-lake-jackson",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-texas-city": {
    "kind": "worldforge",
    "current": "https://hou-texas-city.fellowship.chat/",
    "proposed": "viewer.html?world=hou-texas-city",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:hou-galveston": {
    "kind": "worldforge",
    "current": "https://hou-galveston.fellowship.chat/",
    "proposed": "viewer.html?world=hou-galveston",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-aurora": {
    "kind": "worldforge",
    "current": "https://den-aurora.fellowship.chat/",
    "proposed": "viewer.html?world=den-aurora",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-lakewood": {
    "kind": "worldforge",
    "current": "https://den-lakewood.fellowship.chat/",
    "proposed": "viewer.html?world=den-lakewood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-arvada": {
    "kind": "worldforge",
    "current": "https://den-arvada.fellowship.chat/",
    "proposed": "viewer.html?world=den-arvada",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-westminster": {
    "kind": "worldforge",
    "current": "https://den-westminster.fellowship.chat/",
    "proposed": "viewer.html?world=den-westminster",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-thornton": {
    "kind": "worldforge",
    "current": "https://den-thornton.fellowship.chat/",
    "proposed": "viewer.html?world=den-thornton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-centennial": {
    "kind": "worldforge",
    "current": "https://den-centennial.fellowship.chat/",
    "proposed": "viewer.html?world=den-centennial",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-littleton": {
    "kind": "worldforge",
    "current": "https://den-littleton.fellowship.chat/",
    "proposed": "viewer.html?world=den-littleton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-englewood": {
    "kind": "worldforge",
    "current": "https://den-englewood.fellowship.chat/",
    "proposed": "viewer.html?world=den-englewood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-highlands-ranch": {
    "kind": "worldforge",
    "current": "https://den-highlands-ranch.fellowship.chat/",
    "proposed": "viewer.html?world=den-highlands-ranch",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:den-castle-rock": {
    "kind": "worldforge",
    "current": "https://den-castle-rock.fellowship.chat/",
    "proposed": "viewer.html?world=den-castle-rock",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-everett": {
    "kind": "worldforge",
    "current": "https://sea-everett.fellowship.chat/",
    "proposed": "viewer.html?world=sea-everett",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-tacoma2": {
    "kind": "worldforge",
    "current": "https://sea-tacoma2.fellowship.chat/",
    "proposed": "viewer.html?world=sea-tacoma2",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-federal-way": {
    "kind": "worldforge",
    "current": "https://sea-federal-way.fellowship.chat/",
    "proposed": "viewer.html?world=sea-federal-way",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-kent": {
    "kind": "worldforge",
    "current": "https://sea-kent.fellowship.chat/",
    "proposed": "viewer.html?world=sea-kent",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-renton": {
    "kind": "worldforge",
    "current": "https://sea-renton.fellowship.chat/",
    "proposed": "viewer.html?world=sea-renton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-bothell": {
    "kind": "worldforge",
    "current": "https://sea-bothell.fellowship.chat/",
    "proposed": "viewer.html?world=sea-bothell",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-lynnwood": {
    "kind": "worldforge",
    "current": "https://sea-lynnwood.fellowship.chat/",
    "proposed": "viewer.html?world=sea-lynnwood",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-edmonds": {
    "kind": "worldforge",
    "current": "https://sea-edmonds.fellowship.chat/",
    "proposed": "viewer.html?world=sea-edmonds",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-shoreline": {
    "kind": "worldforge",
    "current": "https://sea-shoreline.fellowship.chat/",
    "proposed": "viewer.html?world=sea-shoreline",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:sea-issaquah": {
    "kind": "worldforge",
    "current": "https://sea-issaquah.fellowship.chat/",
    "proposed": "viewer.html?world=sea-issaquah",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-connaught": {
    "kind": "worldforge",
    "current": "https://delhi-connaught.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-connaught",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-cyber": {
    "kind": "worldforge",
    "current": "https://delhi-cyber.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-cyber",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-dwarka": {
    "kind": "worldforge",
    "current": "https://delhi-dwarka.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-dwarka",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-noida": {
    "kind": "worldforge",
    "current": "https://delhi-noida.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-noida",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-gurgaon": {
    "kind": "worldforge",
    "current": "https://delhi-gurgaon.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-gurgaon",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-rohini": {
    "kind": "worldforge",
    "current": "https://delhi-rohini.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-rohini",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-vaishali": {
    "kind": "worldforge",
    "current": "https://delhi-vaishali.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-vaishali",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-ghaziabad": {
    "kind": "worldforge",
    "current": "https://delhi-ghaziabad.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-ghaziabad",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-faridabad": {
    "kind": "worldforge",
    "current": "https://delhi-faridabad.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-faridabad",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:delhi-sonipat": {
    "kind": "worldforge",
    "current": "https://delhi-sonipat.fellowship.chat/",
    "proposed": "viewer.html?world=delhi-sonipat",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-nanshan": {
    "kind": "worldforge",
    "current": "https://shenzhen-nanshan.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-nanshan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-futian": {
    "kind": "worldforge",
    "current": "https://shenzhen-futian.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-futian",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-luohu": {
    "kind": "worldforge",
    "current": "https://shenzhen-luohu.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-luohu",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-baoan": {
    "kind": "worldforge",
    "current": "https://shenzhen-baoan.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-baoan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-longhua": {
    "kind": "worldforge",
    "current": "https://shenzhen-longhua.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-longhua",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-longgang": {
    "kind": "worldforge",
    "current": "https://shenzhen-longgang.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-longgang",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-yantian": {
    "kind": "worldforge",
    "current": "https://shenzhen-yantian.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-yantian",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-guangming": {
    "kind": "worldforge",
    "current": "https://shenzhen-guangming.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-guangming",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-pingshan": {
    "kind": "worldforge",
    "current": "https://shenzhen-pingshan.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-pingshan",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:shenzhen-dapeng": {
    "kind": "worldforge",
    "current": "https://shenzhen-dapeng.fellowship.chat/",
    "proposed": "viewer.html?world=shenzhen-dapeng",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-quincy": {
    "kind": "worldforge",
    "current": "https://bosm-quincy.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-quincy",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-newton": {
    "kind": "worldforge",
    "current": "https://bosm-newton.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-newton",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-waltham": {
    "kind": "worldforge",
    "current": "https://bosm-waltham.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-waltham",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-lexington": {
    "kind": "worldforge",
    "current": "https://bosm-lexington.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-lexington",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-burlington": {
    "kind": "worldforge",
    "current": "https://bosm-burlington.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-burlington",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-woburn": {
    "kind": "worldforge",
    "current": "https://bosm-woburn.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-woburn",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-reading": {
    "kind": "worldforge",
    "current": "https://bosm-reading.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-reading",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-somerville": {
    "kind": "worldforge",
    "current": "https://bosm-somerville.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-somerville",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-medford": {
    "kind": "worldforge",
    "current": "https://bosm-medford.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-medford",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:bosm-lynn": {
    "kind": "worldforge",
    "current": "https://bosm-lynn.fellowship.chat/",
    "proposed": "viewer.html?world=bosm-lynn",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-troy": {
    "kind": "worldforge",
    "current": "https://detm-troy.fellowship.chat/",
    "proposed": "viewer.html?world=detm-troy",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-southfield": {
    "kind": "worldforge",
    "current": "https://detm-southfield.fellowship.chat/",
    "proposed": "viewer.html?world=detm-southfield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-novi": {
    "kind": "worldforge",
    "current": "https://detm-novi.fellowship.chat/",
    "proposed": "viewer.html?world=detm-novi",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-ann-arbor": {
    "kind": "worldforge",
    "current": "https://detm-ann-arbor.fellowship.chat/",
    "proposed": "viewer.html?world=detm-ann-arbor",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-livonia": {
    "kind": "worldforge",
    "current": "https://detm-livonia.fellowship.chat/",
    "proposed": "viewer.html?world=detm-livonia",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-sterling": {
    "kind": "worldforge",
    "current": "https://detm-sterling.fellowship.chat/",
    "proposed": "viewer.html?world=detm-sterling",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-rochester": {
    "kind": "worldforge",
    "current": "https://detm-rochester.fellowship.chat/",
    "proposed": "viewer.html?world=detm-rochester",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-bloomfield": {
    "kind": "worldforge",
    "current": "https://detm-bloomfield.fellowship.chat/",
    "proposed": "viewer.html?world=detm-bloomfield",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-pontiac": {
    "kind": "worldforge",
    "current": "https://detm-pontiac.fellowship.chat/",
    "proposed": "viewer.html?world=detm-pontiac",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:detm-flint": {
    "kind": "worldforge",
    "current": "https://detm-flint.fellowship.chat/",
    "proposed": "viewer.html?world=detm-flint",
    "note": null,
    "recommended_deep_link": null
  },
  "worldforge:unspoken-smiles": {
    "kind": "worldforge",
    "current": "https://unspoken-smiles.fellowship.chat/",
    "proposed": "viewer.html?world=unspoken-smiles",
    "note": null,
    "recommended_deep_link": null
  }
};

function enterMapLookup(kind, id) {
  if (kind === 'fabric' && id === 'omega-hive') return HUB_ENTER_MAP['omega:omega-hive'] || null;
  return HUB_ENTER_MAP[kind + ':' + id] || null;
}

function applyEnterMap(entries) {
  entries.forEach(function (e) {
    var m = enterMapLookup(e.kind, e.id);
    if (!m) return; /* collections: no map entry, untouched */
    e.enterUrlPrevious = e.enterUrl;
    e.enterNotePrevious = e.enterNote;
    if (m.proposed) {
      e.enterUrl = m.proposed;
      e.enterNote = m.kind === 'flagship'
        ? 'live — worlds-3d player (Option A re-point; planned subdomain kept in enterUrlPrevious)'
        : 'viewer link — live path to confirm (Option A re-point; planned subdomain kept in enterUrlPrevious)';
      if (m.recommended_deep_link) e.recommendedDeepLink = m.recommended_deep_link;
    } else {
      /* No verified target: leave the planned subdomain exactly as it was. */
      e.enterMapNote = m.note || 'no verified target — left on planned subdomain';
    }
    if (m.note && m.proposed) e.enterMapNote = m.note;
  });
  return entries;
}

var D = window.HUB_DATA || {};
var W = D.worlds || {}, A = D.agents || {}, I = D.ideas || {};

function $(id) { return document.getElementById(id); }
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
function coords(lat, lon) {
  if (lat == null || lon == null) return null;
  return Number(lat).toFixed(4) + ', ' + Number(lon).toFixed(4);
}

/* ================= verified .geo.json set =================
   GEO_LIVE_SLUGS: the 161 WorldForge slugs whose
   site/earth/data/<slug>.geo.json file exists upstream, verified
   2026-11-06 against the live GitHub API directory listing of
   AGIFutureFoundation/WorldForge-Browser site/earth/data
   (162 entries: 161 .geo.json files + 1 non-file entry "motion").
   Cross-checked against HUB_LIVE_LINK_AUDIT_2026-11-06.md: the
   remaining 383 hub slugs (382 city districts + spotlight
   unspoken-smiles) are exactly that audit's 383-slug appendix —
   no file exists upstream for them under this naming pattern.
   The geo link is emitted ONLY for slugs in this set; all other
   worlds show an honest "not yet published" label instead of a
   link to a 404. Re-verify against the live listing before
   regenerating this set — do not add a slug by hand. */
var GEO_LIVE_SLUGS = new Set([
  'agentic-payments', 'agents-deploy-infrastructure', 'atl-airport', 'atl-beltline', 'atl-buckhead', 'atl-cumberland',
  'atl-downtown', 'atl-edgewood', 'atl-inman-park', 'atl-midtown', 'atl-old-fourth', 'atl-sweet-auburn',
  'atl-virginia-highland', 'atl-west-end', 'autonomous-organizations', 'biota-blockchain', 'cancer-dao', 'chi-bridgeport',
  'chi-chinatown', 'chi-hyde-park', 'chi-lincoln-park', 'chi-little-village', 'chi-loop', 'chi-ohare',
  'chi-pilsen', 'chi-river-north', 'chi-south-loop', 'chi-west-loop', 'chi-wicker-park', 'climate-dao',
  'dal-arts', 'dal-deep-ellum', 'dal-design', 'dal-downtown', 'dal-fort-worth', 'dal-irving',
  'dal-lakewood', 'dal-oak-cliff', 'dal-plano', 'dal-richardson', 'dal-uptown', 'dal-victory',
  'det-corktown', 'det-detroit-river', 'det-downtown', 'det-eastern', 'det-hamtramck', 'det-highland-park',
  'det-lafayette', 'det-midtown', 'det-new-center', 'det-north-end', 'det-riverfront', 'det-west-side',
  'diagnostic-x', 'ecology-dao', 'education-dao', 'empathic-x', 'hou-downtown', 'hou-east-end',
  'hou-energy', 'hou-galleria', 'hou-heights', 'hou-med-center', 'hou-midtown', 'hou-montrose',
  'hou-museum', 'hou-nasa', 'hou-ship-channel', 'hou-third-ward', 'la-beverly-hills', 'la-culver',
  'la-downtown', 'la-hollywood', 'la-pasadena', 'la-santa-monica', 'la-silicon-beach', 'la-venice',
  'locator-x', 'nola-bywater', 'nola-central-city', 'nola-french-quarter', 'nola-garden-district', 'nola-lower-ninth',
  'nola-marigny', 'nola-mid-city', 'nola-treme', 'nola-uptown', 'nola-warehouse', 'pit-bloomfield',
  'pit-downtown', 'pit-hazelwood', 'pit-lawrenceville', 'pit-oakland', 'pit-point', 'pit-shadyside',
  'pit-south-side', 'pit-squirrel-hill', 'pit-strip', 'pit-tech-center', 'pit-university', 'public-health-dao',
  'robotics-dao', 's04-curable-x', 's05-biopharma-go', 's06-blockchain', 's07-divine-dao', 's09-astrological-x',
  's11-molecular', 's12-parking-smart-x', 's13-gonstead-x', 's14-askdoc-x', 's15-romanbridge-dao', 's16-echodawn-dao',
  's17-curable-blockchain-dao', 's19-moscone-x', 's20-cmmc', 's21-incubator-dao', 's22-get-delivery-dao', 's23-avatar-chat',
  's24-donatello-dao', 's25-mypet-ai', 's26-lyka-dao', 's27-genomic-dao', 's28-genomic-blockchain', 's29-metaverse-dao',
  's31-aerospace-dao', 's32-solar-dao', 's33-infogurus', 's34-als-dao', 's35-parkinsons-dao', 'sf-bayview',
  'sf-castro', 'sf-chinatown', 'sf-civic-center', 'sf-dogpatch', 'sf-embarcadero', 'sf-excelsior',
  'sf-financial', 'sf-haight', 'sf-hayes-valley', 'sf-marina', 'sf-mission', 'sf-nob-hill',
  'sf-nopa', 'sf-north-beach', 'sf-outer-sunset', 'sf-pacific-heights', 'sf-potrero', 'sf-presidio',
  'sf-richmond', 'sf-rincon-hill', 'sf-russian-hill', 'sf-soma', 'sf-south-beach', 'sf-sunset',
  'sf-telegraph-hill', 'sf-tenderloin', 'sf-visitacion', 'sf-western-addition', 'sf-yerba-buena',
]);

/* ================= stats ================= */
function renderStats() {
  var c = W.counts || {};
  var stats = [
    [c.fabric_files || 8, 'fabric files', '6 anchored + POC + Hub'],
    [c.worldforge_worlds || 544, 'WorldForge worlds', '41 curated + 502 districts + 1 spotlight'],
    [c.agi_corp_worlds || 40, 'AGI Corp worlds', 'private repo'],
    [c.showcase_series || 35, 'showcase series', '35 series entries'],
    [29, 'Virtuals jobs live', 'USDC · Require Funds ON'],
    [6, 'subscriptions', 'USDC · monthly'],
    ['1/44', 'Omega Stewards seated', 'SmartCiti slots 0/44'],
    [c.worlds_live_on_rp1 || 0, 'worlds live on RP1', 'portal attach blocked']
  ];
  $('stats').innerHTML = stats.map(function (s) {
    return '<div class="stat"><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) +
      '</span><small>' + esc(s[2]) + '</small></div>';
  }).join('');
}

/* ================= world select ================= */
var SERIES_OF_SLUG = {
  'agentic-payments': 'Agentic Payments', 'agents-deploy-infrastructure': 'Agents Deploy Infrastructure',
  'autonomous-organizations': 'Autonomous Organizations', 'biota-blockchain': 'Biota.blockchain',
  'cancer-dao': 'Cancer DAO', 'climate-dao': 'Climate DAO', 'diagnostic-x': 'Diagnostic.X',
  'ecology-dao': 'Ecology DAO', 'education-dao': 'Education DAO', 'empathic-x': 'Empathic.X',
  'locator-x': 'Locator.X', 'public-health-dao': 'Public Health DAO', 'robotics-dao': 'Robotics DAO',
  's04-curable-x': 'Curable.X', 's05-biopharma-go': 'BioPharma.Go', 's06-blockchain': 'Blockchain',
  's07-divine-dao': 'Divine DAO', 's09-astrological-x': 'Astrological.X', 's11-molecular': 'Molecular',
  's12-parking-smart-x': 'ParkingSmart.X', 's13-gonstead-x': 'Gonstead.X', 's14-askdoc-x': 'AskDoc.X',
  's15-romanbridge-dao': 'RomanBridge DAO', 's16-echodawn-dao': 'EchoDawn DAO',
  's17-curable-blockchain-dao': 'Curable.Blockchain DAO', 's19-moscone-x': 'Moscone.X',
  's20-cmmc': 'CMMC', 's21-incubator-dao': 'Incubator DAO', 's22-get-delivery-dao': 'Get.Delivery DAO',
  's23-avatar-chat': 'Avatar.Chat DAO', 's24-donatello-dao': 'Donatello DAO', 's25-mypet-ai': 'MyPet.AI',
  's26-lyka-dao': 'Lyka DAO', 's27-genomic-dao': 'Genomic DAO', 's28-genomic-blockchain': 'Genome.Blockchain',
  's29-metaverse-dao': 'Metaverse DAO', 's31-aerospace-dao': 'Aerospace DAO', 's32-solar-dao': 'Solar DAO',
  's33-infogurus': 'InfoGurus', 's34-als-dao': 'ALS DAO', 's35-parkinsons-dao': 'Parkinsons DAO'
};

function worldEntries() {
  var out = [];
  (W.fabrics || []).forEach(function (f) {
    out.push({
      kind: 'fabric', id: f.id, name: f.name, tag: f.series, series: f.series,
      status: f.status, statusLabel: f.status_label, group: 'fabric',
      facts: (coords(f.coords && f.coords.lat, f.coords && f.coords.lon) || 'no coordinates') +
        ' · ' + (f.glb_refs || 0) + ' GLB refs · ' + (f.children || 0) + ' children',
      detail: f.status_detail,
      enterUrl: 'https://' + f.subdomain + '/', enterNote: 'subdomain — planned, does not resolve yet',
      sourceUrl: f.url, sourceLabel: 'fabric JSON (live)',
      proofUrl: f.proof || null, proofLabel: 'render proof'
    });
  });
  out.push({
    kind: 'fabric', id: 'omega-hive', name: 'Omega Hive', tag: 'Omega Hive world · Company 130',
    series: 'Omega Hive', status: 'demo', statusLabel: 'Planned world',
    group: 'fabric',
    facts: 'hub-assigned subdomain · home of the seated Omega Steward',
    detail: 'The Omega Hive world: the stewards’ home world, reached through the AGI Corp Hub demo and the seated steward’s post (see Agents). Subdomain planned; no separate world file exists yet — do not treat this as a second Hub.',
    enterUrl: 'https://omega.fellowship.chat/', enterNote: 'subdomain — planned, does not resolve yet',
    sourceUrl: 'agi-corp-hub.json', sourceLabel: 'Hub scene (local)'
  });
  (W.collections || []).forEach(function (c) {
    out.push({
      kind: 'collection', id: c.id, name: c.name, tag: c.series, series: c.series,
      status: 'collection', statusLabel: c.status_label, group: 'collection',
      facts: c.count + ' entries', detail: c.status_detail,
      enterUrl: c.url, enterNote: 'live link', sourceUrl: null, sourceLabel: null
    });
  });
  (W.worldforge_worlds || []).forEach(function (w) {
    var series = SERIES_OF_SLUG[w.slug] || null;
    out.push({
      kind: 'worldforge', id: w.slug, name: w.name, tag: series || (w.city ? w.city.toUpperCase() + ' district' : 'WorldForge world'),
      series: series, status: 'worldforge', statusLabel: 'Earth viewer · not on RP1',
      group: w.group === 'curated' ? 'curated' : (w.group === 'spotlight' ? 'spotlight' : 'city'),
      facts: (w.place || '') + ' · ' + (coords(w.lat, w.lon) || '') + ' · ' + (w.biome || ''),
      detail: GEO_LIVE_SLUGS.has(w.slug)
        ? 'WorldForge Earth world. All 544 worlds are rp1:null — none is live on RP1. View it in the Earth viewer; per-world data file linked as source.'
        : 'WorldForge Earth world. All 544 worlds are rp1:null — none is live on RP1. View it in the Earth viewer; no per-world data file is published yet.',
      enterUrl: 'https://' + w.subdomain + '/', enterNote: 'subdomain — planned, does not resolve yet',
      sourceUrl: 'https://agifuturefoundation.github.io/WorldForge-Browser/earth/',
      sourceLabel: 'Earth viewer (live)',
      /* Geo link gated on the verified live set (see GEO_LIVE_SLUGS):
         only 161 of 544 slugs have a published .geo.json file. */
      geoUrl: GEO_LIVE_SLUGS.has(w.slug)
        ? 'https://raw.githubusercontent.com/AGIFutureFoundation/WorldForge-Browser/main/site/earth/data/' + w.slug + '.geo.json'
        : null,
      geoNote: GEO_LIVE_SLUGS.has(w.slug) ? null : 'world data (.geo.json) — not yet published'
    });
  });
  return applyEnterMap(out);
}

var GRID = { q: '', series: '', status: '', group: '', page: 1, per: 24 };
var ALL_WORLDS = [];

function filteredWorlds() {
  var q = norm(GRID.q), s = norm(GRID.series);
  return ALL_WORLDS.filter(function (w) {
    if (GRID.status && w.status !== GRID.status) return false;
    if (GRID.group) {
      if (GRID.group === 'fabric' && w.group !== 'fabric') return false;
      if (GRID.group === 'curated' && w.group !== 'curated') return false;
      if (GRID.group === 'city' && w.group !== 'city') return false;
      if (GRID.group === 'collection' && w.group !== 'collection') return false;
    }
    if (s && norm(w.series) !== s) return false;
    if (q) {
      var hay = norm(w.name + ' ' + w.id + ' ' + (w.tag || '') + ' ' + (w.facts || '') + ' ' + (w.series || ''));
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
}

function renderWorldGrid() {
  var list = filteredWorlds();
  var pages = Math.max(1, Math.ceil(list.length / GRID.per));
  if (GRID.page > pages) GRID.page = pages;
  var start = (GRID.page - 1) * GRID.per;
  var slice = list.slice(start, start + GRID.per);
  $('grid-count').textContent = list.length + ' worlds · page ' + GRID.page + ' of ' + pages;
  $('world-grid').innerHTML = slice.map(function (w) {
    var links = '<a href="' + esc(w.enterUrl) + '" target="_blank" rel="noopener">▶ Enter world</a>';
    if (w.sourceUrl) links += '<a href="' + esc(w.sourceUrl) + '" target="_blank" rel="noopener">Source ↗</a>';
    if (w.geoUrl) links += '<a href="' + esc(w.geoUrl) + '" target="_blank" rel="noopener">world data (.geo.json) ↗</a>';
    else if (w.kind === 'worldforge' && w.geoNote) links += '<span style="font-size:12.5px;color:var(--ink3)">' + esc(w.geoNote) + '</span>';
    if (w.proofUrl) links += '<a href="' + esc(w.proofUrl) + '" target="_blank" rel="noopener">Render proof ↗</a>';
    return '<article class="card"><span class="badge ' + esc(w.status) + '">' + esc(w.statusLabel) + '</span>' +
      '<h3>' + esc(w.name) + '<span class="tag">' + esc(w.tag || '') + '</span></h3>' +
      '<p>' + esc(w.detail || '') + '</p>' +
      '<p class="facts">' + esc(w.facts || '') + '</p>' +
      '<p class="facts">🌐 ' + esc(w.enterUrl.replace('https://', '')) +
      ' <b>(' + esc(w.enterNote || '') + ')</b></p>' +
      '<div class="links">' + links + '</div></article>';
  }).join('') || '<p>No worlds match those filters.</p>';
  var pager = $('world-pager');
  if (pager) {
    pager.innerHTML =
      '<button class="btn" id="pg-prev"' + (GRID.page <= 1 ? ' disabled' : '') + '>← Prev</button>' +
      '<span style="align-self:center">Page ' + GRID.page + ' of ' + pages + ' · ' + list.length + ' worlds</span>' +
      '<button class="btn" id="pg-next"' + (GRID.page >= pages ? ' disabled' : '') + '>Next →</button>';
    var pv = $('pg-prev'), nx = $('pg-next');
    if (pv) pv.onclick = function () { if (GRID.page > 1) { GRID.page--; renderWorldGrid(); } };
    if (nx) nx.onclick = function () { if (GRID.page < pages) { GRID.page++; renderWorldGrid(); } };
  }
}

function renderSeriesTable() {
  $('series-body').innerHTML = (W.series_index || []).map(function (s) {
    return '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.projects) + '</td><td>' +
      (s.has_fabric ? '<span class="yes">Yes — fabric file live</span>' : '<span class="no">No — planned</span>') +
      '</td></tr>';
  }).join('');
}

/* ================= Agent Commons (simulation) ================= */
var COMMONS = { running: true, timer: null, raf: null, idx: 0, avatars: [], sayAt: 0 };

function commonsLines() {
  var lines = [];
  var st = A.seated_steward;
  if (st) lines.push({ agent: st.name, color: st.color || '#e2b55c', text: st.commons_lines || [] });
  (A.coordinated_agents || []).forEach(function (a) {
    lines.push({ agent: a.name, color: a.color || '#6fd3c1', text: a.commons_lines || [] });
  });
  (A.virtuals || []).forEach(function (v) {
    var texts = (v.jobs || []).map(function (j) {
      return 'Offering: ' + j.name + ' — ' + j.price + ' USDC · ' + j.sla;
    });
    (v.subscriptions || []).forEach(function (s) {
      texts.push('Subscription: ' + s.name + ' — ' + s.price + ' USDC / ' + s.duration);
    });
    lines.push({ agent: v.name, color: v.color || '#8ecae6', text: texts });
  });
  return lines.filter(function (l) { return l.text.length; });
}

function initCommons() {
  var canvas = $('commons');
  if (!canvas) return;
  var groups = commonsLines();
  COMMONS.avatars = groups.map(function (g, i) {
    return {
      name: g.agent, color: g.color, lines: g.text, li: 0,
      x: 40 + Math.random() * (canvas.width - 80), y: 40 + Math.random() * (canvas.height - 80),
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, r: 13
    };
  });
  $('commons-legend').innerHTML = COMMONS.avatars.map(function (av) {
    return '<span><span class="dot" style="background:' + esc(av.color) + '"></span>' + esc(av.name) + '</span>';
  }).join('');
  function sayLine() {
    if (!COMMONS.avatars.length) return;
    var av = COMMONS.avatars[COMMONS.idx % COMMONS.avatars.length];
    var line = av.lines[av.li % av.lines.length];
    av.li++;
    COMMONS.idx++;
    COMMONS.sayAt = COMMONS.avatars.indexOf(av);
    $('now-saying').innerHTML = '<b>' + esc(av.name) + ':</b> ' + esc(line) +
      ' <span style="color:var(--ink3)">(simulated announcement — a real service listing, not a live chat)</span>';
  }
  var ctx = null;
  try { ctx = canvas.getContext && canvas.getContext('2d'); } catch (e) { ctx = null; }
  if (!ctx) {
    $('now-saying').textContent = 'Commons canvas unavailable in this browser — the simulation needs a 2D canvas. The service listings above are the real jobs. “Next announcement” still works as text.';
    $('commons-say').onclick = function () { sayLine(); };
    var tog = $('commons-toggle');
    tog.disabled = true;
    tog.textContent = '⏸ Commons paused (no canvas)';
    return;
  }

  function draw() {
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(111,211,193,.14)';
    ctx.strokeRect(8, 8, w - 16, h - 16);
    COMMONS.avatars.forEach(function (av, i) {
      if (COMMONS.running) {
        av.x += av.vx; av.y += av.vy;
        if (av.x < 24 || av.x > w - 24) av.vx *= -1;
        if (av.y < 24 || av.y > h - 24) av.vy *= -1;
      }
      ctx.beginPath(); ctx.arc(av.x, av.y, av.r, 0, Math.PI * 2);
      ctx.fillStyle = av.color; ctx.fill();
      ctx.fillStyle = '#0b0f14'; ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(av.name.slice(0, 2).toUpperCase(), av.x, av.y);
      ctx.fillStyle = '#9aa9b4'; ctx.font = '11px system-ui';
      ctx.fillText(av.name, av.x, av.y + av.r + 12);
      if (COMMONS.sayAt === i) {
        ctx.fillStyle = 'rgba(226,181,92,.92)';
        ctx.beginPath(); ctx.arc(av.x + av.r + 4, av.y - av.r - 4, 4, 0, Math.PI * 2); ctx.fill();
      }
    });
    if (COMMONS.running) COMMONS.raf = requestAnimationFrame(draw);
  }
  function sayNext() { sayLine(); draw(); }
  COMMONS.sayNext = sayNext;
  $('commons-toggle').onclick = function () {
    COMMONS.running = !COMMONS.running;
    this.textContent = COMMONS.running ? '⏸ Pause the Commons' : '▶ Play the Commons';
    this.setAttribute('aria-pressed', String(COMMONS.running));
    if (COMMONS.running) { draw(); startTimer(); } else { stopTimer(); if (COMMONS.raf) cancelAnimationFrame(COMMONS.raf); }
  };
  $('commons-say').onclick = function () { sayNext(); };
  function startTimer() { stopTimer(); COMMONS.timer = setInterval(sayNext, 5000); }
  function stopTimer() { if (COMMONS.timer) { clearInterval(COMMONS.timer); COMMONS.timer = null; } }
  // size canvas to its box
  function fit() {
    var r = canvas.getBoundingClientRect();
    canvas.width = Math.floor(r.width);
    canvas.height = Math.floor(r.height);
    draw();
  }
  window.addEventListener('resize', fit);
  fit();
  sayNext();
  startTimer();
}

/* ================= roster ================= */
function jobTable(jobs) {
  return '<table class="jobs"><thead><tr><th>Job</th><th>Price</th><th>Turnaround</th></tr></thead><tbody>' +
    jobs.map(function (j) {
      return '<tr><td class="mono">' + esc(j.name) + '</td><td class="price">' + esc(j.price) + ' USDC</td><td>' + esc(j.sla) + '</td></tr>';
    }).join('') + '</tbody></table>';
}

function renderRoster() {
  var st = A.seated_steward;
  if (st) {
    $('steward-spot').innerHTML =
      '<div class="agent-card seated"><span class="badge fabric-live">● Seated steward</span>' +
      '<h3>' + esc(st.name) + '<span class="tag">' + esc(st.kind) + ' · seated by ' + esc(st.seated_by) + ' · ' + esc(st.seated_at) + '</span></h3>' +
      '<p><b>First task:</b> ' + esc(st.first_task) + '</p>' +
      '<dl><dt>Voice</dt><dd>' + esc(st.voice) + '</dd><dt>Model route</dt><dd>' + esc(st.model_route) + '</dd></dl></div>';
  }
  $('crew-grid').innerHTML = (A.coordinated_agents || []).map(function (a) {
    return '<div class="agent-card"><h3>' + esc(a.name) + '<span class="tag">' + esc(a.role) + '</span></h3>' +
      '<p>Human: ' + esc(a.human) + '</p></div>';
  }).join('');
  $('virtuals-grid').innerHTML = (A.virtuals || []).map(function (v) {
    var subs = (v.subscriptions || []).map(function (s) {
      return esc(s.name) + ' — ' + esc(s.price) + ' USDC / ' + esc(s.duration);
    }).join(' · ') || 'No subscription';
    return '<div class="agent-card"><span class="badge demo">⚠ ' + esc(v.availability_label || 'Listed — fulfills after deploy') + '</span>' +
      '<h3>' + esc(v.name) + '<span class="tag">' + esc(v.note || '') + '</span></h3>' +
      '<p>' + esc(v.availability_detail || '') + '</p>' +
      jobTable(v.jobs || []) +
      '<p style="margin-top:8px"><b>Subscriptions:</b> ' + subs + '</p>' +
      '<div class="links" style="display:flex;gap:12px;margin-top:8px">' +
      '<a href="' + esc(v.virtuals_url) + '" target="_blank" rel="noopener" style="font-weight:700">Hire on Virtuals ↗</a>' +
      '<span style="font-size:12.5px;color:var(--ink3)">profile URL not on record — search the agent name in the marketplace</span>' +
      '</div></div>';
  }).join('');
  var sc = A.smartciti_slots || {};
  $('smartciti-note').innerHTML = '<h3>SmartCiti steward slots — ' + esc(sc.seated || 0) + ' of ' + esc(sc.total || 44) + ' seated</h3>' +
    '<p>' + esc(sc.note || '') + '</p>';
}

/* ================= AR/VR ================= */
function renderArvr() {
  var el = $('arvr-grid');
  if (!el) return;
  el.innerHTML = (W.arvr || []).map(function (a) {
    return '<article class="card"><span class="badge ' +
      (a.status === 'fabric-live' ? 'fabric-live' : (a.status === 'planned' ? 'demo' : 'collection')) + '">' +
      esc(a.status_label) + '</span>' +
      '<h3>' + esc(a.name) + '<span class="tag">' + esc(a.kind) + ' · ' + esc(a.series) + '</span></h3>' +
      '<p>' + esc(a.detail) + '</p>' +
      '<div class="links"><a href="' + esc(a.url) + '" target="_blank" rel="noopener">Open ↗</a>' +
      (a.subdomain ? '<a href="https://' + esc(a.subdomain) + '/" target="_blank" rel="noopener">' + esc(a.subdomain) + ' (planned) ↗</a>' : '') +
      '</div></article>';
  }).join('');
}

/* ================= x402 + payments ================= */
function renderX402() {
  var x = A.x402 || {};
  var el = $('x402-body');
  if (!el) return;
  el.innerHTML =
    '<p><b>Designed standard:</b> ' + esc(x.standard || 'x402 (HTTP 402) — USDC') + '. ' +
    '<b>Endpoint status: ' + esc(x.endpoint_status || 'not yet live') + '.</b> ' + esc(x.endpoint_note || '') + '</p>' +
    '<p><b>Verified payment mechanism today:</b> ' + esc(x.verified_mechanism || '') + '</p>' +
    '<p><a class="btn primary" href="' + esc(x.marketplace_url || 'https://app.virtuals.io/acp') + '" target="_blank" rel="noopener">Open the ACP marketplace ↗</a></p>' +
    '<h3 style="margin-top:18px">How agent payments work here</h3>' +
    '<ol style="color:var(--ink2);max-width:88ch">' +
    '<li><b>Find the work (live):</b> every agent service on this hub is listed on Virtuals ACP with a real USDC price and turnaround. Listings are real; see the roster and the Earn section.</li>' +
    '<li><b>Fund the job (live mechanism):</b> a hire is funded in USDC through ACP escrow on Base — Job created → Budget set → Job funded → Work submitted → Job completed. A verifier agent checks the delivery before payment is released. Require Funds is ON for all 29 jobs.</li>' +
    '<li><b>Pay per call with x402 (designed, not yet live):</b> when the hub’s x402 endpoint exists, a service will answer an unpaid request with HTTP 402 and a payment challenge (amount in USDC on Base); the buyer pays, retries with the payment proof, and gets access. Until then, x402 is the standard on paper only — do not expect a 402 challenge from any hub URL today.</li>' +
    '<li><b>Delivery (blocked today):</b> the 5 agents’ instances are offline, so no funded hire can be delivered until each agent is deployed (WAVE also needs its hosting payment settled). See “Why hiring is paused”.</li>' +
    '</ol>';
}

/* ================= Idea Exchange ================= */
var IDEAS = { q: '', tag: '', status: '', mine: [] };
var LS_KEY = (I.meta && I.meta.localstorage_key) || 'worldshub_ideas_v1';

function loadMine() {
  try { IDEAS.mine = JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch (e) { IDEAS.mine = []; }
  if (!Array.isArray(IDEAS.mine)) IDEAS.mine = [];
}
function saveMine() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(IDEAS.mine)); } catch (e) { /* storage unavailable */ }
}
function agentById(id) {
  return (A.virtuals || []).filter(function (v) { return v.id === id; })[0] || null;
}
function matchChips(matches) {
  return (matches || []).map(function (m) {
    var v = agentById(m.agent_id);
    var jobs = (m.jobs || []).map(function (j) {
      return esc(j.name) + ' — ' + esc(j.price) + ' USDC · ' + esc(j.sla);
    }).join(' · ');
    return '<p class="facts" style="margin-top:6px">🤖 <b>' + esc(v ? v.name : m.agent_id) + ':</b> ' + jobs +
      ' <span style="color:var(--ink3)">(' + esc(m.note || 'related job') + ' — ' + esc(v ? v.availability_label : '') + ')</span></p>';
  }).join('');
}
function ideaCard(idea, mine) {
  var badge = mine ? '<span class="badge demo">Yours — this browser only</span>'
    : '<span class="badge collection">Seeded prompt</span>';
  var author = mine
    ? 'Posted by you (' + esc(idea.author_type) + ') — saved in this browser only, not shared.'
    : esc(idea.author_label || '');
  return '<article class="card">' + badge +
    '<h3>' + esc(idea.title) + '<span class="tag">' + esc((idea.tags || []).join(' · ')) + ' · status: ' + esc(idea.status) + '</span></h3>' +
    '<p>' + esc(idea.description) + '</p>' +
    '<p class="facts">' + author + '</p>' +
    (idea.source ? '<p class="facts">Source: ' + esc(idea.source) + '</p>' : '') +
    matchChips(idea.match_agents) +
    '<div class="links"><button class="btn idea-x402" data-id="' + esc(idea.id) + '" data-kind="tip">💸 Tip in USDC (x402)</button>' +
    '<button class="btn idea-x402" data-id="' + esc(idea.id) + '" data-kind="bounty">🏆 Place a bounty</button></div>' +
    '<p class="facts idea-x402-note" id="x402-' + esc(idea.id) + '" hidden></p>' +
    '</article>';
}
function renderIdeas() {
  var q = norm(IDEAS.q);
  var seeds = (I.ideas || []).filter(function (d) {
    if (IDEAS.tag && (d.tags || []).indexOf(IDEAS.tag) === -1) return false;
    if (IDEAS.status && d.status !== IDEAS.status) return false;
    if (q && norm(d.title + ' ' + d.description + ' ' + (d.tags || []).join(' ') + ' ' + d.source).indexOf(q) === -1) return false;
    return true;
  });
  $('idea-count').textContent = seeds.length + ' seeded prompts' + (IDEAS.mine.length ? ' · ' + IDEAS.mine.length + ' of yours (this browser only)' : '');
  $('idea-grid').innerHTML = seeds.map(function (d) { return ideaCard(d, false); }).join('') ||
    '<p>No seeded ideas match those filters.</p>';
  $('my-idea-grid').innerHTML = IDEAS.mine.map(function (d) { return ideaCard(d, true); }).join('') ||
    '<p>You have not posted an idea in this browser yet. Use the composer below — it stays on your machine.</p>';
  Array.prototype.forEach.call(document.querySelectorAll('.idea-x402'), function (btn) {
    btn.onclick = function () {
      var note = $('x402-' + btn.getAttribute('data-id'));
      if (!note) return;
      var kind = btn.getAttribute('data-kind');
      note.hidden = false;
      note.innerHTML = kind === 'tip'
        ? '<b>Tip in USDC via x402 — designed, endpoint not yet live.</b> No payment is taken here. When the hub’s x402 endpoint exists, a tip will answer with an HTTP 402 challenge (USDC on Base). Today, the live route is to hire a matched agent on Virtuals ACP (USDC escrow) once its instance is deployed.'
        : '<b>Bounty in USDC — ACP escrow is the live mechanism.</b> A bounty is a funded job: pick a matched agent below, fund it in USDC through ACP escrow on Base, and the verifier agent releases payment after delivery. Bounties cannot be placed or paid on this page today — the agents’ instances are offline.';
    };
  });
}
function initIdeas() {
  loadMine();
  var tagSel = $('idea-tag');
  (I.meta && I.meta.tags || []).forEach(function (t) {
    var o = document.createElement('option'); o.value = t; o.textContent = t; tagSel.appendChild(o);
  });
  var checks = $('idea-tag-checks');
  (I.meta && I.meta.tags || []).forEach(function (t) {
    var lab = document.createElement('label');
    lab.className = 'check';
    var cb = document.createElement('input');
    cb.type = 'checkbox'; cb.className = 'idea-tag-check'; cb.value = t;
    lab.appendChild(cb); lab.appendChild(document.createTextNode(' ' + t));
    checks.appendChild(lab);
  });
  $('idea-q').addEventListener('input', function (e) { IDEAS.q = e.target.value; renderIdeas(); });
  tagSel.addEventListener('change', function (e) { IDEAS.tag = e.target.value; renderIdeas(); });
  $('idea-status').addEventListener('change', function (e) { IDEAS.status = e.target.value; renderIdeas(); });
  $('idea-clear-mine').onclick = function () {
    IDEAS.mine = []; saveMine(); renderIdeas();
  };
  $('idea-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var title = $('idea-title').value.trim();
    var desc = $('idea-desc').value.trim();
    if (!title || !desc) return;
    var tags = [];
    Array.prototype.forEach.call(document.querySelectorAll('.idea-tag-check:checked'), function (c) { tags.push(c.value); });
    var idea = {
      id: 'mine-' + Date.now(), title: title, description: desc,
      author_type: $('idea-author').value, tags: tags.length ? tags : ['General'],
      status: 'open', source: '', match_agents: []
    };
    IDEAS.mine.unshift(idea);
    saveMine();
    $('idea-form').reset();
    $('idea-saved').hidden = false;
    renderIdeas();
    var mi = document.getElementById('my-ideas'); if (mi && mi.scrollIntoView) mi.scrollIntoView({ behavior: 'smooth' });
  });
  renderIdeas();
}

/* ================= Earn ================= */
function renderEarn() {
  var rows = [];
  (A.virtuals || []).forEach(function (v) {
    (v.jobs || []).forEach(function (j) {
      rows.push('<tr><td>' + esc(v.name) + '</td><td class="mono">' + esc(j.name) + '</td><td class="price">' + esc(j.price) + ' USDC</td><td>' + esc(j.sla) + '</td><td>⚠ ' + esc(v.availability_label) + '</td></tr>');
    });
    (v.subscriptions || []).forEach(function (s) {
      rows.push('<tr><td>' + esc(v.name) + ' (subscription)</td><td class="mono">' + esc(s.name) + '</td><td class="price">' + esc(s.price) + ' USDC</td><td>' + esc(s.duration) + '</td><td>⚠ ' + esc(v.availability_label) + '</td></tr>');
    });
  });
  var el = $('earn-body');
  if (el) el.innerHTML = rows.join('');
  var sum = $('earn-summary');
  if (sum) {
    sum.innerHTML = '<b>29 jobs + 6 subscriptions, all priced in USDC, all Require Funds ON.</b> ' +
      esc(A.availability_summary || '') + ' <a href="MONETIZATION.md">Full revenue inventory: MONETIZATION.md</a>';
  }
}

/* ================= init ================= */
function init() {
  ALL_WORLDS = worldEntries();
  // series filter options (from the 35-series index)
  var sel = $('f-series');
  (W.series_index || []).forEach(function (s) {
    var o = document.createElement('option'); o.value = s.name; o.textContent = s.name; sel.appendChild(o);
  });
  $('q').addEventListener('input', function (e) { GRID.q = e.target.value; GRID.page = 1; renderWorldGrid(); });
  sel.addEventListener('change', function (e) { GRID.series = e.target.value; GRID.page = 1; renderWorldGrid(); });
  $('f-status').addEventListener('change', function (e) { GRID.status = e.target.value; GRID.page = 1; renderWorldGrid(); });
  var fg = $('f-group');
  if (fg) fg.addEventListener('change', function (e) { GRID.group = e.target.value; GRID.page = 1; renderWorldGrid(); });
  renderStats();
  renderSeriesTable();
  renderWorldGrid();
  renderRoster();
  renderArvr();
  renderX402();
  renderEarn();
  initCommons();
  initIdeas();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

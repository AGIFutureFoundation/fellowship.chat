'use strict';
/* Worlds Hub — client logic. Data comes from window.HUB_DATA (hub-data.js),
   generated from worlds.json + agents.json + ideas.json. No backend, no fetch:
   the page works from local files (file://) and over HTTP. */
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
      detail: 'WorldForge Earth world. All 544 worlds are rp1:null — none is live on RP1. View it in the Earth viewer; per-world data file linked as source.',
      enterUrl: 'https://' + w.subdomain + '/', enterNote: 'subdomain — planned, does not resolve yet',
      sourceUrl: 'https://agifuturefoundation.github.io/WorldForge-Browser/earth/',
      sourceLabel: 'Earth viewer (live)',
      geoUrl: 'https://raw.githubusercontent.com/AGIFutureFoundation/WorldForge-Browser/main/site/earth/data/' + w.slug + '.geo.json'
    });
  });
  return out;
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
    canvas.width = Math.max(320, Math.floor(r.width));
    canvas.height = 420;
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

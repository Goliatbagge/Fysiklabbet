/* Kopplingsschema-editor (utkast/kopplingsschema.html)
 *
 * MODELLEN ÄR ETT SERIE/PARALLELL-TRÄD, INTE FRIA LEDNINGAR. Kretsen är en
 * sluten slinga med fyra sidor (top, right, bottom, left). Varje sida är en
 * serie av komponenter och parallellkopplingar, och varje parallellkoppling
 * har grenar som i sin tur är serier. Användaren ritar aldrig en ledning:
 * layouten räknas alltid fram ur trädet. Därför blir komponenterna jämnt
 * fördelade och centrerade på sin ledning av sig själva, med samma regel som
 * makeCircuit() i data/ovningar.js och "Kopplingsscheman: jämn fördelning
 * och centrering" i CLAUDE.md: lika stora mellanrum före första, mellan
 * varje par och efter sista komponenten på en sträcka mellan två noder.
 *
 * Ritningen går via en neutral displaylista (linjer, polygoner, cirklar,
 * text) med två utgångar: SVG för editorn och SVG-nedladdningen, och
 * Canvas2D för PNG-exporten. Canvasen ritar texten med sidans redan
 * laddade Poppins, så den kopierade bilden ser likadan ut som i editorn.
 *
 * Symbolerna följer svensk läroboksstandard och sajtens teorifigurer:
 * resistor som låda, lampa som cirkel med kryss, batteri med långt tunt
 * streck (pluspol) och kort tjockt streck (minuspol), mätare som cirkel med
 * bokstav. Beteckningar som är storheter (R, U, C, I) kursiveras, etiketter
 * som namnger objekt (L₁, A, V) står rakt. Index står alltid rakt.
 */
(function () {
'use strict';

/* ================= Grundmått ================= */
const INK = '#0f1620';
const BLUE = '#1d5fb8';
const ACCENT = '#c8324a';
const WIRE_W = 1.8;
const FONT_STACK = 'Poppins, "DM Sans", Arial, sans-serif';
const FS = 15, FS_SUB = 11, SUB_DY = 4;
const LH = 17, ASC = 11;                // etikettrutans höjd, versalhöjd
const GAP_H = 6, GAP_V = 8;             // symbol → etikett (vågrät / lodrät ledning)
const MIN_GAP = 28;                     // minsta ledningsbit mellan två symboler
const LABEL_CLEAR = 16;                 // minsta luft mellan två etiketter
const BRANCH_GAP = 16, BRANCH_MIN = 56; // parallellgrenarnas avstånd
const INNER_GAP = 34;
const MIN_W = 220, MIN_H = 130;
const ARROW_LEN = 10, ARROW_HW = 4.6;
const DOT_R = 2.8;
const SIDES = ['top', 'right', 'bottom', 'left'];
const ADJ = { top: ['left', 'right'], bottom: ['left', 'right'], left: ['top', 'bottom'], right: ['top', 'bottom'] };
// Exportstorlek i CSS-px per ritenhet. Mellan ger 12 px text (9 pt) och en
// resistor på knappt en centimeter, ungefär som i en lärobok.
const SIZES = { S: 0.65, M: 0.8, L: 1.05 };
const PNG_DENSITY = 3;                    // pixeltäthet i PNG:n (skärpa)
const STORE_KEY = 'fl-kopplingsschema-v1';
const USED_KEY = 'fl-kopplingsschema-anvand';

const TYPES = {
  battery:   { name: 'Batteri', group: 'kalla', len: 8, hl: 12, ho: 12, prefix: 'U', italic: true, unit: 'V', base: 'V', field: 'Spänning', ph: 'till exempel 12', polar: true, polarText: 'Vänd polerna' },
  ac:        { name: 'Växelspänning', long: 'Växelspänningskälla', group: 'kalla', len: 28, hl: 14, ho: 14, prefix: 'U', italic: true, unit: 'V', base: 'V', field: 'Spänning', ph: 'till exempel 230' },
  resistor:  { name: 'Resistor', group: 'komp', len: 42, hl: 7, ho: 7, prefix: 'R', italic: true, unit: 'Ω', base: 'Ω', field: 'Resistans', ph: 'till exempel 20' },
  varres:    { name: 'Variabel resistor', group: 'komp', len: 42, hl: 14, ho: 14, prefix: 'R', italic: true, unit: 'Ω', base: 'Ω', field: 'Resistans', ph: 'till exempel 50' },
  lamp:      { name: 'Lampa', group: 'komp', len: 24, hl: 12, ho: 12, prefix: 'L', italic: false, noSolo: true, unit: '', base: '', field: 'Märkning', ph: 'till exempel 6 V' },
  switch:    { name: 'Strömbrytare', group: 'komp', len: 24, hl: 13, ho: 3, prefix: '', italic: false },
  cap:       { name: 'Kondensator', group: 'komp', len: 8, hl: 13, ho: 13, prefix: 'C', italic: true, unit: 'µF', base: 'F', field: 'Kapacitans', ph: 'till exempel 100' },
  diode:     { name: 'Diod', group: 'komp', len: 16, hl: 9, ho: 9, prefix: '', italic: false, polar: true, polarText: 'Vänd riktning' },
  led:       { name: 'Lysdiod', group: 'komp', len: 16, hl: 20, ho: 9, prefix: '', italic: false, polar: true, polarText: 'Vänd riktning' },
  ammeter:   { name: 'Amperemeter', group: 'mat', len: 28, hl: 14, ho: 14, prefix: '', italic: false, unit: 'A', base: 'A', field: 'Avläsning', ph: 'till exempel 0,50' },
  voltmeter: { name: 'Voltmeter', group: 'mat', len: 28, hl: 14, ho: 14, prefix: '', italic: false, unit: 'V', base: 'V', field: 'Avläsning', ph: 'till exempel 4,5' },
};
const DEFAULT_OPTS = { names: true, values: true, arrows: false, arrowNames: true, arrowValues: true, arrowBlue: false, size: 'M', transparent: false };

/* ================= Små hjälpare ================= */
const clone = o => JSON.parse(JSON.stringify(o));
const rid = p => p + Math.random().toString(36).slice(2, 9);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r2 = v => Math.round(v * 100) / 100;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const toSub = s => String(s).replace(/[0-9]/g, d => SUBS[+d]);
const fromSub = s => String(s).replace(/[₀-₉]/g, ch => String(SUBS.indexOf(ch)));
const $ = s => document.querySelector(s);

function mkComp(type, extra) { return Object.assign({ id: rid('c'), kind: 'comp', type, name: '', value: '' }, extra || {}); }
function mkSeries(items, id) { return { id: id || rid('s'), kind: 'series', items: items || [] }; }
function mkPar(side, branches) { return { id: rid('p'), kind: 'par', side, branches: branches.map(b => mkSeries(b)) }; }
function newDoc(sides, opts) {
  const loop = {};
  for (const s of SIDES) loop[s] = mkSeries((sides && sides[s]) || [], 's-' + s);
  return { v: 1, loop, opts: Object.assign({}, DEFAULT_OPTS, opts || {}), arrowMain: {}, arrowCfg: {} };
}
function symExt(c) {
  const T = TYPES[c.type];
  if (c.type === 'switch' && c.closed) return { len: T.len, hl: 3, ho: 3 };
  return T;
}

/* ================= Trädet ================= */
// BEN: en parallellkoppling kan ha komponenter på de lodräta ledningsbitarna
// (benen) som leder ut till dess yttersta gren. P.legA är benet vid den
// första noden, P.legB vid den andra. Benen ligger alltid i serie med gren 0,
// som därför ritas ytterst när benen har komponenter (se branchOrder).
const LEGS = ['legA', 'legB'];
const hasLegs = P => !!(P.legA || P.legB);
function eachSeries(doc, fn) {
  const rec = (S, ctx) => {
    fn(S, ctx);
    S.items.forEach(it => {
      if (it.kind !== 'par') return;
      it.branches.forEach((b, k) => rec(b, { side: ctx.side, par: it, k }));
      for (const lk of LEGS) if (it[lk]) rec(it[lk], { side: ctx.side, par: null, k: -1, legOf: it, leg: lk });
    });
  };
  for (const s of SIDES) rec(doc.loop[s], { side: s, par: null, k: -1 });
}
function findSeries(doc, id) { let r = null; eachSeries(doc, S => { if (S.id === id) r = S; }); return r; }
function findItem(doc, id) {
  let r = null;
  eachSeries(doc, (S, ctx) => S.items.forEach((it, i) => { if (it.id === id) r = { series: S, index: i, item: it, ctx }; }));
  return r;
}
function allComps(doc) { const out = []; eachSeries(doc, S => S.items.forEach(it => { if (it.kind === 'comp') out.push(it); })); return out; }
function normSeries(S) {
  for (let i = 0; i < S.items.length; i++) {
    const it = S.items[i];
    if (it.kind !== 'par') continue;
    it.branches.forEach(normSeries);
    for (const lk of LEGS) if (it[lk]) { normSeries(it[lk]); if (!it[lk].items.length) delete it[lk]; }
    const legged = hasLegs(it);
    // Flyttades yttersta grenen till gren 0 när benet skapades: flytta tillbaka.
    if (!legged && it.legMoved) { it.branches.push(it.branches.shift()); delete it.legMoved; }
    // Gren 0 får vara tom om den har ben: då består grenen av benens komponenter.
    it.branches = it.branches.filter((b, k) => b.items.length || (k === 0 && legged));
    if (it.branches.length === 0) { S.items.splice(i, 1); i--; }
    else if (it.branches.length === 1) {
      const flat = [...(it.legA ? it.legA.items : []), ...it.branches[0].items, ...(it.legB ? it.legB.items : [])];
      S.items.splice(i, 1, ...flat); i--;
    }
  }
}
function normalize(doc) { for (const s of SIDES) normSeries(doc.loop[s]); return doc; }
function removeById(doc, id) {
  const f = findItem(doc, id);
  if (f) f.series.items.splice(f.index, 1);
  normalize(doc);
  return f ? f.item : null;
}
// Läsordning: överkanten vänster till höger, högersidan uppifrån, underkanten
// vänster till höger, vänstersidan uppifrån. Parallellgrenarna i tur och ordning.
function readingOrder(doc) {
  const out = [];
  const visit = (S, rev) => {
    const its = rev ? S.items.slice().reverse() : S.items;
    for (const it of its) {
      if (it.kind === 'comp') out.push(it);
      else { it.branches.forEach(b => visit(b, rev)); for (const lk of LEGS) if (it[lk]) visit(it[lk], rev); }
    }
  };
  visit(doc.loop.top, false); visit(doc.loop.right, false);
  visit(doc.loop.bottom, true); visit(doc.loop.left, true);
  return out;
}
// En ensam lampa behöver ingen beteckning, L₁ och L₂ gör det.
const sololess = p => Object.values(TYPES).some(T => T.prefix === p && T.noSolo);
function autoNames(doc) {
  const groups = {};
  for (const c of readingOrder(doc)) {
    const p = TYPES[c.type].prefix;
    if (!p || c.name) continue;
    (groups[p] = groups[p] || []).push(c);
  }
  const res = {};
  for (const p in groups) groups[p].forEach((c, i) => { if (groups[p].length > 1 || !sololess(p)) res[c.id] = { letter: p, idx: groups[p].length > 1 ? String(i + 1) : '' }; });
  return res;
}

/* ================= Etiketter ================= */
function parseName(s) {
  s = fromSub(String(s || '').trim()).replace(/[_{}]/g, '');
  if (!s) return null;
  const ch = [...s][0];
  return { letter: ch, idx: s.slice(ch.length) };
}
function nameRuns(nm, italic, runs) {
  runs.push({ s: nm.letter, it: italic && /[A-Za-zα-ωΑ-Ω]/.test(nm.letter) });
  if (nm.idx) runs.push({ s: nm.idx, sub: true });
}
function groupThousands(num) {
  const neg = num[0] === '−';
  const body = neg ? num.slice(1) : num;
  const [ip, fp] = body.split(',');
  const g = ip.length >= 4 ? ip.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ip;
  return (neg ? '−' : '') + g + (fp !== undefined ? ',' + fp : '');
}
// "20" → "20 Ω", "2.5" → "2,5 Ω", "20ohm" → "20 Ω", "1 k" → "1 kΩ", "?" → "?"
function formatValue(raw, unit, base) {
  let s = String(raw || '').trim();
  if (!s) return '';
  if (s === '?') return '?';
  s = s.replace(/\s*(k|M|m)?ohm\b/gi, (m0, p) => (p || '') + 'Ω').replace(/(\d)\s*u(?=[A-Za-zΩ]|$)/g, '$1µ');
  const m = s.match(/^([−-]?\d[\d\s ]*(?:[.,]\d+)?)\s*(.*)$/);
  if (!m) return s;
  let num = m[1].replace(/[\s ]/g, '').replace('.', ',').replace('-', '−');
  num = groupThousands(num);
  let rest = m[2].trim();
  if (!rest) rest = unit || '';
  else if (/^[kMmµnpG]$/.test(rest) && base) rest = rest + base;
  return rest ? num + ' ' + rest : num;
}
function compLabel(doc, c, auto) {
  if (c.hide) return null;
  const T = TYPES[c.type];
  const runs = [];
  if (doc.opts.names) {
    const nm = c.name ? parseName(c.name) : auto;
    if (nm) nameRuns(nm, T.italic, runs);
  }
  if (doc.opts.values) {
    const v = formatValue(c.value, T.unit, T.base);
    // En kursiv beteckning är en storhet (R₁ = 20 Ω). En rak beteckning
    // namnger ett objekt, och en lampa är inte "lika med" 6 V: L₁ (6 V).
    if (v && runs.length && !T.italic) runs.push({ s: ' (' + v + ')' });
    else if (v) { if (runs.length) runs.push({ s: ' = ' }); runs.push({ s: v }); }
  }
  return runs.length ? runs : null;
}
function arrowRuns(doc, name, value) {
  const runs = [];
  if (doc.opts.arrowNames) { const nm = parseName(name); if (nm) nameRuns(nm, true, runs); }
  if (doc.opts.arrowValues) {
    const v = formatValue(value, 'A', 'A');
    if (v) { if (runs.length) runs.push({ s: ' = ' }); runs.push({ s: v }); }
  }
  return runs.length ? runs : null;
}
const mctx = document.createElement('canvas').getContext('2d');
function runFont(r, size, weight) { return (r.it ? 'italic ' : '') + (weight || 400) + ' ' + (r.sub ? FS_SUB : (size || FS)) + 'px ' + FONT_STACK; }
function runsWidth(runs, size, weight) {
  let w = 0;
  for (const r of runs) { mctx.font = runFont(r, size, weight); w += mctx.measureText(r.s).width; }
  return w;
}

/* ================= Strömriktning ================= */
// Slingan genomlöps medurs (överkant åt höger, högersida nedåt, underkant åt
// vänster, vänstersida uppåt). Ett batteri med pluspolen framåt driver
// strömmen framåt. Har batterierna värden vägs de samman.
function mainDir(doc) {
  let sum = 0, first = 0;
  for (const s of SIDES) for (const it of doc.loop[s].items) {
    if (it.kind !== 'comp' || it.type !== 'battery') continue;
    const sg = it.flip ? -1 : 1;
    if (!first) first = sg;
    const v = parseFloat(String(it.value || '').replace(',', '.').replace('−', '-'));
    if (isFinite(v)) sum += sg * Math.abs(v);
  }
  return sum > 0 ? 1 : sum < 0 ? -1 : (first || 1);
}
function hasSource(doc) { return allComps(doc).some(c => c.type === 'battery' || c.type === 'ac'); }
// En serie som bara är en parallellkoppling över hela ledaren har ingen
// egen ledningsbit att sätta en pil på.
const soleFullPar = S => S.items.length === 1 && S.items[0].kind === 'par' && !!S.items[0].full;
function allowedArrowSides(stretched, doc) { return SIDES.filter(s => !stretched[s] && !(doc && soleFullPar(doc.loop[s]))); }
function defaultArrowSide(doc, allowed) {
  for (const s of ['left', 'right']) if (allowed.includes(s) && doc.loop[s].items.length === 0) return s;
  for (const s of allowed) if (doc.loop[s].items.some(it => it.kind === 'comp' && it.type === 'battery')) return s;
  return allowed[0];
}
function defaultMainGap(S, dir) {
  const i = S.items.findIndex(it => it.kind === 'comp' && it.type === 'battery');
  if (i >= 0) return dir > 0 ? i + 1 : i;   // strax efter batteriet, i strömmens riktning
  return Math.floor(S.items.length / 2);
}
function planArrows(doc, stretched, arrowIdx) {
  const plan = {};
  // Utan spänningskälla går det ingen ström, så då ritas inga pilar alls.
  if (!doc.opts.arrows || !hasSource(doc)) return plan;
  const dir = mainDir(doc);
  const allowed = allowedArrowSides(stretched, doc);
  const mc = doc.arrowMain || {};
  if (!mc.hidden && allowed.length) {
    const side = allowed.includes(mc.side) ? mc.side : defaultArrowSide(doc, allowed);
    const S = doc.loop[side], n = S.items.length;
    const gap = (mc.side === side && mc.gap != null) ? clamp(mc.gap, 0, n) : defaultMainGap(S, dir);
    plan[S.id] = { key: 'main', side, gap, dir: dir * (mc.flip ? -1 : 1), lflip: !!mc.lflip, auto: 'I', runs: arrowRuns(doc, mc.name || 'I', mc.value) };
  }
  let idx = 0;
  const visit = (S, rev) => {
    const its = rev ? S.items.slice().reverse() : S.items;
    for (const it of its) {
      if (it.kind !== 'par') continue;
      for (const b of it.branches) {
        const cf = doc.arrowCfg[b.id] || {};
        // En gren med bara en voltmeter leder (idealt) ingen ström, så den
        // får ingen pil förrän användaren själv ber om den.
        const voltOnly = b.items.every(x => x.kind === 'comp' && x.type === 'voltmeter');
        if (!soleFullPar(b) && !(cf.hidden != null ? cf.hidden : voltOnly)) {
          idx++;
          const n = b.items.length, nr = (arrowIdx && arrowIdx[b.id]) || idx;
          plan[b.id] = { key: b.id, gap: cf.gap != null ? clamp(cf.gap, 0, n) : (dir > 0 ? 0 : n), dir: dir * (cf.flip ? -1 : 1), lflip: !!cf.lflip, auto: 'I' + nr, runs: arrowRuns(doc, cf.name || ('I' + nr), cf.value) };
        }
        visit(b, rev);
      }
    }
  };
  visit(doc.loop.top, false); visit(doc.loop.right, false); visit(doc.loop.bottom, true); visit(doc.loop.left, true);
  return plan;
}

/* ================= Layout ================= */
// Grenarnas ordning utåt från ledningen. Har parallellkopplingen ben läggs
// gren 0 ytterst, eftersom benen ligger i serie med just den grenen. I en
// sträckt parallellkoppling (stegpinnar) ansluter slingan vid den sista
// grenen, så där är gren 0 redan ytterst.
function branchOrder(P, stretched) {
  const idx = P.branches.map((_, i) => i);
  if (!hasLegs(P) || stretched || idx.length < 2) return idx;
  return idx.slice(1).concat(0);
}
// Lokalt koordinatsystem per sida: u längs ledningen (i medurs riktning),
// v vinkelrätt, positivt UTÅT från slingan. L = +1/−1 anger åt vilket håll
// etiketterna i en serie hamnar.
// Numreringen (R₁, R₂ …, I₁, I₂ …) ska följa läsordningen på BILDEN:
// uppifrån och ned, vänster till höger. Positionerna finns först efter en
// layout, så vi lägger ut en gång med trädordningen, numrerar om efter
// geometrin och lägger ut igen om något ändrades.
function layout(doc) {
  const first = layoutPass(doc, null, null);
  const g = first.geo;
  const byPos = (a, b) => (Math.abs(a.y - b.y) > 14 ? a.y - b.y : a.x - b.x);
  const groups = {};
  for (const c of allComps(doc)) {
    const p = TYPES[c.type].prefix;
    if (!p || c.name || !g[c.id]) continue;
    (groups[p] = groups[p] || []).push({ id: c.id, x: g[c.id].x, y: g[c.id].y });
  }
  const auto = {};
  for (const p in groups) groups[p].sort(byPos).forEach((c, i, arr) => { if (arr.length > 1 || !sololess(p)) auto[c.id] = { letter: p, idx: arr.length > 1 ? String(i + 1) : '' }; });
  const arrs = Object.values(first.plan).filter(pl => pl.key !== 'main').map(pl => ({ id: pl.key, x: g['arr:' + pl.key].x, y: g['arr:' + pl.key].y }));
  const arrowIdx = {};
  arrs.sort(byPos).forEach((a, i) => { arrowIdx[a.id] = i + 1; });
  const same = JSON.stringify(auto) === JSON.stringify(first.auto) && arrs.every(a => first.plan[a.id].auto === 'I' + arrowIdx[a.id]);
  return same ? first : layoutPass(doc, auto, arrowIdx);
}
function layoutPass(doc, autoIn, arrowIdx) {
  const M = {}, geo = {}, lab = {};
  const auto = autoIn || autoNames(doc);
  for (const c of allComps(doc)) {
    const runs = compLabel(doc, c, auto[c.id]);
    lab[c.id] = runs ? { runs, tw: runsWidth(runs) } : null;
  }
  // En sida som BARA är en parallellkoppling, med tomma grannsidor, sträcks
  // ut så att förgreningsnoderna ligger i hörnen: grenarna blir stegpinnar
  // mellan sidoledningarna, precis som i läroböckernas parallellkretsar.
  // Grannsidorna får gärna ha komponenter: de läggs på biten av
  // sidoledningen nedanför (innanför) den sista stegpinnen, så att bilden
  // behåller sin form när man släpper något där. Två grannsidor kan inte
  // båda vara sträckta; överkant och underkant går före.
  const stretched = {};
  for (const s of ['top', 'bottom', 'left', 'right']) {
    const it = doc.loop[s].items;
    stretched[s] = it.length === 1 && it[0].kind === 'par' && it[0].side !== 'out' && !ADJ[s].some(a => stretched[a]);
  }
  const plan = planArrows(doc, stretched, arrowIdx);
  const stretchedPar = new Set(SIDES.filter(x => stretched[x]).map(x => doc.loop[x].items[0].id));
  const parInfo = {};

  function mComp(c, L, vert) {
    const e = symExt(c), lb = lab[c.id];
    let ext = 0, oh = 0;
    if (lb) {
      if (!vert) { ext = GAP_H + LH; oh = Math.max(0, lb.tw / 2 - e.len / 2); }
      else { ext = GAP_V + lb.tw; oh = Math.max(0, LH / 2 - e.len / 2); }
    }
    const side = e.hl + ext, other = e.ho;
    return (M[c.id] = { len: e.len, pos: L > 0 ? side : other, neg: L > 0 ? other : side, ohS: oh, ohE: oh });
  }
  function mSeries(S, L, vert) {
    const ms = S.items.map(it => it.kind === 'par' ? mPar(it, L, vert) : mComp(it, L, vert));
    const ar = plan[S.id], n = ms.length;
    const atw = ar && ar.runs ? runsWidth(ar.runs) : 0;
    // JÄMN FÖRDELNING: alla mellanrum i serien är lika stora, så det största
    // kravet (etiketter som inte får krocka, strömpilens text) bestämmer.
    let g = MIN_GAP;
    for (let i = 0; i <= n; i++) {
      const a = ms[i - 1], b = ms[i];
      const oa = a ? a.ohE : 0, ob = b ? b.ohS : 0;
      g = Math.max(g, oa + ob + LABEL_CLEAR);
      if (ar && ar.gap === i) {
        const need = !ar.runs ? ARROW_LEN + 28
          : (vert ? LH : atw) + ARROW_LEN + 2 * LABEL_CLEAR + 2 * Math.max(oa, ob);
        g = Math.max(g, need);
      }
    }
    let pos = 0, neg = 0;
    for (const m of ms) { pos = Math.max(pos, m.pos); neg = Math.max(neg, m.neg); }
    if (ar) {
      const La = ar.lflip ? -L : L;
      const side = ARROW_HW + (ar.runs ? (vert ? GAP_V + atw : GAP_H + LH) : 0);
      pos = Math.max(pos, La > 0 ? side : ARROW_HW);
      neg = Math.max(neg, La > 0 ? ARROW_HW : side);
    }
    const len = ms.reduce((s, m) => s + m.len, 0) + (n + 1) * g;
    return (M[S.id] = { len, pos, neg, ohS: 0, ohE: 0, g, ms });
  }
  function mPar(P, L, vert) {
    const s = P.side === 'out' ? L : -L;   // grenarnas staplingsriktning i v
    const str = stretchedPar.has(P.id);
    const order = branchOrder(P, str);
    const bm = order.map((bi, j) => mSeries(P.branches[bi], j === 0 ? -s : s, vert));
    const len = Math.max(64, ...bm.map(m => m.len));
    // Benen mäts som egna serier längs v. Sträckan mellan gren 0 och dess
    // granne måste rymma dem, och deras etiketter sticker ut utanför noderna.
    const legged = hasLegs(P);
    const la = P.legA ? mSeries(P.legA, 1, !vert) : null;
    const lb = P.legB ? mSeries(P.legB, 1, !vert) : null;
    const legNeed = Math.max(la ? la.len : 0, lb ? lb.len : 0);
    const segJ = legged ? (str ? 1 : order.length - 1) : -1;
    const offs = [0];
    for (let j = 1; j < bm.length; j++) {
      const prevExt = s > 0 ? bm[j - 1].pos : bm[j - 1].neg;
      const curExt = s > 0 ? bm[j].neg : bm[j].pos;
      let d = Math.max(BRANCH_MIN, prevExt + curExt + BRANCH_GAP);
      if (j === segJ) d = Math.max(d, legNeed);
      offs.push(offs[j - 1] + s * d);
    }
    const last = bm.length - 1;
    const far = Math.abs(offs[last]) + (s > 0 ? bm[last].pos : bm[last].neg);
    const near = s > 0 ? bm[0].neg : bm[0].pos;
    return (M[P.id] = { len, pos: s > 0 ? far : near, neg: s > 0 ? near : far, ohS: la ? la.pos : 0, ohE: lb ? lb.pos : 0, offs, s, order });
  }

  const vertOf = s => s === 'left' || s === 'right';
  const sm = {};
  for (const s of SIDES) {
    sm[s] = mSeries(doc.loop[s], 1, vertOf(s));
    if (stretched[s]) sm[s].len = M[doc.loop[s].items[0].id].len;
  }
  // Hur långt en sträckt parallellkoppling tar av grannsidornas ledning.
  const trim = x => {
    if (!stretched[x]) return 0;
    const m = M[doc.loop[x].items[0].id];
    return Math.abs(m.offs[m.offs.length - 1]);
  };
  let W = Math.max(sm.top.len, sm.bottom.len, sm.left.neg + sm.right.neg + INNER_GAP, MIN_W,
    trim('left') + trim('right') + Math.max(stretched.top ? 0 : sm.top.len, stretched.bottom ? 0 : sm.bottom.len));
  let H = Math.max(sm.left.len, sm.right.len, sm.top.neg + sm.bottom.neg + INNER_GAP, MIN_H,
    trim('top') + trim('bottom') + Math.max(stretched.left ? 0 : sm.left.len, stretched.right ? 0 : sm.right.len));
  W = Math.max(W, H * 1.15);
  H = Math.max(H, W * 0.5);
  W = Math.round(W); H = Math.round(H);

  const F = {
    top:    { sx: 0, sy: 0, dx: 1,  dy: 0,  ox: 0,  oy: -1, len: W },
    right:  { sx: W, sy: 0, dx: 0,  dy: 1,  ox: 1,  oy: 0,  len: H },
    bottom: { sx: W, sy: H, dx: -1, dy: 0,  ox: 0,  oy: 1,  len: W },
    left:   { sx: 0, sy: H, dx: 0,  dy: -1, ox: -1, oy: 0,  len: H },
  };
  const info = { series: [], comps: [], pars: [] };
  const P = (f, u, v) => [f.sx + f.dx * u + f.ox * v, f.sy + f.dy * u + f.oy * v];
  const angOf = (f, sg) => Math.round(Math.atan2(f.dy * sg, f.dx * sg) * 180 / Math.PI);

  function pSeries(S, f, u1, u2, v, L, ctx, stretch) {
    const m = M[S.id];
    const a = P(f, u1, v), b = P(f, u2, v);
    geo[S.id] = { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
    const si = { S, L, f, v, vert: f.dx === 0, ctx, gaps: [] };
    info.series.push(si);
    if (stretch) { pPar(S.items[0], f, u1, u2, v, L, true); return; }
    if (soleFullPar(S)) { pPar(S.items[0], f, u1, u2, v, L, false); return; }
    const n = S.items.length;
    const sum = m.ms.reduce((s, x) => s + x.len, 0);
    const g = (u2 - u1 - sum) / (n + 1);
    const gapsU = [];
    let u = u1;
    S.items.forEach((it, i) => {
      gapsU.push([u, u + g]); u += g;
      const len = m.ms[i].len;
      if (it.kind === 'comp') {
        const c = P(f, u + len / 2, v);
        geo[it.id] = { x: c[0], y: c[1], ang: angOf(f, 1), lsx: f.ox * L, lsy: f.oy * L, op: 1 };
        info.comps.push({ c: it, S, i, par: ctx.par, k: ctx.k, j: ctx.j, L, f });
      } else pPar(it, f, u, u + len, v, L, false);
      u += len;
    });
    gapsU.push([u, u2]);
    si.gaps = gapsU.map(([p, q]) => [P(f, p, v), P(f, q, v)]);
    const ar = plan[S.id];
    if (ar) {
      const [p, q] = gapsU[ar.gap];
      const c = P(f, (p + q) / 2, v);
      const La = ar.lflip ? -L : L;
      geo['arr:' + S.id] = { x: c[0], y: c[1], ang: angOf(f, ar.dir), lsx: f.ox * La, lsy: f.oy * La, op: 1 };
    }
  }
  function pPar(Pp, f, u1, u2, v, L, str) {
    const m = M[Pp.id], order = m.order, n = order.length;
    const a = P(f, u1, v), b = P(f, u2, v);
    geo[Pp.id] = { n1x: a[0], n1y: a[1], n2x: b[0], n2y: b[1] };
    // Benets sträcka: mellan gren 0 (ytterst) och grannen innanför.
    const far = str ? 0 : n - 1, near = str ? 1 : n - 2;
    const legged = hasLegs(Pp);
    parInfo[Pp.id] = { order, legged, stretched: !!str, far, near };
    info.pars.push({ P: Pp, f, s: m.s, L, v });
    order.forEach((bi, j) => pSeries(Pp.branches[bi], f, u1, u2, v + m.offs[j], j === 0 ? -m.s : m.s, { par: Pp, k: bi, j }, false));
    if (legged && n >= 2) {
      const vF = v + m.offs[far], vN = v + m.offs[near], sg = Math.sign(vF - vN) || 1, segLen = Math.abs(vF - vN);
      const ddx = f.ox * sg, ddy = f.oy * sg;
      const pa = P(f, u1, vN), pb = P(f, u2, vF);
      const FA = { sx: pa[0], sy: pa[1], dx: ddx, dy: ddy, ox: -f.dx, oy: -f.dy };
      const FB = { sx: pb[0], sy: pb[1], dx: -ddx, dy: -ddy, ox: f.dx, oy: f.dy };
      if (Pp.legA) pSeries(Pp.legA, FA, 0, segLen, 0, 1, { side: null, par: null, k: -1, legOf: Pp }, false);
      if (Pp.legB) pSeries(Pp.legB, FB, 0, segLen, 0, 1, { side: null, par: null, k: -1, legOf: Pp }, false);
    }
  }
  // Intill en sträckt parallellkoppling ansluter sidoledningen vid den
  // närmaste stegpinnen, inte i hörnet. Ledningsbiten ovanför hör till
  // parallellkopplingen, och där kan dess ben ha komponenter.
  const TOUCH = { left: { bottom: 'start', top: 'end' }, right: { top: 'start', bottom: 'end' }, top: { left: 'start', right: 'end' }, bottom: { right: 'start', left: 'end' } };
  for (const s of SIDES) {
    let u1 = 0, u2 = F[s].len;
    for (const a of ADJ[s]) {
      if (!stretched[a]) continue;
      const m = M[doc.loop[a].items[0].id], trim = Math.abs(m.offs[m.offs.length - 1]);
      if (TOUCH[s][a] === 'start') u1 = trim; else u2 = F[s].len - trim;
    }
    pSeries(doc.loop[s], F[s], u1, Math.max(u1, u2), 0, 1, { side: s, par: null, k: -1 }, stretched[s]);
  }

  return { geo, M, lab, plan, info, auto, W, H, stretched, parInfo };
}

/* ================= Symboler ================= */
// Lokala koordinater: lx längs ledningen, ly vinkelrätt där NEGATIVT ly är
// etikettsidan. Allt räknas om till absoluta koordinater direkt, så
// displaylistan innehåller bara enkel geometri (inga transformer).
function symbolPrims(c, g, col, op, out) {
  const a = g.ang * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a);
  let nx = -dy, ny = dx;
  if (nx * g.lsx + ny * g.lsy > 0) { nx = -nx; ny = -ny; }
  const T = TYPES[c.type];
  const f = (T.polar && c.flip) ? -1 : 1;
  const M = (lx, ly) => [g.x + dx * lx * f + nx * ly, g.y + dy * lx * f + ny * ly];
  const line = (p, q, w, cap) => out.push({ t: 'line', x1: p[0], y1: p[1], x2: q[0], y2: q[1], w: w || WIRE_W, c: col, cap: cap || 'butt', op });
  const poly = (pts, fill, stroke, w) => out.push({ t: 'poly', pts, fill, stroke, w: w || WIRE_W, op });
  const circ = (r, fill) => out.push({ t: 'circle', cx: g.x, cy: g.y, r, fill: fill || 'none', stroke: col, w: WIRE_W, op });
  const dot = (p, r) => out.push({ t: 'circle', cx: p[0], cy: p[1], r, fill: col, stroke: 'none', op });
  const arrowLine = (p, q) => {
    const vx = q[0] - p[0], vy = q[1] - p[1], L = Math.hypot(vx, vy), ux = vx / L, uy = vy / L;
    const bx = q[0] - ux * 5.5, by = q[1] - uy * 5.5;
    line(p, [bx, by], 1.4);
    poly([q, [bx - uy * 2.8, by + ux * 2.8], [bx + uy * 2.8, by - ux * 2.8]], col, 'none');
  };
  const box = () => poly([M(-21, -7), M(21, -7), M(21, 7), M(-21, 7)], 'none', col);
  switch (c.type) {
    case 'resistor': box(); break;
    case 'varres': box(); arrowLine(M(-15, 12), M(16, -14)); break;
    case 'lamp': {
      circ(12);
      const d = 12 * 0.7071;
      line(M(-d, -d), M(d, d)); line(M(-d, d), M(d, -d));
      break;
    }
    case 'battery':   // långt tunt streck = pluspol, kort tjockt = minuspol
      line(M(4, -12), M(4, 12), 1.8);
      line(M(-4, -6.5), M(-4, 6.5), 3.6);
      break;
    case 'cap':
      line(M(-4, -13), M(-4, 13), 2.6);
      line(M(4, -13), M(4, 13), 2.6);
      break;
    case 'ac':
      circ(14);
      out.push({ t: 'path', d: `M ${r2(g.x - 8)} ${r2(g.y)} q 4 -7.5 8 0 q 4 7.5 8 0`, fill: 'none', stroke: col, w: WIRE_W, op, bb: [g.x - 9, g.y - 5, g.x + 9, g.y + 5] });
      break;
    case 'ammeter': case 'voltmeter': {
      circ(14);
      const runs = [{ s: c.type === 'ammeter' ? 'A' : 'V' }];
      out.push({ t: 'text', x: g.x, y: g.y + 5.4, anchor: 'middle', runs, tw: runsWidth(runs, 15, 600), size: 15, weight: 600, c: col, op });
      break;
    }
    case 'switch':
      dot(M(-12, 0), 2.3); dot(M(12, 0), 2.3);
      if (c.closed) line(M(-12, 0), M(12, 0), WIRE_W, 'round');
      else line(M(-12, 0), M(10.5, -12.5), WIRE_W, 'round');
      break;
    case 'diode': case 'led':
      poly([M(-8, -8), M(-8, 8), M(8, 0)], col, col, 1.2);
      line(M(8, -8.5), M(8, 8.5), 2.2);
      if (c.type === 'led') { arrowLine(M(-3, -11), M(3, -19)); arrowLine(M(3, -9), M(9, -17)); }
      break;
  }
}

/* ================= Displaylista ================= */
function textBox(t) {
  const w = t.tw;
  const x0 = t.anchor === 'middle' ? t.x - w / 2 : t.anchor === 'end' ? t.x - w : t.x;
  const sub = t.runs.some(r => r.sub);
  return [x0, t.y - ASC - 1.5, x0 + w, t.y + (sub ? SUB_DY + 2.5 : 3.5)];
}
function primBox(p) {
  switch (p.t) {
    case 'line': { const h = p.w / 2; return [Math.min(p.x1, p.x2) - h, Math.min(p.y1, p.y2) - h, Math.max(p.x1, p.x2) + h, Math.max(p.y1, p.y2) + h]; }
    case 'poly': { const h = p.stroke && p.stroke !== 'none' ? p.w / 2 : 0; const xs = p.pts.map(q => q[0]), ys = p.pts.map(q => q[1]); return [Math.min(...xs) - h, Math.min(...ys) - h, Math.max(...xs) + h, Math.max(...ys) + h]; }
    case 'circle': { const r = p.r + (p.stroke && p.stroke !== 'none' ? p.w / 2 : 0); return [p.cx - r, p.cy - r, p.cx + r, p.cy + r]; }
    case 'path': return p.bb;
    case 'text': return textBox(p);
  }
  return null;
}
const union = (a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])];
function bboxOf(prims) {
  let bb = null;
  for (const p of prims) { const b = primBox(p); if (b) bb = bb ? union(bb, b) : b; }
  return bb || [0, 0, 1, 1];
}
function labelPrim(x, y, ang, lsx, lsy, hl, lb, c, op) {
  const horiz = Math.abs(Math.cos(ang * Math.PI / 180)) > 0.5;
  if (horiz) {
    const up = lsy < 0;
    return { t: 'text', x, y: up ? y - hl - GAP_H - (LH - ASC) : y + hl + GAP_H + ASC, anchor: 'middle', runs: lb.runs, tw: lb.tw, c, op };
  }
  const right = lsx > 0;
  return { t: 'text', x: right ? x + hl + GAP_V : x - hl - GAP_V, y: y + ASC / 2, anchor: right ? 'start' : 'end', runs: lb.runs, tw: lb.tw, c, op };
}
// Knutpunkter: där minst tre ledningsriktningar möts ritas en prick.
// Räknas geometriskt ur de faktiska ledningarna, så även sidoledningar som
// delas med parallellgrenarna (stegpinnar) får prickar på rätt ställen.
function junctions(lines) {
  const near = (p, q) => Math.abs(p[0] - q[0]) < 0.6 && Math.abs(p[1] - q[1]) < 0.6;
  const dkey = (from, to) => { const dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy) || 1; return Math.round(dx / L * 8) + ',' + Math.round(dy / L * 8); };
  const onSeg = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
    if (L2 < 1e-6) return false;
    const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2;
    if (t <= 0.001 || t >= 0.999) return false;
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy)) < 0.6;
  };
  const out = [], seen = new Set();
  for (const l of lines) for (const p of [[l.x1, l.y1], [l.x2, l.y2]]) {
    const key = Math.round(p[0] * 2) + ',' + Math.round(p[1] * 2);
    if (seen.has(key)) continue;
    seen.add(key);
    const dirs = new Set();
    for (const m of lines) {
      const a = [m.x1, m.y1], b = [m.x2, m.y2];
      if (near(p, a)) dirs.add(dkey(a, b));
      else if (near(p, b)) dirs.add(dkey(b, a));
      else if (onSeg(p, a, b)) { dirs.add(dkey(p, a)); dirs.add(dkey(p, b)); }
    }
    if (dirs.size >= 3) out.push(p);
  }
  return out;
}
function buildDisplay(doc, geo, lay, o) {
  o = o || {};
  const ink = o.ink || INK;
  const wires = [], sym = [], txt = [], hits = [];
  const colOf = id => (o.accent && id === o.accent) ? ACCENT : ink;
  function ends(it) {
    const g = geo[it.id];
    if (!g) return null;
    if (it.kind === 'par') return [[g.n1x, g.n1y], [g.n2x, g.n2y]];
    const e = symExt(it), a = g.ang * Math.PI / 180, hx = Math.cos(a) * e.len / 2, hy = Math.sin(a) * e.len / 2;
    return [[g.x - hx, g.y - hy], [g.x + hx, g.y + hy]];
  }
  function dSeries(S) {
    const g = geo[S.id];
    if (!g) return;
    let prev = [g.x1, g.y1];
    for (const it of S.items) {
      const e = ends(it);
      if (!e) continue;
      wires.push([prev, e[0]]); prev = e[1];
      if (it.kind === 'par') dPar(it); else dComp(it);
    }
    wires.push([prev, [g.x2, g.y2]]);
    const ag = geo['arr:' + S.id];
    if (ag && lay.plan[S.id]) dArrow(ag, lay.plan[S.id]);
  }
  function dPar(Pp) {
    const g = geo[Pp.id], pi = lay.parInfo && lay.parInfo[Pp.id];
    Pp.branches.forEach(dSeries);
    const order = pi ? pi.order : Pp.branches.map((_, i) => i), n = order.length;
    const G = j => geo[Pp.branches[order[j]].id];
    if (!pi || !pi.legged || n < 2) {
      const lb = G(n - 1);
      if (!lb) return;
      wires.push([[g.n1x, g.n1y], [lb.x1, lb.y1]]);
      wires.push([[g.n2x, g.n2y], [lb.x2, lb.y2]]);
      return;
    }
    // Förbindelser mellan grenarna, utom benets sträcka som ritas för sig.
    const r0 = pi.stretched ? 1 : 0, r1 = pi.stretched ? n - 1 : n - 2;
    const A = G(r0), B = G(r1), fa = G(pi.far), ne = G(pi.near);
    if (!A || !B || !fa || !ne) return;
    if (r1 > r0) { wires.push([[A.x1, A.y1], [B.x1, B.y1]]); wires.push([[A.x2, A.y2], [B.x2, B.y2]]); }
    if (Pp.legA && geo[Pp.legA.id]) dSeries(Pp.legA); else wires.push([[ne.x1, ne.y1], [fa.x1, fa.y1]]);
    if (Pp.legB && geo[Pp.legB.id]) dSeries(Pp.legB); else wires.push([[fa.x2, fa.y2], [ne.x2, ne.y2]]);
  }
  function dComp(c) {
    const g = geo[c.id], col = colOf(c.id);
    const start = sym.length;
    symbolPrims(c, g, col, g.op, sym);
    const lb = lay.lab[c.id];
    let tb = null;
    if (lb) { const t = labelPrim(g.x, g.y, g.ang, g.lsx, g.lsy, symExt(c).hl, lb, col, g.op); txt.push(t); tb = textBox(t); }
    if (o.hits) { const bb = bboxOf(sym.slice(start)); hits.push({ kind: 'comp', id: c.id, box: tb ? union(bb, tb) : bb }); }
  }
  function dArrow(g, pl) {
    const a = g.ang * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a), px = -dy, py = dx;
    const tip = [g.x + dx * ARROW_LEN / 2, g.y + dy * ARROW_LEN / 2];
    const bx = g.x - dx * ARROW_LEN / 2, by = g.y - dy * ARROW_LEN / 2;
    const col = (o.accent && o.accent === pl.key) ? ACCENT : (o.arrowInk || (doc.opts.arrowBlue ? BLUE : ink));
    sym.push({ t: 'poly', pts: [tip, [bx + px * ARROW_HW, by + py * ARROW_HW], [bx - px * ARROW_HW, by - py * ARROW_HW]], fill: col, stroke: 'none', op: g.op });
    let tb = null;
    if (pl.runs) {
      const t = labelPrim(tip[0], tip[1], g.ang, g.lsx, g.lsy, ARROW_HW, { runs: pl.runs, tw: runsWidth(pl.runs) }, col, g.op);
      txt.push(t); tb = textBox(t);
    }
    if (o.hits) { const bb = [g.x - 13, g.y - 13, g.x + 13, g.y + 13]; hits.push({ kind: 'arrow', id: pl.key, box: tb ? union(bb, tb) : bb }); }
  }
  for (const s of SIDES) dSeries(doc.loop[s]);
  const lines = [];
  for (const [p, q] of wires) {
    if (Math.hypot(q[0] - p[0], q[1] - p[1]) < 0.05) continue;
    lines.push({ t: 'line', x1: p[0], y1: p[1], x2: q[0], y2: q[1], w: WIRE_W, c: ink, cap: 'square' });
  }
  const dots = junctions(lines).map(([x, y]) => ({ t: 'circle', cx: x, cy: y, r: DOT_R, fill: ink, stroke: 'none' }));
  return { prims: lines.concat(sym, dots, txt), hits };
}

/* ================= Utgångar: SVG och Canvas ================= */
function runsSvg(runs) {
  let s = '', down = false;
  for (const r of runs) {
    let a = '';
    if (r.sub) { if (!down) { a += ` dy="${SUB_DY}"`; down = true; } a += ` font-size="${FS_SUB}"`; }
    else if (down) { a += ` dy="${-SUB_DY}"`; down = false; }
    if (r.it) a += ' font-style="italic"';
    s += `<tspan${a}>${esc(r.s)}</tspan>`;
  }
  return s;
}
function primSvg(p) {
  const op = (p.op != null && p.op < 0.999) ? ` opacity="${r2(Math.max(0, p.op))}"` : '';
  switch (p.t) {
    case 'line': return `<line x1="${r2(p.x1)}" y1="${r2(p.y1)}" x2="${r2(p.x2)}" y2="${r2(p.y2)}" stroke="${p.c}" stroke-width="${p.w}" stroke-linecap="${p.cap || 'butt'}"${op}/>`;
    case 'poly': return `<polygon points="${p.pts.map(q => r2(q[0]) + ',' + r2(q[1])).join(' ')}" fill="${p.fill || 'none'}" stroke="${p.stroke || 'none'}" stroke-width="${p.w || WIRE_W}" stroke-linejoin="miter"${op}/>`;
    case 'circle': return `<circle cx="${r2(p.cx)}" cy="${r2(p.cy)}" r="${p.r}" fill="${p.fill || 'none'}" stroke="${p.stroke || 'none'}"${p.stroke && p.stroke !== 'none' ? ` stroke-width="${p.w}"` : ''}${op}/>`;
    case 'path': return `<path d="${p.d}" fill="none" stroke="${p.stroke}" stroke-width="${p.w}" stroke-linecap="round"${op}/>`;
    case 'text': return `<text x="${r2(p.x)}" y="${r2(p.y)}" text-anchor="${p.anchor}" font-size="${p.size || FS}"${p.weight ? ` font-weight="${p.weight}"` : ''} fill="${p.c}" xml:space="preserve"${op}>${runsSvg(p.runs)}</text>`;
  }
  return '';
}
function drawCanvas(ctx, prims) {
  for (const p of prims) {
    ctx.globalAlpha = p.op == null ? 1 : Math.max(0, p.op);
    switch (p.t) {
      case 'line':
        ctx.beginPath(); ctx.moveTo(p.x1, p.y1); ctx.lineTo(p.x2, p.y2);
        ctx.lineWidth = p.w; ctx.lineCap = p.cap || 'butt'; ctx.strokeStyle = p.c; ctx.stroke();
        break;
      case 'poly':
        ctx.beginPath();
        p.pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]));
        ctx.closePath();
        if (p.fill && p.fill !== 'none') { ctx.fillStyle = p.fill; ctx.fill(); }
        if (p.stroke && p.stroke !== 'none') { ctx.lineWidth = p.w || WIRE_W; ctx.lineJoin = 'miter'; ctx.strokeStyle = p.stroke; ctx.stroke(); }
        break;
      case 'circle':
        ctx.beginPath(); ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
        if (p.fill && p.fill !== 'none') { ctx.fillStyle = p.fill; ctx.fill(); }
        if (p.stroke && p.stroke !== 'none') { ctx.lineWidth = p.w; ctx.strokeStyle = p.stroke; ctx.stroke(); }
        break;
      case 'path': {
        const path = new Path2D(p.d);
        ctx.lineWidth = p.w; ctx.lineCap = 'round'; ctx.strokeStyle = p.stroke; ctx.stroke(path);
        break;
      }
      case 'text': {
        let x = p.anchor === 'middle' ? p.x - p.tw / 2 : p.anchor === 'end' ? p.x - p.tw : p.x;
        ctx.fillStyle = p.c; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
        for (const r of p.runs) {
          ctx.font = runFont(r, p.size, p.weight);
          ctx.fillText(r.s, x, p.y + (r.sub ? SUB_DY : 0));
          x += ctx.measureText(r.s).width;
        }
        break;
      }
    }
  }
  ctx.globalAlpha = 1;
}

/* ================= Mallar ================= */
const TEMPLATES = [
  { id: 'enkel', name: 'Enkel krets', make: () => newDoc({ top: [mkComp('resistor')], bottom: [mkComp('battery')] }) },
  { id: 'serie', name: 'Seriekoppling', make: () => newDoc({ top: [mkComp('resistor'), mkComp('resistor'), mkComp('resistor')], bottom: [mkComp('battery')] }) },
  { id: 'parallell', name: 'Parallellkoppling', make: () => newDoc({ top: [mkComp('battery')], bottom: [mkPar('in', [[mkComp('resistor')], [mkComp('resistor')], [mkComp('resistor')]])] }) },
  { id: 'blandad', name: 'Blandad koppling', make: () => newDoc({ top: [mkComp('resistor'), mkPar('in', [[mkComp('resistor')], [mkComp('resistor')]])], bottom: [mkComp('battery')] }) },
  { id: 'matare', name: 'Med mätare', make: () => newDoc({ top: [mkComp('ammeter'), mkPar('out', [[mkComp('lamp')], [mkComp('voltmeter')]])], bottom: [mkComp('battery'), mkComp('switch')] }) },
  { id: 'tom', name: 'Tom krets', make: () => newDoc({}) },
];
function starterDoc() {
  const d = newDoc({
    top: [mkComp('resistor', { value: '20' }), mkPar('in', [[mkComp('resistor', { value: '30' })], [mkComp('resistor', { value: '60' })]])],
    bottom: [mkComp('battery', { value: '12' })],
  });
  return d;
}

/* ================= Ikoner ================= */
const IC = {
  undo: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
  redo: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',
  trash: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  swap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h13l-4-4"/><path d="M17 17H4l4 4"/></svg>',
  mirror: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18" stroke-dasharray="2 3"/><path d="M8 7 3 12l5 5"/><path d="m16 7 5 5-5 5"/></svg>',
  left: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  hide: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-2.7 3.6M6.6 6.6C3.9 8.4 2.5 12 2.5 12S6 19 12 19a9.6 9.6 0 0 0 4.4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
  copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
};
// Symbolen till paletten, bytknapparna och spöket som följer pekaren.
function iconSvg(type, w, h, extra) {
  const c = mkComp(type, extra);
  const e = symExt(c);
  const prims = [
    { t: 'line', x1: -34, y1: 0, x2: -e.len / 2, y2: 0, w: WIRE_W, c: 'currentColor', cap: 'butt' },
    { t: 'line', x1: e.len / 2, y1: 0, x2: 34, y2: 0, w: WIRE_W, c: 'currentColor', cap: 'butt' },
  ];
  symbolPrims(c, { x: 0, y: 0, ang: 0, lsx: 0, lsy: -1, op: 1 }, 'currentColor', 1, prims);
  return `<svg viewBox="-36 -24 72 48" width="${w}" height="${h}" aria-hidden="true">${prims.map(primSvg).join('')}</svg>`;
}

/* ================= Export ================= */
function exportScene(d) {
  const L = layout(d);
  const { prims } = buildDisplay(d, L.geo, L, {});
  const bb = bboxOf(prims), pad = 8;
  return { prims, x: bb[0] - pad, y: bb[1] - pad, w: bb[2] - bb[0] + 2 * pad, h: bb[3] - bb[1] + 2 * pad };
}
function sceneSvg(sc, scale, transparent) {
  const W = Math.round(sc.w * scale), H = Math.round(sc.h * scale);
  const bg = transparent ? '' : `<rect x="${r2(sc.x)}" y="${r2(sc.y)}" width="${r2(sc.w)}" height="${r2(sc.h)}" fill="#ffffff"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${r2(sc.x)} ${r2(sc.y)} ${r2(sc.w)} ${r2(sc.h)}" font-family="Poppins, Arial, sans-serif">${bg}${sc.prims.map(primSvg).join('')}</svg>`;
}
async function ensureFonts() {
  try {
    await Promise.all(['400 15px Poppins', 'italic 400 15px Poppins', '600 15px Poppins'].map(f => document.fonts.load(f, 'RUIAVΩ0123')));
  } catch (e) { /* reservtypsnittet duger */ }
}
const CRC_T = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC_T[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
// Lägger in pHYs (upplösning) i PNG:n, så att Word och PowerPoint visar
// bilden i avsedd fysisk storlek trots att den har tre gånger så många
// pixlar som behövs (för skärpans skull).
async function withDpi(blob, dpi) {
  const buf = new Uint8Array(await blob.arrayBuffer());
  const ppm = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21), dv = new DataView(chunk.buffer);
  dv.setUint32(0, 9); chunk.set([0x70, 0x48, 0x59, 0x73], 4);
  dv.setUint32(8, ppm); dv.setUint32(12, ppm); chunk[16] = 1;
  dv.setUint32(17, crc32(chunk.subarray(4, 17)));
  // Ta bort ett ev. befintligt pHYs-block och lägg in det nya efter IHDR.
  const parts = [buf.subarray(0, 33), chunk];
  let i = 33;
  while (i < buf.length) {
    const len = new DataView(buf.buffer, buf.byteOffset + i).getUint32(0);
    const type = String.fromCharCode(buf[i + 4], buf[i + 5], buf[i + 6], buf[i + 7]);
    const end = i + 12 + len;
    if (type !== 'pHYs') parts.push(buf.subarray(i, end));
    i = end;
  }
  return new Blob(parts, { type: 'image/png' });
}
async function pngBlob(d) {
  await ensureFonts();
  const sc = exportScene(d);
  const s = SIZES[d.opts.size] || SIZES.M;
  const px = s * PNG_DENSITY;
  const cv = document.createElement('canvas');
  cv.width = Math.round(sc.w * px); cv.height = Math.round(sc.h * px);
  const ctx = cv.getContext('2d');
  if (!d.opts.transparent) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cv.width, cv.height); }
  ctx.setTransform(px, 0, 0, px, -sc.x * px, -sc.y * px);
  drawCanvas(ctx, sc.prims);
  const blob = await new Promise(res => cv.toBlob(res, 'image/png'));
  return withDpi(blob, 96 * PNG_DENSITY);
}
function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const fileName = ext => 'kopplingsschema-' + new Date().toISOString().slice(0, 10) + '.' + ext;

/* ================= Tillstånd och historik ================= */
function encodeDoc(d) {
  const bytes = new TextEncoder().encode(JSON.stringify(d));
  let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodeDoc(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
function validDoc(d) {
  return d && d.loop && SIDES.every(s => d.loop[s] && Array.isArray(d.loop[s].items));
}
function loadInitial() {
  const m = location.hash.match(/[#&]s=([A-Za-z0-9_-]+)/);
  if (m) { try { const d = decodeDoc(m[1]); if (validDoc(d)) return fixDoc(d); } catch (e) { /* trasig länk */ } }
  try { const d = JSON.parse(localStorage.getItem(STORE_KEY)); if (validDoc(d)) return fixDoc(d); } catch (e) { /* tomt */ }
  return starterDoc();
}
function fixDoc(d) {
  d.opts = Object.assign({}, DEFAULT_OPTS, d.opts || {});
  d.arrowMain = d.arrowMain || {}; d.arrowCfg = d.arrowCfg || {};
  return normalize(d);
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(doc)); } catch (e) { /* privat läge */ } }

let doc = loadInitial();
let lay = layout(doc);
let sel = null;
const hist = { stack: [], i: -1 };
function commit() {
  hist.stack = hist.stack.slice(0, hist.i + 1);
  hist.stack.push(JSON.stringify(doc));
  if (hist.stack.length > 200) hist.stack.shift();
  hist.i = hist.stack.length - 1;
  save(); updateUndo();
}
function undo() { if (hist.i > 0) { hist.i--; doc = JSON.parse(hist.stack[hist.i]); afterHistory(); } }
function redo() { if (hist.i < hist.stack.length - 1) { hist.i++; doc = JSON.parse(hist.stack[hist.i]); afterHistory(); } }
function afterHistory() {
  if (sel && sel.kind === 'comp' && !findItem(doc, sel.id)) sel = null;
  save(); refresh(); updateUndo();
}

/* ================= Vyn: animation och kamera ================= */
const sheetEl = $('#sheet'), svgEl = $('#svg'), camG = $('#cam'), inkG = $('#ink'), selG = $('#selg'), zoneG = $('#zones'), hitG = $('#hits');
const inspEl = $('#insp'), ghostEl = $('#ghost'), trashEl = $('#trash'), paletteEl = $('#palette');
const view = { doc, lay, geoNow: null, anim: null, camFrozen: false, accent: null, raf: 0, hits: [] };
const TWEEN = ['x', 'y', 'x1', 'y1', 'x2', 'y2', 'n1x', 'n1y', 'n2x', 'n2y', 'op', 'k', 'tx', 'ty'];
function lerpObj(a, b, t) {
  const o = Object.assign({}, b);
  for (const key of TWEEN) if (typeof b[key] === 'number' && typeof a[key] === 'number') o[key] = a[key] + (b[key] - a[key]) * t;
  if (typeof b.ang === 'number' && typeof a.ang === 'number') { const d = ((b.ang - a.ang) % 360 + 540) % 360 - 180; o.ang = a.ang + d * t; }
  return o;
}
const kMax = () => window.innerWidth < 700 ? 1.45 : 1.8;
function fitCam(bb) {
  const W = svgEl.clientWidth || 800, H = svgEl.clientHeight || 500;
  const padX = W < 600 ? 18 : 60, padY = W < 600 ? 22 : 64;
  const bw = bb[2] - bb[0], bh = bb[3] - bb[1];
  const k = Math.max(0.45, Math.min(kMax(), (W - 2 * padX) / bw, (H - 2 * padY) / bh));
  return { k, tx: W / 2 - k * (bb[0] + bw / 2), ty: H / 2 - k * (bb[1] + bh / 2) };
}
function show(d, l, opt) {
  opt = opt || {};
  const target = Object.assign({}, l.geo);
  const bb = bboxOf(buildDisplay(d, l.geo, l, {}).prims);
  target.cam = (view.camFrozen && view.geoNow) ? view.geoNow.cam : fitCam(bb);
  const from = view.geoNow || {};
  const start = {};
  for (const key in target) {
    if (from[key]) start[key] = from[key];
    else if (opt.spawn && opt.spawn.id === key) start[key] = Object.assign({}, target[key], { x: opt.spawn.x, y: opt.spawn.y, op: 0.25 });
    else if (target[key].op != null) start[key] = Object.assign({}, target[key], { op: 0 });
    else start[key] = target[key];
  }
  view.doc = d; view.lay = l; view.accent = opt.accent || null;
  if (opt.instant || !view.geoNow) { view.geoNow = target; view.anim = null; render(); return; }
  view.anim = { start, target, t0: performance.now(), dur: opt.dur || 260 };
  if (!view.raf) view.raf = requestAnimationFrame(tick);
}
function tick(now) {
  view.raf = 0;
  const A = view.anim;
  if (!A) return;
  const p = Math.min(1, (now - A.t0) / A.dur);
  const e = 1 - Math.pow(1 - p, 3);
  const g = {};
  for (const key in A.target) g[key] = lerpObj(A.start[key], A.target[key], e);
  view.geoNow = g;
  render();
  if (p < 1) view.raf = requestAnimationFrame(tick); else view.anim = null;
}
function render() {
  const g = view.geoNow;
  if (!g) return;
  const c = g.cam;
  camG.setAttribute('transform', `translate(${r2(c.tx)} ${r2(c.ty)}) scale(${Math.round(c.k * 1000) / 1000})`);
  const out = buildDisplay(view.doc, g, view.lay, { hits: true, accent: view.accent });
  inkG.innerHTML = out.prims.map(primSvg).join('');
  view.hits = out.hits;
  const moving = drag && drag.moving;
  let s = '';
  if (sel && !moving) {
    const h = out.hits.find(x => x.kind === sel.kind && x.id === sel.id);
    if (h) { const b = h.box; s = `<rect class="selbox" x="${r2(b[0] - 7)}" y="${r2(b[1] - 6)}" width="${r2(b[2] - b[0] + 14)}" height="${r2(b[3] - b[1] + 12)}" rx="9" vector-effect="non-scaling-stroke"/>`; }
  }
  selG.innerHTML = s;
  hitG.innerHTML = moving ? '' : out.hits.map(h => `<rect class="hit" data-kind="${h.kind}" data-id="${h.id}" x="${r2(h.box[0] - 6)}" y="${r2(h.box[1] - 5)}" width="${r2(h.box[2] - h.box[0] + 12)}" height="${r2(h.box[3] - h.box[1] + 10)}" rx="8"/>`).join('');
  renderZones();
}
function renderZones() {
  if (!drag || !drag.moving || drag.target || !drag.zones) { zoneG.innerHTML = ''; return; }
  const k = view.geoNow.cam.k;
  const near = drag.near;
  zoneG.innerHTML = drag.zones.map(z => {
    const on = z === near;
    if (z.kind === 'series' || z.kind === 'leg') return `<circle class="zone${on ? ' near' : ''}" cx="${r2(z.x)}" cy="${r2(z.y)}" r="${r2((on ? 6.5 : 4.5) / k * 1.2)}" vector-effect="non-scaling-stroke"/>`;
    const vert = z.vert;
    if (z.kind === 'span') {
      const sw = Math.max(18 / k, z.w), sh = (on ? 12 : 8) / k;
      return `<rect class="zone par span${on ? ' near' : ''}" x="${r2(z.x - (vert ? sh : sw) / 2)}" y="${r2(z.y - (vert ? sw : sh) / 2)}" width="${r2(vert ? sh : sw)}" height="${r2(vert ? sw : sh)}" rx="${r2(5 / k)}" vector-effect="non-scaling-stroke"/>`;
    }
    const w = (on ? 30 : 24) / k, h = (on ? 16 : 12) / k;
    return `<rect class="zone par${on ? ' near' : ''}" x="${r2(z.x - (vert ? h : w) / 2)}" y="${r2(z.y - (vert ? w : h) / 2)}" width="${r2(vert ? h : w)}" height="${r2(vert ? w : h)}" rx="${r2(4 / k)}" vector-effect="non-scaling-stroke"/>`;
  }).join('');
}
function refresh(opt) {
  lay = layout(doc);
  show(doc, lay, opt);
  renderInspector();
}
function relayout() { lay = layout(doc); show(doc, lay); save(); }

/* ================= Släppzoner ================= */
function computeZones(d, L) {
  const Z = [];
  for (const si of L.info.series) {
    if (!si.gaps.length) continue;
    si.gaps.forEach((gp, i) => Z.push({ kind: 'series', sid: si.S.id, index: i, x: (gp[0][0] + gp[1][0]) / 2, y: (gp[0][1] + gp[1][1]) / 2, vert: si.vert }));
  }
  // SPÄNNZONER: på varje ledning med flera komponenter i rad (vågrät eller
  // lodrät, ytterledning, gren eller ben) finns streckade lister på båda
  // sidor. En list spänner över två eller fler grannar, och släpps
  // komponenten där parallellkopplas den över ALLA dem. Listerna ligger i
  // våningar: ju längre ut från ledningen, desto fler komponenter spänner
  // listen över, och dess bredd visar vilka. Den innersta våningen (en
  // enskild komponent) är komponentens egen parallellzon.
  const center = it => { const g = L.geo[it.id]; return it.kind === 'par' ? [(g.n1x + g.n2x) / 2, (g.n1y + g.n2y) / 2] : [g.x, g.y]; };
  const SPAN_D0 = 38, SPAN_STEP = 18, SPAN_MAX = 5;
  // Fritt avstånd till grannledningen på etikettsidan (ut) och motsatt sida
  // (in) för en serie på position j i en parallellkoppling. Gren 0 har
  // etiketten bort från grannen, övriga grenar mot nästa gren.
  const freeFor = (par, j) => {
    if (!par || j == null) return [1e9, 1e9];
    const o = L.M[par.id].offs;
    const toPrev = j > 0 ? Math.abs(o[j] - o[j - 1]) : 1e9, toNext = j < o.length - 1 ? Math.abs(o[j + 1] - o[j]) : 1e9;
    return j === 0 ? [1e9, toNext] : [toNext, toPrev];
  };
  for (const si of L.info.series) {
    const its = si.S.items;
    if (its.length < 2 || !si.gaps.length) continue;
    const lsx = si.f.ox * si.L, lsy = si.f.oy * si.L;
    // Fritt avstånd till närmaste grannledning på vardera sidan. En gren i
    // en parallellkoppling har grannar på grenavståndet; annars finns gott
    // om plats. Listerna trycks ihop så att de aldrig hamnar på en granne.
    // Utrymmet mellan två grenar delas mitt itu: varje gren får sin halva.
    const [freeOut, freeIn] = freeFor(si.ctx.par, si.ctx.j);
    const tiers = Math.min(its.length, SPAN_MAX) - 1;
    const dist = (n, free) => {
      const want = SPAN_D0 + SPAN_STEP * (n - 2) + 16, max = free / 2 - 6;
      return want <= max ? want : 22 + (max - 22) * (n - 1) / tiers;
    };
    for (let n = 2; n <= Math.min(its.length, SPAN_MAX); n++) {
      const Do = dist(n, freeOut), Di = dist(n, freeIn);
      for (let i = 0; i + n <= its.length; i++) {
        const a = center(its[i]), b = center(its[i + n - 1]);
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, w = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (Do >= 30) Z.push({ kind: 'span', sid: si.S.id, from: i, n, side: 'out', x: mx + lsx * Do, y: my + lsy * Do, w, vert: si.vert });
        if (Di >= 30) Z.push({ kind: 'span', sid: si.S.id, from: i, n, side: 'in', x: mx - lsx * Di, y: my - lsy * Di, w, vert: si.vert });
      }
    }
  }
  for (const ci of L.info.comps) {
    const g = L.geo[ci.c.id], e = symExt(ci.c);
    // Mellan två grenar får komponentens zon bara den egna halvan av utrymmet.
    const D0 = Math.max(e.hl, e.ho) + 26;
    const [fo, fi] = freeFor(ci.par, ci.j);
    const Do = Math.min(D0, fo / 2 - 10), Di = Math.min(D0, fi / 2 - 10);
    const vert = ci.f.dx === 0;
    const sole = ci.par && ci.S.items.length === 1;
    const push = (z, d, sg) => { if (d >= 14) Z.push(Object.assign(z, { x: g.x + sg * g.lsx * d, y: g.y + sg * g.lsy * d, vert })); };
    if (sole) {
      if (ci.j === 0) push({ kind: 'branch', pid: ci.par.id, at: ci.k + 1 }, Di, -1);   // grenarnas staplingsriktning
      else push({ kind: 'branch', pid: ci.par.id, at: ci.k + 1 }, Do, 1);
      if (ci.j === 0) push({ kind: 'par', target: ci.c.id, side: 'out' }, Do, 1);
    } else {
      push({ kind: 'par', target: ci.c.id, side: 'out' }, Do, 1);
      push({ kind: 'par', target: ci.c.id, side: 'in' }, Di, -1);
    }
  }
  // BENZONER: mitt på den lodräta biten som leder ut till den yttersta
  // grenen. En komponent där hamnar i serie med den grenen men ritas på
  // benet, så att samma koppling kan se annorlunda ut.
  for (const pi of L.info.pars) {
    const P = pi.P, inf = L.parInfo[P.id];
    if (!inf || P.branches.length < 2) continue;
    const fa = L.geo[P.branches[inf.order[inf.far]].id], ne = L.geo[P.branches[inf.order[inf.near]].id];
    const reorder = !inf.legged && !inf.stretched;
    const vert = pi.f.dx !== 0;
    if (!P.legA) Z.push({ kind: 'leg', pid: P.id, which: 'legA', reorder, x: (fa.x1 + ne.x1) / 2, y: (fa.y1 + ne.y1) / 2, vert });
    if (!P.legB) Z.push({ kind: 'leg', pid: P.id, which: 'legB', reorder, x: (fa.x2 + ne.x2) / 2, y: (fa.y2 + ne.y2) / 2, vert });
  }
  for (const pi of L.info.pars) {
    const inf = L.parInfo[pi.P.id];
    const last = pi.P.branches[inf ? inf.order[inf.order.length - 1] : pi.P.branches.length - 1];
    if (last.items.length === 1) continue;   // täcks av grenzonen vid komponenten
    const gl = L.geo[last.id];
    const sx = pi.f.ox * pi.s, sy = pi.f.oy * pi.s;
    Z.push({ kind: 'branch', pid: pi.P.id, at: pi.P.branches.length, x: (gl.x1 + gl.x2) / 2 + sx * 40, y: (gl.y1 + gl.y2) / 2 + sy * 40, vert: pi.f.dx === 0 });
  }
  return Z;
}
const zoneKey = z => [z.kind, z.sid || z.target || z.pid, z.index, z.at, z.from, z.n, z.side, z.which].join(':');
function applyZone(d0, z, item, ids) {
  const d = clone(d0);
  if (z.kind === 'series') findSeries(d, z.sid).items.splice(z.index, 0, item);
  else if (z.kind === 'par') {
    const f = findItem(d, z.target);
    f.series.items.splice(f.index, 1, { id: ids.p, kind: 'par', side: z.side, branches: [mkSeries([f.item], ids.b1), mkSeries([item], ids.b2)] });
  } else if (z.kind === 'span') {
    const S = findSeries(d, z.sid);
    const n = z.n || 2, run = S.items.slice(z.from, z.from + n);
    // Spänner listen över HELA ledaren ansluter parallellkopplingen i
    // ledarens ändar (hörnen), inte i egna noder en bit innanför.
    const full = n === S.items.length;
    S.items.splice(z.from, n, Object.assign({ id: ids.p, kind: 'par', side: z.side, branches: [mkSeries(run, ids.b1), mkSeries([item], ids.b2)] }, full ? { full: true } : {}));
  } else if (z.kind === 'leg') {
    const P = findItem(d, z.pid).item;
    // Den yttersta grenen blir gren 0, eftersom benen hör till gren 0.
    if (z.reorder) { P.branches.unshift(P.branches.pop()); P.legMoved = true; }
    P[z.which] = mkSeries([item], ids.b1);
  } else if (z.kind === 'branch') {
    const f = findItem(d, z.pid);
    f.item.branches.splice(z.at, 0, mkSeries([item], ids.b1));
  }
  return normalize(d);
}

/* ================= Dra och släpp ================= */
let drag = null;
function toCircuit(e) {
  const r = svgEl.getBoundingClientRect(), c = view.geoNow.cam;
  return [(e.clientX - r.left - c.tx) / c.k, (e.clientY - r.top - c.ty) / c.k];
}
const inRect = (el, e) => { const r = el.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; };
function beginDrag() {
  drag.moving = true;
  stopCoach();
  document.body.classList.add('is-dragging');
  view.camFrozen = true;
  if (drag.mode === 'new') {
    drag.item = mkComp(drag.type);
    drag.base = doc; drag.baseLay = lay;
  } else {
    const f = findItem(doc, drag.id);
    drag.item = clone(f.item);
    const b = clone(doc);
    removeById(b, drag.id);
    drag.base = b; drag.baseLay = layout(b);
    sheetEl.classList.add('can-trash');
    show(drag.base, drag.baseLay);
  }
  drag.zones = computeZones(drag.base, drag.baseLay);
  drag.ids = {};
  const k = view.geoNow.cam.k;
  ghostEl.innerHTML = iconSvg(drag.item.type, 72 * k, 48 * k, drag.item);
  ghostEl.classList.add('on');
}
function moveDrag(e) {
  ghostEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  const pt = toCircuit(e), k = view.geoNow.cam.k;
  const overTrash = drag.mode === 'move' && (inRect(trashEl, e) || inRect(paletteEl, e));
  let target = null, best = null, bd = Infinity;
  if (!overTrash && inRect(sheetEl, e)) {
    for (const z of drag.zones) { const dd = Math.hypot(z.x - pt[0], z.y - pt[1]) * k; if (dd < bd) { bd = dd; best = z; } }
    const cur = drag.target && drag.target.z;
    if (cur) {   // lite tröghet så att förhandsvisningen inte fladdrar
      const dc = Math.hypot(cur.x - pt[0], cur.y - pt[1]) * k;
      if (dc < 62 && (!best || bd > dc - 12)) { best = cur; bd = dc; }
    }
    if (best && bd < 50) target = best;
  }
  drag.near = best && bd < 140 ? best : null;
  trashEl.classList.toggle('hot', overTrash);
  ghostEl.classList.toggle('trash', overTrash);
  const key = target ? zoneKey(target) : (overTrash ? 'trash' : '');
  if (key === drag.key) { renderZones(); return; }
  drag.key = key;
  if (target) {
    const ids = drag.ids[key] || (drag.ids[key] = { p: rid('p'), b1: rid('s'), b2: rid('s') });
    const pd = applyZone(drag.base, target, clone(drag.item), ids);
    drag.target = { z: target, doc: pd };
    show(pd, layout(pd), { spawn: { id: drag.item.id, x: pt[0], y: pt[1] }, accent: drag.item.id });
    ghostEl.classList.add('placed');
  } else {
    drag.target = null;
    show(drag.base, drag.baseLay);
    ghostEl.classList.remove('placed');
  }
}
function endDrag(cancelled) {
  const d = drag;
  drag = null;
  ghostEl.classList.remove('on', 'placed', 'trash');
  document.body.classList.remove('is-dragging');
  sheetEl.classList.remove('can-trash');
  trashEl.classList.remove('hot');
  view.camFrozen = false;
  if (!cancelled && d.target) {
    doc = d.target.doc; commit();
    sel = { kind: 'comp', id: d.item.id };
    markUsed();
    refresh();
  } else if (!cancelled && d.key === 'trash') {
    doc = d.base; commit();
    if (sel && sel.id === d.id) sel = null;
    refresh();
    toast('Komponenten togs bort.', 'Ångra', undo);
  } else refresh();
}
// Klick på en palettbricka: lägg till komponenten på ett vettigt ställe.
function smartAdd(type, fromEl) {
  stopCoach();
  const item = mkComp(type);
  const d = clone(doc);
  const s = sel && sel.kind === 'comp' ? findItem(d, sel.id) : null;
  const load = readingOrder(d).find(c => c.type === 'resistor' || c.type === 'lamp' || c.type === 'varres');
  if (type === 'voltmeter' && (s || load)) {
    const tgt = s ? s.item.id : load.id;
    const d2 = applyZone(d, { kind: 'par', target: tgt, side: 'out' }, item, { p: rid('p'), b1: rid('s'), b2: rid('s') });
    Object.assign(d, d2);
  } else if (s) s.series.items.splice(s.index + 1, 0, item);
  else if (type === 'battery' || type === 'ac') d.loop.bottom.items.push(item);
  else d.loop.top.items.push(item);
  doc = normalize(d); commit();
  sel = { kind: 'comp', id: item.id };
  let spawn = null;
  if (fromEl && view.geoNow) {
    const r = fromEl.getBoundingClientRect();
    const p = toCircuit({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 });
    spawn = { id: item.id, x: p[0], y: p[1] };
  }
  markUsed();
  refresh({ spawn, dur: 420 });
}
function deleteSelected() {
  if (!sel) return;
  if (sel.kind === 'arrow') { arrowCfg(sel.id, true).hidden = true; sel = null; commit(); refresh(); return; }
  const d = clone(doc);
  removeById(d, sel.id);
  doc = d; sel = null; commit(); refresh();
  toast('Komponenten togs bort.', 'Ångra', undo);
}

paletteEl.addEventListener('pointerdown', e => {
  const t = e.target.closest('.tile');
  if (!t || e.button > 0) return;
  drag = { mode: 'new', type: t.dataset.type, sx: e.clientX, sy: e.clientY, moving: false, el: t };
});
hitG.addEventListener('pointerdown', e => {
  const t = e.target.closest('.hit');
  if (!t || e.button > 0) return;
  e.stopPropagation();
  if (t.dataset.kind === 'arrow') { select({ kind: 'arrow', id: t.dataset.id }); return; }
  drag = { mode: 'move', id: t.dataset.id, sx: e.clientX, sy: e.clientY, moving: false, wasSel: sel && sel.id === t.dataset.id };
  sheetEl.setPointerCapture && e.pointerId != null && sheetEl.setPointerCapture(e.pointerId);
});
svgEl.addEventListener('pointerdown', e => { if (!e.target.closest('.hit')) select(null); });
window.addEventListener('pointermove', e => {
  if (!drag) return;
  if (!drag.moving) {
    if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return;
    beginDrag();
  }
  e.preventDefault();
  moveDrag(e);
}, { passive: false });
window.addEventListener('pointerup', () => {
  if (!drag) return;
  const d = drag;
  if (!d.moving) {
    drag = null;
    if (d.mode === 'new') smartAdd(d.type, d.el);
    else if (d.wasSel) focusValue();
    else select({ kind: 'comp', id: d.id });
    return;
  }
  endDrag(false);
});
window.addEventListener('pointercancel', () => { if (drag && drag.moving) endDrag(true); else drag = null; });

/* ================= Markering och inspektör ================= */
function select(s) { sel = s; renderInspector(); render(); }
function focusValue() {
  const inp = inspEl.querySelector('#f-val') || inspEl.querySelector('#f-name');
  if (inp) { inp.focus(); inp.select(); }
}
function arrowCfg(key, create) {
  if (key === 'main') return doc.arrowMain;
  if (!doc.arrowCfg[key] && create) doc.arrowCfg[key] = {};
  return doc.arrowCfg[key] || {};
}
function planFor(key) { return Object.values(lay.plan).find(p => p.key === key) || null; }
const tgl = (key, label, small, on, sub) => `<label class="tgl${sub ? ' sub' : ''}"><input type="checkbox" data-opt="${key}"${on ? ' checked' : ''}><span class="sw"></span><span class="tx">${label}${small ? `<small>${small}</small>` : ''}</span></label>`;
const seg = (name, items, cur) => `<div class="seg" data-seg="${name}">${items.map(([v, t]) => `<button type="button" data-v="${v}" class="${String(cur) === String(v) ? 'on' : ''}">${t}</button>`).join('')}</div>`;

function renderInspector() {
  let h = '';
  if (sel && sel.kind === 'comp') {
    const f = findItem(doc, sel.id);
    if (f) h = inspComp(f); else sel = null;
  } else if (sel && sel.kind === 'arrow') {
    if (planFor(sel.id)) h = inspArrow(sel.id); else sel = null;
  }
  if (!h) h = inspDoc();
  inspEl.innerHTML = h;
  inspEl.scrollTop = 0;
}
function inspComp(f) {
  const c = f.item, T = TYPES[c.type], au = lay.auto[c.id];
  const autoTxt = au ? au.letter + toSub(au.idx) : '';
  const inPar = !!f.ctx.par;
  const spanCtl = inPar ? spanControls(f.ctx.par) : '';
  const others = Object.keys(TYPES).filter(t => t !== c.type);
  return `
  <div class="ins-head">
    <div class="ins-ico">${iconSvg(c.type, 66, 44, c)}</div>
    <div class="ins-t"><div class="eyebrow">Vald komponent</div><h2>${T.long || T.name}</h2></div>
    <button class="ibtn danger" data-act="del" title="Ta bort (Delete)" aria-label="Ta bort">${IC.trash}</button>
  </div>
  <div class="fld"><label for="f-name">Beteckning</label>
    <input id="f-name" data-f="name" value="${esc(c.name)}" placeholder="${autoTxt ? esc(autoTxt) + '  (automatisk)' : 'Ingen'}" autocomplete="off" spellcheck="false">
  </div>
  ${T.field ? `<div class="fld"><label for="f-val">${T.field}</label>
    <div class="unit"><input id="f-val" data-f="value" value="${esc(c.value)}" placeholder="${esc(T.ph || '')}" autocomplete="off" spellcheck="false"><span>${T.unit}</span></div>
    <p class="help">Skriv <b>?</b> om storheten är okänd.</p></div>` : ''}
  ${c.type === 'switch' ? `<div class="fld"><label>Läge</label>${seg('closed', [['0', 'Öppen'], ['1', 'Sluten']], c.closed ? 1 : 0)}</div>` : ''}
  <div class="acts">
    ${T.polar ? `<button class="wbtn" data-act="flip">${IC.swap}<span>${T.polarText}</span></button>` : ''}
    ${inPar ? `<button class="wbtn" data-act="mirror">${IC.mirror}<span>Spegla parallellkopplingen</span></button>` : ''}
  </div>
  ${spanCtl}
  ${tgl('show', 'Visa text vid komponenten', '', !c.hide)}
  <div class="swap"><div class="eyebrow">Byt till</div>
    <div class="swap-grid">${others.map(t => `<button class="swap-b" data-act="swap" data-type="${t}" title="${TYPES[t].name}" aria-label="Byt till ${TYPES[t].name}">${iconSvg(t, 48, 32)}</button>`).join('')}</div>
  </div>
  <p class="kbd-hint">Tips: klicka på komponenten igen, eller börja skriva, så hamnar du i värdefältet.</p>`;
}
// Parallellkopplingen kan spänna över fler seriekopplade komponenter:
// "Utöka" flyttar grannen på ledningen in i gren 0, "Krymp" flyttar ut den.
// Knapparna benämns efter skärmens riktning, inte trädets.
function spanInfo(P) {
  const f = findItem(doc, P.id);
  if (!f) return null;
  const b0 = P.branches[0], g = lay.geo[b0.id];
  const dx = g ? g.x2 - g.x1 : 1, dy = g ? g.y2 - g.y1 : 0;
  let before, after;
  if (Math.abs(dx) >= Math.abs(dy)) { before = dx > 0 ? 'vänster' : 'höger'; after = dx > 0 ? 'höger' : 'vänster'; }
  else { before = dy > 0 ? 'uppåt' : 'nedåt'; after = dy > 0 ? 'nedåt' : 'uppåt'; }
  return {
    f, before, after,
    growBefore: f.index > 0, growAfter: f.index < f.series.items.length - 1,
    shrink: b0.items.length > 1,
  };
}
function spanControls(P) {
  const si = spanInfo(P);
  if (!si || !(si.growBefore || si.growAfter || si.shrink)) return '';
  const first = si.before === 'vänster' || si.before === 'uppåt' ? 'before' : 'after';
  const order = first === 'before' ? ['before', 'after'] : ['after', 'before'];
  const name = d => d === 'before' ? si.before : si.after;
  const btn = (op, d, ok) => `<button class="wbtn sm" data-act="span" data-op="${op}" data-dir="${d}"${ok ? '' : ' disabled'}>${op === 'grow' ? 'Utöka' : 'Krymp'} ${op === 'grow' ? 'åt' : 'från'} ${name(d)}</button>`;
  return `<div class="fld"><label>Parallellkopplingen spänner över</label>
    <div class="span-grid">
      ${order.map(d => btn('grow', d, d === 'before' ? si.growBefore : si.growAfter)).join('')}
      ${order.map(d => btn('shrink', d, si.shrink)).join('')}
    </div>
    <p class="help">Utöka tar med nästa komponent på ledningen, så att parallellkopplingen spänner över flera seriekopplade.</p></div>`;
}
function spanEdit(P, op, dir) {
  const si = spanInfo(P);
  if (!si) return;
  const S = si.f.series, j = si.f.index, b0 = P.branches[0].items;
  if (op === 'grow' && dir === 'before' && si.growBefore) { b0.unshift(S.items.splice(j - 1, 1)[0]); }
  else if (op === 'grow' && dir === 'after' && si.growAfter) { b0.push(S.items.splice(j + 1, 1)[0]); }
  else if (op === 'shrink' && si.shrink) {
    if (dir === 'before') S.items.splice(j, 0, b0.shift());
    else S.items.splice(j + 1, 0, b0.pop());
  }
  normalize(doc);
}
function inspArrow(key) {
  const pl = planFor(key), cfg = arrowCfg(key, false);
  const g = lay.geo['arr:' + (key === 'main' ? doc.loop[pl.side].id : key)];
  const horiz = g && Math.abs(Math.cos(g.ang * Math.PI / 180)) > 0.5;
  const sideCur = g ? (horiz ? (g.lsy < 0 ? 'a' : 'b') : (g.lsx < 0 ? 'a' : 'b')) : 'a';
  return `
  <div class="ins-head">
    <div class="ins-ico arrow-ico"><svg viewBox="-36 -24 72 48" width="66" height="44"><line x1="-34" y1="4" x2="34" y2="4" stroke="currentColor" stroke-width="1.8"/><polygon points="5,4 -5,-0.6 -5,8.6" fill="currentColor"/><text x="0" y="-8" font-size="14" text-anchor="middle" fill="currentColor" font-family="Poppins" font-style="italic">I</text></svg></div>
    <div class="ins-t"><div class="eyebrow">Vald strömpil</div><h2>${key === 'main' ? 'Strömmen i kretsen' : 'Strömmen i grenen'}</h2></div>
    <button class="ibtn" data-act="ahide" title="Dölj pilen" aria-label="Dölj pilen">${IC.hide}</button>
  </div>
  <div class="fld"><label for="f-aname">Beteckning</label>
    <input id="f-aname" data-af="name" value="${esc(cfg.name || '')}" placeholder="${esc(pl.auto.replace(/\d+/, toSub))}  (automatisk)" autocomplete="off" spellcheck="false"></div>
  <div class="fld"><label for="f-aval">Strömstyrka</label>
    <div class="unit"><input id="f-aval" data-af="value" value="${esc(cfg.value || '')}" placeholder="till exempel 0,40" autocomplete="off"><span>A</span></div>
    ${!doc.opts.arrowValues ? '<p class="help">Slå på "Strömstyrka vid pilen" under inställningarna för att visa värdet.</p>' : ''}</div>
  <div class="fld"><label>Texten står</label>${seg('aside', horiz ? [['a', 'Ovanför'], ['b', 'Under']] : [['a', 'Till vänster'], ['b', 'Till höger']], sideCur)}</div>
  <div class="fld"><label>Placering på ledningen</label>
    <div class="row"><button class="ibtn" data-act="aprev" aria-label="Flytta bakåt">${IC.left}</button><button class="ibtn" data-act="anext" aria-label="Flytta framåt">${IC.right}</button><span class="help inline">Flytta pilen till nästa lediga ledningsbit.</span></div></div>
  <div class="acts"><button class="wbtn" data-act="aflip">${IC.swap}<span>Vänd pilens riktning</span></button></div>
  <p class="kbd-hint">Riktningen följer batteriets poler: strömmen går ut från pluspolen, det långa strecket.</p>`;
}
function inspDoc() {
  const o = doc.opts;
  const hidden = (doc.arrowMain.hidden ? 1 : 0) + Object.values(doc.arrowCfg).filter(c => c.hidden).length;
  return `
  <div class="ins-head plain"><div class="ins-t"><div class="eyebrow">Hela schemat</div><h2>Visa i schemat</h2></div></div>
  <div class="grp">
    ${tgl('names', 'Beteckningar', '<i>R</i>₁, <i>U</i>, L₁', o.names)}
    ${tgl('values', 'Värden', '20 Ω, 12 V', o.values)}
  </div>
  <div class="grp">
    ${tgl('arrows', 'Strömpilar', 'Riktningen följer batteriets poler', o.arrows)}
    ${o.arrows && !hasSource(doc) ? '<p class="help note">Pilarna visas när kretsen har en spänningskälla. Dra in ett batteri så dyker de upp.</p>' : ''}
    <div class="subgrp${o.arrows ? '' : ' off'}">
      ${tgl('arrowNames', 'Beteckning vid pilen', '<i>I</i>, <i>I</i>₁, <i>I</i>₂', o.arrowNames, true)}
      ${tgl('arrowValues', 'Strömstyrka vid pilen', 'Klicka på en pil för att skriva in den', o.arrowValues, true)}
      <div class="optrow"><span>Färg på pilarna</span>${seg('arrowBlue', [['0', 'Svart'], ['1', 'Blå']], o.arrowBlue ? 1 : 0)}</div>
      ${hidden ? `<button class="wbtn" data-act="unhide">${IC.check}<span>Visa dolda pilar igen</span></button>` : ''}
    </div>
  </div>
  <div class="grp"><div class="eyebrow">Börja från</div>
    <div class="tpl-grid">${TEMPLATES.map(t => `<button class="tpl" data-act="tpl" data-id="${t.id}">${tplThumb(t)}<span>${t.name}</span></button>`).join('')}</div>
  </div>
  <div class="grp tips"><div class="eyebrow">Så gör du</div>
    <ol>
      <li><b>Dra</b> en komponent till en ledning. Den sätts i serie, och allt fördelas jämnt.</li>
      <li><b>Släpp</b> den bredvid en komponent för att parallellkoppla.</li>
      <li><b>Släpp</b> den på en bred streckad list ovanför eller under flera komponenter för att parallellkoppla över alla dem. Ju längre ut listen sitter, desto fler spänner den över.</li>
      <li><b>Släpp</b> den på en lodrät ledningsbit i en parallellkoppling, så hamnar den i serie med den yttersta grenen men ritas på den lodräta biten.</li>
      <li><b>Klicka</b> på en komponent för att skriva in värden.</li>
      <li><b>Dra bort</b> en komponent till papperskorgen eller tryck Delete.</li>
      <li><b>Kopiera bild</b> och klistra in i Word, PowerPoint eller Google Dokument.</li>
    </ol>
  </div>`;
}
const thumbCache = {};
function tplThumb(t) {
  if (thumbCache[t.id]) return thumbCache[t.id];
  const d = t.make();
  d.opts = Object.assign({}, DEFAULT_OPTS, { names: false, values: false });
  const L = layout(d);
  const { prims } = buildDisplay(d, L.geo, L, { ink: 'currentColor' });
  const bb = bboxOf(prims), p = 6;
  return (thumbCache[t.id] = `<svg viewBox="${r2(bb[0] - p)} ${r2(bb[1] - p)} ${r2(bb[2] - bb[0] + 2 * p)} ${r2(bb[3] - bb[1] + 2 * p)}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${prims.map(primSvg).join('')}</svg>`);
}

inspEl.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.f && sel && sel.kind === 'comp') {
    const c = findItem(doc, sel.id).item;
    if (t.dataset.f === 'name') c.name = t.value;
    else if (t.dataset.f === 'value') c.value = t.value;
    relayout();
  } else if (t.dataset.af && sel && sel.kind === 'arrow') {
    arrowCfg(sel.id, true)[t.dataset.af] = t.value;
    relayout();
  }
});
inspEl.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.opt) {
    if (t.dataset.opt === 'show') { const c = findItem(doc, sel.id).item; c.hide = !t.checked; }
    else doc.opts[t.dataset.opt] = t.checked;
    commit(); refresh(); return;
  }
  if (t.dataset.f || t.dataset.af) commit();
});
inspEl.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') e.target.blur(); });
inspEl.addEventListener('click', e => {
  const sb = e.target.closest('.seg button');
  if (sb) {
    const name = sb.parentElement.dataset.seg, v = sb.dataset.v;
    if (name === 'closed') findItem(doc, sel.id).item.closed = v === '1';
    else if (name === 'arrowBlue') doc.opts.arrowBlue = v === '1';
    else if (name === 'aside') {
      const pl = planFor(sel.id);
      const g = lay.geo['arr:' + (sel.id === 'main' ? doc.loop[pl.side].id : sel.id)];
      const horiz = Math.abs(Math.cos(g.ang * Math.PI / 180)) > 0.5;
      const cur = horiz ? (g.lsy < 0 ? 'a' : 'b') : (g.lsx < 0 ? 'a' : 'b');
      if (cur !== v) { const cf = arrowCfg(sel.id, true); cf.lflip = !cf.lflip; }
    }
    commit(); refresh(); return;
  }
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const act = b.dataset.act;
  if (act === 'del') return deleteSelected();
  if (act === 'tpl') {
    const t = TEMPLATES.find(x => x.id === b.dataset.id);
    const nd = t.make();
    nd.opts = doc.opts;
    doc = nd; sel = null; commit(); refresh();
    markUsed();
    toast(`${t.name} är inlagd.`, 'Ångra', undo);
    return;
  }
  if (act === 'unhide') { doc.arrowMain.hidden = false; for (const k in doc.arrowCfg) doc.arrowCfg[k].hidden = false; commit(); refresh(); return; }
  if (sel && sel.kind === 'comp') {
    const f = findItem(doc, sel.id), c = f.item;
    if (act === 'flip') c.flip = !c.flip;
    if (act === 'span') spanEdit(f.ctx.par, b.dataset.op, b.dataset.dir);
    if (act === 'mirror') f.ctx.par.side = f.ctx.par.side === 'out' ? 'in' : 'out';
    if (act === 'swap') {
      const old = TYPES[c.type], nt = TYPES[b.dataset.type];
      c.type = b.dataset.type;
      if (old.unit !== nt.unit || !nt.field) c.value = '';
      if (old.prefix !== nt.prefix) c.name = '';
    }
    commit(); refresh(); return;
  }
  if (sel && sel.kind === 'arrow') {
    const cf = arrowCfg(sel.id, true);
    if (act === 'aflip') cf.flip = !cf.flip;
    if (act === 'ahide') { cf.hidden = true; sel = null; }
    if (act === 'aprev' || act === 'anext') moveArrow(sel.id, act === 'anext' ? 1 : -1);
    commit(); refresh(); return;
  }
});
function moveArrow(key, step) {
  const pl = planFor(key);
  if (key === 'main') {
    const cands = [];
    for (const s of allowedArrowSides(lay.stretched, doc)) for (let i = 0; i <= doc.loop[s].items.length; i++) cands.push([s, i]);
    let i = cands.findIndex(c => c[0] === pl.side && c[1] === pl.gap);
    i = (i + step + cands.length) % cands.length;
    doc.arrowMain.side = cands[i][0]; doc.arrowMain.gap = cands[i][1];
  } else {
    const S = findSeries(doc, key), n = S.items.length + 1;
    arrowCfg(key, true).gap = (pl.gap + step + n) % n;
  }
}

/* ================= Tangentbord ================= */
document.addEventListener('keydown', e => {
  const inField = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
  const mod = e.ctrlKey || e.metaKey;
  if (mod && !e.altKey && (e.key === 'z' || e.key === 'Z') && !inField) { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
  if (mod && (e.key === 'y' || e.key === 'Y') && !inField) { e.preventDefault(); redo(); return; }
  if (mod && (e.key === 'c' || e.key === 'C') && !inField && !String(window.getSelection() || '')) { e.preventDefault(); copyImage(); return; }
  if (inField) { if (e.key === 'Escape') e.target.blur(); return; }
  if (e.key === 'Escape') { if (drag && drag.moving) endDrag(true); else select(null); return; }
  if ((e.key === 'Delete' || e.key === 'Backspace') && sel) { e.preventDefault(); deleteSelected(); return; }
  if (sel && sel.kind === 'comp' && !mod && /^[0-9?,.]$/.test(e.key)) {
    const inp = inspEl.querySelector('#f-val');
    if (inp) { inp.focus(); inp.select(); }
  }
});

/* ================= Export och delning ================= */
async function copyImage() {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) throw new Error('ingen urklippsåtkomst');
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob(doc) })]);
    toast('Bilden är kopierad. Klistra in med Ctrl+V (Cmd+V på Mac) i ditt dokument.', null, null, true);
  } catch (err) {
    download(await pngBlob(doc), fileName('png'));
    toast('Webbläsaren tillät inte kopiering här, så bilden laddades ned i stället.');
  }
}
async function copyLink() {
  const url = location.origin + location.pathname + '#s=' + encodeDoc(doc);
  try { await navigator.clipboard.writeText(url); toast('Länken är kopierad. Den öppnar exakt det här schemat.', null, null, true); }
  catch (e) { history.replaceState(null, '', url); toast('Länken står nu i adressfältet. Kopiera den därifrån.'); }
}
const menuEl = $('#exportMenu');
$('#copyBtn').addEventListener('click', copyImage);
$('#moreBtn').addEventListener('click', e => { e.stopPropagation(); renderMenu(); menuEl.classList.toggle('open'); });
document.addEventListener('pointerdown', e => { if (!e.target.closest('.split')) menuEl.classList.remove('open'); });
function renderMenu() {
  menuEl.innerHTML = `
    <button class="mi" data-m="copy">${IC.copy}<span>Kopiera bild<small>För Word, PowerPoint och Google Dokument</small></span></button>
    <button class="mi" data-m="png"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg><span>Ladda ned som PNG<small>Bildfil med hög upplösning</small></span></button>
    <button class="mi" data-m="svg"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg><span>Ladda ned som SVG<small>Vektorbild som går att skala fritt</small></span></button>
    <button class="mi" data-m="link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg><span>Kopiera länk till schemat<small>Spara eller dela för att fortsätta senare</small></span></button>
    <hr>
    <div class="mrow"><span>Storlek i dokumentet</span>${seg('size', [['S', 'Liten'], ['M', 'Mellan'], ['L', 'Stor']], doc.opts.size)}</div>
    <label class="tgl sub"><input type="checkbox" id="transp"${doc.opts.transparent ? ' checked' : ''}><span class="sw"></span><span class="tx">Genomskinlig bakgrund</span></label>`;
}
menuEl.addEventListener('click', async e => {
  const sb = e.target.closest('.seg button');
  if (sb) { doc.opts.size = sb.dataset.v; save(); renderMenu(); return; }
  const b = e.target.closest('[data-m]');
  if (!b) return;
  menuEl.classList.remove('open');
  const m = b.dataset.m;
  if (m === 'copy') copyImage();
  if (m === 'png') download(await pngBlob(doc), fileName('png'));
  if (m === 'svg') { await ensureFonts(); download(new Blob([sceneSvg(exportScene(doc), SIZES[doc.opts.size] || SIZES.M, doc.opts.transparent)], { type: 'image/svg+xml' }), fileName('svg')); }
  if (m === 'link') copyLink();
});
menuEl.addEventListener('change', e => { if (e.target.id === 'transp') { doc.opts.transparent = e.target.checked; save(); } });

/* ================= Toast ================= */
const toastEl = $('#toast');
let toastT = 0;
function toast(msg, actLabel, actFn, ok) {
  toastEl.innerHTML = `${ok ? `<span class="tk">${IC.check}</span>` : ''}<span>${esc(msg)}</span>${actLabel ? `<button type="button">${esc(actLabel)}</button>` : ''}`;
  if (actLabel) toastEl.querySelector('button').onclick = () => { actFn(); toastEl.classList.remove('on'); };
  toastEl.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('on'), actLabel ? 5200 : 3600);
}

/* ================= Palett ================= */
function buildPalette() {
  const groups = [['kalla', 'Källor'], ['komp', 'Komponenter'], ['mat', 'Mätare']];
  paletteEl.innerHTML = groups.map(([g, t]) => `
    <div class="pal-g"><div class="eyebrow">${t}</div><div class="tiles">
      ${Object.keys(TYPES).filter(k => TYPES[k].group === g).map(k => `<button class="tile" data-type="${k}" title="Dra till en ledning, eller klicka för att lägga till">${iconSvg(k, 66, 44)}<span>${TYPES[k].name}</span></button>`).join('')}
    </div></div>`).join('') + '<p class="pal-hint">Dra till en ledning i schemat, eller klicka för att lägga till.</p>';
}

/* ================= Kom igång-animation ================= */
// Första besöket: ett spöke av en resistor glider från paletten till en
// ledning, om och om igen, tills användaren själv har lagt till något.
let coachAnim = null, coachTimer = 0;
function isUsed() { try { return localStorage.getItem(USED_KEY) === '1'; } catch (e) { return false; } }
function markUsed() { try { localStorage.setItem(USED_KEY, '1'); } catch (e) { /* */ } stopCoach(); }
function stopCoach() { clearTimeout(coachTimer); if (coachAnim) coachAnim.cancel(); coachAnim = null; $('#coach').classList.remove('on'); $('#coachGhost').classList.remove('on'); }
function runCoach() {
  if (isUsed() || window.innerWidth < 860) return;
  const tile = paletteEl.querySelector('.tile[data-type="resistor"]');
  const si = lay.info.series.find(x => x.S.id === 's-top');
  if (!tile || !si || !view.geoNow) return;
  const gp = si.gaps[si.gaps.length - 1];
  const c = view.geoNow.cam, r = svgEl.getBoundingClientRect();
  const tx = r.left + c.tx + c.k * (gp[0][0] + gp[1][0]) / 2, ty = r.top + c.ty + c.k * (gp[0][1] + gp[1][1]) / 2;
  const tr = tile.getBoundingClientRect();
  const sx = tr.left + tr.width / 2, sy = tr.top + tr.height / 2 - 6;
  const gh = $('#coachGhost');
  gh.innerHTML = iconSvg('resistor', 72 * c.k * 0.9, 48 * c.k * 0.9) + '<svg class="hand" width="26" height="26" viewBox="0 0 24 24"><path d="M5 3l14 7-6 1.6L10.5 18z" fill="#0f1620" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  gh.classList.add('on');
  $('#coach').classList.add('on');
  coachAnim = gh.animate([
    { transform: `translate(${sx}px, ${sy}px) translate(-50%,-50%) scale(.7)`, opacity: 0 },
    { transform: `translate(${sx}px, ${sy}px) translate(-50%,-50%) scale(.9)`, opacity: 1, offset: 0.12 },
    { transform: `translate(${tx}px, ${ty}px) translate(-50%,-50%) scale(1)`, opacity: 1, offset: 0.7, easing: 'ease-in-out' },
    { transform: `translate(${tx}px, ${ty}px) translate(-50%,-50%) scale(1)`, opacity: 0, offset: 1 },
  ], { duration: 2600, easing: 'cubic-bezier(.5,0,.3,1)', iterations: Infinity, delay: 300 });
}

/* ================= Start ================= */
function updateUndo() {
  $('#undoBtn').disabled = hist.i <= 0;
  $('#redoBtn').disabled = hist.i >= hist.stack.length - 1;
}
$('#undoBtn').addEventListener('click', undo);
$('#redoBtn').addEventListener('click', redo);
$('#trash').innerHTML = IC.trash + '<span>Släpp här för att ta bort</span>';
$('#coach .x').addEventListener('click', markUsed);

buildPalette();
commit();
refresh({ instant: true });
if (location.hash.includes('s=')) history.replaceState(null, '', location.pathname);
new ResizeObserver(() => { if (!drag) { show(view.doc, view.lay, { instant: true }); } }).observe(svgEl);
document.fonts.ready.then(() => {
  Object.keys(thumbCache).forEach(k => delete thumbCache[k]);
  lay = layout(doc); show(doc, lay, { instant: true }); renderInspector();
  coachTimer = setTimeout(runCoach, 900);
});

// Öppnas för felsökning och automatiska tester (se .shots/).
window.KOPPLINGSSCHEMA = { get doc() { return doc; }, layout, buildDisplay, exportScene, sceneSvg, pngBlob, TEMPLATES, formatValue };
})();

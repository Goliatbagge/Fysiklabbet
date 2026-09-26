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
const END_CLEAR = 8;                    // strömpilens etikett mot en nod eller ett hörn
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
  switch:    { name: 'Strömbrytare', group: 'komp', len: 24, hl: 13, ho: 13, prefix: '', italic: false },
  cap:       { name: 'Kondensator', group: 'komp', len: 8, hl: 13, ho: 13, prefix: 'C', italic: true, unit: 'µF', base: 'F', field: 'Kapacitans', ph: 'till exempel 100' },
  diode:     { name: 'Diod', group: 'komp', len: 16, hl: 9, ho: 9, prefix: '', italic: false, polar: true, polarText: 'Vänd riktning' },
  led:       { name: 'Lysdiod', group: 'komp', len: 16, hl: 20, ho: 9, prefix: '', italic: false, polar: true, polarText: 'Vänd riktning' },
  ammeter:   { name: 'Amperemeter', group: 'mat', len: 28, hl: 14, ho: 14, prefix: '', italic: false, unit: 'A', base: 'A', field: 'Avläsning', ph: 'till exempel 0,50' },
  voltmeter: { name: 'Voltmeter', group: 'mat', len: 28, hl: 14, ho: 14, prefix: '', italic: false, unit: 'V', base: 'V', field: 'Avläsning', ph: 'till exempel 4,5' },
};
const DEFAULT_OPTS = { names: true, values: true, autoCalc: true, arrows: false, subArrows: true, arrowBlue: false, size: 'M', transparent: false };

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
// En stege (en sidas enda parallellkoppling, stegpinnar mellan sidoledningarna)
// där en gren i sin tur bara är en parallellkoppling över hela grenen är
// elektriskt samma sak som en stege med fler grenar. Slå ihop dem, så att
// alla grenar fördelas jämnt (den jämna fördelningen gäller bara stegens
// egna grenar). Ordningen väljs så att figuren ser likadan ut som förut.
function flattenLadder(P) {
  if (hasLegs(P)) return;
  const sP = P.side === 'out' ? 1 : -1;   // stegens staplingsriktning (sidans L = +1)
  for (let changed = true; changed;) {
    changed = false;
    for (let k = 0; k < P.branches.length; k++) {
      const b = P.branches[k], Q = b.items.length === 1 ? b.items[0] : null;
      if (!Q || Q.kind !== 'par' || !Q.full || hasLegs(Q)) continue;
      const Lk = k === 0 ? -sP : sP;
      const qDir = Q.side === 'out' ? Lk : -Lk;
      const seq = qDir === sP ? Q.branches : Q.branches.slice().reverse();
      P.branches.splice(k, 1, ...seq);
      changed = true;
      break;
    }
  }
}
function normalize(doc) {
  for (const s of SIDES) {
    normSeries(doc.loop[s]);
    const it = doc.loop[s].items;
    if (it.length === 1 && it[0].kind === 'par' && it[0].side !== 'out') flattenLadder(it[0]);
  }
  return doc;
}
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
// Enheter skrivs alltid med prefix- och enhetstecken: "20 milliohm",
// "20 m ohm" och "20 mohm" blir 20 mΩ, "3 mikroampere" och "3 uA" blir
// 3 µA. Grekiskt μ görs om till mikrotecknet µ, som resten av sidan använder.
const PREFIX_WORDS = { mega: 'M', kilo: 'k', milli: 'm', mikro: 'µ', micro: 'µ', nano: 'n', piko: 'p', pico: 'p' };
const UNIT_WORDS = { ohm: 'Ω', volt: 'V', ampere: 'A', amp: 'A', farad: 'F' };
function normUnits(s) {
  return String(s)
    .replace(/μ/g, 'µ')
    .replace(/(mega|kilo|milli|mikro|micro|nano|piko|pico)?\s*(ohm|volt|ampere|amp|farad)\b/gi,
      (m0, p, u) => (p ? PREFIX_WORDS[p.toLowerCase()] : '') + UNIT_WORDS[u.toLowerCase()])
    .replace(/\b(mega|kilo|milli|mikro|micro|nano|piko|pico)\b/gi, (m0, p) => PREFIX_WORDS[p.toLowerCase()])
    .replace(/(\d)\s*u(?=[A-Za-zΩ]|$)/g, '$1µ')
    .replace(/(\d\s*)([kMmµnp])\s+([ΩVAF])$/, '$1$2$3');
}
function formatValue(raw, unit, base) {
  let s = String(raw || '').trim();
  if (!s) return '';
  if (s === '?') return '?';
  s = normUnits(s);
  const m = s.match(/^([−-]?\d[\d\s ]*(?:[.,]\d+)?)\s*(.*)$/);
  if (!m) return s;
  let num = m[1].replace(/[\s ]/g, '').replace('.', ',').replace('-', '−');
  num = groupThousands(num);
  let rest = m[2].trim();
  if (!rest) rest = unit || '';
  else if (/^[kMmµnpG]$/.test(rest) && base) rest = rest + base;
  return rest ? num + ' ' + rest : num;
}
/* ================= Enheter ================= */
// Enheten väljs per komponent (c.unit) och per strömpil (cfg.unit). Utan val
// gäller typens standardenhet. Ett värde som bara är ett tal tolkas i den
// valda enheten: "20" med mΩ betyder 0,020 Ω, både i etiketten och i
// kretsberäkningen.
const UNIT_OPTS = {
  'Ω': [['MΩ', 'megaohm'], ['kΩ', 'kiloohm'], ['Ω', 'ohm'], ['mΩ', 'milliohm'], ['µΩ', 'mikroohm']],
  V: [['kV', 'kilovolt'], ['V', 'volt'], ['mV', 'millivolt'], ['µV', 'mikrovolt']],
  A: [['A', 'ampere'], ['mA', 'milliampere'], ['µA', 'mikroampere']],
  F: [['F', 'farad'], ['mF', 'millifarad'], ['µF', 'mikrofarad'], ['nF', 'nanofarad'], ['pF', 'pikofarad']],
};
const isBareNumber = v => /^\s*[−-]?\d[\d\s\u00a0]*(?:[.,]\d+)?\s*$/.test(String(v || ''));
// Värdet med sin enhet, så som beräkningen ska tolka det.
const withUnit = (value, unit) => (unit && isBareNumber(value) ? String(value).trim() + ' ' + unit : value);
const compUnit = c => c.unit || TYPES[c.type].unit;

function compLabel(doc, c, auto, calc) {
  if (c.hide) return null;
  const T = TYPES[c.type];
  const runs = [];
  if (doc.opts.names) {
    const nm = c.name ? parseName(c.name) : auto;
    if (nm) nameRuns(nm, T.italic, runs);
  }
  if (doc.opts.values) {
    const v = formatValue(c.value || calc || '', compUnit(c), T.base);
    // En kursiv beteckning är en storhet (R₁ = 20 Ω). En rak beteckning
    // namnger ett objekt, och en lampa är inte "lika med" 6 V: L₁ (6 V).
    if (v && runs.length && !T.italic) runs.push({ s: ' (' + v + ')' });
    else if (v) { if (runs.length) runs.push({ s: ' = ' }); runs.push({ s: v }); }
  }
  return runs.length ? runs : null;
}
function arrowRuns(doc, name, value, unit) {
  const runs = [];
  // Pilens beteckning och strömstyrka följer samma reglage som komponenternas
  // beteckningar och värden. En enskild ström döljs med ? i pilens fält.
  if (doc.opts.names) { const nm = parseName(name); if (nm) nameRuns(nm, true, runs); }
  if (doc.opts.values) {
    const v = formatValue(value, unit || 'A', 'A');
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

/* ================= Kretsberäkning ================= */
// Räknar ut de värden som följer entydigt av de givna, så att läraren inte
// behöver räkna själv: 12 V och 15 Ω ger I = 0,80 A, och omvänt ger 15 Ω och
// 0,80 A spänningen 12 V.
//
// FYSIKMODELL (likström, stationärt tillstånd):
//   batteri            ideal spänningskälla utan inre resistans; pluspolen
//                      är det långa strecket
//   resistor           resistans R (variabel resistor likaså)
//   lampa              resistans bara om värdet anges i Ω, annars okänd
//                      (märkningen "6 V" är ingen resistans)
//   amperemeter        ideal: 0 Ω
//   voltmeter          ideal: oändlig resistans, leder ingen ström
//   kondensator        spärrar likström (fulladdad)
//   strömbrytare       öppen = avbrott, sluten = ledning
//   diod, lysdiod,
//   växelspänning      olinjära eller tidsberoende: då räknas inget ut
//
// METOD: nodanalys (MNA). Varje ledare får en strömmätare på 0 V i början,
// så att strömmen i varje gren blir en obekant i ekvationssystemet. Okända
// batterispänningar och resistanser blir parametrar som anpassas till de
// givna strömmarna och mätarvärdena (Levenberg-Marquardt, resistanserna på
// logaritmisk skala så att de förblir positiva). Ett värde fylls i BARA om
// det är entydigt bestämt: det får inte ändras längs någon riktning i
// parameterrummet som de givna värdena lämnar fri (nollrummet till
// jacobianen). Går de givna värdena inte ihop inom sin avrundning fylls
// ingenting i. Svaret avrundas till lika många värdesiffror som det minst
// noggranna givna värdet, dock minst två.
const PREFIX = { k: 1e3, M: 1e6, G: 1e9, m: 1e-3, 'µ': 1e-6, u: 1e-6, n: 1e-9, p: 1e-12 };
const NUM_RE = /^([−-]?\d[\d\s\u00a0]*(?:[.,]\d+)?)\s*(.*)$/;
function sigFigs(numStr) {
  let t = String(numStr).replace(/[−\-\s\u00a0]/g, '');
  const dec = /[.,]/.test(t);
  t = t.replace(/[.,]/, '').replace(/^0+/, '');
  if (!dec) t = t.replace(/0+$/, '');
  return Math.max(1, t.length);
}
// "12" → 12, "2,5 k" → 2500, "500 mA" → 0,5. Fel enhet ger null.
function parseQty(raw, unit) {
  let t = String(raw || '').trim();
  if (!t || t === '?') return null;
  t = normUnits(t);
  const m = t.match(NUM_RE);
  if (!m) return null;
  const v = parseFloat(m[1].replace(/[\s\u00a0]/g, '').replace(',', '.').replace('−', '-'));
  if (!isFinite(v)) return null;
  let rest = m[2].trim(), f = 1;
  if (rest && PREFIX[rest[0]] !== undefined && (rest.length === 1 || rest.slice(1) === unit)) { f = PREFIX[rest[0]]; rest = rest.slice(1); }
  if (rest && rest !== unit) return null;
  const decs = (m[1].split(/[.,]/)[1] || '').length;
  return { v: v * f, sig: sigFigs(m[1]), tol: Math.max(0.5 * Math.pow(10, -decs) * f, 1e-12 * Math.abs(v * f)) };
}
function fmtSig(v, n) {
  if (!isFinite(v)) return '';
  if (Math.abs(v) < 1e-12) return '0';
  v = Number(v.toPrecision(n));   // avrunda först, så att 0,0999… räknas som 0,10
  const e = Math.floor(Math.log10(Math.abs(v)) + 1e-12);
  const dec = n - 1 - e;
  if (dec >= 0) {
    const t = v.toFixed(dec);
    return parseFloat(t) === 0 ? '0' : t.replace('.', ',');
  }
  const f = Math.pow(10, -dec);
  return String(Math.round(v / f) * f);
}
// Kretsträdet → nät med noder. Sidorna går medurs från övre vänstra hörnet;
// varje komponent sitter mellan sin ingångsnod och utgångsnod längs u.
function buildNet(doc) {
  const par = [];
  const mk = () => { par.push(par.length); return par.length - 1; };
  const find = x => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
  const merge = (a, b) => { a = find(a); b = find(b); if (a !== b) par[a] = b; };
  const R = [], V = [], meters = [], params = [], sigs = [];
  let unsupported = null;
  const blank = c => !String(c.value || '').trim();
  function comp(c, x, y) {
    switch (c.type) {
      case 'resistor': case 'varres': case 'lamp': {
        const q = (c.type !== 'lamp' || /Ω|ohm/i.test(c.value || '')) ? parseQty(withUnit(c.value, c.unit), 'Ω') : null;
        if (q && q.v === 0) merge(x, y);
        else if (q && q.v > 0) { R.push({ a: x, b: y, val: q.v }); sigs.push(q.sig); }
        else { params.push({ cid: c.id, kind: 'R', fill: c.type !== 'lamp' && blank(c) }); R.push({ a: x, b: y, pi: params.length - 1 }); }
        break;
      }
      case 'battery': {
        const q = parseQty(withUnit(c.value, c.unit), 'V');
        const plus = c.flip ? x : y, minus = c.flip ? y : x;
        if (q) { V.push({ p: plus, n: minus, val: q.v, kind: 'bat' }); sigs.push(q.sig); }
        else { params.push({ cid: c.id, kind: 'E', fill: blank(c) }); V.push({ p: plus, n: minus, pi: params.length - 1, kind: 'bat' }); }
        break;
      }
      case 'ammeter': V.push({ p: x, n: y, val: 0, kind: 'amm', cid: c.id }); break;
      case 'voltmeter': meters.push({ a: x, b: y, cid: c.id }); break;
      case 'cap': break;
      case 'switch': if (c.closed) merge(x, y); break;
      default: unsupported = unsupported || c.type;
    }
  }
  function chain(S, a, b) {
    const x0 = mk();
    V.push({ p: a, n: x0, val: 0, kind: 'probe', sid: S.id });
    if (!S.items.length) { merge(x0, b); return; }
    let x = x0;
    S.items.forEach((it, i) => {
      const y = i === S.items.length - 1 ? b : mk();
      if (it.kind === 'comp') comp(it, x, y);
      else it.branches.forEach((br, k) => {
        if (k === 0 && hasLegs(it)) {
          const n1 = mk(), n2 = mk();
          opt(it.legA, x, n1); chain(br, n1, n2); opt(it.legB, n2, y);
        } else chain(br, x, y);
      });
      x = y;
    });
  }
  const opt = (S, a, b) => (S ? chain(S, a, b) : merge(a, b));
  const TL = mk();
  let cur = TL;
  SIDES.forEach((sd, i) => { const y = i === 3 ? TL : mk(); chain(doc.loop[sd], cur, y); cur = y; });
  // Nodnumrering efter sammanslagningarna. Jord = övre vänstra hörnet.
  const gnd = find(TL), index = new Map();
  let nN = 0;
  const idx = node => { const r = find(node); if (r === gnd) return -1; if (!index.has(r)) index.set(r, nN++); return index.get(r); };
  for (const e of R) { e.i = idx(e.a); e.j = idx(e.b); }
  for (const e of V) { e.i = idx(e.p); e.j = idx(e.n); }
  for (const e of meters) { e.i = idx(e.a); e.j = idx(e.b); }
  // Ledande sammanhang: en voltmeter mellan två delar som inte hänger ihop
  // via ledande element visar ett obestämt värde.
  const cp = new Map();
  const cf = x => { while (cp.has(x) && cp.get(x) !== x) x = cp.get(x); return x; };
  const cu = (a, b) => { a = cf(a); b = cf(b); if (a !== b) cp.set(a, b); };
  for (const e of R) cu(e.i, e.j);
  for (const e of V) cu(e.i, e.j);
  for (const e of meters) e.linked = cf(e.i) === cf(e.j);
  // Delar av nätet som saknar ledande förbindelse med jord (bakom en
  // voltmeter, kondensator eller öppen brytare) låses vid en av sina noder.
  // Ingen ström kan gå genom låsningen, eftersom den är delens enda väg ut.
  const ties = [], seen = new Set([cf(-1)]);
  for (let i = 0; i < nN; i++) { const r = cf(i); if (!seen.has(r)) { seen.add(r); ties.push(i); } }
  return { R, V, meters, params, sigs, nN, unsupported, ties };
}
function gauss(A, n) {
  let mx = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) mx = Math.max(mx, Math.abs(A[i][j]));
  const eps = 1e-13 * (mx || 1);
  for (let c = 0; c < n; c++) {
    let pr = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[pr][c])) pr = r;
    if (Math.abs(A[pr][c]) < eps) return null;
    if (pr !== c) { const t = A[pr]; A[pr] = A[c]; A[c] = t; }
    for (let r = c + 1; r < n; r++) {
      const f = A[r][c] / A[c][c];
      if (!f) continue;
      for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k];
    }
  }
  const x = new Float64Array(n);
  for (let r = n - 1; r >= 0; r--) {
    let sum = A[r][n];
    for (let k = r + 1; k < n; k++) sum -= A[r][k] * x[k];
    x[r] = sum / A[r][r];
  }
  return x;
}
function simulate(net, pv) {
  const { nN, R, V } = net, M = V.length, n = nN + M;
  const A = Array.from({ length: n }, () => new Float64Array(n + 1));
  for (const e of R) {
    const val = e.pi != null ? pv[e.pi] : e.val;
    if (!(val > 0) || !isFinite(val)) return null;
    const g = 1 / val;
    if (e.i >= 0) A[e.i][e.i] += g;
    if (e.j >= 0) A[e.j][e.j] += g;
    if (e.i >= 0 && e.j >= 0) { A[e.i][e.j] -= g; A[e.j][e.i] -= g; }
  }
  for (const i of net.ties) A[i][i] += 1;   // låser isolerade delar (se buildNet)
  V.forEach((e, k) => {
    const row = nN + k;
    if (e.i >= 0) { A[e.i][row] += 1; A[row][e.i] += 1; }
    if (e.j >= 0) { A[e.j][row] -= 1; A[row][e.j] -= 1; }
    A[row][n] = e.pi != null ? pv[e.pi] : e.val;
  });
  const x = gauss(A, n);
  if (!x) return null;
  const pot = i => (i < 0 ? 0 : x[i]);
  return { pot, cur: k => x[nN + k] };   // cur = ström från p genom källan till n
}
function jacobiEig(A, n) {
  const a = A.map(r => r.slice()), v = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] * a[i][j];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(a[p][q]) < 1e-300) continue;
      const th = (a[q][q] - a[p][p]) / (2 * a[p][q]);
      const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
      const c = 1 / Math.sqrt(t * t + 1), sn = t * c;
      for (let k = 0; k < n; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = c * x - sn * y; a[k][q] = sn * x + c * y; }
      for (let k = 0; k < n; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = c * x - sn * y; a[q][k] = sn * x + c * y; }
      for (let k = 0; k < n; k++) { const x = v[k][p], y = v[k][q]; v[k][p] = c * x - sn * y; v[k][q] = sn * x + c * y; }
    }
  }
  return { vals: a.map((r, i) => r[i]), vecs: Array.from({ length: n }, (_, j) => v.map(r => r[j])) };
}
function solveSym(A, b, n) {
  const M = A.map((r, i) => { const row = new Float64Array(n + 1); r.forEach((x, j) => { row[j] = x; }); row[n] = b[i]; return row; });
  return gauss(M, n);
}
const solveCache = new Map();
function solveCircuit(doc, plan0) {
  if (!doc.opts.autoCalc) return null;
  const key = JSON.stringify([doc.loop, Object.keys(plan0).map(k => [k, plan0[k].dir, plan0[k].key === 'main' ? doc.arrowMain.value : (doc.arrowCfg[k] || {}).value])]);
  if (solveCache.has(key)) return solveCache.get(key);
  const res = solveCore(doc, plan0);
  if (solveCache.size > 40) solveCache.delete(solveCache.keys().next().value);
  solveCache.set(key, res);
  return res;
}
function solveCore(doc, plan0) {
  const empty = status => ({ status, comp: {}, arrow: {} });
  const net = buildNet(doc);
  if (net.unsupported) return empty('unsupported');
  if (!net.V.some(e => e.kind === 'bat')) return null;
  const probeK = {};
  net.V.forEach((e, k) => { if (e.kind === 'probe') probeK[e.sid] = k; });
  const ammK = {};
  net.V.forEach((e, k) => { if (e.kind === 'amm') ammK[e.cid] = k; });
  const comps = {};
  for (const c of allComps(doc)) comps[c.id] = c;

  // Utdata: strömmen längs varje pils referensriktning, mätarnas utslag
  // och parametrarna själva.
  const outs = [];
  for (const sid in plan0) {
    const cf = plan0[sid].key === 'main' ? doc.arrowMain : (doc.arrowCfg[plan0[sid].key] || {});
    outs.push({ kind: 'arrow', sid, dir: plan0[sid].dir, raw: withUnit(cf.value, cf.unit), unit: cf.unit });
  }
  for (const m of net.meters) outs.push({ kind: 'volt', m, cid: m.cid, raw: withUnit(comps[m.cid].value, comps[m.cid].unit), unit: comps[m.cid].unit });
  for (const cid in ammK) outs.push({ kind: 'amm', k: ammK[cid], cid, raw: withUnit(comps[cid].value, comps[cid].unit), unit: comps[cid].unit });
  net.params.forEach((pp, i) => outs.push({ kind: 'param', i, cid: pp.cid, fill: pp.fill, unit: comps[pp.cid].unit }));
  // Givna mätvärden (strömmar och mätarutslag).
  const meas = [];
  outs.forEach((o, oi) => {
    if (o.kind === 'param') return;
    const q = parseQty(o.raw, o.kind === 'volt' ? 'V' : 'A');
    if (q) { meas.push({ oi, v: q.v, tol: q.tol, abs: o.kind !== 'arrow' }); net.sigs.push(q.sig); }
  });
  const np = net.params.length;
  const toPv = q => net.params.map((pp, i) => (pp.kind === 'R' ? Math.exp(q[i]) : q[i]));
  const evalOuts = q => {
    const pv = toPv(q), sim = simulate(net, pv);
    if (!sim) return null;
    return outs.map(o => {
      if (o.kind === 'arrow') return o.dir * sim.cur(probeK[o.sid]);
      if (o.kind === 'amm') return sim.cur(o.k);
      if (o.kind === 'volt') return sim.pot(o.m.i) - sim.pot(o.m.j);
      return pv[o.i];
    });
  };
  const resid = y => meas.map(m => ((m.abs ? Math.abs(y[m.oi]) : y[m.oi]) - m.v) / m.tol);
  let q = net.params.map(pp => (pp.kind === 'R' ? Math.log(10) : 10));
  let y = evalOuts(q);
  if (!y) return empty('singular');
  const dot = (a, b) => a.reduce((s2, x, i) => s2 + x * b[i], 0);
  const numJac = (f, q0, f0) => {
    const cols = [];
    for (let j = 0; j < np; j++) {
      const h = 1e-6 * (1 + Math.abs(q0[j])), q1 = q0.slice();
      q1[j] += h;
      const f1 = f(q1);
      if (!f1) return null;
      cols.push(f1.map((v, i) => (v - f0[i]) / h));
    }
    return f0.map((_, i) => cols.map(c => c[i]));   // rader = utdata, kolumner = parametrar
  };
  // Anpassa de okända parametrarna till de givna värdena.
  if (np && meas.length) {
    let r = resid(y), cost = dot(r, r), lam = 1e-3;
    const fr = qq => { const yy = evalOuts(qq); return yy ? resid(yy) : null; };
    for (let it = 0; it < 200 && cost > 1e-20; it++) {
      const J = numJac(fr, q, r);
      if (!J) break;
      const A = Array.from({ length: np }, (_, a) => Array.from({ length: np }, (_, b) => J.reduce((s2, row) => s2 + row[a] * row[b], 0)));
      const g = Array.from({ length: np }, (_, a) => J.reduce((s2, row, i) => s2 + row[a] * r[i], 0));
      let ok = false;
      for (let t = 0; t < 12 && !ok; t++) {
        const Ad = A.map((row, i) => row.map((v, j) => (i === j ? v + lam * (v + 1e-9) + 1e-15 : v)));
        const d = solveSym(Ad, g.map(v => -v), np);
        if (d) {
          const qn = q.map((v, i) => v + d[i]), rn = fr(qn);
          if (rn && dot(rn, rn) < cost) { q = qn; r = rn; cost = dot(rn, rn); lam = Math.max(lam / 3, 1e-12); ok = true; break; }
        }
        lam *= 4;
      }
      if (!ok) break;
    }
    y = evalOuts(q);
    if (!y) return empty('singular');
  }
  // Stämmer de givna värdena med varandra (inom sin avrundning)?
  if (meas.length && resid(y).some(v => Math.abs(v) > 1.0001)) return empty('inconsistent');
  // Vilka utdata är entydigt bestämda? Nollrummet till jacobianen för de
  // givna värdena är de parameterriktningar som värdena lämnar fria.
  let nulls = [];
  let G = null;
  if (np) {
    G = numJac(evalOuts, q, y);
    if (!G) return empty('singular');
    if (!meas.length) nulls = Array.from({ length: np }, (_, i) => Array.from({ length: np }, (_, j) => (i === j ? 1 : 0)));
    else {
      const Jm = meas.map(m => G[m.oi].map(v => v / m.tol));
      const A = Array.from({ length: np }, (_, a) => Array.from({ length: np }, (_, b) => Jm.reduce((s2, row) => s2 + row[a] * row[b], 0)));
      const { vals, vecs } = jacobiEig(A, np);
      const top = Math.max(...vals.map(Math.abs), 1e-300);
      vals.forEach((v, i) => { if (Math.abs(v) <= 1e-9 * top) nulls.push(vecs[i]); });
    }
  }
  const determined = oi => {
    const o = outs[oi];
    if (o.kind === 'volt' && !o.m.linked) return false;
    if (!nulls.length) return true;
    const scale = Math.max(Math.abs(y[oi]), 1e-9);
    return nulls.every(v => Math.abs(dot(G[oi], v)) <= 1e-6 * scale);
  };
  // Ett uträknat batteri med negativ spänning betyder att det är ritat åt
  // fel håll i förhållande till de givna värdena.
  for (let oi = 0; oi < outs.length; oi++) {
    const o = outs[oi];
    if (o.kind === 'param' && net.params[o.i].kind === 'E' && determined(oi) && y[oi] < -1e-9) return empty('inconsistent');
  }
  const sig = clamp(net.sigs.length ? Math.min(...net.sigs) : 2, 2, 4);
  const res = { status: 'ok', comp: {}, arrow: {}, sig };
  outs.forEach((o, oi) => {
    if (!determined(oi)) return;
    const v = y[oi];
    // I vald enhet: 0,80 A med mA blir "800 mA".
    const inUnit = x => (o.unit && o.unit.length > 1 && PREFIX[o.unit[0]] ? fmtSig(x / PREFIX[o.unit[0]], sig) + ' ' + o.unit : fmtSig(x, sig));
    if (o.kind === 'arrow') { if (!String(o.raw || '').trim()) res.arrow[o.sid] = { text: inUnit(Math.abs(v)), sign: v < -1e-12 ? -1 : 1 }; }
    else if (o.kind === 'volt' || o.kind === 'amm') { if (!String(o.raw || '').trim()) res.comp[o.cid] = inUnit(Math.abs(v)); }
    else if (o.fill) res.comp[o.cid] = inUnit(v);
  });
  return res;
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
// Drivriktningen från spänningskällorna som sitter direkt i serien S (inte i
// dess parallellgrenar), i seriens egen riktning. 0 = ingen källa där.
function seriesDrive(S) {
  let sum = 0, first = 0;
  for (const it of S.items) {
    if (it.kind !== 'comp' || (it.type !== 'battery' && it.type !== 'ac')) continue;
    const sg = it.flip ? -1 : 1;
    if (!first) first = sg;
    const v = it.type === 'battery' ? parseFloat(String(it.value || '').replace(',', '.').replace('−', '-')) : NaN;
    if (isFinite(v)) sum += sg * Math.abs(v);
  }
  return sum > 0 ? 1 : sum < 0 ? -1 : first;
}
function planArrows(doc, stretched, arrowIdx, sol, forSolve) {
  const plan = {};
  // Utan spänningskälla går det ingen ström, så då ritas inga pilar alls.
  if (!doc.opts.arrows || !hasSource(doc)) return plan;
  // BATTERIET I EN EGEN GREN: sitter ingen källa direkt på slingan men en
  // parallellgren på slingan har en, är det den grenen som bär hela
  // strömmen. Dess pil heter då I och sitter vid pluspolen, och slingans
  // egen pil blir en grenström bland de andra. Strömmen går framåt genom
  // källans gren och bakåt genom syskongrenarna, och runt slingan i samma
  // riktning som genom källan.
  const loopSrc = SIDES.some(s => seriesDrive(doc.loop[s]) !== 0);
  let srcBranch = null;
  if (!loopSrc) {
    outer: for (const s of SIDES) for (const it of doc.loop[s].items) {
      if (it.kind !== 'par') continue;
      for (const b of it.branches) if (seriesDrive(b)) { srcBranch = b; break outer; }
    }
  }
  const dir = srcBranch ? seriesDrive(srcBranch) : mainDir(doc);
  const allowed = allowedArrowSides(stretched, doc);
  const mc = doc.arrowMain || {};
  let idx = 0;
  if (!mc.hidden && allowed.length) {
    // Är slingans pil en grenström sätts den helst på en ledning med
    // komponenter, intill dem, precis som grenarnas pilar.
    const withComps = srcBranch && allowed.find(s => doc.loop[s].items.some(it => it.kind === 'comp'));
    const side = allowed.includes(mc.side) ? mc.side : (withComps || defaultArrowSide(doc, allowed));
    const S = doc.loop[side], n = S.items.length;
    const gap = (mc.side === side && mc.gap != null) ? clamp(mc.gap, 0, n)
      : srcBranch ? (dir > 0 ? 0 : n) : defaultMainGap(S, dir);
    const c = !String(mc.value || '').trim() && sol && sol.arrow[S.id];
    let name = 'I';
    if (srcBranch) { idx++; name = 'I' + ((arrowIdx && arrowIdx.main) || idx); }
    plan[S.id] = { key: 'main', side, gap, dir: dir * (mc.flip ? -1 : 1) * (c ? c.sign : 1), lflip: !!mc.lflip, auto: name, numbered: !!srcBranch, total: !srcBranch, runs: arrowRuns(doc, mc.name || name, mc.value || (c ? c.text : ''), mc.unit) };
  }
  const visit = (S, rev, sdir) => {
    const its = rev ? S.items.slice().reverse() : S.items;
    for (const it of its) {
      if (it.kind !== 'par') continue;
      const hasSrc = srcBranch && it.branches.includes(srcBranch);
      for (const b of it.branches) {
        const isSrc = b === srcBranch;
        const bdir = hasSrc ? (isSrc ? dir : -dir) : sdir;
        const cf = doc.arrowCfg[b.id] || {};
        // En gren med bara en voltmeter leder (idealt) ingen ström, så den
        // får ingen pil förrän användaren själv ber om den.
        const voltOnly = b.items.every(x => x.kind === 'comp' && x.type === 'voltmeter');
        if (!soleFullPar(b) && !(cf.hidden != null ? cf.hidden : voltOnly)) {
          const n = b.items.length;
          let name = 'I';
          if (!isSrc) { idx++; name = 'I' + ((arrowIdx && arrowIdx[b.id]) || idx); }
          // Källans gren: pilen sitter strax efter källan, vid pluspolen.
          const gap = cf.gap != null ? clamp(cf.gap, 0, n) : isSrc ? defaultMainGap(b, bdir) : (bdir > 0 ? 0 : n);
          // En uträknad ström som går mot pilen vänder pilen, så att den
          // alltid visar strömmens verkliga riktning.
          const c = !String(cf.value || '').trim() && sol && sol.arrow[b.id];
          plan[b.id] = { key: b.id, gap, dir: bdir * (cf.flip ? -1 : 1) * (c ? c.sign : 1), lflip: !!cf.lflip, auto: name, numbered: !isSrc, total: isSrc, runs: arrowRuns(doc, cf.name || name, cf.value || (c ? c.text : ''), cf.unit) };
        }
        visit(b, rev, bdir);
      }
    }
  };
  visit(doc.loop.top, false, dir); visit(doc.loop.right, false, dir); visit(doc.loop.bottom, true, dir); visit(doc.loop.left, true, dir);
  // "Visa delströmmar" av: bara huvudströmmen I ritas. Beräkningen får ändå
  // med delströmmarna (forSolve), så att givna värden på I₁, I₂ … räknas.
  if (!forSolve && doc.opts.subArrows === false) for (const k in plan) if (plan[k].numbered) delete plan[k];
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
  const arrs = Object.entries(first.plan).filter(([, pl]) => pl.numbered).map(([sid, pl]) => ({ id: pl.key, sid, x: g['arr:' + sid].x, y: g['arr:' + sid].y }));
  const arrowIdx = {};
  arrs.sort(byPos).forEach((a, i) => { arrowIdx[a.id] = i + 1; });
  const same = JSON.stringify(auto) === JSON.stringify(first.auto) && arrs.every(a => first.plan[a.sid].auto === 'I' + arrowIdx[a.id]);
  return same ? first : layoutPass(doc, auto, arrowIdx);
}
function layoutPass(doc, autoIn, arrowIdx) {
  const M = {}, geo = {}, lab = {};
  const auto = autoIn || autoNames(doc);
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
  const sol = solveCircuit(doc, planArrows(doc, stretched, arrowIdx, null, true));
  const plan = planArrows(doc, stretched, arrowIdx, sol);
  for (const c of allComps(doc)) {
    const runs = compLabel(doc, c, auto[c.id], sol && sol.comp[c.id]);
    lab[c.id] = runs ? { runs, tw: runsWidth(runs) } : null;
  }
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
    // Strömpilens etikett behöver bara sin egen bredd plus luft mot det som
    // står intill: grannkomponentens etikett (LABEL_CLEAR) eller, i seriens
    // ände, bara en nod eller ett hörn (END_CLEAR). Etiketten läggs sedan mitt
    // i den fria biten (arrA/arrB), inte mitt i mellanrummet, så att ett
    // värde som "I₁ = 0,20 A" inte blåser upp alla mellanrum i onödan.
    let g = MIN_GAP, arrA = 0, arrB = 0;
    for (let i = 0; i <= n; i++) {
      const a = ms[i - 1], b = ms[i];
      const oa = a ? a.ohE : 0, ob = b ? b.ohS : 0;
      g = Math.max(g, oa + ob + LABEL_CLEAR);
      if (ar && ar.gap === i) {
        if (!ar.runs) g = Math.max(g, ARROW_LEN + 28);
        else {
          arrA = a ? oa + LABEL_CLEAR : END_CLEAR;
          arrB = b ? ob + LABEL_CLEAR : END_CLEAR;
          g = Math.max(g, Math.max(vert ? LH : atw, ARROW_LEN + 8) + arrA + arrB);
        }
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
    return (M[S.id] = { len, pos, neg, ohS: 0, ohE: 0, g, ms, arrA, arrB });
  }
  function groupDepth(S) {
    if (!soleFullPar(S)) return 0;
    const q = M[S.items[0].id];
    return q ? Math.abs(q.offs[q.offs.length - 1]) : 0;
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
    // Är den yttersta grenen en grupp (en parallellkoppling över hela
    // grenen, se zonen 'mid') börjar benet vid gruppens innersta gren.
    const farJ = str ? 0 : order.length - 1;
    const farDepth = groupDepth(P.branches[order[farJ]]);
    const legNeed = Math.max(la ? la.len : 0, lb ? lb.len : 0) + (legged ? farDepth : 0);
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
  // JÄMNA STEGPINNAR: är en sida en sträckt parallellkoppling (stegpinnar
  // mellan sidoledningarna) fördelas hela höjden (eller bredden) jämnt:
  // lika stort avstånd mellan alla grenar OCH från den sista grenen till
  // ledningen mittemot. Annars hamnar all extra höjd i ett enda stort
  // mellanrum ovanför batteriet. Samma regel som makeCircuit() och
  // "Kopplingsscheman: jämn fördelning och centrering" i CLAUDE.md.
  const ladder = (a, b, cross) => {
    if (!stretched[a] && !stretched[b]) return null;
    const info = x => {
      if (!stretched[x]) return { n: 1, sp: 0, ext: sm[x].neg };
      const m = M[doc.loop[x].items[0].id], o = m.offs, last = Math.abs(o[o.length - 1]);
      let sp = 0;
      for (let j = 1; j < o.length; j++) sp = Math.max(sp, Math.abs(o[j] - o[j - 1]));
      return { n: o.length, sp, ext: m.neg - last, m };
    };
    const A = info(a), B = info(b);
    const gaps = (A.n - 1) + (B.n - 1) + 1;
    // Mittemellan ska rymma den sista grenens etiketter, ledningen mittemot
    // och komponenterna på sidoledningarnas nedre bitar.
    const mid = Math.max(A.ext + B.ext + INNER_GAP, BRANCH_MIN, ...cross.filter(x => !stretched[x]).map(x => sm[x].len));
    return { A, B, gaps, need: gaps * Math.max(A.sp, B.sp, mid) };
  };
  const vLad = ladder('top', 'bottom', ['left', 'right']);
  const hLad = ladder('left', 'right', ['top', 'bottom']);
  if (vLad) H = Math.max(H, vLad.need);
  if (hLad) W = Math.max(W, hLad.need);
  // Bildens minsta proportioner (inte för platt, inte för smal) får inte
  // lägga all extra luft innanför en parallellkoppling som går inåt: då
  // hamnar batteriet långt under grenarna och symmetrin går förlorad. Med
  // inåtgående grenar är taket ett grenavstånd från den innersta grenen
  // till ledningen mittemot, samma regel som för stegpinnarna.
  const inward = s => {
    let depth = 0, sp = 0;
    if (stretched[s]) return null;
    for (const it of doc.loop[s].items) {
      if (it.kind !== 'par' || it.side === 'out') continue;
      const o = [0].concat(M[it.id].offs.map(Math.abs)).sort((a, b) => a - b);
      depth = Math.max(depth, o[o.length - 1]);
      for (let j = 1; j < o.length; j++) sp = Math.max(sp, o[j] - o[j - 1]);
    }
    return depth > 0 ? { depth, sp } : null;
  };
  const cap = (a, b) => {
    const A = inward(a), B = inward(b);
    if (!A && !B) return Infinity;
    return (A ? A.depth : 0) + (B ? B.depth : 0) + Math.max(A ? A.sp : 0, B ? B.sp : 0);
  };
  const capW = cap('left', 'right'), capH = cap('top', 'bottom');
  W = Math.max(W, Math.min(H * 1.15, capW));
  H = Math.max(H, Math.min(W * 0.5, capH));
  W = Math.round(W); H = Math.round(H);
  // Lägg grenarna på jämna avstånd i den slutliga höjden (bredden).
  for (const [lad, len] of [[vLad, H], [hLad, W]]) {
    if (!lad) continue;
    const sp = len / lad.gaps;
    for (const X of [lad.A, lad.B]) if (X.m) X.m.offs = X.m.offs.map((v, j) => Math.sign(X.m.s || -1) * j * sp);
  }

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
      // Etikettens mitt (vid pilspetsen) mitt i den fria biten av mellanrummet.
      const cu = ar.runs ? (p + m.arrA + q - m.arrB) / 2 - ar.dir * ARROW_LEN / 2 : (p + q) / 2;
      const c = P(f, cu, v);
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
    if (n >= 2) {
      const sgF = Math.sign(m.offs[near] - m.offs[far]) || 1;
      const vF = v + m.offs[far] + sgF * groupDepth(Pp.branches[order[far]]);
      const vN = v + m.offs[near];
      parInfo[Pp.id].legA = [P(f, u1, vN), P(f, u1, vF)];
      parInfo[Pp.id].legB = [P(f, u2, vF), P(f, u2, vN)];
    }
    if (legged && n >= 2) {
      const sgF = Math.sign(m.offs[near] - m.offs[far]) || 1;
      const vF = v + m.offs[far] + sgF * groupDepth(Pp.branches[order[far]]);
      const vN = v + m.offs[near], sg = Math.sign(vF - vN) || 1, segLen = Math.abs(vF - vN);
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

  return { geo, M, lab, plan, info, auto, W, H, stretched, parInfo, sol };
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
    case 'varres': {
      // Pilen går alltid snett uppåt höger PÅ SKÄRMEN, som i läroböckerna,
      // oavsett ledningens riktning och vilken sida etiketten hamnar på.
      box();
      const horiz = Math.abs(dx) > 0.5;
      const p = horiz ? [-15, 12, 16, -14] : [-13, 16, 14, -17];
      arrowLine([g.x + p[0], g.y + p[1]], [g.x + p[2], g.y + p[3]]);
      break;
    }
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
    case 'switch': {
      // Armen öppnar alltid uppåt PÅ SKÄRMEN, som i läroböckerna: den fäster
      // i vänster kontakt och pekar snett uppåt. På en lodrät ledning finns
      // inget uppåt att öppna mot; där fäster den i nedre kontakten och
      // pekar snett åt höger.
      const horiz = Math.abs(dx) > 0.5;
      const a = horiz ? [g.x - 12, g.y] : [g.x, g.y + 12], b = horiz ? [g.x + 12, g.y] : [g.x, g.y - 12];
      dot(a, 2.3); dot(b, 2.3);
      if (c.closed) line(a, b, WIRE_W, 'round');
      else line(a, horiz ? [g.x + 10.5, g.y - 12.5] : [g.x + 12.5, g.y - 10.5], WIRE_W, 'round');
      break;
    }
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
    // Är den yttersta grenen en grupp ritar gruppen själv sina förbindelser.
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
  positionInline();
}
function renderZones() {
  if (!drag || !drag.moving || drag.target || !drag.zones) { zoneG.innerHTML = ''; return; }
  const k = view.geoNow.cam.k;
  const near = drag.near;
  zoneG.innerHTML = drag.zones.map(z => {
    const on = z === near;
    if (z.kind === 'onto') {
      if (!on) return '';
      const w = z.vert ? z.h : z.w, h = z.vert ? z.w : z.h;
      return `<rect class="zone onto" x="${r2(z.x - w / 2)}" y="${r2(z.y - h / 2)}" width="${r2(w)}" height="${r2(h)}" rx="${r2(6 / k)}" vector-effect="non-scaling-stroke"/>`;
    }
    if (z.kind === 'series' || z.kind === 'leg' || z.kind === 'mid') return `<circle class="zone${on ? ' near' : ''}" cx="${r2(z.x)}" cy="${r2(z.y)}" r="${r2((on ? 6.5 : 4.5) / k * 1.2)}" vector-effect="non-scaling-stroke"/>`;
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
    if (!its.length || !si.gaps.length) continue;
    const lsx = si.f.ox * si.L, lsy = si.f.oy * si.L;
    // Hela ledarens längd (hörn till hörn). Den yttersta listen spänner över
    // hela ledaren och ansluter i dess hörn, och ritas därför lika bred som
    // ledaren; de inre listerna spänner bara över sina komponenter.
    const g0 = si.gaps[0][0], g1 = si.gaps[si.gaps.length - 1][1];
    const wireW = Math.hypot(g1[0] - g0[0], g1[1] - g0[1]);
    const wmx = (g0[0] + g1[0]) / 2, wmy = (g0[1] + g1[1]) / 2;
    // Fritt avstånd till närmaste grannledning på vardera sidan. En gren i
    // en parallellkoppling har grannar på grenavståndet; annars finns gott
    // om plats. Listerna trycks ihop så att de aldrig hamnar på en granne.
    // Utrymmet mellan två grenar delas mitt itu: varje gren får sin halva.
    const [freeOut, freeIn] = freeFor(si.ctx.par, si.ctx.j);
    // En ensam komponent får också en list över hela ledaren, en våning
    // längre ut än komponentens egen parallellzon.
    const nMin = its.length === 1 && its[0].kind === 'comp' ? 1 : 2;
    const tiers = Math.max(1, Math.min(its.length, SPAN_MAX) - 1);
    const dist = (n, free) => {
      const t = Math.max(n, 2);
      const want = SPAN_D0 + SPAN_STEP * (t - 2) + 16, max = free / 2 - 6;
      return want <= max ? want : 22 + (max - 22) * (t - 1) / tiers;
    };
    for (let n = nMin; n <= Math.min(its.length, SPAN_MAX); n++) {
      const Do = dist(n, freeOut), Di = dist(n, freeIn);
      for (let i = 0; i + n <= its.length; i++) {
        const whole = n === its.length;
        const a = center(its[i]), b = center(its[i + n - 1]);
        const mx = whole ? wmx : (a[0] + b[0]) / 2, my = whole ? wmy : (a[1] + b[1]) / 2;
        const w = whole ? Math.max(24, wireW - 24) : Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (Do >= 30) Z.push({ kind: 'span', sid: si.S.id, from: i, n, side: 'out', x: mx + lsx * Do, y: my + lsy * Do, w, vert: si.vert });
        if (Di >= 30) Z.push({ kind: 'span', sid: si.S.id, from: i, n, side: 'in', x: mx - lsx * Di, y: my - lsy * Di, w, vert: si.vert });
      }
    }
  }
  // PÅ-ZONER: mitt på varje komponent. En ny komponent från menyn som
  // släpps här ERSÄTTER komponenten; en komponent från schemat som släpps
  // här BYTER PLATS med den.
  for (const ci of L.info.comps) {
    const g = L.geo[ci.c.id], e = symExt(ci.c);
    Z.push({ kind: 'onto', target: ci.c.id, x: g.x, y: g.y, w: e.len + 12, h: 2 * Math.max(e.hl, e.ho) + 10, vert: ci.f.dx === 0 });
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
    const reorder = !inf.legged && !inf.stretched;
    const vert = pi.f.dx !== 0;
    const mid = seg => [(seg[0][0] + seg[1][0]) / 2, (seg[0][1] + seg[1][1]) / 2];
    if (!P.legA && inf.legA) { const [x, y] = mid(inf.legA); Z.push({ kind: 'leg', pid: P.id, which: 'legA', reorder, x, y, vert }); }
    if (!P.legB && inf.legB) { const [x, y] = mid(inf.legB); Z.push({ kind: 'leg', pid: P.id, which: 'legB', reorder, x, y, vert }); }
    // MELLANBITAR: den lodräta biten mellan två inre grenar. Den leds av alla
    // grenar på den bortre sidan, så en komponent där hamnar i serie med dem
    // tillsammans. Grenarna bortom biten grupperas då till en egen
    // parallellkoppling (se applyZone 'mid').
    const n = inf.order.length;
    if (inf.legged || n < 3) continue;
    const G = j => L.geo[P.branches[inf.order[j]].id];
    const js = inf.stretched ? [...Array(n - 2).keys()].map(i => i + 1) : [...Array(n - 2).keys()];
    for (const j of js) {
      const a = G(j), b = G(j + 1);
      Z.push({ kind: 'mid', pid: P.id, j, which: 'legA', str: inf.stretched, x: (a.x1 + b.x1) / 2, y: (a.y1 + b.y1) / 2, vert });
      Z.push({ kind: 'mid', pid: P.id, j, which: 'legB', str: inf.stretched, x: (a.x2 + b.x2) / 2, y: (a.y2 + b.y2) / 2, vert });
    }
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
// Ersätt en komponent med en ny (släppt från menyn på komponenten).
function replaceComp(d0, targetId, item) {
  const d = clone(d0), f = findItem(d, targetId);
  if (f) f.series.items[f.index] = item;
  return normalize(d);
}
// Byt plats på två komponenter i schemat (den ena släppt på den andra).
function swapComps(d0, aId, bId) {
  const d = clone(d0), fa = findItem(d, aId), fb = findItem(d, bId);
  if (!fa || !fb) return d;
  const a = fa.item, b = fb.item;
  fa.series.items[fa.index] = b;
  fb.series.items[fb.index] = a;
  return normalize(d);
}
const zoneKey = z => [z.kind, z.sid || z.target || z.pid, z.index, z.at, z.from, z.n, z.side, z.which, z.j].join(':');
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
  } else if (z.kind === 'mid') {
    // Grenarna bortom mellanbiten blir en grupp (parallellkoppling över hela
    // den nya grenen), och komponenten läggs på benet ut till gruppen.
    const P = findItem(d, z.pid).item, br = P.branches, n = br.length;
    let far, rest;
    if (z.str) { far = br.slice(0, z.j + 1); rest = br.slice(z.j + 1); }
    else { far = br.slice(z.j + 1).reverse(); rest = br.slice(0, z.j + 1); }
    const Q = { id: ids.p, kind: 'par', side: 'in', full: true, branches: far };
    P.branches = [mkSeries([Q], ids.b1), ...rest];
    if (!z.str) P.legMoved = true;
    P[z.which] = mkSeries([item], ids.b2);
    void n;
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
  closeInline();   // värdefältet får inte ligga kvar och blinka under dragningen
  closeUnitMenu();
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
  ghostEl.classList.toggle('binned', overTrash);   // inte 'trash': den klassen är papperskorgens egen stil
  const key = target ? zoneKey(target) : (overTrash ? 'trash' : '');
  if (key === drag.key) { renderZones(); return; }
  drag.key = key;
  if (target) {
    const ids = drag.ids[key] || (drag.ids[key] = { p: rid('p'), b1: rid('s'), b2: rid('s') });
    const pd = target.kind === 'onto'
      ? (drag.mode === 'new' ? replaceComp(drag.base, target.target, clone(drag.item)) : swapComps(doc, drag.id, target.target))
      : applyZone(drag.base, target, clone(drag.item), ids);
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
  ghostEl.classList.remove('on', 'placed', 'binned');
  document.body.classList.remove('is-dragging');
  sheetEl.classList.remove('can-trash');
  trashEl.classList.remove('hot');
  view.camFrozen = false;
  if (!cancelled && d.target) {
    doc = d.target.doc; commit();
    sel = { kind: 'comp', id: d.item.id };
    markUsed();
    refresh();
    openInline(sel, !d.touch);   // skriv värdet direkt efter att komponenten släppts
  } else if (!cancelled && d.key === 'trash') {
    doc = d.base; commit();
    if (sel && sel.id === d.id) sel = null;
    refresh();
    toast('Komponenten togs bort.', 'Ångra', undo);
  } else refresh();
}
// Klick på en palettbricka: lägg till komponenten på ett vettigt ställe.
function smartAdd(type, fromEl, touch) {
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
  openInline(sel, !touch);
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
  drag = { mode: 'new', type: t.dataset.type, sx: e.clientX, sy: e.clientY, moving: false, el: t, touch: e.pointerType === 'touch' };
});
hitG.addEventListener('pointerdown', e => {
  const t = e.target.closest('.hit');
  if (!t || e.button > 0) return;
  e.stopPropagation();
  if (t.dataset.kind === 'arrow') { select({ kind: 'arrow', id: t.dataset.id }, e.pointerType !== 'touch'); return; }
  drag = { mode: 'move', id: t.dataset.id, sx: e.clientX, sy: e.clientY, moving: false, wasSel: sel && sel.id === t.dataset.id, touch: e.pointerType === 'touch' };
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
    if (d.mode === 'new') smartAdd(d.type, d.el, d.touch);
    else if (d.wasSel) focusValue();
    else select({ kind: 'comp', id: d.id }, !d.touch);
    return;
  }
  endDrag(false);
});
window.addEventListener('pointercancel', () => { if (drag && drag.moving) endDrag(true); else drag = null; });

/* ================= Värdefält direkt i schemat ================= */
// Klickar man på en komponent som kan ha ett värde (eller på en strömpil)
// dyker ett litet fält upp på etikettens plats, "R₁ = [ 20 ] Ω", så att
// värdet skrivs in där det ska stå. Fältet följer schemat när det flyttar
// sig, skalar med zoomen och hålls i takt med fältet i sidmenyn.
const ieEl = $('#inlineEd'), ieInput = $('#ieInput'), iePre = $('#iePre'), ieUnit = $('#ieUnit');
let ieTarget = null;   // { kind: 'comp' | 'arrow', id }
function ieInfo(t) {
  if (!t) return null;
  if (t.kind === 'comp') {
    const f = findItem(doc, t.id);
    if (!f) return null;
    const c = f.item, T = TYPES[c.type];
    if (!T.field) return null;
    const nm = c.name ? parseName(c.name) : lay.auto[c.id];
    const calc = lay.sol && lay.sol.comp[c.id];
    return { c, T, nm, italic: T.italic, value: c.value || '', unit: compUnit(c), base: T.base, ph: numPart(calc), geoKey: c.id, hl: symExt(c).hl };
  }
  const pl = planFor(t.id);
  if (!pl) return null;
  const cfg = arrowCfg(t.id, false), sid = t.id === 'main' ? doc.loop[pl.side].id : t.id;
  const calc = lay.sol && lay.sol.arrow[sid];
  return { nm: parseName(cfg.name || pl.auto), italic: true, value: cfg.value || '', unit: cfg.unit || 'A', base: 'A', ph: calc ? numPart(calc.text) : '', geoKey: 'arr:' + sid, hl: ARROW_HW, arrow: true };
}
const numPart = t => { const m = String(t || '').match(NUM_RE); return m ? m[1] : ''; };
function openInline(t, focus) {
  const inf = ieInfo(t);
  if (!inf) { closeInline(); return; }
  ieTarget = t;
  const pre = [];
  if (doc.opts.names && inf.nm) {
    pre.push(inf.italic && /[A-Za-zα-ωΑ-Ω]/.test(inf.nm.letter) ? `<i>${esc(inf.nm.letter)}</i>` : esc(inf.nm.letter));
    if (inf.nm.idx) pre.push(`<sub>${esc(inf.nm.idx)}</sub>`);
    pre.push(inf.italic ? '<span class="ie-eq">=</span>' : '');
  }
  iePre.innerHTML = pre.join('');
  ieUnit.textContent = inf.unit || '';
  ieUnit.classList.toggle('pick', !!UNIT_OPTS[inf.base]);
  ieInput.value = inf.value;
  ieInput.placeholder = inf.ph || '';   // uträknat värde som hjälptext, annars tomt
  sizeInline();
  ieEl.classList.add('on');
  positionInline();
  if (focus) { ieInput.focus({ preventScroll: true }); ieInput.select(); }
}
function closeInline() {
  if (!ieTarget) return;
  ieTarget = null;
  ieEl.classList.remove('on');
  if (document.activeElement === ieInput) ieInput.blur();
}
function sizeInline() { ieInput.style.width = Math.max(2, (ieInput.value || ieInput.placeholder).length * 0.62 + 0.5) + 'em'; }
function positionInline() {
  if (!ieTarget || !view.geoNow) return;
  // En nyss tillagd komponent har ännu ingen position i animationen; då
  // används slutpositionen, så att fältet syns (och kan få fokus) direkt.
  const inf = ieInfo(ieTarget), g = inf && (view.geoNow[inf.geoKey] || (view.lay && view.lay.geo[inf.geoKey]));
  if (!g || (drag && drag.moving)) { ieEl.style.visibility = 'hidden'; return; }
  ieEl.style.visibility = '';
  const cam = view.geoNow.cam, k = cam.k;
  let x = g.x, y = g.y;
  if (inf.arrow) { const a = g.ang * Math.PI / 180; x += Math.cos(a) * ARROW_LEN / 2; y += Math.sin(a) * ARROW_LEN / 2; }
  const horiz = Math.abs(Math.cos(g.ang * Math.PI / 180)) > 0.5;
  ieEl.style.fontSize = clamp(FS * k, 13, 22) + 'px';
  let tx;
  if (horiz) { y += (g.lsy < 0 ? -1 : 1) * (inf.hl + GAP_H + LH / 2); tx = 'translate(-50%, -50%)'; }
  else { x += (g.lsx < 0 ? -1 : 1) * (inf.hl + GAP_V); tx = g.lsx < 0 ? 'translate(-100%, -50%)' : 'translate(0, -50%)'; }
  ieEl.style.left = (cam.tx + k * x) + 'px';
  ieEl.style.top = (cam.ty + k * y) + 'px';
  ieEl.style.transform = tx;
}
ieInput.addEventListener('input', () => {
  if (!ieTarget) return;
  if (ieTarget.kind === 'comp') { const f = findItem(doc, ieTarget.id); if (f) f.item.value = ieInput.value; }
  else arrowCfg(ieTarget.id, true).value = ieInput.value;
  const side = inspEl.querySelector(ieTarget.kind === 'comp' ? '#f-val' : '#f-aval');
  if (side) side.value = ieInput.value;
  sizeInline();
  relayout();
});
ieInput.addEventListener('change', () => commit());
// När man är klar (Enter, Esc eller klick någon annanstans) stängs fältet så
// att den färdiga etiketten syns. Komponenten förblir markerad.
ieInput.addEventListener('blur', () => { if (ieTarget) { ieTarget = null; ieEl.classList.remove('on'); } });
ieInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); ieTarget = null; ieEl.classList.remove('on'); ieInput.blur(); }
});
ieEl.addEventListener('pointerdown', e => e.stopPropagation());

/* ================= Enhetslistan ================= */
// Klick på enheten (i värdefältet i schemat eller i sidmenyn) öppnar en
// lista med vanliga enheter för storheten. Valet gäller den markerade
// komponenten eller strömpilen.
const unitMenu = document.createElement('div');
unitMenu.className = 'unit-menu';
document.body.appendChild(unitMenu);
function unitTarget() {
  if (!sel) return null;
  if (sel.kind === 'comp') {
    const f = findItem(doc, sel.id);
    if (!f) return null;
    const T = TYPES[f.item.type];
    return UNIT_OPTS[T.base] ? { obj: f.item, base: T.base, cur: compUnit(f.item), def: T.unit } : null;
  }
  if (!planFor(sel.id)) return null;
  const cf = arrowCfg(sel.id, true);
  return { obj: cf, base: 'A', cur: cf.unit || 'A', def: 'A' };
}
function openUnitMenu(anchor, fromInline) {
  const t = unitTarget();
  if (!t) return;
  unitMenu.innerHTML = UNIT_OPTS[t.base].map(([u, name]) =>
    `<button type="button" data-u="${esc(u)}" class="${u === t.cur ? 'on' : ''}"><b>${esc(u)}</b><span>${name}</span></button>`).join('');
  const r = anchor.getBoundingClientRect();
  unitMenu.classList.add('on');
  const mw = unitMenu.offsetWidth, mh = unitMenu.offsetHeight;
  let x = r.left + r.width / 2 - mw / 2, y = r.bottom + 6;
  if (y + mh > window.innerHeight - 8) y = r.top - mh - 6;
  unitMenu.style.left = clamp(x, 8, window.innerWidth - mw - 8) + 'px';
  unitMenu.style.top = Math.max(8, y) + 'px';
  unitMenu.dataset.inline = fromInline ? '1' : '';
}
function closeUnitMenu() { unitMenu.classList.remove('on'); }
unitMenu.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); });
unitMenu.addEventListener('click', e => {
  const b = e.target.closest('[data-u]');
  if (!b) return;
  const t = unitTarget();
  if (t) { if (b.dataset.u === t.def) delete t.obj.unit; else t.obj.unit = b.dataset.u; }
  const reopen = unitMenu.dataset.inline && ieTarget ? ieTarget : null;
  closeUnitMenu();
  commit(); refresh();
  if (reopen) openInline(reopen, true);
});
document.addEventListener('pointerdown', e => { if (!e.target.closest('.unit-menu')) closeUnitMenu(); });
window.addEventListener('resize', closeUnitMenu);
ieUnit.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); if (ieUnit.classList.contains('pick')) openUnitMenu(ieUnit, true); });
inspEl.addEventListener('click', e => { const b = e.target.closest('[data-unitpick]'); if (b) { e.stopPropagation(); openUnitMenu(b, false); } }, true);

/* ================= Markering och inspektör ================= */
// focus: sätt markören i värdefältet direkt (mus och penna). Vid tryck med
// fingret visas fältet utan att tangentbordet fälls upp; ett tryck på
// fältet öppnar det.
function select(s, focus) {
  sel = s; renderInspector(); render();
  if (s) openInline(s, focus); else closeInline();
}
function focusValue() {
  if (sel && ieInfo(sel)) { openInline(sel, true); return; }
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
  // Värdefältet i schemat hör till markeringen; försvinner den (Ångra,
  // borttagning) stängs fältet.
  if (ieTarget && (!sel || sel.kind !== ieTarget.kind || sel.id !== ieTarget.id)) closeInline();
}
function inspComp(f) {
  const c = f.item, T = TYPES[c.type], au = lay.auto[c.id];
  const autoTxt = au ? au.letter + toSub(au.idx) : '';
  const inPar = !!f.ctx.par;
  const calc = lay.sol && lay.sol.comp[c.id] ? formatValue(lay.sol.comp[c.id], compUnit(c), T.base) : '';
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
    <div class="unit"><input id="f-val" data-f="value" value="${esc(c.value)}" placeholder="${esc(calc ? calc + '  (uträknat)' : (T.ph || ''))}" autocomplete="off" spellcheck="false">${UNIT_OPTS[T.base] ? `<button type="button" class="unit-btn" data-unitpick="side" title="Byt enhet">${esc(compUnit(c))}<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>` : `<span>${T.unit}</span>`}</div>
    <p class="help">${calc ? 'Uträknat ur de övriga värdena. Skriv ett eget värde, eller <b>?</b> om eleverna ska räkna ut det.' : 'Skriv <b>?</b> om storheten är okänd.'}</p></div>` : ''}
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
  const asid = key === 'main' ? doc.loop[pl.side].id : key;
  const acalc = lay.sol && lay.sol.arrow[asid] ? formatValue(lay.sol.arrow[asid].text, cfg.unit || 'A', 'A') : '';
  const g = lay.geo['arr:' + (key === 'main' ? doc.loop[pl.side].id : key)];
  const horiz = g && Math.abs(Math.cos(g.ang * Math.PI / 180)) > 0.5;
  const sideCur = g ? (horiz ? (g.lsy < 0 ? 'a' : 'b') : (g.lsx < 0 ? 'a' : 'b')) : 'a';
  return `
  <div class="ins-head">
    <div class="ins-ico arrow-ico"><svg viewBox="-36 -24 72 48" width="66" height="44"><line x1="-34" y1="4" x2="34" y2="4" stroke="currentColor" stroke-width="1.8"/><polygon points="5,4 -5,-0.6 -5,8.6" fill="currentColor"/><text x="0" y="-8" font-size="14" text-anchor="middle" fill="currentColor" font-family="Poppins" font-style="italic">I</text></svg></div>
    <div class="ins-t"><div class="eyebrow">Vald strömpil</div><h2>${pl && pl.total ? 'Strömmen i kretsen' : 'Strömmen i grenen'}</h2></div>
    <button class="ibtn" data-act="ahide" title="Dölj pilen" aria-label="Dölj pilen">${IC.hide}</button>
  </div>
  <div class="fld"><label for="f-aname">Beteckning</label>
    <input id="f-aname" data-af="name" value="${esc(cfg.name || '')}" placeholder="${esc(pl.auto.replace(/\d+/, toSub))}  (automatisk)" autocomplete="off" spellcheck="false"></div>
  <div class="fld"><label for="f-aval">Strömstyrka</label>
    <div class="unit"><input id="f-aval" data-af="value" value="${esc(cfg.value || '')}" placeholder="${esc(acalc ? acalc + '  (uträknat)' : 'till exempel 0,40')}" autocomplete="off"><button type="button" class="unit-btn" data-unitpick="side" title="Byt enhet">${esc(cfg.unit || 'A')}<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button></div>
    ${acalc ? '<p class="help">Uträknat ur de övriga värdena. Skriv ett eget värde, eller <b>?</b> om eleverna ska räkna ut det.</p>' : ''}
    ${!doc.opts.values ? '<p class="help">Slå på "Värden" under inställningarna för att visa strömstyrkan.</p>' : ''}</div>
  <div class="fld"><label>Texten står</label>${seg('aside', horiz ? [['a', 'Ovanför'], ['b', 'Under']] : [['a', 'Till vänster'], ['b', 'Till höger']], sideCur)}</div>
  <div class="fld"><label>Placering på ledningen</label>
    <div class="row"><button class="ibtn" data-act="aprev" aria-label="Flytta bakåt">${IC.left}</button><button class="ibtn" data-act="anext" aria-label="Flytta framåt">${IC.right}</button><span class="help inline">Flytta pilen till nästa lediga ledningsbit.</span></div></div>
  <div class="acts"><button class="wbtn" data-act="aflip">${IC.swap}<span>Vänd pilens riktning</span></button></div>
  <p class="kbd-hint">Riktningen följer batteriets poler: strömmen går ut från pluspolen, det långa strecket.</p>`;
}
// Förklarar varför inga värden räknas ut, när det är så.
function calcNote() {
  const st = doc.opts.autoCalc && lay.sol && lay.sol.status;
  const msg = {
    inconsistent: 'De givna värdena går inte ihop, så inget räknas ut. Kontrollera spänningar, resistanser och strömmar.',
    singular: 'Kretsen är kortsluten eller strömmen kan inte bestämmas (till exempel två amperemetrar parallellt), så inget räknas ut.',
    unsupported: 'Kretsen innehåller en diod, en lysdiod eller växelspänning, så inga värden räknas ut automatiskt.',
  }[st];
  return msg ? `<p class="help note calc">${msg}</p>` : (doc.opts.autoCalc ? '<p class="help calc-info">Mätarna räknas som ideala och batterierna saknar inre resistans. Skriv <b>?</b> i ett fält för att dölja svaret.</p>' : '');
}
function inspDoc() {
  const o = doc.opts;
  const hidden = (doc.arrowMain.hidden ? 1 : 0) + Object.values(doc.arrowCfg).filter(c => c.hidden).length;
  return `
  <div class="ins-head plain"><div class="ins-t"><div class="eyebrow">Hela schemat</div><h2>Visa i schemat</h2></div></div>
  <div class="grp">
    ${tgl('names', 'Beteckningar', '<i>R</i>₁, <i>U</i>, <i>I</i>, L₁', o.names)}
    ${tgl('values', 'Värden', '20 Ω, 12 V, 0,80 A', o.values)}
    ${tgl('autoCalc', 'Räkna ut okända värden', 'Ström, spänning och resistans som följer av de givna värdena', o.autoCalc, true)}
    ${calcNote()}
  </div>
  <div class="grp">
    ${tgl('arrows', 'Strömpilar', 'Riktningen följer batteriets poler', o.arrows)}
    ${o.arrows && !hasSource(doc) ? '<p class="help note">Pilarna visas när kretsen har en spänningskälla. Dra in ett batteri så dyker de upp.</p>' : ''}
    <div class="subgrp${o.arrows ? '' : ' off'}">
      ${tgl('subArrows', 'Visa delströmmar', 'Strömmarna i parallellgrenarna, <i>I</i>₁, <i>I</i>₂ …', o.subArrows !== false, true)}
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
    if (ieTarget) openInline(ieTarget, false);
  } else if (t.dataset.af && sel && sel.kind === 'arrow') {
    arrowCfg(sel.id, true)[t.dataset.af] = t.value;
    relayout();
    if (ieTarget) openInline(ieTarget, false);
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
      if (old.base !== nt.base) delete c.unit;
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
  if (sel && !mod && /^[0-9?,.]$/.test(e.key)) focusValue();
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
// Ny krets: tom slinga med ett klick. Inställningarna (beteckningar,
// strömpilar, exportstorlek) behålls, och Ångra tar tillbaka den gamla.
$('#newBtn').addEventListener('click', () => {
  const nd = newDoc({});
  nd.opts = doc.opts;
  doc = nd; sel = null; commit(); refresh();
  markUsed();
  toast('Ritytan är tömd.', 'Ångra', undo);
});
$('#undoBtn').addEventListener('click', undo);
$('#redoBtn').addEventListener('click', redo);
$('#trash').innerHTML = IC.trash + '<span>Släpp här för att ta bort</span>';
$('#coach .x').addEventListener('click', markUsed);

// Verktyget fyller skärmen under sajtens sidhuvud.
const siteHdr = document.querySelector('.lab-header');
const setHdr = () => document.documentElement.style.setProperty('--hdr', (siteHdr ? siteHdr.offsetHeight : 0) + 'px');
setHdr();
window.addEventListener('resize', setHdr);
// Symbolerna i texten om verktyget ritas med samma kod som i schemat.
document.querySelectorAll('[data-sym]').forEach(el => { el.innerHTML = iconSvg(el.dataset.sym, 66, 44); });

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

/* Geobräda — Fysiklabbet
 *
 * En digital geobräda: ett gummiband spänns mellan spikar i ett rutnät och
 * bildar en månghörning med 3–6 hörn. En gradskiva av genomskinlig plast
 * flyttas och vrids fritt, så att eleven själv mäter vinklarna.
 *
 * Undersökningen går i fyra steg (kort i sidopanelen):
 *   1. Mät vinklarna. Ett hörn i taget pulserar, statusraden under brädan
 *      säger vad gradskivan behöver (flyttas, vridas, vändas, vilken skala
 *      som ska läsas) och varje inskrivet värde får respons. Vanliga fel
 *      känns igen: fel skala (180° − v) och vinkeln på utsidan (360° − v).
 *   2. Lägg ihop. Eleven gissar om summan blir densamma i en annan figur,
 *      mäter en till och jämför. Mätningarna sparas i en logg med miniatyrer.
 *   3. Varför? Två animationer: hörnen rivs av och läggs runt en punkt, och
 *      diagonaler delar figuren i trianglar.
 *   4. Fler hörn. En tabell med antal hörn, trianglar och vinkelsumma som
 *      fylls av elevens egna mätningar, och mönstret (n − 2) · 180°.
 *
 * Lager i SVG:en (viewBox 0 0 640 640, y nedåt): bräda (ritas en gång),
 * figur (ritas om vid varje ändring), animation, gradskiva (byggs en gång,
 * bara transform och klasser ändras) och överst förlängningslinjer och
 * greppytor för hörnen.
 *
 * Gradskivans lokala system: medelpunkten i origo, nollinjen längs ±x och
 * bågen åt −y. Den yttre skalan visar t vid den matematiska vinkeln t från
 * +x, den inre 180 − t.
 *
 * Adressen geobrada.html?n=3 … ?n=6 väljer antalet hörn vid start.
 */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var VB = 640, N = 11, M = 50, S = (VB - 2 * M) / (N - 1);
  var R = 170;
  var FARG = ['#c8324a', '#1c5fa8', '#3f7a34', '#b0651a', '#7b3fa0', '#13807a'];
  var NAMN = ['A', 'B', 'C', 'D', 'E', 'F'];
  var FIGURNAMN = { 3: 'triangel', 4: 'fyrhörning', 5: 'femhörning', 6: 'sexhörning' };
  var FIGURNAMN_BEST = { 3: 'triangeln', 4: 'fyrhörningen', 5: 'femhörningen', 6: 'sexhörningen' };
  var UNDAN = { x: 300, y: 626, rot: 0 };
  var STARTFIGUR = {
    3: [[2, 8], [8, 7], [4, 2]],
    4: [[1, 7], [3, 2], [8, 1], [9, 8]],
    5: [[1, 6], [3, 2], [7, 1], [9, 5], [5, 9]],
    6: [[1, 5], [3, 1], [7, 2], [9, 5], [7, 9], [3, 8]]
  };

  var st = {
    pts: [],
    prot: { x: UNDAN.x, y: UNDAN.y, rot: 0, syns: true },
    matt: [],
    steg: 1,              // öppet kort
    nattSteg: 1,          // längsta steget eleven nått
    gissning: null,
    logg: [],             // { n, pts, vals, sum }
    monster: false,
    visa: { bagar: false, facit: false, lashjalp: true, trianglar: false, riv: false },
    delaNy: false,
    senast: null          // hörnet som senast fick ett värde
  };

  var svg = document.getElementById('bradan');
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Hjälpfunktioner ---------- */
  function peg(i, j) { return { x: M + S * i, y: M + S * j }; }
  function fmt(x) {
    var r = Math.round(x * 10) / 10;
    var s = r.toFixed(Math.abs(r % 1) > 0.05 ? 1 : 0);
    if (parseFloat(s) === 0) return '0';
    return s.replace('.', ',');
  }
  function ordning(i) { return i + (i === 1 || i === 2 ? ':a' : ':e'); }
  function el(tag, attr, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attr) e.setAttribute(k, attr[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, s, attr) {
    var a = { x: x, y: y, 'text-anchor': 'middle', 'dominant-baseline': 'central' };
    for (var k in attr) a[k] = attr[k];
    var t = el('text', a, parent); t.textContent = s; return t;
  }
  function norm(a) { a %= 360; if (a < 0) a += 360; return a; }
  function diff(a, b) { var d = norm(a - b); return d > 180 ? 360 - d : d; }
  function deg(r) { return r * 180 / Math.PI; }
  function rad(d) { return d * Math.PI / 180; }
  function tolka(s) {
    s = String(s == null ? '' : s).trim().replace(',', '.').replace('°', '');
    if (s === '') return null;
    var v = parseFloat(s);
    return isFinite(v) ? v : null;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* ---------- Geometri ---------- */
  function hornPunkter(pts) { return (pts || st.pts).map(function (p) { return peg(p[0], p[1]); }); }

  function korsar(a, b, c, d) {
    function o(p, q, r) { var v = (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x); return v > 1e-9 ? 1 : v < -1e-9 ? -1 : 0; }
    function pa(p, q, r) { return Math.min(p.x, r.x) - 1e-9 <= q.x && q.x <= Math.max(p.x, r.x) + 1e-9 && Math.min(p.y, r.y) - 1e-9 <= q.y && q.y <= Math.max(p.y, r.y) + 1e-9; }
    var o1 = o(a, b, c), o2 = o(a, b, d), o3 = o(c, d, a), o4 = o(c, d, b);
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && pa(a, c, b)) return true;
    if (o2 === 0 && pa(a, d, b)) return true;
    if (o3 === 0 && pa(c, a, d)) return true;
    if (o4 === 0 && pa(c, b, d)) return true;
    return false;
  }
  function arEnkel(P) {
    var n = P.length;
    for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (korsar(P[i], P[(i + 1) % n], P[j], P[(j + 1) % n])) return false;
    }
    return true;
  }
  function area(P) {
    var a = 0;
    for (var i = 0; i < P.length; i++) { var p = P[i], q = P[(i + 1) % P.length]; a += p.x * q.y - q.x * p.y; }
    return a / 2;
  }
  function tyngdpunkt(P) {
    var A = area(P), cx = 0, cy = 0;
    for (var i = 0; i < P.length; i++) { var p = P[i], q = P[(i + 1) % P.length], f = p.x * q.y - q.x * p.y; cx += (p.x + q.x) * f; cy += (p.y + q.y) * f; }
    return { x: cx / (6 * A), y: cy / (6 * A) };
  }
  // Inre vinkel, sidornas riktningar (aU mot föregående hörn, aW mot nästa)
  // och bisektrisen in i figuren.
  function vinklar(P) {
    var n = P.length, sgn = area(P) > 0 ? 1 : -1, ut = [];
    for (var i = 0; i < n; i++) {
      var p = P[(i + n - 1) % n], v = P[i], q = P[(i + 1) % n];
      var t1 = Math.atan2(v.y - p.y, v.x - p.x), t2 = Math.atan2(q.y - v.y, q.x - v.x);
      var sv = deg(t2 - t1); while (sv > 180) sv -= 360; while (sv <= -180) sv += 360;
      var inre = 180 - sv * sgn;
      var aU = deg(Math.atan2(p.y - v.y, p.x - v.x)), aW = deg(Math.atan2(q.y - v.y, q.x - v.x));
      var riktning = diff(aU + inre, aW) < 0.01 ? 1 : -1;
      ut.push({ inre: inre, aU: aU, aW: aW, riktning: riktning, bis: aU + riktning * inre / 2 });
    }
    return ut;
  }
  // Hela grader som summerar till exakt rätt vinkelsumma (största resten).
  function heltal(V, total) {
    var g = V.map(function (v) { return Math.floor(v + 1e-9); });
    var rest = total - g.reduce(function (s, x) { return s + x; }, 0);
    var ord = V.map(function (v, i) { return { i: i, r: v - Math.floor(v + 1e-9) }; }).sort(function (a, b) { return b.r - a.r; });
    for (var k = 0; k < rest && k < ord.length; k++) g[ord[k].i]++;
    return g;
  }
  function geo() {
    var P = hornPunkter(), n = P.length;
    var enkel = arEnkel(P) && Math.abs(area(P)) > 1;
    var V = enkel ? vinklar(P) : null;
    var tot = (n - 2) * 180;
    return { P: P, n: n, enkel: enkel, V: V, tot: tot, hel: V ? heltal(V.map(function (v) { return v.inre; }), tot) : null };
  }

  /* ---------- Ny figur ---------- */
  function slumpaFigur(n) {
    for (var forsok = 0; forsok < 800; forsok++) {
      var pts = [], upptagen = {}, ok = true, start = Math.random() * 2 * Math.PI;
      // Ibland en figur som buktar inåt: ett hörn dras in mot mitten.
      var inat = n >= 4 && Math.random() < 0.3 ? Math.floor(Math.random() * n) : -1;
      for (var k = 0; k < n; k++) {
        var a = start + 2 * Math.PI * k / n + (Math.random() - 0.5) * (Math.PI / n);
        var r = k === inat ? 0.8 + Math.random() * 1.2 : 2.6 + Math.random() * 2.4;
        var i = Math.max(0, Math.min(10, Math.round(5 + r * Math.cos(a))));
        var j = Math.max(0, Math.min(9, Math.round(5 + r * Math.sin(a))));
        if (upptagen[i + ',' + j]) { ok = false; break; }
        upptagen[i + ',' + j] = 1;
        pts.push([i, j]);
      }
      if (!ok) continue;
      var P = hornPunkter(pts);
      if (!arEnkel(P) || Math.abs(area(P)) < 12 * S * S) continue;
      var V = vinklar(P);
      if (V.some(function (v) { return v.inre < 28 || Math.abs(v.inre - 180) < 10; })) continue;
      if (V.filter(function (v) { return Math.abs(v.inre - 90) < 0.5; }).length > 1) continue;
      return pts;
    }
    return STARTFIGUR[n].map(function (p) { return p.slice(); });
  }

  function sattFigur(pts) {
    st.pts = pts;
    st.matt = pts.map(function () { return ''; });
    st.senast = null;
    st.visa.riv = false; st.visa.trianglar = false;
    stopRiv();
    byggProtokoll();
    rita();
    ritaKort();
  }

  /* ---------- Brädan (ritas en gång) ---------- */
  var lager = {};
  function byggBrada() {
    var defs = el('defs', {}, svg);
    var g1 = el('linearGradient', { id: 'gbRam', x1: 0, y1: 0, x2: 1, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#a9824b' }, g1);
    el('stop', { offset: 1, 'stop-color': '#7d5a2c' }, g1);
    var g2 = el('linearGradient', { id: 'gbTra', x1: 0, y1: 0, x2: 0.3, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#f1e2c2' }, g2);
    el('stop', { offset: 0.55, 'stop-color': '#e7d1a5' }, g2);
    el('stop', { offset: 1, 'stop-color': '#dcc192' }, g2);
    var spik = el('radialGradient', { id: 'gbSpik', cx: 0.36, cy: 0.32, r: 0.75 }, defs);
    el('stop', { offset: 0, 'stop-color': '#ffffff' }, spik);
    el('stop', { offset: 0.35, 'stop-color': '#d6d2ca' }, spik);
    el('stop', { offset: 0.8, 'stop-color': '#8c867b' }, spik);
    el('stop', { offset: 1, 'stop-color': '#5e594f' }, spik);
    var plast = el('linearGradient', { id: 'gbPlast', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#eaf5fc', 'stop-opacity': 0.78 }, plast);
    el('stop', { offset: 1, 'stop-color': '#c4dcee', 'stop-opacity': 0.62 }, plast);
    var korn = el('filter', { id: 'gbKorn', x: 0, y: 0, width: 1, height: 1 }, defs);
    el('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.012 0.22', numOctaves: 3, seed: 7, result: 'brus' }, korn);
    el('feColorMatrix', { type: 'matrix', values: '0 0 0 0 0.42  0 0 0 0 0.27  0 0 0 0 0.10  0 0 0 0.55 -0.12' }, korn);

    var g = el('g', { class: 'bradlager' }, svg);
    el('rect', { x: 4, y: 6, width: VB - 8, height: VB - 8, rx: 26, fill: 'rgba(40, 25, 8, 0.18)' }, g);
    el('rect', { x: 4, y: 3, width: VB - 8, height: VB - 8, rx: 26, fill: 'url(#gbRam)' }, g);
    el('rect', { x: 14, y: 13, width: VB - 28, height: VB - 28, rx: 18, fill: 'url(#gbTra)' }, g);
    el('rect', { x: 14, y: 13, width: VB - 28, height: VB - 28, rx: 18, fill: '#000', filter: 'url(#gbKorn)', opacity: 0.55 }, g);
    el('rect', { x: 14.5, y: 13.5, width: VB - 29, height: VB - 29, rx: 18, fill: 'none', stroke: 'rgba(255,255,255,0.45)', 'stroke-width': 1.2 }, g);
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) {
      var p = peg(i, j);
      el('ellipse', { cx: p.x + 2.4, cy: p.y + 3.2, rx: 5.6, ry: 4.6, fill: 'rgba(70, 45, 15, 0.26)' }, g);
      el('circle', { cx: p.x, cy: p.y, r: 5.2, fill: 'url(#gbSpik)', stroke: '#575247', 'stroke-width': 0.6 }, g);
    }
    lager.fig = el('g', {}, svg);
    lager.anim = el('g', {}, svg);
    lager.prot = byggGradskiva(svg);
    lager.topp = el('g', {}, svg);
  }

  /* ---------- Gradskivan (byggs en gång) ---------- */
  function byggGradskiva(parent) {
    var G = el('g', { class: 'gradskiva' }, parent);
    var kropp = 'M ' + (-R - 10) + ' 18 L ' + (R + 10) + ' 18 L ' + (R + 10) + ' 0 A ' + (R + 10) + ' ' + (R + 10) + ' 0 0 0 ' + (-R - 10) + ' 0 Z';
    el('path', { d: kropp, fill: 'rgba(15, 22, 32, 0.13)', transform: 'translate(3 5)', 'pointer-events': 'none' }, G);
    el('path', { d: kropp, fill: 'url(#gbPlast)', stroke: '#2f5f8a', 'stroke-width': 1.5, 'data-prot': 'kropp', class: 'gs-kropp' }, G);
    el('path', { d: 'M ' + (-R - 5) + ' 0 A ' + (R + 5) + ' ' + (R + 5) + ' 0 0 1 ' + (R + 5) + ' 0', fill: 'none', stroke: 'rgba(255,255,255,0.8)', 'stroke-width': 1.6, 'pointer-events': 'none' }, G);
    el('path', { d: 'M ' + (-R + 64) + ' 0 A ' + (R - 64) + ' ' + (R - 64) + ' 0 0 1 ' + (R - 64) + ' 0', fill: 'rgba(255,255,255,0.18)', stroke: 'rgba(47, 95, 138, 0.5)', 'stroke-width': 1, 'pointer-events': 'none' }, G);
    var streck = '';
    for (var t = 0; t <= 180; t++) {
      var len = t % 10 === 0 ? 16 : t % 5 === 0 ? 11 : 6;
      var c = Math.cos(rad(t)), s = -Math.sin(rad(t));
      streck += 'M' + (R * c).toFixed(2) + ' ' + (R * s).toFixed(2) + 'L' + ((R - len) * c).toFixed(2) + ' ' + ((R - len) * s).toFixed(2);
      if (t % 10 === 0) streck += 'M' + ((R - 50) * c).toFixed(2) + ' ' + ((R - 50) * s).toFixed(2) + 'L' + ((R - 57) * c).toFixed(2) + ' ' + ((R - 57) * s).toFixed(2);
    }
    el('path', { d: streck, stroke: '#14304e', 'stroke-width': 0.95, fill: 'none', 'pointer-events': 'none' }, G);
    var yttre = el('g', { class: 'gs-yttre' }, G), inre = el('g', { class: 'gs-inre' }, G);
    for (var t2 = 0; t2 <= 180; t2 += 10) {
      var c2 = Math.cos(rad(t2)), s2 = -Math.sin(rad(t2)), vr = 90 - t2;
      var x1 = ((R - 27) * c2).toFixed(2), y1 = ((R - 27) * s2).toFixed(2);
      txt(yttre, x1, y1, t2, { transform: 'rotate(' + vr + ' ' + x1 + ' ' + y1 + ')' });
      var x2 = ((R - 42) * c2).toFixed(2), y2 = ((R - 42) * s2).toFixed(2);
      txt(inre, x2, y2, 180 - t2, { transform: 'rotate(' + vr + ' ' + x2 + ' ' + y2 + ')' });
    }
    el('line', { x1: -R - 4, y1: 0, x2: R + 4, y2: 0, stroke: '#14304e', 'stroke-width': 1.2, 'pointer-events': 'none' }, G);
    el('line', { x1: 0, y1: -12, x2: 0, y2: 12, stroke: '#14304e', 'stroke-width': 1.1, 'pointer-events': 'none' }, G);
    el('circle', { cx: 0, cy: 0, r: 4, fill: 'none', stroke: '#c8324a', 'stroke-width': 1.8, 'pointer-events': 'none' }, G);
    var H = el('g', { transform: 'translate(' + (R + 38) + ' 9)', class: 'gs-vrid' }, G);
    el('circle', { r: 19, fill: '#fffdf9', stroke: '#2f5f8a', 'stroke-width': 1.5, 'data-prot': 'vrid' }, H);
    // Ikon: en krökt pil medurs (samma form som ikonen rotate-cw i Lucide).
    var Ik = el('g', { transform: 'translate(-10.8 -10.8) scale(0.9)', fill: 'none', stroke: '#14304e', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'pointer-events': 'none' }, H);
    el('path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }, Ik);
    el('path', { d: 'M21 3v5h-5' }, Ik);
    return G;
  }

  // Var ligger gradskivan i förhållande till figuren?
  function protLage(g) {
    var p = st.prot;
    if (!p.syns || !g.V) return { typ: 'dold' };
    var k = -1;
    g.P.forEach(function (h, i) { if (Math.hypot(h.x - p.x, h.y - p.y) < 0.5) k = i; });
    if (k < 0) return { typ: 'fri' };
    var v = g.V[k], sidor = [v.aU, v.aW], e = -1, plusX = true;
    sidor.forEach(function (d, i) {
      if (e >= 0) return;
      if (diff(p.rot, d) < 0.01) { e = i; plusX = true; }
      else if (diff(p.rot, d + 180) < 0.01) { e = i; plusX = false; }
    });
    if (e < 0) return { typ: 'horn', k: k };
    var t = norm(p.rot - sidor[1 - e]);
    if (t > 180.001) return { typ: 'fel-sida', k: k };
    return { typ: 'las', k: k, skala: plusX ? 'yttre' : 'inre' };
  }

  /* ---------- Ritning ---------- */
  function bage(cx, cy, r, a0, inre, riktning) {
    var a1 = a0 + riktning * inre;
    return 'M ' + (cx + r * Math.cos(rad(a0))).toFixed(2) + ' ' + (cy + r * Math.sin(rad(a0))).toFixed(2) +
      ' A ' + r + ' ' + r + ' 0 ' + (inre > 180 ? 1 : 0) + ' ' + (riktning > 0 ? 1 : 0) + ' ' +
      (cx + r * Math.cos(rad(a1))).toFixed(2) + ' ' + (cy + r * Math.sin(rad(a1))).toFixed(2);
  }
  function malHorn(g) {
    if (st.steg !== 1 || !g.V) return -1;
    for (var i = 0; i < g.n; i++) if (status(i, g) !== 'ok') return i;
    return -1;
  }

  function rita() {
    var g = geo(), P = g.P, n = g.n, V = g.V;
    var F = lager.fig; while (F.firstChild) F.removeChild(F.firstChild);
    var T = lager.topp; while (T.firstChild) T.removeChild(T.firstChild);
    var pts = P.map(function (p) { return p.x + ',' + p.y; }).join(' ');

    // Triangelindelningen ligger under gummibandet.
    if (V && st.visa.trianglar) {
      var fran = 0;
      V.forEach(function (v, i) { if (v.inre > 180) fran = i; });
      var ny = st.delaNy ? ' ny' : '';
      for (var k = 1; k < n - 1; k++) {
        var a = P[fran], b = P[(fran + k) % n], c = P[(fran + k + 1) % n];
        el('polygon', { points: [a, b, c].map(function (q) { return q.x + ',' + q.y; }).join(' '), fill: k % 2 ? 'rgba(28, 95, 168, 0.14)' : 'rgba(176, 101, 26, 0.17)', class: 'triangel' + ny, style: 'animation-delay:' + (0.5 + 0.45 * k) + 's' }, F);
        var tp = { x: (a.x + b.x + c.x) / 3, y: (a.y + b.y + c.y) / 3 };
        txt(F, tp.x.toFixed(1), tp.y.toFixed(1), '180°', { class: 'triangel-tal' + ny, style: 'animation-delay:' + (0.75 + 0.45 * k) + 's' });
      }
      for (var k2 = 2; k2 < n - 1; k2++) {
        var q = P[(fran + k2) % n];
        el('line', { x1: P[fran].x, y1: P[fran].y, x2: q.x, y2: q.y, stroke: '#1f2530', 'stroke-width': 2.2, 'stroke-dasharray': '9 7', class: 'diagonal' + ny }, F);
      }
      st.delaNy = false;
    }

    el('polygon', { points: pts, fill: g.enkel ? 'rgba(207, 48, 71, 0.06)' : 'none', stroke: 'none' }, F);
    el('polygon', { points: pts, fill: 'none', stroke: 'rgba(60, 10, 20, 0.25)', 'stroke-width': 7, 'stroke-linejoin': 'round', transform: 'translate(1.6 2.4)' }, F);
    el('polygon', { points: pts, fill: 'none', stroke: '#c22d44', 'stroke-width': 5.6, 'stroke-linejoin': 'round' }, F);
    el('polygon', { points: pts, fill: 'none', stroke: 'rgba(255, 190, 200, 0.55)', 'stroke-width': 1.4, 'stroke-linejoin': 'round', transform: 'translate(-0.9 -1.2)' }, F);

    if (V && (st.visa.bagar || st.visa.facit)) {
      V.forEach(function (v, i) {
        var p = P[i];
        if (Math.abs(v.inre - 90) < 0.01) {
          var u = { x: Math.cos(rad(v.aU)), y: Math.sin(rad(v.aU)) }, w = { x: Math.cos(rad(v.aW)), y: Math.sin(rad(v.aW)) }, d = 19;
          el('path', { d: 'M ' + (p.x + d * u.x) + ' ' + (p.y + d * u.y) + ' L ' + (p.x + d * (u.x + w.x)) + ' ' + (p.y + d * (u.y + w.y)) + ' L ' + (p.x + d * w.x) + ' ' + (p.y + d * w.y), fill: 'none', stroke: FARG[i], 'stroke-width': 2.6 }, F);
        } else {
          el('path', { d: bage(p.x, p.y, 30, v.aU, v.inre, v.riktning) + ' L ' + p.x + ' ' + p.y + ' Z', fill: FARG[i], 'fill-opacity': 0.14, stroke: 'none' }, F);
          el('path', { d: bage(p.x, p.y, 30, v.aU, v.inre, v.riktning), fill: 'none', stroke: FARG[i], 'stroke-width': 2.8 }, F);
        }
        if (st.visa.facit) {
          var lr = v.inre < 50 ? 66 : v.inre > 180 ? 46 : 56;
          txt(F, (p.x + lr * Math.cos(rad(v.bis))).toFixed(1), (p.y + lr * Math.sin(rad(v.bis))).toFixed(1), g.hel[i] + '°', { fill: FARG[i], class: 'vinkeltal' });
        }
      });
    }
    P.forEach(function (p, i) {
      var b = V ? V[i].bis + 180 : -90;
      txt(F, (p.x + 27 * Math.cos(rad(b))).toFixed(1), (p.y + 27 * Math.sin(rad(b))).toFixed(1), NAMN[i], { class: 'hornnamn', fill: FARG[i] });
    });

    // Gradskivan
    var gp = lager.prot, lage = protLage(g);
    gp.setAttribute('transform', 'translate(' + st.prot.x.toFixed(2) + ' ' + st.prot.y.toFixed(2) + ') rotate(' + st.prot.rot.toFixed(2) + ')');
    gp.style.display = st.prot.syns ? '' : 'none';
    gp.classList.toggle('las-yttre', st.visa.lashjalp && lage.typ === 'las' && lage.skala === 'yttre');
    gp.classList.toggle('las-inre', st.visa.lashjalp && lage.typ === 'las' && lage.skala === 'inre');

    // Läshjälp: sidorna förlängs genom skalan när gradskivan sitter i ett hörn.
    if (st.visa.lashjalp && V && (lage.typ === 'las' || lage.typ === 'horn' || lage.typ === 'fel-sida')) {
      var v0 = V[lage.k], p0 = P[lage.k];
      [v0.aU, v0.aW].forEach(function (d) {
        el('line', { x1: p0.x, y1: p0.y, x2: p0.x + (R + 22) * Math.cos(rad(d)), y2: p0.y + (R + 22) * Math.sin(rad(d)), stroke: '#c22d44', 'stroke-width': 1.6, 'stroke-dasharray': '5 4', 'pointer-events': 'none', opacity: 0.9 }, T);
      });
    }

    var mal = malHorn(g);
    P.forEach(function (p, i) {
      if (i === mal) el('circle', { cx: p.x, cy: p.y, r: 13, fill: 'none', stroke: FARG[i], 'stroke-width': 3, class: 'puls', 'pointer-events': 'none' }, T);
      el('circle', { cx: p.x, cy: p.y, r: 7.5, fill: '#fffdf9', stroke: '#c22d44', 'stroke-width': 2.6, 'pointer-events': 'none' }, T);
      el('circle', { cx: p.x, cy: p.y, r: 24, fill: 'transparent', 'data-v': i, class: 'horn-grepp' }, T);
    });

    if (!st.visa.riv) { while (lager.anim.firstChild) lager.anim.removeChild(lager.anim.firstChild); }
    else if (V && !rivAnim) ritaRiv(g, 99);

    $('varning').hidden = g.enkel;
    statusrad(g, lage, mal);
    uppdateraProtokoll(g);
  }

  function statusrad(g, lage, mal) {
    var ikon = 'info', t;
    var namn = mal >= 0 ? NAMN[mal] : null;
    if (!g.enkel) { t = 'Gummibandet korsar sig självt. Flytta ett hörn så att figuren blir hel igen.'; ikon = 'varn'; }
    else if (lage.typ === 'dold') t = st.visa.riv ? 'Hörnen är avrivna och samlade runt en punkt.' : 'Gradskivan är undanlagd. Slå på den under Verktyg uppe till höger på brädan.';
    else if (lage.typ === 'fri') t = namn ? 'Dra gradskivan så att den röda ringen mitt på nollinjen hamnar i hörn ' + namn + '.' : 'Dra gradskivan så att den röda ringen hamnar i ett hörn. Den fastnar när den kommer nära.';
    else if (lage.typ === 'horn') t = 'Bra, ringen sitter i hörn ' + NAMN[lage.k] + '. Vrid gradskivan med det runda handtaget tills nollinjen ligger längs en av sidorna.';
    else if (lage.typ === 'fel-sida') { t = 'Bågen ligger på fel sida om nollinjen. Vrid gradskivan ett halvt varv, så att bågen täcker vinkeln.'; ikon = 'varn'; }
    else {
      ikon = 'ok';
      if (!st.visa.lashjalp) t = 'Gradskivan ligger an mot hörn ' + NAMN[lage.k] + '. Läs av vinkeln.';
      else if (g.V[lage.k].inre > 180) t = 'Vinkeln i hörn ' + NAMN[lage.k] + ' är större än 180°, så gradskivan mäter vinkeln på utsidan. Läs av på den ' + lage.skala + ' skalan och räkna 360° minus det.';
      else t = 'Läs av på den ' + lage.skala + ' skalan, där den streckade linjen korsar den. Den skalan börjar på 0 längs sidan som nollinjen ligger mot.';
    }
    $('status').className = 'statusrad ' + ikon;
    $('statusText').textContent = t;
  }

  /* ---------- Riv av hörnen ---------- */
  var rivAnim = null;
  function stopRiv() {
    if (rivAnim) cancelAnimationFrame(rivAnim);
    rivAnim = null;
    if (lager.anim) while (lager.anim.firstChild) lager.anim.removeChild(lager.anim.firstChild);
  }
  function startRiv() {
    stopRiv();
    var t0 = performance.now();
    function steg(nu) {
      var g = geo();
      if (!g.V || !st.visa.riv) { stopRiv(); return; }
      var t = (nu - t0) / 1000;
      if (t < 0.5 + g.n * 0.45 + 1) { ritaRiv(g, t); rivAnim = requestAnimationFrame(steg); }
      else { rivAnim = null; ritaRiv(g, 99); }
    }
    rivAnim = requestAnimationFrame(steg);
  }
  // t i sekunder sedan starten; hörn i börjar flytta sig vid 0,5 + 0,45 · i s.
  function ritaRiv(g, t) {
    var A = lager.anim; while (A.firstChild) A.removeChild(A.firstChild);
    var C = tyngdpunkt(g.P), r = 52, cum = 0, klar = true;
    g.V.forEach(function (v, i) {
      var p = g.P[i];
      var start = v.riktning < 0 ? v.aU : v.aW;        // sektorn går från start och −inre
      var mal = -cum, rr = r - 15 * Math.floor(cum / 360.001);
      var f = Math.max(0, Math.min(1, (t - 0.5 - 0.45 * i) / 0.95));
      if (f < 1) klar = false;
      var e = ease(f);
      var dv = mal - start; while (dv > 180) dv -= 360; while (dv < -180) dv += 360;
      var x = p.x + (C.x - p.x) * e, y = p.y + (C.y - p.y) * e, vr = start + dv * e, ra = 30 + (rr - 30) * e;
      var G = el('g', { transform: 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + vr.toFixed(2) + ')' }, A);
      var b = -v.inre;
      var d = 'M 0 0 L ' + ra.toFixed(2) + ' 0 A ' + ra.toFixed(2) + ' ' + ra.toFixed(2) + ' 0 ' + (v.inre > 180 ? 1 : 0) + ' 0 ' + (ra * Math.cos(rad(b))).toFixed(2) + ' ' + (ra * Math.sin(rad(b))).toFixed(2) + ' Z';
      el('path', { d: d, fill: FARG[i], 'fill-opacity': f > 0 ? 0.45 : 0.22, stroke: FARG[i], 'stroke-width': 2, 'stroke-linejoin': 'round' }, G);
      if (f > 0.15) {
        var lx = (ra * 0.6 * Math.cos(rad(b / 2))).toFixed(1), ly = (ra * 0.6 * Math.sin(rad(b / 2))).toFixed(1);
        txt(G, lx, ly, NAMN[i], { class: 'rivnamn', transform: 'rotate(' + (-vr).toFixed(2) + ' ' + lx + ' ' + ly + ')' });
      }
      cum += v.inre;
    });
    if (klar) {
      var tot = g.tot;
      if (tot === 180) el('line', { x1: C.x - r - 16, y1: C.y, x2: C.x + r + 16, y2: C.y, stroke: '#1f2530', 'stroke-width': 1.8, 'stroke-dasharray': '5 4', class: 'tona' }, A);
      else el('circle', { cx: C.x, cy: C.y, r: r + 6, fill: 'none', stroke: '#1f2530', 'stroke-width': 1.8, 'stroke-dasharray': '5 4', class: 'tona' }, A);
      el('circle', { cx: C.x, cy: C.y, r: 3.2, fill: '#1f2530' }, A);
      var etikett = tot === 180 ? 'Ett halvt varv = 180°' : tot === 360 ? 'Ett helt varv = 360°' : fmt(tot / 360) + ' varv = ' + tot + '°';
      var ly2 = C.y + (tot === 180 ? 30 : r + 30);
      var bred = etikett.length * 9 + 26;
      el('rect', { x: (C.x - bred / 2).toFixed(1), y: ly2 - 16, width: bred.toFixed(1), height: 32, rx: 16, fill: '#1f2530', class: 'tona' }, A);
      txt(A, C.x.toFixed(1), ly2, etikett, { class: 'riv-etikett tona' });
    }
  }

  /* ---------- Visa hur (gradskivan glider fram) ---------- */
  var tween = null;
  function placering(k) {
    var g = geo(); if (!g.V) return null;
    var v = g.V[k], p = g.P[k];
    // Nollinjen längs sidan mot nästa hörn, med bågen över vinkeln
    // (för en vinkel större än 180° över vinkeln på utsidan).
    var rot = v.aW, bis = v.inre > 180 ? v.bis + 180 : v.bis;
    if (Math.cos(rad(rot - 90 - bis)) < 0) rot += 180;
    return { x: p.x, y: p.y, rot: norm(rot) };
  }
  function glid(mal, ms) {
    if (tween) cancelAnimationFrame(tween);
    var fr = { x: st.prot.x, y: st.prot.y, rot: st.prot.rot }, t0 = performance.now();
    var dv = mal.rot - fr.rot; while (dv > 180) dv -= 360; while (dv < -180) dv += 360;
    st.prot.syns = true; $('visaGs').checked = true;
    function steg(nu) {
      var f = Math.min(1, (nu - t0) / ms), e = ease(f);
      st.prot.x = fr.x + (mal.x - fr.x) * e; st.prot.y = fr.y + (mal.y - fr.y) * e;
      st.prot.rot = norm(fr.rot + dv * e);
      if (f >= 1) { st.prot.x = mal.x; st.prot.y = mal.y; st.prot.rot = mal.rot; }
      rita();
      tween = f < 1 ? requestAnimationFrame(steg) : null;
    }
    tween = requestAnimationFrame(steg);
  }

  /* ---------- Mätprotokollet ---------- */
  function status(i, g) {
    var v = tolka(st.matt[i]);
    if (v === null || !g.V) return 'tom';
    var inre = g.V[i].inre;
    if (Math.abs(v - inre) <= 1.5) return 'ok';
    if (inre < 180 && Math.abs(v - (180 - inre)) <= 1.5) return 'skala';
    if (inre > 180 && Math.abs(v - (360 - inre)) <= 1.5) return 'utsida';
    return 'fel';
  }
  var RESPONS = {
    ok: function (i) { return 'Vinkel ' + NAMN[i] + ' stämmer. Bra mätt!'; },
    skala: function (i) { return 'Vinkel ' + NAMN[i] + ': du har nog läst på fel skala. Börja på den nolla som ligger längs sidan, och följ samma skala hela vägen.'; },
    utsida: function (i) { return 'Vinkel ' + NAMN[i] + ': det där är vinkeln på utsidan. Vinkeln inne i figuren är 360° minus den.'; },
    fel: function (i) { return 'Vinkel ' + NAMN[i] + ' stämmer inte riktigt. Kontrollera att ringen sitter i hörnet och att nollinjen ligger längs sidan, och mät igen.'; }
  };
  var IKON = {
    ok: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#2f8a4e"/><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    hint: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#b0651a"/><path d="M12 7v6.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17" r="1.4" fill="#fff"/></svg>'
  };

  function byggProtokoll() {
    var tb = $('protokoll');
    tb.innerHTML = '';
    st.pts.forEach(function (_, i) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<th scope="row"><span class="prick" style="background:' + FARG[i] + '"></span>Vinkel ' + NAMN[i] + '</th>' +
        '<td><label class="matt"><input type="text" inputmode="decimal" autocomplete="off" aria-label="Uppmätt vinkel ' + NAMN[i] + ' i grader" data-i="' + i + '"><span>°</span></label></td>' +
        '<td class="ikon" data-ik="' + i + '"></td><td class="facit-cell" data-f="' + i + '"></td>';
      tb.appendChild(tr);
    });
    tb.querySelectorAll('input').forEach(function (inp) {
      var i = +inp.dataset.i;
      inp.value = st.matt[i] || '';
      inp.addEventListener('input', function () { st.matt[i] = inp.value; st.senast = null; rita(); });
      inp.addEventListener('change', function () { st.senast = i; rita(); });
      inp.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        st.senast = i; rita();
        var nasta = tb.querySelector('input[data-i="' + (i + 1) + '"]');
        if (nasta) nasta.focus();
      });
    });
    $('figurnamn').textContent = FIGURNAMN[st.pts.length];
    $('fragan').textContent = 'Vad blir vinklarna i en ' + FIGURNAMN[st.pts.length] + ' tillsammans?';
    document.querySelectorAll('.figurval [data-n]').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.n === st.pts.length ? 'true' : 'false'); });
  }

  function uppdateraProtokoll(g) {
    var n = g.n, alla = true, sum = 0;
    for (var i = 0; i < n; i++) {
      var s = status(i, g), inp = document.querySelector('#protokoll input[data-i="' + i + '"]');
      if (!inp) continue;
      var harVarde = tolka(st.matt[i]) !== null;
      // Respons först när eleven lämnat fältet eller tryckt Enter, inte mitt i skrivandet.
      var visad = harVarde && (document.activeElement !== inp || st.senast === i);
      inp.className = visad ? 'st-' + s : '';
      $('protokoll').querySelector('[data-ik="' + i + '"]').innerHTML = visad ? (s === 'ok' ? IKON.ok : IKON.hint) : '';
      var fc = $('protokoll').querySelector('[data-f="' + i + '"]');
      fc.textContent = st.visa.facit && g.hel ? g.hel[i] + '°' : '';
      fc.hidden = !st.visa.facit;
      if (!harVarde) alla = false; else sum += tolka(st.matt[i]);
    }
    $('facitKol').hidden = !st.visa.facit;
    var r = $('respons');
    if (st.senast !== null && g.V && tolka(st.matt[st.senast]) !== null) {
      var s2 = status(st.senast, g);
      r.innerHTML = (s2 === 'ok' ? IKON.ok : IKON.hint) + '<span>' + esc(RESPONS[s2](st.senast)) + '</span>';
      r.className = 'respons ' + (s2 === 'ok' ? 'ok' : 'hint');
      r.hidden = false;
    } else r.hidden = true;

    var ifyllda = st.matt.filter(function (m) { return tolka(m) !== null; }).length;
    $('summa').textContent = ifyllda ? fmt(sum) + '°' : '–';
    $('summeraBtn').hidden = !(alla && g.enkel);

    var mal = malHorn(g), t;
    if (!g.enkel) t = 'Flytta hörnen så att gummibandet inte korsar sig självt.';
    else if (mal < 0) t = alla ? 'Alla vinklar är uppmätta. Lägg ihop dem!' : 'Mät vinklarna och skriv in dem.';
    else if (g.V[mal].inre > 180) t = 'Mät vinkel ' + NAMN[mal] + '. Den buktar inåt och är större än 180°, så den ryms inte på gradskivan. Mät vinkeln på utsidan och räkna 360° minus den.';
    else t = 'Mät vinkel ' + NAMN[mal] + ', som blinkar på brädan, och skriv in det du läser av.';
    $('s1text').textContent = t;
    $('visaHur').textContent = mal >= 0 ? 'Visa hur man mäter vinkel ' + NAMN[mal] : 'Visa hur man lägger gradskivan';
  }

  /* ---------- Stegkorten ---------- */
  function miniatyr(pts) {
    var P = hornPunkter(pts);
    return '<svg class="mini" viewBox="20 20 600 600" aria-hidden="true"><polygon points="' + P.map(function (p) { return p.x + ',' + p.y; }).join(' ') + '" fill="rgba(207,48,71,0.12)" stroke="#c22d44" stroke-width="24" stroke-linejoin="round"/></svg>';
  }
  function uttryck(vals) {
    return vals.map(function (v, i) { return '<span style="color:' + FARG[i] + '">' + fmt(v) + '°</span>'; }).join(' + ');
  }

  function ritaKort() {
    document.querySelectorAll('.kort').forEach(function (k) {
      var s = +k.dataset.steg;
      k.classList.toggle('oppen', s === st.steg);
      k.classList.toggle('klar', s < st.nattSteg && s !== st.steg);
      k.classList.toggle('last', s > st.nattSteg);
      k.querySelector('.kort-huvud').setAttribute('aria-expanded', s === st.steg ? 'true' : 'false');
    });
    var n = st.pts.length, namn = FIGURNAMN[n], best = FIGURNAMN_BEST[n], tot = (n - 2) * 180;

    // Steg 2
    var egna = st.logg.filter(function (e) { return e.n === n; });
    var h = '';
    if (!egna.length) h = '<p class="instr">Mät först alla vinklar i steg 1. Sedan lägger du ihop dem här.</p>';
    else {
      var e = egna[egna.length - 1];
      h += '<p class="instr">Summan av vinklarna i din ' + namn + ':</p><div class="uttryck">' + uttryck(e.vals) + ' = <b>' + fmt(e.sum) + '°</b></div>';
      if (egna.length === 1) {
        if (!st.gissning) {
          h += '<p class="fraga">Tror du att summan blir densamma om du gör en helt annan ' + namn + '?</p><div class="val">' +
            [['storre', 'Den blir större'], ['mindre', 'Den blir mindre'], ['samma', 'Den blir ungefär densamma'], ['beror', 'Det beror på figuren']].map(function (o) {
              return '<button type="button" class="valknapp" data-action="gissa" data-g="' + o[0] + '">' + o[1] + '</button>';
            }).join('') + '</div>';
        } else {
          h += '<p class="instr">Pröva! Gör en ny ' + namn + ' och mät igen.</p><div class="knapprad"><button type="button" class="knapp primar" data-action="nasta-figur">Ny ' + namn + ', mät igen</button></div>';
        }
      } else {
        h += '<div class="logg">' + egna.map(function (x, i) { return '<div class="loggrad">' + miniatyr(x.pts) + '<span>' + ordning(i + 1) + ' ' + best + '</span><b>' + fmt(x.sum) + '°</b></div>'; }).join('') + '</div>';
        var nara = egna.every(function (x) { return Math.abs(x.sum - tot) <= 6; });
        h += '<div class="slutsats"><p>' + (nara ? 'Summorna hamnar nära ' + tot + '° varje gång, fast figurerna ser helt olika ut.' : 'Jämför summorna. Ligger de nära varandra?') + '</p>';
        h += '<p><b>Vinkelsumman i en ' + namn + ' är alltid ' + tot + '°.</b> Att din summa inte blir exakt ' + tot + '° beror på att varje mätning kan bli någon grad fel.</p>';
        if (st.gissning && n === 4) h += '<p class="liten">' + (st.gissning === 'samma' ? 'Du gissade att summan blir densamma, och det stämde.' : 'Du gissade något annat, men summan blev ungefär densamma. Det är precis så man upptäcker ett samband.') + '</p>';
        h += '</div><div class="knapprad"><button type="button" class="knapp primar" data-action="till-steg" data-s="3">Varför blir det så?</button><button type="button" class="knapp" data-action="nasta-figur">Mät en till</button></div>';
      }
    }
    $('s2').innerHTML = h;

    // Steg 3
    var varv = tot / 360, tri = n - 2;
    var varvText = tot === 180 ? 'ett halvt varv, alltså en rak vinkel. Ett halvt varv är 180°.' : tot === 360 ? 'precis ett helt varv runt punkten. Ett helt varv är 360°.' : fmt(varv) + ' varv, och ' + fmt(varv) + ' · 360° = ' + tot + '°.';
    h = '<p class="instr">Två sätt att se varför summan blir ' + tot + '°. Pröva båda på brädan.</p>' +
      '<div class="experiment">' +
      '<button type="button" class="exp' + (st.visa.riv ? ' aktiv' : '') + '" data-action="riv" aria-pressed="' + st.visa.riv + '">' +
      '<svg width="46" height="46" viewBox="0 0 44 44" aria-hidden="true"><path d="M22 22 L40 22 A18 18 0 0 0 22 4 Z" fill="#c8324a" fill-opacity=".35" stroke="#c8324a" stroke-width="1.6"/><path d="M22 22 L22 4 A18 18 0 0 0 5 16 Z" fill="#1c5fa8" fill-opacity=".35" stroke="#1c5fa8" stroke-width="1.6"/><path d="M22 22 L5 16 A18 18 0 0 0 16 39 Z" fill="#3f7a34" fill-opacity=".35" stroke="#3f7a34" stroke-width="1.6"/><path d="M22 22 L16 39 A18 18 0 0 0 40 22 Z" fill="#b0651a" fill-opacity=".35" stroke="#b0651a" stroke-width="1.6"/></svg>' +
      '<span><b>Riv av hörnen</b><small>och lägg dem intill varandra</small></span></button>' +
      '<button type="button" class="exp' + (st.visa.trianglar ? ' aktiv' : '') + '" data-action="dela" aria-pressed="' + st.visa.trianglar + '">' +
      '<svg width="46" height="46" viewBox="0 0 44 44" aria-hidden="true"><path d="M6 34 L14 8 L38 6 Z" fill="#1c5fa8" fill-opacity=".2"/><path d="M6 34 L38 6 L40 38 Z" fill="#b0651a" fill-opacity=".22"/><path d="M6 34 L14 8 L38 6 L40 38 Z" fill="none" stroke="#c22d44" stroke-width="2.4" stroke-linejoin="round"/><path d="M6 34 L38 6" stroke="#1f2530" stroke-width="1.6" stroke-dasharray="3.5 3"/></svg>' +
      '<span><b>Dela i trianglar</b><small>med diagonaler från ett hörn</small></span></button></div>';
    if (st.visa.riv) h += '<div class="forklaring"><b>Hörnen samlade.</b> När hörnen läggs intill varandra runt en punkt fyller de ' + varvText + '</div>';
    if (st.visa.trianglar) h += '<div class="forklaring"><b>Trianglarna.</b> ' + (n === 3 ? 'Figuren är redan en triangel, och vinkelsumman i en triangel är 180°.' : 'Diagonalerna delar ' + best + ' i ' + tri + ' trianglar. Trianglarnas vinklar bildar tillsammans precis ' + best + 's vinklar. Varje triangel har vinkelsumman 180°, så summan blir ' + tri + ' · 180° = ' + tot + '°.') + '</div>';
    h += '<div class="knapprad"><button type="button" class="knapp primar" data-action="till-steg" data-s="4">Pröva fler hörn</button></div>';
    $('s3').innerHTML = h;

    // Steg 4
    h = '<p class="instr">Välj antal hörn, mät vinklarna i steg 1 och lägg ihop dem. Fyll tabellen. Ser du ett mönster?</p>' +
      '<div class="seg" role="group" aria-label="Antal hörn i undersökningen">' + [3, 4, 5, 6].map(function (k) {
        return '<button type="button" data-action="n4" data-n="' + k + '" aria-pressed="' + (k === n) + '">' + k + ' hörn</button>';
      }).join('') + '</div>' +
      '<table class="monster"><thead><tr><th>Hörn</th><th>Trianglar</th><th>Din summa</th><th>Vinkelsumma</th></tr></thead><tbody>' +
      [3, 4, 5, 6].map(function (k) {
        var m = st.logg.filter(function (x) { return x.n === k; }), sist = m[m.length - 1];
        return '<tr' + (k === n ? ' class="nu"' : '') + '><td>' + k + '</td><td>' + (k - 2) + '</td><td>' + (sist ? fmt(sist.sum) + '°' : '<span class="tomt">?</span>') + '</td><td>' + (st.monster ? '<b>' + (k - 2) * 180 + '°</b>' : '<span class="tomt">?</span>') + '</td></tr>';
      }).join('') + '</tbody></table>';
    if (!st.monster) h += '<div class="knapprad"><button type="button" class="knapp primar" data-action="monster">Visa mönstret</button></div>';
    else h += '<div class="formelruta"><span>Vinkelsumman i en månghörning med <em>n</em> hörn</span><b>(<em>n</em> − 2) · 180°</b><small>Från ett hörn kan figuren alltid delas i <em>n</em> − 2 trianglar, och varje triangel bidrar med 180°.</small></div>';
    $('s4').innerHTML = h;
  }

  /* ---------- Händelser i panelen ---------- */
  function gaTill(s) {
    st.steg = s; if (s > st.nattSteg) st.nattSteg = s;
    ritaKort(); rita();
    var k = $('kort' + s);
    if (k) setTimeout(function () {
      var r = k.getBoundingClientRect();
      if (r.top < 60 || r.top > innerHeight - 140) k.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  }
  document.querySelector('.sida').addEventListener('click', function (e) {
    var b = e.target.closest('[data-action]');
    if (!b) return;
    var a = b.dataset.action, g;
    if (a === 'oppna') gaTill(+b.dataset.s);
    else if (a === 'n') sattFigur(slumpaFigur(+b.dataset.n));
    else if (a === 'n4') { sattFigur(slumpaFigur(+b.dataset.n)); gaTill(1); }
    else if (a === 'ny-figur') sattFigur(slumpaFigur(st.pts.length));
    else if (a === 'nasta-figur') { sattFigur(slumpaFigur(st.pts.length)); gaTill(1); }
    else if (a === 'visa-hur') {
      g = geo(); var k = malHorn(g); if (k < 0) k = 0;
      var pl = placering(k); if (pl) glid(pl, 1100);
    }
    else if (a === 'summera') {
      g = geo();
      var vals = st.matt.map(tolka);
      st.logg.push({ n: g.n, pts: st.pts.map(function (p) { return p.slice(); }), vals: vals, sum: vals.reduce(function (s, v) { return s + v; }, 0) });
      gaTill(st.nattSteg >= 4 ? 4 : 2);
    }
    else if (a === 'gissa') { st.gissning = b.dataset.g; ritaKort(); }
    else if (a === 'till-steg') gaTill(+b.dataset.s);
    else if (a === 'riv') {
      // Riv av hörnen och Dela i trianglar visas en i taget: båda på brädan
      // samtidigt blir bara grötigt. Att välja den ena släcker den andra.
      st.visa.riv = !st.visa.riv;
      if (st.visa.riv) { st.visa.trianglar = false; st.delaNy = false; st.prot.syns = false; $('visaGs').checked = false; rita(); startRiv(); }
      else { stopRiv(); rita(); }
      ritaKort();
    }
    else if (a === 'dela') {
      st.visa.trianglar = !st.visa.trianglar; st.delaNy = st.visa.trianglar;
      if (st.visa.trianglar && st.visa.riv) { st.visa.riv = false; stopRiv(); }
      rita(); ritaKort();
    }
    else if (a === 'monster') { st.monster = true; ritaKort(); }
  });

  $('visaGs').addEventListener('change', function (e) { st.prot.syns = e.target.checked; rita(); });
  $('vridV').addEventListener('click', function () { st.prot.rot = norm(st.prot.rot - 1); rita(); });
  $('vridH').addEventListener('click', function () { st.prot.rot = norm(st.prot.rot + 1); rita(); });
  $('lagUndan').addEventListener('click', function () { glid({ x: UNDAN.x, y: UNDAN.y, rot: 0 }, 600); });
  $('visaBagar').addEventListener('change', function (e) { st.visa.bagar = e.target.checked; rita(); });
  $('visaFacit').addEventListener('change', function (e) { st.visa.facit = e.target.checked; rita(); });
  $('lashjalp').addEventListener('change', function (e) { st.visa.lashjalp = e.target.checked; rita(); });
  $('rensa').addEventListener('click', function () { st.matt = st.matt.map(function () { return ''; }); st.senast = null; byggProtokoll(); rita(); });
  $('borjaOm').addEventListener('click', function () {
    st.logg = []; st.gissning = null; st.monster = false; st.steg = 1; st.nattSteg = 1;
    st.prot.x = UNDAN.x; st.prot.y = UNDAN.y; st.prot.rot = 0; st.prot.syns = true; $('visaGs').checked = true;
    sattFigur(STARTFIGUR[4].map(function (p) { return p.slice(); }));
  });

  /* ---------- Verktygsrutan och fullskärm ---------- */
  $('verktygDolj').addEventListener('click', function () { $('verktyg').hidden = true; $('verktygVisa').hidden = false; $('verktygVisa').focus(); });
  $('verktygVisa').addEventListener('click', function () { $('verktyg').hidden = false; $('verktygVisa').hidden = true; });

  // Hela arbetsytan (brädan och stegen) går i fullskärm, så att allt går att nå där.
  var app = document.querySelector('.app');
  var kanFs = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  function iFs() { return (document.fullscreenElement || document.webkitFullscreenElement) === app; }
  $('fsBtn').hidden = !kanFs;
  $('fsBtn').addEventListener('click', function () {
    if (iFs()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else (app.requestFullscreen || app.webkitRequestFullscreen).call(app);
  });
  function fsAndrad() {
    var pa = iFs();
    app.classList.toggle('fs', pa);
    $('fsBtn').setAttribute('aria-label', pa ? 'Lämna fullskärm' : 'Fullskärm');
    $('fsBtn').title = pa ? 'Lämna fullskärm' : 'Fullskärm';
    // På mobil tar verktygen annars halva skärmen: i fullskärm börjar de
    // hopfällda, så att brädan får ytan, och fälls ut med knappen på brädan.
    if (window.matchMedia('(max-width: 600px), (max-height: 560px)').matches) {
      $('verktyg').hidden = pa; $('verktygVisa').hidden = !pa;
    }
  }
  document.addEventListener('fullscreenchange', fsAndrad);
  document.addEventListener('webkitfullscreenchange', fsAndrad);

  /* ---------- Dra och vrid på brädan ---------- */
  var drag = null;
  function lokal(e) {
    var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    var m = svg.getScreenCTM();
    return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }
  svg.addEventListener('pointerdown', function (e) {
    var t = e.target, p = lokal(e);
    if (!t.dataset) return;
    if (t.dataset.v !== undefined) drag = { typ: 'horn', i: +t.dataset.v, flyttad: false };
    else if (t.dataset.prot === 'vrid') drag = { typ: 'vrid', start: deg(Math.atan2(p.y - st.prot.y, p.x - st.prot.x)) - st.prot.rot };
    else if (t.dataset.prot === 'kropp') drag = { typ: 'flytta', dx: p.x - st.prot.x, dy: p.y - st.prot.y };
    else return;
    if (tween) { cancelAnimationFrame(tween); tween = null; }
    e.preventDefault();
    svg.setPointerCapture(e.pointerId);
    svg.classList.add('drar');
  });
  svg.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var p = lokal(e);
    if (drag.typ === 'horn') {
      var i = Math.max(0, Math.min(N - 1, Math.round((p.x - M) / S))), j = Math.max(0, Math.min(N - 1, Math.round((p.y - M) / S)));
      var cur = st.pts[drag.i], gammal = peg(cur[0], cur[1]);
      if (cur[0] === i && cur[1] === j) return;
      if (st.pts.some(function (q) { return q[0] === i && q[1] === j; })) return;
      // Sitter gradskivan i hörnet följer den med.
      var foljer = Math.hypot(st.prot.x - gammal.x, st.prot.y - gammal.y) < 0.5;
      st.pts[drag.i] = [i, j];
      if (foljer) { st.prot.x = peg(i, j).x; st.prot.y = peg(i, j).y; }
      if (!drag.flyttad) {
        drag.flyttad = true;
        // Figuren är ny: de gamla mätningarna gäller inte längre.
        if (st.matt.some(function (m) { return tolka(m) !== null; })) { st.matt = st.matt.map(function () { return ''; }); st.senast = null; byggProtokoll(); }
      }
      rita();
    } else if (drag.typ === 'flytta') {
      var x = Math.max(-60, Math.min(VB + 60, p.x - drag.dx)), y = Math.max(24, Math.min(VB + 40, p.y - drag.dy));
      hornPunkter().forEach(function (h) { if (Math.hypot(h.x - x, h.y - y) < 18) { x = h.x; y = h.y; } });
      st.prot.x = x; st.prot.y = y;
      rita();
    } else {
      var rot = deg(Math.atan2(p.y - st.prot.y, p.x - st.prot.x)) - drag.start;
      var P = hornPunkter(), n = P.length;
      P.forEach(function (h, k) {
        if (Math.hypot(h.x - st.prot.x, h.y - st.prot.y) > 0.5) return;
        [P[(k + n - 1) % n], P[(k + 1) % n]].forEach(function (q) {
          var d = deg(Math.atan2(q.y - h.y, q.x - h.x));
          if (diff(rot, d) < 4) rot = d; else if (diff(rot, d + 180) < 4) rot = d + 180;
        });
      });
      st.prot.rot = norm(rot);
      rita();
    }
  });
  function slutaDra() { if (drag && drag.typ === 'horn' && drag.flyttad) ritaKort(); drag = null; svg.classList.remove('drar'); }
  svg.addEventListener('pointerup', slutaDra);
  svg.addEventListener('pointercancel', slutaDra);

  // Piltangenterna vrider gradskivan en grad när brädan har fokus.
  svg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      st.prot.rot = norm(st.prot.rot + (e.key === 'ArrowLeft' ? -1 : 1)); rita(); e.preventDefault();
    }
  });

  /* ---------- Start ---------- */
  byggBrada();
  var n0 = parseInt(new URLSearchParams(location.search).get('n'), 10);
  if (!(n0 >= 3 && n0 <= 6)) n0 = 4;
  sattFigur(STARTFIGUR[n0].map(function (p) { return p.slice(); }));
})();

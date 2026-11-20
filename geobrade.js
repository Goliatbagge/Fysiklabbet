/* Geobräda med gradskiva — Fysiklabbet
 *
 * En digital geobräda: ett gummiband spänns mellan spikar i ett rutnät och
 * bildar en månghörning med 3–6 hörn. Hörnen dras mellan spikarna. En
 * gradskiva av genomskinlig plast kan flyttas och vridas fritt, så att
 * eleven själv mäter vinklarna och skriver in dem i mätprotokollet.
 * Facit (vinkelbågar, vinklarnas storlek, triangelindelningen och hörnen
 * lagda intill varandra) visas först när eleven slår på det.
 *
 * Koordinater: SVG med viewBox 0 0 640 640, y nedåt. Spikarna ligger i ett
 * rutnät med 11 × 11 spikar (index 0–10). Gradskivans lokala system har
 * medelpunkten i origo, nollinjen längs +x och bågen åt −y.
 *
 * Adressen geobrade.html?n=3 … ?n=6 väljer antalet hörn vid start.
 */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var VB = 640, N = 11, M = 50, S = (VB - 2 * M) / (N - 1); // spikavstånd 54
  var R = 170;                         // gradskivans radie
  var FARG = ['#c8324a', '#1c5fa8', '#3f7a34', '#a5641a', '#7b3fa0', '#13807a'];
  var NAMN = ['A', 'B', 'C', 'D', 'E', 'F'];
  var STARTFIGUR = {
    3: [[2, 8], [8, 7], [4, 2]],
    4: [[1, 7], [3, 2], [8, 1], [9, 8]],
    5: [[1, 6], [3, 2], [7, 1], [9, 5], [5, 9]],
    6: [[1, 5], [3, 1], [7, 2], [9, 5], [7, 9], [3, 8]]
  };

  var st = {
    pts: [],
    prot: { x: 300, y: 626, rot: 0, syns: true },
    bagar: false, facit: false, trianglar: false, horn: false,
    matt: []
  };

  var svg = document.getElementById('bradan');
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Hjälpfunktioner ---------- */
  function peg(i, j) { return { x: M + S * i, y: M + S * j }; }
  function fmt(x, d) {
    var s = x.toFixed(d || 0);
    if (parseFloat(s) === 0) return '0';
    return s.replace('.', ',').replace('-', '−');
  }
  function el(tag, attr, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attr) e.setAttribute(k, attr[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function norm(a) { a %= 360; if (a < 0) a += 360; return a; }
  function diff(a, b) { var d = norm(a - b); return d > 180 ? 360 - d : d; }
  function deg(r) { return r * 180 / Math.PI; }
  function rad(d) { return d * Math.PI / 180; }
  function tolka(s) {
    s = String(s || '').trim().replace(',', '.').replace('°', '');
    if (s === '') return null;
    var v = parseFloat(s);
    return isFinite(v) ? v : null;
  }

  /* ---------- Geometri ---------- */
  function hornPunkter() { return st.pts.map(function (p) { return peg(p[0], p[1]); }); }

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

  // Är månghörningen enkel (inga sidor som korsar eller nuddar varandra)?
  function arEnkel(P) {
    var n = P.length;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        if (j === i + 1 || (i === 0 && j === n - 1)) continue;
        if (korsar(P[i], P[(i + 1) % n], P[j], P[(j + 1) % n])) return false;
      }
    }
    // Ett hörn som ligger på en icke-angränsande sida räknas också som fel.
    return true;
  }

  function area(P) {
    var a = 0;
    for (var i = 0; i < P.length; i++) { var p = P[i], q = P[(i + 1) % P.length]; a += p.x * q.y - q.x * p.y; }
    return a / 2;
  }

  // Inre vinklar i grader, samt riktningarna för båda sidorna i varje hörn.
  function vinklar(P) {
    var n = P.length, sgn = area(P) > 0 ? 1 : -1, ut = [];
    for (var i = 0; i < n; i++) {
      var p = P[(i + n - 1) % n], v = P[i], q = P[(i + 1) % n];
      var t1 = Math.atan2(v.y - p.y, v.x - p.x), t2 = Math.atan2(q.y - v.y, q.x - v.x);
      var sv = deg(t2 - t1); while (sv > 180) sv -= 360; while (sv <= -180) sv += 360;
      var inre = 180 - sv * sgn;
      var aU = deg(Math.atan2(p.y - v.y, p.x - v.x)), aW = deg(Math.atan2(q.y - v.y, q.x - v.x));
      // Bågen går från sidan mot föregående hörn och vrids "inre" grader.
      var riktning = diff(aU + inre, aW) < 0.01 ? 1 : -1;
      ut.push({ inre: inre, aU: aU, aW: aW, riktning: riktning, bis: aU + riktning * inre / 2 });
    }
    return ut;
  }

  // Avrunda till hela grader så att summan blir exakt rätt (största resten).
  function heltal(V, total) {
    var g = V.map(function (v) { return Math.floor(v + 1e-9); });
    var rest = total - g.reduce(function (s, x) { return s + x; }, 0);
    var ord = V.map(function (v, i) { return { i: i, r: v - Math.floor(v + 1e-9) }; }).sort(function (a, b) { return b.r - a.r; });
    for (var k = 0; k < rest && k < ord.length; k++) g[ord[k].i]++;
    return g;
  }

  /* ---------- Ny figur ---------- */
  function slumpaFigur(n) {
    for (var forsok = 0; forsok < 500; forsok++) {
      var cx = 5, cy = 5, pts = [], upptagen = {};
      var start = Math.random() * 2 * Math.PI;
      var ok = true;
      for (var k = 0; k < n; k++) {
        var a = start + 2 * Math.PI * k / n + (Math.random() - 0.5) * (Math.PI / n);
        var r = 2.4 + Math.random() * 2.6;
        var i = Math.round(cx + r * Math.cos(a)), j = Math.round(cy + r * Math.sin(a));
        i = Math.max(0, Math.min(10, i)); j = Math.max(0, Math.min(10, j));
        if (upptagen[i + ',' + j]) { ok = false; break; }
        upptagen[i + ',' + j] = 1;
        pts.push([i, j]);
      }
      if (!ok) continue;
      var P = pts.map(function (p) { return peg(p[0], p[1]); });
      if (!arEnkel(P) || Math.abs(area(P)) < 14 * S * S) continue;
      var V = vinklar(P);
      if (V.some(function (v) { return v.inre < 25 || Math.abs(v.inre - 180) < 8; })) continue;
      // Rutnätets riktningar ger ofta räta vinklar; en rät vinkel per figur räcker.
      if (V.filter(function (v) { return Math.abs(v.inre - 90) < 0.5; }).length > 1) continue;
      return pts;
    }
    return STARTFIGUR[n].map(function (p) { return p.slice(); });
  }

  function sattFigur(pts) {
    st.pts = pts;
    st.matt = pts.map(function () { return ''; });
    byggProtokoll();
    rita();
  }

  /* ---------- Ritning ---------- */
  function ritaBrada(g) {
    var defs = el('defs', {}, g);
    var tra = el('linearGradient', { id: 'gbTra', x1: '0', y1: '0', x2: '1', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ecdcba' }, tra);
    el('stop', { offset: '1', 'stop-color': '#dcc395' }, tra);
    var spik = el('radialGradient', { id: 'gbSpik', cx: '0.38', cy: '0.35', r: '0.7' }, defs);
    el('stop', { offset: '0', 'stop-color': '#f4f1ea' }, spik);
    el('stop', { offset: '0.55', 'stop-color': '#a9a49a' }, spik);
    el('stop', { offset: '1', 'stop-color': '#6b665d' }, spik);
    el('rect', { x: 8, y: 8, width: VB - 16, height: VB - 16, rx: 22, fill: '#b99a63' }, g);
    el('rect', { x: 12, y: 10, width: VB - 24, height: VB - 24, rx: 19, fill: 'url(#gbTra)' }, g);
    // Träådring: några mjuka, svaga kurvor.
    for (var k = 0; k < 9; k++) {
      var y0 = 40 + k * 68 + (k % 3) * 9;
      el('path', {
        d: 'M 20 ' + y0 + ' C 180 ' + (y0 - 14) + ', 420 ' + (y0 + 16) + ', 620 ' + (y0 - 6),
        fill: 'none', stroke: 'rgba(120, 82, 34, 0.10)', 'stroke-width': 2 + (k % 2)
      }, g);
    }
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) {
      var p = peg(i, j);
      el('circle', { cx: p.x + 1.6, cy: p.y + 2.2, r: 5.2, fill: 'rgba(70, 45, 15, 0.22)' }, g);
      el('circle', { cx: p.x, cy: p.y, r: 5, fill: 'url(#gbSpik)', stroke: '#5e594f', 'stroke-width': 0.6 }, g);
    }
  }

  function bage(cx, cy, r, a0, inre, riktning) {
    var a1 = a0 + riktning * inre;
    var x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    var x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    return 'M ' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A ' + r + ' ' + r + ' 0 ' + (inre > 180 ? 1 : 0) + ' ' + (riktning > 0 ? 1 : 0) + ' ' + x1.toFixed(2) + ' ' + y1.toFixed(2);
  }

  function ritaGradskiva(g) {
    var p = st.prot;
    var G = el('g', { transform: 'translate(' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + ') rotate(' + p.rot.toFixed(2) + ')', class: 'gradskiva' }, g);
    var kropp = 'M ' + (-R - 8) + ' 16 L ' + (R + 8) + ' 16 L ' + (R + 8) + ' 0 A ' + (R + 8) + ' ' + (R + 8) + ' 0 0 0 ' + (-R - 8) + ' 0 Z';
    el('path', { d: kropp, fill: 'rgba(205, 226, 242, 0.55)', stroke: '#3d6488', 'stroke-width': 1.4, 'data-prot': 'kropp', class: 'gs-kropp' }, G);
    // Inre urtag, som på en riktig gradskiva.
    el('path', { d: 'M ' + (-R + 62) + ' 0 A ' + (R - 62) + ' ' + (R - 62) + ' 0 0 1 ' + (R - 62) + ' 0', fill: 'none', stroke: 'rgba(61, 100, 136, 0.45)', 'stroke-width': 1 }, G);
    var streck = '';
    for (var t = 0; t <= 180; t++) {
      var len = t % 10 === 0 ? 15 : t % 5 === 0 ? 10 : 6;
      var c = Math.cos(rad(t)), s = -Math.sin(rad(t));
      streck += 'M ' + (R * c).toFixed(2) + ' ' + (R * s).toFixed(2) + ' L ' + ((R - len) * c).toFixed(2) + ' ' + ((R - len) * s).toFixed(2) + ' ';
      if (t % 10 === 0) {
        var r2 = R - 47, r3 = R - 54;
        streck += 'M ' + (r2 * c).toFixed(2) + ' ' + (r2 * s).toFixed(2) + ' L ' + (r3 * c).toFixed(2) + ' ' + (r3 * s).toFixed(2) + ' ';
      }
    }
    el('path', { d: streck, stroke: '#16314f', 'stroke-width': 0.9, fill: 'none', 'pointer-events': 'none' }, G);
    for (var t2 = 0; t2 <= 180; t2 += 10) {
      var c2 = Math.cos(rad(t2)), s2 = -Math.sin(rad(t2));
      var rot = 90 - t2;
      var yt = el('text', { x: ((R - 25) * c2).toFixed(2), y: ((R - 25) * s2).toFixed(2), transform: 'rotate(' + rot + ' ' + ((R - 25) * c2).toFixed(2) + ' ' + ((R - 25) * s2).toFixed(2) + ')', class: 'gs-tal', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, G);
      yt.textContent = t2;
      var it = el('text', { x: ((R - 41) * c2).toFixed(2), y: ((R - 41) * s2).toFixed(2), transform: 'rotate(' + rot + ' ' + ((R - 41) * c2).toFixed(2) + ' ' + ((R - 41) * s2).toFixed(2) + ')', class: 'gs-tal2', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, G);
      it.textContent = 180 - t2;
    }
    // Nollinjen och medelpunkten.
    el('line', { x1: -R, y1: 0, x2: R, y2: 0, stroke: '#16314f', 'stroke-width': 1.1, 'pointer-events': 'none' }, G);
    el('line', { x1: 0, y1: -9, x2: 0, y2: 9, stroke: '#16314f', 'stroke-width': 1.1, 'pointer-events': 'none' }, G);
    el('circle', { cx: 0, cy: 0, r: 3.2, fill: 'none', stroke: '#c8324a', 'stroke-width': 1.4, 'pointer-events': 'none' }, G);
    // Vridhandtaget.
    var H = el('g', { transform: 'translate(' + (R + 34) + ' 8)', class: 'gs-vrid', 'data-prot': 'vrid' }, G);
    el('circle', { r: 17, fill: '#fffdf9', stroke: '#3d6488', 'stroke-width': 1.4, 'data-prot': 'vrid' }, H);
    el('path', { d: 'M -7 -3 A 8 8 0 1 1 -4 6', fill: 'none', stroke: '#16314f', 'stroke-width': 2, 'stroke-linecap': 'round', 'pointer-events': 'none' }, H);
    el('path', { d: 'M -10.5 -5 L -6.6 -3.3 L -4.6 -7.2', fill: 'none', stroke: '#16314f', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'pointer-events': 'none' }, H);
  }

  function rita() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    ritaBrada(el('g', {}, svg));
    var P = hornPunkter(), n = P.length;
    var enkel = arEnkel(P) && Math.abs(area(P)) > 1;
    var V = enkel ? vinklar(P) : null;
    var tot = (n - 2) * 180;
    var hel = V ? heltal(V.map(function (v) { return v.inre; }), tot) : null;

    var fig = el('g', {}, svg);
    var pts = P.map(function (p) { return p.x + ',' + p.y; }).join(' ');
    el('polygon', { points: pts, fill: enkel ? 'rgba(200, 50, 74, 0.07)' : 'none', stroke: 'rgba(60, 10, 20, 0.28)', 'stroke-width': 6.5, 'stroke-linejoin': 'round', transform: 'translate(1.2 1.8)' }, fig);
    el('polygon', { points: pts, fill: 'none', stroke: '#c8324a', 'stroke-width': 5, 'stroke-linejoin': 'round' }, fig);

    if (V && st.trianglar) {
      // Diagonalerna dras från ett hörn som "ser" alla andra (ett inåtbuktande hörn om det finns).
      var fran = 0;
      V.forEach(function (v, i) { if (v.inre > 180) fran = i; });
      for (var k = 2; k < n - 1; k++) {
        var q = P[(fran + k) % n];
        el('line', { x1: P[fran].x, y1: P[fran].y, x2: q.x, y2: q.y, stroke: '#1f2530', 'stroke-width': 2, 'stroke-dasharray': '9 7' }, fig);
      }
    }
    if (V && (st.bagar || st.facit)) {
      V.forEach(function (v, i) {
        var p = P[i];
        if (Math.abs(v.inre - 90) < 0.01) {
          var u = { x: Math.cos(rad(v.aU)), y: Math.sin(rad(v.aU)) }, w = { x: Math.cos(rad(v.aW)), y: Math.sin(rad(v.aW)) }, d = 18;
          el('path', { d: 'M ' + (p.x + d * u.x) + ' ' + (p.y + d * u.y) + ' L ' + (p.x + d * (u.x + w.x)) + ' ' + (p.y + d * (u.y + w.y)) + ' L ' + (p.x + d * w.x) + ' ' + (p.y + d * w.y), fill: 'none', stroke: FARG[i], 'stroke-width': 2.4 }, fig);
        } else {
          el('path', { d: bage(p.x, p.y, 30, v.aU, v.inre, v.riktning), fill: 'none', stroke: FARG[i], 'stroke-width': 2.6 }, fig);
        }
        if (st.facit) {
          var lr = v.inre < 50 ? 64 : 54;
          var t = el('text', { x: (p.x + lr * Math.cos(rad(v.bis))).toFixed(1), y: (p.y + lr * Math.sin(rad(v.bis))).toFixed(1), fill: FARG[i], class: 'vinkeltal', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, fig);
          t.textContent = hel[i] + '°';
        }
      });
    }
    // Hörnens namn, utanför figuren längs bisektrisen.
    P.forEach(function (p, i) {
      var b = V ? V[i].bis + 180 : -90;
      var t = el('text', { x: (p.x + 25 * Math.cos(rad(b))).toFixed(1), y: (p.y + 25 * Math.sin(rad(b))).toFixed(1), class: 'hornnamn', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, fig);
      t.textContent = NAMN[i];
    });

    if (st.prot.syns) ritaGradskiva(svg);

    // Greppytor för hörnen ligger överst.
    P.forEach(function (p, i) {
      el('circle', { cx: p.x, cy: p.y, r: 7.5, fill: '#fffdf9', stroke: '#c8324a', 'stroke-width': 2.4, 'pointer-events': 'none', class: 'horn-prick' }, svg);
      el('circle', { cx: p.x, cy: p.y, r: 20, fill: 'transparent', 'data-v': i, class: 'horn-grepp' }, svg);
    });

    uppdateraPanel(V, hel, enkel, tot);
  }

  /* ---------- Panelen ---------- */
  function byggProtokoll() {
    var tb = $('protokoll');
    tb.innerHTML = '';
    st.pts.forEach(function (_, i) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<th scope="row"><span class="prick" style="background:' + FARG[i] + '"></span>Vinkel ' + NAMN[i] + '</th>' +
        '<td><label class="matt"><input type="text" inputmode="decimal" autocomplete="off" aria-label="Uppmätt vinkel ' + NAMN[i] + ' i grader" data-i="' + i + '"><span>°</span></label></td>' +
        '<td class="facit-cell" data-f="' + i + '"></td>';
      tb.appendChild(tr);
    });
    tb.querySelectorAll('input').forEach(function (inp) {
      inp.value = st.matt[+inp.dataset.i] || '';
      inp.addEventListener('input', function () { st.matt[+inp.dataset.i] = inp.value; summera(); });
    });
    var hb = $('hornknappar');
    hb.innerHTML = '';
    st.pts.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = NAMN[i];
      b.setAttribute('aria-label', 'Lägg gradskivan mot hörn ' + NAMN[i]);
      b.addEventListener('click', function () { laggAn(i); });
      hb.appendChild(b);
    });
    document.querySelectorAll('[data-n]').forEach(function (b) {
      b.setAttribute('aria-pressed', +b.dataset.n === st.pts.length ? 'true' : 'false');
    });
    var nm = { 3: 'triangel', 4: 'fyrhörning', 5: 'femhörning', 6: 'sexhörning' }[st.pts.length];
    $('figurnamn').textContent = nm;
  }

  function summera() {
    var vals = st.matt.map(tolka);
    var ifyllda = vals.filter(function (v) { return v !== null; });
    var sum = ifyllda.reduce(function (s, v) { return s + v; }, 0);
    $('summa').textContent = ifyllda.length ? fmt(sum, sum % 1 ? 1 : 0) + '°' : '–';
    $('summaInfo').textContent = ifyllda.length === 0 ? 'Skriv in vinklarna du mäter.' :
      ifyllda.length < vals.length ? (vals.length - ifyllda.length) + ' vinkl' + (vals.length - ifyllda.length === 1 ? 'el' : 'ar') + ' kvar att mäta.' : 'Alla vinklar är uppmätta.';
  }

  function uppdateraPanel(V, hel, enkel, tot) {
    $('varning').hidden = enkel;
    document.querySelectorAll('.facit-cell').forEach(function (td) {
      var i = +td.dataset.f;
      td.textContent = st.facit && V ? hel[i] + '°' : '';
    });
    $('facitKol').hidden = !st.facit;
    document.querySelectorAll('.facit-cell').forEach(function (td) { td.hidden = !st.facit; });
    $('facitSumma').hidden = !(st.facit && V);
    $('facitSummaVarde').textContent = tot + '°';
    $('triangelInfo').hidden = !(st.trianglar && V);
    var n = st.pts.length;
    $('triangelInfo').innerHTML = 'Diagonalerna delar figuren i ' + (n - 2) + ' trianglar. Vinkelsumman i varje triangel är 180°.';
    if (n === 3) $('triangelInfo').textContent = 'Figuren är redan en triangel. Vinkelsumman i en triangel är 180°.';
    ritaHorn(V);
    summera();
  }

  // Hörnen "rivs av" och läggs intill varandra runt en punkt.
  function ritaHorn(V) {
    var box = $('hornRuta');
    box.hidden = !(st.horn && V);
    if (box.hidden) return;
    var s = $('hornSvg');
    while (s.firstChild) s.removeChild(s.firstChild);
    var r = 66, a = 0;
    V.forEach(function (v, i) {
      var a1 = a - v.inre;
      var x0 = r * Math.cos(rad(a)), y0 = r * Math.sin(rad(a)), x1 = r * Math.cos(rad(a1)), y1 = r * Math.sin(rad(a1));
      var d = Math.abs(v.inre - 360) < 1e-6 ? 'M ' + r + ' 0 A ' + r + ' ' + r + ' 0 1 0 ' + (-r) + ' 0 A ' + r + ' ' + r + ' 0 1 0 ' + r + ' 0 Z'
        : 'M 0 0 L ' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A ' + r + ' ' + r + ' 0 ' + (v.inre > 180 ? 1 : 0) + ' 0 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' Z';
      el('path', { d: d, fill: FARG[i], 'fill-opacity': 0.22, stroke: FARG[i], 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, s);
      var m = a - v.inre / 2, lr = v.inre < 40 ? 50 : 40;
      var t = el('text', { x: (lr * Math.cos(rad(m))).toFixed(1), y: (lr * Math.sin(rad(m))).toFixed(1), fill: FARG[i], class: 'hornnamn liten', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, s);
      t.textContent = NAMN[i];
      a = a1;
    });
    el('circle', { cx: 0, cy: 0, r: 2.6, fill: '#1f2530' }, s);
    var varv = -a / 360;
    $('hornText').textContent = Math.abs(varv - 0.5) < 1e-6 ? 'Hörnen fyller precis ett halvt varv, en rak vinkel.'
      : Math.abs(varv - 1) < 1e-6 ? 'Hörnen fyller precis ett helt varv runt punkten.'
      : 'Hörnen räcker till ' + fmt(varv, 1) + ' varv runt punkten.';
  }

  /* ---------- Gradskivan mot ett hörn ---------- */
  function laggAn(i) {
    var P = hornPunkter(), n = P.length, v = P[i], q = P[(i + 1) % n];
    var V = arEnkel(P) ? vinklar(P) : null;
    var rot = deg(Math.atan2(q.y - v.y, q.x - v.x));
    if (V) {
      // Bågen (lokalt −y) ska hamna på figurens insida.
      var arc = rot - 90, b = V[i].bis;
      if (Math.cos(rad(arc - b)) < 0) rot += 180;
    }
    st.prot.x = v.x; st.prot.y = v.y; st.prot.rot = norm(rot); st.prot.syns = true;
    $('visaGs').checked = true;
    rita();
  }

  /* ---------- Dra och vrid ---------- */
  var drag = null;
  function lokal(e) {
    var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    var m = svg.getScreenCTM();
    return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }
  svg.addEventListener('pointerdown', function (e) {
    var t = e.target, p = lokal(e);
    if (t.dataset && t.dataset.v !== undefined) {
      drag = { typ: 'horn', i: +t.dataset.v };
    } else if (t.dataset && t.dataset.prot === 'vrid') {
      drag = { typ: 'vrid', start: deg(Math.atan2(p.y - st.prot.y, p.x - st.prot.x)) - st.prot.rot };
    } else if (t.dataset && t.dataset.prot === 'kropp') {
      drag = { typ: 'flytta', dx: p.x - st.prot.x, dy: p.y - st.prot.y };
    } else return;
    e.preventDefault();
    svg.setPointerCapture(e.pointerId);
    svg.classList.add('drar');
  });
  svg.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var p = lokal(e);
    if (drag.typ === 'horn') {
      var i = Math.round((p.x - M) / S), j = Math.round((p.y - M) / S);
      i = Math.max(0, Math.min(N - 1, i)); j = Math.max(0, Math.min(N - 1, j));
      var cur = st.pts[drag.i];
      if (cur[0] === i && cur[1] === j) return;
      if (st.pts.some(function (q) { return q[0] === i && q[1] === j; })) return;
      st.pts[drag.i] = [i, j];
      rita();
    } else if (drag.typ === 'flytta') {
      var x = p.x - drag.dx, y = p.y - drag.dy;
      x = Math.max(-80, Math.min(VB + 80, x)); y = Math.max(20, Math.min(VB + 40, y));
      // Medelpunkten fastnar i ett hörn som är nära.
      hornPunkter().forEach(function (h) { if (Math.hypot(h.x - x, h.y - y) < 16) { x = h.x; y = h.y; } });
      st.prot.x = x; st.prot.y = y;
      rita();
    } else {
      var rot = deg(Math.atan2(p.y - st.prot.y, p.x - st.prot.x)) - drag.start;
      // Nollinjen lägger sig längs en sida när medelpunkten sitter i ett hörn.
      var P = hornPunkter(), n = P.length;
      P.forEach(function (h, k) {
        if (Math.hypot(h.x - st.prot.x, h.y - st.prot.y) > 0.5) return;
        [P[(k + n - 1) % n], P[(k + 1) % n]].forEach(function (q) {
          var d = deg(Math.atan2(q.y - h.y, q.x - h.x));
          if (diff(rot, d) < 3) rot = d;
          else if (diff(rot, d + 180) < 3) rot = d + 180;
        });
      });
      st.prot.rot = norm(rot);
      rita();
    }
  });
  function slutaDra() { drag = null; svg.classList.remove('drar'); }
  svg.addEventListener('pointerup', slutaDra);
  svg.addEventListener('pointercancel', slutaDra);

  /* ---------- Knappar ---------- */
  document.querySelectorAll('[data-n]').forEach(function (b) {
    b.addEventListener('click', function () { sattFigur(slumpaFigur(+b.dataset.n)); });
  });
  $('nyFigur').addEventListener('click', function () { sattFigur(slumpaFigur(st.pts.length)); });
  $('rensa').addEventListener('click', function () {
    st.matt = st.matt.map(function () { return ''; });
    byggProtokoll(); rita();
  });
  $('visaGs').addEventListener('change', function (e) { st.prot.syns = e.target.checked; rita(); });
  $('vridV').addEventListener('click', function () { st.prot.rot = norm(st.prot.rot - 1); st.prot.syns = true; $('visaGs').checked = true; rita(); });
  $('vridH').addEventListener('click', function () { st.prot.rot = norm(st.prot.rot + 1); st.prot.syns = true; $('visaGs').checked = true; rita(); });
  $('lagUndan').addEventListener('click', function () { st.prot.x = 300; st.prot.y = 626; st.prot.rot = 0; rita(); });
  [['visaBagar', 'bagar'], ['visaFacit', 'facit'], ['visaTrianglar', 'trianglar'], ['visaHorn', 'horn']].forEach(function (par) {
    $(par[0]).addEventListener('change', function (e) { st[par[1]] = e.target.checked; rita(); });
  });

  /* ---------- Start ---------- */
  var n0 = parseInt(new URLSearchParams(location.search).get('n'), 10);
  if (!(n0 >= 3 && n0 <= 6)) n0 = 4;
  sattFigur(STARTFIGUR[n0].map(function (p) { return p.slice(); }));
})();

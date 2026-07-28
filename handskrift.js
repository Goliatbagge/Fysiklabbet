/* handskrift.js — animerad handskriven räknelösning ("hand med penna").
 *
 * Visar HUR en lösning skrivs för hand: en hand med blyertspenna skriver
 * tecken för tecken, streck för streck, på ett rutat papper. Tänkt att
 * bäddas in i teorigenomgångarna (senare via ett ::: handskrift-block,
 * samma mönster som graf.js).
 *
 * API:
 *   window.HANDSKRIFT.mount(el, spec, opts) -> controller
 *
 *   spec = array av rader (= STEG; ett klick skriver en rad). En rad är:
 *     - en sträng: "5x+3=23"  (skrivs tecken för tecken)
 *     - en array av segment:
 *         "5x+3"                 vanlig text (grafit)
 *         {t:"-3", c:1}          färgad text (c:1 = blåpenna — används för
 *                                "det man gör på båda sidor")
 *         {frac:["5x","5"]}      bråk med rakt divisionsstreck
 *                                (skrivordning: täljare → streck → nämnare);
 *                                fc:1 gör streck + nämnare blå.
 *         {cont:1}               FÖRSTA segmentet i en rad: raden fortsätter
 *                                på FÖREGÅENDE rads baslinje (kollegieblock-
 *                                stil, "… = … = …") i stället för på ny rad —
 *                                men är fortfarande ett eget klicksteg.
 *
 *   opts = { fontSize: 40, speed: 1, autostart: false, instant: false,
 *            at: ms|null, stegvis: true }  — stegvis=false ger gamla
 *            beteendet (allt skrivs i en följd).
 *
 *   controller = { play, pause, restart, setSpeed, jumpToEnd, spela }
 *
 * Teckenuppsättningen är en egen enstreckad "handstil": varje tecken är
 * definierat som en lista pennstreck (punkter i en 100-enheters box,
 * baslinje y=100). Strecken ritas i naturlig skrivordning och får små
 * slumpvariationer (jitter, rotation, baslinjehopp) så att två femmor
 * aldrig blir exakt likadana — som riktig handskrift.
 */
(function () {
  'use strict';
  if (window.HANDSKRIFT) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var INK = '#4a4a4a';          // grafit
  var BLUE = '#2b5ca8';         // blåpenna — "det man gör på båda sidor"
  var PAPER = '#faf6ec';
  var GRID = '#93aec7';
  var LABINK = '#0f1620';

  /* ---------------- handstil: enstreckade glyfer ----------------
   * Punkter i 100-boxen: y=10 överkant (versal/siffra), y=100 baslinje,
   * gemener börjar vid ~y=48 (x-höjd). w = teckenbredd (advance).
   * Strecken listas i naturlig skrivordning. */
  var GLYPHS = {
    '0': { w: 84, strokes: [[[50, 12], [31, 22], [24, 54], [31, 87], [50, 97], [67, 87], [74, 54], [67, 22], [50, 12]]] },
    '1': { w: 58, strokes: [[[30, 30], [48, 13], [48, 100]]] },
    '2': { w: 84, strokes: [[[27, 32], [33, 15], [51, 10], [66, 17], [69, 33], [60, 54], [42, 76], [27, 95], [40, 92], [70, 93]]] },
    '3': { w: 84, strokes: [[[28, 20], [46, 10], [63, 16], [67, 30], [57, 46], [45, 51], [60, 55], [71, 70], [65, 89], [45, 99], [27, 90]]] },
    '4': { w: 84, strokes: [[[54, 12], [30, 58], [27, 66], [74, 66]], [[60, 16], [60, 100]]] },
    '5': { w: 84, strokes: [[[36, 12], [30, 48], [44, 41], [59, 43], [70, 55], [71, 72], [61, 90], [41, 98], [26, 88]], [[36, 12], [68, 12]]] },
    '6': { w: 84, strokes: [[[62, 14], [43, 26], [30, 48], [25, 72], [31, 90], [50, 98], [65, 89], [68, 72], [57, 59], [39, 60], [28, 71]]] },
    '7': { w: 80, strokes: [[[26, 14], [70, 13], [49, 58], [39, 100]]] },
    '8': { w: 84, strokes: [[[50, 12], [32, 19], [28, 35], [43, 49], [63, 61], [69, 79], [57, 95], [38, 95], [27, 79], [35, 61], [54, 49], [67, 35], [64, 19], [50, 12]]] },
    '9': { w: 84, strokes: [[[68, 26], [53, 12], [34, 17], [26, 35], [33, 51], [52, 56], [66, 47], [69, 28]], [[69, 26], [64, 68], [55, 100]]] },
    'x': { w: 80, strokes: [[[24, 50], [37, 60], [64, 93], [70, 100]], [[66, 50], [53, 65], [30, 95], [24, 100]]] },
    '+': { w: 88, strokes: [[[22, 66], [74, 66]], [[48, 41], [48, 92]]] },
    '-': { w: 76, strokes: [[[22, 66], [70, 66]]] },
    '=': { w: 88, strokes: [[[22, 56], [74, 55]], [[22, 76], [74, 76]]] },
    'S': { w: 66, strokes: [[[68, 20], [52, 10], [33, 15], [27, 31], [38, 46], [57, 57], [67, 72], [59, 90], [36, 98], [22, 86]]] },
    'v': { w: 56, strokes: [[[24, 52], [38, 94], [44, 100], [57, 74], [66, 52]]] },
    'a': { w: 62, strokes: [[[61, 57], [47, 48], [31, 55], [25, 73], [30, 90], [46, 98], [60, 89]], [[62, 50], [62, 84], [66, 97], [72, 94]]] },
    'r': { w: 46, strokes: [[[27, 50], [29, 100]], [[29, 64], [38, 53], [50, 47], [57, 52]]] },
    ':': { w: 34, strokes: [[[26, 58], [27, 60]], [[26, 88], [27, 90]]] },
    ' ': { w: 46, strokes: [] },
    'd': { w: 68, strokes: [[[58, 58], [45, 49], [31, 56], [26, 73], [31, 89], [46, 97], [58, 87]], [[61, 12], [60, 80], [63, 95], [70, 93]]] },
    'y': { w: 62, strokes: [[[24, 52], [32, 72], [42, 96]], [[64, 52], [52, 88], [38, 118], [26, 130]]] },
    /* teckenminus (U+2212): tight, utan operator-luft — för −3 i tabeller/axlar */
    '−': { w: 40, strokes: [[[18, 66], [42, 66]]] },
    /* integraltecken: hög S-kurva, från -13 (över versalhöjd) till 113 */
    '∫': { w: 54, strokes: [[[64, -4], [58, -12], [50, -13], [45, -5], [44, 14], [43, 45], [42, 75], [40, 96], [37, 108], [29, 113], [21, 108], [19, 99]]] },
    /* klamrar för primitiv funktion: höga, med korta serifer */
    '[': { w: 50, strokes: [[[48, 2], [33, 3], [34, 104], [49, 105]]] },
    ']': { w: 50, strokes: [[[30, 2], [45, 3], [44, 104], [29, 105]]] },
    'A': { w: 80, strokes: [[[22, 100], [46, 12], [70, 100]], [[32, 68], [61, 68]]] },
    'M': { w: 88, strokes: [[[22, 100], [25, 14], [47, 72], [69, 14], [72, 100]]] },
    'u': { w: 66, strokes: [[[24, 52], [25, 82], [32, 96], [46, 92], [56, 80]], [[58, 52], [60, 100]]] },
    'b': { w: 64, strokes: [[[26, 12], [27, 100]], [[27, 60], [40, 50], [54, 56], [58, 74], [52, 92], [38, 98], [27, 90]]] },
    'm': { w: 72, strokes: [[[23, 52], [24, 100]], [[24, 66], [32, 52], [41, 56], [42, 100]], [[42, 66], [50, 52], [59, 56], [60, 100]]] },
    'F': { w: 68, strokes: [[[32, 12], [28, 100]], [[32, 12], [70, 11]], [[30, 54], [62, 54]]] },
    'P': { w: 66, strokes: [[[32, 12], [28, 100]], [[32, 12], [58, 11], [68, 22], [67, 37], [55, 48], [30, 50]]] },
    'B': { w: 68, strokes: [[[32, 12], [28, 100]], [[32, 12], [56, 11], [65, 21], [63, 34], [52, 44], [30, 46]], [[30, 46], [58, 47], [68, 60], [67, 80], [54, 96], [28, 100]]] },
    'l': { w: 42, strokes: [[[30, 10], [29, 80], [33, 97], [41, 94]]] },
    'g': { w: 64, strokes: [[[58, 57], [45, 49], [31, 56], [26, 73], [31, 89], [46, 97], [58, 88]], [[60, 50], [62, 86], [60, 112], [50, 126], [36, 124], [30, 114]]] },
    'k': { w: 60, strokes: [[[28, 10], [28, 100]], [[58, 48], [40, 70], [30, 74]], [[38, 66], [60, 100]]] },
    ',': { w: 30, strokes: [[[26, 90], [28, 98], [21, 112]]] },
    '?': { w: 68, strokes: [[[26, 30], [33, 14], [50, 10], [63, 17], [66, 31], [58, 45], [47, 53], [45, 64]], [[45, 86], [46, 88]]] },
    '(': { w: 42, strokes: [[[36, 8], [26, 34], [23, 60], [26, 85], [36, 106]]] },
    ')': { w: 42, strokes: [[[22, 8], [32, 34], [35, 60], [32, 85], [22, 106]]] },
    '·': { w: 34, strokes: [[[27, 60], [28, 62]]] },
    "'": { w: 24, strokes: [[[27, 8], [19, 30]]] },
    '<': { w: 76, strokes: [[[64, 40], [24, 66], [64, 92]]] },
    /* implikationspil ⇒: två parallella streck + spets */
    '⇒': { w: 96, strokes: [[[20, 56], [64, 57]], [[20, 74], [64, 73]], [[60, 44], [80, 65], [60, 88]]] }
  };
  var OPS = { '+': 1, '-': 1, '=': 1, '<': 1, '⇒': 1 };

  /* Senast skrivna klammergränser (position för övre/undre gräns) — så
   * att insättningssteget kan ringa in dem med en pedagogisk gest. */
  var LASTLIM = { sup: null, sub: null };

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function el(name, attrs, parent) {
    var e = document.createElementNS(SVGNS, name);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* Catmull–Rom → kubisk bezier, ger mjuka naturliga kurvor. */
  function pathFrom(pts) {
    var d = 'M' + pts[0][0].toFixed(2) + ' ' + pts[0][1].toFixed(2);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1],
          p3 = pts[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ',' +
           c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ',' +
           p2[0].toFixed(2) + ' ' + p2[1].toFixed(2);
    }
    return d;
  }

  /* Ett tvåpunktsstreck (rak linje) får en mittpunkt med liten vinkelrät
   * avvikelse — handskrivna "raka" streck är aldrig helt raka. */
  function humanize(pts) {
    if (pts.length !== 2) return pts;
    var a = pts[0], b = pts[1];
    var dx = b[0] - a[0], dy = b[1] - a[1];
    var L = Math.hypot(dx, dy) || 1;
    var nx = -dy / L, ny = dx / L;
    var bow = rnd(-1, 1) * Math.min(0.022 * L, 2.2) + rnd(-0.6, 0.6);
    return [a, [(a[0] + b[0]) / 2 + nx * bow, (a[1] + b[1]) / 2 + ny * bow], b];
  }

  /* Placera ett tecken: skala, lätt lutning, jitter, rotation.
   * Returnerar nästa x. Strecken läggs i out-listan. */
  function placeGlyph(ch, x, baseline, s, out, color) {
    var g = GLYPHS[ch];
    if (!g) return x + 40 * s;
    var rot = rnd(-0.022, 0.022);
    var dyPx = rnd(-1.4, 1.4) * s;
    var cx = x + g.w * s / 2, cy = baseline - 45 * s;
    var cosR = Math.cos(rot), sinR = Math.sin(rot);
    g.strokes.forEach(function (stroke) {
      var pts = stroke.map(function (p) {
        var u = p[0] + rnd(-1.1, 1.1);
        var v = p[1] + rnd(-1.1, 1.1);
        u += (100 - v) * 0.055;               /* svag högerlutning */
        var X = x + u * s, Y = baseline + (v - 100) * s + dyPx;
        var rx = cx + (X - cx) * cosR - (Y - cy) * sinR;
        var ry = cy + (X - cx) * sinR + (Y - cy) * cosR;
        return [rx, ry];
      });
      out.push({ kind: 'stroke', pts: humanize(pts), color: color });
    });
    out.push({ kind: 'pause', ms: 60 });
    return x + g.w * s + 1.5;
  }

  function textWidth(str, s) {
    var w = 0;
    for (var i = 0; i < str.length; i++) {
      var g = GLYPHS[str[i]];
      w += (g ? g.w : 40) * s + 1.5;
      if (OPS[str[i]]) w += 2 * 0.3 * s * 100 * 0.4; /* op-luft (approx) */
    }
    return w;
  }

  /* Skriv en teckensträng, med luft kring binära operatorer.
   * ^c = upphöjt (exponent/övre gräns), _c = nedsänkt (undre gräns).
   * Efter ∫ och ] placeras gränserna högt/lågt (integralgränser resp.
   * klammergränser) och staplas i samma x-kolumn. */
  function placeString(str, x, baseline, s, F, out, color) {
    var prevBase = null, prevBaseX = x, scriptAnchor = null;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '^' || ch === '_') {
        var sc = str[++i];
        if (sc == null) break;
        var sub = ch === '_';
        var sb;
        if (prevBase === '∫') sb = baseline + (sub ? 0.22 : -0.95) * F;
        else if (prevBase === ']') sb = baseline + (sub ? 0.30 : -0.78) * F;
        else sb = baseline + (sub ? 0.15 : -0.5) * F;
        if (prevBase === '∫' && sub) {
          /* undre integralgräns: till VÄNSTER om krokens nederdel */
          var aw = (GLYPHS[sc] ? GLYPHS[sc].w : 40) * s * 0.62;
          placeGlyph(sc, prevBaseX - aw * 0.85, sb, s * 0.62, out, color);
          continue;
        }
        if (scriptAnchor == null) scriptAnchor = x;
        /* övre integralgräns: in över krokens topp, inte helt till höger —
         * minskar också luften fram till integranden */
        var ax = (prevBase === '∫') ? scriptAnchor - 0.13 * F : scriptAnchor;
        var nx = placeGlyph(sc, ax, sb, s * 0.62, out, color);
        if (prevBase === ']') {
          LASTLIM[sub ? 'sub' : 'sup'] =
            [(scriptAnchor + nx) / 2, sb - 0.28 * F];
        }
        x = Math.max(x, nx);
        continue;
      }
      scriptAnchor = null;
      if (OPS[ch]) { x += 0.26 * F; }
      prevBaseX = x;
      x = placeGlyph(ch, x, baseline, s, out, color);
      if (OPS[ch]) { x += 0.26 * F; out.push({ kind: 'pause', ms: 110 }); }
      if (ch !== ' ') prevBase = ch;
    }
    return x;
  }

  function stringAdvance(str, s, F) {
    var x = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '^' || ch === '_') {
        var sc = str[++i];
        var sg = GLYPHS[sc];
        x += (sg ? sg.w : 40) * s * 0.62 + 1.5;
        continue;
      }
      var g = GLYPHS[ch];
      x += (g ? g.w : 40) * s + 1.5;
      if (OPS[ch]) x += 0.52 * F;
    }
    return x;
  }

  /* ---------------- layout av hela lösningen ---------------- */
  function layout(spec, F) {
    var s = F / 100;
    var padL = 30, padT = 26;
    var acts = [];          /* stroke/pause i skrivordning */
    var y = padT + 0.95 * F;
    var maxW = 0;
    var lastBase = y;

    var pendingRing = null;
    var prevEndX = padL, prevBaseY = null;
    spec.forEach(function (line, li) {
      var segs = typeof line === 'string' ? [line] : line;
      var cont = Array.isArray(segs) && segs.length &&
        segs[0] && typeof segs[0] === 'object' && segs[0].cont;
      if (cont) segs = segs.slice(1);
      var hasFrac = segs.some(function (sg) { return sg && sg.frac; });
      var textAll = segs.map(function (sg) {
        return typeof sg === 'string' ? sg : (sg && sg.t) || '';
      }).join('');
      var hasTall = /[∫\[]/.test(textAll);   /* integraltecken/klamrar */
      var x;
      if (cont && prevBaseY != null) {
        /* fortsättningsrad: samma baslinje, liten lucka efter förra uttrycket */
        y = prevBaseY;
        x = prevEndX + 0.38 * F;
      } else {
        if (hasFrac) y += 0.55 * F;
        else if (hasTall) y += 0.45 * F;
        x = padL;
      }

      segs.forEach(function (sg) {
        if (typeof sg === 'string') {
          x = placeString(sg, x, y, s, F, acts);
        } else if (sg && sg.frac) {
          var num = sg.frac[0], den = sg.frac[1];
          var fCol = sg.fc ? BLUE : null;    /* fc: streck + nämnare i blått */
          var nw = stringAdvance(num, s, F), dw = stringAdvance(den, s, F);
          var w = Math.max(nw, dw) + 0.3 * F;
          var ybar = y - 0.34 * F;
          placeString(num, x + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
          acts.push({ kind: 'pause', ms: 130 });
          acts.push({ kind: 'stroke', pts: humanize([[x, ybar], [x + w, ybar]]),
                      color: fCol });
          acts.push({ kind: 'pause', ms: 130 });
          placeString(den, x + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, fCol);
          x += w + 1.5;
        } else if (sg && sg.brack) {
          /* hög klammer som rymmer ett bråk: {brack:'['} resp.
           * {brack:']', sub:'1', sup:'3'} — används när primitiva
           * funktionen skrivs med regeln (t.ex. [2x²/2]₁³) */
          var T = y - 1.42 * F, B = y + 0.72 * F;
          var bw = 0.34 * F;
          var jit = function (p) { return [p[0] + rnd(-1, 1), p[1] + rnd(-1, 1)]; };
          if (sg.brack === '[') {
            acts.push({ kind: 'stroke', pts: [jit([x + bw, T]), jit([x + 2, T + 2]),
              jit([x + 3, B - 2]), jit([x + bw + 1, B])] });
            x += bw + 0.16 * F;
          } else {
            acts.push({ kind: 'stroke', pts: [jit([x, T]), jit([x + bw - 2, T + 2]),
              jit([x + bw - 3, B - 2]), jit([x + 1, B])] });
            x += bw + 0.10 * F;
            acts.push({ kind: 'pause', ms: 80 });
            var bx = x, nx1 = x, nx2 = x;
            if (sg.sup != null) {
              nx1 = placeGlyph(sg.sup, bx, T + 0.45 * F, s * 0.62, acts);
              LASTLIM.sup = [(bx + nx1) / 2, T + 0.17 * F];
            }
            if (sg.sub != null) {
              nx2 = placeGlyph(sg.sub, bx, B + 0.30 * F, s * 0.62, acts);
              LASTLIM.sub = [(bx + nx2) / 2, B + 0.02 * F];
            }
            x = Math.max(nx1, nx2);
          }
        } else if (sg && sg.ring) {
          /* pedagogisk cirkelrörelse: ringa in senaste klammergränsen
           * ({ring:'sup'} = övre, {ring:'sub'} = undre) med blåpennan;
           * ringen bleknar när nästa ring ritas eller raden är klar */
          var lim = LASTLIM[sg.ring];
          if (lim) {
            if (pendingRing) acts.push({ kind: 'fade', ref: pendingRing });
            pendingRing = { kind: 'stroke',
              pts: ringPts(lim[0], lim[1], 0.34 * F, 0.46 * F), color: BLUE };
            acts.push(pendingRing);
            acts.push({ kind: 'pause', ms: 260 });
          }
        } else if (sg && sg.t != null) {
          x = placeString(sg.t, x, y, s, F, acts, sg.c ? BLUE : null);
        }
      });
      if (pendingRing) {
        acts.push({ kind: 'fade', ref: pendingRing });
        pendingRing = null;
      }

      /* svarsrader ("Svar: …") stryks under när de är färdigskrivna */
      var firstText = typeof line === 'string' ? line
        : (typeof segs[0] === 'string' ? segs[0] : '');
      if (/^Svar/.test(firstText)) {
        acts.push({ kind: 'pause', ms: 220 });
        acts.push({ kind: 'stroke',
          pts: humanize([[padL - 2, y + 0.30 * F], [x - 0.10 * F, y + 0.30 * F]]) });
      }

      maxW = Math.max(maxW, x);
      var bottom = hasFrac ? y + 0.75 * F : (hasTall ? y + 0.35 * F : y);
      lastBase = cont ? Math.max(lastBase, bottom) : bottom;
      prevEndX = x;
      prevBaseY = y;
      acts.push({ kind: 'pause', ms: 240 });
      acts.push({ kind: 'lineEnd' });        /* steggräns: här pausas stegvis läge */
      acts.push({ kind: 'pause', ms: 320 });
      y = lastBase + 1.7 * F;
    });

    return { acts: acts, contentW: maxW, lastBase: lastBase, padL: padL };
  }

  /* ---------------- scen: "från ekvation till graf" ----------------
   * Kollegieblock-disposition: sambandet överst, värdetabellen till
   * vänster med EN HANDSKRIVEN UTRÄKNING bredvid varje rad (ingen
   * tankebubbla som hinner försvinna), koordinatsystemet UNDER tabellen.
   * Före varje insättning ringar blåpennan in radens x-värde i tabellen
   * och x:et i sambandet ("nu sätter jag in detta här"). Steg: 1) samband,
   * 2) tabellram, 3–9) en tabellrad per steg (ring + uträkning + y-värde),
   * 10) koordinatsystem + skala, 11) punkter, 12) linjal + rät linje.
   * cfg = { typ:'linjegraf', k, m, xs:[...] }                          */
  function layoutLinjegraf(cfg, F) {
    F = Math.min(F, 34);                     /* scenen kräver kompaktare skrift */
    var s = F / 100;
    var acts = [];
    var k = cfg.k, m = cfg.m;
    var xs = cfg.xs || [-3, -2, -1, 0, 1, 2, 3];
    var ys = xs.map(function (x) { return k * x + m; });

    function num(v) { return v < 0 ? '−' + (-v) : '' + v; }
    /* uträkningen bredvid tabellraden: "y=−2·(−3)+3=6+3=9" */
    function calcNote(x, yv) {
      var kx = x < 0 ? num(k) + '·(' + num(x) + ')' : num(k) + '·' + x;
      var mT = (m >= 0 ? '+' : '-') + Math.abs(m);
      return 'y=' + kx + mT + '=' + num(k * x) + mT + '=' + num(yv);
    }

    /* --- geometri: tabell + uträkningar överst, koordinatsystem under --- */
    var u = 27;                              /* 1 enhet = 1 ruta */
    var tx = 30, ty = 74, colW = 62, rowH = 34;
    var tw = 2 * colW, th = (xs.length + 1) * rowH;
    var noteX = tx + tw + 14;                /* uträkningarna börjar här */
    var ox = 243, oy = 648;                  /* origo på rutnätslinjer, under tabellen */
    var xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs);
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);

    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }

    function bubble(x, y, w, lines, tail) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, tail: tail, wins: [] };
    }
    var bIntro = bubble(246, 40, 208, [
      [['Jag gör en värdetabell']],
      [['och väljer några']],
      [['x', 1], ['-värden kring 0.']]
    ], [160, 80]);
    var bScale = bubble(26, ty + th + 16, 280, [
      [['x', 1], ['-axeln måste rymma ' + num(xmin) + ' till ' + num(xmax) + ',']],
      [['y', 1], ['-axeln ' + num(ymin) + ' till ' + num(ymax) + '.']]
    ], [ox - 2 * u, oy - 6 * u]);
    var bPoint = bubble(285, 400, 240, [
      [['Raden med ', 0], ['x', 1], [' = ' + num(xs[0]) + ' och ', 0], ['y', 1],
       [' = ' + num(ys[0])]],
      [['ger punkten (' + num(xs[0]) + ', ' + num(ys[0]) + ').']]
    ], [tx + tw - 20, ty + 2 * rowH]);
    var bLinjal = bubble(264, 420, 246, [
      [['Punkterna ligger på en rät linje —']],
      [['jag drar den med linjalen.']]
    ], [ox - u, oy - 5 * u]);

    /* ---- steg 1: sambandet skrivs upp ---- */
    var xx = placeString('y=' + num(k), tx, 46, s * 0.9, F * 0.9, acts);
    var exA = xx;
    xx = placeString('x', xx, 46, s * 0.9, F * 0.9, acts);
    var eqXc = (exA + xx) / 2;               /* mitten av x:et i sambandet */
    placeString((m >= 0 ? '+' : '-') + Math.abs(m), xx, 46, s * 0.9, F * 0.9, acts);
    stepEnd();

    /* ---- steg 2: tabellram + rubriker ---- */
    acts.push({ kind: 'show', obj: bIntro });
    pause(700);
    line([tx, ty], [tx + tw, ty]);                       /* tabellram */
    line([tx + tw, ty], [tx + tw, ty + th]);
    line([tx + tw, ty + th], [tx, ty + th]);
    line([tx, ty + th], [tx, ty]);
    line([tx + colW, ty], [tx + colW, ty + th]);         /* kolumnlinje */
    var ri;
    for (ri = 1; ri <= xs.length; ri++) {                /* radlinjer */
      line([tx, ty + rowH * ri], [tx + tw, ty + rowH * ri]);
    }
    pause(150);
    var whx = stringAdvance('x', s * 0.62, F * 0.62);
    var why = stringAdvance('y', s * 0.62, F * 0.62);
    placeString('x', tx + colW / 2 - whx / 2, ty + rowH - 10, s * 0.62, F * 0.62, acts);
    placeString('y', tx + colW + colW / 2 - why / 2, ty + rowH - 10, s * 0.62, F * 0.62, acts);
    acts.push({ kind: 'hide', obj: bIntro });
    stepEnd();

    /* ---- steg 3–9: EN tabellrad per steg ----
     * x-värdet skrivs, blåpennan ringar in det och x:et i sambandet
     * ("detta sätts in här"), uträkningen antecknas till höger om raden
     * och först då skrivs y-värdet in i kolumnen. */
    xs.forEach(function (x, i) {
      var base = ty + rowH * (i + 2) - 10;
      var rowCy = ty + rowH * (i + 1) + rowH / 2;
      var sx = num(x), sy = num(ys[i]);
      var wx = stringAdvance(sx, s * 0.62, F * 0.62);
      placeString(sx, tx + colW / 2 - wx / 2, base, s * 0.62, F * 0.62, acts);
      pause(180);
      var rA = { kind: 'stroke',
                 pts: ringPts(tx + colW / 2, rowCy, colW / 2 - 5, 13.5),
                 color: BLUE };
      acts.push(rA);
      pause(260);
      var rB = { kind: 'stroke', pts: ringPts(eqXc, 46 - 0.25 * F, 15, 12),
                 color: BLUE };
      acts.push(rB);
      pause(280);
      placeString(calcNote(x, ys[i]), noteX, base, s * 0.55, F * 0.55, acts);
      pause(180);
      var wy = stringAdvance(sy, s * 0.62, F * 0.62);
      placeString(sy, tx + colW + colW / 2 - wy / 2, base, s * 0.62, F * 0.62, acts);
      acts.push({ kind: 'fade', ref: rA });
      acts.push({ kind: 'fade', ref: rB });
      stepEnd();
    });

    /* ---- steg 10: koordinatsystem + skala ----
     * Bubblan visas och göms INNAN axlarna ritas — nere vid koordinat-
     * systemet finns ingen fri yta, och en bubbla får aldrig ligga
     * framför det som skrivs. */
    acts.push({ kind: 'show', obj: bScale });
    pause(1300);
    acts.push({ kind: 'hide', obj: bScale });
    pause(200);
    var xa0 = ox + (xmin - 0.6) * u, xa1 = ox + (xmax + 0.8) * u;
    var ya0 = oy - (ymax + 0.8) * u, ya1 = oy - (ymin - 0.6) * u;
    line([xa0, oy], [xa1, oy]);                          /* x-axel + pil */
    line([xa1 - 8, oy - 5], [xa1 + 1, oy]);
    line([xa1 - 8, oy + 5], [xa1 + 1, oy]);
    line([ox, ya1], [ox, ya0]);                          /* y-axel + pil */
    line([ox - 5, ya0 + 8], [ox, ya0 - 1]);
    line([ox + 5, ya0 + 8], [ox, ya0 - 1]);
    placeGlyph('x', xa1 + 4, oy + 22, s * 0.6, acts);    /* axeletiketter */
    placeGlyph('y', ox + 10, ya0 + 4, s * 0.6, acts);
    pause(200);
    /* skala: skalstreck + tal vid 1 och sedan vart femte steg.
     * Talen skrivs KONSEKVENT under x-axeln resp. vänster om y-axeln. */
    function tickVals(minV, maxV) {
      var vals = [];
      if (maxV >= 1) vals.push(1);
      var v;
      for (v = 5; v <= maxV; v += 5) vals.push(v);
      for (v = -5; v >= minV; v -= 5) vals.push(v);
      return vals;
    }
    var str, w;
    tickVals(xmin, xmax).forEach(function (v) {          /* skala på x */
      line([ox + v * u, oy - 4], [ox + v * u, oy + 4]);  /* skalstreck */
      str = num(v);
      w = stringAdvance(str, s * 0.45, F * 0.45);
      placeString(str, ox + v * u - w / 2, oy + 23, s * 0.45, F * 0.45, acts);
      acts.push({ kind: 'pause', ms: 90 });
    });
    pause(150);
    tickVals(ymin, ymax).forEach(function (v) {          /* skala på y */
      line([ox - 4, oy - v * u], [ox + 4, oy - v * u]);
      str = num(v);
      w = stringAdvance(str, s * 0.45, F * 0.45);
      placeString(str, ox - 8 - w, oy - v * u + 5, s * 0.45, F * 0.45, acts);
      acts.push({ kind: 'pause', ms: 90 });
    });
    stepEnd();

    /* ---- steg 11: pricka in punkterna ----
     * Vid varje punkt tonar STRECKADE HJÄLPLINJER in — lodrätt ned till
     * x-värdet på x-axeln och vågrätt till y-värdet på y-axeln — så att
     * eleven ser varför punkten hamnar just där. De tonar ut när nästa
     * punkt prickas in. */
    /* hjälpsiffrans pennstreck förrenderas (den tonar in med linjerna,
     * handen ritar den inte) */
    function guideLabel(str, gx, gy) {
      var tmp = [];
      placeString(str, gx, gy, s * 0.45, F * 0.45, tmp);
      return tmp.filter(function (a) { return a.kind === 'stroke'; })
                .map(function (a) { return a.pts; });
    }
    var scaleX = tickVals(xmin, xmax), scaleY = tickVals(ymin, ymax);
    var prevGuide = null;
    xs.forEach(function (x, i) {
      var rcy = ty + rowH * (i + 1) + rowH / 2;
      if (i === 0) { acts.push({ kind: 'show', obj: bPoint }); pause(750); }
      /* ringa in raden med blåpennan */
      var ring = { kind: 'stroke', pts: ringPts(tx + tw / 2, rcy, tw / 2 + 8, 14.5),
                   color: BLUE };
      acts.push(ring);
      pause(200);
      var px = ox + x * u, py = oy - ys[i] * u;
      if (prevGuide) acts.push({ kind: 'hide', obj: prevGuide });
      var guide = { guide: 1, px: px, py: py, ox: ox, oy: oy, wins: [],
                    labels: [] };
      /* hjälpsiffror vid axlarna — men inte för tal som redan står på
       * skalan (t.ex. 1 och 5) och inte för 0 */
      if (x !== 0 && scaleX.indexOf(x) < 0) {
        var wgx = stringAdvance(num(x), s * 0.45, F * 0.45);
        guide.labels = guide.labels.concat(
          guideLabel(num(x), px - wgx / 2, oy + 23));
      }
      if (ys[i] !== 0 && scaleY.indexOf(ys[i]) < 0) {
        var wgy = stringAdvance(num(ys[i]), s * 0.45, F * 0.45);
        guide.labels = guide.labels.concat(
          guideLabel(num(ys[i]), ox - 8 - wgy, py + 5));
      }
      acts.push({ kind: 'show', obj: guide });
      prevGuide = guide;
      pause(220);
      /* prick på punkten — liten tät spiral som fyller igen */
      acts.push({ kind: 'stroke', pts: dotPts(px, py) });
      acts.push({ kind: 'fade', ref: ring });
      if (i === 0) acts.push({ kind: 'hide', obj: bPoint });
      pause(200);
    });
    pause(400);
    if (prevGuide) acts.push({ kind: 'hide', obj: prevGuide });
    stepEnd();

    /* ---- steg 12: linjal + rät linje ---- */
    acts.push({ kind: 'show', obj: bLinjal });
    pause(750);
    var ex0 = xmin - 0.2, ex1 = xmax + 0.2;
    var lp1 = [ox + ex0 * u, oy - (k * ex0 + m) * u];
    var lp2 = [ox + ex1 * u, oy - (k * ex1 + m) * u];
    var ruler = { ruler: 1, x1: lp1[0], y1: lp1[1], x2: lp2[0], y2: lp2[1],
                  wins: [] };
    acts.push({ kind: 'jump', to: [ox + xmax * u + 50, oy + 60] });  /* hämtar linjalen */
    pause(250);
    acts.push({ kind: 'show', obj: ruler });
    pause(550);
    acts.push({ kind: 'stroke', pts: [lp1, lp2] });      /* exakt rak — mot linjalen */
    pause(350);
    acts.push({ kind: 'hide', obj: ruler });
    acts.push({ kind: 'hide', obj: bLinjal });
    pause(400);
    acts.push({ kind: 'lineEnd' });
    pause(200);

    return { acts: acts, contentW: 500, lastBase: ya1 + 6, padL: tx };
  }

  /* ---------------- scen: extremvärdesproblem "hästhagen" ----------------
   * Exempel 2 ur ma3c-4.6 (maximal area): geometrisk figur (mur + hage +
   * måttpilar) ritas först, sedan a) areafunktion och b) derivering,
   * nollställe, insättning, andraderivata och svar. VARJE skriven rad är
   * ett eget klicksteg (ett "skipklick" ska aldrig hoppa över mer än den
   * rad man är på); bara figuren ritas som ett sammanhållet steg. */
  function layoutHage(cfg, F) {
    F = Math.min(F, 32);
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines, tail) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, tail: tail, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: humanize([[padL - 2, y + 0.30 * F], [xEnd - 0.10 * F, y + 0.30 * F]]) });
    }
    /* pilspets som följer bågens SLUTRIKTNING: benen läggs symmetriskt
     * kring tangenten vid spetsen, så spetsen pekar dit bågen pekar */
    function arrowHead(tipX, tipY, fromX, fromY, len) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY]);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY]);
    }

    /* ---- steg 1: figuren ---- */
    var fx = padL, fy = 40;
    var murW = 272, murH = 26;
    var hx = fx + 36, hy = fy + murH, hw = 200, hh = 104;

    var b1 = bubble(346, 40, 236, [
      [['Först ritar jag en figur!']],
      [['Muren blir hagens ena sida —']],
      [['där behövs inget stängsel.']]
    ], [fx + murW + 6, fy + 40]);
    var b2 = bubble(346, 40, 240, [
      [['Stängslet räcker till tre sidor:']],
      [['x', 1], [' + ', 0], ['x', 1], [' + (60 − 2', 0], ['x', 1], [') = 60 meter.']]
    ], [hx + hw + 10, hy + hh - 20]);

    acts.push({ kind: 'show', obj: b1 });
    pause(700);
    line([fx, fy], [fx + murW, fy]);                       /* muren */
    line([fx, fy + murH], [fx + murW, fy + murH]);
    line([fx, fy], [fx, fy + murH]);
    line([fx + murW, fy], [fx + murW, fy + murH]);
    var hxi;
    for (hxi = 0; hxi < 8; hxi++) {                        /* skraffering */
      var xh = fx + 10 + hxi * 33;
      if (Math.abs(xh - (fx + murW / 2)) < 40) continue;   /* plats för "Mur" */
      line([xh + 11, fy + 3], [xh, fy + murH - 3]);
    }
    var wMur = stringAdvance('Mur', s * 0.55, F * 0.55);
    placeString('Mur', fx + murW / 2 - wMur / 2, fy + murH - 7, s * 0.55, F * 0.55, acts);
    pause(200);
    line([hx, hy], [hx, hy + hh]);                         /* hagen: tre sidor */
    line([hx, hy + hh], [hx + hw, hy + hh]);
    line([hx + hw, hy + hh], [hx + hw, hy]);
    acts.push({ kind: 'hide', obj: b1 });
    pause(250);
    acts.push({ kind: 'show', obj: b2 });
    pause(700);
    var lx = hx - 16, rx = hx + hw + 16, by = hy + hh + 18;
    line([lx, hy + 8], [lx, hy + hh - 8]);                 /* måttpil vänster */
    line([lx - 4, hy + 15], [lx, hy + 7]);
    line([lx + 4, hy + 15], [lx, hy + 7]);
    line([lx - 4, hy + hh - 15], [lx, hy + hh - 7]);
    line([lx + 4, hy + hh - 15], [lx, hy + hh - 7]);
    placeGlyph('x', lx - 26, hy + hh / 2 + 6, s * 0.6, acts);
    line([rx, hy + 8], [rx, hy + hh - 8]);                 /* måttpil höger */
    line([rx - 4, hy + 15], [rx, hy + 7]);
    line([rx + 4, hy + 15], [rx, hy + 7]);
    line([rx - 4, hy + hh - 15], [rx, hy + hh - 7]);
    line([rx + 4, hy + hh - 15], [rx, hy + hh - 7]);
    placeGlyph('x', rx + 8, hy + hh / 2 + 6, s * 0.6, acts);
    line([hx + 8, by], [hx + hw - 8, by]);                 /* måttpil botten */
    line([hx + 15, by - 4], [hx + 7, by]);
    line([hx + 15, by + 4], [hx + 7, by]);
    line([hx + hw - 15, by - 4], [hx + hw - 7, by]);
    line([hx + hw - 15, by + 4], [hx + hw - 7, by]);
    var wBot = stringAdvance('60−2x', s * 0.6, F * 0.6);
    placeString('60−2x', hx + hw / 2 - wBot / 2, by + 24, s * 0.6, F * 0.6, acts);
    /* enheten uppe till höger i figuren */
    var wEnh = stringAdvance('(m)', s * 0.55, F * 0.55);
    placeString('(m)', fx + murW - wEnh + 8, fy - 8, s * 0.55, F * 0.55, acts);
    acts.push({ kind: 'hide', obj: b2 });
    stepEnd();

    /* ---- steg 2: a) areafunktionen skrivs upp ---- */
    var y = by + 96;
    var adv = 1.7 * F;
    var b3 = bubble(120, y + 22, 226, [
      [['Rektangelns area:']],
      [['basen · höjden']]
    ], [250, y - 8]);
    acts.push({ kind: 'show', obj: b3 });
    pause(700);
    var xx = placeString('a) A(x)=(', padL, y, s, F, acts);
    var s60 = xx; xx = placeString('60', xx, y, s, F, acts);
    var c60 = (s60 + xx) / 2;
    xx = placeString('-', xx, y, s, F, acts);
    var s2x = xx; xx = placeString('2x', xx, y, s, F, acts);
    var c2x = (s2x + xx) / 2;
    xx = placeString(')·', xx, y, s, F, acts);
    var sxm = xx; xx = placeString('x', xx, y, s, F, acts);
    var cxm = (sxm + xx) / 2;
    acts.push({ kind: 'hide', obj: b3 });
    stepEnd();

    /* ---- steg 3: distributiva bågpilar + utvecklingen ---- */
    var b3b = bubble(120, y + adv + 22, 252, [
      [['Distributiva lagen: ', 0], ['x', 1], ['-et', 0]],
      [['multipliceras med båda termerna!']]
    ], [300, y + adv - 8]);
    acts.push({ kind: 'show', obj: b3b });
    pause(650);
    /* bågpil x → 60, sedan termen 60x; bågpil x → 2x, sedan −2x² */
    var yArc = y - 0.98 * F;
    var m1x = (cxm + c60) / 2, m1y = yArc - 30;
    acts.push({ kind: 'stroke',
      pts: [[cxm, yArc], [m1x, m1y], [c60 + 5, yArc - 3]] });
    arrowHead(c60 + 5, yArc - 3, m1x, m1y, 11);
    pause(300);
    y += adv;
    xx = placeString('=60x', padL, y, s, F, acts);
    pause(350);
    var m2x = (cxm + c2x) / 2, m2y = yArc - 18;
    acts.push({ kind: 'stroke',
      pts: [[cxm + 6, yArc], [m2x, m2y], [c2x + 5, yArc - 3]] });
    arrowHead(c2x + 5, yArc - 3, m2x, m2y, 11);
    pause(300);
    placeString('-2x^2', xx, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b3b });
    stepEnd();

    /* ---- steg 4: svaret på a) ---- */
    y += adv;
    var xe = placeString('Svar: A(x)=60x-2x^2', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- steg 5–6: b) derivera och sätt derivatan till noll ---- */
    y += adv + 18;
    var b4 = bubble(120, y + 22, 236, [
      [['Största arean? Derivera']],
      [['och sätt ', 0], ["A'", 1], ['(', 0], ['x', 1], [') = 0!']]
    ], [250, y - 8]);
    acts.push({ kind: 'show', obj: b4 });
    pause(700);
    placeString("b) A'(x)=60-4x", padL, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b4 });
    stepEnd();
    y += adv;
    placeString('60-4x=0', padL, y, s, F, acts);
    stepEnd();

    /* ---- steg 7–11: lös ekvationen — ALLA mellansteg, rad för rad ---- */
    y += adv + 18;
    var b4b = bubble(120, y + 22, 248, [
      [['Vågskålsmetoden: addera 4', 0], ['x', 1], [',']],
      [['dela sedan båda leden med 4.']]
    ], [260, y - 8]);
    acts.push({ kind: 'show', obj: b4b });
    pause(700);
    xx = placeString('60-4x', padL, y, s, F, acts);
    xx = placeString('+4x', xx, y, s, F, acts, BLUE);
    xx = placeString('=', xx, y, s, F, acts);
    xx = placeString('0', xx, y, s, F, acts);
    placeString('+4x', xx, y, s, F, acts, BLUE);
    acts.push({ kind: 'hide', obj: b4b });
    stepEnd();
    y += adv;
    placeString('60=4x', padL, y, s, F, acts);
    stepEnd();
    y += adv + 0.55 * F;
    /* bråkraden 60/4 = 4x/4 med blått streck + nämnare (som i vågskåls-demot) */
    var fracH = function (numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: BLUE });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, BLUE);
      return x0 + w + 1.5;
    };
    xx = fracH('60', '4', padL, y);
    xx = placeString('=', xx, y, s, F, acts);
    fracH('4x', '4', xx, y);
    stepEnd();
    y += adv + 0.65 * F;
    placeString('15=x', padL, y, s, F, acts);
    stepEnd();
    y += adv;
    placeString('x=15', padL, y, s, F, acts);
    stepEnd();

    /* ---- steg 12–13: insättning i A(x) ---- */
    y += adv + 18;
    var b5 = bubble(120, y + 22, 240, [
      [['Hur stor är arean då?']],
      [['In med ', 0], ['x', 1], [' = 15 i ', 0], ['A', 1], ['(', 0], ['x', 1], [')!']]
    ], [280, y - 8]);
    acts.push({ kind: 'show', obj: b5 });
    pause(700);
    placeString('A(15)=60·15-2·15^2', padL, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b5 });
    stepEnd();
    y += adv;
    placeString('=900-450=450', padL, y, s, F, acts);
    stepEnd();

    /* ---- steg 14–15: karaktär + svar ---- */
    y += adv + 18;
    var b6 = bubble(120, y + 22, 244, [
      [['Max eller min? Kolla tecknet på']],
      [['andraderivatan: negativt = max!']]
    ], [270, y - 8]);
    acts.push({ kind: 'show', obj: b6 });
    pause(700);
    placeString("A''(x)=−4<0⇒max", padL, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b6 });
    stepEnd();
    y += adv;
    xe = placeString('Svar: 450 m^2', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 566, lastBase: y + 14, padL: padL };
  }

  /* ---------------- scen: kraftmoment "gungbrädan" ----------------
   * Exempel 3 ur Fysik nivå 2, 1.1 Kraftmoment (momentjämvikt): pappa
   * 80 kg och barn 30 kg på en gungbräda. Handmetoden: rita först det
   * man VET (bräda, vridningspunkt med prick, streckgubbar — man behöver
   * inte vara konstnär!), rita sedan TILLÄGG i figuren (tyngdkrafterna
   * som skalenliga pilar, hävarmarnas måttlinjer) och räkna till sist
   * rad för rad. Varje rad/figurtillägg är ett eget klicksteg. */
  function layoutGunga(cfg, F) {
    F = Math.min(F, 32);
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    /* handritad streckad linje: korta segment med luckor */
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines, tail) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, tail: tail, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: humanize([[padL - 2, y + 0.30 * F], [xEnd - 0.10 * F, y + 0.30 * F]]) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY]);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY]);
    }
    /* handritad cirkel (streckgubbe-huvud) */
    function circle(cx, cy, r) {
      var pts = [];
      for (var i = 0; i <= 10; i++) {
        var a = -1.2 + (i / 10) * Math.PI * 2.12;
        pts.push([cx + Math.cos(a) * (r + rnd(-0.8, 0.8)),
                  cy + Math.sin(a) * (r + rnd(-0.8, 0.8))]);
      }
      acts.push({ kind: 'stroke', pts: pts });
    }
    /* bråk med rakt streck; col färgar streck + nämnare (division i blått) */
    function fracH(numS, denS, x0, yb, col) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: col || null });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, col || null);
      return x0 + w + 1.5;
    }

    /* --- figurens geometri --- */
    var plankY = 150, plankB = 158;         /* brädans över-/underkant */
    var plankL = 60, plankR = 380;
    var pivX = 220;                          /* vridningspunkten */
    var papX = 150, barnX = 350;             /* pappa resp. barn sitter här */
    var dimY = 258;                          /* måttlinjens nivå */

    /* ---- steg 1: rita det vi vet — bräda, vridningspunkt, personer ---- */
    var b1 = bubble(398, 40, 250, [
      [['Först en enkel figur —']],
      [['streckgubbar duger gott!']],
      [['Pricken är vridningspunkten.']]
    ], [250, 130]);
    acts.push({ kind: 'show', obj: b1 });
    pause(700);
    line([plankL, plankY], [plankR, plankY]);            /* brädan */
    line([plankL, plankB], [plankR, plankB]);
    line([plankL, plankY], [plankL, plankB]);
    line([plankR, plankY], [plankR, plankB]);
    pause(120);
    line([pivX, plankB], [pivX - 22, plankB + 44]);      /* stödet (triangel) */
    line([pivX - 22, plankB + 44], [pivX + 22, plankB + 44]);
    line([pivX + 22, plankB + 44], [pivX, plankB]);
    acts.push({ kind: 'stroke', pts: dotPts(pivX, plankY + 4) }); /* vridningspunkt */
    pause(180);
    /* pappa (större streckgubbe, vänster, vänd åt höger) */
    circle(papX, 96, 13);
    line([papX, 109], [papX, 148]);                      /* bål */
    line([papX, 118], [papX + 15, 146]);                 /* arm mot brädan */
    line([papX, 147], [papX + 18, 147]);                 /* lår */
    line([papX + 18, 147], [papX + 19, 168]);            /* underben */
    var w80 = stringAdvance('80 kg', s * 0.55, F * 0.55);
    placeString('80 kg', papX - w80 / 2, 74, s * 0.55, F * 0.55, acts);
    pause(150);
    /* barnet (mindre streckgubbe, höger, vänd åt vänster) */
    circle(barnX, 109, 10);
    line([barnX, 119], [barnX, 148]);
    line([barnX, 126], [barnX - 12, 146]);
    line([barnX, 147], [barnX - 14, 147]);
    line([barnX - 14, 147], [barnX - 15, 163]);
    var w30 = stringAdvance('30 kg', s * 0.55, F * 0.55);
    placeString('30 kg', barnX - w30 / 2, 90, s * 0.55, F * 0.55, acts);
    acts.push({ kind: 'hide', obj: b1 });
    stepEnd();

    /* ---- steg 2: tillägg — tyngdkrafterna som skalenliga pilar ---- */
    var b2 = bubble(398, 40, 252, [
      [['Tyngdkrafterna ', 0], ['F', 1], [' = ', 0], ['m', 1], [' · ', 0],
       ['g', 1], [' vrider']],
      [['brädan åt varsitt håll. Pappa är']],
      [['tyngre — hans pil ritas längre!']]
    ], [180, 195]);
    acts.push({ kind: 'show', obj: b2 });
    pause(700);
    /* pil ∝ massa: 1 px per kg — pappas pil ritas från tyngdpunkten */
    acts.push({ kind: 'stroke', pts: dotPts(papX, 148) });
    line([papX, 148], [papX, 228 - 10]);
    arrowHead(papX, 228, papX, 148, 11);
    placeString('F_P', papX + 12, 240, s * 0.62, F * 0.62, acts);
    pause(200);
    acts.push({ kind: 'stroke', pts: dotPts(barnX, 148) });
    line([barnX, 148], [barnX, 178 - 9]);
    arrowHead(barnX, 178, barnX, 148, 10);
    placeString('F_B', barnX + 10, 190, s * 0.62, F * 0.62, acts);
    acts.push({ kind: 'hide', obj: b2 });
    stepEnd();

    /* ---- steg 3: tillägg — hävarmarna som måttlinjer ---- */
    var b3 = bubble(398, 40, 252, [
      [['Hävarmen är avståndet från']],
      [['vridningspunkten till kraftens']],
      [['riktningslinje.']]
    ], [260, 250]);
    acts.push({ kind: 'show', obj: b3 });
    pause(700);
    dash([pivX, plankB + 46], [pivX, dimY]);             /* projektionslinjer */
    dash([papX, 232], [papX, dimY]);
    dash([barnX, 182], [barnX, dimY]);
    pause(150);
    line([papX + 10, dimY], [pivX - 12, dimY]);          /* måttlinje vänster */
    arrowHead(papX, dimY, papX + 16, dimY, 9);
    arrowHead(pivX - 4, dimY, pivX - 20, dimY, 9);
    var wLp = stringAdvance('l_P=?', s * 0.62, F * 0.62);
    placeString('l_P=?', (papX + pivX) / 2 - 9 - wLp / 2, 282, s * 0.62, F * 0.62, acts);
    pause(150);
    line([pivX + 12, dimY], [barnX - 10, dimY]);         /* måttlinje höger */
    arrowHead(pivX + 4, dimY, pivX + 20, dimY, 9);
    arrowHead(barnX, dimY, barnX - 16, dimY, 9);
    var wLb = stringAdvance('l_B=2,0 m', s * 0.62, F * 0.62);
    placeString('l_B=2,0 m', (pivX + barnX) / 2 + 9 - wLb / 2, 282, s * 0.62, F * 0.62, acts);
    acts.push({ kind: 'hide', obj: b3 });
    stepEnd();

    /* ---- beräkningen, rad för rad ---- */
    var y = 348;
    var adv = 1.7 * F;
    var bx = 340, bw = 290;

    var b4 = bubble(120, y + 24, bw, [
      [['Momentjämvikt: momentet moturs']],
      [['är lika stort som momentet medurs.']]
    ], [160, y - 6]);
    acts.push({ kind: 'show', obj: b4 });
    pause(700);
    placeString('M_1=M_2', padL, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b4 });
    stepEnd();

    y += adv;
    var b5 = bubble(120, y + 24, bw, [
      [['Varje moment är ', 0], ['M', 1], [' = ', 0], ['F', 1], [' · ', 0],
       ['l', 1], [' —', 0]],
      [['kraften gånger hävarmen.']]
    ], [200, y - 6]);
    acts.push({ kind: 'show', obj: b5 });
    pause(700);
    placeString('F_P·l_P=F_B·l_B', padL, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b5 });
    stepEnd();

    y += adv;
    var b6 = bubble(120, y + 24, bw, [
      [['Tyngdkraften är ', 0], ['F', 1], [' = ', 0], ['m', 1], [' · ', 0],
       ['g', 1], [' —', 0]],
      [['jag byter ut båda krafterna.']]
    ], [220, y - 6]);
    acts.push({ kind: 'show', obj: b6 });
    pause(700);
    placeString('m_P·g·l_P=m_B·g·l_B', padL, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b6 });
    stepEnd();

    y += adv + 0.55 * F;
    var b7 = bubble(140, y + 52, bw, [
      [['g', 1], [' finns i båda leden —', 0]],
      [['jag delar båda leden med ', 0], ['g', 1], ['!', 0]]
    ], [230, y + 20]);
    acts.push({ kind: 'show', obj: b7 });
    pause(700);
    var xx = fracH('m_P·g·l_P', 'g', padL, y, BLUE);
    xx = placeString('=', xx, y, s, F, acts);
    fracH('m_B·g·l_B', 'g', xx, y, BLUE);
    acts.push({ kind: 'hide', obj: b7 });
    stepEnd();

    y += adv + 0.65 * F;
    placeString('m_P·l_P=m_B·l_B', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.55 * F;
    var b8 = bubble(140, y + 52, bw, [
      [['Dela med pappans massa så att']],
      [['hävarmen blir ensam kvar.']]
    ], [220, y + 20]);
    acts.push({ kind: 'show', obj: b8 });
    pause(700);
    xx = placeString('l_P=', padL, y, s, F, acts);
    fracH('m_B·l_B', 'm_P', xx, y);
    acts.push({ kind: 'hide', obj: b8 });
    stepEnd();

    y += adv + 1.2 * F;
    var b9 = bubble(140, y + 52, bw, [
      [['In med värdena: 30 kg och 2,0 m']],
      [['för barnet, 80 kg för pappa.']]
    ], [240, y + 20]);
    acts.push({ kind: 'show', obj: b9 });
    pause(700);
    xx = placeString('l_P=', padL, y, s, F, acts);
    xx = fracH('30·2,0', '80', xx, y);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracH('60', '80', xx, y);
    placeString('=0,75 m', xx, y, s, F, acts);
    acts.push({ kind: 'hide', obj: b9 });
    stepEnd();

    y += adv + 0.65 * F;
    var b10 = bubble(120, y + 30, bw, [
      [['Pappa ska sitta närmare än barnet —']],
      [['rimligt, han är ju tyngre!']]
    ], [200, y - 6]);
    acts.push({ kind: 'show', obj: b10 });
    pause(700);
    var xe = placeString('Svar: l_P=0,75 m', padL, y, s, F, acts);
    underline(xe, y);
    acts.push({ kind: 'hide', obj: b10 });
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ifylld prick: tät spiral inåt — ser ut som en ritad punkt */
  function dotPts(cx, cy) {
    var pts = [];
    for (var i = 0; i <= 11; i++) {
      var a = (i / 11) * Math.PI * 3.6 + rnd(-0.2, 0.2);
      var r = 3.4 - i * 0.22;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
  }

  /* handritad inringnings-ellips: punkter runt varvet med jitter */
  function ringPts(cx, cy, rx, ry) {
    var pts = [];
    for (var i = 0; i <= 13; i++) {
      var a = -0.6 + (i / 13) * Math.PI * 2.15;   /* börjar snett, överlapp */
      pts.push([cx + Math.cos(a) * (rx + rnd(-2, 2)),
                cy + Math.sin(a) * (ry + rnd(-1.5, 1.5))]);
    }
    return pts;
  }

  /* ---------------- handen med pennan ----------------
   * Ritas i eget koordinatsystem med pennspetsen i (0,0).
   * Fingrar/handflata byggs av "kapslar": två <line> med runda ändar
   * ovanpå varandra (kant + hud) — ger konturerade rundade former. */
  var SKIN = '#eec6a2', SKINEDGE = '#c99b73';

  /* Rita en grupp kapslar i två pass: först alla konturer, sedan alla
   * hudfyllningar — inre konturer täcks och gruppen får EN silhuett. */
  function capsuleGroup(parent, parts) {
    parts.forEach(function (p) {
      el('line', { x1: p[0], y1: p[1], x2: p[2], y2: p[3], stroke: SKINEDGE,
                   'stroke-width': p[4] + 3, 'stroke-linecap': 'round' }, parent);
    });
    parts.forEach(function (p) {
      el('line', { x1: p[0], y1: p[1], x2: p[2], y2: p[3], stroke: SKIN,
                   'stroke-width': p[4], 'stroke-linecap': 'round' }, parent);
    });
  }

  function buildHand(scale) {
    var hand = el('g', { 'class': 'hk-hand' });
    var g = el('g', { transform: 'scale(' + scale + ')' }, hand);

    /* mycket diskret skugga under handen */
    el('ellipse', { cx: 82, cy: 22, rx: 54, ry: 19, fill: '#000',
                    opacity: 0.045 }, g);

    /* handmassa: handled + handflata + böjda fingrar som EN silhuett */
    capsuleGroup(g, [
      [98, 8, 152, 44, 46],     /* handled/arm */
      [58, -26, 94, 4, 54],     /* handflata  */
      [34, -6, 54, -17, 16],    /* långfinger (böjt) */
      [42, 3, 62, -9, 16],      /* ringfinger */
      [51, 12, 68, 1, 15]       /* lillfinger */
    ]);
    /* diskreta skiljelinjer mellan de böjda fingrarna */
    el('line', { x1: 40, y1: -13, x2: 47, y2: 0, stroke: SKINEDGE,
                 'stroke-width': 1.3, opacity: 0.55,
                 'stroke-linecap': 'round' }, g);
    el('line', { x1: 49, y1: -4, x2: 56, y2: 8, stroke: SKINEDGE,
                 'stroke-width': 1.3, opacity: 0.55,
                 'stroke-linecap': 'round' }, g);

    /* pennan — ritas längs +x i en grupp roterad -50° (upp åt höger).
     * Ligger OVANPÅ de böjda fingrarna men UNDER tumme + pekfinger.
     * Delarna sparas i hand._pencil så att pennan kan "bytas" till en
     * blåpenna när det som skrivs härnäst är blått. */
    var pg = el('g', { transform: 'rotate(-50)' }, g);
    var pTip = el('path', { d: 'M0 0 L9 -3 L9 3 Z', fill: '#4e4c48' }, pg); /* stift */
    el('path', { d: 'M9 -3 L23 -6.5 L23 6.5 L9 3 Z', fill: '#ead2a9',
                 stroke: '#c9a976', 'stroke-width': 0.7 }, pg);             /* trä */
    var pBarrel = el('rect', { x: 23, y: -6.5, width: 92, height: 13,
                 fill: '#e9a83f', stroke: '#c08624',
                 'stroke-width': 0.8 }, pg);                                /* skaft */
    var pHi = el('line', { x1: 24, y1: -2.2, x2: 115, y2: -2.2,
                 stroke: '#f6c56d', 'stroke-width': 2.2 }, pg);
    var pLo = el('line', { x1: 24, y1: 2.4, x2: 115, y2: 2.4,
                 stroke: '#c9882a', 'stroke-width': 2.2 }, pg);
    el('rect', { x: 115, y: -6.8, width: 9, height: 13.6, fill: '#b9bdc6' }, pg);
    el('rect', { x: 124, y: -6.2, width: 13, height: 12.4, rx: 5,
                 fill: '#e8a09b' }, pg);
    hand._pencil = { tip: pTip, barrel: pBarrel, hi: pHi, lo: pLo };

    /* greppet: tumme + pekfinger som EN silhuett ovanpå pennan */
    capsuleGroup(g, [
      [46, -14, 21, -16, 15],   /* tumme, korsar skaftet */
      [37, -52, 12, -28, 14]    /* pekfinger, vilar längs skaftets ovansida */
    ]);

    return hand;
  }

  /* ---------------- tankebubbla ----------------
   * "Det man tänker men inte skriver" — tryckt text (Poppins) i ett
   * molnformat moln: bulor (cirklar) runt kanten i två pass (konturer
   * först, fyllningar sedan) så att bara de yttre bågarna syns.
   * Bubblorna ligger i ett lager ÖVER handen — de skyms aldrig. */
  function makeBubble(o) {
    var g = el('g', { opacity: 0 });
    var lineH = 22, fs = 16;
    var h = o.lines.length * lineH + 30;
    var cx = o.x + o.w / 2, cy = o.y + h / 2;
    var dx = o.tail[0] - cx, dy = o.tail[1] - cy;
    var dl = Math.hypot(dx, dy) || 1;
    /* tanke-cirklar från molnkanten mot målet */
    var edge = Math.min(dx !== 0 ? Math.abs((o.w / 2 + 12) / (dx / dl)) : 1e9,
                        dy !== 0 ? Math.abs((h / 2 + 12) / (dy / dl)) : 1e9);
    var ex = cx + dx / dl * edge, ey = cy + dy / dl * edge;
    el('circle', { cx: ex + dx / dl * 12, cy: ey + dy / dl * 12, r: 5.4,
                   fill: '#fffdf8', stroke: 'rgba(15,22,32,.55)',
                   'stroke-width': 1.3 }, g);
    el('circle', { cx: ex + dx / dl * 25, cy: ey + dy / dl * 25, r: 3.3,
                   fill: '#fffdf8', stroke: 'rgba(15,22,32,.5)',
                   'stroke-width': 1.1 }, g);
    /* molnbulor längs rektangelns kant */
    var bumps = [];
    function walkEdge(x1, y1, x2, y2) {
      var len = Math.hypot(x2 - x1, y2 - y1);
      var n = Math.max(1, Math.round(len / 21));
      for (var i = 0; i < n; i++) {
        bumps.push([x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n,
                    rnd(11, 15)]);
      }
    }
    walkEdge(o.x, o.y, o.x + o.w, o.y);
    walkEdge(o.x + o.w, o.y, o.x + o.w, o.y + h);
    walkEdge(o.x + o.w, o.y + h, o.x, o.y + h);
    walkEdge(o.x, o.y + h, o.x, o.y);
    bumps.forEach(function (b) {
      el('circle', { cx: b[0], cy: b[1], r: b[2], fill: '#fffdf8',
                     stroke: 'rgba(15,22,32,.55)', 'stroke-width': 1.3 }, g);
    });
    bumps.forEach(function (b) {          /* döljer de inre konturbågarna */
      el('circle', { cx: b[0], cy: b[1], r: b[2], fill: '#fffdf8' }, g);
    });
    el('rect', { x: o.x, y: o.y, width: o.w, height: h, fill: '#fffdf8' }, g);
    o.lines.forEach(function (ln, i) {
      var t = el('text', { x: o.x + 10, y: o.y + 24 + lineH * i,
                           'font-family': 'Poppins, system-ui, sans-serif',
                           'font-size': fs, fill: LABINK }, g);
      ln.forEach(function (seg) {
        var sp = document.createElementNS(SVGNS, 'tspan');
        if (seg[1]) sp.setAttribute('font-style', 'italic');
        sp.textContent = seg[0];
        t.appendChild(sp);
      });
    });
    return g;
  }

  /* ---------------- hjälplinjer vid punktplottning ----------------
   * Streckade linjer från punkten lodrätt till x-axeln och vågrätt till
   * y-axeln — tonar in när punkten prickas och ut när nästa prickas.
   * Ritas inte av handen (de är "tänkta" linjer), ligger UNDER handen. */
  function makeGuide(o) {
    var g = el('g', { opacity: 0 });
    if (Math.abs(o.px - o.ox) > 1) {         /* ingen linje ovanpå en axel */
      el('line', { x1: o.px, y1: o.py, x2: o.px, y2: o.oy, stroke: LABINK,
                   'stroke-width': 1.5, 'stroke-dasharray': '5 4',
                   opacity: 0.5 }, g);
    }
    if (Math.abs(o.py - o.oy) > 1) {
      el('line', { x1: o.px, y1: o.py, x2: o.ox, y2: o.py, stroke: LABINK,
                   'stroke-width': 1.5, 'stroke-dasharray': '5 4',
                   opacity: 0.5 }, g);
    }
    /* hjälpsiffror i handstil (förrenderade pennstreck, lite ljusare) */
    (o.labels || []).forEach(function (pts) {
      el('path', { d: pathFrom(pts), fill: 'none', stroke: INK,
                   'stroke-width': 2, 'stroke-linecap': 'round',
                   'stroke-linejoin': 'round', opacity: 0.78 }, g);
    });
    return g;
  }

  /* ---------------- linjal ----------------
   * Halvtransparent plastlinjal längs linjen som ska dras; överkanten
   * ligger exakt på linjen, kroppen under. */
  function makeRuler(o) {
    var ang = Math.atan2(o.y2 - o.y1, o.x2 - o.x1) * 180 / Math.PI;
    var len = Math.hypot(o.x2 - o.x1, o.y2 - o.y1);
    var g = el('g', { opacity: 0,
                      transform: 'translate(' + o.x1 + ' ' + o.y1 + ') ' +
                                 'rotate(' + ang.toFixed(2) + ')' });
    el('rect', { x: -26, y: 2, width: len + 52, height: 36, rx: 4,
                 fill: '#e9eff6', 'fill-opacity': 0.82,
                 stroke: '#8fa5bc', 'stroke-width': 1.2 }, g);
    for (var xx = -13.5, i = 0; xx <= len + 27; xx += 13.5, i++) {
      el('line', { x1: xx, y1: 3, x2: xx, y2: 3 + (i % 2 ? 6 : 10),
                   stroke: '#7b90a6', 'stroke-width': 1 }, g);
    }
    return g;
  }

  /* ---------------- CSS (injiceras en gång) ---------------- */
  function injectCSS() {
    if (document.getElementById('hk-style')) return;
    var st = document.createElement('style');
    st.id = 'hk-style';
    st.textContent =
      '.hk-wrap{max-width:760px;margin:0 auto;font-family:Poppins,system-ui,sans-serif}' +
      '.hk-paper{position:relative;border-radius:12px;overflow:hidden;cursor:pointer;' +
        'box-shadow:0 2px 10px rgba(15,22,32,.10),0 1px 3px rgba(15,22,32,.08);' +
        'border:1px solid rgba(15,22,32,.12);background:' + PAPER + '}' +
      '.hk-paper svg{display:block;width:100%;height:auto}' +
      /* helskärmsknappen följer widgetens eget formspråk (samma kant,
       * botten och radie som hk-btn-knapparna) — diskret uppe till höger */
      '.hk-fsbtn{position:absolute;top:10px;right:10px;width:32px;height:32px;' +
        'border-radius:8px;background:' + PAPER + ';' +
        'border:1.5px solid rgba(15,22,32,.55);color:' + LABINK + ';' +
        'display:flex;align-items:center;justify-content:center;cursor:pointer;' +
        'padding:0;opacity:.75;transition:background .15s,opacity .15s;z-index:5}' +
      '.hk-fsbtn:hover{background:#efe8d8;opacity:1}' +
      '.hk-fsbtn svg{width:14px;height:14px}' +
      /* helskärm (presentation): arket fyller skärmens BREDD (stor text),
       * sidan rullar på höjden och följer pennan; knappraden ligger fast
       * i underkanten */
      '.hk-wrap:fullscreen,.hk-wrap:-webkit-full-screen{max-width:none;' +
        'background:linear-gradient(160deg,#f2ecdf,#e9e0cd);display:flex;' +
        'flex-direction:column;align-items:center;justify-content:flex-start;' +
        'padding:12px 12px 84px;overflow-y:auto;overflow-x:hidden}' +
      '.hk-wrap:fullscreen .hk-paper,.hk-wrap:-webkit-full-screen .hk-paper' +
        '{flex:0 0 auto}' +
      '.hk-wrap:fullscreen .hk-fsbtn,.hk-wrap:-webkit-full-screen .hk-fsbtn' +
        '{position:fixed;top:12px;right:12px}' +
      '.hk-wrap:fullscreen .hk-controls,.hk-wrap:-webkit-full-screen .hk-controls' +
        '{position:fixed;left:0;right:0;bottom:0;margin:0;padding:10px 18px;' +
        'justify-content:center;background:rgba(243,238,228,.93);' +
        'border-top:1px solid rgba(15,22,32,.15)}' +
      '.hk-controls{display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap}' +
      '.hk-btn{border:1.5px solid ' + LABINK + ';background:' + PAPER + ';color:' + LABINK + ';' +
        'border-radius:8px;padding:6px 18px;font-weight:600;font-size:14px;cursor:pointer;' +
        'font-family:inherit;transition:background .15s,color .15s}' +
      '.hk-btn:hover{background:#efe8d8}' +
      '.hk-btn:disabled{opacity:.4;cursor:default}' +
      '.hk-btn:disabled:hover{background:' + PAPER + '}' +
      '.hk-btn.hk-active,.hk-btn.hk-active:hover{background:' + LABINK + ';color:' + PAPER + '}' +
      '.hk-speed{display:flex;gap:4px;align-items:center;margin-left:auto}' +
      '.hk-speed-label{font-size:12.5px;color:rgba(15,22,32,.62);margin-right:2px}' +
      '.hk-sbtn{border:1.5px solid rgba(15,22,32,.35);background:' + PAPER + ';color:' + LABINK + ';' +
        'border-radius:7px;padding:3px 9px;font-weight:600;font-size:12.5px;cursor:pointer;' +
        'font-family:inherit}' +
      '.hk-sbtn.hk-active{background:' + LABINK + ';color:' + PAPER + ';border-color:' + LABINK + '}';
    document.head.appendChild(st);
  }

  /* ---------------- mount ---------------- */
  function mount(container, spec, opts) {
    opts = opts || {};
    var F = opts.fontSize || 40;
    var speed = opts.speed || 1;
    injectCSS();

    var L = (spec && !Array.isArray(spec) && spec.typ === 'linjegraf')
      ? layoutLinjegraf(spec, F)
      : (spec && !Array.isArray(spec) && spec.typ === 'hage')
        ? layoutHage(spec, F)
        : (spec && !Array.isArray(spec) && spec.typ === 'gungbrada')
          ? layoutGunga(spec, F) : layout(spec, F);

    /* svg är "skrivbordet": papperet + extra marginal höger/nedåt så att
     * handen får rum att sticka ut utanför papperskanten. */
    var paperW = Math.max(L.contentW + 70, 430);
    var paperH = L.lastBase + 0.5 * F + 20;
    var W = paperW, H = paperH + 1.9 * F;   /* extra luft under sista raden */

    var wrap = document.createElement('div');
    wrap.className = 'hk-wrap';
    var paperDiv = document.createElement('div');
    paperDiv.className = 'hk-paper';
    paperDiv.title = 'Klicka för nästa steg';
    wrap.appendChild(paperDiv);

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H,
                          'aria-label': 'Handskriven lösning' });
    paperDiv.appendChild(svg);

    /* defs: rutmönster + blyertsfilter */
    var defs = el('defs', null, svg);
    var pat = el('pattern', { id: 'hkGrid', width: 27, height: 27,
                              patternUnits: 'userSpaceOnUse' }, defs);
    el('path', { d: 'M27 0 H0 V27', fill: 'none', stroke: GRID,
                 'stroke-width': 1, opacity: 0.22 }, pat);
    var filt = el('filter', { id: 'hkPencil', x: '-5%', y: '-5%',
                              width: '110%', height: '110%' }, defs);
    el('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.9,
                         numOctaves: 2, seed: 7, result: 'n' }, filt);
    el('feDisplacementMap', { 'in': 'SourceGraphic', in2: 'n',
                              scale: 1.5 }, filt);

    el('rect', { x: 0, y: 0, width: W, height: H, fill: PAPER }, svg);
    el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#hkGrid)' }, svg);

    /* bläckgruppen: alla streck, dolda tills de "skrivs" */
    var inkG = el('g', { fill: 'none', stroke: INK, 'stroke-width': F * 0.062,
                         'stroke-linecap': 'round', 'stroke-linejoin': 'round',
                         opacity: 0.9, filter: 'url(#hkPencil)' }, svg);

    var strokes = [];
    L.acts.forEach(function (a) {
      if (a.kind !== 'stroke') return;
      var attrs = { d: pathFrom(a.pts) };
      if (a.color) attrs.stroke = a.color;
      a.path = el('path', attrs, inkG);
      strokes.push(a);
    });

    /* objekt i två lager: linjalen UNDER handen (handen ritar på den),
     * tankebubblorna ÖVER handen (får aldrig skymmas) */
    var objs = [];
    var rulerG = el('g', null, svg);
    var hand = buildHand(F / 40);
    svg.appendChild(hand);
    var bubbleG = el('g', null, svg);
    L.acts.forEach(function (a) {
      if (a.kind !== 'show' || a.obj.el) return;
      a.obj.el = a.obj.bubble ? makeBubble(a.obj)
        : a.obj.guide ? makeGuide(a.obj) : makeRuler(a.obj);
      (a.obj.bubble ? bubbleG : rulerG).appendChild(a.obj.el);
      objs.push(a.obj);
    });

    /* container in i DOM före mätning (getTotalLength kräver rendering) */
    container.appendChild(wrap);
    strokes.forEach(function (a) {
      a.len = a.path.getTotalLength();
      a.path.setAttribute('stroke-dasharray', (a.len + 2) + ' ' + (a.len + 2));
      a.path.setAttribute('stroke-dashoffset', a.len + 2);
    });

    /* ---------------- tidslinje ---------------- */
    var DRAW = 0.155;    /* px per ms  (~155 px/s, behagligt tempo) */
    var LIFT = 0.55;     /* px per ms vid pennlyft */
    var events = [];
    var boundaries = [];   /* tider där stegvis uppspelning pausar */
    var t = 350;
    var pen = null;

    L.acts.forEach(function (a) {
      if (a.kind === 'lineEnd') {
        /* handen dras bort åt höger vid steggränsen så att den inte
         * skymmer det nyskrivna medan man läser */
        if (pen) {
          var rest = [W + 40, Math.min(pen[1] + 60, H - 20)];
          events.push({ type: 'move', t0: t, t1: t + 550, from: pen, to: rest });
          t += 550;
          pen = rest;
        }
        boundaries.push(t);
        return;
      }
      if (a.kind === 'show') { a.obj.wins.push([t, Infinity]); return; }
      if (a.kind === 'hide') {
        var wl = a.obj.wins;
        if (wl.length) wl[wl.length - 1][1] = t;
        return;
      }
      if (a.kind === 'fade') { a.ref.fade0 = t; a.ref.fade1 = t + 600; return; }
      if (a.kind === 'jump') {
        if (pen) {
          var jd = Math.hypot(a.to[0] - pen[0], a.to[1] - pen[1]);
          var jdur = Math.max(100, Math.min(520, jd / LIFT));
          events.push({ type: 'move', t0: t, t1: t + jdur, from: pen, to: a.to });
          t += jdur;
        }
        pen = a.to.slice();
        return;
      }
      if (a.kind === 'pause') {
        if (pen) { events.push({ type: 'wait', t0: t, t1: t + a.ms, at: pen }); }
        t += a.ms;
        return;
      }
      var start = [a.pts[0][0], a.pts[0][1]];
      var end = [a.pts[a.pts.length - 1][0], a.pts[a.pts.length - 1][1]];
      if (pen) {
        var d = Math.hypot(start[0] - pen[0], start[1] - pen[1]);
        if (d > 1.5) {
          var mdur = Math.max(80, Math.min(480, d / LIFT));
          events.push({ type: 'move', t0: t, t1: t + mdur, from: pen, to: start });
          t += mdur;
        }
      }
      var dur = Math.max(55, a.len / DRAW);
      events.push({ type: 'draw', t0: t, t1: t + dur, a: a });
      t += dur;
      pen = end;
    });
    /* handen glider av papperet när allt är klart */
    var exitTo = [W + 60, L.lastBase + 2 * F];
    events.push({ type: 'move', t0: t, t1: t + 800, from: pen || [W / 2, H / 2],
                  to: exitTo });
    var TOTAL = t + 800;
    /* sista radens steggräns slopas: sista steget löper ut i handens sorti */
    boundaries.pop();
    var stegvis = opts.stegvis !== false;

    /* penColor per event: vad pennan skriver/ska skriva härnäst — pennan
     * "byts" till blåpennan redan under lyftet fram till ett blått streck */
    var upcoming = null;
    for (var bi = events.length - 1; bi >= 0; bi--) {
      var bev = events[bi];
      if (bev.type === 'draw') upcoming = bev.a.color || null;
      bev.penCol = upcoming;
    }
    var startPos = events.length ? (events[0].at || events[0].from ||
      [strokes[0].pts[0][0], strokes[0].pts[0][1]]) : [W / 2, H / 2];
    if (strokes.length) startPos = [strokes[0].pts[0][0], strokes[0].pts[0][1]];

    /* ---------------- uppspelning ---------------- */
    var tNow = 0, playing = false, rafId = null, lastTs = null;

    function penPosAt(time) {
      var pos = startPos, lift = 0;
      var col = events.length ? events[0].penCol : null;
      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        if (time >= ev.t1) {
          pos = ev.type === 'draw'
            ? [ev.a.pts[ev.a.pts.length - 1][0], ev.a.pts[ev.a.pts.length - 1][1]]
            : (ev.to || ev.at);
          col = i + 1 < events.length ? events[i + 1].penCol : null;
          continue;
        }
        if (time < ev.t0) break;
        var p = (time - ev.t0) / (ev.t1 - ev.t0);
        if (ev.type === 'draw') {
          var pt = ev.a.path.getPointAtLength(p * ev.a.len);
          pos = [pt.x, pt.y];
        } else if (ev.type === 'move') {
          var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; /* ease */
          pos = [ev.from[0] + (ev.to[0] - ev.from[0]) * e,
                 ev.from[1] + (ev.to[1] - ev.from[1]) * e];
          lift = Math.sin(Math.PI * p);
        } else { pos = ev.at; }
        col = ev.penCol;
        break;
      }
      return { pos: pos, lift: lift, col: col };
    }

    /* byt penna: grafit ↔ blåpenna (stift + skaft tintas) */
    var pencilBlue = null;
    function setPencil(blue) {
      if (blue === pencilBlue) return;
      pencilBlue = blue;
      var pc = hand._pencil;
      pc.tip.setAttribute('fill', blue ? BLUE : '#4e4c48');
      pc.barrel.setAttribute('fill', blue ? '#4b79c4' : '#e9a83f');
      pc.barrel.setAttribute('stroke', blue ? '#2a5194' : '#c08624');
      pc.hi.setAttribute('stroke', blue ? '#84a9e0' : '#f6c56d');
      pc.lo.setAttribute('stroke', blue ? '#2e569c' : '#c9882a');
    }

    function winOpacity(wins, time) {
      var o = 0;
      for (var i = 0; i < wins.length; i++) {
        var a = wins[i][0], b = wins[i][1];
        if (time < a) continue;
        if (time < b) o = Math.max(o, Math.min(1, (time - a) / 260));
        else o = Math.max(o, Math.max(0, 1 - (time - b) / 260));
      }
      return o;
    }

    function render(time) {
      for (var i = 0; i < strokes.length; i++) {
        var a = strokes[i];
        var full = a.len + 2;
        var off;
        if (time >= a._t1) off = 0;
        else if (time <= a._t0) off = full;
        else off = full * (1 - (time - a._t0) / (a._t1 - a._t0));
        a.path.setAttribute('stroke-dashoffset', off);
        if (a.fade0 != null) {
          var fo = time <= a.fade0 ? 1 : (time >= a.fade1 ? 0
            : 1 - (time - a.fade0) / (a.fade1 - a.fade0));
          a.path.setAttribute('opacity', fo);
        }
      }
      for (var j = 0; j < objs.length; j++) {
        objs[j].el.setAttribute('opacity', winOpacity(objs[j].wins, time));
      }
      var pp = penPosAt(time);
      setPencil(pp.col === BLUE);
      /* före start (tomt ark) syns ingen hand; den tonar in när skrivandet
       * börjar */
      hand.setAttribute('opacity', time <= 0 ? 0 : Math.min(1, time / 260));
      var wob = (time < TOTAL - 800)
        ? Math.sin(time * 0.011) * 1.4 : 0;
      var lx = pp.pos[0] + pp.lift * 2;
      var ly = pp.pos[1] - pp.lift * 9;
      hand.setAttribute('transform',
        'translate(' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ') ' +
        'rotate(' + (wob - pp.lift * 4).toFixed(2) + ')');
    }

    /* koppla drawtider till strecken */
    events.forEach(function (ev) {
      if (ev.type === 'draw') { ev.a._t0 = ev.t0; ev.a._t1 = ev.t1; }
    });

    var target = TOTAL;   /* i stegvis läge: nästa steggräns */

    function nextTarget() {
      if (!stegvis) return TOTAL;
      for (var i = 0; i < boundaries.length; i++) {
        if (boundaries[i] > tNow + 1) return boundaries[i];
      }
      return TOTAL;
    }

    function frame(ts) {
      if (!playing) return;
      if (lastTs != null) tNow += (ts - lastTs) * speed;
      lastTs = ts;
      if (tNow >= target) { tNow = target; render(tNow); followPen(false); stop(); return; }
      render(tNow);
      followPen(false);
      rafId = requestAnimationFrame(frame);
    }

    function play() {
      if (playing || tNow >= TOTAL) return;   /* klar lösning står kvar —
                                                 omstart bara via "Börja om" */
      target = nextTarget();
      playing = true; lastTs = null;
      rafId = requestAnimationFrame(frame);
      updateBtns();
    }
    function stop() {
      playing = false; lastTs = null;
      if (rafId) cancelAnimationFrame(rafId);
      updateBtns();
    }
    function restart() { tNow = 0; render(0); if (!playing) play(); }
    function jumpToEnd() { stop(); tNow = TOTAL; render(TOTAL); followPen(true); updateBtns(); }

    /* ---------------- kontroller ---------------- */
    var ctrls = document.createElement('div');
    ctrls.className = 'hk-controls';
    var playBtn = document.createElement('button');
    playBtn.className = 'hk-btn';
    playBtn.textContent = 'Skriv';
    playBtn.addEventListener('click', function () {
      if (playing) stop(); else play();
    });
    /* föregående steg: hoppa tillbaka till närmast föregående steggräns
     * (mitt i ett steg: till stegets början) och visa läget direkt */
    var prevBtn = document.createElement('button');
    prevBtn.className = 'hk-btn';
    prevBtn.textContent = 'Föregående steg';
    prevBtn.addEventListener('click', function () {
      stop();
      var t0 = 0;
      for (var i = 0; i < boundaries.length; i++) {
        if (boundaries[i] < tNow - 1) t0 = boundaries[i];
      }
      tNow = t0;
      render(tNow);
      followPen(true);
      updateBtns();
    });
    var againBtn = document.createElement('button');
    againBtn.className = 'hk-btn';
    againBtn.textContent = 'Börja om';
    againBtn.addEventListener('click', restart);
    ctrls.appendChild(playBtn);
    ctrls.appendChild(prevBtn);
    ctrls.appendChild(againBtn);

    var spWrap = document.createElement('span');
    spWrap.className = 'hk-speed';
    var spLbl = document.createElement('span');
    spLbl.className = 'hk-speed-label';
    spLbl.textContent = 'Tempo';
    spWrap.appendChild(spLbl);
    var speeds = [[0.75, '0,75×'], [1, '1×'], [1.5, '1,5×'], [2, '2×']];
    var sBtns = [];
    speeds.forEach(function (sp) {
      var b = document.createElement('button');
      b.className = 'hk-sbtn' + (sp[0] === speed ? ' hk-active' : '');
      b.textContent = sp[1];
      b.addEventListener('click', function () {
        speed = sp[0];
        sBtns.forEach(function (x) { x.classList.remove('hk-active'); });
        b.classList.add('hk-active');
      });
      sBtns.push(b);
      spWrap.appendChild(b);
    });
    ctrls.appendChild(spWrap);
    wrap.appendChild(ctrls);

    function atBoundary() {
      for (var i = 0; i < boundaries.length; i++) {
        if (Math.abs(boundaries[i] - tNow) < 2) return true;
      }
      return false;
    }

    function updateBtns() {
      var klar = tNow >= TOTAL;
      playBtn.style.display = klar ? 'none' : '';   /* klar: bara Föregående/Börja om */
      playBtn.textContent = playing ? 'Paus'
        : (atBoundary() ? 'Nästa steg' : (tNow > 0 ? 'Fortsätt' : 'Skriv'));
      playBtn.classList.toggle('hk-active', playing);
      prevBtn.disabled = tNow <= 0;
      paperDiv.style.cursor = klar ? 'default' : 'pointer';
      paperDiv.title = klar ? '' : 'Klicka för nästa steg';
    }

    /* klick var som helst på papperet: nästa steg — eller, om ett steg
     * håller på att skrivas, hoppa direkt till slutet av det steget
     * (så att man kan "speeda på" långa animeringar) */
    paperDiv.addEventListener('click', function () {
      if (playing) {
        tNow = target;
        render(tNow);
        followPen(true);
        stop();
      } else {
        play();
      }
    });

    /* ---------------- helskärm (presentation för klass) ----------------
     * Kanonisk fullskärmsikon (samma som simuleringarnas fs-btn). Hela
     * widgeten fullskärmas; arket skalas om så att det ryms på skärmen. */
    var ICO_EXPAND = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"' +
      ' stroke="currentColor" stroke-width="2.2" stroke-linecap="round"' +
      ' stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/>' +
      '<path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
    var ICO_COMPRESS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"' +
      ' stroke="currentColor" stroke-width="2.2" stroke-linecap="round"' +
      ' stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 21v-6h6"/>' +
      '<path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
    var fsBtn = document.createElement('button');
    fsBtn.className = 'hk-fsbtn';
    fsBtn.title = 'Helskärm';
    fsBtn.setAttribute('aria-label', 'Helskärm');
    fsBtn.innerHTML = ICO_EXPAND;
    fsBtn.addEventListener('click', function (e) {
      e.stopPropagation();                 /* inte ett stegklick */
      if (document.fullscreenElement === wrap) document.exitFullscreen();
      else if (wrap.requestFullscreen) wrap.requestFullscreen();
    });
    paperDiv.appendChild(fsBtn);

    function fitFS() {
      var fs = document.fullscreenElement === wrap;
      fsBtn.innerHTML = fs ? ICO_COMPRESS : ICO_EXPAND;
      fsBtn.title = fs ? 'Lämna helskärm' : 'Helskärm';
      if (fs) {
        /* stor men inte gigantisk: fyll bredden upp till ett skaltak */
        var availW = window.innerWidth - 36;
        var sc = Math.min(availW / W, 1.35);
        svg.style.width = Math.round(W * sc) + 'px';
        svg.style.height = Math.round(H * sc) + 'px';
      } else {
        svg.style.width = '';
        svg.style.height = '';
      }
      followPen(true);
    }
    document.addEventListener('fullscreenchange', fitFS);
    window.addEventListener('resize', fitFS);

    /* håll pennan i sikte i helskärm — med DÖDZON så att vyn ligger
     * stilla medan handen skriver: rulla först när pennan närmar sig
     * skärmens under-/överkant, och glid då till ett fast mål (känns
     * som att man flyttar blicket, inte som sjögång) */
    var scrollTarget = null;
    /* manuell rullning vinner: släpp målet tills pennan lämnar dödzonen */
    wrap.addEventListener('wheel', function () { scrollTarget = null; },
      { passive: true });
    wrap.addEventListener('touchmove', function () { scrollTarget = null; },
      { passive: true });
    function followPen(instant) {
      if (document.fullscreenElement !== wrap) { scrollTarget = null; return; }
      var sc = svg.clientWidth / W;
      var pp = penPosAt(Math.min(tNow, TOTAL - 810));  /* ej slutglidningen */
      var py = pp.pos[1] * sc;
      var vh = window.innerHeight;
      var maxScroll = Math.max(0, wrap.scrollHeight - vh);
      function clampT(t) { return Math.max(0, Math.min(t, maxScroll)); }
      if (instant) {
        scrollTarget = clampT(py - 0.45 * vh);
        wrap.scrollTop = scrollTarget;
        return;
      }
      var onScreen = py - wrap.scrollTop;
      if (onScreen > 0.72 * vh || onScreen < 0.12 * vh) {
        scrollTarget = clampT(py - 0.40 * vh);
      }
      if (scrollTarget != null && Math.abs(scrollTarget - wrap.scrollTop) > 1) {
        wrap.scrollTop += (scrollTarget - wrap.scrollTop) * 0.08;
      }
    }

    render(0);
    updateBtns();
    if (opts.instant) jumpToEnd();
    else if (opts.at != null) { tNow = opts.at; render(tNow); updateBtns(); }
    else if (opts.autostart) play();

    return { play: play, pause: stop, restart: restart,
             setSpeed: function (v) { speed = v; },
             jumpToEnd: jumpToEnd, spela: play };
  }

  window.HANDSKRIFT = { mount: mount, version: 1 };
})();

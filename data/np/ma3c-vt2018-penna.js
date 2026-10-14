/* ma3c-vt2018-penna.js: pennlösningar till Nationellt prov Ma 3c, VT 2018.
 *
 * En scen per uppgift, registrerad som "ma3c-vt2018-u<nr>". Filen består av
 * tre självständiga block, ett per delprov (B: 1–11, C: 12–19, D: 20–28);
 * varje block har sitt eget filhuvud med de regler som gäller där.
 * Granskning: node .claude/verify-handskrift.js ma3c-vt2018-u1 …
 */

/* ma3c-vt2018-delB-penna.js: pennlösningar till Nationellt prov Ma 3c,
 * VT 2018, delprov B (uppgift 1–11).
 *
 * En scen per uppgift, registrerad som "ma3c-vt2018-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md: inget bläck vid
 * x > 696 eller x < 24, inget med x > 420 ovanför y = 150, en tanke per
 * led direkt före ledet, division alltid med vågrätt streck, bubblor som
 * hör till en figur läggs under figuren.
 *
 * Samma siffror som textlösningen i data/np/ma3c-vt2018-delB.js. Inget
 * delprov B-led är en ekvationsoperation på båda led, så ingen scen har
 * ekvval.
 *
 * Granskning: node .claude/verify-handskrift.js ma3c-vt2018-u1 …
 * Skärmdump:  .shots/np-penna-ma3c18B.html?ma3c-vt2018-u1
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, bigParen = V.bigParen, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma3c-vt2018-u' + nr, fn); }

  /* ================= gemensamma småhjälpare ================= */
  /* GRÄNSVÄRDESSYMBOL: "lim" med "h→0" litet under. Returnerar nästa x. */
  function limSym(T, F, x0, yb) {
    var x1 = T.str('lim', x0, yb);
    var w = T.adv('h→0', 0.5);
    T.str('h→0', x0 + (x1 - x0) / 2 - w / 2, yb + 0.62 * F, null, 0.5);
    return Math.max(x1, x0 + (x1 - x0) / 2 + w / 2) + 0.16 * F;
  }
  /* Var en del av en TÄLJARE hamnar när fracH(num, den, x0, yb) ritas:
   * [x-start, x-slut, täljarens baslinje]. prefix = det som står före
   * delen i täljaren (räknas som full sträng minus resten, så att
   * minusluften i adv inte förskjuter mätningen). */
  function numDel(T, F, num, den, x0, yb, prefix, del) {
    var nw = T.adv(num), dw = T.adv(den), w = Math.max(nw, dw) + 0.3 * F;
    var nx = x0 + (w - nw) / 2;
    var rest = num.slice(prefix.length);
    var a = nx + nw - T.adv(rest);
    var b = a + T.adv(del);
    return [a, b, yb - 0.48 * F];
  }
  /* REGELNOT (se REGEL i handskrift.js filhuvud) */
  function regelNot(T, F, text, x, yb) {
    var tmp = [], sc = 0.7;
    V.placeString(text, x, yb, (F / 100) * sc, F * sc, tmp, BLUE);
    var n = { pop: 1, wins: [],
              strokes: tmp.filter(function (a) { return a.kind === 'stroke'; }) };
    T.acts.push({ kind: 'show', obj: n });
    T.pause(520);
    return n;
  }
  function regelGom(T, n) {
    T.pause(320);
    T.acts.push({ kind: 'hide', obj: n });
    T.pause(200);
  }
  function punkt(T, p, col) {
    T.acts.push({ kind: 'stroke', pts: V.dotPts(p[0], p[1]), color: col || null });
  }
  /* STRECKAD LINJE: n segment varav vartannat ritas */
  function dashLine(T, p1, p2, n, col) {
    var i;
    for (i = 0; i < n; i += 2) {
      T.acts.push({ kind: 'stroke', color: col || null, pts: humanize(
        [[p1[0] + (p2[0] - p1[0]) * (i / n), p1[1] + (p2[1] - p1[1]) * (i / n)],
         [p1[0] + (p2[0] - p1[0]) * ((i + 1) / n),
          p1[1] + (p2[1] - p1[1]) * ((i + 1) / n)]]) });
    }
  }
  /* KURVA ur sin funktion, tätt samplad, i ett mkAxes-system */
  function kurva(T, ax, f, x0, x1, steg, col) {
    var pts = [], x;
    for (x = x0; x <= x1 + 1e-9; x += steg) pts.push([ax.X(x), ax.Y(f(x))]);
    T.acts.push({ kind: 'stroke', pts: pts, color: col || null });
  }
  /* CIRKEL ritad för hand */
  function cirkel(T, cx, cy, r, col) {
    var pts = [], i, a, n = 48;
    for (i = 0; i <= n; i++) {
      a = -Math.PI / 2 + (i / n) * 2 * Math.PI;
      pts.push([cx + Math.cos(a) * r + V.rnd(-0.6, 0.6),
                cy + Math.sin(a) * r + V.rnd(-0.6, 0.6)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts, color: col || null });
  }
  /* liten etikett centrerad i x */
  function lblC(T, F, s, xc, yb, col, sc) {
    sc = sc == null ? 0.62 : sc;
    return T.str(s, xc - T.adv(s, sc) / 2, yb, col || null, sc);
  }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 1: derivera två funktioner ---- */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('a) f(x)=x^4+5x^2-3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Potensregeln term för term:']],
      [['exponenten ned som faktor och']],
      [['en lägre exponent. Konstanten']],
      [['-3 har derivatan 0.']]
    ]);
    y += 2.6 * F;
    T.str('f’(x)=4x^3+5·2x-0', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('=4x^3+10x', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: f’(x)=4x^3+10x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    y += 3.0 * F;
    T.str('b) f(x)=8e^2^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['e^k^x har derivatan k·e^k^x.']],
      [['Här är k=2, och faktorn 8']],
      [['följer med.']]
    ]);
    y += 2.6 * F;
    T.str('f’(x)=8·2e^2^x=16e^2^x', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: f’(x)=16e^2^x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 2: vilken linje är tangent, vilken är sekant? ----
   * Fjärdegradsgrafen skissas ur samma funktion som uppgiftsfiguren
   * (två toppar, en dal) med linjerna A–E dragna med linjal. Tangenten B
   * och sekanten A markeras i blått, med punkterna där de möter grafen. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var U = 60, OX = padL + 50, OY = 410;
    function X(x) { return OX + x * U; }
    function Y(v) { return OY - v * U; }
    var m = 3.42, w2 = 1.38 * 1.38, a = 0.408, M = 2.59;
    function f(x) { return M - a * Math.pow((x - m) * (x - m) - w2, 2); }
    function df(x) { return -4 * a * (x - m) * ((x - m) * (x - m) - w2); }
    function bis(g, lo, hi) {
      var i, mid;
      for (i = 0; i < 60; i++) {
        mid = (lo + hi) / 2;
        if ((g(lo) < 0) === (g(mid) < 0)) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
    function lA(x) { return 0.094 * x + 0.32; }
    function lC(x) { return 0.135 * x + 2.70; }
    var x0B = bis(function (x) { return df(x) + 0.5; }, m + 1.39, m + 1.9);
    function lB(x) { return f(x0B) - 0.5 * (x - x0B); }
    var xE = m, xD = 5.23, xS = -0.5, xT = 6.1;
    function rule(p1, p2, col) {
      acts.push({ kind: 'stroke', color: col || null,
                  pts: [p1, [(p1[0] + p2[0]) / 2 + V.rnd(-0.5, 0.5),
                             (p1[1] + p2[1]) / 2 + V.rnd(-0.5, 0.5)], p2] });
    }
    var FIGB_Y = 470;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axlarna, grafen och de fem linjerna */
    T.line([X(-0.4), OY], [X(6.4), OY]);
    T.line([X(6.4) - 9, OY - 5], [X(6.4) + 1, OY]);
    T.line([X(6.4) - 9, OY + 5], [X(6.4) + 1, OY]);
    T.line([X(0), OY + 14], [X(0), Y(3.6)]);
    T.line([X(0) - 5, Y(3.6) + 9], [X(0), Y(3.6) - 1]);
    T.line([X(0) + 5, Y(3.6) + 9], [X(0), Y(3.6) - 1]);
    T.str('x', X(6.4) - 6, OY + 26, null, 0.6);
    T.str('y', X(0) - 20, Y(3.6) + 6, null, 0.6);
    T.pause(150);
    var pts = [], x;
    for (x = 1.28; x <= 5.56; x += 0.04) pts.push([X(x), Y(f(x))]);
    acts.push({ kind: 'stroke', pts: pts });
    T.pause(150);
    rule([X(xS), Y(lC(xS))], [X(xT), Y(lC(xT))]);
    T.str('C', X(xT) + 6, Y(lC(xT)) + 6, null, 0.6);
    rule([X(1.9), Y(lB(1.9))], [X(xT), Y(lB(xT))]);
    T.str('B', X(xT) + 6, Y(lB(xT)) + 6, null, 0.6);
    rule([X(xS), Y(lA(xS))], [X(xT), Y(lA(xT))]);
    T.str('A', X(xT) + 6, Y(lA(xT)) + 6, null, 0.6);
    rule([X(xE), OY + 14], [X(xE), Y(3.55)]);
    lblC(T, F, 'E', X(xE), Y(3.55) - 8, null, 0.6);
    rule([X(xD), OY + 14], [X(xD), Y(3.55)]);
    lblC(T, F, 'D', X(xD), Y(3.55) - 8, null, 0.6);
    T.stepEnd();

    /* ---- a) ---- */
    figurBubble(268, [
      [['En tangent snuddar grafen i en']],
      [['punkt och har där samma lutning']],
      [['som grafen. Det gör B, strax till']],
      [['höger om den högra toppen.']]
    ]);
    rule([X(1.9), Y(lB(1.9))], [X(xT), Y(lB(xT))], BLUE);
    T.pause(150);
    punkt(T, [X(x0B), Y(f(x0B))], BLUE);
    y = 500;
    T.str('a) B snuddar grafen i en punkt', padL, y);
    T.stepEnd();

    tanke(y, [
      [['C når aldrig grafen, A skär rakt']],
      [['igenom den och D och E är lodräta.']],
      [['Bara B snuddar.']]
    ]);
    y += 2.3 * F;
    xe = T.str('Svar: B', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['En sekant går genom två punkter']],
      [['på grafen. A skär grafen två']],
      [['gånger.']]
    ]);
    rule([X(xS), Y(lA(xS))], [X(xT), Y(lA(xT))], BLUE);
    T.pause(150);
    var s1 = bis(function (x) { return f(x) - lA(x); }, 1.0, 2.0);
    var s2 = bis(function (x) { return f(x) - lA(x); }, 5.0, 5.8);
    punkt(T, [X(s1), Y(lA(s1))], BLUE);
    T.pause(120);
    punkt(T, [X(s2), Y(lA(s2))], BLUE);
    y += 3.0 * F;
    T.str('b) A skär grafen i två punkter', padL, y);
    T.stepEnd();

    tanke(y, [
      [['D och E är lodräta och träffar']],
      [['grafen i bara en punkt var, så de']],
      [['är inga sekanter.']]
    ]);
    y += 2.3 * F;
    xe = T.str('Svar: A', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 3: bilens hastighet ----
   * Hastigheten är sträckans derivata. t i derivatan ringas in innan 3
   * sätts in (REGEL INSÄTTNING). */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('s(t)=0,75t^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Hastigheten är hur snabbt']],
      [['sträckan ändras, alltså']],
      [['derivatan s’(t).']]
    ]);
    y += 2.6 * F;
    xx = T.str('s’(t)=0,75·2t=1,5', padL, y);
    var t0 = xx, t1 = T.str('t', xx, y), yT = y;
    T.stepEnd();

    tanke(y, [
      [['Hastigheten vid tiden 3 s:']],
      [['jag sätter in t=3.']]
    ]);
    var ringar = substRings(acts, [[t0, t1, yT, F]]);
    y += 2.4 * F;
    T.str('s’(3)=1,5·3=4,5', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: 4,5 m/s är ungefär']],
      [['16 km/h efter tre sekunder']],
      [['från stillastående.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 4,5 m/s', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: vilka vinklar har cos v = −0,5? ----
   * Enhetscirkeln ritas; linjen x = −0,5 (blå, streckad) skär cirkeln i
   * två punkter, vid 120° och 240°. */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var CX = 230, CY = 300, R = 110;
    var FIGB_Y = 474;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }
    function P(v) { var r = v * Math.PI / 180; return [CX + R * Math.cos(r), CY - R * Math.sin(r)]; }

    /* steg 1: enhetscirkeln */
    T.line([CX - R - 30, CY], [CX + R + 34, CY]);
    T.line([CX + R + 25, CY - 5], [CX + R + 35, CY]);
    T.line([CX + R + 25, CY + 5], [CX + R + 35, CY]);
    T.line([CX, CY + R + 22], [CX, CY - R - 34]);
    T.line([CX - 5, CY - R - 25], [CX, CY - R - 35]);
    T.line([CX + 5, CY - R - 25], [CX, CY - R - 35]);
    T.str('x', CX + R + 26, CY + 24, null, 0.6);
    T.str('y', CX - 22, CY - R - 24, null, 0.6);
    T.pause(150);
    cirkel(T, CX, CY, R);
    T.line([CX + R, CY - 4], [CX + R, CY + 4]);
    T.str('1', CX + R + 5, CY + 20, null, 0.5);
    T.line([CX - R / 2, CY - 4], [CX - R / 2, CY + 4]);
    T.stepEnd();

    /* steg: linjen x = −0,5 */
    figurBubble(268, [
      [['cos v=-0,5 betyder att punkten']],
      [['på cirkeln har x=-0,5. Den']],
      [['lodräta linjen x=-0,5 skär']],
      [['cirkeln i två punkter.']]
    ]);
    dashLine(T, [CX - R / 2, CY - R - 10], [CX - R / 2, CY + R + 10], 15, BLUE);
    T.pause(150);
    /* linjens ekvation vid dess övre ände, utanför cirkeln */
    T.str('x=-0,5', CX - R / 2 - 8 - T.adv('x=-0,5', 0.5), CY - R - 8, BLUE, 0.5);
    y = 600;
    T.str('cos v=-0,5 ger x=-0,5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['cos 60°=0,5. Punkten ovanför']],
      [['x-axeln ligger 60° från den']],
      [['negativa x-axeln: 180°-60°=120°.']]
    ]);
    T.line([CX, CY], P(120), BLUE);
    punkt(T, P(120), BLUE);
    T.str('120°', CX + 12, CY - 30, BLUE, 0.5);
    y += 2.6 * F;
    T.str('v=120°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Punkten nedanför är spegelbilden']],
      [['i x-axeln: 360°-120°=240°.']]
    ]);
    T.line([CX, CY], P(240), BLUE);
    punkt(T, P(240), BLUE);
    /* inne i vinkelns svep, mellan cirkeln och den streckade linjen */
    T.str('240°', CX - R / 2 - 5 - T.adv('240°', 0.45), CY + 30, BLUE, 0.45);
    y += 2.3 * F;
    T.str('v=240°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I figur A pekar benet till']],
      [['120° och i figur D till 240°.']]
    ]);
    y += 2.4 * F;
    T.str('A: v=120°   D: v=240°', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: A och D', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: derivatans definition ----
   * a) kvadraten utvecklas på plats (regelnot), 16 och −16 ringas in och
   * tar ut varandra, h bryts ut och förkortas, h går mot noll.
   * b) definitionen jämförs del för del med Elviras uttryck (ringar). */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 200;
    xx = T.str('a) f’(4)=', padL, y);
    xx = limSym(T, F, xx, y);
    var x1 = xx, y1 = y, n1 = '(4+h)^2-4^2';
    T.fracH(n1, 'h', xx, y);
    T.stepEnd();

    tanke(y, [
      [['h=0 går inte att sätta in direkt,']],
      [['då blir nämnaren noll. Först']],
      [['utvecklar jag kvadraten.']]
    ], 1.05);
    y += 4.0 * F;
    var nQ = regelNot(T, F, 'Kvadreringsregeln: (a+b)^2=a^2+2ab+b^2', padL, y - 1.9 * F);
    xx = T.str('=', padL + 30, y);
    xx = limSym(T, F, xx, y);
    var x2 = xx, y2 = y, n2 = '16+8h+h^2-16';
    T.fracH(n2, 'h', xx, y);
    regelGom(T, nQ);
    T.stepEnd();

    tanke(y, [
      [['16 och -16 tar ut varandra.']]
    ], 1.05);
    var ra = T.ring.apply(null, numDel(T, F, n2, 'h', x2, y2, '', '16'));
    T.pause(260);
    var rb = T.ring.apply(null, numDel(T, F, n2, 'h', x2, y2, '16+8h+h^2', '-16'));
    T.pause(220);
    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = limSym(T, F, xx, y);
    T.fracH('8h+h^2', 'h', xx, y);
    T.pause(240);
    T.fade(ra); T.fade(rb);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna i täljaren har h.']],
      [['Jag bryter ut h, och då kan h']],
      [['förkortas mot nämnaren.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = limSym(T, F, xx, y);
    xx = T.fracH('h(8+h)', 'h', xx, y);
    T.stepEnd();

    xx = T.str('=', xx, y);
    xx = limSym(T, F, xx, y);
    T.str('(8+h)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu finns inget h i någon nämnare.']],
      [['h får gå mot noll.']]
    ], 0.8);
    y += 2.8 * F;
    T.str('f’(4)=8+0=8', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: f’(4)=8', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Derivatans definition i x=4.']],
      [['Jag jämför den del för del med']],
      [['Elviras uttryck.']]
    ]);
    y += 3.8 * F;
    xx = T.str('b) f’(4)=', padL, y);
    xx = limSym(T, F, xx, y);
    var x3 = xx, y3 = y, n3 = 'f(4+h)-f(4)';
    T.fracH(n3, 'h', xx, y);
    T.stepEnd();

    r = [T.ring.apply(null, numDel(T, F, n3, 'h', x3, y3, '', 'f(4+h)'))];
    T.pause(260);
    r.push(T.ring.apply(null, numDel(T, F, n1, 'h', x1, y1, '', '(4+h)^2')));
    T.pause(220);
    y += 2.6 * F;
    T.str('f(4+h)=(4+h)^2', padL, y);
    T.pause(240);
    r.forEach(function (st) { T.fade(st); });
    T.stepEnd();

    r = [T.ring.apply(null, numDel(T, F, n3, 'h', x3, y3, 'f(4+h)', '-f(4)'))];
    T.pause(260);
    r.push(T.ring.apply(null, numDel(T, F, n1, 'h', x1, y1, '(4+h)^2', '-4^2')));
    T.pause(220);
    y += 2.3 * F;
    T.str('f(4)=4^2', padL, y);
    T.pause(240);
    r.forEach(function (st) { T.fade(st); });
    T.stepEnd();

    tanke(y, [
      [['Funktionen kvadrerar det tal som']],
      [['sätts in. Kontroll: f’(x)=2x ger']],
      [['f’(4)=8, samma som i a).']]
    ]);
    y += 2.6 * F;
    T.str('f(x)=x^2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: f(x)=x^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: ett uttryck som inte är definierat för x = 7 och x = −5 ---- */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 180;
    T.str('Odefinierat för x=7 och x=-5', padL, y, null, 0.75);
    T.stepEnd();

    tanke(y, [
      [['Division med noll är inte']],
      [['definierad. Nämnaren ska bli']],
      [['noll för båda x-värdena.']]
    ]);
    y += 2.6 * F;
    T.str('x=7 ger x-7=0', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('x=-5 ger x+5=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Båda faktorerna i nämnaren.']],
      [['Täljaren väljer jag så enkel']],
      [['som möjligt: 1.']]
    ]);
    y += 3.4 * F;
    T.fracH('1', '(x+5)(x-7)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: jag sätter in x=7']],
      [['och x=-5 i nämnaren.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('x=7: 12·0=0', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('x=-5: 0·(-12)=0', padL, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('Svar: Till exempel ', padL, y);
    xe = T.fracH('1', '(x+5)(x-7)', xx, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 7: förenkla ----
   * a) 3 bryts ut och x + 6 förkortas bort. b) gemensam nämnare a²,
   * kvadreringsregeln baklänges, exponenten 1/2 blir en rot, roten och
   * kvadraten tar ut varandra (a > 0), a förkortas bort. */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    /* exponenten 1/2 efter en stor parentes */
    function halv(x, yb) { return V.expFrac(T, F, '1', '2', x, yb - 0.72 * F); }
    function parenRad(prefix, inner, yb, gap) {
      var x = T.str(prefix, padL + 30, yb);
      x = bigParen(T, F, x + 0.14 * F, yb, false);
      x = inner(x + 0.06 * F);
      x = bigParen(T, F, x + (gap || 0.10) * F, yb, true);
      return halv(x + 0.04 * F, yb);
    }

    /* ---- a) ---- */
    y = 150;
    xx = T.str('a) ', padL, y);
    T.fracH('3x+18', 'x+6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna i täljaren är']],
      [['delbara med 3. Jag bryter ut 3.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('3(x+6)', 'x+6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x+6 står i både täljare och']],
      [['nämnare och förkortas bort.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('=3', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += 4.0 * F;
    xx = T.str('b) a·', padL, y);
    xx = bigParen(T, F, xx + 0.14 * F, y, false);
    xx = T.str('1+', xx + 0.06 * F, y);
    xx = T.fracH('2', 'a', xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('1', 'a^2', xx, y);
    xx = bigParen(T, F, xx + 0.10 * F, y, true);
    halv(xx + 0.04 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Inne i parentesen skriver jag allt']],
      [['på gemensam nämnare a^2.']]
    ], 1.4);
    y += 4.2 * F;
    parenRad('=a·', function (x) {
      x = T.fracH('a^2', 'a^2', x, y);
      x = T.str('+', x, y);
      x = T.fracH('2a', 'a^2', x, y);
      x = T.str('+', x, y);
      return T.fracH('1', 'a^2', x, y);
    }, y);
    T.stepEnd();

    tanke(y, [
      [['Samma nämnare: täljarna skrivs']],
      [['på ett gemensamt bråkstreck.']]
    ], 1.4);
    y += 4.2 * F;
    parenRad('=a·', function (x) { return T.fracH('a^2+2a+1', 'a^2', x, y); }, y);
    T.stepEnd();

    tanke(y, [
      [['Täljaren är kvadreringsregeln']],
      [['baklänges.']]
    ], 1.4);
    y += 4.2 * F;
    var nQ = regelNot(T, F, 'Kvadreringsregeln: (a+1)^2=a^2+2a+1', padL, y - 1.9 * F);
    parenRad('=a·', function (x) { return T.fracH('(a+1)^2', 'a^2', x, y); }, y);
    regelGom(T, nQ);
    T.stepEnd();

    tanke(y, [
      [['Både täljare och nämnare är']],
      [['kvadrater. Då är hela bråket en']],
      [['kvadrat.']]
    ], 1.4);
    y += 4.2 * F;
    parenRad('=a·', function (x) { return T.parenFrac('a+1', 'a', '2', x, y); }, y, 0.32);
    T.stepEnd();

    tanke(y, [
      [['Att upphöja till 1/2 är detsamma']],
      [['som att ta kvadratroten.']]
    ], 1.4);
    y += 4.4 * F;
    xx = T.str('=a·', padL + 30, y);
    var cw = T.parenFracW('a+1', 'a', '2');
    var xs = V.rootSign(T.acts, xx + 0.14 * F, y, cw, F,
                        { yTop: y - 2.08 * F, yBot: y + 1.12 * F });
    T.parenFrac('a+1', 'a', '2', xs + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['a>0, så (a+1)/a är positivt.']],
      [['Roten och kvadraten tar då ut']],
      [['varandra.']]
    ], 1.4);
    y += 4.0 * F;
    xx = T.str('=a·', padL + 30, y);
    T.fracH('a+1', 'a', xx + 0.10 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Faktorn a och nämnaren a tar']],
      [['ut varandra.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('=a+1', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: a+1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 8: tangenten y = 2x − 1 i x = 3 ---- */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.str('Tangent: y=', padL, y);
    var k0 = xx, k1 = T.str('2', xx, y);
    var vx0 = k1, vx1 = T.str('x', k1, y), yT = y;
    T.str('-1', vx1, y);
    T.stepEnd();

    y += 2.2 * F;
    xx = T.str('x=', padL, y);
    var v0 = xx, v1 = T.str('3', xx, y), yV = y;
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['Tangeringspunkten ligger på']],
      [['tangenten. Jag sätter in x=3 i']],
      [['tangentens ekvation.']]
    ]);
    r = substRings(acts, [[v0, v1, yV, F], [vx0, vx1, yT, F]]);
    y += 2.6 * F;
    T.str('a) y=2·3-1=5', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: (3, 5)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['g’(3) är grafens lutning i x=3,']],
      [['samma som tangentens lutning k.']]
    ]);
    r = substRings(acts, [[k0, k1, yT, F]]);
    y += 2.6 * F;
    T.str('b) g’(3)=k=2', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: g’(3)=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: för vilka x är f''(x) ≤ 0? ----
   * Grafen skissas ur f(x) = (4/9)(x³/3 + x² − 3x) (samma som
   * uppgiftsfiguren: max i (−3, 4), min i x = 1). Extrempunkterna ger
   * derivatans nollställen, symmetrilinjen x = −1 ger vändningen, och
   * den konkava delen x ≤ −1 ritas om i blått. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var k = 4 / 9;
    function f(x) { return k * (x * x * x / 3 + x * x - 3 * x); }
    var ax = mkAxes(T, F, { ox: 250, oy: 300, u: 22,
                            xmin: -5, xmax: 4, ymin: -4, ymax: 5 });
    var FIGB_Y = 452;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axlar och graf */
    ax.axes();
    ax.ticks([-5, -4, -3, -2, -1, 1, 2, 3, 4], [-4, -3, -2, -1, 1, 2, 3, 4, 5],
             [1], [1]);
    T.pause(150);
    kurva(T, ax, f, -5.3, 3.35, 0.05);
    T.stepEnd();

    /* steg 2: extrempunkterna */
    figurBubble(268, [
      [['Grafen har en maximipunkt där']],
      [['x=-3 och en minimipunkt där']],
      [['x=1. Där är lutningen noll.']]
    ]);
    ax.dot(-3, 4, BLUE);
    T.pause(120);
    ax.dot(1, f(1), BLUE);
    y = 540;
    T.str('f’(-3)=0 och f’(1)=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['f är av grad 3, så f’ är av grad 2:']],
      [['en parabel med nollställena -3']],
      [['och 1 som öppnar sig uppåt.']]
    ]);
    y += 3.4 * F;
    xx = T.str('Symmetrilinje: x=', padL, y);
    xx = T.fracH('-3+1', '2', xx, y);
    T.str('=-1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Till vänster om x=-1 sjunker']],
      [['parabeln: f’ minskar och f’’≤0.']],
      [['Där är grafen konkav.']]
    ], 1.05);
    kurva(T, ax, f, -5.3, -1, 0.05, BLUE);
    T.pause(150);
    ax.dot(-1, f(-1), BLUE);
    y += 3.4 * F;
    T.str('f’’(x)≤0 då x≤-1', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: x≤-1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 10: största möjliga värde ----
   * Från den kända punkten (6, 3) undersöks hur högt grafen kan nå åt
   * höger (lutning högst 1) och åt vänster (lutning minst −2). */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(6)=3', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('-2≤f’(x)≤1 för 0≤x≤10', padL, y);
    T.stepEnd();

    tanke(y, [
      [['f’(x) är lutningen. Åt höger']],
      [['stiger grafen högst 1 per steg.']],
      [['Från x=6 till x=10 är det 4 steg.']]
    ]);
    y += 2.6 * F;
    T.str('f(10)≤3+4·1=7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Grafen sjunker högst 2 per steg åt']],
      [['höger. Baklänges, åt vänster, kan']],
      [['den alltså ligga högst 2 högre per']],
      [['steg. Från x=6 till x=0: 6 steg.']]
    ]);
    y += 2.6 * F;
    T.str('f(0)≤3+6·2=15', padL, y);
    T.stepEnd();

    tanke(y, [
      [['15 är större än 7. Värdet nås om']],
      [['grafen är linjen y=15-2x mellan']],
      [['x=0 och x=6.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 15', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 11: punkten P med lodrät tangent ----
   * Medelpunkt och radie läses ur ekvationen. Tangenten är vinkelrät mot
   * radien, så en lodrät tangent ger en vågrät radie: P ligger på höjden
   * y = 2, en radie till höger om medelpunkten. */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);
    var U = 38, OX = 300, OY = 380;
    function X(x) { return OX + x * U; }
    function Y(v) { return OY - v * U; }
    var R = Math.sqrt(8);
    var FIGB_Y = 472;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: ekvationen */
    y = 118;
    T.str('(x+2)^2+(y-2)^2=8', padL, y);
    T.stepEnd();

    /* steg 2: figuren */
    T.line([X(-5.3), OY], [X(2.3), OY]);
    T.line([X(2.3) - 9, OY - 5], [X(2.3) + 1, OY]);
    T.line([X(2.3) - 9, OY + 5], [X(2.3) + 1, OY]);
    T.line([X(0), OY + 30], [X(0), Y(5.4)]);
    T.line([X(0) - 5, Y(5.4) + 9], [X(0), Y(5.4) - 1]);
    T.line([X(0) + 5, Y(5.4) + 9], [X(0), Y(5.4) - 1]);
    T.str('x', X(2.3) - 6, OY + 26, null, 0.6);
    T.str('y', X(0) - 20, Y(5.4) + 6, null, 0.6);
    T.pause(150);
    cirkel(T, X(-2), Y(2), R * U);
    punkt(T, [X(-2 + R), Y(2)]);
    T.str('P', X(-2 + R) + 10, Y(2) + 22, null, 0.6);
    T.stepEnd();

    /* steg 3: medelpunkt och radie */
    figurBubble(268, [
      [['Ekvationen säger att avståndet']],
      [['till (-2, 2) är √8 för varje punkt']],
      [['på cirkeln (avståndsformeln).']]
    ]);
    punkt(T, [X(-2), Y(2)], BLUE);
    T.str('(-2, 2)', X(-2) - 40, Y(2) - 12, BLUE, 0.5);
    y = 560;
    T.str('Medelpunkt (-2, 2), r=', padL, y);
    xx = T.adv('Medelpunkt (-2, 2), r=') + padL;
    T.rot('8', xx + 0.08 * F, y);
    T.stepEnd();

    /* steg 4: vågrät radie, lodrät tangent */
    tanke(y, [
      [['Tangenten är vinkelrät mot']],
      [['radien. Lodrät tangent ger vågrät']],
      [['radie: P på höjden y=2, en radie']],
      [['till höger om medelpunkten.']]
    ]);
    T.line([X(-2), Y(2)], [X(-2 + R), Y(2)], BLUE);
    T.pause(150);
    dashLine(T, [X(-2 + R), Y(0.6)], [X(-2 + R), Y(3.4)], 11, BLUE);
    T.pause(150);
    y += 2.6 * F;
    xx = T.str('x=-2+', padL, y);
    T.rot('8', xx + 0.08 * F, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('y=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: jag sätter in punkten']],
      [['i cirkelns ekvation.']]
    ]);
    y += 2.6 * F;
    xx = T.str('(', padL, y);
    xx = T.rot('8', xx + 0.12 * F, y);
    xx = T.str(')^2+0^2=8', xx + 0.12 * F, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('Svar: P=(', padL, y);
    xx = T.rot('8', xx + 0.12 * F, y);
    xe = T.str('-2, 2)', xx + 0.12 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });
})();

/* ma3c-vt2018-delC-penna.js — pennlösningar till Nationellt prov Ma 3c,
 * VT 2018, delprov C (uppgift 12–19).
 *
 * En scen per uppgift, registrerad som "ma3c-vt2018-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de som oftast
 * bränner: inget bläck vid x > 696 eller x < 24, inget med x > 420 ovanför
 * y = 150 (y = 210 i ekvval-scener), en tanke per led direkt före ledet,
 * division alltid med vågrätt streck, och samma antal klicksteg i båda
 * ekvationsredovisningarna (cfg.vagg + mkEkvOp + ekvval: 1).
 *
 * Samma siffror och samma avrundning som textlösningen i
 * data/np/ma3c-vt2018-delC.js — eleven växlar mellan vyerna.
 *
 * Granskning: node .claude/verify-handskrift.js ma3c-vt2018-u12 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkEkvOp = V.mkEkvOp,
      substRings = V.substRings, fadeRings = V.fadeRings, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma3c-vt2018-u' + nr, fn); }

  /* PLUS-MINUS med luft på båda sidor ('±' är ingen OPS-glyf). */
  function pm(T, F, x, yb) { return T.str('±', x + 0.12 * F, yb) + 0.12 * F; }
  /* LITEN GRÅ RUBRIK över en rad (redovisning, står kvar utan tankar). */
  function rubrik(T, F, s, yb) { T.str(s, T.padL, yb - 1.55 * F, null, 0.62); }
  /* e upphöjt till ett bråk (e^(x/4), e^(π/3)): basen och sedan bråket i
   * exponentstorlek med rakt bråkstreck. Returnerar nästa x. */
  function ePot(T, F, x0, yb, num, den, col) {
    var x = T.str('e', x0, yb, col);
    return T.fracSup(num, den, x + 0.04 * F, yb, col) + 0.08 * F;
  }

  /* e^(x/4) DELAT MED 1/4: ett bråk där täljaren är potensen och nämnaren
   * ett eget litet bråk. Bråkstreck vågrätt, nämnaren sänkt så att dess
   * bråk inte når upp i huvudstrecket. Returnerar nästa x. */
  function eDelatKvart(T, F, x0, yb) {
    var ybar = yb - 0.34 * F;
    var nw = T.adv('e') + 0.04 * F + T.fracSupW('x', '4') + 0.08 * F;
    var dw = T.fracW('1', '4');
    var w = Math.max(nw, dw) + 0.4 * F;
    ePot(T, F, x0 + (w - nw) / 2, ybar - 0.22 * F, 'x', '4');
    T.pause(130);
    T.line([x0, ybar], [x0 + w, ybar]);
    T.pause(130);
    T.fracH('1', '4', x0 + (w - dw) / 2, ybar + 1.55 * F);
    return x0 + w + 1.5;
  }

  /* ---- Uppgift 12: integralen av 4x^3 från 1 till 2 ---- */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 122;
    T.str('∫_1^2 4x^3 dx', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Först en primitiv funktion:']],
      [['exponenten ökar med ett, och']],
      [['termen divideras med den nya']],
      [['exponenten.']]
    ]);
    y += 4.2 * F;
    rubrik(T, F, 'Primitiv funktion', y - 0.7 * F);
    xx = T.str('F(x)=', padL, y);
    xx = T.fracH('4x^4', '4', xx, y);
    T.str('=x^4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Insättningsformeln: den primitiva']],
      [['funktionen i övre gränsen minus']],
      [['den i undre.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('∫_1^2 4x^3 dx=[x^4]_1^2', padL + 24, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=2^4-1^4', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=16-1=15', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 15', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 13: f''(3) då f(x) = 0,5x^4 ----
   * Derivera två gånger, och sätt in 3 först i andraderivatan. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 122;
    T.str('f(x)=0,5x^4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Andraderivatan är derivatan av']],
      [['derivatan. Först en gång:']],
      [['exponenten 4 kommer ned som']],
      [['faktor och minskar med ett.']]
    ]);
    y += 2.8 * F;
    T.str('f’(x)=0,5·4x^3=2x^3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Samma regel en gång till på']],
      [['2x^3: 2·3=6 och exponenten']],
      [['blir 2.']]
    ]);
    y += 2.8 * F;
    T.str('f’’(x)=2·3x^2=6x^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Först nu sätter jag in x=3,']],
      [['i andraderivatan. Potensen']],
      [['räknas före multiplikationen.']]
    ]);
    y += 2.8 * F;
    T.str('f’’(3)=6·3^2=6·9=54', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: f’’(3)=54', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: har |−4x| = −8 någon lösning? ----
   * Ett absolutbelopp är ett avstånd och kan aldrig vara negativt. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 150;
    T.str('|−4x|=-8', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Absolutbeloppet är talets']],
      [['avstånd till noll på tallinjen,']],
      [['och ett avstånd är aldrig']],
      [['negativt.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Ett absolutbelopp är aldrig negativt', y);
    T.str('|−4x|≥0 för alla x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Högerledet är det negativa']],
      [['talet -8. Vänsterledet kan alltså']],
      [['aldrig bli lika med högerledet.']]
    ]);
    y += 2.8 * F;
    T.str('|−4x|≥0>-8', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Ekvationen saknar lösning.', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: Ja, Anna har rätt', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 15: prishöjningen som ger störst dagsinkomst ----
   * Derivatans nollställen, x ≥ 0 stryker −5, andraderivatan bekräftar
   * maximum. EKVVAL-scen: "+3x²" och "/3" i båda led eller på väggen. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('75-3x^2=0') + 0.9 * F;

    /* raden är bred: den läggs under mobilzonen (x>420, y<210) */
    y = 242;
    T.str('f(x)=3 000+75x-x^3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Största inkomsten finns i en']],
      [['topp, och där är tangenten']],
      [['vågrät. Jag deriverar term för']],
      [['term.']]
    ]);
    y += 2.8 * F;
    T.str('f’(x)=75-3x^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I toppen är derivatan noll.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Söker derivatans nollställen', y);
    T.str('75-3x^2=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 3x^2 till båda led,']],
      [['så blir x^2-termen ensam.']]
    ]);
    y = ekvOp(y, '+3x^2', xw, '75-3x^2=0');
    T.str('75=3x^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x^2 multipliceras med 3, så jag']],
      [['dividerar båda led med 3.']]
    ]);
    y = ekvOp(y, '/3', xw, '75=3x^2');
    T.str('25=x^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led. Både 5 och']],
      [['-5 har kvadraten 25.']]
    ]);
    y += 2.8 * F;
    xx = T.str('x=±', padL + 30, y);
    T.rot('25', xx + 0.3 * F, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('x=±5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x är en prishöjning, och x≥0']],
      [['enligt uppgiften. -5 stryks.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'x≥0 enligt uppgiften', y);
    T.str('x=5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Är det verkligen en topp?']],
      [['Andraderivatan avgör: negativ']],
      [['betyder att grafen böjer nedåt.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Visar att x=5 ger ett maximum', y);
    T.str('f’’(x)=-6x', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('f’’(5)=-6·5=-30<0 ⟹ max', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Före x=5 är f’(x)>0 och efter']],
      [['är f’(x)<0. Inkomsten växer och']],
      [['avtar sedan, så toppen är störst.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Dagsinkomsten vid x=5', y);
    T.str('f(5)=3 000+75·5-5^3', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=3 000+375-125=3 250', padL + 70, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 5 kr/kg', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 16: vilket är minst, ln(π/3) eller e^(π/3)? ----
   * π/3 är nästan 1, så talen jämförs med ln 1 = 0 och e^1 = e. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 132;
    xx = T.str('ln', padL, y);
    xx = T.parenFrac('π', '3', null, xx + 0.06 * F, y);
    xx = T.str(' och ', xx, y);
    ePot(T, F, xx, y, 'π', '3');
    T.stepEnd();

    tanke(y, [
      [['π är ungefär 3,14. Då är π']],
      [['delat med 3 bara en aning']],
      [['större än 1.']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.fracH('π', '3', padL, y);
    xx = T.str('≈', xx, y);
    xx = T.fracH('3,14', '3', xx, y);
    T.str('≈1,05≈1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['ln 1 är 0, eftersom e^0=1.']],
      [['ln av ett tal nära 1 är alltså']],
      [['nära 0.']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.str('ln', padL, y);
    xx = T.parenFrac('π', '3', null, xx + 0.06 * F, y);
    T.str('≈ln 1=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Med exponenten nära 1 blir']],
      [['potensen nära e^1, alltså e.']]
    ], 1.1);
    y += 3.6 * F;
    xx = ePot(T, F, padL, y, 'π', '3');
    T.str('≈e^1=e≈2,72', xx, y);
    T.stepEnd();

    tanke(y, [
      [['π/3 är mindre än e, och ln växer,']],
      [['så ln(π/3) är mindre än ln e=1.']],
      [['π/3 är större än 1, så e^(π/3) är']],
      [['större än e, som är större än 2.']]
    ]);
    y += 3.8 * F;
    rubrik(T, F, 'Jämför talen', y - 0.6 * F);
    xx = T.str('ln', padL, y);
    xx = T.parenFrac('π', '3', null, xx + 0.06 * F, y);
    xx = T.str('<1<2<', xx, y);
    ePot(T, F, xx, y, 'π', '3');
    T.stepEnd();

    y += 3.6 * F;
    xe = T.str('Svar: Talet ln', padL, y);
    xe = T.parenFrac('π', '3', null, xe + 0.06 * F, y);
    xe = T.str(' är minst', xe, y);
    T.underline(xe, y + 1.1 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 2.0 * F, padL: padL };
  });

  /* ---- Uppgift 17: primitiv funktion med villkoret F(4) = 4e + 6 ----
   * e^(x/4) = e^(x·1/4) ger faktorn 4 framför. Villkoret bestämmer C.
   * EKVVAL-scen: "−4e" och "−8" i båda led eller på väggen. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('4e+8+C=4e+6') + 0.9 * F;

    y = 132;
    xx = T.str('f(x)=', padL, y);
    xx = ePot(T, F, xx, y, 'x', '4');
    T.str('+x', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('F(4)=4e+6', padL, y);
    var yV = y;
    T.stepEnd();

    tanke(y, [
      [['x delat med 4 är x gånger 1/4,']],
      [['så k är 1/4. Den primitiva']],
      [['funktionen till e^k^x är e^k^x']],
      [['delat med k.']]
    ]);
    y += 5.6 * F;
    rubrik(T, F, 'Primitiv funktion, e^k^x ger e^k^x delat med k', y - 1.2 * F);
    xx = T.str('F(x)=', padL, y);
    xx = eDelatKvart(T, F, xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('x^2', '2', xx, y);
    T.str('+C', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Att dividera med 1/4 är att']],
      [['multiplicera med 4.']]
    ], 1.9);
    y += 4.2 * F;
    xx = T.str('F(x)=4', padL, y);
    xx = ePot(T, F, xx, y, 'x', '4');
    xx = T.str('+', xx, y);
    xx = T.fracH('x^2', '2', xx, y);
    var xF1 = T.str('+C', xx, y);
    var yF = y;
    T.stepEnd();

    tanke(y, [
      [['Villkoret säger vilken primitiv']],
      [['funktion som avses: x=4 ska ge']],
      [['värdet 4e+6.']]
    ], 1.05);
    var ringar = substRings(acts, [[padL + T.adv('F('), padL + T.adv('F(4'), yV, F],
                                   [padL + T.adv('F(x)='), xF1, yF, F]]);
    y += 3.8 * F;
    xx = T.str('F(4)=4', padL, y);
    xx = ePot(T, F, xx, y, '4', '4');
    xx = T.str('+', xx, y);
    xx = T.fracH('4^2', '2', xx, y);
    T.str('+C', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['4/4=1, så potensen blir e^1=e.']],
      [['Och 4^2=16, delat med 2 är 8.']]
    ], 1.05);
    y += 3.0 * F;
    T.str('=4e+8+C', padL + 70, y);
    T.stepEnd();

    tanke(y, [
      [['Det ska vara lika med 4e+6.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Villkoret F(4)=4e+6 ger en ekvation för C', y);
    T.str('4e+8+C=4e+6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 4e från båda']],
      [['led. Då försvinner e-termerna.']]
    ]);
    y = ekvOp(y, '-4e', xw, '4e+8+C=4e+6');
    T.str('8+C=6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Och 8 från båda led.']]
    ]);
    y = ekvOp(y, '-8', xw, '8+C=6');
    T.str('C=-2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: F(4)=4e+8-2=4e+6.']],
      [['Stämmer.']]
    ]);
    y += 3.6 * F;
    xe = T.str('Svar: F(x)=4', padL, y);
    xe = ePot(T, F, xe, y, 'x', '4');
    xe = T.str('+', xe, y);
    xe = T.fracH('x^2', '2', xe, y);
    xe = T.str('-2', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 18: villkor på a och b för två extrempunkter ----
   * f'(x) = x² + x + a ska ha två olika nollställen: uttrycket under
   * rottecknet i pq-formeln positivt. b försvinner vid deriveringen.
   * EKVVAL-scen: "+a" i båda led eller på väggen. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.fracW('1', '4') + T.adv('-a>0') + 0.9 * F;

    /* raden är bred: den läggs under mobilzonen (x>420, y<210) */
    y = 236;
    xx = T.str('f(x)=', padL, y);
    xx = T.fracH('x^3', '3', xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('x^2', '2', xx, y);
    T.str('+ax+b', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Extrempunkter kan bara finnas']],
      [['där derivatan är noll. Jag']],
      [['deriverar term för term.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('f’(x)=x^2+x+a', padL, y);
    T.stepEnd();

    tanke(y, [
      [['b försvann! Den flyttar bara']],
      [['grafen uppåt eller nedåt, och']],
      [['ändrar inte toppar och dalar.']]
    ]);
    y += 2.6 * F;
    T.str('b kan vara vilket tal som helst.', padL, y, null, 0.8);
    T.stepEnd();

    tanke(y, [
      [['Två extrempunkter kräver att']],
      [['f’(x)=0 har två olika lösningar.']],
      [['pq-formeln med p=1 och q=a.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Löser f’(x)=0 med p=1 och q=a', y);
    T.str('x^2+x+a=0', padL, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('x=-', padL, y);
    xx = T.fracH('1', '2', xx, y);
    xx = pm(T, F, xx, y);
    var cw = T.fracW('1', '4') + T.adv('-a') + 0.2 * F;
    var xs = V.rootSign(acts, xx, y, cw, F, { yTop: y - 1.70 * F, yBot: y + 1.0 * F });
    xx = T.fracH('1', '4', xs + 0.1 * F, y);
    T.str('-a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Två olika rötter får jag när']],
      [['uttrycket under rottecknet är']],
      [['positivt.']]
    ], 1.15);
    y += 4.4 * F;
    rubrik(T, F, 'Två olika rötter kräver positivt uttryck under roten', y - 0.6 * F);
    xx = T.fracH('1', '4', padL + 30, y);
    T.str('-a>0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar a till båda led.']]
    ], 1.05);
    y = ekvOp(y, '+a', xw, function (yb) {
      var x2 = T.fracH('1', '4', padL + 30, yb);
      x2 = T.str('-a', x2, yb);
      x2 = T.str('+a', x2, yb, BLUE);
      x2 = T.str('>0', x2, yb);
      T.str('+a', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 3.0, dyVagg: 3.0, vopt: { h0: 1.25, h1: 1.15 } });
    xx = T.fracH('1', '4', padL + 30, y);
    T.str('>a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Gränsfallet a=1/4 ger dubbelrot.']],
      [['Då är f’(x)=(x+1/2)^2≥0, och']],
      [['grafen får en terrasspunkt.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('a=', padL, y);
    xx = T.fracH('1', '4', xx, y);
    T.str(': terrasspunkt', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('a>', padL, y);
    xx = T.fracH('1', '4', xx, y);
    T.str(': inga extrempunkter', xx, y);
    T.stepEnd();

    y += 3.6 * F;
    xe = T.str('Svar: a<', padL, y);
    xe = T.fracH('1', '4', xe, y);
    xe = T.str(' och b valfritt', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 19: för vilket a > 0 är integralen störst? ----
   * Integralen räknas ut med a kvar som bokstav och blir en funktion
   * I(a) = −a³/6 + a. Sedan ett vanligt extremvärdesproblem i a.
   * EKVVAL-scen: "−1" och "·(−2)" i båda led eller på väggen. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('-') + T.fracW('a^2', '2') + T.adv('+1=0') + 0.9 * F;

    y = 132;
    T.str('∫_0^a (x^2-ax+1) dx', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['En primitiv funktion term för']],
      [['term. a är en konstant: ax ger']],
      [['a gånger x^2 delat med 2.']]
    ]);
    y += 3.4 * F;
    xx = T.str('=[', padL + 30, y);
    xx = T.fracH('x^3', '3', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('ax^2', '2', xx, y);
    T.str('+x]_0^a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Övre gränsen a sätts in i stället']],
      [['för x. Undre gränsen 0 ger noll.']],
      [['Värdet beror bara på a: I(a).']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.str('I(a)=', padL, y);
    xx = T.fracH('a^3', '3', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('a·a^2', '2', xx, y);
    xx = T.str('+a', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('a^3', '3', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('a^3', '2', xx, y);
    T.str('+a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Gemensam nämnare 6.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('I(a)=', padL, y);
    xx = T.fracH('2a^3', '6', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('3a^3', '6', xx, y);
    xx = T.str('+a=-', xx, y);
    xx = T.fracH('a^3', '6', xx, y);
    T.str('+a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu ett extremvärdesproblem med']],
      [['a som variabel. Jag deriverar']],
      [['I(a) med avseende på a.']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.str('I’(a)=-', padL, y);
    xx = T.fracH('3a^2', '6', xx, y);
    xx = T.str('+1=-', xx, y);
    xx = T.fracH('a^2', '2', xx, y);
    T.str('+1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['I toppen är derivatan noll.']]
    ], 1.05);
    y += 4.4 * F;
    rubrik(T, F, 'Söker derivatans nollställen', y - 0.5 * F);
    xx = T.str('-', padL + 30, y);
    xx = T.fracH('a^2', '2', xx, y);
    T.str('+1=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 1 från båda led.']]
    ], 1.05);
    y = ekvOp(y, '-1', xw, function (yb) {
      var x2 = T.str('-', padL + 30, yb);
      x2 = T.fracH('a^2', '2', x2, yb);
      x2 = T.str('+1', x2, yb);
      x2 = T.str('-1', x2, yb, BLUE);
      x2 = T.str('=0', x2, yb);
      T.str('-1', x2, yb, BLUE);
    }, { dy: 3.2, dyRes: 3.2, dyVagg: 3.2, vopt: { h0: 1.25, h1: 1.15 } });
    xx = T.str('-', padL + 30, y);
    xx = T.fracH('a^2', '2', xx, y);
    T.str('=-1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag multiplicerar båda led med']],
      [['-2, så blir a^2 ensamt kvar.']]
    ], 1.05);
    y = ekvOp(y, '·(−2)', xw, function (yb) {
      var x2 = T.str('-', padL + 30, yb);
      x2 = T.fracH('a^2', '2', x2, yb);
      x2 = T.str('·(−2)', x2, yb, BLUE);
      x2 = T.str('=-1', x2, yb);
      T.str('·(−2)', x2, yb, BLUE);
    }, { dy: 3.2, dyRes: 2.8, dyVagg: 2.8, vopt: { h0: 1.25, h1: 1.15 } });
    T.str('a^2=2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led.']]
    ]);
    y += 2.8 * F;
    xx = T.str('a=±', padL + 30, y);
    T.rot('2', xx + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Enligt uppgiften är a>0, så']],
      [['den negativa roten stryks.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'a>0 enligt uppgiften', y);
    xx = T.str('a=', padL + 30, y);
    T.rot('2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Är det ett maximum?']],
      [['Andraderivatan avgör.']]
    ]);
    y += 3.4 * F;
    rubrik(T, F, 'Visar att a=√2 ger ett maximum', y);
    T.str('I’’(a)=-a', padL, y);
    T.stepEnd();

    y += 2.5 * F;
    xx = T.str('I’’(', padL, y);
    xx = T.rot('2', xx + 0.08 * F, y);
    xx = T.str(')=-', xx, y);
    xx = T.rot('2', xx, y);
    T.str('<0 ⟹ max', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: a=', padL, y);
    xe = T.rot('2', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

/* ma3c-vt2018-delD-penna.js: pennlösningar till Nationellt prov Ma 3c,
 * VT 2018, delprov D (uppgift 20–28).
 *
 * En scen per uppgift, registrerad som "ma3c-vt2018-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md: inget bläck vid
 * x > 696, inget med x > 420 ovanför y = 150 (y = 210 i ekvval-scener), en
 * tanke per led direkt före ledet, division med vågrätt streck, samma antal
 * klicksteg i båda ekvationsredovisningarna (mkEkvOp), ringar vid varje
 * insättning och trigKvot när en trigonometrisk kvot ställs upp ur figuren.
 *
 * Där verktyget räknar (derivatans värde, tredjegradsekvationen) skriver
 * pennan "Verktyget ger …" och tanken säger vad som räknas och varför.
 * Siffrorna är exakt desamma som i textlösningen
 * (data/np/ma3c-vt2018-delD.js).
 *
 * Granskning: node .claude/verify-handskrift.js ma3c-vt2018-u20 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      mkEkvOp = V.mkEkvOp, substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma3c-vt2018-u' + nr, fn); }

  /* liten grå rubrik (redovisning, står kvar även utan tankar) */
  function rubrik(T, s, x, yb) { return T.str(s, x, yb, null, 0.62); }

  /* kurva ur sin funktion, tätt samplad */
  function kurva(A, acts, f, x0, x1, col, n) {
    var pts = [], i, x;
    n = n || 60;
    for (i = 0; i <= n; i++) {
      x = x0 + (x1 - x0) * i / n;
      pts.push([A.X(x), A.Y(f(x))]);
    }
    acts.push({ kind: 'stroke', pts: pts, color: col || null });
  }

  /* streckad linje mellan två punkter (n delsträckor) */
  function streckad(T, p1, p2, col, n) {
    n = n || 9;
    for (var i = 0; i < n; i += 2) {
      T.acts.push({ kind: 'stroke', color: col || null, pts: humanize([
        [p1[0] + (p2[0] - p1[0]) * i / n, p1[1] + (p2[1] - p1[1]) * i / n],
        [p1[0] + (p2[0] - p1[0]) * (i + 1) / n, p1[1] + (p2[1] - p1[1]) * (i + 1) / n]]) });
    }
  }

  /* skriv en sträng och returnera dess x-intervall */
  function del(T, s, x, yb, col) { var x1 = T.str(s, x, yb, col || null); return [x, x1]; }

  /* ================= DELPROV D ================= */

  /* ---- Uppgift 20: bloggbesökarna ----
   * a) ändringskvoten i varje intervall, b) ändringskvoten 15.00–19.00. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 180;
    rubrik(T, 'a) Ändringskvoten i varje intervall (besökare per timme)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Genomsnittlig förändrings-']],
      [['hastighet är ändringskvoten:']],
      [['ändringen i antal delat med']],
      [['tiden. Bara start och slut räknas.']]
    ]);
    var alts = [['A: ', '40-10', '5', '=6'], ['B: ', '20-10', '8', '=1,25'],
                ['C: ', '30-10', '1', '=20'], ['D: ', '40-10', '2', '=15'],
                ['E: ', '40-40', '1', '=0']];
    alts.forEach(function (a, k) {
      y += (k ? 3.2 : 2.8) * F;
      xx = T.str(a[0], padL, y);
      xx = T.fracH(a[1], a[2], xx, y);
      T.str(a[3], xx, y);
      T.stepEnd();
    });

    tanke(y, [
      [['Störst är 20 besökare per timme,']],
      [['den brantaste sekanten i diagrammet.']]
    ], 1.05);
    y += 3.0 * F;
    xe = T.str('Svar: Alternativ C (15.00-16.00)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += 3.0 * F;
    rubrik(T, 'b) Läser av klockan 15.00 och 19.00', padL, y);
    y += 2.0 * F;
    T.str('Klockan 15.00: 10 besökare', padL, y);
    y += 2.2 * F;
    T.str('Klockan 19.00: 30 besökare', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ändringen i antal delat med']],
      [['tiden, 4 timmar.']]
    ]);
    y += 3.2 * F;
    xx = T.fracH('Δy', 'Δx', padL, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('30-10', '19-15', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('20', '4', xx, y);
    T.str('=5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Enheten är besökare per timme.']],
      [['Utan enhet är svaret inte klart.']]
    ], 1.05);
    y += 3.2 * F;
    xe = T.str('Svar: 5 besökare per timme', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: glaspelarens höjd ----
   * Sinussatsen i triangeln ABC på marken ger AC; tangens i den lodräta,
   * rätvinkliga triangeln ACD ger höjden CD. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var d2r = Math.PI / 180;
    /* triangeln ABC sedd ovanifrån (verklig form) */
    var A = [padL + 20, 340], B = [padL + 330, 340];
    var acL = 330 * Math.sin(55 * d2r) / Math.sin(82 * d2r);
    var C = [A[0] + acL * Math.cos(43 * d2r), A[1] - acL * Math.sin(43 * d2r)];
    /* triangeln ACD sedd från sidan (rät vinkel i C) */
    var A2 = [420, 400], C2 = [620, 400];
    var D2 = [620, 400 - 200 * Math.tan(42 * d2r)];
    var ekvOp = mkEkvOp(T, !!cfg.vagg);

    T.line(A, B); T.pause(110);
    T.line(B, C); T.pause(110);
    T.line(C, A); T.pause(150);
    T.str('A', A[0] - 22, A[1] + 8, null, 0.62);
    T.str('B', B[0] + 8, B[1] + 8, null, 0.62);
    T.str('C', C[0] - 6, C[1] - 12, null, 0.62);
    V.vinkelBage(T, A, -43 * d2r, 0, 34);
    T.str('43°', A[0] + 42, A[1] - 8, null, 0.55);
    V.vinkelBage(T, B, Math.PI, Math.PI + 55 * d2r, 30);
    T.str('55°', B[0] - 82, B[1] - 8, null, 0.55);
    T.str('50 m', (A[0] + B[0]) / 2 - 30, A[1] + 30, BLUE, 0.62);
    T.pause(160);
    T.line(A2, C2); T.pause(110);
    T.line(C2, D2); T.pause(110);
    T.line(D2, A2); T.pause(120);
    V.ratVinkel(T, C2, [-1, 0], [0, -1], 14);
    T.str('A', A2[0] - 22, A2[1] + 8, null, 0.62);
    T.str('C', C2[0] + 8, C2[1] + 8, null, 0.62);
    T.str('D', D2[0] + 8, D2[1] + 6, null, 0.62);
    V.vinkelBage(T, A2, -42 * d2r, 0, 40);
    T.str('42°', A2[0] + 48, A2[1] - 10, null, 0.55);
    T.stepEnd();

    tanke(A2[1] + 20, [
      [['Höjden CD finns i den lodräta']],
      [['triangeln ACD. Där behövs AC, och']],
      [['den får jag ur triangeln ABC.']]
    ], 0);
    y = 520;
    rubrik(T, 'Vinkelsumman i triangeln ABC', padL, y);
    y += 2.0 * F;
    T.str('∠C=180°-43°-55°=82°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Sinussatsen: AC står mot 55° och']],
      [['den kända sidan 50 m mot 82°.']]
    ]);
    y += 3.0 * F;
    xx = T.fracH('AC', 'sin 55°', padL, y);
    xx = T.str('=', xx, y);
    var xs1 = T.fracH('50', 'sin 82°', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Multiplicera båda led med sin 55°,']],
      [['så står AC ensamt.']]
    ], 1.05);
    y = ekvOp(y, '·sin 55°', xs1 + 0.9 * F, function (yy) {
      var x = T.fracH('AC', 'sin 55°', padL, yy);
      x = T.str('·sin 55°', x, yy, BLUE);
      x = T.str('=', x, yy);
      x = T.fracH('50', 'sin 82°', x, yy);
      T.str('·sin 55°', x, yy, BLUE);
    }, { dy: 3.6, dyRes: 3.6, dyVagg: 3.6 });
    xx = T.str('AC=', padL, y);
    xx = T.fracH('50·sin 55°', 'sin 82°', xx, y);
    var ac0 = T.str('=', xx, y);
    var ac1 = ac0 + T.adv('41,36...');
    T.str('41,36... m', ac0, y);
    var yAC = y;
    T.stepEnd();

    tanke(y, [
      [['Från 42° är CD motstående katet']],
      [['och AC närliggande katet. Då är']],
      [['det tangens.']]
    ], 1.05);
    y += 3.6 * F;
    var kv = V.trigKvot(T, F, {
      fn: 'tan 42°=', x: padL, y: y,
      ring: [A2[0] + 50, A2[1] - 16, 30, 20],
      num: { txt: 'CD', ord: 'motstående katet', svep: [C2, D2] },
      den: { txt: 'AC', ord: 'närliggande katet', svep: [A2, C2] }
    });
    T.stepEnd();
    acts.push({ kind: 'fade', ref: kv.ring });

    tanke(y, [
      [['Multiplicera båda led med AC.']]
    ], 1.05);
    y = ekvOp(y, '·AC', kv.x + 0.9 * F, function (yy) {
      var x = T.str('tan 42°', padL, yy);
      x = T.str('·AC', x, yy, BLUE);
      x = T.str('=', x, yy);
      x = T.fracH('CD', 'AC', x, yy);
      T.str('·AC', x, yy, BLUE);
    }, { dy: 3.6, dyRes: 3.0, dyVagg: 3.0 });
    T.str('CD=AC·tan 42°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in AC=41,36... utan']],
      [['att avrunda.']]
    ]);
    var r = substRings(acts, [[ac0, ac1, yAC, F],
                              [padL + T.adv('CD='), padL + T.adv('CD=AC'), y, F]]);
    y += 2.4 * F;
    T.str('=41,36...·tan 42°=37,24...', padL + 60, y);
    fadeRings(acts, r);
    T.stepEnd();

    y += 2.3 * F;
    T.str('≈37 m', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? 42° är lite mindre än 45°,']],
      [['så höjden ska vara lite kortare än']],
      [['AC. Två värdesiffror, som 50 m.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: Ungefär 37 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 22: vilken funktion är derivatan? ----
   * Extrempunkterna på f ligger rakt ovanför nollställena till g, och g är
   * positiv där f växer. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    /* exakt: f' = g (se kommentaren i generatorn) */
    function f(x) { return -2 * x * x * x / 3 + 2 * x * x + 2; }
    function g(x) { return 4 * x - 2 * x * x; }
    var Ax = mkAxes(T, F, { ox: padL + 90, oy: 378, u: 54, xsc: 1, ysc: 1,
                            xmin: -1, xmax: 3.6, ymin: -2.6, ymax: 5.2 });

    Ax.axes();
    Ax.ticks(V.heltal(-1, 3), V.heltal(-2, 5), [1], [1]);
    T.pause(160);
    kurva(Ax, acts, f, -0.85, 3.54, BLUE, 90);
    T.str('f', Ax.X(2.7), Ax.Y(4.4), null, 0.62);
    T.pause(140);
    kurva(Ax, acts, g, -0.5, 2.5, BLUE, 70);
    T.str('g', Ax.X(1.25), Ax.Y(2.35), null, 0.62);
    T.stepEnd();

    tanke(Ax.Y(-2.6) + 40, [
      [['Derivatan är lutningen. Där f har']],
      [['en extrempunkt är tangenten']],
      [['vågrät, och där är derivatan 0.']]
    ], 0);
    Ax.dot(0, 2, BLUE);
    Ax.dot(2, f(2), BLUE);
    T.pause(140);
    streckad(T, [Ax.X(2), Ax.Y(f(2))], [Ax.X(2), Ax.Y(0)], BLUE, 11);
    T.pause(120);
    Ax.dot(0, 0, BLUE);
    Ax.dot(2, 0, BLUE);
    y = Ax.Y(-2.6) + 70;
    T.str('f: extrempunkter i x=0 och x=2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('g(0)=0 och g(2)=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Där f växer ska derivatan vara']],
      [['positiv, och där f avtar negativ.']]
    ]);
    y += 2.6 * F;
    T.str('0<x<2: f växer och g(x)>0', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('x<0 och x>2: f avtar och g(x)<0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Allt passar med att g=f’. Dessutom:']],
      [['en tredjegradare deriverad ger']],
      [['en andragradare.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: g är derivata till f', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 23: f'(0) med digitalt verktyg ---- */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 150;
    T.str('f(x)=(2x+1)^1^3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En parentes upphöjd till 13 är en']],
      [['sammansatt funktion. Verktyget får']],
      [['räkna derivatans värde i x=0.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'GeoGebra: f(x)=(2x+1)^1^3 och sedan f’(0)', padL, y);
    y += 2.1 * F;
    T.str('Verktyget ger f’(0)=26', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: en sekant över ett']],
      [['mycket litet intervall kring 0 har']],
      [['nästan samma lutning.']]
    ]);
    y += 3.0 * F;
    xx = T.fracH('f(0,001)-f(−0,001)', '0,002', padL, y);
    T.str('≈26,0', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar: f’(0)=26', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: lös f'(x) = 12 ---- */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL + 30;

    y = 225;
    T.str('f(x)=5·e^-^0^,^4^x+100x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Derivatan av e upphöjt till kx är']],
      [['k gånger e upphöjt till kx. Så -0,4']],
      [['kommer ned som faktor.']]
    ]);
    y += 2.8 * F;
    T.str('f’(x)=5·(-0,4)·e^-^0^,^4^x+100', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=-2e^-^0^,^4^x+100', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Nu ska derivatan vara 12.']]
    ]);
    y += 2.6 * F;
    T.str('-2e^-^0^,^4^x+100=12', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Subtrahera 100 från båda led.']]
    ]);
    y = ekvOp(y, '-100', x0 + T.adv('-2e^-^0^,^4^x+100=12') + 0.9 * F, '-2e^-^0^,^4^x+100=12');
    T.str('-2e^-^0^,^4^x=-88', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med -2.']]
    ]);
    y = ekvOp(y, '/-2', x0 + T.adv('-2e^-^0^,^4^x=-88') + 0.9 * F, '-2e^-^0^,^4^x=-88');
    T.str('e^-^0^,^4^x=44', x0, y);
    T.stepEnd();

    tanke(y, [
      [['x sitter i exponenten. Jag tar ln']],
      [['av båda led.']]
    ]);
    y += 2.6 * F;
    T.str('ln e^-^0^,^4^x=ln 44', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen tar ned exponenten']],
      [['som faktor, och ln e=1.']]
    ]);
    y += 2.6 * F;
    T.str('-0,4x·ln e=ln 44', x0, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('-0,4x=ln 44', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med -0,4.']]
    ]);
    y = ekvOp(y, '/-0,4', x0 + T.adv('-0,4x=ln 44') + 0.9 * F, '-0,4x=ln 44');
    xx = T.str('x=', x0, y + 0.6 * F);
    xx = T.fracH('ln 44', '-0,4', xx, y + 0.6 * F);
    T.str('=-9,4604...≈-9,46', xx, y + 0.6 * F);
    T.stepEnd();

    tanke(y + 0.6 * F, [
      [['Kontroll: f’(-9,46) blir 12. Samma']],
      [['x ger NLös i GeoGebra.']]
    ], 1.05);
    y += 3.8 * F;
    xe = T.str('Svar: x≈-9,46', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 25: räcker gräsfröet? ----
   * Diagonalen ger en rätvinklig triangel (Pythagoras) och en triangel med
   * tre kända sidor (cosinussatsen ger vinkeln, areasatsen arean). */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL;
    /* fyrhörningen i meter → px (11 px per meter) */
    var u = 11, ox = padL + 40, oy = 380;
    function P(x, yy) { return [ox + x * u, oy - yy * u]; }
    var x4 = 4.1, y4 = 0;
    /* P4 ur |P1P4| = 13 och |P3P4| = 20 (samma beräkning som figuren) */
    (function () {
      var a = 48, b = 20, c = 445;
      var qa = 1 + (a / b) * (a / b), qb = -2 * a * c / (b * b), qc = (c / b) * (c / b) - 169;
      var xs = (-qb - Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa);
      x4 = xs; y4 = (c - a * xs) / b;
    })();
    var P1 = P(0, 0), P2 = P(24, 0), P3 = P(24, 10), P4 = P(x4, y4);

    T.line(P1, P2); T.pause(100);
    T.line(P2, P3); T.pause(100);
    T.line(P3, P4); T.pause(100);
    T.line(P4, P1); T.pause(140);
    V.ratVinkel(T, P2, [-1, 0], [0, -1], 12);
    T.str('24', (P1[0] + P2[0]) / 2 - 12, P1[1] + 28, BLUE, 0.62);
    T.str('10', P2[0] + 10, (P2[1] + P3[1]) / 2 + 8, BLUE, 0.62);
    T.str('20', (P3[0] + P4[0]) / 2 - 10, (P3[1] + P4[1]) / 2 - 12, BLUE, 0.62);
    T.str('13', (P1[0] + P4[0]) / 2 - 36, (P1[1] + P4[1]) / 2 + 6, BLUE, 0.62);
    T.stepEnd();

    tanke(oy + 30, [
      [['Satserna gäller trianglar. En']],
      [['diagonal delar gräsmattan i en']],
      [['rätvinklig och en sned triangel.']]
    ], 0);
    T.line(P1, P3, BLUE);
    T.str('d', (P1[0] + P3[0]) / 2 + 6, (P1[1] + P3[1]) / 2 + 26, BLUE, 0.62);
    y = oy + 110;
    rubrik(T, 'Pythagoras sats i den rätvinkliga triangeln', padL, y);
    y += 2.0 * F;
    T.str('d^2=24^2+10^2=576+100=676', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('d=', padL, y);
    xx = T.rot('676', xx, y);
    T.str('=26', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Den sneda triangeln har sidorna 13,']],
      [['20 och 26. Cosinussatsen ger']],
      [['vinkeln α mittemot diagonalen.']]
    ]);
    var a41 = Math.atan2(P1[1] - P4[1], P1[0] - P4[0]), a43 = Math.atan2(P3[1] - P4[1], P3[0] - P4[0]);
    V.vinkelBage(T, P4, a43, a41, 18);
    var bis = (a41 + a43) / 2;
    T.str('α', P4[0] + 36 * Math.cos(bis) - 6, P4[1] + 36 * Math.sin(bis) + 8, BLUE, 0.62);
    y += 2.9 * F;
    rubrik(T, 'Cosinussatsen ger vinkeln α mellan sidorna 13 och 20', padL, y);
    y += 2.0 * F;
    T.str('26^2=13^2+20^2-2·13·20·cos α', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('676=569-520 cos α', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Subtrahera 569 från båda led.']]
    ]);
    var xw = x0 + T.adv('676=569-520 cos α') + 0.9 * F;
    y = ekvOp(y, '-569', xw, '676=569-520 cos α', { x0: padL });
    T.str('107=-520 cos α', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med -520.']]
    ]);
    y = ekvOp(y, '/-520', x0 + T.adv('107=-520 cos α') + 0.9 * F, '107=-520 cos α', { x0: padL });
    var ca0 = T.str('cos α=-0,2057...', x0, y);
    void ca0;
    T.stepEnd();

    y += 2.3 * F;
    var al0 = x0 + T.adv('α='), al1 = T.str('α=101,87...°', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Areorna: bas gånger höjd delat']],
      [['med 2, och areasatsen med α.']]
    ]);
    y += 3.2 * F;
    xx = T.str('T_1=', padL, y);
    xx = T.fracH('24·10', '2', xx, y);
    T.str('=120', xx, y);
    T.stepEnd();

    var r = substRings(acts, [[al0, al1, y - 3.2 * F, F]]);
    y += 3.6 * F;
    xx = T.str('T_2=', padL, y);
    xx = T.fracH('13·20·sin 101,87...°', '2', xx, y);
    T.str('=127,21...', xx, y, null, 0.9);
    fadeRings(acts, r);
    T.stepEnd();

    y += 3.2 * F;
    T.str('T=120+127,21...=247,21...', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('≈247 m^2', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['247 är mindre än 250, så fröna']],
      [['räcker, men med liten marginal.']]
    ]);
    y += 2.8 * F;
    T.str('Svar: Ja, arean är cirka 247 m^2,', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('så gräsfröna räcker', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 26: hur länge pågick röstningen? ----
   * Röster per minut integreras till totalt antal röster; den
   * tredjegradsekvation som uppstår löses digitalt och tolkas. */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 180;
    T.str('r(x)=12 600x-140x^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['r(x) är röster PER MINUT. Det']],
      [['totala antalet fram till t minuter']],
      [['är arean under grafen.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Totalt antal röster = integralen från 0 till t', padL, y);
    y += 2.1 * F;
    T.str('∫_0^t (12 600x-140x^2) dx=12 600 000', padL + 24, y, null, 0.85);
    T.stepEnd();

    tanke(y, [
      [['Primitiv funktion term för term,']],
      [['och gränsen 0 ger noll.']]
    ]);
    y += 3.0 * F;
    xx = T.str('[6 300x^2-', padL + 24, y, null, 0.9);
    xx = T.fracH('140x^3', '3', xx, y);
    T.str(']_0^t=12 600 000', xx, y, null, 0.9);
    T.stepEnd();

    tanke(y, [
      [['Sätter in gränserna t och 0.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('6 300t^2-', padL + 24, y);
    xx = T.fracH('140t^3', '3', xx, y);
    T.str('=12 600 000', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En tredjegradsekvation. Den löser']],
      [['jag med Lös i GeoGebra.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('Verktyget: t≈-39,4  t=60  t≈114,4', padL, y, null, 0.85);
    T.stepEnd();

    tanke(y, [
      [['En negativ tid är orimlig,']],
      [['röstningen startar vid t=0.']]
    ]);
    y += 2.8 * F;
    T.str('t≈−39,4<0: orimligt', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Efter 90 minuter blir r negativ,']],
      [['alltså negativa röster. Då går']],
      [['114 bort.']]
    ]);
    y += 2.8 * F;
    T.str('r(x)=140x(90-x)<0 för x>90', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('⟹ t=60', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: sätt in 60.']]
    ]);
    y += 3.0 * F;
    xx = T.str('6 300·60^2-', padL, y);
    T.fracH('140·60^3', '3', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    T.str('=22 680 000-10 080 000', padL + 40, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=12 600 000', padL + 40, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar: 60 minuter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 27: meterpriset ----
   * a) P(5) delat med 5; b) P(x)/x förenklas och gränsvärdet tas när x
   * växer obegränsat. */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 150;
    xx = T.str('P(x)=', padL, y);
    T.fracH('20x^2+150', 'x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Först priset för hela bandet,']],
      [['P(5).']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('a) P(5)=', padL, y);
    xx = T.fracH('20·5^2+150', '5', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('650', '5', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    T.str('=130 kr', padL + 100, y);
    T.stepEnd();

    tanke(y, [
      [['Meterpriset är priset delat med']],
      [['antalet meter.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('Meterpris: ', padL, y);
    xx = T.fracH('130', '5', xx, y);
    T.str('=26 kr/m', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: 26 kr/m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Meterpriset för x meter är P(x)']],
      [['delat med x. Då får nämnaren en']],
      [['faktor x till.']]
    ]);
    y += 3.4 * F;
    xx = T.str('b) ', padL, y);
    xx = T.fracH('P(x)', 'x', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('20x^2+150', 'x·x', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('20x^2+150', 'x^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Delar upp bråket term för term.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('=', padL + 40, y);
    xx = T.fracH('20x^2', 'x^2', xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('150', 'x^2', xx, y);
    xx = T.str('=20+', xx, y);
    T.fracH('150', 'x^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Ett mycket långt band: x växer']],
      [['obegränsat. Oändlighet bara i']],
      [['nämnaren, så 150 delat med x i']],
      [['kvadrat går mot 0.']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.str('lim', padL, y);
    var wl = T.adv('x→∞', 0.5);
    T.str('x→∞', padL + (xx - padL) / 2 - wl / 2, y + 0.62 * F, null, 0.5);
    xx = Math.max(xx, padL + (xx - padL) / 2 + wl / 2) + 0.2 * F;
    xx = V.bigParen(T, F, xx, y, false);
    xx = T.str('20+', xx, y);
    xx = T.fracH('150', 'x^2', xx, y);
    xx = V.bigParen(T, F, xx + 0.05 * F, y, true);
    T.str('=20+0=20', xx + 0.1 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Omställningskostnaden fördelas på']],
      [['så många meter att den inte märks.']]
    ], 1.2);
    y += 3.4 * F;
    xe = T.str('Svar: 20 kr/m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 28: den billigaste burken ----
   * Volymen binder ihop r och h, kostnaden blir en funktion av r, och
   * derivatan = 0 ger minimum (andraderivatan verifierar). */
  reg(28, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL + 30, i;

    /* ---- figuren: cylinder ---- */
    var cx = padL + 110, top = 250, bot = 400, rx = 60, ry = 16;
    function ellips(cy, a0, a1, dash) {
      var pts = [], n = 28, t;
      for (i = 0; i <= n; i++) {
        t = a0 + (a1 - a0) * i / n;
        pts.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
      }
      if (!dash) { acts.push({ kind: 'stroke', pts: pts }); return; }
      for (i = 0; i < n; i += 4) acts.push({ kind: 'stroke', pts: pts.slice(i, i + 3) });
    }
    ellips(top, 0, 2 * Math.PI);
    T.pause(120);
    T.line([cx - rx, top], [cx - rx, bot]);
    T.line([cx + rx, top], [cx + rx, bot]);
    T.pause(100);
    ellips(bot, 0, Math.PI);
    ellips(bot, Math.PI, 2 * Math.PI, true);
    T.pause(140);
    T.line([cx, top], [cx + rx, top], BLUE);
    T.str('r', cx + rx / 2 - 6, top - 22, BLUE, 0.62);
    T.line([cx + rx + 22, top], [cx + rx + 22, bot], BLUE);
    T.str('h', cx + rx + 30, (top + bot) / 2 + 8, BLUE, 0.62);
    T.str('V=2,0 dm^3', cx + rx + 70, (top + bot) / 2 + 8, BLUE, 0.62);
    T.stepEnd();

    tanke(bot + 30, [
      [['Volymen är låst, så r och h hänger']],
      [['ihop. Jag löser ut h ur volymen.']]
    ], 0);
    y = bot + 100;
    rubrik(T, 'Volymen ger h uttryckt i r', padL, y);
    y += 2.2 * F;
    xx = T.str('πr^2h=2,0  ⟺  ', padL, y);
    var hEx0 = xx;
    xx = T.str('h=', xx, y);
    var hEx1 = T.fracH('2,0', 'πr^2', xx, y);
    var yH = y;
    T.stepEnd();

    tanke(y, [
      [['Botten och lock är två cirklar som']],
      [['kostar 0,20 kr per dm i kvadrat.']],
      [['Manteln är omkretsen gånger h och']],
      [['kostar 0,10 kr per dm i kvadrat.']]
    ], 1.05);
    y += 3.4 * F;
    rubrik(T, 'Kostnad: botten och lock + mantel', padL, y);
    y += 2.0 * F;
    T.str('K=0,20·2πr^2+0,10·2πrh', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xx = T.str('=0,40πr^2+0,20πr', padL + 30, y);
    var hK0 = xx, hK1 = T.str('h', xx, y);
    var yK = y;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in h, så blir K en']],
      [['funktion av r ensamt.']]
    ]);
    var r1 = substRings(acts, [[hEx0, hEx1, yH, F, { ry: 1.2 * F, cy: yH - 0.3 * F }],
                               [hK0, hK1, yK, F]]);
    y += 3.0 * F;
    xx = T.str('K(r)=0,40πr^2+0,20πr·', padL, y);
    T.fracH('2,0', 'πr^2', xx, y);
    fadeRings(acts, r1);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=0,40πr^2+', padL + 60, y);
    T.fracH('0,40', 'r', xx, y);
    T.stepEnd();

    tanke(y, [
      [['0,40 delat med r är 0,40 gånger r']],
      [['upphöjt till -1. Potensregeln ger']],
      [['derivatan. Lägst kostnad där den']],
      [['är 0.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('K’(r)=0,80πr-', padL, y);
    T.fracH('0,40', 'r^2', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('0,80πr-', x0, y);
    xx = T.fracH('0,40', 'r^2', xx, y);
    var xe1 = T.str('=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Multiplicera båda led med r i']],
      [['kvadrat, så försvinner nämnaren.']]
    ], 1.05);
    y = ekvOp(y, '·r^2', xe1 + 0.9 * F, function (yy) {
      var x = T.str('(0,80πr-', x0, yy);
      x = T.fracH('0,40', 'r^2', x, yy);
      x = T.str(')', x, yy);
      x = T.str('·r^2', x, yy, BLUE);
      x = T.str('=0', x, yy);
      T.str('·r^2', x, yy, BLUE);
    }, { dy: 3.4, dyRes: 3.4, dyVagg: 3.4 });
    xx = T.str('0,80πr·r^2-', x0, y);
    xx = T.fracH('0,40', 'r^2', xx, y);
    T.str('·r^2=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['r·r i kvadrat är r i kubik, och i']],
      [['den andra termen tar r i kvadrat']],
      [['ut nämnaren.']]
    ], 1.05);
    y += 3.2 * F;
    T.str('0,80πr^3-0,40=0', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Addera 0,40 till båda led.']]
    ]);
    y = ekvOp(y, '+0,40', x0 + T.adv('0,80πr^3-0,40=0') + 0.9 * F, '0,80πr^3-0,40=0');
    T.str('0,80πr^3=0,40', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med 0,80π.']]
    ]);
    y = ekvOp(y, '/0,80π', x0 + T.adv('0,80πr^3=0,40') + 0.9 * F, '0,80πr^3=0,40');
    T.str('r^3=0,1591...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Tredjeroten ur båda led.']]
    ]);
    y += 2.6 * F;
    xx = T.str('r=', x0, y);
    xx = T.rot('0,1591...', xx, y, '3');
    var r0 = T.str('=', xx, y), r1x = T.str('0,5419...', r0, y);
    var yR = y;
    T.stepEnd();

    tanke(y, [
      [['Är det ett minimum? Andra-']],
      [['derivatan är positiv för alla r>0.']]
    ]);
    y += 3.4 * F;
    xx = T.str('K’’(r)=0,80π+', padL, y);
    xx = T.fracH('0,80', 'r^3', xx, y);
    T.str('>0', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    T.str('⟹ minimum för r=0,5419...', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Sätter in r=0,5419... utan att']],
      [['avrunda.']]
    ], 1.05);
    var r2 = substRings(acts, [[r0, r1x, yR, F]]);
    y += 2.8 * F;
    T.str('K(0,5419...)', padL, y);
    y += 3.2 * F;
    xx = T.str('=0,40π·0,5419...^2+', padL + 40, y);
    T.fracH('0,40', '0,5419...', xx, y);
    fadeRings(acts, r2);
    T.stepEnd();

    y += 3.4 * F;
    T.str('=0,3690...+0,7381...', padL + 40, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=1,107...≈1,11 kr', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Burken blir 4r≈2,17 dm hög: hög']],
      [['och smal, för botten och lock är']],
      [['dubbelt så dyra. Rimligt.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: Ungefär 1,11 kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

})();

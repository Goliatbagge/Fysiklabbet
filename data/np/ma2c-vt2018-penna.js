/* ma2c-vt2018-penna.js — pennlösningar till Nationellt prov Ma 2c, VT 2018.
 *
 * En scen per uppgift, registrerad som "ma2c-vt2018-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de som oftast
 * bränner: inget bläck vid x > 696 eller x < 24, inget med x > 420 ovanför
 * y = 150 (y = 210 i ekvval-scener), en tanke per led direkt före ledet,
 * division alltid med vågrätt streck, blå båge till varje term när en
 * parentes utvecklas, och samma antal klicksteg i båda ekvations-
 * redovisningarna (cfg.vagg + mkEkvOp + ekvval: 1).
 *
 * Samma siffror och samma avrundning som textlösningen i
 * data/np/ma2c-vt2018.js — eleven växlar mellan vyerna.
 *
 * Granskning: node .claude/verify-handskrift.js ma2c-vt2018-u1 …
 * Skärmdump:  .shots/np-penna-ma2c-vt2018.html?ma2c-vt2018-u1
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkEkvOp = V.mkEkvOp, mkSamla = V.mkSamla,
      mkAxes = V.mkAxes, substRings = V.substRings,
      fadeRings = V.fadeRings, humanize = V.humanize,
      bigParen = V.bigParen, vinkelBage = V.vinkelBage, ratVinkel = V.ratVinkel,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma2c-vt2018-u' + nr, fn); }

  /* ================= gemensamma småhjälpare ================= */
  /* SYSTEMKLAMMER — den vänstra klammern framför ett ekvationssystem,
   * ritad för hand som ETT pennstreck (samma som i ma2c-vt2022-penna.js).
   * x = klammerns högerkant, yTop/yBot = översta radens överkant och
   * nedersta radens underkant. */
  function sysBrace(T, F, x, yTop, yBot) {
    var ym = (yTop + yBot) / 2, d = 0.22 * F;
    T.acts.push({ kind: 'stroke', pts: humanize([
      [x, yTop], [x - d * 0.55, yTop + d * 0.5], [x - d * 0.7, ym - d * 0.6],
      [x - d * 1.25, ym], [x - d * 0.7, ym + d * 0.6],
      [x - d * 0.55, yBot - d * 0.5], [x, yBot]]) });
    T.pause(160);
  }
  function sysX(F, x) { return x + 0.45 * F; }
  /* STRECKAD LINJE: n segment varav vartannat ritas, valfri färg. */
  function dashLine(T, p1, p2, n, col) {
    var i;
    for (i = 0; i < n; i++) {
      if (i % 2) continue;
      T.acts.push({ kind: 'stroke', color: col || null, pts: humanize(
        [[p1[0] + (p2[0] - p1[0]) * (i / n), p1[1] + (p2[1] - p1[1]) * (i / n)],
         [p1[0] + (p2[0] - p1[0]) * ((i + 1) / n),
          p1[1] + (p2[1] - p1[1]) * ((i + 1) / n)]]) });
    }
  }
  /* BRÅK MED NEDSTAPEL I TÄLJAREN ("lg 15" över "lg 8"): täljaren lyfts
   * lift·F så att g-svansen inte går genom bråkstrecket. */
  function fracLift(T, F, numS, denS, x0, yb, lift) {
    lift = lift == null ? 0.26 : lift;
    var ybar = yb - 0.34 * F, nw = T.adv(numS), dw = T.adv(denS);
    var w = Math.max(nw, dw) + 0.3 * F;
    T.str(numS, x0 + (w - nw) / 2, ybar - (0.14 + lift) * F);
    T.pause(130);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(130);
    T.str(denS, x0 + (w - dw) / 2, ybar + 1.04 * F);
    return x0 + w + 1.5;
  }
  /* PLUS-MINUS med luft på båda sidor ('±' är ingen OPS-glyf). */
  function pm(T, F, x, yb) { return T.str('±', x + 0.12 * F, yb) + 0.12 * F; }
  /* ROT ÖVER (p/2)^2 − q: rottecknet ritas med rootSign i parentesens
   * höjd och innehållet skrivs in efteråt. Returnerar nästa x. */
  function rotParen(T, F, numS, denS, restS, x0, yb) {
    var cw = T.parenFracW(numS, denS, '2') + T.adv(restS) + 0.2 * F;
    var xs = V.rootSign(T.acts, x0, yb, cw, F,
                        { yTop: yb - 1.80 * F, yBot: yb + 1.12 * F });
    var xx = T.parenFrac(numS, denS, '2', xs + 0.2 * F, yb);
    return T.str(restS, xx, yb);
  }
  /* STOR PARENTES MED FÄRG (samma mått som bigParen). */
  function storParen(T, F, x, yb, right, col) {
    var yTop = yb - 1.42 * F, yBot = yb + 1.06 * F, ym = (yTop + yBot) / 2;
    var d = (right ? -1 : 1) * 0.17 * F;
    T.acts.push({ kind: 'stroke', color: col || null, pts: [
      [x + d, yTop], [x + d * 0.45, yTop + (ym - yTop) * 0.36],
      [x + d * 0.04, ym - (ym - yTop) * 0.22], [x, ym],
      [x + d * 0.04, ym + (yBot - ym) * 0.22],
      [x + d * 0.45, yBot - (yBot - ym) * 0.36], [x + d, yBot]] });
    T.pause(120);
    return x + 0.24 * F;
  }
  /* BRÅK MED EGENRITAD TÄLJARE ELLER NÄMNARE: num/den är antingen en
   * sträng eller { w, draw: function (x, yb) } (t.ex. en potens med
   * bråkexponent, eller ett rottecken). dcol färgar streck + nämnare
   * (division i båda led). Returnerar nästa x. */
  function fracCustom(T, F, num, den, x0, yb, dcol) {
    var ybar = yb - 0.34 * F;
    var nw = typeof num === 'string' ? T.adv(num) : num.w;
    var dw = typeof den === 'string' ? T.adv(den) : den.w;
    var w = Math.max(nw, dw) + 0.3 * F;
    if (typeof num === 'string') T.str(num, x0 + (w - nw) / 2, ybar - 0.14 * F);
    else num.draw(x0 + (w - nw) / 2, ybar - 0.14 * F);
    T.pause(130);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: dcol || null });
    T.pause(130);
    /* en egenritad nämnare med upphöjt innehåll sänks (sink, i F) så att
     * exponenten inte når upp i bråkstrecket, som fracH gör för '^' */
    if (typeof den === 'string') T.str(den, x0 + (w - dw) / 2, ybar + 1.04 * F, dcol || null);
    else den.draw(x0 + (w - dw) / 2, ybar + (1.04 + (den.sink || 0)) * F);
    return x0 + w + 1.5;
  }
  /* CIRKEL ritad för hand och liten ifylld punkt */
  function cirkel(T, cx, cy, r, n) {
    var pts = [], i, a;
    for (i = 0; i <= n; i++) {
      a = -Math.PI / 2 + (i / n) * 2 * Math.PI;
      pts.push([cx + Math.cos(a) * r + V.rnd(-0.7, 0.7),
                cy + Math.sin(a) * r + V.rnd(-0.7, 0.7)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts });
  }
  function punkt(T, p, col) {
    T.acts.push({ kind: 'stroke', pts: V.dotPts(p[0], p[1]), color: col || null });
  }
  /* VINKELBÅGE mellan riktningarna mot två punkter (inre vinkeln), och
   * en liten etikett på bisektrisen. */
  function ang(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]); }
  function bage(T, c, p1, p2, r, col) {
    var a1 = ang(c, p1), d = ang(c, p2) - a1, pts = [], i, n = 12;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    for (i = 0; i <= n; i++) {
      var a = a1 + d * (i / n);
      pts.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]);
    }
    T.acts.push({ kind: 'stroke', pts: pts, color: col || null });
    return a1 + d / 2;
  }
  function radLabel(T, F, ch, c, m, R, col) {
    var w = T.adv(ch, 0.62), h = 0.56 * F * 0.62;
    T.str(ch, c[0] + Math.cos(m) * R - w / 2, c[1] + Math.sin(m) * R + h / 2,
          col || null, 0.62);
  }
  /* MÅTTPIL med spets i båda ändar (måttlinje) */
  function dblPil(T, p1, p2, col) {
    var dx = p2[0] - p1[0], dy = p2[1] - p1[1], L = Math.hypot(dx, dy);
    var ux = dx / L, uy = dy / L, nx = -uy, ny = ux, h = 11, b = 4.5;
    T.line(p1, p2, col);
    T.line([p1[0] + ux * h + nx * b, p1[1] + uy * h + ny * b], p1, col);
    T.line([p1[0] + ux * h - nx * b, p1[1] + uy * h - ny * b], p1, col);
    T.line([p2[0] - ux * h + nx * b, p2[1] - uy * h + ny * b], p2, col);
    T.line([p2[0] - ux * h - nx * b, p2[1] - uy * h - ny * b], p2, col);
  }
  /* REGELNOT (användarkrav 2026-09-20): en regel som bara TILLÄMPAS i en
   * rad (kvadreringsregeln, konjugatregeln, logaritmlagen) poppar upp som
   * blå Poppins-text ovanför raden medan raden skrivs, och tonar bort när
   * raden är klar. Metodrubriker som ska stå kvar (pq-formeln, Pythagoras
   * sats, Likformiga trianglar) skrivs fortfarande som liten grå rubrik.
   * Noten är ren text, inget bläck. */
  function regelNot(T, F, text, x, yb) {
    var n = { note: 1, x: x, y: yb, fs: 17, text: text, anchor: 'start',
              color: BLUE, wins: [] };
    T.acts.push({ kind: 'show', obj: n });
    T.pause(420);
    return n;
  }
  function regelGom(T, n) {
    T.pause(320);
    T.acts.push({ kind: 'hide', obj: n });
    T.pause(200);
  }
  /* liten etikett i figur: centrerad i x, given baslinje */
  function lblC(T, F, s, xc, yb, col, sc) {
    sc = sc == null ? 0.62 : sc;
    return T.str(s, xc - T.adv(s, sc) / 2, yb, col || null, sc);
  }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 1: linjens ekvation ur grafen ----
   * Koordinatsystemet och linjen ritas i grafit. m läses av där linjen
   * skär y-axeln (blå punkt), k med ett trappsteg från (0, 3): ett steg
   * åt höger, två upp. Bubblor som hör till figuren läggs under den. */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ax = mkAxes(T, F, { ox: 190, oy: 236, u: 26,
                            xmin: -5, xmax: 5, ymin: -4, ymax: 7 });
    var FIGB_Y = 392;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axlarna och linjen (dragen med linjal) */
    ax.axes();
    ax.ticks([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], [-4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7],
             [-4, -2, 2, 4], [2, 4, 6]);
    T.pause(150);
    ax.rule([ax.X(-3.5), ax.Y(-4)], [ax.X(2), ax.Y(7)]);
    T.stepEnd();

    /* steg 2: m */
    figurBubble(268, [
      [['m är y-värdet där linjen skär']],
      [['y-axeln. Linjen går genom']],
      [['(0, 3), så m=3.']]
    ]);
    ax.dot(0, 3, BLUE);
    T.pause(120);
    ax.tag(0, 3, 'm=3', -88, -8, BLUE);
    y = 470;
    T.str('m=3', padL, y);
    T.stepEnd();

    /* steg 3: k med trappsteg */
    tanke(y, [
      [['k är hur mycket y ändras när x']],
      [['ökar med 1. Från (0, 3) går jag']],
      [['ett steg åt höger, Δx=1, och']],
      [['upp till linjen: Δy=2.']]
    ]);
    /* måttet Δx=1 är bredare än steget: knuffas till stegets högra ände,
     * så att det inte skär y-axeln */
    ax.stair(0, 3, 1, 5, 'Δx=1', 'Δy=2', { dxOff: [24, 0] });
    T.pause(200);
    y += 3.4 * F;
    xx = T.str('k=', padL, y);
    xx = T.fracH('Δy', 'Δx', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('2', '1', xx, y);
    T.str('=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: x=2 ger 2·2+3=7,']],
      [['och linjen går genom (2, 7).']],
      [['Stämmer.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: y=2x+3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 2: nollställen, symmetrilinje och minimipunkt ----
   * Parabeln genom (−3, 0), (−1, −4) och (1, 0) skissas (samplad ur
   * f(x) = x² + 2x − 3). Varje deluppgift markerar sitt begrepp i blått i
   * figuren: punkterna på x-axeln, den streckade symmetrilinjen och
   * vertex. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var ax = mkAxes(T, F, { ox: 190, oy: 170, u: 22,
                            xmin: -4, xmax: 3, ymin: -5, ymax: 2 });
    var FIGB_Y = 322;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }
    function f(x) { return x * x + 2 * x - 3; }

    /* steg 1: axlarna */
    ax.axes();
    ax.ticks([-4, -3, -2, -1, 1, 2, 3], [-5, -4, -3, -2, -1, 1, 2],
             [-4, -2, 1, 2], [2, -2], { x: { '1': [6, 7] } });
    T.stepEnd();

    /* steg 2: parabeln och de tre punkterna */
    var pts = [];
    for (i = -3.5; i <= 1.5 + 1e-9; i += 0.125) pts.push([ax.X(i), ax.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: pts });
    T.pause(200);
    ax.dot(-3, 0);
    T.pause(120);
    ax.dot(1, 0);
    T.pause(120);
    ax.dot(-1, -4); ax.tag(-1, -4, '(−1, −4)', -74, 18);
    T.stepEnd();

    /* ---- a) ---- */
    figurBubble(268, [
      [['Där grafen skär x-axeln är']],
      [['f(x)=0. Sådana x kallas']],
      [['nollställen.']]
    ]);
    ax.dot(-3, 0, BLUE);
    T.pause(120);
    ax.dot(1, 0, BLUE);
    y = 436;
    T.str('a) f(−3)=0 och f(1)=0', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Nollställen', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['x=−1 ligger mitt emellan']],
      [['nollställena, och grafen är']],
      [['spegelvänd kring den linjen.']]
    ]);
    dashLine(T, [ax.X(-1), ax.Y(1.6)], [ax.X(-1), ax.Y(-4.6)], 13, BLUE);
    T.pause(200);
    y += 3.0 * F;
    T.str('b) x=−1 mitt emellan −3 och 1', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Symmetrilinje', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['(−1, −4) är grafens lägsta punkt.']],
      [['Parabeln öppnar sig uppåt, så']],
      [['det är en minimipunkt (vertex).']]
    ]);
    ax.dot(-1, -4, BLUE);
    T.pause(200);
    y += 3.0 * F;
    T.str('c) lägsta punkten (−1, −4)', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Minimipunkt', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 3: normalfördelningens medelvärde och spridning ----
   * a) Klockkurvan skissas för hand över en axel 2–15; toppen ligger rakt
   * ovanför 9, som markeras i blått. b) Störst standardavvikelse = bredast
   * och lägst kurva, det vill säga A. */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var ox = padL + 20, oy = 250, u = 30, H = 100;   /* axel: 2 … 15 */
    function X(v) { return ox + (v - 2) * u; }
    var FIGB_Y = 312;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axeln med skalstreck och tal, sedan kurvan */
    T.line([X(2) - 10, oy], [X(15) + 20, oy]);
    T.line([X(15) + 11, oy - 5], [X(15) + 21, oy]);
    T.line([X(15) + 11, oy + 5], [X(15) + 21, oy]);
    T.pause(120);
    for (i = 2; i <= 15; i++) {
      T.line([X(i), oy - 4], [X(i), oy + 4]);
      var t = String(i), w = T.adv(t, 0.45);
      T.str(t, X(i) - w / 2, oy + 0.83 * F, null, 0.45);
      T.pause(50);
    }
    T.pause(200);
    var pts = [], x;
    for (x = 3.5; x <= 14.5 + 1e-9; x += 0.25) {
      pts.push([X(x), oy - 2 - H * Math.exp(-(x - 9) * (x - 9) / 8)]);
    }
    acts.push({ kind: 'stroke', pts: pts });
    T.stepEnd();

    /* ---- a) ---- */
    figurBubble(268, [
      [['Kurvan är symmetrisk kring']],
      [['medelvärdet, så toppen ligger']],
      [['rakt ovanför det. Jag läser av']],
      [['var toppen är.']]
    ]);
    dashLine(T, [X(9), oy - H + 4], [X(9), oy - 6], 11, BLUE);
    T.pause(200);
    var w9 = T.adv('9', 0.45);
    T.ring(X(9) - w9 / 2 - 2, X(9) + w9 / 2 + 2, oy + 0.83 * F,
           { cy: oy + 0.83 * F - 0.20 * F, ry: 0.30 * F });
    T.stepEnd();

    y = 440;
    T.str('a) toppen ligger vid 9', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 9', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Standardavvikelsen är ett']],
      [['spridningsmått. Stor spridning']],
      [['ger en bred och låg kurva, liten']],
      [['spridning en smal och hög.']]
    ]);
    y += 3.0 * F;
    T.str('b) bredast och lägst: kurva A', padL, y);
    T.stepEnd();

    tanke(y, [
      [['A är bredast och lägst, alltså']],
      [['störst standardavvikelse. D är']],
      [['smalast och högst, minst.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Kurva A', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: fyra ekvationer ----
   * a) 8^x = 15 logaritmeras; b) konjugat- och kvadreringsregeln, sedan
   * −x², −25 och /10 i båda led; c) i² = −1 ger x² = −4 och roten ur ett
   * negativt tal; d) kvadraten utvecklas med kvadreringsregeln, 3^x
   * multipliceras in med en båge per term, allt utom x² tar ut varandra.
   * EKVVAL-scen: operationerna i b) och c) skrivs i båda led eller på
   * väggen (cfg.vagg), med samma antal klicksteg. */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T), samla = mkSamla(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xwB = padL + 30 + T.adv('x^2-25=x^2+10x+25') + 0.9 * F;
    var xwC = padL + 30 + T.adv('x^2-1=−5') + 0.9 * F;

    /* ---- a) 8^x = 15 ---- */
    y = 118;
    T.str('a) 8^x=15', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x står i exponenten. Jag']],
      [['logaritmerar båda led.']]
    ]);
    y += 2.6 * F;
    T.str('lg 8^x=lg 15', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen lg a^x=x·lg a']],
      [['flyttar ned exponenten som']],
      [['en faktor.']]
    ]);
    y += 2.6 * F;
    T.str('x·lg 8=lg 15', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med lg 8.']],
      [['Svaret ska vara exakt, så']],
      [['kvoten lämnas som den är.']]
    ]);
    y += 3.4 * F;
    xx = T.str('x=', padL + 30, y);
    fracLift(T, F, 'lg 15', 'lg 8', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: x=', padL, y);
    xe = fracLift(T, F, 'lg 15', 'lg 8', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) (x+5)(x−5) = (x+5)² ---- */
    y += 4.0 * F;
    T.str('b) (x+5)(x-5)=(x+5)^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Vänsterledet är ett konjugatpar:']],
      [['(a+b)(a-b)=a^2-b^2, med a=x']],
      [['och b=5.']]
    ]);
    /* två regler på samma rad = två klicksteg: konjugatregeln skrivs och
     * pennan stannar med noten uppe; vid nästa klick tonar den ut, kvadre-
     * ringsregeln tonar in och kvadraten utvecklas (REGEL EN REGELNOT PER
     * KLICKSTEG) */
    y += 3.6 * F;
    var nK = regelNot(T, F, 'Konjugatregeln: (a + b)(a − b) = a² − b²', padL, y - 1.45 * F);
    xx = T.str('x^2-25', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Högerledet är en kvadrat:']],
      [['(a+b)^2=a^2+2ab+b^2 med a=x']],
      [['och b=5.']]
    ]);
    regelGom(T, nK);
    var nQ = regelNot(T, F, 'Kvadreringsregeln: (a + b)² = a² + 2ab + b²', padL, y - 1.45 * F);
    T.str('=x^2+10x+25', xx, y);
    regelGom(T, nQ);
    T.stepEnd();

    tanke(y, [
      [['x^2 finns i båda led. Jag']],
      [['subtraherar x^2 från båda led,']],
      [['så försvinner kvadrattermen.']]
    ]);
    y = ekvOp(y, '-x^2', xwB, 'x^2-25=x^2+10x+25');
    T.str('−25=10x+25', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['25 adderas i högerledet, så jag']],
      [['subtraherar 25 från båda led.']]
    ]);
    y = ekvOp(y, '-25', xwB, '−25=10x+25');
    T.str('−50=10x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 10, så jag']],
      [['dividerar båda led med 10.']]
    ]);
    y = ekvOp(y, '/10', xwB, '−50=10x');
    T.str('x=−5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: x=−5 ger 0·(−10)=0 i']],
      [['vänsterledet och 0^2=0 i höger-']],
      [['ledet. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x=−5', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) x² + i² = −5 ---- */
    y += 3.0 * F;
    T.str('c) x^2+i^2=−5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Den imaginära enheten är']],
      [['definierad så att i^2=−1.']]
    ]);
    y += 2.4 * F;
    T.str('x^2-1=−5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['1 subtraheras i vänsterledet,']],
      [['så jag adderar 1 till båda led.']]
    ]);
    y = ekvOp(y, '+1', xwC, 'x^2-1=−5');
    T.str('x^2=−4', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Inget reellt tal har kvadraten']],
      [['−4. Men √(−4)=√4·√(−1)=2i,']],
      [['så ekvationen har två komplexa']],
      [['lösningar.']]
    ]);
    y += 2.6 * F;
    xx = T.str('x=±', padL + 30, y);
    xx = T.rot('−4', xx + 0.08 * F, y);
    T.str('=±2i', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: x=±2i', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- d) (x+3^x)² − 3^x(3^x+2x) = 9 ----
     * Hela ekvationen skrivs om rad för rad (REGEL HELA EKVATIONEN, se
     * filhuvudet): kvadraten utvecklas med regelnoten uppe, produkten
     * multipliceras in på samma rad med bågar, parentesen tas bort med
     * blått teckenbyte, termerna som tar ut varandra ringas, och roten
     * dras som egen rad. */
    y += 3.0 * F;
    var yD = y;
    xx = T.str('d) (x+3^x)^2-', padL, y);
    var f0 = xx; xx = T.str('3^x', xx, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t0 = xx; xx = T.str('3^x', xx, y); var t1 = xx;
    var u0 = xx; xx = T.str('+2x', xx, y); var u1 = xx;
    T.str(')=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Första kvadreringsregeln på']],
      [['(x+3^x)^2, med a=x och b=3^x:']],
      [['dubbla produkten är 2x·3^x och']],
      [['(3^x)^2=3^2^x.']]
    ]);
    y += 3.6 * F;
    var nQ = regelNot(T, F, 'Kvadreringsregeln: (a + b)² = a² + 2ab + b²', padL, y - 1.45 * F);
    xx = T.str('x^2+2x·3^x+3^2^x', padL, y);
    regelGom(T, nQ);
    T.stepEnd();

    tanke(y, [
      [['Kvar är −3^x(3^x+2x). Jag behåller']],
      [['minustecknet och parentesen och']],
      [['multiplicerar in 3^x: 3^x·3^x=3^2^x']],
      [['och 3^x·2x=2x·3^x.']]
    ]);
    xx = T.str('-(', xx, y);
    xx = multIn(xx, y, yD - 0.95 * F, [
      { fran: [f0, f1], till: [t0, t1], skriv: '3^2^x', hojd: 26 },
      { fran: [f0, f1], till: [u0, u1], skriv: '+2x·3^x', hojd: 42, dx: 4 }
    ]);
    T.str(')=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Minus framför parentesen byter']],
      [['tecken på varje term inuti:']],
      [['+3^2^x blir −3^2^x och +2x·3^x']],
      [['blir −2x·3^x.']]
    ]);
    y += 2.6 * F;
    var yS = y;
    xx = T.str('x^2', padL, y);
    var b0 = xx; xx = T.str('+2x·3^x', xx, y); var b1 = xx;
    var c0 = xx; xx = T.str('+3^2^x', xx, y); var c1 = xx;
    var d0 = xx; xx = T.str('-', xx, y, BLUE); xx = T.str('3^2^x', xx, y); var d1 = xx;
    var e0 = xx; xx = T.str('-', xx, y, BLUE); xx = T.str('2x·3^x', xx, y); var e1 = xx;
    T.str('=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['3^2^x-3^2^x=0 och 2x·3^x-2x·3^x=0:']],
      [['termerna tar ut varandra parvis.']],
      [['Kvar blir bara x^2.']]
    ]);
    y += 2.6 * F;
    samla(padL + 30, y, [
      { skriv: 'x^2' },
      { ringar: [[b0 + T.adv('+'), b1, yS], [e0, e1, yS]], skriv: '' },
      { ringar: [[c0 + T.adv('+'), c1, yS], [d0, d1, yS]], skriv: '' },
      { skriv: '=9' }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led. Både 3 och −3']],
      [['har kvadraten 9, så det blir ±.']]
    ]);
    y += 2.6 * F;
    xx = T.str('x=±', padL + 30, y);
    T.rot('9', xx + 0.08 * F, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('x=±3', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: x=±3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 5: lg 3^a − lg 3^b = 8 lg 3 ----
   * Logaritmlagen lg x^n = n·lg x flyttar ned exponenterna, lg 3 bryts
   * ut och faktorerna framför lg 3 jämförs: a − b = 8. Ett exempel väljs. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('lg 3^a-lg 3^b=8·lg 3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen lg x^n=n·lg x']],
      [['flyttar ned exponenterna som']],
      [['faktorer framför lg 3.']]
    ]);
    y += 3.6 * F;
    var nL = regelNot(T, F, 'Logaritmlagen: lg xⁿ = n · lg x', padL, y - 1.45 * F);
    T.str('a·lg 3-b·lg 3=8·lg 3', padL + 30, y);
    regelGom(T, nL);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna i vänsterledet']],
      [['har faktorn lg 3, så jag']],
      [['bryter ut den.']]
    ]);
    y += 2.4 * F;
    var yJ = y;
    var g0 = padL + 30; xx = T.str('(a-b)', g0, y); var g1 = xx;
    xx = T.str('·lg 3=', xx, y);
    var h0 = xx; xx = T.str('8', xx, y); var h1 = xx;
    T.str('·lg 3', xx, y);
    T.stepEnd();

    /* jämförelsen: de två faktorerna framför lg 3 ringas in innan
     * slutsatsen skrivs (REGEL JÄMFÖRELSE MED RINGAR) */
    tanke(y, [
      [['Båda led är ett tal gånger lg 3,']],
      [['och lg 3 är inte noll. Likheten']],
      [['gäller precis när talen framför']],
      [['är lika.']]
    ]);
    var ringJ = substRings(acts, [[g0, g1, yJ, F], [h0, h1, yJ, F]]);
    y += 2.4 * F;
    T.str('a-b=8', padL + 30, y);
    fadeRings(acts, ringJ);
    T.stepEnd();

    tanke(y, [
      [['Alla talpar med differensen 8']],
      [['duger. Jag väljer a=10 och b=2.']],
      [['Kontroll: 10·lg 3-2·lg 3=8·lg 3.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Till exempel a=10 och b=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: 1 < lg x < 3 ----
   * Gränserna översätts till tiopotenser: lg 10 = 1 och lg 1000 = 3, och
   * eftersom logaritmen växer med x ligger x mellan 10 och 1000. */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('1<lg x<3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['lg x är den exponent som 10 ska']],
      [['upphöjas till för att ge x.']],
      [['lg x=1 betyder x=10^1 och']],
      [['lg x=3 betyder x=10^3.']]
    ]);
    y += 2.6 * F;
    T.str('lg 10=1 och lg 1000=3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmen växer när x växer,']],
      [['så lg x ligger mellan 1 och 3']],
      [['precis när x ligger mellan 10']],
      [['och 1000. Gränserna ingår inte.']]
    ]);
    y += 2.6 * F;
    T.str('10<x<1000', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 10<x<1000', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 7: 2x^(−1/2) + 3x^(−1/2) + 4x^(−1/2) = 3 ----
   * Termerna samlas till 9·x^(−1/2), båda led divideras med 9 (bråkrad
   * med egenritad täljare), potensen skrivs om till 1/√x, roten löses ut
   * och båda led kvadreras. Bråkexponenten ritas med fracSup, aldrig med
   * snedstreck. EKVVAL-scen: "/9" i båda led eller på väggen. */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    /* potensen x^(−1/2) som egenritad del: 'x^−' följt av bråkexponent */
    function potW(pre) { return T.adv(pre + 'x^−') + T.fracSupW('1', '2'); }
    function pot(pre, x, yb) {
      var xx = T.str(pre + 'x^−', x, yb);
      return T.fracSup('1', '2', xx, yb);
    }
    var xw = padL + 30 + potW('9·') + T.adv('=3') + 0.9 * F;

    /* första raden är bred: den läggs under mobilzonen (x>420, y<210) */
    y = 236;
    xx = pot('2·', padL, y);
    xx = pot('+3·', xx, y);
    xx = pot('+4·', xx, y);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Alla tre termer innehåller samma']],
      [['potens. De läggs ihop som']],
      [['2y+3y+4y=9y.']]
    ]);
    y += 2.6 * F;
    xx = pot('9·', padL + 30, y);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Potensen multipliceras med 9, så']],
      [['jag dividerar båda led med 9.']]
    ]);
    y = ekvOp(y, '/9', xw, function (yb) {
      var num = { w: potW('9·'), draw: function (x, yy) { pot('9·', x, yy); } };
      var x2 = fracCustom(T, F, num, '9', padL + 30, yb, BLUE);
      x2 = T.str('=', x2, yb);
      T.fracH('3', '9', x2, yb, null, BLUE);
    }, { dy: 3.0, dyRes: 2.9, vopt: { h0: 1.25, h1: 1.15 } });
    xx = pot('', padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '3', xx, y);
    T.stepEnd();

    /* två omskrivningar av potensen, en per rad (REGEL POTENSER SKRIVS OM
     * ETT STEG I TAGET): först bort med minustecknet i exponenten, sedan
     * exponenten 1/2 som rottecken */
    tanke(y, [
      [['En negativ exponent betyder']],
      [['inverterat tal: x^(−1/2) är 1']],
      [['delat med x^(1/2).']]
    ], 1.05);
    y += 3.8 * F;
    var denP = { w: T.adv('x^') + T.fracSupW('1', '2'), sink: 0.34,
                 draw: function (x, yy) { T.fracSup('1', '2', T.str('x^', x, yy), yy); } };
    xx = fracCustom(T, F, '1', denP, padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Exponenten 1/2 betyder']],
      [['kvadratrot: x^(1/2) är √x.']]
    ], 1.2);
    y += 3.8 * F;
    var den = { w: T.rotW('x'), draw: function (x, yy) { T.rot('x', x, yy); } };
    xx = fracCustom(T, F, '1', den, padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Två bråk med täljaren 1 är lika']],
      [['precis när nämnarna är lika.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.rot('x', padL + 30, y);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kvadrera båda led så försvinner']],
      [['roten: 3^2=9.']]
    ]);
    y += 2.6 * F;
    T.str('x=3^2=9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 9^(−1/2)=1/√9=1/3, och']],
      [['(2+3+4)·1/3=3. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x=9', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 8: datorns värde som funktion av tiden i år ----
   * Förändringsfaktorn per månad är 0,95. På t år går det 12t månader,
   * så exponenten blir 12t. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    /* raden är bred: den läggs under mobilzonen (x>420, y<150) */
    y = 180;
    T.str('5 % minskning per månad', padL, y - 1.45 * F, null, 0.62);
    T.str('förändringsfaktor: 1-0,05=0,95', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Varje månad multipliceras värdet']],
      [['med 0,95: en gång efter en']],
      [['månad, två gånger efter två.']]
    ]);
    y += 3.5 * F;
    T.str('Efter 1 månad', padL, y - 1.45 * F, null, 0.62);
    T.str('32 997·0,95', padL, y);
    T.stepEnd();

    y += 3.5 * F;
    T.str('Efter 2 månader', padL, y - 1.45 * F, null, 0.62);
    T.str('32 997·0,95^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett år är 12 månader, så efter']],
      [['ett år har värdet multiplicerats']],
      [['med 0,95 tolv gånger.']]
    ]);
    y += 3.5 * F;
    T.str('Efter 12 månader, alltså 1 år', padL, y - 1.45 * F, null, 0.62);
    T.str('32 997·0,95^1^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Antalet månader är 12 gånger']],
      [['antalet år: 2 år är 24 månader,']],
      [['t år är 12·t månader. Exponenten']],
      [['är antalet månader.']]
    ]);
    y += 3.5 * F;
    T.str('Efter t år, alltså 12·t månader', padL, y - 1.45 * F, null, 0.62);
    T.str('V(t)=32 997·0,95^1^2^t', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: efter ett år är']],
      [['32 997·0,95^1^2≈17 800 kr,']],
      [['ungefär en halvering. Rimligt']],
      [['med 5 % i månaden.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: V(t)=32 997·0,95^1^2^t', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: oändligt många lösningar ----
   * Båda ekvationerna skrivs på formen y = kx + m (systemklammer), m är
   * redan 3 i båda, och riktningskoefficienterna sätts lika.
   * EKVVAL-scen: "+2Ax", "/3", "−6", "/(−2)" och "·3" i båda led eller på
   * väggen. Första raden ligger vid y=240 (mobilzonen x>420, y<210). */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('−2y=6Bx-6') + 0.9 * F;

    y = 240;
    var y1 = y, y2 = y + 2.2 * F, xs = sysX(F, padL + 12);
    sysBrace(T, F, padL + 12, y1 - 0.9 * F, y2 + 0.35 * F);
    T.str('3y-2Ax=9', xs, y1);
    T.pause(150);
    T.str('6-2y=6Bx', xs, y2);
    y = y2;
    T.stepEnd();

    tanke(y, [
      [['Varje ekvation är en rät linje.']],
      [['Oändligt många lösningar betyder']],
      [['att det är samma linje: samma k']],
      [['och samma m. Jag löser ut y.']]
    ]);
    y += 3.2 * F;
    T.str('Löser ut y ur första ekvationen', padL, y - 1.45 * F, null, 0.62);
    T.str('3y-2Ax=9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['2Ax subtraheras i vänsterledet,']],
      [['så jag adderar 2Ax till båda led.']]
    ]);
    y = ekvOp(y, '+2Ax', xw, '3y-2Ax=9');
    T.str('3y=2Ax+9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['y multipliceras med 3, så jag']],
      [['dividerar båda led med 3.']]
    ]);
    y = ekvOp(y, '/3', xw, '3y=2Ax+9');
    xx = T.str('y=', padL + 30, y);
    xx = T.fracH('2A', '3', xx, y);
    T.str('x+3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samma sak med den andra']],
      [['ekvationen. Först subtraherar']],
      [['jag 6 från båda led.']]
    ], 1.05);
    y += 4.4 * F;
    T.str('Löser ut y ur andra ekvationen', padL, y - 1.45 * F, null, 0.62);
    T.str('6-2y=6Bx', padL + 30, y);
    T.stepEnd();

    y = ekvOp(y, '-6', xw, '6-2y=6Bx');
    T.str('−2y=6Bx-6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['y multipliceras med −2, så jag']],
      [['dividerar båda led med −2.']],
      [['Tecknen byts.']]
    ]);
    y = ekvOp(y, '/(−2)', xw, '−2y=6Bx-6');
    T.str('y=−3Bx+3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Båda linjerna har m=3. De är']],
      [['samma linje om också k är lika.']]
    ]);
    y += 3.6 * F;
    T.str('Samma linje kräver samma k', padL, y - 1.45 * F, null, 0.62);
    xx = T.fracH('2A', '3', padL + 30, y);
    T.str('=−3B', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråket försvinner om jag']],
      [['multiplicerar båda led med 3.']]
    ], 1.05);
    y = ekvOp(y, '·3', xw, function (yb) {
      var x2 = T.fracH('2A', '3', padL + 30, yb);
      x2 = T.str('·3', x2, yb, BLUE);
      x2 = T.str('=−3B', x2, yb);
      T.str('·3', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 2.6, vopt: { h0: 1.25, h1: 1.15 } });
    T.str('2A=−9B', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 2A=−9B', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= DELPROV C ================= */

  /* ---- Uppgift 10: x² + 10x + 16 = 0 med pq-formeln ----
   * Formeln skrivs under en liten rubrik med rottecknet ritat över
   * parentesbråket, p och q identifieras och ringas in vid insättningen.
   * Halva p är 5, under roten står 25 − 16 = 9, rötterna −2 och −8. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('x^2+10x+16=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ekvationen har redan formen']],
      [['x^2+px+q=0, med 1 framför x^2.']],
      [['Då kan jag använda pq-formeln']],
      [['direkt.']]
    ]);
    y += 4.9 * F;
    T.str('pq-formeln', padL, y - 2.55 * F, null, 0.62);
    xx = T.str('x=−', padL, y);
    xx = T.fracH('p', '2', xx, y);
    xx = pm(T, F, xx, y);
    rotParen(T, F, 'p', '2', '-q', xx, y);
    T.stepEnd();

    tanke(y, [
      [['p är talet framför x och q är']],
      [['konstanten.']]
    ], 1.2);
    y += 3.6 * F;
    xx = T.str('p=', padL + 30, y);
    var p0 = xx; xx = T.str('10', xx, y); var p1 = xx;
    xx = T.str(', q=', xx, y);
    var q0 = xx; xx = T.str('16', xx, y); var q1 = xx;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in p=10 och q=16']],
      [['i formeln.']]
    ]);
    var ringar = substRings(acts, [[p0, p1, y, F], [q0, q1, y, F]]);
    y += 4.4 * F;
    xx = T.str('x=−', padL, y);
    xx = T.fracH('10', '2', xx, y);
    xx = pm(T, F, xx, y);
    rotParen(T, F, '10', '2', '-16', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Halva p är 5, och 5^2=25.']],
      [['Under roten står 25-16.']]
    ], 1.2);
    y += 3.6 * F;
    xx = T.str('=−5±', padL + 30, y);
    xx = T.rot('25-16', xx + 0.08 * F, y);
    T.stepEnd();

    tanke(y, [
      [['25-16=9 är positivt, så']],
      [['ekvationen har två reella']],
      [['lösningar, och √9=3.']]
    ]);
    xx = T.str('=−5±', xx, y);
    xx = T.rot('9', xx + 0.08 * F, y);
    T.str('=−5±3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Plustecknet ger den ena roten']],
      [['och minustecknet den andra.']]
    ]);
    y += 2.6 * F;
    T.str('x_1=−5+3=−2', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('x_2=−5-3=−8', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: (−2)^2+10·(−2)+16=']],
      [['4-20+16=0 och (−8)^2+10·(−8)+16=']],
      [['64-80+16=0. Båda stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x_1=−2 och x_2=−8', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 11: äpplen och päron ----
   * a) y − x = 2 säger att y är 2 kr mer än x: y är de röda äpplenas
   * kilopris. b) z löses ut ur den tredje ekvationen, y ur den första,
   * båda sätts in i den andra (ringar), 2,5 multipliceras in med en båge
   * per term, lika termer samlas med ringar, och x löses ut.
   * EKVVAL-scen: "+z", "−85", "+x", "−25" och "/5" i båda led eller på
   * väggen. Systemet ligger under y=210 (mobilzonen i ekvval-scener). */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T), samla = mkSamla(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('105=85+z') + 0.9 * F;
    var xw2 = padL + 30 + T.adv('5x+25=105') + 0.9 * F;

    /* ---- a) ---- (raderna är breda: under mobilzonen x>420, y<210) */
    y = 236;
    T.str('y-x=2: y är 2 kr mer än x', padL, y - 1.45 * F, null, 0.62);
    T.str('a) y = röda äpplenas kilopris', padL, y);
    T.stepEnd();

    tanke(y, [
      [['De röda äpplena kostar 2 kr mer']],
      [['per kilo än de gröna. Så x är']],
      [['de grönas kilopris, y de rödas']],
      [['och z päronens.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Kilopriset för röda äpplen', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) systemet ---- */
    y += 3.6 * F;
    var xb = T.str('b) ', padL, y);
    var y1 = y, y2 = y + 2.2 * F, y3 = y2 + 2.2 * F, xs = sysX(F, xb + 6);
    sysBrace(T, F, xb + 6, y1 - 0.9 * F, y3 + 0.35 * F);
    T.str('y-x=2', xs, y1);
    T.pause(150);
    xx = T.str('2,5x+2,5', xs, y2);
    var ey0 = xx; xx = T.str('y', xx, y2); var ey1 = xx;
    xx = T.str('+', xx, y2);
    var ez0 = xx; xx = T.str('z', xx, y2); var ez1 = xx;
    T.str('=105', xx, y2);
    T.pause(150);
    T.str('105-z=85', xs, y3);
    y = y3;
    T.stepEnd();

    /* ---- z ur den tredje ekvationen ---- */
    tanke(y, [
      [['Den tredje ekvationen har bara']],
      [['z. Jag adderar z till båda led.']]
    ]);
    y += 3.0 * F;
    T.str('105-z=85', padL + 30, y);
    T.stepEnd();

    y = ekvOp(y, '+z', xw, '105-z=85');
    T.str('105=85+z', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sedan subtraherar jag 85 från']],
      [['båda led.']]
    ]);
    y = ekvOp(y, '-85', xw, '105=85+z');
    xx = T.str('z=', padL + 30, y);
    var z0 = xx; xx = T.str('20', xx, y); var z1 = xx;
    var yZ = y;
    T.stepEnd();

    /* ---- y ur den första ekvationen ---- */
    tanke(y, [
      [['Ur den första ekvationen löser']],
      [['jag ut y: x adderas till båda led.']]
    ]);
    y += 3.0 * F;
    T.str('y-x=2', padL + 30, y);
    T.stepEnd();

    y = ekvOp(y, '+x', xw, 'y-x=2');
    xx = T.str('y=', padL + 30, y);
    var v0 = xx; xx = T.str('x+2', xx, y); var v1 = xx;
    var yV = y;
    T.stepEnd();

    /* ---- insättning i den andra ekvationen ---- */
    tanke(y, [
      [['Nu sätter jag in x+2 i stället']],
      [['för y och 20 i stället för z i']],
      [['den andra ekvationen.']]
    ]);
    var ringar = substRings(acts, [[v0, v1, yV, F], [z0, z1, yZ, F],
                                   [ey0, ey1, y2, F], [ez0, ez1, y2, F]]);
    y += 3.6 * F;
    var yK = y;
    xx = T.str('2,5x+', padL + 30, y);
    var f0 = xx; xx = T.str('2,5', xx, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t0 = xx; xx = T.str('x', xx, y); var t1 = xx;
    var u0 = xx; xx = T.str('+2', xx, y); var u1 = xx;
    xx = T.str(')+20=105', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['2,5 multipliceras med varje term']],
      [['i parentesen: 2,5·x=2,5x och']],
      [['2,5·2=5.']]
    ]);
    y += 2.6 * F;
    var yS = y;
    var a0 = padL + 30; xx = T.str('2,5x', a0, y); var a1 = xx;
    var delar = [
      { fran: [f0, f1], till: [t0, t1], skriv: '+2,5x', hojd: 26, dx: -3 },
      { fran: [f0, f1], till: [u0, u1], skriv: '+5', hojd: 42, dx: 3 }
    ];
    xx = multIn(xx, y, yK - 0.95 * F, delar);
    var c0 = xx; xx = T.str('+20', xx, y); var c1 = xx;
    T.str('=105', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samla lika termer: 2,5x+2,5x=5x']],
      [['och 5+20=25.']]
    ]);
    y += 2.6 * F;
    xx = samla(padL + 30, y, [
      { ringar: [[a0, a1, yS], [delar[0].x0 + T.adv('+'), delar[0].x1, yS]], skriv: '5x' },
      { ringar: [[delar[1].x0 + T.adv('+'), delar[1].x1, yS], [c0 + T.adv('+'), c1, yS]], skriv: '+25' },
      { skriv: '=105' }
    ]);
    T.stepEnd();

    tanke(y, [
      [['25 adderas i vänsterledet, så']],
      [['jag subtraherar 25 från båda led.']]
    ]);
    y = ekvOp(y, '-25', xw2, '5x+25=105');
    T.str('5x=80', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 5, så jag']],
      [['dividerar båda led med 5.']]
    ]);
    y = ekvOp(y, '/5', xw2, '5x=80');
    xx = T.str('x=', padL + 30, y);
    var w0 = xx; xx = T.str('16', xx, y); var w1 = xx;
    var yX = y;
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in x=16 i']],
      [['uttrycket för y.']]
    ]);
    var ringar2 = substRings(acts, [[w0, w1, yX, F], [v0, v0 + T.adv('x'), yV, F]]);
    y += 2.6 * F;
    T.str('y=16+2=18', padL + 30, y);
    fadeRings(acts, ringar2);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 2,5·16+2,5·18+20=']],
      [['40+45+20=105. Stämmer. Svaret']],
      [['ska säga vad som kostar vad.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Röda äpplen 18 kr/kg,', padL, y);
    T.underline(xe, y);
    y += 1.9 * F;
    xe = T.str('gröna äpplen 16 kr/kg och', padL, y);
    T.underline(xe, y);
    y += 1.9 * F;
    xe = T.str('päron 20 kr/kg', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 12: f(x) = 4x + m med f(6) = 9 ----
   * Linjen skrivs med känd lutning, punkten (6, 9) sätts in (ringar) och
   * m löses ut. EKVVAL-scen: "−24" i båda led eller på väggen. */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('9=24+m') + 0.9 * F;

    y = 118;
    T.str('Rät linje med k=4', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('f(', padL, y);
    var v0 = xx; xx = T.str('x', xx, y); var v1 = xx;
    xx = T.str(')=4', xx, y);
    var w0 = xx; xx = T.str('x', xx, y); var w1 = xx;
    T.str('+m', xx, y);
    var yF = y;
    T.stepEnd();

    tanke(y, [
      [['f(6)=9 betyder att x=6 ger']],
      [['funktionsvärdet 9. Jag sätter in']],
      [['x=6 och f(x)=9.']]
    ]);
    y += 2.6 * F;
    xx = T.str('f(', padL + 30, y);
    var s0 = xx; xx = T.str('6', xx, y); var s1 = xx;
    xx = T.str(')=', xx, y);
    var r0 = xx; xx = T.str('9', xx, y); var r1 = xx;
    var yS = y;
    T.stepEnd();

    var ringar = substRings(acts, [[s0, s1, yS, F], [r0, r1, yS, F], [v0, v1, yF, F], [w0, w1, yF, F]]);
    y += 2.6 * F;
    T.str('9=4·6+m', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    y += 2.4 * F;
    T.str('9=24+m', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['24 adderas i högerledet, så jag']],
      [['subtraherar 24 från båda led.']]
    ]);
    y = ekvOp(y, '-24', xw, '9=24+m');
    T.str('m=9-24=−15', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: f(6)=4·6-15=24-15=9.']],
      [['Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: f(x)=4x-15', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 13: minsta värdet av 2(x+1)² − x(x+4) ----
   * Kvadraten utvecklas under en liten rubrik, båda faktorerna
   * multipliceras in med en båge per term i samma led, lika termer
   * samlas med ringar, och x² ≥ 0 ger minsta värdet 2 vid x = 0. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T), samla = mkSamla(T);

    y = 132;
    T.str('2(x+1)^2-x(x+4)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Första kvadreringsregeln på']],
      [['(x+1)^2, med a=x och b=1.']]
    ]);
    y += 3.6 * F;
    var yK = y;
    var nQ = regelNot(T, F, 'Kvadreringsregeln: (a + b)² = a² + 2ab + b²', padL, y - 1.45 * F);
    xx = T.str('=', padL, y);
    var f0 = xx; xx = T.str('2', xx, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t0 = xx; xx = T.str('x^2', xx, y); var t1 = xx;
    var u0 = xx; xx = T.str('+2x', xx, y); var u1 = xx;
    var v0 = xx; xx = T.str('+1', xx, y); var v1 = xx;
    xx = T.str(')', xx, y);
    var g0 = xx; xx = T.str('-x', xx, y); var g1 = xx;
    xx = T.str('(', xx, y);
    var p0 = xx; xx = T.str('x', xx, y); var p1 = xx;
    var q0 = xx; xx = T.str('+4', xx, y); var q1 = xx;
    T.str(')', xx, y);
    regelGom(T, nQ);
    T.stepEnd();

    tanke(y, [
      [['2 multipliceras med varje term']],
      [['i första parentesen, och −x']],
      [['med varje term i den andra.']],
      [['Båda i samma led.']]
    ]);
    y += 2.6 * F;
    var yS = y;
    xx = T.str('=', padL, y);
    var delar = [
      { fran: [f0, f1], till: [t0, t1], skriv: '2x^2', hojd: 24, dx: -4, dx2: -4 },
      { fran: [f0, f1], till: [u0, u1], skriv: '+4x', hojd: 38 },
      { fran: [f0, f1], till: [v0, v1], skriv: '+2', hojd: 50, dx: 4 },
      { fran: [g0, g1], till: [p0, p1], skriv: '-x^2', hojd: 24, dx: -3 },
      { fran: [g0, g1], till: [q0, q1], skriv: '-4x', hojd: 38, dx: 3 }
    ];
    multIn(xx, y, yK - 0.95 * F, delar);
    T.stepEnd();

    tanke(y, [
      [['Samla lika termer: 2x^2-x^2=x^2,']],
      [['och 4x-4x tar ut varandra. Kvar']],
      [['blir bara konstanten 2.']]
    ]);
    y += 2.6 * F;
    samla(padL + 30, y, [
      { ringar: [[delar[0].x0, delar[0].x1, yS], [delar[3].x0, delar[3].x1, yS]], skriv: '=x^2' },
      { ringar: [[delar[1].x0 + T.adv('+'), delar[1].x1, yS], [delar[4].x0, delar[4].x1, yS]], skriv: '' },
      { skriv: '+2' }
    ]);
    T.stepEnd();

    tanke(y, [
      [['En kvadrat är aldrig negativ:']],
      [['x^2≥0 för alla x, med likhet']],
      [['bara för x=0.']]
    ]);
    y += 2.6 * F;
    T.str('x^2≥0 ⇒ x^2+2≥2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Värdet 2 antas när x=0:']],
      [['0^2+2=2. Grafen y=x^2+2 har']],
      [['minimipunkten (0, 2).']]
    ]);
    y += 2.4 * F;
    T.str('minst för x=0: 0^2+2=2', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: Minsta värdet är 2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: L₁ parallell med y = 4x/3 + 3 ----
   * Parallella linjer har samma k. Lutningen ur de två punkterna är 2a,
   * som sätts lika med 4/3: båda led gånger 3 och delat med 6. Sedan
   * sätts punkten (1, −4) in i y = 4x/3 + m, båda led gånger 3, och m
   * löses ut. EKVVAL-scen med "·3", "/6", "·3", "−4" och "/3". */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('−12=4+3m') + 0.9 * F;

    /* andra raden är bred: den ska ligga under mobilzonen (x>420, y<210) */
    y = 140;
    T.str('Parallella linjer har samma k', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('k=', padL, y);
    T.fracH('4', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Lutningen mellan de två punkterna']],
      [['är Δy delat med Δx:']],
      [['2a-(−6a)=8a och 5-1=4.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('k=', padL, y);
    xx = T.fracH('2a-(−6a)', '5-1', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('8a', '4', xx, y);
    T.str('=2a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['De två uttrycken för k måste']],
      [['vara lika.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('2a=', padL + 30, y);
    T.fracH('4', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråket försvinner om jag']],
      [['multiplicerar båda led med 3.']]
    ], 1.05);
    y = ekvOp(y, '·3', xw, function (yb) {
      var x2 = T.str('2a', padL + 30, yb);
      x2 = T.str('·3', x2, yb, BLUE);
      x2 = T.str('=', x2, yb);
      x2 = T.fracH('4', '3', x2, yb);
      T.str('·3', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 2.6, vopt: { h0: 1.25, h1: 1.15 } });
    T.str('6a=4', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['a multipliceras med 6, så jag']],
      [['dividerar båda led med 6, och']],
      [['förkortar 4/6 med 2.']]
    ]);
    y = ekvOp(y, '/6', xw, '6a=4');
    xx = T.str('a=', padL + 30, y);
    xx = T.fracOp('4', '6', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('2', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Med a=2/3 är −6a=−4: den första']],
      [['punkten är (1, −4). Den ligger']],
      [['på linjen y=4x/3+m.']]
    ], 1.05);
    y += 4.4 * F;
    T.str('Sätter in punkten (1, −4) i y=kx+m', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('−4=', padL + 30, y);
    xx = T.fracH('4', '3', xx, y);
    T.str('·1+m', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bort med bråket: båda led']],
      [['multipliceras med 3.']]
    ], 1.05);
    y = ekvOp(y, '·3', xw, function (yb) {
      var x2 = T.str('−4', padL + 30, yb);
      x2 = T.str('·3', x2, yb, BLUE);
      x2 = T.str('=', x2, yb);
      x2 = storParen(T, F, x2 + 0.05 * F, yb, false, BLUE);
      x2 = T.fracH('4', '3', x2, yb);
      x2 = T.str('+m', x2, yb);
      x2 = storParen(T, F, x2 + 0.12 * F, yb, true, BLUE);
      T.str('·3', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 2.6, vopt: { h0: 1.25, h1: 1.15 } });
    T.str('−12=4+3m', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['4 adderas i högerledet, så jag']],
      [['subtraherar 4 från båda led.']]
    ]);
    y = ekvOp(y, '-4', xw, '−12=4+3m');
    T.str('−16=3m', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['m multipliceras med 3, så jag']],
      [['dividerar båda led med 3.']]
    ]);
    y = ekvOp(y, '/3', xw, '−16=3m');
    xx = T.str('m=−', padL + 30, y);
    T.fracH('16', '3', xx + 0.16 * F, y);   /* luft: minus och bråkstreck ligger i samma höjd */
    T.stepEnd();

    tanke(y, [
      [['Kontroll med den andra punkten']],
      [['(5, 4/3): 4/3·5-16/3=4/3.']],
      [['Stämmer.']]
    ], 1.05);
    y += 3.6 * F;
    xe = T.str('Svar: y=', padL, y);
    xe = T.fracH('4', '3', xe, y);
    xe = T.str('x-', xe, y);
    xe = T.fracH('16', '3', xe + 0.16 * F, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 15: x² + cx + 3 = c saknar reella rötter ----
   * c subtraheras från båda led, p och q identifieras, uttrycket under
   * rottecknet i pq-formeln ska vara negativt. Olikheten multipliceras
   * med 4, nollställena till c² + 4c − 12 bestäms och tecknet avgörs med
   * parabelns form. EKVVAL-scen: "−c" och "·4" i båda led eller på väggen. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('x^2+cx+3=c') + 0.9 * F;
    var xw2 = padL + 30 + T.fracW('c^2', '4') + T.adv('-3+c<0') + 0.9 * F;

    /* båda led-raden efter första raden är bred: under mobilzonen (y<210) */
    y = 174;
    T.str('x^2+cx+3=c', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ekvationen ska ha formen']],
      [['x^2+px+q=0. Jag subtraherar c']],
      [['från båda led.']]
    ]);
    y = ekvOp(y, '-c', xw, 'x^2+cx+3=c');
    T.str('x^2+cx+3-c=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['p är talet framför x: p=c.']],
      [['q är konstanten: q=3-c.']]
    ]);
    y += 4.9 * F;
    T.str('pq-formeln med p=c och q=3-c', padL, y - 2.55 * F, null, 0.62);
    xx = T.str('x=−', padL, y);
    xx = T.fracH('c', '2', xx, y);
    xx = pm(T, F, xx, y);
    rotParen(T, F, 'c', '2', '-(3-c)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Reella rötter saknas när talet']],
      [['under roten är negativt: då']],
      [['finns inget reellt tal att dra']],
      [['roten ur.']]
    ], 1.2);
    y += 4.4 * F;
    T.str('Reella rötter saknas om talet under roten är negativt', padL, y - 1.9 * F, null, 0.62);
    xx = T.parenFrac('c', '2', '2', padL + 30, y);
    T.str('-(3-c)<0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['(c/2)^2 är c^2/4, och minus']],
      [['framför parentesen byter tecken']],
      [['på 3 och −c.']]
    ], 1.2);
    y += 3.6 * F;
    xx = T.fracH('c^2', '4', padL + 30, y);
    T.str('-3+c<0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråket försvinner om jag']],
      [['multiplicerar båda led med 4.']],
      [['4 är positivt, så olikheten']],
      [['behåller riktningen.']]
    ], 1.05);
    y = ekvOp(y, '·4', xw2, function (yb) {
      var x2 = storParen(T, F, padL + 30, yb, false, BLUE);
      x2 = T.fracH('c^2', '4', x2, yb);
      x2 = T.str('-3+c', x2, yb);
      x2 = storParen(T, F, x2 + 0.12 * F, yb, true, BLUE);
      x2 = T.str('·4', x2, yb, BLUE);
      x2 = T.str('<0', x2, yb);
      T.str('·4', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 2.6, vopt: { h0: 1.25, h1: 1.15 } });
    T.str('c^2-12+4c<0', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('c^2+4c-12<0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['För att veta var uttrycket är']],
      [['negativt tar jag först reda på']],
      [['var det är noll: pq-formeln med']],
      [['p=4 och q=−12.']]
    ]);
    y += 3.6 * F;
    T.str('Nollställen till c^2+4c-12', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('c=−2±', padL + 30, y);
    xx = T.rot('4+12', xx + 0.08 * F, y);
    T.str('=−2±4', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('c_1=−6 och c_2=2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['y=c^2+4c-12 är en parabel som']],
      [['öppnar sig uppåt. Den ligger']],
      [['under axeln mellan sina']],
      [['nollställen. Kontroll: c=0']],
      [['ger −12<0.']]
    ]);
    y += 2.6 * F;
    T.str('−6<c<2', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: −6<c<2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 16: hur många gånger skär (lg x)^8 och x varandra? ----
   * Först utesluts x ≤ 0 (logaritmen finns inte där). Sedan jämförs f och
   * g i några punkter, en rad per punkt, och varje byte av vilken som är
   * störst betyder en skärning. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(x)=(lg x)^8 finns bara för x>0', padL, y - 1.45 * F, null, 0.62);
    T.str('x≤0: ingen skärning', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Där f går från större än g till']],
      [['mindre än g (eller tvärtom) måste']],
      [['graferna ha korsat varandra.']],
      [['Jag jämför f och g i några punkter.']]
    ]);
    y += 2.8 * F;
    T.str('f(0,1)=(−1)^8=1>0,1=g(0,1)', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('f(0,5)=(−0,30...)^8', padL, y);
    y += 2.2 * F;
    T.str('≈0,0001<0,5=g(0,5)', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Vid 0,1 ligger f över g, vid 0,5']],
      [['under. Där emellan skär graferna']],
      [['varandra, nära x≈0,16.']]
    ]);
    y += 2.6 * F;
    T.str('⇒ en skärning mellan 0,1 och 0,5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Mellan 0,5 och 10 är lg x som']],
      [['mest 1 till beloppet, så f är']],
      [['högst 1, medan g växer.']]
    ]);
    y += 2.8 * F;
    T.str('f(1)=0^8=0<1=g(1)', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('f(10)=1^8=1<10=g(10)', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('f(100)=2^8=256>100=g(100)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Vid 10 ligger f under g, vid 100']],
      [['över. En skärning till, nära']],
      [['x≈37,6.']]
    ]);
    y += 2.6 * F;
    T.str('⇒ en skärning mellan 10 och 100', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Två byten, alltså två']],
      [['skärningspunkter för x≤100.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Två gånger', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= DELPROV D ================= */

  /* ---- Uppgift 17: trädets höjd med spegeln ----
   * Scenen ritas i grafit: marken, en streckgubbe, spegeln, trädet och de
   * streckade siktlinjerna, med de givna måtten i blått. Likformigheten
   * ger x/13,2 = 1,70/2,10; båda led multipliceras med 13,2.
   * EKVVAL-scen: "·13,2" i båda led eller på väggen. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.fracW('x', '13,2') + T.adv('=') + T.fracW('1,70', '2,10') + 0.9 * F;
    var gy = 262, px = 104, mx = 166, tx = 344, eyeH = 40, treeH = 128;
    var eye = [px, gy - eyeH], top = [tx, gy - treeH], M = [mx, gy];
    var FIGB_Y = 350;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: marken, personen, spegeln och trädet */
    T.line([padL + 10, gy], [tx + 60, gy]);
    T.pause(120);
    cirkel(T, px, gy - eyeH - 2, 5, 16);
    T.line([px, gy - eyeH + 3], [px, gy - 14]);
    T.line([px, gy - 14], [px - 6, gy]);
    T.line([px, gy - 14], [px + 6, gy]);
    T.line([px, gy - 30], [px - 7, gy - 20]);
    T.line([px, gy - 30], [px + 7, gy - 20]);
    T.pause(120);
    T.line([mx - 12, gy - 2], [mx + 12, gy - 2]);
    T.str('spegel', mx - T.adv('spegel', 0.5) / 2, gy + 0.75 * F, null, 0.5);
    T.pause(120);
    T.line([tx - 30, gy], [tx, top[1]]);
    T.line([tx, top[1]], [tx + 30, gy]);
    T.line([tx - 30, gy], [tx + 30, gy]);
    T.stepEnd();

    /* steg 2: siktlinjerna, vinklarna v och måtten i blått */
    dashLine(T, eye, M, 9);
    dashLine(T, M, top, 15);
    T.pause(150);
    var m1 = bage(T, M, [mx - 30, gy], eye, 16);
    radLabel(T, F, 'v', M, m1, 28);
    var m2 = bage(T, M, top, [mx + 30, gy], 16);
    radLabel(T, F, 'v', M, m2, 28);
    T.pause(150);
    T.str('1,70', px - 26 - T.adv('1,70', 0.62), gy - eyeH / 2 + 6, BLUE, 0.62);
    lblC(T, F, '2,10', (px + mx) / 2, gy + 1.55 * F, BLUE);
    lblC(T, F, '13,2', (mx + tx) / 2, gy + 1.55 * F, BLUE);
    T.str('x', tx + 40, gy - treeH / 2 + 6, BLUE, 0.62);
    T.str('(m)', tx + 36, top[1] + 2, BLUE, 0.5);
    T.stepEnd();

    /* steg 3: likformigheten */
    figurBubble(268, [
      [['Den lilla triangeln (person,']],
      [['mark, siktlinje) och den stora']],
      [['(träd, mark, siktlinje) har båda']],
      [['en rät vinkel och vinkeln v:']],
      [['de är likformiga.']]
    ]);
    y = 430;
    T.str('Likformiga trianglar: höjd genom bas är lika', padL, y - 1.45 * F, null, 0.62);
    xx = T.fracH('x', '13,2', padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('1,70', '2,10', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x delas med 13,2, så jag']],
      [['multiplicerar båda led med 13,2.']]
    ], 1.05);
    y = ekvOp(y, '·13,2', xw, function (yb) {
      var x2 = T.fracH('x', '13,2', padL + 30, yb);
      x2 = T.str('·13,2', x2, yb, BLUE);
      x2 = T.str('=', x2, yb);
      x2 = T.fracH('1,70', '2,10', x2, yb);
      T.str('·13,2', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 3.2, vopt: { h0: 1.25, h1: 1.15 } });
    xx = T.str('x=', padL + 30, y);
    xx = T.fracH('1,70·13,2', '2,10', xx, y);
    xx = T.str('=10,685...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Mätvärdena har tre värdesiffror,']],
      [['så svaret ges med tre: 10,685...']],
      [['avrundas till 10,7.']]
    ], 1.05);
    T.str('≈10,7', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: trädet står drygt sex']],
      [['gånger så långt från spegeln som']],
      [['personen och är drygt sex gånger']],
      [['så högt som ögonhöjden.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: 10,7 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 18: hur många hade 1,70 eller högre? ----
   * Klockkurvan skissas över en axel med µ ± σ och µ ± 2σ; 1,70 är exakt
   * µ + 2σ. 95,4 % ligger inom två standardavvikelser, så 2,3 % ligger
   * ovanför, och andelen räknas om till personer. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ox = padL + 60, oy = 232, u = 165, H = 96;   /* axel: 0,10 … 1,70 */
    function X(v) { return ox + (v - 0.1) * u; }
    var FIGB_Y = 322;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axeln, skalstrecken och kurvan */
    T.line([X(0.1) - 40, oy], [X(1.7) + 50, oy]);
    T.line([X(1.7) + 41, oy - 5], [X(1.7) + 51, oy]);
    T.line([X(1.7) + 41, oy + 5], [X(1.7) + 51, oy]);
    T.pause(120);
    [0.1, 0.5, 0.9, 1.3, 1.7].forEach(function (v) {
      T.line([X(v), oy - 4], [X(v), oy + 4]);
      lblC(T, F, v.toFixed(2).replace('.', ','), X(v), oy + 0.75 * F, null, 0.45);
      T.pause(60);
    });
    T.pause(200);
    var pts = [], x;
    for (x = -0.25; x <= 2.05 + 1e-9; x += 0.05) {
      pts.push([X(x), oy - 2 - H * Math.exp(-(x - 0.9) * (x - 0.9) / (2 * 0.16))]);
    }
    acts.push({ kind: 'stroke', pts: pts });
    T.stepEnd();

    /* steg 2: µ och σ i blått */
    figurBubble(268, [
      [['Medelvärdet 0,90 ligger under']],
      [['toppen. Varje steg på 0,40 är']],
      [['en standardavvikelse.']]
    ]);
    dashLine(T, [X(0.9), oy - H + 2], [X(0.9), oy - 6], 9, BLUE);
    lblC(T, F, 'µ', X(0.9), oy + 1.45 * F, BLUE, 0.42);
    lblC(T, F, 'µ+σ', X(1.3), oy + 1.45 * F, BLUE, 0.42);
    lblC(T, F, 'µ-σ', X(0.5), oy + 1.45 * F, BLUE, 0.42);
    lblC(T, F, 'µ+2σ', X(1.7), oy + 1.45 * F, BLUE, 0.42);
    lblC(T, F, 'µ-2σ', X(0.1), oy + 1.45 * F, BLUE, 0.42);
    T.stepEnd();

    /* ---- räkningen ---- */
    figurBubble(268, [
      [['Från 0,90 till 1,70 är det 0,80,']],
      [['och det är två standard-']],
      [['avvikelser: 2·0,40=0,80.']]
    ]);
    y = 416;
    T.str('1,70=0,90+2·0,40=µ+2σ', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Inom två standardavvikelser från']],
      [['medelvärdet ligger 95,4 %. Resten']],
      [['delas lika mellan de två']],
      [['svansarna.']]
    ]);
    y += 4.4 * F;
    T.str('Andelen ovanför µ+2σ', padL, y - 2.1 * F, null, 0.62);
    xx = T.fracH('100 %-95,4 %', '2', padL + 30, y);
    T.str('=2,3 %', xx, y);
    T.pause(200);
    dashLine(T, [X(1.7), oy - 40], [X(1.7), oy - 6], 7, BLUE);
    T.str('2,3 %', X(1.7) + 8, oy - 30, BLUE, 0.5);
    T.stepEnd();

    tanke(y, [
      [['2,3 % av alla 76 483 personer.']],
      [['Antalet personer är ett heltal,']],
      [['och procentsatsen är avrundad,']],
      [['så svaret är ungefärligt.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('0,023·76 483=1759,1...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ungefär 1 760 personer.']]
    ]);
    T.str('≈1 760', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: Cirka 1 760 personer', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 19: linjen y = 3x − 1 flyttas ----
   * Linjen ritas i ett litet koordinatsystem; punkten (0, −1) flyttas två
   * steg åt höger och tre ned till (2, −4) (blå trappa). Lutningen är
   * oförändrad, m bestäms med den nya punkten, och den nya linjen ritas
   * i blått. EKVVAL-scen: "−6" i båda led eller på väggen. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('−4=6+m') + 0.9 * F;
    var ax = mkAxes(T, F, { ox: 200, oy: 212, u: 20,
                            xmin: -4, xmax: 4, ymin: -4, ymax: 4 });
    var FIGB_Y = 330;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axlarna och linjen */
    ax.axes();
    /* skalsiffran 1 på x-axeln utelämnas: trappstegets mått +2 står där */
    ax.ticks([-4, -3, -2, -1, 1, 2, 3, 4], [-4, -3, -2, -1, 1, 2, 3, 4],
             [], [1]);
    T.pause(150);
    ax.rule([ax.X(-1), ax.Y(-4)], [ax.X(1.66), ax.Y(3.98)]);
    T.str('y=3x-1', ax.X(-4.7), ax.Y(2.6), null, 0.5);
    T.stepEnd();

    /* steg 2: en punkt flyttas */
    figurBubble(268, [
      [['Enklast är punkten där linjen']],
      [['skär y-axeln, (0, −1). Två steg']],
      [['åt höger och tre ned ger']],
      [['(2, −4).']]
    ]);
    ax.dot(0, -1, BLUE);
    T.pause(120);
    /* +2 knuffas till stegets högra ände: mitt på steget står skalsiffran 1 */
    ax.stair(0, -1, 2, -4, '+2', '−3', { dxOff: [20, 0], dyOff: [-44, 0] });
    T.pause(120);
    ax.dot(2, -4, BLUE);
    ax.tag(2, -4, '(2, −4)', 8, 6, BLUE);
    y = 438;
    T.str('(0, −1) → (0+2, −1-3)=(2, −4)', padL, y);
    T.stepEnd();

    /* steg 3: samma k */
    tanke(y, [
      [['Alla punkter flyttas lika mycket,']],
      [['så linjen blir bara förskjuten:']],
      [['den nya linjen är parallell med']],
      [['den gamla och har k=3.']]
    ]);
    y += 2.6 * F;
    xx = T.str('y=3', padL, y);
    var v0 = xx; xx = T.str('x', xx, y); var v1 = xx;
    T.str('+m', xx, y);
    var yF = y;
    T.stepEnd();

    /* steg 4: insättning av (2, −4) */
    tanke(y, [
      [['(2, −4) ligger på den nya linjen.']],
      [['Jag sätter in x=2 och y=−4.']]
    ]);
    var ringar = substRings(acts, [[ax.X(2) + 8, ax.X(2) + 8 + T.adv('(2, −4)', 0.5), ax.Y(-4) + 6, 0.5 * F],
                                   [v0, v1, yF, F]]);
    y += 2.6 * F;
    T.str('−4=3·2+m', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    y += 2.4 * F;
    T.str('−4=6+m', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['6 adderas i högerledet, så jag']],
      [['subtraherar 6 från båda led.']]
    ]);
    y = ekvOp(y, '-6', xw, '−4=6+m');
    T.str('m=−10', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: (1, 2) på den gamla']],
      [['linjen flyttas till (3, −1), och']],
      [['3·3-10=−1. Stämmer.']]
    ]);
    y += 2.6 * F;
    T.str('y=3x-10', padL + 30, y);
    T.pause(300);
    ax.rule([ax.X(2), ax.Y(-4)], [ax.X(4.4), ax.Y(3.2)], BLUE);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: y=3x-10', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 20: är triangeln (0, 0), (2, 4), (10, 0) rätvinklig? ----
   * Triangeln ritas i ett koordinatsystem. Sidornas kvadrater räknas ut
   * med avståndsformeln (rötterna behövs aldrig) och Pythagoras sats
   * prövas: 20 + 80 = 100. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var ax = mkAxes(T, F, { ox: 70, oy: 200, u: 22,
                            xmin: 0, xmax: 10, ymin: 0, ymax: 5 });
    var O = [ax.X(0), ax.Y(0)], P = [ax.X(2), ax.Y(4)], Q = [ax.X(10), ax.Y(0)];
    var FIGB_Y = 262;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axlarna och triangeln */
    ax.axes();
    ax.ticks([2, 4, 6, 8, 10], [2, 4], [2, 4, 6, 8, 10], [2, 4]);
    T.pause(150);
    T.line(O, P); T.pause(100);
    T.line(P, Q); T.pause(100);
    T.line(Q, O); T.pause(150);
    ax.dot(0, 0); ax.tag(0, 0, 'O', -18, -8);
    ax.dot(2, 4); ax.tag(2, 4, 'P(2, 4)', -6, -12);
    ax.dot(10, 0); ax.tag(10, 0, 'Q(10, 0)', 10, -12);
    T.stepEnd();

    /* steg 2: metoden */
    figurBubble(268, [
      [['En triangel är rätvinklig precis']],
      [['när Pythagoras sats gäller: den']],
      [['längsta sidans kvadrat är summan']],
      [['av de andra två kvadraterna.']]
    ]);
    y = 372;
    T.str('Avståndsformeln: d^2=(Δx)^2+(Δy)^2', padL, y - 1.45 * F, null, 0.62);
    T.str('OP^2=2^2+4^2=4+16=20', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Från P till Q: Δx=10-2=8 och']],
      [['Δy=0-4=−4.']]
    ]);
    y += 2.4 * F;
    T.str('PQ^2=8^2+(−4)^2=64+16=80', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('OQ^2=10^2=100', padL, y);
    T.stepEnd();

    tanke(y, [
      [['OQ är längst. Är summan av de']],
      [['två andra kvadraterna lika med']],
      [['OQ^2?']]
    ]);
    y += 3.5 * F;
    T.str('Prövar Pythagoras sats', padL, y - 1.45 * F, null, 0.62);
    T.str('OP^2+PQ^2=20+80=100=OQ^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Satsen gäller, så triangeln är']],
      [['rätvinklig. Den räta vinkeln']],
      [['ligger mitt emot den längsta']],
      [['sidan OQ, alltså vid P.']]
    ]);
    ratVinkel(T, P, [(O[0] - P[0]) / Math.hypot(O[0] - P[0], O[1] - P[1]), (O[1] - P[1]) / Math.hypot(O[0] - P[0], O[1] - P[1])],
              [(Q[0] - P[0]) / Math.hypot(Q[0] - P[0], Q[1] - P[1]), (Q[1] - P[1]) / Math.hypot(Q[0] - P[0], Q[1] - P[1])], 11);
    T.pause(200);
    y += 2.6 * F;
    xe = T.str('Svar: Ja, rät vinkel vid P(2, 4)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: parabeln kring P och antalet nollställen ----
   * a) En parabel med maximipunkt vid x = 5 skissas; P vid x = 3 ligger
   * på den stigande vänstra sidan, där kurvan böjer nedåt: figur E.
   * b) Tre lägen i höjdled skissas: över, på och under x-axeln. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var ax = mkAxes(T, F, { ox: 60, oy: 220, u: 22,
                            xmin: 0, xmax: 10, ymin: 0, ymax: 5 });
    function f(x) { return 4 - 0.3 * (x - 5) * (x - 5); }
    var FIGB_Y = 292;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axlarna och parabeln med symmetrilinjen */
    ax.axes();
    ax.ticks([3, 5], [], [3, 5], []);
    T.pause(150);
    var pts = [];
    for (i = 1.4; i <= 8.6 + 1e-9; i += 0.2) pts.push([ax.X(i), ax.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: pts });
    T.pause(150);
    dashLine(T, [ax.X(5), ax.Y(0)], [ax.X(5), ax.Y(4.8)], 11, BLUE);
    T.str('x=5', ax.X(5) + 6, ax.Y(4.7), BLUE, 0.5);
    T.stepEnd();

    /* ---- a) ---- */
    figurBubble(268, [
      [['Negativ x^2-term: parabeln']],
      [['öppnar sig nedåt och har en']],
      [['maximipunkt på symmetrilinjen']],
      [['x=5.']]
    ]);
    y = 386;
    T.str('a) maximipunkt vid x=5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['P ligger vid x=3, till vänster']],
      [['om toppen. Där stiger kurvan,']],
      [['och den böjer nedåt (ledsen).']]
    ]);
    ax.dot(3, f(3), BLUE);
    ax.tag(3, f(3), 'P', -16, -8, BLUE);
    T.pause(200);
    y += 2.6 * F;
    T.str('3<5: P på den stigande sidan', padL, y);
    T.stepEnd();

    tanke(y, [
      [['B stiger också, men böjer uppåt']],
      [['som en glad parabel. Bara E']],
      [['stiger och böjer nedåt.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Figur E', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Antalet skärningar med x-axeln']],
      [['beror på hur högt toppen ligger.']],
      [['Toppens y-koordinat vet vi']],
      [['inget om.']]
    ]);
    y += 3.0 * F;
    T.str('b) toppens y-koordinat är okänd', padL, y);
    T.stepEnd();

    /* tre lägen skissade i blått: över, på och under en axel */
    tanke(y, [
      [['Ligger toppen över axeln blir det']],
      [['två skärningar, på axeln en och']],
      [['under axeln ingen.']]
    ]);
    y += 2.4 * F;
    var oy2 = y + 2.4 * F, ox2 = padL + 40, u2 = 16;
    T.line([ox2 - 10, oy2], [ox2 + 500, oy2]);
    T.pause(120);
    [[2.4, 'två'], [0, 'en'], [-2.0, 'ingen']].forEach(function (c, k) {
      var cx = ox2 + 60 + k * 170, p2 = [], t;
      for (t = -3; t <= 3 + 1e-9; t += 0.25) {
        p2.push([cx + t * u2, oy2 - (c[0] - 0.55 * t * t) * u2]);
      }
      acts.push({ kind: 'stroke', pts: p2, color: BLUE });
      lblC(T, F, c[1], cx, oy2 + 4.6 * u2, BLUE, 0.5);
      T.pause(150);
    });
    y = oy2 + 4.6 * u2;
    T.stepEnd();

    tanke(y, [
      [['Alla tre uppfyller villkoren,']],
      [['till exempel y=−(x-5)^2+1,']],
      [['y=−(x-5)^2 och y=−(x-5)^2-1.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Nej, två, en eller ingen', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 22: skärning mellan y = −4x(x−2) och y = x − 2 ----
   * Högerleden sätts lika, (x − 2) subtraheras från båda led och bryts ut
   * (parentesen stängs sist), nollproduktmetoden ger de två rötterna.
   * EKVVAL-scen: "−(x−2)", "+1" och "/(−4)" i båda led eller på väggen. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('−4x(x-2)=x-2') + 0.9 * F;
    var xw2 = padL + 30 + T.adv('−4x-1=0') + 0.9 * F;

    /* väggen vid första raden når x>420: raden läggs under mobilzonen (y<210) */
    y = 236;
    T.str('Skärning: kurvorna har samma y', padL, y - 1.45 * F, null, 0.62);
    T.str('−4x(x-2)=x-2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Utveckla inte! Faktorn (x-2)']],
      [['finns i båda led. Jag subtraherar']],
      [['(x-2) från båda led.']]
    ]);
    y = ekvOp(y, '-(x-2)', xw, '−4x(x-2)=x-2');
    T.str('−4x(x-2)-(x-2)=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu bryter jag ut (x-2). Att']],
      [['dividera bort den vore fel: då']],
      [['försvinner lösningen x=2.']]
    ]);
    y += 2.6 * F;
    xx = T.str('(x-2)(', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kvar i parentesen: −4x från']],
      [['första termen och −1 från']],
      [['den andra.']]
    ]);
    xx = T.str('−4x', xx, y);
    T.stepEnd();
    T.str('-1)=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nollproduktmetoden: en produkt']],
      [['är noll precis när någon faktor']],
      [['är noll.']]
    ]);
    y += 2.6 * F;
    T.str('x-2=0 ⟺ x_1=2', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('−4x-1=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['1 subtraheras i vänsterledet,']],
      [['så jag adderar 1 till båda led.']]
    ]);
    y = ekvOp(y, '+1', xw2, '−4x-1=0');
    T.str('−4x=1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med −4, så jag']],
      [['dividerar båda led med −4.']]
    ]);
    y = ekvOp(y, '/(−4)', xw2, '−4x=1');
    xx = T.str('x_2=−', padL + 30, y);
    xx = T.fracH('1', '4', xx + 0.16 * F, y);
    T.str('=−0,25', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: x=2 ger y=0 i båda.']],
      [['x=−0,25 ger −4·(−0,25)·(−2,25)=']],
      [['−2,25 och −0,25-2=−2,25.']],
      [['Stämmer.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x_1=2 och x_2=−0,25', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 23: koldioxidutsläppet 40 % lägre ----
   * Målnivån är 60 % av 1990 års utsläpp. Ekvationen 5,44·10^7·0,98^x
   * = 4,374·10^7 divideras med 5,44·10^7, logaritmeras och löses ut;
   * kvoten bärs vidare oavrundad. EKVVAL-scen: "/5,44·10^7" och
   * "/lg 0,98" i båda led eller på väggen. */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    /* väggen står tätt efter den bredaste raden: annars når "/10^7" in i
     * stega-pilens band (x>696) */
    var xw = padL + T.adv('5,44·10^7·0,98^x=4,374·10^7') + 0.25 * F;
    var xw2 = padL + T.adv('x·lg 0,98=lg 0,80404...') + 0.5 * F;

    /* raderna är breda: de läggs under mobilzonen (x>420, y<210) */
    y = 246;
    T.str('Målet: 60 % av 1990 års utsläpp', padL, y - 1.45 * F, null, 0.62);
    T.str('0,60·7,29·10^7=4,374·10^7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x = år efter 2014. Minskning med']],
      [['2,0 % per år ger faktorn 0,98,']],
      [['som används x gånger på']],
      [['utsläppet år 2014.']]
    ]);
    y += 3.6 * F;
    T.str('x = antal år efter 2014, faktorn 0,98 per år', padL, y - 1.45 * F, null, 0.62);
    T.str('5,44·10^7·0,98^x=4,374·10^7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['10^7 finns i båda led, så jag']],
      [['dividerar båda led med 10^7.']]
    ]);
    y = ekvOp(y, '/10^7', xw, '5,44·10^7·0,98^x=4,374·10^7', { x0: padL, dy: 3.2, dyRes: 3.1 });
    T.str('5,44·0,98^x=4,374', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Potensen ska stå ensam: jag']],
      [['dividerar båda led med 5,44.']]
    ]);
    y = ekvOp(y, '/5,44', padL + 30 + T.adv('5,44·0,98^x=4,374') + 0.9 * F, '5,44·0,98^x=4,374');
    xx = T.str('0,98^x=', padL + 30, y);
    xx = T.fracH('4,374', '5,44', xx, y);
    T.str('=0,80404...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x står i exponenten. Jag']],
      [['logaritmerar båda led.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('lg 0,98^x=lg 0,80404...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen lg a^x=x·lg a']],
      [['plockar ned x som en faktor.']]
    ]);
    y += 2.6 * F;
    T.str('x·lg 0,98=lg 0,80404...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med lg 0,98.']],
      [['Både täljare och nämnare är']],
      [['negativa, så kvoten blir positiv.']]
    ]);
    y = ekvOp(y, '/lg 0,98', xw2, 'x·lg 0,98=lg 0,80404...');
    xx = T.str('x=', padL + 30, y);
    xx = fracLift(T, F, 'lg 0,80404...', 'lg 0,98', xx, y);
    xx = T.str('=10,79...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Knappt 11 år efter 2014, alltså']],
      [['en bit in på 2025. Målet till']],
      [['2020 nås inte i den takten.']]
    ], 1.05);
    T.str('≈10,8', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: 0,98^1^1≈0,80 och']],
      [['5,44·0,80≈4,35, nära 4,374.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: Cirka 10,8 år (knappt 11 år)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 24: dödstal mot vattenförbrukning ----
   * a) Linjär regression i ett digitalt verktyg: pennan redovisar
   * punkterna (i liten stil), resultatet y = −0,24x + 41 och en kontroll i
   * medelpunkten. b) Linjen når noll vid x ≈ 170 och blir sedan negativ,
   * vilket ett dödstal inte kan. EKVVAL-scen: "−41" och "/(−0,24)" i
   * båda led eller på väggen. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('−0,24x+41=0') + 0.9 * F;

    /* ---- a) ---- (punktraderna är breda: under mobilzonen x>420, y<210) */
    y = 144;
    T.str('a) Linjär regression', padL, y, null, 0.62);
    T.str('i digitalt verktyg', padL, y + 1.3 * F, null, 0.62);
    T.pause(200);
    y += 1.3 * F + 1.7 * F;
    xx = T.str('(8; 45)', padL, y, null, 0.62);
    xx = T.str('(10; 38)', xx + 0.6 * F, y, null, 0.62);
    xx = T.str('(10; 34)', xx + 0.6 * F, y, null, 0.62);
    T.str('(30; 31)', xx + 0.6 * F, y, null, 0.62);
    y += 1.3 * F;
    xx = T.str('(43; 35)', padL, y, null, 0.62);
    xx = T.str('(50; 26)', xx + 0.6 * F, y, null, 0.62);
    xx = T.str('(67; 24)', xx + 0.6 * F, y, null, 0.62);
    T.str('(84; 21)', xx + 0.6 * F, y, null, 0.62);
    y += 1.3 * F;
    xx = T.str('(88; 20)', padL, y, null, 0.62);
    xx = T.str('(100; 18)', xx + 0.6 * F, y, null, 0.62);
    T.str('(100; 16)', xx + 0.6 * F, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Linjär regression betyder att']],
      [['verktyget hittar den räta linje']],
      [['som passar punkterna bäst.']],
      [['Verktyget ger k≈−0,241 och']],
      [['m≈40,9.']]
    ], 0);
    y += 2.6 * F;
    T.str('y=−0,24x+41', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Regressionslinjen går alltid']],
      [['genom medelpunkten. Medelvärdet']],
      [['av x är 53,6 och av y är 28.']]
    ]);
    y += 3.6 * F;
    T.str('Kontroll i medelpunkten (53,6; 28)', padL, y - 1.45 * F, null, 0.62);
    T.str('y=−0,24·53,6+41=28,1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['28,1 är nära 28, så linjen går']],
      [['genom medelpunkten. Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: y=−0,24x+41', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['En rät linje med negativ lutning']],
      [['fortsätter nedåt hur långt som']],
      [['helst. Var når den noll?']]
    ]);
    y += 3.0 * F;
    T.str('b) −0,24x+41=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['41 adderas i vänsterledet, så jag']],
      [['subtraherar 41 från båda led.']]
    ]);
    y = ekvOp(y, '-41', xw, '−0,24x+41=0');
    T.str('−0,24x=−41', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med −0,24, så jag']],
      [['dividerar båda led med −0,24.']]
    ]);
    y = ekvOp(y, '/(−0,24)', xw, '−0,24x=−41');
    xx = T.str('x=', padL + 30, y);
    xx = T.fracH('41', '0,24', xx, y);
    T.str('≈170', xx, y);
    T.stepEnd();

    tanke(y, [
      [['För större förbrukning än cirka']],
      [['170 liter ger modellen ett']],
      [['negativt dödstal, vilket är']],
      [['omöjligt.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('x>170 ⇒ y<0: omöjligt', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Modellen gäller alltså bara i']],
      [['ett begränsat intervall.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Ja, dödstalet kan inte bli', padL, y);
    T.underline(xe, y);
    y += 1.9 * F;
    xe = T.str('mindre än 0, så modellen gäller bara', padL, y);
    T.underline(xe, y);
    y += 1.9 * F;
    xe = T.str('för x upp till cirka 170', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 25: bitens övre kant ----
   * Bågen skissas i grafit med måtten i blått; ett koordinatsystem med
   * origo i vänstra hörnet läggs in i blått. Nollställena ger faktorformen
   * y = a·x(x − 11,5), toppen (5,75; 4,5) sätts in (ringar) och a löses
   * ut. EKVVAL-scen: "/(−33,0625)" i båda led eller på väggen. */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('4,5=−33,0625a') + 0.9 * F;
    var ox = padL + 58, oy = 240, u = 22, bw = 11.5, bh = 4.5;
    function X(v) { return ox + v * u; }
    function Y(v) { return oy - v * u; }
    var a = -bh / (bw / 2) / (bw / 2), b = -a * bw;
    function f(x) { return a * x * x + b * x; }
    var FIGB_Y = 326;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: bågen och måtten */
    var pts = [];
    for (i = 0; i <= bw + 1e-9; i += 0.25) pts.push([X(i), Y(f(i))]);
    acts.push({ kind: 'stroke', pts: pts });
    T.line([X(bw), Y(0)], [X(0), Y(0)]);
    T.pause(150);
    dblPil(T, [X(0), oy + 22], [X(bw), oy + 22], BLUE);
    lblC(T, F, '11,5', X(bw / 2), oy + 22 + 0.75 * F, BLUE);
    T.pause(120);
    dblPil(T, [X(bw) + 26, Y(0)], [X(bw) + 26, Y(bh)], BLUE);
    T.str('4,5', X(bw) + 34, Y(bh / 2) + 6, BLUE, 0.62);
    T.str('(cm)', X(bw) + 34, Y(bh) - 4, BLUE, 0.5);
    T.stepEnd();

    /* steg 2: koordinatsystemet i blått */
    figurBubble(268, [
      [['Funktionen beror på var axlarna']],
      [['läggs, så valet ska redovisas.']],
      [['Jag lägger origo i vänstra']],
      [['hörnet och x-axeln längs']],
      [['underkanten.']]
    ]);
    T.line([X(-1), oy], [X(bw + 1.5), oy], BLUE);
    T.line([X(bw + 1.5) - 9, oy - 5], [X(bw + 1.5) + 1, oy], BLUE);
    T.line([X(bw + 1.5) - 9, oy + 5], [X(bw + 1.5) + 1, oy], BLUE);
    T.line([ox, Y(-0.8)], [ox, Y(bh + 1.4)], BLUE);
    T.line([ox - 5, Y(bh + 1.4) + 9], [ox, Y(bh + 1.4) - 1], BLUE);
    T.line([ox + 5, Y(bh + 1.4) + 9], [ox, Y(bh + 1.4) - 1], BLUE);
    T.pause(120);
    punkt(T, [X(0), Y(0)], BLUE);
    T.str('(0, 0)', X(0) - T.adv('(0, 0)', 0.5) - 6, Y(0) - 8, BLUE, 0.5);
    punkt(T, [X(bw), Y(0)], BLUE);
    T.str('(11,5; 0)', X(bw) + 6, Y(0) + 0.7 * F, BLUE, 0.5);
    punkt(T, [X(bw / 2), Y(bh)], BLUE);
    T.str('(5,75; 4,5)', X(bw / 2) + 8, Y(bh) - 6, BLUE, 0.5);
    T.stepEnd();

    /* ---- funktionen ---- */
    figurBubble(268, [
      [['Nollställena är x=0 och x=11,5.']],
      [['Toppen ligger mitt emellan, på']],
      [['symmetrilinjen, och höjden är']],
      [['4,5.']]
    ]);
    y = 420;
    xx = T.str('symmetrilinje: x=', padL, y);
    xx = T.fracH('0+11,5', '2', xx, y);
    T.str('=5,75', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En andragradsfunktion med']],
      [['nollställena 0 och 11,5 kan']],
      [['skrivas a·x(x-11,5). a styr']],
      [['höjden.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('y=a·', padL, y);
    var v0 = xx; xx = T.str('x', xx, y); var v1 = xx;
    xx = T.str('(', xx, y);
    var w0 = xx; xx = T.str('x', xx, y); var w1 = xx;
    T.str('-11,5)', xx, y);
    var yF = y;
    T.stepEnd();

    tanke(y, [
      [['Maximipunkten (5,75; 4,5) ligger']],
      [['på kurvan. Jag sätter in x=5,75']],
      [['och y=4,5.']]
    ]);
    var lx = X(bw / 2) + 8;
    var ringar = substRings(acts, [[lx, lx + T.adv('(5,75; 4,5)', 0.5), Y(bh) - 6, 0.5 * F],
                                   [v0, v1, yF, F], [w0, w1, yF, F]]);
    y += 2.6 * F;
    T.str('4,5=a·5,75·(5,75-11,5)', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['5,75-11,5=−5,75, och']],
      [['5,75·(−5,75)=−33,0625.']]
    ]);
    y += 2.4 * F;
    T.str('4,5=a·5,75·(−5,75)=−33,0625a', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['a multipliceras med −33,0625,']],
      [['så jag dividerar båda led med']],
      [['−33,0625. a blir negativt, som']],
      [['det ska med en maximipunkt.']]
    ]);
    y = ekvOp(y, '/(−33,0625)', xw, '4,5=−33,0625a');
    T.str('a=−0,13611...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['a multipliceras in: a·x^2 och']],
      [['−11,5a·x, där']],
      [['−11,5·(−0,13611...)=1,5652...']]
    ]);
    y += 2.6 * F;
    T.str('y=−0,13611...x^2+1,5652...x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: x=11,5 ger']],
      [['−0,1361·132,25+1,5652·11,5≈0.']],
      [['Stämmer. Svaret avrundas, och']],
      [['gäller för 0≤x≤11,5.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: y=−0,136x^2+1,57x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 26: största rektangeln i triangeln ----
   * Triangeln och rektangeln ritas i grafit med måtten i blått; b, h och
   * 7 − h skrivs in. Likformighet mellan topptriangeln och hela triangeln
   * ger b = 9(7 − h)/7, arean blir en andragradsfunktion av h med
   * nollställena 0 och 7, maximum vid h = 3,5. EKVVAL-scen: "·(7−h)" i
   * båda led eller på väggen. */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.fracW('b', '7-h') + T.adv('=') + T.fracW('9', '7') + 0.9 * F;
    var k = 24, by = 250;
    var B = [padL + 82, by], C = [padL + 82 + 9 * k, by], A = [padL + 82 + 2.4 * k, by - 7 * k];
    var hr = 2.2, yTop = by - hr * k, t = hr / 7;
    var L = [B[0] + (A[0] - B[0]) * t, yTop], R = [C[0] + (A[0] - C[0]) * t, yTop];
    var FIGB_Y = 338;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: triangeln, rektangeln och måtten */
    T.line(B, A); T.pause(100);
    T.line(A, C); T.pause(100);
    T.line(C, B); T.pause(150);
    T.line([L[0], by], L); T.line(L, R); T.line(R, [R[0], by]);
    T.pause(150);
    T.str('A', A[0] - 6, A[1] - 10, null, 0.62);
    T.str('B', B[0] - 22, B[1] + 18, null, 0.62);
    T.str('C', C[0] + 8, C[1] + 18, null, 0.62);
    T.pause(120);
    dblPil(T, [B[0] - 26, by], [B[0] - 26, A[1]], BLUE);
    T.str('7,0', B[0] - 34 - T.adv('7,0', 0.62), (by + A[1]) / 2 + 6, BLUE, 0.62);
    dblPil(T, [B[0], by + 24], [C[0], by + 24], BLUE);
    lblC(T, F, '9,0', (B[0] + C[0]) / 2, by + 24 + 0.75 * F, BLUE);
    T.str('(cm)', A[0] + 24, A[1] - 4, BLUE, 0.5);
    T.stepEnd();

    /* steg 2: beteckningar */
    figurBubble(268, [
      [['Rektangelns area är basen']],
      [['gånger höjden. Jag kallar dem']],
      [['b och h. Ovanför rektangeln']],
      [['blir en liten triangel med basen']],
      [['b och höjden 7-h.']]
    ]);
    lblC(T, F, 'b', (L[0] + R[0]) / 2, by - 8, BLUE);
    T.pause(120);
    T.str('h', R[0] + 8, (yTop + by) / 2 + 6, BLUE, 0.62);
    T.pause(120);
    dblPil(T, [C[0] + 28, yTop], [C[0] + 28, A[1]], BLUE);
    T.str('7-h', C[0] + 36, (yTop + A[1]) / 2 + 6, BLUE, 0.62);
    y = 416;
    T.str('A=b·h', padL, y);
    T.stepEnd();

    /* steg 3: likformighet */
    tanke(y, [
      [['Rektangelns överkant är parallell']],
      [['med basen, så topptriangeln har']],
      [['samma vinklar som hela triangeln:']],
      [['de är likformiga. Bas genom höjd']],
      [['är lika i båda.']]
    ]);
    y += 3.8 * F;
    T.str('Likformiga trianglar: bas genom höjd är lika', padL, y - 1.9 * F, null, 0.62);
    xx = T.fracH('b', '7-h', padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('9', '7', xx, y);
    T.stepEnd();

    tanke(y, [
      [['b delas med 7-h, så jag']],
      [['multiplicerar båda led med (7-h).']]
    ], 1.05);
    y = ekvOp(y, '·(7-h)', xw, function (yb) {
      var x2 = T.fracH('b', '7-h', padL + 30, yb);
      x2 = T.str('·(7-h)', x2, yb, BLUE);
      x2 = T.str('=', x2, yb);
      x2 = T.fracH('9', '7', x2, yb);
      T.str('·(7-h)', x2, yb, BLUE);
    }, { dy: 3.0, dyRes: 3.2, vopt: { h0: 1.25, h1: 1.15 } });
    xx = T.str('b=', padL + 30, y);
    xx = T.fracH('9', '7', xx, y);
    T.str('(7-h)', xx, y);
    T.stepEnd();

    /* steg 4: areafunktionen */
    tanke(y, [
      [['Jag sätter in b i A=b·h. Arean']],
      [['blir då en funktion av h enbart.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('A(h)=', padL, y);
    xx = T.fracH('9', '7', xx, y);
    var yA = y;
    var f0 = xx; xx = T.str('(', xx, y);
    var t0 = xx; xx = T.str('7', xx, y); var t1 = xx;
    var u0 = xx; xx = T.str('-h', xx, y); var u1 = xx;
    xx = T.str(')·', xx, y);
    var g0 = xx; xx = T.str('h', xx, y); var g1 = xx;
    T.stepEnd();

    tanke(y, [
      [['h multipliceras med varje term']],
      [['i parentesen: 7·h=7h och']],
      [['−h·h=−h^2.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('9', '7', xx, y);
    xx = T.str('(', xx, y);
    var multIn = mkMultIn(T);
    xx = multIn(xx, y, yA - 0.95 * F, [
      { fran: [g0, g1], till: [t0, t1], skriv: '7h', hojd: 26, dx2: -3 },
      { fran: [g0, g1], till: [u0, u1], skriv: '-h^2', hojd: 40, dx: 3 }
    ]);
    T.str(')', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Negativ h^2-term: en parabel med']],
      [['maximipunkt. Nollställena är h=0']],
      [['och h=7, och toppen ligger mitt']],
      [['emellan.']]
    ], 1.05);
    y += 3.8 * F;
    T.str('Största arean: h på symmetrilinjen', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('h=', padL + 30, y);
    xx = T.fracH('0+7', '2', xx, y);
    T.str('=3,5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Basen vid h=3,5: 9/7·(7-3,5)=']],
      [['9/7·3,5=4,5, halva basen.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('b=', padL + 30, y);
    xx = T.fracH('9', '7', xx, y);
    T.str('·(7-3,5)=4,5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Arean är 4,5·3,5. Mätvärdena har']],
      [['två värdesiffror, så 15,75']],
      [['avrundas till 16.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('A=4,5·3,5=15,75≈16 cm^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: den största rektangeln']],
      [['täcker precis halva triangelns']],
      [['area, 9·7/2=31,5.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 16 cm^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

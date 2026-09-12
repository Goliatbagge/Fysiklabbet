/* ma2c-vt2022-penna.js — pennlösningar till Nationellt prov Ma 2c, VT 2022.
 *
 * En scen per uppgift, registrerad som "ma2c-vt2022-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de som oftast
 * bränner: inget bläck vid x > 696 eller x < 24, inget med x > 420 ovanför
 * y = 150 (y = 210 i ekvval-scener), en tanke per led direkt före ledet,
 * division alltid med vågrätt streck, blå båge till varje term när en
 * parentes utvecklas, och samma antal klicksteg i båda ekvations-
 * redovisningarna (cfg.vagg + T.vaggOp + ekvval: 1).
 *
 * Samma siffror och samma avrundning som textlösningen i
 * data/np/ma2c-vt2022.js — eleven växlar mellan vyerna.
 *
 * Kursen har ekvationssystem, pq-formeln, rotekvationer, logaritmer och
 * geometri. Systemklammern finns inte som glyf utan ritas för hand med
 * sysBrace() nedan; roten skrivs med T.rot(), lg med bokstäverna l och g.
 *
 * Granskning: node .claude/verify-handskrift.js ma2c-vt2022-u1 …
 * Skärmdump:  .shots/np-penna-ma2c.html?ma2c-vt2022-u1
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkEkvOp = V.mkEkvOp,
      mkArc = V.mkArc, mkAxes = V.mkAxes, substRings = V.substRings,
      fadeRings = V.fadeRings, humanize = V.humanize, expFrac = V.expFrac,
      bigParen = V.bigParen, vinkelBage = V.vinkelBage, ratVinkel = V.ratVinkel,
      trigKvot = V.trigKvot, valueBracket = V.valueBracket, tusen = V.tusen,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma2c-vt2022-u' + nr, fn); }

  /* SYSTEMKLAMMER — den vänstra klammern framför ett ekvationssystem,
   * ritad för hand som ETT pennstreck: uppifrån och ned med en liten
   * spets åt vänster på mitten. x = klammerns högerkant (raderna börjar
   * vid x + 0.45·F); yTop/yBot = översta radens överkant och nedersta
   * radens underkant (baslinje ± ~0,9·F). Klammern ritas i grafit i sitt
   * eget lilla drag före raderna. */
  function sysBrace(T, F, x, yTop, yBot) {
    var ym = (yTop + yBot) / 2, d = 0.22 * F;
    T.acts.push({ kind: 'stroke', pts: humanize([
      [x, yTop], [x - d * 0.55, yTop + d * 0.5], [x - d * 0.7, ym - d * 0.6],
      [x - d * 1.25, ym], [x - d * 0.7, ym + d * 0.6],
      [x - d * 0.55, yBot - d * 0.5], [x, yBot]]) });
    T.pause(160);
  }
  /* radernas start-x till höger om klammern */
  function sysX(F, x) { return x + 0.45 * F; }

  /* ================= DEL 1 ================= */
  /* ---------- gemensamma småhjälpare för del 1 (uppgift 1–7) ----------
   * STRECKAD LINJE (symmetrilinje, markering av en kurvtopp): n segment
   * varav vartannat ritas. Färg som argument — blå för anteckningar. */
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
  /* BRÅK MED NEDSTAPEL I TÄLJAREN ("lg 7" över "lg 5"): g-svansen når
   * 0,26·F under sin baslinje och skulle gå rakt igenom bråkstrecket med
   * fracH:s vanliga täljarläge. Täljaren lyfts därför lift·F (standard
   * 0,26) — i övrigt exakt fracH. Returnerar nästa x. */
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
  /* BRÅK I BRÅK MED BLANDAD TÄLJARE — mittpunktsformeln har ett litet
   * bråk FÖLJT AV en term i täljaren ("1/2 + x_B" över 2). bigFrac tar
   * bara ett ensamt bråk eller en ensam sträng, så här byggs täljaren av
   * delar: en array ['1','2'] blir ett litet bråk, en sträng skrivs som
   * den är. Samma mått som bigFrac (delarnas mittlinjer 1,18·F från
   * huvudstrecket; uttrycket når 2,57·F över och 1,89·F under raden). */
  function bigFracMix(T, F, numParts, denS, x0, yb) {
    function partW(p) { return Array.isArray(p) ? T.fracW(p[0], p[1]) : T.adv(p); }
    var nw = 0, i;
    for (i = 0; i < numParts.length; i++) nw += partW(numParts[i]);
    var w = Math.max(nw, T.adv(denS)) + 0.62 * F;
    var ybar = yb - 0.34 * F, mid = ybar - 1.18 * F;
    var x = x0 + (w - nw) / 2;
    for (i = 0; i < numParts.length; i++) {
      var p = numParts[i];
      if (Array.isArray(p)) x = T.fracH(p[0], p[1], x, mid + 0.34 * F);
      else x = T.str(p, x, mid + 0.45 * F);
    }
    T.pause(150);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(150);
    T.str(denS, x0 + (w - T.adv(denS)) / 2, ybar + 1.18 * F + 0.45 * F);
    return x0 + w + 1.5;
  }
  /* DUBBELROT √√(…) — två rottecken i lager. Det yttre ritas med
   * rootSign (fri bredd och höjd), det inre med T.rot som vanligt,
   * förskjutet in under det yttre vinculumet. Yttre strecket börjar
   * 1,34·F över baslinjen (inre 1,02·F) och slutar 0,06·F efter det inre.
   * Returnerar nästa x; dubbelRotW ger bredden i förväg. */
  function dubbelRot(T, F, innerS, x0, yb) {
    var iw = T.adv(innerS);
    var xi = V.rootSign(T.acts, x0, yb, 0.50 * F + iw, F,
                        { yTop: yb - 1.34 * F, yBot: yb + 0.16 * F });
    var xe = T.rot(innerS, xi, yb);
    return xe + 0.06 * F;
  }
  function dubbelRotW(T, F, innerS) {
    return 0.56 * F + T.rotW(innerS) + 0.06 * F;
  }

  /* ---- Uppgift 1: förenkla med kvadrerings- och konjugatregeln ----
   * a) (x+5)² utvecklas med första kvadreringsregeln, och 10x−10x tar
   * ut varandra. b) (x+3)(x−3) är ett konjugatpar: x²−9, och niorna tar
   * ut varandra. Regeln skrivs som liten rubrik ovanför utvecklingsraden
   * (REGEL INLEDANDE MOTIVERING: rubrik + rad i samma klicksteg). */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 118;
    T.str('a) (x+5)^2-10x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Första kvadreringsregeln med']],
      [['a=x och b=5. Dubbla produkten']],
      [['blir 2·x·5=10x.']]
    ]);
    y += 3.5 * F;
    T.str('Kvadreringsregeln: (a+b)^2=a^2+2ab+b^2', padL, y - 1.45 * F, null, 0.62);
    T.str('=x^2+10x+25-10x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['10x och -10x tar ut varandra.']],
      [['Kvar blir kvadraten och 25.']]
    ]);
    y += 2.4 * F;
    T.str('=x^2+25', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: x^2+25', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += 3.0 * F;
    T.str('b) (x+3)(x-3)+9', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Parenteserna är ett konjugatpar:']],
      [['samma tal, olika tecken. Med']],
      [['a=x och b=3 blir b^2=9.']]
    ]);
    y += 3.5 * F;
    T.str('Konjugatregeln: (a+b)(a-b)=a^2-b^2', padL, y - 1.45 * F, null, 0.62);
    T.str('=x^2-9+9', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('=x^2', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: x^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 2: parabeln genom D(−1, 0), E(0, 2) och F(4, 0) ----
   * Ett litet koordinatsystem ritas med de tre punkterna och grafen.
   * a) c är f(0): där grafen skär y-axeln, alltså i E. b) Nollställena
   * −1 och 4 läses av i D och F; symmetrilinjen (och maximipunkten)
   * ligger mitt emellan dem, x = 1,5 — linjen ritas streckad i blått.
   * Bubblor som hör till figuren läggs UNDER figuren. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var ax = mkAxes(T, F, { ox: 90, oy: 150, u: 24,
                            xmin: -2, xmax: 5, ymin: -3, ymax: 4 });
    var FIGB_Y = 262;                       /* bubblor under figuren */
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }
    /* f(x) = −0,5x² + 1,5x + 2 går genom de tre punkterna */
    function f(x) { return -0.5 * x * x + 1.5 * x + 2; }

    /* steg 1: axlarna (negativa y-tal utelämnas — de krockar med x-talen
     * strax under origo, se mkAxes) */
    ax.axes();
    ax.ticks([-2, -1, 1, 2, 3, 4, 5], [-3, -2, -1, 1, 2, 3, 4],
             [-2, -1, 1, 2, 3, 4, 5], [1, 2, 3, 4], { x: { '-1': [-6, 6] } });
    T.stepEnd();

    /* steg 2: grafen (samplad ur funktionen) och punkterna */
    var pts = [];
    for (i = -1.8; i <= 4.8 + 1e-9; i += 0.2) pts.push([ax.X(i), ax.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: pts });
    T.pause(200);
    ax.dot(-1, 0); ax.tag(-1, 0, 'D', -24, -10);
    T.pause(120);
    ax.dot(0, 2);  ax.tag(0, 2, 'E', 9, -8);     /* till höger om axeln: y-talen 2 och 3 står till vänster */
    T.pause(120);
    ax.dot(4, 0);  ax.tag(4, 0, 'F', 8, -10);
    T.stepEnd();

    /* ---- a) ---- */
    figurBubble(268, [
      [['c är funktionsvärdet när x=0,']],
      [['för då är både ax^2 och bx noll.']],
      [['Där skär grafen y-axeln: i E.']]
    ]);
    y = 400;
    T.str('a) c=f(0)=2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: c=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Nollställena är där grafen']],
      [['skär x-axeln: punkterna D och F.']]
    ]);
    y += 3.0 * F;
    T.str('b) x_1=−1 och x_2=4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Maximipunkten ligger på']],
      [['symmetrilinjen, mitt emellan']],
      [['nollställena: medelvärdet av']],
      [['−1 och 4.']]
    ]);
    y += 3.4 * F;
    xx = T.str('x=', padL + 30, y);
    xx = T.fracH('−1+4', '2', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('3', '2', xx, y);
    T.str('=1,5', xx, y);
    T.pause(300);
    /* symmetrilinjen x = 1,5 i figuren, streckad och blå */
    dashLine(T, [ax.X(1.5), ax.Y(-2.6)], [ax.X(1.5), ax.Y(4)], 13, BLUE);
    T.pause(150);
    T.str('x=1,5', ax.X(1.5) + 6, ax.Y(4) + 6, BLUE, 0.5);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar b: x=1,5', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 3: vilken pil mellan "Lena bor i Europa" och "Lena bor
   * i Sverige"? Påståendena är för långa för en rad, så det vänstra
   * skrivs på första raden och pilen + det högra på raden under (raden
   * bryts före operatorn). Pilen åt höger prövas först (stämmer inte:
   * Norge, Italien), sedan pilen åt vänster (stämmer), och dubbelpilen
   * utesluts eftersom den kräver båda. Kommentaren efter varje prövning
   * skrivs liten i grafit, som i Ma 3c-scenernas alternativrader. */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('Lena bor i Europa', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Pilen åt höger säger: om Lena']],
      [['bor i Europa så bor hon i']],
      [['Sverige. Nej, hon kan lika gärna']],
      [['bo i Norge eller Italien.']]
    ]);
    y += 2.5 * F;
    xx = T.str('⇒ Lena bor i Sverige', padL, y);
    T.str('stämmer inte', xx + 0.7 * F, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Pilen åt vänster säger: om Lena']],
      [['bor i Sverige så bor hon i']],
      [['Europa. Ja, alltid, för Sverige']],
      [['ligger i Europa.']]
    ]);
    y += 2.5 * F;
    xx = T.str('⇐ Lena bor i Sverige', padL, y);
    T.str('stämmer', xx + 0.7 * F, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Dubbelpilen kräver att det']],
      [['stämmer åt båda hållen, och åt']],
      [['höger stämde det inte. Rätt']],
      [['symbol är pilen åt vänster.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ⇐', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: normalfördelningens medelvärde och spridning ----
   * a) Klockkurvan skissas för hand (samplad ur exp(−(x−9)²/8)) över en
   * axel 2–15; toppen ligger rakt ovanför 9, som markeras i blått med
   * en streckad linje ned till axeln och en ring om talet. b) Minst
   * standardavvikelse = smalast och högst kurva, det vill säga D. Någon
   * andra figur behövs inte — bubblan bär resonemanget. */
  reg(4, function (cfg, F) {
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
    xe = T.str('Svar a: 9', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Standardavvikelsen är ett']],
      [['spridningsmått. Liten spridning']],
      [['ger en smal och hög kurva, stor']],
      [['spridning en bred och låg.']]
    ]);
    y += 3.0 * F;
    T.str('b) smalast och högst: kurva D', padL, y);
    T.stepEnd();

    tanke(y, [
      [['D är smalast och högst, alltså']],
      [['minst standardavvikelse. B är']],
      [['bredast och lägst, störst.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar b: kurva D', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: avstånd 5 från Q(1, 0) och mittpunkten ----
   * a) Enklast är att gå 5 steg längs x-axeln: P(6, 0). Kontroll med
   * avståndsformeln under en liten rubrik. b) Mittpunktsformeln ställs
   * upp i x-led och y-led var för sig som bråk i bråk (bigFracMix),
   * multipliceras med 2 och löses ut med samma led som textlösningen. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 118;
    T.str('a) Q(1, 0)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Enklast är att gå rakt längs']],
      [['x-axeln: 5 steg åt höger från']],
      [['x=1 ger x=6, och y ändras inte.']]
    ]);
    y += 2.6 * F;
    T.str('P(6, 0)', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag kontrollerar med']],
      [['avståndsformeln.']]
    ]);
    y += 3.5 * F;
    T.str('Avståndsformeln', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('d=', padL, y) + 0.12 * F;   /* luft före rottecknet */
    T.rot('(6-1)^2+(0-0)^2', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.rot('25', xx, y);
    T.str('=5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Svaret är ett exempel: alla']],
      [['punkter på avståndet 5 från Q']],
      [['duger, som (4, 4) där']],
      [['3^2+4^2=25.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar a: till exempel P(6, 0)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) x-led ---- */
    tanke(y, [
      [['Mittpunktens x-koordinat är']],
      [['medelvärdet av A:s och B:s']],
      [['x-koordinater, och den ska bli 1.']]
    ]);
    y += 4.6 * F;
    T.str('Mittpunktsformeln i x-led', padL, y - 3.0 * F, null, 0.62);
    xx = T.str('b) ', padL, y);
    xx = bigFracMix(T, F, [['1', '2'], '+x_B'], '2', xx, y);
    xx = T.str('=1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nämnaren 2 försvinner om jag']],
      [['multiplicerar båda led med 2.']]
    ], 1.9);
    xx = T.str('⟺', xx, y);
    xx = T.fracH('1', '2', xx, y);
    T.str('+x_B=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sedan subtraherar jag 1/2 från']],
      [['båda led: 2 är 4/2.']]
    ], 1.9);
    y += 3.6 * F;
    xx = T.str('x_B=2-', padL + 30, y);
    xx = T.fracH('1', '2', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('4', '2', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('3', '2', xx, y);
    T.stepEnd();

    /* ---- b) y-led ---- */
    tanke(y, [
      [['Samma formel i y-led:']],
      [['medelvärdet av 1/4 och y_B ska']],
      [['bli 3/4.']]
    ], 1.05);
    y += 5.2 * F;
    T.str('Mittpunktsformeln i y-led', padL, y - 3.0 * F, null, 0.62);
    xx = bigFracMix(T, F, [['1', '4'], '+y_B'], '2', padL + 30, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('3', '4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Båda led gånger 2: högerledet']],
      [['3/4 blir 6/4, alltså 3/2.']]
    ], 1.9);
    xx = T.str('⟺', xx, y);
    xx = T.fracH('1', '4', xx, y);
    xx = T.str('+y_B=', xx, y);
    T.fracH('3', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['1/4 subtraheras från båda led.']],
      [['Förläng 3/2 till 6/4 så får']],
      [['bråken samma nämnare.']]
    ], 1.9);
    y += 3.6 * F;
    xx = T.str('y_B=', padL + 30, y);
    xx = T.fracH('3', '2', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '4', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('6', '4', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '4', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('5', '4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: från A till M är']],
      [['steget 1/2 i x-led och 1/2 i']],
      [['y-led. Samma steg en gång till']],
      [['ger B. Stämmer.']]
    ], 1.05);
    y += 3.8 * F;
    xe = T.str('Svar b: B', padL, y);
    xe = bigParen(T, F, xe + 0.05 * F, y, false);
    xe = T.fracH('3', '2', xe, y);
    xe = T.str(', ', xe, y);
    xe = T.fracH('5', '4', xe, y);
    xe = bigParen(T, F, xe + 0.12 * F, y, true);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 6: fem ekvationer ----
   * a) 5^x = 7 logaritmeras; b) dubbelroten kvadreras bort i två steg,
   * med prövning; c) logaritmlagen för division ger lg 100 = 2, sedan
   * samma bas i båda led; d) parenteserna utvecklas med en båge per
   * produkt, −9x² tas bort från båda led och 16/24 förkortas med 8 i
   * två drag; e) den gemensamma faktorn bryts ut och nollproduktmetoden
   * ger de två rötterna.
   * EKVVAL-scen: stegen "+5" och "/2" i b) samt "+9x²" och "/24" i d)
   * skrivs antingen i båda led eller på väggen (cfg.vagg), med samma
   * antal klicksteg i båda lägena. */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    /* väggens x räknas ut ur den bredaste raden i sin deluppgift */
    var xwB = padL + 30 + T.adv('2x-5=81') + 0.9 * F;
    var xwD = padL + 30 + T.adv('−9x^2+24x-16=−9x^2') + 0.9 * F;

    /* ---- a) 5^x = 7 ---- */
    y = 118;
    T.str('a) 5^x=7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x står i exponenten. Logaritmerar']],
      [['jag båda led kommer exponenten']],
      [['ned som en faktor: lg 5^x=x·lg 5.']]
    ]);
    y += 2.6 * F;
    T.str('x·lg 5=lg 7', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med lg 5.']],
      [['Svaret ska vara exakt, så']],
      [['kvoten lämnas som den är.']]
    ]);
    y += 3.4 * F;
    xx = T.str('x=', padL + 30, y);
    fracLift(T, F, 'lg 7', 'lg 5', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar a: x=', padL, y);
    xe = fracLift(T, F, 'lg 7', 'lg 5', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) 3 − √√(2x−5) = 0 ---- */
    y += 4.0 * F;
    xx = T.str('b) 3-', padL, y);
    xx = dubbelRot(T, F, '2x-5', xx, y);
    xx = T.str('=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ska stå ensam. Jag adderar']],
      [['roten till båda led, så byter']],
      [['den och 3 plats.']]
    ]);
    xx = T.str('⟺', xx, y);
    xx = dubbelRot(T, F, '2x-5', xx, y);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kvadrering tar bort en rot i']],
      [['taget. Båda led i kvadrat: den']],
      [['yttre roten försvinner och']],
      [['3^2=9.']]
    ]);
    y += 2.8 * F;
    xx = T.rot('2x-5', padL + 30, y);
    T.str('=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En gång till: kvadrera båda']],
      [['led, 9^2=81.']]
    ]);
    y += 2.6 * F;
    T.str('2x-5=81', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['5 subtraheras i vänsterledet,']],
      [['så jag adderar 5 till båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+5', xwB, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('2x-5', padL + 30, y);
      xx = T.str('+5', xx, y, BLUE);
      xx = T.str('=81', xx, y);
      T.str('+5', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('2x=86', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 2, så jag']],
      [['dividerar båda led med 2.']]
    ]);
    if (vagg) {
      T.vaggOp('/2', xwB, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2x', '2', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('86', '2', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('x=43', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Prövning i ursprungsekvationen:']],
      [['2·43-5=81, √81=9 och √9=3.']],
      [['3-3=0. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar b: x=43', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) lg 200 − lg 2 + 98 = 10^x ---- */
    y += 3.0 * F;
    T.str('c) lg 200-lg 2+98=10^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen för division:']],
      [['lg a-lg b=lg(a/b). Jag tar']],
      [['logaritmerna först.']]
    ]);
    y += 3.4 * F;
    xx = T.str('lg 200-lg 2=lg', padL + 30, y);
    T.fracH('200', '2', xx + 0.12 * F, y);
    T.stepEnd();

    tanke(y, [
      [['200/2=100, och lg 100=2']],
      [['eftersom 10^2=100.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('=lg 100=2', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('2+98=10^x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Vänsterledet är 100=10^2. Två']],
      [['potenser med samma bas är lika']],
      [['precis när exponenterna är lika.']]
    ]);
    y += 2.6 * F;
    T.str('10^2=10^x', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('x=2', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar c: x=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- d) (3x−4)(4−3x) = −9x² ---- */
    y += 3.0 * F;
    var yD = y;
    xx = T.str('d) (', padL, y);
    var a0 = xx; xx = T.str('3x', xx, y);  var a1 = xx;
    var b0 = xx; xx = T.str('-4', xx, y);  var b1 = xx;
    xx = T.str(')(', xx, y);
    var c0 = xx; xx = T.str('4', xx, y);   var c1 = xx;
    var d0 = xx; xx = T.str('-3x', xx, y); var d1 = xx;
    xx = T.str(')=−9x^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Varje term i första parentesen']],
      [['multipliceras med varje term i']],
      [['den andra: fyra produkter.']]
    ]);
    /* båge → produkt, båge → produkt (REGEL MULTIPLICERA IN I PARENTES) */
    y += 2.6 * F;
    xx = multIn(padL + 30, y, yD - 0.95 * F, [
      { fran: [a0, a1], till: [c0, c1], skriv: '12x', hojd: 26, dx: -4, dx2: -4 },
      { fran: [a0, a1], till: [d0, d1], skriv: '-9x^2', hojd: 48, dx: 4 },
      { fran: [b0, b1], till: [c0, c1], skriv: '-16', hojd: 20, dx: -4, dx2: 4 },
      { fran: [b0, b1], till: [d0, d1], skriv: '+12x', hojd: 36, dx: 4, dx2: 4 }
    ]);
    T.str('=−9x^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samla lika termer:']],
      [['12x+12x=24x.']]
    ]);
    y += 2.4 * F;
    T.str('−9x^2+24x-16=−9x^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['−9x^2 finns i båda led. Jag']],
      [['adderar 9x^2 till båda led, så']],
      [['försvinner kvadrattermen.']]
    ]);
    if (vagg) {
      T.vaggOp('+9x^2', xwD, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      /* raden är bred: den börjar vid padL så att den ryms före pilzonen */
      y += 2.4 * F;
      xx = T.str('−9x^2+24x-16', padL, y);
      xx = T.str('+9x^2', xx, y, BLUE);
      xx = T.str('=−9x^2', xx, y);
      T.str('+9x^2', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('24x-16=0', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('24x=16', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 24, så jag']],
      [['dividerar båda led med 24.']]
    ]);
    if (vagg) {
      T.vaggOp('/24', xwD, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('24x', '24', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('16', '24', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    tanke(y - (vagg ? 0 : 3.2 * F), [
      [['Bråket 16/24 förkortas med 8.']]
    ], vagg ? 0.28 : 1.05);
    xx = T.str('x=', padL + 30, y);
    xx = T.fracOp('16', '24', '/8', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('2', '3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar d: x=', padL, y);
    xe = T.fracH('2', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- e) (5987−x)² − 2(5987−x) = 0 ---- */
    y += 4.0 * F;
    T.str('e) (5987-x)^2-2(5987-x)=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Utveckla inte! Parentesen']],
      [['(5987-x) finns i båda termerna,']],
      [['så jag bryter ut den.']]
    ]);
    y += 2.6 * F;
    T.str('(5987-x)(5987-x-2)=0', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('(5987-x)(5985-x)=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nollproduktmetoden: en produkt']],
      [['är noll precis när någon faktor']],
      [['är noll. Varje faktor sätts']],
      [['lika med noll för sig.']]
    ]);
    y += 2.6 * F;
    T.str('5987-x=0 ⟺ x_1=5987', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('5985-x=0 ⟺ x_2=5985', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar e: x_1=5987 och x_2=5985', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 7: hagens area som funktion av x ----
   * Rektangeln ritas i grafit med sidan x (blått) under. Omkretsen
   * 2x + 2y = 120 ger den andra sidan y = 60 − x, som skrivs in i
   * figuren. Arean är basen gånger höjden: x multipliceras in i
   * (60 − x) med en båge per term. */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var hx = padL + 40, hy = 50, hw = 210, hh = 120;
    var FIGB_Y = 242;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: hagen, med sidan x under */
    T.line([hx, hy], [hx + hw, hy]);
    T.line([hx + hw, hy], [hx + hw, hy + hh]);
    T.line([hx + hw, hy + hh], [hx, hy + hh]);
    T.line([hx, hy + hh], [hx, hy]);
    T.pause(200);
    var wx = T.adv('x', 0.62);
    T.str('x', hx + hw / 2 - wx / 2, hy + hh + 0.85 * F, BLUE, 0.62);
    T.stepEnd();

    figurBubble(268, [
      [['Staketet går runt hela hagen,']],
      [['så omkretsen är 120 m. Två sidor']],
      [['är x. De andra två kallar jag y.']]
    ]);
    y = 350;
    xx = T.str('2x+2y=120', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag löser ut y: båda led delas']],
      [['med 2, sedan subtraheras x']],
      [['från båda led.']]
    ]);
    xx = T.str('⟺ y=60-x', xx, y);
    T.stepEnd();

    /* den andra sidan skrivs in i figuren */
    T.str('60-x', hx + hw + 14, hy + hh / 2 + 0.25 * F, BLUE, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Rektangelns area är basen']],
      [['gånger höjden. Båda sidorna']],
      [['är nu uttryckta i x.']]
    ]);
    y += 2.8 * F;
    var yA = y;
    xx = T.str('A(x)=', padL, y);
    var f0 = xx; xx = T.str('x', xx, y);   var f1 = xx;
    xx = T.str('(', xx, y);
    var t0 = xx; xx = T.str('60', xx, y);  var t1 = xx;
    var u0 = xx; xx = T.str('-x', xx, y);  var u1 = xx;
    T.str(')', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med varje term']],
      [['i parentesen.']]
    ]);
    y += 2.5 * F;
    xx = T.str('=', padL + 30, y);
    multIn(xx, y, yA - 0.95 * F, [
      { fran: [f0, f1], till: [t0, t1], skriv: '60x', hojd: 26 },
      { fran: [f0, f1], till: [u0, u1], skriv: '-x^2', hojd: 42, dx: 4 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: x=30 ger en kvadrat']],
      [['med sidan 30, area 900.']],
      [['60·30-30^2=1800-900=900.']],
      [['Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: A(x)=60x-x^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= DEL 2 ================= */
  /* ---------- gemensamma småhjälpare för del 2 (uppgift 8–14) ----------
   * VINKELBÅGE mellan riktningarna mot två punkter: bågen spänner den
   * inre vinkeln (< 180°) med hörnet c som medelpunkt, i valfri färg.
   * Returnerar bisektrisens riktning (radianer) för etikettplaceringen. */
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
  /* liten etikett (0,62·F) centrerad i punkten c + R·(cos m, sin m) */
  function radLabel(T, F, ch, c, m, R, col) {
    var w = T.adv(ch, 0.62), h = 0.56 * F * 0.62;
    T.str(ch, c[0] + Math.cos(m) * R - w / 2, c[1] + Math.sin(m) * R + h / 2,
          col || null, 0.62);
  }
  /* PLUS-MINUS med luft på båda sidor: '±' är ingen OPS-glyf (den står
   * som prefix i x=±8) och får därför ingen automatisk luft. Här står
   * det mellan två led i pq-formeln och behöver den. */
  function pm(T, F, x, yb) { return T.str('±', x + 0.12 * F, yb) + 0.12 * F; }
  /* ROT ÖVER ETT UTTRYCK MED STOR PARENTES — (p/2)^2 − q under ett
   * rottecken. T.rot tar bara en sträng, så rottecknet ritas med
   * rootSign i den höjd parentesen kräver (toppen 1,42·F över raden,
   * exponenten ännu lite högre) och innehållet skrivs in efteråt.
   * Returnerar nästa x. */
  function rotParen(T, F, numS, denS, restS, x0, yb) {
    /* 0,2·F extra luft mellan rottecknets uppstreck och parentesen, som
     * annars ligger rakt på strecket (parentesen är lika hög som roten) */
    var cw = T.parenFracW(numS, denS, '2') + T.adv(restS) + 0.2 * F;
    var xs = V.rootSign(T.acts, x0, yb, cw, F,
                        { yTop: yb - 1.80 * F, yBot: yb + 1.12 * F });
    var xx = T.parenFrac(numS, denS, '2', xs + 0.2 * F, yb);
    return T.str(restS, xx, yb);
  }

  /* ---- Uppgift 8: symmetrilinjen x = 3 och parabeln x = f(y) ----
   * a) Grundparabeln flyttas tre steg åt höger, y = (x−3)², utvecklas
   * med kvadreringsregeln och kontrolleras med symmetrilinjens formel
   * x = −b/(2a) (bråk med vågrätt streck). b) Byt roll på x och y i
   * y = x²: symmetrilinjen x = 0 blir y = 0. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    /* utvecklingen skrivs på egen rad: hela likheten på rad 1 skulle nå
     * in i inställningsrutans mobilzon (x>420, y<150) */
    y = 118;
    T.str('a) y=(x-3)^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Symmetrilinjen går genom vertex.']],
      [['Flyttar jag y=x^2 tre steg åt']],
      [['höger hamnar vertex i (3, 0).']],
      [['(x-3)^2 utvecklas med andra']],
      [['kvadreringsregeln.']]
    ]);
    y += 2.4 * F;
    T.str('=x^2-6x+9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: för y=ax^2+bx+c ligger']],
      [['symmetrilinjen i x=-b/(2a). Här']],
      [['är a=1 och b=−6.']]
    ]);
    y += 4.4 * F;
    T.str('Symmetrilinjen', padL, y - 2.1 * F, null, 0.62);
    xx = T.str('x=−', padL, y);
    xx = T.fracH('b', '2a', xx, y);
    xx = T.str('=−', xx, y);
    xx = T.fracH('−6', '2·1', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('6', '2', xx, y);
    T.str('=3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar a: till exempel y=(x-3)^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['En parabel av typen x=f(y)']],
      [['öppnar sig åt sidan, och dess']],
      [['symmetrilinje är vågrät. Jag']],
      [['byter roll på x och y i y=x^2:']],
      [['då speglas allt, och x=0']],
      [['blir y=0.']]
    ]);
    y += 3.0 * F;
    T.str('b) x=y^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: (1, 1) och (1, −1)']],
      [['ligger båda på parabeln, liksom']],
      [['(4, 2) och (4, −2). Varje punkt']],
      [['har en spegelbild i x-axeln.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar b: till exempel x=y^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: x² + 8x + 12 = 0 med pq-formeln ----
   * Formeln skrivs under en liten rubrik med rottecknet ritat över
   * parentesbråket (rotParen), p och q identifieras och ringas in vid
   * insättningen. Halva p är 4, under roten står 16 − 12 = 4, och de två
   * rötterna skrivs ut var för sig. Kontrollen görs i en bubbla. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('x^2+8x+12=0', padL, y);
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
    var p0 = xx; xx = T.str('8', xx, y); var p1 = xx;
    xx = T.str(', q=', xx, y);
    var q0 = xx; xx = T.str('12', xx, y); var q1 = xx;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in p=8 och q=12']],
      [['i formeln.']]
    ]);
    var ringar = substRings(acts, [[p0, p1, y, F], [q0, q1, y, F]]);
    y += 4.4 * F;
    xx = T.str('x=−', padL, y);
    xx = T.fracH('8', '2', xx, y);
    xx = pm(T, F, xx, y);
    rotParen(T, F, '8', '2', '-12', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Halva p är 4, och 4^2=16.']],
      [['Under roten står 16-12.']]
    ], 1.2);
    y += 3.6 * F;
    xx = T.str('=−4±', padL + 30, y);
    xx = T.rot('16-12', xx + 0.08 * F, y);
    T.stepEnd();

    tanke(y, [
      [['16-12=4 är positivt, så']],
      [['ekvationen har två reella']],
      [['lösningar, och √4=2.']]
    ]);
    xx = T.str('=−4±', xx, y);
    xx = T.rot('4', xx + 0.08 * F, y);
    T.str('=−4±2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Plustecknet ger den ena roten']],
      [['och minustecknet den andra.']]
    ]);
    y += 2.6 * F;
    T.str('x_1=−4+2=−2', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('x_2=−4-2=−6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: (−2)^2+8·(−2)+12=']],
      [['4-16+12=0 och (−6)^2+8·(−6)+12=']],
      [['36-48+12=0. Båda stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x_1=−2 och x_2=−6', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 10: Emmas och Sannas ekvationssystem ----
   * a) y löses ut ur x − y = 3,5 i två led (+y, sedan −3,5): y = x − 3,5,
   * så Emma har fel tecken. b) x = 5 och y = 1,5 sätts in i båda
   * ekvationerna (ringar): den första stämmer, den andra ger 11,5 ≠ 5,5.
   * EKVVAL-scen: "+y" och "−3,5" skrivs i båda led eller på väggen. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    /* väggen står till höger om den bredaste raden: den första, som
     * börjar vid padL med "a)" */
    var xw = padL + T.adv('a) x-y=3,5') + 0.9 * F;

    /* ---- a) ---- */
    y = 118;
    T.str('a) x-y=3,5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['y står med minustecken. Jag']],
      [['adderar y till båda led, så']],
      [['byter y sida.']]
    ]);
    if (vagg) {
      T.vaggOp('+y', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('x-y', padL + 30, y);
      xx = T.str('+y', xx, y, BLUE);
      xx = T.str('=3,5', xx, y);
      T.str('+y', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('x=3,5+y', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['3,5 ska bort från högerledet:']],
      [['jag subtraherar 3,5 från']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-3,5', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('x', padL + 30, y);
      xx = T.str('-3,5', xx, y, BLUE);
      xx = T.str('=3,5+y', xx, y);
      T.str('-3,5', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('y=x-3,5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Emma fick y=x+3,5: fel tecken']],
      [['på 3,5. Hennes andra rad är']],
      [['däremot rätt: 2x+y=5,5 ger']],
      [['y=5,5-2x=−2x+5,5.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar a: Nej, y=x-3,5', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['En lösning måste stämma i båda']],
      [['ekvationerna samtidigt. Jag']],
      [['prövar x=5 och y=1,5 i var']],
      [['och en.']]
    ]);
    y += 3.0 * F;
    xx = T.str('b) ', padL, y);
    var v0 = xx; xx = T.str('x=5', xx, y); var v1 = xx;
    xx = T.str(', ', xx, y);
    var w0 = xx; xx = T.str('y=1,5', xx, y); var w1 = xx;
    var yV = y;
    T.stepEnd();

    tanke(y, [
      [['Först den första ekvationen,']],
      [['x-y=3,5.']]
    ]);
    var ringar = substRings(acts, [[v0, v1, yV, F], [w0, w1, yV, F]]);
    y += 2.6 * F;
    xx = T.str('x-y=5-1,5=3,5', padL + 30, y);
    fadeRings(acts, ringar);
    T.str('stämmer', xx + 0.7 * F, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Det räcker inte att den ena']],
      [['stämmer. Samma värden i den']],
      [['andra ekvationen, 2x+y=5,5.']]
    ]);
    /* kommentaren ryms inte efter raden (pilzonen x>696) och skrivs
     * därför liten under den */
    y += 2.6 * F;
    T.str('2x+y=2·5+1,5=11,5≠5,5', padL + 30, y);
    y += 1.5 * F;
    T.str('stämmer inte', padL + 30, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Talparet uppfyller bara den']],
      [['första ekvationen, så det är']],
      [['ingen lösning. Sanna har fel.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar b: Nej', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 11: vinkeln v när bisektriserna bildar 125° ----
   * Triangeln ritas i grafit med samma orientering som provets figur
   * (A nere till vänster, B nere till höger, C uppe till vänster, D nära
   * A inne i triangeln). Hörnen räknas ut ur vinklarna 2α = 74° vid A
   * och 2β = 36° vid B, så att vinkeln ADB blir exakt 125° och v = 70°.
   * De halva vinklarna markeras i blått med bågar och etiketterna α, α,
   * β, β. Vinkelsumman i ABD ger α + β = 55°, och i ABC ger den v.
   * EKVVAL-scen: "−125°" skrivs i båda led eller på väggen. */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var y55, x55a, x55b, xp0, xp1, ringar;
    /* EN vägg för båda ekvationsoperationerna: den läggs till höger om
     * den bredaste av de två raderna, så att strecken hamnar i lodrät linje. */
    var xw = Math.max(padL + T.adv('α+β+125°=180°'),
                      padL + 30 + T.adv('v+110°=180°')) + 0.9 * F;
    var D2R = Math.PI / 180;
    var A = [70, 240], B = [380, 240], aA = 74 * D2R, aB = 36 * D2R;
    /* C: skärningen mellan strålen från A (vinkel aA) och från B (aB) */
    function skarning(P, dP, Q, dQ) {
      var det = dP[0] * (-dQ[1]) - dP[1] * (-dQ[0]);
      var t = ((Q[0] - P[0]) * (-dQ[1]) - (Q[1] - P[1]) * (-dQ[0])) / det;
      return [P[0] + dP[0] * t, P[1] + dP[1] * t];
    }
    var C = skarning(A, [Math.cos(aA), -Math.sin(aA)],
                     B, [-Math.cos(aB), -Math.sin(aB)]);
    var D = skarning(A, [Math.cos(aA / 2), -Math.sin(aA / 2)],
                     B, [-Math.cos(aB / 2), -Math.sin(aB / 2)]);
    var FIGB_Y = 300;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: triangeln, bisektriserna, hörnen och de givna vinklarna */
    T.line(A, B); T.pause(120);
    T.line(B, C); T.pause(120);
    T.line(C, A); T.pause(160);
    T.line(A, D); T.pause(120);
    T.line(B, D); T.pause(160);
    T.str('A', A[0] - 20, A[1] + 22, null, 0.62);
    T.str('B', B[0] + 2, B[1] + 22, null, 0.62);
    T.str('C', C[0] - 22, C[1] - 4, null, 0.62);
    T.str('D', D[0] - 6, D[1] - 10, null, 0.62);
    T.pause(160);
    var mD = bage(T, D, A, B, 22);
    radLabel(T, F, '125°', D, mD, 42);
    T.pause(120);
    var mC = bage(T, C, A, B, 20);
    radLabel(T, F, 'v', C, mC, 34);
    T.stepEnd();

    /* steg 2: de halva vinklarna i blått */
    figurBubble(268, [
      [['En bisektris delar vinkeln mitt']],
      [['itu. Jag kallar halva vinkeln']],
      [['vid A för α och halva vinkeln']],
      [['vid B för β. Hela vinklarna är']],
      [['då 2α och 2β.']]
    ]);
    var m1 = bage(T, A, B, D, 30, BLUE);
    radLabel(T, F, 'α', A, m1, 52, BLUE);
    T.pause(120);
    var m2 = bage(T, A, D, C, 30, BLUE);
    radLabel(T, F, 'α', A, m2, 52, BLUE);
    T.pause(160);
    /* vinkeln vid B är spetsig (18° per halva): etiketterna läggs långt
     * ut, där kilen är bred nog att rymma dem utan att nudda benen */
    var m3 = bage(T, B, A, D, 34, BLUE);
    radLabel(T, F, 'β', B, m3, 104, BLUE);
    T.pause(120);
    var m4 = bage(T, B, D, C, 34, BLUE);
    radLabel(T, F, 'β', B, m4, 104, BLUE);
    T.stepEnd();

    /* ---- den lilla triangeln ABD ---- */
    figurBubble(268, [
      [['I den lilla triangeln ABD är']],
      [['vinklarna α, β och 125°.']],
      [['Vinkelsumman i en triangel']],
      [['är 180°.']]
    ]);
    y = 372;
    T.str('Vinkelsumman i triangeln ABD', padL, y - 1.45 * F, null, 0.62);
    T.str('α+β+125°=180°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 125° från']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-125°', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('α+β+125°', padL, y);
      xx = T.str('-125°', xx, y, BLUE);
      xx = T.str('=180°', xx, y);
      T.str('-125°', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    y55 = y; x55a = padL + 30;
    x55b = T.str('α+β=55°', x55a, y);
    T.stepEnd();

    /* ---- den stora triangeln ABC ---- */
    tanke(y, [
      [['I den stora triangeln ABC är']],
      [['vinklarna 2α, 2β och v.']]
    ]);
    y += 3.6 * F;
    T.str('Vinkelsumman i triangeln ABC', padL, y - 1.45 * F, null, 0.62);
    T.str('v+2α+2β=180°', padL, y);
    T.stepEnd();

    /* UTBRYTNING: 2α+2β är dubbla summan α+β, och den summan är känd.
     * Parentesen stängs först med sin sista term (se REGEL: PARENTESEN
     * STÄNGS SIST i handskrift.js filhuvud). */
    tanke(y, [
      [['Jag känner inte α och β var']],
      [['för sig, bara summan α+β. Men']],
      [['både 2α och 2β har faktorn 2,']],
      [['så jag bryter ut tvåan.']]
    ]);
    y += 2.6 * F;
    xx = T.str('v+2(', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kvar innanför parentesen blir']],
      [['α+β, och då kan parentesen']],
      [['stängas.']]
    ]);
    xp0 = xx;
    xx = T.str('α+β', xx, y);
    xp1 = xx;
    T.str(')=180°', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in 55° på']],
      [['α+β:s plats i parentesen.']]
    ]);
    ringar = substRings(acts, [[x55a, x55b, y55, F], [xp0, xp1, y, F]]);
    y += 2.6 * F;
    T.str('v+2·55°=180°', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Multiplikationen först:']],
      [['2·55°=110°.']]
    ]);
    y += 2.4 * F;
    T.str('v+110°=180°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu är det en vanlig ekvation.']],
      [['Jag subtraherar 110° från']],
      [['båda led.']]
    ]);
    y = ekvOp(y, '-110°', xw, 'v+110°=180°');
    T.str('v=70°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: figurens vinkel vid C']],
      [['ser ut att vara något mindre']],
      [['än en rät vinkel.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: v=70°', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 12: ekvationssystemet med decimaler ----
   * Första ekvationen multipliceras med 10 och 3,5 flyttas ur den andra
   * (blå anteckningar vid raderna), så att systemet blir 2x − 5y = 12,
   * x + y = 2,5. y löses ut ur den andra, sätts in i den första med
   * ringar, −5 multipliceras in med en båge per term, x löses ut och
   * y räknas ut. Kontrollen görs i en bubbla.
   * EKVVAL-scen: "+12,5" och "/7" skrivs i båda led eller på väggen. */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xw = padL + 30 + T.adv('2x-12,5+5x=12') + 0.9 * F;

    /* ---- systemet som det står ----
     * Första raden ligger vid y=228: de blå anteckningarna "·10" och
     * "−3,5" efter raderna når x>420, och i ekvval-scener är inställnings-
     * rutans mobilzon x>420, y<210. */
    y = 240;
    var y1 = y, y2 = y + 2.2 * F, xs = sysX(F, padL + 12);
    sysBrace(T, F, padL + 12, y1 - 0.9 * F, y2 + 0.35 * F);
    var e1 = T.str('0,2x-0,5y=1,2', xs, y1);
    T.pause(150);
    var e2 = T.str('x+y+3,5=6', xs, y2);
    y = y2;
    T.stepEnd();

    tanke(y, [
      [['Decimalerna försvinner om jag']],
      [['multiplicerar den första']],
      [['ekvationen med 10 i båda led.']],
      [['I den andra subtraherar jag']],
      [['3,5 från båda led.']]
    ]);
    T.str('·10', e1 + 0.7 * F, y1, BLUE);
    T.pause(250);
    T.str('-3,5', e2 + 0.7 * F, y2, BLUE);
    T.stepEnd();

    /* ---- det städade systemet ---- */
    y += 3.2 * F;
    y1 = y; y2 = y + 2.2 * F;
    sysBrace(T, F, padL + 12, y1 - 0.9 * F, y2 + 0.35 * F);
    T.str('2x-5y=12', xs, y1);
    var ya0 = xs + T.adv('2x-5'), ya1 = xs + T.adv('2x-5y');
    T.pause(150);
    T.str('x+y=2,5', xs, y2);
    y = y2;
    T.stepEnd();

    tanke(y, [
      [['Substitutionsmetoden: jag löser']],
      [['ut y ur den andra ekvationen,']],
      [['där det är enklast. x subtraheras']],
      [['från båda led.']]
    ]);
    y += 2.8 * F;
    xx = T.str('y=', padL + 30, y);
    var u0 = xx; xx = T.str('2,5-x', xx, y); var u1 = xx;
    var yU = y;
    T.stepEnd();

    /* insättning: uttrycket för y ringas in, liksom y i den första
     * ekvationen */
    tanke(y, [
      [['Jag sätter in 2,5-x i stället']],
      [['för y i den första ekvationen.']],
      [['Då finns bara x kvar.']]
    ]);
    var ringar = substRings(acts, [[u0, u1, yU, F], [ya0, ya1, y1, F]]);
    /* extra radavstånd: bågarna från −5 (upp till 42 px över raden) får
     * inte gå in i raden ovanför */
    y += 3.6 * F;
    var yK = y;
    xx = T.str('2x', padL + 30, y);
    var f0 = xx; xx = T.str('-5', xx, y);  var f1 = xx;
    xx = T.str('(', xx, y);
    var t0 = xx; xx = T.str('2,5', xx, y); var t1 = xx;
    var v0 = xx; xx = T.str('-x', xx, y);  var v1 = xx;
    T.str(')=12', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['−5 multipliceras med varje term']],
      [['i parentesen: −5·2,5=−12,5 och']],
      [['−5·(−x)=+5x.']]
    ]);
    y += 2.6 * F;
    xx = T.str('2x', padL + 30, y);
    xx = multIn(xx, y, yK - 0.95 * F, [
      { fran: [f0, f1], till: [t0, t1], skriv: '-12,5', hojd: 26, dx: -3 },
      { fran: [f0, f1], till: [v0, v1], skriv: '+5x', hojd: 42, dx: 3 }
    ]);
    T.str('=12', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samla x-termerna: 2x+5x=7x.']]
    ]);
    y += 2.4 * F;
    T.str('7x-12,5=12', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['12,5 subtraheras i vänsterledet,']],
      [['så jag adderar 12,5 till']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+12,5', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('7x-12,5', padL + 30, y);
      xx = T.str('+12,5', xx, y, BLUE);
      xx = T.str('=12', xx, y);
      T.str('+12,5', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('7x=24,5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 7, så jag']],
      [['dividerar båda led med 7.']]
    ]);
    if (vagg) {
      T.vaggOp('/7', xw, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('7x', '7', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('24,5', '7', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('x=3,5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in x=3,5 i']],
      [['uttrycket för y.']]
    ]);
    y += 2.4 * F;
    T.str('y=2,5-3,5=−1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll i ursprungsekvationerna:']],
      [['0,2·3,5-0,5·(−1)=0,7+0,5=1,2']],
      [['och 3,5+(−1)+3,5=6. Båda']],
      [['stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x=3,5 och y=−1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 13: Fionas påstående om två tal med differensen 1 ----
   * Rubriken skrivs först och pennan stannar (tankepaus) innan talen
   * uttrycks i x. Differensen mellan kvadraterna utvecklas med
   * kvadreringsregeln (liten rubrik) till 2x + 1, summan av talen blir
   * också 2x + 1, och slutsatsen skrivs som understruken svarsrad. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var TANKPAUS = 900;

    /* rubriken först, sedan pausar pennan så att eleven hinner tänka
     * (REGEL TANKEPAUS EFTER RUBRIK) — bubblan kommer efter pausen.
     * Raden med talen är bred och ligger därför under y=150
     * (inställningsrutans mobilzon är x>420, y<150). */
    y = 176;
    T.str('Två tal med differensen 1:', padL, y - 1.45 * F, null, 0.62);
    T.stepEnd();
    T.pause(TANKPAUS);
    tanke(y - 1.45 * F, [
      [['Påståendet ska gälla för alla']],
      [['sådana par, så jag kan inte']],
      [['pröva med exempel. Är det mindre']],
      [['talet x, så är det större x+1.']]
    ], 0);
    T.str('mindre talet: x, större talet: x+1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Differensen mellan kvadraterna:']],
      [['det större talets kvadrat minus']],
      [['det mindres. (x+1)^2 utvecklas']],
      [['med första kvadreringsregeln.']]
    ]);
    y += 3.5 * F;
    T.str('Kvadreringsregeln: (a+b)^2=a^2+2ab+b^2', padL, y - 1.45 * F, null, 0.62);
    T.str('(x+1)^2-x^2=x^2+2x+1-x^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x^2 och -x^2 tar ut varandra.']]
    ]);
    y += 2.4 * F;
    T.str('=2x+1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Summan av talen: det mindre']],
      [['plus det större.']]
    ]);
    y += 2.6 * F;
    T.str('x+(x+1)=2x+1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Båda uttrycken blev 2x+1,']],
      [['vilket värde x än har. Exempel:']],
      [['6^2-5^2=36-25=11=6+5.']]
    ]);
    y += 2.6 * F;
    T.str('VL=HL för alla x', padL, y);
    T.stepEnd();

    /* slutsatsen delas på två rader: allt på en rad når in i pilzonen */
    y += 2.4 * F;
    xe = T.str('Svar: Påståendet stämmer', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: exponentialfunktionen genom (2, 2) och (5, 54) ----
   * y = C·a^x; punkterna ger ett system som skrivs med systemklammer.
   * Ekvationerna divideras (C försvinner, potensregeln ger a³ = 27),
   * a = 3 sätts in i den första ekvationen med ringar och C löses ut.
   * C är värdet vid x = 0, alltså skärningen med y-axeln.
   * EKVVAL-scen: "/9" skrivs i båda led eller på väggen. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw = padL + 30 + T.adv('C·3^2=2') + 0.9 * F;

    y = 118;
    T.str('Exponentialfunktion', padL, y - 1.45 * F, null, 0.62);
    T.str('y=C·a^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Punkterna (2, 2) och (5, 54)']],
      [['ligger på grafen. Varje punkt']],
      [['ger en ekvation: två ekvationer']],
      [['för de två obekanta C och a.']]
    ]);
    y += 3.2 * F;
    var y1 = y, y2 = y + 2.2 * F, xs = sysX(F, padL + 12);
    sysBrace(T, F, padL + 12, y1 - 0.9 * F, y2 + 0.35 * F);
    T.str('C·a^2=2', xs, y1);
    var ea0 = xs + T.adv('C·'), ea1 = xs + T.adv('C·a');
    T.pause(150);
    T.str('C·a^5=54', xs, y2);
    y = y2;
    T.stepEnd();

    tanke(y, [
      [['Delar jag den andra ekvationen']],
      [['med den första försvinner C:']],
      [['vänsterled med vänsterled och']],
      [['högerled med högerled.']]
    ]);
    y += 3.6 * F;
    xx = T.fracH('C·a^5', 'C·a^2', padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('54', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Potensregeln: a^5/a^2=a^5^-^2=a^3,']],
      [['och 54/2=27.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('a^3=27', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Vilket tal upphöjt till 3 blir']],
      [['27? 3·3·3=27, så a=3.']]
    ]);
    y += 2.4 * F;
    xx = T.str('a=', padL + 30, y);
    var a0 = xx; xx = T.str('3', xx, y); var a1 = xx;
    var yA = y;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in a=3 i den första']],
      [['ekvationen.']]
    ]);
    var ringar = substRings(acts, [[a0, a1, yA, F], [ea0, ea1, y1, F]]);
    y += 2.6 * F;
    T.str('C·3^2=2', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['3^2=9.']]
    ]);
    y += 2.4 * F;
    T.str('9C=2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['C multipliceras med 9, så jag']],
      [['dividerar båda led med 9.']]
    ]);
    if (vagg) {
      T.vaggOp('/9', xw, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('9C', '9', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('2', '9', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('C=', padL + 30, y);
    T.fracH('2', '9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['C är funktionsvärdet vid x=0,']],
      [['för a^0=1. Det är just där']],
      [['grafen skär y-axeln.']]
    ], 1.05);
    y += 4.2 * F;
    T.str('Vid x=0: y=C·a^0=C', padL, y - 2.1 * F, null, 0.62);
    xx = T.str('y=', padL, y);
    xx = T.fracH('2', '9', xx, y);
    T.str('·3^x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med den andra punkten:']],
      [['x=5 ger 2/9·3^5=2/9·243=']],
      [['486/9=54. Stämmer.']]
    ], 1.05);
    y += 3.6 * F;
    xe = T.str('Svar: y=', padL, y);
    xe = T.fracH('2', '9', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= DEL 3 ================= */
  /* ---------- gemensamma småhjälpare för del 3 (uppgift 15–21) ----------
   * STRECKAD LINJE (symmetrilinje i figur): n segment varav vartannat
   * ritas. Färg som argument — blå för anteckningar. */
  function dashLine3(T, p1, p2, n, col) {
    var i;
    for (i = 0; i < n; i++) {
      if (i % 2) continue;
      T.acts.push({ kind: 'stroke', color: col || null, pts: humanize(
        [[p1[0] + (p2[0] - p1[0]) * (i / n), p1[1] + (p2[1] - p1[1]) * (i / n)],
         [p1[0] + (p2[0] - p1[0]) * ((i + 1) / n),
          p1[1] + (p2[1] - p1[1]) * ((i + 1) / n)]]) });
    }
  }
  /* STOR PARENTES MED FÄRG — bigParen i verktygslådan ritar alltid i
   * grafit, men "det man gör i båda led" ska vara blått, så parentesen
   * som läggs runt ett helt led inför en multiplikation behöver färgen.
   * Samma mått som bigParen (1,42·F över, 1,06·F under raden). */
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
  /* BRÅK MED INDEX I TÄLJAREN ("A_DEF" över "A_ABC"): ett nedsänkt index
   * hamnar 0,15·F under täljarens baslinje och skulle träffa bråkstrecket
   * med fracH:s vanliga täljarläge. Täljaren lyfts därför lift·F
   * (standard 0,26) — i övrigt exakt fracH. Returnerar nästa x. */
  function fracLift3(T, F, numS, denS, x0, yb, lift) {
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
  /* CIRKEL ritad för hand: ett enda pennstreck varvet runt (n punkter
   * med lite jitter), med start rakt upp. */
  function cirkel(T, cx, cy, r, n) {
    var pts = [], i, a;
    for (i = 0; i <= n; i++) {
      a = -Math.PI / 2 + (i / n) * 2 * Math.PI;
      pts.push([cx + Math.cos(a) * r + V.rnd(-0.7, 0.7),
                cy + Math.sin(a) * r + V.rnd(-0.7, 0.7)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts });
  }
  /* liten ifylld punkt (samma spiral som i graf-scenerna) */
  function punkt(T, p, col) {
    T.acts.push({ kind: 'stroke', pts: V.dotPts(p[0], p[1]), color: col || null });
  }

  /* ---- Uppgift 15: repet i två butiker ----
   * x = repets längd. Första butiken: 60/x kr per meter. Andra butiken:
   * (x − 2)(60/x + 1) = 60. Parentesen utvecklas med en båge per produkt,
   * 60 subtraheras från båda led, båda led multipliceras med x och
   * andragradsekvationen löses med pq-formeln. Den negativa roten
   * förkastas, svaret kontrolleras i en bubbla.
   * EKVVAL-scen: stegen "−60" och "·x" skrivs antingen i båda led eller på
   * väggen (cfg.vagg), med samma antal klicksteg i båda lägena. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), arc = mkArc(T);
    var vagg = !!cfg.vagg;
    /* väggens x räknas ut ur den bredaste raden väggen står vid */
    var xw = padL + 30 + T.adv('60+x-') + T.fracW('120', 'x') +
             T.adv('-2=60') + 0.9 * F;
    function mid(a) { return (a[0] + a[1]) / 2; }

    /* steg 1: variabeln (liten rubrik i grafit) */
    y = 118;
    T.str('x=repets längd (m)', padL, y, null, 0.62);
    T.stepEnd();

    /* steg 2: första butikens meterpris */
    tanke(y, [
      [['Priset per meter är totalpriset']],
      [['delat med längden: 60 kr']],
      [['fördelat på x meter.']]
    ], 0);
    y += 3.0 * F;
    T.str('Första butiken:', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('60', 'x', padL + 30, y);
    T.str('kr/m', xx + 0.2 * F, y);
    T.stepEnd();

    /* steg 3: andra butikens ekvation — källraden skrivs i segment så att
     * faktorernas och termernas x-intervall fångas för bågarna */
    tanke(y, [
      [['Andra butiken tar 1 kr mer per']],
      [['meter och repet är 2 m kortare,']],
      [['men priset är ändå 60 kr. Längd']],
      [['gånger meterpris ger priset.']]
    ], 1.05);
    y += 5.6 * F;
    var yA = y;
    /* rubriken 3,6·F över raden: bågarna (fot 1,5·F upp, höjd 30 px) får inte korsa den */
    T.str('Andra butiken:', padL, y - 3.6 * F, null, 0.62);
    xx = T.str('(', padL + 30, y);
    var a0 = xx; xx = T.str('x', xx, y);   var a1 = xx;
    var b0 = xx; xx = T.str('-2', xx, y);  var b1 = xx;
    xx = T.str(')', xx, y);
    xx = bigParen(T, F, xx + 0.05 * F, y, false);
    var c0 = xx; xx = T.fracH('60', 'x', xx, y); var c1 = xx;
    var d0 = xx; xx = T.str('+1', xx, y);  var d1 = xx;
    xx = bigParen(T, F, xx + 0.12 * F, y, true);
    T.str('=60', xx, y);
    T.stepEnd();

    /* steg 4: båge → produkt, båge → produkt (REGEL MULTIPLICERA IN I
     * PARENTES). Bågfötterna läggs 1,5·F över raden: bråket och de stora
     * parenteserna når 1,42·F upp, så det vanliga 0,95·F skulle träffa
     * täljaren 60. */
    tanke(y, [
      [['Varje term i första parentesen']],
      [['multipliceras med varje term i']],
      [['den andra: fyra produkter.']]
    ], 1.05);
    y += 3.5 * F;
    var yArc = yA - 1.5 * F;
    xx = padL + 30;
    arc(mid([a0, a1]) - 4, mid([c0, c1]) - 4, yArc, 26, BLUE);
    xx = T.str('60', xx, y);
    T.pause(200);
    arc(mid([a0, a1]) + 4, mid([d0, d1]), yArc, 48, BLUE);
    xx = T.str('+x', xx, y);
    T.pause(200);
    arc(mid([b0, b1]) - 4, mid([c0, c1]) + 4, yArc, 20, BLUE);
    xx = T.str('-', xx, y);
    xx = T.fracH('120', 'x', xx, y);
    T.pause(200);
    arc(mid([b0, b1]) + 4, mid([d0, d1]) + 4, yArc, 36, BLUE);
    xx = T.str('-2', xx, y);
    T.pause(200);
    T.str('=60', xx, y);
    T.stepEnd();

    /* steg 5–6: 60 bort från båda led (ekvval) */
    tanke(y, [
      [['60 finns i båda led, så jag']],
      [['subtraherar 60 från båda led.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('-60', xw, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.4 * F;
    } else {
      /* raden är bred: den börjar vid padL så att den ryms före pilzonen */
      y += 3.4 * F;
      xx = T.str('60+x-', padL, y);
      xx = T.fracH('120', 'x', xx, y);
      xx = T.str('-2', xx, y);
      xx = T.str('-60', xx, y, BLUE);
      xx = T.str('=60', xx, y);
      T.str('-60', xx, y, BLUE);
      T.stepEnd();
      y += 3.4 * F;
    }
    xx = T.str('x-2-', padL + 30, y);
    xx = T.fracH('120', 'x', xx, y);
    T.str('=0', xx, y);
    T.stepEnd();

    /* steg 7–8: båda led gånger x (ekvval) — i båda led-läget läggs en
     * blå parentes runt hela vänsterledet innan ·x skrivs */
    tanke(y, [
      [['x står i nämnaren. Multiplicerar']],
      [['jag båda led med x försvinner']],
      [['nämnaren, eftersom 120/x·x=120.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·x', xw, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.4 * F;
    } else {
      y += 3.4 * F;
      xx = storParen(T, F, padL + 30, y, false, BLUE);
      xx = T.str('x-2-', xx, y);
      xx = T.fracH('120', 'x', xx, y);
      xx = storParen(T, F, xx + 0.12 * F, y, true, BLUE);
      xx = T.str('·x', xx, y, BLUE);
      xx = T.str('=0', xx, y);
      T.str('·x', xx, y, BLUE);
      T.stepEnd();
      y += 3.4 * F;
    }
    T.str('x^2-2x-120=0', padL + 30, y);
    T.stepEnd();

    /* steg 9: pq-formeln */
    tanke(y, [
      [['pq-formeln med p=−2 och']],
      [['q=−120. Halva p med ombytt']],
      [['tecken är 1, och (p/2)^2−q']],
      [['blir 1+120.']]
    ]);
    y += 3.6 * F;
    T.str('pq-formeln med p=−2 och q=−120', padL, y - 1.55 * F, null, 0.62);
    xx = T.str('x=1±', padL + 30, y);
    xx = T.rot('1+120', xx + 0.12 * F, y);
    xx = T.str('=1±', xx, y);
    xx = T.rot('121', xx + 0.12 * F, y);
    T.str('=1±11', xx, y);
    T.stepEnd();

    /* steg 10: de två rötterna */
    y += 2.5 * F;
    T.str('x_1=12 och x_2=−10', padL + 30, y);
    T.stepEnd();

    /* steg 11: den negativa roten förkastas */
    tanke(y, [
      [['En längd kan inte vara negativ,']],
      [['så x=−10 förkastas.']]
    ]);
    y += 2.5 * F;
    T.str('x=12', padL + 30, y);
    T.stepEnd();

    /* steg 12: kontroll i bubbla, sedan svarsraden */
    tanke(y, [
      [['Kontroll: 12 m för 60 kr är']],
      [['5 kr/m. Andra butiken: 6 kr/m']],
      [['och 10 m ger 6·10=60 kr.']],
      [['Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: 12 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 16: randvinkelsatsen ----
   * Cirkeln ritas i grafit med samma orientering som uppgiftens figur:
   * C nästan rakt upp, A nere till vänster, B till höger. Kordorna CA och
   * CB samt radierna MA och MB, vinkelbågarna vid C och M; det givna
   * gradtalet och den sökta vinkeln v i blått. Randvinkelsatsen skrivs
   * som rubrik + formel, och 52,3° ringas in i figuren innan det sätts
   * in (REGEL INSÄTTNING). */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var cx = padL + 170, cy = 182, r = 105, M = [cx, cy];
    function P(deg) {
      var a = deg * Math.PI / 180;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    }
    function ang(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]); }
    var C = P(-102), A = P(128), B = P(28);
    var FIGB_Y = 318;                       /* bubblor under figuren */
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: cirkeln, medelpunkten och de tre punkterna */
    cirkel(T, cx, cy, r, 44);
    T.pause(200);
    punkt(T, M);
    T.str('M', cx + 12, cy + 8, null, 0.62);   /* till höger om M, i punktens höjd: vinkeletiketten vid C ligger rakt ovanför */
    T.pause(120);
    punkt(T, C); T.str('C', C[0] - 6, C[1] - 12, null, 0.62);
    T.pause(120);
    punkt(T, A); T.str('A', A[0] - 28, A[1] + 16, null, 0.62);
    T.pause(120);
    punkt(T, B); T.str('B', B[0] + 10, B[1] + 8, null, 0.62);
    T.stepEnd();

    /* steg 2: kordorna, radierna och vinklarna. Bågarna spänner hela
     * vinkeln, ben till ben, med hörnet som medelpunkt; gradtalet står
     * på bisektrisen strax utanför bågen. */
    T.line(C, A); T.pause(140);
    T.line(C, B); T.pause(160);
    T.line(M, A); T.pause(140);
    T.line(M, B); T.pause(200);
    var aCB = ang(C, B), aCA = ang(C, A);          /* båda i (0, π) */
    var bisC = vinkelBage(T, C, aCB, aCA, 30);
    T.pause(120);
    /* etiketten längre in i kilen (r = 80) och något mindre, så att den
     * ryms mellan kordorna utan att ligga på någon av dem */
    var wV = T.adv('52,3°', 0.55);
    var lx = C[0] + Math.cos(bisC) * 80 - wV / 2;
    var ly = C[1] + Math.sin(bisC) * 80 + 0.25 * F;
    var v0 = T.str('52,3°', lx, ly, BLUE, 0.55);
    T.pause(200);
    var aMB = ang(M, B), aMA = ang(M, A);
    var bisM = vinkelBage(T, M, aMB, aMA, 24);
    T.pause(120);
    var wv = T.adv('v', 0.62);
    T.str('v', M[0] + Math.cos(bisM) * 42 - wv / 2,
          M[1] + Math.sin(bisM) * 42 + 0.28 * F, BLUE, 0.62);
    T.stepEnd();

    /* steg 3: satsen */
    figurBubble(268, [
      [['Vinkeln 52,3° vid C har spetsen']],
      [['på randen: en randvinkel. v vid']],
      [['M har spetsen i medelpunkten:']],
      [['en medelpunktsvinkel. Båda står']],
      [['på bågen AB.']]
    ]);
    y = 446;
    T.str('Randvinkelsatsen', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('medelpunktsvinkel=2·', padL, y);
    var r0 = xx; xx = T.str('randvinkel', xx, y); var r1 = xx;
    T.stepEnd();

    /* steg 4: insättning — randvinkeln ringas in i figuren och i formeln */
    tanke(y, [
      [['Medelpunktsvinkeln är dubbelt']],
      [['så stor som randvinkeln på']],
      [['samma båge.']]
    ]);
    var rings = substRings(acts, [
      [lx, v0, ly, 0.62 * F],
      [r0, r1, y, F]
    ]);
    y += 2.6 * F;
    T.str('v=2·52,3°=104,6°', padL + 30, y);
    fadeRings(acts, rings);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: v=104,6°', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 17: rotekvationen √(2,11x − 5) = 8,6 ----
   * Roten står redan ensam, så båda led kvadreras: i båda led-läget
   * skrivs raden om med blå parenteser och ^2 efter vardera ledet. Väggen
   * skulle för den raden hamna i inställningsrutans mobilzon (x > 420
   * ovanför y = 210), så kvadreringssteget behåller ledformen i BÅDA
   * lägena; "+5" och "/2,11" går på väggen (cfg.vagg). Svaret avrundas
   * först i sista ledet och prövas i en bubbla. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw = padL + 30 + T.adv('2,11x-5=73,96') + 0.9 * F;

    y = 118;
    xx = T.rot('2,11x-5', padL, y);
    T.str('=8,6', xx, y);
    T.stepEnd();

    /* kvadrering — ledform i båda lägena (se ovan) */
    tanke(y, [
      [['Roten står ensam i vänsterledet.']],
      [['Kvadrerar jag båda led']],
      [['försvinner roten, och']],
      [['8,6^2=73,96.']]
    ]);
    y += 2.5 * F;
    xx = T.str('(', padL, y, BLUE);
    xx = T.rot('2,11x-5', xx, y);
    xx = T.str(')^2', xx, y, BLUE);
    xx = T.str('=', xx, y);
    xx = T.str('(', xx, y, BLUE);
    xx = T.str('8,6', xx, y);
    T.str(')^2', xx, y, BLUE);
    T.stepEnd();

    y += 2.4 * F;
    T.str('2,11x-5=73,96', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['5 subtraheras i vänsterledet,']],
      [['så jag adderar 5 till båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+5', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('2,11x-5', padL + 30, y);
      xx = T.str('+5', xx, y, BLUE);
      xx = T.str('=73,96', xx, y);
      T.str('+5', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('2,11x=78,96', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 2,11, så']],
      [['jag dividerar båda led med 2,11.']]
    ]);
    if (vagg) {
      T.vaggOp('/2,11', xw, y);
      T.stepEnd();
      y += 3.2 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2,11x', '2,11', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('78,96', '2,11', xx, y);
      T.stepEnd();
      y += 3.4 * F;
    }
    xx = T.str('x=', padL + 30, y);
    xx = T.fracH('78,96', '2,11', xx, y);
    xx = T.str('=37,421...', xx, y);
    T.stepEnd();

    /* avrundningen är en fortsättning på samma rad, med egen tanke */
    tanke(y, [
      [['Svaret ska ha minst en decimal.']],
      [['Nästa siffra är 2, så 37,42...']],
      [['avrundas till 37,4.']]
    ], 1.05);
    T.str('≈37,4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Prövning med det oavrundade']],
      [['värdet: 2,11·37,421...−5=73,96']],
      [['och √73,96=8,6. Stämmer.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x≈37,4', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 18: en punkt på grafen till f(x) = 3x² + 5x + 7 ----
   * x = 0 väljs; nollan ringas in och varje x i uttrycket ringas in
   * innan insättningsraden skrivs (REGEL INSÄTTNING). Punkten (0, 7). */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* funktionen skrivs i segment så att varje x får sina x-gränser */
    y = 118;
    var yF = y;
    xx = T.str('f(', padL, y);
    var v0 = xx; xx = T.str('x', xx, y); var v1 = xx;
    xx = T.str(')=3', xx, y);
    var w0 = xx; xx = T.str('x', xx, y); var w1 = xx;
    xx = T.str('^2+5', xx, y);
    var u0 = xx; xx = T.str('x', xx, y); var u1 = xx;
    T.str('+7', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Varje punkt på grafen har formen']],
      [['(x, f(x)). Jag väljer ett enkelt']],
      [['x, till exempel 0: då blir de']],
      [['två första termerna noll.']]
    ]);
    y += 2.6 * F;
    var yX = y;
    xx = T.str('x=', padL + 30, y);
    var z0 = xx; xx = T.str('0', xx, y); var z1 = xx;
    T.stepEnd();

    /* insättning: ringa värdet, sedan varje x i uttrycket */
    var rings = substRings(acts, [
      [z0, z1, yX, F], [v0, v1, yF, F], [w0, w1, yF, F], [u0, u1, yF, F]
    ]);
    y += 2.4 * F;
    T.str('f(0)=3·0^2+5·0+7=7', padL + 30, y);
    fadeRings(acts, rings);
    T.stepEnd();

    tanke(y, [
      [['Punkten är (0, 7), där grafen']],
      [['skär y-axeln. Vilket x som helst']],
      [['duger: x=1 ger f(1)=3+5+7=15']],
      [['och punkten (1, 15).']]
    ]);
    y += 2.5 * F;
    T.str('Punkten (0, 7)', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: till exempel (0, 7)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 19: linjär regression ----
   * Räkningen görs i ett digitalt verktyg; pennan redovisar vad som matas
   * in (punkterna, i liten stil), resultatet y = −0,51x + 16,45 och en
   * rimlighetskontroll: regressionslinjen går genom medelpunkten
   * (25; 3,69). Rubriken delas på två rader så att inget hamnar i
   * inställningsrutans mobilzon (x > 420 ovanför y = 150). */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('Linjär regression', padL, y, null, 0.62);
    T.str('i digitalt verktyg', padL, y + 1.3 * F, null, 0.62);
    T.pause(200);
    y += 1.3 * F + 1.7 * F;
    xx = T.str('(22; 4,2)', padL, y, null, 0.62);
    xx = T.str('(23; 5,6)', xx + 0.6 * F, y, null, 0.62);
    xx = T.str('(24; 4,9)', xx + 0.6 * F, y, null, 0.62);
    T.str('(25; 3,6)', xx + 0.6 * F, y, null, 0.62);
    y += 1.3 * F;
    xx = T.str('(26; 3,1)', padL, y, null, 0.62);
    xx = T.str('(27; 1,9)', xx + 0.6 * F, y, null, 0.62);
    T.str('(28; 2,5)', xx + 0.6 * F, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Linjär regression betyder att']],
      [['verktyget hittar den räta linje']],
      [['som passar punkterna bäst.']]
    ], 0);
    y += 2.6 * F;
    T.str('y=−0,51x+16,45', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Regressionslinjen går alltid']],
      [['genom medelpunkten. Medelvärdet']],
      [['av x är 25 och av y är']],
      [['25,8/7=3,685...≈3,69.']]
    ]);
    y += 3.6 * F;
    T.str('Kontroll i medelpunkten (25; 3,69)', padL, y - 1.45 * F, null, 0.62);
    T.str('y=−0,51·25+16,45=3,70', padL, y);
    T.stepEnd();

    tanke(y, [
      [['3,70 är nära 3,69, så linjen']],
      [['går genom medelpunkten.']],
      [['Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: a≈−0,51 och b≈16,45', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 20: areaskala mellan likformiga trianglar ----
   * Båda trianglarna ritas skalenligt (16 px per cm) med samma
   * orientering som uppgiftens figur: rät vinkel vid B och E nere till
   * vänster, den långa kateten lodrät. Givna mått i blått; de härledda
   * måtten 3,6 och 11,2 skrivs in när längdskalan är bestämd. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var k = 16, by = 242;                              /* px per cm, basens y */
    var B = [padL + 40, by], A = [padL + 40, by - 5.6 * k], C = [padL + 40 + 1.8 * k, by];
    var E = [padL + 185, by], D = [padL + 185, by - 11.2 * k], Fp = [padL + 185 + 3.6 * k, by];
    var FIGB_Y = 300;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }
    function ang(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]); }

    /* steg 1: triangeln ABC med givna mått */
    T.line(B, A); T.pause(120);
    T.line(A, C); T.pause(120);
    T.line(C, B); T.pause(160);
    ratVinkel(T, B, [1, 0], [0, -1], 10);
    T.pause(120);
    vinkelBage(T, C, Math.PI, ang(C, A) + 2 * Math.PI, 22);
    T.pause(160);
    T.str('A', A[0] - 7, A[1] - 10, null, 0.62);
    T.str('B', B[0] - 24, B[1] + 20, null, 0.62);
    T.str('C', C[0] + 10, C[1] + 20, null, 0.62);
    T.pause(160);
    var w56 = T.adv('5,6', 0.62);
    T.str('5,6', B[0] - 10 - w56, (A[1] + B[1]) / 2 + 0.25 * F, BLUE, 0.62);
    var w18 = T.adv('1,8', 0.62);
    T.str('1,8', (B[0] + C[0]) / 2 - w18 / 2, by + 20, BLUE, 0.62);
    T.stepEnd();

    /* steg 2: triangeln DEF */
    T.line(E, D); T.pause(120);
    T.line(D, Fp); T.pause(120);
    T.line(Fp, E); T.pause(160);
    ratVinkel(T, E, [1, 0], [0, -1], 10);
    T.pause(120);
    vinkelBage(T, Fp, Math.PI, ang(Fp, D) + 2 * Math.PI, 22);
    T.pause(160);
    T.str('D', D[0] - 7, D[1] - 10, null, 0.62);
    T.str('E', E[0] - 22, E[1] + 20, null, 0.62);
    T.str('F', Fp[0] + 8, Fp[1] + 20, null, 0.62);
    T.pause(120);
    T.str('(cm)', Fp[0] + 40, D[1] + 6, BLUE, 0.55);
    T.stepEnd();

    /* steg 3: arean av ABC */
    figurBubble(268, [
      [['Triangeln är rätvinklig vid B,']],
      [['så kateterna AB och BC är bas']],
      [['och höjd. Arean är basen gånger']],
      [['höjden delat med två.']]
    ]);
    y = 430;
    T.str('Arean av ABC', padL, y - 2.0 * F, null, 0.62);
    xx = T.str('A_A_B_C=', padL, y);
    xx = T.fracH('5,6·1,8', '2', xx, y);
    T.str('=5,04 cm^2', xx, y);
    T.stepEnd();

    /* steg 4: längdskalan — EF = 3,6 skrivs in i figuren */
    tanke(y, [
      [['Likformiga trianglar har samma']],
      [['form: alla sidor i DEF är lika']],
      [['många gånger längre än i ABC.']],
      [['EF är dubbelt så lång som BC.']]
    ], 1.05);
    var w36 = T.adv('3,6', 0.62);
    T.str('3,6', (E[0] + Fp[0]) / 2 - w36 / 2, by + 20, BLUE, 0.62);
    T.pause(200);
    y += 4.0 * F;
    T.str('Längdskalan', padL, y - 2.0 * F, null, 0.62);
    xx = T.str('längdskala=', padL, y);
    xx = T.fracH('EF', 'BC', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('3,6', '1,8', xx, y);
    T.str('=2', xx, y);
    T.stepEnd();

    /* steg 5: arean av DEF — det härledda måttet DE = 11,2 motiveras i
     * bubblan och skrivs in i figuren innan raden skrivs */
    tanke(y, [
      [['Med längdskalan 2 är DE=2·5,6,']],
      [['alltså 11,2 cm. Arean räknas']],
      [['som förut.']]
    ], 1.05);
    var w112 = T.adv('11,2', 0.62);
    T.str('11,2', E[0] - 10 - w112, (D[1] + E[1]) / 2 + 0.25 * F, BLUE, 0.62);
    T.pause(200);
    y += 4.0 * F;
    T.str('Arean av DEF', padL, y - 2.0 * F, null, 0.62);
    xx = T.str('A_D_E_F=', padL, y);
    xx = T.fracH('11,2·3,6', '2', xx, y);
    T.str('=20,16 cm^2', xx, y);
    T.stepEnd();

    /* steg 6: kvoten mellan areorna */
    tanke(y, [
      [['Hur många gånger så stor: jag']],
      [['dividerar den stora arean med']],
      [['den lilla.']]
    ], 1.05);
    y += 3.6 * F;
    xx = fracLift3(T, F, 'A_D_E_F', 'A_A_B_C', padL, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('20,16', '5,04', xx, y);
    T.str('=4', xx, y);
    T.stepEnd();

    /* steg 7: svar — "4 gånger så stor" är "3 gånger större" */
    tanke(y, [
      [['Areaskalan är längdskalan i']],
      [['kvadrat: 2^2=4. Fyra gånger så']],
      [['stor betyder tre gånger större,']],
      [['för 20,16−5,04=3·5,04.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: 4 gånger så stor', padL, y);
    xe = T.str('(3 gånger större)', xe + 0.5 * F, y, null, 0.62);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: byggnadens bredd och höjd ----
   * Parabeln skissas i grafit (samplad ur f) över ett axelkors i samma
   * orientering som uppgiftens figur. Nollställena ger bredden: x bryts
   * ut, nollproduktmetoden, och den linjära faktorn löses med "−3,92" och
   * "/(−0,14)" i båda led eller på väggen (cfg.vagg). Symmetrilinjen
   * x = 14 ritas streckad i blått; höjden är f(14), med ringar vid
   * insättningen. EKVVAL-scen med samma antal klicksteg i båda lägena. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw = padL + 30 + T.adv('−0,14x+3,92=0') + 0.9 * F;
    var ax = mkAxes(T, F, { ox: padL + 30, oy: 250, u: 30, xsc: 5, ysc: 5,
                            xmin: 0, xmax: 28, ymin: 0, ymax: 28 });
    function f(x) { return -0.14 * x * x + 3.92 * x; }
    var FIGB_Y = 320;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: axelkorset */
    ax.axes();
    T.str('(m)', ax.X(28) + 4, ax.Y(26), null, 0.5);
    T.stepEnd();

    /* steg 2: parabeln, samplad ur funktionen, med sin etikett */
    var pts = [];
    for (i = 0; i <= 28 + 1e-9; i += 0.5) pts.push([ax.X(i), ax.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: pts });
    T.pause(200);
    T.str('y=f(x)', ax.X(25) + 14, ax.Y(15), null, 0.5);
    T.stepEnd();

    /* steg 3: funktionen skrivs av i segment (x-gränserna behövs för
     * ringarna vid insättningen av 14) */
    figurBubble(268, [
      [['Bredden är avståndet mellan de']],
      [['två ställen där kurvan når']],
      [['marken, alltså där f(x)=0.']]
    ]);
    y = 420;
    var yF = y;
    xx = T.str('f(', padL, y);
    var v0 = xx; xx = T.str('x', xx, y); var v1 = xx;
    xx = T.str(')=−0,14', xx, y);
    var w0 = xx; xx = T.str('x', xx, y); var w1 = xx;
    xx = T.str('^2+3,92', xx, y);
    var u0 = xx; xx = T.str('x', xx, y); var u1 = xx;
    T.stepEnd();

    y += 2.4 * F;
    T.str('−0,14x^2+3,92x=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna innehåller x,']],
      [['så jag bryter ut x.']]
    ]);
    y += 2.4 * F;
    T.str('x(−0,14x+3,92)=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nollproduktmetoden: en produkt']],
      [['är noll precis när någon faktor']],
      [['är noll. Första faktorn är x.']]
    ]);
    y += 2.4 * F;
    T.str('x_1=0', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('−0,14x+3,92=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['3,92 adderas i vänsterledet, så']],
      [['jag subtraherar 3,92 från båda']],
      [['led.']]
    ]);
    if (vagg) {
      T.vaggOp('-3,92', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('−0,14x+3,92', padL + 30, y);
      xx = T.str('-3,92', xx, y, BLUE);
      xx = T.str('=0', xx, y);
      T.str('-3,92', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('−0,14x=−3,92', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med −0,14, så']],
      [['jag dividerar båda led med']],
      [['−0,14. Minus delat med minus']],
      [['ger plus.']]
    ]);
    if (vagg) {
      T.vaggOp('/(−0,14)', xw, y);
      T.stepEnd();
      y += 3.2 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('−0,14x', '−0,14', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('−3,92', '−0,14', xx, y);
      T.stepEnd();
      y += 3.4 * F;
    }
    xx = T.str('x_2=', padL + 30, y);
    xx = T.fracH('3,92', '0,14', xx, y);
    T.str('=28', xx, y);
    T.pause(300);
    /* nollstället skrivs in i figuren */
    var w28 = T.adv('28', 0.45);
    T.str('28', ax.X(28) - w28 / 2, ax.Y(0) + 0.83 * F, BLUE, 0.45);
    T.stepEnd();

    tanke(y, [
      [['Byggnaden står mellan x=0']],
      [['och x=28.']]
    ], 1.05);
    y += 3.2 * F;
    T.str('bredd=28-0=28 m', padL, y);
    T.stepEnd();

    /* symmetrilinjen */
    tanke(y, [
      [['Högsta punkten ligger på']],
      [['symmetrilinjen, mitt emellan']],
      [['nollställena.']]
    ]);
    y += 3.4 * F;
    var yS = y;
    xx = T.str('x=', padL, y);
    xx = T.fracH('0+28', '2', xx, y);
    xx = T.str('=', xx, y);
    var s0 = xx; xx = T.str('14', xx, y); var s1 = xx;
    T.pause(300);
    dashLine3(T, [ax.X(14), ax.Y(0) - 4], [ax.X(14), ax.Y(f(14)) + 4], 15, BLUE);
    T.pause(150);
    T.str('x=14', ax.X(14) + 6, ax.Y(2), BLUE, 0.45);
    T.stepEnd();

    /* höjden: 14 ringas in, sedan varje x i f(x), innan raden skrivs */
    tanke(y, [
      [['Höjden är funktionsvärdet på']],
      [['symmetrilinjen. Jag sätter in']],
      [['x=14 i f(x).']]
    ], 1.05);
    var rings = substRings(acts, [
      [s0, s1, yS, F], [v0, v1, yF, F], [w0, w1, yF, F], [u0, u1, yF, F]
    ]);
    y += 3.4 * F;
    T.str('f(14)=−0,14·14^2+3,92·14', padL, y);
    fadeRings(acts, rings);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('=−27,44+54,88=27,44', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Höjden anges i hela meter:']],
      [['27,44 avrundas till 27.']]
    ]);
    T.str('≈27 m', xx, y);
    T.pause(300);
    T.str('27 m', ax.X(14) + 8, ax.Y(6), BLUE, 0.45);
    T.stepEnd();

    y += 2.5 * F;
    xe = T.str('Svar: bredd 28 m och höjd 27 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= DEL 4 ================= */
  /* ---------- gemensamma småhjälpare för del 4 (uppgift 22–28) ----------
   * BRÅK I BRÅK MED BLANDAD TÄLJARE — "lg" följt av ett litet bråk i
   * täljaren över "lg 1,06389...". bigFrac tar bara ett ensamt bråk eller
   * en ensam sträng, så täljaren byggs av delar: en array ['5000','1411']
   * blir ett litet bråk, en sträng skrivs som den är. Samma mått som
   * bigFrac (delarnas mittlinjer 1,18·F från huvudstrecket; uttrycket når
   * 2,57·F över och 1,89·F under raden). Returnerar nästa x. */
  function bigFracMix4(T, F, numParts, denS, x0, yb) {
    function partW(p) { return Array.isArray(p) ? T.fracW(p[0], p[1]) : T.adv(p); }
    var nw = 0, i;
    for (i = 0; i < numParts.length; i++) nw += partW(numParts[i]);
    var w = Math.max(nw, T.adv(denS)) + 0.62 * F;
    var ybar = yb - 0.34 * F, mid = ybar - 1.18 * F;
    var x = x0 + (w - nw) / 2;
    for (i = 0; i < numParts.length; i++) {
      var p = numParts[i];
      if (Array.isArray(p)) x = T.fracH(p[0], p[1], x, mid + 0.34 * F);
      else x = T.str(p, x, mid + 0.45 * F);
    }
    T.pause(150);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(150);
    T.str(denS, x0 + (w - T.adv(denS)) / 2, ybar + 1.18 * F + 0.45 * F);
    return x0 + w + 1.5;
  }
  /* FÖRKORTNING GENOM STRYKNING i ett redan skrivet bråk: ett snett blått
   * streck genom faktorn `fak` i täljaren (som börjar med den) och genom
   * hela nämnaren. x0 = bråkets vänsterkant (samma som gavs till fracH),
   * numS/denS = täljare och nämnare som de skrevs. */
  function strykFaktor(T, F, numS, denS, fak, x0, yb) {
    var nw = T.adv(numS), dw = T.adv(denS);
    var w = Math.max(nw, dw) + 0.3 * F;
    var xn = x0 + (w - nw) / 2, xd = x0 + (w - dw) / 2;
    T.strike(xn, xn + T.adv(fak), yb - 0.48 * F);
    T.pause(200);
    T.strike(xd, xd + dw, yb + 0.70 * F);
    T.pause(260);
  }
  /* VINKELBÅGE mellan riktningarna mot två punkter: bågen spänner den
   * inre vinkeln (< 180°) med hörnet c som medelpunkt. Returnerar
   * bisektrisens riktning (radianer), för etikettplaceringen. */
  function ang4(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]); }
  function bage4(T, c, p1, p2, r) {
    var a1 = ang4(c, p1), d = ang4(c, p2) - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    vinkelBage(T, c, a1, a1 + d, r);
    return a1 + d / 2;
  }
  /* liten etikett (0,62·F) centrerad i punkten c + R·(cos m, sin m) */
  function radLabel4(T, F, ch, c, m, R, col) {
    var w = T.adv(ch, 0.62), h = 0.56 * F * 0.62;
    T.str(ch, c[0] + Math.cos(m) * R - w / 2, c[1] + Math.sin(m) * R + h / 2,
          col || null, 0.62);
  }

  /* ---- Uppgift 22: tigrarna i Indien ----
   * Först förändringsfaktorn a ur 1411·a^12 = 2967 (dividera med 1411,
   * dra tolfte roten = upphöj till 1/12), sedan året ur 1411·a^t = 5000
   * (dividera med 1411, logaritmera, dividera med lg a). Faktorn bärs
   * vidare oavrundad, 1,06389..., precis som textlösningen.
   * EKVVAL-scen: de två "/1411"-stegen skrivs i båda led eller på väggen
   * (cfg.vagg). Divisionen med lg 1,06389... ryms inte på väggen och
   * skrivs därför likadant i båda lägena (kvoten direkt, som i u6 a).
   * Första raden ligger vid y=248: i ekvval-scener är inställningsrutans
   * mobilzon x>420, y<210, och väggen "/1411" når dit från rad 1. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw1 = padL + T.adv('1411·a^1^2=2967') + 0.9 * F;
    var xw2 = padL + T.adv('1411·1,06389...^t=5000') + 0.9 * F;

    /* ---- förändringsfaktorn ---- */
    y = 248;
    T.str('a = årlig förändringsfaktor', padL, y - 1.45 * F, null, 0.62);
    T.str('1411·a^1^2=2967', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Från början av 2006 till början']],
      [['av 2018 är det 12 år, alltså 12']],
      [['multiplikationer med a. Jag']],
      [['dividerar båda led med 1411.']]
    ]);
    if (vagg) {
      T.vaggOp('/1411', xw1, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('1411·a^1^2', '1411', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('2967', '1411', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('a^1^2=', padL + 30, y);
    T.fracH('2967', '1411', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Tolfte roten ur båda led. Att']],
      [['dra tolfte roten är detsamma']],
      [['som att upphöja till 1/12.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('a=', padL + 30, y);
    xx = T.parenFrac('2967', '1411', null, xx, y);
    /* exponenten 1/12 som litet bråk uppe vid parentesens topp */
    xx = expFrac(T, F, '1', '12', xx, y - 0.62 * F);
    T.stepEnd();

    tanke(y, [
      [['Räknaren ger 1,06389... Jag']],
      [['behåller många decimaler: en']],
      [['avrundad faktor ger fel år efter']],
      [['tjugo års ökning. Ungefär 6,4 %']],
      [['per år.']]
    ], 1.05);
    T.str('=1,06389...', xx + 0.06 * F, y);
    T.stepEnd();

    /* ---- året då antalet är 5000 ---- */
    tanke(y, [
      [['t år efter början av 2006 är']],
      [['antalet 1411·a^t. Jag söker det']],
      [['t som ger 5000.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('t = år efter början av 2006', padL, y - 1.45 * F, null, 0.62);
    T.str('1411·1,06389...^t=5000', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Potensen ska stå ensam: jag']],
      [['dividerar båda led med 1411.']]
    ]);
    if (vagg) {
      T.vaggOp('/1411', xw2, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('1411·1,06389...^t', '1411', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('5000', '1411', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('1,06389...^t=', padL + 30, y);
    T.fracH('5000', '1411', xx, y);
    T.stepEnd();

    tanke(y, [
      [['t står i exponenten. Jag']],
      [['logaritmerar båda led, och']],
      [['logaritmlagen lg a^t=t·lg a']],
      [['plockar ned t som en faktor.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('t·lg 1,06389...=lg', padL + 30, y);
    T.fracH('5000', '1411', xx + 0.12 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med']],
      [['lg 1,06389... så står t ensamt.']],
      [['Räknaren ger kvoten.']]
    ], 1.05);
    y += 4.2 * F;
    xx = T.str('t=', padL + 30, y);
    xx = bigFracMix4(T, F, ['lg ', ['5000', '1411']], 'lg 1,06389...', xx, y);
    T.str('=20,4...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['t räknas från början av 2006.']],
      [['Drygt 20 år senare är vi en bit']],
      [['in på år 2026.']]
    ], 1.9);
    y += 3.4 * F;
    T.str('2006+20,4≈2026,4', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: från 2018 är det 8,4']],
      [['år, och 2967·1,0639^8,4 är']],
      [['ungefär 5000.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: år 2026', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 23: c = a + b i fyrhörningen PMQR ----
   * Cirkeln ritas i grafit med samma orientering som provets figur
   * (P nere till vänster, Q nere till höger, R upptill något åt vänster,
   * M i mitten). Hjälplinjen MR dras i blått: den delar fyrhörningen i
   * två likbenta trianglar (två sidor är radier), och basvinklarna vid R
   * blir a respektive b — de skrivs in i blått vid R. Bubblor som hör
   * till figuren läggs UNDER figuren. */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var C = [245, 205], r = 105;
    function pt(deg) {
      var a = deg * Math.PI / 180;
      return [C[0] + Math.cos(a) * r, C[1] + Math.sin(a) * r];
    }
    var P = pt(162), Q = pt(13), R = pt(257);
    var FIGB_Y = 345;                        /* bubblor under figuren */
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: cirkeln (samplad polylinje), punkterna, sträckorna och de
     * tre markerade vinklarna */
    var pts = [];
    for (i = 0; i <= 48; i++) pts.push(pt(-100 + 360 * i / 48));
    acts.push({ kind: 'stroke', pts: pts });
    T.pause(200);
    T.line([C[0] - 2, C[1]], [C[0] + 2, C[1] + 1]);
    T.str('M', C[0] + 8, C[1] - 6, null, 0.62);
    T.pause(120);
    T.str('R', R[0] - T.adv('R', 0.62) / 2, R[1] - 8, null, 0.62);
    T.str('P', P[0] - T.adv('P', 0.62) - 6, P[1] + 8, null, 0.62);
    T.str('Q', Q[0] + 8, Q[1] + 8, null, 0.62);
    T.pause(160);
    T.line(P, C); T.pause(120);
    T.line(C, Q); T.pause(120);
    T.line(P, R); T.pause(120);
    T.line(R, Q); T.pause(200);
    var mP = bage4(T, P, C, R, 24);
    radLabel4(T, F, 'a', P, mP, 40);
    T.pause(120);
    var mQ = bage4(T, Q, C, R, 24);
    radLabel4(T, F, 'b', Q, mQ, 40);
    T.pause(120);
    bage4(T, R, P, Q, 22);
    /* c-etiketten läggs på P-sidan om den kommande hjälplinjen MR, som
     * annars skulle gå rakt genom den */
    var mRa = (ang4(R, P) + ang4(R, C)) / 2;     /* bisektris i vinkeln MRP */
    var mRb = (ang4(R, C) + ang4(R, Q)) / 2;     /* bisektris i vinkeln MRQ */
    radLabel4(T, F, 'c', R, mRa, 38);
    T.stepEnd();

    /* steg 2: hjälplinjen MR i blått */
    figurBubble(268, [
      [['Jag drar hjälplinjen MR. Då']],
      [['delas fyrhörningen i två']],
      [['trianglar, MPR och MQR.']]
    ]);
    T.line(C, R, BLUE);
    T.stepEnd();

    figurBubble(268, [
      [['MP, MQ och MR är alla radier i']],
      [['cirkeln, alltså lika långa.']]
    ]);
    y = 370;
    T.str('MP=MR=MQ (radier)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Triangeln MPR har två lika långa']],
      [['sidor, MP och MR. Den är likbent,']],
      [['så basvinklarna vid P och R']],
      [['är lika stora.']]
    ]);
    y += 3.5 * F;
    T.str('Triangeln MPR är likbent', padL, y - 1.45 * F, null, 0.62);
    T.str('⇒ ∠MRP=∠MPR=a', padL, y);
    T.pause(200);
    radLabel4(T, F, 'a', R, mRa, 66, BLUE);
    T.stepEnd();

    tanke(y, [
      [['Samma sak i triangeln MQR:']],
      [['MQ och MR är lika långa, så']],
      [['vinklarna vid Q och R är lika.']]
    ]);
    y += 3.5 * F;
    T.str('Triangeln MQR är likbent', padL, y - 1.45 * F, null, 0.62);
    T.str('⇒ ∠MRQ=∠MQR=b', padL, y);
    T.pause(200);
    radLabel4(T, F, 'b', R, mRb, 58, BLUE);
    T.stepEnd();

    tanke(y, [
      [['Hjälplinjen delar vinkeln c vid']],
      [['R i två delar: a närmast P och']],
      [['b närmast Q.']]
    ]);
    y += 2.6 * F;
    T.str('c=∠PRM+∠MRQ=a+b', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag använde bara att MP, MQ och']],
      [['MR är radier. Det gäller för']],
      [['alla sådana fyrhörningar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: c=a+b, vilket skulle visas', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: Edith kör om Adrian ----
   * a) y = 81x är sträcka = hastighet · tid, så x är en tid i timmar.
   * b) Adrians ekvation läggs till (13 km försprång), högerleden sätts
   * lika, x löses ut och sätts in i y = 81x med ringar. 117 km är en
   * tredjedel av vägen, så hela sträckan är 3·117 = 351 km ≈ 350 km.
   * EKVVAL-scen: "−72x" och "/9" skrivs i båda led eller på väggen. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw = padL + 30 + T.adv('81x=72x+13') + 0.9 * F;

    /* ---- a) ---- */
    y = 118;
    T.str('a) y=81x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['81 är Ediths hastighet i km/h']],
      [['och y är sträckan i km. Sträcka']],
      [['är hastighet gånger tid, så x']],
      [['måste vara en tid i timmar.']]
    ]);
    /* raden ligger under y=210: ekvval-scenens mobilzon (x>420) */
    y += 4.3 * F;
    T.str('sträcka = hastighet · tid', padL, y - 1.45 * F, null, 0.62);
    T.str('x=tiden i timmar till omkörningen', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar a: x är tiden i timmar', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ekvationssystemet ---- */
    tanke(y, [
      [['Adrian kör lika lång tid x, med']],
      [['72 km/h, men hade redan 13 km']],
      [['försprång. Vid omkörningen har']],
      [['båda kört samma sträcka y.']]
    ]);
    y += 3.6 * F;
    var xb = T.str('b) ', padL, y);
    var y1 = y, y2 = y + 2.2 * F;
    sysBrace(T, F, xb + 6, y1 - 0.9 * F, y2 + 0.35 * F);
    xx = T.str('y=81', sysX(F, xb + 6), y1);
    var vx0 = xx; xx = T.str('x', xx, y1); var vx1 = xx;
    T.pause(150);
    T.str('y=72x+13', sysX(F, xb + 6), y2);
    y = y2;
    T.stepEnd();

    tanke(y, [
      [['Båda ekvationerna ger y, så']],
      [['högerleden är lika stora.']]
    ]);
    y += 2.8 * F;
    T.str('81x=72x+13', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x finns i båda led. Jag']],
      [['subtraherar 72x från båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-72x', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('81x', padL + 30, y);
      xx = T.str('-72x', xx, y, BLUE);
      xx = T.str('=72x+13', xx, y);
      T.str('-72x', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('9x=13', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 9, så jag']],
      [['dividerar båda led med 9.']]
    ]);
    if (vagg) {
      T.vaggOp('/9', xw, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('9x', '9', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('13', '9', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('x=', padL + 30, y);
    var fx0 = xx;
    xx = T.fracH('13', '9', xx, y);
    var fx1 = xx;
    T.str('=1,44...', xx, y);
    var yX = y;
    T.stepEnd();

    /* insättning: x = 13/9 ringas in, liksom x i y = 81x */
    tanke(y, [
      [['Nu sätter jag in x i den första']],
      [['ekvationen, y=81x.']]
    ], 1.05);
    var ringar = substRings(acts, [
      [fx0, fx1, yX, F, { cy: yX - 0.20 * F, ry: 1.25 * F }],
      [vx0, vx1, y1, F]
    ]);
    y += 3.6 * F;
    xx = T.str('y=81·', padL + 30, y);
    xx = T.fracH('13', '9', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('81·13', '9', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['81 är delbart med 9: 81/9=9.']],
      [['Kvar blir 9·13.']]
    ], 1.05);
    T.str('=9·13=117', xx, y);
    T.stepEnd();

    tanke(y, [
      [['117 km är en tredjedel av hela']],
      [['sträckan, så hela sträckan är']],
      [['tre gånger så lång.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('Hela sträckan', padL, y - 1.45 * F, null, 0.62);
    T.str('3·117=351 km≈350 km', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt: Edith kör om efter']],
      [['knappt en och en halv timme,']],
      [['och 81·1,44 är ungefär 117.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar b: 351 km≈350 km', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 25: den högsta timlönen ----
   * Lönerna kallas l_1 ≤ l_2 ≤ l_3 ≤ l_4. Medelvärdet ger summan 840,
   * medianen ger l_2 + l_3 = 400, så l_1 + l_4 = 440; variationsbredden
   * ger l_4 − l_1 = 80. Ekvationssystemet löses med additionsmetoden.
   * EKVVAL-scen: "/2" skrivs i båda led eller på väggen. */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw = padL + 30 + T.adv('2l_4=520') + 0.9 * F;

    y = 118;
    T.str('l = timlön, i storleksordning:', padL, y - 1.45 * F, null, 0.62);
    T.str('l_1≤l_2≤l_3≤l_4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Medelvärdet är summan delat']],
      [['med antalet. Fyra löner med']],
      [['medelvärdet 210 har summan']],
      [['4·210.']]
    ]);
    /* raden ligger under y=210: ekvval-scenens mobilzon (x>420) */
    y += 4.2 * F;
    T.str('medelvärde 210:', padL, y - 1.45 * F, null, 0.62);
    T.str('l_1+l_2+l_3+l_4=4·210=840', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Fyra värden: medianen är']],
      [['medelvärdet av de två mittersta.']]
    ]);
    y += 3.6 * F;
    T.str('median 200:', padL, y - 2.1 * F, null, 0.62);
    xx = T.fracH('l_2+l_3', '2', padL, y);
    T.str('=200 ⇒ l_2+l_3=400', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Alla fyra har summan 840 och de']],
      [['två mittersta 400. Resten är']],
      [['den lägsta och den högsta.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('l_1+l_4=840-400=440', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Variationsbredden är största']],
      [['minus minsta värdet.']]
    ]);
    y += 3.5 * F;
    T.str('variationsbredd:', padL, y - 1.45 * F, null, 0.62);
    T.str('l_4-l_1=80', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Två ekvationer med två obekanta,']],
      [['l_1 och l_4.']]
    ]);
    y += 3.0 * F;
    var y1 = y, y2 = y + 2.2 * F;
    sysBrace(T, F, padL + 12, y1 - 0.9 * F, y2 + 0.35 * F);
    T.str('l_1+l_4=440', sysX(F, padL + 12), y1);
    T.pause(150);
    T.str('l_4-l_1=80', sysX(F, padL + 12), y2);
    y = y2;
    T.stepEnd();

    tanke(y, [
      [['Additionsmetoden: jag adderar']],
      [['ekvationerna led för led. Då']],
      [['försvinner l_1, för l_1 och -l_1']],
      [['tar ut varandra.']]
    ]);
    y += 2.6 * F;
    T.str('2l_4=520', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['l_4 multipliceras med 2, så jag']],
      [['dividerar båda led med 2.']]
    ]);
    if (vagg) {
      T.vaggOp('/2', xw, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2l_4', '2', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('520', '2', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('l_4=260', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Den lägsta lönen: summan 440']],
      [['minus den högsta.']]
    ]);
    y += 2.4 * F;
    T.str('l_1=440-260=180', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med 180, 200, 200 och']],
      [['260: medelvärde 840/4=210,']],
      [['median 200, variationsbredd']],
      [['260-180=80. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 260 kr/h', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 26: är (a² + b² + c² − 2)/3 alltid ett heltal? ----
   * De tre talen uttrycks i a (rubrik med tankepaus), sätts in i
   * uttrycket med ringar, täljaren utvecklas med kvadreringsregeln och
   * blir 3a² + 6a + 3. Trean bryts ut och förkortas bort (stryks i
   * blått), och a² + 2a + 1 känns igen som (a + 1)² = b². */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var TANKPAUS = 900;

    /* rubriken först, sedan pausar pennan så att eleven hinner tänka
     * (REGEL TANKEPAUS EFTER RUBRIK) — bubblan kommer efter pausen */
    y = 118;
    T.str('Tre på varandra följande heltal:', padL, y - 1.45 * F, null, 0.62);
    T.stepEnd();
    T.pause(TANKPAUS);
    tanke(y - 1.45 * F, [
      [['Talen skiljer sig med 1 i taget.']],
      [['Är det minsta a, så är de andra']],
      [['a+1 och a+2.']]
    ], 0);
    xx = T.str('b=', padL, y);
    var b0 = xx; xx = T.str('a+1', xx, y); var b1 = xx;
    xx = T.str(', c=', xx, y);
    var c0 = xx; xx = T.str('a+2', xx, y); var c1 = xx;
    T.stepEnd();

    /* insättning i uttrycket: de två uttrycken ringas in först */
    tanke(y, [
      [['Jag sätter in b=a+1 och c=a+2']],
      [['i uttrycket. Då finns bara']],
      [['bokstaven a kvar.']]
    ]);
    var ringar = substRings(acts, [[b0, b1, y, F], [c0, c1, y, F]]);
    y += 3.6 * F;
    T.fracH('a^2+(a+1)^2+(a+2)^2-2', '3', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Kvadreringsregeln på (a+1)^2']],
      [['och (a+2)^2. Sedan samlar jag']],
      [['kvadrattermer, a-termer och']],
      [['konstanter var för sig.']]
    ], 1.05);
    y += 4.6 * F;
    T.str('Täljaren med kvadreringsregeln:', padL, y - 2.9 * F, null, 0.62);
    T.str('(a+b)^2=a^2+2ab+b^2', padL, y - 1.45 * F, null, 0.62);
    T.str('a^2+a^2+2a+1+a^2+4a+4-2', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('=3a^2+6a+3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Alla tre termerna är delbara']],
      [['med 3. Jag bryter ut 3 och']],
      [['förkortar bort den mot']],
      [['nämnaren.']]
    ]);
    y += 3.6 * F;
    xx = T.fracH('3a^2+6a+3', '3', padL, y);
    xx = T.str('=', xx, y);
    var fx = xx;
    xx = T.fracH('3(a^2+2a+1)', '3', xx, y);
    T.pause(300);
    strykFaktor(T, F, '3(a^2+2a+1)', '3', '3', fx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=a^2+2a+1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['a^2+2a+1 är kvadraten (a+1)^2']],
      [['enligt kvadreringsregeln, och']],
      [['a+1 är b.']]
    ]);
    T.str('=(a+1)^2=b^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['a är ett heltal, så b=a+1 är ett']],
      [['heltal, och kvadraten på ett']],
      [['heltal är alltid ett heltal.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Ja, det är alltid heltalet b^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 27: sträckan S mellan två punkter på f(x) = x²/a ----
   * Punkternas y-koordinater räknas ut (bråken förkortas med a genom
   * strykning i blått), avståndsformeln ställs upp under en liten rubrik
   * och roten förenklas till a√10. Första raden ligger vid y=185 så att
   * "(a, a)" inte hamnar i inställningsrutans mobilzon (x>420, y<150). */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- punkten med x = a ---- */
    y = 185;
    T.str('Punkten där x=a', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('f(a)=', padL, y);
    var f0 = xx;
    xx = T.fracH('a^2', 'a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråket förkortas med a:']],
      [['a^2 delat med a är a.']]
    ], 1.05);
    strykFaktor(T, F, 'a^2', 'a', 'a', f0, y);
    T.str('=a ⇒ (a, a)', xx, y);
    T.stepEnd();

    /* ---- punkten med x = 2a ---- */
    tanke(y, [
      [['Sätt in x=2a. Hela 2a kvadreras:']],
      [['(2a)^2=2a·2a=4a^2.']]
    ], 1.05);
    y += 4.6 * F;
    T.str('Punkten där x=2a', padL, y - 2.1 * F, null, 0.62);
    xx = T.str('f(2a)=', padL, y);
    xx = T.fracH('(2a)^2', 'a', xx, y);
    xx = T.str('=', xx, y);
    var g0 = xx;
    xx = T.fracH('4a^2', 'a', xx, y);
    T.stepEnd();

    T.pause(200);
    strykFaktor(T, F, '4a^2', 'a', '4a', g0, y);
    T.str('=4a ⇒ (2a, 4a)', xx, y);
    T.stepEnd();

    /* ---- avståndsformeln ---- */
    tanke(y, [
      [['Avståndet mellan två punkter är']],
      [['hypotenusan i en rätvinklig']],
      [['triangel med kateterna Δx och']],
      [['Δy: S=√((Δx)^2+(Δy)^2).']]
    ], 1.05);
    y += 4.4 * F;
    T.str('Avståndsformeln', padL, y - 1.45 * F, null, 0.62);
    xx = T.str('S=', padL, y) + 0.12 * F;   /* luft före rottecknet */
    T.rot('(2a-a)^2+(4a-a)^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['2a-a=a och 4a-a=3a.']]
    ]);
    y += 2.8 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.rot('a^2+(3a)^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Hela 3a kvadreras:']],
      [['(3a)^2=9a^2.']]
    ]);
    xx = T.str('=', xx, y);
    xx = T.rot('a^2+9a^2', xx, y);
    T.stepEnd();

    xx = T.str('=', xx, y);
    T.rot('10a^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur en produkt är produkten']],
      [['av rötterna: √(10a^2)=√10·√(a^2),']],
      [['och √(a^2)=a eftersom a>0.']]
    ]);
    y += 2.8 * F;
    xx = T.str('=a', padL + 30, y);
    xx = T.rot('10', xx, y);
    T.str('≈3,16a', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: S=a', padL, y);
    xe = T.rot('10', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 28: AB/AQ i rektangeln med P på BC ----
   * Rektangeln ritas i grafit med samma orientering som provets figur
   * (D och C upptill, A och B nedtill, Q till höger på AB:s förlängning,
   * P en fjärdedel upp på BC). De givna måtten a och 3a skrivs i blått.
   * Trianglarna DCP och QBP är likformiga (räta vinklar vid C och B,
   * vertikalvinklar vid P — markeras med blå bågar), skalan är 3, så
   * BQ = AB/3 och AQ = 4·AB/3. Bubblor som hör till figuren läggs UNDER
   * figuren. */
  reg(28, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var A = [60, 236], B = [320, 236], C = [320, 56], D = [60, 56];
    var P = [320, 191];                         /* BP = 45, PC = 135 */
    var Q = [60 + 260 * 180 / 135, 236];        /* DP förlängd till y=236 */
    var FIGB_Y = 300;
    function figurBubble(w, lines) { T.tanke(T.bubble(120, FIGB_Y, w, lines)); }

    /* steg 1: rektangeln, förlängningen, hörnen och P, Q */
    T.line(D, C); T.pause(120);
    T.line(C, B); T.pause(120);
    T.line(B, A); T.pause(120);
    T.line(A, D); T.pause(160);
    T.line(D, Q); T.pause(120);
    T.line(B, Q); T.pause(160);
    ratVinkel(T, C, [-1, 0], [0, 1], 13);
    T.pause(100);
    ratVinkel(T, B, [-1, 0], [0, -1], 13);
    T.pause(160);
    T.str('D', D[0] - 20, D[1] - 6, null, 0.62);
    T.str('C', C[0] + 6, C[1] - 6, null, 0.62);
    T.str('A', A[0] - 20, A[1] + 22, null, 0.62);
    T.str('B', B[0] - 8, B[1] + 22, null, 0.62);
    T.str('P', P[0] + 8, P[1] - 5, null, 0.62);
    T.str('Q', Q[0] + 7, Q[1] + 8, null, 0.62);
    T.pause(200);
    /* givna mått i blått, till höger om BC */
    T.str('a', B[0] + 8, (B[1] + P[1]) / 2 + 5, BLUE, 0.62);
    T.str('3a', C[0] + 8, (C[1] + P[1]) / 2 + 5, BLUE, 0.62);
    T.stepEnd();

    /* steg 2: likformigheten — vertikalvinklarna vid P markeras i blått */
    figurBubble(268, [
      [['Räta vinklar vid C och B, och']],
      [['vertikalvinklar vid P: två lika']],
      [['vinklar, så trianglarna DCP och']],
      [['QBP är likformiga. PC motsvarar']],
      [['BP och DC motsvarar BQ.']]
    ]);
    acts.push({ kind: 'stroke', color: BLUE, pts: (function () {
      var a1 = ang4(P, D), a2 = ang4(P, C), pts = [], i;
      while (a2 - a1 > Math.PI) a2 -= 2 * Math.PI;
      while (a2 - a1 < -Math.PI) a2 += 2 * Math.PI;
      for (i = 0; i <= 10; i++) {
        var t = a1 + (a2 - a1) * i / 10;
        pts.push([P[0] + Math.cos(t) * 15, P[1] + Math.sin(t) * 15]);
      }
      return pts;
    })() });
    T.pause(150);
    acts.push({ kind: 'stroke', color: BLUE, pts: (function () {
      var a1 = ang4(P, Q), a2 = ang4(P, B), pts = [], i;
      while (a2 - a1 > Math.PI) a2 -= 2 * Math.PI;
      while (a2 - a1 < -Math.PI) a2 += 2 * Math.PI;
      for (i = 0; i <= 10; i++) {
        var t = a1 + (a2 - a1) * i / 10;
        pts.push([P[0] + Math.cos(t) * 15, P[1] + Math.sin(t) * 15]);
      }
      return pts;
    })() });
    T.pause(250);
    y = 345;
    T.str('Trianglarna DCP och QBP är likformiga', padL, y - 2.1 * F, null, 0.62);
    xx = T.fracH('DC', 'BQ', padL, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('PC', 'BP', xx, y);
    T.stepEnd();

    tanke(y, [
      [['PC=3a och BP=a, så den stora']],
      [['triangeln är 3 gånger så stor.']]
    ], 1.05);
    xx = T.str('=', xx, y);
    xx = T.fracH('3a', 'a', xx, y);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['DC är 3 gånger BQ, så BQ är en']],
      [['tredjedel av DC. I en rektangel']],
      [['är motstående sidor lika: DC=AB.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('BQ=', padL, y);
    xx = T.fracH('DC', '3', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('AB', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['AQ är AB och BQ efter varandra.']],
      [['AB är 3·AB/3, så summan blir']],
      [['4·AB/3.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('AQ=AB+', padL, y);
    xx = T.fracH('AB', '3', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('4·AB', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Att dividera med bråket 4·AB/3']],
      [['är att multiplicera med']],
      [['3/(4·AB). AB förkortas bort och']],
      [['kvar blir 3/4.']]
    ], 1.05);
    y += 4.0 * F;
    xx = T.fracH('AB', 'AQ', padL, y);
    xx = T.str('=', xx, y);
    xx = T.bigFrac('AB', ['4·AB', '3'], xx, y);
    xx = T.str('=', xx, y);
    T.fracH('3', '4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kvoten beror varken på a eller']],
      [['på rektangelns mått. Rimligt:']],
      [['BQ är en tredjedel av AB, så']],
      [['AB är tre fjärdedelar av AQ.']]
    ], 1.9);
    y += 3.6 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('AB', 'AQ', xe, y);
    xe = T.str('=', xe, y);
    xe = T.fracH('3', '4', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.9 * F, padL: padL };
  });
})();

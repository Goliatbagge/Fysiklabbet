/* ovningar-penna/fy2-1.3.js: pennlösningar till övningarna i fy2-1.3
 * Stabilitet (visas också som fy1-3.13 i Fysik nivå 1).
 *
 * En scen per övning, registrerad som "ov-fy2-1.3-u<nr>" och kopplad till
 * övningen med fältet penna i data/ovningar.js (numret är övningens plats
 * i listan, 1 = första). Katalogen laddar filen först när en övning i
 * avsnittet visar sitt lösningsförslag (se Ovning i katalog.html).
 *
 * FYSIKENS redovisningsregler ur handskrift.js filhuvud gäller:
 *   - figuren först, i grafit, med givna värden och vektorer i BLÅTT,
 *   - kort rubrik i grafit + formeln med den sökta storheten utlöst,
 *   - mätvärdesklammern DIREKT under formeln,
 *   - aldrig avrundning i mellanled, först i sista steget med ≈,
 *   - en rimlighetsbedömning i en bubbla FÖRE svarsraden,
 *   - svarsraden utan beteckning: "Svar: 37°".
 * Momentlagen skrivs som i teorins pennscener (layoutBrada): M↺=M↻ med
 * orden moturs/medurs som tonar in, moturstermerna i vänster led, och
 * hävarmen bär kraftens index (F_V ↔ l_V, F_B ↔ l_B). Ekvationsoperationer
 * redovisas med båda led (mkEkvOp), parenteser multipliceras in med bågar
 * (mkMultIn) och likadana termer ringas in innan de slås ihop (mkSamla).
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy2-1.3-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;
  /* uppgiftens figur står färdig från början (REGEL UPPGIFTENS FIGUR STÅR
   * FÄRDIG FRÅN BÖRJAN i handskrift.js) */
  var forritad = V.forritad;

  function reg(nr, fn) { HK.registrera('ov-fy2-1.3-u' + nr, fn); }

  /* dividera bort en gemensam faktor: snett blått streck genom tecknet */
  function stryk(T, F, x0, w, yb) {
    T.line([x0 - 0.16 * F, yb + 0.32 * F],
           [x0 + w + 0.16 * F, yb - 0.68 * F], BLUE);
  }
  /* avrundningen fortsätter på insättningsraden så långt arket räcker,
   * annars på en ny rad som börjar med ≈ (pilzonen, se handskrift.js) */
  function avr(T, F, xIns, y, txt) {
    if (xIns + T.adv(txt) < HK.PAPER_W - 44) { T.str(txt, xIns, y); return y; }
    y += 2.4 * F;
    T.str(txt, T.padL + 24, y);
    return y;
  }
  function slut(T, y) {
    return { acts: T.acts, contentW: 660, lastBase: y + 40, padL: T.padL };
  }
  /* streckad cirkel: ett rubbat läge av en kula */
  function dashCircle(T, cx, cy, r, color) {
    var pts = [], n = 16, i;
    for (i = 0; i < n; i++) {
      var a0 = (i / n) * 2 * Math.PI, a1 = a0 + 0.55 * 2 * Math.PI / n;
      pts.push([cx + r * Math.cos(a0), cy + r * Math.sin(a0)],
               [cx + r * Math.cos(a1), cy + r * Math.sin(a1)]);
    }
    T.dashPts(pts, color);
  }
  /* sluten polygon i grafit */
  function poly(T, pts) {
    for (var i = 0; i < pts.length; i++) T.line(pts[i], pts[(i + 1) % pts.length]);
  }
  /* en båda led-rad i segment [text, blå?], hoptryckt så att den ryms
   * fram till pilzonen (EN EKVATION SKRIVS PÅ EN RAD). Returnerar
   * x-gränserna för varje segment. */
  function segRad(T, x0, yb, segs) {
    var w = 0, i;
    for (i = 0; i < segs.length; i++) w += T.adv(segs[i][0]);
    var plats = HK.PAPER_W - 52 - x0;
    var sc = w > plats ? Math.max(0.82, plats / w) : 1;
    var x = x0, ut = [];
    for (i = 0; i < segs.length; i++) {
      var a = x;
      x = T.str(segs[i][0], x, yb, segs[i][1] ? BLUE : null, sc);
      ut.push([a, x]);
    }
    return ut;
  }
  /* en tonande etikett (note-objekt, som moturs/medurs i layoutBrada) */
  function note(x, y, text) {
    return { note: 1, x: x, y: y, text: text, fs: 15, wins: [] };
  }

  /* ---- Uppgift 1: vad krävs för att föremålet ska stå kvar? ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 280;
    /* två lutande föremål (parallellogram): tyngdpunkten = hörnens medel */
    var A = [[60, yG], [150, yG], [190, 150], [100, 150]];
    var B = [[230, yG], [310, yG], [440, 150], [360, 150]];
    function tp(P) {
      return [(P[0][0] + P[1][0] + P[2][0] + P[3][0]) / 4,
              (P[0][1] + P[1][1] + P[2][1] + P[3][1]) / 4];
    }
    function stodyta(x0, x1) {
      T.line([x0, yG + 3], [x0, yG + 13]);
      T.line([x1, yG + 3], [x1, yG + 13]);
      T.line([x0, yG + 9], [x1, yG + 9]);
      T.lbl('stödyta', (x0 + x1) / 2 - T.lblW('stödyta', 0.5) / 2,
            yG + 32, null, 0.5);
    }

    T.tanke(T.figurBubble(292, [
      [['Ritar ett föremål som lutar lite.']],
      [['Stödytan är hela undersidan']],
      [['mot golvet.']]
    ], 350));
    T.line([30, yG], [200, yG]);
    poly(T, A);
    T.pause(150);
    stodyta(60, 150);
    T.stepEnd();

    var gA = tp(A);
    T.tanke(T.figurBubble(292, [
      [['Följer tyngdpunktens lodräta']],
      [['linje ned. Den träffar innanför']],
      [['stödytan, fast inte i mitten.']]
    ], 350));
    T.arrow(gA, [gA[0], gA[1] + 24], BLUE);
    T.dot(gA[0], gA[1]);
    T.lbl('F_G', gA[0] - 8 - T.lblW('F_G'), gA[1] + 22, BLUE);
    T.pause(150);
    T.dash([gA[0], gA[1] + 26], [gA[0], yG]);
    T.stepEnd();

    var gB = tp(B);
    T.tanke(T.figurBubble(292, [
      [['Lutar föremålet mer hamnar']],
      [['linjen utanför. Då vrider tyngd-']],
      [['kraften det kring kanten.']]
    ], 350));
    T.line([215, yG], [440, yG]);
    poly(T, B);
    T.pause(150);
    stodyta(230, 310);
    T.pause(150);
    T.arrow(gB, [gB[0], gB[1] + 24], BLUE);
    T.dot(gB[0], gB[1]);
    T.lbl('F_G', gB[0] - 8 - T.lblW('F_G'), gB[1] + 22, BLUE);
    T.pause(150);
    T.dash([gB[0], gB[1] + 26], [gB[0], yG]);
    T.dot(310, yG);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Det vänstra föremålet står kvar.']],
      [['Linjen träffar innanför.']]
    ]));
    T.str('Tyngdpunktens lodräta linje', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('Innanför stödytan ⟹ står kvar', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Det högra välter. Linjen träffar']],
      [['utanför stödytan.']]
    ]));
    T.str('Utanför stödytan ⟹ välter', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mitten krävs inte, det vänstra']],
      [['står ju kvar. Normalkraften är']],
      [['lika stor som tyngdkraften så']],
      [['länge det står still. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: skål, kulle och golv ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 260, r = 12, k = 0.012;
    function skal(x) { return yG - k * (x - 100) * (x - 100); }
    function kulle(x) { return 205 + k * (x - 255) * (x - 255); }
    /* kulans medelpunkt vid x, en radie ut längs normalen (uppåt) */
    function kula(fn, x, dfn) {
      var d = dfn(x), L = Math.hypot(d, 1);
      return [x + r * d / L, fn(x) - r / L];
    }
    function kurva(fn, x0, x1) {
      var pts = [], i, n = 40;
      for (i = 0; i <= n; i++) {
        var x = x0 + (x1 - x0) * i / n;
        pts.push([x, fn(x)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts });
    }
    var dSkal = function (x) { return -2 * k * (x - 100); };
    var dKulle = function (x) { return 2 * k * (x - 255); };

    T.tanke(T.figurBubble(292, [
      [['Ritar de tre kulorna: i skålen,']],
      [['på kullen och på golvet.']]
    ], 320));
    kurva(skal, 38, 162);
    var k1 = kula(skal, 100, dSkal);
    T.circle(k1[0], k1[1], r);
    T.lbl('skål', 100 - T.lblW('skål', 0.5) / 2, yG + 30, null, 0.5);
    T.pause(150);
    kurva(kulle, 193, 317);
    var k2 = kula(kulle, 255, dKulle);
    T.circle(k2[0], k2[1], r);
    T.lbl('kulle', 255 - T.lblW('kulle', 0.5) / 2, yG + 30, null, 0.5);
    T.pause(150);
    T.line([345, yG], [445, yG]);
    T.circle(370, yG - r, r);
    T.lbl('golv', 395 - T.lblW('golv', 0.5) / 2, yG + 30, null, 0.5);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Rubbar varje kula en bit. Pilen']],
      [['visar vart den sedan rullar.']]
    ], 320));
    var s1 = kula(skal, 148, dSkal);
    dashCircle(T, s1[0], s1[1], r);
    var m1 = kula(skal, 124, dSkal);
    T.arrow([s1[0] - 15, s1[1] - 2], [m1[0] - 2, m1[1] - 14], BLUE);
    T.pause(150);
    var s2 = kula(kulle, 280, dKulle);
    dashCircle(T, s2[0], s2[1], r);
    var s3 = kula(kulle, 304, dKulle);
    T.arrow([s2[0] + 14, s2[1] - 4], [s3[0] + 6, s3[1] - 14], BLUE);
    T.pause(150);
    dashCircle(T, 420, yG - r, r);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['I skålen måste kulan uppför när']],
      [['den rubbas. Den rullar tillbaka.']]
    ]));
    T.str('Tyngdpunktens höjd vid en rubbning', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('Skålen: höjs ⟹ stabil', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['På kullen går det nedför åt']],
      [['båda hållen. Kulan rullar bort.']]
    ]));
    T.str('Kullen: sänks ⟹ labil', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['På golvet är höjden densamma']],
      [['överallt. Kulan blir kvar.']]
    ]));
    T.str('Golvet: samma höjd ⟹ indifferent', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['I tur och ordning: stabil, labil,']],
      [['indifferent. Precis som pilarna']],
      [['i figuren visar. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ C', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: gafflarna på nålspetsen ----
   * Bygget ritas lutat 15° kring stödpunkten S (nålspetsen mot myntet).
   * Tyngdpunkten ligger 80 px under S i bygget; lutningen för den åt
   * vänster och UPPÅT längs en båge kring S (streckad), vars lägsta
   * punkt är rakt under S, där tyngdpunkten låg upprätt. */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var S = [240, 140], a = 15 * Math.PI / 180;
    var c = Math.cos(a), s = Math.sin(a);
    function P(x, y) { return [S[0] + x * c - y * s, S[1] + x * s + y * c]; }
    var RG = 80, G = P(0, RG), yDim = 322;

    T.tanke(T.figurBubble(292, [
      [['Ritar bygget lite lutat. Nålen']],
      [['står på myntet, och gafflarnas']],
      [['skaft hänger nedåt och utåt.']],
      [['S är stödpunkten.']]
    ], 375));
    /* myntet på kant, på en flaskkork (resten av flaskan utanför bild) */
    T.rect(S[0] - 4, S[1], S[0] + 4, S[1] + 20);
    T.rect(S[0] - 12, S[1] + 20, S[0] + 12, S[1] + 32);
    T.pause(150);
    T.line(P(0, 0), P(0, -40));                         /* nålen */
    poly(T, [P(-14, -40), P(14, -40), P(14, -68), P(-14, -68)]); /* korken */
    T.pause(150);
    /* gafflarna: skaftet ut och ned från korken */
    T.line(P(-14, -61), P(-100, 166));
    T.line(P(-14, -51), P(-92, 170));
    T.line(P(14, -61), P(100, 166));
    T.line(P(14, -51), P(92, 170));
    T.dot(S[0], S[1]);
    T.lbl('S', S[0] + 12, S[1] - 2, null, 0.5);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Gafflarna är tyngst, så byggets']],
      [['tyngdpunkt hamnar under S.']],
      [['Lutas bygget svänger den längs']],
      [['en båge kring S.']]
    ], 375));
    (function () {               /* tyngdpunktens bana kring S (streckad) */
      var pts = [], n = 8, i;
      for (i = 0; i <= n; i++) {
        var t = Math.PI / 2 + (i / n) * (a + 0.12);
        pts.push([S[0] + RG * Math.cos(t), S[1] + RG * Math.sin(t)]);
      }
      T.dashPts(pts);
    })();
    T.dot(S[0], S[1] + RG);                             /* läget upprätt */
    T.pause(150);
    T.arrow(G, [G[0], G[1] + 50], BLUE);
    T.dot(G[0], G[1]);
    T.lbl('F_G', G[0] - 10 - T.lblW('F_G'), G[1] + 46, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['F_G får en hävarm kring S och']],
      [['vrider bygget tillbaka.']]
    ], 375));
    T.dash([G[0], G[1] + 56], [G[0], yDim + 4]);
    T.dash([S[0], S[1] + 34], [S[0], yDim + 4]);
    T.dblArrow([G[0], yDim], [S[0], yDim], BLUE);
    T.lbl('l_G', (G[0] + S[0]) / 2 - 8, yDim + 24, BLUE);
    T.stepEnd();

    var y = 510;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Bågens lägsta punkt är rakt']],
      [['under S. Varje lutning lyfter']],
      [['tyngdpunkten uppför bågen.']]
    ]));
    T.str('Tyngdpunkten under stödpunkten', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('Lutning ⟹ tyngdpunkten höjs', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraftens moment vrider']],
      [['bygget mot det upprätta läget.']]
    ]));
    T.str('F_G vrider tillbaka ⟹ stabil', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Det är tyngdpunktens läge som']],
      [['avgör, inte friktion eller en stor']],
      [['stödyta. Därför B. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: vältningsvinkeln för lådan 0,60 × 0,80 m ----
   * Skala 140 px/m: b 84 px, h 112 px. Den lutade lådan vrids medurs
   * kring nedre högra hörnet exakt till vältningsgränsen (tan α = 0,75),
   * så att tyngdpunkten står rakt ovanför hörnet. */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 260, b = 84, h = 112;
    var x0 = 66;                                         /* upprätt låda */
    var Pv = [372, yG], c = 0.8, s = 0.6;                /* tan α = 0,75 */
    function R(x, y) { return [Pv[0] + x * c - y * s, Pv[1] + x * s + y * c]; }

    /* uppgiftens figur: står färdig från början, pennan ritar krafterna */
    forritad(T, function () {
      T.line([40, yG], [440, yG]);
      T.rect(x0, yG - h, x0 + b, yG);
      T.dot(x0 + b / 2, yG - h / 2);
      T.dot(x0 + b, yG);
      T.dblArrow([x0, yG + 16], [x0 + b, yG + 16], BLUE);
      T.lbl('b=0,60 m', x0 + b / 2 - T.lblW('b=0,60 m') / 2, yG + 40, BLUE);
      T.dblArrow([x0 + b + 16, yG - h], [x0 + b + 16, yG], BLUE);
      T.lbl('h=0,80 m', x0 + b + 24, yG - h / 2 + 6, BLUE);
    });

    T.tanke(T.figurBubble(292, [
      [['Vid gränsen står tyngdpunkten']],
      [['rakt ovanför kanten. Tyngd-']],
      [['kraften pekar då mot kanten.']]
    ], 335));
    var LL = R(-b, 0), UL = R(-b, -h), UR = R(0, -h), G = R(-b / 2, -h / 2);
    poly(T, [Pv, LL, UL, UR]);
    T.dot(Pv[0], Pv[1]);
    T.pause(150);
    T.arrow(G, [G[0], yG - 6], BLUE);
    T.dot(G[0], G[1]);
    T.lbl('F_G', G[0] + 14, yG - 8, BLUE);
    T.pause(150);
    (function () {                                       /* vinkelbågen α */
      var pts = [], n = 12, i, r = 40, a = Math.atan(0.75);
      for (i = 0; i <= n; i++) {
        var t = Math.PI + (i / n) * a;
        pts.push([Pv[0] + r * Math.cos(t), Pv[1] + r * Math.sin(t)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts });
    })();
    (function () {                               /* α i kilen, på bisektrisen */
      var t = Math.PI + Math.atan(0.75) / 2, d = 58;
      T.lbl('α', Pv[0] + d * Math.cos(t) - T.lblW('α') / 2,
            Pv[1] + d * Math.sin(t) + 6, BLUE);
    })();
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Formeln för vältningsvinkeln']],
      [['gäller en jämntjock låda med']],
      [['tyngdpunkten i mitten.']]
    ]));
    T.str('Vältningsvinkeln för en kloss', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('b', 'h', T.str('tan α=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['b=0,60 m', 'h=0,80 m'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=0,75',
          T.fracH('0,60', '0,80', T.str('tan α=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Vinkeln vars tangens är 0,75']],
      [['får jag med tan^-^1 på räknaren.']]
    ]));
    var xIns = T.str('α=tan^-^1(0,75)=36,869...°', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Måtten']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈37°');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lådan är högre än bred, så den']],
      [['välter före 45°. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 37°', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: största höjden för transportlådan ----
   * Skala 175 px/m: b 70 px, h = 0,858 m → 150 px. Lådan ritas först
   * upprätt som i uppgiften, sedan lutad 25° medurs kring nedre högra
   * kanten, precis vid vältningsgränsen (tyngdpunkten rakt över kanten). */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 280, b = 70, h = 150, x0 = 60;
    var a = 25 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    var Pv = [336, yG];
    function R(x, y) { return [Pv[0] + x * c - y * s, Pv[1] + x * s + y * c]; }
    var LL = R(-b, 0), UL = R(-b, -h), UR = R(0, -h), G = R(-b / 2, -h / 2);

    /* uppgiftens figur: står färdig från början, pennan ritar krafterna */
    forritad(T, function () {
      T.line([36, yG], [440, yG]);
      T.rect(x0, yG - h, x0 + b, yG);
      T.dot(x0 + b / 2, yG - h / 2);
      T.dot(x0 + b, yG);
      T.dblArrow([x0, yG + 16], [x0 + b, yG + 16], BLUE);
      T.lbl('b=0,40 m', x0 + b / 2 - T.lblW('b=0,40 m') / 2, yG + 40, BLUE);
      T.dblArrow([x0 + b + 16, yG - h], [x0 + b + 16, yG], BLUE);
      T.lbl('h', x0 + b + 26, yG - h / 2 + 6, BLUE);
    });

    T.tanke(T.figurBubble(292, [
      [['Lutad 25° ska den vara precis']],
      [['vid gränsen. Tyngdpunkten står']],
      [['då rakt ovanför kanten.']]
    ], 350));
    poly(T, [Pv, LL, UL, UR]);
    T.dot(Pv[0], Pv[1]);
    T.pause(150);
    T.arrow(G, [G[0], yG - 6], BLUE);
    T.dot(G[0], G[1]);
    T.lbl('F_G', G[0] + 14, yG - 8, BLUE);
    T.pause(150);
    (function () {                                       /* vinkelbågen 25° */
      var pts = [], n = 12, i, r = 46;
      for (i = 0; i <= n; i++) {
        var t = Math.PI + (i / n) * a;
        pts.push([Pv[0] + r * Math.cos(t), Pv[1] + r * Math.sin(t)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts });
    })();
    (function () {                               /* 25° i kilen, på bisektrisen */
      var t = Math.PI + a / 2, d = 76;
      T.lbl('25°', Pv[0] + d * Math.cos(t) - T.lblW('25°') / 2,
            Pv[1] + d * Math.sin(t) + 6, BLUE);
    })();
    T.stepEnd();

    var y = 490;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Vid gränsen är vältnings-']],
      [['vinkeln exakt 25°. Formeln för']],
      [['vältningsvinkeln gäller.']]
    ]));
    T.str('Vältningsvinkeln för en kloss', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xf = T.fracH('b', 'h', T.str('tan α=', padL, y), y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Multiplicerar båda led med h,']],
      [['så att h hamnar i täljaren.']]
    ]));
    xf = T.str('⟺h·tan α=b', xf + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Delar båda led med tan α, så']],
      [['att h blir ensam kvar.']]
    ]));
    y += 2.5 * F;
    T.fracH('b', 'tan α', T.str('⟺h=', padL + 24, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['b=0,40 m', 'α=25°'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=0,8578... m',
          T.fracH('0,40', 'tan 25°', T.str('h=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Bredden']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,86 m');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lådan får vara drygt dubbelt så']],
      [['hög som bred. En smal låda tål']],
      [['bara en liten lutning. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,86 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: brädan över bordskanten ----
   * Skala 250 px/m: brädan 300 px (x 100–400), utsticket d = 0,80 m.
   * Krafterna skalenligt 2,5 px/N: F_V = 11,78 N → 29 px,
   * F_B = 23,57 N → 59 px, F_N = 35,35 N → 88 px. Vikten är 16 px bred
   * med tyngdpunkten vid x 108; bordskanten läggs vid x 202,7 så att
   * F_V·(202,7−108) = F_B·(250−202,7) i figuren (Στ = 0). */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var xE = 202.7, yB = 230, xL = 100, xR = 400, xTB = 250, xTV = 108;
    var yD = 300, yL = 332;
    var ekvOp = V.mkEkvOp(T, false), multIn = V.mkMultIn(T),
        samla = V.mkSamla(T);

    /* uppgiftens figur: står färdig från början, pennan ritar krafterna */
    forritad(T, function () {
      T.line([30, yB], [xE, yB]);                          /* bordsskivan */
      T.line([30, yB + 8], [xE, yB + 8]);
      T.line([xE, yB], [xE, yB + 8]);
      T.line([44, yB + 8], [44, 300]);                     /* benen */
      T.line([xE - 22, yB + 8], [xE - 22, 300]);
      T.rect(xL, yB - 9, xR, yB);                          /* brädan */
      T.rect(xTV - 8, yB - 31, xTV + 8, yB - 9);           /* vikten */
      T.dblArrow([xL, yB - 42], [xR, yB - 42], BLUE);
      T.lbl('1,2 m', (xL + xR) / 2 + 20, yB - 52, BLUE);
      T.dblArrow([xE, yD], [xR, yD], BLUE);
      T.dash([xR, yB + 3], [xR, yD - 4]);
      T.lbl('d', xR + 8, yD + 6, BLUE);
      T.lbl('m_V=1,2 kg', 40, yB - 62, BLUE);
      T.lbl('m_B=2,4 kg', 272, yB + 26, BLUE);
    });

    T.tanke(T.figurBubble(292, [
      [['Precis när brädan börjar tippa']],
      [['vilar den bara på kanten. Där']],
      [['verkar hela normalkraften.']]
    ], 400));
    T.arrow([xTV, yB - 20], [xTV, yB + 9], BLUE);
    T.dot(xTV, yB - 20);
    T.lbl('F_V', xTV - 34, yB + 24, BLUE);
    T.pause(150);
    T.arrow([xTB, yB - 4.5], [xTB, yB + 54.5], BLUE);
    T.dot(xTB, yB - 4.5);
    T.lbl('F_B', xTB + 8, yB + 52, BLUE);
    T.pause(150);
    T.arrow([xE, yB], [xE, yB - 88], BLUE);
    T.lbl('F_N', xE + 8, yB - 76, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kanten är vridningspunkten.']],
      [['Hävarmarna får jag ur d.']],
      [['Tyngdpunkten sitter mitt på.']]
    ], 400));
    T.dash([xTV, yB + 12], [xTV, yL + 4]);
    T.dash([xE, yB + 10], [xE, yL + 4]);
    T.dash([xTB, yB + 58], [xTB, yL + 4]);
    T.dblArrow([xTV, yL], [xE, yL], BLUE);
    T.lbl('l_V', (xTV + xE) / 2 - 8, yL + 24, BLUE);
    T.dblArrow([xE, yL], [xTB, yL], BLUE);
    T.lbl('l_B', (xE + xTB) / 2 - 8, yL + 24, BLUE);
    T.pause(150);
    T.str('l_V=1,2-d', 290, yL + 4, null, 0.62);
    T.str('l_B=d-0,60', 290, yL + 32, null, 0.62);
    T.stepEnd();

    var y = 540;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Momentjämvikt: momentet moturs']],
      [['är lika stort som momentet medurs.']]
    ]));
    T.str('Momentjämvikt kring bordskanten', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    var wM = T.adv('M');
    var nMot = note(padL + wM / 2, y + 0.78 * F, 'moturs');
    var xEq = T.str('M↺', padL, y);
    T.acts.push({ kind: 'show', obj: nMot });
    T.pause(320);
    var xM2 = T.str('=', xEq, y);
    var nMed = note(xM2 + wM / 2, y + 0.78 * F, 'medurs');
    T.str('M↻', xM2, y);
    T.acts.push({ kind: 'show', obj: nMed });
    T.pause(420);
    T.stepEnd();
    T.acts.push({ kind: 'hide', obj: nMot });
    T.acts.push({ kind: 'hide', obj: nMed });

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vikten vrider moturs, brädans']],
      [['tyngd medurs. Normalkraften går']],
      [['genom kanten och saknar moment.']]
    ]));
    T.str('F_V·l_V=F_B·l_B', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkrafterna är m·g, och']],
      [['hävarmarna tar jag ur figuren.']]
    ]));
    var xg1 = padL + T.adv('m_V·');
    var xg2 = padL + T.adv('m_V·g·(1,2-d)=m_B·');
    var wg = T.adv('g') - 1.5;
    T.str('m_V·g·(1,2-d)=m_B·g·(d-0,60)', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['g finns som faktor i båda leden']],
      [['och kan divideras bort.']]
    ]));
    stryk(T, F, xg1, wg, y);
    T.pause(260);
    stryk(T, F, xg2, wg, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    var klam = valueBracket(T.acts, ['m_V=1,2 kg', 'm_B=2,4 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in massorna ur']],
      [['klammern.']]
    ]));
    var yK = y, xx = padL, xs = {};
    xs.a0 = xx; xx = T.str('1,2', xx, yK); xs.a1 = xx;
    xx = T.str('·(', xx, yK); xs.b0 = xx;
    xx = T.str('1,2', xx, yK); xs.b1 = xx; xs.c0 = xx;
    xx = T.str('-d', xx, yK); xs.c1 = xx;
    xx = T.str(')=', xx, yK); xs.d0 = xx;
    xx = T.str('2,4', xx, yK); xs.d1 = xx;
    xx = T.str('·(', xx, yK); xs.e0 = xx;
    xx = T.str('d', xx, yK); xs.e1 = xx; xs.f0 = xx;
    xx = T.str('-0,60', xx, yK); xs.f1 = xx;
    T.str(')', xx, yK);
    T.stepEnd();

    y += 2.3 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y + 0.1 * F), bw, [
      [['Multiplicerar in faktorerna i']],
      [['parenteserna.']]
    ]));
    var yArc = yK - 0.95 * F, p = {};
    xx = multIn(padL, y, yArc, [
      { fran: [xs.a0, xs.a1], till: [xs.b0, xs.b1], skriv: '1,44', hojd: 24 },
      { fran: [xs.a0, xs.a1], till: [xs.c0, xs.c1], skriv: '-1,2d', hojd: 34, dx: 4 }
    ]);
    p.l = [padL, xx];
    xx = T.str('=', xx, y);
    xx = multIn(xx, y, yArc, [
      { fran: [xs.d0, xs.d1], till: [xs.e0, xs.e1], skriv: '2,4d', hojd: 24 },
      { fran: [xs.d0, xs.d1], till: [xs.f0, xs.f1], skriv: '-1,44', hojd: 34, dx: 4 }
    ]);
    T.stepEnd();

    /* +1,2d i båda led: radens termer fångas för hopslagningen */
    var yOp = y + 2.3 * F, t = {};
    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Adderar 1,2d i båda led, så att']],
      [['d bara står i högerledet.']]
    ]));
    y = ekvOp(y, '+1,2d', 0, function (yb) {
      var g = segRad(T, padL + 30, yb, [['1,44'], ['-1,2d'], ['+1,2d', 1],
                     ['='], ['2,4d'], ['-1,44'], ['+1,2d', 1]]);
      t.b0 = g[1][0]; t.b1 = g[1][1]; t.c0 = g[2][0]; t.c1 = g[2][1];
      t.d0 = g[4][0]; t.d1 = g[4][1]; t.f0 = g[6][0]; t.f1 = g[6][1];
    });
    T.tanke(T.bubble(140, T.bubbleTop(yOp), bw, [
      [['−1,2d och +1,2d tar ut varandra.']],
      [['2,4d och 1,2d blir 3,6d.']]
    ]));
    xx = samla(padL + 30, y, [
      { skriv: '1,44' },
      { ringar: [[t.b0, t.b1, yOp], [t.c0, t.c1, yOp]], skriv: '' },
      { skriv: '=' },
      { ringar: [[t.d0, t.d1, yOp], [t.f0, t.f1, yOp]], skriv: '3,6d' },
      { skriv: '-1,44' }
    ]);
    T.stepEnd();

    /* +1,44 i båda led */
    yOp = y + 2.3 * F;
    t = {};
    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Adderar 1,44 i båda led, så att']],
      [['d-termen blir ensam.']]
    ]));
    y = ekvOp(y, '+1,44', 0, function (yb) {
      var g = segRad(T, padL + 30, yb, [['1,44'], ['+1,44', 1], ['=3,6d'],
                     ['-1,44'], ['+1,44', 1]]);
      t.a0 = g[0][0]; t.a1 = g[0][1]; t.b0 = g[1][0]; t.b1 = g[1][1];
      t.c0 = g[3][0]; t.c1 = g[3][1]; t.d0 = g[4][0]; t.d1 = g[4][1];
    });
    T.tanke(T.bubble(140, T.bubbleTop(yOp), bw, [
      [['1,44 och 1,44 blir 2,88, och']],
      [['−1,44 och +1,44 tar ut varandra.']]
    ]));
    samla(padL + 30, y, [
      { ringar: [[t.a0, t.a1, yOp], [t.b0, t.b1, yOp]], skriv: '2,88' },
      { skriv: '=3,6d' },
      { ringar: [[t.c0, t.c1, yOp], [t.d0, t.d1, yOp]], skriv: '' }
    ]);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Delar båda led med 3,6 så att']],
      [['d blir ensam kvar.']]
    ]));
    y = ekvOp(y, '/3,6', 0, '2,88=3,6d');
    T.str('0,80=d⟺d=0,80 m', padL + 30, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Utan vikten hade gränsen varit']],
      [['0,60 m. Vikten håller emot och']],
      [['flyttar ut den. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,80 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

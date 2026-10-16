/* ovningar-penna/fy1-3.8.js: pennlösningar till övningarna i fy1-3.8
 * Exempel: sneda spännkrafter.
 *
 * En scen per övning, registrerad som "ov-fy1-3.8-u<nr>" och kopplad till
 * övningen med fältet penna i data/ovningar.js (numret är övningens plats
 * i listan, 1 = första). Katalogen laddar filen först när en övning i
 * avsnittet visar sitt lösningsförslag (se Ovning i katalog.html).
 *
 * FYSIKENS redovisningsregler ur handskrift.js filhuvud gäller:
 *   - figuren först, i grafit, med givna värden och vektorer i BLÅTT,
 *   - kort rubrik i grafit + formeln med den sökta storheten utlöst,
 *   - mätvärdesklammern DIREKT under formeln (deluträkningar i raden,
 *     med enhet vid varje tal),
 *   - insättningsraden utan ringar (klammern är gesten),
 *   - aldrig avrundning i mellanled, först i sista steget med ≈,
 *   - en rimlighetsbedömning i en bubbla FÖRE svarsraden,
 *   - svarsraden utan beteckning: "Svar: 20 N".
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Kraftfigurerna följer genomgångens skissteknik: krafterna på det som
 * hänger ritas bredvid scenen, med tyngdkraften nedåt från tyngdpunkten
 * (prick) och spännkrafterna längs repen. Pilarna är skalenliga, och i
 * det symmetriska fallet slutar båda spännkrafterna på en streckad linje
 * halva tyngdkraftens längd ovanför punkten. I det asymmetriska fallet
 * (u6) bildar spännkrafterna en parallellogram med en streckad pil, lika
 * lång som tyngdkraften, som diagonal.
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.8-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;
  /* uppgiftens figur står färdig från början (REGEL UPPGIFTENS FIGUR STÅR
   * FÄRDIG FRÅN BÖRJAN i handskrift.js); kraftfigurerna ritar pennan */
  var forritad = V.forritad;
  var trigKvot = V.trigKvot, vinkelBage = V.vinkelBage;
  var substRings = V.substRings, fadeRings = V.fadeRings;
  var RAD = Math.PI / 180;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.8-u' + nr, fn); }

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
  /* tak med skraffering ovanför */
  function tak(T, x0, x1, y) {
    T.line([x0, y], [x1, y]);
    T.hatch([x0, y], [x1, y], Math.round((x1 - x0) / 13));
  }
  /* punkten längs en riktning som lutar deg grader mot det vågräta,
   * uppåt åt vänster (sida -1) eller uppåt åt höger (sida 1) */
  function snett(P, deg, len, sida) {
    return [P[0] + sida * len * Math.cos(deg * RAD),
            P[1] - len * Math.sin(deg * RAD)];
  }
  /* vinkelbåge vid hörnet c mellan det vågräta och ett ben som lutar
   * deg grader uppåt åt sidan sida */
  function bage(T, c, deg, r, sida) {
    if (sida < 0) vinkelBage(T, c, Math.PI, Math.PI + deg * RAD, r);
    else vinkelBage(T, c, -deg * RAD, 0, r);
  }
  /* bråk där streck och nämnare skrivs i BLÅTT: division i båda led */
  function fracB(T, F, numS, denS, x0, yb) {
    var ybar = yb - 0.34 * F;
    var nw = T.adv(numS), dw = T.adv(denS);
    var w = Math.max(nw, dw) + 0.3 * F;
    T.str(numS, x0 + (w - nw) / 2, ybar - 0.14 * F);
    T.pause(130);
    T.line([x0, ybar], [x0 + w, ybar], BLUE);
    T.pause(130);
    T.str(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, BLUE);
    return x0 + w + 1.5;
  }

  /* ---- Uppgift 1: lampan i två rep, 30° ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var K = [180, 230], yT = K[1] - 100 * Math.tan(30 * RAD);

    /* lampan i repen, vinklarna och massan står i uppgiftens figur: de
     * står färdiga från början, kraftfiguren ritar pennan */
    forritad(T, function () {
      tak(T, 50, 310, yT);
      T.line([80, yT], K);
      T.line([280, yT], K);
      T.line(K, [K[0], K[1] + 22]);
      T.line([K[0] - 10, K[1] + 22], [K[0] + 10, K[1] + 22]); /* lampskärmen */
      T.line([K[0] - 10, K[1] + 22], [K[0] - 28, K[1] + 48]);
      T.line([K[0] + 10, K[1] + 22], [K[0] + 28, K[1] + 48]);
      T.line([K[0] - 28, K[1] + 48], [K[0] + 28, K[1] + 48]);
      T.dash([K[0] - 80, K[1]], [K[0] + 80, K[1]]);
      bage(T, K, 30, 28, -1);
      bage(T, K, 30, 28, 1);
      T.lbl('30°', K[0] - 88, K[1] - 6, BLUE);
      T.lbl('30°', K[0] + 50, K[1] - 6, BLUE);
      T.lbl('m=2,0 kg', K[0] + 38, K[1] + 44, BLUE);
    });

    /* kraftfiguren: 5 px/N → F_G och F_S 98,2 px */
    var P = [530, 300], k = 5;
    var R = snett(P, 30, 19.64 * k, 1), L = snett(P, 30, 19.64 * k, -1);
    T.tanke(T.figurBubble(292, [
      [['Ritar krafterna på lampan']],
      [['bredvid. Tyngdkraften nedåt,']],
      [['spännkrafterna längs repen.']]
    ], 318));
    T.dot(P[0], P[1]);
    T.arrow(P, [P[0], P[1] + 19.64 * k], BLUE);
    T.lbl('F_G', P[0] + 9, P[1] + 19.64 * k - 4, BLUE);
    T.pause(150);
    T.arrow(P, R, BLUE);
    T.lbl('F_S', R[0] - 14, R[1] - 14, BLUE);
    T.pause(150);
    T.arrow(P, L, BLUE);
    T.lbl('F_S', L[0] - 8, L[1] - 14, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Lampan hänger stilla. Repens']],
      [['lodräta delar bär halva F_G var,']],
      [['så pilarna slutar på den']],
      [['streckade linjen.']]
    ], 318));
    T.dash([L[0] - 14, R[1]], [R[0] + 14, R[1]]);
    T.pause(150);
    T.dash([P[0] - 70, P[1]], [P[0] + 100, P[1]]);
    T.dashArrow([R[0], P[1]], R, BLUE);
    T.lbl('F_y', R[0] + 8, P[1] - 12, BLUE);
    T.pause(150);
    bage(T, P, 30, 26, 1);
    T.lbl('30°', P[0] + 40, P[1] - 4, BLUE);
    T.stepEnd();

    /* ---- komposanten ---- */
    var y = 456;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Den lodräta komposanten står']],
      [['mittemot vinkeln 30°, och']],
      [['spännkraften är hypotenusan.']],
      [['Det är sinus.']]
    ]));
    T.str('Lodrät komposant ur krafttriangeln', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var r = trigKvot(T, F, { fn: 'sin 30°=', x: padL, y: y,
      ring: [P[0] + 46, P[1] - 12, 34, 18],
      num: { txt: 'F_y', ord: 'motstående katet',
             svep: [[R[0] + 4, P[1] - 4], [R[0] + 4, R[1] + 6]] },
      den: { txt: 'F_S', ord: 'hypotenusan',
             svep: [[P[0] + 4, P[1] - 8], [R[0] - 4, R[1] - 2]] } });
    T.fade(r.ring);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Multiplicerar båda led med F_S,']],
      [['så att komposanten blir ensam.']]
    ]));
    T.str('⟺F_y=F_S·sin 30°', r.x + 0.3 * F, y);
    T.stepEnd();

    /* ---- jämvikt i lodled ---- */
    y += adv + 2.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Repen lutar lika mycket. Två']],
      [['lika stora komposanter F_S·sin 30°']],
      [['bär tillsammans tyngdkraften.']]
    ]));
    T.str('Jämvikt i lodled: två komposanter bär F_G', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_G', '2·sin 30°', T.str('2·F_S·sin 30°=F_G⟺F_S=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften är inte given.']],
      [['Den räknar jag ut ur massan']],
      [['i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['F_G=m·g=2,0 kg·9,82 N/kg=19,64 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in F_G ur klammern.']],
      [['sin 30° är precis 0,5.']]
    ]));
    var xIns = T.str('=19,64 N',
          T.fracH('19,64', '2·0,5', T.str('F_S=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈20 N');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vid 30° pekar bara halva rep-']],
      [['kraften uppåt. Varje rep blir']],
      [['då lika hårt spänt som hela']],
      [['lampans tyngd. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 20 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: flackare snören, vad händer med spännkraften? ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 180, Kt = [190, 230];

    T.tanke(T.figurBubble(292, [
      [['Ritar tavlan i de korta, branta']],
      [['snörena. De längre snörena']],
      [['ritar jag streckade.']]
    ], 320));
    tak(T, 50, 330, yT);
    T.line([130, yT], Kt);
    T.line([250, yT], Kt);
    T.pause(120);
    T.dash([70, yT], Kt);
    T.dash([310, yT], Kt);
    T.pause(120);
    T.rect(150, Kt[1], 230, Kt[1] + 56);                      /* ramen */
    T.rect(158, Kt[1] + 8, 222, Kt[1] + 48);
    T.line([164, Kt[1] + 44], [184, Kt[1] + 22]);              /* motivet */
    T.line([184, Kt[1] + 22], [198, Kt[1] + 36]);
    T.line([198, Kt[1] + 36], [208, Kt[1] + 28]);
    T.line([208, Kt[1] + 28], [218, Kt[1] + 44]);
    T.stepEnd();

    /* kraftfiguren, bara det högra snöret: F_G 80 px, halva 40 px */
    var P = [540, 340], G = 80;
    var aB = Math.atan2(50, 60) / RAD, aF = Math.atan2(50, 120) / RAD;
    var B = snett(P, aB, (G / 2) / Math.sin(aB * RAD), 1);
    var Fl = snett(P, aF, (G / 2) / Math.sin(aF * RAD), 1);
    T.tanke(T.figurBubble(292, [
      [['Ritar krafterna bredvid. Det']],
      [['vänstra snöret är en spegelbild,']],
      [['så jag ritar bara det högra.']]
    ], 320));
    T.dot(P[0], P[1]);
    T.arrow(P, [P[0], P[1] + G], BLUE);
    T.lbl('F_G', P[0] + 9, P[1] + G - 4, BLUE);
    T.pause(150);
    T.dash([P[0] - 20, P[1] - G / 2], [Fl[0] + 16, P[1] - G / 2]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Snöret ska alltid lyfta halva']],
      [['F_G, så pilen slutar på den']],
      [['streckade linjen. Den flacka']],
      [['pilen måste bli längre.']]
    ], 320));
    T.arrow(P, B, BLUE);
    T.lbl('brant', P[0] - 30, B[1] - 6);
    T.pause(150);
    T.arrow(P, Fl, BLUE);
    T.lbl('flackt', Fl[0] - 30, Fl[1] - 12);
    T.stepEnd();

    var y = 476;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Tavlan hänger stilla. Snörenas']],
      [['lodräta komposanter F_S·sin α']],
      [['bär tillsammans tyngdkraften.']]
    ]));
    T.str('Jämvikt i lodled: två komposanter bär F_G', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_G', '2·sin α', T.str('2·F_S·sin α=F_G⟺F_S=', padL, y), y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['F_G är densamma som förut.']],
      [['Ett flackare snöre har mindre']],
      [['vinkel och mindre sinusvärde.']]
    ]));
    T.str('α mindre⟹sin α mindre', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nämnaren blir mindre, och då']],
      [['blir bråket större.']]
    ]));
    T.str('⟹F_S större', padL + 24, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften är oförändrad, men']],
      [['spännkraften beror på vinkeln.']],
      [['Därför är det inte alternativ A.']]
    ]));
    T.underline(T.str('Svar: Alternativ C', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: spännkraftens vågräta komposant ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 300;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan på golvet och']],
      [['repet som drar snett uppåt.']]
    ], 342));
    T.line([80, yG], [420, yG]);
    T.hatch([420, yG], [80, yG], 26);
    forritad(T, function () {                     /* lådan i uppgiftens figur */
      T.rect(140, yG - 70, 220, yG);
    });
    var P = [220, yG - 35];
    /* 4 px/N: F_S 160 px, F_x 145,0 px, F_y 67,6 px */
    var tip = snett(P, 25, 160, 1);
    T.line(snett(P, 25, 166, 1), snett(P, 25, 196, 1));         /* repet */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Spännkraften verkar där repet']],
      [['sitter fast. Jag delar upp den']],
      [['i en vågrät och en lodrät del.']]
    ], 342));
    T.arrow(P, tip, BLUE);
    T.lbl('F_S=40 N', tip[0] - 112, tip[1] - 10, BLUE);
    T.pause(150);
    bage(T, P, 25, 36, 1);
    T.lbl('25°', P[0] + 44, P[1] - 5, BLUE);
    T.pause(150);
    T.dashArrow(P, [tip[0], P[1]], BLUE);
    T.lbl('F_x', P[0] + 80, P[1] + 26, BLUE);
    T.pause(150);
    T.dashArrow([tip[0], P[1]], tip, BLUE);
    T.lbl('F_y', tip[0] + 9, P[1] - 26, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Den vågräta komposanten ligger']],
      [['intill vinkeln 25°, och spänn-']],
      [['kraften är hypotenusan. Det är']],
      [['cosinus.']]
    ]));
    T.str('Vågrät komposant ur krafttriangeln', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var r = trigKvot(T, F, { fn: 'cos 25°=', x: padL, y: y,
      ring: [P[0] + 52, P[1] - 10, 36, 18],
      num: { txt: 'F_x', ord: 'närliggande katet',
             svep: [[P[0] + 6, P[1] + 5], [tip[0] - 6, P[1] + 5]] },
      den: { txt: 'F_S', ord: 'hypotenusan',
             svep: [[P[0] + 6, P[1] - 8], [tip[0] - 6, tip[1] - 2]] } });
    T.fade(r.ring);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Multiplicerar båda led med F_S,']],
      [['så att komposanten blir ensam.']]
    ]));
    T.str('⟺F_x=F_S·cos 25°', r.x + 0.3 * F, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Spännkraften är given.']]
    ]));
    var klam = valueBracket(T.acts, ['F_S=40 N'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdet ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_x=40·cos 25°=36,252... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Spännkraften har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈36 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Repet lutar bara lite, så nästan']],
      [['hela kraften drar framåt. 36 N']],
      [['av 40 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 36 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: jackan på tvättlinan, 8,0° ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 190, xA = 70, xB = 390, yG = 330;
    var K = [(xA + xB) / 2, yT + 160 * Math.tan(8 * RAD)];

    /* tvättlinan, jackan, vinklarna och massan står i uppgiftens figur:
     * de står färdiga från början, kraftfiguren ritar pennan */
    forritad(T, function () {
      T.line([40, yG], [420, yG]);
      T.hatch([420, yG], [40, yG], 28);
      T.rect(xA - 4, yT, xA + 4, yG);
      T.rect(xB - 4, yT, xB + 4, yG);
      T.line([xA, yT], K);
      T.line([xB, yT], K);
      T.line(K, [K[0], K[1] + 10]);                             /* galgen */
      T.line([K[0] - 24, K[1] + 24], [K[0], K[1] + 10]);
      T.line([K[0], K[1] + 10], [K[0] + 24, K[1] + 24]);
      T.line([K[0] - 24, K[1] + 24], [K[0] + 24, K[1] + 24]);
      T.line([K[0] - 24, K[1] + 24], [K[0] - 34, K[1] + 58]);   /* jackan */
      T.line([K[0] - 34, K[1] + 58], [K[0] - 26, K[1] + 60]);
      T.line([K[0] - 22, K[1] + 36], [K[0] - 20, K[1] + 80]);
      T.line([K[0] + 24, K[1] + 24], [K[0] + 34, K[1] + 58]);
      T.line([K[0] + 34, K[1] + 58], [K[0] + 26, K[1] + 60]);
      T.line([K[0] + 22, K[1] + 36], [K[0] + 20, K[1] + 80]);
      T.line([K[0] - 20, K[1] + 80], [K[0] + 20, K[1] + 80]);
      T.line([K[0], K[1] + 24], [K[0], K[1] + 80]);
      T.dash([K[0] - 96, K[1]], [K[0] + 96, K[1]]);
      bage(T, K, 8, 70, -1);
      bage(T, K, 8, 70, 1);
      T.lbl('8,0°', K[0] - 120, K[1] + 18, BLUE);
      T.lbl('8,0°', K[0] + 76, K[1] + 18, BLUE);
      T.lbl('m=1,5 kg', K[0] + 44, K[1] + 74, BLUE);
    });

    /* kraftfiguren: 2 px/N → F_G 29,5 px, F_S 105,8 px */
    var P = [560, 330], k = 2;
    var R = snett(P, 8, 52.92 * k, 1), L = snett(P, 8, 52.92 * k, -1);
    T.tanke(T.figurBubble(292, [
      [['Ritar krafterna bredvid. Båda']],
      [['pilarna slutar på linjen halva']],
      [['F_G ovanför. Spännkrafterna']],
      [['blir mycket längre än F_G.']]
    ], 372));
    T.dot(P[0], P[1]);
    T.arrow(P, [P[0], P[1] + 14.73 * k], BLUE);
    T.lbl('F_G', P[0] + 9, P[1] + 14.73 * k + 2, BLUE);
    T.pause(150);
    T.dash([L[0] - 8, R[1]], [R[0] + 8, R[1]]);
    T.pause(150);
    T.arrow(P, R, BLUE);
    T.lbl('F_S', R[0] - 30, R[1] - 12, BLUE);
    T.pause(150);
    T.arrow(P, L, BLUE);
    T.lbl('F_S', L[0] + 8, L[1] - 12, BLUE);
    T.stepEnd();

    var y = 486;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Den lodräta komposanten står']],
      [['mittemot vinkeln: F_S·sin 8,0°.']],
      [['Två sådana bär tyngdkraften.']]
    ]));
    T.str('Jämvikt i lodled: två komposanter bär F_G', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_G', '2·sin 8,0°', T.str('2·F_S·sin 8,0°=F_G⟺F_S=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut ur']],
      [['massan i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['F_G=m·g=1,5 kg·9,82 N/kg=14,73 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in F_G ur klammern.']]
    ]));
    var xIns = T.str('=52,919... N',
          T.fracH('14,73', '2·sin 8,0°', T.str('F_S=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈53 N');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Linan är nästan vågrät, så bara']],
      [['en liten del av spännkraften']],
      [['pekar uppåt. 53 N är ungefär 3,6']],
      [['gånger jackans tyngd. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 53 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: gatlyktan på vajern, vinkeln ur måtten ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    /* 75 px/m: 4,0 m blir 300 px, 0,50 m blir 37,5 px */
    var yT = 200, xA = 80, xB = 380, yG = 336;
    var K = [(xA + xB) / 2, yT + 37.5];

    /* vajern, lyktan, måtten och massan står i uppgiftens figur: de står
     * färdiga från början. Vinkeln α finns inte där, den ritar pennan. */
    forritad(T, function () {
      T.line([50, yG], [420, yG]);
      T.hatch([420, yG], [50, yG], 28);
      T.rect(xA - 4, yT, xA + 4, yG);
      T.rect(xB - 4, yT, xB + 4, yG);
      T.line([xA, yT], K);
      T.line([xB, yT], K);
      T.line(K, [K[0], K[1] + 14]);
      T.line([K[0] - 12, K[1] + 14], [K[0] + 12, K[1] + 14]);   /* lyktan */
      T.line([K[0] - 12, K[1] + 14], [K[0] - 8, K[1] + 40]);
      T.line([K[0] + 12, K[1] + 14], [K[0] + 8, K[1] + 40]);
      T.line([K[0] - 8, K[1] + 40], [K[0] + 8, K[1] + 40]);
      T.dblArrow([xA + 6, yT - 22], [xB - 6, yT - 22], BLUE);
      T.line([xA, yT - 6], [xA, yT - 30]);
      T.line([xB, yT - 6], [xB, yT - 30]);
      T.lbl('4,0 m', (xA + xB) / 2 - 29, yT - 30, BLUE);
      T.dash([xA + 8, yT], [xB - 8, yT]);
      T.dash([K[0] + 8, K[1]], [xB + 34, K[1]]);
      T.dash([xB + 8, yT], [xB + 34, yT]);
      T.dblArrow([xB + 26, yT + 3], [xB + 26, K[1] - 3], BLUE);
      T.lbl('0,50 m', xB + 36, K[1] - 9, BLUE);
      T.lbl('m=3,0 kg', K[0] + 22, K[1] + 36, BLUE);
    });

    T.tanke(T.figurBubble(292, [
      [['Vinkeln α mot det vågräta']],
      [['är okänd.']]
    ], 378));
    bage(T, K, 14.036, 92, 1);
    T.lbl('α', K[0] + 72, K[1] - 4, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Lyktan hänger mitt på, så']],
      [['halva avståndet är 2,0 m.']]
    ], 378));
    T.dblArrow([K[0] + 6, K[1] + 56], [xB - 8, K[1] + 56], BLUE);
    T.lbl('2,0 m', K[0] + 50, K[1] + 80, BLUE);
    T.stepEnd();

    /* kraftfiguren: 1,5 px/N → F_G 44,2 px, F_S 91,1 px */
    var P = [570, 360], k = 1.5, a = Math.atan(0.25) / RAD;
    var R = snett(P, a, 60.733 * k, 1), L = snett(P, a, 60.733 * k, -1);
    T.tanke(T.figurBubble(292, [
      [['Ritar krafterna på lyktan']],
      [['bredvid. Vajerns halvor bär']],
      [['halva F_G var.']]
    ], 470));
    T.dot(P[0], P[1]);
    T.arrow(P, [P[0], P[1] + 29.46 * k], BLUE);
    T.lbl('F_G', P[0] + 9, P[1] + 29.46 * k - 2, BLUE);
    T.pause(150);
    T.dash([L[0] - 8, R[1]], [R[0] + 8, R[1]]);
    T.pause(150);
    T.arrow(P, R, BLUE);
    T.lbl('F_S', R[0] - 28, R[1] - 12, BLUE);
    T.pause(150);
    T.arrow(P, L, BLUE);
    T.lbl('F_S', L[0] + 6, L[1] - 12, BLUE);
    T.stepEnd();

    /* ---- vinkeln ---- */
    var y = 476;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Vinkeln står inte i uppgiften.']],
      [['Vajerns högra halva bildar en']],
      [['rätvinklig triangel med kända']],
      [['kateter. Det är tangens.']]
    ]));
    T.str('Vinkeln ur vajerns triangel', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var r = trigKvot(T, F, { fn: 'tan α=', x: padL, y: y,
      ring: [K[0] + 72, K[1] - 9, 30, 18],
      num: { txt: '0,50', ord: 'motstående katet',
             svep: [[xB + 12, K[1] - 4], [xB + 12, yT + 4]] },
      den: { txt: '2,0', ord: 'närliggande katet',
             svep: [[K[0] + 8, K[1] + 6], [xB - 8, K[1] + 6]] } });
    T.fade(r.ring);
    T.str('=0,25', r.x, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.05), bw, [
      [['Den inversa tangensfunktionen']],
      [['ger vinkeln. Jag avrundar den']],
      [['inte, den används igen.']]
    ]));
    T.str('α=tan^−^1(0,25)=14,036...°', padL, y);
    T.stepEnd();

    /* ---- spännkraften ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Lyktan hänger stilla. Vajerns']],
      [['två halvor bär tyngden med']],
      [['sina lodräta komposanter']],
      [['F_S·sin α.']]
    ]));
    T.str('Jämvikt i lodled: två komposanter bär F_G', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_G', '2·sin α', T.str('2·F_S·sin α=F_G⟺F_S=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut i']],
      [['klammern. Vinkeln tar jag']],
      [['oavrundad från raden ovanför.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=3,0 kg·9,82 N/kg=29,46 N', 'α=14,036...°'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=60,733... N',
          T.fracH('29,46', '2·sin 14,036...°', T.str('F_S=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈61 N');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vajern hänger bara ned lite, så']],
      [['spännkraften blir ungefär dubbelt']],
      [['så stor som lyktans tyngd.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 61 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: lådan i två olika sneda rep, 60° och 30° ----
   * Ekvationssystemet ur jämvikt i sidled (1) och lodled (2), som i
   * textlösningen. F_2 räknas fram först och sätts sedan in i F_1. */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var K = [190, 250], yT = 180;
    var xA = K[0] - 70 / Math.tan(60 * RAD), xB = K[0] + 70 / Math.tan(30 * RAD);

    /* lådan i repen, vinklarna och massan står i uppgiftens figur: de
     * står färdiga från början, kraftfiguren ritar pennan */
    forritad(T, function () {
      tak(T, 60, 340, yT);
      T.line([xA, yT], K);
      T.line([xB, yT], K);
      T.line(K, [K[0], K[1] + 18]);
      T.rect(K[0] - 24, K[1] + 18, K[0] + 24, K[1] + 52);
      T.lbl('rep 1', xA - 80, yT + 22);
      T.lbl('rep 2', xB + 8, yT + 22);
      T.dash([K[0] - 80, K[1]], [K[0] + 80, K[1]]);
      bage(T, K, 60, 28, -1);
      bage(T, K, 30, 28, 1);
      T.lbl('60°', K[0] - 76, K[1] - 6, BLUE);
      T.lbl('30°', K[0] + 50, K[1] - 6, BLUE);
      T.lbl('m=10 kg', K[0] + 34, K[1] + 46, BLUE);
    });

    /* kraftfiguren: 1,2 px/N → F_G 117,8, F_1 102,0, F_2 58,9 px */
    var P = [560, 330], k = 1.2;
    var T1 = snett(P, 60, 85.04 * k, -1), T2 = snett(P, 30, 49.1 * k, 1);
    var S = [P[0], P[1] - 98.2 * k];
    T.tanke(T.figurBubble(292, [
      [['Ritar krafterna bredvid. Rep-']],
      [['krafterna ska tillsammans ge']],
      [['en kraft uppåt, lika stor som']],
      [['F_G. Den ritar jag streckad.']]
    ], 336));
    T.dot(P[0], P[1]);
    T.arrow(P, [P[0], P[1] + 98.2 * k], BLUE);
    T.lbl('F_G', P[0] + 9, P[1] + 98.2 * k - 4, BLUE);
    T.pause(150);
    T.dashArrow(P, S, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Parallellogrammen ger de två']],
      [['spännkrafterna. Det branta']],
      [['repet 1 får den längsta pilen.']]
    ], 336));
    T.dash(T1, S);
    T.dash(T2, S);
    T.pause(150);
    T.arrow(P, T1, BLUE);
    T.lbl('F_1', T1[0] - 34, T1[1] + 4, BLUE);
    T.pause(150);
    T.arrow(P, T2, BLUE);
    T.lbl('F_2', T2[0] + 8, T2[1] + 10, BLUE);
    T.stepEnd();

    /* ---- ekvationssystemet ---- */
    var y = 500;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Lådan står still i sidled. De']],
      [['vågräta komposanterna ligger']],
      [['intill vinklarna och fås med']],
      [['cosinus.']]
    ]));
    T.str('Jämvikt i sidled: vågräta komposanter tar ut varandra',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1·cos 60°=F_2·cos 30°', padL, y);
    T.str('(1)', 620, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['De lodräta komposanterna står']],
      [['mittemot vinklarna och bär']],
      [['tillsammans hela tyngden.']]
    ]));
    T.str('Jämvikt i lodled: lodräta komposanter bär F_G',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var y2 = y;
    var x2a = T.str('F_1', padL, y);
    var x2b = T.str('·sin 60°+F_2·sin 30°=', x2a, y);
    var x2c = T.str('F_G', x2b, y);
    T.str('(2)', 620, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut']],
      [['direkt.']]
    ]));
    var yG = y;
    var xg0 = padL + T.adv('F_G=m·g=10·9,82=');
    var xg1 = T.str('F_G=m·g=10·9,82=98,2 N', padL, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Ur (1) löser jag ut F_1 genom']],
      [['att dela båda led med cos 60°.']]
    ]));
    T.str('Löser ut F_1 ur (1)', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var y1 = y;
    var xr = T.fracH('cos 30°', 'cos 60°', T.str('F_1=F_2·', padL, y), y);
    var x1a = T.str('=', xr + 0.1 * F, y);
    var x1m = T.str('1,732...·', x1a, y);
    var x1b = T.str('F_2', x1m, y);
    T.stepEnd();

    /* insättning i (2): F_1 och F_G ersätts */
    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in F_1 och F_G i (2).']],
      [['Då finns bara F_2 kvar.']]
    ]));
    var ringar = substRings(T.acts, [
      [x1a, x1b, y1, F], [padL, x2a, y2, F],
      [xg0, xg1, yG, F], [x2b, x2c, y2, F]
    ]);
    T.str('1,732...·F_2·sin 60°+F_2·sin 30°=98,2', padL, y, null, 0.92);
    fadeRings(T.acts, ringar);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['1,732... gånger sin 60° blir']],
      [['precis 1,5, och sin 30° är 0,5.']]
    ]));
    var yS = y;
    var xs1 = T.str('1,5·F_2', padL, y);
    var xs2 = T.str('+', xs1, y);
    var xs3 = T.str('0,5·F_2', xs2, y);
    T.str('=98,2', xs3, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Slår ihop termerna med F_2.']]
    ]));
    V.mkSamla(T)(padL, y, [
      { ringar: [[padL, xs1, yS], [xs2, xs3, yS]], skriv: '2,0·F_2' },
      { skriv: '=98,2' }
    ]);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Delar båda led med 2,0, så att']],
      [['F_2 blir ensamt.']]
    ]));
    var xd = fracB(T, F, '2,0·F_2', '2,0', padL, y);
    fracB(T, F, '98,2', '2,0', T.str('=', xd + 0.1 * F, y) + 0.1 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var y9 = y;
    var x9a = padL + T.adv('F_2=');
    var x9b = T.str('F_2=49,1 N', padL, y);
    T.stepEnd();

    /* ---- a) F_1 ---- */
    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in F_2 i uttrycket']],
      [['för F_1.']]
    ]));
    T.str('a) Spännkraften i rep 1', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    ringar = substRings(T.acts, [[x9a, x9b, y9, F], [x1m, x1b, y1, F]]);
    var xIns = T.str('F_1=1,732...·49,1=85,043... N', padL, y);
    fadeRings(T.acts, ringar);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈85 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Det branta repet 1 bär mest,']],
      [['men mindre än hela tyngden']],
      [['98,2 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 85 N', padL, y), y);
    T.stepEnd();

    /* ---- b) F_2 ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['F_2 har jag redan räknat ut.']],
      [['Det återstår att avrunda till']],
      [['två värdesiffror.']]
    ]));
    T.str('b) Spännkraften i rep 2', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_2=49,1 N≈49 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Det flacka repet 2 bär minst,']],
      [['och 49 N är mindre än 85 N.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 49 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

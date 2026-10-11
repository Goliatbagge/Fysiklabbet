/* ovningar-penna/fy2-1.2.js: pennlösningar till övningarna i fy2-1.2
 * Mer kraftmoment (visas även som fy1-3.12 i Fysik nivå 1).
 *
 * En scen per övning, registrerad som "ov-fy2-1.2-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 120 N".
 * Momentlagen skrivs som i teorins scener (layoutBrada, layoutGunga):
 * M↺=M↻ med orden moturs/medurs tonande under pilarna, moturstermerna i
 * vänster led, hävarmen bär kraftens index (F_G ↔ l_G) och ritas som
 * måttlinje i fri yta med projektionslinjer. Vridningspunkten ringas in.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy2-1.2-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy2-1.2-u' + nr, fn); }

  /* bräda (rektangel) */
  function brada(T, x0, x1, yT, yB) { T.rect(x0, yT, x1, yB); }
  /* bock i A-form som i teorins figurer */
  function bock(T, x, yTop, yG) {
    T.line([x, yTop], [x - 24, yG]);
    T.line([x, yTop], [x + 24, yG]);
    var ym = (yTop + yG) / 2, d = 24 * (ym - yTop) / (yG - yTop);
    T.line([x - d + 3, ym], [x + d - 3, ym]);
  }
  /* stöd i triangelform */
  function stod(T, x, yTop, yG) {
    T.line([x, yTop], [x - 22, yG]);
    T.line([x - 22, yG], [x + 22, yG]);
    T.line([x + 22, yG], [x, yTop]);
  }
  function mark(T, x0, x1, yG) {
    T.line([x0, yG], [x1, yG]);
    T.hatch([x1, yG], [x0, yG], Math.round((x1 - x0) / 26));
  }
  /* streckgubbe som står med fötterna på yF */
  function gubbe(T, x, yF) {
    T.circle(x, yF - 50, 10);
    T.line([x, yF - 40], [x, yF - 18]);
    T.line([x, yF - 18], [x - 8, yF]);
    T.line([x, yF - 18], [x + 8, yF]);
    T.line([x, yF - 34], [x - 10, yF - 22]);
    T.line([x, yF - 34], [x + 10, yF - 22]);
  }
  /* vridningspunkten ringas in med blåpennan */
  function ring(T, x, y) {
    var r = { kind: 'stroke', pts: V.ringPts(x, y, 15, 12), color: BLUE };
    T.acts.push(r);
    return r;
  }
  /* strecken sedan index i0 (för att tona ut en grupp) */
  function strokesSince(T, i0) {
    return T.acts.slice(i0).filter(function (a) { return a.kind === 'stroke'; });
  }
  /* momentlagen M↺=M↻ med tonande moturs/medurs (REGEL TONANDE ORD) */
  function momentlag(T, F, y) {
    var acts = T.acts, padL = T.padL, wM = T.adv('M');
    var noteMot = { note: 1, x: padL + wM / 2, y: y + 0.78 * F,
                    text: 'moturs', fs: 15, wins: [] };
    var xEq = T.str('M↺', padL, y);
    acts.push({ kind: 'show', obj: noteMot });
    T.pause(320);
    var xM2 = T.str('=', xEq, y);
    var noteMed = { note: 1, x: xM2 + wM / 2, y: y + 0.78 * F,
                    text: 'medurs', fs: 15, wins: [] };
    T.str('M↻', xM2, y);
    acts.push({ kind: 'show', obj: noteMed });
    T.pause(420);
    T.stepEnd();
    acts.push({ kind: 'hide', obj: noteMot });
    acts.push({ kind: 'hide', obj: noteMed });
  }
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

  /* ---- Uppgift 1: vilken bock trycker hårdast? (flerval, A) ----
   * Vridningspunkten i tyngdpunkten: då försvinner F_G och kvar står de
   * två stödkrafternas moment. Den kortare hävarmen kräver den större
   * kraften. Skala 0,7 px per procent av tyngden: hävarmarna 130 och 60 px
   * ger F_V = 70·60/190 = 22,1 px och F_H = 70·130/190 = 47,9 px. */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 150, yB = 160, gY = 230;
    var xV = 110, xH = 300, xG = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar brädan på bockarna.']],
      [['Tyngdpunkten ligger närmare']],
      [['den högra bocken.']]
    ], 315));
    brada(T, 70, 410, yT, yB);
    T.pause(120);
    bock(T, xV, yB, gY);
    bock(T, xH, yB, gY);
    T.pause(120);
    mark(T, 56, 424, gY);
    T.lbl('V', xV - 40, 202);
    T.lbl('H', xH + 30, 202);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften verkar mitt på']],
      [['brädan, och bockarna trycker']],
      [['uppåt. Pilarna är skalenliga.']]
    ], 315));
    T.dot(xG, 155);
    T.arrow([xG, 155], [xG, 225], BLUE);
    T.lbl('F_G', xG + 8, 220, BLUE);
    T.pause(150);
    T.arrow([xV, yT], [xV, yT - 22.1], BLUE);
    T.lbl('F_V', xV - 40, yT - 10, BLUE);
    T.pause(150);
    T.arrow([xH, yT], [xH, yT - 47.9], BLUE);
    T.lbl('F_H', xH + 10, yT - 34, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Väljer vridningspunkten i']],
      [['tyngdpunkten. Där ger tyngd-']],
      [['kraften inget moment.']]
    ], 315));
    ring(T, xG, 155);
    T.pause(300);
    T.dash([xV, gY + 12], [xV, 264]);
    T.dash([xG, gY + 12], [xG, 264]);
    T.dash([xH, gY + 12], [xH, 264]);
    T.pause(150);
    T.dblArrow([xV, 258], [xG, 258], BLUE);
    T.lbl('l_V', (xV + xG) / 2 - 8, 282, BLUE);
    T.pause(150);
    T.dblArrow([xG, 258], [xH, 258], BLUE);
    T.lbl('l_H', (xG + xH) / 2 - 8, 282, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Brädan ligger stilla. Momenten']],
      [['kring tyngdpunkten tar ut']],
      [['varandra.']]
    ]));
    T.str('Momentjämvikt kring tyngdpunkten', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den högra kraften vrider moturs']],
      [['och den vänstra medurs kring']],
      [['tyngdpunkten.']]
    ]));
    T.str('F_H·l_H=F_V·l_V', padL, y);
    T.stepEnd();

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den högra hävarmen är kortare.']],
      [['Då måste den högra kraften vara']],
      [['större, annars blir momenten']],
      [['inte lika stora.']]
    ]));
    T.str('l_H<l_V⟹F_H>F_V', padL, y);
    T.stepEnd();

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Det stämmer med tumregeln: stödet']],
      [['närmast tyngdpunkten bär mest.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ A', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: varför vridningspunkten i P? (flerval, A) ----
   * Skala: F_G 55 px; momenten kring P ger F_Q = 55·120/210 = 31,4 px och
   * F_P = 55 − 31,4 = 23,6 px. */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 150, yB = 160, gY = 220;
    var xP = 120, xQ = 330, xG = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar brädan på stöden P och Q.']]
    ], 320));
    brada(T, 70, 410, yT, yB);
    T.pause(120);
    stod(T, xP, yB, gY);
    stod(T, xQ, yB, gY);
    T.pause(120);
    mark(T, 56, 424, gY);
    T.lbl('P', xP - 42, 206);
    T.lbl('Q', xQ + 28, 206);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften i tyngdpunkten och']],
      [['en stödkraft uppåt i varje stöd.']],
      [['Båda stödkrafterna är okända.']]
    ], 320));
    T.dot(xG, 155);
    T.arrow([xG, 155], [xG, 210], BLUE);
    T.lbl('F_G', xG + 8, 207, BLUE);
    T.pause(150);
    T.arrow([xP, yT], [xP, yT - 23.6], BLUE);
    T.lbl('F_P', xP - 40, yT - 12, BLUE);
    T.pause(150);
    T.arrow([xQ, yT], [xQ, yT - 31.4], BLUE);
    T.lbl('F_Q', xQ + 10, yT - 18, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Väljer vridningspunkten i P.']],
      [['Stödkraften där går rakt genom']],
      [['vridningspunkten.']]
    ], 320));
    ring(T, xP, 155);
    T.pause(300);
    T.dash([xP, gY + 14], [xP, 292]);
    T.dash([xG, gY + 14], [xG, 292]);
    T.dash([xQ, gY + 14], [xQ, 266]);
    T.pause(150);
    T.dblArrow([xP, 262], [xQ, 262], BLUE);
    T.lbl('l_Q', xQ + 10, 267, BLUE);
    T.pause(150);
    T.dblArrow([xP, 288], [xG, 288], BLUE);
    T.lbl('l_G', xG + 10, 293, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Avståndet från P till kraftens']],
      [['riktningslinje är 0. Hävarmen']],
      [['är alltså 0.']]
    ]));
    T.str('Stödkraften i P har hävarmen 0', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_P·0=0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Den ger inget moment. Kring P']],
      [['vrider bara de två andra']],
      [['krafterna.']]
    ]));
    T.str('Momentjämvikt kring P', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Kraften i Q vrider moturs och']],
      [['tyngdkraften medurs.']]
    ]));
    var xMom = T.str('F_Q·l_Q=F_G·l_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Bara en okänd kraft är kvar.']],
      [['Den kan lösas ut direkt.']]
    ]));
    T.fracH('F_G·l_G', 'l_Q', T.str('⟺F_Q=', xMom, y), y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Därför väljs P: en okänd kraft']],
      [['försvinner. Kraften i P blir inte']],
      [['lika stor som den i Q. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: bockar lika långt från mitten ----
   * Skala 0,3 px/N: F_G 70,7 px, varje stödkraft 35,35 px. */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 150, yB = 160, gY = 230;
    var x1 = 130, x2 = 350, xG = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar brädan på bockarna, lika']],
      [['långt från mitten på var sida.']]
    ], 300));
    brada(T, 70, 410, yT, yB);
    T.pause(120);
    bock(T, x1, yB, gY);
    bock(T, x2, yB, gY);
    T.pause(120);
    mark(T, 56, 424, gY);
    T.pause(120);
    T.lbl('m=24 kg', 150, 138, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften verkar mitt på']],
      [['brädan. Bockarna står symmet-']],
      [['riskt och bär lika mycket, så']],
      [['deras pilar blir lika långa.']]
    ], 300));
    T.dot(xG, 155);
    T.arrow([xG, 155], [xG, 225.7], BLUE);
    T.lbl('F_G', xG + 8, 222, BLUE);
    T.pause(150);
    T.arrow([x1, yT], [x1, yT - 35.35], BLUE);
    T.lbl('F', x1 - 22, yT - 22, BLUE);
    T.pause(150);
    T.arrow([x2, yT], [x2, yT - 35.35], BLUE);
    T.lbl('F', x2 + 10, yT - 22, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Brädan är i vila. Krafterna uppåt']],
      [['är tillsammans lika stora som']],
      [['tyngdkraften nedåt.']]
    ]));
    T.str('Kraftjämvikt: bockarna bär lika mycket', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var xJ = T.str('F+F=F_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Två lika stora krafter är 2·F.']],
      [['Sedan delar jag båda leden']],
      [['med 2.']]
    ]));
    T.fracH('F_G', '2', T.str('⟺2·F=F_G⟺F=', xJ, y), y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut']],
      [['direkt i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['F_G=m·g=24 kg·9,82 N/kg=235,68 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdet ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=117,84 N',
          T.fracH('235,68', '2', T.str('F=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Först nu avrundar jag. Massan']],
      [['24 kg har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈120 N');
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Varje bock bär hälften av tyngden,']],
      [['som om den bar 12 kg. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 120 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: plankan på stöden A (änden) och B ----
   * 80 px/m: plankan 80–400, A 80, tyngdpunkten 240, B 320.
   * Skala 0,2 px/N: F_G 58,9 px, F_B 39,3 px, F_A 19,6 px. */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 150, yB = 160, gY = 220;
    var xA = 80, xB = 320, xG = 240, xR = 400;

    T.tanke(T.figurBubble(292, [
      [['Ritar plankan på stöden A och B.']],
      [['A sitter vid vänstra änden.']]
    ], 332));
    brada(T, xA, xR, yT, yB);
    T.pause(120);
    stod(T, xA, yB, gY);
    stod(T, xB, yB, gY);
    T.pause(120);
    mark(T, 46, 420, gY);
    T.lbl('A', xA - 40, 206);
    T.lbl('B', xB + 26, 206);
    T.pause(120);
    T.lbl('m=30 kg', 124, 138, BLUE);
    T.pause(150);
    var i0 = T.acts.length;                     /* givna mått: tonas ut sedan */
    T.dash([xB, gY + 14], [xB, 256]);
    T.dash([xR, gY + 14], [xR, 284]);
    T.dash([xA, gY + 14], [xA, 284]);
    T.dblArrow([xB, 252], [xR, 252], BLUE);
    T.lbl('1,0 m', xR + 8, 257, BLUE);
    T.pause(150);
    T.dblArrow([xA, 280], [xR, 280], BLUE);
    T.lbl('4,0 m', 222, 300, BLUE);
    var givna = strokesSince(T, i0);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften verkar mitt på']],
      [['plankan, och stöden trycker']],
      [['uppåt. Pilarna är skalenliga.']]
    ], 332));
    T.dot(xG, 155);
    T.arrow([xG, 155], [xG, 213.9], BLUE);
    T.lbl('F_G', xG + 8, 212, BLUE);
    T.pause(150);
    T.arrow([xA, yT], [xA, yT - 19.6], BLUE);
    T.lbl('F_A', xA - 38, yT - 8, BLUE);
    T.pause(150);
    T.arrow([xB, yT], [xB, yT - 39.3], BLUE);
    T.lbl('F_B', xB + 10, yT - 26, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Två okända krafter. Väljer']],
      [['vridningspunkten i A, så att']],
      [['kraften där får hävarmen 0.']]
    ], 332));
    ring(T, xA, 155);
    V.fadeRings(T.acts, givna);
    T.pause(300);
    T.lbl('Tyngdpunkten mitt på:', 440, 172, null, 0.62);
    T.lbl('l_G=2,0 m', 440, 198, null, 0.62);
    T.lbl('l_B=4,0-1,0=3,0 m', 440, 224, null, 0.62);
    T.pause(300);
    T.dash([xA, gY + 14], [xA, 284]);
    T.dash([xG, gY + 14], [xG, 256]);
    T.dash([xB, gY + 14], [xB, 284]);
    T.pause(150);
    T.dblArrow([xA, 252], [xG, 252], BLUE);
    T.lbl('l_G=2,0 m', (xA + xG) / 2 - 40, 271, BLUE);
    T.pause(150);
    T.dblArrow([xA, 280], [xB, 280], BLUE);
    T.lbl('l_B=3,0 m', xB + 10, 285, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Plankan ligger stilla. Momenten']],
      [['kring A tar ut varandra.']]
    ]));
    T.str('Momentjämvikt kring A', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Kraften i B vrider moturs och']],
      [['tyngdkraften medurs.']]
    ]));
    var xMom = T.str('F_B·l_B=F_G·l_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Delar båda leden med hävarmen']],
      [['så att kraften blir ensam kvar.']]
    ]));
    T.fracH('F_G·l_G', 'l_B', T.str('⟺F_B=', xMom, y), y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut direkt']],
      [['i klammern. Hävarmarna har jag']],
      [['vid figuren.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=30 kg·9,82 N/kg=294,6 N', 'l_G=2,0 m', 'l_B=3,0 m'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=196,4 N',
          T.fracH('294,6·2,0', '3,0', T.str('F_B=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Först nu avrundar jag. Längderna']],
      [['och massan har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,20 kN');
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['B sitter närmast tyngdpunkten och']],
      [['bär två tredjedelar av tyngden']],
      [['294,6 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,20 kN', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: person på brädan, bockar i ändarna ----
   * 80 px/m: brädan 80–400, V 80, personen 160, tyngdpunkten 240, H 400.
   * Skala 0,15 px/N: personen 88,4 px, brädan 22,1 px, F_V 77,3 px,
   * F_H 33,1 px (kraft- och momentjämvikt stämmer med dessa). */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 150, yB = 160, gY = 230;
    var xV = 80, xP = 160, xG = 240, xH = 400;

    T.tanke(T.figurBubble(292, [
      [['Ritar brädan på bockarna i']],
      [['ändarna och personen 1,0 m']],
      [['från vänstra änden.']]
    ], 450));
    brada(T, xV, xH, yT, yB);
    T.pause(120);
    bock(T, xV, yB, gY);
    bock(T, xH, yB, gY);
    T.pause(120);
    mark(T, 40, 440, gY);
    T.pause(120);
    gubbe(T, xP, yT);
    T.lbl('m_p_e_r_s_o_n=60 kg', 100, 78, BLUE);
    T.lbl('m_b_r_ä_d_a=15 kg', 190, 140, BLUE);
    T.pause(150);
    var i0 = T.acts.length;
    T.dash([xV, gY + 12], [xV, 294]);
    T.dash([xP, gY + 12], [xP, 260]);
    T.dash([xH, gY + 12], [xH, 294]);
    T.dblArrow([xV, 256], [xP, 256], BLUE);
    T.lbl('1,0 m', xP + 8, 261, BLUE);
    T.pause(150);
    T.dblArrow([xV, 290], [xH, 290], BLUE);
    T.lbl('4,0 m', 222, 310, BLUE);
    var givna = strokesSince(T, i0);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Två tyngdkrafter nedåt och en']],
      [['kraft uppåt från varje bock.']],
      [['Pilarna är skalenliga.']]
    ], 450));
    T.dot(xP, yT - 22);
    T.arrow([xP, yT - 22], [xP, yT - 22 + 88.4], BLUE);
    T.lbl('F_p_e_r_s_o_n', xP + 8, 214, BLUE);
    T.pause(150);
    T.dot(xG, 155);
    T.arrow([xG, 155], [xG, 177.1], BLUE);
    T.lbl('F_G', xG + 8, 182, BLUE);
    T.pause(150);
    T.arrow([xV, yT], [xV, yT - 77.3], BLUE);
    T.lbl('F_V', xV - 38, yT - 64, BLUE);
    T.pause(150);
    T.arrow([xH, yT], [xH, yT - 33.1], BLUE);
    T.lbl('F_H', xH - 40, yT - 20, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Den sökta kraften verkar vid V.']],
      [['Väljer vridningspunkten i H, så']],
      [['att den andra okända kraften']],
      [['får hävarmen 0.']]
    ], 450));
    ring(T, xH, 155);
    V.fadeRings(T.acts, givna);
    T.pause(300);
    T.lbl('Tyngdpunkten mitt på, 2,0 m in. Avstånd från H:', padL, 352, null, 0.62);
    T.lbl('l_p_e_r_s_o_n=4,0-1,0=3,0 m', padL, 378, null, 0.62);
    T.lbl('l_G=4,0-2,0=2,0 m', padL, 404, null, 0.62);
    T.lbl('l_V=4,0 m', padL + 260, 404, null, 0.62);
    T.pause(300);
    T.dash([xP, gY + 12], [xP, 260]);
    T.dash([xG, gY + 12], [xG, 284]);
    T.dash([xV, gY + 12], [xV, 308]);
    T.dash([xH, gY + 12], [xH, 308]);
    T.pause(150);
    T.dblArrow([xP, 256], [xH, 256], BLUE);
    T.lbl('l_p_e_r_s_o_n', xP - 8 - T.lblW('l_p_e_r_s_o_n'), 261, BLUE);
    T.pause(150);
    T.dblArrow([xG, 280], [xH, 280], BLUE);
    T.lbl('l_G', xG - 8 - T.lblW('l_G'), 285, BLUE);
    T.pause(150);
    T.dblArrow([xV, 304], [xH, 304], BLUE);
    T.lbl('l_V', 232, 326, BLUE);
    T.stepEnd();

    var y = 580;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Brädan ligger stilla. Momenten']],
      [['kring H tar ut varandra.']]
    ]));
    T.str('Momentjämvikt kring H', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Personen och brädan vrider moturs']],
      [['kring H. Kraften från den vänstra']],
      [['bocken vrider medurs.']]
    ]));
    T.str('F_p_e_r_s_o_n·l_p_e_r_s_o_n+F_G·l_G=F_V·l_V', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 1.0 * F), bw, [
      [['Delar båda leden med hävarmen']],
      [['så att kraften blir ensam kvar.']]
    ]));
    T.fracH('F_p_e_r_s_o_n·l_p_e_r_s_o_n+F_G·l_G', 'l_V', T.str('⟺F_V=', padL, y), y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda tyngdkrafterna räknar jag']],
      [['ut direkt i klammern.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_p_e_r_s_o_n=m_p_e_r_s_o_n·g=60 kg·9,82 N/kg=589,2 N',
      'F_G=m_b_r_ä_d_a·g=15 kg·9,82 N/kg=147,3 N',
      'l_p_e_r_s_o_n=3,0 m', 'l_G=2,0 m', 'l_V=4,0 m'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('589,2·3,0+147,3·2,0', '4,0', T.str('F_V=', padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var xf = T.fracH('2 062,2', '4,0', T.str('=', padL + 24, y), y);
    T.stepEnd();

    var xIns = T.str('=515,55 N', xf + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈520 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Personen står närmast den vänstra']],
      [['bocken, som bär mer än hälften av']],
      [['den totala tyngden 736,5 N.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 520 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: hur långt förbi Q innan brädan tippar? ----
   * 80 px/m: brädan 40–520, P 160, tyngdpunkten 280, Q 360, personen
   * d = 1/3 m förbi Q (386,7). I tippögonblicket är F_P = 0.
   * Skala 0,11 px/N: personen 64,8 px, brädan 21,6 px, F_Q 86,4 px
   * (momenten kring Q: 196,4·1,0 = 589,2·0,333…). */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yT = 150, yB = 160, gY = 240;
    var xL = 40, xP = 160, xG = 280, xQ = 360, xR = 520;
    var xD = xQ + 80 / 3;

    T.tanke(T.figurBubble(292, [
      [['Ritar brädan på bockarna P och Q']],
      [['och personen en bit förbi Q.']]
    ], 380));
    brada(T, xL, xR, yT, yB);
    T.pause(120);
    bock(T, xP, yB, gY);
    bock(T, xQ, yB, gY);
    T.pause(120);
    mark(T, 30, 530, gY);
    T.lbl('P', xP - 26, 140);
    T.lbl('Q', xQ - 18, 140);
    T.pause(120);
    gubbe(T, xD, yT);
    T.lbl('m_b_r_ä_d_a=20 kg', 184, 140, BLUE);
    T.lbl('m_p_e_r_s_o_n=60 kg', 404, 222, BLUE);
    T.pause(150);
    var i0 = T.acts.length;
    T.dash([xL, gY + 12], [xL, 270]);
    T.dash([xP, gY + 12], [xP, 270]);
    T.dash([xQ, gY + 12], [xQ, 270]);
    T.dash([xR, gY + 12], [xR, 270]);
    T.dblArrow([xL, 266], [xP, 266], BLUE);
    T.lbl('1,5 m', 82, 288, BLUE);
    T.dblArrow([xP, 266], [xQ, 266], BLUE);
    T.lbl('2,5 m', 242, 288, BLUE);
    T.dblArrow([xQ, 266], [xR, 266], BLUE);
    T.lbl('2,0 m', 422, 288, BLUE);
    var givna = strokesSince(T, i0);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['När brädan börjar tippa lyfter']],
      [['den från P. Kraften där är då 0,']],
      [['och allt vilar på Q.']]
    ], 380));
    T.lbl('F_P=0', 66, 202, BLUE);
    T.pause(150);
    T.dot(xD, yT - 22);
    T.arrow([xD, yT - 22], [xD, yT - 22 + 64.8], BLUE);
    T.lbl('F_p_e_r_s_o_n', xD + 9, 186, BLUE);
    T.pause(150);
    T.dot(xG, 155);
    T.arrow([xG, 155], [xG, 176.6], BLUE);
    T.lbl('F_G', xG + 8, 184, BLUE);
    T.pause(150);
    T.arrow([xQ, yT], [xQ, yT - 86.4], BLUE);
    T.lbl('F_Q', xQ - 40, yT - 70, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Brädan vrider sig kring Q. Jag']],
      [['väljer Q som vridningspunkt, så']],
      [['försvinner kraften där också.']]
    ], 380));
    ring(T, xQ, 155);
    V.fadeRings(T.acts, givna);
    T.pause(300);
    T.lbl('Q: 1,5+2,5=4,0 m in, tyngdpunkten 3,0 m in', padL, 330, null, 0.62);
    T.lbl('l_G=4,0-3,0=1,0 m', padL, 356, null, 0.62);
    T.pause(300);
    T.dash([xG, gY + 12], [xG, 270]);
    T.dash([xQ, gY + 12], [xQ, 270]);
    T.dash([xD, gY + 12], [xD, 270]);
    T.pause(150);
    T.dblArrow([xG, 266], [xQ, 266], BLUE);
    T.lbl('l_G=1,0 m', 278, 288, BLUE);
    T.pause(150);
    T.dblArrow([xQ, 266], [xD, 266], BLUE);
    T.lbl('d', xD + 8, 271, BLUE);
    T.stepEnd();

    var y = 510;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Precis när brädan börjar tippa']],
      [['är den fortfarande i jämvikt.']]
    ]));
    T.str('Momentjämvikt kring Q när brädan börjar tippa', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Brädans tyngd vrider moturs och']],
      [['personens medurs. Personens']],
      [['hävarm är just ', 0], ['d', 1], ['.', 0]]
    ]));
    T.str('F_G·l_G=F_p_e_r_s_o_n·d', padL, y);
    T.stepEnd();

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften byter jag ut mot']],
      [['F', 1], [' = ', 0], ['m', 1], [' · ', 0], ['g', 1],
       [' i båda leden.', 0]]
    ]));
    T.str('m_b_r_ä_d_a·g·l_G=m_p_e_r_s_o_n·g·d', padL, y);
    T.stepEnd();

    var yM = y;
    var gw = T.adv('g') - 1.5;
    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['g', 1], [' finns som faktor i båda leden,', 0]],
      [['så den kan divideras bort.']]
    ]));
    stryk(T, F, padL + T.adv('m_b_r_ä_d_a·'), gw, yM);
    T.pause(260);
    stryk(T, F, padL + T.adv('m_b_r_ä_d_a·g·l_G=m_p_e_r_s_o_n·'), gw, yM);
    T.stepEnd();

    y += adv + 0.55 * F;
    var xRen = T.str('m_b_r_ä_d_a·l_G=m_p_e_r_s_o_n·d', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Delar med personens massa så att']],
      [['d', 1], [' blir ensamt kvar.', 0]]
    ]));
    T.fracH('m_b_r_ä_d_a·l_G', 'm_p_e_r_s_o_n', T.str('⟺d=', xRen, y), y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Hävarmen till brädans tyngd']],
      [['räknade jag ut vid figuren.']]
    ]));
    var klam = valueBracket(T.acts, ['m_b_r_ä_d_a=20 kg', 'l_G=1,0 m',
                                     'm_p_e_r_s_o_n=60 kg'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=0,333... m',
          T.fracH('20·1,0', '60', T.str('d=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,33 m');
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Personen väger tre gånger så']],
      [['mycket som brädan. Då blir hävar-']],
      [['men en tredjedel av 1,0 m.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,33 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

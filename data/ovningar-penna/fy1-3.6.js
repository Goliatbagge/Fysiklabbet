/* ovningar-penna/fy1-3.6.js: pennlösningar till övningarna i fy1-3.6
 * Friktion.
 *
 * En scen per övning, registrerad som "ov-fy1-3.6-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 60 N".
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.6-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.6-u' + nr, fn); }

  /* golv med skraffering och en låda: returnerar lådans mått */
  function golvLada(T, x0, x1, yG, bx0, bx1, h) {
    T.line([x0, yG], [x1, yG]);
    T.hatch([x1, yG], [x0, yG], 12);
    T.rect(bx0, yG - h, bx1, yG);
    return { x0: bx0, x1: bx1, top: yG - h, yG: yG,
             cx: (bx0 + bx1) / 2, cy: yG - h / 2 };
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

  /* ---- Uppgift 1: friktionskraften ur µ och normalkraften ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan på golvet. Den dras']],
      [['åt höger, så friktionen verkar']],
      [['åt vänster.']]
    ], 300));
    var L = golvLada(T, 110, 410, 250, 220, 300, 54);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in normalkraften och']],
      [['friktionstalet. Friktionskraften']],
      [['är det jag söker.']]
    ], 300));
    /* skalenligt: 0,4 px/N → F_N 80 px, F_f 24 px */
    T.arrow([L.cx, L.yG], [L.cx, L.yG - 80], BLUE);
    T.lbl('F_N=200 N', L.cx + 10, L.yG - 74, BLUE);
    T.pause(150);
    T.arrow([L.x0, L.yG - 3], [L.x0 - 24, L.yG - 3], BLUE);
    T.lbl('F_f', L.x0 - 52, L.yG - 12, BLUE);
    T.pause(150);
    T.lbl('µ=0,30', 316, L.yG + 32, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Friktionskraften är friktionstalet']],
      [['gånger normalkraften.']]
    ]));
    T.str('Friktionskraft', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_f=µ·F_N', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda värdena är givna.']],
      [['Jag samlar dem i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['µ=0,30', 'F_N=200 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('F_f=0,30·200=60 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Friktionen blir 30 procent av']],
      [['normalkraften, precis vad']],
      [['friktionstalet 0,30 säger.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 60 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: minsta kraften som får sandsäcken att glida ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar sandsäcken på golvet och']],
      [['dragkraften åt höger.']]
    ], 300));
    var L = golvLada(T, 110, 410, 250, 220, 290, 50);
    T.line([246, L.top], [255, L.top - 12]);           /* knuten */
    T.line([264, L.top], [255, L.top - 12]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vid gränsen är dragkraften lika']],
      [['stor som friktionen. Pilarna är']],
      [['därför lika långa.']]
    ], 300));
    T.arrow([L.x1, L.cy], [L.x1 + 44, L.cy], BLUE);
    T.lbl('F', L.x1 + 52, L.cy + 6, BLUE);
    T.pause(150);
    T.arrow([L.x0, L.yG - 3], [L.x0 - 44, L.yG - 3], BLUE);
    T.lbl('F_f', L.x0 - 72, L.yG - 12, BLUE);
    T.pause(150);
    T.lbl('m=25 kg', 222, L.top - 26, BLUE);
    T.lbl('µ=0,45', 316, L.yG + 32, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Säcken börjar glida när drag-']],
      [['kraften når friktionens största']],
      [['värde.']]
    ]));
    T.str('Glidningsgränsen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F=F_f=µ·F_N', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Normalkraften är inte given.']],
      [['På plant golv bär golvet hela']],
      [['säckens tyngd, så den räknar']],
      [['jag ut i klammern.']]
    ]));
    var klam = valueBracket(T.acts, [
      'µ=0,45', 'F_N=F_G=m·g=25 kg·9,82 N/kg=245,5 N'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F=0,45·245,5=110,475 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['och friktionstalet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈110 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['110 N är ungefär som att lyfta']],
      [['11 kg. Det orkar man, men det']],
      [['tar i. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 110 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: friktionstalet ur två krafter ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar klossen som glider åt']],
      [['höger över bordet.']]
    ], 300));
    var L = golvLada(T, 110, 410, 250, 225, 295, 40);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in de två krafterna.']],
      [['Pilarna ritas skalenligt.']]
    ], 300));
    /* 3 px/N → F_N 75 px, F_f 25,5 px */
    T.arrow([L.cx, L.yG], [L.cx, L.yG - 75], BLUE);
    T.lbl('F_N=25 N', L.cx + 10, L.yG - 68, BLUE);
    T.pause(150);
    T.arrow([L.x0, L.yG - 3], [L.x0 - 26, L.yG - 3], BLUE);
    T.lbl('F_f=8,5 N', L.x0 - 128, L.yG - 12, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Friktionstalet är okänt. Jag']],
      [['löser ut det ur friktionsformeln']],
      [['genom att dela med normal-']],
      [['kraften.']]
    ]));
    T.str('Friktionstal', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('F_f=µ·F_N⟺µ=', padL, y);
    T.fracH('F_f', 'F_N', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['F_f=8,5 N', 'F_N=25 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=0,34', T.fracH('8,5', '25', T.str('µ=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Friktionstalet saknar enhet, det']],
      [['är en kvot mellan två krafter.']],
      [['Ett värde mellan 0 och 1, som']],
      [['för trä mot trä. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,34', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: normalkraften mellan stekspade och teflonpanna ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yB = 260;

    T.tanke(T.figurBubble(292, [
      [['Ritar pannan och spaden som']],
      [['glider åt höger över botten.']]
    ], 320));
    T.line([140, yB], [400, yB]);                         /* pannans botten */
    T.line([140, yB], [122, yB - 44]);
    T.line([400, yB], [418, yB - 44]);
    T.line([126, yB - 34], [56, yB - 46]);                /* skaftet */
    T.line([124, yB - 40], [56, yB - 54]);
    T.pause(150);
    T.rect(236, yB - 10, 326, yB);                        /* spadens blad */
    T.line([326, yB - 8], [392, yB - 92]);                /* spadens skaft */
    T.line([332, yB - 6], [398, yB - 90]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Friktionen verkar på spaden,']],
      [['bakåt mot rörelsen. Normal-']],
      [['kraften är det jag söker.']]
    ], 320));
    T.arrow([236, yB - 4], [210, yB - 4], BLUE);
    T.lbl('F_f=0,60 N', 150, yB + 34, BLUE);
    T.pause(150);
    T.arrow([281, yB], [281, yB - 70], BLUE);
    T.lbl('F_N', 244, yB - 58, BLUE);
    T.pause(150);
    T.lbl('µ=0,040', 300, yB + 34, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Normalkraften är okänd. Jag']],
      [['löser ut den ur friktionsformeln']],
      [['genom att dela med friktions-']],
      [['talet.']]
    ]));
    T.str('Normalkraft ur friktionsformeln', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('F_f=µ·F_N⟺F_N=', padL, y);
    T.fracH('F_f', 'µ', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['F_f=0,60 N', 'µ=0,040'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=15 N',
          T.fracH('0,60', '0,040', T.str('F_N=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['15 N är ett lätt tryck med']],
      [['handen. Friktionen blir ändå']],
      [['bara 0,60 N, tack vare teflonets']],
      [['låga friktionstal. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 15 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: vilofriktionen när lådan står still ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar packlådan på golvet.']]
    ], 300));
    var L = golvLada(T, 100, 410, 250, 230, 320, 60);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Puttet verkar åt höger och']],
      [['friktionen åt vänster. Ingen av']],
      [['dem är större än den andra, så']],
      [['jag ritar dem lika långa.']]
    ], 300));
    T.arrow([L.x0 - 56, L.cy - 6], [L.x0, L.cy - 6], BLUE);
    T.lbl('F=50 N', L.x0 - 112, L.cy - 22, BLUE);
    T.pause(150);
    T.arrow([L.x0, L.yG - 3], [L.x0 - 56, L.yG - 3], BLUE);
    T.lbl('F_f', L.x0 - 92, L.yG - 10, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lådan står stilla och acce-']],
      [['lererar inte. Enligt Newtons']],
      [['första lag är den resulterande']],
      [['kraften då noll.']]
    ]));
    T.str('Lådan står stilla: kraftjämvikt', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['I sidled verkar bara puttet och']],
      [['friktionen. De måste ta ut']],
      [['varandra.']]
    ]));
    T.str('F-F_f=0⟺F_f=F', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Vilofriktionen anpassar sig efter']],
      [['puttet, så länge den inte når']],
      [['sitt största värde.']]
    ]));
    T.str('F_f=50 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['µ·F_N är friktionens största']],
      [['värde, inte det den har nu.']],
      [['Lådan har ju inte börjat glida.']],
      [['Därför är det inte alternativ C.']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: friktionstalet för bokhyllan ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var by = 200, K = 0.5;

    T.tanke(T.figurBubble(292, [
      [['Ritar bokhyllan som dras åt']],
      [['höger, med friktionen som']],
      [['motverkar.']]
    ], 300));
    T.line([110, by + 40], [410, by + 40]);
    T.hatch([410, by + 40], [110, by + 40], 12);
    T.rect(200, by - 60, 290, by + 40);
    T.line([200, by - 20], [290, by - 20]);
    T.line([200, by + 10], [290, by + 10]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan, dragkraften']],
      [['och accelerationen. Pilarna']],
      [['ritas skalenligt.']]
    ], 300));
    T.arrow([290, by - 30], [290 + 325 * K * 0.28, by - 30], BLUE);
    T.lbl('F_d_r_a_g=325 N', 290 + 325 * K * 0.28 + 8, by - 24, BLUE);
    T.pause(150);
    T.arrow([200, by + 37], [200 - 125 * K * 0.28, by + 37], BLUE);
    T.lbl('F_f', 150, by + 30, BLUE);
    T.pause(150);
    T.lbl('m=50 kg', 84, by - 34, BLUE);
    T.lbl('a=4,0 m/s^2', 300, by + 74, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Friktionstalet är kvoten mellan']],
      [['friktionskraften och normal-']],
      [['kraften.']]
    ]));
    T.str('Friktionstal', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('F_f=µ·F_N⟺µ=', padL, y);
    T.fracH('F_f', 'F_N', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Ingen av krafterna är given. Den']],
      [['resulterande kraften är drag-']],
      [['kraften minus friktionen, och']],
      [['den är m·a. Normalkraften är']],
      [['hyllans tyngd.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_R=F_d_r_a_g-F_f⟺F_f=F_d_r_a_g-F_R=F_d_r_a_g-m·a',
      '    =325 N-50 kg·4,0 m/s^2=125 N',
      'F_N=F_G=m·g=50 kg·9,82 N/kg=491 N'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=0,2545...',
          T.fracH('125', '491', T.str('µ=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['och accelerationen har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,25');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Friktionen är en fjärdedel av']],
      [['normalkraften. Ett vanligt värde']],
      [['för trä mot golv. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,25', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: bromssträckan med låsta hjul ---- */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var vy = 210;

    T.tanke(T.figurBubble(292, [
      [['Ritar bilen som bromsar på']],
      [['vägen. Den åker åt höger.']]
    ], 330));
    T.line([90, vy + 30], [410, vy + 30]);
    T.hatch([410, vy + 30], [90, vy + 30], 13);
    T.rect(110, vy - 10, 200, vy + 16);
    T.line([128, vy - 10], [144, vy - 30]);
    T.line([182, vy - 10], [168, vy - 30]);
    T.line([144, vy - 30], [168, vy - 30]);
    T.circle(130, vy + 16, 10);
    T.circle(182, vy + 16, 10);
    T.pause(150);
    T.line([394, vy + 30], [394, vy - 24]);              /* där bilen stannar */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Friktionen bromsar bakåt. Bilen']],
      [['rullar sträckan s innan den']],
      [['står still.']]
    ], 330));
    T.arrow([200, vy - 2], [240, vy - 2], BLUE);
    T.lbl('v_0=90 km/h', 214, vy - 22, BLUE);
    T.pause(150);
    T.arrow([110, vy + 27], [84, vy + 27], BLUE);
    T.lbl('F_f', 66, vy + 6, BLUE);
    T.pause(150);
    T.dblArrow([200, vy + 60], [394, vy + 60], BLUE);
    T.lbl('s', 290, vy + 84, BLUE);
    T.pause(150);
    T.lbl('m=1 400 kg', 96, vy - 54, BLUE);
    T.lbl('µ=0,72', 270, vy - 54, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Bilen bromsar med konstant']],
      [['retardation. Torricellis ekvation']],
      [['kopplar ihop farten med']],
      [['sträckan.']]
    ]));
    T.str('Torricellis ekvation', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('v^2-v_0^2=2·a·s⟺s=', padL, y);
    T.fracH('v^2-v_0^2', '2·a', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Bara friktionen bromsar, så']],
      [['m·a=µ·m·g. Massan divideras']],
      [['bort och a=µ·g, med minus']],
      [['eftersom den pekar bakåt.']]
    ]));
    var klam = valueBracket(T.acts, [
      'v=0',
      'v_0=90 km/h=25 m/s',
      'a=-µ·g=-0,72·9,82 N/kg=-7,0704 m/s^2'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=44,198... m',
          T.fracH('0^2-25^2', '2·(-7,0704)', T.str('s=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Friktionstalet och farten har']],
      [['två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈44 m');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['44 m är ungefär tio billängder.']],
      [['Så lång brukar en inbromsning']],
      [['från 90 km/h på torr väg bli.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 44 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 8: hundspannets acceleration ---- */
  reg(8, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250;

    T.tanke(T.figurBubble(292, [
      [['Ritar släden på snön. Hundarna']],
      [['drar den åt höger.']]
    ], 300));
    T.line([100, yG], [410, yG]);
    T.hatch([410, yG], [100, yG], 12);
    T.line([200, yG - 3], [312, yG - 3]);                 /* meden */
    T.line([312, yG - 3], [326, yG - 18]);
    T.pause(120);
    T.rect(210, yG - 50, 296, yG - 14);                   /* korgen */
    T.line([220, yG - 14], [220, yG - 3]);
    T.line([286, yG - 14], [286, yG - 3]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in värdena. Friktionen']],
      [['verkar bakåt vid medarna.']]
    ], 300));
    T.arrow([296, yG - 32], [296 + 72, yG - 32], BLUE);
    T.lbl('F_d_r_a_g=8·60 N', 376, yG - 26, BLUE);
    T.pause(150);
    T.arrow([200, yG - 6], [200 - 43, yG - 6], BLUE);
    T.lbl('F_f', 128, yG - 18, BLUE);
    T.pause(150);
    T.lbl('m=210 kg', 92, yG - 62, BLUE);
    T.lbl('µ=0,14', 316, yG + 32, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen beror på den']],
      [['resulterande kraften och']],
      [['slädens massa.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('F_R=m·a⟺a=', padL, y);
    var xf = T.fracH('F_R', 'm', xa, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Den resulterande kraften är']],
      [['hundarnas drag minus friktionen.']]
    ]));
    T.fracH('F_d_r_a_g-F_f', 'm', T.str('=', xf + 0.15 * F, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Dragkraften är åtta hundar']],
      [['gånger 60 N. Snön bär hela']],
      [['släden, så friktionen är µ·m·g.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_d_r_a_g=8·60 N=480 N',
      'F_f=µ·m·g=0,14·210 kg·9,82 N/kg=288,708 N',
      'm=210 kg'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=0,9109... m/s^2',
          T.fracH('480-288,708', '210', T.str('a=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Kraften']],
      [['60 N och friktionstalet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,91 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En lugn start. Friktionen äter']],
      [['upp mer än hälften av hundarnas']],
      [['480 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,91 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 9: friktionstalet mellan curlingsten och is ---- */
  reg(9, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar stenen när den släpps och']],
      [['där den stannar, 28 m bort.']]
    ], 320));
    T.line([90, yG], [410, yG]);
    T.hatch([410, yG], [90, yG], 13);
    T.rect(110, yG - 22, 160, yG);                        /* stenen */
    T.line([124, yG - 22], [128, yG - 34]);
    T.line([128, yG - 34], [150, yG - 34]);
    T.pause(150);
    T.dash([350, yG - 22], [400, yG - 22]);               /* där den stannar */
    T.dash([350, yG - 22], [350, yG]);
    T.dash([400, yG - 22], [400, yG]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Friktionen bromsar bakåt hela']],
      [['vägen tills stenen står still.']]
    ], 320));
    T.arrow([160, yG - 11], [206, yG - 11], BLUE);
    T.lbl('v_0=2,2 m/s', 170, yG - 50, BLUE);
    T.pause(150);
    T.arrow([110, yG - 3], [90, yG - 3], BLUE);
    T.lbl('F_f', 66, yG - 16, BLUE);
    T.pause(150);
    T.dblArrow([135, yG + 34], [375, yG + 34], BLUE);
    T.lbl('s=28 m', 222, yG + 60, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Friktionen är den enda kraft som']],
      [['bromsar. Newtons andra lag ger']],
      [['stenen retardationen a.']]
    ]));
    T.str('Friktionen bromsar stenen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var xm1 = padL + T.adv('µ·');
    var xm2 = padL + T.adv('µ·m·g=');
    var wm = T.adv('m') - 1.5;
    T.str('µ·m·g=m·a', padL, y);
    T.stepEnd();

    var yM = y;
    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['Massan finns som faktor i båda']],
      [['leden, så den kan divideras bort.']]
    ]));
    stryk(T, F, xm1, wm, yM);
    T.pause(260);
    stryk(T, F, xm2, wm, yM);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Delar med g så att friktions-']],
      [['talet blir ensamt kvar.']]
    ]));
    var xr = T.str('µ·g=a⟺µ=', padL, y);
    T.fracH('a', 'g', xr, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Retardationen är inte given.']],
      [['Stenen bromsas jämnt till stopp,']],
      [['så Torricellis ekvation med slut-']],
      [['farten noll ger den i klammern.']]
    ]));
    var klam = valueBracket(T.acts, [
      ['a=', { frac: ['v_0^2', '2·s'] }, '=',
       { frac: ['(2,2 m/s)^2', '2·28 m'] }, '=0,08642... m/s^2'],
      'g=9,82 N/kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=0,008801...',
          T.fracH('0,08642...', '9,82', T.str('µ=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Farten']],
      [['och sträckan har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,0088');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ett mycket litet friktionstal.']],
      [['Isen är hal, och stenen glider']],
      [['nästan 30 m på en enda knuff.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,0088', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 10: lådan som dras snett uppåt ----
   * Två lösningsdelar som i textlösningen: normalkraften först (den
   * ingår i friktionen), sedan accelerationen. */
  reg(10, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan på golvet och']],
      [['snöret som drar snett uppåt.']]
    ], 440));
    var L = golvLada(T, 100, 410, yG, 210, 280, 50);
    T.stepEnd();

    /* skalenligt 1,5 px/N: F 90, F_G 176,8, F_N 138,7, F_f 41,6 */
    var a = 25 * Math.PI / 180;
    var p0 = [L.x1, L.cy];
    var tip = [p0[0] + 90 * Math.cos(a), p0[1] - 90 * Math.sin(a)];
    T.tanke(T.figurBubble(292, [
      [['Dragkraften delas upp i en del']],
      [['framåt och en del uppåt. Delen']],
      [['uppåt lyfter lite i lådan.']]
    ], 440));
    T.arrow(p0, tip, BLUE);
    T.lbl('F=60 N', tip[0] + 6, tip[1] - 8, BLUE);
    T.pause(150);
    T.dashArrow(p0, [tip[0], p0[1]], BLUE);
    T.dashArrow([tip[0], p0[1]], tip, BLUE);
    (function () {                                       /* vinkelbågen */
      var pts = [], n = 10, i;
      for (i = 0; i <= n; i++) {
        var b = -(i / n) * a;
        pts.push([p0[0] + 30 * Math.cos(b), p0[1] + 30 * Math.sin(b)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts, color: BLUE });
    })();
    T.lbl('25°', p0[0] + 36, p0[1] - 3, BLUE, 0.45);
    T.pause(150);
    T.arrow([L.cx + 3, L.yG], [L.cx + 3, L.yG - 139], BLUE);
    T.lbl('F_N', L.cx + 12, L.yG - 126, BLUE);
    T.pause(150);
    T.arrow([L.cx - 3, L.cy], [L.cx - 3, L.cy + 177], BLUE);
    T.dot(L.cx - 3, L.cy);
    T.lbl('F_G', L.cx - 46, L.cy + 170, BLUE);
    T.pause(150);
    T.arrow([L.x0, L.yG - 3], [L.x0 - 42, L.yG - 3], BLUE);
    T.lbl('F_f', L.x0 - 76, L.yG - 12, BLUE);
    T.pause(150);
    T.lbl('m=12 kg', 104, L.top - 22, BLUE);
    T.lbl('µ=0,30', 316, L.yG + 32, BLUE);
    T.stepEnd();

    /* ---- normalkraften ---- */
    var y = 560;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Lådan lyfter inte från golvet.']],
      [['Krafterna uppåt är lika stora']],
      [['som tyngdkraften nedåt.']]
    ]));
    T.str('Normalkraft: jämvikt i lodled', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_N+F·sin 25°=F_G', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Löser ut normalkraften och']],
      [['skriver tyngdkraften som m·g.']]
    ]));
    T.str('⟺F_N=m·g-F·sin 25°', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=12 kg', 'g=9,82 N/kg', 'F=60 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern. Jag avrundar inte,']],
      [['normalkraften används igen.']]
    ]));
    T.str('F_N=12·9,82-60·sin 25°', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.str('=92,482... N', padL + 24, y);
    T.stepEnd();

    /* ---- accelerationen ---- */
    y += adv + 2.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen beror på den']],
      [['resulterande kraften i sidled.']]
    ]));
    T.str('Acceleration: Newtons andra lag i sidled', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('F_R=m·a⟺a=', padL, y);
    var xf = T.fracH('F_R', 'm', xa, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['I sidled drar F·cos 25° framåt']],
      [['och friktionen µ·F_N bakåt.']]
    ]));
    T.fracH('F·cos 25°-µ·F_N', 'm', T.str('=', xf + 0.15 * F, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Normalkraften tar jag']],
      [['oavrundad från raden ovanför.']]
    ]));
    klam = valueBracket(T.acts, [
      'F=60 N', 'µ=0,30', 'F_N=92,482... N', 'm=12 kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('60·cos 25°-0,30·92,482...', '12', T.str('a=', padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var xIns = T.str('=2,219... m/s^2', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2,2 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Utan friktion hade den blivit']],
      [['cirka 4,5 m/s². Friktionen tar']],
      [['ungefär hälften. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 2,2 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 11: framhjulsdriven bil, största acceleration ----
   * a) bara framhjulens normalkraft ger drivande friktion, b) tiden
   * 0–100 km/h med den accelerationen. */
  reg(11, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var vy = 210;

    T.tanke(T.figurBubble(292, [
      [['Ritar bilen. Den startar åt']],
      [['höger och drivs av framhjulen.']]
    ], 330));
    T.line([90, vy + 30], [410, vy + 30]);
    T.hatch([410, vy + 30], [90, vy + 30], 13);
    T.rect(170, vy - 10, 310, vy + 16);
    T.line([196, vy - 10], [216, vy - 34]);
    T.line([270, vy - 10], [252, vy - 34]);
    T.line([216, vy - 34], [252, vy - 34]);
    T.circle(196, vy + 18, 11);
    T.circle(284, vy + 18, 11);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Framhjulen bär halva tyngden.']],
      [['Vägen skjuter dem framåt med']],
      [['friktionskraften.']]
    ], 330));
    T.arrow([284, vy + 29], [284, vy - 50], BLUE);
    T.lbl('F_N', 292, vy - 42, BLUE);
    T.pause(150);
    T.arrow([290, vy + 27], [344, vy + 27], BLUE);
    T.lbl('F_f', 352, vy + 20, BLUE);
    T.pause(150);
    T.lbl('m=1 400 kg', 96, vy - 54, BLUE);
    T.lbl('µ=0,90', 300, vy + 64, BLUE);
    T.stepEnd();

    /* ---- a) största accelerationen ---- */
    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Friktionen på framhjulen är den']],
      [['enda kraften framåt. Den kan bli']],
      [['högst µ gånger framhjulens']],
      [['normalkraft, halva tyngden.']]
    ]));
    T.str('a) Friktionen ger hela bilen dess acceleration', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var x0 = T.str('m·a=µ·', padL, y);
    T.fracH('m·g', '2', x0, y);
    T.stepEnd();

    var yM = y;
    var wm = T.adv('m') - 1.5;
    var xNum = x0 + (Math.max(T.adv('m·g'), T.adv('2')) + 0.3 * F -
                     T.adv('m·g')) / 2;
    T.tanke(T.bubble(140, T.bubbleTop(yM + 0.9 * F), bw, [
      [['Massan finns som faktor i båda']],
      [['leden, så den kan divideras bort.']]
    ]));
    stryk(T, F, padL, wm, yM);
    T.pause(260);
    stryk(T, F, xNum, wm, yM - 0.48 * F);
    T.stepEnd();

    y += adv + 2.4 * F;
    var xa = T.str('a=', padL, y);
    T.fracH('µ·g', '2', xa, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    var klam = valueBracket(T.acts, ['µ=0,90', 'g=9,82 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=4,419 m/s^2',
          T.fracH('0,90·9,82', '2', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Friktionstalet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈4,4 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Knappt hälften av g, eftersom']],
      [['bara halva tyngden trycker på']],
      [['drivhjulen. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 4,4 m/s^2', padL, y), y);
    T.stepEnd();

    /* ---- b) kortaste tiden 0–100 km/h ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bilen startar från stillastående']],
      [['med konstant acceleration, så']],
      [['farten växer som a·t.']]
    ]));
    T.str('b) Konstant acceleration från stillastående', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('v=a·t⟺t=', padL, y);
    T.fracH('v', 'a', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Farten görs om till m/s, och']],
      [['accelerationen tar jag']],
      [['oavrundad från a).']]
    ]));
    klam = valueBracket(T.acts, [
      'v=100 km/h=27,777... m/s',
      'a=4,419 m/s^2 (från a)'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    xIns = T.str('=6,285... s',
          T.fracH('27,777...', '4,419', T.str('t=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag, till två']],
      [['värdesiffror som i a).']]
    ]));
    y = avr(T, F, xIns, y, '≈6,3 s');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Snabba bilar med fyrhjulsdrift']],
      [['klarar det på cirka 4 s. Med']],
      [['bara framhjulen är 6,3 s rimligt.']]
    ]));
    T.underline(T.str('Svar: 6,3 s', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

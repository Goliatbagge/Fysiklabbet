/* ovningar-penna/fy1-3.2.js: pennlösningar till övningarna i fy1-3.2
 * Newtons andra lag.
 *
 * En scen per övning, registrerad som "ov-fy1-3.2-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 4,0 m/s^2".
 * Den resulterande kraften F_R ritas STRECKAD (summan av krafterna, inte
 * en egen påförd kraft). Siffrorna är identiska med övningens textlösning
 * ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.2-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.2-u' + nr, fn); }

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
  /* sluten kurva genom punkter (ellips, racket, delfin) */
  function kurva(T, pts, color) {
    T.acts.push({ kind: 'stroke', pts: pts, color: color || null });
  }
  function ellips(cx, cy, rx, ry, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var a = (i / n) * Math.PI * 2;
      pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
    }
    return pts;
  }
  /* en vagn: kaross + två hjul som står på marken yG */
  function vagn(T, x0, x1, yG, h, r) {
    T.rect(x0, yG - 2 * r - h, x1, yG - 2 * r);
    T.circle(x0 + 0.22 * (x1 - x0), yG - r, r);
    T.circle(x1 - 0.22 * (x1 - x0), yG - r, r);
  }
  /* Newtons andra lag med a utlöst: rubrik + formel i samma steg */
  function formelA(T, F, y, rubrik) {
    T.str(rubrik, T.padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_R', 'm', T.str('F_R=m·a⟺a=', T.padL, y), y);
    T.stepEnd();
    return y;
  }
  function nuSatter(T, F, y, bw) {
    T.tanke(T.bubble(140, T.bubbleTop(y - 1.7 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
  }

  /* ---- Uppgift 1: accelerationen ur kraft och massa ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar föremålet som en låda.']]
    ], 300));
    T.rect(200, 170, 280, 230);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Den resulterande kraften ritas']],
      [['streckad. Den är summan av alla']],
      [['krafter som verkar på föremålet.']]
    ], 300));
    /* 3 px/N → 72 px */
    T.dashArrow([280, 200], [352, 200], BLUE);
    T.lbl('F_R=24 N', 360, 206, BLUE);
    T.pause(150);
    T.lbl('m=6,0 kg', 200, 154, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen söks. Jag löser']],
      [['ut den ur Newtons andra lag']],
      [['genom att dela med massan.']]
    ]));
    y = formelA(T, F, y, 'Newtons andra lag');

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda värdena är givna.']],
      [['Jag samlar dem i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['F_R=24 N', 'm=6,0 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    T.str('=4,0 m/s^2',
          T.fracH('24', '6,0', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Varje kilogram får 4 N, och']],
      [['1 N ger 1 kg accelerationen']],
      [['1 m/s². Rimligt!']]
    ]));
    T.underline(T.str('Svar: 4,0 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: resulterande kraften ur massa och acceleration ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar föremålet som en låda.']]
    ], 300));
    T.rect(200, 180, 270, 230);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan och accelera-']],
      [['tionen. Den resulterande kraften,']],
      [['streckad, är det jag söker.']]
    ], 300));
    T.lbl('m=1,5 kg', 200, 164, BLUE);
    T.pause(150);
    T.arrow([270, 194], [320, 194], BLUE);
    T.lbl('a=8,0 m/s^2', 328, 200, BLUE);
    T.pause(150);
    T.dashArrow([270, 218], [330, 218], BLUE);
    T.lbl('F_R', 338, 230, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den resulterande kraften är']],
      [['massan gånger accelerationen.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda värdena är givna.']],
      [['Jag samlar dem i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['m=1,5 kg', 'a=8,0 m/s^2'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    nuSatter(T, F, y, bw);
    T.str('F_R=1,5·8,0=12 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['12 N är ungefär tyngden av en']],
      [['liter mjölk. En lagom knuff för']],
      [['ett föremål på 1,5 kg. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 12 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: massan ur kraft och acceleration ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar föremålet som en låda.']]
    ], 300));
    T.rect(190, 170, 270, 230);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kraften på 45 N ger föremålet']],
      [['dess acceleration. Den är den']],
      [['resulterande kraften, streckad.']]
    ], 300));
    T.dashArrow([270, 214], [360, 214], BLUE);
    T.lbl('F_R=45 N', 368, 220, BLUE);
    T.pause(150);
    T.arrow([270, 184], [306, 184], BLUE);
    T.lbl('a=3,0 m/s^2', 314, 190, BLUE);
    T.pause(150);
    T.lbl('m', 222, 156, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Massan söks. Jag löser ut den']],
      [['ur Newtons andra lag genom att']],
      [['dela med accelerationen.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_R', 'a', T.str('F_R=m·a⟺m=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Kraften är den resulterande']],
      [['kraften. Båda värdena är givna.']]
    ]));
    var klam = valueBracket(T.acts, ['F_R=45 N', 'a=3,0 m/s^2'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    T.str('=15 kg',
          T.fracH('45', '3,0', T.str('m=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Kontroll: 15 kg gånger 3,0 m/s²']],
      [['ger tillbaka 45 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 15 kg', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: godstågets acceleration ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250;

    T.tanke(T.figurBubble(292, [
      [['Ritar tåget: loket längst fram']],
      [['och vagnarna efter.']]
    ], 300));
    T.line([90, yG], [410, yG]);
    T.hatch([410, yG], [90, yG], 13);
    vagn(T, 100, 180, yG, 30, 7);
    T.line([180, yG - 28], [192, yG - 28]);
    vagn(T, 192, 272, yG, 30, 7);
    T.line([272, yG - 28], [284, yG - 28]);
    T.pause(120);
    vagn(T, 284, 364, yG, 30, 7);                       /* loket */
    T.rect(330, yG - 72, 364, yG - 44);                 /* förarhytten */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan. Den resul-']],
      [['terande kraften ritas streckad']],
      [['framåt.']]
    ], 300));
    T.dashArrow([364, yG - 30], [404, yG - 30], BLUE);
    T.lbl('F_R=3,2·10^5 N', 412, yG - 24, BLUE);
    T.pause(150);
    T.lbl('m=4,0·10^6 kg', 120, yG - 66, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen söks. Jag löser']],
      [['ut den ur Newtons andra lag.']]
    ]));
    y = formelA(T, F, y, 'Newtons andra lag');

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda värdena är givna i grund-']],
      [['potensform. Jag samlar dem i']],
      [['klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['F_R=3,2·10^5 N', 'm=4,0·10^6 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    nuSatter(T, F, y, bw);
    T.str('=0,080 m/s^2',
          T.fracH('3,2·10^5', '4,0·10^6', T.str('a=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En mycket liten acceleration,']],
      [['eftersom massan är enorm.']],
      [['Godståg kommer långsamt upp']],
      [['i fart. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,080 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: tennisbollens acceleration vid serven ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var cx = 190, cy = 196, rx = 28, ry = 42, r = 15;

    T.tanke(T.figurBubble(292, [
      [['Ritar racketen och bollen i']],
      [['träffögonblicket. De nuddar']],
      [['varandra.']]
    ], 340));
    kurva(T, ellips(cx, cy, rx, ry, 28));               /* racketens huvud */
    T.line([cx, cy + ry], [cx - 4, cy + ry + 60]);       /* skaftet */
    T.line([cx + 6, cy + ry - 1], [cx + 3, cy + ry + 60]);
    T.pause(150);
    kurva(T, ellips(cx + rx + r, cy, r, r, 20));         /* bollen */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Racketen trycker på bollen där']],
      [['de möts. Kraften pekar framåt']],
      [['genom bollen.']]
    ], 340));
    /* 0,6 px/N → 78 px, angreppspunkt i kontaktpunkten */
    T.arrow([cx + rx, cy], [cx + rx + 78, cy], BLUE);
    T.lbl('F=130 N', cx + rx + 86, cy + 6, BLUE);
    T.pause(150);
    T.lbl('m=58 g', cx + rx + 12, cy - 24, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen söks. Jag löser']],
      [['ut den ur Newtons andra lag.']]
    ]));
    y = formelA(T, F, y, 'Newtons andra lag');

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Racketens kraft är så mycket']],
      [['större än bollens tyngd att den']],
      [['är den resulterande kraften.']],
      [['Gram görs om till kilogram.']]
    ]));
    var klam = valueBracket(T.acts, ['F_R=F=130 N', 'm=58 g=0,058 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    var xIns = T.str('=2 241,379... m/s^2',
          T.fracH('130', '0,058', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2 200 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mer än 200 gånger g! Bollen är']],
      [['lätt och kraften stor, så den']],
      [['får fart på ett ögonblick.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 2 200 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6 (flerval): dubbelt så tung vagn, samma kraft ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 260;

    T.tanke(T.figurBubble(292, [
      [['Ritar de två vagnarna. Den']],
      [['andra är dubbelt så tung.']]
    ], 320));
    T.line([90, yG], [410, yG]);
    T.hatch([410, yG], [90, yG], 13);
    vagn(T, 110, 170, yG, 28, 7);
    T.pause(150);
    vagn(T, 260, 340, yG, 42, 7);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Båda puttas med samma kraft, så']],
      [['pilarna är lika långa.']]
    ], 320));
    T.arrow([170, yG - 28], [214, yG - 28], BLUE);
    T.lbl('F', 222, yG - 22, BLUE);
    T.pause(150);
    T.arrow([340, yG - 35], [384, yG - 35], BLUE);
    T.lbl('F', 392, yG - 29, BLUE);
    T.pause(150);
    T.lbl('m', 134, yG - 22, BLUE);
    T.lbl('a_1=2,0 m/s^2', 96, yG - 58, BLUE);
    T.pause(150);
    T.lbl('2·m', 284, yG - 28, BLUE);
    T.lbl('a_2', 290, yG - 72, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Med Newtons andra lag är accele-']],
      [['rationen kraften delad med']],
      [['massan. Det gäller den tomma']],
      [['vagnen.']]
    ]));
    T.str('Newtons andra lag för den tomma vagnen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.str('=2,0 m/s^2',
          T.fracH('F', 'm', T.str('a_1=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Den tunga vagnen har massan 2·m']],
      [['men samma kraft. Tvåan i nämnaren']],
      [['bryter jag ut som en halv.']]
    ]));
    T.str('Newtons andra lag för den tunga vagnen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var x = T.fracH('F', '2·m', T.str('a_2=', padL, y), y);
    x = T.str('=', x + 0.15 * F, y);
    x = T.fracH('1', '2', x, y);
    x = T.str('·', x + 0.1 * F, y);
    T.fracH('F', 'm', x, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['F delat med m är den tomma']],
      [['vagnens acceleration, 2,0 m/s².']]
    ]));
    x = T.fracH('2,0', '2', T.str('a_2=', padL, y), y);
    T.str('=1,0 m/s^2', x + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Dubbel massa ger halva accele-']],
      [['rationen. Den tunga vagnen är']],
      [['trögare. Rimligt! Det är det']],
      [['tredje alternativet, C.']]
    ]));
    T.underline(T.str('Svar: Alternativ C', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: lådan som dras mot friktion ---- */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250, bx0 = 210, bx1 = 280, h = 54;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan på golvet. Den dras']],
      [['åt höger.']]
    ], 300));
    T.line([100, yG], [410, yG]);
    T.hatch([410, yG], [100, yG], 12);
    T.rect(bx0, yG - h, bx1, yG);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Dragkraften verkar framåt och']],
      [['friktionen bakåt. Pilarna ritas']],
      [['skalenligt.']]
    ], 300));
    /* 2 px/N → 100 px och 36 px */
    T.arrow([bx1, yG - h / 2], [bx1 + 100, yG - h / 2], BLUE);
    T.lbl('F_d_r_a_g=50 N', bx1 + 8, yG - h / 2 - 14, BLUE);
    T.pause(150);
    T.arrow([bx0, yG - 3], [bx0 - 36, yG - 3], BLUE);
    T.lbl('F_f=18 N', bx0 - 36 - 104, yG - 9, BLUE);
    T.pause(150);
    T.lbl('m=8,0 kg', bx0, yG - h - 16, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen söks. Jag löser']],
      [['ut den ur Newtons andra lag.']]
    ]));
    y = formelA(T, F, y, 'Newtons andra lag');

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Den resulterande kraften är inte']],
      [['given. Den är dragkraften minus']],
      [['friktionen.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_R=F_d_r_a_g-F_f=50 N-18 N=32 N', 'm=8,0 kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    T.str('=4,0 m/s^2',
          T.fracH('32', '8,0', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Utan friktion hade den blivit']],
      [['drygt 6 m/s². Friktionen tar en']],
      [['bit av den. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 4,0 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 8: genomsnittliga resulterande kraften på bilen ---- */
  reg(8, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var vy = 200;

    T.tanke(T.figurBubble(292, [
      [['Ritar bilen som accelererar från']],
      [['stillastående åt höger.']]
    ], 300));
    T.line([100, vy + 30], [410, vy + 30]);
    T.hatch([410, vy + 30], [100, vy + 30], 13);
    T.rect(170, vy - 10, 270, vy + 16);
    T.line([192, vy - 10], [208, vy - 32]);
    T.line([248, vy - 10], [234, vy - 32]);
    T.line([208, vy - 32], [234, vy - 32]);
    T.circle(192, vy + 21, 9);
    T.circle(248, vy + 21, 9);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan, farten och']],
      [['tiden. Den resulterande kraften']],
      [['är det jag söker.']]
    ], 300));
    T.dashArrow([270, vy + 3], [330, vy + 3], BLUE);
    T.lbl('F_R', 338, vy + 9, BLUE);
    T.pause(150);
    T.lbl('m=1 200 kg', 100, vy - 50, BLUE);
    T.pause(150);
    T.lbl('v_0=0', 104, vy - 8, BLUE);
    T.lbl('v=90 km/h', 290, vy - 22, BLUE);
    T.lbl('Δt=12 s', 170, vy + 62, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den resulterande kraften är']],
      [['massan gånger accelerationen.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen är inte given. Jag']],
      [['räknar ut den i klammern. 90 km/h']],
      [['delat med 3,6 blir 25 m/s.']]
    ]));
    var klam = valueBracket(T.acts, [
      'm=1 200 kg',
      ['a=', { frac: ['Δv', 'Δt'] }, '=', { frac: ['25 m/s', '12 s'] },
       '=2,083... m/s^2']
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    T.str('F_R=1 200·2,083...=2 500 N', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('=2,5 kN', padL + 30, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['2,5 kN är ungefär tyngden av']],
      [['250 kg. Rimligt för en bil som']],
      [['ska upp i 90 km/h på 12 s!']]
    ]));
    T.underline(T.str('Svar: 2,5 kN', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 9: motorbåten, kraften ur v–t-grafen ---- */
  reg(9, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ox = 120, oy = 262, sx = 20, sy = 11;
    function P(t, v) { return [ox + t * sx, oy - v * sy]; }

    T.tanke(T.figurBubble(292, [
      [['Ritar av grafen: hastigheten']],
      [['ökar jämnt i 8 s och är sedan']],
      [['konstant.']]
    ], 330));
    T.arrow([ox, oy], [ox + 13 * sx, oy]);
    T.arrow([ox, oy], [ox, oy - 13.2 * sy]);
    var i;
    for (i = 2; i <= 12; i += 2) {
      T.line([ox + i * sx, oy - 3], [ox + i * sx, oy + 3]);
      T.line([ox - 3, oy - i * sy], [ox + 3, oy - i * sy]);
    }
    T.lbl('t (s)', ox + 13 * sx - 10, oy - 10);
    T.lbl('v (m/s)', ox + 8, oy - 13.2 * sy + 6);
    T.pause(120);
    for (i = 0; i <= 12; i += 4) {
      T.lbl(String(i), ox + i * sx - (i < 10 ? 4 : 8), oy + 22, null, 0.45);
    }
    T.lbl('10', ox - 26, oy - 10 * sy + 5, null, 0.45);
    T.pause(150);
    T.line(P(0, 0), P(8, 10));
    T.line(P(8, 10), P(12, 10));
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Läser av ändringen i hastighet']],
      [['och tiden den tar. Massan']],
      [['skriver jag också in.']]
    ], 330));
    T.dash(P(0, 10), P(8, 10), BLUE);
    T.dash(P(8, 10), P(8, 0), BLUE);
    T.lbl('Δv=10 m/s', ox + 8 * sx + 8, oy - 4 * sy, BLUE);
    T.pause(150);
    T.lbl('Δt=8,0 s', ox + 2 * sx, oy + 44, BLUE);
    T.pause(150);
    T.lbl('m=750 kg', ox + 9 * sx, oy - 13 * sy, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den resulterande kraften är']],
      [['massan gånger accelerationen.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen är grafens']],
      [['lutning de första 8 sekunderna.']],
      [['Jag räknar ut den i klammern.']]
    ]));
    var klam = valueBracket(T.acts, [
      'm=750 kg',
      ['a=', { frac: ['Δv', 'Δt'] }, '=', { frac: ['10 m/s', '8,0 s'] },
       '=1,25 m/s^2']
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    var xIns = T.str('F_R=750·1,25=937,5 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Tiden']],
      [['8,0 s har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈940 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Knappt en kilonewton för att']],
      [['få upp en båt på 750 kg i']],
      [['10 m/s på 8 s. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 940 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 10: delfinens bromskraft ---- */
  reg(10, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var cy = 210;

    T.tanke(T.figurBubble(292, [
      [['Ritar delfinen som simmar åt']],
      [['höger och saktar in.']]
    ], 320));
    /* kroppen: övre och undre profil från nos (x 320) till stjärt (x 150) */
    var top = [], bot = [], k;
    for (k = 0; k <= 16; k++) {
      var u = k / 16, x = 320 - 170 * u;
      var t = Math.sin(Math.PI * Math.pow(u, 0.8));
      top.push([x, cy - 3 - 20 * t]);
      bot.push([x, cy + 3 + 13 * t]);
    }
    kurva(T, top);
    kurva(T, bot);
    T.line([320, cy - 3], [332, cy]);                    /* nosen */
    T.line([320, cy + 3], [332, cy]);
    T.pause(120);
    T.line([150, cy - 3], [128, cy - 20]);               /* stjärtfenan */
    T.line([150, cy + 3], [128, cy + 20]);
    T.line([128, cy - 20], [140, cy]);
    T.line([128, cy + 20], [140, cy]);
    T.line([250, cy - 21], [232, cy - 40]);              /* ryggfenan */
    T.line([232, cy - 40], [222, cy - 20]);
    T.circle(306, cy - 6, 2);                            /* ögat */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in farterna, tiden och']],
      [['massan. Den resulterande kraften']],
      [['bromsar, så den pekar bakåt.']]
    ], 320));
    T.arrow([332, cy], [380, cy], BLUE);
    T.lbl('v_0=12 m/s', 340, cy - 14, BLUE);
    T.lbl('v=7,5 m/s', 340, cy + 28, BLUE);
    T.pause(150);
    T.dashArrow([128, cy], [80, cy], BLUE);
    T.lbl('F_R', 80, cy - 14, BLUE);
    T.pause(150);
    T.lbl('m=150 kg', 196, cy - 58, BLUE);
    T.lbl('Δt=2,3 s', 196, cy + 52, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den resulterande kraften är']],
      [['massan gånger accelerationen.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen är fartminskningen']],
      [['delad med tiden. Jag räknar med']],
      [['beloppet, riktningen är bakåt.']]
    ]));
    var klam = valueBracket(T.acts, [
      'm=150 kg',
      ['a=', { frac: ['Δv', 'Δt'] }, '=',
       { frac: ['12 m/s-7,5 m/s', '2,3 s'] }, '=1,956... m/s^2']
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    var xIns = T.str('F_R=150·1,956...=293,478... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Tiden']],
      [['2,3 s har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈290 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ungefär tyngden av 30 kg. Vattnet']],
      [['bromsar en stor delfin lagom']],
      [['mjukt. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 290 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 11: två lådor med snöre, accelerationen och F_S ---- */
  reg(11, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250, b0 = 130, b1 = 186, a0 = 250, a1 = 320, ys = yG - 22;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådorna på bordet. Snöret']],
      [['går från B till A, och A dras']],
      [['åt höger.']]
    ], 320));
    T.line([90, yG], [410, yG]);
    T.hatch([410, yG], [90, yG], 13);
    T.rect(b0, yG - 44, b1, yG);
    T.rect(a0, yG - 56, a1, yG);
    T.line([b1, ys], [a0, ys]);                           /* snöret */
    T.lbl('B', (b0 + b1) / 2 - 6, yG - 16);
    T.lbl('A', (a0 + a1) / 2 - 6, yG - 16);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Snöret drar B framåt med spänn-']],
      [['kraften. Pilarna ritas skalen-']],
      [['ligt: 15 N mot 6,0 N.']]
    ], 320));
    /* 4 px/N → 60 px och 24 px */
    T.arrow([a1, yG - 28], [a1 + 60, yG - 28], BLUE);
    T.lbl('F=15 N', a1 + 66, yG - 22, BLUE);
    T.pause(150);
    T.arrow([b1, ys], [b1 + 24, ys], BLUE);
    T.lbl('F_S', b1 + 8, ys - 12, BLUE);
    T.pause(150);
    T.lbl('m_B=2,0 kg', b0 - 14, yG - 62, BLUE);
    T.lbl('m_A=3,0 kg', a0, yG - 74, BLUE);
    T.stepEnd();

    /* ---- a) accelerationen ---- */
    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Lådorna rör sig tillsammans.']],
      [['Snörets kraft verkar inom']],
      [['systemet, så bara F drar hela']],
      [['massan framåt.']]
    ]));
    T.str('a) Newtons andra lag för båda lådorna tillsammans',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F', 'm_A+m_B', T.str('F=(m_A+m_B)·a⟺a=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Alla tre värdena är givna.']]
    ]));
    var klam = valueBracket(T.acts, ['F=15 N', 'm_A=3,0 kg', 'm_B=2,0 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    var x = T.fracH('15', '3,0+2,0', T.str('a=', padL, y), y);
    x = T.str('=', x + 0.15 * F, y);
    x = T.fracH('15', '5,0', x, y);
    T.str('=3,0 m/s^2', x + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['15 N på 5 kg ger 3 m/s². Bordet']],
      [['saknar friktion, så inget bromsar.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 3,0 m/s^2', padL, y), y);
    T.stepEnd();

    /* ---- b) spännkraften ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Låda B dras bara av snöret.']],
      [['Spännkraften är alltså den']],
      [['resulterande kraften på B.']]
    ]));
    T.str('b) Newtons andra lag för låda B ensam', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_S=m_B·a', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen är densamma som']],
      [['för hela systemet, från a).']]
    ]));
    klam = valueBracket(T.acts, ['m_B=2,0 kg', 'a=3,0 m/s^2 (från a)'],
                        padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    nuSatter(T, F, y, bw);
    T.str('F_S=2,0·3,0=6,0 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['B har två femtedelar av massan']],
      [['och får två femtedelar av de']],
      [['15 N. Det blir 6 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 6,0 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 12: bogserlinan, största acceleration och drivkraft ---- */
  reg(12, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250, h0 = 96, h1 = 196, c0 = 236, c1 = 336, yl = yG - 30;

    T.tanke(T.figurBubble(292, [
      [['Ritar bilen som drar husvagnen']],
      [['med bogserlinan.']]
    ], 320));
    T.line([80, yG], [410, yG]);
    T.hatch([410, yG], [80, yG], 13);
    T.rect(h0, yG - 64, h1, yG - 16);                     /* husvagnen */
    T.circle((h0 + h1) / 2, yG - 8, 8);
    T.pause(120);
    T.rect(c0, yG - 44, c1, yG - 16);                     /* bilen */
    T.line([c0 + 24, yG - 44], [c0 + 34, yG - 62]);
    T.line([c1 - 20, yG - 44], [c1 - 30, yG - 62]);
    T.line([c0 + 34, yG - 62], [c1 - 30, yG - 62]);
    T.circle(c0 + 22, yG - 8, 8);
    T.circle(c1 - 22, yG - 8, 8);
    T.pause(120);
    T.line([h1, yl], [c0, yl]);                           /* linan */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Linan drar husvagnen framåt med']],
      [['spännkraften. Bilens drivkraft']],
      [['drar hela ekipaget.']]
    ], 320));
    /* 0,03 px/N → 81 px och 33 px */
    T.arrow([c1, yG - 30], [c1 + 81, yG - 30], BLUE);
    T.lbl('F', c1 + 88, yG - 24, BLUE);
    T.pause(150);
    T.arrow([h1, yl], [h1 + 33, yl], BLUE);
    T.lbl('F_S', h1 + 4, yl - 10, BLUE);
    T.pause(150);
    T.lbl('m_h_u_s_v_a_g_n=900 kg', h0 - 20, yG - 80, BLUE);
    T.lbl('m_b_i_l=1 300 kg', c0 + 30, yG - 98, BLUE);
    T.stepEnd();

    /* ---- a) största accelerationen ---- */
    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Linan är den enda kraften som']],
      [['drar husvagnen framåt. Den ger']],
      [['husvagnen dess acceleration.']]
    ]));
    T.str('a) Newtons andra lag för husvagnen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F_S', 'm_h_u_s_v_a_g_n',
            T.str('F_S=m_h_u_s_v_a_g_n·a⟺a=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen blir störst när']],
      [['linan drar så hårt den tål.']]
    ]));
    var klam = valueBracket(T.acts, ['F_S=1 100 N', 'm_h_u_s_v_a_g_n=900 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    nuSatter(T, F, y, bw);
    var xIns = T.str('=1,222... m/s^2',
          T.fracH('1 100', '900', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Avrundar svaret till två värde-']],
      [['siffror, men räknar vidare med']],
      [['det oavrundade värdet i b).']]
    ]));
    y = avr(T, F, xIns, y, '≈1,2 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En lugn start, som när man kör']],
      [['försiktigt med släp. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,2 m/s^2', padL, y), y);
    T.stepEnd();

    /* ---- b) drivkraften ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Drivkraften accelererar både bilen']],
      [['och husvagnen. Linans kraft verkar']],
      [['inom ekipaget.']]
    ]));
    T.str('b) Newtons andra lag för hela ekipaget', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F=(m_b_i_l+m_h_u_s_v_a_g_n)·a', padL, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen tar jag']],
      [['oavrundad från a).']]
    ]));
    klam = valueBracket(T.acts, [
      'm_b_i_l=1 300 kg', 'm_h_u_s_v_a_g_n=900 kg', 'a=1,222... m/s^2 (från a)'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    nuSatter(T, F, y, bw);
    T.str('F=(1 300+900)·1,222...', padL, y);
    y += 2.1 * F;
    xIns = T.str('=2 688,8... N', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag, till två']],
      [['värdesiffror som i a).']]
    ]));
    y = avr(T, F, xIns, y, '≈2 700 N');
    T.stepEnd();

    y += 2.1 * F;
    T.str('=2,7 kN', padL + 30, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mer än dubbla linans kraft,']],
      [['eftersom drivkraften också ska']],
      [['accelerera bilen. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 2,7 kN', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

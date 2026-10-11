/* ovningar-penna/fy1-3.5.js: pennlösningar till övningarna i fy1-3.5
 * Gravitationslagen.
 *
 * En scen per övning, registrerad som "ov-fy1-3.5-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 1,1·10^−8 N".
 * Beteckningarna följer teorigenomgången: F_G, G, m_1, m_2, r och m_j.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.5-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;
  var rotFrac = V.rotFrac;
  var GVAL = 'G=6,67·10^−^1^1 Nm^2/kg^2';
  var GINS = '6,67·10^−^1^1·';

  function reg(nr, fn) { HK.registrera('ov-fy1-3.5-u' + nr, fn); }

  /* dividera bort en gemensam faktor: snett blått streck genom tecknet */
  function stryk(T, F, x0, w, yb) {
    T.line([x0 - 0.16 * F, yb + 0.32 * F],
           [x0 + w + 0.16 * F, yb - 0.68 * F], BLUE);
  }
  /* täljarens vänsterkant och baslinje i ett fracH-bråk (se physTools) */
  function taljX(T, F, numS, denS, x0) {
    var nw = T.adv(numS), dw = T.adv(denS);
    return x0 + (Math.max(nw, dw) + 0.3 * F - nw) / 2;
  }
  function taljY(F, numS, yb) {
    return yb - 0.34 * F + (/[gyjp]/.test(numS) ? -0.36 : -0.14) * F;
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
  /* två klot med prick i tyngdpunkten, måttlinjen r under dem */
  function tvaKlot(T, x1, r1, x2, r2, y, yMatt) {
    T.circle(x1, y, r1);
    T.circle(x2, y, r2);
    T.dot(x1, y);
    T.dot(x2, y);
    T.pause(150);
    T.dash([x1, y + 4], [x1, yMatt + 8]);
    T.dash([x2, y + 4], [x2, yMatt + 8]);
  }
  /* gravitationskrafterna: lika långa pilar från tyngdpunkterna mot
   * varandra (ömsesidig attraktion, Newtons tredje lag) */
  function dragPilar(T, x1, x2, y, L, etikett) {
    T.arrow([x1, y], [x1 + L, y], BLUE);
    T.lbl(etikett, x1 + L - 6, y - 14, BLUE);
    T.pause(150);
    T.arrow([x2, y], [x2 - L, y], BLUE);
    T.lbl(etikett, x2 - L - 22, y - 14, BLUE);
  }
  /* rubrik + Newtons gravitationslag */
  function gravLag(T, F, y, rubrik) {
    T.str(rubrik, T.padL, y, null, 0.62);
    T.pause(300);
    y += 2.35 * F;
    T.fracH('m_1·m_2', 'r^2', T.str('F_G=G·', T.padL, y), y);
    return y;
  }

  /* ---- Uppgift 1: kraften mellan två kulor ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar de två kulorna. Avståndet']],
      [['mäts mellan tyngdpunkterna.']]
    ], 300));
    tvaKlot(T, 170, 22, 330, 27, 200, 252);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kulorna drar i varandra lika']],
      [['mycket, åt var sitt håll. Skriver']],
      [['in massorna och avståndet.']]
    ], 300));
    dragPilar(T, 170, 330, 200, 46, 'F_G');
    T.pause(150);
    T.dblArrow([170, 252], [330, 252], BLUE);
    T.lbl('r=0,50 m', 206, 280, BLUE);
    T.pause(150);
    T.lbl('m_1=5,0 kg', 110, 158, BLUE);
    T.lbl('m_2=8,0 kg', 290, 152, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Gravitationslagen ger kraften']],
      [['mellan två massor.']]
    ]));
    y = gravLag(T, F, y, 'Newtons gravitationslag');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['G står i formelsamlingen.']],
      [['Massorna och avståndet är']],
      [['givna.']]
    ]));
    var klam = valueBracket(T.acts, [GVAL, 'm_1=5,0 kg', 'm_2=8,0 kg',
                                     'r=0,50 m'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('5,0·8,0', '0,50^2', T.str('F_G=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Räknar ut bråket först: 40']],
      [['delat med 0,25 är 160.']]
    ]));
    var xIns = T.str('=' + GINS + '160=1,0672·10^−^8 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massorna']],
      [['och avståndet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,1·10^−^8 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Det är lika mycket som tyngden']],
      [['av ett mikrogram. Mellan']],
      [['vardagsföremål är gravitationen']],
      [['mycket svag. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,1·10^−^8 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: kraften mellan två satelliter ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var sy = 210;

    function satellit(cx) {
      T.rect(cx - 15, sy - 12, cx + 15, sy + 12);
      T.line([cx - 15, sy], [cx - 26, sy]);
      T.rect(cx - 56, sy - 9, cx - 26, sy + 9);
      T.line([cx + 15, sy], [cx + 26, sy]);
      T.rect(cx + 26, sy - 9, cx + 56, sy + 9);
      T.dot(cx, sy);
    }

    T.tanke(T.figurBubble(292, [
      [['Ritar de två satelliterna. Avståndet']],
      [['mäts mellan tyngdpunkterna.']]
    ], 300));
    satellit(160);
    T.pause(150);
    satellit(350);
    T.pause(150);
    T.dash([160, sy + 14], [160, sy + 50]);
    T.dash([350, sy + 14], [350, sy + 50]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massorna och']],
      [['avståndet. Kraften är det']],
      [['jag söker.']]
    ], 300));
    T.dblArrow([160, sy + 44], [350, sy + 44], BLUE);
    T.lbl('r=100 m', 220, sy + 72, BLUE);
    T.pause(150);
    T.lbl('m_1=500 kg', 100, sy - 36, BLUE);
    T.lbl('m_2=500 kg', 290, sy - 36, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Gravitationslagen ger kraften']],
      [['mellan två massor.']]
    ]));
    y = gravLag(T, F, y, 'Newtons gravitationslag');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['G står i formelsamlingen.']],
      [['Massorna och avståndet är']],
      [['givna.']]
    ]));
    var klam = valueBracket(T.acts, [GVAL, 'm_1=500 kg', 'm_2=500 kg',
                                     'r=100 m'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('500·500', '100^2', T.str('F_G=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Räknar ut bråket först:']],
      [['250 000 delat med 10 000 är 25.']]
    ]));
    var xIns = T.str('=' + GINS + '25=1,6675·10^−^9 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Jag']],
      [['svarar med två värdesiffror,']],
      [['som i massorna och avståndet.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,7·10^−^9 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En försvinnande liten kraft,']],
      [['trots att satelliterna är tunga.']],
      [['Avståndet står i kvadrat och']],
      [['gör kraften liten. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,7·10^−^9 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: vad konstanten G anger (flerval) ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar två föremål med massa.']],
      [['De drar i varandra med']],
      [['gravitationskraften.']]
    ], 300));
    tvaKlot(T, 170, 22, 330, 27, 200, 252);
    T.pause(150);
    dragPilar(T, 170, 330, 200, 46, 'F_G');
    T.pause(150);
    T.dblArrow([170, 252], [330, 252], BLUE);
    T.lbl('r', 244, 280, BLUE);
    T.lbl('m_1', 150, 160, BLUE);
    T.lbl('m_2', 310, 154, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Konstanten G står i gravitations-']],
      [['lagen, tillsammans med massorna']],
      [['och avståndet.']]
    ]));
    y = gravLag(T, F, y, 'Newtons gravitationslag');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['G bestämmer hur stark gravitationen']],
      [['är. Den har samma värde överallt']],
      [['i universum.']]
    ]));
    T.str('Gravitationskonstanten', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str(GVAL, padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdfaktorn är en annan storhet.']],
      [['Den skrivs med litet g och gäller']],
      [['vid jordytan. A är alltså fel.']]
    ]));
    T.str('Tyngdfaktorn, med litet g', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('g=9,82 N/kg', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['C beskriver enheten newton, och']],
      [['D handlar om en fart. Bara B']],
      [['beskriver G. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: kraften mellan jorden och månen ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ey = 200;

    T.tanke(T.figurBubble(292, [
      [['Ritar jorden och månen. Avståndet']],
      [['mäts mellan deras medelpunkter.']]
    ], 320));
    T.circle(150, ey, 52);
    T.dot(150, ey);
    T.pause(150);
    T.circle(370, ey, 14);
    T.dot(370, ey);
    T.pause(150);
    T.dash([150, ey + 4], [150, ey + 78]);
    T.dash([370, ey + 4], [370, ey + 78]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massorna och']],
      [['avståndet. Kraften är det']],
      [['jag söker.']]
    ], 320));
    T.dblArrow([150, ey + 72], [370, ey + 72], BLUE);
    T.lbl('r=3,84·10^8 m', 206, ey + 100, BLUE);
    T.pause(150);
    T.lbl('m_1=5,972·10^2^4 kg', 80, ey - 70, BLUE);
    T.lbl('m_2=7,35·10^2^2 kg', 300, ey - 26, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Gravitationslagen gäller också']],
      [['mellan himlakroppar.']]
    ]));
    y = gravLag(T, F, y, 'Newtons gravitationslag');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['m_1 är jordens massa och m_2']],
      [['är månens. Alla värden är givna.']]
    ]));
    var klam = valueBracket(T.acts, [GVAL,
      'm_1=5,972·10^2^4 kg (jorden)', 'm_2=7,35·10^2^2 kg (månen)',
      'r=3,84·10^8 m'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('5,972·10^2^4·7,35·10^2^2', '(3,84·10^8)^2',
            T.str('F_G=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var xIns = T.str('=1,9855...·10^2^0 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. G,']],
      [['månens massa och avståndet']],
      [['har tre värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,99·10^2^0 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En jättekraft, men massorna är']],
      [['också jättelika. Den håller kvar']],
      [['månen i sin bana. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,99·10^2^0 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: kraften mellan två supertankrar ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var wy = 222;

    function fartyg(cx) {
      T.line([cx - 62, wy - 14], [cx + 62, wy - 14]);
      T.line([cx + 62, wy - 14], [cx + 50, wy + 12]);
      T.line([cx + 50, wy + 12], [cx - 54, wy + 12]);
      T.line([cx - 54, wy + 12], [cx - 62, wy - 14]);
      T.rect(cx - 52, wy - 34, cx - 30, wy - 14);           /* bryggan */
      T.dot(cx, wy);
    }

    T.tanke(T.figurBubble(292, [
      [['Ritar de två fartygen bredvid']],
      [['varandra vid kajen.']]
    ], 320));
    T.line([90, wy], [100, wy]);
    fartyg(160);
    T.pause(150);
    fartyg(350);
    T.pause(150);
    T.line([222, wy], [288, wy]);                            /* vattenytan */
    T.line([412, wy], [420, wy]);
    T.pause(150);
    T.dash([160, wy + 14], [160, wy + 62]);
    T.dash([350, wy + 14], [350, wy + 62]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massorna och']],
      [['avståndet mellan tyngdpunkterna.']]
    ], 320));
    T.dblArrow([160, wy + 56], [350, wy + 56], BLUE);
    T.lbl('r=100 m', 220, wy + 84, BLUE);
    T.pause(150);
    T.lbl('m_1=1,5·10^8 kg', 96, wy - 52, BLUE);
    T.lbl('m_2=1,5·10^8 kg', 286, wy - 52, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Gravitationslagen ger kraften']],
      [['mellan två massor.']]
    ]));
    y = gravLag(T, F, y, 'Newtons gravitationslag');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Fartygen har samma massa.']],
      [['G står i formelsamlingen.']]
    ]));
    var klam = valueBracket(T.acts, [GVAL, 'm_1=m_2=1,5·10^8 kg',
                                     'r=100 m'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('(1,5·10^8)^2', '100^2', T.str('F_G=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var xIns = T.str('=150,075 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈150 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ungefär tyngden av en resväska']],
      [['på 15 kg. Det krävs enorma']],
      [['massor för att komma dit.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 150 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: avståndet fördubblas (flerval) ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var y1 = 150, y2 = 240;

    function sond(cx, cy) {
      T.rect(cx - 10, cy - 10, cx + 10, cy + 10);
      T.line([cx, cy - 10], [cx, cy - 20]);
    }

    T.tanke(T.figurBubble(292, [
      [['Ritar sonderna först på avståndet']],
      [['r och sedan på dubbla avståndet.']]
    ], 320));
    sond(130, y1);
    sond(230, y1);
    T.pause(150);
    sond(130, y2);
    sond(330, y2);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Avstånden mäts mellan']],
      [['sondernas tyngdpunkter.']]
    ], 320));
    T.dblArrow([130, y1 + 26], [230, y1 + 26], BLUE);
    T.lbl('r', 176, y1 + 52, BLUE);
    T.pause(150);
    T.dblArrow([130, y2 + 26], [330, y2 + 26], BLUE);
    T.lbl('2·r', 214, y2 + 52, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Gravitationslagen visar hur']],
      [['kraften beror på avståndet.']]
    ]));
    y = gravLag(T, F, y, 'Newtons gravitationslag');
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Avståndet fördubblas. Jag byter']],
      [['r mot 2·r i formeln. Massorna']],
      [['är desamma som förut.']]
    ]));
    T.str('Dubbla avståndet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.35 * F;
    var xa = T.fracH('m_1·m_2', '(2·r)^2', T.str('F_n_y=G·', padL, y), y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 1.2 * F), bw, [
      [['Både tvåan och r kvadreras.']],
      [['Nämnaren blir fyra gånger så']],
      [['stor.']]
    ]));
    T.fracH('m_1·m_2', '4·r^2', T.str('=G·', xa + 0.15 * F, y), y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Fyran i nämnaren bryter jag ut.']],
      [['Det som står kvar är den gamla']],
      [['kraften, delad med 4.']]
    ]));
    var xb = T.fracH('1', '4', T.str('F_n_y=', padL, y), y);
    xb = T.fracH('m_1·m_2', 'r^2', T.str('·G·', xb + 0.1 * F, y), y);
    T.fracH('F_G', '4', T.str('=', xb + 0.15 * F, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Kraften minskar till en fjärdedel,']],
      [['inte till hälften. Avståndet']],
      [['står ju i kvadrat. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: massan hos två lika kulor ---- */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar de två kulorna. De har']],
      [['samma massa m.']]
    ], 300));
    tvaKlot(T, 180, 24, 320, 24, 200, 252);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in kraften och avståndet.']],
      [['Massan är det jag söker.']]
    ], 300));
    dragPilar(T, 180, 320, 200, 40, 'F_G');
    T.pause(150);
    T.dblArrow([180, 252], [320, 252], BLUE);
    T.lbl('r=0,25 m', 206, 280, BLUE);
    T.pause(150);
    T.lbl('m', 172, 162, BLUE);
    T.lbl('m', 312, 162, BLUE);
    T.lbl('F_G=4,0·10^−^8 N', 70, 128, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Båda kulorna har massan m.']],
      [['Produkten m·m skrivs som m']],
      [['i kvadrat.']]
    ]));
    T.str('Gravitationslagen med två lika massor', padL, y, null, 0.62);
    T.pause(300);
    y += 2.35 * F;
    var xa = T.fracH('m·m', 'r^2', T.str('F_G=G·', padL, y), y);
    T.fracH('m^2', 'r^2', T.str('=G·', xa + 0.15 * F, y), y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Löser ut m i kvadrat. Jag']],
      [['multiplicerar med r i kvadrat']],
      [['och delar med G.']]
    ]));
    T.fracH('F_G·r^2', 'G', T.str('⟺m^2=', padL, y), y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Massan är roten ur m i kvadrat.']],
      [['En massa är alltid positiv.']]
    ]));
    rotFrac(T, F, 'F_G·r^2', 'G', T.str('⟺m=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['F_G=4,0·10^−^8 N', 'r=0,25 m', GVAL],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    rotFrac(T, F, '4,0·10^−^8·0,25^2', '6,67·10^−^1^1',
            T.str('m=', padL, y), y);
    T.stepEnd();

    y += adv + 2.0 * F;
    var xIns = T.str('=6,122... kg', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Kraften']],
      [['och avståndet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈6,1 kg');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ungefär lika tungt som en kula']],
      [['i kulstötning. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 6,1 kg', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 8: avståndet där tyngdkraften är 100 N ---- */
  reg(8, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ey = 220, ex = 150, px = 350;

    T.tanke(T.figurBubble(292, [
      [['Ritar jorden och personen långt']],
      [['ute i rymden. Avståndet räknas']],
      [['från jordens medelpunkt.']]
    ], 340));
    T.circle(ex, ey, 55);
    T.dot(ex, ey);
    T.pause(150);
    T.circle(px, ey - 30, 7);                               /* personen */
    T.line([px, ey - 23], [px, ey + 2]);
    T.line([px, ey - 16], [px - 10, ey - 6]);
    T.line([px, ey - 16], [px + 10, ey - 6]);
    T.line([px, ey + 2], [px - 8, ey + 18]);
    T.line([px, ey + 2], [px + 8, ey + 18]);
    T.pause(150);
    T.dash([ex, ey + 4], [ex, ey + 88]);
    T.dash([px, ey + 22], [px, ey + 88]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften drar personen mot']],
      [['jordens medelpunkt. Avståndet']],
      [['r är det jag söker.']]
    ], 340));
    T.dot(px, ey - 8);
    T.arrow([px, ey - 8], [px - 52, ey - 8], BLUE);
    T.lbl('F_G=100 N', 206, ey - 22, BLUE);
    T.pause(150);
    T.dblArrow([ex, ey + 82], [px, ey + 82], BLUE);
    T.lbl('r', 246, ey + 108, BLUE);
    T.pause(150);
    T.lbl('m_j=5,972·10^2^4 kg', 70, ey - 76, BLUE);
    T.lbl('m=70 kg', 318, ey - 50, BLUE);
    T.stepEnd();

    var y = 450;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Tyngdkraften på personen ges av']],
      [['gravitationslagen, med jordens']],
      [['massa och personens massa.']]
    ]));
    T.str('Newtons gravitationslag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.35 * F;
    T.fracH('m·m_j', 'r^2', T.str('F_G=G·', padL, y), y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Löser ut r i kvadrat. Jag']],
      [['multiplicerar med r i kvadrat']],
      [['och delar med F_G.']]
    ]));
    T.fracH('G·m·m_j', 'F_G', T.str('⟺r^2=', padL, y), y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Avståndet är roten ur r i']],
      [['kvadrat.']]
    ]));
    rotFrac(T, F, 'G·m·m_j', 'F_G', T.str('⟺r=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['F_G=100 N', 'm=70 kg',
      'm_j=5,972·10^2^4 kg', GVAL], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    rotFrac(T, F, GINS + '70·5,972·10^2^4', '100', T.str('r=', padL, y), y);
    T.stepEnd();

    y += adv + 2.0 * F;
    var xIns = T.str('=1,6698...·10^7 m', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['70 kg och kraften 100 N har']],
      [['två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,7·10^7 m');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vid jordytan väger personen']],
      [['nästan 690 N. Kraften 100 N']],
      [['kräver alltså ett större avstånd,']],
      [['cirka 2,6 jordradier. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,7·10^7 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 9: föräldern eller Mars? ---- */
  reg(9, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var gy = 250;

    T.tanke(T.figurBubble(292, [
      [['Ritar föräldern som står vid']],
      [['barnet i förlossningsrummet.']]
    ], 330));
    T.line([110, gy], [410, gy]);
    T.hatch([410, gy], [110, gy], 12);
    T.circle(170, gy - 106, 12);                            /* föräldern */
    T.line([170, gy - 94], [170, gy - 44]);
    T.line([170, gy - 82], [152, gy - 58]);
    T.line([170, gy - 82], [188, gy - 58]);
    T.line([170, gy - 44], [158, gy]);
    T.line([170, gy - 44], [182, gy]);
    T.dot(170, gy - 62);
    T.pause(150);
    T.rect(270, gy - 40, 350, gy);                          /* skötbordet */
    T.circle(302, gy - 48, 7);                              /* barnet */
    T.line([309, gy - 46], [330, gy - 44]);
    T.dot(316, gy - 46);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massorna och']],
      [['avståndet mellan tyngdpunkterna.']]
    ], 330));
    T.dash([170, gy - 58], [170, gy + 30]);
    T.dash([316, gy - 40], [316, gy + 30]);
    T.dblArrow([170, gy + 26], [316, gy + 26], BLUE);
    T.lbl('r=0,50 m', 196, gy + 54, BLUE);
    T.pause(150);
    T.lbl('m_1=80 kg', 90, gy - 132, BLUE);
    T.lbl('m_2=3,5 kg', 270, gy - 76, BLUE);
    T.stepEnd();

    /* ---- a) föräldern ---- */
    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Gravitationslagen ger kraften']],
      [['mellan föräldern och barnet.']]
    ]));
    y = gravLag(T, F, y, 'a) Gravitationslagen för föräldern och barnet');
    T.stepEnd();

    y += adv + 1.9 * F;
    var klam = valueBracket(T.acts, [GVAL, 'm_1=80 kg', 'm_2=3,5 kg',
                                     'r=0,50 m'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('80·3,5', '0,50^2', T.str('F_G=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var xIns = T.str('=7,4704·10^−^8 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Barnets']],
      [['massa och avståndet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈7,5·10^−^8 N');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En försvinnande liten kraft,']],
      [['som mellan andra vardags-']],
      [['föremål. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 7,5·10^−^8 N', padL, y), y);
    T.stepEnd();

    /* ---- b) Mars ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Samma lag, men nu är m_1 Mars']],
      [['massa och r avståndet till Mars.']]
    ]));
    T.str('b) Samma lag för Mars och barnet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    klam = valueBracket(T.acts, [GVAL, 'm_1=6,42·10^2^3 kg (Mars)',
                                 'm_2=3,5 kg', 'r=5,6·10^1^0 m'],
                        padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('6,42·10^2^3·3,5', '(5,6·10^1^0)^2',
            T.str('F_G=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    xIns = T.str('=4,779...·10^−^8 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Avrundar till två värdesiffror,']],
      [['som barnets massa och']],
      [['avståndet till Mars.']]
    ]));
    y = avr(T, F, xIns, y, '≈4,8·10^−^8 N');
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda krafterna har samma tio-']],
      [['potens, så jag jämför talen']],
      [['framför den.']]
    ]));
    T.str('Föräldern jämfört med Mars', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('7,5·10^−^8 N>4,8·10^−^8 N', padL, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mars är enormt tung, men så']],
      [['långt bort att avståndet i']],
      [['kvadrat vinner. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Föräldern drar hårdare än Mars', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 10: höjden där tyngdfaktorn är halverad ----
   * G och jordens massa divideras bort, så varken deras värden eller
   * en kvot med dubbelbråk behövs. */
  reg(10, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ex = 160, ey = 210, R = 80, h = 33;

    T.tanke(T.figurBubble(292, [
      [['Ritar jorden och en punkt på']],
      [['höjden h över ytan.']]
    ], 360));
    T.circle(ex, ey, R);
    T.dot(ex, ey);
    T.pause(150);
    T.rect(ex + R + h - 6, ey - 6, ex + R + h + 6, ey + 6);
    T.pause(150);
    T.dash([ex, ey + 4], [ex, ey + 112]);
    T.dash([ex + R, ey + 4], [ex + R, ey + 112]);
    T.dash([ex + R + h, ey + 8], [ex + R + h, ey + 112]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Avståndet till medelpunkten är']],
      [['r=R+h. Jordens radie är given.']]
    ], 360));
    T.dblArrow([ex, ey + 106], [ex + R, ey + 106], BLUE);
    T.lbl('R=6 371 km', ex + R / 2 - 66, ey + 134, BLUE);
    T.pause(150);
    T.dblArrow([ex + R, ey + 106], [ex + R + h, ey + 106], BLUE);
    T.lbl('h', ex + R + h / 2 - 5, ey + 94, BLUE);
    T.stepEnd();

    var y = 480;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Tyngdfaktorn på avståndet r']],
      [['från jordens medelpunkt kommer']],
      [['ur gravitationslagen.']]
    ]));
    T.str('Tyngdfaktorn ur gravitationslagen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.35 * F;
    T.fracH('m_j', 'r^2', T.str('g=G·', padL, y), y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['På höjden h är r=R+h. Där ska']],
      [['tyngdfaktorn vara hälften så']],
      [['stor som vid ytan, där r=R.']]
    ]));
    T.str('På höjden h är tyngdfaktorn hälften så stor', padL, y, null,
          0.62);
    T.pause(300);
    y += 2.35 * F;
    var xG1 = padL;
    var xF1 = T.str('G·', padL, y);
    var xa = T.fracH('m_j', '(R+h)^2', xF1, y);
    xa = T.fracH('1', '2', T.str('=', xa + 0.15 * F, y), y);
    var xG2 = xa + 0.1 * F + T.adv('·');
    var xF2 = T.str('·G·', xa + 0.1 * F, y);
    T.fracH('m_j', 'R^2', xF2, y);
    T.stepEnd();

    var yM = y;
    T.tanke(T.bubble(140, T.bubbleTop(yM + 1.2 * F, 1.2), bw, [
      [['G och m_j finns som faktorer i']],
      [['båda leden, så de kan divideras']],
      [['bort.']]
    ]));
    stryk(T, F, xG1, T.adv('G') - 1.5, yM);
    T.pause(200);
    stryk(T, F, xG2, T.adv('G') - 1.5, yM);
    T.pause(200);
    stryk(T, F, taljX(T, F, 'm_j', '(R+h)^2', xF1), T.adv('m_j') - 1.5,
          taljY(F, 'm_j', yM));
    T.pause(200);
    stryk(T, F, taljX(T, F, 'm_j', 'R^2', xF2), T.adv('m_j') - 1.5,
          taljY(F, 'm_j', yM));
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Kvar står två bråk med täljaren 1.']],
      [['De är lika när nämnarna är lika.']]
    ]));
    var xb = T.fracH('1', '(R+h)^2', padL, y);
    xb = T.fracH('1', '2·R^2', T.str('=', xb + 0.15 * F, y), y);
    T.str('⟺(R+h)^2=2·R^2', xb + 0.2 * F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Drar roten ur båda leden.']],
      [['Avstånden är positiva.']]
    ]));
    var xc = T.str('R+h=', padL, y);
    var wIn = T.adv('2·R^2');
    xc = V.rootSign(T.acts, xc, y, wIn, F,
                    { yTop: y - 1.62 * F, yBot: y + 0.36 * F });
    T.pause(150);
    xc = T.str('2·R^2', xc, y);
    T.str('=√2·R', xc + 0.3 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Drar bort R från båda leden så']],
      [['att h blir ensamt kvar.']]
    ]));
    var xd = T.str('R+h', padL, y);
    xd = T.str('-R', xd, y, BLUE);
    xd = T.str('=√2·R', xd, y);
    T.str('-R', xd, y, BLUE);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.str('h=√2·R-R', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Båda termerna innehåller R,']],
      [['så jag bryter ut det.']]
    ]));
    var xe = T.str('=R·(', padL + T.adv('h=√2·R-R') + 0.1 * F, y);
    T.pause(250);
    xe = T.str('√2', xe, y);
    T.pause(250);
    T.str('-1)', xe, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['R=6 371 km'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in radien. Svaret']],
      [['får jag direkt i kilometer.']]
    ]));
    var xIns = T.str('h=6 371·(√2-1)=2 638,95... km', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Radien']],
      [['har fyra värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2 639 km');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Knappt en halv jordradie upp.']],
      [['Avståndet växer bara 1,4 gånger,']],
      [['men det står i kvadrat. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 2 639 km', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 11: tyngdfaktorn vid Mars yta ---- */
  reg(11, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var mx = 200, my = 220, R = 70;

    T.tanke(T.figurBubble(292, [
      [['Ritar Mars med ett föremål på']],
      [['ytan. Avståndet räknas från']],
      [['planetens medelpunkt.']]
    ], 360));
    T.circle(mx, my, R);
    T.dot(mx, my);
    T.rect(mx + R, my - 11, mx + R + 22, my + 11);
    T.pause(150);
    T.line([mx, my], [mx + R, my]);
    T.pause(150);
    T.dash([mx, my + 4], [mx, my + R + 32]);
    T.dash([mx + R, my + 4], [mx + R, my + R + 32]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in Mars massa och']],
      [['radie. Föremålets massa m']],
      [['behöver jag inte veta.']]
    ], 360));
    T.lbl('m', mx + R + 28, my - 16, BLUE);
    T.pause(150);
    T.dblArrow([mx, my + R + 26], [mx + R, my + R + 26], BLUE);
    T.lbl('r=3 389 km', mx + R / 2 - 66, my + R + 54, BLUE);
    T.pause(150);
    T.lbl('m_M_a_r_s=6,39·10^2^3 kg', 60, my - R - 14, BLUE);
    T.stepEnd();

    var y = 490;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F, 1.2), bw, [
      [['Tyngdkraften på föremålet kan']],
      [['skrivas på två sätt: med tyngd-']],
      [['faktorn och med gravitationslagen.']],
      [['Det är samma kraft.']]
    ]));
    T.str('Samma tyngdkraft på två sätt', padL, y, null, 0.62);
    T.pause(300);
    y += 2.35 * F;
    var xg = T.str('m·g_M_a_r_s=G·', padL, y);
    T.fracH('m·m_M_a_r_s', 'r^2', xg, y);
    T.stepEnd();

    var yM = y;
    T.tanke(T.bubble(140, T.bubbleTop(yM + 1.2 * F, 1.2), bw, [
      [['Massan m finns som faktor i']],
      [['båda leden, så den kan']],
      [['divideras bort.']]
    ]));
    stryk(T, F, padL, T.adv('m') - 1.5, yM);
    T.pause(260);
    stryk(T, F, taljX(T, F, 'm·m_M_a_r_s', 'r^2', xg), T.adv('m') - 1.5,
          taljY(F, 'm·m_M_a_r_s', yM));
    T.stepEnd();

    y += adv + 2.4 * F;
    T.fracH('m_M_a_r_s', 'r^2', T.str('g_M_a_r_s=G·', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Kilometer görs om till meter.']]
    ]));
    var klam = valueBracket(T.acts, [GVAL, 'm_M_a_r_s=6,39·10^2^3 kg',
      'r=3 389 km=3,389·10^6 m'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.fracH('6,39·10^2^3', '(3,389·10^6)^2',
            T.str('g_M_a_r_s=' + GINS, padL, y), y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var xIns = T.str('=3,7109... N/kg', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. G och']],
      [['Mars massa har tre värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈3,71 N/kg');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Knappt 40 procent av jordens']],
      [['9,82 N/kg. Mars är mindre och']],
      [['lättare än jorden. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 3,71 N/kg', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

/* ovningar-penna/fy2-1.1.js: pennlösningar till övningarna i fy2-1.1
 * Kraftmoment (visas även som fy1-3.11 i Fysik nivå 1).
 *
 * En scen per övning, registrerad som "ov-fy2-1.1-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 4,5 Nm".
 * Momentlagen skrivs som i teorins pennscener (gungbrada, brada):
 * M↺ = M↻ med moturstermerna i vänster led, och hävarmen bär kraftens
 * index (F_B ↔ l_B, F_G ↔ l_G). Hävarmarna ritas som måttlinjer i fri
 * yta, och kraftpilarna är skalenliga så att momenten balanserar.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy2-1.1-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy2-1.1-u' + nr, fn); }

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
  /* momentlagen M↺ = M↻ med orden moturs/medurs som tonar in under
   * pilarna (samma mönster som teorins gungbräda) */
  function momentlag(T, F, y) {
    var padL = T.padL, wM = T.adv('M');
    var noteMot = { note: 1, x: padL + wM / 2, y: y + 0.78 * F,
                    text: 'moturs', fs: 15, wins: [] };
    var xEq = T.str('M↺', padL, y);
    T.acts.push({ kind: 'show', obj: noteMot });
    T.pause(320);
    var x2 = T.str('=', xEq, y);
    var noteMed = { note: 1, x: x2 + wM / 2, y: y + 0.78 * F,
                    text: 'medurs', fs: 15, wins: [] };
    T.str('M↻', x2, y);
    T.acts.push({ kind: 'show', obj: noteMed });
    T.pause(420);
    T.stepEnd();
    T.acts.push({ kind: 'hide', obj: noteMot });
    T.acts.push({ kind: 'hide', obj: noteMed });
  }
  /* rotationspil (grafit) kring vridningspunkten, från vinkel a0 till a1
   * i grader (matematisk vinkel, y uppåt); pilspetsen sitter i a1 */
  function vridpil(T, cx, cy, r, a0, a1) {
    var pts = [], n = 10, i;
    for (i = 0; i <= n; i++) {
      var a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts });
    var tip = pts[n], prev = pts[n - 1];
    T.arrowHead(tip[0], tip[1], tip[0] + (prev[0] - tip[0]) * 3,
                tip[1] + (prev[1] - tip[1]) * 3, 9);
  }
  /* vinkelbåge (grafit) från a0 till a1 grader kring (cx, cy) */
  function vinkelbage(T, cx, cy, r, a0, a1) {
    var pts = [], n = 8, i;
    for (i = 0; i <= n; i++) {
      var a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts });
  }

  /* ---- Uppgift 1: kraftmomentet kring muttern ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var pX = 130, pY = 190, gX = 330;          /* mutter, greppet */

    T.tanke(T.figurBubble(292, [
      [['Ritar skiftnyckeln. Pricken i']],
      [['muttern är vridningspunkten.']]
    ], 300));
    T.circle(pX, pY, 16);
    T.dot(pX, pY);
    T.line([pX + 16, pY - 8], [gX + 44, pY - 8]);       /* skaftet */
    T.line([pX + 16, pY + 8], [gX + 44, pY + 8]);
    T.line([gX + 44, pY - 8], [gX + 44, pY + 8]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kraften drar rakt nedåt,']],
      [['vinkelrätt mot skaftet. Nyckeln']],
      [['vrider medurs.']]
    ], 300));
    T.arrow([gX, pY + 8], [gX, pY + 80], BLUE);
    T.lbl('F=25 N', gX + 12, pY + 74, BLUE);
    T.pause(200);
    vridpil(T, pX, pY, 30, 290, 200);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kraften är vinkelrät mot skaftet,']],
      [['så hävarmen är hela avståndet']],
      [['in till vridningspunkten.']]
    ], 300));
    T.dash([pX, pY - 20], [pX, pY - 46]);
    T.dash([gX, pY - 12], [gX, pY - 46]);
    T.pause(150);
    T.dblArrow([pX, pY - 40], [gX, pY - 40], BLUE);
    var wL = T.lblW('l=0,18 m');
    T.lbl('l=0,18 m', (pX + gX) / 2 - wL / 2, pY - 52, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Momentet är kraften gånger']],
      [['hävarmen.']]
    ]));
    T.str('Kraftmoment', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('M=F·l', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Båda värdena är givna.']],
      [['Jag samlar dem i klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['F=25 N', 'l=0,18 m'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('M=25·0,18=4,5 Nm', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['0,18 är knappt en femtedel, och']],
      [['en femtedel av 25 är 5. Momentet']],
      [['blir lite mindre än så. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 4,5 Nm', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: kraften ur kraftmomentet (dörr sedd uppifrån) ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var hX = 120, dY = 190, fX = 280, eX = 420;  /* gångjärn, kraft, dörrkant */

    T.tanke(T.figurBubble(292, [
      [['Ritar dörren sedd uppifrån.']],
      [['Pricken i gångjärnet är']],
      [['vridningspunkten.']]
    ], 300));
    T.line([50, dY - 7], [hX - 12, dY - 7]);             /* väggen */
    T.hatch([hX - 12, dY - 7], [50, dY - 7], 6);
    T.pause(120);
    T.rect(hX, dY - 6, eX, dY + 6);                       /* dörrbladet */
    T.circle(hX, dY, 8);
    T.dot(hX, dY);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kraften verkar vinkelrätt mot']],
      [['dörren och vrider den medurs.']],
      [['Kraften är det jag söker.']]
    ], 300));
    T.arrow([fX, dY + 6], [fX, dY + 76], BLUE);
    T.lbl('F', fX + 12, dY + 70, BLUE);
    T.pause(200);
    vridpil(T, hX, dY, 34, 290, 210);
    T.lbl('M=18 Nm', 40, dY + 64, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Hävarmen är avståndet från']],
      [['gångjärnet till kraften.']]
    ], 300));
    T.dash([hX, dY - 14], [hX, dY - 46]);
    T.dash([fX, dY - 10], [fX, dY - 46]);
    T.pause(150);
    T.dblArrow([hX, dY - 40], [fX, dY - 40], BLUE);
    var wL = T.lblW('l=0,30 m');
    T.lbl('l=0,30 m', (hX + fX) / 2 - wL / 2, dY - 52, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Kraften är okänd. Jag löser ut']],
      [['den ur formeln för kraftmoment']],
      [['genom att dela med hävarmen.']]
    ]));
    T.str('Kraft ur kraftmomentet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('M=F·l⟺F=', padL, y);
    T.fracH('M', 'l', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['M=18 Nm', 'l=0,30 m'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=60 N',
          T.fracH('18', '0,30', T.str('F=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['60 N är som att lyfta 6 kg. Så']],
      [['nära gångjärnet krävs en rejäl']],
      [['kraft. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 60 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: gungbrädan med barn och vuxen ----
   * 62,5 px/m: barnet 150 px till vänster, den vuxne 50 px till höger.
   * Pilarna 1,2 px/kg (30 och 90 px), så 25·150 = 75·50 i figuren. */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var pY = 150, pB = 158, pivX = 260, bX = 110, vX = 310, dimY = 266;

    T.tanke(T.figurBubble(272, [
      [['Ritar en figur. Pricken är']],
      [['vridningspunkten.']]
    ], 310));
    T.rect(70, pY, 400, pB);                               /* brädan */
    T.pause(120);
    T.line([pivX, pB], [pivX - 22, pB + 44]);              /* stödet */
    T.line([pivX - 22, pB + 44], [pivX + 22, pB + 44]);
    T.line([pivX + 22, pB + 44], [pivX, pB]);
    T.dot(pivX, pY + 4);
    T.pause(180);
    T.circle(bX, 109, 10);                                 /* barnet */
    T.line([bX, 119], [bX, 148]);
    T.line([bX, 126], [bX + 12, 146]);
    T.line([bX, 147], [bX + 14, 147]);
    T.line([bX + 14, 147], [bX + 15, 163]);
    var wB = T.lblW('m_B=25 kg');
    T.lbl('m_B=25 kg', bX - wB / 2, 88, BLUE);
    T.pause(150);
    T.circle(vX, 96, 13);                                  /* den vuxne */
    T.line([vX, 109], [vX, 148]);
    T.line([vX, 118], [vX - 15, 146]);
    T.line([vX, 147], [vX - 18, 147]);
    T.line([vX - 18, 147], [vX - 19, 168]);
    var wV = T.lblW('m_V=75 kg');
    T.lbl('m_V=75 kg', vX - wV / 2, 72, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(272, [
      [['Tyngdkrafterna vrider brädan åt']],
      [['varsitt håll. Den vuxne är tre']],
      [['gånger tyngre, så pilen ritas tre']],
      [['gånger så lång.']]
    ], 310));
    T.dot(bX, 148);
    T.arrow([bX, 148], [bX, 178], BLUE);
    T.lbl('F_B', bX - 10 - T.lblW('F_B'), 186, BLUE);
    T.pause(200);
    T.dot(vX, 148);
    T.arrow([vX, 148], [vX, 238], BLUE);
    T.lbl('F_V', vX + 12, 238, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(272, [
      [['Hävarmen är avståndet från']],
      [['vridningspunkten till kraftens']],
      [['riktningslinje.']]
    ], 310));
    T.dash([pivX, pB + 46], [pivX, dimY + 4]);
    T.dash([bX, 182], [bX, dimY + 4]);
    T.dash([vX, 242], [vX, dimY + 4]);
    T.pause(150);
    T.dblArrow([bX, dimY], [pivX, dimY], BLUE);
    var wLb = T.lblW('l_B=2,4 m');
    T.lbl('l_B=2,4 m', (bX + pivX) / 2 - wLb / 2, dimY + 24, BLUE);
    T.pause(150);
    T.dblArrow([pivX, dimY], [vX, dimY], BLUE);
    var wLv = T.lblW('l_V');
    T.lbl('l_V', (pivX + vX) / 2 - wLv / 2, dimY + 24, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Brädan väger jämnt, så momentet']],
      [['moturs är lika stort som']],
      [['momentet medurs.']]
    ]));
    T.str('Momentjämvikt', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Barnet vrider moturs och den']],
      [['vuxne medurs. Varje moment är']],
      [['kraften gånger hävarmen.']]
    ]));
    T.str('F_B·l_B=F_V·l_V', padL, y);
    T.stepEnd();

    y += adv;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften byter jag ut mot']],
      [['F', 1], [' = ', 0], ['m', 1], [' · ', 0], ['g', 1],
       [' i båda leden.', 0]]
    ]));
    T.str('m_B·g·l_B=m_V·g·l_V', padL, y);
    T.stepEnd();

    var yG = y;
    T.tanke(T.bubble(140, T.bubbleTop(yG), bw, [
      [['g', 1], [' finns som faktor i båda leden,', 0]],
      [['så den kan divideras bort.']]
    ]));
    var gw = T.adv('g') - 1.5;
    stryk(T, F, padL + T.adv('m_B·'), gw, yG);
    T.pause(260);
    stryk(T, F, padL + T.adv('m_B·g·l_B=m_V·'), gw, yG);
    T.stepEnd();

    y += adv + 0.55 * F;
    var xRen = T.str('m_B·l_B=m_V·l_V', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Delar med den vuxnes massa så']],
      [['att hävarmen blir ensam kvar.']]
    ]));
    T.fracH('m_B·l_B', 'm_V', T.str('⟺l_V=', xRen, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['m_B=25 kg', 'l_B=2,4 m', 'm_V=75 kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=0,80 m',
          T.fracH('25·2,4', '75', T.str('l_V=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Den vuxne väger tre gånger så']],
      [['mycket och sitter på en tredjedel']],
      [['av barnets avstånd. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,80 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: sned arm och lodrät kraft, hävarmen med cosinus ----
   * Armen 300 px/m (0,80 m = 240 px) i 35°, kraften lodrätt nedåt. */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var a = 35 * Math.PI / 180;
    var pX = 110, pY = 240, Lp = 240;
    var tX = pX + Lp * Math.cos(a), tY = pY - Lp * Math.sin(a);
    var dimY = 286;

    T.tanke(T.figurBubble(292, [
      [['Ritar armen. Pricken i den']],
      [['nedre änden är vridningspunkten.']]
    ], 330));
    T.dash([pX + 8, pY], [tX + 20, pY]);                  /* vågrät referens */
    T.pause(120);
    T.line([pX, pY], [tX, tY]);                            /* armen */
    T.circle(pX, pY, 7);
    T.dot(pX, pY);
    T.pause(150);
    vinkelbage(T, pX, pY, 30, 0, 35);
    T.lbl('35°', pX + 44, pY - 6, BLUE);
    T.pause(150);
    var wLa = T.lblW('L=0,80 m');
    var mX = (pX + tX) / 2 - Math.sin(a) * 22, mY = (pY + tY) / 2 - Math.cos(a) * 22;
    T.lbl('L=0,80 m', mX - wLa, mY, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kraften 120 N drar lodrätt']],
      [['nedåt i armens övre ände.']]
    ], 330));
    T.arrow([tX, tY], [tX, tY + 66], BLUE);
    T.lbl('F=120 N', tX + 12, tY + 64, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Hävarmen är inte 0,80 m. Den är']],
      [['det vinkelräta avståndet från']],
      [['vridningspunkten till kraftens']],
      [['riktningslinje.']]
    ], 330));
    T.dash([tX, tY + 70], [tX, dimY - 4]);                 /* riktningslinjen */
    T.pause(120);
    T.line([tX - 9, pY], [tX - 9, pY - 9]);                /* rät vinkel */
    T.line([tX - 9, pY - 9], [tX, pY - 9]);
    T.pause(120);
    T.dash([pX, pY + 10], [pX, dimY - 4]);
    T.pause(150);
    T.dblArrow([pX, dimY], [tX, dimY], BLUE);
    var wl = T.lblW('l');
    T.lbl('l', (pX + tX) / 2 - wl / 2, dimY + 24, BLUE);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Momentet är kraften gånger']],
      [['hävarmen.']]
    ]));
    T.str('Kraftmoment', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('M=F·l', padL, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Rätvinklig triangel! ', 0], ['l', 1], [' är', 0]],
      [['närliggande katet till 35° och']],
      [['armen ', 0], ['L', 1], [' är hypotenusan. Då', 0]],
      [['används cosinus.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F=120 N',
      ['cos 35°=', { frac: ['l', 'L'] }, '⟺l=L·cos 35°'],
      '    =0,80 m·cos 35°=0,6553... m'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern. Hävarmen tar jag']],
      [['oavrundad.']]
    ]));
    var xIns = T.str('M=120·0,6553...=78,638... Nm', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Först nu avrundar jag. Armens']],
      [['längd har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈79 Nm');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Med hela armen som hävarm hade']],
      [['momentet blivit 120·0,80 = 96 Nm.']],
      [['Hävarmen är kortare, så momentet']],
      [['blir mindre. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 79 Nm', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: plankan på en stödpunkt med en vikt ----
   * 80 px/m: plankan 90–410, stödet 210, tyngdpunkten 250, vikten 150.
   * Pilarna 4 px/kg: F_V 32, F_G 48 och stödkraften F_N 80 px.
   * Momenten: 8,0·60 = 12·40 i figuren. */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var pT = 150, pB = 160, xL = 90, xR = 410;
    var sX = 210, gX = 250, vX = 150;
    var dim1 = 252, dim2 = 304;

    T.tanke(T.figurBubble(292, [
      [['Ritar plankan på stödet med']],
      [['vikten. Pricken vid stödet är']],
      [['vridningspunkten.']]
    ], 372));
    T.rect(xL, pT, xR, pB);                               /* plankan */
    T.pause(120);
    T.line([sX, pB], [sX - 22, pB + 40]);                 /* stödet */
    T.line([sX - 22, pB + 40], [sX + 22, pB + 40]);
    T.line([sX + 22, pB + 40], [sX, pB]);
    T.dot(sX, pT + 5);
    T.pause(150);
    T.rect(vX - 18, pT - 28, vX + 18, pT);                /* vikten */
    var wMv = T.lblW('m_V=8,0 kg');
    T.lbl('m_V=8,0 kg', sX - 14 - wMv, pT - 38, BLUE);
    T.lbl('m_P=12 kg', 300, pT - 12, BLUE);
    T.pause(150);
    T.dash([xL, pB + 4], [xL, dim2 + 4]);                 /* givna mått */
    T.dash([xR, pB + 4], [xR, dim2 + 4]);
    T.dash([sX, pB + 44], [sX, dim2 + 4]);
    T.dblArrow([xL, dim2], [sX, dim2], BLUE);
    T.dblArrow([sX, dim2], [xR, dim2], BLUE);
    var w15 = T.lblW('1,5 m'), w25 = T.lblW('2,5 m');
    T.lbl('1,5 m', (xL + sX) / 2 - w15 / 2, dim2 + 24, BLUE);
    T.lbl('2,5 m', (sX + xR) / 2 - w25 / 2, dim2 + 24, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Plankans tyngdkraft angriper i']],
      [['tyngdpunkten, mitt på plankan.']],
      [['Stödet bär upp båda tyngderna.']]
    ], 372));
    T.dot(vX, pT);
    T.arrow([vX, pT], [vX, pT + 32], BLUE);
    var wFv = T.lblW('F_V');
    T.lbl('F_V', vX - 10 - wFv, pT + 36, BLUE);
    T.pause(200);
    T.dot(gX, (pT + pB) / 2);
    T.arrow([gX, (pT + pB) / 2], [gX, (pT + pB) / 2 + 48], BLUE);
    T.lbl('F_G', gX + 10, (pT + pB) / 2 + 50, BLUE);
    T.pause(200);
    T.arrow([sX, pB], [sX, pB - 80], BLUE);
    T.lbl('F_N', sX + 10, pB - 70, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Hävarmarna mäts från vridnings-']],
      [['punkten till krafternas']],
      [['riktningslinjer.']]
    ], 372));
    T.dash([vX, pT + 36], [vX, dim1 + 4]);
    T.dash([gX, (pT + pB) / 2 + 52], [gX, dim1 + 4]);
    T.pause(150);
    T.dblArrow([vX, dim1], [sX, dim1], BLUE);
    var wLv = T.lblW('l_V');
    T.lbl('l_V', (vX + sX) / 2 - wLv / 2, dim1 + 22, BLUE);
    T.pause(150);
    T.dblArrow([sX, dim1], [gX, dim1], BLUE);
    T.lbl('l_G', gX + 10, dim1 + 6, BLUE);
    T.stepEnd();

    var y = 525;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Stödkraften går genom vridnings-']],
      [['punkten och ger inget moment.']],
      [['Kvar är två moment som ska vara']],
      [['lika stora.']]
    ]));
    T.str('Momentjämvikt kring stödpunkten', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vikten vrider moturs och plankans']],
      [['tyngd medurs. Varje moment är']],
      [['kraften gånger hävarmen.']]
    ]));
    T.str('F_V·l_V=F_G·l_G', padL, y);
    T.stepEnd();

    y += adv;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkrafterna skriver jag som']],
      [['m', 1], [' · ', 0], ['g', 1], [' i båda leden.', 0]]
    ]));
    T.str('m_V·g·l_V=m_P·g·l_G', padL, y);
    T.stepEnd();

    var yG = y;
    T.tanke(T.bubble(140, T.bubbleTop(yG), bw, [
      [['g', 1], [' finns som faktor i båda leden,', 0]],
      [['så den kan divideras bort.']]
    ]));
    var gw = T.adv('g') - 1.5;
    stryk(T, F, padL + T.adv('m_V·'), gw, yG);
    T.pause(260);
    stryk(T, F, padL + T.adv('m_V·g·l_V=m_P·'), gw, yG);
    T.stepEnd();

    y += adv + 0.55 * F;
    var xRen = T.str('m_V·l_V=m_P·l_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Delar med viktens massa så att']],
      [['hävarmen blir ensam kvar.']]
    ]));
    T.fracH('m_P·l_G', 'm_V', T.str('⟺l_V=', xRen, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Tyngdpunkten ligger 2,0 m från']],
      [['vänstra änden och stödet 1,5 m.']],
      [['Skillnaden är plankans hävarm.']]
    ]));
    var klam = valueBracket(T.acts, [
      'm_P=12 kg', 'l_G=2,0 m-1,5 m=0,5 m', 'm_V=8,0 kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=0,75 m',
          T.fracH('12·0,5', '8,0', T.str('l_V=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vikten är lättare än plankan och']],
      [['behöver längre hävarm, 0,75 m']],
      [['mot 0,5 m. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,75 m', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: stegen mot väggen ----
   * Stegen 52 px/m (5,0 m = 260 px) i 65°. Pilarna 0,5 px/N:
   * F_G = F_N = 147,3 N → 73,7 px, F_f = F_V = 34,34 N → 17,2 px. */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var a = 65 * Math.PI / 180;
    var fX = 210, gY = 300, Lp = 260;
    var tX = fX + Lp * Math.cos(a), tY = gY - Lp * Math.sin(a);
    var mX = (fX + tX) / 2, mY = (gY + tY) / 2;
    var kG = 147.3 * 0.5, kF = 34.34 * 0.5;
    var dimX = 124, dimY = 350;

    T.tanke(T.figurBubble(292, [
      [['Ritar stegen mot väggen. Pricken']],
      [['vid foten blir vridningspunkten.']]
    ], 392));
    T.line([150, gY], [tX, gY]);                           /* marken */
    T.hatch([tX, gY], [150, gY], 9);
    T.line([tX, tY - 18], [tX, gY]);                       /* väggen */
    T.hatch([tX, tY - 18], [tX, gY], 11);
    T.pause(150);
    T.line([fX, gY], [tX, tY]);                            /* stegen */
    T.dot(fX, gY);
    T.pause(150);
    vinkelbage(T, fX, gY, 48, 0, 65);
    T.lbl('65°', mX + 9, gY - 7, BLUE);
    var wLs = T.lblW('L=5,0 m');
    T.lbl('L=5,0 m', mX - Math.sin(a) * 22 - wLs, mY - Math.cos(a) * 22, BLUE);
    T.lbl('m=15 kg', tX + 22, mY, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Fyra krafter: tyngdkraften mitt']],
      [['på stegen, väggens kraft rakt ut']],
      [['från väggen, markens normal-']],
      [['kraft och friktionen vid foten.']]
    ], 392));
    T.dot(mX, mY);
    T.arrow([mX, mY], [mX, mY + kG], BLUE);
    T.lbl('F_G', mX + 10, mY + kG - 4, BLUE);
    T.pause(180);
    T.arrow([tX, tY], [tX - kF, tY], BLUE, 8);
    var wFV = T.lblW('F_V');
    T.lbl('F_V', tX - kF - 4 - wFV, tY - 10, BLUE);
    T.pause(180);
    T.arrow([fX, gY], [fX, gY - kG], BLUE);
    var wFN = T.lblW('F_N');
    T.lbl('F_N', fX - 10 - wFN, gY - kG + 8, BLUE);
    T.pause(180);
    T.arrow([fX, gY - 3], [fX + kF, gY - 3], BLUE, 8);
    T.lbl('F_f', fX + 6, gY + 30, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Väggens kraft är vågrät, så dess']],
      [['hävarm är stegens höjd. Tyngd-']],
      [['kraften är lodrät, så dess hävarm']],
      [['är det vågräta avståndet.']]
    ], 392));
    T.dash([tX - kF - 4, tY], [dimX - 6, tY]);             /* F_V:s riktningslinje */
    T.dash([fX - 8, gY], [dimX - 6, gY]);
    T.pause(150);
    T.dblArrow([dimX, tY], [dimX, gY], BLUE);
    var wlV = T.lblW('l_V');
    T.lbl('l_V', dimX - 10 - wlV, (tY + gY) / 2 + 6, BLUE);
    T.pause(150);
    T.dash([mX, mY + kG + 4], [mX, dimY + 4]);             /* F_G:s riktningslinje */
    T.dash([fX, gY + 36], [fX, dimY + 4]);
    T.dblArrow([fX, dimY], [mX, dimY], BLUE);
    T.lbl('l_G', mX + 10, dimY + 6, BLUE);
    T.stepEnd();

    var y = 560;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Markens två krafter angriper i']],
      [['foten och får hävarmen 0. Då']],
      [['försvinner de ur momentlagen.']]
    ]));
    T.str('Momentjämvikt kring stegens fot', padL, y, null, 0.62);
    T.pause(300);
    y += 1.8 * F;
    momentlag(T, F, y);

    y += adv + 0.55 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Väggens kraft vrider stegen']],
      [['moturs och tyngdkraften medurs.']]
    ]));
    var xMom = T.str('F_V·l_V=F_G·l_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Delar med väggkraftens hävarm']],
      [['så att kraften blir ensam kvar.']]
    ]));
    T.fracH('F_G·l_G', 'l_V', T.str('⟺F_V=', xMom, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Tyngdkraften angriper mitt på,']],
      [['2,5 m upp längs stegen. Dess']],
      [['hävarm är närliggande katet till']],
      [['65°. Väggkraftens hävarm är']],
      [['motstående katet till 65°.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=15 kg·9,82 N/kg=147,3 N',
      'l_G=2,5 m·cos 65°=1,0565... m',
      'l_V=5,0 m·sin 65°=4,5315... m'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('=34,343... N',
          T.fracH('147,3·1,0565...', '4,5315...', T.str('F_V=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Stegen glider inte. I sidled']],
      [['verkar bara friktionen och']],
      [['väggens kraft, så de är lika']],
      [['stora.']]
    ]));
    T.str('Kraftjämvikt i sidled', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var xIns = T.str('F_f=F_V=34,343... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Först nu avrundar jag. Längden']],
      [['och massan har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈34 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Friktionen är knappt en fjärdedel']],
      [['av tyngden 147 N. En brant stege']],
      [['behöver inte mycket friktion.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 34 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

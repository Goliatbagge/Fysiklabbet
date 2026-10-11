/* ovningar-penna/fy1-3.4.js: pennlösningar till övningarna i fy1-3.4
 * Tyngdkraft och normalkraft.
 *
 * En scen per övning, registrerad som "ov-fy1-3.4-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 49 N".
 * Kraftpilarna är skalenliga inom varje figur. F_G utgår från
 * tyngdpunkten (prick), F_N och F_S från kontaktpunkten, och två
 * motriktade krafter på samma verkningslinje ritas tätt intill varandra.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.4-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.4-u' + nr, fn); }

  /* golv med skraffering och en låda: returnerar lådans mått */
  function golvLada(T, x0, x1, yG, bx0, bx1, h) {
    T.line([x0, yG], [x1, yG]);
    T.hatch([x1, yG], [x0, yG], 12);
    T.rect(bx0, yG - h, bx1, yG);
    return { x0: bx0, x1: bx1, top: yG - h, yG: yG,
             cx: (bx0 + bx1) / 2, cy: yG - h / 2 };
  }
  /* streckgubbe som står med fötterna på footY; H = hela höjden */
  function gubbe(T, cx, footY, H) {
    var hy = footY - H + 10;
    var sh = footY - H + 28, hip = footY - 0.44 * H;
    T.circle(cx, hy, 10);
    T.line([cx, hy + 10], [cx, hip]);
    T.pause(100);
    T.line([cx, sh], [cx - 0.12 * H, sh + 0.25 * H]);
    T.line([cx, sh], [cx + 0.12 * H, sh + 0.25 * H]);
    T.pause(100);
    T.line([cx, hip], [cx - 0.09 * H, footY]);
    T.line([cx, hip], [cx + 0.09 * H, footY]);
    return { hip: hip, top: hy - 10, sh: sh };
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

  /* ---- Uppgift 1: tyngdkraften på en lärobok ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar boken som ligger på ett']],
      [['bord.']]
    ], 352));
    T.line([120, 250], [400, 250]);                       /* bordsskivan */
    T.line([120, 258], [400, 258]);
    T.line([140, 258], [140, 320]);
    T.line([380, 258], [380, 320]);
    T.pause(150);
    T.rect(215, 226, 305, 250);                           /* boken */
    T.line([219, 231], [301, 231]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften drar rakt nedåt']],
      [['från bokens tyngdpunkt. Den är']],
      [['det jag söker.']]
    ], 352));
    T.lbl('m=1,2 kg', 222, 212, BLUE);
    T.pause(150);
    /* 5 px/N → F_G 59 px */
    T.dot(260, 238, BLUE);
    T.arrow([260, 238], [260, 297], BLUE);
    T.lbl('F_G', 268, 300, BLUE);
    T.stepEnd();

    var y = 450;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften är massan gånger']],
      [['tyngdfaktorn.']]
    ]));
    T.str('Tyngdkraft', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_G=m·g', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Massan är given, och tyngd-']],
      [['faktorn är 9,82 N/kg i Sverige.']]
    ]));
    var klam = valueBracket(T.acts, ['m=1,2 kg', 'g=9,82 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_G=1,2·9,82=11,784 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈12 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ett kilogram väger ungefär 10 N,']],
      [['så 1,2 kg blir lite mer än 10 N.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 12 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: tyngdkraften på en person ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar personen som står på']],
      [['marken.']]
    ], 350));
    T.line([110, 300], [410, 300]);
    T.hatch([410, 300], [110, 300], 12);
    T.pause(120);
    var G = gubbe(T, 250, 300, 150);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften drar rakt nedåt']],
      [['från tyngdpunkten, ungefär vid']],
      [['höften.']]
    ], 350));
    T.lbl('m=75 kg', 290, 186, BLUE);
    T.pause(150);
    /* 0,08 px/N → F_G 59 px, spetsen strax ovanför marken */
    T.dot(250, G.hip, BLUE);
    T.arrow([250, G.hip], [250, G.hip + 59], BLUE);
    T.lbl('F_G', 200, G.hip + 54, BLUE);
    T.stepEnd();

    var y = 450;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften är massan gånger']],
      [['tyngdfaktorn.']]
    ]));
    T.str('Tyngdkraft', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_G=m·g', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['De 75 kg som personen "väger"']],
      [['är massan. Den samlar jag i']],
      [['klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['m=75 kg', 'g=9,82 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_G=75·9,82=736,5 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror, så 736,5 N']],
      [['blir 740 N.']]
    ]));
    y = avr(T, F, xIns, y, '≈740 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ett kilogram väger ungefär 10 N,']],
      [['så 75 kg blir ungefär 750 N.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 740 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: normalkraften på ett föremål som vilar på ett bord ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar föremålet som vilar på']],
      [['det plana bordet.']]
    ], 300));
    var L = golvLada(T, 110, 410, 250, 215, 305, 50);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Bordet trycker uppåt och tyngd-']],
      [['kraften drar nedåt. Föremålet']],
      [['vilar, så pilarna är lika långa.']]
    ], 300));
    T.lbl('m=5,0 kg', 72, 222, BLUE);
    T.pause(150);
    /* 1,2 px/N → F_N och F_G 59 px vardera, på samma verkningslinje */
    T.arrow([L.cx + 4, L.yG], [L.cx + 4, L.yG - 59], BLUE);
    T.lbl('F_N', L.cx + 12, L.yG - 62, BLUE);
    T.pause(150);
    T.dot(L.cx - 4, L.cy, BLUE);
    T.arrow([L.cx - 4, L.cy], [L.cx - 4, L.cy + 59], BLUE);
    T.lbl('F_G', L.cx - 44, L.cy + 59, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Föremålet är i vila. Enligt']],
      [['Newtons första lag tar krafterna']],
      [['ut varandra.']]
    ]));
    T.str('Föremålet vilar: kraftjämvikt i lodled', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var x1 = T.str('F_N=F_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Tyngdkraften skriver jag som']],
      [['massan gånger tyngdfaktorn.']]
    ]));
    T.str('=m·g', x1, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=5,0 kg', 'g=9,82 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_N=5,0·9,82=49,1 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈49 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bordet bär hela föremålets']],
      [['tyngd, varken mer eller mindre.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 49 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: tyngdkraften på en väska på månen ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 260;

    T.tanke(T.figurBubble(292, [
      [['Ritar väskan som står på']],
      [['månens yta.']]
    ], 335));
    T.line([100, yG], [410, yG]);
    T.hatch([410, yG], [100, yG], 12);
    T.lbl('Månens yta', 110, yG + 34, null);
    T.pause(150);
    T.rect(220, yG - 45, 300, yG);                        /* väskan */
    T.line([240, yG - 45], [246, yG - 60]);               /* handtaget */
    T.line([246, yG - 60], [274, yG - 60]);
    T.line([274, yG - 60], [280, yG - 45]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan och månens']],
      [['tyngdfaktor. Tyngdkraften drar']],
      [['nedåt från tyngdpunkten.']]
    ], 335));
    T.lbl('m=24 kg', 110, yG - 18, BLUE);
    T.pause(150);
    T.lbl('g_m_å_n_e_n=1,62 N/kg', 312, yG - 18, BLUE);
    T.pause(150);
    /* 1,5 px/N → F_G 58 px */
    T.dot(260, yG - 22.5, BLUE);
    T.arrow([260, yG - 22.5], [260, yG + 35.5], BLUE);
    T.lbl('F_G', 268, yG + 34, BLUE);
    T.stepEnd();

    var y = 435;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Samma formel som på jorden,']],
      [['men med månens tyngdfaktor.']]
    ]));
    T.str('Tyngdkraft på månen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_G=m·g_m_å_n_e_n', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=24 kg', 'g_m_å_n_e_n=1,62 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_G=24·1,62=38,88 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈39 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['På jorden hade väskan vägt']],
      [['ungefär 240 N. Månens tyngd-']],
      [['faktor är ungefär en sjättedel']],
      [['av jordens. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 39 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: spädbarnets massa ur fjädervågens utslag ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar fjädervågen i taket och']],
      [['korgen med barnet som hänger']],
      [['i den.']]
    ], 335));
    T.line([180, 160], [340, 160]);                       /* taket */
    T.hatch([180, 160], [340, 160], 10);
    T.line([260, 160], [260, 172]);
    T.rect(246, 172, 274, 218);                           /* fjädervågen */
    T.line([250, 184], [257, 184]);
    T.line([250, 195], [257, 195]);
    T.line([250, 206], [257, 206]);
    T.line([260, 218], [260, 234]);
    T.pause(150);
    T.line([260, 234], [205, 262]);                       /* korgens rep */
    T.line([260, 234], [315, 262]);
    T.line([200, 262], [320, 262]);                       /* korgen */
    T.line([200, 262], [214, 300]);
    T.line([320, 262], [306, 300]);
    T.line([214, 300], [306, 300]);
    T.circle(260, 254, 8);                                /* barnets huvud */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vågen visar 51 N och korgen']],
      [['ensam har tyngden 12 N. Barnets']],
      [['massa är det jag söker.']]
    ], 335));
    T.lbl('F_v_å_g=51 N', 286, 200, BLUE);
    T.pause(150);
    T.lbl('F_G_k_o_r_g=12 N', 330, 292, BLUE);
    T.pause(150);
    T.lbl('m', 255, 292, BLUE);
    T.stepEnd();

    var y = 445;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Massan får jag ur tyngdkraften']],
      [['genom att dela med tyngd-']],
      [['faktorn.']]
    ]));
    T.str('Massan ur tyngdkraften', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('F_G=m·g⟺m=', padL, y);
    T.fracH('F_G', 'g', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Vågen bär både korgen och']],
      [['barnet. Barnets tyngd är vågens']],
      [['utslag minus korgens tyngd.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=F_v_å_g-F_G_k_o_r_g=51 N-12 N=39 N',
      'g=9,82 N/kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=3,9714... kg',
          T.fracH('39', '9,82', T.str('m=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Vågens']],
      [['och korgens värden har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈4,0 kg');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ett nyfött barn har ofta massan']],
      [['3 till 4 kg. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 4,0 kg', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: massa och tyngd (flerval, rätt svar C) ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 236;

    T.tanke(T.figurBubble(292, [
      [['Ritar samma låda på jorden och']],
      [['på månen.']]
    ], 320));
    T.line([90, yG], [220, yG]);
    T.hatch([220, yG], [90, yG], 6);
    T.rect(130, yG - 40, 180, yG);
    T.lbl('Jorden', 124, yG - 54, null);
    T.pause(150);
    T.line([265, yG], [400, yG]);
    T.hatch([400, yG], [265, yG], 6);
    T.rect(305, yG - 40, 355, yG);
    T.lbl('Månen', 302, yG - 54, null);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Massan är densamma, men månen']],
      [['drar svagare. Där blir tyngd-']],
      [['kraften bara en sjättedel så stor.']]
    ], 320));
    T.lbl('m', 112, yG - 14, BLUE);
    T.lbl('m', 287, yG - 14, BLUE);
    T.pause(150);
    /* skalenligt: 9,82 mot 1,62 → 84 px mot 14 px */
    T.dot(155, yG - 20, BLUE);
    T.arrow([155, yG - 20], [155, yG + 64], BLUE);
    T.lbl('F_G', 163, yG + 62, BLUE);
    T.pause(150);
    T.dot(330, yG - 20, BLUE);
    T.arrow([330, yG - 20], [330, yG - 6], BLUE, 6);
    T.lbl('F_G', 363, yG - 14, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Massan är mängden materia. Den']],
      [['är densamma var lådan än är.']]
    ]));
    T.str('Massa, mäts i kg', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('m är densamma överallt', padL, y, null, 0.8);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngden är tyngdkraften på']],
      [['lådan. Den beror på tyngd-']],
      [['faktorn där lådan är.']]
    ]));
    T.str('Tyngd, mäts i N', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_G=m·g', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdfaktorn är mycket mindre']],
      [['på månen än på jorden.']]
    ]));
    T.str('g_j_o_r_d_e_n=9,82 N/kg', padL, y, null, 0.8);
    y += 1.6 * F;
    T.str('g_m_å_n_e_n=1,62 N/kg', padL, y, null, 0.8);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['A är fel, massan ändras inte. B']],
      [['har bytt plats på enheterna, och']],
      [['D blandar ihop två olika']],
      [['storheter. Kvar blir C.']]
    ]));
    T.underline(T.str('Svar: Alternativ C', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: normalkraften när någon trycker nedåt på lådan ---- */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan som står på golvet.']]
    ], 320));
    var L = golvLada(T, 110, 410, 260, 205, 315, 60);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Nedåt verkar tyngdkraften och']],
      [['handens tryck. Golvet trycker']],
      [['uppåt med båda tillsammans.']]
    ], 320));
    T.lbl('m=30 kg', 328, L.yG - 22, BLUE);
    T.pause(150);
    /* 0,25 px/N → F 20 px, F_G 73,7 px, F_N 93,7 px */
    T.arrow([L.cx - 4, L.top], [L.cx - 4, L.top + 20], BLUE, 7);
    T.lbl('F=80 N', 96, L.top + 18, BLUE);
    T.pause(150);
    T.dot(L.cx - 4, L.cy, BLUE);
    T.arrow([L.cx - 4, L.cy], [L.cx - 4, L.cy + 73.7], BLUE);
    T.lbl('F_G', L.cx - 44, L.cy + 72, BLUE);
    T.pause(150);
    T.arrow([L.cx + 4, L.yG], [L.cx + 4, L.yG - 93.7], BLUE);
    T.lbl('F_N', L.cx + 12, L.yG - 88, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lådan står stilla. Normalkraften']],
      [['uppåt är lika stor som krafterna']],
      [['nedåt tillsammans.']]
    ]));
    T.str('Lådan står stilla: kraftjämvikt i lodled', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_N=F_G+F', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut i']],
      [['klammern. Handens kraft är']],
      [['given.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=30 kg·9,82 N/kg=294,6 N',
      'F=80 N'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_N=294,6+80=374,6 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['och kraften har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈370 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Golvet tar emot både lådans tyngd']],
      [['och handens tryck, så normal-']],
      [['kraften blir större än tyngden.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 370 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 8: spännkraften i snöret som en vikt hänger i ---- */
  reg(8, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar vikten som hänger i ett']],
      [['snöre från taket.']]
    ], 330));
    T.line([180, 160], [340, 160]);                       /* taket */
    T.hatch([180, 160], [340, 160], 10);
    T.line([260, 160], [260, 235]);                       /* snöret */
    T.rect(230, 235, 290, 275);                           /* vikten */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Snöret drar uppåt och tyngd-']],
      [['kraften nedåt. Vikten hänger']],
      [['stilla, så pilarna är lika långa.']]
    ], 330));
    T.lbl('m=12 kg', 302, 262, BLUE);
    T.pause(150);
    /* 0,5 px/N → F_S och F_G 59 px vardera */
    T.arrow([265, 235], [265, 176], BLUE);
    T.lbl('F_S', 273, 190, BLUE);
    T.pause(150);
    T.dot(255, 255, BLUE);
    T.arrow([255, 255], [255, 314], BLUE);
    T.lbl('F_G', 216, 312, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vikten är i vila. Enligt Newtons']],
      [['första lag tar krafterna ut']],
      [['varandra.']]
    ]));
    T.str('Vikten hänger stilla: kraftjämvikt', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var x1 = T.str('F_S=F_G', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Tyngdkraften skriver jag som']],
      [['massan gånger tyngdfaktorn.']]
    ]));
    T.str('=m·g', x1, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=12 kg', 'g=9,82 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_S=12·9,82=117,84 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror, så']],
      [['117,84 N blir 120 N.']]
    ]));
    y = avr(T, F, xIns, y, '≈120 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Snöret bär hela viktens tyngd,']],
      [['ungefär 10 N för varje kilogram.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 120 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* Newtons andra lag med uppåt som positiv riktning, i tre klicksteg:
   * F_R=m·a, sedan vilka krafter F_R består av, sedan omskrivningen.
   * kU = beteckningen för kraften uppåt ('F_N' eller 'F_S'). */
  function newtonUpp(T, F, y, rubrik, kU, bUpp) {
    var padL = T.padL, adv = 1.7 * F, bw = 292;
    T.str(rubrik, padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, bUpp));
    var x2 = T.str(kU + '-F_G=m·a', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Flyttar över tyngdkraften så att']],
      [[(kU === 'F_N' ? 'normalkraften' : 'spännkraften') + ' står ensam.']]
    ]));
    T.str('⟺' + kU + '=F_G+m·a', x2, y);
    T.stepEnd();
    return y;
  }

  /* ---- Uppgift 9: normalkraften från trampolinduken ---- */
  reg(9, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var cx = 260, foot = 280;

    T.tanke(T.figurBubble(292, [
      [['Ritar gymnasten i studsens']],
      [['lägsta punkt, där duken är']],
      [['som mest nedtryckt.']]
    ], 335));
    T.line([110, 250], [110, 300]);                       /* ramen */
    T.line([410, 250], [410, 300]);
    (function () {                                        /* duken */
      var pts = [], i;
      for (i = 0; i <= 30; i++) {
        var x = 110 + 300 * i / 30, u = (x - cx) / 150;
        pts.push([x, 250 + 30 * (1 - u * u)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts });
    })();
    T.pause(150);
    var G = gubbe(T, cx, foot, 170);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Duken trycker uppåt och tyngd-']],
      [['kraften drar nedåt. Gymnasten']],
      [['accelererar uppåt, så F_N är']],
      [['längst.']]
    ], 335));
    T.lbl('m=45 kg', 110, 150, BLUE);
    T.pause(150);
    /* 0,12 px/N → F_N 90,8 px, F_G 53 px */
    T.arrow([cx + 5, foot], [cx + 5, foot - 90.8], BLUE);
    T.lbl('F_N', cx + 30, foot - 84, BLUE);
    T.pause(150);
    T.dot(cx - 5, G.hip, BLUE);
    T.arrow([cx - 5, G.hip], [cx - 5, G.hip + 53], BLUE);
    T.lbl('F_G', cx - 52, G.hip + 46, BLUE);
    T.pause(150);
    T.arrow([345, 240], [345, 200], BLUE);
    T.lbl('a=7,0 m/s^2', 354, 222, BLUE);
    T.stepEnd();

    var y = 435;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Gymnasten accelererar, så']],
      [['krafterna tar inte ut varandra.']],
      [['Newtons andra lag gäller.']]
    ]));
    y = newtonUpp(T, F, y, 'Newtons andra lag, uppåt positiv riktning',
                  'F_N', [
      [['Den resulterande kraften är']],
      [['normalkraften uppåt minus']],
      [['tyngdkraften nedåt.']]
    ]);

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut i']],
      [['klammern.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=45 kg·9,82 N/kg=441,9 N', 'm=45 kg', 'a=7,0 m/s^2'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_N=441,9+45·7,0=756,9 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['och accelerationen har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈760 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Duken trycker med nästan dubbla']],
      [['tyngden. Den ska både bära']],
      [['gymnasten och ge henne fart']],
      [['uppåt. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 760 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 10: spännkraften i kranens vajer ---- */
  reg(10, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar containern som hänger i']],
      [['kranens vajer.']]
    ], 340));
    T.line([180, 110], [340, 110]);                       /* kranens arm */
    T.line([180, 102], [340, 102]);
    T.line([260, 110], [260, 215]);                       /* vajern */
    T.pause(150);
    T.rect(190, 215, 330, 265);                           /* containern */
    T.line([215, 219], [215, 261]);
    T.line([240, 219], [240, 261]);
    T.line([280, 219], [280, 261]);
    T.line([305, 219], [305, 261]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vajern drar uppåt och tyngd-']],
      [['kraften nedåt. Containern']],
      [['accelererar uppåt, så F_S är']],
      [['lite längre.']]
    ], 340));
    T.lbl('m=2 400 kg', 84, 245, BLUE);
    T.pause(150);
    /* 0,0036 px/N → F_S 90 px, F_G 84,8 px */
    T.arrow([265, 215], [265, 125], BLUE);
    T.lbl('F_S', 273, 140, BLUE);
    T.pause(150);
    T.dot(255, 240, BLUE);
    T.arrow([255, 240], [255, 324.8], BLUE);
    T.lbl('F_G', 263, 322, BLUE);
    T.pause(150);
    T.arrow([362, 255], [362, 220], BLUE);
    T.lbl('a=0,60 m/s^2', 372, 242, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Containern accelererar, så']],
      [['krafterna tar inte ut varandra.']],
      [['Newtons andra lag gäller.']]
    ]));
    y = newtonUpp(T, F, y, 'Newtons andra lag, uppåt positiv riktning',
                  'F_S', [
      [['Den resulterande kraften är']],
      [['spännkraften uppåt minus']],
      [['tyngdkraften nedåt.']]
    ]);

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut i']],
      [['klammern.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=2 400 kg·9,82 N/kg=23 568 N', 'm=2 400 kg', 'a=0,60 m/s^2'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('F_S=23 568+2 400·0,60', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    var xIns = T.str('=25 008 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Accelerationen har två']],
      [['värdesiffror, så det blir 25 kN.']]
    ]));
    y = avr(T, F, xIns, y, '≈25 kN');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lite mer än containerns tyngd,']],
      [['som är cirka 23,6 kN. Det extra']],
      [['ger fart uppåt. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 25 kN', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 11: personvågen i hissen, a) b) c) ----
   * Formeln och klammern skrivs en gång; varje deluppgift sätter in sin
   * acceleration. */
  reg(11, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var cx = 260, foot = 290;

    T.tanke(T.figurBubble(292, [
      [['Ritar personen som står på']],
      [['vågen i hissen.']]
    ], 400));
    T.line([cx, 60], [cx, 95]);                          /* hisslinan */
    T.rect(150, 95, 370, 300);                           /* hisskorgen */
    T.rect(222, 290, 298, 300);                           /* vågen */
    T.pause(150);
    var G = gubbe(T, cx, foot, 170);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vågen trycker uppåt med normal-']],
      [['kraften och tyngdkraften drar']],
      [['nedåt. Står hissen stilla är de']],
      [['lika stora.']]
    ], 400));
    T.lbl('m=70 kg', 382, 200, BLUE);
    T.pause(150);
    /* 0,14 px/N → 96,2 px vardera när hissen står stilla */
    T.arrow([cx + 5, foot], [cx + 5, foot - 96.2], BLUE);
    T.lbl('F_N', cx + 30, foot - 88, BLUE);
    T.pause(150);
    T.dot(cx - 5, G.hip, BLUE);
    T.arrow([cx - 5, G.hip], [cx - 5, G.hip + 96.2], BLUE);
    T.lbl('F_G', cx - 52, G.hip + 62, BLUE);
    T.stepEnd();

    var y = 500;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vågen visar hur hårt den trycker']],
      [['på personen, alltså normal-']],
      [['kraften. Den följer ur Newtons']],
      [['andra lag.']]
    ]));
    y = newtonUpp(T, F, y, 'Newtons andra lag på personen, uppåt positiv',
                  'F_N', [
      [['Den resulterande kraften är']],
      [['normalkraften uppåt minus']],
      [['tyngdkraften nedåt.']]
    ]);

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften är densamma i alla']],
      [['tre fallen. Accelerationen sätter']],
      [['jag in i varje deluppgift.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G=m·g=70 kg·9,82 N/kg=687,4 N', 'm=70 kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    var delar = [
      { rub: 'a) Hissen står stilla: a=0',
        b0: [[['Hissen står stilla, så']], [['accelerationen är noll.']]],
        ins: 'F_N=687,4+70·0=687,4 N', avr: '≈690 N',
        bA: [[['Massan har två värdesiffror.']]],
        bR: [[['Utan acceleration visar vågen']],
             [['bara personens tyngd.']], [['Rimligt!']]],
        svar: 'Svar: 690 N' },
      { rub: 'b) Hissen accelererar uppåt: a=1,8 m/s^2',
        b0: [[['Accelerationen är uppåt, i den']],
             [['positiva riktningen.']]],
        ins: 'F_N=687,4+70·1,8=813,4 N', avr: '≈810 N',
        bA: [[['Massan och accelerationen har']], [['två värdesiffror.']]],
        bR: [[['Vågen visar mer än tyngden.']],
             [['Man känner sig tyngre när hissen']],
             [['startar uppåt. Rimligt!']]],
        svar: 'Svar: 810 N' },
      { rub: 'c) Hissen accelererar nedåt: a=-1,2 m/s^2',
        b0: [[['Accelerationen är nedåt, så den']],
             [['blir negativ.']]],
        ins: 'F_N=687,4+70·(-1,2)=603,4 N', avr: '≈600 N',
        bA: [[['Massan och accelerationen har']], [['två värdesiffror.']]],
        bR: [[['Vågen visar mindre än tyngden.']],
             [['Man känner sig lättare. Rimligt!']]],
        svar: 'Svar: 600 N' }
    ];
    delar.forEach(function (d) {
      y += adv + 2.0 * F;
      T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, d.b0));
      T.str(d.rub, padL, y, null, 0.62);
      T.pause(300);
      y += 2.1 * F;
      var xIns = T.str(d.ins, padL, y);
      T.stepEnd();

      T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, d.bA));
      y = avr(T, F, xIns, y, d.avr);
      T.stepEnd();

      y += adv + 1.2 * F;
      T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, d.bR));
      T.underline(T.str(d.svar, padL, y), y);
      T.stepEnd();
    });

    return slut(T, y);
  });

  /* ---- Uppgift 12: basketspelarens hopp, a) b) c) ----
   * a) farten ur stighöjden, b) accelerationen under frånskjutet,
   * c) normalkraften ur Newtons andra lag. Varje del tar föregående
   * dels värde oavrundat. */
  reg(12, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var cx = 170, foot = 340;
    /* 70 px/m: s=0,40 m → 28 px, h=0,85 m → 59,5 px */
    var y2 = foot - 0.44 * 200, y1 = y2 + 28, y3 = y2 - 59.5;

    T.tanke(T.figurBubble(292, [
      [['Ritar spelaren och tre lägen för']],
      [['tyngdpunkten: i knäböjen, när']],
      [['han lämnar golvet och högst upp.']]
    ], 380));
    T.line([90, foot], [410, foot]);
    T.hatch([410, foot], [90, foot], 12);
    T.pause(120);
    var G = gubbe(T, cx, foot, 200);
    T.pause(150);
    T.dash([228, y1], [322, y1]);
    T.dash([228, y2], [322, y2]);
    T.dash([228, y3], [322, y3]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Frånskjutet lyfter tyngdpunkten']],
      [['0,40 m. Sedan stiger den 0,85 m']],
      [['i luften.']]
    ], 380));
    T.lbl('m=78 kg', 40, 150, BLUE);
    T.pause(150);
    T.dblArrow([335, y1], [335, y2], BLUE);
    T.lbl('s=0,40 m', 346, (y1 + y2) / 2 + 6, BLUE);
    T.pause(150);
    T.dblArrow([335, y2], [335, y3], BLUE);
    T.lbl('h=0,85 m', 346, (y2 + y3) / 2 + 6, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Under frånskjutet trycker golvet']],
      [['uppåt hårdare än tyngdkraften']],
      [['drar nedåt. Annars får han ingen']],
      [['fart uppåt.']]
    ], 380));
    /* 0,06 px/N → F_N 143,6 px, F_G 46 px */
    T.arrow([cx + 5, foot], [cx + 5, foot - 143.6], BLUE);
    T.lbl('F_N', cx + 30, foot - 132, BLUE);
    T.pause(150);
    T.dot(cx - 5, G.hip, BLUE);
    T.arrow([cx - 5, G.hip], [cx - 5, G.hip + 46], BLUE);
    T.lbl('F_G', cx - 52, G.hip + 44, BLUE);
    T.stepEnd();

    /* ---- a) farten när han lämnar golvet ---- */
    var y = 485;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['I luften bromsas han jämnt av']],
      [['tyngdaccelerationen. Torricellis']],
      [['ekvation kopplar ihop farten']],
      [['med sträckan.']]
    ]));
    T.str('a) Torricellis ekvation för färden uppåt i luften',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('v^2-v_0^2=2·a·s', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Högst upp är farten noll, och']],
      [['tyngdaccelerationen bromsar.']],
      [['Alltså v=0, a=−g och s=h.']]
    ]));
    var x2 = T.str('0-v_0^2=-2·g·h', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Byter tecken i båda led.']]
    ]));
    T.str('⟺v_0^2=2·g·h', x2, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Drar roten ur båda led. Farten']],
      [['är positiv.']]
    ]));
    T.rot('2·g·h', T.str('v_0=', padL, y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdaccelerationen är lika med']],
      [['tyngdfaktorn, 9,82 m/s².']]
    ]));
    var klam = valueBracket(T.acts, ['g=9,82 m/s^2', 'h=0,85 m'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=4,0858... m/s',
          T.rot('2·9,82·0,85', T.str('v_0=', padL, y) + 0.15 * F, y) + 0.1 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Höjden']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈4,1 m/s');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ungefär 15 km/h rakt uppåt.']],
      [['Det räcker för ett hopp på 85 cm.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 4,1 m/s', padL, y), y);
    T.stepEnd();

    /* ---- b) accelerationen under frånskjutet ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Under frånskjutet ökar farten']],
      [['från noll på sträckan 0,40 m.']],
      [['Jag löser ut accelerationen.']]
    ]));
    T.str('b) Torricellis ekvation för frånskjutet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('v^2-v_0^2=2·a·s⟺a=', padL, y);
    T.fracH('v^2-v_0^2', '2·s', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Han startar från stillastående,']],
      [['och slutfarten är farten från a),']],
      [['oavrundad.']]
    ]));
    klam = valueBracket(T.acts, [
      'v=4,0858... m/s (från a)', 'v_0=0', 's=0,40 m'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    xIns = T.str('=20,8675 m/s^2',
          T.fracH('4,0858...^2-0^2', '2·0,40', T.str('a=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Sträckan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈21 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mer än dubbla tyngdaccelera-']],
      [['tionen, under en kort och kraftig']],
      [['knäböj. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 21 m/s^2', padL, y), y);
    T.stepEnd();

    /* ---- c) normalkraften under frånskjutet ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Han accelererar uppåt, så']],
      [['krafterna tar inte ut varandra.']],
      [['Newtons andra lag gäller.']]
    ]));
    y = newtonUpp(T, F, y, 'c) Newtons andra lag under frånskjutet, uppåt positiv',
                  'F_N', [
      [['Den resulterande kraften är']],
      [['normalkraften uppåt minus']],
      [['tyngdkraften nedåt.']]
    ]);

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknar jag ut i']],
      [['klammern. Accelerationen tar jag']],
      [['oavrundad från b).']]
    ]));
    klam = valueBracket(T.acts, [
      'F_G=m·g=78 kg·9,82 N/kg=765,96 N', 'm=78 kg',
      'a=20,8675 m/s^2 (från b)'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('F_N=765,96+78·20,8675', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    xIns = T.str('=2 393,625 N', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['och sträckorna har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2,4 kN');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Drygt tre gånger hans tyngd. Det']],
      [['märks i benen, men det är rimligt']],
      [['för ett kraftigt hopp.']]
    ]));
    T.underline(T.str('Svar: 2,4 kN', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

/* ovningar-penna/fy1-3.10.js: pennlösningar till övningarna i fy1-3.10
 * Exempel: trissor.
 *
 * En scen per övning, registrerad som "ov-fy1-3.10-u<nr>" och kopplad till
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
 * Figurerna följer övningarnas egna figurer (makePulley i
 * data/ovningar.js): i Atwood-uppställningen hänger den vänstra vikten
 * lägre, och på bordet sitter trissan vid högra kanten.
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.10-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;
  var humanize = V.humanize, mkMultIn = V.mkMultIn, mkSamla = V.mkSamla;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.10-u' + nr, fn); }

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
  /* en båge längs cirkeln (cx, cy, r) från vinkeln a0 till a1 (radianer,
   * y nedåt), för snöret som löper över trissan */
  function bage(T, cx, cy, r, a0, a1) {
    var pts = [], n = 12, i;
    for (i = 0; i <= n; i++) {
      var a = a0 + (a1 - a0) * i / n;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts, color: null });
  }

  /* ---- Atwood-uppställningen: en trissa i taket, en vikt på var sida.
   * Den vänstra vikten hänger lägre, som i övningens figur. Returnerar
   * vikternas mått. */
  var AT = { yc: 130, cx: 200, cy: 180, r: 30, bw: 46, bh: 36,
             topL: 290, topR: 250 };
  function atwood(T) {
    var a = AT;
    T.line([110, a.yc], [290, a.yc]);
    T.hatch([110, a.yc], [290, a.yc], 12);
    T.line([a.cx, a.yc], [a.cx, a.cy]);
    T.pause(120);
    T.circle(a.cx, a.cy, a.r);
    T.dot(a.cx, a.cy);
    T.pause(120);
    bage(T, a.cx, a.cy, a.r, Math.PI, 2 * Math.PI);
    T.line([a.cx - a.r, a.cy], [a.cx - a.r, a.topL]);
    T.line([a.cx + a.r, a.cy], [a.cx + a.r, a.topR]);
    T.pause(120);
    var L = { x0: a.cx - a.r - a.bw / 2, x1: a.cx - a.r + a.bw / 2,
              top: a.topL, bot: a.topL + a.bh, cx: a.cx - a.r,
              cy: a.topL + a.bh / 2 };
    var R = { x0: a.cx + a.r - a.bw / 2, x1: a.cx + a.r + a.bw / 2,
              top: a.topR, bot: a.topR + a.bh, cx: a.cx + a.r,
              cy: a.topR + a.bh / 2 };
    T.rect(L.x0, L.top, L.x1, L.bot);
    T.rect(R.x0, R.top, R.x1, R.bot);
    return { L: L, R: R };
  }
  /* etikett som SLUTAR vid x (läggs till vänster om något) */
  function lblV(T, t, x, yb, col) {
    return T.lbl(t, x - T.lblW(t), yb, col);
  }

  /* ---- Bordsuppställningen: en kropp på bordet, snöret över en trissa
   * vid högra bordskanten till en hängande vikt. */
  var BD = { yT: 230, xT0: 90, xT1: 300, yF: 380,
             px: 316, r: 16, hx0: 310, hx1: 354, hTop: 280, hBot: 316 };
  function bord(T, ropeY) {
    var b = BD, pcy = ropeY + b.r;
    T.line([b.xT0, b.yT], [b.xT1, b.yT]);              /* bordsskivan */
    T.line([b.xT0 + 20, b.yT], [b.xT0 + 20, b.yF]);
    T.line([b.xT1 - 20, b.yT], [b.xT1 - 20, b.yF]);
    T.line([70, b.yF], [400, b.yF]);                   /* golvet */
    T.hatch([400, b.yF], [70, b.yF], 13);
    T.pause(120);
    T.line([b.xT1, b.yT], [b.px, pcy]);                /* trissans fäste */
    T.circle(b.px, pcy, b.r);
    T.dot(b.px, pcy);
    return { pcy: pcy };
  }
  function bordSnore(T, xFran, ropeY, pcy) {
    var b = BD;
    T.line([xFran, ropeY], [b.px, ropeY]);
    bage(T, b.px, pcy, b.r, -Math.PI / 2, 0);
    T.line([b.px + b.r, pcy], [b.px + b.r, b.hTop]);
    T.rect(b.hx0, b.hTop, b.hx1, b.hBot);
  }

  /* bråk där streck och nämnare skrivs med blåpennan: division i båda
   * led (REGEL DIVISION I BÅDA LED SKRIVS MED BLÅPENNAN) */
  function fracBla(T, F, numS, denS, x0, yb) {
    var ybar = yb - 0.34 * F;
    var nw = T.adv(numS), dw = T.adv(denS);
    var w = Math.max(nw, dw) + 0.3 * F;
    T.str(numS, x0 + (w - nw) / 2, ybar - 0.14 * F);
    T.pause(130);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: BLUE });
    T.pause(130);
    T.str(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, BLUE);
    return x0 + w + 1.5;
  }

  /* ---- Uppgift 1: spännkraften på andra sidan trissan (flerval) ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar trissan med snöret och en']],
      [['vikt i varje ände.']]
    ], 362));
    var A = atwood(T);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Snöret drar i båda vikterna.']],
      [['Jag ritar spännkraften i båda']],
      [['ändarna.']]
    ], 362));
    /* skalenligt 4 px/N: 12 N ger 48 px i båda ändarna */
    T.arrow([A.L.cx, A.L.top], [A.L.cx, A.L.top - 48], BLUE);
    lblV(T, 'F_S=12 N', A.L.cx - 8, A.L.top - 26, BLUE);
    T.pause(150);
    T.arrow([A.R.cx, A.R.top], [A.R.cx, A.R.top - 48], BLUE);
    T.lbl('F_S', A.R.cx + 8, A.R.top - 26, BLUE);
    T.stepEnd();

    var y = 480;
    T.tanke(T.bubble(120, T.bubbleTop(362 + 70), bw, [
      [['En friktionsfri trissa bromsar']],
      [['inte snöret. Den byter bara']],
      [['riktning på kraften.']]
    ]));
    T.str('Friktionsfri trissa: samma spännkraft i hela snöret',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_S=12 N i båda ändarna', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Olika tunga vikter ändrar inte']],
      [['det. Då är det i stället de']],
      [['resulterande krafterna på']],
      [['vikterna som skiljer sig.']]
    ]));
    T.str('Gäller även när vikterna är olika tunga', padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Trissan tar inte upp någon kraft,']],
      [['och 24 N vore att räkna båda']],
      [['ändarna. Bara B stämmer.']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: spännkraften när lika tunga vikter hänger still ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar trissan i taket och de två']],
      [['lika tunga vikterna.']]
    ], 420));
    var A = atwood(T);
    T.pause(150);
    lblV(T, 'm=2,0 kg', A.L.x0 - 10, A.L.cy + 6, BLUE);
    T.lbl('m=2,0 kg', A.R.x1 + 10, A.R.cy + 6, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Krafterna på den vänstra vikten:']],
      [['snöret drar uppåt och tyngd-']],
      [['kraften drar nedåt. Vikten är i']],
      [['vila, så pilarna är lika långa.']]
    ], 420));
    /* skalenligt 3 px/N: 19,64 N ger 59 px, på samma verkningslinje */
    T.arrow([A.L.cx, A.L.top], [A.L.cx, A.L.top - 59], BLUE);
    T.lbl('F_S', A.L.cx + 8, A.L.top - 34, BLUE);
    T.pause(150);
    T.arrow([A.L.cx, A.L.cy], [A.L.cx, A.L.cy + 59], BLUE);
    T.dot(A.L.cx, A.L.cy, BLUE);
    lblV(T, 'F_G', A.L.cx - 8, A.L.cy + 58, BLUE);
    T.stepEnd();

    var y = 560;
    T.tanke(T.bubble(120, T.bubbleTop(420 + 94), bw, [
      [['Vikten står still. Enligt Newtons']],
      [['första lag är den resulterande']],
      [['kraften på den noll.']]
    ]));
    T.str('Vikten är i vila: kraftjämvikt', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_S-F_G=0⟺F_S=F_G=m·g', padL, y);
    T.stepEnd();

    y += adv + 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Massan är given och g står i']],
      [['uppgiften. Jag samlar dem i']],
      [['klammern.']]
    ]));
    var klam = valueBracket(T.acts, ['m=2,0 kg', 'g=9,82 N/kg'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_S=2,0·9,82=19,64 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈20 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Snöret drar med 20 N i varje']],
      [['ände. Det är taket som bär båda']],
      [['vikterna, cirka 39 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 20 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: accelerationen för 3,0 kg och 2,0 kg ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar trissan och vikterna.']],
      [['Den tyngre hänger till vänster.']]
    ], 420));
    var A = atwood(T);
    T.pause(150);
    lblV(T, 'm_3=3,0 kg', A.L.x0 - 10, A.L.cy + 6, BLUE);
    T.lbl('m_2=2,0 kg', A.R.x1 + 10, A.R.cy + 6, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkrafterna drar båda nedåt.']],
      [['Den större drar systemet åt sitt']],
      [['håll, den mindre bromsar.']]
    ], 420));
    /* skalenligt 2 px/N: 29,46 N ger 59 px, 19,64 N ger 39 px */
    T.arrow([A.L.cx, A.L.cy], [A.L.cx, A.L.cy + 59], BLUE);
    T.dot(A.L.cx, A.L.cy, BLUE);
    lblV(T, 'F_G_3', A.L.cx - 8, A.L.cy + 58, BLUE);
    T.pause(150);
    T.arrow([A.R.cx, A.R.cy], [A.R.cx, A.R.cy + 39], BLUE);
    T.dot(A.R.cx, A.R.cy, BLUE);
    T.lbl('F_G_2', A.R.cx + 8, A.R.cy + 40, BLUE);
    T.stepEnd();

    var y = 580;
    T.tanke(T.bubble(120, T.bubbleTop(420 + 94), bw, [
      [['Jag ser vikterna och snöret som']],
      [['ett system. Spännkraften är då']],
      [['en inre kraft och syns inte.']]
    ]));
    T.str('Newtons andra lag på hela systemet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('F_R=m·a⟺a=', padL, y);
    T.fracH('F_R', 'm_t_o_t', xa, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Den resulterande kraften är']],
      [['skillnaden mellan tyngderna.']],
      [['Massan är båda vikterna']],
      [['tillsammans.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_R=m_3·g-m_2·g',
      '    =3,0 kg·9,82 N/kg-2,0 kg·9,82 N/kg',
      '    =9,82 N',
      'm_t_o_t=m_3+m_2=3,0 kg+2,0 kg=5,0 kg'
    ], padL, y, T.s, F, { rs: 0.78 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=1,964 m/s^2',
          T.fracH('9,82', '5,0', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massorna']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2,0 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Skillnaden 1,0 kg är en femtedel']],
      [['av hela massan. Då blir a en']],
      [['femtedel av g. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 2,0 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: spännkraften när a = 1,964 m/s² är känd ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar trissan och vikterna.']],
      [['Den tyngre hänger till vänster.']]
    ], 400));
    var A = atwood(T);
    T.pause(150);
    lblV(T, 'm_3=3,0 kg', A.L.x0 - 10, A.L.cy + 6, BLUE);
    T.lbl('m_2=2,0 kg', A.R.x1 + 10, A.R.cy + 6, BLUE);
    T.stepEnd();

    /* frikroppsfigur för 2-kilosvikten, skalenligt 3 px/N:
     * F_S 23,568 N ger 71 px, F_G2 19,64 N ger 59 px */
    var fx0 = 400, fx1 = 446, fTop = 236, fBot = 272;
    var fcx = (fx0 + fx1) / 2, fcy = (fTop + fBot) / 2;
    T.tanke(T.figurBubble(292, [
      [['Ritar bara 2-kilosvikten med']],
      [['krafterna på den. Den lyfts']],
      [['uppåt, så spännkraften är']],
      [['större än tyngdkraften.']]
    ], 400));
    T.rect(fx0, fTop, fx1, fBot);
    T.lbl('m_2=2,0 kg', fx1 + 10, fcy + 6, BLUE);
    T.pause(150);
    T.arrow([fcx, fTop], [fcx, fTop - 71], BLUE);
    T.lbl('F_S', fcx + 8, fTop - 44, BLUE);
    T.pause(150);
    T.arrow([fcx, fcy], [fcx, fcy + 59], BLUE);
    T.dot(fcx, fcy, BLUE);
    T.lbl('F_G_2', fcx + 8, fcy + 58, BLUE);
    T.stepEnd();

    var y = 580;
    T.tanke(T.bubble(120, T.bubbleTop(400 + 118), bw, [
      [['Spännkraften syns bara när jag']],
      [['tittar på EN vikt. Jag väljer']],
      [['2-kilosvikten.']]
    ]));
    T.str('Newtons andra lag på den lätta vikten', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=F_S-F_G_2⟺F_S=F_R+F_G_2', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Den resulterande kraften är']],
      [['massan gånger accelerationen.']],
      [['Bara 2-kilosviktens massa']],
      [['räknas här.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_R=m_2·a=2,0 kg·1,964 m/s^2=3,928 N',
      'F_G_2=m_2·g=2,0 kg·9,82 N/kg=19,64 N'
    ], padL, y, T.s, F, { rs: 0.78 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('F_S=3,928+19,64=23,568 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massorna']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈24 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['24 N ligger mellan tyngderna']],
      [['19,64 N och 29,46 N. Den lätta']],
      [['vikten lyfts och den tunga']],
      [['sjunker. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 24 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: låda på bord med friktion, a) och b) ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ropeY = 210, bx0 = 160, bx1 = 240, bTop = 190, b = BD;
    var bcx = (bx0 + bx1) / 2, bcy = (bTop + b.yT) / 2;
    var hcx = (b.hx0 + b.hx1) / 2, hcy = (b.hTop + b.hBot) / 2;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan på bordet, trissan']],
      [['vid kanten och vikten som']],
      [['hänger i snöret.']]
    ], 420));
    var P = bord(T, ropeY);
    T.rect(bx0, bTop, bx1, b.yT);
    bordSnore(T, bx1, ropeY, P.pcy);
    T.pause(150);
    lblV(T, 'm_1=3,0 kg', bx0 - 6, bTop - 8, BLUE);
    T.lbl('m_2=2,0 kg', b.hx1 + 10, hcy + 6, BLUE);
    T.lbl('µ=0,20', 156, b.yT + 96, BLUE);
    T.stepEnd();

    /* skalenligt 3 px/N: F_N = F_G1 29,46 N ger 88 px, F_f 5,892 N ger
     * 18 px och F_G2 19,64 N ger 59 px */
    T.tanke(T.figurBubble(292, [
      [['Vikten drar systemet framåt med']],
      [['sin tyngd. Friktionen bromsar']],
      [['lådan. Bordet bär lådans tyngd.']]
    ], 420));
    T.arrow([hcx, hcy], [hcx, hcy + 59], BLUE);
    T.dot(hcx, hcy, BLUE);
    T.lbl('F_G_2', hcx + 8, hcy + 56, BLUE);
    T.pause(150);
    T.arrow([bx0, b.yT - 3], [bx0 - 18, b.yT - 3], BLUE);
    lblV(T, 'F_f', bx0 - 22, b.yT - 10, BLUE);
    T.pause(150);
    T.arrow([bcx + 3, b.yT], [bcx + 3, b.yT - 88], BLUE);
    T.lbl('F_N', bcx + 12, b.yT - 76, BLUE);
    T.pause(150);
    T.arrow([bcx - 3, bcy], [bcx - 3, bcy + 88], BLUE);
    T.dot(bcx - 3, bcy, BLUE);
    lblV(T, 'F_G_1', bcx - 12, bcy + 84, BLUE);
    T.stepEnd();

    /* ---- a) accelerationen ---- */
    var y = 570;
    T.tanke(T.bubble(120, T.bubbleTop(420 + 94), bw, [
      [['Lådan, snöret och vikten rör sig']],
      [['tillsammans. Jag ser dem som']],
      [['ett system.']]
    ]));
    T.str('a) Newtons andra lag på hela systemet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('F_R=m·a⟺a=', padL, y);
    var xf = T.fracH('F_R', 'm_t_o_t', xa, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Den resulterande kraften är']],
      [['viktens tyngd minus friktionen.']]
    ]));
    T.fracH('F_G_2-F_f', 'm_t_o_t', T.str('=', xf + 0.15 * F, y), y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Bordet är vågrätt, så lådans']],
      [['normalkraft är lika stor som dess']],
      [['tyngd. Massan är båda kropparna']],
      [['tillsammans.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_G_2=m_2·g=2,0 kg·9,82 N/kg=19,64 N',
      'F_f=µ·m_1·g=0,20·3,0 kg·9,82 N/kg=5,892 N',
      'm_t_o_t=m_1+m_2=3,0 kg+2,0 kg=5,0 kg'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=2,7496 m/s^2',
          T.fracH('19,64-5,892', '5,0', T.str('a=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massorna']],
      [['och friktionstalet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2,7 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Utan friktion hade det blivit']],
      [['cirka 3,9 m/s². Friktionen']],
      [['bromsar, så 2,7 m/s² är rimligt.']]
    ]));
    T.underline(T.str('Svar: 2,7 m/s^2', padL, y), y);
    T.stepEnd();

    /* ---- b) spännkraften ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Spännkraften syns bara om jag']],
      [['tittar på en kropp. Jag väljer']],
      [['lådan. Snöret drar den framåt.']]
    ]));
    /* spännkraften på lådan i figuren, 14,14 N ger 42 px längs snöret */
    T.arrow([bx1, ropeY], [bx1 + 42, ropeY], BLUE);
    T.lbl('F_S', bx1 + 12, ropeY - 10, BLUE);
    T.pause(200);
    T.str('b) Newtons andra lag på lådan', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=F_S-F_f⟺F_S=F_R+F_f', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Nu räknas bara lådans massa.']],
      [['Accelerationen och friktionen']],
      [['tar jag oavrundade från a).']]
    ]));
    klam = valueBracket(T.acts, [
      'F_R=m_1·a=3,0 kg·2,7496 m/s^2=8,2488 N',
      'F_f=5,892 N (från a)'
    ], padL, y, T.s, F, { rs: 0.78 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    xIns = T.str('F_S=8,2488+5,892=14,1408 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag, till två']],
      [['värdesiffror som i a).']]
    ]));
    y = avr(T, F, xIns, y, '≈14 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mindre än viktens tyngd 19,64 N,']],
      [['annars skulle vikten inte sjunka.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 14 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: den hängande massan som ger a = 2,0 m/s² ----
   * Massan m finns på två ställen: i den drivande tyngden och i den
   * totala massan. Ekvationen löses med båda led (fysik). */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ropeY = 202, b = BD;
    var vx0 = 160, vx1 = 240, vTop = 186, vBot = 214;
    var hcx = (b.hx0 + b.hx1) / 2, hcy = (b.hTop + b.hBot) / 2;
    var multIn = mkMultIn(T), samla = mkSamla(T);

    T.tanke(T.figurBubble(292, [
      [['Ritar vagnen på bordet, trissan']],
      [['vid kanten och vikten som']],
      [['hänger i snöret.']]
    ], 420));
    var P = bord(T, ropeY);
    T.rect(vx0, vTop, vx1, vBot);                     /* vagnen */
    T.circle(178, b.yT - 8, 8);
    T.circle(222, b.yT - 8, 8);
    bordSnore(T, vx1, ropeY, P.pcy);
    T.pause(150);
    lblV(T, 'm_v_a_g_n=3,0 kg', vx0 - 6, vTop - 8, BLUE);
    T.lbl('m', b.hx1 + 10, hcy + 6, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vagnen ska accelerera med']],
      [['2,0 m/s². Det enda som driver']],
      [['är viktens tyngd.']]
    ], 420));
    T.arrow([vx0 + 10, vTop - 40], [vx0 + 60, vTop - 40], BLUE);
    T.lbl('a=2,0 m/s^2', vx0 + 68, vTop - 34, BLUE);
    T.pause(150);
    T.arrow([hcx, hcy], [hcx, hcy + 44], BLUE);
    T.dot(hcx, hcy, BLUE);
    T.lbl('F_G=m·g', hcx + 8, hcy + 44, BLUE);
    T.stepEnd();

    var y = 570;
    T.tanke(T.bubble(120, T.bubbleTop(420 + 94), bw, [
      [['Utan friktion är viktens tyngd']],
      [['den resulterande kraften på hela']],
      [['systemet.']]
    ]));
    T.str('Newtons andra lag på hela systemet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m_t_o_t·a', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['m finns på två ställen: i den']],
      [['drivande tyngden och i den']],
      [['totala massan 3,0+m.']]
    ]));
    T.str('m·g=(3,0+m)·a', padL, y);
    T.stepEnd();

    y += adv + 1.5 * F;
    var klam = valueBracket(T.acts, ['g=9,82 N/kg', 'a=2,0 m/s^2'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i ekvationen.']]
    ]));
    var yB = y;
    var x = T.str('9,82·m=(', padL, y);
    var x30a = x; x = T.str('3,0', x, y); var x30b = x;
    x = T.str('+', x, y);
    var xma = x; x = T.str('m', x, y); var xmb = x;
    x = T.str(')·', x, y);
    var x2a = x; x = T.str('2,0', x, y); var x2b = x;
    T.stepEnd();

    y += 2.3 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Multiplicerar in 2,0 i']],
      [['parentesen, en term i taget.']]
    ]));
    x = T.str('9,82·m=', padL, y);
    var delar = [
      { fran: [x2a, x2b], till: [x30a, x30b], skriv: '6,0', hojd: 30, dx: -3 },
      { fran: [x2a, x2b], till: [xma, xmb], skriv: '+2,0·m', hojd: 20, dx: 3 }
    ];
    multIn(x, y, yB - 0.95 * F, delar);
    T.stepEnd();

    var yC = y;
    y += 2.3 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Samlar m i vänsterledet.']],
      [['Subtraherar 2,0·m i båda led.']]
    ]));
    var yD = y;
    x = T.str('9,82·m', padL, y); var xd = x;
    var xo1a = x; x = T.str('-2,0·m', x, y, BLUE); var xo1b = x;
    x = T.str('=6,0', x, y);
    var xq1a = x + T.adv('+'); x = T.str('+2,0·m', x, y); var xq1b = x;
    var xo2a = x; x = T.str('-2,0·m', x, y, BLUE); var xo2b = x;
    T.stepEnd();

    y += 2.1 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Slår ihop m-termerna till vänster.']],
      [['Till höger tar 2,0·m ut varandra.']]
    ]));
    x = samla(padL, y, [
      { ringar: [[padL, xd, yD], [xo1a, xo1b, yD]], skriv: '7,82·m' },
      { skriv: '=6,0' },
      { ringar: [[xq1a, xq1b, yD], [xo2a, xo2b, yD]], skriv: '' }
    ]);
    T.stepEnd();

    y += 3.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 1.4 * F), bw, [
      [['Dividerar båda led med 7,82 så']],
      [['att m blir ensamt kvar.']]
    ]));
    x = fracBla(T, F, '7,82·m', '7,82', padL, y);
    x = T.str('=', x + 0.1 * F, y);
    fracBla(T, F, '6,0', '7,82', x + 0.1 * F, y);
    T.stepEnd();

    y += 2.9 * F;
    var xIns = T.str('m=0,7672... kg', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Vagnens']],
      [['massa och accelerationen har']],
      [['två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,77 kg');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vikten är ungefär en femtedel av']],
      [['hela massan, och a är ungefär en']],
      [['femtedel av g. Det stämmer!']]
    ]));
    T.underline(T.str('Svar: 0,77 kg', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

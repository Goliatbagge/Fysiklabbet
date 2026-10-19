/* ovningar-penna/fy1-3.9.js: pennlösningar till övningarna i fy1-3.9
 * Exempel: accelerationens riktning.
 *
 * En scen per övning, registrerad som "ov-fy1-3.9-u<nr>" och kopplad till
 * övningen med fältet penna i data/ovningar.js (numret är övningens plats
 * i listan, 1 = första). Katalogen laddar filen först när en övning i
 * avsnittet visar sitt lösningsförslag (se Ovning i katalog.html).
 *
 * FYSIKENS redovisningsregler ur handskrift.js filhuvud gäller:
 *   - figuren först, i grafit, med givna värden och vektorer i BLÅTT,
 *   - kort rubrik i grafit + formeln med den sökta storheten utlöst,
 *   - mätvärdesklammern DIREKT under formeln,
 *   - insättningsraden utan ringar (klammern är gesten),
 *   - aldrig avrundning i mellanled, först i sista steget med ≈,
 *   - en rimlighetsbedömning i en bubbla FÖRE svarsraden,
 *   - svarsraden utan beteckning: "Svar: 1,6 m/s^2".
 * Hela avsnittet handlar om att skriva hastigheten MED TECKEN, så varje
 * figur har en blå pil för positiv riktning och hastighetspilar som
 * utgår från föremålets kant.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.9-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.9-u' + nr, fn); }

  function slut(T, y) {
    return { acts: T.acts, contentW: 660, lastBase: y + 40, padL: T.padL };
  }
  /* väg med skraffering */
  function vag(T, x0, x1, yR) {
    T.line([x0, yR], [x1, yR]);
    T.hatch([x1, yR], [x0, yR], 13);
  }
  /* bil med vänsterkanten i x0, hjulen på vägen yR: returnerar måtten */
  function bil(T, x0, yR) {
    var top = yR - 40, bot = yR - 14;
    T.rect(x0, top, x0 + 90, bot);
    T.line([x0 + 18, top], [x0 + 32, top - 20]);
    T.line([x0 + 32, top - 20], [x0 + 58, top - 20]);
    T.line([x0 + 58, top - 20], [x0 + 72, top]);
    T.circle(x0 + 20, yR - 10, 10);
    T.circle(x0 + 70, yR - 10, 10);
    return { x0: x0, x1: x0 + 90, top: top, cy: (top + bot) / 2 };
  }
  /* blå pil för positiv riktning med ett plustecken vid spetsen */
  function plusVagratt(T, x0, x1, y) {
    T.arrow([x0, y], [x1, y], BLUE);
    T.lbl('+', x1 + 8, y + 6, BLUE);
  }
  function plusLodratt(T, x, y0, y1) {
    T.arrow([x, y0], [x, y1], BLUE);
    T.lbl('+', x - 30, y1 + 10, BLUE);
  }
  /* nästa led på samma rad om arket räcker, annars på en ny rad med
   * indrag (pilzonen, se handskrift.js) */
  function plats(T, F, x, y, w) {
    if (x + w < HK.PAPER_W - 44) return [x, y];
    return [T.padL, y + 2.6 * F];
  }

  /* a = Δv/Δt = (v − v_0)/Δt med rubrik: returnerar baslinjen */
  function definition(T, F, y) {
    T.str('Accelerationen är hastighetens ändring per tidsenhet',
          T.padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var x = T.fracH('Δv', 'Δt', T.str('a=', T.padL, y), y);
    T.fracH('v-v_0', 'Δt', T.str('=', x + 0.15 * F, y), y);
    return y;
  }
  /* insättningen i tre led: a = (täljare)/(nämnare) = (skillnad)/(nämnare)
   * = resultat. Mellanledet får sin bubbla (teckenregeln). */
  function insattning(T, F, bw, y, num1, num2, den, res, bubbla) {
    var adv = 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var x = T.fracH(num1, den, T.str('a=', T.padL, y), y);
    T.stepEnd();

    var w = T.adv('=') + Math.max(T.adv(num2), T.adv(den)) + 0.5 * F;
    var p = plats(T, F, x + 0.15 * F, y, w);
    T.tanke(T.bubble(140, T.bubbleTop(p[1] + 0.9 * F), bw, bubbla));
    x = T.fracH(num2, den, T.str('=', p[0], p[1]), p[1]);
    y = p[1];
    T.stepEnd();

    p = plats(T, F, x + 0.15 * F, y, T.adv(res));
    T.str(res, p[0], p[1]);
    T.stepEnd();
    return p[1];
  }

  /* ---- Uppgift 1: bilen som kör åt vänster och bromsar ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yR = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar bilen som kör åt vänster.']],
      [['Positiv riktning är åt höger.']]
    ], 300));
    vag(T, 90, 410, yR);
    var B = bil(T, 290, yR);
    T.pause(150);
    plusVagratt(T, 100, 180, 120);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Bilen kör mot det negativa']],
      [['hållet. Hastigheten är alltså']],
      [['negativ hela vägen.']]
    ], 300));
    T.arrow([B.x0, B.cy], [B.x0 - 56, B.cy], BLUE);
    T.lbl('v<0', B.x0 - 50, B.cy - 14, BLUE);
    T.pause(150);
    T.dash([130, yR], [130, yR - 70]);
    T.lbl('stannar', 104, yR - 80);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Jag skriver hastigheten med']],
      [['tecken under inbromsningen,']],
      [['till exempel från −20 m/s.']]
    ]));
    T.str('Hastigheten med tecken under inbromsningen',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('v: -20 m/s blir -10 m/s blir 0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['−10 är större än −20, och 0 är']],
      [['större än −10. Hastigheten ökar.']]
    ]));
    T.str('hastigheten ökar ⇒ a>0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Att bilen bromsar säger bara att']],
      [['farten minskar. A och C tittar på']],
      [['fel sak, och B blandar ihop']],
      [['rörelse med acceleration.']]
    ]));
    T.underline(T.str('Svar: Alternativ D', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: accelerationen i vändläget ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yM = 300, r = 11;

    T.tanke(T.figurBubble(292, [
      [['Ritar bollen på väg upp, i']],
      [['vändläget och på väg ner.']],
      [['Positiv riktning är uppåt.']]
    ], 345));
    T.line([150, yM], [400, yM]);
    T.hatch([400, yM], [150, yM], 12);
    T.pause(150);
    T.circle(210, 220, r);
    T.circle(260, 120, r);
    T.circle(310, 220, r);
    T.pause(150);
    plusLodratt(T, 120, 290, 170);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Strax före vändläget är farten']],
      [['uppåt, strax efter nedåt.']]
    ], 345));
    T.arrow([210, 220 - r], [210, 220 - r - 40], BLUE);
    T.lbl('v>0', 150, 200, BLUE);
    T.pause(150);
    T.lbl('v=0', 278, 116, BLUE);
    T.pause(150);
    T.arrow([310, 220 + r], [310, 220 + r + 40], BLUE);
    T.lbl('v<0', 326, 254, BLUE);
    T.stepEnd();

    /* ---- hastigheten kring vändläget ---- */
    var y = 455;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Hastigheten är noll i vändläget,']],
      [['men jag tittar på hur den']],
      [['ändras där.']]
    ]));
    T.str('Hastigheten kring vändläget', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('strax före: v>0', padL, y);
    T.stepEnd();
    y += 1.6 * F;
    T.str('i vändläget: v=0', padL, y);
    T.stepEnd();
    y += 1.6 * F;
    T.str('strax efter: v<0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Från positiv via noll till']],
      [['negativ: hastigheten minskar']],
      [['även i vändläget.']]
    ]));
    T.str('hastigheten minskar ⇒ a<0', padL, y);
    T.stepEnd();

    /* ---- värdet ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften ger accelerationen.']],
      [['Den verkar hela kastet, även i']],
      [['vändläget, och pekar nedåt.']]
    ]));
    T.str('Tyngdkraften ger accelerationen under hela kastet',
          padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('a=-g=-9,82 m/s^2', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Vore accelerationen noll i']],
      [['vändläget skulle bollen bli']],
      [['hängande i luften. Därför är']],
      [['det inte alternativ B.']]
    ]));
    T.underline(T.str('Svar: Alternativ A', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: stenen som faller ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var xs = 250, r = 10, k = 6;              /* 6 px per m/s */

    T.tanke(T.figurBubble(292, [
      [['Ritar stenen vid de två']],
      [['tillfällena. Positiv riktning']],
      [['är uppåt.']]
    ], 320));
    T.circle(xs, 110, r);
    T.circle(xs, 220, r);
    T.pause(150);
    plusLodratt(T, 150, 290, 170);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Stenen faller nedåt, så båda']],
      [['hastigheterna är negativa. Den']],
      [['senare pilen är längre.']]
    ], 320));
    T.arrow([xs, 110 + r], [xs, 110 + r + 3.0 * k], BLUE);
    T.lbl('v_0=-3,0 m/s', xs + 16, 134, BLUE);
    T.pause(150);
    T.arrow([xs, 220 + r], [xs, 220 + r + 7.9 * k], BLUE);
    T.lbl('v=-7,9 m/s', xs + 16, 262, BLUE);
    T.pause(150);
    T.lbl('Δt=0,50 s', xs + 16, 184, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen är hastighetens']],
      [['ändring delad med tiden.']]
    ]));
    y = definition(T, F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Stenen rör sig i negativ riktning.']],
      [['Båda hastigheterna får därför']],
      [['minustecken, fast farterna står']],
      [['utan tecken i uppgiften.']]
    ]));
    var klam = valueBracket(T.acts,
      ['v_0=-3,0 m/s', 'v=-7,9 m/s', 'Δt=0,50 s'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    y = insattning(T, F, bw, y, '-7,9-(-3,0)', '-4,9', '0,50',
                   '=-9,8 m/s^2', [
      [['Minus ett negativt tal blir plus:']],
      [['−7,9+3,0=−4,9.']]
    ]);

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Farten ökar men hastigheten']],
      [['minskar. 9,8 m/s² är tyngd-']],
      [['accelerationen, som i fritt fall.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: -9,8 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: hissen som bromsar på väg nedåt ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var hx0 = 210, hx1 = 290, hTop = 130, hBot = 220;

    T.tanke(T.figurBubble(292, [
      [['Ritar hissen i sin lina.']],
      [['Positiv riktning är uppåt.']]
    ], 320));
    T.line([190, 70], [310, 70]);
    T.hatch([190, 70], [310, 70], 10);
    T.line([250, 70], [250, hTop]);
    T.rect(hx0, hTop, hx1, hBot);
    T.pause(150);
    plusLodratt(T, 140, 270, 150);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Hissen åker nedåt, så start-']],
      [['hastigheten är negativ. Den']],
      [['stannar efter 2,5 s.']]
    ], 320));
    T.arrow([250, hBot], [250, hBot + 48], BLUE);
    T.lbl('v_0=-4,0 m/s', 264, hBot + 40, BLUE);
    T.pause(150);
    T.lbl('v=0', hx1 + 14, 160, BLUE);
    T.lbl('Δt=2,5 s', hx1 + 14, 196, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Accelerationen är hastighetens']],
      [['ändring delad med tiden.']]
    ]));
    y = definition(T, F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Starthastigheten får minus-']],
      [['tecken, hissen åker nedåt.']],
      [['Sluthastigheten är noll.']]
    ]));
    var klam = valueBracket(T.acts,
      ['v_0=-4,0 m/s', 'v=0', 'Δt=2,5 s'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    y = insattning(T, F, bw, y, '0-(-4,0)', '4,0', '2,5', '=1,6 m/s^2', [
      [['Noll minus ett negativt tal blir']],
      [['positivt: 0+4,0=4,0.']]
    ]);

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Hastigheten går från −4,0 upp']],
      [['mot 0, den ökar. Då ska']],
      [['accelerationen vara positiv,']],
      [['och det är den. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,6 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: i vilket fall är accelerationen negativ? ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yR = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar bilen på vägen. Positiv']],
      [['riktning är åt höger.']]
    ], 300));
    vag(T, 90, 410, yR);
    bil(T, 200, yR);
    T.pause(150);
    plusVagratt(T, 100, 180, 120);
    T.stepEnd();

    var fall = [
      ['A) åt höger, ökar farten', 'v: 5 m/s blir 10 m/s',
       'hastigheten ökar ⇒ a>0',
       [[['Jag skriver hastigheten med']], [['tecken i början och i slutet.']],
        [['Åt höger är den positiv.']]]],
      ['B) åt vänster, bromsar in', 'v: -10 m/s blir -5 m/s',
       'hastigheten ökar ⇒ a>0',
       [[['Åt vänster är hastigheten']], [['negativ. −5 är större än −10,']],
        [['så hastigheten ökar.']]]],
      ['C) åt vänster, ökar farten', 'v: -5 m/s blir -10 m/s',
       'hastigheten minskar ⇒ a<0',
       [[['Farten ökar, men −10 är mindre']], [['än −5. Hastigheten minskar!']]]],
      ['D) står stilla', 'v: 0 hela tiden',
       'hastigheten ändras inte ⇒ a=0',
       [[['Står bilen still ändras']], [['hastigheten inte alls.']]]]
    ];

    var y = 380;
    fall.forEach(function (f, i) {
      y += (i === 0 ? 0 : adv + 1.6 * F);
      T.tanke(T.bubble(120, T.bubbleTop(y - adv, i === 0 ? 1.2 : 0.3), bw,
                       f[3]));
      T.str(f[0], padL, y, null, 0.62);
      T.pause(300);
      y += 1.9 * F;
      T.str(f[1], padL, y);
      T.stepEnd();
      y += 1.6 * F;
      T.str(f[2], padL, y);
      T.stepEnd();
    });

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bara i C minskar hastigheten.']],
      [['Accelerationen pekar då åt det']],
      [['negativa hållet, fast bilen gasar.']]
    ]));
    T.underline(T.str('Svar: Alternativ C', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: tennisbollens studs ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 280, r = 12, k = 9;              /* 9 px per m/s */

    T.tanke(T.figurBubble(292, [
      [['Ritar bollen före, under och']],
      [['efter studsen. Positiv riktning']],
      [['är uppåt.']]
    ], 330));
    T.line([150, yG], [400, yG]);
    T.hatch([400, yG], [150, yG], 12);
    T.pause(150);
    T.circle(200, 180, r);
    T.circle(260, yG - r, r);
    T.circle(320, 180, r);
    T.pause(150);
    plusLodratt(T, 120, 270, 160);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Före studsen rör sig bollen']],
      [['nedåt, efter studsen uppåt.']],
      [['Pilarna ritas skalenligt.']]
    ], 330));
    T.arrow([200, 180 + r], [200, 180 + r + 5.0 * k], BLUE);
    T.lbl('v_0=-5,0 m/s', 214, 222, BLUE);
    T.pause(150);
    T.arrow([320, 180 - r], [320, 180 - r - 4.0 * k], BLUE);
    T.lbl('v=+4,0 m/s', 334, 166, BLUE);
    T.pause(150);
    T.lbl('Δt=0,010 s', 282, 264, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Fällan är att räkna med']],
      [['farterna. Accelerationen följer']],
      [['hastighetens ändring, med tecken.']]
    ]));
    y = definition(T, F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Nedåt före studsen ger minus,']],
      [['uppåt efter studsen ger plus.']]
    ]));
    var klam = valueBracket(T.acts,
      ['v_0=-5,0 m/s', 'v=+4,0 m/s', 'Δt=0,010 s'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    y = insattning(T, F, bw, y, '4,0-(-5,0)', '9,0', '0,010',
                   '=900 m/s^2', [
      [['Minus ett negativt tal blir plus:']],
      [['4,0+5,0=9,0.']]
    ]);

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bollen ska stoppas och få upp']],
      [['farten åt andra hållet på en']],
      [['hundradels sekund. Ungefär']],
      [['90 gånger g. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 900 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

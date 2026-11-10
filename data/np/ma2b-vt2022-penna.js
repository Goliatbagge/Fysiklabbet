/* ma2b-vt2022-penna.js — pennlösningar till Nationellt prov Ma 2b, VT 2022.
 *
 * Bara 2b-provets EGNA uppgifter (6, 8, 9 och 18) har scener här. De
 * lånade uppgifterna använder 2c-provets scener (ma2c-vt2022-u<nr>), som
 * data/np/ma2b-vt2022.js pekar ut med fältet penna.
 *
 * Uppgift 6 och 8 är 2c-provets scener med de delar bytta som skiljer sig:
 * i 6 är b) och c) andra ekvationer, och 8 är bara 2c-provets a-del.
 *
 * Reglerna står i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de
 * som oftast bränner: inget bläck vid x > 696 eller x < 24, inget med
 * x > 420 ovanför y = 150 (y = 210 i ekvval-scener), en tanke per led
 * direkt före ledet, division alltid med vågrätt streck, logaritmera båda
 * led i en egen rad innan exponenten flyttas ned, och samma antal
 * klicksteg i båda ekvationsredovisningarna (cfg.vagg + ekvval: 1).
 *
 * Samma siffror och samma avrundning som textlösningen i
 * data/np/ma2b-vt2022.js — eleven växlar mellan vyerna.
 *
 * Granskning: node .claude/verify-handskrift.js ma2b-vt2022-u6 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkEkvOp = V.mkEkvOp, humanize = V.humanize, expFrac = V.expFrac,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma2b-vt2022-u' + nr, fn); }

  /* BRÅK MED NEDSTAPEL I TÄLJAREN ("lg 7" över "lg 5"): g-svansen når
   * 0,26·F under sin baslinje och skulle gå rakt igenom bråkstrecket med
   * fracH:s vanliga täljarläge. Täljaren lyfts därför lift·F (standard
   * 0,26) — i övrigt exakt fracH. Returnerar nästa x. (Samma hjälpare som
   * i ma2c-vt2022-penna.js.) */
  function fracLift(T, F, numS, denS, x0, yb, lift, col) {
    lift = lift == null ? 0.26 : lift;
    var ybar = yb - 0.34 * F, nw = T.adv(numS), dw = T.adv(denS);
    var w = Math.max(nw, dw) + 0.3 * F;
    T.str(numS, x0 + (w - nw) / 2, ybar - (0.14 + lift) * F);
    T.pause(130);
    T.acts.push({ kind: 'stroke', color: col || null, pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(130);
    T.str(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, col || null);
    return x0 + w + 1.5;
  }

  /* ---- Uppgift 6: fem ekvationer, svara exakt ----
   * a), d) och e) är desamma som i 2c-provet (ma2c-vt2022-u6). b) är en
   * potensekvation där lg 1000 räknas ut, c) en exponentialekvation som
   * logaritmeras i två rader och ger x = 1/(2·lg 3) efter förkortning. */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    /* väggens x räknas ut ur den bredaste raden i sin deluppgift */
    var xwC = padL + T.adv('4x·lg 3=2·lg 10') + 0.9 * F;
    var xwD = padL + T.adv('−9x^2+24x-16=−9x^2') + 0.9 * F;

    /* ---- a) 5^x = 7 ---- */
    y = 118;
    T.str('a) 5^x=7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x står i exponenten. Jag']],
      [['logaritmerar båda led.']]
    ]);
    y += 2.6 * F;
    T.str('lg 5^x=lg 7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen lg a^x=x·lg a']],
      [['flyttar ned exponenten som']],
      [['en faktor.']]
    ]);
    y += 2.6 * F;
    T.str('x·lg 5=lg 7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med lg 5.']],
      [['Svaret ska vara exakt, så']],
      [['kvoten lämnas som den är.']]
    ]);
    y += 3.4 * F;
    xx = T.str('x=', padL, y);
    fracLift(T, F, 'lg 7', 'lg 5', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: x=', padL, y);
    xe = fracLift(T, F, 'lg 7', 'lg 5', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) lg 1000 + 97 = 10^x ---- */
    y += 4.0 * F;
    T.str('b) lg 1000+97=10^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['lg 1000 är den exponent som 10']],
      [['ska upphöjas till för att ge']],
      [['1000. 10^3=1000, så lg 1000=3.']]
    ]);
    y += 2.6 * F;
    T.str('3+97=10^x', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('100=10^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['100=10^2. Två potenser med samma']],
      [['bas är lika precis när']],
      [['exponenterna är lika.']]
    ]);
    y += 2.6 * F;
    T.str('10^2=10^x', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('x=2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: x=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) 3^(4x) = 10^2 ---- */
    y += 3.0 * F;
    T.str('c) 3^4^x=10^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x står i exponenten. Jag']],
      [['logaritmerar båda led.']]
    ]);
    y += 2.6 * F;
    T.str('lg 3^4^x=lg 10^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen flyttar ned']],
      [['exponenterna i båda led som']],
      [['faktorer.']]
    ]);
    y += 2.6 * F;
    T.str('4x·lg 3=2·lg 10', padL, y);
    T.stepEnd();

    tanke(y, [
      [['lg 10=1, eftersom 10^1=10.']]
    ]);
    y += 2.4 * F;
    T.str('4x·lg 3=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 4·lg 3, så']],
      [['jag dividerar båda led med']],
      [['4·lg 3.']]
    ]);
    y = ekvOp(y, '/4·lg 3', xwC, function (yy) {
      var x2 = fracLift(T, F, '4x·lg 3', '4·lg 3', padL, yy, null, BLUE);
      x2 = T.str('=', x2, yy);
      T.fracH('2', '4·lg 3', x2, yy, null, BLUE);
    }, { dy: 3.2, dyRes: 3.4 });
    if (vagg) y += 1.0 * F;

    tanke(y, [
      [['Bråket förkortas med 2, så att']],
      [['svaret står på enklaste form.']]
    ]);
    xx = T.str('x=', padL, y);
    xx = T.fracOp('2', '4·lg 3', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '2·lg 3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: x=', padL, y);
    xe = T.fracH('1', '2·lg 3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- d) (3x−4)(4−3x) = −9x² ---- */
    /* extra luft: bågarna över d-raden får inte nå svarsstrecket ovanför */
    y += 4.8 * F;
    var yD = y;
    xx = T.str('d) (', padL, y);
    var a0 = xx; xx = T.str('3x', xx, y);  var a1 = xx;
    var b0 = xx; xx = T.str('-4', xx, y);  var b1 = xx;
    xx = T.str(')(', xx, y);
    var c0 = xx; xx = T.str('4', xx, y);   var c1 = xx;
    var d0 = xx; xx = T.str('-3x', xx, y); var d1 = xx;
    xx = T.str(')=−9x^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Varje term i första parentesen']],
      [['multipliceras med varje term i']],
      [['den andra: fyra produkter.']]
    ]);
    /* båge → produkt, båge → produkt (REGEL MULTIPLICERA IN I PARENTES) */
    y += 2.6 * F;
    xx = multIn(padL, y, yD - 0.95 * F, [
      { fran: [a0, a1], till: [c0, c1], skriv: '12x', hojd: 26, dx: -4, dx2: -4 },
      { fran: [a0, a1], till: [d0, d1], skriv: '-9x^2', hojd: 48, dx: 4 },
      { fran: [b0, b1], till: [c0, c1], skriv: '-16', hojd: 20, dx: -4, dx2: 4 },
      { fran: [b0, b1], till: [d0, d1], skriv: '+12x', hojd: 36, dx: 4, dx2: 4 }
    ]);
    T.str('=−9x^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samla lika termer:']],
      [['12x+12x=24x.']]
    ]);
    y += 2.4 * F;
    T.str('−9x^2+24x-16=−9x^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['−9x^2 finns i båda led. Jag']],
      [['adderar 9x^2 till båda led, så']],
      [['försvinner kvadrattermen.']]
    ]);
    if (vagg) {
      T.vaggOp('+9x^2', xwD, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      /* raden är bred: den börjar vid padL så att den ryms före pilzonen */
      y += 2.4 * F;
      xx = T.str('−9x^2+24x-16', padL, y);
      xx = T.str('+9x^2', xx, y, BLUE);
      xx = T.str('=−9x^2', xx, y);
      T.str('+9x^2', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('24x-16=0', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('24x=16', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 24, så jag']],
      [['dividerar båda led med 24.']]
    ]);
    if (vagg) {
      T.vaggOp('/24', xwD, y);
      T.stepEnd();
      y += 2.4 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('24x', '24', padL, y);
      xx = T.str('=', xx, y);
      T.fracH('16', '24', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    tanke(y - (vagg ? 0 : 3.2 * F), [
      [['Bråket 16/24 förkortas med 8.']]
    ], vagg ? 0.28 : 1.05);
    xx = T.str('x=', padL, y);
    xx = T.fracOp('16', '24', '/8', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('2', '3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: x=', padL, y);
    xe = T.fracH('2', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- e) (5987−x)² − 2(5987−x) = 0 ---- */
    y += 4.0 * F;
    T.str('e) (5987-x)^2-2(5987-x)=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Utveckla inte! Parentesen']],
      [['(5987-x) finns i båda termerna,']],
      [['så jag bryter ut den.']]
    ]);
    y += 2.6 * F;
    T.str('(5987-x)(5987-x-2)=0', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('(5987-x)(5985-x)=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nollproduktmetoden: en produkt']],
      [['är noll precis när någon faktor']],
      [['är noll. Varje faktor sätts']],
      [['lika med noll för sig.']]
    ]);
    y += 2.6 * F;
    T.str('5987-x=0 ⟺ x_1=5987', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('5985-x=0 ⟺ x_2=5985', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: x_1=5987 och x_2=5985', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 8: en andragradsfunktion med symmetrilinjen x = 3 ----
   * Samma lösning som a-delen i 2c-provets uppgift 8: grundparabeln
   * flyttas tre steg åt höger, och symmetrilinjens formel kontrollerar. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* utvecklingen skrivs på egen rad: hela likheten på rad 1 skulle nå
     * in i inställningsrutans mobilzon (x>420, y<150) */
    y = 118;
    T.str('y=(x-3)^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Symmetrilinjen går genom vertex.']],
      [['Flyttar jag y=x^2 tre steg åt']],
      [['höger hamnar vertex i (3, 0).']],
      [['(x-3)^2 utvecklas med andra']],
      [['kvadreringsregeln.']]
    ]);
    y += 2.4 * F;
    T.str('=x^2-6x+9', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: för y=ax^2+bx+c ligger']],
      [['symmetrilinjen i x=-b/(2a). Här']],
      [['är a=1 och b=−6.']]
    ]);
    y += 4.4 * F;
    T.str('Symmetrilinjen', padL, y - 2.1 * F, null, 0.62);
    xx = T.str('x=−', padL, y);
    xx = T.fracH('b', '2a', xx, y);
    xx = T.str('=−', xx, y);
    xx = T.fracH('−6', '2·1', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('6', '2', xx, y);
    T.str('=3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: Till exempel y=(x-3)^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: vilka två diagram har r > 0,8? ----
   * Diagrammen står redan i uppgiften och ritas inte av (REGEL "RITA BARA
   * AV DET SOM BEHÖVS"). Pennan gallrar i två steg: först de diagram där
   * linjen lutar nedåt (r negativt), sedan de utspridda (r långt från 1).
   * Kvar blir A och F. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('r>0,8', padL, y);
    T.stepEnd();

    tanke(y, [
      [['r mäter hur nära punkterna']],
      [['ligger en rät linje, inte hur']],
      [['brant linjen lutar. Tecknet']],
      [['visar riktningen.']]
    ]);
    y += 2.6 * F;
    T.str('Kräver: linjen lutar uppåt', padL, y);
    y += 2.0 * F;
    T.str('och punkterna ligger tätt.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En linje som lutar nedåt ger']],
      [['negativt r, och ett negativt']],
      [['tal är aldrig större än 0,8.']]
    ]);
    y += 2.8 * F;
    T.str('C: på linjen, lutar nedåt ⟹ r=−1', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('D: tätt, lutar nedåt ⟹ r nära −1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['B och E lutar uppåt, men']],
      [['punkterna är utspridda över en']],
      [['stor yta. Då är r långt från 1.']]
    ]);
    y += 2.8 * F;
    T.str('B, E: utspridda ⟹ svag korrelation', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I A och F ligger punkterna tätt']],
      [['längs en uppåtlutande linje.']],
      [['Att F är flack spelar ingen roll.']]
    ]);
    y += 2.8 * F;
    T.str('A, F: tätt, uppåt ⟹ r nära 1', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: A och F', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 18: 7^(x/5) = 1,3 ----
   * Båda led logaritmeras i en egen rad, logaritmlagen flyttar ned
   * exponenten x/5, båda led multipliceras med 5 och divideras med lg 7.
   * Kvoten räknas ut först i sista steget: 0,6741… ≈ 0,67. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + T.adv('x·lg 7=5·lg 1,3') + 0.9 * F;

    y = 118;
    xx = T.str('7', padL, y);
    xx = expFrac(T, F, 'x', '5', xx, y);
    T.str('=1,3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x står i exponenten. Jag']],
      [['logaritmerar båda led.']]
    ]);
    y += 2.8 * F;
    xx = T.str('lg 7', padL, y);
    xx = expFrac(T, F, 'x', '5', xx, y);
    T.str('=lg 1,3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Logaritmlagen lg a^p=p·lg a']],
      [['flyttar ned exponenten x/5']],
      [['som en faktor.']]
    ]);
    y += 3.2 * F;
    xx = T.fracH('x', '5', padL, y);
    T.str('·lg 7=lg 1,3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x divideras med 5, så jag']],
      [['multiplicerar båda led med 5.']]
    ]);
    y = ekvOp(y, '·5', xw, function (yy) {
      /* faktorn skrivs FÖRE ledet: "lg 7·5" kunde läsas som lg(7·5) */
      var x2 = T.str('5·', padL, yy, BLUE);
      x2 = T.fracH('x', '5', x2, yy);
      x2 = T.str('·lg 7=', x2, yy);
      x2 = T.str('5·', x2, yy, BLUE);
      T.str('lg 1,3', x2, yy);
    }, { dy: 3.2, dyRes: 2.6 });
    T.str('x·lg 7=5·lg 1,3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med lg 7, så jag']],
      [['dividerar båda led med lg 7.']]
    ]);
    /* division med lyft täljare: g-svansen i "lg" skulle annars gå
     * igenom bråkstrecket */
    y = ekvOp(y, '/lg 7', xw, function (yy) {
      var x2 = fracLift(T, F, 'x·lg 7', 'lg 7', padL, yy, null, BLUE);
      x2 = T.str('=', x2, yy);
      fracLift(T, F, '5·lg 1,3', 'lg 7', x2, yy, null, BLUE);
    }, { dy: 3.2, dyRes: 3.4 });
    if (vagg) y += 1.0 * F;

    tanke(y, [
      [['Nu räknar jag ut kvoten, och']],
      [['avrundar först här, i sista']],
      [['steget.']]
    ]);
    xx = T.str('x=', padL, y);
    xx = fracLift(T, F, '5·lg 1,3', 'lg 7', xx, y);
    T.str('=0,6741...≈0,67', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 7 upphöjt till']],
      [['0,6741/5 ger 1,30. Stämmer.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x≈0,67', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

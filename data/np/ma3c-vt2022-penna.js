/* ma3c-vt2022-penna.js — pennlösningar till Nationellt prov Ma 3c, VT 2022.
 *
 * En scen per uppgift, registrerad som "ma3c-vt2022-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de som oftast
 * bränner: inget bläck vid x > 696 eller x < 24, inget med x > 420 ovanför
 * y = 150 (y = 210 i ekvval-scener), en tanke per led direkt före ledet,
 * division alltid med vågrätt streck, och samma antal klicksteg i båda
 * ekvationsredovisningarna.
 *
 * Kursen är derivata och integraler, så pennan skriver mycket f'(x),
 * ∫ … dx och [ … ]-klamrar. Prim-glyfen och integraltecknet finns i
 * handskrift.js; gränserna sätts med ^ och _ efter tecknet ("∫_0^3",
 * "]_1^2") — se placeString.
 *
 * Granskning: node .claude/verify-handskrift.js ma3c-vt2022-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkAxes = V.mkAxes, substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, expFrac = V.expFrac, bigParen = V.bigParen,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma3c-vt2022-u' + nr, fn); }

  /* GRÄNSVÄRDESSYMBOL — "lim" med "h→0" litet under. Returnerar nästa x. */
  function limSym(T, F, x0, yb) {
    var x1 = T.str('lim', x0, yb);
    var w = T.adv('h→0', 0.5);
    T.str('h→0', x0 + (x1 - x0) / 2 - w / 2, yb + 0.62 * F, null, 0.5);
    return Math.max(x1, x0 + (x1 - x0) / 2 + w / 2) + 0.16 * F;
  }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 1: vilken funktion är primitiv till f? ----
   * Vändningen: i stället för att integrera deriverar man alternativen
   * och ser vilket som ger tillbaka f. */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(x)=x^3-2x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['F är en primitiv funktion till']],
      [['f om F’(x)=f(x). Alltså deriverar']],
      [['jag alternativen och ser vilket']],
      [['som ger tillbaka f.']]
    ]);
    /* kommentaren sätts efter radens slut, aldrig på en fast kolumn —
     * D-raden är bredast och skulle annars skrivas in i sin egen text */
    var xKom = padL + 320;
    function alt(rad, kommentar) {
      var xr = T.str(rad, padL, y);
      T.str(kommentar, Math.max(xr + 0.7 * F, xKom), y, null, 0.62);
      T.stepEnd();
    }
    y += 2.8 * F;
    alt('A: F’(x)=6x', 'fel');

    y += 2.3 * F;
    alt('B: F’(x)=x^3-4', 'fel');

    y += 2.3 * F;
    alt('C: F’(x)=x^3-2x', 'stämmer');

    y += 2.3 * F;
    alt('D: F’(x)=4x^3-4x', 'fel');

    tanke(y, [
      [['I C blir x^4/4 deriverat till x^3']],
      [['och x^2 till 2x. Precis f.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: alternativ C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 2: gråsälarna ----
   * Genomsnittlig förändringshastighet är ändringskvoten mellan de två
   * årtal frågan gäller — mellanliggande år spelar ingen roll. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('2015: 31 000 sälar', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2018: 34 000 sälar', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Genomsnittlig förändrings-']],
      [['hastighet är ändringskvoten:']],
      [['förändringen i antal delat med']],
      [['förändringen i tid.']]
    ]);
    y += 3.2 * F;
    xx = T.str('', padL, y);
    xx = T.fracH('Δy', 'Δx', padL, y);
    xx = T.str('=', xx, y);
    T.fracH('34 000-31 000', '2018-2015', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('3 000', '3', xx, y);
    T.str('=1 000', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Mellanåren spelar ingen roll —']],
      [['genomsnittet ser bara på början']],
      [['och slutet.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: 1 000 sälar per år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: absolutbeloppet |3x-7| för x=2 ---- */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    var e0 = padL, e1 = T.str('|3x-7|', padL, y), yE = y;
    T.stepEnd();

    y += 2.3 * F;
    var v0 = padL, v1 = T.str('x=2', padL, y), yV = y;
    T.stepEnd();

    tanke(y, [
      [['Först räknar jag ut vad som']],
      [['står INNANFÖR beloppstecknen.']]
    ]);
    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.4 * F;
    T.str('|3·2-7|=|6-7|=|-1|', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Absolutbeloppet är avståndet']],
      [['till noll, och avstånd är aldrig']],
      [['negativa. Minustecknet faller']],
      [['bort.']]
    ]);
    y += 2.6 * F;
    T.str('|-1|=1', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: derivera tre funktioner ----
   * a) potensregeln termvis, b) bråket skrivs om till en potens med
   * negativ exponent, c) potensen vänds upp innan den deriveras. */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 118;
    T.str('a) f(x)=4x^3-12x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Potensregeln: exponenten ned']],
      [['som faktor, och en lägre']],
      [['exponent. Term för term.']]
    ]);
    y += 2.6 * F;
    T.str('f’(x)=3·4x^2-12=12x^2-12', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: f’(x)=12x^2-12', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) står ett x i en nämnare.']],
      [['Det skriver jag om till en']],
      [['potens med negativ exponent,']],
      [['så duger potensregeln.']]
    ]);
    y += 2.9 * F;
    xx = T.str('b) f(x)=ax^2-', padL, y);
    T.fracH('4', 'x', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    T.str('=ax^2-4x^-^1', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['a är en konstant, så ax^2']],
      [['deriveras till 2ax. Och -1 ned']],
      [['som faktor ger -(-4)=+4.']]
    ]);
    y += 2.6 * F;
    T.str('f’(x)=2ax+4x^-^2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: f’(x)=2ax+4x^-^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['I c) står potensen i nämnaren.']],
      [['Vänder jag upp den byter']],
      [['exponenten tecken.']]
    ]);
    y += 2.9 * F;
    xx = T.str('c) f(x)=', padL, y);
    xx = T.fracH('1', '3^-^2^x', xx, y);
    T.str('=3^2^x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Derivatan av a^x är a^x·ln a.']],
      [['Här är basen 3 och exponenten']],
      [['2x, så ln-faktorn blir ln 3^2.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('f’(x)=3^2^x·ln 3^2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar c: f’(x)=3^2^x·ln 3^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 7: förenkla tre uttryck ----
   * a) termvis division, b) faktorisera och förkorta, c) bryt ut e^x. */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 122;
    xx = T.str('a) ', padL, y);
    T.fracH('5x^3-x^6', 'x^3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråkstrecket gäller hela']],
      [['täljaren, så jag kan dela upp']],
      [['det i två bråk med samma']],
      [['nämnare.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('5x^3', 'x^3', xx, y);
    xx = T.str('-', xx, y);
    T.fracH('x^6', 'x^3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samma bas i täljare och nämnare:']],
      [['exponenterna subtraheras. I']],
      [['första bråket tar x^3 ut varandra']],
      [['helt.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('=5-x^3', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: 5-x^3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) går det inte att dela']],
      [['termvis. I stället faktoriserar']],
      [['jag täljare och nämnare och']],
      [['letar gemensamma faktorer.']]
    ]);
    y += 3.0 * F;
    xx = T.str('b) ', padL, y);
    T.fracH('2x^2+12x+18', '2(x^2-9)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Täljaren: bryt ut 2, och x^2+6x+9']],
      [['är kvadreringsregeln baklänges.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('täljare=2(x^2+6x+9)=2(x+3)^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nämnaren: x^2-9 är konjugat-']],
      [['regeln baklänges, alltså']],
      [['(x+3)(x-3).']]
    ]);
    y += 2.6 * F;
    T.str('nämnare=2(x+3)(x-3)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu syns de gemensamma']],
      [['faktorerna: en tvåa och en']],
      [['parentes (x+3).']]
    ]);
    y += 3.0 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('2(x+3)^2', '2(x+3)(x-3)', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('x+3', 'x-3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar b: ', padL, y);
    xe = T.fracH('x+3', 'x-3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['I c) står e^x som faktor i båda']],
      [['termerna i täljaren. Den bryter']],
      [['jag ut.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('c) ', padL, y);
    T.fracH('2e^x·e^-^a^x-e^x', 'e^-^a^x-0,5', xx, y);
    T.stepEnd();

    y += 3.6 * F;
    xx = T.str('täljare=e^x(2e^-^a^x-1)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nämnaren ser annorlunda ut, men']],
      [['multiplicerar jag den med 2 får']],
      [['jag precis parentesen. Alltså är']],
      [['nämnaren parentesen delad med 2.']]
    ]);
    y += 3.0 * F;
    xx = T.str('nämnare=', padL, y);
    T.fracH('2e^-^a^x-1', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Att dividera med ett bråk är']],
      [['att multiplicera med det']],
      [['omvända. Parenteserna tar ut']],
      [['varandra.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('=e^x·2=2e^x', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar c: 2e^x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 8: lös 3x^4-8x=2x^4 ----
   * Fällan är att dividera med x och tappa lösningen x=0. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + T.adv('3x^4-8x=2x^4') + 0.9 * F;

    y = 252;
    T.str('3x^4-8x=2x^4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag samlar allt i vänsterledet:']],
      [['subtraherar 2x^4 från båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-2x^4', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('3x^4-8x', padL + 30, y);
      xx = T.str('-2x^4', xx, y, BLUE);
      xx = T.str('=2x^4', xx, y);
      T.str('-2x^4', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('x^4-8x=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Frestande att dividera med x —']],
      [['men då försvinner lösningen']],
      [['x=0! Jag bryter ut x i stället.']]
    ]);
    y += 2.6 * F;
    T.str('x(x^3-8)=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['En produkt är noll om NÅGON']],
      [['faktor är noll. Alltså två fall.']]
    ]);
    y += 2.5 * F;
    T.str('x=0   eller   x^3-8=0', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xx = T.str('x^3=8 ⟺ x=', padL + 30, y);
    xx = T.rot('8', xx, y, 3);
    T.str('=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll av x=2: 3·16-16=32 och']],
      [['2·16=32. Stämmer. Och x=0 ger']],
      [['0=0.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x_1=0 och x_2=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 12: har Tilde rätt om kvoten? ----
   * Kvoten förenklas — e-potenserna tar ut varandra och 2 blir kvar. */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(x)=e^2^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Derivatan av e upphöjt till 2x']],
      [['är 2 gånger samma potens:']],
      [['exponentens faktor kommer ned,']],
      [['men potensen står kvar.']]
    ]);
    y += 2.6 * F;
    T.str('f’(x)=2e^2^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu bildar jag kvoten. Samma']],
      [['potens står i täljare och']],
      [['nämnare.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.fracH('f’(x)', 'f(x)', padL, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('2e^2^x', 'e^2^x', xx, y);
    T.str('=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Ingenting av detta beror på x —']],
      [['potenserna förkortas bort']],
      [['oavsett vilket x man väljer.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('Kvoten är 2 för ALLA x.', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: ja, Tilde har rätt', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 13: beräkna integralen av 3x^2 från 1 till 2 ---- */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.str('∫_1^2 3x^2 dx', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Först en primitiv funktion:']],
      [['exponenten ökar med ett och']],
      [['man dividerar med den nya']],
      [['exponenten.']]
    ]);
    y += 2.8 * F;
    xx = T.str('F(x)=', padL, y);
    xx = T.fracH('3x^3', '3', xx, y);
    T.str('=x^3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Insättningsformeln: den primitiva']],
      [['funktionen i övre gränsen minus']],
      [['den i undre.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('∫_1^2 3x^2 dx=[x^3]_1^2', padL + 24, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=2^3-1^3=8-1=7', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 7', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 16: har Jaana rätt om extrempunkterna? ----
   * Derivatan är en summa av något icke-negativt och 3 — den kan aldrig
   * bli noll. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(x)=x^3+3x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Extrempunkter finns bara där']],
      [['derivatan är noll. Alltså']],
      [['deriverar jag och löser']],
      [['ekvationen f’(x)=0.']]
    ]);
    y += 2.8 * F;
    T.str('f’(x)=3x^2+3', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('3x^2+3=0 ⟺ x^2=-1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett tal i kvadrat kan aldrig bli']],
      [['negativt, så ekvationen saknar']],
      [['lösning.']]
    ]);
    y += 2.6 * F;
    T.str('x^2≥0 ⟹ f’(x)≥3>0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Derivatan är alltid POSITIV, så']],
      [['grafen bara växer. Då finns']],
      [['varken toppar eller dalar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: nej, Jaana har fel.', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('f saknar extrempunkter', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 3: avläs f'(2) i grafen ----
   * Derivatan i en punkt är tangentens lutning där — den läses av med
   * ett trappsteg, precis som k för en rät linje. */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 90, oy: 300, u: 30,
                           xmin: -2, xmax: 4, ymin: -1, ymax: 6 });
    function f(x) { return -x * x + 2 * x + 4; }

    A.axes();
    A.ticks(V.heltal(-2, 4), V.heltal(-1, 6), [-1, 1, 2, 3], [2, 4, 6]);
    T.pause(200);
    var kurva = [];
    for (i = -1.05; i <= 3.45; i += 0.15) kurva.push([A.X(i), A.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.stepEnd();

    tanke(420, [
      [['Derivatan i en punkt är']],
      [['tangentens lutning där. Alltså']],
      [['lägger jag en linjal mot kurvan']],
      [['i punkten där x=2.']]
    ], 0);
    A.dot(2, 4, BLUE);
    T.pause(160);
    /* tangenten y = -2(x-2)+4 = -2x+8 */
    A.graphKM(-2, 8, BLUE, 1.1, 3.4);
    T.stepEnd();

    tanke(420, [
      [['Nu läser jag av tangentens']],
      [['lutning med ett trappsteg: ett']],
      [['steg åt höger, och så långt ned']],
      [['som linjen faller.']]
    ], 0);
    A.stair(2, 4, 3, 2, '1', '−2', { dyOff: [8, 0] });
    T.pause(200);
    y = 520;
    xx = T.str('f’(2)=', padL, y);
    xx = T.fracH('−2', '1', xx, y);
    T.str('=-2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kurvan sjunker vid x=2, så']],
      [['derivatan måste vara negativ.']],
      [['Det stämmer med alternativ E.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: alternativ E, f’(2)=-2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: enhetscirkeln ----
   * Punktens x-koordinat är cosinus och y-koordinaten sinus. 230° ligger
   * rakt mittemot 50°, så koordinaterna byter tecken. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var cx = padL + 210, cy = 300, r = 130;
    var a1 = 50 * Math.PI / 180;
    var P = [cx + Math.cos(a1) * r, cy - Math.sin(a1) * r];
    var Q = [cx - Math.cos(a1) * r, cy + Math.sin(a1) * r];

    /* ---- steg 1: rita av enhetscirkeln ---- */
    T.line([cx - r - 34, cy], [cx + r + 34, cy]);
    T.line([cx + r + 25, cy - 5], [cx + r + 35, cy]);
    T.line([cx + r + 25, cy + 5], [cx + r + 35, cy]);
    T.pause(140);
    T.line([cx, cy + r + 34], [cx, cy - r - 34]);
    T.line([cx - 5, cy - r - 25], [cx, cy - r - 35]);
    T.line([cx + 5, cy - r - 25], [cx, cy - r - 35]);
    T.pause(160);
    acts.push({ kind: 'stroke', pts: V.ringPts(cx, cy, r, r) });
    T.pause(200);
    T.line([cx, cy], P);
    T.pause(140);
    V.vinkelBage(T, [cx, cy], -a1, 0, 42);
    T.str('50°', cx + 52, cy - 22, null, 0.62);
    T.pause(160);
    acts.push({ kind: 'stroke', pts: V.dotPts(P[0], P[1]) });
    T.str('(0,64; 0,77)', P[0] + 12, P[1] - 10, BLUE, 0.62);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(cy + r + 50, [
      [['På enhetscirkeln är punktens']],
      [['x-koordinat cosinus för vinkeln']],
      [['och y-koordinaten sinus.']]
    ], 0);
    y = 530;
    T.str('a) sin 50°=y-koordinaten=0,77', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: 0,77', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['230° är 50°+180°, alltså ett']],
      [['halvt varv till. Punkten hamnar']],
      [['rakt mittemot, och båda']],
      [['koordinaterna byter tecken.']]
    ]);
    T.line([cx, cy], Q);
    T.pause(140);
    acts.push({ kind: 'stroke', pts: V.dotPts(Q[0], Q[1]) });
    T.pause(200);
    y += 2.9 * F;
    T.str('b) punkten vid 230°:', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('(-0,64; -0,77)', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('cos 230°=x-koordinaten=-0,64', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: -0,64', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: vilken graf är f'? ----
   * Två saker avgör: derivatans nollställen ligger vid f:s extrempunkter,
   * och derivatans tecken följer om f växer eller avtar. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 130, oy: 250, u: 28,
                           xmin: -3, xmax: 4, ymin: -3, ymax: 4 });
    function f(x) { return 0.35 * (x * x * x - 3 * x) + 1; }

    A.axes();
    A.ticks(V.heltal(-3, 4), V.heltal(-3, 4), [-2, 2, 3], [-2, 2]);
    T.pause(200);
    var kurva = [];
    for (i = -2.5; i <= 2.5; i += 0.2) kurva.push([A.X(i), A.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.stepEnd();

    tanke(400, [
      [['Där f har en topp eller en dal']],
      [['är tangenten vågrät, alltså är']],
      [['derivatan noll. f har två']],
      [['extrempunkter.']]
    ], 0);
    A.dot(-1, f(-1), BLUE);
    T.pause(140);
    A.dot(1, f(1), BLUE);
    T.pause(200);
    y = 480;
    T.str('f har max i x=-1 och min i x=1', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('⟹ f’ har två nollställen', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Det stryker A, C, D och F, som']],
      [['har ett eller inget nollställe.']],
      [['Kvar är B och E.']]
    ]);
    y += 2.6 * F;
    T.str('Kvar: B och E', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu tecknet: f växer, avtar och']],
      [['växer igen. Alltså ska f’ vara']],
      [['positiv, negativ, positiv.']]
    ]);
    y += 2.6 * F;
    T.str('f växer  ⟹ f’>0', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('f avtar  ⟹ f’<0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En parabel med öppningen uppåt']],
      [['gör precis det: positiv, under']],
      [['x-axeln en bit, positiv igen.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: alternativ B', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 10: teckenstudium ur grafen ----
   * a) derivatan är negativ där grafen avtar, b) kvoten är odefinierad
   * där nämnaren p'(x) är noll. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 110, oy: 260, u: 30,
                           xmin: -2, xmax: 4, ymin: -2, ymax: 4 });
    function p(x) { return 0.3 * (x * x * x - 4.5 * x * x) + 3; }

    A.axes();
    A.ticks(V.heltal(-2, 4), V.heltal(-2, 4), [-1, 1, 2, 3, 4], [2, 4]);
    T.pause(200);
    var kurva = [];
    for (i = -1.2; i <= 4.1; i += 0.15) kurva.push([A.X(i), A.Y(p(i))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(160);
    A.dot(0, p(0), BLUE);
    T.pause(120);
    A.dot(3, p(3), BLUE);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(400, [
      [['p’(x)<0 betyder att grafen']],
      [['LUTAR NEDÅT. Det gör den mellan']],
      [['maximipunkten och']],
      [['minimipunkten.']]
    ], 0);
    y = 500;
    T.str('a) max i x=0, min i x=3', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('grafen avtar för 0<x<3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['I själva topp- och']],
      [['bottenpunkterna är tangenten']],
      [['vågrät: där är p’(x)=0, inte']],
      [['negativ. Ändpunkterna ingår ej.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar a: 0<x<3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Ett bråk är odefinierat när']],
      [['NÄMNAREN är noll. Här är']],
      [['nämnaren p’(x).']]
    ]);
    y += 2.9 * F;
    T.str('b) p’(x)=0 i extrempunkterna', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('alltså x=0 och x=3', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: x=0 och x=3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 11: integralen av f' ----
   * Analysens huvudsats gör om integralen till en skillnad mellan två
   * funktionsvärden — sedan är det bara avläsning. */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 110, oy: 260, u: 32,
                           xmin: -2, xmax: 3, ymin: -1, ymax: 5 });
    function f(x) { return 1.0714 * x * x * x - 1.9286 * x * x + 3; }

    A.axes();
    A.ticks(V.heltal(-2, 3), V.heltal(-1, 5), [-1, 1, 2, 3], [1, 3, 5]);
    T.pause(200);
    var kurva = [];
    for (i = -1.15; i <= 2.15; i += 0.12) kurva.push([A.X(i), A.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.stepEnd();

    tanke(430, [
      [['Integralen av en DERIVATA går']],
      [['tillbaka till funktionen själv:']],
      [['insättningsformeln ger f(a)']],
      [['minus f(-1).']]
    ], 0);
    y = 530;
    T.str('∫_-_1^a f’(x) dx=f(a)-f(-1)', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['f(-1) läser jag av i grafen —']],
      [['kurvan går genom (-1, 0).']]
    ]);
    A.dot(-1, 0, BLUE);
    T.pause(200);
    y += 2.6 * F;
    T.str('f(-1)=0', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('f(a)-0=3 ⟺ f(a)=3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu söker jag ett x där kurvan']],
      [['ligger på höjden 3. Jag drar en']],
      [['vågrät linje vid y=3.']]
    ]);
    A.rule([A.X(-2), A.Y(3)], [A.X(3), A.Y(3)], BLUE);
    T.pause(160);
    A.dot(1.8, 3, BLUE);
    T.pause(200);
    y += 2.8 * F;
    T.str('a≈1,8', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Också a=0 duger: maximipunkten']],
      [['ligger ju på höjden 3. Men']],
      [['uppgiften ber bara om ETT värde.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: a≈1,8', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: extrempunkter med derivata ----
   * Derivatans nollställen ger x-värdena, funktionen ger y-värdena och
   * en teckentabell avgör karaktären. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(x)=x^3-3x^2+7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Extrempunkter finns där']],
      [['tangenten är vågrät, alltså där']],
      [['derivatan är noll.']]
    ]);
    y += 2.6 * F;
    T.str('f’(x)=3x^2-6x=3x(x-2)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Faktoriserad form gör']],
      [['nollställena direkt synliga: en']],
      [['produkt är noll när en faktor']],
      [['är det.']]
    ]);
    y += 2.8 * F;
    T.str('f’(x)=0 ⟺ x_1=0 eller x_2=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x-värdena räcker inte — jag']],
      [['behöver punkternas höjd också,']],
      [['och den ger f (inte f’).']]
    ]);
    y += 2.8 * F;
    T.str('f(0)=7', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('f(2)=8-12+7=3', padL, y);
    T.stepEnd();

    /* ---- teckentabellen ---- */
    tanke(y, [
      [['Nu tecknet på f’ omkring']],
      [['nollställena. Jag ställer upp en']],
      [['teckentabell.']]
    ]);
    var tx = padL + 20, ty = y + 1.2 * F, cw = 108, ch = 46;
    for (i = 0; i <= 3; i++) {
      T.line([tx, ty + i * ch], [tx + 5 * cw, ty + i * ch]);
      T.pause(50);
    }
    for (i = 0; i <= 5; i++) {
      T.line([tx + i * cw, ty], [tx + i * cw, ty + 3 * ch]);
      T.pause(50);
    }
    T.pause(140);
    function cell(rad, kol, txt, sc) {
      sc = sc == null ? 0.6 : sc;
      T.str(txt, tx + kol * cw + cw / 2 - T.adv(txt, sc) / 2,
            ty + rad * ch + ch / 2 + 0.2 * F, null, sc);
      T.pause(60);
    }
    cell(0, 1, 'x<0'); cell(0, 2, 'x=0'); cell(0, 3, '0<x<2');
    cell(0, 4, 'x=2');
    cell(1, 0, 'f’(x)'); cell(1, 1, '+'); cell(1, 2, '0'); cell(1, 3, '-');
    cell(1, 4, '0');
    cell(2, 0, 'f(x)'); cell(2, 1, 'växer'); cell(2, 2, 'max');
    cell(2, 3, 'avtar'); cell(2, 4, 'min');
    T.stepEnd();

    y = ty + 3 * ch + 2.4 * F;
    tanke(y - 2.4 * F, [
      [['f växer fram till x=0 och avtar']],
      [['efter — alltså en topp. Vid x=2']],
      [['är det tvärtom: en dal.']]
    ], 0.2);
    T.str('(0, 7) är maximipunkt', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('(2, 3) är minimipunkt', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Inga terrasspunkter finns.', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: max (0, 7), min (2, 3)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 15: arean med parametern p ----
   * Integralen beräknas med p kvar som bokstav; villkoret på arean blir
   * en ekvation i p. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var A = mkAxes(T, F, { ox: padL + 60, oy: 300, u: 28, xsc: 1, ysc: 2,
                           xmin: -0.5, xmax: 4.5, ymin: -1, ymax: 10 });
    function g(x) { return 5 + 4 * x - x * x; }
    var xwA = padL + 30 + T.adv('6+4,5p=24') + 0.9 * F;

    /* ---- steg 1: figuren ---- */
    A.axes();
    A.ticks(V.heltal(0, 4), V.heltal(0, 10, 2), V.heltal(1, 4), [2, 4, 6, 8, 10]);
    T.pause(200);
    var kurva = [];
    for (i = -0.4; i <= 4.4; i += 0.15) kurva.push([A.X(i), A.Y(g(i))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(160);
    T.str('g', A.X(4.1), A.Y(g(4.1)) - 14, null, 0.62);
    T.pause(140);
    /* linjen x=3 och skuggningen mellan kurvan och x-axeln */
    T.line([A.X(3), A.Y(-1)], [A.X(3), A.Y(g(3) + 0.6)]);
    T.pause(160);
    for (i = 0.12; i <= 2.94; i += 0.16) {
      acts.push({ kind: 'stroke', color: BLUE,
        pts: V.humanize([[A.X(i), A.Y(0)], [A.X(i), A.Y(g(i))]]) });
      T.pause(40);
    }
    T.stepEnd();

    tanke(420, [
      [['Arean under en kurva är']],
      [['integralen av funktionen mellan']],
      [['gränserna — här från 0 till 3.']]
    ], 0);
    y = 520;
    /* ∫-tecknets UNDRE gräns ritas till vänster om tecknet, så raden
     * måste börja en bit in från padL för att inte nå pilzonen */
    T.str('∫_0^3 (5+px-x^2) dx=24', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Jag tar fram den primitiva']],
      [['funktionen term för term. p är']],
      [['bara en konstant och följer med.']]
    ]);
    y += 2.8 * F;
    xx = T.str('[5x+', padL, y);
    xx = T.fracH('px^2', '2', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('x^3', '3', xx, y);
    T.str(']_0^3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sätt in 3. Undre gränsen 0 ger']],
      [['noll i alla termer, så den']],
      [['behöver jag inte skriva ut.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('=15+', padL + 30, y);
    xx = T.fracH('9p', '2', xx, y);
    T.str('-9=6+4,5p', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('6+4,5p=24', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu en vanlig ekvation:']],
      [['subtrahera 6 från båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-6', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('6+4,5p', padL + 30, y);
      xx = T.str('-6', xx, y, BLUE);
      xx = T.str('=24', xx, y);
      T.str('-6', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('4,5p=18', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Och dividera med 4,5.']]
    ]);
    if (vagg) {
      T.vaggOp('/4,5', xwA, y);
      T.stepEnd();
      y += 2.2 * F;
    } else {
      y += 2.4 * F;
      xx = T.fracH('4,5p', '4,5', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('18', '4,5', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('p=4', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: p=4', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 17: derivera med derivatans definition ----
   * Täljaren skrivs på gemensamt bråkstreck, h förkortas bort och först
   * därefter går h mot noll. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.str('f(x)=', padL, y);
    T.fracH('5', 'a^2x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Derivatans definition: ändrings-']],
      [['kvoten mellan x och x+h, när h']],
      [['krymper mot noll.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('f’(x)=', padL, y);
    xx = limSym(T, F, xx, y);
    T.fracH('f(x+h)-f(x)', 'h', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in funktionen. Båda']],
      [['bråken har a^2 i nämnaren, så']],
      [['det bryter jag ut direkt.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('f(x+h)-f(x)=', padL, y);
    xx = T.fracH('5', 'a^2(x+h)', xx, y);
    xx = T.str('-', xx, y);
    T.fracH('5', 'a^2x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Gemensam nämnare för de två']],
      [['bråken: (x+h)·x. Täljaren blir']],
      [['x-(x+h), alltså -h.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('5', 'a^2', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('x-(x+h)', '(x+h)x', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('5', 'a^2', xx, y);
    xx = T.mul(xx, y);
    T.fracH('-h', '(x+h)x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu divideras alltihop med h.']],
      [['Ett h i täljaren och ett i']],
      [['nämnaren förkortas bort — och']],
      [['DÄRFÖR går gränsvärdet att ta.']]
    ], 1.4);
    y += 4.4 * F;
    xx = T.str('', padL, y);
    xx = T.fracH('f(x+h)-f(x)', 'h', padL, y);
    xx = T.str('=', xx, y);
    T.fracH('-5', 'a^2(x+h)x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['När h går mot noll blir (x+h)']],
      [['helt enkelt x.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('f’(x)=', padL, y);
    xx = limSym(T, F, xx, y);
    xx = T.fracH('-5', 'a^2(x+h)x', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('-5', 'a^2x^2', xx, y);
    T.stepEnd();

    y += 3.6 * F;
    xe = T.str('Svar: f’(x)=-', padL, y);
    xe = T.fracH('5', 'a^2x^2', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 18: tangenten och triangeln ----
   * Allt uttrycks i a: tangentens lutning, dess skärning med x-axeln,
   * triangelns bas och höjd. Arean blir a^4/6. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 70, oy: 300, u: 30, xsc: 0.5, ysc: 2,
                           xmin: -0.4, xmax: 2.2, ymin: -1, ymax: 7 });
    var a = 1.732;

    /* ---- steg 1: figuren ---- */
    A.axes();
    A.ticks([0.5, 1, 1.5, 2], V.heltal(0, 6, 2), [1, 2], [2, 4, 6]);
    T.pause(200);
    var kurva = [];
    for (i = -0.35; i <= 1.95; i += 0.08) {
      kurva.push([A.X(i), A.Y(i * i * i)]);
    }
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(160);
    /* tangenten y=3a^2x-2a^3 och linjen x=a */
    A.graphKM(3 * a * a, -2 * a * a * a, BLUE, 2 * a / 3 - 0.15, 1.95);
    T.pause(140);
    T.line([A.X(a), A.Y(-0.6)], [A.X(a), A.Y(a * a * a + 0.4)]);
    T.pause(160);
    T.str('a', A.X(a) - 6, A.Y(0) + 0.95 * F, BLUE, 0.62);
    T.stepEnd();

    tanke(430, [
      [['Tangentens lutning i punkten är']],
      [['derivatan där. Jag deriverar och']],
      [['sätter in x=a.']]
    ], 0);
    y = 530;
    T.str('f’(x)=3x^2 ⟹ k=f’(a)=3a^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Tangenten går genom punkten']],
      [['(a, a^3). Enpunktsformen ger']],
      [['dess ekvation.']]
    ]);
    y += 2.8 * F;
    T.str('y-a^3=3a^2(x-a)', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('y=3a^2x-3a^3+a^3=3a^2x-2a^3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Triangelns ena hörn är där']],
      [['tangenten skär x-axeln, alltså']],
      [['där y=0.']]
    ]);
    y += 2.8 * F;
    xx = T.str('0=3a^2x-2a^3 ⟺ x=', padL, y);
    T.fracH('2a', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Basen är avståndet från']],
      [['skärningen fram till x=a, och']],
      [['höjden är a^3.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('bas=a-', padL, y);
    xx = T.fracH('2a', '3', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('a', '3', xx, y);
    T.str('   höjd=a^3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('T=', padL, y);
    xx = T.bigFrac(['a', '3'], '2', xx, y);
    xx = T.mul(xx, y);
    xx = T.str('a^3=', xx, y);
    T.fracH('a^4', '6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Arean ska vara 1,5 areaenheter.']],
      [['Multiplicerar jag båda led med 6']],
      [['försvinner nämnaren.']]
    ], 1.4);
    y += 4.4 * F;
    xx = T.fracH('a^4', '6', padL, y);
    T.str('=1,5 ⟺ a^4=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Fjärdeoten ur 9. Och eftersom']],
      [['9=3^2 blir det roten ur 3.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('a=', padL, y);
    xx = T.rot('9', xx, y, 4);
    xx = T.str('=', xx, y);
    xx = T.rot('3', xx, y);
    T.str('≈1,73', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    xe = T.str('Svar: a=', padL, y);
    xe = T.rot('3', xe, y);
    xe = T.str('≈1,73', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });


  /* ================= DELPROV D ================= */

  /* ---- Uppgift 19: derivera med digitalt verktyg ----
   * Funktionen är en sammansatt funktion, som hör till nästa nivå — här
   * ska verktyget göra jobbet. Kontrollen visar ändå varifrån svaret
   * kommer. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('f(x)=(2x-1)^5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Parentesen upphöjd till 5 är en']],
      [['sammansatt funktion. Den går']],
      [['inte att derivera med reglerna']],
      [['på den här nivån.']]
    ]);
    y += 2.8 * F;
    T.str('Verktyget: derivatan i x=2', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('f’(2)=810', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Utvecklad har f en']],
      [['term 32x^5, och den ensam ger']],
      [['160·16=2 560 vid x=2. Samma']],
      [['storleksordning.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: f’(2)=810', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 20: triangelns area med areasatsen ----
   * Areasatsen kräver vinkeln MELLAN de två sidorna — och den är just
   * den tredje, okända vinkeln. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    /* triangeln i provfigurens orientering */
    var A = [padL + 20, 250], B = [padL + 130, 300], C = [padL + 350, 150];

    T.line(A, B); T.pause(130);
    T.line(B, C); T.pause(130);
    T.line(C, A); T.pause(160);
    V.vinkelBage(T, A, -0.42, 0.42, 34);
    T.str('42°', A[0] + 48, A[1] + 8, null, 0.62);
    T.pause(150);
    V.vinkelBage(T, B, -0.42 - Math.PI, -0.6, 26);
    T.str('120°', B[0] - 10, B[1] - 34, null, 0.62);
    T.pause(150);
    T.str('6,6', (A[0] + C[0]) / 2 - 20, (A[1] + C[1]) / 2 - 14, BLUE, 0.62);
    T.pause(140);
    T.str('5,1', (B[0] + C[0]) / 2 + 10, (B[1] + C[1]) / 2 + 16, BLUE, 0.62);
    T.stepEnd();

    tanke(340, [
      [['Areasatsen behöver de två']],
      [['sidorna OCH vinkeln mellan dem.']],
      [['Den vinkeln är den tredje, som']],
      [['jag får ur vinkelsumman.']]
    ], 0);
    y = 440;
    T.str('180°-42°-120°=18°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['18°-vinkeln ligger mellan']],
      [['sidorna 6,6 och 5,1 — precis vad']],
      [['areasatsen vill ha.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('T=', padL, y);
    xx = T.fracH('6,6·5,1·sin 18°', '2', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('=5,201...≈5,2 cm^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? En rätvinklig triangel']],
      [['med samma sidor hade gett drygt']],
      [['16 cm^2, och 18° är en mycket']],
      [['spetsig vinkel.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ungefär 5,2 cm^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: modellen för pojkars längd ----
   * a) ekvation med logaritm, b) derivatan som växttakt, c) modellens
   * giltighet prövas genom att sätta in en gymnasieålder. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('78·e^0^,^0^7^x=125') + 0.9 * F;

    y = 238;
    T.str('f(x)=78·e^0^,^0^7^x', padL, y);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['I a) är längden känd och åldern']],
      [['söks. Alltså en ekvation.']]
    ]);
    y += 2.6 * F;
    T.str('a) 78·e^0^,^0^7^x=125', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Först får jag potensen ensam:']],
      [['dividera båda led med 78.']]
    ]);
    if (vagg) {
      T.vaggOp('/78', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('78·e^0^,^0^7^x', '78', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('125', '78', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('e^0^,^0^7^x=', padL + 30, y);
    T.fracH('125', '78', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x sitter i exponenten. Den får']],
      [['jag ned med logaritmen — ln är']],
      [['motsatsen till e-potensen.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('0,07x=ln ', padL + 30, y);
    T.fracH('125', '78', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('0,07x=0,4718...', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xx = T.str('x=', padL + 30, y);
    xx = T.fracH('0,4718...', '0,07', xx, y);
    T.str('=6,74...', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar a: ungefär 6,7 år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['"Hur snabbt de växer" är']],
      [['förändringen per år, alltså']],
      [['derivatan. Konstanten i']],
      [['exponenten kommer ned.']]
    ]);
    y += 2.9 * F;
    T.str('b) f’(x)=0,07·78·e^0^,^0^7^x', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=5,46·e^0^,^0^7^x', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('f’(6)=5,46·e^0^,^4^2=8,30...', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar b: ungefär 8,3 cm/år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['I c) prövar jag modellen på en']],
      [['ålder den påstås gälla för —']],
      [['en gymnasiepojke på 16 år.']]
    ]);
    y += 2.9 * F;
    T.str('c) f(16)=78·e^1^,^1^2=239,3...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nästan 2,4 meter! Modellen']],
      [['fortsätter växa exponentiellt,']],
      [['men det gör inte pojkar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar c: nej, modellen gäller', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('inte för gymnasiepojkar', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 22: tangentens k ----
   * Tangenten går genom kurvans punkt, så punkten sätts in i tangentens
   * ekvation. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('20=2k-12') + 0.9 * F;

    y = 238;
    T.str('f(x)=3x^2+4x', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('tangent: y=kx-12', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Tangenten snuddar kurvan i']],
      [['punkten där x=2, så DEN punkten']],
      [['ligger på båda. Först dess']],
      [['y-koordinat.']]
    ]);
    y += 2.8 * F;
    T.str('f(2)=3·4+4·2=12+8=20', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Punkten: (2, 20)', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in punkten i']],
      [['tangentens ekvation och löser']],
      [['ut k.']]
    ]);
    y += 2.6 * F;
    T.str('20=2k-12', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Adderar 12 till båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+12', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('20', padL + 30, y);
      xx = T.str('+12', xx, y, BLUE);
      xx = T.str('=2k-12', xx, y);
      T.str('+12', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('32=2k ⟹ k=16', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: tangentens lutning ska']],
      [['vara f’(2). f’(x)=6x+4 ger']],
      [['f’(2)=16. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: k=16', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 23: lös f'(x)=g'(x) ----
   * Båda funktionerna skrivs om till potenser innan de deriveras;
   * ekvationen löses sedan med digitalt verktyg. */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 182;
    xx = T.str('f(x)=', padL, y);
    xx = T.fracH('12', 'x', xx, y);
    T.str('+8x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Både bråket och roten går att']],
      [['skriva som potenser — då duger']],
      [['potensregeln på båda.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('f(x)=12x^-^1+8x', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('f’(x)=-12x^-^2+8=-', padL, y);
    xx = T.fracH('12', 'x^2', xx, y);
    T.str('+8', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur x är x upphöjt till']],
      [['0,5. Exponenten ned som faktor']],
      [['ger 0,5 gånger x upphöjt till']],
      [['-0,5.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('g(x)=', padL, y);
    xx = T.rot('x', xx, y);
    T.str('=x^0^,^5', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    xx = T.str('g’(x)=0,5x^-^0^,^5=', padL, y);
    xx = T.fracH('1', '2√x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Ekvationen blandar en potens med']],
      [['negativ exponent och en rot. Den']],
      [['löser jag med digitalt verktyg.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('-', padL, y);
    xx = T.fracH('12', 'x^2', xx, y);
    xx = T.str('+8=', xx, y);
    T.fracH('1', '2√x', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('Verktyget ger x=1,258...', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: x≈1,26', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: sträckan BD ----
   * Två satser i tur och ordning: sinussatsen ger AB i den stora
   * triangeln, cosinussatsen ger BD i den lilla. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var A = [padL + 120, 170], B = [padL + 30, 350], C = [padL + 350, 195];
    var D = [A[0] + (C[0] - A[0]) * 0.65, A[1] + (C[1] - A[1]) * 0.65];

    /* ---- steg 1: figuren ---- */
    T.line(A, B); T.pause(120);
    T.line(B, C); T.pause(120);
    T.line(C, A); T.pause(120);
    T.line(B, D); T.pause(160);
    T.str('A', A[0] - 22, A[1] - 4, null, 0.62);
    T.str('B', B[0] - 24, B[1] + 14, null, 0.62);
    T.str('C', C[0] + 8, C[1] + 6, null, 0.62);
    T.str('D', D[0] + 4, D[1] - 12, null, 0.62);
    T.pause(160);
    V.vinkelBage(T, A, 1.107, 2.36, 30);
    T.str('106°', A[0] - 16, A[1] + 60, null, 0.62);
    T.pause(150);
    V.vinkelBage(T, C, Math.PI + 0.25, Math.PI + 0.93, 34);
    T.str('39°', C[0] - 72, C[1] + 40, null, 0.62);
    T.pause(160);
    T.str('5,0', (A[0] + D[0]) / 2 - 8, (A[1] + D[1]) / 2 - 12, BLUE, 0.62);
    T.pause(140);
    T.str('2,7', (D[0] + C[0]) / 2 - 8, (D[1] + C[1]) / 2 - 22, BLUE, 0.62);
    T.stepEnd();

    tanke(400, [
      [['Sidan AC är 5,0+2,7=7,7. I den']],
      [['stora triangeln känner jag två']],
      [['vinklar och en sida — då passar']],
      [['sinussatsen.']]
    ], 0);
    y = 500;
    T.str('∠ABC=180°-106°-39°=35°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Sinussatsen: varje sida delad']],
      [['med sinus för sin motstående']],
      [['vinkel är lika stor.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.fracH('AB', 'sin 39°', padL, y);
    xx = T.str('=', xx, y);
    T.fracH('7,7', 'sin 35°', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('AB=', padL + 30, y);
    xx = T.fracH('7,7·sin 39°', 'sin 35°', xx, y);
    T.str('=8,447...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu den lilla triangeln ABD: två']],
      [['sidor och vinkeln MELLAN dem är']],
      [['kända. Då är det cosinussatsen.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('BD^2=AB^2+AD^2-2·AB·AD·cos 106°', padL, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=8,447...^2+5,0^2', padL + 40, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('-2·8,447...·5,0·cos 106°', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('BD^2=119,68...', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('BD=', padL + 30, y);
    xx = T.rot('119,68...', xx, y);
    T.str('=10,94...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? BD ska vara längre än']],
      [['AD=5,0 och ungefär lika lång som']],
      [['AB, och det stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: BD≈11 cm', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 25: tangenten parallell med sekanten ----
   * Parallella linjer har samma lutning, så sekantens k sätts lika med
   * derivatan. */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 120, oy: 300, u: 34, xsc: 1, ysc: 1,
                           xmin: -2, xmax: 3, ymin: -0.5, ymax: 5 });
    function f(x) { return Math.pow(2, x); }

    A.axes();
    A.ticks(V.heltal(-2, 3), V.heltal(1, 5), [-1, 1, 2, 3], [1, 2, 3, 4]);
    T.pause(200);
    var kurva = [];
    for (i = -2; i <= 2.25; i += 0.12) kurva.push([A.X(i), A.Y(f(i))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(160);
    A.dot(-1, 0.5, BLUE);
    T.pause(120);
    A.dot(2, 4, BLUE);
    T.pause(140);
    A.rule([A.X(-1), A.Y(0.5)], [A.X(2), A.Y(4)], BLUE);
    T.stepEnd();

    tanke(420, [
      [['Sekantens lutning är precis']],
      [['ändringskvoten mellan de två']],
      [['punkterna på kurvan.']]
    ], 0);
    y = 520;
    xx = T.str('k=', padL, y);
    xx = T.fracH('4-0,5', '2-(-1)', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('3,5', '3', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('7', '6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Parallella linjer har samma']],
      [['lutning. Tangentens lutning är']],
      [['derivatan, så jag sätter dem']],
      [['lika.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('f’(x)=2^x·ln 2=', padL, y);
    T.fracH('7', '6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag får potensen ensam genom']],
      [['att dividera med ln 2.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('2^x=', padL, y);
    T.fracH('7', '6·ln 2', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('2^x=1,6832...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x sitter i exponenten — då tar']],
      [['jag logaritmen av båda led och']],
      [['dividerar med ln 2.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('x=', padL, y);
    xx = T.fracH('ln 1,6832...', 'ln 2', xx, y);
    T.str('=0,751...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Tangeringspunkten ska']],
      [['ligga mellan -1 och 2, och lite']],
      [['närmare mitten. Det gör 0,75.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x≈0,75', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 26: tangenterna i P och R är parallella ----
   * Ett algebraiskt bevis: derivatan beräknas i båda punkterna och visar
   * sig ge samma uttryck, oavsett a. */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('f(x)=ax^3-6a^2x^2+11a^3x-6a^4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I faktoriserad form syns']],
      [['nollställena direkt: x=a, x=2a']],
      [['och x=3a. P och R är den']],
      [['första och den sista.']]
    ]);
    y += 2.8 * F;
    T.str('P=(a, 0)   Q=(2a, 0)   R=(3a, 0)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Parallella tangenter betyder']],
      [['samma lutning, alltså samma']],
      [['derivata. Så jag deriverar och']],
      [['jämför f’(a) med f’(3a).']]
    ]);
    y += 2.8 * F;
    T.str('f’(x)=3ax^2-12a^2x+11a^3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Först i P, alltså x=a. Alla']],
      [['termer blir a upphöjt till 3.']]
    ]);
    y += 2.6 * F;
    T.str('f’(a)=3a·a^2-12a^2·a+11a^3', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=3a^3-12a^3+11a^3=2a^3', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Sedan i R, alltså x=3a. Här blir']],
      [['kvadraten 9a^2, så första termen']],
      [['växer till 27a^3.']]
    ]);
    y += 2.8 * F;
    T.str('f’(3a)=3a·9a^2-12a^2·3a+11a^3', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=27a^3-36a^3+11a^3=2a^3', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Samma uttryck! Och ingenstans']],
      [['antog jag något om a — det']],
      [['gäller alltså för varje a>0.']]
    ]);
    y += 2.8 * F;
    T.str('f’(a)=f’(3a)=2a^3', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: samma lutning ⟹', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('tangenterna är parallella', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 27: hur långt räcker bensinen? ----
   * Förbrukningen är liter per mil, så den totala mängden är integralen
   * av modellen. */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('f(x)=0,3+0,5e^-^0^,^7^6^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['f(x) är förbrukningen PER MIL,']],
      [['och den ändras hela tiden. Då']],
      [['ger integralen den totala']],
      [['mängden bensin.']]
    ]);
    y += 2.8 * F;
    T.str('Total mängd på a mil:', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('∫_0^a (0,3+0,5e^-^0^,^7^6^x) dx', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Tanken rymmer 4,0 liter, så']],
      [['bensinen tar slut när integralen']],
      [['når just 4,0.']]
    ]);
    y += 2.6 * F;
    T.str('∫_0^a (0,3+0,5e^-^0^,^7^6^x) dx=4,0', padL + 24, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('Verktyget ger a=11,1...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Efter några mil är']],
      [['förbrukningen nästan 0,3 l/mil,']],
      [['och 4,0 delat med 0,3 är drygt']],
      [['13 mil. Starten drar mer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ungefär 11 mil', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 28: den kortaste guldtråden ----
   * Plattans mått binds ihop av arean; trådens längd blir en funktion av
   * ETT mått, och minimum söks med digitalt verktyg. */
  reg(28, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var Lx = padL + 90, Rx = padL + 290, Ty = 150, By = 390;

    /* ---- steg 1: figuren ---- */
    T.line([Lx, Ty], [Rx, Ty]); T.pause(110);
    T.line([Rx, Ty], [Rx, By]); T.pause(110);
    T.line([Rx, By], [Lx, By]); T.pause(110);
    T.line([Lx, By], [Lx, Ty]); T.pause(160);
    /* guldtråden mellan punkterna 8 mm in från var sitt hörn */
    T.line([Lx, Ty + 62], [Rx, By - 62]);
    T.pause(180);
    T.str('8', Lx - 22, Ty + 34, BLUE, 0.62);
    T.pause(120);
    T.str('8', Rx + 10, By - 34, BLUE, 0.62);
    T.pause(140);
    T.str('x', Rx + 12, (Ty + By) / 2, BLUE, 0.62);
    T.pause(120);
    T.str('550 mm^2', (Lx + Rx) / 2 - 50, By + 0.95 * F, BLUE, 0.62);
    T.stepEnd();

    tanke(By + 60, [
      [['Plattans två mått hänger ihop:']],
      [['arean ska vara 550. Kallar jag']],
      [['höjden x blir bredden 550']],
      [['delat med x.']]
    ], 0);
    y = 520;
    xx = T.str('höjd=x   bredd=', padL, y);
    T.fracH('550', 'x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Tråden är hypotenusan i en']],
      [['rätvinklig triangel. Ena kateten']],
      [['är hela bredden, den andra är']],
      [['höjden minus 8 i var ände.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('lodrät katet=x-2·8=x-16', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Pythagoras sats ger trådens']],
      [['längd. Jag skriver den i']],
      [['kvadrat, så slipper jag']],
      [['rottecknet runt hela uttrycket.']]
    ]);
    y += 3.2 * F;
    xx = T.str('L(x)^2=', padL, y);
    xx = T.parenFrac('550', 'x', '2', xx, y);
    T.str('+(x-16)^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu är trådens längd en funktion']],
      [['av ett enda mått. Minimum söker']],
      [['jag med digitalt verktyg.']]
    ], 1.6);
    y += 3.6 * F;
    T.str('Verktyget: minimum vid x=28,7', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('L(28,7)=22,99...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Plattan blir ungefär']],
      [['28,7 gånger 19,1 mm, och tråden']],
      [['går snett över den.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ungefär 23 mm', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

})();

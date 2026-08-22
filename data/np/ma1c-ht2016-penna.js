/* ma1c-ht2016-penna.js — pennlösningar till Nationellt prov Ma 1c, HT 2016.
 *
 * En scen per uppgift, registrerad som "ma1c-ht2016-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de som oftast
 * bränner: inget bläck vid x > 696 eller x < 24, inget med x > 420 ovanför
 * y = 150 (y = 210 i ekvval-scener), en tanke per led direkt före ledet,
 * division alltid med vågrätt streck, blå båge till varje term när en
 * parentes utvecklas, och samma antal klicksteg i båda
 * ekvationsredovisningarna.
 *
 * Granskning: node .claude/verify-handskrift.js ma1c-ht2016-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkAxes = V.mkAxes, substRings = V.substRings, fadeRings = V.fadeRings,
      vecPil = V.vecPil, figurPil = V.figurPil, humanize = V.humanize,
      expFrac = V.expFrac, bigParen = V.bigParen, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma1c-ht2016-u' + nr, fn); }

  /* PILSPETS på en handritad axel — axeln har spets bara åt det positiva
   * hållet (se REGEL om tallinjer och axlar i handskrift.js). */
  function axelPil(T, x, y, riktning) {
    if (riktning === 'hoger') {
      T.line([x - 9, y - 5], [x + 1, y]);
      T.line([x - 9, y + 5], [x + 1, y]);
    } else {
      T.line([x - 5, y + 9], [x, y - 1]);
      T.line([x + 5, y + 9], [x, y - 1]);
    }
  }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 1: värdet av 4x+3 när x=3 ---- */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    var e0 = padL, e1 = T.str('4x+3', padL, y), yE = y;
    T.stepEnd();

    y += 2.3 * F;
    var v0 = padL, v1 = T.str('x=3', padL, y), yV = y;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in trean där x står.']],
      [['4x betyder 4 gånger x, så det']],
      [['blir 4 gånger 3.']]
    ]);
    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.4 * F;
    T.str('4·3+3=12+3=15', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 15', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 2: vilket värde uppfyller INTE olikheten? ----
   * Olikheten löses först; sedan prövas alternativen mot lösningen. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + T.adv('2x+1>5'),
                       padL + 30 + T.adv('2x>4')) + 0.9 * F;

    y = 210;
    T.str('2x+1>5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag löser olikheten först, så']],
      [['vet jag vilka tal som duger.']],
      [['Ettan adderas, så jag']],
      [['subtraherar 1 i båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-1', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('2x+1', padL + 30, y);
      xx = T.str('-1', xx, y, BLUE);
      xx = T.str('>5', xx, y);
      T.str('-1', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('2x>4', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Dividerar med 2 i båda led.']],
      [['Två är positivt, så']],
      [['olikhetstecknet står kvar.']]
    ]);
    if (vagg) {
      T.vaggOp('/2', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2x', '2', padL + 30, y);
      xx = T.str('>', xx, y);
      T.fracH('4', '2', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('x>2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Villkoret gäller alla tal som']],
      [['är STÖRRE än 2. Tvåan själv är']],
      [['inte större än 2 — den faller']],
      [['utanför.']]
    ]);
    y += 2.6 * F;
    T.str('7, 5, 4, 3 är alla >2', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2 är inte >2', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: x=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 3: ekvivalens eller implikation? ----
   * Frågan är om sambandet gäller åt båda hållen eller bara åt ett. */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('Rad 1: Sverige      Europa', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Bor man i Sverige bor man']],
      [['säkert i Europa. Men bor man i']],
      [['Europa kan man lika gärna bo i']],
      [['Spanien.']]
    ]);
    y += 2.8 * F;
    T.str('Sverige ⇒ Europa', padL + 30, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('gäller bara åt ett håll', padL + 60, y, null, 0.7);
    T.stepEnd();

    tanke(y, [
      [['Rad 2: varje kvadrat ÄR en']],
      [['rektangel, men en rektangel']],
      [['behöver inte vara kvadratisk.']]
    ]);
    y += 2.8 * F;
    T.str('Rad 2: rektangel ⇐ kvadrat', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('kvadrat medför rektangel', padL + 60, y, null, 0.7);
    T.stepEnd();

    tanke(y, [
      [['Ekvivalens skulle betyda att']],
      [['sambandet gällde åt BÅDA hållen.']],
      [['Här gör det inte det i någon']],
      [['av raderna.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: rad 1 ⇒ och rad 2 ⇐', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: lös 4x^3=32 ---- */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + T.adv('4x^3=32') + 0.9 * F;

    y = 210;
    T.str('4x^3=32', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x^3 multipliceras med 4, så']],
      [['jag dividerar båda led med 4.']],
      [['Potensen rör jag inte än.']]
    ]);
    if (vagg) {
      T.vaggOp('/4', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('4x^3', '4', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('32', '4', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('x^3=8', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Vilket tal gånger sig självt']],
      [['tre gånger blir 8? Det är att']],
      [['dra kubikroten.']]
    ]);
    y += 2.6 * F;
    xx = T.str('x=', padL + 30, y);
    xx = T.rot('8', xx, y, 3);
    T.str('=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 2^3=8 och 4·8=32.']],
      [['Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: x=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 5: 393 ppm i decimalform ---- */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('393 ppm', padL, y);
    T.stepEnd();

    tanke(y, [
      [['ppm betyder "parts per']],
      [['million", alltså miljondelar.']],
      [['Nämnaren är en miljon.']]
    ]);
    y += 2.8 * F;
    xx = T.str('393 ppm=', padL, y);
    T.fracH('393', '1 000 000', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Att dela med en miljon flyttar']],
      [['decimaltecknet sex steg åt']],
      [['vänster.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('=0,000393', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 0,000393', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: talet 113 i bas 7 skrivet i bas 10 ----
   * Varje siffra har ett platsvärde som är en potens av basen. */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('113 i bas 7', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I bas 7 är platsvärdena']],
      [['potenser av 7: ettor, sjuor och']],
      [['49-or, precis som ental, tiotal']],
      [['och hundratal i bas 10.']]
    ]);
    y += 2.8 * F;
    T.str('113=1·7^2+1·7^1+3·7^0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['7^2=49, 7^1=7 och 7^0=1 —']],
      [['allt upphöjt till noll är 1.']]
    ]);
    y += 2.6 * F;
    T.str('=1·49+1·7+3·1', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=49+7+3=59', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 59', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 7: avläsning ur grafen ----
   * a) höjden vid x=2, b) var grafen har höjden 2. Grafen är en fallande
   * rät linje genom (0, 6) och (10, 1). */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 40, oy: 300, u: 30, xsc: 2, ysc: 1,
                           xmin: 0, xmax: 11, ymin: 0, ymax: 6.5 });

    A.axes();
    A.ticks(V.heltal(2, 10, 2), V.heltal(1, 6), V.heltal(2, 10, 2), [2, 4, 6]);
    T.pause(200);
    A.rule([A.X(0), A.Y(6)], [A.X(10), A.Y(1)]);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(360, [
      [['f(2) är grafens höjd vid x=2.']],
      [['Jag går upp från 2 på x-axeln']],
      [['till linjen, och sedan vågrätt']],
      [['in till y-axeln.']]
    ], 0);
    A.guides(2, 5);
    T.pause(160);
    A.dot(2, 5, BLUE);
    T.pause(200);
    y = 470;
    T.str('a) f(2)=4', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: f(2)=4', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) är det tvärtom: höjden är']],
      [['känd och x söks. Jag går in på']],
      [['höjden 2 och ser var linjen']],
      [['finns.']]
    ]);
    A.guides(6, 2);
    T.pause(160);
    A.dot(6, 2, BLUE);
    T.pause(200);
    y += 2.9 * F;
    T.str('b) f(x)=2 när x=6', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: x=6', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 8: blir A större eller mindre? ----
   * Först ett talexempel, sedan en omskrivning som förklarar VARFÖR. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.str('A=', padL, y);
    T.fracH('B', 'B+1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Enklast är att pröva med ett']],
      [['tal och se vad som händer när']],
      [['jag dubblar det.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('B=1: A=', padL, y);
    xx = T.fracH('1', '2', xx, y);
    T.str('=0,5', xx, y);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('B=2: A=', padL, y);
    xx = T.fracH('2', '3', xx, y);
    T.str('=0,666...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['A blev större. Men ett exempel']],
      [['bevisar inget — jag skriver om']],
      [['uttrycket så att jag SER varför.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('A=', padL, y);
    xx = T.fracH('B+1-1', 'B+1', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('B+1', 'B+1', xx, y);
    xx = T.str('-', xx, y);
    T.fracH('1', 'B+1', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=1-', padL + 30, y);
    T.fracH('1', 'B+1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Växer B blir nämnaren B+1']],
      [['större, och då blir bråket']],
      [['MINDRE. Det som dras bort från']],
      [['ettan krymper, så A växer.']]
    ], 1.05);
    y += 3.6 * F;
    xe = T.str('Svar: A blir större', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: ekvation med två bråk ----
   * Nämnarna 4 och 3 försvinner om båda leden multipliceras med 12. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + 30 + T.adv('9x+3-8x-12=24'),
                       padL + 30 + T.adv('x-9=24')) + 0.9 * F;

    /* väggens streck sträcker sig 1,25·F över raden i bråkläget — första
     * raden läggs så att det håller sig under inställningsrutans hörn */
    y = 258;
    xx = T.fracH('3x+1', '4', padL, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('2x+3', '3', xx, y);
    T.str('=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråk i en ekvation är krångliga.']],
      [['Nämnarna 4 och 3 försvinner']],
      [['båda om jag multiplicerar med']],
      [['12 i båda led.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·12', xwA, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.2 * F;
    } else {
      y += 3.4 * F;
      xx = T.fracH('3x+1', '4', padL + 30, y);
      xx = T.str('·12', xx, y, BLUE);
      xx = T.str('-', xx, y);
      xx = T.fracH('2x+3', '3', xx, y);
      xx = T.str('·12', xx, y, BLUE);
      xx = T.str('=2', xx, y);
      T.str('·12', xx, y, BLUE);
      T.stepEnd();
      y += 3.4 * F;
    }
    var g0 = padL + 30; xx = T.str('3', padL + 30, y); var g1 = xx;
    xx = T.str('(', xx, y);
    var s1 = xx; xx = T.str('3x', xx, y); var s1b = xx;
    var s2 = xx; xx = T.str('+1', xx, y); var s2b = xx;
    xx = T.str(')', xx, y);
    var h0 = xx; xx = T.str('-4', xx, y); var h1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('2x', xx, y); var t1b = xx;
    var t2 = xx; xx = T.str('+3', xx, y); var t2b = xx;
    xx = T.str(')=24', xx, y);
    var yK = y;
    T.stepEnd();

    tanke(y, [
      [['12 delat med 4 är 3, och 12']],
      [['delat med 3 är 4. Nu utvecklar']],
      [['jag den första parentesen.']]
    ]);
    y += 3.0 * F;
    xx = T.str('', padL + 30, y);
    xx = multIn(padL + 30, y, yK - 0.95 * F, [
      { fran: [g0, g1], till: [s1, s1b], skriv: '9x', hojd: 26 },
      { fran: [g0, g1], till: [s2, s2b], skriv: '+3', hojd: 46, dx: 4 }
    ]);
    xx = multIn(xx, y, yK - 0.95 * F, [
      { fran: [h0, h1], till: [t1, t1b], skriv: '-8x', hojd: 26 },
      { fran: [h0, h1], till: [t2, t2b], skriv: '-12', hojd: 46, dx: 4 }
    ]);
    T.str('=24', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Slå ihop lika termer:']],
      [['9x-8x=x och 3-12=-9.']]
    ]);
    y += 2.5 * F;
    T.str('x-9=24', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist adderar jag 9 till båda']],
      [['led.']]
    ]);
    if (vagg) {
      T.vaggOp('+9', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('x-9', padL + 30, y);
      xx = T.str('+9', xx, y, BLUE);
      xx = T.str('=24', xx, y);
      T.str('+9', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('x=33', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 100/4=25 och 69/3=23,']],
      [['och 25-23=2. Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: x=33', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 10: vilka tal är större än 2 promille? ----
   * Alla alternativ skrivs i decimalform och jämförs med 0,002. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 182;
    xx = T.str('2 ‰=', padL, y);
    xx = T.fracH('2', '1 000', xx, y);
    T.str('=0,002', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu skriver jag varje alternativ']],
      [['som ett decimaltal och jämför']],
      [['med 0,002.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.fracH('2', '2 000', padL, y);
    xx = T.str('=0,001', xx, y);
    T.str('  mindre', xx, y, null, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('0,00201', padL, y);
    T.str('  större', xx, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['1/499 är lite MER än 1/500,']],
      [['för ju mindre nämnare, desto']],
      [['större bråk.']]
    ]);
    y += 2.8 * F;
    xx = T.fracH('1', '499', padL, y);
    xx = T.str('=0,002004...', xx, y);
    T.str('  större', xx, y, null, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.fracH('1', '501', padL, y);
    xx = T.str('=0,001996...', xx, y);
    T.str('  mindre', xx, y, null, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('1,9·10^-^3=0,0019', padL, y);
    T.str('  mindre', xx, y, null, 0.62);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: 0,00201 och ', padL, y);
    xe = T.fracH('1', '499', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 12: tabellen med x, xy och xy^2 ---- */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var tx = padL + 60, ty = 150, cw = 130, ch = 52;

    /* ---- steg 1: rita av tabellen ---- */
    for (i = 0; i <= 2; i++) T.line([tx, ty + i * ch], [tx + 3 * cw, ty + i * ch]);
    for (i = 0; i <= 3; i++) T.line([tx + i * cw, ty], [tx + i * cw, ty + 2 * ch]);
    T.pause(160);
    ['x', 'xy', 'xy^2'].forEach(function (t, j) {
      T.str(t, tx + j * cw + cw / 2 - T.adv(t, 0.7) / 2, ty + 0.66 * ch, null, 0.7);
      T.pause(120);
    });
    ['2', '-10', '?'].forEach(function (t, j) {
      T.str(t, tx + j * cw + cw / 2 - T.adv(t, 0.7) / 2, ty + 1.66 * ch, null, 0.7);
      T.pause(120);
    });
    T.stepEnd();

    tanke(ty + 2 * ch + 20, [
      [['Jag känner x och xy. Ur dem kan']],
      [['jag räkna ut y, och sedan xy^2.']]
    ], 0);
    y = 350;
    T.str('xy=-10 och x=2 ger 2y=-10', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('y=-5', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in x=2 och y=-5.']],
      [['Ett negativt tal i kvadrat blir']],
      [['positivt.']]
    ]);
    y += 2.6 * F;
    T.str('xy^2=2·(-5)^2=2·25=50', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll på annat sätt:']],
      [['xy^2 är xy gånger y, alltså']],
      [['-10·(-5)=50. Samma svar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 50', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 13: skriv påståendet med funktionsbeteckning ---- */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('V(t)=volymen efter t minuter', padL, y);
    T.stepEnd();

    tanke(y, [
      [['t räknas från klockan 08.00.']],
      [['Klockan 09.00 har det gått en']],
      [['timme, alltså 60 minuter.']]
    ]);
    y += 2.6 * F;
    T.str('09.00 ⟺ t=60', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Volymen då är 21 cm^3. Det är']],
      [['just vad V(60) betyder: värdet']],
      [['när t är 60.']]
    ]);
    y += 2.6 * F;
    T.str('V(60)=21', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: V(60)=21', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: skriv √(a^6)·√(a^6) som en potens ----
   * Två vägar till samma svar. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.rot('a^6', padL, y);
    xx = T.mul(xx, y);
    T.rot('a^6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samma rot gånger sig själv.']],
      [['Att kvadrera en rot tar bort']],
      [['rottecknet — kvar står bara']],
      [['det som stod under.']]
    ]);
    y += 2.8 * F;
    xx = T.str('=(', padL + 30, y);
    xx = T.rot('a^6', xx, y);
    T.str(')^2=a^6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll på ett annat sätt:']],
      [['roten ur a^6 är a^3, eftersom']],
      [['a^3·a^3=a^6.']]
    ]);
    y += 2.8 * F;
    xx = T.rot('a^6', padL, y);
    xx = T.mul(xx, y);
    xx = T.rot('a^6', xx, y);
    T.str('=a^3·a^3=a^6', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    xe = T.str('Svar: a^6', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 15: sidan a med hjälp av tabellen ----
   * Rät vinkel nere till vänster, 20° upptill, hypotenusan 2. Sidan a
   * ligger INTILL 20°-vinkeln, så det blir cosinus. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);
    /* figuren är inte skalenlig i provet; här ritas den skalenligt */
    var A = [padL + 60, 320], B = [padL + 160, 320], C = [padL + 60, 45];

    T.line(A, B); T.pause(130);
    T.line(B, C); T.pause(130);
    T.line(C, A); T.pause(160);
    V.ratVinkel(T, A, [1, 0], [0, -1], 14);
    T.pause(160);
    V.vinkelBage(T, C, Math.PI / 2, Math.PI / 2 - 0.349, 44);
    T.str('20°', C[0] + 16, C[1] + 76, null, 0.62);
    T.pause(160);
    V.vinkelBage(T, B, -Math.PI, -(Math.PI - 1.222), 30);
    T.str('70°', B[0] - 74, B[1] - 22, null, 0.62);
    T.pause(180);
    T.str('a', A[0] - 26, (A[1] + C[1]) / 2, BLUE, 0.62);
    T.pause(140);
    T.str('2', (B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2, BLUE, 0.62);
    T.stepEnd();

    tanke(360, [
      [['Sidan a ligger INTILL 20°-']],
      [['vinkeln, och 2 är hypotenusan.']],
      [['Närliggande delat med']],
      [['hypotenusan: cosinus.']]
    ], 0);
    y = 460;
    r = V.trigKvot(T, F, { fn: 'cos 20°=', x: padL, y: y,
      ring: [C[0] + 26, C[1] + 42, 34, 26],
      num: { txt: 'a', ord: 'närliggande katet',
             svep: [[A[0] - 7, A[1] - 6], [C[0] - 7, C[1] + 6]] },
      den: { txt: '2', ord: 'hypotenusan',
             svep: [[C[0] + 6, C[1] + 6], [B[0] - 6, B[1] - 6]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['a står i täljaren, så jag']],
      [['multiplicerar båda led med 2.']],
      [['Tabellen ger cos 20°=0,940.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('a=2·cos 20°=2·0,940', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('=1,88 l.e.', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? a ska vara nästan lika']],
      [['lång som hypotenusan 2, för']],
      [['vinkeln vid toppen är liten.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: a=1,88 l.e.', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 16: bestäm n i 2^4·3^8=9^n·6^4 ----
   * Allt skrivs med baserna 2 och 3; sedan jämförs exponenterna. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('2^4·3^8=9^n·6^4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Leden har olika baser. Jag']],
      [['skriver om 9 och 6 med hjälp']],
      [['av 2 och 3, så att allt går']],
      [['att jämföra.']]
    ]);
    y += 2.8 * F;
    T.str('9^n=(3^2)^n=3^2^n', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('6^4=(2·3)^4=2^4·3^4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag ihop högerledet.']],
      [['Samma bas multiplicerad med sig']],
      [['själv: exponenterna adderas.']]
    ]);
    y += 2.8 * F;
    T.str('HL=3^2^n·2^4·3^4=2^4·3^2^n^+^4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Båda leden har 2^4, så det är']],
      [['treornas exponenter som måste']],
      [['vara lika.']]
    ]);
    y += 2.6 * F;
    T.str('8=2n+4', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('2n=4 ⟹ n=2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 9^2·6^4=81·1 296 och']],
      [['2^4·3^8=16·6 561. Båda blir']],
      [['104 976.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: n=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= DELPROV C ================= */

  /* ---- Uppgift 17: kulspelet ----
   * Allt hänger på träddiagrammet: träff 0,1 och miss 0,9 i varje kast,
   * och nettovinsten 4−k när träffen kommer i kast k. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);

    y = 182;
    T.str('15 träffar på 150 kast', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Den relativa frekvensen ur']],
      [['Camillas observationer får bli']],
      [['sannolikheten för träff.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('I. P(träff)=', padL, y);
    xx = T.fracOp('15', '150', '/15', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('1', '10', xx, y);
    T.str('=0,1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Antingen träffar han eller']],
      [['missar. Tillsammans blir det 1.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('P(miss)=1-0,1=0,9', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar I: 0,1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- II: träddiagrammet ---- */
    tanke(y, [
      [['Nu ritar jag träddiagrammet.']],
      [['Varje kast har samma två']],
      [['möjligheter, med samma']],
      [['sannolikheter.']]
    ]);
    var nx = padL + 60, ny = 700, dx = 150, dy = 92;
    /* grenarna: från varje missnod går det vidare ett kast till.
     * Träff-etiketten läggs till HÖGER om grenens slut (som är en
     * ändpunkt), miss-etiketten NEDANFÖR till vänster — där fortsätter
     * ju nästa kasts grenar, och etiketten får inte ligga på dem. */
    for (i = 0; i < 3; i++) {
      var x0 = nx + i * dx, y0 = ny + i * dy;
      T.line([x0, y0], [x0 + dx - 20, y0 - dy]);
      T.str('0,1', x0 + 26, y0 - dy / 2 - 12, BLUE, 0.55);
      T.pause(120);
      T.str('träff', x0 + dx - 8, y0 - dy + 6, null, 0.55);
      T.pause(120);
      T.line([x0, y0], [x0 + dx - 20, y0 + dy]);
      T.str('0,9', x0 + 26, y0 + dy / 2 + 18, BLUE, 0.55);
      T.pause(120);
      if (i < 2) {
        T.str('miss', x0 + dx - 26 - T.adv('miss', 0.55),
              y0 + dy + 0.85 * F, null, 0.55);
      } else {
        T.str('miss', x0 + dx - 8, y0 + dy + 6, null, 0.55);
      }
      T.pause(160);
    }
    T.str('kast 1', nx + 60, ny - dy - 44, null, 0.55);
    T.str('kast 2', nx + dx + 60, ny - dy - 44, null, 0.55);
    T.str('kast 3', nx + 2 * dx + 60, ny - dy - 44, null, 0.55);
    T.stepEnd();

    y = 1060;
    xe = T.str('Svar II: 0,1 för träff och 0,9', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('för miss i varje kast', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- III ---- */
    tanke(y, [
      [['Han vinner 4 kulor vid träff,']],
      [['men förlorar en kula per kast.']],
      [['Kommer träffen i kast k blir']],
      [['nettot 4-k.']]
    ]);
    y += 2.9 * F;
    T.str('III. netto=4-k', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('kast 1: 4-1=+3', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('kast 2: 4-2=+2', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('kast 3: 4-3=+1', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('kast 4: 4-4=0', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Träff i kast 4 ger varken plus']],
      [['eller minus, och senare träffar']],
      [['ger minus.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar III: 1, 2 eller 3 kulor', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- IV ---- */
    tanke(y, [
      [['Precis två kulor plus betyder']],
      [['träff i KAST 2: först en miss,']],
      [['sedan en träff.']]
    ]);
    y += 2.9 * F;
    T.str('IV. P=0,9·0,1=0,09', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar IV: 0,09', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- V ---- */
    tanke(y, [
      [['Minst en kula plus betyder träff']],
      [['i kast 1, 2 ELLER 3. De kan inte']],
      [['inträffa samtidigt, så']],
      [['sannolikheterna adderas.']]
    ]);
    y += 2.9 * F;
    T.str('V. kast 1: 0,1', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('kast 2: 0,9·0,1=0,09', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('kast 3: 0,9·0,9·0,1=0,081', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('P=0,1+0,09+0,081=0,271', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar V: 0,271', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- VI ---- */
    tanke(y, [
      [['Att gå minus med minst en kula']],
      [['betyder att han kastat minst 5']],
      [['gånger, alltså missat de fyra']],
      [['första.']]
    ]);
    y += 2.9 * F;
    T.str('VI. P=0,9^4=0,6561', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Han träffar bara var']],
      [['tionde kast, så oftast går det']],
      [['fyra kast utan träff.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar VI: ungefär 0,66', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= DELPROV D ================= */

  /* ---- Uppgift 18: klockan 1 000 timmar senare ----
   * Hela dygn ändrar inte klockslaget — bara resten spelar roll. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('Klockan 09.00 + 1 000 timmar', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett helt dygn är 24 timmar och']],
      [['flyttar inte klockslaget alls.']],
      [['Alltså räknar jag hur många hela']],
      [['dygn som ryms.']]
    ]);
    y += 2.8 * F;
    T.str('41·24=984', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('1 000-984=16 timmar över', padL, y);
    T.stepEnd();

    tanke(y, [
      [['De 41 dygnen ändrar bara datum.']],
      [['Kvar att lägga på är 16 timmar.']]
    ]);
    y += 2.6 * F;
    T.str('09.00+16 h=25.00=01.00', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: klockan 01.00', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 19: bromssträckan ----
   * Båda sträckorna räknas ut och jämförs. Skillnaden blir mycket större
   * än man tror, eftersom hastigheten kvadreras. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.str('s=', padL, y);
    T.fracH('v^2', '200', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag räknar ut bromssträckan vid']],
      [['båda hastigheterna och jämför']],
      [['dem sedan.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('v=50: s=', padL, y);
    xx = T.fracH('50^2', '200', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('2 500', '200', xx, y);
    T.str('=12,5 m', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('v=70: s=', padL, y);
    xx = T.fracH('70^2', '200', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('4 900', '200', xx, y);
    T.str('=24,5 m', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Frågan gäller hur mycket LÄNGRE,']],
      [['alltså skillnaden mellan']],
      [['sträckorna.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('24,5-12,5=12 m', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Lägg märke till: 40 % högre fart']],
      [['gav nästan dubbelt så lång']],
      [['bromssträcka. Hastigheten']],
      [['kvadreras ju.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 12 m längre', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 20: det missvisande mejldiagrammet ----
   * a) 82 % av avläst värde, b) x-axeln är inte ekvidistant, c) hur
   * kurvan skulle ändras. Diagrammet ritas av som i provet, med de
   * ojämna årtalen jämnt fördelade. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var gx = padL + 70, gy = 320, gw = 300, gh = 240;   /* diagramrutan */
    var ar = [2002, 2004, 2005, 2006, 2007, 2010];
    var vd = [10, 18, 35, 60, 107, 190];
    function X(i) { return gx + i * (gw / 5); }
    function Y(v) { return gy - v * (gh / 200); }

    /* ---- steg 1: rita av diagrammet ---- */
    T.line([gx, gy], [gx + gw + 26, gy]);
    axelPil(T, gx + gw + 26, gy, 'hoger');
    T.pause(140);
    T.line([gx, gy], [gx, gy - gh - 26]);
    axelPil(T, gx, gy - gh - 26, 'upp');
    T.pause(160);
    for (i = 0; i <= 4; i++) {
      var v = i * 50;
      T.line([gx - 5, Y(v)], [gx + 5, Y(v)]);
      T.str(String(v), gx - 12 - T.adv(String(v), 0.5), Y(v) + 0.16 * F,
            null, 0.5);
      T.pause(80);
    }
    T.pause(140);
    for (i = 0; i < 6; i++) {
      T.str(String(ar[i]), X(i) - T.adv('2002', 0.5) / 2, gy + 0.85 * F,
            null, 0.5);
      T.pause(80);
    }
    T.pause(140);
    acts.push({ kind: 'stroke', pts: ar.map(function (a, k) {
      return [X(k), Y(vd[k])]; }) });
    for (i = 0; i < 6; i++) {
      acts.push({ kind: 'stroke', pts: V.dotPts(X(i), Y(vd[i])) });
      T.pause(60);
    }
    T.str('miljarder mejl', gx + 10, gy - gh - 12, null, 0.55);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(gy + 60, [
      [['Först läser jag av hur många']],
      [['mejl som skickades 2010, och']],
      [['tar sedan 82 % av det.']]
    ], 0);
    T.line([gx, Y(190)], [X(5), Y(190)], BLUE);
    T.pause(200);
    y = 480;
    T.str('a) 2010: ungefär 190 miljarder', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('0,82·190=155,8≈156', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: ungefär 156 miljarder', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Nu tittar jag på x-axeln. Mellan']],
      [['2006 och 2007 är det 1 år, men']],
      [['mellan 2007 och 2010 är det 3 —']],
      [['ändå lika stort avstånd.']]
    ]);
    y += 2.9 * F;
    T.str('b) 2006 till 2007: 1 år', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2007 till 2010: 3 år', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar b: årtalen ligger lika', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('tätt fast åren inte gör det', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['Med rätt skala skulle 2008 och']],
      [['2009 ta plats på axeln. Sista']],
      [['steget blir tre gånger så brett']],
      [['men lika högt.']]
    ]);
    y += 2.9 * F;
    xe = T.str('Svar c: kurvan blir mindre', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('brant på slutet', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: takvinkeln ----
   * Förhållandet 1:3 gäller HELA bredden, så den rätvinkliga triangeln
   * har halva bredden som närliggande katet. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var Lx = padL + 60, Rx = padL + 360, By = 300, Ty = By - 100;
    var Mx = (Lx + Rx) / 2;

    /* ---- steg 1: taket ---- */
    T.line([Lx, By], [Mx, Ty]); T.pause(130);
    T.line([Mx, Ty], [Rx, By]); T.pause(130);
    T.line([Lx, By], [Rx, By]); T.pause(150);
    var i;
    for (i = 0; i < 8; i++) {
      if (i % 2) continue;
      T.line([Mx, Ty + (By - Ty) * (i / 8)], [Mx, Ty + (By - Ty) * ((i + 1) / 8)]);
    }
    V.ratVinkel(T, [Mx, By], [1, 0], [0, -1], 12);
    T.pause(160);
    V.vinkelBage(T, [Rx, By], -Math.PI, -(Math.PI - 0.588), 44);
    T.str('v', Rx - 74, By - 16, null, 0.62);
    T.pause(180);
    T.str('1', Mx + 12, (Ty + By) / 2, BLUE, 0.62);
    T.pause(140);
    T.str('3', Mx - 8, By + 0.95 * F, BLUE, 0.62);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(By + 60, [
      [['Förhållandet gäller HELA bredden,']],
      [['men den rätvinkliga triangeln']],
      [['har bara halva: 1,5.']]
    ], 0);
    y = 440;
    T.str('a) halva bredden=1,5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Höjden 1 är motstående katet']],
      [['till v och 1,5 är närliggande.']],
      [['Motstående delat med']],
      [['närliggande: tangens.']]
    ]);
    y += 3.2 * F;
    xx = T.str('tan v=', padL, y);
    xx = T.fracH('1', '1,5', xx, y);
    T.str('=0,666...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu vet jag tangens för vinkeln.']],
      [['Vinkeln själv får jag med']],
      [['räknarens inverta tangens.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('v=33,69...°≈34°', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: ungefär 34°', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Förhållandet 1 till 1,5 ger halva']],
      [['bredden 0,75. Samma räkning en']],
      [['gång till.']]
    ]);
    y += 3.0 * F;
    xx = T.str('b) tan v=', padL, y);
    xx = T.fracH('1', '0,75', xx, y);
    T.str('=1,333...', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('v=53,13...°≈53°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Dubbla den första vinkeln vore']],
      [['2·34=68°, men vi fick 53°.']],
      [['Sambandet är inte proportionellt.']]
    ]);
    y += 2.6 * F;
    T.str('2·34°=68° men v≈53°', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: nej, vinkeln blir 53°', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 22: elpriset baklänges ----
   * 40 % lägre betyder faktorn 0,6 — och det är det GAMLA priset som
   * söks, alltså en division. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('0,6x=27') + 0.9 * F;

    y = 210;
    T.str('x=priset år 2013', padL, y);
    T.stepEnd();

    tanke(y, [
      [['40 % lägre betyder att 60 % är']],
      [['kvar, alltså faktorn 0,6. Det']],
      [['gamla priset gånger 0,6 är 2014']],
      [['års pris.']]
    ]);
    y += 2.8 * F;
    T.str('0,6x=27', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 0,6, så jag']],
      [['dividerar båda led med 0,6.']]
    ]);
    if (vagg) {
      T.vaggOp('/0,6', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('0,6x', '0,6', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('27', '0,6', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('x=', padL + 30, y);
    xx = T.fracH('27', '0,6', xx, y);
    T.str('=45', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Priset ska ha varit']],
      [['HÖGRE 2013, och 45 är mer än 27.']],
      [['Kontroll: 45·0,6=27.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: 45 öre per kWh', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 23: befolkningens årliga ökning ----
   * 120 år med samma faktor ger a^120 = 2. */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('1750 till 1870: 120 år', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Befolkningen dubblades, alltså']],
      [['multiplicerades med 2 totalt.']],
      [['Samma faktor a varje år, i 120']],
      [['år.']]
    ]);
    y += 2.8 * F;
    T.str('a^1^2^0=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Motsatsen till att upphöja till']],
      [['120 är att dra 120:e roten.']]
    ]);
    y += 2.6 * F;
    xx = T.str('a=', padL, y);
    xx = T.rot('2', xx, y, 120);
    T.str('=1,00578...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Faktorn 1,0058 betyder en ökning']],
      [['med knappt 6 tusendelar per år.']]
    ]);
    y += 2.6 * F;
    T.str('1,00578...-1=0,00578...', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('≈0,006=0,6 %', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? En knapp procent per år']],
      [['räcker för att dubbla på drygt']],
      [['hundra år.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: ungefär 0,6 % per år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: skoldiscot ----
   * a) vinsten vid 100 biljetter, b) vinstfunktionen, c) värdemängden
   * mellan noll och max antal biljetter. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('Kostnad: 500+1 500=2 000 kr', padL, y);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['Vinsten är intäkten minus']],
      [['kostnaden. Intäkten är 50 kr']],
      [['per biljett.']]
    ]);
    y += 2.8 * F;
    T.str('a) intäkt=100·50=5 000 kr', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('vinst=5 000-2 000=3 000 kr', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: 3 000 kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Samma räkning men med x']],
      [['biljetter i stället för 100.']],
      [['Kostnaden är densamma oavsett']],
      [['hur många som kommer.']]
    ]);
    y += 2.9 * F;
    T.str('b) V(x)=50x-2 000', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Kontroll: V(100)=5 000-2 000=3 000', padL + 30, y, null, 0.7);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: V(x)=50x-2 000', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['Värdemängden är alla vinster']],
      [['som kan uppstå. Funktionen växer']],
      [['med x, så ändpunkterna ger']],
      [['ytterligheterna.']]
    ]);
    y += 2.9 * F;
    T.str('c) V(0)=0-2 000=-2 000', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('V(200)=10 000-2 000=8 000', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kommer ingen alls förlorar de']],
      [['2 000 kr; blir det fullt tjänar']],
      [['de 8 000 kr.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar c: -2 000≤V(x)≤8 000', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 25: sms-lånet ----
   * 20 % ränta varje månad, tolv gånger — exponentiell tillväxt. */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('Lån: 1 000 kr', padL, y);
    T.stepEnd();

    tanke(y, [
      [['20 % ränta betyder att skulden']],
      [['blir 120 % av sig själv varje']],
      [['månad, alltså faktorn 1,20.']]
    ]);
    y += 2.8 * F;
    T.str('Faktor per månad: 1,20', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Hon lånar om skulden varje']],
      [['månad, så faktorn används 12']],
      [['gånger på ett år.']]
    ]);
    y += 2.6 * F;
    T.str('skuld=1 000·1,20^1^2', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('=1 000·8,9161...', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=8 916,1...≈8 916 kr', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Skulden har nästan niodubblats']],
      [['på ett år. Så snabbt växer en']],
      [['hög ränta när den läggs på']],
      [['gång på gång.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ungefär 8 916 kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 26: de två cirklarna ----
   * Triangeln m–M–P har två kateter som båda är lilla radien och
   * hypotenusan lika med stora radien. */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var m = [padL + 150, 250], rr = 74;
    var M = [m[0] + rr, m[1]], P = [m[0], m[1] - rr];
    var RR = rr * Math.SQRT2;

    /* ---- steg 1: figuren ---- */
    acts.push({ kind: 'stroke', pts: V.ringPts(m[0], m[1], rr, rr) });
    T.pause(200);
    acts.push({ kind: 'stroke', pts: V.ringPts(M[0], M[1], RR, RR) });
    T.pause(220);
    T.str('m', m[0] - 24, m[1] + 6, null, 0.62);
    T.pause(120);
    T.str('M', M[0] + 8, M[1] + 22, null, 0.62);
    T.pause(120);
    T.str('P', P[0] - 22, P[1] - 6, null, 0.62);
    T.pause(160);
    T.line(m, M); T.pause(120);
    T.line(m, P); T.pause(120);
    T.line(M, P); T.pause(150);
    V.ratVinkel(T, m, [1, 0], [0, -1], 13);
    T.stepEnd();

    tanke(m[1] + RR + 30, [
      [['M ligger PÅ lilla cirkeln, så']],
      [['sträckan från m till M är lilla']],
      [['radien r. Och P ligger också på']],
      [['lilla cirkeln: mP=r.']]
    ], 0);
    y = 500;
    T.str('mM=r   och   mP=r', padL, y);
    T.stepEnd();

    tanke(y, [
      [['P ligger dessutom på STORA']],
      [['cirkeln, vars mittpunkt är M.']],
      [['Alltså är MP stora radien R.']]
    ]);
    y += 2.6 * F;
    T.str('MP=R', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Triangeln är rätvinklig vid m,']],
      [['och R är hypotenusan. Pythagoras']],
      [['ger sambandet mellan radierna.']]
    ]);
    y += 2.6 * F;
    T.str('R^2=r^2+r^2=2r^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu jämför jag areorna. Stora']],
      [['cirkelns area innehåller R^2,']],
      [['som jag just skrivit om.']]
    ]);
    y += 2.6 * F;
    T.str('A_s_t_o_r=πR^2=π·2r^2=2πr^2', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('A_l_i_t_e_n=πr^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Uträkningen använde bara r,']],
      [['aldrig ett bestämt tal — så det']],
      [['gäller för alla sådana cirklar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: A_s_t_o_r=2·A_l_i_t_e_n', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 27: associativa lagen för vektorer ----
   * Ett exempel räcker, eftersom uppgiften ber om just ett exempel. */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    function vek(ch, x, yb, col) {
      var x1 = T.str(ch, x, yb, col || null);
      vecPil(T, F, x + 1, x1 - 2, yb, col || null, 1.02);
      return x1;
    }

    tanke(60, [
      [['Uppgiften ber om ett EXEMPEL,']],
      [['så jag väljer tre vektorer själv']],
      [['och räknar ut båda leden.']]
    ], 0);
    y = 190;
    xx = vek('u', padL, y);
    xx = T.str('=(1, 2)   ', xx, y);
    xx = vek('v', xx, y);
    xx = T.str('=(3, 1)   ', xx, y);
    xx = vek('w', xx, y);
    T.str('=(2, 4)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Vänsterledet först: parentesen']],
      [['räknas ut innan w adderas.']]
    ]);
    y += 2.6 * F;
    xx = T.str('VL: ', padL, y);
    xx = vek('u', xx, y);
    xx = T.str('+', xx, y);
    xx = vek('v', xx, y);
    T.str('=(1+3, 2+1)=(4, 3)', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('(4, 3)+(2, 4)=(6, 7)', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Sedan högerledet, där den andra']],
      [['parentesen räknas ut först.']]
    ]);
    y += 2.6 * F;
    xx = T.str('HL: ', padL, y);
    xx = vek('v', xx, y);
    xx = T.str('+', xx, y);
    xx = vek('w', xx, y);
    T.str('=(3+2, 1+4)=(5, 5)', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('(1, 2)+(5, 5)=(6, 7)', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Båda leden gav samma vektor.']],
      [['Det spelar alltså ingen roll']],
      [['vilka två man adderar först.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: VL=HL=(6, 7)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 28: kaffepriset och basåret ----
   * Index 330 betyder 3,3 gånger basårets pris. Priset läses av i
   * diagrammet, divideras med 3,3 och söks upp igen i kurvan. */
  reg(28, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    /* diagrammet läggs lågt nog att kurvans toppar inte når in i
     * inställningsrutans hörn (x>420 ovanför y=150) */
    var gx = padL + 60, gy = 360, gw = 560, gh = 200;
    function X(a) { return gx + (a - 1921) * (gw / 90); }
    function Y(v) { return gy - v * (gh / 80); }
    /* kurvan förenklad ur provets diagram: [år, kr/kg] */
    var kurva = [[1921, 4], [1930, 4], [1935, 5], [1940, 6], [1946, 6],
                 [1950, 9], [1952, 15], [1955, 12], [1960, 11], [1965, 12],
                 [1970, 12], [1974, 14], [1977, 41], [1979, 30], [1980, 34],
                 [1983, 45], [1986, 67], [1988, 48], [1991, 47], [1994, 60],
                 [1995, 76], [1997, 74], [2000, 55], [2004, 49], [2007, 55],
                 [2009, 63], [2011, 79]];

    /* ---- steg 1: rita av diagrammet ---- */
    T.line([gx, gy], [gx + gw + 24, gy]);
    axelPil(T, gx + gw + 24, gy, 'hoger');
    T.pause(140);
    T.line([gx, gy], [gx, gy - gh - 24]);
    axelPil(T, gx, gy - gh - 24, 'upp');
    T.pause(160);
    for (i = 0; i <= 4; i++) {
      var v = i * 20;
      T.line([gx - 5, Y(v)], [gx + 5, Y(v)]);
      T.str(String(v), gx - 12 - T.adv(String(v), 0.5), Y(v) + 0.16 * F,
            null, 0.5);
      T.pause(70);
    }
    T.pause(120);
    [1930, 1950, 1970, 1990, 2010].forEach(function (a) {
      T.line([X(a), gy - 5], [X(a), gy + 5]);
      T.str(String(a), X(a) - T.adv('1930', 0.5) / 2, gy + 0.85 * F, null, 0.5);
      T.pause(70);
    });
    T.pause(140);
    acts.push({ kind: 'stroke',
                pts: kurva.map(function (p) { return [X(p[0]), Y(p[1])]; }) });
    T.str('kr/kg', gx + 10, gy - gh - 10, null, 0.55);
    T.stepEnd();

    tanke(gy + 50, [
      [['Index 330 betyder att priset']],
      [['2011 var 3,3 gånger så högt som']],
      [['under basåret.']]
    ], 0);
    y = 520;
    T.str('pris 2011=3,3·pris basåret', padL, y);
    T.stepEnd();

    tanke(y, [
      [['2011 års pris läser jag av i']],
      [['diagrammet: kurvans sista topp.']]
    ]);
    T.line([gx, Y(79)], [X(2011), Y(79)], BLUE);
    T.pause(200);
    y += 2.6 * F;
    T.str('pris 2011≈79 kr/kg', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Basårets pris får jag genom att']],
      [['dividera med 3,3.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('pris basåret=', padL, y);
    xx = T.fracH('79', '3,3', xx, y);
    T.str('=23,9...≈24', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu letar jag i kurvan efter det']],
      [['år då priset var ungefär 24']],
      [['kr/kg.']]
    ], 1.05);
    T.line([gx, Y(24)], [X(1976), Y(24)], BLUE);
    T.pause(160);
    acts.push({ kind: 'stroke', color: BLUE, pts: V.dotPts(X(1976), Y(24)) });
    T.pause(200);
    y += 3.4 * F;
    T.str('24 kr/kg ⟺ omkring 1976', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Avläsningarna är ungefärliga,']],
      [['så svaret ges som ett litet']],
      [['intervall.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ungefär år 1976', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

})();

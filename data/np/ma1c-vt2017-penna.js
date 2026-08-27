/* ma1c-vt2017-penna.js — pennlösningar till Nationellt prov Ma 1c, VT 2017.
 *
 * Samma upplägg som ma1c-vt2022-penna.js: en scen per uppgift, registrerad
 * under namnet "ma1c-vt2017-u<nr>". Reglerna står i handskrift.js filhuvud
 * och i data/np/RIKTLINJER.md — de som oftast bränner:
 *   - inget bläck vid x > 696 (stega-pilens band) eller x < 24,
 *   - inget med x > 420 ovanför y = 150 (y = 210 i ekvval-scener),
 *   - en tanke per led, direkt före ledet,
 *   - division alltid med vågrätt streck,
 *   - blå båge till varje term när en parentes utvecklas,
 *   - ekvationsscener stödjer båda redovisningslägena med samma stegantal.
 *
 * Granskning: node .claude/verify-handskrift.js ma1c-vt2017-u1 …
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

  function reg(nr, fn) { HK.registrera('ma1c-vt2017-u' + nr, fn); }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 1: lös 12x+5=12-2x ----
   * x finns i båda leden: samla dem först, lös sedan som vanligt. */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + T.adv('12x+5=12-2x'),
                       padL + 30 + T.adv('14x+5=12')) + 0.9 * F;

    y = 238;
    T.str('12x+5=12-2x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x finns i BÅDA leden. Först']],
      [['samlar jag dem i vänsterledet:']],
      [['adderar 2x till båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+2x', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('12x+5', padL + 30, y);
      xx = T.str('+2x', xx, y, BLUE);
      xx = T.str('=12-2x', xx, y);
      T.str('+2x', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('14x+5=12', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Femman adderas i vänsterledet,']],
      [['så jag subtraherar 5 från']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-5', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('14x+5', padL + 30, y);
      xx = T.str('-5', xx, y, BLUE);
      xx = T.str('=12', xx, y);
      T.str('-5', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('14x=7', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist dividerar jag båda led']],
      [['med 14.']]
    ]);
    if (vagg) {
      T.vaggOp('/14', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('14x', '14', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('7', '14', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('x=', padL + 30, y);
    xx = T.fracOp('7', '14', '/7', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('1', '2', xx, y);
    T.str('=0,5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: VL blir 6+5=11 och']],
      [['HL blir 12-1=11. Stämmer.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x=0,5', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 2: addera vektorerna (3, 4) och (2, −5) ---- */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    function vek(ch, x, yb, col) {
      var x1 = T.str(ch, x, yb, col || null);
      vecPil(T, F, x + 1, x1 - 2, yb, col || null, 1.02);
      return x1;
    }

    y = 182;
    xx = vek('u', padL, y);
    xx = T.str('=(3, 4)', xx, y);
    xx = T.str('   ', xx, y);
    xx = vek('v', xx, y);
    T.str('=(2, -5)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Vektorer adderas koordinatvis:']],
      [['x-koordinat plus x-koordinat,']],
      [['y-koordinat plus y-koordinat.']]
    ]);
    y += 2.6 * F;
    xx = vek('u', padL, y);
    xx = T.str('+', xx, y);
    xx = vek('v', xx, y);
    T.str('=(3+2, 4+(-5))', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Att addera -5 är detsamma som']],
      [['att subtrahera 5: 4-5=-1.']]
    ]);
    y += 2.5 * F;
    T.str('=(5, -1)', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: (5, -1)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: uttrycket 4(x+2)-3(2x-2) ----
   * a) värdet för x=1, b) ekvationen som ger värdet 18. Minustecknet
   * framför den andra parentesen är hela poängen i b). */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xwB = Math.max(padL + 30 + T.adv('-2x+14=18'),
                       padL + 30 + T.adv('-2x=4')) + 0.9 * F;

    /* ---- a) ---- */
    y = 238;
    var e0 = padL;
    var e1 = T.str('4(x+2)-3(2x-2)', padL, y);
    var yE = y;
    T.stepEnd();

    tanke(y, [
      [['I a) ska jag bara sätta in']],
      [['x=1 där x står, och räkna ut']],
      [['värdet.']]
    ]);
    y += 2.6 * F;
    var v0 = padL, v1 = T.str('a) x=1', padL, y), yV = y;
    T.stepEnd();

    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.4 * F;
    T.str('4(1+2)-3(2·1-2)', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Parenteserna först: 1+2=3 och']],
      [['2-2=0. Andra termen blir alltså']],
      [['3 gånger noll, alltså noll.']]
    ]);
    y += 2.5 * F;
    T.str('=4·3-3·0=12-0=12', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 12', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) är värdet känt men inte x.']],
      [['Då förenklar jag uttrycket']],
      [['först, så blir ekvationen enkel.']]
    ]);
    y += 2.9 * F;
    var f0 = padL; xx = T.str('b) ', padL, y);
    f0 = xx; xx = T.str('4', xx, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('x', xx, y); var t1b = xx;
    var t2 = xx; xx = T.str('+2', xx, y); var t2b = xx;
    xx = T.str(')', xx, y);
    var g0 = xx; xx = T.str('-3', xx, y); var g1 = xx;
    xx = T.str('(', xx, y);
    var s1 = xx; xx = T.str('2x', xx, y); var s1b = xx;
    var s2 = xx; xx = T.str('-2', xx, y); var s2b = xx;
    T.str(')', xx, y);
    var yK = y;
    T.stepEnd();

    tanke(y, [
      [['Fyran multipliceras med varje']],
      [['term i den första parentesen.']]
    ]);
    y += 3.0 * F;
    xx = T.str('=', padL + 30, y);
    xx = multIn(xx, y, yK - 0.95 * F, [
      { fran: [f0, f1], till: [t1, t1b], skriv: '4x', hojd: 26 },
      { fran: [f0, f1], till: [t2, t2b], skriv: '+8', hojd: 44, dx: 4 }
    ]);
    T.str('-3(2x-2)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Framför den andra parentesen']],
      [['står -3. Minustecknet följer']],
      [['med in: -3·2x=-6x och']],
      [['-3·(-2)=+6.']]
    ]);
    y += 3.0 * F;
    xx = T.str('=4x+8', padL + 30, y);
    multIn(xx, y, yK - 0.95 * F, [
      { fran: [g0, g1], till: [s1, s1b], skriv: '-6x', hojd: 26 },
      { fran: [g0, g1], till: [s2, s2b], skriv: '+6', hojd: 46, dx: 4 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Slå ihop lika termer:']],
      [['4x-6x=-2x och 8+6=14.']]
    ]);
    y += 2.5 * F;
    T.str('=-2x+14', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag det förenklade']],
      [['uttrycket lika med 18.']]
    ]);
    y += 2.5 * F;
    T.str('-2x+14=18', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['14 adderas, så jag subtraherar']],
      [['14 från båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-14', xwB, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('-2x+14', padL + 30, y);
      xx = T.str('-14', xx, y, BLUE);
      xx = T.str('=18', xx, y);
      T.str('-14', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('-2x=4', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med -2, så jag']],
      [['dividerar båda led med -2.']],
      [['Ett positivt tal delat med ett']],
      [['negativt blir negativt.']]
    ]);
    if (vagg) {
      T.vaggOp('/(-2)', xwB, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('-2x', '-2', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('4', '-2', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('x=-2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 4(-2+2)=0 och']],
      [['-3(-4-2)=-3·(-6)=18.']],
      [['Summan blir 18. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x=-2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 5: vilka andelar motsvarar 0,12 %? ----
   * Alla alternativ skrivs om till decimalform, så att de går att
   * jämföra direkt. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* raden är bred → under inställningsrutans hörn (y=150) */
    y = 182;
    xx = T.str('0,12 %=', padL, y);
    xx = T.fracH('0,12', '100', xx, y);
    T.str('=0,0012', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu skriver jag om varje']],
      [['alternativ till decimalform och']],
      [['jämför med 0,0012. Promille är']],
      [['tusendelar, ppm miljondelar.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('12 ‰=', padL, y);
    xx = T.fracH('12', '1 000', xx, y);
    xx = T.str('=0,012', xx, y);
    T.str('  för stort', xx, y, null, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('1,2 ‰=', padL, y);
    xx = T.fracH('1,2', '1 000', xx, y);
    xx = T.str('=0,0012', xx, y);
    T.str('  stämmer', xx, y, null, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('120 ‰=', padL, y);
    xx = T.fracH('120', '1 000', xx, y);
    xx = T.str('=0,12', xx, y);
    T.str('  för stort', xx, y, null, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('120 ppm=', padL, y);
    xx = T.fracH('120', '1 000 000', xx, y);
    xx = T.str('=0,00012', xx, y);
    T.stepEnd();
    y += 2.0 * F;
    T.str('för litet', padL + 60, y, null, 0.62);
    T.stepEnd();

    y += 2.6 * F;
    xx = T.str('1 200 ppm=', padL, y);
    xx = T.fracH('1 200', '1 000 000', xx, y);
    xx = T.str('=0,0012', xx, y);
    T.stepEnd();
    y += 2.0 * F;
    T.str('stämmer', padL + 60, y, null, 0.62);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: 1,2 ‰ och 1 200 ppm', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 7: talet mellan 40 och 50 ----
   * Villkoren sållar bort tal ur listan, ett i taget. Det som stryks
   * stryks med blåpennan, precis som man gör för hand. */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('Heltal mellan 40 och 50:', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    var xs = [];
    /* mellanslag i stället för komma som avskiljare — nio tvåsiffriga tal
     * med ", " emellan blir bredare än arket */
    var xx = padL;
    ['41', '42', '43', '44', '45', '46', '47', '48', '49'].forEach(function (t) {
      var a = xx;
      xx = T.str(t, xx, y);
      xs.push([a, xx]);
      xx = T.str(' ', xx, y);
    });
    var yRad = y;
    T.stepEnd();

    tanke(y, [
      [['Talet är inte delbart med 2,']],
      [['alltså inte jämnt. Alla jämna']],
      [['tal stryks.']]
    ]);
    [1, 3, 5, 7].forEach(function (i) {
      T.strike(xs[i][0], xs[i][1], yRad);
      T.pause(180);
    });
    T.stepEnd();

    tanke(y, [
      [['Talet är inte delbart med 3.']],
      [['Siffersumman i 45 är 4+5=9,']],
      [['som är delbar med 3. Bort med']],
      [['45.']]
    ]);
    T.strike(xs[4][0], xs[4][1], yRad);
    T.stepEnd();

    tanke(y, [
      [['Kvar: 41, 43, 47 och 49. Talet']],
      [['är INTE ett primtal, så de tre']],
      [['primtalen stryks också.']]
    ]);
    [0, 2, 6].forEach(function (i) {
      T.strike(xs[i][0], xs[i][1], yRad);
      T.pause(200);
    });
    T.stepEnd();

    tanke(y, [
      [['Kvar är 49. Och mycket riktigt:']],
      [['49=7·7, alltså inget primtal.']]
    ]);
    y += 3.0 * F;
    T.str('49=7·7', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 49', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 8: vilka potenser har samma värde? ---- */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 130;
    T.str('0^5=0·0·0·0·0=0', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('1^4=1·1·1·1=1', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2^3=2·2·2=8', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('3^2=3·3=9', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('4^1=4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Vad blir ett tal upphöjt till']],
      [['noll? Alla potenser med']],
      [['exponenten 0 är lika med 1.']]
    ]);
    y += 2.5 * F;
    T.str('5^0=1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Värdena är 0, 1, 8, 9, 4 och 1.']],
      [['Två av dem är lika.']]
    ]);
    y += 2.5 * F;
    T.str('1^4=1 och 5^0=1', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 1^4 och 5^0', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: värdet av 3x+12 när x+4=12 ----
   * Genvägen är att se x+4 inuti uttrycket i stället för att först lösa
   * ut x. Båda vägarna visas. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    var v0 = padL, v1 = T.str('x+4=12', padL, y), yV = y;
    T.stepEnd();

    tanke(y, [
      [['Jag behöver inte veta x! Om jag']],
      [['bryter ut 3 ur uttrycket dyker']],
      [['x+4 upp, och det värdet är känt.']]
    ]);
    y += 2.6 * F;
    var e0 = padL, e1 = T.str('3x+12=3(x+4)', padL, y), yE = y;
    T.stepEnd();

    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.4 * F;
    T.str('=3·12=36', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med den långa vägen:']],
      [['x+4=12 ger x=8, och']],
      [['3·8+12=24+12=36. Samma svar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: 36', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 3: Celsius och Fahrenheit ----
   * a) två kända punkter markeras och linjen dras genom dem, b) svaret
   * läses av där linjen skär y-axeln (0 °C). */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    /* en ruta i x-led = 10 °C, en ruta i y-led = 25 °F */
    var A = mkAxes(T, F, { ox: padL + 180, oy: 300, u: 32, xsc: 10, ysc: 25,
                           xmin: -30, xmax: 45, ymin: -50, ymax: 125,
                           xlab: 'C', ylab: 'F' });

    /* ---- steg 1: rita av koordinatsystemet ---- */
    A.axes();
    A.ticks(V.heltal(-30, 40, 10), V.heltal(-50, 125, 25),
            [-20, 20, 40], [-25, 25, 50, 75, 100, 125]);
    T.stepEnd();

    tanke(430, [
      [['Sambandet är linjärt, alltså en']],
      [['rät linje. Två punkter räcker']],
      [['för att bestämma den, och båda']],
      [['står i uppgiften.']]
    ], 0);
    /* avlästa/givna värden i figuren → blåpennan */
    A.dot(-18, 0, BLUE);
    A.tag(-18, 0, '(-18, 0)', -104, -12, BLUE);
    T.pause(240);
    A.dot(38, 100, BLUE);
    A.tag(38, 100, '(38, 100)', -96, -14, BLUE);
    T.stepEnd();

    tanke(430, [
      [['Nu drar jag linjen genom']],
      [['punkterna med linjal och']],
      [['förlänger den åt båda hållen.']]
    ], 0);
    /* linjen: k=100/56 per °C, m=32,14 — dras genom hela fönstret */
    A.graphKM(100 / 56, 100 - (100 / 56) * 38, null, -30, 45);
    T.stepEnd();

    y = 530;
    xe = T.str('a) Se linjen i figuren.', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['0 °C betyder x=0, alltså där']],
      [['linjen skär y-axeln. Jag läser']],
      [['av på F-skalan.']]
    ]);
    A.dot(0, 32, BLUE);
    T.pause(160);
    A.tag(0, 32, '32', 12, -8, BLUE);
    T.pause(200);
    y += 2.8 * F;
    T.str('b) 0 °C ≈32 °F', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? 0 °F låg vid -18 °C,']],
      [['så 0 °C ska ligga en bra bit']],
      [['över 0 °F.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: ungefär 32 °F', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: dykaren ----
   * Grafen ger hastigheten (ett trappsteg), och hastigheten ger tiden
   * från ytan ned till 18 meters djup. */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    /* x = tid i minuter, y = meter över vattenytan (negativa värden) */
    var A = mkAxes(T, F, { ox: padL + 120, oy: 150, u: 30, xsc: 1, ysc: 5,
                           xmin: -3, xmax: 5, ymin: -20, ymax: 2,
                           xlab: 't', ylab: 'y' });

    A.axes();
    A.ticks(V.heltal(-3, 5), V.heltal(-20, 0, 5), [-2, 2, 4], [-5, -10, -15, -20]);
    T.pause(200);
    A.rule([A.X(0), A.Y(-6)], [A.X(4), A.Y(-18)]);
    T.stepEnd();

    tanke(400, [
      [['Grafen börjar på -6 m: där']],
      [['startade dykdatorn. Lutningen']],
      [['säger hur fort han sjunker.']]
    ], 0);
    A.stair(0, -6, 2, -12, '2 min', '6 m', { dxOff: [0, -6], dyOff: [6, 0] });
    T.pause(200);
    y = 500;
    xx = T.str('hastighet=', padL, y);
    xx = T.fracH('6 m', '2 min', xx, y);
    T.str('=3 m/min', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Frågan gäller hela vägen från']],
      [['YTAN, alltså 18 m, inte bara']],
      [['de 12 m dykdatorn visar.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('tid=', padL, y);
    xx = T.fracH('18 m', '3 m/min', xx, y);
    T.str('=6 min', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? De första 6 metrarna']],
      [['tog 2 minuter, och 18 m är tre']],
      [['gånger så långt.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: 6 minuter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 10: åldern i binär form ----
   * Sex ljus = sex binära siffror. Varje plats har sitt platsvärde, och
   * de tända ljusen adderas. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var x0 = padL + 40, yTart = 260, dx = 78;
    var tand = [true, true, false, false, true, false];

    /* ---- steg 1: rita tårtan med ljusen ---- */
    T.line([x0 - 24, yTart], [x0 + 5 * dx + 24, yTart]);
    T.pause(120);
    T.line([x0 - 24, yTart], [x0 - 24, yTart + 46]);
    T.line([x0 + 5 * dx + 24, yTart], [x0 + 5 * dx + 24, yTart + 46]);
    T.line([x0 - 24, yTart + 46], [x0 + 5 * dx + 24, yTart + 46]);
    T.pause(180);
    for (i = 0; i < 6; i++) {
      var cx = x0 + i * dx;
      T.line([cx - 5, yTart], [cx - 5, yTart - 44]);
      T.line([cx + 5, yTart], [cx + 5, yTart - 44]);
      T.line([cx - 5, yTart - 44], [cx + 5, yTart - 44]);
      if (tand[i]) {
        /* låga: en liten droppe ovanför veken */
        acts.push({ kind: 'stroke', pts: humanize([
          [cx, yTart - 48], [cx + 7, yTart - 60], [cx, yTart - 74],
          [cx - 7, yTart - 60], [cx, yTart - 48]]) });
      }
      T.pause(120);
    }
    T.stepEnd();

    tanke(yTart + 60, [
      [['Sex ljus är sex binära siffror.']],
      [['Varje plats är värd dubbelt så']],
      [['mycket som platsen till höger:']],
      [['1, 2, 4, 8, 16, 32.']]
    ], 0);
    /* platsvärdena skrivs under sitt ljus, i blått (värden i figuren) */
    var varden = [32, 16, 8, 4, 2, 1];
    for (i = 0; i < 6; i++) {
      var t = String(varden[i]);
      T.str(t, x0 + i * dx - T.adv(t, 0.72) / 2, yTart + 76, BLUE, 0.72);
      T.pause(140);
    }
    T.stepEnd();

    tanke(yTart + 90, [
      [['Ett tänt ljus betyder att den']],
      [['platsen räknas med. Tända är']],
      [['ljus 1, 2 och 5.']]
    ], 0);
    y = 430;
    T.str('32+16+2=50', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Med sex ljus kan man']],
      [['visa upp till 63 år, och 50']],
      [['ligger bra till för en lärare.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: 50 år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 11: rita en möjlig graf ----
   * De tre villkoren ritas in ett i taget som en "ram", och kurvan dras
   * sedan så att den fyller ramen och går genom (−3, 0). */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    /* figuren läggs så lågt att värdemängdens övre streckade linje
     * (y=4) hamnar under inställningsrutans hörn */
    var A = mkAxes(T, F, { ox: padL + 190, oy: 290, u: 30,
                           xmin: -6, xmax: 7, ymin: -4, ymax: 5 });
    function streckad(p1, p2) {
      var n = 11;
      for (i = 0; i < n; i++) {
        if (i % 2) continue;
        acts.push({ kind: 'stroke', color: BLUE, pts: humanize([
          [p1[0] + (p2[0] - p1[0]) * (i / n), p1[1] + (p2[1] - p1[1]) * (i / n)],
          [p1[0] + (p2[0] - p1[0]) * ((i + 1) / n),
           p1[1] + (p2[1] - p1[1]) * ((i + 1) / n)]]) });
      }
    }

    A.axes();
    A.ticks(V.heltal(-6, 7), V.heltal(-4, 5), [-5, -3, 3, 6], [-2, 2, 4]);
    T.stepEnd();

    tanke(430, [
      [['Definitionsmängden -5≤x≤6 säger']],
      [['var grafen får finnas i sidled.']],
      [['Jag drar två lodräta gränser.']]
    ], 0);
    streckad([A.X(-5), A.Y(-4)], [A.X(-5), A.Y(5)]);
    T.pause(200);
    streckad([A.X(6), A.Y(-4)], [A.X(6), A.Y(5)]);
    T.stepEnd();

    tanke(430, [
      [['Värdemängden -2≤f(x)≤4 säger var']],
      [['grafen får finnas i höjdled —']],
      [['och att både -2 och 4 ska nås.']]
    ], 0);
    streckad([A.X(-6), A.Y(4)], [A.X(7), A.Y(4)]);
    T.pause(200);
    streckad([A.X(-6), A.Y(-2)], [A.X(7), A.Y(-2)]);
    T.stepEnd();

    tanke(430, [
      [['f(-3)=0 betyder att grafen ska']],
      [['gå genom punkten (-3, 0).']]
    ], 0);
    /* ingen koordinatetikett här: ytan runt punkten är full av kurvan,
     * axelns skalsiffror och de streckade gränserna */
    A.dot(-3, 0, BLUE);
    T.stepEnd();

    tanke(430, [
      [['Nu drar jag en kurva som håller']],
      [['sig i rutan, nuddar taket och']],
      [['golvet och passerar punkten.']]
    ], 0);
    var kurva = [[-5, 1], [-4.2, 4], [-3.4, 2.4], [-3, 0], [-2.2, -1.4],
                 [-1.4, -2], [-0.4, -1.2], [1, 0.6], [2.6, 2.4], [4, 3.6],
                 [5, 3.2], [6, 2]];
    acts.push({ kind: 'stroke',
                pts: kurva.map(function (p) { return [A.X(p[0]), A.Y(p[1])]; }) });
    T.pause(200);
    A.dot(-5, 1);
    T.pause(120);
    A.dot(6, 2);
    T.stepEnd();

    y = 520;
    T.str('Grafen börjar i x=-5 och slutar', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('i x=6, nuddar 4 och -2 och går', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('genom (-3, 0).', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Det finns hur många riktiga']],
      [['grafer som helst — allt som']],
      [['uppfyller de tre villkoren']],
      [['duger.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: se grafen i figuren', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 12: lösning där x och y är lika ---- */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('7x=10') + 0.9 * F;

    y = 238;
    var e0 = padL, e1 = T.str('8x-y=10', padL, y), yE = y;
    T.stepEnd();

    tanke(y, [
      [['x och y ska ha samma värde.']],
      [['Då kan jag byta ut y mot x och']],
      [['få en ekvation med bara ett']],
      [['obekant.']]
    ]);
    y += 2.6 * F;
    var v0 = padL, v1 = T.str('y=x', padL, y), yV = y;
    T.stepEnd();

    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.4 * F;
    T.str('8x-x=10', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['8x-x är 7x — åtta x minus ett x.']]
    ]);
    y += 2.4 * F;
    T.str('7x=10', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Dividerar båda led med 7.']],
      [['10 delat med 7 går inte jämnt']],
      [['ut, så svaret blir ett bråk.']]
    ]);
    if (vagg) {
      T.vaggOp('/7', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('7x', '7', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('10', '7', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('x=', padL + 30, y);
    T.fracH('10', '7', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Och y är ju lika med x.']],
      [['Kontroll: 8 sjundedelar minus']],
      [['1 sjundedel av 10 blir 10.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x=y=', padL, y);
    xe = T.fracH('10', '7', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 13: sin v i den rätvinkliga triangeln ----
   * De två KORTASTE sidorna är kateterna; hypotenusan räknas ut med
   * Pythagoras. Minsta vinkeln står mot den kortaste sidan. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);
    /* skalenlig triangel: kateterna √3≈1,73 och 2 → 104 och 120 px */
    var A = [padL + 60, 300], B = [padL + 180, 300], C = [padL + 60, 196];

    T.line(A, B); T.pause(140);
    T.line(B, C); T.pause(140);
    T.line(C, A); T.pause(160);
    V.ratVinkel(T, A, [1, 0], [0, -1], 14);
    T.pause(160);
    xx = T.str('√3', A[0] - 46, (A[1] + C[1]) / 2 + 0.2 * F, null, 0.62);
    T.pause(140);
    T.str('2', (A[0] + B[0]) / 2 - 6, A[1] + 0.95 * F, null, 0.62);
    T.pause(160);
    V.vinkelBage(T, B, -Math.PI, -(Math.PI - 0.714), 34);
    T.str('v', B[0] - 52, B[1] - 12, null, 0.62);
    T.stepEnd();

    tanke(340, [
      [['De två kortaste sidorna är']],
      [['kateterna, för hypotenusan är']],
      [['alltid längst. Minsta vinkeln']],
      [['står mot kortaste sidan, √3.']]
    ], 0);
    y = 440;
    xx = T.str('hypotenusan=', padL, y);
    T.rot('(√3)^2+2^2', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    xx = T.str('=', padL + 60, y);
    xx = T.rot('3+4', xx, y);
    xx = T.str('=', xx, y);
    T.rot('7', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Att kvadrera en rot tar bort']],
      [['roten: (√3)^2 är 3.']]
    ]);
    T.str('c', (B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2 - 14, BLUE, 0.62);
    T.pause(200);
    y += 2.6 * F;
    r = V.trigKvot(T, F, { fn: 'sin v=', x: padL, y: y,
      ring: [B[0] - 26, B[1] - 14, 30, 22],
      num: { txt: '√3', ord: 'motstående katet',
             svep: [[A[0] - 7, A[1] - 6], [C[0] - 7, C[1] + 6]] },
      den: { txt: '√7', ord: 'hypotenusan',
             svep: [[C[0] + 6, C[1] + 6], [B[0] - 6, B[1] - 6]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['Två rötter i ett bråk kan']],
      [['skrivas som EN rot ur bråket.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('sin v=', padL, y);
    xx = T.fracH('√3', '√7', xx, y);
    xx = T.str('=', xx, y);
    T.rot('', xx, y);
    T.fracH('3', '7', xx + 0.46 * F, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: sin v=', padL, y);
    xe = T.rot('', xe, y);
    xe = T.fracH('3', '7', xe + 0.46 * F, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 14: rita vektorn v ----
   * Sambandet löses ut för v, u och w läses av i rutnätet och v ritas. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var gx = padL + 40, gy = 300, d = 30;      /* rutnätets nedre vänstra hörn */
    function P(a, b) { return [gx + a * d, gy - b * d]; }
    function vek(ch, x, yb, col) {
      var x1 = T.str(ch, x, yb, col || null);
      vecPil(T, F, x + 1, x1 - 2, yb, col || null, 1.02);
      return x1;
    }

    /* ---- steg 1: rutnätet och de givna vektorerna ---- */
    for (i = 0; i <= 6; i++) {
      T.line(P(i, 0), P(i, 4));
      T.pause(40);
    }
    for (i = 0; i <= 4; i++) {
      T.line(P(0, i), P(6, i));
      T.pause(40);
    }
    T.pause(160);
    figurPil(T, P(0, 1), P(4, 3));
    T.str('u', P(2, 2)[0] - 8, P(2, 2)[1] - 10, null, 0.62);
    vecPil(T, F, P(2, 2)[0] - 8, P(2, 2)[0] + 6, P(2, 2)[1] - 10, null, 0.62);
    T.pause(200);
    figurPil(T, P(0, 0), P(4, 0));
    T.str('w', P(2, 0)[0] - 8, P(2, 0)[1] + 0.85 * F, null, 0.62);
    vecPil(T, F, P(2, 0)[0] - 8, P(2, 0)[0] + 8, P(2, 0)[1] + 0.85 * F,
           null, 0.62);
    T.stepEnd();

    tanke(gy + 40, [
      [['Först löser jag ut v ur']],
      [['sambandet, precis som i en']],
      [['vanlig ekvation.']]
    ], 0);
    y = 430;
    xx = T.str('2', padL, y);
    xx = vek('u', xx, y);
    xx = T.str('-2', xx, y);
    xx = vek('v', xx, y);
    xx = T.str('=', xx, y);
    vek('w', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    xx = T.str('2', padL + 30, y);
    xx = vek('v', xx, y);
    xx = T.str('=2', xx, y);
    xx = vek('u', xx, y);
    xx = T.str('-', xx, y);
    vek('w', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Dividerar båda led med 2.']]
    ]);
    y += 3.2 * F;
    xx = vek('v', padL + 30, y);
    xx = T.str('=', xx, y);
    xx = vek('u', xx, y);
    xx = T.str('-', xx, y);
    T.fracH('w', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu läser jag av vektorerna i']],
      [['rutnätet: hur många rutor åt']],
      [['höger och hur många uppåt.']]
    ], 1.05);
    y += 3.4 * F;
    xx = vek('u', padL, y);
    xx = T.str('=(4, 2)', xx, y);
    xx = T.str('   ', xx, y);
    xx = vek('w', xx, y);
    T.str('=(4, 0)', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    xx = vek('v', padL, y);
    xx = T.str('=(4, 2)-(2, 0)=(2, 2)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Så v är 2 rutor åt höger och']],
      [['2 rutor uppåt. Den ritar jag']],
      [['i rutnätet.']]
    ]);
    figurPil(T, P(0, 0), P(2, 2), BLUE);
    T.str('v', P(1, 1)[0] + 10, P(1, 1)[1] - 4, BLUE, 0.62);
    vecPil(T, F, P(1, 1)[0] + 10, P(1, 1)[0] + 24, P(1, 1)[1] - 4, BLUE, 0.62);
    T.pause(220);
    y += 2.6 * F;
    T.str('Kontroll: 2(4, 2)-2(2, 2)=(4, 0)', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: ', padL, y);
    xe = vek('v', xe, y);
    xe = T.str('=(2, 2)', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 15: lös ((√3)^x)^4=3^6 ----
   * Potens av potens, roten skriven som en potens med exponenten 1/2,
   * och till slut samma bas i båda led. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('((√3)^x)^4=3^6', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Potens av potens: exponenterna']],
      [['multipliceras med varandra.']],
      [['x gånger 4 blir 4x.']]
    ]);
    y += 2.6 * F;
    T.str('(√3)^4^x=3^6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Leden har olika bas, √3 och 3.']],
      [['Men roten ur 3 ÄR 3 upphöjt']],
      [['till en halv.']]
    ]);
    y += 2.8 * F;
    xx = T.str('(3', padL + 30, y);
    xx = expFrac(T, F, '1', '2', xx, y);
    T.str(')^4^x=3^6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Potens av potens igen: en halv']],
      [['gånger 4x är 2x. Nu har båda']],
      [['leden basen 3.']]
    ]);
    y += 2.8 * F;
    T.str('3^2^x=3^6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Samma bas i båda led, alltså']],
      [['måste exponenterna vara lika.']]
    ]);
    y += 2.5 * F;
    T.str('2x=6 ⟹ x=3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: (√3)^3 upphöjt till 4']],
      [['är (√3)^12, och det är 3^6.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: x=3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });


  /* ================= DELPROV C ================= */

  /* ---- Uppgift 16: tärningsspelet Azaloo ----
   * Hela uppgiften vilar på EN bild: en tabell med poängen för alla 36
   * utfall. Den ritas först, och sedan besvaras I–V genom att räkna
   * rutor i tabellen. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i, j;
    var tanke = mkTanke(T);
    var tx = padL + 70, ty = 150, c = 46;      /* tabellens hörn, rutstorlek */
    function cellX(j) { return tx + j * c; }   /* j = 0 för radrubriken */
    function cellY(i) { return ty + i * c; }
    function poang(a, b) { return a === b ? -2 * a : Math.min(a, b); }
    function mitt(t, a, b, col) {
      var w = T.adv(t, 0.55);
      T.str(t, cellX(b) + (c - w) / 2, cellY(a) + c / 2 + 0.2 * F,
            col || null, 0.55);
    }
    function ringCell(a, b) {
      acts.push({ kind: 'stroke', color: BLUE,
        pts: V.ringPts(cellX(b) + c / 2, cellY(a) + c / 2, c * 0.44, c * 0.40) });
    }

    /* ---- steg 1: rutnätet med tärningarnas siffror ---- */
    for (i = 0; i <= 7; i++) {
      T.line([tx, cellY(i)], [tx + 7 * c, cellY(i)]);
      T.pause(40);
    }
    for (j = 0; j <= 7; j++) {
      T.line([cellX(j), ty], [cellX(j), ty + 7 * c]);
      T.pause(40);
    }
    T.pause(160);
    for (i = 1; i <= 6; i++) { mitt(String(i), i, 0); mitt(String(i), 0, i); }
    T.stepEnd();

    tanke(ty + 7 * c + 30, [
      [['I varje ruta skriver jag']],
      [['poängen för det utfallet: minsta']],
      [['antalet prickar, eller minus']],
      [['summan när tärningarna är lika.']]
    ], 0);
    for (i = 1; i <= 6; i++) {
      for (j = 1; j <= 6; j++) {
        mitt(String(poang(i, j)).replace('-', '−'), i, j,
             i === j ? BLUE : null);
        T.pause(30);
      }
    }
    T.stepEnd();

    /* ---- I ---- */
    tanke(ty + 7 * c + 30, [
      [['Tabellen har 6 rader och 6']],
      [['kolumner: 36 lika sannolika']],
      [['utfall. Bara en enda ruta']],
      [['visar −8.']]
    ], 0);
    ringCell(4, 4);
    T.pause(220);
    y = 620;
    xx = T.str('I. P(-8)=', padL, y);
    T.fracH('1', '36', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar I: ', padL, y);
    xe = T.fracH('1', '36', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- II ---- */
    tanke(y, [
      [['Minuspoäng ger bara de utfall']],
      [['där tärningarna visar lika —']],
      [['tabellens diagonal.']]
    ], 1.4);
    for (i = 1; i <= 6; i++) { ringCell(i, i); T.pause(120); }
    T.pause(200);
    y += 4.2 * F;
    xx = T.str('II. P(minus)=', padL, y);
    xx = T.fracOp('6', '36', '/6', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '6', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar II: ', padL, y);
    xe = T.fracH('1', '6', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- III ---- */
    tanke(y, [
      [['Precis +1 poäng får man när']],
      [['den minsta tärningen visar 1.']],
      [['Det är hela första raden och']],
      [['hela första kolumnen, utom (1,1).']]
    ], 1.4);
    y += 4.4 * F;
    T.str('III. 5 rutor i raden + 5 i', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('kolumnen = 10 rutor', padL + 40, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('P(+1)=', padL, y);
    xx = T.fracOp('10', '36', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('5', '18', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar III: ', padL, y);
    xe = T.fracH('5', '18', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- IV ---- */
    tanke(y, [
      [['+10 på två omgångar. Högsta']],
      [['möjliga i en omgång är +5, så']],
      [['det måste bli +5 båda gångerna.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('IV. P(+5)=', padL, y);
    T.fracH('2', '36', xx, y);
    T.stepEnd();

    tanke(y, [
      [['+5 ges av rutorna (5,6) och']],
      [['(6,5) — två av 36. Omgångarna']],
      [['är oberoende, så sannolikheterna']],
      [['multipliceras.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('P(+10)=', padL, y);
    xx = T.fracH('2', '36', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('2', '36', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('4', '1 296', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    T.fracH('1', '324', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar IV: ', padL, y);
    xe = T.fracH('1', '324', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- V ---- */
    tanke(y, [
      [['I längden blir varje ruta lika']],
      [['vanlig. Då räcker det att']],
      [['summera alla 36 rutor och dela']],
      [['med 36.']]
    ], 1.4);
    y += 4.4 * F;
    T.str('V. Plusrutor:', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('10·1+8·2+6·3+4·4+2·5=70', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('Minusrutor:', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2+4+6+8+10+12=42', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Summan av alla rutor blir']],
      [['70-42=28 poäng, fördelat på']],
      [['36 utfall.']]
    ]);
    y += 2.8 * F;
    xx = T.str('Genomsnitt=', padL, y);
    xx = T.fracH('70-42', '36', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracOp('28', '36', '/4', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('7', '9', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('≈0,78 poäng per omgång', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Genomsnittet är positivt, så']],
      [['den som spelar länge samlar']],
      [['poäng i stället för att tappa.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar V: totalpoängen ökar,', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('ungefär 0,78 poäng per omgång', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= DELPROV D ================= */

  /* ---- Uppgift 17: trädets höjd ----
   * Tangens ger höjden OVANFÖR ögat; ögonhöjden måste läggas till. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r, i;
    var tanke = mkTanke(T);
    /* ögat i O, trädets fot i B, toppen i C. 30 m = 300 px */
    var O = [padL + 40, 300], B = [padL + 340, 300];
    var C = [B[0], B[1] - 300 * Math.tan(20 * Math.PI / 180)];

    /* ---- steg 1: figuren ---- */
    T.line([padL + 20, 340], [padL + 380, 340]);      /* marken */
    T.pause(140);
    T.line([B[0], 340], [C[0], C[1]]);                /* trädstammen */
    T.pause(140);
    T.line(O, [O[0], 340]);                           /* Petra */
    T.pause(140);
    T.line(O, B); T.pause(120);
    T.line(O, C); T.pause(160);
    V.ratVinkel(T, B, [-1, 0], [0, -1], 13);
    T.pause(140);
    V.vinkelBage(T, O, -0.349, 0, 60);
    T.str('20°', O[0] + 68, O[1] - 12, null, 0.62);
    T.pause(180);
    T.str('30 m', (O[0] + B[0]) / 2 - 24, O[1] + 0.95 * F, BLUE, 0.62);
    T.pause(140);
    T.str('h', B[0] + 12, (O[1] + C[1]) / 2, BLUE, 0.62);
    T.pause(140);
    T.str('1,6 m', O[0] - 4, 328, BLUE, 0.62);
    T.stepEnd();

    tanke(370, [
      [['Instrumentet sitter vid ögat,']],
      [['1,6 m över marken. Triangeln ger']],
      [['alltså bara höjden OVANFÖR']],
      [['ögat — kalla den h.']]
    ], 0);
    y = 470;
    r = V.trigKvot(T, F, { fn: 'tan 20°=', x: padL, y: y,
      ring: [O[0] + 34, O[1] - 12, 34, 24],
      num: { txt: 'h', ord: 'motstående katet',
             svep: [[B[0] + 7, B[1] - 8], [C[0] + 7, C[1] + 8]] },
      den: { txt: '30', ord: 'närliggande katet',
             svep: [[O[0] + 8, O[1] + 7], [B[0] - 8, B[1] + 7]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['h står i täljaren, så jag']],
      [['multiplicerar båda led med 30.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('h=30·tan 20°=10,919...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu lägger jag till ögonhöjden,']],
      [['annars fattas de nedersta']],
      [['1,6 metrarna av stammen.']]
    ]);
    y += 2.6 * F;
    T.str('höjd=10,919...+1,6=12,519...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['30 m och 1,6 m har två']],
      [['värdesiffror, så svaret får']],
      [['också två.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: ungefär 13 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 18: koktemperaturen på höjden ----
   * a) insättning i formeln, b) samma formel men nu är t känd och h
   * söks — alltså en ekvation. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwB = padL + 30 + T.adv('85=100-') + T.fracW('h', '300') + 0.9 * F;

    y = 238;
    var e0 = padL; xx = T.str('t=100-', padL, y);
    xx = T.fracH('h', '300', xx, y);
    var e1 = xx, yE = y;
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['I a) är höjden känd: 5 892 m.']],
      [['Den sätts in där h står.']]
    ], 1.05);
    y += 3.4 * F;
    var v0 = padL, v1 = T.str('a) h=5 892 m', padL, y), yV = y;
    T.stepEnd();

    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.6 * F;
    xx = T.str('t=100-', padL, y);
    xx = T.fracH('5 892', '300', xx, y);
    T.str('=100-19,64', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    y += 3.2 * F;
    T.str('=80,36≈80,4 °C', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Vatten kokar vid 100 °C']],
      [['vid havsytan, och lägre högre']],
      [['upp. Nästan 6 km ger 20 grader']],
      [['lägre.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ungefär 80,4 °C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) är det tvärtom: temperaturen']],
      [['är känd och höjden söks. Då blir']],
      [['formeln en ekvation.']]
    ]);
    y += 3.2 * F;
    xx = T.str('b) 85=100-', padL, y);
    T.fracH('h', '300', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Hundra adderas i högerledet, så']],
      [['jag subtraherar 100 från båda']],
      [['led.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('-100', xwB, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.2 * F;
    } else {
      y += 3.4 * F;
      xx = T.str('85', padL + 30, y);
      xx = T.str('-100', xx, y, BLUE);
      xx = T.str('=100-', xx, y);
      xx = T.fracH('h', '300', xx, y);
      T.str('-100', xx, y, BLUE);
      T.stepEnd();
      y += 3.4 * F;
    }
    xx = T.str('-15=-', padL + 30, y);
    T.fracH('h', '300', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Båda leden är negativa. Jag']],
      [['multiplicerar med -300: det']],
      [['tar bort både nämnaren och']],
      [['minustecknen.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·(-300)', xwB, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.2 * F;
    } else {
      y += 3.4 * F;
      xx = T.str('-15', padL + 30, y);
      xx = T.str('·(-300)', xx, y, BLUE);
      xx = T.str('=-', xx, y);
      xx = T.fracH('h', '300', xx, y);
      T.str('·(-300)', xx, y, BLUE);
      T.stepEnd();
      y += 3.4 * F;
    }
    T.str('4 500=h', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 4 500 delat med 300']],
      [['är 15, och 100-15=85. Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: 4 500 m över havet', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 19: elevantalet i gymnasieskolan ----
   * Allt bygger på avläsningar ur diagrammet, så svaren blir intervall.
   * Kurvan ritas av på fri hand i samma fönster som provets figur. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    /* x = år efter 1996, y = elever i tusental */
    var A = mkAxes(T, F, { ox: padL + 60, oy: 300, u: 26, xsc: 4, ysc: 50,
                           xmin: 0, xmax: 30, ymin: 0, ymax: 400,
                           xlab: 'r', ylab: 'e' });
    function ar(v) { return A.X(v - 1996); }

    A.axes();
    A.ticks(V.heltal(0, 28, 4), V.heltal(0, 400, 50),
            [4, 8, 12, 16, 20, 24, 28], [100, 200, 300, 400]);
    T.pause(200);
    /* kurvan 1996–2015 (uppmätt) och prognosen 2016–2024 */
    var matt = [[1996, 305], [1999, 300], [2001, 310], [2003, 320],
                [2005, 350], [2007, 380], [2009, 390], [2011, 375],
                [2013, 325], [2015, 300]];
    acts.push({ kind: 'stroke', pts: matt.map(function (p) {
      return [ar(p[0]), A.Y(p[1])]; }) });
    T.pause(220);
    var prog = [[2015, 300], [2017, 305], [2019, 325], [2021, 345],
                [2023, 365], [2024, 372]];
    acts.push({ kind: 'stroke', color: BLUE, pts: prog.map(function (p) {
      return [ar(p[0]), A.Y(p[1])]; }) });
    T.pause(160);
    T.str('år', A.X(30) - 10, A.Y(0) + 1.6 * F, null, 0.55);
    T.str('tusen elever', A.X(0) + 8, A.Y(400) - 6, null, 0.55);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(430, [
      [['Först läser jag av hur många']],
      [['elever det var 2013, och drar']],
      [['en vågrät linje därifrån till']],
      [['prognosen.']]
    ], 0);
    A.dot(2013 - 1996, 325, BLUE);
    T.pause(160);
    A.rule([ar(2013), A.Y(325)], [ar(2024), A.Y(325)], BLUE);
    T.pause(200);
    y = 520;
    T.str('a) 2013: ungefär 325 000 elever', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Prognoslinjen når samma höjd']],
      [['någonstans kring 2019–2022.']],
      [['Avläsningen är ungefärlig, så']],
      [['svaret blir ett intervall.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar a: något år 2019-2022', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) läser jag av två år och']],
      [['jämför. Ökningen delas med']],
      [['värdet vi utgår FRÅN.']]
    ]);
    y += 2.8 * F;
    T.str('b) 2003: 320 000 elever', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2007: 380 000 elever', padL + 40, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('ökning=', padL, y);
    T.fracH('380 000-320 000', '320 000', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('60 000', '320 000', xx, y);
    T.str('=0,1875', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('≈0,19=19 %', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Avläsningarna är ungefärliga,']],
      [['så allt mellan 15 och 20 % är']],
      [['ett rimligt svar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar b: ungefär 19 %', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['I c) ska prognosens ökningstakt']],
      [['fortsätta. Jag räknar ut hur']],
      [['många elever den ökar per år.']]
    ]);
    y += 2.8 * F;
    T.str('c) 2019: 325 000 elever', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('2023: 365 000 elever', padL + 40, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('takt=', padL, y);
    xx = T.fracH('365 000-325 000', '4 år', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('=10 000 elever/år', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Från 365 000 år 2023 fattas']],
      [['35 000 elever upp till 400 000.']]
    ]);
    y += 3.0 * F;
    xx = T.str('tid=', padL, y);
    T.fracH('400 000-365 000', '10 000', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('=3,5 år', padL + 30, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('2023+3,5 ≈2027', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Också här bygger allt på']],
      [['avläsningar, så svaret ges']],
      [['som ett intervall.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar c: något år 2027-2030', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });


  /* ---- Uppgift 20: två golv ----
   * a) rakt pris, b) formeln för golv A, c) ekvationen där golven kostar
   * lika mycket — rabatten gäller bara över 50 m², vilket måste
   * kontrolleras till slut. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwC = padL + 30 + T.adv('345x=395x-4 000') + 0.9 * F;

    y = 238;
    T.str('Golv A: 345 kr/m^2', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('Golv B: 395 kr/m^2', padL, y);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['20 m^2 är mindre än 50, så']],
      [['rabatten på golv B gäller inte.']],
      [['Båda golven kostar priset per']],
      [['kvadratmeter gånger ytan.']]
    ]);
    y += 2.9 * F;
    T.str('a) A: 345·20=6 900 kr', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('B: 395·20=7 900 kr', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: 6 900 kr och 7 900 kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Kostnaden är priset per']],
      [['kvadratmeter gånger antalet']],
      [['kvadratmeter, oavsett hur många']],
      [['de är.']]
    ]);
    y += 2.9 * F;
    T.str('b) K=345x', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('K=kronor, x=antal m^2', padL + 30, y, null, 0.7);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: K=345x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['I c) handlar det om stora ytor,']],
      [['så rabatten på 4 000 kr dras']],
      [['från golv B:s pris.']]
    ]);
    y += 2.8 * F;
    T.str('c) A: 345x   B: 395x-4 000', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Lika mycket betyder att']],
      [['uttrycken är lika stora.']]
    ]);
    y += 2.5 * F;
    T.str('345x=395x-4 000', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag samlar x-termerna i']],
      [['högerledet: subtrahera 345x']],
      [['från båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-345x', xwC, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      /* raden ryms inte i ett svep — den bryts före högerledet, men är
       * ETT klicksteg (stegantalet måste vara lika i båda lägena) */
      y += 2.4 * F;
      xx = T.str('345x', padL + 30, y);
      T.str('-345x', xx, y, BLUE);
      y += 2.2 * F;
      xx = T.str('=395x-4 000', padL + 60, y);
      T.str('-345x', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('0=50x-4 000', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sedan adderar jag 4 000 till']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+4 000', xwC, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('0', padL + 30, y);
      xx = T.str('+4 000', xx, y, BLUE);
      xx = T.str('=50x-4 000', xx, y);
      T.str('+4 000', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('4 000=50x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist dividerar jag båda led']],
      [['med 50.']]
    ]);
    if (vagg) {
      T.vaggOp('/50', xwC, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('4 000', '50', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('50x', '50', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('80=x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Viktigt: 80 m^2 är MER än 50,']],
      [['så rabatten gäller verkligen.']],
      [['Kontroll: 345·80=27 600 och']],
      [['395·80-4 000=27 600.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar c: vid 80 m^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 21: vilken elevlösning är ett bevis? ----
   * Figuren ritas först, och Saras resonemang skrivs ut — det är det som
   * gäller för ALLA trianglar. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    var A = [padL + 30, 300], B = [padL + 140, 190], C = [padL + 260, 300];
    var D = [padL + 360, 300];

    /* ---- steg 1: figuren ---- */
    T.line(A, B); T.pause(130);
    T.line(B, C); T.pause(130);
    T.line(C, A); T.pause(130);
    T.line(C, D); T.pause(160);
    V.vinkelBage(T, A, -0.785, 0, 30);
    T.str('a', A[0] + 44, A[1] - 14, null, 0.62);
    T.pause(160);
    V.vinkelBage(T, B, 0.735, 2.31, 26);
    T.str('b', B[0] - 4, B[1] + 52, null, 0.62);
    T.pause(160);
    V.vinkelBage(T, C, Math.PI, Math.PI + 0.735, 24);
    T.str('x', C[0] - 44, C[1] - 12, null, 0.62);
    T.pause(160);
    V.vinkelBage(T, C, -0.735, 0, 30);
    T.str('c', C[0] + 34, C[1] - 26, null, 0.62);
    T.stepEnd();

    tanke(340, [
      [['Ett bevis måste gälla för ALLA']],
      [['trianglar. Talexempel visar bara']],
      [['att satsen stämmer i just de']],
      [['fallen.']]
    ], 0);
    y = 430;
    T.str('Carina: många exempel i en', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('tabell. Inget bevis.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('Erik: ett enda talexempel.', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('Inget bevis.', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Sara använder i stället två']],
      [['samband som gäller i varje']],
      [['triangel, med bokstäver i']],
      [['stället för tal.']]
    ]);
    y += 2.8 * F;
    T.str('Sara: a+b+x=180°', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('vinkelsumman', padL + 60, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    T.str('x+c=180°', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('rak vinkel', padL + 60, y, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Båda summorna är 180°, alltså']],
      [['är vänsterleden lika stora.']]
    ]);
    y += 2.6 * F;
    T.str('a+b+x=x+c', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x finns i båda leden och kan']],
      [['subtraheras bort. Kvar står']],
      [['själva satsen.']]
    ]);
    y += 2.5 * F;
    T.str('a+b=c', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: bara Saras lösning är', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('ett bevis', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 22: Ahmeds vinst jämfört med Stinas ----
   * Båda vinsterna uttrycks med Oskars x; kvoten mellan dem är svaret,
   * och x förkortas bort. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('Oskar: x kr', padL, y);
    T.stepEnd();

    tanke(y, [
      [['40 % mer betyder 100+40=140 %']],
      [['av Oskars vinst, alltså faktorn']],
      [['1,4.']]
    ]);
    y += 2.5 * F;
    T.str('Ahmed: 1,4x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['20 % mindre betyder 100-20=80 %,']],
      [['alltså faktorn 0,8.']]
    ]);
    y += 2.5 * F;
    T.str('Stina: 0,8x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jämförelsen görs MED STINA som']],
      [['utgångspunkt, så hennes vinst']],
      [['står i nämnaren.']]
    ]);
    y += 3.2 * F;
    xx = T.str('Andelen: ', padL, y);
    xx = T.fracH('1,4x', '0,8x', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('1,4', '0,8', xx, y);
    T.str('=1,75', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x fanns i både täljare och']],
      [['nämnare och förkortades bort —']],
      [['svaret beror inte på hur mycket']],
      [['Oskar vann.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('1,75-1=0,75=75 %', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 75 % större', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 23: procent eller procentenheter? ----
   * Ökningen i procentenheter jämförs med partiets TIDIGARE stöd — då
   * blir de två ökningarna lika stora. */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 182;
    T.str('S: 33,4 %   ökning 1,7 enheter', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('M: 23,6 %   ökning 1,2 enheter', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I procentenheter ökade S mer.']],
      [['Men Kalle måste ha jämfört med']],
      [['vad partierna hade FÖRUT.']]
    ]);
    y += 2.6 * F;
    T.str('Förut: S 33,4-1,7=31,7 %', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('M 23,6-1,2=22,4 %', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Den procentuella ökningen är']],
      [['ökningen delad med det man']],
      [['utgick från.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('S: ', padL, y);
    xx = T.fracH('1,7', '31,7', xx, y);
    T.str('=0,0536...≈5,4 %', xx, y);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('M: ', padL, y);
    xx = T.fracH('1,2', '22,4', xx, y);
    T.str('=0,0535...≈5,4 %', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nästan exakt samma tal! Sett så']],
      [['ökade partierna lika mycket.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('Båda ökade med ungefär 5 %', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('av sitt tidigare stöd.', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: Kalle jämförde den', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('procentuella ökningen', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: biljetterna till konserten ----
   * Formeln ger en ekvation i x (vuxenbiljetter); barnbiljetterna är
   * det som återstår av de 650. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('52 500=50x+32 500') + 0.9 * F;

    y = 238;
    var e0 = padL; xx = T.str('I=100x+', padL, y);
    var f0 = xx; xx = T.str('50', xx, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('650', xx, y); var t1b = xx;
    var t2 = xx; xx = T.str('-x', xx, y); var t2b = xx;
    xx = T.str(')', xx, y);
    var e1 = xx, yE = y, yK = y;
    T.stepEnd();

    tanke(y, [
      [['Intäkten är känd: 52 500 kr.']],
      [['Den sätts in där I står, och']],
      [['då blir formeln en ekvation.']]
    ]);
    y += 2.6 * F;
    var v0 = padL, v1 = T.str('I=52 500 kr', padL, y), yV = y;
    T.stepEnd();

    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 2.4 * F;
    T.str('52 500=100x+50(650-x)', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Femtio multipliceras med varje']],
      [['term i parentesen.']]
    ]);
    y += 3.0 * F;
    xx = T.str('52 500=100x', padL + 30, y);
    multIn(xx, y, yK - 0.95 * F, [
      { fran: [f0, f1], till: [t1, t1b], skriv: '+32 500', hojd: 26 },
      { fran: [f0, f1], till: [t2, t2b], skriv: '-50x', hojd: 46, dx: 4 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['100x-50x=50x. Nu står bara en']],
      [['x-term kvar.']]
    ]);
    y += 2.5 * F;
    T.str('52 500=50x+32 500', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['32 500 adderas, så jag']],
      [['subtraherar det från båda led.']]
    ]);
    /* Väggen ryms inte på den här raden (talen är breda och operationen
     * lång), så steget behåller ledformen i BÅDA lägena — se
     * EKVATIONSREDOVISNING i handskrift.js. Raden bryts före högerledet
     * men är ETT klicksteg. */
    y += 2.4 * F;
    xx = T.str('52 500', padL + 30, y);
    T.str('-32 500', xx, y, BLUE);
    y += 2.2 * F;
    xx = T.str('=50x+32 500', padL + 60, y);
    T.str('-32 500', xx, y, BLUE);
    T.stepEnd();
    y += 2.2 * F;
    T.str('20 000=50x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Dividerar båda led med 50.']]
    ]);
    if (vagg) {
      T.vaggOp('/50', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('20 000', '50', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('50x', '50', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('400=x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x var antalet VUXENbiljetter.']],
      [['Frågan gällde barnbiljetterna,']],
      [['alltså resten av de 650.']]
    ]);
    y += 2.6 * F;
    T.str('barnbiljetter=650-400=250', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 250 barnbiljetter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 25: cirkeln och triangeln ----
   * Basen är cirkelns omkrets och höjden är radien — då blir triangelns
   * area exakt cirkelns area, oavsett hur stor cirkeln är. */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var cx = padL + 110, cy = 230, rr = 70;
    var P = [cx, cy + rr], Q = [cx + 300, cy + rr], R = [cx, cy];

    acts.push({ kind: 'stroke', pts: V.ringPts(cx, cy, rr, rr) });
    T.pause(220);
    T.line(P, Q); T.pause(140);
    T.line(Q, R); T.pause(140);
    T.line(R, P); T.pause(160);
    V.ratVinkel(T, P, [1, 0], [0, -1], 13);
    T.pause(160);
    T.str('r', cx + 26, cy - 8, BLUE, 0.62);
    T.line([cx, cy], [cx + rr, cy]);
    T.pause(180);
    T.str('basen', (P[0] + Q[0]) / 2 - 26, P[1] + 0.95 * F, null, 0.62);
    T.stepEnd();

    tanke(cy + rr + 40, [
      [['Höjden i triangeln är lika lång']],
      [['som radien, och basen är lika']],
      [['lång som cirkelns omkrets — det']],
      [['står i uppgiften.']]
    ], 0);
    y = 420;
    T.str('höjden=r', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('basen=omkretsen=2πr', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in det i formeln']],
      [['för triangelns area.']]
    ]);
    y += 3.2 * F;
    xx = T.str('A=', padL, y);
    xx = T.fracH('basen·höjden', '2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('2πr·r', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Tvåan i täljaren och tvåan i']],
      [['nämnaren tar ut varandra, och']],
      [['r·r är r^2.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('=πr^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Och cirkelns area är ju också']],
      [['πr^2. Areorna är lika stora.']]
    ]);
    y += 2.6 * F;
    T.str('Cirkeln: A=πr^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Uträkningen använde bara r,']],
      [['aldrig något bestämt tal. Alltså']],
      [['gäller den för alla cirklar.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: ja, påståendet stämmer', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('alltid', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 26: skulpturen ----
   * a) geometrisk talföljd med faktorn 0,8, b) pröva vilken pinne som
   * först blir kortare än 15 cm — höjden räknas på MELLANRUMMEN. */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);

    /* ---- steg 1: skissen ---- */
    var mx = padL + 200, ybot = 320, dh = 26, w = 100;
    for (i = 0; i < 7; i++) {
      var b = w * Math.pow(0.8, i);
      T.line([mx - b, ybot - i * dh], [mx + b, ybot - i * dh]);
      T.pause(70);
    }
    T.line([mx - w, ybot], [mx - w * Math.pow(0.8, 6), ybot - 6 * dh]);
    T.pause(120);
    T.line([mx + w, ybot], [mx + w * Math.pow(0.8, 6), ybot - 6 * dh]);
    T.pause(180);
    T.str('2,0 m', mx - 26, ybot + 0.95 * F, BLUE, 0.62);
    T.pause(140);
    T.str('25 cm', mx + w + 16, ybot - 12, BLUE, 0.62);
    T.stepEnd();

    tanke(ybot + 50, [
      [['Varje pinne är 20 % kortare än']],
      [['den förra, alltså 80 % av den.']],
      [['Faktorn är 0,8.']]
    ], 0);
    y = 420;
    T.str('a) pinne n=2,0·0,8^n^-^1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Pinne 1 är 2,0 m, alltså']],
      [['multipliceras 2,0 med 0,8 en']],
      [['gång FÄRRE än pinnens nummer.']],
      [['Pinne 6 ger exponenten 5.']]
    ]);
    y += 2.8 * F;
    T.str('pinne 6=2,0·0,8^5=2,0·0,32768', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=0,655...m=65,5 cm', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar a: ungefär 65,5 cm', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) provar jag mig fram: vilken']],
      [['pinne är den sista som är minst']],
      [['15 cm lång?']]
    ]);
    y += 2.9 * F;
    T.str('b) pinne 12=2,0·0,8^1^1=0,1717...m', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=17,2 cm   OK', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('pinne 13=2,0·0,8^1^2=0,1374...m', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=13,7 cm   för kort', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Alltså 12 pinnar. Men höjden']],
      [['räknas på MELLANRUMMEN, och de']],
      [['är ett färre än pinnarna: 11.']]
    ]);
    y += 2.8 * F;
    T.str('höjd=11·25=275 cm=2,75 m', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? En skulptur på knappt']],
      [['tre meter, ungefär takhöjd.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar b: 275 cm=2,75 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 27: fördubblingstiden ----
   * a) tumregeln som formel, b) tumregeln använd baklänges, c) den
   * exakta räkningen med förändringsfaktorn. */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwB = padL + 30 + T.adv('14=') + T.fracW('70', 'p') + 0.9 * F;

    tanke(60, [
      [['Tumregeln säger: fördubblings-']],
      [['tiden är 70 delat med den']],
      [['procentuella ökningen.']]
    ], 0);
    y = 200;
    xx = T.str('a) T=', padL, y);
    T.fracH('70', 'p', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar a: T=', padL, y);
    xe = T.fracH('70', 'p', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) är fördubblingstiden känd']],
      [['och ökningen söks. Jag sätter']],
      [['in T=14 i tumregeln.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('b) 14=', padL, y);
    T.fracH('70', 'p', xx, y);
    T.stepEnd();

    tanke(y, [
      [['p står i nämnaren, så jag']],
      [['multiplicerar båda led med p.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·p', xwB, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.3 * F;
      xx = T.str('14', padL + 30, y);
      xx = T.str('·p', xx, y, BLUE);
      xx = T.str('=', xx, y);
      xx = T.fracH('70', 'p', xx, y);
      T.str('·p', xx, y, BLUE);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('14p=70', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Och dividerar med 14.']]
    ]);
    if (vagg) {
      T.vaggOp('/14', xwB, y);
      T.stepEnd();
      y += 2.2 * F;
    } else {
      y += 2.4 * F;
      xx = T.fracH('14p', '14', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('70', '14', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('p=5', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar b: ungefär 5 % per år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['I c) räknar jag exakt i stället']],
      [['för med tumregeln: att fördubbla']],
      [['betyder att faktorn a upphöjd']],
      [['till 14 blir 2.']]
    ]);
    y += 2.9 * F;
    T.str('c) a^1^4=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Motsatsen till att upphöja till']],
      [['14 är att dra fjortonderoten.']]
    ]);
    y += 2.6 * F;
    xx = T.str('a=', padL, y);
    xx = T.rot('2', xx, y, 14);
    T.str('=1,05076...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Faktorn 1,0508 betyder en ökning']],
      [['med drygt 5 hundradelar, alltså']],
      [['drygt 5 procent.']]
    ]);
    y += 2.6 * F;
    T.str('1,05076...-1=0,05076...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Uppgiften ber om två decimaler']],
      [['i procentform.']]
    ]);
    y += 2.5 * F;
    T.str('≈5,08 %', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar c: 5,08 % per år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

})();

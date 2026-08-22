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

})();

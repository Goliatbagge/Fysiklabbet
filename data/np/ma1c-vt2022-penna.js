/* ma1c-vt2022-penna.js — pennlösningar till Nationellt prov Ma 1c, VT 2022.
 *
 * Varje uppgift i provet får en animerad handskriven lösning: samma motor
 * och samma regler som pennlösningarna i teorin (handskrift.js), men
 * scenerna bor här i stället för i motorfilen — de hör ihop med sitt prov,
 * inte med ett teoriavsnitt.
 *
 * Registrering: scenen läggs i registret under namnet
 * "ma1c-vt2022-u<nr>" (reg(nr, fn) nedan). np.html slår upp namnet
 * automatiskt utifrån provets id och uppgiftsnumret och visar växeln
 * "Med penna"/"Som text" så snart scenen finns. Ingen post behöver läggas
 * i data/np/ma1c-vt2022.js.
 *
 * ⚠️ ALLA REGLER I HANDSKRIFT.JS FILHUVUD GÄLLER även här. De som oftast
 * bränner i provuppgifterna:
 *   - Papperet är PAPER_W = 730 brett. Inget bläck får hamna vid
 *     x > 696 (stega-pilens band) eller x < 24.
 *   - Arkets övre högra hörn hör till inställningsrutan: ingenting med
 *     x > 420 får ligga ovanför y = 150 (y = 210 i ekvval-scener). En
 *     bred förstarad läggs alltså längre ned.
 *   - En tanke per led, DIREKT före ledet. Avskrift av uppgiften och
 *     självklara led går utan bubbla.
 *   - Division ritas ALLTID med vågrätt streck; snedstreck bara i enheter.
 *   - Multipliceras en faktor in i en parentes ritas en blå båge till
 *     VARJE term, och produkttermen skrivs direkt efter sin båge.
 *   - Förkortning/förlängning skrivs i två drag med T.fracOp().
 *   - Ekvationsscener stödjer BÅDA redovisningslägena (cfg.vagg) med
 *     SAMMA antal klicksteg och sätter ekvval: 1 i returobjektet.
 *
 * Granskning: node .claude/verify-handskrift.js ma1c-vt2022-u1 …
 * (utan argument granskas alla NP-scener och alla teoriscener).
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkAxes = V.mkAxes, substRings = V.substRings, fadeRings = V.fadeRings,
      vecPil = V.vecPil, figurPil = V.figurPil, humanize = V.humanize,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma1c-vt2022-u' + nr, fn); }

  /* ---------------- lokala hjälpare ---------------- */

  /* BRÅKEXPONENT — a^(2/3). Exponenten är ett litet bråk med VÅGRÄTT
   * streck (division skrivs aldrig med snedstreck, se REGEL), skrivet i
   * upphöjt läge. Returnerar nästa x. */
  function expFrac(T, F, numS, denS, x0, yb, sc) {
    sc = sc == null ? 0.42 : sc;
    var nw = T.adv(numS, sc), dw = T.adv(denS, sc);
    var w = Math.max(nw, dw) + 0.10 * F;
    var ybar = yb - 0.62 * F;
    T.str(numS, x0 + (w - nw) / 2, ybar - 0.10 * F, null, sc);
    T.pause(90);
    T.acts.push({ kind: 'stroke',
                  pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(90);
    T.str(denS, x0 + (w - dw) / 2, ybar + 0.48 * F, null, sc);
    return x0 + w + 1.5;
  }
  function expFracW(T, F, numS, denS, sc) {
    sc = sc == null ? 0.42 : sc;
    return Math.max(T.adv(numS, sc), T.adv(denS, sc)) + 0.10 * F + 1.5;
  }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 1: faktorisera 5x+25 ----
   * Termerna delas upp i faktorer så att den gemensamma femman syns, och
   * kontrollen multiplicerar in den igen — med en blå båge till varje
   * term, som regeln kräver. */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);

    y = 92;
    T.str('5x+25', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Att faktorisera är att skriva']],
      [['uttrycket som en produkt. Jag']],
      [['delar upp båda termerna i']],
      [['faktorer och letar gemensam.']]
    ]);
    y += 2.3 * F;
    T.str('5x=5·x     25=5·5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Femman finns i BÅDA termerna.']],
      [['x finns bara i den första, så']],
      [['5 är den största gemensamma']],
      [['faktorn. Den bryts ut.']]
    ]);
    /* extra luft ovanför källraden: bågarna till parentesens termer ritas
     * i gapet och får inte nå upp i raden ovanför */
    y += 3.0 * F;
    xx = T.str('5x+25=', padL, y);
    var f0 = xx; xx = T.str('5', xx, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('x', xx, y); var t1b = xx;
    xx = T.str('+', xx, y);
    var t2 = xx; xx = T.str('5', xx, y); var t2b = xx;
    T.str(')', xx, y);
    var yKalla = y;
    T.stepEnd();

    tanke(y, [
      [['Kontroll: multiplicerar jag in']],
      [['femman igen ska jag få tillbaka']],
      [['uttrycket jag började med.']]
    ]);
    y += 2.6 * F;
    xx = T.str('=', padL + 30, y);
    multIn(xx, y, yKalla - 0.95 * F, [
      { fran: [f0, f1], till: [t1, t1b], skriv: '5·x', hojd: 26 },
      { fran: [f0, f1], till: [t2, t2b], skriv: '+5·5', hojd: 42, dx: 4 }
    ]);
    T.stepEnd();

    y += 2.1 * F;
    T.str('=5x+25', padL + 30, y);
    T.stepEnd();

    y += 2.0 * F;
    xe = T.str('Svar: 5(x+5)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 3: två gula vantar utan återläggning ----
   * Poängen är att nämnaren minskar i det andra draget: vanten läggs
   * inte tillbaka, så det finns 4 vantar kvar. */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* bred rad → under y=150 (inställningsrutans hörn) */
    y = 172;
    T.str('2 gula och 3 blå = 5 vantar', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Första draget: 2 av de 5']],
      [['vantarna är gula.']]
    ]);
    y += 2.4 * F;
    xx = T.str('P_1=', padL, y);
    T.fracH('2', '5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu ligger en gul vante i']],
      [['handen. Kvar i påsen: 4']],
      [['vantar, varav 1 gul. Även']],
      [['nämnaren minskar!']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('P_2=', padL, y);
    T.fracH('1', '4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Båda sakerna ska hända, den']],
      [['ena efter den andra. Då']],
      [['multipliceras sannolikheterna.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('P=', padL, y);
    xx = T.fracH('2', '5', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('1', '4', xx, y);
    T.stepEnd();

    xx = T.str('=', xx, y);
    xx = T.fracH('2', '20', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '10', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Uppgiften frågar efter']],
      [['BERÄKNINGEN, så svaret är']],
      [['uttrycket — inte värdet 1/10.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('2', '5', xe, y);
    xe = T.mul(xe, y);
    xe = T.fracH('1', '4', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 4: förenkla 3a^7/(12a^5) ----
   * Sifferbråket förkortas (i två drag, som regeln kräver) och
   * potenserna förenklas med potenslagen a^m/a^n = a^(m−n). */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 96;
    T.fracH('3a^7', '12a^5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag delar upp bråket i två']],
      [['delar: siffrorna för sig och']],
      [['potenserna för sig.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('3', '12', xx, y);
    xx = T.mul(xx, y);
    T.fracH('a^7', 'a^5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['3 och 12 har båda faktorn 3,']],
      [['så sifferbråket förkortas']],
      [['med 3.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracOp('3', '12', '/3', xx, y);
    xx = T.mul(xx, y);
    T.fracH('a^7', 'a^5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samma bas i täljare och']],
      [['nämnare: potenslagen säger']],
      [['att exponenterna subtraheras.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('1', '4', xx, y);
    xx = T.mul(xx, y);
    xx = T.str('a^7^-^5', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('1', '4', xx, y);
    xx = T.mul(xx, y);
    T.str('a^2', xx, y);
    T.stepEnd();

    y += 3.1 * F;
    xx = T.str('=', padL + 30, y);
    T.fracH('a^2', '4', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('a^2', '4', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 580, lastBase: y + 1.9 * F, padL: padL };
  });

  /* ---- Uppgift 7: vektoraddition och vektorns längd ----
   * a) koordinatvis addition, b) Pythagoras sats på koordinaterna.
   * Vektorpilarna ritas över bokstäverna med vecPil(). */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, x0;
    var tanke = mkTanke(T);
    /* bokstav med vektorpil ovanför */
    function vek(ch, x, yb, col) {
      var x1 = T.str(ch, x, yb, col || null);
      vecPil(T, F, x + 1, x1 - 2, yb, col || null, 1.02);
      return x1;
    }

    /* ---- a) ---- */
    /* raden under blir bred → första raden läggs så att den ligger
     * under inställningsrutans hörn (y=150) */
    y = 122;
    xx = T.str('a) ', padL, y);
    xx = vek('w', xx, y);
    xx = T.str('=', xx, y);
    xx = vek('u', xx, y);
    xx = T.str('+', xx, y);
    vek('v', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Vektorer adderas koordinatvis:']],
      [['x-koordinaterna för sig och']],
      [['y-koordinaterna för sig.']]
    ]);
    y += 2.5 * F;
    xx = T.str('=(2+1, 3+2)', padL + 30, y);
    T.stepEnd();

    xx = T.str('=(3, 5)', xx, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: ', padL, y);
    xe = vek('w', xe, y);
    xe = T.str('=(3, 5)', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Längden är hypotenusan i en']],
      [['rätvinklig triangel med']],
      [['katetrarna 3 och 5 — alltså']],
      [['Pythagoras sats.']]
    ]);
    y += 3.6 * F;
    xx = T.str('b) |', padL, y);
    xx = vek('w', xx, y);
    xx = T.str('|=', xx, y);
    T.rot('3^2+5^2', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    x0 = T.str('=', padL + 30, y);
    x0 = T.rot('9+25', x0, y);
    x0 = T.str('=', x0, y);
    T.rot('34', x0, y);
    T.stepEnd();

    tanke(y, [
      [['34 är inget kvadrattal, så']],
      [['roten går inte jämnt ut. Då']],
      [['lämnas svaret exakt.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: |', padL, y);
    xe = vek('w', xe, y);
    xe = T.str('|=', xe, y);
    xe = T.rot('34', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.6 * F, padL: padL };
  });

  /* ---- Uppgift 11: hur många sidor har tärningen? ----
   * Antalet sidor kallas n, sannolikheten tecknas och ekvationen
   * 1/n^3 = 1/64 löses. */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 92;
    T.str('Antal sidor: n', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En av de n sidorna är röd,']],
      [['så sannolikheten för röd i']],
      [['ett kast är 1 av n.']]
    ]);
    y += 2.6 * F;
    xx = T.str('P(röd)=', padL, y);
    T.fracH('1', 'n', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Tre röda i rad: kasten är']],
      [['oberoende, så sannolikheterna']],
      [['multipliceras med varandra.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('P(3 röda)=', padL, y);
    xx = T.fracH('1', 'n', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('1', 'n', xx, y);
    xx = T.mul(xx, y);
    T.fracH('1', 'n', xx, y);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('1', 'n^3', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '64', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråken är lika och täljarna']],
      [['är lika, alltså måste också']],
      [['nämnarna vara lika.']]
    ], 1.05);
    y += 3.3 * F;
    T.str('n^3=64', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Vilket tal multiplicerat med']],
      [['sig självt tre gånger blir 64?']],
      [['4·4·4=64, alltså är n=4.']]
    ]);
    y += 2.3 * F;
    T.str('n=4', padL + 30, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: 4 sidor', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 12: skriv 2a+b uttryckt i a ----
   * b löses ut ur sambandet och sätts in i uttrycket. Insättningen får
   * sin inringningsgest, som regeln kräver. */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 112;
    var e0 = padL;
    var e1 = T.str('2a+b', padL, y);
    var yUttryck = y;
    T.stepEnd();

    tanke(y, [
      [['Uttrycket ska bara innehålla']],
      [['a. Jag löser därför ut b ur']],
      [['sambandet a+b=2.']]
    ]);
    y += 2.4 * F;
    xx = T.str('a+b=2 ⟺ ', padL, y);
    var b0 = xx;
    var b1 = T.str('b=2-a', xx, y);
    var yB = y;
    T.stepEnd();

    tanke(y, [
      [['Nu byter jag ut b mot 2-a i']],
      [['uttrycket. Parentes runt, så']],
      [['att hela uttrycket kommer med.']]
    ]);
    var ringar = substRings(acts, [[b0, b1, yB, F], [e0, e1, yUttryck, F]]);
    y += 2.4 * F;
    xx = T.str('2a+b=2a+(2-a)', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Framför parentesen står plus,']],
      [['så den kan tas bort rakt av —']],
      [['inga tecken byter håll.']]
    ]);
    y += 2.3 * F;
    T.str('=2a+2-a', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['2a-a=a. Termerna med a slås']],
      [['ihop, tvåan står kvar.']]
    ]);
    y += 2.3 * F;
    T.str('=a+2', padL + 30, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: a+2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 13: bestäm f(g(2)) ----
   * Inifrån och ut: g(2) räknas ut först och svaret sätts in i f. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* bred rad → under y=150 (inställningsrutans hörn) */
    y = 186;
    var f0 = padL;
    var f1 = T.str('f(x)=2x-4', padL, y);
    T.str('   g(x)=3x+1', f1, y);
    var yDef = y;
    T.stepEnd();

    tanke(y, [
      [['f(g(2)) läses inifrån och ut:']],
      [['först räknar jag ut g(2), och']],
      [['sedan sätter jag in det svaret']],
      [['i funktionen f.']]
    ]);
    y += 2.5 * F;
    xx = T.str('g(2)=3·2+1', padL, y);
    T.stepEnd();

    xx = T.str('=7', xx, y);
    var g0 = xx - T.adv('=7') + T.adv('=');
    var g1 = xx;
    var yG = y;
    T.stepEnd();

    tanke(y, [
      [['Sjuan är alltså det inre']],
      [['svaret. Nu sätter jag in 7']],
      [['där x står i f(x)=2x-4.']]
    ]);
    var ringar = substRings(acts, [[g0, g1, yG, F], [f0, f1, yDef, F]]);
    y += 2.5 * F;
    xx = T.str('f(g(2))=f(7)=2·7-4', padL, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=14-4=10', padL + 30, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: f(g(2))=10', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: a^(1/3) och a när a^(2/3)=9 ----
   * a^(2/3) är kvadraten på a^(1/3); därifrån fås a genom att kubera. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 100;
    xx = T.str('a', padL, y);
    xx = expFrac(T, F, '2', '3', xx, y);
    T.str('=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Exponenten 2/3 är dubbelt så']],
      [['stor som 1/3. Enligt potens-']],
      [['lagarna är a^(2/3) därför']],
      [['kvadraten på a^(1/3).']]
    ]);
    y += 2.8 * F;
    xx = T.str('(a', padL, y);
    xx = expFrac(T, F, '1', '3', xx, y);
    xx = T.str(')^2=a', xx, y);
    xx = expFrac(T, F, '2', '3', xx, y);
    T.str('=9', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Vilket positivt tal i kvadrat']],
      [['blir 9? Roten ur 9 är 3, och']],
      [['a är positivt enligt uppgiften.']]
    ]);
    y += 2.8 * F;
    xx = T.str('a', padL + 30, y);
    xx = expFrac(T, F, '1', '3', xx, y);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['a^(1/3) är tredjeroten ur a.']],
      [['Är tredjeroten 3 får jag a']],
      [['genom att kubera: 3·3·3.']]
    ]);
    y += 2.8 * F;
    xx = T.str('a=(a', padL, y);
    xx = expFrac(T, F, '1', '3', xx, y);
    xx = T.str(')^3=3^3=27', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: a', padL, y);
    xe = expFrac(T, F, '1', '3', xe, y);
    xe = T.str('=3 och a=27', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 580, lastBase: y + 1.4 * F, padL: padL };
  });
})();

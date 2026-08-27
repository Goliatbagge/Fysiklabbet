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
      expFrac = V.expFrac, bigParen = V.bigParen, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma1c-vt2022-u' + nr, fn); }

  /* ---------------- lokala hjälpare ---------------- */

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

  /* ---- Uppgift 2: vilket funktionsuttryck hör till grafen? ----
   * Linjen ritas av först (samma fönster som provets figur), sedan läses
   * m av vid y-axeln och k med ett trappsteg. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 128, oy: 222, u: 27,
                           xmin: -4, xmax: 5, ymin: -3, ymax: 6 });

    /* ---- steg 1: rita av koordinatsystemet och linjen ---- */
    A.axes();
    A.ticks(V.heltal(-4, 5), V.heltal(-3, 6), [-2, 2, 4], [-2, 2, 4, 6]);
    T.pause(200);
    A.graphKM(-2, 3, null, -1.5, 3);
    T.stepEnd();

    tanke(316, [
      [['m är y-värdet där linjen']],
      [['skär y-axeln, alltså där']],
      [['x=0. Det är lättast att']],
      [['läsa av först.']]
    ], 0);
    /* avläsningen är ett VÄRDE ur figuren → blåpennan */
    A.dot(0, 3, BLUE);
    A.tag(0, 3, '(0, 3)', 10, -12, BLUE);
    T.pause(240);
    y = 396;
    T.str('m=3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['k säger hur mycket y ändras']],
      [['när x ökar med 1. Jag går ett']],
      [['steg åt höger från (0, 3) och']],
      [['ser hur långt linjen faller.']]
    ]);
    A.stair(0, 3, 1, 1, '1', '−2', { dxOff: [7, 0], dyOff: [6, 0] });
    T.pause(200);
    y += 2.9 * F;
    xx = T.str('k=', padL, y);
    xx = T.fracH('−2', '1', xx, y);
    T.str('=-2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in k och m i']],
      [['räta linjens ekvation.']]
    ], 1.05);
    y += 3.3 * F;
    var e0 = padL, e1 = T.str('y=kx+m', padL, y);
    var yE = y;
    T.stepEnd();

    var ringar = substRings(acts, [[padL, padL + T.adv('m=3'), 396, F],
                                   [padL, padL + T.adv('k=-2'), yE - 3.3 * F, F],
                                   [e0, e1, yE, F]]);
    y += 2.3 * F;
    T.str('y=-2x+3', padL + 30, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: y=-2x+3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: vilket diagram visar starkast korrelation? ----
   * Pennan ritar två egna minidiagram — spridda punkter mot punkter
   * nästan på en linje — så att "stark korrelation" blir något man SER,
   * och går sedan igenom provets sex diagram. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    /* två små koordinatsystem sida vid sida */
    function minidiagram(ox, oy, w, h, punkter, rubrik) {
      T.acts.push({ kind: 'stroke', pts: humanize([[ox, oy - h], [ox, oy]]) });
      T.acts.push({ kind: 'stroke', pts: humanize([[ox, oy], [ox + w, oy]]) });
      T.pause(160);
      punkter.forEach(function (p) {
        T.acts.push({ kind: 'stroke', color: BLUE,
                      pts: V.dotPts(ox + p[0] * w, oy - p[1] * h) });
      });
      T.pause(160);
      var tw = T.adv(rubrik, 0.55);
      T.str(rubrik, ox + w / 2 - tw / 2, oy + 0.95 * F, null, 0.55);
    }

    /* spridda punkter: ingen tydlig riktning */
    minidiagram(padL + 20, 190, 150, 120,
      [[0.10, 0.62], [0.22, 0.24], [0.34, 0.80], [0.46, 0.40],
       [0.58, 0.68], [0.70, 0.28], [0.82, 0.55], [0.92, 0.18]],
      'svag korrelation');
    T.pause(300);
    /* punkter nästan på en fallande linje */
    minidiagram(padL + 280, 190, 150, 120,
      [[0.08, 0.92], [0.20, 0.80], [0.32, 0.72], [0.44, 0.58],
       [0.56, 0.50], [0.68, 0.36], [0.80, 0.26], [0.92, 0.12]],
      'stark korrelation');
    T.stepEnd();

    tanke(214, [
      [['Stark korrelation betyder att']],
      [['punkterna ligger tätt samlade']],
      [['kring en rät linje. Riktningen']],
      [['spelar ingen roll.']]
    ], 0);
    y = 300;
    T.str('B och E: punkterna sprider sig,', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('ingen korrelation.', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('A och F: tydlig riktning men', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('spretiga punkter, måttlig.', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kvar är C och D. Båda följer']],
      [['en rät linje, så jag jämför']],
      [['hur tätt punkterna ligger.']]
    ]);
    y += 2.6 * F;
    T.str('C: stark, punkterna spretar lite.', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('D: nästan exakt på en linje.', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: D', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: avläsning ur en graf ----
   * a) f(2) läses av rakt upp från x=2, b) f(x)=14 löses genom att dra
   * linjen y=14 och se var den skär kurvan. Kurvan ritas i samma fönster
   * som provets figur (x från −16 till 17, y från −5 till 16). */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    /* fönstret är brett (33 enheter i x-led) — u=20 med två enheter per
     * ruta håller hela figuren innanför arkets vänstra två tredjedelar,
     * så att inget hamnar i inställningsrutans hörn */
    var A = mkAxes(T, F, { ox: padL + 176, oy: 250, u: 20, xsc: 2, ysc: 2,
                           xmin: -16, xmax: 17, ymin: -5, ymax: 16 });

    /* ---- steg 1: rita av grafen ---- */
    A.axes();
    A.ticks(V.heltal(-16, 16, 2), V.heltal(-4, 16, 2),
            [-12, -8, -4, 4, 8, 12, 16], [4, 8, 12, 16]);
    T.pause(220);
    /* kurvan: strecket ritas som en mjuk kurva genom punkterna
     * (pathFrom är en Catmull-Rom-spline, så ett fåtal punkter räcker) */
    var kurva = [[-15.8, -5.0], [-13, 1.5], [-11, 5.0], [-9, 9.0],
                 [-7, 12.0], [-5, 11.6], [-3, 10.6], [0, 9.2], [2, 8.0],
                 [5, 6.5], [7, 5.6], [9, 5.0], [11, 6.0], [12, 6.8],
                 [14, 10.0], [16, 14.0], [17.2, 17.0]];
    acts.push({ kind: 'stroke',
                pts: kurva.map(function (p) { return [A.X(p[0]), A.Y(p[1])]; }) });
    T.stepEnd();

    /* ---- a) f(2) ---- */
    /* bubblan läggs UNDER hela figuren (y-axeln når ned till 310) */
    tanke(322, [
      [['f(2) är kurvans höjd vid']],
      [['x=2. Jag går upp från 2 på']],
      [['x-axeln till kurvan och sedan']],
      [['vågrätt in till y-axeln.']]
    ], 0);
    A.guides(2, 8);
    T.pause(180);
    A.dot(2, 8, BLUE);
    T.pause(200);
    y = 440;
    T.str('a) f(2)=8', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: f(2)=8', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) f(x)=14 ---- */
    tanke(y, [
      [['f(x)=14 betyder: var ligger']],
      [['kurvan på höjden 14? Jag drar']],
      [['en vågrät linje vid y=14 och']],
      [['ser var den skär kurvan.']]
    ]);
    A.rule([A.X(-16), A.Y(14)], [A.X(17), A.Y(14)], BLUE);
    T.pause(220);
    y += 3.4 * F;
    T.str('b) y=14 skär kurvan på ett ställe.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kullen till vänster når bara']],
      [['upp till 12, så där finns']],
      [['ingen skärning. Den enda']],
      [['ligger långt till höger.']]
    ]);
    A.dot(16, 14, BLUE);
    T.pause(160);
    A.guides(16, 14);
    T.pause(200);
    y += 2.5 * F;
    T.str('x=16', padL + 30, y);
    T.stepEnd();

    y += 2.2 * F;
    xe = T.str('Svar: x=16', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 8: linjär, exponentiell eller potensmodell? ----
   * Först skrivs kännetecknen upp, sedan prövas de fyra situationerna
   * mot dem en i taget. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 96;
    T.str('Linjär: y=kx+m', padL, y);
    T.stepEnd();

    y += 2.0 * F;
    T.str('lika mycket per steg', padL + 40, y, null, 0.7);
    T.pause(200);
    y += 2.0 * F;
    T.str('Exponentiell: y=C·a^x', padL, y);
    T.stepEnd();

    y += 2.0 * F;
    T.str('lika många procent per steg', padL + 40, y, null, 0.7);
    T.pause(200);
    y += 2.0 * F;
    T.str('Potens: y=C·x^n', padL, y);
    T.stepEnd();

    y += 2.0 * F;
    T.str('variabeln står i en potens', padL + 40, y, null, 0.7);
    T.stepEnd();

    tanke(y, [
      [['1. Varje kilo sand väger lika']],
      [['mycket, så vikten ökar lika']],
      [['mycket per kilo.']]
    ]);
    y += 2.5 * F;
    T.str('1. Linjär modell', padL, y);
    T.stepEnd();

    tanke(y, [
      [['2. Bromssträckan beror på']],
      [['hastigheten i kvadrat, alltså']],
      [['y=C·x^2. Variabeln i en potens.']]
    ]);
    y += 2.5 * F;
    T.str('2. Potensmodell', padL, y);
    T.stepEnd();

    tanke(y, [
      [['3. Degen växer med 5 % var']],
      [['tionde minut, alltså lika']],
      [['många PROCENT per steg.']]
    ]);
    y += 2.5 * F;
    T.str('3. Exponentiell modell', padL, y);
    T.stepEnd();

    tanke(y, [
      [['4. Det rinner ut 2 cl varje']],
      [['minut, lika mycket per steg.']],
      [['Vattnet minskar, så k<0.']]
    ]);
    y += 2.5 * F;
    T.str('4. Linjär modell', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 1 linjär, 2 potens,', padL, y);
    T.stepEnd();
    y += 2.0 * F;
    xe = T.str('3 exponentiell, 4 linjär', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
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
      [['delar: talen för sig och']],
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

  /* ---- Uppgift 9: vilket uttryck har samma värde som sin 20°? ----
   * Samma triangel, två olika vinklar: sidan a är motstående till 20°
   * och närliggande till 70°, medan hypotenusan är densamma. Kvoterna
   * blir därför lika. Triangeln ritas i provfigurens orientering. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, r;
    var tanke = mkTanke(T);
    /* rät vinkel i A (nere till vänster), 20° i B (nere till höger) */
    var A = [padL + 30, 300], B = [padL + 330, 300], C = [padL + 30, 191];

    /* ---- steg 1: rita av triangeln ---- */
    T.line(A, B); T.pause(140);
    T.line(B, C); T.pause(140);
    T.line(C, A); T.pause(180);
    V.ratVinkel(T, A, [1, 0], [0, -1], 15);
    T.pause(160);
    /* vinkelns inre ligger OVANFÖR basen, och y växer nedåt i scenen —
     * bågen går därför från -π (mot A) till -(π-0,349) (mot C) */
    V.vinkelBage(T, B, -Math.PI, -(Math.PI - 0.349), 46);
    /* 20° är en spetsig vinkel: kilen är bara 0,35·r hög, så talet läggs
     * långt ut på bisektrisen där kilen hunnit bli bred nog (~40 px vid
     * r=118) — annars hamnar det ovanpå basen eller hypotenusan */
    T.str('20°', B[0] - 118 - T.adv('20°', 0.62) / 2, B[1] - 9, null, 0.62);
    T.stepEnd();

    tanke(330, [
      [['Vinkelsumman i en triangel är']],
      [['180°. Den räta vinkeln tar 90°,']],
      [['och 20° är given.']]
    ], 0);
    y = 396;
    T.str('180°-90°-20°=70°', padL, y);
    T.pause(220);
    var mid2 = V.vinkelBage(T, C, 0.349, Math.PI / 2, 40);
    T.str('70°', C[0] + Math.cos(mid2) * 58 - T.adv('70°', 0.62) / 2,
          C[1] + Math.sin(mid2) * 58 + 0.2 * F, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Jag döper sidorna: a är sidan']],
      [['mellan den räta vinkeln och']],
      [['70°-vinkeln, c är hypotenusan.']]
    ]);
    T.str('a', A[0] - 24, (A[1] + C[1]) / 2 + 0.2 * F, null, 0.62);
    T.pause(200);
    T.str('c', (B[0] + C[0]) / 2 + 6, (B[1] + C[1]) / 2 - 12, null, 0.62);
    T.stepEnd();

    tanke(y, [
      [['Sett från 20°-vinkeln är a']],
      [['motstående katet, och c är']],
      [['hypotenusan.']]
    ]);
    y += 3.4 * F;
    r = V.trigKvot(T, F, { fn: 'sin 20°=', x: padL, y: y,
      ring: [B[0] - 34, B[1] - 16, 32, 24],
      num: { txt: 'a', ord: 'motstående katet',
             svep: [[A[0] - 7, A[1] - 6], [C[0] - 7, C[1] + 6]] },
      den: { txt: 'c', ord: 'hypotenusan',
             svep: [[C[0] + 6, C[1] + 6], [B[0] - 6, B[1] - 6]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['Sett från 70°-vinkeln är samma']],
      [['sida a i stället NÄRLIGGANDE.']],
      [['Hypotenusan är förstås densamma.']]
    ], 1.05);
    y += 4.2 * F;
    r = V.trigKvot(T, F, { fn: 'cos 70°=', x: padL, y: y,
      ring: [C[0] + 30, C[1] + 22, 30, 24],
      num: { txt: 'a', ord: 'närliggande katet',
             svep: [[A[0] - 7, A[1] - 6], [C[0] - 7, C[1] + 6]] },
      den: { txt: 'c', ord: 'hypotenusan',
             svep: [[C[0] + 6, C[1] + 6], [B[0] - 6, B[1] - 6]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['Båda uttrycken är samma kvot,']],
      [['a delat med c. Alltså är de']],
      [['lika stora.']]
    ], 1.05);
    y += 4.0 * F;
    T.str('sin 20°=cos 70°', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: cos 70°', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 10: fyll i den tomma parentesen ----
   * Vänsterledet utvecklas (blå bågar till varje term) och divideras
   * sedan med tvåan framför den tomma parentesen. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);

    y = 96;
    var f0 = padL; xx = T.str('3', padL, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('4x', xx, y); var t1b = xx;
    var t2 = xx; xx = T.str('-10', xx, y); var t2b = xx;
    T.str(')=2(      )', xx, y);
    var yKalla = y;
    T.stepEnd();

    tanke(y, [
      [['Jag börjar med att utveckla']],
      [['vänsterledet: trean multipli-']],
      [['ceras med VARJE term.']]
    ]);
    y += 3.0 * F;
    xx = T.str('3(4x-10)=', padL, y);
    multIn(xx, y, yKalla - 0.95 * F, [
      { fran: [f0, f1], till: [t1, t1b], skriv: '12x', hojd: 26 },
      { fran: [f0, f1], till: [t2, t2b], skriv: '-30', hojd: 42, dx: 4 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Nu vet jag att 2 gånger']],
      [['parentesen ska bli 12x-30.']],
      [['Då får jag parentesen genom']],
      [['att dividera med 2.']]
    ]);
    y += 3.1 * F;
    xx = T.str('Parentesen: ', padL, y);
    T.fracH('12x-30', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråkstrecket gäller hela']],
      [['täljaren, så BÅDA termerna']],
      [['delas med 2.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('12x', '2', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('30', '2', xx, y);
    xx = T.str('=6x-15', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    T.str('Kontroll', padL, y - 1.5 * F, null, 0.62);
    var g0 = padL; xx = T.str('2', padL, y); var g1 = xx;
    xx = T.str('(', xx, y);
    var s1 = xx; xx = T.str('6x', xx, y); var s1b = xx;
    var s2 = xx; xx = T.str('-15', xx, y); var s2b = xx;
    T.str(')', xx, y);
    var yK2 = y;
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('=', padL + 30, y);
    xx = multIn(xx, y, yK2 - 0.95 * F, [
      { fran: [g0, g1], till: [s1, s1b], skriv: '12x', hojd: 26 },
      { fran: [g0, g1], till: [s2, s2b], skriv: '-30', hojd: 42, dx: 4 }
    ]);
    T.str('  stämmer', xx, y, null, 0.62);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 6x-15', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
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
  /* ---- Uppgift 15: bestäm a så att 2x-a<5 har lösningen x<7 ----
   * Olikheten löses med a kvar som bokstav; lösningen jämförs sedan med
   * den önskade. Scenen stödjer båda redovisningslägena. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xw1 = Math.max(padL + T.adv('2x-a<5'),
                       padL + 30 + T.adv('2x<5+a')) + 0.9 * F;
    var xw2 = padL + 30 + T.fracW('5+a', '2') + T.adv('=7') + 0.9 * F;

    y = 118;
    T.str('2x-a<5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En olikhet löses som en']],
      [['ekvation. a subtraheras i']],
      [['vänsterledet, så jag adderar']],
      [['a till båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+a', xw1, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('2x-a', padL + 30, y);
      xx = T.str('+a', xx, y, BLUE);
      xx = T.str('<5', xx, y);
      T.str('+a', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('2x<5+a', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 2, så jag']],
      [['dividerar båda led med 2. Två']],
      [['är positivt, alltså står']],
      [['olikhetstecknet kvar.']]
    ]);
    if (vagg) {
      T.vaggOp('/2', xw1, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2x', '2', padL + 30, y);
      xx = T.str('<', xx, y);
      T.fracH('5+a', '2', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('x<', padL + 30, y);
    T.fracH('5+a', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Lösningen ska vara x<7. Samma']],
      [['olikhetstecken står redan där,']],
      [['så bråket måste vara just 7.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.fracH('5+a', '2', padL + 30, y);
    T.str('=7', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu är det en vanlig ekvation.']],
      [['Nämnaren 2 försvinner om jag']],
      [['multiplicerar båda led med 2.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·2', xw2, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('5+a', '2', padL + 30, y);
      xx = T.str('·2', xx, y, BLUE);
      xx = T.str('=7', xx, y);
      T.str('·2', xx, y, BLUE);
      T.stepEnd();
      y += 3.0 * F;
    }
    T.str('5+a=14', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist subtraherar jag 5 från']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-5', xw1, y);
      T.stepEnd();
    } else {
      y += 2.3 * F;
      xx = T.str('5+a', padL + 30, y);
      xx = T.str('-5', xx, y, BLUE);
      xx = T.str('=14', xx, y);
      T.str('-5', xx, y, BLUE);
      T.stepEnd();
    }
    y += 2.2 * F;
    T.str('a=9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 2x-9<5 ger 2x<14,']],
      [['alltså x<7. Precis den']],
      [['lösning uppgiften ville ha.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: a=9', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 16: skugga området där f(x) ≤ y ≤ g(x) ----
   * Linjen f(x)=-x+7 och parabeln g(x)=(x-2)^2-1 skär varandra i (4, 3);
   * till höger om skärningen ligger parabeln över linjen och området
   * finns. Skuggningen ritas med snedstreck, som för hand. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 37, oy: 420, u: 34,
                           xmin: -0.5, xmax: 5.6, ymin: -1.5, ymax: 9 });
    function f(x) { return -x + 7; }
    function g(x) { return (x - 2) * (x - 2) - 1; }

    /* ---- steg 1: rita av figuren ---- */
    A.axes();
    /* parabeln skär x-axeln exakt vid 1 och 3 — talen knuffas i sidled
     * så att de inte hamnar på kurvan */
    A.ticks(V.heltal(0, 5), V.heltal(-1, 9), V.heltal(1, 5),
            [2, 4, 6, 8], { x: { 1: -13, 3: 13 } });
    T.pause(200);
    A.rule([A.X(-0.5), A.Y(f(-0.5))], [A.X(5.6), A.Y(f(5.6))]);
    /* etiketten i den fria ytan mellan linjen och parabeln */
    T.str('f(x)', A.X(0.45), A.Y(4.4), null, 0.62);
    T.pause(220);
    var par = [];
    for (i = -0.5; i <= 5.15; i += 0.25) par.push([A.X(i), A.Y(g(i))]);
    acts.push({ kind: 'stroke', pts: par });
    T.str('g(x)', A.X(4.2) - T.adv('g(x)', 0.62), A.Y(8.6), null, 0.62);
    T.stepEnd();

    tanke(500, [
      [['Den dubbla olikheten säger att']],
      [['y ska ligga över f(x) och under']],
      [['g(x). Området ligger alltså']],
      [['MELLAN graferna.']]
    ], 0);
    y = 590;
    T.str('Linjen är golv, parabeln är tak.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Var ligger parabeln ÖVER']],
      [['linjen? De skär varandra i']],
      [['en punkt, som jag läser av.']]
    ]);
    A.dot(4, 3, BLUE);
    T.pause(160);
    /* etiketten läggs i den fria ytan under linjen, till vänster om
     * skärningen — uppe till höger ligger både parabeln och skuggningen */
    A.tag(4, 3, '(4, 3)', -78, 18, BLUE);
    T.pause(220);
    y += 2.5 * F;
    T.str('Skärning: (4, 3)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Till vänster om skärningen']],
      [['ligger parabeln UNDER linjen.']],
      [['Där finns inget område alls.']]
    ]);
    y += 2.5 * F;
    T.str('x<4: parabeln under linjen.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Till höger om skärningen']],
      [['ligger parabeln över linjen.']],
      [['Där skuggar jag ytan mellan']],
      [['graferna.']]
    ]);
    /* skuggning: lodräta streck från linjen upp till parabeln */
    for (i = 4.08; i <= 5.15; i += 0.16) {
      acts.push({ kind: 'stroke', color: BLUE,
                  pts: V.humanize([[A.X(i), A.Y(f(i))], [A.X(i), A.Y(g(i))]]) });
      T.pause(60);
    }
    T.pause(200);
    y += 2.8 * F;
    T.str('Området: mellan graferna, från', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('(4, 3) och åt höger.', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: se skuggningen i figuren', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });


  /* ================= DELPROV C ================= */

  /* ---- Uppgift 17: Kochkurvan ----
   * a)–b) omkretsen växer med faktorn 4/3 per figur, c) faktorn läses ur
   * kvoten, d) exponentiell formel, e) formeln skrivs om med potenslagar
   * och exponenterna jämförs. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);

    /* ---- a) vad händer med EN sida? ---- */
    var x0 = padL + 40, yl = 150, d = 56;
    T.line([x0, yl], [x0 + 3 * d, yl]);
    T.pause(160);
    for (i = 1; i < 3; i++) T.line([x0 + i * d, yl - 7], [x0 + i * d, yl + 7]);
    T.pause(160);
    for (i = 0; i < 3; i++) {
      T.str('1', x0 + (i + 0.5) * d - T.adv('1', 0.55) / 2, yl + 0.95 * F,
            null, 0.55);
    }
    T.str('3 sträckor', x0 + 3 * d + 20, yl + 0.2 * F, null, 0.62);
    T.stepEnd();

    tanke(yl + 40, [
      [['Mittdelen byts mot två sidor i']],
      [['en ny liksidig triangel. Tre']],
      [['sträckor blir alltså fyra,']],
      [['alla lika långa.']]
    ], 0);
    var y2 = 320;
    T.line([x0, y2], [x0 + d, y2]);
    T.pause(120);
    T.line([x0 + d, y2], [x0 + 1.5 * d, y2 - d * 0.866]);
    T.pause(120);
    T.line([x0 + 1.5 * d, y2 - d * 0.866], [x0 + 2 * d, y2]);
    T.pause(120);
    T.line([x0 + 2 * d, y2], [x0 + 3 * d, y2]);
    T.pause(160);
    T.str('4 sträckor', x0 + 3 * d + 20, y2 + 0.2 * F, null, 0.62);
    T.stepEnd();

    y = 400;
    xx = T.str('a) Sidan blir ', padL, y);
    xx = T.fracH('4', '3', xx, y);
    T.str(' av sin längd.', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Varje sida växer lika mycket,']],
      [['så hela omkretsen växer med']],
      [['samma faktor.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('O_1=9', padL, y);
    xx = T.mul(xx, y);
    xx = T.fracH('4', '3', xx, y);
    T.str('=12', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: O_1=12', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Samma sak en gång till: figur']],
      [['2 får omkretsen 12 gånger']],
      [['samma faktor.']]
    ]);
    y += 3.0 * F;
    xx = T.str('b) O_2=12', padL, y);
    xx = T.mul(xx, y);
    xx = T.fracH('4', '3', xx, y);
    T.str('=16', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: O_2=16', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['Förändringsfaktorn är den nya']],
      [['omkretsen delad med den gamla.']]
    ]);
    y += 3.2 * F;
    xx = T.str('c) ', padL, y);
    xx = T.fracH('O_2', 'O_1', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracOp('16', '12', '/4', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('4', '3', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('4', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- d) ---- */
    tanke(y, [
      [['Omkretsen multipliceras med']],
      [['4/3 en gång per figur. Efter n']],
      [['figurer har den multiplicerats']],
      [['n gånger, alltså (4/3) upphöjt n.']]
    ], 1.5);
    y += 3.8 * F;
    xx = T.str('d) O=9', padL, y);
    xx = T.mul(xx, y);
    T.parenFrac('4', '3', 'n', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: n=1 ger 9·4/3=12 och']],
      [['n=2 ger 9·16/9=16. Stämmer med']],
      [['a) och b).']]
    ], 1.4);
    y += 4.2 * F;
    xe = T.str('Svar: O=9', padL, y);
    xe = T.mul(xe, y);
    xe = T.parenFrac('4', '3', 'n', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- e) ---- */
    tanke(y, [
      [['Den sökta omkretsen är skriven']],
      [['med potenser av 2 och 3. Då']],
      [['skriver jag om min formel på']],
      [['samma sätt.']]
    ], 1.4);
    y += 4.6 * F;
    xx = T.str('e) O=9', padL, y);
    xx = T.mul(xx, y);
    T.fracH('4^n', '3^n', xx, y);
    T.stepEnd();

    tanke(y, [
      [['9=3^2 och 4=2^2, så 4 upphöjt']],
      [['till n blir 2 upphöjt till 2n.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('3^2·2^2^n', '3^n', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Treorna i täljare och nämnare']],
      [['förkortas: exponenterna']],
      [['subtraheras, 2-n blir kvar i']],
      [['nämnaren som n-2.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('2^2^n', '3^n^-^2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('2^1^6', '3^6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Samma bas i båda bråken, så']],
      [['exponenterna måste vara lika.']],
      [['Tvåorna ger 2n=16.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('2n=16 ⟹ n=8', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med treorna: n-2 ska']],
      [['vara 6, och 8-2=6. Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: figur nummer 8', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 18: linjen genom (2, 10) och (12, 30) ----
   * Lutningen ur förändringskvoten, m ur en av punkterna. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('10=4+m') + 0.9 * F;

    /* ekvval-scen: inget bläck med x>420 ovanför y=210 (den högre
     * inställningsrutan), och raderna här är breda */
    y = 238;
    T.str('(2, 10) och (12, 30)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Lutningen k är hur mycket y']],
      [['ändras delat med hur mycket x']],
      [['ändras mellan punkterna.']]
    ]);
    y += 3.2 * F;
    xx = T.str('k=', padL, y);
    xx = T.fracH('Δy', 'Δx', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('30-10', '12-2', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('20', '10', xx, y);
    T.str('=2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu vet jag k. m får jag genom']],
      [['att sätta in en av punkterna i']],
      [['räta linjens ekvation.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('y=kx+m', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('10=2·2+m', padL + 30, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('10=4+m', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Fyran adderas i högerledet,']],
      [['så jag subtraherar 4 från']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-4', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('10', padL + 30, y);
      xx = T.str('-4', xx, y, BLUE);
      xx = T.str('=4+m', xx, y);
      T.str('-4', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('6=m', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med den andra punkten:']],
      [['x=12 ska ge y=30.']]
    ]);
    y += 2.5 * F;
    T.str('y=2·12+6=30', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: y=2x+6', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 19: bestäm x så att 3(x+4)-(8+x) blir 3 ----
   * Uttrycket sätts lika med 3, vänsterledet utvecklas (blå bågar och
   * teckenbyten) och ekvationen löses. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + 30 + T.adv('3x+12-8-x=3'),
                       padL + 30 + T.adv('2x+4=3')) + 0.9 * F;

    y = 210;
    var f0 = padL; xx = T.str('3', padL, y); var f1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('x', xx, y); var t1b = xx;
    var t2 = xx; xx = T.str('+4', xx, y); var t2b = xx;
    T.str(')-(8+x)=3', xx, y);
    var yK = y;
    T.stepEnd();

    tanke(y, [
      [['Först utvecklar jag den första']],
      [['parentesen: trean multipliceras']],
      [['med varje term.']]
    ]);
    y += 3.0 * F;
    xx = T.str('=', padL + 30, y);
    xx = multIn(xx, y, yK - 0.95 * F, [
      { fran: [f0, f1], till: [t1, t1b], skriv: '3x', hojd: 26 },
      { fran: [f0, f1], till: [t2, t2b], skriv: '+12', hojd: 44, dx: 4 }
    ]);
    T.str('-(8+x)=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Framför den andra parentesen']],
      [['står ett minus. Då byter BÅDA']],
      [['termerna i den tecken.']]
    ]);
    y += 2.5 * F;
    xx = T.str('3x+12', padL + 30, y);
    xx = T.str('-8', xx, y, BLUE);
    xx = T.str('-x', xx, y, BLUE);
    T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu slår jag ihop lika termer:']],
      [['3x-x=2x och 12-8=4.']]
    ]);
    y += 2.4 * F;
    T.str('2x+4=3', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Fyran adderas, så jag']],
      [['subtraherar 4 i båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-4', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('2x+4', padL + 30, y);
      xx = T.str('-4', xx, y, BLUE);
      xx = T.str('=3', xx, y);
      T.str('-4', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('2x=-1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist dividerar jag båda led']],
      [['med 2.']]
    ]);
    if (vagg) {
      T.vaggOp('/2', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2x', '2', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('-1', '2', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('x=', padL + 30, y);
    T.fracH('-1', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 3·(-0,5+4) blir 10,5']],
      [['och (8-0,5) blir 7,5.']],
      [['10,5-7,5=3. Stämmer.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: x=', padL, y);
    xe = T.fracH('-1', '2', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 20: lös (2x-5)(x+3)=2x^2-9 ----
   * Dubbla parenteser: en blå båge per produkt. Andragradstermerna tar
   * ut varandra, så ekvationen är i själva verket av första graden. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + 30 + T.adv('2x^2+x-15=2x^2-9'),
                       padL + 30 + T.adv('x-15=-9')) + 0.9 * F;

    y = 238;
    xx = T.str('(', padL, y);
    var a1 = xx; xx = T.str('2x', xx, y); var a1b = xx;
    var a2 = xx; xx = T.str('-5', xx, y); var a2b = xx;
    xx = T.str(')(', xx, y);
    var b1 = xx; xx = T.str('x', xx, y); var b1b = xx;
    var b2 = xx; xx = T.str('+3', xx, y); var b2b = xx;
    T.str(')=2x^2-9', xx, y);
    var yK = y;
    T.stepEnd();

    tanke(y, [
      [['Varje term i den första']],
      [['parentesen multipliceras med']],
      [['varje term i den andra.']],
      [['Fyra produkter alltså.']]
    ]);
    y += 3.2 * F;
    xx = T.str('=', padL + 30, y);
    xx = multIn(xx, y, yK - 0.95 * F, [
      { fran: [a1, a1b], till: [b1, b1b], skriv: '2x^2', hojd: 26 },
      { fran: [a1, a1b], till: [b2, b2b], skriv: '+6x', hojd: 46, dx: 4 },
      { fran: [a2, a2b], till: [b1, b1b], skriv: '-5x', hojd: 26, dx: 4 },
      { fran: [a2, a2b], till: [b2, b2b], skriv: '-15', hojd: 46, dx: 6 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['6x-5x=x. Nu står hela']],
      [['ekvationen utvecklad.']]
    ]);
    y += 2.5 * F;
    T.str('2x^2+x-15=2x^2-9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['2x^2 finns i BÅDA led. Jag']],
      [['subtraherar bort det, och då']],
      [['försvinner andragradstermen']],
      [['helt.']]
    ]);
    if (vagg) {
      T.vaggOp('-2x^2', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('2x^2+x-15', padL + 30, y);
      xx = T.str('-2x^2', xx, y, BLUE);
      xx = T.str('=2x^2-9', xx, y);
      T.str('-2x^2', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('x-15=-9', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist adderar jag 15 till']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+15', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('x-15', padL + 30, y);
      xx = T.str('+15', xx, y, BLUE);
      xx = T.str('=-9', xx, y);
      T.str('+15', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('x=6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: VL blir 7·9=63 och']],
      [['HL blir 72-9=63. Stämmer.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: x=6', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 21: triangelodlingen ----
   * a) areaformeln löses ut för basen, b) villkoret b ≥ 1 ger den övre
   * gränsen för höjden — och höjden måste vara positiv. */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + 30 + T.fracW('b·h', '2') + T.adv('=20'),
                       padL + 30 + T.adv('b·h=40')) + 0.9 * F;
    var xwB = padL + 30 + T.fracW('40', 'h') + T.adv('≥1') + 0.9 * F;

    /* ---- figuren: triangel med bas b och höjd h ---- */
    var P = [padL + 30, 300], Q = [padL + 320, 300], R = [padL + 200, 180];
    T.line(P, Q); T.pause(140);
    T.line(Q, R); T.pause(140);
    T.line(R, P); T.pause(180);
    /* höjden: streckad lodrät hjälplinje */
    for (i = 0; i < 8; i++) {
      if (i % 2) continue;
      T.line([R[0], R[1] + (P[1] - R[1]) * (i / 8)],
             [R[0], R[1] + (P[1] - R[1]) * ((i + 1) / 8)]);
    }
    V.ratVinkel(T, [R[0], P[1]], [1, 0], [0, -1], 12);
    T.pause(160);
    /* beteckningar och värden i figuren skrivs med blåpennan */
    T.str('b', (P[0] + Q[0]) / 2, P[1] + 0.95 * F, BLUE, 0.62);
    T.pause(140);
    T.str('h', R[0] + 10, (R[1] + P[1]) / 2, BLUE, 0.62);
    T.pause(140);
    T.str('Area 20 m^2', P[0] + 30, P[1] - 22, BLUE, 0.62);
    T.stepEnd();

    tanke(330, [
      [['Triangelns area är basen gånger']],
      [['höjden delat med 2. Den ska']],
      [['vara 20 kvadratmeter.']]
    ], 0);
    y = 424;
    xx = T.str('a) A=', padL, y);
    xx = T.fracH('b·h', '2', xx, y);
    T.str('=20', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag vill ha b ensamt. Först']],
      [['bort med nämnaren: multiplicera']],
      [['båda led med 2.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·2', xwA, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('b·h', '2', padL + 30, y);
      xx = T.str('·2', xx, y, BLUE);
      xx = T.str('=20', xx, y);
      T.str('·2', xx, y, BLUE);
      T.stepEnd();
      y += 3.0 * F;
    }
    T.str('b·h=40', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Nu multipliceras b med h.']],
      [['Alltså dividerar jag båda led']],
      [['med h.']]
    ]);
    if (vagg) {
      T.vaggOp('/h', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('b·h', 'h', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('40', 'h', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('b=', padL + 30, y);
    T.fracH('40', 'h', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: b=', padL, y);
    xe = T.fracH('40', 'h', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Basen ska vara minst 1 meter,']],
      [['alltså b större än eller lika']],
      [['med 1.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('b) ', padL, y);
    xx = T.fracH('40', 'h', xx, y);
    T.str('≥1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Höjden är en längd och därmed']],
      [['positiv. Multiplicerar jag båda']],
      [['led med h står olikhetstecknet']],
      [['kvar åt samma håll.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·h', xwB, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('40', 'h', padL + 30, y);
      xx = T.str('·h', xx, y, BLUE);
      xx = T.str('≥1', xx, y);
      T.str('·h', xx, y, BLUE);
      T.stepEnd();
      y += 3.0 * F;
    }
    T.str('40≥h', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Höjden kan alltså vara högst']],
      [['40 m. Och den måste vara större']],
      [['än 0, annars finns ingen']],
      [['triangel.']]
    ]);
    y += 2.6 * F;
    T.str('0<h≤40', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 0<h≤40', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });


  /* ================= DELPROV D ================= */

  /* ---- Uppgift 22: bankkontot ----
   * a) räntesatsen läses ur förändringsfaktorn, b) f(5) beräknas. */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 170;
    T.str('f(x)=10 000·1,04^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Talet som upphöjs, 1,04, är']],
      [['förändringsfaktorn. Den säger']],
      [['hur mycket pengarna växer på']],
      [['ett år.']]
    ]);
    y += 2.6 * F;
    T.str('a) a=1,04=1+0,04', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ettan är kapitalet som redan']],
      [['fanns. Det som läggs till, 0,04,']],
      [['är räntan: 4 hundradelar.']]
    ]);
    y += 2.5 * F;
    T.str('0,04=4 %', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 4 % per år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['f(5) betyder 5 år efter']],
      [['insättningen. Jag sätter in']],
      [['x=5 i funktionen.']]
    ]);
    y += 2.8 * F;
    T.str('b) f(5)=10 000·1,04^5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['1,04 upphöjt till 5 är detsamma']],
      [['som att multiplicera med 1,04']],
      [['fem gånger, ett år i taget.']]
    ]);
    y += 2.5 * F;
    T.str('=10 000·1,2166529...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Pengar avrundas till hela ören,']],
      [['alltså två decimaler.']]
    ]);
    y += 2.5 * F;
    T.str('=12 166,529... ≈12 166,53', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 12 166,53 kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 23: borrhålet för bergvärme ----
   * a) cos ger hypotenusan (borrhålets längd), b) tan ger det vågräta
   * avståndet till tomtgränsen. Figuren ritas i provets orientering:
   * lodrätt djup, borrhålet lutar 10,0° från lodlinjen. */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r, i;
    var tanke = mkTanke(T);
    /* A överst (vid markytan), B rakt under (djupet 125 m), C är
     * borrhålets slut — 220 px svarar mot 125 m */
    var A = [padL + 250, 170], B = [padL + 250, 390];
    var C = [B[0] - 220 * Math.tan(10 * Math.PI / 180), 390];

    /* ---- steg 1: rita figuren ---- */
    /* markytan */
    T.line([padL + 60, 170], [padL + 330, 170]);
    T.pause(140);
    /* lodlinjen (djupet) */
    T.line(A, B); T.pause(140);
    /* borrhålet */
    T.line(A, C); T.pause(140);
    /* det vågräta avståndet */
    T.line(C, B); T.pause(160);
    V.ratVinkel(T, B, [-1, 0], [0, -1], 13);
    T.pause(160);
    V.vinkelBage(T, A, Math.PI / 2, Math.PI / 2 + 0.1745, 74);
    /* kilen är bara 10° bred — gradtalet får inte plats inuti den, så
     * det läggs tätt intill bågens yttre ände, utanför borrhålslinjen */
    T.str('10,0°', A[0] - 26 - T.adv('10,0°', 0.62), A[1] + 84, null, 0.62);
    T.pause(200);
    /* givna mått och sökta beteckningar skrivs med blåpennan */
    T.str('125 m', B[0] + 12, (A[1] + B[1]) / 2, BLUE, 0.62);
    T.pause(140);
    T.str('L', (A[0] + C[0]) / 2 - 26, (A[1] + C[1]) / 2, BLUE, 0.62);
    T.pause(140);
    T.str('d', (B[0] + C[0]) / 2 - 6, B[1] + 0.95 * F, BLUE, 0.62);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(430, [
      [['Borrhålet L är hypotenusan.']],
      [['Djupet 125 m ligger intill']],
      [['10-gradersvinkeln, alltså']],
      [['närliggande katet. Då: cosinus.']]
    ], 0);
    y = 530;
    r = V.trigKvot(T, F, { fn: 'a) cos 10,0°=', x: padL, y: y,
      ring: [A[0] - 30, A[1] + 44, 44, 30],
      num: { txt: '125', ord: 'närliggande katet',
             svep: [[A[0] + 7, A[1] + 8], [B[0] + 7, B[1] - 8]] },
      den: { txt: 'L', ord: 'hypotenusan',
             svep: [[A[0] - 6, A[1] + 8], [C[0] - 6, C[1] - 8]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['L står i nämnaren. Jag löser']],
      [['ut den: multiplicera med L och']],
      [['dividera med cosinus.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('L=', padL, y);
    xx = T.fracH('125', 'cos 10,0°', xx, y);
    xx = T.str('=126,93...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Både 125 och 10,0 har tre']],
      [['värdesiffror, så svaret får']],
      [['också tre.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: minst 127 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Avståndet d ligger mitt emot']],
      [['vinkeln, och 125 m ligger']],
      [['intill den. Motstående delat']],
      [['med närliggande: tangens.']]
    ]);
    y += 3.4 * F;
    r = V.trigKvot(T, F, { fn: 'b) tan 10,0°=', x: padL, y: y,
      ring: [A[0] - 30, A[1] + 44, 44, 30],
      num: { txt: 'd', ord: 'motstående katet',
             svep: [[C[0] + 8, C[1] + 7], [B[0] - 8, B[1] + 7]] },
      den: { txt: '125', ord: 'närliggande katet',
             svep: [[A[0] + 7, A[1] + 8], [B[0] + 7, B[1] - 8]] } });
    T.fade(r.ring);
    T.stepEnd();

    tanke(y, [
      [['d står i täljaren, så jag']],
      [['multiplicerar båda led med 125.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('d=125·tan 10,0°=22,03...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Hålet lutar bara lite,']],
      [['så avståndet ska vara mycket']],
      [['mindre än djupet. 22 m mot']],
      [['125 m stämmer bra.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: minst 22 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: kalkylbladet ----
   * a) månadsbetalningen för januari, b)–c) formler med cellreferenser
   * så att bladet fungerar för vilka värden som helst. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    /* rad 2 nedan är bred → första raden läggs så att den inte når in i
     * inställningsrutans hörn (x>420 ovanför y=150) */
    y = 118;
    T.str('Månadsbetalning =', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('räntekostnad + amortering', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Räntan i januari räknas på']],
      [['hela lånet: 3 % av 20 000 kr.']]
    ]);
    y += 2.5 * F;
    T.str('a) Ränta: 20 000·0,03=600', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('E2=600+1 000=1 600', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 1 600', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['B3 är lånet i februari: januari-']],
      [['lånet minus det som amorterats.']],
      [['Räntan betalas varje månad och']],
      [['läggs inte till skulden.']]
    ]);
    y += 2.9 * F;
    T.str('b) B3=B2-D2', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: =B2-D2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['Samma räkning som i a), men med']],
      [['cellernas namn i stället för']],
      [['tal: lånet gånger räntan,']],
      [['plus amorteringen.']]
    ]);
    y += 2.9 * F;
    T.str('c) E3=B3·C3+D3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I ett kalkylblad börjar en']],
      [['formel med likhetstecken, och']],
      [['gångertecknet skrivs som en']],
      [['asterisk.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: =B3*C3+D3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 25: triangelns vinklar ----
   * B och C uttrycks som andelar av A, vinkelsumman ger en ekvation. */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwA = padL + 30 + T.adv('2,88A=180°') + 0.9 * F;

    y = 238;
    T.str('B är 72 % mindre än A.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['72 % mindre betyder att 72 %']],
      [['har försvunnit. Kvar är']],
      [['100-72=28 % av A.']]
    ]);
    y += 2.5 * F;
    T.str('B=(1-0,72)A=0,28A', padL, y);
    T.stepEnd();

    tanke(y, [
      [['60 % större betyder att 60 %']],
      [['har lagts TILL: 100+60=160 %']],
      [['av A.']]
    ]);
    y += 2.5 * F;
    T.str('C=(1+0,60)A=1,6A', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Vinkelsumman i en triangel är']],
      [['180°. Nu kan alla tre vinklarna']],
      [['skrivas med bara A.']]
    ]);
    y += 2.6 * F;
    T.str('A+B+C=180°', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('A+0,28A+1,6A=180°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['1+0,28+1,6=2,88. Alla termer']],
      [['innehåller A, så de slås ihop.']]
    ]);
    y += 2.5 * F;
    T.str('2,88A=180°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['A multipliceras med 2,88, så']],
      [['jag dividerar båda led med']],
      [['2,88.']]
    ]);
    if (vagg) {
      T.vaggOp('/2,88', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('2,88A', '2,88', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('180°', '2,88', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('A=', padL + 30, y);
    xx = T.fracH('180°', '2,88', xx, y);
    T.str('=62,5°', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu när A är känd får jag B och']],
      [['C ur uttrycken jag skrev först.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('B=0,28·62,5°=17,5°', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('C=1,6·62,5°=100°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: 62,5+17,5+100=180.']],
      [['Summan stämmer, och C är trubbig']],
      [['medan B är den minsta vinkeln.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: A=62,5°, B=17,5°', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('och C=100°', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 26: två formler för hundens energibehov ----
   * Båda formlerna beräknas för 40 kg; kvoten mellan dem visar hur stor
   * andel formel 1 ger, och resten är minskningen. */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 170;
    T.str('x=40 kg', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag räknar ut energibehovet med']],
      [['båda formlerna, var för sig.']]
    ]);
    y += 2.5 * F;
    T.str('y_1=70·40^0^,^7^5=1 113,38...', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('y_2=30·40+70=1 270', padL, y);
    T.stepEnd();

    tanke(y, [
      [['För att jämföra dem bildar jag']],
      [['kvoten: hur stor ANDEL av']],
      [['formel 2 ger formel 1?']]
    ]);
    y += 3.2 * F;
    xx = T.str('Andelen: ', padL, y);
    xx = T.fracH('y_1', 'y_2', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('1 113,38...', '1 270', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('=0,8766...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['0,8766... betyder att formel 1']],
      [['ger knappt 88 % av formel 2.']],
      [['Skillnaden är det som fattas']],
      [['upp till hela 1.']]
    ]);
    y += 2.6 * F;
    T.str('1-0,8766...=0,1233...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Hunden väger 40 kg, två']],
      [['värdesiffror. Då avrundas']],
      [['svaret till två.']]
    ]);
    y += 2.5 * F;
    T.str('0,1233...≈0,12=12 %', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: ungefär 12 % lägre', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });


  /* ---- Uppgift 27: bilens värdeminskning ----
   * Sex års minskning med samma faktor ger a^6; sjätteroten ger den
   * årliga förändringsfaktorn. */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    /* Ingen väggredovisning här: raden 230 000·a^6=157 000 är så bred att
     * väggen med operationen /230 000 hamnar i stega-pilens kantband.
     * Enligt EKVATIONSREDOVISNING behåller ett sådant steg ledformen —
     * och då finns inget steg som skiljer lägena åt, så scenen sätter
     * inte ekvval. */

    y = 238;
    T.str('Köpt: 230 000 kr', padL, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('Sålt efter 6 år: 157 000 kr', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I genomsnitt minskar värdet']],
      [['lika många procent varje år.']],
      [['Då multipliceras det med samma']],
      [['faktor a sex gånger.']]
    ]);
    y += 2.6 * F;
    T.str('230 000·a^6=157 000', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag vill ha a ensamt. Först']],
      [['bort med 230 000: dividera']],
      [['båda led med det.']]
    ]);
    y += 3.2 * F;
    xx = T.fracH('230 000·a^6', '230 000', padL + 30, y);
    xx = T.str('=', xx, y);
    T.fracH('157 000', '230 000', xx, y);
    T.stepEnd();
    y += 3.2 * F;
    xx = T.str('a^6=', padL + 30, y);
    xx = T.fracH('157 000', '230 000', xx, y);
    T.str('=0,6826...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['a står upphöjt till 6. Motsatsen']],
      [['till att upphöja till 6 är att']],
      [['dra sjätteroten.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('a=', padL + 30, y);
    xx = T.rot('0,6826...', xx, y, 6);
    T.str('=0,9383...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['0,9383 betyder att knappt 94 %']],
      [['av värdet är kvar efter varje']],
      [['år. Minskningen är resten.']]
    ]);
    y += 2.6 * F;
    T.str('1-0,9383...=0,0616...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Bilen tappade knappt']],
      [['en tredjedel på sex år, alltså']],
      [['några procent per år.']]
    ]);
    y += 2.5 * F;
    T.str('0,0616...≈0,062=6,2 %', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: ungefär 6,2 % per år', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 29: chokladhjulet ----
   * a) två vinster i rad, b) minst en vinst på sju omgångar — via
   * komplementhändelsen, som är den enda framkomliga vägen. */
  reg(29, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 96;
    xx = T.str('P(vinst)=', padL, y);
    T.fracH('1', '20', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Hjulet minns inte förra']],
      [['snurren, så omgångarna är']],
      [['oberoende. Då multipliceras']],
      [['sannolikheterna.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('a) P=', padL, y);
    xx = T.fracH('1', '20', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('1', '20', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '400', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('=0,0025=0,25 %', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('1', '400', xe, y);
    xe = T.str('=0,25 %', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Minst en vinst kan betyda en,']],
      [['två, ... eller sju vinster.']],
      [['Mycket lättare att räkna ut']],
      [['motsatsen: ingen vinst alls.']]
    ], 1.4);
    y += 4.2 * F;
    xx = T.str('b) P(förlust)=', padL, y);
    xx = T.fracH('19', '20', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sju förluster i rad: faktorn']],
      [['19/20 sju gånger.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('P(ingen vinst)=', padL, y);
    xx = T.parenFrac('19', '20', '7', xx, y);
    T.str('=0,6983...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Antingen vinner han minst en']],
      [['gång eller ingen gång alls.']],
      [['Tillsammans blir det 1.']]
    ], 1.4);
    y += 4.2 * F;
    T.str('P(minst en)=1-0,6983...', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=0,3016...≈0,30', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Han vinner sällan, men']],
      [['sju försök ger ändå ungefär en']],
      [['chans på tre.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: ungefär 0,30=30 %', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 30: formeln för tidsskillnad ----
   * a) insättning i formeln, b) den lägre hastigheten kallas h och den
   * högre 2h, varefter ekvationen löses. */
  reg(30, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var xwB = padL + 30 + T.adv('12=') + T.fracW('600', 'h') + 0.9 * F;

    /* ---- a) ---- */
    y = 238;
    xx = T.str('t=', padL, y);
    xx = bigParen(T, F, xx, y, false);
    xx = T.fracH('1', 'h_1', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', 'h_2', xx, y);
    xx = bigParen(T, F, xx + 0.10 * F, y, true);
    T.str('·s·60', xx, y);
    var e0 = padL, e1 = xx, yE = y;
    T.stepEnd();

    y += 3.4 * F;
    var v0 = padL;
    var v1 = T.str('a) h_1=80, h_2=90, s=20', padL, y);
    var yV = y;
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in värdena där']],
      [['beteckningarna står i formeln.']]
    ]);
    var ringar = substRings(acts, [[v0, v1, yV, F], [e0, e1, yE, F]]);
    y += 3.2 * F;
    xx = T.str('t=', padL, y);
    xx = bigParen(T, F, xx, y, false);
    xx = T.fracH('1', '80', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '90', xx, y);
    xx = bigParen(T, F, xx + 0.10 * F, y, true);
    T.str('·20·60', xx, y);
    fadeRings(acts, ringar);
    T.stepEnd();

    tanke(y, [
      [['Först parentesen. Minsta']],
      [['gemensamma nämnare för 80 och']],
      [['90 är 720.']]
    ], 1.4);
    y += 4.0 * F;
    xx = T.str('Parentesen: ', padL, y);
    xx = T.fracH('9', '720', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('8', '720', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '720', xx, y);
    T.stepEnd();

    tanke(y, [
      [['20·60=1 200. Nu är det bara']],
      [['ett bråk gånger ett tal kvar.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('t=', padL, y);
    xx = T.fracH('1', '720', xx, y);
    xx = T.str('·1 200=', xx, y);
    xx = T.fracOp('1 200', '720', '/240', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('5', '3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('=1,666...≈1,7 min', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: ungefär 1,7 minuter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Den ena hastigheten är dubbelt']],
      [['så hög som den andra. Kallar jag']],
      [['den lägre h är den högre 2h.']]
    ]);
    y += 2.8 * F;
    T.str('b) h_1=h, h_2=2h, s=20, t=12', padL, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('12=', padL, y);
    xx = bigParen(T, F, xx, y, false);
    xx = T.fracH('1', 'h', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '2h', xx, y);
    xx = bigParen(T, F, xx + 0.10 * F, y, true);
    T.str('·1 200', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Parentesen igen: förläng det']],
      [['första bråket med 2, så får']],
      [['båda nämnaren 2h.']]
    ], 1.4);
    y += 4.0 * F;
    xx = T.str('Parentesen: ', padL, y);
    xx = T.fracOp('1', 'h', '·2', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '2h', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '2h', xx, y);
    T.stepEnd();

    tanke(y, [
      [['1 200 delat med 2 är 600, så']],
      [['högerledet blir 600 delat med h.']]
    ], 1.4);
    y += 4.0 * F;
    xx = T.str('12=', padL + 30, y);
    T.fracH('600', 'h', xx, y);
    T.stepEnd();

    tanke(y, [
      [['h står i nämnaren. Jag']],
      [['multiplicerar båda led med h']],
      [['för att få upp den.']]
    ], 1.05);
    if (vagg) {
      T.vaggOp('·h', xwB, y, { h0: 1.25, h1: 1.15 });
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.3 * F;
      xx = T.str('12', padL + 30, y);
      xx = T.str('·h', xx, y, BLUE);
      xx = T.str('=', xx, y);
      xx = T.fracH('600', 'h', xx, y);
      T.str('·h', xx, y, BLUE);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('12h=600', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist dividerar jag båda led']],
      [['med 12.']]
    ]);
    if (vagg) {
      T.vaggOp('/12', xwB, y);
      T.stepEnd();
      y += 2.2 * F;
    } else {
      y += 2.4 * F;
      xx = T.fracH('12h', '12', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('600', '12', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    T.str('h=50', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['h var den lägre hastigheten,']],
      [['och den högre var dubbelt så']],
      [['hög.']]
    ]);
    y += 2.5 * F;
    xe = T.str('Svar: 50 km/h och 100 km/h', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 31: talet mellan 17 och 23 ----
   * Samma x uttrycks på två sätt; ekvationen ger p, och därefter x. */
  reg(31, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg;
    var xwA = Math.max(padL + 30 + T.adv('17+17p=23-23p'),
                       padL + 30 + T.adv('17+40p=23')) + 0.9 * F;

    y = 238;
    T.str('p % större än 17:  x=17(1+p)', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('p % mindre än 23:  x=23(1-p)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Det är samma x i båda raderna.']],
      [['Då måste högerleden vara lika']],
      [['stora.']]
    ]);
    y += 2.6 * F;
    var a0 = padL; xx = T.str('17', padL, y); var a1 = xx;
    xx = T.str('(', xx, y);
    var t1 = xx; xx = T.str('1', xx, y); var t1b = xx;
    var t2 = xx; xx = T.str('+p', xx, y); var t2b = xx;
    xx = T.str(')=', xx, y);
    var b0 = xx; xx = T.str('23', xx, y); var b1 = xx;
    xx = T.str('(', xx, y);
    var u1 = xx; xx = T.str('1', xx, y); var u1b = xx;
    var u2 = xx; xx = T.str('-p', xx, y); var u2b = xx;
    T.str(')', xx, y);
    var yK = y;
    T.stepEnd();

    tanke(y, [
      [['Jag utvecklar båda parenteserna,']],
      [['en term i taget.']]
    ]);
    y += 3.2 * F;
    xx = T.str('', padL + 30, y);
    xx = multIn(padL + 30, y, yK - 0.95 * F, [
      { fran: [a0, a1], till: [t1, t1b], skriv: '17', hojd: 26 },
      { fran: [a0, a1], till: [t2, t2b], skriv: '+17p', hojd: 46, dx: 4 }
    ]);
    xx = T.str('=', xx, y);
    multIn(xx, y, yK - 0.95 * F, [
      { fran: [b0, b1], till: [u1, u1b], skriv: '23', hojd: 26 },
      { fran: [b0, b1], till: [u2, u2b], skriv: '-23p', hojd: 46, dx: 4 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Nu samlar jag p-termerna i']],
      [['vänsterledet: addera 23p till']],
      [['båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('+23p', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('17+17p', padL + 30, y);
      xx = T.str('+23p', xx, y, BLUE);
      xx = T.str('=23-23p', xx, y);
      T.str('+23p', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('17+40p=23', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Och talen i högerledet:']],
      [['subtrahera 17 från båda led.']]
    ]);
    if (vagg) {
      T.vaggOp('-17', xwA, y);
      T.stepEnd();
      y += 2.1 * F;
    } else {
      y += 2.4 * F;
      xx = T.str('17+40p', padL + 30, y);
      xx = T.str('-17', xx, y, BLUE);
      xx = T.str('=23', xx, y);
      T.str('-17', xx, y, BLUE);
      T.stepEnd();
      y += 2.2 * F;
    }
    T.str('40p=6', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sist dividerar jag båda led']],
      [['med 40.']]
    ]);
    if (vagg) {
      T.vaggOp('/40', xwA, y);
      T.stepEnd();
      y += 3.0 * F;
    } else {
      y += 3.2 * F;
      xx = T.fracH('40p', '40', padL + 30, y);
      xx = T.str('=', xx, y);
      T.fracH('6', '40', xx, y);
      T.stepEnd();
      y += 3.2 * F;
    }
    xx = T.str('p=', padL + 30, y);
    xx = T.fracH('6', '40', xx, y);
    T.str('=0,15=15 %', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu när p är känd sätter jag in']],
      [['den i det första sambandet.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('x=17·1,15=19,55', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med det andra']],
      [['sambandet: 23·0,85=19,55.']],
      [['Och 19,55 ligger mellan 17']],
      [['och 23, som det ska.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x=19,55', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 32: den skuggade arean mellan cirklarna ----
   * Kvadratens sida är lilla cirkelns diameter, kvadratens diagonal är
   * stora cirkelns diameter. Pythagoras ger R, och skillnaden mellan
   * cirkelareorna blir exakt lilla cirkelns area. */
  reg(32, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    var cx = padL + 220, cy = 290, rr = 88, RR = rr * Math.SQRT2;

    /* ---- steg 1: rita figuren ---- */
    acts.push({ kind: 'stroke', pts: V.ringPts(cx, cy, RR, RR) });
    T.pause(200);
    T.line([cx - rr, cy - rr], [cx + rr, cy - rr]); T.pause(120);
    T.line([cx + rr, cy - rr], [cx + rr, cy + rr]); T.pause(120);
    T.line([cx + rr, cy + rr], [cx - rr, cy + rr]); T.pause(120);
    T.line([cx - rr, cy + rr], [cx - rr, cy - rr]); T.pause(160);
    acts.push({ kind: 'stroke', pts: V.ringPts(cx, cy, rr, rr) });
    T.pause(220);
    /* skuggningen mellan cirklarna: korta radiella streck */
    for (i = 0; i < 24; i++) {
      var a = i * Math.PI / 12 + 0.13;
      acts.push({ kind: 'stroke', color: BLUE, pts: V.humanize([
        [cx + Math.cos(a) * (rr + 7), cy + Math.sin(a) * (rr + 7)],
        [cx + Math.cos(a) * (RR - 5), cy + Math.sin(a) * (RR - 5)]]) });
      T.pause(50);
    }
    T.stepEnd();

    tanke(cy + RR + 20, [
      [['Lilla cirkeln nuddar kvadratens']],
      [['alla fyra sidor. Kvadratens']],
      [['sida är alltså lika lång som']],
      [['cirkelns diameter.']]
    ], 0);
    T.str('r', cx + 20, cy - 6, BLUE, 0.62);
    T.pause(160);
    T.line([cx, cy], [cx + rr, cy]);
    T.pause(200);
    y = 560;
    T.str('sidan=2r', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kvadratens hörn ligger på stora']],
      [['cirkeln, så kvadratens diagonal']],
      [['är stora cirkelns diameter.']],
      [['Pythagoras ger diagonalen.']]
    ]);
    y += 2.8 * F;
    xx = T.str('diagonalen=', padL, y);
    xx = T.rot('(2r)^2+(2r)^2', xx, y);
    xx = T.str('=', xx, y);
    T.rot('8r^2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['8r^2 kan delas upp i 4r^2 gånger']],
      [['2. Roten ur 4r^2 är 2r, som']],
      [['flyttas ut ur rottecknet.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('=2r', padL + 30, y);
    T.rot('2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Stora cirkelns radie är halva']],
      [['diagonalen.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('R=', padL, y);
    xx = T.fracH('2r√2', '2', xx, y);
    xx = T.str('=r', xx, y);
    T.rot('2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Det skuggade är stora cirkelns']],
      [['area minus lilla cirkelns.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('A=πR^2-πr^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in R. Att kvadrera']],
      [['en rot tar bort roten:']],
      [['(r√2)^2=r^2·2.']]
    ]);
    y += 2.6 * F;
    xx = T.str('=π(r', padL + 30, y);
    xx = T.rot('2', xx, y);
    T.str(')^2-πr^2', xx, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=2πr^2-πr^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Två av något minus ett av samma']],
      [['sak är ett kvar. Svaret blir']],
      [['precis lilla cirkelns area!']]
    ]);
    y += 2.5 * F;
    T.str('=πr^2', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: A=πr^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.4 * F, padL: padL };
  });

})();

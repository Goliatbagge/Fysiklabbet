/* fy2-vt2016-penna.js — pennlösningar till Kursprov Fy 2, VT 2016.
 *
 * En scen per uppgift, registrerad som "fy2-vt2016-u<nr>". Här gäller
 * FYSIKENS redovisningsregler ur handskrift.js filhuvud, till skillnad
 * från matteproven:
 *   - figuren först, i grafit, med givna värden och vektorer i BLÅTT,
 *   - kort rubrik i grafit + formeln med den sökta storheten utlöst,
 *   - mätvärdesklammern DIREKT under formeln (SI-omvandling i raden),
 *   - insättningsraden, utan ringar (klammern är gesten),
 *   - aldrig avrundning i mellanled — först i sista steget, med ≈,
 *   - en rimlighetsbedömning i en bubbla FÖRE svarsraden,
 *   - svarsraden utan beteckning: "Svar: 250 K".
 * Konstanter skrivs med ≈, aldrig med =.
 *
 * Granskning: node .claude/verify-handskrift.js fy2-vt2016-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, mathTools = V.mathTools, mkTanke = V.mkTanke,
      mkAxes = V.mkAxes, valueBracket = V.valueBracket, rotFrac = V.rotFrac,
      humanize = V.humanize, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('fy2-vt2016-u' + nr, fn); }

  /* ---- Uppgift 1: exoplanetens yttemperatur ----
   * Stefan–Boltzmanns lag löst för temperaturen: fjärderoten ur
   * emittansen delad med konstanten. */
  reg(1, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL;
    var adv = 1.7 * F, bw = 292, i;
    var px = 250, py = 175;

    T.tanke(T.figurBubble(290, [
      [['Ritar exoplaneten. Den strålar']],
      [['ut värme åt alla håll, som en']],
      [['svart kropp.']]
    ], 300));
    T.circle(px, py, 64);
    for (i = 0; i < 12; i++) {
      var a = (i / 12) * Math.PI * 2;
      T.arrow([px + 72 * Math.cos(a), py + 72 * Math.sin(a)],
              [px + 98 * Math.cos(a), py + 98 * Math.sin(a)]);
    }
    T.pause(160);
    T.lbl('M=230 W/m^2', px + 116, py + 6, BLUE);
    T.pause(140);
    T.lbl('T', px - 8, py + 6, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(py + 106), bw, [
      [['En svart kropps utstrålning']],
      [['växer med temperaturen upphöjd']],
      [['till fyra. Jag löser ut T genom']],
      [['att dra fjärderoten.']]
    ]));
    T.str('Stefan–Boltzmanns lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('M=σ·T^4 ⟺ T=', padL, y);
    rotFrac(T, F, 'M', 'σ', xa, y, 4);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Emittansen är redan i SI-enheter.']],
      [['Stefan–Boltzmanns konstant står']],
      [['i tabellen.']]
    ]));
    var klam = valueBracket(acts, [
      'M=230 W/m^2',
      'σ≈5,67·10^−^8 W/(m^2·K^4)'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xi = T.str('T=', padL, y);
    var xe = rotFrac(T, F, '230', '5,67·10^−^8', xi, y, 4);
    T.str('=252,37... K', xe + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Emittansen 230 har två']],
      [['värdesiffror, så svaret får']],
      [['också två.']]
    ]));
    T.str('T≈250 K', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['250 K är ungefär -23 °C, alltså']],
      [['kallare än jorden men inte']],
      [['iskallt. Rimligt för en planet.']]
    ]));
    T.underline(T.str('Svar: 250 K', padL, y), y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 3: vad kan rödförskjutningen berätta? ----
   * Skalan visar att linjerna flyttats mot längre våglängder — det ger
   * både riktningen och farten, men ingenting om massa eller storlek. */
  reg(3, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var ax0 = padL + 60, ax1 = padL + 500, ay = 250;

    /* ---- steg 1: skissa spektrumet ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar våglängdsskalan med de två']],
      [['kalciumlinjerna där de SKA ligga,']],
      [['och de uppmätta linjerna en bit']],
      [['åt höger.']]
    ], 300));
    T.line([ax0, ay], [ax1 + 20, ay]);
    T.line([ax1 + 12, ay - 5], [ax1 + 22, ay]);
    T.line([ax1 + 12, ay + 5], [ax1 + 22, ay]);
    T.pause(160);
    T.lbl('λ', ax1 + 14, ay + 0.95 * F);
    T.pause(140);
    [[ax0 + 60, 'Ca K'], [ax0 + 150, 'Ca H']].forEach(function (p) {
      T.line([p[0], ay - 60], [p[0], ay]);
      T.lbl(p[1], p[0] - T.lblW(p[1]) / 2, ay - 70);
      T.pause(120);
    });
    T.pause(140);
    for (i = 0; i < 2; i++) {
      var x = ax0 + 210 + i * 90;
      T.dash([x, ay - 60], [x, ay]);
      T.pause(120);
    }
    T.arrow([ax0 + 70, ay - 80], [ax0 + 200, ay - 80], BLUE);
    T.lbl('rödförskjutning', ax0 + 92, ay - 90, BLUE);
    T.stepEnd();

    tanke(330, [
      [['Linjerna ligger vid LÄNGRE']],
      [['våglängder än i laboratoriet.']],
      [['Det betyder att stjärnan']],
      [['avlägsnar sig från oss.']]
    ], 0);
    y = 430;
    T.str('Rödförskjutning ⟹ stjärnan', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('avlägsnar sig  (alternativ C)', padL + 40, y);
    T.stepEnd();

    tanke(y, [
      [['Och förskjutningens STORLEK']],
      [['säger hur fort det går —']],
      [['dopplersambandet kopplar ihop']],
      [['dem.']]
    ]);
    y += 2.8 * F;
    var xx = T.str('', padL, y);
    xx = T.fracH('Δλ', 'λ', padL, y);
    xx = T.str('=', xx, y);
    T.fracH('v', 'c', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    T.str('⟹ hastigheten  (alternativ B)', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Massa, acceleration, temperatur']],
      [['och storlek går INTE att läsa ur']],
      [['en förskjutning. Fler svar än']],
      [['två ger dessutom noll poäng.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: B och C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 4: när induceras en ström i ringen? ----
   * Villkoret är att FLÖDET genom ringen ändras — inte att det finns ett
   * fält. */
  reg(4, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 118;
    T.str('Induktionslagen:', padL, y);
    T.stepEnd();

    y += 2.5 * F;
    var xx = T.str('ε=-', padL + 30, y);
    T.fracH('ΔΦ', 'Δt', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Det är ÄNDRINGEN av flödet som']],
      [['ger en spänning. Ett fält som']],
      [['bara finns där, hur starkt som']],
      [['helst, ger ingen ström.']]
    ], 1.05);
    y += 3.6 * F;
    T.str('A: konstant likström', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('konstant fält, ingen ström', padL + 50, y, null, 0.7);
    T.stepEnd();

    y += 2.4 * F;
    T.str('B: magnet FALLER genom ringen', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('flödet ändras, ström induceras', padL + 50, y, null, 0.7);
    T.stepEnd();

    y += 2.4 * F;
    T.str('C: magnet står stilla i ringen', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('konstant fält, ingen ström', padL + 50, y, null, 0.7);
    T.stepEnd();

    y += 2.4 * F;
    T.str('D: laddning står stilla', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('inget magnetfält alls', padL + 50, y, null, 0.7);
    T.stepEnd();

    tanke(y, [
      [['Bara i B rör sig något, och']],
      [['bara där ändras flödet genom']],
      [['ringen.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: B', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 6: induktionshällen ----
   * Två saker efterfrågas: vad som händer (inducerade strömmar) och
   * vilken egenskap som värmer (resistansen). */
  reg(6, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe, i;

    /* ---- steg 1: hällen och kastrullen ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar hällen med sin spole och']],
      [['kastrullen ovanpå.']]
    ], 380));
    var hx0 = padL + 90, hx1 = padL + 390, hy = 290;
    T.line([hx0, hy], [hx1, hy]);
    T.line([hx0, hy + 40], [hx1, hy + 40]);
    T.line([hx0, hy], [hx0, hy + 40]);
    T.line([hx1, hy], [hx1, hy + 40]);
    T.pause(160);
    for (i = 0; i < 5; i++) {
      T.circle(hx0 + 50 + i * 50, hy + 20, 13);
      T.pause(60);
    }
    T.lbl('spole med växelström', hx1 + 12, hy + 26);
    T.pause(160);
    /* kastrullen */
    T.line([hx0 + 60, hy], [hx0 + 60, hy - 90]);
    T.line([hx1 - 60, hy], [hx1 - 60, hy - 90]);
    T.line([hx0 + 60, hy - 90], [hx1 - 60, hy - 90]);
    T.lbl('kastrull', hx0 + 120, hy - 100);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Växelströmmen ger ett magnetfält']],
      [['som HELA TIDEN ändras. Fältet']],
      [['går rakt upp genom kastrullens']],
      [['botten.']]
    ], 380));
    for (i = 0; i < 4; i++) {
      T.arrow([hx0 + 90 + i * 55, hy - 4], [hx0 + 90 + i * 55, hy - 44], BLUE);
      T.pause(80);
    }
    T.lbl('B ändras', hx1 - 46, hy - 30, BLUE);
    T.stepEnd();

    y = 470;
    T.str('Varierande magnetfält ⟹', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('inducerade strömmar (virvel-', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('strömmar) i kastrullens botten', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), 292, [
      [['Varför blir den varm? För att']],
      [['metallen har resistans — strömmen']],
      [['möter motstånd och elektrisk']],
      [['energi blir värme.']]
    ]));
    y += 2.8 * F;
    T.str('Kastrullen har resistans:', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('P=R·I^2 ⟹ värme', padL + 40, y);
    T.stepEnd();

    y += 2.5 * F;
    xe = T.str('Svar: strömmar induceras och', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('resistansen ger värmen', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 8: planera experiment för g ----
   * Planeringen ska gå att följa: uppställning, mätning, samband och
   * hur noggrannheten ökas. */
  reg(8, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;

    /* ---- steg 1: uppställningen ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar uppställningen: stativ,']],
      [['snöre och metallkula.']]
    ], 300));
    var sx = padL + 200, sy = 110, kl = 160;
    T.line([sx - 90, sy], [sx + 40, sy]);            /* stativarmen */
    T.line([sx - 90, sy], [sx - 90, sy + 240]);      /* stativstången */
    T.hatch([sx - 130, sy + 240], [sx - 40, sy + 240], 6);
    T.pause(160);
    T.line([sx, sy], [sx + 52, sy + kl]);            /* snöret */
    T.circle(sx + 58, sy + kl + 16, 18);
    T.pause(160);
    T.dash([sx, sy], [sx, sy + kl + 40]);
    T.pause(140);
    T.lbl('l', sx + 16, sy + 90, BLUE);
    T.pause(120);
    T.lbl('kula', sx + 84, sy + kl + 22);
    T.stepEnd();

    y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(370), 292, [
      [['Längden mäts till kulans MITT —']],
      [['det är där tyngdpunkten sitter,']],
      [['och det är den som svänger.']]
    ]));
    T.str('1. Häng upp kulan i snöret.', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Mät l med linjal, från', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('upphängning till kulans mitt.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), 292, [
      [['Att ta tiden för EN svängning']],
      [['ger stort fel — reaktionstiden']],
      [['blir en stor del av mätvärdet.']],
      [['Tio svängningar delar felet.']]
    ]));
    y += 2.8 * F;
    T.str('2. Sätt pendeln i svängning med', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('små utslag. Ta tiden för minst', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('10 svängningar och dela med 10.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('3. Upprepa med flera längder l', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('och för in värdena i en tabell.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), 292, [
      [['Svängningstiden för en plan']],
      [['pendel beror bara på längden och']],
      [['tyngdaccelerationen — inte på']],
      [['massan.']]
    ]));
    y += 2.9 * F;
    T.str('Plan pendel', padL, y - 1.5 * F, null, 0.62);
    var xa = T.str('T=2π', padL, y);
    rotFrac(T, F, 'l', 'g', xa, y);
    T.stepEnd();

    y += 3.6 * F;
    var xx = T.str('⟺ g=', padL, y);
    T.fracH('4π^2·l', 'T^2', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), 292, [
      [['Med flera mätpunkter kan jag']],
      [['räkna ut g för varje och ta']],
      [['medelvärdet. Slumpfelen tar då']],
      [['delvis ut varandra.']]
    ]));
    y += 3.6 * F;
    T.str('4. Beräkna g för varje mätning', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('och ta medelvärdet.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: se planeringen ovan', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: fotoelektrisk effekt ----
   * a) gränsvåglängden ger utträdesarbetet, b) fotonens energi minus
   * utträdesarbetet blir elektronens rörelseenergi. */
  reg(9, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar metallytan som belyses och']],
      [['elektronerna som slås loss.']]
    ], 350));
    var mx0 = padL + 120, mx1 = padL + 420, my = 300;
    T.line([mx0, my], [mx1, my]);
    T.hatch([mx0, my], [mx1, my], 12);
    T.pause(160);
    for (i = 0; i < 3; i++) {
      T.arrow([mx0 + 60 + i * 90, my - 130], [mx0 + 84 + i * 90, my - 12]);
      T.pause(80);
    }
    T.lbl('ljus', mx0 + 30, my - 120);
    T.pause(140);
    for (i = 0; i < 2; i++) {
      T.arrow([mx0 + 130 + i * 110, my - 14], [mx0 + 108 + i * 110, my - 110],
              BLUE);
      T.pause(80);
    }
    T.lbl('elektroner', mx1 - 30, my - 120, BLUE);
    T.stepEnd();

    /* ---- a) ---- */
    y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(370), bw, [
      [['Vid gränsvåglängden räcker']],
      [['fotonens energi PRECIS till att']],
      [['slita loss elektronen — ingen']],
      [['rörelseenergi blir kvar.']]
    ]));
    T.str('a) Utträdesarbetet', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('E_U=h·f_0=', padL, y);
    T.fracH('h·c', 'λ_0', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Nanometer måste bli meter innan']],
      [['något sätts in — annars blir']],
      [['svaret fel med en faktor en']],
      [['miljard.']]
    ]));
    var klam = valueBracket(acts, [
      'h≈6,626·10^−^3^4 Js (Plancks konstant)',
      'c≈3,00·10^8 m/s (ljusets hastighet)',
      'λ_0=300 nm=300·10^−^9 m'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('E_U=', padL, y);
    xx = T.fracH('6,626·10^−^3^4·3,00·10^8', '300·10^−^9', xx, y);
    T.str('J', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.str('=6,626·10^−^1^9 J', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Svaret ska vara i elektronvolt.']],
      [['En eV är den energi en']],
      [['elementarladdning får över en']],
      [['volt.']]
    ]));
    y += 2.9 * F;
    xx = T.str('E_U=', padL, y);
    xx = T.fracH('6,626·10^−^1^9', '1,602·10^−^1^9', xx, y);
    T.str('eV=4,136... eV', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    xe = T.str('Svar: 4,1 eV', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Kortare våglängd betyder mer']],
      [['energi per foton. Det som blir']],
      [['över när elektronen slitits loss']],
      [['blir rörelseenergi.']]
    ]));
    y += 3.0 * F;
    T.str('b) Fotonens energi', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('E_f=', padL, y);
    xx = T.fracH('h·c', 'λ', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('6,626·10^−^3^4·3,00·10^8', '200·10^−^9', xx, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.str('=9,939·10^−^1^9 J', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('E_k=E_f-E_U', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=(9,939-6,626)·10^−^1^9 J', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=3,313·10^−^1^9 J', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Rimligt? Rörelseenergin är']],
      [['mindre än fotonens energi, som']],
      [['den ska vara — resten gick åt']],
      [['till att lösgöra elektronen.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: 3,3·10^−^1^9 J', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 11: accelerationsspänningen ur de Broglie ----
   * Tre steg: våglängden ger farten, farten ger rörelseenergin, och
   * energin ger spänningen. */
  reg(11, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;

    y = 118;
    T.str('de Broglies samband', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('λ=', padL, y);
    xx = T.fracH('h', 'm·v', xx, y);
    xx = T.str(' ⟺ v=', xx, y);
    T.fracH('h', 'm·λ', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Elektronens massa och Plancks']],
      [['konstant står i tabellen.']],
      [['Våglängden ska vara lika stor']],
      [['som atomavståndet.']]
    ]));
    var klam = valueBracket(acts, [
      'h≈6,626·10^−^3^4 Js (Plancks konstant)',
      'm≈9,11·10^−^3^1 kg (elektronens massa)',
      'λ=1,65·10^−^1^0 m'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('v=', padL, y);
    xx = T.fracH('6,626·10^−^3^4', '9,11·10^−^3^1·1,65·10^−^1^0', xx, y);
    T.str('m/s', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.str('=4,408...·10^6 m/s', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Nu farten till rörelseenergi.']],
      [['Jag avrundar INTE här — det']],
      [['oavrundade värdet följer med']],
      [['vidare.']]
    ]));
    y += 2.9 * F;
    T.str('Rörelseenergi', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('E_k=', padL, y);
    T.fracH('m·v^2', '2', xx, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('9,11·10^−^3^1·(4,408...·10^6)^2', '2', xx, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.str('=8,851...·10^−^1^8 J', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['All den energin fick elektronen']],
      [['av spänningen. Arbetet q·U blev']],
      [['rörelseenergi.']]
    ]));
    y += 2.9 * F;
    T.str('Elektriskt arbete', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('E=q·U ⟺ U=', padL, y);
    T.fracH('E', 'q', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    var klam2 = valueBracket(acts, [
      'E≈8,851...·10^−^1^8 J (beräknad ovan)',
      'q≈1,602·10^−^1^9 C (elementarladdningen)'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam2.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('U=', padL, y);
    xx = T.fracH('8,851...·10^−^1^8', '1,602·10^−^1^9', xx, y);
    T.str('V=55,25... V', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Rimligt? Ett femtiotal volt är']],
      [['en helt vanlig spänning i ett']],
      [['labb — elektroner accelereras']],
      [['lätt.']]
    ]));
    y += adv + 2.0 * F;
    xe = T.str('Svar: 55 V', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 13: orgelpipan och cellosträngen ----
   * Resonans betyder samma frekvens. Våglängderna skiljer sig, och ur
   * dem faller strängens våghastighet ut. */
  reg(13, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar pipan, sluten i ena änden,']],
      [['och strängen som är fäst i båda.']]
    ], 360));
    var px0 = padL + 60, px1 = padL + 260, py = 230;
    T.line([px0, py - 40], [px1, py - 40]);
    T.line([px0, py + 40], [px1, py + 40]);
    T.line([px0, py - 40], [px0, py + 40]);
    T.pause(160);
    var vag = [];
    for (i = 0; i <= 24; i++) {
      var u = i / 24;
      vag.push([px0 + (px1 - px0) * u, py - 30 * Math.sin(u * Math.PI / 2)]);
    }
    acts.push({ kind: 'stroke', pts: vag, color: BLUE });
    T.lbl('L=0,80 m', px0 + 40, py + 0.95 * F + 40, BLUE);
    T.pause(160);
    var sx0 = padL + 380, sx1 = padL + 600, sy = 230;
    T.line([sx0, sy - 50], [sx0, sy + 50]);
    T.line([sx1, sy - 50], [sx1, sy + 50]);
    T.line([sx0, sy], [sx1, sy]);
    T.pause(140);
    var vag2 = [];
    for (i = 0; i <= 24; i++) {
      var u2 = i / 24;
      vag2.push([sx0 + (sx1 - sx0) * u2, sy - 34 * Math.sin(u2 * Math.PI)]);
    }
    acts.push({ kind: 'stroke', pts: vag2, color: BLUE });
    T.lbl('L=60,5 cm', sx0 + 40, sy + 0.95 * F + 50, BLUE);
    T.stepEnd();

    y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(360), bw, [
      [['En pipa som är sluten i ena']],
      [['änden rymmer en fjärdedels våg']],
      [['i grundtonen.']]
    ]));
    xx = T.str('L_p_i_p_a=', padL, y);
    xx = T.fracH('λ_l', '4', xx, y);
    T.str(' ⟹ λ_l=4·0,80=3,20 m', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Strängen är fäst i BÅDA ändarna,']],
      [['så där ryms en halv våg i']],
      [['grundsvängningen.']]
    ]));
    y += adv + 2.2 * F;
    xx = T.str('L_s=', padL, y);
    xx = T.fracH('λ_s', '2', xx, y);
    T.str(' ⟹ λ_s=2·0,605=1,21 m', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Resonans betyder att strängen']],
      [['svänger med SAMMA frekvens som']],
      [['pipan. Det är kopplingen mellan']],
      [['de två.']]
    ]));
    y += adv + 2.2 * F;
    T.str('Resonans: f_l=f_s', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('', padL, y);
    xx = T.fracH('v_l', 'λ_l', padL, y);
    xx = T.str('=', xx, y);
    T.fracH('v_s', 'λ_s', xx, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    xx = T.str('⟺ v_s=', padL, y);
    T.fracH('v_l·λ_s', 'λ_l', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Ljudets hastighet i luft står i']],
      [['tabellen. Våglängderna räknade']],
      [['jag ut ovan.']]
    ]));
    var klam = valueBracket(acts, [
      'v_l≈340 m/s (ljudets hastighet i luft)',
      'λ_s=1,21 m (beräknad ovan)',
      'λ_l=3,20 m (beräknad ovan)'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('v_s=', padL, y);
    xx = T.fracH('340·1,21', '3,20', xx, y);
    T.str('m/s=128,5... m/s', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Rimligt? Vågen går långsammare']],
      [['på strängen än ljudet i luften,']],
      [['och strängen är ju också mycket']],
      [['kortare än pipan.']]
    ]));
    y += adv + 2.0 * F;
    xe = T.str('Svar: 130 m/s', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: transformatorn ----
   * a) pröva varvtalskvoterna mot kravet, b) järnkärnans roll. */
  reg(14, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar transformatorn: två spolar']],
      [['på samma järnkärna med ok.']]
    ], 300));
    var kx0 = padL + 130, kx1 = padL + 360, ky0 = 120, ky1 = 250;
    T.rect(kx0, ky0, kx1, ky1);
    T.rect(kx0 + 34, ky0 + 34, kx1 - 34, ky1 - 34);
    T.pause(160);
    for (i = 0; i < 4; i++) {
      T.circle(kx0 + 17, ky0 + 46 + i * 34, 13);
      T.pause(50);
    }
    for (i = 0; i < 4; i++) {
      T.circle(kx1 - 17, ky0 + 46 + i * 34, 13);
      T.pause(50);
    }
    T.pause(140);
    T.lbl('N_1', kx0 - 54, ky0 + 100, BLUE);
    T.lbl('U_1=230 V', kx0 - 130, ky0 + 130, BLUE);
    T.pause(120);
    T.lbl('N_2', kx1 + 20, ky0 + 100, BLUE);
    T.lbl('U_2', kx1 + 20, ky0 + 130, BLUE);
    T.stepEnd();

    y = 350;
    T.tanke(T.bubble(120, T.bubbleTop(300), bw, [
      [['Spänningarna förhåller sig som']],
      [['varvtalen. Kravet är att U_2 ska']],
      [['ligga mellan 4 V och 12 V.']]
    ]));
    T.str('a) Transformatorsambandet', padL, y - 1.5 * F, null, 0.62);
    xx = T.fracH('U_2', 'U_1', padL, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('N_2', 'N_1', xx, y);
    xx = T.str(' ⟺ U_2=U_1·', xx, y);
    T.fracH('N_2', 'N_1', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Spolarna har 10, 50, 100, 500']],
      [['och 1 000 varv. Jag provar de']],
      [['kvoter som kan ge en spänning']],
      [['i intervallet.']]
    ]));
    y += adv + 2.4 * F;
    T.str('N_1=500, N_2=10:', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    xx = T.str('U_2=230·', padL + 40, y);
    xx = T.fracH('10', '500', xx, y);
    T.str('V=4,6 V', xx, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.str('N_1=1 000, N_2=50:', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    xx = T.str('U_2=230·', padL + 40, y);
    xx = T.fracH('50', '1 000', xx, y);
    T.str('V=11,5 V', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Andra kvoter hamnar utanför:']],
      [['10/1 000 ger 2,3 V (för lågt)']],
      [['och 50/500 ger 23 V (för högt).']]
    ]));
    y += adv + 2.2 * F;
    xe = T.str('Svar a: 500 och 10 varv, eller', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('1 000 och 50 varv', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Utan kärna skulle en stor del av']],
      [['flödet läcka ut i luften och']],
      [['aldrig nå den andra spolen.']]
    ]));
    y += 2.9 * F;
    T.str('b) Järnkärnan med ok leder det', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('magnetiska flödet i en sluten', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('bana genom BÅDA spolarna.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar b: kärnan håller ihop', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('flödet och minskar förlusterna', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 16: planera experiment för ljudets hastighet ----
   * Två högtalare i fas: avståndet mellan max och min ger våglängden. */
  reg(16, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;

    /* ---- steg 1: uppställningen ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar uppställningen: två']],
      [['högtalare på en linje med']],
      [['mikrofonen.']]
    ], 300));
    var hy = 200, h1 = padL + 120, h2 = padL + 260, mi = padL + 520;
    T.rect(h1 - 20, hy - 26, h1, hy + 26);
    T.line([h1, hy - 26], [h1 + 22, hy - 42]);
    T.line([h1, hy + 26], [h1 + 22, hy + 42]);
    T.line([h1 + 22, hy - 42], [h1 + 22, hy + 42]);
    T.pause(140);
    T.rect(h2 - 20, hy - 26, h2, hy + 26);
    T.line([h2, hy - 26], [h2 + 22, hy - 42]);
    T.line([h2, hy + 26], [h2 + 22, hy + 42]);
    T.line([h2 + 22, hy - 42], [h2 + 22, hy + 42]);
    T.pause(160);
    T.circle(mi, hy, 16);
    T.line([mi, hy + 16], [mi, hy + 60]);
    T.lbl('mikrofon', mi - 30, hy + 80);
    T.pause(160);
    T.dblArrow([h1 + 24, hy - 66], [h2 - 22, hy - 66], BLUE);
    T.lbl('Δs', (h1 + h2) / 2 - 10, hy - 76, BLUE);
    T.stepEnd();

    y = 360;
    T.tanke(T.bubble(120, T.bubbleTop(320), 292, [
      [['Högtalarna kopplas till SAMMA']],
      [['tongenerator, så att de svänger']],
      [['i fas. Annars går det inte att']],
      [['veta var vågtopparna möts.']]
    ]));
    T.str('1. Koppla båda högtalarna till', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('tongeneratorn, i fas. Välj en', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('frekvens, t.ex. f=500 Hz.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), 292, [
      [['Flyttar jag den ena högtalaren']],
      [['bakåt får dess våg längre väg.']],
      [['Vid en halv våglängds skillnad']],
      [['släcker vågorna ut varandra.']]
    ]));
    y += 2.9 * F;
    T.str('2. Flytta den bakre högtalaren', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('tills mikrofonen visar minimum:', padL + 40, y);
    T.stepEnd();

    y += 2.3 * F;
    var xx = T.str('Δs_1=', padL + 40, y);
    T.fracH('λ', '2', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    T.str('Flytta vidare till maximum:', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('Δs_2=λ, och så vidare.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('3. Mät avstånden med måttband', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('och för in dem i en tabell.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), 292, [
      [['Frekvensen är känd från']],
      [['tongeneratorn och våglängden']],
      [['uppmätt — då faller hastigheten']],
      [['ut ur vågekvationen.']]
    ]));
    y += 2.9 * F;
    T.str('Vågekvationen', padL, y - 1.5 * F, null, 0.62);
    T.str('v=f·λ', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('4. Beräkna v för varje mätning', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('och ta medelvärdet. Upprepa', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('gärna med andra frekvenser.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: se planeringen ovan', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 2: varför brister repet inte i läge B? ----
   * I vändläget är farten noll och ingen centripetalkraft behövs; i
   * nedersta läget ska repet både bära tyngden OCH svänga runt figuren. */
  reg(2, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var bw = 292;
    var O = [padL + 250, 120], R = 190;
    var aB = 55 * Math.PI / 180;
    var B = [O[0] + R * Math.sin(aB), O[1] + R * Math.cos(aB)];
    var N = [O[0], O[1] + R];

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar svängningen: repet fäst i']],
      [['taket, figuren i läge B och i']],
      [['det nedersta läget.']]
    ], 400));
    T.hatch([O[0] - 70, O[1]], [O[0] + 70, O[1]], 8);
    T.line([O[0] - 70, O[1]], [O[0] + 70, O[1]]);
    T.pause(160);
    T.line(O, B);
    T.circle(B[0], B[1] + 16, 16);
    T.lbl('B', B[0] + 26, B[1] + 10);
    T.pause(160);
    T.dash(O, N);
    T.circle(N[0], N[1] + 16, 16);
    T.lbl('nedersta läget', N[0] - 40, N[1] + 60);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften är lika stor i båda']],
      [['lägena och pekar rakt ned.']],
      [['Spännkraften pekar alltid längs']],
      [['repet, in mot upphängningen.']]
    ], 400));
    T.arrow([B[0], B[1] + 16], [B[0], B[1] + 90], BLUE);
    T.lbl('F_G', B[0] + 8, B[1] + 96, BLUE);
    T.pause(140);
    T.arrow([B[0], B[1] + 16],
            [B[0] - 0.34 * (B[0] - O[0]), B[1] + 16 - 0.34 * (B[1] - O[1])],
            BLUE);
    T.lbl('F_S', B[0] - 66, B[1] - 34, BLUE);
    T.pause(160);
    T.arrow([N[0], N[1] + 16], [N[0], N[1] + 90], BLUE);
    T.lbl('F_G', N[0] + 8, N[1] + 96, BLUE);
    T.pause(140);
    T.arrow([N[0], N[1] + 16], [N[0], N[1] - 60], BLUE);
    T.lbl('F_S', N[0] + 10, N[1] - 40, BLUE);
    T.stepEnd();

    y = 500;
    T.tanke(T.bubble(120, T.bubbleTop(460), bw, [
      [['I läge B står figuren stilla ett']],
      [['ögonblick — farten är noll. Då']],
      [['behövs ingen centripetalkraft']],
      [['alls.']]
    ]));
    T.str('Läge B: v=0', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('F_S=F_G·cos α < F_G', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['I nedersta läget är farten som']],
      [['störst. Där ska repet både bära']],
      [['hela tyngden OCH tvinga figuren']],
      [['runt kurvan.']]
    ]));
    y += 2.9 * F;
    T.str('Nedersta läget:', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    xx = T.str('F_S-F_G=', padL + 40, y);
    xx = T.fracH('m·v^2', 'r', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('⟺ F_S=F_G+', padL + 40, y);
    xx = T.fracH('m·v^2', 'r', xx, y);
    T.str(' > F_G', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Spännkraften är alltså MINST i']],
      [['läge B och STÖRST längst ned.']],
      [['Ett rep brister där det dras']],
      [['hårdast.']]
    ]));
    y += 3.6 * F;
    xe = T.str('Svar: repet borde brista i det', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('nedersta läget, inte i B', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: var är det resulterande fältet noll? ----
   * Fälten från de två ledarna är motriktade i två av kvadranterna, och
   * lika stora där avstånden är lika — alltså längs diagonalen. */
  reg(5, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var bw = 292;
    var cx = padL + 250, cy = 320, L = 160;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar de två ledarna, vinkelräta']],
      [['mot varandra, med sina']],
      [['strömriktningar.']]
    ], 520));
    T.line([cx - L, cy], [cx + L, cy]);
    T.arrow([cx + L - 60, cy], [cx + L - 10, cy], BLUE);
    T.lbl('I', cx + L - 34, cy - 12, BLUE);
    T.pause(160);
    T.line([cx, cy + L], [cx, cy - L]);
    T.arrow([cx, cy - L + 60], [cx, cy - L + 10], BLUE);
    T.lbl('I', cx + 12, cy - L + 36, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Högerhandsregeln på den vågräta']],
      [['ledaren: fältet går ut ur']],
      [['papperet ovanför och in i']],
      [['papperet nedanför.']]
    ], 520));
    T.symUt(cx + 84, cy - 68, 12);
    T.symIn(cx + 84, cy + 68, 12);
    T.pause(160);
    T.symUt(cx - 84, cy - 68, 12);
    T.symIn(cx - 84, cy + 68, 12);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Och på den lodräta ledaren: in i']],
      [['papperet till höger, ut ur']],
      [['papperet till vänster. Nu syns']],
      [['var fälten är motriktade.']]
    ], 520));
    T.symIn(cx + 120, cy - 36, 12);
    T.symUt(cx - 120, cy - 36, 12);
    T.pause(160);
    T.symIn(cx + 120, cy + 36, 12);
    T.symUt(cx - 120, cy + 36, 12);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Uppe till höger och nere till']],
      [['vänster är fälten motriktade.']],
      [['Där avstånden dessutom är lika']],
      [['tar de ut varandra helt.']]
    ], 520));
    T.line([cx - L + 20, cy + L - 20], [cx + L - 20, cy - L + 20], BLUE);
    T.lbl('B=0 längs linjen', cx + 60, cy - L + 40, BLUE);
    T.stepEnd();

    y = 620;
    T.str('Vågrät ledare: B ut ovanför,', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('in nedanför', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('Lodrät ledare: B in till höger,', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('ut till vänster', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Fältet från en rak ledare avtar']],
      [['med avståndet. Lika stora fält']],
      [['kräver alltså lika stora avstånd']],
      [['till båda ledarna.']]
    ]));
    y += 2.9 * F;
    T.str('Motriktade fält: uppe till höger', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('och nere till vänster', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: längs diagonalen genom', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('skärningspunkten (linjen y=x)', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 7: brytningen i halvcirkeln ----
   * a) strålen bryts FRÅN normalen på väg ut i luft, så infallsvinkeln
   * måste vara mindre. b) brytningslagen med hastigheter. */
  reg(7, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;
    var cx = padL + 250, cy = 250, R = 130;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar halvcirkeln med den plana']],
      [['ytan uppåt. Alla strålar möts i']],
      [['medelpunkten.']]
    ], 430));
    T.line([cx - R, cy], [cx + R, cy]);
    var bage = [];
    for (i = 0; i <= 24; i++) {
      var a = Math.PI * (i / 24);
      bage.push([cx - R * Math.cos(a), cy + R * Math.sin(a)]);
    }
    acts.push({ kind: 'stroke', pts: bage });
    T.pause(180);
    T.dash([cx, cy + 60], [cx, cy - 120]);
    T.lbl('normal', cx + 8, cy - 126);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['De tre strålarna kommer nedifrån,']],
      [['genom materialet, med olika']],
      [['vinklar mot normalen.']]
    ], 430));
    [[60, 'A'], [45, 'B'], [26, 'C']].forEach(function (p) {
      var ang = p[0] * Math.PI / 180;
      var px = cx - R * Math.sin(ang), py = cy + R * Math.cos(ang);
      T.arrow([px, py], [cx - 6 * Math.sin(ang), cy + 6 * Math.cos(ang)]);
      T.lbl(p[1], px - 22, py + 6);
      T.pause(120);
    });
    T.pause(140);
    var ut = 38.3 * Math.PI / 180;
    T.arrow([cx, cy], [cx + 150 * Math.sin(ut), cy - 150 * Math.cos(ut)], BLUE);
    T.lbl('D', cx + 150 * Math.sin(ut) + 10, cy - 150 * Math.cos(ut), BLUE);
    T.pause(140);
    T.lbl('38,3°', cx + 22, cy - 96, BLUE);
    T.stepEnd();

    /* ---- a) ---- */
    y = 480;
    T.tanke(T.bubble(120, T.bubbleTop(430), bw, [
      [['Ljuset går från materialet ut i']],
      [['luft, där det är snabbare. Då']],
      [['bryts strålen FRÅN normalen —']],
      [['utvinkeln blir störst.']]
    ]));
    T.str('a) Brytningslagen med hastigheter', padL, y - 1.5 * F, null, 0.62);
    xx = T.fracH('sin α_1', 'sin α_2', padL, y);
    xx = T.str('=', xx, y);
    T.fracH('v_1', 'v_2', xx, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['v_1 är mindre än v_2, så']],
      [['sin α_1 måste vara mindre än']],
      [['sin α_2 — alltså är α_1 mindre']],
      [['än 38,3°.']]
    ]));
    y += adv + 2.4 * F;
    T.str('v_1<v_2 ⟹ α_1<α_2=38,3°', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('A: 60°   B: 45°   C: 26°', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Bara 26° är mindre än 38,3°.', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar a: stråle C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Nu vet jag båda vinklarna och']],
      [['ljusets hastighet i luft. Då']],
      [['löser jag ut hastigheten inne i']],
      [['materialet.']]
    ]));
    y += 2.9 * F;
    T.str('b) Ljusets hastighet i materialet', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('v_1=v_2·', padL, y);
    T.fracH('sin α_1', 'sin α_2', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    var klam = valueBracket(acts, [
      'v_2≈3,00·10^8 m/s (ljusets hastighet i luft)',
      'α_1=26°',
      'α_2=38,3°'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('v_1=3,00·10^8·', padL, y);
    xx = T.fracH('sin 26°', 'sin 38,3°', xx, y);
    T.str('m/s', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    T.str('=2,122...·10^8 m/s', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Rimligt? Ljuset ska vara']],
      [['LÅNGSAMMARE i materialet än i']],
      [['luft, och det är det: ungefär']],
      [['70 % av c.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar b: 2,1·10^8 m/s', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 10: solens yttemperatur ur spektrumet ----
   * a) Wiens förskjutningslag på den avlästa toppvåglängden, b) vätets
   * absorptionslinjer. */
  reg(10, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;
    var ox = padL + 90, oy = 300, W = 460, H = 190;
    function X(nm) { return ox + (nm - 300) / 800 * W; }

    /* ---- steg 1: rita av spektrumet ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar av spektrumet: en bred']],
      [['kurva med en topp, och några']],
      [['smala dippar.']]
    ], 400));
    T.line([ox, oy], [ox + W + 24, oy]);
    T.line([ox + W + 16, oy - 5], [ox + W + 26, oy]);
    T.line([ox + W + 16, oy + 5], [ox + W + 26, oy]);
    T.pause(140);
    T.line([ox, oy], [ox, oy - H - 24]);
    T.line([ox - 5, oy - H - 16], [ox, oy - H - 26]);
    T.line([ox + 5, oy - H - 16], [ox, oy - H - 26]);
    T.pause(160);
    T.lbl('λ (nm)', ox + W - 20, oy + 0.95 * F);
    T.lbl('emittans', ox + 10, oy - H - 12);
    T.pause(140);
    [400, 500, 600, 700, 800, 900, 1000].forEach(function (nm) {
      T.line([X(nm), oy - 5], [X(nm), oy + 5]);
      T.lbl(String(nm), X(nm) - T.lblW(String(nm)) / 2, oy + 0.85 * F);
      T.pause(60);
    });
    T.pause(140);
    var kurva = [];
    for (i = 300; i <= 1100; i += 25) {
      var v = Math.exp(-Math.pow((i - 500) / 260, 2)) * (i < 500 ? 1 : 1);
      kurva.push([X(i), oy - H * Math.max(0.02, v)]);
    }
    acts.push({ kind: 'stroke', pts: kurva });
    T.stepEnd();

    /* ---- a) ---- */
    T.tanke(T.figurBubble(292, [
      [['Toppen ligger vid ungefär 500 nm']],
      [['— det är den våglängd solen']],
      [['strålar starkast på.']]
    ], 400));
    T.dash([X(500), oy], [X(500), oy - H]);
    T.pause(160);
    T.lbl('λ_m_a_x≈500 nm', X(500) + 14, oy - H + 10, BLUE);
    T.stepEnd();

    y = 470;
    T.str('a) Wiens förskjutningslag', padL, y - 1.5 * F, null, 0.62);
    T.str('λ_m_a_x·T=2,898·10^−^3', padL, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    xx = T.str('⟺ T=', padL + 30, y);
    T.fracH('2,898·10^−^3', 'λ_m_a_x', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Nanometer måste bli meter —']],
      [['konstanten är i meterkelvin.']]
    ]));
    var klam = valueBracket(acts, [
      'λ_m_a_x≈500 nm=500·10^−^9 m (avläst)'
    ], padL, y, T.s, F, { rs: 0.78 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('T=', padL, y);
    xx = T.fracH('2,898·10^−^3', '500·10^−^9', xx, y);
    T.str('K=5 796 K', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Avläsningen är ungefärlig, så']],
      [['svaret ges med två värdesiffror.']],
      [['Solens yta brukar anges till']],
      [['knappt 6 000 K — stämmer.']]
    ]));
    y += adv + 2.2 * F;
    xe = T.str('Svar a: ungefär 5 800 K', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Väte i solens atmosfär SLUKAR']],
      [['ljus vid sina egna våglängder.']],
      [['Det syns som smala dippar i']],
      [['spektrumet.']]
    ]));
    y += 2.9 * F;
    T.str('b) Vätets Balmerlinjer:', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('656, 486, 434 och 410 nm', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('Dippar syns vid just dessa', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('våglängder i diagrammet.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar b: absorptionslinjerna', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('visar att det finns väte', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 12: simhopparen ----
   * Kaströrelse: fallet bestämmer tiden, tiden bestämmer hur långt man
   * hinner i sidled. */
  reg(12, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;
    var tx = padL + 80, ty = 130, vy = 300, bx = padL + 480;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar hopptornet, vattenytan och']],
      [['banan för ett vågrätt uthopp.']]
    ], 420));
    T.line([tx, ty], [tx, vy]);
    T.line([tx - 40, ty], [tx, ty]);
    T.pause(140);
    T.line([tx - 40, vy], [bx + 40, vy]);
    T.pause(140);
    T.line([bx, vy], [bx, vy + 50]);
    T.line([tx - 40, vy + 50], [bx, vy + 50]);
    T.pause(160);
    var bana = [];
    for (i = 0; i <= 20; i++) {
      var u = i / 20;
      bana.push([tx + (bx - tx) * u, ty + (vy - ty) * u * u]);
    }
    acts.push({ kind: 'stroke', pts: bana, color: BLUE });
    T.pause(160);
    T.arrow([tx, ty], [tx + 70, ty], BLUE);
    T.lbl('v', tx + 42, ty - 12, BLUE);
    T.pause(140);
    T.dblArrow([tx + 8, ty + 20], [tx + 8, vy - 8], BLUE);
    T.lbl('5,0 m', tx + 16, (ty + vy) / 2, BLUE);
    T.pause(140);
    T.dblArrow([tx, vy + 26], [bx, vy + 26], BLUE);
    T.lbl('12 m', (tx + bx) / 2 - 20, vy + 22, BLUE);
    T.stepEnd();

    y = 480;
    T.tanke(T.bubble(120, T.bubbleTop(420), bw, [
      [['Rörelsen delas i två: fritt fall']],
      [['nedåt och konstant fart i sidled.']],
      [['Fallet bestämmer hur lång tid']],
      [['hoppet varar.']]
    ]));
    T.str('Fritt fall i y-led', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('y=', padL, y);
    xx = T.fracH('g·t^2', '2', xx, y);
    xx = T.str(' ⟺ t=', xx, y);
    rotFrac(T, F, '2y', 'g', xx, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    var klam = valueBracket(acts, [
      'y=5,0 m (fallhöjden)',
      'g≈9,82 m/s^2'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.6 * F;
    xx = T.str('t=', padL, y);
    xx = rotFrac(T, F, '2·5,0', '9,82', xx, y);
    T.str('s=1,0091... s', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.9), bw, [
      [['På den tiden måste simhopparen']],
      [['hinna 12 m i sidled för att nå']],
      [['kanten. Farten är konstant där.']]
    ]));
    y += adv + 2.4 * F;
    T.str('Konstant fart i x-led', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('v=', padL, y);
    xx = T.fracH('s', 't', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('12', '1,0091...', xx, y);
    T.str('m/s', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    T.str('=11,89... m/s ≈12 m/s', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['12 m/s är snabbare än']],
      [['världsrekordfarten på 100 m']],
      [['(ungefär 10,4 m/s) — och den']],
      [['gäller på plan mark.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: nej, det krävs 12 m/s,', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('ingen risk att nå kanten', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 15: gitterspektrometern ----
   * a) gitterkonstanten och gitterformeln i andra ordningen, b) de tre
   * observerade övergångarna ger tre energinivåer, och de övriga
   * övergångarna hamnar i infrarött. */
  reg(15, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;

    y = 182;
    T.str('a) Gitterkonstanten', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('d=', padL, y);
    xx = T.fracH('1·10^−^3', '600', xx, y);
    T.str('m=1,667·10^−^6 m', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['600 linjer per millimeter']],
      [['betyder att avståndet mellan två']],
      [['linjer är en millimeter delad i']],
      [['600 delar.']]
    ]));
    y += adv + 2.4 * F;
    T.str('Gitterformeln, andra ordningen', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('n·λ=d·sin v ⟺ λ=', padL, y);
    T.fracH('d·sin v', '2', xx, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    xx = T.str('λ_1=', padL, y);
    xx = T.fracH('1,667·10^−^6·sin 30°', '2', xx, y);
    T.str('=417 nm', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    xx = T.str('λ_2=', padL, y);
    xx = T.fracH('1,667·10^−^6·sin 47°', '2', xx, y);
    T.str('=609 nm', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    xx = T.str('λ_3=', padL, y);
    xx = T.fracH('1,667·10^−^6·sin 51°', '2', xx, y);
    T.str('=648 nm', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Alla tre ligger i det synliga']],
      [['området, 400 till 700 nm — det']],
      [['stämmer med att Stina SÅG dem.']]
    ]));
    y += adv + 2.2 * F;
    xe = T.str('Svar a: 420, 610 och 650 nm', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Varje våglängd svarar mot ett']],
      [['energisprång. Fotonens energi är']],
      [['h·c delat med våglängden.']]
    ]));
    y += 2.9 * F;
    T.str('b) Fotonenergierna', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('E=', padL, y);
    T.fracH('h·c', 'λ', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.str('E_1=4,77·10^−^1^9 J (417 nm)', padL, y);
    T.stepEnd();
    y += 2.2 * F;
    T.str('E_2=3,26·10^−^1^9 J (609 nm)', padL, y);
    T.stepEnd();
    y += 2.2 * F;
    T.str('E_3=3,07·10^−^1^9 J (648 nm)', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Alla tre går ned till samma']],
      [['grundnivå. Mellan de exciterade']],
      [['nivåerna finns SKILLNADERNA —']],
      [['mycket mindre energisprång.']]
    ]));
    y += 2.9 * F;
    T.str('Övriga övergångar ger', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('1 170, 1 320 och 10 500 nm', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Mindre energi betyder LÄNGRE']],
      [['våglängd. Alla tre hamnar långt']],
      [['bortom 700 nm, alltså i']],
      [['infrarött.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar b: de ligger i infrarött', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    xe = T.str('och syns inte för ögat', padL + 30, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });


  /* ---- Uppgift 17: masspektrometern ----
   * Hastighetsfiltret ger farten ur kraftjämvikten, och den magnetiska
   * kraften i det andra fältet blir centripetalkraft — därav massan. */
  reg(17, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;
    var fx0 = padL + 120, fx1 = padL + 360, fy = 250;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar hastighetsfiltret: två']],
      [['plattor med ett elektriskt fält']],
      [['och ett magnetfält in i']],
      [['papperet.']]
    ], 470));
    T.line([fx0, fy - 60], [fx1, fy - 60]);
    T.line([fx0, fy + 60], [fx1, fy + 60]);
    T.pause(160);
    T.arrow([fx0 - 60, fy], [fx0 - 8, fy], BLUE);
    T.lbl('Ar^+', fx0 - 100, fy - 8, BLUE);
    T.pause(140);
    for (i = 0; i < 3; i++) {
      T.arrow([fx0 + 50 + i * 70, fy - 54], [fx0 + 50 + i * 70, fy + 54]);
      T.pause(60);
    }
    T.lbl('E', fx0 + 34, fy + 40);
    T.pause(140);
    T.symIn(fx0 + 90, fy - 30, 12);
    T.symIn(fx0 + 160, fy + 30, 12);
    T.lbl('B_1', fx0 + 200, fy - 30);
    T.pause(160);
    /* halvcirkelbanan i det andra fältet */
    var bcx = fx1 + 90, bcy = fy, br = 90;
    var halv = [];
    for (i = 0; i <= 20; i++) {
      var a = -Math.PI / 2 + Math.PI * (i / 20);
      halv.push([bcx + br * Math.cos(a), bcy + br * Math.sin(a)]);
    }
    acts.push({ kind: 'stroke', pts: halv, color: BLUE });
    T.lbl('r', bcx + br + 10, bcy, BLUE);
    T.lbl('B_2', bcx - 30, bcy + 30);
    T.stepEnd();

    /* ---- hastighetsfiltret ---- */
    y = 450;
    T.tanke(T.bubble(120, T.bubbleTop(400), bw, [
      [['I filtret går jonen rakt fram.']],
      [['Då måste den elektriska och den']],
      [['magnetiska kraften vara lika']],
      [['stora och motriktade.']]
    ]));
    T.str('Kraftjämvikt i filtret', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('Q·v·B_1=Q·E ⟺ v=', padL, y);
    T.fracH('E', 'B_1', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Kilovolt per meter blir volt per']],
      [['meter, och millitesla blir tesla.']],
      [['Laddningen förkortas bort —']],
      [['farten beror inte på massan.']]
    ]));
    var klam = valueBracket(acts, [
      'E=25 kV/m=25 000 V/m',
      'B_1=49 mT=0,049 T'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('v=', padL, y);
    xx = T.fracH('25 000', '0,049', xx, y);
    T.str('m/s=5,102...·10^5 m/s', xx + 0.15 * F, y);
    T.stepEnd();

    /* ---- halvcirkelbanan ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['I det andra fältet böjer den']],
      [['magnetiska kraften banan till en']],
      [['cirkel. Den kraften ÄR']],
      [['centripetalkraften.']]
    ]));
    y += adv + 2.4 * F;
    T.str('Magnetisk kraft som centripetalkraft', padL, y - 1.5 * F, null, 0.62);
    xx = T.fracH('m·v^2', 'r', padL, y);
    xx = T.str('=Q·v·B_2 ⟺ m=', xx, y);
    T.fracH('Q·B_2·r', 'v', xx, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.4), bw, [
      [['Radien är halva bredden på']],
      [['svärtningen. Decimeter blir']],
      [['meter.']]
    ]));
    var klam2 = valueBracket(acts, [
      'Q≈1,602·10^−^1^9 C (elementarladdningen)',
      'B_2=0,50 T',
      'r=4,0 dm=0,40 m',
      'v≈5,102...·10^5 m/s (beräknad ovan)'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam2.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('m=', padL, y);
    xx = T.fracH('1,602·10^−^1^9·0,50·0,40', '5,102...·10^5', xx, y);
    T.str('kg', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    T.str('=6,279...·10^−^2^6 kg', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Massan i kilogram säger inget']],
      [['om vilken isotop det är. Jag gör']],
      [['om den till atommassenheter.']]
    ]));
    y += 2.9 * F;
    xx = T.str('m=', padL, y);
    xx = T.fracH('6,279...·10^−^2^6', '1,66·10^−^2^7', xx, y);
    T.str('u=37,8... u', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Nästan exakt 38. Argon har']],
      [['isotoper med masstalen 36, 38']],
      [['och 40 — det här är den mellersta.']]
    ]));
    y += adv + 2.2 * F;
    xe = T.str('Svar: isotopen argon-38', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 18: fjädern med stålkulan ----
   * Kraftgrafen ger både periodtiden och jämviktskraften; ur dem faller
   * massan, fjäderkonstanten och amplituden ut. */
  reg(18, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;
    var ox = padL + 90, oy = 330, W = 420, H = 190;
    function X(t) { return ox + t / 3.0 * W; }
    function Y(f) { return oy - (f - 1.5) / 2.2 * H; }

    /* ---- steg 1: rita av grafen ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar av kraftdiagrammet: kraften']],
      [['i fjädern svänger mellan två']],
      [['värden.']]
    ], 440));
    T.line([ox, oy], [ox + W + 24, oy]);
    T.line([ox + W + 16, oy - 5], [ox + W + 26, oy]);
    T.line([ox + W + 16, oy + 5], [ox + W + 26, oy]);
    T.pause(140);
    T.line([ox, oy], [ox, oy - H - 24]);
    T.line([ox - 5, oy - H - 16], [ox, oy - H - 26]);
    T.line([ox + 5, oy - H - 16], [ox, oy - H - 26]);
    T.pause(160);
    T.lbl('t (s)', ox + W - 10, oy + 0.95 * F);
    T.lbl('F (N)', ox + 10, oy - H - 12);
    T.pause(140);
    [1.9, 2.6, 3.3].forEach(function (v) {
      T.line([ox - 5, Y(v)], [ox + 5, Y(v)]);
      T.lbl(String(v).replace('.', ','),
            ox - 12 - T.lblW(String(v).replace('.', ',')), Y(v) + 0.16 * F);
      T.pause(70);
    });
    [1, 2, 3].forEach(function (v) {
      T.line([X(v), oy - 5], [X(v), oy + 5]);
      T.lbl(String(v), X(v) - T.lblW(String(v)) / 2, oy + 0.85 * F);
      T.pause(70);
    });
    T.pause(140);
    var kurva = [];
    for (i = 0; i <= 60; i++) {
      var t = i / 60 * 3.0;
      kurva.push([X(t), Y(2.6 + 0.7 * Math.sin(2 * Math.PI * t / 1.35))]);
    }
    acts.push({ kind: 'stroke', pts: kurva });
    T.stepEnd();

    /* ---- a) ---- */
    T.tanke(T.figurBubble(292, [
      [['Periodtiden är tiden för en hel']],
      [['svängning — från topp till topp.']],
      [['Jag läser av 1,35 s.']]
    ], 440));
    T.dblArrow([X(1.35 / 4), Y(3.45)], [X(1.35 + 1.35 / 4), Y(3.45)], BLUE);
    T.lbl('T=1,35 s', X(0.55), Y(3.45) - 10, BLUE);
    T.stepEnd();

    y = 500;
    T.str('a) Vinkelfrekvensen', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('ω=', padL, y);
    xx = T.fracH('2π', 'T', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('2π', '1,35', xx, y);
    T.str('s^−^1=4,654... s^−^1', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Mitt emellan ytterlägena hänger']],
      [['kulan i jämvikt. Där bär fjädern']],
      [['precis tyngdkraften, så massan']],
      [['faller ut.']]
    ]));
    y += adv + 2.4 * F;
    T.str('Jämviktskraften', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('F=', padL, y);
    xx = T.fracH('1,9+3,3', '2', xx, y);
    T.str('N=2,6 N', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    var klam = valueBracket(acts, [
      'F=2,6 N (avläst jämviktskraft)',
      'g≈9,82 N/kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('m=', padL, y);
    xx = T.fracH('F', 'g', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('2,6', '9,82', xx, y);
    T.str('kg=0,2647... kg', xx + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Vinkelfrekvensen för en']],
      [['fjäderpendel beror på']],
      [['fjäderkonstanten och massan.']],
      [['Nu känner jag två av tre.']]
    ]));
    y += adv + 2.4 * F;
    T.str('Fjäderpendelns vinkelfrekvens', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('ω=', padL, y);
    xx = rotFrac(T, F, 'k', 'm', xx, y);
    T.str(' ⟺ k=ω^2·m', xx + 0.2 * F, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    T.str('k=4,654...^2·0,2647...=5,735... N/m', padL, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    xe = T.str('Svar a: 5,7 N/m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['I ett vändläge är accelerationen']],
      [['som störst. Den resulterande']],
      [['kraften är skillnaden mellan']],
      [['fjäderkraft och tyngdkraft.']]
    ]));
    y += 2.9 * F;
    T.str('b) F_R=3,3-2,6=0,70 N', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('F_R=m·a_m_a_x=m·ω^2·A', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('⟺ A=', padL + 30, y);
    T.fracH('F_R', 'm·ω^2', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    xx = T.str('A=', padL, y);
    xx = T.fracH('0,70', '0,2647...·4,654...^2', xx, y);
    T.str('m', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    T.str('=0,1220... m', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Rimligt? En amplitud på drygt']],
      [['en decimeter för en kula i en']],
      [['fjäder — det ser man med blotta']],
      [['ögat.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar b: 0,12 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 19: katodstråleröret ----
   * Fyra led: tiden mellan plattorna, farten i y-led ur vinkeln,
   * accelerationen och kraften, och till sist spänningen. */
  reg(19, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var adv = 1.7 * F, bw = 292;
    var px0 = padL + 200, px1 = padL + 380, py = 250, d = 90;

    /* ---- steg 1: figuren ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar plattorna och elektronens']],
      [['bana: rakt fram, sedan avlänkad']],
      [['nedåt i fältet.']]
    ], 470));
    T.line([px0, py - d / 2], [px1, py - d / 2]);
    T.line([px0, py + d / 2], [px1, py + d / 2]);
    T.pause(160);
    T.arrow([px0 - 90, py], [px0 - 8, py], BLUE);
    T.lbl('v_x=37 Mm/s', px0 - 150, py - 46, BLUE);
    T.pause(140);
    var bana = [];
    for (i = 0; i <= 16; i++) {
      var u = i / 16;
      bana.push([px0 + (px1 - px0) * u, py + 30 * u * u]);
    }
    acts.push({ kind: 'stroke', pts: bana, color: BLUE });
    T.pause(140);
    T.line([px1, py + 30], [px1 + 130, py + 105]);
    T.pause(140);
    T.dash([px1, py + 30], [px1 + 130, py + 30]);
    T.lbl('30°', px1 + 34, py + 54, BLUE);
    T.pause(160);
    T.dblArrow([px0 + 6, py + d / 2 + 26], [px1 - 6, py + d / 2 + 26], BLUE);
    T.lbl('s=3,0 cm', (px0 + px1) / 2 - 40, py + d / 2 + 46, BLUE);
    T.pause(140);
    T.dblArrow([px0 - 34, py - d / 2 + 6], [px0 - 34, py + d / 2 - 6], BLUE);
    T.lbl('d=4,0 cm', px0 - 150, py + 42, BLUE);
    T.stepEnd();

    /* ---- tiden ---- */
    y = 480;
    T.tanke(T.bubble(120, T.bubbleTop(430), bw, [
      [['I x-led händer ingenting med']],
      [['farten — fältet verkar bara']],
      [['nedåt. Så tiden mellan plattorna']],
      [['får jag direkt.']]
    ]));
    T.str('Tiden mellan plattorna', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('t=', padL, y);
    T.fracH('s', 'v_x', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    var klam = valueBracket(acts, [
      's=3,0 cm=0,030 m',
      'v_x=37 Mm/s=37·10^6 m/s'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('t=', padL, y);
    xx = T.fracH('0,030', '37·10^6', xx, y);
    T.str('s=8,108...·10^−^1^0 s', xx + 0.15 * F, y);
    T.stepEnd();

    /* ---- farten i y-led ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Avlänkningsvinkeln är vinkeln']],
      [['mellan den nya farten och den']],
      [['gamla. Tangens för den vinkeln']],
      [['är v_y delat med v_x.']]
    ]));
    y += adv + 2.4 * F;
    T.str('Farten i y-led', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('tan 30°=', padL, y);
    xx = T.fracH('v_y', 'v_x', xx, y);
    T.str(' ⟺ v_y=v_x·tan 30°', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.str('v_y=37·10^6·tan 30°=21,36...·10^6 m/s', padL, y);
    T.stepEnd();

    /* ---- accelerationen och kraften ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Elektronen startade utan fart i']],
      [['y-led. Hela v_y byggdes upp under']],
      [['tiden mellan plattorna.']]
    ]));
    y += 2.9 * F;
    T.str('Accelerationen', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('a=', padL, y);
    xx = T.fracH('v_y', 't', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('21,36...·10^6', '8,108...·10^−^1^0', xx, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.str('=2,635...·10^1^6 m/s^2', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('F=m·a=9,11·10^−^3^1·2,635...·10^1^6', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=2,401...·10^−^1^4 N', padL + 30, y);
    T.stepEnd();

    /* ---- spänningen ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Kraften kommer från fältet']],
      [['mellan plattorna, och fältet']],
      [['kommer från spänningen delad']],
      [['med plattavståndet.']]
    ]));
    y += 2.9 * F;
    T.str('Från kraft till spänning', padL, y - 1.5 * F, null, 0.62);
    xx = T.str('F=q·', padL, y);
    xx = T.fracH('U', 'd', xx, y);
    xx = T.str(' ⟺ U=', xx, y);
    T.fracH('F·d', 'q', xx, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    var klam2 = valueBracket(acts, [
      'F≈2,401...·10^−^1^4 N (beräknad ovan)',
      'd=4,0 cm=0,040 m',
      'q≈1,602·10^−^1^9 C (elementarladdningen)'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam2.yEnd;

    y += adv + 2.4 * F;
    xx = T.str('U=', padL, y);
    xx = T.fracH('2,401...·10^−^1^4·0,040', '1,602·10^−^1^9', xx, y);
    T.str('V', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    T.str('=5 995... V=5,995... kV', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Rimligt? Några kilovolt är precis']],
      [['vad en gammal tjock-TV arbetade']],
      [['med — den var farlig att öppna']],
      [['av just den anledningen.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: 6,0 kV', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 680, lastBase: y + 1.4 * F, padL: padL };
  });

})();

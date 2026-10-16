/* fy1-vt2017-penna.js: pennlösningar till kursprovet Fysik 1, VT 2017.
 *
 * En scen per uppgift, registrerad som "fy1-vt2017-u<nr>". Filen består av
 * tre självständiga block (uppgift 1–10, 11–16, 17–21); varje block har
 * sitt eget filhuvud med de regler som gäller där.
 * Granskning: node .claude/verify-handskrift.js fy1-vt2017-u1 …
 */

/* fy1-vt2017-del1-penna.js: pennlösningar till Kursprov Fysik 1 VT 2017,
 * uppgift 1–10 (del 1 av 3). En scen per uppgift, "fy1-vt2017-u<nr>".
 *
 * Fysikens redovisningsregler ur handskrift.js filhuvud: figuren först i
 * grafit med givna värden och vektorer i BLÅTT, rubrik + formel med den
 * sökta storheten utlöst, mätvärdesklammer DIREKT under formeln,
 * insättning, avrundning först i sista steget, rimlighetsbedömning i en
 * bubbla före svarsraden och svarsraden utan beteckning.
 * Siffrorna är desamma som i textlösningen (data/np/fy1-vt2017-del1.js).
 *
 * Granskning: node .claude/verify-handskrift.js fy1-vt2017-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, nuklid = V.nuklid,
      mkAxes = V.mkAxes, kretsResistor = V.kretsResistor, BLUE = V.BLUE,
      forritad = V.forritad;

  function reg(nr, fn) { HK.registrera('fy1-vt2017-u' + nr, fn); }

  /* tankebubbla där nästa rad ska skrivas (under raden yPrev) */
  function bub(T, yPrev, lines, dyn) {
    T.tanke(T.bubble(120, T.bubbleTop(yPrev, dyn), 292, lines));
  }
  /* halv- eller helellips som pennstreck */
  function ellips(T, cx, cy, rx, ry, a0, a1, color) {
    var pts = [], n = 24, i;
    for (i = 0; i <= n; i++) {
      var a = a0 + (a1 - a0) * i / n;
      pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts, color: color || null });
  }
  /* mätinstrument: ring med bokstav */
  function meter(T, x, y, ch, color) {
    T.circle(x, y, 13, color);
    T.lbl(ch, x - T.lblW(ch) / 2, y + 0.2 * T.s * 100, color);
  }
  /* solcell: ring med batterisymbol och två ljuspilar */
  function solcell(T, x, y) {
    T.circle(x, y, 13);
    T.line([x - 4, y - 8], [x - 4, y + 8]);
    T.line([x + 4, y - 4], [x + 4, y + 4]);
    T.arrow([x - 36, y - 34], [x - 14, y - 12], null, 7);
    T.arrow([x - 26, y - 40], [x - 6, y - 18], null, 7);
  }

  /* ---- Uppgift 1: enheten för Ewas uträkning ----
   * Täljaren är tyngdkraften (N), nämnaren bottenarean (m²): tryck, Pa. */
  reg(1, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var cx = 190, rx = 60, ry = 13, yT = 90, yB = 200;

    /* uppgiftens figur står färdig från början */
    forritad(T, function () {
    ellips(T, cx, yT, rx, ry, 0, 2 * Math.PI);
    T.line([cx - rx, yT], [cx - rx, yB]);
    T.line([cx + rx, yT], [cx + rx, yB]);
    ellips(T, cx, yB, rx, ry, 0, Math.PI);
    T.pause(150);
    T.line([70, 236], [300, 236]);
    T.line([300, 236], [340, 196]);
    T.line([110, 196], [70, 236]);
    T.line([110, 196], [cx - rx, 196]);
    T.line([cx + rx, 196], [340, 196]);
    T.pause(150);
    T.dblArrow([cx - rx, yT - 24], [cx + rx, yT - 24], BLUE);
    T.lbl('d=50 cm', cx - 40, yT - 34, BLUE);
    T.pause(140);
    T.lbl('m=80 kg', cx + rx + 18, 150, BLUE);
    });

    y = 340;
    bub(T, 250, [
      [['80 är massan i kg och 9,82 är']],
      [['tyngdfaktorn i N/kg. Massa gånger']],
      [['tyngdfaktor är tyngdkraften.']]
    ]);
    T.str('Täljaren är tyngdkraften', padL, y - 1.5 * F, null, 0.62);
    T.str('F_G=m·g=80 kg·9,82 N/kg  (N)', padL, y);
    T.stepEnd();

    y += 3.3 * F;
    bub(T, y - 3.3 * F, [
      [['Diametern är 50 cm, så radien är']],
      [['0,25 m. π gånger radien i kvadrat']],
      [['är arean av bottenytan.']]
    ]);
    T.str('Nämnaren är bottenarean', padL, y - 1.5 * F, null, 0.62);
    T.str('A=π·r^2=π·(0,25 m)^2  (m^2)', padL, y);
    T.stepEnd();

    y += 3.6 * F;
    bub(T, y - 3.6 * F, [
      [['Kraft delad med den area den']],
      [['fördelas på är tryck.']]
    ]);
    T.str('Tryck', padL, y - 1.6 * F, null, 0.62);
    xe = T.str('p=', padL, y);
    xe = T.fracH('F', 'A', xe, y);
    xe = T.str('  enhet: ', xe, y);
    xe = T.fracH('N', 'm^2', xe, y);
    T.str('=Pa', xe + 0.1 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['4 000 Pa är 4 kPa, ungefär en']],
      [['fyrtiondel av lufttrycket. Rimligt']],
      [['för en cylinder på en stor yta.']]
    ], 1.05);
    T.underline(T.str('Svar: Pa', padL, y), y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 2: rätt krets för att mäta U och I ----
   * Voltmetern parallellt över solcellen, amperemetern i serie med motorn. */
  reg(2, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var x0 = 70, x1 = 270, yV = 90, yS = 165, yA = 240;
    var gA = (x1 - x0 - 26 - 54) / 3, xA = x0 + gA + 13, xR = xA + 13 + gA + 27;

    /* krets A ur uppgiftens figur står färdig från början */
    forritad(T, function () {
    T.line([x0, yV], [x0, yA]);
    T.line([x1, yV], [x1, yA]);
    T.line([x0, yV], [157, yV]); T.line([183, yV], [x1, yV]);
    meter(T, 170, yV, 'V');
    T.pause(140);
    T.line([x0, yS], [157, yS]); T.line([183, yS], [x1, yS]);
    solcell(T, 170, yS);
    T.pause(140);
    T.line([x0, yA], [xA - 13, yA]);
    meter(T, xA, yA, 'A');
    T.line([xA + 13, yA], [xR - 27, yA]);
    kretsResistor(T, xR, yA, 54, 22);
    T.lbl('R', xR - 6, yA + 7);
    T.line([xR + 27, yA], [x1, yA]);
    });

    T.tanke(T.figurBubble(292, [
      [['Voltmetern ligger i en egen gren']],
      [['över solcellen. Amperemetern sitter']],
      [['i samma gren som motorn.']]
    ], 300));
    T.lbl('parallellt: U', x1 + 14, yV + 6, BLUE);
    T.pause(160);
    T.lbl('i serie: I', x1 + 14, yA + 6, BLUE);
    T.stepEnd();

    y = 350;
    bub(T, 262, [
      [['Effekten är spänning gånger']],
      [['ström. Båda måste mätas.']]
    ]);
    T.str('Effekt', padL, y - 1.5 * F, null, 0.62);
    T.str('P=U·I', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['En voltmeter mäter mellan två']],
      [['punkter, en amperemeter mäter']],
      [['strömmen som går genom den.']]
    ]);
    T.str('V parallellt med solcellen ⟹ U', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('A i serie med motorn ⟹ I', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Kollar att de andra kretsarna är']],
      [['fel. En amperemeter parallellt']],
      [['med solcellen kortsluter den.']]
    ]);
    T.str('B, E: A parallellt, kortsluter', padL, y, null, 0.8);
    T.stepEnd();
    y += 1.9 * F;
    T.str('C: A mäter inte strömmen i motorn', padL, y, null, 0.8);
    T.stepEnd();
    y += 1.9 * F;
    T.str('D: V i serie stoppar strömmen', padL, y, null, 0.8);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Bara krets A mäter både spänningen']],
      [['över solcellen och strömmen genom']],
      [['motorn. Rimligt!']]
    ]);
    xe = T.str('Svar: Krets A', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 3: storheter på en väderstation ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;

    y = 180;
    T.str('Storheter i en väderprognos', padL, y - 1.5 * F, null, 0.62);
    T.str('temperatur (°C)', padL, y);
    T.stepEnd();

    bub(T, y, [
      [['Vad säger en väderprognos mer?']],
      [['Om det blåser, om det regnar och']],
      [['om ett högtryck är på väg.']]
    ]);
    y += 2.2 * F;
    T.str('lufttryck (hPa)', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('vindhastighet (m/s)', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('luftfuktighet (%)', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('nederbörd (mm)', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    bub(T, y - 2.6 * F, [
      [['Alla fyra går att mäta med ett']],
      [['instrument och anges med ett tal']],
      [['och en enhet. Tre räcker som svar.']]
    ]);
    T.str('Svar: Lufttryck, vindhastighet', padL, y);
    T.stepEnd();
    y += 2.0 * F;
    xe = T.str('och luftfuktighet', padL + 1.6 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 4: fusionen Am-243 + Ca-48 och halveringstid ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, x, xe;

    y = 180;
    T.str('a) Slår upp atomnumren', padL, y - 1.5 * F, null, 0.62);
    T.str('Am: Z=95     Ca: Z=20', padL, y);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['Masstalet uppe till vänster,']],
      [['atomnumret nere. En neutron har']],
      [['masstalet 1 och atomnumret 0.']]
    ]);
    T.str('Reaktionen', padL, y - 1.7 * F, null, 0.62);
    x = nuklid(T, F, 243, 95, 'Am', padL, y);
    x = T.str('+', x + 0.10 * F, y);
    x = nuklid(T, F, 48, 20, 'Ca', x + 0.10 * F, y);
    x = T.str('→', x + 0.10 * F, y);
    x = nuklid(T, F, 'A', 'Z', 'Uup', x + 0.10 * F, y);
    x = T.str('+3', x + 0.10 * F, y);
    nuklid(T, F, 1, 0, 'n', x + 0.06 * F, y);
    T.stepEnd();

    y += 2.8 * F;
    bub(T, y - 2.8 * F, [
      [['Antalet nukleoner bevaras. Summan']],
      [['av masstalen är lika stor före och']],
      [['efter reaktionen.']]
    ]);
    T.str('Masstal: 243+48=A+3·1', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('291=A+3', padL + 3.2 * F, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('A=291−3=288', padL + 3.2 * F, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Laddningen bevaras också.']],
      [['Neutronerna har ingen laddning.']]
    ]);
    T.str('Atomnummer: 95+20=Z+3·0', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('115=Z+0', padL + 3.2 * F, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('Z=115', padL + 3.2 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['Före: 291 nukleoner och 115']],
      [['protoner. Efter: 288+3=291 och']],
      [['115. Det stämmer!']]
    ]);
    var q = 0.82;
    x = T.str('Svar:', padL, y, null, q);
    x = nuklid(T, F, 243, 95, 'Am', x + 0.2 * F, y, q);
    x = T.str('+', x + 0.08 * F, y, null, q);
    x = nuklid(T, F, 48, 20, 'Ca', x + 0.08 * F, y, q);
    x = T.str('→', x + 0.08 * F, y, null, q);
    x = nuklid(T, F, 288, 115, 'Uup', x + 0.08 * F, y, q);
    x = T.str('+3', x + 0.08 * F, y, null, q);
    xe = nuklid(T, F, 1, 0, 'n', x + 0.05 * F, y, q);
    T.underline(xe, y);
    T.stepEnd();

    y += 3.6 * F;
    bub(T, y - 3.6 * F, [
      [['b) Man vet aldrig när en enskild']],
      [['kärna sönderfaller. Men för många']],
      [['kärnor går det att säga hur lång']],
      [['tid det tar innan hälften är borta.']]
    ]);
    T.str('b) Halveringstid', padL, y - 1.5 * F, null, 0.62);
    T.str('Efter 0,16 s finns hälften kvar,', padL, y);
    T.stepEnd();
    y += 2.0 * F;
    T.str('efter 0,32 s en fjärdedel.', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Halveringstiden gäller för många']],
      [['kärnor, inte för en enskild kärna.']]
    ]);
    T.str('Svar: Den tid det tar för hälften', padL, y);
    T.stepEnd();
    y += 2.0 * F;
    xe = T.str('av de radioaktiva kärnorna', padL + 1.6 * F, y);
    T.stepEnd();
    y += 2.0 * F;
    xe = T.str('att sönderfalla', padL + 1.6 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 5: ljushastigheten och tidsdilatation ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var sy = 160;

    /* rymdskeppet, stjärnan och v ur uppgiftens figur står färdiga */
    forritad(T, function () {
    T.line([60, sy - 18], [150, sy - 18]);
    T.line([60, sy + 18], [150, sy + 18]);
    T.line([150, sy - 18], [180, sy]);
    T.line([150, sy + 18], [180, sy]);
    T.line([60, sy - 18], [60, sy + 18]);
    T.line([70, sy - 18], [55, sy - 40]); T.line([55, sy - 40], [95, sy - 18]);
    T.line([70, sy + 18], [55, sy + 40]); T.line([55, sy + 40], [95, sy + 18]);
    T.pause(140);
    T.circle(390, sy, 16);
    T.pause(140);
    T.arrow([186, sy], [246, sy], BLUE);
    T.lbl('v', 210, sy - 10, BLUE);
    });

    T.tanke(T.figurBubble(292, [
      [['Ritar ljuset från stjärnan som']],
      [['kommer emot rymdskeppet.']]
    ], 300));
    T.arrow([360, sy - 50], [200, sy - 50], BLUE);
    T.arrow([360, sy + 50], [200, sy + 50], BLUE);
    T.lbl('c', 276, sy - 60, BLUE);
    T.stepEnd();

    y = 340;
    bub(T, 250, [
      [['Ljusets hastighet i vakuum är']],
      [['densamma för alla, hur de än rör']],
      [['sig. Astronauten lägger inte till']],
      [['sin egen fart.']]
    ]);
    T.str('a) Ljushastigheten är konstant', padL, y - 1.5 * F, null, 0.62);
    T.str('c≈3,00·10^8 m/s för alla', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    bub(T, y - 2.6 * F, [
      [['Det är samma värde som på']],
      [['jorden. Rimligt enligt']],
      [['relativitetsteorin.']]
    ]);
    xe = T.str('Svar: 3,00·10^8 m/s', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    y += 3.2 * F;
    bub(T, y - 3.2 * F, [
      [['b) Nära ljushastigheten går tiden']],
      [['ombord långsammare, sett från']],
      [['jorden. Det är tidsdilatation.']]
    ]);
    T.str('b) Tidsdilatation', padL, y - 1.5 * F, null, 0.62);
    T.str('t_0 = tiden ombord (egentid)', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('t = tiden på jorden', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('v nära c ⟹ t_0 mycket mindre än t', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    bub(T, y - 2.6 * F, [
      [['Astronauten åldras bara egentiden.']],
      [['En livstid på jorden kan vara några']],
      [['få år ombord.']]
    ]);
    T.str('Svar: Nej. Astronauten åldras bara', padL, y);
    T.stepEnd();
    y += 2.0 * F;
    xe = T.str('egentiden, som är mycket kortare', padL + 1.6 * F, y);
    T.stepEnd();
    y += 2.0 * F;
    xe = T.str('än en livstid på jorden', padL + 1.6 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 6: bollens acceleration ----
   * Mellan Y och Z verkar bara tyngdkraften: a = g hela vägen. */
  reg(6, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe, k;
    var bx = 110, yZ = 74, yY = 252, yX = 276, yBase = 302;
    var c = (yY - 5 - yZ) / 36;
    function fjader(x, ytop, ybot, w, n, color) {
      var pts = [[x, ybot]];
      for (var i = 1; i < 2 * n; i++) pts.push([x + (i % 2 ? -w : w), ybot - (ybot - ytop) * i / (2 * n)]);
      pts.push([x, ytop]);
      acts.push({ kind: 'stroke', pts: pts, color: color || null });
    }

    /* uppgiftens figur står färdig från början */
    forritad(T, function () {
    T.line([bx - 40, yBase], [bx + 40, yBase]);
    T.hatch([bx - 40, yBase], [bx + 40, yBase], 6);
    T.line([bx - 15, yY], [bx - 15, yBase]);
    T.line([bx + 15, yY], [bx + 15, yBase]);
    fjader(bx, yY, yBase, 9, 5);
    T.pause(140);
    for (k = 0; k <= 6; k++) { T.circle(bx, yZ + c * k * k, 5); T.pause(60); }
    T.lbl('Z', bx - 44, yZ + 6);
    T.lbl('Y', bx - 44, yY + 6);
    T.lbl('X', bx - 44, yX + 6);
    });

    T.tanke(T.figurBubble(292, [
      [['Mellan Y och Z har bollen lämnat']],
      [['fjädern. Då verkar bara']],
      [['tyngdkraften på den.']]
    ], 330));
    var cx = 250, cy = 104;
    T.circle(cx, cy, 14);
    T.dot(cx, cy, BLUE);
    T.arrow([cx, cy], [cx, cy + 36], BLUE);
    T.lbl('F_G', cx + 10, cy + 34, BLUE);
    T.lbl('mellan Y och Z', cx - 66, cy - 26);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vid X trycker den hoptryckta']],
      [['fjädern uppåt med en stor kraft.']],
      [['Beloppet är okänt, så jag ritar den']],
      [['bara klart större än tyngdkraften.']]
    ], 330));
    var cx2 = 380, cy2 = 226;
    T.line([cx2 - 34, 296], [cx2 + 34, 296]);
    T.hatch([cx2 - 34, 296], [cx2 + 34, 296], 5);
    fjader(cx2, cy2 + 14, 296, 12, 3, '#b3ab9e');
    T.circle(cx2, cy2, 14);
    T.lbl('vid X', cx2 - 100, cy2 + 6);
    T.pause(140);
    T.arrow([cx2 + 4, cy2 + 14], [cx2 + 4, cy2 + 14 - 90], BLUE);
    T.lbl('F_f_j_ä_d_e_r', cx2 + 14, cy2 - 64, BLUE);
    T.pause(140);
    T.dot(cx2, cy2, BLUE);
    T.arrow([cx2, cy2], [cx2, cy2 + 36], BLUE);
    T.lbl('F_G', cx2 - 58, cy2 + 40, BLUE);
    T.stepEnd();

    y = 440;
    bub(T, 340, [
      [['Med bara tyngdkraften blir']],
      [['accelerationen g, lika stor hela']],
      [['vägen, även i Z där farten är noll.']]
    ]);
    T.str('Mellan Y och Z: F_R=F_G=m·g', padL, y);
    T.stepEnd();
    y += 2.3 * F;
    T.str('⟹ a=g hela vägen  (E rätt, B, C fel)', padL, y, null, 0.85);
    T.stepEnd();

    y += 2.6 * F;
    bub(T, y - 2.6 * F, [
      [['Fjäderkraften är störst vid X och']],
      [['noll vid Y. Accelerationen ändras']],
      [['alltså på vägen.']]
    ]);
    T.str('Mellan X och Y: a ändras  (F fel)', padL, y, null, 0.85);
    T.stepEnd();
    y += 2.1 * F;
    T.str('Störst a vid X, a=g i Y  (A, D fel)', padL, y, null, 0.85);
    T.stepEnd();

    y += 2.6 * F;
    bub(T, y - 2.6 * F, [
      [['Ett kast utan luftmotstånd har']],
      [['alltid accelerationen g. Rimligt!']]
    ]);
    xe = T.str('Svar: E', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 7: vilka två mätningar har samma resistans? ----
   * Punkterna ur originalfiguren (relativa lägen). R = U/I = lutningen. */
  reg(7, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var ox = 70, oy = 270, k = 0.36;
    var P = { a: [270.5, 142.5], b: [602, 141.5], c: [165, 294.5], d: [446, 362], e: [602, 313.5] };
    function X(i) { return ox + i * k; }
    function Y(u) { return oy - u * k; }

    /* uppgiftens diagram står färdigt från början */
    forritad(T, function () {
    T.line([ox - 10, oy], [ox + 300, oy]);
    T.line([ox + 290, oy - 5], [ox + 300, oy]); T.line([ox + 290, oy + 5], [ox + 300, oy]);
    T.line([ox, oy + 10], [ox, oy - 210]);
    T.line([ox - 5, oy - 200], [ox, oy - 210]); T.line([ox + 5, oy - 200], [ox, oy - 210]);
    T.lbl('I', ox + 280, oy - 12);
    T.lbl('A', ox + 280, oy + 28);
    T.lbl('U', ox + 12, oy - 196);
    T.lbl('V', ox - 26, oy - 196);
    T.pause(140);
    Object.keys(P).forEach(function (n) {
      var x = X(P[n][0]), yy = Y(P[n][1]);
      T.line([x - 5, yy - 5], [x + 5, yy + 5]);
      T.line([x - 5, yy + 5], [x + 5, yy - 5]);
      T.lbl(n, x - 5, yy + 22);
      T.pause(80);
    });
    });

    y = 400;
    bub(T, 310, [
      [['Resistansen är spänningen delad']],
      [['med strömmen. Samma resistor ger']],
      [['samma kvot.']]
    ]);
    T.str('Ohms lag', padL, y - 1.6 * F, null, 0.62);
    xe = T.str('R=', padL, y);
    T.fracH('U', 'I', xe, y);
    T.stepEnd();

    bub(T, y, [
      [['Samma kvot betyder att punkterna']],
      [['ligger på samma linje genom origo.']],
      [['Linjen genom a går också genom e.']]
    ], 1.05);
    var ii = 760, uu = ii * (142.5 / 270.5);
    T.line([ox, oy], [X(ii), Y(uu)], BLUE);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['Strömmen och spänningen blir båda']],
      [['ungefär 2,2 gånger större från a']],
      [['till e. Kvoten är densamma.']]
    ], 1.05);
    T.str('a och e på samma linje genom origo', padL, y, null, 0.85);
    T.stepEnd();
    y += 2.1 * F;
    T.str('⟹ samma R', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    bub(T, y - 2.6 * F, [
      [['Punkterna b, c och d ligger på']],
      [['andra linjer. Fyra resistorer och fem']],
      [['mätningar, precis ett par. Rimligt!']]
    ]);
    xe = T.str('Svar: a och e', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 8: sträckan ur v-t-grafen ----
   * Arean under grafen 0–5 s: parallelltrapets, (2 + 7)/2 · 5 = 22,5 m. */
  reg(8, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var G = mkAxes(T, F, { ox: 90, oy: 270, u: 27, xmin: 0, xmax: 6, ymin: 0, ymax: 10,
                          ysc: 2, xlab: 't', ylab: 'v' });

    /* uppgiftens v-t-graf står färdig från början */
    forritad(T, function () {
    G.axes();
    G.ticks([1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10]);
    T.lbl('m/s', G.X(0) - 58, G.Y(10) - 16);
    T.lbl('s', G.X(6) + 42, G.Y(0) + 30);
    G.rule([G.X(0), G.Y(2)], [G.X(6), G.Y(8)], BLUE);
    });

    T.tanke(T.figurBubble(292, [
      [['Sträckan är arean under grafen.']],
      [['Läser av farten vid 5 s: 7 m/s.']]
    ], 330));
    G.guides(5, 7);
    T.pause(160);
    T.line([G.X(5), G.Y(0)], [G.X(5), G.Y(7)], BLUE);
    T.pause(160);
    T.lbl('v=7 m/s', G.X(5) + 14, G.Y(7) + 20, BLUE);
    T.lbl('s', G.X(2.5) - 4, G.Y(2) + 2, BLUE);
    T.stepEnd();

    y = 420;
    bub(T, 330, [
      [['Ytan är ett parallelltrapets.']],
      [['Medelfarten gånger tiden ger']],
      [['arean.']]
    ]);
    T.str('Sträcka = arean under grafen', padL, y - 1.7 * F, null, 0.62);
    xe = T.str('s=', padL, y);
    xe = T.fracH('v_0+v', '2', xe, y);
    T.str('·t', xe, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Grafen ökar 1 m/s per sekund:']],
      [['2+5=7 m/s vid 5 s.']]
    ], 1.05);
    var klam = valueBracket(acts, [
      'v_0=2 m/s (avläst)',
      'v=7 m/s (avläst)',
      't=5 s'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += 1.7 * F + 2.0 * F;
    bub(T, y - 3.7 * F, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xe = T.str('s=', padL, y);
    xe = T.fracH('2+7', '2', xe, y);
    xe = T.str('·5=22,5 m', xe, y);
    T.stepEnd();

    bub(T, y, [
      [['Värdena är avlästa ur en graf.']],
      [['Två värdesiffror räcker.']]
    ], 1.05);
    T.str('≈23 m', xe + 0.2 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['Medelfarten 4,5 m/s är ungefär']],
      [['16 km/h, en vanlig cykelfart.']],
      [['Rimligt!']]
    ], 1.05);
    xe = T.str('Svar: 23 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 9: planera bestämningen av metallens densitet ---- */
  reg(9, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;

    T.tanke(T.figurBubble(292, [
      [['Ritar mätglaset före och efter att']],
      [['klumpen sänkts ned.']]
    ], 300));
    function glas(x, yw) {
      T.line([x, 80], [x, 250]); T.line([x, 250], [x + 70, 250]); T.line([x + 70, 250], [x + 70, 80]);
      for (var t = 110; t <= 230; t += 20) T.line([x, t], [x + 12, t]);
      T.line([x, yw], [x + 70, yw], BLUE);
    }
    glas(90, 190);
    T.lbl('V_1', 170, 196, BLUE);
    T.pause(160);
    glas(260, 150);
    T.line([280, 248], [276, 230]); T.line([276, 230], [292, 220]);
    T.line([292, 220], [312, 226]); T.line([312, 226], [316, 248]);
    T.lbl('V_2', 340, 156, BLUE);
    T.stepEnd();

    y = 340;
    bub(T, 260, [
      [['Densiteten är massa per volym.']],
      [['Massan får jag direkt med vågen.']]
    ]);
    T.str('1. Väg klumpen: massan m.', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Klumpen är oregelbunden. Den tränger']],
      [['undan lika mycket vatten som sin']],
      [['egen volym.']]
    ]);
    T.str('2. Läs av vattnet i mätglaset: V_1.', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('Sänk ned klumpen helt: V_2.', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('Volymen: V=V_2−V_1', padL + 40, y);
    T.stepEnd();

    y += 3.4 * F;
    bub(T, y - 3.4 * F, [
      [['Med massan och volymen ger']],
      [['definitionen densiteten.']]
    ]);
    T.str('Densitet', padL, y - 1.6 * F, null, 0.62);
    xe = T.str('3. ρ=', padL, y);
    xe = T.fracH('m', 'V', xe, y);
    xe = T.str('=', xe, y);
    T.fracH('m', 'V_2−V_1', xe, y);
    T.stepEnd();

    y += 3.2 * F;
    bub(T, y - 3.2 * F, [
      [['Varje metall har sin egen densitet.']],
      [['En milliliter är en kubikcentimeter,']],
      [['så enheterna går att jämföra.']]
    ], 1.05);
    T.str('4. Jämför ρ med tabellen i', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('formelsamlingen. Upprepa och', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('använd medelvärdet.', padL + 40, y);
    T.stepEnd();

    y += 2.4 * F;
    bub(T, y - 2.4 * F, [
      [['Järn har cirka 7,9 g per kubik-']],
      [['centimeter, aluminium 2,7. Värdena']],
      [['skiljer sig tydligt, så det går.']]
    ]);
    xe = T.str('Svar: Se planeringen ovan', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 10: elektrisk energi ur vattenkraftverket ---- */
  reg(10, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;

    T.tanke(T.figurBubble(292, [
      [['Ritar dammen. Vattnet faller 30 m']],
      [['ned till turbinen och generatorn.']]
    ], 300));
    T.line([70, 90], [200, 90]);
    T.line([200, 90], [200, 250]);
    T.line([70, 250], [380, 250]);
    T.hatch([70, 250], [380, 250], 10);
    T.pause(150);
    T.circle(300, 226, 20);
    T.lbl('G', 294, 232);
    T.arrow([210, 104], [280, 210]);
    T.pause(150);
    T.dblArrow([52, 98], [52, 226], BLUE);
    T.lbl('h=30 m', 64, 170, BLUE);
    T.lbl('V=100 m^3', 80, 82, BLUE);
    T.lbl('η=90 %', 330, 196, BLUE);
    T.stepEnd();

    y = 350;
    bub(T, 262, [
      [['Lägesenergin tillförs kraftverket.']],
      [['Verkningsgraden säger hur stor del']],
      [['som blir elektrisk energi.']]
    ]);
    T.str('Nyttig energi', padL, y - 1.5 * F, null, 0.62);
    T.str('E_n=η·E_t=η·m·g·h', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    bub(T, y - 2.3 * F, [
      [['Massan räknar jag ut ur volymen']],
      [['och vattnets densitet ur']],
      [['tabellen.']]
    ]);
    var klam = valueBracket(acts, [
      'η=90 %=0,90',
      'ρ≈1,00·10^3 kg/m^3 (vattnets densitet)',
      'V=100 m^3',
      'm=ρ·V=1,00·10^3·100 kg=1,00·10^5 kg',
      'g≈9,82 N/kg',
      'h=30 m'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam.yEnd;

    y += 1.7 * F + 1.6 * F;
    bub(T, y - 3.3 * F, [
      [['Nu sätter jag in värdena ur']],
      [['klammern. Svaret blir i joule.']]
    ]);
    T.str('E_n=0,90·1,00·10^5·9,82·30', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('=26 514 000 J', padL + 1.6 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['En kilowattimme är 3,6 miljoner J.']],
      [['Jag delar med det.']]
    ]);
    xe = T.str('E_n=', padL, y);
    xe = T.fracH('26 514 000', '3,6·10^6', xe, y);
    xe = T.str('=7,365 kWh', xe + 0.1 * F, y);
    T.stepEnd();

    bub(T, y, [
      [['30 m och 90 % har två']],
      [['värdesiffror, så svaret får två.']]
    ], 1.05);
    y += 2.6 * F;
    T.str('≈7,4 kWh', padL + 1.6 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    bub(T, y - 3.0 * F, [
      [['En diskning tar cirka 1 kWh, så']],
      [['7,4 kWh räcker till ett sjutal']],
      [['diskningar. Rimligt.']]
    ], 1.05);
    xe = T.str('Svar: 7,4 kWh', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });
})();

/* fy1-vt2017-del2-penna.js: pennlösningar till Kursprov Fysik 1 VT 2017,
 * uppgift 11–16 (del 2 av 3). En scen per uppgift, "fy1-vt2017-u<nr>".
 *
 * Fysikens redovisningsregler ur handskrift.js filhuvud: figuren först i
 * grafit med givna värden och vektorer i BLÅTT, rubrik + formel med den
 * sökta storheten utlöst, mätvärdesklammer DIREKT under formeln,
 * insättning, avrundning först i sista steget, rimlighetsbedömning i en
 * bubbla före svarsraden och svarsraden utan beteckning. Gemensamma
 * faktorer i båda led divideras bort med blå strykning (fysikregeln).
 * Siffrorna är desamma som i textlösningen (data/np/fy1-vt2017-del2.js).
 *
 * Granskning: node .claude/verify-handskrift.js fy1-vt2017-u11 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, rotFrac = V.rotFrac,
      kretsBatteri = V.kretsBatteri, kretsResistor = V.kretsResistor, BLUE = V.BLUE,
      forritad = V.forritad;

  function reg(nr, fn) { HK.registrera('fy1-vt2017-u' + nr, fn); }

  /* tankebubbla där nästa rad ska skrivas (under raden yPrev) */
  function bub(T, yPrev, lines, dyn) {
    T.tanke(T.bubble(120, T.bubbleTop(yPrev, dyn), 292, lines));
  }
  /* ellips (valfritt vriden, valfritt streckad) som pennstreck */
  function ellips(T, cx, cy, rx, ry, rot, streckad, color) {
    var pts = [], n = streckad ? 28 : 30, i, c = Math.cos(rot || 0), s = Math.sin(rot || 0);
    for (i = 0; i <= n; i++) {
      var a = 2 * Math.PI * i / n, ex = rx * Math.cos(a), ey = ry * Math.sin(a);
      pts.push([cx + ex * c - ey * s, cy + ex * s + ey * c]);
    }
    if (streckad) T.dashPts(pts, color);
    else T.acts.push({ kind: 'stroke', pts: pts, color: color || null });
  }
  /* moln: bulor längs översidan, rak undersida */
  function moln(T, x0, x1, yb, h, n) {
    var pts = [[x0, yb]], w = (x1 - x0) / n, i, k;
    for (i = 0; i < n; i++) {
      var hh = h * (i % 2 ? 0.8 : 1.05);
      for (k = 0; k <= 8; k++) {
        var u = k / 8;
        pts.push([x0 + w * (i + u), yb - 0.35 * h - hh * Math.sin(Math.PI * u)]);
      }
    }
    pts.push([x1, yb]);
    pts.push([x0, yb]);
    T.acts.push({ kind: 'stroke', pts: pts });
  }
  /* bil i sidvy: kaross + två hjul som tangerar vägen. P(s, h) avbildar
   * längs vägen / upp från vägen till papperet. */
  function bil(T, P0, K) {
    var kk = K || 1, P = function (a, b) { return P0(a * kk, b * kk); };
    var k = [[0, 9], [96, 9], [96, 28], [82, 31], [70, 46], [28, 46], [18, 31], [0, 28], [0, 9]];
    T.acts.push({ kind: 'stroke', pts: k.map(function (p) { return P(p[0], p[1]); }) });
    T.pause(120);
    [20, 76].forEach(function (s) { var c = P(s, 9); T.circle(c[0], c[1], 9 * kk); });
  }

  /* ---- Uppgift 11: resistansen R i krets II ----
   * Samma spänning och samma ström ger samma resistans. Ersättnings-
   * resistansen räknas inifrån: först parallelldelen, sedan serien. */
  reg(11, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;
    var xL = 110, xN = 270, xR = 380, yT = 110, yB = 250;

    /* krets I ur uppgiftens figur står färdig från början */
    var gap, yA, yBat;
    forritad(T, function () {
    /* vänster ledare: amperemeter (diameter 28) och batteri (plattor 12
     * isär), tre lika mellanrum: (140 − 28 − 12)/3 */
    gap = ((yB - yT) - 28 - 12) / 3;
    yA = yT + gap + 14; yBat = yA + 14 + gap + 6;
    T.line([xL, yT], [xL, yA - 14]);
    T.circle(xL, yA, 14);
    T.lbl('A', xL - T.lblW('A') / 2, yA + 6);
    T.line([xL, yA + 14], [xL, yBat - 6]);
    kretsBatteri(T, xL, yBat, true);
    T.line([xL, yBat + 6], [xL, yB]);
    T.pause(140);
    /* toppledningen med R1 och R3 (lika stora resistorer, centrerade
     * mellan hörn och knutpunkt), knutpunkten, grenen med R2 */
    T.line([xL, yT], [163, yT]);
    kretsResistor(T, 190, yT);
    T.line([217, yT], [xN, yT]);
    T.line([xN, yT], [298, yT]);
    kretsResistor(T, 325, yT);
    T.line([352, yT], [xR, yT]);
    T.line([xR, yT], [xR, yB]);
    T.line([xL, yB], [xR, yB]);
    T.pause(140);
    T.line([xN, yT], [xN, 153]);
    kretsResistor(T, xN, 180, 22, 54);
    T.line([xN, 207], [xN, yB]);
    T.dot(xN, yT);
    T.dot(xN, yB);
    });

    T.tanke(T.figurBubble(292, [
      [['Skriver in resistanserna. ', 0], ['R', 1]],
      [['i krets II är det jag söker.']]
    ], 330));
    T.lbl('R_1=150 Ω', 146, yT - 22, BLUE);
    T.pause(140);
    T.lbl('R_3=220 Ω', 284, yT - 22, BLUE);
    T.pause(140);
    T.lbl('R_2=470 Ω', 136, 186, BLUE);
    T.stepEnd();

    /* ---- samma U och I ger samma resistans ---- */
    y = 400;
    T.tanke(T.bubble(120, 296, bw, [
      [['Samma spänning och samma ström.']],
      [['Ohms lag säger då att krets II']],
      [['ska ha samma resistans som hela']],
      [['krets I tillsammans.']]
    ]));
    T.str('Ohms lag: samma U och I', padL, y, null, 0.62);
    T.pause(300);
    y += 2.4 * F;
    xx = T.fracH('U', 'I', T.str('R=', padL, y), y);
    T.str(' ⇒ R=R_t_o_t', xx, y);
    T.stepEnd();

    /* ---- parallelldelen: formel, klammer, insättning ---- */
    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['470 Ω och 220 Ω går från samma']],
      [['knutpunkt till samma ledning. De']],
      [['är parallellkopplade. Jag börjar']],
      [['inifrån med dem.']]
    ], 1.0);
    T.str('Först parallelldelen', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('1', 'R_2_,_3', padL, y);
    xx = T.str('=', xx + 0.10 * F, y);
    xx = T.fracH('1', 'R_2', xx, y);
    xx = T.str('+', xx + 0.06 * F, y);
    T.fracH('1', 'R_3', xx, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    bub(T, y - adv, [
      [['Resistanserna står i figuren.']]
    ], 1.1);
    var klam = valueBracket(acts, ['R_2=470 Ω', 'R_3=220 Ω'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = T.fracH('1', 'R_2_,_3', padL, y);
    xx = T.str('=', xx + 0.10 * F, y);
    xx = T.fracH('1', '470', xx, y);
    xx = T.str('+', xx + 0.06 * F, y);
    xx = T.fracH('1', '220', xx, y);
    T.str('=0,006673...', xx + 0.10 * F, y);
    T.stepEnd();

    y += adv + 2.3 * F;
    bub(T, y - adv, [
      [['Det där är ett delat med']],
      [['resistansen. Jag inverterar för']],
      [['att få resistansen själv.']]
    ], 1.2);
    xx = T.fracH('1', '0,006673...', T.str('R_2_,_3=', padL, y), y);
    T.str('Ω=149,855... Ω', xx + 0.15 * F, y);
    T.stepEnd();

    /* ---- serien: formel, klammer, insättning ---- */
    y += adv + 2.0 * F;
    bub(T, y - adv, [
      [['Parallelldelen sitter i SERIE med']],
      [['150 Ω, så nu adderar jag.']]
    ], 1.2);
    T.str('Sedan serien', padL, y - 1.5 * F, null, 0.62);
    T.str('R_t_o_t=R_1+R_2_,_3', padL, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    bub(T, y - adv, [
      [['Parallelldelens resistans har jag']],
      [['räknat ut ovan. Inget avrundas']],
      [['ännu.']]
    ]);
    var klam2 = valueBracket(acts, ['R_1=150 Ω', 'R_2_,_3=149,855... Ω (beräknad ovan)'], padL, y, T.s, F);
    T.stepEnd();
    y = klam2.yEnd;

    y += adv + 2.2 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    T.str('R_t_o_t=150+149,855...', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    xx = T.str('=299,855... Ω', padL + 52, y);
    T.stepEnd();

    bub(T, y, [
      [['Resistanserna har tre värdesiffror,']],
      [['så svaret får också tre.']]
    ]);
    T.str('≈300 Ω', xx + 0.2 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv, [
      [['Parallelldelen blev mindre än']],
      [['220 Ω, som den ska. Med 150 Ω']],
      [['i serie blir det cirka 300 Ω.']],
      [['Rimligt!']]
    ]);
    xe = T.str('Svar: 300 Ω', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 12: två laddade kulor på en tråd ----
   * a) Den övre kulan bärs bara av den elektriska kraften: F_e = F_G.
   * b) Den nedre kulan: F_G och F_e nedåt, F_N = 2·F_G uppåt. */
  reg(12, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;
    var tx = 230, yTab = 300, R = 22, yLo = yTab - R, yUp = yLo - 130;

    /* uppgiftens figur står färdig från början */
    forritad(T, function () {
    T.line([150, yTab], [380, yTab]);
    T.hatch([380, yTab], [150, yTab], 12);
    T.pause(140);
    T.line([340, 70], [340, yTab]);                 /* stativstång */
    T.line([tx - 10, 70], [352, 70]);               /* arm */
    T.pause(140);
    T.line([tx, 70], [tx, yUp - R]);
    T.line([tx, yUp + R], [tx, yLo - R]);
    T.circle(tx, yUp, R);
    T.circle(tx, yLo, R);
    });

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan och avståndet']],
      [['mellan kulornas centrum.']]
    ], 345));
    T.dblArrow([180, yUp], [180, yLo], BLUE);
    T.lbl('r=3,1 cm', 60, (yUp + yLo) / 2 + 8, BLUE);
    T.pause(140);
    T.lbl('m=1,1 g', 60, yUp - 14, BLUE);
    T.stepEnd();

    /* ---- a) krafterna på den övre kulan ---- */
    T.tanke(T.figurBubble(292, [
      [['Den övre kulan svävar. Tråden är']],
      [['friktionsfri, så det enda som bär']],
      [['upp den är den elektriska kraften.']]
    ], 345));
    /* F_G från tyngdpunkten (prick), F_e intill på samma linje */
    T.dot(tx - 2, yUp, BLUE);
    T.arrow([tx - 2, yUp], [tx - 2, yUp + 62], BLUE);
    T.lbl('F_G', tx - 40, yUp + 66, BLUE);
    T.pause(160);
    T.arrow([tx + 2, yUp], [tx + 2, yUp - 62], BLUE);
    T.lbl('F_e', tx + 12, yUp - 48, BLUE);
    T.stepEnd();

    y = 432;
    T.tanke(T.bubble(120, 345, bw, [
      [['Kulan är i jämvikt. Krafterna']],
      [['tar ut varandra.']]
    ]));
    T.str('a) Jämvikt för den övre kulan', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_e=F_G', padL, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    bub(T, y - adv, [
      [['Coulombs lag. Kulorna har samma']],
      [['laddning ', 0], ['Q', 1], [', så produkten blir', 0]],
      [['Q', 1], [' i kvadrat.', 0]]
    ]);
    T.str('Coulombs lag', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('Q^2', 'r^2', T.str('F_e=k·', padL, y), y);
    xx = T.str(' ⟺ Q^2=', xx, y);
    T.fracH('F_e·r^2', 'k', xx, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    bub(T, y - adv, [
      [['Drar roten ur båda led.']]
    ], 1.1);
    rotFrac(T, F, 'F_e·r^2', 'k', T.str('Q=', padL, y), y);
    T.stepEnd();

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Den elektriska kraften är lika']],
      [['stor som tyngdkraften. Gram blir']],
      [['kilogram och centimeter meter.']]
    ], 1.4);
    var klam = valueBracket(acts, [
      'm=1,1 g=1,1·10^−^3 kg',
      'g≈9,82 N/kg (tyngdfaktorn)',
      'F_e=F_G=m·g=1,1·10^−^3 kg·9,82 N/kg=0,010802 N',
      'r=3,1 cm=0,031 m',
      'k≈8,99·10^9 N·m^2/C^2 (Coulombs konstant)'
    ], padL, y, T.s, F, { rs: 0.66 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = rotFrac(T, F, '0,010802·0,031^2', '8,99·10^9', T.str('Q=', padL, y), y);
    T.str('C', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    xx = T.str('=3,398...·10^−^8 C', padL + 30, y);
    T.stepEnd();

    y += 2.1 * F;
    bub(T, y - 2.1 * F, [
      [['Massan och avståndet har två']],
      [['värdesiffror, så svaret får två.']]
    ]);
    T.str('≈3,4·10^−^8 C=34 nC', padL + 30, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv, [
      [['Några tiotal nanocoulomb är vad']],
      [['en gnuggad plaststav brukar få.']],
      [['Rimligt! Tecknet går inte att']],
      [['avgöra, bara att det är samma.']]
    ]);
    xe = T.str('Svar: 34 nC', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) frilagd skiss av den nedre kulan ---- */
    y += adv + 2.0 * F;
    var bx = 520, bY = y + 140, bT = bY + 30;
    bub(T, y - adv, [
      [['b) Den övre kulan stöter bort den']],
      [['nedre, alltså NEDÅT. Bordet']],
      [['trycker uppåt i kontaktpunkten.']]
    ]);
    T.str('b) Den nedre kulan', padL, y, null, 0.62);
    T.pause(200);
    /* skraffering bara utanför kulan, så att pilarna går i fri yta */
    T.line([bx - 100, bT], [bx + 100, bT]);
    T.hatch([bx - 30, bT], [bx - 100, bT], 5);
    T.hatch([bx + 100, bT], [bx + 36, bT], 5);
    T.circle(bx, bT - 30, 30);
    T.pause(160);
    /* F_G från tyngdpunkten, F_e 8 px till höger, F_N = 2·F_G mitt
     * emellan: momenten kring tyngdpunkten tar ut varandra */
    T.dot(bx, bT - 30, BLUE);
    T.arrow([bx, bT - 30], [bx, bT + 34], BLUE);
    T.lbl('F_G', bx - 44, bT + 48, BLUE);
    T.pause(160);
    T.arrow([bx + 8, bT - 30], [bx + 8, bT + 34], BLUE);
    T.lbl('F_e', bx + 16, bT + 48, BLUE);
    T.pause(160);
    T.arrow([bx + 4, bT], [bx + 4, bT - 128], BLUE);
    T.lbl('F_N', bx + 16, bT - 112, BLUE);
    T.stepEnd();

    y += 2.4 * F;
    T.str('Kraftjämvikt:', padL, y, null, 0.62);
    y += 2.0 * F;
    T.str('F_N=F_G+F_e', padL, y);
    y += 2.0 * F;
    T.str('=2·F_G', padL + 52, y);
    T.stepEnd();

    y += adv + 3.4 * F;
    bub(T, y - adv - 1.7 * F, [
      [['Normalkraften bär båda de nedåt-']],
      [['riktade krafterna. Den ritas']],
      [['dubbelt så lång som ', 0], ['F_G', 1], ['.', 0]]
    ]);
    xe = T.str('Svar: Se skissen, F_N=2·F_G', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 13: hur många hinkar varmvatten? ----
   * Avgiven energi = upptagen energi. Samma ämne på båda sidor, så c
   * divideras bort. */
  reg(13, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar poolen med det kalla vattnet']],
      [['och en hink med varmt vatten.']]
    ], 320));
    /* poolen */
    T.line([90, 170], [110, 250]);
    T.line([110, 250], [330, 250]);
    T.line([330, 250], [350, 170]);
    T.dash([96, 190], [344, 190]);
    T.pause(140);
    /* hinken */
    T.line([400, 190], [410, 250]);
    T.line([410, 250], [460, 250]);
    T.line([460, 250], [470, 190]);
    T.line([400, 190], [470, 190]);
    T.pause(120);
    T.arrow([390, 210], [356, 210]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in volymer och']],
      [['temperaturer. Slutet ska bli 20 °C.']]
    ], 320));
    T.lbl('700 l, 16 °C', 160, 228, BLUE);
    T.pause(140);
    T.lbl('47 °C', 408, 176, BLUE);
    T.lbl('10 l', 418, 236, BLUE);
    T.pause(140);
    T.lbl('blandat: 20 °C', 130, 290, BLUE);
    T.stepEnd();

    y = 440;
    T.tanke(T.bubble(120, 326, bw, [
      [['Värmen går från det varma till']],
      [['det kalla vattnet. Allt som det']],
      [['varma avger tar det kalla upp.']]
    ]));
    T.str('Avgiven energi = upptagen energi', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('E_a_v_g=E_u_p_p', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    var xc1 = padL, xs1 = T.str('c', xc1, y);
    xx = T.str('·m_v·ΔT_v=', xs1, y);
    var xc2 = xx, xs2 = T.str('c', xc2, y);
    T.str('·m_k·ΔT_k', xs2, y);
    T.stepEnd();

    bub(T, y, [
      [['Det är vatten på båda sidor, så']],
      [['c', 1], [' är densamma. Jag dividerar bort', 0]],
      [['den i båda led.', 0]]
    ]);
    T.strike(xc1, xs1, y);
    T.pause(160);
    T.strike(xc2, xs2, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    xx = T.str('m_v·ΔT_v=m_k·ΔT_k ⟺ m_v=', padL, y);
    T.fracH('m_k·ΔT_k', 'ΔT_v', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['En liter vatten väger ungefär ett']],
      [['kilogram. En temperaturskillnad']],
      [['är lika stor i kelvin som i °C.']]
    ], 1.1);
    var klam = valueBracket(acts, [
      'm_k≈700 kg (1 l vatten ≈ 1 kg)',
      'ΔT_k=(20-16) K=4 K',
      'ΔT_v=(47-20) K=27 K'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = T.fracH('700·4', '27', T.str('m_v=', padL, y), y);
    T.str('kg=103,70... kg', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    bub(T, y - adv, [
      [['Det är cirka 103,7 liter. Varje']],
      [['hink rymmer 10 liter.']]
    ], 1.0);
    T.str('Antal hinkar', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('103,70...', '10', padL, y);
    xx = T.str('=10,37...', xx + 0.12 * F, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Räcker det med tio hinkar? Jag']],
      [['räknar ut blandningens temperatur.']]
    ], 0.8);
    T.str('10 hinkar:', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('700·16+100·47', '800', padL, y);
    T.str('°C≈19,9 °C', xx + 0.12 * F, y);
    T.stepEnd();

    y += adv + 1.8 * F;
    bub(T, y - adv, [
      [['Bara 0,1 °C för kallt. Det ligger']],
      [['under noggrannheten i uppgiftens']],
      [['data, så 10 hinkar är också rimligt.']],
      [['11 hinkar ger 20,2 °C, den säkra sidan.']]
    ], 1.1);
    T.str('11 hinkar ger 20,2 °C ⇒ minst 20 °C', padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv, [
      [['Varmvattnet är 27 grader för']],
      [['varmt, poolen bara 4 grader för']],
      [['kall. Ungefär 100 liter av 700']],
      [['räcker. Rimligt!']]
    ]);
    xe = T.str('Svar: 11 hinkar', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 14: bromssträckan på plan väg och i nedförsbacke ----
   * Newtons andra lag ger accelerationen (massan divideras bort), och
   * Torricellis ekvation ger sträckan. I backen hjälper F_1 = m·g·sin α
   * bilen framåt. */
  reg(14, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe, x1, x2;
    var adv = 1.7 * F, bw = 292;

    /* ---- a) figur: plan väg ---- */
    var yR = 200, x0 = 130, K = 1.4;
    var Pa = function (s, h) { return [x0 + s, yR - h]; };
    T.tanke(T.figurBubble(292, [
      [['a) Ritar bilen på den plana vägen.']],
      [['Den rör sig åt höger och bromsar.']]
    ], 330));
    T.line([70, yR], [420, yR]);
    T.hatch([420, yR], [70, yR], 15, null, 8);
    bil(T, Pa, K);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Krafterna: tyngdkraften, normal-']],
      [['kraften vid hjulen och friktionen']],
      [['bakåt vid hjulen. Friktionen är']],
      [['20 % av normalkraften.']]
    ], 330));
    var cm = Pa(48 * K, 28 * K), wa1 = Pa(20 * K, 0), wa2 = Pa(76 * K, 0);
    T.dot(cm[0], cm[1], BLUE);
    T.arrow(cm, [cm[0], cm[1] + 110], BLUE);
    T.lbl('F_G', cm[0] + 8, cm[1] + 110, BLUE);
    T.pause(140);
    /* momentbalans kring tyngdpunkten: friktionen vid marken ger ett
     * moment, så framhjulets normalkraft är större: F_N2 − F_N1 = F_f */
    T.arrow(wa1, [wa1[0], yR - 44], BLUE);
    T.arrow(wa2, [wa2[0], yR - 66], BLUE);
    T.lbl('F_N', wa2[0] + 10, yR - 58, BLUE);
    T.pause(140);
    T.arrow(wa1, [wa1[0] - 22, yR], BLUE, 8);
    T.lbl('F_f', wa1[0] - 58, yR - 8, BLUE);
    T.pause(140);
    var fr = Pa(96 * K, 18 * K);
    T.arrow(fr, [fr[0] + 44, fr[1]], BLUE);
    T.lbl('v_0=90 km/h', fr[0] + 52, fr[1] + 6, BLUE);
    T.stepEnd();

    y = 420;
    T.tanke(T.bubble(120, 330, bw, [
      [['Friktionen är den resulterande']],
      [['kraften. Den pekar bakåt, så den']],
      [['får minustecken.']]
    ]));
    T.str('a) Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    xx = T.str('F_R=-F_f ⟺ ', padL, y);
    x1 = xx; xx = T.str('m', xx, y); var x1e = xx;
    xx = T.str('·a=-µ·', xx, y);
    x2 = xx; xx = T.str('m', xx, y); var x2e = xx;
    T.str('·g', xx, y);
    T.stepEnd();

    bub(T, y, [
      [['Massan finns i båda led. Jag']],
      [['dividerar bort den.']]
    ]);
    T.strike(x1, x1e, y);
    T.pause(160);
    T.strike(x2, x2e, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('a=-µ·g', padL, y);
    T.stepEnd();

    y += adv + 2.3 * F;
    bub(T, y - adv, [
      [['Tiden är okänd, men jag vet start-']],
      [['farten, slutfarten och accelera-']],
      [['tionen. Då passar den tidlösa']],
      [['ekvationen.']]
    ]);
    T.str('Torricellis ekvation', padL, y - 2.0 * F, null, 0.62);
    xx = T.str('v^2-v_0^2=2·a·s ⟺ s=', padL, y);
    T.fracH('v^2-v_0^2', '2·a', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Bilen stannar, så ', 0], ['v', 1], [' är noll.', 0]],
      [['km/h blir m/s genom division']],
      [['med 3,6.']]
    ], 1.2);
    var klam = valueBracket(acts, [
      'v=0',
      ['v_0=90 km/h=', { frac: ['90', '3,6'] }, ' m/s=25 m/s'],
      'µ=0,20',
      'g≈9,82 m/s^2 (tyngdaccelerationen)',
      'a=-µ·g=-0,20·9,82 m/s^2=-1,964 m/s^2'
    ], padL, y, T.s, F, { rs: 0.72 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = T.fracH('0-25^2', '2·(-1,964)', T.str('s=', padL, y), y);
    xx = T.str('m=159,11... m', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv - 1.4 * F, [
      [['Friktionstalet och farten har två']],
      [['värdesiffror. Svaret får två.']]
    ], 1.1);
    T.str('≈160 m', padL + 30, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    bub(T, y - adv, [
      [['På torr asfalt (', 0], ['µ', 1], [' cirka 0,8) blir det', 0]],
      [['cirka 40 m. En fjärdedel så stor']],
      [['friktion ger fyra gånger så lång']],
      [['sträcka. Rimligt!']]
    ], 1.1);
    xe = T.str('Svar: 160 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) figur: nedförsbacke 5° och utlyft krafttriangel ---- */
    y += adv + 2.4 * F;
    var al = 5 * Math.PI / 180, ca = Math.cos(al), sa = Math.sin(al), K = 1.4;
    var Ax = 60, Ay = y + 80;
    var Pb = function (s, h) { return [Ax + s * ca + h * sa, Ay + s * sa - h * ca]; };
    bub(T, y - adv, [
      [['b) Ritar backen. Den lutar bara']],
      [['5°, så den ser nästan plan ut.']]
    ]);
    T.str('b) Nedförsbacke', padL, y, null, 0.62);
    T.pause(200);
    var Bp = Pb(420, 0);
    T.line([Ax, Ay], Bp);
    T.line([Ax, Bp[1]], [Bp[0] + 10, Bp[1]]);
    var bage = [], ib;
    for (ib = 0; ib <= 6; ib++) {
      var ab = Math.PI + al * ib / 6;
      bage.push([Bp[0] + 90 * Math.cos(ab), Bp[1] + 90 * Math.sin(ab)]);
    }
    acts.push({ kind: 'stroke', pts: bage });
    T.lbl('α=5°', Bp[0] - 150, Bp[1] + 28, BLUE);
    T.pause(120);
    var Pc = function (s, h) { return Pb(120 + s, h); };
    bil(T, Pc, K);
    T.stepEnd();

    var FGb = 110, F2b = FGb * ca, FFb = 0.20 * F2b;
    var FN1b = (F2b - FFb) / 2, FN2b = (F2b + FFb) / 2;
    var cmb = Pc(48 * K, 28 * K), w1 = Pc(20 * K, 0), w2 = Pc(76 * K, 0);
    var yFig = Math.max(cmb[1] + FGb + 20, Bp[1] + 40);
    /* förstorad komposantfigur (F_G = 240) till höger om bilen */
    var LG = 240, Q = [600, cmb[1] - 30];
    var T1 = [Q[0] + ca * LG * sa, Q[1] + sa * LG * sa];
    var T2 = [Q[0] - sa * LG * ca, Q[1] + ca * LG * ca], TG = [Q[0], Q[1] + LG];
    bub(T, yFig - 0.28 * F - 23, [
      [['Tyngdkraften rakt nedåt, normal-']],
      [['kraften vinkelrätt mot vägen och']],
      [['friktionen uppför backen.']]
    ]);
    T.dot(cmb[0], cmb[1], BLUE);
    T.arrow(cmb, [cmb[0], cmb[1] + FGb], BLUE);
    T.lbl('F_G', cmb[0] + 8, cmb[1] + FGb, BLUE);
    T.pause(140);
    T.arrow(w1, [w1[0] + FN1b * sa, w1[1] - FN1b * ca], BLUE);
    T.arrow(w2, [w2[0] + FN2b * sa, w2[1] - FN2b * ca], BLUE);
    T.lbl('F_N', w2[0] + FN2b * sa + 10, w2[1] - FN2b + 12, BLUE);
    T.pause(140);
    T.arrow(w1, [w1[0] - FFb * ca, w1[1] - FFb * sa], BLUE, 8);
    T.lbl('F_f', w1[0] - FFb - 40, w1[1] - 12, BLUE);
    T.stepEnd();

    /* komposantuppdelningen som parallellogram, förstorad: F_1 längs
     * vägen och F_2 vinkelrätt mot vägen, båda streckade från
     * angreppspunkten, och två streckade guider som sluter figuren */
    bub(T, yFig - 0.28 * F - 23, [
      [['Delar upp ', 0], ['F_G', 1], [' i en komposant ', 0], ['F_1', 1]],
      [['längs backen och en komposant ', 0], ['F_2', 1]],
      [['vinkelrätt mot vägen. Vinkeln', 0]],
      [['mellan ', 0], ['F_G', 1], [' och ', 0], ['F_2', 1], [' är ', 0], ['α', 1], ['.', 0]]
    ]);
    T.lbl('förstorad', Q[0] - 50, Q[1] - 16, null, 0.5);
    T.dot(Q[0], Q[1], BLUE);
    T.arrow(Q, TG, BLUE);
    T.lbl('F_G', TG[0] + 8, TG[1] + 4, BLUE);
    T.pause(160);
    T.dash(Q, T2, BLUE);
    T.arrowHead(T2[0], T2[1], Q[0], Q[1], 9, BLUE);
    T.lbl('F_2', T2[0] - 40, T2[1] + 4, BLUE);
    T.pause(160);
    T.dash(Q, T1, BLUE);
    T.arrowHead(T1[0], T1[1], Q[0], Q[1], 7, BLUE);
    T.lbl('F_1', T1[0] + 6, T1[1] + 22, BLUE);
    T.pause(160);
    T.dash(T1, TG);
    T.dash(T2, TG);
    T.pause(160);
    var bage = [], ib;
    for (ib = 0; ib <= 6; ib++) {
      var ab = Math.PI / 2 + (5 * Math.PI / 180) * ib / 6;
      bage.push([Q[0] + 150 * Math.cos(ab), Q[1] + 150 * Math.sin(ab)]);
    }
    acts.push({ kind: 'stroke', pts: bage });
    T.lbl('α', Q[0] - 10, Q[1] + 176, null, 0.5);
    T.stepEnd();

    y = yFig + 150;
    bub(T, yFig - 0.28 * F - 23, [
      [['Nedför backen drar ', 0], ['F_1', 1], ['. Bakåt', 0]],
      [['bromsar friktionen, och ', 0], ['F_N', 1], [' är', 0]],
      [['lika stor som ', 0], ['F_2', 1], ['.', 0]]
    ]);
    T.str('Komposanterna', padL, y - 1.5 * F, null, 0.62);
    T.str('F_1=m·g·sin α   F_2=m·g·cos α', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    T.str('F_f=µ·F_N=µ·m·g·cos α', padL, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    bub(T, y - adv, [
      [['Rörelseriktningen räknas positiv.']],
      [['F_1', 1], [' framåt, friktionen bakåt.', 0]]
    ]);
    T.str('Newtons andra lag längs backen', padL, y - 1.5 * F, null, 0.62);
    T.str('F_R=F_1-F_f', padL, y);
    T.stepEnd();

    y += 2.2 * F;
    var xm = [];
    xx = padL;
    xm.push([xx, xx = T.str('m', xx, y)]);
    xx = T.str('·a=', xx, y);
    xm.push([xx, xx = T.str('m', xx, y)]);
    xx = T.str('·g·sin α-µ·', xx, y);
    xm.push([xx, xx = T.str('m', xx, y)]);
    T.str('·g·cos α', xx, y);
    T.stepEnd();

    bub(T, y, [
      [['Massan finns i alla termer. Jag']],
      [['dividerar bort den.']]
    ]);
    xm.forEach(function (m, i) {
      if (i) T.pause(140);
      T.strike(m[0], m[1], y);
    });
    T.stepEnd();

    y += 2.2 * F;
    T.str('a=g·sin α-µ·g·cos α', padL, y);
    T.stepEnd();

    y += adv + 2.3 * F;
    bub(T, y - adv, [
      [['Samma tidlösa ekvation som i a),']],
      [['men med den nya accelerationen.']]
    ]);
    T.str('Torricellis ekvation', padL, y - 2.0 * F, null, 0.62);
    T.fracH('v^2-v_0^2', '2·a', T.str('s=', padL, y), y);
    T.stepEnd();

    y += adv + 2.0 * F;
    bub(T, y - adv, [
      [['Accelerationen räknar jag ut på']],
      [['sin rad i klammern.']]
    ], 1.2);
    var klam2 = valueBracket(acts, [
      'v=0',
      'v_0=25 m/s',
      'µ=0,20',
      'g≈9,82 m/s^2 (tyngdaccelerationen)',
      'α=5°',
      'a=(9,82·sin 5°-0,20·9,82·cos 5°) m/s^2=-1,1006... m/s^2'
    ], padL, y, T.s, F, { rs: 0.6 });
    T.stepEnd();
    y = klam2.yEnd;

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = T.fracH('0-25^2', '2·(-1,1006...)', T.str('s=', padL, y), y);
    xx = T.str('m=283,92... m', xx + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv - 1.4 * F, [
      [['Lutningen 5° har bara en värde-']],
      [['siffra, och svaret är känsligt för']],
      [['vinkeln. En värdesiffra räcker.']]
    ], 1.1);
    T.str('≈300 m', padL + 30, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    bub(T, y - adv, [
      [['Nedför backen hjälper tyngd-']],
      [['kraften till, så sträckan ska bli']],
      [['längre än 160 m. Rimligt!']]
    ], 1.1);
    xe = T.str('Svar: 300 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 15: varmfronten ----
   * a) Ideala gaslagen med p_2 = 0,50·p_1 och T_2 = 0,80·T_1; p_1 och
   * T_1 förkortas bort. b) Luften kyls av och vattenångan kondenserar. */
  reg(15, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;
    var yG = 290;

    /* uppgiftens figur står färdig från början */
    forritad(T, function () {
    T.line([50, yG], [420, yG]);
    T.line([300, yG], [380, 150]);
    T.hatch([380, 150], [300, yG], 7, null, 10);
    T.pause(140);
    ellips(T, 140, 254, 66, 24, 0, true);
    T.str('A', 132, 262, null, 0.62);
    T.pause(140);
    var rot = Math.atan2(150 - yG, 380 - 300);
    ellips(T, 302, 196, 62, 20, rot, true);
    T.str('B', 294, 204, null, 0.62);
    T.pause(140);
    T.arrow([212, 250], [272, 236]);
    });

    T.tanke(T.figurBubble(292, [
      [['Skriver in hur tryck och tempera-']],
      [['tur ändras. Volymen ', 0], ['V_2', 1], [' söker jag.', 0]]
    ], 330));
    T.lbl('p_1, V_1, T_1', 80, 214, BLUE);
    T.pause(140);
    T.lbl('p_2=0,50·p_1', 70, 154, BLUE);
    T.lbl('T_2=0,80·T_1', 70, 180, BLUE);
    T.lbl('V_2', 236, 168, BLUE);
    T.stepEnd();

    y = 420;
    T.tanke(T.bubble(120, 330, bw, [
      [['Samma luftmassa i A och B, så']],
      [['ideala gaslagen gäller mellan']],
      [['lägena. Jag löser ut ', 0], ['V_2', 1], ['.', 0]]
    ]));
    T.str('a) Ideala gaslagen', padL, y - 0.2 * F, null, 0.62);
    T.pause(300);
    y += 2.6 * F;
    xx = T.fracH('p_1·V_1', 'T_1', padL, y);
    xx = T.str('=', xx + 0.1 * F, y);
    xx = T.fracH('p_2·V_2', 'T_2', xx, y);
    xx = T.str(' ⟺ V_2=', xx, y);
    T.fracH('p_1·V_1·T_2', 'T_1·p_2', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Trycket sjunker med 50 %, alltså']],
      [['är 50 % kvar. Temperaturen sjunker']],
      [['med 20 %, alltså är 80 % kvar.']]
    ], 1.1);
    var klam = valueBracket(acts, ['p_2=0,50·p_1', 'T_2=0,80·T_1'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    /* insättning; täljare och nämnare skrivs i delar så att p_1 och T_1
     * kan strykas */
    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in uttrycken ur']],
      [['klammern i formeln.']]
    ]);
    var x0 = T.str('V_2=', padL, y);
    var nS = 'p_1·V_1·0,80·T_1', dS = 'T_1·0,50·p_1';
    var nw = T.adv(nS), dw = T.adv(dS), w = Math.max(nw, dw) + 0.3 * F;
    var nx = x0 + (w - nw) / 2, dx = x0 + (w - dw) / 2;
    var ybar = y - 0.34 * F, yNum = ybar - 0.36 * F, yDen = ybar + 1.04 * F;
    T.fracH(nS, dS, x0, y);
    T.stepEnd();

    bub(T, y, [
      [['p_1', 1], [' och ', 0], ['T_1', 1], [' finns både i täljaren', 0]],
      [['och i nämnaren. De förkortas bort.']]
    ], 1.1);
    T.strike(nx, nx + T.adv('p_1'), yNum);
    T.pause(140);
    T.strike(dx + T.adv('T_1·0,50·'), dx + dw, yDen);
    T.pause(200);
    T.strike(nx + T.adv('p_1·V_1·0,80·'), nx + nw, yNum);
    T.pause(140);
    T.strike(dx, dx + T.adv('T_1'), yDen);
    T.stepEnd();

    y += adv + 2.6 * F;
    xx = T.fracH('0,80', '0,50', T.str('V_2=', padL, y), y);
    T.str('·V_1=1,6·V_1', xx, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    bub(T, y - adv, [
      [['Förändringsfaktorn 1,6 betyder']],
      [['160 % av den gamla volymen.']]
    ], 1.1);
    T.str('1,6=1+0,6 ⇒ ökning med 60 %', padL, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv, [
      [['Halverat tryck fördubblar volymen,']],
      [['och kallare luft drar ihop sig.']],
      [['Ökningen blir mindre än dubbelt.']],
      [['Rimligt!']]
    ]);
    xe = T.str('Svar: Volymen ökar med 60 %', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += adv + 2.0 * F;
    bub(T, y - adv, [
      [['b) Ett moln är små vattendroppar.']],
      [['Varför blir vattenångan till']],
      [['vätska just i B?']]
    ]);
    T.str('b) Luften stiger:', padL, y, null, 0.62);
    y += 1.6 * F;
    T.str('trycket sjunker, luften expanderar och kyls av', padL + 20, y, null, 0.62);
    T.stepEnd();

    y += 1.6 * F;
    T.str('kall luft rymmer mindre vattenånga', padL + 20, y, null, 0.62);
    y += 1.6 * F;
    T.str('⇒ ångan kondenserar till små droppar = moln', padL + 20, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.2 * F;
    xe = T.str('Svar: Vattenångan kondenserar', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });

  /* ---- Uppgift 16: åskmolnet ----
   * a) Fältet pekar från + (marken, influens) mot − (molnets undersida).
   * b) U = E·d. c) Klassisk rörelseenergi duger (5 % av c);
   *    N·q_e·U = ΔE_k. */
  reg(16, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var adv = 1.7 * F, bw = 292;
    var yC = 170, yG = 300, i;

    /* uppgiftens figur står färdig från början */
    forritad(T, function () {
    moln(T, 130, 400, yC, 30, 5);
    T.pause(140);
    T.line([90, yG], [430, yG]);
    T.hatch([430, yG], [90, yG], 13, null, 8);
    T.pause(140);
    for (i = 0; i < 5; i++) T.str('-', 160 + i * 52, yC + 20, null, 0.6);
    });

    /* ---- a) ---- */
    T.tanke(T.figurBubble(292, [
      [['a) Minusladdningen i molnet stöter']],
      [['bort elektroner i marken. Marken']],
      [['blir plus, och fältet pekar från']],
      [['plus mot minus: UPPÅT.']]
    ], 350));
    for (i = 0; i < 5; i++) T.str('+', 158 + i * 52, yG - 8, null, 0.6);
    T.pause(160);
    for (i = 0; i < 4; i++) {
      var fx = 184 + i * 52;
      T.line([fx, yG], [fx, yC + 4], BLUE);
      T.arrowHead(fx, (yC + yG) / 2 - 8, fx, (yC + yG) / 2 + 12, 10, BLUE);
      T.pause(80);
    }
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in fältstyrkan och']],
      [['avståndet.']]
    ], 350));
    T.dblArrow([440, yC], [440, yG], BLUE);
    T.lbl('d=1,5 km', 456, (yC + yG) / 2 + 6, BLUE);
    T.pause(140);
    T.lbl('𝔼=3,1 kV/m', 456, (yC + yG) / 2 + 40, BLUE);
    T.stepEnd();

    y = 420;
    T.tanke(T.bubble(120, 350, bw, [
      [['Fältlinjerna går från marken upp']],
      [['till molnets undersida.']]
    ]));
    xe = T.str('Svar: Uppåt, från marken mot molnet', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += adv + 2.4 * F;
    bub(T, y - adv - 0.6 * F, [
      [['b) Mellan marken och molnet är']],
      [['fältet nästan homogent, som mellan']],
      [['två plattor.']]
    ]);
    T.str('b) Fältstyrka mellan plattor', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('U', 'd', T.str('𝔼=', padL, y), y);
    T.str(' ⟺ U=𝔼·d', xx, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    bub(T, y - adv, [
      [['Kilovolt blir volt och kilometer']],
      [['blir meter.']]
    ], 1.1);
    var klam = valueBracket(acts, [
      '𝔼=3,1 kV/m=3,1·10^3 V/m',
      'd=1,5 km=1,5·10^3 m'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = T.str('U=3,1·10^3·1,5·10^3 V=4,65·10^6 V', padL, y);
    T.stepEnd();

    y += adv + 1.0 * F;
    bub(T, y - adv - 1.0 * F, [
      [['Två värdesiffror, som fältstyrkan']],
      [['och avståndet.']]
    ]);
    T.str('≈4,7 MV', padL + 30, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    bub(T, y - adv, [
      [['Några miljoner volt är vad']],
      [['åskmoln brukar ha mot marken.']],
      [['Rimligt!']]
    ]);
    xe = T.str('Svar: 4,7 MV', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    y += adv + 2.6 * F;
    bub(T, y - adv - 0.8 * F, [
      [['c) 15 Mm/s är snabbt. Duger den']],
      [['vanliga formeln för rörelseenergi?']],
      [['Jag jämför farten med ljusets.']]
    ]);
    T.str('c) Jämför med ljusets hastighet', padL, y - 2.0 * F, null, 0.62);
    xx = T.fracH('v', 'c', padL, y);
    xx = T.str('≈', xx + 0.1 * F, y);
    xx = T.fracH('1,5·10^7', '3,00·10^8', xx, y);
    T.str('=0,05', xx + 0.1 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    bub(T, y - adv, [
      [['Bara 5 % av ljusets hastighet.']],
      [['Den relativistiska energin blir']],
      [['bara 0,2 % större. Det märks inte.']]
    ], 1.0);
    T.str('c≈3,00·10^8 m/s (ljusets hastighet)', padL, y, null, 0.62);
    y += 1.5 * F;
    T.str('bara 5 % av c ⇒ vanlig rörelseenergi duger', padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 2.2 * F;
    bub(T, y - adv, [
      [['Varje elektron får energin ', 0], ['q_e', 1], ['·', 0], ['U', 1]],
      [['och med ', 0], ['n', 1], [' elektroner blir det ', 0]],
      [['n', 1], ['·', 0], ['q_e', 1], ['·', 0], ['U', 1], ['. Allt det blir bilens', 0]],
      [['ökning av rörelseenergi.']]
    ]);
    T.str('Elektrisk energi blir rörelseenergi', padL, y - 2.0 * F, null, 0.62);
    xx = T.str('n·q_e·U=ΔE_k ⟺ n=', padL, y);
    T.fracH('ΔE_k', 'q_e·U', xx, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Ökningen av rörelseenergin räknar']],
      [['jag på sin rad i klammern. Ton']],
      [['blir kg och farterna m/s.']]
    ], 1.1);
    var klam2 = valueBracket(acts, [
      'm=1,5 ton=1 500 kg',
      ['v_0=140 km/h=', { frac: ['140', '3,6'] }, ' m/s=38,88... m/s'],
      'v=15 Mm/s=1,5·10^7 m/s',
      ['ΔE_k=', { frac: ['m·v^2', '2'] }, '-', { frac: ['m·v_0^2', '2'] }, '=1,6874...·10^1^7 J'],
      'U=4,65·10^6 V (från b)',
      'q_e≈1,602·10^−^1^9 C (elementarladdningen)'
    ], padL, y, T.s, F, { rs: 0.7 });
    T.stepEnd();
    y = klam2.yEnd;

    y += adv + 2.4 * F;
    bub(T, y - adv, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    xx = T.fracH('1,6874...·10^1^7', '1,602·10^−^1^9·4,65·10^6', T.str('n=', padL, y), y);
    T.stepEnd();

    y += adv + 2.0 * F;
    xx = T.str('=2,265...·10^2^9', padL + 30, y);
    T.stepEnd();

    bub(T, y, [
      [['Två värdesiffror, som massan och']],
      [['sluthastigheten.']]
    ]);
    T.str('≈2,3·10^2^9', xx + 0.2 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    bub(T, y - adv, [
      [['Det blir 3,6·10^1^0 C. En riktig blixt']],
      [['för ungefär 10 C. Filmens blixt']],
      [['går alltså inte i verkligheten!']]
    ]);
    xe = T.str('Svar: 2,3·10^2^9 elektroner', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  });
})();

/* fy1-vt2017-del3-penna.js: pennlösningar till Kursprov Fy 1, VT 2017,
 * uppgift 17–21 (del 3; slås ihop med del 1 och 2 till fy1-vt2017-penna.js
 * innan publicering).
 *
 * En scen per uppgift, registrerad som "fy1-vt2017-u<nr>". FYSIKENS
 * redovisningsregler ur handskrift.js filhuvud gäller:
 *   - figuren först, i grafit, med givna värden och vektorer i BLÅTT,
 *   - kort rubrik i grafit + formeln med den sökta storheten utlöst,
 *   - mätvärdesklammern DIREKT under formeln (SI-omvandling i raden),
 *   - aldrig avrundning i mellanled, först i sista steget med ≈,
 *   - en rimlighetsbedömning i en bubbla FÖRE svarsraden,
 *   - svarsraden utan beteckning och utan deluppgiftsbokstav.
 * Siffrorna är identiska med textlösningen i fy1-vt2017-del3.js.
 *
 * Granskning: node .claude/verify-handskrift.js fy1-vt2017-u17 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket,
      nuklid = V.nuklid, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('fy1-vt2017-u' + nr, fn); }

  /* expFrac finns inte i verktygslådan: ett litet bråk i upphöjt läge
   * (exponenten t/T½ i sönderfallslagen), vågrätt streck som alltid. */
  function expFrac(T, F, numS, denS, x0, yb) {
    var sc = 0.42;
    var nw = T.adv(numS, sc), dw = T.adv(denS, sc);
    var w = Math.max(nw, dw) + 0.10 * F;
    var ybar = yb - 0.62 * F;
    T.str(numS, x0 + (w - nw) / 2, ybar - 0.10 * F, null, sc);
    T.pause(90);
    T.line([x0, ybar], [x0 + w, ybar]);
    T.pause(90);
    T.str(denS, x0 + (w - dw) / 2, ybar + 0.48 * F, null, sc);
    return x0 + w + 1.5;
  }

  /* Bråk där STRECK OCH NÄMNARE är blå: division i båda led (REGEL DIVISION
   * I BÅDA LED SKRIVS MED BLÅPENNAN). Täljaren stod redan där och är grafit. */
  function fracBla(T, F, numS, denS, x0, yb) {
    var ybar = yb - 0.34 * F;
    var nw = T.adv(numS), dw = T.adv(denS);
    var w = Math.max(nw, dw) + 0.3 * F;
    var dy = /\^/.test(denS) ? 1.26 : 1.04;
    var ny = /[gyjp]/.test(numS) ? -0.36 : -0.14;
    T.str(numS, x0 + (w - nw) / 2, ybar + ny * F);
    T.pause(130);
    T.line([x0, ybar], [x0 + w, ybar], BLUE);
    T.pause(130);
    T.str(denS, x0 + (w - dw) / 2, ybar + dy * F, BLUE);
    return x0 + w + 1.5;
  }

  /* ---- Uppgift 17: vilken boll krossar rutan? ----
   * Impulslagen F = Δp/Δt: boll A har både större rörelsemängdsändring
   * (den studsar tillbaka) och kortare kontakttid. */
  reg(17, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var adv = 1.7 * F, bw = 292, R = 16;
    var pane = 500;

    /* ---- steg 1: figuren, före och efter stöten ---- */
    T.tanke(T.figurBubble(292, [
      [['Ritar de två bollarna före och']],
      [['efter stöten mot rutan. Kast-']],
      [['riktningen räknas som positiv.']]
    ], 400));
    T.line([pane, 160], [pane, 362]);
    T.line([pane + 8, 160], [pane + 8, 362]);
    T.lbl('glasruta', pane - 30, 386);
    T.pause(160);
    T.lbl('A', padL + 10, 210);
    T.lbl('före', padL + 70, 186);
    T.lbl('efter', padL + 70, 238);
    T.circle(300, 180, R);
    T.arrow([300 + R, 180], [300 + R + 80, 180], BLUE);
    T.lbl('v_1', 300 + R + 30, 166, BLUE);
    T.pause(160);
    T.circle(pane - R - 34, 232, R);
    T.arrow([pane - 2 * R - 34, 232], [pane - 2 * R - 34 - 60, 232], BLUE);
    T.lbl('v_2', pane - 2 * R - 34 - 40, 218, BLUE);
    T.pause(200);
    T.lbl('B', padL + 10, 320);
    T.lbl('före', padL + 70, 296);
    T.lbl('efter', padL + 70, 348);
    T.circle(300, 290, R);
    T.arrow([300 + R, 290], [300 + R + 80, 290], BLUE);
    T.lbl('v_1', 300 + R + 30, 276, BLUE);
    T.pause(160);
    T.circle(pane - R - 2, 342, R);
    T.lbl('v_2=0', pane - 2 * R - 2 - 80, 348, BLUE);
    T.stepEnd();

    /* ---- steg 2: impulslagen ---- */
    y = 516;
    T.tanke(T.bubble(120, T.bubbleTop(390), bw, [
      [['Rutan går sönder om kraften blir']],
      [['stor nog. Impulslagen kopplar']],
      [['kraften till rörelsemängdens']],
      [['ändring och kontakttiden.']]
    ]));
    T.str('Impulslagen', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('F·Δt=Δp ⟺ F=', padL, y);
    T.fracH('Δp', 'Δt', xe, y);
    T.stepEnd();

    /* ---- steg 3: boll A ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Boll A studsar tillbaka, så']],
      [['hastigheten efter stöten är']],
      [['negativ. Rutan ska både stoppa']],
      [['bollen och skjuta tillbaka den.']]
    ]));
    y += adv + 2.6 * F;
    T.str('Boll A: Δp_A=m·v_2−m·v_1', padL, y);
    T.stepEnd();
    y += 2.3 * F;
    T.str('v_2<0 ⟹ |Δp_A|=m·(v_1+|v_2|)', padL + 40, y);
    T.stepEnd();

    /* ---- steg 4: boll B ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Boll B stannar mot rutan, så']],
      [['hastigheten efter är noll.']]
    ]));
    y += 2.9 * F;
    T.str('Boll B: Δp_B=m·0−m·v_1=−m·v_1', padL, y);
    T.stepEnd();
    y += 2.3 * F;
    T.str('|Δp_A|>|Δp_B|', padL + 40, y);
    T.stepEnd();

    /* ---- steg 5: kontakttiden ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Boll A har dessutom kortare']],
      [['kontakttid. Större ändring av']],
      [['rörelsemängden på kortare tid']],
      [['ger större kraft.']]
    ]));
    y += 2.9 * F;
    T.str('Δt_A<Δt_B ⟹ |F_A|>|F_B|', padL, y);
    T.stepEnd();

    /* ---- svar ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Rimligt: det är den studsande']],
      [['bollen som smäller hårdast mot']],
      [['rutan.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: Boll A krossar rutan', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 18: planera ett försök som prövar ballongmodellen ----
   * Modellen m_L = (ρ_luft − ρ_He)·V_B − m_B är en rät linje i V_B: lutningen
   * ska bli densitetsskillnaden och skärningen −m_B. */
  reg(18, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var bw = 292;

    /* ---- steg 1: modellen är en rät linje ---- */
    y = 160;
    T.str('Modellen', padL, y - 1.5 * F, null, 0.62);
    var xa = T.str('m_L=', padL, y);
    var xb = T.str('(ρ_l_u_f_t−ρ_H_e)', xa, y);
    var xc = T.str('·V_B', xb, y);
    var xd = T.str('−m_B', xc, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Samma form som en rät linje,', 0]],
      [['y', 1], [' = ', 0], ['kx', 1], [' + ', 0], ['m', 1], [' där lutningen är', 0]],
      [['densitetsskillnaden. Linjen skär']],
      [['lodräta axeln i minus ballongens']],
      [['massa.']]
    ]));
    y += 1.35 * F;
    T.lbl('lutning', (xa + xb) / 2 - T.lblW('lutning') / 2, y);
    T.lbl('skärning', (xc + xd) / 2 + 10 - T.lblW('skärning') / 2, y);
    T.stepEnd();

    /* ---- steg 2: figuren ---- */
    var bx = 470, by = 380, br = 52;
    T.tanke(T.figurBubble(292, [
      [['Ritar försöket: vågen med den']],
      [['tomma ballongen, och en fylld']],
      [['ballong som svävar med vikter.']]
    ], 530));
    T.line([padL + 20, 498], [640, 498]);
    T.rect(padL + 60, 470, padL + 190, 498);
    T.pause(140);
    (function () {                       /* tom, hopsjunken ballong */
      var tb = [], k;
      for (k = 0; k <= 16; k++) {
        var v = -0.3 + k / 16 * Math.PI * 2.1;
        tb.push([padL + 125 + 26 * Math.cos(v), 461 + 9 * Math.sin(v)]);
      }
      acts.push({ kind: 'stroke', pts: tb });
    })();
    T.lbl('våg', padL + 196, 492);
    T.pause(160);
    T.circle(bx, by, br);
    T.dot(bx, by + br + 4);
    T.line([bx, by + br + 6], [bx, 454]);
    T.rect(bx - 12, 454, bx + 12, 488);
    T.line([bx - 12, 466], [bx + 12, 466]);
    T.line([bx - 12, 477], [bx + 12, 477]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in det som ska mätas:']],
      [['ballongens massa, omkretsen och']],
      [['lasten som får den att sväva.']]
    ], 530));
    T.lbl('m_B', padL + 108, 440, BLUE);
    T.pause(140);
    var ell = [];
    for (i = 0; i <= 40; i++) {
      var a = Math.PI * i / 40;
      ell.push([bx + br * Math.cos(a), by + 9 * Math.sin(a)]);
    }
    acts.push({ kind: 'stroke', pts: ell, color: BLUE });
    T.lbl('O', bx - br - 26, by + 8, BLUE);
    T.pause(140);
    T.lbl('m_L', bx + 22, 482, BLUE);
    T.stepEnd();

    /* ---- steg 3: planen punkt för punkt ---- */
    y = 660;
    T.tanke(T.bubble(120, T.bubbleTop(530), bw, [
      [['Ballongens egen massa är det']],
      [['som skärningen ska jämföras med.']]
    ]));
    T.str('1. Väg den tomma ballongen', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('med snöret: m_B.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Ballongen blir klotformig. Ur']],
      [['omkretsen får jag radien och']],
      [['sedan volymen.']]
    ]));
    y += 2.9 * F;
    T.str('2. Fyll med helium. Mät omkretsen O', padL, y);
    T.stepEnd();
    y += 2.4 * F;
    xe = T.str('med måttbandet: r=', padL + 40, y);
    xe = T.fracH('O', '2π', xe, y);
    xe = T.str(', V_B=', xe + 0.1 * F, y);
    T.fracH('4πr^3', '3', xe, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Modellen gäller den STÖRSTA']],
      [['lasten. Den har jag när']],
      [['ballongen varken stiger eller']],
      [['sjunker.']]
    ]));
    y += 3.4 * F;
    T.str('3. Häng på vikter tills ballongen', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('svävar. Väg lasten: m_L.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['En punkt räcker inte för att']],
      [['visa att sambandet är en rät']],
      [['linje.']]
    ]));
    y += 2.9 * F;
    T.str('4. Upprepa för minst fem olika', padL, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('volymer. Skriv in V_B och m_L i', padL + 40, y);
    T.stepEnd();
    y += 2.1 * F;
    T.str('en tabell.', padL + 40, y);
    T.stepEnd();

    /* ---- steg 4: diagrammet ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Lasten som funktion av volymen,']],
      [['precis som modellen är skriven.']],
      [['En rät linje anpassas.']]
    ]));
    y += 2.4 * F;
    T.str('5. Rita m_L som funktion av V_B', padL, y);
    T.stepEnd();

    var ox = padL + 120, oy = y + 270, kx = 12, ky = 6.0;
    function P(v, m) { return [ox + v * kx, oy - m * ky]; }
    V.linjalPil(T.acts, [ox, oy + 34], [ox, oy - 34 * ky]);   /* axlar med linjal */
    V.linjalPil(T.acts, [ox, oy], [ox + 33 * kx, oy]);
    T.lbl('m_L (g)', ox + 12, oy - 34 * ky + 4);
    T.lbl('V_B (dm^3)', ox + 33 * kx - 40, oy + 0.95 * F);
    T.pause(140);
    [[8, 5.2], [12, 8.9], [16, 14.0], [20, 17.9], [24, 23.0], [28, 26.9]]
      .forEach(function (p) { T.dot(P(p[0], p[1])[0], P(p[0], p[1])[1]); T.pause(60); });
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(oy + 40), bw, [
      [['Linjen anpassas till punkterna']],
      [['och förlängs till lodräta axeln.']]
    ]));
    T.line(P(0, -4), P(30, 1.11 * 30 - 4), BLUE);
    T.pause(140);
    T.dot(P(0, -4)[0], P(0, -4)[1], BLUE);
    T.lbl('−m_B', ox - 70, oy + 0.4 * F, BLUE);
    T.stepEnd();

    /* ---- steg 5: jämförelsen ---- */
    y = oy + 4.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(oy + 40), bw, [
      [['Densiteterna slår jag upp i']],
      [['formelsamlingen. Med gram och']],
      [['kubikdecimeter får lutningen']],
      [['enheten kilogram per kubikmeter.']]
    ]));
    T.str('6. Jämför lutningen med', padL, y);
    T.stepEnd();
    y += 2.2 * F;
    T.str('ρ_l_u_f_t−ρ_H_e≈1,29−0,18=1,11 kg/m^3', padL + 40, y);
    T.stepEnd();
    y += 2.4 * F;
    T.str('och skärningen med −m_B.', padL + 40, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Stämmer linjen, lutningen och']],
      [['skärningen inom mätosäkerheten']],
      [['så stöder försöket modellen.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: Se planeringen ovan', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 19: doppvärmarens effekt ----
   * Tangentens lutning vid 30 °C ger hur snabbt vattnet förlorar energi.
   * Doppvärmaren ska ersätta just den effekten: P = c·m·ΔT/Δt. */
  reg(19, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe, i;
    var adv = 1.7 * F, bw = 292;
    var ox = padL + 76, oy = 410, kx = 2.5, ky = 6.0;
    function P(t, temp) { return [ox + t * kx, oy - temp * ky]; }
    /* mätpunkterna ur originalfiguren och avsvalningskurvan anpassad till dem
     * (samma som i figurgeneratorn gen-fy1-vt2017-3.js) */
    var pkt = [[0.2, 35.75], [12.1, 34.76], [33.2, 33.45], [61.3, 31.56],
               [85.4, 29.94], [116.9, 28.14], [146.4, 26.45]];
    function Tfit(t) { return -2.58736334 + 38.3112042 * Math.exp(-0.001893188 * t); }
    var t30 = 85.4737, k30 = -0.0616940;

    /* ---- uppgiftens diagram med mätpunkterna står färdigt från början ---- */
    V.forritad(T, function () {
    V.linjalPil(T.acts, [ox, oy], [ox + 168 * kx, oy]);       /* axlar med linjal */
    V.linjalPil(T.acts, [ox, oy], [ox, oy - 43 * ky]);
    T.lbl('t (min)', ox + 168 * kx + 12, oy + 6);
    T.lbl('T (°C)', ox + 12, oy - 43 * ky + 6);
    T.pause(140);
    [40, 80, 120, 160].forEach(function (t) {
      var s = String(t);
      T.line([P(t, 0)[0], oy - 4], [P(t, 0)[0], oy + 4]);
      T.lbl(s, P(t, 0)[0] - T.lblW(s) / 2, oy + 0.85 * F);
      T.pause(60);
    });
    [10, 20, 30, 40].forEach(function (v) {
      var s = String(v);
      T.line([ox - 4, P(0, v)[1]], [ox + 4, P(0, v)[1]]);
      T.lbl(s, ox - 12 - T.lblW(s), P(0, v)[1] + 0.16 * F);
      T.pause(60);
    });
    T.pause(140);
    pkt.forEach(function (p) { var q = P(p[0], p[1]); T.dot(q[0], q[1]); T.pause(60); });
    });

    /* ---- steg 2: jämn kurva och 30 °C ---- */
    T.tanke(T.figurBubble(292, [
      [['Drar en jämn kurva genom']],
      [['punkterna. Vid 30 °C har vattnet']],
      [['svalnat i ungefär 85 minuter.']]
    ], 480));
    var kurva = [];
    for (i = 0; i <= 80; i++) { var t = i * 2; kurva.push(P(t, Tfit(t))); }
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(160);
    T.dash(P(0, 30), P(t30, 30));
    T.circle(P(t30, 30)[0], P(t30, 30)[1], 6);
    T.stepEnd();

    /* ---- steg 3: tangenten ---- */
    T.tanke(T.figurBubble(292, [
      [['Hur fort det svalnar vid 30 °C']],
      [['är tangentens lutning där. Jag']],
      [['läser av den vid 0 och 160 min.']]
    ], 480));
    var T0 = 30 + k30 * (0 - t30), T160 = 30 + k30 * (160 - t30);
    T.line(P(0, T0), P(160, T160), BLUE);
    T.pause(160);
    T.line([ox - 5, P(0, T0)[1]], [ox + 5, P(0, T0)[1]], BLUE);
    T.lbl('35,3', ox - 12 - T.lblW('35,3'), P(0, T0)[1] + 0.16 * F, BLUE);
    T.lbl('25,4', P(160, T160)[0] + 10, P(160, T160)[1] + 0.16 * F, BLUE);
    T.stepEnd();

    /* ---- steg 4: effekten ---- */
    y = 560;
    T.tanke(T.bubble(120, T.bubbleTop(480), bw, [
      [['Doppvärmaren ska tillföra lika']],
      [['mycket energi per sekund som']],
      [['vattnet förlorar vid 30 °C.']]
    ]));
    T.str('Effekt är energi per tidsenhet', padL, y - 2.1 * F, null, 0.62);
    xe = T.str('P=', padL, y);
    xe = T.fracH('ΔE', 'Δt', xe, y);
    xe = T.str('=', xe, y);
    T.fracH('c·m·ΔT', 'Δt', xe, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv, 1.05), bw, [
      [['Temperatursänkningen ', 0], ['Δ', 0], ['T', 1], [' läser', 0]],
      [['jag av på tangenten, och 12 liter']],
      [['vatten väger 12 kg.']]
    ]));
    var klam = valueBracket(acts, [
      'c≈4 180 J/(kg·K)',
      'm=12 kg',
      'ΔT=35,3−25,4=9,9 °C=9,9 K',
      'Δt=160 min=9 600 s'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xe = T.str('P=', padL, y);
    xe = T.fracH('4 180·12·9,9', '9 600', xe, y);
    T.str('W=51,7275 W', xe + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv, 1.05), bw, [
      [['Massan 12 kg och avläsningen 9,9']],
      [['har två värdesiffror.']]
    ]));
    T.str('≈52 W', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['En liten akvarievärmare har några']],
      [['tiotal watt, så rimligt. En annan']],
      [['tangent ger 50 till 60 W.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: Cirka 52 W', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 20: viskositetens enhet ----
   * Lös ut η, sätt in enheterna och skriv om newton i grundenheter. */
  reg(20, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe;
    var adv = 1.7 * F, bw = 292;

    y = 190;
    T.str('Formeln i uppgiften', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('t=', padL, y);
    T.fracH('4L^2·η', 's·D', xe, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Jag löser ut ', 0], ['η', 1], ['. Först multiplicerar', 0]],
      [['jag båda led med ', 0], ['s', 1], ['·', 0], ['D', 1], [' så att', 0]],
      [['nämnaren försvinner.']]
    ]));
    y += adv + 3.2 * F;
    T.str('Löser ut viskositeten: multiplicerar båda led med s·D', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('t', padL, y);
    xe = T.str('·s·D', xe, y, BLUE);
    xe = T.str('=', xe + 0.1 * F, y);
    xe = T.fracH('4L^2·η', 's·D', xe, y);
    T.str('·s·D', xe, y, BLUE);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.str('t·s·D=4L^2·η', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Nu delar jag båda led med 4', 0], ['L', 1]],
      [['i kvadrat så att ', 0], ['η', 1], [' står ensam.', 0]]
    ]));
    y += adv + 3.0 * F;
    T.str('Dividerar båda led med 4L^2', padL, y - 2.2 * F, null, 0.62);
    xe = fracBla(T, F, 't·s·D', '4L^2', padL, y);
    xe = T.str('=', xe + 0.1 * F, y);
    fracBla(T, F, '4L^2·η', '4L^2', xe, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    xe = T.str('η=', padL, y);
    T.fracH('s·D·t', '4L^2', xe, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Talet 4 har ingen enhet.']],
      [['Ytspänningen ', 0], ['s', 1], [' mäts i N/m,', 0]],
      [['längderna i meter och tiden i']],
      [['sekunder.']]
    ]));
    y += adv + 3.4 * F;
    T.str('Sätter in enheterna', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('[η]=', padL, y);
    xe = T.fracH('(N/m)·m·s', 'm^2', xe, y);
    xe = T.str('=', xe + 0.1 * F, y);
    xe = T.fracH('N·s', 'm^2', xe, y);
    T.stepEnd();

    xe = T.str('⟹ A', xe + 0.3 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['De andra alternativen har kg.']],
      [['Newtons andra lag visar att en']],
      [['newton är kilogram gånger meter']],
      [['per sekundkvadrat.']]
    ]));
    y += adv + 2.6 * F;
    T.str('Newton i grundenheter', padL, y - 1.5 * F, null, 0.62);
    T.str('F=m·a ⟹ N=kg·m/s^2', padL, y);
    T.stepEnd();

    y += adv + 2.6 * F;
    xe = T.str('[η]=', padL, y);
    xe = T.fracH('N·s', 'm^2', xe, y);
    xe = T.str('=', xe + 0.1 * F, y);
    T.fracH('kg·m·s', 's^2·m^2', xe, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Förkortar bort en sekund och en']],
      [['meter.']]
    ]));
    y += adv + 2.6 * F;
    xe = T.str('=', padL + 62, y);
    xe = T.fracH('kg', 'm·s', xe, y);
    T.str('⟹ D', xe + 0.3 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['B saknar en meter i nämnaren,']],
      [['C och E saknar meter helt. Bara']],
      [['A och D stämmer.']]
    ]));
    y += adv + 2.4 * F;
    xe = T.str('Svar: A och D', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: teknetium ----
   * a) β⁻-sönderfall, b) sönderfallslagen och utspädning, c) antalet
   * sönderfall ur A = λ·N och absorberad dos D = E/m. */
  reg(21, function (cfg, F) {
    var T = physTools(F), acts = T.acts, padL = T.padL, y, xe, x;
    var adv = 1.7 * F, bw = 292;

    /* ---- a) ---- */
    y = 160;
    T.str('Mo har atomnummer 42, Tc har 43', padL, y, null, 0.62);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Atomnumret ökar med 1 och']],
      [['masstalet är kvar: en neutron']],
      [['blir en proton. Det är']],
      [['β⁻-sönderfall.']]
    ]));
    y += 2.4 * F;
    T.str('Masstal: 99=99+0   Atomnummer: 42=43−1', padL, y, null, 0.62);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Summorna stämmer på båda sidor.']],
      [['Vid β⁻-sönderfall sänds också en']],
      [['antineutrino ut, ν med streck över.']]
    ]));
    y += 2.9 * F;
    x = T.str('Svar: ', padL, y);
    x = nuklid(T, F, 99, 42, 'Mo', x, y);
    x = T.str('→', x + 0.10 * F, y);
    x = nuklid(T, F, 99, 43, 'Tc', x + 0.10 * F, y);
    x = T.str('+', x + 0.06 * F, y);
    x = nuklid(T, F, 0, '−1', 'e', x + 0.06 * F, y);
    x = T.str('+', x + 0.06 * F, y);
    var xnu = x + 0.06 * F;
    x = T.str('ν', xnu, y);
    T.line([xnu + 2, y - 0.78 * F], [x - 2, y - 0.78 * F]);
    T.underline(x, y + 0.35 * F);
    T.stepEnd();

    /* ---- b) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y, 0.75), bw, [
      [['Läkaren sprutade in 0,10 ml med']],
      [['48 MBq per ml.']]
    ]));
    y += 3.6 * F;
    T.str('Insprutad aktivitet', padL, y - 1.5 * F, null, 0.62);
    T.str('A_0=0,10 ml·48 MBq/ml=4,8 MBq', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Aktiviteten avtar under de åtta']],
      [['timmarna enligt sönderfallslagen.']]
    ]));
    y += 3.6 * F;
    T.str('Sönderfallslagen', padL, y - 1.5 * F, null, 0.62);
    xe = T.str('A=A_0·0,5', padL, y);
    expFrac(T, F, 't', 'T_1_/_2', xe, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tiden och halveringstiden har']],
      [['samma enhet, timmar. Då blir']],
      [['exponenten rätt.']]
    ]));
    var klam = valueBracket(acts, [
      'A_0=4,8 MBq=4,8·10^6 Bq',
      't=8 h',
      'T_1_/_2=6,0058 h'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.0 * F;
    xe = T.str('A=4,8·10^6·0,5', padL, y);
    expFrac(T, F, '8', '6,0058', xe, y);
    T.stepEnd();
    y += adv + 0.9 * F;
    T.str('=1 906 582,17... Bq', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Nu har aktiviteten fördelats i']],
      [['hela blodet: 386 Bq i varje ml.']],
      [['Antalet ml är A delat med 386.']]
    ]));
    y += 3.4 * F;
    T.str('Blodets volym', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('V=', padL, y);
    T.fracH('A', '386 Bq/ml', xe, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    xe = T.str('V=', padL, y);
    xe = T.fracH('1 906 582,17...', '386', xe, y);
    T.str('ml', xe + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.str('=4 939,33... ml', padL + 30, y);
    T.stepEnd();

    y += adv + 1.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv, 1.05), bw, [
      [['0,10 ml och 48 MBq/ml har två']],
      [['värdesiffror.']]
    ]));
    T.str('≈4 900 ml=4,9 liter', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['En vuxen har ungefär fem liter']],
      [['blod. Rimligt!']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: 4,9 liter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Varje sönderfall ger en foton.']],
      [['Antalet sönderfall är antalet']],
      [['kärnor vid start minus antalet']],
      [['efter åtta timmar.']]
    ]));
    y += 3.6 * F;
    T.str('Antal sönderfall', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('ΔN=N_0−N=', padL, y);
    xe = T.fracH('A_0', 'λ', xe, y);
    xe = T.str('−', xe + 0.1 * F, y);
    T.fracH('A', 'λ', xe + 0.1 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y, 1.05), bw, [
      [['Aktiviteten är antalet kärnor']],
      [['gånger sönderfallskonstanten,']],
      [['så antalet kärnor är aktiviteten']],
      [['delad med den.']]
    ]));
    y += adv + 2.6 * F;
    xe = T.str('=', padL + 62, y);
    T.fracH('A_0−A', 'λ', xe, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    klam = valueBracket(acts, [
      'A_0=4,8·10^6 Bq (beräknad ovan)',
      'A=1 906 582,17... Bq (beräknad ovan)',
      'λ=3,2059·10^−^5 s^−^1 (givet)'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xe = T.str('ΔN=', padL, y);
    T.fracH('4,8·10^6−1 906 582,17...', '3,2059·10^−^5', xe, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.str('=9,0252...·10^1^0', padL + 62, y);
    T.stepEnd();

    /* energin som kroppen tar upp */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Varje foton har 140 keV, och']],
      [['kroppen tar upp 90 % av']],
      [['energin.']]
    ]));
    y += 3.6 * F;
    T.str('Absorberad energi', padL, y - 1.5 * F, null, 0.62);
    T.str('E=0,90·ΔN·E_f', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Fotonenergin görs om från']],
      [['elektronvolt till joule med']],
      [['elementarladdningen.']]
    ]));
    klam = valueBracket(acts, [
      'ΔN=9,0252...·10^1^0 (beräknad ovan)',
      'E_f=140 keV=140·10^3·1,602·10^−^1^9 J',
      '=2,2428·10^−^1^4 J'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.str('E=0,90·9,0252...·10^1^0', padL, y);
    T.stepEnd();
    y += 2.2 * F;
    T.str('·2,2428·10^−^1^4 J', padL + 62, y);
    T.stepEnd();
    y += 2.2 * F;
    T.str('=1,8217...·10^−^3 J', padL + 62, y);
    T.stepEnd();

    /* dosen */
    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Dosen är den absorberade']],
      [['energin per kilogram kropp.']]
    ]));
    y += 3.6 * F;
    T.str('Absorberad dos', padL, y - 2.2 * F, null, 0.62);
    xe = T.str('D=', padL, y);
    T.fracH('E', 'm', xe, y);
    T.stepEnd();

    y += adv + 2.4 * F;
    klam = valueBracket(acts, [
      'E=1,8217...·10^−^3 J (beräknad ovan)',
      'm=75 kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    xe = T.str('D=', padL, y);
    xe = T.fracH('1,8217...·10^−^3', '75', xe, y);
    T.str('Gy', xe + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.6 * F;
    T.str('=2,4290...·10^−^5 Gy', padL + 30, y);
    T.stepEnd();

    y += adv + 1.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['75 kg och 90 % har två']],
      [['värdesiffror.']]
    ]));
    T.str('≈24·10^−^6 Gy=24 µGy', padL + 30, y);
    T.stepEnd();

    T.tanke(T.bubble(120, T.bubbleTop(y), bw, [
      [['Akut strålsjuka börjar vid 1 Gy.']],
      [['24 µGy är en liten dos, rimligt']],
      [['för en undersökning.']]
    ]));
    y += 2.9 * F;
    xe = T.str('Svar: 24 µGy', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });
})();

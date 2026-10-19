/* ovningar-penna/fy1-3.1.js: pennlösningar till övningarna i fy1-3.1
 * Kraft och Newtons första lag.
 *
 * En scen per övning, registrerad som "ov-fy1-3.1-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 20 N".
 * Resultanter ritas streckade (T.dashArrow), komposanter likaså.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.1-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;
  var rootSign = V.rootSign;
  /* uppgiftens figur står färdig från början, se REGEL UPPGIFTENS FIGUR
   * STÅR FÄRDIG FRÅN BÖRJAN i handskrift.js: bara grundscenen som redan
   * finns i uppgiftens figur förritas, kraftpilarna ritar pennan */
  var forritad = V.forritad;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.1-u' + nr, fn); }

  /* rottecken över en sträng; returnerar x efter roten */
  function rot(T, F, inne, x, yb) {
    var xs = rootSign(T.acts, x, yb, T.adv(inne), F);
    return T.str(inne, xs, yb) + 0.16 * F;
  }
  /* vinkelbåge med medelpunkt i (cx, cy), vinklar i grader moturs från
   * positiva x-axeln (skärmens y nedåt räknas om) */
  function bage(T, cx, cy, r, g0, g1, color) {
    var pts = [], n = 12, i;
    for (i = 0; i <= n; i++) {
      var a = (g0 + (g1 - g0) * i / n) * Math.PI / 180;
      pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts, color: color || null });
  }
  function slut(T, y) {
    return { acts: T.acts, contentW: 660, lastBase: y + 40, padL: T.padL };
  }

  /* ---- Uppgift 1: två krafter åt samma håll ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292, K = 3;           /* 3 px per newton */
    var x0 = 150, x1 = 210, yT = 140, yB = 210;

    T.tanke(T.figurBubble(292, [
      [['Ritar föremålet och de två']],
      [['krafterna åt samma håll.']],
      [['Pilarna ritas skalenligt.']]
    ], 300));
    T.rect(x0, yT, x1, yB);
    T.pause(150);
    T.arrow([x1, 162], [x1 + 35 * K, 162], BLUE);
    T.lbl('F_1=35 N', x1 + 22, 148, BLUE);
    T.pause(150);
    T.arrow([x1, 188], [x1 + 18 * K, 188], BLUE);
    T.lbl('F_2=18 N', x1 + 22, 216, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Krafterna drar åt samma håll']],
      [['och hjälps åt. Då adderas de.']]
    ]));
    T.str('Samverkande krafter: addera', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=F_1+F_2=35+18=53 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['53 N är mer än var och en av']],
      [['krafterna, eftersom de drar åt']],
      [['samma håll. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 53 N åt samma håll', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: två krafter åt motsatt håll ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292, K = 2;           /* 2 px per newton */
    var x0 = 200, x1 = 260, yT = 150, yB = 210, cy = 180;

    T.tanke(T.figurBubble(292, [
      [['Ritar föremålet och de två']],
      [['krafterna åt var sitt håll.']],
      [['Pilarna ritas skalenligt.']]
    ], 300));
    T.rect(x0, yT, x1, yB);
    T.pause(150);
    T.arrow([x1, cy], [x1 + 60 * K, cy], BLUE);
    T.lbl('F_1=60 N', x1 + 22, cy - 14, BLUE);
    T.pause(150);
    T.arrow([x0, cy], [x0 - 25 * K, cy], BLUE);
    T.lbl('F_2=25 N', x0 - 112, cy - 14, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Krafterna motverkar varandra.']],
      [['Då drar jag den mindre från']],
      [['den större.']]
    ]));
    T.str('Motverkande krafter: subtrahera', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=F_1-F_2=60-25=35 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Resultanten är mindre än den']],
      [['större kraften och pekar åt dess']],
      [['håll. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 35 N åt största kraftens håll', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: vad säger Newtons första lag? (flerval, rätt B) ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 220;

    T.tanke(T.figurBubble(292, [
      [['Ritar en puck som glider på']],
      [['helt hal is. Inget bromsar den']],
      [['i sidled.']]
    ], 300));
    T.line([90, yG], [410, yG]);
    T.hatch([410, yG], [90, yG], 13);
    T.rect(150, yG - 14, 200, yG);
    T.pause(150);
    T.arrow([200, yG - 7], [260, yG - 7], BLUE);
    T.lbl('v', 226, yG - 20, BLUE);
    T.pause(150);
    T.dash([270, yG - 14], [320, yG - 14]);            /* senare läge */
    T.dash([320, yG - 14], [320, yG]);
    T.dash([270, yG - 14], [270, yG]);
    T.arrow([320, yG - 7], [380, yG - 7], BLUE);
    T.lbl('v', 346, yG - 20, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Kraftresultanten på pucken är']],
      [['noll. Då ändras inte rörelsen:']],
      [['samma fart, samma riktning.']]
    ]));
    T.str('Newtons första lag (tröghetslagen)', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var xr = T.str('F_R=0', padL, y);
    T.str('⟹ vila eller konstant hastighet', xr + 0.2 * F, y, null, 0.62);
    T.stepEnd();

    y += adv + 0.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['De andra alternativen handlar']],
      [['om andra lagar.']]
    ]));
    T.str('A: Newtons andra lag, F_R=m·a', padL, y, null, 0.62);
    T.pause(200);
    T.str('C: Newtons tredje lag', padL, y + 1.0 * F, null, 0.62);
    T.pause(200);
    T.str('D: gravitationslagen', padL, y + 2.0 * F, null, 0.62);
    T.stepEnd();

    y += 2.0 * F + adv + 0.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bara B säger vad som händer när']],
      [['kraftresultanten är noll. Det']],
      [['stämmer med pucken på isen.']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: varmluftsballongen ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292, K = 0.012;      /* px per newton */
    var cx = 250, cy = 150, R = 46;

    T.tanke(T.figurBubble(292, [
      [['Ritar ballongen med korgen']],
      [['under.']]
    ], 310));
    T.circle(cx, cy, R);
    T.line([cx - 30, cy + 35], [cx - 12, cy + 68]);
    T.line([cx + 30, cy + 35], [cx + 12, cy + 68]);
    T.rect(cx - 14, cy + 68, cx + 14, cy + 88);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Lyftkraften uppåt och tyngd-']],
      [['kraften nedåt. Pilarna ritas']],
      [['skalenligt och på samma linje.']]
    ], 310));
    T.arrow([cx + 3, cy], [cx + 3, cy - 8400 * K], BLUE);
    T.lbl('F_l_y_f_t=8 400 N', cx + 14, cy - 8400 * K + 10, BLUE);
    T.pause(150);
    T.arrow([cx - 3, cy], [cx - 3, cy + 7900 * K], BLUE);
    T.dot(cx - 3, cy);
    T.lbl('F_G=7 900 N', cx - 172, cy + 7900 * K - 4, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Krafterna ligger på samma linje']],
      [['men pekar åt var sitt håll. Då']],
      [['tar jag skillnaden.']]
    ]));
    T.str('Motriktade krafter: subtrahera', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=F_l_y_f_t-F_G', padL, y);
    T.pause(200);
    y += adv + 0.4 * F;
    T.str('=8 400-7 900=500 N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lyftkraften är störst, så']],
      [['resultanten pekar uppåt och']],
      [['ballongen lättar. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 500 N uppåt', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: bussen bromsar (flerval, rätt D) ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 240, x0 = 140, x1 = 330, yT = 150;

    T.tanke(T.figurBubble(292, [
      [['Ritar bussen som kör åt höger']],
      [['med en passagerare i sätet.']]
    ], 310));
    T.line([80, yG], [410, yG]);
    T.hatch([410, yG], [80, yG], 13);
    T.rect(x0, yT, x1, yG - 14);
    T.circle(170, yG - 8, 9);
    T.circle(300, yG - 8, 9);
    T.pause(150);
    T.line([300, yT + 10], [322, yT + 10]);            /* vindrutan */
    T.line([322, yT + 10], [322, yT + 40]);
    T.line([300, yT + 40], [322, yT + 40]);
    T.line([300, yT + 10], [300, yT + 40]);
    T.pause(150);
    T.circle(250, yT + 22, 8);                         /* passageraren */
    T.line([250, yT + 30], [250, yT + 58]);
    T.line([250, yT + 58], [268, yT + 58]);
    T.line([240, yT + 40], [240, yT + 72]);            /* sätet */
    T.line([240, yT + 64], [268, yT + 64]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Vägen bromsar bussen bakåt.']],
      [['Den kraften verkar på bussen,']],
      [['inte på passageraren.']]
    ], 310));
    T.arrow([x1, yT + 46], [x1 + 50, yT + 46], BLUE);
    T.lbl('v', x1 + 20, yT + 34, BLUE);
    T.pause(150);
    T.arrow([x0, yG - 3], [x0 - 40, yG - 3], BLUE);
    T.lbl('F_f', x0 - 70, yG - 14, BLUE);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Ingen kraft bromsar passageraren']],
      [['förrän bältet tar emot. Då']],
      [['fortsätter hen framåt med sin']],
      [['gamla fart.']]
    ]));
    T.str('Newtons första lag för passageraren', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    var xr = T.str('F_R=0', padL, y);
    T.str('⟹ samma fart framåt', xr + 0.2 * F, y, null, 0.62);
    T.stepEnd();

    y += adv + 0.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Jag prövar de andra']],
      [['alternativen.']]
    ]));
    T.str('A: ingen kraft framåt finns', padL, y, null, 0.62);
    T.pause(200);
    T.str('B: motkraften verkar på vägen', padL, y + 1.0 * F, null, 0.62);
    T.pause(200);
    T.str('C: tyngdkraften pekar alltid nedåt', padL, y + 2.0 * F, null, 0.62);
    T.stepEnd();

    y += 2.0 * F + adv + 0.6 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Det är bussen som bromsar under']],
      [['passageraren. Ingen kraft kastar']],
      [['hen framåt. Därför D.']]
    ]));
    T.underline(T.str('Svar: Alternativ D', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: två vinkelräta krafter, Pythagoras sats ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292, K = 6;           /* 6 px per newton */
    var ox = 200, oy = 220;

    T.tanke(T.figurBubble(292, [
      [['Jag ritar de två krafterna,']],
      [['vinkelräta mot varandra']],
      [['och skalenliga.']]
    ], 300));
    forritad(T, function () {
      T.rect(ox - 14, oy - 14, ox + 14, oy + 14);
    });
    T.dot(ox, oy);
    T.pause(150);
    T.arrow([ox, oy], [ox + 12 * K, oy], BLUE);
    T.lbl('F_1=12 N', ox + 24, oy + 36, BLUE);
    T.pause(150);
    T.arrow([ox, oy], [ox, oy - 16 * K], BLUE);
    T.lbl('F_2=16 N', ox - 104, oy - 60, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Resultanten är diagonalen i']],
      [['rektangeln. Den blir hypotenusan']],
      [['i en rätvinklig krafttriangel.']]
    ], 300));
    T.dash([ox, oy - 16 * K], [ox + 12 * K, oy - 16 * K]);
    T.dash([ox + 12 * K, oy], [ox + 12 * K, oy - 16 * K]);
    T.pause(150);
    T.dashArrow([ox, oy], [ox + 12 * K, oy - 16 * K], BLUE);
    T.lbl('F_R', ox + 12 * K + 10, oy - 16 * K + 8, BLUE);
    T.stepEnd();

    var y = 410;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Kateterna är de två krafterna.']],
      [['Pythagoras sats ger']],
      [['hypotenusan.']]
    ]));
    T.str('Vinkelräta krafter: Pythagoras sats', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xc = T.str('F_R^2=F_1^2+F_2^2⟺F_R=', padL, y);
    rot(T, F, 'F_1^2+F_2^2', xc, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var klam = valueBracket(T.acts, ['F_1=12 N', 'F_2=16 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var x = T.str('F_R=', padL, y);
    x = rot(T, F, '12^2+16^2', x, y);
    x = T.str('=', x, y);
    rot(T, F, '144+256', x, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    x = T.str('=', padL, y);
    x = rot(T, F, '400', x, y);
    T.str('=20 N', x, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['20 N är mer än den största']],
      [['kraften men mindre än summan']],
      [['28 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 20 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: den vågräta komposanten av 80 N i 30° ---- */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var ox = 150, oy = 250, LL = 210, v = 30 * Math.PI / 180;
    var tipX = ox + LL * Math.cos(v), tipY = oy - LL * Math.sin(v);

    T.tanke(T.figurBubble(292, [
      [['Ritar repet som drar i lådan']],
      [['med 80 N, 30° över vågrätt.']]
    ], 310));
    forritad(T, function () {
      T.rect(ox - 28, oy - 14, ox, oy + 14);
    });
    T.arrow([ox, oy], [tipX, tipY], BLUE);
    T.lbl('F=80 N', tipX - 96, tipY - 6, BLUE);
    T.pause(150);
    bage(T, ox, oy, 60, 0, 30);
    T.lbl('30°', ox + 68, oy - 10, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Den vågräta komposanten är']],
      [['triangelns vågräta sida, den']],
      [['närliggande kateten till 30°.']]
    ], 310));
    T.dash([tipX, tipY], [tipX, oy]);
    T.pause(150);
    T.dashArrow([ox, oy], [tipX, oy], BLUE);
    T.lbl('F_x', (ox + tipX) / 2 - 10, oy + 34, BLUE);
    T.line([tipX - 14, oy], [tipX - 14, oy - 14]);
    T.line([tipX - 14, oy - 14], [tipX, oy - 14]);
    T.stepEnd();

    var y = 420;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Jag känner hypotenusan och']],
      [['söker närliggande katet. Då']],
      [['använder jag cosinus.']]
    ]));
    T.str('Komposant med trigonometri: cosinus', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('närliggande katet', 'hypotenusan', T.str('cos α=', padL, y), y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Närliggande katet är kompo-']],
      [['santen och hypotenusan är']],
      [['kraften 80 N.']]
    ]));
    var xa = T.fracH('F_x', '80', T.str('cos 30°=', padL, y), y);
    T.str('⟺F_x=80·cos 30°', xa + 0.12 * F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu räknar jag ut värdet.']]
    ]));
    var xIns = T.str('F_x=80·cos 30°=69,282... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Först nu avrundar jag. Kraften']],
      [['och vinkeln har två']],
      [['värdesiffror.']]
    ]));
    T.str('≈69 N', xIns + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Repet lutar lite, så det mesta']],
      [['av kraften drar framåt: 69 N av']],
      [['80 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 69 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 8: två snöskotrar drar släden, ±25° ----
   * Sedd uppifrån. Komposanterna i sidled tar ut varandra, komposanterna
   * längs färdriktningen adderas. */
  reg(8, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292, L = 150;
    var ox = 150, oy = 200, v = 25 * Math.PI / 180;
    var t1 = [ox + L * Math.cos(v), oy - L * Math.sin(v)];
    var t2 = [ox + L * Math.cos(v), oy + L * Math.sin(v)];

    T.tanke(T.figurBubble(292, [
      [['Släden är sedd uppifrån. Jag']],
      [['ritar färdriktningen åt höger.']]
    ], 320));
    forritad(T, function () {
      T.rect(ox - 70, oy - 20, ox, oy + 20);
    });
    T.dash([ox, oy], [ox + 210, oy]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Repen drar 25° åt var sitt håll,']],
      [['lika hårt. Pilarna blir lika']],
      [['långa.']]
    ], 320));
    T.arrow([ox, oy], t1, BLUE);
    T.lbl('F_1=900 N', t1[0] + 8, t1[1] + 6, BLUE);
    T.pause(150);
    T.arrow([ox, oy], t2, BLUE);
    T.lbl('F_2=900 N', t2[0] + 8, t2[1] + 6, BLUE);
    T.pause(150);
    bage(T, ox, oy, 72, 0, 25);
    T.lbl('25°', ox + 80, oy - 12, BLUE);
    bage(T, ox, oy, 72, -25, 0);
    T.lbl('25°', ox + 80, oy + 28, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Delar upp krafterna. I sidled']],
      [['är komposanterna lika stora och']],
      [['motriktade, så de tar ut']],
      [['varandra.']]
    ]));
    T.str('Sidled: komposanterna tar ut varandra', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1·sin 25°-F_2·sin 25°=0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Framåt pekar båda komposanterna']],
      [['åt samma håll. De adderas och']],
      [['blir hela resultanten.']]
    ]));
    T.str('Framåt: komposanterna adderas', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=F_1·cos 25°+F_2·cos 25°', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    var klam = valueBracket(T.acts, ['F_1=900 N', 'F_2=900 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('F_R=900·cos 25°+900·cos 25°', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    var xIns = T.str('=1 631,35... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Först nu avrundar jag. Vinkeln']],
      [['har två värdesiffror, och jag']],
      [['skriver svaret i kilonewton.']]
    ]));
    T.str('≈1,6 kN', xIns + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Repen drar nästan rakt framåt,']],
      [['så resultanten blir nästan']],
      [['900 N plus 900 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,6 kN framåt', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 9: gräsklipparen, komposanten mot marken ---- */
  reg(9, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 262, ax = 330, ay = 226;                 /* handtagets fäste */
    var c = Math.cos(40 * Math.PI / 180), s = Math.sin(40 * Math.PI / 180);
    var LF = 110;                                     /* kraftpilens längd */
    var tip = [ax + 14 * s, ay - 14 * c];             /* pilen ovanför handtaget */
    var tail = [tip[0] - LF * c, tip[1] - LF * s];
    /* utlyft krafttriangel till vänster om gräsklipparen */
    var t0 = [50, 140], t1 = [50 + 150 * c, 140 + 150 * s];

    T.tanke(T.figurBubble(292, [
      [['Ritar gräsklipparen och']],
      [['handtaget som lutar 40° mot']],
      [['marken.']]
    ], 310));
    T.line([40, yG], [430, yG]);
    T.hatch([430, yG], [40, yG], 16);
    T.rect(ax, 222, ax + 80, yG - 16);
    T.circle(ax + 14, yG - 9, 8);
    T.circle(ax + 66, yG - 9, 8);
    T.pause(150);
    T.line([ax, ay], [ax - 150 * c, ay - 150 * s]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Kraften verkar längs handtaget,']],
      [['snett nedåt och framåt.']]
    ], 310));
    T.arrow(tail, tip, BLUE);
    T.lbl('F=90 N', tail[0] + 8, tail[1] - 12, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Lyfter ut kraften. Komposanten']],
      [['mot marken är den lodräta sidan,']],
      [['motstående katet till 40°.']]
    ], 310));
    T.arrow(t0, t1, BLUE);
    T.lbl('F', 70, 202, BLUE);
    T.pause(150);
    T.dash(t0, [t1[0] + 18, t0[1]]);
    bage(T, t0[0], t0[1], 52, -40, 0);
    T.lbl('40°', t0[0] + 60, t0[1] + 24, BLUE);
    T.pause(150);
    T.dashArrow([t1[0], t0[1]], t1, BLUE);
    T.lbl('F_y', t1[0] + 10, (t0[1] + t1[1]) / 2 + 8, BLUE);
    T.line([t1[0] - 12, t0[1]], [t1[0] - 12, t0[1] + 12]);
    T.line([t1[0] - 12, t0[1] + 12], [t1[0], t0[1] + 12]);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Jag känner hypotenusan och']],
      [['söker motstående katet. Då']],
      [['använder jag sinus.']]
    ]));
    T.str('Komposant med trigonometri: sinus', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('motstående katet', 'hypotenusan', T.str('sin α=', padL, y), y);
    T.stepEnd();

    y += adv + 2.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Motstående katet är kompo-']],
      [['santen och hypotenusan är']],
      [['kraften 90 N.']]
    ]));
    var xa = T.fracH('F_y', '90', T.str('sin 40°=', padL, y), y);
    T.str('⟺F_y=90·sin 40°', xa + 0.12 * F, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu räknar jag ut värdet.']]
    ]));
    var xIns = T.str('F_y=90·sin 40°=57,850... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Först nu avrundar jag. Kraften']],
      [['och vinkeln har två']],
      [['värdesiffror.']]
    ]));
    T.str('≈58 N', xIns + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Handtaget är ganska brant, så']],
      [['en stor del av kraften trycker']],
      [['nedåt: 58 N av 90 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 58 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 10: tre krafter i jämvikt, F_3 sökt ---- */
  reg(10, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292, K = 2;           /* 2 px per newton */
    var ox = 230, oy = 220;
    var r1 = [ox + 50 * K, oy], r2 = [ox, oy - 30 * K];
    var r12 = [ox + 50 * K, oy - 30 * K], r3 = [ox - 50 * K, oy + 30 * K];

    T.tanke(T.figurBubble(292, [
      [['Lådan är sedd uppifrån. Jag']],
      [['ritar de två kända krafterna']],
      [['skalenligt.']],
      [['Norr är uppåt.']]
    ], 320));
    forritad(T, function () {
      T.arrow([90, 200], [90, 156]);                   /* väderstreck */
      T.lbl('N', 84, 146);
      T.rect(ox - 14, oy - 14, ox + 14, oy + 14);
    });
    T.dot(ox, oy);
    T.pause(150);
    T.arrow([ox, oy], r1, BLUE);
    T.lbl('F_1=50 N', ox + 28, oy + 34, BLUE);
    T.pause(150);
    T.arrow([ox, oy], r2, BLUE);
    T.lbl('F_2=30 N', ox - 118, oy - 44, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['F', 1], ['1', 0], [' och ', 0], ['F', 1], ['2', 0],
       [' ger tillsammans en', 0]],
      [['resultant. Den är diagonalen i']],
      [['rektangeln.']]
    ], 320));
    T.dash(r2, r12);
    T.dash(r1, r12);
    T.pause(150);
    T.dashArrow([ox, oy], r12, BLUE);
    T.lbl('F_1_2', r12[0] + 10, r12[1] + 4, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Lådan står still. Då måste']],
      [['den tredje kraften vara lika']],
      [['stor och rakt motriktad.']]
    ], 320));
    T.arrow([ox, oy], r3, BLUE);
    T.lbl('F_3', r3[0] - 40, r3[1] + 4, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['F', 1], ['3', 0], [' är lika stor som resultanten', 0]],
      [['av de andra två. Den räknar jag']],
      [['ut med Pythagoras sats.']]
    ]));
    T.str('Kraftjämvikt: F_3 tar ut F_1 och F_2', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xc = T.str('F_3=F_1_2=', padL, y);
    rot(T, F, 'F_1^2+F_2^2', xc, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    var klam = valueBracket(T.acts, ['F_1=50 N', 'F_2=30 N'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var x = T.str('F_3=', padL, y);
    x = rot(T, F, '50^2+30^2', x, y);
    x = T.str('=', x, y);
    x = rot(T, F, '2 500+900', x, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    x = T.str('=', padL, y);
    x = rot(T, F, '3 400', x, y);
    var xIns = T.str('=58,309... N', x, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y), bw, [
      [['Först nu avrundar jag. Båda']],
      [['krafterna har två']],
      [['värdesiffror.']]
    ]));
    T.str('≈58 N', xIns + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['58 N är mer än 50 N men mindre']],
      [['än 50 N plus 30 N. Kraften pekar']],
      [['bort från öster och norr, alltså']],
      [['mot sydväst. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 58 N mot sydväst', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 11: repet mellan bilen och trädet ----
   * Vinkeln är överdriven i figuren (som i uppgiften). Pilarna vid
   * mittpunkten är ritade så att de balanserar för den RITADE vinkeln:
   * F = 2 · F_S · sin(ritad vinkel). */
  reg(11, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yR = 180, xT = 86, xB = 420, xM = 253, yM = 250;
    var dx = xM - xT, dy = yM - yR, Ld = Math.hypot(dx, dy);
    var ux = dx / Ld, uy = dy / Ld;                   /* mot bilen: (ux, -uy) */
    var LS = 90, LF = 2 * LS * uy;                    /* jämvikt i figuren */

    /* trädet, bilen, repet och vinkeln står i uppgiftens figur: de står
     * färdiga från början (repets knyck är överdrivet, som i uppgiften) */
    forritad(T, function () {
      T.circle(xT - 18, yR, 18);
      T.rect(xB, 158, xB + 56, 202);
      T.dash([xT, yR], [xB, yR]);
      T.line([xT, yR], [xM, yM]);
      T.line([xM, yM], [xB, yR]);
      bage(T, xT, yR, 50, -Math.atan2(dy, dx) * 180 / Math.PI, 0);
      T.lbl('5,0°', xT + 60, yR + 20, BLUE, 0.45);
    });

    T.tanke(T.figurBubble(292, [
      [['Tre krafter verkar på repets']],
      [['mittpunkt: repet drar åt var sitt']],
      [['håll och föraren trycker.']]
    ], 360));
    T.arrow([xM, yM], [xM, yM + LF], BLUE);
    T.lbl('F=300 N', xM + 12, yM + LF - 2, BLUE);
    T.pause(150);
    T.arrow([xM, yM], [xM - LS * ux, yM - LS * uy], BLUE);
    T.lbl('F_S', xM - LS * ux, yM - LS * uy + 32, BLUE);
    T.pause(150);
    T.arrow([xM, yM], [xM + LS * ux, yM - LS * uy], BLUE);
    T.lbl('F_S', xM + LS * ux - 14, yM - LS * uy + 32, BLUE);
    T.dot(xM, yM);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Längs repet tar komposanterna ut']],
      [['varandra. Vinkelrätt mot repet']],
      [['ska de två komposanterna']],
      [['tillsammans ta ut trycket.']]
    ]));
    T.str('Jämvikt i tryckkraftens riktning', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('2·F_S·sin 5,0°=F⟺F_S=', padL, y);
    T.fracH('F', '2·sin 5,0°', xa, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    var klam = valueBracket(T.acts, ['F=300 N'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdet ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=1 721,05... N',
          T.fracH('300', '2·sin 5,0°', T.str('F_S=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y, 1.05), bw, [
      [['Först nu avrundar jag till två']],
      [['värdesiffror, i kilonewton.']]
    ]));
    if (xIns + T.adv('≈1,7 kN') < HK.PAPER_W - 44) {
      T.str('≈1,7 kN', xIns + 0.15 * F, y);
    } else {
      y += 2.4 * F;
      T.str('≈1,7 kN', padL, y);
    }
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Repet drar nästan sex gånger så']],
      [['hårt som föraren trycker. Därför']],
      [['fungerar knepet. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,7 kN', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

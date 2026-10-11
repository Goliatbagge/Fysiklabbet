/* ovningar-penna/fy1-3.3.js: pennlösningar till övningarna i fy1-3.3
 * Newtons tredje lag.
 *
 * En scen per övning, registrerad som "ov-fy1-3.3-u<nr>" och kopplad till
 * övningen med fältet penna i data/ovningar.js (numret är övningens plats
 * i listan, 1 = första). Katalogen laddar filen först när en övning i
 * avsnittet visar sitt lösningsförslag (se Ovning i katalog.html).
 *
 * FYSIKENS redovisningsregler ur handskrift.js filhuvud gäller:
 *   - figuren först, i grafit, med givna värden och vektorer i BLÅTT,
 *   - kort rubrik i grafit + formeln med den sökta storheten utlöst,
 *   - mätvärdesklammern DIREKT under formeln (deluträkningar i raden,
 *     med enhet vid varje tal),
 *   - insättningsraden utan ringar (klammern är gesten),
 *   - aldrig avrundning i mellanled, först i sista steget med ≈,
 *   - en rimlighetsbedömning i en bubbla FÖRE svarsraden,
 *   - svarsraden utan beteckning: "Svar: 1,6 m/s^2".
 * Fem av övningarna är resonemangsuppgifter med flerval: figuren visar
 * kraftparet, raderna resonerar och svarsraden anger alternativet.
 * Kraft och motkraft ritas alltid lika långa och från var sin kropp.
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.3-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.3-u' + nr, fn); }

  /* avrundningen fortsätter på insättningsraden så långt arket räcker,
   * annars på en ny rad som börjar med ≈ (pilzonen, se handskrift.js) */
  function avr(T, F, xIns, y, txt) {
    if (xIns + T.adv(txt) < HK.PAPER_W - 44) { T.str(txt, xIns, y); return y; }
    y += 2.4 * F;
    T.str(txt, T.padL + 24, y);
    return y;
  }
  function slut(T, y) {
    return { acts: T.acts, contentW: 660, lastBase: y + 40, padL: T.padL };
  }
  /* streckgubbe som står upprätt: fötterna på yF, ansiktet åt höger (d=1)
   * eller vänster (d=-1). Returnerar axelns och höftens lägen. */
  function gubbe(T, x, yF, h, d) {
    var hip = [x, yF - 0.42 * h], sh = [x, yF - 0.78 * h];
    T.line([x - 0.14 * h, yF], hip);
    T.line([x + 0.14 * h, yF], hip);
    T.line(hip, sh);
    T.circle(x, yF - 0.9 * h, 0.12 * h);
    return { hip: hip, sh: sh, d: d };
  }

  /* ---- Uppgift 1: vad Newtons tredje lag säger ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 250, xm = 240;

    T.tanke(T.figurBubble(292, [
      [['Ritar två lådor, A och B, som']],
      [['trycker mot varandra.']]
    ], 300));
    T.line([110, yG], [410, yG]);
    T.hatch([410, yG], [110, yG], 12);
    T.rect(160, yG - 80, xm, yG);
    T.rect(xm, yG - 80, 320, yG);
    T.lbl('A', 194, yG - 58);
    T.lbl('B', 274, yG - 58);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['A trycker på B åt höger. Då']],
      [['trycker B tillbaka på A åt']],
      [['vänster, precis lika hårt.']]
    ], 300));
    T.arrow([xm, yG - 45], [xm + 100, yG - 45], BLUE);
    T.lbl('A på B', xm + 108, yG - 39, BLUE);
    T.pause(150);
    T.arrow([xm, yG - 25], [xm - 100, yG - 25], BLUE);
    T.lbl('B på A', xm - 106 - T.lblW('B på A'), yG - 19, BLUE);
    T.stepEnd();

    var y = 400;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Lagen handlar om två föremål']],
      [['som påverkar varandra.']]
    ]));
    T.str('Newtons tredje lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_A_ _p_å_ _B=-F_B_ _p_å_ _A', padL, y);
    T.stepEnd();

    y += adv + 1.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Minustecknet betyder motsatt']],
      [['riktning. Krafterna verkar på']],
      [['två OLIKA föremål.']]
    ]));
    T.str('C) A på B och B på A: lika stora, motriktade',
          padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Alternativ B låter likt, men där']],
      [['verkar båda krafterna på samma']],
      [['föremål.']]
    ]));
    T.str('B) samma föremål: jämviktskrafter', padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.str('A) F=m·a: Newtons andra lag', padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.str('D) vila när F_R=0: Newtons första lag', padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bara C har två olika föremål']],
      [['som påverkar varandra.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ C', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: tyngdkraft och normalkraft är jämviktskrafter ----
   * F_N och F_G ritas på samma verkningslinje, skaften intill varandra
   * (Στ = 0), lika långa. */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yB = 230, bx0 = 225, bx1 = 295, h = 50;
    var cx = (bx0 + bx1) / 2, cy = yB - h / 2, L = 70;

    T.tanke(T.figurBubble(292, [
      [['Ritar bordet och vikten som']],
      [['står på det.']]
    ], 330));
    T.rect(140, yB, 380, yB + 10);
    T.line([160, yB + 10], [160, yB + 72]);
    T.line([360, yB + 10], [360, yB + 72]);
    T.pause(150);
    T.rect(bx0, yB - h, bx1, yB);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Två krafter verkar på vikten:']],
      [['tyngdkraften nedåt och normal-']],
      [['kraften uppåt. Lika stora.']]
    ], 330));
    T.arrow([cx + 3, yB], [cx + 3, yB - L], BLUE);
    T.lbl('F_N', cx + 12, yB - L + 8, BLUE);
    T.pause(150);
    T.dot(cx - 3, cy, BLUE);
    T.arrow([cx - 3, cy], [cx - 3, cy + L], BLUE);
    T.lbl('F_G', cx + 8, cy + L + 2, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Jag frågar för varje kraft: vem']],
      [['påverkar vem?']]
    ]));
    T.str('Vem påverkar vem?', padL, y, null, 0.62);
    T.pause(300);
    y += 1.6 * F;
    T.str('F_G: jorden drar vikten nedåt', padL, y, null, 0.62);
    T.stepEnd();
    y += 1.4 * F;
    T.str('F_N: bordet trycker vikten uppåt', padL, y, null, 0.62);
    T.stepEnd();

    y += 1.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Båda krafterna verkar på samma']],
      [['föremål, vikten. Då kan de inte']],
      [['vara kraft och motkraft.']]
    ]));
    T.str('samma föremål ⇒ jämviktskrafter', padL, y, null, 0.62);
    T.stepEnd();

    y += 1.6 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Motkraften verkar alltid på det']],
      [['andra föremålet, och är av samma']],
      [['sort.']]
    ]));
    T.str('motkraft till F_G: vikten drar jorden uppåt',
          padL, y, null, 0.62);
    T.stepEnd();
    y += 1.4 * F;
    T.str('motkraft till F_N: vikten trycker bordet nedåt',
          padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['De är lika stora bara för att']],
      [['vikten är i jämvikt. Rimligt,']],
      [['och därför stämmer inte A.']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: vattnets motkraft driver simmaren ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yW = 200;

    T.tanke(T.figurBubble(292, [
      [['Ritar simmaren i vattnet. Hon']],
      [['simmar åt höger och drar']],
      [['handen bakåt.']]
    ], 320));
    (function () {                       /* vattenytan, bruten vid huvudet */
      var pts = [], i;
      for (i = 0; i <= 40; i++) {
        var x = 90 + i * 8;
        if (Math.abs(x - 335) < 14) {
          if (pts.length > 1) T.acts.push({ kind: 'stroke', pts: pts });
          pts = [];
          continue;
        }
        pts.push([x, yW - 16 + 3 * Math.sin(x / 14)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts });
    })();
    T.pause(150);
    T.circle(335, yW - 8, 11);                          /* huvudet */
    (function () {                                       /* kroppen */
      var pts = [], i;
      for (i = 0; i <= 24; i++) {
        var u = i / 24 * Math.PI * 2;
        pts.push([258 + 66 * Math.cos(u), yW + 2 + 8 * Math.sin(u)]);
      }
      T.acts.push({ kind: 'stroke', pts: pts });
    })();
    T.line([193, yW], [140, yW - 6]);                    /* benen */
    T.line([193, yW + 4], [142, yW + 10]);
    T.line([312, yW + 6], [282, yW + 26]);               /* armen */
    T.line([282, yW + 26], [254, yW + 40]);
    T.circle(249, yW + 42, 5);                           /* handen */
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Handen trycker vattnet bakåt.']],
      [['Vattnet trycker handen framåt,']],
      [['precis lika hårt.']]
    ], 320));
    T.arrow([244, yW + 40], [184, yW + 40], BLUE);
    T.lbl('på vattnet', 184 - 6 - T.lblW('på vattnet'), yW + 46, BLUE);
    T.pause(150);
    T.arrow([254, yW + 50], [314, yW + 50], BLUE);
    T.lbl('på handen', 320, yW + 56, BLUE);
    T.stepEnd();

    var y = 430;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Bara en kraft som verkar PÅ']],
      [['simmaren kan driva henne framåt.']]
    ]));
    T.str('Newtons tredje lag', padL, y, null, 0.62);
    T.pause(300);
    y += 1.6 * F;
    T.str('kraft: handen trycker vattnet bakåt', padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Motkraften är lika stor, motsatt']],
      [['riktad och verkar på handen.']]
    ]));
    T.str('motkraft: vattnet trycker handen framåt',
          padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Handen sitter fast i simmaren,']],
      [['så det är motkraften som för']],
      [['henne framåt.']]
    ]));
    T.str('kraften på simmaren: vattnet på handen ⇒ D',
          padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Muskelkraften är en inre kraft,']],
      [['och A verkar på vattnet. Ingen']],
      [['av dem för simmaren framåt.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ D', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: myggan och lastbilen ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yV = 262;
    /* vindrutan går från (260,150) till (300,200); myggan på utsidan */
    var wl = Math.hypot(40, 50), nx = 50 / wl, ny = -40 / wl;
    var px = 260 + 40 * 0.4, py = 150 + 50 * 0.4;
    var mx = px + 5 * nx, my = py + 5 * ny;
    var yk = py + 8, xk = 260 + 40 * (yk - 150) / 50;   /* på vindrutan */

    T.tanke(T.figurBubble(292, [
      [['Ritar lastbilens hytt och']],
      [['myggan mot vindrutan. Bilen']],
      [['kör åt höger.']]
    ], 320));
    T.line([90, yV], [410, yV]);
    T.hatch([410, yV], [90, yV], 13);
    T.line([150, 150], [260, 150]);
    T.line([260, 150], [300, 200]);
    T.line([300, 200], [300, 250]);
    T.line([300, 250], [150, 250]);
    T.line([150, 250], [150, 150]);
    T.circle(190, 252, 10);
    T.circle(268, 252, 10);
    T.pause(150);
    T.circle(mx, my, 3.5);                               /* myggan */
    T.line([mx - 1, my - 3], [mx + 4, my - 10]);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Lastbilen trycker myggan framåt.']],
      [['Myggan trycker vindrutan bakåt,']],
      [['precis lika hårt.']]
    ], 320));
    T.arrow([mx + 4, my], [mx + 64, my], BLUE);
    T.lbl('på myggan', mx + 70, my + 6, BLUE);
    T.pause(150);
    T.arrow([xk, yk], [xk - 60, yk], BLUE);
    T.lbl('på lastbilen', 168, yk + 30, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Newtons tredje lag gäller alltid,']],
      [['hur olika föremålen än är.']]
    ]));
    T.str('Newtons tredje lag', padL, y, null, 0.62);
    T.pause(300);
    y += 1.6 * F;
    T.str('lastbilen på myggan = myggan på lastbilen',
          padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Det som skiljer är verkan.']],
      [['Accelerationen beror på massan.']]
    ]));
    T.str('Newtons andra lag', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F', 'm', T.str('a=', padL, y), y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Samma kraft på en liten massa ger']],
      [['en enorm acceleration, på en stor']],
      [['massa nästan ingen.']]
    ]));
    T.str('myggan: liten m ⇒ stor a', padL, y, null, 0.62);
    T.stepEnd();
    y += 1.4 * F;
    T.str('lastbilen: stor m ⇒ omätbart liten a', padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Myggan krossas och lastbilen']],
      [['märker inget, trots lika stora']],
      [['krafter. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ D', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: dragkampen avgörs av friktionen ----
   * Lag A drar lag B mot sig (åt vänster). Spännkraften är lika stor vid
   * båda lagen; F_fA är större än F_S och F_fB mindre, så båda lagen
   * accelererar åt vänster. */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 255, yR = 195, hA = 170, hB = 360;           /* händerna */
    /* lagen lutar bakåt bort från repet; B är A speglat kring x = 265 */
    function lag(m) {
      var X = function (x) { return m ? 530 - x : x; };
      T.line([X(131), yG], [X(133), yG - 42]);           /* bakre benet */
      T.line([X(155), yG], [X(133), yG - 42]);           /* främre benet */
      T.line([X(133), yG - 42], [X(113), yG - 80]);      /* kroppen */
      T.circle(X(106), yG - 92, 10);
      T.line([X(113), yG - 78], [m ? hB : hA, yR]);      /* armarna */
    }

    T.tanke(T.figurBubble(292, [
      [['Ritar dragkampen. Lag A till']],
      [['vänster vinner och drar lag B']],
      [['mot sig.']]
    ], 330));
    T.line([60, yG], [450, yG]);
    T.hatch([450, yG], [60, yG], 16);
    T.line([hA, yR], [hB, yR]);                           /* repet */
    T.pause(150);
    lag(false);
    T.lbl('lag A', 110, yG + 34);
    T.pause(150);
    lag(true);
    T.lbl('lag B', 370, yG + 34);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Repet drar lika hårt i båda']],
      [['lagen. Pilarna är lika långa.']]
    ], 330));
    T.arrow([hA, yR - 12], [hA + 50, yR - 12], BLUE);
    T.lbl('F_S', hA + 56, yR - 6, BLUE);
    T.pause(150);
    T.arrow([hB, yR - 12], [hB - 50, yR - 12], BLUE);
    T.lbl('F_S', hB - 56 - T.lblW('F_S'), yR - 6, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Marken håller emot med friktion.']],
      [['Mot lag A är den större.']]
    ], 330));
    T.arrow([143, yG - 3], [73, yG - 3], BLUE);
    T.lbl('F_f_A', 67 - T.lblW('F_f_A'), yG - 8, BLUE);
    T.pause(150);
    T.arrow([387, yG - 3], [417, yG - 3], BLUE);
    T.lbl('F_f_B', 423, yG - 8, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Drog repet hårdare åt ena hållet']],
      [['skulle repet självt accelerera.']]
    ]));
    T.str('Spännkraften i repet', padL, y, null, 0.62);
    T.pause(300);
    y += 1.6 * F;
    T.str('samma spännkraft F_S vid båda lagen', padL, y, null, 0.62);
    T.stepEnd();

    y += 1.5 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - 0.6 * F), bw, [
      [['Den enda andra kraften i sidled']],
      [['är friktionen mot marken. Den']],
      [['avgör.']]
    ]));
    T.str('F_f_A>F_f_B ⇒ lag A vinner', padL, y, null, 0.62);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tunga lag med bra skor brukar']],
      [['vinna dragkamper. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: Astrid puttar Bo på isen ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var yG = 255, xA = 200, xB = 290, L = 54;

    T.tanke(T.figurBubble(292, [
      [['Ritar Astrid och Bo på isen.']],
      [['Astrid puttar Bo åt höger.']]
    ], 320));
    T.line([90, yG], [410, yG]);
    T.line([110, yG + 8], [132, yG + 8]);
    T.line([250, yG + 8], [272, yG + 8]);
    T.line([360, yG + 8], [382, yG + 8]);
    T.pause(150);
    var a = gubbe(T, xA, yG, 84, 1);
    T.line([a.sh[0], a.sh[1] + 4], [xB - 1, a.sh[1] + 6]);   /* armarna */
    var b = gubbe(T, xB, yG, 100, -1);
    T.stepEnd();

    var yk = a.sh[1] + 6;
    T.tanke(T.figurBubble(292, [
      [['Astrid trycker på Bo, och Bo']],
      [['trycker tillbaka på Astrid lika']],
      [['hårt. Pilarna är lika långa.']]
    ], 320));
    T.arrow([xB, yk - 6], [xB + L, yk - 6], BLUE);
    T.lbl('F', xB + L + 6, yk, BLUE);
    T.pause(150);
    T.arrow([xB, yk + 10], [xB - L, yk + 10], BLUE);
    T.lbl('F', xB - L - 6 - T.lblW('F'), yk + 22, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massorna och Bos']],
      [['acceleration. Astrids är det']],
      [['jag söker.']]
    ], 320));
    T.arrow([xB + 30, yG - 30], [xB + 70, yG - 30], BLUE);
    T.lbl('a_B_o=1,2 m/s^2', xB + 76, yG - 24, BLUE);
    T.pause(150);
    T.arrow([xA - 30, yG - 30], [xA - 70, yG - 30], BLUE);
    T.lbl('a_A_s_t_r_i_d', xA - 76 - T.lblW('a_A_s_t_r_i_d'), yG - 24, BLUE);
    T.pause(150);
    T.lbl('m_A_s_t_r_i_d=55 kg', 96, yG + 34, BLUE);
    T.lbl('m_B_o=75 kg', 290, yG + 34, BLUE);
    T.stepEnd();

    var y = 440;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Astrids acceleration ger Newtons']],
      [['andra lag: kraften på henne delat']],
      [['med hennes massa.']]
    ]));
    T.str('Newtons andra lag på Astrid', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('F', 'm_A_s_t_r_i_d', T.str('a_A_s_t_r_i_d=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Kraften på Astrid är lika stor som']],
      [['kraften på Bo, Newtons tredje lag.']],
      [['Den ger Newtons andra lag på Bo.']]
    ]));
    var klam = valueBracket(T.acts, [
      'F=m_B_o·a_B_o=75 kg·1,2 m/s^2=90 N',
      'm_A_s_t_r_i_d=55 kg'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=1,636... m/s^2',
          T.fracH('90', '55', T.str('a_A_s_t_r_i_d=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Massorna']],
      [['och accelerationen har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,6 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Astrid är lättare än Bo och får']],
      [['större acceleration, åt andra']],
      [['hållet. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,6 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: astronauten kastar verktygslådan ----
   * a) motkraften ger accelerationen under kastet och farten efteråt,
   * b) likformig rörelse tillbaka till luftslussen. */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;
    var xS = 150, xA = 320, yA = 250, L = 54;

    T.tanke(T.figurBubble(292, [
      [['Ritar stationen med luftslussen,']],
      [['astronauten och verktygslådan.']]
    ], 340));
    T.rect(60, 170, xS - 14, 280);                        /* stationen */
    T.rect(xS - 14, 205, xS, 245);                        /* luftslussen */
    T.lbl('station', 66, 296);
    T.pause(150);
    var g = gubbe(T, xA, yA, 70, 1);
    T.line([g.sh[0], g.sh[1] + 4], [xA + 34, g.sh[1] + 8]);  /* armarna */
    T.rect(xA + 34, g.sh[1] - 4, xA + 56, g.sh[1] + 16);     /* lådan */
    T.stepEnd();

    var yk = g.sh[1] + 8;
    T.tanke(T.figurBubble(292, [
      [['Hon trycker lådan bort från']],
      [['stationen. Lådan trycker henne']],
      [['lika hårt mot stationen.']]
    ], 340));
    T.arrow([xA + 34, yk - 2], [xA + 34 + L, yk - 2], BLUE);
    T.lbl('F=54 N', xA + 34 + L + 6, yk + 4, BLUE);
    T.pause(150);
    T.arrow([xA + 34, yk + 12], [xA + 34 - L, yk + 12], BLUE);
    T.lbl('F', xA + 34 - L - 6 - T.lblW('F'), yk + 22, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Skriver in massan, kastets tid']],
      [['och avståndet till slussen.']]
    ], 340));
    T.lbl('m=90 kg', xA - 44, yA + 26, BLUE);
    T.lbl('Δt=0,40 s', 380, yA - 6, BLUE);
    T.pause(150);
    T.dblArrow([xS, yA + 44], [xA, yA + 44], BLUE);
    T.lbl('s=15 m', 205, yA + 70, BLUE);
    T.stepEnd();

    /* ---- a) farten efter kastet ---- */
    var y = 460;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv - 0.4 * F), bw, [
      [['Under kastet accelererar hon jämnt']],
      [['från vila. Farten efteråt är']],
      [['accelerationen gånger tiden.']]
    ]));
    T.str('a) Hon accelererar under kastet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('v=a·Δt', padL, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Accelerationen ger Newtons andra']],
      [['lag: lådans motkraft delat med']],
      [['hennes massa.']]
    ]));
    var klam = valueBracket(T.acts, [
      ['a=', { frac: ['F', 'm'] }, '=', { frac: ['54 N', '90 kg'] },
       '=0,60 m/s^2'],
      'Δt=0,40 s'
    ], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    T.str('v=0,60·0,40=0,24 m/s', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['En fjärdedels meter per sekund.']],
      [['Långsamt, men en kort knuff i']],
      [['rymden räcker. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,24 m/s', padL, y), y);
    T.stepEnd();

    /* ---- b) tiden tillbaka ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Efter kastet verkar inga krafter.']],
      [['Enligt Newtons första lag glider']],
      [['hon med konstant fart.']]
    ]));
    T.str('b) Konstant fart tillbaka till slussen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    T.fracH('s', 'v', T.str('s=v·t⟺t=', padL, y), y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Farten tar jag från a).']]
    ]));
    klam = valueBracket(T.acts, ['s=15 m', 'v=0,24 m/s (från a)'],
                        padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
    var xIns = T.str('=62,5 s',
          T.fracH('15', '0,24', T.str('t=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈63 s');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Under själva kastet hinner hon']],
      [['bara cirka 5 cm, så konstant fart']],
      [['hela vägen är en bra modell.']],
      [['En dryg minut. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 63 s', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

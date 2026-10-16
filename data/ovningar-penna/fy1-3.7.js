/* ovningar-penna/fy1-3.7.js: pennlösningar till övningarna i fy1-3.7
 * Lutande plan.
 *
 * En scen per övning, registrerad som "ov-fy1-3.7-u<nr>" och kopplad till
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
 *   - svarsraden utan beteckning: "Svar: 20 N".
 * Siffrorna är identiska med övningens textlösning ("Som text").
 *
 * Figurerna följer teorins figur i fy1-3.7: tyngdkraften från tyngd-
 * punkten (med prick), komposanterna F_1 och F_2 streckade med tunna
 * streckade hjälplinjer som sluter parallellogrammen, normalkraften från
 * kontaktytan (lika lång som F_2) och friktionen i kontaktytan vid
 * lådans bakkant. Alla pilar skalenliga inom figuren.
 *
 * Granskning: node .claude/verify-handskrift.js ov-fy1-3.7-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var physTools = V.physTools, valueBracket = V.valueBracket, BLUE = V.BLUE;
  /* uppgiftens figur står färdig från början (REGEL UPPGIFTENS FIGUR STÅR
   * FÄRDIG FRÅN BÖRJAN i handskrift.js); kraftpilarna ritar pennan */
  var forritad = V.forritad;

  function reg(nr, fn) { HK.registrera('ov-fy1-3.7-u' + nr, fn); }

  /* lutande plan med en låda. Samma figur som lutandePlan i
   * handskrift.js, men med valbar lådstorlek (en liten vinkel ger korta
   * komposanter som annars hamnar inne i lådan). Returnerar lådans
   * geometri: P(du, dn) är en punkt du uppför planet och dn ut från
   * planet räknat från lådans mitt på planet; cm är tyngdpunkten. */
  function plan(T, F, grader, opt) {
    opt = opt || {};
    var ax = 120, ay = 300, LL = 300;
    var a = grader * Math.PI / 180;
    var toppX = ax + LL * Math.cos(a), toppY = ay - LL * Math.sin(a);
    var t = opt.t || 0.6, cx = ax + LL * t * Math.cos(a), cy = ay - LL * t * Math.sin(a);
    var ux = Math.cos(a), uy = -Math.sin(a);                 /* uppför planet */
    var nx = Math.sin(a), ny = Math.cos(a);                  /* in i planet */
    var w = opt.w || 34, h = opt.h || 26;
    function P(du, dn) {
      return [cx + du * ux - dn * nx, cy + du * uy - dn * ny];
    }
    var cm = P(0, h / 2);
    T.line([ax, ay], [toppX + 10, ay]);                      /* marken */
    T.line([ax, ay], [toppX, toppY]);                        /* planet */
    T.line([toppX, toppY], [toppX, ay]);
    /* skraffering UNDER marken; lucka där tyngdkraftspilen går igenom */
    var i, nH = 12;
    for (i = 0; i < nH; i++) {
      var hx = ax + 6 + (toppX + 4 - ax) * (i + 0.5) / nH;
      if (opt.lucka && hx > cm[0] - 46 && hx < cm[0] + 40) continue;
      T.line([hx, ay], [hx - 9, ay + 9]);
    }
    T.pause(140);
    var rb = opt.rb || Math.max(56, 24 / Math.tan(a)), pts = [], n = 12;
    for (i = 0; i <= n; i++) {
      var b = -(i / n) * a;
      pts.push([ax + rb * Math.cos(b), ay + rb * Math.sin(b)]);
    }
    T.acts.push({ kind: 'stroke', pts: pts });
    T.lbl(opt.vinkelText || (grader + '°'), ax + rb + 6, ay - 4, BLUE);
    T.pause(140);
    T.line(P(-w, 0), P(w, 0));
    T.line(P(w, 0), P(w, h));
    T.line(P(w, h), P(-w, h));
    T.line(P(-w, h), P(-w, 0));
    return { cx: cx, cy: cy, ux: ux, uy: uy, nx: nx, ny: ny, P: P, a: a,
             w: w, h: h, cm: cm };
  }

  /* etikett vid en pilspets, utanför spetsen i pilens riktning */
  function lblVid(T, tip, from, txt, ex, ey) {
    var dx = tip[0] - from[0], dy = tip[1] - from[1];
    var L = Math.hypot(dx, dy) || 1;
    dx /= L; dy /= L;
    var w = T.lblW(txt);
    var d = 9 + 0.5 * (Math.abs(dx) * w + Math.abs(dy) * 16);
    var x = tip[0] + dx * d - w / 2 + (ex || 0);
    var yb = tip[1] + dy * d + 6 + (ey || 0);
    T.lbl(txt, x, yb, BLUE);
  }

  /* tyngdkraften och dess komposanter, skalenligt (L = F_G i px).
   * Komposanterna streckas och hjälplinjerna sluter parallellogrammen. */
  function tyngd(T, G, L, o) {
    o = o || {};
    var c = G.cm, tipG = [c[0], c[1] + L];
    T.arrow(c, tipG, BLUE);
    T.dot(c[0], c[1], BLUE);
    T.lbl('F_G', tipG[0] - T.lblW('F_G') - 8 + (o.gx || 0),
          tipG[1] - 3 + (o.gy || 0), BLUE);
    var s1 = L * Math.sin(G.a), s2 = L * Math.cos(G.a);
    var t1 = [c[0] - s1 * G.ux, c[1] - s1 * G.uy];
    var t2 = [c[0] + s2 * G.nx, c[1] + s2 * G.ny];
    if (o.komp === false) return { tipG: tipG, s1: s1, s2: s2 };
    T.pause(150);
    T.dash(t1, tipG);
    T.dash(t2, tipG);
    T.pause(120);
    T.dashArrow(c, t1, BLUE);
    lblVid(T, t1, c, 'F_1', o.x1 == null ? -5 : o.x1, o.y1 == null ? -6 : o.y1);
    T.pause(120);
    T.dashArrow(c, t2, BLUE);
    lblVid(T, t2, c, 'F_2', o.x2, o.y2);
    return { tipG: tipG, s1: s1, s2: s2, t1: t1, t2: t2 };
  }
  /* normalkraften från kontaktytan, en skaftbredd vid sidan av F_2 */
  function normal(T, G, len, ex, ey) {
    var p0 = G.P(4, 0), p1 = G.P(4, len);
    T.arrow(p0, p1, BLUE);
    lblVid(T, p1, p0, 'F_N', ex, ey);
  }
  /* friktionen i kontaktytan vid bakkanten: dir = +1 uppför planet
   * (lådan glider eller vill glida nedför), −1 nedför planet */
  function friktion(T, G, len, dir, ex, ey, txt) {
    var du0 = dir * G.w, p0 = G.P(du0, 3), p1 = G.P(du0 + dir * len, 3);
    T.arrow(p0, p1, BLUE, len < 16 ? 7 : 10);
    lblVid(T, p1, p0, txt || 'F_f', ex, ey == null ? -7 : ey);
  }
  /* dividera bort en gemensam faktor: snett blått streck genom tecknet */
  function stryk(T, F, x0, w, yb) {
    T.line([x0 - 0.16 * F, yb + 0.32 * F],
           [x0 + w + 0.16 * F, yb - 0.68 * F], BLUE);
  }
  /* avrundningen fortsätter på raden så långt arket räcker, annars på en
   * ny rad som börjar med ≈ (pilzonen, se handskrift.js) */
  function avr(T, F, xIns, y, txt) {
    if (xIns + T.adv(txt) < HK.PAPER_W - 44) { T.str(txt, xIns, y); return y; }
    y += 2.4 * F;
    T.str(txt, T.padL + 24, y);
    return y;
  }
  function slut(T, y) {
    return { acts: T.acts, contentW: 660, lastBase: y + 40, padL: T.padL };
  }
  function klammerBubbla(T, y, adv, bw) {
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]));
  }

  /* ---- Uppgift 1: komposanten nedför planet ---- */
  reg(1, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    var G;   /* planet med lådan är uppgiftens figur: färdigt från början */
    forritad(T, function () { G = plan(T, F, 30); });

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften pekar rakt nedåt.']],
      [['Jag delar upp den i en del']],
      [['nedför planet och en del']],
      [['vinkelrätt mot planet.']]
    ], 356));
    tyngd(T, G, 86);
    T.pause(150);
    T.lbl('m=4,0 kg', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(356 + 114), bw, [
      [['Komposanten nedför planet står']],
      [['mitt emot vinkeln ', 0], ['α', 1], [' i kraft-', 0]],
      [['triangeln. Den får sinus.']]
    ]));
    T.str('Tyngdkraftens komposant nedför planet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1=m·g·sin α', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=4,0 kg', 'g=9,82 N/kg', 'α=30°'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('F_1=4,0·9,82·sin 30°=19,64 N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈20 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['sin 30° är 0,5, så komposanten']],
      [['är halva tyngden. Tyngden är']],
      [['ungefär 39 N, och hälften är']],
      [['ungefär 20 N. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 20 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 2: komposanten vinkelrätt mot planet ---- */
  reg(2, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar planet med lådan på och']],
      [['vinkeln 30°.']]
    ], 356));
    var G = plan(T, F, 30);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften pekar rakt nedåt.']],
      [['Jag delar upp den i en del']],
      [['nedför planet och en del']],
      [['vinkelrätt mot planet.']]
    ], 356));
    tyngd(T, G, 86);
    T.pause(150);
    T.lbl('m=4,0 kg', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(356 + 114), bw, [
      [['Komposanten vinkelrätt mot']],
      [['planet ligger intill vinkeln ', 0], ['α', 1]],
      [['i krafttriangeln. Den får']],
      [['cosinus.']]
    ]));
    T.str('Tyngdkraftens komposant vinkelrätt mot planet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_2=m·g·cos α', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=4,0 kg', 'g=9,82 N/kg', 'α=30°'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('F_2=4,0·9,82·cos 30°=34,017... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈34 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['cos 30° är nästan 0,9, så']],
      [['komposanten är lite mindre än']],
      [['hela tyngden, ungefär 39 N.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 34 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 3: konstant hastighet nedför planet (flerval) ---- */
  reg(3, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan som glider nedför']],
      [['planet med konstant hastighet.']]
    ], 356));
    var G = plan(T, F, 30, { vinkelText: 'α' });
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp i en del']],
      [['nedför planet och en del']],
      [['vinkelrätt mot planet.']]
    ], 356));
    tyngd(T, G, 86);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Normalkraften och friktionen']],
      [['verkar i kontaktytan. Friktionen']],
      [['pekar uppför, mot rörelsen.']]
    ], 356));
    normal(T, G, 86 * Math.cos(G.a));
    T.pause(150);
    friktion(T, G, 86 * Math.sin(G.a), 1);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(356 + 114), bw, [
      [['Hastigheten är konstant, så']],
      [['lådan accelererar inte. Enligt']],
      [['Newtons första lag är den']],
      [['resulterande kraften då noll.']]
    ]));
    T.str('Konstant hastighet: kraftjämvikt', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Längs planet verkar bara']],
      [['komposanten nedför och']],
      [['friktionen uppför. De måste ta']],
      [['ut varandra.']]
    ]));
    T.str('F_1-F_f=0⟺F_f=F_1', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Var friktionen större skulle']],
      [['lådan bromsa in. Var den']],
      [['mindre skulle lådan öka farten.']],
      [['Bara lika stora krafter stämmer.']]
    ]));
    T.underline(T.str('Svar: Alternativ B', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 4: skidåkaren i backen ---- */
  reg(4, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    var G;   /* backen med åkaren är uppgiftens figur: färdig från början */
    forritad(T, function () {
      G = plan(T, F, 15, { w: 24, h: 24, lucka: true });
    });

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp i en del']],
      [['längs backen och en del']],
      [['vinkelrätt mot backen.']]
    ], 400));
    tyngd(T, G, 110);
    T.pause(150);
    T.lbl('m=65 kg', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    var y = 510;
    T.tanke(T.bubble(120, T.bubbleTop(400 + 114), bw, [
      [['Komposanten längs backen står']],
      [['mitt emot vinkeln ', 0], ['α', 1], [' i kraft-', 0]],
      [['triangeln. Den får sinus.']]
    ]));
    T.str('Tyngdkraftens komposant längs backen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1=m·g·sin α', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['m=65 kg', 'g=9,82 N/kg', 'α=15°'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('F_1=65·9,82·sin 15°=165,20... N', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Massan']],
      [['och vinkeln har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈170 N');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Tyngden är ungefär 640 N. I en']],
      [['flack backe drar bara en']],
      [['fjärdedel av den åkaren nedför.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 170 N', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 5: brantare plan (flerval) ---- */
  reg(5, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar ett lutande plan med']],
      [['lutningsvinkeln ', 0], ['α', 1], ['.', 0]]
    ], 356));
    var G = plan(T, F, 30, { vinkelText: 'α' });
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp i en del']],
      [['längs planet och en del']],
      [['vinkelrätt mot planet.']]
    ], 356));
    tyngd(T, G, 86);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(356 + 114), bw, [
      [['Formlerna för komposanterna']],
      [['visar hur de beror på vinkeln.']]
    ]));
    T.str('Komposanterna', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1=m·g·sin α', padL, y);
    y += adv + 0.4 * F;
    T.str('F_2=m·g·cos α', padL, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Tyngdkraften ', 0], ['m', 1], ['·', 0], ['g', 1], [' är densamma.', 0]],
      [['Bara sinus och cosinus ändras', 0]],
      [['när vinkeln växer.']]
    ]));
    T.str('Brantare plan: α växer', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('sin α ökar, så F_1 ökar', padL, y);
    y += adv + 0.4 * F;
    T.str('cos α minskar, så F_2 minskar', padL, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Jag kontrollerar med ytterlig-']],
      [['heterna: plant golv och en']],
      [['lodrät vägg.']]
    ]));
    T.str('Kontroll', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('α=0°:  F_1=0 och F_2=m·g', padL, y);
    y += adv + 0.4 * F;
    T.str('α=90°:  F_1=m·g och F_2=0', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['På plant golv drar inget lådan']],
      [['nedför, och mot en lodrät vägg']],
      [['trycker den inte alls. Det']],
      [['stämmer med alternativ D.']]
    ]));
    T.underline(T.str('Svar: Alternativ D', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 6: friktionstalet ur konstant hastighet ---- */
  reg(6, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar lådan som glider nedför']],
      [['planet. Vinkeln är 28°.']]
    ], 356));
    var G = plan(T, F, 28);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp i en del']],
      [['nedför planet och en del']],
      [['vinkelrätt mot planet.']]
    ], 356));
    tyngd(T, G, 86);
    T.pause(150);
    T.lbl('m=6,0 kg', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Hastigheten är konstant, så']],
      [['friktionen är lika lång som']],
      [['komposanten nedför planet.']]
    ], 356));
    normal(T, G, 86 * Math.cos(G.a));
    T.pause(150);
    friktion(T, G, 86 * Math.sin(G.a), 1);
    T.stepEnd();

    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(356 + 114), bw, [
      [['Den resulterande kraften är noll.']],
      [['Längs planet tar friktionen ut']],
      [['komposanten nedför planet.']]
    ]));
    T.str('Konstant hastighet: kraftjämvikt längs planet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_f=F_1', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Friktionen är friktionstalet']],
      [['gånger normalkraften, och']],
      [['normalkraften är lika stor som']],
      [['komposanten vinkelrätt mot planet.']]
    ]));
    var yM = y;
    var xm1 = padL + T.adv('µ·'), xg1 = padL + T.adv('µ·m·');
    var xm2 = padL + T.adv('µ·m·g·cos α='), xg2 = padL + T.adv('µ·m·g·cos α=m·');
    T.str('µ·m·g·cos α=m·g·sin α', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['Massan och tyngdfaktorn finns']],
      [['som faktorer i båda leden, så de']],
      [['kan divideras bort.']]
    ]));
    var wm = T.adv('m') - 1.5, wg = T.adv('g') - 1.5;
    stryk(T, F, xm1, wm, yM);
    T.pause(200);
    stryk(T, F, xg1, wg, yM);
    T.pause(200);
    stryk(T, F, xm2, wm, yM);
    T.pause(200);
    stryk(T, F, xg2, wg, yM);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Delar med cos ', 0], ['α', 1], [' så att friktions-', 0]],
      [['talet blir ensamt kvar.']]
    ]));
    var xr = T.str('µ·cos α=sin α⟺µ=', padL, y);
    var xf = T.fracH('sin α', 'cos α', xr, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Sinus delat med cosinus är']],
      [['tangens.']]
    ]));
    T.str('=tan α', xf + 0.15 * F, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    var klam = valueBracket(T.acts, ['α=28°'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('µ=tan 28°=0,5317...', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Vinkeln']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈0,53');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Massan behövdes inte alls. Ett']],
      [['friktionstal kring 0,5 är vanligt']],
      [['för trä mot trä. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 0,53', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 7: kälken på det friktionsfria planet ---- */
  reg(7, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    var G;   /* planet med kälken är uppgiftens figur: färdigt från början */
    forritad(T, function () { G = plan(T, F, 22); });

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp. Normal-']],
      [['kraften tar ut delen vinkelrätt']],
      [['mot planet. Friktion finns inte.']]
    ], 370));
    tyngd(T, G, 72, { x2: 8, y2: -10 });
    T.pause(150);
    normal(T, G, 72 * Math.cos(G.a));
    T.pause(150);
    T.lbl('m=8,0 kg', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    var y = 484;
    T.tanke(T.bubble(120, T.bubbleTop(370 + 114), bw, [
      [['Accelerationen beror på den']],
      [['resulterande kraften längs']],
      [['planet.']]
    ]));
    T.str('Newtons andra lag längs planet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Utan friktion är komposanten']],
      [['nedför planet den enda kraften']],
      [['längs planet.']]
    ]));
    var yM = y;
    var xm1 = padL, xm2 = padL + T.adv('m·g·sin α=');
    T.str('m·g·sin α=m·a', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['Massan finns som faktor i båda']],
      [['leden, så den kan divideras bort.']]
    ]));
    var wm = T.adv('m') - 1.5;
    stryk(T, F, xm1, wm, yM);
    T.pause(260);
    stryk(T, F, xm2, wm, yM);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.str('g·sin α=a⟺a=g·sin α', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['g=9,82 N/kg', 'α=22°'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('a=9,82·sin 22°=3,678... m/s^2', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Vinkeln']],
      [['har två värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈3,7 m/s^2');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mindre än 9,82 m/s², eftersom']],
      [['planet bara lutar 22°. Massan']],
      [['spelade ingen roll. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 3,7 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 8: flaket som tippas tills lasten glider ---- */
  reg(8, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar flaket som ett lutande']],
      [['plan med en låda. Vinkeln ', 0], ['α', 1]],
      [['är det jag söker.']]
    ], 384));
    var G = plan(T, F, 23, { vinkelText: 'α' });
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp i en del']],
      [['nedför flaket och en del']],
      [['vinkelrätt mot flaket.']]
    ], 384));
    tyngd(T, G, 76, { x2: 8, y2: -10 });
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Precis när lådan ska börja glida']],
      [['har vilofriktionen sitt största']],
      [['värde, lika stort som delen nedför.']]
    ], 384));
    normal(T, G, 76 * Math.cos(G.a));
    T.pause(150);
    friktion(T, G, 76 * Math.sin(G.a), 1);
    T.pause(150);
    T.lbl('µ=0,42', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    var y = 498;
    T.tanke(T.bubble(120, T.bubbleTop(384 + 114), bw, [
      [['Vid glidningsgränsen är']],
      [['komposanten nedför lika stor som']],
      [['friktionens största värde.']]
    ]));
    T.str('Glidningsgränsen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1=F_f=µ·F_N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Normalkraften är lika stor som']],
      [['komposanten vinkelrätt mot']],
      [['flaket.']]
    ]));
    var yM = y;
    var xm1 = padL, xg1 = padL + T.adv('m·');
    var xm2 = padL + T.adv('m·g·sin α=µ·'), xg2 = padL + T.adv('m·g·sin α=µ·m·');
    T.str('m·g·sin α=µ·m·g·cos α', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['Massan och tyngdfaktorn finns']],
      [['som faktorer i båda leden, så de']],
      [['kan divideras bort.']]
    ]));
    var wm = T.adv('m') - 1.5, wg = T.adv('g') - 1.5;
    stryk(T, F, xm1, wm, yM);
    T.pause(200);
    stryk(T, F, xg1, wg, yM);
    T.pause(200);
    stryk(T, F, xm2, wm, yM);
    T.pause(200);
    stryk(T, F, xg2, wg, yM);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Delar med cos ', 0], ['α', 1], ['. Sinus delat', 0]],
      [['med cosinus är tangens.']]
    ]));
    var xr = T.str('sin α=µ·cos α⟺', padL, y);
    T.str('=µ', T.fracH('sin α', 'cos α', xr, y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.str('⟺tan α=µ', padL, y);
    T.stepEnd();

    y += adv + 2.0 * F;
    var klam = valueBracket(T.acts, ['µ=0,42'], padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Sätter in friktionstalet. Vinkeln']],
      [['får jag med arctan, det vill säga']],
      [['tan baklänges på räknaren.']]
    ]));
    T.str('tan α=0,42⟺α=arctan 0,42', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    var xIns = T.str('=22,78...°', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Friktionstalet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈23°');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Flaket behöver bara lutas drygt']],
      [['20°, långt ifrån lodrätt. Lådor']],
      [['brukar glida av tidigt. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 23°', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 9: snowboardåkaren i backen ----
   * a) accelerationen med friktion, b) farten efter 80 m. */
  reg(9, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar backen med åkaren som en']],
      [['låda. Vinkeln är 12°.']]
    ], 430));
    var G = plan(T, F, 12, { w: 18, h: 20, lucka: true, t: 0.74 });
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp. Friktionen']],
      [['bromsar uppför backen och är']],
      [['kortare än delen nedför.']]
    ], 430));
    var L = 120;
    tyngd(T, G, L);
    T.pause(150);
    normal(T, G, L * Math.cos(G.a));
    T.pause(150);
    friktion(T, G, 0.10 * L * Math.cos(G.a), 1);
    T.pause(150);
    T.lbl('µ=0,10', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    /* ---- a) accelerationen ---- */
    var y = 544;
    T.tanke(T.bubble(120, T.bubbleTop(430 + 114), bw, [
      [['Accelerationen beror på den']],
      [['resulterande kraften längs']],
      [['backen.']]
    ]));
    T.str('a) Newtons andra lag längs backen', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_R=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Delen nedför backen drar,']],
      [['friktionen bromsar.']]
    ]));
    T.str('F_1-F_f=m·a', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Friktionen är friktionstalet']],
      [['gånger normalkraften, och']],
      [['normalkraften är lika stor som']],
      [['delen vinkelrätt mot backen.']]
    ]));
    var yM = y;
    var xm1 = padL, xm2 = padL + T.adv('m·g·sin α-µ·');
    var xm3 = padL + T.adv('m·g·sin α-µ·m·g·cos α=');
    T.str('m·g·sin α-µ·m·g·cos α=m·a', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['Massan finns som faktor i alla']],
      [['termerna, så den kan divideras']],
      [['bort.']]
    ]));
    var wm = T.adv('m') - 1.5;
    stryk(T, F, xm1, wm, yM);
    T.pause(200);
    stryk(T, F, xm2, wm, yM);
    T.pause(200);
    stryk(T, F, xm3, wm, yM);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.str('a=g·sin α-µ·g·cos α', padL, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    var klam = valueBracket(T.acts, ['g=9,82 N/kg', 'α=12°', 'µ=0,10'],
                            padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.7 * F;
    klammerBubbla(T, y, adv, bw);
    T.str('a=9,82·sin 12°-0,10·9,82·cos 12°', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    var xIns = T.str('=1,081... m/s^2', padL + 24, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag. Vinkeln']],
      [['och friktionstalet har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,1 m/s^2');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Utan friktion hade det blivit']],
      [['cirka 2,0 m/s². Snön tar ungefär']],
      [['hälften. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,1 m/s^2', padL, y), y);
    T.stepEnd();

    /* ---- b) farten efter 80 m ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Accelerationen är konstant, så']],
      [['Torricellis ekvation kopplar ihop']],
      [['farten med sträckan.']]
    ]));
    T.str('b) Torricellis ekvation', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('v^2-v_0^2=2·a·s', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Åkaren startar från stillastående,']],
      [['så startfarten är noll.']]
    ]));
    T.str('v^2-0^2=2·a·s⟺v^2=2·a·s', padL, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Drar roten ur båda led. Farten']],
      [['är positiv, så bara plusroten']],
      [['gäller.']]
    ]));
    T.rot('2·a·s', T.str('v=', padL, y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.7 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Accelerationen tar jag']],
      [['oavrundad från a).']]
    ]));
    klam = valueBracket(T.acts, ['a=1,081... m/s^2 (från a)', 's=80 m'],
                        padL, y, T.s, F);
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 1.9 * F;
    klammerBubbla(T, y, adv, bw);
    var xr = T.rot('2·1,081...·80', T.str('v=', padL, y) + 0.15 * F, y);
    xIns = T.str('=13,15... m/s', xr + 0.1 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.3 * F), bw, [
      [['Först nu avrundar jag, till två']],
      [['värdesiffror som i a).']]
    ]));
    y = avr(T, F, xIns, y, '≈13 m/s');
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['13 m/s är ungefär 47 km/h. En']],
      [['rejäl fart efter 80 m i en lång']],
      [['backe. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 13 m/s', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 10: Elviras låda, a) glider den? b) accelerationen ---- */
  reg(10, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    var G;   /* planet med lådan är uppgiftens figur: färdigt från början */
    forritad(T, function () { G = plan(T, F, 31); });

    T.tanke(T.figurBubble(292, [
      [['Tyngdkraften delas upp. Friktionen']],
      [['pekar uppför och är kortare än']],
      [['delen nedför planet.']]
    ], 356));
    var L = 90;
    tyngd(T, G, L);
    T.pause(150);
    normal(T, G, L * Math.cos(G.a));
    T.pause(150);
    friktion(T, G, 0.35 * L * Math.cos(G.a), 1);
    T.pause(150);
    T.lbl('m=6,0 kg', G.cx - 200, G.cy - 74, BLUE);
    T.lbl('µ=0,35', G.cx - 200, G.cy - 46, BLUE);
    T.stepEnd();

    /* ---- a) glider lådan? ---- */
    var y = 470;
    T.tanke(T.bubble(120, T.bubbleTop(356 + 114), bw, [
      [['Lådan glider om delen nedför']],
      [['planet är större än friktionens']],
      [['största värde. Jag räknar båda.']]
    ]));
    T.str('a) Kraften nedför planet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1=m·g·sin α=6,0·9,82·sin 31°', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    var x1 = T.str('=30,346... N', padL + 24, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Friktionens största värde är']],
      [['friktionstalet gånger normal-']],
      [['kraften, och normalkraften är']],
      [['delen vinkelrätt mot planet.']]
    ]));
    T.str('Friktionens största värde', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_f_,_m_a_x=µ·m·g·cos α', padL, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.str('=0,35·6,0·9,82·cos 31°', padL + 24, y);
    T.stepEnd();

    y += adv + 0.9 * F;
    T.str('=17,676... N', padL + 24, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Ungefär 30 N nedför mot högst']],
      [['18 N uppför. Kraften nedför']],
      [['vinner.']]
    ]));
    T.str('F_1>F_f_,_m_a_x', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Kontroll: tan 31° är ungefär 0,60,']],
      [['större än friktionstalet 0,35.']],
      [['Samma slutsats. Rimligt!']]
    ]));
    T.underline(T.str('Svar: F_1>F_f_,_m_a_x, så lådan accelererar', padL, y), y);
    T.stepEnd();

    /* ---- b) accelerationen ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Accelerationen beror på den']],
      [['resulterande kraften längs']],
      [['planet.']]
    ]));
    T.str('b) Newtons andra lag längs planet', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xa = T.str('F_R=m·a⟺a=', padL, y);
    T.fracH('F_R', 'm', xa, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Den resulterande kraften är']],
      [['delen nedför minus friktionen.']],
      [['Båda tar jag oavrundade från a).']]
    ]));
    var klam = valueBracket(T.acts, [
      'F_R=F_1-F_f=30,346... N-17,676... N',
      '    =12,669... N',
      'm=6,0 kg'
    ], padL, y, T.s, F, { rs: 0.75 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.2 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('=2,111... m/s^2',
          T.fracH('12,669...', '6,0', T.str('a=', padL, y), y) + 0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈2,1 m/s^2');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Mycket mindre än 9,82 m/s². Bara']],
      [['en del av tyngden drar nedför,']],
      [['och friktionen tar en del av den.']],
      [['Rimligt!']]
    ]));
    T.underline(T.str('Svar: 2,1 m/s^2', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });

  /* ---- Uppgift 11: klossen som skjuts uppför planet ----
   * a) sträckan uppför (friktionen pekar NEDFÖR på vägen upp),
   * b) glider klossen ner igen? */
  reg(11, function (cfg, F) {
    var T = physTools(F), padL = T.padL;
    var adv = 1.7 * F, bw = 292;

    T.tanke(T.figurBubble(292, [
      [['Ritar planet med klossen som']],
      [['glider uppför. Vinkeln är 28°.']]
    ], 370));
    var G;   /* planet med klossen är uppgiftens figur: färdigt från början */
    forritad(T, function () { G = plan(T, F, 28, { h: 36 }); });
    var v0 = G.P(G.w, G.h / 2), v1 = G.P(G.w + 36, G.h / 2);
    T.arrow(v0, v1, BLUE);
    T.lbl('v_0=5,0 m/s', v0[0] - 4, v1[1] - 22, BLUE);
    T.stepEnd();

    T.tanke(T.figurBubble(292, [
      [['Friktionen verkar mot rörelsen.']],
      [['På vägen upp pekar den nedför,']],
      [['åt samma håll som delen nedför.']]
    ], 370));
    var L = 92;
    tyngd(T, G, L, { x1: -4, y1: -16, x2: 8, y2: -12 });
    T.pause(150);
    normal(T, G, L * Math.cos(G.a));
    T.pause(150);
    friktion(T, G, 0.25 * L * Math.cos(G.a), -1, 6, 16);
    T.pause(150);
    T.lbl('µ=0,25', G.cx - 200, G.cy - 74, BLUE);
    T.stepEnd();

    /* ---- a) sträckan uppför ---- */
    var y = 484;
    T.tanke(T.bubble(120, T.bubbleTop(370 + 114), bw, [
      [['Klossen bromsas med konstant']],
      [['retardation. Torricellis ekvation']],
      [['kopplar ihop farten med']],
      [['sträckan.']]
    ]));
    T.str('a) Torricellis ekvation', padL, y, null, 0.62);
    T.pause(300);
    y += 2.5 * F;
    var xb = T.str('v^2-v_0^2=2·a·s⟺s=', padL, y);
    T.fracH('v^2-v_0^2', '2·a', xb, y);
    T.stepEnd();

    y += adv + 2.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv, 1.2), bw, [
      [['Båda krafterna längs planet']],
      [['bromsar. Newtons andra lag ger']],
      [['massan gånger accelerationen lika']],
      [['med minus deras summa. Massan']],
      [['divideras bort.']]
    ]));
    var klam = valueBracket(T.acts, [
      'v=0',
      'v_0=5,0 m/s',
      'a=-(g·sin α+µ·g·cos α)',
      '   =-(9,82 N/kg·sin 28°',
      '       +0,25·9,82 N/kg·cos 28°)',
      '   =-6,777... m/s^2'
    ], padL, y, T.s, F, { rs: 0.7 });
    T.stepEnd();
    y = klam.yEnd;

    y += adv + 2.4 * F;
    klammerBubbla(T, y, adv, bw);
    var xIns = T.str('=1,844... m',
          T.fracH('0^2-5,0^2', '2·(-6,777...)', T.str('s=', padL, y), y) +
          0.15 * F, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(y + 0.9 * F), bw, [
      [['Först nu avrundar jag. Alla']],
      [['mätvärden har två']],
      [['värdesiffror.']]
    ]));
    y = avr(T, F, xIns, y, '≈1,8 m');
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Retardationen är nästan lika stor']],
      [['som i fritt fall, så klossen']],
      [['hinner inte långt. Rimligt!']]
    ]));
    T.underline(T.str('Svar: 1,8 m', padL, y), y);
    T.stepEnd();

    /* ---- b) glider klossen ner igen? ---- */
    y += adv + 2.0 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['I vändpunkten står klossen still']],
      [['ett ögonblick. Den glider ner om']],
      [['delen nedför är större än vilo-']],
      [['friktionens största värde.']]
    ]));
    T.str('b) Glider klossen ner igen?', padL, y, null, 0.62);
    T.pause(300);
    y += 2.1 * F;
    T.str('F_1>µ·F_N', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Normalkraften är lika stor som']],
      [['delen vinkelrätt mot planet.']]
    ]));
    var yM = y;
    var xm1 = padL, xg1 = padL + T.adv('m·');
    var xm2 = padL + T.adv('m·g·sin α>µ·'), xg2 = padL + T.adv('m·g·sin α>µ·m·');
    T.str('m·g·sin α>µ·m·g·cos α', padL, y);
    T.stepEnd();

    T.tanke(T.bubble(140, T.bubbleTop(yM), bw, [
      [['Massan och tyngdfaktorn är']],
      [['positiva faktorer i båda leden,']],
      [['så de kan divideras bort.']]
    ]));
    var wm = T.adv('m') - 1.5, wg = T.adv('g') - 1.5;
    stryk(T, F, xm1, wm, yM);
    T.pause(200);
    stryk(T, F, xg1, wg, yM);
    T.pause(200);
    stryk(T, F, xm2, wm, yM);
    T.pause(200);
    stryk(T, F, xg2, wg, yM);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Delar med cos ', 0], ['α', 1], [', som är positiv.', 0]],
      [['Sinus delat med cosinus är']],
      [['tangens.']]
    ]));
    var xr = T.str('sin α>µ·cos α⟺', padL, y);
    T.str('>µ', T.fracH('sin α', 'cos α', xr, y) + 0.15 * F, y);
    T.stepEnd();

    y += adv + 1.4 * F;
    T.str('⟺tan α>µ', padL, y);
    T.stepEnd();

    y += adv + 1.9 * F;
    T.tanke(T.bubble(140, T.bubbleTop(y - adv), bw, [
      [['Sätter in vinkeln och friktions-']],
      [['talet och jämför.']]
    ]));
    T.str('tan 28°=0,5317...>0,25', padL, y);
    T.stepEnd();

    y += adv + 1.2 * F;
    T.tanke(T.bubble(120, T.bubbleTop(y - adv), bw, [
      [['Planet är brant och friktionen']],
      [['liten, så klossen kan inte bli']],
      [['liggande. Rimligt!']]
    ]));
    T.underline(T.str('Svar: Ja, den glider ner igen', padL, y), y);
    T.stepEnd();

    return slut(T, y);
  });
})();

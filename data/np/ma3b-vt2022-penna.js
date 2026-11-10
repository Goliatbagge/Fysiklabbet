/* ma3b-vt2022-penna.js — pennlösningar till Nationellt prov Ma 3b, VT 2022.
 *
 * Provet är HÄRLETT ur Ma 3c VT 2022 (se filhuvudet i ma3b-vt2022.js): de
 * lånade uppgifterna använder 3c-provets scener (penna: 'ma3c-vt2022-u<nr>').
 * Här finns bara scenerna till 3b-provets egna uppgifter 4, 5, 20 och 24,
 * registrerade som "ma3b-vt2022-u<nr>".
 *
 * Reglerna står i handskrift.js filhuvud och i data/np/RIKTLINJER.md — de
 * som oftast bränner: inget bläck vid x > 696 eller x < 24, inget med
 * x > 420 ovanför y = 150 (y = 210 i ekvval-scener), en tanke per led
 * direkt före ledet, division alltid med vågrätt streck, och samma antal
 * klicksteg i båda ekvationsredovisningarna.
 *
 * Granskning: node .claude/verify-handskrift.js ma3b-vt2022-u4 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      mkEkvOp = V.mkEkvOp, humanize = V.humanize, BLUE = V.BLUE,
      forritad = V.forritad;

  function reg(nr, fn) { HK.registrera('ma3b-vt2022-u' + nr, fn); }

  /* SYSTEMKLAMMER — samma handritade klammer som i ma2c-vt2022-penna.js:
   * ETT pennstreck uppifrån och ned med en liten spets åt vänster på
   * mitten. x = klammerns högerkant, yTop/yBot = radernas ytterkanter. */
  function sysBrace(T, F, x, yTop, yBot) {
    var ym = (yTop + yBot) / 2, d = 0.22 * F;
    T.acts.push({ kind: 'stroke', pts: humanize([
      [x, yTop], [x - d * 0.55, yTop + d * 0.5], [x - d * 0.7, ym - d * 0.6],
      [x - d * 1.25, ym], [x - d * 0.7, ym + d * 0.6],
      [x - d * 0.55, yBot - d * 0.5], [x, yBot]]) });
    T.pause(160);
  }

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 4: tolka en geometrisk summa ----
   * Summan står redan på formelns form S = a(k^n − 1)/(k − 1), så a, k och
   * n läses av genom jämförelse. Det fjärde talet är a·k³. */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 118;
    xx = T.str('S=', padL, y);
    T.fracH('2(5^1^0^0-1)', '4', xx, y);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['Formeln för en geometrisk summa']],
      [['med n termer, första termen a']],
      [['och kvoten k. Jag jämför.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('S=', padL, y);
    T.fracH('a(k^n-1)', 'k-1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Potensens bas är kvoten och']],
      [['exponenten antalet termer.']],
      [['Nämnaren ska då vara 5-1=4.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('k=5    n=100    k-1=4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Det som står framför parentesen']],
      [['är första termen a.']]
    ]);
    y += 2.6 * F;
    T.str('a=2', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Nästa tal får jag genom att']],
      [['multiplicera med kvoten 5. Till']],
      [['det fjärde talet är det tre steg.']]
    ]);
    y += 3.0 * F;
    T.str('2, 10, 50, 250', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Samma sak med en formel: det']],
      [['fjärde talet är a·k^3.']]
    ]);
    y += 2.6 * F;
    T.str('a·k^3=2·5^3=2·125=250', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: 250', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: vilken punkt ligger i området? ----
   * Uppgiftens figur står färdig från början. Pennan sätter ekvationerna
   * på linjerna, drar området med blåpennan och prövar sedan punkten C
   * (och D, som ligger PÅ linjerna) i olikheterna. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var A = mkAxes(T, F, { ox: padL + 81, oy: 432, u: 54,
                           xmin: -1, xmax: 5, ymin: 0, ymax: 5 });
    var P = { A: [2, 5], B: [-1, 3], C: [1, 3], D: [2, 3], E: [4, 3], F: [2, 1] };
    /* bokstävernas plats i fri yta (px från punkten), som i provets figur */
    var OFF = { A: [8, 20], B: [-6, 22], C: [8, 22], D: [-4, -12], E: [8, 22], F: [8, 22] };

    /* uppgiftens figur står färdig från början (REGEL UPPGIFTENS FIGUR
     * STÅR FÄRDIG FRÅN BÖRJAN) */
    forritad(T, function () {
      A.axes();
      A.ticks(V.heltal(-1, 5), V.heltal(1, 5), null, null,
              { x: { '-1': 10 } });
      T.pause(200);
      A.rule([A.X(-0.35), A.Y(5.35)], [A.X(5.35), A.Y(-0.35)]);
      A.rule([A.X(-1.15), A.Y(-0.15)], [A.X(4.35), A.Y(5.35)]);
      T.pause(160);
      Object.keys(P).forEach(function (k) {
        A.dot(P[k][0], P[k][1]);
        T.str(k, A.X(P[k][0]) + OFF[k][0], A.Y(P[k][1]) + OFF[k][1], null, 0.55);
      });
    });

    tanke(500, [
      [['Den fallande linjen går genom']],
      [['(0, 5) och (5, 0): y=5-x. Den']],
      [['stigande genom (0, 1): y=x+1.']]
    ], 0);
    A.tag(3.7, 1.65, 'y=5-x', 0, 0, BLUE);
    T.pause(160);
    A.tag(3.45, 3.85, 'y=x+1', 0, 0, BLUE);
    T.stepEnd();

    tanke(500, [
      [['y<5-x: under den fallande linjen.']],
      [['y>x+1: över den stigande. x>0:']],
      [['till höger om y-axeln. Det ger en']],
      [['triangel.']]
    ], 0);
    /* områdets kanter dras med blåpennan längs de tre gränserna */
    A.linjal([A.X(0), A.Y(1)], [A.X(0), A.Y(5)], BLUE);
    T.pause(120);
    A.linjal([A.X(0), A.Y(5)], [A.X(2), A.Y(3)], BLUE);
    T.pause(120);
    A.linjal([A.X(2), A.Y(3)], [A.X(0), A.Y(1)], BLUE);
    T.stepEnd();

    tanke(500, [
      [['Bara C ligger inne i triangeln.']],
      [['Jag prövar C i olikheterna.']]
    ], 0);
    acts.push({ kind: 'stroke', color: BLUE,
                pts: V.ringPts(A.X(1) + 10, A.Y(3) + 6, 26, 21) });
    T.pause(200);
    y = 540;
    T.str('C(1, 3):  1>0', padL, y);
    y += 2.0 * F;
    T.str('3<5-1=4  och  3>1+1=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['D ligger PÅ båda linjerna. Där']],
      [['är 3=5-2, och olikheten är']],
      [['strikt, så D räknas inte.']]
    ]);
    y += 2.6 * F;
    T.str('D(2, 3):  3<5-2=3  stämmer inte', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= DELPROV D ================= */

  /* ---- Uppgift 20: bestäm B i en geometrisk summa ----
   * 22 termer (exponenterna 0 till 21), kvoten 1,4. Formeln ger en
   * ekvation i B som löses i båda redovisningslägena. */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + T.fracW('B(1,4^2^2-1)', '0,4') + T.adv('=250 000') + 0.9 * F;

    y = 238;
    T.str('B+B·1,4+B·1,4^2+...+B·1,4^2^1=250 000', padL, y, null, 0.85);
    T.stepEnd();

    tanke(y, [
      [['Första termen är B och kvoten']],
      [['1,4. Exponenterna går från 0']],
      [['till 21: det är 22 termer.']]
    ]);
    y += 3.0 * F;
    T.str('a=B    k=1,4    n=22', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Formeln för en geometrisk summa']],
      [['gör de 22 termerna till ett']],
      [['enda uttryck.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('S=', padL, y);
    T.fracH('a(k^n-1)', 'k-1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in a, k och n och']],
      [['låter summan vara 250 000.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.fracH('B(1,4^2^2-1)', '1,4-1', padL, y);
    T.str('=250 000', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.fracH('B(1,4^2^2-1)', '0,4', padL, y);
    T.str('=250 000', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråket försvinner om jag']],
      [['multiplicerar båda led med 0,4.']]
    ], 1.05);
    y = ekvOp(y, '·0,4', xw, function (yy) {
      var x1 = T.fracH('B(1,4^2^2-1)', '0,4', padL, yy + 0.6 * F);
      x1 = T.str('·0,4', x1, yy + 0.6 * F, BLUE);
      x1 = T.str('=250 000', x1, yy + 0.6 * F);
      T.str('·0,4', x1, yy + 0.6 * F, BLUE);
    }, { dy: 2.8, dyRes: 3.6, dyVagg: 2.6 });
    T.str('B(1,4^2^2-1)=100 000', padL, y);
    T.stepEnd();

    tanke(y, [
      [['B multipliceras med parentesen,']],
      [['så jag dividerar båda led med den.']]
    ]);
    y = ekvOp(y, '/(1,4^2^2-1)', xw, 'B(1,4^2^2-1)=100 000', { dy: 3.2, dyRes: 3.2, dyVagg: 3.0 });
    xx = T.str('B=', padL, y);
    T.fracH('100 000', '1,4^2^2-1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['1,4^2^2=1 639,897... på räknaren.']],
      [['Jag avrundar först på slutet.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('B=', padL, y);
    xx = T.fracH('100 000', '1 638,897...', xx, y);
    T.str('=61,016...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Sista termen blir cirka']],
      [['61·1 171≈71 000, och de stora']],
      [['termerna i slutet står för det']],
      [['mesta av summan.']]
    ], 1.05);
    y += 3.4 * F;
    xe = T.str('Svar: B≈61', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 24: linjär optimering, sittkuddar ----
   * Variabler → villkor (system av olikheter) → målfunktion → gränslinjer
   * ritade med linjal → skärningspunkten (ekvation i båda lägena) → hörnen
   * prövas i målfunktionen. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, y0;
    var tanke = mkTanke(T), vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + T.adv('150-1,5x=125-x') + 0.9 * F;

    y = 238;
    T.str('x = antal kuddar av modell A', padL, y);
    y += 2.0 * F;
    T.str('y = antal kuddar av modell B', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Inköpet får kosta högst 60 000 kr,']],
      [['lagret rymmer högst 125 kuddar']],
      [['och antalen kan inte vara negativa.']]
    ]);
    y += 3.0 * F;
    y0 = y;
    var xs = padL + 0.45 * F;
    sysBrace(T, F, padL + 0.1 * F, y0 - 0.95 * F, y0 + 4.6 * F);
    T.str('600x+400y≤60 000', xs, y);
    y += 1.9 * F;
    T.str('x+y≤125', xs, y);
    y += 1.9 * F;
    T.str('x≥0,  y≥0', xs, y);
    T.stepEnd();

    tanke(y, [
      [['Vinsten V ska bli så stor som']],
      [['möjligt. Det är målfunktionen.']]
    ]);
    y += 2.6 * F;
    T.str('V=500x+400y', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Gränslinjerna skrivs på formen']],
      [['y=kx+m så att de går lätt att']],
      [['rita. Båda villkoren är "högst",']],
      [['så området ligger under dem.']]
    ]);
    y += 3.0 * F;
    T.str('600x+400y=60 000', padL, y);
    y += 2.0 * F;
    T.str('⟺  y=150-1,5x', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('x+y=125', padL, y);
    y += 2.0 * F;
    T.str('⟺  y=125-x', padL, y);
    T.stepEnd();

    /* ---- koordinatsystemet: tre rutor (81 px) = 25 kuddar ---- */
    var oyG = y + 1.6 * F + 6 * 81 + 69 + 30;   /* axelpilens topp 1,6·F under raden */
    var A = mkAxes(T, F, { ox: padL + 108, oy: oyG, u: 81, xsc: 25, ysc: 25,
                           xmin: 0, xmax: 150, ymin: 0, ymax: 150 });
    tanke(y, [
      [['Ett koordinatsystem med 25']],
      [['kuddar per steg. Linjerna dras']],
      [['med linjal mellan axlarna.']]
    ]);
    A.axes();
    A.ticks([25, 50, 75, 100, 125, 150], [25, 50, 75, 100, 125, 150]);
    T.pause(200);
    A.linjal([A.X(0), A.Y(150)], [A.X(100), A.Y(0)], BLUE);
    T.pause(160);
    A.linjal([A.X(0), A.Y(125)], [A.X(125), A.Y(0)], BLUE);
    T.stepEnd();

    tanke(oyG + 0.4 * F, [
      [['Det fjärde hörnet är där linjerna']],
      [['skär varandra. Där har de samma']],
      [['y-värde.']]
    ], 1.4);
    y = oyG + 4.0 * F;
    T.str('150-1,5x=125-x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x-termen samlas i högerledet:']],
      [['jag adderar 1,5x till båda led.']]
    ]);
    y = ekvOp(y, '+1,5x', xw, '150-1,5x=125-x');
    T.str('150=125+0,5x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['125 adderas i högerledet, så jag']],
      [['subtraherar 125 från båda led.']]
    ]);
    y = ekvOp(y, '-125', xw, '150=125+0,5x');
    T.str('25=0,5x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med 0,5, så jag']],
      [['dividerar båda led med 0,5.']]
    ]);
    y = ekvOp(y, '/0,5', xw, '25=0,5x', { dyRes: 3.2 });
    T.str('x=50', padL, y);
    T.stepEnd();

    tanke(y, [
      [['y-värdet får jag ur den ena']],
      [['linjens ekvation.']]
    ]);
    y += 2.6 * F;
    T.str('y=125-50=75', padL, y);
    T.stepEnd();

    /* hörnen märks ut i koordinatsystemet */
    tanke(y, [
      [['Största vinsten finns i ett av']],
      [['områdets hörn. Jag märker ut alla']],
      [['fyra i figuren.']]
    ]);
    /* etiketterna i fri yta, aldrig på en linje eller ett skalvärde */
    [[0, 0, '(0, 0)', -98, 30], [100, 0, '(100, 0)', -118, -10],
     [50, 75, '(50, 75)', 14, -10], [0, 125, '(0, 125)', -104, -16]].forEach(function (h) {
      A.dot(h[0], h[1], BLUE);
      A.tag(h[0], h[1], h[2], h[3], h[4], BLUE);
      T.pause(140);
    });
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in varje hörn i']],
      [['målfunktionen V=500x+400y.']]
    ]);
    var SC = 0.82;   /* fyra rader i samma storlek; den längsta ryms då */
    y += 3.0 * F;
    T.str('(0, 0):  V=0', padL, y, null, SC);
    y += 1.9 * F;
    T.str('(100, 0):  V=500·100=50 000', padL, y, null, SC);
    y += 1.9 * F;
    var yMax = y;
    xx = T.str('(50, 75):  V=500·50+400·75=55 000', padL, y, null, SC);
    y += 1.9 * F;
    T.str('(0, 125):  V=400·125=50 000', padL, y, null, SC);
    T.stepEnd();

    tanke(y, [
      [['Störst vinst ger hörnet (50, 75).']],
      [['Kontroll: 600·50+400·75=60 000']],
      [['och 50+75=125. Båda gränserna nås.']]
    ]);
    T.ring(padL + T.adv('(50, 75):  V=500·50+400·75=', SC), xx, yMax);
    T.pause(200);
    y += 2.8 * F;
    T.str('Svar: 50 sittkuddar av modell A', padL, y);
    y += 2.0 * F;
    xe = T.str('och 75 av modell B', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

/* ma4-vt2018-penna.js: pennlösningar till Nationellt prov Ma 4, VT 2018.
 *
 * En scen per uppgift, registrerad som "ma4-vt2018-u<nr>". Filen består av
 * tre självständiga block, ett per delprov (B: 1–10, C: 11–19, D: 20–27);
 * varje block har sitt eget filhuvud med de regler som gäller där.
 * Granskning: node .claude/verify-handskrift.js ma4-vt2018-u1 …
 */

/* ma4-vt2018-delB-penna.js: pennlösningar till Nationellt prov Ma 4,
 * VT 2018, delprov B (uppgift 1–10).
 *
 * En scen per uppgift, registrerad som "ma4-vt2018-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md. De som oftast
 * bränner: inget bläck vid x > 696, inget med x > 420 ovanför y = 150
 * (y = 210 i ekvval-scener), en tanke per led direkt före ledet, division
 * alltid med vågrätt streck, samma antal klicksteg i båda
 * ekvationsredovisningarna. Tankebubblornas text är vanlig text (inte
 * pennans glyfer), så där skrivs inga ^-exponenter.
 *
 * Siffrorna är desamma som i textlösningen i data/np/ma4-vt2018-delB.js.
 *
 * Granskning: node .claude/verify-handskrift.js ma4-vt2018-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      mkEkvOp = V.mkEkvOp, mkMultIn = V.mkMultIn, humanize = V.humanize,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma4-vt2018-u' + nr, fn); }

  /* Ensiffrig ÖVRE integralgräns: sätts till höger om och ovanför ∫-
   * tecknets krok (samma läge som i ma4-vt2022-penna.js). */
  function ovreTal(T, F, x, yb, ch) {
    var x0 = x + 0.36 * F;
    return T.str(ch, x0, yb - 1.08 * F, null, 0.6) + 0.12 * F;
  }
  /* Flerteckens UNDRE integralgräns (−3): pennans _-syntax staplar bara
   * ett tecken, så gränsen skrivs här, vid krokens nederdel.
   * x0 = där ∫ börjar. */
  function undreGrans(T, F, x0, yb, s) {
    /* minustecknet ritas som eget streck i siffrans mitthöjd (pennans
     * '-' i 0,6-skala hamnar för lågt och läses som ett understreck) */
    var neg = s.charAt(0) === '-', dig = neg ? s.slice(1) : s;
    var xs = x0 + 0.26 * F, yl = yb + 0.52 * F;
    if (neg) {
      T.line([xs, yl - 0.27 * F], [xs + 0.26 * F, yl - 0.27 * F]);
      T.pause(80);
      xs += 0.34 * F;
    }
    T.str(dig, xs, yl, null, 0.6);
  }
  /* Bråk med kvadratrot i täljaren (√3 delat med 2): rottecknet ritas
   * med T.rot, aldrig som ett lösryckt √-tecken. */
  function rotBrak(T, F, inner, den, x0, yb) {
    var ybar = yb - 0.34 * F;
    var nw = T.rotW(inner), dw = T.adv(den);
    var w = Math.max(nw, dw) + 0.3 * F;
    T.rot(inner, x0 + (w - nw) / 2, ybar - 0.14 * F);
    T.pause(130);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(130);
    T.str(den, x0 + (w - dw) / 2, ybar + 1.04 * F);
    return x0 + w + 1.5;
  }
  /* z med konjugatstreck: skriver 'z' och drar strecket över. */
  function zbar(T, F, x, yb) {
    var xe = T.str('z', x, yb);
    T.acts.push({ kind: 'stroke', pts: humanize([[x + 0.18 * F, yb - 0.80 * F],
                                                 [xe - 0.06 * F, yb - 0.82 * F]]) });
    return xe;
  }
  /* REGELNOT (se filhuvudet i handskrift.js): regeln poppar upp i blått
   * ovanför raden och tonar ut när raden är klar. */
  function regelNot(T, F, text, x, yb) {
    var tmp = [], sc = 0.7;
    V.placeString(text, x, yb, (F / 100) * sc, F * sc, tmp, BLUE);
    var n = { pop: 1, wins: [],
              strokes: tmp.filter(function (a) { return a.kind === 'stroke'; }) };
    T.acts.push({ kind: 'show', obj: n });
    T.pause(520);
    return n;
  }
  function regelGom(T, n) {
    T.pause(320);
    T.acts.push({ kind: 'hide', obj: n });
    T.pause(200);
  }

  /* ================= Uppgift 1: period och minsta värde ================= */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 122;
    T.str('f(x)=1+2sin 3x', padL, y);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['Perioden för A sin Bx är 2π']],
      [['delat med B. Här är B=3.']]
    ]);
    y += 3.0 * F;
    xx = T.str('a) period=', padL, y);
    T.fracH('2π', '3', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('Svar: ', padL, y);
    xx = T.fracH('2π', '3', xx, y);
    xe = T.str(' (eller 120°)', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['sin 3x är aldrig mindre än −1.']],
      [['Då blir f som minst när']],
      [['sin 3x=−1.']]
    ], 1.35);
    y += 3.6 * F;
    xx = T.str('b) f', padL, y);
    xx = T.str('_m_i_n', xx - 0.1 * F, y);
    xx = T.str('=1+2·(-1)', xx, y);
    T.stepEnd();

    T.str('=1-2=-1', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: -1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 2: integral ur grafen ======================
   * Grafen skissas av (styckvis linjär), integralen delas i tre områden
   * med tecken: −1 under x-axeln, +1 och +2 ovanför. */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, xi;
    var tanke = mkTanke(T);
    var u = 54, ox = padL + 267, oy = 270;
    var A = mkAxes(T, F, { ox: ox, oy: oy, u: u,
                           xmin: -4.5, xmax: 4.5, ymin: -2.5, ymax: 3.5 });
    ox = A.ox; oy = A.oy; u = A.u;   /* rutnätssnäppt av mkAxes */

    /* ---- steg 1: grafen av ---- */
    A.axes();
    /* "2" på y-axeln lyfts över grafens vågräta del, som går rakt genom
     * talets vanliga läge. −4, −2 och 4 knuffas till den sida där grafen
     * ligger ovanför axeln, −3 åt vänster bort från gränslinjen i steg 2. */
    A.ticks(V.heltal(-4, 4), V.heltal(-2, 3), [-4, -3, -2, -1, 1, 2, 3, 4], [-2, -1, 1, 2, 3],
            { x: { '-4': -11, '-3': -12, '-2': 11, '4': -11 }, y: { '2': [0, -13] } });
    T.pause(200);
    var P = [[-4.5, 1], [-3, -2], [-1, 2], [2, 2], [4.35, -0.35]];
    for (var i = 1; i < P.length; i++) {
      T.line([A.X(P[i - 1][0]), A.Y(P[i - 1][1])], [A.X(P[i][0]), A.Y(P[i][1])], BLUE);
      T.pause(80);
    }
    T.str('y=f(x)', A.X(0.6), A.Y(2.9), null, 0.5);
    T.stepEnd();

    /* ---- steg 2: tre områden med tecken ---- */
    var figB = oy + 2.5 * u + 30;
    tanke(figB, [
      [['Integralen är arean mellan grafen']],
      [['och x-axeln från −3 till 0. Area']],
      [['under x-axeln räknas negativ.']]
    ], 0);
    /* streckad gräns x = −3 (x = 0 är y-axeln) */
    for (i = 0; i < 13; i += 2) {
      T.line([A.X(-3), A.Y(-2.4 + 5.0 * i / 13)], [A.X(-3), A.Y(-2.4 + 5.0 * (i + 1) / 13)], BLUE);
    }
    T.pause(160);
    /* "−1" i den smala triangeln: minustecknet som eget kort streck, så
     * att etiketten ryms mellan gränslinjen och grafen */
    var xm = A.X(-2.85), ym = A.Y(-1.0);
    T.line([xm, ym - 0.2 * F], [xm + 0.22 * F, ym - 0.2 * F], BLUE);
    T.str('1', xm + 0.3 * F, ym, BLUE, 0.42);
    T.pause(140);
    T.str('+1', A.X(-1.32) - T.adv('+1', 0.5) / 2, A.Y(0.45), BLUE, 0.5);
    T.pause(140);
    T.str('+2', A.X(-0.56) - T.adv('+2', 0.5) / 2, A.Y(1.45), BLUE, 0.5);
    T.stepEnd();

    /* ---- steg 3: integralen som summa ---- */
    tanke(figB, [
      [['Triangeln under axeln: 1·2/2=1.']],
      [['Triangeln ovanför: också 1.']],
      [['Rektangeln: 1·2=2.']]
    ], 0);
    y = figB + 80;
    xi = padL + 40;
    xx = T.str('∫', xi, y);
    undreGrans(T, F, xi, y, '-3');
    xx = ovreTal(T, F, xx, y, '0');
    xx = T.str('f(x) dx=-1+1+2', xx + 0.2 * F, y);
    T.stepEnd();

    T.str('=2', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: 2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 3: arg(z^5) med de Moivres formel ========== */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* raden med bråk når x > 420: läggs under mobilzonen (y < 150) */
    y = 200;
    xx = T.str('z=2(cos ', padL, y);
    xx = T.fracH('π', '6', xx, y);
    xx = T.str('+i sin ', xx, y);
    xx = T.fracH('π', '6', xx, y);
    T.str(')', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Polär form: talet framför']],
      [['parentesen är beloppet och']],
      [['vinkeln är argumentet.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('|z|=2   arg z=', padL + 30, y);
    T.fracH('π', '6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['De Moivres formel: vid femte']],
      [['potensen multipliceras']],
      [['argumentet med 5.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('arg(z^5)=5·', padL + 30, y);
    xx = T.fracH('π', '6', xx, y);
    T.stepEnd();

    xx = T.str('=', xx, y);
    T.fracH('5π', '6', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('Svar: ', padL, y);
    xx = T.fracH('5π', '6', xx, y);
    xe = T.str(' (eller 150°)', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 2.0 * F, padL: padL };
  });

  /* ================= Uppgift 4: exakta värden =========================== */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    /* raden når x > 420: läggs under mobilzonen (y < 150) */
    y = 180;
    xx = T.str('a) cos 390°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett helt varv, 360°, för tillbaka']],
      [['punkten till samma ställe.']]
    ]);
    xx = T.str('=cos(30°+360°)', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('=cos 30°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Exakt värde: cos 30° är roten']],
      [['ur 3 delat med 2.']]
    ]);
    xx = T.str('=', xx + 0.2 * F, y);
    rotBrak(T, F, '3', '2', xx, y);
    T.stepEnd();

    y += 3.6 * F;
    xx = T.str('Svar: ', padL, y);
    xe = rotBrak(T, F, '3', '2', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    /* ---- b) ---- */
    y += 3.4 * F;
    xx = T.str('b) sin 210°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett halvt varv, 180°, för punkten']],
      [['mitt emot. Då byter sinus tecken.']]
    ]);
    xx = T.str('=sin(30°+180°)', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('=-sin 30°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['sin 30° är en halv.']]
    ]);
    xx = T.str('=-', xx + 0.2 * F, y);
    T.fracH('1', '2', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('Svar: -', padL, y);
    xe = T.fracH('1', '2', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 2.0 * F, padL: padL };
  });

  /* ================= Uppgift 5: kurvan y = x·|x| ======================= */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe, v;
    var tanke = mkTanke(T);

    y = 122;
    T.str('y=x·|x|', padL, y);
    T.stepEnd();

    tanke(y, [
      [['För x ≥ 0 är beloppet talet']],
      [['självt: |x|=x.']]
    ]);
    y += 2.6 * F;
    T.str('x≥0:  y=x·x=x^2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['För x<0 är beloppet talet med']],
      [['omvänt tecken: |x|=−x.']]
    ]);
    y += 2.6 * F;
    T.str('x<0:  y=x·(-x)=-x^2', padL + 30, y);
    T.stepEnd();

    /* skiss: höger halva böjer uppåt, vänster halva nedåt */
    tanke(y, [
      [['Höger halva är en parabel uppåt,']],
      [['vänster halva en parabel nedåt.']]
    ]);
    var u = 52, ox = padL + 170, oy = y + 2.6 * F + 1.5 * u;
    var A = mkAxes(T, F, { ox: ox, oy: oy, u: u,
                           xmin: -1.3, xmax: 1.3, ymin: -1.3, ymax: 1.3 });
    ox = A.ox; oy = A.oy; u = A.u;   /* rutnätssnäppt av mkAxes */
    A.axes();
    T.pause(160);
    var kurva = [];
    for (v = -1.12; v <= 1.1201; v += 0.04) kurva.push([A.X(v), A.Y(v * Math.abs(v))]);
    acts.push({ kind: 'stroke', pts: kurva, color: BLUE });
    T.pause(140);
    /* y=x² vid halvan i första kvadranten (under kurvan), y=−x² vid
     * halvan i tredje (ovanför kurvan), fria från kurvan */
    T.str('y=x^2', A.X(0.74), A.Y(0.14), BLUE, 0.5);
    T.str('y=-x^2', A.X(-0.85) - T.adv('y=-x^2', 0.5), A.Y(-0.36), BLUE, 0.5);
    T.stepEnd();

    y = oy + 1.3 * u + 1.7 * u;
    xe = T.str('Svar: C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 6: asymptoterna x = 1 och y = 1 ============ */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 175;
    T.str('Sökes: asymptoterna x=1 och y=1', padL, y, null, 0.75);
    T.stepEnd();

    tanke(y, [
      [['Vertikal asymptot där nämnaren']],
      [['är noll. Den ska vara noll då']],
      [['x=1, och bara då.']]
    ], 0.1);
    y += 3.3 * F;
    T.str('Vertikala asymptoter, där nämnaren är noll', padL, y - 1.45 * F, null, 0.62);
    T.str('A, D: x=0', padL + 30, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('E: x=1 och x=-1', padL + 30, y);
    T.stepEnd();

    y += 2.1 * F;
    T.str('B, C: x=1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Horisontell asymptot: vad närmar']],
      [['sig y när x blir mycket stort?']]
    ]);
    y += 3.9 * F;
    T.str('Horisontella asymptoter: vad y går mot då x går mot ±∞', padL, y - 1.75 * F, null, 0.62);
    xx = T.str('B: y=', padL + 30, y);
    xx = T.fracH('1', 'x-1', xx, y);
    T.str('→0', xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['I C skriver jag täljaren så att']],
      [['nämnaren syns i den: x=(x−1)+1.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('C: y=', padL + 30, y);
    xx = T.fracH('x', 'x-1', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('(x-1)+1', 'x-1', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('=1+', padL + 30 + T.adv('C: y'), y);
    xx = T.fracH('1', 'x-1', xx, y);
    T.str('→1', xx + 0.2 * F, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: C', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 7: roten i första kvadranten ===============
   * EKVVAL: "+3" i ekvationen, "−3" och "+a" i olikheterna, i båda led
   * eller på väggen. */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg), multIn = mkMultIn(T);
    var x0 = padL + 30;
    var xw1 = x0 + T.adv('z-3=a(1-i)') + 0.9 * F;
    var xw2 = x0 + T.adv('3+a>0') + 0.9 * F;

    /* väggens operation hamnar till höger om x = 420: raden läggs under
     * ekvval-scenernas förbjudna hörn (y < 210) */
    y = 242;
    T.str('z-3=a(1-i)', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 3 i båda led, så att']],
      [['z står ensamt.']]
    ]);
    y = ekvOp(y, '+3', xw1, 'z-3=a(1-i)');
    var ys = y;
    xx = T.str('z=', x0, y);
    var xa0 = xx; xx = T.str('a', xx, y); var xa1 = xx;
    xx = T.str('(', xx, y);
    var x10 = xx; xx = T.str('1', xx, y); var x11 = xx;
    var xi0 = xx; xx = T.str('-i', xx, y); var xi1 = xx;
    T.str(')+3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['a multipliceras med varje term']],
      [['i parentesen.']]
    ]);
    /* bågarna ritas UNDER källraden: ovanför ligger raden med +3 */
    y += 3.1 * F;
    xx = T.str('z=', x0, y);
    xx = multIn(xx, y, ys - 0.95 * F, [
      { fran: [xa0, xa1], till: [x10, x11], skriv: 'a', hojd: 17, under: true },
      { fran: [xa0, xa1], till: [xi0, xi1], skriv: '-ai', hojd: 27, under: true, dx: 3 }
    ]);
    T.str('+3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['a är reellt. Realdelen är 3+a och']],
      [['imaginärdelen det som står']],
      [['framför i, alltså −a.']]
    ]);
    y += 2.4 * F;
    T.str('Re z=3+a    Im z=-a', x0, y);
    T.stepEnd();

    tanke(y, [
      [['I första kvadranten är både']],
      [['realdelen och imaginärdelen']],
      [['positiva.']]
    ]);
    y += 3.4 * F;
    T.str('Första kvadranten: Re z>0 och Im z>0', padL, y - 1.45 * F, null, 0.62);
    T.str('3+a>0', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 3 i båda led.']]
    ]);
    y = ekvOp(y, '-3', xw2, '3+a>0');
    T.str('a>-3', x0, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('-a>0', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar a i båda led. Då']],
      [['behöver olikhetstecknet inte']],
      [['vändas.']]
    ]);
    y = ekvOp(y, '+a', xw2, '-a>0');
    xx = T.str('0>a', x0, y);
    T.stepEnd();

    T.str('⟺  a<0', xx + 0.4 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Båda villkoren ska gälla']],
      [['samtidigt.']]
    ]);
    y += 2.6 * F;
    T.str('-3<a<0', x0, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: -3<a<0', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= Uppgift 8: primitiv funktion till sin 5x cos 5x ====
   * Formeln för dubbla vinkeln (regelnot), division med 2 i båda led
   * (EKVVAL), sedan en primitiv funktion till sin 10x. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var x0 = padL + 30;
    var xw = x0 + T.adv('sin 10x=2sin 5x cos 5x') + 0.9 * F;

    y = 122;
    T.str('f(x)=sin 5x cos 5x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Produkten skriver jag om med']],
      [['formeln för dubbla vinkeln, med']],
      [['vinkeln 5x.']]
    ]);
    y = 252;
    var not = regelNot(T, F, 'sin 2v=2sin v cos v', x0, y - 1.5 * F);
    T.str('sin 10x=2sin 5x cos 5x', x0, y);
    regelGom(T, not);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 2.']]
    ]);
    y = ekvOp(y, '/2', xw, 'sin 10x=2sin 5x cos 5x', { vopt: { h0: 1.05, h1: 0.3 } });
    if (vagg) y += 0.6 * F;
    xx = T.fracH('sin 10x', '2', x0, y);
    T.str('=sin 5x cos 5x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Funktionen kan alltså skrivas']],
      [['som ett enda sinusuttryck.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('f(x)=', padL, y);
    T.fracH('sin 10x', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En primitiv funktion till sin 10x']],
      [['är −cos 10x delat med 10, och']],
      [['faktorn en halv följer med.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('F(x)=', padL, y);
    xx = T.fracH('1', '2', xx, y);
    xx = T.str('·(-', xx, y);
    xx = T.fracH('cos 10x', '10', xx, y);
    xx = T.str(')', xx, y);
    T.stepEnd();

    xx = T.str('=-', xx + 0.2 * F, y);
    T.fracH('cos 10x', '20', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: när jag deriverar F']],
      [['ska jag få tillbaka f.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('F’(x)=', padL, y);
    xx = T.fracH('10sin 10x', '20', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('sin 10x', '2', xx, y);
    T.str('=f(x)', xx, y);
    T.stepEnd();

    y += 3.6 * F;
    xx = T.str('Svar: F(x)=-', padL, y);
    xe = T.fracH('cos 10x', '20', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 2.0 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= Uppgift 9: fyra sammansatta funktioner ============ */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var x0 = padL + 30;

    y = 185;
    xx = T.str('f(x)=', padL, y);
    xx = T.rot('x', xx, y);
    T.str('   g(x)=cos x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['√x växer långsamt och cos x']],
      [['svänger mellan −1 och 1. Summan']],
      [['svänger kring kurvan y=√x.']]
    ]);
    y += 2.8 * F;
    xx = T.str('f(x)+g(x)=', x0, y);
    xx = T.rot('x', xx, y);
    xx = T.str('+cos x', xx, y);
    T.str('→ D', xx + 0.4 * F, y, BLUE);
    T.stepEnd();

    tanke(y, [
      [['I produkten multipliceras']],
      [['svängningarna med √x. De blir']],
      [['större och större.']]
    ]);
    y += 2.8 * F;
    xx = T.str('f(x)·g(x)=', x0, y);
    xx = T.rot('x', xx, y);
    xx = T.str('·cos x', xx, y);
    T.str('→ C', xx + 0.4 * F, y, BLUE);
    T.stepEnd();

    tanke(y, [
      [['Roten finns bara där cos x ≥ 0.']],
      [['Det ger små bågar med glapp']],
      [['emellan, högst 1.']]
    ]);
    y += 2.8 * F;
    xx = T.str('f(g(x))=', x0, y);
    xx = T.rot('cos x', xx, y);
    T.str('→ B', xx + 0.4 * F, y, BLUE);
    T.stepEnd();

    tanke(y, [
      [['cos √x börjar i 1 för x=0. Roten']],
      [['växer allt långsammare, så']],
      [['svängningarna blir allt längre.']]
    ]);
    y += 2.8 * F;
    xx = T.str('g(f(x))=cos ', x0, y);
    xx = T.rot('x', xx, y);
    T.str('→ A', xx + 0.4 * F, y, BLUE);
    T.stepEnd();

    y += 2.6 * F;
    T.str('Svar: f(x)+g(x): D   f(x)·g(x): C', padL, y);
    y += 2.1 * F;
    xe = T.str('f(g(x)): B   g(f(x)): A', padL + 1.9 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 10: |z + z̄| = |z − z̄| ======================
   * z = x + yi ger 2|x| = 2|y|; division med 2 (EKVVAL) ger |x| = |y|,
   * alltså linjerna y = x och y = −x, som ritas i talplanet. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, v;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var x0 = padL + 30;
    var xw = x0 + T.adv('2|x|=2|y|') + 0.9 * F;

    /* ekvval: raderna når x > 420, så skriften börjar under y = 210 */
    y = 240;
    xx = T.str('|', padL, y);
    xx = zbar(T, F, T.str('z+', xx, y), y);
    xx = T.str('|=|z-', xx, y);
    xx = zbar(T, F, xx, y);
    T.str('|', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag skriver z=x+yi. Konjugatet']],
      [['har imaginärdelen med omvänt']],
      [['tecken: x−yi.']]
    ]);
    y += 2.6 * F;
    xx = T.str('z+', x0, y);
    xx = zbar(T, F, xx, y);
    T.str('=x+yi+x-yi=2x', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('z-', x0, y);
    xx = zbar(T, F, xx, y);
    T.str('=x+yi-(x-yi)=2yi', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Beloppet är avståndet till origo:']],
      [['2x ligger 2|x| från origo och 2yi']],
      [['ligger 2|y| från origo.']]
    ]);
    y += 3.3 * F;
    T.str('Beloppen sätts lika', padL, y - 1.45 * F, null, 0.62);
    T.str('2|x|=2|y|', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 2.']]
    ]);
    y = ekvOp(y, '/2', xw, '2|x|=2|y|');
    if (vagg) y += 0.3 * F;
    T.str('|x|=|y|', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Samma belopp: talen är lika eller']],
      [['har motsatt tecken.']]
    ]);
    y += 2.6 * F;
    T.str('y=x eller y=-x', x0, y);
    T.stepEnd();

    /* talplanet med de två linjerna */
    tanke(y, [
      [['Båda är räta linjer genom origo.']],
      [['Dem ritar jag i talplanet.']]
    ]);
    var u = 27, ox = padL + 190, oy = y + 1.4 * F + 6.0 * u;
    var A = mkAxes(T, F, { ox: ox, oy: oy, u: u,
                           xmin: -5, xmax: 5, ymin: -5, ymax: 5 });
    ox = A.ox; oy = A.oy; u = A.u;   /* rutnätssnäppt av mkAxes */
    /* egna axlar: beteckningarna Re och Im är två tecken, och mkAxes
     * axes() skriver bara en glyf */
    var xr = A.X(5) + 0.85 * u, yt = A.Y(5) - 0.85 * u;
    V.linjalStreck(T.acts, [A.X(-5) - 0.5 * u, oy], [xr, oy]);   /* axlar med linjal */
    T.line([xr - 9, oy - 5], [xr + 1, oy]);
    T.line([xr - 9, oy + 5], [xr + 1, oy]);
    T.pause(140);
    V.linjalStreck(T.acts, [ox, A.Y(-5) + 0.5 * u], [ox, yt]);
    T.line([ox - 5, yt + 9], [ox, yt - 1]);
    T.line([ox + 5, yt + 9], [ox, yt - 1]);
    T.pause(140);
    T.str('Re', xr - 14, oy + 0.95 * F, null, 0.5);
    T.str('Im', ox + 10, yt + 8, null, 0.5);
    A.ticks(V.heltal(-5, 5), V.heltal(-5, 5), [-4, -2, 2, 4], [-4, -2, 2, 4]);
    T.pause(160);
    A.linjal([A.X(-5.3), A.Y(-5.3)], [A.X(5.3), A.Y(5.3)], BLUE);
    T.pause(140);
    A.linjal([A.X(-5.3), A.Y(5.3)], [A.X(5.3), A.Y(-5.3)], BLUE);
    T.pause(140);
    T.str('y=x', A.X(4.5), A.Y(3.0), BLUE, 0.5);
    T.str('y=-x', A.X(-4.5) - T.adv('y=-x', 0.5), A.Y(3.0), BLUE, 0.5);
    T.stepEnd();

    y = oy + 5.5 * u + 2.4 * F;
    T.str('Svar: Linjerna y=x och y=-x', padL, y);
    y += 2.1 * F;
    xe = T.str('(Im z=Re z och Im z=-Re z)', padL + 1.9 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

/* ma4-vt2018-delC-penna.js: pennlösningar till NP Ma 4 VT 2018, delprov C
 * (uppgift 11–19, utan digitala verktyg).
 *
 * En scen per uppgift, registrerad som "ma4-vt2018-u<nr>". Reglerna står i
 * handskrift.js filhuvud och i data/np/RIKTLINJER.md: inget bläck vid
 * x > 696, inget med x > 420 ovanför y = 150 (y = 210 i ekvval-scener), en
 * tanke per led direkt före ledet, division med vågrätt streck, och samma
 * antal klicksteg i båda ekvationsredovisningarna (mkEkvOp + ekvval: 1).
 *
 * Samma siffror som textlösningen i data/np/ma4-vt2018-delC.js, eftersom
 * eleven växlar mellan vyerna. Hjälparna (regelNot, segs, fracCB, zbar)
 * är kopierade ur ma4-vt2022-penna.js. Polynomdivisionen i uppgift 17
 * ställs upp som en trappa precis som layoutPolynomdivision i handskrift.js
 * (se CLAUDE.md, "Polynomdivision ställs alltid upp som en trappa").
 *
 * Granskning: node .claude/verify-handskrift.js ma4-vt2018-u11 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkEkvOp = V.mkEkvOp, substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma4-vt2018-u' + nr, fn); }

  /* ---------- gemensamma småhjälpare ---------- */

  /* REGELNOT (se REGELNOT i handskrift.js filhuvud): blå text i pennans
   * glyfer som tonar in på en gång medan raden skrivs och tonar ut när
   * raden är klar. */
  function regelNot(T, F, text, x, yb) {
    var tmp = [], sc = 0.7;
    V.placeString(text, x, yb, (F / 100) * sc, F * sc, tmp, BLUE);
    var n = { pop: 1, wins: [],
              strokes: tmp.filter(function (a) { return a.kind === 'stroke'; }) };
    T.acts.push({ kind: 'show', obj: n });
    T.pause(520);
    return n;
  }
  function regelGom(T, n) {
    T.pause(320);
    T.acts.push({ kind: 'hide', obj: n });
    T.pause(200);
  }

  /* SEGMENT PÅ EN RAD: skriver [text, färg]-delarna efter varandra och
   * returnerar slut-x och varje dels x-intervall (för bågar och ringar). */
  function segs(T, lista, x, yb, sc) {
    var pos = [];
    lista.forEach(function (s) {
      var x0 = x;
      x = T.str(s[0], x, yb, s[1] || null, sc);
      pos.push([x0, x]);
    });
    return { x: x, pos: pos };
  }
  function segsW(T, lista, sc) {
    var w = 0;
    lista.forEach(function (s) { w += T.adv(s[0], sc); });
    return w;
  }

  /* BRÅK MED EGEN TÄLJARE: täljare och nämnare skrivs av funktioner, så
   * att bågar, ringar och blå delar kan läggas in medan de skrivs.
   * Skrivordning täljare, streck, nämnare. */
  function fracCB(T, F, numW, numFn, denW, denFn, x0, yb, sc, denHog) {
    sc = sc == null ? 1 : sc;
    var f = F * sc, ybar = yb - 0.34 * f;
    var w = Math.max(numW, denW) + 0.3 * f;
    numFn(x0 + (w - numW) / 2, ybar - 0.14 * f);
    T.pause(130);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(130);
    denFn(x0 + (w - denW) / 2, ybar + 1.04 * f + (denHog ? 0.4 * f : 0));
    return x0 + w + 1.5;
  }
  function fracSegs(T, F, num, den, x0, yb, sc) {
    var r = {};
    var x = fracCB(T, F, segsW(T, num, sc), function (x, yn) {
      r.num = segs(T, num, x, yn, sc); r.yNum = yn;
    }, segsW(T, den, sc), function (x, yd) {
      r.den = segs(T, den, x, yd, sc); r.yDen = yd;
    }, x0, yb, sc, den.some(function (s) { return s[0].indexOf('^') >= 0; }));
    r.x = x;
    return r;
  }

  /* KONJUGATET z med streck över: z skrivs först och strecket dras sedan
   * ovanför, som för hand. Returnerar nästa x. */
  function zbar(T, F, x, yb, col, sc) {
    sc = sc == null ? 1 : sc;
    var x1 = T.str('z', x, yb, col || null, sc);
    T.pause(110);
    T.line([x + 0.02 * F * sc, yb - 0.80 * F * sc],
           [x1 - 0.04 * F * sc, yb - 0.80 * F * sc], col || null);
    return x1;
  }

  /* ================= DELPROV C ================= */

  /* ---- Uppgift 11: sin 2x = 1/2 ----
   * Exakt värde: sin 30° = 1/2. Två lösningsfamiljer för 2x (30° och
   * 180° − 30°), sedan division med 2 i båda led. Till sist samma
   * lösningar i radianer. */
  reg(11, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, acts = T.acts, y, xx, xe, xe2;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);

    function delaMed2(hl) {
      return function (yb) {
        var x = T.fracH('2x', '2', padL + 30, yb, null, BLUE);
        x = T.str('=', x, yb);
        T.fracH(hl + '+n·360°', '2', x, yb, null, BLUE);
      };
    }
    function delaUpp(yb, hl, halv, svar) {
      var x = T.str('x=', padL + 30, yb);
      x = T.fracH(hl, '2', x, yb);
      x = T.str('+', x, yb);
      T.fracH('n·360°', '2', x, yb);
      T.stepEnd();
      tanke(yb, [
        [[hl + ' delat med 2 är ' + halv + ', och']],
        [['360° delat med 2 är 180°.']]
      ], 1.05);
      yb += 3.0 * F;
      T.str(svar, padL + 30, yb);
      T.stepEnd();
      return yb;
    }
    var OPT2 = { dy: 3.2, dyRes: 3.0, dyVagg: 3.0, vopt: { h0: 1.25, h1: 1.15 } };

    y = 130;
    xx = T.str('sin 2x=', padL, y);
    T.fracH('1', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['1/2 är ett exakt värde. Det är']],
      [['sinus för 30°, känt från triangeln']],
      [['med vinklarna 30°, 60° och 90°.']]
    ], 1.05);
    y += 4.4 * F;
    xx = T.str('sin 30°=', padL, y);
    T.fracH('1', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sinus är y-koordinaten. Två']],
      [['vinklar per varv har samma höjd:']],
      [['30° och 180°-30°. Argumentet är']],
      [['hela 2x.']]
    ], 1.05);

    /* ---- första lösningen ---- */
    y += 4.4 * F;
    T.str('Första lösningen', padL, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    xx = T.str('2x=30°+n·360°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 2.']],
      [['Då delas även perioden 360°']],
      [['med 2.']]
    ]);
    y = ekvOp(y, '/2', xx + 0.6 * F, delaMed2('30°'), OPT2);
    y = delaUpp(y, '30°', '15°', 'x=15°+n·180°');

    /* ---- andra lösningen ---- */
    y += 3.2 * F;
    T.str('Andra lösningen', padL, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    T.str('2x=180°-30°+n·360°', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('2x=150°+n·360°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Samma division med 2 här.']]
    ]);
    y = ekvOp(y, '/2', xx + 0.6 * F, delaMed2('150°'), OPT2);
    y = delaUpp(y, '150°', '75°', 'x=75°+n·180°');

    /* ---- radianer ---- */
    tanke(y, [
      [['Samma lösningar i radianer:']],
      [['180° är π, så 15° är π/12,']],
      [['75° är 5π/12 och 180° är π.']]
    ]);
    y += 3.4 * F;
    T.str('I radianer', padL, y, null, 0.62);
    T.pause(200);
    y += 2.6 * F;
    xx = T.str('x=', padL, y);
    xx = T.fracH('π', '12', xx, y);
    T.str('+n·π', xx, y);
    T.pause(300);
    xx = T.str('x=', padL + 300, y);
    xx = T.fracH('5π', '12', xx, y);
    T.str('+n·π', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: sin(2·15°)=sin 30° och']],
      [['sin(2·75°)=sin 150°. Båda är 1/2.']]
    ], 1.05);
    y += 4.0 * F;
    xe = T.str('Svar: x=15°+n·180°', padL, y);
    y += 2.3 * F;
    xe2 = T.str('och x=75°+n·180°', padL + T.adv('Svar: '), y);
    T.str('(n heltal)', xe2 + 0.5 * F, y, null, 0.62);
    T.underline(Math.max(xe, xe2), y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 12: (2+i)/(3−i) på formen a+bi ----
   * EN SAMMANHÄNGANDE KEDJA: varje rad är hela bråket ett steg längre.
   * Förlängningen med konjugatet görs i två drag (fracOp). Täljaren
   * multipliceras ut med en båge per produkt, nämnaren med konjugatregeln
   * som regelnot i ett eget klick. Likadana termer ringas in innan de
   * slås ihop. */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T), not;

    y = 150;
    T.str('Skriver på formen a+bi', padL, y - 1.9 * F, null, 0.62);
    T.fracH('2+i', '3-i', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett i i nämnaren vill jag bli av']],
      [['med. Jag förlänger med nämnarens']],
      [['konjugat 3+i, då blir nämnaren']],
      [['reell.']]
    ], 1.05);
    y += 6.6 * F;
    T.str('Förlänger med nämnarens konjugat', padL, y - 4.1 * F, null, 0.62);
    xx = T.str('=', padL + 20, y);
    var w0 = Math.max(T.adv('(2+i)'), T.adv('(3-i)')) + 0.3 * F;
    var xNum = xx + (w0 - T.adv('(2+i)')) / 2, yNum = y - 0.48 * F;
    function iv(pre, del) { var a = xNum + T.adv(pre); return [a, a + T.adv(del)]; }
    var P2 = iv('(', '2'), Pi = iv('(2+', 'i');
    var P3 = iv('(2+i)(', '3'), Pi2 = iv('(2+i)(3', '+i');
    T.fracOp('(2+i)', '(3-i)', '(3+i)', xx, y);
    T.stepEnd();

    /* ---- täljaren multipliceras ut ---- */
    tanke(y, [
      [['I täljaren: varje term i den första']],
      [['parentesen gånger varje term i den']],
      [['andra.']]
    ], 1.05);
    y += 6.6 * F;
    T.str('Multiplicerar ut täljaren och nämnaren', padL, y - 3.4 * F, null, 0.62);
    xx = T.str('=', padL + 20, y);
    var D = [
      { fran: P2, till: P3, skriv: '6', hojd: 20 },
      { fran: P2, till: Pi2, skriv: '+2i', hojd: 32, dx: 3, dx2: 4 },
      { fran: Pi, till: P3, skriv: '+3i', hojd: 42, dx2: -3 },
      { fran: Pi, till: Pi2, skriv: '+i^2', hojd: 52, dx: 3, dx2: 6 }
    ];
    var numW3 = T.adv('6+2i+3i+i^2'), denS3 = '3^2-i^2';
    var wD3 = Math.max(numW3, T.adv(denS3)) + 0.3 * F, ybar3 = y - 0.34 * F;
    multIn(xx + (wD3 - numW3) / 2, y - 0.48 * F, yNum - 0.95 * F, D);
    T.pause(130);
    acts.push({ kind: 'stroke', pts: humanize([[xx, ybar3], [xx + wD3, ybar3]]) });
    T.stepEnd();

    tanke(y, [
      [['Nämnaren är ett tal gånger sitt']],
      [['konjugat. Konjugatregeln ger den']],
      [['direkt.']]
    ], 1.3);
    not = regelNot(T, F, '(a-b)(a+b)=a^2-b^2', padL + 30, y + 2.9 * F);
    T.str(denS3, xx + (wD3 - T.adv(denS3)) / 2, ybar3 + 1.04 * F + 0.2 * F);
    regelGom(T, not);
    xx += wD3 + 1.5;
    T.stepEnd();

    /* ---- ihopslagning och 3^2 ---- */
    tanke(y, [
      [['2i och 3i slås ihop till 5i.']],
      [['I nämnaren är 3^2=9.']]
    ], 1.3);
    var y3n = y - 0.48 * F;
    y += 5.4 * F;
    xx = T.str('=', padL + 20, y);
    xx = fracCB(T, F, T.adv('6+5i+i^2'), function (x, yn) {
      x = T.str('6', x, yn);
      var r1 = T.ring(D[1].x0 + T.adv('+'), D[1].x1, y3n);
      T.pause(260);
      var r2 = T.ring(D[2].x0 + T.adv('+'), D[2].x1, y3n);
      T.pause(220);
      x = T.str('+5i', x, yn);
      T.pause(260);
      T.fade(r1); T.fade(r2);
      T.str('+i^2', x, yn);
    }, T.adv('9-i^2'), function (x, yd) { T.str('9-i^2', x, yd); }, xx, y, 1, true);
    T.stepEnd();

    /* ---- i^2 = −1 ---- */
    tanke(y, [
      [['i^2=-1 i både täljare och']],
      [['nämnare: +i^2 blir -1 och']],
      [['-i^2 blir +1.']]
    ], 1.3);
    var y4 = y, R5;
    xx = T.str('=', xx, y4);
    R5 = fracSegs(T, F, [['6'], ['+5i'], ['-1']], [['9+1']], xx, y4);
    xx = R5.x;
    T.stepEnd();

    tanke(y4, [
      [['Realdelarna 6 och -1 slås ihop,']],
      [['och 9+1=10.']]
    ], 1.3);
    var p5 = R5.num.pos, y5n = R5.yNum;
    y4 += 5.0 * F;
    xx = T.str('=', padL + 20, y4);
    xx = fracCB(T, F, T.adv('5+5i'), function (x, yn) {
      var r1 = T.ring(p5[0][0], p5[0][1], y5n);
      T.pause(260);
      var r2 = T.ring(p5[2][0], p5[2][1], y5n);
      T.pause(220);
      x = T.str('5', x, yn);
      T.pause(260);
      T.fade(r1); T.fade(r2);
      T.str('+5i', x, yn);
    }, T.adv('10'), function (x, yd) { T.str('10', x, yd); }, xx, y4);
    T.stepEnd();

    tanke(y4, [
      [['Nämnaren är reell, så realdelen']],
      [['och imaginärdelen delas med 10']],
      [['var för sig.']]
    ], 1.05);
    var y5 = y4;
    xx = T.str('=', xx, y5);
    xx = T.fracH('5', '10', xx, y5);
    xx = T.str('+', xx, y5);
    xx = T.fracH('5', '10', xx, y5);
    xx = T.str('i', xx, y5);
    T.stepEnd();

    xx = T.str('=0,5+0,5i', xx, y5);
    T.stepEnd();

    tanke(y5, [
      [['Kontroll: (0,5+0,5i)(3-i)=']],
      [['1,5-0,5i+1,5i-0,5i^2=2+i. Stämmer.']]
    ], 1.05);
    y = y5 + 4.0 * F;
    xe = T.str('Svar: 0,5+0,5i', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 13: f(x) = (2x − 5)^6, beräkna f'(3) ----
   * Kedjeregeln (yttre derivatan gånger inre derivatan), sedan insättning
   * av x = 3 med ringar: tretalet i f'(3) och x i derivatans parentes. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);

    y = 150;
    T.str('f(x)=(2x-5)^6', padL, y);
    y += 2.4 * F;
    var s0 = padL + T.adv('Söker f’(');
    var s1 = s0 + T.adv('3');
    var yS = y;
    T.str('Söker f’(3)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Funktionen är sammansatt. Yttre']],
      [['funktionen är potensen u^6 och']],
      [['inre funktionen är u=2x-5.']]
    ]);
    y += 4.6 * F;
    T.str('Deriverar med kedjeregeln', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('f’(x)=6(2x-5)^5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Yttre derivatan ska gångras med']],
      [['inre derivatan, och derivatan av']],
      [['2x-5 är 2.']]
    ]);
    xx = T.str('·2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['6·2=12.']]
    ]);
    var d0 = xx + T.adv('=12(2');
    var d1 = d0 + T.adv('x');
    var yD = y;
    T.str('=12(2x-5)^5', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Nu sätter jag in x=3 på x:s plats.']]
    ]);
    r = substRings(acts, [[s0, s1, yS, F], [d0, d1, yD, F]]);
    y += 3.0 * F;
    xx = T.str('f’(3)=12(2·3-5)^5', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['2·3-5=1, och 1 upphöjt till']],
      [['vad som helst är 1.']]
    ]);
    xx = T.str('=12·1^5', xx, y);
    T.stepEnd();

    xx = T.str('=12', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: f’(3)=12', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: z + z̄ och z · z̄ är reella ----
   * z skrivs på allmän form, insättningen görs med ringar, imaginärdelarna
   * ringas in och tar ut varandra i summan, och produkten utvecklas med
   * konjugatregeln (regelnot) och i^2 = −1. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r, not;
    var tanke = mkTanke(T);

    y = 150;
    T.str('Undersöker allmänt med z=a+bi', padL, y - 1.9 * F, null, 0.62);
    var zA0 = padL + T.adv('z=');
    var zA1 = T.str('z=a+bi', padL, y);
    T.pause(300);
    xx = zbar(T, F, padL + 230, y);
    var zB0 = T.str('=', xx, y);
    var zB1 = T.str('a-bi', zB0, y);
    var y1 = y;
    T.stepEnd();

    /* ---- summan ---- */
    tanke(y, [
      [['Först Connys påstående: summan']],
      [['av z och konjugatet. Jag sätter in']],
      [['a+bi och a-bi.']]
    ]);
    y += 4.4 * F;
    T.str('Summan', padL, y - 1.9 * F, null, 0.62);
    var s0 = padL;
    xx = T.str('z+', padL, y);
    xx = zbar(T, F, xx, y);
    var s1 = xx;
    xx = T.str('=', xx, y);
    r = substRings(acts, [[zA0, zA1, y1, F], [zB0, zB1, y1, F], [s0, s1, y, F]]);
    xx = T.str('(a+bi)+(a-bi)', xx, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['Plus framför parenteserna: de']],
      [['kan tas bort utan teckenbyte.']]
    ]);
    var y2 = y + 2.8 * F;
    xx = T.str('=', padL + 60, y2);
    var S = segs(T, [['a'], ['+bi'], ['+a'], ['-bi']], xx, y2);
    xx = S.x;
    T.stepEnd();

    tanke(y2, [
      [['bi och -bi tar ut varandra, och']],
      [['a+a=2a.']]
    ]);
    xx = T.str('=', xx, y2);
    var rA = T.ring(S.pos[1][0] + T.adv('+'), S.pos[1][1], y2);
    T.pause(260);
    var rB = T.ring(S.pos[3][0], S.pos[3][1], y2);
    T.pause(420);
    T.fade(rA); T.fade(rB);
    T.pause(200);
    rA = T.ring(S.pos[0][0], S.pos[0][1], y2);
    T.pause(260);
    rB = T.ring(S.pos[2][0] + T.adv('+'), S.pos[2][1], y2);
    T.pause(220);
    xx = T.str('2a', xx, y2);
    T.pause(260);
    T.fade(rA); T.fade(rB);
    T.stepEnd();

    tanke(y2, [
      [['a är reellt, så 2a är reellt,']],
      [['vilka a och b vi än väljer.']]
    ]);
    y = y2 + 2.6 * F;
    T.str('Summan är alltid reell: Conny har rätt.', padL, y, null, 0.8);
    T.stepEnd();

    /* ---- produkten ---- */
    tanke(y, [
      [['Nu Yugats påstående: produkten.']],
      [['Samma insättning.']]
    ]);
    y += 4.4 * F;
    T.str('Produkten', padL, y - 1.9 * F, null, 0.62);
    var p0 = padL;
    xx = T.str('z·', padL, y);
    xx = zbar(T, F, xx, y);
    var p1 = xx;
    xx = T.str('=', xx, y);
    r = substRings(acts, [[zA0, zA1, y1, F], [zB0, zB1, y1, F], [p0, p1, y, F]]);
    xx = T.str('(a+bi)(a-bi)', xx, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['En summa gånger en differens av']],
      [['samma två termer: konjugatregeln.']]
    ]);
    var y3 = y + 2.8 * F;
    not = regelNot(T, F, '(p+q)(p-q)=p^2-q^2', padL + 300, y3 + 2.2 * F);
    xx = T.str('=a^2-(bi)^2', padL + 60, y3);
    regelGom(T, not);
    T.stepEnd();

    tanke(y3, [
      [['(bi)^2=b^2i^2.']]
    ]);
    xx = T.str('=a^2-b^2i^2', xx, y3);
    T.stepEnd();

    tanke(y3, [
      [['i^2=-1, så -b^2i^2 blir +b^2.']]
    ]);
    xx = T.str('=a^2+b^2', xx, y3);
    T.stepEnd();

    tanke(y3, [
      [['a och b är reella, så a^2+b^2']],
      [['är reellt.']]
    ]);
    y = y3 + 2.6 * F;
    T.str('Produkten är alltid reell: Yugat har rätt.', padL, y, null, 0.8);
    T.stepEnd();

    tanke(y, [
      [['Båda gäller för alla komplexa tal.']],
      [['Exempel: z=3+2i ger summan 6']],
      [['och produkten 9+4=13.']]
    ]);
    y += 3.0 * F;
    xe = T.str('Svar: Båda påståendena är sanna', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 15: (1 − sin 2v)/(sin v − cos v) ----
   * a) nämnaren = 0: +cos v och /cos v i båda led (båda lägena), tan v = 1.
   * b) ettan och sin 2v skrivs om (två regelnoter, ett klick var),
   * kvadreringsregeln baklänges och förkortning i två drag (fracOp). */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, not;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var SC = 0.85;

    /* ---- a) ---- */
    y = 150;
    T.str('a)', padL, y - 1.9 * F, null, 0.62);
    xx = T.fracH('1-sin 2v', 'sin v-cos v', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett bråk är inte definierat när']],
      [['nämnaren är 0. Jag sätter nämnaren']],
      [['lika med 0.']]
    ], 1.05);
    y += 4.6 * F;
    T.str('Nämnaren får inte vara 0', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('sin v-cos v=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar cos v till båda led.']]
    ]);
    y = ekvOp(y, '+cos v', xx + 0.6 * F, 'sin v-cos v=0', { x0: padL });
    xx = T.str('sin v=cos v', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med cos v.']],
      [['Det går: är cos v=0 så är sin v=±1,']],
      [['och då är de inte lika.']]
    ]);
    y = ekvOp(y, '/cos v', xx + 0.6 * F, 'sin v=cos v',
              { x0: padL, dy: 3.2, dyRes: 3.0, dyVagg: 2.4, vopt: { h0: 1.05, h1: 0.3 } });
    T.str('tan v=1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['tan 45°=1. Tangens har perioden']],
      [['180°: ett halvt varv bort är sinus']],
      [['och cosinus lika igen.']]
    ]);
    y += 2.8 * F;
    T.str('v=45°+n·180°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I radianer är 45° lika med π/4']],
      [['och 180° lika med π.']]
    ]);
    xx = T.str('v=', padL + 330, y);
    xx = T.fracH('π', '4', xx, y);
    T.str('+n·π', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: v=45°+n·180°', padL, y);
    T.str('(n heltal)', xe + 0.5 * F, y, null, 0.62);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Nu b). Jag förenklar vänsterledet']],
      [['tills det blir högerledet.']]
    ]);
    y += 4.6 * F;
    T.str('b)', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('VL=', padL, y);
    var vl0 = xx;
    T.fracH('1-sin 2v', 'sin v-cos v', xx, y);
    T.stepEnd();

    /* två regler på samma rad: två klick (REGEL EN REGELNOT PER KLICKSTEG) */
    tanke(y, [
      [['Ettan skriver jag med trigonomet-']],
      [['riska ettan.']]
    ], 1.05);
    var y2 = y + 4.4 * F;
    xx = T.str('=', padL + 20, y2);
    var NUM1 = 'sin^2v+cos^2v', NUM2 = '-2sin v cos v', DEN = 'sin v-cos v';
    var numW = T.adv(NUM1, SC) + T.adv(NUM2, SC);
    var wB = Math.max(numW, T.adv(DEN, SC)) + 0.3 * F * SC;
    var ybar2 = y2 - 0.34 * F * SC, yn2 = ybar2 - 0.14 * F * SC;
    var xn = xx + (wB - numW) / 2;
    not = regelNot(T, F, 'sin^2v+cos^2v=1', padL + 360, y2 + 3.0 * F);
    xn = T.str(NUM1, xn, yn2, null, SC);
    regelGom(T, not);
    T.stepEnd();

    tanke(y2, [
      [['sin 2v skriver jag med formeln']],
      [['för dubbla vinkeln.']]
    ], 1.05);
    not = regelNot(T, F, 'sin 2v=2sin v cos v', padL + 360, y2 + 3.0 * F);
    T.str(NUM2, xn, yn2, null, SC);
    T.pause(130);
    acts.push({ kind: 'stroke', pts: humanize([[xx, ybar2], [xx + wB, ybar2]]) });
    T.pause(130);
    T.str(DEN, xx + (wB - T.adv(DEN, SC)) / 2, ybar2 + 1.04 * F * SC, null, SC);
    regelGom(T, not);
    T.stepEnd();

    tanke(y2, [
      [['Jag ordnar täljaren så att den']],
      [['dubbla produkten står i mitten.']]
    ], 1.1);
    var y3 = y2 + 4.4 * F;
    xx = T.str('=', padL + 20, y3);
    T.fracH('sin^2v-2sin v cos v+cos^2v', 'sin v-cos v', xx, y3, null, null);
    T.stepEnd();

    tanke(y3, [
      [['Täljaren är andra kvadrerings-']],
      [['regeln baklänges, med sin v och']],
      [['cos v.']]
    ], 1.1);
    var y4 = y3 + 4.4 * F;
    not = regelNot(T, F, '(p-q)^2=p^2-2pq+q^2', padL + 360, y4 + 3.0 * F);
    xx = T.str('=', padL + 20, y4);
    xx = T.fracH('(sin v-cos v)^2', 'sin v-cos v', xx, y4);
    regelGom(T, not);
    T.stepEnd();

    tanke(y4, [
      [['sin v-cos v finns i både täljare']],
      [['och nämnare och är inte 0 där']],
      [['uttrycket är definierat. Jag']],
      [['förkortar bort den.']]
    ], 1.1);
    var y5 = y4 + 4.4 * F;
    xx = T.str('=', padL + 20, y5);
    T.fracOp('(sin v-cos v)^2', 'sin v-cos v', '/(sin v-cos v)', xx, y5);
    T.stepEnd();

    var y6 = y5 + 3.2 * F;
    T.str('=sin v-cos v', padL + 20, y6);
    T.stepEnd();

    tanke(y6, [
      [['Högerledet är sin v-cos v.']]
    ]);
    var y7 = y6 + 2.6 * F;
    T.str('HL=sin v-cos v', padL, y7);
    T.stepEnd();

    y = y7 + 2.8 * F;
    xe = T.str('VL=HL, likheten är visad', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 16: tangenten till √(2x − 1) där x = 5 ----
   * Punkten (5, 3) först. Roten skrivs som potens, deriveras med
   * kedjeregeln och skrivs tillbaka ett steg i taget (negativ exponent →
   * bråk → rottecken). k = f'(5), och m bestäms som i ma3c-3.6: k och
   * punkten sätts in i y = kx + m, och −5/3 dras från båda led (båda
   * redovisningslägena, ekvval). */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);

    y = 150;
    xx = T.str('f(x)=', padL, y);
    var rx0 = xx + 0.15 * F + 0.46 * F + T.adv('2');
    var rx1 = rx0 + T.adv('x');
    T.rot('2x-1', xx + 0.15 * F, y);
    var yF = y;
    y += 2.6 * F;
    var v0 = padL + T.adv('Tangerar där x=');
    var v1 = v0 + T.adv('5');
    T.str('Tangerar där x=5', padL, y);
    var yV = y;
    T.stepEnd();

    /* ---- punkten ---- */
    tanke(y, [
      [['Tangenten och grafen har punkten']],
      [['där x=5 gemensam. Jag sätter in']],
      [['x=5 i f(x).']]
    ]);
    r = substRings(acts, [[v0, v1, yV, F], [rx0, rx1, yF, F]]);
    y += 4.6 * F;
    T.str('Bestämmer tangeringspunkten', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('f(5)=', padL, y);
    xx = T.rot('2·5-1', xx + 0.15 * F, y);
    fadeRings(acts, r);
    T.stepEnd();

    xx = T.str('=', xx + 0.2 * F, y);
    xx = T.rot('9', xx + 0.15 * F, y);
    T.stepEnd();

    xx = T.str('=3', xx + 0.2 * F, y);
    T.pause(300);
    var pt0 = xx + 0.8 * F, yPt = y;
    var pt1 = T.str('Punkten (5, 3)', pt0, y, null, 0.72);
    T.stepEnd();

    /* ---- derivatan ---- */
    tanke(y, [
      [['För lutningen behövs derivatan.']],
      [['Roten är detsamma som exponenten']],
      [['1/2.']]
    ]);
    y += 4.2 * F;
    T.str('Skriver roten som potens', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('f(x)=(2x-1)', padL, y);
    T.fracSup('1', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kedjeregeln: yttre derivatan']],
      [['gånger inre derivatan 2. Exponenten']],
      [['minskar med 1, till -1/2.']]
    ]);
    y += 4.0 * F;
    T.str('Deriverar med kedjeregeln', padL, y - 2.2 * F, null, 0.62);
    xx = T.str('f’(x)=', padL, y);
    xx = T.fracH('1', '2', xx, y);
    xx = T.str('(2x-1)', xx, y);
    xx = T.fracSup('-1', '2', xx, y);
    xx = T.str('·2', xx + 0.1 * F, y);
    T.stepEnd();

    tanke(y, [
      [['1/2·2=1.']]
    ], 1.05);
    xx = T.str('=(2x-1)', xx, y);
    T.fracSup('-1', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Den negativa exponenten betyder']],
      [['att potensen står i nämnaren.']]
    ], 1.05);
    y += 4.4 * F;
    xx = T.str('f’(x)=', padL, y);
    var denW = T.adv('(2x-1)') + T.fracSupW('1', '2');
    fracCB(T, F, T.adv('1'), function (x, yn) { T.str('1', x, yn); },
           denW, function (x, yd) {
             var x1 = T.str('(2x-1)', x, yd + 0.25 * F);
             T.fracSup('1', '2', x1, yd + 0.25 * F);
           }, xx, y, 1, true);
    T.stepEnd();

    tanke(y, [
      [['Exponenten 1/2 är en kvadratrot.']]
    ], 1.4);
    y += 4.6 * F;
    xx = T.str('f’(x)=', padL, y);
    var dr0 = xx + (T.rotW('2x-1') + 0.3 * F - T.rotW('2x-1')) / 2 + 0.46 * F + T.adv('2');
    var dr1 = dr0 + T.adv('x');
    var yDr = y;
    fracCB(T, F, T.adv('1'), function (x, yn) { T.str('1', x, yn); },
           T.rotW('2x-1'), function (x, yd) { T.rot('2x-1', x, yd); }, xx, y, 1, true);
    T.stepEnd();

    /* ---- lutningen ---- */
    tanke(y, [
      [['Tangentens lutning k är derivatans']],
      [['värde i x=5.']]
    ], 1.4);
    r = substRings(acts, [[v0, v1, yV, F], [dr0, dr1, yDr + 1.1 * F, F]]);
    y += 4.8 * F;
    xx = T.str('k=f’(5)=', padL, y);
    xx = fracCB(T, F, T.adv('1'), function (x, yn) { T.str('1', x, yn); },
                T.rotW('2·5-1'), function (x, yd) { T.rot('2·5-1', x, yd); }, xx, y, 1, true);
    fadeRings(acts, r);
    T.stepEnd();

    xx = T.str('=', xx, y);
    xx = fracCB(T, F, T.adv('1'), function (x, yn) { T.str('1', x, yn); },
                T.rotW('9'), function (x, yd) { T.rot('9', x, yd); }, xx, y, 1, true);
    T.stepEnd();

    xx = T.str('=', xx, y);
    var k0 = xx;
    var k1 = T.fracH('1', '3', xx, y);
    var yK = y;
    T.stepEnd();

    /* ---- m ----
     * −5/3 i båda led. vaggOp skriver bara text, så väggsteget med bråk
     * ritas här: blått streck + minus + bråk med vågrätt streck, samma
     * klicksteg som båda led-raden. */
    function minusFemTredjedelar(yb, xw, bodaLed) {
      if (vagg) {
        T.pause(220);
        T.line([xw, yb - 1.25 * F], [xw, yb + 1.15 * F], BLUE);
        T.pause(200);
        var xo = T.str('-', xw + 0.45 * F, yb, BLUE);
        T.fracH('5', '3', xo, yb, BLUE);
        T.stepEnd();
        return yb + 3.2 * F;
      }
      return ekvOp(yb, '-5/3', xw, bodaLed, { dy: 3.4, dyRes: 3.4 });
    }

    tanke(y, [
      [['Tangenten är en rät linje y=kx+m.']],
      [['Jag sätter in k=1/3.']]
    ], 1.4);
    y += 4.8 * F;
    T.str('Bestämmer m i tangentens ekvation y=kx+m', padL, y - 2.0 * F, null, 0.62);
    r = substRings(acts, [[k0, k1, yK - 0.35 * F, F, { ry: 1.45 * F, cy: yK - 0.35 * F }]]);
    xx = T.str('y=', padL, y);
    var yL0 = padL, yL1;
    xx = T.fracH('1', '3', xx, y);
    yL1 = T.str('x+m', xx, y);
    var yL = y;
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['Punkten (5, 3) ligger på linjen.']],
      [['Jag sätter in x=5 och y=3.']]
    ], 1.05);
    r = substRings(acts, [[pt0, pt1, yPt, F * 0.72],
                          [yL0, yL1, yL - 0.35 * F, F, { ry: 1.45 * F, cy: yL - 0.35 * F }]]);
    y += 4.0 * F;
    xx = T.str('3=', padL, y);
    xx = T.fracH('1', '3', xx, y);
    xx = T.str('·5+m', xx, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['1/3·5=5/3.']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.str('3=', padL, y);
    xx = T.fracH('5', '3', xx, y);
    xx = T.str('+m', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 5/3 från båda led,']],
      [['så att m står ensamt.']]
    ], 1.05);
    y = minusFemTredjedelar(y, xx + 0.6 * F, function (yb) {
      var x = T.str('3', padL + 30, yb);
      x = T.str('-', x, yb, BLUE);
      x = T.fracH('5', '3', x, yb, BLUE);
      x = T.str('=', x, yb);
      x = T.fracH('5', '3', x, yb);
      x = T.str('+m', x, yb);
      x = T.str('-', x, yb, BLUE);
      T.fracH('5', '3', x, yb, BLUE);
    });
    xx = T.str('3-', padL + 30, y);
    xx = T.fracH('5', '3', xx, y);
    T.str('=m', xx, y);
    T.stepEnd();

    tanke(y, [
      [['3 är 9/3, så bråken får samma']],
      [['nämnare.']]
    ], 1.05);
    y += 3.8 * F;
    xx = T.fracH('9', '3', padL + 30, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('5', '3', xx, y);
    T.str('=m', xx, y);
    T.stepEnd();

    y += 3.8 * F;
    xx = T.str('m=', padL + 30, y);
    T.fracH('4', '3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: x=5 ger y=5/3+4/3=3,']],
      [['så linjen går genom (5, 3).']]
    ], 1.05);
    y += 4.4 * F;
    xe = T.str('Svar: y=', padL, y);
    xe = T.fracH('x', '3', xe, y);
    xe = T.str('+', xe, y);
    xe = T.fracH('4', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.9 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 17: z^3 + 4z^2 + 3z + 12 = 0 med roten z = −4 ----
   * Faktorsatsen ger faktorn z + 4. TRAPPAN som i layoutPolynomdivision:
   * täljaren först, strecket ovanför, det lodräta strecket och nämnaren i
   * trappsteget. Varje varv: ringa nämnarens z och radens första term,
   * skriv kvotens term, produkten under termerna med samma grad, minus och
   * parentes framför, strecket och allt som blir kvar. Sedan z^2 + 3 = 0
   * (−3 i båda led, roten ur som egen rad). */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), adv = T.adv;
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var x0 = padL + 66, dy = 1.85 * F;

    function dragBort(xs, xe2, yb) {
      var xp = xs - adv('(');
      T.str('-', xp - adv('-'), yb);
      T.pause(160);
      T.str('(', xp, yb);
      T.pause(160);
      return T.str(')', xe2, yb);
    }
    function streck(xa, xb, yb) {
      T.line([xa, yb + 0.42 * F], [xb, yb + 0.42 * F]);
    }

    y = 150;
    T.str('z^3+4z^2+3z+12=0', padL, y);
    y += 2.4 * F;
    T.str('Lösning: z=-4', padL, y);
    T.stepEnd();

    tanke(y, [
      [['z=-4 är en lösning. Enligt']],
      [['faktorsatsen är då z-(-4)=z+4']],
      [['en faktor. Jag dividerar med z+4.']]
    ]);

    /* ---- täljaren och trappan ----
     * Allt till höger om x = 420 ligger under y = 210 (ekvval-scenens
     * högre inställningsruta). */
    var yD = y + 5.4 * F, yQ = yD - 1.78 * F;
    var DIV = 'z^3+4z^2+3z+12';
    var xD = T.str(DIV, x0, yD);
    T.stepEnd();

    var yL = yD - 1.24 * F, yB = yD + 0.42 * F, xv = xD + 0.30 * F;
    T.line([x0 - 0.15 * F, yL], [xv, yL]);
    T.pause(120);
    T.line([xv, yL], [xv, yB]);
    T.pause(120);
    T.line([xv, yB], [xv + adv('z+4') + 0.9 * F, yB]);
    T.stepEnd();

    var xn = xv + 0.45 * F;
    T.str('z+4', xn, yD);
    T.stepEnd();

    /* först nämnarens z, sedan radens första term */
    function ringaIn(xs, ledS, yb) {
      return substRings(acts, [
        [xn, xn + adv('z'), yD, F],
        [xs, xs + adv(ledS) + 0.12 * F, yb, F]
      ]);
    }

    var k1 = x0 + adv('z^3+4z^2+');          /* 3z */
    /* ---- varv 1 ---- */
    tanke(yD, [
      [['z^3 delat med nämnarens z är z^2.']],
      [['Det är kvotens första term.']]
    ]);
    var ringar = ringaIn(x0, 'z^3', yD);
    var xq = T.str('z^2', x0, yQ);
    T.stepEnd();

    tanke(yD, [
      [['z^2 gånger (z+4) är z^3+4z^2.']],
      [['Varje term skriver jag under']],
      [['termen med samma grad.']]
    ]);
    fadeRings(acts, ringar);
    y = yD + dy;
    xe = T.str('z^3+4z^2', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Hela produkten ska dras bort,']],
      [['så den får en parentes med']],
      [['minus framför.']]
    ]);
    dragBort(x0, xe, y);
    T.stepEnd();

    streck(x0 - adv('(') - 0.1 * F, xD + 0.1 * F, y);
    T.stepEnd();

    tanke(y, [
      [['z^3-z^3=0 och 4z^2-4z^2=0.']],
      [['Kvar blir 3z+12, som jag skriver']],
      [['av som det står.']]
    ], 0.42);
    var yR1 = y + dy;
    var xR1 = T.str('3z+12', k1, yR1);
    var r1z0 = k1 + adv('3z');               /* +12 */
    T.stepEnd();

    /* ---- varv 2 ---- */
    tanke(yR1, [
      [['3z delat med z är 3.']]
    ]);
    ringar = ringaIn(k1, '3z', yR1);
    xq = T.str('+3', xq, yQ);
    T.stepEnd();

    tanke(yR1, [
      [['3 gånger (z+4) är 3z+12.']]
    ]);
    fadeRings(acts, ringar);
    y = yR1 + dy;
    xe = T.str('3z+12', k1, y);
    T.stepEnd();

    dragBort(k1, xe, y);
    T.stepEnd();

    streck(k1 - adv('(') - 0.1 * F, Math.max(xR1, xe) + 0.1 * F, y);
    T.pause(200);
    var y0 = y + dy;
    T.str('0', r1z0 + adv('+1'), y0);
    T.stepEnd();

    tanke(y0, [
      [['Resten blev 0, så z+4 går jämnt']],
      [['upp. Kvoten står överst, ovanför']],
      [['strecket.']]
    ]);
    T.ring(x0 - 0.55 * F, xq + 0.6 * F, yQ, { ry: 0.84 * F, cy: yQ - 0.4 * F });
    T.stepEnd();

    tanke(y0, [
      [['Kvoten är den andra faktorn. Samma']],
      [['fås med gruppering: z^2(z+4)+3(z+4).']],
      [['En produkt är noll när någon av']],
      [['faktorerna är noll.']]
    ]);
    y = y0 + 3.0 * F;
    T.str('(z+4)(z^2+3)=0', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('Faktorn z+4 ger den kända lösningen z=-4.', padL, y, null, 0.72);
    T.stepEnd();

    tanke(y, [
      [['De övriga lösningarna kommer från']],
      [['den andra faktorn.']]
    ]);
    y += 3.4 * F;
    T.str('Löser andra faktorn', padL, y - 1.6 * F, null, 0.62);
    xx = T.str('z^2+3=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 3 från båda led.']]
    ]);
    y = ekvOp(y, '-3', xx + 0.6 * F, 'z^2+3=0', { x0: padL });
    T.str('z^2=-3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led. Glöm inte']],
      [['den negativa roten.']]
    ]);
    y += 2.8 * F;
    xx = T.str('z=±', padL, y);
    T.rot('-3', xx + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['√-3 är i√3, eftersom']],
      [['(i√3)^2=i^2·3=-3.']]
    ]);
    y += 2.8 * F;
    xx = T.str('z=±i', padL, y);
    T.rot('3', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: z=±i', padL, y);
    xe = T.rot('3', xe + 0.2 * F, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 18: f(x) = |x − 1| + x − 1 är aldrig negativ ----
   * Två fall efter tecknet på x − 1. Absolutbeloppet ersätts med
   * insättning (ringar), minustecknet framför parentesen byter tecken
   * (blått), och termer som tar ut varandra ringas in. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);

    y = 150;
    var a0 = padL + T.adv('f(x)=');
    var a1 = a0 + T.adv('|x-1|');
    T.str('f(x)=|x-1|+x-1', padL, y);
    var yF = y;
    T.stepEnd();

    tanke(y, [
      [['Absolutbeloppet beror på tecknet']],
      [['på x-1, som byter tecken vid x=1.']],
      [['Jag delar upp i två fall.']]
    ]);

    /* ---- fall 1 ---- */
    y += 4.4 * F;
    T.str('Fall 1: x≥1', padL, y - 1.9 * F, null, 0.62);
    T.str('Då är x-1≥0, så |x-1|=x-1', padL, y, null, 0.8);
    var b0 = padL + T.adv('Då är x-1≥0, så |x-1|=', 0.8);
    var b1 = b0 + T.adv('x-1', 0.8);
    var yB = y;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in x-1 i stället för']],
      [['|x-1|.']]
    ]);
    r = substRings(acts, [[b0, b1, yB, F], [a0, a1, yF, F]]);
    y += 2.8 * F;
    xx = T.str('f(x)=(x-1)+x-1', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['x+x=2x och -1-1=-2.']]
    ]);
    y += 2.6 * F;
    xx = T.str('=2x-2', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna har faktorn 2.']],
      [['Jag bryter ut den.']]
    ]);
    xx = T.str('=2(', xx, y);
    T.stepEnd();

    xx = T.str('x', xx, y);
    T.stepEnd();

    xx = T.str('-1)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['För x≥1 är x-1≥0, och då är']],
      [['också 2(x-1)≥0.']]
    ]);
    T.str('≥0', xx + 0.3 * F, y);
    T.stepEnd();

    /* ---- fall 2 ---- */
    y += 4.2 * F;
    T.str('Fall 2: x<1', padL, y - 1.9 * F, null, 0.62);
    T.str('Då är x-1<0, så |x-1|=-(x-1)', padL, y, null, 0.8);
    var c0 = padL + T.adv('Då är x-1<0, så |x-1|=', 0.8);
    var c1 = c0 + T.adv('-(x-1)', 0.8);
    var yC = y;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in -(x-1) i stället för']],
      [['|x-1|.']]
    ]);
    r = substRings(acts, [[c0, c1, yC, F], [a0, a1, yF, F]]);
    y += 2.8 * F;
    xx = T.str('f(x)=-(x-1)+x-1', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['Minustecknet framför parentesen']],
      [['byter tecken på båda termerna.']]
    ]);
    var y2 = y + 2.6 * F;
    xx = T.str('=', padL + 60, y2);
    var S = segs(T, [['-x', BLUE], ['+1', BLUE], ['+x'], ['-1']], xx, y2);
    xx = S.x;
    T.stepEnd();

    tanke(y2, [
      [['-x och x tar ut varandra, och']],
      [['1 och -1 tar ut varandra.']]
    ]);
    xx = T.str('=', xx, y2);
    var rA = T.ring(S.pos[0][0], S.pos[0][1], y2);
    T.pause(260);
    var rB = T.ring(S.pos[2][0] + T.adv('+'), S.pos[2][1], y2);
    T.pause(420);
    T.fade(rA); T.fade(rB);
    T.pause(200);
    rA = T.ring(S.pos[1][0] + T.adv('+'), S.pos[1][1], y2);
    T.pause(260);
    rB = T.ring(S.pos[3][0], S.pos[3][1], y2);
    T.pause(420);
    T.fade(rA); T.fade(rB);
    T.pause(200);
    T.str('0', xx, y2);
    T.stepEnd();

    tanke(y2, [
      [['I båda fallen är f(x)≥0, och']],
      [['fallen täcker alla x.']]
    ]);
    y = y2 + 3.0 * F;
    T.str('f(x)≥0 för alla x', padL, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: Signes påstående är korrekt', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 19: maximum i x = 0 för ax^2 − 6x + b sin 3x ----
   * f'(0) = 0 ger b = 2 (+6 och /3 i båda led, båda lägena).
   * Andraderivatan ger f''(0) = 2a: maximum om a < 0, minimum om a > 0.
   * Fallet a = 0 utreds med derivatans tecken: terrasspunkt. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var SC = 0.85;

    y = 248;
    T.str('f(x)=ax^2-6x+b sin 3x', padL, y);
    y += 2.4 * F;
    var m0 = padL + T.adv('Maximum då x=');
    var m1 = m0 + T.adv('0');
    T.str('Maximum då x=0', padL, y);
    var yMx = y;
    T.stepEnd();

    tanke(y, [
      [['f är deriverbar överallt, så i en']],
      [['maximipunkt måste derivatan vara 0.']],
      [['b sin 3x deriveras med kedjeregeln.']]
    ]);
    y += 4.6 * F;
    T.str('Derivatan måste vara 0 i x=0', padL, y - 1.9 * F, null, 0.62);
    var e0 = padL + T.adv('f’(x)=2a');
    var e1 = e0 + T.adv('x');
    var g0 = padL + T.adv('f’(x)=2ax-6+3b cos 3');
    var g1 = g0 + T.adv('x');
    T.str('f’(x)=2ax-6+3b cos 3x', padL, y);
    var yD1 = y;
    T.stepEnd();

    tanke(y, [
      [['Jag sätter in x=0.']]
    ]);
    r = substRings(acts, [[m0, m1, yMx, F], [e0, e1, yD1, F], [g0, g1, yD1, F]]);
    y += 2.8 * F;
    xx = T.str('f’(0)=2a·0-6+3b cos 0', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['2a·0=0 och cos 0=1.']]
    ]);
    y += 2.4 * F;
    T.str('=-6+3b', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Derivatan ska vara 0.']]
    ]);
    y += 2.8 * F;
    xx = T.str('-6+3b=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 6 till båda led.']]
    ]);
    y = ekvOp(y, '+6', xx + 0.6 * F, '-6+3b=0', { x0: padL });
    xx = T.str('3b=6', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 3.']]
    ]);
    y = ekvOp(y, '/3', xx + 0.6 * F, '3b=6', { x0: padL, dyVagg: 2.4 });
    T.str('b=2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Med ett annat b är f’(0) inte 0,']],
      [['och då kan x=0 inte vara ett']],
      [['maximum.']]
    ]);
    y += 2.6 * F;
    T.str('Maximum kräver b=2.', padL, y, null, 0.8);
    T.stepEnd();

    /* ---- andraderivatan ---- */
    tanke(y, [
      [['Maximum, minimum eller terrass-']],
      [['punkt avgörs med andraderivatan.']],
      [['3b cos 3x ger -9b sin 3x.']]
    ]);
    y += 4.4 * F;
    T.str('Andraderivatan', padL, y - 1.9 * F, null, 0.62);
    T.str('f’’(x)=2a-9b sin 3x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['I x=0 är sin 0=0.']]
    ]);
    y += 2.6 * F;
    xx = T.str('f’’(0)=2a-9b sin 0', padL, y);
    T.stepEnd();

    xx = T.str('=2a', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Negativ andraderivata: grafen']],
      [['vänder nedåt, alltså maximum.']],
      [['Positiv: minimum.']]
    ]);
    y += 2.6 * F;
    T.str('a<0: f’’(0)<0, maximum', padL, y, null, SC);
    T.pause(300);
    y += 2.0 * F;
    T.str('a>0: f’’(0)>0, minimum', padL, y, null, SC);
    T.stepEnd();

    tanke(y, [
      [['Är a=0 blir f’’(0)=0, och då säger']],
      [['andraderivatan ingenting. Det']],
      [['fallet undersöker jag för sig.']]
    ]);
    y += 2.0 * F;
    T.str('a=0: f’’(0)=0, avgör inte', padL, y, null, SC);
    T.stepEnd();

    /* ---- fallet a = 0 ---- */
    tanke(y, [
      [['Med a=0 och b=2 studerar jag']],
      [['derivatans tecken.']]
    ]);
    y += 4.0 * F;
    T.str('Fallet a=0, b=2', padL, y - 1.9 * F, null, 0.62);
    T.str('f(x)=-6x+2sin 3x', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    xx = T.str('f’(x)=-6+6cos 3x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna har faktorn 6.']],
      [['Jag bryter ut den.']]
    ]);
    y += 2.6 * F;
    xx = T.str('=6(', padL + 60, y);
    T.stepEnd();

    xx = T.str('cos 3x', xx, y);
    T.stepEnd();

    xx = T.str('-1)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['cos 3x är högst 1, så parentesen']],
      [['är aldrig positiv.']]
    ]);
    T.str('≤0', xx + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['f’=0 bara där cos 3x=1, alltså i']],
      [['x=n·2π/3. Det är isolerade punkter,']],
      [['och annars är f’ negativ. f är strängt']],
      [['avtagande, så f(x)>f(0) för x<0.']],
      [['x=0 är inget maximum.']]
    ]);
    y += 2.6 * F;
    T.str('f avtar: x=0 är en terrasspunkt.', padL, y, null, 0.8);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: a<0 och b=2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

/* ma4-vt2018-delD-penna.js: pennlösningar till NP Ma 4 VT 2018, delprov D
 * (uppgift 20–27, digitala verktyg tillåtna).
 *
 * En scen per uppgift, registrerad som "ma4-vt2018-u<nr>". Reglerna står i
 * handskrift.js filhuvud och i data/np/RIKTLINJER.md: inget bläck vid
 * x > 696, inget med x > 420 ovanför y = 150 (y = 210 i ekvval-scener), en
 * tanke per led direkt före ledet, division med vågrätt streck, och samma
 * antal klicksteg i båda ekvationsredovisningarna (mkEkvOp).
 *
 * Där verktyget räknar (skärningspunkt, integraler som saknar primitiv
 * funktion i kursen) säger tanken vad som räknas och varför. Siffrorna är
 * exakt desamma som i textlösningen (data/np/ma4-vt2018-delD.js).
 *
 * Granskning: node .claude/verify-handskrift.js ma4-vt2018-u20 … ma4-vt2018-u27
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      mkEkvOp = V.mkEkvOp, substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, BLUE = V.BLUE, PAPER_W = V.PAPER_W;

  function reg(nr, fn) { HK.registrera('ma4-vt2018-u' + nr, fn); }

  /* liten grå rubrik (redovisning, står kvar även utan tankar) */
  function rubrik(T, s, x, yb) { return T.str(s, x, yb, null, 0.62); }

  /* skriv en sträng och returnera dess x-intervall */
  function del(T, s, x, yb, col) { var x1 = T.str(s, x, yb, col || null); return [x, x1]; }

  /* kurva ur sin funktion, tätt samplad */
  function kurva(A, acts, f, x0, x1, col, n) {
    var pts = [], i, x;
    n = n || 60;
    for (i = 0; i <= n; i++) {
      x = x0 + (x1 - x0) * i / n;
      pts.push([A.X(x), A.Y(f(x))]);
    }
    acts.push({ kind: 'stroke', pts: pts, color: col || null });
  }
  /* skuggning med blåa lodräta streck mellan två funktioner */
  function skugga(T, A, acts, fo, fu, x0, x1, dx) {
    for (var x = x0 + dx / 2; x < x1; x += dx) {
      acts.push({ kind: 'stroke', color: BLUE,
        pts: humanize([[A.X(x), A.Y(fu(x))], [A.X(x), A.Y(fo(x))]]) });
      T.pause(30);
    }
  }
  /* streckad linje med n delsträckor */
  function streckad(T, p1, p2, col, n) {
    n = n || 15;
    for (var i = 0; i < n; i += 2) {
      T.acts.push({ kind: 'stroke', color: col || null, pts: humanize([
        [p1[0] + (p2[0] - p1[0]) * i / n, p1[1] + (p2[1] - p1[1]) * i / n],
        [p1[0] + (p2[0] - p1[0]) * (i + 1) / n, p1[1] + (p2[1] - p1[1]) * (i + 1) / n]]) });
    }
  }

  /* Integraltecken med gränser som pennan inte klarar själv: en undre
   * gräns med flera tecken (1,5 eller −3) ritas till vänster om krokens
   * nederdel, och den övre gränsen till höger om och ovanför kroken (samma
   * läge som ovreTal i ma4-vt2022-penna.js). Returnerar x efter tecknet
   * och gränserna. */
  function integral(T, F, x, yb, lo, hi) {
    var xs = x + 0.42 * F + Math.max(0, T.adv(lo, 0.62) - 0.40 * F);
    var x1 = T.str('∫', xs, yb);
    T.str(lo, xs + 0.10 * F - T.adv(lo, 0.62), yb + 0.30 * F, null, 0.62);
    var x2 = T.str(hi, x1 + 0.06 * F, yb - 1.10 * F, null, 0.62);
    return Math.max(x1, x2) + 0.14 * F;
  }

  /* Högt rottecken över en integrand med bråk och stora parenteser: en
   * tydlig krok, ett brant streck ned under raden, upp till rotstrecket
   * som går hela vägen över innehållet (bredd w). Returnerar innehållets x. */
  function rotTecken(T, F, x, yb, w, yTop, yBot) {
    var xV = x + 0.62 * F;
    T.acts.push({ kind: 'stroke', pts: [
      [x, yb - 0.30 * F], [x + 0.18 * F, yb - 0.46 * F],
      [x + 0.36 * F, yBot], [xV, yTop], [xV + w, yTop], [xV + w + 0.04 * F, yTop + 0.18 * F]] });
    T.pause(150);
    return xV + 0.14 * F;
  }

  /* Bråk vars täljare och nämnare byggs av delar: {s:'10'} skrivs som
   * text och {r:'80'} som rottecken. Ett rottecken i nämnaren sänker
   * nämnaren så att rotstrecket aldrig ligger på bråkstrecket.
   * Returnerar { x, num: [[x0,x1],…], den: [[x0,x1],…] }. */
  function delW(T, d) { return d.r != null ? T.rotW(d.r) + 0.12 * F0(T) : T.adv(d.s) + (d.s === '·' ? 0.24 * F0(T) : 0); }
  function F0(T) { return T.s * 100; }
  function fracDelar(T, F, num, den, x0, yb, col) {
    var nw = 0, dw = 0, i, x, out = { num: [], den: [] };
    num.forEach(function (d) { nw += delW(T, d); });
    den.forEach(function (d) { dw += delW(T, d); });
    var w = Math.max(nw, dw) + 0.3 * F, ybar = yb - 0.34 * F;
    var dRot = den.some(function (d) { return d.r != null; });
    var nRot = num.some(function (d) { return d.r != null; });
    var yN = ybar - 0.14 * F - (nRot ? 0.10 * F : 0);
    var yD = ybar + 1.04 * F + (dRot ? 0.26 * F : 0);
    x = x0 + (w - nw) / 2;
    for (i = 0; i < num.length; i++) {
      var a = x;
      x = num[i].r != null ? T.rot(num[i].r, x + 0.12 * F, yN)
        : (num[i].s === '·' ? T.str('·', x + 0.12 * F, yN) + 0.12 * F : T.str(num[i].s, x, yN, col || null));
      out.num.push([a, x, yN]);
    }
    T.pause(130);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(130);
    x = x0 + (w - dw) / 2;
    for (i = 0; i < den.length; i++) {
      var b = x;
      x = den[i].r != null ? T.rot(den[i].r, x + 0.12 * F, yD) : T.str(den[i].s, x, yD, col || null);
      out.den.push([b, x, yD]);
    }
    out.x = x0 + w + 1.5;
    return out;
  }

  /* TRIGONOMETRISK KVOT ur figuren (REGEL TRIGONOMETRISK UPPSTÄLLNING):
   * samma gest som trigKvot i handskrift.js, men nämnaren får vara ett
   * rottecken ({r:'80'}). Vinkeln ringas in, ordet för varje del tonar in,
   * pennan sveper längs sidan i figuren och skriver sedan delen. */
  function trigKvotD(T, F, o) {
    var acts = T.acts;
    var ring = { kind: 'stroke', color: BLUE,
                 pts: V.ringPts(o.ring[0], o.ring[1], o.ring[2], o.ring[3]) };
    acts.push(ring);
    T.pause(420);
    var xx = T.str(o.fn, o.x, o.y);
    var ybar = o.y - 0.34 * F;
    var nw = T.adv(o.num.txt), dw = delW(T, o.den.d);
    var fw = Math.max(nw, dw) + 0.3 * F;
    var dRot = o.den.d.r != null;
    var noteX = xx + fw + 0.5 * F;
    var n1 = { note: 1, x: noteX, y: ybar - 0.14 * F, fs: 14,
               text: o.num.ord, anchor: 'start', wins: [] };
    var n2 = { note: 1, x: noteX, y: ybar + 1.04 * F, fs: 14,
               text: o.den.ord, anchor: 'start', wins: [] };
    acts.push({ kind: 'show', obj: n1 });
    T.pause(320);
    acts.push({ kind: 'sweep', pts: humanize(o.num.svep) });
    T.pause(380);
    T.str(o.num.txt, xx + (fw - nw) / 2, ybar - 0.14 * F);
    T.pause(130);
    acts.push({ kind: 'stroke', pts: humanize([[xx, ybar], [xx + fw, ybar]]) });
    T.pause(130);
    acts.push({ kind: 'show', obj: n2 });
    T.pause(320);
    acts.push({ kind: 'sweep', pts: humanize(o.den.svep) });
    T.pause(380);
    var yD = ybar + 1.04 * F + (dRot ? 0.26 * F : 0);
    if (dRot) T.rot(o.den.d.r, xx + (fw - dw) / 2, yD);
    else T.str(o.den.d.s, xx + (fw - dw) / 2, yD);
    T.pause(300);
    acts.push({ kind: 'hide', obj: n1 });
    acts.push({ kind: 'hide', obj: n2 });
    T.pause(340);
    return { x: xx + fw + 0.15 * F, ring: ring };
  }

  /* REGELNOT (se REGELNOT i handskrift.js filhuvud): blå text i pennans
   * glyfer som tonar in på en gång och tonar ut när raden är klar. */
  function regelNot(T, F, text, x, yb) {
    var tmp = [], sc = 0.7;
    V.placeString(text, x, yb, (F / 100) * sc, F * sc, tmp, BLUE);
    var n = { pop: 1, wins: [],
              strokes: tmp.filter(function (a) { return a.kind === 'stroke'; }) };
    T.acts.push({ kind: 'show', obj: n });
    T.pause(520);
    return n;
  }
  function regelGom(T, n) {
    T.pause(320);
    T.acts.push({ kind: 'hide', obj: n });
    T.pause(200);
  }

  /* ================= Uppgift 20: växthusets temperatur ================= */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL + 30;
    var xw = x0 + T.fracW('πx', '12') + T.adv('=') + T.fracW('π', '2') + 0.9 * F;

    /* ---- a) ---- */
    y = 252;
    xx = T.str('a) y=20+15 sin', padL, y);
    T.parenFrac('πx', '12', null, xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['sin är som mest 1. Då är']],
      [['temperaturen 20+15=35 °C.']]
    ], 1.05);
    y += 3.1 * F;
    rubrik(T, 'Högst temperatur när sinus är 1', padL, y);
    y += 2.8 * F;
    xx = T.str('sin', x0, y);
    xx = T.parenFrac('πx', '12', null, xx + 0.2 * F, y);
    T.str('=1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sinus är 1 när vinkeln är π/2.']],
      [['Perioden är 24 h, så det finns']],
      [['bara en topp under dygnet.']]
    ], 1.05);
    y += 3.1 * F;
    xx = T.fracH('πx', '12', x0, y);
    xx = T.str('=', xx, y);
    T.fracH('π', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Multiplicera båda led med 12.']]
    ], 1.05);
    y = ekvOp(y, '·12', xw, function (yy) {
      var x = T.fracH('πx', '12', x0, yy);
      x = T.str('·12', x, yy, BLUE);
      x = T.str('=', x, yy);
      x = T.fracH('π', '2', x, yy);
      T.str('·12', x, yy, BLUE);
    }, { dy: 3.0, dyRes: 2.6, dyVagg: 2.6, vopt: { h0: 1.30, h1: 1.15 } });
    T.str('πx=6π', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med π.']]
    ]);
    y = ekvOp(y, '/π', xw, 'πx=6π');
    T.str('x=6', x0, y);
    T.stepEnd();

    tanke(y, [
      [['x räknas från klockan 9.00.']],
      [['Sex timmar senare är klockan']],
      [['15.00.']]
    ]);
    y += 2.7 * F;
    T.str('9+6=15', x0, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Klockan 15.00', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += 3.2 * F;
    T.str('b) Klockan 12.00: x=3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Hur snabbt temperaturen ökar är']],
      [['derivatan. Inre derivatan π/12']],
      [['kommer ut som faktor.']]
    ]);
    y += 3.1 * F;
    xx = T.str('y’(x)=15', padL, y);
    xx = T.mul(xx, y);
    xx = T.fracH('π', '12', xx, y);
    xx = T.str(' cos', xx, y);
    T.parenFrac('πx', '12', null, xx + 0.2 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('=', padL + 60, y);
    xx = T.fracH('15π', '12', xx, y);
    xx = T.str(' cos', xx, y);
    T.parenFrac('πx', '12', null, xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Förkorta 15π/12 med 3.']]
    ], 1.05);
    y += 3.1 * F;
    xx = T.str('=', padL + 60, y);
    xx = T.fracOp('15π', '12', '/3', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('5π', '4', xx, y);
    xx = T.str(' cos', xx, y);
    T.parenFrac('πx', '12', null, xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Sätt in x=3 och räkna i radianer.']],
      [['Vinkeln 3π/12 förkortas med 3.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('y’(3)=', padL, y);
    xx = T.fracH('5π', '4', xx, y);
    xx = T.str(' cos', xx, y);
    xx = T.fracOp('3π', '12', '/3', xx + 0.2 * F, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('5π', '4', xx, y);
    xx = T.str(' cos', xx, y);
    T.fracH('π', '4', xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['cos π/4 är √2/2.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('=', padL + 60, y);
    xx = T.fracH('5π', '4', xx, y);
    xx = T.mul(xx, y);
    xx = fracDelar(T, F, [{ r: '2' }], [{ s: '2' }], xx, y).x;
    xx = T.str('=', xx, y);
    fracDelar(T, F, [{ s: '5' }, { r: '2' }, { s: 'π' }], [{ s: '8' }], xx, y);
    T.stepEnd();

    tanke(y, [
      [['Med räknaren. I GeoGebra: skriv in']],
      [['f(x)=20+15sin(πx/12), sedan f’(3).']]
    ], 1.05);
    y += 3.0 * F;
    T.str('=2,776...≈2,8', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Positivt: klockan 12 är det']],
      [['fortfarande tre timmar kvar till']],
      [['toppen. Enheten är °C per timme.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar: Cirka 2,8 °C/h', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= Uppgift 21: arean mellan f, g och axlarna ========= */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    function f(x) { return 2 * Math.cos(x / 2); }
    function g(x) { return 5 * Math.log(x); }
    var a = 1.3641;
    var A = mkAxes(T, F, { ox: padL + 70, oy: 300, u: 85, xsc: 1, ysc: 1,
                           xmin: 0, xmax: 2.1, ymin: -0.3, ymax: 2.1 });

    /* ---- figuren ---- */
    A.axes();
    T.pause(120);
    kurva(A, acts, f, -0.3, 2.4, BLUE, 70);
    T.pause(140);
    kurva(A, acts, g, 0.95, 1.6, BLUE, 50);
    T.pause(140);
    skugga(T, A, acts, f, function (x) { return x < 1 ? 0 : g(x); }, 0, a, 0.08);
    T.str('f', A.X(2.25), A.Y(f(2.25)) - 12, null, 0.62);
    T.str('g', A.X(1.64) + 8, A.Y(2.05), null, 0.62);
    T.stepEnd();

    tanke(A.Y(-0.3) + 40, [
      [['Området slutar där kurvorna']],
      [['skär varandra. Den ekvationen']],
      [['går inte att lösa för hand, så']],
      [['jag använder Skärning(f, g, 1)']],
      [['med startvärdet 1.']]
    ], 0);
    y = A.Y(-0.3) + 40 + 2.2 * F;
    rubrik(T, 'Gränser: skärningen med verktyget och nollstället för g', padL, y);
    y += 2.2 * F;
    T.str('f(x)=g(x)  ⟹  x=a≈1,3641', padL, y);
    T.stepEnd();

    tanke(y, [
      [['g börjar där ln x=0, alltså']],
      [['vid x=1.']]
    ]);
    y += 2.7 * F;
    T.str('5 ln x=0  ⟹  x=1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Hela arean under f från 0 till a,']],
      [['minus biten under g från 1 till a,']],
      [['som inte hör till området.']]
    ]);
    y += 3.2 * F;
    rubrik(T, 'Arean: under f minus biten under g', padL, y);
    y += 2.6 * F;
    xx = T.str('A=', padL, y);
    xx = T.str(' ∫_0^a 2 cos', xx, y);
    xx = T.fracH('x', '2', xx + 0.2 * F, y);
    xx = T.str(' dx-', xx, y);
    T.str(' ∫_1^a 5 ln x dx', xx, y);
    T.stepEnd();

    tanke(y, [
      [['4 sin(x/2) är en primitiv funktion:']],
      [['inre derivatan 1/2 gånger 4 ger 2.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str(' ∫_0^a 2 cos', padL, y);
    xx = T.fracH('x', '2', xx + 0.2 * F, y);
    xx = T.str(' dx=[4 sin', xx, y);
    xx = T.fracH('x', '2', xx + 0.2 * F, y);
    T.str(']_0^a', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('=4 sin', padL + 60, y);
    xx = T.fracH('a', '2', xx + 0.2 * F, y);
    T.str('-4 sin 0=2,5215...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En primitiv funktion till ln x ingår']],
      [['inte i kursen. Verktyget räknar:']],
      [['Integral(5ln(x), 1, a).']]
    ], 1.05);
    y += 3.2 * F;
    T.str(' ∫_1^a 5 ln x dx=0,2972...', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('A=2,5215...-0,2972...=2,2243...', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Minst tre värdesiffror.']]
    ]);
    y += 2.6 * F;
    T.str('≈2,22', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Området är ungefär en']],
      [['rektangel 1,4 gånger 1,8, minus en']],
      [['liten bit nere till höger.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar: Cirka 2,22 areaenheter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 22: huggormens längd ================= */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 175;
    rubrik(T, 'Modellen och dess derivata', padL, y);
    y += 2.6 * F;
    xx = T.str('f(x)=5 sin', padL, y);
    T.fracH('x', '3', xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Kedjeregeln: inre derivatan 1/3']],
      [['kommer ut som faktor.']]
    ], 1.05);
    y += 3.2 * F;
    xx = T.str('f’(x)=5', padL, y);
    xx = T.mul(xx, y);
    xx = T.fracH('1', '3', xx, y);
    xx = T.str(' cos', xx, y);
    xx = T.fracH('x', '3', xx + 0.2 * F, y);
    T.stepEnd();

    xx = T.str('=', xx + 0.2 * F, y);
    xx = T.fracH('5', '3', xx, y);
    xx = T.str(' cos', xx, y);
    T.fracH('x', '3', xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Sätt in derivatan i formeln.']],
      [['Svansen är i x=0 och nosen i']],
      [['x=40, så det är gränserna.']]
    ], 1.05);
    y += 3.6 * F;
    rubrik(T, 'Längden med formeln, från svansen till nosen', padL, y);
    y += 3.0 * F;
    xx = T.str('L=', padL, y);
    xx = integral(T, F, xx, y, '0', '40') + 0.3 * F;
    /* rottecknet över hela integranden: 1 + (5/3 · cos x/3)^2 */
    var wInnan = T.adv('1+') + 0.24 * F + T.fracW('5', '3') + 1.5 + T.adv(' cos') +
                 0.2 * F + T.fracW('x', '3') + 1.5 + 0.06 * F + 0.24 * F + T.adv('2', 0.62);
    var xr = rotTecken(T, F, xx, y, wInnan + 0.3 * F, y - 2.15 * F, y + 1.30 * F);
    xx = T.str('1+', xr, y);
    xx = V.bigParen(T, F, xx, y, false);
    xx = T.fracH('5', '3', xx, y);
    xx = T.str(' cos', xx, y);
    xx = T.fracH('x', '3', xx + 0.2 * F, y);
    xx = V.bigParen(T, F, xx + 0.06 * F + 0.17 * F, y, true);
    xx = T.str('2', xx - 0.05 * F, y - 1.20 * F, null, 0.62);
    T.str(' dx', xr + wInnan + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Den integralen har ingen primitiv']],
      [['funktion i kursen. Verktyget']],
      [['räknar den med Integral.']]
    ], 1.4);
    y += 3.6 * F;
    T.str('L=61,088...≈61', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? 40 cm i sidled, men ormen']],
      [['slingrar 10 cm upp och ned på varje']],
      [['halv period. Rakt mellan topp och']],
      [['dal blir det cirka 1,45 gånger 40,']],
      [['alltså 58 cm. Kurvan är lite längre.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar: Cirka 61 cm', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 23: sin(u + v) ur två trianglar ========== */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var k = 20, ox = padL + 190, oy = 282;
    function P(X, Y) { return [ox + X * k, oy - Y * k]; }
    var s80 = Math.sqrt(80), u = Math.atan(0.5);
    var angTQ = Math.atan2(-0.8, -0.6), angTL = angTQ - u;
    var Rp = P(0, 0), Tp = P(0, 8), Qp = P(-6, 0);
    var Pp = P(-0.6 * s80, 8 - 0.8 * s80);
    var Lp = P(8 * Math.cos(angTL), 8 + 8 * Math.sin(angTL));
    function unit(a, b) { var d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; }
    function lbl(s, x, yb, col) { return T.str(s, x - T.adv(s, 0.62) / 2, yb, col || null, 0.62); }

    /* ---- figuren: två rätvinkliga trianglar, måtten i blått ---- */
    T.line(Tp, Qp); T.line(Qp, Rp); T.line(Rp, Tp);
    T.pause(120);
    T.line(Tp, Lp); T.line(Lp, Pp);
    T.pause(120);
    V.ratVinkel(T, Lp, unit(Lp, Tp), unit(Lp, Pp), 8);
    V.ratVinkel(T, Rp, unit(Rp, Tp), unit(Rp, Qp), 8);
    var sa = function (q) { return Math.atan2(q[1] - Tp[1], q[0] - Tp[0]); };
    var aR = sa(Rp), aQ = sa(Qp), aL = sa(Lp);
    V.vinkelBage(T, Tp, aR, aQ, 22);
    V.vinkelBage(T, Tp, aQ, aL, 27);
    var bu = (aQ + aL) / 2, bv = (aR + aQ) / 2;
    var pu = [Tp[0] + 54 * Math.cos(bu), Tp[1] + 54 * Math.sin(bu)];
    var pv = [Tp[0] + 40 * Math.cos(bv), Tp[1] + 40 * Math.sin(bv)];
    lbl('u', pu[0], pu[1] + 6);
    lbl('v', pv[0], pv[1] + 6);
    T.pause(120);
    lbl('8', (Tp[0] + Lp[0]) / 2 - 8, (Tp[1] + Lp[1]) / 2 - 6, BLUE);
    lbl('4', (Lp[0] + Pp[0]) / 2 - 12, (Lp[1] + Pp[1]) / 2 + 8, BLUE);
    lbl('8', Rp[0] + 12, (Tp[1] + Rp[1]) / 2 + 6, BLUE);
    lbl('6', (Qp[0] + Rp[0]) / 2, Rp[1] + 20, BLUE);
    T.stepEnd();

    tanke(oy + 20, [
      [['u och v sitter i var sin rätvinklig']],
      [['triangel. Additionsformeln sätter']],
      [['ihop dem.']]
    ], 0);
    y = oy + 20 + 2.2 * F;
    rubrik(T, 'Additionsformeln för sinus', padL, y);
    y += 2.2 * F;
    T.str('sin(u+v)=sin u·cos v+cos u·sin v', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Hypotenusan i den vänstra']],
      [['triangeln med Pythagoras sats.']]
    ]);
    y += 2.9 * F;
    T.str('Räknar ut hypotenusan med Pythagoras sats i vänstra triangeln', padL, y, null, 0.55);
    y += 2.4 * F;
    xx = T.str('c_1=', padL, y);
    xx = T.rot('8^2+4^2', xx + 0.2 * F, y);
    xx = T.str('=', xx, y);
    T.rot('80', xx + 0.2 * F, y);
    T.stepEnd();

    /* sin u och cos u ur figuren */
    y += 3.0 * F;
    var kS = trigKvotD(T, F, {
      fn: 'sin u=', x: padL, y: y,
      ring: [pu[0], pu[1], 11, 13],
      num: { txt: '4', ord: 'motstående katet', svep: [Lp, Pp] },
      den: { d: { r: '80' }, ord: 'hypotenusan', svep: [Tp, Pp] }
    });
    T.stepEnd();
    acts.push({ kind: 'fade', ref: kS.ring });

    var kC = trigKvotD(T, F, {
      fn: 'cos u=', x: padL + 330, y: y,
      ring: [pu[0], pu[1], 11, 13],
      num: { txt: '8', ord: 'närliggande katet', svep: [Tp, Lp] },
      den: { d: { r: '80' }, ord: 'hypotenusan', svep: [Tp, Pp] }
    });
    T.stepEnd();
    acts.push({ kind: 'fade', ref: kC.ring });

    tanke(y, [
      [['Den högra triangeln: kateterna 8']],
      [['och 6.']]
    ], 1.3);
    y += 3.3 * F;
    T.str('Räknar ut hypotenusan med Pythagoras sats i högra triangeln', padL, y, null, 0.55);
    y += 2.4 * F;
    xx = T.str('c_2=', padL, y);
    xx = T.rot('8^2+6^2', xx + 0.2 * F, y);
    xx = T.str('=', xx, y);
    xx = T.rot('100', xx + 0.2 * F, y);
    T.str('=10', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    var kS2 = trigKvotD(T, F, {
      fn: 'sin v=', x: padL, y: y,
      ring: [pv[0], pv[1], 11, 13],
      num: { txt: '6', ord: 'motstående katet', svep: [Qp, Rp] },
      den: { d: { s: '10' }, ord: 'hypotenusan', svep: [Tp, Qp] }
    });
    T.stepEnd();
    acts.push({ kind: 'fade', ref: kS2.ring });

    var kC2 = trigKvotD(T, F, {
      fn: 'cos v=', x: padL + 330, y: y,
      ring: [pv[0], pv[1], 11, 13],
      num: { txt: '8', ord: 'närliggande katet', svep: [Tp, Rp] },
      den: { d: { s: '10' }, ord: 'hypotenusan', svep: [Tp, Qp] }
    });
    T.stepEnd();
    acts.push({ kind: 'fade', ref: kC2.ring });

    tanke(y, [
      [['Sätt in de fyra värdena i']],
      [['additionsformeln.']]
    ], 1.05);
    y += 3.6 * F;
    xx = T.str('sin(u+v)=', padL, y);
    xx = fracDelar(T, F, [{ s: '4' }], [{ r: '80' }], xx, y).x;
    xx = T.mul(xx, y);
    xx = T.fracH('8', '10', xx, y);
    xx = T.str('+', xx, y);
    xx = fracDelar(T, F, [{ s: '8' }], [{ r: '80' }], xx, y).x;
    xx = T.mul(xx, y);
    T.fracH('6', '10', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Täljare gånger täljare och nämnare']],
      [['gånger nämnare. Samma nämnare, så']],
      [['termerna kan läggas ihop.']]
    ], 1.3);
    y += 3.6 * F;
    xx = T.str('=', padL + 120, y);
    xx = fracDelar(T, F, [{ s: '32' }], [{ s: '10' }, { r: '80' }], xx, y).x;
    xx = T.str('+', xx, y);
    xx = fracDelar(T, F, [{ s: '48' }], [{ s: '10' }, { r: '80' }], xx, y).x;
    xx = T.str('=', xx, y);
    fracDelar(T, F, [{ s: '80' }], [{ s: '10' }, { r: '80' }], xx, y);
    T.stepEnd();

    tanke(y, [
      [['80 är √80 gånger √80. Då kan √80']],
      [['förkortas bort ur täljare och']],
      [['nämnare.']]
    ], 1.3);
    y += 3.7 * F;
    xx = T.str('=', padL + 120, y);
    var fr = fracDelar(T, F, [{ r: '80' }, { s: '·' }, { r: '80' }],
                       [{ s: '10' }, { r: '80' }], xx, y);
    T.pause(300);
    T.strike(fr.num[2][0] + 0.1 * F, fr.num[2][1] - 0.1 * F, fr.num[2][2], 0.25, 0.95);
    T.pause(200);
    T.strike(fr.den[1][0] + 0.1 * F, fr.den[1][1] - 0.1 * F, fr.den[1][2], 0.25, 0.95);
    T.pause(200);
    xx = T.str('=', fr.x, y);
    fracDelar(T, F, [{ r: '80' }], [{ s: '10' }], xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: u≈26,6° och v≈36,9°.']],
      [['sin 63,4°≈0,894 och √80/10≈0,894.']]
    ], 1.3);
    y += 3.3 * F;
    xe = T.str('Svar: A=80 och B=10', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 24: sista halvtimmen ================= */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 175;
    rubrik(T, 'Sista halvtimmen: arean under f från 1,5 till 2', padL, y);
    y += 2.9 * F;
    xx = T.str('P(1,5≤t≤2)=', padL, y);
    xx = integral(T, F, xx, y, '1,5', '2');
    xx = T.fracH('15t^5-7t^6', '32', xx, y);
    T.str(' dt', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Primitiv funktion term för term.']],
      [['Faktorn 1/32 följer med.']]
    ], 1.05);
    y += 3.4 * F;
    rubrik(T, 'Primitiv funktion', padL, y);
    y += 2.9 * F;
    xx = T.str('F(t)=', padL, y);
    xx = T.fracH('1', '32', xx, y);
    xx = V.bigParen(T, F, xx + 0.1 * F, y, false);
    xx = T.fracH('15t^6', '6', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('7t^7', '7', xx, y);
    xx = V.bigParen(T, F, xx + 0.2 * F, y, true);
    T.stepEnd();

    tanke(y, [
      [['15/6 är 2,5 och 7/7 är 1.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('=', padL + 60, y);
    T.fracH('2,5t^6-t^7', '32', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sannolikheten är F(2) minus']],
      [['F(1,5). Sätter in gränserna.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('F(2)=', padL, y);
    xx = T.fracH('2,5·64-128', '32', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('32', '32', xx, y);
    var rEtt = del(T, '=1', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('F(1,5)=', padL, y);
    T.fracH('2,5·1,5^6-1,5^7', '32', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Täljaren med räknaren:']],
      [['28,4765625−17,0859375=11,390625.']]
    ], 1.05);
    y += 3.0 * F;
    xx = T.str('=', padL + 100, y);
    xx = T.fracH('11,390625', '32', xx, y);
    var rF = del(T, '=0,3559...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Skillnaden mellan värdena är']],
      [['sannolikheten.']]
    ], 1.05);
    var rings = substRings(acts, [[rEtt[0] + 0.5 * F, rEtt[1], y - 6.0 * F, F],
                                  [rF[0] + 0.5 * F, rF[1], y, F]]);
    y += 3.0 * F;
    T.str('P=1-0,3559...=0,6440...≈0,64', padL, y);
    fadeRings(acts, rings);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? F(2)−F(0)=1, som det']],
      [['ska vara. Kurvans topp ligger vid']],
      [['t≈1,8, så de flesta blir klara']],
      [['under den sista halvtimmen.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar: Cirka 0,64', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 25: rotation runt linjen y = 5 ============ */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var ekvOp = mkEkvOp(T, vagg);
    var samla = V.mkSamla(T);
    var x0 = padL + 30;
    var xw = x0 + T.adv('x^2-4=5') + 0.9 * F;
    function f(x) { return x * x - 4; }
    var A = mkAxes(T, F, { ox: padL + 200, oy: 265, u: 30, xsc: 1, ysc: 2,
                           xmin: -3.5, xmax: 3.5, ymin: -4, ymax: 6 });

    /* ---- figuren ---- */
    A.axes();
    A.ticks([-3, 3], [], [-3, 3], []);
    T.pause(120);
    A.linjal([A.X(-4.2), A.Y(5)], [A.X(4.3), A.Y(5)], BLUE);
    T.pause(120);
    kurva(A, acts, f, -3.25, 3.25, BLUE, 70);
    T.pause(120);
    /* luckan mellan x = 1,6 och 2,5 lämnas fri för radien (x = 2) */
    skugga(T, A, acts, function () { return 5; }, f, -3, 1.6, 0.3);
    skugga(T, A, acts, function () { return 5; }, f, 2.5, 3, 0.25);
    T.str('y=5', A.X(-4.2) - T.adv('y=5', 0.55) - 6, A.Y(5) + 7, BLUE, 0.55);
    T.str('y=x^2-4', A.X(2.75) + 10, A.Y(1.4), null, 0.55);
    T.stepEnd();

    tanke(A.Y(-4) + 40, [
      [['Området går mellan de två']],
      [['punkterna där kurvan skär linjen.']]
    ], 0);
    y = A.Y(-4) + 40 + 2.2 * F;
    rubrik(T, 'Gränserna: där kurvan skär linjen y=5', padL, y);
    y += 2.2 * F;
    T.str('x^2-4=5', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Addera 4 till båda led.']]
    ]);
    y = ekvOp(y, '+4', xw, 'x^2-4=5');
    T.str('x^2=9', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led.']]
    ]);
    y += 2.6 * F;
    xx = T.str('x=± ', x0, y);
    T.rot('9', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('x=±3', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Varje skiva roterar runt y=5. Radien']],
      [['är avståndet från linjen ned till']],
      [['kurvan: linjen minus kurvan.']]
    ]);
    /* radien i figuren */
    var xs = 2, rT = [A.X(xs), A.Y(5)], rB = [A.X(xs), A.Y(f(xs))];
    acts.push({ kind: 'stroke', color: BLUE, pts: humanize([rT, rB]) });
    T.line([rT[0] - 5, rT[1] + 9], rT, BLUE); T.line([rT[0] + 5, rT[1] + 9], rT, BLUE);
    T.line([rB[0] - 5, rB[1] - 9], rB, BLUE); T.line([rB[0] + 5, rB[1] - 9], rB, BLUE);
    T.str('r', A.X(xs) - 16, A.Y(2.6), BLUE, 0.65);
    T.pause(200);
    y += 3.1 * F;
    rubrik(T, 'Skivornas radie: linjen minus kurvan', padL, y);
    y += 2.2 * F;
    T.str('r=5-(x^2-4)', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Minus framför parentesen byter']],
      [['tecken på båda termerna.']]
    ]);
    y += 2.7 * F;
    var xr = T.str('=', x0 + T.adv('r'), y);
    var r5 = del(T, '5', xr, y);
    var rx2 = del(T, '-x^2', r5[1], y, BLUE);
    var r4 = del(T, '+4', rx2[1], y, BLUE);
    T.stepEnd();

    tanke(y, [
      [['Slå ihop 5 och 4.']]
    ]);
    y += 2.4 * F;
    xx = T.str('=', x0 + T.adv('r'), y);
    samla(xx, y, [
      { ringar: [[r5[0], r5[1], y - 2.4 * F], [r4[0] + 0.3 * F, r4[1], y - 2.4 * F]], skriv: '9' },
      { skriv: '-x^2' }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Skivmetoden: varje skiva har']],
      [['volymen π·r²·dx.']]
    ]);
    y += 2.9 * F;
    rubrik(T, 'Volymen med skivmetoden', padL, y);
    y += 2.6 * F;
    xx = T.str('V=π', padL, y);
    xx = integral(T, F, xx, y, '-3', '3');
    T.str('(9-x^2)^2 dx', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kvadreringsregeln utvecklar']],
      [['parentesen till ett polynom.']]
    ], 0.6);
    y += 3.2 * F;
    var not = regelNot(T, F, '(a-b)^2=a^2-2ab+b^2', padL + 300, y - 1.7 * F);
    xx = T.str('V=π', padL, y);
    xx = integral(T, F, xx, y, '-3', '3');
    T.str('(81-18x^2+x^4) dx', xx, y);
    T.stepEnd();
    regelGom(T, not);

    tanke(y, [
      [['Primitiv funktion term för term.']]
    ], 0.6);
    y += 3.3 * F;
    xx = T.str('V=π[81x-6x^3+', padL, y);
    xx = T.fracH('x^5', '5', xx, y);
    T.str(']_-_3^3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sätt in 3 och −3. Varje term har']],
      [['udda exponent, så −3 ger motsatta']],
      [['värden.']]
    ], 1.05);
    y += 3.1 * F;
    T.str('V=π((243-162+48,6)', padL, y);
    y += 2.4 * F;
    T.str('-(-243+162-48,6))', padL + 90, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=π(129,6+129,6)=259,2π', padL + 60, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=814,30...≈814', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? En cylinder med radien 9']],
      [['och längden 6 har volymen cirka']],
      [['1 500. Kroppen smalnar av mot']],
      [['ändarna, så ungefär hälften.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar: Cirka 814 volymenheter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= Uppgift 26: h’’(0) när h = f² ================= */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var multIn = V.mkMultIn(T);

    y = 175;
    rubrik(T, 'Givet', padL, y);
    y += 2.2 * F;
    var gF0 = del(T, 'f(0)=-1', padL, y);
    var gF1 = del(T, 'f’(0)=3', padL + 220, y);
    var gF2 = del(T, 'f’’(0)=2', padL + 410, y);
    var yGiv = y;
    y += 2.4 * F;
    T.str('h(x)=(f(x))^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Yttre funktionen är kvadreringen,']],
      [['den inre är f(x). Yttre derivatan']],
      [['gånger inre derivatan.']]
    ]);
    y += 2.9 * F;
    rubrik(T, 'Kedjeregeln', padL, y);
    y += 2.2 * F;
    T.str('h’(x)=2f(x)·f’(x)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu är det en produkt av f(x) och']],
      [['f’(x): produktregeln. Faktorn 2']],
      [['står kvar framför.']]
    ]);
    y += 2.9 * F;
    rubrik(T, 'Produktregeln på f(x)·f’(x)', padL, y);
    y += 3.0 * F;
    xx = T.str('h’’(x)=', padL, y);
    var f2 = del(T, '2', xx, y);
    xx = T.str('(', f2[1], y);
    var t1 = del(T, 'f’(x)·f’(x)', xx, y);
    var t2 = del(T, '+f(x)·f’’(x)', t1[1], y);
    T.str(')', t2[1], y);
    var yKalla = y;
    T.stepEnd();

    tanke(y, [
      [['Multiplicera in 2 i parentesen.']]
    ]);
    y += 2.4 * F;
    xx = T.str('=', padL + T.adv('h’’(x)') + 0.1 * F, y);
    multIn(xx, y, yKalla - 0.95 * F, [
      { fran: f2, till: t1, skriv: '2f’(x)·f’(x)', hojd: 20 },
      { fran: f2, till: t2, skriv: '+2f(x)·f’’(x)', hojd: 30 }
    ]);
    T.stepEnd();

    tanke(y, [
      [['Sätt in x=0 och de tre givna']],
      [['värdena.']]
    ]);
    var rings = substRings(acts, [[gF0[0], gF0[1], yGiv, F],
                                  [gF1[0], gF1[1], yGiv, F],
                                  [gF2[0], gF2[1], yGiv, F]]);
    y += 2.6 * F;
    T.str('h’’(0)=2·3·3+2·(-1)·2', padL, y);
    fadeRings(acts, rings);
    T.stepEnd();

    y += 2.4 * F;
    T.str('=18-4=14', padL + T.adv('h’’(0)') + 0.1 * F, y);
    T.stepEnd();

    tanke(y, [
      [['h’’(0) beror bara på de tre givna']],
      [['värdena. Därför blir det 14 för']],
      [['alla funktioner f med egenskaperna.']]
    ]);
    y += 2.7 * F;
    xe = T.str('Svar: h’’(0)=14', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 27: ljuspunktens hastighet ================ */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL + 30;

    /* ---- figuren: vägg, skivans mitt O, strålen och triangeln ---- */
    var yw = 70, O = [200, 270], Lpx = O[1] - yw, al = 0.42;
    var S = [O[0] + Lpx * Math.tan(al), yw];
    T.line([60, yw], [390, yw]);
    T.str('vägg', 64, yw - 10, null, 0.55);
    T.pause(120);
    acts.push({ kind: 'stroke', pts: V.dotPts(O[0], O[1]) });
    streckad(T, O, [O[0], yw], null, 13);
    T.pause(120);
    T.line(O, S);
    acts.push({ kind: 'stroke', pts: V.dotPts(S[0], S[1]) });
    V.ratVinkel(T, [O[0], yw], [1, 0], [0, 1], 9);
    var aMid = V.vinkelBage(T, O, -Math.PI / 2, -Math.PI / 2 + al, 46);
    var pA = [O[0] + 62 * Math.cos(aMid - 0.06), O[1] + 62 * Math.sin(aMid - 0.06)];
    T.str('α', pA[0] - 7, pA[1] + 5, null, 0.62);
    T.pause(120);
    T.str('L', O[0] - 22, (O[1] + yw) / 2 + 6, BLUE, 0.62);
    T.str('x', (O[0] + S[0]) / 2 - 5, yw - 8, BLUE, 0.62);
    T.stepEnd();

    tanke(O[1] + 16, [
      [['Mitten, startpunkten och ljuspunkten']],
      [['bildar en rätvinklig triangel med']],
      [['räta vinkeln vid väggen.']]
    ], 0);
    y = O[1] + 16 + 3.2 * F;
    var tq = V.trigKvot(T, F, {
      fn: 'tan α=', x: x0, y: y,
      ring: [pA[0], pA[1], 11, 13],
      num: { txt: 'x', ord: 'motstående katet', svep: [[O[0], yw], S] },
      den: { txt: 'L', ord: 'närliggande katet', svep: [O, [O[0], yw]] }
    });
    T.stepEnd();
    acts.push({ kind: 'fade', ref: tq.ring });

    tanke(y, [
      [['Multiplicera båda led med L.']]
    ], 1.05);
    var xw = x0 + T.adv('tan α=') + T.fracW('x', 'L') + 0.9 * F;
    y = ekvOp(y, '·L', xw, function (yy) {
      var x = T.str('tan α', x0, yy);
      x = T.str('·L', x, yy, BLUE);
      x = T.str('=', x, yy);
      x = T.fracH('x', 'L', x, yy);
      T.str('·L', x, yy, BLUE);
    }, { dy: 3.0, dyRes: 2.4, dyVagg: 2.6, vopt: { h0: 1.30, h1: 1.15 } });
    T.str('x=L·tan α', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Vinkeln växer med tiden: α=C·t.']]
    ]);
    y += 2.7 * F;
    T.str('x=L·tan(Ct)', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Derivera med avseende på t. L är']],
      [['konstant, derivatan av tan är 1/cos²']],
      [['och inre derivatan C blir en faktor.']]
    ]);
    y += 3.2 * F;
    xx = T.fracH('dx', 'dt', x0, y);
    xx = T.str('=L·', xx, y);
    xx = T.fracH('1', 'cos^2(Ct)', xx, y);
    T.str('·C', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('=', x0 + T.fracW('dx', 'dt') + 1.5, y);
    T.fracH('CL', 'cos^2(Ct)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? Vid t=0 är farten CL. När']],
      [['strålen nästan blir parallell med']],
      [['väggen växer farten obegränsat.']]
    ], 1.05);
    y += 3.3 * F;
    xx = T.str('Svar: ', padL, y);
    xx = T.fracH('dx', 'dt', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('CL', 'cos^2(Ct)', xx, y);
    xe = T.str(' m/s', xx, y);
    T.underline(xe, y + 1.0 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

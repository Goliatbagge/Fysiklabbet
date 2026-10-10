/* ma4-vt2022-penna.js: pennlösningar till Nationellt prov Ma 4, VT 2022.
 *
 * En scen per uppgift, registrerad som "ma4-vt2022-u<nr>". Filen består av
 * tre självständiga block, ett per delprov (B: 1–10, C: 11–19, D: 20–27);
 * varje block har sitt eget filhuvud med de regler som gäller där.
 * Granskning: node .claude/verify-handskrift.js ma4-vt2022-u1 …
 */

/* ma4-vt2022-delB-penna.js: pennlösningar till Nationellt prov Ma 4,
 * VT 2022, delprov B (uppgift 1–10).
 *
 * En scen per uppgift, registrerad som "ma4-vt2022-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md. De som oftast
 * bränner: inget bläck vid x > 696, inget med x > 420 ovanför y = 150
 * (y = 210 i ekvval-scener), en tanke per led direkt före ledet, division
 * alltid med vågrätt streck, samma antal klicksteg i båda
 * ekvationsredovisningarna. Tankebubblornas text är vanlig text (inte
 * pennans glyfer), så där skrivs inga ^-exponenter.
 *
 * Siffrorna är desamma som i textlösningen i data/np/ma4-vt2022-delB.js.
 *
 * Granskning: node .claude/verify-handskrift.js ma4-vt2022-u1 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      mkEkvOp = V.mkEkvOp, substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, BLUE = V.BLUE, PAPER_W = V.PAPER_W;

  function reg(nr, fn) { HK.registrera('ma4-vt2022-u' + nr, fn); }

  /* Litet stående bråk som ÖVRE GRÄNS efter ∫ eller ] (π/2 som gräns).
   * Pennans ^-syntax klarar bara ett tecken per gräns, och en gräns får
   * aldrig skrivas med snedstreck. kind = '∫' eller ']'. x = där
   * gränsen börjar (x efter tecknet). Returnerar x efter bråket. */
  function ovreGrans(T, F, x, yb, num, den, kind) {
    var sc = 0.6, f = F * sc;
    var ybar = yb - (kind === '∫' ? 1.40 : 1.18) * F;
    /* efter ∫ sticker krokens topp ut ~5 px förbi tecknets bredd */
    var x0 = x + (kind === '∫' ? 0.36 * F : 0.12 * F);
    var nw = T.adv(num, sc), dw = T.adv(den, sc);
    var w = Math.max(nw, dw) + 0.3 * f;
    T.str(num, x0 + (w - nw) / 2, ybar - 0.32 * f, null, sc);
    T.pause(100);
    T.acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
    T.pause(100);
    T.str(den, x0 + (w - dw) / 2, ybar + 1.04 * f, null, sc);
    return x0 + w + 0.12 * F;
  }

  /* Ensiffrig ÖVRE integralgräns: pennans egen ^-gräns hamnar på ∫-tecknets
   * krok, så den sätts här en bit till höger om och ovanför kroken (samma
   * läge som ovreGrans). Returnerar x efter gränsen. */
  function ovreTal(T, F, x, yb, ch) {
    var x0 = x + 0.36 * F;
    return T.str(ch, x0, yb - 1.08 * F, null, 0.6) + 0.12 * F;
  }

  /* Streckad linje (asymptoter, speglingslinjer) med n delsträckor. */
  function streckad(T, p1, p2, col, n) {
    n = n || 15;
    for (var i = 0; i < n; i += 2) {
      T.acts.push({ kind: 'stroke', color: col || null, pts: humanize([
        [p1[0] + (p2[0] - p1[0]) * i / n, p1[1] + (p2[1] - p1[1]) * i / n],
        [p1[0] + (p2[0] - p1[0]) * (i + 1) / n, p1[1] + (p2[1] - p1[1]) * (i + 1) / n]]) });
    }
  }

  /* Rad som krymps en aning om den annars når in i pilzonen. */
  function passa(T, s, x0, yb, col) {
    var plats = PAPER_W - 46 - x0, w = T.adv(s);
    var sc = w > plats ? Math.max(0.8, plats / w) : 1;
    return T.str(s, x0, yb, col || null, sc);
  }

  /* ================= Uppgift 1: derivera tre funktioner =================
   * a) och b) kedjeregeln (yttre derivata gånger inre), c) produktregeln. */
  reg(1, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 122;
    T.str('a) f(x)=sin 5x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Funktionen är sammansatt: den']],
      [['yttre är sinus och den inre är 5x.']],
      [['Yttre derivatan gånger inre']],
      [['derivatan.']]
    ]);
    y += 2.7 * F;
    xx = T.str('f’(x)=cos 5x·5', padL + 30, y);
    T.stepEnd();

    T.str('=5cos 5x', xx + 0.3 * F, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: f’(x)=5cos 5x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += 2.9 * F;
    T.str('b) g(x)=(5x+2)^1^0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Yttre funktionen är en tionde-']],
      [['potens: 10 ned som faktor och']],
      [['exponenten 9. Sedan gånger den']],
      [['inre derivatan, som är 5.']]
    ]);
    y += 2.7 * F;
    xx = T.str('g’(x)=10(5x+2)^9·5', padL + 30, y);
    T.stepEnd();

    T.str('=50(5x+2)^9', xx + 0.3 * F, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: g’(x)=50(5x+2)^9', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    y += 2.9 * F;
    T.str('c) h(x)=x^7·e^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['h är en produkt, så jag använder']],
      [['produktregeln. x upphöjt till 7']],
      [['har derivatan 7x upphöjt till 6,']],
      [['och e upphöjt till x är sin egen']],
      [['derivata.']]
    ]);
    y += 2.7 * F;
    T.str('h’(x)=7x^6·e^x+x^7·e^x', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: h’(x)=7x^6·e^x+x^7·e^x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 2: period och minsta värde ================= */
  reg(2, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 122;
    T.str('f(x)=2+5cos 4x', padL, y);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(y, [
      [['Perioden för A cos Bx är 2π']],
      [['delat med B. Här är B=4.']]
    ]);
    y += 3.0 * F;
    xx = T.str('a) period=', padL, y);
    xx = T.fracH('2π', '4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Fyran går att förkorta mot']],
      [['tvåan.']]
    ], 1.05);
    xx = T.str('=', xx, y);
    T.fracH('π', '2', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('Svar: ', padL, y);
    xx = T.fracH('π', '2', xx, y);
    xe = T.str(' (eller 90°)', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['cos 4x är aldrig mindre än −1.']],
      [['Då blir f som minst när']],
      [['cos 4x=−1.']]
    ], 1.35);
    y += 3.6 * F;
    xx = T.str('b) f', padL, y);
    xx = T.str('_m_i_n', xx - 0.1 * F, y);
    xx = T.str('=2+5·(-1)', xx, y);
    T.stepEnd();

    T.str('=2-5=-3', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: -3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 3: y = sin x, punkten P, sin(x/2) ===========
   * Rutnätets steg är π/2 i x-led (första toppen ligger på första
   * rutlinjen). Kurvan ritas ur sin funktion. */
  reg(3, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, v, n;
    var tanke = mkTanke(T);
    var Q = Math.PI / 2;
    var ox = padL + 32, oy = 215;
    var A = mkAxes(T, F, { ox: ox, oy: oy, u: 34, xsc: Q, ysc: 0.65,
                           xmin: -0.85, xmax: 21.1, ymin: -1.3, ymax: 1.3 });
    var rutor = [];
    for (n = 1; n <= 13; n++) rutor.push(n * Q);

    /* ---- steg 1: figuren av ---- */
    A.axes();
    A.ticks(rutor, [-1, 1], [], [-1, 1]);
    T.pause(200);
    var kurva = [];
    for (v = -0.85; v <= 21.1; v += 0.06) kurva.push([A.X(v), A.Y(Math.sin(v))]);
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(160);
    A.dot(6 * Math.PI, 0);
    /* P rakt ovanför punkten: snett ovanför låg etiketten på sin(x/2) */
    T.str('P', A.X(6 * Math.PI) - T.adv('P', 0.62) / 2, oy - 0.9 * F, null, 0.62);
    T.stepEnd();

    /* ---- a) ---- */
    tanke(oy + 92, [
      [['Första toppen ligger vid x=π/2,']],
      [['på första rutlinjen. Varje ruta']],
      [['är alltså π/2 bred, och sinus']],
      [['är noll vid π, 2π, 3π och så vidare.']]
    ], 0);
    for (n = 1; n <= 6; n++) {
      var lab = (n === 1 ? '' : String(n)) + 'π', w = T.adv(lab, 0.45);
      var xn = A.X(n * Math.PI);
      /* i en rad under hela figuren, rakt under sitt skalstreck: vid
       * axeln korsas talen av både sin x och (senare) sin(x/2) */
      T.str(lab, xn - w / 2, oy + 82, BLUE, 0.45);
      T.pause(90);
    }
    T.stepEnd();

    tanke(oy + 92, [
      [['P ligger tolv rutor till höger']],
      [['om origo.']]
    ], 0);
    y = oy + 205;
    xx = T.str('a) x=12·', padL, y);
    xx = T.fracH('π', '2', xx, y);
    T.str('=6π', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: x=6π', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['I b) står x delat med 2 i sinus.']],
      [['Perioden 2π delat med B, där']],
      [['B är en halv.']]
    ]);
    y += 3.7 * F;
    xx = T.str('b) period=', padL, y);
    xx = T.bigFrac('2π', ['1', '2'], xx, y);
    T.str('=4π', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Perioden blir dubbelt så lång.']],
      [['Toppen hamnar i x=π, dalen i']],
      [['x=3π och nollställena i 0, 2π,']],
      [['4π och 6π. Amplituden är 1.']]
    ], 1.9);
    var kurva2 = [];
    for (v = -0.85; v <= 21.1; v += 0.06) kurva2.push([A.X(v), A.Y(Math.sin(v / 2))]);
    acts.push({ kind: 'stroke', pts: kurva2, color: BLUE });
    T.pause(160);
    [[Math.PI, 1], [3 * Math.PI, -1], [5 * Math.PI, 1]].forEach(function (p) {
      A.dot(p[0], p[1], BLUE);
      T.pause(90);
    });
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: Den blå kurvan i figuren', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 4: asymptoter ===============================
   * Lodrät asymptot där nämnaren är noll, sned asymptot = den räta linjen
   * som blir kvar när bråket går mot noll. Kurvans vänstra gren ligger
   * under rutnätet (högsta punkt y ≈ −6,5), bara högra grenen ritas. */
  reg(4, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);
    function f(x) { return 3 / (x + 2) + x - 1; }

    y = 125;
    xx = T.str('y=', padL, y);
    xx = T.fracH('3', 'x+2', xx, y);
    T.str('+x-1', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Ett bråk saknar värde när']],
      [['nämnaren är noll. Där skjuter']],
      [['kurvan iväg uppåt eller nedåt.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('Nämnaren x+2 är noll då x=-2', padL, y - 1.45 * F, null, 0.62);
    T.str('Lodrät asymptot: x=-2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['När x blir mycket stort går']],
      [['bråket mot noll. Kvar blir den']],
      [['räta linjen x−1.']]
    ]);
    y += 3.3 * F;
    T.str('Bråket går mot 0 då x går mot ±∞', padL, y - 1.45 * F, null, 0.62);
    T.str('Sned asymptot: y=x-1', padL, y);
    T.stepEnd();

    /* ---- figuren: rutnätets axlar, asymptoterna streckade i blått ---- */
    var u = 24, oy = y + 40 + 7.85 * u;
    var A = mkAxes(T, F, { ox: padL + 165, oy: oy, u: u,
                           xmin: -6, xmax: 7, ymin: -6, ymax: 7 });
    tanke(y, [
      [['Nu ritar jag in asymptoterna']],
      [['som streckade linjer.']]
    ]);
    A.axes();
    /* y-axelns "1" utelämnas: kurvan passerar strax intill (y = 1 vid
     * x = −1), och etiketter får aldrig ligga på en linje */
    A.ticks(V.heltal(-6, 7), V.heltal(-6, 7), [1], []);
    T.pause(200);
    streckad(T, [A.X(-2), A.Y(-6.4)], [A.X(-2), A.Y(7.4)], BLUE, 21);
    T.pause(120);
    T.str('x=-2', A.X(-2) - 12 - T.adv('x=-2', 0.5), A.Y(6.6), BLUE, 0.5);
    T.pause(200);
    streckad(T, [A.X(-5.4), A.Y(-6.4)], [A.X(7.4), A.Y(6.4)], BLUE, 25);
    T.pause(120);
    T.str('y=x-1', A.X(4.4), A.Y(2.1), BLUE, 0.5);
    T.stepEnd();

    tanke(oy + 6 * u + 20, [
      [['Som kontroll: kurvans högra gren']],
      [['ligger mellan asymptoterna och']],
      [['närmar sig båda. Den vänstra']],
      [['grenen ligger under rutnätet.']]
    ], 0);
    var xTop = -1.62;
    for (i = 0; i < 60; i++) { /* där grenen går ut i överkant (y = 7,4) */
      if (f(xTop) > 7.4) xTop += 0.001; else break;
    }
    var gren = [];
    for (i = 0; i <= 120; i++) {
      var t = i / 120, x = xTop + (7.3 - xTop) * t * t;
      gren.push([A.X(x), A.Y(f(x))]);
    }
    acts.push({ kind: 'stroke', pts: gren });
    T.stepEnd();

    y = oy + 6 * u + 70;
    xe = T.str('Svar: x=-2 och y=x-1', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 5: integral med trigonometriska ettan ====== */
  reg(5, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    /* raden når x > 420 och gränsen sticker upp 1,7·F: läggs under y = 150 */
    y = 210;
    xx = T.str('∫_0', padL + 24, y);
    xx = ovreGrans(T, F, xx, y, 'π', '2', '∫');
    var yE = y, xs0 = xx + 0.3 * F;
    var xs1 = T.str('(sin^2 x+cos^2 x', xs0, y);
    T.str('+sin x) dx', xs1, y);
    T.stepEnd();

    tanke(y, [
      [['Trigonometriska ettan: sinus i']],
      [['kvadrat plus cosinus i kvadrat']],
      [['är alltid 1.']]
    ]);
    var ring = substRings(acts, [[xs0 + 0.3 * F, xs1, yE, F]]);
    y += 3.0 * F;
    xx = T.str('=', padL + 24, y);
    xx = T.str('∫_0', xx + 0.45 * F, y);
    xx = ovreGrans(T, F, xx, y, 'π', '2', '∫');
    T.str('(1+sin x) dx', xx + 0.3 * F, y);
    fadeRings(acts, ring);
    T.stepEnd();

    tanke(y, [
      [['En primitiv funktion till 1 är x,']],
      [['och till sin x är den −cos x.']]
    ]);
    y += 3.0 * F;
    xx = T.str('=[x-cos x]_0', padL + 24, y);
    ovreGrans(T, F, xx, y, 'π', '2', ']');
    T.stepEnd();

    tanke(y, [
      [['Övre gränsen minus undre']],
      [['gränsen.']]
    ]);
    y += 3.0 * F;
    xx = T.str('=(', padL + 24, y);
    xx = T.fracH('π', '2', xx, y);
    xx = T.str('-cos ', xx, y);
    xx = T.fracH('π', '2', xx, y);
    T.str(')-(0-cos 0)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Cosinus för en rät vinkel är 0,']],
      [['och cos 0=1.']]
    ], 1.05);
    y += 3.4 * F;
    xx = T.str('=(', padL + 24, y);
    xx = T.fracH('π', '2', xx, y);
    xx = T.str('-0)-(0-1)', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('=', padL + 24, y);
    xx = T.fracH('π', '2', xx, y);
    T.str('+1', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('Svar: 1+', padL, y);
    xe = T.fracH('π', '2', xx, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 2.0 * F, padL: padL };
  });

  /* ================= Uppgift 6: |z| då z = e^(2 + iπ) ==================== */
  reg(6, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 125;
    T.str('z=e^2^+^i^π', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En summa i exponenten kan delas']],
      [['upp i en produkt av två potenser']],
      [['med samma bas.']]
    ]);
    y += 2.7 * F;
    xx = T.str('z=e^2·e^i^π', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Eulers formel med vinkeln π:']],
      [['cos π+i sin π=−1.']]
    ]);
    T.str('=e^2·(-1)=-e^2', xx + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Beloppet är avståndet till origo.']],
      [['Minustecknet ändrar riktningen,']],
      [['inte avståndet.']]
    ]);
    y += 2.7 * F;
    T.str('|z|=|-e^2|=e^2', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: |z|=e^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 7: komplexa talplanet =======================
   * a) konjugatet = spegling i Re-axeln, b) z₂ − 1 = 2 − 2i i fjärde
   * kvadranten, c) villkoret blir linjen y = x + 2 (EKVVAL: "+2" i båda
   * led eller på väggen). */
  reg(7, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, v;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var u = 30, ox = padL + 190, oy = 215;
    function X(a) { return ox + a * u; }
    function Y(b) { return oy - b * u; }
    var xw = padL + 30 + T.adv('x=y-2') + 0.9 * F;

    /* ---- steg 1: talplanet, z₁ och z₂ ---- */
    T.line([X(-5.5), oy], [X(5.5) + 8, oy]);
    T.line([X(5.5) - 1, oy - 5], [X(5.5) + 9, oy]);
    T.line([X(5.5) - 1, oy + 5], [X(5.5) + 9, oy]);
    T.pause(120);
    T.line([ox, Y(-5.5)], [ox, Y(5.5) - 8]);
    T.line([ox - 5, Y(5.5) + 1], [ox, Y(5.5) - 9]);
    T.line([ox + 5, Y(5.5) + 1], [ox, Y(5.5) - 9]);
    T.pause(120);
    T.str('Re', X(5.5) + 2, oy + 0.85 * F, null, 0.5);
    T.str('Im', ox - 10 - T.adv('Im', 0.5), Y(5.5) - 2, null, 0.5);
    for (v = -5; v <= 5; v++) {
      if (!v) continue;
      var t = (v < 0 ? '−' : '') + Math.abs(v), w = T.adv(t, 0.42);
      T.line([X(v), oy - 4], [X(v), oy + 4]);
      /* "−2" knuffas åt höger: linjen i c) går under axeln till vänster
       * om −2. y-axelns "−1" utelämnas, den krockar med x-axelns "−1". */
      /* x-axelns "−4" utelämnas: konjugatets speglingslinje i a) går där */
      if (v !== -4) T.str(t, X(v) - w / 2 + (v === -2 ? 6 : (v === -3 ? -6 : -2)), oy + 0.8 * F, null, 0.42);
      T.line([ox - 4, Y(v)], [ox + 4, Y(v)]);
      /* y-axelns "2" utelämnas också: linjen i c) går genom (0, 2) och
       * tangerade talet. Punkten får i stället etiketten 2i i c). */
      if (v !== -1 && v !== 2) T.str(t, ox - 9 - w, Y(v) + 0.16 * F, null, 0.42);
      T.pause(50);
    }
    T.pause(160);
    acts.push({ kind: 'stroke', pts: V.dotPts(X(-4), Y(3)) });
    T.str('z_1', X(-4) + 6, Y(3) - 7, null, 0.62);
    acts.push({ kind: 'stroke', pts: V.dotPts(X(3), Y(-2)) });
    T.str('z_2', X(3) + 6, Y(-2) - 7, null, 0.62);
    T.stepEnd();

    /* ---- a) ---- */
    var figB = oy + 5.5 * u + 18;
    tanke(figB, [
      [['z', 1], ['₁ ligger 4 steg till vänster och']],
      [['3 steg upp i talplanet.']]
    ], 0);
    y = figB + 115;
    T.str('a) z_1=-4+3i', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Konjugatet: imaginärdelen byter']],
      [['tecken. Det är en spegling i den']],
      [['reella axeln.']]
    ]);
    y += 2.7 * F;
    xx = T.str('z_1=-4-3i', padL + 30, y);
    /* konjugatstrecket över z */
    acts.push({ kind: 'stroke', pts: humanize([[padL + 30 + 0.22 * F, y - 0.74 * F],
                                               [padL + 30 + 0.68 * F, y - 0.76 * F]]) });
    T.pause(160);
    streckad(T, [X(-4), Y(3) + 6], [X(-4), Y(-3) - 6], BLUE, 13);
    acts.push({ kind: 'stroke', pts: V.dotPts(X(-4), Y(-3)), color: BLUE });
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: -4-3i', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['z', 1], ['₂=3−2i. Att dra bort 1 ändrar']],
      [['bara realdelen.']]
    ]);
    y += 2.9 * F;
    xx = T.str('b) z_2-1=3-2i-1', padL, y);
    T.stepEnd();

    T.str('=2-2i', xx + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Punkten ligger lika långt åt']],
      [['höger som nedåt, så visaren']],
      [['ligger 45° under reella axeln.']]
    ]);
    V.figurPil(T, [X(3) - 5, Y(-2)], [X(2) + 5, Y(-2)], BLUE);
    T.pause(140);
    acts.push({ kind: 'stroke', pts: V.dotPts(X(2), Y(-2)), color: BLUE });
    T.pause(140);
    V.figurPil(T, [ox, oy], [X(2) - 3, Y(-2) - 3], BLUE);
    T.pause(140);
    acts.push({ kind: 'stroke', color: BLUE,
                pts: (function () { var p = [], k; for (k = 0; k <= 10; k++) {
                  var a = (Math.PI / 4) * k / 10; p.push([ox + 15 * Math.cos(a), oy + 15 * Math.sin(a)]); }
                  return p; })() });
    T.stepEnd();

    tanke(y, [
      [['Vinklar medurs från den positiva']],
      [['reella axeln räknas negativa:']],
      [['45° är en fjärdedels π.']]
    ]);
    y += 3.0 * F;
    xx = T.str('arg(z_2-1)=-', padL + 30, y);
    T.fracH('π', '4', xx, y);
    T.stepEnd();

    y += 3.2 * F;
    xx = T.str('Svar: -', padL, y);
    xe = T.fracH('π', '4', xx, y);
    xe = T.str(' (eller -45°)', xe, y);
    T.underline(xe, y + 0.6 * F);
    T.stepEnd();

    /* ---- c) ---- */
    tanke(y, [
      [['Jag skriver z=x+yi. Då är x']],
      [['realdelen och y imaginärdelen.']]
    ], 1.35);
    y += 3.4 * F;
    T.str('c) z=x+yi', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Real- och imaginärdelar läggs']],
      [['ihop var för sig.']]
    ]);
    y += 2.7 * F;
    T.str('z+z_2=(x+3)+(y-2)i', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Re z är x, och Im(z+z₂) är det']],
      [['som står framför i: y−2.']]
    ]);
    y += 3.7 * F;
    T.str('Realdelen av z ska vara lika med imaginärdelen av z+z_2', padL, y - 1.9 * F, null, 0.62);
    T.str('x=y-2', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 2 i båda led, så']],
      [['att y står ensamt.']]
    ]);
    y = ekvOp(y, '+2', xw, 'x=y-2');
    xx = T.str('x+2=y', padL + 30, y);
    T.stepEnd();

    T.str('⟺ y=x+2', xx + 0.4 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Det är en rät linje med']],
      [['lutningen 1 som skär Im-axeln']],
      [['i 2. Den ritar jag i talplanet.']]
    ]);
    T.line([X(-5.5), Y(-3.5)], [X(3.5), Y(5.5)], BLUE);
    T.pause(140);
    acts.push({ kind: 'stroke', pts: V.dotPts(X(-2), oy), color: BLUE });
    acts.push({ kind: 'stroke', pts: V.dotPts(ox, Y(2)), color: BLUE });
    T.str('2i', ox - 8 - T.adv('2i', 0.5), Y(2) - 4, BLUE, 0.5);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: Linjen Im z=Re z+2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= Uppgift 8: produktregeln baklänges ================
   * Integranden är derivatan av g·h, så g·h är en primitiv funktion. */
  reg(8, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 122;
    T.str('g(x)=cos x', padL, y);
    T.str('h(x)=x^2', padL, y + 2.0 * F);
    y += 2.0 * F;
    y += 3.0 * F;
    xx = T.str('∫_0', padL + 24, y);
    xx = ovreTal(T, F, xx, y, 'π');
    passa(T, '(g’(x)·h(x)+g(x)·h’(x)) dx', xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Integranden ser precis ut som']],
      [['produktregeln när g(x)·h(x)']],
      [['deriveras.']]
    ]);
    y += 2.8 * F;
    passa(T, '(g(x)·h(x))’=g’(x)·h(x)+g(x)·h’(x)', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Alltså är g(x)·h(x) en primitiv']],
      [['funktion till integranden.']]
    ]);
    y += 2.9 * F;
    T.str('Integralen=[g(x)·h(x)]_0^π', padL, y);
    T.stepEnd();

    tanke(y, [
      [['g(x)·h(x) är cos x gånger x i']],
      [['kvadrat. Jag skriver x-faktorn']],
      [['först.']]
    ]);
    y += 2.9 * F;
    T.str('=[x^2·cos x]_0^π', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Övre gränsen minus undre.']],
      [['cos π=−1, och i den undre']],
      [['gränsen blir produkten 0.']]
    ]);
    y += 2.9 * F;
    xx = T.str('=π^2·cos π-0^2·cos 0', padL + 30, y);
    T.stepEnd();

    y += 2.5 * F;
    T.str('=π^2·(-1)-0=-π^2', padL + 30, y);
    T.stepEnd();

    y += 2.5 * F;
    xe = T.str('Svar: -π^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ================= Uppgift 9: en icke-reell rot till z^10 = 1 =========
   * Båda led i polär form, jämför belopp och argument. EKVVAL: "+1" och
   * "/10" i båda led eller på väggen. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + 30 + T.adv('10v=0°+n·360°') + 0.9 * F;

    /* väggens "+1" hamnar till höger om x = 420: raden läggs under
     * ekvval-scenernas förbjudna hörn (y < 210) */
    y = 242;
    T.str('z^1^0-1=0', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 1 i båda led.']]
    ]);
    y = ekvOp(y, '+1', xw, 'z^1^0-1=0');
    T.str('z^1^0=1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag skriver z=r(cos v+i sin v).']],
      [['De Moivres formel ger tionde-']],
      [['potensen. Talet 1 har beloppet 1']],
      [['och argumentet 0°.']]
    ]);
    y += 2.8 * F;
    T.str('r^1^0(cos 10v+i sin 10v)=1(cos 0°+i sin 0°)', padL + 30, y, null, 0.76);
    T.stepEnd();

    tanke(y, [
      [['Beloppen ska vara lika, och r är']],
      [['positivt.']]
    ]);
    y += 2.7 * F;
    T.str('r^1^0=1  ⟹  r=1', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Argumenten får skilja sig med']],
      [['hela varv: n·360°.']]
    ]);
    y += 2.7 * F;
    T.str('10v=0°+n·360°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 10.']]
    ]);
    y = ekvOp(y, '/10', xw, '10v=0°+n·360°');
    T.str('v=n·36°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['n=0 ger z=1 och n=5 ger z=−1.']],
      [['De är reella. n=1 ger en rot']],
      [['utanför den reella axeln.']]
    ]);
    y += 2.7 * F;
    T.str('n=1: z=cos 36°+i sin 36°', padL + 30, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: z=cos 36°+i sin 36°', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= Uppgift 10: rotation kring y-axeln =================
   * Radien i skivan på höjden y är x, och x = y⁴ ur kurvans ekvation. */
  reg(10, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, i;
    var tanke = mkTanke(T);

    y = 122;
    xx = T.str('y=x', padL, y);
    T.fracSup('1', '4', xx, y);
    T.stepEnd();

    /* ---- skissen: området mellan y-axeln och kurvan, under y = 2 ---- */
    var ox = padL + 60, oy = 380, u = 24;
    var A = mkAxes(T, F, { ox: ox, oy: oy, u: u, xsc: 2, ysc: 0.25,
                           xmin: 0, xmax: 17, ymin: 0, ymax: 2.2 });
    A.axes();
    A.ticks([16], [2], [16], [2]);
    T.pause(160);
    var kurva = [];
    for (i = 0; i <= 60; i++) {
      var yy = 2.03 * i / 60;
      kurva.push([A.X(Math.pow(yy, 4)), A.Y(yy)]);
    }
    acts.push({ kind: 'stroke', pts: kurva });
    T.pause(140);
    T.line([A.X(0), A.Y(2)], [A.X(16.6), A.Y(2)]);
    T.str('y=2', A.X(3), A.Y(2) - 8, null, 0.5);
    T.stepEnd();

    tanke(oy + 25, [
      [['Kroppen består av tunna vågräta']],
      [['skivor. Skivan på höjden y har']],
      [['radien x, avståndet ut till kurvan.']]
    ], 0);
    var ys = 1.55, xs = Math.pow(ys, 4);
    T.line([A.X(0), A.Y(ys)], [A.X(xs), A.Y(ys)], BLUE);
    T.pause(120);
    T.str('x', (A.X(0) + A.X(xs)) / 2 - 6, A.Y(ys) - 8, BLUE, 0.55);
    T.str('y', A.X(0) - 18, A.Y(ys) + 6, BLUE, 0.55);
    T.stepEnd();

    tanke(oy + 25, [
      [['Skivans volym är π gånger x i']],
      [['kvadrat gånger tjockleken dy.']]
    ], 0);
    y = oy + 150;
    T.str('Rotation kring y-axeln', padL, y - 1.75 * F, null, 0.62);
    /* undre gränsen hamnar till vänster om ∫: luft efter π */
    xx = T.str('V=π', padL, y);
    xx = T.str('∫_0', xx + 0.45 * F, y);
    xx = ovreTal(T, F, xx, y, '2');
    T.str('x^2 dy', xx + 0.2 * F, y);
    T.stepEnd();

    tanke(y, [
      [['x måste uttryckas med y. Jag']],
      [['upphöjer båda led till 4.']]
    ]);
    y += 4.3 * F;
    T.str('Löser ut x, eftersom radien ska uttryckas i y', padL, y - 2.15 * F, null, 0.62);
    xx = T.str('y=x', padL + 30, y);
    T.fracSup('1', '4', xx, y);
    T.stepEnd();

    /* upphöjningen skrivs likadant i båda redovisningslägena: 4:an i blått
     * i båda led */
    y += 2.8 * F;
    xx = T.str('y', padL + 30, y);
    xx = T.str('^4', xx, y, BLUE);
    xx = T.str('=(x', xx, y);
    xx = T.fracSup('1', '4', xx, y);
    xx = T.str(')', xx + 0.05 * F, y);
    T.str('^4', xx - 0.05 * F, y, BLUE);
    T.stepEnd();

    tanke(y, [
      [['En fjärdedel gånger 4 är 1, så']],
      [['högerledet blir bara x.']]
    ]);
    y += 2.8 * F;
    xx = T.str('y^4=x', padL + 30, y);
    T.stepEnd();

    T.str('⟺ x=y^4', xx + 0.4 * F, y);
    T.stepEnd();

    tanke(y, [
      [['Formeln har x i kvadrat. Då']],
      [['kvadrerar jag: exponenterna']],
      [['multipliceras, 4·2=8.']]
    ]);
    y += 2.8 * F;
    T.str('x^2=(y^4)^2=y^8', padL + 30, y);
    T.stepEnd();

    y += 2.8 * F;
    xx = T.str('V=π', padL + 30, y);
    xx = T.str('∫_0', xx + 0.45 * F, y);
    xx = ovreTal(T, F, xx, y, '2');
    T.str('y^8 dy', xx + 0.2 * F, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: g(y)=y^8', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });
})();

/* ma4-vt2022-delC-penna.js: pennlösningar till Nationellt prov Ma 4, VT 2022,
 * delprov C (uppgift 11–19).
 *
 * En scen per uppgift, registrerad som "ma4-vt2022-u<nr>". Reglerna står
 * i handskrift.js filhuvud och i data/np/RIKTLINJER.md. De som oftast
 * bränner: inget bläck vid x > 696 eller x < 24, inget med x > 420 ovanför
 * y = 150 (y = 210 i ekvval-scener), en tanke per led direkt före ledet,
 * division alltid med vågrätt streck, blå båge till varje term när en
 * parentes utvecklas, och samma antal klicksteg i båda ekvations-
 * redovisningarna (cfg.vagg + mkEkvOp + ekvval: 1).
 *
 * Samma siffror som textlösningen i data/np/ma4-vt2022-delC.js, eftersom
 * eleven växlar mellan vyerna.
 *
 * Kursen har komplexa tal, trigonometriska formler och derivator. Konjugat-
 * strecket över z finns inte som glyf och ritas med zbar() nedan; polynom-
 * divisionen i uppgift 14 ställs upp som en trappa precis som
 * layoutPolynomdivision i handskrift.js (se CLAUDE.md, "Polynomdivision").
 *
 * Granskning: node .claude/verify-handskrift.js ma4-vt2022-u11 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkMultIn = V.mkMultIn,
      mkArc = V.mkArc, mkEkvOp = V.mkEkvOp, mkSamla = V.mkSamla,
      substRings = V.substRings, fadeRings = V.fadeRings,
      humanize = V.humanize, rotFrac = V.rotFrac, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma4-vt2022-u' + nr, fn); }

  /* ---------- gemensamma småhjälpare ---------- */

  /* REGELNOT (se REGELNOT i handskrift.js filhuvud): blå text i pennans
   * glyfer som tonar in på en gång medan raden skrivs och tonar ut när
   * raden är klar. Samma teknik som regelNot i ma2c-vt2018-penna.js. */
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

  /* BRÅK MED EGEN TÄLJARE: som fracH, men täljare och nämnare skrivs av
   * funktioner, så att bågar, ringar och blå delar kan läggas in medan
   * täljaren skrivs. numW/denW = bredderna (för centrering och streckets
   * längd); sc skalar hela bråket. Skrivordning täljare, streck, nämnare. */
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
  /* bråk vars täljare och nämnare är segmentlistor */
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

  /* BRÅKET √8 / 3: täljaren skrivs med ett riktigt rottecken (T.rot),
   * eftersom tecknet √ som glyf är för litet för att täcka radikanden. */
  function rot8genom3(T, F, x0, yb) {
    return fracCB(T, F, T.rotW('8'), function (x, yn) { T.rot('8', x, yn); },
                  T.adv('3'), function (x, yd) { T.str('3', x, yd); }, x0, yb);
  }

  /* SYSTEMKLAMMER (samma som i ma2c-vt2022-penna.js): ritas som ETT
   * pennstreck, uppifrån och ned med en spets åt vänster på mitten. */
  function sysBrace(T, F, x, yTop, yBot) {
    var ym = (yTop + yBot) / 2, d = 0.22 * F;
    T.acts.push({ kind: 'stroke', pts: humanize([
      [x, yTop], [x - d * 0.55, yTop + d * 0.5], [x - d * 0.7, ym - d * 0.6],
      [x - d * 1.25, ym], [x - d * 0.7, ym + d * 0.6],
      [x - d * 0.55, yBot - d * 0.5], [x, yBot]]) });
    T.pause(160);
  }

  /* ================= DELPROV C ================= */

  /* ---- Uppgift 11: (8+6i)/(1+2i) på formen a+bi ----
   * EN SAMMANHÄNGANDE KEDJA: varje rad är hela bråket ett steg längre
   * (täljare och nämnare räknas aldrig ut för sig). Förlängningen med
   * konjugatet görs i två drag (fracOp). Täljaren multipliceras ut med en
   * båge per produkt (alla ovanifrån: under täljaren ligger bråkstrecket),
   * nämnaren med konjugatregeln som regelnot i ett eget klick (3j).
   * Likadana termer ringas in innan de slås ihop. */
  reg(11, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), multIn = mkMultIn(T), not;

    y = 150;
    T.str('Skriver på formen a+bi', padL, y - 1.9 * F, null, 0.62);
    T.fracH('8+6i', '1+2i', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Ett i i nämnaren vill jag bli av']],
      [['med. Jag förlänger med nämnarens']],
      [['konjugat 1-2i, då blir nämnaren']],
      [['reell.']]
    ], 1.05);
    y += 6.6 * F;
    T.str('Förlänger med nämnarens konjugat', padL, y - 4.1 * F, null, 0.62);
    xx = T.str('=', padL + 20, y);
    /* täljarens delar i fracOp:s läge (samma uträkning som i fracOp) */
    var w0 = Math.max(T.adv('(8+6i)'), T.adv('(1+2i)')) + 0.3 * F;
    var xNum = xx + (w0 - T.adv('(8+6i)')) / 2, yNum = y - 0.48 * F;
    function iv(pre, del) { var a = xNum + T.adv(pre); return [a, a + T.adv(del)]; }
    var P8 = iv('(', '8'), P6i = iv('(8+', '6i');
    var P1 = iv('(8+6i)(', '1'), P2i = iv('(8+6i)(1', '-2i');
    T.fracOp('(8+6i)', '(1+2i)', '(1-2i)', xx, y);
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
      { fran: P8, till: P1, skriv: '8', hojd: 20 },
      { fran: P8, till: P2i, skriv: '-16i', hojd: 32, dx: 3, dx2: 4 },
      { fran: P6i, till: P1, skriv: '+6i', hojd: 42, dx2: -3 },
      { fran: P6i, till: P2i, skriv: '-12i^2', hojd: 52, dx: 3, dx2: 6 }
    ];
    var numW3 = T.adv('8-16i+6i-12i^2'), denS3 = '1^2-(2i)^2';
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
    not = regelNot(T, F, '(a+b)(a-b)=a^2-b^2', padL + 30, y + 2.9 * F);
    T.str(denS3, xx + (wD3 - T.adv(denS3)) / 2, ybar3 + 1.04 * F + 0.2 * F);
    regelGom(T, not);
    xx += wD3 + 1.5;
    T.stepEnd();

    /* ---- ihopslagning och (2i)^2 ---- */
    tanke(y, [
      [['-16i och 6i slås ihop till -10i.']],
      [['I nämnaren är (2i)^2=4i^2.']]
    ], 1.3);
    var y3n = y - 0.48 * F;
    y += 5.4 * F;
    xx = T.str('=', padL + 20, y);
    xx = fracCB(T, F, T.adv('8-10i-12i^2'), function (x, yn) {
      x = T.str('8', x, yn);
      var r1 = T.ring(D[1].x0, D[1].x1, y3n);
      T.pause(260);
      var r2 = T.ring(D[2].x0 + T.adv('+'), D[2].x1, y3n);
      T.pause(220);
      x = T.str('-10i', x, yn);
      T.pause(260);
      T.fade(r1); T.fade(r2);
      T.str('-12i^2', x, yn);
    }, T.adv('1-4i^2'), function (x, yd) { T.str('1-4i^2', x, yd); }, xx, y, 1, true);
    T.stepEnd();

    /* ---- i^2 = −1 ---- */
    tanke(y, [
      [['i^2=-1 i både täljare och']],
      [['nämnare: -12i^2 blir +12 och']],
      [['-4i^2 blir +4.']]
    ], 1.3);
    var y4 = y, R5;
    xx = T.str('=', xx, y4);
    R5 = fracSegs(T, F, [['8'], ['-10i'], ['+12']], [['1+4']], xx, y4);
    xx = R5.x;
    T.stepEnd();

    tanke(y4, [
      [['Realdelarna 8 och 12 slås ihop,']],
      [['och 1+4=5.']]
    ], 1.3);
    var p5 = R5.num.pos, y5n = R5.yNum;
    y4 += 5.0 * F;
    xx = T.str('=', padL + 20, y4);
    xx = fracCB(T, F, T.adv('20-10i'), function (x, yn) {
      var r1 = T.ring(p5[0][0], p5[0][1], y5n);
      T.pause(260);
      var r2 = T.ring(p5[2][0] + T.adv('+'), p5[2][1], y5n);
      T.pause(220);
      x = T.str('20', x, yn);
      T.pause(260);
      T.fade(r1); T.fade(r2);
      T.str('-10i', x, yn);
    }, T.adv('5'), function (x, yd) { T.str('5', x, yd); }, xx, y4);
    T.stepEnd();

    tanke(y4, [
      [['Nämnaren är reell, så realdelen']],
      [['och imaginärdelen delas med 5']],
      [['var för sig.']]
    ], 1.05);
    var y5 = y4;
    xx = T.str('=', xx, y5);
    xx = T.fracH('20', '5', xx, y5);
    xx = T.str('-', xx, y5);
    xx = T.fracH('10', '5', xx, y5);
    xx = T.str('i', xx, y5);
    T.stepEnd();

    xx = T.str('=4-2i', xx, y5);
    T.stepEnd();

    tanke(y5, [
      [['Kontroll: (4-2i)(1+2i)=']],
      [['4+8i-2i-4i^2=8+6i. Stämmer.']]
    ], 1.05);
    y = y5 + 4.0 * F;
    xe = T.str('Svar: 4-2i', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 12: sin 4x = √3/2 ----
   * Exakt värde: sin 60° = √3/2. Två lösningsfamiljer för 4x (60° och
   * 180° − 60°), sedan division med 4 i båda led, som i layoutSinekvation-
   * fyra (ma4-1.3 ex 2). Till sist samma lösningar i radianer. */
  reg(12, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, xe2;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);

    function delaMed4(hl) {
      return function (yb) {
        var x = T.fracH('4x', '4', padL + 30, yb, null, BLUE);
        x = T.str('=', x, yb);
        T.fracH(hl + '+n·360°', '4', x, yb, null, BLUE);
      };
    }
    /* uppdelningen i två bråk är en egen rad, sedan förenklingen */
    function delaUpp(yb, hl, svar) {
      var x = T.str('x=', padL + 30, yb);
      x = T.fracH(hl, '4', x, yb);
      x = T.str('+', x, yb);
      T.fracH('n·360°', '4', x, yb);
      T.stepEnd();
      tanke(yb, [
        [[hl + ' delat med 4 och 360°']],
        [['delat med 4 är 90°.']]
      ], 1.05);
      yb += 3.0 * F;
      T.str(svar, padL + 30, yb);
      T.stepEnd();
      return yb;
    }
    var OPT4 = { dy: 3.2, dyRes: 3.0, dyVagg: 3.0, vopt: { h0: 1.25, h1: 1.15 } };

    y = 130;
    xx = T.str('sin 4x=', padL, y);
    fracCB(T, F, T.rotW('3'), function (x, yn) { T.rot('3', x, yn); },
           T.adv('2'), function (x, yd) { T.str('2', x, yd); }, xx, y);
    T.stepEnd();

    tanke(y, [
      [['√3/2 är ett exakt värde. Det är']],
      [['sinus för 60°, känt från den']],
      [['liksidiga triangeln.']]
    ], 1.05);
    y += 4.4 * F;
    xx = T.str('sin 60°=', padL, y);
    fracCB(T, F, T.rotW('3'), function (x, yn) { T.rot('3', x, yn); },
           T.adv('2'), function (x, yd) { T.str('2', x, yd); }, xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sinus är y-koordinaten. Två']],
      [['vinklar per varv har samma höjd:']],
      [['60° och 180°-60°. Argumentet är']],
      [['hela 4x.']]
    ], 1.05);

    /* ---- första lösningen ---- */
    y += 4.4 * F;
    T.str('Första lösningen', padL, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    xx = T.str('4x=60°+n·360°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 4.']],
      [['Då delas även perioden 360°']],
      [['med 4.']]
    ]);
    y = ekvOp(y, '/4', xx + 0.6 * F, delaMed4('60°'), OPT4);
    y = delaUpp(y, '60°', 'x=15°+n·90°');

    /* ---- andra lösningen ---- */
    y += 3.2 * F;
    T.str('Andra lösningen', padL, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    T.str('4x=180°-60°+n·360°', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('4x=120°+n·360°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Samma division med 4 här.']]
    ]);
    y = ekvOp(y, '/4', xx + 0.6 * F, delaMed4('120°'), OPT4);
    y = delaUpp(y, '120°', 'x=30°+n·90°');

    /* ---- radianer ---- */
    tanke(y, [
      [['Samma lösningar i radianer:']],
      [['180° är π, så 15° är π/12,']],
      [['30° är π/6 och 90° är π/2.']]
    ]);
    y += 3.4 * F;
    T.str('I radianer', padL, y, null, 0.62);
    T.pause(200);
    y += 2.6 * F;
    xx = T.str('x=', padL, y);
    xx = T.fracH('π', '12', xx, y);
    xx = T.str('+n·', xx, y);
    T.fracH('π', '2', xx, y);
    T.pause(300);
    xx = T.str('x=', padL + 300, y);
    xx = T.fracH('π', '6', xx, y);
    xx = T.str('+n·', xx, y);
    T.fracH('π', '2', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: sin(4·15°)=sin 60° och']],
      [['sin(4·30°)=sin 120°. Båda är √3/2.']]
    ], 1.05);
    y += 4.0 * F;
    xe = T.str('Svar: x=15°+n·90°', padL, y);
    y += 2.3 * F;
    xe2 = T.str('och x=30°+n·90°', padL + T.adv('Svar: '), y);
    T.str('(n heltal)', xe2 + 0.5 * F, y, null, 0.62);
    T.underline(Math.max(xe, xe2), y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 13: (z − z̄)/(2i) = Im z ----
   * z skrivs på allmän form, insättningen görs med ringar, minus framför
   * parentesen byter tecken (blått), a och −a ringas in och tar ut
   * varandra, och 2i förkortas bort. */
  reg(13, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);
    var zzW = T.adv('z-') + T.adv('z');
    function zMinusZbar(x, yn) { var x1 = T.str('z-', x, yn); zbar(T, F, x1, yn); }
    function tvaI(x, yd) { T.str('2i', x, yd); }

    y = 176;
    T.str('Ska visa att', padL, y - 1.9 * F, null, 0.62);
    xx = fracCB(T, F, zzW, zMinusZbar, T.adv('2i'), tvaI, padL, y);
    T.str('=Im z', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Det ska gälla för alla komplexa']],
      [['tal, så jag skriver z på allmän']],
      [['form med reella a och b.']]
    ], 1.05);
    var y2 = y + 4.6 * F;
    var zA0 = padL + T.adv('z=');
    var zA1 = T.str('z=a+bi', padL, y2);
    T.pause(300);
    var xzb = padL + 200;
    xx = zbar(T, F, xzb, y2);
    var zB0 = T.str('=', xx, y2);
    var zB1 = T.str('a-bi', zB0, y2);
    T.pause(300);
    T.str('Im z=b', padL + 400, y2);
    T.stepEnd();

    tanke(y2, [
      [['Jag utgår från vänsterledet och']],
      [['förenklar det tills jag ser om']],
      [['det blir lika med högerledet.']]
    ]);
    var y3 = y2 + 4.4 * F;
    xx = T.str('VL=', padL, y3);
    var xn0 = xx + 0.15 * F;
    xx = fracCB(T, F, zzW, zMinusZbar, T.adv('2i'), tvaI, xx, y3);
    var xn1 = xx - 0.15 * F;
    T.stepEnd();

    tanke(y3, [
      [['Jag sätter in a+bi och a-bi.']],
      [['Parentesen behövs, eftersom hela']],
      [['konjugatet ska dras bort.']]
    ], 1.05);
    r = substRings(acts, [[zA0, zA1, y2, F], [zB0, zB1, y2, F],
                          [xn0, xn1, y3 - 0.48 * F, F]]);
    xx = T.str('=', xx, y3);
    T.fracH('a+bi-(a-bi)', '2i', xx, y3);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y3, [
      [['Minustecknet framför parentesen']],
      [['byter tecken på båda termerna i']],
      [['den.']]
    ], 1.05);
    var y4 = y3 + 4.6 * F;
    xx = T.str('=', padL + 40, y4);
    var R4 = fracSegs(T, F, [['a+bi'], ['-a', BLUE], ['+bi', BLUE]], [['2i']], xx, y4);
    xx = R4.x;
    T.stepEnd();

    tanke(y4, [
      [['a och -a tar ut varandra, och']],
      [['bi+bi blir 2bi.']]
    ], 1.05);
    var np = R4.num.pos, yn = R4.yNum;
    xx = T.str('=', xx, y4);
    xx = fracCB(T, F, T.adv('2bi'), function (x, ynn) {
      var r1 = T.ring(np[0][0], np[0][0] + T.adv('a'), yn);
      T.pause(260);
      var r2 = T.ring(np[1][0], np[1][1], yn);
      T.pause(420);
      T.fade(r1); T.fade(r2);
      T.pause(200);
      var r3 = T.ring(np[0][0] + T.adv('a+'), np[0][1], yn);
      T.pause(260);
      var r4 = T.ring(np[2][0] + T.adv('+'), np[2][1], yn);
      T.pause(220);
      T.str('2bi', x, ynn);
      T.pause(260);
      T.fade(r3); T.fade(r4);
    }, T.adv('2i'), tvaI, xx, y4);
    T.stepEnd();

    tanke(y4, [
      [['Faktorn 2i finns i både täljare']],
      [['och nämnare. Jag förkortar bort']],
      [['den.']]
    ], 1.05);
    var y4b = y4 + 4.6 * F;
    xx = T.str('=', padL + 40, y4b);
    xx = T.fracOp('2bi', '2i', '/(2i)', xx, y4b);
    T.stepEnd();

    xx = T.str('=b', xx, y4b);
    T.stepEnd();

    tanke(y4b, [
      [['Högerledet är imaginärdelen,']],
      [['och den är b.']]
    ], 1.05);
    var y5 = y4b + 4.0 * F;
    T.str('HL=Im z=b', padL, y5);
    T.stepEnd();

    tanke(y5, [
      [['Båda leden blev b, vilket']],
      [['komplext tal z vi än valde.']]
    ]);
    y = y5 + 2.8 * F;
    xe = T.str('VL=HL för alla komplexa z', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 14: polynomdivision med z^2 − 1, sedan f(z) = 0 ----
   * a) TRAPPAN som i layoutPolynomdivision (ma4-4.4 ex 4): täljaren först,
   * sedan strecket ovanför, det lodräta strecket och nämnaren i trapp-
   * steget. Varje varv: ringa nämnarens z^2 och radens första term, skriv
   * kvotens term, produkten under termerna med samma grad, minus och
   * parentes framför, strecket, och allt som blir kvar. Nämnaren saknar
   * z-term, så produkterna får en lucka (z^4 … −z^2, 2z^3 … −2z).
   * b) nollproduktmetoden: z^2 − 1 = 0 (+1 i båda led, roten ur som egen
   * rad) och pq-formeln på z^2 + 2z + 10 = 0. */
  reg(14, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), adv = T.adv;
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var x0 = padL + 66, dy = 1.85 * F;

    function dragBort(xs, xe, yb) {
      var xp = xs - adv('(');
      T.str('-', xp - adv('-'), yb);
      T.pause(160);
      T.str('(', xp, yb);
      T.pause(160);
      return T.str(')', xe, yb);
    }
    function streck(xa, xb, yb) {
      T.line([xa, yb + 0.42 * F], [xb, yb + 0.42 * F]);
    }

    /* ---- a) täljaren och trappan ----
     * Allt till höger om x = 420 ligger under y = 210 (ekvval-scenens
     * högre inställningsruta). */
    var yD = 268, yQ = yD - 1.78 * F;
    T.str('a)', padL, yD - 2.9 * F, null, 0.62);
    var DIV = 'z^4+2z^3+9z^2-2z-10';
    var xD = T.str(DIV, x0, yD);
    T.stepEnd();

    tanke(yD, [
      [['f(z) är delbart med g(z) om']],
      [['divisionen går jämnt upp. Jag']],
      [['dividerar med z^2-1.']]
    ]);
    var yL = yD - 1.24 * F, yB = yD + 0.42 * F, xv = xD + 0.30 * F;
    T.line([x0 - 0.15 * F, yL], [xv, yL]);
    T.pause(120);
    T.line([xv, yL], [xv, yB]);
    T.pause(120);
    T.line([xv, yB], [xv + adv('z^2-1') + 0.9 * F, yB]);
    T.stepEnd();

    var xn = xv + 0.45 * F;
    T.str('z^2-1', xn, yD);
    T.stepEnd();

    /* först nämnarens z^2, sedan radens första term */
    function ringaIn(xs, ledS, yb) {
      return substRings(acts, [
        [xn, xn + adv('z^2'), yD, F],
        [xs, xs + adv(ledS) + 0.12 * F, yb, F]
      ]);
    }

    /* kolumner i täljaren */
    var k3 = x0 + adv('z^4+');               /* 2z^3 */
    var k2p = x0 + adv('z^4+2z^3');          /* tecknet före 9z^2 */
    /* ---- varv 1 ---- */
    tanke(yD, [
      [['z^4 delat med nämnarens z^2']],
      [['är z^2. Det är kvotens första']],
      [['term.']]
    ]);
    var ringar = ringaIn(x0, 'z^4', yD);
    var xq = T.str('z^2', x0, yQ);
    T.stepEnd();

    tanke(yD, [
      [['z^2 gånger (z^2-1) är z^4-z^2.']],
      [['Varje term skriver jag under']],
      [['termen med samma grad.']]
    ]);
    fadeRings(acts, ringar);
    y = yD + dy;
    T.str('z^4', x0, y);
    T.pause(200);
    xe = T.str('-z^2', k2p, y);
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
      [['z^4-z^4=0 och 9z^2-(-z^2)=10z^2.']],
      [['Resten av termerna skriver jag']],
      [['av som de står.']]
    ], 0.42);
    var yR1 = y + dy;
    var R1 = '2z^3+10z^2-2z-10';
    var xR1 = T.str(R1, k3, yR1);
    var r1z2 = k3 + adv('2z^3+');            /* 10z^2 */
    var r1z1 = k3 + adv('2z^3+10z^2');       /* -2z   */
    var r1z0 = k3 + adv('2z^3+10z^2-2z');    /* -10   */
    T.stepEnd();

    /* ---- varv 2 ---- */
    tanke(yR1, [
      [['2z^3 delat med z^2 är 2z.']]
    ]);
    ringar = ringaIn(k3, '2z^3', yR1);
    xq = T.str('+2z', xq, yQ);
    T.stepEnd();

    tanke(yR1, [
      [['2z gånger (z^2-1) är 2z^3-2z.']],
      [['Här saknas en z^2-term.']]
    ]);
    fadeRings(acts, ringar);
    y = yR1 + dy;
    T.str('2z^3', k3, y);
    T.pause(200);
    xe = T.str('-2z', r1z1, y);
    T.stepEnd();

    dragBort(k3, xe, y);
    T.stepEnd();

    streck(k3 - adv('(') - 0.1 * F, xR1 + 0.1 * F, y);
    T.stepEnd();

    tanke(y, [
      [['z-termerna tar ut varandra:']],
      [['-2z-(-2z)=0. Kvar blir 10z^2']],
      [['och -10.']]
    ], 0.42);
    var yR2 = y + dy;
    T.str('10z^2', r1z2, yR2);
    T.pause(200);
    var xR2 = T.str('-10', r1z0, yR2);
    T.stepEnd();

    /* ---- varv 3 ---- */
    tanke(yR2, [
      [['10z^2 delat med z^2 är 10.']]
    ]);
    ringar = ringaIn(r1z2, '10z^2', yR2);
    xq = T.str('+10', xq, yQ);
    T.stepEnd();

    tanke(yR2, [
      [['10 gånger (z^2-1) är 10z^2-10.']]
    ]);
    fadeRings(acts, ringar);
    y = yR2 + dy;
    T.str('10z^2', r1z2, y);
    T.pause(200);
    xe = T.str('-10', r1z0, y);
    T.stepEnd();

    dragBort(r1z2, xe, y);
    T.stepEnd();

    streck(r1z2 - adv('(') - 0.1 * F, Math.max(xR2, xe) + 0.1 * F, y);
    T.pause(200);
    var y0 = y + dy;
    T.str('0', r1z0 + adv('-1'), y0);
    T.stepEnd();

    tanke(y0, [
      [['Resten blev 0, så z^2-1 går']],
      [['jämnt upp. Kvoten står överst,']],
      [['ovanför strecket.']]
    ]);
    T.ring(x0 - 0.55 * F, xq + 0.6 * F, yQ, { ry: 0.84 * F, cy: yQ - 0.4 * F });
    T.stepEnd();

    tanke(y0, [
      [['Kvoten är den andra faktorn.']]
    ]);
    y = y0 + 3.0 * F;
    xe = T.str('f(z)=(z^2-1)(z^2+2z+10)', padL, y);
    T.stepEnd();

    y += 2.6 * F;
    xe = T.str('Svar: f(z) är delbart med g(z)', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Faktoriseringen från a) gör att']],
      [['ekvationen kan lösas med noll-']],
      [['produktmetoden.']]
    ]);
    y += 4.2 * F;
    T.str('b)', padL, y - 1.9 * F, null, 0.62);
    T.str('(z^2-1)(z^2+2z+10)=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En produkt är noll när någon']],
      [['av faktorerna är noll. Först']],
      [['den första faktorn.']]
    ]);
    y += 3.6 * F;
    T.str('Löser första faktorn', padL, y - 1.6 * F, null, 0.62);
    xx = T.str('z^2-1=0', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 1 till båda led.']]
    ]);
    y = ekvOp(y, '+1', xx + 0.6 * F, 'z^2-1=0', { x0: padL });
    T.str('z^2=1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led. Glöm inte']],
      [['den negativa roten.']]
    ]);
    y += 2.8 * F;
    xx = T.str('z=±', padL, y);
    T.rot('1', xx + 0.3 * F, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('z=±1', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Nu den andra faktorn. pq-formeln']],
      [['med p=2 och q=10. Halva p är 1.']]
    ]);
    y += 3.6 * F;
    T.str('Löser andra faktorn med pq-formeln', padL, y - 1.6 * F, null, 0.62);
    T.str('z^2+2z+10=0', padL, y);
    T.pause(300);
    y += 3.0 * F;
    xx = T.str('z=-1±', padL, y);
    T.rot('1^2-10', xx + 0.3 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    xx = T.str('z=-1±', padL, y);
    T.rot('-9', xx + 0.3 * F, y);
    T.stepEnd();

    tanke(y, [
      [['√-9 är 3i, eftersom']],
      [['(3i)^2=9i^2=-9.']]
    ]);
    y += 2.8 * F;
    T.str('z=-1±3i', padL, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: z=±1 och z=-1±3i', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 15: bevis av en trigonometrisk identitet ----
   * Vänsterledet görs liknämnigt (förlängningsfaktorerna i blått), täljaren
   * multipliceras ut med en båge per term och nämnaren med konjugat-
   * regeln. Likadana termer ringas in och slås ihop. Formlerna för dubbla
   * vinkeln poppar upp som regelnoter, en per klicksteg. De breda
   * bråkraderna skrivs i 0,8-storlek så att de ryms på en rad. */
  reg(15, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, not;
    var tanke = mkTanke(T), arc = mkArc(T);
    var SC = 0.8;

    y = 200;
    xx = T.str('VL=', padL, y);
    xx = T.fracH('sin x', 'cos x-sin x', xx, y);
    xx = T.str('+', xx, y);
    T.fracH('sin x', 'cos x+sin x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bråken får samma nämnare om']],
      [['det första förlängs med cos x+sin x']],
      [['och det andra med cos x-sin x.']]
    ], 1.05);
    var y2 = y + 5.6 * F;
    xx = T.str('=', padL + 20, y2);
    var R2 = fracSegs(T, F,
      [['sin x'], ['(cos x+sin x)', BLUE], ['+sin x'], ['(cos x-sin x)', BLUE]],
      [['(cos x-sin x)(cos x+sin x)']], xx, y2, SC);
    T.stepEnd();

    /* täljaren: sin x multipliceras in i varje parentes, en båge per term */
    tanke(y2, [
      [['I täljaren multipliceras sin x in']],
      [['i parenteserna. Nämnaren ger']],
      [['konjugatregeln.']]
    ], 1.1);
    var y3 = y2 + 5.0 * F;
    var p = R2.num.pos, yS = R2.yNum, yArc = yS - 1.08 * F * SC;
    var f1 = [p[0][0], p[0][1]];
    var f2 = [p[2][0] + T.adv('+', SC), p[2][1]];
    var a1 = [p[1][0] + T.adv('(', SC), p[1][0] + T.adv('(cos x', SC)];
    var b1 = [p[1][0] + T.adv('(cos x+', SC), p[1][1] - T.adv(')', SC)];
    var a2 = [p[3][0] + T.adv('(', SC), p[3][0] + T.adv('(cos x', SC)];
    var b2 = [p[3][0] + T.adv('(cos x-', SC), p[3][1] - T.adv(')', SC)];
    function mid(iv) { return (iv[0] + iv[1]) / 2; }
    var TERM = [
      { fran: f1, till: a1, skriv: 'sin x cos x', hojd: 20 },
      { fran: f1, till: b1, skriv: '+sin^2x', hojd: 32, dx: 4 },
      { fran: f2, till: a2, skriv: '+sin x cos x', hojd: 20 },
      { fran: f2, till: b2, skriv: '-sin^2x', hojd: 32, dx: 4 }
    ];
    var numW3 = segsW(T, TERM.map(function (t) { return [t.skriv]; }), SC);
    var denS3 = 'cos^2x-sin^2x';
    xx = T.str('=', padL + 20, y3);
    var yNum3;
    xx = fracCB(T, F, numW3, function (x, yn) {
      yNum3 = yn;
      TERM.forEach(function (t) {
        arc(mid(t.fran) + (t.dx || 0), mid(t.till), yArc, t.hojd, BLUE, false);
        t.x0 = x;
        x = T.str(t.skriv, x, yn, null, SC);
        t.x1 = x;
        T.pause(200);
      });
    }, T.adv(denS3, SC), function (x, yd) {
      not = regelNot(T, F, '(a-b)(a+b)=a^2-b^2', padL + 30, y3 + 2.6 * F);
      T.str(denS3, x, yd, null, SC);
      regelGom(T, not);
    }, xx, y3, SC, true);
    T.stepEnd();

    /* likadana termer ringas in och slås ihop */
    tanke(y3, [
      [['Två termer sin x cos x blir']],
      [['2sin x cos x, och sin^2x-sin^2x=0.']]
    ], 1.2);
    var y4 = y3 + 5.0 * F;
    var plusW = T.adv('+', SC);
    xx = T.str('=', padL + 20, y4);
    xx = fracCB(T, F, T.adv('2sin x cos x'), function (x, yn) {
      var r1 = T.ring(TERM[0].x0, TERM[0].x1, yNum3);
      T.pause(260);
      var r2 = T.ring(TERM[2].x0 + plusW, TERM[2].x1, yNum3);
      T.pause(220);
      T.str('2sin x cos x', x, yn);
      T.pause(260);
      T.fade(r1); T.fade(r2);
      T.pause(200);
      var r3 = T.ring(TERM[1].x0 + plusW, TERM[1].x1, yNum3);
      T.pause(260);
      var r4 = T.ring(TERM[3].x0, TERM[3].x1, yNum3);
      T.pause(420);
      T.fade(r3); T.fade(r4);
    }, T.adv(denS3), function (x, yd) {
      T.str(denS3, x, yd);
    }, xx, y4, 1, true);
    T.stepEnd();

    /* dubbla vinkeln: en formel per klicksteg (REGEL EN REGELNOT PER
     * KLICKSTEG). Täljaren och strecket i första steget, nämnaren i det
     * andra. Noterna läggs under raden, där inget är skrivet än. */
    tanke(y4, [
      [['Täljaren känner jag igen ur']],
      [['formeln för sinus för dubbla']],
      [['vinkeln.']]
    ], 1.3);
    xx = T.str('=', xx, y4);
    var wD = Math.max(T.adv('sin 2x'), T.adv('cos 2x')) + 0.3 * F;
    var ybar = y4 - 0.34 * F;
    not = regelNot(T, F, 'sin 2v=2sin v cos v', padL + 30, y4 + 2.7 * F);
    T.str('sin 2x', xx + (wD - T.adv('sin 2x')) / 2, ybar - 0.14 * F);
    T.pause(130);
    acts.push({ kind: 'stroke', pts: humanize([[xx, ybar], [xx + wD, ybar]]) });
    T.stepEnd();
    regelGom(T, not);

    not = regelNot(T, F, 'cos 2v=cos^2v-sin^2v', padL + 30, y4 + 2.7 * F);
    T.str('cos 2x', xx + (wD - T.adv('cos 2x')) / 2, ybar + 1.04 * F);
    regelGom(T, not);
    xx += wD + 1.5;
    T.stepEnd();

    tanke(y4, [
      [['Sinus delat med cosinus för samma']],
      [['vinkel är tangens.']]
    ], 1.3);
    T.str('=tan 2x', xx, y4);
    T.stepEnd();

    tanke(y4, [
      [['Högerledet är tan 2x.']]
    ], 1.3);
    var y5 = y4 + 3.8 * F;
    T.str('HL=tan 2x', padL, y5);
    T.stepEnd();

    y = y5 + 2.8 * F;
    xe = T.str('VL=HL, likheten är visad', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 16: tan v när sin^2 v = 8/9 och 90° < v < 180° ----
   * Trigonometriska ettan ger cos^2 v, roten ur ger ± (egen rad), tecknen
   * väljs efter kvadranten, och kvoten sin v / cos v räknas ut. */
  reg(16, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T);

    y = 176;
    xx = T.str('sin^2v=', padL, y);
    var s8 = padL, s9 = T.fracH('8', '9', xx, y);
    T.str('90°<v<180°', padL + 260, y);
    T.stepEnd();

    tanke(y, [
      [['Trigonometriska ettan kopplar']],
      [['ihop sinus och cosinus för samma']],
      [['vinkel. Jag löser ut cos^2v.']]
    ], 1.05);
    var y2 = y + 4.4 * F;
    T.str('Trigonometriska ettan', padL, y2 - 1.5 * F, null, 0.62);
    xx = T.str('sin^2v+cos^2v=1 ⟺ cos^2v=1-', padL, y2);
    var q0 = xx;
    var q1 = T.str('sin^2v', xx, y2);
    T.stepEnd();

    tanke(y2, [
      [['Jag sätter in 8/9 på sin^2v:s']],
      [['plats.']]
    ]);
    r = substRings(acts, [[s8, s9, y - 0.2 * F, F, { ry: 1.5 * F, cy: y - 0.35 * F }],
                          [q0, q1, y2, F]]);
    var y3 = y2 + 3.8 * F;
    xx = T.str('cos^2v=1-', padL, y3);
    xx = T.fracH('8', '9', xx, y3);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y3, [
      [['1 är 9/9, och 9-8=1.']]
    ], 1.05);
    xx = T.str('=', xx, y3);
    T.fracH('1', '9', xx, y3);
    T.stepEnd();

    tanke(y3, [
      [['Roten ur båda led. Cosinus kan']],
      [['vara positiv eller negativ.']]
    ], 1.05);
    var y4 = y3 + 4.6 * F;
    xx = T.str('cos v=±', padL, y4);
    rotFrac(T, F, '1', '9', xx + 0.12 * F, y4);
    T.stepEnd();

    var y4b = y4 + 4.2 * F;
    xx = T.str('=±', padL + 60, y4b);
    T.fracH('1', '3', xx, y4b);
    T.stepEnd();

    tanke(y4b, [
      [['På samma sätt för sinus: roten ur']],
      [['9 i nämnaren är 3.']]
    ], 1.05);
    var y5 = y4b + 4.6 * F;
    xx = T.str('sin v=±', padL, y5);
    rotFrac(T, F, '8', '9', xx + 0.12 * F, y5);
    T.stepEnd();

    var y5b = y5 + 4.2 * F;
    xx = T.str('=±', padL + 60, y5b);
    rot8genom3(T, F, xx, y5b);
    T.stepEnd();

    tanke(y5b, [
      [['90°<v<180° är andra kvadranten.']],
      [['Där är x-koordinaten negativ, så']],
      [['cosinus är negativ.']]
    ], 1.05);
    var y6 = y5b + 4.6 * F;
    xx = T.str('cos v=-', padL, y6);
    var c1 = T.fracH('1', '3', xx, y6);
    var c0 = padL + T.adv('cos v=');
    T.stepEnd();

    tanke(y6, [
      [['y-koordinaten är positiv, så']],
      [['sinus är positiv.']]
    ], 1.05);
    xx = T.str('sin v=', padL + 300, y6);
    var sv0 = xx;
    var sv1 = rot8genom3(T, F, xx, y6);
    T.stepEnd();

    tanke(y6, [
      [['Tangens är sinus delat med']],
      [['cosinus.']]
    ], 1.05);
    var y7 = y6 + 4.8 * F;
    xx = T.str('tan v=', padL, y7);
    var t0 = xx;
    xx = T.fracH('sin v', 'cos v', xx, y7);
    var t1 = xx;
    T.stepEnd();

    tanke(y7, [
      [['Nu sätter jag in värdena.']]
    ], 1.05);
    r = substRings(acts, [[sv0, sv1, y6 - 0.35 * F, F, { ry: 1.45 * F, cy: y6 - 0.35 * F }],
                          [c0, c1, y6 - 0.35 * F, F, { ry: 1.45 * F, cy: y6 - 0.35 * F }],
                          [t0, t1, y7 - 0.35 * F, F, { ry: 1.45 * F, cy: y7 - 0.35 * F }]]);
    xx = T.str('=', xx, y7);
    /* bråk i bråk (som T.bigFrac, men med rottecken i täljaren) */
    (function () {
      var wIn = Math.max(T.fracW('8', '3') + 0.46 * F, T.fracW('-1', '3'));
      var w = wIn + 0.62 * F, ybar = y7 - 0.34 * F;
      rot8genom3(T, F, xx + (w - (T.rotW('8') + 0.3 * F)) / 2, ybar - 1.18 * F + 0.34 * F);
      T.pause(150);
      acts.push({ kind: 'stroke', pts: humanize([[xx, ybar], [xx + w, ybar]]) });
      T.pause(150);
      T.fracH('-1', '3', xx + (w - T.fracW('-1', '3')) / 2, ybar + 1.18 * F + 0.34 * F);
      xx = xx + w + 1.5;
    })();
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y7, [
      [['Att dividera med ett bråk är att']],
      [['multiplicera med det inverterade']],
      [['bråket.']]
    ], 1.9);
    var y8 = y7 + 5.2 * F;
    xx = T.str('=', padL + 60, y8);
    xx = rot8genom3(T, F, xx, y8);
    xx = T.mul(xx, y8);
    xx = T.fracH('3', '-1', xx, y8);
    T.stepEnd();

    tanke(y8, [
      [['Treorna tar ut varandra.']]
    ], 1.05);
    xx = T.str('=-', xx, y8);
    T.rot('8', xx, y8);
    T.stepEnd();

    tanke(y8, [
      [['Rimligt: i andra kvadranten är']],
      [['sinus positiv och cosinus negativ,']],
      [['så tangens är negativ.']]
    ], 1.05);
    y = y8 + 4.0 * F;
    xe = T.str('Svar: -', padL, y);
    xe = T.rot('8', xe, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 17: f(x) = (ax+b)/(x+1), f(1) = 4 och f'(1) = 3 ----
   * Varje villkor ger en ekvation: f(1) ger a + b = 8, kvotregeln och
   * f'(1) ger a − b = 12. Ekvationssystemet löses med additionsmetoden.
   * Multiplikationerna i båda led redovisas i det valda läget. */
  reg(17, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, r;
    var tanke = mkTanke(T), multIn = mkMultIn(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var OPTB = { dy: 3.4, dyRes: 2.4, dyVagg: 2.6, vopt: { h0: 1.25, h1: 1.15 } };

    /* gånger i båda led för ett bråk = tal: VL·k = HL·k, k i blått */
    function ganger(num, den, hl, k) {
      return function (yb) {
        var x = T.fracH(num, den, padL + 30, yb);
        x = T.str('·' + k, x, yb, BLUE);
        x = T.str('=' + hl, x, yb);
        T.str('·' + k, x, yb, BLUE);
      };
    }

    y = 150;
    xx = T.str('f(x)=', padL, y);
    var fx0 = xx;
    var fx1 = T.fracH('ax+b', 'x+1', xx, y);
    T.stepEnd();

    y += 3.6 * F;
    var v10 = padL + T.adv('f(');
    var v11 = v10 + T.adv('1');
    T.str('f(1)=4', padL, y);
    var yV = y;
    var d10 = padL + 220 + T.adv('f’(');
    var d11 = d10 + T.adv('1');
    T.str('f’(1)=3', padL + 220, y);
    T.stepEnd();

    /* ---- villkoret f(1) = 4 ---- */
    tanke(y, [
      [['Två okända konstanter kräver två']],
      [['ekvationer. Första villkoret: jag']],
      [['sätter in x=1 i f(x).']]
    ]);
    r = substRings(acts, [[v10, v11, yV, F],
                          [fx0, fx1, 150 - 0.35 * F, F, { ry: 1.45 * F, cy: 150 - 0.35 * F }]]);
    y = yV + 5.0 * F;
    T.str('Villkoret f(1)=4 ger en ekvation', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('f(1)=', padL, y);
    xx = T.fracH('a·1+b', '1+1', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('a+b', '2', xx, y);
    fadeRings(acts, r);
    T.stepEnd();

    y += 4.2 * F;
    xx = T.fracH('a+b', '2', padL, y);
    xx = T.str('=4', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag multiplicerar båda led med 2.']]
    ], 1.05);
    y = ekvOp(y, '·2', xx + 0.6 * F, ganger('a+b', '2', '4', '2'), OPTB);
    var e1y = y, e1x0 = padL + 30;
    var e1x1 = T.str('a+b=8', padL + 30, y);
    T.stepEnd();

    /* ---- derivatan med kvotregeln ---- */
    tanke(y, [
      [['f är en kvot, så jag deriverar']],
      [['med kvotregeln. Täljarens derivata']],
      [['är a, nämnarens är 1.']]
    ]);
    y += 5.4 * F;
    T.str('Deriverar med kvotregeln', padL, y - 3.1 * F, null, 0.62);
    xx = T.str('f’(x)=', padL, y);
    var NUM = [['a'], ['·('], ['x'], ['+'], ['1'], [')-(ax+b)·1']];
    var R = fracSegs(T, F, NUM, [['(x+1)^2']], xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag multiplicerar in a i parentesen.']],
      [['Minus framför den andra parentesen']],
      [['byter tecken på båda termerna.']]
    ], 1.3);
    var np = R.num.pos, yS = R.yNum;
    var y2 = y + 4.8 * F;
    xx = T.str('f’(x)=', padL, y2);
    var TERMER = [];
    var DD = [
      { fran: np[0], till: np[2], skriv: 'ax', hojd: 22 },
      { fran: np[0], till: np[4], skriv: '+a', hojd: 32, dx: 3 }
    ];
    var num2W = T.adv('ax+a') + T.adv('-ax') + T.adv('-b');
    var yN2;
    xx = fracCB(T, F, num2W, function (x, yn) {
      yN2 = yn;
      x = multIn(x, yn, yS - 0.95 * F, DD);
      T.pause(200);
      TERMER.push([x]);
      x = T.str('-', x, yn, BLUE);
      x = T.str('ax', x, yn);
      TERMER[0].push(x);
      x = T.str('-', x, yn, BLUE);
      T.str('b', x, yn);
    }, T.adv('(x+1)^2'), function (x, yd) {
      T.str('(x+1)^2', x, yd);
    }, xx, y2, 1, true);
    T.stepEnd();

    tanke(y2, [
      [['ax och -ax tar ut varandra.']]
    ], 1.3);
    xx = T.str('=', xx, y2);
    var rA, rB;
    xx = fracCB(T, F, T.adv('a-b'), function (x, yn) {
      var ax0 = TERMER[0][0];
      rA = T.ring(ax0, ax0 + T.adv('-ax'), yN2);
      T.pause(260);
      rB = T.ring(DD[0].x0, DD[0].x1, yN2);
      T.pause(420);
      T.fade(rA); T.fade(rB);
      T.pause(200);
      T.str('a-b', x, yn);
    }, T.adv('(x+1)^2'), function (x, yd) {
      T.str('(x+1)^2', x, yd);
    }, xx, y2, 1, true);
    T.stepEnd();

    /* ---- villkoret f'(1) = 3 ---- */
    tanke(y2, [
      [['Andra villkoret: jag sätter in']],
      [['x=1 i derivatan.']]
    ], 1.3);
    r = substRings(acts, [[d10, d11, yV, F],
                          [xx - T.fracW('a-b', '(x+1)^2') - 1.5, xx, y2 - 0.35 * F, F,
                           { ry: 1.5 * F, cy: y2 - 0.30 * F }]]);
    var y3 = y2 + 5.0 * F;
    T.str('Villkoret f’(1)=3 ger den andra ekvationen', padL, y3 - 2.0 * F, null, 0.62);
    xx = T.str('f’(1)=', padL, y3);
    xx = T.fracH('a-b', '(1+1)^2', xx, y3);
    xx = T.str('=', xx, y3);
    T.fracH('a-b', '4', xx, y3);
    fadeRings(acts, r);
    T.stepEnd();

    y = y3 + 4.2 * F;
    xx = T.fracH('a-b', '4', padL, y);
    xx = T.str('=3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Jag multiplicerar båda led med 4.']]
    ], 1.05);
    y = ekvOp(y, '·4', xx + 0.6 * F, ganger('a-b', '4', '3', '4'), OPTB);
    T.str('a-b=12', padL + 30, y);
    T.stepEnd();

    /* ---- ekvationssystemet ---- */
    tanke(y, [
      [['Nu har jag två ekvationer. Adderar']],
      [['jag dem tar b och -b ut varandra.']]
    ]);
    var yS1 = y + 3.4 * F, yS2 = yS1 + 2.2 * F;
    sysBrace(T, F, padL + 12, yS1 - 0.9 * F, yS2 + 0.35 * F);
    T.str('a+b=8', padL + 12 + 0.45 * F, yS1);
    T.pause(200);
    T.str('a-b=12', padL + 12 + 0.45 * F, yS2);
    T.stepEnd();

    y = yS2 + 2.8 * F;
    T.str('(a+b)+(a-b)=8+12', padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xx = T.str('2a=20', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 2.']]
    ]);
    y = ekvOp(y, '/2', xx + 0.6 * F, '2a=20', { x0: padL, dyVagg: 2.4 });
    var a0 = padL + T.adv('a=');
    var a1 = T.str('a=10', padL, y);
    var ay = y;
    T.stepEnd();

    tanke(y, [
      [['b fås ur a+b=8. Jag sätter in']],
      [['a=10.']]
    ]);
    r = substRings(acts, [[a0, a1, ay, F], [e1x0, e1x0 + T.adv('a'), e1y, F]]);
    y += 2.8 * F;
    xx = T.str('10+b=8', padL, y);
    fadeRings(acts, r);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 10 från båda led.']]
    ]);
    y = ekvOp(y, '-10', xx + 0.6 * F, '10+b=8', { x0: padL });
    T.str('b=-2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: f(1)=8/2=4 och']],
      [['f’(1)=12/4=3. Båda stämmer.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: a=10 och b=-2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 18: sin v cos 40° = sin v + cos v sin 40° ----
   * cos v sin 40° subtraheras från båda led (raden ryms inte ens med
   * väggen, så det steget skrivs i ledform i båda lägena, och båda led-
   * raden bryts före likhetstecknet, extremfallet i REGEL EN EKVATION
   * SKRIVS PÅ EN RAD). Subtraktionsformeln ger sin(v − 40°) = sin v, och
   * de två fallen löses. Inga lösningar hamnar i 0° ≤ v ≤ 90°. */
  reg(18, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe, not;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var SCB = 0.9;

    y = 250;
    T.str('Intervall: 0°≤v≤90°', padL, y - 1.5 * F, null, 0.62);
    T.str('sin v cos 40°=sin v+cos v sin 40°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['sin v cos 40° påminner om subtrak-']],
      [['tionsformeln. Jag subtraherar']],
      [['cos v sin 40° från båda led.']]
    ]);
    y += 2.4 * F;
    xx = T.str('sin v cos 40°', padL, y, null, SCB);
    T.str('-cos v sin 40°', xx, y, BLUE, SCB);
    y += 2.1 * F;
    xx = T.str('=sin v+cos v sin 40°', padL + 30, y, null, SCB);
    T.str('-cos v sin 40°', xx, y, BLUE, SCB);
    T.stepEnd();

    y += 2.5 * F;
    T.str('sin v cos 40°-cos v sin 40°=sin v', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Vänsterledet är precis']],
      [['subtraktionsformeln för sinus,']],
      [['med v och 40°.']]
    ]);
    y += 2.8 * F;
    not = regelNot(T, F, 'sin(α-β)=sin α cos β-cos α sin β', padL, y + 2.0 * F);
    T.str('sin(v-40°)=sin v', padL, y);
    regelGom(T, not);
    T.stepEnd();

    tanke(y, [
      [['Samma sinusvärde: samma punkt på']],
      [['enhetscirkeln, eller spegelbilden i']],
      [['y-axeln, alltså 180° minus vinkeln.']]
    ]);

    /* ---- fall 1 ---- */
    y += 3.6 * F;
    T.str('Fall 1: samma punkt', padL, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    xx = T.str('v-40°=v+n·360°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar v från båda led.']]
    ]);
    y = ekvOp(y, '-v', xx + 0.6 * F, 'v-40°=v+n·360°');
    T.str('-40°=n·360°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['n·360° är ett helt antal varv:']],
      [['0°, ±360°, ±720° och så vidare.']],
      [['Aldrig -40°.']]
    ]);
    y += 2.4 * F;
    T.str('Inga lösningar i fall 1', padL + 30, y, null, 0.62);
    T.stepEnd();

    /* ---- fall 2 ---- */
    y += 2.8 * F;
    T.str('Fall 2: spegelbilden, 180° minus vinkeln', padL, y, null, 0.62);
    T.pause(200);
    y += 2.0 * F;
    xx = T.str('v-40°=180°-v+n·360°', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar v till båda led.']]
    ]);
    y = ekvOp(y, '+v', xx + 0.6 * F, 'v-40°=180°-v+n·360°');
    xx = T.str('2v-40°=180°+n·360°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag adderar 40° till båda led.']]
    ]);
    y = ekvOp(y, '+40°', xx + 0.6 * F, '2v-40°=180°+n·360°');
    xx = T.str('2v=220°+n·360°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag dividerar båda led med 2.']],
      [['Perioden delas också med 2.']]
    ]);
    y = ekvOp(y, '/2', xx + 0.6 * F, function (yb) {
      var x = T.fracH('2v', '2', padL + 30, yb, null, BLUE);
      x = T.str('=', x, yb);
      T.fracH('220°+n·360°', '2', x, yb, null, BLUE);
    }, { dy: 3.2, dyRes: 3.0, dyVagg: 3.0, vopt: { h0: 1.25, h1: 1.15 } });
    xx = T.str('v=', padL + 30, y);
    xx = T.fracH('220°', '2', xx, y);
    xx = T.str('+', xx, y);
    T.fracH('n·360°', '2', xx, y);
    T.stepEnd();
    y += 3.0 * F;
    T.str('v=110°+n·180°', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Lösningarna ligger 180° isär.']],
      [['Jag prövar n närmast intervallet.']]
    ]);
    y += 2.8 * F;
    T.str('n=-1: v=-70°', padL + 40, y, null, 0.8);
    T.pause(300);
    T.str('n=0: v=110°', padL + 400, y, null, 0.8);
    T.stepEnd();

    tanke(y, [
      [['-70° är för litet och 110° för']],
      [['stort. Ingen lösning hamnar mellan']],
      [['0° och 90°.']]
    ]);
    y += 2.8 * F;
    T.str('Ingen lösning i 0°≤v≤90°.', padL, y);
    y += 2.2 * F;
    xe = T.str('Ekvationen saknar lösningar där.', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 19: f = F' och g = G', sedan f(x) = g(x) ----
   * F och G deriveras (produktregeln, kedjeregeln för (ln x)^2).
   * Ekvationen samlas i ett led i två operationer (raden med båda på en
   * gång ryms inte), ln x bryts ut och nollproduktmetoden ger
   * ln x = 0 och ln x = 1. */
  reg(19, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);

    y = 140;
    T.str('F(x)=3x ln x', padL, y);
    y += 2.4 * F;
    T.str('G(x)=x(ln x)^2+3x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['F är en primitiv funktion till f,']],
      [['så f=F’. 3x ln x är en produkt, så']],
      [['jag deriverar med produktregeln.']]
    ]);
    y += 4.4 * F;
    T.str('Deriverar F med produktregeln', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('f(x)=F’(x)=3·ln x+3x·', padL, y);
    xx = T.fracH('1', 'x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['3x·1/x är 3.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('=3ln x+3', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['G’ på samma sätt. Första termen']],
      [['x(ln x)^2 är också en produkt.']]
    ], 1.05);
    y += 4.6 * F;
    T.str('Deriverar G med produktregeln och kedjeregeln', padL, y - 1.9 * F, null, 0.62);
    xx = T.str('g(x)=G’(x)=1·(ln x)^2', padL, y);
    T.stepEnd();

    tanke(y, [
      [['(ln x)^2 med kedjeregeln: yttre']],
      [['derivatan 2ln x gånger inre']],
      [['derivatan 1/x.']]
    ]);
    y += 3.2 * F;
    xx = T.str('+x·2ln x·', padL + 60, y);
    xx = T.fracH('1', 'x', xx, y);
    T.str('+3', xx, y);
    T.stepEnd();

    tanke(y, [
      [['x·1/x är 1, så mittentermen']],
      [['blir 2ln x.']]
    ], 1.05);
    y += 3.4 * F;
    T.str('=(ln x)^2+2ln x+3', padL + 60, y);
    T.stepEnd();

    /* ---- ekvationen ---- */
    tanke(y, [
      [['Nu sätter jag f(x) lika med g(x).']]
    ]);
    y += 4.3 * F;
    T.str('f(x)=g(x)', padL, y - 1.6 * F, null, 0.62);
    xx = T.str('3ln x+3=(ln x)^2+2ln x+3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 3 från båda led.']]
    ]);
    y = ekvOp(y, '-3', xx + 0.6 * F, '3ln x+3=(ln x)^2+2ln x+3');
    xx = T.str('3ln x=(ln x)^2+2ln x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag subtraherar 3ln x från båda']],
      [['led.']]
    ]);
    y = ekvOp(y, '-3ln x', xx + 0.6 * F, '3ln x=(ln x)^2+2ln x');
    T.str('0=(ln x)^2-ln x', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Båda termerna har faktorn ln x.']],
      [['Jag bryter ut den.']]
    ]);
    y += 2.8 * F;
    xx = T.str('0=ln x(', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['(ln x)^2 är ln x·ln x. Bryts ln x']],
      [['ut blir ln x kvar.']]
    ]);
    xx = T.str('ln x', xx, y);
    T.stepEnd();

    tanke(y, [
      [['-ln x är ln x·(-1), så kvar blir']],
      [['-1. Då kan parentesen stängas.']]
    ]);
    T.str('-1)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En produkt är noll när någon']],
      [['av faktorerna är noll.']]
    ]);
    y += 2.8 * F;
    T.str('ln x=0', padL + 30, y);
    T.pause(300);
    xx = T.str('ln x-1=0', padL + 300, y);
    var yF = y;
    T.stepEnd();

    tanke(y, [
      [['Andra ekvationen: jag adderar 1']],
      [['till båda led.']]
    ]);
    y = ekvOp(y, '+1', xx + 0.6 * F, 'ln x-1=0', { x0: padL + 300, dyVagg: 2.4 });
    T.str('ln x=1', padL + 300, y);
    T.stepEnd();

    tanke(y, [
      [['ln x=c betyder att x=e^c.']]
    ]);
    y += 2.8 * F;
    T.str('x=e^0=1', padL + 30, y);
    T.pause(300);
    T.str('x=e^1=e', padL + 300, y);
    T.stepEnd();

    tanke(y, [
      [['Båda rötterna är positiva, så de']],
      [['ligger där ln x är definierad.']]
    ]);
    y += 2.8 * F;
    xe = T.str('Svar: x_1=1 och x_2=e', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

/* ma4-vt2022-delD-penna.js: pennlösningar till NP Ma 4 VT 2022, delprov D
 * (uppgift 20–27, digitala verktyg tillåtna).
 *
 * En scen per uppgift, registrerad som "ma4-vt2022-u<nr>". Reglerna står i
 * handskrift.js filhuvud och i data/np/RIKTLINJER.md: inget bläck vid
 * x > 696, inget med x > 420 ovanför y = 150 (y = 210 i ekvval-scener), en
 * tanke per led direkt före ledet, division med vågrätt streck, och samma
 * antal klicksteg i båda ekvationsredovisningarna (mkEkvOp).
 *
 * Där verktyget räknar (nollställen, integraler med decimalgränser) skriver
 * pennan "Verktyget ger …" och tanken säger vad som räknas och varför.
 * Siffrorna är exakt desamma som i textlösningen (data/np/ma4-vt2022-delD.js).
 *
 * Granskning: node .claude/verify-handskrift.js ma4-vt2022-u20 … ma4-vt2022-u27
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkAxes = V.mkAxes,
      mkEkvOp = V.mkEkvOp, substRings = V.substRings, fadeRings = V.fadeRings,
      BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma4-vt2022-u' + nr, fn); }

  /* liten grå rubrik (redovisning, står kvar även utan tankar) */
  function rubrik(T, s, x, yb) { return T.str(s, x, yb, null, 0.62); }

  /* kurva ur sin funktion, tätt samplad (steg ≤ 3 px) */
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
        pts: V.humanize([[A.X(x), A.Y(fu(x))], [A.X(x), A.Y(fo(x))]]) });
      T.pause(30);
    }
  }

  /* ---- Uppgift 20: sin x i grader och i radianer ---- */
  reg(20, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 185;
    T.str('Yosefs kurva: topp vid x=90', padL, y);
    T.stepEnd();

    tanke(y, [
      [['sin x är som störst, 1, när']],
      [['vinkeln är 90° eller π/2 i']],
      [['radianer. Toppen vid 90 pekar']],
      [['alltså på grader.']]
    ]);
    y += 2.6 * F;
    T.str('sin 90°=1  ⇒  grader', padL + 30, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('Zaras kurva: period ≈ 6,3', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En hel period för sin x är 360°']],
      [['i grader men 2π i radianer.']]
    ]);
    y += 2.6 * F;
    T.str('2π≈6,28  ⇒  radianer', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Samma funktion, men verktygen']],
      [['tolkar talet x som olika stora']],
      [['vinklar.']]
    ]);
    y += 2.8 * F;
    T.str('Svar: Verktygen använder olika', padL, y);
    y += 1.9 * F;
    T.str('vinkelmått: Yosefs räknar i', padL, y);
    y += 1.9 * F;
    xe = T.str('grader och Zaras i radianer.', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 21: arean mellan kurvorna ska vara 13 ---- */
  reg(21, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL + 30;
    var xw = x0 + T.adv('6,1731+1,9k=13') + 0.9 * F;

    y = 230;
    rubrik(T, 'Arean mellan kurvorna: övre minus undre', padL, y);
    y += 2.0 * F;
    T.str('∫_0^1^,^9 (4x^3+k-3x^2) dx=13', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Primitiv funktion term för']],
      [['term. k är en konstant, så den']],
      [['ger kx.']]
    ]);
    y += 2.9 * F;
    T.str('[x^4+kx-x^3]_0^1^,^9=13', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Undre gränsen 0 ger noll i alla']],
      [['termer. Bara 1,9 sätts in.']]
    ]);
    y += 2.8 * F;
    T.str('1,9^4+1,9k-1,9^3=13', x0, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('13,0321+1,9k-6,859=13', x0, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('6,1731+1,9k=13', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Subtrahera 6,1731 från båda led.']]
    ]);
    y = ekvOp(y, '-6,1731', xw, '6,1731+1,9k=13');
    T.str('1,9k=6,8269', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med 1,9.']]
    ]);
    y = ekvOp(y, '/1,9', xw, '1,9k=6,8269');
    T.str('k=3,593...≈3,6', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: med k=3,6 ligger 4x³+k']],
      [['över 3x² i hela intervallet, som']],
      [['i figuren. GeoGebras Lös ger']],
      [['samma k.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: k≈3,6', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 22: solpanelens effekt ---- */
  reg(22, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    /* ---- a) ---- */
    y = 185;
    T.str('a) Klockan 19.00: x=19', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Effekten är funktionsvärdet.']],
      [['Vinkeln räknas i radianer.']]
    ]);
    y += 2.6 * F;
    T.str('y(19)=390 sin(0,26·19-2,0)+230', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=390 sin 2,94+230=308,08...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Modellens konstanter har två']],
      [['värdesiffror.']]
    ]);
    y += 2.6 * F;
    T.str('≈310', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Cirka 310 W', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    y += 3.2 * F;
    T.str('b) Klockan 15.30: x=15,5', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Förändringshastigheten är']],
      [['derivatan. Inre derivatan 0,26']],
      [['kommer ut som faktor, och sin']],
      [['blir cos.']]
    ]);
    y += 2.6 * F;
    T.str('y’(x)=390·0,26 cos(0,26x-2,0)', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=101,4 cos(0,26x-2,0)', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Sätt in x=15,5. I GeoGebra']],
      [['skriver man f’(15.5).']]
    ]);
    y += 2.6 * F;
    T.str('y’(15,5)=101,4 cos 2,03', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=-44,94...≈-45', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Negativt: effekten minskar.']],
      [['Rimligt, solen går ned på']],
      [['eftermiddagen.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Cirka -45 W/h', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 23: rotationskroppens volym ---- */
  reg(23, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var tanke = mkTanke(T);
    function f(x) { return 9 * x - Math.pow(x, 4) - 7; }
    var a = 0.8307, b = 1.6951;
    var A = mkAxes(T, F, { ox: padL + 60, oy: 300, u: 80, xsc: 1, ysc: 1,
                           xmin: 0, xmax: 2, ymin: -0.6, ymax: 1.9 });

    /* ---- figuren ---- */
    A.axes();
    T.pause(120);
    kurva(A, acts, f, 0.74, 1.74, null, 70);
    T.pause(140);
    skugga(T, A, acts, f, function () { return 0; }, a, b, 0.07);
    T.str('a', A.X(a) - 22, A.Y(0) + 24, BLUE, 0.62);
    T.str('b', A.X(b) + 6, A.Y(0) + 24, BLUE, 0.62);
    T.stepEnd();

    tanke(A.Y(-0.6) + 50, [
      [['Gränserna a och b är kurvans']],
      [['nollställen. Ekvationen är av']],
      [['grad fyra, så jag löser den med']],
      [['verktyget: NLös eller Nollställen.']]
    ], 0);
    y = A.Y(-0.6) + 40 + 2.2 * F;
    T.str('9x-x^4-7=0', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('Verktyget: a≈0,8307  b≈1,6951', padL, y, null, 0.85);
    T.stepEnd();

    tanke(y, [
      [['Varje tunn skiva blir en cylinder']],
      [['med radien y. Volymen är summan']],
      [['av π·y²·dx.']]
    ]);
    y += 2.9 * F;
    T.str('V=π ∫_a^b (9x-x^4-7)^2 dx', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['Integralen räknar verktyget med']],
      [['de sparade gränserna, utan att']],
      [['avrunda dem.']]
    ], 0.6);
    y += 2.8 * F;
    T.str('=π·1,5502...=4,8703...', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('≈4,87', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? En cylinder med radien']],
      [['1,8 och längden 0,9 rymmer cirka 9.']],
      [['Kroppen är smalare nästan överallt.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Cirka 4,87 volymenheter', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* e upphöjt till −0,01t²: exponenten skrivs i två nivåer (t:s kvadrat
   * ligger ett steg högre än resten av exponenten). Returnerar nästa x. */
  function ePow(T, F, x, yb, forTecken) {
    x = T.str(forTecken + 'e', x, yb);
    var ye = yb - 0.5 * F;
    x = T.str('-0,01t', x + 1, ye, null, 0.62);
    x = T.str('2', x, ye - 0.3 * F, null, 0.42);
    return x + 0.12 * F;
  }
  /* skriv en sträng och returnera dess x-intervall */
  function del(T, s, x, yb, col) { var x1 = T.str(s, x, yb, col || null); return [x, x1]; }

  /* ---- Uppgift 24: hur många hann fram klockan 12.05? ---- */
  reg(24, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 170;
    rubrik(T, 'Högst 5 minuter sen: arean under f från 0 till 5', padL, y);
    y += 2.1 * F;
    T.str('P(0≤t≤5)= ∫_0^5 f(t) dt', padL + 24, y);
    T.stepEnd();

    tanke(y, [
      [['0,02t är nästan inre derivatan']],
      [['av exponenten −0,01t². Jag prövar']],
      [['F(t)=−e upphöjt till −0,01t².']]
    ]);
    y += 2.9 * F;
    rubrik(T, 'Primitiv funktion (inre derivatan är −0,02t)', padL, y);
    y += 2.2 * F;
    xx = T.str('F(t)=', padL, y);
    ePow(T, F, xx, y, '-');
    T.stepEnd();

    tanke(y, [
      [['Deriverar med kedjeregeln för']],
      [['att kontrollera.']]
    ]);
    y += 2.7 * F;
    xx = T.str('F’(t)=', padL, y);
    xx = ePow(T, F, xx, y, '-');
    T.str('·(-0,02t)=f(t)', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Stämmer. Sätt in gränserna 5']],
      [['och 0: exponenten blir −0,25 och 0.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Sätter in gränserna i F', padL, y);
    y += 2.2 * F;
    T.str('P(0≤t≤5)=-e^-^0^,^2^5-(-e^0)', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=1-e^-^0^,^2^5=0,2211...', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Andelen av klassen gånger 32.']],
      [['Ett antal elever blir ett heltal.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Andelen gånger antalet elever', padL, y);
    y += 2.2 * F;
    T.str('32·0,2211...=7,07...≈7', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Cirka 7 elever', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 25: vindkraftverket ---- */
  reg(25, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var ekvOp = mkEkvOp(T, !!cfg.vagg);
    var x0 = padL + 30, xb = padL;
    var xw = xb + T.adv('11 sin(0,11x-0,89)+28=36') + 0.9 * F;
    var xw2 = x0 + T.adv('0,11x-0,89=0,8143...') + 0.9 * F;

    /* ---- a) ---- */
    y = 245;
    T.str('a) v(x)=11 sin(0,11x-0,89)+28', padL, y);
    T.stepEnd();

    tanke(y, [
      [['sin är som mest 1. Det händer när']],
      [['0,11x−0,89=π/2, alltså vid']],
      [['x≈22,4, inom dygnet.']]
    ]);
    y += 2.6 * F;
    T.str('v_m_a_x=11·1+28=39', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 39 km/h', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['Gränsen går där v är exakt 36.']]
    ], 0.5);
    y += 3.0 * F;
    rubrik(T, 'b) Gränsen för 36 km/h: sätter v(x)=36', padL, y);
    y += 2.2 * F;
    T.str('11 sin(0,11x-0,89)+28=36', xb, y);
    T.stepEnd();

    tanke(y, [
      [['Subtrahera 28 från båda led.']]
    ]);
    y = ekvOp(y, '-28', xw, '11 sin(0,11x-0,89)+28=36', { x0: xb });
    T.str('11 sin(0,11x-0,89)=8', xb, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med 11.']]
    ]);
    y = ekvOp(y, '/11', xw, '11 sin(0,11x-0,89)=8', { x0: xb });
    xx = T.str('sin(0,11x-0,89)=', xb, y);
    T.fracH('8', '11', xx, y);
    T.stepEnd();

    tanke(y, [
      [['arcsin ger en vinkel. Sinus har']],
      [['samma värde för π minus vinkeln,']],
      [['och sedan upprepas allt varje 2π.']]
    ], 1.05);
    y += 3.0 * F;
    rubrik(T, 'Första grenen: vinkeln är arcsin av 8 genom 11', padL, y);
    y += 2.6 * F;
    xx = T.str('0,11x-0,89=arcsin', x0, y);
    T.fracH('8', '11', xx + 0.12 * F, y);
    T.stepEnd();

    y += 3.0 * F;
    T.str('0,11x-0,89=0,8143...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Addera 0,89 till båda led.']]
    ]);
    y = ekvOp(y, '+0,89', xw2, '0,11x-0,89=0,8143...');
    T.str('0,11x=1,7043...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med 0,11.']]
    ]);
    y = ekvOp(y, '/0,11', xw2, '0,11x=1,7043...');
    T.str('x=15,494...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Ett helt varv 2π i vinkeln motsvarar']],
      [['2π delat med 0,11, alltså 57,1... h.']]
    ]);
    y += 2.6 * F;
    rubrik(T, 'Alla lösningar: lägg till hela perioder', padL, y);
    y += 2.2 * F;
    T.str('x=15,494...+n·57,1...', x0, y);
    T.stepEnd();

    y += 3.0 * F;
    rubrik(T, 'Andra grenen: π minus vinkeln, löses på samma sätt', padL, y);
    y += 2.2 * F;
    T.str('0,11x-0,89=2,3272...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Addera 0,89 till båda led.']]
    ]);
    y = ekvOp(y, '+0,89', xw2, '0,11x-0,89=2,3272...');
    T.str('0,11x=3,2172...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med 0,11.']]
    ]);
    y = ekvOp(y, '/0,11', xw2, '0,11x=3,2172...');
    T.str('x=29,247...', x0, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('x=29,247...+n·57,1...', x0, y);
    T.stepEnd();

    tanke(y, [
      [['v(0)≈19,5 och v(24)≈38,8: vinden']],
      [['är över 36 från 15,494... till 24.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Bara x=15,494... ligger inom dygnet', padL, y);
    y += 2.2 * F;
    T.str('24-15,494...=8,506...≈8,5', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: Cirka 8,5 timmar', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) ---- */
    y += 3.2 * F;
    T.str('c) Över 36 km/h: P=0,42·36^3', padL, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=19 595,52 MJ/h', padL + 140, y);
    T.stepEnd();

    tanke(y, [
      [['Under 36 km/h ändras produktionen']],
      [['hela tiden. v(x) sätts in i P, och']],
      [['MJ/h gånger timmar ger MJ:']],
      [['en integral över tiden.']]
    ]);
    y += 2.9 * F;
    rubrik(T, 'Energi: integral av produktionen per timme', padL, y);
    y += 2.3 * F;
    T.str('E= ∫_0^1^5^,^4^9^4 0,42·v(x)^3 dx', padL + 24, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('+19 595,52·(24-15,494...)', padL + 60, y);
    T.stepEnd();

    tanke(y, [
      [['Integralen räknar verktyget, med']],
      [['v(x) insatt och den sparade']],
      [['gränsen 15,494...']]
    ]);
    y += 2.6 * F;
    T.str('=150 958,5...+166 679,5...', padL + 30, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('=317 638...≈320 000', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Rimligt? I snitt drygt 13 000 MJ']],
      [['per timme, mellan cirka 3 000 och']],
      [['19 600. Två värdesiffror.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: Cirka 320 000 MJ', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ---- Uppgift 26: konstanterna i temperaturmodellen ---- */
  reg(26, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 170;
    T.str('T(t)=A·cos(Bt+C)+D', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Amplituden är halva skillnaden']],
      [['mellan högsta och lägsta värdet.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Amplituden: halva skillnaden 5,2', padL, y);
    y += 2.8 * F;
    xx = T.str('A=', padL, y);
    xx = T.fracH('5,2', '2', xx, y);
    T.str('=2,6', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Perioden för cos(Bt+C) är 2π']],
      [['delat med B. Perioden är 4,0 h.']]
    ], 1.05);
    y += 3.0 * F;
    rubrik(T, 'B ur perioden 4,0 h', padL, y);
    y += 2.9 * F;
    xx = T.fracH('2π', 'B', padL, y);
    xx = T.str('=4,0  ⟺  B=', xx, y);
    xx = T.fracH('2π', '4,0', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('π', '2', xx, y);
    T.str('≈1,57', xx, y);
    T.stepEnd();

    tanke(y, [
      [['En timme är en kvarts period.']],
      [['En kvarts period efter toppen']],
      [['är kurvan på mittlinjen.']]
    ], 1.05);
    y += 3.0 * F;
    rubrik(T, 'Mittlinjen: en kvarts period efter toppen', padL, y);
    y += 2.2 * F;
    T.str('D=3,9', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Maximum när cos är 1, alltså när']],
      [['vinkeln är 0 eller hela varv.']],
      [['Toppen klockan 08.30 ger t=8,5.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'C ur maximum klockan 08.30, alltså t=8,5', padL, y);
    y += 2.8 * F;
    xx = T.fracH('π', '2', padL, y);
    T.str('·8,5+C=n·2π', xx, y);
    T.stepEnd();

    y += 2.6 * F;
    T.str('⟺  C=-4,25π+n·2π', padL + 30, y);
    T.stepEnd();

    tanke(y, [
      [['Jag väljer n=2, då blir C så']],
      [['nära noll som möjligt.']]
    ]);
    y += 3.0 * F;
    xx = T.str('C=-4,25π+4π=-', padL, y);
    xx = T.fracH('π', '4', xx, y);
    T.str('≈-0,79', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: T(8,5)=6,5 är toppen']],
      [['och T(9,5)=3,9. Stämmer.']]
    ], 1.05);
    y += 3.0 * F;
    T.str('Svar: A=2,6;  B≈1,6;', padL, y);
    y += 2.0 * F;
    xe = T.str('C≈-0,8;  D=3,9', padL + 84, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 27: C = ∫ (7x − x² − 10) dx ---- */
  reg(27, function (cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);
    var vagg = !!cfg.vagg;
    var ekvOp = mkEkvOp(T, vagg);
    var multIn = V.mkMultIn(T);
    var x0 = padL + 30;
    function f(x) { return 7 * x - x * x - 10; }
    var A = mkAxes(T, F, { ox: padL + 40, oy: 230, u: 38, xsc: 1, ysc: 2,
                           xmin: 0, xmax: 7, ymin: -6, ymax: 3 });

    /* ---- a) figuren ---- */
    A.axes();
    A.ticks(V.heltal(1, 7), [2, -2, -4, -6], [1, 3, 4, 6, 7], [2, -2, -4, -6]);
    T.pause(120);
    kurva(A, acts, f, 0.62, 6.38, null, 80);
    T.pause(140);
    skugga(T, A, acts, f, function () { return 0; }, 2, 5, 0.18);
    T.str('2', A.X(2) + 5, A.Y(0) + 22, BLUE, 0.5);
    T.str('5', A.X(5) - 16, A.Y(0) + 22, BLUE, 0.5);
    T.stepEnd();

    tanke(A.Y(-6) + 12, [
      [['C är arean ovanför x-axeln minus']],
      [['arean under. Kurvan ligger över']],
      [['x-axeln mellan nollställena.']]
    ], 0);
    var xwA = x0 + T.adv('-7x+x^2+10=0') + 0.9 * F;
    y = A.Y(-6) + 2.6 * F;
    rubrik(T, 'a) Nollställen: där kurvan har y=0', padL, y);
    y += 2.2 * F;
    var r7x = del(T, '7x', x0, y), rx2 = del(T, '-x^2', r7x[1], y), r10 = del(T, '-10', rx2[1], y);
    T.str('=0', r10[1], y);
    T.stepEnd();

    tanke(y, [
      [['Multiplicera båda led med −1, så']],
      [['att x²-termen blir positiv.']]
    ]);
    var fak = null, yKalla = y;
    y = ekvOp(y, '·(-1)', xwA, function (yy) {
      var x = T.str('(', x0, yy);
      r7x = del(T, '7x', x, yy); rx2 = del(T, '-x^2', r7x[1], yy); r10 = del(T, '-10', rx2[1], yy);
      x = T.str(')', r10[1], yy);
      fak = del(T, '·(-1)', x, yy, BLUE);
      x = T.str('=0', fak[1], yy);
      T.str('·(-1)', x, yy, BLUE);
      yKalla = yy;
    }, { dy: 2.9, dyRes: 2.3 });
    if (vagg) {
      var fx = xwA + 0.45 * F;
      fak = [fx, fx + T.adv('·(-1)')];
    }
    xx = multIn(x0, y, yKalla - 1.0 * F, [
      { fran: fak, till: r7x, skriv: '-7x', hojd: 26 },
      { fran: fak, till: rx2, skriv: '+x^2', hojd: 20 },
      { fran: fak, till: r10, skriv: '+10', hojd: 14 }
    ]);
    T.str('=0', xx, y);
    T.stepEnd();

    y += 2.3 * F;
    rubrik(T, 'Ordnar termerna och löser andragradsekvationen', padL, y);
    y += 2.1 * F;
    T.str('x^2-7x+10=0', x0, y);
    T.stepEnd();

    y += 2.6 * F;
    xx = T.str('x=3,5± ', x0, y);
    xx = T.rot('12,25-10', xx, y);
    T.str('=3,5±1,5', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('x_1=2   x_2=5', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Varje bit utanför 2 till 5 drar']],
      [['ned C. Störst C fås med exakt']],
      [['a=2 och b=5.']]
    ]);
    y += 2.6 * F;
    T.str('b-a=5-2=3', x0, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 3', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ---- */
    tanke(y, [
      [['C=0: plusytan ska ta ut minus-']],
      [['ytorna. För en viss längd blir C']],
      [['störst mitt kring toppen x=3,5.']],
      [['Längst blir intervallet därför']],
      [['symmetriskt kring 3,5.']]
    ]);
    y += 3.2 * F;
    rubrik(T, 'b) Symmetriskt intervall kring 3,5 ger längst intervall', padL, y);
    y += 2.2 * F;
    T.str('a=3,5-h   b=3,5+h', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Kvadratkomplettering visar']],
      [['symmetrin kring 3,5.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Kvadratkomplettering visar symmetrin', padL, y);
    y += 2.2 * F;
    T.str('7x-x^2-10=2,25-(x-3,5)^2', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Primitiv funktion: inre']],
      [['derivatan av x−3,5 är 1.']]
    ]);
    y += 2.8 * F;
    rubrik(T, 'Primitiv funktion (inre derivatan är 1)', padL, y);
    y += 2.8 * F;
    xx = T.str('C=[2,25x-', padL, y);
    xx = T.fracH('(x-3,5)^3', '3', xx, y);
    T.str(']_a^b', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Sätt in b och a. Då blir x−3,5']],
      [['lika med h respektive −h.']]
    ], 1.05);
    y += 3.0 * F;
    rubrik(T, 'Sätter in b=3,5+h och a=3,5-h', padL, y);
    y += 2.9 * F;
    xx = T.str('C=2,25·2h-(', padL, y);
    xx = T.fracH('h^3', '3', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('(-h)^3', '3', xx, y);
    T.str(')', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xx = T.str('C=4,5h-', padL, y);
    T.fracH('2h^3', '3', xx, y);
    T.stepEnd();

    var xw = x0 + T.adv('C=0  ⟹  4,5h-=0') + T.fracW('2h^3', '3') + 0.9 * F;
    var t45 = null, tFr = null, ySrc;
    y += 3.4 * F;
    xx = T.str('C=0  ⟹  ', x0, y);
    t45 = del(T, '4,5h', xx, y);
    xx = T.str('-', t45[1], y);
    tFr = [xx, T.fracH('2h^3', '3', xx, y)];
    T.str('=0', tFr[1], y);
    ySrc = y;
    T.stepEnd();

    tanke(y, [
      [['Multiplicera båda led med 3.']]
    ], 1.05);
    var fak3 = null;
    y = ekvOp(y, '·3', xw, function (yy) {
      var x = T.str('(', x0, yy);
      t45 = del(T, '4,5h', x, yy);
      x = T.str('-', t45[1], yy);
      tFr = [x, T.fracH('2h^3', '3', x, yy)];
      x = T.str(')', tFr[1], yy);
      fak3 = del(T, '·3', x, yy, BLUE);
      x = T.str('=0', fak3[1], yy);
      T.str('·3', x, yy, BLUE);
      ySrc = yy;
    }, { dy: 3.9, dyRes: 3.0, vopt: { h0: 1.4, h1: 1.15 } });
    if (vagg) {
      var f3 = xw + 0.45 * F;
      fak3 = [f3, f3 + T.adv('·3')];
    }
    xx = multIn(x0, y, ySrc - 1.55 * F, [
      { fran: fak3, till: t45, skriv: '13,5h', hojd: 24 },
      { fran: fak3, till: tFr, skriv: '-2h^3', hojd: 14 }
    ]);
    T.str('=0', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Bryt ut h. h=0 är inget intervall,']],
      [['så parentesen ska vara noll.']]
    ]);
    y += 2.6 * F;
    xx = T.str('h(', x0, y);
    T.stepEnd();
    xx = T.str('13,5', xx, y);
    T.stepEnd();
    T.str('-2h^2)=0', xx, y);
    T.stepEnd();

    y += 2.3 * F;
    T.str('13,5-2h^2=0', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Addera 2h² till båda led.']]
    ]);
    y = ekvOp(y, '+2h^2', xw, '13,5-2h^2=0');
    T.str('13,5=2h^2', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Dividera båda led med 2.']]
    ]);
    y = ekvOp(y, '/2', xw, '13,5=2h^2');
    T.str('6,75=h^2', x0, y);
    T.stepEnd();

    tanke(y, [
      [['Roten ur båda led. h är ett']],
      [['avstånd, så h>0.']]
    ]);
    y += 2.8 * F;
    xx = T.str('h=± ', x0, y);
    T.rot('6,75', xx, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('h=2,598...', x0, y);
    T.stepEnd();

    y += 2.4 * F;
    T.str('b-a=2h=5,196...≈5,2', x0, y);
    T.stepEnd();

    y += 2.3 * F;
    xe = T.str('Svar: 5,2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });
})();

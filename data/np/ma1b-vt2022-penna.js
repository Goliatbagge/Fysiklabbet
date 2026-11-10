/* ma1b-vt2022-penna.js — pennlösningar till Nationellt prov Ma 1b, VT 2022.
 *
 * Bara 1b-provets EGNA uppgifter (3, 5, 9, 23, 24 och 28) har scener här.
 * De övriga 26 uppgifterna är desamma som i Ma 1c VT 2022 och lånar sina
 * scener ur ma1c-vt2022-penna.js (fältet penna sätts av härledningen i
 * data/np/ma1b-vt2022.js). Rätta alltså en delad uppgift i ma1c-filen.
 *
 * ⚠️ ALLA REGLER I HANDSKRIFT.JS FILHUVUD GÄLLER, se även huvudet i
 * ma1c-vt2022-penna.js (pilzonen x > 696, inställningsrutan, en tanke per
 * led, vågrätt bråkstreck, båda redovisningslägena i ekvationsscener).
 *
 * Granskning: node .claude/verify-handskrift.js ma1b-vt2022-u3 …
 */
(function () {
  'use strict';
  var HK = window.HANDSKRIFT;
  if (!HK || !HK.registrera) return;
  var V = HK.verktyg;
  var mathTools = V.mathTools, mkTanke = V.mkTanke, mkEkvOp = V.mkEkvOp,
      tusen = V.tusen, BLUE = V.BLUE;

  function reg(nr, fn) { HK.registrera('ma1b-vt2022-u' + nr, fn); }

  /* liten grå rubrik ovanför en rad, i samma klicksteg som raden */
  function rubrik(T, F, s, yb) { T.str(s, T.padL, yb - 1.45 * F, null, 0.62); }

  /* REGELNOT: blå text i pennans glyfer som tonar in på en gång (samma
   * teknik som regelNot i ma2c-vt2018-penna.js), här för "Vänd
   * olikhetstecknet". regelGom tonar ut den vid nästa klick. */
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

  /* ================= DELPROV B ================= */

  /* ---- Uppgift 3: bilens värde som exponentialfunktion ---- */
  reg(3, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, y, xe;
    var tanke = mkTanke(T);

    y = 176;
    T.str('Värdet minskar med 15 % per år.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Minskar värdet med 15 % finns']],
      [['85 % kvar efter varje år. Det är']],
      [['förändringsfaktorn.']]
    ]);
    y += 3.1 * F;
    rubrik(T, F, 'Förändringsfaktorn', y);
    T.str('1-0,15=0,85', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Varje år multipliceras värdet']],
      [['med 0,85. Efter x år har det']],
      [['skett x gånger: 0,85^x.']]
    ]);
    y += 3.1 * F;
    rubrik(T, F, 'Startvärdet gånger faktorn x gånger', y);
    T.str('y=' + tusen(420000) + '·0,85^x', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll: när x=0 ska jag få']],
      [['inköpspriset.']]
    ]);
    y += 2.6 * F;
    T.str('x=0: y=' + tusen(420000) + '·1=' + tusen(420000), padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: y=' + tusen(420000) + '·0,85^x', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: T.acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 5: procentuell ökning ur ett index ----
   * Diagrammet står i uppgiften och ritas inte av (REGEL RITA BARA AV DET
   * SOM BEHÖVS): pennan skriver de två avlästa indextalen och räknar. */
  reg(5, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 176;
    rubrik(T, F, 'Avläser indexet i diagrammet', y);
    T.str('1980: 100     2020: 615', padL, y);
    T.stepEnd();

    tanke(y, [
      [['1980 är basåret med index 100.']],
      [['Priset ändras i samma takt som']],
      [['indexet, så jag räknar på']],
      [['indextalen.']]
    ]);
    y += 3.1 * F;
    rubrik(T, F, 'Ökningen i indexenheter', y);
    T.str('615-100=515', padL, y);
    T.stepEnd();

    tanke(y, [
      [['En procentuell ökning räknas']],
      [['från det ursprungliga värdet,']],
      [['alltså från 100.']]
    ]);
    y += 3.6 * F;
    xx = T.fracH('515', '100', padL, y);
    T.str('=5,15=515 %', xx, y);
    T.stepEnd();

    y += 3.0 * F;
    xe = T.str('Svar: 515 %', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: T.acts, contentW: 520, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 9: olikheten −4x − 10 < 90 ----
   * Båda redovisningslägena (cfg.vagg) med samma antal klicksteg. Vid
   * divisionen med −4 vänds tecknet, och den blå noten "OBS! Vänd
   * olikhetstecknet!" poppar upp vid raden med det vända tecknet. */
  reg(9, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T), vagg = !!cfg.vagg, ekvOp = mkEkvOp(T, vagg);
    var xw = padL + T.adv('-4x-10<90') + 0.9 * F;
    var OBS = 'OBS! Vänd olikhetstecknet!', nVand;

    y = 230;
    T.str('-4x-10<90', padL, y);
    T.stepEnd();

    tanke(y, [
      [['-10 står i vänsterledet. Jag']],
      [['adderar 10 till båda led.']]
    ]);
    y = ekvOp(y, '+10', xw, '-4x-10<90');
    T.str('-4x<100', padL, y);
    T.stepEnd();

    tanke(y, [
      [['x multipliceras med -4, så jag']],
      [['dividerar båda led med -4. Ett']],
      [['NEGATIVT tal: då vänds']],
      [['olikhetstecknet!']]
    ]);
    if (vagg) {
      T.vaggOp('/(-4)', xw, y);
      T.stepEnd();
      y += 2.1 * F;
      xx = T.str('x>-25', padL, y);
      nVand = regelNot(T, F, OBS, xx + 1.2 * F, y);
      T.stepEnd();
      regelGom(T, nVand);
    } else {
      y += 3.0 * F;
      xx = T.fracH('-4x', '-4', padL, y, null, BLUE);
      xx = T.str('>', xx, y, BLUE);
      xx = T.fracH('100', '-4', xx, y, null, BLUE);
      nVand = regelNot(T, F, OBS, xx + 1.2 * F, y);
      T.stepEnd();
      regelGom(T, nVand);
      y += 2.9 * F;
      T.str('x>-25', padL, y);
      T.stepEnd();
    }

    tanke(y, [
      [['Kontroll: x=0 är större än -25']],
      [['och ger -10<90. Stämmer.']]
    ]);
    y += 2.6 * F;
    xe = T.str('Svar: x>-25', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: T.acts, contentW: 560, lastBase: y + 1.4 * F, padL: padL,
             ekvval: 1 };
  });

  /* ================= DELPROV D ================= */

  /* ---- Uppgift 23: teknikerns kostnad som linjär modell ---- */
  reg(23, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 176;
    T.str('Fast avgift 300 kr, 3 timmar kostar', padL, y);
    y += 1.9 * F;
    T.str('totalt ' + tusen(1440) + ' kr.', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Den fasta avgiften betalas en']],
      [['gång. Resten är vad de tre']],
      [['timmarna kostade.']]
    ]);
    y += 3.1 * F;
    rubrik(T, F, 'Kostnaden för arbetet', y);
    T.str(tusen(1440) + '-300=' + tusen(1140) + ' kr', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Varje timme kostar lika mycket,']],
      [['så jag delar på 3.']]
    ]);
    y += 3.7 * F;
    rubrik(T, F, 'Avgiften per timme', y - 0.9 * F);
    xx = T.fracH(tusen(1140), '3', padL, y);
    T.str('=380 kr', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Kostnaden är timavgiften gånger']],
      [['antalet timmar plus den fasta']],
      [['avgiften: y=kx+m.']]
    ], 1.05);
    y += 3.3 * F;
    T.str('y=380x+300', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Kontroll med x=3 timmar.']]
    ]);
    y += 2.6 * F;
    T.str('y=380·3+300', padL, y);
    y += 2.1 * F;
    T.str('=' + tusen(1140) + '+300=' + tusen(1440), padL, y);
    T.stepEnd();

    y += 2.4 * F;
    xe = T.str('Svar: y=380x+300', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: T.acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 24: är sambandet linjärt? ----
   * Kolumnen för 0 °C skrivs av som en liten tabell, och ändringarna över
   * lika långa steg (5 m/s) jämförs. */
  reg(24, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, y, xe, i;
    var tanke = mkTanke(T);
    var kol = [padL + 5.4 * F, padL + 8.2 * F, padL + 11.0 * F, padL + 13.8 * F, padL + 16.6 * F];
    var vind = ['2', '5', '10', '15', '20'], temp = ['-2', '-5', '-7', '-8', '-9'];

    y = 224;
    rubrik(T, F, 'Kolumnen för faktisk temperatur 0 °C', y);
    T.str('m/s', padL, y);
    /* talen högerställs i sina kolumner, så att siffrorna står rakt
     * under varandra även när minustecknet tar plats */
    for (i = 0; i < 5; i++) T.str(vind[i], kol[i] - T.adv(vind[i]), y);
    y += 1.9 * F;
    T.str('°C', padL, y);
    for (i = 0; i < 5; i++) T.str(temp[i], kol[i] - T.adv(temp[i]), y);
    T.stepEnd();

    tanke(y, [
      [['Ett linjärt samband ändras lika']],
      [['mycket varje gång vinden ökar']],
      [['lika mycket. Jag jämför steg']],
      [['på 5 m/s.']]
    ]);
    y += 3.1 * F;
    rubrik(T, F, 'Från 5 till 10 m/s', y);
    T.str('-7-(-5)=-2 °C', padL, y);
    T.stepEnd();

    y += 3.1 * F;
    rubrik(T, F, 'Från 10 till 15 m/s', y);
    T.str('-8-(-7)=-1 °C', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Samma ökning av vinden ger olika']],
      [['stor sänkning. Grafen kan inte']],
      [['vara en rät linje.']]
    ]);
    y += 2.6 * F;
    T.str('Svar: Nej. När vinden ökar 5 m/s', padL, y);
    y += 1.9 * F;
    T.str('sjunker temperaturen 2 °C ena', padL, y);
    y += 1.9 * F;
    xe = T.str('gången men 1 °C andra gången.', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: T.acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });

  /* ---- Uppgift 28: prissumman 2020 i 2016 års penningvärde ---- */
  reg(28, function (cfg, F) {
    var T = mathTools(F), padL = T.padL, y, xx, xe;
    var tanke = mkTanke(T);

    y = 176;
    T.str('KPI 2016: 316,43', padL, y);
    y += 1.9 * F;
    T.str('KPI 2020: 335,92', padL, y);
    T.stepEnd();

    tanke(y, [
      [['KPI var lägre 2016, så samma sak']],
      [['kostade färre kronor då. Svaret']],
      [['ska bli mindre än 10,0 miljoner.']]
    ]);
    y += 3.0 * F;
    T.str('Prissumman 2020: 10,0 miljoner kr', padL, y);
    T.stepEnd();

    tanke(y, [
      [['Jag multiplicerar med kvoten']],
      [['mellan KPI-värdena. Året jag']],
      [['räknar om TILL står i täljaren.']]
    ]);
    y += 3.9 * F;
    rubrik(T, F, 'Omräkning till 2016 års penningvärde', y - 0.5 * F);
    xx = T.str('10,0·', padL, y);
    xx = T.fracH('316,43', '335,92', xx, y);
    T.str('=9,4198...', xx, y);
    T.stepEnd();

    tanke(y, [
      [['Prissummorna anges med en']],
      [['decimal. 9,4 är mindre än 10,0,']],
      [['som jag förutsåg.']]
    ], 1.05);
    y += 3.3 * F;
    xe = T.str('Svar: Cirka 9,4 miljoner kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: T.acts, contentW: 600, lastBase: y + 1.4 * F, padL: padL };
  });
})();

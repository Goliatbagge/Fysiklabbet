/* i18n/nb/sidor/fysik2-vaxelstromsgenerator.js — norska (bokmål) för
 * simuleringen Växelströmsgenerator. Sprite- och canvastexten (slipringar,
 * borstar, lampa, tid) går via I18N.t i HTML-filen. */
(function () {
    I18N.add({
        // ---- Sidhuvud och delning ----
        'Växelströmsgenerator — Fysiklabbet': 'Vekselstrømsgenerator — Fysiklabbet',
        'Växelströmsgenerator — Fysik nivå 2': 'Vekselstrømsgenerator — Fysikk nivå 2',
        'Roterande spole i ett magnetfält alstrar sinusformad växelspänning — Faradays lag i 3D.':
            'En roterende spole i et magnetfelt gir sinusformet vekselspenning: Faradays lov i 3D.',
        'Växelströmsgenerator': 'Vekselstrømsgenerator',
        'Utforska hur en roterande spole i ett magnetfält alstrar en sinusformad växelspänning. Faradays induktionslag förklarar principen bakom all storskalig elproduktion.':
            'Utforsk hvordan en roterende spole i et magnetfelt gir en sinusformet vekselspenning. Faradays induksjonslov forklarer prinsippet bak all storskala kraftproduksjon.',
        '© 2025 Fysiklabbet. Skapad för gymnasieelever.': '© 2025 Fysiklabbet. Laget for elever i videregående skole.',

        // ---- Inställningsrutan ----
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Visa vektorer': 'Vis vektorer',
        '— magnetfält': '(magnetfelt)',
        '— kraft på ledare': '(kraft på leder)',
        '— strömriktning': '(strømretning)',
        'Visa magnetfält B': 'Vis magnetfelt B',
        'Visa kraft F': 'Vis kraft F',
        'Visa ström I': 'Vis strøm I',
        'Pausa simuleringen': 'Sett simuleringen på pause',
        'Starta simuleringen': 'Start simuleringen',
        '⏸ Pausa': '⏸ Pause',
        '▶ Starta': '▶ Start',

        // ---- Reglage ----
        'Parametrar': 'Parametere',
        'Rotationshastighet': 'Rotasjonshastighet',
        'varv/s': 'omdreininger/s',
        '0,5 varv/s': '0,5 omdreininger/s',
        '5,0 varv/s': '5,0 omdreininger/s',
        'Magnetfält': 'Magnetfelt',
        'Magnetfältsstyrka': 'Magnetfeltstyrke',
        'Slingans area': 'Arealet til sløyfen',
        'Antal varv': 'Antall vindinger',
        'Magnetfält (grönt)': 'Magnetfelt (grønt)',
        'Kraft på ledare (gult)': 'Kraft på leder (gul)',
        'Strömriktning (orange)': 'Strømretning (oransje)',

        // ---- Graf och avläsning ----
        'EMK vs tid': 'ems mot tid',
        'tid': 'tid',
        'Aktuella värden': 'Aktuelle verdier',
        'Vinkel θ': 'Vinkel θ',
        'Vinkelfrekvens ω': 'Vinkelfrekvens ω',
        'Aktuell EMK ε': 'Aktuell ems ε',
        'Max-EMK ε₀ = NBAω': 'Maksimal ems ε₀ = NBAω',
        'Magnetiskt flöde Φ': 'Magnetisk fluks Φ',

        // ---- 3D-scenen ----
        'slipringar': 'sleperinger',
        'borstar': 'børster',
        'lampa': 'lampe',

        // ---- Förklaring ----
        'Hur fungerar en växelströmsgenerator?': 'Hvordan virker en vekselstrømsgenerator?',
        'Faradays induktionslag': 'Faradays induksjonslov',
        'En roterande spole i ett magnetfält genererar en EMK (elektromotorisk kraft) eftersom det magnetiska flödet Φ = BA·cos(θ) varierar med tid. Enligt Faradays lag:':
            'En roterende spole i et magnetfelt gir en ems (elektromotorisk spenning) fordi den magnetiske fluksen Φ = BA·cos(θ) varierer med tiden. Ifølge Faradays lov:',
        'Sinusformad växelspänning': 'Sinusformet vekselspenning',
        'När slingan roterar med konstant vinkelhastighet ω = 2π': 'Når sløyfen roterer med konstant vinkelfart ω = 2π',
        'fås:': 'får vi:',
        'Den maximala spänningen ε₀ = NBAω ökar med fältets styrka, slingans area, antal varv och rotationshastighet.':
            'Den maksimale spenningen ε₀ = NBAω øker med feltstyrken, arealet til sløyfen, antall vindinger og rotasjonshastigheten.',
        'Kraft och strömriktning': 'Kraft og strømretning',
        'Kraften på en ström­förande ledare i magnetfält ges av Lorentzkraften:':
            'Kraften på en strøm­førende leder i et magnetfelt er gitt ved Lorentzkraften:',
        'Kraften på en strömförande ledare i magnetfält ges av Lorentzkraften:':
            'Kraften på en strømførende leder i et magnetfelt er gitt ved Lorentzkraften:',
        '). Strömmen byter riktning varje halvvarv via slipringar och borstar, vilket ger växelström i den externa kretsen. Glödlampan lyser starkast vid max-EMK.':
            '). Strømmen skifter retning hver halve omdreining via sleperinger og børster, og det gir vekselstrøm i den ytre kretsen. Glødelampen lyser sterkest ved maksimal ems.',
        'Tillämpningar': 'Anvendelser',
        'Principen används i alla kraftverk — vattenkraft, vindkraft, kärnkraft och värmekraft roterar en generator med exakt detta upplägg, men med tusentals varv och starka elektromagneter. I Sverige är nätfrekvensen 50 Hz, vilket kräver 3 000 varv/min för en 2-polsmaskin.':
            'Prinsippet brukes i alle kraftverk. Vannkraft, vindkraft, kjernekraft og varmekraft driver en generator med nøyaktig dette oppsettet, men med tusenvis av vindinger og sterke elektromagneter. I Sverige er nettfrekvensen 50 Hz, og det krever 3 000 omdreininger per minutt for en topolet maskin.'
    });
})();

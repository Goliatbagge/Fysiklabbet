/* i18n/nb/sidor/fysik2-magnetfalt-app.js — norska (bokmål) för ramsidan
 * Magnetfält runt en rak ledare. Själva simuleringen ligger i en iframe
 * (fysik2-magnetfalt/standalone.html) som inte laddar i18n.js; den läser
 * i stället förälderns I18N via T() (samma lösning som fysik1-tryck-pa). */
(function () {
    I18N.add({
        'Magnetfältssimulator — Fysiklabbet': 'Magnetfeltsimulator — Fysiklabbet',
        'Magnetfältssimulator — Fysik nivå 2': 'Magnetfeltsimulator — Fysikk nivå 2',
        'Högerhandsregeln och Oersteds experiment i 3D.': 'Høyrehåndsregelen og Ørsteds forsøk i 3D.',
        'Magnetfält - Rak ledare': 'Magnetfelt rundt en rett leder',
        'Magnetfält runt en rak ledare': 'Magnetfelt rundt en rett leder',
        'Utforska Oersteds experiment och magnetfältet som uppstår runt en strömförande ledare. Visualisera högerhandsregeln i 3D och se hur strömriktningen påverkar magnetfältets riktning!':
            'Utforsk Ørsteds forsøk og magnetfeltet som oppstår rundt en strømførende leder. Visualiser høyrehåndsregelen i 3D og se hvordan strømretningen påvirker retningen til magnetfeltet!',
        'Magnetfältssimulator - Rak ledare': 'Magnetfeltsimulator: rett leder',
        '© 2025 Fysiklabbet. Skapad för gymnasieelever.': '© 2025 Fysiklabbet. Laget for elever i videregående skole.',

        // Iframen fysik2-magnetfalt/standalone.html (läses via T() i iframen).
        // Fragmenten runt <i>B</i>, <i>I</i> och <strong> behåller sina
        // mellanslag i värdet, eftersom I18N.t() lämnar värdet orört.
        'Laddar 3D-scen...': 'Laster inn 3D-scenen …',
        'Magnetfält (': 'Magnetfelt (',
        ') - Rak ledare': ') rundt en rett leder',
        'Oersteds experiment: Visualisering av högerhandsregeln.': 'Ørsteds forsøk: visualisering av høyrehåndsregelen.',
        'Strömriktning (': 'Strømretning (',
        '↑ Ström uppåt': '↑ Strøm oppover',
        '↓ Ström nedåt': '↓ Strøm nedover',
        'Visualisering': 'Visualisering',
        'Visa magnetfält (Cirklar)': 'Vis magnetfelt (sirkler)',
        'Visa fältriktning (Pilar)': 'Vis feltretning (piler)',
        'Visa beteckningar (': 'Vis betegnelser (',
        'Enligt ': 'Ifølge ',
        'högerhandsregeln': 'høyrehåndsregelen',
        ': Om du griper om ledaren med höger hand så att tummen pekar i strömmens riktning, så pekar dina övriga fingrar i magnetfältets riktning.':
            ': Hvis du griper om lederen med høyre hånd slik at tommelen peker i strømretningen, peker de andre fingrene i retningen til magnetfeltet.'
    });
})();

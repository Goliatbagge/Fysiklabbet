/* i18n/nb.js — gemensam norsk (bokmål) ordlista för simuleringarna
 * (svenska → norska). Laddas av i18n.js på ?lang=nb.
 *
 * Här hör strängar hemma som förekommer i många simuleringar: huvudmenyn,
 * sidfoten, kursnamn, kapitelnamn, vanliga knappar och de delade skripten
 * (section-nav.js, sim-dock.js, feedback.js). Text som bara finns i en
 * simulering läggs i i18n/nb/sidor/<sida>.js. Fackorden följer
 * .claude/i18n/nb/termlista.md; språket granskas av agenten
 * norsk-sprakgranskare.
 *
 * Versalsatta varianter läggs till automatiskt längst ned.
 */
(function () {
    var D = {
        // ---- Huvudmenyn ----
        'nav:Start': 'Hjem',
        'Ämne': 'Fag',
        'Fysik': 'Fysikk',
        'Matematik': 'Matematikk',
        'Matematik – fortsättning': 'Matematikk, videreføring',
        'Nivå 1': 'Nivå 1',
        'Nivå 2': 'Nivå 2',
        'Nivå 1b': 'Nivå 1b',
        'Nivå 1c': 'Nivå 1c',
        'Nivå 2b': 'Nivå 2b',
        'Nivå 2c': 'Nivå 2c',
        'Simuleringar': 'Simuleringer',
        'Nationella prov': 'Nasjonale prøver',
        'Resurser': 'Ressurser',
        'Verktyg': 'Verktøy',
        'Rita kopplingsschema': 'Tegn koblingsskjema',
        'Sannolikhetskalkylator': 'Sannsynlighetskalkulator',
        'Slumpa grupper': 'Lag tilfeldige grupper',
        'Övningsblad': 'Oppgaveark',
        'Sammanfattningar': 'Sammendrag',
        'Fysiknyheter': 'Fysikknyheter',
        'Om': 'Om',
        'Kontakt': 'Kontakt',
        'Ordlista': 'Ordliste',
        'Huvudnavigation': 'Hovednavigasjon',
        'Hem': 'Hjem',
        'Fysik 1': 'Fysikk 1',
        'Fysik 2': 'Fysikk 2',

        // ---- Sidfot ----
        'FYSIKLABBET — TEORI, SIMULERINGAR OCH ÖVNINGAR I FYSIK': 'FYSIKLABBET · TEORI, SIMULERINGER OG OPPGAVER I FYSIKK',
        'SKAPAD FÖR GYMNASIEELEVER': 'LAGET FOR ELEVER I VIDEREGÅENDE SKOLE',
        'Skapad för gymnasieelever': 'Laget for elever i videregående skole',

        // ---- Kurser och kapitel ----
        'Fysik nivå 1': 'Fysikk nivå 1',
        'Fysik nivå 2': 'Fysikk nivå 2',
        'Introduktion': 'Introduksjon',
        'Rörelse': 'Bevegelse',
        'Krafter': 'Krefter',
        'Energi': 'Energi',
        'Tryck': 'Trykk',
        'Värmelära': 'Varmelære',
        'Elektricitet': 'Elektrisitet',
        'Relativitetsteori': 'Relativitetsteori',
        'Kärnfysik': 'Kjernefysikk',
        'Rörelse och krafter': 'Bevegelse og krefter',
        'Mekaniska vågor': 'Mekaniske bølger',
        'Elektromagnetism': 'Elektromagnetisme',
        'Ljus som våg och partikel': 'Lys som bølge og partikkel',
        'Astronomi': 'Astronomi',

        // ---- Avsnittsraden (section-nav.js) ----
        'Avsnittsväxlare': 'Velg del',
        'Läsning': 'Lesing',
        'Teori': 'Teori',
        'Experiment': 'Eksperiment',
        'Simulering': 'Simulering',
        'Simulering {n}': 'Simulering {n}',
        'Räkna': 'Øving',
        'Övningar': 'Oppgaver',
        'Exit ticket': 'Exit ticket',
        'Repetition': 'Repetisjon',
        'Kapitel': 'Kapittel',
        'Avsnitt': 'Delkapittel',
        'Sammanfattning': 'Sammendrag',

        // ---- Vanliga knappar och verktyg ----
        'Fullskärm': 'Fullskjerm',
        'Lämna fullskärm': 'Avslutt fullskjerm',
        'Start': 'Start',
        'Starta': 'Start',
        'Paus': 'Pause',
        'Pausa': 'Pause',
        'Fortsätt': 'Fortsett',
        'Spela': 'Spill av',
        'Börja om': 'Start på nytt',
        'Återställ': 'Tilbakestill',
        'Nollställ': 'Nullstill',
        'Stäng': 'Lukk',
        'Visa': 'Vis',
        'Dölj': 'Skjul',
        'Visa verktyg': 'Vis verktøy',
        'Dölj verktyg': 'Skjul verktøy',
        'Visa eller dölj verktygen': 'Vis eller skjul verktøyene',
        'Dölj reglage': 'Skjul kontrollene',
        'Visa reglage': 'Vis kontrollene',
        'Reglage': 'Kontroller',
        'Inställningar': 'Innstillinger',
        'Ultrarapid': 'Sakte film',
        'Visa spår': 'Vis spor',
        'Ljud': 'Lyd',
        'Ljud av': 'Lyd av',
        'Ljud på': 'Lyd på',
        'Nästa': 'Neste',
        'Föregående': 'Forrige',
        'Tillbaka': 'Tilbake',
        'Framåt': 'Frem',
        'Avbryt': 'Avbryt',
        'Klar': 'Ferdig',
        'Ja': 'Ja',
        'Nej': 'Nei',
        'Svar': 'Svar',
        'Rätt': 'Riktig',
        'Fel': 'Feil',
        'Rätt!': 'Riktig!',
        'Fel!': 'Feil!',
        'Läs mer': 'Les mer',
        'Tips:': 'Tips:',
        'Eget värde': 'Egen verdi',
        'Material': 'Materiale',

        // ---- Feedback-widgeten (feedback.js) ----
        'Lämna feedback': 'Gi tilbakemelding',
        'Feedback': 'Tilbakemelding',
        'Skicka': 'Send',
        'Tack!': 'Takk!',
        'Lämna tomt': 'La stå tomt',
        'Meddelande': 'Melding',
        'Vad vill du berätta? Hittade du en bugg, har du en idé eller en fråga?': 'Hva vil du fortelle? Har du funnet en feil, har du en idé eller et spørsmål?',
        'E-postadress': 'E-postadresse',
        'valfritt': 'valgfritt',
        'du@exempel.se': 'du@eksempel.no',
        'Bifoga fil eller skärmdump': 'Legg ved fil eller skjermbilde',
        'Välj fil': 'Velg fil',
        'Skicka feedback →': 'Send tilbakemelding →',
        'Skickar…': 'Sender …',
        'Försök igen': 'Prøv igjen',
        'Snyggt! Vi har registrerat din kraftfulla input. Acceleration mot en bättre sida påbörjad!': 'Flott! Vi har registrert det kraftfulle innspillet ditt. Akselerasjonen mot en bedre side er i gang!',
        'Kunde inte skicka: {fel}. Försök igen, eller mejla {adress} direkt.': 'Kunne ikke sende: {fel}. Prøv igjen, eller send e-post til {adress} direkte.'
    };

    var ut = {};
    for (var k in D) {
        ut[k] = D[k];
        var V = k.toUpperCase();
        if (V !== k && !(V in D)) ut[V] = D[k].toUpperCase();
    }
    window.I18N.add(ut);
})();

/* i18n/en.js — gemensam engelsk ordlista för gränssnittet (svenska → engelska).
 *
 * Nyckeln är den svenska texten EXAKT som den står i sidan (blanktecken
 * normaliseras). Här hör strängar hemma som förekommer på många sidor:
 * huvudmenyn, sidfoten, kursnamn, kapitelnamn och vanliga knappar. Text som
 * bara finns på en sida läggs i i18n/sidor/<sida>.js i stället.
 *
 * Versalsatta varianter (brödsmulor, etiketter med text-transform i koden)
 * läggs till automatiskt längst ned, så skriv bara den vanliga formen.
 */
(function () {
    var D = {
        // ---- Huvudmenyn ----
        // "nav:" = gäller bara inuti huvudmenyn (.lab-nav). Utanför menyn
        // betyder "Start" en startknapp i en simulering.
        'nav:Start': 'Home',
        'Ämne': 'Subject',
        'Fysik': 'Physics',
        'Matematik': 'Mathematics',
        'Matematik – fortsättning': 'Mathematics – continuation',
        'Nivå 1': 'Level 1',
        'Nivå 2': 'Level 2',
        'Nivå 1b': 'Level 1b',
        'Nivå 1c': 'Level 1c',
        'Nivå 2b': 'Level 2b',
        'Nivå 2c': 'Level 2c',
        'Simuleringar': 'Simulations',
        'Nationella prov': 'National tests',
        'Resurser': 'Resources',
        'Verktyg': 'Tools',
        'Rita kopplingsschema': 'Draw circuit diagrams',
        'Sannolikhetskalkylator': 'Probability calculator',
        'Slumpa grupper': 'Random groups',
        'Sannolikhetshörnan': 'Probability corner',
        'Övningsblad': 'Worksheets',
        'Sammanfattningar': 'Summaries',
        'Fysiknyheter': 'Physics news',
        'Om': 'About',
        'Kontakt': 'Contact',
        'Ordlista': 'Glossary',
        'Huvudnavigation': 'Main navigation',
        'Hem': 'Home',
        'Fysik 1': 'Physics 1',
        'Fysik 2': 'Physics 2',

        // ---- Sidfot och band ----
        'FYSIKLABBET — TEORI, SIMULERINGAR OCH ÖVNINGAR I FYSIK': 'FYSIKLABBET — THEORY, SIMULATIONS AND EXERCISES IN PHYSICS',
        'SKAPAD FÖR GYMNASIEELEVER': 'MADE FOR UPPER SECONDARY STUDENTS',
        'Skapad för gymnasieelever': 'Made for upper secondary students',

        // ---- Kurser ----
        'Fysik nivå 1': 'Physics level 1',
        'Fysik nivå 2': 'Physics level 2',
        'Matematik nivå 1b': 'Mathematics level 1b',
        'Matematik nivå 1c': 'Mathematics level 1c',
        'Matematik nivå 2b': 'Mathematics level 2b',
        'Matematik nivå 2c': 'Mathematics level 2c',
        'Matematik fortsättning nivå 1b': 'Mathematics continuation level 1b',
        'Matematik fortsättning nivå 1c': 'Mathematics continuation level 1c',
        'Matematik fortsättning nivå 2': 'Mathematics continuation level 2',
        'Matematik specialisering': 'Mathematics specialisation',

        // ---- Kapitel ----
        'Introduktion': 'Introduction',
        'Rörelse': 'Motion',
        'Krafter': 'Forces',
        'Energi': 'Energy',
        'Tryck': 'Pressure',
        'Värmelära': 'Heat',
        'Elektricitet': 'Electricity',
        'Relativitetsteori': 'Theory of relativity',
        'Kärnfysik': 'Nuclear physics',
        'Rörelse och krafter': 'Motion and forces',
        'Mekaniska vågor': 'Mechanical waves',
        'Elektromagnetism': 'Electromagnetism',
        'Ljus som våg och partikel': 'Light as wave and particle',
        'Astronomi': 'Astronomy',
        'Aritmetik': 'Arithmetic',
        'Algebra och ekvationer': 'Algebra and equations',
        'Procentuella förändringar': 'Percentage change',
        'Räta linjer och funktioner': 'Straight lines and functions',
        'Statistik och sannolikhetslära': 'Statistics and probability',
        'Trigonometri': 'Trigonometry',
        'Linjära ekvationssystem': 'Systems of linear equations',
        'Algebra och andragradsekvationer': 'Algebra and quadratic equations',
        'Andragradsfunktioner': 'Quadratic functions',
        'Geometri': 'Geometry',
        'Logaritmer': 'Logarithms',
        'Statistik': 'Statistics',
        'Rationella uttryck och gränsvärden': 'Rational expressions and limits',
        'Derivatan': 'The derivative',
        'Deriveringsregler': 'Differentiation rules',
        'Kurvor och extremvärden': 'Curves and extreme values',
        'Integraler': 'Integrals',
        'Trigonometri och triangelsatserna': 'Trigonometry and the triangle theorems',
        'Linjär optimering och derivatan': 'Linear optimisation and the derivative',
        'Geometrisk summa': 'Geometric sums',
        'Derivata': 'Derivatives',
        'Komplexa tal': 'Complex numbers',
        'Vektorer': 'Vectors',

        // ---- Avsnittsraden (section-nav.js) och vanliga etiketter ----
        'Teori': 'Theory',
        'Simulering': 'Simulation',
        'Övningar': 'Exercises',
        'Exit ticket': 'Exit ticket',
        'Exit tickets': 'Exit tickets',
        'Repetition': 'Revision',
        'Visualisering': 'Visualisation',
        'Kapitel': 'Chapter',
        'Avsnitt': 'Section',
        'Sammanfattning': 'Summary',

        // ---- Vanliga knappar och verktyg ----
        'Fullskärm': 'Full screen',
        'Lämna fullskärm': 'Exit full screen',
        'Start': 'Start',
        'Starta': 'Start',
        'Paus': 'Pause',
        'Pausa': 'Pause',
        'Fortsätt': 'Continue',
        'Spela': 'Play',
        'Börja om': 'Start over',
        'Återställ': 'Reset',
        'Nollställ': 'Reset',
        'Stäng': 'Close',
        'Visa': 'Show',
        'Dölj': 'Hide',
        'Visa verktyg': 'Show tools',
        'Dölj verktyg': 'Hide tools',
        'Dölj reglage': 'Hide controls',
        'Visa reglage': 'Show controls',
        'Reglage': 'Controls',
        'Inställningar': 'Settings',
        'Ultrarapid': 'Slow motion',
        'Visa spår': 'Show trails',
        'Ljud': 'Sound',
        'Ljud av': 'Sound off',
        'Ljud på': 'Sound on',
        'Sök': 'Search',
        'Sök …': 'Search …',
        'Sök...': 'Search...',
        'Nästa': 'Next',
        'Föregående': 'Previous',
        'Tillbaka': 'Back',
        'Framåt': 'Forward',
        'Skriv ut': 'Print',
        'Kopiera': 'Copy',
        'Kopierad': 'Copied',
        'Kopiera länk': 'Copy link',
        'Ladda ned': 'Download',
        'Spara': 'Save',
        'Öppna': 'Open',
        'Avbryt': 'Cancel',
        'Klar': 'Done',
        'Ja': 'Yes',
        'Nej': 'No',
        'Lösning': 'Solution',
        'Lösningsförslag': 'Suggested solution',
        'Visa lösning': 'Show solution',
        'Dölj lösning': 'Hide solution',
        'Svar': 'Answer',
        'Facit': 'Answer key',
        'Rätt': 'Correct',
        'Fel': 'Incorrect',
        'Rätt!': 'Correct!',
        'Fel!': 'Incorrect!',
        'Med penna': 'With pen',
        'Som text': 'As text',
        'Presentationsläge': 'Presentation mode',
        'Presentera': 'Present',
        'Läs mer': 'Read more',

        // ---- Feedback-widgeten (feedback.js) ----
        'Lämna feedback': 'Give feedback',
        'Feedback': 'Feedback',
        'Skicka': 'Send',
        'Tack!': 'Thank you!'
    };

    // Versalvarianter: brödsmulor och etiketter som versaliseras i koden
    // ("FYSIK NIVÅ 1") ska också översättas.
    var ut = {};
    for (var k in D) {
        ut[k] = D[k];
        var V = k.toUpperCase();
        if (V !== k && !(V in D)) ut[V] = D[k].toUpperCase();
    }
    window.I18N.add(ut);
})();

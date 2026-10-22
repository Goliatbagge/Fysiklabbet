/* GENERERAD av .claude/i18n/bygg-manifest.js ur i18n/gemensamt/*.js. Redigera delfilerna. */
/* ---- begrepp-lank ---- */
/* i18n/gemensamt/begrepp-lank.js — ordlistans förhandsvisning (popover). */
(function () {
    I18N.add({
        'Ur ordlistan': 'From the glossary',
        'Läs hela förklaringen →': 'Read the full explanation →',
        '{term} — läs förklaringen i ordlistan': '{term}: read the explanation in the glossary'
    });
})();

/* ---- feedback ---- */
/* i18n/gemensamt/feedback.js — feedbackwidgeten (glödlampan nere i hörnet). */
(function () {
    I18N.add({
        'Lämna feedback': 'Give feedback',
        'Stäng': 'Close',
        'Lämna tomt': 'Leave empty',
        'Meddelande': 'Message',
        'Vad vill du berätta? Hittade du en bugg, har du en idé eller en fråga?': 'What would you like to tell us? Did you find a bug, or do you have an idea or a question?',
        'E-postadress': 'Email address',
        'valfritt': 'optional',
        'du@exempel.se': 'you@example.com',
        'Bifoga fil eller skärmdump': 'Attach a file or screenshot',
        'Välj fil': 'Choose file',
        'Skicka feedback →': 'Send feedback →',
        'Skickar…': 'Sending…',
        'Försök igen': 'Try again',
        'Snyggt! Vi har registrerat din kraftfulla input. Acceleration mot en bättre sida påbörjad!': 'Nice! We have registered your powerful input. Acceleration towards a better site has begun!',
        'Kunde inte skicka: {fel}. Försök igen, eller mejla {adress} direkt.': 'Could not send: {fel}. Try again, or email {adress} directly.'
    });
})();

/* ---- graf ---- */
/* i18n/gemensamt/graf.js — engelsk ordlista för graf.js (::: graf, den
 * interaktiva grafritaren i teorin). graf.js översätter sina texter med
 * I18N.t, eftersom kortet ligger inne i teorins .no-i18n-behållare. */
I18N.add({
    'Okänt tecken i uttryck:': 'Unknown character in expression:',
    'Obalanserade parenteser': 'Unbalanced brackets',
    'Okänd variabel:': 'Unknown variable:',
    'Kunde inte tolka uttrycket:': 'Could not read the expression:',
    'Interaktiv graf till {namn}. Dra för att panorera, zooma med knapparna.':
        'Interactive graph of {namn}. Drag to pan, zoom with the buttons.',
    'Zooma in': 'Zoom in',
    'Zooma ut': 'Zoom out',
    'Återställ vyn': 'Reset the view',
    'Parametern {p}': 'Parameter {p}',
    'Värde för {p}': 'Value of {p}',
    'Visa trappsteget': 'Show slope triangle',
    'Återställ': 'Reset',
    'Graf saknar uttryck.': 'The graph has no expression.',
    'Kunde inte bygga grafen.': 'Could not build the graph.'
});

/* ---- handskrift-spelare ---- */
/* Pennlösningarnas spelare (handskrift.js mount): knappar och etiketter.
 * Texten PÅ papperet översätts i data/en/handskrift*.js. */
I18N.add({
    'Skriv': 'Write',
    'Paus': 'Pause',
    'Fortsätt': 'Continue',
    'Börja om': 'Start over',
    'Tempo': 'Speed',
    '0,75×': '0.75×',
    '1,5×': '1.5×',
    'Ultra': 'Ultra',
    'Utan tankar': 'Without thoughts',
    'Med tankar': 'With thoughts',
    'Ekvationer': 'Equations',
    'Båda led': 'Both sides',
    'Väggen': 'The wall',
    'Helskärm': 'Full screen',
    'Lämna helskärm': 'Exit full screen',
    'Inställningar': 'Settings',
    'Klicka för nästa steg': 'Click for the next step',
    'Föregående steg (vänsterpil)': 'Previous step (left arrow)',
    'Nästa steg (högerpil)': 'Next step (right arrow)',
    'Handskriven lösning': 'Handwritten solution',
    'Se hur lösningen skrivs för hand, steg för steg': 'See how the solution is written by hand, step by step',
    'Visa lösningen som vanlig text': 'Show the solution as ordinary text',
    'Välj hur lösningen visas': 'Choose how the solution is shown',
    'Uppgift': 'Task',
    'Lösning': 'Solution',
    'Med penna': 'With pen',
    'Som text': 'As text'
});

/* ---- nyhetsbrev-slidein ---- */
/* i18n/gemensamt/nyhetsbrev-slidein.js — nyhetsbrevets slide-in-ruta. */
(function () {
    I18N.add({
        'Ett mejl i veckan': 'One email a week',
        'Veckans fysiknyheter och nytt material på Fysiklabbet, samlat i ett mejl.': 'The week’s physics news and new material on Fysiklabbet, collected in one email (in Swedish).',
        'Du får ett bekräftelsemejl innan prenumerationen startar. Avsluta när du vill.': 'You will get a confirmation email before the subscription starts. Unsubscribe whenever you like.',
        'Stäng': 'Close',
        'Anmälan till nyhetsbrevet': 'Newsletter sign-up'
    });
})();

/* ---- nyhetsbrev ---- */
/* i18n/gemensamt/nyhetsbrev.js — anmälningsrutan för nyhetsbrevet.
 * Nyhetsbrevet självt skrivs på svenska; rutan säger det. EmailOctopus egna
 * felmeddelanden är på engelska och står kvar som de är (se nyhetsbrev.js). */
(function () {
    I18N.add({
        'Nyhetsbrev': 'Newsletter',
        'Fysiklabbets nyhetsbrev': 'Fysiklabbet newsletter',
        'Veckans fysiknyheter och nytt material på Fysiklabbet, samlat i ett mejl i veckan. Utvalt och förklarat så att det går att ta med in i klassrummet.':
            'The week’s physics news and new material on Fysiklabbet, collected in one email a week (in Swedish). Selected and explained so that it can be taken into the classroom.',
        'Du får ett bekräftelsemejl innan prenumerationen startar. Avsluta när du vill — varje utskick har en avanmälningslänk.':
            'You will get a confirmation email before the subscription starts. Unsubscribe whenever you like: every issue has an unsubscribe link.',
        'Anmälningsformuläret kunde inte laddas. Det stoppas ibland av en annonsblockerare, och ett tapp i nätet räcker också.':
            'The sign-up form could not be loaded. It is sometimes blocked by an ad blocker, and a dropped connection is enough too.',
        'Försök igen': 'Try again',
        'Kolla din inkorg — vi har skickat ett mejl där du bekräftar din adress. Prenumerationen startar först när du har klickat på länken i det.':
            'Check your inbox: we have sent an email where you confirm your address. The subscription only starts once you have clicked the link in it.'
    });
})();

/* ---- section-nav ---- */
/* i18n/gemensamt/section-nav.js — avsnittsraden överst på simuleringssidorna. */
(function () {
    I18N.add({
        'Avsnittsväxlare': 'Section switcher',
        'Läsning': 'Reading',
        'Teori': 'Theory',
        'Experiment': 'Experiment',
        'Simulering': 'Simulation',
        'Simulering {n}': 'Simulation {n}',
        'Räkna': 'Practice',
        'Övningar': 'Exercises'
    });
})();

/* ---- sim-dock ---- */
/* i18n/gemensamt/sim-dock.js — verktygsdockans handtag på mobil. */
(function () {
    I18N.add({
        'Visa verktyg': 'Show tools',
        'Dölj verktyg': 'Hide tools',
        'Visa eller dölj verktygen': 'Show or hide the tools'
    });
})();

/* ---- sok ---- */
/* i18n/gemensamt/sok.js — sökrutan i sidhuvudet (data/sok.js och sökfältet på
 * index.html, katalog.html och simuleringar.html): träffarnas etiketter och
 * verktygens namn och beskrivningar. Avsnittens och simuleringarnas namn
 * kommer ur datafilernas engelska överlägg. */
(function () {
    I18N.add({
        'Sök på Fysiklabbet': 'Search Fysiklabbet',
        'Rensa sökning': 'Clear search',
        'Inget matchar "{q}"': 'Nothing matches "{q}"',
        'Teori': 'Theory',
        'Simulering': 'Simulation',
        'Verktyg': 'Tools',
        'Repetition': 'Revision',
        'Enhetskoll': 'Unit check',
        'Begrepp': 'Concept',
        'Verktyg för lärare': 'Tools for teachers',
        'VERKTYG FÖR LÄRARE': 'TOOLS FOR TEACHERS',
        'ORDLISTA': 'GLOSSARY',
        'Rita kopplingsschema': 'Draw circuit diagrams',
        'Rita kopplingsscheman som i läroboken och kopiera bilden till ditt dokument.': 'Draw circuit diagrams like those in the textbook and copy the image into your document.',
        'Sannolikhetskalkylator': 'Probability calculator',
        'Räkna ut andelar i normalfördelningen, dra i gränserna och se arean under kurvan.': 'Work out proportions in the normal distribution, drag the limits and see the area under the curve.',
        'Slumpa grupper': 'Random groups',
        'Dela in klassen i slumpade grupper, med närvaro, villkor och grupper som sparas som fil.': 'Divide the class into random groups, with attendance, conditions and groups saved as a file.',
        'Sammanfattningar för varje avsnitt': 'Summaries for every section',
        'Välj kurs och kapitel, så visas avsnittens sammanfattningar en i taget i ett bildspel.': 'Choose a course and chapters, and the section summaries are shown one at a time in a slideshow.'
    });
})();

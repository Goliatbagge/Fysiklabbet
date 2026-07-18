// Repetitionsspel — Fysik nivå 1, kapitel 8: Relativitetsteori.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-8'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Relativitetsteori',
    chapterNumber: 8,
    intro: 'Här repeterar du grunderna i relativitetsteorin: tidsdilatation, längdkontraktion och sambandet mellan massa och energi.',
    stations: [
        {
            type: 'par',
            title: 'Para ihop begrepp och betydelse',
            instruktion: 'Dra rätt beskrivning till varje begrepp.',
            pairs: [
                { a: '$t_0$', b: 'Egentid — tiden mätt av någon inifrån rörelsesystemet' },
                { a: 'Tidsdilatation', b: 'Tiden går långsammare för ett rörligt objekt' },
                { a: 'Längdkontraktion', b: 'Objektet blir kortare i rörelsens riktning' },
                { a: 'Relativistisk massa', b: 'Objektets massa ökar med farten' },
                { a: '$E = m \\cdot c^2$', b: 'Sambandet mellan massa och energi' },
                { a: 'Michelson–Morleys experiment', b: 'Visade att ljusets hastighet inte påverkas av jordens rörelse' },
            ],
        },
        {
            type: 'lucka',
            title: 'Vilken formel är det?',
            instruktion: 'Dra rätt storhet till varje lucka.',
            formler: [
                { fore: 'Formeln $t = \\dfrac{t_0}{\\sqrt{1 - v^2/c^2}}$ beskriver', efter: '.', svar: 'tidsdilatation' },
                { fore: 'Formeln $l = l_0 \\cdot \\sqrt{1 - v^2/c^2}$ beskriver', efter: '.', svar: 'längdkontraktion' },
                { fore: 'Formeln $m = \\dfrac{m_0}{\\sqrt{1 - v^2/c^2}}$ beskriver', efter: '.', svar: 'relativistisk massa' },
                { fore: 'Formeln $E = m \\cdot c^2$ kopplar samman massa med', efter: '.', svar: 'energi' },
            ],
            distraktorer: ['hastigheten', 'kraften', 'accelerationen'],
        },
        {
            type: 'sortera',
            title: 'Vad händer vid höga hastigheter?',
            instruktion: 'Sortera storheterna i rätt låda. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Ökar med farten', items: ['tiden för ett förlopp (sett utifrån)', 'objektets massa', 'objektets energi ($E = m \\cdot c^2$)'] },
                { name: 'Minskar med farten', items: ['objektets längd i rörelseriktningen'] },
                { name: 'Är alltid densamma', items: ['ljusets hastighet i vakuum', 'objektets vilomassa $m_0$'] },
            ],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Ljusets hastighet i vakuum är alltid densamma, oavsett hur ljuskällan eller observatören rör sig.',
                  sant: true, varfor: 'Detta är den grundläggande principen bakom relativitetsteorin, bekräftad av Michelson och Morleys experiment.' },
                { text: 'Om ett rymdskepp rör sig mot dig med 70 % av ljusets hastighet och slår på strålkastarna, träffar ljuset dig med mer än ljusets hastighet.',
                  sant: false, varfor: 'Ljusets hastighet är konstant — den blir alltid $c$, oavsett källans rörelse.' },
                { text: 'Tidsdilatation innebär att tiden går snabbare för ett objekt som rör sig nära ljusets hastighet, sett från en observatör i vila.',
                  sant: false, varfor: 'Tiden går långsammare för det rörliga objektet sett från observatören i vila — inte snabbare.' },
                { text: 'Längdkontraktion gör att ett objekt blir kortare i rörelsens riktning vid höga hastigheter.',
                  sant: true, varfor: 'Ju närmare ljusets hastighet, desto kortare mäts objektet i rörelseriktningen av en observatör i vila.' },
                { text: 'Vid vardagliga hastigheter, som en bils eller ett flygplans, är de relativistiska effekterna stora och måste alltid räknas med.',
                  sant: false, varfor: 'Vid farter mycket lägre än $c$ är $v^2/c^2$ försumbart litet, så effekterna blir omärkbara.' },
                { text: 'GPS-satelliters klockor måste synkroniseras med hänsyn till relativistiska effekter.',
                  sant: true, varfor: 'Satelliternas hastighet gör att deras klockor annars skulle gå fel jämfört med klockor vid jordytan.' },
                { text: 'Enligt allmän relativitetsteori går tiden långsammare i ett starkare gravitationsfält.',
                  sant: true, varfor: 'Detta har bekräftats experimentellt genom att studera GPS-satelliters atomklockor.' },
            ],
        },
    ],
};

// Repetitionsspel — Fysik nivå 2, kapitel 4: Ljus som våg och partikel.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy2-4'] = {
    course: 'Fysik nivå 2',
    courseCode: 'fy2',
    chapter: 'Ljus som våg och partikel',
    chapterNumber: 4,
    intro: 'Här repeterar du ljus som våg och partikel: elektromagnetiska vågor, diffraktion och interferens, svartkroppsstrålning, brytning, fotoelektrisk effekt, de Broglies våglängd och atomens energinivåer.',
    stations: [
        {
            type: 'sortera',
            title: 'Våg eller partikel?',
            instruktion: 'Sortera fenomenen efter om de visar ljusets vågegenskaper eller dess partikelegenskaper. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Ljus som våg', items: ['Diffraktion', 'Interferens', 'Gitterformeln', 'Brytning'] },
                { name: 'Ljus som partikel', items: ['Fotoelektrisk effekt', 'Comptonspridning', 'Fotonens rörelsemängd', 'Utträdesarbete'] },
            ],
        },
        {
            type: 'ordna',
            title: 'Ordna det elektromagnetiska spektrumet',
            instruktion: 'Ordna strålningsslagen efter våglängd, från kortast till längst. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'kortast våglängd',
            etikettSlut: 'längst våglängd',
            items: ['Gammastrålning', 'Röntgenstrålning', 'Ultraviolett', 'Synligt ljus', 'Infrarött', 'Mikrovågor', 'Radiovågor'],
        },
        {
            type: 'lucka',
            title: 'Fyll i rätt begrepp',
            instruktion: 'Dra rätt begrepp till varje lucka.',
            formler: [
                { fore: 'Ljus av samma våglängd och i fas kallas', efter: '.', svar: 'koherent' },
                { fore: 'Vågors böjning runt hinder eller genom en smal öppning kallas', efter: '.', svar: 'diffraktion' },
                { fore: 'Den energi som krävs för att en elektron ska lämna en metallyta kallas', efter: '.', svar: 'utträdesarbete' },
                { fore: 'Talet som avgör hur mycket ljus bryts i ett material kallas', efter: '.', svar: 'brytningsindex' },
                { fore: 'Elektronens lägsta energitillstånd i en atom kallas', efter: '.', svar: 'grundtillstånd' },
            ],
            distraktorer: ['interferens', 'jonisationsenergi'],
        },
        {
            type: 'par',
            title: 'Para ihop formel och betydelse',
            instruktion: 'Dra rätt beskrivning till varje formel.',
            pairs: [
                { a: '$f = \\dfrac{c}{\\lambda}$', b: 'Sambandet mellan frekvens och våglängd' },
                { a: '$I = \\dfrac{P}{4\\pi \\cdot r^{2}}$', b: 'Ljusintensitet från en punktkälla' },
                { a: '$n \\cdot \\lambda = d \\cdot \\sin\\alpha_n$', b: 'Gitterformeln' },
                { a: '$n_1 \\cdot \\sin i = n_2 \\cdot \\sin b$', b: 'Snells lag (brytningslagen)' },
                { a: '$E = h \\cdot f$', b: 'Fotonens energi' },
                { a: '$\\lambda = \\dfrac{h}{m \\cdot v}$', b: 'de Broglie-våglängden' },
                { a: '$M = \\sigma \\cdot T^{4}$', b: 'Stefan–Boltzmanns lag' },
            ],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Ljus med hög intensitet men för låg frekvens kan slå ut elektroner ur en metallyta om man bara väntar tillräckligt länge.',
                  sant: false, varfor: 'Det är fotonens frekvens (energi), inte ljusets intensitet, som avgör om fotoelektrisk effekt sker — är $h \\cdot f$ mindre än utträdesarbetet händer ingenting, oavsett ljusstyrka.' },
                { text: 'Rörelsemängden bevaras när en foton absorberas eller sprids av en elektron.',
                  sant: true, varfor: 'Precis som vid en vanlig kollision bevaras rörelsemängden, till exempel vid Comptonspridning.' },
                { text: 'En ljusstråle som går från luft till glas bryts från normalen.',
                  sant: false, varfor: 'Glas är optiskt tätare än luft, så strålen bryts mot normalen, inte från den.' },
                { text: 'Enligt de Broglies hypotes har alla rörliga partiklar en våglängd, inte bara fotoner.',
                  sant: true, varfor: 'Våglängden $\\lambda = h/(m \\cdot v)$ gäller i princip alla partiklar, men är bara märkbar för mycket små massor som elektroner.' },
                { text: 'Ett kontinuerligt spektrum, som från en glödlampa, innehåller bara vissa bestämda våglängder.',
                  sant: false, varfor: 'Ett kontinuerligt spektrum innehåller alla våglängder — det är ett diskret spektrum som bara innehåller vissa bestämda våglängder.' },
                { text: 'Enligt Wiens förskjutningslag ger en hetare svart kropp en kortare toppvåglängd.',
                  sant: true, varfor: 'Eftersom $\\lambda_\\mathrm{max} \\cdot T$ är konstant ger en högre temperatur ett lägre $\\lambda_\\mathrm{max}$.' },
                { text: 'I ett energinivådiagram har jonisationsgränsen energin noll, och alla bundna tillstånd har negativ energi.',
                  sant: true, varfor: 'Jonisationsgränsen väljs som nollnivå, så en elektron bunden till kärnan har negativ energi.' },
            ],
        },
    ],
};

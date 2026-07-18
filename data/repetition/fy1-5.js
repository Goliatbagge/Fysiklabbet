// Repetitionsspel — Fysik nivå 1, kapitel 5: Tryck.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-5'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Tryck',
    chapterNumber: 5,
    intro: 'Här repeterar du tryck och tryckkraft, vätsketryck, lufttryck, Arkimedes princip, ideala gaslagen med kelvinskalan och Pascals princip.',
    stations: [
        {
            type: 'sortera',
            title: 'Ökar eller minskar trycket?',
            instruktion: 'Sortera händelserna i rätt låda. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Ökar trycket', items: ['större djup', 'mindre area (samma kraft)', 'högre temperatur (gas)', 'mindre volym (gas)'] },
                { name: 'Minskar trycket', items: ['större area (samma kraft)', 'mindre djup', 'större volym (gas)', 'lägre temperatur (gas)'] },
            ],
        },
        {
            type: 'par',
            title: 'Para ihop formel och namn',
            instruktion: 'Dra rätt namn till varje formel.',
            pairs: [
                { a: '$p = \\dfrac{F}{A}$', b: 'Tryck (fasta kroppar)' },
                { a: '$p = \\rho \\cdot g \\cdot h$', b: 'Vätsketryck' },
                { a: '$p = p_0 + \\rho \\cdot g \\cdot h$', b: 'Totalt tryck' },
                { a: '$F_L = \\rho \\cdot g \\cdot V$', b: 'Lyftkraft (Arkimedes princip)' },
                { a: '$T_K = T_C + 273$', b: 'Kelvinskalan' },
                { a: '$\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}$', b: 'Pascals princip' },
                { a: '$\\dfrac{p_1 \\cdot V_1}{T_1} = \\dfrac{p_2 \\cdot V_2}{T_2}$', b: 'Ideala gaslagen' },
            ],
        },
        {
            type: 'lucka',
            title: 'Fyll i rätt begrepp',
            instruktion: 'Dra rätt ord eller uttryck till varje lucka.',
            formler: [
                { fore: 'Vätsketrycket i en bestämd vätska beror bara på', efter: '.', svar: 'djupet' },
                { fore: 'Temperaturen i ideala gaslagen ska alltid anges i', efter: '.', svar: 'kelvin' },
                { fore: 'Vid Arkimedes princip används densiteten hos', efter: ', aldrig hos själva föremålet.', svar: 'den undanträngda vätskan' },
                { fore: 'Vätsketrycket verkar alltid', efter: 'mot den yta det möter.', svar: 'vinkelrätt' },
                { fore: 'En flytande kropps lyftkraft är', efter: 'tyngdkraften.', svar: 'lika stor som' },
            ],
            distraktorer: ['kärlets form', 'celsius', 'föremålet'],
        },
        {
            type: 'ordna',
            title: 'Ordna tryckenheterna',
            instruktion: 'De fem enheterna nedan motsvarar olika stora tryck. Ordna dem från minst till störst tryck. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'minst',
            etikettSlut: 'störst',
            items: ['1 Pa', '1 mmHg', '1 psi', '1 bar', '1 atm'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Tryckkraften och trycket är alltid lika stora, oavsett vilken area kraften fördelas på.',
                  sant: false, varfor: 'Trycket är kraften delad med arean — samma kraft ger olika tryck beroende på ytans storlek.' },
                { text: 'Vätsketrycket på ett visst djup är detsamma oavsett kärlets form eller mängden vätska.',
                  sant: true, varfor: 'Vätsketrycket $p = \\rho \\cdot g \\cdot h$ beror bara på djupet $h$, inte på kärlets form.' },
                { text: 'Enligt Arkimedes princip är lyftkraften på en nedsänkt kropp lika stor som tyngden av den undanträngda vätskan.',
                  sant: true, varfor: 'Det är själva innebörden av Arkimedes princip: $F_L = \\rho \\cdot g \\cdot V$.' },
                { text: 'Ett föremål som sjunker i vatten påverkas inte av någon lyftkraft alls.',
                  sant: false, varfor: 'Även ett sjunkande föremål påverkas av en lyftkraft, men den är mindre än tyngdkraften.' },
                { text: 'Temperaturen $0\\ \\mathrm{K}$ motsvarar $-273\\ ^{\\circ}\\mathrm{C}$.',
                  sant: true, varfor: 'Kelvinskalan utgår från den absoluta nollpunkten, som ligger vid $-273\\ ^{\\circ}\\mathrm{C}$.' },
                { text: 'I en hydraulisk domkraft blir kraften på den stora kolven mindre än kraften på den lilla kolven.',
                  sant: false, varfor: 'Enligt Pascals princip $\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}$ blir kraften större på kolven med störst area — det är själva poängen med hydraulisk förstärkning.' },
                { text: 'Ideala gaslagen kräver att tryck och volym anges i SI-enheter.',
                  sant: false, varfor: 'Tryck och volym behöver bara ha samma enhet på båda sidor — det är bara temperaturen som måste anges i kelvin.' },
            ],
        },
    ],
};

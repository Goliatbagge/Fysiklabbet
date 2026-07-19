// Repetitionsspel — Fysik nivå 1, kapitel 1: Introduktion.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-1'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Introduktion',
    chapterNumber: 1,
    intro: 'Här repeterar du kapitlets grunder: den naturvetenskapliga metoden, SI-enheter och prefix, samt värdesiffror och grundpotensform.',
    stations: [
        {
            type: 'par',
            title: 'Para ihop prefix och tiopotens',
            instruktion: 'Dra rätt prefix till varje tiopotens.',
            pairs: [
                { a: '$10^{3}$', b: 'kilo' },
                { a: '$10^{6}$', b: 'mega' },
                { a: '$10^{9}$', b: 'giga' },
                { a: '$10^{-1}$', b: 'deci' },
                { a: '$10^{-2}$', b: 'centi' },
                { a: '$10^{-3}$', b: 'milli' },
                { a: '$10^{-6}$', b: 'mikro' },
            ],
        },
        {
            type: 'sortera',
            title: 'Storhet eller enhet?',
            instruktion: 'Sortera orden i rätt låda. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Storhet', items: ['sträcka', 'massa', 'tid', 'kraft', 'temperatur'] },
                { name: 'Enhet', items: ['meter', 'kilogram', 'sekund', 'newton', 'kelvin'] },
            ],
        },
        {
            type: 'ordna',
            title: 'Ordna prefixen i storleksordning',
            instruktion: 'Ordna prefixen efter vilken tiopotens de motsvarar, från minst till störst. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'minst',
            etikettSlut: 'störst',
            items: ['nano', 'mikro', 'milli', 'centi', 'deci', 'kilo', 'mega'],
        },
        {
            type: 'lucka',
            title: 'Fyll i luckorna',
            instruktion: 'Dra rätt ord till varje lucka.',
            formler: [
                { fore: 'Det första steget i den naturvetenskapliga metoden är', efter: '.', svar: 'observation' },
                { fore: 'En hypotes som testats i flera experiment utan att motbevisas kallas en', efter: '.', svar: 'lag' },
                { fore: 'Flera lagar som tillsammans förklarar ett område bildar en', efter: '.', svar: 'teori' },
                { fore: 'I grundpotensform ska den första faktorn vara ett tal mellan 1 och', efter: '.', svar: '10' },
                { fore: 'Vid multiplikation och division bestäms svarets antal värdesiffror av det tal som har', efter: 'antal värdesiffror.', svar: 'minst' },
            ],
            distraktorer: ['modell', '100', 'störst'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Talet 0,00042 skrivet på grundpotensform är $4{,}2 \\cdot 10^{-4}$.',
                  sant: true, varfor: 'Första faktorn ska ligga mellan 1 och 10; tre nollor före fyran ger exponenten $-4$.' },
                { text: 'Vid multiplikation ska svaret avrundas till det STÖRSTA antalet värdesiffror bland faktorerna.',
                  sant: false, varfor: 'Svaret avrundas till det MINSTA antalet värdesiffror bland faktorerna.' },
                { text: 'Prefixet "mikro" motsvarar tiopotensen $10^{-6}$.',
                  sant: true, varfor: 'Mikro (μ) är prefixet för $10^{-6}$.' },
                { text: 'Man ska avrunda efter varje delberäkning i en uppgift.',
                  sant: false, varfor: 'Avrunda först i slutet — avrundar man i varje steg kan felet i slutsvaret bli stort.' },
                { text: 'Prefixet "centi" motsvarar tiopotensen $10^{-2}$.',
                  sant: true, varfor: 'Centi (c) står för $10^{-2}$ — 1 cm är alltså 0,01 m.' },
                { text: 'En hypotes som motbevisas i ett experiment blir automatiskt en lag.',
                  sant: false, varfor: 'En hypotes blir en lag om experimenten STÖDJER den, inte om den motbevisas.' },
                { text: 'SI-systemet bygger på sju grundenheter, bland annat meter, kilogram och sekund.',
                  sant: true, varfor: 'De sju SI-grundenheterna är m, kg, s, A, K, mol och cd.' },
            ],
        },
    ],
};

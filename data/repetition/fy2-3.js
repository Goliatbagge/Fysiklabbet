// Repetitionsspel — Fysik nivå 2, kapitel 3: Elektromagnetism.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy2-3'] = {
    course: 'Fysik nivå 2',
    courseCode: 'fy2',
    chapter: 'Elektromagnetism',
    chapterNumber: 3,
    intro: 'Här repeterar du magnetfält, högerhandsreglerna, magnetisk kraft, induktion och Lenz lag, samt tillämpningarna växelströmsgenerator, transformator, hastighetsväljare och masspektrometer.',
    stations: [
        {
            type: 'sortera',
            title: 'Vad skapar ett magnetfält — och vad påverkas av ett?',
            instruktion: 'Sortera i rätt låda. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Skapar ett magnetfält', items: ['strömförande ledare', 'spole (solenoid)', 'permanentmagnet', 'jordens smälta, roterande metallkärna'] },
                { name: 'Påverkas av en kraft i ett magnetfält', items: ['laddad partikel i rörelse', 'järnföremål', 'kompassnål'] },
            ],
        },
        {
            type: 'par',
            title: 'Para ihop formel och betydelse',
            instruktion: 'Dra rätt beskrivning till varje formel.',
            pairs: [
                { a: '$F = q \\cdot v \\cdot B$', b: 'Magnetisk kraft på en laddad partikel' },
                { a: '$F = B \\cdot I \\cdot l$', b: 'Magnetisk kraft på en strömförande ledare' },
                { a: '$e = l \\cdot v \\cdot B$', b: 'Inducerad spänning för en rak ledare i rörelse' },
                { a: '$\\Phi = B \\cdot A_\\perp$', b: 'Magnetiskt flöde genom en yta' },
                { a: '$e = -N \\cdot \\dfrac{\\Delta \\Phi}{\\Delta t}$', b: 'Inducerad spänning i en spole' },
                { a: '$\\dfrac{N_1}{N_2} = \\dfrac{U_1}{U_2}$', b: 'Spänningsomsättning i en transformator' },
                { a: '$v = \\dfrac{\\mathbb{E}}{B}$', b: 'Hastigheten som passerar rakt genom en hastighetsväljare' },
            ],
        },
        {
            type: 'lucka',
            title: 'Fyll i rätt ord',
            instruktion: 'Dra rätt ord eller uttryck till varje lucka.',
            formler: [
                { fore: 'Lutningen i ett $\\Phi\\text{-}t\\text{-diagram}$ ger', efter: '.', svar: 'den inducerade spänningen' },
                { fore: 'Ökar man spänningen i en transformator en viss faktor minskar strömmen med', efter: 'faktor (om förluster ignoreras).', svar: 'samma' },
                { fore: 'En inducerad ström får enligt Lenz lag alltid en riktning som', efter: 'orsaken till sin uppkomst.', svar: 'motverkar' },
                { fore: 'Rör sig en ledare längs sin egen längdriktning i ett magnetfält induceras', efter: 'spänning.', svar: 'ingen' },
                { fore: 'Magnetiskt flöde mäts i enheten', efter: ', medan magnetisk flödestäthet mäts i tesla.', svar: 'weber' },
            ],
            distraktorer: ['förstärker', 'hälften så stor', 'newton'],
        },
        {
            type: 'ordna',
            title: 'Ordna efter magnetfältets styrka',
            instruktion: 'Ordna magnetfälten från svagast till starkast. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'svagast',
            etikettSlut: 'starkast',
            items: ['Jordmagnetiska fältet (~50 μT)', 'Kylskåpsmagnet (~5 mT)', 'Inuti en spole/transformator (~1 T)', 'Starkaste människan skapat (1 200 T)', 'Starkast observerade, en magnetar (~100 GT)'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Endast högerhanden kan användas för tumregeln och tre-finger-regeln.',
                  sant: true, varfor: 'Reglerna gäller bara högerhanden — håller man upp vänsterhanden pekar riktningarna fel.' },
                { text: 'Enligt tre-finger-regeln motsvarar tummen magnetfältets riktning.',
                  sant: false, varfor: 'Tummen motsvarar strömmens riktning, pekfingret fältets riktning och långfingret kraftens riktning.' },
                { text: 'Lenz lag säger att en inducerad ström får en riktning som förstärker orsaken till sin uppkomst.',
                  sant: false, varfor: 'Lenz lag säger tvärtom att den inducerade strömmen motverkar orsaken till sin uppkomst.' },
                { text: 'En magnet som står helt stilla inuti en spole inducerar ingen ström.',
                  sant: true, varfor: 'Induktion kräver antingen relativ rörelse mellan magnet och spole, eller en ändring av det magnetiska flödet.' },
                { text: 'Virvelströmmar i en induktionshäll uppstår för att strömmarna motverkar den ändring i magnetfältet som orsakar dem.',
                  sant: true, varfor: 'Det är samma princip som Lenz lag: den inducerade strömmen motverkar sin egen orsak, vilket ger värmeutveckling.' },
                { text: 'Ström ut ur planet markeras i figurer med ett kryss i en cirkel.',
                  sant: false, varfor: 'Ström ut ur planet markeras med en prick (som en pilspets riktad mot dig); ett kryss betyder in i planet.' },
                { text: 'Om två parallella ledare har ström i samma riktning attraherar de varandra.',
                  sant: true, varfor: 'Varje ledare befinner sig i den andras magnetfält, och enligt Newtons tredje lag blir kraften attraherande vid samma strömriktning.' },
            ],
        },
    ],
};

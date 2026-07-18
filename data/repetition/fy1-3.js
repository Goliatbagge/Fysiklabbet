// Repetitionsspel — Fysik nivå 1, kapitel 3: Krafter.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-3'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Krafter',
    chapterNumber: 3,
    intro: 'Här repeterar du Newtons tre lagar, tyngdkraft och normalkraft, gravitationslagen, friktion och komposantuppdelning på lutande plan.',
    stations: [
        {
            type: 'par',
            title: 'Para ihop kraft och beteckning',
            instruktion: 'Dra rätt namn till varje beteckning.',
            pairs: [
                { a: '$F_G$', b: 'Tyngdkraft' },
                { a: '$F_N$', b: 'Normalkraft' },
                { a: '$F_f$', b: 'Friktionskraft' },
                { a: '$F_R$', b: 'Resulterande kraft' },
                { a: '$F_S$', b: 'Spännkraft' },
                { a: '$\\mu$', b: 'Friktionstal' },
                { a: '$G$', b: 'Gravitationskonstanten' },
            ],
        },
        {
            type: 'lucka',
            title: 'Fyll i rätt formel',
            instruktion: 'Dra rätt formel till varje lucka.',
            formler: [
                { fore: 'Newtons andra lag skrivs', efter: '.', svar: '$F_R = m \\cdot a$' },
                { fore: 'Tyngdkraften ges av formeln', efter: '.', svar: '$F_G = m \\cdot g$' },
                { fore: 'Friktionskraften ges av formeln', efter: '.', svar: '$F_f = \\mu \\cdot F_N$' },
                { fore: 'Newtons gravitationslag skrivs', efter: '.', svar: '$F_G = G \\cdot \\dfrac{m_1 \\cdot m_2}{r^{2}}$' },
                { fore: 'Tyngdkraftens komposant nedför ett lutande plan med vinkeln α ges av', efter: '.', svar: '$F_1 = m \\cdot g \\cdot \\sin \\alpha$' },
            ],
            distraktorer: ['$F_R = m + a$', '$F_G = \\dfrac{m}{g}$'],
        },
        {
            type: 'sortera',
            title: 'Jämviktskrafter eller motkrafter?',
            instruktion: 'Sortera kraftparen i rätt låda. Jämviktskrafter verkar på samma föremål, motkrafter (Newtons tredje lag) verkar på två olika föremål.',
            bins: [
                { name: 'Jämviktskrafter — samma föremål', items: ['Tyngdkraft och normalkraft på en vilande låda', 'Dragkraft och friktion på en kloss i konstant hastighet', 'Spännkraft och tyngdkraft på en hängande vikt i vila'] },
                { name: 'Motkrafter — två olika föremål', items: ['Handens kraft på väggen och väggens kraft på handen', 'Jordens gravitationskraft på månen och månens gravitationskraft på jorden', 'Fotens kraft på marken och markens kraft på foten'] },
            ],
        },
        {
            type: 'ordna',
            title: 'Ordna efter friktionstal',
            instruktion: 'Ordna materialparen efter friktionstal, från minst till mest friktion. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'minst friktion',
            etikettSlut: 'mest friktion',
            items: ['Stål mot is (0,01)', 'Is mot is (0,05)', 'Trä mot trä (0,25)', 'Kardborreband mot kardborreband (1,3)'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'En bil och en cykel som puttas till samma acceleration kräver samma kraft, oavsett massa.',
                  sant: false, varfor: 'Newtons andra lag ger $F_R = m \\cdot a$ — bilens större massa kräver en större kraft för samma acceleration.' },
                { text: 'En fallskärmshoppare som fallit tillräckligt länge kan ha en resulterande kraft på noll fastän hen fortfarande rör sig nedåt.',
                  sant: true, varfor: 'Vid gränshastigheten är luftmotståndet lika stort som tyngdkraften — resulterande kraft noll, men rörelsen fortsätter med konstant hastighet.' },
                { text: 'Motkraften till tyngdkraften på ett äpple är normalkraften från bordet det ligger på.',
                  sant: false, varfor: 'Motkraften måste vara samma typ av kraft — det är en tyngdkraft från äpplet uppåt på jorden, inte en normalkraft.' },
                { text: 'Ju större massa ett föremål har, desto större är dess tröghet.',
                  sant: true, varfor: 'Tröghet är motståndet mot förändring av rörelsen, och det ökar med massan.' },
                { text: 'Kraft och motkraft enligt Newtons tredje lag verkar alltid på samma föremål.',
                  sant: false, varfor: 'Kraft och motkraft verkar alltid på två olika föremål — annars skulle de ta ut varandra och inget kunde röra sig.' },
                { text: 'Normalkraften är alltid riktad rakt uppåt, oavsett vilken yta föremålet vilar mot.',
                  sant: false, varfor: 'Normalkraften är alltid vinkelrät mot kontaktytan — på ett lutande plan pekar den snett ut från planet.' },
                { text: 'Jorden och månen drar i varandra med exakt lika stor gravitationskraft, trots att jorden har mycket större massa.',
                  sant: true, varfor: 'Enligt Newtons tredje lag är krafterna lika stora — det är accelerationen som blir mycket mindre hos den tyngre jorden.' },
                { text: 'En raket som accelererar uppåt gör det genom att skjuta ut gas nedåt.',
                  sant: true, varfor: 'Newtons tredje lag: raketen trycker gasen nedåt, och gasen trycker raketen uppåt med en lika stor motriktad kraft.' },
            ],
        },
    ],
};

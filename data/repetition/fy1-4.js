// Repetitionsspel — Fysik nivå 1, kapitel 4: Energi.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-4'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Energi',
    chapterNumber: 4,
    intro: 'Här repeterar du kapitlet om energi: arbete, läges- och rörelseenergi, effekt, verkningsgrad samt rörelsemängd och impuls.',
    stations: [
        {
            type: 'sortera',
            title: 'Vektor eller skalär?',
            instruktion: 'Sortera storheterna i rätt låda. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Vektor — storlek och riktning', items: ['rörelsemängd', 'impuls', 'kraft'] },
                { name: 'Skalär — bara storlek', items: ['rörelseenergi', 'arbete', 'effekt', 'verkningsgrad'] },
            ],
        },
        {
            type: 'par',
            title: 'Para ihop formel och storhet',
            instruktion: 'Dra rätt namn till varje formel.',
            pairs: [
                { a: '$W = F_s \\cdot s$', b: 'Arbete' },
                { a: '$E_p = m \\cdot g \\cdot h$', b: 'Lägesenergi' },
                { a: '$E_k = \\dfrac{m \\cdot v^{2}}{2}$', b: 'Rörelseenergi' },
                { a: '$P = \\dfrac{W}{\\Delta t}$', b: 'Effekt' },
                { a: '$\\eta = \\dfrac{E_n}{E_t}$', b: 'Verkningsgrad' },
                { a: '$p = m \\cdot v$', b: 'Rörelsemängd' },
                { a: '$I = F \\cdot \\Delta t$', b: 'Impuls' },
            ],
        },
        {
            type: 'lucka',
            title: 'Rätt begrepp i luckan',
            instruktion: 'Dra rätt ord eller uttryck till varje lucka.',
            formler: [
                { fore: 'Summan av rörelseenergi och lägesenergi kallas', efter: '.', svar: 'mekanisk energi' },
                { fore: 'Arean under en $F\\text{-}t\\text{-graf}$ ger', efter: '.', svar: 'impulsen' },
                { fore: 'Den värme som bildas när friktion uträttar arbete kallas', efter: '.', svar: 'friktionsvärme' },
                { fore: 'En kollision där föremålen hakar i varandra kallas', efter: '.', svar: 'en oelastisk stöt' },
                { fore: 'Andelen av tillförd energi som blir nyttig kallas', efter: '.', svar: 'verkningsgrad' },
            ],
            distraktorer: ['rörelsemängd', 'en elastisk stöt'],
        },
        {
            type: 'ordna',
            title: 'Ordna energiomvandlingen i ett vattenkraftverk',
            instruktion: 'Ordna omvandlingskedjan från första till sista steget. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'först',
            etikettSlut: 'sist',
            items: ['Lägesenergi i vattenmagasinet', 'Rörelseenergi i fallande vatten', 'Rörelseenergi i snurrande turbin', 'Elektrisk energi från generatorn'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Arbetet en kraft uträttar beror bara på kraftens storlek, inte på hur långt föremålet förflyttas.',
                  sant: false, varfor: 'Arbete är produkten av kraften i rörelseriktningen och sträckan, $W = F_s \\cdot s$ — båda faktorerna spelar roll.' },
                { text: 'Om en kraft verkar vinkelrätt mot rörelseriktningen uträttar den inget arbete.',
                  sant: true, varfor: 'Då är kraftkomposanten i rörelseriktningen $F_s = 0$, vilket ger $W = 0$.' },
                { text: 'Lägesenergins nollnivå måste alltid sättas vid marken.',
                  sant: false, varfor: 'Nollnivån kan väljas fritt; den sätts oftast längst ner i systemet, men det är inget krav.' },
                { text: 'Rörelseenergin är proportionell mot kvadraten på hastigheten.',
                  sant: true, varfor: 'Med $E_k = \\dfrac{m \\cdot v^{2}}{2}$ ger en dubblad hastighet fyra gånger så stor rörelseenergi.' },
                { text: 'I ett slutet system utan friktion är den mekaniska energin konstant.',
                  sant: true, varfor: 'Energiprincipen ger $E_{p1} + E_{k1} = E_{p2} + E_{k2}$ när ingen energi blir friktionsvärme.' },
                { text: 'Verkningsgraden hos en apparat kan vara större än 1.',
                  sant: false, varfor: 'En apparat kan aldrig avge mer energi än den tar emot, så $0 \\leq \\eta \\leq 1$.' },
                { text: 'Rörelsemängden hos ett föremål har både storlek och riktning.',
                  sant: true, varfor: 'Med $p = m \\cdot v$ och hastigheten som vektor blir även rörelsemängden en vektor.' },
                { text: 'Vid en fullkomligt oelastisk stöt bevaras rörelsemängden, men inte hela den mekaniska energin.',
                  sant: true, varfor: 'Rörelsemängden bevaras alltid i ett slutet system, men en del rörelseenergi omvandlas t.ex. till värme eller deformation.' },
            ],
        },
    ],
};

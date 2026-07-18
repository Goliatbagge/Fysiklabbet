// Repetitionsspel — Fysik nivå 1, kapitel 6: Värmelära.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-6'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Värmelära',
    chapterNumber: 6,
    intro: 'Här repeterar du värme, temperatur, uppvärmning, fasövergångar och termodynamikens huvudsatser.',
    stations: [
        {
            type: 'lucka',
            title: 'Vilket begrepp menas?',
            instruktion: 'Dra rätt begrepp till varje lucka.',
            formler: [
                { fore: 'Energi som självmant strömmar från varmt till kallt kallas', efter: '.', svar: 'värme' },
                { fore: 'Mått på atomernas genomsnittliga rörelseenergi kallas', efter: '.', svar: 'temperatur' },
                { fore: 'Summan av potentiell energi och rörelseenergi hos atomerna i ett material kallas', efter: '.', svar: 'inre energi' },
                { fore: 'Energin som går åt för att smälta 1 kg av ett ämne kallas', efter: '.', svar: 'specifik smältentalpi' },
                { fore: 'Den lägsta möjliga temperaturen, $0\\ \\mathrm{K}$, kallas', efter: '.', svar: 'absoluta nollpunkten' },
            ],
            distraktorer: ['kyla', 'effekt'],
        },
        {
            type: 'sortera',
            title: 'Ledning, strålning eller strömning?',
            instruktion: 'Sortera exemplen i rätt låda. Dra en bricka till en låda, eller klicka på brickan och sedan på lådan.',
            bins: [
                { name: 'Ledning', items: ['Värme från spisplatta till kastrull', 'Att hålla en isbit i handen'] },
                { name: 'Strålning', items: ['Solens värme genom rymdens vakuum', 'Värme du känner från en brasa'] },
                { name: 'Strömning (konvektion)', items: ['Varm luft stiger vid ett element', 'Vindar som för värme mellan breddgrader'] },
            ],
        },
        {
            type: 'par',
            title: 'Para ihop formel och betydelse',
            instruktion: 'Dra rätt beskrivning till varje formel.',
            pairs: [
                { a: '$T_K = T_C + 273$', b: 'Omvandling från Celsius till kelvin' },
                { a: '$E = c \\cdot m \\cdot \\Delta T$', b: 'Energi vid uppvärmning eller avsvalning' },
                { a: '$E = l_s \\cdot m$', b: 'Energi vid smältning eller stelning' },
                { a: '$E = l_å \\cdot m$', b: 'Energi vid förångning eller kondensation' },
                { a: '$E_\\text{avg} = E_\\text{upp}$', b: 'Energibalans utan energiförluster' },
                { a: '$0\\ \\mathrm{K}$', b: 'Absoluta nollpunkten' },
            ],
        },
        {
            type: 'ordna',
            title: 'Ordna förloppet',
            instruktion: 'Ordna vad som händer när minusgradig is värms upp till vattenånga, i rätt tidsordning. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'först',
            etikettSlut: 'sist',
            items: ['Isen värms upp', 'Isen smälter (temperaturen konstant)', 'Vattnet värms upp', 'Vattnet förångas (temperaturen konstant)', 'Vattenångan värms upp'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Värme och temperatur är samma sak.',
                  sant: false, varfor: 'Värme är energi under transport, medan temperatur är ett mått på atomernas genomsnittliga rörelseenergi.' },
                { text: 'Om ett föremål känns kallare än ett annat måste det ha lägre temperatur.',
                  sant: false, varfor: 'Det kan bero på att materialet leder värme bättre, t.ex. känns aluminium kallare än plast trots samma temperatur.' },
                { text: 'Temperaturen ändras inte under en fasövergång som smältning.',
                  sant: true, varfor: 'Energin går åt att bryta eller bilda bindningar, inte till att ändra temperaturen.' },
                { text: 'Den specifika värmekapaciteten är samma för is och flytande vatten.',
                  sant: false, varfor: 'Specifik värmekapacitet varierar även mellan olika tillstånd av samma ämne.' },
                { text: 'Kroppen kyls ner när svett avdunstar från huden.',
                  sant: true, varfor: 'Avdunstning kräver energi, som då tas från huden och kyler den.' },
                { text: 'Värme kan flöda från ett kallare till ett varmare system av sig själv.',
                  sant: false, varfor: 'Enligt termodynamikens andra huvudsats flödar värme alltid från varmt till kallt.' },
                { text: '$0\\ \\mathrm{K}$ motsvarar $-273\\ ^{\\circ}\\mathrm{C}$.',
                  sant: true, varfor: 'Kelvinskalan utgår från absoluta nollpunkten med samma skalsteg som celsiusskalan.' },
                { text: 'Vid blandning av varmt och kallt vatten utan energiförluster är den avgivna energin lika stor som den upptagna.',
                  sant: true, varfor: 'Det är precis energibalansen $E_\\text{avg} = E_\\text{upp}$.' },
            ],
        },
    ],
};

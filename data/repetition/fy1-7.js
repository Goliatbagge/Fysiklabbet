// Repetitionsspel — Fysik nivå 1, kapitel 7: Elektricitet.
// Format och regler: .claude/repetition-brief.md
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-7'] = {
    course: 'Fysik nivå 1',
    courseCode: 'fy1',
    chapter: 'Elektricitet',
    chapterNumber: 7,
    intro: 'Här repeterar du laddning och Coulombs lag, ström/spänning/resistans i kretsar samt elektriska fält och potential.',
    stations: [
        {
            type: 'par',
            title: 'Para ihop storhet och enhet',
            instruktion: 'Dra rätt enhet till varje storhet.',
            pairs: [
                { a: '$Q$ — laddning', b: 'C (coulomb)' },
                { a: '$I$ — ström', b: 'A (ampere)' },
                { a: '$U$ — spänning', b: 'V (volt)' },
                { a: '$R$ — resistans', b: 'Ω (ohm)' },
                { a: '$P$ — elektrisk effekt', b: 'W (watt)' },
                { a: '$\\mathbb{E}$ — elektrisk fältstyrka', b: 'N/C eller V/m' },
                { a: '$\\rho$ — resistivitet', b: 'Ω·m (ohmmeter)' },
            ],
        },
        {
            type: 'lucka',
            title: 'Mätinstrument i en krets',
            instruktion: 'Dra rätt ord/uttryck till varje lucka.',
            formler: [
                { fore: 'En amperemeter kopplas alltid in', efter: 'med komponenten den mäter.', svar: 'i serie' },
                { fore: 'En voltmeter kopplas alltid in', efter: 'med komponenten den mäter.', svar: 'parallellt' },
                { fore: 'För att inte påverka strömmen ska en amperemeter ha', efter: '.', svar: 'låg resistans' },
                { fore: 'För att inte påverka strömmen ska en voltmeter ha', efter: '.', svar: 'hög resistans' },
            ],
            distraktorer: ['hög spänning', 'ingen resistans alls'],
        },
        {
            type: 'sortera',
            title: 'Seriekoppling eller parallellkoppling?',
            instruktion: 'Sortera egenskaperna i rätt låda.',
            bins: [
                { name: 'Seriekoppling', items: ['Samma ström i alla komponenter', 'Delspänningarna summeras till $U$', 'En trasig lampa bryter kretsen', '$R_\\text{tot} = R_1 + R_2$'] },
                { name: 'Parallellkoppling', items: ['Samma spänning över alla komponenter', 'Delströmmarna summeras till $I$', 'Övriga lampor lyser ändå', '$\\dfrac{1}{R_\\text{tot}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$'] },
            ],
        },
        {
            type: 'ordna',
            title: 'Ordna efter total resistans',
            instruktion: 'Ordna kopplingarna från lägst till högst total resistans. Dra brickorna till rätt plats (eller klicka på två för att byta plats) och tryck sedan på Kontrollera.',
            etikettStart: 'lägst resistans',
            etikettSlut: 'högst resistans',
            items: ['Två 10 Ω parallellt', 'En 10 Ω och en 20 Ω parallellt', 'En 10 Ω-resistor', 'Två 10 Ω i serie', 'Tre 10 Ω i serie'],
        },
        {
            type: 'blixt',
            title: 'Sant eller falskt?',
            instruktion: 'Avgör om påståendet stämmer.',
            pastaenden: [
                { text: 'Lika laddningar repellerar varandra.',
                  sant: true, varfor: 'Två laddningar med samma tecken stöter bort varandra enligt Coulombs lag.' },
                { text: 'Den elektriska kraften på den mindre av två laddade kulor är mindre än kraften på den större kulan.',
                  sant: false, varfor: 'Enligt Newtons tredje lag är kraften lika stor på båda kulorna, oavsett hur stora laddningarna är.' },
                { text: 'Strömmens riktning i en krets är samma riktning som elektronerna rör sig.',
                  sant: false, varfor: 'Strömmens riktning definieras från plus till minus — motsatt elektronernas faktiska rörelseriktning.' },
                { text: 'I en seriekoppling är strömmen lika stor genom alla komponenter.',
                  sant: true, varfor: 'Strömmen har bara en väg att ta i en seriekoppling.' },
                { text: 'Om en lampa i en parallellkoppling går sönder slocknar även de andra lamporna.',
                  sant: false, varfor: 'De andra lamporna har fortfarande en sluten väg till batteriet och lyser oförändrat.' },
                { text: 'En amperemeter ska ha hög resistans för att inte påverka strömmen den mäter.',
                  sant: false, varfor: 'En amperemeter ska ha låg resistans eftersom hela strömmen måste passera genom den.' },
                { text: 'Inuti en Faradays bur är det resulterande elektriska fältet noll.',
                  sant: true, varfor: 'Ledningselektronerna omfördelar sig på burens yta och skapar ett motriktat fält som släcker ut det yttre fältet inuti.' },
                { text: 'Millikans oljedroppsförsök visade att laddning kan anta vilket värde som helst.',
                  sant: false, varfor: 'Försöket visade att all laddning är en heltalsmultipel av elementarladdningen $1{,}602 \\cdot 10^{-19}$ C.' },
            ],
        },
    ],
};

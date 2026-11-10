// Fysiklabbet — alla frisläppta nationella prov i de kurser sajten har.
// np.html bygger startvyn ur den här listan: ett avsnitt per kurs, en rad per
// prov, med länk till provet hos utgivaren och (när det finns) till våra
// lösningar steg för steg (data/np/index.js) och videolösningar
// (data/np/videor.js).
//
// ⛔ Proven ligger KVAR hos utgivaren. Vi länkar dit och lägger aldrig upp
// egna kopior av provhäftena: materialet är upphovsrättsskyddat, och
// mappen NP/ hålls lokal (se LOKALA_MAPPAR i .claude/dev-server.py).
//
// Utgivare (kontrollerade 2026-11-10, alla fil-länkar gav 200):
// - Matematik nivå 1 (1b, 1c): PRIM-gruppen, Stockholms universitet. En pdf
//   per delprov (elevhäftena B, C, D), i fältet delar. Proven HT11–HT12
//   finns bara som zip hos PRIM och är därför inte med (önskemål 2026-11-10:
//   proven ska öppnas direkt som pdf, aldrig som zip). Ma 1b VT13 saknar
//   delprov B: PRIM länkar där till Ma 1a-häftet.
// - Matematik nivå 2 och fortsättning (2b, 2c, 3b, 3c, 4): Umeå universitet.
//   En pdf per prov (delprov B–D), filnamnet följer mönstret i `filmall`.
// - Fysik: kursproven finns som bedömningsstöd hos Skolverket. Någon öppen
//   provlista finns inte, så bara proven vi har lösningar till listas.
//
// Fält per prov: t = termin ('vt22', 'ht16'), delar = { B, C, D } (pdf per
// delprov), fil = full adress till en enda pdf (annars
// byggs den ur kursens filmall), losning = prov-id i data/np/index.js.
// Ordning: nyast först. Bara proven från våren 2022 följer aktuell ämnesplan.

(function () {
    var SU = 'https://www.su.se';
    var PRIM = { namn: 'PRIM-gruppen, Stockholms universitet',
        url: 'https://www.su.se/primgruppen/nationella-prov/niv%C3%A5-1-kurs-1-1.587762' };
    var UMU = { namn: 'Umeå universitet',
        url: 'https://www.umu.se/npma/tidigare-givna-prov/' };
    var SKOLVERKET = { namn: 'Skolverket (bedömningsstöd i fysik)',
        url: 'https://www.umu.se/institutionen-for-tillampad-utbildningsvetenskap/np/bs/fysik/' };
    var UMU_PDF = 'https://arkiv.edusci.umu.se/np/np-2-4-prov/';

    function umuTerminer(fran) {
        // Umeås serie: vt22, vt18, ht17, vt17 … ner till `fran`.
        var alla = ['vt22', 'vt18', 'ht17', 'vt17', 'ht16', 'vt16', 'ht15', 'vt15',
            'ht14', 'vt14', 'ht13', 'vt13', 'ht12', 'vt12'];
        return alla.slice(0, alla.indexOf(fran) + 1).map(function (t) { return { t: t }; });
    }
    function losning(lista, karta) {
        lista.forEach(function (p) { if (karta[p.t]) p.losning = karta[p.t]; });
        return lista;
    }

    window.NP_FRISLAPPTA = [
        {
            amne: 'matematik', kurs: 'Matematik nivå 1b', kort: 'Ma 1b', kod: 'ma1b',
            kalla: PRIM, format: 'pdf',
            prov: [
                { t: 'vt22', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8262a/1759930385489/Ma1b%20VT22%20Delprov%20BVT%202022%20Ma%201b_Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8262b/1759930385596/Ma1b%20VT22%20Delprov%20CVT%202022%20Ma%201b_Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8262c/1759930385762/Ma1b%20VT22%20Delprov%20DVT%202022%20Ma%201b_Delprov%20D.pdf',
                } },
                { t: 'vt17', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8262d/1759930385910/KPVT%202017%20Ma%201b%20Delprov%20BKPVT%202017%20Ma%201b%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8262e/1759930386164/KPVT%202017%20Ma%201b%20Delprov%20CKPVT%202017%20Ma%201b%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8262f/1759930386271/KPVT%202017%20Ma%201b%20Delprov%20DKPVT%202017%20Ma%201b%20Delprov%20D.pdf',
                } },
                { t: 'ht16', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82630/1759930386342/Ma1b%20HT16%20Delprov%20BHT16_Delprov%20B%201b.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82631/1759930386425/Ma1b%20HT16%20Delprov%20CHT16_Delprov%20C%201b.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82632/1759930386513/Ma1b%20HT16%20Delprov%20DHT16_Delprov%20D%201b.pdf',
                } },
                { t: 'vt16', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82633/1759930386667/Ma1b%20VT16%20Delprov%20BKPVT%202016%20Ma%201b%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82634/1759930386819/Ma1b%20VT16%20Delprov%20CKPVT%202016%20Ma%201b%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82635/1759930387147/Ma1b%20VT16%20Delprov%20DKPVT%202016%20Ma%201b%20Delprov%20D.pdf',
                } },
                { t: 'ht15', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82636/1759930387594/Ma1b%20HT15%20Delprov%20BKPHT%202015%20Ma%201b%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82637/1759930387738/Ma1b%20HT15%20Delprov%20CKPHT%202015%20Ma%201b%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82638/1759930387913/Ma1b%20HT15%20Delprov%20DKPHT%202015%20Ma%201b%20Delprov%20D.pdf',
                } },
                { t: 'vt15', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82639/1759930388323/Ma1b%20VT15%20Delprov%20BKPVT%202015%20Ma%201b%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8263a/1759930388549/Ma1b%20VT15%20Delprov%20CKPVT%202015%20Ma%201b%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8263b/1759930388715/Ma1b%20VT15%20Delprov%20DKPVT%202015%20Ma%201b%20Delprov%20D.pdf',
                } },
                { t: 'ht14', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8263c/1759930388997/Ma1b%20HT14%20Delprov%20BProvh%C3%A4fte%20Delprov%20B%201b%20ht14_.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8263d/1759930389126/Ma1b%20HT14%20Delprov%20CProvh%C3%A4fte%20Delprov%20C%201b%20ht14.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8263e/1759930389235/Ma1b%20HT14%20Delprov%20DProvh%C3%A4fte%20Delprov%20D%201b%20ht14_.pdf',
                } },
                { t: 'vt14', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8263f/1759930389456/Ma1b%20VT14%20Delprov%20BProvh%C3%A4fte%20Del%20B%201b%20VT14.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82640/1759930389723/Ma1b%20VT14%20Delprov%20CProvh%C3%A4fte%20Del%20C%201b%20vt14.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82641/1759930389811/Ma1b%20VT14%20Delprov%20DProvh%C3%A4fte%20Del%20D%201b%20vt14.pdf',
                } },
                { t: 'ht13', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82642/1759930389881/Ma1b%20HT13%20Delprov%20BProvh%C3%A4fte%20Del%20B%201b%20HT13.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82643/1759930389966/Ma1b%20HT13%20Delprov%20CProvh%C3%A4fte%20Del%20C%201b%20ht13.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82644/1759930390063/Ma1b%20HT13%20Delprov%20DProvh%C3%A4fte%20Del%20D%201b%20ht13.pdf',
                } },
                { t: 'vt13', delar: {
                    C: SU + '/download/18.2b7477cb199a332c2a82645/1759930390165/Ma1b%20VT13%20Delprov%20CProvh%C3%A4fte%20Del%20C%201b.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82646/1759930390282/Ma1b%20VT13%20Delprov%20DProvh%C3%A4fte%20Del%20D%201b.pdf',
                } },
            ],
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 1c', kort: 'Ma 1c', kod: 'ma1c',
            kalla: PRIM, format: 'pdf',
            prov: losning([
                { t: 'vt22', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82647/1759930390468/Ma1c%20VT22%20Delprov%20BVT%202022%20Ma%201c_Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82648/1759930390574/Ma1c%20VT22%20Delprov%20CVT%202022%20Ma%201c_Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82649/1759930390719/Ma1c%20VT22%20Delprov%20DVT%202022%20Ma%201c_Delprov%20D_230907.pdf',
                } },
                { t: 'vt17', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8264a/1759930390880/KPVT%202017%20Ma%201c%20Delprov%20BKPVT%202017%20Ma%201c%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8264b/1759930391047/KPVT%202017%20Ma%201c%20Delprov%20CKPVT%202017%20Ma%201c%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8264c/1759930391151/KPVT%202017%20Ma%201c%20Delprov%20DKPVT%202017%20Ma%201c%20Delprov%20D.pdf',
                } },
                { t: 'ht16', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8264d/1759930391222/Ma1c%20HT16%20Delprov%20BHT16_Delprov%20B%201c.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8264e/1759930391314/Ma1c%20HT16%20Delprov%20CHT16_Delprov%20C%201c.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8264f/1759930391400/Ma1c%20HT16%20Delprov%20DHT16_Delprov%20D%201c.pdf',
                } },
                { t: 'vt16', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82650/1759930391524/Ma1c%20VT16%20Delprov%20BKPVT%202016%20Ma%201c%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82651/1759930391687/Ma1c%20VT16%20Delprov%20CKPVT%202016%20Ma%201c%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82652/1759930392096/Ma1c%20VT16%20Delprov%20DKPVT%202016%20Ma%201c%20Delprov%20D.pdf',
                } },
                { t: 'ht15', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82653/1759930392602/Ma1c%20HT15%20Delprov%20BKPHT%202015%20Ma%201c%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82654/1759930392733/Ma1c%20HT15%20Delprov%20CKPHT%202015%20Ma%201c%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82655/1759930392920/Ma1c%20HT15%20Delprov%20DKPHT%202015%20Ma%201c%20Delprov%20D.pdf',
                } },
                { t: 'vt15', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82656/1759930393332/Ma1c%20VT15%20Delprov%20BKPVT%202015%20Ma%201c%20Delprov%20B.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82657/1759930393544/Ma1c%20VT15%20Delprov%20CKPVT%202015%20Ma%201c%20Delprov%20C.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82658/1759930393737/Ma1c%20VT15%20Delprov%20DKPVT%202015%20Ma%201c%20Delprov%20D.pdf',
                } },
                { t: 'ht14', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82659/1759930393971/Ma1c%20HT14%20Delprov%20BProvh%C3%A4fte%20Delprov%20B%201c%20ht14_.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8265a/1759930394128/Ma1c%20HT14%20Delprov%20CProvh%C3%A4fte%20Delprov%20C%201c%20ht14.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8265b/1759930394259/Ma1c%20HT14%20Delprov%20DProvh%C3%A4fte%20Delprov%20D%201c%20ht14_.pdf',
                } },
                { t: 'vt14', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8265c/1759930394402/Ma1c%20VT14%20Delprov%20BProvh%C3%A4fte%20Del%20B%201c%20VT14.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a8265d/1759930394565/Ma1c%20VT14%20Delprov%20CProvh%C3%A4fte%20Del%20C%201c%20vt14.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a8265e/1759930394638/Ma1c%20VT14%20Delprov%20DProvh%C3%A4fte%20Del%20D%201c%20vt14.pdf',
                } },
                { t: 'ht13', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a8265f/1759930394715/Ma1c%20HT13%20Delprov%20BProvh%C3%A4fte%20Del%20B%201c%20HT13.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82660/1759930394796/Ma1c%20HT13%20Delprov%20CProvh%C3%A4fte%20Del%20C%201c%20ht13.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82661/1759930394907/Ma1c%20HT13%20Delprov%20DProvh%C3%A4fte%20Del%20D%201c%20ht13.pdf',
                } },
                { t: 'vt13', delar: {
                    B: SU + '/download/18.2b7477cb199a332c2a82662/1759930395102/Ma1c%20VT13%20Delprov%20BProvh%C3%A4fte%20Del%20B%201c.pdf',
                    C: SU + '/download/18.2b7477cb199a332c2a82663/1759930395290/Ma1c%20VT13%20Delprov%20CProvh%C3%A4fte%20Del%20C%201c.pdf',
                    D: SU + '/download/18.2b7477cb199a332c2a82664/1759930395389/Ma1c%20VT13%20Delprov%20DProvh%C3%A4fte%20Del%20D%201c.pdf',
                } },
            ], { 'vt22': 'ma1c-vt2022', 'vt17': 'ma1c-vt2017', 'ht16': 'ma1c-ht2016' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 2b', kort: 'Ma 2b', kod: 'ma2b',
            kalla: UMU, format: 'pdf', filmall: UMU_PDF + 'Ma2b-{t}.pdf',
            prov: umuTerminer('vt12'),
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 2c', kort: 'Ma 2c', kod: 'ma2c',
            kalla: UMU, format: 'pdf', filmall: UMU_PDF + 'Ma2c-{t}.pdf',
            prov: losning(umuTerminer('vt12'), { vt22: 'ma2c-vt2022', vt18: 'ma2c-vt2018' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik fortsättning nivå 1b', kort: 'Ma 3b', kod: 'ma3b',
            kalla: UMU, format: 'pdf', filmall: UMU_PDF + 'Ma3b-{t}.pdf',
            prov: umuTerminer('ht12'),
        },
        {
            amne: 'matematik', kurs: 'Matematik fortsättning nivå 1c', kort: 'Ma 3c', kod: 'ma3c',
            kalla: UMU, format: 'pdf', filmall: UMU_PDF + 'Ma3c-{t}.pdf',
            prov: losning(umuTerminer('ht12'), { vt22: 'ma3c-vt2022', vt18: 'ma3c-vt2018' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik fortsättning nivå 2', kort: 'Ma 4', kod: 'ma4',
            kalla: UMU, format: 'pdf', filmall: UMU_PDF + 'Ma4-{t}.pdf',
            prov: losning(umuTerminer('vt13'), { vt22: 'ma4-vt2022', vt18: 'ma4-vt2018' }),
        },
        {
            amne: 'fysik', kurs: 'Fysik nivå 1', kort: 'Fy 1', kod: 'fy1', kursprov: true,
            kalla: SKOLVERKET,
            prov: [{ t: 'vt17', losning: 'fy1-vt2017' }],
        },
        {
            amne: 'fysik', kurs: 'Fysik nivå 2', kort: 'Fy 2', kod: 'fy2', kursprov: true,
            kalla: SKOLVERKET,
            prov: [{ t: 'vt16', losning: 'fy2-vt2016' }],
        },
    ];
})();

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
// - Matematik nivå 1 (1b, 1c): PRIM-gruppen, Stockholms universitet. En zip
//   per prov med delprov, bedömningsanvisningar och engelsk version.
// - Matematik nivå 2 och fortsättning (2b, 2c, 3b, 3c, 4): Umeå universitet.
//   En pdf per prov (delprov B–D), filnamnet följer mönstret i `filmall`.
// - Fysik: kursproven finns som bedömningsstöd hos Skolverket. Någon öppen
//   provlista finns inte, så bara proven vi har lösningar till listas.
//
// Fält per prov: t = termin ('vt22', 'ht16'), fil = full adress (annars
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
            kalla: PRIM, format: 'zip',
            prov: [
                { t: 'vt22', fil: SU + '/download/18.2dd14ace199c907e2a83764/1760618633630/Ma%201b%20VT%202022.zip' },
                { t: 'vt17', fil: SU + '/download/18.2dd14ace199c907e2a83765/1760618651778/Ma%201b%20VT%202017%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'ht16', fil: SU + '/download/18.2dd14ace199c907e2a83766/1760618663849/Ma%201b%20HT2016.zip' },
                { t: 'vt16', fil: SU + '/download/18.2dd14ace199c907e2a83767/1760618678193/Ma%201b%20VT%202016%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'ht15', fil: SU + '/download/18.2dd14ace199c907e2a83768/1760618696182/Ma%201b%20HT%202015%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'vt15', fil: SU + '/download/18.2dd14ace199c907e2a83769/1760618716618/Ma%201b%20VT%202015%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'ht14', fil: SU + '/download/18.2dd14ace199c907e2a8376a/1760618732934/Ma%201b%20HT2014.zip' },
                { t: 'vt14', fil: SU + '/download/18.2dd14ace199c907e2a8376b/1760618748378/Ma%201b%20VT2014.zip' },
                { t: 'ht13', fil: SU + '/download/18.2dd14ace199c907e2a8376c/1760618762500/Ma%201b%20HT2013.zip' },
                { t: 'vt13', fil: SU + '/download/18.2dd14ace199c907e2a8376d/1760618777821/Ma%201b%20VT2013.zip' },
                { t: 'ht12', fil: SU + '/download/18.2dd14ace199c907e2a8376e/1760618795490/Ma%201b%20HT2012.zip' },
                { t: 'vt12', fil: SU + '/download/18.2dd14ace199c907e2a8376f/1760618812691/Ma%201b%20VT2012.zip' },
            ],
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 1c', kort: 'Ma 1c', kod: 'ma1c',
            kalla: PRIM, format: 'zip',
            prov: losning([
                { t: 'vt22', fil: SU + '/download/18.2dd14ace199c907e2a83770/1760618868593/Ma%201c%20VT%202022.zip' },
                { t: 'vt17', fil: SU + '/download/18.2dd14ace199c907e2a83771/1760618881472/Ma%201c%20VT%202017%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'ht16', fil: SU + '/download/18.2dd14ace199c907e2a83772/1760618894512/Ma%201c%20HT2016.zip' },
                { t: 'vt16', fil: SU + '/download/18.39dc5cbc19afcf09c0019cf/1765443107698/Ma%201c%20VT%202016%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'ht15', fil: SU + '/download/18.39dc5cbc19afcf09c0019d5/1765443151473/Ma%201c%20HT%202015%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'vt15', fil: SU + '/download/18.2dd14ace199c907e2a83779/1760619143499/Ma%201c%20VT%202015%20(Hela%20materialet%20inklusive%20engelsk%20version).zip' },
                { t: 'ht14', fil: SU + '/download/18.2dd14ace199c907e2a8377a/1760619160858/Ma%201c%20HT%202014.zip' },
                { t: 'vt14', fil: SU + '/download/18.2dd14ace199c907e2a8377b/1760619177757/Ma%201c%20VT%202014.zip' },
                { t: 'ht13', fil: SU + '/download/18.2dd14ace199c907e2a8377c/1760619194595/Ma%201c%20HT%202013.zip' },
                { t: 'vt13', fil: SU + '/download/18.2dd14ace199c907e2a8377d/1760619212542/Ma%201c%20VT%202013.zip' },
                { t: 'ht12', fil: SU + '/download/18.2dd14ace199c907e2a8377e/1760619228548/Ma%201c%20HT%202012.zip' },
                { t: 'vt12', fil: SU + '/download/18.2dd14ace199c907e2a8377f/1760619243673/Ma%201c%20VT%202012.zip' },
                { t: 'ht11', fil: SU + '/download/18.2dd14ace199c907e2a83780/1760619255843/Ma%201c%20HT%202011.zip' },
            ], { vt22: 'ma1c-vt2022', vt17: 'ma1c-vt2017', ht16: 'ma1c-ht2016' }),
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

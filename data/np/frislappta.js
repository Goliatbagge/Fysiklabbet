// Fysiklabbet — alla frisläppta nationella prov i de kurser sajten har.
// np.html bygger startvyn ur den här listan: ett avsnitt per kurs, en rad per
// prov, med länk till provet hos utgivaren och (när det finns) till våra
// lösningar steg för steg (data/np/index.js) och videolösningar
// (data/np/videor.js).
//
// Pdf:erna ligger i ett eget repo, Goliatbagge/fysiklabbet-np, med egen
// GitHub Pages-adress (beslut 2026-11-10: länkarna ska gå till oss, inte till
// utgivarna, ifall deras sidor tas ned). Huvudsajten är nära GitHub Pages
// gräns på 1 GB, därför inte här. Filerna är hämtade från utgivarna; Umeås
// är klippta till elevdelarna och bilderna nedskalade. Nytt prov: lägg pdf:en
// i fysiklabbet-np/pdf/ med samma namnmönster och pusha det repot.
//
// Utgivare (kontrollerade 2026-11-10, alla fil-länkar gav 200):
// - Matematik nivå 1 (1a, 1b, 1c): PRIM-gruppen, Stockholms universitet. En pdf
//   per delprov (elevhäftena B, C, D), i fältet delar. HT11 och VT12 hade
//   delproven Del I, II och III. Proven HT11–HT12 och Ma 1b VT13 delprov B
//   finns bara som zip hos PRIM; de är tagna ur den lokala mappen NP/.
// - Matematik nivå 2 och fortsättning (2a, 2b, 2c, 3b, 3c, 4): Umeå universitet.
//   En pdf per prov (delprov B–D), filnamnet följer mönstret i `filmall`.
// - Fysik: kursproven finns som bedömningsstöd hos Skolverket. Någon öppen
//   provlista finns inte, så bara proven vi har lösningar till listas.
//
// Fält per prov: t = termin ('vt22', 'ht16'), delar = { B, C, D } (pdf per
// delprov), fil = full adress till en enda pdf (annars
// byggs den ur kursens filmall), losning = prov-id i data/np/index.js.
// Ordning: nyast först. Bara proven från våren 2022 följer aktuell ämnesplan.

(function () {
    var PRIM = { namn: 'PRIM-gruppen, Stockholms universitet',
        url: 'https://www.su.se/primgruppen/nationella-prov/niv%C3%A5-1-kurs-1-1.587762' };
    var UMU = { namn: 'Umeå universitet',
        url: 'https://www.umu.se/npma/tidigare-givna-prov/' };
    var SKOLVERKET = { namn: 'Skolverket (bedömningsstöd i fysik)',
        url: 'https://www.umu.se/institutionen-for-tillampad-utbildningsvetenskap/np/bs/fysik/' };
    // Pdf:erna ligger i repot Goliatbagge/fysiklabbet-np (egen GitHub Pages-
    // adress, så att huvudsajten håller sig under gränsen på 1 GB). Umeås
    // filer är klippta till elevdelarna (utan bedömningsanvisningar).
    var EGEN = 'https://goliatbagge.github.io/fysiklabbet-np/pdf/';

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
            amne: 'matematik', kurs: 'Matematik nivå 1a', kort: 'Matematik 1a', kod: 'ma1a',
            kalla: PRIM, format: 'pdf',
            prov: [
                { t: 'vt22', delar: {
                    B: EGEN + 'ma1a-vt22-delprov-b.pdf',
                    C: EGEN + 'ma1a-vt22-delprov-c.pdf',
                    D: EGEN + 'ma1a-vt22-delprov-d.pdf',
                } },
                { t: 'vt17', delar: {
                    B: EGEN + 'ma1a-vt17-delprov-b.pdf',
                    C: EGEN + 'ma1a-vt17-delprov-c.pdf',
                    D: EGEN + 'ma1a-vt17-delprov-d.pdf',
                } },
                { t: 'ht16', delar: {
                    B: EGEN + 'ma1a-ht16-delprov-b.pdf',
                    C: EGEN + 'ma1a-ht16-delprov-c.pdf',
                    D: EGEN + 'ma1a-ht16-delprov-d.pdf',
                } },
                { t: 'vt16', delar: {
                    B: EGEN + 'ma1a-vt16-delprov-b.pdf',
                    C: EGEN + 'ma1a-vt16-delprov-c.pdf',
                    D: EGEN + 'ma1a-vt16-delprov-d.pdf',
                } },
                { t: 'ht15', delar: {
                    B: EGEN + 'ma1a-ht15-delprov-b.pdf',
                    C: EGEN + 'ma1a-ht15-delprov-c.pdf',
                    D: EGEN + 'ma1a-ht15-delprov-d.pdf',
                } },
                { t: 'vt15', delar: {
                    B: EGEN + 'ma1a-vt15-delprov-b.pdf',
                    C: EGEN + 'ma1a-vt15-delprov-c.pdf',
                    D: EGEN + 'ma1a-vt15-delprov-d.pdf',
                } },
                { t: 'ht14', delar: {
                    B: EGEN + 'ma1a-ht14-delprov-b.pdf',
                    C: EGEN + 'ma1a-ht14-delprov-c.pdf',
                    D: EGEN + 'ma1a-ht14-delprov-d.pdf',
                } },
                { t: 'vt14', delar: {
                    B: EGEN + 'ma1a-vt14-delprov-b.pdf',
                    C: EGEN + 'ma1a-vt14-delprov-c.pdf',
                    D: EGEN + 'ma1a-vt14-delprov-d.pdf',
                } },
                { t: 'ht13', delar: {
                    B: EGEN + 'ma1a-ht13-delprov-b.pdf',
                    C: EGEN + 'ma1a-ht13-delprov-c.pdf',
                    D: EGEN + 'ma1a-ht13-delprov-d.pdf',
                } },
                { t: 'vt13', delar: {
                    B: EGEN + 'ma1a-vt13-delprov-b.pdf',
                    C: EGEN + 'ma1a-vt13-delprov-c.pdf',
                    D: EGEN + 'ma1a-vt13-delprov-d.pdf',
                } },
                { t: 'ht12', delar: {
                    B: EGEN + 'ma1a-ht12-delprov-b.pdf',
                    C: EGEN + 'ma1a-ht12-delprov-c.pdf',
                    D: EGEN + 'ma1a-ht12-delprov-d.pdf',
                } },
                { t: 'vt12', delar: {
                    'I': EGEN + 'ma1a-vt12-del-1.pdf',
                    'II': EGEN + 'ma1a-vt12-del-2.pdf',
                    'III': EGEN + 'ma1a-vt12-del-3.pdf',
                } },
            ],
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 1b', kort: 'Matematik 1b', kod: 'ma1b',
            kalla: PRIM, format: 'pdf',
            prov: [
                { t: 'vt22', losning: 'ma1b-vt2022', delar: {
                    B: EGEN + 'ma1b-vt22-delprov-b.pdf',
                    C: EGEN + 'ma1b-vt22-delprov-c.pdf',
                    D: EGEN + 'ma1b-vt22-delprov-d.pdf',
                } },
                { t: 'vt17', delar: {
                    B: EGEN + 'ma1b-vt17-delprov-b.pdf',
                    C: EGEN + 'ma1b-vt17-delprov-c.pdf',
                    D: EGEN + 'ma1b-vt17-delprov-d.pdf',
                } },
                { t: 'ht16', delar: {
                    B: EGEN + 'ma1b-ht16-delprov-b.pdf',
                    C: EGEN + 'ma1b-ht16-delprov-c.pdf',
                    D: EGEN + 'ma1b-ht16-delprov-d.pdf',
                } },
                { t: 'vt16', delar: {
                    B: EGEN + 'ma1b-vt16-delprov-b.pdf',
                    C: EGEN + 'ma1b-vt16-delprov-c.pdf',
                    D: EGEN + 'ma1b-vt16-delprov-d.pdf',
                } },
                { t: 'ht15', delar: {
                    B: EGEN + 'ma1b-ht15-delprov-b.pdf',
                    C: EGEN + 'ma1b-ht15-delprov-c.pdf',
                    D: EGEN + 'ma1b-ht15-delprov-d.pdf',
                } },
                { t: 'vt15', delar: {
                    B: EGEN + 'ma1b-vt15-delprov-b.pdf',
                    C: EGEN + 'ma1b-vt15-delprov-c.pdf',
                    D: EGEN + 'ma1b-vt15-delprov-d.pdf',
                } },
                { t: 'ht14', delar: {
                    B: EGEN + 'ma1b-ht14-delprov-b.pdf',
                    C: EGEN + 'ma1b-ht14-delprov-c.pdf',
                    D: EGEN + 'ma1b-ht14-delprov-d.pdf',
                } },
                { t: 'vt14', delar: {
                    B: EGEN + 'ma1b-vt14-delprov-b.pdf',
                    C: EGEN + 'ma1b-vt14-delprov-c.pdf',
                    D: EGEN + 'ma1b-vt14-delprov-d.pdf',
                } },
                { t: 'ht13', delar: {
                    B: EGEN + 'ma1b-ht13-delprov-b.pdf',
                    C: EGEN + 'ma1b-ht13-delprov-c.pdf',
                    D: EGEN + 'ma1b-ht13-delprov-d.pdf',
                } },
                { t: 'vt13', delar: {
                    B: EGEN + 'ma1b-vt13-delprov-b.pdf',
                    C: EGEN + 'ma1b-vt13-delprov-c.pdf',
                    D: EGEN + 'ma1b-vt13-delprov-d.pdf',
                } },
                { t: 'ht12', delar: {
                    B: EGEN + 'ma1b-ht12-delprov-b.pdf',
                    C: EGEN + 'ma1b-ht12-delprov-c.pdf',
                    D: EGEN + 'ma1b-ht12-delprov-d.pdf',
                } },
                { t: 'vt12', delar: {
                    'I': EGEN + 'ma1b-vt12-del-1.pdf',
                    'II': EGEN + 'ma1b-vt12-del-2.pdf',
                    'III': EGEN + 'ma1b-vt12-del-3.pdf',
                } },
            ],
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 1c', kort: 'Matematik 1c', kod: 'ma1c',
            kalla: PRIM, format: 'pdf',
            prov: losning([
                { t: 'vt22', delar: {
                    B: EGEN + 'ma1c-vt22-delprov-b.pdf',
                    C: EGEN + 'ma1c-vt22-delprov-c.pdf',
                    D: EGEN + 'ma1c-vt22-delprov-d.pdf',
                } },
                { t: 'vt17', delar: {
                    B: EGEN + 'ma1c-vt17-delprov-b.pdf',
                    C: EGEN + 'ma1c-vt17-delprov-c.pdf',
                    D: EGEN + 'ma1c-vt17-delprov-d.pdf',
                } },
                { t: 'ht16', delar: {
                    B: EGEN + 'ma1c-ht16-delprov-b.pdf',
                    C: EGEN + 'ma1c-ht16-delprov-c.pdf',
                    D: EGEN + 'ma1c-ht16-delprov-d.pdf',
                } },
                { t: 'vt16', delar: {
                    B: EGEN + 'ma1c-vt16-delprov-b.pdf',
                    C: EGEN + 'ma1c-vt16-delprov-c.pdf',
                    D: EGEN + 'ma1c-vt16-delprov-d.pdf',
                } },
                { t: 'ht15', delar: {
                    B: EGEN + 'ma1c-ht15-delprov-b.pdf',
                    C: EGEN + 'ma1c-ht15-delprov-c.pdf',
                    D: EGEN + 'ma1c-ht15-delprov-d.pdf',
                } },
                { t: 'vt15', delar: {
                    B: EGEN + 'ma1c-vt15-delprov-b.pdf',
                    C: EGEN + 'ma1c-vt15-delprov-c.pdf',
                    D: EGEN + 'ma1c-vt15-delprov-d.pdf',
                } },
                { t: 'ht14', delar: {
                    B: EGEN + 'ma1c-ht14-delprov-b.pdf',
                    C: EGEN + 'ma1c-ht14-delprov-c.pdf',
                    D: EGEN + 'ma1c-ht14-delprov-d.pdf',
                } },
                { t: 'vt14', delar: {
                    B: EGEN + 'ma1c-vt14-delprov-b.pdf',
                    C: EGEN + 'ma1c-vt14-delprov-c.pdf',
                    D: EGEN + 'ma1c-vt14-delprov-d.pdf',
                } },
                { t: 'ht13', delar: {
                    B: EGEN + 'ma1c-ht13-delprov-b.pdf',
                    C: EGEN + 'ma1c-ht13-delprov-c.pdf',
                    D: EGEN + 'ma1c-ht13-delprov-d.pdf',
                } },
                { t: 'vt13', delar: {
                    B: EGEN + 'ma1c-vt13-delprov-b.pdf',
                    C: EGEN + 'ma1c-vt13-delprov-c.pdf',
                    D: EGEN + 'ma1c-vt13-delprov-d.pdf',
                } },
                { t: 'ht12', delar: {
                    B: EGEN + 'ma1c-ht12-delprov-b.pdf',
                    C: EGEN + 'ma1c-ht12-delprov-c.pdf',
                    D: EGEN + 'ma1c-ht12-delprov-d.pdf',
                } },
                { t: 'vt12', delar: {
                    'I': EGEN + 'ma1c-vt12-del-1.pdf',
                    'II': EGEN + 'ma1c-vt12-del-2.pdf',
                    'III': EGEN + 'ma1c-vt12-del-3.pdf',
                } },
                { t: 'ht11', delar: {
                    'I': EGEN + 'ma1c-ht11-del-1.pdf',
                    'II': EGEN + 'ma1c-ht11-del-2.pdf',
                    'III': EGEN + 'ma1c-ht11-del-3.pdf',
                } },
            ], { 'vt22': 'ma1c-vt2022', 'vt17': 'ma1c-vt2017', 'ht16': 'ma1c-ht2016' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 2a', kort: 'Matematik 2a', kod: 'ma2a',
            kalla: UMU, format: 'pdf', filmall: EGEN + 'ma2a-{t}.pdf',
            prov: umuTerminer('ht12'),
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 2b', kort: 'Matematik 2b', kod: 'ma2b',
            kalla: UMU, format: 'pdf', filmall: EGEN + 'ma2b-{t}.pdf',
            prov: losning(umuTerminer('vt12'), { vt22: 'ma2b-vt2022' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik nivå 2c', kort: 'Matematik 2c', kod: 'ma2c',
            kalla: UMU, format: 'pdf', filmall: EGEN + 'ma2c-{t}.pdf',
            prov: losning(umuTerminer('vt12'), { vt22: 'ma2c-vt2022', vt18: 'ma2c-vt2018' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik fortsättning nivå 1b', kort: 'Matematik 3b', kod: 'ma3b',
            kalla: UMU, format: 'pdf', filmall: EGEN + 'ma3b-{t}.pdf',
            prov: losning(umuTerminer('ht12'), { vt22: 'ma3b-vt2022' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik fortsättning nivå 1c', kort: 'Matematik 3c', kod: 'ma3c',
            kalla: UMU, format: 'pdf', filmall: EGEN + 'ma3c-{t}.pdf',
            prov: losning(umuTerminer('ht12'), { vt22: 'ma3c-vt2022', vt18: 'ma3c-vt2018' }),
        },
        {
            amne: 'matematik', kurs: 'Matematik fortsättning nivå 2', kort: 'Matematik 4', kod: 'ma4',
            kalla: UMU, format: 'pdf', filmall: EGEN + 'ma4-{t}.pdf',
            prov: losning(umuTerminer('vt13'), { vt22: 'ma4-vt2022', vt18: 'ma4-vt2018' }),
        },
        {
            amne: 'fysik', kurs: 'Fysik nivå 1', kort: 'Fysik 1', kod: 'fy1', kursprov: true,
            kalla: SKOLVERKET,
            prov: [{ t: 'vt17', losning: 'fy1-vt2017' }],
        },
        {
            amne: 'fysik', kurs: 'Fysik nivå 2', kort: 'Fysik 2', kod: 'fy2', kursprov: true,
            kalla: SKOLVERKET,
            prov: [{ t: 'vt16', losning: 'fy2-vt2016' }],
        },
    ];
})();

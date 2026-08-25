// Fysiklabbet — index över nationella prov med steg-för-steg-lösningar.
// Varje post pekar på ett prov i window.NP_PROV (laddas från egen fil).
//
// dold: true  → provet visas INTE i listan på np.html och tas inte med i
// sitemap.xml (loadProv() i data/build-nyheter-og.js filtrerar bort det).
// Provets data laddas fortfarande, så djuplänken np.html#<id> fungerar för
// den som har adressen. Ta bort raden `dold: true` för att publicera igen —
// kör därefter `node data/build-nyheter-og.js` så kommer provet tillbaka i
// sitemapen (och lägg tillbaka raden i "Senaste uppdateringar" i index.html
// om den är bortkommenterad).
window.NP_INDEX = [
    {
        id: 'ma1c-vt2022',
        kurs: 'Matematik nivå 1c',
        namn: 'Nationellt prov, våren 2022',
        meta: '31 uppgifter · Delprov B, C och D · Lösningar steg för steg',
    },
    {
        id: 'ma1c-vt2017',
        kurs: 'Matematik nivå 1c',
        namn: 'Nationellt prov, våren 2017',
        meta: '27 uppgifter · Delprov B, C och D · Lösningar steg för steg',
    },
    {
        id: 'ma1c-ht2016',
        kurs: 'Matematik nivå 1c',
        namn: 'Nationellt prov, hösten 2016',
        meta: '28 uppgifter · Delprov B, C och D · Lösningar steg för steg',
    },
    {
        id: 'ma3c-vt2022',
        kurs: 'Matematik fortsättning nivå 1c',
        namn: 'Nationellt prov, våren 2022',
        meta: '28 uppgifter · Delprov B, C och D · Lösningar steg för steg',
    },
    {
        id: 'fy2-vt2016',
        kurs: 'Fysik nivå 2',
        namn: 'Kursprov, våren 2016',
        meta: '19 uppgifter · Delprov A (teoriuppgifter) · Lösningar steg för steg',
    },
];

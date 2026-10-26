/* i18n/nb/sidor/fysik2-lenz-lag-app.js — norska (bokmål) för simuleringen
 * Inducerad ström och Lenz lag. */
(function () {
    I18N.add({
        // ---- Sidhuvud och metadata ----
        'Inducerad ström och Lenz lag — Fysiklabbet': 'Indusert strøm og Lenz’ lov — Fysiklabbet',
        'Inducerad ström och Lenz lag — Fysik nivå 2': 'Indusert strøm og Lenz’ lov — Fysikk nivå 2',
        'Ta tag i stavmagneten och närma dig eller avlägsna dig från slingan — galvanometern ger utslag åt olika håll, och strömmen får enligt Lenz lag alltid en riktning som motverkar orsaken. Jämför magnetens fält med slingans inducerade fält, byt pol och se kraften som bromsar magneten.':
            'Ta tak i stavmagneten og før den mot eller bort fra sløyfen. Galvanometeret gir utslag til hver sin side, og ifølge Lenz’ lov får strømmen alltid en retning som motvirker årsaken. Sammenlign magnetens felt med det induserte feltet i sløyfen, bytt pol og se kraften som bremser magneten.',
        '/ Inducerad ström och Lenz lag': '/ Indusert strøm og Lenz’ lov',
        'Inducerad ström och Lenz lag': 'Indusert strøm og Lenz’ lov',

        // ---- Ingressen ----
        'Ta tag i stavmagneten och': 'Ta tak i stavmagneten og',
        'närma dig eller avlägsna dig från slingan': 'før den mot eller bort fra sløyfen',
        '. När magnetfältet genom slingan ändras induceras en ström — och enligt':
            '. Når magnetfeltet gjennom sløyfen endres, induseres det en strøm, og ifølge',
        'Lenz lag': 'Lenz’ lov',
        'får den en riktning som': 'får den en retning som',
        'motverkar orsaken': 'motvirker årsaken',
        ': slingans eget magnetfält motverkar ändringen av flödet. Titta på galvanometern: utslag åt ena hållet när magneten närmar sig, åt andra hållet när den dras bort — och inget utslag alls när magneten är stilla.':
            ': sløyfens eget magnetfelt motvirker endringen av fluksen. Se på galvanometeret: utslag til den ene siden når magneten nærmer seg, til den andre siden når den trekkes bort, og ikke noe utslag i det hele tatt når magneten står stille.',

        // ---- Formelkortet ----
        'En inducerad ström får en sådan riktning att': 'En indusert strøm får en slik retning at',
        'orsaken till dess uppkomst motverkas': 'årsaken til at den oppstår, motvirkes',
        'Inducerad ström': 'Indusert strøm',
        'Inducerad spänning': 'Indusert spenning',
        'Resistans': 'Resistans',
        '(Ohms lag)': '(Ohms lov)',

        // ---- Scenen ----
        'magnetens fält': 'magnetens felt',
        'slingans inducerade fält': 'sløyfens induserte felt',
        'galvanometer': 'galvanometer',
        'slinga': 'sløyfe',
        'Flödet genom slingan': 'Fluksen gjennom sløyfen',
        'oförändrat': 'uendret',
        'ökar': 'øker',
        'minskar': 'minker',
        'Ta tag i magneten och för den mot eller från slingan': 'Ta tak i magneten og før den mot eller bort fra sløyfen',

        // ---- Inställningsrutan ----
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Magneten': 'Magneten',
        'Nordändan mot slingan': 'Nordenden mot sløyfen',
        'Sydändan mot slingan': 'Sørenden mot sløyfen',
        'Fälten genom slingan': 'Feltene gjennom sløyfen',
        'Kraften på magneten': 'Kraften på magneten',
        'Resistans (': 'Resistans (',
        'Automatisk fart': 'Automatisk fart',
        'Stoppa rörelsen': 'Stopp bevegelsen',
        'För magneten fram och tillbaka': 'Før magneten fram og tilbake',

        // ---- Sidopanelen ----
        'Resistans i slingan (': 'Resistans i sløyfen (',
        'Mindre resistans ⟹ större inducerad ström (Ohms lag).': 'Mindre resistans ⟹ større indusert strøm (Ohms lov).',
        'Fortare rörelse ⟹ snabbare flödesändring ⟹ större ström.': 'Raskere bevegelse ⟹ raskere fluksendring ⟹ større strøm.',
        'Ohms lag på den inducerade strömmen': 'Ohms lov for den induserte strømmen',
        'Den inducerade spänningen': 'Den induserte spenningen',
        'kommer från flödesändringen just nu — håll magneten stilla så blir både':
            'kommer fra fluksendringen akkurat nå. Hold magneten i ro, så blir både',
        'och': 'og',
        'noll.': 'null.',
        'Avläsning': 'Avlesning',
        'Magnetens fart': 'Magnetens fart',
        'Strömmen i framkanten': 'Strømmen i forkanten',
        'uppåt': 'oppover',
        'nedåt': 'nedover',
        'Testa teorins Exempel 2: närma magneten med nordändan mot slingan och läs av strömriktningen. Dra sedan bort den — strömmen byter håll. Vänd till sydändan och gör om: allt speglas!':
            'Prøv eksempel 2 i teorien: før magneten mot sløyfen med nordenden først og les av strømretningen. Trekk den så bort, og strømmen skifter retning. Snu til sørenden og gjør det samme igjen: alt speiles!',

        // ---- Förklaringsrutorna ----
        'Lenz lag i simuleringen': 'Lenz’ lov i simuleringen',
        'När magneten närmar sig': 'Når magneten nærmer seg,',
        'förstärks': 'forsterkes',
        'fältet genom slingan. Den inducerade strömmen skapar då ett eget fält som är':
            'feltet gjennom sløyfen. Den induserte strømmen lager da et eget felt som er',
        'motriktat': 'motsatt rettet',
        '— jämför de två pilarna ovanför slingan. När magneten dras bort':
            '(sammenlign de to pilene over sløyfen). Når magneten trekkes bort,',
        'försvagas': 'svekkes',
        'fältet, och slingans fält vänder för att i stället förstärka det. Orsaken motverkas alltid.':
            'feltet, og sløyfens felt snur for i stedet å forsterke det. Årsaken motvirkes alltid.',
        'Galvanometern avslöjar allt': 'Galvanometeret avslører alt',
        'Precis som i demonstrationen ger magneten utslag': 'Akkurat som i demonstrasjonen gir magneten utslag',
        'bara när den rör sig': 'bare når den beveger seg',
        ': in mot slingan → utslag åt ena hållet, ut från slingan → utslag åt andra hållet, stilla → inget utslag. Snabbare rörelse och mindre resistans ger större utslag.':
            ': inn mot sløyfen → utslag til den ene siden, ut fra sløyfen → utslag til den andre siden, i ro → ikke noe utslag. Raskere bevegelse og mindre resistans gir større utslag.',
        'Kraften motverkar rörelsen': 'Kraften motvirker bevegelsen',
        'Slingan blir en liten elektromagnet som': 'Sløyfen blir en liten elektromagnet som',
        'bromsar magneten': 'bremser magneten',
        ': den stöter bort en annalkande magnet och håller kvar en som dras bort (slå på "Kraften på magneten"). Samma princip får en magnet att falla långsamt genom ett kopparrör — virvelströmmarna i röret motverkar fallet.':
            ': den frastøter en magnet som nærmer seg, og holder igjen en som trekkes bort (slå på «Kraften på magneten»). Det samme prinsippet får en magnet til å falle sakte gjennom et kobberrør: virvelstrømmene i røret motvirker fallet.',

        // ---- Så läser du av strömriktningen ----
        'Så läser du av strömriktningen': 'Slik leser du av strømretningen',
        'Gör som i teorins Exempel 2, i tre steg.': 'Gjør som i eksempel 2 i teorien, i tre trinn.',
        'Avgör åt vilket håll magnetens fält pekar genom slingan och om det':
            'Avgjør hvilken vei magnetens felt peker gjennom sløyfen, og om det',
        'förstärks eller försvagas': 'forsterkes eller svekkes',
        'av rörelsen.': 'av bevegelsen.',
        'Lenz lag: den inducerade strömmens fält ska': 'Lenz’ lov: feltet fra den induserte strømmen skal',
        'motverka ändringen': 'motvirke endringen',
        '— motriktat om fältet förstärks, medriktat om det försvagas.':
            '(motsatt rettet hvis feltet forsterkes og i samme retning hvis det svekkes).',
        'Använd tumregeln för spole/slinga baklänges: låt tummen peka i det inducerade fältets riktning, så visar fingrarna strömmens riktning runt slingan — till exempel "uppåt i framkanten".':
            'Bruk høyrehåndsregelen for spole og sløyfe baklengs: la tommelen peke i retningen til det induserte feltet, så viser fingrene strømmens retning rundt sløyfen, for eksempel «oppover i forkanten».',

        // ---- Vanliga missuppfattningar ----
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Den inducerade strömmen motverkar magnetens fält."': '«Den induserte strømmen motvirker magnetens felt.»',
        'Inte riktigt — den motverkar': 'Ikke helt. Den motvirker',
        'ändringen': 'endringen',
        'av flödet. När magneten dras bort är slingans fält till och med':
            'av fluksen. Når magneten trekkes bort, har sløyfens felt til og med',
        'medriktat': 'samme retning som',
        'magnetens, för att försöka behålla flödet.': 'magnetens felt, for å prøve å holde på fluksen.',
        '"En stark magnet nära slingan ger ström."': '«En sterk magnet nær sløyfen gir strøm.»',
        'Nej — utan rörelse ingen flödesändring och ingen ström, hur stark magneten än är. Prova att hålla magneten stilla alldeles intill slingan.':
            'Nei. Uten bevegelse blir det ingen fluksendring og ingen strøm, uansett hvor sterk magneten er. Prøv å holde magneten i ro rett ved siden av sløyfen.',
        '"Strömmen borde förstärka orsaken."': '«Strømmen burde forsterke årsaken.»',
        'Då skulle energi skapas ur ingenting: strömmen skulle driva på rörelsen som skapar mer ström. Lenz lag är energiprincipen i elektromagnetisk form — man måste utföra arbete för att inducera ström.':
            'Da ville energi oppstå av ingenting: strømmen ville drive på bevegelsen som lager mer strøm. Lenz’ lov er energiprinsippet i elektromagnetisk form: man må utføre arbeid for å indusere strøm.'
    });
})();

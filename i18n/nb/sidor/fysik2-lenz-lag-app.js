/* i18n/nb/sidor/fysik2-lenz-lag-app.js — norska (bokmål) för simuleringen
 * Inducerad ström och Lenz lag (slinga och spole, 2D och 3D). */
(function () {
    I18N.add({
        // ---- Sidhuvud och metadata ----
        'Inducerad ström och Lenz lag — Fysiklabbet': 'Indusert strøm og Lenz’ lov — Fysiklabbet',
        'Inducerad ström och Lenz lag — Fysik nivå 2': 'Indusert strøm og Lenz’ lov — Fysikk nivå 2',
        'För en stavmagnet mot, genom och bort från en slinga eller en spole och se strömmen induceras. Galvanometern ger utslag åt olika håll, och strömmen får enligt Lenz lag alltid en riktning som motverkar orsaken. Välj 2D eller 3D, visa elektronerna, magnetens fältlinjer och kraften som bromsar magneten, och följ den inducerade spänningen i en graf.':
            'Før en stavmagnet mot, gjennom og bort fra en sløyfe eller en spole og se strømmen bli indusert. Galvanometeret gir utslag til forskjellige sider, og ifølge Lenz’ lov får strømmen alltid en retning som motvirker årsaken. Velg 2D eller 3D, vis elektronene, feltlinjene til magneten og kraften som bremser magneten, og følg den induserte spenningen i en graf.',
        '/ Inducerad ström och Lenz lag': '/ Indusert strøm og Lenz’ lov',
        'Inducerad ström och Lenz lag': 'Indusert strøm og Lenz’ lov',

        // ---- Ingressen ----
        'Ta tag i stavmagneten och för den mot en slinga eller en spole, rakt igenom och ut på andra sidan. När magnetfältet genom ledaren ändras induceras en ström, och enligt':
            'Ta tak i stavmagneten og før den mot en sløyfe eller en spole, rett gjennom og ut på den andre siden. Når magnetfeltet gjennom lederen endres, induseres det en strøm, og ifølge',
        'Lenz lag': 'Lenz’ lov',
        'får den en riktning som': 'får den en retning som',
        'motverkar orsaken': 'motvirker årsaken',
        ': ledarens eget magnetfält motverkar ändringen av flödet. Titta på galvanometern. Den ger utslag åt ena hållet när magneten närmar sig, åt andra hållet när den dras bort och inget utslag alls när magneten står still. Växla till 3D för att se slingan och spolen från alla håll.':
            ': lederens eget magnetfelt motvirker endringen av fluksen. Se på galvanometeret. Det gir utslag til den ene siden når magneten nærmer seg, til den andre siden når den trekkes bort, og ikke noe utslag i det hele tatt når magneten står stille. Bytt til 3D for å se sløyfen og spolen fra alle kanter.',

        // ---- Formelkortet ----
        'En inducerad ström får en sådan riktning att': 'En indusert strøm får en slik retning at',
        'orsaken till dess uppkomst motverkas': 'årsaken til at den oppstår, motvirkes',
        'Inducerad spänning': 'Indusert spenning',
        'Antal varv': 'Antall vindinger',
        'Flödesändring': 'Fluksendring',
        'Tid': 'Tid',
        'Inducerad ström': 'Indusert strøm',
        'Resistans': 'Resistans',

        // ---- Inställningsrutan ----
        'Visa': 'Vis',
        'Magnetens fältlinjer': 'Feltlinjene til magneten',
        'Fälten genom ledaren': 'Feltene gjennom lederen',
        'Elektronerna': 'Elektronene',
        'Kraften på magneten': 'Kraften på magneten',
        'Magneten': 'Magneten',
        'Nordändan mot': 'Nordenden mot',
        'Sydändan mot': 'Sørenden mot',
        'slingan': 'sløyfen',
        'spolen': 'spolen',
        'Reglage': 'Kontroller',
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Stoppa rörelsen': 'Stopp bevegelsen',
        'För magneten fram och tillbaka': 'Før magneten fram og tilbake',
        'Paus': 'Pause',
        'Fart': 'Fart',

        // ---- Scenen ----
        'Ta tag i magneten och för den mot eller genom {led}': 'Ta tak i magneten og før den mot eller gjennom {led}',
        'Dra i magneten för att flytta den. Dra någon annanstans för att vrida scenen.':
            'Dra i magneten for å flytte den. Dra et annet sted for å rotere scenen.',
        'Magnetens fält': 'Magnetens felt',
        'Inducerat fält': 'Indusert felt',
        'inget': 'ikke noe',
        'Flödet genom': 'Fluksen gjennom',
        'oförändrat': 'uendret',
        'ökar': 'øker',
        'minskar': 'minker',

        // ---- Sidopanelen ----
        'Visning': 'Visning',
        'Ledare': 'Leder',
        'Slinga': 'Sløyfe',
        'Spole': 'Spole',
        'Vy': 'Kamera',
        'Snett': 'På skrå',
        'Från sidan': 'Fra siden',
        'Ovanifrån': 'Ovenfra',
        'Antal varv i spolen (<em>N</em>)': 'Antall vindinger i spolen (<em>N</em>)',
        'Antal varv (<em>N</em>)': 'Antall vindinger (<em>N</em>)',
        'Antal varv i spolen (': 'Antall vindinger i spolen (',
        'Antal varv (': 'Antall vindinger (',
        'Fler varv ger större inducerad spänning, e = −N · ΔΦ/Δt.': 'Flere vindinger gir større indusert spenning, e = −N · ΔΦ/Δt.',
        'Resistans i kretsen (<em>R</em>)': 'Resistans i kretsen (<em>R</em>)',
        'Resistans (<em>R</em>)': 'Resistans (<em>R</em>)',
        'Resistans i kretsen (': 'Resistans i kretsen (',
        'Resistans (': 'Resistans (',
        'Mindre resistans ger större inducerad ström (Ohms lag).': 'Mindre resistans gir større indusert strøm (Ohms lov).',
        'Automatisk fart': 'Automatisk fart',
        'Fortare rörelse ger snabbare flödesändring och större ström.': 'Raskere bevegelse gir raskere fluksendring og større strøm.',
        'Inducerad spänning över tid': 'Indusert spenning over tid',
        '(senaste 8 s)': '(siste 8 s)',
        'För magneten rakt igenom': 'Før magneten rett gjennom',
        ': spänningen byter tecken när magnetens mitt passerar.': ': spenningen skifter fortegn når midten av magneten passerer.',
        'Avläsning': 'Avlesning',
        'Inducerad spänning <em>e</em>': 'Indusert spenning <em>e</em>',
        'Inducerad ström <em>I</em>': 'Indusert strøm <em>I</em>',
        'Flödet <em>Φ</em> genom ledaren': 'Fluksen <em>Φ</em> gjennom lederen',
        'Flödet': 'Fluksen',
        'genom ledaren': 'gjennom lederen',
        'Magnetens fart': 'Farten til magneten',
        'Strömmen i framkanten': 'Strømmen i forkanten',
        'uppåt': 'oppover',
        'nedåt': 'nedover',

        // ---- Förklaringskorten ----
        'Lenz lag i simuleringen': 'Lenz’ lov i simuleringen',
        'När magneten närmar sig': 'Når magneten nærmer seg,',
        'förstärks': 'forsterkes',
        'fältet genom ledaren. Den inducerade strömmen skapar då ett eget fält som är': 'feltet gjennom lederen. Den induserte strømmen lager da et eget felt som er',
        'motriktat': 'motsatt rettet',
        '. Jämför de två pilarna ovanför ledaren. När magneten dras bort': '. Sammenlign de to pilene over lederen. Når magneten trekkes bort,',
        'försvagas': 'svekkes',
        'fältet, och det inducerade fältet vänder för att i stället förstärka det. Orsaken motverkas alltid.':
            'feltet, og det induserte feltet snur for i stedet å forsterke det. Årsaken motvirkes alltid.',
        'Spolen ger större spänning': 'Spolen gir større spenning',
        'Varje varv i spolen får samma flödesändring som slingan, och spänningarna i varven adderas:':
            'Hver vinding i spolen får samme fluksendring som sløyfen, og spenningene i vindingene legges sammen:',
        '. Med tio varv blir spänningen ungefär tio gånger så stor. Pröva att ändra varvtalet och se grafen växa.':
            '. Med ti vindinger blir spenningen omtrent ti ganger så stor. Prøv å endre antall vindinger og se grafen vokse.',
        'Kraften motverkar rörelsen': 'Kraften motvirker bevegelsen',
        'Ledaren blir en liten elektromagnet som': 'Lederen blir en liten elektromagnet som',
        'bromsar magneten': 'bremser magneten',
        ': den stöter bort en magnet som närmar sig och håller kvar en som dras bort. Slå på "Kraften på magneten". Den energi som blir elektrisk energi i kretsen kommer från arbetet du gör när du för magneten.':
            ': den frastøter en magnet som nærmer seg, og holder igjen en som trekkes bort. Slå på «Kraften på magneten». Energien som blir elektrisk energi i kretsen, kommer fra arbeidet du gjør når du fører magneten.',

        'Så läser du av strömriktningen': 'Slik leser du av strømretningen',
        'Gör som i teorins Exempel 2, i tre steg.': 'Gjør som i eksempel 2 i teorien, i tre trinn.',
        'Avgör åt vilket håll magnetens fält pekar genom ledaren och om det': 'Finn ut hvilken vei feltet til magneten peker gjennom lederen, og om det',
        'förstärks eller försvagas': 'forsterkes eller svekkes',
        'av rörelsen.': 'av bevegelsen.',
        'Lenz lag: den inducerade strömmens fält ska': 'Lenz’ lov: feltet fra den induserte strømmen skal',
        'motverka ändringen': 'motvirke endringen',
        ', alltså vara motriktat om fältet förstärks och medriktat om det försvagas.':
            ', altså være motsatt rettet hvis feltet forsterkes, og i samme retning hvis det svekkes.',
        'Använd tumregeln för spole och slinga baklänges: låt tummen peka i det inducerade fältets riktning, så visar fingrarna strömmens riktning runt ledaren, till exempel uppåt i framkanten.':
            'Bruk høyrehåndsregelen for spole og sløyfe baklengs: la tommelen peke i retningen til det induserte feltet, så viser fingrene strømretningen rundt lederen, for eksempel oppover i forkanten.',

        'Elektronerna och strömriktningen': 'Elektronene og strømretningen',
        'Strömpilarna visar den överenskomna strömriktningen, från plus till minus. Det som faktiskt rör sig i koppartråden är elektroner, och eftersom de är negativt laddade rör de sig åt motsatt håll. Slå på Elektronerna och se dem vandra mot strömpilarna. Deras verkliga fart är mycket liten, bara bråkdelar av en millimeter per sekund, så i simuleringen är farten kraftigt förstorad.':
            'Strømpilene viser den vedtatte strømretningen, fra pluss til minus. Det som faktisk beveger seg i kobbertråden, er elektroner, og fordi de er negativt ladde, beveger de seg motsatt vei. Slå på Elektronene og se dem vandre mot strømpilene. Den virkelige farten deres er svært liten, bare brøkdeler av en millimeter per sekund, så i simuleringen er farten kraftig forstørret.',

        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”Den inducerade strömmen motverkar magnetens fält.”': '«Den induserte strømmen motvirker feltet til magneten.»',
        'Inte riktigt. Den motverkar': 'Ikke helt. Den motvirker',
        'ändringen': 'endringen',
        'av flödet. När magneten dras bort är det inducerade fältet till och med': 'av fluksen. Når magneten trekkes bort, er det induserte feltet til og med',
        'medriktat': 'i samme retning som',
        'magnetens, för att försöka behålla flödet.': 'feltet til magneten, for å prøve å beholde fluksen.',
        '”En stark magnet nära slingan ger ström.”': '«En sterk magnet nær sløyfen gir strøm.»',
        'Nej. Utan rörelse blir det ingen flödesändring och ingen ström, hur stark magneten än är. Pröva att hålla magneten stilla mitt i spolen.':
            'Nei. Uten bevegelse blir det ingen fluksendring og ingen strøm, uansett hvor sterk magneten er. Prøv å holde magneten stille midt i spolen.',
        '”Strömmen är störst när magneten är mitt i spolen.”': '«Strømmen er størst når magneten er midt i spolen.»',
        'Nej, där är flödet störst men ändras som minst. Strömmen är störst när magnetens ändar passerar ledaren, och den byter riktning just när magnetens mitt passerar. Titta på grafen.':
            'Nei, der er fluksen størst, men den endres minst. Strømmen er størst når endene av magneten passerer lederen, og den skifter retning akkurat når midten av magneten passerer. Se på grafen.',
        '”Strömmen borde förstärka orsaken.”': '«Strømmen burde forsterke årsaken.»',
        'Då skulle energi skapas ur ingenting: strömmen skulle driva på rörelsen som skapar mer ström. Lenz lag är energiprincipen i elektromagnetisk form, och man måste utföra arbete för att inducera ström.':
            'Da ville det blitt skapt energi av ingenting: strømmen ville drevet bevegelsen som lager mer strøm. Lenz’ lov er energiprinsippet i elektromagnetisk form, og man må utføre arbeid for å indusere strøm.',
    });
})();

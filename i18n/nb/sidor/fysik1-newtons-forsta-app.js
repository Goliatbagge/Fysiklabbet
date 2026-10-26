/* i18n/nb/sidor/fysik1-newtons-forsta-app.js — norska (bokmål) för
 * simuleringen Newtons första lag. */
(function () {
    I18N.add({
        // ---- Sidhuvud, metadata ----
        'Newtons första lag — Fysiklabbet': 'Newtons første lov — Fysiklabbet',
        'Newtons första lag — Fysik nivå 1': 'Newtons første lov — Fysikk nivå 1',
        'Tröghet — en kropp förblir i vila eller likformig rörelse om resulterande kraft är noll. Tre scenarier: rymden, en bil och en fallskärmshoppare.':
            'Treghet: et legeme forblir i ro eller i jevn bevegelse når resultantkraften er null. Tre scenarier: verdensrommet, en bil og en fallskjermhopper.',
        '/ Newtons första lag': '/ Newtons første lov',
        'Newtons första lag': 'Newtons første lov',

        // ---- Ingress ----
        'Tröghetslagen:': 'Treghetsloven:',
        'ett föremål förblir i vila eller i likformig rörelse i en rät linje så länge den':
            'en gjenstand forblir i ro eller i jevn bevegelse langs en rett linje så lenge den',
        'resulterande': 'resulterende',
        'kraften är noll. Det krävs alltså ingen kraft för att': 'kraften er null. Det trengs altså ingen kraft for å',
        'hålla': 'holde',
        'en rörelse igång — bara för att': 'en bevegelse i gang, bare for å',
        'ändra': 'endre',
        'den. Välj ett scenario nedan och se hur föremålet rör sig med konstant fart när krafterna tar ut varandra.':
            'den. Velg et scenario nedenfor og se hvordan gjenstanden beveger seg med konstant fart når kreftene opphever hverandre.',

        // ---- Formelkortet ----
        '= konstant': '= konstant',
        'Resulterande kraft noll betyder ingen acceleration (': 'Resultantkraft lik null betyr ingen akselerasjon (',
        '= 0): farten och riktningen ändras inte.': '= 0): farten og retningen endres ikke.',

        // ---- Scenarier ----
        '🛰️ Rymden': '🛰️ Verdensrommet',
        '🚗 Bil på väg': '🚗 Bil på veien',
        '🪂 Fallskärmshoppare': '🪂 Fallskjermhopper',
        'Scenario': 'Scenario',
        'Välj scenario': 'Velg scenario',

        // ---- Scenen ----
        '(motorn)': '(motoren)',
        'Motorn ger en kraft framåt — sonden accelererar': 'Motoren gir en kraft fremover, og sonden akselererer',
        'Inga krafter verkar —': 'Ingen krefter virker:',
        'Drivkraft': 'Drivkraft',
        'Luftmotstånd': 'Luftmotstand',
        'Spännkraft': 'Snordrag',
        'Tyngdkraft': 'Tyngdekraft',
        '✂ Klicka på snöret för att släppa hopparen': '✂ Klikk på snoren for å slippe hopperen',
        'Gränshastighet —': 'Terminalfart:',
        '= 0 → konstant fart': '= 0 → konstant fart',
        'Luftmotståndet växer med farten …': 'Luftmotstanden øker med farten …',
        'Drivkraft > luftmotstånd → bilen accelererar': 'Drivkraft > luftmotstand → bilen akselererer',
        'Luftmotstånd > drivkraft → bilen bromsar in': 'Luftmotstand > drivkraft → bilen bremser opp',
        'Motorn driver → sonden accelererar': 'Motoren driver → sonden akselererer',
        '🚀 Tryck på Boost för att tända motorn': '🚀 Trykk på Boost for å tenne motoren',

        // ---- Visningsval och knappar ----
        'Visa i scenen': 'Vis i scenen',
        'Kraftpilar': 'Kraftpiler',
        'Resulterande kraft': 'Resultantkraft',
        'Hastighet': 'Hastighet',
        'Hastighetsvektor': 'Hastighetsvektor',
        'Fart': 'Fart',
        'Drivning': 'Drift',
        'Framhjulsdrift': 'Forhjulsdrift',
        'Bakhjulsdrift': 'Bakhjulsdrift',
        '▶ Starta': '▶ Start',
        '⏸ Pausa': '⏸ Pause',
        '✂ Starta': '✂ Start',
        '↻ Börja om': '↻ Start på nytt',
        '🚀 Boost': '🚀 Boost',

        // ---- Sidopanelens texter ----
        '✂ Klicka på': '✂ Klikk på',
        'snöret': 'snoren',
        'i scenen för att klippa av det — hopparen faller med ökande fart tills luftmotståndet är lika stort som tyngdkraften vid gränshastigheten':
            'i scenen for å klippe den over. Hopperen faller med økende fart til luftmotstanden er like stor som tyngdekraften ved terminalfarten',
        'Tryck på': 'Trykk på',
        'Starta': 'Start',
        'så ökar': 'så øker',
        'drivkraften': 'drivkraften',
        'till 3000 N. Drivkraften är då större än luftmotståndet en stund (bilen accelererar) tills luftmotståndet vuxit ikapp — då är resultanten noll och bilen håller en konstant fart.':
            'til 3000 N. Drivkraften er da større enn luftmotstanden en stund (bilen akselererer), helt til luftmotstanden har tatt den igjen. Da er resultantkraften null, og bilen holder konstant fart.',
        'Sonden startar i': 'Sonden starter i',
        'vila': 'ro',
        '. Tryck på': '. Trykk på',
        'Boost': 'Boost',
        'så tänder motorn en kort stund — sonden accelererar medan den brinner och fortsätter sedan med':
            'så tennes motoren en kort stund. Sonden akselererer mens den brenner, og fortsetter deretter med',
        'konstant fart': 'konstant fart',
        ', helt utan kraft.': ', helt uten kraft.',

        // ---- Scenariorutan ----
        'I rymden — inga krafter alls': 'I verdensrommet: ingen krefter i det hele tatt',
        'Sonden börjar i vila. Tryck på Boost så tänder motorn en kort stund — då verkar en kraft framåt och sonden accelererar. Så fort motorn slocknar är den resulterande kraften noll igen, och sonden fortsätter rakt fram med oförändrad fart, helt av sig själv. Inget behövs för att hålla rörelsen igång — bara för att ändra den.':
            'Sonden starter i ro. Trykk på Boost, så tennes motoren en kort stund. Da virker en kraft fremover, og sonden akselererer. Så snart motoren slukker, er resultantkraften null igjen, og sonden fortsetter rett frem med uendret fart, helt av seg selv. Ingenting trengs for å holde bevegelsen i gang, bare for å endre den.',
        'Bilen — krafterna tar ut varandra': 'Bilen: kreftene opphever hverandre',
        'Drivkraften är friktionen som vägen utövar på drivhjulet, medan luftmotståndet bromsar bakåt och växer med farten (∝ v²). Öka drivkraften: en stund är den större än luftmotståndet och bilen accelererar — tills luftmotståndet vuxit ikapp. Då är resultanten noll igen och bilen håller en ny, högre konstant fart. Högre fart kräver alltså större drivkraft. Bilen står stilla i bild — det är världen som rusar förbi.':
            'Drivkraften er friksjonen som veien utøver på drivhjulet, mens luftmotstanden bremser bakover og øker med farten (∝ v²). Øk drivkraften: en stund er den større enn luftmotstanden, og bilen akselererer, helt til luftmotstanden har tatt den igjen. Da er resultantkraften null igjen, og bilen holder en ny, høyere konstant fart. Høyere fart krever altså større drivkraft. Bilen står stille i bildet. Det er omgivelsene som suser forbi.',
        'Drivkraften angriper vid drivhjulet (fram eller bak) men pekar FRAMÅT i båda fallen — bakhjulsdrift "skjuter" alltså inte mer än framhjulsdrift "drar". Motorn vrider hjulet bakåt mot vägen, och vägen svarar med att skjuta hjulet framåt (Newtons tredje lag).':
            'Drivkraften angriper ved drivhjulet (foran eller bak), men peker FREMOVER i begge tilfellene. Bakhjulsdrift «skyver» altså ikke mer enn forhjulsdrift «drar». Motoren vrir hjulet bakover mot veien, og veien svarer med å skyve hjulet fremover (Newtons tredje lov).',
        'Fallskärmshopparen — gränshastighet': 'Fallskjermhopperen: terminalfart',
        'Klipp av snöret så börjar hopparen falla. Allra först är farten noll och luftmotståndet noll — bara tyngdkraften verkar, så hon accelererar. Ju fortare hon faller, desto större blir luftmotståndet (det växer med farten i kvadrat). Till slut, vid gränshastigheten 53 m/s, är luftmotståndet precis lika stort som tyngdkraften: resultanten blir noll och farten konstant.':
            'Klipp over snoren, så begynner hopperen å falle. Aller først er farten null og luftmotstanden null. Bare tyngdekraften virker, så hun akselererer. Jo fortere hun faller, desto større blir luftmotstanden (den øker med kvadratet av farten). Til slutt, ved terminalfarten 53 m/s, er luftmotstanden nøyaktig like stor som tyngdekraften: resultantkraften blir null og farten konstant.',
        'Accelerationen avtar hela tiden under fallet — den är störst i början (då bara tyngdkraften verkar) och går mot noll när farten närmar sig gränshastigheten. Farten ökar alltså snabbt först och planar sedan ut.':
            'Akselerasjonen avtar hele tiden under fallet. Den er størst i begynnelsen (da bare tyngdekraften virker) og går mot null når farten nærmer seg terminalfarten. Farten øker altså raskt først og flater deretter ut.',

        // ---- Pedagogiska rutor ----
        '🛰️ Inga krafter': '🛰️ Ingen krefter',
        'Det enklaste fallet: när': 'Det enkleste tilfellet: når',
        'inga': 'ingen',
        'krafter verkar är resultanten självklart noll. I rymden, långt från friktion och luft, fortsätter ett föremål rakt fram för evigt. På jorden gömmer friktionen detta — därför trodde man länge att kraft behövs för att hålla rörelse igång.':
            'krefter virker, er resultantkraften selvsagt null. I verdensrommet, langt fra friksjon og luft, fortsetter en gjenstand rett frem for alltid. På jorden skjuler friksjonen dette. Derfor trodde man lenge at det trengs en kraft for å holde en bevegelse i gang.',
        '⚖️ Balanserade krafter': '⚖️ Krefter i balanse',
        'Vanligare på jorden: flera krafter verkar men': 'Vanligere på jorden: flere krefter virker, men de',
        'tar ut varandra': 'opphever hverandre',
        '. Bilens drivkraft = luftmotståndet, hopparens tyngdkraft = luftmotståndet. Summan blir noll, precis som om inga krafter alls fanns — och farten hålls konstant.':
            '. Bilens drivkraft = luftmotstanden, hopperens tyngdekraft = luftmotstanden. Summen blir null, akkurat som om det ikke fantes noen krefter i det hele tatt, og farten holdes konstant.',
        '🎥 Referenspunkten': '🎥 Referansepunktet',
        'I bil- och hoppar-scenen sitter ”kameran” fast vid föremålet, som därför står stilla i bild medan omgivningen rusar förbi. Det är samma rörelse — bara sedd från föremålets eget vilosystem.':
            'I bil- og hopperscenen sitter «kameraet» fast i gjenstanden, som derfor står stille i bildet mens omgivelsene suser forbi. Det er den samme bevegelsen, bare sett fra gjenstandens eget hvilesystem.',
        '⚠️ Vanliga missuppfattningar': '⚠️ Vanlige misoppfatninger',
        '”Det krävs en kraft för att hålla rörelsen igång.”': '«Det trengs en kraft for å holde bevegelsen i gang.»',
        'Nej — en kraft krävs bara för att': 'Nei. En kraft trengs bare for å',
        'rörelsen. Med resultant noll fortsätter föremålet av sig självt. Att saker ändå stannar på jorden beror på friktion och luftmotstånd, alltså krafter som bromsar.':
            'bevegelsen. Med resultantkraft null fortsetter gjenstanden av seg selv. At ting likevel stopper på jorden, skyldes friksjon og luftmotstand, altså krefter som bremser.',
        '”Konstant fart betyder att kraften är konstant och framåtriktad.”': '«Konstant fart betyr at kraften er konstant og rettet fremover.»',
        'Nej — konstant fart betyder att den': 'Nei. Konstant fart betyr at den',
        'kraften är noll. De enskilda krafterna kan vara stora, men de tar ut varandra.':
            'kraften er null. De enkelte kreftene kan være store, men de opphever hverandre.',
        '”Föremålet rör sig, alltså finns en nettokraft framåt.”': '«Gjenstanden beveger seg, altså finnes det en nettokraft fremover.»',
        'Rörelse i sig kräver ingen kraft. Bara': 'Bevegelse i seg selv krever ingen kraft. Bare',
        'acceleration': 'akselerasjon',
        '(ändring av fart eller riktning) gör det.': '(endring av fart eller retning) gjør det.'
    });
})();

/* index.js — manifest över interaktiva visualiseringar ("aha-maskiner").
 *
 * Laddas av katalog.html vid start (bara metadata — själva modulerna
 * lazy-laddas först när eleven klickar på Visualisering-kortet).
 *
 * Nyckel = teori-id. Flera avsnitt kan peka på samma fil (modulen
 * registrerar sig då för alla sina id:n i window.VISUALISERINGAR).
 *
 *   titel:       kort namn (visas på kortet i katalogen)
 *   beskrivning: en mening om vad eleven gör/ser
 *   fil:         sökväg till modulen (registrerar mount() i
 *                window.VISUALISERINGAR['<id>'])
 *
 * Masterlista över planerade visualiseringar: .claude/visualiseringar-plan.md
 */
window.VISUALISERINGAR_INDEX = {
    'ma3c-2.1': {
        titel: 'Sekanten blir tangent',
        beskrivning: 'Dra i punkterna och se sekantens lutning — och vad som händer när h går mot 0.',
        fil: 'data/visualiseringar/ma3c-2.3.js'
    },
    'ma3c-2.2': {
        titel: 'Sekanten blir tangent',
        beskrivning: 'Dra i punkterna och se sekantens lutning — och vad som händer när h går mot 0.',
        fil: 'data/visualiseringar/ma3c-2.3.js'
    },
    'ma3c-2.3': {
        titel: 'Sekanten blir tangent',
        beskrivning: 'Dra h mot 0 och se sekanten övergå i tangenten — derivatans definition.',
        fil: 'data/visualiseringar/ma3c-2.3.js'
    },
    'ma1c-1.6': {
        titel: 'Potenstrappan',
        beskrivning: 'Kliv nedåt genom exponenttrappan — a⁰ = 1 och a⁻ⁿ = 1/aⁿ är mönstrets tvingande fortsättning.',
        fil: 'data/visualiseringar/ma1c-1.6.js'
    },
    'ma1c-1.7': {
        titel: 'Potenstrappan',
        beskrivning: 'Kliv nedåt genom exponenttrappan — a⁰ = 1 och a⁻ⁿ = 1/aⁿ är mönstrets tvingande fortsättning.',
        fil: 'data/visualiseringar/ma1c-1.6.js'
    },
    'ma1c-2.11': {
        titel: 'Olikhetens vändpunkt',
        beskrivning: 'Dela med ett negativt tal och se hela tallinjen speglas kring 0 — det är därför tecknet vänder.',
        fil: 'data/visualiseringar/ma1c-2.11.js'
    },
    'ma1c-2.5': {
        titel: 'Ekvationsvågen',
        beskrivning: 'Gör samma operation på båda vågskålarna för att lösa ut x — och testa vad som händer om du fuskar.',
        fil: 'data/visualiseringar/ma1c-2.5.js'
    },
    'ma1c-2.6': {
        titel: 'Ekvationsvågen',
        beskrivning: 'Gör samma operation på båda vågskålarna för att lösa ut x — och testa vad som händer om du fuskar.',
        fil: 'data/visualiseringar/ma1c-2.5.js'
    },
    'ma1c-5.6': {
        titel: 'Träddiagram-byggaren',
        beskrivning: 'Bygg ett kulträd med och utan återläggning — klicka en väg för multiplikation, en händelse för addition.',
        fil: 'data/visualiseringar/ma1c-5.7.js'
    },
    'ma1c-5.7': {
        titel: 'Träddiagram-byggaren',
        beskrivning: 'Bygg ett kulträd med och utan återläggning — klicka en väg för multiplikation, en händelse för addition.',
        fil: 'data/visualiseringar/ma1c-5.7.js'
    },
    'ma1c-5.8': {
        titel: 'Träddiagram-byggaren',
        beskrivning: 'Bygg ett kulträd med och utan återläggning — och se komplementhändelsen ge samma svar med färre räkningar.',
        fil: 'data/visualiseringar/ma1c-5.7.js'
    },
    'ma3c-2.5': {
        titel: 'Deriverbarhets-mikroskopet',
        beskrivning: 'Zooma in med linsen — deriverbara punkter rätas ut till en linje, men ett hörn förblir ett hörn.',
        fil: 'data/visualiseringar/ma3c-2.5.js'
    },
    'ma3c-4.1': {
        titel: 'Konkavitetsbilen',
        beskrivning: 'Kör en bil längs kurvan och se teckentabellen byggas av lutningen och dess ändring.',
        fil: 'data/visualiseringar/ma3c-4.1.js'
    },
    'ma3c-4.2': {
        titel: 'Konkavitetsbilen',
        beskrivning: 'Kör en bil längs kurvan och se teckentabellen byggas av lutningen och dess ändring.',
        fil: 'data/visualiseringar/ma3c-4.1.js'
    },
    'ma3c-4.4': {
        titel: 'Konkavitetsbilen',
        beskrivning: 'Kör en bil längs kurvan och se teckentabellen byggas av lutningen och dess ändring.',
        fil: 'data/visualiseringar/ma3c-4.1.js'
    },
    'ma3c-4.5': {
        titel: 'Konkavitetsbilen',
        beskrivning: 'Kör en bil längs kurvan och se teckentabellen byggas av lutningen och dess ändring.',
        fil: 'data/visualiseringar/ma3c-4.1.js'
    },
    'ma2c-1.1': {
        titel: 'Ekvationssystemets tre öden',
        beskrivning: 'Dra i två linjer och se skärningspunkten bli lösningen — algebraiskt och grafiskt på samma gång.',
        fil: 'data/visualiseringar/ma2c-1.1.js'
    },
    'ma2c-1.2': {
        titel: 'Ekvationssystemets tre öden',
        beskrivning: 'Dra i två linjer och se skärningspunkten bli lösningen — algebraiskt och grafiskt på samma gång.',
        fil: 'data/visualiseringar/ma2c-1.1.js'
    },
    'ma2c-1.3': {
        titel: 'Ekvationssystemets tre öden',
        beskrivning: 'Dra i två linjer och se skärningspunkten bli lösningen — algebraiskt och grafiskt på samma gång.',
        fil: 'data/visualiseringar/ma2c-1.1.js'
    },
    'ma2c-1.4': {
        titel: 'Ekvationssystemets tre öden',
        beskrivning: 'Dra i två linjer och se skärningspunkten bli lösningen — algebraiskt och grafiskt på samma gång.',
        fil: 'data/visualiseringar/ma2c-1.1.js'
    },
    'ma2c-2.1': {
        titel: 'Kvadratregler som areor',
        beskrivning: 'Se (a+b)² och konjugatregeln som bokstavliga areor — dra i figuren och flytta pusselbiten.',
        fil: 'data/visualiseringar/ma2c-2.1.js'
    },
    'ma3c-6.6': {
        titel: 'Sinussatsen på cirkeln',
        beskrivning: 'Dra ett hörn längs den omskrivna cirkeln och se kvoten a/sin A stå stilla — den är alltid diametern.',
        fil: 'data/visualiseringar/ma3c-6.6.js'
    },
    'ma3c-6.8': {
        titel: 'Sinussatsen på cirkeln',
        beskrivning: 'Dra ett hörn längs den omskrivna cirkeln och se kvoten a/sin A stå stilla — den är alltid diametern.',
        fil: 'data/visualiseringar/ma3c-6.6.js'
    },
    'ma3c-6.2': {
        titel: 'Enhetscirkeln rullas ut',
        beskrivning: 'Dra punkten runt enhetscirkeln och se sinuskurvan rullas fram — radianer är den utrullade båglängden.',
        fil: 'data/visualiseringar/ma3c-6.2.js'
    },
    'ma4-1.2': {
        titel: 'Enhetscirkeln rullas ut',
        beskrivning: 'Dra punkten runt enhetscirkeln och se sinuskurvan rullas fram — radianer är den utrullade båglängden.',
        fil: 'data/visualiseringar/ma3c-6.2.js'
    },
    'ma4-1.5': {
        titel: 'Enhetscirkeln rullas ut',
        beskrivning: 'Dra punkten runt enhetscirkeln och se sinuskurvan rullas fram — radianer är den utrullade båglängden.',
        fil: 'data/visualiseringar/ma3c-6.2.js'
    },
    'ma4-1.8': {
        titel: 'Rektangeln bakom sin(u+v)',
        beskrivning: 'Dra i vinklarna och se sin(u+v) byggas av två riktiga linjesegment — inte av sin u + sin v.',
        fil: 'data/visualiseringar/ma4-1.8.js'
    },
    'ma4-1.9': {
        titel: 'Rektangeln bakom sin(u+v)',
        beskrivning: 'Dra i vinklarna och se sin(u+v) byggas av två riktiga linjesegment — inte av sin u + sin v.',
        fil: 'data/visualiseringar/ma4-1.8.js'
    },
    'ma4-1.10': {
        titel: 'Enhetscirkeln rullas ut',
        beskrivning: 'Dra punkten runt enhetscirkeln och se sinuskurvan rullas fram — radianer är den utrullade båglängden.',
        fil: 'data/visualiseringar/ma3c-6.2.js'
    },
    'ma3c-4.6': {
        titel: 'Extremvärdesfabriken: lådan',
        beskrivning: 'Klipp hörn ur ett kartongark och vik en låda — dina mätpunkter blir en kurva och derivatan pekar ut toppen.',
        fil: 'data/visualiseringar/ma3c-4.6.js'
    },
    'ma3c-4.7': {
        titel: 'Extremvärdesfabriken: lådan',
        beskrivning: 'Klipp hörn ur ett kartongark och vik en låda — dina mätpunkter blir en kurva och derivatan pekar ut toppen.',
        fil: 'data/visualiseringar/ma3c-4.6.js'
    },
    'ma4-2.9': {
        titel: 'Extremvärdesfabriken: lådan',
        beskrivning: 'Klipp hörn ur ett kartongark och vik en låda — dina mätpunkter blir en kurva och derivatan pekar ut toppen.',
        fil: 'data/visualiseringar/ma3c-4.6.js'
    },
    'ma3c-5.3': {
        titel: 'Riemann-kläm: arean under kurvan',
        beskrivning: 'Dra i n och se under- och översumman klämma in arean — differensen krymper mot integralens exakta värde.',
        fil: 'data/visualiseringar/ma3c-5.3.js'
    },
    'ma4-2.12': {
        titel: 'Sneda asymptoter',
        beskrivning: 'Dela upp funktionen och zooma ut ×50 — kurvan smälter ihop med sin kvotlinje när resttermen dör ut.',
        fil: 'data/visualiseringar/ma4-2.12.js'
    },
    'ma4-2.13': {
        titel: 'Sneda asymptoter',
        beskrivning: 'Dela upp funktionen och zooma ut ×50 — kurvan smälter ihop med sin kvotlinje när resttermen dör ut.',
        fil: 'data/visualiseringar/ma4-2.12.js'
    },
    'ma4-2.14': {
        titel: 'Sneda asymptoter',
        beskrivning: 'Dela upp funktionen och zooma ut ×50 — kurvan smälter ihop med sin kvotlinje när resttermen dör ut.',
        fil: 'data/visualiseringar/ma4-2.12.js'
    },
    'ma4-3.2': {
        titel: 'Riemann-kläm: arean under kurvan',
        beskrivning: 'Dra i n och se under- och översumman klämma in arean — differensen krymper mot integralens exakta värde.',
        fil: 'data/visualiseringar/ma3c-5.3.js'
    },
    'ma2c-5.4': {
        titel: 'Räknestickan',
        beskrivning: 'Multiplicera och dividera genom att skjuta log-linjaler — logaritmlagarna är mekanismen som får det att gå ihop.',
        fil: 'data/visualiseringar/ma2c-5.4.js'
    },
    'ma2c-5.5': {
        titel: 'Räknestickan',
        beskrivning: 'Multiplicera och dividera genom att skjuta log-linjaler — logaritmlagarna är mekanismen som får det att gå ihop.',
        fil: 'data/visualiseringar/ma2c-5.4.js'
    },
    'ma2c-4.12': {
        titel: 'Kordasatsen',
        beskrivning: 'Dra i två kordor och se att produkten av delsträckorna alltid är densamma — rektangeln vägrar ändra area.',
        fil: 'data/visualiseringar/ma2c-4.12.js'
    },
    'ma2c-6.5': {
        titel: 'Galtonbrädan',
        beskrivning: 'Se hur slumpmässiga kulstudsar bygger upp normalfördelningens klockform — och testa 68–95-regeln på dina egna kulor.',
        fil: 'data/visualiseringar/ma2c-6.5.js'
    },
    'ma3c-3.1': {
        titel: 'Rita derivatan själv',
        beskrivning: 'Gissa lutningskurvan innan facit avslöjas — se f′(x) växa fram punkt för punkt.',
        fil: 'data/visualiseringar/ma3c-3.1.js'
    },
    'ma3c-3.2': {
        titel: 'Rita derivatan själv',
        beskrivning: 'Gissa lutningskurvan innan facit avslöjas — se f′(x) växa fram punkt för punkt.',
        fil: 'data/visualiseringar/ma3c-3.1.js'
    },
    'ma4-2.5': {
        titel: 'Rita derivatan själv',
        beskrivning: 'Rita din gissning och se cos x uppenbara sig ur sin x, punkt för punkt.',
        fil: 'data/visualiseringar/ma3c-3.1.js'
    },
    'ma3c-3.4': {
        titel: 'Hitta talet e',
        beskrivning: 'Dra i basen a och jämför aˣ med sin derivata tills kvoten blir 1 — då har du hittat e.',
        fil: 'data/visualiseringar/ma3c-3.4.js'
    },
    'ma3c-3.5': {
        titel: 'Hitta talet e',
        beskrivning: 'Dra i basen a och jämför aˣ med sin derivata tills kvoten blir 1 — då har du hittat e.',
        fil: 'data/visualiseringar/ma3c-3.4.js'
    },
    'ma1c-3.2': {
        titel: 'Faktorkedjan',
        beskrivning: 'Gissa om +20 % och −20 % tar dig tillbaka till start — och bygg egna kedjor av förändringsfaktorer.',
        fil: 'data/visualiseringar/ma1c-3.2.js'
    },
    'ma1c-3.3': {
        titel: 'Faktorkedjan',
        beskrivning: 'Gissa om +20 % och −20 % tar dig tillbaka till start — och se upprepad ränta växa exponentiellt.',
        fil: 'data/visualiseringar/ma1c-3.2.js'
    },
    'ma1c-6.5': {
        titel: 'Vektorpromenaden',
        beskrivning: 'Dra vektorerna och gå promenaden spets till svans — byt ordning och se resultanten stå still.',
        fil: 'data/visualiseringar/ma1c-6.5.js'
    },
    'ma1c-6.6': {
        titel: 'Vektorpromenaden',
        beskrivning: 'Dra vektorerna och gå promenaden spets till svans — byt ordning och se resultanten stå still.',
        fil: 'data/visualiseringar/ma1c-6.5.js'
    },
    'ma1c-6.7': {
        titel: 'Vektorpromenaden',
        beskrivning: 'Subtraktion är att gå baklänges: vänd v till −v och se kedjan ge u − v.',
        fil: 'data/visualiseringar/ma1c-6.5.js'
    },
    'ma1c-6.8': {
        titel: 'Vektorpromenaden',
        beskrivning: 'Komposant-trappan och Pythagoras ger vektorns längd — dra och se formeln räkna live.',
        fil: 'data/visualiseringar/ma1c-6.5.js'
    },
    'ma1c-5.3': {
        titel: 'Korrelationens lekplats',
        beskrivning: 'Dra i punkterna och se r ändras live — r mäter bara räta linjer, och korrelation bevisar inte orsak.',
        fil: 'data/visualiseringar/ma1c-5.3.js'
    },
    'ma1c-5.4': {
        titel: 'Tärningsverkstaden',
        beskrivning: 'Utforska utfallsrummet för två tärningar och se den relativa frekvensen stabiliseras mot den klassiska sannolikheten.',
        fil: 'data/visualiseringar/ma1c-5.4.js'
    },
    'ma1c-5.5': {
        titel: 'Tärningsverkstaden',
        beskrivning: 'Utforska utfallsrummet för två tärningar och se den relativa frekvensen stabiliseras mot den klassiska sannolikheten.',
        fil: 'data/visualiseringar/ma1c-5.4.js'
    },
    'ma2c-6.6': {
        titel: 'Minsta kvadratmetoden',
        beskrivning: 'Dra din egen linje mot punkterna, se avvikelserna som riktiga kvadrater och låt regressionslinjen minimera dem.',
        fil: 'data/visualiseringar/ma2c-6.6.js'
    },
    'ma2c-6.7': {
        titel: 'Minsta kvadratmetoden',
        beskrivning: 'Dra din egen linje mot punkterna, se avvikelserna som riktiga kvadrater och låt regressionslinjen minimera dem.',
        fil: 'data/visualiseringar/ma2c-6.6.js'
    },
    'ma3c-5.7': {
        titel: 'Integralen som resemätare',
        beskrivning: 'Forma v(t)-kurvan och kör bilen — arean blir sträckan, och en nollintegral betyder tillbaka vid start.',
        fil: 'data/visualiseringar/ma3c-5.7.js'
    },
    'ma4-3.5': {
        titel: 'Integralen som resemätare',
        beskrivning: 'Forma v(t)-kurvan och kör bilen — arean blir sträckan, och en nollintegral betyder tillbaka vid start.',
        fil: 'data/visualiseringar/ma3c-5.7.js'
    },
    'ma3c-5.4': {
        titel: 'Arean har en lutning',
        beskrivning: 'Dra x-markören och se den ackumulerade arean A(x) växa i takt med f(x) — fundamentalsatsen i praktiken.',
        fil: 'data/visualiseringar/ma3c-5.4.js'
    },
    'ma2c-3.1': {
        titel: 'Parabelns tre klädnader',
        beskrivning: 'Dra i nollställena, extrempunkten eller y-skärningen — samma parabel, tre skrivsätt som uppdateras live.',
        fil: 'data/visualiseringar/ma2c-3.1.js'
    },
    'ma2c-3.2': {
        titel: 'Parabelns tre klädnader',
        beskrivning: 'Dra i nollställena, extrempunkten eller y-skärningen — samma parabel, tre skrivsätt som uppdateras live.',
        fil: 'data/visualiseringar/ma2c-3.1.js'
    },
    'ma2c-3.3': {
        titel: 'Parabelns tre klädnader',
        beskrivning: 'Dra i nollställena, extrempunkten eller y-skärningen — samma parabel, tre skrivsätt som uppdateras live.',
        fil: 'data/visualiseringar/ma2c-3.1.js'
    },
    'ma2c-2.8': {
        titel: 'Rotekvationens falska rot',
        beskrivning: 'Kvadrera en rotekvation och se en extra, falsk rot dyka upp — prövningen i originalet avslöjar den.',
        fil: 'data/visualiseringar/ma2c-2.8.js'
    },
    'ma2c-4.5': {
        titel: 'Pythagoras areapussel',
        beskrivning: 'Pussla ihop kvadraterna på kateterna till kvadraten på hypotenusan — det går bara ihop vid rät vinkel.',
        fil: 'data/visualiseringar/ma2c-4.5.js'
    },
    'ma2c-4.10': {
        titel: 'SSA-tvetydigheten',
        beskrivning: 'Sväng en cirkel mot en stråle: samma tre mått ger ibland noll, en eller två trianglar.',
        fil: 'data/visualiseringar/ma2c-4.10.js'
    },
    'ma2c-4.11': {
        titel: 'Randvinkeljakten',
        beskrivning: 'Dra punkten P längs cirkeln och se randvinkeln stå stilla — och testa diameterfallet där den alltid blir 90°.',
        fil: 'data/visualiseringar/ma2c-4.11.js'
    },
    'ma2c-2.4': {
        titel: 'Kvadratkomplettering som bygge',
        beskrivning: 'Vik px-remsan runt hörnet och se vad som fattas — fyll gapet steg för steg fram till pq-formeln.',
        fil: 'data/visualiseringar/ma2c-2.4.js'
    },
    'ma2c-2.5': {
        titel: 'Kvadratkomplettering som bygge',
        beskrivning: 'Vik px-remsan runt hörnet och se vad som fattas — fyll gapet steg för steg fram till pq-formeln.',
        fil: 'data/visualiseringar/ma2c-2.4.js'
    },
    'ma2c-2.6': {
        titel: 'Diskriminantens gränsland',
        beskrivning: 'Dra q uppåt och se rötterna glida ihop till en dubbelrot — och sedan vika av vinkelrätt ut i det komplexa talplanet.',
        fil: 'data/visualiseringar/ma2c-2.6.js'
    },
    'ma4-4.3': {
        titel: 'Diskriminantens gränsland',
        beskrivning: 'Dra q uppåt och se rötterna glida ihop till en dubbelrot — och sedan vika av vinkelrätt ut i det komplexa talplanet.',
        fil: 'data/visualiseringar/ma2c-2.6.js'
    },
    'ma4-1.14': {
        titel: 'En vektor blir en sinuskurva',
        beskrivning: 'Dra i vektorn (a, b) och se att a·sin x + b·cos x alltid blir en enda sinuskurva med amplitud c.',
        fil: 'data/visualiseringar/ma4-1.14.js'
    },
    'ma4-2.3': {
        titel: 'Kedjeregeln: tre tallinjer',
        beskrivning: 'Dra punkten och se x avbildas via u = g(x) till y = f(u) — förstoringsfaktorerna multipliceras.',
        fil: 'data/visualiseringar/ma4-2.3.js'
    },
    'ma4-2.4': {
        titel: 'Kedjeregeln: tre tallinjer',
        beskrivning: 'Dra punkten och se x avbildas via u = g(x) till y = f(u) — förstoringsfaktorerna multipliceras.',
        fil: 'data/visualiseringar/ma4-2.3.js'
    },
    'ma4-2.7': {
        titel: 'Produktregelns rektangel',
        beskrivning: 'Dra x och Δx och se de två remsorna och hörnet växa — hörnets andel rasar mot noll när Δx krymper.',
        fil: 'data/visualiseringar/ma4-2.7.js'
    },
    'ma4-3.7': {
        titel: 'Rotationskroppar steg för steg',
        beskrivning: 'Se ett område svepa ut en rotationskropp av tunna cylinderskivor — och hur summan blir en integral.',
        fil: 'data/visualiseringar/ma4-3.7.js'
    },
    'ma4-3.8': {
        titel: 'Rotationskroppar steg för steg',
        beskrivning: 'Se ett område svepa ut en rotationskropp av tunna cylinderskivor — och hur summan blir en integral.',
        fil: 'data/visualiseringar/ma4-3.7.js'
    },
    'ma4-4.5': {
        titel: 'Multiplikation och de Moivre',
        beskrivning: 'Dra visarna z och w och se multiplikationen vrida och skala — och hur lösningarna till zⁿ = w bildar en regelbunden n-hörning.',
        fil: 'data/visualiseringar/ma4-4.5.js'
    },
    'ma4-4.6': {
        titel: 'Multiplikation och de Moivre',
        beskrivning: 'Dra visarna z och w och se multiplikationen vrida och skala — och hur lösningarna till zⁿ = w bildar en regelbunden n-hörning.',
        fil: 'data/visualiseringar/ma4-4.5.js'
    },
    'ma4-4.7': {
        titel: 'Multiplikation och de Moivre',
        beskrivning: 'Dra visarna z och w och se multiplikationen vrida och skala — och hur lösningarna till zⁿ = w bildar en regelbunden n-hörning.',
        fil: 'data/visualiseringar/ma4-4.5.js'
    },
    'ma4-4.8': {
        titel: 'Multiplikation och de Moivre',
        beskrivning: 'Dra visarna z och w och se multiplikationen vrida och skala — och hur lösningarna till zⁿ = w bildar en regelbunden n-hörning.',
        fil: 'data/visualiseringar/ma4-4.5.js'
    },
    'ma4-4.9': {
        titel: 'Multiplikation och de Moivre',
        beskrivning: 'Dra visarna z och w och se multiplikationen vrida och skala — och hur lösningarna till zⁿ = w bildar en regelbunden n-hörning.',
        fil: 'data/visualiseringar/ma4-4.5.js'
    },
    'ma3c-6.3': {
        titel: 'Trig-ekvationens lösningar',
        beskrivning: 'Dra linjen y = a och se de två lösningsfamiljerna dyka upp i cirkeln och grafen — och vad som händer när de smälter samman eller försvinner.',
        fil: 'data/visualiseringar/ma3c-6.3.js'
    },
    'ma3c-6.4': {
        titel: 'Trig-ekvationens lösningar',
        beskrivning: 'Dra linjen y = a och se de två lösningsfamiljerna dyka upp i cirkeln och grafen — och vad som händer när de smälter samman eller försvinner.',
        fil: 'data/visualiseringar/ma3c-6.3.js'
    },
    'ma4-1.3': {
        titel: 'Trig-ekvationens lösningar',
        beskrivning: 'Dra linjen y = a och se de två lösningsfamiljerna dyka upp i cirkeln och grafen — och vad som händer när de smälter samman eller försvinner.',
        fil: 'data/visualiseringar/ma3c-6.3.js'
    },
    'ma4-1.4': {
        titel: 'Trig-ekvationens lösningar',
        beskrivning: 'Dra linjen y = a och se de två lösningsfamiljerna dyka upp i cirkeln och grafen — och vad som händer när de smälter samman eller försvinner.',
        fil: 'data/visualiseringar/ma3c-6.3.js'
    },
    'ma4-3.6': {
        titel: 'Täthetsfunktionen föds ur histogrammet',
        beskrivning: 'Krymp klassbredden tills histogrammet smälter samman med kurvan — och se att sannolikhet är arean under den, inte höjden.',
        fil: 'data/visualiseringar/ma4-3.6.js'
    },
    'ma4-4.10': {
        titel: 'Puffen som blir en cirkel',
        beskrivning: 'En vinkelrät puff ändrar aldrig avståndet till origo — det är därför eⁱᵛ blir en cirkelrörelse.',
        fil: 'data/visualiseringar/ma4-4.10.js'
    }
};

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
    'ma4-1.10': {
        titel: 'Enhetscirkeln rullas ut',
        beskrivning: 'Dra punkten runt enhetscirkeln och se sinuskurvan rullas fram — radianer är den utrullade båglängden.',
        fil: 'data/visualiseringar/ma3c-6.2.js'
    },
    'ma3c-5.3': {
        titel: 'Riemann-kläm: arean under kurvan',
        beskrivning: 'Dra i n och se under- och översumman klämma in arean — differensen krymper mot integralens exakta värde.',
        fil: 'data/visualiseringar/ma3c-5.3.js'
    },
    'ma4-3.2': {
        titel: 'Riemann-kläm: arean under kurvan',
        beskrivning: 'Dra i n och se under- och översumman klämma in arean — differensen krymper mot integralens exakta värde.',
        fil: 'data/visualiseringar/ma3c-5.3.js'
    },
    'ma2c-6.5': {
        titel: 'Galtonbrädan',
        beskrivning: 'Se hur slumpmässiga kulstudsar bygger upp normalfördelningens klockform — och testa 68–95-regeln på dina egna kulor.',
        fil: 'data/visualiseringar/ma2c-6.5.js'
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
    'ma2c-4.11': {
        titel: 'Randvinkeljakten',
        beskrivning: 'Dra punkten P längs cirkeln och se randvinkeln stå stilla — och testa diameterfallet där den alltid blir 90°.',
        fil: 'data/visualiseringar/ma2c-4.11.js'
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
    }
};

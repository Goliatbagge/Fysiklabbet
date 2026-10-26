/* i18n/nb/sidor/fysik1-hiss-app.js — norska (bokmål) för simuleringen
 * Krafter i hissen. Text som byggs ihop i koden (förklaringarna i
 * gissa-panelen, ledtråden, poängen, våningsrubriken) översätts med
 * I18N.t i HTML-filen; nycklarna står här. */
(function () {
    var SH = '­';   // mjukt bindestreck, som i formelkortets etiketter
    var D = {
        'Krafter i hissen — Fysiklabbet': 'Krefter i heisen — Fysiklabbet',
        'Krafter i hissen — Fysik nivå 1': 'Krefter i heisen — Fysikk nivå 1',
        'Åk hiss med en person på en kraftplatta och se tyngdkraften, normalkraften, den resulterande kraften och accelerationen i varje del av färden. Kraftplattans mätning ritas som en graf, precis som i laborationen, och du kan förutsäga vad plattan visar innan du ser det.':
            'Ta heisen med en person som står på en kraftplate, og se tyngdekraften, normalkraften, resultantkraften og akselerasjonen i hver del av turen. Målingen fra kraftplaten tegnes som en graf, akkurat som i labøvelsen, og du kan forutsi hva platen viser før du ser det.',
        '/ Krafter i hissen': '/ Krefter i heisen',
        'Krafter i hissen': 'Krefter i heisen',

        // Ingressen
        'En person står på en kraftplatta i en hiss, precis som i laborationen. Två krafter verkar på personen:':
            'En person står på en kraftplate i en heis, akkurat som i labøvelsen. To krefter virker på personen:',
        'tyngdkraften': 'tyngdekraften',
        'nedåt och': 'nedover og',
        'normalkraften': 'normalkraften',
        'från plattan uppåt. Det är normalkraften plattan mäter, och det är den du känner som din tyngd. Tryck på en våningsknapp och följ krafterna, den resulterande kraften och accelerationen genom hela färden. Slå på Gissa först om du vill förutsäga vad plattan visar innan du får se det.':
            'fra platen oppover. Det er normalkraften platen måler, og det er den du kjenner som tyngden din. Trykk på en etasjeknapp og følg kreftene, resultantkraften og akselerasjonen gjennom hele turen. Slå på Gjett først hvis du vil forutsi hva platen viser før du får se det.',

        // Formelkortet
        'Resulterande kraft': 'Resultantkraft',
        'Massa': 'Masse',
        'Positiv riktning uppåt': 'Positiv retning oppover',

        // Scenen
        'Hissen står stilla': 'Heisen står stille',
        'Hissen ökar farten uppåt': 'Heisen øker farten oppover',
        'Hissen åker uppåt med konstant fart': 'Heisen kjører oppover med konstant fart',
        'Hissen bromsar in på väg upp': 'Heisen bremser på vei opp',
        'Hissen ökar farten nedåt': 'Heisen øker farten nedover',
        'Hissen åker nedåt med konstant fart': 'Heisen kjører nedover med konstant fart',
        'Hissen bromsar in på väg ner': 'Heisen bremser på vei ned',
        'Linan har gått av: hissen faller fritt': 'Vaieren har røket: heisen faller fritt',
        'Fångapparaten bromsar hissen': 'Fanganordningen bremser heisen',
        'Hissen har fastnat mellan våningarna': 'Heisen har satt seg fast mellom etasjene',
        'Hissen står stilla längst ner': 'Heisen står stille nederst',
        'Hissen står stilla högst upp': 'Heisen står stille øverst',
        'Hissen står stilla på våning {n}': 'Heisen står stille i etasje {n}',
        'Hissen har stannat': 'Heisen har stoppet',
        'Positiv riktning är uppåt': 'Positiv retning er oppover',
        'Accelerationen är riktad uppåt': 'Akselerasjonen er rettet oppover',
        'Accelerationen är riktad nedåt': 'Akselerasjonen er rettet nedover',
        'Ingen acceleration: hastigheten ändras inte': 'Ingen akselerasjon: hastigheten endres ikke',
        'KRAFTPLATTA': 'KRAFTPLATE',
        'NORMALKRAFT (N)': 'NORMALKRAFT (N)',
        'Jag känner mig': 'Jeg føler meg',
        'tung': 'tung',
        'normal': 'normal',
        'lätt': 'lett',
        'tyngdlös': 'vektløs',
        'mycket tung': 'veldig tung',
        'UPPLEVD TYNGD': 'OPPLEVD TYNGDE',
        'En personvåg skulle visa': 'En personvekt ville vise',
        'ÅK TILL VÅNING': 'KJØR TIL ETASJE',
        'Åk till våning {n}': 'Kjør til etasje {n}',

        // Grafen
        'Normalkraft': 'Normalkraft',
        '(N), mätt med kraftplattan': '(N), målt med kraftplaten',
        'Acceleration': 'Akselerasjon',
        '(m/s²), positiv riktning uppåt': '(m/s²), positiv retning oppover',
        'Hastighet': 'Hastighet',
        '(m/s), positiv riktning uppåt': '(m/s), positiv retning oppover',

        // Gissa-panelen
        'FACIT': 'FASIT',
        'FÖRUTSÄG INNAN DU SER MÄTNINGEN': 'FORUTSI FØR DU SER MÅLINGEN',
        '{r} av {n} rätt': '{r} av {n} riktige',
        'Hur stor är normalkraften': 'Hvor stor er normalkraften',
        'jämfört med tyngdkraften': 'sammenlignet med tyngdekraften',
        'Större än': 'Større enn',
        'Lika med': 'Lik',
        'Mindre än': 'Mindre enn',
        'Noll': 'Null',
        'Ledtråd: titta på hur hastigheten ändras, inte på åt vilket håll hissen åker. Accelerationen och den resulterande kraften pekar åt samma håll som förändringen.':
            'Tips: se på hvordan hastigheten endrer seg, ikke på hvilken vei heisen kjører. Akselerasjonen og resultantkraften peker samme vei som endringen.',
        'Rätt svar.': 'Riktig svar.',
        'Inte riktigt. Rätt svar är {svar}.': 'Ikke helt. Riktig svar er {svar}.',

        // Förklaringarna (radbryts i koden; F_N, F_G och F_R ritas med index)
        'Hastigheten ändras inte, den är noll hela tiden. Då är a = 0 och den resulterande kraften är noll, så normalkraften är exakt lika stor som tyngdkraften. Du känner dig normal.':
            'Hastigheten endres ikke, den er null hele tiden. Da er a = 0 og resultantkraften er null, så normalkraften er nøyaktig like stor som tyngdekraften. Du føler deg normal.',
        'Hastigheten ökar uppåt, från 0 mot ett positivt värde, så accelerationen är riktad uppåt. Då måste den resulterande kraften också peka uppåt: plattan trycker hårdare än tyngdkraften drar, F_N > F_G, och du känner dig tung.':
            'Hastigheten øker oppover, fra 0 mot en positiv verdi, så akselerasjonen er rettet oppover. Da må resultantkraften også peke oppover: platen presser hardere enn tyngdekraften drar, F_N > F_G, og du føler deg tung.',
        'Hastigheten är konstant, så a = 0 och F_R = 0. Normalkraften är då lika stor som tyngdkraften. Att hissen rör sig uppåt spelar ingen roll, det är bara förändringen av hastigheten som märks. Du känner dig normal.':
            'Hastigheten er konstant, så a = 0 og F_R = 0. Normalkraften er da like stor som tyngdekraften. At heisen beveger seg oppover, spiller ingen rolle, det er bare endringen i hastigheten som merkes. Du føler deg normal.',
        'Hissen är på väg uppåt men hastigheten minskar, så accelerationen är riktad nedåt. Den resulterande kraften pekar nedåt: plattan trycker svagare än tyngdkraften drar, F_N < F_G, och du känner dig lätt.':
            'Heisen er på vei oppover, men hastigheten minker, så akselerasjonen er rettet nedover. Resultantkraften peker nedover: platen presser svakere enn tyngdekraften drar, F_N < F_G, og du føler deg lett.',
        'Hastigheten går från 0 mot allt mer negativa värden. Den minskar alltså, och accelerationen är riktad nedåt. F_R pekar nedåt, så F_N < F_G och du känner dig lätt.':
            'Hastigheten går fra 0 mot stadig mer negative verdier. Den minker altså, og akselerasjonen er rettet nedover. F_R peker nedover, så F_N < F_G og du føler deg lett.',
        'Hastigheten är konstant, så a = 0 och F_R = 0. Normalkraften är lika stor som tyngdkraften trots att hissen åker nedåt. Du känner dig normal.':
            'Hastigheten er konstant, så a = 0 og F_R = 0. Normalkraften er like stor som tyngdekraften selv om heisen kjører nedover. Du føler deg normal.',
        'Hissen rör sig nedåt men hastigheten går från ett negativt värde mot 0. Hastigheten ökar alltså, och accelerationen är riktad uppåt. F_R pekar uppåt, så F_N > F_G och du känner dig tung. Det är därför det känns i knäna när hissen stannar längst ner.':
            'Heisen beveger seg nedover, men hastigheten går fra en negativ verdi mot 0. Hastigheten øker altså, og akselerasjonen er rettet oppover. F_R peker oppover, så F_N > F_G og du føler deg tung. Det er derfor du kjenner det i knærne når heisen stopper nederst.',
        'Du och hissen faller tillsammans med accelerationen a = −g. Hela tyngdkraften går åt till att ge dig den accelerationen, F_R = F_G, så plattan behöver inte trycka alls: F_N = 0. Tyngdkraften finns kvar, men du känner dig tyngdlös. Den lilla knuff du får av benen när linan går av räcker för att du ska lyfta från plattan och sväva fritt i hissen.':
            'Du og heisen faller sammen med akselerasjonen a = −g. Hele tyngdekraften går med til å gi deg den akselerasjonen, F_R = F_G, så platen trenger ikke å presse i det hele tatt: F_N = 0. Tyngdekraften er der fortsatt, men du føler deg vektløs. Det lille dyttet du får fra beina når vaieren ryker, er nok til at du letter fra platen og svever fritt i heisen.',
        'Hissen rör sig nedåt men bromsas hårt, så accelerationen är riktad uppåt och stor. Normalkraften blir mycket större än tyngdkraften, och du känner dig mycket tung.':
            'Heisen beveger seg nedover, men bremses kraftig, så akselerasjonen er rettet oppover og er stor. Normalkraften blir mye større enn tyngdekraften, og du føler deg veldig tung.',

        // Inställningsrutan och sidopanelen
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'och': 'og',
        'Resultant': 'Resultant',
        'Graf': 'Graf',
        'Gissa först': 'Gjett først',
        'Färdiga försök': 'Ferdige forsøk',
        'Hela labben': 'Hele labøvelsen',
        'Linan brister': 'Vaieren ryker',
        'Labbens nio lägen': 'Labøvelsens ni situasjoner',
        'Åk till våning': 'Kjør til etasje',
        'Våningsknappar': 'Etasjeknapper',
        'Hissen är ur funktion efter att linan gått av. Tryck Börja om.': 'Heisen er ute av drift etter at vaieren røk. Trykk Start på nytt.',
        'Trycker du på flera knappar åker hissen till våningarna i tur och ordning.': 'Trykker du på flere knapper, kjører heisen til etasjene i tur og orden.',
        'Hela labben: upp och ner': 'Hele labøvelsen: opp og ned',
        'Linan brister (teoretiskt)': 'Vaieren ryker (teoretisk)',
        'Stilla längst ner': 'Stille nederst',
        'Största acceleration upp': 'Største akselerasjon opp',
        'Konstant hastighet upp': 'Konstant hastighet opp',
        'Bromsar som mest, väg upp': 'Bremser mest, på vei opp',
        'Stilla högst upp': 'Stille øverst',
        'Största acceleration ner': 'Største akselerasjon ned',
        'Konstant hastighet ner': 'Konstant hastighet ned',
        'Bromsar som mest, väg ner': 'Bremser mest, på vei ned',
        'Faller fritt (teoretiskt)': 'Faller fritt (teoretisk)',
        'Hissen står stilla längst ner. Läs av normalkraften: den är lika stor som tyngdkraften.': 'Heisen står stille nederst. Les av normalkraften: den er like stor som tyngdekraften.',
        'Hissen har just startat uppåt och har sin största acceleration. Jämför normalkraften med tyngdkraften.': 'Heisen har akkurat startet oppover og har sin største akselerasjon. Sammenlign normalkraften med tyngdekraften.',
        'Hissen åker uppåt med konstant hastighet. Stämmer känslan med det du väntade dig?': 'Heisen kjører oppover med konstant hastighet. Stemmer følelsen med det du ventet?',
        'Hissen närmar sig översta våningen och bromsar in som mest.': 'Heisen nærmer seg øverste etasje og bremser som mest.',
        'Hissen står stilla högst upp. Är normalkraften annorlunda än längst ner?': 'Heisen står stille øverst. Er normalkraften annerledes enn nederst?',
        'Hissen har just startat nedåt och har sin största acceleration.': 'Heisen har akkurat startet nedover og har sin største akselerasjon.',
        'Hissen åker nedåt med konstant hastighet.': 'Heisen kjører nedover med konstant hastighet.',
        'Hissen närmar sig bottenvåningen och bromsar in som mest.': 'Heisen nærmer seg nederste etasje og bremser som mest.',
        'Linan har gått av och hissen faller fritt, ett tänkt fall. Fångapparaten tar sedan emot hissen.': 'Vaieren har røket og heisen faller fritt, et tenkt tilfelle. Fanganordningen tar deretter imot heisen.',
        'Tryck Fortsätt för att köra vidare.': 'Trykk Fortsett for å kjøre videre.',
        'Samma nio lägen som i laborationen. Ett klick fryser bilden i just det läget, med mätningen fram till dess i grafen.':
            'De samme ni situasjonene som i labøvelsen. Et klikk fryser bildet i akkurat den situasjonen, med målingen fram til da i grafen.',
        'Newtons andra lag just nu': 'Newtons andre lov akkurat nå',
        'Svara på frågan i scenen först, så visas uträkningen.': 'Svar på spørsmålet i scenen først, så vises utregningen.',
        'Den resulterande kraften är noll, så personen har ingen acceleration.': 'Resultantkraften er null, så personen har ingen akselerasjon.',
        'är lika stor som': 'er like stor som',
        'Den resulterande kraften och accelerationen är riktade': 'Resultantkraften og akselerasjonen er rettet',
        'uppåt': 'oppover',
        'nedåt': 'nedover',
        '. Normalkraften är': '. Normalkraften er',
        'större': 'større',
        'mindre': 'mindre',
        'än tyngdkraften, så personen känner sig': 'enn tyngdekraften, så personen føler seg',
        'hastighet': 'hastighet',
        'höjd över bottenvåningen': 'høyde over nederste etasje',
        'rätta gissningar': 'riktige gjetninger',
        '{r} av {n}': '{r} av {n}',
        'Personens massa (': 'Personens masse (',
        'Största acceleration': 'Største akselerasjon',
        'Toppfart': 'Toppfart',
        'Tempo': 'Tempo',
        'Skriv in värde': 'Skriv inn verdi',
        'En vanlig hiss accelererar med ungefär 1 m/s² och har en toppfart på 1 till 2,5 m/s. Ändrad acceleration och toppfart gäller från nästa resa.':
            'En vanlig heis akselererer med omtrent 1 m/s² og har en toppfart på 1 til 2,5 m/s. Endret akselerasjon og toppfart gjelder fra neste tur.',

        // Förklarande avsnitt
        'Det är normalkraften du känner': 'Det er normalkraften du kjenner',
        'Tyngdkraften': 'Tyngdekraften',
        'är lika stor under hela resan. Det som ändras är hur hårt golvet trycker upp mot dina fötter, alltså normalkraften':
            'er like stor under hele turen. Det som endres, er hvor hardt gulvet presser opp mot føttene dine, altså normalkraften',
        '. Den kraften känner du i fötterna och knäna, och den är det en våg eller en kraftplatta mäter. Därför känns du tung när':
            '. Den kraften kjenner du i føttene og knærne, og det er den en vekt eller en kraftplate måler. Derfor føler du deg tung når',
        'är större än': 'er større enn',
        'och lätt när den är mindre.': 'og lett når den er mindre.',
        'Accelerationen avgör, inte rörelsen': 'Akselerasjonen avgjør, ikke bevegelsen',
        'Med positiv riktning uppåt ger Newtons andra lag': 'Med positiv retning oppover gir Newtons andre lov',
        '. Om hissen åker uppåt eller nedåt spelar ingen roll, bara åt vilket håll hastigheten ändras. En hiss som startar uppåt och en hiss som bromsar in på väg ner har båda accelerationen riktad uppåt, och i båda känner du dig tung. Med konstant fart är':
            '. Det spiller ingen rolle om heisen kjører oppover eller nedover, bare hvilken vei hastigheten endres. En heis som starter oppover, og en heis som bremser på vei ned, har begge akselerasjonen rettet oppover, og i begge føler du deg tung. Med konstant fart er',
        '= 0 och allt känns som vanligt.': '= 0, og alt føles som vanlig.',
        'Fritt fall: tyngdlös men inte viktlös': 'Fritt fall: vektløs, men ikke uten tyngdekraft',
        'Om linan går av faller hissen och du med accelerationen': 'Hvis vaieren ryker, faller heisen og du med akselerasjonen',
        'nedåt. Då räcker tyngdkraften ensam för att ge dig den accelerationen, och plattan behöver inte trycka alls:':
            'nedover. Da er tyngdekraften alene nok til å gi deg den akselerasjonen, og platen trenger ikke å presse i det hele tatt:',
        '= 0. Minsta knuff räcker för att du ska lyfta från golvet och sväva i hissen. Tyngdkraften är precis lika stor som förut, men du känner den inte. Samma sak gäller astronauterna i rymdstationen, som faller fritt runt jorden hela tiden. En riktig hiss har en fångapparat som griper tag i skenorna och bromsar.':
            '= 0. Det minste dyttet er nok til at du letter fra gulvet og svever i heisen. Tyngdekraften er nøyaktig like stor som før, men du kjenner den ikke. Det samme gjelder astronautene på romstasjonen, som faller fritt rundt jorden hele tiden. En ekte heis har en fanganordning som griper tak i skinnene og bremser.',
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”När hissen åker uppåt känner man sig tung.”': '«Når heisen kjører oppover, føler man seg tung.»',
        'Bara medan den ökar farten. När den åker uppåt med konstant fart är normalkraften lika stor som tyngdkraften, och när den bromsar in på väg upp känner man sig lätt.':
            'Bare mens den øker farten. Når den kjører oppover med konstant fart, er normalkraften like stor som tyngdekraften, og når den bremser på vei opp, føler man seg lett.',
        '”Tyngdkraften ändras när hissen accelererar.”': '«Tyngdekraften endres når heisen akselererer.»',
        'Nej,': 'Nei,',
        'är densamma hela tiden. Det är normalkraften som ändras, och det är den plattan visar.': 'er den samme hele tiden. Det er normalkraften som endres, og det er den platen viser.',
        '”Bromsar hissen är accelerationen negativ.”': '«Når heisen bremser, er akselerasjonen negativ.»',
        'Det beror på åt vilket håll den åker. Bromsar den på väg ner går hastigheten från ett negativt värde mot noll, den ökar alltså, och accelerationen är positiv. Jämför med exemplet om hissen i genomgången Accelerationens riktning.':
            'Det kommer an på hvilken vei den kjører. Bremser den på vei ned, går hastigheten fra en negativ verdi mot null, den øker altså, og akselerasjonen er positiv. Sammenlign med eksempelet om heisen i gjennomgangen Akselerasjonens retning.',
        '”I fritt fall finns ingen tyngdkraft.”': '«I fritt fall finnes det ingen tyngdekraft.»',
        'Tyngdkraften finns kvar och är lika stor. Det är normalkraften som försvinner, och därför känns det som om man saknar tyngd.':
            'Tyngdekraften er der fortsatt og er like stor. Det er normalkraften som forsvinner, og derfor føles det som om man er uten tyngde.'
    };
    // Formelkortets etiketter har mjukt bindestreck
    D['Normal' + SH + 'kraft'] = 'Normal' + SH + 'kraft';
    D['Tyngd' + SH + 'kraft'] = 'Tyngde' + SH + 'kraft';
    D['Accele' + SH + 'ration'] = 'Akselera' + SH + 'sjon';
    I18N.add(D);
})();

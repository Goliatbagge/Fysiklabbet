/* i18n/nb/sidor/fysik1-varme-app.js — norska (bokmål) för simuleringen
 * Värmeflöde. */
(function () {
    var NB = ' ';
    I18N.add({
        'Värmeflöde — Fysiklabbet': 'Varmestrøm — Fysiklabbet',
        'Värmeflöde — Fysik nivå 1': 'Varmestrøm — Fysikk nivå 1',
        'Kroppen alstrar ca 100 W som måste bort. Se hur värmeflödet från huden beror på lufttemperaturen — och varför 22 °C känns lagom men 36 °C känns hett.':
            'Kroppen produserer omtrent 100 W som må bort. Se hvordan varmestrømmen fra huden avhenger av lufttemperaturen, og hvorfor 22 °C føles passe mens 36 °C føles hett.',
        '/ Värmeflöde': '/ Varmestrøm',
        'Värmeflöde': 'Varmestrøm',

        // Ingressen och formelkortet
        'Kroppen alstrar hela tiden ungefär 100 W värme som måste bort. Värmeutbytet med rummet går åt båda hållen — huden strålar ut och rummet strålar in — och det är nettot av de två flödena du känner som kallt eller varmt.':
            'Kroppen produserer hele tiden omtrent 100' + NB + 'W varme som må bort. Varmeutvekslingen med rommet går begge veier: huden stråler ut, og rommet stråler inn. Det er nettoresultatet av de to strømmene du kjenner som kaldt eller varmt.',
        'Nettoflöde': 'Nettostrøm',
        'Ut från huden': 'Ut fra huden',
        'In från rummet': 'Inn fra rommet',

        // Inställningar
        'Luftens temperatur': 'Lufttemperatur',
        'Hudens temperatur ligger fast på {t} — kroppen håller den konstant.':
            'Hudtemperaturen ligger fast på {t}. Kroppen holder den konstant.',
        'Visa upplevelse': 'Vis opplevelse',
        'Visningsläge': 'Visningsmodus',
        'Alla värmeflöden': 'Alle varmestrømmer',
        'Alstrat mot avgivet': 'Produsert mot avgitt',
        'Visa alla värmeflöden': 'Vis alle varmestrømmer',
        'Jämför alstrad och avgiven värme': 'Sammenlign produsert og avgitt varme',
        'Visar utbytet åt båda hållen: värmen huden strålar ut, värmen rummet strålar in mot dig och den som måste avdunsta.':
            'Viser utvekslingen begge veier: varmen huden stråler ut, varmen rommet stråler inn mot deg og den som må fordampe.',
        'Jämför den streckade pilen (värmen som måste bort) med den ifyllda (nettot som luften faktiskt tar emot).':
            'Sammenlign den stiplede pilen (varmen som må bort) med den heltrukne (nettostrømmen som luften faktisk tar imot).',

        // Scenen
        'Huden strålar ut ≈ {p}': 'Huden stråler ut ≈ {p}',
        'Rummet strålar in ≈ {p}': 'Rommet stråler inn ≈ {p}',
        'Avdunstning {p}': 'Fordamping {p}',
        'Netto: {p} ut': 'Netto: {p} ut',
        'Netto: {p} in': 'Netto: {p} inn',
        'Netto: {p}': 'Netto: {p}',
        'Ämnesomsättningen alstrar {p}': 'Stoffskiftet produserer {p}',
        'Måste bort: {p}': 'Må bort: {p}',
        'Avges netto: {p}': 'Avgis netto: {p}',
        'Tas upp netto: {p}': 'Tas opp netto: {p}',
        'Termisk jämvikt — allt du alstrar hinner bort': 'Termisk likevekt: alt du produserer, rekker å bli avgitt',
        'Luften i rummet': 'Luften i rommet',
        'Din hud': 'Huden din',
        '({k} K) · kärna {t}': '({k}' + NB + 'K) · kjerne {t}',
        'Du upplever det': 'Du opplever det',

        // Upplevelsen (kortet i scenen visar versaler, mätaren gemener)
        'MYCKET KALLT': 'SVÆRT KALDT',
        'KALLT': 'KALDT',
        'SVALT': 'KJØLIG',
        'BEHAGLIGT': 'BEHAGELIG',
        'VARMT': 'VARMT',
        'MYCKET VARMT': 'SVÆRT VARMT',
        'HETT': 'HETT',
        'Mycket kallt': 'Svært kaldt',
        'Kallt': 'Kaldt',
        'Svalt': 'Kjølig',
        'Behagligt': 'Behagelig',
        'Varmt': 'Varmt',
        'Mycket varmt': 'Svært varmt',
        'Hett': 'Hett',
        '{tillstand} — {varfor}': '{tillstand}: {varfor}',
        'Du förlorar långt mer värme än kroppen hinner alstra.': 'Du taper langt mer varme enn kroppen rekker å produsere.',
        'Värmeförlusten är mycket större än värmeproduktionen.': 'Varmetapet er mye større enn varmeproduksjonen.',
        'Du gör dig av med lite mer värme än du alstrar.': 'Du blir kvitt litt mer varme enn du produserer.',
        'Du gör dig av med precis så mycket värme som du alstrar.': 'Du blir kvitt nøyaktig så mye varme som du produserer.',
        'Du blir inte av med all värme — resten måste svettas bort.': 'Du blir ikke kvitt all varmen. Resten må svettes bort.',
        'Nästan ingen värme lämnar huden passivt. Du svettas mycket.': 'Nesten ingen varme forlater huden passivt. Du svetter mye.',
        'Luften är varmare än huden, så värme strömmar in i kroppen. Bara avdunstning kyler.':
            'Luften er varmere enn huden, så varme strømmer inn i kroppen. Bare fordamping kjøler.',

        // Värmebalansmätaren
        'Så mycket måste bort': 'Så mye må bort',
        'Överskott — mer värme lämnar dig än du alstrar': 'Overskudd: mer varme forlater deg enn du produserer',
        'Måste bort genom avdunstning (svettning)': 'Må bort ved fordamping (svetting)',
        'Kvar att bli av med på annat sätt': 'Igjen å bli kvitt på annen måte',
        'Kroppen alstrar (ämnesomsättningen)': 'Kroppen produserer (stoffskiftet)',
        'Nettoflöde ut till luften': 'Nettostrøm ut til luften',
        'Luften är varmare än huden — nettoflödet går i stället in i kroppen: {p}.':
            'Luften er varmere enn huden, så nettostrømmen går i stedet inn i kroppen: {p}.',
        'Utbytet går åt båda hållen: huden strålar ut ≈ {ut} och rummet strålar in ≈ {in} — skillnaden är nettoflödet. Streckad markering visar de {p} som måste bort för att kroppstemperaturen ska hållas konstant.':
            'Utvekslingen går begge veier: huden stråler ut ≈ {ut} og rommet stråler inn ≈ {in}. Forskjellen er nettostrømmen. Den stiplede markeringen viser de {p} som må bort for at kroppstemperaturen skal holdes konstant.',

        // Hur fungerar det?
        'Hur fungerar det?': 'Hvordan fungerer det?',
        'Ämnesomsättningen alstrar ca 100 W i vila. Exakt lika mycket måste lämna kroppen, annars ändras kroppstemperaturen.':
            'Stoffskiftet produserer omtrent 100' + NB + 'W i hvile. Nøyaktig like mye må forlate kroppen, ellers endres kroppstemperaturen.',
        'Allt som är varmare än absoluta nollpunkten strålar värme. Rummet strålar därför hela tiden in värme mot dig — men huden (ca 33 °C) strålar ut ännu mer, så nettoflödet går ut.':
            'Alt som er varmere enn det absolutte nullpunktet, stråler ut varme. Rommet stråler derfor hele tiden varme inn mot deg, men huden (omtrent 33' + NB + '°C) stråler ut enda mer, så nettostrømmen går ut.',
        'Vid 22 °C blir nettoflödet precis 100 W — därför känns 22 °C lagom.':
            'Ved 22' + NB + '°C blir nettostrømmen nøyaktig 100' + NB + 'W. Derfor føles 22' + NB + '°C passe.',
        'Blir luften varmare strålar rummet in mer, nettot krymper och resten måste svettas ut. Det känns varmt.':
            'Blir luften varmere, stråler rommet inn mer, nettostrømmen krymper, og resten må svettes ut. Det føles varmt.',
        'Är luften varmare än 33 °C strålar rummet in mer än huden strålar ut — nettoflödet vänder in i kroppen och bara avdunstning kyler.':
            'Er luften varmere enn 33' + NB + '°C, stråler rommet inn mer enn huden stråler ut. Nettostrømmen snur inn i kroppen, og bare fordamping kjøler.',
        '© 2025 Fysiklabbet. Skapad av Sam Skoglund.': '© 2025 Fysiklabbet. Laget av Sam Skoglund.',
        'Modellen gäller en vilande person med vanliga inomhuskläder. Kläder, blåst och rörelse ändrar hur snabbt värmen lämnar huden.':
            'Modellen gjelder en person i hvile med vanlige innendørsklær. Klær, vind og bevegelse endrer hvor raskt varmen forlater huden.'
    });
})();

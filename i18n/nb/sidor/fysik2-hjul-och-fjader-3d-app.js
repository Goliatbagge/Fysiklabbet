/* i18n/nb/sidor/fysik2-hjul-och-fjader-3d-app.js — norska (bokmål) för
 * simuleringen Hjulet och fjädern i 3D. */
(function () {
    I18N.add({
        // Andra simuleringar i avsnittsraden
        'Hjulet och fjädern': 'Hjulet og fjæren',
        'Jämförelse av svängningar': 'Sammenligning av svingninger',
        'Läge, hastighet och acceleration': 'Posisjon, hastighet og akselerasjon',
        'Hjulet och fjädern i 3D — Fysiklabbet': 'Hjulet og fjæren i 3D — Fysiklabbet',
        'Hjulet och fjädern i 3D — Fysik nivå 2': 'Hjulet og fjæren i 3D — Fysikk nivå 2',
        'Ett cykelhjul med ett stift snurrar i ljuset från en lampa, och stiftets skugga på väggen rör sig upp och ned i exakt samma takt som en vikt i en fjäder. Vrid kameran fritt i 3D, se hjulet från lampans håll och följ hur grafen på väggen blir en sinuskurva: en harmonisk svängning är projektionen av en cirkelrörelse.':
            'Et sykkelhjul med en pinne snurrer i lyset fra en lampe, og skyggen av pinnen på veggen beveger seg opp og ned i nøyaktig samme takt som et lodd i en fjær. Vri kameraet fritt i 3D, se hjulet fra lampens side og følg hvordan grafen på veggen blir en sinuskurve: en harmonisk svingning er projeksjonen av en sirkelbevegelse.',
        '/ Hjulet och fjädern': '/ Hjulet og fjæren',
        'Hjulet och fjädern i 3D': 'Hjulet og fjæren i 3D',

        // Ingressen (delad runt inline-element)
        'En lampa lyser på ett cykelhjul som snurrar med jämn fart. På hjulet sitter ett':
            'En lampe lyser på et sykkelhjul som snurrer med jevn fart. På hjulet sitter en',
        'stift': 'pinne',
        ', och eftersom ljuset går rakt fram i hjulets plan hamnar stiftets skugga på väggen på exakt samma höjd som stiftet. Skuggan rör sig upp och ned i takt med':
            ', og fordi lyset går rett fram i hjulets plan, havner skyggen av pinnen på veggen i nøyaktig samme høyde som pinnen. Skyggen beveger seg opp og ned i takt med',
        'vikten i fjädern': 'loddet i fjæren',
        'bredvid, och grafen på väggen ritar upp höjden mot tiden: en sinuskurva. En harmonisk svängning är alltså projektionen av en cirkelrörelse. Byt kameravy till':
            'ved siden av, og grafen på veggen tegner høyden mot tiden: en sinuskurve. En harmonisk svingning er altså projeksjonen av en sirkelbevegelse. Bytt kameravinkel til',
        'Från lampan': 'Fra lampen',
        'och se hjulet från kanten, så som ljuset ser det: då rör sig stiftet bara upp och ned.':
            'og se hjulet fra kanten, slik lyset treffer det: da beveger pinnen seg bare opp og ned.',

        // Formelkortet
        'Elongation': 'Utslag',
        'Amplitud': 'Amplitude',
        'Vinkelhastighet': 'Vinkelfart',
        'Tid': 'Tid',
        'Stiftet har vridits vinkeln': 'Pinnen er dreid en vinkel',
        'från den vågräta radien, så dess höjd över navet är': 'fra den vannrette radien, så høyden over navet er',
        '. Med de aktuella värdena är': '. Med de aktuelle verdiene er',
        'rad/s och': 'rad/s og',

        // Scenen
        'Lampa': 'Lampe',
        'Skuggan på väggen': 'Skyggen på veggen',
        'Stift': 'Pinne',
        'Vy: 3D eller 2D': 'Visning: 3D eller 2D',
        'Scenen i 3D': 'Scenen i 3D',
        'Samma försök som plan figur': 'Samme forsøk som flat figur',
        'Byt kameravy': 'Bytt kameravinkel',
        'Byt kameravy: nu {nu}, nästa {nasta}': 'Bytt kameravinkel: nå {nu}, neste {nasta}',
        'Dra för att vrida kameran · rulla för att zooma': 'Dra for å vri kameraet · rull for å zoome',
        'Periodtid': 'Periode',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Lampans ljus och skuggor': 'Lampelyset og skyggene',
        'Vinkeln': 'Vinkelen',
        'och radien': 'og radien',
        'Grafen på väggen': 'Grafen på veggen',
        'Höjdlinjen': 'Høydelinjen',
        'Etiketter': 'Etiketter',
        'Kameravy': 'Kameravinkel',
        'Snett': 'Skrått',
        'Lampan': 'Lampen',
        'Hjulet': 'Hjulet',
        'Snett framifrån': 'Skrått forfra',
        'Rakt mot hjulet': 'Rett mot hjulet',

        // Sidopanelen
        'Periodtid (': 'Periode (',
        'Amplitud (': 'Amplitude (',
        'Tiden för ett varv på hjulet, och därmed för en hel svängning av vikten.':
            'Tiden for én omdreining av hjulet, og dermed for en hel svingning av loddet.',
        'Stiftets avstånd från navet. Det är också viktens största utslag från jämviktsläget.':
            'Avstanden fra navet til pinnen. Det er også det største utslaget til loddet fra likevektsstillingen.',
        'Ultrarapid (en fjärdedel av farten)': 'Sakte film (en firedel av farten)',
        'Avläsningar': 'Avlesninger',
        'Vinkel': 'Vinkel',

        // Varför hamnar skuggan på samma höjd?
        'Varför hamnar skuggan på samma höjd?': 'Hvorfor havner skyggen i samme høyde?',
        'Ljuset från lampan går vågrätt, i samma plan som hjulet. En ljusstråle som passerar stiftet fortsätter därför rakt fram till väggen utan att byta höjd, och skuggan hamnar precis i höjd med stiftet. Hjulet ses från kanten av ljuset och blir en smal lodrät skugga, och stiftet, som sticker ut från hjulet, blir en kort vågrät skugga som glider upp och ned längs den.':
            'Lyset fra lampen går vannrett, i samme plan som hjulet. En lysstråle som passerer pinnen, fortsetter derfor rett fram til veggen uten å endre høyde, og skyggen havner nøyaktig i høyde med pinnen. Lyset treffer hjulet fra kanten, så hjulet blir en smal loddrett skygge, og pinnen, som stikker ut fra hjulet, blir en kort vannrett skygge som glir opp og ned langs den.',

        // Från cirkel till sinuskurva
        'Från cirkel till sinuskurva': 'Fra sirkel til sinuskurve',
        'Stiftet sitter på radien': 'Pinnen sitter på radien',
        'och har vridits vinkeln': 'og er dreid en vinkel',
        'från den vågräta radien, så höjden över navet är': 'fra den vannrette radien, så høyden over navet er',
        '. Hjulet snurrar med vinkelhastigheten': '. Hjulet snurrer med vinkelfarten',
        ', och därför blir': ', og derfor blir',
        '). Ett varv är en hel svängning, och eftersom ett varv är 2π radianer blir':
            '). Én omdreining er en hel svingning, og fordi én omdreining er 2π radianer, blir',

        // Prova själv
        'Prova själv': 'Prøv selv',
        'Välj kameravyn': 'Velg kameravinkelen',
        ': hjulet syns från kanten och stiftet rör sig bara rakt upp och ned, precis som vikten. Pausa när stiftet står längst upp och längst ned. Där vänder vikten, och där är grafen som högst och lägst. Dra sedan i amplituden och se att stiftet flyttas ut på hjulet samtidigt som vikten svänger längre. Teorin finns i genomgången':
            ': hjulet ses fra kanten, og pinnen beveger seg bare rett opp og ned, akkurat som loddet. Sett på pause når pinnen står øverst og nederst. Der snur loddet, og der er grafen på sitt høyeste og laveste. Dra så i amplituden og se at pinnen flyttes utover på hjulet samtidig som loddet svinger lenger. Teorien finner du i gjennomgangen',
        'Harmonisk svängning': 'Harmonisk svingning'
    });
})();

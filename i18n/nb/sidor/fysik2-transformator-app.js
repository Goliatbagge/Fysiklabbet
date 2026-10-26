/* i18n/nb/sidor/fysik2-transformator-app.js — norska (bokmål) för
 * simuleringen Transformator. */
(function () {
    I18N.add({
        // ---- Sidhuvud och delning ----
        'Transformator — Fysik nivå 2': 'Transformator — Fysikk nivå 2',
        'Två spolar på en gemensam järnkärna: växelströmmen i primärspolen ger ett varierande magnetiskt flöde som inducerar en ny spänning i sekundärspolen. Ändra U₁ och varvtalen N₁ och N₂, se spänningsgrafen — och anslut en lampa för att se att strömmen ändras åt motsatt håll så att effekten bevaras (N₁/N₂ = U₁/U₂).':
            'To spoler på en felles jernkjerne: vekselstrømmen i primærspolen gir en varierende magnetisk fluks som induserer en ny spenning i sekundærspolen. Endre U₁ og antall vindinger N₁ og N₂, se spenningsgrafen, og koble til en lyspære for å se at strømmen endres i motsatt retning slik at effekten bevares (N₁/N₂ = U₁/U₂).',

        // ---- Ingress ----
        'Två spolar på en gemensam järnkärna. Växelströmmen i primärspolen skapar ett varierande magnetiskt flöde':
            'To spoler på en felles jernkjerne. Vekselstrømmen i primærspolen skaper en varierende magnetisk fluks',
        'genom kärnan, som inducerar en ny spänning i sekundärspolen. Ändra varvtalen':
            'gjennom kjernen, som induserer en ny spenning i sekundærspolen. Endre antall vindinger',
        '₁ och': '₁ og',
        '₂ och se hur spänningen transformeras upp eller ner — anslut sedan en lampa och se att strömmen ändras åt':
            '₂ og se hvordan spenningen transformeres opp eller ned. Koble deretter til en lyspære og se at strømmen endres i',
        'motsatt': 'motsatt',
        'håll, så att effekten bevaras.': 'retning, slik at effekten bevares.',

        // ---- Formelkortet ----
        'Varv i primärspolen': 'Vindinger i primærspolen',
        'Varv i sekundärspolen': 'Vindinger i sekundærspolen',
        'Spänning primär': 'Primærspenning',
        'Spänning sekundär': 'Sekundærspenning',
        'Ström sekundär': 'Sekundærstrøm',
        'Ström primär': 'Primærstrøm',
        'gäller ideal transformator (utan energiförluster)': 'gjelder for en ideell transformator (uten energitap)',

        // ---- Scenen ----
        'järnkärna': 'jernkjerne',
        'primärspole': 'primærspole',
        'sekundärspole': 'sekundærspole',
        'Flödet': 'Fluksen',
        'Spänningsgraf': 'Spenningsgraf',
        'Belastning': 'Belastning',
        'Anslut lampa till sekundärspolen': 'Koble en lyspære til sekundærspolen',
        'Sekundärspänning': 'Sekundærspenning',
        'Omsättning': 'Omsetningsforhold',
        'Effekt': 'Effekt',

        // ---- Reglage ----
        'Primärspänning (': 'Primærspenning (',
        'Varv primär (': 'Vindinger primær (',
        'Varv sekundär (': 'Vindinger sekundær (',
        'Lampans resistans (': 'Lyspærens resistans (',
        'Varv i primärspolen (': 'Vindinger i primærspolen (',
        'Varv i sekundärspolen (': 'Vindinger i sekundærspolen (',
        'Växelspänningen som läggs över primärspolen (effektivvärde).': 'Vekselspenningen som legges over primærspolen (effektivverdi).',
        'Fler varv i primärspolen ⟹ lägre sekundärspänning.': 'Flere vindinger i primærspolen ⟹ lavere sekundærspenning.',
        'Fler varv i sekundärspolen ⟹ högre sekundärspänning.': 'Flere vindinger i sekundærspolen ⟹ høyere sekundærspenning.',
        'Belastningen bestämmer strömmen:': 'Belastningen bestemmer strømmen:',
        '(Ohms lag).': '(Ohms lov).',

        // ---- Beräkning och avläsning ----
        'Beräkning av sekundärspänningen': 'Beregning av sekundærspenningen',
        'Exempel 1 ur teorin (230 V → 20 V)': 'Eksempel 1 fra teorien (230 V → 20 V)',
        'Demonstrationen (300 → 1 500 varv)': 'Demonstrasjonen (300 → 1 500 vindinger)',
        'N₁ = 300, N₂ = 1 500 ⟹ spänningen 5 gånger så stor': 'N₁ = 300, N₂ = 1 500 ⟹ spenningen blir 5 ganger så stor',
        'Avläsning': 'Avlesning',
        'Kontroll:': 'Kontroll:',
        'Utan belastning går (nästan) ingen ström — anslut lampan i scenen för att se strömmarna':
            'Uten belastning går det (nesten) ingen strøm. Koble til lyspæren i scenen for å se strømmene',
        'Lägg märke till att': 'Legg merke til at',
        '₂ — effekten är densamma på båda sidor. Transformatorn kan inte "skapa" energi.':
            '₂: effekten er den samme på begge sider. Transformatoren kan ikke «skape» energi.',

        // ---- Förklaringar ----
        'Primär och sekundär': 'Primær og sekundær',
        'Spolen som ansluts till den ingående spänningen kallas': 'Spolen som kobles til inngangsspenningen, kalles',
        ', och spolen som inducerar den nya spänningen kallas': ', og spolen der den nye spenningen blir indusert, kalles',
        '. Järnkärnan binder ihop dem: den leder det magnetiska flödet': '. Jernkjernen binder dem sammen: den leder den magnetiske fluksen',
        'så att (nästan) allt flöde från primärspolen också går genom sekundärspolen.':
            'slik at (nesten) all fluks fra primærspolen også går gjennom sekundærspolen.',
        'Effekten bevaras': 'Effekten bevares',
        'Energiprincipen gäller: bortser vi från förluster är effekten i primärspolen samma som i sekundärspolen,':
            'Energiprinsippet gjelder: ser vi bort fra tap, er effekten i primærspolen den samme som i sekundærspolen,',
        '. Transformeras spänningen upp 10 gånger blir strömmen samtidigt en tiondel så stor — det är därför strömförhållandet är "upp och ner":':
            '. Transformeres spenningen opp 10 ganger, blir strømmen samtidig en tidel så stor. Det er derfor strømforholdet er «opp ned»:',
        'Hög eller låg spänning?': 'Høy eller lav spenning?',
        'En': 'En',
        'hög spänning med låg ström': 'høy spenning med lav strøm',
        'ger små energiförluster i ledningarna när elen transporteras — men ökar risken för oönskade urladdningar. En':
            'gir små energitap i ledningene når elektrisk energi overføres, men øker risikoen for uønskede utladninger. En',
        'låg spänning med hög ström': 'lav spenning med høy strøm',
        'är säkrare men ger större förluster. Därför transformeras spänningen upp till hundratals kilovolt i kraftnätet och ner igen nära hemmen.':
            'er tryggere, men gir større tap. Derfor transformeres spenningen opp til flere hundre kilovolt i kraftnettet og ned igjen nær boligene.',
        'Var kommer formeln ifrån?': 'Hvor kommer formelen fra?',
        'Samma flödesändring går genom båda spolarna, och den inducerade spänningen i en spole är proportionell mot antalet varv:':
            'Den samme fluksendringen går gjennom begge spolene, og den induserte spenningen i en spole er proporsjonal med antall vindinger:',
        'respektive': 'og',
        'Delar man uttrycken med varandra förkortas flödesändringen bort och kvar står':
            'Deler man uttrykkene på hverandre, forkortes fluksendringen bort, og igjen står',
        '. Eftersom transformatorns inre resistans är liten gäller': '. Siden den indre resistansen i transformatoren er liten, gjelder',
        'och': 'og',
        ', alltså': ', altså',
        '. Strömsambandet följer sedan ur energiprincipen:': '. Sammenhengen for strømmen følger så av energiprinsippet:',
        'ger': 'gir',

        // ---- Vanliga missuppfattningar ----
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"En transformator kan förstärka energin."': '«En transformator kan forsterke energien.»',
        'En transformator kan förstärka energin.': 'En transformator kan forsterke energien.',
        'Nej — höjs spänningen sänks strömmen i samma grad. Effekten ut kan aldrig bli större än effekten in (i verkligheten blir den något mindre på grund av förluster).':
            'Nei. Økes spenningen, minker strømmen like mye. Effekten ut kan aldri bli større enn effekten inn (i virkeligheten blir den litt mindre på grunn av tap).',
        '"Den fungerar med likström också."': '«Den fungerer med likestrøm også.»',
        'Den fungerar med likström också.': 'Den fungerer med likestrøm også.',
        'Nej — en konstant ström ger ett konstant flöde, och utan flödesändring induceras ingen spänning i sekundärspolen. Det är därför transformatorn kräver':
            'Nei. En konstant strøm gir en konstant fluks, og uten fluksendring blir det ikke indusert noen spenning i sekundærspolen. Det er derfor transformatoren krever',
        'växel': 'veksel',
        'spänning.': 'spenning.',
        '"Fler varv är alltid bättre."': '«Flere vindinger er alltid bedre.»',
        'Fler varv är alltid bättre.': 'Flere vindinger er alltid bedre.',
        'Nej — det är': 'Nei. Det er',
        'förhållandet': 'forholdet',
        'mellan varvtalen som avgör spänningen. 1 150 : 100 ger exakt samma omsättning som 230 : 20.':
            'mellom antall vindinger som avgjør spenningen. 1 150 : 100 gir nøyaktig samme omsetningsforhold som 230 : 20.'
    });
})();

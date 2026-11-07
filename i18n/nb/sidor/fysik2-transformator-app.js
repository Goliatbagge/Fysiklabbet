/* i18n/nb/sidor/fysik2-transformator-app.js — norska (bokmål) för
 * simuleringen Transformator (2D och 3D, omgjord 2026-11-07). */
(function () {
    I18N.add({
        // ---- Sidhuvud och delning ----
        'Transformator — Fysik nivå 2': 'Transformator — Fysikk nivå 2',
        'Två spolar på en gemensam järnkärna, i 2D eller 3D på labbänken. Växelströmmen i primärspolen ger ett magnetiskt flöde som ändras hela tiden och inducerar en ny spänning i sekundärspolen. Ändra U₁, N₁ och N₂, anslut lampan och se att strömmen ändras åt motsatt håll så att effekten bevaras. Prova likspänning och se varför den inte fungerar.':
            'To spoler på en felles jernkjerne, i 2D eller i 3D på labbenken. Vekselstrømmen i primærspolen gir en magnetisk fluks som endrer seg hele tiden og induserer en ny spenning i sekundærspolen. Endre U₁, N₁ og N₂, koble til lyspæren og se at strømmen endres i motsatt retning slik at effekten bevares. Prøv likespenning og se hvorfor den ikke fungerer.',

        // ---- Ingress ----
        'Två spolar på en gemensam järnkärna. Växelströmmen i primärspolen ger ett magnetiskt flöde':
            'To spoler på en felles jernkjerne. Vekselstrømmen i primærspolen gir en magnetisk fluks',
        'som hela tiden ändras, och flödet går genom kärnan och sekundärspolen, där det inducerar en ny spänning. Ändra varvtalen och se spänningen transformeras upp eller ner. Anslut lampan och se att strömmen ändras åt':
            'som endrer seg hele tiden, og fluksen går gjennom kjernen og sekundærspolen, der den induserer en ny spenning. Endre antall vindinger og se spenningen transformeres opp eller ned. Koble til lyspæren og se at strømmen endres i',
        'motsatt': 'motsatt',
        'håll, så att effekten bevaras. Prova också likspänning, och växla till 3D för att se transformatorn på labbänken.':
            'retning, slik at effekten bevares. Prøv også likespenning, og bytt til 3D for å se transformatoren på labbenken.',

        // ---- Formelkortet ----
        'Varv i primärspolen': 'Vindinger i primærspolen',
        'Varv i sekundärspolen': 'Vindinger i sekundærspolen',
        'Spänning primär': 'Primærspenning',
        'Spänning sekundär': 'Sekundærspenning',
        'Ström sekundär': 'Sekundærstrøm',
        'Ström primär': 'Primærstrøm',
        'Gäller en ideal transformator, utan energiförluster. Strömkvoten är omvänd.':
            'Gjelder for en ideell transformator, uten energitap. Strømforholdet er omvendt.',

        // ---- Scenen ----
        'järnkärna': 'jernkjerne',
        'primärspole': 'primærspole',
        'sekundärspole': 'sekundærspole',
        'Visa': 'Vis',
        'Magnetiska flödet': 'Den magnetiske fluksen',
        'Strömmarna': 'Strømmene',
        'och': 'og',
        '₁ och': '₁ og',
        '₂ är störst när flödet': '₂ er størst når fluksen',
        'VÄXELSPÄNNING': 'VEKSELSPENNING',
        'LIKSPÄNNING': 'LIKESPENNING',
        'PÅ': 'PÅ',
        'AV': 'AV',
        'COM': 'COM',
        'Elektronerna': 'Elektronene',
        'Sekundärsidan': 'Sekundærsiden',
        'Anslut lampan': 'Koble til lyspæren',
        'Reglage': 'Kontroller',
        'Sekundärspänning': 'Sekundærspenning',
        'Flödet ändras: spänningsstöt': 'Fluksen endres: spenningsstøt',
        'Flödet ändras inte': 'Fluksen endres ikke',
        'Klicka på strömbrytaren för att slå av och på.': 'Klikk på strømbryteren for å slå av og på.',
        'Dra för att vrida scenen. Klicka på aggregatet eller lampan.': 'Dra for å rotere scenen. Klikk på strømforsyningen eller lyspæren.',
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Fullskärm': 'Fullskjerm',
        'Lämna fullskärm': 'Avslutt fullskjerm',

        // ---- Grafen ----
        'Spänningarna och flödet': 'Spenningene og fluksen',
        'Visas kraftigt nedsaktat. I vägguttaget byter spänningen riktning 100 gånger per sekund.':
            'Vises i sterkt redusert tempo. I stikkontakten skifter spenningen retning 100 ganger per sekund.',
        'Spänningen': 'Spenningen',
        'är störst när flödet': 'er størst når fluksen',
        'ändras snabbast, och noll när flödet vänder. Det är flödesändringen som inducerar spänningen, inte flödet i sig.':
            'endres raskest, og null når fluksen snur. Det er fluksendringen som induserer spenningen, ikke fluksen i seg selv.',

        // ---- Reglage ----
        '2D': '2D',
        'principskiss': 'prinsippskisse',
        '3D': '3D',
        'på labbänken': 'på labbenken',
        'Snett': 'Skrått',
        'Framifrån': 'Forfra',
        'Ovanifrån': 'Ovenfra',
        'Växelspänning': 'Vekselspenning',
        'som i vägguttaget': 'som i stikkontakten',
        'Likspänning': 'Likespenning',
        'som från ett batteri': 'som fra et batteri',
        'Primärspänning (': 'Primærspenning (',
        'Spänning (': 'Spenning (',
        'Varv i primärspolen (': 'Vindinger i primærspolen (',
        'Varv primär (': 'Vindinger primær (',
        'Varv i sekundärspolen (': 'Vindinger i sekundærspolen (',
        'Varv sekundär (': 'Vindinger sekundær (',
        'Lampans resistans (': 'Lyspærens resistans (',
        'Resistans (': 'Resistans (',
        'Effektivvärdet av växelspänningen över primärspolen.': 'Effektivverdien til vekselspenningen over primærspolen.',
        'Likspänningen över primärspolen.': 'Likespenningen over primærspolen.',
        'Fler varv i primärspolen ger lägre sekundärspänning.': 'Flere vindinger i primærspolen gir lavere sekundærspenning.',
        'Fler varv i sekundärspolen ger högre sekundärspänning.': 'Flere vindinger i sekundærspolen gir høyere sekundærspenning.',
        'Lampan bestämmer strömmen genom Ohms lag,': 'Lyspæren bestemmer strømmen etter Ohms lov,',
        'Slå av spänningen': 'Slå av spenningen',
        'Slå på spänningen': 'Slå på spenningen',
        'Pausa': 'Pause',
        'Fortsätt': 'Fortsett',

        // ---- Beräkning ----
        'Beräkning av sekundärspänningen': 'Beregning av sekundærspenningen',
        'Lika många varv: spänningen ändras inte.': 'Like mange vindinger: spenningen endres ikke.',
        'Fler varv på sekundärsidan: spänningen transformeras upp {n} gånger.': 'Flere vindinger på sekundærsiden: spenningen transformeres opp {n} ganger.',
        'Färre varv på sekundärsidan: spänningen transformeras ner {n} gånger.': 'Færre vindinger på sekundærsiden: spenningen transformeres ned {n} ganger.',
        'Men bara med växelspänning. Med likspänning blir det ingen spänning alls utom i till- och frånslaget.':
            'Men bare med vekselspenning. Med likespenning blir det ingen spenning i det hele tatt, bortsett fra når du slår av eller på.',
        'Exempel 1 ur teorin': 'Eksempel 1 fra teorien',
        '230 V till 20 V': '230 V til 20 V',
        'Demonstrationen': 'Demonstrasjonen',
        '300 och 1 500 varv': '300 og 1 500 vindinger',
        'Mobilladdare': 'Mobillader',
        '230 V till 5 V': '230 V til 5 V',
        'Tio gånger upp': 'Ti ganger opp',
        '230 V till 2,3 kV': '230 V til 2,3 kV',

        // ---- Avläsning ----
        'Avläsning': 'Avlesning',
        'Omsättning': 'Omsetningsforhold',
        'Effekt': 'Effekt',
        'Med likspänning ändras flödet bara i ögonblicket när du slår till eller från. Då blir det en kort spänningsstöt i sekundärspolen, åt olika håll vid till- och frånslag. Resten av tiden induceras ingenting.':
            'Med likespenning endres fluksen bare i øyeblikket når du slår på eller av. Da blir det et kort spenningsstøt i sekundærspolen, i hver sin retning når du slår på og av. Resten av tiden blir ingenting indusert.',
        'Utan belastning går nästan ingen ström. Anslut lampan för att se strömmarna.':
            'Uten belastning går det nesten ingen strøm. Koble til lyspæren for å se strømmene.',
        'Lägg märke till att effekten är densamma på båda sidor, U₁ · I₁ = U₂ · I₂. Transformatorn kan inte skapa energi: transformeras spänningen ner blir strömmen större i samma grad.':
            'Legg merke til at effekten er den samme på begge sider, U₁ · I₁ = U₂ · I₂. Transformatoren kan ikke skape energi: transformeres spenningen ned, blir strømmen like mye større.',

        // ---- Förklaringar ----
        'Primär och sekundär': 'Primær og sekundær',
        'Spolen som ansluts till den ingående spänningen kallas': 'Spolen som kobles til inngangsspenningen, kalles',
        ', och spolen där den nya spänningen induceras kallas': ', og spolen der den nye spenningen blir indusert, kalles',
        '. Järnkärnan leder det magnetiska flödet': '. Jernkjernen leder den magnetiske fluksen',
        ', så att nästan allt flöde från primärspolen också går genom sekundärspolen.':
            ', slik at nesten all fluks fra primærspolen også går gjennom sekundærspolen.',
        'Bara växelspänning fungerar': 'Bare vekselspenning fungerer',
        'En spänning induceras bara när flödet': 'En spenning blir bare indusert når fluksen',
        'ändras': 'endres',
        '. Växelströmmen byter riktning hela tiden, så flödet ändras hela tiden. Med likström blir flödet konstant, och då induceras ingenting. Välj Likspänning och slå av och på för att se det.':
            '. Vekselstrømmen skifter retning hele tiden, så fluksen endres hele tiden. Med likestrøm blir fluksen konstant, og da blir ingenting indusert. Velg Likespenning og slå av og på for å se det.',
        'Effekten bevaras': 'Effekten bevares',
        'Bortser vi från förluster är effekten lika stor på båda sidor,': 'Ser vi bort fra tap, er effekten like stor på begge sider,',
        '. Transformeras spänningen upp tio gånger blir strömmen en tiondel så stor. Därför är strömkvoten omvänd,':
            '. Transformeres spenningen opp ti ganger, blir strømmen en tidel så stor. Derfor er strømforholdet omvendt,',
        'Hög eller låg spänning?': 'Høy eller lav spenning?',
        'En': 'En',
        'hög spänning med låg ström': 'høy spenning med lav strøm',
        'ger små förluster i ledningarna men större risk för urladdningar. En':
            'gir små tap i ledningene, men større risiko for utladninger. En',
        'låg spänning med hög ström': 'lav spenning med høy strøm',
        'är säkrare men ger större förluster. Därför transformeras spänningen upp till hundratals kilovolt i kraftnätet och ner igen nära hemmen.':
            'er tryggere, men gir større tap. Derfor transformeres spenningen opp til flere hundre kilovolt i kraftnettet og ned igjen nær boligene.',
        'Var kommer formeln ifrån?': 'Hvor kommer formelen fra?',
        'Samma flödesändring går genom båda spolarna, och den inducerade spänningen i en spole är proportionell mot antalet varv:':
            'Den samme fluksendringen går gjennom begge spolene, og den induserte spenningen i en spole er proporsjonal med antall vindinger:',
        'respektive': 'og',
        'Delar man uttrycken med varandra förkortas flödesändringen bort, och kvar står':
            'Deler man det ene uttrykket på det andre, forkortes fluksendringen bort, og igjen står',
        '. Eftersom transformatorns inre resistans är liten gäller': '. Siden den indre resistansen i transformatoren er liten, gjelder',
        ', alltså': ', altså',
        '. Strömsambandet följer sedan ur energiprincipen:': '. Sammenhengen for strømmen følger så av energiprinsippet:',
        'ger': 'gir',

        // ---- Vanliga missuppfattningar ----
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"En transformator kan förstärka energin."': '«En transformator kan forsterke energien.»',
        'Nej. Höjs spänningen sänks strömmen i samma grad. Effekten ut kan aldrig bli större än effekten in, och i verkligheten blir den något mindre på grund av förluster.':
            'Nei. Økes spenningen, minker strømmen like mye. Effekten ut kan aldri bli større enn effekten inn, og i virkeligheten blir den litt mindre på grunn av tap.',
        '"Den fungerar med likström också."': '«Den fungerer med likestrøm også.»',
        'Nej. En konstant ström ger ett konstant flöde, och utan flödesändring induceras ingen spänning i sekundärspolen. En verklig transformator kan dessutom bli förstörd av likspänning, eftersom bara spolens låga resistans då begränsar strömmen.':
            'Nei. En konstant strøm gir en konstant fluks, og uten fluksendring blir det ikke indusert noen spenning i sekundærspolen. En virkelig transformator kan dessuten bli ødelagt av likespenning, fordi bare den lave resistansen i spolen da begrenser strømmen.',
        '"Fler varv är alltid bättre."': '«Flere vindinger er alltid bedre.»',
        'Nej. Det är': 'Nei. Det er',
        'förhållandet': 'forholdet',
        'mellan varvtalen som avgör spänningen. 1 150 : 100 ger exakt samma omsättning som 230 : 20.':
            'mellom antall vindinger som avgjør spenningen. 1 150 : 100 gir nøyaktig samme omsetningsforhold som 230 : 20.',
        '"Strömmen går från primärspolen till sekundärspolen."': '«Strømmen går fra primærspolen til sekundærspolen.»',
        'Nej. Spolarna har ingen elektrisk kontakt med varandra. Det enda som förbinder dem är det magnetiska flödet i järnkärnan. Titta på elektronerna: de stannar i sin egen krets.':
            'Nei. Spolene har ingen elektrisk kontakt med hverandre. Det eneste som forbinder dem, er den magnetiske fluksen i jernkjernen. Se på elektronene: de blir i sin egen krets.'
    });
})();

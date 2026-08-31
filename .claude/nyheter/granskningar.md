# Utgivargranskningar

Logg över den oberoende slutgranskningen av nyhetsartiklar före publicering.
Protokollet finns i `.claude/agents/utgivare.md`. Nyast överst.

| Datum | Artikel-id | Utslag | Motivering |
|-------|-----------|--------|------------|
| 2026-08-31 | `2026-08-31-spinnvagor-i-rorelse` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad — användaren har bett om att agenter inte startas i den här sessionen). **Peer review-status: GRANSKAD.** Nature Physics 22, 1160–1165, publicerad online 5 juni 2026, DOI 10.1038/s41567-026-03318-z, licens CC BY 4.0 (bekräftat via Crossref: titel, volym, sidor, hela författarlistan om 13 namn, publiceringsdatum, licens). Förhandsversionen arXiv:2504.20958v3 (29 januari 2026, CC BY 4.0) läst i HTML-version — abstract, resultatdel, metoddelen 7.1–7.3 och de supplementära avsnitten om parametrisk instabilitet. **Verifierat mot originalet:** fotonenergin 708 eV vid järnets L₃-kant; YIG-filmen 100 nm tjock på GGG-substrat; permalloystrimlorna 200 nm breda med perioden 400 nm; biasfältet 30 mT (20 mT enbart i figur 2 d–f); mätningarna gjorda vid strållinjen P04 på PETRA III i Hamburg och UE52-SGM på BESSY II i Berlin; direkt exciterade magnoner ner till λ ≈ 79 nm vid 12,1 GHz och icke-linjärt exciterade ner till λ ≈ 67 nm; signal urskiljbar ner till −34 dBm vid 30 s integrationstid mot −3 dBm för STXM på ett systerprov, alltså ”mer än tusen gånger” (31 dB ≈ 1 259×, källans egen formulering); fyrmagnonparametrisk process som första direkta observationen av en allriktad magnonpopulation; ellipsen som isofrekvenskurva; övertoner 2f, 3f och 4f vid 2,38 GHz. **Rättat före publicering:** ett stycke sammanförde först övertonerna vid 2,38 GHz med de bråkdelsordningar (3/8, 5/8, 6/8, 11/8, 14/8) som i själva verket uppträder vid 8,84 GHz, och kallade dem dessutom felaktigt ”tredjedelar” — omskrivet så att de två frekvenserna hålls isär och åttondelarna anges rätt. Figurkrediteringen kompletterad med arXiv-versionen, eftersom bildfilen är hämtad därifrån. **Citat:** Salvatore Pernas uttalande återgivet från Max-Born-Institutets och HZB:s engelska pressmeddelanden, ordagrant översatt och märkt ”(översatt från engelska)”. Inget citat är hopsatt av delar. **Egna rimlighetskontroller:** −34 dBm = 0,40 µW (”mindre än en miljondels watt” ✓); 708 eV / 2,25 eV för en grön foton ≈ 314 (”drygt trehundra gånger” ✓); 30 mT / 50 µT ≈ 600 (”ungefär sexhundra gånger jordmagnetfältet” ✓); 12,1 GHz ⇒ ”drygt tolv miljarder varv i sekunden” ✓; 1 THz / 1 GHz = 1 000 ✓. Inga räkneord av typen biljon/biljard förekommer. **Bilder:** huvudbilden är ett äkta foto av en yttriumjärngranatkristall (Krizu, Wikimedia Commons, CC BY-SA 3.0) — bildtexten säger uttryckligen att det är samma material, inte samma prov. Brödtextsbilden är figur 2 d–f ur studien (CC BY 4.0), beskuren, och brödtexten hänvisar korrekt till den som en mätbild. Ingen AI-bild använd. **Områdeskontroll:** grannarna är Kvantfysik (30 augusti) och Astronomi (1 september); magnetism krockar med ingen av dem. |
| 2026-09-01 | `2026-09-01-hundra-ganger-vidare-blick` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad — användaren har bett om att agenter inte startas i den här sessionen). **Peer review-status: ingen ny vetenskaplig publikation finns.** Nyheten är en uppskjutning, inte ett forskningsresultat, och artikeln är skriven så att den aldrig påstår att något upptäckts — allt om den mörka materien står i futurum. `research` pekar därför på ROTAC:s slutrapport (NASA, 24 april 2025), det dokument som fastställde omfattningen på de tre kärnundersökningarna. **Primärkälla:** NASA:s eget presskit (augusti 2026), samtliga 20 sidor lästa i original efter att texten extraherats ur PDF:en; varje sakuppgift i artikeln är hämtad därifrån och korsläst mot NASA:s Roman-blogg, uppdragssidan och Caltech-IPAC. Verifierat: lyft 30 augusti 07.26 EDT = 13.26 svensk tid, Falcon Heavy från Launch Complex 39A, 27 motorer, sidoboostrarnas motorstopp efter 2 min 24 s, separation 07.57 EDT (31 minuter efter lyft), 90 dagars driftsättning, nya bilder i början av 2027, L2 med primärspegel 2,4 m och 186 kg, 18 detektorer à 16,8 miljoner bildpunkter (300 megapixel), 0,281 kvadratgrader, 0,48–2,3 mikrometer, 1,4 terabyte per dygn till New Mexico, Australien och Japan, 20 petabyte över fem år, data fria utan ensamrätt, 5 100 kvadratgrader = 12 % av himlen, mer än en miljard galaxer, universum vid två miljarder års ålder, ungefär en femtedel av materien synlig, omkring 100 000 nya exoplaneter, 12,7 m och 8 000 kg, konstruerad för att kunna tankas. **Egna räkningar (inte hämtade ur någon källa):** L2-avståndet löst numeriskt ur GM_sol/(R+d)² + GM_jord/d² = 4π²(R+d)/T² med R = 1,496 · 10¹¹ m, T = 365,256 dygn ⇒ d = 1,506 · 10⁹ m, vilket ger 1,5 miljoner kilometer och 3,92 månavstånd; Keplerperioden på samma radie utan jordens dragning ⇒ 370,7 dygn, alltså 5,5 dygn mer än ett år; fullmånens area π · (0,26°)² = 0,212 kvadratgrader mot synfältets 0,281 ⇒ ”drygt en fullmånes yta”; 5 100 / 41 253 = 12,4 %. **FYRA rättelser före publicering:** (1) ”Raketen har tre kärnsteg” var fel begrepp — Falcon Heavys FÖRSTA steg består av tre sammankopplade kärnor, formuleringen skrevs om; (2) ”nästan sex dygn mer än jorden” stramades till ”drygt fem dygn” efter egen räkning (5,48); (3) driftsättningens första moment stod i påstådd dåtid (”solpaneler och solskydd fälldes ut”) trots att ingen källa bekräftar utfällningen — ändrat till plan i presens, eftersom artikeln skrivs före den dagen; (4) ”Roman ser i infrarött, alltså i värmestrålning” var en oprecis likhet (WFI arbetar i nära infrarött, 0,48–2,3 µm) — omskrivet till att infraröda teleskop störs av allt varmt i närheten, vilket är NASA:s egen motivering till L2. **Citatet** (Shawn Domagal-Goldman, chef för NASA:s astrofysikavdelning) är översatt från ”When it launches, it's going to do things that currently are impossible”, återgivet i Space.com från en presskonferens i juli; attributionen står i cite-fältet, och citatet är placerat i uppskjutningsavsnittet där futurumet hör hemma. **Dubblettkontroll:** artikeln om Vera C. Rubin Observatory (2026-08-05) och den om SuperCDMS (2026-08-29) handlar båda om mörk materia. Överlappet är medvetet begränsat: Rubin-artikeln förklarar rotationskurvor och linsningens princip, SuperCDMS-artikeln direktdetektion i kristaller, medan denna artikel handlar om lagrangepunkten, synfältets betydelse och frågan om HUR KLUMPIG materien är (kall kontra varm mörk materia). Ingen tidigare artikel nämner Roman. Facktermer: inga träffar på ”upphets”, ”förråda” eller nytillkomna ”biljon/biljard/triljon” (engelskans *billion galaxies* → miljard galaxer, kontrollerat). Inga emojier, inga raka eller tyska citattecken, inga förkortningar. verify-brak, verify-begrepp, verify-sprak och verify-sitemap gröna. **BILDLICENSER:** båda bilderna är NASA-foton ur NASA Image and Video Library, som är fria att använda (NASA:s media usage guidelines) och hämtade via bibliotekets eget API med fotograf ur metadatan: huvudbilden av Falcon Heavy i transit över solskivan (NASA/John Kraus, 30 augusti 2026) och brödtextsbilden av teleskopet i renrummet strax före inkapsling (NASA/Sydney Rohde, 21 augusti 2026). Ingen har vattenstämpel eller inbränd text. Brödtexten hänvisar inte till huvudbilden; renrumsbilden har bildtext som säger vad man ser. En ny ordlistepost (lagrangepunkt) skriven och godkänd av verify-begrepp.js. |
| 2026-08-30 | `2026-08-30-droppen-utan-karl` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad i den här sessionen). **Kollegialt granskad:** Nature Physics, publicerad online 9 juli 2026, DOI 10.1038/s41567-026-03362-9 — tidskrift, hela författarlistan (Zhaopeng Shi, Zerong Huang, Fulin Deng, Wei-Jian Jin, Su Yi, Tao Shi, Dajun Wang) och datumet hämtade ur Crossrefs egen post, inte ur pressreferatet. Nature-sidan är inloggningsspärrad (303 mot idp.nature.com), så samtliga mätvärden är i stället verifierade mot den fria förhandsversionen arXiv:2508.20518 v1 (CC BY 4.0, inskickad 28 augusti 2025), där abstract och hela metoddelen lästes: cirka 500(20) NaRb-molekyler i grundtillståndet, sluttemperatur 20,3(6) nK från 734 nK, BEC-övergången vid ungefär 20 nK, största kondensatandel 70 %, fasrymdstäthet 0,008(1) → 1,7(2), förångningseffektivitet 2,1(2), permanent dipolmoment 3,2 D (mot 4,75 D för NaCs), livstid 2,1(2) s i gasfas och 250(36) ms för droppen, topptäthet 1,8(5) · 10¹² cm⁻³ i gasfas mot 5,9 · 10¹³ cm⁻³ i droppen, gas-till-droppe-övergången vid Δπ = 16,5(1) MHz, tvåkroppsförlust 3,5(4) · 10⁻¹³ cm³/s mot 3 · 10⁻¹² cm³/s vid skärmning med ett enda mikrovågsfält. Egna rimlighetskontroller: 5,9 · 10¹³ / 1,8 · 10¹² = 33 (”trettio gånger tätare” ✓); 6 · 10¹³ / 2,5 · 10¹⁹ = 2,4 · 10⁻⁶, alltså ”några miljondelar av luftens täthet” — en tidigare formulering ”ungefär en miljondel” rättades; 3 · 10⁻¹² / 3,5 · 10⁻¹³ = 8,6 respektive 3,75 mot det initiala värdet, så ”flera gånger om” står kvar medan ett tidigare ”till en fjärdedel” rättades. TRE rättelser före publicering: (1) ”Laget startade med ungefär 80 000 molekyler … nio av tio gick förlorade” ströks — 8(1) · 10⁴ är det INITIALA provet, medan förångningssteget som originalet redovisar motsvarar en faktor ~13, och en egen räkning ur effektiviteten (ln 212 / 2,1 ⇒ 13) bekräftar att de två talen inte hör till samma steg; texten säger nu bara ”ur ett moln vid 734 nK återstod till slut omkring 500 molekyler”. (2) Ordlisteposten om elektrisk dipol påstod att alkalimolekyler når ”det tredubbla” av vattnets 1,85 D — 3,2/1,85 = 1,7 och 4,75/1,85 = 2,6, så det ändrades till ”det dubbla eller mer”. (3) Densitetsjämförelsen i faktarutan, se ovan. **Prioritetsfrågan särskilt granskad:** detta är INTE det första molekylkondensatet — det gjordes 2024 med NaCs i Sebastian Wills grupp vid Columbia University (Nature, DOI 10.1038/s41586-024-07492-z). Både rubrik, ingress och brödtext är skrivna så att de aldrig påstår motsatsen, och det står uttryckligen i texten. Citatet är översatt från originalets ordagranna ”Although this is not the first realization of a molecular BEC, our work demonstrates that evaporative cooling assisted with microwave loss suppression can provide a more general route toward Bose–Einstein condensation of polar molecules”, hämtat ur Phys.org 30 juli 2026, där det attribueras gemensamt till seniorförfattarna Tao Shi och Dajun Wang — cite-fältet återger den attributionen. Facktermer: inga träffar på ”upphets”, ”förråda” eller nytillkomna ”biljon/biljard/triljon”; *evaporative cooling* → förångningskylning, *two-body loss* → tvåkroppsförlust, *shielding* → skärmning, *ground state* → grundtillstånd, kontrollerade mot svensk fysiklitteratur. Inga emojier, inga raka eller tyska citattecken. **BILDLICENSER:** ingen fri pressbild från CUHK eller Nature Physics gick att hitta (inget öppet pressrum för studien, Nature-sidan spärrad). Båda bilderna är därför äkta foton med verifierad fri licens ur Wikimedia Commons, kontrollerade via Commons API: huvudbilden av en glascell med laserkylda rubidiumatomer (Balping, CC BY-SA 4.0) och brödtextsbilden av ett optiskt bord för rubidiumkylning (Tomasz Kawalec, CC BY-SA 4.0). Ingen har vattenstämpel eller inbränd text. Eftersom de visar ANDRA laboratorier än det i nyheten säger både `imageCredit` och bildens `credit` det uttryckligen, och brödtexten hänvisar aldrig till någon bild. Tre nya ordlisteposter (elektrisk dipol, kvantdroppe, förångningskylning) plus kompletterade böjningsformer på Bose–Einstein-kondensat och polarisation, samtliga godkända av verify-begrepp.js. |
| 2026-08-29 | `2026-08-29-jakten-under-jorden` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad i den här sessionen). **Peer review-status: ingen ny vetenskaplig publikation finns.** Nyheten är ett driftbesked från SLAC (26 augusti 2026) om att SuperCDMS SNOLAB börjat ta emot data, inte ett forskningsresultat. Artikeln är därför skriven så att den aldrig påstår att något upptäckts, och `research` pekar på experimentets kollegialt granskade konstruktions- och känslighetsartikel, Physical Review D 95, 082002 (R. Agnese med flera, SuperCDMS-samarbetet, 97 författare, publicerad 7 april 2017, DOI 10.1103/PhysRevD.95.082002) — volym, artikelnummer, författarantal och datum hämtade ur Crossrefs egen post. Abstractet läst i original: målområdet är mörk materia under 10 GeV/c², två detektortyper (HV och iZIP) och två målmaterial (germanium och kisel), initial känslighet ~1 · 10⁻⁴³ cm² vid 1 GeV/c². Varje sakuppgift stämd mot källa: 85 % av materien, 24 ultrarena kisel- och germaniumkristaller i ishockeypucksstorlek, fonon plus laddningssignal, supraledande sensorer som kräver extrem kyla, kylskåp kallare än rymden, skalen av koppar/polyeten/ultrarent bly/radonspärr, mumetallskärmen och blyet från sjunken ballast i Medelhavet — samtliga ur SLAC:s pressmeddelande och dess egna bildtexter, korslästa mot Phys.org 27 augusti. Djup, dämpningsfaktor och renrumsyta hämtade ur SNOLAB:s egen anläggningssida (två kilometer, faktor 50 miljoner, en kosmisk partikel per fyra kvadratmeter och dygn, 5 000 m², ingång på 6 800 fots nivå och 1,8 km kvar att gå). Massgränsen ”under omkring tio protonmassor” står ordagrant på SuperCDMS egen sida. Halveringstiden för bly-210 (drygt 22 år) och skälet att gammalt bly är radiorent kontrollerade separat mot flera oberoende källor. Tidsplanen (tidig fas till i höst, uppvärmning och trimning in i slutet av året, ett års mätning vid full känslighet från 2027) ordagrant ur SLAC. Cartaros citat översatt från originalets ”Even in this early phase, our most sensitive detectors have the potential to deliver breakthrough discoveries. At the same time, we're preparing and testing the entire system, learning how our detectors and cryogenic cooling perform together”; Cushman återges som referat, inte som citat, eftersom hennes uttalande kortats. EN rättelse före publicering: den största rekylenergin angavs först som ”några tiotal elektronvolt”, vilket är för högt. Egen räkning med stötformeln 4mM/(m+M)² och farten 230 km/s ger för en partikel med en protons massa mot germanium (A = 72,63) 0,0540 · 276 eV ≈ 15 eV, och mot kisel (A = 28,09) 0,134 · 276 eV ≈ 37 eV. Texten säger nu ”omkring 15 elektronvolt” och att kisel kan ta emot ungefär två och en halv gånger så mycket — det är också den belagda motiveringen till att båda materialen används. Farten 230 km/s kontrollerad mot standardhalomodellens vedertagna intervall 220–235 km/s och anges i texten som ett antagande. Inga träffar på ”upphets”, ”förråda” eller ”biljon/biljard/triljon” i den nya texten; inga emojier, raka eller tyska citattecken. BILDLICENSER: SLAC:s egna pressbilder på skyddshöljet valdes BORT trots att de passade bäst, eftersom SLAC:s media use guidelines kräver skriftligt tillstånd per e-post före användning — det är en oklar licens enligt projektreglerna. Båda publicerade bilderna är i stället hämtade ur SNOLAB:s sida ”For the media”, som uttryckligen släpper dem som godkända pressbilder (”A selection of approved media images is available below”): huvudbilden av en SuperCDMS-detektorenhet och brödtextsbilden av en gruvkorridor i labbet. Ingen av dem har vattenstämpel eller inbränd text, och brödtexten hänvisar aldrig till någon bild. Två nya ordlisteposter (fonon, WIMP) skrivna och godkända av verify-begrepp.js. |
| 2026-08-27 | `2026-08-27-ljudet-som-lyfter` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad i den här sessionen). Kollegialt granskad: Physical Review Letters 137, 094001, publicerad 24 augusti 2026, DOI 10.1103/pfkh-4x7j — volym, artikelnummer, hela författarlistan (Yusuke Koroyasu, Christopher Stone, Yoichi Ochiai, Takayuki Hoshi, Bruce W. Drinkwater, Tatsuki Fushimi) och datumet hämtade ur Crossrefs egen post, inte ur pressreferaten. Samtliga mätvärden verifierade mot förhandsversionen arXiv:2412.15539 v2, där hela metoddelen lästes i HTML: arbetsområde 141–397 mm (16,5–46,6 våglängder), jämförelsetalet 66,7 mm (7,82 våglängder) för tvillingfällan, sidled 97,7 mm, EPS-kula med radien 0,75 mm och densiteten 40,4 kg/m³, 16 × 16 = 256 givare av typen Murata MA40S4S vid 40 kHz, konvinkel 20 grader i huvudförsöken, lutning −10 till 10 grader ger 5,7 cm/s i sidled, konvinkel 15–25 grader ger 4,3 cm/s i höjdled, samt teblad (~0,8 mm), kiselaerogelskiva (2,3 mm) och potatisstärkelseflaga (1,3 mm). Abstractets egna formuleringar om flerpartikelfällan och stabilitet förbi hinder lästa ordagrant. Båda citaten (Drinkwater om varför den ensidiga kraften mattas av, Fushimi om tillämpningarna) kontrollerade mot pressmeddelandet i Mirage News och mot Phys.org före översättning. TVÅ rättelser före publicering: (1) ”Det tidigare rekordet för en ensidig fälla i fri luft låg på 66,7 mm” skrevs om — originalet redovisar 66,7 mm som mätvärde för en konventionell tvillingfälla, inte som ett publicerat rekord, så formuleringen ändrades till ”med den ensidiga metod som hittills använts, en så kallad tvillingfälla”; (2) ingressens ursprungliga påstående att trycket i en ljudvåg ändras ”några tiotusendels atmosfärer” ströks, eftersom talet inte gick att belägga ur någon källa och varierar med ljudstyrkan. Egna rimlighetskontroller: λ = v/f ger 343/40 000 = 8,58 mm, alltså halva våglängden 4,29 mm (”drygt fyra millimeter”); 397/66,7 = 5,95, alltså ”sex gånger” och ”knappt en sjättedel”; 397 mm / 8,58 mm = 46,3 ≈ de 46,6 våglängder abstractet anger (svarar mot ljudhastigheten 340,7 m/s); 40,4 / 1,2 = 34, alltså ”ett trettiotal gånger tätare än luften”. Historiken kontrollerad separat: akustisk levitation demonstrerad på 1930-talet, icke-diffrakterande besselstrålar beskrivna av J. Durnin med kollegor 1987 (J. Opt. Soc. Am. A 4, 651 samt Phys. Rev. Lett. 58, 1499), Friedrich Bessel tysk astronom och matematiker, hörselns övre gräns ~20 kHz, ljudhastigheten 343 m/s vid 20 °C. Inga träffar på ”upphets”, ”förråda” eller ”biljon/biljard/triljon” i den nya texten. Båda bilderna är äkta foton med fri licens och korrekt krediterade: huvudbilden av Tatsuki Fushimi (CC BY-SA 4.0, samma forskare som är medförfattare) visar en TIDIGARE uppställning, vilket sägs uttryckligen i bildkrediten, och brödtexten hänvisar aldrig till den; brödtextsbilden av Marzo, Barnes och Drinkwater (CC BY 4.0) visar konventionell levitation och har en bildtext som säger vad man ser. |
| 2026-08-26 | `2026-08-26-vakuumet-som-hjalper-till` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad i den här sessionen). Kollegialt granskad: Nature, publicerad online 19 augusti 2026, DOI 10.1038/s41586-026-11037-x — titeln, hela författarlistan (14 namn: Zheyan Wang, Gabriel Cardoso, Liu Yang, Xun Gong, Chi Zhang, Yufei Zhu, Dongbo Zhang, Nan Pan, Hongbing Cai, Yong P. Chen, Qing-Dong Jiang, Guanghui Cheng, Frank Wilczek, Changgan Zeng) och datumet hämtade ur Crossrefs egen post, inte ur pressreferaten. Hela abstractet läst i originalets formulering på nature.com (artikeln i övrigt betalspärrad, ingen förhandsversion på arXiv hittad), och samtliga mätvärden korslästa mot Chinese Academy of Sciences pressmeddelande 19 augusti och Phys.org 24 augusti: kritisk temperatur upp till 5,4 % i ett prov på sex atomlager NbSe2, kraftigt ökad kritisk ström och kritiskt magnetfält nära övergången, kontrollförsök på kavitetens geometri och karaktäristiska frekvens, provets tjocklek, dielektriska material och metallremsor — vilket utesluter töjning, materialförsämring, ojämnhet och metallisk avskärmning — samt den resonanta toppen i förstärkningen som funktion av kavitetens frekvens. Båda citaten (Zeng Changgan om den mörka kaviteten, Frank Wilczek om vakuum som aktör) kontrollerade ordagrant mot Phys.org och CAS före översättning. No-go-teoremet verifierat direkt mot abstractet i arXiv:2608.14784 (Qing-Dong Jiang, inskickad 14 augusti 2026, reviderad 22 augusti): diamagnetiskt positivt bidrag som alltid överväger det paramagnetiska, plus de två utpekade vägarna förbi förbudet (kollektiv mod respektive konkurrerande ordning). Den oberoende NTU-mätningen verifierad mot abstractet i arXiv:2606.19171 (H. Zhang med flera, 17 juni 2026): 3,02 K → 3,41 K i dubbellager vid 0,92 THz, effekten växer mot tvådimensionella gränsen, tolkning via omfördelad elektron-fonon-koppling; artikeln säger uttryckligen att detta är en förhandspublicering utan kollegial granskning. TVÅ rättelser före publicering: (1) ”Ingenting tillfördes provet — varken ljus, ström eller värme” var fel, eftersom transportmätningarna bevisligen skickar ström genom provet; ändrat till att ingen yttre drivning tillfördes, vilket är vad originalet påstår (”without external driving”); (2) ringresonatorns storlek angavs som ”några mikrometer tvärs över” och frekvensjämförelsen som ”ungefär tusen gånger” en mobiltelefons — ingen av uppgifterna gick att belägga ur källorna, så storleken skrevs om till ”mikrometerstor” och jämförelsen till ”hundratals gånger” (1 THz mot 1–3 GHz ger 300–1000). Samma storleksrättelse gjord i ordlisteposten om kavitet. Egna rimlighetskontroller: 1 THz ger våglängden c/f = 0,3 mm (stämmer med faktarutan); 5,4 % av 6–7 K är 0,3–0,4 K, alltså ”någon tiondels grad” som artikeln skriver; NbSe2:s bulkövergång 7,2 K kontrollerad mot oberoende litteratur, och att gränsen sjunker med tjockleken. Historiken kontrollerad separat: Casimirs förutsägelse 1948, den första noggranna mätningen 1997, Lambskiftningen 1947, Wilczeks nobelpris i fysik 2004 tillsammans med David Gross och David Politzer för asymptotisk frihet. Inga träffar på ”upphets”, ”förråda” eller ”biljon/biljard/triljon” i den nya texten. Huvudbilden är ett äkta foto av Meissnereffekten (Mai-Linh Doan, Wikimedia Commons, CC BY-SA 3.0, attribution krävs och angiven) — den visar supraledning i allmänhet, inte försöket, och brödtexten hänvisar aldrig till bilden. |
| 2026-08-25 | `2026-08-25-vagfunktionen-fotograferad` | RÄTTA FÖRST → GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad i den här sessionen). Kollegialt granskad: Nature Communications 17, 5457, publicerad online 19 juni 2026 — volym, artikelnummer, hela författarlistan (14 namn) och datumet hämtade ur Crossrefs egen post, inte ur pressreferaten; licensen CC BY 4.0 bekräftad där. Samtliga mätvärden verifierade mot den fria fulltexten arXiv:2502.18269 v3 (CC BY 4.0), där hela metoddelen och figurtexterna lästes: HHG-källan ställbar 13–71 eV, tio använda fotonenergier mellan 20,5 och 63,8 eV, PTCDA-monolager i tegelmönster på Ag(110), upplösning ~0,75 Å begränsad av den högsta kinetiska energin 63,8 eV, sju fotonenergier mest tillförlitliga och fyra tillräckliga i gynnsamma fall, ~2 timmar per datamängd, maximum i z-profilen vid 0,8 Å. Mathias citat kontrollerat ordagrant mot både Göttingens pressmeddelande (via EurekAlert!) och Phys.org före översättning. TRE rättelser före publicering: (1) enhetsfel — 0,75 Å angavs som ”75 biljondels millimeter”, rätt är 75 miljarddels millimeter (0,75 Å = 7,5 · 10⁻⁸ mm), exakt den räkneordsfälla agentreglerna varnar för; (2) ett helt stycke ströks som påstod att mätning och DFT gick isär ett par ångström ut från molekylplanet och tillskrev skillnaden silverytan — författarna skriver tvärtom ”excellent agreement between experiment and DFT in both the in-plane structure and the z-dependence”, så påståendet var granskarens egen figurläsning och motsade originalet; ersatt med den belagda kontrollpoängen att teorin aldrig matades in i återskapandet; (3) ”de dryga 1,4 ångström” mellan kolatomerna stramades till ”omkring 1,4 ångström” (aromatiska C–C-avstånd ligger på 1,39–1,42 Å). Egna rimlighetskontroller: k_max = √(2mE)/ħ ger 4,1 Å⁻¹ vid 63,8 eV, vilket svarar mot π/k ≈ 0,77 Å och stöder den angivna upplösningen; femtosekund = miljondels miljarddels sekund kontrollerat (10⁻⁶ · 10⁻⁹ = 10⁻¹⁵). Historiken kontrollerad separat: POT infört 2009, Schrödingerekvationen 1926, Einsteins nobelpris i fysik 1921 för fotoelektriska effekten, direkta metoder mot fasproblemet nobelpris i kemi 1985, attosekundfysiken nobelpris i fysik 2023. Inga träffar på ”upphets”, ”förråda” eller kvarvarande ”biljon/biljard/triljon” i den nya texten. Huvudbilden är AI-genererad (ingen fri fotografisk bild finns — Göttingens pressbild är en principskiss utan angiven licens) och krediterad som sådan; brödtexten hänvisar aldrig till den. Brödtextsfiguren är studiens egen figur 3, CC BY 4.0, korrekt krediterad. |
| 2026-08-21 | `2026-08-21-infrarod-farg` | GODKÄND | Självständig slutgranskning i utgivarrollen (ingen separat agent startad i den här sessionen). Kollegialt granskad: Science Advances 12 (31), eaed0245, publicerad online 31 juli 2026 — volym, artikelnummer, hela författarlistan (Fu, Zou, Yang, Hao, Tang, Mu) och datumet hämtade ur Crossrefs egen post, inte ur pressreferaten. Originalartikeln är betalspärrad (403 mot science.org) och saknar förhandsversion på arXiv, så samtliga mätvärden är verifierade mot Europe PMC:s abstract-post och korslästa mot Physics World, Tech Xplore och Popular Science: detektion bortom 2 µm, luminans över 700 cd/m², foton-till-foton-verkningsgrad 3,85 %, urskiljningsförmåga över två tiopotenser bättre än enfärgat läge, glasögonens vikt 23 g. Tangs citat kontrollerat ordagrant mot Physics World före översättning. Egna rimlighetsräkningar: E = hc/λ ger 0,62 eV vid 2 µm, 1,8 eV vid 700 nm och 3,1 eV vid 400 nm — det stöder artikelns påstående att en infraröd foton är för klen för näthinnans färgämne. Två formuleringar stramades åt före publicering: luminansjämförelsen (”i samma härad som en mobilskärm inomhus” → ”i nivå med en ljusstark mobilskärm”, eftersom 700 cd/m² ligger över en typisk inomhusskärm), och det biologiska försöket ströks helt — källorna motsäger varandra (The Debrief skriver implantat i möss, Tech Xplore skriver mänsklig näthinna), och utan tillgång till metoddelen går arten inte att belägga. Artikeln påstår därför bara det forskarna själva pekar ut som nästa steg. Inga träffar på ”upphets”, ”biljon/biljard/triljon” eller ”förråda” i den nya texten. Huvudbilden är AI-genererad (studiens figurer ligger bakom betalvägg utan fri licens) och krediterad som sådan; brödtexten hänvisar aldrig till den. |
| 2026-08-18 | `2026-08-18-tredjedels-laddning` | RÄTTA FÖRST → GODKÄND | Två rättelser före publicering: faktarutan påstod att amperen och kilogrammet ”definieras med hjälp av naturkonstanter som effekten hjälper till att mäta” (löst och delvis fel — ändrat till det belagda: resistansen på platåerna beror bara på Plancks konstant och elementarladdningen, och effekten är internationell resistansnormal sedan 1990), samt ett överdrivet påstående om topologiska kvantdatorer (de mätta kvasipartiklarna är abelska; texten säger nu uttryckligen att en mer svårfångad sort krävs). En källrad som pekade på EPFL:s labbsida i stället för på ett faktiskt pressmeddelande byttes mot den verifierade återpubliceringen hos Mirage News. Samtliga mätvärden verifierade mot förhandsversionen arXiv:2509.04209 v2 (CC BY 4.0), inte mot pressreferatet: q = e/3 vid ν = 4/3, 5/3 och 7/3, q = 2e/3 vid ν = 2/3, q = 3e/5 vid ν = 3/5, blandade signaturer vid ν = 8/3; bastemperatur ~10 mK; B = 5 T (heltal) respektive 8 och 13,5 T (bråktal); antidotens litografiska diameter 190 ± 5 nm. Att shot noise-mätningar och Fabry–Perot-interferometrar är de etablerade alternativen, och att avläsningen bygger på Aharonov–Bohm-oscillationer, kontrollerat ordagrant i artikeltexten. Di Luca-citatet stämt mot EPFL-referatet. Historiken kontrollerad separat: von Klitzing 1980 (Nobelpris 1985), Tsui/Störmer 1982, Laughlin 1983 (Nobelpris 1998), grafen 2004 (Nobelpris 2010), R_K som resistansnormal från 1 januari 1990, elementarladdningens exakta värde fastlagt 2019. Rimlighetsräknat: e/3 = 5,3 · 10⁻²⁰ C, 13,5 T ≈ 270 000 × jordens fält, 2,7 K / 0,01 K ≈ 270, hårstrå ≈ 370 × 190 nm. Inga träffar på ”biljon/biljard/triljon” eller ”upphets” i den nya texten. Kollegialt granskad, Nature Physics, publicerad online 14 augusti 2026 (DOI 10.1038/s41567-026-03412-2, författarlista och datum verifierade via Crossref). Huvudbilden är AI-genererad (ingen fri riktig bild finns — EPFL:s och Rochesters pressbilder kräver skriftligt tillstånd) och krediterad som sådan; brödtextsbilden är CC BY 4.0 ur förhandsversionen, korrekt krediterad och beskuren. |
| 2026-08-16 | `2026-08-16-protonaccelerator-i-ornen` | RÄTTA FÖRST → GODKÄND | Fem rättelser före publicering: LHC-protonernas andel av 1 PeV angavs som en sjuhundradel (rätt: en hundrafemtiondel, 6,8 TeV), antalet kända PeVatron-kandidater sattes till ”ett tjugotal” trots att studien själv utgår från LHAASO:s 43 källor, en obelagd årtalsuppgift (”sedan 2021”) om LHAASO:s katalog ströks och ersattes med anläggningens verifierade läge och storlek, faktarutans energijämförelse byggde på en mygga (rätt storleksordning är ett fallande riskorn: 1 PeV = 1,6 · 10⁻⁴ J mot myggans ~10⁻⁶ J), samt ett grammatikfel i ordlisteposten. Räkneorden kontrollerade mot originalet: quadrillion → biljard (10¹⁵), trillion → biljon (10¹⁴ eV = hundra biljoner eV). Energibudgeten (1–5) · 10⁴⁹ erg, gastätheten ~10 cm⁻³, avståndet 1,7 kpc ≈ 5 500 ljusår, spektralindex 2,1, Fermi-LAT-intervallet 0,4–409,6 GeV och Chandras röntgengräns verifierade mot arXiv:2605.02208 v2, inte mot pressreferatet. Mizuno-citatet kontrollerat ordagrant mot både pressmeddelandet och Phys.org. Kollegialt granskad, The Astrophysical Journal 1006:77 (16 juli 2026). Båda bilderna fritt licensierade (NASA/SVS public domain respektive CC BY 4.0) och korrekt krediterade. |
| 2026-08-15 | `2026-08-15-spokglod-fran-avstallt-karnkraftverk` | RÄTTA FÖRST → GODKÄND | Tre rättelser före publicering (författarantalet 94→borttaget efter tvetydig Crossref-räkning, bildtextens ”uppmätta” 44 % ändrat till ”förväntade” för att stämma med brödtextens modellberäkning, obelagd frekvensuppgift ”ett par gånger om året” ändrad till källans ”sällsynta tillfällen”). Citat, halveringstider och övriga tal verifierade mot arXiv:2510.04869. Kollegialt granskad, PRL 137, 061803 (4 augusti 2026).
| 2026-08-14 | `2026-08-14-diamant-i-flytande-kol` | RÄTTA FÖRST → GODKÄND | Tre rättelser före publicering (ingressen påstod att flytförmågan var ny — den visades för tjugo år sedan och bekräftas nu; en mening lät läsaren tro att artikeln kände till lagets motiv för reflektivitetsmätningen; ett genusfel i första meningen). Samtliga fem citat och varje siffra stämda av mot LLNL:s pressmeddelande i den ordagranna Phys.org-återgivningen. Titel, författarlista och publiceringsdatum verifierade via Crossref. Kollegialt granskad, Nature Physics 2026-08-13. |
| 2026-08-13 | `2026-08-13-rugbybollen-i-atomkarnan` | GODKAND | Alla siffror i produktionskedjan, matuppstallningen (RISIKO/PI-LIST), karnmomenten (Q_S, mu), Schmidt-gransen, californium-jamforelsen och modelljamforelsen verifierade mot arXiv:2511.20921. Peer-reviewad, PRL 136, 192501 (15 maj 2026). Inga citat i artikeln. Bilden ar CC BY 2.0 fran Oak Ridge (HFIR), korrekt krediterad.
| 2026-08-12 | `2026-08-12-magnetisk-tratt` | RÄTTA FÖRST → GODKÄND | Tre precisionsrättelser före publicering (ALMA-lobens storlek i jord–sol-avstånd, jämförelsen mot jordens magnetfält, temperaturintervallet i ordlisteposten om ackretionsskivor). Samtliga siffror verifierade mot arXiv-versionens metoddel, inte mot pressreferatet. Kollegialt granskad i Nature Communications. |
| 2026-08-11 | `2026-08-11-spegeln-som-ljuger` | RÄTTA FÖRST → GODKÄND | Fyra rättelser före publicering (simulerade kontra uppmätta korrelationer, neuronnätsattackens två felformuleringar, 53,3λ utan angiven våglängd, ”ingen elektronik” i ingressen). Hela metoddelen läst i arXiv-PDF:en; datum, författare och CC BY-licens verifierade via Crossref. Kollegialt granskad, öppet tillgänglig. |
| 2026-08-10 | `2026-08-10-solformorkelse-sverige` | RÄTTA FÖRST → GODKÄND | Två räknefel funna och åtgärdade före publicering (vinkelstorlekens vardagsjämförelse, solglasögonens transmission). Alla svenska siffror verifierade mot Astroinfos råtabell, inte mot en referatsammanfattning. |
| 2026-08-09 | `2026-08-09-flygande-fokus` | RÄTTA FÖRST → GODKÄND | Tre formuleringar rättade (bildtextens ”tre mellersta”, ”hela effekten” vid 4,8 J, 2004 som årtal). Hela originalartikeln lästes i PDF — samtliga siffror verifierade mot den. |
| 2026-08-07 | `2026-08-07-virvlar-pa-solens-yta` | RÄTTA FÖRST → GODKÄND | Två fel funna och åtgärdade (Kelvin/Helmholtz-datering, fotosfärens tjocklek). Originalpublikationen gick INTE att öppna — se anteckningen nedan. |

---

## 2026-08-13 — `2026-08-13-rugbybollen-i-atomkarnan`

**Granskningslage:** sjalvstandig slutgranskning (utgivarrollen), samtliga
kallor oppnade via WebFetch/WebSearch.

**0. Peer review-status.** Publicerad, kollegialt granskad, i Physical
Review Letters 136, 192501, 15 maj 2026 (DOI 10.1103/2813-b49x). DOI:n
loste upp till link.aps.org (302-redirect bekraftad); PRL-sidan sjalv ar
betalsparrad (403), sa samtliga siffror och metodbeskrivningar ar i stallet
verifierade mot den fritt tillgangliga forhandsversionen arXiv:2511.20921
(v1, inskickad 25 nov 2025). En oberoende soktraff citerade exakt samma
mu- och Q_S-varden ur den publicerade PRL-versionen.

**1. Produktionskedjan — allt stammer mot arXiv-metoddelen:** 34 ng /
8,8e13 atomer Es-254 fran Oak Ridge, 7 dygns neutronbestralning vid ILL
Grenoble, 4 dygns avsvalning, 7,5e10 atomer Es-255 (T1/2 = 39,8 dygn) som
generator, fermiumfraktionen deponerad pa zirkoniumfolie, prov om 1e8-1e9
atomer Fm-255 per matning, Fm-255 halveringstid 20 timmar. Samtliga siffror
funna ordagrant i arXiv-texten.

**2. "Mindre an en biljondels gram" — rimlighetsberaknat:** 1e9 atomer
Fm-255 x 255 u x 1,6605e-24 g/u = ca 4,2e-13 g = 0,42 pg, vilket ar MINDRE
an 1e-12 g (en biljondels gram; biljon = 1e12 i svensk betydelse). Pastaendet
haller. Grep pa "biljon/biljard/triljon" i hela data/nyheter.js gav bara
denna artikels egna, korrekta traffar (inga "billion/trillion"-fellan).

**3. "En tiotusendel av ett saltkorn" — egen illustration, ej kallbelagd
men matematiskt forsvarbar.** Ett saltkorn pa ca 0,3 mm sida (densitet
2,16 g/cm3) vager ca 58 mikrogram och innehaller ca 1,2e18 joner.
8,8e13 / 1,2e18 = 7,3e-5, samma tiopotens som 1e-4 ("en tiotusendel").
Skribentens egen jamforelse, hedgead med "i storleksordningen" — ingen
rattning kravs, men beroende av antagen saltkornsstorlek.

**4. Matuppstallningen — verifierat mot arXiv:** RISIKO-masseparatorn i
Mainz, PI-LIST (spektroskopilaser vinkelratt mot atomstralen), ugnstemp.
900 grader C (OBS: Mainz pressmeddelande skriver lost "ungefar 1000 grader
C" — artikeln foljer korrekt forskningsartikelns precisa siffra, inte
pressreferatets avrundning), 398,4 nm och 398,2 nm (25099 resp. 25111
cm-1 omraknat), 30 keV accelerationsspanning, dopplerbreddning ca 50 MHz,
linjebredder 230 MHz och 350 MHz med ratt angiven orsak (effektbreddning —
arXiv: "power broadening dominated").

**5. Hyperfinstruktur.** Karnspinn I = 7/2, ger 2I+1 = 8 hyperfinnivaer
per atomar niva (arXiv-formulering). 22 forvantade/15 uplosta komponenter
i R1 och 21/13 i R2 — matchar arXiv exakt.

**6. Karnmomenten.** Q_S = +5,84 +/- 0,13 eb och mu = -0,75 +/- 0,05 muN —
detta ar arXiv-abstraktets egen huvudsiffra, atergiven ordagrant. Artikelns
brodtext later denna siffra sta oemotsagd; det mer precisa, kombinerade
resultatet -0,743(49) muN star pa ett annat stalle i arXiv-artikelns
resultatdel/tabell. Bagge siffrorna finns alltsa i originalet, i olika
delar (abstrakt kontra resultattabell), och nyhetsartikeln ateger korrekt
abstraktets citerbara varde. Ingen diskrepans att ratta.

**7. Schmidt-gransen.** -1,913 muN, foljer av enpartikel-skalmodellen med
en enda oparad neutron (arXiv: "simplified single-particle shell model
that assumes the total nuclear magnetic moment equals the moment of its
single unpaired nucleon"). Att detta exakta varde ocksa ar en fri neutrons
magnetiska moment stammer (CODATA: mu_n = -1,91304 muN): for en oparad
neutron i tillstand med j = l + 1/2 forsvinner banbidraget (g_l = 0 for
neutronen) och Schmidt-vardet blir per definition identiskt med neutronens
egen spinn-g-faktor, dvs. det fria vardet. Fysikaliskt korrekt
tillaggsinformation. 2005 ars varde (Backe m.fl., Hyperfine Interactions,
2005) lag bevisligen utanfor/nedanfor gransen ("in fact, it is below the
Schmidt line ... hence in unphysical space").

**8. Californium-253.** N = 253 - 98 = 155 (isoton med Fm-255). mu = -0,731
+/- 0,035 muN, Q_S = 5,53 +/- 0,51 eb — exakt de varden som star i
arXiv-artikelns tabell.

**9. Modelljamforelsen.** Hartree-Fock-Bogoljubov inom 5 % pa bada
storheterna ("deviation from the HFB results remains below 5% in both
cases"). Den andra modellen (MREDF, ej namngiven i artikeln, vilket ar
okej) overskattar mu med ca 25 % och Q_S med ca 6 % — matchar arXiv exakt.

**10. Faktarutan.** Ivy Mike 1952 som upptacktsplats for bade fermium och
einsteinium — oberoende bekraftat via sokning. Fermium som tyngsta
grundamne i vagbara (pikogram-)mangder — vedertagen beskrivning i
karnkemilitteraturen. 39 forskare (raknat i hela forfattarlistan pa
arXiv — exakt 39 namn), 18 institutioner, sju lander (Tyskland, Sverige,
USA, Frankrike, Polen, Belgien, Schweiz — raknat ur affilieringslistan).
Forstaforfattaren Mitzi Urquiza-Gonzalez vid Goteborgs universitet —
bekraftat i bade Mainz pressmeddelande och soktraff.

**11. Peer review och dagsfarskhet.** Se punkt 0. Artikeln pastar aldrig
att forskningen ar "ny idag"; research.citation anger korrekt datum
(15 maj 2026), och artikelns eget publiceringsdatum (2026-08-13) ligger
tre manader senare — samma cykel som Mainz/Phys.org/EurekAlert-
pressbevakningen, en normal fordrojning for uppfoljande popularvetenskaplig
bevakning.

**12. Bilden.** HFIR reactor pool (4092138191).jpg, Oak Ridge National
Laboratory, CC BY 2.0 — bekraftat pa Flickr-originalet. imageCredit
("Foto: Oak Ridge National Laboratory (CC BY 2.0)") ar korrekt och
tillrackligt. Bilden foreställer branslelement i reaktorbassangen, vilket
stammer med imageAlt. Redlig: pastar inget om Mainz-matningen, och Oak
Ridge (HFIR) ar en akta del av produktionskedjan (ursprunget till
Es-254-ravaran) — ingen vilseledande koppling.

**Noterat men INTE rattningskravande:**
1. research.citation listar "S. Raeder, D. Hanstorp, C. E. Duellmann och
   K. Wendt" efter de fem forsta forfattarna. Alla fyra ar verkliga
   medforfattare, men den inbordes ordningen foljer inte originalets
   byline-ordning (Raeder ar #32, Hanstorp #17, Duellmann #13, Wendt #39
   av 39) — sannolikt ett medvetet val att lyfta fram gruppledare, vanlig
   praxis i kortciterade storsamarbeten, men inte bokstavstrogen atergivning
   av forfattarordningen.
2. "Ett tjugo ar gammalt matvarde" (2005 till 2026) ar egentligen 21 ar.

**Utslag: GODKAND.** Inga citat forekommer i artikeln (inget att
kontrollera enligt punkt 4 i granskningsmallen). Samtliga siffror,
peer review-status, kallanlankar, facktermer och bildkreditering haller.

## 2026-08-12 — `2026-08-12-magnetisk-tratt`

**Granskningsläge:** självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen fick inte starta subagenter).

**0. Publikationens status.** T.-C. Ching m.fl., ”Unveiling dominant toroidal
magnetic fields in a protostellar outflow”, Nature Communications,
11 augusti 2026, DOI 10.1038/s41467-026-75950-5. Kollegialt granskad.
HTML-sidan på nature.com kräver inloggning och PDF:en gick inte att hämta
(303 till idp.nature.com; Semantic Scholar rapporterar ingen öppen PDF), så
metoddelen lästes i stället i förhandsversionen arXiv:2604.12597v1
(inlämnad 14 april 2026, licens CC BY-NC-ND 4.0). Titel, författarlista och
DOI stämmer mellan de två.

**1. Varje siffra mot originalet.** Kontrollerade mot arXiv-versionen:
fältstyrkan 0,3–6,0 mG (>3 mG vid 300 au, <2 mG vid 500 au), lobstorleken
147 × 99 au, upplösningsförbättringen 31 gånger (pressen skriver ”ungefär
30”), polarisationsgraden ~0,5 %, utflödeshastigheten ~10 km/s,
rotationsfarten 4,0 km/s och Alfvénhastigheten 4,1 km/s vid 400 au,
joniseringsgraden ~10⁻⁶, anpassningens signifikans 3,3σ och drifthastigheten
(5,9 ± 1,8) · 10² cm/s. Enhetsomräkningen 0,3–6,0 mG → 30–600 nT
kontrollräknad (1 G = 10⁻⁴ T). Avståndet 960 ljusår stämmer mot artikelns
293 ± 22 pc.

**2. Räkneordskontroll.** Inga *billion/trillion*-ord i källorna och inga
biljon/biljard/triljon i texten. Storleksordningarna uttrycks i stället som
nanotesla och tusendels gauss.

**3. Citaten.** Två citat, båda från NRAO:s pressmeddelande och hämtade i sin
helhet (den första hämtningen trunkerade dem vid 125 tecken, så sidan hämtades
om med uttrycklig instruktion att återge dem oavkortat). Översättningarna
kontrollerade mening för mening mot engelskan. Girarts affiliering och
hänvisningen till Science 2006 stämmer.

**4. Rättat före publicering.**
- ”ungefär hundra gånger avståndet mellan jorden och solen” beskrev bara
  lobens kortaste axel (99 au) — ändrat till ”hundra till hundrafemtio”, som
  täcker 147 × 99 au.
- ”jordens magnetfält … hundra till tusen gånger mer” stämde inte i båda
  ändarna (0,5 G / 6,0 mG ≈ 83). Omskrivet till ”närmare hundra gånger mer än
  det starkaste som mättes här, och närmare tusen gånger mer än det svagaste”.
- Ordlisteposten om ackretionsskivor angav ”några hundra grader” kring en ung
  stjärna; den inre skivan är betydligt hetare. Ändrat till ”några hundra till
  några tusen grader”.

**5. Överdrifter som kontrollerades men höll.** Förstahetsanspråket
(”den första upplösta mätningen”) står i artikelns egen abstract
(”toroidal fields in protostellar winds remain observationally unresolved”)
och i Chings citat. Jämförelsen med jetstrålar från svarta hål är hedgad
(”som astronomer tror ligger bakom”). Rubrikens ”lindat som en fjäder”
speglar pressens ”magnetic corkscrew” och motsägs inte av texten, som
korrekt säger att den uppmätta komponenten är den som går *runt* strålen.

**6. Bilden.** Konstnärlig gestaltning från NSF NRAO
(NSF/AUI/NSF NRAO/M. Weiss), CC BY 4.0 enligt NRAO:s bildpolicy. Ingen text,
ingen vattenstämpel. Brödtexten hänvisar aldrig till bilden som om den vore
en mätning.

**Utslag: GODKÄND** efter de tre rättelserna.

---

## 2026-08-11 — `2026-08-11-spegeln-som-ljuger`

**Granskningsläge:** självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen fick inte starta subagenter).

**0. Publikationens status.** ”Lying mirror using structured surfaces”,
Nature Communications, publicerad 7 augusti 2026, DOI 10.1038/s41467-026-76488-2.
Kollegialt granskad tidskriftsartikel, alltså inte ett preprint eller en
konferenspresentation. Öppet tillgänglig under CC BY 4.0 — licensen, datumet,
författarlistan (Yuhang Li, Shiqi Chen, Bijie Bai, Aydogan Ozcan; de två första
med lika stort bidrag) och abstractet hämtade via `api.crossref.org/works/<DOI>`,
eftersom nature.com svarar med 303 till inloggningssidan. Metoddelen lästes i
sin helhet i arXiv-versionen (2410.15521v2), utdragen ur PDF:en med pypdf.

**1. Varje siffra i artikeln kontrollerad mot originalet.**
120 × 120 fasfält à ~λ/2 i grunddesignen ✓; 53,3λ axiellt ✓; korrelationerna
(Pearson) 0,97 / 0,97 / 0,95 för Fashion-MNIST, MNIST och QuickDraw ✓;
0,92 för Fashion-MNIST-modellen blindtestad på ImageNet ✓;
0,87 / 0,84 / 0,79 för varianten utan mellanrum ✓; 150 × 150 fält i
mikrospegelmatrisen ✓; 480 / 550 / 600 nm ✓ (blå/grön/röd — kontrollerat att
inte färgerna kastats om); bredbandsversionen tränad 520–570 nm med korrelation
över 0,85 i intervallet 500–600 nm ✓; ±5° betraktningsvinkel ✓;
polarisationsokänslig ✓; neuronnätsattacken 500 respektive ~10 000 par ✓.
Inga stora räkneord förekommer i artikeln, så miljard/biljon-fällan är inte
aktuell; ”10 000” är skrivet med hårt mellanslag.

**2. Fyra rättelser krävdes.**
(a) *Simulering framställd som mätning.* Korrelationerna 0,87 / 0,84 / 0,79
gäller de NUMERISKA designerna av varianten utan mellanrum (figur 7), medan
stycket handlade om det fysiska försöket. ”I simuleringarna” infogat.
(b) *Neuronnätsattacken beskriven fel åt två håll.* Originalet säger att ett
litet träningsunderlag inte kunde återskapa de FINARE detaljerna, och att just
de finare dragen började framträda vid 500 par. Utkastet skrev ”gick det inte
alls” respektive ”grova drag”. Båda omskrivna.
(c) *53,3λ utan referensvåglängd* blir ingen längd alls. Meningen anger nu
uttryckligen att omräkningen till 0,029 mm gäller det gröna ljuset.
(d) *”Ingen elektronik” i ingressen.* Spegeln som komponent är passiv, men i
själva försöket satt motivet på en elektroniskt styrd ljusmodulator. Ingressen
lovar nu i stället att förvandlingen sker i ljusets gång genom mönstret.

**3. Citatet.** Ozcans mening är återgiven i svensk översättning och
attribuerad till Phys.org, som är där den publicerades. Inga andra citat
förekommer. Ingen formulering är hämtad ur Phys.org-texten som sådan.

**4. Överdrifter prövade.** Rubrikens ”vad man än håller framför den” speglar
studiens uttryckliga konstruktionsmål — designen ska fungera för oändligt många
okända motiv, inte memorera ett fåtal — och underbyggs numeriskt av
generaliseringstesterna. Andra stycket anger ändå direkt det faktiska
försökets omfattning (tio osedda handskrivna siffror), så läsaren blir inte
vilseledd om vad som är uppmätt. Godkänt.

**5. Begränsningarna står i texten**, inte bara i granskningen: koherent
laserljus, elektroniskt visat motiv, noga inställt bildplan, utbilder på
bråkdelar av en millimeter, och att drift i vanligt dagsljus hittills bara
visats i simuleringar. Likaså att döljandet är kamouflage och inte kryptering.

**6. Bilderna.** Båda är figur 8 ur studien, CC BY 4.0, med upphovsangivelse.
Huvudbilden är ett utsnitt ur panel c och innehåller enbart äkta kamerabilder —
beskuret så att panelbeteckningar, färgskala och skalstreck faller utanför, och
alltså utan inbränd text. Bild 2 är panel b med sina engelska etiketter, vilket
är i sin ordning för en figur i brödtexten; bildtexten förklarar vad man ser.
Ingen AI-bild behövdes.

**Utslag: GODKÄND** efter rättelserna i punkt 2.

---

## 2026-08-10 — `2026-08-10-solformorkelse-sverige`

**Granskningsläge:** självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen fick inte starta subagenter). Artikeln är
beställd av användaren och datumgrindad till 2026-08-10.

**0. Ursprunget.** Uppslaget kom från en TT-text publicerad i Falköpings
tidning. Den texten är upphovsrättsskyddad och har INTE använts som underlag —
varken formuleringar, disposition eller de citat den innehåller (Peter Linde,
Erik Ryderberg). Inget citat förekommer i artikeln. Samtliga sakuppgifter är
hämtade från ursprungskällor och kontrollerade där.

**1. Svenska hålltider och täckningsgrader — verifierade i RÅKÄLLAN.**
Astroinfos tabell hämtades med curl och lästes som text, inte via ett
sammanfattande referat: Kiruna 18.48/19.42/81,7&nbsp;%/0,8495, Stockholm
19.03/19.56/80,9&nbsp;%/0,8433, Göteborg 20.00/83,0&nbsp;%, Malmö
19.10/20.03/83,3&nbsp;%/0,8623. Tabellens egna kolumnrubriker är ”%yta” och
”storlek”, och sidan påpekar själv att diameterandelen normalt är större än
ytandelen — vilket är exakt den poäng artikelns avsnitt ”81 procent eller 86”
bygger på. Detta är också förklaringen till att andra svenska sajter uppger
86–88&nbsp;procent: de anger diameterandelen.

**2. Förmörkelsens tekniska data** (17.46 UT, magnitud 1,0386, 294&nbsp;km
skuggbredd, 2&nbsp;min 18&nbsp;s, saros 126) kommer från NASA/GSFC:s
eclipse-katalog (Espenak) och stäms av mot Wikipedias artikel, som ger samma
värden plus positionen 45&nbsp;km väster om Island. Spaniens solhöjder
(12°/8°/8°/2°) och lokala klockslag är från Instituto Geográfico Nacional.

**3. Historiken kontrollerad:** första totala över europeiska fastlandet sedan
1999 och över Spanien sedan 1905; Sveriges senaste 1954-06-30, nästa
2126-10-16. ”Största över Sverige sedan mars 2015” stämmer — mellanliggande
förmörkelser (2021, 2022, 2025) nådde bara 20–40&nbsp;procent i Sverige, medan
2015 nådde 80–95&nbsp;procent och alltså var djupare. Formuleringen ”största
sedan 2015”, inte ”första sedan 2015”, är därför den korrekta (TT-texten
skriver ”första gången sedan 2015”, vilket inte stämmer).

**4. Ögonsäkerheten:** ISO&nbsp;12312-2:s gräns 0,00032&nbsp;procent
transmittans är kontrollerad; ”mindre än en trehundratusendel” stämmer
(3,2&nbsp;·&nbsp;10⁻⁶ = 1/312&nbsp;500). NASA:s säkerhetssida är källa för
förbudet mot kikare/teleskop även med glasögon, och för hålkameran.

**5. Två fel funna och rättade före publicering:**
(a) ”en drygt centimeterstor knapp på tio meters håll” som bild av en halv grad
    var fel med nästan en tiopotens — 0,5° på 10&nbsp;m är 8,7&nbsp;cm. Ändrat
    till en ärta på drygt en meters håll.
(b) ”Vanliga solglasögon ligger många tiopotenser fel” preciserat: solglasögon
    släpper igenom storleksordningen tio procent, alltså tiotusentals gånger
    för mycket (0,1 / 3,2&nbsp;·&nbsp;10⁻⁶ ≈ 31&nbsp;000).

**6. Rimlighetskontroller som gjordes:** 19&nbsp;000&nbsp;lux vid
81&nbsp;procents täckning (100&nbsp;000&nbsp;lux fullt solljus) och kvoten mot
fullmånens ~0,25&nbsp;lux ⇒ ”tiotusentals gånger starkare”, hålkamerans
bildstorlek 2&nbsp;m&nbsp;·&nbsp;0,0093 ≈ 1,9&nbsp;cm, samt solhöjden i södra
Sverige vid maximum (~5°, konsistent med att förmörkelsen slutar ungefär vid
solnedgången). Inga räkneord av typen biljon/biljard förekommer i artikeln.

**7. Bilder:** alla tre är äkta NASA-foton i public domain, hämtade ur NASA:s
bildbank och granskade var för sig — ingen AI-bild. Toppbilden visar en djupt
förmörkad sol strax över horisonten, vilket är just den situation Sverige får.
Bildtexten till diamantringen anger uttryckligen att bilden är från Oregon 2017,
så ingen kan tro att den visar den kommande förmörkelsen.

**8. Nya begrepp:** kärnskugga, halvskugga, meteor och perseiderna. Ordet
”magnitud” undveks medvetet i artikeln — ordlistan har redan ett uppslag om
stjärnors magnitud, och autolänkningen hade då kopplat förmörkelsemagnituden
till fel begrepp.

**Utslag: GODKÄND** efter rättelserna i punkt 5.

---

## 2026-08-09 — `2026-08-09-flygande-fokus`

**Granskningsläge:** självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen skulle inte starta subagenter). Artikeln är
förhandsskriven kvällen 2026-08-08 och datumgrindad till midnatt.

**1. Originalpublikationen — LÄST I SIN HELHET.** `nature.com/articles/...`
gav 303 mot inloggningen, men artikeln är öppet tillgänglig och
PDF:en (`.../s41567-026-03352-x.pdf`, 13 sidor) laddades ner utan hinder och
lästes i original — abstract, brödtext, samtliga figurtexter och referenslistan.
Ingen uppgift i artikeln vilar alltså på Phys.org-referatet.

**2. Peer review-status:** *Nature Physics*, mottagen 6 december 2025, accepterad
29 maj 2026, publicerad online 10 juli 2026. Kollegialt granskad. Licens
CC BY-NC-ND 4.0, © The Author(s) 2026 — vilket också är grunden för bildbruket.
Phys.org:s referat (2026-08-08) är alltså en månad efter publiceringen; artikeln
utger sig inte för att beskriva ett nyare datum, och `research.citation` anger
10 juli.

**3. Siffror — verifieringslista (allt mot PDF:en)**
- 396 ± 14 MeV vid $n_e$ = (5,0 ± 0,5) · 10¹⁸ cm⁻³ ✓ s. 3
- Dephasing-gränsen 185 MeV (+40/−39) ✓ s. 3 — felmarginalen utelämnad i texten
- Tätintervallet 4,5–5,4 · 10¹⁸ cm⁻³ ✓ s. 3
- 21 fs, 4 J; H₂:Ar = 95:5; injektion från Ar⁹⁻¹⁶⁺ ✓ s. 3
- Acceleratorlängd 7 mm ✓ s. 2–3 (fokusets utbredningssträcka = gascellens längd)
- Fält >1 GV/cm ✓ s. 1; ⟨ϵz⟩ ≈ 1–1,5 GV/cm ✓ s. 4
- 1 GV/cm = 100 000 MV/m — efterräknat ✓; kvoten mot ”några tiotals MV/m”
  ger ~3 000 ⇒ ”tusentals gånger” ✓
- ”Drygt tio meter rör” för 400 MeV vid 30 MV/m — efterräknat: 13,3 m ✓
- 10 GeV i ett steg vid ne ≈ 10¹⁷ cm⁻³ ✓ s. 1
- ”Ungefär tio meter plasma” för 100 GeV traditionellt ✓ s. 2 (”plasma lengths
  of 10 m”)
- Skalningen: 0,66 m mot 13,5 m, ~20× ✓ s. 5 (formlerna insatta för 100 GeV)
- 6 · 10⁶ elektroner = 0,9 ± 0,2 pC ✓ s. 3 — korskontrollerat mot elementar-
  laddningen: 6 · 10⁶ · 1,602 · 10⁻¹⁹ C = 0,96 pC ✓
- Fördubblingen försvann när pulsenergin höjdes 4,0 → 4,8 J ✓ s. 3
- 1 GeV ”borde” ha nåtts: 1,5 GV/cm · 0,7 cm = 1,05 GeV ✓ s. 4
- NSF-OPAL 2 × 25 PW ✓ s. 2
- DLWFA föreslaget teoretiskt 2020 ✓ ref. 32 (Palastro m.fl., PRL 124, 134802)
- Tajima & Dawson 1979 ✓ ref. 1 (PRL 43, 267)
- 2004 års genombrott ✓ ref. 3–5 (Mangles, Geddes, Faure — samtliga Nature 431)
- LEP: ”skulle motsvara de högsta elektronenergier som producerats vid CERN:s
  LEP” ✓ s. 1; ringen 27 km och nedstängningen år 2000 är allmänt kända fakta
- **Räkneord:** artikeln innehåller inga träffar på biljon/biljard/triljon.
  ”Tusentals”, ”sex miljoner” och ”100 000” är efterräknade ovan.

**4. Citat:** ett enda, Arrowsmith till Phys.org. Originalet (”…this was one of
those thrilling occasions where the data started coming out just as predicted”)
återgivet troget i översättning; `cite` anger korrekt att det sagts till Phys.org
och inte står i studien. Froula-citatet i LLE:s pressmeddelande används inte.

**5. Facktermer:** inga träffar på ”upphets”. Falska vänner genomgångna —
*wakefield* → kölvattenfält, *group velocity* → grupphastighet, *beam* → stråle,
*dephasing* behållet på engelska i kursiv med svensk förklaring (”i otakt med
vågen”), eftersom någon etablerad svensk term inte finns.

**6. Fysikalisk rimlighetskontroll av den pedagogiska framställningen:** påståendet
att en ljuspunkt får röra sig med eller över ljushastigheten är korrekt — det är
gruppfarten som bär energi och information. Framställningen av varför tätheten
ändå spelar roll (ljuset på väg till fokuspunkterna passerar plasmat) är hämtad
ur s. 2, där fokushastigheten anges bero på både fokusgeometrin och plasmats
grupphastighet. Phys.org:s formulering att fokusfarten är ”oberoende av” hur
snabbt ljuset går i plasmat är alltså en förenkling som INTE följts.

**7. Bild och licens:** två figurer ur studien (fig. 1 och fig. 2), oförändrade
frånsett formatkonvertering PNG → JPEG, hämtade från förlagets egen bildserver.
CC BY-NC-ND 4.0 tillåter spridning i oförändrat skick med angiven upphovsperson;
krediteringen anger författare, tidskrift, år och licens. Ingen beskärning har
gjorts (skulle räknas som bearbetning). Inga AI-bilder. Bägge är äkta figurer,
och brödtexten hänvisar till dem som just mätfigurer.

**Rättningar som krävdes (åtgärdade före publicering)**

1. **Bildtexten till fig. 2 sade fel sak.** ”Bara i de tre mellersta tätheterna
   finns det elektroner långt till höger om linjen” stämmer inte — även vid
   6,1 · 10¹⁸ cm⁻³ ligger den uppmätta maxenergin till höger om gränsen, fast
   mindre än dubbelt så långt. Omskrivet till att de tre mellersta har en samlad
   fläck *mer än dubbelt så långt* till höger. Alt-texten justerad på samma sätt.
2. **”Försvann hela effekten” vid 4,8 J** kunde läsas som att inga elektroner
   alls kom ut. Studien säger att elektroner vid dubbla dephasing-gränsen inte
   längre observerades. Ändrat till ”försvann fördubblingen”.
3. **Faktarutans 2004-påstående** (”innan lasrarna var korta och starka nog att
   göra det på riktigt”) var missvisande — kölvattenacceleration demonstrerades
   redan på 1990-talet, men med utsmetad energi. Ändrat till att 2004 var året då
   tre lag oberoende visade strålar med en smal energitopp.

**Utslag: GODKÄND** efter rättningarna.

---

## 2026-08-07 — `2026-08-07-virvlar-pa-solens-yta`

**Granskningsläge:** utfört som självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen fick inte starta subagenter). Hela protokollet i
`utgivare.md` gicks igenom punkt för punkt.

**1. Originalpublikationen — EJ ÅTKOMLIG.** `nature.com` gav 403 från sessionens
egress-proxy (som bara släppte igenom GitHub), både via WebFetch och curl. Något
arXiv-preprint gick inte att hitta vid sökning. Abstract och metoddel har alltså
**inte** kunnat läsas i original. Konsekvens: alla uppgifter kontrollerades mot
NSO:s och Max-Planck-Gesellschafts pressmeddelanden, Phys.org, EurekAlert! och
AP-telegrammet. **Ingen central uppgift i artikeln vilar enbart på paperet** —
varje siffra och varje citat finns i pressmaterialet. Titeln i `research.citation`
och figurtexten ”spatial resolution of 19 km” återgavs ordagrant i sökträffar från
nature.com och stöds oberoende av pressmeddelandets ~19 km.

**2. Peer review-status:** publicerad i *Nature*, onsdag 5 augusti 2026 (veckodagen
kontrollräknad). Kollegialt granskad tidskrift → ingen preprint-markering behövs i
artikeln.

**3. Siffror — verifieringslista**
- 19 km upplösning ✓ NSO/Nature fig. 1 · tillika teleskopets diffraktionsgräns
- 4 m spegel ✓ NSO (”first 4-m class solar telescope”)
- 416 nm ✓ NSO bildtext
- Diffraktionsräkningen efterräknad: 1,22 · 416 nm / 4,0 m = 1,269 · 10⁻⁷ rad;
  × 1,496 · 10¹¹ m = 18 981 m → ”knappt 19 km” ✓ (stämmer med angiven upplösning)
- Virvlar 19–170 km ✓ MPG/phys.org
- Granuler 500–2 000 km ✓ MPG · jfr Sveriges längd 1 572 km → ”längre än Sverige” ✓
- Fotosfär ~5 500 °C ✓ (källan: ~6 000 K / 5 540 °C)
- Korona >1 miljon grader ✓ standarduppgift, stöds av pressmaterialet
- Solförmörkelse 12 augusti 2026, max 2 min 18 s, östra Grönland/västra Island/
  norra Spanien ✓ (källan nämner även Sibirien och nordvästligaste Portugal —
  urvalet är ett urval, inte ett fel)
- Soldiameter 1,4 miljoner km ✓
- Inga träffar på biljon/biljard/triljon i artikeln — inga räkneordsfällor.

**4. Citat — verifieringslista**
- Wöger (gränsytan/vågorna) ✓ ordagrant i pressreferat; översättningen trogen
- Kuridze (energikaskaden) ✓ ordagrant; översättningen trogen
- Solanki (plasmavirvlarna/vår stjärnas beskaffenhet) ✓ ordagrant; trogen
- Kuridze om utbrotten samt om överraskningen: återgivna indirekt, täcks av
  källformuleringarna ✓
- Ruizhu Chen (van Gogh) — AP, återgiven indirekt; korrekt markerad som
  utomstående som inte deltog i studien ✓
- Titlar/institutioner i `cite` stämmer med pressmaterialet ✓

**5. Källor:** samtliga fem `sources` täcker det de anges för. Notera att länkarna
inte kunde öppnas i sessionen (egress-spärr) — de är verifierade via sökträffar,
inte genom att sidan hämtats.

**6. Facktermer:** inga träffar på ”upphets”. Falska vänner genomgångna. Rättade
under granskningen: svenska termen är **koronan**, inte ”kronan”.

**7. Bild och licens:** två äkta pressbilder från NSO:s pressrum, krediterade
NSF/NSO/AURA/MPS i enlighet med källans egen kreditering. Inga AI-bilder, inga
vattenstämplar. Brödtexten hänvisar till bild 2 som det den är — ett äkta utsnitt
med skalstock.

**Rättningar som krävdes (åtgärdade före publicering)**
1. `beskrev det matematiskt på 1860-talet` → `beskrev det matematiskt 1868
   respektive 1871`. Helmholtz publicerade 1868, Thomson/Kelvin 1871 — ”1860-talet”
   är fel för paret. Samma rättning i begreppsposten.
2. `räknades ut på papper på 1860-talet` (ingressen) → `räknades ut på papper redan
   på 1800-talet`. Samma skäl.
3. `Fotosfären är bara ett par hundra kilometer tjock` → `några hundra kilometer`.
   Vedertaget värde är 400–500 km; ”ett par hundra” underskattar. Samma rättning i
   begreppsposten.

**Utslag efter rättning: GODKÄND.**

**Kvarstående reservation att notera för framtiden:** granskningen är gjord utan att
originalpublikationen kunnat läsas. Skulle någon senare få åtkomst till paperet bör
särskilt virvlarnas storleksintervall (19–170 km) och beskrivningen av vad
MURaM-simuleringarna faktiskt visar stämmas av mot metoddelen.

---

## 2026-08-08 | 2026-08-08-svavande-magnet | GODKÄND efter rättning

**Granskningsform.** Sessionen fick inte starta subagenter, så granskningen är
genomförd som ett separat, självkritiskt pass enligt hela protokollet i
`utgivare.md` (samma fallback som nyhetsagent.md steg 11 anvisar).

**Peer review-status.** Publicerad i *Science* 393 (6811), 607–610, tryckdatum
6 augusti 2026, DOI 10.1126/science.adx1707. Kollegialt granskad. Metadata
verifierade direkt mot Crossref (`api.crossref.org/works/10.1126/science.adx1707`):
titel, volym, sidor, utgåva, datum och samtliga fyra författare med affiliationer
stämmer med `research.citation`.

**Originalpublikationen.** science.org svarade HTTP 403 (betalvägg/botspärr).
Abstractet lästes i stället i sin helhet via Crossref, och metoddelen via
författarnas egen fritt tillgängliga version, arXiv:2504.21524 (CC BY 4.0), i
HTML-form. Där finns samtliga tekniska värden artikeln bygger på. Studien är ett
EXPERIMENT, inte en simulering — beskrivningen i artikeln stämmer.

**Verifierade siffror**
- 0,82 mm diameter / 0,38 mm tjocklek — arXiv: ”410±2 μm radius and 380±2 μm
  thickness” ✓ (radie → diameter omräknad korrekt)
- 32 fT/√Hz — Science-abstract + arXiv (”32±3 fT/√Hz”) ✓
- 3,2 · 10⁻¹⁴ T — omräkning av 32 fT ✓
- jordfältet 50 μT och kvoten ”en och en halv miljard” — 5·10⁻⁵/3,2·10⁻¹⁴ =
  1,56·10⁹ ✓. RÄKNEORDSKONTROLL: engelskans *billion* = miljard. Artikeln
  innehåller inga träffar på biljon/biljard/triljon.
- resonans 305 Hz, ställbar 260–318 Hz — arXiv brödtext + figur 4 ✓
- Q ≈ 12 000 och linjebredd 0,025 Hz — arXiv ✓ (kontrollräknat: 305/12 000 = 0,025)
- optisk arm 3,4 m, fyrdelad fotodiod (QPD), 852 nm — arXiv ✓
- brus 110 → 30 fT/√Hz, ”drygt 70 %” — (110−30)/110 = 72,7 % ✓
- vakuum 0,025 mbar och ”en fyrtiotusendel av lufttrycket” — 1013/0,025 = 40 520 ✓
- SQUID ≈ 20 fT/√Hz, bredbandsvärdena ≈ 200 pT/√Hz (80–200 Hz) och ≈ 1 nT/√Hz
  (< 15 Hz) — arXiv:s jämförelse respektive figur 3 ✓
- hjärnans fält 50–500 fT, hjärtats ≈ 100 gånger starkare — MEG-/MKG-litteratur ✓
- Geim, groda, ~16 T, Nijmegen 1997, Ig Nobel 2000, Nobelpris 2010 ✓

**Citat.** Ett enda citatblock, en översättning av slutmeningen i Science-abstractet
(hämtat ordagrant från Crossref). Ingen forskare citeras direkt — de formuleringar
som cirkulerade i pressreferaten gick inte att härleda till en namngiven person och
användes därför inte alls.

**Bild och licens.** Bild 1 är figur 1 ur arXiv:2504.21524, som ligger under
CC BY 4.0 (verifierat på arXiv:s abstract-sida). Bild 2 är
`Diamagnetic graphite levitation.jpg` från Wikimedia Commons, public domain
(verifierat via Commons API, upphovsperson en:User:Splarka). Ingen AI-bild.
Bildtexten till bild 2 säger uttryckligen att den visar fenomenet i klassrumsformat
och inte forskarnas apparat.

**Rättningar som krävdes (åtgärdade före publicering)**
1. `Femtotesla är en tusendels miljarddels tesla` → `En femtotesla är en miljondels
   miljarddels tesla`. Tusendels miljarddel är 10⁻¹², alltså pikotesla — felet var
   tusen gånger. Samma rättning i begreppsposten ”Magnetometer”.
2. Citatet: `grundforskning` → `grundläggande fysik` och
   `supraledande kvantinterferensmagnetometrar` → `supraledande
   kvantinterferensinstrument`, för att ligga närmare originalets
   ”fundamental physics” respektive ”superconducting quantum interference devices”.
3. `johnsonbrus` → `magnetiskt Johnsonbrus` (egennamn, och det är den magnetiska
   varianten som avses).
4. `imageCredit` innehöll `&nbsp;`-entiteter. Fältet renderas som REN TEXT i
   `nyheter.html`, så entiteterna syntes bokstavligt under bilden — bytt mot
   literalt hårt mellanslag. Samma fel fanns sedan tidigare i artikeln
   2026-08-05-rubin-mork-materia och rättades samtidigt.

**Utslag efter rättning: GODKÄND.**


---

## 2026-08-14 — `2026-08-14-diamant-i-flytande-kol`

**Granskningsläge:** självständig slutgranskning (utgivarrollen), utförd i
huvudsessionen enligt protokollet i `utgivare.md`.

**Peer review-status:** kollegialt granskad. Nature Physics, ”Diamond melting
in shock compression experiments at 1 TPa pressures”, publicerad online
13 augusti 2026, DOI 10.1038/s41567-026-03413-1.

**Källäge:** nature.com omdirigerar till inloggning (303 mot idp.nature.com).
Ingen arXiv-version finns, och Semantic Scholar hade inte indexerat artikeln
vid granskningstillfället. Titel, åtta författarnamn, tidskrift och
publiceringsdatum hämtades därför ur Crossrefs metadata; sakinnehållet vilar
på LLNL:s pressmeddelande, som Phys.org återger ordagrant och som skrapades i
sin helhet. Detta är en svaghet och noteras uttryckligen: artikeln bygger inte
på metoddelen i originalet.

**Verifierat mot källorna:**

- 1 TPa — från originalartikelns egen titel. Omräkningen till ”tio miljoner
  atmosfärer” kontrollerad: 10^12 / 1,013 · 10^5 = 9,9 · 10^6. OK.
- ”Tre gånger trycket i jordens innersta kärna” — pressmeddelandets egen
  formulering; jordens centrum ligger på ~0,36 TPa, alltså 2,8 gånger. OK.
- ”Hetare än solens yta” och ”högre tryck än i Neptunus och Uranus
  mittpunkter” — ordagrant ur Millots citat.
- ”En miljarddels sekund” — pressmeddelandet: ”lasting only a billionth of a
  second”. Ljusets sträcka på den tiden, 30 cm, kontrollräknad (29,98 cm).
- ~20 % skillnad mellan uppmätt och beräknad smälttemperatur, och ”mer än
  tusen grader fel” — båda ordagrant ur pressmeddelandet respektive Eggerts
  citat. RÄKNEORDSKONTROLL: inga *billion/trillion* förekommer i källan och
  inga biljon/biljard/triljon i artikeln.
- Isens och vattnets densiteter (0,92 respektive 1,00 g/cm³) — standardvärden,
  kontrollerade.
- Samtliga fem citat (fyra Millot, ett Eggert) jämförda ord för ord mot den
  engelska källtexten.

**Rättat före publicering:**

1. Ingressen skrev att kolet ”visar sig” bete sig som vatten. Flytförmågan
   visades av Eggert m.fl. för tjugo år sedan; det nya är att den bekräftas.
   Ändrat till ”mätningen bekräftar att kolet beter sig som vatten”.
2. En mening påstod att laget mätte reflektiviteten *därför att* vätskan är
   metallisk — ett motiv som inte står i källan. Omskriven till att
   reflektiviteten var en av de storheter som mättes.
3. ”Diamant är ett av de hårdaste material vi känner till, och den envisaste”
   — genusfel (material är neutrum). Omskrivet.

**Fällor som bevakades särskilt:**

- Att diamant flyter på rent flytande kol men sjunker som diamantregn inne i
  en isjätte är ingen motsägelse — det är olika vätskor. Artikeln säger det
  uttryckligen; utan den meningen läser texten som självmotsägande.
- Tredubblingen av fusionsutbytet är en beräknad förutsägelse, villkorad av
  att övriga felkällor hålls i schack. Artikeln skriver ut villkoret och
  markerar att det inte är ett uppmätt resultat.
- Att inget kristallint mellansteg syns gäller en ENDA chockvåg. Sandias
  motsatta resultat är inte motbevisat, och artikeln påstår inte det.

**Bilder:** båda äkta foton med fri licens. Huvudbilden visar laserhallen vid
Omega-anläggningen på LLE i Rochester — den anläggning där försöken gjordes
(Daniel Penfield, Wikimedia Commons, CC BY-SA 4.0). Bild 2 är Voyager 2:s
Neptunusporträtt från 1989 (NASA/JPL, public domain). Ingen AI-bild.
Brödtexten hänvisar inte till någon bild.

**Utslag: GODKÄND** efter de tre rättelserna.


---

## 2026-08-15 — `2026-08-15-spokglod-fran-avstallt-karnkraftverk`

**Granskningsläge:** självständig slutgranskning enligt `utgivare.md`, med en
efterföljande omgranskning sedan skribenten åtgärdat tre rättningar.

**Peer review-status:** kollegialt granskad. *Physical Review Letters* 137,
061803, "First Measurement of Neutrino Emissions from Spent Nuclear Fuel by
the Double Chooz Experiment", publicerad 4 augusti 2026, DOI 10.1103/dr26-j19g.
APS-sidan svarar 403 vid direkthämtning (betalvägg); metoddelen lästes i
stället i sin helhet i preprintet arXiv:2510.04869 (extraherat till
`.shots/dc.txt`).

**Första passet — tre fel funna:**
1. `research.citation` angav "94 författare". Manuell räkning av
   författarlistan i preprintet (dc.txt rad 3–15) gav 93, bekräftat av en
   oberoende sökträff ("T. Abrahão and 92 other authors").
2. Bildtexten till bassängbilden påstod att 44 % var en del av "den uppmätta
   signalen" — men 56/44-fördelningen härd/bassäng är en modellberäkning
   ("An energy-integrated contribution of 56% … and of 44% … is obtained",
   dc.txt rad 452–453), inte en uppdelning av det faktiska mätdatat.
   Motsade brödtextens egna, korrekta "Beräkningarna ger …".
3. "Ett par gånger om året stod båda reaktorerna stilla samtidigt" saknade
   stöd — källan beskriver tvärtom scenariot som sällsynt/ovanligt
   ("rare reactor-off periods … uncommon due to the plant's alternating
   refueling schedules", dc.txt rad 206–209).

**Omgranskning efter rättning:**
1. Författarantalet är nu helt struket ur citationen ("Double
   Chooz-samarbetet, …" utan siffra) — sidesteppar den tvetydiga
   Crossref/preprint-diskrepansen (Crossref räknar kollektivet "Double Chooz
   Collaboration" som en egen post, preprintet gör det inte) i stället för
   att hävda ett omtvistat tal. Rimlig lösning.
2. Bildtexten lyder nu "Enligt beräkningarna kom 44 procent av den
   förväntade signalen från bassänger som denna …" — stämmer med
   brödtextens "Beräkningarna ger 56 procent från härdarna och 44 procent
   från bassängerna" och med källan.
3. Meningen lyder nu "Vid sällsynta tillfällen stod båda reaktorerna stilla
   samtidigt för bränslebyte eller underhåll — ovanligt, eftersom de två
   härdarna normalt byter bränsle omlott —" — matchar källans
   "rare … uncommon due to the plant's alternating refueling schedules"
   ordagrant i sak.

**Kontrollfråga (a): "Double Chooz lades ned 2017" i faktarutan.** Källan
själv säger bara "operated from 2011 to 2017". Oberoende sökning bekräftar
att båda detektorerna slutade ta data i slutet av december 2017 ("both
detectors stopped taking data in late December 2017"). "Lades ned" är en
rimlig, läsbar återgivning av att experimentet upphörde 2017 för en
gymnasiepublik — ingen ändring krävs.

**Kontrollfråga (b): inga andra tal eller formuleringar rubbade.**
Genomläst rad för rad mot föregående granskning. Enda ytterligare ändring
är en stilistisk justering på raden om moderkärnor: "dottern sönderfaller i
samma stund hon bildas" → "dotterkärnan sönderfaller i praktiken i samma
stund den bildas" — tar bort en personifiering och lägger till hedge-ordet
"i praktiken", vilket är fysikaliskt mer precist (sekulär jämvikt är inte
bokstavligen momentan) och inte en sakförändring. Övriga siffror, citat och
källor oförändrade och redan verifierade i första passet.

**Utslag: GODKÄND.**
2026-08-17 | 2026-08-17-gluonknuten-i-protonen | GODKÄND | Alla siffror (1,84±0,02±0,09±0,16; 0,5–0,7; alpha_B=1,04±0,22; 0,42–1; 0,64±0,05; 0,65±0,08; Ru-96/Zr-96 44/40; ~9 GeV) verifierade mot arXiv:2408.15441v2 metoddel. Citat Zhangbu Xu verifierat ordagrant mot BNL/sci.news-referat, trogen översättning. Peer review-status (Science, granskad, publ. 13 aug 2026) korrekt angiven i research.citation. RHIC sista strålar 6 feb 2026 och EIC tidigt 2030-tal bekräftade. Kharzeev/Rossi-Veneziano-attribueringar och årtal stämmer. Inga falska vänner (upphetsad osv.) funna.
2026-08-19 | 2026-08-19-tomrummets-dubbelbrytning | GODKÄND | Alla siffror (2,2e10 T, 4,4e9 T, 4,5 kpc/~15000 ljusår, 2,09 s, 499,5 ks, 26 mars-5 april 2025, 2,5-4,0 GHz, 64 m, 46±4%, ~60%, 74±11%, faktor 2,5, dip 3-4 keV) verifierade mot arXiv:2509.19446v5 och NASA-pressmeddelandet; citat från Hoa Dinh Thi troget översatt och rätt attribuerat (co-lead author); bildkredit NASA/Pablo Garcia bekräftad; peer review i Nature 5 aug 2026 bekräftad; osäkerhet redovisas ärligt ("Fortfarande ett indicium").
2026-08-20 | 2026-08-20-ljusslutaren | RÄTTA FÖRST | Faktafel i femtosekund-förklaringen (rad 116: "hundra miljondels miljondels sekund" = 10⁻¹⁰ s, dvs 100 ps, inte 100 fs = 10⁻¹³ s — 1000x fel, dessutom självmotsägande mot "sub-picosecond gate"); verkningsgraden avrundas till "en foton på hundra tusen" men källan ger 1,25·10⁻⁵ = 1 på 80 000 (~25 % avvikelse). Övrigt (citat, författarlista, DOI:er, peer review-status, övriga siffror 1515/1550/517 nm, 100 fs, hundrafaldig flimmerdämpning, 30 µm/0,3 mm, begreppsposterna) verifierat och korrekt.
2026-08-20 | 2026-08-20-ljusslutaren | GODKÄND | Uppföljning: båda rättningarna kontrollerade mot källorna och korrekta — "en tiondels biljondels sekund" = 0,1·10⁻¹² s = 100 fs (rad 116), "en foton på åttiotusen" = 1/80 000 = η 1,25·10⁻⁵ enl. arXiv:2503.21113 (rad 125). Inga nya avvikelser. build-nyheter-og/verify-navigation/verify-begrepp gröna. Publicerbar.
2026-08-22 | 2026-08-22-lilla-smallen | GODKÄND | ALICE/CMS-siffror (5,36 TeV, 11 dagar, 3 md OO/400 mn NeNe, v2-kvot 1,08/1,05, 1,5% os.), citat (Zhou, Dahlbæk Nielsen) och bildkrediteringar verifierade mot arXiv:2509.06428, arXiv:2510.02580, ku.dk-pressmeddelandet, CERN Courier och Wikimedia Commons — allt stämmer. Peer review: båda publicerade i PRL 137 (082301/082302, 2026).
2026-08-23 | 2026-08-23-rumtiden-vrids | RÄTTA FÖRST | Kärnfysiken, citaten, satellitspecifikationerna (LARES-2 424 mm/295 kg/Inconel/303 reflektorer/13 juli 2022 Vega-C jungfrufärd; LAGEOS-1 1976/60 cm/411 kg/426 reflektorer/109,84°; 61,3 mas/år; 200 000 mätningar juli 2022–juni 2025; GP-B 19 %/2011; Iorio arXiv:2503.07264; Penrose/Nobel 2020; bildlicenser) verifierade mot Nature-abstractet (PMID 42420482, Nature 655:332–335) och sekundärkällor och stämmer. TVÅ räknefel kvarstår: (1) artikelns "en enkrona ... 84 km" för 61,3 mas stämmer bara med den indragna 25 mm-enkronan (i omlopp t.o.m. ca 2000/2013) — med dagens 19,5 mm-enkrona blir avståndet ca 66 km, inte 84 km; (2) begrepp.js 'bagsekund' påstår att ett tvåkronorsmynt (22,5 mm) vid 2 km ger en bågsekund — rätt avstånd är ca 4,6 km. Båda kräver rättning innan publicering.
2026-08-23 | 2026-08-23-rumtiden-vrids | GODKÄND | Uppföljning av tidigare RÄTTA FÖRST: båda räknefelen är rättade och verifierade på nytt (enkrona 19,5 mm → 66 km vid 61,3 mas; tvåkronorsmynt 22,5 mm → knappt 5 km vid 1 bågsekund, båda kontrollerade med egen beräkning). git diff visar att inget annat i nyhets- eller begreppsposterna rubbats. Publicerbar som den är.
2026-08-24 | 2026-08-24-kvantmikroskopet | GODKÄND | Alla siffror, citat, källor och peer review-status verifierade mot arXiv HTML, Crossref, Phys.org och TU Wien; teoretiskt förslag korrekt framställt, bild och licens stämmer
2026-08-28 | 2026-08-28-gungan-som-gar-runt | GODKÄND | Alla siffror (1,4 m/s, 5000 W, 4-8% armlängd, 7,43 m/2022, fem tävlande/två misslyckade, DOI, författarordning) verifierade mot arXiv:2308.06818 + Journal of Nonlinear Science (peer review-status DOI-bekräftad) + phys.org + Guinness World Records. Båda citaten ordagrant styrkta mot phys.org. Fysikresonemang (F=mg+mv²/l vid botten, mg·cosθ vid vändläge, styv arm vs kedja v=√(gr)) kontrollerat och korrekt, om än delvis egen härledning snarare än direkt citerad ur artikeln. Enda overifierade detaljen: exakt utgivningsdatum 15 juli 2026/volym 36/artikel 84 (Springer-sidan gick inte att nå fritt, men DOI, tidskrift och författare bekräftade oberoende).

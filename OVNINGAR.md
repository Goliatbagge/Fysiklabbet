# Övningar per avsnitt

Varje teori-avsnitt kan ha tillhörande övningar som visas under teori-texten
i katalogen. Övningarna lagras i `data/ovningar.js`:

```js
window.OVNINGAR = {
    'fy1-2.1': [
        { level: 1, question: '<markdown>', solution: '<markdown>' },
        ...
    ],
};
```

## Nivåer

- **Nivå 1** — Grundläggande (E-nivå). Bara SI-omvandling och insättning i
  en formel (eventuellt efter omformning). Exempel: omvandla minuter → timmar
  och räkna $v = s/t$.
- **Nivå 2** — Medel (C-nivå). Lösningen kräver kombination av två (eller
  flera) formler i flera steg. Inte alldeles för rätt fram.
- **Nivå 3** — Avancerad (A-nivå). Tre eller fler formler/koncept måste
  kombineras i längre kedjor, eller så krävs trigonometri/vinklar,
  ekvationssystem med två obekanta, algebraisk härledning av en formel,
  modelleringsantaganden, eller ett klassiskt fall där den "uppenbara"
  lösningsstrategin är fel (t.ex. sista sekunden av fritt fall, två
  rörelser som möts, sant medelvärde av kvadratiskt beroende).

Om en uppgift du tänkt klassa som N3 i praktiken bara kräver två formler i
tydlig följd (även om det "känns" lite trixigt), ska den vara N2 — N3 är
reserverat för uppgifter som *kvalitativt* sticker ut i komplexitet. Hellre
ingen N3 än en N3 som egentligen är en lätt N2.

## ⚠️ Vad gör en uppgift till Nivå 3 (LÄS DETTA — vanligt fel)

**Den vanligaste miss-kalibreringen är att skriva N3 som egentligen är N2.**
En *lång linjär kedja* av insättningar (räkna ut A, sätt in i B, sätt in i C,
svara) är **N2 — inte N3** oavsett hur många steg den har. "Tre formler i
följd" räcker INTE för N3.

En uppgift är Nivå 3 om den uppfyller **minst ett** av följande (verifierat
mot `Uppgifter/Fysik 1/Uppgifter Impuls 1 A-nivå Nivå 3.pdf`, ellära s. 346–347):

1. **Ekvationssystem / obekant som inte kan lösas direkt.** Två obekanta,
   andragradsekvation, eller en storhet som bara kan fås genom att ställa
   upp och lösa ekvationer (ej ren insättning). *Ex: känd summa + produkt
   av två resistanser → andragradsekvation.*
2. **Icke-uppenbar struktur som måste genomskådas först.** Bryggkoppling
   (potential mellan två spänningsdelares mittpunkter — serie/parallell-
   förenkling fungerar INTE), flerbatterislinga (två emf i samma slinga,
   Kirchhoffs spänningslag), nollpunkt (var blir kraften/fältet noll).
   *Ex 9101, 9104, 9105, 9106.*
3. **Klassisk fälla** där den naiva metoden ger fel svar. *Ex: en tråd som
   sträcks dubbelt så lång — arean halveras (volymen konstant) så R fyrdubblas;
   projektilrörelse i tvärfält; sista sekunden av fritt fall.*
4. **≥3 olika konceptområden kombineras** (inte tre formler ur *samma*
   område). *Ex 998: inre resistans + R=ρl/A + effekt + värme mcΔT. Ex:
   värmeelement → P=U²/R → E=Pt → mcΔT.*
5. **Resonemang / bevis / "visa att" / design utan färdig mall.** *Ex 9106
   "visa att ingen ström går genom motståndet" (balansvillkor), 9103 "koppla
   5 motstånd så att R_tot = 125 Ω", härledning av en formel.*
6. **Proportionalitets-/kvotresonemang där obekanta måste strykas.** Bilda
   kvot *innan* insättning så att gemensamma okända faktorer försvinner.
   *Ex: elektron vs proton genom samma spänning → v ∝ 1/√m; sten kastad med
   4v₀ → höjd (h ∝ v²).*

**Demoterings-testet:** Fråga "kan en elev lösa detta genom att identifiera
formlerna och sätta in i tur och ordning, utan att fundera på *strukturen*?"
Är svaret ja → det är N2. N3 ska kräva en *insikt* (genomskåda strukturen,
ställa upp ekvationssystem, se fällan, stryka obekanta) innan räkningen ens
kan börja.

**⚠️ Beräkningssvårighet räknas INTE som N3.** Eleverna har digitala
hjälpmedel (CAS/grafräknare), så det är *rutin* att logaritmera fram en
obekant ur en exponent, invertera en funktion, eller lösa en andragrads-
ekvation numeriskt. En uppgift vars enda svårighet är sådan räkning är **N2,
inte N3** — t.ex. "bestäm halveringstiden ur två aktiviteter" (lös ut
exponenten med log) är N2. Det som lyfter till N3 är den *konceptuella/
strukturella insikten som krävs för att ställa upp problemet*, inte hur
jobbig algebran/aritmetiken blir efteråt. (Andragradsekvationen i 7.7 är N3
för att *insikten* "summa + produkt → rötter till $x^2-Sx+P=0$" är poängen —
inte för att lösa ekvationen.) Genuint avancerat inom t.ex. kärnfysik är
flerstegs-korsdomän som *aktivitet → antal kärnor → vägbar massa* (via
Avogadro) eller dos-från-källa-beräkningar — inte att invertera
sönderfallslagen.

A-nivå-genrer i hela PDF:n: bryggkretsar och flerbatterikretsar, två obekanta,
trigonometrisk vektoruppdelning i 2D (x-led/y-led var för sig), nollpunkts-
problem, modellering/uppskattning ("hur många …"), härledningar, fällor.

## Kalibrering mot riktiga läromedel

Svårighetsnivåerna ska matcha riktiga läromedel:

1. **`Uppgifter/Fysik 1/`** — Impuls Fysik 1 uppgifter sorterade på
   E-, C- och A-nivå (★, ★★, ★★★). Konsultera när du är osäker på nivå.
   A-nivå-genrer: möte/inhämtnings-problem, två obekanta, trigonometriska
   vinklar, krångliga geometrier, modelleringsantaganden, "den sista
   sekunden"-fällor, härledningsuppgifter.
2. **`Kursprovsuppgifter/`** — frisläppta kursprov med poängsättning (E/C/A).
   "(2/1/0)" är E-nivå, "(0/2/1)" där A-poäng dominerar är A-nivå.

**Du får ALDRIG kopiera uppgifter** från dessa filer — de är
upphovsrättsskyddade. Inte ens "tydligt omformulerade" varianter av samma
scenario. PDF:erna är **endast** till för att avgöra svårighetsnivå — inte
för att leverera scenarier. Om PDF:n har en akvarie-uppgift ska *inte* din
handla om akvarium. Om PDF:n har en domkraft med $A_1 = 3{,}5\ \mathrm{cm^2}$
och $A_2 = 52\ \mathrm{cm^2}$, ska *inte* din ha snarlika areor.

Tänk: *vilka koncept testar PDF-uppgiften, och vilket helt annat scenario
kan testa samma koncept?* Vattentorn istället för akvarie, bromsok istället
för domkraft, isberg istället för båt. Konceptet är upphovsrättsfritt —
själva scenariot/inramningen är där risken finns både juridiskt och
pedagogiskt.

### Kalibrering Fysik 2 (`Uppgifter/Fysik 2/`)

Tre PDF:er — `Nivå 1.pdf` (★☆☆), `Nivå 2.pdf` (★★☆), `Nivå 3.pdf` (★★★) —
med exempel på respektive nivå för Fysik 2 (Impuls Fysik 2). **Grundprincipen
är densamma som för Fysik 1** (se "Vad gör en uppgift till Nivå 3" ovan):
N3 = konceptuell/strukturell insikt, INTE beräkningstyngd; digitala hjälpmedel
gör log/andragrad/inversering rutin. Men *genrerna* skiljer sig p.g.a.
innehållet. Konkretiserat för Fysik 2:

- **Nivå 1 (E):** En formel, direkt insättning (ev. efter omvandling eller
  omformning). T.ex. $\omega = 2\pi/T$, $F = mv^2/r$ (med km/h → m/s),
  $M = F\cdot l$, $v = f\lambda$, pendelns/fjäderns period, $I = P/A$,
  decibel ur formel, $\mathbb{E} = U/d$, $F = BIl$. Även ren begrepps-
  identifikation (centripetalkraftens riktning, "vilka påståenden stämmer").

- **Nivå 2 (C):** 2–3 formler/steg i följd; inte självklart vilka. T.ex.
  centripetalacceleration på ekvatorn ($T \to \omega \to a$), kaströrelse
  "klarar han ravinen?" (jämför falltid och horisontell sträcka),
  momentjämvikt "välter plankan?", växelströmsreaktans + ström,
  fältsuperposition från två ledare, induktion ur flödesgraf,
  Stefan–Boltzmann-effekt, gitter-våglängder, doppler, svävning, stående
  våg i rör. **En *kort/standard* härledning är N2** (t.ex. visa att
  kastbanan är en parabel är ★★☆ i boken — inte ★★★).

- **Nivå 3 (A):** kräver en *insikt/struktur* innan räkningen. Fysik 2-genrer:
  - **Jämviktssystem med moment OCH kraft samtidigt:** stege mot vägg utan
    väggfriktion, bom/lykta i wire med vinkel, flaggstång (flera ekvationer).
  - **Kombinera ≥2 huvudprinciper:** gravitation + cirkelrörelse
    (geostationär satellit, "hur snabb rotation kastar av föremål"), energi +
    cirkeldynamik (pendel-maxvinkel innan tråd brister), accelererad laddning
    + cirkelbana (*e/m*-bestämning), hastighetsväljare + avböjning
    (masspektrometer → jonmassa).
  - **Kaströrelse med extra villkor:** nå precis över nätet/staketet, kast
    från höjd (andragradare i tiden), två kastvinklar med förklaring.
  - **Avläsa LUTNING/area på en KRÖKT graf:** flöde→inducerad spänning
    (lutning på krökt flödesgraf), RL-strömgraf, pendelns trådkraft-graf.
  - **Kvot-/proportionalitetsresonemang där obekanta stryks:** fjäder med ny
    massa *och* ny konstant *och* ny utdragning, motions-EMK ∝ falltid,
    kulstöt på månen.
  - **Flerlags-kedjor i modern fysik:** svartkropp (Wien + Stefan–Boltzmann +
    invers kvadrat / strålningsjämvikt), foton + utträdesarbete + de Broglie,
    parbildning + annihilation upprepad, röntgen + Bragg.
  - **Icke-triviala härledningar:** konisk pendels periodtid, banklutnings-
    vinkel, inducerad spänning som funktion av tiden.
  - **"Fälla"/insiktsvillkor:** svävningarnas återkomst (123 snabba = 122
    långsamma svängningar), maxvinkel innan brott.

  Nytt jämfört med Fysik 1: cirkelrörelse-*dynamik*, samtidig moment+kraft-
  jämvikt, fältkombinationer (masspektrometer, *e/m*), våginterferens-
  geometri och svartkropps-kedjor. Och: en kort härledning kan vara N2 i
  Fysik 2 (parabelbanan) — det är härledningens *komplexitet* som avgör.

## Antal per avsnitt

Riktlinje: **3 övningar N1 + 2 N2 + 1 N3 = 6 st**. Korta avsnitt får frångås.

### Minst en uppgift per formel

För varje **formel som introduceras i avsnittet** (i en `::: formel`-box
eller som namngiven huvudformel) ska minst en räkneuppgift använda just
den formeln. Två formler → båda ska dyka upp någonstans. För formler som
löses ut åt olika håll (*s* = *v* · *t*, *t* = *s* / *v*) räcker det att
formeln används i någon form — men variera gärna vilken variabel som söks.

### Begreppsavsnitt (utan formler)

För avsnitt som bara innehåller begrepp (t.ex. naturvetenskaplig metod)
ska övningarna i första hand vara **flervalsfrågor** — de auto-rättas. Om
en begreppsfråga blir krystad som flerval får den istället göras som öppen
reflektionsfråga utan auto-rättning.

## Diagram ska ritas, inte beskrivas

Om en uppgift hänvisar till ett rörelsediagram (*s-t*, *v-t*, *a-t*),
energidiagram eller annan figur ska diagrammet **ritas** som inline-SVG
— aldrig beskrivas i ord. Eleven ska *läsa av* punkter från ett rutnät.
Samma princip gäller i teori-texterna under `data/teori/*.md`.

**Verktyg**: helpern `makeDiagram(opts)` i `data/ovningar.js` genererar
konsekvent stylade SVG-diagram (rutnät, axlar med pilar, Poppins, accent-
röd kurva). Anropas från question-strängen med template-literal; data
beskrivs via `paths` och `fills`. Se kommentaren ovanför funktionen.

**Markera inte mätpunkter med koordinatetiketter** — eleven får räkna
rutor själv. Använd naturliga rutnätssteg (vart 2 s, vart 5 m/s, …) och
placera ändpunkter nära rutnätskorsningar.

**Avslöja inte metoden i uppgiftstexten.** Skriv *"Beräkna föremålets
förflyttning"* — inte *"Beräkna arean under grafen"*. Att inse att arean
motsvarar förflyttningen är en del av uppgiften. Samma för lutning =
hastighet/acceleration och area i *a-t* = Δ*v*.

**Markera inte arean i uppgiftens diagram** (om svaret är arean). Visa
bara kurvan/linjen — fyllda `fills` avslöjar metoden. Undantag: jämförelse
av två areor kan ha fills för att visa vilka regioner som ska jämföras.

**Lösningsförslaget bör rita om diagrammet** med arean markerad — då
finns den pedagogiska poängen kvar och eleven får visuell bekräftelse.
Anropa `makeDiagram` igen i solution-strängen med samma axlar/skala men
fyllda `fills`.

### Periodisk rörelse → alltid en sinuskurva

Varje uppgift om **harmonisk svängning**, fjäderpendel, plan pendel eller
annan periodisk rörelse ska visa svängningen som en *y*(*t*)-graf — aldrig
bara beskrivas i text eller med formeln $y = A\sin(\omega t)$. Värden som
$\omega = 15\ \mathrm{rad/s}$ eller $A = 5{,}0\ \mathrm{cm}$ i frågetexten
gör inte figuren överflödig; tvärtom är det då eleven har störst nytta av
att *se* vad värdena betyder visuellt.

**Verktyg**: `makeOscillation(opts)` i `data/ovningar.js` ritar sinuskurvan
med valfria amplitud-mått (`showAmplitude`), periodmått (`showPeriod`),
markerad tidpunkt (`markT`) och egen y-axelindelning (`yTicks` — sätt
egna ticks i avläsningsuppgifter så amplituden inte ligger exakt på en
axeltick). Två samtidiga svängningar (typiska för N3-kvotresonemang)
byggs med `makeDiagram` direkt — anropa funktionen med två `paths`,
en heldragen och en streckad.

**Avläsningsuppgifter:** låt eleven *läsa av* från grafen i stället för
att slå in i en formel. *"Vad är amplituden?"* med en y(t)-graf och utan
markerat A-mått är en bättre N1-uppgift än samma fråga med formeln
$y = A\sin(\omega t)$ utskriven — den första testar grafläsning, den andra
testar bara mönsterigenkänning.

## Kraftvektorer ska ritas, inte beskrivas

Om en uppgift hänvisar till kraftvektorer ska de **ritas** som pilar i en
figur, inte beskrivas i text. Att läsa av en vektorbild med vinklar och
beteckningar är kärnfärdighet i mekanik.

**Verktyg**: `makeForceDiagram(opts)` i `data/ovningar.js` genererar
inline-SVG med pilar, beteckningar, valfri storleksetikett, kompass och
kropp. Vinklar i grader, 0 = höger, 90 = upp. Strecka okända krafter med
`dashed: true` och magnitud `'?'`. Se kommentaren ovanför funktionen.

**Storlek = pixellängd, inte newton.** Välj proportionellt så dubbelt
så stor kraft → dubbelt så lång pil. Tumregel: 3 px/N för krafter
30–80 N (pilar 90–240 px).

**Beteckningen placeras alltid vid pilspetsen, aldrig på linjen.**
Helpern hanterar placeringen automatiskt — etikett över/under spetsen
för horisontella/sneda vektorer, till höger om spetsen för vertikala.
Etiketten får aldrig korsa själva pilens linje (gäller även egna SVG).

**Avslöja inte svaret i diagrammet.** Okänd kraft → streckad pil med
`magnitude: '?'`, eller utelämna helt.

**Vinklar markeras i figuren, inte beskrivs i text.** Använd
`showAngle: true` per vektor — den ritar streckad horisontalreferens,
båge och gradetikett automatiskt. Använd `angleLabel: 'α'` om du vill
ha en symbol istället för gradtal (algebraiska uppgifter):

```js
{ label: 'F', magnitude: '80 N', angle: 30, length: 220, showAngle: true }
```

Egen inline-SVG-figur: streckad hjälplinje (`stroke-dasharray="5 4"`,
färg `#8a8579`), bågen som `<path d="M r 0 A r r 0 0 0 ...">` i samma
färg, etiketten Poppins 14 px vid bågens mittlinje.

## Kretsscheman ska ritas, inte beskrivas

Om en uppgift handlar om en elektrisk krets — serie, parallell,
blandkoppling, mätarplacering, Kirchhoff-resonemang — ska schemat
**ritas** som inline-SVG, aldrig beskrivas i ord ("ett batteri kopplat
till tre lampor på rad"). Att läsa av ett kopplingsschema är en
kärnfärdighet i kursen och en obligatorisk del av nationella prov.

> **⚠️ Gäller även potentialvandring, bryggkopplingar och flerbatteri-
> kretsar.** Frestelsen att beskriva dessa i text (eftersom de är svårare
> att rita) är just där det blir fel. En potentialvandringsuppgift utan
> schema med jordning och utsatta nodbeteckningar (A, B, C, P, Q) är inte
> komplett — eleven ska *läsa av* var jordningen sitter och vandra i den
> ritade kretsen. Använd `makeBridge(opts)` för bryggor/potentialvandring
> (stödjer jordningssymbol och nodetiketter); se kommentaren ovanför den
> funktionen i `data/ovningar.js`.

**Verktyg**: helpern `makeCircuit(opts)` i `data/ovningar.js` genererar
kopplingsscheman i svensk lärobokstil (IEC-symboler). Komponenter:
resistor (rektangel), glödlampa (cirkel med kryss), batteri (lång + kort
streck), strömbrytare, voltmeter (V i cirkel), amperemeter (A i cirkel).
Stöder serie, parallell (1–N grenar) och en blandkoppling (en
parallellsektion i serie). Se kommentaren ovanför funktionen för
fullständigt API.

**Komponenterna ska sitta centrerat och jämnt fördelade på ledaren.**
I en rak del av en ledare (typiskt topp-ledningen) ska komponenterna
ligga med **lika marginal** mot vänster och höger ram, med jämnt
inbördes avstånd. En seriekoppling med tre lampor som hamnar förskjutna
åt vänster med tomt utrymme till höger ser obalanserad och ful ut.

`makeCircuit` centrerar på **content-bounding-box** (yttersta vänster-
kant till yttersta högerkant av alla element, inkl. förgreningsnoderna
för parallel-sektioner) — inte på komponenternas geometriska centroider.
Skillnaden märks i blandkopplingar där en parallel-sektion "sticker ut"
med förgreningsnoder ±segW/2 utanför sin slot-center; bounding-box-
centrering ger jämn marginal mot ramen, centroid-centrering inte.

**Avståndet mellan komponenter** styrs av tre olika värden:

- `segW = 72` — slotbredd i **rena seriekretsar** (utan parallel-zon).
  Kompakt och läroboksigt, ~48 px ledning mellan lamp-kanter.
- `segW = 88` — slotbredd i **kretsar med parallel-zon**. Behövs så
  förgreningsnoderna (sticker ut ±segW/2 från slot-center) inte ligger
  trångt mot intilliggande seriekomponenter.
- `branchSegW = 60` — **inre slot-bredd inom en parallel-gren med
  flera komponenter**. Komponenterna fördelas centrerat i parallel-
  zonen med detta fasta avstånd, inte jämnt över hela parallel-bredden
  — annars sprids de glest med tomma "rader" i kanterna och en obalanserad
  visuell tyngd jämfört med en ensam komponent i en parallell-gren.
- `branchEdgeMargin = 36` — **luft mellan förgreningsnod och första/
  sista komponent i den bredaste grenen**. Parallel-zonen krymps
  automatiskt (via `parallelInset`) så avståndet pStartX → första
  lampans vänsterkant blir exakt detta värde. Konsekvensen: alla
  mellanrum inom parallel-zonen blir lika stora (36 px både vid
  kanterna och mellan grannar i grenen), vilket ger en harmonisk
  layout.

Helpern väljer automatiskt. Skriver du egen SVG, sikta på ~32 px
synlig ledning mellan kanter på närliggande element (mer i serie-zoner,
mindre i parallel-zoner med flera komponenter per gren).

**Etikettplacering.** Etiketter (L₁, *R*₁, *U* = 12 V) placeras direkt
ovanför sin komponent i topp-ledningen och direkt under komponenten i
en parallellgren under. Aldrig till sidan, aldrig på själva ledningen.

**Variabel kontra etikett.** `makeCircuit` skiljer automatiskt mellan
fysikaliska variabler (renderas kursivt) och komponent-etiketter
(renderas rakt). Lampor (L), amperemetrar (A), voltmetrar (V) och
strömbrytare är *etiketter* — bokstaven identifierar ett objekt, inte
en storhet. Resistorer (R) och spänningskälla (U) är *variabler* —
bokstaven är en fysikalisk storhet. Se typografi-regeln i
[CLAUDE.md](CLAUDE.md) för den allmänna principen.

**Avslöja inte svaret i schemat.** Om uppgiften går ut på att eleven ska
välja var en amperemeter eller voltmeter ska sitta, rita schemat **utan
mätaren**. Lösningsförslaget får sedan visa schemat med mätaren korrekt
inkopplad — då har eleven själv tänkt sig fram till placeringen.

**Anpassa storleken efter komplexitet.** Default-bredden beräknas från
antal komponenter; ange `width` manuellt bara om du har specifika
layoutkrav. För kretsar utan parallellsektion blir resultatet typiskt
300 px brett; en blandkoppling kan bli 380–420 px.

**Symbolanslutning — varje komponenttyp har sin egen konvention.**

- **Batteriet** (lång + kort streck): ledningen **bryts** i gapet mellan
  + och − strecket — batteriet är visuellt ett gap i strömkretsen
  (IEC-konvention). Ledningen avslutas exakt vid varje strecks position
  och fortsätter på andra sidan. Ingen ledningslinje får synas mellan
  strecken. I `makeCircuit` ritas underledningen som två separata
  segment som möter `x ± batGapH` (= ±4 px från batteriets centrum).
- **Strömbrytaren**: två dotnoder definierar var ledningen ansluter;
  själva brytararmen sitter ovanpå (sluten) eller lutar bort (öppen).
  Ledningen är obruten genom brytarens dotnoder.
- **Fyllda symboler** (lampa, resistor, mätare): ritas med `fill="#fff"`
  och `stroke` — topp-ledningens linje ritas under symbolen och
  maskeras naturligt av symbolens fyllning där den passerar genom
  symbolens inre.

**Vanlig bugg när man designar nya symboler:**

1. Mask för bred — vit rektangel täcker mer än symbolen själv och
   skapar synliga glapp på vardera sida (8–10 px tomt mellan ledning
   och symbol). Antingen ingen mask, eller mask som exakt matchar
   symbolens bredd.
2. Ledning genom batteri — ledningen ritas obruten under batteriet, så
   det ser ut som strömmen "kortsluter" själva batteriet. Bryt ledningen
   exakt i gapet mellan + och − strecket.

## Figurer ska ritas, inte beskrivas (mekanikscener)

> **⚠️ HUVUDREGEL.** En uppgift om en *rumslig eller geometrisk* uppställning
> — sned kast, hävstång/kraftmoment, tippande kropp, cirkelrörelse, lutning,
> pendel, gunga, loop — ska ha en **figur som illustrerar problemet**, inte
> bara en textbeskrivning. Att läsa av en figur (vinklar, avstånd, riktningar,
> krafter) är en kärnfärdighet och en obligatorisk del av nationella prov.
> Lägg in figuren där det är möjligt; hoppa bara över rent numeriska
> uppgifter utan rumsligt innehåll (t.ex. "$f = 1/T$, beräkna *T*").

**⚠ Stanna upp och fråga: ser uppgiften ut som något?** Innan du publicerar
en ny uppgift, fråga dig om uppgiftens scen har en *visuell representation*.
Använd den här mappningstabellen som checklista:

| Uppgiften nämner … | Då ska figuren visa … | Helper |
| --- | --- | --- |
| harmonisk svängning, fjäderpendel, plan pendel, periodisk rörelse | en sinuskurva $y(t)$ | `makeOscillation` |
| kaströrelse, projektil, skott från höjd | parabel + höjd/vidd-mått | `makeProjectile` |
| moment, hävstång, gungbräda, balk på stöd | hävarm + laster + stöd | `makeLever`, `makeTorqueArm` |
| cirkelrörelse, satellit, karusell | cirkelbana + tangentfart + centripetalpil | `makeCircularPath` |
| lutande väg, doserad kurva, banklutning | lutning + bil + krafter | `makeBankedCurve` |
| stege mot vägg, balk i wire | sned stång + (i lösning) krafter | `makeLadder` |
| pendel, gunga, svängbåge | repupphängning + svängbåge | `makeSwing` |
| backkrön, kulle | konvex båge + krafter | `makeCrest` |
| vertikal loop (bergochdalbana) | cirkel + vagn i topp/botten | `makeLoop` |
| tippande/vältande kropp | låda med kantpivot + tyngdpunkt | `makeTippingBox` |
| krets, koppling, mätarplacering | kopplingsschema | `makeCircuit`, `makeBridge` |
| krafter på en kropp utan rumslig kontext | vektorpilar från gemensam punkt | `makeForceDiagram` |
| *s*-*t*-, *v*-*t*-, *a*-*t*-graf, energidiagram | linjediagram med rutnät | `makeDiagram` |

Att värden som $\omega = 15\ \mathrm{rad/s}$, $A = 4{,}0\ \mathrm{cm}$ eller
$L = 5{,}0\ \mathrm{m}$ står utskrivna i frågetexten gör **inte** figuren
överflödig. Det är just då en illustration av vad värdena *betyder visuellt*
är värdefullast — den binder ihop algebran med fenomenet och bygger
intuition som blir bortrationaliserad om uppgiften bara är text.

**Verktyg** (inline-SVG-helpers i `data/ovningar.js`, samma pappersstil som
`makeForceDiagram`). Anropas från question/solution-strängarna med
`${...}`-interpolation — det är vanlig JS, så **ingen** backslash-dubbling
(helpers genererar SVG, inte KaTeX):

| Helper | Scen | Avsnitt |
| --- | --- | --- |
| `makeProjectile` | kaströrelse: parabel, vinkel, mur/torn (`kind: 'angle'`/`'horizontal'`) | 1.6 |
| `makeConicalPendulum` | konisk pendel: tråd, vinkel, banradie, höjd, krafter | 1.5, 1.8 |
| `makeLever` | hävstång/gungbräda/överhäng på kil eller kant, laster + mått | 1.1, 1.2 |
| `makeTippingBox` | tippande/vältande rätblock med tyngd, tryckkraft, friktion | 1.2 |
| `makeTorqueArm` | kraftmoment-arm/skiftnyckel med vinkel och hävarm | 1.1 |
| `makeCircularPath` | cirkelbana ovanifrån: radie, tangentfart, centripetalpil | 1.3, 1.4 |
| `makeCrest` | backkrön (sidvy) med *N* och *F*_G | 1.4 |
| `makeBankedCurve` | doserad kurva (tvärsnitt) med vinkel och kraftuppdelning | 1.4 |
| `makeLoop` | vertikal loop med vagn, radie, krafter i toppen | 1.7 |
| `makeSwing` | gunga/pendel: svängbåge, utgångsvinkel, fallhöjd, krafter | 1.7 |
| `makeLadder` | stege mot vägg med vinkel och (i lösningen) krafter | 1.1 |
| `makeClock` | analog urtavla (tim-/minutvisare) | 1.3 |

Se kommentaren ovanför varje funktion för fullständigt API.

**Avslöja aldrig svaret i figuren.** Är en vinkel/kraft/sträcka det sökta
ska den ritas med ett **symboliskt** värde (`'α'`, `'?'`, `'d = ?'`) eller
med en *annan* (icke-svars-)vinkel — aldrig med facit-värdet utsatt.
Exempel: doseringsvinkeln (svar $30^\circ$) ritas som `α` vid en godtycklig
lutning; stegens kraftbild ritas **utan** krafter i frågan och **med** i
lösningen (eleven ska själv identifiera krafterna).

**Krafter i fråga kontra lösning.** När poängen är att *genomskåda* vilka
krafter som verkar (stege, dosering) → rita scenen utan kraftpilar i frågan
och lägg den kraftannoterade versionen i lösningsförslaget. När krafterna är
given uppställning (backkrön, gunga i lägsta punkten) får de visas i frågan.

**Etiketter får inte ligga på linjer eller andra figurdelar.** Värden och
beteckningar (mått, krafter, vinklar) ska offsettas **vinkelrätt ut** från
den linje/arm/kropp de hör till — aldrig placeras ovanpå den. Den vita halon
bakom text (`sceneText`) är ett *skyddsnät* för oundvikliga korsningar med
*tunna* hjälplinjer, inte en ursäkt för att lägga text på en tjock arm, balk
eller kontur. Var särskilt försiktig med **diagonala** armar/stegar/trådar:
en enkel lodrät offset hamnar då mitt på linjen — offsetta i stället längs
linjens normal (`(-sin θ, -cos θ)`-riktningen).

> **Specialfall: scener med parallella fältlinjer.** När du placerar en
> etikett (ström-, laddnings-, massa-text) intill ett objekt i en scen med
> *parallella fältlinjer*, kontrollera att etikettens baslinje hamnar
> **mellan** två närliggande fältlinjer — inte ovanpå någon av dem. För
> horisontellt fält: höj etiketten med ≈ halva fältlinjeavståndet (typiskt
> 14 px) ovanför objektets *cy*. För vertikalt fält: skjut etiketten i
> sidled till mitt emellan två linjer. **Kontrollera alltid med en
> skärmdump (headless Chrome → PNG) innan klart** — det räcker inte att
> det ser bra ut i SVG-källan. Helpern `makeBField` beräknar offseten
> automatiskt från `fieldLineSpacing`; gör likadant i nya helpers.

**Homogena fält → jämn täthet OCH symmetri kring objektet.** Ett homogent
fält (B, E, gravitations-, vatten-) avbildas alltid med **konstant
avstånd** mellan parallella fältlinjer. Tätare linjer betyder starkare
fält, så varierande avstånd i en homogen scen är fysikaliskt missvisande
och estetiskt fult.

När ett centralt objekt (ledare/partikel/laddning) finns i scenen måste
fältlinjerna dessutom vara **symmetriska kring objektet**: lika många
linjer ovanför som nedanför (för horisontellt fält) eller till vänster
som till höger (för vertikalt fält). Annars ser objektet ut att sitta
"snett" i fältet och man kan misstolka det som att fältet är starkare på
ena sidan.

Den vanligaste fällan är att man först fördelar N linjer jämnt över
höjden och *sedan* snäpper en linje till objektets centrum — då bryts
både jämnheten (snäppta linjen rycks ur takten) och symmetrin (eftersom
objektet ofta inte ligger i geometriska mitten av rit-området). Rätt
mönster: beräkna `halfSpan = min(anchor − lo, hi − anchor)` och lägg
*n* linjer på vardera sida om ankaret med konstant `spacing`, där *n*
och `spacing` väljs så att `n · spacing ≤ halfSpan` (krymp spacingen om
*n* < 2 så du alltid får minst 2 linjer per sida). Totalt 2*n + 1 linjer,
jämnt fördelade kring ankaret.

Helpern `makeBField` använder funktionen
`uniformPositions(lo, hi, anchor, targetSpacing)` för detta; skriver du
en egen parallell-fält-helper måste du följa samma princip.

**Pilspetsar på parallella fältlinjer ska ligga i en rät linje
vinkelrätt mot fältriktningen.** För ett homogent fält ritar man flera
parallella fältlinjer (B-, E-, vatten-, gravitations-). Varje linje får
*en* pilspets, och **alla spetsar ska ligga i samma kolumn** (för
horisontellt fält) eller **samma rad** (för vertikalt fält). Annars läser
ögat scenen som ett oordnat virrvarr av enskilda pilar istället för ett
sammanhängande riktat fält.

Om en linje *bryts* runt ett centralt objekt (ledare/partikel/laddning) —
för att linjen annars skulle korsa objektets symbol — placeras spetsen
**på objektets uppströmssida** (sidan fältet *kommer ifrån*), inte
nedströms. För ett fält åt höger: alla spetsar till vänster om objektet.
För ett fält uppåt: alla spetsar under objektet. Detta gör att den brutna
linjens spets ligger i samma kolumn/rad som alla andra linjers spetsar,
utan att hamna inuti gapet kring objektet. Helpern `makeBField` följer
redan regeln; skriver du en egen parallell-fält-helper måste du
implementera samma snäppning.

**Inga onödiga identifieraretiketter på ensamma objekt.** Om figuren bara
innehåller *ett* exemplar av en sorts objekt — en laddning, en ledare, en
massa, ett block — ska du **inte** etikettera den med variabelsymbolen
(`q`, `m`, `I`, …). Värdet och symbolen finns redan i frågetexten och
illustrationens enda objekt är otvetydigt det som åsyftas. En etikett som
"q" intill den enda laddningen tillför bara visuellt brus och konkurrerar
med viktigare etiketter (*v*, *B*, *r*). Skriv ut symbolen **bara** när
flera objekt av samma slag måste särskiljas (`q_1` och `q_2`, `m_1` och
`m_2`, `R_1` och `R_2`). Värden (t.ex. "*m* = 2,0 kg" i en figur) följer
samma regel — utelämna när texten redan ger värdet och objektet är ensamt
i scenen.

**Hastighetsvektorer startar vid objektets KANT, inte vid tyngdpunkten.**
En *v*-pil tecknas alltid utgående från objektets rand i pilens riktning
— aldrig inifrån objektet. Detta är fysikkonvention (hastighet är en
egenskap hos hela kroppen, men vektorn ritas som om den lämnar ytan i
färdriktningen). Skiljer sig från **kraftvektorer**, där angreppspunkten
ligger i tyngdpunkten (CM) och pilen *får* starta inuti kroppen — det är
hela poängen med en angreppspunkt. Helpers i `data/ovningar.js`
(`makeBField`, `makeProjectile`, `makeCircularPath`, `makeCrest`,
`makeLoop`) tillämpar redan denna offset. Skriver du en *ny* hastighets-
eller hastighetskomposant-pil (manuellt i en HTML-sim eller en ny helper)
måste du själv förskjuta startpunkten med objektets radie/halv-bredd
längs vektor-riktningen — annars ser kanten av pilen ut att komma från
mitten av kroppen.

**Pilspetsar på ljus-/vågstrålar sitter PÅ strålen som riktningsmarkör,
inte vid änden.** I optikens och vågläran *avslutas inte* en stråle vid
pilspetsen — strålen fortsätter förbi och slutar geometriskt vid den punkt
som scenen kräver (gränsyta, lyssnare, fokus). Pilspetsen är en
riktningsmarkör som sätts *på* strålen, typiskt vid 50–60 % av strålens
längd. Det skiljer sig från *kraft-pilar* (där pilspetsen markerar
kraftens angreppspunkt eller slut).

Två separata fällor som ofta blandas ihop:

1. **Var sitter pilspetsen?** För ljus-/vågstrålar: vid `t ≈ 0,55` längs
   linjen från `(x_start, y_start)` till `(x_slut, y_slut)`. Strålen ritas
   hela vägen, pilspetsen läggs över strålen som överlagring. Vid en
   gränsyta där flera strålar möts: spetsen för varje stråle ska ligga på
   sin egen stråle, *inte* vid mötespunkten.
2. **Åt vilket håll pekar pilspetsen?** Spetsen ska peka i strålens
   färdriktning — alltså längs `(x_slut - x_start, y_slut - y_start)`.
   Rotation av en "schablon-polygon" är felbenäget eftersom den initial-
   riktningen (uppåt, nedåt, åt höger?) lätt blandas ihop med rotations-
   tecknet i SVG (positiv vinkel = medurs eftersom y växer nedåt).

**Rekommenderat mönster (bygger pilspetsen från riktningen, inte via rotation):**

```js
function arrowHead(x, y, angleRad, color) {
    const size = 8, wing = 4.5;
    const bx = x - size * Math.cos(angleRad);          // bas-mittpunkt bakåt
    const by = y - size * Math.sin(angleRad);
    const px = -Math.sin(angleRad), py = Math.cos(angleRad); // vinkelrätt
    const w1x = bx + wing * px, w1y = by + wing * py;
    const w2x = bx - wing * px, w2y = by - wing * py;
    return `<polygon points="${x},${y} ${w1x},${w1y} ${w2x},${w2y}" fill="${color}"/>`;
}

// Anropas så här för en ljusstråle från (x1,y1) till (x2,y2):
const t = 0.55;
const px = x1 + t*(x2 - x1), py = y1 + t*(y2 - y1);
const ang = Math.atan2(y2 - y1, x2 - x1);
svg += arrowHead(px, py, ang);
```

Pilspetsen sätter sig automatiskt på rätt plats med rätt riktning oavsett
SVG:s y-flip.

**Undantag — kraftvektorer.** För kraft-/hastighetspilar (`makeForceDiagram`,
`sceneArrow`) ska spetsen *avsluta* pilen — där sitter den vid pilens
slutpunkt. Konventionen är annorlunda eftersom själva pilen *är* vektorn,
inte ett spår genom rummet.

**Granskning:** efter rendering, kontrollera via skärmdump att (1) varje
pilspets sitter någonstans *mitt på* sin stråle (eller vid pilens slut för
kraftvektorer), och (2) spetsen pekar i den riktning du *läser* strålen
— om infallsstrålen ska "komma in" från övre vänster ska spetsen vara
riktad mot höger-ner, inte vänster-upp.

**Alla etiketter måste rymmas inom figurens viewBox.** En etikett som
hamnar utanför viewBox klipps i renderingen och blir helt eller delvis
osynlig. Vanliga fällor:

- **Avståndsmått till vänster om en lodrät linje** (t.ex. `AB = 4,0 m`
  vid AB-linjens mittpunkt) sträcker sig vänsterut med `text-anchor="end"`
  och kan hamna i negativ x-koordinat om padX är för liten. Lösning:
  rotera måttet -90° så texten läses längs linjen (klassisk
  teknisk-ritnings-stil) — texten upptar då bara textHöjden i x-led
  istället för hela textbredden.
- **Etiketter till höger om en punkt nära viewBox högerkant** (t.ex.
  "lyssnare (L)") klipps när skalfaktorn skjuter punkten för långt
  åt höger. Lösning: **reservera plats i skalfaktorn för etikett-bredden**.
  Exempel: `scale = Math.min((W - 2*padX - lyssTextRoom) / dBL, ...)`
  där `lyssTextRoom ≈ 90` ger plats för en standard-etikett efter punkten.
- **Etiketter ovanför en punkt nära viewBox överkant** (t.ex. textRows
  som "källa" + ett värde) kan hamna ovan y = 0. Lösning: öka padY eller
  begränsa skala även i y-led.

**Kontrollrutin (obligatorisk):**

1. Bygg figuren och rendera via testsida (t.ex. `.shots/<figur>-test.html`).
2. Skärmdump med `chrome --headless --screenshot` i flera vinkel-/skala-fall.
3. Granska skärmdumpen — varje etikett ska vara **helt synlig** och inte
   röra någon viewBox-kant.
4. Vid klippning: justera scale-formeln (reservera textbredd), padding
   (`padX`, `padY`), eller etikettens orientering (rotera, ändra anchor).

Skala-formler i helpers ska *alltid* räkna med att etiketter sticker ut
utanför sina punkter, inte bara att grafiken själv ryms.

**Kända vinkelvärden i figurer skrivs *bara med värdet* — inte "i = 30°".**
För vinklar gäller en specifik konvention: när vinkelmåttet ritas vid sin
båge inne i figuren ska bara *värdet* stå där (t.ex. `'30°'`, inte
`'i = 30°'`). Variabelnamnet (*i*, *b*, α, θ) framgår redan av sammanhanget
— bågen markerar vilken vinkel det är, och frågetexten introducerar
variabelnamnet. Att skriva ut "i = 30°" tar 5–6 gånger så mycket
typografisk plats som "30°" och tvingar etiketten ut från bågen, ofta
rakt på en stråle eller annan linje. Detta gäller alla figurer som ritar
vinklar (`makeRefraction`, men även andra mekanikscener med vinkelmått).

✓ `iLabel: '30°'`, `bLabel: '45°'`
✗ `iLabel: 'i = 30°'`, `bLabel: 'b = 45°'`

Undantag: **okända vinklar** följer den allmänna regeln nedan (bara
variabelnamnet, ingen "= ?").

**Vinkelmått placeras VID bågen, inte utanför strålen.** Etiketten ska
sitta i mellanrummet mellan normalen och strålen, där bågen ritas. Den
ska inte vara skuffad ut i ett "tomt" område utanför strålen, även om
det är mer plats där — det bryter den geometriska kopplingen mellan
båge och vinkelvärde. Helpern ska räkna ut en **adaptiv radie** så att
texten får plats vid bågen utan att skära strålen: utrymmet växer som
$R\cdot\sin(i/2)/\cos(i)$, så vid små vinklar behövs större $R$ för att
samma text ska få plats.

**Okända variabler i figurer skrivs *bara med variabelnamnet*, inte
som "X = ?".** I uppgiftens figur räcker det att variabeln som ska
beräknas är *namngiven* — själva frågetecknet är överflödigt och tar
typografisk plats som ofta kolliderar med strålar, linjer eller andra
etiketter. Det här gäller varje hjälpars `xxxLabel`-parameter, inte bara
brytningsfigurer.

Konkret:

- ✓ `iLabel: 'i'`, `bLabel: 'b'`, `vLabel: 'v'`, `dALLabel: 'AL'`, `hLabel: 'h'`
- ✗ `iLabel: 'i = ?'`, `vLabel: 'v = ?'`, `hLabel: 'h = ?'`

Skillnaden är inte bara estetisk — "v = ?" är ungefär 5–6 gånger så bred
som bara "v" (~35 px vs ~6 px). När etiketten ska placeras nära en sned
stråle eller i en trång vinkelbåge blir den breda versionen oundvikligen
upptryckt på strålen själv, vilket vi vill undvika (se reglerna om
etiketters placering).

**Kända värden** skrivs däremot ut fullständigt: `iLabel: 'i = 30°'`,
`hLabel: 'h = 1,6 m'`. Skillnaden är pedagogisk — kända värden är *data*
som eleven ska använda, okända är *frågor* som eleven ska besvara.

**Etiketter får inte överlappa varandra — kontrollera ALLTID via skärmdump.**
I figurer med flera textelement (källa, lyssnare, värde-mått, beteckning,
medium-namn) är det lätt hänt att två etiketter placeras på samma
`y`-koordinat eller mycket nära varandra. Då hamnar de **ovanpå varandra**
i renderingen, även om deras `text-anchor` skiljer sig (`"start"` vs
`"middle"` vs `"end"`) — bokstäverna ritas ut alldeles intill samma punkt
och blir oläsliga.

Vanliga kollisionsmönster:

- **Värde-mått på en linje** + **storhets-etikett under samma punkt** —
  t.ex. `r = 5,0 m` mitt på avståndslinjen och `P = 8,0 W` strax under
  källan, båda på samma höjd.
- **Två mått-etiketter** för olika sträckor som råkar passera samma
  *y*-rad.
- **Komponent-namn** (källa, lyssnare, A, B) som hamnar på den linje där
  ett värde ska visas.

**Kontrollrutin (obligatorisk innan figuren anses klar):**

1. Öppna sidan i webbläsaren och ta en skärmdump av figuren.
2. Granska skärmdumpen — varje etikett ska vara **separat** och **läsbar**
   utan att överlappa någon annan text eller linje.
3. Om något överlappar — flytta etiketten lodrätt med minst $14$ px
   (en textrad) eller vågrätt med minst $30$ px. Det räcker oftast med
   att skifta `y` ner till `130` eller upp till `78` istället för en
   $115$-höjd som krockar med linjens y=$100$.

Tumregel för layout: håll **olika storheter** på olika *y*-rader, inte
bara olika `text-anchor`. Två etiketter på samma rad är oftast en bugg
även om de teoretiskt borde rymmas — typografin tar mer plats än man
tror.

**Streckade banor måste kröka åt rätt håll.** Hjälplinjer som visar en
*bana* (pendelns svängbåge, en kastbana, en cirkelrörelses spår) ska
följa den fysik figuren beskriver — kröker den åt fel håll blir figuren
direkt missvisande. Vanliga fällor:

- **SVG arc sweep-flag**: `A rx ry 0 large sweep x y`. För en pendelbåge
  som ska gå *nedåt genom lägsta punkten* (från utgångsläge ner till
  lodlinjen och upp på andra sidan) — sweep-flag = 0. För en *övre*
  båge (t.ex. ett krön sett underifrån) — sweep-flag = 1. När du är
  osäker: prova båda och titta på resultatet, ändra `large-arc-flag` om
  bågen blir för stor/liten.
- **Kastbanor**: en parabel ska peka konkav *nedåt* (öppningen ned) —
  tyngdkraften kröker banan mot marken, inte mot himlen.
- **Cirkelbanor sett uppifrån**: streckad cirkel ska ligga i banans plan,
  inte ovanför/under.

Verifiera *alltid* en sådan bana mot fysiken **innan** du anser figuren
klar — öppna sidan, ta en skärmbild och kontrollera att banan börjar och
slutar på rätt punkter OCH kröker åt rätt håll däremellan.

**Fysisk kontakt: hjul tangerar ytan, går aldrig genom den.** Fordon
(bil, vagn, gunga, hjul, kärra) ska sitta så att hjulens *botten* ligger
**på** vägbanan/marken — inte sänkta så att halva hjulet hamnar under
ytan. Konkret i SVG: när bilen byggs i en lokal grupp där `y=0` är
vägbanan ska hjulens centrum ligga vid `cy = -r`, och chassi-botten vid
`y = -r` (chassi placeras *ovanför* hjul-centrum, inte på det). Samma
princip gäller alla figurer där kropp möter yta: foten på en stege,
botten på en låda, en boll som vilar på marken — kontaktpunkten ska
ligga *på* ytan, varken över eller under. Granska alltid en skärmbild
innan du anser figuren klar; det här är en av de vanligaste och mest
synliga grafikbuggarna.

**Granska renderingen.** SVG:erna sanity-testas inte av byggsteget. Öppna
`katalog.html` (eller en tillfällig preview-sida som anropar helpers) och
kontrollera att inget överlappar, att etiketter är läsbara och att geometrin
stämmer — på både bred och smal skärm.

## Flervalsfrågor

Anges med `choices` (array av markdown-strängar) och `correct` (0-indexerat
rätt-index). Inget `answer`-fält behövs.

```js
{
    level: 1,
    question: 'Vad menas med en hypotes inom naturvetenskaplig metod?',
    choices: [
        'Ett fenomen som inte kan förklaras.',
        'En gissning som ska testas med experiment.',
        'En lag som aldrig motbevisats.',
        'En sammanfattning av flera teorier.'
    ],
    correct: 1,
    solution: 'En hypotes är en gissning som vi testar...'
}
```

Riktlinjer för distraktorer:
- 3 eller 4 alternativ (max 4)
- Alla rimliga vid första anblick — undvik uppenbart fel alternativ
- Plocka **vanliga elev-missuppfattningar** ("teori = osäker gissning",
  "medelvärdet av farterna = medelfarten")
- Skriv inte "Inget av ovanstående" eller "Alla ovan"

## Lösningsformat

Lösningsförslagen följer samma stil som exempeluppgifterna i teori-texten:

1. **Identifiera formeln** och lös ut sökt variabel om det behövs:
   $$ v_\mathrm{m} = \frac{s}{t} \quad\Leftrightarrow\quad s = v_\mathrm{m} \cdot t $$

2. **Mätvärden i bracket-block** (`\left[ \begin{array}{l} ... \end{array} \right]`)
   efter SI-omvandling.

3. **Beräkningssteg** i math-block — visa hur värdena sätts in.

4. **Svar** på egen rad: `**Svar:** ...`.

Pedagogiska kommentarer (klassiska elev-misstag, generaliseringar) läggs
efter svaret som `**Generell slutsats:** ...`.

## Variabler i övningstext

Fysikaliska variabler skrivs kursivt: `*v*`, `*t*`, `*s*` i markdown-text
(inte inom math-block — där hanterar KaTeX kursiveringen). I math-block:
`\mathrm{}` för bokstavsindex: `v_\mathrm{m}`, inte `v_m`.

I JS-strängar (template literals): dubbla alla backslash —
`$v_\\mathrm{m} = 5{,}0\\ \\mathrm{m/s}$`. Se [CLAUDE.md](CLAUDE.md)
typografi-avsnittet för fullständig regel.

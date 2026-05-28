# Övningar per avsnitt

Varje teori-avsnitt kan ha tillhörande övningar som visas under teori-texten
i katalogen. Övningarna lagras i `data/ovningar.js`:

```js
window.OVNINGAR = {
    'fy1-1.3': [
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

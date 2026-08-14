---
id: ma1b-4.S
title: Sammanfattning
course: Matematik nivå 1b
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.S'
---

<!-- OBS: egen 1b-version, baserad på motsvarande ma1c-fil. Ändras
     kapitlets GEMENSAMMA innehåll i 1c-sammanfattningen: gör samma
     ändring här (bara de här tre sammanfattningarna är egna filer —
     allt annat delas via MA1B_ALIAS i data/katalog.js). -->

# Sammanfattning — Räta linjer och funktioner

Det här kapitlet handlade om koordinatsystemet, linjära modeller och räta
linjens ekvation $y = kx + m$ — hur du går mellan formel, värdetabell och
graf, och hur $k$- och $m$-värdet läses av eller beräknas. Du har också
mött funktionsbegreppet, definitions- och värdemängd, grafisk lösning av
ekvationer och olikheter, samt exponential- och potensfunktioner. Efter
kapitlet ska du kunna bestämma en linjes ekvation på flera sätt, avgöra om
ett samband är en funktion, och skilja de olika funktionstyperna åt.

## Begrepp att kunna

- **koordinatsystem**: bildas av en vågrät ***x*-axel** och en lodrät
  ***y*-axel**; skärningspunkten kallas **origo**. En punkts läge anges
  med koordinaten $(x, y)$.
- **kvadrant**: de fyra områden koordinatsystemet delas in i av axlarna,
  numrerade moturs med start uppe till höger (första kvadranten har
  positiva *x*- och *y*-värden).
- **linjär modell**: ett samband som ändras i jämn takt med *samma
  mängd*; grafen är alltid en rät linje.
- **proportionalitet (proportionalitetskonstant $k$)**: specialfall av
  linjärt samband, $y = kx$, vars graf alltid är en rät linje genom
  origo.
- **räta linjens ekvation (RLE) i k-form**: $y = kx + m$; beskriver
  räta linjer med $k$-värde och $m$-värde.
- **riktningskoefficient ($k$-värde)**: linjens lutning; positivt $k$
  ger en stigande linje, negativt $k$ en fallande.
- **$m$-värde (*y*-intercept)**: linjens skärning med *y*-axeln;
  motsvarar "startvärdet" i en linjär modell.
- **funktion ($f(x)$)**: ett samband där varje tillåtet *x*-värde ger
  exakt ett *y*-värde; $x$ kallas den **oberoende** och $y$ (= $f(x)$)
  den **beroende variabeln**. En **linjär funktion** har grafen en rät
  linje.
- **definitionsmängd och värdemängd**: tillåtna *x*-värden respektive
  *y*-värden för en funktion; ifylld ring/punkt i grafens ändpunkt
  betyder att värdet ingår ($\leq$, $\geq$), tom ring att det inte gör
  det ($<$, $>$).
- **grafisk lösning**: att lösa en ekvation eller olikhet genom att rita
  VL och HL som grafer i ett grafritande hjälpmedel och läsa av
  skärningspunkten.
- **exponentialfunktion**: funktion där den oberoende variabeln står i
  exponenten, $y = Ca^x$.
- **potensfunktion**: funktion där den oberoende variabeln står i
  basen, $f(x) = Cx^a$.

## Formler

::: formel "Kapitlets formler"
**Räta linjens ekvation (k-form)**

$$
y = kx + m
$$

där

- $k$ = riktningskoefficient (linjens lutning)
- $m$ = linjens skärning med *y*-axeln (*y*-intercept)

**Proportionalitet**

$$
y = kx
$$

där $k$ är proportionalitetskonstanten (specialfall av RLE med
$m = 0$).

**Riktningskoefficient ur två punkter**

$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$

där $(x_1, y_1)$ och $(x_2, y_2)$ är två punkter på linjen.

**Exponentiell förändring**

$$
y = Ca^x
$$

där

- $y$ = värdet efter en viss tid
- $C$ = ursprungliga värdet
- $a$ = förändringsfaktorn
- $x$ = tid

**Potensfunktion**

$$
f(x) = Cx^a
$$

där $C$ och $a$ är konstanter.
:::

## Viktiga samband och metoder

- En proportionalitet måste uppfylla BÅDA kraven: grafen ska vara en rät
  linje OCH gå genom origo — annars är det bara en linjär modell, inte en
  proportionalitet.
- $m$-värdet läses av direkt som linjens skärning med *y*-axeln (motsvarar
  "startvärdet" i modellen); $k$-värdet är lutningen och motsvarar
  förändringstakten per steg i *x*-led.
- Trappstegsmetoden: gå ett steg åt höger längs linjen — trappstegets höjd
  (med tecken) är då lika med $k$.
- Ur två punkter beräknas $k$ med $k = \dfrac{y_2 - y_1}{x_2 - x_1}$ — välj
  punkter som är lätta att läsa av; ordningen på punkterna spelar ingen
  roll bara täljare och nämnare tas i samma ordning.
- För att bestämma en linjes ekvation när du känner $k$ och en punkt: sätt
  in $k$ i $y = kx + m$, sätt sedan in punktens koordinater och lös ut
  $m$.
- Funktionstestet ("pennan"): för att en graf ska vara en funktion får en
  lodrät linje bara skära grafen högst en gång, för varje *x*-värde.
- $f(a)$ läses av som *y*-koordinaten på grafen vid $x = a$; att lösa
  $f(x) = 0$ innebär att läsa av var grafen skär *x*-axeln.
- Vid grafisk lösning av en ekvation VL = HL: rita $y = \mathrm{VL}$ och
  $y = \mathrm{HL}$, skärningspunktens *x*-koordinat är lösningen. Vid en
  olikhet avgör du i stället vilken linje som ligger över/under den
  andra.
- Definitions- och värdemängd läses av som intervall på *x*- respektive
  *y*-axeln: ifylld ring/punkt betyder att gränsen ingår ($\leq$,
  $\geq$), tom ring att den inte gör det ($<$, $>$).
- Skilj exponentialfunktioner ($y = Ca^x$, oberoende variabeln i
  exponenten) från potensfunktioner ($y = Cx^a$, oberoende variabeln i
  basen) — i en exponentialfunktion avgör $a$ om värdet ökar ($a > 1$)
  eller minskar ($0 < a < 1$), och $C$ är startvärdet.

## Figurer värda att minnas

Koordinatsystemets fyra kvadranter numreras moturs med start uppe till
höger:

::: figur
<svg viewBox="-26 -20 330 312" width="330" height="312" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Koordinatsystemets fyra kvadranter: första kvadranten uppe till höger, andra uppe till vänster, tredje nere till vänster och fjärde nere till höger."><line x1="0.0" y1="0.0" x2="0.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34.0" y1="0.0" x2="34.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="68.0" y1="0.0" x2="68.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="102.0" y1="0.0" x2="102.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="136.0" y1="0.0" x2="136.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="170.0" y1="0.0" x2="170.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="204.0" y1="0.0" x2="204.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="238.0" y1="0.0" x2="238.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="272.0" y1="0.0" x2="272.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="282.2" x2="282.2" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="248.2" x2="282.2" y2="248.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="214.2" x2="282.2" y2="214.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180.2" x2="282.2" y2="180.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="282.2" y2="146.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="112.2" x2="282.2" y2="112.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="78.2" x2="282.2" y2="78.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="44.2" x2="282.2" y2="44.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="10.2" x2="282.2" y2="10.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="290.2" y2="146.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="298.2,146.2 288.2,141.7 288.2,150.7" fill="#1f2530"/><line x1="136.0" y1="282.2" x2="136.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="136.0,-16.0 131.5,-6.0 140.5,-6.0" fill="#1f2530"/><text x="296.2" y="164.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="145.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="0.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−8</text><text x="34.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−6</text><text x="68.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−4</text><text x="102.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−2</text><text x="170.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="204.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="238.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="272.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="130.0" y="286.2" font-size="11" text-anchor="end" fill="#1f2530">−8</text><text x="130.0" y="252.2" font-size="11" text-anchor="end" fill="#1f2530">−6</text><text x="130.0" y="218.2" font-size="11" text-anchor="end" fill="#1f2530">−4</text><text x="130.0" y="184.2" font-size="11" text-anchor="end" fill="#1f2530">−2</text><text x="130.0" y="116.2" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="130.0" y="82.2" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="130.0" y="48.2" font-size="11" text-anchor="end" fill="#1f2530">6</text><text x="130.0" y="14.2" font-size="11" text-anchor="end" fill="#1f2530">8</text><rect x="15" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="67.0" font-size="12" text-anchor="middle" fill="#1f2530">andra</text><text x="61.2" y="81.0" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text><rect x="161" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="67.0" font-size="12" text-anchor="middle" fill="#1f2530">första</text><text x="207.4" y="81.0" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text><rect x="15" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="206.4" font-size="12" text-anchor="middle" fill="#1f2530">tredje</text><text x="61.2" y="220.4" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text><rect x="161" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="206.4" font-size="12" text-anchor="middle" fill="#1f2530">fjärde</text><text x="207.4" y="220.4" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text></svg>

Kvadranterna numreras moturs med start uppe till höger.
:::

En funktion kan liknas vid en maskin som stoppar in ett *x*-värde och
lämnar ut motsvarande *y*-värde:

::: figur
<svg viewBox="0 14 420 70" width="420" height="70" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En funktionsmaskin: pilen in är märkt x lika med 3, maskinen innehåller regeln f av x lika med x plus 2, och pilen ut är märkt y lika med 5."><line x1="10" y1="48" x2="118" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="128,48 116,43 116,53" fill="#c8324a"/><text x="64" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan> = 3</text><rect x="132" y="18" width="156" height="60" rx="12" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.6"/><text x="210" y="54" font-size="15" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = <tspan font-style="italic">x</tspan> + 2</text><line x1="292" y1="48" x2="400" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="410,48 398,43 398,53" fill="#c8324a"/><text x="346" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">y</tspan> = 5</text></svg>

Vi stoppar in den oberoende variabeln $x = 3$ i funktionsmaskinen
$f(x) = x + 2$ och får ut den beroende variabeln $y = 5$.
:::

## Inför provet

- Kan du rita ett koordinatsystem, ange en punkts koordinat och avgöra
  vilken kvadrant en punkt ligger i?
- Kan du ställa upp en linjär modell som formel, värdetabell och graf
  utifrån en textuppgift?
- Vet du vad som krävs för att ett samband ska vara en proportionalitet
  (rät linje OCH genom origo), och kan du avgöra det ur en graf?
- Kan du räta linjens ekvation $y = kx + m$ utantill och vet du vad $k$
  och $m$ betyder?
- Kan du bestämma $k$-värdet både med trappstegsmetoden ur en graf och
  med formeln $k = \dfrac{y_2 - y_1}{x_2 - x_1}$ ur två punkter?
- Kan du bestämma en linjes ekvation när du känner lutningen och en punkt
  på linjen?
- Kan du avgöra om ett samband eller en graf är en funktion, och
  förklara varför med "penn-testet"?
- Kan du beräkna funktionsvärden som $f(4)$ eller $f(3a)$, och läsa av
  funktionsvärden ur en graf?
- Kan du bestämma definitions- och värdemängd ur en graf, och avgöra om
  ändpunkterna ska ha $\leq$/$\geq$ eller $<$/$>$?
- Kan du lösa en ekvation eller olikhet grafiskt med grafritande
  hjälpmedel, och skilja exponential- från potensfunktioner?

---
id: ma3c-2.S
title: Sammanfattning
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.S'
---

# Sammanfattning — Derivatan

Det här kapitlet handlade om hur man bestämmer en kurvas lutning — dels i
genomsnitt över ett intervall (sekant), dels exakt i en enda punkt (tangent
och derivata). Du har mött derivatans definition som ett gränsvärde, lärt
dig tolka derivator i tillämpningar och beräkna dem med symbolhanterande
hjälpmedel, samt sett vad som krävs för att en funktion ska vara
deriverbar i en punkt. Du ska efter kapitlet kunna beräkna och tolka både
sekantens och tangentens lutning, ställa upp derivatans definition och
avgöra i vilka punkter en funktion inte är deriverbar.

## Begrepp att kunna

- **sekant**: en rät linje som skär en kurva i två punkter; dess lutning
  ger kurvans medellutning i intervallet mellan punkterna.
- **medellutning / riktningskoefficient / ändringskvot (*k*-värde)**:
  sekantens lutning, beräknad ur $k = \dfrac{\Delta y}{\Delta x}$.
- **tangent**: en rät linje som snuddar (tangerar) en kurva i en enda
  punkt; dess lutning motsvarar kurvans lutning i just den punkten.
- **derivata ($f'(a)$)**: tangentens lutning i en given punkt; utläses
  "$f$ prim av $a$".
- **derivatans definition**: gränsvärdet av sekantens lutning då
  avståndet $h$ mellan de två punkterna går mot 0.
- **deriverbar**: en funktion är deriverbar i en punkt om det går att
  beräkna derivatan (gränsvärdet) där.
- **kontinuerlig funktion**: en funktion vars graf hänger ihop och kan
  ritas "utan att lyfta pennan".
- **diskontinuerlig funktion**: en funktion vars graf har ett hopp (öppen
  ring och fylld prick på olika höjd) eller ett språng (till exempel vid en
  lodrät asymptot).
- **hörnpunkt**: en punkt där grafen bildar ett skarpt "hörn", till exempel i
  $x = 0$ för $f(x) = |x|$.
- **absolutbelopp ($|a|$)**: ett tals avstånd till 0 på tallinjen; "tar
  bort" minustecknet från negativa tal.
- **genomsnittlig förändringshastighet**: vad sekantens lutning står för
  vid tillämpningar.
- **momentanhastighet / förändringshastighet vid en tidpunkt**: vad
  tangentens lutning (derivatan) står för vid tillämpningar.

## Formler

::: formel "Kapitlets formler"
**Riktningskoefficienten (sekant och tangent)**

$$
k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$

där

- *k* = riktningskoefficient (lutning)
- $(x_1, y_1)$ och $(x_2, y_2)$ = två punkter på linjen (sekanten eller
  tangenten)

**Derivatans definition**

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
\qquad \text{eller} \qquad
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

där

- $f'(a)$ = derivatan av $f$ i punkten $x = a$
- *h* = avståndet i sidled mellan sekantens två punkter
:::

## Viktiga samband och metoder

- Sekantens lutning ger kurvans **medellutning** (genomsnittlig
  förändringshastighet) över ett helt intervall; tangentens lutning ger
  lutningen (förändringshastigheten) i en enda punkt.
- Ju mindre avståndet $h$ mellan sekantens två punkter blir, desto mer
  närmar sig sekanten en tangent — därför bygger derivatans definition på
  gränsvärdet då $h \to 0$.
- Lösningsgång för derivatans definition: (1) ställ upp definitionen med
  funktionen $f$, (2) förenkla täljaren och **faktorisera bort** $h$ ur
  täljare och nämnare (annars blir det division med 0), (3) sätt $h = 0$
  och beräkna gränsvärdet.
- Enheten för derivatan fås genom "enheten för funktionen" per "enheten
  för variabeln" — samma princip som för sekantens och tangentens lutning.
- Med symbolhanterande hjälpmedel (till exempel Geogebra): definiera funktionen
  som $f(x) = \ldots$ och beräkna derivatan i en punkt genom att skriva
  $f'(a)$. OBS: Geogebra använder punkt som decimaltecken, inte komma.
- En funktion är **inte** deriverbar i en punkt om den (1) inte är
  definierad där, (2) är diskontinuerlig där (hopp), eller (3) har en
  hörnpunkt där.
- I en hörnpunkt (till exempel $x = 0$ för $f(x) = |x|$) ger gränsvärdet av
  derivatan olika svar beroende på om man närmar sig punkten från vänster
  eller höger — derivatan saknar då ett entydigt värde.
- En ekvation med absolutbelopp, $|x - a| = b$, löses genom att sätta
  $x - a = \pm b$ och lösa båda fallen separat.
- Skilj på kontinuitetens två typer av avbrott: ett **hopp** (funktionen
  definierad men värdet "hoppar", öppen ring/fylld prick) och ett
  **språng** (grafen går mot $\pm\infty$, till exempel vid en lodrät asymptot).

## Figurer värda att minnas

Sekanten mellan punkterna $(a, f(a))$ och $(a+h, f(a+h))$ — när avståndet
$h$ går mot 0 övergår sekanten i en tangent, vilket är själva idén bakom
derivatans definition:

::: figur
<svg viewBox="20 0 256 200" width="374" height="292" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en godtycklig funktion f av x med en sekant genom punkterna a, f av a och a plus h, f av a plus h. Avståndet mellan punkterna i sidled är h."><line x1="45" y1="175" x2="260" y2="175" stroke="#1f2530" stroke-width="1.6"/><polygon points="270,175 260,170.5 260,179.5" fill="#1f2530"/><line x1="60" y1="188" x2="60" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="60,4 55.5,14 64.5,14" fill="#1f2530"/><text x="265" y="192" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="68" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 60,166.9 C 61.83,166.13 67.33,163.63 71,162.3 C 74.67,160.97 78.33,159.85 82,158.9 C 85.67,157.95 89.33,157.25 93,156.6 C 96.67,155.95 100.33,155.47 104,155 C 107.67,154.53 111.33,154.18 115,153.8 C 118.67,153.42 122.33,153.1 126,152.7 C 129.67,152.3 133.33,151.92 137,151.4 C 140.67,150.88 144.33,150.33 148,149.6 C 151.67,148.87 155.33,148.05 159,147 C 162.67,145.95 166.33,144.78 170,143.3 C 173.67,141.82 177.33,140.1 181,138.1 C 184.67,136.1 188.33,133.92 192,131.3 C 195.67,128.68 199.33,125.75 203,122.4 C 206.67,119.05 210.33,115.38 214,111.2 C 217.67,107.02 221.33,102.42 225,97.3 C 228.67,92.18 232.33,86.63 236,80.5 C 239.67,74.37 243.33,67.77 247,60.5 C 250.67,53.23 256.17,40.83 258,36.9" fill="none" stroke="#2563c9" stroke-width="2"/><text x="256" y="20" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="67" y1="162.7" x2="192" y2="131.3" stroke="#4a7d3a" stroke-width="1.8"/><text x="108" y="145" font-size="12" text-anchor="middle" fill="#1f2530">sekant</text><line x1="82" y1="175" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="192" y1="175" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="158.9" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="131.3" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="82" cy="158.9" r="3" fill="#2563c9"/><circle cx="192" cy="131.3" r="3" fill="#2563c9"/><line x1="82" y1="169" x2="192" y2="169" stroke="#1f2530" stroke-width="1.3"/><line x1="82" y1="165" x2="82" y2="173" stroke="#1f2530" stroke-width="1.3"/><line x1="192" y1="165" x2="192" y2="173" stroke="#1f2530" stroke-width="1.3"/><text x="137" y="163" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">h</tspan></text><text x="82" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="192" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan></text><text x="26" y="162.9" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>)</text><text x="26" y="135.3" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan>)</text></svg>
:::

Grafen till $f(x) = |x|$ har en hörnpunkt i origo: lutningen är $-1$ till
vänster om $x = 0$ och $1$ till höger — eftersom gränsvärdena skiljer sig
är funktionen inte deriverbar i hörnpunkten:

::: figur
<svg viewBox="-10 -20 227 148" width="308" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till f av x lika med absolutbeloppet av x med två streckade trappsteg som visar lutningen minus 1 till vänster om origo och lutningen 1 till höger om origo."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><text x="140" y="35" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = |<tspan font-style="italic">x</tspan>|</text><line x1="126" y1="75.6" x2="154" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="154" y1="75.6" x2="154" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="160" y="64" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">k</tspan> = 1</text><line x1="42" y1="47.6" x2="70" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="70" y1="47.6" x2="70" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="36" y="64" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">k</tspan> = −1</text></svg>
:::

## Inför provet

- Kan du förklara skillnaden mellan en sekant och en tangent?
- Kan du beräkna riktningskoefficienten för en sekant eller tangent ur
  formeln $k = \dfrac{\Delta y}{\Delta x}$?
- Vet du att sekantens lutning står för en genomsnittlig
  förändringshastighet, medan tangentens lutning står för
  förändringshastigheten vid en enda tidpunkt?
- Kan du ställa upp och tillämpa derivatans definition, inklusive att
  faktorisera bort $h$ innan du sätter $h = 0$?
- Vet du vad notationen $f'(a)$ betyder och hur den utläses?
- Kan du tolka en derivata i ett tillämpat sammanhang och avgöra dess
  enhet?
- Kan du beräkna en derivata med symbolhanterande hjälpmedel (till exempel
  Geogebra), och vet du att Geogebra använder punkt som decimaltecken?
- Kan du förklara skillnaden mellan en kontinuerlig och en diskontinuerlig
  funktion, och mellan ett hopp och ett språng?
- Kan du beräkna absolutbeloppet av ett tal eller uttryck, och lösa en
  ekvation med absolutbelopp?
- Vet du vilka tre villkor som gör att en funktion inte är deriverbar i en
  punkt?
- Kan du avläsa ur en graf var en funktion inte är deriverbar (hörnpunkter
  och diskontinuiteter)?

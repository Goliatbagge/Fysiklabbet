---
id: ma3b-2.7
title: Kontinuitet och deriverbarhet
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.7'
---

<!-- Egen 1b-version av ma3c-2.5 "Deriverbarhet och absolutbelopp".
     Absolutbelopp ingår inte i Matematik fortsättning nivå 1b (Gy25), så
     den delen är struken; kontinuitet och deriverbarhet är desamma. Ändras
     de delarna i ma3c-2.5 ska samma ändring göras här. -->

# Kontinuitet och deriverbarhet

Om det går att beräkna derivatan i en punkt, så är funktionen **deriverbar**
i den punkten. De flesta funktioner vi möter är deriverbara överallt, men
inte alla. För att se var det går fel behöver vi först begreppen
kontinuerlig och diskontinuerlig funktion.

## Kontinuerlig och diskontinuerlig funktion

::: tips "Kontinuerlig och diskontinuerlig funktion"
En funktion vars graf
1. hänger ihop är **kontinuerlig**. Grafen till en kontinuerlig funktion kan
   vi rita "utan att lyfta pennan".
2. inte hänger ihop, på grund av ett "hopp" eller "språng", är
   **diskontinuerlig** i punkten.
:::

En diskontinuitet kan se ut på olika sätt. Vid ett **hopp** ändras
funktionsvärdet plötsligt till ett annat värde i punkten. Grafen ritas då
ofta med en öppen ring (punkten ingår inte) och en fylld prick (punkten
ingår) på olika höjd. Ett vardagligt exempel är en parkeringsavgift som
räknas per påbörjad timme: priset står still en stund och hoppar sedan upp
till nästa nivå. Vid ett **språng** går grafen i stället mot oändligheten
på ömse sidor om punkten, till exempel vid en lodrät asymptot, där grafen
delas i två grenar som går mot $+\infty$ respektive $-\infty$. Det händer
där en nämnare blir 0, eftersom funktionen inte är definierad där.

## Hörnpunkt

En graf kan hänga ihop och ändå ha en spets. Figuren visar en graf som
består av två räta linjer: $y = -x$ till vänster om origo och $y = x$ till
höger om origo. De möts i origo och bildar ett **hörn**, en **hörnpunkt**.

::: figur
<svg viewBox="-4 -20 221 148" width="300" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En graf formad som ett V med spetsen i origo. Grafen består av linjen y lika med minus x till vänster och linjen y lika med x till höger, och de bildar ett hörn i origo."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/></svg>

Grafen hänger ihop men har ett "hörn" i origo.
:::

## Deriverbarhet

::: tips "Deriverbarhet"
En funktion är **inte** deriverbar i en viss punkt om funktionen
1. inte är definierad i punkten (till exempel då grafen har ett "språng"),
2. är diskontinuerlig i punkten (till exempel då grafen har ett "hopp"), eller
3. har en hörnpunkt i punkten (då grafen har ett "hörn").
:::

::: förklaring "Förklaring — Varför ett hörn inte är deriverbart"
Hur kan det komma sig att en funktion med en hörnpunkt inte är deriverbar i
hörnpunkten, trots att den både är definierad och kontinuerlig i punkten?
Vi tittar på grafen med hörnet i origo igen.

::: figur
<svg viewBox="-10 -20 227 148" width="308" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En graf som består av två räta linjer som möts i origo och bildar ett hörn. Två streckade trappsteg visar lutningen minus 1 till vänster om origo och lutningen 1 till höger om origo."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><line x1="126" y1="75.6" x2="154" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="154" y1="75.6" x2="154" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="160" y="64" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">k</tspan> = 1</text><line x1="42" y1="47.6" x2="70" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="70" y1="47.6" x2="70" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="36" y="64" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">k</tspan> = −1</text></svg>
:::

Om vi undersöker gränsvärdet när vi närmar oss $x = 0$ från vänster, så
blir lutningen $-1$, eftersom grafen där är linjen $y = -x$. Om vi i stället
närmar oss $x = 0$ från höger blir lutningen $1$, eftersom grafen där är
linjen $y = x$. Eftersom gränsvärdet blir olika, beroende på från vilket
håll vi närmar oss $x = 0$, finns det ingen entydig tangent i hörnet.
Derivatan saknar alltså värde där, och funktionen är inte deriverbar i
$x = 0$.
:::

::: exempel "Exempel 1 — Avläs deriverbarhet ur en graf"
**Figuren visar grafen till en funktion. För vilka värden på $x$ är
funktionen inte deriverbar?**

::: figur
<svg viewBox="-2 -2 252 136" width="342" height="185" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en funktion med ett hörn vid x lika med minus 4 och ett hopp vid x lika med 0. Peka eller tryck på hörnet eller hoppet så visas varför funktionen inte är deriverbar där." style="overflow:visible"><style>.q25s{cursor:pointer;outline:none}.q25s .q25-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q25s:hover .q25-lbl,.q25s:focus .q25-lbl{opacity:1}.q25s .q25-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q25s:hover .q25-pt,.q25s:focus .q25-pt{transform:scale(1.35)}</style><line x1="0" y1="98.4" x2="234.8" y2="98.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="244.8,98.4 234.8,93.9 234.8,102.9" fill="#1f2530"/><line x1="158.4" y1="112" x2="158.4" y2="10" stroke="#1f2530" stroke-width="1.6"/><polygon points="158.4,0 153.9,10 162.9,10" fill="#1f2530"/><text x="62.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="110.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="148" y="118" font-size="12" text-anchor="end" fill="#1f2530">0</text><text x="206.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="242.8" y="90.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="167.4" y="10" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14.4,86.4 L62.4,26.4 Q110.4,178.8 158.4,105.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><path d="M158.4,69.6 Q194.4,56.4 230.4,19.2" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><g class="q25s" tabindex="0"><circle cx="62.4" cy="26.4" r="16" fill="transparent"/><g class="q25-lbl"><circle cx="62.4" cy="26.4" r="7" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="72" y="16" font-size="11" fill="#c8324a">hörn:</text><text x="72" y="29" font-size="11" fill="#c8324a">inte deriverbar</text></g></g><g class="q25s" tabindex="0"><rect x="146" y="60" width="26" height="56" fill="transparent"/><circle class="q25-pt" cx="158.4" cy="105.6" r="4" fill="#fdfaf3" stroke="#2563c9" stroke-width="1.8"/><circle class="q25-pt" cx="158.4" cy="69.6" r="4" fill="#2563c9" stroke="#2563c9" stroke-width="1.8"/><g class="q25-lbl" fill="#c8324a" font-size="11"><text x="164" y="82">hopp:</text><text x="164" y="95">inte deriverbar</text></g></g></svg>

Peka eller tryck på hörnet vid $x = -4$ eller hoppet vid $x = 0$.
:::

::: handskrift
typ: deriverbarhet
:::

::: textlosning
Grafen har ett hörn då $x = -4$ och är diskontinuerlig (den har ett hopp)
då $x = 0$. I dessa punkter är funktionen alltså inte deriverbar.

**Svar:** $x = -4$ och $x = 0$
:::
:::

::: exempel "Exempel 2 — Där nämnaren blir noll"
**För vilket värde på $x$ är funktionen $f(x) = \dfrac{5}{x - 3}$ inte
deriverbar? Motivera ditt svar.**

::: handskrift
typ: ejdefinierad
:::

::: textlosning
Division med 0 är inte definierad. Funktionen är alltså inte definierad där
nämnaren är 0, så vi löser ekvationen

$$
x - 3 = 0
$$

och adderar 3 till båda led, vilket ger $x = 3$.

För $x = 3$ är funktionen inte definierad. Grafen har ett språng där (en
lodrät asymptot), och därför är funktionen inte deriverbar i $x = 3$.
För alla andra värden på $x$ är den deriverbar.

**Svar:** $x = 3$, eftersom funktionen inte är definierad där.
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Kontinuerlig eller inte"
- **Kontinuerlig funktion:** grafen hänger ihop och kan ritas utan att pennan lyfts.
- **Diskontinuerlig funktion:** grafen har ett hopp eller ett språng i punkten.
- Ett **hopp** ritas med en öppen ring och en fylld prick på olika höjd.
:::

::: sampunkt "Språng och hörn"
- Ett **språng** finns till exempel vid en lodrät asymptot, där grafen går mot $+\infty$ och $-\infty$.
- Ett språng uppstår där en nämnare blir 0, eftersom funktionen inte är definierad där.
- En **hörnpunkt** är en spets i en graf som hänger ihop.
:::

::: sampunkt "Deriverbarhet"
En funktion är **inte** deriverbar i en punkt där grafen
1. inte är definierad, alltså har ett språng,
2. är diskontinuerlig, alltså har ett hopp,
3. har en hörnpunkt.
:::

::: sampunkt "Varför inte i ett hörn?"
- Till vänster och till höger om hörnet har grafen olika lutning.
- Gränsvärdena blir olika, så det finns ingen entydig tangent.
- Utan tangent finns ingen derivata i punkten.
:::

:::

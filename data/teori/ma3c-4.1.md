---
id: ma3c-4.1
title: Växande och avtagande funktion
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.1'
---

# Växande och avtagande funktion

Kom ihåg: derivatan motsvarar en grafs **lutning i en punkt**. Tecknet på
derivatan avslöjar därför åt vilket håll grafen lutar — och därmed om
funktionen växer eller avtar.

::: tips "Växande och avtagande"
Om värdet på $f'(x)$ är

- **positivt**, dvs. $f'(x) > 0$, är lutningen hos $f(x)$ positiv
  ("uppförsbacke") och funktionen **växande**.
- **negativt**, dvs. $f'(x) < 0$, är lutningen hos $f(x)$ negativ
  ("nedförsbacke") och funktionen **avtagande**.
:::

::: tips "Strängt växande och strängt avtagande"
Om en funktion hela tiden är

- växande i ett intervall är funktionen **strängt växande** i intervallet.
- avtagande i ett intervall är funktionen **strängt avtagande** i
  intervallet.
:::

Vi kan alltså avgöra i vilka intervall en funktion växer och avtar på två
sätt: antingen genom att studera lutningen direkt på grafen till $f(x)$,
eller genom att studera **tecknet** på grafen till derivatan $f'(x)$.

## Avläsa växande och avtagande ur en graf

::: exempel "Exempel 1 — Avläsa växande och avtagande ur en graf"
**I vilka intervall växer respektive avtar funktionerna nedan?<br>
a) $f(x)$&emsp;&emsp;b) $g(x)$**

::: figur
<svg viewBox="26 2 180 141" width="180" height="141" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en funktion f av x, en nedåtöppnande båge med nollställen vid x=-1 och x=3 och maximum i punkten (1, 2)."><line x1="54" y1="139" x2="54" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="139" x2="84" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="114" y1="139" x2="114" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="139" x2="144" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="174" y1="139" x2="174" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="124" x2="192" y2="124" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="94" x2="192" y2="94" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="64" x2="192" y2="64" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="34" x2="192" y2="34" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="94" x2="192" y2="94" stroke="#1f2530" stroke-width="1.6"/><polygon points="202,94 192,89.5 192,98.5" fill="#1f2530"/><line x1="84" y1="139" x2="84" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="84,6 79.5,16 88.5,16" fill="#1f2530"/><text x="54" y="108" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="114" y="108" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="144" y="108" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="174" y="108" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="77" y="128" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="77" y="68" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="77" y="38" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="77" y="108" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M54,94 L57,88.2 L60,82.6 L63,77.4 L66,72.4 L69,67.8 L72,63.4 L75,59.4 L78,55.6 L81,52.2 L84,49 L87,46.2 L90,43.6 L93,41.3 L96,39.4 L99,37.8 L102,36.4 L105,35.4 L108,34.6 L111,34.2 L114,34 L117,34.2 L120,34.6 L123,35.4 L126,36.4 L129,37.8 L132,39.4 L135,41.4 L138,43.6 L141,46.2 L144,49 L147,52.2 L150,55.6 L153,59.4 L156,63.4 L159,67.8 L162,72.4 L165,77.4 L168,82.6 L171,88.2 L174,94" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="139.5" y="35.5" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>
:::

**a)** $f(x)$ är växande där grafen har positiv lutning ("uppförsbacke"
sett från vänster till höger). Det har den för alla $x$-värden fram till
$x = 1$, dvs. funktionen är växande för $x < 1$.

$f(x)$ är avtagande där grafen har negativ lutning ("nedförsbacke"). Det
har den för alla $x$-värden efter $x = 1$, dvs. funktionen är avtagande
för $x > 1$.

**Svar:** Växande för $x < 1$ och avtagande för $x > 1$.

::: figur
<svg viewBox="26 2 174 127" width="174" height="127" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en funktion g av x med ett lokalt minimum i punkten (-1,-1) och ett lokalt maximum i punkten (1,1)."><line x1="40.2" y1="124.8" x2="40.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="74.2" y1="124.8" x2="74.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="142.2" y1="124.8" x2="142.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176.2" y1="124.8" x2="176.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="104.4" x2="186.4" y2="104.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="36.4" x2="186.4" y2="36.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.4,70.4 186.4,65.9 186.4,74.9" fill="#1f2530"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="108.2,6 103.7,16 112.7,16" fill="#1f2530"/><text x="40.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-2</text><text x="74.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="142.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="176.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="101.2" y="108.4" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="101.2" y="40.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="101.2" y="84.4" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M40.2,36.4 L43,48.5 L45.9,59.1 L48.7,68.5 L51.5,76.7 L54.4,83.7 L57.2,89.5 L60,94.3 L62.9,98.1 L65.7,100.9 L68.5,102.9 L71.4,104 L74.2,104.4 L77,104.1 L79.9,103.1 L82.7,101.5 L85.5,99.4 L88.4,96.8 L91.2,93.8 L94,90.4 L96.9,86.8 L99.7,82.9 L102.5,78.8 L105.4,74.6 L108.2,70.4 L111,66.2 L113.9,62 L116.7,57.9 L119.5,54 L122.4,50.4 L125.2,47 L128,44 L130.9,41.4 L133.7,39.3 L136.5,37.7 L139.4,36.7 L142.2,36.4 L145,36.8 L147.9,37.9 L150.7,39.9 L153.5,42.7 L156.4,46.5 L159.2,51.3 L162,57.1 L164.9,64.1 L167.7,72.3 L170.5,81.7 L173.4,92.3 L176.2,104.4" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="35.1" y="24.5" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>
:::

**b)** Samma resonemang som i a-uppgiften. $g(x)$ är växande mellan
$x = -1$ och $x = 1$, dvs. för $-1 < x < 1$.

$g(x)$ är avtagande för alla $x$-värden före $-1$ och för alla
$x$-värden efter $1$, dvs. för $x < -1$ och $x > 1$.

**Svar:** Växande för $-1 < x < 1$ och avtagande för $x < -1$ samt
$x > 1$.
:::

::: exempel "Exempel 2 — Tolka derivatans tecken ur en graf"
**Grafen till funktionen $g(x)$ (samma funktion som i föregående
exempel) visas nedan.<br>
a) Är $g'(2)$ positiv, negativ eller noll?&emsp;&emsp;
b) I vilket intervall är $g'(x) > 0$?&emsp;&emsp;
c) För vilka $x$ gäller att $g'(x) = 0$?**

::: figur
<svg viewBox="26 2 174 127" width="174" height="127" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en funktion g av x med ett lokalt minimum i punkten (-1,-1) och ett lokalt maximum i punkten (1,1)."><line x1="40.2" y1="124.8" x2="40.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="74.2" y1="124.8" x2="74.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="142.2" y1="124.8" x2="142.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176.2" y1="124.8" x2="176.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="104.4" x2="186.4" y2="104.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="36.4" x2="186.4" y2="36.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.4,70.4 186.4,65.9 186.4,74.9" fill="#1f2530"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="108.2,6 103.7,16 112.7,16" fill="#1f2530"/><text x="40.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-2</text><text x="74.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="142.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="176.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="101.2" y="108.4" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="101.2" y="40.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="101.2" y="84.4" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M40.2,36.4 L43,48.5 L45.9,59.1 L48.7,68.5 L51.5,76.7 L54.4,83.7 L57.2,89.5 L60,94.3 L62.9,98.1 L65.7,100.9 L68.5,102.9 L71.4,104 L74.2,104.4 L77,104.1 L79.9,103.1 L82.7,101.5 L85.5,99.4 L88.4,96.8 L91.2,93.8 L94,90.4 L96.9,86.8 L99.7,82.9 L102.5,78.8 L105.4,74.6 L108.2,70.4 L111,66.2 L113.9,62 L116.7,57.9 L119.5,54 L122.4,50.4 L125.2,47 L128,44 L130.9,41.4 L133.7,39.3 L136.5,37.7 L139.4,36.7 L142.2,36.4 L145,36.8 L147.9,37.9 L150.7,39.9 L153.5,42.7 L156.4,46.5 L159.2,51.3 L162,57.1 L164.9,64.1 L167.7,72.3 L170.5,81.7 L173.4,92.3 L176.2,104.4" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="35.1" y="24.5" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>
:::

**a)** $g'(2)$ står för derivatan (lutningen) då $x = 2$. Lutningen är
negativ där, eftersom $g(x)$ avtar för $x > 1$. $g'(2)$ är alltså negativ.

**Svar:** Negativ.

**b)** Att $g'(x) > 0$ betyder att derivatan (lutningen) ska vara positiv,
dvs. att funktionen växer. Grafen har positiv lutning mellan $x = -1$ och
$x = 1$, dvs. då $-1 < x < 1$.

**Svar:** $-1 < x < 1$

**c)** Att $g'(x) = 0$ betyder att derivatan (lutningen) ska vara noll,
dvs. att tangenten i punkten är horisontell. Det är den vid $x = -1$ och
$x = 1$ (i den lokala minimi- respektive maximipunkten).

**Svar:** $x = -1$ och $x = 1$
:::

## Bestämma växande och avtagande med en teckentabell

När vi i stället ser grafen till derivatan $f'(x)$ kan vi bestämma var
$f(x)$ växer och avtar genom att studera **tecknet** på $f'(x)$ i
intervallen mellan dess nollställen.

::: tips "Steg för steg"
1. Bestäm nollställena till $f'(x)$, dvs. var derivatans graf skär
   $x$-axeln.
2. Avläs tecknet på $f'(x)$ i varje intervall mellan nollställena —
   positivt tecken ger växande $f(x)$, negativt tecken ger avtagande
   $f(x)$.
3. Sammanställ resultatet i en **teckentabell**.
:::

::: exempel "Exempel 3 — Bestämma f(x):s växande ur grafen till f′(x)"
**Figuren nedan visar grafen till $y = f'(x)$.<br>
a) I vilket intervall är $f(x)$ växande?&emsp;&emsp;
b) För vilka $x$-värden har grafen till $f(x)$ lutningen 0?**

::: figur
<svg viewBox="26 2 212 167" width="212" height="167" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till derivatan f-prim av x, en nedåtöppnande båge med nollställen vid x=-1 och x=5 och maximum i punkten (2, 3)."><line x1="37.2" y1="164.8" x2="37.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="61.2" y1="164.8" x2="61.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="85.2" y1="164.8" x2="85.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="109.2" y1="164.8" x2="109.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="133.2" y1="164.8" x2="133.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="157.2" y1="164.8" x2="157.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="181.2" y1="164.8" x2="181.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="205.2" y1="164.8" x2="205.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="150.4" x2="224.4" y2="150.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="126.4" x2="224.4" y2="126.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="102.4" x2="224.4" y2="102.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="78.4" x2="224.4" y2="78.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="54.4" x2="224.4" y2="54.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="30.4" x2="224.4" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="102.4" x2="224.4" y2="102.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="234.4,102.4 224.4,97.9 224.4,106.9" fill="#1f2530"/><line x1="85.2" y1="164.8" x2="85.2" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="85.2,6 80.7,16 89.7,16" fill="#1f2530"/><text x="37.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">-2</text><text x="61.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="109.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="133.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="157.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="181.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="205.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="78.2" y="154.4" font-size="12" text-anchor="end" fill="#1f2530">-2</text><text x="78.2" y="130.4" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="78.2" y="82.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="78.2" y="58.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="78.2" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="78.2" y="116.4" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M37.2,158.4 L41,148.5 L44.8,138.9 L48.6,129.8 L52.4,121.1 L56.2,112.7 L60,104.8 L63.8,97.3 L67.6,90.2 L71.4,83.4 L75.2,77.1 L79,71.2 L82.8,65.7 L86.6,60.6 L90.4,55.8 L94.2,51.5 L98,47.6 L101.8,44.1 L105.6,41 L109.4,38.3 L113.2,36 L117,34 L120.8,32.5 L124.6,31.4 L128.4,30.7 L132.2,30.4 L136,30.5 L139.8,31 L143.6,31.9 L147.4,33.2 L151.2,34.9 L155,37 L158.8,39.5 L162.6,42.4 L166.4,45.7 L170.2,49.4 L174,53.5 L177.8,58 L181.6,62.9 L185.4,68.2 L189.2,74 L193,80.1 L196.8,86.6 L200.6,93.5 L204.4,100.8 L208.2,108.5 L212,116.6 L215.8,125.2 L219.6,134.1" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="118.8" y="22" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>&#8242;(<tspan font-style="italic">x</tspan>)</text></svg>
:::

**a)** $f(x)$ är växande när $f'(x)$ (lutningen) är större än 0. Grafen
till $f'(x)$ ligger ovanför $x$-axeln mellan $x = -1$ och $x = 5$, dvs.
för $-1 < x < 5$.

| Intervall | Tecken på $f'(x)$ | $f(x)$ |
| --- | --- | --- |
| $x < -1$ | negativt | avtagande |
| $-1 < x < 5$ | positivt | växande |
| $x > 5$ | negativt | avtagande |

**Svar:** $-1 < x < 5$

**b)** $f(x)$ har lutningen 0 där $f'(x) = 0$, dvs. där grafen till
$f'(x)$ skär $x$-axeln. Det sker vid $x = -1$ och $x = 5$.

**Svar:** $x = -1$ och $x = 5$
:::

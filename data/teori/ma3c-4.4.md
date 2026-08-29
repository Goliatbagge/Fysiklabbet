---
id: ma3c-4.4
title: Andraderivatan och funktionens graf
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.4'
---

# Andraderivatan och funktionens graf

Derivatan av derivatan kallas **andraderivatan**, skrivs $f''(x)$ och
utläses "$f$ bis av $x$". Andraderivatan beskriver hur derivatan (eller
lutningen) ändras. En punkt där lutningen inte ändras kallas
**inflexionspunkt**.

## Konvex och konkav kurva

Vi har tidigare sett hur förstaderivatans tecken avslöjar om en funktion
växer eller avtar, och hur teckenväxlingar avslöjar extrempunkter. Nu
undersöker vi vad andraderivatan berättar om kurvans **form**.

::: härledning "Andraderivatan och grafen — analys av $f'(x)$ och $f''(x)$"
Betrakta en funktion $f(x)$ på intervallet $a \le x \le d$, med
extrempunkter där $x = b$ och där $x = c$ (där $b < c$), och en
inflexionspunkt där $x = z$ (mellan $b$ och $c$). Vi börjar med att
analysera förstaderivatan.

| Intervall | Tecken hos $f'(x)$ | Vad det betyder |
| --- | --- | --- |
| $a \le x < b$ | $f'(x) < 0$ | grafen avtar (negativ lutning) |
| $x = b$ | $f'(x) = 0$ | extrempunkt |
| $b < x < c$ | $f'(x) > 0$ | grafen växer (positiv lutning) |
| $x = c$ | $f'(x) = 0$ | extrempunkt |
| $c < x \le d$ | $f'(x) < 0$ | grafen avtar (negativ lutning) |

Vi analyserar nu andraderivatan $f''(x)$, som beskriver hur $f'(x)$ —
alltså lutningen — ändras.

| Intervall | Tecken hos $f''(x)$ | Vad det betyder |
| --- | --- | --- |
| $a \le x < z$ | $f''(x) > 0$ | lutningen ökar — kurvan är konvex |
| $x = z$ | $f''(x) = 0$ | lutningen ändras inte — inflexionspunkt |
| $z < x \le d$ | $f''(x) < 0$ | lutningen minskar — kurvan är konkav |
:::

::: härledning "Andraderivatan och grafen — kom ihåg"
I en punkt där

1. kurvan böjer uppåt (en "glad" kurva) är andraderivatan **positiv** och
   kurvan är **konvex**,
2. kurvan böjer nedåt (en "ledsen" kurva) är andraderivatan **negativ**
   och kurvan är **konkav**,
3. kurvans lutning inte ändras (mungipan mellan en "glad" och en "ledsen"
   kurva) är andraderivatan **noll** — punkten är en **inflexionspunkt**.
:::

::: figur
<svg viewBox="12 6 280 173" width="409" height="253" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Graf som visar övergången mellan en konkav och en konvex kurva. Vänster del av kurvan är blå och konkav, med andraderivatan negativ. Höger del är röd och konvex, med andraderivatan positiv. Mitt emellan, där kurvans lutning inte ändras, ligger inflexionspunkten. Peka eller tryck på en kurvdel eller inflexionspunkten så visas andraderivatans tecken." style="overflow:visible">
<style>.q44s{cursor:pointer;outline:none}.q44s .q44-cv{transition:stroke-width .18s ease}.q44s:hover .q44-cv,.q44s:focus .q44-cv{stroke-width:3.6}.q44s .q44-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q44s:hover .q44-lbl,.q44s:focus .q44-lbl{opacity:1}.q44s .q44-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q44s:hover .q44-pt,.q44s:focus .q44-pt{transform:scale(1.5)}</style>
<line x1="16" y1="105" x2="275" y2="105" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="288,105 275,100.5 275,109.5" fill="#1f2530"/>
<line x1="150" y1="175" x2="150" y2="25" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="150,14 145.5,25 154.5,25" fill="#1f2530"/>
<text x="283" y="122" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text>
<text x="160" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text>
<g class="q44s" tabindex="0">
<path d="M 29,169.8 C 30.83,164.33 36.33,146.65 40,137 C 43.67,127.35 47.33,119.12 51,111.9 C 54.67,104.68 58.33,98.73 62,93.7 C 65.67,88.67 69.33,84.8 73,81.7 C 76.67,78.6 80.33,76.55 84,75.1 C 87.67,73.65 91.33,73.05 95,73 C 98.67,72.95 102.33,73.68 106,74.8 C 109.67,75.92 113.33,77.7 117,79.7 C 120.67,81.7 124.33,84.17 128,86.8 C 131.67,89.43 135.33,92.47 139,95.5 C 142.67,98.53 148.17,103.42 150,105" fill="none" stroke="transparent" stroke-width="16"/>
<path class="q44-cv" d="M 29,169.8 C 30.83,164.33 36.33,146.65 40,137 C 43.67,127.35 47.33,119.12 51,111.9 C 54.67,104.68 58.33,98.73 62,93.7 C 65.67,88.67 69.33,84.8 73,81.7 C 76.67,78.6 80.33,76.55 84,75.1 C 87.67,73.65 91.33,73.05 95,73 C 98.67,72.95 102.33,73.68 106,74.8 C 109.67,75.92 113.33,77.7 117,79.7 C 120.67,81.7 124.33,84.17 128,86.8 C 131.67,89.43 135.33,92.47 139,95.5 C 142.67,98.53 148.17,103.42 150,105" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round"/>
<text x="50" y="60" font-size="13" text-anchor="start" fill="#2563c9">Konkav</text>
<g class="q44-lbl"><rect x="47" y="64" width="58" height="16" rx="4" fill="#f3eee4"/><text x="50" y="76" font-size="12" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) &lt; 0</text></g>
</g>
<g class="q44s" tabindex="0">
<path d="M 150,105 C 151.83,106.58 157.33,111.47 161,114.5 C 164.67,117.53 168.33,120.57 172,123.2 C 175.67,125.83 179.33,128.3 183,130.3 C 186.67,132.3 190.33,134.08 194,135.2 C 197.67,136.32 201.33,137.03 205,137 C 208.67,136.97 212.33,136.45 216,135 C 219.67,133.55 223.33,131.42 227,128.3 C 230.67,125.18 234.33,121.33 238,116.3 C 241.67,111.27 245.33,105.32 249,98.1 C 252.67,90.88 256.33,82.65 260,73 C 263.67,63.35 269.17,45.67 271,40.2" fill="none" stroke="transparent" stroke-width="16"/>
<path class="q44-cv" d="M 150,105 C 151.83,106.58 157.33,111.47 161,114.5 C 164.67,117.53 168.33,120.57 172,123.2 C 175.67,125.83 179.33,128.3 183,130.3 C 186.67,132.3 190.33,134.08 194,135.2 C 197.67,136.32 201.33,137.03 205,137 C 208.67,136.97 212.33,136.45 216,135 C 219.67,133.55 223.33,131.42 227,128.3 C 230.67,125.18 234.33,121.33 238,116.3 C 241.67,111.27 245.33,105.32 249,98.1 C 252.67,90.88 256.33,82.65 260,73 C 263.67,63.35 269.17,45.67 271,40.2" fill="none" stroke="#c8324a" stroke-width="2.4" stroke-linecap="round"/>
<text x="210" y="155" font-size="13" text-anchor="start" fill="#c8324a">Konvex</text>
<g class="q44-lbl"><text x="210" y="171" font-size="12" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) &gt; 0</text></g>
</g>
<g class="q44s" tabindex="0">
<circle cx="150" cy="105" r="15" fill="transparent"/>
<line x1="160" y1="52" x2="152" y2="99" stroke="rgba(31,37,48,0.5)" stroke-width="1.2" stroke-dasharray="3 3"/>
<circle class="q44-pt" cx="150" cy="105" r="3.5" fill="#f3eee4" stroke="#1f2530" stroke-width="1.6"/>
<text x="163" y="42" font-size="12" text-anchor="start" fill="#1f2530">Inflexionspunkt</text>
<g class="q44-lbl"><text x="163" y="57" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) = 0</text></g>
</g>
</svg>
<p class="lab-figur-cap">Andraderivatan är negativ för hela den blå delen av kurvan ("ledsen" kurva, konkav) och positiv för hela den röda delen ("glad" kurva, konvex). I inflexionspunkten, där kurvan varken är konkav eller konvex, är andraderivatan lika med noll. Peka eller tryck på en kurvdel eller inflexionspunkten så visas andraderivatans tecken.</p>
:::

::: exempel "Exempel 1 — Inflexionspunkt och konvexitet"
**Funktionen $f(x) = x^3 - 6x^2 + 7x$ är given.<br>
a) Bestäm inflexionspunktens koordinater.<br>b) I vilket
intervall är funktionen konvex?**

**a)** I inflexionspunkten är andraderivatan lika med noll. Vi tar fram
andraderivatan genom att derivera funktionen två gånger, sätter den lika
med noll och löser sedan ekvationen för att få fram inflexionspunktens
$x$-koordinat.

$$
f'(x) = 3x^2 - 12x + 7
$$

$$
f''(x) = 6x - 12
$$

$f''(x) = 0$ ger

$$
\begin{aligned}
6x - 12 &= 0 \\
6x &= 12 \\
x &= 2
\end{aligned}
$$

Vi sätter in $x = 2$ i den ursprungliga funktionen
$f(x) = x^3 - 6x^2 + 7x$ för att bestämma inflexionspunktens
$y$-koordinat.

$$
f(2) = 2^3 - 6 \cdot 2^2 + 7 \cdot 2 = 8 - 24 + 14 = -2
$$

Så inflexionspunkten har koordinaterna $(2, -2)$.

**Svar:** $(2, -2)$

**b)** Funktionen är konvex när $f''(x) > 0$. Vi har sedan tidigare att
$f''(x) = 6x - 12$.

$f''(x) > 0$ ger

$$
\begin{aligned}
6x - 12 &> 0 \\
6x &> 12 \\
x &> 2
\end{aligned}
$$

**Svar:** $x > 2$
:::

::: exempel "Exempel 2 — Inflexionspunkt från grafen till $f(x)$ eller $f'(x)$"
**Ange $x$-koordinaten för inflexionspunkten till funktionen $f(x)$.<br>
a) Grafen till $y = f(x)$ har extrempunkter där $x = -1$ och
$x = 1$.<br>b) Grafen till $y = f'(x)$ har en extrempunkt
(minimum) där $x = 1$.**

**a)** Inflexionspunkten för funktionen $f(x)$ ges av när grafen till
$f(x)$ växlar mellan att vara konvex och konkav (i "mungipan"). På grund
av symmetrin ligger den alltid mitt emellan två extrempunkter.

Vi har extrempunkter där $x = -1$ och $x = 1$. Alltså ligger
inflexionspunkten mitt emellan dessa, det vill säga då $x = 0$.

**Svar:** $x = 0$

**b)** I inflexionspunkten är $f''(x) = 0$. Vi kan se $f''(x)$ som
derivatan (lutningen) till $f'(x)$. Inflexionspunkten för funktionen
$f(x)$ ges alltså av när grafen till $f'(x)$ har lutningen 0, det vill säga i sin
egen extrempunkt.

Grafen till $f'(x)$ har en extrempunkt (minimum) där $x = 1$.

**Svar:** $x = 1$
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Andraderivatan"
- **Andraderivatan** är derivatan av derivatan, skrivs $f''(x)$ och utläses "$f$ bis av $x$".
- Den beskriver hur **lutningen** ändras, alltså kurvans form.
- Förstaderivatan säger om kurvan går upp eller ner, andraderivatan hur den böjer.
:::

::: sampunkt "Konvex och konkav"
- $f''(x) > 0$: lutningen ökar, kurvan böjer uppåt och är **konvex**, som en glad mun.
- $f''(x) < 0$: lutningen minskar, kurvan böjer nedåt och är **konkav**, som en sur mun.
- $f''(x) = 0$: kurvans lutning ändras inte. Punkten är en **inflexionspunkt**.
:::

::: sampunkt "Bestämma inflexionspunkten"
1. Derivera två gånger för att få $f''(x)$.
2. Sätt $f''(x) = 0$ och lös ekvationen. Det ger $x$-koordinaten.
3. Sätt in $x$ i den **ursprungliga** funktionen för $y$-koordinaten.
- $f(x) = x^3 - 6x^2 + 7x$ ger $f''(x) = 6x - 12$ och inflexionspunkten $(2, -2)$.
:::

::: sampunkt "Läsa ur en graf"
- Grafen till $f(x)$: inflexionspunkten ligger mitt emellan två extrempunkter.
- Grafen till $f'(x)$: inflexionspunkten ligger i $f'(x)$:s **egen extrempunkt**, eftersom lutningen är 0 där.
- Funktionen är konvex i de intervall där $f''(x) > 0$.
:::

:::

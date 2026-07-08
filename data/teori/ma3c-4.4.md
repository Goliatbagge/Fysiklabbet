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
<svg viewBox="12 6 280 173" width="280" height="173" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Graf som visar övergången mellan en konkav och en konvex kurva. Vänster del av kurvan är blå och konkav, med andraderivatan negativ. Höger del är röd och konvex, med andraderivatan positiv. Mitt emellan, där kurvans lutning inte ändras, ligger inflexionspunkten.">
<line x1="16" y1="105" x2="275" y2="105" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="288,105 275,100.5 275,109.5" fill="#1f2530"/>
<line x1="150" y1="175" x2="150" y2="25" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="150,14 145.5,25 154.5,25" fill="#1f2530"/>
<text x="283" y="122" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text>
<text x="160" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text>
<path d="M29,169.8 L40,137 L51,111.9 L62,93.7 L73,81.7 L84,75.1 L95,73 L106,74.8 L117,79.7 L128,86.8 L139,95.5 L150,105" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round"/>
<path d="M150,105 L161,114.5 L172,123.2 L183,130.3 L194,135.2 L205,137 L216,135 L227,128.3 L238,116.3 L249,98.1 L260,73 L271,40.2" fill="none" stroke="#c8324a" stroke-width="2.4" stroke-linecap="round"/>
<line x1="160" y1="52" x2="152" y2="99" stroke="rgba(31,37,48,0.5)" stroke-width="1.2" stroke-dasharray="3 3"/>
<circle cx="150" cy="105" r="3.5" fill="#f3eee4" stroke="#1f2530" stroke-width="1.6"/>
<text x="163" y="42" font-size="12" text-anchor="start" fill="#1f2530">Inflexionspunkt</text>
<text x="50" y="60" font-size="13" text-anchor="start" fill="#2563c9">Konkav</text>
<text x="210" y="155" font-size="13" text-anchor="start" fill="#c8324a">Konvex</text>
</svg>
<p class="lab-figur-cap">Andraderivatan är negativ för hela den blå delen av kurvan ("ledsen" kurva, konkav) och positiv för hela den röda delen ("glad" kurva, konvex). I inflexionspunkten, där kurvan varken är konkav eller konvex, är andraderivatan lika med noll.</p>
:::

::: exempel "Exempel 1 — Inflexionspunkt och konvexitet"
**Funktionen $f(x) = x^3 - 6x^2 + 7x$ är given.<br>
a) Bestäm inflexionspunktens koordinater.&emsp;&emsp;b) I vilket
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
$x = 1$.&emsp;&emsp;b) Grafen till $y = f'(x)$ har en extrempunkt
(minimum) där $x = 1$.**

**a)** Inflexionspunkten för funktionen $f(x)$ ges av när grafen till
$f(x)$ växlar mellan att vara konvex och konkav (i "mungipan"). På grund
av symmetrin ligger den alltid mitt emellan två extrempunkter.

Vi har extrempunkter där $x = -1$ och $x = 1$. Alltså ligger
inflexionspunkten mitt emellan dessa, dvs. då $x = 0$.

**Svar:** $x = 0$

**b)** I inflexionspunkten är $f''(x) = 0$. Vi kan se $f''(x)$ som
derivatan (lutningen) till $f'(x)$. Inflexionspunkten för funktionen
$f(x)$ ges alltså av när grafen till $f'(x)$ har lutningen 0, dvs. i sin
egen extrempunkt.

Grafen till $f'(x)$ har en extrempunkt (minimum) där $x = 1$.

**Svar:** $x = 1$
:::

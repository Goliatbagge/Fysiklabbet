---
id: ma3c-5.6
title: Area mellan kurvor
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.6'
---

# Area mellan kurvor

Tidigare har integraler gett oss arean mellan en kurva och *x*-axeln. Vi kan
även beräkna arean mellan **två kurvor**.

::: formel "Area mellan två kurvor"
$$
A = \int_a^b \big(f(x) - g(x)\big)\, dx
$$

där $f(x)$ är den övre funktionen och $g(x)$ är den undre funktionen i
intervallet $[a, b]$.
:::

## Härledning

::: härledning "Härledning — Area mellan kurvor"
Vi vill beräkna arean mellan kurvorna $f(x)$ och $g(x)$ i figuren nedan, där
$f(x)$ ligger över $g(x)$ i hela intervallet $[a, b]$.

::: figur
<svg viewBox="46 4 274 190" width="274" height="190" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Koordinatsystem med tva kurvor, den ovre f av x (bla kurva) och den undre g av x (gron rat linje). Kurvorna skar varandra dar x=a och x=b. Det roda skuggade omradet mellan kurvorna fran a till b ar arean A."><line x1="50" y1="170" x2="306" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="316,170 306,165.5 306,174.5" fill="#1f2530"/><line x1="64" y1="182" x2="64" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="64,8 59.5,18 68.5,18" fill="#1f2530"/><polygon points="115.3,95.0 121.7,87.7 128.1,80.9 134.5,74.6 141.0,68.8 147.4,63.4 153.8,58.4 160.2,54.0 166.6,50.0 173.0,46.5 179.4,43.4 185.8,40.9 192.3,38.8 198.7,37.1 205.1,35.9 211.5,35.2 217.9,35.0 224.3,35.2 230.7,35.9 237.2,37.1 243.6,38.8 250.0,40.9 256.4,43.4 262.8,46.5 269.2,50.0 269.2,50.0 262.8,51.9 256.4,53.7 250.0,55.6 243.6,57.5 237.2,59.4 230.7,61.2 224.3,63.1 217.9,65.0 211.5,66.9 205.1,68.8 198.7,70.6 192.3,72.5 185.8,74.4 179.4,76.2 173.0,78.1 166.6,80.0 160.2,81.9 153.8,83.8 147.4,85.6 141.0,87.5 134.5,89.4 128.1,91.2 121.7,93.1 115.3,95.0" fill="#c8324a" fill-opacity="0.16"/><path d="M64.0,170.0 L69.9,159.8 L75.8,150.1 L81.7,140.7 L87.6,131.8 L93.5,123.2 L99.4,115.0 L105.3,107.3 L111.2,99.9 L117.1,92.9 L123.0,86.3 L128.9,80.2 L134.8,74.4 L140.7,69.0 L146.6,64.0 L152.5,59.4 L158.4,55.2 L164.3,51.4 L170.2,48.0 L176.1,45.0 L182.0,42.3 L187.9,40.1 L193.8,38.3 L199.7,36.9 L205.6,35.9 L211.5,35.2 L217.4,35.0 L223.3,35.2 L229.2,35.7 L235.1,36.7 L241.0,38.0 L246.9,39.8 L252.8,41.9 L258.7,44.5 L264.6,47.4 L270.5,50.8 L276.4,54.5 L282.3,58.6 L288.2,63.2 L294.1,68.1 L300.0,73.4" fill="none" stroke="#2563c9" stroke-width="2"/><path d="M64.0,110.0 L69.9,108.3 L75.8,106.5 L81.7,104.8 L87.6,103.1 L93.5,101.4 L99.4,99.7 L105.3,97.9 L111.2,96.2 L117.1,94.5 L123.0,92.8 L128.9,91.0 L134.8,89.3 L140.7,87.6 L146.6,85.9 L152.5,84.1 L158.4,82.4 L164.3,80.7 L170.2,78.9 L176.1,77.2 L182.0,75.5 L187.9,73.8 L193.8,72.1 L199.7,70.3 L205.6,68.6 L211.5,66.9 L217.4,65.1 L223.3,63.4 L229.2,61.7 L235.1,60.0 L241.0,58.2 L246.9,56.5 L252.8,54.8 L258.7,53.1 L264.6,51.4 L270.5,49.6 L276.4,47.9 L282.3,46.2 L288.2,44.5 L294.1,42.7 L300.0,41.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><line x1="115.3" y1="170" x2="115.3" y2="95.0" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="269.2" y1="170" x2="269.2" y2="50.0" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="115.3" cy="95.0" r="3" fill="#c8324a"/><circle cx="269.2" cy="50.0" r="3" fill="#c8324a"/><text x="311" y="187" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="72" y="24" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="115.3" y="184" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="269.2" y="184" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="228" y="22" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><text x="283" y="33" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text><text x="192" y="58" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">A</tspan></text></svg>
:::

Arean under $f(x)$, dvs. mellan kurvan och *x*-axeln, ges av integralen
$\int_a^b f(x)\, dx$ (den blå arean i figuren, om vi också räknar med arean
under $g(x)$). Arean under $g(x)$ ges på motsvarande sätt av
$\int_a^b g(x)\, dx$ (den rosa arean).

Om vi subtraherar den undre arean (rosa) från den övre arean (blå) blir
kvar precis den röda arean $A$ mellan kurvorna:

$$
A = \int_a^b f(x)\, dx - \int_a^b g(x)\, dx = \int_a^b \big(f(x) - g(x)\big)\, dx \qquad \text{vsv.}
$$
:::

## Area mellan kurvor med digitalt hjälpmedel

Precis som för arean mellan en kurva och *x*-axeln kan vi använda Geogebra
för att beräkna arean mellan två kurvor, både exakt och som närmevärde.

::: tips "Exakt area med Geogebra (CAS-läge)"
1. Skriv "Integral" i inmatningsfältet och välj kommandot
   **IntegralMellan( Funktion, Funktion, Från *x*-värde, Till *x*-värde )**
   ur menyn.
2. Skriv in funktionsuttrycket för den övre funktionen (utan "$f(x) =$").
3. Skriv in funktionsuttrycket för den undre funktionen.
4. Skriv *x*-koordinaten för areans undre gräns.
5. Skriv *x*-koordinaten för areans övre gräns.
6. **Enter** ger den exakta arean.
:::

::: tips "Närmevärde med Geogebra (standardvy)"
1. Skriv "Integral" i inmatningsfältet och välj kommandot
   **IntegralMellan( Funktion, Funktion, Från *x*-värde, Till *x*-värde )**
   ur menyn, precis som i CAS-läge.
2. Skriv in funktionsuttrycket för den övre funktionen (utan "$f(x) =$").
3. Skriv in funktionsuttrycket för den undre funktionen.
4. Skriv *x*-koordinaten för areans undre gräns.
5. Skriv *x*-koordinaten för areans övre gräns.
6. **Enter** ger ett närmevärde (ungefärligt värde) på arean.
:::

::: exempel "Exempel 1 — Area mellan kurvor med integraler och Geogebra"
**Bestäm arean av det skuggade området mellan kurvorna $y = x^2$ och
$y = x - 2$ då $0 \leq x \leq 2$, dels<br>
a) med integraler&emsp;&emsp;b) med digitalt hjälpmedel.**

**a)** $y = x^2$ är den övre funktionen och $y = x - 2$ är den undre
funktionen i intervallet. Arean ges då av

$$
A = \int_0^2 \big(x^2 - (x - 2)\big)\, dx = \int_0^2 (x^2 - x + 2)\, dx = \left[\frac{x^3}{3} - \frac{x^2}{2} + 2x\right]_0^2
$$

$$
= \left(\frac{2^3}{3} - \frac{2^2}{2} + 2 \cdot 2\right) - \left(\frac{0^3}{3} - \frac{0^2}{2} + 2 \cdot 0\right) = \frac{8}{3} - 2 + 4 - 0 = \frac{8}{3} + 2 = \frac{14}{3}
$$

**Svar:** $\dfrac{14}{3}\ \text{a.e.} \approx 4{,}67\ \text{a.e.}$

**b)** I Geogebras CAS-läge skriver vi "Integral" i inmatningsfältet och
väljer kommandot IntegralMellan ur menyn. Vi skriver först in
funktionsuttrycket för den övre funktionen, sedan för den undre, och till
sist undre och övre gräns i *x*-led ($x = 0$ och $x = 2$):

$$
\text{IntegralMellan}(x^2,\ x - 2,\ 0,\ 2) = \frac{14}{3}
$$

**Svar:** $\dfrac{14}{3}\ \text{a.e.} \approx 4{,}67\ \text{a.e.}$
:::

::: exempel "Exempel 2 — Skärningspunkter och sammansatt area"
**Ett område är markerat mellan kurvorna $y = x$, $y = 6 - x^2$ och
$y = -3$. Punkt A är skärningen mellan $y = x$ och $y = 6 - x^2$, och punkt B
är skärningen mellan $y = 6 - x^2$ och $y = -3$ (båda med positiv
$x$-koordinat). Bestäm<br>
a) skärningspunkternas $x$-koordinater i punkterna A och B&emsp;&emsp;b) det
markerade områdets area.**

**a)** Skärningspunkternas $x$-koordinater bestäms genom att sätta
funktionerna lika med varandra och lösa ekvationen.

I punkt A skärs $y = x$ och $y = 6 - x^2$. Skärningens $x$-koordinat ges då
av

$$
x = 6 - x^2 \quad\Leftrightarrow\quad x^2 + x - 6 = 0
$$

$pq$-formeln ger

$$
x = -\frac{1}{2} \pm \sqrt{\left(\frac{1}{2}\right)^2 + 6} = -\frac{1}{2} \pm \sqrt{\frac{25}{4}} = -\frac{1}{2} \pm \frac{5}{2}
$$

vilket ger $x_1 = -3$ och $x_2 = 2$. Eftersom punkt A har en positiv
$x$-koordinat gäller $x = 2$ i punkt A.

I punkt B skärs $y = 6 - x^2$ och $y = -3$. Skärningens $x$-koordinat ges då
av

$$
6 - x^2 = -3 \quad\Leftrightarrow\quad x^2 = 9 \quad\Leftrightarrow\quad x = \pm 3
$$

Eftersom punkt B har en positiv $x$-koordinat gäller $x = 3$ i punkt B.

**Svar:** $x = 2$ i punkt A och $x = 3$ i punkt B

**b)** Mellan $x = 0$ och $x = 2$ är $y = x$ den övre funktionen och
$y = -3$ den undre funktionen. Denna del av arean, $A_1$, ges av

$$
A_1 = \int_0^2 \big(x - (-3)\big)\, dx = \int_0^2 (x + 3)\, dx = \left[\frac{x^2}{2} + 3x\right]_0^2 = \left(\frac{2^2}{2} + 3 \cdot 2\right) - 0 = 2 + 6 = 8\ \text{a.e.}
$$

Mellan $x = 2$ och $x = 3$ är $y = 6 - x^2$ den övre funktionen och
$y = -3$ den undre funktionen. Denna del av arean, $A_2$, ges av

$$
A_2 = \int_2^3 \big((6 - x^2) - (-3)\big)\, dx = \int_2^3 (9 - x^2)\, dx = \left[9x - \frac{x^3}{3}\right]_2^3
$$

$$
= \left(9 \cdot 3 - \frac{3^3}{3}\right) - \left(9 \cdot 2 - \frac{2^3}{3}\right) = (27 - 9) - \left(18 - \frac{8}{3}\right) = 18 - 18 + \frac{8}{3} = \frac{8}{3}\ \text{a.e.}
$$

Den sammanlagda arean $A$ fås genom att lägga ihop de två delarna:

$$
A = A_1 + A_2 = 8 + \frac{8}{3} = \frac{24}{3} + \frac{8}{3} = \frac{32}{3}\ \text{a.e.}
$$

**Svar:** $\dfrac{32}{3}\ \text{a.e.}$
:::

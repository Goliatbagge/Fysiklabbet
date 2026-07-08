---
id: ma3c-6.7
title: Cosinussatsen
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.7'
---

# Cosinussatsen

För att bestämma sidor och vinklar i vissa trianglar, som sinussatsen inte
klarar av, kan vi använda oss av **cosinussatsen**.

::: formel "Cosinussatsen"
I en triangel $ABC$ med sidorna $a$, $b$ och $c$ gäller

$$
\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
b^2 &= a^2 + c^2 - 2ac\cos B \\
a^2 &= b^2 + c^2 - 2bc\cos A
\end{aligned}
$$

Sidan $a$ är motstående sida till vinkel $A$, sidan $b$ är motstående sida
till vinkel $B$ och sidan $c$ är motstående sida till vinkel $C$.
:::

::: figur
<svg viewBox="-29.83 -35.49 259.11 228.85" width="259.11" height="228.85" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC. Sidan a ligger mitt emot vinkel A, sidan b mitt emot vinkel B och sidan c mitt emot vinkel C."><polygon points="66,0 0,168 198,168" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 57.96,20.48 A 22 22 0 0 0 79.59,17.3" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 8.04,147.52 A 22 22 0 0 1 22,168" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 184.41,150.7 A 22 22 0 0 0 176,168" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="63.09" y="-19.79" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-16.53" y="179.26" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="215.99" y="176.74" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="99" y="186" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="143.01" y="75.35" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="19.97" y="78.88" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

Vi bevisar sambandet för $b^2$ nedan. Vi konstruerar en godtycklig triangel
med beteckningar enligt figuren nedan, där höjden $h$ från $A$ delar sidan
$a$ i delsträckorna $x$ (närmast $B$) och $a - x$ (närmast $C$).

::: figur
<svg viewBox="-22.68 -22.92 275.36 232.04" width="275.36" height="232.04" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC med höjden h från A vinkelrätt mot sidan a. Höjdens fotpunkt delar sidan a i delsträckorna x, närmast B, och a minus x, närmast C."><polygon points="0,150 230,150 80,0" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="80" y1="0" x2="80" y2="150" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="4 3" stroke-linecap="butt"/><path d="M 70,150 L 70,140 L 80,140" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="80" y="-8" font-size="14" text-anchor="middle" fill="#1f2530">A</text><text x="-10" y="166" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="240" y="166" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="29.41" y="69.35" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="163.49" y="66.51" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="90" y="79" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">h</tspan></text><text x="40" y="166" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="155" y="166" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan> &#8722; <tspan font-style="italic">x</tspan></text><line x1="0" y1="184" x2="230" y2="184" stroke="#1f2530" stroke-width="1.2"/><polygon points="0,184 7,180.5 7,187.5" fill="#1f2530"/><polygon points="230,184 223,180.5 223,187.5" fill="#1f2530"/><line x1="0" y1="156" x2="0" y2="190" stroke="#1f2530" stroke-width="0.9" stroke-dasharray="2 2"/><line x1="230" y1="156" x2="230" y2="190" stroke="#1f2530" stroke-width="0.9" stroke-dasharray="2 2"/><text x="115" y="202" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text></svg>
:::

::: härledning "Bevis — Cosinussatsen"
Pythagoras sats i de två räta trianglarna ger

$$
c^2 = h^2 + x^2 \iff h^2 = c^2 - x^2
$$

$$
b^2 = h^2 + (a - x)^2 \iff h^2 = b^2 - (a - x)^2
$$

Eftersom båda uttrycken är lika med $h^2$ får vi

$$
c^2 - x^2 = b^2 - (a - x)^2 = b^2 - a^2 + 2ax - x^2 \iff c^2 = b^2 - a^2 + 2ax
$$

Vi löser ut $b^2$ och får

$$
b^2 = a^2 + c^2 - 2ax \qquad (1)
$$

I den räta triangeln med hypotenusan $c$ gäller

$$
\cos B = \frac{x}{c} \iff x = c\cos B
$$

Insättning av $x = c\cos B$ i (1) ger

$$
b^2 = a^2 + c^2 - 2ac\cos B
$$

v.s.b. På motsvarande sätt bevisas de två övriga formlerna.
:::

::: tips "Cosinussatsen – användning"
Cosinussatsen går att använda för trianglar med

- två sidor och mellanliggande vinkel kända,
- alla tre sidor kända och ingen vinkel känd.
:::

::: exempel "Exempel 1 — Bestäm en sida med cosinussatsen"
**Bestäm sidan $c$ i triangeln nedan.**

::: figur
<svg viewBox="-28.05 -41.72 219.93 148.49" width="219.93" height="148.49" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC där sidan a, mitt emot A, är 19 centimeter, sidan b, mitt emot B, är 17 centimeter och vinkel C mellan dem är 34 grader. Sidan c, mitt emot C, ska bestämmas."><polygon points="43.18,0 0,83.66 167.2,83.66" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 141.2,83.66 A 26 26 0 0 1 145.65,69.12" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="127.04" y="75.38" font-size="12" text-anchor="middle" fill="#1f2530">34°</text><text x="38.71" y="-17.44" font-size="14" text-anchor="middle" fill="#1f2530">A</text><text x="-15.37" y="93.02" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="179.2" y="87.66" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="7.37" y="34.49" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="113.02" y="30.22" font-size="13" text-anchor="start" fill="#1f2530">17</text><text x="83.6" y="99.66" font-size="13" text-anchor="middle" fill="#1f2530">19</text><text x="185.88" y="-27.72" font-size="12" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Två sidor och mellanliggande vinkel är kända, så vi kan använda
cosinussatsen. Cosinussatsen $c^2 = a^2 + b^2 - 2ab\cos C$ ger

$$
c^2 = 19^2 + 17^2 - 2 \cdot 19 \cdot 17\cos 34^\circ \iff c = \sqrt{19^2 + 17^2 - 2 \cdot 19 \cdot 17\cos 34^\circ} \approx 10{,}697\ldots \approx 10{,}7
$$

**Svar:** $c \approx 10{,}7$ cm
:::

::: exempel "Exempel 2 — Bestäm alla vinklar med cosinussatsen"
**Beräkna vinklarna i triangeln nedan.**

::: figur
<svg viewBox="-55.23 -36.4 195.38 132.05" width="195.38" height="132.05" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC där sidan a (BC) är 5 meter, sidan b (AC) är 7 meter och sidan c (AB) är 3,5 meter. Alla tre vinklar ska bestämmas."><polygon points="-25.85,0 0,72.53 110,72.53" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="-36.3" y="-12.12" font-size="14" text-anchor="middle" fill="#1f2530">A</text><text x="-10.37" y="87.24" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="127.46" y="76.9" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="-27.05" y="41.3" font-size="13" text-anchor="end" fill="#1f2530">3,5</text><text x="48.67" y="23.92" font-size="13" text-anchor="start" fill="#1f2530">7</text><text x="55" y="88.53" font-size="13" text-anchor="middle" fill="#1f2530">5</text><text x="134.15" y="-22.4" font-size="12" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

Alla tre sidor är kända, så vi kan använda cosinussatsen. Vi börjar med att
bestämma vinkeln $A$ och använder då den form av cosinussatsen som
innehåller $\cos A$.

$$
a^2 = b^2 + c^2 - 2bc\cos A
$$

Insättning av våra värden ger

$$
5^2 = 7^2 + 3{,}5^2 - 2 \cdot 7 \cdot 3{,}5\cos A
$$

Vi löser ut $\cos A$

$$
2 \cdot 7 \cdot 3{,}5\cos A = 7^2 + 3{,}5^2 - 5^2 \iff \cos A = \frac{7^2 + 3{,}5^2 - 5^2}{2 \cdot 7 \cdot 3{,}5}
$$

$$
A = \cos^{-1}\left(\frac{7^2 + 3{,}5^2 - 5^2}{2 \cdot 7 \cdot 3{,}5}\right) \approx 42{,}285\ldots^\circ \approx 42{,}3^\circ
$$

När en vinkel är känd kan vi bestämma ytterligare en vinkel med antingen
cosinussatsen eller sinussatsen. Vi visar båda metoderna.

**Med cosinussatsen:**

$$
b^2 = a^2 + c^2 - 2ac\cos B
$$

$$
7^2 = 5^2 + 3{,}5^2 - 2 \cdot 5 \cdot 3{,}5\cos B \iff \cos B = \frac{5^2 + 3{,}5^2 - 7^2}{2 \cdot 5 \cdot 3{,}5}
$$

$$
B = \cos^{-1}\left(\frac{5^2 + 3{,}5^2 - 7^2}{2 \cdot 5 \cdot 3{,}5}\right) \approx 109{,}615\ldots^\circ \approx 109{,}6^\circ
$$

**Med sinussatsen:**

$$
\frac{\sin B}{b} = \frac{\sin A}{a} \iff \sin B = \frac{7\sin 42{,}285\ldots^\circ}{5} \approx 0{,}941\ldots
$$

$$
B_1 = \sin^{-1}(0{,}941\ldots) \approx 70{,}385\ldots^\circ \approx 70{,}4^\circ
$$

$$
B_2 = 180^\circ - B_1 \approx 180^\circ - 70{,}4^\circ = 109{,}6^\circ
$$

Vinkeln $B_1 \approx 70{,}4^\circ$ är orimlig eftersom $\cos B$ var
negativt, vilket innebär att vinkeln $B$ är trubbig. Vi får alltså
$B \approx 109{,}6^\circ$.

Den tredje och sista vinkeln $C$ bestäms enklast med triangelns
vinkelsumma.

$$
C = 180^\circ - A - B \approx 180^\circ - 42{,}3^\circ - 109{,}6^\circ = 28{,}1^\circ
$$

**Svar:** $A \approx 42{,}3^\circ$ och $B \approx 109{,}6^\circ$ och
$C \approx 28{,}1^\circ$
:::

Observera att sinussatsens första lösning ovan gav en felaktig vinkel (den
spetsiga $B_1$). För att minska risken för slarvfel rekommenderas, om
möjligt, cosinussatsen framför sinussatsen när man ska bestämma vinklar.

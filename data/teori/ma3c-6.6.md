---
id: ma3c-6.6
title: Sinussatsen
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.6'
---

# Sinussatsen

För att bestämma sidor och vinklar i vissa trianglar kan vi använda oss av
**sinussatsen**.

::: formel "Sinussatsen"
I en triangel $ABC$ med sidorna $a$, $b$ och $c$ gäller

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}
$$

eller, alternativt (samma samband upp och ned),

$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$

Sidan $a$ är motstående sida till vinkel $A$, sidan $b$ är motstående sida
till vinkel $B$ och sidan $c$ är motstående sida till vinkel $C$.
:::

::: figur
<svg viewBox="-24 -27 230 241" width="230" height="241" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC. Sidan a ligger mitt emot vinkel A, sidan b mitt emot vinkel B och sidan c mitt emot vinkel C."><polygon points="49.82,0 0,185.92 180,185.92" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 44.12,21.25 A 22 22 0 0 0 62.44,18.02" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 5.69,164.67 A 22 22 0 0 1 22,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 167.38,167.9 A 22 22 0 0 0 158,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="46.87" y="-14.74" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-13.49" y="204.27" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="195.08" y="201.77" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="90" y="209.92" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="128.02" y="85.78" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="9.45" y="92.82" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

::: härledning "Bevis — Sinussatsen"
Vi utgår från areasatsen, som vi bevisade i föregående avsnitt, och
multiplicerar alla led med 2.

$$
\frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2} \iff ab\sin C = ac\sin B = bc\sin A
$$

Vi dividerar alla led med $abc$ och förkortar därefter.

$$
\frac{ab\sin C}{abc} = \frac{ac\sin B}{abc} = \frac{bc\sin A}{abc} \iff \frac{\sin C}{c} = \frac{\sin B}{b} = \frac{\sin A}{a}
$$

v.s.b.
:::

Sinussatsen går att använda för trianglar med

- en sida och två vinklar kända,
- två sidor och en icke-mellanliggande vinkel kända.

::: exempel "Exempel 1 — Bestäm en sida med sinussatsen"
**Bestäm sidan $a$ i triangeln nedan.**

::: figur
<svg viewBox="-26 -40 334 198" width="334" height="198" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC där vinkel B är 30 grader, vinkel C är 70 grader och sidan AC, mitt emot vinkel B, är 24 centimeter. Sidan BC, mitt emot vinkel A, ska bestämmas."><polygon points="234.37,0 0,135.32 283.62,135.32" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 17.32,125.32 A 20 20 0 0 1 20,135.32" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="33.81" y="130.26" font-size="12" text-anchor="middle" fill="#1f2530">30°</text><path d="M 276.78,116.52 A 20 20 0 0 0 263.62,135.32" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="254.95" y="119.24" font-size="12" text-anchor="middle" fill="#1f2530">70°</text><text x="239.5" y="-12.1" font-size="14" text-anchor="start" fill="#1f2530">A</text><text x="-14.49" y="143.2" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="295.91" y="151.92" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="272.15" y="66.87" font-size="12" text-anchor="middle" fill="#1f2530">24</text><text x="305.62" y="-24" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Två vinklar och en sida är kända, så vi kan använda sinussatsen. Vi måste
bara först bestämma vinkeln $A$.

$$
A = 180^\circ - 30^\circ - 70^\circ = 80^\circ \qquad \text{(vinkelsumman i en triangel)}
$$

Sinussatsen $\dfrac{a}{\sin A} = \dfrac{b}{\sin B}$ ger

$$
\frac{a}{\sin 80^\circ} = \frac{24}{\sin 30^\circ} \iff a = \frac{24\sin 80^\circ}{\sin 30^\circ} \approx 47{,}270\ldots \approx 47{,}3
$$

**Svar:** $a \approx 47{,}3$ cm
:::

::: exempel "Exempel 2 — Bestäm en vinkel med sinussatsen"
**En triangel $ABC$ har sidorna $a = 7$ cm och $b = 10$ cm. Vinkeln $B$,
mitt emot sidan $b$, är $40^\circ$. Bestäm vinkeln $A$, mitt emot sidan
$a$.**

::: figur
<svg viewBox="-24 -22 220 196" width="220" height="196" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC där sidan BC (a) är 7 centimeter, sidan AC (b) är 10 centimeter och vinkel B är 40 grader. Vinkel A, mitt emot sidan a, ska bestämmas."><polygon points="175.18,0 0,147 112,147" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 15.32,134.14 A 20 20 0 0 1 20,147" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="32.89" y="139.03" font-size="12" text-anchor="middle" fill="#1f2530">40°</text><text x="184.13" y="-10.04" font-size="14" text-anchor="start" fill="#1f2530">A</text><text x="-14.1" y="160.13" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="120.25" y="167.52" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="56" y="169" font-size="12" text-anchor="middle" fill="#1f2530">7</text><text x="156.45" y="87.03" font-size="12" text-anchor="start" fill="#1f2530">10</text></svg>
:::

Vi bestämmer vinkeln $A$ med sinussatsen.

$$
\frac{\sin A}{7} = \frac{\sin 40^\circ}{10} \iff \sin A = \frac{7\sin 40^\circ}{10} \approx 0{,}449\ldots
$$

$$
A_1 = \sin^{-1}(0{,}449\ldots) \approx 26{,}740\ldots^\circ \approx 26{,}7^\circ
$$

$$
A_2 = 180^\circ - A_1 \approx 180^\circ - 26{,}7^\circ = 153{,}3^\circ
$$

Vinkeln $A_2$ är orimlig eftersom den ger en vinkelsumma över $180^\circ$
(den ena vinkeln är redan $40^\circ$).

**Svar:** $A \approx 26{,}7^\circ$
:::

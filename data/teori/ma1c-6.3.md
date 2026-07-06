---
id: ma1c-6.3
title: Bestämma vinklar med inversa funktioner
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.3'
---

# Bestämma vinklar med inversa funktioner

Kom ihåg sedan tidigare:

::: formel "Trigonometriska funktioner"
$$
\tan v = \frac{\text{motstående katet}}{\text{närliggande katet}}
\qquad
\sin v = \frac{\text{motstående katet}}{\text{hypotenusa}}
\qquad
\cos v = \frac{\text{närliggande katet}}{\text{hypotenusa}}
$$
:::

Vi kan även beräkna vinklar i trianglar med hjälp av de trigonometriska
funktionernas **inversa funktioner**.

| Trigonometrisk funktion | Invers funktion |
| --- | --- |
| tan | tan⁻¹ ("tangens invers") eller arctan ("arcus tangens") |
| sin | sin⁻¹ ("sinus invers") eller arcsin ("arcus sinus") |
| cos | cos⁻¹ ("cosinus invers") eller arccos ("arcus cosinus") |

Alltså är t.ex. tan⁻¹ och arctan samma sak — bara olika skrivsätt. Det är
bra att känna igen båda skrivsätten!

::: formel "Inversa funktioner"
Om

$$
\tan v = \frac{a}{b}
\quad\text{gäller att}\quad
v = \tan^{-1}\left(\frac{a}{b}\right) = \arctan\left(\frac{a}{b}\right)
$$

$$
\sin v = \frac{a}{c}
\quad\text{gäller att}\quad
v = \sin^{-1}\left(\frac{a}{c}\right) = \arcsin\left(\frac{a}{c}\right)
$$

$$
\cos v = \frac{b}{c}
\quad\text{gäller att}\quad
v = \cos^{-1}\left(\frac{b}{c}\right) = \arccos\left(\frac{b}{c}\right)
$$
:::

De inversa funktionerna slås på räknare. Lär dig att slå dem!

::: exempel "Exempel 1 — Bestäm vinkeln ur cosinusvärdet"
**Bestäm vinkeln $v$ om cos $v$ = 0,753.**

$$
\cos v = 0{,}753
$$

$$
v = \cos^{-1}(0{,}753) = 41{,}149\ldots\degree \approx 41\degree
$$

**Svar:** 41°
:::

::: exempel "Exempel 2 — Bestäm triangelns alla vinklar"
**Den ena kateten i en rätvinklig triangel är 3 cm och hypotenusan är
5 cm. Bestäm triangelns vinklar med de inversa funktionerna.**

Vi ritar en skiss av triangeln och kallar de okända vinklarna $u$ och
$v$:

::: figur
<svg viewBox="34 22 226 162" width="226" height="162" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med den lodräta kateten 3 centimeter och hypotenusan 5 centimeter. Den okända vinkeln u ligger överst och den okända vinkeln v nere till höger."><polygon points="90,30 90,160 250,160" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,148.0 102.0,148.0 102.0,160.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M105.5,42.6 A20,20 0 0 1 90.0,50.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M228.0,160.0 A22,22 0 0 1 232.9,146.1" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="104" y="60" font-size="13" fill="#1f2530"><tspan font-style="italic">u</tspan></text><text x="212" y="152" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="78" y="100" font-size="13" text-anchor="end" fill="#1f2530">3 cm</text><text x="180" y="86" font-size="13" fill="#1f2530">5 cm</text></svg>
:::

Vi börjar med att bestämma vinkeln $u$. Vi har närliggande katet och
hypotenusa, så

$$
\cos u = \frac{3}{5}
$$

$$
u = \cos^{-1}\left(\frac{3}{5}\right) = 53{,}130\ldots\degree \approx 53\degree
$$

Vi vet nu två vinklar i triangeln (90° och 53°) och skulle kunna beräkna
den tredje vinkeln $v$ utifrån att vinkelsumman i en triangel är 180°.
Men vi ska beräkna vinkeln $v$ med inversa funktioner, där vi har
motstående katet och hypotenusa, så

$$
\sin v = \frac{3}{5}
$$

$$
v = \sin^{-1}\left(\frac{3}{5}\right) = 36{,}869\ldots\degree \approx 37\degree
$$

**Svar:** 90°, 53° och 37°
:::

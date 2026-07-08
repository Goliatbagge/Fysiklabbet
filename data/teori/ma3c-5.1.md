---
id: ma3c-5.1
title: Primitiva funktioner
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.1'
---

# Primitiva funktioner

Vi har i tidigare avsnitt tagit fram derivatan $f'(x)$ utifrån en
ursprunglig funktion $f(x)$. Nu ska vi göra tvärtom, det vill säga ta fram
en ursprunglig funktion $f(x)$ utifrån dess derivata $f'(x)$. En sådan
ursprunglig funktion till en annan funktion kallas **primitiv funktion**.
En primitiv funktion kallas också "baklängesderivata" eller "antiderivata".

::: tips "Skrivsätt för primitiv funktion"
Om vi har en funktion
- $f''(x)$ så skrivs den primitiva funktionen $f'(x)$
- $f'(x)$ så skrivs den primitiva funktionen $f(x)$
- $f(x)$ så skrivs den primitiva funktionen $F(x)$
:::

För en primitiv funktion $F(x)$ gäller alltså $F'(x) = f(x)$.

En primitiv funktion till $f(x) = 2x$ är alltså $F(x) = x^2$, eftersom vi
när vi deriverar $F(x) = x^2$ får derivatan $f(x) = 2x$ enligt våra
tidigare deriveringsregler. Men även $F(x) = x^2 + 7$ eller
$F(x) = x^2 - 12$ har derivatan $F'(x) = 2x$. Vi får alltså skilja på om vi
ska ange **en** primitiv funktion eller **samtliga** primitiva funktioner.

::: tips "Ange en primitiv funktion eller samtliga primitiva funktioner"
Om vi till $f(x) = 2x$ ska ange
- **en** primitiv funktion gäller: $F(x) = x^2$
- **samtliga** eller alla primitiva funktioner gäller: $F(x) = x^2 + C$, där
  $C$ är en konstant som kan stå för vilket tal som helst
:::

::: exempel "Exempel 1 — En och samtliga primitiva funktioner"
**Ange för funktionen $f(x) = 3x^2$<br>a) en primitiv funktion&emsp;&emsp;b) samtliga primitiva funktioner**

**a)** Om vi deriverar $F(x) = x^3$ så får vi $f(x) = 3x^2$ enligt
deriveringsreglerna. Alltså är $F(x) = x^3$ en primitiv funktion.

**Svar:** $F(x) = x^3$

**b)** Vi tar svaret i a-uppgiften och lägger till den generella konstanten
$C$.

**Svar:** $F(x) = x^3 + C$
:::

Ibland är det lätt att se vilken den primitiva funktionen är. Ibland är det
svårare. Då finns tre metoder som alltid fungerar beroende på om vi har en
potensfunktion, en konstant funktion eller en exponentialfunktion. I den
här kursen kommer vi bara ta fram primitiva funktioner till
exponentialfunktioner med basen $e$.

## Bestämma primitiva funktioner

::: formel "Bestämma primitiva funktioner"
| Funktion | Få en primitiv funktion (med ord) | Få en primitiv funktion (med formel) |
| --- | --- | --- |
| Potensfunktion ($x$ i basen) | Öka exponenten med 1 och dividera med den nya exponenten. | $f(x) = x^n$<br>$F(x) = \dfrac{x^{n+1}}{n+1}$ |
| Konstant funktion (ett tal) | Multiplicera konstanten med $x$. | $f(x) = k$<br>$F(x) = kx$ |
| Exponentialfunktion ($x$ i exponenten) med basen $e$ | Skriv av funktionen och dividera med koefficienten (talet) framför variabeln (oftast $x$) i exponenten. | $f(x) = e^{kx}$<br>$F(x) = \dfrac{e^{kx}}{k}$ |
:::

::: exempel "Exempel 2 — Bestäm en primitiv funktion"
**Bestäm en primitiv funktion till<br>a) $f(x) = 5$&emsp;&emsp;b) $f(x) = 14x^2 - 3$&emsp;&emsp;c) $f(x) = e^{4x}$**

**a)** Vi har en konstant funktion, så vi multiplicerar konstanten med $x$
och får $F(x) = 5x$. (Eftersom vi bara ska ta fram en primitiv funktion och
inte samtliga behöver vi inte lägga till konstanten $C$.)

**Svar:** $F(x) = 5x$

**b)** Vi har en funktion med flera termer och tar då fram en primitiv
funktion till varje term för sig. Termen $14x^2$ är en potensterm ($x$ i
basen) där vi ska öka exponenten med 1 och dividera med den nya
exponenten. Vi får då $\dfrac{14x^3}{3}$. Termen $-3$ är en konstantterm
där vi ska multiplicera den med $x$. Vi får då $-3x$. Lägger vi ihop dessa
får vi den primitiva funktionen

$$
F(x) = \frac{14x^3}{3} - 3x
$$

**Svar:** $F(x) = \dfrac{14x^3}{3} - 3x$

**c)** Vi har en exponentialfunktion ($x$ i exponenten) och ska då skriva
av funktionen och sedan dividera med koefficienten (talet) framför $x$ i
exponenten. I detta fall är koefficienten 4, så vi dividerar med 4 och får
då

$$
F(x) = \frac{e^{4x}}{4}
$$

**Svar:** $F(x) = \dfrac{e^{4x}}{4}$
:::

::: exempel "Exempel 3 — Bestäm samtliga primitiva funktioner"
**Bestäm samtliga primitiva funktioner till<br>a) $f(x) = 6x$&emsp;&emsp;b) $f(x) = 6e^{3x}$**

**a)** Vi har en potensfunktion ($x$ i basen) och ska då öka exponenten med
1 och dividera med den nya exponenten. Eftersom vi ska ha samtliga
primitiva funktioner ska vi lägga till konstanten $C$ på slutet. Vi får då

$$
F(x) = \frac{6x^2}{2} + C = 3x^2 + C
$$

**Svar:** $F(x) = 3x^2 + C$

**b)** Vi har en exponentialfunktion ($x$ i exponenten) och ska då skriva
av funktionen och dividera med koefficienten (talet) framför $x$ i
exponenten. Eftersom vi ska ha samtliga primitiva funktioner ska vi lägga
till konstanten $C$ på slutet. Vi får då

$$
F(x) = \frac{6e^{3x}}{3} + C = 2e^{3x} + C
$$

**Svar:** $F(x) = 2e^{3x} + C$
:::

---
id: ma3c-3.1
title: Derivatan av enkla potensfunktioner
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.1'
---

# Derivatan av enkla potensfunktioner

För att slippa använda derivatans definition varje gång en derivata ska
beräknas försöker vi hitta enkla **deriveringsregler**. Vi undersöker
derivatan med derivatans definition för några enkla potensfunktioner.

Kom ihåg: derivatans definition

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

::: härledning "Derivatan för $f(x) = x$ med derivatans definition"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \\
&= \lim_{h \to 0} \frac{(x+h) - x}{h} \\
&= \lim_{h \to 0} \frac{h}{h} = \lim_{h \to 0} 1 = 1
\end{aligned}
$$

Så $f(x) = x$ har derivatan $f'(x) = 1$.
:::

::: härledning "Derivatan för $f(x) = x^2$ med derivatans definition"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} \\
&= \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h} = \lim_{h \to 0} \frac{2xh + h^2}{h} \\
&= \lim_{h \to 0} \frac{h(2x + h)}{h} = \lim_{h \to 0} (2x + h) = 2x
\end{aligned}
$$

Så $f(x) = x^2$ har derivatan $f'(x) = 2x$.
:::

Fortsätter vi undersöka derivator på samma sätt för fler potensfunktioner
får vi

| $f(x)$ | $x$ | $x^2$ | $x^3$ | $x^4$ | $x^5$ |
| --- | --- | --- | --- | --- | --- |
| $f'(x)$ | $1$ | $2x$ | $3x^2$ | $4x^3$ | $5x^4$ |

Vi ser att derivatan följer ett mönster. När vi deriverar en potensfunktion
**multipliceras exponenten ned** framför samtidigt som **exponenten
minskas med 1**.

::: formel "Derivatan av $f(x) = x^n$"
$$
f(x) = x^n \quad\Rightarrow\quad f'(x) = nx^{n-1}
$$
:::

## Derivatan med en koefficient

Vi undersöker vad derivatan blir för funktioner med en koefficient framför
potensen.

::: härledning "Derivatan för $f(x) = 3x^2$ med derivatans definition"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{3(x+h)^2 - 3x^2}{h} \\
&= \lim_{h \to 0} \frac{3x^2 + 6xh + 3h^2 - 3x^2}{h} = \lim_{h \to 0} \frac{6xh + 3h^2}{h} \\
&= \lim_{h \to 0} \frac{3h(2x + h)}{h} = \lim_{h \to 0} 3(2x + h) = 3(2x + 0) = 6x
\end{aligned}
$$

Så $f(x) = 3x^2$ har derivatan $f'(x) = 6x$.
:::

Samma mönster gäller alltså fortfarande! Vi multiplicerar ned exponenten
till koefficienten framför, samtidigt som vi minskar exponenten med 1,
dvs.

$$
f(x) = 3x^2 \quad\Rightarrow\quad f'(x) = 2 \cdot 3x^{2-1} = 6x
$$

::: formel "Derivatan av $f(x) = kx^n$"
$$
f(x) = kx^n \quad\Rightarrow\quad f'(x) = nkx^{n-1}
$$
:::

En följd av denna regel är att när $x$-termer av grad 1 deriveras, så
"försvinner" $x$:et.

::: formel "Derivatan av $f(x) = kx$"
$$
f(x) = kx \quad\Rightarrow\quad f'(x) = k
$$
:::

Ytterligare en följd av regeln är att när vi deriverar funktioner med en
konstant (ett tal) i nämnaren, så deriveras täljaren enligt de vanliga
deriveringsreglerna medan **nämnaren behålls**. Det beror på att en
konstant nämnare kan ses som en koefficient — funktionen
$f(x) = \dfrac{x^2}{3}$ kan till exempel skrivas $f(x) = \dfrac{1}{3}x^2$,
och vid derivering ska koefficienten $\dfrac{1}{3}$ behållas.

::: formel "Derivatan av $f(x) = \dfrac{g(x)}{a}$"
$$
f(x) = \frac{g(x)}{a} \quad\Rightarrow\quad f'(x) = \frac{g'(x)}{a}
$$
:::

## Derivatan av konstanta funktioner

Till sist undersöker vi vad derivatan blir av konstanta funktioner, dvs.
funktioner utan någon $x$-term alls.

::: härledning "Derivatan för $f(x) = 5$ med derivatans definition"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \\
&= \lim_{h \to 0} \frac{5 - 5}{h} = \lim_{h \to 0} \frac{0}{h} = \lim_{h \to 0} 0 = 0
\end{aligned}
$$

Så $f(x) = 5$ har derivatan $f'(x) = 0$. Detta gäller oavsett vilken
konstant funktion vi har — lutningen är ju 0 för alla konstanta
funktioner, eftersom grafen är en horisontell linje.
:::

::: formel "Derivatan av $f(x) = a$"
Derivatan av en konstant funktion $f(x) = a$, där $a$ är ett tal, är

$$
f'(x) = 0
$$
:::

::: formel "Sammanfattning — deriveringsregler"
$$
\begin{array}{ll}
f(x) = x^n & f'(x) = nx^{n-1} \\[6pt]
f(x) = kx^n & f'(x) = nkx^{n-1} \\[6pt]
f(x) = kx & f'(x) = k \\[6pt]
f(x) = a & f'(x) = 0 \\[6pt]
f(x) = \dfrac{g(x)}{a} & f'(x) = \dfrac{g'(x)}{a}
\end{array}
$$
:::

::: tips "Derivera och bestämma derivatans värde i en punkt"
1. Bestäm $f'(x)$ med deriveringsreglerna.
2. Sätt sedan in $x = a$ i derivatafunktionen och bestäm $f'(a)$.
:::

::: exempel "Exempel 1 — Derivera med deriveringsreglerna"
**Derivera<br>a) $f(x) = x^7$&emsp;&emsp;b) $y = 3x^5$&emsp;&emsp;
c) $f(x) = 27$&emsp;&emsp;d) $g(x) = 12x$&emsp;&emsp;e)
$f(x) = \dfrac{x^4}{5}$**

**a)** Vi multiplicerar ned exponenten 7 och minskar den sedan med 1.

$$
f'(x) = 7x^6
$$

**Svar:** $f'(x) = 7x^6$

**b)** Vi multiplicerar ned exponenten 5 och minskar den sedan med 1.

$$
y' = 5 \cdot 3x^4 = 15x^4
$$

**Svar:** $y' = 15x^4$

**c)** Derivatan av en konstant funktion är 0.

$$
f'(x) = 0
$$

**Svar:** $f'(x) = 0$

**d)** När vi deriverar en $x$-term av grad 1 "försvinner" $x$:et.

$$
g'(x) = 12
$$

**Svar:** $g'(x) = 12$

**e)** Vi deriverar täljaren med deriveringsreglerna och behåller
nämnaren.

$$
f'(x) = \frac{4x^3}{5}
$$

**Svar:** $f'(x) = \dfrac{4x^3}{5}$
:::

::: exempel "Exempel 2 — Derivatans värde i en punkt"
**Bestäm $f'(3)$ för $f(x) = 4x^2$.**

Vi bestämmer först $f'(x)$ med deriveringsreglerna och sätter sedan in
$x = 3$ i derivatan.

$$
f'(x) = 8x
$$

$$
f'(3) = 8 \cdot 3 = 24
$$

**Svar:** $f'(3) = 24$
:::

---
id: ma3c-3.4
title: Derivatan av eˣ
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.4'
---

# Derivatan av eˣ

En funktion där variabeln, t.ex. $x$, sitter i exponenten kallas en
**exponentialfunktion** — till exempel $f(x) = 2^x$ eller mer allmänt
$f(x) = a^x$. I det här avsnittet undersöker vi derivatan av den allmänna
exponentialfunktionen $f(x) = a^x$ med hjälp av derivatans definition, och
upptäcker längs vägen varför ett särskilt tal — talet $e$ — gör derivering
av exponentialfunktioner mycket enkel.

## Härledning av derivatan för aˣ

::: härledning "Derivatan för f(x) = aˣ med derivatans definition"
$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
= \lim_{h \to 0} \frac{a^{x+h} - a^x}{h}
= \lim_{h \to 0} \frac{a^x \cdot a^h - a^x}{h}
= \lim_{h \to 0} \frac{a^x(a^h - 1)}{h}
= \lim_{h \to 0} a^x \cdot \frac{a^h - 1}{h}
$$

Eftersom $a^x$ inte beror av $h$ kan vi flytta den faktorn framför
gränsvärdet, så

$$
f'(x) = a^x \cdot \lim_{h \to 0} \frac{a^h - 1}{h}
$$

Vi kan inte förkorta bort $h$ i nämnaren, så gränsvärdet är svårt att
beräkna direkt. Vi kallar gränsvärdet $k$:

$$
\lim_{h \to 0} \frac{a^h - 1}{h} = k \quad \Longrightarrow \quad f'(x) = a^x \cdot k
$$

Vi undersöker nu värdet på $k$ genom att beräkna kvoten
$\dfrac{a^h - 1}{h}$ för några olika baser $a$, med ett värde på $h$ som
ligger väldigt nära 0.

| $\dfrac{2^h - 1}{h}$ | $\dfrac{3^h - 1}{h}$ | $\dfrac{100^h - 1}{h}$ |
| --- | --- | --- |
| 0,693… | 1,099… | 4,606… |

Gränsvärdet $k$ varierar alltså beroende på vilken bas $a$ vi har:

- $k \approx 0{,}69$ om $a = 2$
- $k \approx 1{,}10$ om $a = 3$
- $k \approx 4{,}61$ om $a = 100$

**Slutsats:** derivatan av $f(x) = a^x$ är $f'(x) = a^x \cdot k$, där $k$
varierar beroende på talet $a$.
:::

Enligt undersökningen ovan måste det finnas ett tal mellan $a = 2$ och
$a = 3$ där $k = 1$ — eftersom $k \approx 0{,}69$ när $a = 2$ och
$k \approx 1{,}10$ när $a = 3$. För det talet blir derivatan väldigt enkel!
Vi kallar detta tal $e$.

Undersök själv: dra i glidaren för $a$ i grafen nedan och se hur kurvans
branthet ändras. Runt $a \approx 2{,}7$ är kurvans lutning i punkten
$x = 0$ nära 1 — det är precis den basen vi letar efter.

::: graf
titel: f(x) = a^x
uttryck: a^x
ekvation: f(x) = {a}^x
a: 2.7, 1.2, 4, 0.1
x: -2, 2
y: -1, 8
:::

## Talet e

::: härledning "Hur stort är talet e?"
För små värden på $h$ gäller $\dfrac{e^h - 1}{h} \approx 1$. Vi kan då
skriva om uttrycket steg för steg för att lösa ut $e$.

$$
\begin{aligned}
\frac{e^h - 1}{h} &\approx 1 \\
e^h - 1 &\approx h \\
e^h &\approx h + 1 \\
e &\approx (h+1)^{1/h}
\end{aligned}
$$

Vi undersöker vad $(h+1)^{1/h}$ blir när $h$ går närmare och närmare 0.

| $h$ | 0,1 | 0,01 | 0,001 | 0,0001 | 0,00001 |
| --- | --- | --- | --- | --- | --- |
| $(h+1)^{1/h}$ | 2,5937… | 2,7048… | 2,7169… | 2,7181… | 2,7182… |

Vi ser att talet $e$ är ungefär lika med 2,72.
:::

Talet $e$ är, precis som $\pi$, ett irrationellt tal — det kan inte
skrivas som kvoten av två heltal, och har en oändlig decimalutveckling som
inte upprepar sig.

$$
e = 2{,}718\ldots \approx 2{,}72
$$

Vi hade i härledningen tidigare att funktionen $f(x) = a^x$ har derivatan
$f'(x) = a^x \cdot k$. Sätter vi in $a = e$ och $k = 1$ får vi att
funktionen $f(x) = e^x$ har derivatan

$$
f'(x) = e^x \cdot 1 = e^x
$$

Funktionen $e^x$ är alltså sin egen derivata! Grafiskt betyder det att
funktionens värde ($y$-koordinaten) i varje punkt är detsamma som kurvans
lutning där. Lutningen är 1 där $y = 1$, lutningen är 2 där $y = 2$, och så
vidare.

::: formel "Derivatan av f(x) = eˣ"
Derivatan av $f(x) = e^x$ är

$$
f'(x) = e^x
$$

Har funktionen en koefficient framför, $f(x) = ae^x$, behålls koefficienten
oförändrad vid derivering:

$$
f'(x) = ae^x
$$

där konstanten $e \approx 2{,}72$.
:::

::: exempel "Exempel 1 — Derivera exponentialfunktioner"
**Derivera<br>a) $f(x) = e^x$&emsp;&emsp;b) $f(x) = 3e^x$&emsp;&emsp;c) $f(x) = e - e^x$**

**a)** Funktionen är sin egen derivata, så

$$
f'(x) = e^x
$$

**b)** Precis som med alla andra funktioner behålls koefficienten framför
termen vid derivering. Så även här blir funktionen sin egen derivata, med
koefficienten 3 kvar:

$$
f'(x) = 3e^x
$$

**c)** Kom ihåg att $e$ är ett tal, dvs. en konstant. Deriverar vi den som
en egen term blir den 0. I övrigt deriverar vi term för term precis som
tidigare:

$$
f'(x) = 0 - e^x = -e^x
$$

**Svar:** a) $f'(x) = e^x$&emsp;&emsp;b) $f'(x) = 3e^x$&emsp;&emsp;c) $f'(x) = -e^x$
:::

::: exempel "Exempel 2 — Bestäm derivatans värde"
**Funktionen är $f(x) = \dfrac{5x^3}{3} + 3e^x$. Bestäm<br>a) $f'(0)$&emsp;&emsp;b) $f'(2)$**

Avrunda och svara med en decimal.

**a)** Vi deriverar $f(x) = \dfrac{5x^3}{3} + 3e^x$ termvis. Den
rationella termen deriverar vi med de tidigare deriveringsreglerna, och
$3e^x$ är sin egen derivata (med koefficienten 3 kvar):

$$
f'(x) = \frac{15x^2}{3} + 3e^x = 5x^2 + 3e^x
$$

Sedan sätter vi in $x = 0$. Kom ihåg att $e^0 = 1$:

$$
f'(0) = 5 \cdot 0^2 + 3e^0 = 0 + 3 \cdot 1 = 3
$$

**Svar:** $f'(0) = 3$

**b)** Från a-uppgiften har vi $f'(x) = 5x^2 + 3e^x$. Vi sätter in $x = 2$:

$$
f'(2) = 5 \cdot 2^2 + 3e^2 = 20 + 3e^2
$$

Det finns en knapp för talet $e$ på din räknare — hitta den och beräkna
$20 + 3e^2$.

$$
f'(2) = 42{,}167\ldots \approx 42{,}2
$$

**Svar:** $f'(2) \approx 42{,}2$
:::

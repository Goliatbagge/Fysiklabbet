---
id: ma3c-3.7
title: Tillämpningar av derivata med digitala hjälpmedel
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.7'
---

# Tillämpningar av derivata med digitala hjälpmedel

När vi löser en tillämpningsuppgift med deriveringsregler gör vi en
algebraisk lösning för hand. Vi kan även lösa tillämpningsuppgifter med
derivata med hjälp av digitala hjälpmedel, t.ex. Geogebra.

| Uppgift | Kommando i Geogebra |
| --- | --- |
| Bestämma funktionsvärde | $f(x) = \ldots$ och sedan t.ex. $f(3)$ |
| Derivera | $f(x) = \ldots$ och sedan $f'(x)$ |
| Bestämma derivatans värde | $f(x) = \ldots$ och sedan t.ex. $f'(3)$ |
| Lösa ekvationer numeriskt (skriver ut decimaler) | NLös(Ekvation) |
| Lösa ekvationer exakt (skriver ut symboler) | Lös(Ekvation) |

Vi har sedan tidigare visat att en exponentialfunktion kan skrivas på
formen $y = C \cdot a^x$ där $C$ står för funktionens startvärde och $a$
för förändringsfaktorn. Vi kan även skriva exponentialfunktioner med
basen $e$ för att underlätta vid derivering.

::: formel "Exponentialfunktioner med basen e"
$$
y = Ce^{kx}
$$

där $e^k = a$ (förändringsfaktorn).
:::

## Lösa tillämpningsuppgifter med Geogebra

::: exempel "Exempel 1 — Tillväxthastighet hos en kaninpopulation"
**Antalet kaniner $N(t)$ i en population ges av
$N(t) = 30 \cdot 1{,}84^t$ där $t$ är tiden räknat i veckor.<br>a)
Beräkna tillväxthastigheten efter 4 veckor.&emsp;&emsp;b) Efter hur lång
tid är tillväxthastigheten 100 kaniner/vecka?**

**a)** Tillväxthastigheten efter 4 veckor motsvaras av $N'(4)$. Vi
definierar funktionen genom att skriva in $N(t) = 30 \cdot 1{,}84^t$ i
Geogebras inmatningsfält. Därefter skriver vi $N'(4)$ på raden under och
läser av värdet:

$$
N'(4) \approx 209{,}67925
$$

Vi ser att $N'(4) \approx 210$.

**Svar:** Populationen ökar med cirka 210 kaniner/vecka efter 4 veckor.

**b)** Tillväxthastigheten 100 kaniner/vecka motsvaras av $N'(t) = 100$.
Vi skriver NLös(N'(t) = 100) i Geogebras inmatningsfält för att lösa ut
tiden och får

$$
t \approx 2{,}78575
$$

vilket avrundas till $t \approx 2{,}8$.

**Svar:** Efter cirka 2,8 veckor.
:::

::: exempel "Exempel 2 — Minsta lutning hos en funktion"
**För vilket värde på $x$ har funktionen $f(x) = x^3 - 3x^2 - 4x$ sin
minsta lutning?**

Kom ihåg att en grafs lutning är detsamma som derivatan till
funktionen. Vi ska alltså bestämma när derivatan $f'(x)$ är som minst.

Vi definierar $f(x) = x^3 - 3x^2 - 4x$ i Geogebra och tar sedan fram
$f'(x)$:

$$
f'(x) = 3x^2 - 6x - 4
$$

Derivatan $f'(x)$ är i sig en andragradsfunktion vars graf är en
parabel som öppnar uppåt, med ett minsta värde i sin minimipunkt. Vi
studerar grafen till $f'(x)$ i Geogebra och använder verktyget
*Extrempunkt* för att ta fram minimipunkten. Den ligger vid $x = 1$.

Vi ser att $f'(x)$ har sitt lägsta värde då $x = 1$, dvs. det är där
funktionen $f(x)$ har sin minsta lutning.

**Svar:** $x = 1$
:::

## Ställa upp exponentialmodeller med basen e

::: exempel "Exempel 3 — Kattungens vikt som exponentialmodell"
**En kattunge väger 100 gram och ökar sin vikt med 5 % per dag under
den första månaden. Ställ upp en exponentialfunktion med basen $e$ för
kattungens vikt $V$ i gram som funktion av tiden $t$ dagar.**

Vi har ett exponentiellt samband, som vi kan skriva på formen
$y = C \cdot a^x$, där $C$ är startvärdet (100 gram) och $a$ är
förändringsfaktorn (1,05, eftersom vikten ökar med 5 % per dag). Detta
ger

$$
V(t) = 100 \cdot 1{,}05^t
$$

Vi ska skriva om det exponentiella sambandet med basen $e$, dvs. på
formen $y = Ce^{kx}$. Detta ger

$$
V(t) = 100 \cdot e^{kt} \qquad (1)
$$

Vi ska nu bestämma koefficienten $k$. Vi jämför de två uttrycken för
$V(t)$:

$$
100 \cdot 1{,}05^t = 100 \cdot e^{kt}
$$

Vi ser då att

$$
e^k = 1{,}05
$$

Vi löser ekvationen genom att logaritmera båda leden och lösa ut $k$.

$$
\begin{aligned}
\ln e^k &= \ln 1{,}05 \\
k \cdot \ln e &= \ln 1{,}05
\end{aligned}
$$

Eftersom $\ln e = 1$ blir

$$
k = \ln 1{,}05 \approx 0{,}04879
$$

Insättning av $k \approx 0{,}04879$ i (1) ger

$$
V(t) = 100 \cdot e^{0{,}04879t}
$$

**Svar:** $V(t) = 100 \cdot e^{0{,}04879t}$
:::

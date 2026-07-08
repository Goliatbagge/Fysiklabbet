---
id: ma3c-5.2
title: Primitiva funktioner med villkor
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.2'
---

# Primitiva funktioner med villkor

Vi har tidigare tagit fram samtliga primitiva funktioner till en funktion
genom att lägga till en konstant $C$ till funktionsuttrycket. Om vi har
någon ytterligare information om den primitiva funktionen — ett så kallat
**villkor** — kan vi bestämma denna konstant genom att sätta in villkoret i
den primitiva funktionen.

Att ta fram en primitiv funktion kallas att **integrera**. Motsatsen till
"att derivera" är alltså "att integrera".

Vid tillämpningar av derivata har vi konstaterat att om vi deriverar en
sträcka $s(t)$ får vi en hastighet $v(t)$, och deriverar vi hastigheten
$v(t)$ får vi en acceleration $a(t)$. Bakvägen gäller då att om vi
**integrerar** en hastighet $v(t)$ får vi en sträcka $s(t)$, och integrerar
vi en acceleration $a(t)$ får vi en hastighet $v(t)$.

::: formel "Samband mellan sträcka, hastighet och acceleration"
Vid tillämpningar hänger sträckan $s(t)$, hastigheten $v(t)$ och
accelerationen $a(t)$ ihop genom derivering och integrering:

$$
s(t) \xrightarrow{\ \text{derivera}\ } v(t) \xrightarrow{\ \text{derivera}\ } a(t)
$$

$$
a(t) \xrightarrow{\ \text{integrera}\ } v(t) \xrightarrow{\ \text{integrera}\ } s(t)
$$

Deriverar vi en sträcka $s(t)$ två gånger får vi alltså direkt en
acceleration $a(t)$. Omvänt ger integrering av en acceleration en hastighet,
och integrering av en hastighet en sträcka.
:::

## Bestäm konstanten C med ett villkor

::: exempel "Exempel 1 — Bestäm konstanten C med ett villkor"
**Bestäm den primitiva funktionen till $f(x) = x^3 + 12x$ som uppfyller
villkoret $F(1) = 7$.**

Vi börjar med att ta fram samtliga primitiva funktioner till $f(x)$. Båda
termerna är potenstermer ($x$ i basen), så vi tar fram primitiva funktioner
för dem båda genom att öka exponenten med 1 och sedan dividera med den nya
exponenten. Detta ger

$$
F(x) = \frac{x^4}{4} + \frac{12x^2}{2} + C \quad \Longleftrightarrow \quad F(x) = \frac{x^4}{4} + 6x^2 + C \qquad (1)
$$

Därefter utnyttjar vi villkoret $F(1) = 7$, det vill säga vi sätter in
$x = 1$ i den primitiva funktionen som då ska vara lika med 7.

$$
\frac{1^4}{4} + 6 \cdot 1^2 + C = 7
$$

$$
\frac{1}{4} + 6 + C = 7
$$

$$
6{,}25 + C = 7
$$

$$
6{,}25 + C - 6{,}25 = 7 - 6{,}25
$$

$$
C = 0{,}75
$$

Vi vet nu att $C = 0{,}75$. Sätter vi in detta i formel (1) för samtliga
primitiva funktioner får vi

$$
F(x) = \frac{x^4}{4} + 6x^2 + 0{,}75
$$

**Svar:** $F(x) = \dfrac{x^4}{4} + 6x^2 + 0{,}75$
:::

## Tillämpning: sträcka ur en hastighetsfunktion

::: exempel "Exempel 2 — Sträcka ur en hastighetsfunktion"
**Hastigheten $v(t)$ m/s för en bil som accelererar är $v(t) = 1{,}2t^2$,
där $t$ är tiden i sekunder från start. Hur lång sträcka rör sig bilen de
första 10 sekunderna?**

Vi har funktionen för hastigheten $v(t)$ och ska ta reda på sträckan $s(t)$.
Alltså ska vi **integrera** (ta fram en primitiv funktion) för att få fram
formeln för sträckan. Detta ger

$$
s(t) = \frac{1{,}2t^3}{3} + C
$$

Vi förenklar och får

$$
s(t) = 0{,}4t^3 + C \qquad (1)
$$

Eftersom sträckan som bilen rört sig från början är 0 gäller $s(0) = 0$,
vilket ger

$$
0{,}4 \cdot 0^3 + C = 0 \quad \Longrightarrow \quad C = 0
$$

Detta i (1) ger formeln för sträckan, som då blir

$$
s(t) = 0{,}4t^3
$$

Eftersom vi ska ha sträckan bilen rör sig de första 10 sekunderna ska vi
beräkna $s(10)$. Vi sätter in $t = 10$ i formeln för sträckan och får då

$$
s(10) = 0{,}4 \cdot 10^3 = 0{,}4 \cdot 1000 = 400
$$

Eftersom hastigheten är angiven i meter/sekund blir sträckan i meter.

**Svar:** $400$ meter
:::

---
id: ma1c-4.5
title: Räta linjens ekvation
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.5'
---

# Räta linjens ekvation

Sedan tidigare har vi tagit fram räta linjens ekvation i k-form. **R**äta
**l**injens **e**kvation förkortas ibland RLE.

::: formel "Räta linjens ekvation (i k-form)"
$$
y = kx + m
$$
:::

$k$-värdet motsvarar linjens lutning. Sedan tidigare har vi

$$
k = \frac{\text{trappstegets höjd}}{\text{trappstegets längd}}
= \frac{\text{förändring i } y\text{-led}}{\text{förändring i } x\text{-led}}
= \frac{\Delta y}{\Delta x} \quad (1)
$$

Undersök själv: i grafen nedan har trappsteget längden $\Delta x = 1$, så
trappstegets höjd är precis $\Delta y = k$. Dra i reglagen och se hur
trappsteget följer linjens lutning.

::: graf
titel: y = kx + m
uttryck: k*x + m
ekvation: y = {k}x + {m}
lutningstriangel: ja
k: 0.5, -4, 4, 0.5
m: 2, -5, 5, 1
x: -6, 6
y: -6, 6
:::

Om vi vill beräkna $k$-värdet utifrån två punkter på linjen $(x_1, y_1)$
och $(x_2, y_2)$ utan att rita upp den kan vi göra det med en annan
formel. Förändringen i *y*-led $\Delta y$ fås av differensen mellan två
*y*-koordinater, det vill säga

$$
\Delta y = y_2 - y_1
$$

På motsvarande sätt gäller

$$
\Delta x = x_2 - x_1
$$

Insättning av dessa i (1), $k = \dfrac{\Delta y}{\Delta x}$, ger formeln
för riktningskoefficienten.

::: formel "Riktningskoefficient"
$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$
:::

::: exempel "Exempel 1 — Riktningskoefficient ur två punkter"
**Beräkna riktningskoefficienten för linjen som går genom punkterna
(−6, −1) och (2, 3).**

::: handskrift
typ: tvapunkter
:::

::: textlosning
Vi ställer upp formeln för riktningskoefficienten:

$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$

Den första punkten är $(x_1, y_1) = (-6, -1)$ och den andra är
$(x_2, y_2) = (2, 3)$. Insättning i formeln ovan ger

$$
k = \frac{3 - (-1)}{2 - (-6)} = \frac{3 + 1}{2 + 6} = \frac{4}{8} = \frac{1}{2}
$$

**Svar:** $k = \dfrac{1}{2}$ eller 0,5
:::
:::

## Enpunktsform

Känner vi riktningskoefficienten $k$ och en punkt $(x_1, y_1)$ på linjen
kan vi skriva linjens ekvation direkt, utan att först räkna ut $m$. Den
formen kallas **enpunktsform**.

::: formel "Räta linjens ekvation på enpunktsform"
$$
y - y_1 = k(x - x_1)
$$

där $k$ är linjens riktningskoefficient och $(x_1, y_1)$ är en punkt på
linjen.

::: härledning "Härledning — enpunktsform"
Låt $(x, y)$ vara en punkt på linjen, vilken som helst. Riktningskoefficienten
mellan den och den kända punkten $(x_1, y_1)$ är

$$
k = \frac{y - y_1}{x - x_1}
$$

Vi multiplicerar båda led med $(x - x_1)$:

$$
k(x - x_1) = y - y_1
$$

Byter vi plats på leden får vi enpunktsformen, $y - y_1 = k(x - x_1)$.
:::
:::

Enpunktsformen är bra när uppgiften ger en punkt och lutningen. Vi sätter
bara in tre tal och har ekvationen klar, utan någon ekvation att lösa för
$m$. Ger uppgiften i stället två punkter räknar vi först ut $k$ och sätter
sedan in en av punkterna. Behöver vi linjen på *k*-form, $y = kx + m$, löser
vi ut $y$ ur enpunktsformen.

::: exempel "Exempel 2 — Bestäm ekvationen ur punkt och lutning"
**En rät linje går genom punkten (4, −3) och har riktningskoefficienten 2.<br>a) Bestäm linjens ekvation på *k*-form.<br>b) Skriv linjens ekvation på enpunktsform.**

::: handskrift
typ: punktlutning
:::

::: textlosning
**a)** Vi ställer upp räta linjens ekvation:

$$
y = kx + m
$$

Vi sätter in $k = 2$, vilket ger

$$
y = 2x + m
$$

För att ta reda på $m$-värdet sätter vi in en valfri punkt som ligger på
linjen, i detta fall (4, −3). Vi sätter in $x = 4$ och $y = -3$ i formeln
ovan och löser ut $m$:

$$
-3 = 2 \cdot 4 + m
$$

$$
-3 = 8 + m
$$

Subtraherar 8 från båda led:

$$
-3 - 8 = 8 + m - 8
$$

$$
-11 = m
$$

Insättning av $k = 2$ och $m = -11$ i RLE ger $y = 2x - 11$.

**Svar:** $y = 2x - 11$

**b)** Vi ställer upp enpunktsformen:

$$
y - y_1 = k(x - x_1)
$$

Punkten är $(x_1, y_1) = (4, -3)$ och $k = 2$. Insättning i
$y - y_1 = k(x - x_1)$ ger

$$
y - (-3) = 2(x - 4)
$$

Minus framför ett negativt tal blir plus:

$$
y + 3 = 2(x - 4)
$$

**Svar:** $y + 3 = 2(x - 4)$
:::
:::

::: exempel "Exempel 3 — Bestäm a ur riktningskoefficienten"
**En rät linje går genom punkterna $(a, 2)$ och $(4, 3a)$ och har
riktningskoefficienten 2. Bestäm $a$.**

::: handskrift
typ: avariabel
:::

::: textlosning
Koordinaterna innehåller den okända variabeln $a$, men vi gör precis som
förut. Vi kallar punkterna $(x_1, y_1) = (a, 2)$ och
$(x_2, y_2) = (4, 3a)$ och sätter in koordinaterna i formeln för
riktningskoefficienten:

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{3a - 2}{4 - a}
$$

Riktningskoefficienten ska vara 2, så $k = 2$ ger

$$
2 = \frac{3a - 2}{4 - a}
$$

Nämnaren får inte vara 0, så $a$ kan inte vara 4. Vi multiplicerar båda
led med $(4 - a)$:

$$
2 \cdot (4 - a) = \frac{3a - 2}{4 - a} \cdot (4 - a)
$$

$$
2(4 - a) = 3a - 2
$$

$$
8 - 2a = 3a - 2
$$

Adderar $2a$ till båda led:

$$
8 - 2a + 2a = 3a - 2 + 2a
$$

$$
8 = 5a - 2
$$

Adderar 2 till båda led:

$$
8 + 2 = 5a - 2 + 2
$$

$$
10 = 5a
$$

Dividerar båda led med 5:

$$
\frac{10}{5} = \frac{5a}{5}
$$

$$
2 = a
$$

**Kontroll:** Med $a = 2$ blir punkterna (2, 2) och (4, 6), och

$$
k = \frac{6 - 2}{4 - 2} = \frac{4}{2} = 2
$$

vilket stämmer.

**Svar:** $a = 2$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Räta linjens ekvation (RLE)"
- $y = kx + m$
- $k$ är lutningen, $m$ är skärningen med *y*-axeln.
:::

::: sampunkt "k ur två punkter"
- $k = \dfrac{y_2 - y_1}{x_2 - x_1}$
- Kommer av $\dfrac{\Delta y}{\Delta x}$ med
  $\Delta y = y_2 - y_1$ och $\Delta x = x_2 - x_1$.
- **Samma ordning i täljare och nämnare.** Byter du ordning i den ena
  måste du byta i den andra.
:::

::: sampunkt "Ekvation ur punkt och lutning"
1. Sätt in $k$ i $y = kx + m$.
2. Sätt in punktens koordinater.
3. Lös ut $m$.
- Punkten $(4, -3)$ med $k = 2$ ger
  $-3 = 2 \cdot 4 + m$, alltså $m = -11$.
:::

::: sampunkt "Ekvation ur två punkter"
1. Räkna ut $k$ med formeln.
2. Sätt in en av punkterna och lös ut $m$.
3. Kontrollera med den **andra** punkten.
:::

::: sampunkt "Enpunktsform"
- $y - y_1 = k(x - x_1)$
- Punkt och lutning ger ekvationen direkt, utan att $m$ räknas ut.
- Punkten $(4, -3)$ med $k = 2$ ger $y + 3 = 2(x - 4)$.
:::
:::

---
id: ma1c-4.5
title: Räta linjens ekvation
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.5'
---

# Räta linjens ekvation

Sedan tidigare har vi tagit fram räta linjens ekvation i k-form. Räta
linjens ekvation förkortas ibland RLE.

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
*y*-koordinater, dvs.

$$
\Delta y = y_2 - y_1
$$

På motsvarande sätt gäller

$$
\Delta x = x_2 - x_1
$$

Insättning av dessa i (1) ger formeln för riktningskoefficienten.

::: formel "Riktningskoefficient"
$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$
:::

::: exempel "Exempel 1 — Riktningskoefficient ur två punkter"
**Beräkna riktningskoefficienten för linjen som går genom punkterna
(−6, −1) och (2, 3).**

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

::: exempel "Exempel 2 — Bestäm ekvationen ur punkt och lutning"
**Bestäm ekvationen för den räta linjen som går genom punkten (4, −3) och
har riktningskoefficienten 2.**

Vi ställer upp räta linjens ekvation:

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
:::

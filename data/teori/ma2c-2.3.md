---
id: ma2c-2.3
title: Nollproduktmetoden
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.3'
---

# Nollproduktmetoden

Ekvationer som innehåller $x^2$-termer **och** $x$-termer kan vi inte
lösa med vår vanliga metod. Dessa ekvationer, samt ekvationer där en
produkt (multiplikation) är lika med 0, löser vi med
**nollproduktmetoden**.

Principen för nollproduktmetoden är att om vi har en multiplikation som
ska vara lika med 0, så **måste** någon av faktorerna (delarna i
multiplikationen) vara lika med 0. Det går inte att multiplicera två
tal, så att de blir lika med 0, om inte något av talen är 0.

Lösningen till en ekvation kallas också för **rot**.

::: tips "Nollproduktmetoden"
1. Ändra så att högra ledet blir lika med 0.
2. Faktorisera det vänstra ledet.
3. Sätt varje faktor lika med 0 och lös.
:::

::: exempel "Exempel 1 — Lös ekvationerna"
**Lös ekvationerna<br>a) $x^2 - 12x = 0$&emsp;&emsp;b) $x^2 + 5x = 0$&emsp;&emsp;c) $(x - 7)(x + 3) = 0$&emsp;&emsp;d) $14x^2 = 21x$**

**a)** Vi har en ekvation med både $x^2$-termer och $x$-termer. Den är
lika med 0. Då börjar vi med att faktorisera vänstra ledet. Vi bryter
ut $x$:

$$
x(x - 12) = 0
$$

Nu har vi skrivit det vänstra ledet som en produkt (multiplikation). Om
en produkt är lika med 0 måste en faktor vara 0. Så

$$
x = 0 \quad \text{eller} \quad x - 12 = 0
$$

Så $x = 0$ är en lösning. Vi beräknar den andra lösningen också:

$$
x - 12 = 0 \iff x = 12
$$

Vi får alltså två lösningar: $x_1 = 0$ och $x_2 = 12$.

**Svar:** $x_1 = 0$ och $x_2 = 12$

**b)** Vi har en ekvation med både $x^2$-termer och en $x$-term, så vi
bryter ut $x$:

$$
x(x + 5) = 0
$$

Nollproduktmetoden ger

$$
x = 0 \quad \text{eller} \quad x + 5 = 0
$$

Den andra ekvationen ger $x = -5$.

**Svar:** $x_1 = 0$ och $x_2 = -5$

**c)** Det vänstra ledet är redan faktoriserat och lika med 0.
Nollproduktmetoden ger

$$
x - 7 = 0 \iff x = 7
$$

eller

$$
x + 3 = 0 \iff x = -3
$$

**Svar:** $x_1 = 7$ och $x_2 = -3$

**d)** Vi har en ekvation med både $x^2$-termer och $x$-termer (det
spelar ingen roll att de är på olika sidor om likhetstecknet). Vi
börjar med att göra om så att det högra ledet blir 0, genom att
subtrahera $21x$ från båda led:

$$
14x^2 - 21x = 0
$$

Därefter faktoriserar vi det vänstra ledet och löser ekvationen som
vanligt.

$$
7x(2x - 3) = 0
$$

(Det går även att bryta ut bara $x$, men helst största möjliga faktor.)

Nollproduktmetoden ger

$$
7x = 0 \iff x = 0
$$

eller

$$
2x - 3 = 0 \iff 2x = 3 \iff x = \frac{3}{2}
$$

**Svar:** $x_1 = 0$ och $x_2 = \dfrac{3}{2}$
:::

::: exempel "Exempel 2 — Konstruera en ekvation med givna rötter"
**Ange en ekvation med rötterna $x_1 = 3$ och $x_2 = -10$.**

Vi ska konstruera en ekvation med rötterna (lösningarna) $x = 3$ och
$x = -10$. Detta kan vi enkelt göra med nollproduktmetoden baklänges!
Om vi sätter ekvationen lika med 0, så måste faktorerna $(x - 3)$ och
$(x + 10)$ finnas med eftersom när vi sätter in $x = 3$ och $x = -10$ i
dessa så blir de 0. Vi kan se det som att vi sätter in lösningarna fast
med ombytt tecken i parenteserna.

En ekvation skulle alltså kunna vara

$$
(x - 3)(x + 10) = 0
$$

(Vi ser med en snabb kontroll att $x = 3$ gör att första faktorn blir 0
och $x = -10$ gör att andra faktorn blir 0 och därmed gör att hela
vänstra ledet blir lika med 0.)

**Svar:** $(x - 3)(x + 10) = 0$
:::

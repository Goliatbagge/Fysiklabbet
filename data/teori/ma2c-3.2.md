---
id: ma2c-3.2
title: Andragradsekvationer och andragradsfunktioner
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.2'
---

# Andragradsekvationer och andragradsfunktioner

I förra avsnittet bestämde vi en andragradsfunktions nollställen,
extrempunkt och symmetrilinje grafiskt. Vi ska nu bestämma dem
**algebraiskt**.

::: tips "Bestämma nollställen, symmetrilinje och extrempunkt algebraiskt"
Algebraiskt bestäms en andragradsfunktions

- **nollställen** genom att sätta funktionen lika med 0 och lösa den.
  Lösningarna ger nollställena.
- **symmetrilinje** genom medelvärdet av nollställena. Om nollställen
  saknas kan symmetrilinjen fås av "talet framför rottecknet" i
  *pq*-formeln, dvs. $x_s = -\dfrac{p}{2}$.
- **extrempunkt** genom att sätta in symmetrilinjens $x$-koordinat i
  funktionsuttrycket. Symmetrilinjen ger extrempunktens $x$-koordinat
  och funktionsuttryckets värde ger extrempunktens $y$-koordinat.
:::

::: exempel "Exempel 1 — Bestäm allt algebraiskt"
**Vi har funktionen $f(x) = 3x^2 - 12x + 9$. Ange funktionens<br>a) nollställen&emsp;&emsp;b) symmetrilinje&emsp;&emsp;c) extrempunkt&emsp;&emsp;d) extrempunkts karaktär&emsp;&emsp;e) största eller minsta värde**

**a)** Vi bestämmer nollställena genom att sätta funktionsuttrycket
lika med 0 och lösa ekvationen:

$$
3x^2 - 12x + 9 = 0
$$

Vi dividerar båda led med 3 och löser sedan ekvationen med *pq*-formeln:

$$
x^2 - 4x + 3 = 0
$$

$$
x = 2 \pm \sqrt{2^2 - 3} = 2 \pm \sqrt{1} = 2 \pm 1
$$

$$
x_1 = 2 - 1 = 1
$$

$$
x_2 = 2 + 1 = 3
$$

**Svar:** $x = 1$ och $x = 3$

**b)** Symmetrilinjen ligger mitt emellan nollställena, vilket
motsvarar deras medelvärde:

$$
x_s = \frac{1 + 3}{2} = \frac{4}{2} = 2
$$

**Svar:** $x_s = 2$

**c)** Extrempunkten ligger på symmetrilinjen och har alltså samma
$x$-koordinat, dvs. $x = 2$. Insättning av $x = 2$ i funktionen
$f(x) = 3x^2 - 12x + 9$ ger

$$
f(2) = 3 \cdot 2^2 - 12 \cdot 2 + 9 = 12 - 24 + 9 = -3
$$

Extrempunktens $y$-koordinat är alltså −3. Sammanfattningsvis är alltså
extrempunktens fullständiga koordinater (2, −3).

**Svar:** (2, −3)

**d)** Extrempunktens karaktär avgörs av tecknet framför $x^2$-termen.
I det här fallet har vi funktionen $f(x) = 3x^2 - 12x + 9$ som har en
**positiv** $x^2$-term (vi tänker oss då en kurva med "glad mun").
Kurvan har alltså en "dal", vilket ger oss att det är en minimipunkt.

**Svar:** Minimipunkt

**e)** Eftersom funktionen har en minimipunkt har den ett **minsta
värde**. Det minsta värdet motsvarar $y$-koordinaten i extrempunkten
(största eller minsta värdet ligger alltid i extrempunkten). Vi har
tidigare tagit fram extrempunkten som (2, −3). Det minsta värdet är
alltså −3.

**Svar:** −3
:::

::: exempel "Exempel 2 — Symmetrilinje utan nollställen"
**Bestäm symmetrilinjen till $f(x) = x^2 + 6x + 10$.**

Vi börjar med att ta reda på funktionens nollställen genom att sätta
funktionsuttrycket lika med 0 och lösa ekvationen:

$$
x^2 + 6x + 10 = 0
$$

$$
x = -3 \pm \sqrt{3^2 - 10} = -3 \pm \sqrt{9 - 10} = -3 \pm \sqrt{-1}
$$

Denna ekvation saknar lösning eftersom kvadratroten ur negativa tal
saknar reella lösningar. Funktionen saknar alltså nollställen (grafiskt
betyder det att hela grafen ligger ovanför eller under $x$-axeln).

Vi kan ändå bestämma symmetrilinjens ekvation som "talet framför
rottecknet" i *pq*-formeln. I detta fall är det −3. Alltså är
symmetrilinjens ekvation $x_s = -3$.

**Svar:** $x_s = -3$
:::

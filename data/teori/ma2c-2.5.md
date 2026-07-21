---
id: ma2c-2.5
title: abc-formeln
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.5'
---

# abc-formeln

Det finns ytterligare en formel för att lösa fullständiga
andragradsekvationer på formen $ax^2 + bx + c = 0$ som kallas
**abc-formeln**. Till skillnad från pq-formeln behöver inte
koefficienten framför $x^2$-termen "divideras bort" innan formeln
används.

::: formel "abc-formeln"
$$
ax^2 + bx + c = 0
$$

har lösningarna

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$
:::

::: härledning "Härledning — abc-formeln"
Vi utgår från ekvationen

$$
ax^2 + bx + c = 0
$$

där $a \neq 0$. Vi dividerar båda led med $a$ så att ekvationen får
den form som pq-formeln kräver:

$$
x^2 + \frac{b}{a}x + \frac{c}{a} = 0
$$

Nu kan vi använda pq-formeln (som vi härledde i förra avsnittet) med
$p = \dfrac{b}{a}$ och $q = \dfrac{c}{a}$:

$$
x = -\frac{b}{2a} \pm \sqrt{\left(\frac{b}{2a}\right)^2 - \frac{c}{a}}
$$

Vi skriver om uttrycket under rottecknet med gemensam nämnare $4a^2$:

$$
\left(\frac{b}{2a}\right)^2 - \frac{c}{a} = \frac{b^2}{4a^2} - \frac{4ac}{4a^2} = \frac{b^2 - 4ac}{4a^2}
$$

Vi drar roten ur täljare och nämnare var för sig. Eftersom
$\sqrt{4a^2} = 2a$ (tecknet på $a$ spelar ingen roll — det fångas av
$\pm$) får vi

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

v.s.b.
:::

::: exempel "Exempel 1 — Lös med abc-formeln"
**Lös ekvationen $2x^2 - 8x + 6 = 0$ med abc-formeln.**

Vi ställer upp abc-formeln:

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

Vi identifierar $a$, $b$ och $c$ och ser att $a = 2$, $b = -8$ och
$c = 6$. Insättning i abc-formeln ger

$$
x = -\frac{-8}{2 \cdot 2} \pm \frac{\sqrt{(-8)^2 - 4 \cdot 2 \cdot 6}}{2 \cdot 2}
$$

$$
x = \frac{8}{4} \pm \frac{\sqrt{64 - 48}}{4}
$$

$$
x = 2 \pm \frac{\sqrt{16}}{4} = 2 \pm \frac{4}{4} = 2 \pm 1
$$

Detta ger lösningarna

$$
x_1 = 2 - 1 = 1
$$

$$
x_2 = 2 + 1 = 3
$$

**Svar:** $x_1 = 1$ och $x_2 = 3$
:::

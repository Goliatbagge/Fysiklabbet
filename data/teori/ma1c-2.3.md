---
id: ma1c-2.3
title: Multiplicera med parenteser
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.3'
---

# Multiplicera med parenteser

Om vi har ett parentesuttryck med en faktor framför kan vi **multiplicera
in** faktorn i parentesen. Att skriva om ett uttryck, så att det står utan
parenteser kallas att **utveckla** uttrycket. Faktorn framför parentesen
ska multipliceras med *varje term* inuti parentesen. Denna regel kallas
**distributiva lagen**.

::: formel "Distributiva lagen"
$$
a(b + c) = ab + ac
$$
:::

::: härledning "Kontroll — Distributiva lagen"
Vi kontrollerar om den distributiva lagen gäller med de räkneregler vi vet
sedan tidigare. Vi beräknar t.ex. $3 \cdot (9 - 4)$ på två olika sätt.

**Med prioriteringsreglerna:**

$$
3 \cdot (9 - 4) = 3 \cdot 5 = 15
$$

**Med distributiva lagen:**

$$
3 \cdot (9 - 4) = 3 \cdot 9 - 3 \cdot 4 = 27 - 12 = 15
$$

Vi får samma svar med distributiva lagen som med prioriteringsreglerna!
Regeln verkar stämma.
:::

::: exempel "Exempel 1 — Multiplicera in i parentesen"
**Förenkla<br>a) $2(2x - 1)$&emsp;&emsp;b) $8(3x + 4) - 2(5x - 7)$**

**a)** Faktorn 2 multipliceras med varje term i parentesen:

$$
2(2x - 1) = 2 \cdot 2x - 2 \cdot 1 = 4x - 2
$$

**Svar:** $4x - 2$

**b)** Vi multiplicerar in 8:an, men har först kvar parentesen efter 2:an:

$$
8(3x + 4) - 2(5x - 7) = 8 \cdot 3x + 8 \cdot 4 - (2 \cdot 5x - 2 \cdot 7)
= 24x + 32 - (10x - 14)
$$

Tar bort parentesen och *ändrar tecken*:

$$
24x + 32 - 10x + 14 = 14x + 46
$$

**Svar:** $14x + 46$
:::

När två parentespar multipliceras med varandra ska den **första termen** i
den **första parentesen** multipliceras med **alla termer i den andra
parentesen**. Därefter ska den **andra termen** i den **första parentesen**
multipliceras med **alla termer i den andra parentesen**. Om det är fler än
två termer i den första parentesen fortsätter man likadant tills man har
multiplicerat in alla termer i den första parentesen in i den andra.

::: formel "Multiplicera parenteser"
::: figur
<svg viewBox="16 0 336 56" width="336" height="56" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Parentesen a plus b gånger parentesen c plus d. Bågar visar att a multipliceras med c och med d, och att b multipliceras med c och med d. Resultatet är a gånger c plus a gånger d plus b gånger c plus b gånger d."><text x="24" y="46" font-size="15" fill="#1f2530">(</text><text x="31" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="46" y="46" font-size="15" fill="#1f2530">+</text><text x="62" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="72" y="46" font-size="15" fill="#1f2530">)(</text><text x="88" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="102" y="46" font-size="15" fill="#1f2530">+</text><text x="118" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">d</tspan></text><text x="128" y="46" font-size="15" fill="#1f2530">)</text><path d="M35,31 C45,12 81,12 91,29" fill="none" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(91,29) rotate(58)" fill="#c8324a"/><path d="M35,31 C57,2 113,2 123,29" fill="none" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(123,29) rotate(50)" fill="#c8324a"/><path d="M67,31 C75,17 87,17 95,29" fill="none" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(95,29) rotate(52)" fill="#2563c9"/><path d="M67,31 C85,8 117,8 127,29" fill="none" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(127,29) rotate(55)" fill="#2563c9"/><text x="346" y="46" font-size="15" text-anchor="end" fill="#1f2530">= <tspan font-style="italic">a</tspan> · <tspan font-style="italic">c</tspan> + <tspan font-style="italic">a</tspan> · <tspan font-style="italic">d</tspan> + <tspan font-style="italic">b</tspan> · <tspan font-style="italic">c</tspan> + <tspan font-style="italic">b</tspan> · <tspan font-style="italic">d</tspan></text></svg>
:::
:::

::: exempel "Exempel 2 — Utveckla och förenkla"
**Utveckla och förenkla<br>a) $(x + 7)(x + 3)$&emsp;&emsp;b) $(3x - 5)(8x + 9)$&emsp;&emsp;c) $10 - (x - 2)(x - 3)$**

**a)** Varje term i den första parentesen multipliceras med varje term i
den andra:

$$
(x + 7)(x + 3) = x^2 + 3x + 7x + 21 = x^2 + 10x + 21
$$

**Svar:** $x^2 + 10x + 21$

**b)** Samma metod — håll ordning på tecknen:

$$
(3x - 5)(8x + 9) = 24x^2 + 27x - 40x - 45 = 24x^2 - 13x - 45
$$

**Svar:** $24x^2 - 13x - 45$

**c)** När vi har ett minustecken framför ett dubbelt parentespar ska vi
*behålla* en stor parentes runt det utvecklade uttrycket, eftersom vi
efteråt ska byta tecken på alla termer inne i parentesen:

$$
10 - (x - 2)(x - 3) = 10 - (x^2 - 3x - 2x + 6)
$$

Byter tecken på alla termer inuti parentesen och förenklar:

$$
10 - x^2 + 3x + 2x - 6 = 4 - x^2 + 5x
$$

**Svar:** $4 - x^2 + 5x$, alternativt $-x^2 + 5x + 4$ (ofta vill man ha
termerna med störst exponent först, men inget måste).
:::

::: exempel "Exempel 3 — Ekvation med parentesmultiplikation"
**Lös ekvationen $(1 + 4x)(3x - 2) = x(12x - 6)$.**

Utvecklar parenteserna:

$$
3x - 2 + 12x^2 - 8x = 12x^2 - 6x
$$

Subtraherar $12x^2$ från båda led och förenklar:

$$
-5x - 2 = -6x
$$

Adderar $6x$ till båda led och förenklar:

$$
x - 2 = 0
$$

Adderar 2 till båda led och förenklar:

$$
x = 2
$$

**Svar:** $x = 2$
:::

---
id: ma2c-2.1
title: Kvadreringsreglerna och konjugatregeln
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.1'
---

# Kvadreringsreglerna och konjugatregeln

**Kvadreringsreglerna** är en metod för att enkelt utveckla
parentesuttryck "i kvadrat". **Konjugatregeln** är en metod för att
enkelt utveckla en multiplikation av två likadana parentesuttryck där
det enda som skiljer är tecknet mellan termerna inuti parentesen.

::: formel "Kvadreringsreglerna"
$$
(a + b)^2 = a^2 + 2ab + b^2
$$

$$
(a - b)^2 = a^2 - 2ab + b^2
$$
:::

::: formel "Konjugatregeln"
$$
(a + b)(a - b) = a^2 - b^2
$$
:::

::: härledning "Bevis — Första kvadreringsregeln"
$$
(a + b)^2 = (a + b)(a + b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2
$$

v.s.b.
:::

::: härledning "Bevis — Konjugatregeln"
$$
(a + b)(a - b) = a^2 - ab + ab - b^2 = a^2 - b^2
$$

v.s.b.
:::

::: exempel "Exempel 1 — Utveckla med kvadreringsreglerna"
**Utveckla<br>a) $(x + 4)^2$&emsp;&emsp;b) $(7 - b)^2$&emsp;&emsp;c) $(3y - 4x)^2$**

**a)** Första kvadreringsregeln med $a = x$ och $b = 4$:

$$
(x + 4)^2 = x^2 + 2 \cdot x \cdot 4 + 4^2 = x^2 + 8x + 16
$$

**Svar:** $x^2 + 8x + 16$

Kommentar: "Mittentermen" eller "den dubbla produkten" kan vi ofta få
fram direkt med snabb och enkel huvudräkning. För att få den dubbla
produkten multiplicerar vi de båda termerna inuti parentesen och
dubblar sedan: $x$ gånger 4 är $4x$ — dubblat blir det $8x$. Träna på
detta!

**b)** Andra kvadreringsregeln:

$$
(7 - b)^2 = 49 - 14b + b^2
$$

**Svar:** $49 - 14b + b^2$

**c)** Tänk på att **hela** termerna $3y$ och $4x$ ska upphöjas till 2:

$$
(3y - 4x)^2 = 9y^2 - 24xy + 16x^2
$$

**Svar:** $9y^2 - 24xy + 16x^2$
:::

::: exempel "Exempel 2 — Utveckla med konjugatregeln"
**Utveckla<br>a) $(x + 8)(x - 8)$&emsp;&emsp;b) $(3x - 5y)(3x + 5y)$&emsp;&emsp;c) $(9 + 2x)(2x - 9)$**

**a)** Vi ser att innehållet i parenteserna är lika och att det enda som
skiljer är tecknet mellan termerna (plus i ena och minus i andra).
Alltså tillämpar vi konjugatregeln.

$$
(x + 8)(x - 8) = x^2 - 8^2 = x^2 - 64
$$

**Svar:** $x^2 - 64$

Kommentar: Precis som med kvadreringsreglerna så träna på att få fram
det slutgiltiga svaret i ett enda steg, dvs. försök att direkt få fram
att $(x + 8)(x - 8) = x^2 - 64$ utan några mellanled.

**b)** Tänk på att även 3 och 5 ska upphöjas till 2:

$$
(3x - 5y)(3x + 5y) = 9x^2 - 25y^2
$$

**Svar:** $9x^2 - 25y^2$

**c)** Detta ser vid en första anblick inte ut som ett konjugat eftersom
vi inte har samma första term i parenteserna (9 respektive $2x$).
Däremot är parenteserna snarlika. Om vi kastar om termerna i den första
parentesen kommer det dock att bli ett konjugat! Att kasta om termerna
är ok eftersom det är ett plustecken emellan och ordningen då inte
spelar någon roll ($3 + 5$ är ju samma sak som $5 + 3$). Därefter
fortsätter vi med konjugatregeln som vanligt.

$$
(9 + 2x)(2x - 9) = (2x + 9)(2x - 9) = 4x^2 - 81
$$

**Svar:** $4x^2 - 81$
:::

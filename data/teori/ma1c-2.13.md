---
id: ma1c-2.13
title: Mönster och formler
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.13'
---

# Mönster och formler

En serie av tal kallas **talföljd**. Talen i talföljden kallas **element**.

Betrakta nedanstående talföljd:

$$
3,\ 7,\ 11,\ 15,\ 19,\ \ldots
$$

Elementen betecknas $a_n$ där $n$ står för **ordningsnumret**. Här gäller

$$
a_1 = 3
\qquad
a_2 = 7
\qquad
a_3 = 11
\qquad \ldots
$$

En formel för att direkt beräkna ett element i talföljden kallas **sluten
formel**.

::: exempel "Exempel 1 — Hitta en sluten formel"
**Vi har talföljden 3, 7, 11, 15, 19, …<br>a) Ange en sluten formel för talföljden.&emsp;&emsp;b) Vilket är det 100:e talet i talföljden?**

**a)** Vi kallar det $n$:te talet i talföljden $a_n$. Vi ser att varje tal
i talföljden fås genom att addera 4 till det föregående talet. Då måste
termen $4n$ finnas med i formeln, så

$$
a_n = 4n
$$

Vi vet att $a_1 = 3$, så om vi sätter in $n = 1$ i formeln ska det bli 3.
Vi testar:

$$
a_1 = 4 \cdot 1 = 4
$$

$a_1$ blev 4, som är 1 för mycket (det skulle bli 3). Eftersom det blev 1
för mycket subtraherar vi med 1 i formeln, så

$$
a_n = 4n - 1
$$

Vi testar igen:

$$
a_1 = 4 \cdot 1 - 1 = 4 - 1 = 3 \quad \text{Stämmer!}
$$

$$
a_2 = 4 \cdot 2 - 1 = 8 - 1 = 7 \quad \text{Stämmer!}
$$

$$
a_3 = 4 \cdot 3 - 1 = 12 - 1 = 11 \quad \text{Stämmer!}
$$

Vi har hittat vår formel!

**Svar:** $a_n = 4n - 1$

**b)** Vi sätter in $n = 100$ i den slutna formeln $a_n = 4n - 1$ och får

$$
a_{100} = 4 \cdot 100 - 1 = 400 - 1 = 399
$$

**Svar:** 399
:::

::: exempel "Exempel 2 — Prickmönstret"
**Nedanstående figurer byggs.**

::: figur
<svg viewBox="38 14 380 80" width="380" height="80" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Tre figurer av prickar. Figur 1 har en rad med tre prickar och en prick ovanpå mitten, totalt fyra prickar. Figur 2 har en rad med fem prickar och två prickar ovanpå mitten, totalt sju. Figur 3 har en rad med sju prickar och tre prickar ovanpå mitten, totalt tio."><circle cx="46" cy="64" r="4" fill="#1f2530"/><circle cx="60" cy="64" r="4" fill="#1f2530"/><circle cx="74" cy="64" r="4" fill="#1f2530"/><circle cx="60" cy="50" r="4" fill="#1f2530"/><text x="60" y="88" font-size="13" text-anchor="middle" fill="#1f2530">Figur 1</text><circle cx="162" cy="64" r="4" fill="#1f2530"/><circle cx="176" cy="64" r="4" fill="#1f2530"/><circle cx="190" cy="64" r="4" fill="#1f2530"/><circle cx="204" cy="64" r="4" fill="#1f2530"/><circle cx="218" cy="64" r="4" fill="#1f2530"/><circle cx="190" cy="50" r="4" fill="#1f2530"/><circle cx="190" cy="36" r="4" fill="#1f2530"/><text x="190" y="88" font-size="13" text-anchor="middle" fill="#1f2530">Figur 2</text><circle cx="318" cy="64" r="4" fill="#1f2530"/><circle cx="332" cy="64" r="4" fill="#1f2530"/><circle cx="346" cy="64" r="4" fill="#1f2530"/><circle cx="360" cy="64" r="4" fill="#1f2530"/><circle cx="374" cy="64" r="4" fill="#1f2530"/><circle cx="388" cy="64" r="4" fill="#1f2530"/><circle cx="402" cy="64" r="4" fill="#1f2530"/><circle cx="360" cy="50" r="4" fill="#1f2530"/><circle cx="360" cy="36" r="4" fill="#1f2530"/><circle cx="360" cy="22" r="4" fill="#1f2530"/><text x="360" y="88" font-size="13" text-anchor="middle" fill="#1f2530">Figur 3</text></svg>
:::

**a) Ange en sluten formel för antalet prickar i figur $n$.&emsp;&emsp;b) Hur många prickar finns det i figur 1 000?**

**a)** Vi studerar antalet prickar i varje figur:

$$
a_1 = 4
\qquad
a_2 = 7
\qquad
a_3 = 10
$$

För varje figur ökar antalet prickar med 3. Termen $3n$ bör därför vara
med i formeln, så

$$
a_n = 3n
$$

Vi vet att $a_1 = 4$. Vi testar att sätta in $n = 1$ och får
$a_1 = 3 \cdot 1 = 3$.

3 är 1 för lite. Vi måste alltså addera 1 i formeln för att $a_1$ ska bli
4. Detta ger

$$
a_n = 3n + 1
$$

Vi testar igen:

$$
a_1 = 3 \cdot 1 + 1 = 3 + 1 = 4 \quad \text{Stämmer!}
$$

$$
a_2 = 3 \cdot 2 + 1 = 6 + 1 = 7 \quad \text{Stämmer!}
$$

$$
a_3 = 3 \cdot 3 + 1 = 9 + 1 = 10 \quad \text{Stämmer!}
$$

Vi har hittat korrekt formel.

**Svar:** $a_n = 3n + 1$

**b)** Från a-uppgiften har vi att $a_n = 3n + 1$. Insättning av
$n = 1\,000$ ger

$$
a_{1000} = 3 \cdot 1\,000 + 1 = 3\,001
$$

**Svar:** 3 001
:::

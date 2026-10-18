---
id: ma3c-1.2
title: Polynomekvationer
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.2'
---

# Polynomekvationer

En ekvation där ena ledet är ett polynom och det andra ledet är noll, till
exempel

$$
x^3 - 2x^2 - 15x = 0
$$

kallas en **polynomekvation**. Ekvationens grad är polynomets grad, så
ekvationen ovan är en tredjegradsekvation. Lösningarna kallas ofta
**rötter**. Andragradsekvationer kan du redan lösa med nollproduktmetoden och
*pq*-formeln. I det här avsnittet löser vi ekvationer av högre grad genom att
återföra dem på sådant vi redan kan.

::: formel "Antal lösningar"
En polynomekvation av grad $n$ har **högst** $n$ reella lösningar.
:::

## Enkla polynomekvationer

I Matematik nivå 1c löste vi enkla andra- och tredjegradsekvationer som
$x^2 = 9$ och $x^3 = -27$. Samma metod fungerar för alla exponenter. En
ekvation som bara innehåller en potens av $x$ och en konstant kan skrivas
om till formen $x^n = a$. Den löses genom att vi tar $n$:te roten ur båda
leden. Om exponenten är jämn ger både ett positivt och ett negativt tal
samma potens, till exempel $3^4 = 81$ och $(-3)^4 = 81$, och då finns två
lösningar.

::: formel "Ekvationen $x^n = a$"
- $n$ udda: en lösning, $x = \sqrt[n]{a}$.
- $n$ jämnt och $a > 0$: två lösningar, $x = \pm \sqrt[n]{a}$.
- $n$ jämnt och $a < 0$: ingen reell lösning.
:::

::: exempel "Exempel 1 — Enkla polynomekvationer"
**Lös ekvationerna.<br>a)&nbsp;$x^5 = 32$&emsp;&emsp;b)&nbsp;$2x^4 = 162$&emsp;&emsp;c)&nbsp;$x^3 + 8 = 0$**

::: handskrift
typ: enklapolyekv
:::

::: textlosning
**a)** Exponenten 5 är udda, så det finns en lösning. Vi tar femteroten ur
båda leden.

$$
\begin{aligned}
x^5 &= 32 \\
x &= \sqrt[5]{32} \\
x &= 2
\end{aligned}
$$

Kontroll: $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 32$.

**Svar:** $x = 2$

**b)** Först divideras båda leden med 2. Exponenten 4 är jämn och högerledet
positivt, så det finns två lösningar.

$$
\begin{aligned}
2x^4 &= 162 \\
\frac{2x^4}{2} &= \frac{162}{2} \\
x^4 &= 81 \\
x &= \pm \sqrt[4]{81} \\
x &= \pm 3
\end{aligned}
$$

**Svar:** $x_1 = -3$ och $x_2 = 3$

**c)** Först subtraheras 8 från båda leden. Exponenten 3 är udda, så
tredjeroten ur ett negativt tal går bra: $(-2)^3 = -8$.

$$
\begin{aligned}
x^3 + 8 &= 0 \\
x^3 + 8 - 8 &= 0 - 8 \\
x^3 &= -8 \\
x &= \sqrt[3]{-8} \\
x &= -2
\end{aligned}
$$

**Svar:** $x = -2$
:::
:::

## Mer om polynomekvationer

Saknar polynomekvationen konstantterm finns $x$ i varje term. Då kan $x$
brytas ut, och vänsterledet blir en produkt. Enligt **nollproduktmetoden**
är en produkt noll bara om någon av faktorerna är noll, så ekvationen delas
upp i två enklare ekvationer.

::: exempel "Exempel 2 — Bryt ut x"
**Lös ekvationen $x^3 - 2x^2 - 15x = 0$.**

::: handskrift
typ: brytutpolyekv
:::

::: textlosning
Alla termer innehåller $x$, så vi bryter ut $x$.

$$
x(x^2 - 2x - 15) = 0
$$

Nollproduktmetoden ger $x_1 = 0$ eller $x^2 - 2x - 15 = 0$. Den andra
ekvationen löser vi med *pq*-formeln.

$$
\begin{aligned}
x &= 1 \pm \sqrt{1 + 15} \\
x &= 1 \pm \sqrt{16} \\
x &= 1 \pm 4
\end{aligned}
$$

vilket ger $x_2 = 1 - 4 = -3$ och $x_3 = 1 + 4 = 5$.

**Svar:** $x_1 = 0$, $x_2 = -3$ och $x_3 = 5$
:::
:::

En fjärdegradsekvation som bara innehåller $x^4$, $x^2$ och en konstant kan
lösas genom att vi **byter variabel**. Vi inför $t = x^2$, så att $x^4 = t^2$.
Då blir ekvationen en andragradsekvation i $t$. När $t$ är bestämt går vi
tillbaka till $x$ med $x^2 = t$.

::: exempel "Exempel 3 — Byt variabel"
**Lös ekvationen $x^4 - 10x^2 + 9 = 0$.**

::: handskrift
typ: bytvariabel
:::

::: textlosning
Vi inför $t = x^2$. Då är $x^4 = (x^2)^2 = t^2$, och ekvationen blir

$$
t^2 - 10t + 9 = 0
$$

*pq*-formeln ger

$$
\begin{aligned}
t &= 5 \pm \sqrt{25 - 9} \\
t &= 5 \pm \sqrt{16} \\
t &= 5 \pm 4
\end{aligned}
$$

vilket ger $t_1 = 1$ och $t_2 = 9$. Vi går tillbaka till $x$ med $x^2 = t$.

$$
\begin{aligned}
x^2 &= 1 & \qquad x^2 &= 9 \\
x &= \pm \sqrt{1} & \qquad x &= \pm \sqrt{9} \\
x &= \pm 1 & \qquad x &= \pm 3
\end{aligned}
$$

Ekvationen har fyra lösningar, lika många som graden.

**Svar:** $x_1 = -3$, $x_2 = -1$, $x_3 = 1$ och $x_4 = 3$
:::
:::

## Grafen till en polynomfunktion

En funktion $y = p(x)$, där $p(x)$ är ett polynom, kallas en
**polynomfunktion**. Grafen till en polynomfunktion är en sammanhängande
kurva utan hopp eller hål. Den kan ritas utan att pennan lyfts från
papperet, och vi säger att funktionen är **kontinuerlig**.

Lösningarna till ekvationen $p(x) = 0$ är de $x$-värden där grafen skär
eller tangerar $x$-axeln. De kallas polynomets **nollställen**. Eftersom
ekvationen har högst lika många lösningar som graden kan en
tredjegradsfunktion skära $x$-axeln högst tre gånger.

I grafritaren nedan är polynomfunktionen skriven som en produkt av tre
faktorer. Dra i *p*, *q* och *r* och se var grafen skär $x$-axeln. Dra
sedan i *a* och se att nollställena ligger kvar.

::: graf
titel: y = a(x - p)(x - q)(x - r)
uttryck: a*(x-p)*(x-q)*(x-r)
ekvation: y = {a}(x - {p})(x - {q})(x - {r})
a: 0.25, -1, 1, 0.25
p: -3, -5, 5, 1
q: 1, -5, 5, 1
r: 4, -5, 5, 1
x: -6, 6
y: -6, 6
:::

## Faktorer och nollställen

Grafritaren visar sambandet som gör polynom så användbara: **varje faktor
$(x - a)$ i polynomet ger nollstället $x = a$**, eftersom faktorn blir noll
just där. Det gäller också omvänt, och det omvända sambandet har ett eget
namn: **faktorsatsen**.

::: formel "Faktorsatsen"
Om $x = a$ är ett nollställe till polynomet $p(x)$, det vill säga om
$p(a) = 0$, så är $(x - a)$ en faktor i polynomet.
:::

Kan vi alla nollställen kan vi alltså faktorisera hela polynomet.

::: formel "Faktorisera med nollställen"
Ett polynom av grad 3 med nollställena $x_1$, $x_2$ och $x_3$ kan skrivas

$$
p(x) = k(x - x_1)(x - x_2)(x - x_3)
$$

där $k$ är koefficienten framför $x$-termen med högst grad. På samma sätt
ger ett polynom av grad $n$ med $n$ nollställen $n$ faktorer.
:::

::: exempel "Exempel 4 — Faktorer och nollställen"
**a) Faktorisera $p(x) = 3x^2 - 6x - 24$ med hjälp av nollställena.<br>b) Ett tredjegradspolynom $p(x)$ har nollställena $-2$, $1$ och $4$, och $p(0) = 16$. Bestäm $p(x)$.**

::: handskrift
typ: faktornollstalle
:::

::: textlosning
**a)** Nollställena är lösningarna till $3x^2 - 6x - 24 = 0$. Vi dividerar
båda leden med 3 och använder *pq*-formeln.

$$
\begin{aligned}
3x^2 - 6x - 24 &= 0 \\
\frac{3x^2 - 6x - 24}{3} &= \frac{0}{3} \\
x^2 - 2x - 8 &= 0 \\
x &= 1 \pm \sqrt{1 + 8} \\
x &= 1 \pm \sqrt{9} \\
x &= 1 \pm 3
\end{aligned}
$$

Nollställena är $x_1 = -2$ och $x_2 = 4$. Koefficienten framför $x^2$ är 3,
så $k = 3$.

$$
p(x) = 3(x - (-2))(x - 4) = 3(x + 2)(x - 4)
$$

**Svar:** $p(x) = 3(x + 2)(x - 4)$

**b)** Nollställena ger faktorerna $(x + 2)$, $(x - 1)$ och $(x - 4)$, men
$k$ är okänt.

$$
p(x) = k(x + 2)(x - 1)(x - 4)
$$

Vi bestämmer $k$ med villkoret $p(0) = 16$ och sätter in $x = 0$.

$$
\begin{aligned}
p(0) = k(0 + 2)(0 - 1)(0 - 4) &= 16 \\
8k &= 16 \\
\frac{8k}{8} &= \frac{16}{8} \\
k &= 2
\end{aligned}
$$

**Svar:** $p(x) = 2(x + 2)(x - 1)(x - 4)$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Polynomekvationer"
- En polynomekvation har ett polynom i ena ledet och noll i det andra.
- En ekvation av grad $n$ har **högst** $n$ reella lösningar.
- Grafen till en polynomfunktion är kontinuerlig: en kurva utan hopp eller hål.
:::

::: sampunkt "Ekvationen $x^n = a$"
- $n$ udda: $x = \sqrt[n]{a}$, till exempel $x^3 = -8$ ger $x = -2$.
- $n$ jämnt, $a > 0$: $x = \pm \sqrt[n]{a}$, till exempel $x^4 = 81$ ger $x = \pm 3$.
- $n$ jämnt, $a < 0$: ingen reell lösning.
:::

::: sampunkt "Bryt ut eller byt variabel"
- Saknas konstantterm: bryt ut $x$ och använd nollproduktmetoden.
- $x(x^2 - 2x - 15) = 0$ ger $x = 0$ eller $x^2 - 2x - 15 = 0$.
- Bara $x^4$, $x^2$ och konstant: inför $t = x^2$ och lös i $t$.
- Gå sedan tillbaka med $x^2 = t$.
:::

::: sampunkt "Faktorer och nollställen"
- **Faktorsatsen:** är $p(a) = 0$ så är $(x - a)$ en faktor, och tvärtom.
- $p(x) = k(x - x_1)(x - x_2)(x - x_3)$, där $k$ är koefficienten för högsta graden.
- Nollställena syns där grafen skär $x$-axeln.
:::

:::

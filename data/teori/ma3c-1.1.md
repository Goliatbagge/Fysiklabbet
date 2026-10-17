---
id: ma3c-1.1
title: Polynom
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.1'
---

# Polynom

Ett **polynom** är en summa av termer där varje term är ett tal multiplicerat
med $x$ upphöjt till ett heltal som är noll eller positivt. Uttrycket

$$
5x^3 - 2x^2 + x - 7
$$

är ett polynom med fyra termer. Talen framför $x$-termerna, här 5, −2 och 1,
kallas **koefficienter**. Termen utan $x$, här −7, kallas **konstantterm**.
Den högsta exponenten bland termerna kallas polynomets **grad**, så polynomet
ovan har grad 3.

::: formel "Polynom och grad"
Ett polynom är en summa av termer av formen

$$
a \cdot x^n
$$

där

- $a$ = koefficient (ett tal)
- $n$ = exponent (ett heltal som är noll eller positivt)

Polynomets **grad** är den högsta exponenten bland termerna med en
koefficient skild från noll.
:::

Polynom av låg grad känner du redan igen. Ett förstagradspolynom som
$2x + 3$ ger en rät linje, och ett andragradspolynom som $x^2 - 4x + 1$ ger en
parabel. Polynom av grad 3 kallas tredjegradspolynom, polynom av grad 4
fjärdegradspolynom och så vidare.

Ett uttryck där $x$ står i en nämnare, under ett rottecken eller i en
exponent är **inte** ett polynom. Till exempel är $\dfrac{1}{x} = x^{-1}$ och
$\sqrt{x} = x^{\frac{1}{2}}$, och varken $-1$ eller $\dfrac{1}{2}$ är ett heltal
som är noll eller positivt.

::: exempel "Exempel 1 — Polynom eller inte?"
**Avgör om uttrycket är ett polynom. Ange i så fall polynomets grad.<br>a)&nbsp;$3x^4 - 2x + 5$&emsp;&emsp;b)&nbsp;$7 - x$&emsp;&emsp;c)&nbsp;$\dfrac{4}{x} + x^2$&emsp;&emsp;d)&nbsp;$\sqrt{x} + 1$**

::: handskrift
typ: polynomgrad
:::

::: textlosning
**a)** Alla exponenter är heltal som är noll eller positiva. Den högsta
exponenten är 4.

**Svar:** Ett polynom av grad 4

**b)** Vi kan skriva $7 - x = -x + 7 = -1 \cdot x^1 + 7$. Den högsta
exponenten är 1.

**Svar:** Ett polynom av grad 1

**c)** Termen $\dfrac{4}{x}$ kan skrivas $4x^{-1}$. Exponenten $-1$ är
negativ.

**Svar:** Inte ett polynom

**d)** Termen $\sqrt{x}$ kan skrivas $x^{\frac{1}{2}}$. Exponenten
$\dfrac{1}{2}$ är inget heltal.

**Svar:** Inte ett polynom
:::
:::

## Värdet av ett polynom

Ett polynom betecknas ofta $p(x)$, på samma sätt som en funktion. Värdet av
polynomet för ett visst $x$ får vi genom att sätta in värdet på varje ställe
där $x$ står. Står $x$ upphöjt till något sätter vi värdet inom parentes,
så att även ett minustecken upphöjs.

::: exempel "Exempel 2 — Värdet av ett polynom"
**Polynomet $p(x) = 2x^3 - 5x + 4$ är givet. Beräkna<br>a)&nbsp;$p(2)$&emsp;&emsp;b)&nbsp;$p(-1)$&emsp;&emsp;c)&nbsp;$p(0)$**

::: handskrift
typ: polynomvarde
:::

::: textlosning
**a)** Vi sätter in $x = 2$ på båda ställena där $x$ står.

$$
p(2) = 2 \cdot 2^3 - 5 \cdot 2 + 4 = 2 \cdot 8 - 10 + 4 = 16 - 10 + 4 = 10
$$

**Svar:** $p(2) = 10$

**b)** Vi sätter in $x = -1$ inom parentes.

$$
p(-1) = 2 \cdot (-1)^3 - 5 \cdot (-1) + 4 = 2 \cdot (-1) + 5 + 4 = -2 + 5 + 4 = 7
$$

**Svar:** $p(-1) = 7$

**c)** Alla termer med $x$ blir noll, och bara konstanttermen blir kvar.

$$
p(0) = 2 \cdot 0^3 - 5 \cdot 0 + 4 = 4
$$

**Svar:** $p(0) = 4$
:::
:::

Lägg märke till c): värdet av ett polynom för $x = 0$ är alltid lika med
konstanttermen.

## Multiplikation av polynom

När två polynom multipliceras ska **varje term i det ena polynomet
multipliceras med varje term i det andra**. Har det ena polynomet två termer
och det andra tre blir det alltså $2 \cdot 3 = 6$ produkter, som sedan
förenklas genom att likadana termer slås ihop.

::: formel "Multiplikation av polynom"
Varje term i den första parentesen multipliceras med varje term i den andra:

$$
(a + b)(c + d + e) = ac + ad + ae + bc + bd + be
$$

Graden för produkten är summan av polynomens grader.
:::

Att graderna adderas beror på att den högsta termen i produkten är produkten
av de båda högsta termerna, och vid multiplikation av potenser med samma bas
adderas exponenterna: $x^2 \cdot x^3 = x^{2 + 3} = x^5$.

Kvadreringsreglerna och konjugatregeln är specialfall av multiplikationen
ovan. De är bra att kunna utantill, eftersom de används baklänges när vi
faktoriserar.

::: formel "Kvadreringsreglerna och konjugatregeln"
$$
(a + b)^2 = a^2 + 2ab + b^2
$$

$$
(a - b)^2 = a^2 - 2ab + b^2
$$

$$
(a + b)(a - b) = a^2 - b^2
$$
:::

::: exempel "Exempel 3 — Multiplicera polynom"
**Polynomen $2x - 3$ och $x^2 + 4x - 1$ multipliceras med varandra.<br>a) Utveckla och förenkla produkten $(2x - 3)(x^2 + 4x - 1)$.<br>b) Vilken grad har produkten?**

::: handskrift
typ: multpolynom
:::

::: textlosning
**a)** Varje term i den första parentesen multipliceras med varje term i den
andra. Det blir sex produkter.

$$
\begin{aligned}
(2x - 3)(x^2 + 4x - 1) &= 2x \cdot x^2 + 2x \cdot 4x + 2x \cdot (-1) - 3 \cdot x^2 - 3 \cdot 4x - 3 \cdot (-1) \\
&= 2x^3 + 8x^2 - 2x - 3x^2 - 12x + 3 \\
&= 2x^3 + 5x^2 - 14x + 3
\end{aligned}
$$

**Svar:** $2x^3 + 5x^2 - 14x + 3$

**b)** Den högsta exponenten i produkten är 3. Det stämmer med att graderna
adderas: $2x - 3$ har grad 1 och $x^2 + 4x - 1$ har grad 2, och $1 + 2 = 3$.

**Svar:** Grad 3
:::
:::

## Faktorisering av polynom

Att **faktorisera** ett polynom betyder att skriva det som en produkt. Det är
multiplikationen baklänges. Vi har två metoder sedan tidigare:

1. Bryta ut en gemensam faktor, till exempel $6x^2 + 4x = 2x(3x + 2)$.
2. Använda kvadreringsreglerna eller konjugatregeln baklänges, till exempel
   $x^2 - 9 = (x + 3)(x - 3)$.

Ofta behöver båda metoderna användas efter varandra. Bryt då alltid ut först,
och se sedan efter om det som står kvar i parentesen kan faktoriseras vidare.
I nästa avsnitt kommer en tredje metod, där polynomet faktoriseras med hjälp
av sina nollställen.

::: tips "Faktorisera i två steg"
1. Bryt ut den största gemensamma faktorn.
2. Pröva kvadreringsreglerna eller konjugatregeln på det som står kvar i
   parentesen.
:::

::: exempel "Exempel 4 — Faktorisera polynom"
**Faktorisera så långt som möjligt.<br>a)&nbsp;$6x^3 - 9x^2$&emsp;&emsp;b)&nbsp;$x^3 - 16x$&emsp;&emsp;c)&nbsp;$2x^3 + 12x^2 + 18x$**

::: handskrift
typ: faktoriserapolynom
:::

::: textlosning
**a)** Båda termerna innehåller faktorn 3 och faktorn $x^2$. Vi bryter ut
$3x^2$.

$$
6x^3 - 9x^2 = 3x^2(2x - 3)
$$

**Svar:** $3x^2(2x - 3)$

**b)** Vi bryter först ut $x$. Det som blir kvar, $x^2 - 16 = x^2 - 4^2$,
faktoriseras med konjugatregeln baklänges.

$$
x^3 - 16x = x(x^2 - 16) = x(x + 4)(x - 4)
$$

**Svar:** $x(x + 4)(x - 4)$

**c)** Vi bryter först ut $2x$. Det som blir kvar, $x^2 + 6x + 9$, är
$x^2 + 2 \cdot 3 \cdot x + 3^2$, så första kvadreringsregeln ger
$(x + 3)^2$.

$$
2x^3 + 12x^2 + 18x = 2x(x^2 + 6x + 9) = 2x(x + 3)^2
$$

**Svar:** $2x(x + 3)^2$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Polynom"
- En summa av termer $a \cdot x^n$, där $n$ är ett heltal som är noll eller positivt.
- **Koefficient:** talet framför $x$-termen. **Konstantterm:** termen utan $x$.
- **Grad:** den högsta exponenten. $5x^3 - 2x^2 + x - 7$ har grad 3.
- $\dfrac{4}{x}$ och $\sqrt{x}$ ger inget polynom: exponenterna $-1$ och $\dfrac{1}{2}$.
:::

::: sampunkt "Värdet av ett polynom"
- Sätt in värdet på varje ställe där $x$ står, inom parentes.
- $p(x) = 2x^3 - 5x + 4$ ger $p(-1) = 2 \cdot (-1)^3 - 5 \cdot (-1) + 4 = 7$.
- $p(0)$ är alltid lika med konstanttermen.
:::

::: sampunkt "Multiplikation"
- Varje term i ena polynomet multipliceras med varje term i det andra.
- Slå sedan ihop likadana termer.
- Produktens grad är summan av graderna.
:::

::: sampunkt "Faktorisering"
- Faktorisera: skriv polynomet som en produkt.
- Bryt först ut största gemensamma faktorn.
- Pröva sedan kvadreringsreglerna eller konjugatregeln baklänges.
- $x^3 - 16x = x(x^2 - 16) = x(x + 4)(x - 4)$
:::

:::

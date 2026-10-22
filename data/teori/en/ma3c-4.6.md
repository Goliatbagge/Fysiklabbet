---
kalla: 2325a8df01
id: ma3c-4.6
title: Optimisation problems
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.6'
---

# Optimisation problems

Problems that are about determining a "greatest/maximum" or
"least/minimum" value are called **extreme value problems** or
**optimisation problems**. We solve optimisation problems in the same way as when
we find extreme points, with the addition that we must also interpret our
result in the context of the problem.

::: tips "Step by step"
1. Set up a function for the quantity that is to be maximised or
   minimised.
2. Differentiate the function.
3. Set the derivative equal to 0 and solve the equation. This gives the $x$-value
   that can give the greatest or least value.
4. Determine the nature of the extreme point (maximum or minimum point) with
   the second derivative or a sign chart.
5. Substitute the $x$-value into the original function to find
   the extreme value.
6. Interpret the result in the context of the problem.
:::

::: exempel "Example 1: Maximum revenue"
**Per is organising a party. The revenue $I$ kr with the ticket price $x$ kr is given by
the formula $I(x) = 300x - 2x^2$.<br>a) Which ticket price gives the maximum revenue
and what is the revenue then?<br>b) Explain why the formula looks
the way it does.**

::: handskrift
typ: maximalintakt
:::

::: textlosning
**a)** We start by finding out which ticket price $x$ gives
the maximum revenue. We differentiate the original function, set
the derivative equal to 0 and solve the equation to get the ticket price that
can give the greatest revenue.

$$
I(x) = 300x - 2x^2 \qquad \Rightarrow \qquad I'(x) = 300 - 4x
$$

$I'(x) = 0$ gives

$$
300 - 4x = 0 \quad \Rightarrow \quad 4x = 300 \quad \Rightarrow \quad x = 75
$$

So we have a maximum or minimum revenue when the ticket price is 75 kr.

We substitute the $x$-value 75 into the original function
$I(x) = 300x - 2x^2$ to find the revenue at the ticket price 75 kr.

$$
I(75) = 300 \cdot 75 - 2 \cdot 75^2 = 22\,500 - 11\,250 = 11\,250
$$

We determine the nature of the extreme point by substituting the $x$-value into
the second derivative and examining the sign. We already have
$I'(x) = 300 - 4x$, which gives

$$
I''(x) = -4
$$

Since $I''(75) = -4 < 0$ (negative), the extreme point is a
**maximum point**. We could also have determined the nature by
noting that $I$ is a quadratic function with a **negative**
$x^2$ term, which always gives a maximum point.

So the maximum revenue is 11 250 kr when the ticket price is 75 kr.

**Answer:** The ticket price 75 kr gives the maximum revenue 11 250 kr.

**b)** The revenue is given by the formula

$$
\text{revenue} = \text{ticket price} \cdot \text{number of tickets sold}
$$

If we factorise the formula for the revenue, we can compare it with the formula
above.

$$
I(x) = 300x - 2x^2 = x(300 - 2x)
$$

We compare $I(x) = x \cdot (300 - 2x)$ with
$\text{revenue} = \text{ticket price} \cdot \text{number of tickets sold}$.
We know that $I$ stands for the revenue and that $x$ stands for the ticket price. Then
the factor $(300 - 2x)$ must stand for the number of tickets sold. That the number of
tickets sold is $(300 - 2x)$ can be interpreted as 300 tickets being sold
with free admission ($x = 0$), and 2 fewer tickets being sold for every krona
the ticket price increases.

**Answer:** The formula corresponds to revenue $=$ ticket price $\cdot$ number of tickets
sold. With free admission 300 tickets are sold, and for every krona
the ticket price increases, 2 fewer tickets are sold.
:::
:::

::: exempel "Example 2: Maximum area"
**Vanja has bought 60 metres of fencing to make a rectangular paddock for horses
where one of the sides is to be formed by a wall (no fencing is needed there). See
the figure.<br>a) Write an expression for the area of the paddock.<br>b) What is
the maximum area the paddock can have?**

::: figur
<svg viewBox="16 4 252 162" width="368" height="237" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A rectangular paddock against a wall: the band of the wall at the top, the paddock below with the two equal sides x and the third side 60 minus 2x."><rect x="24" y="10" width="212" height="16" fill="rgba(31,37,48,0.12)" stroke="#1f2530" stroke-width="1" stroke-dasharray="5 4"/><text x="130" y="22" font-size="12" text-anchor="middle" fill="#1f2530">Wall</text><rect x="44" y="26" width="172" height="100" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="32" y1="30" x2="32" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="32,26 28.8,33 35.2,33" fill="#1f2530"/><polygon points="32,126 28.8,119 35.2,119" fill="#1f2530"/><text x="24" y="80" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="228" y1="30" x2="228" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="228,26 224.8,33 231.2,33" fill="#1f2530"/><polygon points="228,126 224.8,119 231.2,119" fill="#1f2530"/><text x="236" y="80" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="48" y1="140" x2="212" y2="140" stroke="#1f2530" stroke-width="1.2"/><polygon points="44,140 51,136.8 51,143.2" fill="#1f2530"/><polygon points="216,140 209,136.8 209,143.2" fill="#1f2530"/><text x="130" y="160" font-size="13" text-anchor="middle" fill="#1f2530">60 − 2<tspan font-style="italic">x</tspan></text><text x="266" y="16" font-size="12" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

::: handskrift
typ: hagederivata
:::

::: textlosning
**a)** We let the sides towards the wall be $x$ metres. The fencing on the
third side will then be $(60 - 2x)$ metres, since Vanja had
60 metres of fencing and $2x$ has been used for the other two sides. See
the figure.

We call the area of the paddock $A$. Since it has the shape of a rectangle,

$$
A = \text{base} \cdot \text{height}
$$

which gives

$$
A(x) = (60 - 2x) \cdot x = x(60 - 2x) = 60x - 2x^2
$$

**Answer:** $A(x) = x(60 - 2x)$ or $A(x) = 60x - 2x^2$

**b)** We now need to determine the maximum area, so we have an
optimisation problem! We differentiate the function to be optimised, set
the derivative equal to 0 and solve the equation to get the $x$-value that
can give the greatest area.

$$
A(x) = 60x - 2x^2 \qquad \Rightarrow \qquad A'(x) = 60 - 4x
$$

$A'(x) = 0$ gives

$$
60 - 4x = 0 \quad \Rightarrow \quad 4x = 60 \quad \Rightarrow \quad x = 15
$$

So we have a maximum or minimum area when $x = 15$ metres.

We substitute the $x$-value into the original function
$A(x) = 60x - 2x^2$ to find the area it gives.

$$
A(15) = 60 \cdot 15 - 2 \cdot 15^2 = 900 - 450 = 450
$$

We determine the nature of the extreme point by substituting the $x$-value into
the second derivative and examining the sign. We already had
$A'(x) = 60 - 4x$, which gives

$$
A''(x) = -4
$$

Since $A''(15) = -4 < 0$ (negative), the extreme point is a
**maximum point**, so the area we calculated is a maximum value.

So the maximum area is $450\ \mathrm{m}^2$ when $x = 15$ metres.

**Answer:** The maximum area is $450\ \mathrm{m}^2$.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Optimisation problems"
- Tasks about a greatest or least value are called **extreme value problems** or **optimisation problems**.
- They are solved like ordinary extreme point tasks, but the answer must also be **interpreted in context**.
:::

::: sampunkt "Step by step"
1. Set up a function for what is to be optimised.
2. Differentiate the function.
3. Set the derivative equal to 0 and solve the equation.
4. Determine the nature with the second derivative or a sign chart.
5. Substitute the $x$-value into the original function to get the extreme value.
6. Interpret the result with the correct unit.
:::

::: sampunkt "Setting up the function"
- The hardest step is writing the function. Use a known formula, for example area or volume.
- Express everything in **one single** variable using the conditions of the task.
- 60 metres of fencing against a wall gives the sides $x$, $x$ and $60 - 2x$, so $A(x) = x(60 - 2x)$.
:::

::: sampunkt "Typical example: maximum revenue"
- $I(x) = 300x - 2x^2$ gives $I'(x) = 300 - 4x$ and $x = 75$.
- $I(75) = 11\,250$ kr, and $I''(x) = -4 < 0$ shows that it is a maximum.
- The factorisation $I(x) = x(300 - 2x)$ shows the meaning: the price times the number of tickets sold.
:::

:::

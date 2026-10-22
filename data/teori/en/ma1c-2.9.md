---
kalla: 4e9812e6cf
id: ma1c-2.9
title: Simple quadratic and cubic equations
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.9'
---

# Simple quadratic and cubic equations

In an equation, the variable term with the highest exponent determines the **degree** of the equation.
An equation containing a variable whose highest exponent is 2, for example
$x^2 + 7 = 11$, is called a **quadratic equation** (second-degree equation). An equation containing
a variable of highest degree 3, for example $x^3 - 8 = 1$, is called a
**cubic equation** (third-degree equation). Quadratic and cubic equations that contain a
single variable term are called **simple quadratic and cubic equations**.

::: formel "Solving simple quadratic equations"
$$
x^2 = a, \text{ where } a \geq 0, \text{ has the solutions}
$$

$$
x = \pm\sqrt{a}
$$

If $a < 0$ there are no (real) solutions.
:::

::: formel "Solving simple cubic equations"
$$
x^3 = a, \text{ for all } a, \text{ has the solution}
$$

$$
x = \sqrt[3]{a}
$$
:::

::: tips "How to solve"
1. **Get the variable term alone** on one side. Add or subtract away
   the numbers next to it.
2. **Divide away the coefficient** in front of $x^2$ or $x^3$.
3. **Take the root.** An even exponent gives $\pm$, an odd one does not. If the number
   under the square root is negative, there are no real solutions.
:::

::: exempel "Example 1: Simple quadratic and cubic equations"
**Solve<br>a)&nbsp;$x^2 = 64$&emsp;&emsp;b)&nbsp;$x^2 = 10$&emsp;&emsp;c)&nbsp;$x^2 = -9$&emsp;&emsp;d)&nbsp;$x^3 = 343$&emsp;&emsp;e)&nbsp;$x^3 = -27$&emsp;&emsp;f)&nbsp;$3x^2 - 2.31 = 17.97$**

::: handskrift
typ: enklagrad
:::

::: textlosning
**a)** Do not forget the negative solution:

$$
x = \pm\sqrt{64} = \pm 8
$$

**Answer:** $x = \pm 8$, or alternatively $x_1 = 8$ and $x_2 = -8$

**b)** $x = \pm\sqrt{10}$. $\sqrt{10}$ is hard to work out with
mental arithmetic. We use the calculator: $x = \pm 3.162\ldots \approx \pm 3.16$

**Answer:** $x = \pm\sqrt{10} \approx \pm 3.16$

**c)** $x = \pm\sqrt{-9}$. The square root of a negative number has no real solutions.

**Answer:** No real solutions.

**d)** The cubic equation has only one solution:

$$
x = \sqrt[3]{343} = 7
$$

**Answer:** $x = 7$

**e)** The cube root of a negative number works perfectly well (minus times minus
times minus gives minus):

$$
x = \sqrt[3]{-27} = -3
$$

**Answer:** $x = -3$

**f)** We start by isolating $x^2$. Then we proceed as usual.
Add 2.31 to both sides:

$$
3x^2 = 20.28
$$

Divide both sides by 3:

$$
x^2 = 6.76
$$

$$
x = \pm\sqrt{6.76} = \pm 2.6
$$

**Answer:** $x = \pm 2.6$
:::
:::

::: exempel "Example 2: The square and the cube"
**Find the side of a<br>a) square with area $4\,096\ \mathrm{cm^2}$&emsp;&emsp;b) cube with volume $4\,096\ \mathrm{cm^3}$**

::: handskrift
typ: kvadratkub
:::

::: textlosning
**a)** The area $A$ of the square is given by side · side. We call the side $x$.
This gives $A = x \cdot x = x^2$. See the figure:

::: figur
<svg viewBox="14 4 102 102" width="138" height="138" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A square with side x. The area A equals x squared."><rect x="20" y="8" width="74" height="74" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.4"/><text x="57" y="50" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">A</tspan> = <tspan font-style="italic">x</tspan><tspan font-size="10" dy="-5">2</tspan></text><text x="102" y="50" font-size="14" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="57" y="98" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

We know that the area is $4\,096\ \mathrm{cm^2}$, which gives

$$
x^2 = 4\,096
$$

$$
x = \pm\sqrt{4\,096} = \pm 64\ \mathrm{cm}
$$

Since a side cannot be negative, we disregard the negative
solution.

**Answer:** 64 cm

**b)** The volume $V$ of the cube is given by side · side · side. We call the side $x$.
This gives $V = x \cdot x \cdot x = x^3$. See the figure:

::: figur
<svg viewBox="20 6 146 136" width="198" height="185" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A cube with side x. The volume V equals x to the power of 3."><polygon points="28,42 56,16 140,16 112,42" fill="#e3eef7" stroke="#1f2530" stroke-width="1.3"/><polygon points="112,42 140,16 140,96 112,122" fill="#bcd6ea" stroke="#1f2530" stroke-width="1.3"/><rect x="28" y="42" width="84" height="80" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.4"/><text x="70" y="86" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">V</tspan> = <tspan font-style="italic">x</tspan><tspan font-size="10" dy="-5">3</tspan></text><text x="148" y="60" font-size="14" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="126" y="118" font-size="14" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="70" y="134" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

We know that the volume is $4\,096\ \mathrm{cm^3}$, which gives

$$
x^3 = 4\,096
$$

$$
x = \sqrt[3]{4\,096} = 16\ \mathrm{cm}
$$

**Answer:** 16 cm
:::
:::

::: exempel "Example 3: A bracket squared"
**Solve the equation $(x-5)^2 = 36$**

::: handskrift
typ: parenteskvadrat
:::

::: textlosning
The bracket $(x-5)$ is a single number that is squared. Which number
squared gives 36? Both 6 and $-6$. We therefore take the square root of both sides and
write $\pm$:

$$
x - 5 = \pm\sqrt{36}
$$

$$
x - 5 = \pm 6
$$

Now we solve for $x$ and keep the plus-minus. Add 5 to both
sides:

$$
x - 5 + 5 = 5 \pm 6
$$

$$
x = 5 \pm 6
$$

Plus-minus means two solutions, one with minus and one with plus:

$$
x_1 = 5 - 6 = -1
$$

$$
x_2 = 5 + 6 = 11
$$

**Answer:** $x_1 = -1$ and $x_2 = 11$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The degree of an equation"
- The **highest exponent** of the variable determines the degree.
- $x^2 + 7 = 11$ is a **quadratic equation**,
  $x^3 - 8 = 1$ a **cubic equation**.
- If they contain only **one** variable term, they are called **simple**.
:::

::: sampunkt "Simple quadratic equations"
- $x^2 = a$ has the solutions $x = \pm\sqrt{a}$ if $a \geq 0$.
- **Do not forget the negative solution.** It is the most common mistake.
- If $a < 0$ there are no real solutions, since a square can never be
  negative.
:::

::: sampunkt "Simple cubic equations"
- $x^3 = a$ has the solution $x = \sqrt[3]{a}$, for **all** $a$.
- Only **one** solution, and it may well be negative:
  $x^3 = -27$ gives $x = -3$.
:::

::: sampunkt "How to solve"
1. Get the variable term **alone** on one side.
2. Divide away the coefficient.
3. Take the root. An even exponent gives $\pm$, an odd one does not.
:::

::: sampunkt "Geometric application"
- The side of a square from its area: $s = \sqrt{A}$.
- The side of a cube from its volume: $s = \sqrt[3]{V}$.
- Here only the **positive** solution is chosen, since a side cannot
  be negative.
:::
:::

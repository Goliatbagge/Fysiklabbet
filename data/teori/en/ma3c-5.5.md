---
kalla: 9c2c5eed82
id: ma3c-5.5
title: Calculating integrals with digital tools
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.5'
---

# Calculating integrals with digital tools

We can use digital tools, for example Geogebra, to calculate
antiderivatives and definite integrals. Depending on whether you work in
Geogebra's **standard mode** or **CAS mode**, you get either a numerical
approximation or an exact answer.

::: tips "Calculating antiderivatives and integrals in Geogebra"
**Determining an antiderivative** (standard mode)
1. In the input bar, type "Integral" and choose *Integral( Function )*.
2. Enter the function expression, without $f(x) =$.
3. Enter gives an antiderivative.

**Determining all antiderivatives** (CAS mode)
1. In the input bar, type "Integral" and choose *Integral( Function )*.
2. Enter the function expression, without $f(x) =$.
3. Enter gives all antiderivatives, with the constant $c_1$.

**Calculating an integral exactly** (CAS mode)
1. In the input bar, type "Integral" and choose
   *Integral( Function, Start x-Value, End x-Value )*.
2. Enter the function expression, without $f(x)$.
3. Arrow right and type the lower limit of integration.
4. Arrow right and type the upper limit of integration.
5. Enter gives the exact answer.

**Calculating an integral as an approximation** (standard mode)
1. In the input bar, type "Integral" and choose
   *Integral( Function, Start x-Value, End x-Value )*.
2. Enter the function expression, without $f(x)$.
3. Arrow right and type the lower limit of integration.
4. Arrow right and type the upper limit of integration.
5. Enter gives an approximation (approximate value).
:::

So the command *Integral* has several variants depending on what you
enter: with only a function expression it gives an antiderivative, and with two
limits as well it gives the value of the integral. **CAS mode** gives exact answers
(fractions, root expressions) while **standard mode** gives numerical approximations:
choose the mode according to the kind of answer the task asks for.

::: exempel "Example 1: Calculating a definite integral with a digital tool"
**Calculate $\displaystyle\int_1^5 (x^2 - 4)\, dx$ with a digital
tool. Answer<br>a) with an approximation&emsp;&emsp;b) exactly.**

::: handskrift
typ: casintegral
:::

::: textlosning
**a)** In Geogebra's standard mode we type "Integral" and choose
*Integral( Function, Start x-Value, End x-Value )* in the *Integral* menu. In
the input bar we then type "Integral$(x^2 - 4, 1, 5)$" and get
$\displaystyle\int_1^5 (x^2 - 4)\, dx \approx 25.3$.

**Answer:** $\displaystyle\int_1^5 (x^2 - 4)\, dx \approx 25.3$

**b)** We switch to Geogebra's CAS mode. In the input bar we then type,
just as in part a, "Integral$(x^2 - 4, 1, 5)$" and get

$$
\int_1^5 (x^2 - 4)\, dx = \frac{76}{3}
$$

**Answer:** $\dfrac{76}{3}$
:::
:::

::: exempel "Example 2: Determining an antiderivative with a digital tool"
**Give an antiderivative of $f(x) = x^2 - 4$.**

::: handskrift
typ: casprimitiv
:::

::: textlosning
In Geogebra's standard mode we type "Integral" and choose
*Integral( Function )* in the *Integral* menu. In the input bar we then type
"Integral$(x^2 - 4)$" and get

$$
\frac{1}{3}x^3 - 4x
$$

**Answer:** $F(x) = \dfrac{1}{3}x^3 - 4x$ or alternatively
$F(x) = \dfrac{x^3}{3} - 4x$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Two modes in Geogebra"
- **Standard mode** gives numerical approximations with decimals.
- **CAS mode** gives exact answers with fractions and root expressions.
- Choose the mode according to what the task asks for.
:::

::: sampunkt "The command Integral"
- *Integral( Function )* gives an antiderivative.
- The same command in CAS mode gives all antiderivatives, with the constant $c_1$.
- *Integral( Function, Start x-Value, End x-Value )* gives the value of the integral.
:::

::: sampunkt "How to do it"
1. Type "Integral" in the input bar and choose the right variant in the menu.
2. Enter the function expression **without** $f(x) =$.
3. Step right with the arrow key and type the lower and upper limits.
4. Enter gives the answer.
:::

::: sampunkt "Typical example"
- $\int_1^5 (x^2 - 4)\, dx$ gives $\approx 25.3$ in standard mode and $\dfrac{76}{3}$ in CAS mode.
- Integral($x^2 - 4$) gives the antiderivative $\dfrac{x^3}{3} - 4x$.
:::

:::

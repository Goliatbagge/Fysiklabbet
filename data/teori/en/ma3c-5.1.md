---
kalla: 0b4fbc744b
id: ma3c-5.1
title: Antiderivatives
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.1'
---

# Antiderivatives

In earlier sections we have found the derivative $f'(x)$ from an
original function $f(x)$. Now we are going to do the opposite, that is, find
an original function $f(x)$ from its derivative $f'(x)$. Such an
original function of another function is called an **antiderivative**.
An antiderivative is also called a "backwards derivative" or a "primitive function".

::: tips "Notation for antiderivatives"
If we have a function
- $f''(x)$, the antiderivative is written $f'(x)$
- $f'(x)$, the antiderivative is written $f(x)$
- $f(x)$, the antiderivative is written $F(x)$
:::

So for an antiderivative $F(x)$ we have $F'(x) = f(x)$.

So an antiderivative of $f(x) = 2x$ is $F(x) = x^2$, since
when we differentiate $F(x) = x^2$ we get the derivative $f(x) = 2x$ according to our
earlier rules of differentiation. But $F(x) = x^2 + 7$ or
$F(x) = x^2 - 12$ also have the derivative $F'(x) = 2x$. So we have to distinguish between whether we
are to give **one** antiderivative or **all** antiderivatives.

::: tips "Giving one antiderivative or all antiderivatives"
If for $f(x) = 2x$ we are to give
- **one** antiderivative: $F(x) = x^2$
- **all** antiderivatives: $F(x) = x^2 + C$, where
  $C$ is a constant that can stand for any number at all
:::

::: exempel "Example 1: One antiderivative and all antiderivatives"
**For the function $f(x) = 3x^2$, give<br>a) one antiderivative&emsp;&emsp;b) all antiderivatives**

::: handskrift
typ: enprimitiv
:::

::: textlosning
**a)** If we differentiate $F(x) = x^3$ we get $f(x) = 3x^2$ according to
the rules of differentiation. So $F(x) = x^3$ is an antiderivative.

**Answer:** $F(x) = x^3$

**b)** We take the answer to part a and add the general constant
$C$.

**Answer:** $F(x) = x^3 + C$
:::
:::

Sometimes it is easy to see what the antiderivative is. Sometimes it is
harder. Then there are three methods that always work, depending on whether we have a
power function, a constant function or an exponential function. At this
level we will only find antiderivatives of
exponential functions with base $e$.

## Determining antiderivatives

::: formel "Determining antiderivatives"
| Function | Getting an antiderivative (in words) | Getting an antiderivative (with a formula) |
| --- | --- | --- |
| Power function ($x$ in the base) | Increase the exponent by 1 and divide by the new exponent. | $f(x) = x^n$<br>$F(x) = \dfrac{x^{n+1}}{n+1}$ |
| Constant function (a number) | Multiply the constant by $x$. | $f(x) = k$<br>$F(x) = kx$ |
| Exponential function ($x$ in the exponent) with base $e$ | Copy the function and divide by the coefficient (the number) in front of the variable (usually $x$) in the exponent. | $f(x) = e^{kx}$<br>$F(x) = \dfrac{e^{kx}}{k}$ |
:::

::: exempel "Example 2: Determine an antiderivative"
**Determine an antiderivative of<br>a)&nbsp;$f(x) = 5$&emsp;&emsp;b)&nbsp;$f(x) = 14x^2 - 3$&emsp;&emsp;c)&nbsp;$f(x) = e^{4x}$**

::: handskrift
typ: bestamprimitiv
:::

::: textlosning
**a)** We have a constant function, so we multiply the constant by $x$
and get $F(x) = 5x$. (Since we only need to find one antiderivative and
not all of them, we do not need to add the constant $C$.)

**Answer:** $F(x) = 5x$

**b)** We have a function with several terms and then find an antiderivative
of each term separately. The term $14x^2$ is a power term ($x$ in
the base) where we increase the exponent by 1 and divide by the new
exponent. We then get $\dfrac{14x^3}{3}$. The term $-3$ is a constant term
which we multiply by $x$. We then get $-3x$. If we add these together
we get the antiderivative

$$
F(x) = \frac{14x^3}{3} - 3x
$$

**Answer:** $F(x) = \dfrac{14x^3}{3} - 3x$

**c)** We have an exponential function ($x$ in the exponent) and must then copy
the function and then divide by the coefficient (the number) in front of $x$ in
the exponent. In this case the coefficient is 4, so we divide by 4 and
then get

$$
F(x) = \frac{e^{4x}}{4}
$$

**Answer:** $F(x) = \dfrac{e^{4x}}{4}$
:::
:::

::: exempel "Example 3: Determine all antiderivatives"
**Determine all antiderivatives of<br>a)&nbsp;$f(x) = 6x$&emsp;&emsp;b)&nbsp;$f(x) = 6e^{3x}$**

::: handskrift
typ: samtligaprim3c
:::

::: textlosning
**a)** We have a power function ($x$ in the base) and must then increase the exponent by
1 and divide by the new exponent. Since we want all
antiderivatives, we add the constant $C$ at the end. We then get

$$
F(x) = \frac{6x^2}{2} + C = 3x^2 + C
$$

**Answer:** $F(x) = 3x^2 + C$

**b)** We have an exponential function ($x$ in the exponent) and must then copy
the function and divide by the coefficient (the number) in front of $x$ in
the exponent. Since we want all antiderivatives, we add
the constant $C$ at the end. We then get

$$
F(x) = \frac{6e^{3x}}{3} + C = 2e^{3x} + C
$$

**Answer:** $F(x) = 2e^{3x} + C$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Antiderivative"
- An **antiderivative** is an original function of a given derivative, that is, a backwards derivative.
- For $F(x)$ we have $F'(x) = f(x)$.
- Notation: $f(x)$ has the antiderivative $F(x)$, and $f'(x)$ has $f(x)$.
:::

::: sampunkt "One or all"
- **One** antiderivative of $f(x) = 2x$ is $F(x) = x^2$.
- **All** antiderivatives are $F(x) = x^2 + C$, where $C$ is an arbitrary constant.
- The reason is that a constant term disappears when you differentiate. Always read the question carefully before you add $C$.
:::

::: sampunkt "Three rules"
- **Power function** $f(x) = x^n$: increase the exponent by 1 and divide by the new exponent, $F(x) = \dfrac{x^{n+1}}{n+1}$.
- **Constant function** $f(x) = k$: multiply by $x$, so $F(x) = kx$.
- **Exponential function** $f(x) = e^{kx}$: copy the function and divide by the coefficient in the exponent, $F(x) = \dfrac{e^{kx}}{k}$.
:::

::: sampunkt "Several terms"
- Find an antiderivative of **each term separately** and add them together.
- $14x^2 - 3$ gives $\dfrac{14x^3}{3} - 3x$.
- $6e^{3x}$ gives $\dfrac{6e^{3x}}{3} = 2e^{3x}$.
- Check the answer by differentiating back.
:::

:::

---
kalla: 0625bf0c87
id: ma3c-3.4
title: The derivative of eˣ
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.4'
---

# The derivative of eˣ

A function where the variable, for example $x$, is in the exponent is called an
**exponential function**, for example $f(x) = 2^x$ or more generally
$f(x) = a^x$. In this section we investigate the derivative of the general
exponential function $f(x) = a^x$ using the definition of the derivative, and
discover along the way why a special number, the number $e$, makes differentiating
exponential functions very simple.

## Derivation of the derivative of aˣ

::: härledning "The derivative of $f(x) = a^x$ with the definition of the derivative"
$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
= \lim_{h \to 0} \frac{a^{x+h} - a^x}{h}
= \lim_{h \to 0} \frac{a^x \cdot a^h - a^x}{h}
= \lim_{h \to 0} \frac{a^x(a^h - 1)}{h}
= \lim_{h \to 0} a^x \cdot \frac{a^h - 1}{h}
$$

Since $a^x$ does not depend on $h$, we can move that factor in front of
the limit, so

$$
f'(x) = a^x \cdot \lim_{h \to 0} \frac{a^h - 1}{h}
$$

We cannot cancel the $h$ in the denominator, so the limit is hard to
calculate directly. We call the limit $k$:

$$
\lim_{h \to 0} \frac{a^h - 1}{h} = k \quad \Longrightarrow \quad f'(x) = a^x \cdot k
$$

We now investigate the value of $k$ by calculating the quotient
$\dfrac{a^h - 1}{h}$ for a few different bases $a$, with a value of $h$ that
is very close to 0.

| $\dfrac{2^h - 1}{h}$ | $\dfrac{3^h - 1}{h}$ | $\dfrac{100^h - 1}{h}$ |
| --- | --- | --- |
| 0.693… | 1.099… | 4.606… |

So the limit $k$ varies depending on which base $a$ we have:

- $k \approx 0.69$ if $a = 2$
- $k \approx 1.10$ if $a = 3$
- $k \approx 4.61$ if $a = 100$

**Conclusion:** the derivative of $f(x) = a^x$ is $f'(x) = a^x \cdot k$, where $k$
varies depending on the number $a$.
:::

According to the investigation above, there must be a number between $a = 2$ and
$a = 3$ where $k = 1$, since $k \approx 0.69$ when $a = 2$ and
$k \approx 1.10$ when $a = 3$. For that number the derivative becomes very simple!
We call this number $e$.

Investigate for yourself: drag the slider for $a$ in the graph below and see how the
steepness of the curve changes. Around $a \approx 2.7$ the slope of the curve at the point
$x = 0$ is close to 1. That is exactly the base we are looking for.

::: graf
titel: f(x) = a^x
uttryck: a^x
ekvation: f(x) = {a}^x
a: 2.7, 1.2, 4, 0.1
x: -2, 2
y: -1, 8
:::

## The number e

::: härledning "How large is the number e?"
For small values of $h$, $\dfrac{e^h - 1}{h} \approx 1$. We can then
rewrite the expression step by step to solve for $e$.

$$
\begin{aligned}
\frac{e^h - 1}{h} &\approx 1 \\
e^h - 1 &\approx h \\
e^h &\approx h + 1 \\
e &\approx (h+1)^{1/h}
\end{aligned}
$$

We investigate what $(h+1)^{1/h}$ becomes as $h$ gets closer and closer to 0.

| $h$ | 0.1 | 0.01 | 0.001 | 0.0001 | 0.00001 |
| --- | --- | --- | --- | --- | --- |
| $(h+1)^{1/h}$ | 2.5937… | 2.7048… | 2.7169… | 2.7181… | 2.7182… |

We see that the number $e$ is approximately equal to 2.72.
:::

The number $e$ is, just like $\pi$, an irrational number: it cannot be
written as the quotient of two integers, and has an infinite decimal expansion that
does not repeat.

$$
e = 2.718\ldots \approx 2.72
$$

We had in the derivation earlier that the function $f(x) = a^x$ has the derivative
$f'(x) = a^x \cdot k$. If we substitute $a = e$ and $k = 1$ we get that
the function $f(x) = e^x$ has the derivative

$$
f'(x) = e^x \cdot 1 = e^x
$$

So the function $e^x$ is its own derivative! Graphically this means that
the value of the function (the $y$-coordinate) at every point is the same as the slope
of the curve there. The slope is 1 where $y = 1$, the slope is 2 where $y = 2$, and so
on.

::: formel "The derivative of $f(x) = e^x$"
The derivative of $f(x) = e^x$ is

$$
f'(x) = e^x
$$

If the function has a coefficient in front, $f(x) = ae^x$, the coefficient is kept
unchanged when differentiating:

$$
f'(x) = ae^x
$$

where the constant $e \approx 2.72$.
:::

::: exempel "Example 1: Differentiating exponential functions"
**Differentiate<br>a)&nbsp;$f(x) = e^x$&emsp;&emsp;b)&nbsp;$f(x) = 3e^x$&emsp;&emsp;c)&nbsp;$f(x) = e - e^x$**

::: handskrift
typ: derivexp
:::

::: textlosning
**a)** The function is its own derivative, so

$$
f'(x) = e^x
$$

**b)** Just as with all other functions, the coefficient in front of
the term is kept when differentiating. So here too the function is its own derivative, with
the coefficient 3 remaining:

$$
f'(x) = 3e^x
$$

**c)** Remember that $e$ is a number, that is a constant. If we differentiate it as
a term of its own, it becomes 0. Otherwise we differentiate term by term just as
before:

$$
f'(x) = 0 - e^x = -e^x
$$

**Answer:** a) $f'(x) = e^x$&emsp;&emsp;b) $f'(x) = 3e^x$&emsp;&emsp;c) $f'(x) = -e^x$
:::
:::

::: exempel "Example 2: Determine the value of the derivative"
**The function is $f(x) = \dfrac{5x^3}{3} + 3e^x$. Determine<br>a)&nbsp;$f'(0)$&emsp;&emsp;b)&nbsp;$f'(2)$**

::: handskrift
typ: derivexpvarde
:::

::: textlosning
Round and answer to one decimal place.

**a)** We differentiate $f(x) = \dfrac{5x^3}{3} + 3e^x$ term by term. The
rational term we differentiate with the earlier rules of differentiation, and
$3e^x$ is its own derivative (with the coefficient 3 remaining):

$$
f'(x) = \frac{15x^2}{3} + 3e^x = 5x^2 + 3e^x
$$

Then we substitute $x = 0$. Remember that $e^0 = 1$:

$$
f'(0) = 5 \cdot 0^2 + 3e^0 = 0 + 3 \cdot 1 = 3
$$

**Answer:** $f'(0) = 3$

**b)** From part a) we have $f'(x) = 5x^2 + 3e^x$. We substitute $x = 2$:

$$
f'(2) = 5 \cdot 2^2 + 3e^2 = 20 + 3e^2
$$

There is a key for the number $e$ on your calculator: find it and calculate
$20 + 3e^2$.

$$
f'(2) = 42.167\ldots \approx 42.2
$$

**Answer:** $f'(2) \approx 42.2$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Exponential function"
- In an **exponential function** the variable is in the exponent, for example $f(x) = a^x$.
- The definition of the derivative gives $f'(x) = a^x \cdot k$, where $k$ depends on the base $a$.
- $k \approx 0.69$ for $a = 2$ and $k \approx 1.10$ for $a = 3$.
:::

::: sampunkt "The number e"
- Between 2 and 3 there is a base where $k = 1$. It is called $e$.
- $e = 2.718\ldots \approx 2.72$ and is irrational, just like $\pi$.
- The number is obtained from $(h+1)^{1/h}$ as $h$ tends to 0.
:::

::: sampunkt "The rule of differentiation"
- $f(x) = e^x$ gives $f'(x) = e^x$. The function is **its own derivative**.
- $f(x) = ae^x$ gives $f'(x) = ae^x$. The coefficient is kept.
- Graphically: the slope of the curve at a point is equal to its $y$-value there.
:::

::: sampunkt "Common pitfalls"
- $e$ on its own is a **number**, that is a constant. As a term of its own it is differentiated to 0.
- $e - e^x$ therefore gives $-e^x$.
- $e^0 = 1$, which is needed when substituting $x = 0$.
- Use the $e$ key on the calculator and round only in the last step.
:::

:::

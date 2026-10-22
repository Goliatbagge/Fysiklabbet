---
kalla: d2083d2124
id: ma3c-3.1
title: The derivative of simple power functions
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.1'
---

# The derivative of simple power functions

To avoid having to use the definition of the derivative every time a derivative is to be
calculated, we try to find simple **rules of differentiation**. We investigate
the derivative with the definition of the derivative for a few simple power functions.

Remember: the definition of the derivative

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

If we investigate the derivative in that way for the power functions $x$, $x^2$,
$x^3$ and so on (the derivations are in the formula box below), we get

| $f(x)$ | $x$ | $x^2$ | $x^3$ | $x^4$ | $x^5$ |
| --- | --- | --- | --- | --- | --- |
| $f'(x)$ | $1$ | $2x$ | $3x^2$ | $4x^3$ | $5x^4$ |

We see that the derivative follows a pattern. When we differentiate a power function,
**the exponent is multiplied down** in front at the same time as **the exponent
is reduced by 1**.

::: formel "The derivative of $f(x) = x^n$"
$$
f(x) = x^n \quad\Rightarrow\quad f'(x) = nx^{n-1}
$$

::: härledning "The derivative of $f(x) = x$ with the definition of the derivative"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \\
&= \lim_{h \to 0} \frac{(x+h) - x}{h} \\
&= \lim_{h \to 0} \frac{h}{h} = \lim_{h \to 0} 1 = 1
\end{aligned}
$$

So $f(x) = x$ has the derivative $f'(x) = 1$.
:::

::: härledning "The derivative of $f(x) = x^2$ with the definition of the derivative"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} \\
&= \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h} = \lim_{h \to 0} \frac{2xh + h^2}{h} \\
&= \lim_{h \to 0} \frac{h(2x + h)}{h} = \lim_{h \to 0} (2x + h) = 2x
\end{aligned}
$$

So $f(x) = x^2$ has the derivative $f'(x) = 2x$.
:::
:::

## The derivative with a coefficient

We investigate what the derivative is for functions with a coefficient in front of
the power. It turns out that the same pattern still holds! We
multiply the exponent down into the coefficient in front, at the same time as we
reduce the exponent by 1, that is

$$
f(x) = 3x^2 \quad\Rightarrow\quad f'(x) = 2 \cdot 3x^{2-1} = 6x
$$

::: formel "The derivative of $f(x) = kx^n$"
$$
f(x) = kx^n \quad\Rightarrow\quad f'(x) = nkx^{n-1}
$$

::: härledning "The derivative of $f(x) = 3x^2$ with the definition of the derivative"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{3(x+h)^2 - 3x^2}{h} \\
&= \lim_{h \to 0} \frac{3x^2 + 6xh + 3h^2 - 3x^2}{h} = \lim_{h \to 0} \frac{6xh + 3h^2}{h} \\
&= \lim_{h \to 0} \frac{3h(2x + h)}{h} = \lim_{h \to 0} 3(2x + h) = 3(2x + 0) = 6x
\end{aligned}
$$

So $f(x) = 3x^2$ has the derivative $f'(x) = 6x$.
:::
:::

A consequence of this rule is that when $x$ terms of degree 1 are differentiated,
the $x$ "disappears".

::: formel "The derivative of $f(x) = kx$"
$$
f(x) = kx \quad\Rightarrow\quad f'(x) = k
$$
:::

Another consequence of the rule is that when we differentiate functions with a
constant (a number) in the denominator, the numerator is differentiated according to the usual
rules of differentiation while **the denominator is kept**. This is because a
constant denominator can be seen as a coefficient: the function
$f(x) = \dfrac{x^2}{3}$ can, for example, be written $f(x) = \dfrac{1}{3}x^2$,
and when differentiating, the coefficient $\dfrac{1}{3}$ is kept.

::: formel "The derivative of $f(x) = \dfrac{g(x)}{a}$"
$$
f(x) = \frac{g(x)}{a} \quad\Rightarrow\quad f'(x) = \frac{g'(x)}{a}
$$
:::

## The derivative of constant functions

Finally we investigate what the derivative of constant functions is, that is
functions without any $x$ term at all.

::: formel "The derivative of $f(x) = a$"
The derivative of a constant function $f(x) = a$, where $a$ is a number, is

$$
f'(x) = 0
$$

::: härledning "The derivative of $f(x) = 5$ with the definition of the derivative"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \\
&= \lim_{h \to 0} \frac{5 - 5}{h} = \lim_{h \to 0} \frac{0}{h} = \lim_{h \to 0} 0 = 0
\end{aligned}
$$

So $f(x) = 5$ has the derivative $f'(x) = 0$. This holds whatever
constant function we have: the slope is 0 for all constant
functions, since the graph is a horizontal line.
:::
:::

::: formel "Summary: rules of differentiation"
$$
\begin{array}{ll}
f(x) = x^n & f'(x) = nx^{n-1} \\[6pt]
f(x) = kx^n & f'(x) = nkx^{n-1} \\[6pt]
f(x) = kx & f'(x) = k \\[6pt]
f(x) = a & f'(x) = 0 \\[6pt]
f(x) = \dfrac{g(x)}{a} & f'(x) = \dfrac{g'(x)}{a}
\end{array}
$$
:::

::: tips "Differentiating and determining the value of the derivative at a point"
1. Determine $f'(x)$ with the rules of differentiation.
2. Then substitute $x = a$ into the derivative function and determine $f'(a)$.
:::

::: exempel "Example 1: Differentiating with the rules of differentiation"
**Differentiate<br>a)&nbsp;$f(x) = x^7$&emsp;&emsp;b)&nbsp;$y = 3x^5$&emsp;&emsp;c)&nbsp;$f(x) = 27$&emsp;&emsp;d)&nbsp;$g(x) = 12x$&emsp;&emsp;e)&nbsp;$f(x) = \dfrac{x^4}{5}$<br>f)&nbsp;$f(x) = \dfrac{9\pi^{e}\left(4 + \ln 90\right)^{\sqrt{2}}}{5\ln 2 - \sqrt{e} + 8\pi}$**

::: handskrift
typ: derivregler
:::

::: textlosning
**a)** We multiply down the exponent 7 and then reduce it by 1.

$$
f'(x) = 7x^6
$$

**Answer:** $f'(x) = 7x^6$

**b)** We multiply down the exponent 5 and then reduce it by 1.

$$
y' = 5 \cdot 3x^4 = 15x^4
$$

**Answer:** $y' = 15x^4$

**c)** The derivative of a constant function is 0.

$$
f'(x) = 0
$$

**Answer:** $f'(x) = 0$

**d)** When we differentiate an $x$ term of degree 1, the $x$ "disappears".

$$
g'(x) = 12
$$

**Answer:** $g'(x) = 12$

**e)** We differentiate the numerator with the rules of differentiation and keep
the denominator.

$$
f'(x) = \frac{4x^3}{5}
$$

**Answer:** $f'(x) = \dfrac{4x^3}{5}$

**f)** The expression looks daunting, but look for the variable: there is
no $x$ anywhere in it. Every part is a number. $\pi$, $e$, $\sqrt{2}$,
$\ln 2$ and $\ln 90$ are all fixed numbers, however complicated they may look to
work out, and a number raised to a number is also a number. So the whole
expression is a single number, and $f$ is a constant function. The graph
is a horizontal line with the slope 0, whichever $x$ we choose.

$$
f'(x) = 0
$$

**Answer:** $f'(x) = 0$
:::
:::

::: exempel "Example 2: The value of the derivative at a point"
**Determine $f'(3)$ for $f(x) = 4x^2$.**

::: handskrift
typ: derivvarde
:::

::: textlosning
We first determine $f'(x)$ with the rules of differentiation and then substitute
$x = 3$ into the derivative.

$$
f'(x) = 8x
$$

$$
f'(3) = 8 \cdot 3 = 24
$$

**Answer:** $f'(3) = 24$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The power rule"
- $f(x) = x^n$ gives $f'(x) = nx^{n-1}$.
- In words: **multiply the exponent down** in front and **reduce the exponent by 1**.
- $x^7$ is differentiated to $7x^6$.
:::

::: sampunkt "With a coefficient"
- $f(x) = kx^n$ gives $f'(x) = nkx^{n-1}$. The coefficient comes along.
- $3x^5$ is differentiated to $15x^4$.
- $f(x) = kx$ gives $f'(x) = k$. With degree 1, the $x$ disappears.
:::

::: sampunkt "Constants and constant denominators"
- $f(x) = a$ gives $f'(x) = 0$. A horizontal line has the slope 0.
- If the expression has no $x$, it is a constant, however complicated it looks.
- $f(x) = \dfrac{g(x)}{a}$ gives $f'(x) = \dfrac{g'(x)}{a}$. Differentiate the numerator, keep the denominator.
- The reason is that $\dfrac{x^2}{3}$ is the same thing as $\dfrac{1}{3}x^2$, that is a coefficient.
:::

::: sampunkt "The value of the derivative at a point"
1. Determine $f'(x)$ with the rules of differentiation.
2. Substitute $x = a$ into the derivative.
- For $f(x) = 4x^2$ we get $f'(x) = 8x$ and $f'(3) = 24$.
:::

:::

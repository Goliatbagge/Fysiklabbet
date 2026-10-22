---
kalla: 486cafd6aa
id: ma3c-3.3
title: More about the derivative of power functions
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.3'
---

# More about the derivative of power functions

We have previously shown that $f(x) = x^n$ has the derivative
$f'(x) = nx^{n-1}$ where $n$ is a positive integer. We investigate whether
the rule of differentiation also holds for exponents that are not positive integers:
partly exponents that are not integers at all, partly exponents that are
**negative**. (The investigations are given as derivations in the formula box
below.)

## The power rule for all real exponents

Both investigations confirm the same thing: the simple rule
of differentiation (multiply the exponent down and reduce it by 1) holds not
only for positive integer exponents, but for **all** real exponents.

::: formel "The derivative of power functions"
The derivative of

$$
f(x) = x^a
$$

is

$$
f'(x) = ax^{a-1}
$$

for all real numbers $a$ (if $x > 0$).

::: härledning "The derivative of $f(x) = x^{1/2}$, that is of $f(x) = \sqrt{x}$, with the definition of the derivative"
If the usual rule (multiply the exponent down and reduce it by 1)
also holds for this type of function, then

$$
f'(x) = \frac{1}{2}x^{-1/2} = \frac{1}{2x^{1/2}} = \frac{1}{2\sqrt{x}}
$$

We investigate whether this really is so with the definition of the derivative.

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{\sqrt{x+h} - \sqrt{x}}{h}
$$

We expand the fraction by the conjugate of the numerator to get rid of
the root signs.

$$
f'(x) = \lim_{h \to 0} \frac{(\sqrt{x+h} - \sqrt{x})(\sqrt{x+h} + \sqrt{x})}{h(\sqrt{x+h} + \sqrt{x})} = \lim_{h \to 0} \frac{x + h - x}{h(\sqrt{x+h} + \sqrt{x})}
$$

$$
= \lim_{h \to 0} \frac{h}{h(\sqrt{x+h} + \sqrt{x})} = \lim_{h \to 0} \frac{1}{\sqrt{x+h} + \sqrt{x}} = \frac{1}{\sqrt{x} + \sqrt{x}} = \frac{1}{2\sqrt{x}}
$$

So the simple rules of differentiation also hold for exponents other than
integers!
:::

::: härledning "The derivative of $f(x) = x^{-1}$, that is of $f(x) = \dfrac{1}{x}$, with the definition of the derivative"
If the usual rule also holds for this function, then
$f'(x) = -x^{-2}$, that is $f'(x) = -\dfrac{1}{x^2}$.

We investigate whether this really is so with the definition of the derivative.

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{\dfrac{1}{x+h} - \dfrac{1}{x}}{h}
$$

We expand the fractions in the numerator by each other's denominators to get a common denominator
and simplify.

$$
f'(x) = \lim_{h \to 0} \frac{\dfrac{x}{x(x+h)} - \dfrac{x+h}{x(x+h)}}{h} = \lim_{h \to 0} \frac{\dfrac{x - (x+h)}{x(x+h)}}{h} = \lim_{h \to 0} \frac{\dfrac{-h}{x(x+h)}}{h}
$$

$$
= \lim_{h \to 0} \frac{-h}{h \cdot x(x+h)} = \lim_{h \to 0} \frac{-1}{x(x+h)} = \frac{-1}{x \cdot x} = -\frac{1}{x^2}
$$

So the simple rules of differentiation also hold for negative exponents!
:::
:::

To be able to use the rule, the expression must be rewritten as a pure power
$x^a$ before we differentiate: variables under a root sign or in a denominator
are therefore first rewritten as a power with a fractional or negative exponent.

::: tips "Differentiating variables under the root sign or in the denominator"
If we are to differentiate a function that contains variables (for example $x$) under
the root sign or in a denominator, the easiest way is to

1. rewrite the term as a power and simplify,
2. and then differentiate as usual.
:::

::: formel "Differentiating expressions with the variable in both numerator and denominator"
When we have the variable, for example $x$, in both the numerator and the denominator, the easiest way to
differentiate the function is to split the fraction into several terms and then
differentiate term by term.
:::

::: exempel "Example 1: Differentiating power expressions"
**Differentiate**

::: handskrift
typ: derivpotenser
:::

::: textlosning
$$
\text{a)}\ f(x) = \frac{3}{x} \qquad
\text{b)}\ f(x) = \frac{1}{5x} \qquad
\text{c)}\ f(x) = \frac{4x - 7}{x}
$$

$$
\text{d)}\ f(x) = \sqrt{x} + \sqrt[3]{x} \qquad
\text{e)}\ f(x) = x\sqrt{x} \qquad
\text{f)}\ f(x) = \frac{8}{\sqrt{x}}
$$

**a)** We have the variable in the denominator and therefore first rewrite
the function expression as a power.

$$
f(x) = \frac{3}{x} = \frac{3}{x^1} = 3x^{-1}
$$

Then we differentiate "as usual" by multiplying the exponent down
and reducing it by 1.

$$
f'(x) = -3x^{-2} = -\frac{3}{x^2}
$$

**Answer:** $f'(x) = -3x^{-2}$ or $f'(x) = -\dfrac{3}{x^2}$

**b)** Once again we have $x$ in the denominator. We "move up" $x$ to the numerator
at the same time as we change the sign of the exponent (the five stays in
the denominator). Then we can differentiate as usual.

$$
f(x) = \frac{1}{5x} = \frac{1}{5x^1} = \frac{x^{-1}}{5}
$$

$$
f'(x) = \frac{-x^{-2}}{5} = -\frac{1}{5x^2}
$$

**Answer:** $f'(x) = -\dfrac{x^{-2}}{5}$ or $f'(x) = -\dfrac{1}{5x^2}$

**c)** Now we have $x$ in both the numerator and the denominator. We split the fraction into two
terms and simplify.

$$
f(x) = \frac{4x - 7}{x} = \frac{4x}{x} - \frac{7}{x} = 4 - 7x^{-1}
$$

Now we differentiate term by term.

$$
f'(x) = -7 \cdot (-1)x^{-2} = 7x^{-2} = \frac{7}{x^2}
$$

**Answer:** $f'(x) = 7x^{-2}$ or $f'(x) = \dfrac{7}{x^2}$

**d)** We first rewrite the roots as powers. Then we differentiate as
usual.

$$
f(x) = \sqrt{x} + \sqrt[3]{x} = x^{1/2} + x^{1/3}
$$

$$
f'(x) = \frac{1}{2}x^{-1/2} + \frac{1}{3}x^{-2/3} = \frac{1}{2x^{1/2}} + \frac{1}{3x^{2/3}} = \frac{1}{2\sqrt{x}} + \frac{1}{3\sqrt[3]{x^2}}
$$

**Answer:** $f'(x) = \dfrac{x^{-1/2}}{2} + \dfrac{x^{-2/3}}{3}$ or
$f'(x) = \dfrac{1}{2\sqrt{x}} + \dfrac{1}{3\sqrt[3]{x^2}}$

**e)** We start by writing $\sqrt{x} = x^{1/2}$ and then simplify with
the laws of exponents.

$$
f(x) = x \cdot x^{1/2} = x^1 \cdot x^{1/2} = x^{1 + 1/2} = x^{3/2}
$$

Then we differentiate as usual.

$$
f'(x) = \frac{3}{2}x^{3/2 - 1} = \frac{3}{2}x^{1/2} = \frac{3}{2}\sqrt{x} = \frac{3\sqrt{x}}{2}
$$

**Answer:** $f'(x) = \dfrac{3}{2}x^{1/2}$ or $f'(x) = \dfrac{3\sqrt{x}}{2}$

**f)** We first rewrite the root as a power.

$$
f(x) = \frac{8}{x^{1/2}}
$$

We then move $x^{1/2}$ up from the denominator at the same time as we change the sign
of the exponent.

$$
f(x) = 8x^{-1/2}
$$

Then we differentiate with the usual rules of differentiation.

$$
f'(x) = -\frac{1}{2} \cdot 8x^{-3/2} = -4x^{-3/2} = -\frac{4}{x^{3/2}} = -\frac{4}{x \cdot x^{1/2}} = -\frac{4}{x\sqrt{x}}
$$

**Answer:** $f'(x) = -4x^{-3/2}$ or $f'(x) = -\dfrac{4}{x\sqrt{x}}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The rule holds for all exponents"
- $f(x) = x^a$ gives $f'(x) = ax^{a-1}$ for **all real** $a$, not just positive integers.
- The definition confirms it: $\sqrt{x}$ gives $\dfrac{1}{2\sqrt{x}}$ and $\dfrac{1}{x}$ gives $-\dfrac{1}{x^2}$.
:::

::: sampunkt "Rewrite as a power first"
1. Rewrite the root or the denominator as a power and simplify.
2. Then differentiate as usual.
- $\sqrt{x} = x^{1/2}$, $\sqrt[3]{x} = x^{1/3}$ and $\dfrac{1}{x} = x^{-1}$.
- If a power is moved from the denominator to the numerator, the exponent changes sign.
:::

::: sampunkt "Variable in both numerator and denominator"
- **Split the fraction** into several terms and differentiate term by term.
- $\dfrac{4x - 7}{x} = 4 - 7x^{-1}$, which gives $f'(x) = 7x^{-2}$.
- A constant in the denominator, such as the five in $\dfrac{1}{5x}$, stays there.
:::

::: sampunkt "Simplify with the laws of exponents"
- $x\sqrt{x} = x^1 \cdot x^{1/2} = x^{3/2}$, which gives $f'(x) = \dfrac{3\sqrt{x}}{2}$.
- $\dfrac{8}{\sqrt{x}} = 8x^{-1/2}$, which gives $f'(x) = -4x^{-3/2}$.
- Answer in the form the task asks for, with a power or with a root sign.
:::

:::

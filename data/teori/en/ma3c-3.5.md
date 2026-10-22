---
kalla: cc9bf685b4
id: ma3c-3.5
title: The derivative of eᵏˣ and aˣ
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.5'
---

# The derivative of eᵏˣ and aˣ

We have seen that the derivative of $f(x) = e^x$ is $f'(x) = e^x$, or even more
generally that the derivative of $f(x) = ae^x$ is $f'(x) = ae^x$: the functions
are their own derivatives.

Now we investigate the derivative of an exponential function with a coefficient in
the exponent, $f(x) = e^{kx}$, using the definition of the derivative.

## A coefficient in the exponent

::: formel "The derivative of $f(x) = e^{kx}$"
If $f(x) = e^{kx}$, then

$$
f'(x) = k \cdot e^{kx}
$$

::: härledning "The derivative of $f(x) = e^{kx}$ with the definition of the derivative"
We investigate the derivative of $f(x) = e^{kx}$ by studying the derivative of
$f(x) = e^{3x}$ with the definition of the derivative.

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
= \lim_{h \to 0} \frac{e^{3(x+h)} - e^{3x}}{h}
= \lim_{h \to 0} \frac{e^{3x+3h} - e^{3x}}{h}
= \lim_{h \to 0} \frac{e^{3x} \cdot e^{3h} - e^{3x}}{h}
= \lim_{h \to 0} \frac{e^{3x}(e^{3h} - 1)}{h}
$$

Since the factor $e^{3x}$ does not depend on $h$, it can be moved in front of
the limit, so

$$
f'(x) = e^{3x} \lim_{h \to 0} \frac{e^{3h} - 1}{h}
$$

With a calculator we can show that $\lim\limits_{h \to 0} \dfrac{e^{3h} - 1}{h}$ tends
to 3 as $h$ tends to 0, so

$$
f'(x) = e^{3x} \cdot 3
$$

So $f(x) = e^{3x}$ has the derivative $f'(x) = 3e^{3x}$.

In the same way we can show that, for example, $f(x) = e^{4x}$ has the derivative
$f'(x) = 4e^{4x}$ and that $f(x) = e^{5x}$ has the derivative $f'(x) = 5e^{5x}$.

**Conclusion:** If $f(x) = e^{kx}$, then $f'(x) = ke^{kx}$.
:::
:::

::: exempel "Example 1: Differentiating exponential functions with base e"
**Differentiate<br>
a)&nbsp;$f(x) = 3e^x$&emsp;&emsp;b)&nbsp;$f(x) = e^{4x}$&emsp;&emsp;c)&nbsp;$f(x) = 2e^{5x}$&emsp;&emsp;d)&nbsp;$f(x) = 12e^{x/3}$**

::: handskrift
typ: derivexpbas
:::

::: textlosning
**a)** When we differentiate an exponential function with base $e$ **without** a
coefficient in the exponent, the derivative is the same as the function.

**Answer:** $f'(x) = 3e^x$

**b)** When we differentiate an exponential function with base $e$ **with** a
coefficient in the exponent, the derivative is the same, but we multiply by
the coefficient in the exponent.

**Answer:** $f'(x) = 4e^{4x}$

**c)** A coefficient in front of the exponential function is kept when we
differentiate, and we also multiply by the coefficient in the exponent.

$$
f'(x) = 5 \cdot 2e^{5x} = 10e^{5x}
$$

**Answer:** $f'(x) = 10e^{5x}$

**d)** If we instead have a division in the exponent, we divide the coefficient
in front by the same denominator.

$$
f'(x) = \frac{12e^{x/3}}{3} = 4e^{x/3}
$$

**Answer:** $f'(x) = 4e^{x/3}$
:::
:::

Now we have rules of differentiation for all exponential functions with base $e$.
But what holds for the derivative of an exponential function with a base other than
$e$, for example $f(x) = 2^x$ or $f(x) = 3^{5x}$?

To find out, we first need to review base-ten logarithms and introduce a
new logarithm.

## The natural logarithm

::: härledning "Base-ten logarithms (review) and the natural logarithm"
The base-ten logarithm is written $\log_{10}$ or abbreviated **lg**.

$\lg 100$ is "the number we must raise 10 to for the answer to be 100".
Since $10^2 = 100$, $\lg 100 = 2$.

Since $\lg 100 = 2$,

$$
10^2 = 10^{\lg 100} = 100, \qquad \text{that is} \qquad 10^{\lg 100} = 100
$$

In the same way $10^{\lg 1000} = 1000$ and $10^{\lg 7} = 7$ and so
on.

Now we introduce a new logarithm, the **$e$ logarithm**. It works in exactly the same
way as the base-ten logarithm, but instead has the number $e$ as its base.

The $e$ logarithm is written $\log_e$ or abbreviated **ln** and is called **the
natural logarithm**.

So $\ln 5$ is "the number we must raise $e$ to for the answer to be 5".
Since $e$ is the irrational number $2.718\ldots$, it is hard to
calculate $\ln 5$ in your head. On the calculator there is a key marked "ln" that
gives an approximate value of $\ln 5$. Find it!

$$
\ln 5 \approx 1.61
$$

that is $e^{1.61} \approx 5$. Exactly, we can write $e^{\ln 5} = 5$.

In the same way as for the base-ten logarithm, $e^{\ln 12} = 12$ and so
on.
:::

## Bases other than e

::: formel "The derivative of $f(x) = a^x$"
If $f(x) = a^x$, then

$$
f'(x) = a^x \cdot \ln a
$$

::: härledning "The derivative of $f(x) = a^x$ with a base other than e"
We investigate the derivative of $f(x) = a^x$ with a base other than $e$ by
studying the derivative of $f(x) = 5^x$. We do this by rewriting the base 5
as the base $e$, and then differentiating as usual with the rule for
$f(x) = e^{kx}$.

We rewrite the base 5 as the base $e$ according to the principle $5 = e^{\ln 5}$, so

$$
f(x) = 5^x = (e^{\ln 5})^x = e^{(\ln 5) \cdot x}
$$

Then we differentiate according to the rule of differentiation for $f(x) = e^{kx}$, with
$k = \ln 5$:

$$
f'(x) = \ln 5 \cdot e^{(\ln 5) \cdot x}
$$

We "write back" $e^{\ln 5}$ as 5:

$$
f'(x) = \ln 5 \cdot 5^x
$$

So $f(x) = 5^x$ has the derivative $f'(x) = 5^x \cdot \ln 5$.

In the same way we can show that, for example, $f(x) = 7^x$ has the derivative
$f'(x) = 7^x \cdot \ln 7$ and that $f(x) = 1.14^x$ has the derivative
$f'(x) = 1.14^x \cdot \ln 1.14$.

**Conclusion:** If $f(x) = a^x$, then $f'(x) = a^x \ln a$.
:::
:::

If we put together all the rules of differentiation we have now arrived at for
exponential functions, we can summarise them in a single "cheat sheet" that always
works.

::: tips "Cheat sheet for differentiating exponential functions"
1. Copy the original function. Change nothing.
2. Multiply by the coefficient in front of the variable in the exponent.
3. If the base is something other than $e$, also multiply by $\ln$ of that base.
:::

::: exempel "Example 2: Differentiating exponential functions with a base other than e"
**Differentiate<br>
a)&nbsp;$f(x) = 12^x$&emsp;&emsp;b)&nbsp;$f(x) = 3 \cdot 7^x$&emsp;&emsp;c)&nbsp;$f(x) = 4^{3x}$&emsp;&emsp;d)&nbsp;$f(x) = 5 \cdot 8^{6x}$**

::: handskrift
typ: derivannanbas
:::

::: textlosning
**a)** We have an exponential function, so we first copy the function.
Since we have a base other than $e$, we multiply by $\ln$ of the base,
that is by $\ln 12$.

**Answer:** $f'(x) = 12^x \cdot \ln 12$

**b)** We first copy the function. Since we have a base other than $e$,
we multiply by $\ln 7$. The coefficient in front (3) is kept.

**Answer:** $f'(x) = 3 \cdot 7^x \cdot \ln 7$

**c)** We first copy the function. Since we have a coefficient in
the exponent (3), we multiply by it. Since we have a base other than $e$,
we also multiply by $\ln 4$.

**Answer:** $f'(x) = 3 \cdot 4^{3x} \cdot \ln 4$

**d)** We first copy the function. Since we have a coefficient in
the exponent (6), we multiply by it. Since we have a base other than $e$,
we also multiply by $\ln 8$. The coefficient in front (5) is kept.

$$
f'(x) = 5 \cdot 6 \cdot 8^{6x} \cdot \ln 8 = 30 \cdot 8^{6x} \cdot \ln 8
$$

**Answer:** $f'(x) = 30 \cdot 8^{6x} \cdot \ln 8$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "A coefficient in the exponent"
- $f(x) = e^{kx}$ gives $f'(x) = k \cdot e^{kx}$.
- $2e^{5x}$ gives $10e^{5x}$.
- If the exponent is a fraction, the coefficient in front is divided by the same denominator: $12e^{x/3}$ gives $4e^{x/3}$.
:::

::: sampunkt "The natural logarithm"
- $\ln$ is the $e$ logarithm, that is $\log_e$, and is called the **natural logarithm**.
- $\ln 5$ is the number $e$ must be raised to in order to give 5, so $e^{\ln 5} = 5$.
- $\ln e = 1$, just as $\lg 10 = 1$. The calculator has an ln key.
:::

::: sampunkt "A base other than e"
- $f(x) = a^x$ gives $f'(x) = a^x \cdot \ln a$.
- The proof is based on the rewriting $a = e^{\ln a}$, which gives $a^x = e^{(\ln a)x}$.
- So $5^x$ gives $5^x \cdot \ln 5$.
:::

::: sampunkt "Cheat sheet"
1. Copy the function exactly as it is written.
2. Multiply by the coefficient in front of the variable in the exponent.
3. If the base is anything other than $e$, also multiply by $\ln$ of that base.
- $5 \cdot 8^{6x}$ gives $30 \cdot 8^{6x} \cdot \ln 8$.
:::

:::

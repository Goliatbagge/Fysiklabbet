---
kalla: a072fbbaa2
id: ma2c-5.6
title: Logarithms to other bases
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.6'
---

# Logarithms to other bases

The equation $10^x = 16$ can be solved using "the base-10 logarithm of 16",
which is written $x = \lg 16$.

In the same way, the equation $2^x = 16$ can be solved with "the base-2 logarithm
of 16", which is written $x = \log_2 16$.

::: formel "General logarithms"
The equation $a^x = b$ has the solution

$$
x = \log_a b
$$
:::

The earlier laws of logarithms and relationships also apply to bases other
than 10. In the same way as $10^{\lg 3} = 3$, we have
$7^{\log_7 3} = 3$ and $5^{\log_5 12} = 12$ and so on.

("The base-10 logarithm" can also be written $\log_{10}$, but since it is so
common the shortened notation "lg" is used.)

::: exempel "Example 1: Solve with a general logarithm"
**Solve $3^x = 25$.**

::: handskrift
typ: generelllogaritm
:::

::: textlosning
According to the definition of general logarithms, the solution is "the base-3 logarithm
of 25":

$$
x = \log_3 25
$$

**Answer:** $x = \log_3 25$
:::
:::

::: exempel "Example 2: Determine without a calculator"
**Determine without a calculator<br>a)&nbsp;$\log_2 16$&emsp;&emsp;b)&nbsp;$\log_3 9$**

::: handskrift
typ: logannanbas
:::

::: textlosning
**a)** $\log_2 16$ can be interpreted as "what 2 must be raised to in order to give
16". Since $2^4 = 16$, we have $\log_2 16 = 4$.

**Answer:** 4

**b)** $\log_3 9$ can be interpreted as "what 3 must be raised to in order to give 9".
Since $3^2 = 9$, we have $\log_3 9 = 2$.

**Answer:** 2
:::
:::

::: exempel "Example 3: Write as a power"
**Write 24 as a power with base 3.**

::: handskrift
typ: skrivpotens
:::

::: textlosning
The number that 3 must be raised to in order to give 24 is (by definition)
$\log_3 24$. So

$$
3^{\log_3 24} = 24
$$

**Answer:** $3^{\log_3 24}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Logarithm to any base"
- The equation $a^x = b$ has the solution $x = \log_a b$.
- $\log_a b$ is read "the base-$a$ logarithm of $b$" and means: what $a$ must be raised to in order to give $b$.
- So $3^x = 25$ has the solution $x = \log_3 25$.
:::

::: sampunkt "Notation"
- The common logarithm can be written $\log_{10}$, but is almost always shortened to $\lg$.
- The base is written as a subscript: $\log_2 16$, $\log_5 12$.
:::

::: sampunkt "Basic relationship and laws"
- $a^{\log_a b} = b$, just as $10^{\lg a} = a$. Example: $7^{\log_7 3} = 3$.
- The laws of logarithms and the earlier relationships apply to all bases, not just 10.
- So every number can be written as a power with a chosen base: 24 with base 3 becomes $3^{\log_3 24}$.
:::

::: sampunkt "Mental arithmetic"
- Ask: which exponent turns the base into the number?
- $\log_2 16 = 4$ because $2^4 = 16$.
- $\log_3 9 = 2$ because $3^2 = 9$.
:::

:::

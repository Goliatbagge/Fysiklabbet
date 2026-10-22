---
kalla: ece3f06a0e
id: ma1c-3.2
title: Change factor
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.2'
---

# Change factor

A factor that states how much something has changed is called a
**change factor** and can be used to quickly calculate new values
in percentage changes.

::: formel "Change factor, new and old value"
$$
\begin{gathered}
\text{change factor} = \frac{\text{new value}}{\text{old value}}
\\[0.7em]
\Longleftrightarrow
\\[0.7em]
\text{new value} = \text{change factor} \cdot \text{old value}
\\[0.7em]
\Longleftrightarrow
\\[0.7em]
\text{old value} = \frac{\text{new value}}{\text{change factor}}
\end{gathered}
$$
:::

So we can get the new value with a single simple calculation if we know
the change factor. If we instead know the new value and the change factor,
we get the old value by dividing the new value by
the change factor.

::: formel "Finding the change factor"
The change factor is obtained by adding the change in percentage form
to 100 % (100 % stands for what we have from the start) and then converting to
decimal form. You can also add the change in decimal form directly to 1,
since 100 % = 1.
:::

Examples:

| Change | Change factor (percentage form) | Change factor (decimal form) |
| --- | --- | --- |
| + 5 % | 100 % + 5 % = 105 % | 1 + 0.05 = 1.05 |
| + 27 % | 100 % + 27 % = 127 % | 1 + 0.27 = 1.27 |
| + 140 % | 100 % + 140 % = 240 % | 1 + 1.40 = 2.40 |
| − 4 % | 100 % − 4 % = 96 % | 1 − 0.04 = 0.96 |
| − 25 % | 100 % − 25 % = 75 % | 1 − 0.25 = 0.75 |

The change factor is always a number that is **greater than or equal to 0**.
A value can at most decrease by 100 %, and then the change factor becomes
$1 - 1 = 0$. So there is no such thing as a negative change factor.

Sometimes we compare two values in percentage terms, and then it is not always
obvious what is the "new value" and the "old value".

::: formel "Comparisons"
In comparisons, what we COMPARE WITH corresponds to the old value.
:::

::: exempel "Example 1: Price reduction"
**A used car costs 72 000 kr and is then reduced in price by 8 %.
What is the new price? Solve using a change factor.**

::: handskrift
typ: prissankning
:::

::: textlosning
The change factor is

$$
100\ \% - 8\ \% = 92\ \% = 0.92
$$

New value:

$$
\text{new value} = \text{change factor} \cdot \text{old value}
= 0.92 \cdot 72\,000\ \mathrm{kr} = 66\,240\ \mathrm{kr}
$$

**Answer:** 66 240 kr
:::
:::

::: exempel "Example 2: How large is the increase?"
**A price increases from 175 kr to 231 kr. What percentage price increase
does that correspond to?**

::: handskrift
typ: prisokning
:::

::: textlosning
We find the price increase with a single calculation by finding
the change factor:

$$
\text{change factor} = \frac{\text{new value}}{\text{old value}}
= \frac{231}{175} = 1.32 = 132\ \%
$$

We compare the change factor with 100 %. So the price has increased by
$(132\ \% - 100\ \%) = 32\ \%$.

**Answer:** 32 %
:::
:::

::: exempel "Example 3: Comparing two shops"
**Shop A sells a bar of chocolate for 18 kr. Shop B sells an identical
bar of chocolate for 22 kr. By what percentage is<br>a) the chocolate bar in
shop B more expensive compared with shop A?<br>b) the chocolate bar in shop A cheaper
compared with shop B?**

::: handskrift
typ: jamforbutik
:::

::: textlosning
**a)** We solve the task with a change factor. We *compare with shop A*,
so A's price (18 kr) is in the denominator. It works as the "old value" in
the formula:

$$
\text{change factor} = \frac{\text{price B}}{\text{price A}}
= \frac{22}{18} = 1.222\ldots \approx 1.22 = 122\ \%
\ \Longrightarrow\ 22\ \%\ \text{more expensive}
$$

**Answer:** 22 % more expensive.

**b)** Now we *compare with shop B*, so B's price (22 kr) is in the denominator:

$$
\text{change factor} = \frac{\text{price A}}{\text{price B}}
= \frac{18}{22} = 0.818\ldots \approx 0.82 = 82\ \%
\ \Longrightarrow\ 18\ \%\ \text{cheaper}
$$

**Answer:** 18 % cheaper

Notice that the answers in a) and b) are *not* the same number. The percentage
depends on what we compare with!
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Change factor"
- A number that states how much something has changed.
- $\text{change factor}
  = \dfrac{\text{new value}}{\text{old value}}$
- $\text{new value}
  = \text{change factor} \cdot \text{old value}$
- $\text{old value}
  = \dfrac{\text{new value}}{\text{change factor}}$
:::

::: sampunkt "Finding the factor"
- Start from **100 %**, which is what you have from the start.
- Add or subtract the change and convert to decimal form.
- $+5\ \%$ gives 1.05. $+140\ \%$ gives 2.40. $-4\ \%$ gives 0.96.
  $-25\ \%$ gives 0.75.
:::

::: sampunkt "Interpreting the factor"
- Factor **greater than 1**: increase.
- Factor **less than 1**: decrease.
- The factor is always **greater than or equal to 0**.
- The factor 1.32 means an increase of 32 %, the factor 0.75 a decrease of
  25 %.
:::

::: sampunkt "In comparisons"
- **What you compare WITH is the old value**, that is the denominator.
- That is why the answers differ in different directions: 22 kr is 22 % more expensive than 18 kr,
  while 18 kr is 18 % cheaper than 22 kr.
- Read the question carefully and decide which value is the comparison.
:::
:::

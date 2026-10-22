---
kalla: 4dfe52f96c
id: ma1c-3.3
title: Repeated percentage changes
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.3'
---

# Repeated percentage changes

In a repeated percentage change we get the total percentage
change by calculating the **total change factor**. The
total change factor is obtained by multiplying the different
change factors.

::: formel "Total change factor"
$$
\text{total change factor}
= \text{change factor}_1 \cdot \text{change factor}_2 \cdot \ldots
$$
:::

::: exempel "Example 1: An increase followed by a decrease"
**A price is raised by 15 % and then lowered by 15 %. By what
percentage has the original price changed?**

::: handskrift
typ: upprepad
:::

::: textlosning
We write down the different change factors:

$$
\text{change factor}_1 = 1 + 0.15 = 1.15
$$

$$
\text{change factor}_2 = 1 - 0.15 = 0.85
$$

Total change factor:

$$
\text{total change factor} = 1.15 \cdot 0.85 = 0.9775
$$

0.9775 corresponds to a decrease of $1 - 0.9775 = 0.0225 = 2.25\ \%$.

**Answer:** It has decreased by 2.25 %.

**NOTE! So an increase of 15 % followed by a decrease of 15 % does NOT give
a change of 0 %. This is because the value that we calculate 15 % of
changes.**
:::
:::

::: exempel "Example 2: The savings account"
**Axel deposits 80 000 kr in a savings account with an annual interest rate of 2.5 % and does
not withdraw any money. How much money is in the account after 18 years?**

::: handskrift
typ: sparkonto
:::

::: textlosning
In this case the change factor is the same every year:

$$
\text{change factor} = 1 + 0.025 = 1.025
$$

So we are to *multiply* the amount by the change factor 1.025 18
times, which gives the total change factor $1.025^{18}$:

$$
80\,000 \cdot 1.025^{18} = 124\,772.697\ldots\ \mathrm{kr} \approx 124\,773\ \mathrm{kr}
$$

**Answer:** 124 773 kr
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Total change factor"
- With several changes in a row, the factors are **multiplied**.
- $\text{total} = \mathit{cf}_1 \cdot \mathit{cf}_2 \cdot \ldots$
- The percentages must **never** be added.
:::

::: sampunkt "Up and down does not give zero"
- $+15\ \%$ followed by $-15\ \%$ gives
  $1.15 \cdot 0.85 = 0.9775$.
- So a **decrease** of 2.25 %, not an unchanged price.
- The reason: the reduction is calculated on the **raised** price.
:::

::: sampunkt "The same change several times"
- If the same factor is repeated $n$ times, the total becomes $\mathit{cf}^{\,n}$.
- $\text{new value}
  = \text{old value} \cdot \mathit{cf}^{\,n}$.
- $80\,000$ kr at 2.5 % interest for 18 years becomes
  $80\,000 \cdot 1.025^{18}$.
:::

::: sampunkt "From total factor to per cent"
- Subtract 1 and convert to per cent.
- The factor 1.5597 means an increase of about 56 %.
:::
:::

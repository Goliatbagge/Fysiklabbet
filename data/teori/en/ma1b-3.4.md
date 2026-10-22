---
kalla: 7b88856a76
id: ma1b-3.4
title: CPI and index numbers
course: Matematik nivå 1b
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.4'
---

# CPI and index numbers

How much more expensive has it become to live since your parents were young?
To be able to compare prices, wages and other values between different years,
**index numbers** are used. One year is chosen as the **base year** and gets the index number 100.
The values for all other years are then given in relation to the base year.

::: formel "Index number"
$$
\text{index} = \frac{\text{value}}{\text{value in the base year}} \cdot 100
$$
:::

So an index number is a percentage comparison with the base year, written
without the per cent sign:

- Index **100** means the same value as in the base year.
- Index **175** means that the value is 75 % *higher* than in the base year.
- Index **91** means that the value is 9 % *lower* than in the base year.

Index numbers and change factors are closely related: if
the index number is divided by 100, you get the change factor from the base year. Index 175
corresponds to the change factor 1.75.

::: exempel "Example 1: Find an index number"
**The price of a cinema ticket was 80 kr in 2010 and 140 kr in 2023.<br>a) Find the index number of the ticket price in 2023, with 2010 as the base year.<br>b) By how many per cent has the price increased since the base year?**

::: handskrift
typ: indextal
:::

::: textlosning
**a)** The base year is 2010, so the price in the base year, 80 kr, corresponds to index 100.
Substituting into the formula for the index number gives

$$
\text{index} = \frac{140}{80} \cdot 100 = 1.75 \cdot 100 = 175
$$

**b)** The base year always has index 100. The index number 175 is
$175 - 100 = 75$ units above the base year, which means that the price is 75 %
higher than in 2010.

**Answer:** a) Index 175&emsp;&emsp;b) The price has increased by 75 %.
:::
:::

## Consumer price index (CPI)

The most widely used index number in Sweden is the **consumer price index**, which
is abbreviated **CPI** (KPI in Swedish). The statistics agency SCB (Statistics Sweden) measures the price of
a large "shopping basket" every month, containing things households actually buy (food, rent,
clothes, electricity, travel), and converts it into an index number with **1980 as the
base year**. When CPI rises, we say that there is **inflation**: money
buys less, since the same goods cost more.

| Year | CPI (base year 1980) |
|---|---|
| 1980 | 100 |
| 1990 | 207.8 |
| 2000 | 260.7 |
| 2010 | 303.5 |
| 2020 | 335.9 |
| 2023 | 403.7 |

Source: Statistics Sweden (SCB), Statistical Database, the table "Consumer Price Index (CPI)
fixed annual averages, total, 1980=100". The values are rounded to one
decimal place.

The table is read like this: in 2023 the general price level was about 304 %
higher than in 1980. So what cost 100 kr in 1980 cost on average just under
404 kr in 2023.

With CPI we can convert an amount from one year's money value to
another. The ratio between the index numbers of the two years is the change factor between
the years:

::: formel "Converting with an index"
$$
\text{new amount} = \text{old amount} \cdot
\frac{\text{index of the new year}}{\text{index of the old year}}
$$
:::

::: exempel "Example 2: Converting with CPI"
**An employee had a monthly salary of 21 500 kr in 2010. What does that
salary correspond to in 2023 money value? CPI was 303.5 in 2010 and 403.7 in
2023.**

::: handskrift
typ: kpiomrakning
:::

::: textlosning
The change factor between the years is the ratio between the index numbers:

$$
\frac{403.7}{303.5} = 1.3301\ldots
$$

So the price level was about 33 % higher in 2023 than in 2010. The salary is converted
with the same factor:

$$
21\,500 \cdot \frac{403.7}{303.5} = 28\,598.1\ldots\ \mathrm{kr}
\approx 28\,600\ \mathrm{kr}
$$

**Answer:** About 28 600 kr a month.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Index numbers"
- A way of comparing values between **different years**.
- One year is chosen as the **base year** and gets the index number **100**.
- $\text{index}
  = \dfrac{\text{value}}{\text{value in the base year}} \cdot 100$
:::

::: sampunkt "Interpreting the index number"
- Index **100**: the same value as the base year.
- Index **175**: 75 % **higher** than the base year.
- Index **91**: 9 % **lower** than the base year.
- Subtract 100 to get the percentage change.
:::

::: sampunkt "Index and change factor"
- Divide the index number by 100 and you get the **change factor** from
  the base year.
- Index 175 corresponds to the factor 1.75.
:::

::: sampunkt "Consumer price index"
- **CPI** measures the price of a shopping basket with what households actually buy:
  food, rent, clothes, electricity, travel.
- Measured every month by SCB, with **1980 as the base year**.
- If CPI rises there is **inflation**: money buys less.
:::

::: sampunkt "Converting between years"
- $\text{new amount} = \text{old amount} \cdot
  \dfrac{\text{index of the new year}}{\text{index of the old year}}$
- The ratio between the index numbers of the years **is** the change factor between them.
- So the base year does not need to be involved in the calculation itself.
:::
:::

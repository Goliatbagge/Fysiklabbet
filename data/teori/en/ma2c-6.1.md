---
kalla: efc3870aac
id: ma2c-6.1
title: Measures of central tendency
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.1'
---

# Measures of central tendency

A summarising value for a set of statistical data is called a
**measure of central tendency**. The most common measures of central tendency are the mean, the median and the
mode.

**Mean:** The most common measure of central tendency. Calculated as the sum
divided by the number of values. Suitable to use in most cases.

**Median:** The value in the middle when the values are in order of size. If two
values are in the middle, the median is the mean of these. Suitable for a skewed
distribution, that is, when individual values stand out.

**Mode:** The value that occurs most often. Can be used even
when the data are not numbers, for example colours or car makes.

The number of times a certain value occurs is called its **frequency**. If, for example, the number of
17-year-olds in a classroom is 12, the frequency of the 17-year-olds is 12.

::: exempel "Example 1: Three measures of central tendency"
**The ages of the people in a classroom are 16, 17, 61, 16, 16, 18 and 17
years. Determine<br>a) the mean&emsp;&emsp;b) the median&emsp;&emsp;c) the mode**

::: handskrift
typ: lagesmatt
:::

::: textlosning
**a)**

$$
\text{the mean} = \frac{\text{the sum}}{\text{the number of values}} = \frac{16 + 17 + 61 + 16 + 16 + 18 + 17}{7} = \frac{161}{7} = 23
$$

**Answer:** 23 years

**b)** We sort the ages in order of size, for example smallest first, and
read off the number in the middle:

$$
16,\ 16,\ 16,\ \mathbf{17},\ 17,\ 18,\ 61
$$

**Answer:** 17 years

**c)** There are most 16-year-olds (3 of them). So 16 is the most commonly
occurring age.

**Answer:** 16 years
:::
:::

::: exempel "Example 2: Which measure of central tendency is most suitable?"
**Which measure of central tendency is most suitable to use in the example above:
the mean or the median?**

::: handskrift
typ: lampligtlagesmatt
:::

::: textlosning
It depends on the context, but since we have a value that stands out
(the 61-year-old) which pulls the mean up to 23 years, the
mean is not very representative of the people in the room (there is
not a single 20-year-old there). So the median may be preferable in
this case.

**Answer:** The median
:::
:::

## Classes and histograms

In some statistics we do not have exact values but a division into intervals,
called **classes**. Such classes can be presented either in
table form or in diagram form as a **histogram** with
adjoining bars. In these cases we assume that all the values in
a class have the value in the middle of the interval, which is called
the **class midpoint**. The class $300 \leq x < 400$, for example, has the class midpoint 350.

::: exempel "Example 3: Mean from data divided into classes"
**The ages of the people in a room are shown in a table with
intervals and in a histogram. Calculate the mean age.**

::: handskrift
typ: klassmitt
:::

::: textlosning
| Age (years) | Frequency |
| --- | --- |
| $20 \leq x < 30$ | 2 |
| $30 \leq x < 40$ | 4 |
| $40 \leq x < 50$ | 4 |
| $50 \leq x < 60$ | 5 |
| $60 \leq x < 70$ | 3 |
| $70 \leq x < 80$ | 1 |
| $80 \leq x < 90$ | 0 |
| $90 \leq x < 100$ | 1 |

::: figur
<svg viewBox="-16 0 240 184" width="415" height="318" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A histogram of ages with bars for each ten-year class: the highest is the class 50 to 60 years with the frequency 5."><rect x="20" y="102" width="22" height="48" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="42" y="54" width="22" height="96" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="64" y="54" width="22" height="96" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="86" y="30" width="22" height="120" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="108" y="78" width="22" height="72" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="130" y="126" width="22" height="24" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="174" y="126" width="22" height="24" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><line x1="12" y1="150" x2="208" y2="150" stroke="#1f2530" stroke-width="1.6"/><polygon points="216,150 206,145.5 206,154.5" fill="#1f2530"/><line x1="14" y1="158" x2="14" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="14,6 9.5,16 18.5,16" fill="#1f2530"/><text x="20" y="164" font-size="9" text-anchor="middle" fill="#1f2530">20</text><text x="42" y="164" font-size="9" text-anchor="middle" fill="#1f2530">30</text><text x="64" y="164" font-size="9" text-anchor="middle" fill="#1f2530">40</text><text x="86" y="164" font-size="9" text-anchor="middle" fill="#1f2530">50</text><text x="108" y="164" font-size="9" text-anchor="middle" fill="#1f2530">60</text><text x="130" y="164" font-size="9" text-anchor="middle" fill="#1f2530">70</text><text x="152" y="164" font-size="9" text-anchor="middle" fill="#1f2530">80</text><text x="174" y="164" font-size="9" text-anchor="middle" fill="#1f2530">90</text><text x="196" y="164" font-size="9" text-anchor="middle" fill="#1f2530">100</text><text x="8" y="129" font-size="9" text-anchor="end" fill="#1f2530">1</text><text x="8" y="105" font-size="9" text-anchor="end" fill="#1f2530">2</text><text x="8" y="81" font-size="9" text-anchor="end" fill="#1f2530">3</text><text x="8" y="57" font-size="9" text-anchor="end" fill="#1f2530">4</text><text x="8" y="33" font-size="9" text-anchor="end" fill="#1f2530">5</text><text x="22" y="12" font-size="11" text-anchor="start" fill="#1f2530">frequency</text><text x="214" y="180" font-size="11" text-anchor="end" fill="#1f2530">age (years)</text></svg>
:::

The interval $20 \leq x < 30$ has the class midpoint 25 (we assume that everyone
in the interval is 25 years old), the interval $30 \leq x < 40$ has
the class midpoint 35 (we assume that everyone in the interval is 35 years old)
and so on.

This gives us

$$
\text{the mean} = \frac{\text{the sum}}{\text{the number of values}}
$$

$$
= \frac{2 \cdot 25 + 4 \cdot 35 + 4 \cdot 45 + 5 \cdot 55 + 3 \cdot 65 + 1 \cdot 75 + 0 \cdot 85 + 1 \cdot 95}{2 + 4 + 4 + 5 + 3 + 1 + 0 + 1} = \frac{1\,010}{20} = 50.5\ \text{years}
$$

**Answer:** 50.5 years
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Measures of central tendency"
- A **measure of central tendency** is a summarising value for a set of statistical data.
- **Mean:** the sum divided by the number of values. The most common, suitable in most cases.
- **Median:** the value in the middle when the values are in order of size. If two values are in the middle, the mean of them is taken.
- **Mode:** the value that occurs most often. Works even when the data are not numbers, for example colours.
:::

::: sampunkt "Choosing the right measure"
- The median is suitable for a **skewed distribution**, that is, when individual values stand out.
- The ages 16, 16, 16, 17, 17, 18, 61 give the mean 23 years but the median 17 years.
- Here the median is the most representative, because the 61-year-old pulls the mean up.
:::

::: sampunkt "Frequency and classes"
- **Frequency:** the number of times a certain value occurs.
- **Class:** an interval instead of exact values, for example $300 \leq x < 400$.
- **Class midpoint:** the middle of the interval, here 350. Everyone in the class is assumed to have the class midpoint as their value.
- **Histogram:** a bar chart of classes, with adjoining bars.
:::

::: sampunkt "Mean from classes"
- Multiply each class midpoint by its frequency, add them up and divide by the total number.
- Always write out both the numerator and the denominator, so that you can see if a value has been forgotten.
:::

:::

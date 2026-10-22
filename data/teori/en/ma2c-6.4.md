---
kalla: 4759f79e07
id: ma2c-6.4
title: Standard deviation
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.4'
---

# Standard deviation

Range and box plots are two examples of measures of spread, that is, two
ways of describing spread. A third measure of spread is
standard deviation.

How much the values in a data set deviate **on average** from the
data set's **mean** is called the **standard deviation** and is given as
a number.

The **greater the standard deviation**, the **greater the spread**. The
**smaller the standard deviation**, the **smaller the spread**. If there is
no spread at all, the standard deviation is 0.

The standard deviation is calculated in two different ways, depending on whether we have a
**census** (everyone in the population is studied) or a
**sample survey** (part of the population is studied). For a
census the standard deviation is written $\sigma$ (lower-case sigma)
and for a sample survey the standard deviation is written $s$.

At this level it is enough to be able to calculate the standard deviation with
a digital tool, see the example further on.

To help understanding, we first look at a simple example based on
two data sets.

- Data set 1: 16, 17, 17, 17, 18 (small spread)
- Data set 2: 2, 4, 12, 24, 43 (large spread)

The mean of both these data sets is 17:

$$
\text{Mean of data set 1} = \frac{16 + 17 + 17 + 17 + 18}{5} = 17
$$

$$
\text{Mean of data set 2} = \frac{2 + 4 + 12 + 24 + 43}{5} = 17
$$

The deviations from the mean are found by taking each value minus
the mean. The mean is sometimes written $\bar{x}$. So $\bar{x} = 17$.

| Deviations data set 1 | Deviations data set 2 |
| --- | --- |
| $(16 - 17) = -1$ | $(2 - 17) = -15$ |
| $(17 - 17) = 0$ | $(4 - 17) = -13$ |
| $(17 - 17) = 0$ | $(12 - 17) = -5$ |
| $(17 - 17) = 0$ | $(24 - 17) = 7$ |
| $(18 - 17) = 1$ | $(43 - 17) = 26$ |

We see that the deviations for data set 1 are small. They differ by
**at least 0** and **at most 1**. So the standard deviation (the mean of
the deviations) for data set 1 will be a number between **0** and
**1**.

The deviations for data set 2 are larger. They differ by **at least 5**
and **at most 26**. So the standard deviation for data set 2 will
be a number somewhere between **5** and **26**, that is, larger than for
data set 1.

::: kuriosa "Why does the formula look the way it does?"
The explanation that the standard deviation is the mean of the deviations is
somewhat simplified. To get the standard deviation, the deviations must
also be squared, and once they have been added up and divided by the number of
values, the square root of the quotient is taken. This is not part of this level, but
it can still be interesting to know what our digital
tools are doing.

Standard deviation for a census:

$$
\sigma = \sqrt{\frac{(x_1 - \bar{x})^2 + (x_2 - \bar{x})^2 + \ldots + (x_n - \bar{x})^2}{n}}
$$

Standard deviation for a sample:

$$
s = \sqrt{\frac{(x_1 - \bar{x})^2 + (x_2 - \bar{x})^2 + \ldots + (x_n - \bar{x})^2}{n - 1}}
$$
:::

::: exempel "Example 1: Standard deviation in GeoGebra"
**Calculate the standard deviation of the values 2, 4, 12, 24 and 43.**

::: handskrift
typ: standardavvikelse
:::

::: textlosning
We start GeoGebra, click the "Spreadsheet" view button in the
top menu bar and enter the values in the left-hand column. We
then select all the values, click the menu with the "blue bars" and
choose *One Variable Analysis*. Click the "Show Statistics" button to
bring up the statistical data.

Since the task does not say that it is a
sample survey, we assume that it is a
census. We read off the standard deviation at $\sigma$ and
round: $\sigma = 15.126\ldots \approx 15.1$.

**Answer:** 15.1

(If it had been a sample we would have read off the standard deviation at
$s$ and answered 16.9.)
:::
:::

::: sammanfattning "Summary"

::: sampunkt "What standard deviation is"
- The **standard deviation** tells us how much the values deviate from the mean on average.
- A large standard deviation means a large spread, a small standard deviation a small spread.
- With no spread at all, the standard deviation is 0.
:::

::: sampunkt "Two notations"
- **Census:** the whole population is studied. The standard deviation is written $\sigma$.
- **Sample survey:** part of the population is studied. The standard deviation is written $s$.
- If the task does not say, a census is assumed, that is, $\sigma$.
:::

::: sampunkt "Deviations"
- The deviation of a value is the value minus the mean, $x - \bar{x}$.
- The data set 16, 17, 17, 17, 18 has mean 17 and deviations between 0 and 1, so a small standard deviation.
- The data set 2, 4, 12, 24, 43 has the same mean but deviations between 5 and 26, so a much larger standard deviation.
:::

::: sampunkt "Calculation"
- At this level the standard deviation is calculated with a digital tool.
- In GeoGebra: spreadsheet, select the values, *One Variable Analysis*, "Show Statistics", read off at $\sigma$ or $s$.
- The formula behind it: square the deviations, take the mean and take the square root. The denominator is $n$ for a census and $n - 1$ for a sample.
:::

:::

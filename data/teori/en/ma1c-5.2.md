---
kalla: 29faf40955
id: ma1c-5.2
title: Margin of error and significance
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.2'
---

# Margin of error and significance

How uncertain a result is, is called the **margin of error**. It states how much
the results of a statistical survey can be expected to vary if
the survey were repeated under similar conditions, and it is given in
percentage points. A common way of stating the margin of error is that a result
should lie within the margin of error in 95 % of cases.

The interval that the result with its margin of error gives is called the
**confidence interval**.

::: formel "Margin of error"
If we want to know with 95 % certainty that a result lies in a certain
interval, the margin of error $f$ can be calculated as

$$
f = 1.96 \cdot \sqrt{\frac{p(100 - p)}{n}}
$$

where

- $f$ = margin of error in percentage points
- $p$ = the proportion as a percentage that gave a certain answer
- $n$ = the size of the sample
:::

A change between two surveys is called **significant** or "statistically
established" if it is so large that it can hardly be explained by chance in
who happened to be selected. As a rule of thumb: if the change is larger than
the margin of error, we can say with 95 % certainty that a real change has
taken place.

::: exempel "Example 1: The favourite subject"
**A sample survey was carried out among Sweden's upper secondary school students to
find out what percentage of natural science students have mathematics as their
favourite subject. Of 100 asked, 60 answered that they have mathematics as their
favourite subject.<br>
a) Calculate the margin of error.<br>
b) Calculate the confidence interval.<br>
c) The survey was repeated after three years. Of 100 asked, 52 then answered
that they have mathematics as their favourite subject. Is the change statistically
established, that is, can we say with 95 % certainty that the proportion who have
mathematics as their favourite subject has decreased?**

::: handskrift
typ: felmarginal
:::

::: textlosning
**a)** We set up the formula for the margin of error:

$$
f = 1.96 \cdot \sqrt{\frac{p(100 - p)}{n}}
$$

$$
\left[\begin{array}{l}
p = \dfrac{60}{100} = 0.6 = 60\ \% \\
n = 100
\end{array}\right.
$$

Substituting the values above into the formula for the margin of error gives

$$
f = 1.96 \cdot \sqrt{\frac{60(100 - 60)}{100}} = 9.601\ldots \approx 9.6
$$

The margin of error is in percentage points, since $p$ was substituted as a percentage.

**Answer:** 9.6 percentage points

**b)** The confidence interval is obtained by taking the result ± the margin of error,
that is 60 % plus and minus 9.6 percentage points:

$$
\left[\begin{array}{l}
\text{Lower limit} = 60 - 9.6 = 50.4\ \% \\
\text{Upper limit} = 60 + 9.6 = 69.6\ \%
\end{array}\right.
$$

**Answer:** Between 50.4 % and 69.6 %. (The interval is calculated with a method
that captures the true proportion in 95 % of all surveys. That is why we say
that the proportion lies between these values with 95 % certainty.)

**c)** The new proportion who have mathematics as their favourite subject is

$$
\frac{52}{100} = 0.52 = 52\ \%
$$

This lies within the margin of error of the previous survey (52 % lies
between 50.4 % and 69.6 %). The decrease may therefore be due to chance in
the sample.

**Answer:** No, the change is not statistically established.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Margin of error"
- How much the result can be expected to **vary** if the survey
  were repeated under similar conditions.
- Given in **percentage points** and normally applies with 95 % certainty.
:::

::: sampunkt "The formula"
- $f = 1.96 \sqrt{\dfrac{p(100 - p)}{n}}$
- $p$ is the proportion as a **percentage** that gave a certain answer, $n$ is
  the size of the sample.
- **A larger sample gives a smaller margin of error**, since $n$ is in
  the denominator.
:::

::: sampunkt "Confidence interval"
- The result **plus and minus** the margin of error.
- 60 % with the margin of error 9.6 percentage points gives the interval 50.4 % to 69.6 %.
:::

::: sampunkt "Significance"
- A change is **significant** if it is too large to be explained by chance in the sample.
- If the change is **larger than the margin of error** it is **statistically
  established**, that is significant.
- If the new proportion lies **within** the old confidence interval, it is not possible
  to say that any change has taken place.
:::
:::

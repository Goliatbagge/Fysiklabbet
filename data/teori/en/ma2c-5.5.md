---
kalla: ee804a22ff
id: ma2c-5.5
title: Applications of logarithms
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.5'
---

# Applications of logarithms

Remember 1:

::: tips "Model for exponential change"
In applications where something changes exponentially or, for example, by a
certain percentage every year, we set up a model of the form

$$
y = C \cdot a^x
$$

where

- $y$ = the new value
- $C$ = the initial value
- $a$ = the change factor
- $x$ = the number of changes (often time)
:::

Remember 2:

::: tips "Solving exponential equations with the third law of logarithms"
1. Take the logarithm of both sides of the equation (put lg, the common logarithm log₁₀, in front of both expressions).
2. Bring the exponent down as a factor, according to the third law of logarithms, and then
   solve as usual.
:::

::: exempel "Example 1: The savings account"
**You deposit 10 000 kr in an account with an annual interest rate of 2.3 %. How long
does it take until you have more than 12 000 kr in the account?**

::: handskrift
typ: sparkontot
:::

::: textlosning
We have something that grows by a percentage/exponentially, so we set up
the formula

$$
y = C \cdot a^x
$$

In this case

- $y = 12\,000$ (the new value)
- $C = 10\,000$ (the initial value)
- $a = 1.023$ (the change factor that corresponds to an increase of
  2.3 %)

Substituting into the formula above gives

$$
12\,000 = 10\,000 \cdot 1.023^x
$$

We divide both sides by 10 000, take the logarithm and solve the equation:

$$
1.2 = 1.023^x
$$

$$
\lg 1.2 = \lg 1.023^x
$$

$$
\lg 1.2 = x \cdot \lg 1.023
$$

Dividing both sides by lg 1.023 gives

$$
x = \frac{\lg 1.2}{\lg 1.023} \approx 8.02
$$

Since the interest is paid at the end of each year, the amount will not
grow above 12 000 kr until after 9 years.

**Answer:** After 9 years.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The model"
- Exponential change is described by $y = C \cdot a^x$.
- $y$ is the new value, $C$ the initial value, $a$ the change factor and $x$ the number of changes, usually the number of years.
:::

::: sampunkt "Method"
1. Identify $y$, $C$ and $a$ from the question.
2. Substitute into the model and divide away $C$.
3. Take the logarithm of both sides and use the third law of logarithms.
4. Solve for $x$ and interpret the answer in the context of the question.
:::

::: sampunkt "Typical task: the savings account"
- 10 000 kr at an interest rate of 2.3 % per year: $12\,000 = 10\,000 \cdot 1.023^x$.
- Division gives $1.2 = 1.023^x$, and taking the logarithm gives $x = \dfrac{\lg 1.2}{\lg 1.023} \approx 8.02$.
:::

::: sampunkt "Interpreting the answer"
- A decimal answer must often be rounded **up** to a whole period.
- The interest is paid at the end of each year, so 8.02 years means that the amount is passed only after 9 years.
- Always ask: what does half a year or half a period mean here?
:::

:::

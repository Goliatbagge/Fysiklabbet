---
kalla: 62c1c7f0a6
id: ma3c-5.7
title: Applications of integrals
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.7'
---

# Applications of integrals

We can use integrals to solve practical problems in a range of different
areas. Remember the relationship between distance, velocity and acceleration in
applications: if we differentiate the distance we get the velocity, and if we differentiate
the velocity we get the acceleration. If we go the other way, that is integrate,
we go back.

::: formel "Relationship between distance, velocity and acceleration"
$$
s(t) \xrightarrow{\;\text{Differentiate}\;} v(t) \xrightarrow{\;\text{Differentiate}\;} a(t)
$$

$$
a(t) \xrightarrow{\;\text{Integrate}\;} v(t) \xrightarrow{\;\text{Integrate}\;} s(t)
$$
:::

However, integrals can be used for more than that. In general one can say that
**the integral stands for the product of the dependent variable** (for example $y$ or
$f(x)$) **and the independent variable** (for example $x$). If, for example, we have a
bathtub that leaks water at a rate in litres per minute, as a function of
the time in minutes, we can determine how many litres of water have leaked out
after a certain time, since

$$
\frac{\text{litres}}{\text{minute}} \cdot \text{minutes} = \text{litres}.
$$

::: formel "Interpreting integrals"
An integral stands for the product of the dependent variable ($y$) and the
independent variable ($x$). So to get the unit of the integral we take
"the unit of $y$" $\cdot$ "the unit of $x$".

In the same way, if we start from a graph, we get the unit of
the integral by taking "the unit on the $y$-axis" $\cdot$ "the unit on the
$x$-axis".
:::

::: exempel "Example 1: Distance from a velocity-time function"
**The velocity $v(t)$ m/s of a car is given by $v(t) = 40 - 40e^{-0.25t}$ where $t$
is the time in seconds after the start. How far does the car travel between $t = 5.0$ s
and $t = 12$ s?**

::: handskrift
typ: strackaintegral
:::

::: textlosning
We have a function for the **velocity** and need to find a **distance**. We then
get the distance $s$ by integrating (see the relationship above). Since we are to
determine the distance between $t = 5.0$ s and $t = 12$ s, the integral must start at
$t = 5.0$ and end at $t = 12$. This gives

$$
s = \int_{5}^{12} v(t)\, dt = \int_{5}^{12} \left(40 - 40e^{-0.25t}\right) dt = \left[40t - \frac{40e^{-0.25t}}{-0.25}\right]_{5}^{12} = \left[40t + 160e^{-0.25t}\right]_{5}^{12}
$$

$$
= \left(40 \cdot 12 + 160e^{-0.25 \cdot 12}\right) - \left(40 \cdot 5 + 160e^{-0.25 \cdot 5}\right) = \left(480 + 160e^{-3}\right) - \left(200 + 160e^{-1.25}\right)
$$

$$
= 480 + 160e^{-3} - 200 - 160e^{-1.25} \approx 242 \text{ m} \approx 240 \text{ m}
$$

**Answer:** The car travels about 240 m between $t = 5.0$ s and $t = 12$ s.
:::
:::

::: exempel "Example 2: Interpreting an integral"
**A company has a turnover of $K(t)$ kr/month, where $t$ is the time in months. Interpret**

::: handskrift
typ: tolkaintegral
:::

::: textlosning
$$
\int_{0}^{12} K(t)\, dt = 3\,000\,000
$$

**in words.**

The integral stands for the product of the dependent variable and the independent
variable. The unit of the dependent variable ($K(t)$) is kr/month and
the unit of the independent variable ($t$) is months. We do a
unit analysis and find that the integral has the unit

$$
\frac{\text{kr}}{\text{month}} \cdot \text{months} = \text{kr}.
$$

So the value of the integral, 3 000 000, stands for the turnover in kronor
between month 0 and month 12, that is, during the first year.

**Answer:** During the first 12 months (the first year) the company has a turnover of
3 000 000 kr.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "What the integral stands for"
- The integral is the **product** of the dependent variable and the independent variable.
- So the unit is the unit of $y$ times the unit of $x$.
- Litres per minute times minutes gives litres. Kronor per month times months gives kronor.
:::

::: sampunkt "Motion"
- Differentiate: $s(t) \rightarrow v(t) \rightarrow a(t)$.
- Integrate: $a(t) \rightarrow v(t) \rightarrow s(t)$.
- The distance between two times is obtained from $\int_{t_1}^{t_2} v(t)\, dt$.
:::

::: sampunkt "Method"
1. Decide which quantity is asked for and which way you need to go.
2. Set the limits to the times or values the question is about.
3. Find the antiderivative and substitute the limits.
4. Answer with the correct unit and reasonable rounding.
:::

::: sampunkt "Interpreting in words"
- Do a **unit analysis** to know what the value of the integral means.
- $\int_0^{12} K(t)\, dt = 3\,000\,000$ with $K$ in kronor per month means that the company had a turnover of 3 000 000 kr during the first year.
- The limits tell you which time interval the value applies to.
:::

:::

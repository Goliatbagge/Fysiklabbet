---
kalla: 26e9f39e92
id: ma3c-2.4
title: Using the derivative
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.4'
---

# Using the derivative

## Interpreting the derivative

We have previously established that the derivative graphically represents the slope
of a graph at a particular point (or the slope of the tangent at a particular point).

In applications within, for example, science or economics, the derivative represents
some kind of **rate of change at an instant**. The unit of
the derivative is obtained by taking "the unit of the function" per "the unit of
the variable".

::: exempel "Example 1: Interpreting the derivative"
**A car travels $s(t)$ km in $t$ hours. Interpret<br>
a)&nbsp;$s(2) = 120$&emsp;&emsp;b)&nbsp;$s'(2) = 90$**

::: handskrift
typ: tolkaderivatabil
:::

::: textlosning
**a)** $s$ represents the distance in kilometres (120 km). $t$ represents the time in
hours (2 hours).

**Answer:** After 2 hours the car has travelled 120 km.

**b)** The unit of the derivative is "the unit of the function" per "the unit of
the variable". The unit of the function $s(t)$ is km. The unit of the variable $t$
is hours. So $s'$ corresponds to km/h.

$s'$ represents the instantaneous speed (90 km/h). $t$ represents the instant (2
hours).

**Answer:** After 2 hours the car is travelling at the speed 90 km/h.
:::
:::

## Calculating the derivative with GeoGebra

We can calculate a derivative with a computer algebra tool, for example GeoGebra.
We then define a function by typing $f(x) = \ldots$ in
the input bar and then calculate the derivative by typing $f'(a)$ for
the point $x = a$ that we are interested in.

::: härledning "Note: decimal separator in GeoGebra"
In GeoGebra's input bar a point `.` is used as the decimal separator, not a comma.
The number $0.3$ is therefore typed as `0.3` when you enter a function.
:::

::: exempel "Example 2: Calculating the derivative with GeoGebra"
**On a spring day the temperature $f(x)$ °C is given by the formula $f(x) = 0.3x^2 - 5$, where
$x$ is the time in hours after 6:00.<br>
a) Calculate $f'(5)$ with a computer algebra tool.<br>b) Interpret
the answer to a) in words.**

::: handskrift
typ: casderivata
:::

::: textlosning
**a)** In GeoGebra's input bar we type

$$
f(x) = 0.3x^2 - 5
$$

and press Enter. In the input bar below we then type $f'(5)$ and
press Enter. We then get the answer 3. So $f'(5) = 3$.

**Answer:** $f'(5) = 3$

**b)** We had $f'(5) = 3$. The unit of $f$ is °C and the unit of $x$
is h. So the unit of the derivative is °C/h.

We therefore interpret $f'(5) = 3$ as "after 5 hours the temperature is increasing by 3
°C/h". Since the time is counted from 6:00, we can also phrase it
as "at 11:00 the temperature is increasing by 3 °C/h".

**Answer:** After 5 hours (at 11:00) the temperature is increasing by 3 °C/h.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "What the derivative means"
- Graphically: the slope of the graph at a point, that is the slope of the tangent there.
- In applications: a **rate of change at an instant**.
- $f(a)$ is the value at the point, $f'(a)$ is how fast the value changes there. Do not mix them up.
:::

::: sampunkt "The unit"
- The unit of the derivative is the unit of the **function** per the unit of the **variable**.
- Distance in km and time in hours gives km/h.
- Temperature in °C and time in hours gives °C/h.
:::

::: sampunkt "Interpreting in words"
- $s(2) = 120$ means that the car has travelled $120\ \mathrm{km}$ after 2 hours.
- $s'(2) = 90$ means that the car is travelling at the speed $90\ \mathrm{km/h}$ at the instant 2 hours.
- If the time is counted from a time of day, the answer should preferably be translated into it, for example 11:00.
:::

::: sampunkt "The derivative in GeoGebra"
- Define the function by typing $f(x) = \ldots$ in the input bar.
- Then type $f'(a)$ on the line below for the derivative at the point $x = a$.
- The decimal separator is a **point** in GeoGebra: $0.3$ is typed `0.3`.
:::

:::

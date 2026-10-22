---
kalla: 4a954ccf76
id: ma1c-2.12
title: Using formulas
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.12'
---

# Using formulas

Something that can be measured is called a **quantity**. Length, time, weight and speed are
examples of quantities. An equation that describes a relationship between different
quantities is called a **formula** and works as a tool for solving
problems.

::: exempel "Example 1: The speed formula"
**The formula for calculating the speed $v$ from how long a time $t$ it takes
to travel a certain distance $s$ is $v = \dfrac{s}{t}$. Solve for $t$ and
calculate how long it takes to travel 35 Swedish miles (1 Swedish mile = 10 km) at the average speed
70 km/h.**

::: handskrift
typ: hastighetsformel
:::

::: textlosning
We begin by solving for $t$ in the formula:

$$
v = \frac{s}{t}
\quad\Longleftrightarrow\quad
s = v \cdot t
\quad\Longleftrightarrow\quad
t = \frac{s}{v}
$$

We then write down the values we have. **NOTE!** Since the speed is
given in the unit km/h, it is important that we give the distance in km and the time
in hours:

$$
\left[\begin{array}{l}
s = 35\ \text{Swedish miles} = 350\ \mathrm{km} \\
v = 70\ \mathrm{km/h}
\end{array}\right.
$$

Substituting the values into the formula gives

$$
t = \frac{s}{v} = \frac{350}{70} = 5\ \text{hours}
$$

**Answer:** 5 hours
:::
:::

::: exempel "Example 2: The rental car"
**The total cost $H$ kr of renting a car for one year is a fixed
cost of 21 000 kr and then a variable cost of 2.5 kr/km. The formula for
the total cost if you drive $m$ kilometres is then
$H = 21\,000 + 2.5m$.<br>
a) What is the cost of the car if you drive 2 000 Swedish miles during the year?<br>
b) How far can you drive for 30 000 kr?**

::: handskrift
typ: hyrbil
:::

::: textlosning
**a)** The units are important! Note that $m$ stands for the distance in
*kilometres*. The distance 2 000 Swedish miles corresponds to 20 000 km. This means that
$m = 20\,000$. Substituting $m = 20\,000$ into the formula gives

$$
H = 21\,000 + 2.5 \cdot 20\,000 = 21\,000 + 50\,000 = 71\,000\ \mathrm{kr}
$$

**Answer:** 71 000 kr

**b)** The total cost corresponds to 30 000 kr. Substituting
$H = 30\,000$ into the formula gives

$$
30\,000 = 21\,000 + 2.5m
$$

Subtract 21 000 from both sides:

$$
9\,000 = 2.5m
$$

Divide both sides by 2.5:

$$
\frac{9\,000}{2.5} = \frac{2.5m}{2.5}
$$

$$
m = 3\,600
$$

The distance is 3 600 km, which corresponds to 360 Swedish miles.

**Answer:** 360 Swedish miles (3 600 km)
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Quantity and formula"
- A **quantity** is something that can be measured: length, time, weight, speed.
- A **formula** is an equation that describes a relationship between quantities.
:::

::: sampunkt "Solving for a variable"
- Treat the formula as an equation and isolate the variable you are looking for.
- $v = \dfrac{s}{t}$ gives $t = \dfrac{s}{v}$.
- Solve for it **before** you substitute the values. It is simpler and the risk of
  calculation errors is smaller.
:::

::: sampunkt "The units must match"
- Convert to the same system of units before substituting: 35 Swedish miles is $350\ \mathrm{km}$.
- Answer with a **unit**.
:::

::: sampunkt "Formulas with a fixed and a variable part"
- $H = 21\,000 + 2.5m$: the constant term is the fixed cost,
  the coefficient the variable cost per unit.
- **Forwards**: substitute $m$ and calculate $H$.
- **Backwards**: substitute $H$ and solve for $m$.
:::
:::

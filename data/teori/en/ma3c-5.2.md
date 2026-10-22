---
kalla: da8a709646
id: ma3c-5.2
title: Antiderivatives with a condition
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.2'
---

# Antiderivatives with a condition

We have already found all the antiderivatives of a function
by adding a constant $C$ to the function expression. If we have
some further information about the antiderivative, a so-called
**condition**, we can determine this constant by substituting the condition into
the antiderivative.

Finding an antiderivative is called **integrating**. So the opposite of
"differentiating" is "integrating".

In applications of the derivative we have established that if we differentiate a
distance $s(t)$ we get a velocity $v(t)$, and if we differentiate the velocity
$v(t)$ we get an acceleration $a(t)$. Going backwards, if we
**integrate** a velocity $v(t)$ we get a distance $s(t)$, and if we integrate
an acceleration $a(t)$ we get a velocity $v(t)$.

::: formel "Relationship between distance, velocity and acceleration"
In applications, the distance $s(t)$, the velocity $v(t)$ and
the acceleration $a(t)$ are linked by differentiation and integration:

$$
s(t) \xrightarrow{\ \text{differentiate}\ } v(t) \xrightarrow{\ \text{differentiate}\ } a(t)
$$

$$
a(t) \xrightarrow{\ \text{integrate}\ } v(t) \xrightarrow{\ \text{integrate}\ } s(t)
$$

So if we differentiate a distance $s(t)$ twice, we get an
acceleration $a(t)$ directly. Conversely, integrating an acceleration gives a velocity,
and integrating a velocity gives a distance.
:::

## Determine the constant C with a condition

::: exempel "Example 1: Determine the constant C with a condition"
**Determine the antiderivative of $f(x) = x^3 + 12x$ that satisfies
the condition $F(1) = 7$.**

::: handskrift
typ: konstantenc
:::

::: textlosning
We start by finding all antiderivatives of $f(x)$. Both
terms are power terms ($x$ in the base), so we find antiderivatives
of both by increasing the exponent by 1 and then dividing by the new
exponent. This gives

$$
F(x) = \frac{x^4}{4} + \frac{12x^2}{2} + C \quad \Longleftrightarrow \quad F(x) = \frac{x^4}{4} + 6x^2 + C \qquad (1)
$$

Then we use the condition $F(1) = 7$, that is, we substitute
$x = 1$ into the antiderivative, which must then be equal to 7.

$$
\frac{1^4}{4} + 6 \cdot 1^2 + C = 7
$$

$$
\frac{1}{4} + 6 + C = 7
$$

$$
6.25 + C = 7
$$

$$
6.25 + C - 6.25 = 7 - 6.25
$$

$$
C = 0.75
$$

We now know that $C = 0.75$. If we substitute this into formula (1) for all
antiderivatives, we get

$$
F(x) = \frac{x^4}{4} + 6x^2 + 0.75
$$

**Answer:** $F(x) = \dfrac{x^4}{4} + 6x^2 + 0.75$
:::
:::

## Application: distance from a velocity function

::: exempel "Example 2: Distance from a velocity function"
**The velocity $v(t)$ m/s of an accelerating car is $v(t) = 1.2t^2$,
where $t$ is the time in seconds from the start. How far does the car travel in the
first 10 seconds?**

::: handskrift
typ: strackaurhast
:::

::: textlosning
We have the function for the velocity $v(t)$ and need to find the distance $s(t)$.
So we must **integrate** (find an antiderivative) to get
the formula for the distance. This gives

$$
s(t) = \frac{1.2t^3}{3} + C
$$

We simplify and get

$$
s(t) = 0.4t^3 + C \qquad (1)
$$

Since the distance the car has travelled at the start is 0, $s(0) = 0$,
which gives

$$
0.4 \cdot 0^3 + C = 0 \quad \Longrightarrow \quad C = 0
$$

This in (1) gives the formula for the distance, which then becomes

$$
s(t) = 0.4t^3
$$

Since we want the distance the car travels in the first 10 seconds, we must
calculate $s(10)$. We substitute $t = 10$ into the formula for the distance and then get

$$
s(10) = 0.4 \cdot 10^3 = 0.4 \cdot 1000 = 400
$$

Since the velocity is given in metres/second, the distance is in metres.

**Answer:** $400$ metres
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Integrating"
- Finding an antiderivative is called **integrating**.
- Integration is the opposite of differentiation.
:::

::: sampunkt "Determining the constant C"
- A **condition** is extra information about the antiderivative, for example $F(1) = 7$.
1. Find all antiderivatives, with $C$.
2. Substitute the $x$-value of the condition and set the expression equal to the given value.
3. Solve for $C$ and substitute it into the function.
:::

::: sampunkt "Distance, velocity, acceleration"
- Differentiate: $s(t) \rightarrow v(t) \rightarrow a(t)$.
- Integrate: $a(t) \rightarrow v(t) \rightarrow s(t)$.
- If the distance is differentiated twice, the acceleration is obtained directly.
:::

::: sampunkt "Typical task"
- $v(t) = 1.2t^2$ is integrated to $s(t) = 0.4t^3 + C$.
- The condition that the distance is 0 at the start, $s(0) = 0$, gives $C = 0$.
- $s(10) = 400$, so 400 metres. The unit follows from the unit of the velocity.
:::

:::

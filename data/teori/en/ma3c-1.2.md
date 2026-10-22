---
kalla: 5d56a2887e
id: ma3c-1.2
title: Polynomial equations
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.2'
---

# Polynomial equations

An equation where one side is a polynomial and the other side is zero, for
example

$$
x^3 - 2x^2 - 15x = 0
$$

is called a **polynomial equation**. The degree of the equation is the degree of the polynomial, so
the equation above is a cubic equation. The solutions are often called
**roots**. You can already solve quadratic equations with the zero product method and
the *pq* formula. In this section we solve equations of higher degree by
reducing them to things we can already do.

::: formel "Number of solutions"
A polynomial equation of degree $n$ has **at most** $n$ real solutions.
:::

## Simple polynomial equations

In Mathematics level 1c we solved simple quadratic and cubic equations such as
$x^2 = 9$ and $x^3 = -27$. The same method works for all exponents. An
equation that contains only one power of $x$ and a constant can be rewritten
in the form $x^n = a$. It is solved by taking the $n$th root of both
sides. If the exponent is even, both a positive and a negative number give
the same power, for example $3^4 = 81$ and $(-3)^4 = 81$, and then there are two
solutions.

::: formel "The equation $x^n = a$"
- $n$ odd: one solution, $x = \sqrt[n]{a}$.
- $n$ even and $a > 0$: two solutions, $x = \pm \sqrt[n]{a}$.
- $n$ even and $a < 0$: no real solution.
:::

::: exempel "Example 1: Simple polynomial equations"
**Solve the equations.<br>a)&nbsp;$x^5 = 32$&emsp;&emsp;b)&nbsp;$2x^4 = 162$&emsp;&emsp;c)&nbsp;$x^3 + 8 = 0$**

::: handskrift
typ: enklapolyekv
:::

::: textlosning
**a)** The exponent 5 is odd, so there is one solution. We take the fifth root of
both sides.

$$
\begin{aligned}
x^5 &= 32 \\
x &= \sqrt[5]{32} \\
x &= 2
\end{aligned}
$$

Check: $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 32$.

**Answer:** $x = 2$

**b)** First both sides are divided by 2. The exponent 4 is even and the right-hand side
positive, so there are two solutions.

$$
\begin{aligned}
2x^4 &= 162 \\
\frac{2x^4}{2} &= \frac{162}{2} \\
x^4 &= 81 \\
x &= \pm \sqrt[4]{81} \\
x &= \pm 3
\end{aligned}
$$

**Answer:** $x_1 = -3$ and $x_2 = 3$

**c)** First 8 is subtracted from both sides. The exponent 3 is odd, so
the cube root of a negative number is fine: $(-2)^3 = -8$.

$$
\begin{aligned}
x^3 + 8 &= 0 \\
x^3 + 8 - 8 &= 0 - 8 \\
x^3 &= -8 \\
x &= \sqrt[3]{-8} \\
x &= -2
\end{aligned}
$$

**Answer:** $x = -2$
:::
:::

## More about polynomial equations

If the polynomial equation has no constant term, $x$ appears in every term. Then $x$
can be taken out as a common factor, and the left-hand side becomes a product. According to the **zero product method**
a product is zero only if one of the factors is zero, so the equation is split
into two simpler equations.

::: exempel "Example 2: Take out x"
**Solve the equation $x^3 - 2x^2 - 15x = 0$.**

::: handskrift
typ: brytutpolyekv
:::

::: textlosning
All terms contain $x$, so we take out $x$.

$$
x(x^2 - 2x - 15) = 0
$$

The zero product method gives $x_1 = 0$ or $x^2 - 2x - 15 = 0$. We solve the second
equation with the *pq* formula.

$$
\begin{aligned}
x &= 1 \pm \sqrt{1 + 15} \\
x &= 1 \pm \sqrt{16} \\
x &= 1 \pm 4
\end{aligned}
$$

which gives $x_2 = 1 - 4 = -3$ and $x_3 = 1 + 4 = 5$.

**Answer:** $x_1 = 0$, $x_2 = -3$ and $x_3 = 5$
:::
:::

A quartic equation that contains only $x^4$, $x^2$ and a constant can be
solved by **changing the variable**. We introduce $t = x^2$, so that $x^4 = t^2$.
Then the equation becomes a quadratic equation in $t$. Once $t$ is determined we go
back to $x$ with $x^2 = t$.

::: exempel "Example 3: Change the variable"
**Solve the equation $x^4 - 10x^2 + 9 = 0$.**

::: handskrift
typ: bytvariabel
:::

::: textlosning
We introduce $t = x^2$. Then $x^4 = (x^2)^2 = t^2$, and the equation becomes

$$
t^2 - 10t + 9 = 0
$$

The *pq* formula gives

$$
\begin{aligned}
t &= 5 \pm \sqrt{25 - 9} \\
t &= 5 \pm \sqrt{16} \\
t &= 5 \pm 4
\end{aligned}
$$

which gives $t_1 = 1$ and $t_2 = 9$. We go back to $x$ with $x^2 = t$.

$$
\begin{aligned}
x^2 &= 1 & \qquad x^2 &= 9 \\
x &= \pm \sqrt{1} & \qquad x &= \pm \sqrt{9} \\
x &= \pm 1 & \qquad x &= \pm 3
\end{aligned}
$$

The equation has four solutions, as many as the degree.

**Answer:** $x_1 = -3$, $x_2 = -1$, $x_3 = 1$ and $x_4 = 3$
:::
:::

## The graph of a polynomial function

A function $y = p(x)$, where $p(x)$ is a polynomial, is called a
**polynomial function**. The graph of a polynomial function is a connected
curve without jumps or holes. It can be drawn without lifting the pen from
the paper, and we say that the function is **continuous**.

The solutions to the equation $p(x) = 0$ are the $x$-values where the graph crosses
or touches the $x$-axis. They are called the **zeros** of the polynomial. Since
the equation has at most as many solutions as the degree, a
cubic function can cross the $x$-axis at most three times.

In the graph plotter below the polynomial function is written as a product of three
factors. Drag *p*, *q* and *r* and see where the graph crosses the $x$-axis. Then
drag *a* and see that the zeros stay where they are.

::: graf
titel: y = a(x - p)(x - q)(x - r)
uttryck: a*(x-p)*(x-q)*(x-r)
ekvation: y = {a}(x - {p})(x - {q})(x - {r})
a: 0.25, -1, 1, 0.25
p: -3, -5, 5, 1
q: 1, -5, 5, 1
r: 4, -5, 5, 1
x: -6, 6
y: -6, 6
:::

## Factors and zeros

The graph plotter shows the connection that makes polynomials so useful: **each factor
$(x - a)$ in the polynomial gives the zero $x = a$**, since the factor becomes zero
exactly there. The converse also holds, and the converse relationship has its own
name: **the factor theorem**.

::: formel "The factor theorem"
If $x = a$ is a zero of the polynomial $p(x)$, that is if
$p(a) = 0$, then $(x - a)$ is a factor of the polynomial.
:::

So if we know all the zeros, we can factorise the whole polynomial.

::: formel "Factorising with zeros"
A polynomial of degree 3 with the zeros $x_1$, $x_2$ and $x_3$ can be written

$$
p(x) = k(x - x_1)(x - x_2)(x - x_3)
$$

where $k$ is the coefficient of the term of highest degree. In the same way
a polynomial of degree $n$ with $n$ zeros gives $n$ factors.
:::

::: exempel "Example 4: Factors and zeros"
**a) Factorise $p(x) = 3x^2 - 6x - 24$ using the zeros.<br>b) A cubic polynomial $p(x)$ has the zeros $-2$, $1$ and $4$, and $p(0) = 16$. Determine $p(x)$.**

::: handskrift
typ: faktornollstalle
:::

::: textlosning
**a)** The zeros are the solutions to $3x^2 - 6x - 24 = 0$. We divide
both sides by 3 and use the *pq* formula.

$$
\begin{aligned}
3x^2 - 6x - 24 &= 0 \\
\frac{3x^2 - 6x - 24}{3} &= \frac{0}{3} \\
x^2 - 2x - 8 &= 0 \\
x &= 1 \pm \sqrt{1 + 8} \\
x &= 1 \pm \sqrt{9} \\
x &= 1 \pm 3
\end{aligned}
$$

The zeros are $x_1 = -2$ and $x_2 = 4$. The coefficient of $x^2$ is 3,
so $k = 3$.

$$
p(x) = 3(x - (-2))(x - 4) = 3(x + 2)(x - 4)
$$

**Answer:** $p(x) = 3(x + 2)(x - 4)$

**b)** The zeros give the factors $(x + 2)$, $(x - 1)$ and $(x - 4)$, but
$k$ is unknown.

$$
p(x) = k(x + 2)(x - 1)(x - 4)
$$

We determine $k$ with the condition $p(0) = 16$ and substitute $x = 0$.

$$
\begin{aligned}
p(0) = k(0 + 2)(0 - 1)(0 - 4) &= 16 \\
8k &= 16 \\
\frac{8k}{8} &= \frac{16}{8} \\
k &= 2
\end{aligned}
$$

**Answer:** $p(x) = 2(x + 2)(x - 1)(x - 4)$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Polynomial equations"
- A polynomial equation has a polynomial on one side and zero on the other.
- An equation of degree $n$ has **at most** $n$ real solutions.
- The graph of a polynomial function is continuous: a curve without jumps or holes.
:::

::: sampunkt "The equation $x^n = a$"
- $n$ odd: $x = \sqrt[n]{a}$, for example $x^3 = -8$ gives $x = -2$.
- $n$ even, $a > 0$: $x = \pm \sqrt[n]{a}$, for example $x^4 = 81$ gives $x = \pm 3$.
- $n$ even, $a < 0$: no real solution.
:::

::: sampunkt "Take out x or change the variable"
- No constant term: take out $x$ and use the zero product method.
- $x(x^2 - 2x - 15) = 0$ gives $x = 0$ or $x^2 - 2x - 15 = 0$.
- Only $x^4$, $x^2$ and a constant: introduce $t = x^2$ and solve for $t$.
- Then go back with $x^2 = t$.
:::

::: sampunkt "Factors and zeros"
- **The factor theorem:** if $p(a) = 0$ then $(x - a)$ is a factor, and vice versa.
- $p(x) = k(x - x_1)(x - x_2)(x - x_3)$, where $k$ is the coefficient of the highest degree.
- The zeros can be seen where the graph crosses the $x$-axis.
:::

:::

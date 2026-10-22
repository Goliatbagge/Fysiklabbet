---
kalla: bf38e54259
id: ma2c-2.7
title: Problem solving with quadratic equations
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.7'
---

# Problem solving with quadratic equations

In problem solving it is often a good idea to follow the procedure below.

::: tips "Problem solving"
1. **Interpret the problem.** Define the variables you introduce and draw a
   figure if needed.
2. **Set up one or more equations.**
3. **Solve the equation or the system of equations.** Use a suitable method.
4. **Interpret the answer.** What did the variables stand for? Is the answer reasonable? Can
   any solution be disregarded?
:::

::: exempel "Example 1: Difference and product"
**Two positive numbers have the difference 21 and the product 1 080. What are
the numbers?**

**1. We introduce and define variables.**

::: handskrift
typ: differensprodukt
:::

::: textlosning
- $x$ = the smaller number
- $y$ = the larger number

**2. We set up a system of equations.** Since we have **two**
unknowns, we must set up **two** equations:

$$
\begin{cases}
y - x = 21 & (1) \\
x \cdot y = 1\,080 & (2)
\end{cases}
$$

**3. We solve the system of equations.** We solve for $y$ from equation (1)
and get

$$
y = 21 + x \qquad (3)
$$

We use the substitution method and substitute $y = 21 + x$ into (2):

$$
x(21 + x) = 1\,080
$$

We expand the left-hand side and then solve the equation with the *pq* formula:

$$
21x + x^2 = 1\,080
$$

$$
x^2 + 21x - 1\,080 = 0
$$

$$
x = -\frac{21}{2} \pm \sqrt{\left(\frac{21}{2}\right)^2 + 1\,080}
$$

$$
x = -10.5 \pm \sqrt{1\,190.25} = -10.5 \pm 34.5
$$

$$
x_1 = -10.5 - 34.5 = -45
$$

$$
x_2 = -10.5 + 34.5 = 24
$$

**4. We interpret the answer.** Since $x$ was to be a positive number,
the solution $x_1 = -45$ can be disregarded. So $x = 24$. Substituting
$x = 24$ into (3) gives

$$
y = 21 + 24 = 45
$$

Check: $45 - 24 = 21$ and $24 \cdot 45 = 1\,080$. Correct!

**Answer:** The numbers are 24 and 45.
:::
:::

::: exempel "Example 2: The perimeter of the rectangle"
**A rectangle has the area $1\,215\ \mathrm{cm}^2$. One side is 18 cm shorter
than the other. What is the perimeter of the rectangle?**

::: handskrift
typ: rektangelomkrets
:::

::: textlosning
**1. We draw a figure and introduce variables.** The sides are $x$ cm
and $(x - 18)$ cm.

::: figur
<svg viewBox="24 6 268 158" width="364" height="214" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A rectangle with the base x centimetres and the height x minus 18 centimetres."><rect x="30" y="24" width="180" height="110" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="120" y="156" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="220" y="84" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan> − 18</text><text x="290" y="18" font-size="12" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

**2. The perimeter $O$ is then**

$$
O = x + x + (x - 18) + (x - 18)
$$

$$
O = 4x - 36
$$

**3. We need to find $x$. We use the area!**

$$
x(x - 18) = 1\,215
$$

$$
x^2 - 18x = 1\,215
$$

$$
x^2 - 18x - 1\,215 = 0
$$

The *pq* formula gives

$$
x = 9 \pm \sqrt{9^2 + 1\,215} = 9 \pm \sqrt{1\,296} = 9 \pm 36
$$

$$
x_1 = 9 - 36 = -27
$$

$$
x_2 = 9 + 36 = 45
$$

**4. We interpret the answer.** A length cannot be negative, so the solution
$x = -27$ can be disregarded. So $x = 45$ cm.

Substituting $x = 45$ cm into the formula for the perimeter $O = 4x - 36$ gives

$$
O = 4 \cdot 45 - 36 = 180 - 36 = 144\ \mathrm{cm}
$$

**Answer:** 144 cm
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Four steps"
1. **Interpret the problem.** Define the variables and draw a figure if needed.
2. **Set up** one or more equations.
3. **Solve** with a suitable method.
4. **Interpret the answer.** What did the variables stand for, and is the answer reasonable?
:::

::: sampunkt "Two unknowns require two equations"
- "The difference 21" gives $y - x = 21$.
- "The product 1 080" gives $x \cdot y = 1\,080$.
- The substitution method then gives a **quadratic equation** to solve.
:::

::: sampunkt "The decisive last step"
- A quadratic equation gives **two** roots, but the problem often has only
  **one** reasonable solution.
- Negative lengths, negative amounts or negative numbers when the task said
  positive must be **rejected**.
- Write out why you reject it; that is part of the solution.
:::

::: sampunkt "Common set-ups"
- The area of a rectangle: $\text{base} \cdot \text{height}$, where one is expressed
  in terms of the other.
- Numbers with a known sum or difference and a known product.
- If you draw a figure, the relationships almost always become clearer.
:::
:::

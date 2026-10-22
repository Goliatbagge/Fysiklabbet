---
kalla: 2ac3bec78b
id: ma2c-4.4
title: Theorems and proofs
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.4'
---

# Theorems and proofs

A mathematical proof is a logical argument that leaves no
gaps. Some important concepts:

A basic statement that has been agreed to hold as a foundation, without
requiring a proof, is called an **axiom**. Example: *"Every integer $n$
is followed by the integer $(n + 1)$"* or *"From a given point it is
possible to draw a straight line to another given point"*.

An agreement about what is meant by a concept is called a
**definition**. Example: *"A polygon with three vertices is called a
triangle."*

A statement that has been proved is called a **theorem**. In a proof
**every step** must be justified on the basis of axioms, definitions and/or previously
known theorems.

A completed proof ends with QED (Latin *quod erat demonstrandum*,
"**which was to be proved**" or "**which was to be shown**").

::: formel "Odd and even numbers in proofs"
An even number can always be written: $2k$

An odd number can always be written: $2k + 1$

where $k$ is an integer.
:::

::: formel "Consecutive numbers in proofs"
Numbers "that follow each other" are, for example, 1, 2 and 3 or 85, 86 and 87.
Consecutive numbers can be written

$$
n, \quad n + 1, \quad n + 2, \quad \ldots
$$
:::

::: exempel "Example 1: The exterior angle theorem"
**Consider the figure below. The exterior angle theorem states: "The exterior angle
$x$ is equal to the sum of the two opposite angles $a$ and $c$, that is
$x = a + c$." Prove that the exterior angle theorem holds.**

::: figur
<svg viewBox="18 12 194 108" width="307" height="171" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle with the angles a at the top, c at the bottom left and b at the bottom right. The base is extended to the right so that the exterior angle x is formed at the right vertex."><polygon points="30,100 150,100 90,20" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="150" y1="100" x2="205" y2="100" stroke="#1f2530" stroke-width="1.8"/><path d="M 81.6,31.2 A 14 14 0 0 0 98.4,31.2" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="90" y="48" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><path d="M 46,100 A 16 16 0 0 0 39.6,87.2" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="54" y="96" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><path d="M 134,100 A 16 16 0 0 1 140.4,87.2" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="126" y="96" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><path d="M 168,100 A 18 18 0 0 0 139.2,85.6" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="164" y="78" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

::: handskrift
typ: yttervinkelsatsen
:::

::: textlosning
We write down the geometric relationships that we see and then continue.

$$
a + b + c = 180° \quad \text{(angle sum of a triangle)}
$$

$$
b + x = 180° \quad \text{(angles on a straight line)}
$$

Since both LHS (left-hand sides) are equal to 180°,

$$
a + b + c = b + x
$$

Subtracting $b$ from both sides:

$$
a + c = x
$$

that is

$$
x = a + c
$$

QED
:::
:::

::: exempel "Example 2: The square of an even number"
**Show that the square of an even number is always divisible by 4.**

::: handskrift
typ: jamntkvadrat
:::

::: textlosning
We call the number $x$. Since the number is even, it can be written $x = 2k$,
where $k$ is an integer. We write and investigate the square of this
number:

$$
x^2 = (2k)^2 = 4k^2
$$

$4k^2$ is always divisible by 4, for

$$
\frac{4k^2}{4} = k^2
$$

where $k^2$ is always an integer. (Dictionary: "for" = "because".)

QED
:::
:::

::: exempel "Example 3: Three consecutive integers"
**Show that if $a$, $b$ and $c$ are three consecutive integers, then
their sum is divisible by 3.**

::: handskrift
typ: treheltal
:::

::: textlosning
Since they are consecutive integers, we can call the numbers $a$, $b$
and $c$ $n$, $(n + 1)$ and $(n + 2)$. This gives

$$
a + b + c = n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)
$$

This sum is always divisible by 3, since

$$
\frac{3(n + 1)}{3} = n + 1
$$

is an integer.

QED
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Four basic concepts"
- **Axiom**: a basic statement we have agreed on, without proof.
- **Definition**: an agreement about what a concept means.
- **Theorem**: a statement that **has been proved**.
- **Proof**: a logical argument without gaps, where **every step**
  is justified.
:::

::: sampunkt "The ending"
- **QED** = which was to be proved.
- It can also be read: which was to be shown.
:::

::: sampunkt "Writing numbers in general"
- **Even number**: $2k$.
- **Odd number**: $2k + 1$.
- **Consecutive**: $n$, $n + 1$, $n + 2$.
- $k$ and $n$ are integers. That is the key to proofs in number theory.
:::

::: sampunkt "This is how divisibility is shown"
- Rewrite the expression so that the required factor can be **taken out**.
- $(2k)^2 = 4k^2$ is divisible by 4, since
  $\dfrac{4k^2}{4} = k^2$ is an integer.
- $n + (n+1) + (n+2) = 3(n + 1)$ is divisible by 3.
:::

::: sampunkt "Geometric proofs"
- Write down the relationships you **see** in the figure, with justification.
- Look for two expressions that are equal to **the same thing**, and set them
  equal.
- The exterior angle theorem is proved like this: both
  $a + b + c$ and $b + x$ are $180^\circ$.
:::
:::

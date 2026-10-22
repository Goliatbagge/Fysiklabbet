---
kalla: 0a192c702d
id: ma2c-4.3
title: Implication and equivalence
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.3'
---

# Implication and equivalence

A logical relationship where a certain statement 1 being true means that
another statement 2 **must** also be true is called an **implication**.
Somewhat simplified, you can say that an implication is when something leads to
something else. Implication is written with the symbol ⟹ and is read "implies"
or "leads to".

A logical relationship where the implication also holds the other way,
that is if statement 2 is true and this means that statement 1 also
**must** be true, is called an **equivalence**. Equivalence is written with
the symbol ⟺ and is read "is equivalent to".

If an implication is false, you prove it by giving a
**counterexample** (a single counterexample is enough).

::: formel "Implication and equivalence"
**Implication:** $A \implies B$. A leads to B, but B does not have to
lead to A.

**Equivalence:** $A \iff B$. A leads to B and B leads to A.
:::

::: exempel "Example 1: The dachshund and the dog"
**Consider the sentence "If it is a dachshund, then it is a dog".<br>a) Write the sentence with logical symbols.<br>b) Is the sentence an implication or an equivalence?**

::: handskrift
typ: taxenhunden
:::

::: textlosning
**a)** The statements that are linked together are "it is a dachshund" and "it is a
dog".

**Answer:** It is a dachshund ⟹ It is a dog

**b)** The implication *It is a dachshund ⟹ It is a dog* is true.

We investigate the converse:

*It is a dog ⟹ It is a dachshund*

This is false. Counterexample: It could be a poodle.

Since the implication only holds in one direction, it is not an
equivalence.

**Answer:** It is an implication.
:::
:::

::: exempel "Example 2: Which logical sign?"
**Decide which logical sign should go between the statements:**

::: handskrift
typ: logisktecken
:::

::: textlosning
*All the angles in the triangle are 60°* ____ *The triangle is equilateral*

We investigate whether the implications are true in each direction.

*All the angles in the triangle are 60° ⟹ The triangle is equilateral*

This statement is true, since there are no triangles that
this applies to apart from equilateral triangles.

We investigate the converse.

*The triangle is equilateral ⟹ All the angles in the triangle are 60°*

This statement is also true. In all equilateral triangles all
the angles are 60°.

The implication thus holds in both directions, and we then have an equivalence.

**Answer:** ⟺
:::
:::

::: exempel "Example 3: Do the implications hold?"
**Decide whether the following implications hold.<br>a) $2x + 5 = 11 \implies x = 3$<br>b) you eat sweets ⟹ you get holes in your teeth<br>c) $x^2 = 25 \implies x = 5$<br>d) $x^3 = 27 \implies x = 3$**

::: handskrift
typ: stammerimplikation
:::

::: textlosning
**a)** We solve the equation to investigate whether the solution is uniquely
$x = 3$:

$$
2x + 5 = 11 \iff 2x = 6 \iff x = 3
$$

and there are no other solutions.

**Answer:** The implication holds.

**b)** you eat sweets ⟹ you get holes in your teeth

**Answer:** The implication does not hold. Counterexample: There are people who eat
sweets who do not get holes in their teeth.

**c)** We solve the equation to investigate whether the solution is uniquely
$x = 5$:

$$
x^2 = 25 \iff x = \pm\sqrt{25} = \pm 5
$$

**Answer:** The implication does not hold. Counterexample: $x = -5$.

**d)** We solve the equation to investigate whether the solution is uniquely
$x = 3$:

$$
x^3 = 27 \iff x = \sqrt[3]{27} = 3
$$

(there are no other solutions).

**Answer:** The implication holds.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Implication"
- That one statement **leads to** another.
- Written $A \implies B$ and read "leads to".
- Holds only **in one direction**.
:::

::: sampunkt "Equivalence"
- The implication holds **in both directions**.
- Written $A \iff B$ and read "is equivalent to".
:::

::: sampunkt "How to decide which"
1. Investigate whether $A \implies B$ is true.
2. Investigate **the converse**, that is $B \implies A$.
3. True in both directions gives equivalence, otherwise only implication.
:::

::: sampunkt "Counterexample"
- If an implication is **false**, this is proved with a **counterexample**.
- **A single one is enough.**
- "It is a dog $\implies$ it is a dachshund" is disproved by a poodle.
:::

::: sampunkt "Typical examples"
- "It is a dachshund $\implies$ it is a dog": only implication.
- "All angles are $60^\circ$ $\iff$ the triangle is equilateral": equivalence,
  since both directions hold.
:::
:::

---
kalla: a651e78e68
id: ma2c-4.9
title: The triangle theorems
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.9'
---

# The triangle theorems

We will now look at some special relationships in triangles that together
are called **the triangle theorems**.

::: formel "The top triangle theorem"
A parallel transversal forms a top triangle that is similar to the
original triangle.

$$
\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}
$$

$$
\frac{a}{a + b} = \frac{c}{c + d} = \frac{e}{f}
$$

::: härledning "Proof: The top triangle theorem"
$\angle A$ is a common angle in $\triangle ABC$ and $\triangle ADE$.

$\angle ABC = \angle ADE$ (corresponding angles)

$\triangle ABC$ and $\triangle ADE$ thus have two equal angles
$\implies \triangle ABC \sim \triangle ADE$ (the triangles are
similar).

The ratio between corresponding sides is then the same, that is

$$
\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}
$$

QED
:::
:::

::: figur
<svg viewBox="8 6 216 152" width="342" height="241" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle A B C with a parallel transversal through the points D and E. The line segments a, b, c, d, e and f are marked."><polygon points="100,20 25,135 195,135" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="16" y1="66" x2="216" y2="66" stroke="#1f2530" stroke-width="1.4"/><text x="100" y="14" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="19" y="148" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="201" y="148" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="62" y="62" font-size="12" text-anchor="end" fill="#1f2530">D</text><text x="139" y="62" font-size="12" text-anchor="start" fill="#1f2530">E</text><text x="78" y="42" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="42" y="102" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="122" y="42" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="172" y="102" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">d</tspan></text><text x="100" y="80" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">e</tspan></text><text x="110" y="130" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan></text></svg>
:::

The parallel transversal is parallel to the side $BC$; $a = AD$, $b = DB$,
$c = AE$, $d = EC$, $e = DE$ and $f = BC$.

::: formel "The transversal theorem"
A parallel transversal divides the sides of a triangle in the same ratio.

$$
\frac{AD}{DB} = \frac{AE}{EC}
$$

$$
\frac{a}{b} = \frac{c}{d}
$$

::: härledning "Proof: The transversal theorem"
We have already shown that $\triangle ABC \sim \triangle ADE$. This
gives

$$
\frac{a}{a + b} = \frac{c}{c + d}
$$

We invert both sides, split up the fractions and then solve for
$\dfrac{a}{b}$:

$$
\frac{a + b}{a} = \frac{c + d}{c}
$$

$$
\frac{a}{a} + \frac{b}{a} = \frac{c}{c} + \frac{d}{c}
$$

$$
1 + \frac{b}{a} = 1 + \frac{d}{c}
$$

We subtract 1 from both sides:

$$
\frac{b}{a} = \frac{d}{c}
$$

We invert both sides:

$$
\frac{a}{b} = \frac{c}{d}
$$

QED
:::
:::

::: tips "The top triangle theorem or the transversal theorem?"
If we are going to use a triangle theorem where the base of the top triangle

- **is used**, we can only use the top triangle theorem.
- **is not used**, we can use both the top triangle theorem and
  the transversal theorem. The rule of thumb is then to use the transversal theorem,
  since the calculation is often simpler and quicker.
:::

::: formel "The angle bisector theorem"
A bisector (a ray that divides an angle in half) divides a triangle
according to the ratio

$$
\frac{AD}{BD} = \frac{AC}{BC}
$$

::: härledning "Proof: The angle bisector theorem"
We draw an arbitrary triangle $ABC$ and draw in a bisector $CD$
(where $D$ lies on the side $AB$). We want to show that
$\dfrac{AD}{BD} = \dfrac{AC}{BC}$.

We extend the bisector to a point $P$ so that the line segments $CB$ and
$BP$ are of equal length and then form an isosceles triangle $\triangle CBP$.

::: figur
<svg viewBox="0 4 236 136" width="374" height="215" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="The triangle A B C with the bisector from C through the point D on the side A B, extended to the point P so that B P is as long as C B."><polygon points="12,78 108,28 98,117" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="12" y1="78" x2="102.7" y2="75.5" stroke="#1f2530" stroke-width="1.4"/><line x1="102.7" y1="75.5" x2="206.6" y2="72.7" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="6 5"/><line x1="108" y1="28" x2="206.6" y2="72.7" stroke="#1f2530" stroke-width="1.4"/><text x="6" y="82" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="110" y="18" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="98" y="131" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="107" y="90" font-size="12" text-anchor="start" fill="#1f2530">D</text><text x="212" y="77" font-size="12" text-anchor="start" fill="#1f2530">P</text><line x1="57.9" y1="49" x2="62.1" y2="57" stroke="#1f2530" stroke-width="1.3"/><line x1="159.2" y1="46.3" x2="155.4" y2="54.5" stroke="#1f2530" stroke-width="1.3"/></svg>
:::

We study $\triangle CAD$ and $\triangle BDP$:

$\angle BCD = \angle BPD$ (base angles in the isosceles triangle
$\triangle CBP$)

$\angle BCD = \angle ACD$ (by definition, since $CP$ is a bisector
that divides them equally)

Therefore

$$
\angle BPD = \angle ACD
$$

$$
\angle BDP = \angle ADC \quad \text{(vertically opposite angles)}
$$

$\triangle CAD$ and $\triangle BDP$ thus have two equal angles and are
similar. We set up the side ratios:

$$
\frac{AD}{BD} = \frac{AC}{BP}
$$

Since $BP = BC$, we can replace $BP$ with $BC$, which gives

$$
\frac{AD}{BD} = \frac{AC}{BC}
$$

QED
:::
:::

::: figur
<svg viewBox="10 -2 180 154" width="285" height="244" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle A B C where the bisector from C divides the angle at C in half and meets the side A B at the point D."><polygon points="20,130 170,130 100,18" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="100" y1="18" x2="96.6" y2="130" stroke="#1f2530" stroke-width="1.4"/><path d="M 91.9,29.4 A 14 14 0 0 0 99.6,32" fill="none" stroke="#1f2530" stroke-width="1"/><path d="M 99.6,32 A 14 14 0 0 0 107.4,29.9" fill="none" stroke="#1f2530" stroke-width="1"/><text x="96" y="10" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="14" y="143" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="176" y="143" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="96.6" y="144" font-size="12" text-anchor="middle" fill="#1f2530">D</text></svg>
:::

::: exempel "Example 1: Parallel transversal"
**Determine the side $x$.**

::: figur
<svg viewBox="10 -2 214 156" width="339" height="247" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle with a parallel transversal through D and E. The upper part of the left side is 4, the lower part 8, the upper part of the right side is x and the lower part 10 centimetres."><polygon points="95,16 25,135 190,135" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="18" y1="55.7" x2="200" y2="55.7" stroke="#1f2530" stroke-width="1.4"/><text x="95" y="10" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="19" y="148" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="196" y="148" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="66" y="51" font-size="12" text-anchor="end" fill="#1f2530">D</text><text x="130" y="51" font-size="12" text-anchor="start" fill="#1f2530">E</text><text x="78" y="38" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="42" y="100" font-size="11" text-anchor="end" fill="#1f2530">8</text><text x="117" y="38" font-size="11" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="166" y="100" font-size="11" text-anchor="start" fill="#1f2530">10</text><text x="222" y="14" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: paralleltransversal
:::

::: textlosning
Since we are not calculating with the bases of the triangles, we can use both
the transversal theorem and the top triangle theorem. Choose a method. (The rule of thumb is
to use the transversal theorem when possible.)

**The transversal theorem gives**

$$
\frac{x}{10} = \frac{4}{8}
$$

$$
x = \frac{4}{8} \cdot 10 = 5
$$

**The top triangle theorem gives**

$$
\frac{4}{4 + 8} = \frac{x}{x + 10}
$$

$$
\frac{4}{12} = \frac{x}{x + 10}
$$

Cross-multiplication gives

$$
4(x + 10) = 12x
$$

$$
4x + 40 = 12x
$$

$$
40 = 8x \iff x = 5
$$

**Answer:** 5 cm
:::
:::

::: exempel "Example 2: Bisector"
**Determine the side $x$.**

::: figur
<svg viewBox="8 0 240 142" width="415" height="245" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle where a bisector from the left vertex divides the opposite side into the parts 3 and 5. The side next to the 3-part is 9 and the base is x centimetres."><polygon points="15,120 119.8,68 210,120" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="15" y1="120" x2="153.6" y2="87.5" stroke="#1f2530" stroke-width="1.4"/><path d="M 49,120 A 34 34 0 0 0 48.1,112.2" fill="none" stroke="#1f2530" stroke-width="1"/><path d="M 48.1,112.2 A 34 34 0 0 0 45.5,104.9" fill="none" stroke="#1f2530" stroke-width="1"/><text x="62" y="86" font-size="11" text-anchor="middle" fill="#1f2530">9</text><text x="143" y="70" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="188" y="96" font-size="11" text-anchor="middle" fill="#1f2530">5</text><text x="112" y="134" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="244" y="14" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: bisektrissatsen
:::

::: textlosning
The angle bisector theorem gives

$$
\frac{5}{3} = \frac{x}{9}
$$

We multiply both sides by 9 to solve for $x$:

$$
x = \frac{5}{3} \cdot 9 = \frac{45}{3} = 15
$$

**Answer:** 15 cm
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The top triangle theorem"
- A **parallel transversal** forms a top triangle that is **similar**
  to the whole triangle.
- $\dfrac{a}{a + b} = \dfrac{c}{c + d} = \dfrac{e}{f}$
- Note that the denominator is the **whole** side, not just the lower part.
:::

::: sampunkt "The transversal theorem"
- The parallel transversal divides the sides in **the same ratio**.
- $\dfrac{a}{b} = \dfrac{c}{d}$
- Here only the **parts** of the sides are compared, not the whole sides.
:::

::: sampunkt "Which one should you choose?"
- If the **base** of the top triangle is used in the task: only the top triangle theorem
  works.
- If it is not used: both work, but **the transversal theorem** usually gives
  simpler calculations.
:::

::: sampunkt "The angle bisector theorem"
- A **bisector** divides the opposite side in the same ratio as the
  adjacent sides.
- $\dfrac{AD}{BD} = \dfrac{AC}{BC}$
:::

::: sampunkt "The proofs are based on similarity"
- All three theorems are proved by finding **two equal angles** in two
  triangles, which gives similarity.
- Then the side ratios are set up and rewritten.
:::
:::

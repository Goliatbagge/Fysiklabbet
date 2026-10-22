---
kalla: 57a9f70d18
id: ma3b-2.2
title: Linear optimisation
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.2'
---

# Linear optimisation

A cabinetmaker makes chairs and tables. Each chair and each table gives
a profit, but the workshop only has a certain number of working hours per week.
How many of each should be made for the profit to be as large as
possible? This kind of question is solved with **linear optimisation**. To optimise
means to find the best choice, for example the largest profit or the lowest
cost, when the resources are limited.

## Concepts

A problem in linear optimisation is built up of a few parts that always
come back.

- **Variables**: the quantities we can choose ourselves, for example the number of
  chairs $x$ and the number of tables $y$.
- **Constraints**: the limitations, written as inequalities. These also include
  $x \geq 0$ and $y \geq 0$, because quantities cannot be negative.
- **Feasible region**: the region in the coordinate system where all the constraints
  hold. Every point in the region is a possible choice.
- **Objective function**: the quantity that is to be as large or as small as
  possible, for example the profit $V = 400x + 500y$.

The word linear comes from the fact that both the constraints and the objective function are linear.
The variables only occur to the first power, so all the boundaries become straight
lines when the region is drawn.

::: formel "The vertex method"
If the feasible region is bounded, the objective function takes its **largest** and
its **smallest** value at one of the **vertices** of the region.

So calculate the value of the objective function at each vertex and compare.
:::

::: exempel "Example 1: Largest and smallest value in a region"
**The figure shows a region with the vertices $(0, 0)$, $(5, 0)$, $(3, 2)$ and $(0, 3)$. Determine the largest and the smallest value of $z = 2x + 3y$ in the region.**

::: figur
<svg viewBox="-38 -197 257 223" width="349" height="303" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A shaded region bounded by the axes and the lines x plus y equals 5 and x plus 3y equals 9. The vertices are 0 comma 0, 5 comma 0, 3 comma 2 and 0 comma 3."><line x1="30" y1="21" x2="30" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="21" x2="60" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="90" y1="21" x2="90" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="21" x2="120" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="150" y1="21" x2="150" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="21" x2="180" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-30" x2="198" y2="-30" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-60" x2="198" y2="-60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-90" x2="198" y2="-90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-120" x2="198" y2="-120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-150" x2="198" y2="-150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 150,0 90,-60 0,-90" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-21" y1="0" x2="208" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="216,0 206,-4.5 206,4.5" fill="#1f2530"/><line x1="0" y1="21" x2="0" y2="-181" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-189 -4.5,-179 4.5,-179" fill="#1f2530"/><text x="214" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-183" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="30" y1="-3.5" x2="30" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="60" y1="-3.5" x2="60" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="60" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="90" y1="-3.5" x2="90" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="90" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="120" y1="-3.5" x2="120" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="120" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="150" y1="-3.5" x2="150" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="150" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="180" y1="-3.5" x2="180" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="180" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="-3.5" y1="-30" x2="3.5" y2="-30" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-26" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-60" x2="3.5" y2="-60" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-56" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-90" x2="3.5" y2="-90" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-120" x2="3.5" y2="-120" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-116" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-150" x2="3.5" y2="-150" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-146" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-12" y1="-162" x2="162" y2="12" stroke="#2563c9" stroke-width="2"/><text x="46.9" y="-112.9" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(45 46.9 -112.9)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 5</text><line x1="-12" y1="-94" x2="195" y2="-25" stroke="#4a7d3a" stroke-width="2"/><text x="152.2" y="-46.6" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(18.4 152.2 -46.6)"><tspan font-style="italic">x</tspan> + 3<tspan font-style="italic">y</tspan> = 9</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="150" cy="0" r="3.6" fill="#c8324a"/><text x="156" y="-6" font-size="12.5" text-anchor="start" fill="#c8324a">(5, 0)</text><circle cx="90" cy="-60" r="3.6" fill="#c8324a"/><text x="82" y="-44" font-size="12.5" text-anchor="end" fill="#c8324a">(3, 2)</text><circle cx="0" cy="-90" r="3.6" fill="#c8324a"/><text x="-11" y="-86" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 3)</text></svg>
:::

::: handskrift
typ: opthorn
:::

::: textlosning
According to the vertex method, it is enough to calculate $z = 2x + 3y$ at the
four vertices of the region.

| Vertex | $z = 2x + 3y$ |
| --- | --- |
| $(0, 0)$ | $2 \cdot 0 + 3 \cdot 0 = 0$ |
| $(5, 0)$ | $2 \cdot 5 + 3 \cdot 0 = 10$ |
| $(3, 2)$ | $2 \cdot 3 + 3 \cdot 2 = 12$ |
| $(0, 3)$ | $2 \cdot 0 + 3 \cdot 3 = 9$ |

The largest value is 12, at the point $(3, 2)$. The smallest value is 0, at
the point $(0, 0)$.

**Answer:** The largest value is 12 and the smallest value is 0.
:::
:::

## Why is the best value at a vertex?

We continue with the objective function $z = 2x + 3y$ from Example 1. All the points
where $z$ has a particular value, for example $z = 6$, lie on the line
$2x + 3y = 6$. Such a line is called a **level line**. The level lines for
different values of $z$ are parallel, and the larger $z$ is, the further up to
the right the line lies.

::: figur
<svg viewBox="-24 -188 273 214" width="371" height="290" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The shaded region with the vertices 0 comma 0, 5 comma 0, 3 comma 2 and 0 comma 3, and four parallel level lines 2x plus 3y equals z for z equal to 3, 6, 9 and 12. The line z equals 12 touches the region only at the vertex 3 comma 2."><line x1="30" y1="21" x2="30" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="21" x2="60" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="90" y1="21" x2="90" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="21" x2="120" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="150" y1="21" x2="150" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="21" x2="180" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="210" y1="21" x2="210" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-30" x2="228" y2="-30" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-60" x2="228" y2="-60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-90" x2="228" y2="-90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-120" x2="228" y2="-120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-150" x2="228" y2="-150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 150,0 90,-60 0,-90" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-21" y1="0" x2="238" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="246,0 236,-4.5 236,4.5" fill="#1f2530"/><line x1="0" y1="21" x2="0" y2="-172" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-180 -4.5,-170 4.5,-170" fill="#1f2530"/><text x="244" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-174" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="30" y1="-3.5" x2="30" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="60" y1="-3.5" x2="60" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="60" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="90" y1="-3.5" x2="90" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="90" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="120" y1="-3.5" x2="120" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="120" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="150" y1="-3.5" x2="150" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="150" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="180" y1="-3.5" x2="180" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="180" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="210" y1="-3.5" x2="210" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="210" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="-3.5" y1="-30" x2="3.5" y2="-30" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-26" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-60" x2="3.5" y2="-60" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-56" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-90" x2="3.5" y2="-90" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-86" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-120" x2="3.5" y2="-120" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-116" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-150" x2="3.5" y2="-150" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-146" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-7.5" y1="-35" x2="56.3" y2="7.5" stroke="#b8641c" stroke-width="2" stroke-dasharray="7 5"/><text x="28.3" y="-17.2" font-size="12" text-anchor="middle" fill="#b8641c" transform="rotate(33.7 28.3 -17.2)"><tspan font-style="italic">z</tspan> = 3</text><line x1="-7.5" y1="-65" x2="101.3" y2="7.5" stroke="#b8641c" stroke-width="2" stroke-dasharray="7 5"/><text x="28.3" y="-47.2" font-size="12" text-anchor="middle" fill="#b8641c" transform="rotate(33.7 28.3 -47.2)"><tspan font-style="italic">z</tspan> = 6</text><line x1="-7.5" y1="-95" x2="146.3" y2="7.5" stroke="#b8641c" stroke-width="2" stroke-dasharray="7 5"/><text x="28.3" y="-77.2" font-size="12" text-anchor="middle" fill="#b8641c" transform="rotate(33.7 28.3 -77.2)"><tspan font-style="italic">z</tspan> = 9</text><line x1="-7.5" y1="-125" x2="191.3" y2="7.5" stroke="#c8324a" stroke-width="2.4"/><text x="28.3" y="-107.2" font-size="12" text-anchor="middle" fill="#c8324a" transform="rotate(33.7 28.3 -107.2)"><tspan font-style="italic">z</tspan> = 12</text><circle cx="90" cy="-60" r="3.6" fill="#c8324a"/><text x="99" y="-66" font-size="12.5" text-anchor="start" fill="#c8324a">(3, 2)</text></svg>

The level lines $2x + 3y = z$ for $z = 3$, $6$, $9$ and $12$. The last one that
still touches the region is $z = 12$, and it only touches the vertex
$(3, 2)$.
:::

All the points on a level line give the same value of $z$. So if the line passes through the
shaded region, there are feasible points that give exactly that value.
If the line lies completely outside the region, $z$ cannot have that value.

**Investigate in the graph below.** The slider changes the value of $z$, and the line is
the level line $2x + 3y = z$, rewritten as $y = \dfrac{z - 2x}{3}$.

1. Drag the slider to $z = 0$. Which point in the region does the line touch?
2. Increase $z$ a little at a time. See how the line moves parallel upwards to the right,
   and that it passes through the region the whole time.
3. Find the **largest** value of $z$ where the line still touches
   the region. Which point does it touch then?

::: graf
titel: 2x + 3y = z
uttryck: (z - 2*x)/3
ekvation: 2x + 3y = {z}
z: 6, 0, 16, 0.5
område: 0 0; 5 0; 3 2; 0 3
hörn: ja
skärning: nej
x: -0.8, 9
y: -0.8, 6
:::

At $z = 0$ the line only touches the vertex $(0, 0)$, so the smallest value is 0.
At $z = 12$ the line only touches the vertex $(3, 2)$, and if you increase $z$ even more,
the line ends up completely outside the region. So the largest value is 12. Both
the largest and the smallest value are at a vertex, just as
the vertex method says.

::: tips "Method for linear optimisation"
1. Introduce variables and write down what they stand for.
2. Set up the constraints as inequalities. Do not forget $x \geq 0$ and
   $y \geq 0$.
3. Set up the objective function.
4. Draw the feasible region.
5. Determine the vertices. Calculate points of intersection with systems of equations if they
   cannot be read off exactly.
6. Calculate the value of the objective function at each vertex.
7. Answer the question in its context.
:::

::: exempel "Example 2: Largest profit"
**A cabinetmaker makes chairs and tables. A chair requires 2 hours of carpentry and 1 hour of painting. A table requires 3 hours of carpentry and 1 hour of painting. Each week there are at most 24 hours for carpentry and at most 10 hours for painting. The profit is 400 kr per chair and 500 kr per table.<br>a) Set up the constraints and the objective function.<br>b) How many chairs and tables should the cabinetmaker make each week for the profit to be as large as possible, and how large is the profit then?**

::: handskrift
typ: optmobler
:::

::: textlosning
**Solution a)** We let $x$ be the number of chairs and $y$ the number of tables per week.

The carpentry takes $2x$ hours for the chairs and $3y$ hours for the tables, and
together it may be at most 24 hours. The painting takes $x + y$ hours and
may be at most 10 hours.

$$
\begin{cases}
x \geq 0 \\
y \geq 0 \\
2x + 3y \leq 24 \\
x + y \leq 10
\end{cases}
$$

The profit is 400 kr for each chair and 500 kr for each table.
The objective function is the profit in kronor:

$$
V = 400x + 500y
$$

**Answer:** The constraints are $x \geq 0$, $y \geq 0$, $2x + 3y \leq 24$ and
$x + y \leq 10$. The objective function is $V = 400x + 500y$.

**Solution b)** The line $2x + 3y = 24$ passes through $(0, 8)$ and $(12, 0)$. The line
$x + y = 10$ passes through $(0, 10)$ and $(10, 0)$. The test point $(0, 0)$
satisfies both inequalities, so the feasible region lies below both
lines, in the first quadrant.

::: figur
<svg viewBox="-38 -262 339 288" width="460" height="391" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The feasible region for the cabinetmaker: below the lines 2x plus 3y equals 24 and x plus y equals 10 in the first quadrant, with the vertices 0 comma 0, 10 comma 0, 6 comma 4 and 0 comma 8."><line x1="22" y1="15.4" x2="22" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="15.4" x2="44" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="15.4" x2="66" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="15.4" x2="88" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="15.4" x2="110" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="15.4" x2="132" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="15.4" x2="154" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="15.4" x2="176" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="198" y1="15.4" x2="198" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="220" y1="15.4" x2="220" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="242" y1="15.4" x2="242" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="15.4" x2="264" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-22" x2="279.4" y2="-22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-44" x2="279.4" y2="-44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-66" x2="279.4" y2="-66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-88" x2="279.4" y2="-88" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-110" x2="279.4" y2="-110" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-132" x2="279.4" y2="-132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-154" x2="279.4" y2="-154" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-176" x2="279.4" y2="-176" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-198" x2="279.4" y2="-198" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-220" x2="279.4" y2="-220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 220,0 132,-88 0,-176" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-15.4" y1="0" x2="289.4" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="297.4,0 287.4,-4.5 287.4,4.5" fill="#1f2530"/><line x1="0" y1="15.4" x2="0" y2="-245.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-253.4 -4.5,-243.4 4.5,-243.4" fill="#1f2530"/><text x="295.4" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-247.4" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="22" y1="-3.5" x2="22" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="44" y1="-3.5" x2="44" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="44" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="66" y1="-3.5" x2="66" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="88" y1="-3.5" x2="88" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="88" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="110" y1="-3.5" x2="110" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="132" y1="-3.5" x2="132" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="132" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="154" y1="-3.5" x2="154" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="176" y1="-3.5" x2="176" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="176" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="198" y1="-3.5" x2="198" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="220" y1="-3.5" x2="220" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="242" y1="-3.5" x2="242" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="264" y1="-3.5" x2="264" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="264" y="16" font-size="12" text-anchor="middle" fill="#1f2530">12</text><line x1="-3.5" y1="-22" x2="3.5" y2="-22" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-18" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-44" x2="3.5" y2="-44" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-40" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-66" x2="3.5" y2="-66" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-62" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-88" x2="3.5" y2="-88" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-84" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-110" x2="3.5" y2="-110" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-106" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-132" x2="3.5" y2="-132" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-128" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-3.5" y1="-154" x2="3.5" y2="-154" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-150" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-176" x2="3.5" y2="-176" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-198" x2="3.5" y2="-198" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-194" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="-3.5" y1="-220" x2="3.5" y2="-220" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-216" font-size="12" text-anchor="end" fill="#1f2530">10</text><line x1="-8.8" y1="-181.9" x2="268" y2="2.6" stroke="#2563c9" stroke-width="2"/><text x="208.5" y="-45.4" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(33.7 208.5 -45.4)">2<tspan font-style="italic">x</tspan> + 3<tspan font-style="italic">y</tspan> = 24</text><line x1="-8.8" y1="-228.8" x2="222.6" y2="2.6" stroke="#4a7d3a" stroke-width="2"/><text x="66.5" y="-163.3" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(45 66.5 -163.3)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 10</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="220" cy="0" r="3.6" fill="#c8324a"/><text x="227" y="17" font-size="12.5" text-anchor="middle" fill="#c8324a">(10, 0)</text><circle cx="132" cy="-88" r="3.6" fill="#c8324a"/><text x="124" y="-71" font-size="12.5" text-anchor="end" fill="#c8324a">(6, 4)</text><circle cx="0" cy="-176" r="3.6" fill="#c8324a"/><text x="-7" y="-172" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 8)</text></svg>

The feasible region for the cabinetmaker, with the vertices marked.
:::

The vertices $(0, 0)$, $(10, 0)$ and $(0, 8)$ lie on the axes. The fourth
vertex is the point of intersection of the sloping lines.

$$
\begin{cases}
2x + 3y = 24 \\
x + y = 10
\end{cases}
$$

We multiply the second equation by $-2$, so that it gets the term
$-2x$, and write out the system again.

$$
\begin{cases}
2x + 3y = 24 \\
-2x - 2y = -20
\end{cases}
$$

Now we add the equations side by side, and the $x$-terms cancel each other out:
$y = 4$.

Substituting into the second equation, $x + y = 10$, gives $x + 4 = 10$, so
$x = 6$. The fourth vertex is $(6, 4)$.

We calculate the profit $V = 400x + 500y$ at each vertex.

| Vertex | $V = 400x + 500y$ |
| --- | --- |
| $(0, 0)$ | $400 \cdot 0 + 500 \cdot 0 = 0$ |
| $(10, 0)$ | $400 \cdot 10 + 500 \cdot 0 = 4\,000$ |
| $(6, 4)$ | $400 \cdot 6 + 500 \cdot 4 = 4\,400$ |
| $(0, 8)$ | $400 \cdot 0 + 500 \cdot 8 = 4\,000$ |

The vertex $(6, 4)$ gives the largest profit.

**Answer:** 6 chairs and 4 tables give the largest profit, 4 400 kr per week.
:::
:::

## Smallest value and unbounded regions

Sometimes the objective function is to be as **small** as possible, for example a
cost. Then the constraints often have $\geq$, because something must be
achieved: at least so many seats, at least so much nutrition. The vertex method
works in the same way. We choose the vertex that gives the smallest value.

A region described by $\geq$ conditions can continue without limit upwards
and to the right. Then there is no largest value of a cost, but the smallest
value is still at a vertex.

::: exempel "Example 3: Lowest cost"
**A school is going to hire buses for an outing for 300 people. A small bus has 30 seats and costs 2 000 kr. A large bus has 50 seats and costs 4 000 kr. The bus company only has 8 drivers available, so the school can hire at most 8 buses. How many buses of each kind should the school hire for the cost to be as low as possible?**

::: handskrift
typ: optbussar
:::

::: textlosning
We let $x$ be the number of small buses and $y$ the number of large buses.

The buses must hold at least 300 people, and at most 8 buses can be hired.

$$
\begin{cases}
x \geq 0 \\
y \geq 0 \\
30x + 50y \geq 300 \\
x + y \leq 8
\end{cases}
$$

The cost is to be minimised, and the objective function is $K = 2\,000x + 4\,000y$.

The line $30x + 50y = 300$ passes through $(0, 6)$ and $(10, 0)$. The test point
$(0, 0)$ gives $0 \geq 300$, which is not true, so the region lies on the
other side, above the line. The line $x + y = 8$ passes through $(0, 8)$ and
$(8, 0)$, and there the region lies below the line.

::: figur
<svg viewBox="-38 -240 316 266" width="429" height="361" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The feasible region for the buses is a triangle above the line 30x plus 50y equals 300 and below the line x plus y equals 8, with the vertices 0 comma 6, 0 comma 8 and 5 comma 3."><line x1="24" y1="16.8" x2="24" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="16.8" x2="48" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="16.8" x2="72" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="16.8" x2="96" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="16.8" x2="120" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="16.8" x2="144" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="16.8" x2="168" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="16.8" x2="192" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="16.8" x2="216" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="16.8" x2="240" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-24" x2="256.8" y2="-24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-48" x2="256.8" y2="-48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-72" x2="256.8" y2="-72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-96" x2="256.8" y2="-96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-120" x2="256.8" y2="-120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-144" x2="256.8" y2="-144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-168" x2="256.8" y2="-168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-192" x2="256.8" y2="-192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,-144 120,-72 0,-192" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-16.8" y1="0" x2="266.8" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="274.8,0 264.8,-4.5 264.8,4.5" fill="#1f2530"/><line x1="0" y1="16.8" x2="0" y2="-223.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-231.6 -4.5,-221.6 4.5,-221.6" fill="#1f2530"/><text x="272.8" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-225.6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24" y1="-3.5" x2="24" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="24" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="48" y1="-3.5" x2="48" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="48" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="72" y1="-3.5" x2="72" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="72" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="96" y1="-3.5" x2="96" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="96" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="120" y1="-3.5" x2="120" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="120" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="144" y1="-3.5" x2="144" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="144" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="168" y1="-3.5" x2="168" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="168" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="192" y1="-3.5" x2="192" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="192" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="216" y1="-3.5" x2="216" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="216" y="16" font-size="12" text-anchor="middle" fill="#1f2530">9</text><line x1="240" y1="-3.5" x2="240" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="240" y="16" font-size="12" text-anchor="middle" fill="#1f2530">10</text><line x1="-3.5" y1="-24" x2="3.5" y2="-24" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-20" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-48" x2="3.5" y2="-48" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-44" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-72" x2="3.5" y2="-72" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-68" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-96" x2="3.5" y2="-96" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-92" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-120" x2="3.5" y2="-120" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-116" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-144" x2="3.5" y2="-144" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-168" x2="3.5" y2="-168" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-164" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-192" x2="3.5" y2="-192" stroke="#1f2530" stroke-width="1.2"/><line x1="-9.6" y1="-149.8" x2="254.4" y2="8.6" stroke="#2563c9" stroke-width="2"/><text x="186" y="-40.6" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(31 186 -40.6)">30<tspan font-style="italic">x</tspan> + 50<tspan font-style="italic">y</tspan> = 300</text><line x1="-9.6" y1="-201.6" x2="201.6" y2="9.6" stroke="#4a7d3a" stroke-width="2"/><text x="67.3" y="-134.5" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(45 67.3 -134.5)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 8</text><circle cx="0" cy="-144" r="3.6" fill="#c8324a"/><text x="-7" y="-140" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 6)</text><circle cx="0" cy="-192" r="3.6" fill="#c8324a"/><text x="-7" y="-188" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 8)</text><circle cx="120" cy="-72" r="3.6" fill="#c8324a"/><text x="112" y="-55" font-size="12.5" text-anchor="end" fill="#c8324a">(5, 3)</text></svg>

The feasible region is the triangle between the two lines and the *y*-axis.
:::

The vertices $(0, 6)$ and $(0, 8)$ lie on the *y*-axis. The third vertex is
the point of intersection of the lines.

$$
\begin{cases}
30x + 50y = 300 \\
x + y = 8
\end{cases}
$$

We multiply the second equation by $-30$, so that it gets the term
$-30x$, and write out the system again.

$$
\begin{cases}
30x + 50y = 300 \\
-30x - 30y = -240
\end{cases}
$$

Now we add the equations side by side, so that the $x$-terms cancel each other out.

$$
\begin{aligned}
20y &= 60 \\
y &= 3
\end{aligned}
$$

Substituting into the second equation, $x + y = 8$, gives $x + 3 = 8$, so
$x = 5$. The third vertex is $(5, 3)$.

| Vertex | $K = 2\,000x + 4\,000y$ |
| --- | --- |
| $(0, 6)$ | $2\,000 \cdot 0 + 4\,000 \cdot 6 = 24\,000$ |
| $(0, 8)$ | $2\,000 \cdot 0 + 4\,000 \cdot 8 = 32\,000$ |
| $(5, 3)$ | $2\,000 \cdot 5 + 4\,000 \cdot 3 = 22\,000$ |

The vertex $(5, 3)$ gives the lowest cost. The number of buses must be whole numbers, and
here the coordinates of the vertex are whole numbers, so the choice can be carried out.

**Answer:** 5 small and 3 large buses, which cost 22 000 kr.
:::
:::

## When two vertices give the same value

Sometimes two vertices give exactly the same value. Then the level line is parallel to the
edge that joins the vertices, and **all** the points on the edge give the same best
value. The answer is then not a single point. If the answer has to be whole numbers, there may
be several integer points on the edge that are all equally good.

::: exempel "Example 4: Two vertices give the same profit"
**The cabinetmaker from Example 2 raises the price of the tables so that the profit becomes 600 kr per table. The profit per chair is still 400 kr, and the constraints are the same, so the feasible region has the vertices $(0, 0)$, $(10, 0)$, $(6, 4)$ and $(0, 8)$, where $x$ is the number of chairs and $y$ the number of tables. How many chairs and tables should the cabinetmaker now make for the profit to be as large as possible?**

::: figur
<svg viewBox="-38 -262 339 288" width="460" height="391" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The feasible region in example 4: below the lines 2x plus 3y equals 24 and x plus y equals 10 in the first quadrant, with the vertices 0 comma 0, 10 comma 0, 6 comma 4 and 0 comma 8."><line x1="22" y1="15.4" x2="22" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="15.4" x2="44" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="15.4" x2="66" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="15.4" x2="88" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="15.4" x2="110" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="15.4" x2="132" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="15.4" x2="154" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="15.4" x2="176" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="198" y1="15.4" x2="198" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="220" y1="15.4" x2="220" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="242" y1="15.4" x2="242" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="15.4" x2="264" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-22" x2="279.4" y2="-22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-44" x2="279.4" y2="-44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-66" x2="279.4" y2="-66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-88" x2="279.4" y2="-88" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-110" x2="279.4" y2="-110" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-132" x2="279.4" y2="-132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-154" x2="279.4" y2="-154" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-176" x2="279.4" y2="-176" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-198" x2="279.4" y2="-198" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-220" x2="279.4" y2="-220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 220,0 132,-88 0,-176" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-15.4" y1="0" x2="289.4" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="297.4,0 287.4,-4.5 287.4,4.5" fill="#1f2530"/><line x1="0" y1="15.4" x2="0" y2="-245.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-253.4 -4.5,-243.4 4.5,-243.4" fill="#1f2530"/><text x="295.4" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-247.4" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="22" y1="-3.5" x2="22" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="44" y1="-3.5" x2="44" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="44" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="66" y1="-3.5" x2="66" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="88" y1="-3.5" x2="88" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="88" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="110" y1="-3.5" x2="110" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="132" y1="-3.5" x2="132" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="132" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="154" y1="-3.5" x2="154" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="176" y1="-3.5" x2="176" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="176" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="198" y1="-3.5" x2="198" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="220" y1="-3.5" x2="220" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="242" y1="-3.5" x2="242" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="264" y1="-3.5" x2="264" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="264" y="16" font-size="12" text-anchor="middle" fill="#1f2530">12</text><line x1="-3.5" y1="-22" x2="3.5" y2="-22" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-18" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-44" x2="3.5" y2="-44" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-40" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-66" x2="3.5" y2="-66" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-62" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-88" x2="3.5" y2="-88" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-84" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-110" x2="3.5" y2="-110" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-106" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-132" x2="3.5" y2="-132" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-128" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-3.5" y1="-154" x2="3.5" y2="-154" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-150" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-176" x2="3.5" y2="-176" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-198" x2="3.5" y2="-198" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-194" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="-3.5" y1="-220" x2="3.5" y2="-220" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-216" font-size="12" text-anchor="end" fill="#1f2530">10</text><line x1="-8.8" y1="-181.9" x2="268" y2="2.6" stroke="#2563c9" stroke-width="2"/><text x="208.5" y="-45.4" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(33.7 208.5 -45.4)">2<tspan font-style="italic">x</tspan> + 3<tspan font-style="italic">y</tspan> = 24</text><line x1="-8.8" y1="-228.8" x2="222.6" y2="2.6" stroke="#4a7d3a" stroke-width="2"/><text x="66.5" y="-163.3" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(45 66.5 -163.3)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 10</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="220" cy="0" r="3.6" fill="#c8324a"/><text x="227" y="17" font-size="12.5" text-anchor="middle" fill="#c8324a">(10, 0)</text><circle cx="132" cy="-88" r="3.6" fill="#c8324a"/><text x="124" y="-71" font-size="12.5" text-anchor="end" fill="#c8324a">(6, 4)</text><circle cx="0" cy="-176" r="3.6" fill="#c8324a"/><text x="-7" y="-172" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 8)</text></svg>

The feasible region with the vertices.
:::

::: handskrift
typ: optkant
:::

::: textlosning
The new objective function is $V = 400x + 600y$. We calculate the profit at each
vertex.

| Vertex | $V = 400x + 600y$ |
| --- | --- |
| $(0, 0)$ | $400 \cdot 0 + 600 \cdot 0 = 0$ |
| $(10, 0)$ | $400 \cdot 10 + 600 \cdot 0 = 4\,000$ |
| $(6, 4)$ | $400 \cdot 6 + 600 \cdot 4 = 4\,800$ |
| $(0, 8)$ | $400 \cdot 0 + 600 \cdot 8 = 4\,800$ |

Two vertices give the largest profit, 4 800 kr. Then all the points on the edge
between $(6, 4)$ and $(0, 8)$ give the same profit. The edge lies on the line
$2x + 3y = 24$, and the level line $400x + 600y = 4\,800$ is the same line, because
if both sides are divided by 200 it becomes $2x + 3y = 24$.

::: figur
<svg viewBox="-38 -262 339 288" width="460" height="391" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The feasible region in example 4. The edge between the vertices 6 comma 4 and 0 comma 8 is marked in red, and the integer points 0 comma 8, 3 comma 6 and 6 comma 4 on the edge are marked."><line x1="22" y1="15.4" x2="22" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="15.4" x2="44" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="15.4" x2="66" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="15.4" x2="88" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="15.4" x2="110" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="15.4" x2="132" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="15.4" x2="154" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="15.4" x2="176" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="198" y1="15.4" x2="198" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="220" y1="15.4" x2="220" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="242" y1="15.4" x2="242" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="15.4" x2="264" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-22" x2="279.4" y2="-22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-44" x2="279.4" y2="-44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-66" x2="279.4" y2="-66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-88" x2="279.4" y2="-88" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-110" x2="279.4" y2="-110" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-132" x2="279.4" y2="-132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-154" x2="279.4" y2="-154" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-176" x2="279.4" y2="-176" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-198" x2="279.4" y2="-198" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-220" x2="279.4" y2="-220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 220,0 132,-88 0,-176" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-15.4" y1="0" x2="289.4" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="297.4,0 287.4,-4.5 287.4,4.5" fill="#1f2530"/><line x1="0" y1="15.4" x2="0" y2="-245.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-253.4 -4.5,-243.4 4.5,-243.4" fill="#1f2530"/><text x="295.4" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-247.4" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="22" y1="-3.5" x2="22" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="44" y1="-3.5" x2="44" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="44" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="66" y1="-3.5" x2="66" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="88" y1="-3.5" x2="88" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="88" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="110" y1="-3.5" x2="110" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="132" y1="-3.5" x2="132" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="132" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="154" y1="-3.5" x2="154" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="176" y1="-3.5" x2="176" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="176" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="198" y1="-3.5" x2="198" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="220" y1="-3.5" x2="220" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="242" y1="-3.5" x2="242" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="264" y1="-3.5" x2="264" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="264" y="16" font-size="12" text-anchor="middle" fill="#1f2530">12</text><line x1="-3.5" y1="-22" x2="3.5" y2="-22" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-18" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-44" x2="3.5" y2="-44" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-40" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-66" x2="3.5" y2="-66" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-62" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-88" x2="3.5" y2="-88" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-84" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-110" x2="3.5" y2="-110" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-106" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-132" x2="3.5" y2="-132" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-128" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-3.5" y1="-154" x2="3.5" y2="-154" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-150" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-176" x2="3.5" y2="-176" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-198" x2="3.5" y2="-198" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-194" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="-3.5" y1="-220" x2="3.5" y2="-220" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-216" font-size="12" text-anchor="end" fill="#1f2530">10</text><line x1="-8.8" y1="-181.9" x2="268" y2="2.6" stroke="#2563c9" stroke-width="2"/><text x="208.5" y="-45.4" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(33.7 208.5 -45.4)">2<tspan font-style="italic">x</tspan> + 3<tspan font-style="italic">y</tspan> = 24</text><line x1="-8.8" y1="-228.8" x2="222.6" y2="2.6" stroke="#4a7d3a" stroke-width="2"/><text x="66.5" y="-163.3" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(45 66.5 -163.3)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 10</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="220" cy="0" r="3.6" fill="#c8324a"/><text x="227" y="17" font-size="12.5" text-anchor="middle" fill="#c8324a">(10, 0)</text><circle cx="132" cy="-88" r="3.6" fill="#c8324a"/><text x="124" y="-71" font-size="12.5" text-anchor="end" fill="#c8324a">(6, 4)</text><circle cx="0" cy="-176" r="3.6" fill="#c8324a"/><text x="-7" y="-172" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 8)</text><line x1="132" y1="-88" x2="0" y2="-176" stroke="#c8324a" stroke-width="4" stroke-linecap="butt"/><circle cx="66" cy="-132" r="4" fill="#2563c9"/><circle cx="0" cy="-176" r="4" fill="#2563c9"/><circle cx="132" cy="-88" r="4" fill="#2563c9"/><text x="8" y="-106" font-size="12.5" text-anchor="start" fill="#2563c9">(3, 6)</text></svg>

The edge between $(6, 4)$ and $(0, 8)$ is marked in red. Every point on the edge gives the profit 4 800 kr. The blue dots are the integer points of the edge.
:::

The cabinetmaker can only make whole chairs and tables. So we look for
integer points on the edge, where $x$ goes from 0 to 6. If we solve for $y$ from
$2x + 3y = 24$ we get $y = \dfrac{24 - 2x}{3}$, which is an integer for
$x = 0$, $x = 3$ and $x = 6$. That gives the points $(0, 8)$, $(3, 6)$ and
$(6, 4)$.

Check of the middle point: $400 \cdot 3 + 600 \cdot 6 = 4\,800$.

**Answer:** The profit is 4 800 kr with 0 chairs and 8 tables, 3 chairs and 6 tables
or 6 chairs and 4 tables.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Concepts"
- **Variables**: what we choose, for example the number of chairs $x$ and tables $y$.
- **Constraints**: limitations written as inequalities, including $x \geq 0$ and
  $y \geq 0$.
- **Feasible region**: where all the constraints hold.
- **Objective function**: what is to be maximised or minimised.
:::

::: sampunkt "The vertex method"
- The largest and the smallest value are at a **vertex**.
- Calculate the objective function at each vertex and compare.
- Vertices between two sloping lines are calculated with a **system of equations**.
:::

::: sampunkt "Method"
1. Variables, constraints and objective function.
2. Draw the feasible region.
3. Determine the vertices and calculate the objective function at them.
4. Answer in the context.
:::

::: sampunkt "Level lines and special cases"
- **Level line**: the objective function equal to a constant. They are all parallel.
- Two vertices with the same value: the whole edge between them is equally good.
- Quantities must be **whole numbers**. Try integer points if necessary.
:::
:::

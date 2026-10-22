---
kalla: 3609f01fda
id: ma2c-4.7
title: Similar polygons
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.7'
---

# Similar polygons

Polygons with the same shape are called **similar**. Similar
polygons can be of different sizes, rotated by different amounts and
reflected.

::: tips "Similar polygons"
Two polygons are similar if

- corresponding angles are equal **AND**
- the ratio between corresponding sides is the same

**NOTE!** Both the angles and the side ratios must be checked.
(The exception is triangles, which the next lesson is about.)
:::

::: exempel "Example 1: Are the parallelograms similar?"
**Are the parallelograms similar? Opposite angles in a
parallelogram are equal. Opposite sides in a parallelogram are
equal.**

::: figur
<svg viewBox="8 30 306 118" width="485" height="187" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Two parallelograms: a smaller one A B C D with the side 8 and the side 6 and the angles 50 and 130 degrees, and a larger one E F G H with the side 12 and the side 9."><polygon points="20,124 84,124 106,76 42,76" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="16" y="138" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="88" y="138" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="111" y="70" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="38" y="70" font-size="12" text-anchor="middle" fill="#1f2530">D</text><text x="52" y="138" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="27" y="98" font-size="11" text-anchor="end" fill="#1f2530">6</text><path d="M 32,124 A 12 12 0 0 0 25,113.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="37" y="116" font-size="10" text-anchor="start" fill="#1f2530">50°</text><path d="M 73,124 A 11 11 0 0 1 88.6,114" fill="none" stroke="#1f2530" stroke-width="1"/><text x="74" y="111" font-size="10" text-anchor="middle" fill="#1f2530">130°</text><polygon points="158,132 254,132 287,60 191,60" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="153" y="146" font-size="12" text-anchor="middle" fill="#1f2530">E</text><text x="259" y="146" font-size="12" text-anchor="middle" fill="#1f2530">F</text><text x="292" y="54" font-size="12" text-anchor="middle" fill="#1f2530">G</text><text x="187" y="54" font-size="12" text-anchor="middle" fill="#1f2530">H</text><text x="206" y="146" font-size="11" text-anchor="middle" fill="#1f2530">12</text><text x="168" y="98" font-size="11" text-anchor="end" fill="#1f2530">9</text></svg>
:::

::: handskrift
typ: likformigaparallell
:::

::: textlosning
We start by determining all the angles. In the small parallelogram
$A = 50°$ and $B = 130°$, and opposite angles give $C = 50°$ and
$D = 130°$. In the large one, in the same way, $E = 50°$, $F = 130°$,
$G = 50°$ and $H = 130°$.

Now we investigate the corresponding angles:

$$
A = E = 50° \qquad B = F = 130° \qquad C = G = 50° \qquad D = H = 130°
$$

All corresponding angles are equal.

We determine all the sides: $AB = 8$, $AD = 6$ (opposite sides give
$DC = 8$ and $BC = 6$) and $EF = 12$, $EH = 9$ (opposite sides give
$HG = 12$ and $FG = 9$).

Now we investigate the side ratios:

$$
\frac{AB}{EF} = \frac{DC}{HG} = \frac{8}{12} = \frac{2}{3}
$$

$$
\frac{AD}{EH} = \frac{BC}{FG} = \frac{6}{9} = \frac{2}{3}
$$

The side ratios are also the same.

Since both the corresponding angles and the side ratios are the same,
the parallelograms are similar.

**Answer:** Yes
:::
:::

::: exempel "Example 2: Determine the side"
**The figures are similar. Determine the side $x$.**

::: figur
<svg viewBox="8 22 296 112" width="511" height="193" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Two similar quadrilaterals: a smaller one with the sides 5 and 8, and a larger one with the sides x and 24."><polygon points="22,110 88,110 78,84 34,92" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="22" y="98" font-size="11" text-anchor="end" fill="#1f2530">5</text><text x="55" y="124" font-size="11" text-anchor="middle" fill="#1f2530">8</text><polygon points="118,116 268,116 244,54 146,72" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="126" y="92" font-size="11" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="193" y="130" font-size="11" text-anchor="middle" fill="#1f2530">24</text><text x="296" y="34" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: likformigsida
:::

::: textlosning
Sides in similar figures can be determined in two ways: with an equation
or with a scale factor.

**With an equation.** The ratio between corresponding sides is the same, so

$$
\frac{x}{5} = \frac{24}{8}
$$

Cross-multiplication gives

$$
8x = 24 \cdot 5
$$

$$
8x = 120 \iff x = 15\ \mathrm{cm}
$$

**With a scale factor.** We divide two known sides to determine
the scale factor, that is how large the figures are relative to each other.

$$
\text{Scale factor} = \frac{24}{8} = 3
$$

This means that corresponding sides are 3 times longer in the larger
polygon. The side $x$ corresponds to the side 5 in the smaller figure:

$$
x = 5 \cdot 3 = 15\ \mathrm{cm}
$$

**Answer:** 15 cm
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Similar polygons"
- Polygons with **the same shape**.
- They may be of different sizes, rotated or **reflected**.
:::

::: sampunkt "Two conditions, both must hold"
- Corresponding **angles** are equal, **and**
- the ratio between corresponding **sides** is the same.
- **Both must be checked.** Triangles are the exception, see the next section.
:::

::: sampunkt "Determining a side: with an equation"
- Set up the ratio between corresponding sides:
  $\dfrac{x}{5} = \dfrac{24}{8}$.
- Solve by cross-multiplication.
:::

::: sampunkt "Determining a side: with a scale factor"
- **The scale factor** is the quotient of two known corresponding sides:
  $\dfrac{24}{8} = 3$.
- Multiply the side of the small figure by the scale factor.
- Check that you divide **large by small** when you enlarge and
  the other way round when you reduce.
:::

::: sampunkt "Common pitfall"
- Make sure you pair up the **right** sides, that is those that really
  correspond to each other. The figure may be rotated or reflected.
:::
:::

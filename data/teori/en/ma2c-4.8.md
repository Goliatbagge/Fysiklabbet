---
kalla: 7c8572046c
id: ma2c-4.8
title: Similar triangles
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.8'
---

# Similar triangles

Triangles with the same shape are called **similar triangles** and are a
special case of similar polygons. Just as for similar
polygons, similar triangles can be of different sizes,
rotated by different amounts and reflected. Just as for similar
polygons, in similar triangles corresponding
angles are equal and the ratio between corresponding sides is
the same.

The difference is that to determine whether two triangles are similar,
it is enough to investigate **ONE** of the conditions on angles and
side ratios (for polygons with more than three vertices we needed to
investigate both angles and side ratios).

::: tips "Similar triangles"
Two triangles are similar if

- corresponding angles are equal **OR**
- the ratio between corresponding sides is the same

The sign ~ means "is similar to". "The triangle ABC is similar to
the triangle DEF" can therefore be written $\triangle ABC \sim \triangle DEF$.
:::

It is enough to investigate whether two angles are equal to say that two
triangles are similar (since the third angle must then be
the same, because of the angle sum in triangles).

::: exempel "Example 1: Compare the angles"
**Are the triangles similar?**

::: figur
<svg viewBox="36 16 548 82" width="664" height="99" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Two long, narrow triangles: the triangle A B C with the angles 128 degrees at A and 12 degrees at C, and the larger triangle D E F with the angles 40 degrees at E and 12 degrees at F."><polygon points="80.7,37.9 50.4,69.3 215,52" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="79" y="30" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="46" y="82" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="222" y="56" font-size="12" text-anchor="start" fill="#1f2530">C</text><path d="M 90.6,38.9 A 10 10 0 0 1 73.8,45.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="100" y="55" font-size="10" text-anchor="middle" fill="#1f2530">128°</text><path d="M 179.2,55.8 A 36 36 0 0 1 179.2,48.2" fill="none" stroke="#1f2530" stroke-width="1"/><text x="157" y="55.5" font-size="10" text-anchor="middle" fill="#1f2530">12°</text><polygon points="398.9,41.1 362.6,78.8 560,58" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="397" y="34" font-size="12" text-anchor="middle" fill="#1f2530">D</text><text x="356" y="91" font-size="12" text-anchor="middle" fill="#1f2530">E</text><text x="567" y="62" font-size="12" text-anchor="start" fill="#1f2530">F</text><path d="M 378.5,77.1 A 16 16 0 0 0 373.7,67.3" fill="none" stroke="#1f2530" stroke-width="1"/><text x="389.6" y="69" font-size="10" text-anchor="middle" fill="#1f2530">40°</text><path d="M 524.2,61.8 A 36 36 0 0 1 524.2,54.2" fill="none" stroke="#1f2530" stroke-width="1"/><text x="502" y="61.5" font-size="10" text-anchor="middle" fill="#1f2530">12°</text></svg>
:::

::: handskrift
typ: likformigavinklar
:::

::: textlosning
We investigate the corresponding angles.

In $\triangle ABC$: $A = 128°$ and $C = 12°$ are given, so

$$
B = 180° - 128° - 12° = 40° \quad \text{(angle sum of a triangle)}
$$

In $\triangle DEF$: $E = 40°$ and $F = 12°$ are given, so

$$
D = 180° - 12° - 40° = 128° \quad \text{(angle sum of a triangle)}
$$

Corresponding angles ($A = D = 128°$, $B = E = 40°$ and $C = F = 12°$)
are equal, so the triangles are similar:
$\triangle ABC \sim \triangle DEF$.

**Answer:** Yes
:::
:::

::: exempel "Example 2: Compare the side ratios"
**Are the triangles similar?**

::: figur
<svg viewBox="4 0 260 130" width="449" height="225" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Two right-angled triangles: A B C with the sides 2.7, 3.6 and 4.5 centimetres, and the reflected D E F with the sides 4.5, 6.0 and 7.5 centimetres."><polygon points="20,110 74,110 74,38" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="16" y="124" font-size="11" text-anchor="middle" fill="#1f2530">A</text><text x="78" y="124" font-size="11" text-anchor="middle" fill="#1f2530">B</text><text x="78" y="34" font-size="11" text-anchor="middle" fill="#1f2530">C</text><text x="47" y="124" font-size="10" text-anchor="middle" fill="#1f2530">2.7</text><text x="82" y="78" font-size="10" text-anchor="start" fill="#1f2530">3.6</text><text x="38" y="70" font-size="10" text-anchor="end" fill="#1f2530">4.5</text><polygon points="128,110 218,110 128,14" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="124" y="124" font-size="11" text-anchor="middle" fill="#1f2530">D</text><text x="223" y="124" font-size="11" text-anchor="middle" fill="#1f2530">E</text><text x="124" y="10" font-size="11" text-anchor="middle" fill="#1f2530">F</text><text x="173" y="124" font-size="10" text-anchor="middle" fill="#1f2530">4.5</text><text x="122" y="66" font-size="10" text-anchor="end" fill="#1f2530">6.0</text><text x="182" y="60" font-size="10" text-anchor="start" fill="#1f2530">7.5</text><text x="258" y="24" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: likformigasidor
:::

::: textlosning
We investigate the side ratios.

$$
\frac{AB}{DE} = \frac{2.7}{4.5} = 0.6
$$

$$
\frac{BC}{DF} = \frac{3.6}{6.0} = 0.6 \quad \text{(note that the right-hand triangle is reflected)}
$$

$$
\frac{AC}{EF} = \frac{4.5}{7.5} = 0.6
$$

The side ratios are the same (0.6), so the triangles are similar.

**Answer:** Yes
:::
:::

::: exempel "Example 3: The flagpole"
**Alva is going to determine the height of a flagpole on a sunny summer day. She is
1.60 metres tall and casts a shadow that is 1.20 metres. She then measures
the length of the flagpole's shadow as 6.75 metres. How tall is
the flagpole?**

::: handskrift
typ: flaggstangskugga
:::

::: textlosning
Since the sun's rays strike the flagpole and Alva at the same angle,
the angle formed against the height must be the same in both triangles.
Both triangles also have a right angle. We draw a sketch of
the flagpole and Alva.

::: figur
<svg viewBox="6 6 268 128" width="463" height="221" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Two right-angled triangles: a large one with the vertical side x and the base 6.75 metres, and a small one with the vertical side 1.60 metres and the base 1.20 metres."><polygon points="30,14 30,110 138,110" fill="none" stroke="#1f2530" stroke-width="1.6"/><rect x="30" y="99" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1"/><text x="22" y="66" font-size="11" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="84" y="124" font-size="10" text-anchor="middle" fill="#1f2530">6.75</text><polygon points="196,74 196,110 223,110" fill="none" stroke="#1f2530" stroke-width="1.6"/><rect x="196" y="103" width="7" height="7" fill="none" stroke="#1f2530" stroke-width="1"/><text x="190" y="96" font-size="10" text-anchor="end" fill="#1f2530">1.60</text><text x="210" y="124" font-size="10" text-anchor="middle" fill="#1f2530">1.20</text><text x="272" y="16" font-size="11" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

The triangles thus have two angles that are equal, and therefore
they must be similar. Since the side ratios are then the same,

$$
\frac{x}{1.60} = \frac{6.75}{1.20}
$$

We multiply both sides by 1.60 and get

$$
x = \frac{6.75}{1.20} \cdot 1.60 = 9.00
$$

**Answer:** 9.00 metres
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Similar triangles"
- Triangles with **the same shape**. A special case of similar
  polygons.
- Written with the sign $\sim$:
  $\triangle ABC \sim \triangle DEF$.
:::

::: sampunkt "The big difference"
- For triangles it is enough that **one** of the conditions is satisfied:
- corresponding angles equal **OR**
- equal side ratios.
- For other polygons **both** are required.
:::

::: sampunkt "Two angles are enough"
- If two angles match, the third must also match, since
  the angle sum is $180^\circ$.
- So only calculate the angles you need.
:::

::: sampunkt "Application: determining heights"
- The same angle of the sun gives the same angle in both triangles, and both have a
  right angle. So they are similar.
- $\dfrac{x}{1.60} = \dfrac{6.75}{1.20}$
- Always put **corresponding** quantities in the same position: height over height,
  shadow over shadow.
:::
:::

---
kalla: a096c15f82
id: ma1c-6.S
title: Summary
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.S'
---

# Summary: Trigonometry

This chapter was about trigonometry in right-angled triangles and about
vectors. You have learnt to calculate sides and angles with tangent, sine,
cosine and their inverse functions, and to find distances and angles
between points in a coordinate system with Pythagoras' theorem. You have also
learnt the difference between vectors and scalars, how the length of a vector
is calculated, and how vectors are added, subtracted and multiplied by a
scalar, both graphically and in component form.

## Concepts to know

- **hypotenuse**: the longest side in a right-angled triangle, the side
  opposite the right angle.
- **leg**: one of the two shorter sides in a right-angled triangle.
- **opposite side**: the leg that lies opposite the angle in question.
- **adjacent side**: the leg that (together with the hypotenuse)
  forms the angle in question.
- **tangent, sine, cosine (tan, sin, cos)**: trigonometric
  functions that describe the ratio between two sides in a right-angled
  triangle for a given angle.
- **inverse trigonometric functions (tan⁻¹/arctan, sin⁻¹/arcsin,
  cos⁻¹/arccos)**: used to find an angle when a
  ratio of sides is known.
- **Pythagoras' theorem**: the relationship between the legs and the hypotenuse in a
  right-angled triangle; used for distances in coordinate systems and for
  the lengths of vectors.
- **l.u. and a.u. (length units and area units)**: notations that
  are used when a length or an area, respectively, has no unit given.
- **quantity**: a property that can be measured, for example distance, speed or
  temperature.
- **vector**: a quantity that is given with both magnitude and direction, for example
  velocity, force and acceleration; denoted $\vec{u}$.
- **scalar**: a quantity that is given with magnitude only, for example mass, time
  and temperature.
- **the length (magnitude) of a vector ($|\vec{u}|$)**: the size of the vector, calculated
  with Pythagoras' theorem or from the component form.
- **opposite vectors**: vectors with the same magnitude but opposite
  directions, for example $\vec{v}_2 = -\vec{v}_1$.
- **parallel vectors**: vectors that have the same slope, regardless of whether they
  are of different sizes or point in opposite directions.
- **resultant**: the vector obtained when two (or more) vectors
  are added, with the polygon method.

## Formulas

::: formel "The chapter's formulas"
**Trigonometric functions**

$$
\tan v = \frac{\text{opposite side}}{\text{adjacent side}} = \frac{a}{b}
$$

$$
\sin v = \frac{\text{opposite side}}{\text{hypotenuse}} = \frac{a}{c}
$$

$$
\cos v = \frac{\text{adjacent side}}{\text{hypotenuse}} = \frac{b}{c}
$$

where *a* is the opposite side, *b* is the adjacent side and *c* is
the hypotenuse for the angle *v*.

**Inverse trigonometric functions**

$$
v = \tan^{-1}\left(\frac{a}{b}\right)
\qquad
v = \sin^{-1}\left(\frac{a}{c}\right)
\qquad
v = \cos^{-1}\left(\frac{b}{c}\right)
$$

where tan⁻¹ (arctan), sin⁻¹ (arcsin) and cos⁻¹ (arccos) are the inverse
functions of tan, sin and cos, respectively.

**Pythagoras' theorem**

$$
a^2 + b^2 = c^2
$$

where *a* and *b* are the legs and *c* is the hypotenuse in a right-angled
triangle.

**The area of a triangle**

$$
A = \frac{b \cdot h}{2}
$$

where *b* is the base and *h* is the height to the base.

**The length of a vector in component form**

$$
|\vec{u}| = \sqrt{a_x^2 + a_y^2}
$$

where $\vec{u} = (a_x,\ a_y)$.

**Subtraction of vectors**

$$
\vec{u} - \vec{v} = \vec{u} + (-\vec{v})
$$

where the subtraction is rewritten as an addition of the opposite vector
$-\vec{v}$.
:::

## Important relationships and methods

- Choose the right trigonometric function based on which two sides (or side
  and angle) are known or asked for: the tangent links the
  two legs, the sine links the opposite side and the hypotenuse, the cosine
  links the adjacent side and the hypotenuse.
- Find an angle with the *inverse* function (tan⁻¹, sin⁻¹ or cos⁻¹),
  not with the ordinary function, when the ratio of sides is already
  known.
- Always draw a sketch and mark which side is the opposite
  and which is the adjacent side for the angle in question before you choose a
  formula. Otherwise it is easy to mix up tan, sin and cos.
- If the triangle is not right-angled: draw the height to one of the sides to
  form a right-angled part triangle, calculate the height with sine and
  then substitute it into the formula for the area of the triangle.
- The distance and the angle between two points in a coordinate system are found
  by forming a right-angled triangle with the legs in the *x*- and
  *y*-directions: the distance (the hypotenuse) is obtained with Pythagoras' theorem, the angle to
  the *x*-axis is obtained with the tangent.
- If a length has no unit in the task: answer in l.u. (length units);
  the same applies to area in a.u. (area units).
- A vector can be translated without changing. It is the magnitude
  and the direction that decide whether two vectors are the same vector, not where in
  the plane they are drawn.
- When adding vectors: translate one vector so that
  it starts at the tip of the other (the polygon method); the resultant is then drawn
  from the starting point to the final tip.
- When subtracting $\vec{u} - \vec{v}$: draw the opposite vector
  $-\vec{v}$ (equally long but pointing opposite to $\vec{v}$) and add it to
  $\vec{u}$ as usual.
- Multiplying a vector by a scalar changes only the magnitude of the vector
  (and, if the scalar is negative, its direction), never its slope.
- The length of a line segment or a vector is always positive: disregard the
  negative solution when you take the root in Pythagoras' theorem.
- In component form, the coordinates of a vector correspond exactly to the lengths of the legs
  in the right-angled triangle that is formed. That is why the same
  formula, $|\vec{u}| = \sqrt{a_x^2 + a_y^2}$, works even if the coordinates are
  negative.

## Figures worth remembering

The basic figure for all the trigonometry in the chapter: a right-angled triangle with
the legs *a* and *b*, the hypotenuse *c* and the angle *v*. This is the
set-up that tan, sin, cos and Pythagoras' theorem are built on:

::: figur
<svg viewBox="36 28 212 128" width="288" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg a, the horizontal leg b, the hypotenuse c and the angle v at the bottom right."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M218.0,130.0 A22,22 0 0 1 220.3,120.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="196" y="124" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

This is how two vectors are added with the polygon method: one vector
is translated to the tip of the other, and the resultant
$\vec{w} = \vec{u} + \vec{v}$ is drawn from the starting point to the new
end point:

::: figur
<svg viewBox="6 -4 302 92" width="410" height="125" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same chain where the resultant w equals u plus v is drawn as a red arrow from the starting point of u to the end point of v."><line x1="0" y1="0" x2="0" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="0" x2="22" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="0" x2="44" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="0" x2="66" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="0" x2="88" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="0" x2="110" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0" x2="132" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="0" x2="176" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="198" y1="0" x2="198" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="220" y1="0" x2="220" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="242" y1="0" x2="242" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="286" y1="0" x2="286" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="286" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="22" x2="286" y2="22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="44" x2="286" y2="44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="66" x2="286" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14.0" y1="26.0" x2="180.0" y2="26.0" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(190.0,26.0) rotate(0.0)" fill="#1f2530"/><text x="100" y="16" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">u</tspan></text><line x1="96.0" y1="2" x2="104.0" y2="2" stroke="#1f2530" stroke-width="1"/><polygon points="107.0,2 103.0,0 103.0,4" fill="#1f2530"/><line x1="190.0" y1="26.0" x2="290.0" y2="26.0" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(300.0,26.0) rotate(0.0)" fill="#1f2530"/><text x="246" y="16" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><line x1="242.0" y1="2" x2="250.0" y2="2" stroke="#1f2530" stroke-width="1"/><polygon points="253.0,2 249.0,0 249.0,4" fill="#1f2530"/><line x1="14.0" y1="56.0" x2="290.0" y2="56.0" stroke="#c8324a" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(300.0,56.0) rotate(0.0)" fill="#c8324a"/><text x="150" y="80" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">w</tspan> = <tspan font-style="italic">u</tspan> + <tspan font-style="italic">v</tspan></text><line x1="126" y1="66" x2="134" y2="66" stroke="#c8324a" stroke-width="1"/><polygon points="137,66 133,64 133,68" fill="#c8324a"/><line x1="152" y1="66" x2="160" y2="66" stroke="#c8324a" stroke-width="1"/><polygon points="163,66 159,64 159,68" fill="#c8324a"/><line x1="178" y1="66" x2="186" y2="66" stroke="#c8324a" stroke-width="1"/><polygon points="189,66 185,64 185,68" fill="#c8324a"/></svg>
:::

## Before the test

- Can you name the hypotenuse, the opposite side and the adjacent side for
  a given angle in a right-angled triangle?
- Can you set up and calculate tan, sin and cos for an angle from
  the lengths of the sides?
- Do you know how to choose the right trigonometric function depending on which
  sides and angles are known?
- Can you use the inverse functions (tan⁻¹, sin⁻¹, cos⁻¹) to
  find an unknown angle?
- Can you calculate the area of a triangle that is not right-angled by
  first finding the height with trigonometry?
- Can you find the distance and the angle between two points in a
  coordinate system by forming a right-angled triangle and using
  Pythagoras' theorem and the tangent, respectively?
- Do you know the difference between a vector and a scalar, and can you give
  examples of each?
- Can you decide whether two vectors are the same, opposite or parallel
  based on magnitude and direction?
- Can you calculate the length (magnitude) of a vector, both graphically with Pythagoras'
  theorem and from the component form $|\vec{u}| = \sqrt{a_x^2 + a_y^2}$?
- Can you add and subtract vectors graphically with the polygon method?
- Do you know what happens to the magnitude and direction of a vector when it
  is multiplied by a positive and a negative scalar, respectively?

---
kalla: 2cf9e08e5c
id: ma3c-6.S
title: Summary
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.S'
---

# Summary: Trigonometry and the triangle theorems

This chapter was about trigonometry beyond the right-angled triangle.
You have seen how sine, cosine and tangent are defined for *all* angles with
the help of the unit circle, how trigonometric equations are solved and why they
usually have two solutions, and how the area theorem, the sine rule and
the cosine rule (together called the triangle theorems) are used to
determine sides, angles and areas in arbitrary triangles, not just
right-angled ones. After the chapter you should be able to decide which theorem fits a
given problem and solve applications with several triangles one after the other.

## Concepts to know

- **hypotenuse**: the side opposite the right angle in a right-angled
  triangle; always the longest side of the triangle.
- **leg**: one of the two shorter sides in a right-angled triangle; divided
  into the opposite side (opposite the angle *v*) and the adjacent side
  (next to *v*).
- **sine, cosine, tangent**: the three trigonometric functions,
  defined as ratios between the sides of a right-angled triangle
  (see Formulas).
- **inverse trigonometric functions** ($\sin^{-1}$, $\cos^{-1}$,
  $\tan^{-1}$): used to determine an angle when a ratio of sides
  is known; also called arcsin, arccos and arctan.
- **the unit circle**: a circle with radius $1$ and its centre at the origin;
  used to define sine and cosine for all angles, not just
  acute ones.
- **period**: the number of degrees an angle must increase by for a
  trigonometric function to take the same value again; $360^\circ$ for sine
  and cosine, $180^\circ$ for tangent.
- **trigonometric equation**: an equation that contains a
  trigonometric function, for example $\sin v = a$; solved with the unit circle
  or the calculator's inverse functions.
- **included angle**: the angle that lies between two known sides in
  a triangle; required for the area theorem and for one of the cosine rule's
  use cases.
- **the area theorem**: a formula for the area of a triangle from two sides and the
  included angle.
- **the sine rule**: a relationship between the sides of a triangle and the sine values of the opposite
  angles.
- **the cosine rule**: a generalisation of Pythagoras' theorem to arbitrary
  triangles; a relationship between all three sides and one angle.
- **the triangle theorems**: a collective name for the area theorem, the sine rule and
  the cosine rule.

## Formulas

::: formel "Formulas of the chapter"
**Trigonometric functions in a right-angled triangle**

$$
\tan v = \frac{a}{b}, \qquad \sin v = \frac{a}{c}, \qquad \cos v = \frac{b}{c}
$$

where *a* is the opposite side, *b* is the adjacent side and *c* is
the hypotenuse for the angle *v*.

**Inverse trigonometric functions**

$$
v = \tan^{-1}\left(\frac{a}{b}\right), \qquad
v = \sin^{-1}\left(\frac{a}{c}\right), \qquad
v = \cos^{-1}\left(\frac{b}{c}\right)
$$

**Sine, cosine and tangent on the unit circle**

$$
\sin v = y, \qquad \cos v = x, \qquad \tan v = \frac{\sin v}{\cos v}
$$

where $(x, y)$ are the coordinates of the point on the unit circle that the angle
*v* gives.

**The periods of the trigonometric functions**

| Function | Period |
| --- | --- |
| $\sin$ | $360^\circ$ |
| $\cos$ | $360^\circ$ |
| $\tan$ | $180^\circ$ |

**The second solution of a trigonometric equation** (in the interval
$0^\circ \leq v \leq 360^\circ$, with $v_1$ as the calculator's answer)

- $\sin v = a$: $v_2 = 180^\circ - v_1$
- $\cos v = a$: $v_2 = 360^\circ - v_1$
- $\tan v = a$: $v_2 = v_1 + 180^\circ$

**The area theorem**

$$
T = \frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2}
$$

where *T* is the area of the triangle.

**The sine rule**

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}
$$

**The cosine rule**

$$
\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
b^2 &= a^2 + c^2 - 2ac\cos B \\
a^2 &= b^2 + c^2 - 2bc\cos A
\end{aligned}
$$

In the sine rule and the cosine rule the side *a* is the side opposite angle
*A*, the side *b* the side opposite angle *B* and the side *c* the side
opposite angle *C*.
:::

## Important relationships and methods

- Decide which trigonometric function fits based on which sides
  are known: opposite/hypotenuse gives sine, adjacent/hypotenuse gives
  cosine, opposite/adjacent gives tangent.
- If you are to determine an angle instead of a side, use the inverse
  function ($\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$) on the calculator.
- The point on the unit circle that the angle *v* gives can always be written
  $(\cos v, \sin v)$, for any angle at all, not just acute ones.
- An angle greater than $360^\circ$ gives the same point as the angle minus a
  whole turn; a negative angle corresponds to turning clockwise instead of
  anticlockwise.
- The equation $\sin v = a$ or $\cos v = a$ has no solution if
  $|a| > 1$, since the line then ends up completely outside the unit circle (whose
  radius is only $1$).
- The calculator only gives the smallest solution $v_1$ in the interval
  $0^\circ \leq v \leq 360^\circ$; the second solution $v_2$ must be worked
  out by hand (see the formulas above).
- Choose the triangle theorem according to what is known: the area theorem (two sides and
  the included angle), the sine rule (one side and two angles, or two
  sides and an angle that is not the included angle), the cosine rule (two sides and
  the included angle, or all three sides).
- If you are to determine an angle, the cosine rule is safer than the sine rule:
  the cosine rule gives the right angle directly (the sign of $\cos v$ reveals whether
  the angle is acute or obtuse), while the sine rule can give a false
  solution that must be ruled out with the angle sum of the triangle ($180^\circ$).
- The area theorem often gives **two** valid included angles ($C_1$ and
  $180^\circ - C_1$) for the same area and sides; unlike with
  the sine rule, there is no angle sum condition here that rules out either of
  them.
- In applied problems with several triangles: first solve the triangle where
  enough is known, and then use the calculated quantity
  as known information in the next triangle.

## Figures worth remembering

Trigonometric functions are defined in a right-angled triangle with
the opposite side *a*, the adjacent side *b* and the hypotenuse *c*:

::: figur
<svg viewBox="36 28 212 128" width="288" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg a, the horizontal leg b, the hypotenuse c and the angle v at the bottom right."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M218.0,130.0 A22,22 0 0 1 220.3,120.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="196" y="124" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

The unit circle defines sine and cosine for all angles, not just
acute ones, as the point's $y$- and $x$-coordinate respectively:

::: figur
<svg viewBox="24 4 262 264" width="356" height="358" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with a radius to a point at the angle v above the x-axis. A dashed vertical line down to the x-axis forms a right-angled triangle with the hypotenuse 1, the horizontal leg cos v and the vertical leg sin v. Point at or tap cos v or sin v to highlight the leg and show which coordinate it corresponds to." style="overflow:visible"><style>.q62s{cursor:pointer;outline:none}.q62s .q62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q62s:hover .q62-lbl,.q62s:focus .q62-lbl{opacity:1}</style><circle cx="150" cy="140" r="95" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="30" y1="140" x2="270" y2="140" stroke="#1f2530" stroke-width="1.6"/><polygon points="279,140 270,135.5 270,144.5" fill="#1f2530"/><line x1="150" y1="260" x2="150" y2="20" stroke="#1f2530" stroke-width="1.6"/><polygon points="150,11 145.5,20 154.5,20" fill="#1f2530"/><text x="274" y="160" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="159" y="18" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="219.82" y="132" width="8" height="8" fill="none" stroke="#1f2530" stroke-width="1.1"/><line x1="150" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="2"/><circle cx="227.82" cy="85.51" r="4" fill="#2563c9"/><path d="M178,140 A28,28 0 0 0 172.94,123.94" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="190.06" y="127.37" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><g class="q62s" tabindex="0"><line x1="150" y1="140" x2="227.82" y2="140" stroke="transparent" stroke-width="14"/><text x="188.91" y="158" font-size="13" text-anchor="middle" fill="#1f2530">cos <tspan font-style="italic">v</tspan></text><g class="q62-lbl"><line x1="150" y1="140" x2="227.82" y2="140" stroke="#c8324a" stroke-width="3"/><text x="188.91" y="176" font-size="11.5" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">x</tspan>-coordinate</text></g></g><g class="q62s" tabindex="0"><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="transparent" stroke-width="14"/><text x="235.82" y="112.76" font-size="13" text-anchor="start" fill="#1f2530">sin <tspan font-style="italic">v</tspan></text><g class="q62-lbl"><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#c8324a" stroke-width="3"/><rect x="202" y="60" width="84" height="15" rx="4" fill="#f3eee4"/><text x="283" y="72" font-size="11.5" text-anchor="end" fill="#c8324a"><tspan font-style="italic">y</tspan>-coordinate</text></g></g><text x="182.0" y="102.93" font-size="13" text-anchor="end" fill="#1f2530">1</text></svg>

Point at or tap cos $v$ or sin $v$ to highlight the leg and the coordinate it corresponds to.
:::

The triangle theorems all share the same notation: the side *a* opposite angle
*A*, the side *b* opposite angle *B* and the side *c* opposite angle *C*:

::: figur
<svg viewBox="-24 -27 230 241" width="291" height="305" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC. The side a lies opposite angle A, the side b opposite angle B and the side c opposite angle C."><polygon points="49.82,0 0,185.92 180,185.92" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 44.12,21.25 A 22 22 0 0 0 62.44,18.02" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 5.69,164.67 A 22 22 0 0 1 22,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 167.38,167.9 A 22 22 0 0 0 158,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="46.87" y="-14.74" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-13.49" y="204.27" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="195.08" y="201.77" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="90" y="209.92" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="128.02" y="85.78" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="9.45" y="92.82" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

## Before the test

- Can you define sine, cosine and tangent with the help of the sides of a right-angled
  triangle (opposite side, adjacent side, hypotenuse)?
- Can you use the inverse trigonometric functions to determine
  an angle when two sides are known?
- Do you know how a point on the unit circle is connected with sine and cosine
  for an arbitrary angle, including obtuse and negative angles?
- Can you solve a trigonometric equation such as $\sin v = a$ or
  $\cos v = a$ with the help of the unit circle, and decide when the equation
  has no solution?
- Can you determine **both** solutions of a trigonometric equation in
  the interval $0^\circ \leq v \leq 360^\circ$, not just the one the calculator gives
  directly?
- Do you know that sine and cosine have the period $360^\circ$ while tangent has
  the period $180^\circ$, and why the period of tangent is half as long?
- Do you know the area theorem, and do you know what information is needed to
  use it?
- Do you know the sine rule, and do you know when it can be used?
- Do you know the cosine rule, and do you know when it can be used?
- Can you decide which of the three triangle theorems fits a
  given problem, based on what is known in the triangle?
- Do you know why the cosine rule is safer than the sine rule when you are to
  determine an angle, and how to check a suspected false solution
  with the angle sum of the triangle?
- Can you solve an applied problem that requires several triangles one after
  the other, where a quantity calculated in one triangle is used in the next?

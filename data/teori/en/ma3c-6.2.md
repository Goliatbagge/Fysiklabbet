---
kalla: 9e9002b075
id: ma3c-6.2
title: The unit circle
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.2'
---

# The unit circle

A circle with radius 1 placed with its centre at the origin is called the
**unit circle**. The unit circle is used to define sine, cosine and
tangent for *all* angles, not just acute angles between $0°$ and $90°$
as in a right-angled triangle.

::: figur
<svg viewBox="24 4 262 264" width="356" height="358" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with a radius to a point at the angle v above the x-axis. A dashed vertical line down to the x-axis forms a right-angled triangle with the hypotenuse 1, the horizontal leg cos v and the vertical leg sin v. Point at or tap cos v or sin v to highlight the leg and show which coordinate it corresponds to." style="overflow:visible"><style>.q62s{cursor:pointer;outline:none}.q62s .q62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q62s:hover .q62-lbl,.q62s:focus .q62-lbl{opacity:1}</style><circle cx="150" cy="140" r="95" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="30" y1="140" x2="270" y2="140" stroke="#1f2530" stroke-width="1.6"/><polygon points="279,140 270,135.5 270,144.5" fill="#1f2530"/><line x1="150" y1="260" x2="150" y2="20" stroke="#1f2530" stroke-width="1.6"/><polygon points="150,11 145.5,20 154.5,20" fill="#1f2530"/><text x="274" y="160" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="159" y="18" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="219.82" y="132" width="8" height="8" fill="none" stroke="#1f2530" stroke-width="1.1"/><line x1="150" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="2"/><circle cx="227.82" cy="85.51" r="4" fill="#2563c9"/><path d="M178,140 A28,28 0 0 0 172.94,123.94" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="190.06" y="127.37" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><g class="q62s" tabindex="0"><line x1="150" y1="140" x2="227.82" y2="140" stroke="transparent" stroke-width="14"/><text x="188.91" y="158" font-size="13" text-anchor="middle" fill="#1f2530">cos <tspan font-style="italic">v</tspan></text><g class="q62-lbl"><line x1="150" y1="140" x2="227.82" y2="140" stroke="#c8324a" stroke-width="3"/><text x="188.91" y="176" font-size="11.5" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">x</tspan>-coordinate</text></g></g><g class="q62s" tabindex="0"><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="transparent" stroke-width="14"/><text x="235.82" y="112.76" font-size="13" text-anchor="start" fill="#1f2530">sin <tspan font-style="italic">v</tspan></text><g class="q62-lbl"><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#c8324a" stroke-width="3"/><rect x="202" y="60" width="84" height="15" rx="4" fill="#f3eee4"/><text x="283" y="72" font-size="11.5" text-anchor="end" fill="#c8324a"><tspan font-style="italic">y</tspan>-coordinate</text></g></g><text x="182.0" y="102.93" font-size="13" text-anchor="end" fill="#1f2530">1</text></svg>

Point at or tap cos $v$ or sin $v$ to highlight the leg and the coordinate it corresponds to.
:::

If we draw a line segment that forms the angle $v$ with the positive $x$-axis, out
to the edge of the unit circle, a right-angled triangle is formed where the hypotenuse is
the radius of the circle, which is always equal to $1$, see the figure above. With the help of
that triangle

$$
\sin v = \frac{y}{1} = y \qquad \cos v = \frac{x}{1} = x \qquad
\tan v = \frac{y}{x} = \frac{\sin v}{\cos v}
$$

So $\sin v$ corresponds to the $y$-coordinate of the point and $\cos v$ to the
$x$-coordinate of the point. The coordinates $(x, y)$ of the point can therefore always be written
$(\cos v, \sin v)$, for *any* angle $v$ at all, not just acute
angles.

::: tips "Definition of sine, cosine and tangent on the unit circle"
The angle $v$ gives a point $(x, y)$ on the unit circle. For all angles $v$

- $\sin v = y$
- $\cos v = x$
- $\tan v = \dfrac{\sin v}{\cos v}$, where $\cos v \neq 0$
:::

## Angles in the unit circle

An angle $v$ in the unit circle can be any size at all, not just
between $0°$ and $90°$ as in a right-angled triangle.

::: tips "Angles in the unit circle"
An angle $v$

- starts at the positive $x$-axis and is turned **anticlockwise** the number of degrees
  given.
- that is greater than $360°$ has gone a whole turn and then continues
  again, for example $360° + v$ gives the same point on the circle as $v$.
- that is **negative** instead corresponds to turning **clockwise** the number of
  degrees given.
:::

::: figur
<svg viewBox="6 -3 237 237" width="322" height="322" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with a positive angle v turned anticlockwise above the x-axis to a blue point, and the negative angle minus v turned clockwise below the x-axis to a red point, a reflection in the x-axis."><circle cx="120" cy="120" r="85" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="12" y1="120" x2="228" y2="120" stroke="#1f2530" stroke-width="1.6"/><polygon points="237,120 228,115.5 228,124.5" fill="#1f2530"/><line x1="120" y1="228" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,3 115.5,12 124.5,12" fill="#1f2530"/><text x="232" y="140" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="120" y1="120" x2="174.64" y2="54.89" stroke="#1f2530" stroke-width="2"/><circle cx="174.64" cy="54.89" r="4" fill="#2563c9"/><path d="M148,120 A28,28 0 0 0 138.0,98.55" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="158.07" y="102.25" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><line x1="120" y1="120" x2="174.64" y2="185.11" stroke="#1f2530" stroke-width="2"/><circle cx="174.64" cy="185.11" r="4" fill="#c8324a"/><path d="M148,120 A28,28 0 0 1 138.0,141.45" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="158.07" y="137.75" font-size="13" text-anchor="middle" fill="#1f2530">−<tspan font-style="italic">v</tspan></text></svg>
:::

The figure shows a positive angle $v$ (anticlockwise, above the $x$-axis, blue point)
and the negative angle $-v$ (clockwise, below the $x$-axis, red point). The
negative angle gives a point that is a reflection in the $x$-axis of the point
for $v$: the $x$-coordinate (the cosine value) is unchanged, while
the $y$-coordinate (the sine value) changes sign.

::: exempel "Example 1: Determine from the unit circle"
**Determine from the unit circle, where the point $(0.51,\ 0.86)$ corresponds to
the angle $v$ (see the figure).<br>a)&nbsp;$\cos v$&emsp;&emsp;b)&nbsp;$\sin v$&emsp;&emsp;c)&nbsp;$\tan v$&emsp;&emsp;d)&nbsp;$v$&emsp;&emsp;e)&nbsp;$\sin 419.3^\circ$&emsp;&emsp;f)&nbsp;$\sin(-59.3^\circ)$**

::: figur
<svg viewBox="6 -3 237 237" width="322" height="322" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with the point 0.51, 0.86 marked at the angle v, measured anticlockwise from the positive x-axis."><circle cx="120" cy="120" r="85" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="12" y1="120" x2="228" y2="120" stroke="#1f2530" stroke-width="1.6"/><polygon points="237,120 228,115.5 228,124.5" fill="#1f2530"/><line x1="120" y1="228" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,3 115.5,12 124.5,12" fill="#1f2530"/><text x="232" y="140" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="120" y1="120" x2="163.40" y2="46.92" stroke="#1f2530" stroke-width="2"/><circle cx="163.40" cy="46.92" r="4" fill="#2563c9"/><path d="M146,120 A26,26 0 0 0 133.28,97.65" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="154.76" y="100.21" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="171.40" y="40.92" font-size="12.5" text-anchor="start" fill="#1f2530">(0.51, 0.86)</text></svg>
:::

::: handskrift
typ: enhetscirkelavlas
:::

::: textlosning
**a)** $\cos v$ corresponds to the $x$-coordinate of the point, that is $0.51$.

**Answer:** $0.51$

**b)** $\sin v$ corresponds to the $y$-coordinate of the point, that is $0.86$.

**Answer:** $0.86$

**c)** We use the relationship $\tan v = \dfrac{\sin v}{\cos v}$. We already
have $\cos v = 0.51$ and $\sin v = 0.86$, which gives

$$
\tan v = \frac{0.86}{0.51} = 1.686\ldots \approx 1.69
$$

**Answer:** $\approx 1.69$

**d)** We determine $v$ with the help of one of the relationships above, for example
$\sin v = 0.86$.

$$
v = \sin^{-1}(0.86) = 59.316\ldots^\circ \approx 59.3^\circ
$$

**Answer:** $\approx 59.3^\circ$

**e)** The angle $419.3^\circ$ is greater than $360^\circ$. We subtract a
whole turn ($360^\circ$) to find the angle between $0^\circ$ and
$360^\circ$ that gives the same point on the unit circle.

$$
\sin 419.3^\circ = \sin(419.3^\circ - 360^\circ) = \sin 59.3^\circ
$$

From d) we know that $59.3^\circ$ is the angle $v$ in the figure above, with
$\sin v = 0.86$.

**Answer:** $0.86$

**f)** The angle $-59.3^\circ$ corresponds to turning $59.3^\circ$ clockwise.
We mark the angle and the new point in a unit circle:

::: figur
<svg viewBox="6 -3 237 237" width="322" height="322" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with the point 0.51, minus 0.86 marked at the angle minus 59.3 degrees, measured clockwise from the positive x-axis, a reflection in the x-axis of the previous point."><circle cx="120" cy="120" r="85" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="12" y1="120" x2="228" y2="120" stroke="#1f2530" stroke-width="1.6"/><polygon points="237,120 228,115.5 228,124.5" fill="#1f2530"/><line x1="120" y1="228" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,3 115.5,12 124.5,12" fill="#1f2530"/><text x="232" y="140" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="120" y1="120" x2="163.40" y2="193.08" stroke="#1f2530" stroke-width="2"/><circle cx="163.40" cy="193.08" r="4" fill="#c8324a"/><path d="M146,120 A26,26 0 0 1 133.28,142.35" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="158.23" y="141.77" font-size="12.5" text-anchor="middle" fill="#1f2530">−59.3°</text><text x="171.40" y="207.08" font-size="12.5" text-anchor="start" fill="#1f2530">(0.51, −0.86)</text></svg>
:::

The point is a reflection in the $x$-axis of the point in the previous figure:
the $x$-coordinate (the cosine value) is unchanged, while the $y$-coordinate
(the sine value) changes sign. So

$$
\sin(-59.3^\circ) = -\sin 59.3^\circ = -0.86
$$

**Answer:** $-0.86$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The unit circle"
- The **unit circle** has radius 1 and its centre at the origin.
- It defines sine, cosine and tangent for **all** angles, not just acute ones.
- The radius to the edge forms a right-angled triangle with hypotenuse 1.
:::

::: sampunkt "The definitions"
- $\sin v = y$, that is the $y$-coordinate of the point.
- $\cos v = x$, that is the $x$-coordinate of the point.
- $\tan v = \dfrac{\sin v}{\cos v} = \dfrac{y}{x}$, where $\cos v \neq 0$.
- The point can always be written $(\cos v,\ \sin v)$.
:::

::: sampunkt "Angles"
- The angle starts at the **positive $x$-axis** and is turned **anticlockwise**.
- A **negative** angle is instead turned clockwise.
- An angle over $360^\circ$ has gone a whole turn: $360^\circ + v$ gives the same point as $v$.
:::

::: sampunkt "Tricks for calculating"
- Subtract whole turns: $\sin 419.3^\circ = \sin 59.3^\circ$.
- A negative angle reflects the point in the $x$-axis. Cosine is unchanged, sine changes sign.
- So $\sin(-v) = -\sin v$ and $\cos(-v) = \cos v$.
:::

:::

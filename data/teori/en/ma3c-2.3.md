---
kalla: 0f7a4b9f43
id: ma3c-2.3
title: The definition of the derivative
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.3'
---

# The definition of the derivative

The slope of the tangent at a point is called the **derivative**. If we want to determine
the derivative of a function $f(x)$ at the point where $x = a$, we write $f'(a)$,
which is read "$f$ prime of $a$".

We have previously established that the average slope of a curve over an interval
can be calculated exactly with the slope of the secant. But how can we determine
the slope exactly at a single point, that is the slope of the tangent?

We draw an arbitrary function $f(x)$ and want to determine the slope
exactly at the point with the $x$-coordinate $a$. We draw a secant where the second
point lies at the horizontal distance $h$ from the first point.
The $x$-coordinate of the second point is then $a + h$. See the figure below.

::: figur
<svg viewBox="20 0 256 200" width="374" height="292" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of an arbitrary function f of x with a secant through the points a, f of a and a plus h, f of a plus h. The horizontal distance between the points is h."><line x1="45" y1="175" x2="260" y2="175" stroke="#1f2530" stroke-width="1.6"/><polygon points="270,175 260,170.5 260,179.5" fill="#1f2530"/><line x1="60" y1="188" x2="60" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="60,4 55.5,14 64.5,14" fill="#1f2530"/><text x="265" y="192" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="68" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 60,166.9 C 61.83,166.13 67.33,163.63 71,162.3 C 74.67,160.97 78.33,159.85 82,158.9 C 85.67,157.95 89.33,157.25 93,156.6 C 96.67,155.95 100.33,155.47 104,155 C 107.67,154.53 111.33,154.18 115,153.8 C 118.67,153.42 122.33,153.1 126,152.7 C 129.67,152.3 133.33,151.92 137,151.4 C 140.67,150.88 144.33,150.33 148,149.6 C 151.67,148.87 155.33,148.05 159,147 C 162.67,145.95 166.33,144.78 170,143.3 C 173.67,141.82 177.33,140.1 181,138.1 C 184.67,136.1 188.33,133.92 192,131.3 C 195.67,128.68 199.33,125.75 203,122.4 C 206.67,119.05 210.33,115.38 214,111.2 C 217.67,107.02 221.33,102.42 225,97.3 C 228.67,92.18 232.33,86.63 236,80.5 C 239.67,74.37 243.33,67.77 247,60.5 C 250.67,53.23 256.17,40.83 258,36.9" fill="none" stroke="#2563c9" stroke-width="2"/><text x="256" y="20" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="67" y1="162.7" x2="192" y2="131.3" stroke="#4a7d3a" stroke-width="1.8"/><text x="108" y="145" font-size="12" text-anchor="middle" fill="#1f2530">secant</text><line x1="82" y1="175" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="192" y1="175" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="158.9" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="131.3" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="82" cy="158.9" r="3" fill="#2563c9"/><circle cx="192" cy="131.3" r="3" fill="#2563c9"/><line x1="82" y1="169" x2="192" y2="169" stroke="#1f2530" stroke-width="1.3"/><line x1="82" y1="165" x2="82" y2="173" stroke="#1f2530" stroke-width="1.3"/><line x1="192" y1="165" x2="192" y2="173" stroke="#1f2530" stroke-width="1.3"/><text x="137" y="163" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">h</tspan></text><text x="82" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="192" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan></text><text x="26" y="162.9" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>)</text><text x="26" y="135.3" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan>)</text></svg>
:::

The two points $(x_1, y_1)$ and $(x_2, y_2)$ on the secant are therefore
$(a, f(a))$ and $(a + h, f(a + h))$.

The slope of the secant can then be calculated as

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(a+h) - f(a)}{(a+h) - a} = \frac{f(a+h) - f(a)}{h}
$$

If we let the distance $h$ between the points decrease and tend to 0, the
secant will turn into a tangent. So we get the slope at the point, the derivative,
by calculating a limit as $h$ tends to 0. This is
the definition of the derivative!

::: formel "The definition of the derivative"
$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
\qquad \text{or} \qquad
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$
:::

::: tips "Step by step"
1. Set up the definition of the derivative with the function $f$ (and possibly a
   given point $a$).
2. Simplify the numerator and **factorise away** $h$ from the numerator and denominator,
   otherwise you cannot set $h = 0$ (it gives division by 0).
3. Now set $h = 0$ and calculate the limit.
:::

::: exempel "Example 1: The definition of the derivative"
**The function $f(x) = x^2$ is given. Determine<br>
a)&nbsp;$f'(5)$&emsp;&emsp;b) the slope of the tangent when $x = 5$.**

::: handskrift
typ: derivatafem
:::

::: textlosning
**a)** We set up the definition of the derivative, then set $a = 5$ and
simplify.

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
$$

$$
f'(5) = \lim_{h \to 0} \frac{f(5+h) - f(5)}{h} = \lim_{h \to 0} \frac{(5+h)^2 - 5^2}{h} = \lim_{h \to 0} \frac{25 + 10h + h^2 - 25}{h} = \lim_{h \to 0} \frac{10h + h^2}{h}
$$

We cannot set $h = 0$ directly, since we would then get a division by 0. We
factorise the numerator and cancel $h$.

$$
f'(5) = \lim_{h \to 0} \frac{h(10 + h)}{h} = \lim_{h \to 0} (10 + h)
$$

Now the denominator is gone, so we can set $h = 0$ and calculate the limit.

$$
f'(5) = \lim_{h \to 0} (10 + h) = 10 + 0 = 10
$$

**Answer:** $f'(5) = 10$

**b)** The slope of the tangent when $x = 5$ is the same thing as the derivative $f'(5)$.
So the answer is the same as in a).

**Answer:** The slope of the tangent when $x = 5$ is $10$.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Derivative"
- The **derivative** is the slope of the tangent at a point, that is the slope of the curve there.
- The derivative of $f(x)$ at the point $x = a$ is written $f'(a)$ and read "$f$ prime of $a$".
:::

::: sampunkt "From secant to tangent"
- Put the second point at the horizontal distance $h$, that is at $(a + h,\ f(a+h))$.
- The slope of the secant becomes $\dfrac{f(a+h) - f(a)}{h}$.
- If you let $h$ tend to 0, the secant turns into the tangent.
:::

::: sampunkt "The definition of the derivative"
- $f'(a) = \lim_{h \to 0} \dfrac{f(a+h) - f(a)}{h}$.
- Written in general $f'(x) = \lim_{h \to 0} \dfrac{f(x+h) - f(x)}{h}$.
:::

::: sampunkt "Step by step"
1. Set up the definition with the function and the given point.
2. Simplify the numerator and **factorise away $h$**. Without that you get division by 0.
3. Set $h = 0$ and calculate the limit.
- For $f(x) = x^2$: $\dfrac{10h + h^2}{h} = 10 + h$, so $f'(5) = 10$.
:::

:::

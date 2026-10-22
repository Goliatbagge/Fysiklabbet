---
kalla: 5e18881957
id: ma1c-1.10
title: Order of operations
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.10'
---

# Order of operations

::: härledning "Introduction"
The calculation $5 + 2 \cdot 3$ gives different answers depending on the order in which you
calculate.

If we first calculate $5 + 2$ we get

$$
\mathbf{5 + 2} \cdot 3 = \mathbf{7} \cdot 3 = 21
$$

If we instead calculate $2 \cdot 3$ first we get

$$
5 + \mathbf{2 \cdot 3} = 5 + 6 = 11
$$

Since the answers are different, the order of the operations matters.
:::

Rules for which calculations to carry out first are called
the **order of operations**.

::: formel "Order of operations"
1. **Brackets**: ( )
2. **Powers**: $a^b$
3. **Multiplication and division**: $\cdot$ and /
4. **Addition and subtraction**: + and −
:::

So the correct calculation for the example above is to calculate the
multiplication first, so

$$
5 + 2 \cdot 3 = 5 + 6 = 11
$$

::: kuriosa "The maths devil"
"The maths devil" is a picture for remembering the order of operations. Read
it from top to bottom!

::: figur
<svg viewBox="10 2 415 164" width="563" height="223" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The maths devil: a face built from arithmetic symbols. The horns are brackets, the eyebrows are power signs, the eyes are a multiplication dot and a division slash, the nose is a plus sign and the mouth a minus sign. Next to it the order is listed: brackets, powers, multiplication and division, addition and subtraction. Point at or tap a part of the face to highlight its row in the list." style="overflow:visible"><style>.q110-g{cursor:pointer;outline:none}.q110-g .q110-p{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q110-g:hover .q110-p,.q110-g:focus .q110-p{transform:scale(1.18)}.q110-g .q110-r{transition:fill .18s ease}.q110-g:hover .q110-r,.q110-g:focus .q110-r{fill:#c0397c;font-weight:600}.q110-g .q110-box{transition:fill .18s ease}.q110-g:hover .q110-box,.q110-g:focus .q110-box{fill:#c0397c}</style><circle cx="90" cy="98" r="60" fill="#4fb8bd"/><g class="q110-g" tabindex="0"><rect x="42" y="2" width="96" height="44" fill="transparent"/><g class="q110-p"><path d="M60,48 C48,36 46,20 56,8" fill="none" stroke="#c0397c" stroke-width="5" stroke-linecap="round"/><path d="M120,48 C132,36 134,20 124,8" fill="none" stroke="#c0397c" stroke-width="5" stroke-linecap="round"/></g><text x="400" y="28" font-size="14" text-anchor="end" fill="#1f2530" class="q110-r">Brackets</text><rect x="410" y="18" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2" class="q110-box"/></g><g class="q110-g" tabindex="0"><rect x="56" y="64" width="68" height="26" fill="transparent"/><g class="q110-p"><polyline points="60,84 71,70 82,84" fill="none" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="98,84 109,70 120,84" fill="none" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></g><text x="400" y="60" font-size="14" text-anchor="end" fill="#1f2530" class="q110-r">Powers</text><rect x="410" y="50" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2" class="q110-box"/></g><g class="q110-g" tabindex="0"><rect x="52" y="94" width="74" height="22" fill="transparent"/><g class="q110-p"><circle cx="64" cy="106" r="5" fill="#c0397c"/><line x1="100" y1="112" x2="118" y2="92" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/></g><text x="400" y="92" font-size="14" text-anchor="end" fill="#1f2530" class="q110-r">Multiplication and division</text><rect x="410" y="82" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2" class="q110-box"/></g><g class="q110-g" tabindex="0"><rect x="72" y="116" width="36" height="42" fill="transparent"/><g class="q110-p"><line x1="76" y1="130" x2="104" y2="130" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/><line x1="90" y1="116" x2="90" y2="144" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/></g><g class="q110-p"><line x1="78" y1="152" x2="102" y2="152" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/></g><text x="400" y="139" font-size="14" text-anchor="end" fill="#1f2530" class="q110-r">Addition and subtraction</text><rect x="410" y="129" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2" class="q110-box"/></g></svg>

The horns are brackets, the eyebrows powers, the eyes multiplication and
division, the nose addition and the mouth subtraction. Point at or tap a
part of the face to highlight its row in the order next to it.
:::
:::

Now it is also time to go through some important concepts, namely what
the parts are called in the different operations. Learn these by heart!

::: formel "The parts of the operations"
| Operation | The parts | Answer | Example |
| --- | --- | --- | --- |
| Addition | term + term | sum | $3 + 2 = 5$ |
| Subtraction | term − term | difference | $5 - 2 = 3$ |
| Multiplication | factor · factor | product | $3 \cdot 4 = 12$ |
| Division | $\dfrac{\text{numerator}}{\text{denominator}}$ | quotient | $12/4 = 3$ |
:::

::: exempel "Example 1: Calculate in the right order"
**Calculate<br>a)&nbsp;$5 \cdot (3 + 6)$&emsp;&emsp;b)&nbsp;$8 \cdot 10 - (4 \cdot 2 - 3)$&emsp;&emsp;c)&nbsp;$9 \cdot 5 - (10 - 7)^2$&emsp;&emsp;d)&nbsp;$\dfrac{15}{5 - 2}$**

::: handskrift
typ: prioritering
:::

::: textlosning
**a)** Calculate the bracket first:

$$
5 \cdot (3 + 6) = 5 \cdot 9 = 45
$$

**Answer:** 45

**b)** The multiplication in the bracket first, then the bracket, then the
multiplication and finally the difference:

$$
8 \cdot 10 - (4 \cdot 2 - 3) = 8 \cdot 10 - (8 - 3) = 8 \cdot 10 - 5 = 80 - 5 = 75
$$

**Answer:** 75

**c)** The bracket first, then the power, then the multiplication and finally
the difference:

$$
9 \cdot 5 - (10 - 7)^2 = 9 \cdot 5 - 3^2 = 9 \cdot 5 - 9 = 45 - 9 = 36
$$

**Answer:** 36

**d)** In divisions there are "invisible" brackets. You can imagine that there
is a bracket around the numerator and the denominator, so the denominator is calculated first:

$$
\frac{15}{5 - 2} = \frac{15}{(5 - 2)} = \frac{15}{3} = 5
$$

**Answer:** 5
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Why the order matters"
- $5 + 2 \cdot 3$ gives 21 if you add first, but 11 if you
  multiply first.
- Only one of them is correct, so rules are needed.
:::

::: sampunkt "The order of operations"
1. **Brackets**
2. **Powers**
3. **Multiplication and division**
4. **Addition and subtraction**
- Within the same level you calculate from **left to right**.
:::

::: sampunkt "The parts of the operations"
- **Addition**: term + term = **sum**.
- **Subtraction**: term − term = **difference**.
- **Multiplication**: factor · factor = **product**.
- **Division**: numerator over denominator = **quotient**.
:::

::: sampunkt "The fraction bar is an invisible bracket"
- A fraction bar groups the whole numerator and the whole denominator.
- $\dfrac{5 + 3}{2}$ means $\dfrac{8}{2} = 4$, not
  $5 + \dfrac{3}{2}$.
:::
:::

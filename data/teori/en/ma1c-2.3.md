---
kalla: b46e1f53c1
id: ma1c-2.3
title: Multiplying with brackets
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.3'
---

# Multiplying with brackets

If we have an expression in brackets with a factor in front, we can **multiply**
the factor **into** the brackets. Rewriting an expression so that it has no
brackets is called **expanding** the expression. The factor in front of the brackets
must be multiplied by *each term* inside the brackets. This rule is called
**the distributive law**.

::: formel "The distributive law"
$$
a(b + c) = ab + ac
$$

::: härledning "Check: The distributive law"
We check whether the distributive law holds using the rules of arithmetic we already
know. For example, we calculate $3 \cdot (9 - 4)$ in two different ways.

**Using the order of operations:**

$$
3 \cdot (9 - 4) = 3 \cdot 5 = 15
$$

**Using the distributive law:**

$$
3 \cdot (9 - 4) = 3 \cdot 9 - 3 \cdot 4 = 27 - 12 = 15
$$

We get the same answer with the distributive law as with the order of operations!
The rule seems to be correct.
:::
:::

::: exempel "Example 1: Multiplying into the brackets"
**Simplify<br>a)&nbsp;$2(2x - 1)$&emsp;&emsp;b)&nbsp;$8(3x + 4) - 2(5x - 7)$**

::: handskrift
typ: multiplicerain
:::

::: textlosning
**a)** The factor 2 is multiplied by each term in the brackets:

$$
2(2x - 1) = 2 \cdot 2x - 2 \cdot 1 = 4x - 2
$$

**Answer:** $4x - 2$

**b)** We multiply in both factors in the same step. The minus sign
in front of the 2 applies to the whole product, so we keep brackets around it:

$$
8(3x + 4) - 2(5x - 7) = 8 \cdot 3x + 8 \cdot 4 - (2 \cdot 5x - 2 \cdot 7)
= 24x + 32 - (10x - 14)
$$

Remove the brackets and *change the signs*:

$$
24x + 32 - 10x + 14 = 14x + 46
$$

**Answer:** $14x + 46$
:::
:::

::: härledning "Note: The distributive law only applies to plus and minus"
The distributive law is about a factor in front of brackets whose terms
are **added or subtracted**. If there is instead a **multiplication**
inside the brackets, there are no terms to distribute the factor over. Then the whole
bracket is a single product, and the factor in front is multiplied in **once**:

$$
2(3x) = 2 \cdot 3 \cdot x = 6x
$$

A common mistake is to multiply the factor by each factor inside the
brackets, as if they were terms:

$$
2(3x) \neq 2 \cdot 3 \cdot 2x = 12x
$$

Check with a number: for $x = 1$, $2(3 \cdot 1) = 6$, not 12.

So always ask yourself: is there a plus or a minus inside the brackets? Only
then should the factor go into **each** term.
:::

When two pairs of brackets are multiplied together, the **first term** in
the **first bracket** is multiplied by **all the terms in the second
bracket**. Then the **second term** in the **first bracket**
is multiplied by **all the terms in the second bracket**. If there are more than
two terms in the first bracket, you continue in the same way until you have
multiplied all the terms in the first bracket into the second.

::: formel "Multiplying brackets"
::: figur
<svg viewBox="16 6 336 64" width="426" height="81" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The bracket a plus b times the bracket c plus d. Arcs above the expression show that a is multiplied by c and by d, and arcs below the expression that b is multiplied by c and by d. The result is a times c plus a times d plus b times c plus b times d. Point at or tap an arc to highlight the product it gives." style="overflow:visible"><style>.q23-g{cursor:pointer;outline:none}.q23-g .q23-arc{transition:stroke-width .18s ease}.q23-g:hover .q23-arc,.q23-g:focus .q23-arc{stroke-width:2.8}.q23-r:hover .q23-term,.q23-r:focus .q23-term{fill:#c8324a;font-weight:600}.q23-b:hover .q23-term,.q23-b:focus .q23-term{fill:#2563c9;font-weight:600}</style><text x="24" y="46" font-size="15" fill="#1f2530">(</text><text x="31" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="46" y="46" font-size="15" fill="#1f2530">+</text><text x="62" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="72" y="46" font-size="15" fill="#1f2530">)(</text><text x="88" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="102" y="46" font-size="15" fill="#1f2530">+</text><text x="118" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">d</tspan></text><text x="128" y="46" font-size="15" fill="#1f2530">)</text><text x="165.9" y="46" font-size="15" fill="#1f2530">=</text><text x="210.5" y="46" font-size="15" fill="#1f2530">+</text><text x="256.9" y="46" font-size="15" fill="#1f2530">+</text><text x="302.6" y="46" font-size="15" fill="#1f2530">+</text><g class="q23-g q23-r" tabindex="0"><path d="M35,31 C45,12 81,12 91,29" fill="none" stroke="transparent" stroke-width="12"/><path d="M35,31 C45,12 81,12 91,29" fill="none" stroke="#c8324a" stroke-width="1.3" class="q23-arc"/><polygon points="0,0 -6,3 -6,-3" transform="translate(91,29) rotate(58)" fill="#c8324a"/><text x="180.2" y="46" font-size="15" fill="#1f2530" class="q23-term"><tspan font-style="italic">a</tspan> · <tspan font-style="italic">c</tspan></text></g><g class="q23-g q23-r" tabindex="0"><path d="M35,31 C57,2 113,2 123,29" fill="none" stroke="transparent" stroke-width="12"/><path d="M35,31 C57,2 113,2 123,29" fill="none" stroke="#c8324a" stroke-width="1.3" class="q23-arc"/><polygon points="0,0 -6,3 -6,-3" transform="translate(123,29) rotate(50)" fill="#c8324a"/><text x="224.7" y="46" font-size="15" fill="#1f2530" class="q23-term"><tspan font-style="italic">a</tspan> · <tspan font-style="italic">d</tspan></text></g><g class="q23-g q23-b" tabindex="0"><path d="M66,50 C74,63 84,63 91,50" fill="none" stroke="transparent" stroke-width="12"/><path d="M66,50 C74,63 84,63 91,50" fill="none" stroke="#2563c9" stroke-width="1.3" class="q23-arc"/><polygon points="0,0 -6,3 -6,-3" transform="translate(91,50) rotate(-62)" fill="#2563c9"/><text x="271.2" y="46" font-size="15" fill="#1f2530" class="q23-term"><tspan font-style="italic">b</tspan> · <tspan font-style="italic">c</tspan></text></g><g class="q23-g q23-b" tabindex="0"><path d="M66,50 C84,72 112,72 123,50" fill="none" stroke="transparent" stroke-width="12"/><path d="M66,50 C84,72 112,72 123,50" fill="none" stroke="#2563c9" stroke-width="1.3" class="q23-arc"/><polygon points="0,0 -6,3 -6,-3" transform="translate(123,50) rotate(-63)" fill="#2563c9"/><text x="316.9" y="46" font-size="15" fill="#1f2530" class="q23-term"><tspan font-style="italic">b</tspan> · <tspan font-style="italic">d</tspan></text></g></svg>

Point at or tap an arc to highlight the product it gives.
:::
:::

::: exempel "Example 2: Expanding and simplifying"
**Expand and simplify<br>a)&nbsp;$(x + 7)(x + 3)$&emsp;&emsp;b)&nbsp;$(3x - 5)(8x + 9)$&emsp;&emsp;c)&nbsp;$10 - (x - 2)(x - 3)$**

::: handskrift
typ: utveckla
:::

::: textlosning
**a)** Each term in the first bracket is multiplied by each term in
the second:

$$
(x + 7)(x + 3) = x^2 + 3x + 7x + 21 = x^2 + 10x + 21
$$

**Answer:** $x^2 + 10x + 21$

**b)** Same method. Keep track of the signs:

$$
(3x - 5)(8x + 9) = 24x^2 + 27x - 40x - 45 = 24x^2 - 13x - 45
$$

**Answer:** $24x^2 - 13x - 45$

**c)** When there is a minus sign in front of a double pair of brackets, we must
*keep* large brackets around the expanded expression, since we
will afterwards change the sign of every term inside the brackets:

$$
10 - (x - 2)(x - 3) = 10 - (x^2 - 3x - 2x + 6)
$$

Change the sign of every term inside the brackets and simplify:

$$
10 - x^2 + 3x + 2x - 6 = 4 - x^2 + 5x
$$

**Answer:** $4 - x^2 + 5x$, or alternatively $-x^2 + 5x + 4$ (you often want the
terms with the largest exponent first, but it is not required).
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The distributive law"
- $a(b + c) = ab + ac$
- The factor in front of the brackets is multiplied by **each** term inside.
- Rewriting an expression without brackets is called **expanding** it.
- Only applies to plus and minus in the brackets: $2(3x) = 6x$, not $12x$.
:::

::: sampunkt "Do not forget a term"
- $8(3x + 4) - 2(5x - 7)$: multiply in both factors, and remember
  that $-2 \cdot (-7) = +14$.
:::

::: sampunkt "Two brackets"
- **Each** term in the first bracket is multiplied by **each** term
  in the second.
- $(x + 7)(x + 3) = x^2 + 3x + 7x + 21 = x^2 + 10x + 21$.
- With two terms in each bracket there are always **four** products.
:::

::: sampunkt "Minus sign in front of two brackets"
- $10 - (x - 2)(x - 3)$: expand the product **first**, then change the sign
  of the whole result.
- Always check by substituting a simple value, for example
  $x = 1$, into both the original and the expanded expression.
:::
:::

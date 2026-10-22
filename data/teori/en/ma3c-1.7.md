---
kalla: 0fd2ad9713
id: ma3c-1.7
title: Computer algebra tools
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.7'
---

# Computer algebra tools

A calculator that can handle not only numerical calculations (calculations with
numbers) but also algebraic expressions (expressions with letters)
is called a **computer algebra tool** (CAS). GeoGebra is an example of such
a tool.

Computer algebra tools can be used, for example, to simplify expressions,
factorise expressions, solve equations and determine limits.

::: tips "Commands in GeoGebra"
| Task | Command in GeoGebra |
| --- | --- |
| Simplify expressions | Simplify( Function ) |
| Factorise expressions | Factor( Polynomial ) |
| Solve equations numerically (gives decimals) | NSolve( Equation ) |
| Solve equations exactly (gives symbols) | Solve( Equation ) |
| Determine a function value | Define $f(x) = \ldots$ and then type, for example, $f(3)$ |
| Calculate a limit | Limit( Function, Value ) |
:::

::: exempel "Example 1: Simplify an expression"
**Simplify $(x + 3)(x - 1)(x + 5)$ with a computer algebra tool.**

::: handskrift
typ: casutveckla
:::

::: textlosning
The command *Expand* is closely related to *Simplify* in the table above: it
multiplies out the brackets and rewrites the expression in expanded
form. In GeoGebra's input bar we type "exp" and choose
*Expand( Expression )* in the menu *Expand*. We type in the expression and press
Enter.

$$
\begin{aligned}
&\text{Expand}\big((x + 3)(x - 1)(x + 5)\big) \\
&\rightarrow\ x^3 + 7x^2 + 7x - 15
\end{aligned}
$$

**Answer:** $x^3 + 7x^2 + 7x - 15$
:::
:::

::: exempel "Example 2: Factorise an expression"
**Factorise $x^3 + 7x^2 + 7x - 15$ with a computer algebra tool.**

::: handskrift
typ: casfaktorisera
:::

::: textlosning
In GeoGebra's input bar we type "fac" and choose
*Factor( Polynomial )* in the menu *Factor*. We define a function with
the expression in the command and press Enter.

$$
\begin{aligned}
&f(x) = \text{Factor}(x^3 + 7x^2 + 7x - 15) \\
&=\ (x - 1)(x + 3)(x + 5)
\end{aligned}
$$

**Answer:** $(x - 1)(x + 3)(x + 5)$
:::
:::

::: exempel "Example 3: Solve a cubic equation"
**Solve the equation $x^3 - x^2 - 3x + 3 = 0$ with a computer algebra tool.
Answer<br>a) to two decimal places&emsp;&emsp;b) exactly.**

::: handskrift
typ: castredjegrad
:::

::: textlosning
**a)** In GeoGebra's input bar we type "nso" and choose
*NSolve( Equation )* in the menu *NSolve*. We type in the equation and press Enter.

$$
\begin{aligned}
&l_1 = \text{NSolve}(x^3 - x^2 - 3x + 3 = 0) \\
&\approx\ \{x = -1.73205,\ x = 1,\ x = 1.73205\}
\end{aligned}
$$

**Answer:** $x_1 \approx -1.73$, $x_2 = 1$ and $x_3 \approx 1.73$

**b)** Instead we type "sol" and choose *Solve( Equation )* in the menu *Solve*.

$$
\begin{aligned}
&l_1 = \text{Solve}(x^3 - x^2 - 3x + 3 = 0) \\
&=\ \{x = -\sqrt{3},\ x = 1,\ x = \sqrt{3}\}
\end{aligned}
$$

**Answer:** $x_1 = -\sqrt{3}$, $x_2 = 1$ and $x_3 = \sqrt{3}$
:::
:::

Note that in GeoGebra you can easily switch between exact and approximate
form with the buttons "$=$" and "$\approx$" without retyping the whole
command.

::: exempel "Example 4: Function value and solving an equation"
**The function $f(x) = x^3 - 4x^2$ is given. With a computer algebra tool,
determine<br>a) $f(7)$&emsp;&emsp;b) the solution to $f(x) = 7$.**

::: handskrift
typ: casfunktion
:::

::: textlosning
**a)** We define the function by typing $f(x) = x^3 - 4x^2$ in
GeoGebra's input bar. Then we type $f(7)$ on the line below and get
our value.

$$
\begin{aligned}
&f(x) = x^3 - 4x^2 \\[2pt]
&f(7) \\[2pt]
&=\ 147
\end{aligned}
$$

**Answer:** $147$

**b)** We define the function just as in a). On the line below we choose
the command *Solve( Equation )* and type $f(x) = 7$ (or just $f = 7$) in
the brackets.

$$
\begin{aligned}
&\text{Solve}(f = 7) \\
&=\ \{x = 4.36705\}
\end{aligned}
$$

**Answer:** $x \approx 4.37$
:::
:::

::: exempel "Example 5: Limit"
**Determine $\displaystyle\lim_{x \to \infty} \frac{3x + 2}{x - 1}$ with
a computer algebra tool.**

::: handskrift
typ: casgransvarde
:::

::: textlosning
In GeoGebra's input bar we type "lim" and choose
*Limit( Function, Value )* in the menu *Limit*. We type in
the expression and the value that the variable tends to, and press Enter.

$$
\begin{aligned}
&\text{Limit}\!\left(\frac{3x + 2}{x - 1},\ \infty\right) \\
&\rightarrow\ 3
\end{aligned}
$$

You will find the infinity sign $\infty$ among the keyboard's special characters,
or by typing "infinity".

**Answer:** $3$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "What the tool does"
- A **computer algebra tool** calculates not only with numbers but also with expressions containing letters.
- GeoGebra is such a tool and can handle simplification, factorisation, equations and limits.
:::

::: sampunkt "Commands"
- Expand( Expression ) and Simplify( Function ) rewrite the expression.
- Factor( Polynomial ) gives the factors.
- Limit( Function, Value ) gives the limit. Type "infinity" for $\infty$.
:::

::: sampunkt "Exact or approximate value"
- **Solve( Equation )** gives an **exact** answer with symbols, for example $x = \sqrt{3}$.
- **NSolve( Equation )** gives a **numerical** answer with decimals.
- The buttons $=$ and $\approx$ switch between the forms without retyping the command.
:::

::: sampunkt "Functions"
- Define the function on a line of its own, for example $f(x) = x^3 - 4x^2$.
- Then type $f(7)$ for the function value.
- Type Solve($f = 7$) to solve the equation $f(x) = 7$.
- Round the answer to a suitable number of decimal places yourself.
:::

:::

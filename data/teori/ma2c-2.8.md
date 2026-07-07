---
id: ma2c-2.8
title: Rotekvationer
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.8'
---

# Rotekvationer

En ekvation där variabeln, t.ex. $x$, är under ett rottecken kallas
**rotekvation**.

::: tips "Lösa rotekvationer — generellt"
1. Lös ut termen som innehåller rotuttrycket.
2. Kvadrera båda led (för att bli av med rottecknet) och lös med
   lämplig metod.
3. Kontrollera din lösning! Falska rötter kan uppstå.
:::

::: tips "Lösa rotekvationer — med variabelsubstitution"
1. Substituera (byt ut) rotuttrycket, t.ex. $\sqrt{x}$, mot en annan
   variabel, t.ex. $t$.
2. Teckna en ny ekvation med $t$ och lös ekvationen.
3. Bestäm den ursprungliga variabeln $x$ med hjälp av värdet på $t$.
4. Kontrollera din lösning! Falska rötter kan uppstå.
:::

::: exempel "Exempel 1 — Lös rotekvationerna"
**Lös<br>a) $\sqrt{x} = 8$&emsp;&emsp;b) $\sqrt{x + 2} = 17$&emsp;&emsp;c) $x + 3\sqrt{x} - 4 = 0$**

**a)** Vi kvadrerar båda led och löser ekvationen:

$$
\left(\sqrt{x}\right)^2 = 8^2
$$

$$
x = 64
$$

Kontroll: Insättning av $x = 64$ i den ursprungliga ekvationen
$\sqrt{x} = 8$ ger $\mathrm{VL} = \sqrt{64} = 8 = \mathrm{HL}$.
Stämmer!

**Svar:** $x = 64$

**b)** Vi kvadrerar båda led och löser ekvationen:

$$
\left(\sqrt{x + 2}\right)^2 = 17^2
$$

$$
x + 2 = 289
$$

$$
x = 287
$$

Kontroll: Insättning av $x = 287$ i den ursprungliga ekvationen ger
$\mathrm{VL} = \sqrt{287 + 2} = \sqrt{289} = 17 = \mathrm{HL}$.
Stämmer!

**Svar:** $x = 287$

**c)** Vi löser ut termen med rotuttrycket $3\sqrt{x}$:

$$
3\sqrt{x} = 4 - x
$$

Vi kvadrerar båda led:

$$
\left(3\sqrt{x}\right)^2 = (4 - x)^2
$$

$$
9x = 16 - 8x + x^2
$$

Vi modifierar ekvationen och löser den sedan med pq-formeln:

$$
x^2 - 17x + 16 = 0
$$

$$
x = 8{,}5 \pm \sqrt{8{,}5^2 - 16} = 8{,}5 \pm \sqrt{56{,}25} = 8{,}5 \pm 7{,}5
$$

Detta ger lösningarna

$$
x_1 = 8{,}5 - 7{,}5 = 1
$$

$$
x_2 = 8{,}5 + 7{,}5 = 16
$$

Kontroll: Insättning av $x = 1$ i den ursprungliga ekvationen
$x + 3\sqrt{x} - 4 = 0$ ger

$$
\mathrm{VL} = 1 + 3\sqrt{1} - 4 = 1 + 3 - 4 = 0 = \mathrm{HL}
$$

Stämmer!

Kontroll: Insättning av $x = 16$ i den ursprungliga ekvationen ger

$$
\mathrm{VL} = 16 + 3\sqrt{16} - 4 = 16 + 12 - 4 = 24 \neq \mathrm{HL}
$$

Stämmer inte! **Falsk rot!**

**Svar:** $x = 1$
:::

::: exempel "Exempel 2 — Alternativ lösning med variabelsubstitution"
**Lös $x + 3\sqrt{x} - 4 = 0$ med variabelsubstitution.**

Sätt $\sqrt{x} = t$. Detta ger
$x = \sqrt{x} \cdot \sqrt{x} = t \cdot t = t^2$ och den nya ekvationen

$$
t^2 + 3t - 4 = 0
$$

pq-formeln ger

$$
t = -1{,}5 \pm \sqrt{1{,}5^2 + 4} = -1{,}5 \pm \sqrt{6{,}25} = -1{,}5 \pm 2{,}5
$$

Detta ger lösningarna

$$
t_1 = -1{,}5 - 2{,}5 = -4
$$

$$
t_2 = -1{,}5 + 2{,}5 = 1
$$

$\sqrt{x} = t_1$ ger

$$
\sqrt{x} = -4 \implies x_1 = 16
$$

$\sqrt{x} = t_2$ ger

$$
\sqrt{x} = 1 \implies x_2 = 1
$$

(Kontrollera lösningarna $x_1 = 16$ och $x_2 = 1$ som i första
lösningen — $x = 16$ visar sig vara en falsk rot.)

**Svar:** $x = 1$
:::

::: kuriosa "Varför uppstår falska rötter?"
Anta $A = B$.

Vi kvadrerar båda led och får

$$
A^2 = B^2
$$

Löser vi denna ekvation får vi

$$
A = \pm B
$$

Den andra lösningen $A = -B$ är en falsk rot (om $A$ inte är lika
med 0) eftersom den inte uppfyller det första villkoret $A = B$.

Slutsats: Kvadreringar kan ge extra "falska" rötter.
:::

---
id: ma1c-2.9
title: Enkla andra- och tredjegradsekvationer
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.9'
---

# Enkla andra- och tredjegradsekvationer

I en ekvation avgör variabeltermen med högst exponent ekvationens **grad**.
En ekvation som innehåller en variabel där högsta exponenten är 2, t.ex.
$x^2 + 7 = 11$, kallas **andragradsekvation**. En ekvation som innehåller
en variabel med högsta graden 3, t.ex. $x^3 - 8 = 1$, kallas
**tredjegradsekvation**. Andra- och tredjegradsekvationer som innehåller en
enda variabelterm kallas **enkla andra- och tredjegradsekvationer**.

::: formel "Lösa enkla andragradsekvationer"
$$
x^2 = a, \text{ där } a \geq 0, \text{ har lösningarna}
$$

$$
x = \pm\sqrt{a}
$$

Om $a < 0$ saknas (reella) lösningar.
:::

::: formel "Lösa enkla tredjegradsekvationer"
$$
x^3 = a, \text{ för alla } a, \text{ har lösningen}
$$

$$
x = \sqrt[3]{a}
$$
:::

::: exempel "Exempel 1 — Enkla andra- och tredjegradsekvationer"
**Lös<br>a) $x^2 = 64$&emsp;&emsp;b) $x^2 = 10$&emsp;&emsp;c) $x^2 = -9$&emsp;&emsp;d) $x^3 = 343$&emsp;&emsp;e) $x^3 = -27$&emsp;&emsp;f) $3x^2 - 2{,}31 = 17{,}97$**

**a)** Glöm inte den negativa lösningen:

$$
x = \pm\sqrt{64} = \pm 8
$$

**Svar:** $x = \pm 8$, alternativt $x_1 = 8$ och $x_2 = -8$

**b)** $x = \pm\sqrt{10}$. $\sqrt{10}$ är svår att beräkna med
huvudräkning. Vi slår det på räknaren: $x = \pm 3{,}162\ldots \approx \pm 3{,}16$

**Svar:** $x = \pm\sqrt{10}$ eller $x \approx \pm 3{,}16$

**c)** $x = \pm\sqrt{-9}$. Roten ur negativa tal saknar reella lösningar.

**Svar:** Saknar reella lösningar.

**d)** Tredjegradsekvationen har bara en lösning:

$$
x = \sqrt[3]{343} = 7
$$

**Svar:** $x = 7$

**e)** Tredjeroten ur ett negativt tal går utmärkt (minus gånger minus
gånger minus ger minus):

$$
x = \sqrt[3]{-27} = -3
$$

**Svar:** $x = -3$

**f)** Vi börjar med att lösa ut $x^2$. Därefter gör vi som vanligt.
Adderar 2,31 till båda led:

$$
3x^2 = 20{,}28
$$

Dividerar med 3 i båda led:

$$
x^2 = 6{,}76
$$

$$
x = \pm\sqrt{6{,}76} = \pm 2{,}6
$$

**Svar:** $x = \pm 2{,}6$
:::

::: exempel "Exempel 2 — Kvadraten och kuben"
**Bestäm sidan hos en<br>a) kvadrat med arean $4\,096\ \mathrm{cm^2}$&emsp;&emsp;b) kub med volymen $4\,096\ \mathrm{cm^3}$**

**a)** Kvadratens area $A$ ges av sidan · sidan. Vi kallar sidan $x$.
Detta ger $A = x \cdot x = x^2$. Se figur:

::: figur
<svg viewBox="14 4 102 102" width="102" height="102" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kvadrat med sidan x. Arean A är lika med x i kvadrat."><rect x="20" y="8" width="74" height="74" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.4"/><text x="57" y="50" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">A</tspan> = <tspan font-style="italic">x</tspan><tspan font-size="10" dy="-5">2</tspan></text><text x="102" y="50" font-size="14" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="57" y="98" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

Vi vet att arean är $4\,096\ \mathrm{cm^2}$, vilket ger

$$
x^2 = 4\,096
$$

$$
x = \pm\sqrt{4\,096} = \pm 64\ \mathrm{cm}
$$

Eftersom en sida inte kan vara negativ, så bortser vi från den negativa
lösningen.

**Svar:** 64 cm

**b)** Kubens volym $V$ ges av sidan · sidan · sidan. Vi kallar sidan $x$.
Detta ger $V = x \cdot x \cdot x = x^3$. Se figur:

::: figur
<svg viewBox="20 6 146 136" width="146" height="136" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kub med sidan x. Volymen V är lika med x upphöjt till 3."><polygon points="28,42 56,16 140,16 112,42" fill="#e3eef7" stroke="#1f2530" stroke-width="1.3"/><polygon points="112,42 140,16 140,96 112,122" fill="#bcd6ea" stroke="#1f2530" stroke-width="1.3"/><rect x="28" y="42" width="84" height="80" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.4"/><text x="70" y="86" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">V</tspan> = <tspan font-style="italic">x</tspan><tspan font-size="10" dy="-5">3</tspan></text><text x="148" y="60" font-size="14" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="126" y="118" font-size="14" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="70" y="134" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

Vi vet att volymen är $4\,096\ \mathrm{cm^3}$, vilket ger

$$
x^3 = 4\,096
$$

$$
x = \sqrt[3]{4\,096} = 16\ \mathrm{cm}
$$

**Svar:** 16 cm
:::

---
id: ma2c-4.4
title: Satser och bevis
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.4'
---

# Satser och bevis

Ett matematiskt bevis är ett logiskt resonemang som inte lämnar några
luckor. Några viktiga begrepp:

En grundsats som man kommit överens om att gälla som grund, utan att
den kräver ett bevis, kallas **axiom**. Exempel: *"Varje heltal $n$
följs av heltalet $(n + 1)$"* eller *"Från en given punkt är det
möjligt att dra en rät linje till en annan given punkt"*.

En överenskommelse om vad som menas med ett begrepp kallas
**definition**. Exempel: *"En månghörning med tre hörn kallas
triangel."*

Ett påstående som är bevisat kallar man för **sats**. I ett bevis måste
**varje steg** motiveras utifrån axiom, definitioner och/eller tidigare
kända satser.

Ett utfört bevis avslutas v.s.b. (**v**ilket **s**kulle **b**evisas)
eller v.s.v. (**v**ilket **s**kulle **v**isas).

::: formel "Udda och jämna tal vid bevis"
Ett jämnt tal kan alltid skrivas: $2k$

Ett udda tal kan alltid skrivas: $2k + 1$

där $k$ är ett heltal.
:::

::: formel "På varandra följande tal vid bevis"
Tal "som följer på varandra" är t.ex. 1, 2 och 3 eller 85, 86 och 87.
Tal som följer på varandra kan skrivas

$$
n, \quad n + 1, \quad n + 2, \quad \ldots
$$
:::

::: exempel "Exempel 1 — Yttervinkelsatsen"
**Betrakta nedanstående figur. Yttervinkelsatsen lyder: "Yttervinkeln
$x$ är lika med summan av de två motstående vinklarna $a$ och $c$, dvs.
$x = a + c$." Bevisa att yttervinkelsatsen gäller.**

::: figur
<svg viewBox="18 12 194 108" width="194" height="108" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel med vinklarna a i toppen, c nere till vänster och b nere till höger. Basen är förlängd åt höger så att yttervinkeln x bildas vid det högra hörnet."><polygon points="30,100 150,100 90,20" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="150" y1="100" x2="205" y2="100" stroke="#1f2530" stroke-width="1.8"/><path d="M 81.6,31.2 A 14 14 0 0 0 98.4,31.2" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="90" y="48" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><path d="M 46,100 A 16 16 0 0 0 39.6,87.2" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="54" y="96" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><path d="M 134,100 A 16 16 0 0 1 140.4,87.2" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="126" y="96" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><path d="M 168,100 A 18 18 0 0 0 139.2,85.6" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="164" y="78" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

Vi skriver upp de geometriska samband som vi ser och går sedan vidare.

$$
a + b + c = 180° \quad \text{(vinkelsumma i triangel)}
$$

$$
b + x = 180° \quad \text{(sidovinklar)}
$$

Eftersom båda VL (vänstra led) är lika med 180° gäller

$$
a + b + c = b + x
$$

Subtraherar $b$ från båda led:

$$
a + c = x
$$

det vill säga

$$
x = a + c
$$

v.s.b.
:::

::: exempel "Exempel 2 — Kvadraten av ett jämnt tal"
**Visa att kvadraten av ett jämnt tal alltid är delbar med 4.**

Vi kallar talet $x$. Eftersom talet är jämnt kan det skrivas $x = 2k$
där $k$ är ett heltal. Vi tecknar och undersöker kvadraten av detta
tal:

$$
x^2 = (2k)^2 = 4k^2
$$

$4k^2$ är alltid delbart med 4 ty

$$
\frac{4k^2}{4} = k^2
$$

där $k^2$ alltid är ett heltal. (Ordbok: "ty" = "därför att".)

v.s.v.
:::

::: exempel "Exempel 3 — Tre på varandra följande heltal"
**Visa att om $a$, $b$ och $c$ är tre på varandra följande heltal så
gäller att deras summa är delbar med 3.**

Eftersom det är på varandra följande heltal kan vi kalla talen $a$, $b$
och $c$ för $n$, $(n + 1)$ och $(n + 2)$. Detta ger

$$
a + b + c = n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)
$$

Denna summa är alltid delbar med 3 eftersom

$$
\frac{3(n + 1)}{3} = n + 1
$$

är ett heltal.

v.s.v.
:::

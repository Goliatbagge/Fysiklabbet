---
id: ma1c-1.6
title: Potenser med positiva heltalsexponenter
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.6'
---

# Potenser med positiva heltalsexponenter

På samma sätt som att $3 + 3 + 3 + 3 + 3$ kan skrivas $3 \cdot 5$, så kan
$3 \cdot 3 \cdot 3 \cdot 3 \cdot 3$ skrivas $3^5$ (utläses "3 upphöjt
till 5").

Man säger att $3^5$ är en **potens**. Delarna i en potens kallas för **bas**
(det man upphöjer) och **exponent** (det man upphöjer till). Så i exemplet
$3^5$ är basen 3 och exponenten 5.

::: figur
<svg viewBox="60 14 268 96" width="268" height="96" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Potensen 2 upphöjt till 3 i en rundad ruta. Etiketten potens pekar på hela rutan, etiketten exponent pekar på trean och etiketten bas pekar på tvåan."><rect x="126" y="40" width="52" height="48" rx="10" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="138" y="76" font-size="17" font-weight="600" fill="#1f2530">2</text><text x="158" y="58" font-size="13" font-weight="600" fill="#c8324a">3</text><text x="64" y="26" font-size="14" text-anchor="start" fill="#2563c9">Potens</text><line x1="112" y1="29" x2="127" y2="41" stroke="#2563c9" stroke-width="1.1"/><text x="324" y="34" font-size="14" text-anchor="end" fill="#c8324a">Exponent</text><line x1="256" y1="37" x2="172" y2="52" stroke="#c8324a" stroke-width="1.1"/><text x="324" y="100" font-size="14" text-anchor="end" fill="#4a7d3a">Bas</text><line x1="292" y1="95" x2="154" y2="79" stroke="#4a7d3a" stroke-width="1.1"/></svg>

Potensen består av en bas och en exponent.
:::

::: tips "Potensform och faktorform"
När ett tal skrivs

- som en **potens** (med bas och exponent) är det skrivet i **potensform**
- med sina **faktorer** (som en multiplikation) är det skrivet i
  **faktorform** eller **som en produkt**.

Exempel: $3^5$ är skrivet i potensform. $3 \cdot 3 \cdot 3 \cdot 3 \cdot 3$
är skrivet i faktorform.
:::

::: tips "Utläsningar"
En

- **tvåa** i exponenten kan även utläsas "i kvadrat", så $7^2$ kan utläsas
  "7 i kvadrat"
- **trea** i exponenten kan även utläsas "i kubik", så $7^3$ kan utläsas
  "7 i kubik".
:::

För att räkna med potenser ska vi använda **potenslagarna**.

::: formel "Potenslagarna"
| Potenslagar (generellt) | Potenslagar (exempel) |
| --- | --- |
| $a^x \cdot a^y = a^{x+y}$ | $7^2 \cdot 7^3 = 7^{2+3} = 7^5$ |
| $\dfrac{a^x}{a^y} = a^{x-y}$ | $\dfrac{7^5}{7^3} = 7^{5-3} = 7^2$ |
| $(a^x)^y = a^{x \cdot y}$ | $(7^2)^3 = 7^{2 \cdot 3} = 7^6$ |
| $\left(\dfrac{a}{b}\right)^{\!x} = \dfrac{a^x}{b^x}$ | $\left(\dfrac{5}{3}\right)^{\!2} = \dfrac{5^2}{3^2}$ |
| $(ab)^x = a^x \cdot b^x$ | $(3 \cdot 4)^2 = 3^2 \cdot 4^2$ |
:::

::: exempel "Exempel 1 — Tecken och potenser"
**Beräkna<br>a) $(-9)^2$&emsp;&emsp;b) $-9^2$**

**a)** Hela talet −9 är basen, så

$$
(-9)^2 = (-9) \cdot (-9) = 81
$$

(när två negativa tal multipliceras blir produkten positiv).

**Svar:** 81

**b)** Här är basen bara 9 — minustecknet står *utanför* potensen
(observera skillnaden jämfört med föregående uppgift):

$$
-9^2 = -9 \cdot 9 = -81
$$

**Svar:** −81
:::

::: exempel "Exempel 2 — Skriv som en potens"
**Skriv 64 som en potens med basen 4.**

Tänk "4 upphöjt till något ska bli 64", alternativt "hur många fyror ska
multipliceras för att produkten ska bli 64?".

Testar:

$$
4 \cdot 4 = 16 \quad \text{(för litet)}
$$

$$
4 \cdot 4 \cdot 4 = 16 \cdot 4 = 64 \quad \text{(stämmer!)}
$$

**Svar:** $4^3$
:::

::: exempel "Exempel 3 — Utveckla en parentes"
**Utveckla $(7x)^2$.**

*Alla faktorer* inne i parentesen ska upphöjas till 2:

$$
(7x)^2 = 7^2 \cdot x^2 = 49x^2
$$

**Svar:** $49x^2$
:::

::: exempel "Exempel 4 — Förenkla ett bråk med potenser"
**Förenkla $\dfrac{42x^5}{x^2}$.**

Vi använder potenslagen för division:

$$
\frac{42x^5}{x^2} = 42x^{5-2} = 42x^3
$$

**Svar:** $42x^3$
:::

::: exempel "Exempel 5 — Potensekvation med samma bas"
**Lös ekvationen $8^m \cdot 8^5 = 8^7$.**

Skriv om båda led som en enda potens av 8. Sedan kan man sätta exponenterna
lika och lösa ekvationen därifrån:

$$
8^m \cdot 8^5 = 8^7
$$

$$
8^{m+5} = 8^7
$$

Nu är båda led skrivna som en enda potens av 8. Då måste exponenterna vara
lika, så

$$
m + 5 = 7
$$

$$
m = 2
$$

**Svar:** $m = 2$
:::

::: exempel "Exempel 6 — Förenkla ett bråkuttryck med potenser"
**Förenkla $\dfrac{27^{5x}}{3^x + 3^x + 3^x}$.**

När vi ska förenkla bråkuttryck med potenser ska vi först sikta på att
skriva om både täljare och nämnare som *en* potens. Därefter skriver vi om
potenserna, så att de får samma bas. Därefter brukar det bli enkelt. Vi
börjar med att skriva om nämnaren som en multiplikation:

$$
\frac{27^{5x}}{3^x + 3^x + 3^x} = \frac{27^{5x}}{3 \cdot 3^x}
$$

Sedan skriver vi om nämnaren som *en* potens:

$$
\frac{27^{5x}}{3 \cdot 3^x} = \frac{27^{5x}}{3^1 \cdot 3^x} = \frac{27^{5x}}{3^{1+x}}
$$

Nu har vi en enda potens i både täljare och nämnare. Nu skriver vi om dem
med samma bas. Eftersom $27 = 3^3$ gäller

$$
\frac{27^{5x}}{3^{1+x}} = \frac{(3^3)^{5x}}{3^{1+x}} = \frac{3^{15x}}{3^{1+x}}
= 3^{15x - (1+x)} = 3^{15x - 1 - x} = 3^{14x - 1}
$$

**Svar:** $3^{14x-1}$
:::

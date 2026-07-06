---
id: ma1c-2.10
title: Potensekvationer
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.10'
---

# Potensekvationer

En ekvation där variabeln, t.ex. $x$, är en potens ("upphöjt till något")
kallas för **potensekvation**. Dessa kan lösas med två algebraiska metoder:
med potenslagar eller med rotuttryck.

::: formel "Lösa potensekvationer med potenslagar"
$$
x^n = a \text{ har lösningen}
$$

$$
x = a^{1/n}
$$
:::

::: härledning "Härledning — Lösa potensekvationer med potenslagar"
Vi utgår från den generella ekvationen

$$
x^n = a
$$

Vi upphöjer båda led till exponentens invers, i detta fall $\dfrac{1}{n}$:

$$
\left(x^n\right)^{1/n} = a^{1/n}
$$

$$
x^{n/n} = a^{1/n}
$$

$$
x^1 = a^{1/n}
$$

$$
x = a^{1/n}
$$

vsv.
:::

::: formel "Lösa potensekvationer med rötter"
$$
x^n = a \text{ har lösningen}
$$

$$
x = \sqrt[n]{a}
$$
:::

**OBS!** Om exponenten är **jämn** får ekvationen, i allmänhet, två
lösningar — en positiv och en negativ. Då ska ± placeras framför
rottecknet/lösningen. Om exponenten är **udda** får ekvationen en lösning
och inget ± ska placeras framför rottecknet/lösningen.

::: formel "Antal lösningar till en potensekvation"
En potensekvation $x^n = a$ med

- **jämn** exponent har två, en eller noll lösningar
- **udda** exponent har en lösning.
:::

::: exempel "Exempel 1 — Lös potensekvationerna"
**Lös ekvationerna och avrunda svaret till två decimaler.<br>a) $x^{14} = 80\,000$&emsp;&emsp;b) $3x^5 - 21 = 0$&emsp;&emsp;c) $x^{3,4} = 98$&emsp;&emsp;d) $x^{1/2} = 4$&emsp;&emsp;e) $x^{2/5} = 10$**

**a)** **Med potenslagar:**

$$
x^{14} = 80\,000
$$

$$
\left(x^{14}\right)^{1/14} = 80\,000^{1/14}
$$

$$
x = \pm 2{,}239\ldots \approx \pm 2{,}24
$$

**Med rotuttryck:**

$$
x = \pm\sqrt[14]{80\,000} = \pm 2{,}239\ldots \approx \pm 2{,}24
$$

(± eftersom exponenten 14 är jämn.)

**Svar:** $x \approx \pm 2{,}24$

**b)** Vi börjar med att lösa ut $x^5$:

$$
3x^5 - 21 = 0
$$

$$
3x^5 = 21
$$

$$
x^5 = 7
$$

Därefter löser vi ekvationen med potenslagar eller med rotuttryck:

$$
x = 7^{1/5} = \sqrt[5]{7} = 1{,}475\ldots \approx 1{,}48
$$

(Inget ± eftersom exponenten är udda.)

**Svar:** $x \approx 1{,}48$

**c)** Vi löser ekvationer med decimaltal i exponenten på motsvarande
sätt:

$$
x = \sqrt[3,4]{98} = 98^{1/3,4} = 3{,}851\ldots \approx 3{,}85
$$

**Svar:** $x \approx 3{,}85$

**d)** När vi har bråk i exponenten börjar vi med att få bort *nämnaren* i
exponenten genom att upphöja båda led till den, i det här fallet med 2:

$$
\left(x^{1/2}\right)^2 = 4^2
$$

$$
x = 16
$$

**Svar:** $x = 16$

**e)** Vi har återigen ett bråk i exponenten. Vi upphöjer båda led till
exponentens nämnare 5:

$$
\left(x^{2/5}\right)^5 = 10^5
$$

$$
x^2 = 100\,000
$$

Därefter löser vi ekvationen som vanligt:

$$
x = \pm\sqrt{100\,000} = \pm 316{,}227\ldots \approx \pm 316{,}23
$$

**Svar:** $x \approx \pm 316{,}23$
:::

::: exempel "Exempel 2 — Bestäm antalet lösningar"
**Bestäm antal lösningar till ekvationen<br>a) $x^{12} = 154$&emsp;&emsp;b) $x^4 = 0$&emsp;&emsp;c) $x^{100} = -50$&emsp;&emsp;d) $x^{99} = -5$**

**a)** Jämn exponent och positivt högerled:

$$
x = \pm\sqrt[12]{154}
$$

**Svar:** Två lösningar

**b)** Jämn exponent men högerledet är 0:

$$
x = \sqrt[4]{0} = 0
$$

**Svar:** En lösning

**c)** Jämn exponent och negativt högerled — $x^{100}$ kan aldrig bli
negativt:

**Svar:** Saknar lösningar

**d)** Potensekvationer med udda exponent har alltid en lösning.

**Svar:** En lösning
:::

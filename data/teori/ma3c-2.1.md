---
id: ma3c-2.1
title: Sekantens lutning
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.1'
---

# Sekantens lutning

En rät linje har samma lutning överallt. En kurvas lutning kan däremot
variera. En kurvas **medellutning** i ett visst intervall kan beräknas
genom att dra en rät linje mellan punkterna i intervallets ändpunkter. En
linje mellan två punkter på en kurva kallas **sekant**.

Sekantens lutning (**riktningskoefficient**, **ändringskvot** eller
**k-värde**) beräknas på samma sätt som för vilken rät linje som helst. Vi
läser av två punkter på linjen, $(x_1, y_1)$ och $(x_2, y_2)$, och sätter
in koordinaterna i formeln för riktningskoefficienten $k$.

::: formel "Riktningskoefficienten"
$$
k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$
:::

::: formel "Tolka sekantens lutning vid tillämpningar"
Vid tillämpningar står sekantens lutning för en **genomsnittlig
förändringshastighet**. Eftersom $k = \dfrac{\Delta y}{\Delta x}$ gäller
att enheten på sekantens lutning vid tillämpningar blir "enheten på
$y$-axeln" per "enheten på $x$-axeln".
:::

Vi tillämpar detta i två exempel.

::: exempel "Exempel 1 — Sekantens lutning som förändringshastighet"
**En granplanta har höjden $y$ dm efter $x$ år enligt diagrammet
nedan.<br>a) Beräkna sekantens lutning mellan $x = 0$ och $x = 2$.
&emsp;&emsp;b) Tolka svaret i a) med ord.**

::: figur
<svg viewBox="28 30 202 161" width="202" height="161" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Diagram som visar granplantans höjd y dm efter x år: en tillväxtkurva med en sekant genom punkterna där x lika med 0 och x lika med 2."><line x1="96" y1="170" x2="96" y2="45" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="152" y1="170" x2="152" y2="45" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="208" y1="170" x2="208" y2="45" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="142" x2="218" y2="142" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="114" x2="218" y2="114" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="86" x2="218" y2="86" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="58" x2="218" y2="58" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="170" x2="218" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="226,170 216,165.5 216,174.5" fill="#1f2530"/><line x1="40" y1="170" x2="40" y2="45" stroke="#1f2530" stroke-width="1.6"/><polygon points="40,37 35.5,47 44.5,47" fill="#1f2530"/><text x="224" y="158" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan> (år)</text><text x="48" y="44" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan> (dm)</text><text x="96" y="184" font-size="11" text-anchor="middle" fill="#1f2530">1</text><text x="152" y="184" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="208" y="184" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="32" y="146" font-size="11" text-anchor="end" fill="#1f2530">0,5</text><text x="32" y="118" font-size="11" text-anchor="end" fill="#1f2530">1</text><text x="32" y="90" font-size="11" text-anchor="end" fill="#1f2530">1,5</text><text x="32" y="62" font-size="11" text-anchor="end" fill="#1f2530">2</text><polyline points="40,170 45.6,152.3 54,142 68,130.4 96,114 124,101.4 152,90.8 180,81.5 208,73" fill="none" stroke="#2563c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="40" y1="170" x2="196" y2="59.7" stroke="#c8324a" stroke-width="2"/><circle cx="40" cy="170" r="3.5" fill="#c8324a"/><circle cx="152" cy="90.8" r="3.5" fill="#c8324a"/></svg>
:::

**a)** Vi drar en sekant mellan punkterna på grafen där $x = 0$ och
$x = 2$ och läser av deras koordinater: $(0, 0)$ och $(2; 1,4)$. Vi sätter
in koordinaterna i formeln för riktningskoefficienten $k$.

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{1,4 - 0}{2 - 0} = \frac{1,4}{2} = 0,7
$$

**Svar:** $k = 0,7$

**b)** Sekantens lutning står för hur mycket granen i genomsnitt har vuxit
per år under de två första åren. Enheten på $y$-axeln är dm och enheten
på $x$-axeln är år, så enheten på $k$-värdet blir dm per år.

**Svar:** Granen har i genomsnitt vuxit med $0{,}7\ \text{dm/år}$ de två
första åren.
:::

::: exempel "Exempel 2 — Ändringskvoten för en andragradsfunktion"
**Beräkna ändringskvoten mellan $x = 3$ och $x = 5$ för $f(x) = x^2$.**

Ändringskvoten är detsamma som sekantens lutning. Vi ställer upp formeln
för riktningskoefficienten och sätter in värden. Kom ihåg att
funktionsvärdet $f(x)$ står för en $y$-koordinat.

$$
k = \frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{f(5) - f(3)}{5 - 3} = \frac{5^2 - 3^2}{5 - 3} = \frac{25 - 9}{2} = \frac{16}{2} = 8
$$

**Svar:** $k = 8$
:::

---
id: ma3c-2.2
title: Tangentens lutning
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.2'
---

# Tangentens lutning

Om vi vill veta en kurvas lutning i en viss punkt kan vi rita en linje som
**snuddar** kurvan i just den punkten och beräkna lutningen på den linjen.
En linje som snuddar (eller tangerar) en kurva i en punkt kallas
**tangent**.

Tangentens lutning motsvarar alltså lutningen på kurvan i
tangeringspunkten.

::: figur
<svg viewBox="17 13 181 183" width="181" height="183" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kurva med en rät linje som tangerar kurvan i en punkt, markerad med en röd prick. Tangentlinjens lutning är densamma som kurvans lutning i den punkten."><line x1="20.5" y1="115" x2="184" y2="115" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,115 184,110.5 184,119.5" fill="#1f2530"/><line x1="64" y1="191.5" x2="64" y2="31" stroke="#1f2530" stroke-width="1.6"/><polygon points="64,21 59.5,31 68.5,31" fill="#1f2530"/><path d="M 34,40.4 Q 109,171.6 184,40.4" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="25" y1="28.8" x2="130" y2="183.2" stroke="#4a7d3a" stroke-width="2"/><circle cx="46" cy="59.7" r="3.5" fill="#c8324a"/><text x="192" y="133" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="74" y="26" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="176" y="30" font-size="13" text-anchor="end" fill="#2563c9"><tspan font-style="italic">f</tspan></text><text x="100" y="165" font-size="12" text-anchor="start" fill="#4a7d3a">Tangent</text></svg>
:::

Tangentens lutning beräknas, precis som sekantens, genom att läsa av två
punkter på linjen $(x_1, y_1)$ och $(x_2, y_2)$ och sätta in dem i formeln
för riktningskoefficienten $k$.

::: formel "Riktningskoefficienten"
$$
k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$
:::

::: formel "Tolka tangentens lutning vid tillämpningar"
Vid tillämpningar står tangentens lutning för **förändringshastigheten vid
en tidpunkt** (lutningen i en punkt). Eftersom lutningen
$k = \dfrac{\Delta y}{\Delta x}$ gäller att enheten på tangentens lutning
vid tillämpningar blir "enheten på $y$-axeln" per "enheten på $x$-axeln".
:::

::: exempel "Exempel 1 — Avläs tangentens lutning i en graf"
**En granplanta har höjden $y$ dm efter $x$ år enligt diagrammet nedan. Med
vilken hastighet växer granplantan efter 2 år?**

::: figur
<svg viewBox="8 10 182 122" width="182" height="122" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen visar en granplantas höjd y i decimeter efter x år: en stigande kurva med en tangentlinje som tangerar kurvan i punkten 2 semikolon 1 komma 4. Två punkter på tangenten, 0 semikolon 0 komma 7 och 2 semikolon 1 komma 4, är markerade."><line x1="19.5" y1="96.5" x2="175.3" y2="96.5" stroke="#1f2530" stroke-width="1.6"/><polygon points="185.3,96.5 175.3,92 175.3,101" fill="#1f2530"/><line x1="26.5" y1="105.3" x2="26.5" y2="24.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="26.5,14.8 22,24.8 31,24.8" fill="#1f2530"/><path d="M 26.5,78.1 Q 96.5,41.4 166.5,29.1" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="19.5" y1="74.4" x2="152.5" y2="27.9" stroke="#4a7d3a" stroke-width="2"/><circle cx="26.5" cy="72" r="3" fill="#c8324a"/><circle cx="96.5" cy="47.5" r="3" fill="#c8324a"/><text x="61.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">1</text><text x="96.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="131.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="166.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="18.5" y="65.5" font-size="11" text-anchor="end" fill="#1f2530">1</text><text x="18.5" y="30.5" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="183" y="124" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan> (år)</text><text x="36" y="22" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan> (dm)</text></svg>
:::

Vi ska ta reda på en förändringshastighet vid en tidpunkt. Vi slår en
tangent i punkten på kurvan där $x = 2$ och beräknar dess lutning.

Vi läser av två punkter på tangenten, t.ex. $(0;\ 0{,}7)$ och
$(2;\ 1{,}4)$, och sätter in dem i formeln för $k$.

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{1{,}4 - 0{,}7}{2 - 0} = \frac{0{,}7}{2} = 0{,}35\ \text{dm/år}
$$

**Svar:** Efter 2 år växer granplantan med $0{,}35$ dm per år.
:::

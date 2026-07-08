---
id: ma3c-6.8
title: Tillämpningar av triangelsatserna
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.8'
---

# Tillämpningar av triangelsatserna

Areasatsen, sinussatsen och cosinussatsen kallas tillsammans för
**triangelsatserna**. I det här avsnittet tillämpar vi dem för att lösa
problem — det viktigaste steget är att avgöra **vilken** sats som passar
till den information som är given.

::: formel "Kom ihåg — triangelsatserna"
I en triangel $ABC$ med sidorna $a$, $b$ och $c$ gäller

**Areasatsen**

$$
T = \frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2}
$$

**Sinussatsen**

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c} \qquad \text{alternativt} \qquad \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$

**Cosinussatsen**

$$
c^2 = a^2 + b^2 - 2ab\cos C \qquad b^2 = a^2 + c^2 - 2ac\cos B \qquad a^2 = b^2 + c^2 - 2bc\cos A
$$

Sidan $a$ är motstående sida till vinkel $A$, sidan $b$ är motstående sida
till vinkel $B$ och sidan $c$ är motstående sida till vinkel $C$.
:::

::: figur
<svg viewBox="-24 -27 230 241" width="230" height="241" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC. Sidan a ligger mitt emot vinkel A, sidan b mitt emot vinkel B och sidan c mitt emot vinkel C."><polygon points="49.82,0 0,185.92 180,185.92" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 44.12,21.25 A 22 22 0 0 0 62.44,18.02" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 5.69,164.67 A 22 22 0 0 1 22,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 167.38,167.9 A 22 22 0 0 0 158,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="46.87" y="-14.74" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-13.49" y="204.27" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="195.08" y="201.77" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="90" y="209.92" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="128.02" y="85.78" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="9.45" y="92.82" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

När vi löser ett problem är det viktigt att veta **vilken** sats som är
möjlig att använda utifrån vad som är känt i triangeln.

| Sats | Använd när ... |
| --- | --- |
| Areasatsen | två sidor och mellanliggande vinkel är kända |
| Sinussatsen | en sida och två vinklar är kända, eller två sidor och en icke-mellanliggande vinkel är kända |
| Cosinussatsen | två sidor och mellanliggande vinkel är kända, eller alla tre sidorna är kända (och ingen vinkel) |

I många tillämpningsproblem behöver vi dessutom använda satserna i **flera
trianglar efter varandra** — en storhet som beräknas i den ena triangeln
används sedan som känd information i nästa. Nästa exempel visar hur.

::: exempel "Exempel 1 — Bestäm en kulles höjd"
**En 11 meter hög flaggstång står på toppen av en kulle. Från en punkt $B$
på marken är höjdvinkeln till flaggstångens topp $32^\circ$, samtidigt som
höjdvinkeln till kullens topp är $25^\circ$. Hur hög är kullen?**

::: figur
<svg viewBox="10 -2 282 176" width="282" height="176" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En flaggstång på toppen av en kulle. Från en punkt B på marken är höjdvinkeln till flaggstångens topp A 32 grader och höjdvinkeln till kullens topp D 25 grader. Flaggstången AD är 11 meter. Kullens höjd ska bestämmas."><path d="M 20,150 Q 113.65,96.62 228.12,52.95 Q 242.82,106.33 270.12,150 Z" fill="#4a7d3a" fill-opacity="0.16" stroke="#4a7d3a" stroke-opacity="0.55" stroke-width="1.3"/><line x1="20" y1="150" x2="270.12" y2="150" stroke="#1f2530" stroke-width="1.8" stroke-linecap="butt"/><line x1="228.12" y1="52.95" x2="228.12" y2="150" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="butt"/><line x1="20" y1="150" x2="228.12" y2="52.95" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="butt"/><line x1="20" y1="150" x2="228.12" y2="19.95" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="butt"/><line x1="228.12" y1="52.95" x2="228.12" y2="19.95" stroke="#1f2530" stroke-width="2.4" stroke-linecap="butt"/><polygon points="228.12,19.95 244.12,24.95 228.12,29.95" fill="#c8324a"/><polyline points="216.12,150 216.12,138 228.12,138" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 30,150 A 10 10 0 0 0 29.06,145.77" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 60,150 A 40 40 0 0 0 53.92,128.8" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="51.41" y="143.89" font-size="12" text-anchor="middle" fill="#1f2530">25°</text><text x="79.6" y="132.91" font-size="12" text-anchor="middle" fill="#1f2530">32°</text><text x="238.12" y="40.45" font-size="13" text-anchor="start" fill="#1f2530">11</text><text x="20" y="168" font-size="14" text-anchor="middle" fill="#1f2530">B</text><text x="235.12" y="165" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="220.12" y="56.95" font-size="14" text-anchor="end" fill="#1f2530">D</text><text x="220.12" y="17.95" font-size="14" text-anchor="end" fill="#1f2530">A</text><text x="286" y="12" font-size="11" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

Låt $A$ vara flaggstångens topp, $D$ kullens topp (flaggstångens fot) och
$C$ foten av lodlinjen från $A$ och $D$ ner till marken, rakt under $B$
sett i höjdled. Vinkeln vid $C$ är rät.

Den enda kända **sidan** är $AD = 11$ m, och den tillhör triangeln $ABD$.
Vi börjar därför med att ta reda på två vinklar i den triangeln.

$$
\angle ABD = 32^\circ - 25^\circ = 7^\circ
$$

$$
\angle BAD = 180^\circ - 90^\circ - 32^\circ = 58^\circ \qquad \text{(vinkelsumman i } \triangle ABC \text{)}
$$

I triangeln $ABD$ känner vi nu en sida och två vinklar, så vi använder
sinussatsen för att bestämma sträckan $BD$.

$$
\frac{BD}{\sin 58^\circ} = \frac{11}{\sin 7^\circ} \iff BD = \frac{11\sin 58^\circ}{\sin 7^\circ} \approx 76{,}545\ldots \text{ m}
$$

I den rätvinkliga triangeln $BCD$ känner vi nu en vinkel ($25^\circ$) och
hypotenusan ($BD \approx 76{,}545$ m). Kullens höjd $CD$ är den motstående
kateten till vinkeln $25^\circ$, så vi bestämmer den med sinus.

$$
\sin 25^\circ = \frac{CD}{76{,}545\ldots} \iff CD = 76{,}545\ldots \cdot \sin 25^\circ \approx 32{,}349\ldots \approx 32 \text{ m}
$$

**Svar:** $CD \approx 32$ m
:::

---
id: ma3c-6.5
title: Areasatsen
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.5'
---

# Areasatsen

Med hjälp av sinusfunktionen kan vi beräkna arean $T$ för en triangel utan
att känna till höjden. Det enda vi behöver veta är två sidor och vinkeln
mellan dem — den **mellanliggande vinkeln**.

::: formel "Areasatsen"
I en triangel $ABC$ med sidorna $a$, $b$ och $c$ gäller

$$
T = \frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2}
$$

där $T$ är triangelns area.
:::

Vinkeln $C$ är mellanliggande vinkel till sidorna $a$ och $b$, eftersom det
är dessa två sidor som möts i hörn $C$. På samma sätt är vinkeln $B$
mellanliggande till sidorna $a$ och $c$, och vinkeln $A$ mellanliggande till
sidorna $b$ och $c$. Areasatsen fungerar alltså för trianglar där två sidor
och den mellanliggande vinkeln är kända.

::: härledning "Bevis — Areasatsen"
Låt $A$ vara den mellanliggande vinkeln till sidorna $b$ och $c$. Vi drar en
höjd $h$ från hörn $C$ ner till punkten $P$ på sidan $AB$, enligt figuren
nedan.

::: figur
<svg viewBox="-4 42 200 134" width="200" height="134" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En triangel ABC med en höjd h dragen från hörn C ner till punkten P på sidan AB, vilket bildar den rätvinkliga triangeln APC."><polygon points="20,150 170,150 77.36,68.08" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="77.36" y1="68.08" x2="77.36" y2="150" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><polyline points="65.36,150 65.36,138 77.36,138" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="10" y="166" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="180" y="166" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="77.36" y="58.08" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">C</tspan></text><text x="77.36" y="166" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">P</tspan></text><text x="37.21" y="101.01" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="132.96" y="98.55" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="87.36" y="109.04" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">h</tspan></text></svg>
:::

Triangeln $APC$ är rätvinklig, med den räta vinkeln i $P$. Vi uttrycker
höjden $h$ med hjälp av sinus för vinkeln $A$:

$$
\sin A = \frac{h}{b} \quad\iff\quad h = b\sin A \qquad (1)
$$

Arean $T$ för en triangel ges av basen gånger höjden genom två:

$$
T = \frac{\text{basen} \cdot \text{höjden}}{2} = \frac{c \cdot h}{2}
$$

Insättning av $h = b\sin A$ från (1) ger

$$
T = \frac{c \cdot b\sin A}{2} = \frac{bc\sin A}{2} \qquad \text{v.s.b.}
$$

På motsvarande sätt bevisas de två övriga formlerna, $T = \dfrac{ab\sin C}{2}$
och $T = \dfrac{ac\sin B}{2}$, genom att i stället dra höjden från hörn $A$
respektive hörn $B$.
:::

::: exempel "Exempel 1 — Beräkna arean av en triangel"
**Beräkna arean av triangeln nedan.**

::: figur
<svg viewBox="10 8 190 210" width="190" height="210" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En triangel ABC där vinkeln A är 80 grader, sidan AC är 11 centimeter och sidan AB är 8 centimeter."><polygon points="60,190 172,190 86.74,38.34" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 82,190 A 22 22 0 0 0 63.82,168.33" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="88.34" y="166.22" font-size="13" text-anchor="middle" fill="#1f2530">80°</text><text x="116" y="208" font-size="13" text-anchor="middle" fill="#1f2530">8 cm</text><text x="59.58" y="111.74" font-size="13" text-anchor="end" fill="#1f2530">11 cm</text><text x="50" y="206" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="182" y="206" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="86.74" y="26.34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">C</tspan></text></svg>
:::

Den enda kända vinkeln är $A = 80^\circ$. Den är mellanliggande vinkel till
sidorna $11$ cm och $8$ cm (sidan mitt emot $A$ behövs inte). Insättning i
areasatsen ger

$$
T = \frac{bc\sin A}{2} = \frac{11 \cdot 8\sin 80^\circ}{2} \approx 43{,}331\ldots\ \text{cm}^2 \approx 43{,}3\ \text{cm}^2
$$

**Svar:** $T \approx 43{,}3\ \text{cm}^2$
:::

::: exempel "Exempel 2 — Bestäm en mellanliggande vinkel"
**En triangel har arean $10$ cm². En sida är $4{,}0$ cm och en annan är
$12{,}0$ cm. Bestäm den mellanliggande vinkeln till dessa sidor.**

Vi ställer upp areasatsen $T = \dfrac{ab\sin C}{2}$ med $T = 10$ cm²,
$a = 4{,}0$ cm och $b = 12{,}0$ cm, och löser sedan ut $\sin C$.

$$
10 = \frac{4{,}0 \cdot 12{,}0 \cdot \sin C}{2} \quad\iff\quad \sin C = \frac{2 \cdot 10}{4{,}0 \cdot 12{,}0} = 0{,}416\ldots
$$

$$
C_1 = \sin^{-1}(0{,}416\ldots) \approx 24{,}624\ldots^\circ \approx 25^\circ
$$

$$
C_2 = 180^\circ - C_1 \approx 180^\circ - 25^\circ = 155^\circ
$$

**Svar:** $C \approx 25^\circ$ eller $C \approx 155^\circ$

Observera att **båda** vinklarna ger giltiga trianglar — se figuren nedan.
Till skillnad från när vi bestämmer vinklar med sinussatsen (nästa avsnitt),
där vinkelsumman ibland utesluter en av lösningarna, finns här inget sådant
villkor: arean och två sidor bestämmer inte triangeln entydigt.

::: figur
<svg viewBox="-2 -4 320 94" width="320" height="94" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två trianglar med sidorna 4,0 och 12,0 centimeter. I den vänstra är den mellanliggande vinkeln 25 grader, i den högra 155 grader — båda ger samma area."><polygon points="6,62 46,62 114.76,11.29" fill="none" stroke="#1f2530" stroke-width="1.6"/><path d="M 26,62 A 20 20 0 0 0 24.13,53.55" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="54.82" y="51.18" font-size="12.5" text-anchor="middle" fill="#1f2530">25°</text><text x="26" y="80" font-size="12" text-anchor="middle" fill="#1f2530">4,0 cm</text><text x="51.93" y="18.51" font-size="12" text-anchor="end" fill="#1f2530">12,0 cm</text><polygon points="186,62 306,62 149.75,45.10" fill="none" stroke="#1f2530" stroke-width="1.6"/><path d="M 206,62 A 20 20 0 0 0 167.87,53.55" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="196.82" y="13.18" font-size="12.5" text-anchor="middle" fill="#1f2530">155°</text><text x="246" y="80" font-size="12" text-anchor="middle" fill="#1f2530">12,0 cm</text><text x="167.87" y="31.55" font-size="12" text-anchor="middle" fill="#1f2530">4,0 cm</text></svg>
:::
:::

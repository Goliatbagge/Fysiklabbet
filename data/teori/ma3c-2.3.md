---
id: ma3c-2.3
title: Derivatans definition
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.3'
---

# Derivatans definition

Tangentens lutning i en punkt kallas **derivata**. Ska vi bestämma
derivatan för en funktion $f(x)$ i punkten där $x = a$ skriver vi $f'(a)$,
vilket utläses "$f$ prim av $a$".

Vi har tidigare konstaterat att en kurvas medellutning över ett intervall
kan beräknas exakt med sekantens lutning. Men hur kan vi bestämma
lutningen exakt i en enda punkt — alltså tangentens lutning?

Vi ritar upp en godtycklig funktion $f(x)$ och vill bestämma lutningen
exakt i punkten med $x$-koordinaten $a$. Vi drar en sekant där den andra
punkten ligger på avståndet $h$ i sidled från den första punkten.
$x$-koordinaten för den andra punkten är då $a + h$. Se figuren nedan.

::: figur
<svg viewBox="20 0 256 200" width="374" height="292" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en godtycklig funktion f av x med en sekant genom punkterna a, f av a och a plus h, f av a plus h. Avståndet mellan punkterna i sidled är h."><line x1="45" y1="175" x2="260" y2="175" stroke="#1f2530" stroke-width="1.6"/><polygon points="270,175 260,170.5 260,179.5" fill="#1f2530"/><line x1="60" y1="188" x2="60" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="60,4 55.5,14 64.5,14" fill="#1f2530"/><text x="265" y="192" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="68" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 60,166.9 C 61.83,166.13 67.33,163.63 71,162.3 C 74.67,160.97 78.33,159.85 82,158.9 C 85.67,157.95 89.33,157.25 93,156.6 C 96.67,155.95 100.33,155.47 104,155 C 107.67,154.53 111.33,154.18 115,153.8 C 118.67,153.42 122.33,153.1 126,152.7 C 129.67,152.3 133.33,151.92 137,151.4 C 140.67,150.88 144.33,150.33 148,149.6 C 151.67,148.87 155.33,148.05 159,147 C 162.67,145.95 166.33,144.78 170,143.3 C 173.67,141.82 177.33,140.1 181,138.1 C 184.67,136.1 188.33,133.92 192,131.3 C 195.67,128.68 199.33,125.75 203,122.4 C 206.67,119.05 210.33,115.38 214,111.2 C 217.67,107.02 221.33,102.42 225,97.3 C 228.67,92.18 232.33,86.63 236,80.5 C 239.67,74.37 243.33,67.77 247,60.5 C 250.67,53.23 256.17,40.83 258,36.9" fill="none" stroke="#2563c9" stroke-width="2"/><text x="256" y="20" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="67" y1="162.7" x2="192" y2="131.3" stroke="#4a7d3a" stroke-width="1.8"/><text x="108" y="145" font-size="12" text-anchor="middle" fill="#1f2530">sekant</text><line x1="82" y1="175" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="192" y1="175" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="158.9" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="131.3" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="82" cy="158.9" r="3" fill="#2563c9"/><circle cx="192" cy="131.3" r="3" fill="#2563c9"/><line x1="82" y1="169" x2="192" y2="169" stroke="#1f2530" stroke-width="1.3"/><line x1="82" y1="165" x2="82" y2="173" stroke="#1f2530" stroke-width="1.3"/><line x1="192" y1="165" x2="192" y2="173" stroke="#1f2530" stroke-width="1.3"/><text x="137" y="163" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">h</tspan></text><text x="82" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="192" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan></text><text x="26" y="162.9" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>)</text><text x="26" y="135.3" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan>)</text></svg>
:::

De två punkterna $(x_1, y_1)$ och $(x_2, y_2)$ på sekanten är alltså
$(a, f(a))$ och $(a + h, f(a + h))$.

Sekantens lutning kan då beräknas enligt

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(a+h) - f(a)}{(a+h) - a} = \frac{f(a+h) - f(a)}{h}
$$

Om vi låter avståndet $h$ mellan punkterna minska och gå mot 0 kommer
sekanten att övergå till en tangent. Lutningen i punkten — derivatan —
får vi alltså genom att beräkna ett gränsvärde då $h$ går mot 0. Detta är
derivatans definition!

::: formel "Derivatans definition"
$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
\qquad \text{eller} \qquad
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$
:::

::: tips "Steg för steg"
1. Ställ upp derivatans definition med funktionen $f$ (och eventuellt en
   given punkt $a$).
2. Förenkla täljaren och **faktorisera bort** $h$ ur täljare och nämnare —
   annars går det inte att sätta $h = 0$ (det ger division med 0).
3. Sätt nu $h = 0$ och beräkna gränsvärdet.
:::

::: exempel "Exempel 1 — Derivatans definition"
**Funktionen $f(x) = x^2$ är given. Bestäm<br>
a) $f'(5)$<br>b) tangentens lutning då $x = 5$.**

**a)** Vi ställer upp derivatans definition, sätter därefter $a = 5$ och
förenklar.

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
$$

$$
f'(5) = \lim_{h \to 0} \frac{f(5+h) - f(5)}{h} = \lim_{h \to 0} \frac{(5+h)^2 - 5^2}{h} = \lim_{h \to 0} \frac{25 + 10h + h^2 - 25}{h} = \lim_{h \to 0} \frac{10h + h^2}{h}
$$

Vi kan inte sätta $h = 0$ direkt eftersom vi då får en division med 0. Vi
faktoriserar täljaren och förkortar bort $h$.

$$
f'(5) = \lim_{h \to 0} \frac{h(10 + h)}{h} = \lim_{h \to 0} (10 + h)
$$

Nu är nämnaren borta, så vi kan sätta $h = 0$ och beräkna gränsvärdet.

$$
f'(5) = \lim_{h \to 0} (10 + h) = 10 + 0 = 10
$$

**Svar:** $f'(5) = 10$

**b)** Tangentens lutning då $x = 5$ är samma sak som derivatan $f'(5)$.
Svaret är alltså detsamma som i a).

**Svar:** Tangentens lutning då $x = 5$ är $10$.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Derivata"
- **Derivatan** är tangentens lutning i en punkt, alltså kurvans lutning där.
- Derivatan av $f(x)$ i punkten $x = a$ skrivs $f'(a)$ och utläses "$f$ prim av $a$".
:::

::: sampunkt "Från sekant till tangent"
- Lägg den andra punkten på avståndet $h$ i sidled, alltså i $(a + h,\ f(a+h))$.
- Sekantens lutning blir $\dfrac{f(a+h) - f(a)}{h}$.
- Låter man $h$ gå mot 0 övergår sekanten i tangenten.
:::

::: sampunkt "Derivatans definition"
- $f'(a) = \lim_{h \to 0} \dfrac{f(a+h) - f(a)}{h}$.
- Skrivs allmänt $f'(x) = \lim_{h \to 0} \dfrac{f(x+h) - f(x)}{h}$.
:::

::: sampunkt "Steg för steg"
1. Ställ upp definitionen med funktionen och den givna punkten.
2. Förenkla täljaren och **faktorisera bort $h$**. Utan det blir det division med 0.
3. Sätt $h = 0$ och beräkna gränsvärdet.
- För $f(x) = x^2$: $\dfrac{10h + h^2}{h} = 10 + h$, alltså $f'(5) = 10$.
:::

:::

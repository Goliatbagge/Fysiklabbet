---
id: ma1c-4.6
title: Parallella och vertikala linjer samt räta linjens ekvation i allmän form
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.6'
---

# Parallella och vertikala linjer samt räta linjens ekvation i allmän form

## Parallella och vertikala linjer

Om två linjer har samma lutning kallas de **parallella**. Parallella
linjer har alltså *samma k-värde*.

En linje som är lodrät kallas **vertikal**. Vertikala linjer kan inte
beskrivas med räta linjens ekvation i k-form, utan beskrivs utifrån var
den ligger i x-led.

::: formel "Vertikala linjens ekvation"
$$
x = a
$$

där $a$ är linjens läge i x-led.
:::

## Räta linjens ekvation i allmän form

*Alla* räta linjer kan beskrivas med **räta linjens ekvation i allmän
form**. I allmän form samlas alla termer i linjens ekvation i ena ledet
och det andra ledet blir då 0.

::: formel "Räta linjens ekvation i allmän form"
$$
ax + by + c = 0
$$

där $a$, $b$ och $c$ är konstanter.
:::

::: exempel "Exempel 1 — Parallell linje och allmän form"
**En linje beskrivs av $y = 3x - 5$. Ange ekvationen för<br>a) en parallell
linje som går genom (1, 2)&emsp;&emsp;b) linjen i allmän form.**

**a)** Linjens $k$-värde är 3. Den parallella linjen ska alltså ha samma
$k$-värde. Insättning av $k = 3$ i RLE i k-form ger

$$
y = 3x + m
$$

Att (1, 2) ligger på linjen ger

$$
2 = 3 \cdot 1 + m
$$

$$
2 = 3 + m
$$

Subtraherar 3 från båda led:

$$
2 - 3 = 3 + m - 3
$$

$$
-1 = m
$$

Insättning av $k = 3$ och $m = -1$ i RLE ger $y = 3x - 1$.

**Svar:** $y = 3x - 1$

**b)** Vi har ekvationen $y = 3x - 5$. Vi samlar alla termer på ena sidan
genom att subtrahera $y$ från båda led:

$$
y - y = 3x - 5 - y
$$

$$
0 = 3x - 5 - y
$$

Vi skiftar VL och HL och sorterar termerna i "bokstavsordning".

**Svar:** $3x - y - 5 = 0$
:::

::: exempel "Exempel 2 — k-värde ur allmän form"
**Ange $k$-värdet för linjen som beskrivs av $2x + 3y - 6 = 0$.**

Vi skriver om ekvationen till k-form genom att *lösa ut y*, för att
därefter identifiera $k$-värdet:

$$
2x + 3y - 6 = 0
$$

Vi börjar med att eliminera termerna $2x$ och $-6$ från VL:

$$
2x + 3y - 6 - 2x + 6 = 0 - 2x + 6
$$

$$
3y = -2x + 6
$$

Vi dividerar båda led med 3:

$$
\frac{3y}{3} = \frac{-2x}{3} + \frac{6}{3}
$$

$$
y = -\frac{2}{3}x + 2
$$

och vi ser nu lätt att $k = -\dfrac{2}{3}$.

**Svar:** $k = -\dfrac{2}{3}$
:::

::: exempel "Exempel 3 — Vertikal linje"
**Ange ekvationen för linjen nedan.**

::: figur
<svg viewBox="-26 -20 279 201" width="279" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med en lodrät grön linje vid x lika med 3."><line x1="3.0" y1="0.0" x2="3.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="33.0" y1="0.0" x2="33.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="63.0" y1="0.0" x2="63.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.0" y1="0.0" x2="93.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="123.0" y1="0.0" x2="123.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="153.0" y1="0.0" x2="153.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="183.0" y1="0.0" x2="183.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="213.0" y1="0.0" x2="213.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="156.8" x2="231.0" y2="156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="128.8" x2="231.0" y2="128.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="100.8" x2="231.0" y2="100.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="72.8" x2="231.0" y2="72.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="44.8" x2="231.0" y2="44.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="16.8" x2="231.0" y2="16.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="156.8" x2="239.0" y2="156.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="247.0,156.8 237.0,152.3 237.0,161.3" fill="#1f2530"/><line x1="33.0" y1="156.8" x2="33.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="33.0,-16.0 28.5,-6.0 37.5,-6.0" fill="#1f2530"/><text x="245.0" y="174.8" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="42.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="3.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="63.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="93.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="123.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="153.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="183.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="213.0" y="172.8" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="27.0" y="132.8" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="27.0" y="104.8" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="27.0" y="76.8" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="27.0" y="48.8" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="27.0" y="20.8" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="123.0" y1="156.8" x2="123.0" y2="5.6" stroke="#4a7d3a" stroke-width="2"/></svg>
:::

Vi har en vertikal linje vid $x = 3$.

**Svar:** $x = 3$
:::

---
id: ma2c-6.1
title: Lägesmått
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.1'
---

# Lägesmått

Ett sammanfattande värde för ett statistiskt material kallas
**lägesmått**. De vanligaste lägesmåtten är medelvärde, median och
typvärde.

**Medelvärde:** Det vanligaste lägesmåttet. Beräknas som summan
dividerat med antalet. Lämpligt att använda i de flesta fall.

**Median:** Värdet i mitten när de står i storleksordning. Om två
värden är i mitten är medianen medelvärdet av dessa. Lämpligt vid sned
fördelning, dvs. när enstaka värden sticker ut.

**Typvärde:** Det värde som förekommer flest gånger. Kan användas även
när datamängden inte är tal, t.ex. färger eller bilmärken.

Antalet av ett visst värde kallas **frekvens**. Om t.ex. antalet
17-åringar i ett klassrum är 12 är 17-åringarnas frekvens 12.

::: exempel "Exempel 1 — Tre lägesmått"
**Åldern på personerna i ett klassrum är 16, 17, 61, 16, 16, 18 och 17
år. Bestäm<br>a) medelvärdet&emsp;&emsp;b) medianen&emsp;&emsp;c) typvärdet**

**a)**

$$
\text{medelvärdet} = \frac{\text{summan}}{\text{antalet}} = \frac{16 + 17 + 61 + 16 + 16 + 18 + 17}{7} = \frac{161}{7} = 23
$$

**Svar:** 23 år

**b)** Vi sorterar åldrarna i storleksordning, t.ex. minst först, och
läser av talet i mitten:

$$
16,\ 16,\ 16,\ \mathbf{17},\ 17,\ 18,\ 61
$$

**Svar:** 17 år

**c)** Det är flest 16-åringar (3 stycken). 16 är alltså den vanligast
förekommande åldern.

**Svar:** 16 år
:::

::: exempel "Exempel 2 — Vilket lägesmått är lämpligast?"
**Vilket lägesmått är lämpligast att använda i exemplet ovan:
medelvärde eller median?**

Det beror på sammanhanget, men eftersom vi har ett utstickande värde
(61-åringen) som drar upp medelvärdet till 23 år, så blir inte
medelvärdet särskilt representativt för personerna i rummet (det finns
ju inte en enda 20-åring där). Alltså kan medianen vara att föredra i
detta fall.

**Svar:** Medianen
:::

## Klasser och histogram

I viss statistik har vi inte exakta värden utan indelning i intervall,
i så kallade **klasser**. Sådana klasser kan redovisas antingen i
tabellform eller i diagramform som ett **histogram** med
sammanhängande staplar. I dessa fall räknar man med att alla värden i
en klass har värdet i mitten av intervallet, vilket kallas
**klassmitt**. Klassen $300 \leq x < 400$ har t.ex. klassmitten 350.

::: exempel "Exempel 3 — Medelvärde ur klassindelat material"
**Åldern hos personerna i ett rum åskådliggörs i en tabell med
intervall och i ett histogram. Beräkna medelåldern.**

| Ålder (år) | Frekvens |
| --- | --- |
| $20 \leq x < 30$ | 2 |
| $30 \leq x < 40$ | 4 |
| $40 \leq x < 50$ | 4 |
| $50 \leq x < 60$ | 5 |
| $60 \leq x < 70$ | 3 |
| $70 \leq x < 80$ | 1 |
| $80 \leq x < 90$ | 0 |
| $90 \leq x < 100$ | 1 |

::: figur
<svg viewBox="-16 0 240 184" width="240" height="184" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett histogram över åldrar med staplar för varje tioårsklass: högst är klassen 50 till 60 år med frekvensen 5."><rect x="20" y="102" width="22" height="48" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="42" y="54" width="22" height="96" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="64" y="54" width="22" height="96" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="86" y="30" width="22" height="120" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="108" y="78" width="22" height="72" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="130" y="126" width="22" height="24" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><rect x="174" y="126" width="22" height="24" fill="#8fb8d8" stroke="#1f2530" stroke-width="1"/><line x1="12" y1="150" x2="208" y2="150" stroke="#1f2530" stroke-width="1.6"/><polygon points="216,150 206,145.5 206,154.5" fill="#1f2530"/><line x1="14" y1="158" x2="14" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="14,6 9.5,16 18.5,16" fill="#1f2530"/><text x="20" y="164" font-size="9" text-anchor="middle" fill="#1f2530">20</text><text x="42" y="164" font-size="9" text-anchor="middle" fill="#1f2530">30</text><text x="64" y="164" font-size="9" text-anchor="middle" fill="#1f2530">40</text><text x="86" y="164" font-size="9" text-anchor="middle" fill="#1f2530">50</text><text x="108" y="164" font-size="9" text-anchor="middle" fill="#1f2530">60</text><text x="130" y="164" font-size="9" text-anchor="middle" fill="#1f2530">70</text><text x="152" y="164" font-size="9" text-anchor="middle" fill="#1f2530">80</text><text x="174" y="164" font-size="9" text-anchor="middle" fill="#1f2530">90</text><text x="196" y="164" font-size="9" text-anchor="middle" fill="#1f2530">100</text><text x="8" y="129" font-size="9" text-anchor="end" fill="#1f2530">1</text><text x="8" y="105" font-size="9" text-anchor="end" fill="#1f2530">2</text><text x="8" y="81" font-size="9" text-anchor="end" fill="#1f2530">3</text><text x="8" y="57" font-size="9" text-anchor="end" fill="#1f2530">4</text><text x="8" y="33" font-size="9" text-anchor="end" fill="#1f2530">5</text><text x="22" y="12" font-size="11" text-anchor="start" fill="#1f2530">frekvens</text><text x="214" y="180" font-size="11" text-anchor="end" fill="#1f2530">ålder (år)</text></svg>
:::

Intervallet $20 \leq x < 30$ har klassmitten 25 (vi räknar som att alla
i intervallet har åldern 25 år), intervallet $30 \leq x < 40$ har
klassmitten 35 (vi räknar som att alla i intervallet har åldern 35 år)
och så vidare.

Detta ger oss

$$
\text{medelvärdet} = \frac{\text{summan}}{\text{antalet}}
$$

$$
= \frac{2 \cdot 25 + 4 \cdot 35 + 4 \cdot 45 + 5 \cdot 55 + 3 \cdot 65 + 1 \cdot 75 + 0 \cdot 85 + 1 \cdot 95}{2 + 4 + 4 + 5 + 3 + 1 + 0 + 1} = \frac{1\,010}{20} = 50{,}5\ \text{år}
$$

**Svar:** 50,5 år
:::

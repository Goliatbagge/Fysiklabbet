---
id: ma1c-3.1
title: Procent, promille och ppm
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.1'
---

# Procent, promille och ppm

Hundradelar kallas **procent**. Tusendelar kallas **promille**. Miljondelar
kallas **ppm** (parts per million). Dessa används för att ange andelar.

::: formel "Procent, promille och ppm"
| "Procentform" | Bråkform | Decimalform |
| --- | --- | --- |
| 1 % | $\dfrac{1}{100}$ | 0,01 |
| 1 ‰ | $\dfrac{1}{1\,000}$ | 0,001 |
| 1 ppm | $\dfrac{1}{1\,000\,000}$ | 0,000 001 |
:::

Vid beräkningar används promille och ppm på samma sätt som procent.

::: formel "Beräkna andel"
$$
\text{andel} = \frac{\text{delen}}{\text{hela}}
$$

**OBS!** Andelen anges i bråkform eller decimalform.
:::

För att bestämma delen eller det hela, så löser vi ut det från formeln
ovan.

::: exempel "Exempel 1 — Bestäm andelen"
**Hur många promille är 120 g av 15 kg?**

Det frågas efter *andelen*. För att vi ska få korrekt andel krävs att vi
har samma enhet på delen och det hela. Vi gör om t.ex. 15 kg till gram och
får $15\ \mathrm{kg} = 15\,000\ \mathrm{g}$. Så delen = 120 g och
hela = 15 000 g. Vi sätter in i formeln för andelen och får

$$
\text{andel} = \frac{120}{15\,000} = \frac{1}{125} = 0{,}008
$$

För att göra om från decimalform till promille ska vi multiplicera med
1 000 (‰ = *tusen*delar):

$$
0{,}008 = 0{,}008 \cdot 1\,000\ \text{‰} = 8\ \text{‰}
$$

**Svar:** 8 ‰
:::

::: exempel "Exempel 2 — Bestäm delen"
**Vad är 3,5 ‰ av 32 000 kr?**

Det frågas efter *delen*. Vi löser ut delen från formeln för andelen och
får

$$
\text{andel} = \frac{\text{delen}}{\text{hela}}
\quad\Longleftrightarrow\quad
\text{delen} = \text{andel} \cdot \text{hela} \quad (1)
$$

Kom ihåg att andelen ska anges i decimal- eller bråkform:

$$
\text{andel} = 3{,}5\ \text{‰} = \frac{3{,}5}{1\,000} = 0{,}0035
$$

Insättning av andel = 0,0035 och hela = 32 000 kr i formel (1) ovan ger

$$
\text{delen} = 0{,}0035 \cdot 32\,000\ \mathrm{kr} = 112\ \mathrm{kr}
$$

**Svar:** 112 kr
:::

::: exempel "Exempel 3 — Bestäm det hela"
**Koncentrationen av ett visst ämne i havsvatten är 5 ppm. Hur mycket
vatten behövs för att samla in 30 gram av ämnet?**

Det frågas efter det *hela*. Vi löser ut det hela från formeln för andelen
och får

$$
\text{andel} = \frac{\text{delen}}{\text{hela}}
\quad\Longleftrightarrow\quad
\text{hela} = \frac{\text{delen}}{\text{andelen}}
$$

Insättning av delen = 30 gram och andelen
$= 5\ \text{ppm} = \frac{5}{1\,000\,000} = 0{,}000\,005$ ger

$$
\text{hela} = \frac{30\ \text{gram}}{0{,}000\,005}
= 6\,000\,000\ \text{gram} = 6\,000\ \mathrm{kg} = 6\ \text{ton}
$$

**Svar:** 6 ton
:::

::: härledning "Hjälpmedel — Procenttriangeln"
Vissa tycker att procenttriangeln är en bra hjälp vid procenträkning. Den
fungerar även utmärkt för promille och ppm. Täck över den storhet du söker,
så visar triangeln formeln: står de kvarvarande storheterna bredvid
varandra ska de multipliceras, står de över varandra ska de divideras.

::: figur
<svg viewBox="16 6 288 152" width="288" height="152" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Procenttriangeln: en triangel med ordet delen i toppen och orden andelen gånger hela i botten, åtskilda av ett vågrätt streck. Delen är lika med andelen gånger hela, andelen är delen genom hela och hela är delen genom andelen."><polygon points="160,10 20,150 300,150" fill="#fdfaf3" stroke="#1f2530" stroke-width="1.5"/><line x1="75" y1="95" x2="245" y2="95" stroke="#1f2530" stroke-width="1.5"/><text x="160" y="72" font-size="16" font-weight="600" text-anchor="middle" fill="#1f2530">delen</text><text x="160" y="132" font-size="16" font-weight="600" text-anchor="middle" fill="#1f2530">andelen · hela</text></svg>

Triangeln sammanfattar: delen = andelen · hela,
andelen = delen/hela och hela = delen/andelen.
:::

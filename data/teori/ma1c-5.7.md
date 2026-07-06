---
id: ma1c-5.7
title: Träddiagram
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.7'
---

# Träddiagram

Om vi ska beräkna sannolikheten för en kombination där sannolikheterna
för de enskilda utfallen är olika kan detta göras med ett diagram som
byggs upp av grenar, ett så kallat **träddiagram**. För att beräkna
sannolikheten för en kombination, multiplicerar vi bara sannolikheterna
längs med den grenen.

::: exempel "Exempel 1 — Strumporna i lådan"
**I en låda ligger 7 svarta och 3 vita strumpor. Du drar två strumpor
efter varandra. Vad är sannolikheten att du<br>
a) med återläggning drar två svarta strumpor?<br>
b) utan återläggning drar två svarta strumpor?<br>
c) utan återläggning drar en svart och en vit strumpa (ordningen
oviktig)?**

**a)** Vi börjar med att rita upp träddiagrammet och skriver
sannolikheterna vid varje gren. *Med återläggning* ändras inte
sannolikheterna för varje utfall:

::: figur
<svg viewBox="14 24 392 142" width="392" height="142" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Träddiagram med två nivåer. Första dragningen: svart med sannolikhet 7 tiondelar eller vit med 3 tiondelar. Andra dragningen har samma sannolikheter eftersom strumpan läggs tillbaka."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text></svg>
:::

Vi ringar in alla kombinationer som ger två svarta strumpor (endast en
kombination):

::: figur
<svg viewBox="14 24 392 142" width="392" height="142" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma träddiagram där kombinationen svart följt av svart är inringad."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><ellipse cx="52" cy="148" rx="29" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text></svg>
:::

Vi multiplicerar sannolikheterna längs med den grenen och får

$$
P(\text{två svart}) = \frac{7}{10} \cdot \frac{7}{10} = \frac{49}{100} = 0{,}49 = 49\ \%
$$

**Svar:** 49 %

**b)** Vi ritar återigen upp ett träddiagram. *Utan återläggning* ändras
sannolikheterna för varje utfall. Om vi skulle dra en svart strumpa
första gången kommer det att finnas kvar 6 svarta strumpor av 9 strumpor
totalt andra dragningen. Sannolikheten att dra en svart strumpa efter att
ha dragit en svart strumpa är alltså $\frac{6}{9}$:

::: figur
<svg viewBox="14 24 392 142" width="392" height="142" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Träddiagram utan återläggning: efter en svart strumpa är sannolikheten för svart 6 niondelar, efter en vit är den 7 niondelar. Kombinationen svart följt av svart är inringad."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">6/9</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/9</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/9</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">2/9</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><ellipse cx="52" cy="148" rx="29" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text></svg>
:::

$$
P(\text{två svart}) = \frac{7}{10} \cdot \frac{6}{9} = \frac{42}{90} = \frac{7}{15} = 0{,}466\ldots \approx 47\ \%
$$

**Svar:** $\dfrac{7}{15}$ eller ca 47 %

**c)** Samma träddiagram som i b-uppgiften gäller, men vi har nu flera
kombinationer som ger en svart och en vit strumpa, se nedan:

::: figur
<svg viewBox="14 24 392 142" width="392" height="142" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma träddiagram utan återläggning där de två kombinationerna svart följt av vit och vit följt av svart är inringade."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">6/9</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/9</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/9</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">2/9</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><ellipse cx="168" cy="148" rx="23" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><ellipse cx="252" cy="148" rx="29" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text></svg>
:::

Vi *multiplicerar* sannolikheterna längs med varje gren och *adderar* dem
med varandra:

$$
P(\text{en svart, en vit}) = \frac{7}{10} \cdot \frac{3}{9} + \frac{3}{10} \cdot \frac{7}{9}
= \frac{21}{90} + \frac{21}{90} = \frac{42}{90} = \frac{7}{15} \approx 0{,}466 \approx 47\ \%
$$

**Svar:** $\dfrac{7}{15}$ eller ca 47 %
:::

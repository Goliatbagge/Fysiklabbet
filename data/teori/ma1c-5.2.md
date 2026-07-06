---
id: ma1c-5.2
title: Felmarginal och signifikans
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.2'
---

# Felmarginal och signifikans

Hur osäkert ett resultat är kallas **felmarginal**. Den anger hur mycket
resultaten från en statistisk undersökning kan förväntas variera om
undersökningen skulle upprepas under liknande förhållanden och anges ofta
i procent. Ett vanligt sätt att ange felmarginal är att ett resultat i
95 % av fallen ska ligga inom felmarginalen.

Det intervall som resultatet med felmarginal ger kallas
**konfidensintervall**.

::: formel "Felmarginal"
Om vi med 95 % säkerhet vill veta att ett resultat ligger i ett visst
intervall kan felmarginalen $f$ beräknas

$$
f = 1{,}96 \cdot \sqrt{\frac{p(100 - p)}{n}}
$$

där

- $f$ = felmarginal i procentenheter
- $p$ = andelen i procent som gett ett visst svar
- $n$ = stickprovets storlek
:::

Sannolikheten för att en statistisk förändring har skett kallas
**signifikans**. Om en förändring är större än felmarginalen kan vi med
95 % säkerhet säga att det har skett en förändring. Förändringen är då
"signifikant" eller "statistiskt säkerställd".

::: exempel "Exempel 1 — Favoritämnet"
**En stickprovsundersökning gjordes bland Sveriges gymnasieelever för att
ta reda på hur många procent av naturelever som har matematik som
favoritämne. Av 100 tillfrågade svarade 60 att de har matematik som
favoritämne.<br>
a) Beräkna felmarginalen.<br>
b) Beräkna konfidensintervallet.<br>
c) Undersökningen upprepades efter tre år. Av 100 tillfrågade svarade då
52 att de har matematik som favoritämne. Är förändringen statistiskt
säkerställd, dvs. är det säkert att det har skett en minskning av andelen
som har matematik som favoritämne?**

**a)** Vi ställer upp formeln för felmarginal:

$$
f = 1{,}96 \cdot \sqrt{\frac{p(100 - p)}{n}}
$$

$$
\left[\begin{array}{l}
p = \dfrac{60}{100} = 0{,}6 = 60\ \% \\
n = 100
\end{array}\right.
$$

Insättning av värdena ovan i formeln för felmarginal ger

$$
f = 1{,}96 \cdot \sqrt{\frac{60(100 - 60)}{100}} = 9{,}601\ldots\ \% \approx 9{,}6\ \%
$$

**Svar:** 9,6 %

**b)** Konfidensintervallet fås genom att ta resultatet ± felmarginalen,
dvs. $60\ \% \pm 9{,}6\ \%$:

$$
\left[\begin{array}{l}
\text{Undre gräns} = 60\ \% - 9{,}6\ \% = 50{,}4\ \% \\
\text{Övre gräns} = 60\ \% + 9{,}6\ \% = 69{,}6\ \%
\end{array}\right.
$$

**Svar:** Mellan 50,4 % och 69,6 %. (Det är alltså 95 % chans att det
verkliga resultatet ligger mellan dessa värden.)

**c)** Den nya andelen positiva är

$$
\frac{52}{100} = 0{,}52 = 52\ \%
$$

Detta ligger inom felmarginalen från föregående undersökning (52 % ligger
mellan 50,4 % och 69,6 %).

**Svar:** Nej, förändringen är inte statistiskt säkerställd.
:::

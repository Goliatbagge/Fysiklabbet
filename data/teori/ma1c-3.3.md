---
id: ma1c-3.3
title: Upprepade procentuella förändringar
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.3'
---

# Upprepade procentuella förändringar

Vid upprepad procentuell förändring får vi den totala procentuella
förändringen genom att beräkna den **totala förändringsfaktorn**. Den
totala förändringsfaktorn fås genom att multiplicera de olika
förändringsfaktorerna.

::: formel "Total förändringsfaktor"
$$
\text{total förändringsfaktor}
= \text{förändringsfaktor}_1 \cdot \text{förändringsfaktor}_2 \cdot \ldots
$$
:::

::: exempel "Exempel 1 — Höjning följd av sänkning"
**Ett pris höjs med 15 % för att sedan sänkas med 15 %. Med hur många
procent har det ursprungliga priset ändrats?**

::: handskrift
typ: upprepad
:::

::: textlosning
Vi skriver upp de olika förändringsfaktorerna:

$$
\text{förändringsfaktor}_1 = 1 + 0{,}15 = 1{,}15
$$

$$
\text{förändringsfaktor}_2 = 1 - 0{,}15 = 0{,}85
$$

Total förändringsfaktor:

$$
\text{total förändringsfaktor} = 1{,}15 \cdot 0{,}85 = 0{,}9775
$$

0,9775 motsvarar en minskning med $1 - 0{,}9775 = 0{,}0225 = 2{,}25\ \%$.

**Svar:** Det har minskat med 2,25 %.

**OBS! En ökning med 15 % följd av en minskning med 15 % ger alltså INTE
en förändring på 0 %. Detta beror på att värdet som vi räknar 15 % av
ändras.**
:::
:::

::: exempel "Exempel 2 — Sparkontot"
**Axel sätter in 80 000 kr på ett sparkonto med årsräntan 2,5 % och tar
inte ut några pengar. Hur mycket pengar finns på kontot om 18 år?**

::: handskrift
typ: sparkonto
:::

::: textlosning
I det här fallet är förändringsfaktorn densamma för varje år:

$$
\text{förändringsfaktor} = 1 + 0{,}025 = 1{,}025
$$

Vi ska alltså *multiplicera* beloppet med förändringsfaktorn 1,025 18
gånger, vilket ger den totala förändringsfaktorn $1{,}025^{18}$:

$$
80\,000 \cdot 1{,}025^{18} = 124\,772{,}697\ldots\ \mathrm{kr} \approx 124\,773\ \mathrm{kr}
$$

**Svar:** 124 773 kr
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Total förändringsfaktor"
- Vid flera förändringar efter varandra **multipliceras** faktorerna.
- $\text{total} = f_1 \cdot f_2 \cdot \ldots$
- Procenttalen får **aldrig** adderas.
:::

::: sampunkt "Upp och ner blir inte noll"
- $+15\ \%$ följt av $-15\ \%$ ger
  $1{,}15 \cdot 0{,}85 = 0{,}9775$.
- Alltså en **minskning** med 2,25 %, inte oförändrat pris.
- Orsaken: sänkningen räknas på det **höjda** priset.
:::

::: sampunkt "Samma förändring flera gånger"
- Upprepas samma faktor $n$ gånger blir totalen $f^{n}$.
- $\text{nya värdet}
  = \text{gamla värdet} \cdot f^{n}$.
- $80\,000$ kr med 2,5 % ränta i 18 år blir
  $80\,000 \cdot 1{,}025^{18}$.
:::

::: sampunkt "Från total faktor till procent"
- Dra bort 1 och gör om till procent.
- Faktorn 1,5597 betyder en ökning med ungefär 56 %.
:::
:::

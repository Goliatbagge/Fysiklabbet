---
id: ma1c-5.5
title: Experimentella sannolikheter
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.5'
---

# Experimentella sannolikheter

::: härledning "Introduktion — Experimentella sannolikheter"
Vad är sannolikheten för att träffas i huvudet av en meteorit? Det finns
två möjliga utfall:

1. Du blir träffad i huvudet av en meteorit.
2. Du blir inte träffad i huvudet av en meteorit.

Enligt den klassiska sannolikhetsdefinitionen skulle sannolikheten då
vara

$$
P(\text{bli träffad av en meteorit}) = \frac{1}{2} = 0{,}5 = 50\ \%
$$

*Det stämmer såklart inte. Det är inte 50 % risk att få en rymdsten i
huvudet. Men varför fungerar inte den klassiska
sannolikhetsdefinitionen?*

Jo, för att sannolikheten för de två utfallen är inte lika stor! Alltså
gäller inte den klassiska sannolikhetsdefinitionen!

*Men hur ska vi ta reda på hur stor sannolikheten är för att bli träffad
i huvudet av en meteorit?*

Vi måste vänta tillräckligt länge tills någon faktiskt blir träffad av en
meteorit. Först då vet vi ungefär (om vi vill slippa krångliga
astronomiska beräkningar). Och det har hänt! Sannolikheten att dö av en
meteorit är ungefär 1 på 1 600 000 (att jämföra med sannolikheten 1 på 93
att dö i någon form av motorfordonsolycka).
:::

Händelser där sannolikheten inte är självklar leder till
**experimentella sannolikheter**. Den experimentella sannolikheten
bestäms genom upprepade försök och kan anges i procent som **relativ
frekvens**. Ju fler försök desto mer exakt kommer sannolikheten att bli.

::: exempel "Exempel 1 — Straffläggningen"
**Asllani lägger 200 straffar på Musovic. Resultatet antecknas löpande i
tabellen nedan.**

| Antal straffar | Antal mål | Antal "inte mål" | Relativ frekvens mål |
| --- | --- | --- | --- |
| 1 | 1 | 0 | $1/1 = 1 = 100\ \%$ |
| 2 | 1 | 1 | $1/2 = 0{,}5 = 50\ \%$ |
| 5 | 2 | 3 | $2/5 = 0{,}4 = 40\ \%$ |
| 10 | 5 | 5 | $5/10 = 0{,}5 = 50\ \%$ |
| 50 | 34 | 16 | $34/50 = 0{,}68 = 68\ \%$ |
| 100 | 70 | 30 | $70/100 = 0{,}7 = 70\ \%$ |
| 200 | 139 | 61 | $139/200 \approx 0{,}70 = 70\ \%$ |

**Vad är sannolikheten i procent att nästa straff<br>a) blir mål?&emsp;&emsp;b) inte blir mål?**

**a)** Vi tittar på den relativa frekvensen för alla straffar och ser att
den är ungefär 70 %.

**Svar:** 70 %

**b)** Sannolikheten för att det inte blir mål måste vara
$100\ \% - 70\ \% = 30\ \%$. (Detta kallas för motsatshändelsen eller
komplementet. Mer om det framöver.)

**Svar:** 30 %
:::

::: exempel "Exempel 2 — Flicka eller pojke?"
**Under 2022 föddes 50 901 flickor och 53 833 pojkar i Sverige. Om du får
ett barn, vad är sannolikheten att det blir en flicka?**

Antalet födda flickor är 50 901 av totalt
$(50\,901 + 53\,833) = 104\,734$ barn. Det ger

$$
P(\text{flicka}) = \frac{50\,901}{104\,734} = 0{,}4860\ldots \approx 48{,}6\ \%
$$

**Svar:** Cirka 48,6 %
:::

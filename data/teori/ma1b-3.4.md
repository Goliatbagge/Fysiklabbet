---
id: ma1b-3.4
title: KPI och index
course: Matematik nivå 1b
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.4'
---

# KPI och index

Hur mycket dyrare har det blivit att leva sedan dina föräldrar var unga?
För att kunna jämföra priser, löner och andra värden mellan olika år
används **indextal**. Ett år väljs till **basår** och får indextalet 100 —
alla andra års värden anges sedan i förhållande till basåret.

::: formel "Indextal"
$$
\text{index} = \frac{\text{värdet}}{\text{värdet under basåret}} \cdot 100
$$
:::

Ett indextal är alltså en procentuell jämförelse med basåret, skriven
utan procenttecken:

- Index **100** betyder samma värde som under basåret.
- Index **175** betyder att värdet är 75 % *högre* än under basåret.
- Index **91** betyder att värdet är 9 % *lägre* än under basåret.

Sambandet mellan indextal och förändringsfaktor är nära: divideras
indextalet med 100 fås förändringsfaktorn från basåret. Index 175
motsvarar förändringsfaktorn 1,75.

::: exempel "Exempel 1 — Bestäm indextal"
**Priset på en biobiljett var 80 kr år 2010 och 140 kr år 2023.<br>a) Bestäm biljettprisets indextal år 2023, med 2010 som basår.<br>b) Med hur många procent har priset ökat sedan basåret?**

::: handskrift
typ: indextal
:::

::: textlosning
**a)** Basåret är 2010, så basårets pris 80 kr motsvarar index 100.
Insättning i formeln för indextal ger

$$
\text{index} = \frac{140}{80} \cdot 100 = 1{,}75 \cdot 100 = 175
$$

**b)** Basåret har alltid index 100. Indextalet 175 ligger
$175 - 100 = 75$ enheter över basåret, vilket betyder att priset är 75 %
högre än år 2010.

**Svar:** a) Index 175&emsp;&emsp;b) Priset har ökat med 75 %.
:::
:::

## Konsumentprisindex (KPI)

Det mest använda indextalet i Sverige är **konsumentprisindex**, som
förkortas **KPI**. Statistikmyndigheten SCB mäter varje månad priset på
en stor "varukorg" med sådant som hushållen faktiskt köper — mat, hyra,
kläder, el, resor — och räknar om det till ett indextal med **1980 som
basår**. När KPI stiger säger vi att det råder **inflation**: pengarna
räcker till mindre, eftersom samma varor kostar mer.

| År | KPI (basår 1980) |
|---|---|
| 1980 | 100 |
| 1990 | 207,8 |
| 2000 | 260,7 |
| 2010 | 303,5 |
| 2020 | 337,0 |
| 2023 | 391,3 |

Tabellen läses så här: år 2023 var den allmänna prisnivån 291 % högre än
år 1980 — det som kostade 100 kr år 1980 kostade i genomsnitt drygt
391 kr år 2023.

Med KPI kan vi räkna om ett belopp från ett års penningvärde till ett
annat. Kvoten mellan de två årens indextal är förändringsfaktorn mellan
åren:

::: formel "Omräkning med index"
$$
\text{nytt belopp} = \text{gammalt belopp} \cdot
\frac{\text{index nya året}}{\text{index gamla året}}
$$
:::

::: exempel "Exempel 2 — Räkna om med KPI"
**En anställd hade månadslönen 21 500 kr år 2010. Vad motsvarar den
lönen i 2023 års penningvärde? KPI var 303,5 år 2010 och 391,3 år
2023.**

::: handskrift
typ: kpiomrakning
:::

::: textlosning
Förändringsfaktorn mellan åren är kvoten mellan indextalen:

$$
\frac{391{,}3}{303{,}5} = 1{,}2892\ldots
$$

Prisnivån var alltså cirka 29 % högre år 2023 än år 2010. Lönen räknas
om med samma faktor:

$$
21\,500 \cdot \frac{391{,}3}{303{,}5} = 27\,719{,}7\ldots\ \mathrm{kr}
\approx 27\,700\ \mathrm{kr}
$$

**Svar:** Ungefär 27 700 kr i månaden.
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Indextal"
- Ett sätt att jämföra värden mellan **olika år**.
- Ett år väljs till **basår** och får indextalet **100**.
- $\text{index}
  = \dfrac{\text{värdet}}{\text{värdet under basåret}} \cdot 100$
:::

::: sampunkt "Tolka indextalet"
- Index **100**: samma värde som basåret.
- Index **175**: 75 % **högre** än basåret.
- Index **91**: 9 % **lägre** än basåret.
- Dra bort 100 för att få den procentuella förändringen.
:::

::: sampunkt "Index och förändringsfaktor"
- Dividera indextalet med 100, så får du **förändringsfaktorn** från
  basåret.
- Index 175 motsvarar faktorn 1,75.
:::

::: sampunkt "Konsumentprisindex"
- **KPI** mäter priset på en varukorg med det hushållen faktiskt köper:
  mat, hyra, kläder, el, resor.
- Mäts varje månad av SCB, med **1980 som basår**.
- Stiger KPI råder **inflation**: pengarna räcker till mindre.
:::

::: sampunkt "Räkna om mellan år"
- $\text{nytt belopp} = \text{gammalt belopp} \cdot
  \dfrac{\text{index nya året}}{\text{index gamla året}}$
- Kvoten mellan årens indextal **är** förändringsfaktorn mellan dem.
- Basåret behöver alltså inte vara inblandat i själva räkningen.
:::
:::

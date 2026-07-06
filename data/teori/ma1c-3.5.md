---
id: ma1c-3.5
title: Lån och ränteberäkningar
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.5'
---

# Lån och ränteberäkningar

Om vi inte har pengar kan vi ta ett **lån**. Ett lån kan ges av en bank,
ett låneföretag eller en kompis. Självklart ska vi betala tillbaka lånet.
Att betala tillbaka ett lån kallas **amortera**. Det vi får betala extra
kan man säga är priset för lånet och kallas **ränta**. Ränta anges ofta
som en viss procent av skulden och kallas då för **räntesats**.

(När vi sätter in pengar på ett sparkonto får vi själva tillbaka ränta på
de pengar vi sätter in. Det vi gör, fast vi kanske inte tänker på det, är
att vi lånar ut våra pengar till banken och då får banken betala *oss*
ränta. Det banken gör med våra pengar är att de lånar ut dem till andra
till en högre ränta och tjänar pengar på mellanskillnaden.)

Kom ihåg: Om det i uppgifter bara står "ränta" är det underförstått att
de menar årsränta. Ibland förekommer kvartalsränta där ett kvartal är ett
"kvarts år", dvs. 3 månader.

::: formel "Betala ett lån"
När vi betalar av ett lån betalar vi **amortering** (återbetalning) *och*
**ränta** (lånekostnad).
:::

::: exempel "Exempel 1 — Billånet"
**Ellen tar ett lån på 150 000 kr för att köpa en bil. Amorteringstiden
är 5 år och hon amorterar lika stora belopp varje månad ("rak
amortering"). Årsräntan på lånet är 4,8 %. Hur<br>
a) stor blir amorteringen varje månad?<br>
b) mycket ska hon betala totalt vid första inbetalningen?<br>
c) mycket kommer hon att betala totalt för lånet?**

**a)** Om hon ska amortera varje månad i 5 år, så kommer hon att göra
$5 \cdot 12 = 60$ stycken inbetalningar. Om hon ska amortera samma belopp
vid varje inbetalning blir amorteringen varje månad

$$
\frac{150\,000\ \mathrm{kr}}{60} = 2\,500\ \mathrm{kr}
$$

**Svar:** 2 500 kr

**b)** Vid den första inbetalningen är hennes skuld 150 000 kr.
Årsräntan är 4,8 % av den, så

$$
\text{årsränta} = 0{,}048 \cdot 150\,000\ \mathrm{kr} = 7\,200\ \mathrm{kr}
$$

Eftersom hon betalar månadsvis, ska hon betala $\frac{1}{12}$ av detta
belopp i ränta varje månad (det går 12 månader på ett år), så

$$
\text{ränta} = \frac{7\,200\ \mathrm{kr}}{12} = 600\ \mathrm{kr}
$$

Amorteringen varje månad har vi i a-uppgiften fått till 2 500 kr. Vid den
första inbetalningen ska hon alltså betala

$$
\text{ränta} + \text{amortering} = 600\ \mathrm{kr} + 2\,500\ \mathrm{kr} = 3\,100\ \mathrm{kr}
$$

**Svar:** 3 100 kr

**c)** Vi skapar ett kalkylark och fyller i månad 1–60 i kolumn A. I
kolumn B har vi rubriken "Aktuell skuld" och fyller i 150 000 i den
översta cellen. I kolumn C skriver vi "Ränta per månad" och i kolumn D
"Inbetalning".

Vi fyller i kolumnen för aktuell skuld genom att subtrahera amorteringen
2 500 kr från föregående värde. Vi ställer oss i B3 och skriver `=B2-2500`
och fyller i resten av värdena med fyllnadshandtaget.

Vi fyller i kolumnen för ränta per månad genom att beräkna årsräntan,
4,8 % av skulden, och dividera med 12. Vi ställer oss i cellen C2 och
skriver `=(B2*0,048)/12` och fyller i resten av värdena med
fyllnadshandtaget.

Vi fyller kolumnen för inbetalning genom att lägga till amorteringen
2 500 kr till räntan per månad. Vi ställer oss i cellen D2, skriver
`=2500+C2` och fyller i resten av värdena med fyllnadshandtaget:

| Månad | Aktuell skuld | Ränta per månad | Inbetalning |
| --- | --- | --- | --- |
| 1 | 150 000 | 600 | 3 100 |
| 2 | 147 500 | 590 | 3 090 |
| 3 | 145 000 | 580 | 3 080 |
| 4 | 142 500 | 570 | 3 070 |
| … | … | … | … |
| 59 | 5 000 | 20 | 2 520 |
| 60 | 2 500 | 10 | 2 510 |

Till sist beräknar vi det totala inbetalda beloppet genom att summera
alla värden i kolumn D. Vi bläddrar längst ner i kalkylarket, ställer oss
i cellen under den sista inbetalningen och klickar på summasymbolen ∑ i
verktygsfältet och väljer "SUM". Därefter markerar vi alla värden i
kolumn D, och texten i cellen blir då `=SUM(D2:D61)`, vilket ger den
totala summan av alla inbetalningar 168 300 kr.

**Svar:** 168 300 kr
:::

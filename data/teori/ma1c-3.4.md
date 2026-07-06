---
id: ma1c-3.4
title: Sparande och ränteberäkningar
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.4'
---

# Sparande och ränteberäkningar

När du sätter in pengar på ett konto kan pengarna växa med en viss
**ränta**. **Årsräntan** anger med hur många procent beloppet på kontot
växer varje år. Står det bara "ränta" i en uppgift är det underförstått
*årsräntan*. Beloppet som finns på kontot kallas **behållning**.

Om vi snabbt vill ta reda på behållningen på ett konto varje år kan vi
använda ett **kalkylblad**, t.ex. Google Kalkylark eller Microsoft Excel.

Ett kalkylblad byggs upp av rutor som kallas **celler**. Varje cell har
ett namn som består av en bokstav och ett tal. Varje cell som ligger i
kolumn A börjar med bokstaven A och varje cell som ligger på rad 1 slutar
på talet 1. Cellen i kolumn A på rad 1 heter alltså A1. Cellen i kolumn C
på rad 5 heter C5.

Om vi ska skriva in beräkningar i en cell inleds formeln i cellen alltid
med ett likhetstecken, =.

::: exempel "Exempel 1 — Sparkonto i kalkylblad"
**Du sätter in pengar på ett konto. Använd ett kalkylark och beräkna
behållningen på kontot varje år till och med år 8 om du<br>
a) sätter in 30 000 kr med räntan 3,5 %<br>
b) sätter in 40 000 kr med räntan 3,5 %<br>
c) sätter in 40 000 kr med räntan 4,5 %**

**a)** Vi öppnar ett kalkylark och gör en kolumn för "År" och en kolumn
för "Behållning (kr)". Vi fyller i kolumnen från år 0 till och med år 8.
Vi fyller också i insättningen 30 000 kr (i cell B2) samt
förändringsfaktorn som motsvarar en ökning med 3,5 %, dvs.
$1 + 0{,}035 = 1{,}035$ (i cell B12).

För att få behållningen efter ett år ska vi multiplicera 30 000 (värdet i
B2) med förändringsfaktorn (värdet i B12). Vi ställer oss i cell B3 och
skriver `=B2*B12` och får värdet efter 1 år (31 050 kr).

För att upprepa beräkningen för de resterande cellerna, så markera cell
B3, ta tag i *fyllnadshandtaget* (det runda hörnet i högra nederkanten)
och dra ner till och med cell B10. Eftersom varje värde ska multipliceras
med förändringsfaktorn i B12 ska den cellen "låsas" med dollartecken:
`=B2*$B$12`.

| År | Behållning (kr) |
| --- | --- |
| 0 | 30 000,00 kr |
| 1 | 31 050,00 kr |
| 2 | 32 136,75 kr |
| 3 | 33 261,54 kr |
| 4 | 34 425,69 kr |
| 5 | 35 630,59 kr |
| 6 | 36 877,66 kr |
| 7 | 38 168,38 kr |
| 8 | 39 504,27 kr |

**b)** Om insättningen istället är 40 000 kr går vi nu bara till cell B2
och ändrar beloppet där till 40 000 kr. De resterande värdena ändras
automatiskt (automagiskt!). Efter 8 år är behållningen 52 672,36 kr.

**c)** Om räntan istället är 4,5 % går vi nu bara till cell B12 och
ändrar förändringsfaktorn till 1,045. De resterande värdena ändras
återigen automatiskt. Med 30 000 kr insatta blir behållningen efter 8 år
42 663,02 kr.
:::

::: exempel "Exempel 2 — Årligt sparande"
**Du sätter in 5 000 kr i slutet av varje år på ett konto med 2,8 %
ränta. Vad är behållningen på kontot direkt efter 10:e insättningen?**

Vi öppnar ett kalkylark och gör en kolumn för "Insättning" och en kolumn
för "Behållning (kr)". Vi fyller i kolumnen från insättning 1 till och
med insättning 10. Vi fyller också i insättningen 5 000 kr för den första
insättningen.

För att få behållningen efter den andra insättningen ska det föregående
beloppet (5 000 kr) ha vuxit med 2,8 % *samtidigt* som du lägger till
ytterligare 5 000 kr. Vi ställer oss i cell B3 och skriver
`=B2*1,028+5000` och får värdet efter den andra insättningen
(10 140 kr).

Vi tar tag i fyllnadshandtaget och drar ner till och med insättning 10:

| Insättning | Behållning (kr) |
| --- | --- |
| 1 | 5 000,00 kr |
| 2 | 10 140,00 kr |
| 3 | 15 423,92 kr |
| 4 | 20 855,79 kr |
| 5 | 26 439,75 kr |
| 6 | 32 180,06 kr |
| 7 | 38 081,11 kr |
| 8 | 44 147,38 kr |
| 9 | 50 383,50 kr |
| 10 | 56 794,24 kr |

**Svar:** 56 794,24 kr
:::

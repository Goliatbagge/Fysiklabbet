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
använda ett **kalkylblad**, till exempel Google Kalkylark eller Microsoft Excel.

Ett kalkylblad byggs upp av rutor som kallas **celler**. Varje cell har
ett namn som består av en bokstav och ett tal. Varje cell som ligger i
kolumn A börjar med bokstaven A och varje cell som ligger på rad 1 slutar
på talet 1. Cellen i kolumn A på rad 1 heter alltså A1. Cellen i kolumn C
på rad 5 heter C5.

::: figur
<svg viewBox="26 11 371 207" width="542" height="303" font-family="Poppins, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ett kalkylblad med kolumnerna A till D och raderna 1 till 5. Varje cell har sitt namn utskrivet. Kolumn C och rad 5 är markerade, och cellen där de möts heter C5.">
  <rect x="76" y="36" width="318" height="154" fill="#ffffff"/>
  <rect x="76" y="36" width="318" height="24" fill="#f1f3f4"/>
  <rect x="76" y="36" width="30" height="154" fill="#f1f3f4"/>
  <rect x="250" y="60" width="72" height="130" fill="#1a73e8" fill-opacity="0.12"/>
  <rect x="106" y="164" width="288" height="26" fill="#e37400" fill-opacity="0.14"/>
  <rect x="250" y="36" width="72" height="24" fill="#d3e3fd"/>
  <rect x="76" y="164" width="30" height="26" fill="#fde3c4"/>
  <line x1="106" y1="36" x2="106" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="178" y1="36" x2="178" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="250" y1="36" x2="250" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="322" y1="36" x2="322" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="394" y1="36" x2="394" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="36" x2="76" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="60" x2="394" y2="60" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="86" x2="394" y2="86" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="112" x2="394" y2="112" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="138" x2="394" y2="138" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="164" x2="394" y2="164" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="190" x2="394" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="36" x2="394" y2="36" stroke="#b6b9bc" stroke-width="1"/>
  <text x="142" y="52.5" font-size="12" text-anchor="middle" fill="#5f6368">A</text>
  <text x="214" y="52.5" font-size="12" text-anchor="middle" fill="#5f6368">B</text>
  <text x="286" y="52.5" font-size="12" text-anchor="middle" fill="#0b57d0" font-weight="700">C</text>
  <text x="358" y="52.5" font-size="12" text-anchor="middle" fill="#5f6368">D</text>
  <text x="91" y="77.5" font-size="12" text-anchor="middle" fill="#5f6368">1</text>
  <text x="91" y="103.5" font-size="12" text-anchor="middle" fill="#5f6368">2</text>
  <text x="91" y="129.5" font-size="12" text-anchor="middle" fill="#5f6368">3</text>
  <text x="91" y="155.5" font-size="12" text-anchor="middle" fill="#5f6368">4</text>
  <text x="91" y="181.5" font-size="12" text-anchor="middle" fill="#a14f00" font-weight="700">5</text>
  <text x="142" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">A1</text>
  <text x="214" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">B1</text>
  <text x="286" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">C1</text>
  <text x="358" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">D1</text>
  <text x="142" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">A2</text>
  <text x="214" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">B2</text>
  <text x="286" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">C2</text>
  <text x="358" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">D2</text>
  <text x="142" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">A3</text>
  <text x="214" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">B3</text>
  <text x="286" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">C3</text>
  <text x="358" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">D3</text>
  <text x="142" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">A4</text>
  <text x="214" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">B4</text>
  <text x="286" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">C4</text>
  <text x="358" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">D4</text>
  <text x="142" y="181.5" font-size="12" text-anchor="middle" fill="#80868b">A5</text>
  <text x="214" y="181.5" font-size="12" text-anchor="middle" fill="#80868b">B5</text>
  <text x="286" y="181.5" font-size="12" text-anchor="middle" fill="currentColor" font-weight="700">C5</text>
  <text x="358" y="181.5" font-size="12" text-anchor="middle" fill="#80868b">D5</text>
  <rect x="250" y="164" width="72" height="26" fill="none" stroke="#1a73e8" stroke-width="2.5"/>
  <line x1="286" y1="26" x2="286" y2="35" stroke="currentColor" stroke-width="1.2"/>
  <text x="286" y="22" font-size="13" text-anchor="middle" fill="currentColor">Kolumn C</text>
  <line x1="66" y1="177" x2="75" y2="177" stroke="currentColor" stroke-width="1.2"/>
  <text x="62" y="181.5" font-size="13" text-anchor="end" fill="currentColor">Rad 5</text>
  <line x1="286" y1="191.5" x2="286" y2="200" stroke="currentColor" stroke-width="1.2"/>
  <text x="286" y="214" font-size="13" text-anchor="middle" fill="currentColor">Cellen C5</text>
</svg>

Kolumnerna betecknas med bokstäver och raderna med tal. Cellen där kolumn C och rad 5 möts heter C5.
:::

Om vi ska skriva in beräkningar i en cell inleds formeln i cellen alltid
med ett likhetstecken, =.

::: exempel "Exempel 1 — Sparkonto i kalkylblad"
**Du sätter in pengar på ett konto. Använd ett kalkylark och beräkna
behållningen på kontot varje år till och med år 8 om du<br>
a) sätter in 30 000 kr med räntan 3,5 %<br>
b) sätter in 40 000 kr med räntan 3,5 %<br>
c) sätter in 40 000 kr med räntan 4,5 %**

::: textlosning
**a)** Vi öppnar ett kalkylark och gör beräkningen i tre steg. Klicka
fram stegen ett i taget i kalkylbladet nedan och se hur cellerna fylls i.

::: minisim
typ: kalkylblad
:::

**Steg 1.** Vi gör en kolumn för "År" och en kolumn för "Behållning (kr)".
Vi skriver 0 i A2 och 1 i A3, markerar de två cellerna och drar i
*fyllnadshandtaget* (det runda hörnet i högra nederkanten) ner till och
med A10. Då fylls åren i från år 0 till och med år 8. Vi fyller också i
insättningen 30 000 kr (i cell B2) samt förändringsfaktorn som motsvarar
en ökning med 3,5 %, det vill säga $1 + 0{,}035 = 1{,}035$ (i cell B12,
med rubriken "Förändringsfaktor" i A12).

**Steg 2.** För att få behållningen efter ett år ska vi multiplicera
30 000 (värdet i B2) med förändringsfaktorn (värdet i B12). Vi ställer
oss i cell B3 och skriver `=B2*B12` och får värdet efter 1 år (31 050 kr).

**Steg 3.** Samma beräkning ska nu upprepas för åren 2 till 8, och varje
värde ska multipliceras med förändringsfaktorn i B12. Den cellen ska
därför "låsas" med dollartecken innan formeln kopieras, så vi ändrar
formeln i B3 till `=B2*$B$12`. Utan dollartecknen skulle B12 också flytta
ner en rad för varje år, till tomma celler. Sedan markerar vi cell B3,
tar tag i fyllnadshandtaget och drar ner till och med cell B10. I B6 står
nu till exempel `=B5*$B$12`: B5 har flyttat med, men `$B$12` står kvar.
Till sist markerar vi B2 till B10 och klickar på kr i verktygsfältet, så
att beloppen visas i kronor med två decimaler.

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
återigen automatiskt. Med 40 000 kr insatta blir behållningen efter 8 år
56 884,02 kr.
:::
:::

::: exempel "Exempel 2 — Årligt sparande"
**Du sätter in 5 000 kr i slutet av varje år på ett konto med 2,8 %
ränta. Vad är behållningen på kontot direkt efter 10:e insättningen?**

::: handskrift
typ: arligtsparande
:::

::: textlosning
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
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Begreppen"
- **Ränta**: hur mycket pengarna växer.
- **Årsränta**: räntan per år. Står det bara "ränta" menas **årsränta**.
- **Behållning**: beloppet som finns på kontot.
:::

::: sampunkt "Ett insatt belopp som växer"
- Använd förändringsfaktorn upphöjd till antalet år:
  $\text{behållning} = K \cdot \mathit{ff}^{\,n}$.
- $30\,000$ kr med 3,5 % ränta i 8 år blir
  $30\,000 \cdot 1{,}035^{8}$.
:::

::: sampunkt "Årligt sparande"
- Sätts ett belopp in **varje** år växer varje insättning olika länge.
- Den första insättningen hinner växa flest år, den sista ingen tid alls.
- Summera insättningarnas belopp var för sig, eller använd ett
  kalkylblad.
:::

::: sampunkt "Kalkylblad"
- Ett kalkylblad byggs av **celler**, namngivna med kolumnbokstav och
  radnummer: A1, C5.
- En formel i en cell inleds **alltid med likhetstecken**.
- Skriv formeln en gång och dra nedåt, så räknas alla år ut automatiskt.
:::
:::

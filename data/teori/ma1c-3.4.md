---
id: ma1c-3.4
title: Sparande och ränteberäkningar
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.4'
---

# Sparande och ränteberäkningar

När du sätter in pengar på ett konto lånar du ut dina pengar till banken
(som i sin tur lånar ut dina pengar till andra och tjänar på
mellanskillnaden). Som betalning för lånet kan
banken betala dig en viss avgift som kallas **ränta**. Räntan anges i kronor eller i
procent av det som du har på kontot. **Årsräntan** anger med hur många procent beloppet på kontot
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
fram stegen ett i taget i kalkylbladet nedan. Under bladet förklaras vad som händer i varje steg.

::: minisim
typ: kalkylblad
:::

**Svar:** Behållningen varje år står i kolumn B i kalkylbladet. Efter
8 år är den 39 504,27 kr.

**b)** Vi utgår från kalkylbladet i a) och klickar fram stegen.

::: minisim
typ: kalkylblad
scen: sparkonto-b
:::

**Svar:** Efter 8 år är behållningen 52 672,36 kr.

**c)** Vi utgår från kalkylbladet i b) och klickar fram stegen.

::: minisim
typ: kalkylblad
scen: sparkonto-c
:::

**Svar:** Efter 8 år är behållningen 56 884,02 kr.
:::
:::

::: exempel "Exempel 2 — Årligt sparande"
**Du sätter in 5 000 kr i slutet av varje år på ett konto med 2,8 %
ränta. Vad är behållningen på kontot direkt efter 10:e insättningen?**

::: textlosning
Vi öppnar ett kalkylark och gör beräkningen i tre steg. Klicka fram
stegen ett i taget i kalkylbladet nedan. Under bladet förklaras vad som händer i varje steg.

::: minisim
typ: kalkylblad
scen: arligt
:::

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

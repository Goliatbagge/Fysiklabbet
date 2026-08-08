---
id: ma1c-5.4
title: Den klassiska sannolikhetsdefinitionen
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.4'
---

# Den klassiska sannolikhetsdefinitionen

::: kuriosa "Introduktion — Tre sanna osannolikheter"
Den 28 juli 1900 åkte Italiens kung Umberto I till en restaurang för
middag. När ägaren, som heter Umberto, tog kungens order, märkte han att
de såg väldigt lika ut. Så de tillbringade kvällen med att prata och
upptäckte: de föddes båda den 14 mars 1844; de gifte sig båda med kvinnor
med namnet Margherita samma dag; restaurangen öppnades samma dag som
kungen kröntes. Nästa dag fick kungen veta att restaurangägaren hade dött
i en mystisk skjutning samma morgon. När kungen pratade med en vän om det
mördades kungen av en man i folkmassan.

Napoleon och Hitler föddes med 129 års mellanrum, kom till makten med 129
års mellanrum, förklarade krig med Ryssland med 129 års mellanrum och
besegrades med 129 års mellanrum.

Två tvillingpojkar separerades vid födseln. Deras adoptivfamiljer gav dem
båda namnet James, de båda utbildade sig till poliser och gifte sig sedan
med en kvinna som hette Linda. De hade båda pojkar, varav en hette James
Alan och en som hette James Allan. De skilde sig från sina fruar Linda
och gifte sig igen med kvinnor som hette Betty. De hade båda en hund som
heter Toy.

Roy Cleveland Sullivan, född 7 februari 1912, död 28 september 1983, var
en amerikansk skogvaktare i Shenandoah nationalpark i Virginia. Han är
den person som träffats flest gånger av blixten. Mellan 1942 och 1977
träffades Sullivan av blixtar vid sju olika tillfällen och överlevde dem
alla. Av denna anledning fick han smeknamnet "Den mänskliga blixtledaren"
(The Human Lightning Rod). Samtliga fall har bekräftats av läkare.

**Slutsats: Det är väldigt sannolikt att osannolika saker sker!**
:::

Hur stor chans/risk att en händelse inträffar kallas **sannolikhet** och
anges i decimal-, procent- eller bråkform. Resultatet av varje slumpförsök
kallas **utfall**. Mängden av alla möjliga utfall kallas **utfallsrum**.
De utfall som stämmer in på händelsen kallas **gynnsamma utfall**.

Sannolikheten för en händelse skrivs $P(\text{händelse})$ ($P$ från
"probability" = sannolikhet).

Om sannolikheten för varje utfall är lika stor har vi en **likformig
sannolikhetsfördelning** som beräknas med **den klassiska
sannolikhetsdefinitionen**.

::: formel "Den klassiska sannolikhetsdefinitionen"
Sannolikheten vid likformig sannolikhetsfördelning är

$$
P(\text{händelse}) = \frac{\text{antalet gynnsamma utfall}}{\text{antalet möjliga utfall}}
$$
:::

Vid slantsingling har varje utfall samma sannolikhet. Det är lika stor
chans att få en krona som att få en klave. Vid straffläggning i fotboll är
sannolikheten för mål inte samma som sannolikheten för miss. Formeln ovan
fungerar alltså för slantsingling, men inte för straffläggning.

Sannolikheten för en händelse anges i decimalform som ett tal mellan 0
och 1. Sannolikheten = 0 betyder att händelsen är en omöjlighet.
"Sannolikheten att slå en sjua på en vanlig tärning är 0."

Sannolikheten = 1 betyder att händelsen garanterat kommer att inträffa.
"Sannolikheten att dra upp en vit strumpa ur en låda med enbart vita
strumpor är 1."

::: exempel "Exempel 1 — Tre klassiska sannolikheter"
**Vad är sannolikheten att<br>a) få klave vid slantsingling?&emsp;&emsp;b) slå minst 5 med en (vanlig) tärning?&emsp;&emsp;c) dra ett klätt hjärter ur en kortlek?**

::: handskrift
typ: klassisksannolikhet
:::

::: textlosning
**a)** Antalet gynnsamma utfall = 1 (klave). Antalet möjliga utfall = 2
(krona, klave):

$$
P(\text{klave}) = \frac{\text{antalet gynnsamma utfall}}{\text{antalet möjliga utfall}} = \frac{1}{2} = 0{,}5 = 50\ \%
$$

**Svar:** 0,5

**b)** Antalet gynnsamma utfall = 2 (femma och sexa). Antalet möjliga
utfall = 6 (1, 2, 3, 4, 5, 6):

$$
P(\text{minst 5}) = \frac{2}{6} = \frac{1}{3} \approx 0{,}33 = 33\ \%
$$

**Svar:** $\dfrac{1}{3}$, alternativt ca 33 % eller ca 0,33

**c)** Antalet gynnsamma utfall = 4 (hjärter knekt, hjärter dam, hjärter
kung och hjärter ess). Antalet möjliga utfall = 52 (alla kort i
kortleken):

$$
P(\text{klätt hjärter}) = \frac{4}{52} = \frac{1}{13} \approx 0{,}077 = 7{,}7\ \%
$$

**Svar:** $\dfrac{1}{13}$, alternativt ca 7,7 % eller ca 0,077
:::
:::

## Sannolikheter med två föremål

Uppgifter där vi använder oss av två föremål (kast med *två* tärningar,
singla *två* mynt osv.) är oftast enklast att lösa genom att rita upp
*utfallsrummet* (alla möjliga kombinationer).

::: exempel "Exempel 2 — Två tärningar"
**Du kastar två tärningar. Vad är sannolikheten att få<br>a) minst
summan 10?&emsp;&emsp;b) en summa större än 10?**

::: handskrift
typ: tvatarningar
:::

::: textlosning
Vi ritar upp utfallsrummet för summan av två tärningar och markerar alla
gynnsamma utfall för a-uppgiften (de som ger summan 10, 11 eller 12):

::: figur
<svg viewBox="34 8 187 226" width="187" height="226" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Utfallsrummet för summan av två tärningar: en tabell med tärning 1 längs underkanten och tärning 2 längs vänsterkanten, där varje ruta visar summan av de två tärningarna. De sex rutorna med summa 10, 11 eller 12 i övre högra hörnet är skuggade."><rect x="36" y="30" width="26" height="156" fill="rgba(31,37,48,0.055)"/><rect x="62" y="186" width="156" height="26" fill="rgba(31,37,48,0.055)"/><rect x="140" y="30" width="26" height="26" fill="#cfe3f2"/><rect x="166" y="56" width="26" height="26" fill="#cfe3f2"/><rect x="166" y="30" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="82" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="56" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="30" width="26" height="26" fill="#cfe3f2"/><line x1="62" y1="30" x2="62" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="30" x2="218" y2="30" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="88" y1="30" x2="88" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="56" x2="218" y2="56" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="114" y1="30" x2="114" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="82" x2="218" y2="82" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="108" x2="218" y2="108" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="166" y1="30" x2="166" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="134" x2="218" y2="134" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="192" y1="30" x2="192" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="160" x2="218" y2="160" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="218" y1="30" x2="218" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="186" x2="218" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="30" x2="36" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="186" x2="62" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="62" y1="212" x2="218" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><rect x="62" y="30" width="156" height="156" fill="none" stroke="#1f2530" stroke-width="1.4"/><text x="75" y="178" font-size="14" text-anchor="middle" fill="#1f2530">2</text><text x="75" y="152" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="75" y="126" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="75" y="100" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="75" y="74" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="75" y="48" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="101" y="178" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="101" y="152" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="101" y="126" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="101" y="100" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="101" y="74" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="101" y="48" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="127" y="178" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="127" y="152" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="127" y="126" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="127" y="100" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="127" y="74" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="127" y="48" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="153" y="178" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="153" y="152" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="153" y="126" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="153" y="100" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="153" y="74" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="153" y="48" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="179" y="178" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="179" y="152" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="179" y="126" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="179" y="100" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="179" y="74" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="179" y="48" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="205" y="178" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="205" y="152" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="205" y="126" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="205" y="100" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="205" y="74" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="205" y="48" font-size="14" text-anchor="middle" fill="#1f2530">12</text><text x="49" y="178" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">1</text><text x="49" y="152" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="49" y="126" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="49" y="100" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">4</text><text x="49" y="74" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="49" y="48" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">6</text><text x="75" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">1</text><text x="101" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="127" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="153" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">4</text><text x="179" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="205" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">6</text><text x="36" y="20" font-size="14" text-anchor="start" fill="#1f2530">tärning 2</text><text x="140" y="230" font-size="14" text-anchor="middle" fill="#1f2530">tärning 1</text></svg>
:::

**a)** Antalet gynnsamma utfall = 6. Antalet möjliga utfall = 36:

$$
P(\text{minst 10}) = \frac{6}{36} = \frac{1}{6} \approx 0{,}17 = 17\ \%
$$

**Svar:** $\dfrac{1}{6}$, alternativt ca 17 % eller ca 0,17

**b)** "En summa över 10" betyder att vi ska ha summan 11 eller 12
(*inte* 10 — skilj på formuleringarna!). Vi tittar på utfallsrummet ovan
igen och räknar hur många utfall som ger 11 eller 12.

Antalet gynnsamma utfall = 3. Antalet möjliga utfall = 36:

$$
P(\text{större än 10}) = \frac{3}{36} = \frac{1}{12} \approx 0{,}08 = 8\ \%
$$

**Svar:** $\dfrac{1}{12}$, alternativt ca 8 % eller ca 0,08
:::
:::

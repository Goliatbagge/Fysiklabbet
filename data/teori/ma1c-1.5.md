---
id: ma1c-1.5
title: Tal i decimalform
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.5'
---

# Tal i decimalform

Vårt positionssystem bygger på basen 10 och kallas det **decimala
talsystemet**. ("Decem" betyder 10 på latin, jämför t.ex. med "decennium"
som betyder årtionde.) Beroende på positionen i talet står siffran för
olika saker.

Vi studerar talet 2708,539:

::: figur
<svg viewBox="58 10 328 96" width="328" height="96" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Talet 2708,539 med pilar från varje siffra till dess positionsnamn: 2 är tusental, 7 hundratal, 0 tiotal och 8 ental. Efter decimaltecknet är 5 tiondel, 3 hundradel och 9 tusendel."><text x="172" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="188" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">7</text><text x="204" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">0</text><text x="220" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">8</text><text x="230" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">,</text><text x="242" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="258" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="274" y="26" font-size="17" font-weight="600" text-anchor="middle" fill="#1f2530">9</text><text x="132" y="50" font-size="14" text-anchor="end" fill="#1f2530">tusental</text><text x="132" y="66" font-size="14" text-anchor="end" fill="#1f2530">hundratal</text><text x="132" y="82" font-size="14" text-anchor="end" fill="#1f2530">tiotal</text><text x="132" y="98" font-size="14" text-anchor="end" fill="#1f2530">ental</text><text x="380" y="50" font-size="14" text-anchor="end" fill="#1f2530">tiondel</text><text x="380" y="66" font-size="14" text-anchor="end" fill="#1f2530">hundradel</text><text x="380" y="82" font-size="14" text-anchor="end" fill="#1f2530">tusendel</text><line x1="136" y1="45" x2="166.3" y2="34.9" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(172,33) rotate(-18.4)" fill="#1f2530"/><line x1="136" y1="61" x2="182.7" y2="35.8" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(188,33) rotate(-28.3)" fill="#1f2530"/><line x1="136" y1="77" x2="199" y2="36.3" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(204,33) rotate(-32.9)" fill="#1f2530"/><line x1="136" y1="93" x2="215.1" y2="36.5" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(220,33) rotate(-35.5)" fill="#1f2530"/><line x1="325" y1="45" x2="247.9" y2="33.9" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(242,33) rotate(-171.8)" fill="#1f2530"/><line x1="310" y1="61" x2="263.3" y2="35.8" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(258,33) rotate(-151.7)" fill="#1f2530"/><line x1="318" y1="77" x2="278.2" y2="37.2" stroke="#1f2530" stroke-width="1.1"/><polygon points="0,0 -6,3 -6,-3" transform="translate(274,33) rotate(-135)" fill="#1f2530"/></svg>

Siffrans position i talet avgör vad den står för.
:::

2:an står alltså för hur många tusental vi har, 7:an för hur många hundratal
vi har osv.

## Avrundning

Ett värde som är avrundat kallas **närmevärde**. Den siffra som ska avrundas
kallas **avrundningssiffra**.

::: formel "Avrundningsregeln"
| Om avrundningssiffran följs av … | … så … |
| --- | --- |
| 0, 1, 2, 3 eller 4 | behåll avrundningssiffran (avrunda nedåt) |
| 5, 6, 7, 8 eller 9 | öka avrundningssiffran med 1 (avrunda uppåt) |
:::

::: exempel "Exempel 1 — Avrundning"
**Avrunda 61,4738 till<br>a) tiondelar&emsp;&emsp;b) ental&emsp;&emsp;c) tiotal**

**a)** Siffran 4 är tiondelssiffran. Siffran *efter* fyran är 7, så fyran
ökas med 1 (och blir 5).

**Svar:** 61,5

**b)** Siffran 1 är entalssiffran. Siffran *efter* ettan är 4, så ettan
behålls.

**Svar:** 61 (Observera att vi inte kan avrunda i två steg från svaret i
a-uppgiften, eftersom det då hade blivit 62.)

**c)** Siffran 6 är tiotalssiffran. Siffran *efter* sexan är 1, så sexan
behålls (och sedan fyller vi på med nollor).

**Svar:** 60
:::

## Värdesiffror

När vi löser uppgifter som beskriver verkliga situationer behöver vi ofta
avrunda. Ett mått på hur noggrant ett närmevärde är kallas **värdesiffror**
eller **gällande siffror**, och det styr hur mycket vi ska avrunda ett svar.

Jämför meningarna "brädan är 4 meter" och "brädan är 4,00 meter". Även om 4
och 4,00 är samma tal, så indikerar 4,00 att vi har mätt brädan noggrannare.
4,00 har fler värdesiffror!

::: formel "Antal värdesiffror i ett tal"
Den första värdesiffran är den första siffran i ett tal som inte är 0. Den
sista värdesiffran är den sista siffran i talet. Nollor i slutet av heltal
måste inte vara värdesiffror — det beror på om det är avrundningsnollor
eller inte.
:::

Några exempel:

| Tal | Antal värdesiffror |
| --- | --- |
| 0,0238 | 3 |
| 0,02380 | 4 |
| 4 | 1 |
| 4,00 | 3 |
| 68 | 2 |
| 6 800 | 2, 3 eller 4 |

::: formel "Antal värdesiffror i ett svar"
Vid

- **multiplikation och division** gäller att värdet med minsta antalet
  värdesiffror ger antalet **värdesiffror** i svaret (vanligast)
- **addition och subtraktion** gäller att värdet med minsta antalet
  decimaler ger antalet **decimaler** i svaret.
:::

::: exempel "Exempel 2 — Värdesiffror vid multiplikation"
**Framsidan av en bok är 19,5 cm × 24 cm. Bestäm framsidans area.**

$$
\text{area} = \text{bas} \cdot \text{höjd} = 19{,}5 \cdot 24 = 468\ \mathrm{cm^2}
$$

Vi har räknat multiplikation, så vi tittar på antalet värdesiffror. 19,5
har *tre* värdesiffror och 24 har *två* värdesiffror. Vi avrundar till det
*minsta antalet* värdesiffror, dvs. till två värdesiffror:

$$
\text{area} = 468\ \mathrm{cm^2} \approx 470\ \mathrm{cm^2}
$$

**Svar:** $470\ \mathrm{cm^2}$
:::

::: exempel "Exempel 3 — Decimaler vid subtraktion"
**Du har en bräda som är 1,73 meter och sågar av 1,3 meter. Hur lång är
brädbiten som är kvar?**

$$
\text{brädbitens längd} = 1{,}73\ \mathrm{m} - 1{,}3\ \mathrm{m} = 0{,}43\ \mathrm{m}
$$

Vi har räknat subtraktion, så vi tittar på antalet decimaler. 1,73 har
*två* decimaler och 1,3 har *en* decimal. Vi avrundar till det minsta
antalet decimaler, dvs. till en decimal.

**Svar:** 0,4 m
:::

---
id: ma2c-5.1
title: Exponential- och potensekvationer
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.1'
---

# Exponential- och potensekvationer

## Potensekvationer

En ekvation där variabeln, oftast $x$, är i **basen** ("$x$ upphöjt
till något") kallas **potensekvation**. Dessa kan lösas med två
algebraiska metoder — antingen med potenslagar eller med rotuttryck.

::: exempel "Exempel 1 — Lös potensekvationen"
**Lös potensekvationen $x^7 = 860$.**

**Metod 1: Med potenslagar.** Vi upphöjer båda led till $\frac{1}{7}$:

$$
x = 860^{1/7} \approx 2{,}63 \quad \text{(slås på räknaren)}
$$

**Metod 2: Med rotuttryck.** Vi drar sjunde roten ur båda led:

$$
x = \sqrt[7]{860} \approx 2{,}63 \quad \text{(slås på räknaren)}
$$

**Svar:** $x \approx 2{,}63$

**OBS!** Om exponenten är **jämn** får ekvationen två lösningar — en
positiv och en negativ. Då ska $\pm$ placeras framför
rottecknet/lösningen.
:::

En potensfunktion i generell form skrivs $y = C \cdot x^a$.

## Exponentialekvationer

En ekvation där variabeln, oftast $x$, är i **exponenten** ("något
upphöjt till $x$") kallas **exponentialekvation**. Dessa har vi ingen
algebraisk metod för att lösa — än. Dessa löser vi då grafiskt, genom
att rita upp båda led i ekvationen och ta fram skärningens
$x$-koordinat.

En exponentialfunktion i generell form skrivs $y = C \cdot a^x$.

::: tips "Tillämpningar"
Vid tillämpningar där vi har en **exponentiell förändring**, t.ex. där
något ändras med en viss procentsats per år, kan vi ställa upp en
ekvation på formen

$$
y = C \cdot a^x
$$

där

- $y$ = värdet efter ett visst antal förändringar (ofta efter en viss
  tid)
- $C$ = ursprungliga värdet
- $a$ = förändringsfaktorn
- $x$ = antal förändringar (ofta tid)
:::

::: exempel "Exempel 2 — Aktier"
**Du köper aktier för 12 000 kr.**

I b-uppgiften kommer vi att lösa en exponentialekvation grafiskt —
grafen nedan visar uppritningen med skärningspunkten A.

::: figur
<svg viewBox="-14 4 226 196" width="226" height="196" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En exponentialkurva som startar vid 12 000 och stiger, och en vågrät linje vid 50 000. De skär varandra vid x ungefär 8,8."><line x1="66" y1="12" x2="66" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="102" y1="12" x2="102" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="138" y1="12" x2="138" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="174" y1="12" x2="174" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="120" x2="200" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="70" x2="200" y2="70" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="20" x2="200" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="170" x2="205" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,170 203,165.5 203,174.5" fill="#1f2530"/><line x1="30" y1="178" x2="30" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="30,6 25.5,16 34.5,16" fill="#1f2530"/><text x="211" y="188" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="39" y="16" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="66" y="184" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="102" y="184" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="138" y="184" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="174" y="184" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="-12" y="124" font-size="10" text-anchor="start" fill="#1f2530">20 000</text><text x="-12" y="74" font-size="10" text-anchor="start" fill="#1f2530">40 000</text><text x="-12" y="24" font-size="10" text-anchor="start" fill="#1f2530">60 000</text><line x1="22" y1="45" x2="200" y2="45" stroke="#4a7d3a" stroke-width="2"/><path d="M 30,140 L 39,137.5 L 48,134.7 L 57,131.7 L 66,128.5 L 75,125 L 84,121.2 L 93,117.1 L 102,112.6 L 111,107.8 L 120,102.5 L 129,96.8 L 138,90.6 L 147,83.9 L 156,76.7 L 165,68.8 L 174,60.3 L 183,51 L 192,40.9" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="188.4" cy="45" r="3.5" fill="#c8324a"/><text x="182" y="36" font-size="12" text-anchor="end" fill="#c8324a">A</text></svg>
:::

**a) 5 år senare säljer du dem för 27 000 kr. Hur stor genomsnittlig årlig ökning i procent motsvarar det?&emsp;&emsp;b) Om ökningen fortsätter på samma sätt, hur lång tid efter inköpet är de värda 50 000 kr?**

**a)** Vi ska beräkna en procentuell förändring, så vi ställer upp
formeln

$$
y = C \cdot a^x
$$

där vi söker förändringsfaktorn $a$. Vi sätter in våra kända värden:
$y = 27\,000$ (värdet efter en viss tid), $C = 12\,000$ (ursprungliga
värdet) och $x = 5$ (tid).

$$
27\,000 = 12\,000 \cdot a^5
$$

$$
\frac{27\,000}{12\,000} = a^5
$$

$$
2{,}25 = a^5
$$

Detta är en potensekvation:

$$
a = 2{,}25^{1/5} = \sqrt[5]{2{,}25} = 1{,}1760\ldots \approx 1{,}176
$$

Förändringsfaktorn är alltså ungefär 1,176, vilket motsvarar en ökning
med 17,6 % ($1{,}176 - 1 = 0{,}176 = 17{,}6\ \%$).

**Svar:** 17,6 %

**b)** Vi ska beräkna efter hur lång tid aktierna har ett visst värde
med samma procentuella förändring. Vi ställer återigen upp formeln
$y = C \cdot a^x$, där vi söker tiden $x$. Vi sätter in våra kända
värden: $y = 50\,000$, $C = 12\,000$ och $a = 1{,}176$:

$$
50\,000 = 12\,000 \cdot 1{,}176^x
$$

Detta är en **exponentialekvation**. Vi ritar $y = 50\,000$ (uttrycket
i vänster led) och $y = 12\,000 \cdot 1{,}176^x$ (uttrycket i höger
led) med ett grafritande hjälpmedel och tar fram skärningens
$x$-koordinat — se grafen ovan.

Vi ser att skärningens $x$-koordinat är $x \approx 8{,}8$.

**Svar:** Efter ca 9 år.
:::

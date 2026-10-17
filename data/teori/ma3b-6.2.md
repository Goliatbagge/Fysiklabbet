---
id: ma3b-6.2
title: Geometriska talföljder
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.2'
---

# Geometriska talföljder

Du sätter in 10 000 kr på ett konto med räntan 5 %. Varje år multipliceras
beloppet med förändringsfaktorn 1,05, och behållningen år för år blir

$$
10\,000,\ 10\,500,\ 11\,025,\ 11\,576{,}25,\ \ldots
$$

Varje element är det föregående gånger samma tal. Det är precis vad som
kännetecknar en geometrisk talföljd, som vi mötte i förra avsnittet.

## Kvoten

I en **geometrisk talföljd** fås varje element genom att det föregående
multipliceras med samma tal, **kvoten** $k$. Kvoten får vi genom att
dividera ett element med elementet före:

$$
k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2} = \ldots
$$

I talföljden ovan är $k = \dfrac{10\,500}{10\,000} = 1{,}05$. Kvoten är
alltså samma tal som förändringsfaktorn.

## Formel för det *n*:te elementet

För att komma från $a_1$ till $a_n$ multiplicerar vi med kvoten en gång för
varje steg. Det ger en sluten formel för elementen.

::: formel "Det $n$:te elementet i en geometrisk talföljd"
$$
a_n = a_1 \cdot k^{n-1}
$$

där

- $a_n$ = element nummer $n$
- $a_1$ = första element
- $k$ = kvot
- $n$ = ordningsnummer

::: härledning "Härledning — Varför exponenten är $n - 1$"
Varje steg framåt i talföljden är en multiplikation med $k$:

$$
a_2 = a_1 \cdot k
$$

$$
a_3 = a_2 \cdot k = a_1 \cdot k \cdot k = a_1 \cdot k^2
$$

$$
a_4 = a_3 \cdot k = a_1 \cdot k^2 \cdot k = a_1 \cdot k^3
$$

Exponenten är hela tiden ett mindre än ordningsnumret, eftersom det första
elementet inte har multiplicerats med $k$ någon gång. Från $a_1$ till $a_n$
är det $n - 1$ steg, så

$$
a_n = a_1 \cdot k^{n-1}
$$
:::
:::

## Kvoten avgör hur talföljden beter sig

Figuren visar två geometriska talföljder ritade som punkter, med
ordningsnumret $n$ på den vågräta axeln.

::: figur
<svg viewBox="14 12 360 228" width="489" height="309" font-family="Poppins, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Två geometriska talföljder ritade som punkter i ett koordinatsystem med elementets nummer n på den vågräta axeln. De blå punkterna, med kvoten 1,5, börjar på 1 och växer allt snabbare. De röda punkterna, med kvoten 0,5, börjar på 8 och halveras varje steg mot noll."><line x1="46" y1="170" x2="353.2" y2="170" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="126" x2="353.2" y2="126" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="82" x2="353.2" y2="82" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="38" x2="353.2" y2="38" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="214" x2="361" y2="214" stroke="#1f2530" stroke-width="1.5"/><polygon points="361,209.5 370,214 361,218.5" fill="#1f2530"/><line x1="46" y1="214" x2="46" y2="25" stroke="#1f2530" stroke-width="1.5"/><polygon points="41.5,25 46,16 50.5,25" fill="#1f2530"/><line x1="94" y1="210" x2="94" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="94" y="233" font-size="13" text-anchor="middle" fill="#1f2530">1</text><line x1="142" y1="210" x2="142" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="142" y="233" font-size="13" text-anchor="middle" fill="#1f2530">2</text><line x1="190" y1="210" x2="190" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="190" y="233" font-size="13" text-anchor="middle" fill="#1f2530">3</text><line x1="238" y1="210" x2="238" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="238" y="233" font-size="13" text-anchor="middle" fill="#1f2530">4</text><line x1="286" y1="210" x2="286" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="286" y="233" font-size="13" text-anchor="middle" fill="#1f2530">5</text><line x1="334" y1="210" x2="334" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="334" y="233" font-size="13" text-anchor="middle" fill="#1f2530">6</text><line x1="42" y1="170" x2="50" y2="170" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="174.5" font-size="13" text-anchor="end" fill="#1f2530">2</text><line x1="42" y1="126" x2="50" y2="126" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="130.5" font-size="13" text-anchor="end" fill="#1f2530">4</text><line x1="42" y1="82" x2="50" y2="82" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="86.5" font-size="13" text-anchor="end" fill="#1f2530">6</text><line x1="42" y1="38" x2="50" y2="38" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="42.5" font-size="13" text-anchor="end" fill="#1f2530">8</text><text x="368" y="233" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">n</tspan></text><text x="55" y="25" font-size="14" fill="#1f2530"><tspan font-style="italic">a</tspan><tspan font-size="10" dy="3"><tspan font-style="italic">n</tspan></tspan></text><circle cx="94" cy="192" r="4.2" fill="#2b5ca8"/><circle cx="142" cy="181" r="4.2" fill="#2b5ca8"/><circle cx="190" cy="164.5" r="4.2" fill="#2b5ca8"/><circle cx="238" cy="139.8" r="4.2" fill="#2b5ca8"/><circle cx="286" cy="102.6" r="4.2" fill="#2b5ca8"/><circle cx="334" cy="46.9" r="4.2" fill="#2b5ca8"/><rect x="90.2" y="34.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="138.2" y="122.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="186.2" y="166.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="234.2" y="188.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="282.2" y="199.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="330.2" y="204.7" width="7.6" height="7.6" fill="#b5452e"/><text x="324" y="51.9" font-size="13" text-anchor="end" fill="#2b5ca8"><tspan font-style="italic">k</tspan> = 1,5 (växande)</text><text x="106" y="65" font-size="13" fill="#b5452e"><tspan font-style="italic">k</tspan> = 0,5 (avtagande)</text></svg>

De blå punkterna har $a_1 = 1$ och $k = 1{,}5$. De röda har $a_1 = 8$ och $k = 0{,}5$.
:::

- Är $k > 1$ **växer** elementen, och de växer allt snabbare.
- Är $0 < k < 1$ **avtar** elementen och närmar sig 0, utan att någonsin
  bli 0.
- Är $k$ negativ **växlar** elementen tecken. Med $a_1 = 1$ och $k = -2$
  blir talföljden $1, -2, 4, -8, 16, \ldots$

::: exempel "Exempel 1 — Bestäm ett element"
**Talföljden $3,\ 6,\ 12,\ 24,\ \ldots$ är geometrisk.<br>a) Bestäm en sluten formel för $a_n$.<br>b) Bestäm $a_{10}$.**

::: handskrift
typ: geomelement
:::

::: textlosning
**a)** Vi bestämmer kvoten genom att dividera ett element med elementet
före.

$$
k = \frac{a_2}{a_1} = \frac{6}{3} = 2
$$

Med $a_1 = 3$ och $k = 2$ ger formeln $a_n = a_1 \cdot k^{n-1}$

$$
a_n = 3 \cdot 2^{n-1}
$$

**Svar:** $a_n = 3 \cdot 2^{n-1}$

**b)** Vi sätter in $n = 10$ i formeln från a).

$$
a_{10} = 3 \cdot 2^{10-1} = 3 \cdot 2^9 = 3 \cdot 512 = 1\,536
$$

**Svar:** $a_{10} = 1\,536$
:::
:::

## Kvoten ur två element som inte står bredvid varandra

Känner vi två element som står längre isär kan vi ändå bestämma kvoten.
Från $a_2$ till $a_5$ är det tre steg, så $a_5 = a_2 \cdot k^3$. Antalet
steg är skillnaden mellan ordningsnumren, $5 - 2 = 3$.

::: exempel "Exempel 2 — Kvoten ur två element"
**I en geometrisk talföljd är $a_2 = 12$ och $a_5 = 324$. Bestäm kvoten $k$ och det första elementet $a_1$.**

::: handskrift
typ: geomkvot
:::

::: textlosning
Från $a_2$ till $a_5$ multipliceras med $k$ tre gånger, så

$$
a_5 = a_2 \cdot k^3
$$

Insättning av $a_2 = 12$ och $a_5 = 324$ ger en ekvation för $k$.

$$
324 = 12 \cdot k^3
$$

Vi dividerar båda led med 12.

$$
27 = k^3
$$

Kvoten är det tal som upphöjt till 3 blir 27, alltså tredjeroten ur 27.

$$
k = \sqrt[3]{27}
$$

$$
k = 3
$$

Det första elementet står ett steg före $a_2$, så vi dividerar $a_2$ med
kvoten.

$$
a_1 = \frac{a_2}{k} = \frac{12}{3} = 4
$$

Kontroll: $a_5 = 4 \cdot 3^4 = 4 \cdot 81 = 324$. Det stämmer.

**Svar:** $k = 3$ och $a_1 = 4$
:::
:::

## Procentuell förändring år efter år

Ett belopp som ändras med samma procentsats varje år bildar en geometrisk
talföljd där kvoten är förändringsfaktorn. En lön på 28 000 kr som höjs med
3 % per år blir

$$
28\,000,\ 28\,000 \cdot 1{,}03,\ 28\,000 \cdot 1{,}03^2,\ \ldots
$$

Lönen år $n$ är alltså $a_n = 28\,000 \cdot 1{,}03^{n-1}$. Lägg märke till
exponenten: första årets lön har inte höjts någon gång, så lönen år 8 har
höjts 7 gånger.

Ska vi ta reda på **när** elementen passerar ett visst värde står den
okända $n$ i exponenten. Då logaritmerar vi båda led, precis som när
exponentialekvationer löstes med lg i Matematik nivå 2.

::: exempel "Exempel 3 — Lönen som växer"
**Elin har 28 000 kr i månadslön sitt första år på ett nytt jobb. Lönen höjs med 3 % varje år.<br>a) Hur stor är månadslönen år 8?<br>b) Vilket år blir månadslönen för första gången högre än 40 000 kr?**

::: handskrift
typ: geomlon
:::

::: textlosning
**a)** Lönerna bildar en geometrisk talföljd med $a_1 = 28\,000$ och
kvoten $k = 1{,}03$, som är förändringsfaktorn för en ökning med 3 %.

$$
a_n = 28\,000 \cdot 1{,}03^{n-1}
$$

År 8 har lönen höjts 7 gånger.

$$
a_8 = 28\,000 \cdot 1{,}03^7 = 34\,436{,}468\ldots \approx 34\,436
$$

**Svar:** Cirka 34 436 kr

**b)** Vi tar först reda på när lönen är exakt 40 000 kr.

$$
28\,000 \cdot 1{,}03^{n-1} = 40\,000
$$

Vi dividerar båda led med 28 000.

$$
1{,}03^{n-1} = 1{,}428\,571\ldots
$$

Den okända står i exponenten, så vi logaritmerar båda led.

$$
\lg 1{,}03^{n-1} = \lg 1{,}428\,571\ldots
$$

Logaritmlagen flyttar ned exponenten framför logaritmen.

$$
(n - 1) \cdot \lg 1{,}03 = \lg 1{,}428\,571\ldots
$$

Vi dividerar båda led med $\lg 1{,}03$.

$$
n - 1 = \frac{\lg 1{,}428\,571\ldots}{\lg 1{,}03} = 12{,}066\ldots
$$

$$
n = 13{,}066\ldots
$$

Lönen höjs bara en gång per år. År 13 är den
$28\,000 \cdot 1{,}03^{12} \approx 39\,921$ kr, alltså fortfarande under
40 000 kr, och år 14 är den $28\,000 \cdot 1{,}03^{13} \approx 41\,119$ kr.

**Svar:** År 14
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Geometrisk talföljd"
- Varje element är det föregående gånger **kvoten** $k$.
- $k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2}$
- $3, 6, 12, 24, \ldots$ har kvoten $k = 2$.
:::

::: sampunkt "Det $n$:te elementet"
- $a_n = a_1 \cdot k^{n-1}$
- Exponenten är $n - 1$: från $a_1$ till $a_n$ är det $n - 1$ steg.
- $a_{10} = 3 \cdot 2^9 = 1\,536$
:::

::: sampunkt "Kvoten ur två element"
- Från $a_2$ till $a_5$ är det tre steg: $a_5 = a_2 \cdot k^3$.
- $324 = 12 \cdot k^3$ ger $k^3 = 27$ och $k = \sqrt[3]{27} = 3$.
:::

::: sampunkt "Procent och tid"
- Ändras ett belopp med samma procentsats är kvoten **förändringsfaktorn**.
- Söks $n$: logaritmera båda led och lös ut $n$.
- Ger ekvationen $n = 13{,}07$ passeras värdet först **år 14**.
:::
:::

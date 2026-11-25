---
id: ma1c-4.A
title: Avancerade exempel
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.A'
---

# Avancerade exempel

De här exemplen är på nivån **Avancerad**. Det som gör en uppgift avancerad
är sällan att räkningen är lång. Det är att vägen inte är given: innan du
kan börja räkna måste du se hur uppgiften hänger ihop. Ofta är det något av
det här:

- **Fler än ett svar**, där det är lätt att missa det andra.
- **En funktion med okända konstanter**, som måste bestämmas ur ett samband
  där *x* också finns med.
- **Tal som är för stora** för räknaren, så att de måste skrivas om innan de
  kan jämföras.
- **En fälla**, där det som ser självklart ut inte stämmer.

Läs uppgiften och försök först själv. Fundera på vad som är okänt och hur
det du vet kan skrivas på ett annat sätt. Titta sedan på lösningen.

## Räta linjer

*Bygger på avsnitt 4.3 Från ekvation till graf och avsnitt 4.5 Räta linjens ekvation.*

::: exempel "Exempel 1: En triangel med given area (Avancerad)"
**Linjen $y = kx + 6$ bildar tillsammans med koordinataxlarna en triangel med arean 12 areaenheter. Bestäm alla möjliga värden på $k$.**

::: handskrift
typ: triangellinje
:::

::: textlosning
Linjen skär *y*-axeln i punkten $(0, 6)$, eftersom $m = 6$. Triangelns räta
vinkel ligger i origo, så höjden är 6. Basen ligger längs *x*-axeln, och vi
kallar den *b*.

$$
\frac{b \cdot 6}{2} = 12
$$

$$
3b = 12
$$

Vi dividerar båda led med 3.

$$
\frac{3b}{\boldsymbol{3}} = \frac{12}{\boldsymbol{3}}
$$

$$
b = 4
$$

Basen är alltså 4 längdenheter. Den kan gå åt höger från origo, men den kan
också gå åt **vänster**. Linjen skär därför *x*-axeln antingen i $(4, 0)$
eller i $(-4, 0)$.

::: figur
<svg viewBox="0 0 280 224" width="442" height="354" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, sans-serif" fill="#0f1620">
<polygon points="140,184 236,184 140,40" fill="#1f5fa8" fill-opacity="0.12"/>
<polygon points="140,184 44,184 140,40" fill="#1f5fa8" fill-opacity="0.12"/>
<line x1="14" y1="184" x2="260" y2="184" stroke="#38bdf8" stroke-width="1.6"/>
<polygon points="268,184 259,179.5 259,188.5" fill="#38bdf8"/>
<line x1="140" y1="212" x2="140" y2="18" stroke="#38bdf8" stroke-width="1.6"/>
<polygon points="140,10 135.5,19 144.5,19" fill="#38bdf8"/>
<line x1="28" y1="208" x2="152" y2="22" stroke="#1f5fa8" stroke-width="2.2"/>
<line x1="252" y1="208" x2="128" y2="22" stroke="#1f5fa8" stroke-width="2.2"/>
<circle cx="140" cy="40" r="3"/>
<circle cx="44" cy="184" r="3"/>
<circle cx="236" cy="184" r="3"/>
<text x="165" y="45" font-size="12">(0, 6)</text>
<text x="52" y="201" font-size="12">(−4, 0)</text>
<text x="228" y="201" font-size="12" text-anchor="end">(4, 0)</text>
<text x="266" y="174" font-size="12" font-style="italic" text-anchor="end">x</text>
<text x="160" y="18" font-size="12" font-style="italic">y</text>
</svg>
:::

Vi beräknar riktningskoefficienten för linjen genom $(0, 6)$ och $(4, 0)$.

$$
k = \frac{0 - 6}{4 - 0} = -\frac{6}{4} = -1{,}5
$$

Vi gör likadant för linjen genom $(0, 6)$ och $(-4, 0)$.

$$
k = \frac{0 - 6}{-4 - 0} = \frac{6}{4} = 1{,}5
$$

**Svar:** $k = -1{,}5$ och $k = 1{,}5$
:::
:::

## Funktioner

*Bygger på avsnittet Funktion och funktionsvärde.*

::: exempel "Exempel 2: En skillnad mellan funktionsvärden (Avancerad)"
**För en linjär funktion $f$ gäller att $f(x + 2) - f(x) = 6$ och $f(3) = 4$. Bestäm $f(x)$.**

::: handskrift
typ: skillnadfunktion
:::

::: textlosning
Funktionen är linjär, så vi kan skriva den som

$$
f(x) = kx + m
$$

Vi ersätter *x* med $x + 2$ och multiplicerar in *k* i parentesen.

$$
f(x + 2) = k(x + 2) + m
$$

$$
f(x + 2) = kx + 2k + m
$$

Skillnaden mellan funktionsvärdena är

$$
f(x + 2) - f(x) = kx + 2k + m - (kx + m)
$$

Minustecknet framför parentesen byter tecken på båda termerna. Sedan tar
$kx$ och $m$ ut varandra.

$$
f(x + 2) - f(x) = kx + 2k + m - kx - m
$$

$$
f(x + 2) - f(x) = 2k
$$

Skillnaden ska vara 6.

$$
2k = 6
$$

Vi dividerar båda led med 2.

$$
\frac{2k}{\boldsymbol{2}} = \frac{6}{\boldsymbol{2}}
$$

$$
k = 3
$$

Det betyder att $f(x) = 3x + m$. Vi använder att $f(3) = 4$.

$$
3 \cdot 3 + m = 4
$$

$$
9 + m = 4
$$

Vi subtraherar 9 från båda led.

$$
9 + m \mathbin{\boldsymbol{-}} \boldsymbol{9} = 4 \mathbin{\boldsymbol{-}} \boldsymbol{9}
$$

$$
m = -5
$$

**Svar:** $f(x) = 3x - 5$
:::
:::

::: exempel "Exempel 3: Funktionen av sig själv (Avancerad)"
**För en linjär funktion $f$ gäller att $f(f(x)) = 9x + 8$ för alla $x$. Bestäm alla möjliga funktioner $f$.**

::: handskrift
typ: funktionavsigsjalv
:::

::: textlosning
Funktionen är linjär, så vi kan skriva den som

$$
f(x) = kx + m
$$

I $f(f(x))$ står $f(x)$ på platsen för *x*. Vi ersätter därför *x* med $f(x)$,
alltså med $kx + m$.

$$
f(f(x)) = k \cdot f(x) + m
$$

$$
f(f(x)) = k(kx + m) + m
$$

$$
f(f(x)) = k^2x + km + m
$$

Detta ska vara lika med $9x + 8$ för alla *x*.

$$
k^2x + km + m = 9x + 8
$$

Då måste talet framför *x* vara lika i båda leden, och det som är utan *x*
måste också vara lika.

$$
\begin{cases}
k^2 = 9 & (1) \\[4pt]
km + m = 8 & (2)
\end{cases}
$$

Ur ekvation (1) fås

$$
k = \pm\sqrt{9}
$$

$$
k = \pm 3
$$

**Fall 1:** $k = 3$ i ekvation (2), $km + m = 8$, ger

$$
3m + m = 8
$$

$$
4m = 8
$$

Vi dividerar båda led med 4.

$$
\frac{4m}{\boldsymbol{4}} = \frac{8}{\boldsymbol{4}}
$$

$$
m = 2
$$

**Fall 2:** $k = -3$ i ekvation (2), $km + m = 8$, ger

$$
-3m + m = 8
$$

$$
-2m = 8
$$

Vi dividerar båda led med $-2$.

$$
\frac{-2m}{\boldsymbol{-2}} = \frac{8}{\boldsymbol{-2}}
$$

$$
m = -4
$$

**Svar:** $f(x) = 3x + 2$ och $f(x) = -3x - 4$
:::
:::

## Exponentialfunktioner och potenser

*Bygger på avsnittet Exponentialfunktioner.*

::: exempel "Exempel 4: Läkemedel i kroppen (Avancerad)"
**Mängden av ett läkemedel i kroppen minskar exponentiellt. På 10 timmar minskar mängden med 75 %. Med hur många procent minskar mängden på<br>a) 5 timmar&emsp;&emsp;b) 1 timme?**

::: handskrift
typ: lakemedel
:::

::: textlosning
**a)** Halva tiden ger **inte** halva minskningen, för varje timme
minskar mängden med samma andel av det som är kvar. Vi räknar i stället med
förändringsfaktorer.

Låt *a* vara förändringsfaktorn för 1 timme. På 10 timmar används den 10
gånger. Minskningen 75 % motsvarar förändringsfaktorn $1 - 0{,}75 = 0{,}25$.

$$
a^{10} = 0{,}25
$$

Förändringsfaktorn för 5 timmar är $a^5$. Den används två gånger på 10
timmar, så vi skriver om $a^{10}$ som en kvadrat.

$$
(a^5)^2 = 0{,}25
$$

Vi drar roten ur båda led.

$$
a^5 = \pm\sqrt{0{,}25}
$$

$$
a^5 = \pm 0{,}5
$$

En förändringsfaktor kan inte vara negativ, så $a^5 = 0{,}5$. Minskningen är

$$
1 - 0{,}5 = 0{,}5 = 50\ \%
$$

**Svar:** 50 %

**b)** Nu söker vi *a* själv, alltså förändringsfaktorn för 1 timme.

$$
a^{10} = 0{,}25
$$

Vi drar tionderoten ur båda led. Det är detsamma som att upphöja båda led
till $\dfrac{1}{10}$, och *a* är positiv.

$$
a = 0{,}25^{\frac{1}{10}} = 0{,}870\ldots
$$

Minskningen är

$$
1 - 0{,}870\ldots = 0{,}129\ldots \approx 13\ \%
$$

**Svar:** 13 %
:::
:::

*Bygger på avsnitt 1.6 Potenser med positiva heltalsexponenter och avsnitt 2.11 Olikheter.*

::: exempel "Exempel 5: Jämföra stora potenser (Avancerad)"
**a) Ordna talen $2^{100}$, $3^{75}$ och $5^{50}$ i storleksordning utan räknare.<br>b) Bestäm det största heltalet $n$ som uppfyller $n^{200} < 5^{300}$.**

::: handskrift
typ: storapotenser
:::

::: textlosning
**a)** Talen är för stora för att räknas ut, men de kan jämföras om de får
samma exponent. Exponenterna 100, 75 och 50 är alla delbara med 25, så vi
skriver om med potenslagen $(a^m)^n = a^{m \cdot n}$.

$$
2^{100} = 2^{4 \cdot 25} = (2^4)^{25} = 16^{25}
$$

$$
3^{75} = 3^{3 \cdot 25} = (3^3)^{25} = 27^{25}
$$

$$
5^{50} = 5^{2 \cdot 25} = (5^2)^{25} = 25^{25}
$$

Nu har alla tre talen exponenten 25. Med samma exponent blir potensen
större när basen är större, och $16 < 25 < 27$.

$$
16^{25} < 25^{25} < 27^{25}
$$

**Svar:** $2^{100} < 5^{50} < 3^{75}$

**b)** Samma idé, men nu är det största gemensamma talet i exponenterna 200
och 300 talet 100.

$$
n^{200} = n^{2 \cdot 100} = (n^2)^{100}
$$

$$
5^{300} = 5^{3 \cdot 100} = (5^3)^{100} = 125^{100}
$$

Olikheten blir

$$
(n^2)^{100} < 125^{100}
$$

Med samma exponent räcker det att jämföra baserna.

$$
n^2 < 125
$$

Vi prövar heltal. $11^2 = 121 < 125$, men $12^2 = 144 > 125$.

**Svar:** $n = 11$
:::
:::

::: tips "Följdfråga"
Vilket är störst av $2^{300}$ och $3^{200}$?
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Linje och area"
- Linjen $y = kx + m$ skär *y*-axeln i $(0, m)$.
- Triangelns höjd och bas ligger längs axlarna.
- Basen kan gå åt höger eller åt vänster. Det ger två värden på $k$.
:::

::: sampunkt "Okänd linjär funktion"
- Skriv $f(x) = kx + m$ och sätt in i sambandet.
- $f(x + 2) - f(x) = 2k$, vilket $x$ du än väljer.
- Lika för alla $x$: talen framför $x$ är lika, och resten är lika.
:::

::: sampunkt "Exponentiell förändring"
- Halva tiden ger inte halva minskningen.
- Kalla förändringsfaktorn för en timme $a$. Då är den $a^5$ på 5 timmar.
- Skriv om: $a^{10} = (a^5)^2$.
:::

::: sampunkt "Jämföra stora potenser"
- Skriv om till samma exponent: $(a^m)^n = a^{m \cdot n}$.
- Samma exponent och positiva baser: störst bas ger störst potens.
- Välj största gemensamma delaren till exponenterna.
:::
:::

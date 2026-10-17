---
id: ma3b-6.3
title: Nuvärde
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.3'
---

# Nuvärde

Skulle du hellre vilja ha 10 000 kr i dag eller 10 000 kr om fem år? De
flesta väljer pengarna i dag, och det finns ett matematiskt skäl till det.
Pengar man har i dag kan sättas in på ett konto och växa med ränta. Om fem
år har de blivit mer än 10 000 kr. Ett belopp som betalas ut i framtiden är
därför värt **mindre** än samma belopp i dag. I det här avsnittet räknar vi
ut hur mycket mindre.

## Slutvärde

Sätter vi in ett belopp på ett konto med räntan 4 % multipliceras det med
förändringsfaktorn 1,04 varje år. Efter $n$ år har det multiplicerats med
$1{,}04^n$. Beloppet efter $n$ år kallas **slutvärdet**.

::: formel "Slutvärde"
$$
{B = N \cdot \text{förändringsfaktor}^{\,n}}
$$

där

- $B$ = belopp efter $n$ år (slutvärde)
- $N$ = belopp i dag
- $n$ = antal år
:::

10 000 kr med räntan 4 % växer på fem år till
$10\,000 \cdot 1{,}04^5 \approx 12\,167$ kr. Beloppen år för år bildar en
geometrisk talföljd med kvoten 1,04.

## Nuvärde

Nu vänder vi på frågan. Ett belopp $B$ betalas ut om $n$ år. Hur stort
belopp skulle vi behöva sätta in i dag för att det ska ha växt till $B$ när
det betalas ut? Det beloppet kallas **nuvärdet** av $B$. Vi får det genom
att **dividera** med förändringsfaktorn i stället för att multiplicera.

::: formel "Nuvärde"
$$
{N = \frac{B}{\text{förändringsfaktor}^{\,n}}}
$$

där

- $N$ = nuvärde
- $B$ = belopp som betalas ut om $n$ år
- $n$ = antal år

::: härledning "Härledning — Nuvärdet ur slutvärdet"
Nuvärdet $N$ är det belopp som efter $n$ år har vuxit till $B$:

$$
{N \cdot \text{förändringsfaktor}^{\,n} = B}
$$

Vi dividerar båda led med $\text{förändringsfaktor}^{\,n}$ och får

$$
{N = \frac{B}{\text{förändringsfaktor}^{\,n}}}
$$
:::
:::

Vid räntan 4 % är 12 167 kr om fem år alltså värt
$\dfrac{12\,167}{1{,}04^5} \approx 10\,000$ kr i dag. Räntan man räknar med
kallas ofta **kalkylränta**. Ju högre räntan är, desto mindre är ett
framtida belopp värt i dag, och desto mindre är det värt ju längre bort
utbetalningen ligger.

::: exempel "Exempel 1 — Arvet"
**Max ska få ett arv på 200 000 kr om 6 år. Vad är arvet värt i dag om vi räknar med räntan 3 %?**

::: handskrift
typ: nuvardearv
:::

::: textlosning
Vi söker nuvärdet av 200 000 kr som betalas ut om 6 år. Förändringsfaktorn
för räntan 3 % är 1,03.

$$
{N = \frac{B}{\text{förändringsfaktor}^{\,n}} = \frac{200\,000}{1{,}03^6}}
$$

$$
N = 167\,496{,}851\ldots \approx 167\,497
$$

Rimlighet: arvet är värt mindre i dag än när det betalas ut, och 3 % per
år i sex år motsvarar ungefär 19 %.

**Svar:** Cirka 167 497 kr
:::
:::

## Jämföra erbjudanden

Belopp som betalas ut vid olika tidpunkter går inte att jämföra direkt.
Räknar vi om dem till nuvärden står de på samma tidpunkt, i dag, och då kan
vi se vilket som är värt mest.

::: exempel "Exempel 2 — Nu eller senare?"
**Du har vunnit en tävling och får välja mellan 100 000 kr nu och 120 000 kr om 4 år. Vilket alternativ är mest värt om räntan är<br>a)&nbsp;4 %&emsp;&emsp;b)&nbsp;6 %**

::: handskrift
typ: nuellersenare
:::

::: textlosning
Vi räknar ut nuvärdet av 120 000 kr som betalas ut om 4 år och jämför med
100 000 kr i dag.

**a)** Förändringsfaktorn är 1,04.

$$
N = \frac{120\,000}{1{,}04^4} = 102\,576{,}502\ldots \approx 102\,577
$$

Nuvärdet är större än 100 000 kr.

**Svar:** 120 000 kr om 4 år är mest värt.

**b)** Förändringsfaktorn är 1,06.

$$
N = \frac{120\,000}{1{,}06^4} = 95\,051{,}239\ldots \approx 95\,051
$$

Nu är nuvärdet mindre än 100 000 kr.

**Svar:** 100 000 kr nu är mest värt.

Vilket alternativ som är bäst beror alltså på räntan. Med hög ränta växer
pengarna snabbt på kontot, och då lönar det sig att få dem tidigt.
:::
:::

## Flera framtida utbetalningar

Betalas ett belopp ut vid flera tillfällen räknar vi ut nuvärdet av varje
utbetalning för sig och adderar nuvärdena. Varje utbetalning divideras med
förändringsfaktorn upphöjd till antalet år tills just den betalas ut.

::: exempel "Exempel 3 — Vinsten som betalas ut i delar"
**En vinst betalas ut som 50 000 kr om 1 år, 50 000 kr om 2 år och 50 000 kr om 3 år. Vad är vinsten värd i dag om vi räknar med räntan 5 %?**

::: handskrift
typ: nuvardeflera
:::

::: textlosning
Vi räknar ut nuvärdet av varje utbetalning. Förändringsfaktorn är 1,05.

$$
\frac{50\,000}{1{,}05} = 47\,619{,}047\ldots
$$

$$
\frac{50\,000}{1{,}05^2} = 45\,351{,}473\ldots
$$

$$
\frac{50\,000}{1{,}05^3} = 43\,191{,}879\ldots
$$

Vinstens nuvärde är summan av de tre nuvärdena.

$$
N = 47\,619{,}047\ldots + 45\,351{,}473\ldots + 43\,191{,}879\ldots = 136\,162{,}401\ldots \approx 136\,162
$$

Rimlighet: utbetalningarna är tillsammans 150 000 kr, och eftersom alla
ligger i framtiden är vinsten värd mindre än så i dag.

**Svar:** Cirka 136 162 kr
:::
:::

Nuvärdena $\dfrac{50\,000}{1{,}05}$, $\dfrac{50\,000}{1{,}05^2}$ och
$\dfrac{50\,000}{1{,}05^3}$ bildar en geometrisk talföljd, där varje
element är det föregående dividerat med 1,05. Kvoten är alltså
$\dfrac{1}{1{,}05}$. Med många utbetalningar blir det mödosamt att
räkna ut varje nuvärde för sig. I nästa avsnitt tar vi fram en formel för
summan av en geometrisk talföljd, och med den går det att räkna ut nuvärdet
av till exempel 20 års utbetalningar på en rad.

::: sammanfattning "Sammanfattning"

::: sampunkt "Pengar i dag är värda mer"
- Pengar i dag kan sättas in och **växa med ränta**.
- Ett framtida belopp är därför värt **mindre** än samma belopp i dag.
:::

::: sampunkt "Slutvärde och nuvärde"
- Slutvärde: $B = N \cdot \text{förändringsfaktor}^{\,n}$
- Nuvärde: $N = \dfrac{B}{\text{förändringsfaktor}^{\,n}}$
- 200 000 kr om 6 år vid 3 %: $\dfrac{200\,000}{1{,}03^6} \approx 167\,497$ kr.
:::

::: sampunkt "Jämföra erbjudanden"
- Räkna om alla belopp till **nuvärden** och jämför dem.
- Svaret beror på räntan: hög ränta gör tidiga pengar mer värda.
:::

::: sampunkt "Flera utbetalningar"
- Räkna ut **varje** utbetalnings nuvärde och addera.
- Nuvärdena bildar en geometrisk talföljd med kvoten $\dfrac{1}{\text{förändringsfaktor}}$.
:::
:::

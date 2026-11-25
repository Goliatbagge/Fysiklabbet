---
id: ma1c-3.A
title: Avancerade exempel
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.A'
---

# Avancerade exempel

De här exemplen är på nivån **Avancerad**. Det som gör en uppgift avancerad
är sällan att räkningen är lång. Det är att vägen inte är given: innan du
kan börja räkna måste du se hur uppgiften hänger ihop. Ofta är det något av
det här:

- **En storhet som inte behövs**, som varans pris.
- **En okänd förändringsfaktor** som används flera gånger och därför ger en
  potensekvation.
- **En lång summa** som går att räkna ut på ett smart sätt.

Läs uppgiften och försök först själv. Fundera på vad som är okänt och
vilka förändringsfaktorer som ska multipliceras. Titta sedan på lösningen.

## Upprepade förändringar

*Bygger på avsnitt 3.3 Upprepade procentuella förändringar och avsnitt 2.9 Enkla andra- och tredjegradsekvationer.*

::: exempel "Exempel 1: Två lika stora sänkningar (Avancerad)"
**Priset på en vara höjs med 60 %. Därefter sänks priset två gånger, med lika många procent varje gång. Efter den andra sänkningen är priset detsamma som från början. Med hur många procent sänktes priset varje gång?**

::: handskrift
typ: tvasankningar
:::

::: textlosning
Priset är inte givet, men det behövs inte. Priset är till slut detsamma som
från början, så den totala förändringsfaktorn är 1.

Höjningen har förändringsfaktorn 1,60. Vi kallar sänkningens
förändringsfaktor *x*. Den används två gånger.

$$
1{,}60 \cdot x \cdot x = 1
$$

$$
1{,}60x^2 = 1
$$

Vi dividerar båda led med 1,60.

$$
\frac{1{,}60x^2}{\boldsymbol{1{,}60}} = \frac{1}{\boldsymbol{1{,}60}}
$$

$$
x^2 = 0{,}625
$$

Vi drar roten ur båda led.

$$
x = \pm\sqrt{0{,}625}
$$

$$
x = \pm 0{,}790\ldots
$$

En förändringsfaktor kan inte vara negativ, så bara den positiva lösningen
är möjlig. Sänkningen är

$$
1 - 0{,}790\ldots = 0{,}209\ldots \approx 21\ \%
$$

**Svar:** 21 %
:::
:::

*Bygger på avsnitt 3.3 Upprepade procentuella förändringar och avsnitt 2.3 Multiplicera med parenteser.*

::: exempel "Exempel 2: Upp och ned med lika många procent (Avancerad)"
**Ett pris höjs med ett visst antal procent och sänks sedan med lika många procent.<br>a) Visa att priset alltid blir lägre än det var från början.<br>b) Efter de två ändringarna är priset 9 % lägre än från början. Hur många procent höjdes priset med?**

::: handskrift
typ: uppochned
:::

::: textlosning
**a)** Vi räknar med bokstäver, så att resultatet gäller alla procentsatser.
Låt *x* vara andelen i decimalform som priset höjs och sänks med. Då är $x > 0$.

Höjningen har förändringsfaktorn $1 + x$ och sänkningen $1 - x$. Den totala
förändringsfaktorn är

$$
(1 + x)(1 - x) = 1 - x + x - x^2 = 1 - x^2
$$

Eftersom $x > 0$ är $x^2 > 0$. Då är förändringsfaktorn
$1 - x^2 < 1 \Rightarrow$ priset blir lägre, vilket skulle visas.

**b)** Priset är 9 % lägre, så den totala förändringsfaktorn är
$1 - 0{,}09 = 0{,}91$. I a-uppgiften fick vi att den också är $1 - x^2$.

$$
1 - x^2 = 0{,}91
$$

Vi subtraherar 1 från båda led.

$$
1 - x^2 \mathbin{\boldsymbol{-}} \boldsymbol{1} = 0{,}91 \mathbin{\boldsymbol{-}} \boldsymbol{1}
$$

$$
-x^2 = -0{,}09
$$

Vi dividerar båda led med $-1$.

$$
\frac{-x^2}{\boldsymbol{-1}} = \frac{-0{,}09}{\boldsymbol{-1}}
$$

$$
x^2 = 0{,}09
$$

Vi drar roten ur båda led. Minustecknet står i parentes, eftersom den
negativa lösningen finns men inte är möjlig här: $x > 0$.

$$
x = \genfrac{}{}{0pt}{0}{+}{(-)}\sqrt{0{,}09}
$$

$$
x = \genfrac{}{}{0pt}{0}{+}{(-)}\,0{,}3
$$

$$
x = 0{,}3 = 30\ \%
$$

**Svar:** 30 %
:::
:::

## Lån

*Bygger på avsnittet Lån och ränteberäkningar.*

::: exempel "Exempel 3: Räntesatsen ur den totala räntan (Avancerad)"
**Nora lånar 240 000 kr. Lånet betalas av med rak amortering under 8 år, med en inbetalning i slutet av varje år. Räntesatsen är densamma hela tiden. Sammanlagt betalar Nora 43 200 kr i ränta. Bestäm räntesatsen.**

::: handskrift
typ: raklanranta
:::

::: textlosning
Amorteringen är lika stor varje år.

$$
\text{amortering} = \frac{240\,000}{8} = 30\,000\ \mathrm{kr}
$$

Skulden är 240 000 kr under det första året, 210 000 kr under det andra och
så vidare, ned till 30 000 kr under det åttonde och sista året. Vi kallar
räntesatsen i decimalform *r*. Varje års ränta är *r* gånger skulden, så
den totala räntan är

$$
r \cdot 240\,000 + r \cdot 210\,000 + \ldots + r \cdot 30\,000
$$

*r* är en faktor i varje term. Vi bryter ut *r*.

$$
r \cdot (240\,000 + 210\,000 + \ldots + 30\,000)
$$

Summan i parentesen har åtta termer. Den första och den sista är
tillsammans $240\,000 + 30\,000 = 270\,000$. Den andra och den näst sista
är också $210\,000 + 60\,000 = 270\,000$, och så fortsätter det. Det blir
fyra sådana par.

$$
4 \cdot 270\,000 = 1\,080\,000
$$

Den totala räntan är 43 200 kr.

$$
r \cdot 1\,080\,000 = 43\,200
$$

Vi dividerar båda led med 1 080 000.

$$
\frac{r \cdot 1\,080\,000}{\boldsymbol{1\,080\,000}} = \frac{43\,200}{\boldsymbol{1\,080\,000}}
$$

$$
r = 0{,}04 = 4\ \%
$$

**Svar:** 4 %
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Hitta vägen först"
- Kalla det okända för en bokstav och ställ upp en ekvation.
- Räkna med bokstäver när något ska visas för alla procentsatser.
- Pröva om lösningen är möjlig i verkligheten.
:::

::: sampunkt "Okänt pris"
- Priset behövs inte. Räkna med den totala förändringsfaktorn.
- 9 % lägre än från början: total förändringsfaktor 0,91.
- Samma värde som från början: total förändringsfaktor 1.
:::

::: sampunkt "Okänd förändringsfaktor"
- Samma förändring två gånger ger $x^2$.
- En förändringsfaktor kan inte vara negativ.
- Upp och ned med andelen $x$ i decimalform: $(1 + x)(1 - x) = 1 - x^2$, alltid mindre än 1.
:::

::: sampunkt "Ränta vid rak amortering"
- Skulden minskar lika mycket varje år.
- Bryt ut räntesatsen $r$ ur summan av alla årsräntor.
- Para ihop första och sista termen, andra och näst sista och så vidare.
:::
:::

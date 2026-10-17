---
id: ma3b-6.S
title: Sammanfattning
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.S'
---

# Sammanfattning: Geometrisk summa

Det här kapitlet handlade om talföljder, tal som står i en bestämd ordning.
Du har mött aritmetiska talföljder, där samma tal läggs till varje gång, och
geometriska talföljder, där varje element multipliceras med samma kvot. Den
geometriska talföljden beskriver allt som ändras med samma procentsats, och
därför användes den i privatekonomin: för nuvärde, regelbundet sparande och
annuitetslån. Du ska efter kapitlet kunna bestämma ett element och en summa i
en geometrisk talföljd, räkna ut nuvärdet av framtida belopp, beräkna
behållningen vid regelbundet sparande och bestämma annuiteten på ett lån.

## Begrepp att kunna

- **talföljd**: tal i en bestämd ordning; talen kallas **element**.
- **ordningsnummer** $n$: elementets plats i talföljden; $a_{\mathit{n}}$
  är element nummer $n$.
- **sluten formel**: ger elementet direkt ur ordningsnumret, till exempel
  $a_{\mathit{n}} = 4n - 1$.
- **rekursiv formel**: ger elementet ur det föregående, till exempel
  $a_{\mathit{n}+1} = a_{\mathit{n}} + 4$ med $a_1 = 3$.
- **aritmetisk talföljd**: samma tal, **differensen** $d$, läggs till varje
  gång.
- **geometrisk talföljd**: varje element multipliceras med samma tal,
  **kvoten** $k$.
- **geometrisk summa** $s_{\mathit{n}}$: summan av de $n$ första elementen i
  en geometrisk talföljd.
- **slutvärde**: vad ett belopp har vuxit till efter ett antal år med ränta.
- **nuvärde**: vad ett framtida belopp är värt i dag.
- **amortering**: den del av en betalning som betalar tillbaka själva lånet.
- **annuitet**: det lika stora belopp som betalas varje gång på ett
  **annuitetslån**; räntedelen minskar och amorteringen ökar med tiden.
- **rak amortering**: samma amortering varje gång, så att betalningen
  minskar med tiden.

## Formler

::: formel "Kapitlets formler"
**Aritmetisk talföljd**

$$
a_{\mathit{n}} = a_1 + (n - 1) \cdot d
$$

**Geometrisk talföljd**

$$
a_{\mathit{n}} = a_1 \cdot k^{n-1} \qquad \text{där} \qquad k = \frac{a_2}{a_1} = \frac{a_3}{a_2}
$$

**Geometrisk summa**

$$
s_{\mathit{n}} = \frac{a_1(k^n - 1)}{k - 1} \qquad (k \neq 1)
$$

**Slutvärde och nuvärde**

$$
B = N \cdot \text{förändringsfaktor}^{\,n} \qquad\qquad N = \frac{B}{\text{förändringsfaktor}^{\,n}}
$$

**Annuitet**

$$
A = \frac{G \cdot k^n \cdot (k - 1)}{k^n - 1}
$$

där

- $a_1$ = första elementet, $a_{\mathit{n}}$ = element nummer $n$
- *d* = differens, *k* = kvot (vid ränta: förändringsfaktorn per period)
- $s_{\mathit{n}}$ = summan av de $n$ första elementen
- *N* = nuvärde, *B* = belopp som betalas ut om $n$ år
- *A* = annuitet, *G* = lånebelopp, *n* = antal betalningar
:::

## Viktiga samband och metoder

- Känn igen talföljden: är **skillnaden** mellan elementen konstant är den
  aritmetisk, är **kvoten** konstant är den geometrisk.
- Exponenten i $a_{\mathit{n}} = a_1 \cdot k^{n-1}$ är $n - 1$, eftersom det
  är $n - 1$ steg från första elementet till element nummer $n$.
- Kvoten ur två element som inte står bredvid varandra: från $a_2$ till
  $a_5$ är det tre steg, så $a_5 = a_2 \cdot k^3$.
- Ändras ett belopp med samma procentsats varje år bildar beloppen en
  geometrisk talföljd, och kvoten är förändringsfaktorn.
- Söks antalet år eller antalet termer: lös ut potensen, logaritmera båda
  led och lös ut $n$. Svaret ska vara ett heltal, så avrunda åt rätt håll.
- I en summa skriven med termer är $a_1$ första termen, $k$ en term delad
  med termen före och $n$ antalet termer (exponenten i sista termen plus 1).
- Jämför erbjudanden genom att räkna om alla belopp till nuvärden. Svaret
  beror på räntan: hög ränta gör tidiga pengar mer värda.
- Regelbundet sparande: behållningen är en geometrisk summa med
  $k$ = förändringsfaktorn och $n$ = antalet insättningar. Håll koll på om
  insättningen görs i början eller i slutet av året.
- Annuitetslån: lånebeloppet är lika med summan av alla betalningarnas
  nuvärden. Den summan är geometrisk och ger formeln för annuiteten.
- Total kostnad för ett annuitetslån är $n \cdot A$ och total ränta
  $n \cdot A - G$. Vid månadsbetalningar är $k$ förändringsfaktorn för
  månadsräntan och $n$ antalet månader.

## Inför provet

- Kan du bestämma ett element ur en sluten eller en rekursiv formel?
- Kan du avgöra om en talföljd är aritmetisk, geometrisk eller ingetdera?
- Kan du bestämma kvoten och ett element i en geometrisk talföljd, även när
  två givna element inte står bredvid varandra?
- Kan du bestämma när en geometrisk talföljd passerar ett visst värde med
  hjälp av logaritmer?
- Kan du räkna ut nuvärdet av ett eller flera framtida belopp, och jämföra
  två erbjudanden?
- Kan du beräkna en geometrisk summa och bestämma $a_1$, $k$ och $n$ ur en
  summa skriven med termer?
- Kan du räkna ut behållningen vid regelbundet sparande, med insättning i
  början och i slutet av året?
- Kan du beräkna annuiteten, den totala kostnaden och den totala räntan för
  ett annuitetslån, och förklara skillnaden mot rak amortering?

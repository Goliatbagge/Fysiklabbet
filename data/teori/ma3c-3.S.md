---
id: ma3c-3.S
title: Sammanfattning
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.S'
---

# Sammanfattning — Deriveringsregler

Det här kapitlet handlade om att hitta genvägar för att derivera, i stället
för att varje gång använda derivatans definition. Du har sett hur
potensfunktioner, polynom och funktioner med rötter eller nämnare deriveras
med enkla regler som gäller för alla reella exponenter, samt hur
exponentialfunktioner med basen $e$ och andra baser deriveras. Kapitlet
avslutades med tillämpningar: tolka derivatans tecken och enhet, bestämma en
obekant konstant i en modell, beräkna tangentens ekvation och lösa den här
typen av uppgifter med digitala hjälpmedel som Geogebra.

## Begrepp att kunna

- **deriveringsregel** — genväg för att beräkna en derivata utan att
  använda derivatans definition varje gång.
- **potensregeln** — $f(x) = x^n \Rightarrow f'(x) = nx^{n-1}$: multiplicera
  ned exponenten och minska den med 1. Gäller för alla reella exponenter
  *n*, inte bara positiva heltal.
- **polynomfunktion** — funktion med flera termer; deriveras term för term.
- **konstant funktion** — funktion utan $x$-term; har alltid derivatan 0
  eftersom grafen är en horisontell linje.
- **exponentialfunktion** — funktion där variabeln sitter i exponenten,
  t.ex. $f(x) = a^x$.
- **talet e (Eulers tal)** — det irrationella talet $e \approx 2{,}72$ för
  vilket $f(x) = e^x$ är sin egen derivata.
- **naturliga logaritmen (ln)** — logaritmen med basen *e*; $\ln x$ är det
  tal *e* ska upphöjas till för att ge *x*.
- **tillväxthastighet** — hur snabbt en storhet förändras vid en viss
  tidpunkt; ges av derivatans värde där.
- **tangent** — rät linje som tangerar en kurva i en punkt och har samma
  lutning som kurvan i den punkten.
- **riktningskoefficient (*k*-värde)** — tangentens lutning; ges av
  derivatans värde i tangeringspunkten, $k = f'(a)$.

## Formler

::: formel "Kapitlets formler"
**Potensregeln**

$$
f(x) = x^n \quad\Rightarrow\quad f'(x) = nx^{n-1}
$$

Gäller för alla reella exponenter *n*, inte bara positiva heltal (förutsatt
$x > 0$).

**Koefficient, konstant och nämnarkonstant**

$$
f(x) = kx^n \quad\Rightarrow\quad f'(x) = nkx^{n-1}
$$

$$
f(x) = a \quad\Rightarrow\quad f'(x) = 0
\qquad\qquad
f(x) = \frac{g(x)}{a} \quad\Rightarrow\quad f'(x) = \frac{g'(x)}{a}
$$

där

- *k* = koefficient framför potensen
- *a* = en konstant (ett tal utan $x$)
- $g(x)$ = en deriverbar funktion i täljaren

**Derivatan av eˣ**

$$
f(x) = e^x \quad\Rightarrow\quad f'(x) = e^x
\qquad\qquad
f(x) = ae^x \quad\Rightarrow\quad f'(x) = ae^x
$$

där *a* är en koefficient framför funktionen; den behålls oförändrad vid
derivering.

**Derivatan av eᵏˣ och aˣ**

$$
f(x) = e^{kx} \quad\Rightarrow\quad f'(x) = k \cdot e^{kx}
$$

$$
f(x) = a^x \quad\Rightarrow\quad f'(x) = a^x \cdot \ln a
$$

där

- *k* = koefficienten i exponenten
- $\ln a$ = den naturliga logaritmen av basen *a*

**Tangentens ekvation**

$$
y = kx + m, \qquad k = f'(a)
$$

där

- *k* = tangentens riktningskoefficient (derivatans värde i
  tangeringspunkten)
- *m* = bestäms genom att sätta in tangeringspunktens koordinater
  $(a, f(a))$ i räta linjens ekvation
:::

## Viktiga samband och metoder

- En potensfunktion deriveras genom att multiplicera ned exponenten och
  minska exponenten med 1 — regeln gäller för alla reella exponenter, inte
  bara positiva heltal.
- Ett polynom deriveras term för term; koefficienter behålls, och
  konstanttermer faller bort eftersom derivatan av en konstant alltid är 0.
- Variabler under ett rottecken eller i en nämnare måste först skrivas om
  som en potens (t.ex. $\sqrt{x} = x^{1/2}$, $\dfrac{1}{x} = x^{-1}$) innan
  potensregeln kan användas.
- Har uttrycket variabeln i både täljare och nämnare: dela upp bråket i
  flera termer och derivera var och en för sig, i stället för att derivera
  hela bråket på en gång.
- $f(x) = e^x$ är sin egen derivata — grafiskt betyder det att
  funktionsvärdet i varje punkt är detsamma som kurvans lutning där.
- Lathund för exponentialfunktioner: skriv av funktionen oförändrad,
  multiplicera med koefficienten i exponenten (om någon finns), och
  multiplicera dessutom med $\ln a$ om basen inte är *e*.
- En bas *a* kan alltid skrivas om till basen *e* med $a = e^{\ln a}$ —
  det är så deriveringsregeln för $a^x$ härleds ur regeln för $e^{kx}$.
- Derivatans tecken avgör om en storhet ökar eller minskar: positiv
  derivata betyder ökning, negativ derivata betyder minskning.
- Enheten för en derivata är "enheten för funktionen" per "enheten för
  variabeln", t.ex. invånare/år eller °C/minut.
- Är en konstant i en modell obekant kan den bestämmas genom att sätta in
  ett känt funktions- eller derivatavärde och lösa ut konstanten — ofta med
  hjälp av $\ln$, eftersom $\ln e = 1$.
- Tangentens *k*-värde ges av derivatan i tangeringspunkten; *m*-värdet
  bestäms sedan genom att sätta in tangeringspunktens koordinater i räta
  linjens ekvation.
- Med digitala hjälpmedel (t.ex. Geogebra) kan derivator, funktionsvärden
  och ekvationer (NLös/Lös) bestämmas direkt utan att räkna för hand —
  användbart t.ex. för att hitta extrempunkter till derivatan.

## Figurer värda att minnas

Tangenten till en kurva i en punkt har samma lutning som kurvan där, given
av derivatans värde i tangeringspunkten:

::: figur
<svg viewBox="4 -4 214 266" width="214" height="266" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Grafen till y lika med x i kvadrat plus 4x minus 7 med tangenten i punkten 3 komma 14. Tangentens ekvation är y lika med 10x minus 16."><line x1="14" y1="180" x2="186" y2="180" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,180 184,175.5 184,184.5" fill="#1f2530"/><line x1="100" y1="254" x2="100" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="100,4 95.5,14 104.5,14" fill="#1f2530"/><text x="192" y="198" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="109" y="14" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 28,222 Q 100,318 172,30" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="114.4" y1="228" x2="172" y2="36" stroke="#4a7d3a" stroke-width="2"/><line x1="154" y1="180" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><line x1="100" y1="96" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><circle cx="154" cy="96" r="3.5" fill="#c8324a"/><text x="163" y="99" font-size="12" text-anchor="start" fill="#c8324a">(3, 14)</text><text x="208" y="16" font-size="12" text-anchor="end" fill="#4a7d3a"><tspan font-style="italic">y</tspan> = 10<tspan font-style="italic">x</tspan> − 16</text></svg>
:::

## Inför provet

- Kan du derivera en potensfunktion $f(x) = x^n$ för godtyckliga reella
  exponenter, även bråk- och negativa exponenter?
- Kan du skriva om uttryck med variabeln under ett rottecken eller i en
  nämnare till potensform innan du deriverar?
- Kan du derivera ett polynom term för term, och vet du varför
  konstanttermer försvinner vid derivering?
- Vet du varför $f(x) = e^x$ är sin egen derivata, och kan du förklara vad
  talet *e* är?
- Kan du derivera $f(x) = e^{kx}$ och $f(x) = a^x$, och känner du till
  lathunden för att derivera exponentialfunktioner?
- Vet du vad den naturliga logaritmen $\ln$ är, och hur man skriver om en
  bas *a* till basen *e*?
- Kan du bestämma en obekant konstant i en modell genom att sätta in ett
  känt funktions- eller derivatavärde?
- Kan du tolka derivatans tecken och enhet i en tillämpning, t.ex. en
  tillväxthastighet?
- Kan du bestämma ekvationen för tangenten till en kurva i en given punkt?
- Kan du använda digitala hjälpmedel som Geogebra för att derivera,
  beräkna funktionsvärden och lösa ekvationer numeriskt eller exakt?

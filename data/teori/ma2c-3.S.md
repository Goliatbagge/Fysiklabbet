---
id: ma2c-3.S
title: Sammanfattning
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.S'
---

# Sammanfattning — Andragradsfunktioner

Det här kapitlet handlade om andragradsfunktioner: hur deras grafer
(parabler) ser ut, hur man läser av och räknar ut nollställen,
symmetrilinje och extrempunkt, samt hur man bestämmer en okänd
andragradsfunktion utifrån dess graf. Du har också fått lära dig att
lösa andragradsekvationer och olikheter grafiskt, och att använda
andragradsfunktioner för att modellera verkliga situationer. Du ska
efter kapitlet kunna både rita och tolka en parabel, bestämma dess
viktigaste punkter både grafiskt och algebraiskt, och lösa problem med
hjälp av grafritande hjälpmedel som Geogebra.

## Begrepp att kunna

- **andragradsfunktion** — en funktion där variabelns högsta exponent
  är 2, t.ex. $f(x) = ax^2 + bx + c$.
- **andragradsterm** — termen med $x^2$ i funktionsuttrycket, t.ex.
  $x^2$ eller $3x^2$; tecknet på termen avgör parabelns form.
- **parabel** — den bågformade grafen till en andragradsfunktion.
- **maximipunkt** — parabelns "topp", där funktionen har sitt största
  värde.
- **minimipunkt** — parabelns "dal", där funktionen har sitt minsta
  värde.
- **extrempunkt** — samlingsnamn för maximi- och minimipunkt.
- **extrempunktens karaktär** — om extrempunkten är en maximi- eller
  en minimipunkt; avgörs av tecknet på andragradstermen.
- **symmetrilinje ($x_s$)** — den lodräta linje som parabeln är
  symmetrisk kring; går alltid genom extrempunkten.
- **nollställe** — $x$-värde där funktionen är 0 och grafen skär
  $x$-axeln; en andragradsfunktion kan ha två, ett eller inga
  nollställen.
- **utvecklad form** — funktionsuttrycket skrivet som
  $f(x) = ax^2 + bx + c$.
- **faktorform** — funktionsuttrycket skrivet som
  $f(x) = k(x - x_1)(x - x_2)$ med nollställena $x_1$ och $x_2$.
- **dubbelrot** — när en andragradsfunktions två nollställen
  sammanfaller ($x_1 = x_2$); grafen nuddar då $x$-axeln i en enda
  punkt.
- **största/minsta värde** — extrempunktens $y$-koordinat; störst vid
  en maximipunkt, minst vid en minimipunkt.
- **skärningspunkt** — punkt där två grafer möts; används för att lösa
  ekvationer och olikheter grafiskt.

## Formler

::: formel "Kapitlets formler"
**Andragradsfunktionens utvecklade form**

$$
f(x) = ax^2 + bx + c
$$

där

- *a*, *b*, *c* = konstanter ($a \neq 0$)
- tecknet på *a* avgör om parabeln har en minimipunkt (*a* positiv)
  eller en maximipunkt (*a* negativ)

**Andragradsfunktionens faktorform**

$$
f(x) = k(x - x_1)(x - x_2)
$$

där

- *k* = konstant
- $x_1$, $x_2$ = funktionens nollställen (vid dubbelrot är
  $x_1 = x_2$)

**Symmetrilinjens ekvation**

$$
x_s = \frac{x_1 + x_2}{2}
$$

där $x_1$ och $x_2$ är funktionens nollställen. Saknas nollställen fås
symmetrilinjen i stället som

$$
x_s = -\frac{p}{2}
$$

där *p* är koefficienten framför förstagradstermen när funktionen
skrivits på formen $x^2 + px + q$ (talet framför rottecknet i
*pq*-formeln).

**Extrempunktens koordinater**

$$
(x_s,\ f(x_s))
$$

där $x_s$ är symmetrilinjens $x$-koordinat och $f(x_s)$ är funktionens
värde i den punkten — det vill säga extrempunktens $y$-koordinat, som
också är funktionens största eller minsta värde.
:::

## Viktiga samband och metoder

- Tecknet på andragradstermen avgör kurvans form: positiv (t.ex.
  $x^2$) ger en minimipunkt ("glad mun"), negativ ger en maximipunkt
  ("sur mun").
- En andragradsfunktion kan ha två nollställen (grafen skär
  $x$-axeln i två punkter), ett nollställe/dubbelrot (grafen nuddar
  $x$-axeln) eller inga nollställen alls (grafen ligger helt ovanför
  eller under $x$-axeln).
- Nollställen bestäms algebraiskt genom att sätta funktionsuttrycket
  lika med 0 och lösa ekvationen — ofta med *pq*-formeln efter att en
  eventuell koefficient framför $x^2$ dividerats bort.
- Symmetrilinjen går alltid genom extrempunkten. Finns nollställen fås
  den som deras medelvärde; saknas nollställen fås den i stället som
  "talet framför rottecknet" i *pq*-formeln.
- Extrempunktens $x$-koordinat är alltid symmetrilinjens
  $x$-koordinat; $y$-koordinaten fås genom att sätta in $x_s$ i
  funktionsuttrycket.
- För att bestämma en okänd andragradsfunktion från dess graf: använd
  **faktorform** om nollställena är kända (sätt in nollställena och en
  extra punkt för att lösa ut $k$); använd **utvecklad form** med tre
  kända punkter om nollställena saknas (ger ett ekvationssystem med
  tre obekanta $a$, $b$ och $c$).
- Ekvationer $VL = HL$ löses grafiskt genom att rita båda leden som
  varsin funktion och läsa av skärningspunkternas $x$-koordinater; är
  ekvationen redan lika med 0 räcker det att rita en enda funktion och
  ta fram dess nollställen.
- Olikheterna $f(x) < g(x)$ respektive $f(x) > g(x)$ löses genom att
  först ta fram skärningspunkterna mellan graferna och sedan avgöra
  var den ena grafen ligger under respektive över den andra.
- Vid problemlösning (banor, areor m.m.) tecknas först en funktion som
  modellerar situationen, och Geogebra-verktygen *Extrempunkt*,
  *Nollställen* och *Skärning mellan två objekt* används för att
  besvara frågan direkt ur grafen.
- Vid modellering är det ofta smart att lägga koordinatsystemet så att
  ett känt värde (t.ex. ett nollställe) hamnar i origo — det
  förenklar de fortsatta uträkningarna.

## Figurer värda att minnas

En andragradsfunktion kan ha två, ett eller inga nollställen —
beroende på var parabeln ligger i förhållande till $x$-axeln:

::: figur
<svg viewBox="0 0 540 138" width="540" height="138" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tre parabler: en som skär x-axeln i två punkter, en som nuddar x-axeln i en punkt och en som ligger helt ovanför x-axeln."><line x1="8" y1="80" x2="150" y2="80" stroke="#1f2530" stroke-width="1.4"/><polygon points="158,80 149,76 149,84" fill="#1f2530"/><line x1="18" y1="110" x2="18" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="18,6 14,15 22,15" fill="#1f2530"/><path d="M 35,15 Q 80,175 125,15" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="60.5" cy="80" r="3" fill="#1f2530"/><circle cx="99.5" cy="80" r="3" fill="#1f2530"/><text x="80" y="128" font-size="12" text-anchor="middle" fill="#1f2530">Två nollställen.</text><line x1="193" y1="80" x2="335" y2="80" stroke="#1f2530" stroke-width="1.4"/><polygon points="343,80 334,76 334,84" fill="#1f2530"/><line x1="203" y1="110" x2="203" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="203,6 199,15 207,15" fill="#1f2530"/><path d="M 230,20 Q 265,140 300,20" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="265" cy="80" r="3" fill="#1f2530"/><text x="265" y="128" font-size="12" text-anchor="middle" fill="#1f2530">Ett nollställe.</text><line x1="378" y1="80" x2="520" y2="80" stroke="#1f2530" stroke-width="1.4"/><polygon points="528,80 519,76 519,84" fill="#1f2530"/><line x1="388" y1="110" x2="388" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="388,6 384,15 392,15" fill="#1f2530"/><path d="M 415,15 Q 450,105 485,15" fill="none" stroke="#2563c9" stroke-width="2"/><text x="450" y="128" font-size="12" text-anchor="middle" fill="#1f2530">Saknar nollställen.</text></svg>
:::

## Inför provet

- Kan du förklara vad som menas med en andragradsfunktion,
  andragradsterm och parabel?
- Vet du hur tecknet på andragradstermen avgör om grafen har en
  maximi- eller minimipunkt?
- Kan du avgöra grafiskt om en andragradsfunktion har två, ett eller
  inga nollställen?
- Kan du bestämma nollställen algebraiskt genom att lösa ekvationen
  $f(x) = 0$ med *pq*-formeln?
- Kan du bestämma symmetrilinjens ekvation både utifrån nollställena
  och utifrån "talet framför rottecknet" när nollställen saknas?
- Vet du hur extrempunktens koordinater hänger ihop med funktionens
  största eller minsta värde?
- Kan du bestämma en andragradsfunktion i faktorform utifrån dess
  nollställen och en extra punkt på grafen?
- Kan du bestämma en andragradsfunktion i utvecklad form utifrån tre
  punkter på grafen, genom att lösa ett ekvationssystem?
- Kan du lösa en andragradsekvation grafiskt genom att rita upp båda
  leden och läsa av skärningspunkterna?
- Kan du avgöra vilket olikhetstecken som gäller genom att se om en
  graf ligger över eller under en annan?
- Kan du modellera en verklig situation (t.ex. en projektilbana eller
  en area som ska maximeras) med en andragradsfunktion och lösa
  problemet med hjälp av Geogebras verktyg?

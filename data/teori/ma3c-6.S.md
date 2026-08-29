---
id: ma3c-6.S
title: Sammanfattning
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.S'
---

# Sammanfattning — Trigonometri och triangelsatserna

Det här kapitlet handlade om trigonometri bortom den rätvinkliga triangeln.
Du har sett hur sinus, cosinus och tangens definieras för *alla* vinklar med
hjälp av enhetscirkeln, hur trigonometriska ekvationer löses och varför de
oftast har två lösningar, samt hur areasatsen, sinussatsen och
cosinussatsen (tillsammans kallade triangelsatserna) används för att
bestämma sidor, vinklar och areor i godtyckliga trianglar — inte bara
rätvinkliga. Du ska efter kapitlet kunna avgöra vilken sats som passar ett
givet problem och lösa tillämpningar med flera trianglar efter varandra.

## Begrepp att kunna

- **hypotenusa**: sidan mitt emot den räta vinkeln i en rätvinklig
  triangel; alltid triangelns längsta sida.
- **katet**: en av de två kortare sidorna i en rätvinklig triangel; delas
  i motstående katet (mitt emot vinkeln *v*) och närliggande katet
  (bredvid *v*).
- **sinus, cosinus, tangens**: de tre trigonometriska funktionerna,
  definierade som förhållanden mellan sidorna i en rätvinklig triangel
  (se Formler).
- **inversa trigonometriska funktioner** ($\sin^{-1}$, $\cos^{-1}$,
  $\tan^{-1}$): används för att bestämma en vinkel när ett sidoförhållande
  är känt; kallas även arcsin, arccos och arctan.
- **enhetscirkeln**: en cirkel med radien $1$ och medelpunkt i origo;
  används för att definiera sinus och cosinus för alla vinklar, inte bara
  spetsiga.
- **period**: det antal grader en vinkel måste öka med för att en
  trigonometrisk funktion ska anta samma värde igen; $360^\circ$ för sinus
  och cosinus, $180^\circ$ för tangens.
- **trigonometrisk ekvation**: en ekvation som innehåller en
  trigonometrisk funktion, till exempel $\sin v = a$; löses med enhetscirkeln
  eller räknarens inversa funktioner.
- **mellanliggande vinkel**: vinkeln som ligger mellan två kända sidor i
  en triangel; krävs för areasatsen och för ett av cosinussatsens
  användningsfall.
- **areasatsen**: formel för en triangels area utifrån två sidor och den
  mellanliggande vinkeln.
- **sinussatsen**: samband mellan en triangels sidor och motstående
  vinklars sinusvärden.
- **cosinussatsen**: generalisering av Pythagoras sats till godtyckliga
  trianglar; samband mellan alla tre sidorna och en vinkel.
- **triangelsatserna**: samlingsnamn för areasatsen, sinussatsen och
  cosinussatsen.

## Formler

::: formel "Kapitlets formler"
**Trigonometriska funktioner i en rätvinklig triangel**

$$
\tan v = \frac{a}{b}, \qquad \sin v = \frac{a}{c}, \qquad \cos v = \frac{b}{c}
$$

där *a* är motstående katet, *b* är närliggande katet och *c* är
hypotenusan till vinkeln *v*.

**Inversa trigonometriska funktioner**

$$
v = \tan^{-1}\left(\frac{a}{b}\right), \qquad
v = \sin^{-1}\left(\frac{a}{c}\right), \qquad
v = \cos^{-1}\left(\frac{b}{c}\right)
$$

**Sinus, cosinus och tangens på enhetscirkeln**

$$
\sin v = y, \qquad \cos v = x, \qquad \tan v = \frac{\sin v}{\cos v}
$$

där $(x, y)$ är koordinaterna för den punkt på enhetscirkeln som vinkeln
*v* ger.

**Trigonometriska funktionernas perioder**

| Funktion | Period |
| --- | --- |
| $\sin$ | $360^\circ$ |
| $\cos$ | $360^\circ$ |
| $\tan$ | $180^\circ$ |

**Andra lösningen till en trigonometrisk ekvation** (i intervallet
$0^\circ \leq v \leq 360^\circ$, med $v_1$ som räknarens svar)

- $\sin v = a$: $v_2 = 180^\circ - v_1$
- $\cos v = a$: $v_2 = 360^\circ - v_1$
- $\tan v = a$: $v_2 = v_1 + 180^\circ$

**Areasatsen**

$$
T = \frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2}
$$

där *T* är triangelns area.

**Sinussatsen**

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}
$$

**Cosinussatsen**

$$
\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
b^2 &= a^2 + c^2 - 2ac\cos B \\
a^2 &= b^2 + c^2 - 2bc\cos A
\end{aligned}
$$

I sinussatsen och cosinussatsen är sidan *a* motstående sida till vinkel
*A*, sidan *b* motstående sida till vinkel *B* och sidan *c* motstående
sida till vinkel *C*.
:::

## Viktiga samband och metoder

- Avgör vilken trigonometrisk funktion som passar utifrån vilka sidor som
  är kända: motstående/hypotenusa ger sinus, närliggande/hypotenusa ger
  cosinus, motstående/närliggande ger tangens.
- Ska du bestämma en vinkel i stället för en sida, använd den inversa
  funktionen ($\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$) på räknaren.
- Punkten på enhetscirkeln som vinkeln *v* ger kan alltid skrivas
  $(\cos v, \sin v)$ — för vilken vinkel som helst, inte bara spetsiga.
- En vinkel större än $360^\circ$ ger samma punkt som vinkeln minus ett
  helt varv; en negativ vinkel motsvarar en vridning medurs i stället för
  moturs.
- Ekvationen $\sin v = a$ eller $\cos v = a$ saknar lösning om
  $|a| > 1$, eftersom linjen då hamnar helt utanför enhetscirkeln (vars
  radie bara är $1$).
- Räknaren ger bara den minsta lösningen $v_1$ i intervallet
  $0^\circ \leq v \leq 360^\circ$ — den andra lösningen $v_2$ måste räknas
  ut för hand (se formlerna ovan).
- Välj triangelsats efter vad som är känt: areasatsen (två sidor och
  mellanliggande vinkel), sinussatsen (en sida och två vinklar, eller två
  sidor och en icke-mellanliggande vinkel), cosinussatsen (två sidor och
  mellanliggande vinkel, eller alla tre sidor).
- Ska du bestämma en vinkel är cosinussatsen säkrare än sinussatsen:
  cosinussatsen ger direkt rätt vinkel (tecknet på $\cos v$ avslöjar om
  vinkeln är spetsig eller trubbig), medan sinussatsen kan ge en falsk
  lösning som måste uteslutas med triangelns vinkelsumma ($180^\circ$).
- Areasatsen ger ofta **två** giltiga mellanliggande vinklar ($C_1$ och
  $180^\circ - C_1$) för samma area och sidor — till skillnad från
  sinussatsen finns här inget vinkelsummevillkor som utesluter någon av
  dem.
- I tillämpningsproblem med flera trianglar: lös först den triangel där
  tillräckligt mycket är känt, och använd sedan den beräknade storheten
  som känd information i nästa triangel.

## Figurer värda att minnas

Trigonometriska funktioner definieras i en rätvinklig triangel med
motstående katet *a*, närliggande katet *b* och hypotenusa *c*:

::: figur
<svg viewBox="36 28 212 128" width="288" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med den lodräta kateten a, den vågräta kateten b, hypotenusan c och vinkeln v nere till höger."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M218.0,130.0 A22,22 0 0 1 220.3,120.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="196" y="124" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

Enhetscirkeln definierar sinus och cosinus för alla vinklar — inte bara
spetsiga — som punktens $y$- respektive $x$-koordinat:

::: figur
<svg viewBox="24 4 262 264" width="356" height="358" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med en radie till en punkt vid vinkeln v ovanför x-axeln. En streckad lodrät linje ner till x-axeln bildar en rätvinklig triangel med hypotenusan 1, den vågräta kateten cos v och den lodräta kateten sin v. Peka eller tryck på cos v eller sin v så markeras kateten och det visas vilken koordinat den motsvarar." style="overflow:visible"><style>.q62s{cursor:pointer;outline:none}.q62s .q62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q62s:hover .q62-lbl,.q62s:focus .q62-lbl{opacity:1}</style><circle cx="150" cy="140" r="95" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="30" y1="140" x2="270" y2="140" stroke="#1f2530" stroke-width="1.6"/><polygon points="279,140 270,135.5 270,144.5" fill="#1f2530"/><line x1="150" y1="260" x2="150" y2="20" stroke="#1f2530" stroke-width="1.6"/><polygon points="150,11 145.5,20 154.5,20" fill="#1f2530"/><text x="274" y="160" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="159" y="18" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="219.82" y="132" width="8" height="8" fill="none" stroke="#1f2530" stroke-width="1.1"/><line x1="150" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="2"/><circle cx="227.82" cy="85.51" r="4" fill="#2563c9"/><path d="M178,140 A28,28 0 0 0 172.94,123.94" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="190.06" y="127.37" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><g class="q62s" tabindex="0"><line x1="150" y1="140" x2="227.82" y2="140" stroke="transparent" stroke-width="14"/><text x="188.91" y="158" font-size="13" text-anchor="middle" fill="#1f2530">cos <tspan font-style="italic">v</tspan></text><g class="q62-lbl"><line x1="150" y1="140" x2="227.82" y2="140" stroke="#c8324a" stroke-width="3"/><text x="188.91" y="176" font-size="11.5" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">x</tspan>-koordinaten</text></g></g><g class="q62s" tabindex="0"><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="transparent" stroke-width="14"/><text x="235.82" y="112.76" font-size="13" text-anchor="start" fill="#1f2530">sin <tspan font-style="italic">v</tspan></text><g class="q62-lbl"><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#c8324a" stroke-width="3"/><rect x="202" y="60" width="84" height="15" rx="4" fill="#f3eee4"/><text x="283" y="72" font-size="11.5" text-anchor="end" fill="#c8324a"><tspan font-style="italic">y</tspan>-koordinaten</text></g></g><text x="182.0" y="102.93" font-size="13" text-anchor="end" fill="#1f2530">1</text></svg>

Peka eller tryck på cos $v$ eller sin $v$ så markeras kateten och koordinaten den motsvarar.
:::

Triangelsatserna delar alla samma beteckningar: sidan *a* mitt emot vinkel
*A*, sidan *b* mitt emot vinkel *B* och sidan *c* mitt emot vinkel *C*:

::: figur
<svg viewBox="-24 -27 230 241" width="291" height="305" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel ABC. Sidan a ligger mitt emot vinkel A, sidan b mitt emot vinkel B och sidan c mitt emot vinkel C."><polygon points="49.82,0 0,185.92 180,185.92" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 44.12,21.25 A 22 22 0 0 0 62.44,18.02" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 5.69,164.67 A 22 22 0 0 1 22,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 167.38,167.9 A 22 22 0 0 0 158,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="46.87" y="-14.74" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-13.49" y="204.27" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="195.08" y="201.77" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="90" y="209.92" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="128.02" y="85.78" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="9.45" y="92.82" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

## Inför provet

- Kan du definiera sinus, cosinus och tangens med hjälp av en rätvinklig
  triangels sidor (motstående katet, närliggande katet, hypotenusa)?
- Kan du använda de inversa trigonometriska funktionerna för att bestämma
  en vinkel när två sidor är kända?
- Vet du hur en punkt på enhetscirkeln hänger ihop med sinus och cosinus
  för en godtycklig vinkel — även trubbiga och negativa vinklar?
- Kan du lösa en trigonometrisk ekvation som $\sin v = a$ eller
  $\cos v = a$ med hjälp av enhetscirkeln, och avgöra när ekvationen
  saknar lösning?
- Kan du bestämma **båda** lösningarna till en trigonometrisk ekvation i
  intervallet $0^\circ \leq v \leq 360^\circ$, inte bara den räknaren ger
  direkt?
- Vet du att sinus och cosinus har perioden $360^\circ$ medan tangens har
  perioden $180^\circ$, och varför tangens period är hälften så lång?
- Kan du areasatsen och vet du vilken information som krävs för att
  använda den?
- Kan du sinussatsen och vet du när den kan användas?
- Kan du cosinussatsen och vet du när den kan användas?
- Kan du avgöra vilken av de tre triangelsatserna som passar till ett
  givet problem, utifrån vad som är känt i triangeln?
- Vet du varför cosinussatsen är säkrare än sinussatsen när man ska
  bestämma en vinkel, och hur man kontrollerar en misstänkt falsk lösning
  med triangelns vinkelsumma?
- Kan du lösa ett tillämpningsproblem som kräver flera trianglar efter
  varandra, där en beräknad storhet i den ena triangeln används i nästa?

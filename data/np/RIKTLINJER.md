# Riktlinjer — steg-för-steg-lösningar till nationella prov

Gäller alla prov under `data/np/`. Pilot och referensimplementation:
`ma1c-vt2022.js` (+ `ma1c-vt2022-figurer.js`, genererad av
`scratchpad/np-figs/gen.js`). Sidan som renderar allt är `np.html`.

## Källor och korrekthet

- Uppgifter, svar och rekommenderade metoder hämtas ur provets
  **bedömningsanvisningar** (PDF i `NP/<kurs>/<prov>/`). Vid oklar metod:
  använd en metod som ingår i kursens teorigenomgångar — aldrig ny matematik.
- `bedomning`-listan per uppgift återger poängkraven (+E/+C/+A) ur
  bedömningsanvisningarna.
- Uppgifter som är borttagna ur det frisläppta provet (sekretess) läggs in
  med `sekretess: true` så att numreringen stämmer.

## Lösningsstegen

- 2–7 steg per uppgift (deluppgifter kan ge fler). Varje steg gör EN sak
  och har en `rubrik` i imperativ ("Bryt ut faktorn 5").
- **Deluppgifter:** varje steg som hör till en deluppgift får `del: 'a'`
  (osv.) — skriv INTE "a)" i rubriken. UI:t visar uppgiftsnumret ("17a")
  som en liten rad ovanför stegräknaren, och **stegnumreringen börjar om
  för varje deluppgift** (b-uppgiftens första steg är "Steg 1 av …").
  Gemensamma introsteg (t.ex. "rita figuren") tilldelas första
  deluppgiften (`del: 'a'`) så att inget steg saknar grupp.
- Nästan varje steg har en `varfor`-text: **varför** momentet görs, inte
  bara vad. Det är kärnpedagogiken — skriv den mot en elev som kört fast.
- Avsluta gärna med kontroll/rimlighetsbedömning i sista steget.
- `svar` sist = det fullständiga svaret enligt bedömningsanvisningarna
  (alla deluppgifter i sammanfattning).

## ⚠️ REGEL: deluppgifter avslutas med sitt svar

**Vid deluppgifter (a, b, c …) ska varje deluppgift AVSLUTAS MED SITT SVAR
innan nästa deluppgift påbörjas** (uttryckligt önskemål 2026-07-14).
Sätt `delsvar: { del: 'a', text: '…' }` på det steg som avslutar
deluppgiften — UI:t visar då en svarsruta ("SVAR A)") i det steget.
Lös alltså aldrig a) och b) klart och ge båda svaren först i slutet.

När delsvar finns döljer UI:t automatiskt det samlade svarskortet
(slutkortet visar då bara "Så bedöms uppgiften", och presentationsläget
slutar efter sista stegets delsvar) — skriv ändå `svar`-fältet komplett,
det är datans facit och kan användas i andra vyer.

## Figurer

- Samma noggrannhet som teori-figurerna: beräknade koordinater (aldrig
  ögonmått), variabler kursiva via `<tspan font-style="italic">`, mätetal
  och enheter raka, etiketter aldrig på linjer/objekt, inga vita halor,
  inga emojis. Skärmdumpsgranska ALLTID (`.shots/np-fig-runner.html`).
- Frågefiguren ska troget återge originalprovets figur.
- **Stegfigurer byggs upp i takt med lösningen** (uttryckligt önskemål):
  nya linjer RITAS (`aDraw`, stroke-animation), nya mått/etiketter TONAS IN
  (`aFade`). Streckade linjer kan inte stroke-animeras — använd fade.
  Basfördröjningen `ANIM_BAS` (1,1 s) ger läsaren tid att orientera sig
  innan animationen startar — ta inte bort den.
- Sidhighlighting i lösningssteg: färga den sida/del som används
  (accent = det sökta/motstående, blått = det kända/närliggande) och
  sätt små ordetiketter ("närliggande", "hypotenusa").

## Lösningsformat i FYSIKPROV (gäller inte matteprov)

Fastlagt av användaren 2026-07-21 (referensimpl: `fy2-vt2016.js`):

1. **Mätvärdesklammer före varje insättning.** Innan värden sätts in i en
   formel listas de i samma hakparentes-block som övningarnas
   lösningsförslag: `$$\\left[ \\begin{array}{l} … \\end{array} \\right]$$`.
   Klammern innehåller **alla** beteckningar som ingår i formeln:
   - konstanter med `\\approx` och namn: `h \\approx 6{,}626 \\cdot 10^{-34}\\ \\mathrm{Js}\\ \\text{(Plancks konstant)}`
   - givna mätvärden med SI-omvandling i samma rad: `B_1 = 49\\ \\mathrm{mT} = 0{,}049\\ \\mathrm{T}`
   - mellanresultat märkta `\\text{(beräknad ovan)}`
   Rubrik ovanför blocket: "Mätvärden (efter omvandling till SI-enheter):"
   när någon omvandling görs, annars "Mätvärden:" (eller "Med värdena
   beräknade ovan:" om alla rader är mellanresultat). Andra enheter än SI
   får användas när de väsentligen underlättar (t.ex. eV).
   Pedagogisk poäng: rutinen SI-omvandling-i-klammern ⇒ eleven vet att
   svaret kommer ut i sin SI-enhet.
2. **`\\approx` på avrundade konstantvärden** ($h$, $c$, $g$, $q_e$, $\\sigma$,
   $u$ …) — aldrig `=`. Frågestammar ("Räkna med $g = 9{,}82$…") behåller
   dock `=` (de är stipulationer och ofta provets originaltext).
3. **Förklaringen precis före sitt moment.** En `varfor`-text får aldrig
   förklara något som händer i ett senare steg — dela steget i två i stället
   (stegen är billiga: de renderas numera oboxade i ett sammanhängande
   flöde utan "Steg N av M", så en delning syns bara som ett nytt
   varför-block).

## Typografi

- Följ CLAUDE.md: kommatecken som decimaltecken (`1{,}04`), `\\,` som
  tusentalsavgränsare i KaTeX, dubbla backslash i JS-strängar, raka
  divisionsstreck (`\\dfrac`), inga Unicode-superscript i exponenter.
- Deluppgifter i frågetexten skrivs som `**a)** …` på egna stycken.

## Checklista före klart

1. Alla figurnycklar finns i figurfilen (kör valideringsskriptet i
   arbetsflödet eller `node --check` + referenskoll).
2. Röktest: ladda varje uppgift headless med `?los=1` och grep efter
   `katex-error` (0 träffar) och `np-svar` (1 träff).
3. Skärmdumpsgranska figurtunga uppgifter på bred och smal skärm.
4. Ny post i `data/np/index.js` + rad i "Senaste uppdateringar".

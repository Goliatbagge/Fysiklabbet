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

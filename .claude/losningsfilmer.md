# Lösningsfilmer till nationella prov

Animerade lösningar steg för steg, 1920×1080, för YouTube och sajten.
Första filmen: NP Ma 1c VT 2022 uppgift 18 (oktober 2026). Varje film
finns i två versioner:

- **Musikversion:** musik och ljudeffekter, undertexter i bild.
- **Röstversion:** användarens klonade ElevenLabs-röst "Sam", inget annat
  ljud. Manuset skrivs av agenten
  [`rostmanus`](agents/rostmanus.md), som också har reglerna för vad
  rösten säger och när.

## Bilden: regler

Reglerna kommer från användarens granskning 2026-10-22 och gäller båda
versionerna om inget annat sägs.

1. **Formeln skrivs först allmänt, sedan med index, sedan med tal.**
   Varje formel som tillämpas visas i sin allmänna form innan värdena
   sätts in, och har formeln en form med beteckningarna för just den här
   uppgiftens storheter visas den som eget led emellan:
   `k = Δy/Δx = (y₂ − y₁)/(x₂ − x₁)`, och först på raden under
   `= (30 − 10)/(12 − 2) = 20/10 = 2`. Insättningsraden börjar med `=`
   rakt under det första likhetstecknet. Eleven ska se var varje tal
   kommer ifrån. Samma sak för till exempel `F = m · a`, Pythagoras sats
   och *pq*-formeln.
2. **Visa vilket tal som är vilket index.** När en formel med index
   (*x*₁, *y*₁, *x*₂, *y*₂) tas fram skrivs indexen i blått under
   koordinaterna i uppgiftstexten, i samma ögonblick som formeln med
   index visas. Samma princip som regel 3q för pennlösningarna i
   CLAUDE.md. Exempel: `indexEtiketter()` i `video.html`, som hittar talen
   i KaTeX-texten och placerar etiketterna under dem.
3. **En titelbild med uppgiftsnumret inleder filmen**, och den är tyst i
   röstversionen.
4. **Röstversionen har inga inbrända undertexter.** De skrivs för
   musikversionen och säger något annat än rösten.
   `capture-rost.js` döljer dem (`.cap`).
5. **Röstversionen har inga ljudeffekter och ingen musik.** Rösten är
   det enda ljudet.
6. **Bilden står aldrig still mitt i en rörelse.** När en replik behöver
   mer tid än steget fryser bilden. Kontrollera stillbilderna
   (`node capture-rost.js stills`, se nedan) och flytta pausen med
   `still` i manuset om något är halvritat.
7. **Ett tyst parti spelas upp snabbare, det klipps inte.** Har talet
   strukits över en del av animationen, spelas den delen upp fyra gånger
   snabbare (ett segment med `"tal": ""` och `"fart": 4` i manuset).
   Annars blir det sekunder av stillastående tystnad. Ett hårt klipp
   skulle få saker att försvinna eller hoppa.
8. **Figuren får inte lura ögat utan att det sägs.** Har axlarna olika
   skala är det rösten (eller en undertext) som säger det, se punkt 4
   under "Rösten följer bilden" i `rostmanus`.

## Verktygskedjan (röstversionen)

Filerna ligger i `.shots/np-video/` (inte versionshanterad, eftersom
`.shots/` är i `.gitignore`). Nyckeln ligger i användarvariabeln
`ELEVENLABS_API_KEY`. Nyckeln behöver Text to Speech, Voices (läsa) och
Forced Alignment.

| Steg | Kommando | Vad det gör |
|---|---|---|
| 1 | (agenten `rostmanus`) | skriver `manus.json` med `tal`, `ankare`, `still`, `fart` |
| 2 | `node capture.js stills 1` | skriver `timeline.json` (händelsetiderna i `T`) ur `video.html` |
| 3 | `python rost.py [id …]` | genererar `rost/<id>.mp3` med `eleven_v4`, mäter längd och tystnad före |
| 4 | `python mix_rost.py prov` | `prov-manus.mp3`: alla repliker efter varandra, för att lyssna |
| 5 | `python tidsvarp.py` | räknar ut stillbilderna (`warp.json`) och var varje replik hamnar |
| 6 | `node capture-rost.js stills` | stillbilder vid varje paus (`stills-rost/`), granska dem |
| 7 | `node capture-rost.js video 60` | `frames-rost.mp4` |
| 8 | `python mix_rost.py` och `python mix_rost.py mux` | ljudet och den färdiga filmen |

Ändras `video.html` ska steg 2 göras om innan steg 5. Steg 3 kostar
krediter hos ElevenLabs. Generera bara de repliker som ändrats genom att
ange deras id.

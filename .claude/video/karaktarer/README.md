# Labbfolket: karaktärerna

Två återkommande huvudfigurer i förklaringsfilmerna. En av dem har
huvudrollen i varje film, aldrig båda. Huvudfiguren läser också upp manuset.

| Figur | Karaktärsark | Röst i ElevenLabs (modell `eleven_v4`) |
|---|---|---|
| Nils | `nils-karaktarsark.jpg` | "Nils - Warm", `Pl7pcT0MQ5oC83oklshh` |
| Malin | `malin-karaktarsark.jpg` | "Malin - Professional Swedish Narration", `zyfJspwEDo0sxPeFmtsn` |

Sedan 2026-10-29 är figurerna tecknade som vuxna, tokiga och snälla
forskare i slapstickstil (fortfarande blå kulspets på rutat papper). De
första, barnsligare arken ligger i `gammal-stil/`; filmerna bowlingklotet,
stålfartyget och flugan i burken gjordes med dem.

Arket laddas upp som referensbild i videoverktyget, aldrig som startbild.
Figurernas låsta beskrivningar och reglerna står i
`../masterprompt-labbfolket.md` under LABBFOLKET.

Rösten genereras med `../filmer/tung-och-latt-boll/bygg/rost_film.py`,
där röst-id ges som tredje argument. Malins röst ligger i det delade
röstbiblioteket och fungerar direkt via röst-id:t.
`malin-provrost.mp3` är ett kort provklipp.

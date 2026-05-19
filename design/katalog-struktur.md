# Katalog-struktur — mappning för Laborans-redesign

Inventarie av alla befintliga simuleringar mappade till 4-nivå-strukturen
(Ämne → Kurs → Kapitel → Avsnitt). Skapad 2026-05-11 som del av fas 1, steg 1.1.

Källor:
- `index.html` SIMULATIONS-arrayen (41 poster)
- `fysik1.html` kapitelindelning (id=rorelse/krafter/densitet/varme/el/karnfysik)
- `fysik2.html` kapitelindelning (id=rorelse/vagor/em/partiklar/astronomi)
- Navbar-dropdownen i `index.html` för kapitelordning

Avsnittsnumrering följer Laborans-mönstret: `kapitelnr.avsnittsnr`.

## Fysik (ämne)

### Fysik 1 (kurs)

#### 1. Rörelse
- **1.1** Tyngdfaktorn på jorden — `fysik1-tyngdfaktor-jorden.html` 🌍
- **1.2** Rörelsediagram — `fysik1-rorelsediagram.html` 📉

#### 2. Krafter
- **2.1** Newtons tredje lag — `fysik1-newtons-tredje-app.html` 🚀
- **2.2** Newtons gravitationslag — `fysik1-newtons-gravitationslag.html` 🪐

#### 3. Densitet och tryck
- **3.1** Densitet och flytförmåga — `fysik1-densitet-app.html` 🔬
- **3.2** Ideala gaslagen — `fysik1-tryck.html` 💨
- **3.3** Tryck: *p* = *F* / *A* — `fysik1-tryck-pa-app.html` 🧊
- **3.4** Arkimedes princip — `fysik1-arkimedes.html` ⚖️
- **3.5** Magdeburgska halvkloten — `fysik1-magdeburgska-halvklot.html` 🐴

#### 4. Värmelära
- **4.1** Värmeflöde — `fysik1-varme-app.html` 🔥

#### 5. Elektricitet
- **5.1** Elektriska kretsar — `fysik1-ellara-app.html` ⚡
- **5.2** Elektrisk influens — `fysik1-influens.html` 🧲
- **5.3** Coulombs lag — `fysik1-coulombs-lag.html` ⚡
- **5.4** Kirchhoffs första lag — `fysik1-kirchhoffs-lag.html` 🔀
- **5.5** Serie- och parallellkoppling — `fysik1-serie-parallell.html` 💡
- **5.6** Elektriska fält — `fysik1-elektriska-falt.html` 📐
- **5.7** Faradays bur — `fysik1-faradays-bur.html` 🛡️
- **5.8** Enhetskollen — `fysik1-enhetskollen.html` 📝

#### 6. Kärnfysik
- **6.1** Massdefekt och bindningsenergi — `fysik1-massdefekt.html` ⚖️
- **6.2** Sönderfall — `fysik1-sonderfall.html` ☢️
- **6.3** Halveringstid — `fysik1-halveringstid.html` ⏳
- **6.4** Strålnings genomtränglighet — `fysik1-stralning-genomtranglighet.html` 🛡️

### Fysik 2 (kurs)

#### 1. Rörelse och krafter
- **1.1** Snett kast — `fysik2-rorelse-app.html` 🎯

#### 2. Mekaniska vågor
- **2.1** Stående våg i sträng — `fysik2-staende-vag-app.html` 🎸
- **2.2** Plan pendel — `fysik2-pendel-app.html` ⏱️
- **2.3** Vågsimulator — `fysik2-vagsimulator.html` 🌊
- **2.4** Jämförelse av svängningar — `fysik2-svangningar-jamforelse.html` 〰️

#### 3. Elektromagnetism
- **3.1** Magnetfält kring rak ledare — `fysik2-magnetfalt-app.html` 🧲
- **3.2** Jordmagnetiska fältet — `fysik2-jordmagnetiska-faltet.html` 🌍
- **3.3** Magnetiskt flöde — `fysik2-magnetiskt-flode.html` 🧲
- **3.4** Växelströmsgenerator — `fysik2-vaxelstromsgenerator.html` ⚡
  *(saknas i nuvarande SIMULATIONS-array — läggs till)*

#### 4. Ljus som våg och partikel
- **4.1** Elektromagnetisk strålning — `fysik2-em-stralning.html` 📡
- **4.2** Wiens förskjutningslag — `fysik2-wiens-lag.html` 🌡️
- **4.3** Solens färg — `fysik2-solens-farg.html` 🌅
- **4.4** Brytningslagen — `fysik2-brytning-app.html` 💎
- **4.5** Dubbelspaltexperimentet — `fysik2-dubbelspalt.html` 🔬
- **4.6** Fotoelektrisk effekt — `fysik2-fotoelektrisk-effekt.html` 💡
- **4.7** Spektrallinjer — `fysik2-spektrallinjer.html` 🌈
- **4.8** Energinivåer — `fysik2-energinivaer.html` ⚛️

#### 5. Astronomi
- **5.1** Månens faser — `fysik2-manens-faser.html` 🌙

## Matematik (ämne)

Strukturen ska finnas men markeras "kommer snart". Förslag på kursplan
baserad på svensk gymnasiematematik:

- **Matematik 1**: Aritmetik, Algebra, Geometri, Funktioner, Statistik
- **Matematik 2**: Andragradsekvationer, Funktioner, Geometri, Statistik
- **Matematik 3**: Derivata, Integraler, Trigonometri
- **Matematik 4**: Komplexa tal, Vektorer, Trigonometriska funktioner

Strukturen lagras i koden så att fliken kan klickas, men inga avsnitt
visas — bara meddelandet "Matematik-katalogen är under uppbyggnad".

## Totalt

- 21 simuleringar i Fysik 1 (6 kapitel)
- 21 simuleringar i Fysik 2 (5 kapitel)
- **42 simuleringar totalt** (Växelströmsgenerator inkluderad)

## Övrigt

- Existerande filer som INTE är publicerade simuleringar (skippas):
  `pendel-sim.html`, `pendel-test.html`, `fysik2-pendel-test.html`,
  `fysik1-newtons-tredje\index.html` (gammal version),
  `*-backup.html`-filer, `*-standalone.html`-filer som duplicerar `-app.html`,
  `matte-triangel-rektangel.html` (test för matematik — håll utanför
  katalogen tills Matematik-fliken är skarp).

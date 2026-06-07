// Fysiklabbet — namn på simuleringarna i sim-listan (simuleringar.html).
//
// Simuleringslistan ärver INTE teoriavsnittens titlar. Här ges varje
// simuleringsfil namn efter VAD den simulerar. En fil som innehåller flera
// fristående simuleringar listas som FLERA poster — ange då en array.
//
// Ordning och områdesindelning kommer fortfarande från data/katalog.js
// (teori-ordningen). Den här filen styr bara namn (och ev. egen beskrivning).
//
// Värde per href:
//   'Namn'                              — en simulering (beskrivning ärvs från avsnittet)
//   ['Namn A', 'Namn B']               — flera simuleringar (beskrivning ärvs)
//   [{ name, desc, href }, …]          — flera, med egna beskrivningar/djuplänkar
//
// href per post: utelämnas → avsnittets fil. Anges (t.ex. med ?sim=globe)
// → raden öppnar exakt den simuleringen direkt.
//
// Saknas en href här används avsnittets titel som reserv.

window.SIM_NAMES = {
  // ── Fysik ────────────────────────────────────────────────────────
  'fysik1-enhetskollen.html': 'Enhetskollen',
  'fysik1-densitet-app.html': 'Densitet',
  'fysik1-vektoraddition-app.html': 'Vektoraddition',
  'fysik1-stracka-tid-app.html': 'Läge-tid-diagram',
  'fysik1-tyngdfaktor-jorden.html': [
    { name: 'Fritt fall i vakuum', href: 'fysik1-tyngdfaktor-jorden.html?sim=vacuum', desc: 'Rosenblad och mynt i två glasrör — pumpa ut luften och se dem falla lika fort.' },
    { name: 'Tyngdaccelerationen på jorden', href: 'fysik1-tyngdfaktor-jorden.html?sim=globe', desc: 'Hur tyngdaccelerationen g varierar mellan ekvator och poler på en roterande jord i 3D.' },
  ],
  'fysik1-hastighet-tid-app.html': 'Hastighet-tid-diagram',
  'fysik1-acceleration-tid-app.html': 'Acceleration-tid-diagram',
  'fysik1-rorelsediagram.html': 'Rörelsediagram',
  'fysik1-newtons-forsta-app.html': 'Newtons första lag',
  'fysik1-newtons-andra-app.html': 'Newtons andra lag',
  'fysik1-newtons-tredje-app.html': 'Newtons tredje lag',
  'fysik1-newtons-gravitationslag.html': 'Newtons gravitationslag',
  'fysik1-tryck-pa-app.html': 'Tryck och tryckkraft',
  'fysik1-magdeburgska-halvklot.html': 'Magdeburgska halvkloten',
  'fysik1-arkimedes.html': 'Arkimedes princip',
  'fysik1-tryck.html': 'Ideala gaslagen',
  'fysik1-varme-app.html': 'Uppvärmning och avsvalning',
  'fysik1-influens.html': 'Elektrisk influens',
  'fysik1-coulombs-lag.html': 'Coulombs lag',
  'fysik1-ellara-app.html': 'Elektriska kretsar',
  'fysik1-serie-parallell.html': 'Serie- och parallellkoppling',
  'fysik1-kirchhoffs-lag.html': 'Kirchhoffs första lag',
  'fysik1-elektriska-falt.html': 'Elektriska fält',
  'fysik1-faradays-bur.html': 'Faradays bur',
  'fysik1-sonderfall.html': 'Radioaktivt sönderfall',
  'fysik1-massdefekt.html': 'Massdefekt och bindningsenergi',
  'fysik1-halveringstid.html': 'Halveringstid',
  'fysik1-stralning-genomtranglighet.html': 'Strålningens genomtränglighet',

  // ── Fysik – fördjupning ──────────────────────────────────────────
  'fysik2-konisk-pendel.html': 'Konisk pendel',
  'fysik2-rorelse-app.html': 'Snett kast',
  'fysik2-svangningar-jamforelse.html': 'Jämförelse av svängningar',
  'fysik2-pendel-app.html': 'Plan pendel (matematisk)',
  'fysik2-staende-vag-app.html': 'Stående våg i sträng',
  'fysik2-vagsimulator.html': 'Vågsimulator',
  'fysik2-magnetfalt-app.html': 'Magnetfält runt en rak ledare',
  'fysik2-jordmagnetiska-faltet.html': 'Jordmagnetiska fältet',
  'fysik2-magnetiskt-flode.html': 'Magnetiskt flöde',
  'fysik2-vaxelstromsgenerator.html': 'Växelströmsgenerator',
  'fysik2-em-stralning.html': 'Elektromagnetisk strålning',
  'fysik2-dubbelspalt.html': 'Dubbelspaltexperimentet',
  'fysik2-wiens-lag.html': 'Wiens förskjutningslag',
  'fysik2-brytning-app.html': 'Brytningslagen',
  'fysik2-fotoelektrisk-effekt.html': 'Fotoelektrisk effekt',
  'fysik2-spektrallinjer.html': 'Spektrallinjer',
  'fysik2-energinivaer.html': 'Energinivåer i väteatomen',
  'fysik2-manens-faser.html': 'Månens faser',
  'fysik2-solens-farg.html': 'Solens färg',
};

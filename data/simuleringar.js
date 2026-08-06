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
//   [{ name, desc, href, kw }, …]      — flera, med egna beskrivningar/djuplänkar
//
// href per post: utelämnas → avsnittets fil. Anges (t.ex. med ?sim=globe)
// → raden öppnar exakt den simuleringen direkt.
//
// Saknas en href här används avsnittets titel som reserv.
//
// kw per post: nyckelord för sökrutan (data/sok.js). Ett avsnitt med EN
// simulering ärver avsnittets keywords från data/katalog.js; har avsnittet
// FLERA simuleringar ärvs de inte (annars skulle en sökning på
// "bandgenerator" också träffa "Elektrisk influens") — ge då varje
// simulering egna kw så att var och en går att hitta på sina begrepp.

window.SIM_NAMES = {
  // ── Fysik nivå 1 ────────────────────────────────────────────────────────
  'fysik1-densitet-app.html': 'Densitet',
  'fysik1-vektoraddition-app.html': 'Vektoraddition',
  'fysik1-stracka-tid-app.html': 'Läge-tid-diagram',
  'fysik1-tyngdfaktor-jorden.html': [
    { name: 'Fritt fall i vakuum', href: 'fysik1-tyngdfaktor-jorden.html?sim=vacuum', desc: 'Rosenblad och mynt i två glasrör — pumpa ut luften och se dem falla lika fort.',
      kw: ['krafter','tyngdfaktor','tyngdacceleration','fritt fall','vakuum','luftmotstånd','luftpump','glasrör','mynt','rosenblad','galilei','fjäder'] },
    { name: 'Tyngdaccelerationen på jorden', href: 'fysik1-tyngdfaktor-jorden.html?sim=globe', desc: 'Hur tyngdaccelerationen g varierar mellan ekvator och poler på en roterande jord i 3D.',
      kw: ['krafter','tyngdfaktor','tyngdacceleration','tyngdkraft','jorden','ekvator','pol','rotation','latitud','3d','gravitation'] },
  ],
  'fysik1-hastighet-tid-app.html': 'Hastighet-tid-diagram',
  'fysik1-acceleration-tid-app.html': 'Acceleration-tid-diagram',
  'fysik1-rorelsediagram.html': 'Rörelsediagram',
  'fysik1-newtons-forsta-app.html': 'Newtons första lag',
  'fysik1-newtons-andra-app.html': 'Newtons andra lag',
  'fysik1-newtons-tredje-app.html': 'Newtons tredje lag',
  'fysik1-newtons-gravitationslag.html': 'Newtons gravitationslag',
  'fysik1-berg-och-dalbana.html': 'Berg-och-dalbana (energiprincipen)',
  'fysik1-tryck-pa-app.html': 'Tryck och tryckkraft',
  'fysik1-magdeburgska-halvklot.html': 'Magdeburgska halvkloten',
  'fysik1-flytkraft-app.html': [
    { name: 'Flyta eller sjunka', desc: 'Dra föremål från labbänken ner i akvariet, läs flytkartan och gissa om de flyter, svävar eller sjunker.',
      kw: ['lyftkraft','flytkraft','arkimedes','densitet','vätska','vatten','flyta','sjunka','sväva','flytförmåga','undanträngd','flytkarta','gissa','akvarium','massa','volym'] },
    { name: 'Arkimedes princip', href: 'fysik1-arkimedes.html', desc: 'Lyftkraft och undanträngt vatten med dynamometer.',
      kw: ['arkimedes','arkimedes princip','lyftkraft','flytkraft','dynamometer','undanträngt vatten','undanträngd','densitet','vätska'] },
  ],
  'fysik1-tryck.html': 'Ideala gaslagen',
  'fysik1-varme-app.html': 'Uppvärmning och avsvalning',
  'fysik1-influens.html': [
    { name: 'Elektrisk influens', desc: 'Hur en neutral aluminiumburk attraheras av en laddad stav.',
      kw: ['ellära','elektricitet','laddning','influens','elektrostatik','neutral','statisk elektricitet','aluminiumburk','laddad stav','elektroner','attraktion'] },
    { name: 'Bandgeneratorn', href: 'fysik1-bandgenerator-app.html', desc: 'Ladda klotet i 3D — gnistor mot jordad kula, flygande aluminiumformar och hår som reser sig.',
      kw: ['ellära','elektricitet','laddning','bandgenerator','van de graaff','gnista','urladdning','jordning','statisk elektricitet','elektrostatik','elektroner','3d','hår'] },
  ],
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

  // ── Fysik nivå 2 ──────────────────────────────────────────
  'fysik2-konisk-pendel.html': 'Konisk pendel',
  'fysik2-rorelse-app.html': 'Snett kast',
  'fysik2-svangningar-jamforelse.html': 'Jämförelse av svängningar',
  'fysik2-pendel-app.html': 'Plan pendel (matematisk)',
  'fysik2-resonans-app.html': 'Resonans (driven svängning)',
  'fysik2-staende-vag-app.html': 'Stående våg i sträng',
  'fysik2-vagsimulator.html': 'Vågsimulator',
  'fysik2-stavmagnet-app.html': [
    { name: 'Stavmagnetens magnetfält', desc: 'Magnetfältet kring en stavmagnet i 2D och 3D — dra magneten över en platta med kompassnålar, strö järnfilspån och rotera fältbilden fritt i rummet.',
      kw: ['magnetism','elektromagnetism','magnetfält','stavmagnet','permanentmagnet','fältlinjer','kompass','kompassnål','järnfilspån','nordpol','sydpol','poler','provkompass','3d'] },
    { name: 'Attraktion och repulsion', href: 'fysik2-magnetpoler-app.html', desc: 'Två stavmagneter på en labbänk — vänd polerna, släpp magneterna och se när magnetkraften övervinner friktionen. Lika poler repellerar, olika attraherar.',
      kw: ['magnetism','elektromagnetism','magnetkraft','attraktion','repulsion','attrahera','repellera','poler','nordpol','sydpol','stavmagnet','kraft på avstånd','newtons tredje lag'] },
  ],
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

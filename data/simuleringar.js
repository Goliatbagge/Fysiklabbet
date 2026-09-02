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
  'fysik1-newtons-tredje-app.html': [
    { name: 'Brandsläckaren i rymden', desc: 'Aktion och reaktion — navigera en astronaut med brandsläckare i rymden.',
      kw: ['krafter','newton','tredje lagen','aktion','reaktion','motkraft','rymd','raket','astronaut','brandsläckare','rekyl','impuls','mekanik'] },
    { name: 'Flugan i bägaren', href: 'fysik1-flugan-i-bagaren-app.html', desc: 'En fluga lyfter inne i en bägare på en känslig våg — ändras utslaget? Följ luftens nedsvep, vågens utslag och rörelsemängden, i realtid och ultrarapid.',
      kw: ['krafter','newton','tredje lagen','aktion','reaktion','motkraft','fluga','bägare','våg','vågutslag','laboratorievåg','rörelsemängd','lyftkraft','hovra','hovring','luft','nedsvep','vakuum','lock','impuls','fritt fall','mekanik'] },
  ],
  'fysik1-newtons-gravitationslag.html': 'Newtons gravitationslag',
  'fysik1-berg-och-dalbana.html': 'Berg-och-dalbana (energiprincipen)',
  'fysik1-tryck-pa-app.html': 'Tryck och tryckkraft',
  'fysik1-magdeburgska-halvklot.html': 'Magdeburgska halvkloten',
  'fysik1-flytkraft-app.html': [
    { name: 'Flyta eller sjunka', desc: 'Dra föremål från labbänken ner i akvariet, läs flytkartan och gissa om de flyter, svävar eller sjunker.',
      kw: ['lyftkraft','flytkraft','arkimedes','densitet','vätska','vatten','flyta','sjunka','sväva','flytförmåga','undanträngd','flytkarta','gissa','akvarium','massa','volym'] },
    { name: 'Arkimedes princip', href: 'fysik1-arkimedes.html', desc: 'Sänk en sten med dynamometer i ett bräddkärl — tyngdminskningen är exakt det undanträngda vattnets tyngd.',
      kw: ['arkimedes','arkimedes princip','lyftkraft','flytkraft','dynamometer','undanträngt vatten','undanträngd','densitet','vätska','bräddkärl','tyngdminskning','spännkraft'] },
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
  'fysik2-cirkular-rorelse-app.html': [
    { name: 'Cirkulär rörelse', desc: 'En bil i cirkelbana ovanifrån och en bil i loop. Visa verkliga krafter eller centripetalkraften (resultanten), hastighet, centripetalacceleration och radie — och hitta gränsfarten där bilen precis klarar loopen.',
      kw: ['rörelse','krafter','cirkulär','cirkelbana','centripetal','centripetalkraft','centripetalacceleration','vinkelhastighet','omega','banhastighet','banfart','radie','loop','looping','normalkraft','tyngdkraft','friktion','gränsfart','bil','kurva','mekanik'] },
    { name: 'Tomtebloss i skruvdragare', href: 'fysik2-tomtebloss-app.html', desc: 'Tänd ett tomtebloss fäst i en skruvdragare, i mörker — gnistorna lämnar cirkelbanan tangentiellt, precis som Newtons första lag säger. Med varvtalsglidare, ultrarapid och ljud.',
      kw: ['rörelse','cirkulär','cirkelbana','tomtebloss','gnistor','skruvdragare','tangent','tangentiellt','tröghet','tröghetslagen','newtons första lag','centripetalkraft','varvtal','mekanik'] },
    { name: 'Tvättsvamp i centrifug', href: 'fysik2-tomtebloss-app.html?sim=centrifug', desc: 'En blöt tvättsvamp i en roterande centrifugkorg sedd rakt uppifrån — vattendropparna lämnar banan tangentiellt enligt Newtons första lag.',
      kw: ['rörelse','cirkulär','cirkelbana','centrifug','tvättsvamp','vattendroppar','tangent','tangentiellt','tröghet','tröghetslagen','newtons första lag','centripetalkraft','varvtal','mekanik'] },
  ],
  'fysik2-kraftmoment-app.html': [
    { name: 'Gungbrädan — momentjämvikt', desc: 'Placera vikter på en gungbräda, dra i dem och se när kraftmomentet moturs balanserar kraftmomentet medurs (M = F · l).',
      kw: ['krafter','kraftmoment','vridmoment','moment','hävarm','hävstång','gungbräda','jämvikt','momentjämvikt','vridning','balans','statik','mekanik'] },
    { name: 'Skiftnyckeln och hävarmen', href: 'fysik2-skiftnyckel-app.html', desc: 'Flytta kraftens angreppspunkt längs skaftet, vrid kraften ett helt varv och se hävarmen — det vinkelräta avståndet till riktningslinjen — ändras i realtid. Lossnar den tröga muttern?',
      kw: ['krafter','kraftmoment','vridmoment','moment','hävarm','skiftnyckel','mutter','riktningslinje','angreppspunkt','vinkel','vinkelrät','vridningspunkt','vridning','medurs','moturs','verktyg','statik','mekanik'] },
  ],
  'fysik2-brada-tva-stod-app.html': [
    { name: 'Brädan på två bockar', desc: 'Dra i lasten och i stöden och se stödkrafterna F_P och F_Q live. Välj vridningspunkt fritt (vid ett stöd blir dess hävarm 0) och lös ut den andra kraften med momentlagen — och se brädan välta när tyngdpunkten passerar ett stöd.',
      kw: ['krafter','moment','vridmoment','kraftmoment','momentlagen','jämvikt','vridningspunkt','stöd','stödkraft','bock','bräda','hävarm','tyngdpunkt','vältning','statik','mekanik'] },
  ],
  'fysik2-gaffelbalans-app.html': [
    { name: 'Gaffelbalansen', desc: 'Det klassiska balanstricket i 3D: två gafflar i en kork balanserar på en nålspets mot den smala kanten av ett mynt på högkant. Knuffa till, ändra gaffelvinkeln och se varför det är så lätt — tyngdpunkten hamnar under stödpunkten.',
      kw: ['krafter','moment','kraftmoment','tyngdpunkt','stödpunkt','stabilitet','stabil jämvikt','balans','balanstrick','gaffel','gafflar','kork','nål','mynt','pendel','hävarm','3d','statik','mekanik'] },
    { name: 'Dubbelkonen som rullar uppför', href: 'fysik2-dubbelkon-app.html', desc: 'Den klassiska demonstrationen i 3D: en dubbelkon släpps vid den låga änden av en V-formad bana och rullar mot den höga — men tyngdpunkten sjunker hela vägen, eftersom kontaktpunkterna vandrar ut mot konens spetsar när skenorna går isär. Jämför med cylindern som rullar nedåt, ändra lutningen och hitta gränsen där illusionen bryts.',
      kw: ['krafter','tyngdpunkt','dubbelkon','kon','rullar uppför','uppförsbacke','lutande bana','illusion','rullning','cylinder','lägesenergi','kontaktpunkt','demonstration','3d','mekanik'] },
  ],
  'fysik2-konisk-pendel.html': 'Konisk pendel',
  'fysik2-rorelse-app.html': 'Snett kast',
  'fysik2-svangningar-jamforelse.html': 'Jämförelse av svängningar',
  'fysik2-pendel-app.html': 'Plan pendel (matematisk)',
  'fysik2-resonans-app.html': 'Resonans (driven svängning)',
  'fysik2-staende-vag-app.html': 'Stående våg i sträng',
  'fysik2-vagsimulator.html': 'Vågsimulator',
  'fysik2-stavmagnet-app.html': [
    { name: 'Stavmagnetens magnetfält', desc: 'Magnetfältet kring en stavmagnet i 2D och 3D — dra magneten över en platta med kompassnålar, strö järnfilspån och rotera fältbilden fritt i rummet.',
      kw: ['magnetism','elektromagnetism','magnetfält','stavmagnet','permanentmagnet','fältlinjer','kompass','kompassnål','järnfilspån','nordpol','sydpol','nordända','sydända','poler','provkompass','3d'] },
    { name: 'Attraktion och repulsion', href: 'fysik2-magnetpoler-app.html', desc: 'Två stavmagneter på en labbänk — vänd polerna, släpp magneterna och se när magnetkraften övervinner friktionen. Lika poler repellerar, olika attraherar.',
      kw: ['magnetism','elektromagnetism','magnetkraft','attraktion','repulsion','attrahera','repellera','poler','nordpol','sydpol','nordända','sydända','stavmagnet','kraft på avstånd','newtons tredje lag'] },
  ],
  'fysik2-magnetfalt-app.html': 'Magnetfält runt en rak ledare',
  'fysik2-jordmagnetiska-faltet.html': 'Jordmagnetiska fältet',
  'fysik2-magnetiskt-flode.html': 'Magnetiskt flöde',
  'fysik2-vaxelstromsgenerator.html': 'Växelströmsgenerator',
  'fysik2-virvelstrommar-app.html': [
    { name: 'Virvelströmmar i en pendel', desc: 'En aluminiumpendel svänger genom ett magnetfält och bromsas in av inducerade virvelströmmar. Justera flödestätheten, slå av elektromagneten mitt i svängningen och byt till en platta med spår.',
      kw: ['elektromagnetism','virvelström','virvelströmmar','induktion','lenz','lenz lag','broms','magnetbroms','induktionshäll','induktionsspis','pendel','aluminium','platta','spår','värme','flöde'] },
    { name: 'Magneten i kopparröret', href: 'fysik2-magnetror-app.html', desc: 'Släpp två likadana magneter samtidigt, en genom ett kopparrör och en genom ett plaströr, och se skillnaden: virvelströmmarna i kopparväggen bromsar magneten så att den sjunker med konstant fart, tills den lämnar rörmynningen och faller fritt sista biten. Se strömmarna virvla runt röret och magnetfältet de skapar inuti det, visa krafterna, ställ in varje rör för sig och jämför farten i v–t-diagrammet.',
      kw: ['elektromagnetism','virvelström','virvelströmmar','induktion','lenz','lenz lag','kopparrör','rör','magnet','fallande magnet','magnetbroms','broms','plaströr','aluminiumrör','gränshastighet','koppar','fritt fall','flöde','flödesändring'] },
  ],
  'fysik2-em-stralning.html': 'Elektromagnetisk strålning',
  'fysik2-dubbelspalt.html': 'Dubbelspaltexperimentet',
  'fysik2-wiens-lag.html': 'Wiens förskjutningslag',
  'fysik2-brytning-app.html': 'Brytningslagen',
  'fysik2-fotoelektrisk-effekt.html': 'Fotoelektrisk effekt',
  'fysik2-spektrallinjer.html': 'Spektrallinjer',
  'fysik2-energinivaer.html': 'Energinivåer i väteatomen',
  'fysik2-manens-faser.html': [
    { name: 'Månens faser', desc: 'Månens position i banan ger de olika månfaserna.',
      kw: ['astronomi','måne','månens faser','faser','nymåne','fullmåne','halvmåne','skära','omloppsbana','jorden','sol','3d'] },
    { name: 'Solförmörkelse', href: 'fysik2-solformorkelse.html', desc: 'Total solförmörkelse sedd från jorden — partiell fas, Bailys pärlor, diamantring och koronan.',
      kw: ['astronomi','solförmörkelse','förmörkelse','måne','sol','korona','totalitet','kromosfär','protuberans','bailys pärlor','diamantring','umbra','kärnskugga','skugga','ringformig','partiell','vinkeldiameter','centrallinje'] },
  ],
  'fysik2-solens-farg.html': 'Solens färg',
  'fysik2-neutronstjarna.html': 'Neutronstjärnan i skala',
};

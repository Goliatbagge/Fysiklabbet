// Fysiklabbet — central katalog över avsnitt och simuleringar.
// Strukturen följer användarens egna lärarmaterial (teori-PDFer i Genomgångar/),
// vilket är den auktoritativa kursindelningen: Ämne → Kurs → Kapitel → Avsnitt.
//
// Numreringen är "kap.avs" (t.ex. 2.3) och matchar PDF-filnamnen
// (Fy 1 2.03 Densitet → 2.3). Avsnitts-ID i URL:er har formen
// "fyN-K.A" där N är 1 eller 2 (t.ex. avsnitt.html#fy1-2.3).
//
// Fält per avsnitt:
//   num         — strängform "kap.avs"
//   title       — visningstitel
//   description — kort beskrivning (en mening)
//   href        — länk till simulering (eller null om saknas)
//   icon        — emoji
//   keywords    — sökord (för sökrutan)
//
// Lägger sig på window.KATALOG. window.KATALOG_FLAT är platt lista för sök.

window.KATALOG = {
  'Fysik': {
    label: 'Fysik',
    courses: {
      'Fysik nivå 1': {
        label: 'Fysik nivå 1',
        intro: {
          tagline: 'Det grundläggande ämnet i fysik på gymnasiet.',
          paragraphs: [
            'Fysik nivå 1 introducerar de stora idéerna som hela klassisk fysik vilar på: rörelse, krafter, energi och tryck. Vi börjar med att lära oss SI-systemet och hur man arbetar vetenskapligt, och bygger vidare mot Newtons lagar, värmelära, elektriska kretsar och kärnfysikens grunder.',
            'Fokus ligger på att förstå sambanden bakom formlerna — varför något händer, inte bara hur man räknar. Varje kapitel följs av övningsavsnitt med exempel och simuleringar.',
          ],
          bullets: [
            'Du lär dig: rörelsebeskrivning, krafter, energi och tryck',
            'Du tränar på: SI-enheter, formelhantering och problemlösning',
            'Du möter: värmelära, ellära, kärnfysik och relativitet',
          ],
        },
        chapters: {
          'Introduktion': {
            number: 1,
            intro: 'Vad fysik handlar om och hur vi mäter världen runt oss. Du lär dig det vetenskapliga arbetssättet, SI-systemets enheter och prefix, samt får möta de första rörelsebegreppen medelfart och densitet.',
            sections: [
              { num: '1.1', title: 'Fysik som ämne', description: 'Vad fysiken är, hur man arbetar vetenskapligt och varför enheter är centrala.', href: null, icon: '🔭', keywords: ['fysik','vetenskap','metod','introduktion'] },
              { num: '1.2', title: 'Storheter, enheter och prefix', description: 'SI-systemet, grundenheter och prefix från piko till tera.', href: 'fysik1-enhetskollen.html', icon: '📏', keywords: ['si-enheter','enheter','storheter','prefix','beteckningar','quiz'] },
              { num: '1.3', title: 'Medelfart', description: 'Sträcka delat med tid — det första rörelsebegreppet.', href: null, icon: '🏃', keywords: ['rörelse','kinematik','medelfart','hastighet','tid'] },
              { num: '1.4', title: 'Densitet', description: 'Hur tätt packat ett material är — ρ = m / V och vattnets densitet.', href: 'fysik1-densitet-app.html', icon: '🔬', keywords: ['densitet','massa','volym','flytförmåga','flytkraft','atomer','material','vatten'] },
            ],
          },
          'Rörelse': {
            number: 2,
            intro: 'Hur saker rör sig — sträcka, hastighet och acceleration. Vi lär oss tolka rörelsediagram och formulera sambanden mellan dem, från konstant hastighet till accelererad rörelse och fritt fall.',
            sections: [
              { num: '2.1', title: 'Vektoraddition', description: 'Addera två hastighetsvektorer geometriskt — med triangel- eller parallellogrammetoden. Dra i pilspetsarna.', href: 'fysik1-vektoraddition-app.html', icon: '➡️', keywords: ['vektor','vektoraddition','komposant','resultant','triangelmetoden','parallellogrammetoden','hastighet','geometri','riktning','fart'] },
              { num: '2.2', title: 'Läge-tid-diagram', description: 'Att läsa läge och hastighet ur ett s-t-diagram.', href: 'fysik1-stracka-tid-app.html', icon: '📈', keywords: ['rörelse','kinematik','läge','sträcka','tid','diagram','graf','hastighet'] },
              { num: '2.3', title: 'Acceleration och fritt fall', description: 'Vänd två glasrör med ett rosenblad och ett mynt — och se hur luftmotståndet försvinner i vakuum. Växla även till tyngdfaktorn g på jorden.', href: 'fysik1-tyngdfaktor-jorden.html', icon: '🪶', keywords: ['rörelse','acceleration','fritt fall','g','tyngdacceleration','gravitation','luftmotstånd','vakuum','vakuumpump','rosenblad','mynt','fjäder','galilei'] },
              { num: '2.4', title: 'Hastighet-tid-diagram', description: 'Att läsa acceleration och tillryggalagd sträcka ur ett v-t-diagram.', href: 'fysik1-hastighet-tid-app.html', icon: '📉', keywords: ['rörelse','kinematik','hastighet','tid','diagram','graf','acceleration'] },
              { num: '2.5', title: 'Acceleration-tid-diagram', description: 'Att läsa hastighetsändring ur ett a-t-diagram — arean mellan grafen och tidsaxeln ger Δv.', href: 'fysik1-acceleration-tid-app.html', icon: '📊', keywords: ['rörelse','kinematik','acceleration','tid','diagram','graf','area','hastighetsändring'] },
              { num: '2.6', title: 'Rörelse med konstant acceleration', description: 'Rörelseformlerna och hur de hänger ihop med diagrammen.', href: 'fysik1-rorelsediagram.html', icon: '🚀', keywords: ['rörelse','kinematik','konstant acceleration','formler','fritt fall','kast'] },
              { num: '2.7', title: 'Lösa ekvationssystem i GeoGebra', description: 'Att använda GeoGebra för att lösa ekvationssystem i fysikproblem.', href: null, icon: '🖥️', keywords: ['geogebra','ekvationssystem','verktyg','digitalt'] },
              { num: '2.8', title: 'Torricellis ekvation', description: 'Sambandet mellan hastighet, acceleration och sträcka utan tid.', href: null, icon: '⚗️', keywords: ['torricelli','kinematik','rörelse','ekvation'] },
            ],
          },
          'Krafter': {
            number: 3,
            intro: 'Vad som får saker att röra sig eller stanna. Newtons tre lagar förklarar samspelet mellan kraft, massa och rörelse — från friktion på lutande plan till gravitationen mellan planeter.',
            sections: [
              { num: '3.1', title: 'Kraft och Newtons första lag', description: 'Tröghet — en kropp förblir i vila eller likformig rörelse om resulterande kraft är noll. Tre scenarier: rymden, en bil och en fallskärmshoppare.', href: 'fysik1-newtons-forsta-app.html', icon: '⚖️', keywords: ['krafter','newton','första lagen','tröghetslagen','tröghet','jämvikt','resulterande kraft','konstant hastighet','likformig rörelse','luftmotstånd','gränshastighet','fallskärm','mekanik'] },
              { num: '3.2', title: 'Newtons andra lag', description: 'F = m · a — lägg en kraft på en kärra och se accelerationen. Ändra objektets massa och kraftens storlek.', href: 'fysik1-newtons-andra-app.html', icon: '➡️', keywords: ['krafter','newton','andra lagen','kraft','massa','acceleration','f=ma','kärra','vagn','resulterande kraft','dynamik','mekanik','hastighetsmätare'] },
              { num: '3.3', title: 'Newtons tredje lag', description: 'Aktion och reaktion — navigera med brandsläckare i rymden.', href: 'fysik1-newtons-tredje-app.html', icon: '🚀', keywords: ['krafter','newton','tredje lagen','aktion','reaktion','rymd','raket','impuls','mekanik'] },
              { num: '3.4', title: 'Tyngdkraft och normalkraft', description: 'Fyra situationer sida vid sida — låda på golv, låda på lutande plan, hand mot vägg och ballong mot tak. Dra i reglagen och se hur normalkraften alltid står vinkelrätt mot ytan och balanserar den pålagda kraften.', href: 'fysik1-tyngdkraft-normalkraft.html', icon: '🪨', keywords: ['krafter','tyngdkraft','normalkraft','underlag','jämvikt','kontaktkraft','lutande plan','vägg','tak','vinkelrät','komposant','newtons tredje lag','mekanik'] },
              { num: '3.5', title: 'Gravitationslagen', description: 'Kraften mellan två massor — F = G · m₁ · m₂ / r².', href: 'fysik1-newtons-gravitationslag.html', icon: '🪐', keywords: ['krafter','mekanik','newton','gravitation','gravitationslag','tyngdkraft','planet','stjärna','invers kvadratlag','massa','avstånd','rymd','astronomi'] },
              { num: '3.6', title: 'Friktion', description: 'Statisk och dynamisk friktion mellan ytor.', href: 'fysik1-friktion-app.html', icon: '🧱', keywords: ['krafter','friktion','statisk','dynamisk','ytor','friktionstal','my','normalkraft','glidning','material'] },
              { num: '3.7', title: 'Lutande plan', description: 'Låda (med friktion) och vagn (utan friktion) på ett lutande plan. Justera vinkel, massa och friktionstal, dela upp tyngdkraften i komposanter och se när lådan börjar glida.', href: 'fysik1-lutande-plan-app.html', icon: '📐', keywords: ['krafter','lutande plan','tyngdkraft','komposant','friktion','friktionstal','normalkraft','acceleration','newtons andra lag','glidning','vagn','låda','mekanik'] },
              { num: '3.8', title: 'Sneda spännkrafter', description: 'Exempel med spännkrafter i flera riktningar.', href: null, icon: '🪢', keywords: ['krafter','spännkraft','exempel','jämvikt'] },
              { num: '3.9', title: 'Accelerationens riktning', description: 'Att avgöra åt vilket håll accelerationen pekar.', href: null, icon: '↗️', keywords: ['krafter','acceleration','riktning','vektor'] },
              { num: '3.10', title: 'Trissor', description: 'Krafter och rörelse i system med trissor och linor.', href: null, icon: '⚙️', keywords: ['krafter','trissa','remskiva','mekanik'] },
            ],
          },
          'Energi': {
            number: 4,
            intro: 'En av fysikens viktigaste begrepp — energi kan omvandlas men aldrig försvinna. Du lär dig om arbete, lägesenergi, rörelseenergi, effekt och rörelsemängdens bevarande vid stötar.',
            sections: [
              { num: '4.1', title: 'Energi — intro och arbete', description: 'Definition av arbete och vad energi är.', href: null, icon: '⚡', keywords: ['energi','arbete','intro'] },
              { num: '4.2', title: 'Lägesenergi', description: 'Lägesenergin Ep = m · g · h i jordens gravitationsfält.', href: null, icon: '⛰️', keywords: ['energi','lägesenergi','gravitation','höjd'] },
              { num: '4.3', title: 'Rörelseenergi', description: 'Rörelseenergin Ek = m · v² / 2.', href: null, icon: '🏃', keywords: ['energi','rörelseenergi','hastighet','massa'] },
              { num: '4.4', title: 'Energiprincipen', description: 'Berg-och-dalbana utan friktion — släpp vagnen från toppen och se lägesenergi och rörelseenergi växla i realtidsdiagram, tillsammans med fart, acceleration och krafterna på personen.', href: 'fysik1-berg-och-dalbana.html', icon: '♻️', keywords: ['energi','energiprincipen','bevarande','berg-och-dalbana','bergochdalbana','lägesenergi','rörelseenergi','mekanisk energi','normalkraft','tyngdkraft','g-kraft','diagram','hastighet','acceleration'] },
              { num: '4.5', title: 'Effekt', description: 'Effekt P = E / t — arbete per tidsenhet.', href: null, icon: '⚡', keywords: ['energi','effekt','watt'] },
              { num: '4.6', title: 'Verkningsgrad', description: 'Hur mycket av tillförd energi som blir nyttig.', href: null, icon: '📊', keywords: ['energi','verkningsgrad','effektivitet'] },
              { num: '4.7', title: 'Rörelsemängd och impuls', description: 'p = m · v och I = F · t — bevarande av rörelsemängd.', href: null, icon: '🎱', keywords: ['mekanik','rörelsemängd','impuls','newton','kraft'] },
              { num: '4.8', title: 'Rörelsemängdens bevarande', description: 'Stötar i en eller två dimensioner.', href: null, icon: '💥', keywords: ['mekanik','rörelsemängd','bevarande','stöt','kollision'] },
              { num: '4.9', title: 'Arbete med friktion', description: 'Hur friktion omvandlar mekanisk energi till värme.', href: null, icon: '🔥', keywords: ['energi','friktion','värme','arbete'] },
            ],
          },
          'Tryck': {
            number: 5,
            intro: 'Hur krafter fördelas över ytor — från is som spricker under fötter till varmluftballonger som lyfter. Vi möter Arkimedes princip, lufttryck och den ideala gaslagen.',
            sections: [
              { num: '5.1', title: 'Tryck och tryckkraft', description: 'Tryck p = F / A — håller isen?', href: 'fysik1-tryck-pa-app.html', icon: '🧊', keywords: ['tryck','kraft','area','is','mekanik'] },
              { num: '5.2', title: 'Vätsketryck', description: 'Trycket i en vätska beror på djupet — p = ρ · g · h.', href: null, icon: '🌊', keywords: ['tryck','vätska','vatten','djup','hydrostatik'] },
              { num: '5.3', title: 'Lufttryck och totalt tryck', description: 'Atmosfärstrycket och dess effekter — Magdeburgska halvkloten.', href: 'fysik1-magdeburgska-halvklot.html', icon: '🐴', keywords: ['tryck','vakuum','atmosfärstryck','luft','historia','guericke'] },
              { num: '5.4', title: 'Lyftkraft och Arkimedes princip', description: 'Lyftkraft och undanträngt vatten med dynamometer.', href: 'fysik1-arkimedes.html', icon: '⚖️', keywords: ['arkimedes','lyftkraft','flytkraft','densitet','vätska','vatten','dynamometer'] },
              { num: '5.5', title: 'Gasers lyftkraft', description: 'Varför varmluftballonger och vätgasballonger lyfter.', href: null, icon: '🎈', keywords: ['tryck','gas','lyftkraft','ballong','densitet'] },
              { num: '5.6', title: 'Ideala gaslagen och kelvinskalan', description: 'Sambandet mellan tryck, volym och temperatur i en gas.', href: 'fysik1-tryck.html', icon: '💨', keywords: ['tryck','gas','ideala gaslagen','volym','temperatur','kelvin','termodynamik','molekyler'] },
              { num: '5.7', title: 'Pascals princip', description: 'Tryck fortplantas oförändrat i en vätska — hydraulik.', href: null, icon: '🛠️', keywords: ['tryck','pascal','hydraulik','vätska'] },
            ],
          },
          'Värmelära': {
            number: 6,
            intro: 'Vad värme egentligen är och hur den flyttas mellan föremål. Skillnaden mellan värme och temperatur, fasövergångar mellan fast, flytande och gas, samt termodynamikens grundlagar.',
            sections: [
              { num: '6.1', title: 'Värme och temperatur', description: 'Skillnaden mellan värme (energi) och temperatur (mått).', href: null, icon: '🌡️', keywords: ['värme','temperatur','energi','termodynamik'] },
              { num: '6.2', title: 'Uppvärmning och avsvalning', description: 'Värmekapacitet och hur kroppar växlar värme med omgivningen.', href: 'fysik1-varme-app.html', icon: '🔥', keywords: ['värme','värmelära','termodynamik','temperatur','strålning','energi','värmekapacitet'] },
              { num: '6.3', title: 'Faser och fasövergångar', description: 'Fast, flytande och gas — smältning, förångning och kondensation.', href: null, icon: '🧊', keywords: ['värme','fas','fasövergång','smältning','förångning','energi'] },
              { num: '6.4', title: 'Kroppen och värme', description: 'Hur människokroppen avger och tar upp värme.', href: null, icon: '🫀', keywords: ['värme','kropp','biologi','strålning'] },
              { num: '6.5', title: 'Termodynamikens fyra huvudsatser', description: 'Energins bevarande, entropi och absoluta nollpunkten.', href: null, icon: '📜', keywords: ['termodynamik','huvudsatser','entropi','energi'] },
            ],
          },
          'Elektricitet': {
            number: 7,
            intro: 'Från statisk elektricitet till elektriska kretsar. Du lär dig om laddningar, Coulombs lag, ström, spänning och resistans — och hur de kopplas ihop i kretsar via Ohms och Kirchhoffs lagar.',
            sections: [
              { num: '7.1', title: 'Laddning och influens', description: 'Hur en neutral aluminiumburk attraheras av en laddad stav.', href: 'fysik1-influens.html', icon: '🧲', keywords: ['ellära','elektricitet','laddning','influens','elektrostatik','neutral','statisk elektricitet'] },
              { num: '7.2', title: 'Krafter mellan laddningar och Coulombs lag', description: 'Elektrisk kraft mellan två laddningar — flytta och se kraften ändras.', href: 'fysik1-coulombs-lag.html', icon: '⚡', keywords: ['ellära','elektricitet','coulomb','elektrostatik','laddning','kraft','avstånd'] },
              { num: '7.3', title: 'Elektrisk ström', description: 'Vad ström är och hur den mäts.', href: null, icon: '🔌', keywords: ['ellära','elektricitet','ström','ampere'] },
              { num: '7.4', title: 'Spänning', description: 'Spänning som energi per laddning.', href: null, icon: '🔋', keywords: ['ellära','elektricitet','spänning','volt','energi'] },
              { num: '7.5', title: 'Resistans och Ohms lag', description: 'Hur elektroner rör sig i likströms- och växelströmskretsar.', href: 'fysik1-ellara-app.html', icon: '🪛', keywords: ['ellära','elektricitet','resistans','ohm','elektroner','likström','växelström','krets'] },
              { num: '7.6', title: 'Kopplingsscheman, serie- och parallellkoppling', description: 'Jämför kopplingar — krossa lampor och se vad som händer.', href: 'fysik1-serie-parallell.html', icon: '💡', keywords: ['ellära','elektricitet','serie','parallell','koppling','krets','resistans','lampor','kopplingsschema'] },
              { num: '7.7', title: 'Total resistans och ersättningsresistans', description: 'Räkna ut ersättningsresistans för serie och parallell.', href: null, icon: '∑', keywords: ['ellära','elektricitet','resistans','ersättningsresistans','serie','parallell'] },
              { num: '7.8', title: 'Komplexa kopplingar', description: 'Hur strömmar fördelas i en förgreningspunkt — Kirchhoffs lagar.', href: 'fysik1-kirchhoffs-lag.html', icon: '🔀', keywords: ['ellära','elektricitet','kirchhoff','ström','krets','förgrening','knutpunkt','komplexa kopplingar'] },
              { num: '7.9', title: 'Elektrisk effekt', description: 'P = U · I — hur mycket effekt en komponent omsätter.', href: null, icon: '⚡', keywords: ['ellära','elektricitet','effekt','watt'] },
              { num: '7.10', title: 'Elektriska fält och elektrisk fältstyrka', description: 'Visualisera fältlinjer från laddningar och plattor.', href: 'fysik1-elektriska-falt.html', icon: '📐', keywords: ['ellära','elektricitet','elektriska fält','fältlinjer','laddning','elektrostatik','fältstyrka','plattkondensator'] },
              { num: '7.11', title: 'Elektrisk fältstyrka mellan två plattor', description: 'Det homogena elektriska fältet mellan parallella plattor.', href: null, icon: '⚡', keywords: ['ellära','elektriska fält','plattkondensator','homogent fält','fältstyrka'] },
              { num: '7.12', title: 'Elektrisk potential', description: 'Spänning som potentialskillnad och nivåyta.', href: null, icon: '🔋', keywords: ['ellära','elektrisk potential','spänning','energi'] },
              { num: '7.13', title: 'Faradays bur', description: 'Hur ett metallhölje skärmar av elektriska fält.', href: 'fysik1-faradays-bur.html', icon: '🛡️', keywords: ['ellära','elektricitet','faraday','avskärmning','elektrostatik','ledare','bur'] },
              { num: '7.14', title: 'Millikans oljedroppsförsök', description: 'Hur Millikan mätte elementarladdningen.', href: null, icon: '💧', keywords: ['ellära','millikan','elementarladdning','oljedropp','historia','laddning'] },
            ],
          },
          'Relativitetsteori': {
            number: 8,
            intro: 'En försmak av Einsteins idé om att tid och rum inte är absoluta. Vi möter tidsdilatation, längdkontraktion och den berömda ekvationen E = m · c².',
            sections: [
              { num: '8.1', title: 'Relativitetsteori', description: 'Tidsdilatation, längdkontraktion och E = m · c².', href: null, icon: '🌌', keywords: ['modern fysik','relativitet','einstein','tidsdilatation','längdkontraktion'] },
            ],
          },
          'Kärnfysik': {
            number: 9,
            intro: 'Inne i atomkärnan — där protoner och neutroner hålls samman av enorma krafter. Du lär dig om radioaktivt sönderfall, halveringstid, massdefekt och hur olika typer av strålning påverkar oss.',
            sections: [
              { num: '9.1', title: 'Atomkärnan', description: 'Protoner och neutroner — uppbyggnad av atomkärnan.', href: 'fysik1-sonderfall.html', icon: '⚛️', keywords: ['kärnfysik','atomfysik','atomkärna','proton','neutron','isotop'] },
              { num: '9.2', title: 'Massdefekt och bindningsenergi', description: 'Massa omvandlas till energi när kärnor slås ihop — E = Δm · c².', href: 'fysik1-massdefekt.html', icon: '⚖️', keywords: ['kärnfysik','atomfysik','massdefekt','bindningsenergi','einstein','fusion','fission','e=mc2'] },
              { num: '9.3', title: 'Radioaktivt sönderfall', description: 'Alfa-, beta- och gammasönderfall av atomkärnor.', href: 'fysik1-sonderfall.html', icon: '☢️', keywords: ['kärnfysik','atomfysik','sönderfall','alfa','beta','gamma','strålning','radioaktivitet','atomkärna'] },
              { num: '9.4', title: 'Aktivitet och halveringstid', description: 'Exponentiellt sönderfall genom fem halveringstider.', href: 'fysik1-halveringstid.html', icon: '⏳', keywords: ['kärnfysik','atomfysik','halveringstid','aktivitet','radioaktivitet','exponentiell','sönderfall','kurva'] },
              { num: '9.5', title: 'Stråldoser', description: 'Alfa, beta och gamma genom textil, aluminium och bly.', href: 'fysik1-stralning-genomtranglighet.html', icon: '🛡️', keywords: ['kärnfysik','atomfysik','strålning','stråldos','alfa','beta','gamma','skärmning','gm-räknare','radioaktivitet'] },
            ],
          },
        },
      },
      'Fysik nivå 2': {
        label: 'Fysik nivå 2',
        intro: {
          tagline: 'Fördjupningsämnet som tar dig in i kvant- och relativitetsfysiken.',
          paragraphs: [
            'Fysik nivå 2 bygger vidare på Fysik nivå 1 och tar sig an svängningar, vågor, elektromagnetism och den moderna fysik som omformade vår världsbild på 1900-talet. Vi börjar med cirkulär rörelse och kaströrelse, fortsätter till ljudvågor och stående vågor, och möter sedan magnetiska fält, induktion och generatorer.',
            'Sista delen av ämnet handlar om ljus som både våg och partikel: brytning, diffraktion, fotoelektrisk effekt, Bohrs atommodell och spektrallinjer — grunden för dagens kvantfysik.',
          ],
          bullets: [
            'Du lär dig: cirkulär rörelse, vågor och elektromagnetism',
            'Du tränar på: vektorhantering, induktion och kvantsprång',
            'Du möter: svartkroppsstrålning, dubbelspaltexperimentet och Bohrs atom',
          ],
        },
        chapters: {
          'Rörelse och krafter': {
            number: 1,
            intro: 'Vi tar rörelseläran vidare till cirkulär rörelse, kaströrelse och kraftmoment. Du lär dig om centripetalkraft, vinkelhastighet, konisk pendel och hur du analyserar krökta rörelser.',
            sections: [
              { num: '1.1', title: 'Kraftmoment', description: 'Vridmoment kring en axel — M = F · l.', href: null, icon: '🔧', keywords: ['krafter','moment','vridmoment','hävarm','jämvikt'] },
              { num: '1.2', title: 'Mer kraftmoment', description: 'Fördjupade exempel på vridmoment och jämvikt.', href: null, icon: '⚖️', keywords: ['krafter','moment','vridmoment','exempel','jämvikt'] },
              { num: '1.3', title: 'Period, frekvens, radianer och vinkelhastighet', description: 'Grunderna för cirkulär rörelse — ω och T.', href: null, icon: '🌀', keywords: ['rörelse','cirkulär','period','frekvens','radian','vinkelhastighet','omega'] },
              { num: '1.4', title: 'Cirkulär rörelse', description: 'Centripetalkraft och centripetalacceleration i jämn cirkelrörelse.', href: null, icon: '🔄', keywords: ['rörelse','cirkulär','centripetal','vinkelhastighet','kraft'] },
              { num: '1.5', title: 'Konisk pendel', description: 'Interaktiv 3D-simulering — vrid, zooma och visa krafter. Kan växlas till jämförelse med harmonisk svängning och plan pendel.', href: 'fysik2-konisk-pendel.html', icon: '🪀', keywords: ['rörelse','konisk pendel','svängning','jämförelse','centripetal','3d','spännkraft','komposanter'] },
              { num: '1.6', title: 'Kaströrelse', description: 'Projektilrörelse och kastparabeln.', href: 'fysik2-rorelse-app.html', icon: '🎯', keywords: ['rörelse','kast','projektil','parabel','snett kast','kinematik','gravitation'] },
              { num: '1.7', title: 'Exempel — Den fatala gungan', description: 'Räkneexempel: cirkulär rörelse och centripetalkraft i en gunga.', href: null, icon: '🛝', keywords: ['krafter','cirkulär','gunga','exempel','centripetal'] },
              { num: '1.8', title: 'Exempel — Den flygande kossan', description: 'Räkneexempel: snett kast och rörelseanalys.', href: null, icon: '🐄', keywords: ['rörelse','kast','exempel','projektil'] },
            ],
          },
          'Mekaniska vågor': {
            number: 2,
            intro: 'Från svängande fjädrar till stående vågor och resonans i strängar och rör. Vi möter Hookes lag, harmoniska svängningar, ljudvågor, dopplereffekten och hur vågor bryts, böjs och möts.',
            sections: [
              { num: '2.1', title: 'Hookes lag', description: 'Kraften från en fjäder — F = k · x.', href: null, icon: '🪀', keywords: ['vågor','svängning','hooke','fjäder','kraft','kraftkonstant'] },
              { num: '2.2', title: 'Energi i fjäder', description: 'Elastisk energi i en sträckt eller hoptryckt fjäder.', href: null, icon: '⚡', keywords: ['vågor','svängning','fjäder','energi','elastisk'] },
              { num: '2.3', title: 'Harmonisk svängning', description: 'Sinusrörelse, amplitud, period och frekvens.', href: 'fysik2-svangningar-jamforelse.html', icon: '〰️', keywords: ['vågor','svängning','harmonisk','amplitud','period','frekvens','sinus'] },
              { num: '2.4', title: 'Svängningstid i fjäder', description: 'T = 2π · √(m / k) — fjäderpendel.', href: null, icon: '⏱️', keywords: ['vågor','svängning','fjäder','period','svängningstid'] },
              { num: '2.5', title: 'Plan pendel', description: 'Hur pendelns period beror på längd och tyngdfaktor.', href: 'fysik2-pendel-app.html', icon: '⏱️', keywords: ['vågor','pendel','matematisk pendel','plan pendel','period','svängning','gravitation','tyngdfaktor','harmonisk rörelse'] },
              { num: '2.6', title: 'Resonans', description: 'Drivna svängningar och fenomenet resonans.', href: null, icon: '📣', keywords: ['vågor','svängning','resonans','driven','frekvens'] },
              { num: '2.7', title: 'Pulser, vågor och utbredningshastighet', description: 'Tvärgående och längsgående vågor — v = f · λ.', href: null, icon: '🌊', keywords: ['vågor','puls','utbredning','hastighet','våglängd','frekvens'] },
              { num: '2.8', title: 'Reflexion, transmission och stående vågor', description: 'Vad som händer när en våg möter en gräns.', href: 'fysik2-staende-vag-app.html', icon: '🎸', keywords: ['vågor','reflexion','transmission','stående våg','gräns'] },
              { num: '2.9', title: 'Stående vågor i strängar', description: 'Resonans och övertoner — justera frekvens och spännkraft.', href: 'fysik2-staende-vag-app.html', icon: '🎸', keywords: ['vågor','stående våg','resonans','övertoner','sträng','frekvens','musik','harmonisk'] },
              { num: '2.10', title: 'Ljudvågor och stående vågor i rör', description: 'Längsvågor i luft och resonans i blåsinstrument.', href: null, icon: '🎺', keywords: ['vågor','ljud','rör','stående våg','resonans','blåsinstrument'] },
              { num: '2.11', title: 'Intensitet och ljudnivå', description: 'Intensitet I (W/m²) och ljudnivå i decibel.', href: null, icon: '🔊', keywords: ['vågor','ljud','intensitet','decibel','ljudnivå'] },
              { num: '2.12', title: 'Ljudfrekvens och dopplereffekt', description: 'Mekaniska vågor i 2D och 3D — interferens, doppler, nodlinjer.', href: 'fysik2-vagsimulator.html', icon: '🚓', keywords: ['vågor','ljud','frekvens','doppler','dopplereffekt','rörelse','källa'] },
              { num: '2.13', title: 'Vattenvågor och brytningslagen', description: 'Hur våghastigheten ändras vid gränsen mellan djupt och grunt vatten.', href: 'fysik2-vagsimulator.html', icon: '🌊', keywords: ['vågor','vatten','brytning','snells lag','refraktion','huygens'] },
              { num: '2.14', title: 'Diffraktion och interferens', description: 'Hur vågor böjs och möts — dubbelspaltexperiment.', href: 'fysik2-vagsimulator.html', icon: '〰️', keywords: ['vågor','diffraktion','interferens','dubbelspalt','huygens','nodlinjer'] },
            ],
          },
          'Elektromagnetism': {
            number: 3,
            intro: 'Magneter, strömförande ledare och hur ett varierande magnetfält genererar elektricitet. Här ligger grunden för motorer, generatorer, transformatorer och växelström.',
            sections: [
              { num: '3.1', title: 'Magnetism och magnetfält', description: 'Permanentmagneter, fältlinjer och kompassens funktion.', href: null, icon: '🧲', keywords: ['elektromagnetism','magnetism','magnetfält','permanentmagnet','kompass','fältlinjer'] },
              { num: '3.2', title: 'Magnetfält kring lång rak ledare', description: 'Högerhandsregeln och Oersteds experiment i 3D.', href: 'fysik2-magnetfalt-app.html', icon: '🧲', keywords: ['elektromagnetism','magnetism','magnetfält','ledare','högerhandsregeln','oersted','ström','3d'] },
              { num: '3.3', title: 'Magnetfält i spole', description: 'Magnetfältet inuti en strömförande spole — solenoid.', href: null, icon: '🌀', keywords: ['elektromagnetism','magnetfält','spole','solenoid','induktion'] },
              { num: '3.4', title: 'Laddade partiklar i magnetfält', description: 'Lorentz kraft F = q · v × B — cirkelbanor i magnetfält.', href: null, icon: '🧪', keywords: ['elektromagnetism','lorentz','laddning','magnetfält','cirkelrörelse'] },
              { num: '3.5', title: 'Strömförande ledare i magnetfält', description: 'Kraft på en ledare i magnetfält — F = B · I · l.', href: null, icon: '⚙️', keywords: ['elektromagnetism','ledare','magnetfält','kraft','motor'] },
              { num: '3.6', title: 'Jordmagnetiska fältet', description: 'Jordens magnetfält i 3D — varför kompassen pekar norrut.', href: 'fysik2-jordmagnetiska-faltet.html', icon: '🌍', keywords: ['elektromagnetism','magnetism','magnetfält','jorden','kompass','fältlinjer','3d','geomagnetism'] },
              { num: '3.7', title: 'Induktion och inducerad spänning', description: 'Faradays induktionslag — en ändring i flödet ger spänning.', href: null, icon: '🔄', keywords: ['elektromagnetism','induktion','faraday','spänning','flöde'] },
              { num: '3.8', title: 'Inducerad ström och Lenz lag', description: 'Riktningen på den inducerade strömmen.', href: null, icon: '🔄', keywords: ['elektromagnetism','induktion','lenz','ström','flöde'] },
              { num: '3.9', title: 'Magnetiskt flöde och induktion', description: 'Sambandet mellan magnetisk flödestäthet och flöde genom en yta.', href: 'fysik2-magnetiskt-flode.html', icon: '🧲', keywords: ['elektromagnetism','magnetism','magnetiskt flöde','flödestäthet','magnetfält','yta','faraday'] },
              { num: '3.10', title: 'Växelströmsgenerator', description: 'Roterande spole i ett magnetfält alstrar sinusformad växelspänning — Faradays lag i 3D.', href: 'fysik2-vaxelstromsgenerator.html', icon: '⚡', keywords: ['elektromagnetism','magnetism','växelström','generator','induktion','faraday','spole','sinus','3d'] },
              { num: '3.11', title: 'Transformator', description: 'Spänningsomsättning med två spolar och en gemensam järnkärna.', href: null, icon: '🔌', keywords: ['elektromagnetism','transformator','induktion','spole','spänning'] },
              { num: '3.12', title: 'Hastighetsväljare och masspektrometer', description: 'Att välja partiklar efter hastighet och mäta deras massa.', href: null, icon: '⚗️', keywords: ['elektromagnetism','hastighetsväljare','masspektrometer','partikel','laddning'] },
              { num: '3.13', title: 'Virvelströmmar', description: 'Inducerade strömmar i fasta metallföremål — bromsar och induktionshällar.', href: null, icon: '🔥', keywords: ['elektromagnetism','virvelström','induktion','broms','induktionshäll'] },
              { num: '3.14', title: 'Magnetfältsmätare (överkurs)', description: 'Hur en magnetfältsmätare fungerar — Hall-effekt.', href: null, icon: '📟', keywords: ['elektromagnetism','hall','mätare','magnetfält','överkurs'] },
            ],
          },
          'Ljus som våg och partikel': {
            number: 4,
            intro: 'Från ljusvågor och brytning till fotoner och kvantfysikens grundbegrepp. Vi möter Bohrs atommodell, fotoelektrisk effekt, spektrallinjer och dubbelspaltexperimentet.',
            sections: [
              { num: '4.1', title: 'Elektromagnetiska vågor och ljus', description: 'Spektrumet från radiovågor till gammastrålning.', href: 'fysik2-em-stralning.html', icon: '📡', keywords: ['vågor','modern fysik','elektromagnetisk strålning','em-spektrum','våglängd','frekvens','energi','radio','ljus','gamma','röntgen','foton'] },
              { num: '4.2', title: 'Ljus, diffraktion och interferens', description: 'Elektroner genom dubbelspalt — våg-partikeldualitet.', href: 'fysik2-dubbelspalt.html', icon: '🔬', keywords: ['vågor','optik','ljus','diffraktion','interferens','dubbelspalt','huygens'] },
              { num: '4.3', title: 'Svartkroppsstrålning', description: 'Hur strålningstoppen förskjuts när temperaturen ökar — Wiens lag.', href: 'fysik2-wiens-lag.html', icon: '🌡️', keywords: ['vågor','modern fysik','wien','förskjutningslag','strålning','temperatur','svartkropp','spektrum','termisk strålning'] },
              { num: '4.4', title: 'Ljusets brytning', description: 'Snells lag — ljus som bryts vid gränsytan mellan medier.', href: 'fysik2-brytning-app.html', icon: '💎', keywords: ['vågor','optik','ljus','brytning','snells lag','refraktion','totalreflektion','brytningsindex'] },
              { num: '4.5', title: 'Fotoelektrisk effekt', description: 'Ljusvågor mot en metallyta — Einsteins fotonteori.', href: 'fysik2-fotoelektrisk-effekt.html', icon: '💡', keywords: ['modern fysik','kvantfysik','fotoelektrisk effekt','einstein','foton','metall','utträdesarbete','våglängd','intensitet'] },
              { num: '4.6', title: 'Våg-partikeldualitet och de Broglies hypotes', description: 'Materievågor — alla partiklar är också vågor.', href: 'fysik2-dubbelspalt.html', icon: '🔬', keywords: ['modern fysik','kvantfysik','dubbelspalt','elektroner','interferens','våg-partikel','våg-partikeldualitet','de broglie','observation'] },
              { num: '4.7', title: 'Spektrallinjer', description: 'Grundämnenas fingeravtryck — emissions- och absorptionsspektrum.', href: 'fysik2-spektrallinjer.html', icon: '🌈', keywords: ['modern fysik','atomfysik','spektrallinjer','grundämnen','emission','absorption','spektrum','periodiska systemet','bohr'] },
              { num: '4.8', title: 'Bohrs atommodell och energinivåer', description: 'Bohrs atommodell — animera elektronhopp och se fotoner emitteras.', href: 'fysik2-energinivaer.html', icon: '⚛️', keywords: ['modern fysik','atomfysik','kvantfysik','energinivåer','bohr','bohrs atommodell','väte','elektron','skal','foton','emission','absorption','lyman','balmer','paschen','h-alfa','spektrum','jonisation'] },
            ],
          },
          'Astronomi': {
            number: 5,
            intro: 'Hur vi tolkar himlavalvet — från universums storskaliga struktur och stjärnors födelse till månens faser, stjärnors färger och svarta hål. Vi använder fysiken vi lärt oss för att förstå allt från solsystemets skala till galaxernas.',
            sections: [
              { num: '5.1', title: 'Universums struktur', description: 'Från solsystem till superhopar — och en känsla för skalorna.', href: null, icon: '✦', keywords: ['astronomi','universum','solsystem','galax','vintergatan','lokala gruppen','superhop','laniakea','ljusår','skala','kosmologi','andromeda'] },
              { num: '5.2', title: 'Mäta avstånd i rymden', description: 'Ljusår, astronomiska enheter och parallaxmetoden.', href: null, icon: '✦', keywords: ['astronomi','avstånd','parallax','parallaxmetoden','ljusår','astronomisk enhet','au','parsec','bågsekund','trigonometri','gaia','proxima centauri'] },
              { num: '5.3', title: 'Månens faser', description: 'Månens position i banan ger de olika månfaserna.', href: 'fysik2-manens-faser.html', icon: '🌙', keywords: ['astronomi','måne','faser','omloppsbana','jorden','sol','3d'] },
              { num: '5.4', title: 'Solens färg', description: 'Rayleighspridning — varför solen skiftar färg över dagen.', href: 'fysik2-solens-farg.html', icon: '🌅', keywords: ['vågor','optik','sol','rayleigh','spridning','atmosfär','färg','ljus','himmel','solnedgång'] },
              { num: '5.5', title: 'Svarta hål', description: 'Flykthastighet, händelsehorisont och Schwarzschildradien.', href: null, icon: '🕳️', keywords: ['astronomi','svart hål','svarta hål','händelsehorisont','schwarzschild','flykthastighet','gravitation','singularitet','supernova','neutronstjärna','relativitet','gravitationsvågor'] },
              { num: '5.6', title: 'Stjärnbildning', description: 'Från gasmoln till stjärna — gravitation mot tryck, fusion tänds.', href: null, icon: '✦', keywords: ['astronomi','stjärna','stjärnbildning','protostjärna','molekylmoln','gravitation','fusion','huvudserien','gasmoln','supernova','stjärnstoft','tryck'] },
            ],
          },
        },
      },
    },
  },
  // Matematik-ämnet är borttaget för tillfället; återinför objektet ovanför
  // denna kommentar när matte-innehållet är redo.
};

// Platt lista — full kontext per avsnitt. Används för sök och listvyer.
window.KATALOG_FLAT = (function () {
  const out = [];
  for (const subjectName in window.KATALOG) {
    const subject = window.KATALOG[subjectName];
    if (!subject.courses) continue;
    for (const courseName in subject.courses) {
      const course = subject.courses[courseName];
      if (!course.chapters) continue;
      for (const chapterName in course.chapters) {
        const chapter = course.chapters[chapterName];
        for (const section of (chapter.sections || [])) {
          out.push({
            subject: subjectName,
            course: courseName,
            chapter: chapterName,
            chapterNumber: chapter.number,
            ...section,
          });
        }
      }
    }
  }
  return out;
})();

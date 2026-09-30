// Övningsblad: utskriftsklara blad med mängdträning, kopplade till
// teoriavsnitten. Katalogen (katalog.html) visar kortet "Övningsblad" på
// varje avsnitt som har minst ett blad här, och vyn listar bladen med
// nivå och länkar. Ett avsnitt kan ha flera blad.
//
// Format:
//   window.OVNINGSBLAD = {
//     '<teori-id>': [               // samma id som i data/teori (ma1c-2.5)
//       {
//         titel: 'Ekvationslösningens grunder',
//         beskrivning: 'Ett steg, två steg, …',   // en rad om innehållet
//         niva: ['Grund'],          // 'Grund', 'Mellan', 'Avancerad': ett
//                                   // eller flera; visas som "Grund - Mellan".
//                                   // Aldrig betygsbokstäver (E, C, A):
//                                   // betyg sätts på kursen, inte på uppgifter.
//         antal: 40,                // antal uppgifter
//         html: 'ovningsblad/….html',   // sidan (läsbar i mobilen)
//         pdf:  'ovningsblad/….pdf',    // utskriftsversionen (A4)
//       },
//     ],
//   };
//
// Bladen i ovningsblad/ byggs av .claude/bygg-ovningsblad.js, som räknar
// fram lösningsförslagen maskinellt och kontrollerar dem genom insättning.
// Hävarmsbladet (fy2-1.1) byggs av .claude/bygg-ovningsblad-havarm.js, som
// räknar ut fotpunkterna och hävarmarna i facit ur figurernas koordinater.
// Kraftbladet (fy1-3.S) byggs av .claude/bygg-ovningsblad-krafter.js, som
// kontrollerar kraft- och momentsumman i varje facitfigur; kontakterna i
// figurerna mäts av .claude/verify-ovningsblad-kontakt.js. Potensbladet
// (ma1c-1.7) och de avancerade uppgifterna i Fysik 2 kapitel 1 (fy2-1.S)
// byggs av .claude/bygg-ovningsblad-potenser.js respektive
// .claude/bygg-ovningsblad-fy2-kap1-avancerad.js.
// Matematik nivå 1b och 2b speglas via aliaskartorna i katalog.html, så
// ett blad på ett ma1c-id syns automatiskt även i 1b.
window.OVNINGSBLAD = {
  'ma1c-2.5': [
    {
      titel: 'Ekvationslösningens grunder',
      beskrivning: 'Ett steg, två steg, *x* i högerledet och negativa tal. Genomräknat exempel först, lösningsförslag sist.',
      niva: ['Grund'],
      antal: 40,
      html: 'ovningsblad/ovningsblad-ekvationer-1.html',
      pdf: 'ovningsblad/ovningsblad-ekvationer-1.pdf',
    },
  ],
  'ma1c-2.6': [
    {
      titel: 'Variabler i båda led',
      beskrivning: 'Samla *x* på ena sidan, förenkla leden först, parenteser, ekvationer som saknar lösning eller har oändligt många.',
      niva: ['Grund'],
      antal: 40,
      html: 'ovningsblad/ovningsblad-ekvationer-2.html',
      pdf: 'ovningsblad/ovningsblad-ekvationer-2.pdf',
    },
  ],
  'ma1c-2.7': [
    {
      titel: 'Ekvationer med nämnare, typ 1',
      beskrivning: 'En bråkterm i ena ledet: täljaren är lika med kvoten gånger nämnaren. Med *x* i nämnaren och i täljaren.',
      niva: ['Grund'],
      antal: 35,
      html: 'ovningsblad/ovningsblad-ekvationer-3.html',
      pdf: 'ovningsblad/ovningsblad-ekvationer-3.pdf',
    },
    {
      titel: 'Ekvationer med nämnare, typ 2',
      beskrivning: 'En bråkterm i varje led: korsvis multiplikation. Med *x* i täljaren, i nämnaren och med ett tal framför *x*.',
      niva: ['Grund'],
      antal: 34,
      html: 'ovningsblad/ovningsblad-ekvationer-4.html',
      pdf: 'ovningsblad/ovningsblad-ekvationer-4.pdf',
    },
    {
      titel: 'Blandade ekvationer',
      beskrivning: 'Alla fyra typerna från avsnitt 2.5 till 2.7 huller om buller: bestäm först vilken sorts ekvation det är, välj sedan metod.',
      niva: ['Grund'],
      antal: 44,
      html: 'ovningsblad/ovningsblad-ekvationer-5.html',
      pdf: 'ovningsblad/ovningsblad-ekvationer-5.pdf',
    },
  ],
  'ma1c-1.7': [
    {
      titel: 'Potenser',
      beskrivning: 'Exponenten noll, negativa exponenter, potenslagarna och ekvationer som löses med dem. Uppgifterna är ordnade i tre nivåer, från en regel i taget till ekvationer med olika baser och ett generellt bevis. Tänkt efter alla genomgångar om potenser. Svar och lösningsförslag sist.',
      niva: ['Grund', 'Mellan', 'Avancerad'],
      antal: 63,
      html: 'ovningsblad/ovningsblad-potenser.html',
      pdf: 'ovningsblad/ovningsblad-potenser.pdf',
    },
  ],
  'fy1-3.S': [
    {
      titel: 'Rita krafterna',
      beskrivning: 'Rita alla krafter som verkar på en kropp, med rätt angreppspunkt och skalenliga längder. Femton situationer från en låda i vila till hiss, lutande plan och ett lastbilsflak som accelererar, med de vanliga fällorna inbyggda. Facit med förklaring till varje uppgift.',
      niva: ['Grund', 'Mellan'],
      antal: 15,
      html: 'ovningsblad/ovningsblad-krafter.html',
      pdf: 'ovningsblad/ovningsblad-krafter.pdf',
    },
  ],
  'fy2-1.1': [
    {
      titel: 'Rita hävarmen',
      beskrivning: 'Förläng kraftens riktningslinje och rita hävarmen som det kortaste avståndet från vridningspunkten, i rät vinkel mot linjen. Tolv figurer, från en ensam punkt och kraft till nyckel, gungbräda, kranbom och cykelvev.',
      niva: ['Grund'],
      antal: 12,
      html: 'ovningsblad/ovningsblad-havarm.html',
      pdf: 'ovningsblad/ovningsblad-havarm.pdf',
    },
  ],
  'fy2-1.S': [
    {
      titel: 'Kapitel 1, avancerade uppgifter',
      beskrivning: 'Nio uppgifter från hela kapitlet: kraftmoment, stabilitet, cirkulär rörelse, gravitation, konisk pendel och kaströrelse. Uppgifterna kräver att flera samband kombineras. Lösningsförslagen går att följa rad för rad, med figurer och numrerade ekvationer.',
      niva: ['Avancerad'],
      antal: 9,
      html: 'ovningsblad/ovningsblad-fy2-kap1-avancerad.html',
      pdf: 'ovningsblad/ovningsblad-fy2-kap1-avancerad.pdf',
    },
  ],
};

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
//         niva: ['Grund'],          // 'Grund', 'Medel', 'Avancerad' — ett
//                                   // eller flera; visas som "Grund - Medel"
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
};

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
};

// .claude/i18n/nb/delningspaket-tillagg.js — riktade ersättningar i det
// norska delningspaketet, för de få texter som byggs ihop i koden på ett
// sätt som bygg-delningspaket.js inte kan baka in automatiskt (ett ord som
// också är ett kodnamn, en mening som sätts ihop av delar). Varje rad är
// [svensk kod, norsk kod] och gäller filen i paketet efter inbakningen.
// Saknas den svenska koden (simuleringen har ändrats) varnar bygget.
// Nyckeln '*.js' gäller de delade skripten (minisim.js, kopplade-fjadrar.js).
'use strict';
module.exports = {
    'fysik2-kraftmoment-app.html': [
        ["arm > 0.02 ? 'medurs' :", "arm > 0.02 ? 'med klokka' :"],
    ],
    'fysik2-satellitbana-app.html': [
        ["tick(vk, 'krasch',", "tick(vk, 'krasj',"],
    ],
    'fysik2-magnetpoler-app.html': [
        ["I18N.t('Magneterna ' + info.laege) : 'Magneterna ' + info.laege",
         "I18N.t(LAEGE_NB[info.laege]) : LAEGE_NB[info.laege]"],
        ["const [info, setInfo] = useState(",
         "const LAEGE_NB = { 'attraherar': 'Magnetene tiltrekker hverandre', 'repellerar': 'Magnetene frastøter hverandre', 'sitter ihop': 'Magnetene sitter sammen' };\n            const [info, setInfo] = useState("],
    ],
    'fysik2-magnetror-app.html': [
        ["koppar: 'koppar' }", "koppar: 'kobber' }"],
        ['`Vänster (${', '`Venstre (${'],
        ['`Höger (${', '`Høyre (${'],
        ['`Material för ${namn}`', '`Materiale for ${namn}`'],
        ["'vänstra röret'", "'venstre rør'"],
        ["'högra röret'", "'høyre rør'"],
        ["'Vänster' : 'Röret'}: flödestäthet (", "'Venstre' : 'Røret'}: flukstetthet ("],
        ["'Vänster' : 'Röret'}: massa (", "'Venstre' : 'Røret'}: masse ("],
    ],
    'fysik2-cirkular-rorelse-app.html': [
        ["`${q.seg.name === 'vida' ? 'Vida' : 'Snäva'} kurvan: friktionen ger centripetalkraften`",
         "`${q.seg.name === 'vida' ? 'Den slake svingen' : 'Den krappe svingen'}: friksjonen gir sentripetalkraften`"],
    ],
    'fysik1-hiss-app.html': [
        ["lab: 'Hissen har sin största acceleration på väg upp'", "lab: 'Heisen har sin største akselerasjon på vei opp'"],
        ["lab: 'Hissen bromsar in som mest på väg upp'", "lab: 'Heisen bremser som mest på vei opp'"],
        ["lab: 'Hissen har sin största acceleration på väg ner'", "lab: 'Heisen har sin største akselerasjon på vei ned'"],
        ["lab: 'Hissen bromsar in som mest på väg ner'", "lab: 'Heisen bremser som mest på vei ned'"],
        ["lab: 'Hissen går sönder och faller fritt (teoretiskt)'", "lab: 'Heisen går i stykker og faller fritt (teoretisk)'"],
    ],
    'fysik1-flugan-i-bagaren-app.html': [
        ["'Rätt! Utslaget ' + gissaSc.svar.toLowerCase() + (gissaSc.svar === 'Uendret' ? ' — det är oförändrat.' : '.')",
         "(gissaSc.svar === 'Uendret' ? 'Riktig! Utslaget er uendret.' : 'Riktig! Utslaget ' + gissaSc.svar.toLowerCase() + '.')"],
        ["'Inte riktigt — rätt svar är \"' + gissaSc.svar + '\".'", "'Ikke helt: riktig svar er «' + gissaSc.svar + '».'"],
        ["'Fel — rätt svar: ' + gissaSc.svar", "'Feil. Riktig svar: ' + gissaSc.svar"],
    ],
    'fysik1-flytkraft-app.html': [
        ["(gissa.guess === blockData[0].status ? 'Rätt gissat' : 'Fel gissat') +", "(gissa.guess === blockData[0].status ? 'Riktig gjettet' : 'Feil gjettet') +"],
        ["' — föremålet ' + blockData[0].status.toLowerCase()", "': gjenstanden ' + blockData[0].status.toLowerCase()"],
    ],
    'fysik1-hastighet-tid-app.html': [
        ['`Area = bredd × höjd = ${', '`Areal = bredde × høyde = ${'],
        ['`Area = (bas × höjd) / 2 = (${', '`Areal = (grunnlinje × høyde) / 2 = (${'],
    ],
    'fysik1-stralning-genomtranglighet.html': [
        // Villkoret innehåller både hindret och I18N, så reservgrenen tas
        // inte bort automatiskt: ta bort både I18N-testet och den svenska raden.
        ["if ((barrier === 'textile' || barrier === 'aluminum') && window.I18N && I18N.nb) return", "if (barrier === 'textile' || barrier === 'aluminum') return"],
        [/\n[ \t]*if \(barrier === 'textile' \|\| barrier === 'aluminum'\) return `Gammastrålning passerar[^\n]*/, ''],
    ],
    'fysik1-newtons-gravitationslag.html': [
        ["label: 'Mörk rymd',", "label: 'Mørkt verdensrom',"],
    ],
    'fysik2-energinivaer.html': [
        ["series.name !== 'Okänd'", "series.name !== 'Ukjent'"],
    ],
    'fysik2-solformorkelse.html': [
        ["T(centralNamn + ' slutar om {t}'", "T(typ === 'total' ? 'Totaliteten slutter om {t}' : 'Den ringformede fasen slutter om {t}'"],
        ["T(centralNamn + ' börjar om {t}'", "T(typ === 'total' ? 'Totaliteten begynner om {t}' : 'Den ringformede fasen begynner om {t}'"],
    ],
    'kopplade-fjadrar.js': [
        ["'Tre upphängningar bredvid varandra med likadana fjädrar: en ensam fjäder, två seriekopplade fjädrar och två parallellkopplade fjädrar som bär en stång. Häng i vikterna så hänger 100 gram i varje upphängning, och förlängningen markeras: seriekopplingen förlängs dubbelt så mycket som den ensamma fjädern och parallellkopplingen hälften så mycket. Sätt dem i svängning för att se att seriekopplingen svänger långsammast och parallellkopplingen snabbast.'",
         "'Tre oppheng ved siden av hverandre med like fjærer: én fjær alene, to seriekoblede fjærer og to parallellkoblede fjærer som bærer en stang. Heng på loddene, så henger 100 gram i hvert oppheng, og forlengelsen markeres: seriekoblingen forlenges dobbelt så mye som fjæren alene, og parallellkoblingen halvparten så mye. Sett dem i svingning for å se at seriekoblingen svinger langsomst og parallellkoblingen raskest.'"],
        ["'Alla fjädrar har k = '", "'Alle fjærene har k = '"],
        ["'Samma massa, ' + fmt(s.m * 1000, 0) + ' g, i varje upphängning.'", "'Samme masse, ' + fmt(s.m * 1000, 0) + ' g, i hvert oppheng.'"],
    ],
};

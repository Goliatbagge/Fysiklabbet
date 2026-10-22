/* i18n/sidor/kopplingsschema.js — engelsk ordlista för kopplingsschema.html
 * och kopplingsschema.js (se .claude/i18n/RIKTLINJER.md).
 *
 * Text som byggs ihop i skriptet går via tl() = I18N.t, och nycklarna står
 * här. Ritytan (#svg) har no-i18n: där står användarens egna beteckningar.
 *
 * Vanliga frågor finns två gånger på sidan, synligt och i JSON-LD
 * (FAQPage). Båda översätts ur SAMMA nycklar nedan, så de förblir ordagrant
 * lika (Googles krav). JSON-LD skrivs om av ldJson() längst ned.
 */
(function () {
    var FAQ = {
        'Hur ritar man ett kopplingsschema?': 'How do you draw a circuit diagram?',
        'Rita ledningarna som raka linjer med räta vinklar och ersätt varje komponent med sin symbol. Seriekopplade komponenter ligger efter varandra på samma ledning, och parallellkopplade komponenter ligger på var sin gren mellan två knutpunkter. Här sköter verktyget ritandet åt dig: du drar bara in komponenterna, så fördelas de jämnt och knutpunkterna ritas ut.':
            'Draw the wires as straight lines with right angles and replace each component with its symbol. Components in series sit one after another on the same wire, and components in parallel sit on separate branches between two junctions. Here the tool does the drawing for you: you just drag in the components, and they are spaced evenly and the junctions are drawn.',
        'Vad är skillnaden mellan seriekoppling och parallellkoppling?': 'What is the difference between a series circuit and a parallel circuit?',
        'I en seriekoppling går samma ström genom alla komponenter, och spänningen delas mellan dem. I en parallellkoppling ligger samma spänning över alla grenar, och strömmen delas mellan grenarna.':
            'In a series circuit the same current flows through all the components, and the voltage is shared between them. In a parallel circuit the same voltage lies across all the branches, and the current is shared between the branches.',
        'Vilka symboler används i svenska kopplingsscheman?': 'Which symbols are used in Swedish circuit diagrams?',
        'Resistorn ritas som en rektangel, lampan som en cirkel med ett kryss och batteriet med ett långt tunt streck för pluspolen och ett kort tjockt streck för minuspolen. Amperemetern och voltmetern ritas som cirklar med bokstäverna A och V.':
            'The resistor is drawn as a rectangle, the lamp as a circle with a cross and the battery with a long thin line for the positive terminal and a short thick line for the negative terminal. The ammeter and the voltmeter are drawn as circles with the letters A and V.',
        'Kostar verktyget något?': 'Does the tool cost anything?',
        'Nej. Verktyget är gratis och kräver inget konto. Schemat sparas i din webbläsare, och du kan spara eller dela det som en länk.':
            'No. The tool is free and needs no account. The diagram is saved in your browser, and you can save or share it as a link.',
        'Hur får jag in kopplingsschemat i Word eller Google Dokument?': 'How do I get the circuit diagram into Word or Google Docs?',
        'Klicka på Kopiera bild och klistra in med Ctrl+V (Cmd+V på Mac). Bilden får ungefär samma storlek i dokumentet som i en lärobok, och under pilen bredvid knappen kan du välja liten, mellan eller stor bild eller ladda ned den som PNG eller SVG.':
            'Click Copy image and paste with Ctrl+V (Cmd+V on a Mac). The image gets roughly the same size in the document as in a textbook, and under the arrow next to the button you can choose a small, medium or large image or download it as PNG or SVG.'
    };
    I18N.add(FAQ);

    var BESKR = 'Rita kopplingsscheman online, gratis och utan inloggning. Dra in resistorer, lampor, batterier och mätare, få strömmen uträknad och kopiera bilden till Word eller PowerPoint.';
    var BESKR_EN = 'Draw circuit diagrams online, free and without logging in. Drag in resistors, lamps, batteries and meters, get the current calculated and copy the image into Word or PowerPoint.';

    I18N.add({
        // ---- Sidhuvud, meta och JSON-LD ----
        'Rita kopplingsschema online — Fysiklabbet': 'Draw circuit diagrams online — Fysiklabbet',
        'Rita kopplingsschema online': 'Draw circuit diagrams online',
        'Rita kopplingsschema': 'Draw circuit diagrams',
        'Kopplingsschema': 'Circuit diagram',
        'Skapa kopplingsschema online': 'Create a circuit diagram online',
        'Webbläsare': 'Web browser',
        'Dra och släpp komponenter på ledningarna': 'Drag and drop components onto the wires',
        'Jämn fördelning och centrering av komponenterna': 'Even spacing and centring of the components',
        'Serie- och parallellkoppling': 'Series and parallel circuits',
        'Kretssymboler enligt svensk standard': 'Circuit symbols following the Swedish standard',
        'Strömpilar vars riktning följer batteriets poler': 'Current arrows whose direction follows the battery terminals',
        'Automatisk uträkning av ström, spänning och resistans': 'Automatic calculation of current, voltage and resistance',
        'Kopiera bilden till Word, PowerPoint och Google Dokument': 'Copy the image into Word, PowerPoint and Google Docs',
        'Rita kopplingsscheman: ett kopplingsschema med en resistor i serie med två parallellkopplade resistorer och uträknade strömmar':
            'Draw circuit diagrams: a circuit diagram with a resistor in series with two resistors in parallel and calculated currents',

        // ---- Verktygets huvud ----
        'Verktyget för kopplingsscheman': 'The circuit diagram tool',
        'Rita kopplingsscheman som i läroboken: dra in komponenterna på ledningarna så ordnar sig schemat självt.':
            'Draw circuit diagrams like the ones in the textbook: drag the components onto the wires and the diagram arranges itself.',
        'Börja om med en tom krets': 'Start over with an empty circuit',
        'Ny krets': 'New circuit',
        'Ångra (Ctrl+Z)': 'Undo (Ctrl+Z)',
        'Ångra': 'Undo',
        'Gör om (Ctrl+Y)': 'Redo (Ctrl+Y)',
        'Gör om': 'Redo',
        'Kopiera bilden (Ctrl+C)': 'Copy the image (Ctrl+C)',
        'Fler sätt att spara': 'More ways to save',
        'Komponenter': 'Components',
        'Kopplingsschemat': 'The circuit diagram',
        'Ritytan': 'Drawing area',
        'Ändra bildens format': 'Change the shape of the image',
        'Dra för att ändra formatet. Dubbelklicka för att återställa.': 'Drag to change the shape. Double-click to reset.',
        'Värde': 'Value',
        'Stäng tipset': 'Close the tip',
        'Stäng': 'Close',
        'Egenskaper': 'Properties',

        // ---- Komponenterna ----
        'Batteri': 'Battery',
        'Växelspänning': 'AC source',
        'Växelspänningskälla': 'AC voltage source',
        'Resistor': 'Resistor',
        'Variabel resistor': 'Variable resistor',
        'Lampa': 'Lamp',
        'Strömbrytare': 'Switch',
        'Kondensator': 'Capacitor',
        'Diod': 'Diode',
        'Lysdiod': 'LED',
        'Amperemeter': 'Ammeter',
        'Voltmeter': 'Voltmeter',
        'Spänning': 'Voltage',
        'Resistans': 'Resistance',
        'Märkning': 'Rating',
        'Kapacitans': 'Capacitance',
        'Avläsning': 'Reading',
        'till exempel 12': 'for example 12',
        'till exempel 230': 'for example 230',
        'till exempel 20': 'for example 20',
        'till exempel 50': 'for example 50',
        'till exempel 6 V': 'for example 6 V',
        'till exempel 100': 'for example 100',
        'till exempel 0,50': 'for example 0.50',
        'till exempel 4,5': 'for example 4.5',
        'till exempel 0,40': 'for example 0.40',
        'Vänd polerna': 'Reverse the terminals',
        'Vänd riktning': 'Reverse the direction',
        'Källor': 'Sources',
        'Mätare': 'Meters',
        'Dra till en ledning, eller klicka för att lägga till': 'Drag onto a wire, or click to add',
        'Dra till en ledning i schemat, eller klicka för att lägga till.': 'Drag onto a wire in the diagram, or click to add.',

        // ---- Enheterna ----
        'mikroohm': 'microohm',
        'mikrovolt': 'microvolt',
        'mikroampere': 'microampere',
        'mikrofarad': 'microfarad',
        'pikofarad': 'picofarad',

        // ---- Mallar ----
        'Enkel krets': 'Simple circuit',
        'Seriekoppling': 'Series circuit',
        'Parallellkoppling': 'Parallel circuit',
        'Blandad koppling': 'Mixed circuit',
        'Med mätare': 'With meters',
        'Tom krets': 'Empty circuit',

        // ---- Inspektören: komponent ----
        'Vald komponent': 'Selected component',
        'Ta bort (Delete)': 'Delete (Delete)',
        'Ta bort': 'Delete',
        'Beteckning': 'Label',
        '(automatisk)': '(automatic)',
        'Ingen': 'None',
        '(uträknat)': '(calculated)',
        'Byt enhet': 'Change unit',
        'Uträknat ur de övriga värdena. Skriv ett eget värde, eller <b>?</b> om eleverna ska räkna ut det.':
            'Calculated from the other values. Type your own value, or <b>?</b> if the students are to work it out.',
        'Skriv <b>?</b> om storheten är okänd.': 'Type <b>?</b> if the quantity is unknown.',
        'Läge': 'Position',
        'Öppen': 'Open',
        'Sluten': 'Closed',
        'Spegla parallellkopplingen': 'Mirror the parallel section',
        'Visa text vid komponenten': 'Show text next to the component',
        'Byt till': 'Change to',
        'Byt till {namn}': 'Change to {namn}',
        'Tips: klicka på komponenten igen, eller börja skriva, så hamnar du i värdefältet.':
            'Tip: click the component again, or start typing, and you will end up in the value field.',
        'Parallellkopplingen spänner över': 'The parallel section spans',
        'Utöka åt vänster': 'Extend to the left',
        'Utöka åt höger': 'Extend to the right',
        'Utöka åt uppåt': 'Extend upwards',
        'Utöka åt nedåt': 'Extend downwards',
        'Krymp från vänster': 'Shrink from the left',
        'Krymp från höger': 'Shrink from the right',
        'Krymp från uppåt': 'Shrink from the top',
        'Krymp från nedåt': 'Shrink from the bottom',
        'Utöka tar med nästa komponent på ledningen, så att parallellkopplingen spänner över flera seriekopplade.':
            'Extend takes in the next component on the wire, so that the parallel section spans several components in series.',

        // ---- Inspektören: strömpil ----
        'Vald strömpil': 'Selected current arrow',
        'Strömmen i kretsen': 'The current in the circuit',
        'Strömmen i grenen': 'The current in the branch',
        'Dölj pilen': 'Hide the arrow',
        'Strömstyrka': 'Current',
        'Slå på "Värden" under inställningarna för att visa strömstyrkan.': 'Turn on "Values" in the settings to show the current.',
        'Texten står': 'Text position',
        'Ovanför': 'Above',
        'Under': 'Below',
        'Till vänster': 'To the left',
        'Till höger': 'To the right',
        'Placering på ledningen': 'Position on the wire',
        'Flytta bakåt': 'Move back',
        'Flytta framåt': 'Move forward',
        'Flytta pilen till nästa lediga ledningsbit.': 'Move the arrow to the next free piece of wire.',
        'Vänd pilens riktning': 'Reverse the arrow',
        'Riktningen följer batteriets poler: strömmen går ut från pluspolen, det långa strecket.':
            'The direction follows the battery terminals: the current leaves the positive terminal, the long line.',

        // ---- Inspektören: hela schemat ----
        'De givna värdena går inte ihop, så inget räknas ut. Kontrollera spänningar, resistanser och strömmar.':
            'The given values do not fit together, so nothing is calculated. Check the voltages, resistances and currents.',
        'Kretsen är kortsluten eller strömmen kan inte bestämmas (till exempel två amperemetrar parallellt), så inget räknas ut.':
            'The circuit is short-circuited or the current cannot be determined (for example two ammeters in parallel), so nothing is calculated.',
        'Kretsen innehåller en diod, en lysdiod eller växelspänning, så inga värden räknas ut automatiskt.':
            'The circuit contains a diode, an LED or an AC source, so no values are calculated automatically.',
        'Mätarna räknas som ideala och batterierna saknar inre resistans. Skriv <b>?</b> i ett fält för att dölja svaret.':
            'The meters are treated as ideal and the batteries have no internal resistance. Type <b>?</b> in a field to hide the answer.',
        'Hela schemat': 'The whole diagram',
        'Visa i schemat': 'Show in the diagram',
        'Beteckningar': 'Labels',
        'Värden': 'Values',
        '20 Ω, 12 V, 0,80 A': '20 Ω, 12 V, 0.80 A',
        'Räkna ut okända värden': 'Calculate unknown values',
        'Ström, spänning och resistans som följer av de givna värdena': 'Current, voltage and resistance that follow from the given values',
        'Strömpilar': 'Current arrows',
        'Riktningen följer batteriets poler': 'The direction follows the battery terminals',
        'Pilarna visas när kretsen har en spänningskälla. Dra in ett batteri så dyker de upp.':
            'The arrows appear when the circuit has a voltage source. Drag in a battery and they will show up.',
        'Vid växelspänning ritas inga strömpilar, eftersom strömmen byter riktning hela tiden.':
            'With an AC source no current arrows are drawn, since the current keeps changing direction.',
        'Visa delströmmar': 'Show branch currents',
        'Strömmarna i parallellgrenarna, <i>I</i>₁, <i>I</i>₂ …': 'The currents in the parallel branches, <i>I</i>₁, <i>I</i>₂ …',
        'Färg på pilarna': 'Arrow colour',
        'Svart': 'Black',
        'Blå': 'Blue',
        'Visa dolda pilar igen': 'Show hidden arrows again',
        'Format': 'Shape',
        'Dra i den runda knappen vid schemats nedre högra hörn för att göra bilden bredare, smalare, högre eller lägre.':
            'Drag the round button at the bottom right corner of the diagram to make the image wider, narrower, taller or shorter.',
        'Automatiskt format': 'Automatic shape',
        'Börja från': 'Start from',
        'Så gör du': 'How to',

        // ---- Exportmenyn och meddelanden ----
        'Kopiera bild': 'Copy image',
        'För Word, PowerPoint och Google Dokument': 'For Word, PowerPoint and Google Docs',
        'Ladda ned som PNG': 'Download as PNG',
        'Bildfil med hög upplösning': 'High-resolution image file',
        'Ladda ned som SVG': 'Download as SVG',
        'Vektorbild som går att skala fritt': 'Vector image that scales freely',
        'Kopiera länk till schemat': 'Copy link to the diagram',
        'Spara eller dela för att fortsätta senare': 'Save or share to continue later',
        'Storlek i dokumentet': 'Size in the document',
        'Liten': 'Small',
        'Mellan': 'Medium',
        'Stor': 'Large',
        'Genomskinlig bakgrund': 'Transparent background',
        'Komponenten togs bort.': 'The component was removed.',
        '{namn} är inlagd.': '{namn} has been added.',
        'Ritytan är tömd.': 'The drawing area has been cleared.',
        'Bilden är kopierad. Klistra in med Ctrl+V (Cmd+V på Mac) i ditt dokument.': 'The image has been copied. Paste it into your document with Ctrl+V (Cmd+V on a Mac).',
        'Webbläsaren tillät inte kopiering här, så bilden laddades ned i stället.': 'The browser did not allow copying here, so the image was downloaded instead.',
        'Länken är kopierad. Den öppnar exakt det här schemat.': 'The link has been copied. It opens exactly this diagram.',
        'Länken står nu i adressfältet. Kopiera den därifrån.': 'The link is now in the address bar. Copy it from there.',
        'Släpp här för att ta bort': 'Drop here to delete',

        // ---- Texten om verktyget ----
        'Rita kopplingsscheman online, gratis och utan inloggning': 'Draw circuit diagrams online, free and without logging in',
        'Ett kopplingsschema visar hur komponenterna i en elektrisk krets är kopplade till varandra, med standardiserade symboler i stället för bilder av sladdar och lampor. Här skapar du kopplingsscheman genom att dra in komponenter på ledningarna. Schemat ordnar sig självt: komponenterna fördelas jämnt och centreras, knutpunkterna ritas ut där ledningarna möts, och symbolerna ser ut som i läroböckerna i fysik på gymnasiet.':
            'A circuit diagram shows how the components in an electric circuit are connected to each other, using standard symbols instead of pictures of leads and lamps. Here you create circuit diagrams by dragging components onto the wires. The diagram arranges itself: the components are spaced evenly and centred, the junctions are drawn where the wires meet, and the symbols look like the ones in upper secondary physics textbooks.',
        'Börja rita ett kopplingsschema': 'Start drawing a circuit diagram',
        'Så skapar du ett kopplingsschema': 'How to create a circuit diagram',
        'Kretssymboler': 'Circuit symbols',
        'Symbolerna följer svensk standard och ritas som i läroböckerna i Fysik 1 och Fysik 2.': 'The symbols follow the Swedish standard and are drawn as in the textbooks for Physics 1 and Physics 2.',
        'Spänningskälla för likström. Det långa strecket är pluspolen.': 'Voltage source for direct current. The long line is the positive terminal.',
        'Spänningskälla för växelström.': 'Voltage source for alternating current.',
        'Komponent med en bestämd resistans.': 'Component with a fixed resistance.',
        'Resistor vars resistans kan ändras.': 'Resistor whose resistance can be changed.',
        'Glödlampa som lyser när ström går genom den.': 'Light bulb that glows when a current flows through it.',
        'Bryter eller sluter kretsen.': 'Opens or closes the circuit.',
        'Lagrar laddning och spärrar likström när den är laddad.': 'Stores charge and blocks direct current when charged.',
        'Leder ström bara i den riktning triangeln pekar.': 'Conducts current only in the direction the triangle points.',
        'Diod som lyser när ström går genom den.': 'Diode that lights up when a current flows through it.',
        'Mäter strömmen och kopplas i serie.': 'Measures the current and is connected in series.',
        'Mäter spänningen och kopplas parallellt.': 'Measures the voltage and is connected in parallel.',
        'Ström och spänning räknas ut automatiskt': 'Current and voltage are calculated automatically',
        'När spänningen och resistanserna är kända räknar verktyget ut strömmen i varje gren med Ohms lag och Kirchhoffs lagar. Det fungerar också åt andra hållet: är strömmen och resistanserna givna räknas spänningen ut. Svaret avrundas till lika många värdesiffror som det minst noggranna givna värdet. Mätarna räknas som ideala och batterierna saknar inre resistans.':
            'When the voltage and the resistances are known, the tool calculates the current in each branch using Ohm\'s law and Kirchhoff\'s laws. It also works the other way round: if the current and the resistances are given, the voltage is calculated. The answer is rounded to as many significant figures as the least precise given value. The meters are treated as ideal and the batteries have no internal resistance.',
        'Vanliga frågor': 'Frequently asked questions',
        'Läs mer om elektriska kretsar': 'Read more about electric circuits',
        'Kopplingsscheman, serie- och parallellkoppling': 'Circuit diagrams, series and parallel circuits',
        'Resistans och Ohms lag': 'Resistance and Ohm\'s law',
        'Total resistans och ersättningsresistans': 'Total resistance and equivalent resistance',
        'Komplexa kopplingar och Kirchhoffs lagar': 'Complex circuits and Kirchhoff\'s laws',
        'Simulering av serie- och parallellkoppling': 'Simulation of series and parallel circuits'
    });
    var meta = {}; meta[BESKR] = BESKR_EN; I18N.add(meta);

    I18N.addHtml({
        'Rita kopplings<em>schema</em>': 'Draw circuit <em>diagrams</em>',
        'Kopiera <span class="lbl-long">bild</span>': 'Copy <span class="lbl-long">image</span>',
        '<b>Kom igång:</b> dra en komponent från listan till en ledning. Allt fördelas jämnt av sig självt. Släpp den bredvid en komponent så parallellkopplas den.':
            '<b>Get started:</b> drag a component from the list onto a wire. Everything is spaced evenly by itself. Drop it next to a component to connect it in parallel.',
        // Så gör du (inspektören)
        '<b>Dra</b> en komponent till en ledning. Den sätts i serie, och allt fördelas jämnt.': '<b>Drag</b> a component onto a wire. It is placed in series, and everything is spaced evenly.',
        '<b>Släpp</b> den bredvid en komponent för att parallellkoppla.': '<b>Drop</b> it next to a component to connect in parallel.',
        '<b>Släpp</b> den på en bred streckad list ovanför eller under flera komponenter för att parallellkoppla över alla dem. Ju längre ut listen sitter, desto fler spänner den över.':
            '<b>Drop</b> it on a wide dashed strip above or below several components to connect it in parallel across all of them. The further out the strip is, the more components it spans.',
        '<b>Släpp</b> den på en lodrät ledningsbit i en parallellkoppling, så hamnar den i serie med den yttersta grenen men ritas på den lodräta biten.':
            '<b>Drop</b> it on a vertical piece of wire in a parallel section, and it ends up in series with the outermost branch but is drawn on the vertical piece.',
        '<b>Klicka</b> på en komponent för att skriva in värden.': '<b>Click</b> a component to type in values.',
        '<b>Dra bort</b> en komponent till papperskorgen eller tryck Delete.': '<b>Drag</b> a component to the bin or press Delete to remove it.',
        '<b>Kopiera bild</b> och klistra in i Word, PowerPoint eller Google Dokument.': '<b>Copy image</b> and paste it into Word, PowerPoint or Google Docs.',
        // Så skapar du ett kopplingsschema (texten om verktyget)
        '<b>Dra en komponent till en ledning.</b> Den seriekopplas där du släpper den, och de andra komponenterna flyttar sig så att mellanrummen blir lika stora.':
            '<b>Drag a component onto a wire.</b> It is connected in series where you drop it, and the other components move so that the gaps become equal.',
        '<b>Släpp den bredvid en komponent</b> för att parallellkoppla. De breda listerna ovanför och under en rad komponenter kopplar den parallellt över flera på en gång.':
            '<b>Drop it next to a component</b> to connect in parallel. The wide strips above and below a row of components connect it in parallel across several at once.',
        '<b>Klicka på en komponent och skriv in värdet,</b> till exempel resistansen 20 Ω eller spänningen 12 V. Klicka på enheten för att välja kΩ, mA eller någon annan enhet.':
            '<b>Click a component and type in the value,</b> for example the resistance 20 Ω or the voltage 12 V. Click the unit to choose kΩ, mA or another unit.',
        '<b>Slå på strömpilar</b> om strömmens riktning och storlek ska synas. Riktningen följer batteriets poler.':
            '<b>Turn on current arrows</b> if the direction and size of the current should be shown. The direction follows the battery terminals.',
        '<b>Kopiera bilden</b> och klistra in den i Word, PowerPoint eller Google Dokument. Den kan också laddas ned som PNG eller SVG.':
            '<b>Copy the image</b> and paste it into Word, PowerPoint or Google Docs. It can also be downloaded as PNG or SVG.',
        'Ska eleverna räkna själva skriver du ett frågetecken i fältet, så står det till exempel <i>I</i> = ? i schemat.':
            'If the students are to do the calculation themselves, type a question mark in the field, and the diagram shows for example <i>I</i> = ?.'
    });

    // Symbolernas namn i texten om verktyget står i <b> intill en <small>;
    // de är vanliga textnoder och översätts av namnen ovan.

    // ---- JSON-LD: samma översättningar som den synliga texten ----
    function ldJson() {
        var els = document.querySelectorAll('script[type="application/ld+json"]');
        for (var i = 0; i < els.length; i++) {
            try {
                var d = JSON.parse(els[i].textContent);
                (function walk(o) {
                    for (var k in o) {
                        var v = o[k];
                        if (typeof v === 'string') {
                            if (k === 'inLanguage') o[k] = 'en';
                            else if (k === 'url' || k === 'item') o[k] = I18N.url(v);
                            else if (k === 'name' && v === 'Start') o[k] = 'Home';
                            else o[k] = I18N.t(v);
                        } else if (v && typeof v === 'object') walk(v);
                    }
                })(d);
                els[i].textContent = JSON.stringify(d, null, 1);
            } catch (e) { /* lämna orörd */ }
        }
        var alt = document.querySelector('meta[property="og:image:alt"]');
        if (alt) alt.content = I18N.t(alt.content);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ldJson);
    else ldJson();
})();

/* i18n/nb/sidor/fysik2-jordmagnetiska-faltet.js — norska (bokmål) för
 * simuleringen Jordmagnetiska fältet. Statisk sida: stycken med inbäddade
 * <span> översätts som hela stycken med addHtml. */
(function () {
    I18N.add({
        'Jordmagnetiska fältet — Fysiklabbet': 'Jordens magnetfelt — Fysiklabbet',
        'Jordens magnetfält i 3D — varför kompassen pekar norrut.': 'Jordens magnetfelt i 3D: hvorfor kompasset peker mot nord.',
        'Jordmagnetiska fältet — Fysik nivå 2': 'Jordens magnetfelt — Fysikk nivå 2',
        'Jordmagnetiska fältet': 'Jordens magnetfelt',
        'Dra för att rotera modellen': 'Dra for å rotere modellen',
        'Magnetfält': 'Magnetfelt',
        'Fler fältlinjer': 'Flere feltlinjer',
        'Stavmagnet': 'Stavmagnet',
        'Om simuleringen': 'Om simuleringen',
        'Om jordmagnetiska fältet': 'Om jordens magnetfelt',
        'Jorden beter sig som en gigantisk stavmagnet med ett magnetfält som sträcker sig långt ut i rymden. Detta fält skyddar oss från solvindar och kosmisk strålning.':
            'Jorden oppfører seg som en gigantisk stavmagnet med et magnetfelt som strekker seg langt ut i verdensrommet. Dette feltet beskytter oss mot solvind og kosmisk stråling.',
        'Magnetfältets egenskaper': 'Magnetfeltets egenskaper',
        '• Vid ekvatorn är fältet horisontellt, vid polerna är det vertikalt.': '• Ved ekvator er feltet horisontalt, ved polene er det vertikalt.',
        '• Magnetfältets styrka vid jordytan är cirka 25-65 µT.': '• Magnetfeltets styrke ved jordoverflaten er omtrent 25-65 µT.',
        'Interaktion': 'Interaksjon',
        // Förklaringen (legenden) som byggs i JS
        'Kontinenter': 'Kontinenter',
        'Hav': 'Hav',
        'Magnetfältslinjer': 'Magnetiske feltlinjer',
        'Geografiska nordpolen (N)': 'Den geografiske nordpolen (N)',
        'Geografiska sydpolen (S)': 'Den geografiske sørpolen (S)',
        // Fragment, om styckena ändå delas upp
        'Viktigt:': 'Viktig:',
        'sydända': 'sørende',
        'ut ur': 'ut av',
        'in i': 'inn i',
        'Vänsterklick + dra': 'Venstreklikk + dra',
        'Scrollhjul': 'Rullehjul',
        'Högerklick + dra': 'Høyreklikk + dra'
    });
    I18N.addHtml({
        '<span class="highlight">Viktigt:</span> Jordens magnetiska pol i norr är en <span class="highlight-white">sydända</span>! Det är därför kompassens nordända pekar norrut: olika poler attraherar, så nordändan dras mot en sydända.':
            '<span class="highlight">Viktig:</span> Jordens magnetiske pol i nord er en <span class="highlight-white">sørende</span>! Det er derfor nordenden på kompasset peker mot nord: ulike poler tiltrekker hverandre, så nordenden trekkes mot en sørende.',
        'Stavmagneten i modellen visar detta: <span class="highlight-red">röd nordända (N)</span> nära den geografiska sydpolen, <span class="highlight-white">vit sydända (S)</span> nära den geografiska nordpolen.':
            'Stavmagneten i modellen viser dette: <span class="highlight-red">rød nordende (N)</span> nær den geografiske sørpolen, <span class="highlight-white">hvit sørende (S)</span> nær den geografiske nordpolen.',
        '• Fältlinjerna går <span class="highlight">ut ur</span> stavmagnetens nordända (nära den geografiska sydpolen) och <span class="highlight">in i</span> dess sydända (nära den geografiska nordpolen).':
            '• Feltlinjene går <span class="highlight">ut av</span> nordenden på stavmagneten (nær den geografiske sørpolen) og <span class="highlight">inn i</span> sørenden (nær den geografiske nordpolen).',
        '<span class="highlight">Vänsterklick + dra</span> — rotera modellen': '<span class="highlight">Venstreklikk + dra</span>: roter modellen',
        '<span class="highlight">Scrollhjul</span> — zooma in/ut': '<span class="highlight">Rullehjul</span>: zoom inn og ut',
        '<span class="highlight">Högerklick + dra</span> — panorera': '<span class="highlight">Høyreklikk + dra</span>: panorer',
        '<span class="highlight">Fullskärm</span> — knappen uppe till vänster i scenen': '<span class="highlight">Fullskjerm</span>: knappen øverst til venstre i scenen'
    });
})();

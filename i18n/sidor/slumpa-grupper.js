/* i18n/sidor/slumpa-grupper.js — engelsk ordlista för slumpa-grupper.html och
 * slumpa-grupper.js (se .claude/i18n/RIKTLINJER.md).
 *
 * Elevernas och klasslistornas namn är användarens egen text: de visas i
 * element med klassen no-i18n och översätts aldrig. Filformatet (.json) är
 * detsamma på båda språken.
 *
 * Verktygets namn är "Random groups" (som i huvudmenyn), medan knappen som
 * slumpar heter "Shuffle groups". Därför har menyn en egen nav:-nyckel.
 *
 * Vanliga frågor finns två gånger på sidan, synligt och i JSON-LD
 * (FAQPage). Båda översätts ur SAMMA nycklar nedan, så de förblir ordagrant
 * lika (Googles krav). JSON-LD skrivs om av ldJson() längst ned.
 */
(function () {
    I18N.add({
        // ---- Vanliga frågor (synligt + JSON-LD) ----
        'Var sparas mina klasslistor?': 'Where are my class lists saved?',
        'Klasslistorna sparas bara i din egen webbläsare, på den dator du använder. Inga namn skickas till någon server. Vill du använda en lista på en annan dator sparar du den som fil och öppnar filen där.':
            'The class lists are saved only in your own browser, on the computer you are using. No names are sent to any server. If you want to use a list on another computer, save it as a file and open the file there.',
        'Hur sparar jag en gruppindelning?': 'How do I save a set of groups?',
        'Välj Spara grupperna som fil i menyn Spara. Filen innehåller både grupperna och klasslistan, och när du öppnar den igen visas grupperna precis som du lämnade dem. Grupperna kan också sparas som textfil, kopieras som text eller skrivas ut.':
            'Choose Save the groups as a file in the Save menu. The file contains both the groups and the class list, and when you open it again the groups appear exactly as you left them. The groups can also be saved as a text file, copied as text or printed.',
        'Vad händer om eleverna inte går jämnt ut i grupperna?': 'What happens if the students do not divide evenly into groups?',
        'Då väljer du om du hellre vill ha några större eller några mindre grupper. Med 25 elever och fyra per grupp blir det antingen sex grupper, där en har fem elever, eller sju grupper, där tre har tre elever. Grupperna blir aldrig mer än en elev olika stora.':
            'Then you choose whether you would rather have a few larger or a few smaller groups. With 25 students and four per group you get either six groups, one of which has five students, or seven groups, three of which have three students. The groups never differ in size by more than one student.',
        'Kan jag bestämma att två elever inte ska hamna i samma grupp?': 'Can I decide that two students should not end up in the same group?',
        'Ja. Lägg till ett villkor och välj Hålls isär, eller Tillsammans om de ska arbeta ihop. Villkoret kan gälla alltid eller bara nästa slumpning. Villkor som ska gälla alltid sparas med klasslistan.':
            'Yes. Add a condition and choose Kept apart, or Together if they should work together. The condition can apply always or only to the next shuffle. Conditions that always apply are saved with the class list.',
        'Kostar verktyget något?': 'Does the tool cost anything?',
        'Nej. Verktyget är gratis och kräver inget konto.': 'No. The tool is free and needs no account.',

        // ---- Meta och JSON-LD ----
        'Slumpa grupper: gruppgenerator för klassrummet — Fysiklabbet': 'Random groups: group generator for the classroom — Fysiklabbet',
        'Slumpa grupper: gruppgenerator för klassrummet': 'Random groups: group generator for the classroom',
        'Slumpa fram grupper ur din klasslista. Bocka för vilka som är här, välj gruppstorlek, bestäm vilka som ska arbeta tillsammans eller hållas isär och flytta elever med musen. Spara grupperna som fil. Gratis och utan inloggning.':
            'Make random groups from your class list. Tick who is here, choose the group size, decide who should work together or be kept apart and move students with the mouse. Save the groups as a file. Free and without logging in.',
        'Gruppgenerator': 'Group generator',
        'Slumpa elevgrupper': 'Random student groups',
        'Dela in klassen i grupper': 'Divide the class into groups',
        'Webbläsare': 'Web browser',
        'Klasslistor som sparas i webbläsaren': 'Class lists saved in the browser',
        'Närvaro: bocka av den som inte är här': 'Attendance: untick anyone who is not here',
        'Elever per grupp eller antal grupper': 'Students per group or number of groups',
        'Villkor: elever som ska arbeta tillsammans eller hållas isär': 'Conditions: students who should work together or be kept apart',
        'Flytta och byt elever mellan grupperna': 'Move and swap students between the groups',
        'Fullskärmsläge för projektorn': 'Full-screen mode for the projector',
        'Spara grupper och klasslistor som fil, utan konto': 'Save groups and class lists as a file, without an account',
        'Kopiera grupperna som text eller skriv ut dem': 'Copy the groups as text or print them',

        // ---- Verktygets namn och huvud ----
        'nav:Slumpa grupper': 'Random groups',
        'Slumpa grupper': 'Shuffle groups',
        'Välj klass, bocka av den som inte är här och slumpa fram grupperna. Dra i namnen för att flytta någon.':
            'Choose a class, untick anyone who is not here and shuffle the groups. Drag the names to move someone.',
        'Öppna en sparad fil': 'Open a saved file',
        'Spara grupperna som fil': 'Save the groups as a file',
        'Fler sätt att spara': 'More ways to save',
        'Klass och närvaro': 'Class and attendance',
        'Grupperna': 'Groups',
        'Gruppstorlek och villkor': 'Group size and conditions',

        // ---- Dialogen ----
        'Ny klasslista': 'New class list',
        'Redigera klasslistan': 'Edit the class list',
        'Namn på listan': 'Name of the list',
        'Till exempel NA24b': 'For example NA24b',
        'Elever, en per rad': 'Students, one per line',
        '0 elever': '0 students',
        'Avbryt': 'Cancel',
        'Spara listan': 'Save the list',

        // ---- Vänsterpanelen ----
        'Klass': 'Class',
        'Börja med att skriva in eller klistra in namnen i klassen. Listan sparas i den här webbläsaren.': 'Start by typing or pasting the names in the class. The list is saved in this browser.',
        'Har du en sparad fil?': 'Do you have a saved file?',
        'Öppna den': 'Open it',
        'Välj klasslista': 'Choose a class list',
        'Redigera listan': 'Edit the list',
        'Ta bort listan': 'Delete the list',
        'Närvaro': 'Attendance',
        '{n} av {t} här': '{n} of {t} here',
        'Alla är här': 'Everyone is here',
        'Ingen är här': 'No one is here',
        'i dag': 'today',
        'Ta bort': 'Remove',
        'Ta bort {namn}': 'Remove {namn}',
        'Lägg till någon för i dag': 'Add someone for today',
        'Lägg till en elev för i dag': 'Add a student for today',
        'Lägg till': 'Add',
        'Ta bort klasslistan {namn}? Det går inte att ångra, så spara den gärna som fil först.': 'Delete the class list {namn}? This cannot be undone, so you may want to save it as a file first.',
        'elev': 'student',
        'elever': 'students',
        'Klasslistan är sparad': 'The class list has been saved',
        '{namn} är skapad med {n} {elever}': '{namn} has been created with {n} {elever}',

        // ---- Högerpanelen ----
        'Ange gruppstorlek som': 'Set the group size as',
        'Elever per grupp': 'Students per group',
        'Antal grupper': 'Number of groups',
        'Minska': 'Decrease',
        'Öka': 'Increase',
        'grupp': 'group',
        'grupper': 'groups',
        'per grupp': 'per group',
        'Om det inte går jämnt ut': 'If it does not divide evenly',
        'Hellre några större grupper': 'Rather a few larger groups',
        'Hellre några mindre grupper': 'Rather a few smaller groups',
        'Grupperna visas här när minst två elever är markerade som närvarande.': 'The groups appear here when at least two students are marked as present.',
        '{k} {grupper} med {s} {elever}': '{k} {grupper} of {s} {elever}',
        '{k} grupper: {ns} med {s} elever och {nl} med {l}': '{k} groups: {ns} with {s} students and {nl} with {l}',
        '<b>{n} elever</b> blir {d}.': '<b>{n} students</b> are split into {d}.',
        'Villkor': 'Conditions',
        '{a} och {b}': '{a} and {b}',
        'Tillsammans': 'Together',
        'Hålls isär': 'Kept apart',
        'alltid': 'always',
        'bara nästa slumpning': 'only the next shuffle',
        'Ta bort villkoret': 'Remove the condition',
        'Ska två elever arbeta tillsammans eller hållas isär? Lägg till ett villkor, så tas hänsyn till det när grupperna slumpas.':
            'Should two students work together or be kept apart? Add a condition, and it will be taken into account when the groups are shuffled.',
        'Slumpa om': 'Shuffle again',
        'Minst två elever behöver vara här.': 'At least two students need to be here.',
        'Skapa en klasslista först.': 'Create a class list first.',
        'Första eleven': 'First student',
        'Andra eleven': 'Second student',
        'Välj en elev': 'Choose a student',
        'Välj en elev till': 'Choose another student',
        'Typ av villkor': 'Type of condition',
        'Hur länge villkoret gäller': 'How long the condition applies',
        'Alltid': 'Always',
        'Bara nästa gång': 'Only next time',
        'De två har redan ett villkor': 'Those two already have a condition',

        // ---- Varningar ----
        '{a} och {b} har både villkoret tillsammans och isär. Villkoren struntades i den här gången.': '{a} and {b} have both the together and the apart condition. The conditions were ignored this time.',
        '{namn} ska arbeta tillsammans men ryms inte i en grupp med {n} elever. De hamnar ändå i samma grupp, som blir större.': '{namn} should work together but do not fit in a group of {n} students. They still end up in the same group, which becomes larger.',
        'Alla villkor om att hållas isär gick inte att uppfylla med så här få grupper.': 'Not all conditions about being kept apart could be met with this few groups.',

        // ---- Arket ----
        'Redo att slumpa': 'Ready to shuffle',
        'Inga grupper än': 'No groups yet',
        'Välj gruppstorlek till höger och tryck på Slumpa grupper. Grupperna visas här.': 'Choose a group size on the right and press Shuffle groups. The groups appear here.',
        'Skapa en klasslista till vänster, eller öppna en fil som du sparat tidigare.': 'Create a class list on the left, or open a file you saved earlier.',
        'Grupper': 'Groups',
        '{k} {grupper}, {n} elever': '{k} {grupper}, {n} students',
        'Slumpa nya grupper': 'Shuffle new groups',
        'Tillbaka till vanlig vy': 'Back to the normal view',
        'Avsluta': 'Exit',
        'Visa grupperna på hela skärmen': 'Show the groups on the whole screen',
        'Fullskärm': 'Full screen',
        'Ta bort grupperna': 'Remove the groups',
        'Rensa': 'Clear',
        'Grupp {n}': 'Group {n}',
        'Dra ett namn till en annan grupp, eller släpp det på ett namn så byter de plats. På en pekskärm trycker du först på namnet och sedan dit det ska.':
            'Drag a name to another group, or drop it on a name and they swap places. On a touch screen, tap the name first and then where it should go.',

        // ---- Filer och export ----
        'Klasslista': 'Class list',
        'Grupperna är sparade som fil': 'The groups have been saved as a file',
        'Klasslistan är sparad som fil': 'The class list has been saved as a file',
        'Grupperna är kopierade. Klistra in dem där du vill.': 'The groups have been copied. Paste them wherever you like.',
        'Grupperna och klasslistan. Öppna filen igen för att fortsätta.': 'The groups and the class list. Open the file again to continue.',
        'Spara klasslistan som fil': 'Save the class list as a file',
        'För att flytta listan till en annan dator.': 'To move the list to another computer.',
        'Spara som textfil': 'Save as a text file',
        'Grupperna som vanlig text (.txt).': 'The groups as plain text (.txt).',
        'Textfilen är sparad': 'The text file has been saved',
        'Kopiera som text': 'Copy as text',
        'Klistra in i ett mejl, ett dokument eller en lärplattform.': 'Paste into an email, a document or a learning platform.',
        'Skriv ut': 'Print',
        'Bara grupperna, tre kort i bredd.': 'Just the groups, three cards across.',
        'Det finns inget att spara än': 'There is nothing to save yet',
        'Filen gick inte att läsa.': 'The file could not be read.',
        'Filen innehåller inga namn.': 'The file contains no names.',
        'Filen kommer inte från Slumpa grupper och går inte att öppna här.': 'The file does not come from Random groups and cannot be opened here.',
        'Grupperna är öppnade': 'The groups have been opened',
        'Klasslistan är öppnad': 'The class list has been opened',

        // ---- Texten om verktyget ----
        'Slumpa grupper i klassrummet': 'Random groups in the classroom',
        'Slumpa grupper delar in klassen i grupper med ett klick. Du skriver in klasslistan en gång, bockar av den som inte är här och väljer hur stora grupperna ska vara. Grupperna visas som kort som går att visa på storskärmen, och du kan flytta elever mellan grupperna innan du sparar.':
            'Random groups divides the class into groups with one click. You type in the class list once, untick anyone who is not here and choose how large the groups should be. The groups appear as cards that can be shown on the big screen, and you can move students between the groups before you save.',
        'Öppna verktyget': 'Open the tool',
        'Så använder du verktyget': 'How to use the tool',
        'Ingen inloggning, inga namn på nätet': 'No login, no names online',
        'Verktyget körs helt i din webbläsare. Klasslistorna sparas på den dator du använder och skickas aldrig till någon server. Vill du ha med dig en lista till en annan dator, eller spara en gruppindelning till nästa lektion, sparar du den som fil. Filen öppnas med knappen till vänster om Spara.':
            'The tool runs entirely in your browser. The class lists are saved on the computer you are using and are never sent to any server. If you want to take a list to another computer, or save a set of groups for the next lesson, save it as a file. The file is opened with the button to the left of Save.',
        'Vanliga frågor': 'Frequently asked questions'
    });

    I18N.addHtml({
        'Slumpa <em>grupper</em>': 'Random <em>groups</em>',
        'Spara <span class="lbl-long">som fil</span>': 'Save <span class="lbl-long">as file</span>',
        '<b>Skapa en klasslista.</b> Klistra in namnen, ett per rad, till exempel direkt ur ett kalkylark. Listan sparas i din webbläsare till nästa gång.':
            '<b>Create a class list.</b> Paste the names, one per line, for example straight from a spreadsheet. The list is saved in your browser until next time.',
        '<b>Bocka av den som inte är här.</b> Ska någon vara med bara i dag lägger du till namnet under listan.':
            '<b>Untick anyone who is not here.</b> If someone should take part only today, add the name below the list.',
        '<b>Välj gruppstorlek</b>, antingen som antal elever per grupp eller som antal grupper. Går det inte jämnt ut väljer du om du hellre vill ha några större eller några mindre grupper.':
            '<b>Choose the group size</b>, either as the number of students per group or as the number of groups. If it does not divide evenly, choose whether you would rather have a few larger or a few smaller groups.',
        '<b>Lägg till villkor</b> om två elever ska arbeta tillsammans eller hållas isär.':
            '<b>Add conditions</b> if two students should work together or be kept apart.',
        '<b>Tryck på Slumpa grupper.</b> Vill du ändra något drar du ett namn till en annan grupp, eller släpper det på ett namn så byter de två plats. På en pekskärm trycker du först på ett namn och sedan dit det ska.':
            '<b>Press Shuffle groups.</b> If you want to change something, drag a name to another group, or drop it on a name and the two swap places. On a touch screen, tap a name first and then where it should go.',
        '<b>Spara grupperna som fil</b>, visa dem på storskärmen eller skriv ut dem.':
            '<b>Save the groups as a file</b>, show them on the big screen or print them.'
    });

    // ---- JSON-LD: samma översättningar som den synliga texten ----
    // Textrutan i dialogen hoppas över av DOM-översättaren (textarea), så dess
    // platshållare sätts här.
    function vidStart() {
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
                            else if (v === 'Slumpa grupper') o[k] = I18N.t('nav:Slumpa grupper');
                            else o[k] = I18N.t(v);
                        } else if (v && typeof v === 'object') walk(v);
                    }
                })(d);
                els[i].textContent = JSON.stringify(d, null, 1);
            } catch (e) { /* lämna orörd */ }
        }
        var ta = document.getElementById('listElever');
        if (ta) ta.placeholder = 'Paste the names from a spreadsheet or the school\'s learning platform, one name per line.';
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vidStart);
    else vidStart();
})();

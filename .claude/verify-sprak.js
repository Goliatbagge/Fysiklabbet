#!/usr/bin/env node
/*
 * verify-sprak.js — letar efter språkliga fadäser i den text besökaren
 * faktiskt läser: anglicismer, felböjda verb, personifierade döda ting och
 * ord projektet bestämt sig för att inte använda. Kör:
 *
 *   node .claude/verify-sprak.js                 (hela sajten)
 *   node .claude/verify-sprak.js <fil> [<fil>…]  (bara vissa filer)
 *
 * Skriptet finns för att sådant här ALDRIG ser trasigt ut. "Vågen räknar
 * aldrig med facit" och "luftpartiklarna svepar ner" gick igenom varenda
 * annan kontroll och hamnade i både en simulering, på startsidan och i ett
 * nyhetsbrev innan användaren läste dem (påpekat 2026-08-29).
 *
 * Reglerna är avsiktligt FÅ och HÖGPRECISA — ett skript som skriker om
 * varannan mening slutar man läsa. Vill du fånga sådant som kräver omdöme
 * (klichéer, tunga satser, ordval som är rätt men trist): använd
 * korrekturläsar-agenten i .claude/agents/korrekturlasare.md.
 *
 * Lägga till en regel: ett objekt i REGLER nedan. `undantag` är mönster som
 * gör en träff laglig; `niva` är 'fel' (blockerar) eller 'varning'.
 */
const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');

const REGLER = [
    {
        namn: 'facit-anglicism',
        niva: 'fel',
        monster: /\bmed facit\b/gi,
        undantag: [/\bmed facit i hand\b/i],
        rattelse: 'Anglicism. "Räknar med facit" är inte svenska. Skriv ' +
                  '"får aldrig veta svaret på förhand", "har inget svar att luta sig mot". ' +
                  '(Idiomet "med facit i hand" är korrekt och undantaget.)',
    },
    {
        namn: 'svepar',
        niva: 'fel',
        monster: /\bsvepar\b/gi,
        rattelse: 'Fel böjning. Verbet heter sveper (svepa, sveper, svepte, svept).',
    },
    {
        namn: 'förråda',
        niva: 'fel',
        monster: /\bförråd(er|de|a|s|tt)\b/gi,
        rattelse: 'Ger ett dött ting ett uppsåt. Skriv avslöjar, visar, röjer, ' +
                  'pekar ut eller vittnar om. Se "Ordval i nyhetsartiklar" i CLAUDE.md. ' +
                  '(Substantivet förråd berörs inte.)',
    },
    {
        namn: 'rymdtid',
        niva: 'fel',
        monster: /\brymdtid(en|ens|er)?\b/gi,
        rattelse: 'Svenska ordet för spacetime är rumtid, inte rymdtid. ' +
                  '(Publicerade artikel-id:n rättas dock aldrig.)',
    },
    {
        namn: 'över-ända',
        niva: 'fel',
        monster: /\böver ända\b/gi,
        rattelse: 'Adverbet skrivs i ett ord: överända (falla överända, vrida överända).',
    },
    {
        namn: 'varken-inte-vare-sig',
        niva: 'fel',
        // "vare sig … eller" kräver en negation före sig ("kan inte vare sig …").
        // Utan negation är "varken … eller" rätt form. Felet har uppstått i
        // energiprincipens formelruta två gånger (fy1-4.4, fy2-1.6, upptäckt
        // 2026-08-31), så mönstret fångar hjälpverb + "vare sig" utan "inte".
        monster: /\b(kan|får|ska|skall|bör|kunde|borde|vill)\s+vare\s+sig\b/gi,
        undantag: [/\b(inte|aldrig|inget|ingen)\s+(kan|får|ska|skall|bör|kunde|borde|vill)\s+vare\s+sig\b/i],
        rattelse: 'Grammatikfel: "vare sig … eller" kräver en negation före sig. ' +
                  'Utan negation: skriv "varken … eller" ("kan varken skapas eller förstöras").',
    },
    {
        namn: 'ganger-mindre',
        niva: 'varning',
        // Något kan inte bli mer än en gång mindre; språkvården avråder.
        monster: /\bgånger\s+mindre\b/gi,
        rattelse: 'Skriv delformen i stället: "en X-del av" (en 3 600-del av ' +
                  'accelerationen), inte "X gånger mindre".',
    },
    {
        namn: 'tankstreck',
        niva: 'varning',
        // Tankstreck som pausmarkör i löptext (förbjudet i nyskriven text
        // sedan 2026-08-26). Blocktitlar ("Härledning — …"), title:-fält
        // och intervall fångas inte: mönstret kräver mellanslag runt
        // strecket och hoppar över rader som ser ut som :::-titlar.
        monster: /(?<!:::.{0,80}) — /g,
        undantag: [/^\s*:::/, /title:/i, /"title"/, /aria-label/],
        rattelse: 'Tankstreck som pausmarkör i löptext. Skriv om med punkt, ' +
                  'kolon, komma eller parentes. Se "Tankstreck ska inte användas" ' +
                  'i CLAUDE.md. (Äldre text saneras inte retroaktivt — varningen ' +
                  'gäller nyskrivet.)',
    },
    {
        namn: 'funktionsnamn-i-rubrik',
        niva: 'fel',
        // Blocktitlar (:::-rutor och sammanfattningskort) sätts med
        // text-transform: uppercase, så ett funktionsnamn som står som
        // VANLIG TEXT i titeln blir F(X) — den primitiva funktionen, alltså
        // något helt annat än f(x). KaTeX undantas numera från versaliseringen
        // (regeln .katex { text-transform: none } i styles-laborans.css), så
        // lösningen är att sätta beteckningen som matte: "$f(x)$".
        // Mönstret hoppar över kompletta $…$-spann och slår alltså bara på
        // funktionsnamn som ligger utanför matte. (Påpekat 2026-08-29.)
        monster: /^:::.*?"(?:[^"$]|\$[^$]*\$)*?\b[A-Za-z]\s*[′'″]?\s*\(\s*[a-zA-Z]\s*\)/g,
        rattelse: 'Funktionsnamn som vanlig text i en blocktitel versaliseras ' +
                  'till F(X) och läses som den primitiva funktionen. Sätt ' +
                  'beteckningen som matte i stället: "Derivatan av $f(x) = a^x$". ' +
                  'Se "Funktionsnamn och variabler i rubriker" i CLAUDE.md.',
    },
    {
        namn: 'rullar-utan-friktion',
        niva: 'fel',
        // Rullande hjul KRÄVER statisk friktion — "vagnen rullar utan
        // friktion" är den missuppfattning en fysiker reagerar på (påpekat
        // av en besökare 2026-08-31: lutande planets vagn och berg- och
        // dalbanan). Rätt idealisering heter "utan energiförluster".
        // Undantag: citerade missuppfattningar (”…”), texter som förklarar
        // att rullning kräver friktion, och trissor (friktionsfri axel är
        // en korrekt standardidealisering).
        monster: /\b(?:rullar|rullande|hjulen|vagn(?:en)?)\b[^.!?]{0,60}\butan friktion\b|\butan friktion\b[^.!?]{0,60}\b(?:rullar|rullande|hjulen|vagn(?:en)?)\b/gi,
        undantag: [/”/, /trissa/i, /inte ens rulla/i, /kräver/i],
        rattelse: 'Rullande hjul kräver statisk friktion — skriv "utan ' +
                  'energiförluster" i stället för "utan friktion" om vagnar, ' +
                  'hjul och berg- och dalbanor. (Besökarpåpekande 2026-08-31.)',
    },
    {
        namn: 'förkortningar',
        niva: 'varning',
        monster: /(?:^|[\s(])(?:t\.ex\.|bl\.a\.|m\.m\.|d\.v\.s\.|dvs\.|o\.s\.v\.|osv\.|etc\.|fr\.o\.m\.|t\.o\.m\.|s\.k\.)/gi,
        rattelse: 'Skriv ut förkortningen i klartext (till exempel, bland annat, ' +
                  'med mera, det vill säga, och så vidare, från och med, så kallad). ' +
                  'Se "Förkortningar skrivs ut i klartext" i CLAUDE.md.',
    },
];

// ── Vilka filer läses ─────────────────────────────────────────────────
// Bara källor med text som besökaren ser. Verifierare, byggskript och
// agentinstruktioner hålls utanför — där är förkortningar helt i sin ordning.
// (Kodkommentarer INUTI sidorna kommer med och kan ge en och annan falsk
// varning; det är billigare än att tolka JS.)
function standardfiler() {
    const ut = [];
    const lagg = (dir, filter) => {
        if (!fs.existsSync(dir)) return;
        for (const f of fs.readdirSync(dir)) {
            const p = path.join(dir, f);
            if (fs.statSync(p).isFile() && filter(f)) ut.push(p);
        }
    };
    lagg(path.join(ROT, 'data', 'teori'), f => f.endsWith('.md'));
    lagg(path.join(ROT, 'data'), f => ['nyheter.js', 'begrepp.js', 'ovningar.js',
        'exittickets.js', 'katalog.js', 'simuleringar.js'].includes(f));
    lagg(path.join(ROT, '.claude', 'nyhetsbrev', 'utkast'), f => f.endsWith('.html'));
    lagg(ROT, f => f.endsWith('.html'));
    return ut;
}

const valda = process.argv.length > 2;
const filer = valda
    ? process.argv.slice(2).map(f => path.resolve(f))
    : standardfiler();

// Vid en svepning över HELA sajten körs bara de blockerande reglerna.
// Stilvarningarna (förkortningar m.fl.) har en stor arvsskuld i äldre text
// som inte saneras retroaktivt, och 800 rader varning gör att man slutar
// läsa utskriften. Peka ut filerna du rört, så granskas allt.
const aktiva = valda ? REGLER : REGLER.filter(r => r.niva === 'fel');

// ── Granska ───────────────────────────────────────────────────────────
const fel = [];
const varn = [];

for (const fil of filer) {
    let text;
    try { text = fs.readFileSync(fil, 'utf8'); } catch (e) { continue; }
    const rader = text.split(/\r?\n/);

    for (const regel of aktiva) {
        rader.forEach((rad, i) => {
            regel.monster.lastIndex = 0;
            let m;
            while ((m = regel.monster.exec(rad)) !== null) {
                const runt = rad.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60);
                if ((regel.undantag || []).some(u => u.test(runt))) continue;
                const post = {
                    fil: path.relative(ROT, fil).replace(/\\/g, '/'),
                    rad: i + 1,
                    regel: regel.namn,
                    traff: m[0].trim(),
                    utdrag: runt.trim().replace(/\s+/g, ' '),
                    rattelse: regel.rattelse,
                };
                (regel.niva === 'fel' ? fel : varn).push(post);
            }
        });
    }
}

// ── Utfall ────────────────────────────────────────────────────────────
function skriv(lista, etikett) {
    const perRegel = {};
    lista.forEach(p => (perRegel[p.regel] = perRegel[p.regel] || []).push(p));
    for (const [regel, poster] of Object.entries(perRegel)) {
        console.log(`\n  ${etikett}  ${regel} (${poster.length} st)`);
        console.log(`           ${poster[0].rattelse}`);
        poster.slice(0, 12).forEach(p =>
            console.log(`           ${p.fil}:${p.rad}  …${p.utdrag}…`));
        if (poster.length > 12) console.log(`           … och ${poster.length - 12} till.`);
    }
}

console.log(`Granskar ${filer.length} filer med ${aktiva.length} regler` +
    (valda ? '.' : ' (stilvarningar körs bara på utpekade filer).'));
if (varn.length) skriv(varn, 'VARNING');
if (fel.length) {
    skriv(fel, 'FEL    ');
    console.log(`\n${fel.length} fel. Rätta dem före commit.`);
    process.exit(1);
}
console.log(varn.length ? '\nInga fel (varningarna ovan är att gå igenom).' : '\nInga fel.');

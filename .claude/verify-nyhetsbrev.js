#!/usr/bin/env node
/*
 * verify-nyhetsbrev.js — granskar ett nyhetsbrevsutkast INNAN det läggs upp
 * i EmailOctopus. Kör:
 *
 *   node .claude/verify-nyhetsbrev.js            (senaste utkastet)
 *   node .claude/verify-nyhetsbrev.js 2026-08-23 (ett visst datum)
 *
 * Kontrollerna finns för att fånga fel som INTE ser trasiga ut i brevet:
 * ett brev utan nyhetsteaser läses som ett helt normalt brev, och det var
 * precis så signaturen "Vi läser på." tyst föll bort ur 2026-08-23 (påpekat
 * av användaren 2026-08-22). Reglerna står i .claude/agents/nyhetsbrev.md.
 */
const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const UTKAST = path.join(ROT, '.claude', 'nyhetsbrev', 'utkast');
const KO = path.join(ROT, '.claude', 'nyheter', 'ko.md');

const fel = [];
const varn = [];

// ── Hitta utkastet ────────────────────────────────────────────────────
const arg = process.argv[2];
const filer = fs.readdirSync(UTKAST).filter(f => f.endsWith('.html')).sort();
const namn = arg ? `${arg}.html` : filer[filer.length - 1];
const sokvag = path.join(UTKAST, namn);
if (!fs.existsSync(sokvag)) {
    console.error(`Hittar inte ${sokvag}`);
    process.exit(2);
}
const html = fs.readFileSync(sokvag, 'utf8');
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

console.log(`Granskar ${namn}\n`);

// ── 1. Ämnesrad och preheader i kommentaren ───────────────────────────
const komm = html.match(/^<!--([\s\S]*?)-->/);
if (!komm) {
    fel.push('Utkastet saknar HTML-kommentaren överst med ÄMNESRAD och PREHEADER.');
} else {
    if (!/ÄMNESRAD:\s*\S/.test(komm[1])) fel.push('Kommentaren saknar ÄMNESRAD.');
    if (!/PREHEADER:\s*\S/.test(komm[1])) fel.push('Kommentaren saknar PREHEADER.');
}

// ── 2. Tankstreck (förbjudna, se agentens instruktioner) ──────────────
const streck = html.match(/&mdash;|&ndash;|—|–/g);
if (streck) fel.push(`${streck.length} tankstreck i brevet (förbjudna) — byt mot komma, kolon eller punkt.`);

// ── 3. EmailOctopus-taggarna ──────────────────────────────────────────
for (const tag of ['UnsubscribeURL', 'SenderInfo', 'RewardsURL']) {
    if (!html.includes(`{{${tag}}}`)) fel.push(`Sidfoten saknar {{${tag}}} — EmailOctopus vägrar skicka utan den.`);
}

// ── 4. Nyhetsteasern och signaturen (huvudsyftet med skriptet) ────────
if (!/Vi läser på\./.test(text)) {
    fel.push('Brevet saknar signaturen "Vi läser på." — nyhetsteasern är OBLIGATORISK ' +
             'i varje brev (punkt 6 i .claude/agents/nyhetsbrev.md). En teaser om en ' +
             'simulering eller funktion räcker INTE.');
}

// ── 5. Brevteaser-märkningen i kön ────────────────────────────────────
if (fs.existsSync(KO)) {
    const ko = fs.readFileSync(KO, 'utf8');
    const traffar = (ko.match(/\*\*\[BREVTEASER/g) || []).length;
    if (traffar === 0) {
        fel.push('Inget uppslag i .claude/nyheter/ko.md är märkt **[BREVTEASER]** — ' +
                 'nyhetsagentens steg 2b har inte körts, och brevet har inget belagt ' +
                 'uppslag att teasa.');
    } else if (traffar > 1) {
        varn.push(`${traffar} uppslag i ko.md är märkta [BREVTEASER] — det ska vara exakt ett.`);
    }
} else {
    varn.push('Hittar inte .claude/nyheter/ko.md — hoppar över brevteaser-kontrollen.');
}

// ── 6. Nyhetsupplägget: tre lyfta + "Läs även" ────────────────────────
const artikelLankar = [...html.matchAll(/nyheter\.html\?id=([0-9]{4}-[0-9]{2}-[0-9]{2}-[a-z0-9-]+)/g)]
    .map(m => m[1]);
const unika = [...new Set(artikelLankar)];
const harLasAven = /Läs även/i.test(text);
if (unika.length > 3 && !harLasAven) {
    fel.push(`Brevet länkar ${unika.length} artiklar men saknar rubriken "Läs även" — ` +
             'exakt tre lyfts, resten ska listas som korta klickbara rader.');
}
if (unika.length < 3) {
    varn.push(`Bara ${unika.length} artiklar länkas — brevet lyfter normalt tre.`);
}

// ── 7. Bild-URL:er ska vara absoluta ──────────────────────────────────
const relativa = [...html.matchAll(/<img[^>]+src="(?!https:\/\/)([^"]+)"/g)].map(m => m[1]);
if (relativa.length) {
    fel.push(`${relativa.length} bild(er) har relativ URL (${relativa[0]}) — ` +
             'e-postklienter visar bara absoluta https-adresser.');
}

// ── 8. Minst en bild från sajten ──────────────────────────────────────
// Ett brev illustrerat enbart med pressbilder visar aldrig upp det läsaren
// prenumererar för. Heuristik: en <img> som ligger i en länk till något
// ANNAT än en nyhetsartikel är en sajtbild (simulering, genomgång,
// pennlösning). Regeln står under "Bilder" i .claude/agents/nyhetsbrev.md.
const bildLankar = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>\s*<img[ >]/g)].map(m => m[1]);
const sajtbilder = bildLankar.filter(h => !/nyheter\.html\?id=/.test(h));
if (!sajtbilder.length) {
    fel.push('Ingen bild i brevet visar något på sajten — minst en bild ska föreställa ' +
             'en simulering, genomgång eller funktion som brevet skriver om (regeln ' +
             'står under "Bilder" i .claude/agents/nyhetsbrev.md). Kan sessionen inte ' +
             'rendera simuleringarna: säg det till användaren och be om skärmdumpen.');
}

// ── 8. Riktlängd ──────────────────────────────────────────────────────
const ord = text.split(/\s+/).filter(Boolean).length;
if (ord > 600) varn.push(`~${ord} ord brödtext (riktlängd 250–450).`);

// ── Utfall ────────────────────────────────────────────────────────────
varn.forEach(v => console.log(`  VARNING  ${v}`));
if (varn.length) console.log('');
if (fel.length) {
    fel.forEach(f => console.log(`  FEL      ${f}`));
    console.log(`\n${fel.length} fel. Brevet ska INTE läggas upp förrän de är rättade.`);
    process.exit(1);
}
console.log(`Inga fel. (${unika.length} artiklar länkade, ${sajtbilder.length} sajtbild(er), ~${ord} ord.)`);

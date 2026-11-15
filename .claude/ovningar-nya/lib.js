// Gemensamt för påfyllningen av övningar (2026-11, mål minst 7 + 7 + 7 per avsnitt).
//
// Nya uppgifter skrivs först som ett FRAGMENT per avsnitt i
// .claude/ovningar-nya/<id>.js: bara objektliteralerna, var och en följd av
// ett kommatecken, precis så som de ska stå i arrayen i data/ovningar.js.
// Fragmentet får använda hjälpfunktionerna i data/ovningar.js (makeDiagram,
// makeForceDiagram, makeProjectile …), eftersom det klistras in i samma fil.
//
// insertFragment() lägger fragmentet SIST i avsnittets array (befintliga
// uppgifters plats ändras aldrig: penna-scenerna ov-<id>-u<nr> numreras
// efter platsen). Saknas avsnittet skapas en ny nyckel sist i objektet.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const OVN = path.join(ROOT, 'data', 'ovningar.js');
const KEY_RE = /^\s*'([a-z0-9]+-[0-9A-Za-z.]+)': \[\s*$/;

function insertFragment(src, id, frag) {
    const nl = src.includes('\r\n') ? '\r\n' : '\n';
    const lines = src.split(/\r?\n/);
    const objStart = lines.findIndex(l => /^window\.OVNINGAR = \{/.test(l));
    if (objStart < 0) throw new Error('hittar inte window.OVNINGAR');
    let objEnd = lines.findIndex((l, i) => i > objStart && /^\};/.test(l));
    if (objEnd < 0) throw new Error('hittar inte slutet på window.OVNINGAR');
    const fragLines = frag.replace(/\s+$/, '').split(/\r?\n/);
    let start = -1;
    for (let i = objStart + 1; i < objEnd; i++) {
        const m = lines[i].match(KEY_RE);
        if (m && m[1] === id) { start = i; break; }
    }
    if (start < 0) {
        // Ny nyckel sist i objektet. Föregående array måste sluta med komma.
        let p = objEnd - 1;
        while (p > objStart && /^\s*$/.test(lines[p])) p--;
        if (/^\s*\]\s*$/.test(lines[p])) lines[p] = lines[p].replace(']', '],');
        lines.splice(objEnd, 0, `    '${id}': [`, ...fragLines, '    ],');
        return lines.join(nl);
    }
    let next = start + 1;
    while (next < objEnd && !KEY_RE.test(lines[next])) next++;
    let c = next - 1;
    while (c > start && !/^\s*\],?\s*$/.test(lines[c])) c--;
    if (c <= start) throw new Error('hittar inte slutet på arrayen för ' + id);
    // Sista elementet före stängningen ska sluta med komma.
    let p = c - 1;
    while (p > start && (/^\s*$/.test(lines[p]) || /^\s*\/\//.test(lines[p]))) p--;
    if (/\}\s*$/.test(lines[p])) lines[p] = lines[p].replace(/\}\s*$/, '},');
    lines.splice(c, 0, ...fragLines);
    return lines.join(nl);
}

// Rättelser i avsnittets BEFINTLIGA uppgifter (till exempel tankstreck)
// skrivs som .claude/ovningar-nya/<id>.rattelser.json: en array med par
// [gammal text, ny text], där den gamla texten är ordagrann ur
// data/ovningar.js (med JS-källans dubblade bakstreck). Varje gammal text
// måste förekomma exakt en gång inom avsnittets array, annars avbryts allt.
function applyRattelser(src, id, par) {
    const nl = src.includes('\r\n') ? '\r\n' : '\n';
    const lines = src.split(/\r?\n/);
    const objStart = lines.findIndex(l => /^window\.OVNINGAR = \{/.test(l));
    const objEnd = lines.findIndex((l, i) => i > objStart && /^\};/.test(l));
    let start = -1;
    for (let i = objStart + 1; i < objEnd; i++) {
        const m = lines[i].match(KEY_RE);
        if (m && m[1] === id) { start = i; break; }
    }
    if (start < 0) throw new Error('rättelser: avsnittet ' + id + ' finns inte');
    let next = start + 1;
    while (next < objEnd && !KEY_RE.test(lines[next])) next++;
    let block = lines.slice(start, next).join('\n');
    for (const [fran, till] of par) {
        if (typeof fran !== 'string' || typeof till !== 'string' || !fran) throw new Error('rättelser: felaktigt par i ' + id);
        const n = block.split(fran).length - 1;
        if (n !== 1) throw new Error(`rättelser: "${fran.slice(0, 60)}" förekommer ${n} gånger i ${id} (ska vara 1)`);
        block = block.replace(fran, () => till);
    }
    lines.splice(start, next - start, ...block.split('\n'));
    return lines.join(nl);
}

function loadOvningar(file) {
    const prevWin = global.window;
    global.window = {};
    delete require.cache[require.resolve(file)];
    require(file);
    const O = global.window.OVNINGAR;
    global.window = prevWin;
    return O;
}

function levelCount(list) {
    const L = [0, 0, 0];
    (list || []).forEach(o => { if (o && o.level >= 1 && o.level <= 3) L[o.level - 1]++; });
    return L;
}

module.exports = { ROOT, OVN, insertFragment, applyRattelser, loadOvningar, levelCount };

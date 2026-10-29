// Tester för motorn i Formelverkstaden (fysik1-formelverkstaden-app.html).
// Kör: node .claude/test-formel-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/formel-motor.js');

let fel = 0;
const sant = (v, txt) => { if (!v) { console.log(`FEL  ${txt}`); fel++; } return v; };
const nara = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));

// 1. Varje formel stämmer med sina egna exempelvärden, och båda leden har samma enhet.
for (const F of M.FORMLER) {
    const { vl, hl } = M.tolka(F);
    sant(nara(M.evalL(vl, F.varden), M.evalL(hl, F.varden)), `${F.id}: exemplet stämmer (${M.evalL(vl, F.varden)} mot ${M.evalL(hl, F.varden)})`);
    sant(M.samDim(M.dimL(vl), M.dimL(hl)), `${F.id}: leden har samma enhet`);
    sant(M.termerSammaDim(vl) && M.termerSammaDim(hl), `${F.id}: termerna i en summa har samma enhet`);
}

// 2. Varje storhet i varje formel går att lösa ut med tipsen. Varje rad i
//    lösningen är en sann likhet, och svaret har den sökta storhetens enhet.
let antal = 0, stegTotalt = 0;
for (const F of M.FORMLER) {
    for (const k of M.storheter(F)) {
        const L = M.losning(F, k);
        antal++; stegTotalt += L.steg.length;
        if (!sant(L.klar, `${F.id}: ${k} blir utlöst (${L.steg.map((s) => s.op).join(', ')})`)) continue;
        for (const s of L.steg) sant(nara(M.evalL(s.efter.vl, F.varden), M.evalL(s.efter.hl, F.varden)), `${F.id}/${k}: raden efter ${s.op} är sann`);
        sant(nara(M.evalL(L.slut.hl, F.varden), F.varden[k]), `${F.id}/${k}: svaret ger exemplets värde`);
        sant(M.samDim(M.dimL(L.slut.hl), M.SYM[k].dim), `${F.id}/${k}: svaret har rätt enhet`);
        sant(L.steg.length <= 9, `${F.id}/${k}: högst nio steg (${L.steg.length})`);
        // två felaktiga svar som skiljer sig från det rätta, numeriskt
        const fs_ = M.felSvar(L.slut.hl).filter((x) => isFinite(M.evalL(M.normalisera(x), F.varden)) && Math.abs(M.evalL(M.normalisera(x), F.varden) - F.varden[k]) > 1e-6 * Math.max(1, Math.abs(F.varden[k])));
        // en storhet som redan står ensam ingår aldrig i gissa-läget
        if (L.steg.some((s) => s.op !== 'byt')) sant(fs_.length >= 2, `${F.id}/${k}: minst två felaktiga svar (${fs_.length})`);
    }
}
console.log(`${antal} utlösningar, i snitt ${(stegTotalt / antal).toFixed(1)} steg`);

// 3. Kända lösningar ser ut som i teorin.
{
    const hast = M.FORMLER.find((f) => f.id === 'hastighet');
    const L = M.losning(hast, 't');
    sant(L.steg.map((s) => s.op).join(',') === 'sub,div,byt', 'v = v0 + a·t: subtrahera, dividera, byt plats');
    const ek = M.losning(M.FORMLER.find((f) => f.id === 'ek'), 'v');
    sant(ek.slut.hl.pow === 0.5, 'Ek: v står som en rot');
    const mf = M.losning(M.FORMLER.find((f) => f.id === 'medelfart'), 't');
    sant(mf.steg[0].op === 'mul' && mf.steg[0].X.f[0][0] === 't', 'medelfart: först multiplicera med t');
}

// 3b. Granskningens fall: kvadrera ett negativt led går, talet först, talet 2 bland felsvaren.
{
    const T = M.FORMLER.find((f) => f.id === 'tidlos');
    const r = M.utfor(M.tolka(T), 'sub', M.term([['v', 2]]));
    sant(!M.utfor(r, 'kvad').fel, 'kvadrera ett negativt led ger inget felmeddelande');
    sant(!!M.utfor(r, 'rot').fel, 'dra roten ur ett negativt led ger ett felmeddelande');
    const ek = M.losning(M.FORMLER.find((f) => f.id === 'ek'), 'v');
    sant(ek.slut.hl.terms[0].f[0][0] === '#2', 'talet 2 står först: 2 · E_k / m');
    const fs = M.felSvar(M.losning(M.FORMLER.find((f) => f.id === 'ek'), 'm').slut.hl);
    sant(fs.some((x) => x.typ === 'glomtTalet'), 'Ek, lös ut m: felsvaret där talet 2 tappats finns');
    const hs = M.felSvar(M.losning(M.FORMLER.find((f) => f.id === 'huvudsats'), 'Q').slut.hl).filter((x) => x.typ === 'tecken');
    sant(hs.length === 2, 'första huvudsatsen: två teckenfel (Q = ΔU + W och Q = W − ΔU)');
}

// 4. Bara i vänster led ger en falsk likhet.
{
    const F = M.FORMLER[0];
    const r = M.utfor(M.tolka(F), 'div', M.term([['I', 1]]), true);
    sant(!nara(M.evalL(r.vl, F.varden), M.evalL(r.hl, F.varden)), 'bara i vänster led: leden blir olika');
}

// 5. Otillåtet: addera till ett bråk av en summa.
{
    const F = M.FORMLER.find((f) => f.id === 'hastighet');
    let r = M.utfor(M.tolka(F), 'sub', M.term([['v_0', 1]]));
    r = M.utfor(r, 'div', M.term([['a', 1]]));
    sant(!!M.utfor(r, 'add', M.term([['v_0', 1]])).fel, 'addera till (v − v0)/a ger ett felmeddelande');
}

// 6. Sidan bär en oförändrad kopia av motorn.
{
    const motor = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'formel-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
    const sida = path.join(__dirname, '..', 'fysik1-formelverkstaden-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="formel-motor">\n([\s\S]*?)\n<\/script>/);
        sant(!!m && m[1].trim() === motor, 'sidans kopia av motorn är identisk med källan');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} FEL` : '\nAlla tester gick igenom.');
process.exit(fel ? 1 : 0);

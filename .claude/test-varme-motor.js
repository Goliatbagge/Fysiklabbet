// Fysiktester för motorn i simuleringen Termodynamikens andra huvudsats
// (fysik1-andra-huvudsatsen-app.html). Kör: node .claude/test-varme-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/varme-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(4)} (väntat ${b.toFixed(4)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
// enkel deterministisk slump så att testet alltid ger samma resultat
let fro = 12345;
const slump = () => {      // mulberry32
    fro = (fro + 0x6D2B79F5) | 0;
    let z = Math.imul(fro ^ (fro >>> 15), 1 | fro);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
};

// 1. Antalet sätt: Ω(N, q) för små tal räknat för hand.
nara(Math.exp(M.lnOmega(3, 2)), 6, 1e-9, 'Ω(3, 2) = 4! / (2! · 2!) = 6');
nara(Math.exp(M.lnOmega(1, 5)), 1, 1e-9, 'Ω(1, 5) = 1');
nara(Math.exp(M.lnGamma(6)), 120, 1e-7, 'Γ(6) = 5! = 120');

// 2. Varmt möter kallt: 80 °C mot 20 °C, lika stora block, 200 brickor.
{
    const st = M.nyttPar({ mA: 1, mB: 1, TA: 80, TB: 20, q: 200 }, slump);
    const t0 = M.temp(st);
    nara(t0.A, 80, 0.5, 'startens temperatur i det varma blocket');
    nara(t0.B, 20, 0.5, 'startens temperatur i det kalla blocket');
    nara(M.slutTemp(st), 50, 1e-9, 'sluttemperaturen är medelvärdet, 50 °C');
    let summaA = 0, n = 0;
    for (let i = 0; i < 4000; i++) M.hopp(st, slump);
    sant(M.temp(st).A < 70, 'värmen har gått från det varma blocket');
    for (let i = 0; i < 2000000; i++) { M.hopp(st, slump); summaA += st.qA; n++; }
    nara(st.n.reduce((a, b) => a + b, 0), 200, 0, 'brickorna bevaras');
    nara(summaA / n, 100, 3, 'i jämvikt har blocken i medeltal lika många brickor');
    const l = M.fordelning(st);
    nara(l.indexOf(Math.max(...l)), 100, 1, 'flest sätt vid den jämna fördelningen');
    sant(M.log10ChansStart(st) < -4, `startfördelningen är osannolik (1 på 10^${(-M.log10ChansStart(st)).toFixed(0)})`);
}

// 3. Litet varmt block mot stort kallt: sluttemperaturen är det vägda medelvärdet.
{
    const st = M.nyttPar({ mA: 1, mB: 3, TA: 80, TB: 20, q: 200 }, slump);
    nara(M.slutTemp(st), (1 * 80 + 3 * 20) / 4, 0.01, 'sluttemperaturen (1 · 80 + 3 · 20) / 4 = 35 °C');
    let summa = 0;
    for (let i = 0; i < 20000; i++) M.hopp(st, slump);
    for (let i = 0; i < 1000000; i++) { M.hopp(st, slump); summa += M.temp(st).A; }
    nara(summa / 1000000, 35, 2, 'det varma blockets medeltemperatur i jämvikt');
}

// 4. Få brickor: startfördelningen kommer tillbaka då och då.
{
    const st = M.nyttPar({ mA: 1, mB: 1, TA: 80, TB: 20, q: 10 }, slump);
    for (let i = 0; i < 200000; i++) M.hopp(st, slump);
    sant(st.tillbaka > 50, `med 10 brickor kommer startfördelningen tillbaka (${st.tillbaka} gånger)`);
}

// 5. Värmemaskinen och värmepumpen.
nara(M.etaMax(900, 350), 1 - 350 / 900, 1e-12, 'bilmotorn: η_max = 1 − 350 / 900 = 0,61');
nara(M.etaMax(800, 300), 0.625, 1e-12, 'kraftverket: η_max = 0,625');
{
    const m = M.maskin(900, 350, 0.3, 200);
    nara(m.W + m.Qk, 200, 1e-12, 'Q_v = W + Q_k');
    sant(m.mojlig, 'η = 30 % går att bygga mellan 900 K och 350 K');
    sant(!M.maskin(900, 350, 0.7, 200).mojlig, 'η = 70 % går inte');
    const p = M.pump(293, 278, 100, 300);
    sant(p.mojlig, 'kylskåpet: 300 J från kalla sidan med 100 J arbete går');
    nara(p.Qv, 400, 1e-12, 'kylskåpet lämnar Q_v = W + Q_k = 400 J');
    sant(!M.pump(293, 278, 100, 2000).mojlig, '2 000 J med 100 J arbete går inte');
}

// 6. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik1-andra-huvudsatsen-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'varme-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        sant(html.includes(kalla), 'sidans motor är identisk med varme-motor.js');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

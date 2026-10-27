// Fysiktester för tryckmotorn i simuleringen Tryck i vätskor och rör
// (fysik1-vatsketryck-app.html). Kör: node .claude/test-tryck-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/tryck-motor.js');
const G = M.G;

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(6)} (väntat ${b.toFixed(6)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };

// 1. Vätsketrycket, med exemplen i fy1-5.3 och fy1-5.4.
nara(M.tryck(998, 3.0), 29401.08, 1e-6, 'fy1-5.4 Ex 1a: 998 · 9,82 · 3,0 = 29 401,08 Pa');
nara(M.P0 + M.tryck(998, 3.0), 130701.08, 1e-6, 'fy1-5.4 Ex 1b: totalt tryck 130 701,08 Pa');
nara(M.tryck(998, 0.4) / M.tryck(998, 0.2), 2, 1e-12, 'dubbla djupet ger dubbla trycket');
nara(M.P0 / (998 * G), 10.34, 0.01, 'ett atmosfärstryck motsvarar cirka 10,3 m vatten');

// 2. Kärlen: volym och nivå hänger ihop åt båda hållen.
M.KARL.forEach((k, i) => {
    let max = 0;
    for (let h = 0; h <= M.KARL_H + 1e-9; h += 0.01) max = Math.max(max, Math.abs(M.niva(k, M.volym(k, h)) - h));
    nara(max, 0, 1e-12, `kärl ${i + 1} (${k.namn}): nivå ur volym ur nivå`);
});

// 3. Kommunicerande kärl: nivåerna blir lika och volymen bevaras.
{
    const nivaer = [0.10, 0.35, 0.05, 0.25];
    const V = nivaer.map((h, i) => M.volym(M.KARL[i], h));
    const V0 = V.reduce((a, b) => a + b, 0);
    for (let t = 0; t < 40; t += 0.02) M.stegKarl(V, 998, 0.02);
    const h = V.map((v, i) => M.niva(M.KARL[i], v));
    const spridning = Math.max(...h) - Math.min(...h);
    nara(spridning, 0, 1e-4, 'nivåerna är lika efter utjämningen');
    nara(V.reduce((a, b) => a + b, 0), V0, 1e-12, 'den totala volymen bevaras');
    nara(h[0], M.gemensamNiva(V0), 1e-4, 'den gemensamma nivån stämmer med volymräkningen');
    const p = h.map((x) => M.tryck(998, x));
    nara(Math.max(...p) - Math.min(...p), 0, 1, 'samma bottentryck i alla kärl (inom 1 Pa)');
}
// Utjämningen ska ta några sekunder, inte gå på en bildruta.
{
    const V = [0.1, 0.35, 0.05, 0.25].map((h, i) => M.volym(M.KARL[i], h));
    for (let t = 0; t < 0.5; t += 0.02) M.stegKarl(V, 998, 0.02);
    const h = V.map((v, i) => M.niva(M.KARL[i], v));
    sant(Math.max(...h) - Math.min(...h) > 0.05, 'efter 0,5 s är nivåerna ännu inte utjämnade');
}

// 4. Hydraulpressen: Exempel 1 i fy1-5.8.
{
    const cfg = { F1: 100, A1: 0.50e-2, A2: 100e-2, m: 1500, s1max: 0.25 };
    const d = M.press(cfg);
    nara(d.F2, 20000, 1e-9, 'Ex 1: F2 = 100 · 100 / 0,50 = 20 000 N');
    nara(d.p, 20000, 1e-9, 'trycket p = F1 / A1 = 20 000 Pa');
    nara(cfg.F1 / cfg.A1, d.F2 / cfg.A2, 1e-9, 'F1 / A1 = F2 / A2');
    sant(d.lyfter, '20 kN lyfter en bil på 1 500 kg');
    const st = M.nyPress();
    while (!st.klar && st.t < 30) M.stegPress(st, cfg, 1 / 120);
    sant(st.klar, 'slaget går i botten');
    const s1 = M.s1av(st, cfg);
    nara(s1, 0.25, 1e-12, 'den lilla kolven har gått hela slaget, 0,25 m');
    nara(st.s2, 0.25 * 0.5 / 100, 1e-12, 'den stora kolven har gått s2 = s1 · A1 / A2 = 1,25 mm');
    nara(cfg.F1 * s1, d.F2 * st.s2, 1e-9, 'arbetet: F1 · s1 = F2 · s2');
    const a = (d.F2 - d.FG) / cfg.m;
    nara(st.v2, Math.sqrt(2 * a * st.s2), 1e-9, 'lastens fart: v² = 2 · a · s');
}
// För liten kraft: lasten står kvar på stöden.
{
    const cfg = { F1: 50, A1: 0.50e-2, A2: 100e-2, m: 1500, s1max: 0.25 };
    const d = M.press(cfg);
    nara(d.F1behov, 1500 * G * 0.5 / 100, 1e-9, 'kraften som behövs: F_G · A1 / A2 = 73,65 N');
    sant(!d.lyfter, '50 N räcker inte');
    const st = M.nyPress();
    for (let i = 0; i < 300; i++) M.stegPress(st, cfg, 1 / 60);
    nara(st.s2, 0, 0, 'lasten står kvar');
}

// 5. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik1-vatsketryck-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'tryck-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        sant(html.includes(kalla), 'sidans motor är identisk med tryck-motor.js');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

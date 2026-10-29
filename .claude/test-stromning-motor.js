// Fysiktester för motorn i Strömning i rör (fysik1-stromning-app.html).
// Kör: node .claude/test-stromning-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/stromning-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toPrecision(6)} (väntat ${b.toPrecision(6)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };

const g = { L: 1.2, d1: 0.030, d2: 0.015, h: 0.20 };
const Q = 0.3e-3, p1 = M.P_ATM + 5000;

// 1. Kontinuitet: A · v = Q överallt, och halva diametern ger fyra gånger farten.
for (let i = 0; i <= 20; i++) {
    const P = M.punkt(g, Q, p1, g.L * i / 20);
    nara(P.A * P.v, Q, 1e-12, `A · v = Q vid x = ${(g.L * i / 20).toFixed(2)} m`);
}
{
    const a = M.punkt(g, Q, p1, g.L * M.PUNKTER.A), b = M.punkt(g, Q, p1, g.L * M.PUNKTER.B);
    nara(b.v / a.v, 4, 1e-9, 'halva diametern i förträngningen ger fyra gånger farten');
}
// 2. Bernoulli: p + ρv²/2 + ρgh är densamma i hela röret.
{
    const E = (P) => P.p + P.dyn + P.lage;
    const E0 = E(M.punkt(g, Q, p1, 0));
    let max = 0;
    for (let i = 0; i <= 50; i++) max = Math.max(max, Math.abs(E(M.punkt(g, Q, p1, g.L * i / 50)) - E0));
    nara(max, 0, 1e-6, 'p + ρv²/2 + ρgh är konstant längs röret');
    const a = M.punkt(g, Q, p1, g.L * M.PUNKTER.A), b = M.punkt(g, Q, p1, g.L * M.PUNKTER.B), c = M.punkt(g, Q, p1, g.L * M.PUNKTER.C);
    sant(b.p < a.p, 'trycket är lägre i förträngningen');
    nara(a.p - c.p, M.RHO_V * M.G * g.h, 1e-6, 'samma diameter, 0,20 m högre: trycket sjunker med ρ · g · h');
}
// 3. Utan förträngning och höjdändring är trycket detsamma överallt.
{
    const r = { L: 1.2, d1: 0.03, d2: 0.03, h: 0 };
    nara(M.punkt(r, Q, p1, 0.6).p, p1, 1e-9, 'rakt rör utan höjdändring: trycket ändras inte');
}
// 4. Reynolds tal och regimerna.
{
    const V = M.VATSKOR.vatten;
    nara(M.reynolds(V.rho, 0.1, 0.02, V.eta), 1996, 0.5, 'vatten, 0,1 m/s i 20 mm: Re ≈ 2 000');
    sant(M.regim(1500) === 'laminar' && M.regim(3000) === 'overgang' && M.regim(6000) === 'turbulent', 'regimerna laminär, övergång, turbulent');
    sant(M.regim(M.reynolds(M.VATSKOR.olja.rho, 1, 0.02, M.VATSKOR.olja.eta)) === 'laminar', 'matolja i 1 m/s genom 20 mm: laminär');
}
// 5. Laminärt tryckfall: Hagen–Poiseuille, Δp/L = 32 · η · v / d².
{
    const V = M.VATSKOR.olja, v = 0.5, d = 0.02;
    nara(M.tryckfall(V.rho, v, d, V.eta), 32 * V.eta * v / (d * d), 1e-6, 'laminärt tryckfall enligt Hagen–Poiseuille');
    const W = M.VATSKOR.vatten;
    const f = M.friktion(M.reynolds(W.rho, 2, 0.02, W.eta));
    nara(f, 0.316 * Math.pow(M.reynolds(W.rho, 2, 0.02, W.eta), -0.25), 1e-12, 'turbulent friktionsfaktor enligt Blasius');
}
// 6. Hastighetsprofilen har rätt medelvärde (integral över tvärsnittet).
for (const Re of [500, 10000]) {
    let s = 0; const n = 4000;
    for (let i = 0; i < n; i++) { const r = (i + 0.5) / n; s += M.profil(r, Re) * 2 * r / n; }
    nara(s, 1, 2e-3, `profilens medelvärde är medelfarten (Re = ${Re})`);
}
nara(M.profil(0, 500), 2, 1e-12, 'laminärt: mitten går dubbelt så fort som medelfarten');

// 7. Sidan bär en oförändrad kopia av motorn.
{
    const motor = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'stromning-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
    const sida = path.join(__dirname, '..', 'fysik1-stromning-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="stromning-motor">\n([\s\S]*?)\n<\/script>/);
        sant(!!m && m[1].trim() === motor, 'sidans kopia av motorn är identisk med källan');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} FEL` : '\nAlla tester gick igenom.');
process.exit(fel ? 1 : 0);

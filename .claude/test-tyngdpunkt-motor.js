// Fysiktester för motorn i simuleringen Tyngdpunktsjakten (fysik2-lodlinjen-app.html).
// Kör: node .claude/test-tyngdpunkt-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/tyngdpunkt-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(4)} (väntat ${b.toFixed(4)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };

// 1. Geometrin: rektangel 20 × 10 cm.
{
    const g = M.geom([[0, 0], [20, 0], [20, 10], [0, 10]]);
    nara(g.A, 200, 1e-9, 'rektangelns area');
    nara(g.cx, 10, 1e-9, 'tyngdpunktens x'); nara(g.cy, 5, 1e-9, 'tyngdpunktens y');
    nara(g.JC, 200 * (400 + 100) / 12, 1e-6, 'polärt ytmoment kring tyngdpunkten = A (b² + h²) / 12');
    const g2 = M.geom([[0, 0], [0, 10], [20, 10], [20, 0]]);
    nara(g2.JC, g.JC, 1e-6, 'samma svar när hörnen tas i motsatt ordning');
}
// 2. L-formen: tyngdpunkten utanför materialet, hästskon i hålet, Sverige inne i landet.
{
    const L = M.FORMER.L;
    nara(L.g.cx, (8 * 22 * 4 + 30 * 8 * 15) / (8 * 22 + 30 * 8), 1e-9, 'L-formens tyngdpunkt, x');
    sant(!M.inuti(L.pts, L.g.cx, L.g.cy), 'L-formens tyngdpunkt ligger utanför skivan');
    const H = M.FORMER.hastsko;
    sant(!M.inuti(H.pts, H.g.cx, H.g.cy), 'hästskons tyngdpunkt ligger i hålet');
    const S = M.FORMER.sverige;
    sant(M.inuti(S.pts, S.g.cx, S.g.cy), 'Sveriges tyngdpunkt ligger inne i landet');
    for (const id in M.FORMER) {
        const f = M.FORMER[id];
        sant(f.hal.length >= 3 && f.hal.every(([x, y]) => M.inuti(f.pts, x, y)), `${id}: minst tre hål, alla i materialet`);
    }
}
// 3. Pendeln: skivan stannar med tyngdpunkten rakt under spiken, oavsett hål.
for (const id in M.FORMER) {
    const f = M.FORMER[id];
    for (let h = 0; h < 2; h++) {
        const st = M.nytt(f, h, M.jamvikt(f, f.hal[h]) + 0.8);
        for (let i = 0; i < 1200; i++) M.steg(st, f, 1 / 60);
        const r = M.rel(f, f.hal[h], st.theta);
        nara(r[0], 0, 0.05, `${id}, hål ${h + 1}: tyngdpunkten rakt under spiken`);
        sant(r[1] > 0, `${id}, hål ${h + 1}: tyngdpunkten under spiken, inte över`);
    }
}
// 4. Lodlinjerna från två hål korsar varandra i tyngdpunkten.
for (const id in M.FORMER) {
    const f = M.FORMER[id];
    const linjer = [0, 1, 2].map((h) => M.lodlinje(f, M.nytt(f, h)));
    const p = M.skarning(linjer[0], linjer[1]);
    nara(Math.hypot(p[0] - f.g.cx, p[1] - f.g.cy), 0, 1e-6, `${id}: linjerna från hål 1 och 2 korsas i tyngdpunkten`);
    const q = M.skarning(linjer[0], linjer[2]);
    nara(Math.hypot(q[0] - f.g.cx, q[1] - f.g.cy), 0, 1e-6, `${id}: den tredje linjen går genom samma punkt`);
}
// 5. Små svängningar: periodtiden T = 2π √(I / (m g d)) för en fysisk pendel.
{
    const f = M.FORMER.skiva, P = f.hal[0];
    const d = Math.hypot(f.g.cx - P[0], f.g.cy - P[1]);
    const Im = f.g.JC / f.g.A + d * d;
    const T = 2 * Math.PI * Math.sqrt(Im / (M.G * d));
    const st = M.nytt(f, 0, M.jamvikt(f, P) + 0.05);
    const dt = 0.0005; let fore = M.rel(f, P, st.theta)[0], nollor = [];
    for (let i = 0; i < 20000 && nollor.length < 3; i++) {
        M.steg(st, f, dt);
        const nu = M.rel(f, P, st.theta)[0];
        if (fore < 0 && nu >= 0) nollor.push(st.t);
        fore = nu;
    }
    nara(nollor[1] - nollor[0], T * 1.0, T * 0.03, 'periodtiden stämmer med den fysiska pendeln (dämpningen ändrar den lite)');
}
// 6. Egen form: korsande kanter och för små former underkänns.
{
    sant(!!M.egen([[0, 0], [10, 10], [10, 0], [0, 10]]).fel, 'en form vars kanter korsar varandra underkänns');
    sant(!!M.egen([[0, 0], [3, 0], [0, 3]]).fel, 'en för liten form underkänns');
    const e = M.egen([[0, 0], [20, 0], [20, 15], [0, 15]]);
    sant(!e.fel && e.hal.length >= 3, 'en rektangel godkänns och får hål');
}

// 7. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik2-lodlinjen-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'tyngdpunkt-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        sant(html.includes(kalla), 'sidans motor är identisk med tyngdpunkt-motor.js');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

// Tester för modellen i simuleringen Effekt och verkningsgrad
// (fysik1-effekt-verkningsgrad-app.html). Kör: node .claude/test-effekt-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/effekt-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(5)} (väntat ${b.toFixed(5)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };

// 1. Lyft: nyttig energi = m·g·h, tiden = m·g·h / (η·Pt), tillförd = Pt·Δt.
{
    const cfg = { m: 2, h: 1, Pt: 4, eta: 0.5 };
    const d = M.lyftData(cfg);
    nara(d.En, 2 * M.G, 1e-12, 'nyttig energi m·g·h');
    nara(d.T, 2 * M.G / 2, 1e-12, 'Δt = m·g·h / Pn');
    nara(d.Et, 4 * d.T, 1e-12, 'tillförd energi Pt·Δt');
    nara(d.En / d.Et, 0.5, 1e-12, 'η = En / Et');
    const s = M.lyftVid(cfg, d.T / 2);
    nara(s.y, 0.5, 1e-12, 'halva tiden: halva höjden');
    nara(s.Et - s.En - s.Q, 0, 1e-12, 'Et = En + värme');
    sant(M.lyftVid(cfg, 2 * d.T).klar && Math.abs(M.lyftVid(cfg, 2 * d.T).y - 1) < 1e-12, 'lyftet stannar vid h');
}

// 2. Dubbel effekt: samma energi, halva tiden.
{
    const a = M.lyftData({ m: 1, h: 0.8, Pt: 5, eta: 0.6 });
    const b = M.lyftData({ m: 1, h: 0.8, Pt: 10, eta: 0.6 });
    nara(b.En, a.En, 1e-12, 'samma nyttiga energi');
    nara(b.T, a.T / 2, 1e-12, 'halva tiden');
}

// 3. Emilia i trappan (exempel 1 i fy1-4.5): 60 kg, 4,0 m, 10 s och 2,5 s.
{
    const En = 60 * M.G * 4.0;
    nara(En, 2356.8, 1e-9, 'ΔE = 2 356,8 J');
    nara(En / 10, 235.68, 1e-9, 'gå: P = 235,68 W');
    nara(En / 2.5, 942.72, 1e-9, 'spring: P = 942,72 W');
    // med kroppens verkningsgrad 0,20 blir tillförd effekt Pn / 0,20
    const d = M.lyftData({ m: 60, h: 4.0, Pt: 235.68 / 0.2, eta: 0.2 });
    nara(d.T, 10, 1e-9, 'modellen ger 10 s när Pt = Pn / η');
}

// 4. Apparater: den glömda glödlampan (exempel 2 i fy1-4.5), 8,5 W i två dygn.
{
    const lampa = { P: 8.5, eta: 0.05 };
    const e = M.apparatVid(lampa, 48);
    nara(e.Et, 408, 1e-9, '8,5 W · 48 h = 408 Wh');
    nara(e.Et * 3600, 408 * 3600, 1e-6, 'i joule: 1 468 800 J');
    nara(M.kostnad(e.Et, 1.5), 0.612, 1e-12, 'kostnad vid 1,50 kr/kWh');
    nara(e.En + e.Q, e.Et, 1e-12, 'nyttig + värme = tillförd');
}

// 5. Apparater som bara är på en stund varje dygn.
{
    const kok = { P: 2000, eta: 0.9, paPerDygn: 0.1 };
    nara(M.apparatVid(kok, 24).Et, 200, 1e-12, 'vattenkokaren: 200 Wh på ett dygn');
    nara(M.apparatVid(kok, 24 * 7).Et, 1400, 1e-9, 'vattenkokaren: 1 400 Wh på en vecka');
    nara(M.apparatVid(kok, 24 + 0.05).Et, 300, 1e-9, 'andra dygnet: på igen');
    const akv = { P: 25, eta: 1 };
    sant(M.apparatVid(akv, 24).Et > M.apparatVid(kok, 24).Et, 'akvarievärmaren (25 W hela dygnet) använder mer än vattenkokaren');
    sant(!M.apparatVid(kok, 1).paNu && M.apparatVid(kok, 0.05).paNu, 'vattenkokaren stängs av efter 0,1 h');
    const tv = { P: 1, eta: 0 }, lad = { P: 10, eta: 0.85, paPerDygn: 2 };
    sant(M.apparatVid(tv, 8760).Et > M.apparatVid(lad, 8760).Et, 'tv i viloläge drar mer på ett år än laddaren');
}

// 6. Brickvärden och fördelningen nyttig/värme.
{
    sant(M.brickVarde(10) === 1 && M.brickVarde(40) === 5 && M.brickVarde(1178) === 100, 'brickvärdet följer 1, 2, 5, 10 …');
    sant(M.brickVarde(1, 14, 0) === 0.1 && M.snyggtNedat(0.4) === 0.2 && M.snyggtNedat(30) === 20, 'brickvärden under 1 och nedåt');
    let n = 0;
    for (let k = 0; k < 1000; k++) if (M.arNyttig(k, 0.38)) n++;
    sant(n === 380, `av 1 000 brickor är ${n} nyttiga vid η = 0,38`);
    let m = 0;
    for (let k = 0; k < 7; k++) if (M.arNyttig(k, 0.5)) m++;
    sant(m === 4, 'av 7 brickor vid η = 0,5 är 4 nyttiga (avrundat)');
    sant(M.arNyttig(0, 0.9) && !M.arNyttig(0, 0.05), 'första brickan är nyttig vid η = 0,9, inte vid 0,05');
}

// Sidans kopia av modellen måste vara identisk med källan.
{
    const sida = path.join(__dirname, '..', 'fysik1-effekt-verkningsgrad-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="effekt-motor">\n([\s\S]*?)\n<\/script>/);
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'effekt-motor.js'), 'utf8').replace(/\r\n/g, '\n');
        sant(m && m[1].trim() === kalla.trim(), 'sidans modell är identisk med effekt-motor.js');
    }
}

console.log(fel ? `\n${fel} fel` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

// Fysiktester för gasmotorn i simuleringen Termodynamikens första huvudsats
// (fysik1-forsta-huvudsatsen-app.html). Kör: node .claude/test-gas-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/gas-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(5)} (väntat ${b.toFixed(5)})`);
    if (!ok) fel++;
};
const kor = (st, cfg, sek) => { for (let t = 0; t < sek; t += 1 / 60) M.steg(st, cfg, 1 / 60); return st; };
const forsta = (st, txt) => nara(st.U - st.U0, st.Q + st.W, 1e-9, `${txt}: ΔU = Q + W`);

// 1. Startläget: en fri kolv utan vikter i jämvikt vid 20 °C.
{
    const cfg = { vikter: 0, P: 0, isolerad: false };
    const L = M.jamviktL(cfg, 293.15);
    const st = M.nytt(L, 293.15); st.kolv = 'fri';
    kor(st, cfg, 3);
    nara(st.L, L, 1e-6, 'kolven står still i jämviktsläget');
    nara(M.tryck(st), M.pYttre(cfg), 1, 'trycket är lufttrycket plus kolvens tyngd per area');
}

// 2. Låst kolv: allt värme blir inre energi.
{
    const cfg = { vikter: 0, P: 20, isolerad: false };
    const st = M.nytt(0.2, 293.15);
    kor(st, cfg, 10);
    nara(st.W, 0, 0, 'låst kolv: W = 0');
    if (!(st.Q < 200 && st.Q > 100)) { console.log('FEL  värmen från plattan minus läckaget'); fel++; } else console.log('OK   Q = 20 W · 10 s minus läckaget till rummet');
    forsta(st, 'låst kolv');
    nara(M.temp(st) - 293.15, st.Q / M.CV, 1e-6, 'ΔT = Q / (3/2 · n · R)');
}

// 2b. Läckaget: en varm gas med låst kolv och avstängd platta svalnar mot rummet.
{
    const cfg = { vikter: 0, P: 0, isolerad: false };
    const st = M.nytt(0.2, 393.15);
    kor(st, cfg, 120);
    if (!(M.temp(st) < 393.15 - 50 && M.temp(st) > 293.15)) { console.log('FEL  gasen svalnar inte mot rummet'); fel++; } else console.log('OK   gasen svalnar mot rummets temperatur');
    forsta(st, 'läckaget');
}
// 2c. Snabbt och långsamt ger olika sluttemperatur när cylindern inte är isolerad.
{
    const cfg = { vikter: 0, P: 0, isolerad: false };
    const sluta = (fart) => { const st = M.nytt(0.2, 293.15); st.kolv = 'hand'; st.handMal = 0.1; st.handFart = fart; kor(st, cfg, 0.1 / fart + 0.05); return M.temp(st); };
    const snabb = sluta(0.5), lang = sluta(0.02);
    if (!(snabb - lang > 5)) { console.log('FEL  snabb kompression ska bli varmare än långsam'); fel++; } else console.log(`OK   snabb kompression blir varmare (${snabb.toFixed(1)} K mot ${lang.toFixed(1)} K)`);
}

// 3. Cykelpumpen: isolerad, kolven trycks ned. Då gäller T · V^(2/3) = konstant.
{
    const cfg = { vikter: 0, P: 20, isolerad: true };
    const st = M.nytt(0.2, 293.15);
    st.kolv = 'hand'; st.handMal = 0.08; st.handFart = 0.5;
    kor(st, cfg, 2);
    nara(st.Q, 0, 0, 'isolerad: Q = 0');
    nara(st.L, 0.08, 1e-9, 'kolven har nått målet');
    nara(M.temp(st), 293.15 * Math.pow(0.2 / 0.08, 2 / 3), 0.05, 'adiabatisk kompression: T2 = T1 · (V1/V2)^(2/3)');
    forsta(st, 'cykelpumpen');
}

// 4. Värm med fri kolv: vid konstant tryck blir 3/5 av värmen inre energi.
{
    const cfg = { vikter: 10, P: 10, isolerad: false };
    const st = M.nytt(M.jamviktL(cfg, 293.15), 293.15); st.kolv = 'fri';
    kor(st, cfg, 20);
    const ps = M.pYttre(cfg);
    nara((st.U - st.U0) / st.Q, 0.6, 0.005, 'fri kolv: ΔU / Q = 3/5');
    nara(-st.W, ps * (M.volym(st) - M.A * M.jamviktL(cfg, 293.15)), 0.5, 'arbetet av gasen = p · ΔV');
    forsta(st, 'fri kolv');
}

// 5. Gasen lyfter en vikt: isolerad, spärren släpps. Slutläget ger ΔU = −p_yttre · ΔV.
{
    const cfg = { vikter: 20, P: 0, isolerad: true };
    const st = M.nytt(0.1, 450);
    const V1 = M.volym(st);
    st.kolv = 'fri';
    kor(st, cfg, 6);
    nara(st.v, 0, 1e-4, 'kolven har stannat');
    nara(st.U - st.U0, -M.pYttre(cfg) * (M.volym(st) - V1), 0.5, 'ΔU = −p_yttre · ΔV');
    nara(M.tryck(st), M.pYttre(cfg), 1, 'slutet: trycket är lika med det yttre trycket');
    if (!(M.temp(st) < 450)) { console.log('FEL  gasen har inte svalnat'); fel++; } else console.log('OK   gasen har svalnat');
    forsta(st, 'gasen lyfter en vikt');
}

// 6. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik1-forsta-huvudsatsen-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'gas-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        const ok = html.includes(kalla);
        console.log(`${ok ? 'OK ' : 'FEL'}  sidans motor är identisk med gas-motor.js`); if (!ok) fel++;
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

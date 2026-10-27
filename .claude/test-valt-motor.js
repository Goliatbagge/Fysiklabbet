// Fysiktester för motorn i simuleringen Vältning (fysik2-valtning-app.html).
// Kör: node .claude/test-valt-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/valt-motor.js');
const R = M.RAD;

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(4)} (väntat ${b.toFixed(4)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
const kloss = (b, h, extra = {}) => Object.assign({ b, h, mK: 1, mV: 0, yV: 0, mu: 0.5 }, extra);

// 1. Vältningsvinkeln tan α = b / h utan vikt.
nara(M.alfaKrit(kloss(0.2, 0.2)) / R, 45, 1e-9, 'b = h ger 45°');
nara(Math.tan(M.alfaKrit(kloss(0.1, 0.3))), 0.1 / 0.3, 1e-12, 'tan α = b / h');
// 2. En vikt lågt sänker tyngdpunkten och gör klossen stabilare.
{
    const c = kloss(0.1, 0.3, { mV: 2, yV: 0.02 });
    nara(M.tp(c).hT, (1 * 0.15 + 2 * 0.02) / 3, 1e-12, 'tyngdpunktens höjd med vikt');
    sant(M.alfaKrit(c) > M.alfaKrit(kloss(0.1, 0.3)), 'vikten lågt ger en större vältningsvinkel');
    sant(M.alfaKrit(kloss(0.1, 0.3, { mV: 2, yV: 0.28 })) < M.alfaKrit(kloss(0.1, 0.3)), 'vikten högt ger en mindre vältningsvinkel');
}
// 3. Tröghetsmomentet kring hörnet: kloss utan vikt ger m (b² + h²) / 3.
nara(M.iHorn(kloss(0.2, 0.4)), (0.04 + 0.16) / 3, 1e-12, 'I kring hörnet = m (b² + h²) / 3');

// 4. Läge 1: släppt strax under gränsen faller klossen tillbaka, strax över välter den.
{
    const c = kloss(0.1, 0.3), a = M.alfaKrit(c);
    const kor = (th) => { const st = M.nytt1(); st.theta = th; for (let i = 0; i < 300; i++) M.steg1(st, c, 1 / 60); return st; };
    sant(kor(a - 2 * R).theta === 0, '2° under gränsen faller klossen tillbaka');
    sant(kor(a + 2 * R).liggande, '2° över gränsen välter den');
    // energin: från vila vid θ0 till θ = 0 ska rörelseenergin bli M g (y0 − y1)
    const st = M.nytt1(); st.theta = a - 5 * R;
    const yTp = (th) => (c.b / 2) * Math.sin(th) + M.tp(c).hT * Math.cos(th);
    let wmax = 0; for (let i = 0; i < 2000 && st.theta > 0; i++) { M.steg1(st, c, 1 / 2000); wmax = Math.max(wmax, Math.abs(st.omega)); }
    nara(0.5 * M.iHorn(c) * wmax * wmax, 1 * M.G * (yTp(a - 5 * R) - yTp(0)), 0.002, 'energin bevaras när klossen faller tillbaka');
}

// 5. Läge 2: glider eller välter.
{
    const vev = (c) => {
        const st = M.nytt2(0.5);
        for (let i = 0; i < 3000 && st.fas !== 'klar'; i++) {
            const fore = st.fas;
            M.steg2(st, c, 1 / 60, 3 * R);
            if (fore === 'vila' && st.fas !== 'vila') { st.phiStart = st.phi; st.tStart = st.t; }
        }
        return st;
    };
    const is = vev(kloss(0.1, 0.3, { mu: 0.1 }));
    sant(is.handelse === 'glider', 'på is glider den höga klossen');
    nara(Math.tan(is.phiStart), 0.1, 0.01, 'den börjar glida när tan φ = μ');
    sant(is.fas === 'klar' && is.t - is.tStart < 4, `glidningen syns: 0,5 m på ${(is.t - is.tStart).toFixed(1)} s`);
    const sand = vev(kloss(0.1, 0.3, { mu: 1.0 }));
    sant(sand.handelse === 'valter', 'på sandpapper välter den höga klossen');
    const lag = vev(kloss(0.3, 0.1, { mu: 1.0 }));
    sant(lag.handelse === 'glider', 'den låga klossen glider även på sandpapper');
}
// 6. Normalkraften vandrar mot hörnet och når det vid vältningsgränsen.
{
    const c = kloss(0.1, 0.3, { mu: 1.0 });
    const st = M.nytt2(0.5);
    st.phi = 10 * R;
    nara(M.normalLage(c, st), 0.15 * Math.tan(10 * R), 1e-12, 'i vila: x = hT · tan φ');
    st.phi = M.alfaKrit(c);
    nara(M.normalLage(c, st), 0.05, 1e-9, 'vid gränsen sitter normalkraften i hörnet');
    const k = M.krafter(c, st);
    nara(k.FN * M.normalLage(c, st), k.Ff * M.tp(c).hT, 1e-9, 'momentet kring tyngdpunkten: F_N · x = F_f · hT');
}

// 7. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik2-valtning-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'valt-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        sant(html.includes(kalla), 'sidans motor är identisk med valt-motor.js');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

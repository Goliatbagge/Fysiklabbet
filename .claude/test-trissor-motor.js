// Fysiktester för rörelsemotorn i simuleringen Sammansatta system
// (fysik1-trissor-app.html). Kör: node .claude/test-trissor-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/trissor-motor.js');
const G = M.G;

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(5)} (väntat ${b.toFixed(5)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
const korKlart = (cfg) => { const st = M.nytt(cfg); let t = 0; while (!st.klar && t < 60) { M.kor(st, cfg, 1 / 60); t += 1 / 60; } return st; };

// 1. Exempel 1 i fy1-3.10: 1,0 kg och 3,0 kg.
{
    const cfg = { mu: 0, s: 0.5, kroppar: [{ typ: 'hang', m: 1, sida: -1 }, { typ: 'hang', m: 3, sida: 1 }] };
    const d = M.dynamik(cfg, 0);
    nara(d.a, 4.91, 1e-12, 'a = (3,0 − 1,0) · 9,82 / 4,0 = 4,91 m/s²');
    const [S1, S3] = M.spannkrafter(cfg, d.a);
    nara(S1, 14.73, 1e-12, 'F_S ur 1-kilosvikten = 14,73 N');
    nara(S3, S1, 1e-12, 'samma spännkraft ur 3-kilosvikten');
    sant(S1 > 1 * G && S1 < 3 * G, 'spännkraften ligger mellan tyngderna');
    const st = korKlart(cfg);
    nara(st.v, Math.sqrt(2 * 4.91 * 0.5), 1e-9, 'farten efter 0,5 m: v² = 2 · a · s');
}

// 2. Lika tunga vikter: ingen acceleration, F_S = m · g.
{
    const cfg = { mu: 0, s: 0.5, kroppar: [{ typ: 'hang', m: 2, sida: -1 }, { typ: 'hang', m: 2, sida: 1 }] };
    const d = M.dynamik(cfg, 0);
    nara(d.a, 0, 1e-12, 'lika tunga: a = 0');
    nara(M.spannkrafter(cfg, 0)[0], 2 * G, 1e-12, 'F_S = m · g');
    sant(korKlart(cfg).orsak === 'still', 'systemet står still');
}

// 3. Vagn på bordet och hängande vikt, utan och med friktion.
{
    const utan = { mu: 0, s: 0.5, kroppar: [{ typ: 'vagn', m: 2 }, { typ: 'hang', m: 0.5, sida: 1 }] };
    const a = M.dynamik(utan, 0).a;
    nara(a, 0.5 * G / 2.5, 1e-12, 'a = m_h · g / (m_v + m_h)');
    nara(M.spannkrafter(utan, a)[1], 0.5 * (G - a), 1e-12, 'F_S = m_h · (g − a)');
    nara(M.spannkrafter(utan, a)[1], 2 * a, 1e-12, 'F_S = m_v · a (det enda som drar vagnen)');
    const med = { mu: 0.2, s: 0.5, kroppar: [{ typ: 'vagn', m: 2 }, { typ: 'hang', m: 0.5, sida: 1 }] };
    nara(M.dynamik(med, 0).a, (0.5 * G - 0.2 * 2 * G) / 2.5, 1e-12, 'med friktion: a = (m_h · g − μ · m_v · g) / m_tot');
    const fast = { mu: 0.3, s: 0.5, kroppar: [{ typ: 'vagn', m: 2 }, { typ: 'hang', m: 0.5, sida: 1 }] };
    const d = M.dynamik(fast, 0);
    sant(d.statisk, 'friktionen håller vagnen kvar (0,5 · g < 0,3 · 2 · g)');
    nara(-d.Ff, 0.5 * G, 1e-12, 'vilofriktionen = m_h · g');
}

// 4. Vagn mellan två vikter: två snören med olika spännkraft.
{
    const cfg = { mu: 0, s: 0.5, kroppar: [{ typ: 'hang', m: 1, sida: -1 }, { typ: 'vagn', m: 2 }, { typ: 'hang', m: 2, sida: 1 }] };
    const a = M.dynamik(cfg, 0).a;
    nara(a, G / 5, 1e-12, 'a = (2 − 1) · g / 5');
    const S = M.spannkrafter(cfg, a);
    nara(S[0], 1 * (G + a), 1e-12, 'vänstra snöret F_S1 = m_1 · (g + a)');
    nara(S[2], 2 * (G - a), 1e-12, 'högra snöret F_S2 = m_2 · (g − a)');
    nara(S[2] - S[0], 2 * a, 1e-12, 'vagnen: F_S2 − F_S1 = m_v · a');
}

// 5. Atwoods maskin: nästan lika tunga vikter ger liten acceleration.
{
    const cfg = { mu: 0, s: 0.5, kroppar: [{ typ: 'hang', m: 1.0, sida: -1 }, { typ: 'hang', m: 1.05, sida: 1 }] };
    nara(M.dynamik(cfg, 0).a, 0.05 * G / 2.05, 1e-12, 'Atwood: a = Δm · g / m_tot');
    const st = korKlart(cfg);
    nara(st.t, Math.sqrt(2 * 0.5 / (0.05 * G / 2.05)), 1e-9, 'tiden för 0,5 m: s = a · t² / 2');
}

// 6. Systemet rör sig åt andra hållet när den vänstra vikten är tyngst.
{
    const cfg = { mu: 0, s: 0.5, kroppar: [{ typ: 'hang', m: 3, sida: -1 }, { typ: 'hang', m: 1, sida: 1 }] };
    const st = korKlart(cfg);
    nara(st.x, -0.5, 1e-12, 'x = −0,5 m');
}

// Sidans kopia av motorn måste vara identisk med källan.
{
    const sida = path.join(__dirname, '..', 'fysik1-trissor-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="trissor-motor">\n([\s\S]*?)\n<\/script>/);
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'trissor-motor.js'), 'utf8').replace(/\r\n/g, '\n');
        sant(m && m[1].trim() === kalla.trim(), 'sidans motor är identisk med trissor-motor.js');
    }
}

console.log(fel ? `\n${fel} fel` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

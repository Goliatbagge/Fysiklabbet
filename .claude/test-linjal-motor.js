// Fysiktester för motorn i simuleringen Fingerbalansen (fysik2-linjalen-app.html).
// Kör: node .claude/test-linjal-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/linjal-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(4)} (väntat ${b.toFixed(4)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
const foremal = (id, extra = {}) => Object.assign({ mV: 0, xV: 0 }, M.FOREMAL[id], extra);
const kor = (c, st, rikt) => { M.starta(c, st, rikt); for (let i = 0; i < 20000 && st.fas === 'dra'; i++) M.steg(st, c, 1 / 60, 0.08); return st; };

// 1. Krafterna: summan är F_G och momentlagen kring tyngdpunkten går ihop.
{
    const c = foremal('linjal'), st = M.nytt(c, 0.2, 0.9, 0.1);
    const k = M.krafter(c, st);
    nara(k.FP + k.FQ, k.FG, 1e-12, 'F_P + F_Q = F_G');
    nara(k.FP * k.lP, k.FQ * k.lQ, 1e-12, 'F_P · l_P = F_Q · l_Q');
    nara(k.FP, k.FG * k.lQ / (k.lP + k.lQ), 1e-12, 'F_P = F_G · l_Q / (l_P + l_Q)');
    sant(k.lQ < k.lP && k.FQ > k.FP, 'fingret närmast tyngdpunkten bär mest');
}
// 2. Dra ihop: fingrarna möts under tyngdpunkten, och de byter roll flera gånger.
for (const [id, extra, pP, pQ] of [['linjal', {}, 0.15, 0.95], ['linjal', {}, 0.45, 1.05], ['kvast', {}, 0.2, 1.3], ['bat', {}, 0.15, 0.85], ['ko', {}, 0.2, 1.5], ['linjal', { mV: 0.2, xV: 0.85 }, 0.15, 1.05]]) {
    const c = foremal(id, extra), st = M.nytt(c, pP, pQ, 0.1);
    kor(c, st, 1);
    const k = M.krafter(c, st);
    sant(st.fas === 'mott', `${id}${extra.mV ? ' med vikt' : ''}: fingrarna möts`);
    nara((st.pP + st.pQ) / 2, k.xT, M.FINGER, `${id}${extra.mV ? ' med vikt' : ''}: mötesplatsen är tyngdpunkten`);
    sant(st.byten >= 2, `${id}${extra.mV ? ' med vikt' : ''}: fingrarna byter roll (${st.byten} gånger)`);
}
// 3. Symmetriskt: ett finger börjar glida, och sedan byter de roll som vanligt.
{
    const c = foremal('linjal'), st = M.nytt(c, 0.2, 1.0, 0.1);
    kor(c, st, 1);
    sant(st.byten >= 2, `symmetriskt: fingrarna byter roll (${st.byten} gånger)`);
    nara((st.pP + st.pQ) / 2, M.krafter(c, st).xT, M.FINGER, 'symmetriskt: mötesplatsen är tyngdpunkten');
}
// 4. Dra isär: inga byten, och föremålet faller.
{
    const c = foremal('linjal'), st = M.nytt(c, 0.45, 0.7, 0.1);
    kor(c, st, -1);
    sant(st.byten === 0, 'isär: fingrarna byter aldrig roll');
    sant(st.fas === 'faller', 'isär: linjalen faller när ett finger glidit av änden');
    for (let i = 0; i < 600 && st.fas === 'faller'; i++) M.steg(st, c, 1 / 60, 0);
    sant(st.fas === 'fallen', 'isär: fallet tar slut');
}
// 5. Glidande finger byter roll först när kvoten passerat MU_VILA / MU.
{
    const c = foremal('linjal'), st = M.nytt(c, 0.15, 1.0, 0.1);
    M.starta(c, st, 1);
    const forst = st.fast;
    let k;
    while (st.fast === forst) { k = M.krafter(c, st); M.steg(st, c, 0.001, 0.08); }
    const glid = forst === 'P' ? k.FQ : k.FP, fast = forst === 'P' ? k.FP : k.FQ;
    nara(glid / fast, M.MU_VILA / M.MU, 0.01, 'bytet sker när F_N(glider) / F_N(fast) = μ_vila / μ');
}

// 6. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik2-linjalen-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'linjal-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        sant(html.includes(kalla), 'sidans motor är identisk med linjal-motor.js');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

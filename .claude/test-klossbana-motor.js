// Fysiktester för rörelsemotorn i simuleringen Förlust av mekanisk energi
// (fysik1-energiforluster-app.html). Kör: node .claude/test-klossbana-motor.js
//
// Motorns källa ligger i .claude/samarbete-sigbjorn/klossbana-motor.js och
// klistras in i sidan. Testet kontrollerar också att sidans kopia är identisk.
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/klossbana-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(5)} (väntat ${b.toFixed(5)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
const bas = { lage: 'slapp', H: 0.6, a1: 30, a2: 30, Lp: 1.2, m: 1, h: 0.4, muRamp: 0, muPlan: 0 };
function korKlart(cfg, maxT = 120) {
    const st = M.nytt(cfg);
    let t = 0, maxFel = 0;
    while (!st.klar && t < maxT) {
        M.kor(st, cfg, 1 / 60); t += 1 / 60;
        maxFel = Math.max(maxFel, Math.abs(M.energier(st, cfg).fel));
    }
    st.maxFel = maxFel;
    return st;
}

// 1. Utan friktion: klossen når samma höjd på andra sidan, energin bevaras.
{
    const cfg = { ...bas };
    const st = M.nytt(cfg);
    let t = 0, maxFel = 0;
    while (t < 4) {
        M.kor(st, cfg, 1 / 60); t += 1 / 60;
        maxFel = Math.max(maxFel, Math.abs(M.energier(st, cfg).fel));
    }
    nara(st.vandHojder[0], 0.4, 1e-9, 'utan friktion: samma höjd på andra sidan');
    nara(maxFel, 0, 1e-9, 'utan friktion: Ep + Ek konstant');
    sant(!st.klar, 'utan friktion: klossen pendlar vidare');
}

// 2. Friktionsfri ramp, sträv plan: stoppsträckan s = h / μ.
{
    const cfg = { ...bas, h: 0.3, muPlan: 0.4 };
    const st = korKlart(cfg);
    sant(st.orsak === 'stannade', 'sandpapper: klossen stannar');
    nara(st.u, 0.3 / 0.4, 1e-9, 'stoppsträckan s = h / μ');
    nara(M.energier(st, cfg).Ev, cfg.m * M.G * 0.3, 1e-9, 'all lägesenergi har blivit värme');
    nara(st.maxFel, 0, 1e-9, 'energibalansen under hela förloppet');
}

// 3. Massan stryks bort: 0,5 kg och 2 kg stannar på samma ställe.
{
    const a = korKlart({ ...bas, m: 0.5, h: 0.5, muRamp: 0.2, muPlan: 0.5 });
    const b = korKlart({ ...bas, m: 2, h: 0.5, muRamp: 0.2, muPlan: 0.5 });
    nara(a.u, b.u, 1e-9, 'tung och lätt kloss stannar på samma ställe');
}

// 4. Friktion i backen: stoppsträckan s = (h − μr · h / tan α) / μp.
{
    const cfg = { ...bas, h: 0.5, muRamp: 0.2, muPlan: 0.5 };
    const st = korKlart(cfg);
    const s = (0.5 - 0.2 * 0.5 / Math.tan(30 * M.DEG)) / 0.5;
    nara(st.u, s, 1e-9, 'stoppsträckan med friktion även i backen');
    nara(st.maxFel, 0, 1e-9, 'energibalansen med friktion i backen');
}

// 5. Fram och tillbaka med filt: höjden minskar för varje passage och allt blir värme.
{
    const cfg = { ...bas, h: 0.5, muPlan: 0.1 };
    const st = korKlart(cfg);
    const toppar = st.vandHojder;
    const e = M.energier(st, cfg);
    sant(toppar.length >= 3, `klossen vänder flera gånger (${toppar.length})`);
    sant(toppar.every((h, i) => i === 0 || h < toppar[i - 1] + 1e-12), 'vändhöjden minskar varje gång');
    nara(toppar[0], 0.5 - 0.1 * 1.2, 1e-9, 'första vändhöjden = h − μ · Lp');
    nara(e.Ev + e.Ep, e.E0, 1e-9, 'slutet: värme + kvarvarande lägesenergi = startenergin');
}

// 6. Klossen ligger kvar i backen när tan α ≤ μ.
{
    const cfg = { ...bas, a1: 20, h: 0.3, muRamp: 0.4 };
    const st = korKlart(cfg);
    sant(st.orsak === 'stannade' && st.sTot === 0, 'tan 20° < 0,4: klossen glider inte alls');
}

// 7. Dra uppför: W = ΔEp + Ev, och utan friktion W = ΔEp.
{
    const cfg = { ...bas, lage: 'dra', h: 0.5, muRamp: 0.35 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    const s = 0.5 / Math.sin(30 * M.DEG);
    const FN = cfg.m * M.G * Math.cos(30 * M.DEG);
    nara(e.W, cfg.m * M.G * 0.5 + 0.35 * FN * s, 1e-9, 'W = m·g·h + μ·F_N·s');
    nara(e.Ev, 0.35 * FN * s, 1e-9, 'E_v = F_f · s längs rampen');
    nara(e.fel, 0, 1e-9, 'W = ΔEp + Ev');
    const u = korKlart({ ...cfg, muRamp: 0 });
    nara(M.energier(u, { ...cfg, muRamp: 0 }).W, cfg.m * M.G * 0.5, 1e-9, 'utan friktion: W = m·g·h');
}

// 8. Värmekartan: summan av cellerna är Ev, och planen glöder mer per meter än backen.
{
    const cfg = { ...bas, h: 0.5, muRamp: 0.2, muPlan: 0.2 };
    const st = korKlart(cfg);
    const sum = st.varme.reduce((a, b) => a + b, 0);
    nara(sum, st.Ev, 1e-9, 'värmekartans summa = E_v');
    const b = M.bana(cfg);
    const cell = (u) => st.varme[Math.floor((u - b.umin) / M.CELL)];
    sant(cell(0.1) > cell(-0.3), 'en meter på planen ger mer värme än en meter i backen');
    nara(cell(0.1) / cell(-0.3), 1 / Math.cos(30 * M.DEG), 1e-6, 'kvoten är 1 / cos α');
}

// Sidans kopia av motorn måste vara identisk med källan.
{
    const sida = path.join(__dirname, '..', 'fysik1-energiforluster-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="klossbana-motor">\n([\s\S]*?)\n<\/script>/);
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'klossbana-motor.js'), 'utf8').replace(/\r\n/g, '\n');
        sant(m && m[1].trim() === kalla.trim(), 'sidans motor är identisk med klossbana-motor.js');
    }
}

console.log(fel ? `\n${fel} fel` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

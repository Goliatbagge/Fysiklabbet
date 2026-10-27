// Fysiktester för rörelsemotorn i simuleringen Arbete (fysik1-arbete-app.html).
// Kör: node .claude/test-arbete-motor.js
//
// Motorns källa ligger i .claude/samarbete-sigbjorn/arbete-motor.js och
// klistras in i sidan. Testet kontrollerar också att sidans kopia är identisk.
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/arbete-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(5)} (väntat ${b.toFixed(5)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };

function korKlart(cfg, maxT = 30) {
    const st = M.nytt(cfg);
    let t = 0;
    while (!st.klar && t < maxT) { M.kor(st, cfg, 1 / 60); t += 1 / 60; }
    return st;
}

// 1. Vagn utan friktion, rak dragning: W = F·s, allt blir rörelseenergi.
{
    const cfg = { lage: 'dra', m: 2, mu: 0, F: 8, v: 0, s: 1.5 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    sant(st.orsak === 'mal', 'rak dragning når målet');
    nara(st.x, 1.5, 1e-9, 'sträcka s');
    nara(e.W, 12, 1e-9, 'W = F·s = 12 J');
    nara(e.Ek, 12, 1e-9, 'Ek = W (ingen friktion)');
    nara(st.vel, Math.sqrt(2 * 12 / 2), 1e-9, 'slutfart ur Ek');
}

// 2. Sned dragning: W = F·cos v·s, oberoende av friktionen.
{
    const cfg = { lage: 'dra', m: 2, mu: 0.3, F: 12, v: 30, s: 1.5 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    const W = 12 * Math.cos(30 * M.DEG) * 1.5;
    nara(e.W, W, 1e-9, 'W = F·cos v·s');
    const FN = 2 * M.G - 12 * Math.sin(30 * M.DEG);
    nara(e.Q, 0.3 * FN * 1.5, 1e-9, 'värme Q = μ·(m·g − F·sin v)·s');
    nara(e.fel, 0, 1e-9, 'energibalans W = Ek + Q');
}

// 3. Låda som sitter fast: stor kraft, ingen förflyttning, W = 0.
{
    const cfg = { lage: 'dra', m: 5, mu: 0.6, F: 20, v: 0, s: 1.5 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    sant(st.orsak === 'fast', 'lådan sitter fast');
    nara(st.x, 0, 1e-12, 'ingen förflyttning');
    nara(e.W, 0, 1e-12, 'W = 0');
    const k = M.krafter(st, cfg);
    nara(k.Ff, 20, 1e-9, 'vilofriktionen tar emot hela kraften');
}

// 4. Bära: kraften uppåt, rörelsen åt sidan, W = 0.
{
    const cfg = { lage: 'bar', m: 2, mu: 0, F: 2 * M.G, v: 90, s: 1.5 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    sant(st.orsak === 'mal', 'bärandet når målet');
    nara(st.x, 1.5, 1e-9, 'sträcka s');
    nara(e.W, 0, 1e-12, 'W = 0');
}

// 5. Lyfta med jämn fart: 1 kg 0,6 m ger samma arbete som 2 kg 0,3 m.
{
    const a = { lage: 'lyft', m: 1, mu: 0, F: 1 * M.G, v: 90, s: 0.6, v0: 0.5 };
    const b = { lage: 'lyft', m: 2, mu: 0, F: 2 * M.G, v: 90, s: 0.3, v0: 0.5 };
    const sa = korKlart(a), sb = korKlart(b);
    const ea = M.energier(sa, a), eb = M.energier(sb, b);
    nara(ea.W, 1 * M.G * 0.6, 1e-9, 'W för 1 kg, 0,6 m = m·g·h');
    nara(eb.W, ea.W, 1e-9, '2 kg, 0,3 m ger samma W');
    nara(ea.Ep, ea.W, 1e-9, 'jämn fart: allt arbete blir lägesenergi');
    nara(ea.fel, 0, 1e-9, 'energibalans vid lyft (med startfart)');
}

// 6. Lyft med för liten kraft: vikten vilar på bänken.
{
    const cfg = { lage: 'lyft', m: 2, mu: 0, F: 15, v: 90, s: 0.3 };
    const st = korKlart(cfg);
    sant(st.orsak === 'fast', 'för liten kraft: vikten lyfter inte');
    nara(M.energier(st, cfg).W, 0, 1e-12, 'W = 0');
}

// 7. Lyft med större kraft än tyngden: W = Ep + Ek.
{
    const cfg = { lage: 'lyft', m: 1, mu: 0, F: 14, v: 90, s: 0.6 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    nara(e.W, 14 * 0.6, 1e-9, 'W = F·h');
    nara(e.Ep + e.Ek, e.W, 1e-9, 'W = Ep + Ek');
}

// 8. Utforska: kraften bakåt (v = 150°) bromsar en vagn med startfart.
{
    const cfg = { lage: 'dra', m: 2, mu: 0, F: 6, v: 150, s: 1.5, v0: 1.2 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    sant(st.orsak === 'stannade', 'vagnen bromsas till stopp');
    sant(e.W < 0, 'arbetet är negativt');
    nara(e.W, -e.Ek0, 1e-9, 'W = −Ek0 (all rörelseenergi tas bort)');
    const s = (e.Ek0) / (6 * Math.cos(30 * M.DEG));
    nara(st.x, s, 1e-9, 'bromssträckan s = Ek0 / (F·cos 30°)');
}

// 9. Friktion bromsar en vagn med startfart utan dragkraft: W = 0, Q = Ek0.
{
    const cfg = { lage: 'dra', m: 2, mu: 0.2, F: 0, v: 0, s: 1.5, v0: 1.0 };
    const st = korKlart(cfg); const e = M.energier(st, cfg);
    nara(e.W, 0, 1e-12, 'ingen dragkraft: W = 0');
    nara(e.Q, e.Ek0, 1e-9, 'friktionen gör om Ek0 till värme');
}

// 10. Kraft bakåt från vila: stoppklossen tar emot, inget händer.
{
    const cfg = { lage: 'dra', m: 2, mu: 0, F: 10, v: 180, s: 1.5 };
    const st = korKlart(cfg);
    sant(st.orsak === 'fast', 'kraft bakåt från vila: står mot stoppklossen');
    nara(st.x, 0, 1e-12, 'ingen förflyttning');
}

// 11. Kraften ändras under försöket: W = summan av Fs·Δs (arean).
{
    const cfg = { lage: 'dra', m: 2, mu: 0, F: 6, v: 0, s: 1.5 };
    const st = M.nytt(cfg);
    while (st.x < 0.5 && !st.klar) M.kor(st, cfg, 1 / 600);
    const x1 = st.x;
    cfg.F = 12; cfg.v = 60;           // samma Fs = 6 N
    while (!st.klar) M.kor(st, cfg, 1 / 60);
    const e = M.energier(st, cfg);
    nara(e.W, 6 * 1.5, 1e-6, 'samma Fs hela vägen ger W = 6 · 1,5');
    nara(e.fel, 0, 1e-9, 'energibalans när kraften ändras');
    sant(x1 > 0.49, 'bytte kraft efter halva vägen');
}

// Sidans kopia av motorn måste vara identisk med källan.
{
    const sida = path.join(__dirname, '..', 'fysik1-arbete-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="arbete-motor">\n([\s\S]*?)<\/script>/);
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'arbete-motor.js'), 'utf8').replace(/\r\n/g, '\n');
        sant(m && m[1].trim() === kalla.trim(), 'sidans motor är identisk med arbete-motor.js');
    }
}

console.log(fel ? `\n${fel} fel` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

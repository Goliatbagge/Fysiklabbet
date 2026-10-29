// Fysiktester för motorn i Hypotesprovet (fysik1-hypotesprovet-app.html).
// Kör: node .claude/test-pendel-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/pendel-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(5)} (väntat ${b.toFixed(5)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
const rad = (d) => d * Math.PI / 180;

// 1. Små utslag: T = 2π · √(l/g).
nara(M.period(1, rad(1)), 2 * Math.PI * Math.sqrt(1 / 9.82), 1e-4, 'litet utslag, l = 1 m');
// 2. Serieutvecklingen T ≈ T₀ · (1 + α²/16 + 11α⁴/3072) vid 30°.
{
    const a = rad(30);
    nara(M.period(1, a) / M.periodLiten(1), 1 + a * a / 16 + 11 * a ** 4 / 3072, 1e-4, '30°: serieutvecklingen');
}
// 3. Fyra gånger så långt snöre ger dubbelt så lång period.
nara(M.period(1, rad(10)) / M.period(0.25, rad(10)), 2, 1e-12, 'fyra gånger längre snöre, dubbla perioden');
// 4. Rörelsen med RK4 har samma period som formeln, och energin bevaras.
{
    for (const [l, d] of [[1, 10], [0.5, 40]]) {
        const p = M.nyPendel(l, rad(d));
        const E = (p) => 0.5 * p.l * p.l * p.w * p.w + 9.82 * p.l * (1 - Math.cos(p.a));
        const E0 = E(p);
        let forra = p.a, t0 = null, varv = 0;
        while (varv < 3) {
            M.steg(p, 1 / 240);
            if (forra < 0 && p.a >= 0) { if (t0 === null) t0 = p.t; else varv++; }
            forra = p.a;
        }
        nara((p.t - t0) / 3, M.period(l, rad(d)), 5e-3, `RK4-perioden, l = ${l} m, ${d}°`);
        nara(E(p), E0, 1e-6 * E0, `energin bevaras, l = ${l} m, ${d}°`);
    }
}
// 5. Mätningarna sprider sig med reaktionstiden, men medelvärdet stämmer.
{
    let s = 1; const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const t = []; for (let i = 0; i < 4000; i++) t.push(M.matning(1, rad(10), rng));
    const medel = t.reduce((a, b) => a + b, 0) / t.length;
    const sd = Math.sqrt(t.reduce((a, b) => a + (b - medel) ** 2, 0) / t.length);
    nara(medel, 10 * M.period(1, rad(10)), 0.01, 'mätningarnas medelvärde');
    nara(sd, M.REAKTION * Math.SQRT2, 0.01, 'mätningarnas spridning');
}
// 6. Bedömningen av hypoteserna.
{
    const r = (m, l, a0, t10) => ({ m, l, a0, t10 });
    const T = (l, a0) => 10 * M.period(l, rad(a0));
    // massan: rättvist, ingen tydlig skillnad
    let b = M.bedom([r(50, 1, 10, T(1, 10)), r(200, 1, 10, T(1, 10) + 0.05)], 'm');
    sant(b.rattvist && !b.tydlig, 'massan: rättvist försök, ingen tydlig skillnad');
    // längden: tydlig ökning
    b = M.bedom([r(100, 0.25, 10, T(0.25, 10)), r(100, 1, 10, T(1, 10))], 'l');
    sant(b.rattvist && b.okar, 'längden: tydlig ökning');
    // två saker ändrade: inget rättvist par
    b = M.bedom([r(50, 0.25, 10, T(0.25, 10)), r(200, 1, 10, T(1, 10))], 'm');
    sant(!b.rattvist && b.tvaPaEnGang, 'massa och längd ändrade på en gång: inte rättvist');
    // utslaget: 5° mot 40° syns med tre mätningar av varje
    const rader = [];
    for (let i = 0; i < 3; i++) { rader.push(r(100, 1, 5, T(1, 5))); rader.push(r(100, 1, 40, T(1, 40))); }
    b = M.bedom(rader, 'a0');
    sant(b.rattvist && b.okar, `utslaget 5° mot 40°: tydlig ökning (${b.skillnad && b.skillnad.toFixed(2)} s)`);
    // utslaget 5° mot 10°: för liten skillnad
    b = M.bedom([r(100, 1, 5, T(1, 5)), r(100, 1, 10, T(1, 10))], 'a0');
    sant(b.rattvist && !b.tydlig, 'utslaget 5° mot 10°: ingen tydlig skillnad');
}

// 6b. Felmätningar: fel antal svängningar syns, och en struken rad räknas inte.
{
    const r = (m, l, a0, t10, struken) => ({ m, l, a0, t10, struken });
    const T = (l) => 10 * M.period(l, rad(10));
    const rader = [r(100, 1, 10, T(1)), r(100, 1, 10, T(1) + 0.05), r(100, 1, 10, T(1) + M.period(1, rad(10)))];
    sant(JSON.stringify(M.misstankt(rader)) === '[2]', 'elva svängningar i stället för tio: mätningen pekas ut');
    rader[2].struken = true;
    sant(M.grupper(rader)[0].t.length === 2, 'den strukna mätningen räknas inte');
    let s = 3; const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;
    nara(M.matning(1, rad(10), rng, 1) / M.period(1, rad(10)), 11, 0.2, 'en felmätning med elva svängningar');
}

// 7. Sidan bär en oförändrad kopia av motorn.
{
    const motor = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'pendel-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
    const sida = path.join(__dirname, '..', 'fysik1-hypotesprovet-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="pendel-motor">\n([\s\S]*?)\n<\/script>/);
        sant(!!m && m[1].trim() === motor, 'sidans kopia av motorn är identisk med källan');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} FEL` : '\nAlla tester gick igenom.');
process.exit(fel ? 1 : 0);

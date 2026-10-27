// Fysiktester för motorn i simuleringen Kalorimetern
// (fysik1-kalorimetri-app.html). Kör: node .claude/test-kalorimeter-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/kalorimeter-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(4)} (väntat ${b.toFixed(4)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };
const kor = (st) => { let n = 0; while (!M.steg(st, 1 / 15) && n < 20000) n++; return st; };
const summa = (e) => e.A.fast + e.A.fas + e.A.flyt + e.B.fast + e.B.fas + e.B.flyt + e.kopp + e.rum;

// 1. Teorins exempel 2 i fy1-6.2: 5,0 dl 80-gradigt i 3,0 dl 20-gradigt vatten ger 57,5 °C.
{
    const st = M.nyttForsok({ A: { typ: 'vatten', m: 0.5, T: 80 }, B: { typ: 'vatten', m: 0.3, T: 20 } });
    nara(st.ideal.T, 57.5, 1e-9, 'exempel 2: sluttemperaturen räknad');
    kor(st);
    nara(M.temp(st.B), 57.5, 0.05, 'exempel 2: sluttemperaturen i simuleringen');
    const e = M.energier(st);
    nara(-(e.A.flyt), 4180 * 0.5 * 22.5, 50, 'avgiven energi c · m · ΔT');
    nara(summa(e), 0, 1e-6, 'energin bevaras, E_avg = E_upp');
    sant(st.t < 120, `temperaturerna möts inom två minuter (${st.t.toFixed(1)} s)`);
}

// 2. Lika mycket av varje hamnar mitt emellan.
{
    const st = M.nyttForsok({ A: { typ: 'vatten', m: 0.3, T: 80 }, B: { typ: 'vatten', m: 0.3, T: 20 } });
    nara(st.ideal.T, 50, 1e-9, 'lika mycket av varje: 50 °C');
}

// 3. Kopparbit, 0,10 kg vid 100 °C, i 0,30 kg vatten vid 20 °C.
{
    const st = M.nyttForsok({ A: { typ: 'koppar', m: 0.1, T: 100 }, B: { typ: 'vatten', m: 0.3, T: 20 } });
    const vantat = (390 * 0.1 * 100 + 4180 * 0.3 * 20) / (390 * 0.1 + 4180 * 0.3);
    nara(st.ideal.T, vantat, 1e-9, 'kopparbiten: sluttemperaturen räknad');
    sant(st.ideal.T < 23, 'vattnets temperatur ändras nästan inte');
    kor(st);
    nara(M.temp(st.B), vantat, 0.05, 'kopparbiten: sluttemperaturen i simuleringen');
    nara(M.cUrMatning(0.1, 100, 0.3, 20, st.ideal.T), 390, 1e-6, 'c räknas fram ur mätningen');
}

// 4. En liten blybit i mycket vatten: det tidssteget får inte svänga över.
{
    const st = M.nyttForsok({ A: { typ: 'bly', m: 0.05, T: 100 }, B: { typ: 'vatten', m: 1.0, T: 20 } });
    let max = -Infinity, min = Infinity;
    while (!M.steg(st, 1 / 15)) { max = Math.max(max, M.temp(st.B)); min = Math.min(min, M.temp(st.A)); }
    sant(min >= st.ideal.T - 0.03, 'blybiten svalnar aldrig under sluttemperaturen');
    sant(max <= st.ideal.T + 0.03, 'vattnet värms aldrig över sluttemperaturen');
}

// 5. Teorins exempel 2 i fy1-6.3: 1,0 kg 56-gradigt vatten och 2,0 kg is vid −8 °C.
{
    const st = M.nyttForsok({ A: { typ: 'vatten', m: 2.0, T: -8, fas: 'fast' }, B: { typ: 'vatten', m: 1.0, T: 56 } });
    nara(st.ideal.T, 0, 1e-12, 'isen och vattnet: sluttemperaturen 0 °C');
    nara(st.ideal.smaltMassa, (4180 * 1.0 * 56 - 2200 * 2.0 * 8) / 334000, 1e-9, 'smält is, 0,595 kg');
    kor(st);
    nara(M.temp(st.A), 0, 0.02, 'isen står vid 0 °C');
    nara(M.smalt(st.A) * 2.0, 0.5955, 0.01, 'smält is i simuleringen');
    const e = M.energier(st);
    nara(e.A.fast, 2200 * 2 * 8, 1, 'energin som värmde isen till 0 °C');
    nara(e.A.fas, 334000 * st.ideal.smaltMassa, 400, 'energin som smälte isen');
    nara(summa(e), 0, 1e-6, 'energin bevaras med isen');
}

// 6. En isbit som smälter helt: 0,30 kg vatten vid 20 °C och 0,050 kg is vid −18 °C.
{
    const st = M.nyttForsok({ A: { typ: 'vatten', m: 0.05, T: -18, fas: 'fast' }, B: { typ: 'vatten', m: 0.3, T: 20 } });
    const vantat = (4180 * 0.3 * 20 - 0.05 * 2200 * 18 - 0.05 * 334000) / (4180 * 0.35);
    nara(st.ideal.T, vantat, 1e-9, 'isbiten smälter helt, sluttemperaturen');
    nara(st.ideal.smaltMassa, 0.05, 1e-12, 'hela isbiten smälter');
    kor(st);
    nara(M.temp(st.B), vantat, 0.05, 'isbiten: sluttemperaturen i simuleringen');
    const e = M.energier(st);
    sant(e.A.flyt > 0, 'smältvattnet värms');
}

// 7. Så mycket kall is att vattnet fryser.
{
    const st = M.nyttForsok({ A: { typ: 'vatten', m: 2.0, T: -20, fas: 'fast' }, B: { typ: 'vatten', m: 0.1, T: 10 } });
    sant(st.ideal.smaltMassa < 0, 'en del av vattnet fryser');
    kor(st);
    nara(M.temp(st.B), st.ideal.T, 0.05, 'fryser: sluttemperaturen i simuleringen');
}

// 8. Riktig kalorimeter: koppen och läckaget sänker sluttemperaturen, energin bevaras.
{
    const st = M.nyttForsok({ A: { typ: 'vatten', m: 0.5, T: 80 }, B: { typ: 'vatten', m: 0.3, T: 20 }, forlust: true });
    kor(st);
    const T = M.temp(st.B);
    sant(T < 57.5 - 0.5 && T > 57.5 - 4, `sluttemperaturen blir lite lägre (${T.toFixed(2)} °C)`);
    const e = M.energier(st);
    nara(summa(e), 0, 1e-6, 'energin bevaras med koppen och läckaget');
    sant(e.kopp > 0 && e.rum > 0, 'koppen och rummet tar emot energi');
    nara(e.kopp, M.KOPP_C * (T - 20), 1e-6, 'koppens energi C · ΔT');
}

// 9. Sidan bär en oförändrad kopia av motorn.
{
    const motor = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'kalorimeter-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
    const sida = path.join(__dirname, '..', 'fysik1-kalorimetri-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const m = html.match(/<script id="kalorimeter-motor">\n([\s\S]*?)\n<\/script>/);
        sant(!!m && m[1].trim() === motor, 'sidans kopia av motorn är identisk med källan');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} FEL` : '\nAlla tester gick igenom.');
process.exit(fel ? 1 : 0);

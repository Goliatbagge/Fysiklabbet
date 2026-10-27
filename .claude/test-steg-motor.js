// Fysiktester för motorn i simuleringen Stegverkstaden (fysik2-stegmetoden-app.html).
// Kör: node .claude/test-steg-motor.js
const fs = require('fs');
const path = require('path');
const M = require('./samarbete-sigbjorn/steg-motor.js');

let fel = 0;
const nara = (a, b, tol, txt) => {
    const ok = Math.abs(a - b) <= tol;
    console.log(`${ok ? 'OK ' : 'FEL'}  ${txt}: ${a.toFixed(4)} (väntat ${b.toFixed(4)})`);
    if (!ok) fel++;
};
const sant = (v, txt) => { console.log(`${v ? 'OK ' : 'FEL'}  ${txt}`); if (!v) fel++; };

// 1. Tabellen i fy2-1.9 (Exempel 1: 8,0 och 6,0 m/s, utan luftmotstånd).
const ex1 = (dt) => M.kast({ v0x: 8, v0y: 6, k: 0, m: 1, dt });
for (const [dt, steg, R, H] of [[0.2, 8, 11.36, 2.44], [0.1, 14, 10.57, 2.14], [0.05, 26, 10.17, 1.99], [0.01, 124, 9.86, 1.86], [0.001, 1223, 9.78, 1.84]]) {
    const k = ex1(dt);
    nara(k.kastvidd, R, 0.006, `Δt = ${dt} s: kastvidd`);
    nara(k.stighojd, H, 0.006, `Δt = ${dt} s: stighöjd`);
    sant(k.rader.length - 1 === steg, `Δt = ${dt} s: ${steg} steg (${k.rader.length - 1})`);
}
{
    const e = M.exakt(8, 6);
    nara(e.kastvidd, 9.78, 0.005, 'exakt kastvidd'); nara(e.stighojd, 1.83, 0.005, 'exakt stighöjd');
    // Exempel 1 a): läget efter 0,20 s med Δt = 0,10 s
    const r = ex1(0.1).rader[2];
    nara(r.x, 1.6, 1e-9, 'Exempel 1: x efter två steg'); nara(r.y, 1.1018, 1e-9, 'Exempel 1: y efter två steg');
    // felet halveras när tidssteget halveras
    const f1 = ex1(0.02).kastvidd - e.kastvidd, f2 = ex1(0.01).kastvidd - e.kastvidd;
    nara(f1 / f2, 2, 0.15, 'felet halveras när tidssteget halveras');
}
// 2. Exempel 2: tennisbollen med luftmotstånd, första steget.
{
    const [ax, ay] = M.acc(24, 18, 0.0012, 0.057, M.G);
    nara(ax, -0.0012 / 0.057 * 30 * 24, 1e-9, 'Exempel 2: ax i utslagsögonblicket');
    nara(ay, -9.82 - 0.0012 / 0.057 * 30 * 18, 1e-9, 'Exempel 2: ay i utslagsögonblicket');
    const r = M.kast({ v0x: 24, v0y: 18, k: 0.0012, m: 0.057, dt: 0.05 }).rader[1];
    nara(r.vx, 24 + ax * 0.05, 1e-9, 'Exempel 2: vx efter första steget');
    const med = M.referens({ v0x: 24, v0y: 18, k: 0.0012, m: 0.057 }), utan = M.exakt(24, 18);
    sant(med.kastvidd < utan.kastvidd && med.stighojd < utan.stighojd, 'luftmotståndet gör kastet kortare och lägre');
}
// 3. Bästa vinkeln för tennisbollen med 30 m/s är ungefär 39° (teorin).
{
    const b = M.bastaVinkel(30, 0.0012, 0.057);
    sant(Math.abs(b.vinkel - 39) <= 2, `bästa utkastvinkel med luftmotstånd: ${b.vinkel}°`);
    sant(M.bastaVinkel(30, 0, 1).vinkel === 45, 'utan luftmotstånd: 45°');
}
// 4. Fallet: gränshastigheten v = √(m g / k).
{
    const f = M.fall({ m: 0.005, k: 0.0011, dt: 0.001, H: 30 });
    nara(f.vGrans, Math.sqrt(0.005 * 9.82 / 0.0011), 1e-12, 'gränshastigheten');
    nara(f.rader[f.rader.length - 1].v, f.vGrans, 0.01, 'badmintonbollen når gränshastigheten under 30 m');
    const t = M.fall({ m: 0.057, k: 0.0012, dt: 0.001, H: 30 });
    sant(t.rader[t.rader.length - 1].t < f.rader[f.rader.length - 1].t, 'tennisbollen landar först');
    const ingen = M.fall({ m: 1, k: 1e-12, dt: 0.0001, H: 10 });
    nara(ingen.rader[ingen.rader.length - 1].t, Math.sqrt(2 * 10 / 9.82), 0.002, 'utan luftmotstånd: fritt fall');
}
// 5. Kalkylbladet: formlerna i svensk Excel-stil och värdena räknade som av Excel.
{
    sant(M.formel(1, 3) === '=B2+D2*$J$2', 'formeln för x');
    sant(M.formel(5, 3) === '=-$J$4/$J$5*ROT(D3^2+E3^2)*D3', 'formeln för ax med ROT');
    const p = { v0x: 8, v0y: 6, k: 0.0012, m: 0.057, dt: 0.1 };
    const text = M.tsv(p, 3);
    const rader = text.split('\n').map((r) => r.split('\t'));
    sant(rader[1][9] === '0,1' && rader[2][9] === '9,82' && rader[3][9] === '0,0012' && rader[4][9] === '0,057', 'konstanterna i J2–J5 med decimalkomma');
    sant(rader[1][3] === '8' && rader[2][1] === '=B2+D2*$J$2', 'startvärden och formler på rätt plats');
    // räkna bladet som Excel gör och jämför med motorn
    const celler = {}; const J = { 2: 0.1, 3: 9.82, 4: 0.0012, 5: 0.057 };
    const varde = (ref) => ref[0] === 'J' ? J[ref[1]] : celler[ref[0] + ref[1]];
    for (let r = 2; r <= 4; r++) for (let kol = 0; kol < 7; kol++) {
        let f = M.formel(kol, r, { vx: '8', vy: '6' });
        if (!f.startsWith('=')) { celler[M.KOLUMNER[kol] + r] = +f.replace(',', '.'); continue; }
        f = f.slice(1).replace(/ROT/g, 'Math.sqrt').replace(/\^2/g, '**2').replace(/\$?([A-J])\$?(\d+)/g, (_, c, n) => `(${varde([c, +n])})`);
        celler[M.KOLUMNER[kol] + r] = eval(f);
    }
    const m = M.kast(p).rader[2];
    nara(celler.B4, m.x, 1e-12, 'kalkylbladets x i rad 4 = motorns'); nara(celler.G4, m.ay, 1e-12, 'kalkylbladets ay i rad 4 = motorns');
}

// 6. Sidan ska ha en oförändrad kopia av motorn.
{
    const sida = path.join(__dirname, '..', 'fysik2-stegmetoden-app.html');
    if (fs.existsSync(sida)) {
        const html = fs.readFileSync(sida, 'utf8').replace(/\r\n/g, '\n');
        const kalla = fs.readFileSync(path.join(__dirname, 'samarbete-sigbjorn', 'steg-motor.js'), 'utf8').replace(/\r\n/g, '\n').trim();
        sant(html.includes(kalla), 'sidans motor är identisk med steg-motor.js');
    } else console.log('(sidan finns inte än)');
}

console.log(fel ? `\n${fel} test misslyckades` : '\nAlla tester gick igenom');
process.exit(fel ? 1 : 0);

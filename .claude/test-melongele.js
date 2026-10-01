// Provkörning av fysikkärnan i utkast/melongele-sim.js (ingen webbläsare).
// node .claude/test-melongele.js
// Kontrollerar: ytans normaler pekar utåt, kroppen vilar stabilt på bordet
// (ingen explosion, volymen bevaras), ett snitt ger två bitar med frön.
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
    const sim = await import(pathToFileURL(path.join(__dirname, '..', 'utkast', 'melongele-sim.js')).href);
    const { World, sdShape, SEEDS } = sim;
    let fel = 0;
    const t0 = Date.now();
    const w = new World();
    const p = w.pieces[0];
    console.log(`bygge: ${Date.now() - t0} ms · celler ${p.nc} · partiklar ${p.n} · kanter ${p.edgeL.length} · tetraedrar ${p.nt} · ytpunkter ${p.nv} · trianglar ${p.surfIdx.length / 3} · kollisionspunkter ${p.colIdx.length}`);
    console.log(`massa ${(p.materialVolume * 1050 * 1000).toFixed(0)} g (gittrets massa ${(p.totalMass * 1000).toFixed(0)} g)`);

    // normalernas riktning i viloläget: jämför med sdShape-gradienten
    {
        const r = p.surfRest, idx = p.surfIdx;
        let ut = 0, in_ = 0, maxd = 0;
        for (let q = 0; q < p.nv; q++) maxd = Math.max(maxd, Math.abs(sdShape(r[3 * q], r[3 * q + 1], r[3 * q + 2])));
        for (let t = 0; t < idx.length; t += 3) {
            const a = 3 * idx[t], b = 3 * idx[t + 1], c = 3 * idx[t + 2];
            const e1 = [r[b] - r[a], r[b + 1] - r[a + 1], r[b + 2] - r[a + 2]];
            const e2 = [r[c] - r[a], r[c + 1] - r[a + 1], r[c + 2] - r[a + 2]];
            const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
            const m = [(r[a] + r[b] + r[c]) / 3, (r[a + 1] + r[b + 1] + r[c + 1]) / 3, (r[a + 2] + r[b + 2] + r[c + 2]) / 3];
            const e = 1e-4;
            const g = [0, 1, 2].map(k => { const pp = m.slice(), pm = m.slice(); pp[k] += e; pm[k] -= e; return sdShape(...pp) - sdShape(...pm); });
            if (n[0] * g[0] + n[1] * g[1] + n[2] * g[2] > 0) ut++; else in_++;
        }
        console.log(`normaler utåt ${ut}, inåt ${in_} · största |d| på ytan ${(maxd * 1000).toFixed(3)} mm`);
        if (in_ > ut * 0.01) { console.log('FEL: ytans trianglar vänder fel'); fel++; }
        if (maxd > 0.0005) { console.log('FEL: ytpunkterna ligger inte på nivåytan'); fel++; }
    }

    // vila på bordet i 3 s
    const t1 = Date.now();
    for (let f = 0; f < 180; f++) w.step(1 / 60);
    const ms = (Date.now() - t1) / 180;
    p.updateSurface();
    let ymin = 1, ymax = -1;
    for (let q = 0; q < p.nv; q++) { ymin = Math.min(ymin, p.surfPos[3 * q + 1]); ymax = Math.max(ymax, p.surfPos[3 * q + 1]); }
    const st = w.stats();
    console.log(`steg: ${ms.toFixed(2)} ms/bildruta · y ${(ymin * 1000).toFixed(2)}..${(ymax * 1000).toFixed(2)} mm · volym ${(st.volume * 100).toFixed(2)} % · Ek ${(st.kinetic * 1000).toFixed(4)} mJ`);
    if (!(ymin > -0.002 && ymax < 0.06)) { console.log('FEL: kroppen ligger inte på bordet'); fel++; }
    if (Math.abs(st.volume - 1) > 0.03) { console.log('FEL: volymen bevaras inte'); fel++; }
    if (st.kinetic > 1e-4) { console.log('FEL: kroppen kommer inte till vila'); fel++; }

    // snitt tvärs över skivan (vågrätt plan x = 0,005 i världen, efter vridningen)
    const t2 = Date.now();
    const added = w.cut([1, 0, 0], 0.005, { ax: 0.005, az: -0.2, bx: 0.005, bz: 0.2 });
    console.log(`snitt: ${Date.now() - t2} ms · nya bitar ${added} · bitar ${w.pieces.length} · frön ${w.pieces.map(q => q.seeds.length).join('+')} av ${SEEDS.length}`);
    if (w.pieces.length !== 2) { console.log('FEL: snittet gav inte två bitar'); fel++; }
    for (let f = 0; f < 120; f++) w.step(1 / 60);
    const st2 = w.stats();
    console.log(`efter snitt: volym ${(st2.volume * 100).toFixed(2)} % · massa ${(st2.mass * 1000).toFixed(0)} g · Ek ${(st2.kinetic * 1000).toFixed(4)} mJ`);
    for (const q of w.pieces) { q.updateSurface(); let yl = 1; for (let k = 0; k < q.nv; k++) yl = Math.min(yl, q.surfPos[3 * k + 1]); if (yl < -0.003) { console.log('FEL: bit under bordet'); fel++; } }

    // andra snittet, på tvären
    w.cut([0, 0, 1], -0.01, { ax: -0.2, az: -0.01, bx: 0.2, bz: -0.01 });
    for (let f = 0; f < 60; f++) w.step(1 / 60);
    console.log(`andra snittet: bitar ${w.pieces.length} · volym ${(w.stats().volume * 100).toFixed(2)} %`);

    console.log(fel ? `${fel} fel` : 'OK');
    process.exit(fel ? 1 : 0);
})();

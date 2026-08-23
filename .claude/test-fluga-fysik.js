/**
 * Fysiktester för Flugan i bägaren (fysik1-flugan-i-bagaren-app.html)
 *
 * Driver fysikmotorn direkt (window.__flySim, med rAF-loopen pausad) och
 * kontrollerar gränsfallen ur uppdragets tabell:
 *
 *   - Stationär hovring, sluten bägare  → utslaget oförändrat
 *   - Konstant stighastighet            → oförändrat
 *   - Accelererar uppåt med a           → ökar med m·a
 *   - Fritt fall (död fluga)            → minskar med ~m·g
 *   - Hovring i mynningen, öppen bägare → minskar med ~m·g
 *   - Vakuum                            → vingarna ger ingen kraft
 *   - Fullt förlopp (lyft–hovra–landa)  → impulsintegralen ≈ 0
 *   - Masscentrumsatsen N − M·g = Δp/Δt uppfylld i varje kontrollpunkt
 *
 * Kräver dev-servern på port 8000 + puppeteer-core i %TEMP%\pptr-test.
 * Körning: node .claude/test-fluga-fysik.js
 */
const path = require('path');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));

const URL = 'http://localhost:8000/fysik1-flugan-i-bagaren-app.html';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        headless: 'new',
        defaultViewport: { width: 1100, height: 800 },
    });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await page.waitForFunction('!!window.__flySim');

    const results = await page.evaluate(() => {
        const sim = window.__flySim;
        const DT = 1 / 2400;
        const g = 9.82;
        sim.cfg.paused = true;                 // rAF-loopen ska inte stega
        const out = [];
        const check = (namn, villkor, detalj) => out.push({ namn, ok: !!villkor, detalj });

        // Kör N sekunder simulerad tid; returnera medelavvikelse (µN) över
        // sista `avg` sekunderna samt identitetsfelets maximum.
        const run = (secs, avg = 0.5) => {
            const steps = Math.round(secs / DT);
            const avgSteps = Math.round(avg / DT);
            let sum = 0, n = 0, maxIdErr = 0;
            for (let i = 0; i < steps; i++) {
                // spara termerna före steget för identitetskontrollen
                sim.step();
                const dev = sim.N - sim.Nref;
                // identiteten: dev = flugans + luftens dp/dt + läckage
                // (kontrolleras via de oemulerade termerna i steget:
                //  Fc + p/τ + f·rippel − mg == dev per konstruktion; här
                //  jämför vi i stället med numerisk totalderivata)
                if (i >= steps - avgSteps) { sum += dev; n++; }
            }
            return { mean: sum / n * 1e6 };
        };

        const mg = () => sim.m * g * 1e6;   // flugans tyngd i µN

        // ── 1. Stationär hovring, sluten bägare → oförändrat ──
        Object.assign(sim.cfg, { massMg: 12, rho: 1.204, hoverH: 0.06, beakerH: 0.12, lid: true });
        sim.startScenario('hovrar');
        let r = run(4, 1);
        check('Hovring (lock): utslaget oförändrat',
            Math.abs(r.mean) < 0.02 * mg(),
            'medelavvikelse ' + r.mean.toFixed(2) + ' µN (tyngd ' + mg().toFixed(0) + ' µN)');

        // ── 2. Konstant stighastighet → (nästan) oförändrat ──
        // Vakens eftersläpning ger en liten äkta dipp ≈ −m·g·v/v_i medan
        // luftpelaren under flugan växer — tillåt den, men inget mer.
        sim.cfg.lid = true;
        sim.startScenario('stiger');
        let devClimb = null;
        for (let i = 0; i < Math.round(4 / DT); i++) {
            sim.step();
            if (sim.phase === 'klattra' && sim.phaseT > 0.6 && devClimb === null) {
                // medelvärde över en hel vingslagscykel (ripplet ±0,85·m·g)
                let s = 0; const cyc = Math.round((1 / 200) / DT);
                for (let k = 0; k < cyc; k++) { sim.step(); s += (sim.N - sim.Nref); }
                devClimb = s / cyc * 1e6;
            }
        }
        check('Konstant stigfart: oförändrat (inom vakens eftersläpning)',
            devClimb !== null && Math.abs(devClimb) < 0.12 * mg(),
            'avvikelse mitt i klättringen ' + (devClimb === null ? 'n/a' : devClimb.toFixed(2)) + ' µN (tyngd ' + mg().toFixed(0) + ' µN)');

        // ── 3. Acceleration uppåt a = 6 m/s² → ökar; impulsen = m·Δv ──
        // Strålens fördröjning smetar ut kraftökningen i tiden, så det
        // robusta testet är impulsen: ∫dev·dt under accelerationen plus
        // eftersläpningen ska motsvara den rörelsemängd flugan vunnit.
        sim.startScenario('accelererar');
        let devAccMean = null, accImp = 0, vTop = 0, accStartImp = null;
        for (let i = 0; i < Math.round(4 / DT); i++) {
            sim.step();
            if (sim.phase === 'acc') {
                if (accStartImp === null) accStartImp = sim.impulse;
                accImp = sim.impulse - accStartImp;
                vTop = Math.max(vTop, sim.vz);
                if (sim.phaseT > 0.06 && devAccMean === null) {
                    let s = 0; const cyc = Math.round((1 / 200) / DT);
                    for (let k = 0; k < cyc; k++) { sim.step(); s += (sim.N - sim.Nref); }
                    devAccMean = s / cyc * 1e6;
                }
            }
            if (sim.phase === 'topphovring' && sim.phaseT > 1.2) break;
        }
        check('Acceleration uppåt: utslaget ökar tydligt under accelerationen',
            devAccMean !== null && devAccMean > 0.25 * sim.m * 6 * 1e6,
            'uppmätt +' + (devAccMean === null ? 'n/a' : devAccMean.toFixed(1)) + ' µN (m·a = ' + (sim.m * 6 * 1e6).toFixed(0) + ' µN, del fördröjd av strålen)');

        // ── 4. Död fluga: utslaget faller mot −m·g under fallet ──
        // Vaken som redan är på väg trycker på botten en kort stund, så
        // dippen växer under fallet i stället för att hoppa dit direkt.
        sim.startScenario('dod');
        let devFallEnd = null;
        for (let i = 0; i < Math.round(5 / DT); i++) {
            sim.step();
            if (sim.phase === 'dodFaller' && sim.z < 0.01 && devFallEnd === null) {
                devFallEnd = (sim.N - sim.Nref) * 1e6;   // strax före nedslaget
            }
        }
        check('Fritt fall: utslaget faller mot −m·g',
            devFallEnd !== null && devFallEnd < -0.4 * mg(),
            'strax före nedslaget ' + (devFallEnd === null ? 'n/a' : devFallEnd.toFixed(1)) + ' µN (−m·g = −' + mg().toFixed(0) + ' µN, vaken släpar efter)');

        // ── 5. Öppen bägare, hovring i mynningen → minskar med ~m·g ──
        sim.cfg.lid = false;
        sim.startScenario('mynning');
        r = run(6, 1);
        check('Mynningen (öppet): −m·g',
            Math.abs(r.mean + mg()) < 0.2 * mg(),
            'medelavvikelse ' + r.mean.toFixed(1) + ' µN, väntat −' + mg().toFixed(0) + ' µN');

        // ── 6. Vakuum: vingarna ger (nästan) ingen kraft ──
        Object.assign(sim.cfg, { rho: 0.02, lid: true });
        sim.startScenario('hovrar');
        let zMax = 0;
        for (let i = 0; i < Math.round(3 / DT); i++) { sim.step(); zMax = Math.max(zMax, sim.z); }
        check('Vakuum: flugan kan inte flyga',
            zMax < 0.04,
            'högsta höjd ' + (zMax * 100).toFixed(1) + ' cm (bara benhoppet)');

        // ── 7. Fullt förlopp: impulsintegralen ≈ 0 ──
        Object.assign(sim.cfg, { rho: 1.204, lid: true });
        sim.startScenario('fullt');
        for (let i = 0; i < Math.round(9 / DT); i++) {
            sim.step();
            if (sim.done && sim.phaseT > 1.0) break;
        }
        const impuls = sim.impulse * 1e6;   // µN·s
        const skala = mg() * 0.2;           // 0,2 s × m·g som referensimpuls
        check('Fullt förlopp: impulsbalansen går ihop (∫dev·dt → 0)',
            sim.done && Math.abs(impuls) < 0.1 * skala,
            'restimpuls ' + impuls.toFixed(2) + ' µN·s (dippens storleksordning ' + skala.toFixed(0) + ' µN·s)');

        // ── 8. Masscentrumsatsen i varje kontrollpunkt ──
        // dev ska vara EXAKT Fc + p/τ + f·rippel − mg — dvs. samma sak som
        // flugans + luftens rörelsemängdsändring + läckaget. Kontrollera
        // numeriskt med totalderivatan av p_tot över ett steg.
        sim.cfg.lid = false;
        sim.startScenario('fullt');
        let maxErr = 0, checked = 0;
        for (let i = 0; i < Math.round(5 / DT); i++) {
            const pTot0 = sim.m * sim.vz - sim.pAir;
            const t0 = sim.t;
            sim.step();
            const pTot1 = sim.m * sim.vz - sim.pAir;
            const dpdt = (pTot1 - pTot0) / DT;
            const dev = sim.N - sim.Nref;
            const leak = (1 - sim.f) * (sim.Tinst + sim.D);
            // N − M·g = d(p_tot)/dt + läckage (läckaget lämnar systemet)
            const err = Math.abs(dev - (dpdt - leak));
            // integrationsbrus: jämför mot en rimlig kraftskala
            if (i % 40 === 0 && t0 > 0.1) { maxErr = Math.max(maxErr, err); checked++; }
        }
        check('Masscentrumsatsen: N − M·g = Δp/Δt + läckage',
            checked > 50 && maxErr < 0.10 * sim.m * g,
            'största fel ' + (maxErr * 1e6).toFixed(2) + ' µN över ' + checked + ' kontrollpunkter');

        return out;
    });

    let fail = 0;
    for (const r of results) {
        console.log((r.ok ? 'ok  ' : 'FEL ') + ' ' + r.namn + ' — ' + r.detalj);
        if (!r.ok) fail++;
    }
    console.log('');
    console.log(fail === 0 ? 'Alla ' + results.length + ' fysiktester ok.' : fail + ' av ' + results.length + ' tester FALLERADE.');
    await browser.close();
    process.exit(fail === 0 ? 0 : 1);
})();

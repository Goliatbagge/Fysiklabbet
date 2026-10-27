// Motorn för Stegverkstaden (fysik2-stegmetoden-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-steg-motor.js kontrollerar fysiken och att kopian är identisk.
//
// Stegmetoden (Eulers stegmetod) som i fy2-1.9: värdena i början av ett steg
// används för ändringen under steget,
//     t(n+1) = t(n) + Δt
//     x(n+1) = x(n) + vx(n) · Δt         y(n+1) = y(n) + vy(n) · Δt
//     vx(n+1) = vx(n) + ax(n) · Δt       vy(n+1) = vy(n) + ay(n) · Δt
// Luftmotståndet F = k · v² är motriktat hastigheten, så
//     ax = −(k/m) · v · vx               ay = −g − (k/m) · v · vy.
// Landningen bestäms som i teorin: en rät linje mellan de två punkterna
// närmast marken. Stighöjden är den högsta y bland stegen.
(function () {
    const G = 9.82;

    function acc(vx, vy, k, m, g) {
        const v = Math.hypot(vx, vy), c = m > 0 ? k / m : 0;
        return [-c * v * vx, -g - c * v * vy];
    }

    // p = { v0x, v0y, k, m, dt, g }
    function kast(p) {
        const g = p.g == null ? G : p.g;
        let t = 0, x = 0, y = 0, vx = p.v0x, vy = p.v0y;
        const rader = [];
        for (let n = 0; n < 200000; n++) {
            const [ax, ay] = acc(vx, vy, p.k, p.m, g);
            rader.push({ n, t, x, y, vx, vy, ax, ay });
            if (n > 0 && y < 0) break;
            t += p.dt;
            const nx = x + vx * p.dt, ny = y + vy * p.dt;
            vx += ax * p.dt; vy += ay * p.dt;
            x = nx; y = ny;
        }
        const a = rader[rader.length - 2], b = rader[rader.length - 1];
        const f = a.y / (a.y - b.y);
        return {
            rader,
            kastvidd: a.x + f * (b.x - a.x),
            flygtid: a.t + f * (b.t - a.t),
            stighojd: rader.reduce((h, r) => Math.max(h, r.y), 0),
        };
    }
    // utan luftmotstånd, med formlerna för kaströrelse
    function exakt(v0x, v0y, g) {
        g = g == null ? G : g;
        const T = 2 * v0y / g;
        return { kastvidd: v0x * T, flygtid: T, stighojd: v0y * v0y / (2 * g) };
    }
    // med luftmotstånd: referens med mycket kort tidssteg
    const referens = (p) => kast(Object.assign({}, p, { dt: 1e-4 }));

    // Fall rakt ned med luftmotstånd, nedåt positivt: a = g − (k/m) · v².
    // p = { m, k, dt, H } — räknar tills föremålet fallit H.
    function fall(p) {
        const g = p.g == null ? G : p.g;
        let t = 0, s = 0, v = 0;
        const rader = [];
        for (let n = 0; n < 2000000; n++) {
            const a = g - (p.k / p.m) * v * v;
            rader.push({ n, t, s, v, a });
            if (s >= p.H) break;
            t += p.dt; s += v * p.dt; v += a * p.dt;
        }
        return { rader, vGrans: Math.sqrt(p.m * g / p.k) };
    }
    // läget vid tiden t ur stegen (rät linje mellan två steg)
    function vid(rader, t, falt) {
        if (t <= rader[0].t) return rader[0][falt];
        for (let i = 1; i < rader.length; i++) {
            if (rader[i].t >= t) {
                const a = rader[i - 1], b = rader[i], f = (t - a.t) / (b.t - a.t);
                return a[falt] + f * (b[falt] - a[falt]);
            }
        }
        return rader[rader.length - 1][falt];
    }

    // Bästa utkastvinkeln för en given fart (hela grader)
    function bastaVinkel(v0, k, m, dt) {
        let bast = 0, R = -1;
        for (let a = 10; a <= 80; a++) {
            const r = a * Math.PI / 180;
            const k1 = kast({ v0x: v0 * Math.cos(r), v0y: v0 * Math.sin(r), k, m, dt: dt || 0.002 }).kastvidd;
            if (k1 > R) { R = k1; bast = a; }
        }
        return { vinkel: bast, kastvidd: R };
    }

    // ── Kalkylbladet i svensk Excel-stil ──
    // Kolumnerna A–G: t, x, y, vx, vy, ax, ay. Konstanterna i J2–J5:
    // Δt, g, k, m. Rad 2 är startvärdena; varje rad hämtar från raden ovanför.
    const KOLUMNER = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const RUBRIKER = ['t (s)', 'x (m)', 'y (m)', 'vx (m/s)', 'vy (m/s)', 'ax (m/s²)', 'ay (m/s²)'];
    const KONST = [['Δt (s)', 'J2'], ['g (m/s²)', 'J3'], ['k (kg/m)', 'J4'], ['m (kg)', 'J5']];
    // formeln i cellen (kolumn 0–6, kalkylbladets rad r ≥ 2)
    function formel(kol, r, start) {
        const o = r - 1;      // raden ovanför
        if (r === 2) {
            if (kol <= 2) return '0';
            if (kol === 3) return start ? start.vx : '';
            if (kol === 4) return start ? start.vy : '';
        }
        switch (kol) {
            case 0: return `=A${o}+$J$2`;
            case 1: return `=B${o}+D${o}*$J$2`;
            case 2: return `=C${o}+E${o}*$J$2`;
            case 3: return `=D${o}+F${o}*$J$2`;
            case 4: return `=E${o}+G${o}*$J$2`;
            case 5: return `=-$J$4/$J$5*ROT(D${r}^2+E${r}^2)*D${r}`;
            case 6: return `=-$J$3-$J$4/$J$5*ROT(D${r}^2+E${r}^2)*E${r}`;
        }
        return '';
    }
    // vilka celler en formel hämtar från (för markeringen i bladet)
    function hamtar(kol, r) {
        const o = r - 1;
        if (r === 2 && kol <= 4) return [];
        switch (kol) {
            case 0: return [['A', o], ['J', 2]];
            case 1: return [['B', o], ['D', o], ['J', 2]];
            case 2: return [['C', o], ['E', o], ['J', 2]];
            case 3: return [['D', o], ['F', o], ['J', 2]];
            case 4: return [['E', o], ['G', o], ['J', 2]];
            case 5: return [['J', 4], ['J', 5], ['D', r], ['E', r]];
            case 6: return [['J', 3], ['J', 4], ['J', 5], ['D', r], ['E', r]];
        }
        return [];
    }
    const komma = (v) => String(+v.toFixed(6)).replace('.', ',');
    // Hela bladet som tabbseparerad text med formler, för att klistra in i Excel
    function tsv(p, antalRader) {
        const varden = [p.dt, p.g == null ? G : p.g, p.k, p.m];
        const rad = [RUBRIKER.concat(['', 'Konstant', 'Värde']).join('\t')];
        for (let r = 2; r <= Math.max(antalRader + 1, 5); r++) {
            const celler = r <= antalRader + 1
                ? KOLUMNER.map((_, kol) => formel(kol, r, { vx: komma(p.v0x), vy: komma(p.v0y) }))
                : KOLUMNER.map(() => '');
            const i = r - 2;
            rad.push(celler.concat(i < KONST.length ? ['', KONST[i][0], komma(varden[i])] : []).join('\t'));
        }
        return rad.join('\n');
    }

    const FOREMAL = {
        tennis:    { namn: 'Tennisboll', m: 0.057, k: 0.0012 },
        badminton: { namn: 'Badmintonboll', m: 0.005, k: 0.0011 },
        fotboll:   { namn: 'Fotboll', m: 0.43, k: 0.0057 },
        kula:      { namn: 'Stålkula', m: 0.11, k: 0.00021 },
    };

    const ut = { G, acc, kast, exakt, referens, fall, vid, bastaVinkel, KOLUMNER, RUBRIKER, KONST, formel, hamtar, tsv, komma, FOREMAL };
    if (typeof window !== 'undefined') window.StegMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

// Motorn för Tyngdpunktsjakten (fysik2-lodlinjen-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-tyngdpunkt-motor.js kontrollerar fysiken och att kopian är identisk.
//
// En platt, jämntjock skiva beskrivs som en polygon i centimeter (y nedåt,
// som på skärmen). Tyngdpunkten är polygonens areatyngdpunkt, och
// tröghetsmomentet kring en upphängningspunkt P följer av polygonens
// polära ytmoment: I / m = J_C / A + |C − P|².
//
// Skivan hänger i en spik och kan vrida sig fritt kring den. Vinkeln θ är
// skivans vridning (positiv medurs på skärmen). Tyngdkraften ger kraftmomentet
// M = m · g · r_x kring spiken, där r_x är tyngdpunktens vågräta avstånd från
// spiken (hävarmen l_G). Rörelsen är en fysisk pendel med lite dämpning
// (luftmotstånd och friktion i hålet), så skivan stannar med tyngdpunkten
// rakt under spiken.
(function () {
    const G = 982;            // cm/s²
    const DAMP = 1.9;          // dämpning (1/s)
    const MASSA_PER_CM2 = 0.06; // g/cm², papp

    function geom(pts) {
        let A = 0, cx = 0, cy = 0, ix = 0, iy = 0;
        for (let i = 0; i < pts.length; i++) {
            const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % pts.length];
            const c = x0 * y1 - x1 * y0;
            A += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c;
            ix += (y0 * y0 + y0 * y1 + y1 * y1) * c;
            iy += (x0 * x0 + x0 * x1 + x1 * x1) * c;
        }
        A /= 2; cx /= 6 * A; cy /= 6 * A;
        const J0 = (ix + iy) / 12;              // polärt ytmoment kring origo (med tecken som A)
        const JC = J0 / Math.sign(A) - Math.abs(A) * (cx * cx + cy * cy);
        return { A: Math.abs(A), cx, cy, JC };
    }
    function inuti(pts, x, y) {
        let inne = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            const [xi, yi] = pts[i], [xj, yj] = pts[j];
            if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inne = !inne;
        }
        return inne;
    }
    function kantAvstand(pts, x, y) {
        let d = Infinity;
        for (let i = 0; i < pts.length; i++) {
            const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % pts.length];
            const dx = x1 - x0, dy = y1 - y0, L2 = dx * dx + dy * dy;
            const t = L2 ? Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / L2)) : 0;
            d = Math.min(d, Math.hypot(x - x0 - t * dx, y - y0 - t * dy));
        }
        return d;
    }
    // Upphängningshål nära kanten i några riktningar: ytterpunkten i riktningen,
    // flyttad inåt tills hålet ligger minst 1,2 cm från kanten.
    function hal(pts, riktningar) {
        const g = geom(pts);
        const ut = [];
        for (const v of riktningar) {
            const a = v * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a);
            let best = pts[0], bv = -Infinity;
            for (const p of pts) { const s = p[0] * ux + p[1] * uy; if (s > bv) { bv = s; best = p; } }
            let x = best[0], y = best[1];
            const L = Math.hypot(g.cx - x, g.cy - y);
            let ok = false;
            for (let k = 0; k < 25; k++) {     // högst 5 cm in från kanten
                if (inuti(pts, x, y) && kantAvstand(pts, x, y) >= 1.2) { ok = true; break; }
                x += (g.cx - x) / L * 0.2; y += (g.cy - y) / L * 0.2;
            }
            if (ok && !ut.some((h) => Math.hypot(h[0] - x, h[1] - y) < 3)) ut.push([+x.toFixed(2), +y.toFixed(2)]);
        }
        return ut;
    }

    // ── Pendeln ──
    const rot = (x, y, t) => [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)];
    // tyngdpunktens läge relativt spiken när skivan är vriden θ
    function rel(form, P, theta) { return rot(form.g.cx - P[0], form.g.cy - P[1], theta); }
    function jamvikt(form, P) {
        const v = [form.g.cx - P[0], form.g.cy - P[1]];
        return Math.PI / 2 - Math.atan2(v[1], v[0]);
    }
    function steg(st, form, dt) {
        if (st.haller) return st;
        const P = form.hal[st.hal];
        const d2 = (form.g.cx - P[0]) ** 2 + (form.g.cy - P[1]) ** 2;
        const Im = form.g.JC / form.g.A + d2;       // I / m (cm²)
        const n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
        for (let i = 0; i < n; i++) {
            const r = rel(form, P, st.theta);
            st.omega += (G * r[0] / Im - DAMP * st.omega) * h;
            st.theta += st.omega * h;
        }
        st.t += dt;
        return st;
    }
    const iVila = (st, form) => {
        const r = rel(form, form.hal[st.hal], st.theta);
        return !st.haller && Math.abs(st.omega) < 0.01 && Math.abs(r[0]) < 0.05;
    };
    // lodlinjen genom spiken uttryckt i skivans koordinater (punkt + riktning)
    function lodlinje(form, st) {
        const P = form.hal[st.hal];
        const d = rot(0, 1, -st.theta);
        return { x: P[0], y: P[1], dx: d[0], dy: d[1] };
    }
    function skarning(a, b) {
        const det = a.dx * b.dy - a.dy * b.dx;
        if (Math.abs(det) < 1e-9) return null;
        const t = ((b.x - a.x) * b.dy - (b.y - a.y) * b.dx) / det;
        return [a.x + t * a.dx, a.y + t * a.dy];
    }

    // ── Formerna ──
    function hastsko() {
        const p = [], R = 14, r = 8, ben = 10;
        p.push([-R, ben]);
        for (let i = 0; i <= 24; i++) { const a = Math.PI - i * Math.PI / 24; p.push([R * Math.cos(a), -R * Math.sin(a)]); }
        p.push([R, ben], [r, ben]);
        for (let i = 0; i <= 24; i++) { const a = i * Math.PI / 24; p.push([r * Math.cos(a), -r * Math.sin(a)]); }
        p.push([-r, ben]);
        return p.map(([x, y]) => [+(x + R).toFixed(2), +(y + R).toFixed(2)]);
    }
    const SVERIGE = [[0.3,26.3],[0.4,26.63],[0.61,26.59],[0.8,25.63],[0.66,24.83],[0.97,24.12],[1.66,23.48],[1.78,22.58],[1.42,21.12],[1.93,20.98],[2.14,20.2],[1.24,19.23],[1.43,17.76],[1.2,16.95],[1.32,15.88],[1.05,15.1],[1.27,14.31],[2.03,13.24],[2.54,13.05],[3.47,13.2],[3.6,13],[3.62,12.02],[3.09,11.72],[4.11,9.82],[4.31,8.53],[4.19,7.64],[4.81,7.54],[5.36,7.18],[5.28,6.7],[6.49,5.21],[6.15,4.24],[6.71,3.7],[6.96,3],[7.62,2.45],[8.35,2.82],[8.68,2.2],[8.66,1.34],[8.84,1.27],[10.89,1.79],[11.22,1.47],[10.89,1.3],[11.36,0.5],[11.07,0.05],[11.7,0],[13.39,1.36],[14.45,1.75],[15.43,2.84],[15.19,4.15],[15.53,4.24],[15.43,5.01],[15.85,5.85],[15.5,6.72],[15.5,7.32],[16.06,8.5],[15.48,8.43],[14.76,8.68],[14.32,8.33],[14.06,8.52],[13.9,8.34],[13.71,9.05],[13.3,9.22],[13.25,9.5],[12.86,9.54],[12.91,9.93],[12.67,9.77],[12.87,10.29],[12.33,11.12],[12.81,12.02],[12.19,12.78],[11.87,13.59],[10.82,14.27],[10.58,14.65],[10.13,14.62],[9.74,15.25],[9.21,15.4],[8.85,15.88],[9.08,15.9],[9.03,16.15],[8.67,16.43],[8.31,16.21],[8.5,16.92],[8.02,17.32],[7.73,17.16],[7.76,17.62],[8.01,17.89],[7.69,18.86],[7.8,19.33],[7.47,19.22],[7.39,19.62],[7.53,21.92],[8.04,22.36],[8.41,22.21],[9.14,23.09],[9.12,23.36],[9.43,23.55],[9.68,24.21],[9.17,24.9],[8.41,25.44],[8.62,25.56],[9.15,25.35],[9.22,25.53],[8.97,25.63],[8.81,26.1],[7.2,27.3],[6.25,27.35],[6.97,27.49],[7.14,27.73],[6.79,27.88],[6.94,28.46],[6.68,29.51],[6.79,30.34],[6.58,30.96],[6.64,31.47],[5.99,33.7],[5.78,33.95],[5.53,33.8],[4.4,33.93],[4.46,34.19],[4.21,34.16],[3.79,34.72],[3.94,35.52],[3.74,35.87],[3.29,35.78],[2.68,36],[2.15,35.83],[2.25,34.94],[1.64,33.52],[2.04,33.59],[1.86,33.12],[2.12,33.09],[2.14,32.66],[1.57,31.9],[0.72,29.76],[0.68,29.1],[0.37,28.71],[0.35,28.13],[0.13,28.05],[0,26.42],[0.05,26.18]];
    const RAA = {
        skiva:   { namn: 'Oregelbunden skiva', pts: [[3, 4], [16, 0], [27, 5], [30, 15], [24, 26], [13, 29], [6, 23], [0, 13]], rikt: [-110, 10, 130, 210] },
        L:       { namn: 'L-formad skiva', pts: [[0, 0], [8, 0], [8, 22], [30, 22], [30, 30], [0, 30]], rikt: [-100, 10, 135, 200] },
        hastsko: { namn: 'Hästsko', pts: hastsko(), rikt: [-90, 30, 150] },
        sverige: { namn: 'Sverigekartan', pts: SVERIGE, rikt: [-95, 170, 85, -30] },
    };
    function form(pts, rikt) {
        const g = geom(pts);
        return { pts, g, hal: hal(pts, rikt || [-90, 30, 150, 210]), massa: g.A * MASSA_PER_CM2 };
    }
    const FORMER = {};
    for (const id in RAA) FORMER[id] = Object.assign(form(RAA[id].pts, RAA[id].rikt), { namn: RAA[id].namn });

    // Egen form: kontrollera att polygonen inte korsar sig själv och inte är för liten.
    function korsar(pts) {
        const n = pts.length;
        const kryss = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
            if (Math.abs(i - j) <= 1 || (i === 0 && j === n - 1)) continue;
            const a = pts[i], b = pts[(i + 1) % n], c = pts[j], d = pts[(j + 1) % n];
            if (kryss(a, b, c) * kryss(a, b, d) < 0 && kryss(c, d, a) * kryss(c, d, b) < 0) return true;
        }
        return false;
    }
    function egen(pts) {
        if (pts.length < 3) return { fel: 'Klicka ut minst tre hörn.' };
        if (korsar(pts)) return { fel: 'Kanterna korsar varandra. Börja om och klicka ut hörnen i ordning runt formen.' };
        const g = geom(pts);
        if (g.A < 40) return { fel: 'Formen är för liten. Gör den större.' };
        return Object.assign(form(pts, [-90, 30, 150, 210]), { namn: 'Egen form' });
    }

    const nytt = (form, hal, theta) => ({ hal: hal || 0, theta: theta == null ? jamvikt(form, form.hal[hal || 0]) : theta, omega: 0, haller: false, t: 0 });

    const ut = { G, MASSA_PER_CM2, geom, inuti, kantAvstand, hal, rot, rel, jamvikt, steg, iVila, lodlinje, skarning, FORMER, egen, korsar, nytt };
    if (typeof window !== 'undefined') window.TyngdpunktMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

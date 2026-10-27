// Gasmotorn för Gaskolven (fysik1-forsta-huvudsatsen-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-gas-motor.js kontrollerar fysiken och att kopian är identisk.
//
// En enatomig ideal gas i en cylinder med en kolv. Den inre energin är
// U = 3/2 · n · R · T = 3/2 · p · V. Energin ändras på två sätt:
//   Q  värme till gasen: från värmeplattan med effekten P, och mellan
//      cylindern och rummet (k · (T_rum − T)). Noll när cylindern är isolerad.
//   W  arbete på gasen från kolven
// och första huvudsatsen ΔU = Q + W gäller i varje tidssteg, eftersom U bara
// ändras genom de två termerna.
//
// Kolven kan vara
//   'last'  låst med en spärr: volymen står still, W = 0
//   'hand'  nedtryckt av en hand med en bestämd fart till ett mål, sedan hållen
//   'fri'   fri, med vikter: rör sig av tryckskillnaden och tyngden. Gasen
//           bromsar kolven (trycket mot kolvytan är p − DAMP · v / A), så att
//           svängningarna dör ut. W är arbetet som kolvytan utför på gasen; när
//           kolven har stannat är W = −p_yttre · ΔV.
//
// Slår kolven i ett ändläge sätts farten till noll; kolvens rörelseenergi
// försvinner då ur bokföringen, men det påverkar inte gasens ΔU = Q + W.
(function () {
    const R = 8.314;
    const G = 9.82;
    const P0 = 101300;               // lufttrycket ovanför kolven
    const A = 0.016;                 // kolvens area, m²
    const N_MOL = 0.1347;            // gasmängden, mol
    const M_KOLV = 2;                // kolvens egen massa, kg
    const L_MIN = 0.05, L_MAX = 0.40;
    const DAMP = 600;                // N · s/m
    const K_LACK = 0.15;             // W/K, värmeutbytet med rummet
    const T_RUM = 293.15;
    const CV = 1.5 * N_MOL * R;      // J/K, så att U = CV · T

    const tryck = (st) => (2 / 3) * st.U / (A * st.L);
    const pKolv = (st) => tryck(st) - (st.kolv === 'fri' ? DAMP * st.v / A : 0);
    const temp = (st) => st.U / CV;
    const volym = (st) => A * st.L;
    const pYttre = (cfg) => P0 + (M_KOLV + cfg.vikter) * G / A;

    // Ett tillstånd med längden L och temperaturen T.
    function nytt(L, T) {
        return { L, U: CV * T, v: 0, Q: 0, W: 0, t: 0, U0: CV * T, kolv: 'last', handMal: L, handFart: 0, pv: [[A * L, (2 / 3) * CV * T / (A * L)]] };
    }
    // Jämviktsläget för en fri kolv med vikterna i cfg vid temperaturen T.
    const jamviktL = (cfg, T) => N_MOL * R * T / (pYttre(cfg) * A);

    // Trycket mitt i ett delsteg (andra ordningens noggrannhet i arbetet p · dV).
    function pMitt(st, p, dx, dQ) {
        const Uh = st.U + 0.5 * (dQ - p * A * dx), Lh = st.L + 0.5 * dx;
        return (2 / 3) * Uh / (A * Lh);
    }

    function steg(st, cfg, dt) {
        const n = Math.max(1, Math.ceil(dt / 0.0005)), h = dt / n;
        for (let i = 0; i < n; i++) {
            const Pv = cfg.isolerad ? 0 : cfg.P + K_LACK * (T_RUM - st.U / CV);
            const p = (2 / 3) * st.U / (A * st.L);
            let dW = 0;
            if (st.kolv === 'last') {
                st.v = 0;
            } else if (st.kolv === 'hand') {
                const kvar = st.handMal - st.L;
                if (Math.abs(kvar) < 1e-9) st.v = 0;
                else {
                    st.v = Math.sign(kvar) * Math.min(st.handFart, Math.abs(kvar) / h);
                }
                dW = -pMitt(st, p, st.v * h, Pv * h) * A * st.v * h;
                st.L += st.v * h;
            } else {
                const M = M_KOLV + cfg.vikter;
                const F = (p - P0) * A - M * G - DAMP * st.v;
                st.v += F / M * h;                       // halvimplicit Euler
                let ny = st.L + st.v * h;
                if (ny < L_MIN || ny > L_MAX) { ny = Math.max(L_MIN, Math.min(L_MAX, ny)); st.v = 0; }
                const dx = ny - st.L;
                dW = -pMitt(st, p, dx, Pv * h + DAMP * st.v * st.v * h) * A * dx + DAMP * st.v * st.v * h;
                st.L = ny;
            }
            const dQ = Pv * h;
            st.U += dQ + dW;
            st.Q += dQ;
            st.W += dW;
            st.t += h;
        }
        // p–V-spåret, glest. Trycket är det mot kolvytan, så att ytan under
        // kurvan blir lika stor som arbetet.
        const sist = st.pv[st.pv.length - 1], V = A * st.L, p = pKolv(st);
        if (Math.abs(V - sist[0]) > 2e-6 || Math.abs(p - sist[1]) > 150) st.pv.push([V, p]);
        return st;
    }

    const ut = { R, G, P0, A, N_MOL, M_KOLV, L_MIN, L_MAX, CV, K_LACK, T_RUM, tryck, pKolv, temp, volym, pYttre, nytt, jamviktL, steg };
    if (typeof window !== 'undefined') window.GasMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

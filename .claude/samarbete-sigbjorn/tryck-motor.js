// Tryckmotorn för Tryckbänken (fysik1-vatsketryck-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-tryck-motor.js kontrollerar fysiken och att kopian är identisk.
//
// Tre delar:
//   1. Vätsketrycket p = ρ · g · h (och totalt tryck p0 + ρ · g · h).
//   2. Fyra kärl med olika form som kan kopplas ihop i botten. Med kranen
//      öppen strömmar vätskan från högre till lägre bottentryck tills
//      nivåerna är lika (kommunicerande kärl). Volymen bevaras exakt.
//   3. Hydraulpressen: trycket p = F1 / A1 fortplantas i hela vätskan, så
//      oljan trycker på den stora kolven med F2 = p · A2. Kolvarna är
//      masslösa och vätskan går inte att pressa ihop, så den lilla kolven
//      går ned s1 = s2 · A2 / A1 när den stora går upp s2.
(function () {
    const G = 9.82;
    const P0 = 101300;

    const VATSKOR = {
        vatten:   { namn: 'Vatten',     rho: 998 },
        salt:     { namn: 'Saltvatten', rho: 1028 },
        olja:     { namn: 'Matolja',    rho: 920 },
        glycerol: { namn: 'Glycerol',   rho: 1260 },
    };

    const tryck = (rho, h) => rho * G * h;

    // ── Kärlen ──────────────────────────────────────────────
    // Varje kärl har bredden wb vid botten och wt vid kanten (höjd H) och
    // djupet D in i bilden. Bredden ändras linjärt med höjden.
    const KARL_H = 0.40, KARL_D = 0.10;
    const KARL = [
        { namn: 'Brett',         wb: 0.12, wt: 0.12 },
        { namn: 'Smalt',         wb: 0.04, wt: 0.04 },
        { namn: 'Vidgas uppåt',  wb: 0.06, wt: 0.20 },
        { namn: 'Smalnar uppåt', wb: 0.20, wt: 0.05 },
    ];
    const bredd = (k, h) => k.wb + (k.wt - k.wb) * h / KARL_H;
    const volym = (k, h) => KARL_D * (k.wb * h + (k.wt - k.wb) * h * h / (2 * KARL_H));
    function niva(k, V) {
        // löser D · (wb · h + c · h²) = V med c = (wt − wb) / (2H)
        const c = (k.wt - k.wb) / (2 * KARL_H), b = k.wb, q = V / KARL_D;
        if (Math.abs(c) < 1e-12) return q / b;
        return (-b + Math.sqrt(b * b + 4 * c * q)) / (2 * c);
    }
    const VMAX = KARL.map((k) => volym(k, KARL_H));

    // Ett steg med kranen öppen. Röret har samma ledningsförmåga till varje
    // kärl, så trycket i rörets mitt blir medelvärdet av bottentrycken och
    // flödet in i kärl i är K · (p̄ − p_i). Summan av flödena är noll, så
    // volymen bevaras. K väljs så att utjämningen tar ett par sekunder.
    const K_ROR = 2.5e-6;          // m³/(s · Pa)
    function stegKarl(V, rho, dt) {
        const n = 30, h = dt / n;
        const flode = V.map(() => 0);
        for (let s = 0; s < n; s++) {
            const p = V.map((v, i) => tryck(rho, niva(KARL[i], v)));
            const medel = p.reduce((a, b) => a + b, 0) / p.length;
            for (let i = 0; i < V.length; i++) {
                const q = K_ROR * (medel - p[i]);
                V[i] = Math.max(0, V[i] + q * h);
                flode[i] = q;
            }
        }
        return flode;              // m³/s in i varje kärl (negativt = ut)
    }
    // Den gemensamma nivån när alla kärl är sammankopplade: den nivå där
    // summan av volymerna är lika med den totala volymen.
    function gemensamNiva(Vtot) {
        let lo = 0, hi = KARL_H;
        for (let i = 0; i < 60; i++) {
            const mid = (lo + hi) / 2;
            const V = KARL.reduce((s, k) => s + volym(k, mid), 0);
            if (V < Vtot) lo = mid; else hi = mid;
        }
        return (lo + hi) / 2;
    }

    // ── Hydraulpressen ──────────────────────────────────────
    // cfg = { F1, A1, A2, m, s1max }, alla i SI-enheter.
    function press(cfg) {
        const p = cfg.F1 / cfg.A1;
        const F2 = p * cfg.A2;
        const FG = cfg.m * G;
        return { p, F2, FG, F1behov: FG * cfg.A1 / cfg.A2, lyfter: F2 > FG + 1e-9 };
    }
    const nyPress = () => ({ t: 0, s2: 0, v2: 0, klar: false });
    // Lasten accelereras av F2 − F_G. Räcker kraften inte står lasten kvar
    // på sina stöd. Steget är exakt för konstant acceleration.
    function stegPress(st, cfg, dt) {
        if (st.klar) return st;
        const d = press(cfg);
        if (!d.lyfter && st.v2 <= 0) { st.t += dt; return st; }
        const a = (d.F2 - d.FG) / cfg.m;
        const s2max = cfg.s1max * cfg.A1 / cfg.A2;
        let tt = dt;
        const s2ny = st.s2 + st.v2 * dt + 0.5 * a * dt * dt;
        if (s2ny >= s2max) {
            // tiden till slaget är slut: s2max − s2 = v · τ + a · τ² / 2
            const ds = s2max - st.s2;
            tt = Math.abs(a) > 1e-12 ? (-st.v2 + Math.sqrt(st.v2 * st.v2 + 2 * a * ds)) / a : ds / st.v2;
            st.s2 = s2max; st.v2 = st.v2 + a * tt; st.klar = true;
        } else {
            st.s2 = s2ny; st.v2 = st.v2 + a * dt;
        }
        st.t += tt;
        return st;
    }
    const s1av = (st, cfg) => st.s2 * cfg.A2 / cfg.A1;

    const ut = { G, P0, VATSKOR, tryck, KARL, KARL_H, KARL_D, bredd, volym, niva, VMAX,
                 stegKarl, gemensamNiva, press, nyPress, stegPress, s1av };
    if (typeof window !== 'undefined') window.TryckMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

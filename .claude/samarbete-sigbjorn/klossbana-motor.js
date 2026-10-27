// Rörelsemotorn för simuleringen Förlust av mekanisk energi
// (fysik1-energiforluster-app.html). Källan bor här och klistras in i sidans
// <script id="klossbana-motor">; testet (test-klossbana-motor.js) läser den
// här filen direkt. Håll dem identiska.
//
// Banan är en låg U-bana: vänster ramp, plan sträcka, höger ramp. Klossen
// rör sig längs banan, och läget anges med båglängden u (m):
//   vänster ramp  u ∈ [−L1, 0]       höjd (−u)·sin α1
//   plan          u ∈ [0, Lp]        höjd 0
//   höger ramp    u ∈ [Lp, Lp + L2]  höjd (u − Lp)·sin α2
// Övergångarna ritas rundade; i motorn byter lutningen tvärt men farten
// följer med (stöten mot hörnet och den extra normalkraften i rundningen
// försummas, som i kursen).
//
// På varje del är accelerationen konstant: tyngdkraftens komposant längs
// banan och friktionen F_f = μ · F_N med F_N = m · g · cos α (samma μ för vila
// och glidning). Varje tidssteg integreras exakt och kortas vid delgränser
// och när farten byter tecken, så att energibokföringen
//   E_p + E_k + E_v = konstant
// stämmer på avrundningsfelet när.
//
// Läget 'dra': handen drar klossen uppför vänster ramp med jämn fart.
// Kraften är parallell med rampen, F = m · g · (sin α + μ · cos α), och
// arbetet W = F · s blir ΔE_p + E_v.
(function (root) {
    const G = 9.82;
    const DEG = Math.PI / 180;
    const DRA_FART = 0.4;          // m/s när handen drar uppför
    const STILL_TID = 0.8;         // s stillastående innan försöket avslutas
    const CELL = 0.02;             // m per cell i värmekartan

    // Banans mått ur inställningarna.
    function bana(cfg) {
        const L1 = cfg.H / Math.sin(cfg.a1 * DEG);
        const L2 = cfg.H / Math.sin(cfg.a2 * DEG);
        return { L1, L2, Lp: cfg.Lp, umin: -L1, umax: cfg.Lp + L2 };
    }
    // Del, lutning (rad, positiv = höjden ökar med u) och friktionstal vid u.
    // vid = -1: delen strax före u, +1: strax efter (för gränserna).
    function del(cfg, u, vid) {
        const b = bana(cfg);
        const e = 1e-12 * (vid || 0);
        const uu = u + e;
        if (uu < 0) return { namn: 'v', lut: -cfg.a1 * DEG, mu: cfg.muRamp, fran: b.umin, till: 0 };
        if (uu < b.Lp) return { namn: 'p', lut: 0, mu: cfg.muPlan, fran: 0, till: b.Lp };
        return { namn: 'h', lut: cfg.a2 * DEG, mu: cfg.muRamp, fran: b.Lp, till: b.umax };
    }
    function hojd(cfg, u) {
        const b = bana(cfg);
        if (u < 0) return -u * Math.sin(cfg.a1 * DEG);
        if (u <= b.Lp) return 0;
        return (u - b.Lp) * Math.sin(cfg.a2 * DEG);
    }
    // Läget u på vänster ramp där klossen har höjden h.
    const uFranHojd = (cfg, h) => -h / Math.sin(cfg.a1 * DEG);

    function nytt(cfg) {
        const b = bana(cfg);
        const u0 = cfg.lage === 'dra' ? 0 : uFranHojd(cfg, cfg.h);
        const nCell = Math.ceil((b.umax - b.umin) / CELL) + 1;
        return {
            u: u0, vel: 0, t: 0, sTot: 0, Ev: 0, W: 0,
            E0: cfg.m * G * hojd(cfg, u0),
            still: 0, klar: false, orsak: null, vandor: 0,
            vandHojder: [],                     // exakt höjd vid varje vändning (m)
            varme: new Float64Array(nCell),     // J per cell, för värmekameran
            prov: [[0, cfg.m * G * hojd(cfg, u0), 0, 0]],   // [sTot, Ep, Ek, Ev]
            dragProv: [[0, 0]],                             // [s, F] i läget dra
        };
    }

    // Krafter och acceleration (längs +u) i ett tillstånd.
    function krafter(st, cfg) {
        const m = cfg.m, FG = m * G;
        if (cfg.lage === 'dra') {
            const a = cfg.a1 * DEG;
            const FN = FG * Math.cos(a);
            const Ff = cfg.muRamp * FN;
            return { F: FG * Math.sin(a) + Ff, FN, Ff, Fpar: FG * Math.sin(a), a: 0, statisk: false, lut: -a, FG };
        }
        const riktning = st.vel !== 0 ? Math.sign(st.vel) : 0;
        let d = del(cfg, st.u, riktning || 1);
        // Står klossen exakt på en gräns, välj den del dit tyngden drar den.
        const FN = FG * Math.cos(d.lut);
        const Fpar = -FG * Math.sin(d.lut);          // tyngdens komposant längs +u
        const Ffmax = d.mu * FN;
        if (Math.abs(st.vel) <= 1e-12) {
            if (Math.abs(Fpar) <= Ffmax + 1e-12) return { FN, Ff: Math.abs(Fpar), Fpar, a: 0, statisk: true, lut: d.lut, FG };
            return { FN, Ff: Ffmax, Fpar, a: (Fpar - Math.sign(Fpar) * Ffmax) / m, statisk: false, lut: d.lut, FG };
        }
        return { FN, Ff: Ffmax, Fpar, a: (Fpar - Math.sign(st.vel) * Ffmax) / m, statisk: false, lut: d.lut, FG };
    }

    function laggVarme(st, cfg, u1, u2, effekt) {
        // effekt = värme per meter (J/m) längs sträckan u1 → u2
        const b = bana(cfg);
        let a = Math.min(u1, u2), c = Math.max(u1, u2);
        while (a < c - 1e-12) {
            const i = Math.floor((a - b.umin) / CELL + 1e-9);
            // Avrundningen får aldrig ge en cellgräns på eller före a (då står loopen still).
            const slut = Math.min(c, Math.max(b.umin + (i + 1) * CELL, a + 1e-9));
            if (i >= 0 && i < st.varme.length) st.varme[i] += effekt * (slut - a);
            a = slut;
        }
    }

    function steg(st, cfg, h) {
        if (st.klar) return st;
        const k = krafter(st, cfg);
        if (cfg.lage === 'dra') {
            const mal = uFranHojd(cfg, cfg.h);          // negativt
            let du = -DRA_FART * h;
            if (st.u + du <= mal) { du = mal - st.u; st.klar = true; st.orsak = 'mal'; }
            const s = Math.abs(du);
            st.W += k.F * s;
            st.Ev += k.Ff * s;
            laggVarme(st, cfg, st.u, st.u + du, k.Ff);
            st.u += du; st.sTot += s; st.t += h;
            st.prov.push([st.sTot, cfg.m * G * hojd(cfg, st.u), 0, st.Ev]);
            st.dragProv.push([st.sTot, k.F]);
            return st;
        }
        if (k.statisk) {
            st.still += h; st.t += h;
            if (st.still >= STILL_TID) { st.klar = true; st.orsak = 'stannade'; }
            return st;
        }
        st.still = 0;
        const v = st.vel, a = k.a;
        const riktning = v !== 0 ? Math.sign(v) : Math.sign(a);
        const d = del(cfg, st.u, riktning);
        let tau = h, vandning = false;
        if (v !== 0 && a !== 0 && Math.sign(a) !== Math.sign(v)) {
            const t0 = -v / a;
            if (t0 < tau) { tau = t0; vandning = true; }
        }
        let du = v * tau + 0.5 * a * tau * tau;
        // Delgräns inom steget?
        const grans = riktning > 0 ? d.till : d.fran;
        if ((riktning > 0 && st.u + du > grans) || (riktning < 0 && st.u + du < grans)) {
            const dd = grans - st.u;
            let t;
            if (Math.abs(a) < 1e-12) t = dd / v;
            else {
                const disk = Math.max(0, v * v + 2 * a * dd);
                t = (-v + riktning * Math.sqrt(disk)) / a;
            }
            tau = Math.max(0, Math.min(tau, t)); du = dd; vandning = false;
        }
        const nyVel = vandning ? 0 : v + a * tau;
        const Ff = d.mu * cfg.m * G * Math.cos(d.lut);
        st.Ev += Ff * Math.abs(du);
        laggVarme(st, cfg, st.u, st.u + du, Ff);
        st.u += du; st.vel = nyVel; st.t += tau; st.sTot += Math.abs(du);
        if (vandning) { st.vandor++; st.vandHojder.push(hojd(cfg, st.u)); }
        const b = bana(cfg);
        st.u = Math.max(b.umin, Math.min(b.umax, st.u));
        st.prov.push([st.sTot, cfg.m * G * hojd(cfg, st.u), 0.5 * cfg.m * nyVel * nyVel, st.Ev]);
        return st;
    }

    function kor(st, cfg, dt, h = 1 / 600) {
        let kvar = dt;
        while (kvar > 1e-12 && !st.klar) {
            const d = Math.min(h, kvar);
            steg(st, cfg, d);
            kvar -= d;
        }
        return st;
    }

    function energier(st, cfg) {
        const Ep = cfg.m * G * hojd(cfg, st.u);
        const Ek = cfg.lage === 'dra' ? 0 : 0.5 * cfg.m * st.vel * st.vel;
        const fel = cfg.lage === 'dra' ? st.W - (Ep - st.E0 + st.Ev) : st.E0 - (Ep + Ek + st.Ev);
        return { Ep, Ek, Ev: st.Ev, W: st.W, E0: st.E0, fel };
    }

    root.KlossbanaMotor = { G, DEG, DRA_FART, CELL, bana, del, hojd, uFranHojd, nytt, krafter, steg, kor, energier };
    if (typeof module !== 'undefined') module.exports = root.KlossbanaMotor;
})(typeof window !== 'undefined' ? window : globalThis);

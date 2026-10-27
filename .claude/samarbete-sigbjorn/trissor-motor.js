// Rörelsemotorn för simuleringen Sammansatta system (fysik1-trissor-app.html).
// Källan bor här och klistras in i sidans <script id="trissor-motor">; testet
// (test-trissor-motor.js) läser den här filen direkt. Håll dem identiska.
//
// Alla föremål sitter på samma snöre och rör sig lika långt, så systemet har
// en enda koordinat x (m). Positiv x betyder att snöret löper åt höger.
// Föremålen är:
//   { typ: 'hang', m, sida: +1 }  hänger och sjunker när x ökar
//   { typ: 'hang', m, sida: −1 }  hänger och stiger när x ökar
//   { typ: 'vagn', m }            klossen som glider på bordet med friktionstalet μ
// Trissornas massa och friktion försummas, så spännkraften är lika stor i
// hela snöret mellan två föremål.
//
// Hela systemet:  F_R = Σ sida · m · g − friktion,  a = F_R / m_tot
// En hängande vikt med sidan s:  F_S = m · (g − s · a)
// Friktionen är F_f = μ · m_vagn · g (samma μ för vila och glidning). Står
// systemet still håller friktionen emot precis så mycket som behövs.
(function (root) {
    const G = 9.82;

    function summor(cfg) {
        let driv = 0, mTot = 0, mVagn = 0;
        for (const k of cfg.kroppar) {
            mTot += k.m;
            if (k.typ === 'hang') driv += k.sida * k.m * G;
            else mVagn += k.m;
        }
        return { driv, mTot, Ffmax: cfg.mu * mVagn * G };
    }

    // Accelerationen och friktionen i ett tillstånd (v = farten längs x).
    function dynamik(cfg, v) {
        const { driv, mTot, Ffmax } = summor(cfg);
        if (Math.abs(v) <= 1e-12) {
            if (Math.abs(driv) <= Ffmax + 1e-12) return { a: 0, Ff: -driv, statisk: true, driv, mTot, Ffmax };
            const Ff = -Math.sign(driv) * Ffmax;
            return { a: (driv + Ff) / mTot, Ff, statisk: false, driv, mTot, Ffmax };
        }
        const Ff = -Math.sign(v) * Ffmax;
        return { a: (driv + Ff) / mTot, Ff, statisk: false, driv, mTot, Ffmax };
    }

    // Spännkraften i snöret vid varje hängande vikt (null för klossen på bordet).
    // Snörena på var sin sida om klossen har samma spännkraft som vikten i
    // respektive ände, eftersom trissorna är friktionsfria och masslösa.
    function spannkrafter(cfg, a) {
        return cfg.kroppar.map((k) => (k.typ === 'hang' ? k.m * (G - k.sida * a) : null));
    }

    function nytt(cfg) {
        return { x: 0, v: 0, t: 0, klar: false, orsak: null, still: 0, prov: [[0, 0, 0]] };
    }

    // Ett steg h med konstant acceleration, kortat vid gränsen |x| = s och när
    // farten byter tecken (friktionen stoppar systemet).
    function steg(st, cfg, h) {
        if (st.klar) return st;
        const d = dynamik(cfg, st.v);
        if (d.statisk) {
            st.still += h; st.t += h;
            if (st.still >= 0.8) { st.klar = true; st.orsak = 'still'; }
            return st;
        }
        st.still = 0;
        let tau = h, stopp = false, mal = false;
        const v = st.v, a = d.a;
        if (v !== 0 && Math.sign(a) !== Math.sign(v) && a !== 0) {
            const t0 = -v / a;
            if (t0 < tau) { tau = t0; stopp = true; }
        }
        let dx = v * tau + 0.5 * a * tau * tau;
        const riktning = v !== 0 ? Math.sign(v) : Math.sign(a);
        const grans = riktning * cfg.s;
        if (Math.abs(st.x + dx) >= cfg.s - 1e-12) {
            const dd = grans - st.x;
            let t;
            if (Math.abs(a) < 1e-12) t = dd / v;
            else t = (-v + riktning * Math.sqrt(Math.max(0, v * v + 2 * a * dd))) / a;
            tau = Math.max(0, Math.min(tau, t)); dx = dd; mal = true; stopp = false;
        }
        st.v = stopp ? 0 : v + a * tau;
        st.x += dx; st.t += tau;
        st.prov.push([st.t, st.x, st.v]);
        if (mal) { st.klar = true; st.orsak = 'mal'; }
        else if (stopp) { st.klar = true; st.orsak = 'stannade'; }
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

    root.TrissorMotor = { G, summor, dynamik, spannkrafter, nytt, steg, kor };
    if (typeof module !== 'undefined') module.exports = root.TrissorMotor;
})(typeof window !== 'undefined' ? window : globalThis);

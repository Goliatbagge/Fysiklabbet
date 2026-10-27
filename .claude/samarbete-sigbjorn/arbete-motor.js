// Rörelsemotorn för simuleringen Arbete (fysik1-arbete-app.html).
// Källan bor här och klistras in i sidans <script id="arbete-motor">; testet
// (test-arbete-motor.js) läser den här filen direkt. Håll dem identiska.
//
// En rörelse längs EN axel, med konstanta krafter inom varje tidssteg. Varje
// steg integreras exakt (dx = v·dt + a·dt²/2), så energibokföringen
//   W + Ek0 = Ek + Ep + Q
// stämmer på avrundningsfelet när, inte bara ungefär.
//
// Lägen:
//   'dra'  — föremål på vågrät bänk, kraften F i vinkeln v över vågrätt.
//            Fs = F·cos v längs rörelsen, F1 = F·sin v lyfter något, så
//            FN = m·g − F1 och friktionen Ff = μ·FN (samma μ för vila och
//            glidning, som i kursen). En stoppkloss bakom
//            föremålet hindrar det från att åka bakåt från start.
//   'lyft' — föremålet lyfts lodrätt, kraften F rakt uppåt. Vilar på bänken
//            så länge F ≤ m·g. Stannar det på väg upp håller handen kvar det.
//   'bar'  — handen bär föremålet med jämn fart åt sidan. Kraften är m·g
//            rakt uppåt, vinkelrät mot rörelsen, så Fs = 0 och W = 0.
(function (root) {
    const G = 9.82;
    const DEG = Math.PI / 180;
    const BAR_FART = 1.0;          // m/s när handen bär
    const FAST_TID = 1.0;          // s stillastående innan försöket avslutas

    function nytt(cfg) {
        const v0 = cfg.v0 || 0;
        return {
            x: 0, vel: v0, t: 0,
            W: 0, Q: 0, Ek0: 0.5 * cfg.m * v0 * v0,
            still: 0, rortSig: v0 > 0,
            klar: false, orsak: null,
            prov: [[0, krafter({ x: 0, vel: v0 }, cfg).Fs]],
        };
    }

    // Krafterna i ett givet tillstånd. Ff är friktionskraftens storlek,
    // statisk = föremålet står still (friktionen eller bänken håller emot).
    function krafter(st, cfg) {
        const m = cfg.m, FG = m * G;
        if (cfg.lage === 'bar') {
            return { Fs: 0, F1: FG, FN: 0, Ff: 0, a: 0, statisk: false, FG };
        }
        if (cfg.lage === 'lyft') {
            const F = cfg.F;
            const paBanken = st.x <= 1e-12 && st.vel <= 1e-12;
            if (paBanken && F <= FG) {
                return { Fs: F, F1: F, FN: FG - F, Ff: 0, a: 0, statisk: true, FG };
            }
            return { Fs: F, F1: F, FN: 0, Ff: 0, a: (F - FG) / m, statisk: false, FG };
        }
        // 'dra'
        const vr = cfg.v * DEG;
        const Fs = cfg.F * Math.cos(vr);
        const F1 = cfg.F * Math.sin(vr);
        const FN = Math.max(0, FG - F1);
        const Ffmax = cfg.mu * FN;
        if (Math.abs(st.vel) <= 1e-12) {
            // Stoppklossen bakom föremålet tar emot en kraft bakåt från start.
            if (Fs < 0 && st.x <= 1e-12) return { Fs, F1, FN, Ff: 0, a: 0, statisk: true, stopp: true, FG };
            if (Math.abs(Fs) <= Ffmax + 1e-12) return { Fs, F1, FN, Ff: Math.abs(Fs), a: 0, statisk: true, FG };
            const a = (Fs - Math.sign(Fs) * Ffmax) / m;
            return { Fs, F1, FN, Ff: Ffmax, a, statisk: false, FG };
        }
        const a = (Fs - Math.sign(st.vel) * Ffmax) / m;
        return { Fs, F1, FN, Ff: Ffmax, a, statisk: false, FG };
    }

    // Ett tidssteg h. Konstant acceleration inom steget; steget kortas om
    // farten byter tecken (friktionen stannar föremålet), om målet nås eller
    // om föremålet når stoppklossen.
    function steg(st, cfg, h) {
        if (st.klar) return st;
        const k = krafter(st, cfg);
        if (cfg.lage === 'bar') {
            let dx = BAR_FART * h;
            if (st.x + dx >= cfg.s) { dx = cfg.s - st.x; st.klar = true; st.orsak = 'mal'; }
            st.x += dx; st.t += h;
            st.prov.push([st.x, 0]);
            return st;
        }
        if (k.statisk) {
            st.still += h; st.t += h;
            if (st.still >= FAST_TID) {
                st.klar = true;
                st.orsak = st.rortSig ? 'stannade' : 'fast';
            }
            return st;
        }
        st.still = 0;
        const v = st.vel, a = k.a;
        let tau = h;
        let stopp = false, mal = false;
        // Farten byter tecken inom steget?
        if (v !== 0 && a !== 0 && Math.sign(a) !== Math.sign(v)) {
            const tStopp = -v / a;
            if (tStopp < tau) { tau = tStopp; stopp = true; }
        }
        let dx = v * tau + 0.5 * a * tau * tau;
        // Målet nås inom steget?
        if (st.x + dx >= cfg.s - 1e-12 && dx > 0) {
            const d = cfg.s - st.x;
            let t;
            if (Math.abs(a) < 1e-12) t = d / v;
            else {
                const disk = v * v + 2 * a * d;
                t = (-v + Math.sqrt(Math.max(0, disk))) / a;
            }
            tau = Math.max(0, Math.min(tau, t)); mal = true; stopp = false;
            dx = d;
        }
        // Stoppklossen (bakåt till start)?
        if (st.x + dx < 0) {
            const d = -st.x;
            let t;
            if (Math.abs(a) < 1e-12) t = d / v;
            else {
                const disk = v * v + 2 * a * d;
                t = (-v - Math.sqrt(Math.max(0, disk))) / a;
            }
            tau = Math.max(0, Math.min(tau, t)); dx = d;
            stopp = true;
        }
        const nyVel = stopp ? 0 : v + a * tau;
        st.W += k.Fs * dx;
        st.Q += k.Ff * Math.abs(dx);
        // När stoppklossen stoppar föremålet (bakåt till x = 0) tas den kvarvarande
        // rörelseenergin upp av stöten. Den räknas som värme.
        if (stopp && st.x + dx <= 1e-12 && dx < 0) {
            const kvar = 0.5 * cfg.m * (v + a * tau) ** 2;
            st.Q += kvar;
        }
        st.x += dx; st.vel = nyVel; st.t += tau;
        if (Math.abs(dx) > 0) st.rortSig = true;
        st.prov.push([st.x, k.Fs]);
        if (mal) { st.klar = true; st.orsak = 'mal'; }
        // Föremålet har stannat (friktionen, en bromsande kraft eller handen
        // som håller kvar vikten): försöket är slut.
        else if (stopp) { st.klar = true; st.orsak = 'stannade'; }
        return st;
    }

    // Kör så många småsteg som behövs för tiden dt.
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
        const Ek = 0.5 * cfg.m * st.vel * st.vel;
        const Ep = cfg.lage === 'lyft' ? cfg.m * G * st.x : 0;
        const Ek0 = cfg.lage === 'bar' ? 0 : st.Ek0;
        const EkVisa = cfg.lage === 'bar' ? 0 : Ek;
        return { Ek: EkVisa, Ep, Q: st.Q, W: st.W, Ek0,
                 fel: (st.W + Ek0) - (EkVisa + Ep + st.Q) };
    }

    root.ArbeteMotor = { G, DEG, BAR_FART, nytt, krafter, steg, kor, energier };
    if (typeof module !== 'undefined') module.exports = root.ArbeteMotor;
})(typeof window !== 'undefined' ? window : globalThis);

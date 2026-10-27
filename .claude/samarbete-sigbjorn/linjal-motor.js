// Motorn för Fingerbalansen (fysik2-linjalen-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-linjal-motor.js kontrollerar fysiken och att kopian är identisk.
//
// Ett avlångt föremål (linjal, kvast, basebollträ, biljardkö) med längden L
// och massan m ligger vågrätt på två pekfingrar, P till vänster och Q till
// höger. Föremålets egen tyngdpunkt ligger xG från vänstra änden, och en
// extra vikt med massan mV kan ligga xV från vänstra änden. Allt mäts i meter
// längs bänken (labbets x), och X är föremålets vänstra ände.
//
// Normalkrafterna följer av kraft- och momentjämvikt. Med lP och lQ som
// fingrarnas avstånd till tyngdpunkten ger momentlagen kring Q
//     F_P · (lP + lQ) = F_G · lQ,  alltså  F_P = F_G · lQ / (lP + lQ),
// och på samma sätt F_Q = F_G · lP / (lP + lQ).
//
// Friktionen: ett finger som glider mot föremålet ger glidfriktionen MU · F_N.
// Ett finger som sitter fast kan ge högst vilofriktionen MU_VILA · F_N, och
// MU_VILA är något större än MU (så som det är för hud mot trä). Föremålet
// rör sig långsamt och utan acceleration, så friktionen från det fasta
// fingret är lika stor som glidfriktionen från det andra. Det fasta fingret
// släpper när MU · F_N(glider) > MU_VILA · F_N(fast), och då byter fingrarna
// roll. Är normalkrafterna exakt lika avgör minsta ojämnhet vilket finger som
// glider först; här börjar Q glida (som när man gör försöket själv).
//
// Dras fingrarna isär glider hela tiden fingret längst bort från
// tyngdpunkten: dess normalkraft blir bara mindre, så det byter aldrig roll.
// När det har glidit av änden vilar föremålet på ett finger utanför
// tyngdpunkten och faller (rotation kring fingret, som en stav).
(function () {
    const G = 9.82;
    const MU = 0.3;          // glidfriktion, det tal eleven ser
    const MU_VILA = 0.5;     // vilofriktion, tydligt större (hud mot trä)
    const FINGER = 0.056;     // avståndet mellan fingrarnas mitt när de möts (fingrarnas tjocklek)

    function tp(c) {
        const M = c.m + c.mV;
        return { M, xT: (c.m * c.xG + c.mV * c.xV) / M };
    }
    // krafterna i det aktuella läget (N); l mäts från fingret till tyngdpunkten
    function krafter(c, st) {
        const t = tp(c), FG = t.M * G;
        const xT = st.X + t.xT;
        const lP = xT - st.pP, lQ = st.pQ - xT;
        const FP = FG * lQ / (lP + lQ), FQ = FG * lP / (lP + lQ);
        // friktionen: det glidande fingret ger MU · F_N, det fasta lika mycket åt andra hållet
        let fP = 0, fQ = 0;
        if (st.fas === 'dra') {
            if (st.fast === 'P') { fQ = MU * FQ; fP = fQ; }
            else if (st.fast === 'Q') { fP = MU * FP; fQ = fP; }
            else { fP = MU * FP; fQ = MU * FQ; }
        }
        return { FG, FP, FQ, lP, lQ, xT, fP, fQ };
    }

    function nytt(c, pP, pQ, X) {
        return { pP, pQ, X, fast: null, fas: 'vila', riktning: 1, t: 0, byten: 0, spar: [], vinkel: 0, omega: 0, pivot: null, sistSpar: -1 };
    }
    function vemFast(c, st) {
        const k = krafter(c, st);
        if (Math.abs(k.FP - k.FQ) < 1e-9 * k.FG) return 'P';
        return k.FP > k.FQ ? 'P' : 'Q';
    }
    // riktning 1: ihop, −1: isär
    function starta(c, st, riktning) {
        st.riktning = riktning; st.fas = 'dra';
        st.fast = vemFast(c, st);
        st.spar = [{ t: 0, pP: st.pP, pQ: st.pQ, X: st.X, xT: krafter(c, st).xT, fast: st.fast }];
        st.t = 0; st.byten = 0; st.sistSpar = 0;
    }

    function steg(st, c, dt, fart) {
        const n = Math.max(1, Math.ceil(dt / 0.001)), h = dt / n;
        for (let i = 0; i < n; i++) {
            if (st.fas === 'dra') {
                const d = st.riktning * fart * h;
                st.pP += d; st.pQ -= d;
                if (st.fast === 'P') st.X += d;
                else if (st.fast === 'Q') st.X -= d;
                const k = krafter(c, st);
                const fore = st.fast;
                if (st.fast === 'P' && MU * k.FQ > MU_VILA * k.FP) st.fast = 'Q';
                else if (st.fast === 'Q' && MU * k.FP > MU_VILA * k.FQ) st.fast = 'P';
                else if (st.fast === 'båda' && Math.abs(k.FP - k.FQ) > 1e-6 * k.FG) st.fast = k.FP > k.FQ ? 'P' : 'Q';
                if (fore !== st.fast && fore !== 'båda') st.byten++;
                st.t += h;
                if (st.t - st.sistSpar >= 0.02) { st.spar.push({ t: st.t, pP: st.pP, pQ: st.pQ, X: st.X, xT: k.xT, fast: st.fast }); st.sistSpar = st.t; }
                if (st.riktning > 0 && st.pQ - st.pP <= FINGER) {
                    st.fas = 'mott'; st.spar.push({ t: st.t, pP: st.pP, pQ: st.pQ, X: st.X, xT: k.xT, fast: st.fast });
                } else if (st.riktning < 0) {
                    // ett finger har glidit av änden: föremålet vilar på det andra och faller
                    const avP = st.pP < st.X, avQ = st.pQ > st.X + c.L;
                    if (avP || avQ) {
                        st.fas = 'faller'; st.pivot = avP ? st.pQ : st.pP; st.vinkel = 0; st.omega = 0;
                        st.spar.push({ t: st.t, pP: st.pP, pQ: st.pQ, X: st.X, xT: k.xT, fast: st.fast });
                    }
                }
            } else if (st.fas === 'faller') {
                // stav som roterar kring fingret; positiv vinkel: tyngdpunktens sida går nedåt
                const t = tp(c), xT = st.X + t.xT, d = Math.abs(xT - st.pivot);
                // stav kring fingret, vikten som en punktmassa
                const xP = st.pivot - st.X;
                const I = c.m * c.L * c.L / 12 + c.m * (c.xG - xP) ** 2 + c.mV * (c.xV - xP) ** 2;
                st.omega += t.M * G * d * Math.cos(st.vinkel) / I * h;
                st.vinkel += st.omega * h;
                if (st.vinkel >= 0.9) { st.vinkel = 0.9; st.fas = 'fallen'; }
            }
        }
        return st;
    }

    // De färdiga föremålen. xG från vänstra änden; det tunga ligger till höger.
    const FOREMAL = {
        linjal: { namn: 'Linjal', L: 1.00, m: 0.15, xG: 0.50 },
        kvast:  { namn: 'Kvast', L: 1.30, m: 0.60, xG: 0.85 },
        bat:    { namn: 'Basebollträ', L: 0.84, m: 0.90, xG: 0.56 },
        ko:     { namn: 'Biljardkö', L: 1.45, m: 0.55, xG: 1.00 },
    };

    const ut = { G, MU, MU_VILA, FINGER, FOREMAL, tp, krafter, nytt, starta, steg };
    if (typeof window !== 'undefined') window.LinjalMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

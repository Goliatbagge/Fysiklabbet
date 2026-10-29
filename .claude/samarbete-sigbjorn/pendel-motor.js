// Motorn för Hypotesprovet (fysik1-hypotesprovet-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-pendel-motor.js kontrollerar fysiken och att kopian är identisk.
//
// En matematisk pendel: en kula i ett lätt snöre med längden l, släppt från
// vinkeln α₀. Rörelsen räknas med hela ekvationen α'' = −(g/l) · sin α
// (inte småvinkelapproximationen), så att ett stort utslag ger en lite
// längre svängningstid, som i verkligheten. Den exakta perioden är
//     T = 2π · √(l/g) / AGM(1, cos(α₀/2))
// (aritmetisk-geometriskt medelvärde). Massan finns inte med: kulans massa
// påverkar inte svängningstiden.
//
// Mätningen: eleven tar tiden för tio svängningar med ett stoppur. Starten
// och stoppet har var sin reaktionstid, så att en upprepad mätning ger lite
// olika värden.
(function () {
    const G = 9.82;
    const REAKTION = 0.07;       // s, spridningen i reaktionstiden vid start och stopp
    const N_SV = 10;             // antalet svängningar som tas tid på

    function agm(a, b) {
        for (let i = 0; i < 40 && Math.abs(a - b) > 1e-15; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
        return a;
    }
    const period = (l, a0) => 2 * Math.PI * Math.sqrt(l / G) / agm(1, Math.cos(a0 / 2));
    const periodLiten = (l) => 2 * Math.PI * Math.sqrt(l / G);

    // Ett tillstånd: vinkel a (rad), vinkelhastighet w (rad/s), tid t.
    function nyPendel(l, a0) { return { l, a0, a: a0, w: 0, t: 0 }; }
    function steg(p, dt) {
        const n = Math.max(1, Math.ceil(dt / 0.002));
        const h = dt / n, k = G / p.l;
        for (let i = 0; i < n; i++) {
            const f = (a) => -k * Math.sin(a);
            const a1 = p.w, b1 = f(p.a);
            const a2 = p.w + h / 2 * b1, b2 = f(p.a + h / 2 * a1);
            const a3 = p.w + h / 2 * b2, b3 = f(p.a + h / 2 * a2);
            const a4 = p.w + h * b3, b4 = f(p.a + h * a3);
            p.a += h / 6 * (a1 + 2 * a2 + 2 * a3 + a4);
            p.w += h / 6 * (b1 + 2 * b2 + 2 * b3 + b4);
            p.t += h;
        }
        return p;
    }

    // Slumptal med normalfördelning (Box–Muller); rng ger tal i [0, 1).
    function normal(rng) {
        const u = Math.max(1e-12, rng()), v = rng();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    // Uppmätt tid för tio svängningar, avrundad till hundradelar som på ett stoppur.
    // En felmätning är att eleven räknat nio eller elva svängningar: tiden
    // blir då en hel period fel, inte bara några tiondelar som osäkerheten.
    function matning(l, a0, rng = Math.random, felmatning = 0) {
        const t = (N_SV + felmatning) * period(l, a0) + REAKTION * (normal(rng) - normal(rng));
        return Math.round(t * 100) / 100;
    }
    // En mätning som avviker mer än en halv period från medianen i samma
    // uppställning är troligen en felmätning (fel antal svängningar). Med två
    // mätningar går det inte att veta vilken som är fel, så båda pekas ut.
    function misstankt(rader) {
        const ut = [];
        rader.forEach((r, i) => {
            if (r.struken) return;
            const alla = rader.filter((q) => !q.struken && q.m === r.m && q.l === r.l && q.a0 === r.a0).map((q) => q.t10).sort((x, y) => x - y);
            if (alla.length < 2) return;
            // medianen påverkas inte av en enstaka felmätning
            const n = alla.length, med = n % 2 ? alla[(n - 1) / 2] : (alla[n / 2 - 1] + alla[n / 2]) / 2;
            if (Math.abs(r.t10 - med) > 0.5 * period(r.l, r.a0 * Math.PI / 180)) ut.push(i);
        });
        return ut;
    }

    // ── Är försöket rättvist, och stöds hypotesen? ─────────────
    // En mätrad: { m, l, a0 (grader), t10 }. Hypotesen gäller en variabel
    // ('m', 'l' eller 'a0'). Ett rättvist försök jämför rader där bara den
    // variabeln skiljer sig.
    const VAR = ['m', 'l', 'a0'];
    const lika = (x, y) => Math.abs(x - y) < 1e-9;
    function grupper(rader) {
        // samma uppställning, alla tre variablerna lika; strukna mätningar räknas inte
        const g = [];
        for (const r of rader) {
            if (r.struken) continue;
            let h = g.find((x) => VAR.every((v) => lika(x.p[v], r[v])));
            if (!h) { h = { p: { m: r.m, l: r.l, a0: r.a0 }, t: [] }; g.push(h); }
            h.t.push(r.t10);
        }
        for (const h of g) {
            const n = h.t.length;
            h.medel = h.t.reduce((s, x) => s + x, 0) / n;
            h.spridning = n > 1 ? Math.max(...h.t) - Math.min(...h.t) : null;
        }
        return g;
    }
    function bedom(rader, variabel) {
        const g = grupper(rader);
        const ovr = VAR.filter((v) => v !== variabel);
        // par av grupper som bara skiljer sig i den prövade variabeln
        let bast = null;
        for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) {
            const a = g[i], b = g[j];
            if (!ovr.every((v) => lika(a.p[v], b.p[v])) || lika(a.p[variabel], b.p[variabel])) continue;
            const spann = Math.abs(a.p[variabel] - b.p[variabel]) / Math.max(a.p[variabel], b.p[variabel]);
            if (!bast || spann > bast.spann) bast = { a, b, spann };
        }
        // ändrades två saker på en gång någonstans?
        let tvaPaEnGang = false;
        for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) {
            const andrade = VAR.filter((v) => !lika(g[i].p[v], g[j].p[v]));
            if (andrade.length >= 2 && andrade.includes(variabel)) tvaPaEnGang = true;
        }
        if (!bast) return { rattvist: false, tvaPaEnGang };
        let { a, b } = bast;
        if (a.p[variabel] > b.p[variabel]) [a, b] = [b, a];       // a har det mindre värdet
        const skillnad = b.medel - a.medel;
        // osäkerheten i skillnaden mellan två medelvärden
        const sigma = REAKTION * Math.sqrt(2) * Math.sqrt(1 / a.t.length + 1 / b.t.length);
        const tydlig = Math.abs(skillnad) > 3 * sigma;
        return { rattvist: true, tvaPaEnGang, liten: a, stor: b, skillnad, sigma, tydlig, okar: tydlig && skillnad > 0, minskar: tydlig && skillnad < 0 };
    }

    const ut = { G, REAKTION, N_SV, agm, period, periodLiten, nyPendel, steg, normal, matning, misstankt, grupper, bedom };
    if (typeof window !== 'undefined') window.PendelMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

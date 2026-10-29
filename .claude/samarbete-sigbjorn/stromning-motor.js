// Motorn för Strömning i rör (fysik1-stromning-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-stromning-motor.js kontrollerar fysiken och att kopian är identisk.
//
// Två delar:
// 1. Ett rör med en förträngning och en höjdändring, med en ideal vätska
//    (ingen viskositet). Kontinuitetsekvationen A · v = Q ger farten, och
//    Bernoullis ekvation p + ρ · v²/2 + ρ · g · h = konstant ger trycket.
//    Rörets mittlinje ligger på höjden h(x) och dess diameter är d(x).
// 2. Ett rakt rör med en verklig vätska. Reynolds tal Re = ρ · v · d / η
//    avgör om strömningen är laminär eller turbulent. Tryckfallet per
//    meter räknas med Hagen–Poiseuille (laminärt) eller Blasius (turbulent),
//    och hastighetsprofilen är en parabel respektive en sjundedelspotens.
(function () {
    const G = 9.82;
    const RHO_V = 998;               // kg/m³, vatten
    const P_ATM = 101300;            // Pa
    const RE_LAM = 2300, RE_TURB = 4000;

    const VATSKOR = {
        vatten:  { namn: 'Vatten',   rho: 998,  eta: 1.0e-3 },
        mjolk:   { namn: 'Mjölk',    rho: 1030, eta: 2.0e-3 },
        olja:    { namn: 'Matolja',  rho: 920,  eta: 0.065 },
        glycerol:{ namn: 'Glycerol', rho: 1260, eta: 1.41 },
    };

    // ── Del 1: röret med förträngning ──────────────────────────
    // geom: { L (m), d1, d2 (m), h (m) }. Förträngningen ligger mitt på
    // röret och höjdändringen i sista tredjedelen; övergångarna är mjuka.
    const mjuk = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : 0.5 - 0.5 * Math.cos(Math.PI * u));
    function diameter(g, x) {
        const u = x / g.L;
        // in i förträngningen mellan 0,28 och 0,40, ut mellan 0,50 och 0,62
        const k = mjuk((u - 0.28) / 0.12) * (1 - mjuk((u - 0.50) / 0.12));
        return g.d1 + (g.d2 - g.d1) * k;
    }
    function hojd(g, x) { return g.h * mjuk((x / g.L - 0.70) / 0.12); }
    const area = (d) => Math.PI * d * d / 4;
    // farten och trycket i en punkt; p1 är trycket (absolut) vid inloppet
    function punkt(g, Q, p1, x) {
        const d = diameter(g, x), v = Q / area(d), h = hojd(g, x);
        const v1 = Q / area(g.d1);
        const p = p1 + RHO_V * (v1 * v1 - v * v) / 2 + RHO_V * G * (0 - h);
        return { x, d, A: area(d), v, h, p, dyn: RHO_V * v * v / 2, lage: RHO_V * G * h };
    }
    // mätpunkterna A (inloppet), B (förträngningen) och C (efter höjdändringen)
    const PUNKTER = { A: 0.12, B: 0.45, C: 0.90 };

    // ── Del 2: Reynolds tal, tryckfall och hastighetsprofil ────
    const reynolds = (rho, v, d, eta) => rho * v * d / eta;
    function regim(Re) {
        if (Re < RE_LAM) return 'laminar';
        if (Re < RE_TURB) return 'overgang';
        return 'turbulent';
    }
    // hur turbulent, 0 till 1 (för bilden)
    const turbulens = (Re) => Math.max(0, Math.min(1, (Re - RE_LAM) / (RE_TURB - RE_LAM)));
    // Darcy friktionsfaktor och tryckfall per meter
    function friktion(Re) {
        const fl = 64 / Math.max(Re, 1e-9);
        const ft = 0.316 * Math.pow(Math.max(Re, 1), -0.25);
        const s = turbulens(Re);
        return fl * (1 - s) + ft * s;
    }
    const tryckfall = (rho, v, d, eta) => friktion(reynolds(rho, v, d, eta)) * rho * v * v / (2 * d);
    // hastighet på avståndet r från mitten, relativt medelfarten (r/R från 0 till 1)
    function profil(rr, Re) {
        const lam = 2 * (1 - rr * rr);
        const turb = (60 / 49) * Math.pow(Math.max(0, 1 - rr), 1 / 7);
        const s = turbulens(Re);
        return lam * (1 - s) + turb * s;
    }

    const ut = { G, RHO_V, P_ATM, RE_LAM, RE_TURB, VATSKOR, mjuk, diameter, hojd, area, punkt, PUNKTER,
                 reynolds, regim, turbulens, friktion, tryckfall, profil };
    if (typeof window !== 'undefined') window.StromningMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

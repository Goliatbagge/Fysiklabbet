// Modellen för simuleringen Effekt och verkningsgrad
// (fysik1-effekt-verkningsgrad-app.html). Källan bor här och klistras in i
// sidans <script id="effekt-motor">; testet (test-effekt-motor.js) läser den
// här filen direkt. Håll dem identiska.
//
// Läget 'lyft': en motor (eller Emilia i trappan) lyfter massan m till
// höjden h med jämn fart. Den tillförda effekten P_t är konstant, och den
// nyttiga effekten är P_n = η · P_t, som allt går till lägesenergi:
//   v = P_n / (m · g),  Δt = m · g · h / P_n
//   E_t = P_t · t,  E_n = m · g · y = P_n · t,  värme = E_t − E_n
// Igångsättningen och inbromsningen försummas (rörelseenergin är liten).
//
// Läget 'apparater': två apparater med effekten P och verkningsgraden η är
// påslagna 'paPerDygn' timmar i början av varje dygn (saknas den är
// apparaten på hela tiden). Energin räknas i timmar och Wh.
(function (root) {
    const G = 9.82;
    const KWH = 3.6e6;              // J per kWh

    // ── Lyft ──
    function lyftData(cfg) {
        const Pn = cfg.eta * cfg.Pt;
        const v = Pn / (cfg.m * G);
        const T = (cfg.m * G * cfg.h) / Pn;
        return { Pn, v, T, Pf: cfg.Pt - Pn, En: cfg.m * G * cfg.h, Et: cfg.Pt * T };
    }
    function lyftVid(cfg, t) {
        const d = lyftData(cfg);
        const tt = Math.max(0, Math.min(t, d.T));
        const Et = cfg.Pt * tt;
        const En = d.Pn * tt;
        return { t: tt, y: d.v * tt, Et, En, Q: Et - En, klar: t >= d.T, T: d.T };
    }

    // ── Apparater ──
    // t i timmar. Returnerar energi i Wh och effekt i W just nu.
    function apparatVid(app, t) {
        const tt = Math.max(0, t);
        let pa, paNu;
        if (app.paPerDygn == null || app.paPerDygn >= 24) { pa = tt; paNu = true; }
        else {
            const dygn = Math.floor(tt / 24), rest = tt - 24 * dygn;
            pa = dygn * app.paPerDygn + Math.min(rest, app.paPerDygn);
            paNu = rest < app.paPerDygn;
        }
        const Et = app.P * pa;
        return { Et, En: app.eta * Et, Q: (1 - app.eta) * Et, paNu };
    }
    const kostnad = (Wh, pris) => (Wh / 1000) * pris;

    // ── Brickor ──
    // "Snygga" brickvärden: … 0,1, 0,2, 0,5, 1, 2, 5, 10, 20, 50 …
    const SNYGGA = [];
    for (let e = -3; e < 12; e++) for (const s of [1, 2, 5]) SNYGGA.push(s * Math.pow(10, e));
    // Minsta snygga brickvärde som ger högst 'maxPerS' brickor per sekund
    // (aldrig under 'minsta', som är 1 om inget annat anges).
    function brickVarde(effekt, maxPerS = 18, minsta = 1) {
        const mal = effekt / maxPerS;
        return SNYGGA.find((v) => v >= minsta && v >= mal) || SNYGGA[SNYGGA.length - 1];
    }
    // Största snygga värde som högst är x (för att få tillräckligt många brickor).
    const snyggtNedat = (x) => [...SNYGGA].reverse().find((v) => v <= x) || SNYGGA[0];
    // Delar upp brickorna i nyttiga och förlorade så att andelen nyttiga följer
    // η så jämnt som möjligt: bricka nummer k är nyttig om round(k · η) ökar.
    // Av N brickor blir då round(N · η) nyttiga, och redan den första brickan
    // är nyttig när η ≥ 0,5.
    const arNyttig = (k, eta) => Math.round((k + 1) * eta + 1e-9) > Math.round(k * eta + 1e-9);

    root.EffektMotor = { G, KWH, lyftData, lyftVid, apparatVid, kostnad, brickVarde, snyggtNedat, arNyttig };
    if (typeof module !== 'undefined') module.exports = root.EffektMotor;
})(typeof window !== 'undefined' ? window : globalThis);

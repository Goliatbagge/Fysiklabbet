// Motorn för Värmeflödet (fysik1-andra-huvudsatsen-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-varme-motor.js kontrollerar fysiken och att kopian är identisk.
//
// Läge 1: två block som utbyter energi. Varje block är en Einsteinkristall
// med N svängande partiklar (N proportionellt mot massan) och q energikvanta,
// "brickor". Antalet sätt att fördela q brickor på N partiklar är
//     Ω(N, q) = (q + N − 1)! / (q! · (N − 1)!)
// och för de två blocken tillsammans Ω_A · Ω_B. Varje partikel har sitt
// eget antal brickor. I varje steg väljs två partiklar helt på måfå, utan
// hänsyn till block eller temperatur, och har den första minst en bricka
// flyttas en bricka till den andra. Förslaget är symmetriskt, så alla
// mikrotillstånd blir lika sannolika, och en fördelning mellan blocken blir
// lika sannolik som sitt antal sätt. Systemet hamnar därför där sätten är flest.
// Temperaturen räknas som T = κ · q / N (i °C), där κ väljs så att
// starttemperaturerna stämmer. Brickorna är alltså bara energin över 0 °C.
//
// Läge 2: värmemaskinen och värmepumpen mellan två behållare. Den största
// möjliga verkningsgraden är η_max = 1 − T_k / T_v (kelvin), och en
// värmepump kan hämta högst Q_k = W · T_k / (T_v − T_k) från den kalla sidan.
(function () {
    const PER_KG = 50;               // svängande partiklar per kilogram i modellen

    // ln Γ(x) med Lanczos approximation
    const LG = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
                12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    function lnGamma(x) {
        if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lnGamma(1 - x);
        x -= 1;
        let a = 0.99999999999980993;
        const t = x + 7.5;
        for (let i = 0; i < 8; i++) a += LG[i] / (x + i + 1);
        return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
    }
    const lnOmega = (N, q) => lnGamma(q + N) - lnGamma(q + 1) - lnGamma(N);
    const lnSatt = (st, qA) => lnOmega(st.NA, qA) + lnOmega(st.NB, st.q - qA);
    // ln Ω för varje möjlig fördelning qA = 0 … q
    function fordelning(st) {
        const ut = [];
        for (let qA = 0; qA <= st.q; qA++) ut.push(lnSatt(st, qA));
        return ut;
    }

    // Två block med massorna mA, mB (kg) och temperaturerna TA, TB (°C, > 0), q brickor.
    function nyttPar({ mA, mB, TA, TB, q }, slump = Math.random) {
        const NA = Math.max(1, Math.round(PER_KG * mA)), NB = Math.max(1, Math.round(PER_KG * mB));
        const kappa = (NA * TA + NB * TB) / q;
        const qA = Math.max(0, Math.min(q, Math.round(NA * TA / kappa)));
        // brickorna läggs ut på måfå bland partiklarna i respektive block
        const n = new Array(NA + NB).fill(0);
        for (let i = 0; i < qA; i++) n[Math.floor(slump() * NA)]++;
        for (let i = qA; i < q; i++) n[NA + Math.floor(slump() * NB)]++;
        return { NA, NB, q, qA, qA0: qA, kappa, n, t: 0, hopp: 0, tillbaka: 0 };
    }
    const temp = (st, qA = st.qA) => ({ A: st.kappa * qA / st.NA, B: st.kappa * (st.q - qA) / st.NB });
    const slutTemp = (st) => st.kappa * st.q / (st.NA + st.NB);

    // Ett steg: två partiklar väljs på måfå. Returnerar +1 om en bricka gick
    // från B till A, −1 om den gick från A till B och 0 annars (ingen bricka
    // att flytta, eller en flytt inom samma block).
    function hopp(st, slump = Math.random) {
        const N = st.NA + st.NB;
        const i = Math.floor(slump() * N), j = Math.floor(slump() * N);
        st.hopp++;
        if (st.n[i] === 0 || i === j) return 0;
        st.n[i]--; st.n[j]++;
        const iA = i < st.NA, jA = j < st.NA;
        if (iA === jA) return 0;
        st.qA += jA ? 1 : -1;
        if (st.qA === st.qA0) st.tillbaka++;
        return jA ? 1 : -1;
    }
    // Sannolikheten (som tiologaritm) att råka befinna sig i startfördelningen.
    function log10ChansStart(st) {
        const l = fordelning(st);
        const max = Math.max(...l);
        const summa = max + Math.log(l.reduce((s, x) => s + Math.exp(x - max), 0));
        return (lnSatt(st, st.qA0) - summa) / Math.LN10;
    }

    // ── Värmemaskinen ──
    const etaMax = (Tv, Tk) => (Tv > Tk ? 1 - Tk / Tv : 0);
    function maskin(Tv, Tk, eta, Qv) {
        const W = eta * Qv;
        return { W, Qk: Qv - W, etaMax: etaMax(Tv, Tk), mojlig: eta <= etaMax(Tv, Tk) + 1e-9 };
    }
    // Värmepumpen: arbetet W hämtar värmen Qk från den kalla sidan och lämnar Qv = W + Qk på den varma.
    const qkMax = (Tv, Tk, W) => (Tv > Tk ? W * Tk / (Tv - Tk) : Infinity);
    function pump(Tv, Tk, W, Qk) {
        return { Qv: W + Qk, qkMax: qkMax(Tv, Tk, W), mojlig: Qk <= qkMax(Tv, Tk, W) + 1e-9 };
    }

    const ut = { PER_KG, lnGamma, lnOmega, lnSatt, fordelning, nyttPar, temp, slutTemp, hopp, log10ChansStart, etaMax, maskin, qkMax, pump };
    if (typeof window !== 'undefined') window.VarmeMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

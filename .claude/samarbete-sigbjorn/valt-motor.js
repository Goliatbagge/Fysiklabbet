// Motorn för Vältbänken (fysik2-valtning-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-valt-motor.js kontrollerar fysiken och att kopian är identisk.
//
// En jämntjock kloss med bredden b och höjden h (meter) och massan mK. En
// extra vikt med massan mV kan ligga mitt i klossen på höjden yV över
// undersidan (en punktmassa). Tyngdpunkten ligger mitt i bredd och på höjden
//     hT = (mK · h/2 + mV · yV) / (mK + mV).
// Klossen välter kring ett nedre hörn när lodlinjen genom tyngdpunkten
// passerar hörnet, alltså när lutningen α uppfyller tan α = (b/2) / hT.
// Utan vikt är hT = h/2 och tan α = b / h, som i fy2-1.3.
//
// Läge 1: klossen lutas för hand kring ett hörn och släpps. Rotationen kring
// hörnet följer τ = I · θ'' med tröghetsmomentet kring hörnet.
// Läge 2: klossen står på en planka som vevas upp. Den glider när tan φ > μ
// och välter när tan φ > (b/2) / hT; det som inträffar först vinner. Samma μ
// används för vila och glidning. Veven går vidare medan klossen glider (annars
// vore accelerationen nästan noll precis vid gränsen). Under glidningen sitter
// normalkraften fast på avståndet μ · hT från mitten, innanför hörnet, så
// klossen kan inte välta medan den glider.
// Förenklingar: under vältningen antas det nedre hörnet inte glida, och
// rörelsen stannar när klossen ligger på sidan (ingen studs, ingen fortsatt tippning).
(function () {
    const G = 9.82;
    const RAD = Math.PI / 180;

    function tp(c) {
        const M = c.mK + c.mV;
        return { M, hT: (c.mK * c.h / 2 + c.mV * c.yV) / M };
    }
    const tanAlfa = (c) => (c.b / 2) / tp(c).hT;
    const alfaKrit = (c) => Math.atan(tanAlfa(c));
    // tröghetsmomentet kring ett nedre hörn
    function iHorn(c) {
        const kloss = c.mK * ((c.b * c.b + c.h * c.h) / 12 + (c.b / 2) ** 2 + (c.h / 2) ** 2);
        const vikt = c.mV * ((c.b / 2) ** 2 + c.yV ** 2);
        return kloss + vikt;
    }
    // tyngdpunktens vågräta avstånd förbi hörnet när klossen lutar vinkeln θ
    // från lodrätt (positivt: tyngdpunkten är förbi hörnet och klossen välter)
    const forbi = (c, theta) => -(c.b / 2) * Math.cos(theta) + tp(c).hT * Math.sin(theta);

    // ── Läge 1 ──
    const nytt1 = () => ({ theta: 0, omega: 0, sida: 1, hallen: false, liggande: false, t: 0 });
    function steg1(st, c, dt) {
        if (st.hallen || st.liggande) return st;
        const n = Math.max(1, Math.ceil(dt / 0.001)), h = dt / n;
        const M = tp(c).M, I = iHorn(c);
        for (let i = 0; i < n; i++) {
            const alfa = M * G * forbi(c, st.theta) / I;
            st.omega += alfa * h;
            st.theta += st.omega * h;
            if (st.theta <= 0) { st.theta = 0; st.omega = 0; }                // tillbaka på undersidan
            if (st.theta >= Math.PI / 2) { st.theta = Math.PI / 2; st.omega = 0; st.liggande = true; }
            st.t += h;
        }
        return st;
    }

    // ── Läge 2 ──
    const nytt2 = (s0) => ({ phi: 0, psi: 0, omega: 0, s: 0, v: 0, s0, fas: 'vila', handelse: null, t: 0 });
    function steg2(st, c, dt, vevfart) {
        const n = Math.max(1, Math.ceil(dt / 0.001)), h = dt / n;
        const ta = tanAlfa(c);
        for (let i = 0; i < n; i++) {
            if (st.fas === 'vila') {
                st.phi = Math.min(80 * RAD, st.phi + vevfart * h);
                const t = Math.tan(st.phi);
                const glider = t > c.mu, valter = t > ta;
                if (glider || valter) {
                    // det som har den lägsta gränsen inträffar först
                    st.fas = (valter && (!glider || ta <= c.mu)) ? 'valter' : 'glider';
                    st.handelse = st.fas;
                }
            } else if (st.fas === 'glider') {
                st.phi = Math.min(80 * RAD, st.phi + vevfart * h);
                const a = G * (Math.sin(st.phi) - c.mu * Math.cos(st.phi));
                st.v += a * h; st.s += st.v * h;
                if (st.s >= st.s0) { st.s = st.s0; st.fas = 'klar'; }
            } else if (st.fas === 'valter') {
                const M = tp(c).M, I = iHorn(c);
                const alfa = M * G * forbi(c, st.phi + st.psi) / I;
                st.omega += alfa * h; st.psi += st.omega * h;
                if (st.psi >= Math.PI / 2) { st.psi = Math.PI / 2; st.omega = 0; st.fas = 'klar'; }
            }
            st.t += h;
        }
        return st;
    }
    // Normalkraftens angreppspunkt: avståndet från undersidans mitt mot det
    // nedre hörnet. I vila tar normalkraftens moment kring tyngdpunkten ut
    // friktionens, N · x = F_f · hT, med F_f = M g sin φ och N = M g cos φ.
    function normalLage(c, st) {
        const hT = tp(c).hT;
        if (st.fas === 'valter' || (st.fas === 'klar' && st.handelse === 'valter')) return c.b / 2;
        const x = st.fas === 'glider' || (st.fas === 'klar' && st.handelse === 'glider') ? c.mu * hT : hT * Math.tan(st.phi);
        return Math.min(c.b / 2, x);
    }
    // Krafterna på klossen i vila eller vid glidning (N)
    function krafter(c, st) {
        const M = tp(c).M;
        const FN = M * G * Math.cos(st.phi);
        const Ff = st.fas === 'glider' ? c.mu * FN : M * G * Math.sin(st.phi);
        return { FG: M * G, FN, Ff };
    }

    const ut = { G, RAD, tp, tanAlfa, alfaKrit, iHorn, forbi, nytt1, steg1, nytt2, steg2, normalLage, krafter };
    if (typeof window !== 'undefined') window.ValtMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

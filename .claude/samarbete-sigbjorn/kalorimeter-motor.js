// Motorn för Kalorimetern (fysik1-kalorimetri-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-kalorimeter-motor.js kontrollerar fysiken och att kopian är identisk.
//
// Två kroppar utbyter energi: A är det som läggs i kalorimetern (varmt
// vatten, en metallbit eller is) och B är det som redan finns i den (vatten,
// och med en riktig kalorimeter även koppen själv). Varje kropp beskrivs med
// sin entalpi H, räknad från fast ämne vid 0 °C:
//     H = C_fast · T                  för T < 0 °C
//     0 ≤ H ≤ L       (T = 0 °C)      under smältningen, L = l_s · m
//     H = L + C_flyt · T              för T > 0 °C
// där C = c · m (+ koppens värmekapacitet för B). En metall har L = 0 och
// samma c i båda leden. Då blir isens smältning en platå i temperaturen, och
// energibalansen E_avg = E_upp är summan av alla ändringar i H.
//
// Utbytet går som Newtons avsvalningslag, P = K · (T_A − T_B). Varje
// tidssteg räknas exakt för de aktuella värmekapaciteterna, så att
// temperaturerna aldrig svänger förbi varandra. En riktig kalorimeter läcker
// dessutom energi till rummet, P = h · (T_B − T_rum).
(function () {
    const VATTEN = { c_fast: 2200, c_flyt: 4180, ls: 334000 };
    const METALLER = {
        aluminium: { namn: 'Aluminium', c: 900 },
        jarn:      { namn: 'Järn',      c: 460 },
        koppar:    { namn: 'Koppar',    c: 390 },
        tenn:      { namn: 'Tenn',      c: 230 },
        bly:       { namn: 'Bly',       c: 130 },
    };
    const KOPP_C = 90;        // J/K, den riktiga kalorimeterns inre kopp, omrörare och termometer
    const LACKA_H = 0.5;      // W/K, läckaget till rummet
    const T_RUM = 20;         // °C
    const TAU = 10;           // s, omrörningens tidsskala
    const STOR = 1e15;        // "oändlig" värmekapacitet under en fasövergång

    // En kropp: typ 'vatten' eller en metallnyckel, massa m, starttemperatur
    // T0, fas 'fast' eller 'flytande' (avgör vatten vid exakt 0 °C) och
    // extra värmekapacitet Cx (koppen).
    function kropp(typ, m, T0, fas, Cx = 0) {
        let Cs, Cl, L;
        if (typ === 'vatten') { Cs = VATTEN.c_fast * m; Cl = VATTEN.c_flyt * m; L = VATTEN.ls * m; }
        else { const c = METALLER[typ].c; Cs = Cl = c * m; L = 0; }
        const k = { typ, m, Cs: Cs + Cx, Cl: Cl + Cx, L, Cx, fas };
        k.H0 = entalpi(k, T0, fas);
        k.H = k.H0;
        k.T0 = T0;
        return k;
    }
    function entalpi(k, T, fas) {
        if (T < 0 || (T === 0 && fas === 'fast')) return k.Cs * T;
        return k.L + k.Cl * T;
    }
    function temp(k, H = k.H) {
        if (H < 0) return H / k.Cs;
        if (H <= k.L) return 0;
        return (H - k.L) / k.Cl;
    }
    // värmekapaciteten just nu (oändlig mitt i en fasövergång)
    function kapacitet(k) {
        if (k.H < 0) return k.Cs;
        if (k.H <= k.L && k.L > 0) return STOR;
        return k.Cl;
    }
    // andel smält (vatten), 0 … 1
    const smalt = (k, H = k.H) => (k.L > 0 ? Math.max(0, Math.min(1, H / k.L)) : 1);

    // Jämvikten utan förluster och utan koppen: den temperatur där
    // H_A(T) + H_B(T) = H_A0 + H_B0, och hur mycket is som smält.
    function jamvikt(A, B) {
        const ren = (k) => ({ Cs: k.Cs - k.Cx, Cl: k.Cl - k.Cx, L: k.L });
        const a = ren(A), b = ren(B);
        const H = A.H0 + B.H0 - A.Cx * A.T0 - B.Cx * B.T0;
        const L = a.L + b.L;
        let T, flytande;
        if (H < 0) { T = H / (a.Cs + b.Cs); }
        else if (H <= L) { T = 0; }
        else { T = (H - L) / (a.Cl + b.Cl); }
        // massan flytande vatten före och efter
        const vattenMassa = (k) => (k.typ === 'vatten' ? k.m : 0);
        const flytFore = vattenMassa(A) * smalt(A, A.H0 - A.Cx * A.T0) + vattenMassa(B) * smalt(B, B.H0 - B.Cx * B.T0);
        if (H < 0) flytande = 0;
        else if (H <= L) flytande = L > 0 ? H / VATTEN.ls : 0;
        else flytande = vattenMassa(A) + vattenMassa(B);
        return { T, smaltMassa: flytande - flytFore };
    }

    // Ett försök: A läggs i B. Med forlust räknas koppen och läckaget med.
    function nyttForsok({ A, B, forlust = false }) {
        const KA = kropp(A.typ, A.m, A.T, A.fas || 'flytande');
        const KB = kropp(B.typ, B.m, B.T, B.fas || 'flytande', forlust ? KOPP_C : 0);
        const K = Math.sqrt(Math.min(KA.Cs, KA.Cl) * Math.min(KB.Cs, KB.Cl)) / TAU;
        return { A: KA, B: KB, K, h: forlust ? LACKA_H : 0, forlust, t: 0, Erum: 0, klar: false, ideal: jamvikt(KA, KB) };
    }

    // Ett tidssteg dt (s). Returnerar true när temperaturerna har mötts.
    function steg(st, dt) {
        if (st.klar) return true;
        const n = Math.max(1, Math.ceil(dt / 0.02));
        const d = dt / n;
        for (let i = 0; i < n; i++) {
            const TA = temp(st.A), TB = temp(st.B);
            const CA = kapacitet(st.A), CB = kapacitet(st.B);
            const inv = 1 / CA + 1 / CB;
            const Qeq = (TA - TB) / inv;                       // det som jämnar ut temperaturerna
            const Q = Qeq * (1 - Math.exp(-st.K * d * inv));   // exakt för ett linjärt avsnitt
            st.A.H -= Q;
            st.B.H += Q;
            if (st.h > 0) {
                const Qr = st.h * (temp(st.B) - T_RUM) * d;
                st.B.H -= Qr;
                st.Erum += Qr;
            }
            st.t += d;
        }
        // med läckage blir en liten skillnad kvar, den som driver läckaget
        const kvar = 0.02 + 2 * st.h * Math.abs(temp(st.B) - T_RUM) / st.K;
        if ((Math.abs(temp(st.A) - temp(st.B)) < kvar && st.t > 1) || st.t > 900) { st.klar = true; utjamna(st); }
        return st.klar;
    }
    // Sista biten: kropparna får exakt samma temperatur, med samma totala energi.
    function utjamna(st) {
        const A = st.A, B = st.B, H = A.H + B.H;
        const Hfast = 0, Hflyt = A.L + B.L;               // summan vid 0 °C, före och efter smältningen
        let T;
        if (H < Hfast) T = H / (A.Cs + B.Cs);
        else if (H > Hflyt) T = (H - Hflyt) / (A.Cl + B.Cl);
        else {                                            // smältningen pågår: båda vid exakt 0 °C
            B.H = Math.min(B.L, H);
            A.H = H - B.H;
            return;
        }
        A.H = T < 0 ? A.Cs * T : A.L + A.Cl * T;
        B.H = H - A.H;
    }

    // En ändring av H från H0 till H delad på avsnitten fast / smältning / flytande
    // (bara kroppens eget ämne, inte koppen). Positivt = upptagen energi.
    function delar(k) {
        const Hw = (H) => H - k.Cx * temp(k, H);
        const a = Hw(k.H0), b = Hw(k.H);
        const over = (lo, hi) => {
            const x0 = Math.max(Math.min(a, b), lo), x1 = Math.min(Math.max(a, b), hi);
            return Math.max(0, x1 - x0) * Math.sign(b - a);
        };
        return { fast: over(-Infinity, 0), fas: over(0, k.L), flyt: over(k.L, Infinity) };
    }
    // Alla energiposter i försöket. Summan är noll (energin bevaras).
    function energier(st) {
        const TB = temp(st.B);
        return {
            A: delar(st.A),
            B: delar(st.B),
            kopp: st.B.Cx * (TB - st.B.T0),
            rum: st.Erum,
        };
    }

    // Den specifika värmekapacitet som räknas fram ur mätningen: metallen
    // med massan mM och starttemperaturen TM i vattnet mV, TV, sluttemperatur T.
    const cUrMatning = (mM, TM, mV, TV, T) => VATTEN.c_flyt * mV * (T - TV) / (mM * (TM - T));

    const ut = { VATTEN, METALLER, KOPP_C, LACKA_H, T_RUM, TAU, kropp, entalpi, temp, kapacitet, smalt,
                 jamvikt, nyttForsok, steg, delar, energier, cUrMatning };
    if (typeof window !== 'undefined') window.KalorimeterMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

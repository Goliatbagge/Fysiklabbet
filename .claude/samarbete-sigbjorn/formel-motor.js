// Motorn för Formelverkstaden (fysik1-formelverkstaden-app.html).
// Källan ligger här och klistras in oförändrad i sidan; testet
// .claude/test-formel-motor.js kontrollerar algebran och att kopian är identisk.
//
// Ett led är   fac · (term₁ + term₂ + …)^pow
// där varje term är en produkt av faktorer med exponenter och ett tecken.
// Talen (2, 100) är faktorer som alla andra ("#2"), så att uträkningen kan
// skrivas i den ordning boken skriver den: m · 100 · l³. Ett led med en enda
// term och pow = 1 har alltid tom fac; allt står då i termen.
(function () {
    // Dimensioner i SI:s grundenheter [m, kg, s, A, K]
    const D = {
        m: [1, 0, 0, 0, 0], kg: [0, 1, 0, 0, 0], s: [0, 0, 1, 0, 0], A: [0, 0, 0, 1, 0], K: [0, 0, 0, 0, 1],
        N: [1, 1, -2, 0, 0], J: [2, 1, -2, 0, 0], W: [2, 1, -3, 0, 0], Pa: [-1, 1, -2, 0, 0],
        V: [2, 1, -3, -1, 0], Ohm: [2, 1, -3, -2, 0],
        ms: [1, 0, -1, 0, 0], ms2: [1, 0, -2, 0, 0], m2: [2, 0, 0, 0, 0], m3: [3, 0, 0, 0, 0],
        kgm3: [-3, 1, 0, 0, 0], c: [2, 0, -2, 0, -1], ett: [0, 0, 0, 0, 0],
    };
    // Storheterna: bas, index, namn (ordetiketten), enhet och dimension.
    const S = (bas, sub, namn, enhet, dim, delta = false) => ({ bas, sub, namn, enhet, dim: D[dim], delta });
    const SYM = {
        U: S('U', '', 'Spänning', 'V', 'V'), R: S('R', '', 'Resistans', 'Ω', 'Ohm'), I: S('I', '', 'Ström', 'A', 'A'),
        v_m: S('v', 'm', 'Medelfart', 'm/s', 'ms'), s: S('s', '', 'Sträcka', 'm', 'm'), t: S('t', '', 'Tid', 's', 's'),
        ρ: S('ρ', '', 'Densitet', 'kg/m³', 'kgm3'), m: S('m', '', 'Massa', 'kg', 'kg'), V: S('V', '', 'Volym', 'm³', 'm3'),
        F_R: S('F', 'R', 'Resulterande kraft', 'N', 'N'), a: S('a', '', 'Acceleration', 'm/s²', 'ms2'),
        p: S('p', '', 'Tryck', 'Pa', 'Pa'), F: S('F', '', 'Kraft', 'N', 'N'), A: S('A', '', 'Area', 'm²', 'm2'),
        E_k: S('E', 'k', 'Rörelseenergi', 'J', 'J'), v: S('v', '', 'Hastighet', 'm/s', 'ms'),
        E_p: S('E', 'p', 'Lägesenergi', 'J', 'J'), g: S('g', '', 'Tyngdfaktor', 'N/kg', 'ms2'), h: S('h', '', 'Höjd', 'm', 'm'),
        P: S('P', '', 'Effekt', 'W', 'W'), ΔE: S('E', '', 'Omvandlad energi', 'J', 'J', true), Δt: S('t', '', 'Tid för omvandlingen', 's', 's', true),
        v_0: S('v', '0', 'Begynnelsehastighet', 'm/s', 'ms'),
        E: S('E', '', 'Energi', 'J', 'J'), c: S('c', '', 'Specifik värmekapacitet', 'J/(kg · K)', 'c'),
        ΔT: S('T', '', 'Temperaturändring', 'K', 'K', true),
        p_1: S('p', '1', 'Tryck före', 'Pa', 'Pa'), V_1: S('V', '1', 'Volym före', 'm³', 'm3'), T_1: S('T', '1', 'Temperatur före', 'K', 'K'),
        p_2: S('p', '2', 'Tryck efter', 'Pa', 'Pa'), V_2: S('V', '2', 'Volym efter', 'm³', 'm3'), T_2: S('T', '2', 'Temperatur efter', 'K', 'K'),
        F_1: S('F', '1', 'Kraft på lilla kolven', 'N', 'N'), A_1: S('A', '1', 'Lilla kolvens area', 'm²', 'm2'),
        F_2: S('F', '2', 'Kraft på stora kolven', 'N', 'N'), A_2: S('A', '2', 'Stora kolvens area', 'm²', 'm2'),
        ΔU: S('U', '', 'Ändring av inre energi', 'J', 'J', true), Q: S('Q', '', 'Tillförd värme', 'J', 'J'),
        W: S('W', '', 'Arbete på gasen', 'J', 'J'),
    };
    const arTal = (k) => k[0] === '#';
    const talVarde = (k) => parseFloat(k.slice(1));

    // Formlerna. Exemplets värden är valda så att formeln stämmer exakt.
    const FORMLER = [
        { id: 'ohm', namn: 'Ohms lag', text: 'U = R*I', varden: { U: 12, R: 4, I: 3 }, tri: { topp: 'U', ner: ['R', 'I'] } },
        { id: 'medelfart', namn: 'Medelfart', text: 'v_m = s/t', varden: { v_m: 8, s: 100, t: 12.5 }, tri: { topp: 's', ner: ['v_m', 't'] } },
        { id: 'densitet', namn: 'Densitet', text: 'ρ = m/V', varden: { ρ: 2700, m: 2.7, V: 0.001 }, tri: { topp: 'm', ner: ['ρ', 'V'] } },
        { id: 'newton2', namn: 'Newtons andra lag', text: 'F_R = m*a', varden: { F_R: 3000, m: 1200, a: 2.5 }, tri: { topp: 'F_R', ner: ['m', 'a'] } },
        { id: 'tryck', namn: 'Tryck', text: 'p = F/A', varden: { p: 20000, F: 600, A: 0.03 }, tri: { topp: 'F', ner: ['p', 'A'] } },
        { id: 'effekt', namn: 'Effekt', text: 'P = ΔE/Δt', varden: { P: 30, ΔE: 1800, Δt: 60 }, tri: { topp: 'ΔE', ner: ['P', 'Δt'] } },
        { id: 'ek', namn: 'Rörelseenergi', text: 'E_k = m*v^2/#2', varden: { E_k: 36, m: 2, v: 6 } },
        { id: 'ep', namn: 'Lägesenergi', text: 'E_p = m*g*h', varden: { E_p: 1473, m: 50, g: 9.82, h: 3 } },
        { id: 'hastighet', namn: 'Hastighet vid konstant acceleration', text: 'v = v_0 + a*t', varden: { v: 10, v_0: 4, a: 2, t: 3 } },
        { id: 'tidlos', namn: 'Tidlösa formeln', text: 'v^2 - v_0^2 = #2*a*s', varden: { v: 5, v_0: 3, a: 2, s: 4 } },
        { id: 'vatsketryck', namn: 'Vätsketryck', text: 'p = ρ*g*h', varden: { p: 29401.08, ρ: 998, g: 9.82, h: 3 } },
        { id: 'varme', namn: 'Uppvärmning', text: 'E = c*m*ΔT', varden: { E: 41800, c: 4180, m: 0.5, ΔT: 20 } },
        { id: 'pascal', namn: 'Hydraulisk press', text: 'F_1/A_1 = F_2/A_2', varden: { F_1: 200, A_1: 0.001, F_2: 10000, A_2: 0.05 } },
        { id: 'gaslag', namn: 'Allmänna gaslagen', text: 'p_1*V_1/T_1 = p_2*V_2/T_2', varden: { p_1: 100000, V_1: 0.002, T_1: 300, p_2: 200000, V_2: 0.0015, T_2: 450 } },
        { id: 'huvudsats', namn: 'Termodynamikens första huvudsats', text: 'ΔU = Q + W', varden: { ΔU: 300, Q: 500, W: -200 } },
    ];

    // ── Termer och led ─────────────────────────────────────
    const term = (f, sg = 1) => ({ sg, f: f.filter(([, e]) => Math.abs(e) > 1e-12) });
    const tom = () => term([]);
    function mulT(a, b) {
        const f = a.f.map((x) => x.slice());
        for (const [k, e] of b.f) {
            const i = f.findIndex(([kk]) => kk === k);
            if (i >= 0) f[i][1] += e; else f.push([k, e]);
        }
        // talen står först i en produkt, som i läroboken: 2 · E_k / m
        return term(f.filter(([k]) => k[0] === '#').concat(f.filter(([k]) => k[0] !== '#')), a.sg * b.sg);
    }
    const invT = (a) => term(a.f.map(([k, e]) => [k, -e]), a.sg);
    const nyckel = (a) => a.f.slice().sort((x, y) => (x[0] < y[0] ? -1 : 1)).map(([k, e]) => k + '^' + e).join('*');
    const ledT = (t) => ({ terms: [t], fac: tom(), pow: 1 });
    const kopia = (l) => ({ terms: l.terms.map((t) => term(t.f, t.sg)), fac: term(l.fac.f, l.fac.sg), pow: l.pow });
    const helt = (x) => Math.abs(x - Math.round(x)) < 1e-9;

    function normalisera(l) {
        let L = kopia(l);
        // termer som tar ut varandra
        const ut = [];
        for (const t of L.terms) {
            const i = ut.findIndex((u) => nyckel(u) === nyckel(t) && u.sg === -t.sg);
            if (i >= 0) ut.splice(i, 1); else ut.push(t);
        }
        L.terms = ut.filter((u) => u.sg > 0).concat(ut.filter((u) => u.sg < 0));
        if (L.terms.length === 0) return { terms: [], fac: tom(), pow: 1 };
        if (L.terms.length === 1) {
            if (L.pow === 1) return ledT(mulT(L.fac, L.terms[0]));
            // en potens av en ensam term går bara att skriva ut när alla exponenter blir hela
            if (L.fac.f.length === 0 && L.terms[0].sg > 0 && L.terms[0].f.every(([, e]) => helt(e * L.pow))) {
                return ledT(term(L.terms[0].f.map(([k, e]) => [k, e * L.pow]), 1));
            }
        }
        if (L.fac.sg < 0) { L.fac.sg = 1; L.terms = L.terms.map((t) => term(t.f, -t.sg)); }
        L.terms = L.terms.filter((u) => u.sg > 0).concat(L.terms.filter((u) => u.sg < 0));
        return L;
    }

    // ── Tolkning av formeltexten ───────────────────────────
    function tolkaLed(txt) {
        const terms = [];
        const delar = txt.replace(/\s+/g, '').replace(/^([^+-])/, '+$1').match(/[+-][^+-]+/g);
        for (const d of delar) {
            const sg = d[0] === '-' ? -1 : 1;
            const f = [];
            let tecken = 1;
            for (const bit of d.slice(1).split(/([*/])/)) {
                if (bit === '*') { tecken = 1; continue; }
                if (bit === '/') { tecken = -1; continue; }
                const [k, e] = bit.split('^');
                f.push([k, tecken * (e ? parseFloat(e) : 1)]);
            }
            terms.push(term(f, sg));
        }
        return normalisera({ terms, fac: tom(), pow: 1 });
    }
    function tolka(formel) {
        const [v, h] = formel.text.split('=');
        return { vl: tolkaLed(v), hl: tolkaLed(h) };
    }
    const storheter = (formel) => {
        const { vl, hl } = tolka(formel);
        const ut = [];
        for (const l of [vl, hl]) for (const t of [l.fac, ...l.terms]) for (const [k] of t.f) if (!arTal(k) && !ut.includes(k)) ut.push(k);
        return ut;
    };

    // ── Räkning ────────────────────────────────────────────
    const varde = (k, V) => (arTal(k) ? talVarde(k) : V[k]);
    const evalT = (t, V) => t.f.reduce((p, [k, e]) => p * Math.pow(varde(k, V), e), t.sg);
    function evalL(l, V) {
        const sum = l.terms.reduce((s, t) => s + evalT(t, V), 0);
        return evalT(l.fac, V) * Math.pow(sum, l.pow);
    }
    const dimT = (t) => t.f.reduce((d, [k, e]) => (arTal(k) ? d : d.map((x, i) => x + e * SYM[k].dim[i])), [0, 0, 0, 0, 0]);
    function dimL(l) {
        const inne = l.terms.length ? dimT(l.terms[0]) : [0, 0, 0, 0, 0];
        return dimT(l.fac).map((x, i) => x + inne[i] * l.pow);
    }
    const samDim = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
    const termerSammaDim = (l) => l.terms.every((t) => samDim(dimT(t), dimT(l.terms[0])));

    // ── Operationerna ──────────────────────────────────────
    // op: 'mul', 'div', 'add', 'sub', 'kvad', 'rot'. X är en term (för mul,
    // div, add och sub). Varje operation görs på ett led; uträkningen gör den
    // på båda (eller med flit bara på vänster led).
    function opLed(l, op, X) {
        if (op === 'mul' || op === 'div') {
            const Y = op === 'mul' ? X : invT(X);
            const L = kopia(l);
            if (L.terms.length === 1 && L.pow === 1) L.terms[0] = mulT(L.terms[0], Y);
            else L.fac = mulT(L.fac, Y);
            return normalisera(L);
        }
        if (op === 'add' || op === 'sub') {
            if (l.fac.f.length > 0 || l.pow !== 1) return { fel: 'Här står summan i ett bråk, i en produkt eller under ett rottecken. Multiplicera eller dividera först, eller kvadrera bort roten, innan du adderar eller subtraherar.' };
            const L = kopia(l);
            L.terms.push(term(X.f, (op === 'add' ? 1 : -1) * X.sg));
            return normalisera(L);
        }
        if (op === 'kvad' || op === 'rot') {
            const k = op === 'kvad' ? 2 : 0.5;
            const L = kopia(l);
            if (op === 'rot' && L.terms.length === 1 && L.pow === 1 && L.terms[0].sg < 0) return { fel: 'Det går inte att dra roten ur ett negativt led.' };
            if (L.fac.f.length > 0) {
                if (!L.fac.f.every(([, e]) => helt(e * k))) return { fel: 'Dividera eller multiplicera först bort faktorerna utanför parentesen.' };
                L.fac = term(L.fac.f.map(([kk, e]) => [kk, e * k]), 1);
            }
            if (L.terms.length === 1 && L.pow === 1) {
                const t = L.terms[0];
                if (t.f.every(([, e]) => helt(e * k))) return normalisera(ledT(term(t.f.map(([kk, e]) => [kk, e * k]), 1)));
                return normalisera({ terms: [t], fac: L.fac, pow: k });
            }
            L.pow *= k;
            return normalisera(L);
        }
        return { fel: 'Okänd operation.' };
    }
    function utfor(rad, op, X, baraVanster = false) {
        if (op === 'byt') return { vl: kopia(rad.hl), hl: kopia(rad.vl) };
        const vl = opLed(rad.vl, op, X);
        if (vl.fel) return vl;
        const hl = baraVanster ? kopia(rad.hl) : opLed(rad.hl, op, X);
        if (hl.fel) return hl;
        return { vl, hl };
    }

    // ── Var står den sökta storheten? ─────────────────────
    const innehaller = (l, k) => [l.fac, ...l.terms].some((t) => t.f.some(([kk]) => kk === k));
    const ensam = (l, k) => l.terms.length === 1 && l.pow === 1 && l.terms[0].sg > 0 && l.terms[0].f.length === 1 && l.terms[0].f[0][0] === k && Math.abs(l.terms[0].f[0][1] - 1) < 1e-9;
    function utlost(rad, k) {
        if (ensam(rad.vl, k) && !innehaller(rad.hl, k)) return 'v';
        if (ensam(rad.hl, k) && !innehaller(rad.vl, k)) return 'h';
        return null;
    }

    // Nästa steg mot att lösa ut k (samma tankegång som en lärare skriver).
    function nastaSteg(rad, k) {
        const u = utlost(rad, k);
        if (u === 'v') return null;
        if (u === 'h') return { op: 'byt', varfor: 'Den sökta storheten står ensam i höger led.' };
        const iV = innehaller(rad.vl, k), iH = innehaller(rad.hl, k);
        if (iV && iH) return null;
        if (!iV && !iH) return null;
        const S = iV ? rad.vl : rad.hl;
        if (S.pow === 0.5) return { op: 'kvad', varfor: 'Den sökta storheten står under ett rottecken, och roten försvinner när båda led kvadreras.' };
        if (S.pow === 2) return { op: 'rot', varfor: 'Summan som innehåller den sökta storheten är i kvadrat.' };
        if (S.terms.length > 1) {
            if (S.fac.f.length > 0) {
                const [kk, e] = S.fac.f[0];
                return e > 0 ? { op: 'div', X: term([[kk, e]]), varfor: 'Summan som innehåller den sökta storheten multipliceras med något.' }
                             : { op: 'mul', X: term([[kk, -e]]), varfor: 'Summan som innehåller den sökta storheten står över ett bråkstreck.' };
            }
            const annan = S.terms.find((t) => !t.f.some(([kk]) => kk === k));
            if (annan) {
                const X = term(annan.f, 1);
                return annan.sg > 0 ? { op: 'sub', X, varfor: 'En term saknar den sökta storheten och står med plustecken.' }
                                    : { op: 'add', X, varfor: 'En term saknar den sökta storheten och står med minustecken.' };
            }
            return null;
        }
        const t = S.terms[0];
        if (t.sg < 0) return { op: 'mul', X: term([], -1), varfor: 'Den sökta storheten har ett minustecken framför sig.' };
        const egen = t.f.find(([kk]) => kk === k);
        if (egen[1] < 0) return { op: 'mul', X: term([[k, -egen[1]]]), varfor: 'Den sökta storheten står i nämnaren och hamnar i täljaren när båda led multipliceras med den.' };
        const ovr = t.f.find(([kk]) => kk !== k);
        if (ovr) {
            return ovr[1] > 0 ? { op: 'div', X: term([[ovr[0], ovr[1]]]), varfor: 'Den sökta storheten multipliceras med något.' }
                              : { op: 'mul', X: term([[ovr[0], -ovr[1]]]), varfor: 'Den sökta storheten divideras med något.' };
        }
        if (Math.abs(egen[1] - 2) < 1e-9) return { op: 'rot', varfor: 'Den sökta storheten är i kvadrat.' };
        if (Math.abs(egen[1] - 0.5) < 1e-9) return { op: 'kvad', varfor: 'Den sökta storheten står under ett rottecken.' };
        return null;
    }
    function losning(formel, k, max = 20) {
        let rad = tolka(formel);
        const steg = [];
        for (let i = 0; i < max; i++) {
            const n = nastaSteg(rad, k);
            if (!n) break;
            const r = utfor(rad, n.op, n.X);
            if (r.fel) break;
            steg.push({ ...n, fore: rad, efter: r });
            rad = r;
        }
        return { steg, slut: rad, klar: utlost(rad, k) === 'v' };
    }

    // ── Felaktiga svar till gissa-läget ───────────────────
    // Utgår från rätt högerled och gör de vanliga felen.
    function felSvar(hl) {
        const ut = [];
        const L = kopia(hl);
        const utanTal = (t) => term(t.f.filter(([k]) => !arTal(k)), t.sg);
        const talFel = (t, pow) => {
            // talet tappat, eller på fel plats i bråket
            if (!t.f.some(([k]) => arTal(k))) return;
            ut.push({ terms: [utanTal(t)], fac: tom(), pow, typ: 'glomtTalet' });
            ut.push({ terms: [term(t.f.map(([k, e]) => [k, arTal(k) ? -e : e]), t.sg)], fac: tom(), pow, typ: 'glomtTalet' });
        };
        const flytta = (t, pow) => t.f.forEach(([k, e], i) => {
            if (arTal(k)) return;
            const f = t.f.map((x) => x.slice()); f[i][1] = -e;
            ut.push({ terms: [term(f, t.sg)], fac: tom(), pow, typ: 'flyttad' });
        });
        // teckenfelen som elever gör: glömt att byta tecken på den flyttade termen, eller bytt tecken på allt
        const tecken = (terms, fac, pow) => {
            if (terms.some((u) => u.sg < 0)) ut.push({ terms: terms.map((u) => term(u.f, 1)), fac, pow, typ: 'tecken' });
            // bara plustecken: den flyttade termen har fått fel tecken
            else terms.forEach((u, i) => { if (i > 0) ut.push({ terms: terms.map((w, j) => (j === i ? term(w.f, -w.sg) : w)), fac, pow, typ: 'tecken' }); });
            const alla = terms.map((u) => term(u.f, -u.sg));
            if (alla.some((u) => u.sg > 0)) ut.push({ terms: alla, fac, pow, typ: 'tecken' });
        };
        if (L.terms.length === 1 && L.pow === 1) {
            const t = L.terms[0];
            ut.push({ terms: [invT(t)], fac: tom(), pow: 1, typ: 'inverterat' });
            flytta(t, 1);
            talFel(t, 1);
        } else if (L.terms.length > 1 && L.pow === 1) {
            if (L.fac.f.length > 0) {
                ut.push({ terms: L.terms, fac: invT(L.fac), pow: 1, typ: 'inverterat' });
                ut.push({ terms: [mulT(L.terms[0], L.fac), ...L.terms.slice(1)], fac: tom(), pow: 1, typ: 'forstaTermen' });
                if (L.fac.f.some(([k]) => arTal(k))) ut.push({ terms: L.terms, fac: utanTal(L.fac), pow: 1, typ: 'glomtTalet' });
            }
            tecken(L.terms, L.fac, 1);
        } else if (L.pow === 0.5) {
            ut.push({ terms: L.terms, fac: L.fac, pow: 1, typ: 'glomtRoten' });
            if (L.terms.length === 1) { flytta(L.terms[0], 0.5); talFel(L.terms[0], 0.5); }
            else tecken(L.terms, L.fac, 0.5);
        }
        return ut;
    }

    const ut = {
        D, SYM, FORMLER, arTal, talVarde, term, tom, mulT, invT, nyckel, kopia, normalisera,
        tolka, tolkaLed, storheter, evalT, evalL, dimT, dimL, samDim, termerSammaDim,
        opLed, utfor, innehaller, ensam, utlost, nastaSteg, losning, felSvar,
    };
    if (typeof window !== 'undefined') window.FormelMotor = ut;
    if (typeof module !== 'undefined') module.exports = ut;
})();

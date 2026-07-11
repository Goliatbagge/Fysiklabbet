/* ma2c-1.1.js — visualisering: "Ekvationssystemets tre öden".
 * Hör till ma2c-1.1 (grafisk lösning), ma2c-1.2 (substitutionsmetoden),
 * ma2c-1.3 (additionsmetoden) och ma2c-1.4 (problemlösning).
 *
 * Kärninsikt: skärningspunkten mellan två linjer ÄR ekvationssystemets
 * lösning — grafisk och algebraisk metod är samma sak sedd från två håll.
 * En lösning / ingen / oändligt många = skär / parallella / sammanfaller.
 *
 * Startläget k1 = 2, m1 = −4, k2 = −1, m2 = 5 är exakt Exempel 1 i
 * ma2c-1.1.md (skärningspunkt (3, 2)) — eleven kan "spela upp" exemplet.
 *
 * Tre steg (lager):
 *   1. Skärningspunkten — två dragbara linjer, skärningspunkt + koordinater,
 *      systemet i klammerform, lösningen, verifiering i båda ekvationerna.
 *   2. Algebran följer med — substitutionsstegen med aktuella tal, live,
 *      färgkodade (vänsterled blått, högerled grönt). Kollapsar automatiskt
 *      till "0 = …" när linjerna blir parallella/sammanfallande.
 *   3. De tre ödena — uppdragsknappar styr eleven mot "olösligt" eller
 *      "oändligt många lösningar"; en "Visa facit"-knapp hjälper om man
 *      kör fast.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js-piloten).
 * API: window.VISUALISERINGAR['<id>'] = { mount(el) → { destroy() } }.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0") ──────
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    // Text med kursiva variabler: delar märkta med * i arrayen blir italic.
    function svgVarText(attrs, parts) {
        var el = svgEl('text', attrs);
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var italic = p.charAt(0) === '*';
            var t = svgEl('tspan', italic ? { 'font-style': 'italic' } : {});
            t.textContent = italic ? p.slice(1) : p;
            el.appendChild(t);
        }
        return el;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // "k x + m" som KaTeX-uttryck (utan "y = ")
    function kxplusmTex(k, m) {
        var kZero = Math.abs(k) < 1e-9, mZero = Math.abs(m) < 1e-9;
        var out = '';
        if (!kZero) {
            if (Math.abs(k - 1) < 1e-9) out = 'x';
            else if (Math.abs(k + 1) < 1e-9) out = '-x';
            else out = (k < 0 ? '-' : '') + fmtTex(Math.abs(k), 2) + 'x';
        }
        if (!mZero) {
            var mAbs = fmtTex(Math.abs(m), 2);
            if (out === '') out = (m < 0 ? '-' : '') + mAbs;
            else out += (m < 0 ? ' - ' : ' + ') + mAbs;
        }
        if (out === '') out = '0';
        return out;
    }
    // Samma sak som delar för svgVarText (unicode-minus, italic *x)
    function kxplusmParts(k, m) {
        var kZero = Math.abs(k) < 1e-9, mZero = Math.abs(m) < 1e-9;
        var parts = ['*y', ' = '];
        var any = false;
        if (!kZero) {
            if (Math.abs(k - 1) < 1e-9) { parts.push('*x'); }
            else if (Math.abs(k + 1) < 1e-9) { parts.push('−'); parts.push('*x'); }
            else { parts.push(fmtDisp(Math.abs(k), 2)); parts.push('*x'); }
            any = true;
        }
        if (!mZero) {
            var mAbs = fmtDisp(Math.abs(m), 2);
            if (!any) { parts.push((m < 0 ? '−' : '') + mAbs); }
            else { parts.push(m < 0 ? ' − ' : ' + '); parts.push(mAbs); }
            any = true;
        }
        if (!any) parts.push('0');
        return parts;
    }
    // Insättning av x0 i "y = kx + m" som KaTeX, med resultatet y0 utskrivet
    function insertTex(k, m, x0, y0) {
        var kT = fmtTex(k, 2), x0T = fmtTex(x0, 2), y0T = fmtTex(y0, 2);
        var sign = m < 0 ? ' - ' : ' + ';
        var mAbsT = fmtTex(Math.abs(m), 2);
        if (Math.abs(m) < 1e-9) { sign = ''; mAbsT = ''; }
        return 'y = ' + kT + ' \\cdot ' + x0T + sign + mAbsT + ' = ' + y0T;
    }
    function normalize(v) {
        var l = Math.sqrt(v.x * v.x + v.y * v.y) || 1;
        return { x: v.x / l, y: v.y / l };
    }

    // ── Färger ─────────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        line1: '#2563c9',      // Linje 1 — blå
        line2: '#4a7d3a',      // Linje 2 — grön
        point: '#c8324a',      // skärningspunkt / "saknar lösning" — accentröd
        infinite: '#7c3aed',   // "oändligt många lösningar" — lila
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        success: '#2f7d4f'
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var K_MIN = -5, K_MAX = 5, K_STEP = 0.25;
        var M_MIN = -8, M_MAX = 8, M_STEP = 0.5;
        var DEFAULTS = { k1: 2, m1: -4, k2: -1, m2: 5 };
        var state = { k1: DEFAULTS.k1, m1: DEFAULTS.m1, k2: DEFAULTS.k2, m2: DEFAULTS.m2, step: 1, mission: null };
        function snapK(v) { return clampNum(Math.round(v / K_STEP) * K_STEP, K_MIN, K_MAX); }
        function snapM(v) { return clampNum(Math.round(v / M_STEP) * M_STEP, M_MIN, M_MAX); }

        // ── Geometri: kvadratiskt rutnät ±8 (samma pixelskala i x och y) ────
        var W = 560, L = 44, R = 16, T = 14, B = 36;
        var PW = W - L - R;      // 500
        var PH = PW;             // tvingat lika — annars blir rutorna rektanglar
        var H = T + PH + B;      // 550
        var XMIN = -8, XMAX = 8, YMIN = -8, YMAX = 8;
        var SCALE = PW / (XMAX - XMIN);   // px per världsenhet (samma i x och y)
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }
        function toWorld(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return { x: XMIN + (px - L) / PW * (XMAX - XMIN), y: YMAX - (py - T) / PH * (YMAX - YMIN) };
        }
        // Klipper linjen y = kx + m mot rutan [XMIN,XMAX] x [YMIN,YMAX].
        // (0, m) ligger alltid inuti rutan (m ∈ [YMIN,YMAX]), så segmentet
        // finns alltid.
        function segFor(k, m) {
            var tMin = XMIN, tMax = XMAX;
            if (k > 1e-9) {
                tMin = Math.max(tMin, (YMIN - m) / k);
                tMax = Math.min(tMax, (YMAX - m) / k);
            } else if (k < -1e-9) {
                tMin = Math.max(tMin, (YMAX - m) / k);
                tMax = Math.min(tMax, (YMIN - m) / k);
            } else if (m < YMIN - 1e-9 || m > YMAX + 1e-9) {
                return null;
            }
            if (tMin > tMax + 1e-9) return null;
            return { tMin: tMin, tMax: tMax, x0: tMin, y0: m + k * tMin, x1: tMax, y1: m + k * tMax };
        }
        function kHandleT(seg) {
            var extR = seg.tMax, extL = -seg.tMin;
            var t = extR >= extL ? seg.tMax * 0.65 : seg.tMin * 0.65;
            if (Math.abs(t) < 0.6) t = extR >= extL ? Math.max(seg.tMax, 0.6) : Math.min(seg.tMin, -0.6);
            return clampNum(t, seg.tMin, seg.tMax);
        }

        function classify() {
            var sameK = Math.abs(state.k1 - state.k2) < 1e-9;
            var sameM = Math.abs(state.m1 - state.m2) < 1e-9;
            if (!sameK) return 'one';
            return sameM ? 'infinite' : 'none';
        }
        function intersection() {
            if (Math.abs(state.k1 - state.k2) < 1e-9) return null;
            var x = (state.m2 - state.m1) / (state.k1 - state.k2);
            var y = state.k1 * x + state.m1;
            return { x: x, y: y };
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Ekvationssystemets tre öden';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv graf: två räta linjer, en blå och en grön, i ett ' +
                'koordinatsystem. Dra i linjernas handtag eller glidarna för k och m. ' +
                'Skärningspunkten mellan linjerna markeras med en röd prick och visar ' +
                'ekvationssystemets lösning.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelSystem = document.createElement('div');
        formelSystem.className = 'lab-vis-formel';
        formelSystem.style.color = COL.axis;
        card.appendChild(formelSystem);

        var formelSolution = document.createElement('div');
        formelSolution.className = 'lab-vis-formel';
        formelSolution.style.color = COL.point;
        card.appendChild(formelSolution);

        var verifyRow = document.createElement('div');
        verifyRow.style.display = 'flex';
        verifyRow.style.flexWrap = 'wrap';
        verifyRow.style.justifyContent = 'center';
        verifyRow.style.gap = '20px';
        verifyRow.style.marginTop = '2px';
        card.appendChild(verifyRow);

        var verify1 = document.createElement('div');
        verify1.className = 'lab-vis-formel';
        verify1.style.color = COL.line1;
        verify1.style.marginTop = '0';
        verify1.style.fontSize = '14px';
        verifyRow.appendChild(verify1);

        var verify2 = document.createElement('div');
        verify2.className = 'lab-vis-formel';
        verify2.style.color = COL.line2;
        verify2.style.marginTop = '0';
        verify2.style.fontSize = '14px';
        verifyRow.appendChild(verify2);

        var formelAlgebra = document.createElement('div');
        formelAlgebra.className = 'lab-vis-formel';
        formelAlgebra.style.color = COL.axis;
        card.appendChild(formelAlgebra);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Skärningspunkten' },
            { n: 2, label: '2 · Algebran följer med' },
            { n: 3, label: '3 · De tre ödena' }
        ];
        var INSTR = {
            1: 'Dra i linjernas handtag (eller <em>k</em>- och <em>m</em>-glidarna) och se ' +
               'hur skärningspunkten flyttar sig. Skärningspunkten ÄR ekvationssystemets ' +
               'lösning — dess koordinater löser båda ekvationerna samtidigt.',
            2: 'Samma lösning går att räkna fram algebraiskt. Sätt de två högerleden lika ' +
               '(substitutionsmetoden) och lös ut <em>x</em>, precis som i genomgången — ' +
               'talen uppdateras live när du drar i linjerna.',
            3: 'Ett linjärt ekvationssystem kan ha tre olika öden. Välj ett uppdrag nedan ' +
               'och dra linjerna dit — knappen "Visa facit" hjälper dig om du kör fast.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { state.step = s.n; update(); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Legend ────────────────────────────────────────────────────────
        function legendItem(color, html) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return span;
        }
        legend.appendChild(legendItem(COL.line1, '<em>y</em> = <em>k</em>₁<em>x</em> + <em>m</em>₁'));
        legend.appendChild(legendItem(COL.line2, '<em>y</em> = <em>k</em>₂<em>x</em> + <em>m</em>₂'));
        legend.appendChild(legendItem(COL.point, 'Skärningspunkt'));

        // ── Uppdragsknappar (steg 3) ─────────────────────────────────────
        function styleMissionBtn(btn, active) {
            btn.classList.toggle('active', active);
            btn.style.background = active ? 'var(--lab-ink)' : '';
            btn.style.color = active ? 'var(--lab-bg-panel)' : '';
            btn.style.borderColor = active ? 'var(--lab-ink)' : '';
        }
        var missionNone = document.createElement('button');
        missionNone.type = 'button';
        missionNone.className = 'lab-btn';
        missionNone.textContent = 'Gör systemet olösligt';
        missionNone.addEventListener('click', function () {
            state.mission = state.mission === 'olosligt' ? null : 'olosligt';
            update();
        });
        actions.appendChild(missionNone);

        var missionInf = document.createElement('button');
        missionInf.type = 'button';
        missionInf.className = 'lab-btn';
        missionInf.textContent = 'Gör det till oändligt många lösningar';
        missionInf.addEventListener('click', function () {
            state.mission = state.mission === 'oandligt' ? null : 'oandligt';
            update();
        });
        actions.appendChild(missionInf);

        var facitBtn = document.createElement('button');
        facitBtn.type = 'button';
        facitBtn.className = 'lab-btn';
        facitBtn.textContent = 'Visa facit';
        facitBtn.addEventListener('click', function () {
            if (!state.mission) return;
            if (state.mission === 'olosligt') {
                state.k2 = state.k1;
                var target = state.m1 + 3;
                if (target > M_MAX) target = state.m1 - 3;
                state.m2 = snapM(target);
            } else if (state.mission === 'oandligt') {
                state.k2 = state.k1;
                state.m2 = state.m1;
            }
            syncSliders();
            update();
        });
        actions.appendChild(facitBtn);

        // ── Glidare (k1, m1, k2, m2) ──────────────────────────────────────
        function makeRow(name, min, max, step, decimals, get, set, accentColor) {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = name;
            lbl.appendChild(em);
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.min = min; slider.max = max; slider.step = step; slider.value = get();
            slider.setAttribute('aria-label', 'Värdet på ' + name);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = max; field.step = step; field.value = get();
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + accentColor + ' 0%, ' +
                    accentColor + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(clampNum(v, min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), decimals).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(get(), decimals).replace(',', '.');
            });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        var rowK1 = makeRow('k₁', K_MIN, K_MAX, K_STEP, 2,
            function () { return state.k1; }, function (v) { state.k1 = snapK(v); }, COL.line1);
        var rowM1 = makeRow('m₁', M_MIN, M_MAX, M_STEP, 1,
            function () { return state.m1; }, function (v) { state.m1 = snapM(v); }, COL.line1);
        var rowK2 = makeRow('k₂', K_MIN, K_MAX, K_STEP, 2,
            function () { return state.k2; }, function (v) { state.k2 = snapK(v); }, COL.line2);
        var rowM2 = makeRow('m₂', M_MIN, M_MAX, M_STEP, 1,
            function () { return state.m2; }, function (v) { state.m2 = snapM(v); }, COL.line2);
        function syncSliders() { rowK1.sync(); rowM1.sync(); rowK2.sync(); rowM2.sync(); }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.k1 = DEFAULTS.k1; state.m1 = DEFAULTS.m1;
            state.k2 = DEFAULTS.k2; state.m2 = DEFAULTS.m2;
            state.mission = null;
            syncSliders();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbara handtag (m-handtag vid x=0, k-handtag på linjen) ──────
        var dragging = null; // { line: 1|2, type: 'm'|'k' } | null
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var w = toWorld(e.clientX, e.clientY);
            var kKey = 'k' + dragging.line, mKey = 'm' + dragging.line;
            if (dragging.type === 'm') {
                state[mKey] = snapM(w.y);
            } else {
                if (Math.abs(w.x) > 0.25) {
                    state[kKey] = snapK((w.y - state[mKey]) / w.x);
                }
            }
            syncSliders();
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function hitCircle(cx, cy, line, type) {
            var hc = svgEl('circle', { cx: cx, cy: cy, r: 15, fill: 'rgba(0,0,0,0)' });
            hc.style.cursor = 'grab';
            hc.addEventListener('pointerdown', function (e) {
                dragging = { line: line, type: type };
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            return hc;
        }

        // ── Rita linje-etikett i fri yta, offsetad vinkelrätt från linjen ──
        // Väljer bland fyra kandidatpunkter (nära vardera segmentände, på
        // ömse sidor av linjen) den som ligger längst bort från både
        // koordinataxlarna OCH övriga upptagna punkter (skärningspunkt,
        // redan placerade etiketter) — så etiketten aldrig hamnar på en
        // linje, en axel eller ovanpå en annan etikett.
        function labelCandidate(k, m, t, offPx) {
            var len = Math.sqrt(1 + k * k);
            var offWorld = offPx / SCALE;
            return { x: t - k / len * offWorld, y: (k * t + m) + 1 / len * offWorld };
        }
        function ptDist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
        function candScore(pt, avoid) {
            var s = Math.min(Math.abs(pt.x), Math.abs(pt.y));
            for (var i = 0; i < avoid.length; i++) {
                if (!avoid[i]) continue;
                var d = ptDist(pt, avoid[i]);
                if (d < s) s = d;
            }
            return s;
        }
        function drawLineLabel(root, k, m, seg, color, avoid) {
            var margin = 1.0;
            var tLo = clampNum(seg.tMin + margin, seg.tMin, seg.tMax);
            var tHi = clampNum(seg.tMax - margin, seg.tMin, seg.tMax);
            if (seg.tMax - seg.tMin < 2) { tLo = tHi = (seg.tMin + seg.tMax) / 2; }
            var offPx = 18;
            var cands = [
                labelCandidate(k, m, tLo, offPx), labelCandidate(k, m, tLo, -offPx),
                labelCandidate(k, m, tHi, offPx), labelCandidate(k, m, tHi, -offPx)
            ];
            var best = cands[0], bestScore = -Infinity;
            cands.forEach(function (c) {
                var sc = candScore(c, avoid);
                if (sc > bestScore) { bestScore = sc; best = c; }
            });
            var px = clampNum(best.x, XMIN + 0.35, XMAX - 0.35);
            var py = clampNum(best.y, YMIN + 0.35, YMAX - 0.35);
            var sx = X(px), sy = Y(py);
            // För branta linjer måste texten VÄXA BORT från linjen — en
            // mitten-ankrad ~60 px bred etikett korsar annars tillbaka över
            // linjen trots den vinkelräta offseten.
            var anchor = 'middle';
            if (Math.abs(k) >= 0.7) {
                var lineX = (py - m) / k;
                anchor = px < lineX ? 'end' : 'start';
            }
            if (sx > W - 76) anchor = 'end';
            else if (sx < L + 46) anchor = 'start';
            root.appendChild(svgVarText(
                { x: sx, y: sy + 4, 'font-size': 12.5, 'text-anchor': anchor, fill: color },
                kxplusmParts(k, m)));
            return { x: px, y: py };
        }

        // ── Rita scenen ───────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var i;

            // Rutnät (heltalslinjer, hoppa över 0 — axeln ritas separat)
            for (i = -8; i <= 8; i++) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            var axisX = X(0), axisY = Y(0);
            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter varannan enhet
            for (i = -8; i <= 8; i += 2) {
                if (i === 0) continue;
                svg.appendChild(svgVarText({ x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
                svg.appendChild(svgVarText({ x: axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }

            // Klippram för linjerna
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            var seg1 = segFor(state.k1, state.m1);
            var seg2 = segFor(state.k2, state.m2);
            if (seg1) {
                g.appendChild(svgEl('line', {
                    x1: X(seg1.x0), y1: Y(seg1.y0), x2: X(seg1.x1), y2: Y(seg1.y1),
                    stroke: COL.line1, 'stroke-width': 2.6, 'stroke-linecap': 'round'
                }));
            }
            if (seg2) {
                g.appendChild(svgEl('line', {
                    x1: X(seg2.x0), y1: Y(seg2.y0), x2: X(seg2.x1), y2: Y(seg2.y1),
                    stroke: COL.line2, 'stroke-width': 2, 'stroke-linecap': 'round'
                }));
            }

            // Linje-etiketter i fri yta — undvik skärningspunkten, axlarna
            // och varandra. Sammanfaller linjerna helt (samma k och m) syns
            // bara EN linje på skärmen, så bara EN etikett ritas (annars
            // hamnar de exakt ovanpå varandra).
            var cls = classify();
            var avoidPts = [];
            var pInt = intersection();
            if (pInt && pInt.x >= XMIN - 1e-9 && pInt.x <= XMAX + 1e-9 && pInt.y >= YMIN - 1e-9 && pInt.y <= YMAX + 1e-9) {
                avoidPts.push(pInt);
            }
            if (seg1) avoidPts.push(drawLineLabel(svg, state.k1, state.m1, seg1, COL.line1, avoidPts));
            if (seg2 && cls !== 'infinite') drawLineLabel(svg, state.k2, state.m2, seg2, COL.line2, avoidPts);

            // Handtag: m-handtag vid (0, m), k-handtag längre ut på linjen
            [1, 2].forEach(function (line) {
                var k = line === 1 ? state.k1 : state.k2;
                var m = line === 1 ? state.m1 : state.m2;
                var color = line === 1 ? COL.line1 : COL.line2;
                var seg = line === 1 ? seg1 : seg2;
                if (!seg) return;
                var mx = X(0), my = Y(m);
                svg.appendChild(svgEl('circle', { cx: mx, cy: my, r: 4.5, fill: color }));
                svg.appendChild(hitCircle(mx, my, line, 'm'));
                var tk = kHandleT(seg);
                var kx = X(tk), ky = Y(k * tk + m);
                svg.appendChild(svgEl('circle', { cx: kx, cy: ky, r: 4.5, fill: color, stroke: 'rgba(15,22,32,0.5)', 'stroke-width': 1 }));
                svg.appendChild(hitCircle(kx, ky, line, 'k'));
            });

            // Skärningspunkt
            var p = intersection();
            if (p) {
                var inside = p.x >= XMIN - 1e-9 && p.x <= XMAX + 1e-9 && p.y >= YMIN - 1e-9 && p.y <= YMAX + 1e-9;
                if (inside) {
                    var px = X(p.x), py = Y(p.y);
                    svg.appendChild(svgEl('circle', { cx: px, cy: py, r: 5, fill: COL.point }));
                    var anchor = 'start', dx = 11, dy = -10;
                    if (px > W - 96) { anchor = 'end'; dx = -11; }
                    if (py < T + 26) { dy = 20; }
                    else if (py > T + PH - 14) { dy = -14; }
                    svg.appendChild(svgEl('text', {
                        x: px + dx, y: py + dy, 'font-size': 13, 'text-anchor': anchor, fill: COL.point
                    })).textContent = '(' + fmtDisp(p.x, 2) + ', ' + fmtDisp(p.y, 2) + ')';
                } else {
                    // Utanför rutnätet: pil vid kanten + koordinater
                    var dxw = p.x, dyw = p.y;
                    var tx = dxw > 1e-9 ? XMAX / dxw : dxw < -1e-9 ? XMIN / dxw : Infinity;
                    var ty = dyw > 1e-9 ? YMAX / dyw : dyw < -1e-9 ? YMIN / dyw : Infinity;
                    var t = clampNum(Math.min(tx, ty), 0, 1);
                    var ex = t * dxw, ey = t * dyw;
                    var dirScreen = normalize({ x: dxw, y: -dyw });
                    var ecx = X(ex), ecy = Y(ey);
                    var tipX = ecx + dirScreen.x * 13, tipY = ecy + dirScreen.y * 13;
                    var baseX2 = ecx - dirScreen.x * 4, baseY2 = ecy - dirScreen.y * 4;
                    var perpX = -dirScreen.y, perpY = dirScreen.x;
                    var b1x = baseX2 + perpX * 5.5, b1y = baseY2 + perpY * 5.5;
                    var b2x = baseX2 - perpX * 5.5, b2y = baseY2 - perpY * 5.5;
                    svg.appendChild(svgEl('polygon', { points: tipX + ',' + tipY + ' ' + b1x + ',' + b1y + ' ' + b2x + ',' + b2y, fill: COL.point }));
                    var lx = ecx - dirScreen.x * 30, ly = ecy - dirScreen.y * 30;
                    var lanchor = dirScreen.x > 0.15 ? 'end' : (dirScreen.x < -0.15 ? 'start' : 'middle');
                    lx = clampNum(lx, L + 4, L + PW - 4);
                    ly = clampNum(ly, T + 12, T + PH - 6);
                    svg.appendChild(svgEl('text', {
                        x: lx, y: ly, 'font-size': 12.5, 'text-anchor': lanchor, fill: COL.point
                    })).textContent = '(' + fmtDisp(p.x, 2) + ', ' + fmtDisp(p.y, 2) + ')';
                }
            }
        }

        // ── Formler ───────────────────────────────────────────────────────
        function updateFormulas() {
            var k1 = state.k1, m1 = state.m1, k2 = state.k2, m2 = state.m2;
            var cls = classify();

            katexInto(formelSystem,
                '\\begin{cases}' +
                '\\textcolor{' + COL.line1 + '}{y = ' + kxplusmTex(k1, m1) + '} \\\\' +
                '\\textcolor{' + COL.line2 + '}{y = ' + kxplusmTex(k2, m2) + '}' +
                '\\end{cases}');

            if (state.step === 1) {
                if (cls === 'one') {
                    var p = intersection();
                    katexInto(formelSolution,
                        '\\begin{cases} x = ' + fmtTex(p.x, 2) + ' \\\\ y = ' + fmtTex(p.y, 2) + ' \\end{cases}');
                    verify1.style.display = '';
                    verify2.style.display = '';
                    katexInto(verify1, insertTex(k1, m1, p.x, p.y));
                    katexInto(verify2, insertTex(k2, m2, p.x, p.y));
                } else {
                    katexInto(formelSolution, cls === 'none' ? '\\text{Systemet saknar lösning}' : '\\text{Oändligt många lösningar}');
                    verify1.style.display = 'none';
                    verify2.style.display = 'none';
                }
            }

            if (state.step === 2) {
                var lines = [];
                lines.push('\\textcolor{' + COL.line1 + '}{' + kxplusmTex(k1, m1) + '} = \\textcolor{' + COL.line2 + '}{' + kxplusmTex(k2, m2) + '}');
                var diffK = k1 - k2, diffM = m2 - m1;
                lines.push('(' + fmtTex(k1, 2) + ' - (' + fmtTex(k2, 2) + '))\\,x = (' + fmtTex(m2, 2) + ') - (' + fmtTex(m1, 2) + ')');
                if (Math.abs(diffK) < 1e-9) {
                    lines.push('0 = ' + fmtTex(diffM, 2));
                } else {
                    var x0 = diffM / diffK, y0 = k1 * x0 + m1;
                    lines.push(fmtTex(diffK, 2) + '\\,x = ' + fmtTex(diffM, 2));
                    lines.push('x = \\dfrac{' + fmtTex(diffM, 2) + '}{' + fmtTex(diffK, 2) + '} = ' + fmtTex(x0, 2));
                    lines.push('\\textcolor{' + COL.line1 + '}{y = ' + fmtTex(k1, 2) + ' \\cdot ' + fmtTex(x0, 2) + ' + (' + fmtTex(m1, 2) + ') = ' + fmtTex(y0, 2) + '}');
                }
                katexInto(formelAlgebra, '\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}');
            }
        }

        function updateNote() {
            var cls = classify();
            note.style.color = '';

            if (state.step === 3 && state.mission) {
                var reached = (state.mission === 'olosligt' && cls === 'none') ||
                    (state.mission === 'oandligt' && cls === 'infinite');
                if (reached) {
                    note.style.color = COL.success;
                    if (state.mission === 'olosligt') {
                        var diff = state.m2 - state.m1;
                        note.innerHTML = 'Uppdrag klarat! Linjerna är parallella (samma <em>k</em> = ' +
                            fmt(state.k1, 2) + ', olika <em>m</em>) — algebran kollapsar till <strong>0 = ' +
                            fmtDisp(diff, 2) + '</strong>, en orimlighet. Systemet saknar lösning.';
                    } else {
                        note.innerHTML = 'Uppdrag klarat! Linjerna sammanfaller helt (samma <em>k</em> och ' +
                            '<em>m</em>) — algebran kollapsar till <strong>0 = 0</strong>, sant för alla ' +
                            '<em>x</em>. Varje punkt på linjen är en lösning.';
                    }
                } else {
                    note.style.color = COL.axis;
                    if (state.mission === 'olosligt') {
                        note.innerHTML = cls === 'infinite'
                            ? 'Nästan — linjerna sammanfaller helt just nu. Ändra <em>m</em> på en av dem så höjden skiljer sig, men behåll samma lutning.'
                            : 'Ändra <em>k</em>₂ tills den blir exakt lika med <em>k</em>₁ = ' + fmt(state.k1, 2) + '.';
                    } else {
                        note.innerHTML = cls === 'none'
                            ? 'Bra början — samma lutning! Ändra nu <em>m</em>₂ tills den blir exakt lika med <em>m</em>₁ = ' + fmt(state.m1, 2) + '.'
                            : 'Ändra både <em>k</em>₂ och <em>m</em>₂ tills de blir exakt lika med linje 1: <em>k</em> = ' + fmt(state.k1, 2) + ', <em>m</em> = ' + fmt(state.m1, 2) + '.';
                    }
                }
                return;
            }

            if (cls === 'one') {
                var p = intersection();
                var outside = Math.abs(p.x) > XMAX + 1e-9 || Math.abs(p.y) > YMAX + 1e-9;
                note.style.color = COL.axis;
                note.innerHTML = outside
                    ? 'Skärningspunkten ligger utanför det synliga rutnätet, vid (' + fmtDisp(p.x, 2) + ', ' + fmtDisp(p.y, 2) + ') — pilen vid kanten pekar mot den.'
                    : 'En lösning — linjerna skär varandra i exakt en punkt.';
            } else if (cls === 'none') {
                note.innerHTML = 'Linjerna är parallella (samma <em>k</em>, olika <em>m</em>) — de möts aldrig. Systemet saknar lösning.';
            } else {
                note.style.color = COL.infinite;
                note.innerHTML = 'Linjerna sammanfaller helt (samma <em>k</em> och <em>m</em>) — varje punkt på linjen är en gemensam lösning till båda ekvationerna.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            formelSolution.style.display = state.step === 1 ? '' : 'none';
            verifyRow.style.display = state.step === 1 ? '' : 'none';
            formelAlgebra.style.display = state.step === 2 ? '' : 'none';
            actions.style.display = state.step === 3 ? '' : 'none';
            styleMissionBtn(missionNone, state.mission === 'olosligt');
            styleMissionBtn(missionInf, state.mission === 'oandligt');
            facitBtn.disabled = !state.mission;
            facitBtn.style.opacity = state.mission ? '1' : '0.5';
            facitBtn.style.cursor = state.mission ? 'pointer' : 'default';
            drawScene();
            updateFormulas();
            updateNote();
        }

        update();

        return {
            destroy: function () {
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-1.1'] = api;
    window.VISUALISERINGAR['ma2c-1.2'] = api;
    window.VISUALISERINGAR['ma2c-1.3'] = api;
    window.VISUALISERINGAR['ma2c-1.4'] = api;
})();

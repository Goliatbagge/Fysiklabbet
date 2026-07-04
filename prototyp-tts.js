// ============================================================
// PROTOTYP: uppläsning med talsyntes (Web Speech API)
// Del 1: LaTeX → svensk uppläsningstext
// Del 2: löptext-normalisering (enheter, index, ekvationsnummer)
// Del 3: meningsuppdelning
// Del 4: uppläsningsmotor (kö + highlight + speechSynthesis)
//
// Ren logik (del 1–3) är fri från DOM-beroenden och kan testas i Node.
// ============================================================

(function (root) {
    'use strict';

    // ---------- Ordlistor ----------

    // Storhetsnamn: symbol (ev. med subscript-nyckel "F_G") → namn.
    // Läses som "namnet symbolen": "effekten P", "tyngdkraften F G".
    const NAMN = {
        'P': 'effekten', 'U': 'spänningen', 'I': 'strömmen', 'R': 'resistansen',
        'E': 'energin', 'Q': 'laddningen', 't': 'tiden', 'm': 'massan',
        'a': 'accelerationen', 'v': 'hastigheten', 's': 'sträckan',
        'F': 'kraften', 'g': 'tyngdfaktorn', 'W': 'arbetet', 'V': 'volymen',
        'f': 'frekvensen', 'T': 'periodtiden', 'p': 'trycket', 'A': 'arean',
        'h': 'höjden', 'd': 'avståndet', 'l': 'hävarmen', 'M': 'kraftmomentet',
        'rho': 'densiteten', 'lambda': 'våglängden',
        'F_G': 'tyngdkraften', 'F_N': 'normalkraften', 'F_f': 'friktionskraften',
        'F_R': 'den resulterande kraften', 'F_S': 'spännkraften',
        'F_e': 'den elektriska kraften',
    };

    // Enheter i math-läge (\mathrm{...}/\text{...}), singularform.
    const ENHET = {
        'W': 'watt', 'kW': 'kilowatt', 'MW': 'megawatt', 'GW': 'gigawatt',
        'V': 'volt', 'kV': 'kilovolt', 'mV': 'millivolt',
        'A': 'ampere', 'mA': 'milliampere',
        'N': 'newton', 'kN': 'kilonewton',
        'J': 'joule', 'kJ': 'kilojoule', 'MJ': 'megajoule',
        'Wh': 'wattimme', 'kWh': 'kilowattimme',
        'm': 'meter', 'km': 'kilometer', 'dm': 'decimeter',
        'cm': 'centimeter', 'mm': 'millimeter', 'nm': 'nanometer',
        's': 'sekund', 'h': 'timme', 'min': 'minut',
        'kg': 'kilogram', 'g': 'gram', 'ton': 'ton',
        'Hz': 'hertz', 'kHz': 'kilohertz', 'MHz': 'megahertz',
        'Pa': 'pascal', 'kPa': 'kilopascal', 'hPa': 'hektopascal',
        'K': 'kelvin', 'C': 'coulomb', 'T': 'tesla', 'Wb': 'weber',
        'Ω': 'ohm', 'kΩ': 'kiloohm', 'MΩ': 'megaohm',
        'eV': 'elektronvolt', 'keV': 'kiloelektronvolt', 'MeV': 'megaelektronvolt',
        'mol': 'mol', '%': 'procent',
        '°C': 'grader Celsius', '°': 'grader',
        'm^2': 'kvadratmeter', 'm^3': 'kubikmeter',
        'cm^2': 'kvadratcentimeter', 'cm^3': 'kubikcentimeter', 'dm^3': 'kubikdecimeter',
        'vsv.': 'vilket skulle visas',
    };

    // Enheter i löptext efter mätetal, pluralform där svenskan böjer.
    const ENHET_TEXT = Object.assign({}, ENHET, {
        's': 'sekunder', 'h': 'timmar', 'min': 'minuter',
        'Wh': 'wattimmar', 'kWh': 'kilowattimmar',
        'm/s': 'meter per sekund', 'm/s²': 'meter per sekund i kvadrat',
        'km/h': 'kilometer i timmen', 'N/kg': 'newton per kilogram',
        'kg/m³': 'kilogram per kubikmeter', 'g/cm³': 'gram per kubikcentimeter',
        'm²': 'kvadratmeter', 'm³': 'kubikmeter',
        'cm²': 'kvadratcentimeter', 'cm³': 'kubikcentimeter', 'dm³': 'kubikdecimeter',
    });

    const GREKISKA = {
        'alpha': 'alfa', 'beta': 'beta', 'gamma': 'gamma', 'delta': 'delta',
        'Delta': 'delta', 'epsilon': 'epsilon', 'varepsilon': 'epsilon',
        'theta': 'teta', 'vartheta': 'teta', 'lambda': 'lambda', 'mu': 'my',
        'nu': 'ny', 'pi': 'pi', 'rho': 'rho', 'sigma': 'sigma', 'Sigma': 'summan av',
        'tau': 'tau', 'phi': 'fi', 'varphi': 'fi', 'omega': 'omega',
        'Omega': 'omega', 'eta': 'eta', 'kappa': 'kappa', 'psi': 'psi',
    };

    const FUNKTIONER = {
        'sin': 'sinus', 'cos': 'cosinus', 'tan': 'tangens',
        'ln': 'naturliga logaritmen av', 'lg': 'logaritmen av', 'log': 'logaritmen av',
    };

    const SIFFERORD = ['noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio'];

    // ---------- Del 1: LaTeX-tolk ----------

    function tokenize(src) {
        const toks = [];
        let i = 0;
        while (i < src.length) {
            const ch = src[i];
            if (ch === '\\') {
                const m = /^\\([a-zA-Z]+)/.exec(src.slice(i));
                if (m) { toks.push({ t: 'cmd', v: m[1] }); i += m[0].length; }
                else { toks.push({ t: 'cmd', v: src[i + 1] || '' }); i += 2; }
            } else if (ch === '{') {
                let depth = 1, j = i + 1;
                while (j < src.length && depth > 0) {
                    if (src[j] === '\\') j++;
                    else if (src[j] === '{') depth++;
                    else if (src[j] === '}') depth--;
                    j++;
                }
                toks.push({ t: 'grp', v: tokenize(src.slice(i + 1, j - 1)) });
                i = j;
            } else if (ch === '^' || ch === '_') {
                toks.push({ t: ch }); i++;
            } else if (ch === '&') {
                i++;
            } else if (/\s/.test(ch)) {
                toks.push({ t: 'sp' }); i++;
            } else {
                toks.push({ t: 'ch', v: ch }); i++;
            }
        }
        return toks;
    }

    // Rå textform av en tokenlista (för enhets-uppslagning i \mathrm{...})
    function rawText(toks) {
        let out = '';
        for (const tok of toks) {
            if (tok.t === 'ch') out += tok.v;
            else if (tok.t === 'sp') out += ' ';
            else if (tok.t === 'grp') out += rawText(tok.v);
            else if (tok.t === '^') out += '^';
            else if (tok.t === '_') out += '_';
            else if (tok.t === 'cmd') out += '\\' + tok.v;
        }
        return out.trim();
    }

    // Enhetsfras för innehållet i \mathrm{...}: "N/kg" → "newton per kilogram"
    function unitPhrase(raw) {
        raw = raw.replace(/\s+/g, '');
        if (ENHET[raw]) return ENHET[raw];
        const parts = raw.split('/');
        const spoken = parts.map((p) => {
            const sup = /^(.+)\^\{?(\d)\}?$/.exec(p);
            if (sup) {
                const base = ENHET[sup[1]] || sup[1];
                if (sup[2] === '2') return base === 'meter' ? 'kvadratmeter' : base + ' i kvadrat';
                if (sup[2] === '3') return base === 'meter' ? 'kubikmeter' : base + ' i kubik';
                return base + ' upphöjt till ' + sup[2];
            }
            return ENHET[p] || p;
        });
        return spoken.join(' per ');
    }

    function subSpoken(raw) {
        // Subscript: siffror → sifferord, bokstäver/ord läses som de är
        if (/^\d+$/.test(raw)) {
            return raw.split('').map((d) => SIFFERORD[+d]).join(' ');
        }
        return raw.replace(/\\(text|mathrm|mathit)/g, '').replace(/[{}]/g, '');
    }

    function supSpoken(raw, renderInner) {
        if (raw === '2') return 'i kvadrat';
        if (raw === '3') return 'i kubik';
        if (raw === '\\circ' || raw === 'circ') return 'grader';
        let inner = renderInner();
        inner = inner.replace(/^\s*(-|−|minus)\s*/, 'minus ');
        return 'upphöjt till ' + inner;
    }

    // Huvudrenderare: tokenlista → svensk text.
    // ctx: { names: bool, said: Set, eqCount: int }
    function renderToks(toks, ctx) {
        const out = [];
        let i = 0;

        const nextArg = () => {
            // Hoppa över blanksteg, returnera nästa grupp/token som tokenlista
            while (i < toks.length && toks[i].t === 'sp') i++;
            const tok = toks[i];
            if (!tok) return [];
            i++;
            if (tok.t === 'grp') return tok.v;
            return [tok];
        };

        const peekIs = (t) => {
            let j = i;
            while (j < toks.length && toks[j].t === 'sp') j++;
            return toks[j] && toks[j].t === t ? j : -1;
        };

        while (i < toks.length) {
            const tok = toks[i];

            if (tok.t === 'sp') { i++; continue; }

            if (tok.t === 'cmd') {
                const c = tok.v;
                i++;
                if (c === 'frac' || c === 'dfrac' || c === 'tfrac') {
                    const a = renderToks(nextArg(), ctx);
                    const b = renderToks(nextArg(), ctx);
                    out.push(a + ' delat med ' + b);
                } else if (c === 'sqrt') {
                    // Ev. rotindex [n]
                    let idx = null;
                    if (toks[i] && toks[i].t === 'ch' && toks[i].v === '[') {
                        i++; idx = '';
                        while (toks[i] && !(toks[i].t === 'ch' && toks[i].v === ']')) {
                            idx += toks[i].v || ''; i++;
                        }
                        i++;
                    }
                    const arg = renderToks(nextArg(), ctx);
                    const prefix = idx === '3' ? 'tredje roten ur' : idx ? idx + ':e roten ur' : 'roten ur';
                    out.push(prefix + ' ' + arg);
                } else if (c === 'cdot' || c === 'times') {
                    out.push('gånger');
                } else if (c === 'text' || c === 'mathrm' || c === 'textrm' || c === 'operatorname') {
                    const raw = rawText(nextArg());
                    out.push(unitPhrase(raw));
                } else if (c === 'mathit') {
                    out.push(renderToks(nextArg(), ctx));
                } else if (c === 'approx') {
                    out.push(ctx.eqCount++ === 0 ? 'är ungefär lika med' : 'som är ungefär lika med');
                } else if (c === 'Leftrightarrow' || c === 'iff') {
                    out.push('vilket är ekvivalent med att'); ctx.eqCount = 0;
                } else if (c === 'Rightarrow' || c === 'implies') {
                    out.push('vilket ger att'); ctx.eqCount = 0;
                } else if (c === 'propto') {
                    out.push('är proportionell mot');
                } else if (c === 'leq' || c === 'le') {
                    out.push('är mindre än eller lika med');
                } else if (c === 'geq' || c === 'ge') {
                    out.push('är större än eller lika med');
                } else if (c === 'neq' || c === 'ne') {
                    out.push('är inte lika med');
                } else if (c === 'pm') {
                    out.push('plus minus');
                } else if (FUNKTIONER[c]) {
                    out.push(FUNKTIONER[c]);
                } else if (GREKISKA[c]) {
                    // Grekisk bokstav kan vara en namngiven storhet (rho, lambda)
                    out.push(variabel(GREKISKA[c], c, ctx));
                } else if (c === 'quad' || c === 'qquad' || c === ',' || c === ';' || c === ' ' || c === '!') {
                    out.push(' '); // tunn paus-markör, städas senare
                } else if (c === '\\') {
                    out.push(', '); // radbrytning i aligned → kort paus
                } else if (c === 'left' || c === 'right' || c === 'begin' || c === 'end' ||
                           c === 'displaystyle' || c === 'limits') {
                    if (c === 'begin' || c === 'end') nextArg(); // släng {aligned}
                } else if (c === '%') {
                    out.push('procent');
                } else if (c === 'degree') {
                    out.push('grader');
                } else if (c === 'infty') {
                    out.push('oändligheten');
                } else {
                    // Okänt kommando: läs namnet rakt av (bättre än tystnad)
                    out.push(c);
                }
                continue;
            }

            if (tok.t === 'grp') {
                out.push(renderToks(tok.v, ctx));
                i++;
                continue;
            }

            if (tok.t === '^') {
                i++;
                const arg = nextArg();
                const raw = rawText(arg);
                out.push(supSpoken(raw, () => renderToks(arg, ctx)));
                continue;
            }

            if (tok.t === '_') {
                // Subscript utan föregående variabel (bör inte hända) — läs ändå
                i++;
                out.push(subSpoken(rawText(nextArg())));
                continue;
            }

            // Vanliga tecken
            const ch = tok.v;

            if (/\d/.test(ch)) {
                // Samla ihop hela talet, inkl. decimalkomma {,} (redan "," här)
                let num = ch; i++;
                while (i < toks.length) {
                    const t2 = toks[i];
                    if (t2.t === 'ch' && /\d/.test(t2.v)) { num += t2.v; i++; }
                    else if (t2.t === 'ch' && t2.v === ',' &&
                             toks[i + 1] && toks[i + 1].t === 'ch' && /\d/.test(toks[i + 1].v)) {
                        num += ','; i++;
                    } else if (t2.t === 'grp' && rawText(t2.v) === ',') {
                        // KaTeX-decimalkomma {,}
                        num += ','; i++;
                    } else break;
                }
                out.push(num);
                continue;
            }

            if (/[a-zA-ZåäöÅÄÖ]/.test(ch)) {
                // Variabel — kolla efter subscript
                i++;
                let key = ch, spoken = ch;
                const subAt = peekIs('_');
                if (subAt >= 0) {
                    i = subAt + 1;
                    const raw = rawText(nextArg());
                    key = ch + '_' + raw;
                    spoken = ch + ' ' + subSpoken(raw);
                }
                out.push(variabel(spoken, key, ctx));
                continue;
            }

            i++;
            if (ch === '=') {
                out.push(ctx.eqCount++ === 0 ? 'är lika med' : 'som är lika med');
            } else if (ch === '+') out.push('plus');
            else if (ch === '-' || ch === '−') out.push('minus');
            else if (ch === '/') out.push('delat med');
            else if (ch === '(') {
                // Ekvationsnummer "(5)" → "ekvation 5"
                const m = ekvNummer(toks, i);
                if (m) { out.push(', ekvation ' + m.num); i = m.next; }
                else out.push('parentesen');
            }
            else if (ch === ')') out.push('slut parentes');
            else if (ch === '<') out.push('är mindre än');
            else if (ch === '>') out.push('är större än');
            else if (ch === ',') out.push(',');
            else if (ch === '.') out.push('.');
            else if (ch === '°') out.push('grader');
            else if (ch === '%') out.push('procent');
            else if (ch === '·' || ch === '×') out.push('gånger');
            else if (ch === '≈') out.push(ctx.eqCount++ === 0 ? 'är ungefär lika med' : 'som är ungefär lika med');
            else if (ch === '[' || ch === ']') { /* tyst */ }
            else out.push(ch);
        }

        return out.join(' ')
            .replace(/ /g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\s+([,.])/g, '$1')
            .trim();
    }

    function ekvNummer(toks, i) {
        // Matchar siffror följt av ")" — dvs. "(5)" i härledningar
        let j = i, num = '';
        while (j < toks.length && toks[j].t === 'sp') j++;
        while (j < toks.length && toks[j].t === 'ch' && /\d/.test(toks[j].v)) { num += toks[j].v; j++; }
        while (j < toks.length && toks[j].t === 'sp') j++;
        if (num && toks[j] && toks[j].t === 'ch' && toks[j].v === ')') {
            return { num, next: j + 1 };
        }
        return null;
    }

    function variabel(spoken, key, ctx) {
        if (ctx.names && NAMN[key] && !ctx.said.has(key)) {
            ctx.said.add(key);
            return NAMN[key] + ' ' + spoken;
        }
        return spoken;
    }

    // Publikt API: LaTeX-sträng → uppläsningstext.
    // opts.names — sätt storhetsnamn framför kända symboler ("effekten P")
    function latexToSpeech(latex, opts) {
        opts = opts || {};
        let src = String(latex)
            .replace(/\\\s*\n/g, ' ')
            .replace(/\\(?:,|;|!)/g, ' ')       // tunna mellanrum
            .replace(/\{,\}/g, ',')             // decimalkomma {,} → ,
            .replace(/~|\\ /g, ' ');
        const ctx = { names: !!opts.names, said: new Set(), eqCount: 0 };
        return renderToks(tokenize(src), ctx);
    }

    // ---------- Del 2: löptext-normalisering ----------

    const SUB_UNI = { '₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9 };

    // Sorterade längst-först så "kWh" matchar före "W"
    const UNIT_KEYS = Object.keys(ENHET_TEXT).sort((a, b) => b.length - a.length)
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const UNIT_AFTER_NUM = new RegExp(
        '(\\d(?:[\\d ]|,\\d)*)[  ]?(' + UNIT_KEYS.join('|') + ')(?![a-zA-Zåäö²³%°])', 'g');
    const UNIT_IN_PAREN = new RegExp('\\((' + UNIT_KEYS.join('|') + ')\\)', 'g');

    function expandPlainText(text) {
        let s = String(text).replace(/ /g, ' ');
        // Unicode-subscript: v₀ → "v noll"
        s = s.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => ' ' + SIFFERORD[SUB_UNI[c]]);
        // Ensam enhet i parentes: "(W)" → "(watt)"
        s = s.replace(UNIT_IN_PAREN, (_, u) => '(' + ENHET_TEXT[u] + ')');
        // Mätetal + enhet: "75 W" → "75 watt"
        s = s.replace(UNIT_AFTER_NUM, (_, n, u) => n + ' ' + ENHET_TEXT[u]);
        // Ekvationsreferenser: "(5)" → "ekvation 5"
        s = s.replace(/\((\d{1,2})\)/g, 'ekvation $1');
        // Lösa operatorer i löptext
        s = s.replace(/ = /g, ' är lika med ')
             .replace(/ ≈ /g, ' är ungefär lika med ')
             .replace(/ · /g, ' gånger ')
             .replace(/(\d) ?% /g, '$1 procent ')
             .replace(/(\d)°/g, '$1 grader')
             .replace(/→/g, ' ger ');
        return s.replace(/\s+/g, ' ').trim();
    }

    // ---------- Del 3: meningsuppdelning ----------

    const FORKORTNINGAR = [
        't.ex.', 'bl.a.', 'dvs.', 'osv.', 'm.m.', 's.k.', 'ca.', 'etc.',
        'resp.', 'jfr.', 'fig.', 'ekv.', 'kap.', 'st.', 'nr.', 'obs.', 'p.g.a.', 'm.h.a.',
    ];

    function splitSentences(text) {
        let s = String(text);
        // Skydda förkortningarnas punkter
        FORKORTNINGAR.forEach((f, idx) => {
            const safe = f.replace(/\./g, '' + idx + '');
            s = s.split(f).join(safe);
        });
        // Dela på . ! ? följt av mellanslag + versal/siffra
        const parts = s.split(/(?<=[.!?])\s+(?=[A-ZÅÄÖ0-9])/);
        return parts
            .map((p) => {
                FORKORTNINGAR.forEach((f, idx) => {
                    p = p.split('' + idx + '').join('.');
                });
                return p.trim();
            })
            .filter((p) => p.length > 1);
    }

    // ---------- Del 4: uppläsningsmotor (endast i webbläsare) ----------

    function Upplasare(opts) {
        this.opts = opts || {};
        this.queue = [];        // [{ el, text, isFormula }]
        this.index = -1;
        this.playing = false;
        this.paused = false;
        this.voice = null;
        this.rate = 1;
        this.onChange = opts.onChange || function () {};
    }

    // Bygg uppläsningskön från en renderad artikel-DOM
    Upplasare.prototype.build = function (article, speechOpts) {
        this.stop();
        const items = [];
        const blocks = article.querySelectorAll('h1, h2, h3, h4, p, li, .lab-block-title');
        blocks.forEach((el) => {
            if (el.closest('.katex')) return;
            if (el.tagName === 'P' && el.parentElement && el.parentElement.tagName === 'LI') return;
            const isFormula = !!el.querySelector('.katex-display');
            const text = getSpeechText(el, speechOpts);
            if (!text) return;
            const sentences = isFormula ? [text] : splitSentences(text);
            sentences.forEach((sen) => items.push({ el, text: sen, isFormula }));
        });
        this.queue = items;
        this.index = -1;
        this.onChange();
        return items;
    };

    function getSpeechText(el, opts) {
        const clone = el.cloneNode(true);
        clone.querySelectorAll('svg').forEach((n) => n.remove());
        // Formler: ersätt varje KaTeX-span med talad text från TeX-annotationen
        clone.querySelectorAll('.katex').forEach((k) => {
            const ann = k.querySelector('annotation[encoding="application/x-tex"]');
            const spoken = ann ? latexToSpeech(ann.textContent, opts) : '';
            k.replaceWith(document.createTextNode(' ' + spoken + ' '));
        });
        // Kvarvarande <sup> (10<sup>-27</sup> från preprocessSuperscripts)
        clone.querySelectorAll('sup').forEach((sup) => {
            const t = sup.textContent.replace(/^[-−]/, 'minus ');
            sup.replaceWith(document.createTextNode(
                t === '2' ? ' i kvadrat' : t === '3' ? ' i kubik' : ' upphöjt till ' + t));
        });
        return expandPlainText(clone.textContent);
    }

    Upplasare.prototype.play = function (fromIndex) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        this.index = (typeof fromIndex === 'number') ? fromIndex : Math.max(this.index, 0);
        this.playing = true;
        this.paused = false;
        this._speakCurrent();
        this.onChange();
    };

    Upplasare.prototype._speakCurrent = function () {
        const self = this;
        if (!this.playing || this.index >= this.queue.length) {
            this.playing = false;
            this._highlight(-1);
            this.onChange();
            return;
        }
        const item = this.queue[this.index];
        this._highlight(this.index);
        const u = new SpeechSynthesisUtterance(item.text);
        u.lang = 'sv-SE';
        if (this.voice) u.voice = this.voice;
        u.rate = this.rate;
        u.onend = function () {
            if (!self.playing) return;
            self.index++;
            self._speakCurrent();
        };
        u.onerror = function (e) {
            // "interrupted"/"canceled" kommer vid stop() — ignorera
            if (e.error === 'interrupted' || e.error === 'canceled') return;
            self.playing = false;
            self.onChange();
        };
        window.speechSynthesis.speak(u);
        this.onChange();
    };

    Upplasare.prototype.pause = function () {
        if (!this.playing) return;
        window.speechSynthesis.pause();
        this.paused = true;
        this.onChange();
    };

    Upplasare.prototype.resume = function () {
        if (!this.paused) return;
        window.speechSynthesis.resume();
        this.paused = false;
        this.onChange();
    };

    Upplasare.prototype.stop = function () {
        this.playing = false;
        this.paused = false;
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        this._highlight(-1);
        this.index = -1;
        this.onChange();
    };

    Upplasare.prototype._highlight = function (idx) {
        this.queue.forEach(function (item) { item.el.classList.remove('tts-current'); });
        if (idx >= 0 && this.queue[idx]) {
            const el = this.queue[idx].el;
            el.classList.add('tts-current');
            el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        this.currentIndex = idx;
    };

    // ---------- Export ----------

    const api = { latexToSpeech, expandPlainText, splitSentences, Upplasare, NAMN, ENHET_TEXT };

    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.TTSPROTO = api;

})(typeof window !== 'undefined' ? window : globalThis);

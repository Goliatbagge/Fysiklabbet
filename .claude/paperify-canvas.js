#!/usr/bin/env node
// paperify-canvas.js — konvertera mörka inline-styles och canvas-färger
// till pappersmotsvarigheter i simuleringsfilerna.
//
// Detta är steg 3 ovanpå migrate-navbar + migrate-labsim. Det förvandlar
// själva visualiseringens inre — JSX inline-styles, SVG-attribut och vanliga
// canvas-fillStyle/strokeStyle-värden — från dark-mode till paper-mode.
//
// Användning:
//   node .claude/paperify-canvas.js fil.html [...]
//   node .claude/paperify-canvas.js --all      (alla fysik1-*.html / fysik2-*.html)
//   node .claude/paperify-canvas.js --dry-run --all  (visa diff utan att skriva)
//
// Idempotent — säkert att köra flera gånger.
//
// SPACE_FILES (samma lista som i migrate-labsim.js) lämnas orörda.

const fs = require('fs');
const path = require('path');

const SPACE_FILES = new Set([
    'fysik1-newtons-gravitationslag.html',
    'fysik1-newtons-tredje-app.html',
    'fysik1-tyngdfaktor-jorden.html',
    'fysik2-rorelse.html',
    'fysik2-rorelse-app.html',
    'fysik2-rorelse-wrapper.html',
    'fysik2-spektrallinjer.html',
    'fysik2-energinivaer.html',
    'fysik2-manens-faser.html',
    'fysik2-solens-farg.html',
    'fysik2-wiens-lag.html',
    'fysik2-em-stralning.html',
]);

// Färgkartor — semantiska översättningar
// Dessa körs på hela filtexten (HTML/JSX/JS) som plain text-replacements.
// Använder ord-/citationsgränser för att inte träffa partial substrings.

// Mörka bakgrunder (dark mode wrapper-paneler) — översätt till papper.
// Yttre wrappers blir transparent (body = vit), inre paneler får
// var(--lab-bg) (papperskräm).
const DARK_BACKGROUNDS = {
    '#0F172A': 'transparent',     // slate-950 — yttre wrapper, släpp igenom body=vit
    '#0f172a': 'transparent',
    '#1E293B': 'var(--lab-bg)',   // slate-800 — panel → papper
    '#1e293b': 'var(--lab-bg)',
    '#0B1120': 'transparent',
    '#0b1120': 'transparent',
    '#0a0f1e': 'transparent',
    '#020617': 'transparent',     // slate-950
    '#111827': 'var(--lab-bg)',   // gray-900 panel → papper
    '#1F2937': 'var(--lab-bg)',   // gray-800 panel → papper
    '#1f2937': 'var(--lab-bg)',
    '#334155': 'var(--lab-bg)',   // slate-700
};

// Ljus text-färger (designade för mörk bg) → papper-ink
const DARK_MODE_TEXT = {
    '#E2E8F0': '#0f1620',  // slate-200 — primary (literal hex; canvas fillStyle kan inte parsea CSS-vars)
    '#e2e8f0': '#0f1620',
    '#F1F5F9': '#0f1620',  // slate-100
    '#f1f5f9': '#0f1620',
    '#CBD5E1': '#3a4151',  // slate-300 — secondary
    '#cbd5e1': '#3a4151',
    '#94A3B8': '#5a6170',  // slate-400 — muted
    '#94a3b8': '#5a6170',
};

// Cyan/blå accenter (för dark mode glow) → röd Laborans-accent
// OBS: dessa appliceras BARA på color (text), inte fill/stroke som kan vara
// pedagogiskt semantiska (t.ex. vatten, ström, ljus). Återställ-knappar med
// dessa som backgroundColor får också accent-färgen.
const CYAN_ACCENT_TEXT = {
    '#67E8F9': 'var(--lab-accent)',  // cyan-300 → Laborans röd
    '#67e8f9': 'var(--lab-accent)',
    '#22D3EE': 'var(--lab-accent)',  // cyan-400
    '#22d3ee': 'var(--lab-accent)',
    '#06B6D4': 'var(--lab-line-strong)',  // cyan-500 — som border under rubriker → neutral linje
    '#06b6d4': 'var(--lab-line-strong)',
};
// Cyan/blå button-backgrounds → röd accent
const CYAN_BUTTON_BG = {
    '#0891B2': 'var(--lab-accent)',
    '#0891b2': 'var(--lab-accent)',
    '#0E7490': '#ad2b41',   // hover-mörkare av accent
    '#0e7490': '#ad2b41',
};

function applyReplacements(content, baseName) {
    let out = content;

    // 0a. Strippa dark Tailwind bg-klasser från <body>-elementet.
    //    Dessa skapar mörk bakgrund på hela sidan som överrider body.lab-sim.
    out = out.replace(/<body([^>]*)>/, (match, attrs) => {
        if (!/\sclass=/.test(attrs)) return match;
        return match.replace(/\sclass="([^"]*)"/, (m, cls) => {
            const cleaned = cls.split(/\s+/)
                .filter(c => !/^bg-(slate|gray|zinc|neutral|stone|black)-(8|9)\d{2}$/.test(c))
                .filter(c => !/^text-(slate|gray|zinc|neutral|stone)-(1|2|3)\d{2}$/.test(c))
                .join(' ');
            return ` class="${cleaned}"`;
        });
    });

    // 0b. Dark gradienter på outer wrappers → transparent (släpp igenom body=vit)
    //    Matchar JSX-inline background med linear-gradient som innehåller mörka hex.
    const darkGradientRe = /(background:\s*['"`])linear-gradient\([^'"`]*?#[01][0-9a-fA-F]{5}[^'"`]*?\)(['"`])/g;
    out = out.replace(darkGradientRe, (match, prefix, suffix) => {
        // Endast ersätt om gradienten är till MAJORITET mörk (alla stops mörka)
        const hexes = match.match(/#[0-9a-fA-F]{3,6}/g) || [];
        const darkCount = hexes.filter(h => {
            const v = h.length === 4
                ? parseInt(h.slice(1).split('').map(c => c+c).join(''), 16)
                : parseInt(h.slice(1), 16);
            const r = (v >> 16) & 0xff, g = (v >> 8) & 0xff, b = v & 0xff;
            return (0.299*r + 0.587*g + 0.114*b) < 80;
        }).length;
        if (darkCount >= hexes.length * 0.6) {
            return `${prefix}transparent${suffix}`;
        }
        return match;
    });
    // Samma sak för backgroundColor: och CSS-syntax i template literals
    const darkGradientRe2 = /(backgroundColor:\s*['"`])linear-gradient\([^'"`]*?#[01][0-9a-fA-F]{5}[^'"`]*?\)(['"`])/g;
    out = out.replace(darkGradientRe2, `$1transparent$2`);

    // 1. JSX inline backgroundColor — semantisk översättning
    for (const [from, to] of Object.entries(DARK_BACKGROUNDS)) {
        // Endast i JSX-style-context: backgroundColor: '#XXX'
        const re = new RegExp(`(backgroundColor:\\s*['"\`])${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re, `$1${to}$2`);
        // background: '#XXX' utan -Color
        const re2 = new RegExp(`(background:\\s*['"\`])${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re2, `$1${to}$2`);
    }

    // 1b. Generisk regel: ANY JSX inline background: '#XXX' eller backgroundColor:
    //     med mörkt hex (luminans < 60) → var(--lab-bg) cream papper.
    //     Detta fångar udda värden som #050510, #0a1424, m.fl. som inte
    //     finns i DARK_BACKGROUNDS-mappen.
    const genericDarkRe = /((?:background|backgroundColor):\s*['"`])(#[0-9a-fA-F]{3,6})(['"`])/g;
    out = out.replace(genericDarkRe, (match, prefix, hex, suffix) => {
        if (isDarkHex(hex)) {
            return `${prefix}var(--lab-bg)${suffix}`;
        }
        return match;
    });

    // 1b2. Canvas-ritning: ctx.fillStyle = '#XXX' / ctx.strokeStyle = '#XXX'
    //      med mörkt hex → papper-kräm (#f3eee4 = --lab-bg literal).
    //      Vi använder literal hex eftersom canvas inte tolkar CSS-variabler.
    //      OBS: skippa våra egna output-värden så scriptet förblir idempotent.
    //      OBS: Rader med `// keep-dark` skippas (detektorskärm, m.fl. där
    //      mörk bg är semantisk).
    // Canvas-cyan-färger (axlar, labels) → ink. Användaren föredrar svart text/axlar.
    const CANVAS_CYAN_TO_INK = new Set([
        '#38bdf8', '#38BDF8',  // sky-400
        '#7dd3fc', '#7DD3FC',  // sky-300
        '#0ea5e9', '#0EA5E9',  // sky-500
        '#67e8f9', '#67E8F9',  // cyan-300
        '#22d3ee', '#22D3EE',  // cyan-400
        '#94a3b8', '#94A3B8',  // slate-400 (när använt som canvas-text → ink-soft)
    ]);
    // Rad-baserad: respektera `// keep-dark`-markering så att t.ex. detektorskärmar
    // i kvantfys-sims kan ha svart bg medan resten av sidan blir papper.
    const canvasFillRe = /((?:fillStyle|strokeStyle)\s*=\s*['"`])(#[0-9a-fA-F]{3,6})(['"`])([^\n]*)/g;
    out = out.replace(canvasFillRe, (match, prefix, hex, suffix, rest) => {
        if (/\/\/\s*keep-dark/i.test(rest)) return match;
        if (isOurOutputColor(hex)) return match;
        if (isDarkHex(hex)) {
            return `${prefix}#f3eee4${suffix}${rest}`;
        }
        if (CANVAS_CYAN_TO_INK.has(hex)) {
            return `${prefix}#0f1620${suffix}${rest}`;
        }
        if (isLightTextHex(hex)) {
            return `${prefix}#0f1620${suffix}${rest}`;
        }
        return match;
    });

    // 1b2b. Inline JSX styling med cyan/blue rgba-tints (knappar designade för
    //       dark mode med ljusblå accent). På papper: byt till papper-tint.
    //       rgba(56,189,248,X) = cyan-400, (14,165,233,X) = sky-500,
    //       (59,130,246,X) = blue-500. Alla → accent-röd.
    out = out.replace(/rgba\(\s*56\s*,\s*189\s*,\s*248\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => `rgba(200, 50, 74, ${alpha})`);
    out = out.replace(/rgba\(\s*14\s*,\s*165\s*,\s*233\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => `rgba(200, 50, 74, ${alpha})`);
    out = out.replace(/rgba\(\s*59\s*,\s*130\s*,\s*246\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => `rgba(200, 50, 74, ${alpha})`);
    out = out.replace(/rgba\(\s*125\s*,\s*211\s*,\s*252\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => `rgba(200, 50, 74, ${alpha})`);
    // 1b2c. Ljus neutral grå rgba (slate-400 designat för dark mode) → mörk ink rgba.
    //       Användes för subtle labels på dark bg — på papper blir de osynliga.
    //       rgba(148, 163, 184, X) = slate-400 → ink med bumpad alpha.
    out = out.replace(/rgba\(\s*148\s*,\s*163\s*,\s*184\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => {
            const a = Math.min(parseFloat(alpha) * 1.4, 1).toFixed(2);
            return `rgba(15, 22, 32, ${a})`;
        });
    // rgba(203, 213, 225, X) = slate-300 → ink
    out = out.replace(/rgba\(\s*203\s*,\s*213\s*,\s*225\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => `rgba(15, 22, 32, ${Math.min(parseFloat(alpha) * 1.4, 1).toFixed(2)})`);
    // rgba(226, 232, 240, X) = slate-200 → ink
    out = out.replace(/rgba\(\s*226\s*,\s*232\s*,\s*240\s*,\s*([\d.]+)\s*\)/g,
        (m, alpha) => `rgba(15, 22, 32, ${Math.min(parseFloat(alpha) * 1.4, 1).toFixed(2)})`);
    // Inline color: '#38bdf8'/'#7dd3fc' → ink (svart) för JSX inline text.
    // Användaren föredrar svart text på papper — accent reserveras för
    // action-knappar och aktiva tabbar.
    out = out.replace(/(color:\s*['"`])(#38bdf8|#38BDF8|#7dd3fc|#7DD3FC|#0ea5e9|#0EA5E9)(['"`])/g,
        '$1#0f1620$3');
    // Ternary-värden i color-context: t.ex. `color: foo ? 'X' : '#38bdf8'`.
    // Begränsa till samma rad som "color:" för att inte träffa fill/stroke.
    out = out.replace(/(color:[^,;\n]*?['"`])(#38bdf8|#38BDF8|#7dd3fc|#7DD3FC|#0ea5e9|#0EA5E9)(['"`])/g,
        '$1#0f1620$3');
    out = out.replace(/(color:[^,;\n]*?\?[^:]*?:[^,;\n]*?['"`])(#38bdf8|#38BDF8|#7dd3fc|#7DD3FC|#0ea5e9|#0EA5E9)(['"`])/g,
        '$1#0f1620$3');

    // 1b3. Canvas-gradient stops: addColorStop(N, '#XXX') med mörkt hex
    //      → papper. Hanterar radial/linear gradients som ritar canvas-bg.
    const colorStopRe = /(addColorStop\(\s*[\d.]+\s*,\s*['"`])(#[0-9a-fA-F]{3,6})(['"`]\s*\))/g;
    out = out.replace(colorStopRe, (match, prefix, hex, suffix) => {
        if (isDarkHex(hex)) {
            return `${prefix}#f3eee4${suffix}`;
        }
        return match;
    });

    // 1b4. Three.js renderer/scene-bakgrunder: setClearColor / scene.background
    //      Hanterar 0xRRGGBB-värden för mörka färger.
    const threeColorRe = /(setClearColor\(\s*0x|new\s+THREE\.Color\(\s*0x|scene\.background\s*=\s*new\s+THREE\.Color\(\s*0x|fog\s*=\s*new\s+THREE\.Fog\(\s*0x|fog\.color\.setHex\(\s*0x)([0-9a-fA-F]{6})/g;
    out = out.replace(threeColorRe, (match, prefix, hex) => {
        if (isDarkHex('#' + hex)) {
            // 0xf3eee4 = papper-kräm
            return `${prefix}f3eee4`;
        }
        return match;
    });

    // 1b5. THREE-färger som hex-strängar: new THREE.Color('#XXX')
    const threeStringRe = /(new\s+THREE\.Color\(\s*['"`])(#[0-9a-fA-F]{3,6})(['"`]\s*\))/g;
    out = out.replace(threeStringRe, (match, prefix, hex, suffix) => {
        if (isDarkHex(hex)) {
            return `${prefix}#f3eee4${suffix}`;
        }
        return match;
    });

    // 1c. CSS-block (inom <style>): bg-värden som är mörka hex → var(--lab-bg)
    //     Hanterar t.ex. background: #050510 i CSS-regler.
    out = out.replace(
        /(\bbackground(?:-color)?\s*:\s*)(#[0-9a-fA-F]{3,6})\s*;/g,
        (match, prefix, hex) => {
            if (isDarkHex(hex)) {
                return `${prefix}var(--lab-bg);`;
            }
            return match;
        }
    );

    // 2. JSX inline color: '#XXX' — ljus text → papper-ink
    for (const [from, to] of Object.entries(DARK_MODE_TEXT)) {
        const re = new RegExp(`(color:\\s*['"\`])${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re, `$1${to}$2`);
    }
    // JSX color: 'white' / 'White' — vit text på panel → papper-ink
    out = out.replace(/(color:\s*['"`])(?:white|White|WHITE|#fff|#FFF|#ffffff|#FFFFFF)(['"`])/g, '$1var(--lab-ink)$2');

    // 3. Cyan-accenter (text) → röd Laborans-accent
    for (const [from, to] of Object.entries(CYAN_ACCENT_TEXT)) {
        const re = new RegExp(`(color:\\s*['"\`])${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re, `$1${to}$2`);
    }
    // Cyan-accenter (borderBottom etc.) → neutral linje
    for (const [from, to] of Object.entries(CYAN_ACCENT_TEXT)) {
        if (!to.includes('lab-line')) continue;
        // borderBottom: '2px solid #06B6D4'
        const re = new RegExp(`(border(?:Bottom|Top|Left|Right)?:\\s*['"\`][^'"\`]*?\\s)${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re, `$1${to}$2`);
    }

    // 4. Cyan-button-backgrounds (Återställ-knappar med #0891B2 etc.) → accent
    for (const [from, to] of Object.entries(CYAN_BUTTON_BG)) {
        const re = new RegExp(`(backgroundColor:\\s*['"\`])${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re, `$1${to}$2`);
        // onMouseOver/Out e.target.style.backgroundColor = '#XXX'
        const re2 = new RegExp(`(style\\.backgroundColor\\s*=\\s*['"\`])${escapeRe(from)}(['"\`])`, 'g');
        out = out.replace(re2, `$1${to}$2`);
    }

    // 5. Inline HTML style="color:#xxx" (samma färger)
    for (const [from, to] of Object.entries(DARK_MODE_TEXT)) {
        const re = new RegExp(`(style="[^"]*color:\\s*)${escapeRe(from)}([^"]*")`, 'gi');
        out = out.replace(re, `$1${to}$2`);
    }

    // 6. SVG inline fill/stroke-attribut för text/etiketter med ljusa färger
    //    (svg-text designad för mörk bg ska bli mörk på papper).
    //    Använder hex-värden eftersom SVG-attribut inte kan ha CSS-variabler.
    const SVG_TEXT_OVERRIDES = {
        '#E2E8F0': '#0f1620',  // → --lab-ink (svart)
        '#e2e8f0': '#0f1620',
        '#F1F5F9': '#0f1620',
        '#f1f5f9': '#0f1620',
        '#CBD5E1': '#3a4151',  // → --lab-ink-soft
        '#cbd5e1': '#3a4151',
        '#94A3B8': '#5a6170',  // → --lab-ink-muted
        '#94a3b8': '#5a6170',
        // Cyan-accenter i SVG (axlar, axel-etiketter, värdetexter m.m.) → svart
        // Användaren föredrar svart text på papper — accent reserveras för
        // primary-knappar och aktiva tabbar, inte för text/axlar.
        '#67E8F9': '#0f1620',
        '#67e8f9': '#0f1620',
        '#22D3EE': '#0f1620',
        '#22d3ee': '#0f1620',
        '#38BDF8': '#0f1620',
        '#38bdf8': '#0f1620',
    };
    for (const [from, to] of Object.entries(SVG_TEXT_OVERRIDES)) {
        const reFill = new RegExp(`(fill=")${escapeRe(from)}(")`, 'g');
        out = out.replace(reFill, `$1${to}$2`);
        const reStroke = new RegExp(`(stroke=")${escapeRe(from)}(")`, 'g');
        out = out.replace(reStroke, `$1${to}$2`);
    }

    // 6b. GENERISK: ALL SVG fill=/stroke= med mörkt hex → cream papper.
    //     Detta fångar t.ex. <rect fill="#050510"> som inte är i SVG_TEXT_OVERRIDES.
    //     Använder isDarkHex så endast riktigt mörka värden konverteras.
    out = out.replace(/(fill=")(#[0-9a-fA-F]{3,6})(")/g, (match, prefix, hex, suffix) => {
        if (isOurOutputColor(hex)) return match;
        if (isDarkHex(hex)) return `${prefix}#f3eee4${suffix}`;
        return match;
    });
    out = out.replace(/(stroke=")(#[0-9a-fA-F]{3,6})(")/g, (match, prefix, hex, suffix) => {
        if (isOurOutputColor(hex)) return match;
        if (isDarkHex(hex)) return `${prefix}#f3eee4${suffix}`;
        return match;
    });

    // 6c. SVG fill="rgba(R,G,B,α)" där rgb är mörk slate → cream papper.
    //     Fångar t.ex. <rect fill="rgba(15, 23, 42, 0.8)"> (slate-900).
    out = out.replace(/(fill=")rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)(")/g,
        (match, prefix, r, g, b, suffix) => {
            const lum = 0.299 * +r + 0.587 * +g + 0.114 * +b;
            if (lum < 60) return `${prefix}#f3eee4${suffix}`;
            return match;
        });
    out = out.replace(/(stroke=")rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)(")/g,
        (match, prefix, r, g, b, suffix) => {
            const lum = 0.299 * +r + 0.587 * +g + 0.114 * +b;
            if (lum < 60) return `${prefix}rgba(15, 22, 32, 0.3)${suffix}`;
            return match;
        });

    // 7. SVG/Tailwind hårdkodade dark panel-fills (sällan men förekommer)
    //    Endast för rena #1E293B / #0F172A som hårdkodad SVG-fill
    const SVG_DARK_PANEL = { '#1E293B': '#e4dac6', '#1e293b': '#e4dac6' };
    for (const [from, to] of Object.entries(SVG_DARK_PANEL)) {
        const reFill = new RegExp(`(fill=")${escapeRe(from)}(")`, 'g');
        out = out.replace(reFill, `$1${to}$2`);
    }

    // 6. Canvas-fillStyle/strokeStyle med kända dark hex → papper.
    //    OBS: Respekterar `// keep-dark`-markering. För rader med "keep-dark"
    //    kommentar: behåll det mörka värdet (semantisk svart).
    const CANVAS_DARK_BG = [
        '#0a0f1e', '#0A0F1E', '#0f172a', '#0F172A',
        '#020617', '#02040a', '#0b1120', '#0B1120',
    ];
    for (const from of CANVAS_DARK_BG) {
        const re = new RegExp(`((?:fillStyle|strokeStyle|fillRect.*?fill)\\s*=\\s*['"\`])${escapeRe(from)}(['"\`])([^\\n]*)`, 'g');
        out = out.replace(re, (match, prefix, suffix, rest) => {
            if (/\/\/\s*keep-dark/i.test(rest)) return match;
            return `${prefix}#ebe5d7${suffix}${rest}`;
        });
    }

    return out;
}

function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isDarkHex(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length !== 6) return false;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    return (0.299 * r + 0.587 * g + 0.114 * b) < 60;
}

// Paperify-output-färger som inte ska konverteras igen (idempotens).
const OUR_OUTPUT_COLORS = new Set([
    '#f3eee4', '#F3EEE4',  // --lab-bg cream
    '#ffffff', '#FFFFFF',  // --lab-bg-panel white
    '#0f1620', '#0F1620',  // --lab-ink dark text
    '#c8324a', '#C8324A',  // --lab-accent red
    '#ad2b41', '#AD2B41',  // accent hover
]);
function isOurOutputColor(hex) {
    return OUR_OUTPUT_COLORS.has(hex);
}

function isLightTextHex(hex) {
    // Ljusa "neutrala" text-färger som måste bli mörka på papper.
    // Vi vill ENDAST träffa neutrala ljusa nyanser (vit, ljusgrå, slate-100..400),
    // INTE pedagogiska accentfärger som ljusblå/ljusgrön/etc. som ska behållas.
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length !== 6) return false;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    const lum = (0.299 * r + 0.587 * g + 0.114 * b);
    if (lum < 180) return false; // för mörk för att räknas som "ljus text"
    // Måste vara neutral grå/vit — alla tre kanaler nära varandra
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (max - min) <= 35;
}

function migrate(filePath, dryRun) {
    const abs = path.resolve(filePath);
    const baseName = path.basename(filePath);
    if (SPACE_FILES.has(baseName)) {
        console.log(`  · ${baseName}: rymd-tema, hoppar över`);
        return false;
    }
    let content = fs.readFileSync(abs, 'utf8');
    const original = content;
    content = applyReplacements(content, baseName);

    if (content === original) {
        console.log(`  · ${baseName}: inga ändringar`);
        return false;
    }

    // Räkna ändringar
    const diff = countDiff(original, content);
    if (dryRun) {
        console.log(`  ~ ${baseName}: ${diff} substitutioner (dry-run, ej skrivet)`);
    } else {
        fs.writeFileSync(abs, content, 'utf8');
        console.log(`  ✓ ${baseName}: ${diff} substitutioner`);
    }
    return true;
}

function countDiff(a, b) {
    // Snabb uppskattning: räkna antal förändrade hex-färger
    const hexRe = /#[0-9a-fA-F]{3,8}/g;
    const aHex = (a.match(hexRe) || []).join('|');
    const bHex = (b.match(hexRe) || []).join('|');
    let diff = 0;
    const aArr = aHex.split('|');
    const bArr = bHex.split('|');
    for (let i = 0; i < aArr.length; i++) {
        if (aArr[i] !== bArr[i]) diff++;
    }
    return diff;
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const cleanArgs = args.filter(a => a !== '--dry-run');

if (cleanArgs.length === 0) {
    console.log('Användning: node .claude/paperify-canvas.js fil.html [...]');
    console.log('             node .claude/paperify-canvas.js --all');
    console.log('             node .claude/paperify-canvas.js --dry-run --all');
    process.exit(1);
}

let targets = cleanArgs;
if (cleanArgs[0] === '--all') {
    const root = path.resolve(__dirname, '..');
    targets = fs.readdirSync(root)
        .filter(f => /^fysik[12]-.+\.html$/.test(f))
        .map(f => path.join(root, f));
}

let changed = 0;
targets.forEach(f => { if (migrate(f, dryRun)) changed++; });
console.log(`\nKlart. ${changed} av ${targets.length} filer ${dryRun ? 'skulle ändras' : 'ändrade'}.`);

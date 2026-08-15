// Teckenbredder för figurernas typsnittsstack ("Poppins, system-ui,
// sans-serif") — så att en verifierare kan räkna ut hur BRED en SVG-etikett
// blir, utan att starta en webbläsare.
//
// Tabellerna är uppmätta i Chrome (getComputedTextLength på 10 kopior av
// varje tecken, font-size 100) i exakt samma sammanhang som katalogen
// renderar figurerna. Värdena är em-andelar: bredd = Σ tabell[tecken] · font-size.
// Kursiv stil avviker som mest ~0,035 em per tecken och delar tabell med
// normal; fetstil (font-weight ≥ 600) har en egen tabell.
//
// Uppmätt mot 3 500 riktiga figuretiketter: medelfelet är under 0,2 px och
// största avvikelsen ~1 px vid 16 px text. Verifierarna lägger därför på en
// marginal innan de larmar.

const NORM_RAW = "0:0.539 1:0.539 2:0.539 3:0.539 4:0.539 5:0.539 6:0.539 7:0.539 8:0.539 9:0.539 #:0.591 %:0.818 &:0.800 (:0.302 ):0.302 +:0.684 ,:0.217 -:0.400 .:0.217 /:0.390 ::0.217 ;:0.217 =:0.684 ?:0.448 A:0.645 B:0.573 C:0.595 D:0.701 E:0.506 F:0.488 G:0.686 H:0.710 I:0.266 J:0.322 K:0.580 L:0.471 M:0.898 N:0.748 O:0.754 P:0.560 Q:0.754 R:0.598 S:0.531 T:0.541 U:0.687 V:0.621 W:0.934 X:0.590 Y:0.553 a:0.509 b:0.588 c:0.462 d:0.589 e:0.523 f:0.313 g:0.589 h:0.566 i:0.242 j:0.242 k:0.497 l:0.242 m:0.861 n:0.566 o:0.586 p:0.588 q:0.589 r:0.348 s:0.424 t:0.339 u:0.566 v:0.479 w:0.723 x:0.459 y:0.484 z:0.452 |:0.239 °:0.377 ²:0.366 µ:0.577 ·:0.217 Ö:0.754 ä:0.509 å:0.509 ö:0.586 Δ:0.644 Φ:0.754 Ω:0.755 α:0.614 β:0.548 θ:0.586 λ:0.498 μ:0.577 π:0.627 σ:0.575 ω:0.808 –:0.500 —:1.000 ₀:0.366 ₁:0.351 ₂:0.366 ₃:0.366 ₄:0.351 ℓ:0.323 ℕ:0.722 ℚ:0.722 ℝ:0.667 ℤ:0.611 →:0.863 −:0.684 √:0.650 ∞:0.817 ∫:0.540 ≈:0.685 ⋅:0.282 𝔼:0.637";

const BOLD_RAW = "0:0.575 1:0.575 2:0.575 3:0.575 4:0.575 5:0.575 6:0.575 7:0.575 8:0.575 9:0.575 #:0.592 %:0.867 &:0.850 (:0.369 ):0.369 +:0.707 ,:0.271 -:0.404 .:0.271 /:0.443 ::0.271 ;:0.271 =:0.707 ?:0.438 A:0.703 B:0.641 C:0.597 D:0.737 E:0.532 F:0.520 G:0.711 H:0.766 I:0.317 J:0.423 K:0.649 L:0.511 M:0.957 N:0.790 O:0.758 P:0.614 Q:0.758 R:0.653 S:0.560 T:0.604 U:0.723 V:0.667 W:1.005 X:0.655 Y:0.607 a:0.538 b:0.620 c:0.480 d:0.619 e:0.541 f:0.383 g:0.619 h:0.602 i:0.284 j:0.297 k:0.559 l:0.284 m:0.916 n:0.605 o:0.611 p:0.620 q:0.619 r:0.398 s:0.440 t:0.389 u:0.605 v:0.542 w:0.797 x:0.552 y:0.538 z:0.479 |:0.326 °:0.380 ²:0.404 µ:0.613 ·:0.271 Ö:0.758 ä:0.538 å:0.538 ö:0.611 Δ:0.703 Φ:0.815 Ω:0.766 α:0.631 β:0.622 θ:0.612 λ:0.566 μ:0.627 π:0.700 σ:0.613 ω:0.832 –:0.500 —:1.000 ₀:0.404 ₁:0.394 ₂:0.404 ₃:0.404 ₄:0.418 ℓ:0.323 ℕ:0.722 ℚ:0.778 ℝ:0.722 ℤ:0.667 →:0.863 −:0.707 √:0.650 ∞:0.813 ∫:0.576 ≈:0.708 ⋅:0.302 𝔼:0.657";

// Tecken som ännu inte förekommer i figurerna men som lätt gör det — mätta
// på samma sätt, så att en ny etikett inte tyst faller tillbaka på en gissning.
const NORM_EXTRA = "<:0.684 >:0.684 ≤:0.685 ≥:0.685 ×:0.684 ÷:0.684 ′:0.229 ″:0.377 ’:0.229 ”:0.377 “:0.377 ‘:0.229 !:0.284 *:0.417 _:0.415 @:0.955 $:0.539 [:0.302 ]:0.302 {:0.302 }:0.302 ~:0.684 ^:0.684 `:0.268 Z:0.570 Å:0.645 Ä:0.645 É:0.506 é:0.523 è:0.523 ü:0.566 ç:0.462 ñ:0.566 Ü:0.687 γ:0.519 δ:0.584 ε:0.438 ζ:0.442 η:0.575 ν:0.526 ξ:0.445 ρ:0.586 τ:0.487 υ:0.553 φ:0.699 χ:0.538 ψ:0.750 Γ:0.472 Λ:0.629 Ξ:0.510 Π:0.713 Σ:0.516 Υ:0.553 Ψ:0.776 ³:0.366 ¹:0.351 ⁰:0.366 ⁴:0.351 ⁵:0.366 ⁶:0.366 ⁷:0.366 ⁸:0.366 ⁹:0.366 ⁻:0.366 ₐ:0.315 ₑ:0.311 ₓ:0.267 ₅:0.366 ₆:0.366 ₇:0.366 ₈:0.366 ₉:0.366 ∂:0.535 ∇:0.596 ∈:0.623 ∑:0.617 ∏:0.754 ±:0.684 ∓:0.747 ≠:0.685 ≡:0.684 ∠:0.658 ⊥:0.663 ∥:0.464 ⇒:0.866 ⟹:1.179 ⟺:1.179 ↔:0.862 ←:0.863 ↑:0.472 ↓:0.472 ↕:0.500 ⟶:1.179 •:0.406 ‰:1.210";

const BOLD_EXTRA = "<:0.707 >:0.707 ≤:0.708 ≥:0.708 ×:0.707 ÷:0.707 ′:0.293 ″:0.493 ’:0.209 ”:0.493 “:0.493 ‘:0.209 !:0.327 *:0.455 _:0.415 @:0.954 $:0.575 [:0.369 ]:0.369 {:0.369 }:0.369 ~:0.707 ^:0.707 `:0.314 Z:0.607 Å:0.703 Ä:0.703 É:0.532 é:0.541 è:0.541 ü:0.605 ç:0.480 ñ:0.605 Ü:0.723 γ:0.567 δ:0.612 ε:0.463 ζ:0.465 η:0.611 ν:0.554 ξ:0.478 ρ:0.618 τ:0.557 υ:0.621 φ:0.751 χ:0.562 ψ:0.791 Γ:0.512 Λ:0.693 Ξ:0.554 Π:0.765 Σ:0.569 Υ:0.607 Ψ:0.826 ³:0.404 ¹:0.394 ⁰:0.404 ⁴:0.418 ⁵:0.404 ⁶:0.404 ⁷:0.394 ⁸:0.404 ⁹:0.404 ⁻:0.404 ₐ:0.351 ₑ:0.321 ₓ:0.345 ₅:0.404 ₆:0.404 ₇:0.394 ₈:0.404 ₉:0.404 ∂:0.578 ∇:0.616 ∈:0.643 ∑:0.643 ∏:0.791 ±:0.707 ∓:0.767 ≠:0.708 ≡:0.707 ∠:0.678 ⊥:0.683 ∥:0.484 ⇒:0.886 ⟹:1.199 ⟺:1.199 ↔:0.862 ←:0.863 ↑:0.472 ↓:0.472 ↕:0.500 ⟶:1.199 •:0.422 ‰:1.256";

function parseTable(...raws) {
    const map = Object.create(null);
    for (const raw of raws) {
        for (const pair of raw.split(' ')) {
            const i = pair.lastIndexOf(':');
            map[pair.slice(0, i)] = parseFloat(pair.slice(i + 1));
        }
    }
    map[' '] = 0.274;          // mellanslag (mätt separat)
    map[' '] = 0.274;     // hårt mellanslag
    return map;
}

const NORMAL = parseTable(NORM_RAW, NORM_EXTRA);
const BOLD = parseTable(BOLD_RAW, BOLD_EXTRA);
const FALLBACK = 0.60;   // okänt tecken → generös gissning

// Bredden i px för en textsträng vid given font-size.
function textWidth(str, fontSize, bold) {
    const tab = bold ? BOLD : NORMAL;
    let em = 0;
    for (const ch of String(str)) em += (ch in tab) ? tab[ch] : FALLBACK;
    return em * fontSize;
}

// Avkodar de HTML-entiteter som förekommer i figurernas etiketter.
function decodeEntities(s) {
    return s
        .replace(/&nbsp;/g, ' ')
        .replace(/&minus;/g, '−')
        .replace(/&times;/g, '×')
        .replace(/&middot;/g, '·')
        .replace(/&deg;/g, '°')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
}

// font-size kan vara absolut ("11", "11px") eller relativ ("70%", "0.8em").
function parseFontSize(raw, inherited) {
    if (raw == null) return inherited;
    const v = parseFloat(raw);
    if (!isFinite(v)) return inherited;
    if (/%\s*$/.test(raw)) return inherited * v / 100;
    if (/e[mx]\s*$/i.test(raw)) return inherited * v;
    return v;
}

// Bredden på ett helt <text>-element (inklusive <tspan>-barn, som kan ha
// egen font-size/font-weight). Returnerar null om elementet inte går att
// mäta statiskt (egen transform, textLength, letter-spacing, tspan med egen
// x/dx-position).
function measureTextElement(outerHtml, baseFontSize, baseBold, baseAnchor) {
    const open = outerHtml.match(/^<text\b([^>]*)>/);
    if (!open) return null;
    const openAttrs = open[1];
    if (/\b(transform|textLength|letter-spacing)\s*=/.test(openAttrs)) return null;
    const inner = outerHtml.replace(/^<text\b[^>]*>/, '').replace(/<\/text>\s*$/, '');

    const fs = parseFontSize((openAttrs.match(/font-size\s*=\s*"([^"]*)"/) || [])[1], baseFontSize);
    const wAttr = (openAttrs.match(/font-weight\s*=\s*"([^"]*)"/) || [])[1];
    const bold = wAttr ? (wAttr === 'bold' || parseInt(wAttr, 10) >= 600) : !!baseBold;

    // Textinnehållet delas upp i "körningar" (löptext + tspan-barn) med var
    // sin stil. Blanktecken hanteras som i XML: löpande blanksteg slås ihop
    // till ETT, och blanksteg först/sist i elementet ritas inte alls (hårt
    // mellanslag räknas däremot alltid).
    const runs = [];
    let ok = true;
    const re = /<tspan\b([^>]*)>([\s\S]*?)<\/tspan>|([^<]+)/g;
    let m;
    while ((m = re.exec(inner))) {
        if (m[3] !== undefined) {                       // ren text
            runs.push({ txt: decodeEntities(m[3]), fs, bold });
            continue;
        }
        const a = m[1], body = m[2];
        if (/\b(x|dx|transform|textLength|letter-spacing)\s*=/.test(a)) { ok = false; break; }
        const tfs = parseFontSize((a.match(/font-size\s*=\s*"([^"]*)"/) || [])[1], fs);
        const tw = (a.match(/font-weight\s*=\s*"([^"]*)"/) || [])[1];
        const tbold = tw ? (tw === 'bold' || parseInt(tw, 10) >= 600) : bold;
        runs.push({ txt: decodeEntities(body.replace(/<[^>]*>/g, '')), fs: tfs, bold: tbold });
    }
    if (!ok) return null;

    let seenInk = false;
    for (const r of runs) r.txt = r.txt.replace(/[ \t\r\n]+/g, ' ');
    for (const r of runs) {                             // blanksteg först → bort
        if (seenInk) break;
        r.txt = r.txt.replace(/^ +/, '');
        if (r.txt !== '') seenInk = true;
    }
    seenInk = false;
    for (let i = runs.length - 1; i >= 0; i--) {        // … och sist
        if (seenInk) break;
        runs[i].txt = runs[i].txt.replace(/ +$/, '');
        if (runs[i].txt !== '') seenInk = true;
    }
    let width = 0, prevEndsSpace = false;
    for (const r of runs) {
        let t = r.txt;
        if (prevEndsSpace) t = t.replace(/^ +/, '');    // dubbla blanksteg över gränsen
        if (t === '') continue;
        prevEndsSpace = / $/.test(t);
        width += textWidth(t, r.fs, r.bold);
    }

    const anchor = (openAttrs.match(/text-anchor\s*=\s*"([^"]*)"/) || [])[1] || baseAnchor || 'start';
    const x = parseFloat((openAttrs.match(/\bx\s*=\s*"(-?[\d.]+)"/) || [])[1]);
    const y = parseFloat((openAttrs.match(/\by\s*=\s*"(-?[\d.]+)"/) || [])[1]);
    if (!isFinite(x)) return null;
    const left = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
    return { left, right: left + width, width, x, y, fontSize: fs, anchor,
             text: decodeEntities(inner.replace(/<[^>]*>/g, '')).trim() };
}

// Går igenom en SVG-kropp och mäter varje <text>. Attribut som ärvs från
// omslutande <g> (font-size, font-weight, text-anchor) följer med — figurer
// sätter ofta font-size en gång på gruppen i stället för på varje etikett.
// Grupper (och element) med egen transform hoppas över: koordinaterna ligger
// då inte i viewBox-rummet.
//
// Returnerar [{ left, right, width, x, y, fontSize, anchor, text }].
function collectTexts(body, opts = {}) {
    const base = { fontSize: opts.fontSize || 16, bold: false, anchor: 'start' };
    const stack = [base];
    const out = [];
    const re = /<g\b([^>]*?)(\/?)>|<\/g>|<text\b[\s\S]*?<\/text>/g;
    let m, skipDepth = 0;
    while ((m = re.exec(body))) {
        const tok = m[0];
        if (tok.startsWith('</g')) {
            if (skipDepth > 0) skipDepth--;
            else if (stack.length > 1) stack.pop();
            continue;
        }
        if (tok.startsWith('<g')) {
            if (m[2] === '/') continue;                 // självstängande <g/>
            if (skipDepth > 0 || /\btransform\s*=/.test(m[1])) { skipDepth++; continue; }
            const cur = stack[stack.length - 1];
            const fs = parseFloat((m[1].match(/font-size\s*=\s*"([\d.]+)/) || [])[1]);
            const w = (m[1].match(/font-weight\s*=\s*"([^"]*)"/) || [])[1];
            const an = (m[1].match(/text-anchor\s*=\s*"([^"]*)"/) || [])[1];
            stack.push({
                fontSize: isFinite(fs) ? fs : cur.fontSize,
                bold: w ? (w === 'bold' || parseInt(w, 10) >= 600) : cur.bold,
                anchor: an || cur.anchor,
            });
            continue;
        }
        if (skipDepth > 0) continue;
        const cur = stack[stack.length - 1];
        const est = measureTextElement(tok, cur.fontSize, cur.bold, cur.anchor);
        if (est) out.push(est);
    }
    return out;
}

module.exports = { textWidth, measureTextElement, collectTexts, decodeEntities };

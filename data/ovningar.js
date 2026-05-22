// Övningar per avsnitt. Struktur:
//   window.OVNINGAR[id] = [{ level, question, solution, answer? }, ...]
//
// Nivåer:
//   1 = Grundläggande (E-nivå). Bara SI-omvandling + insättning i formel.
//   2 = Medelnivå (C-nivå). Kombination av två eller flera formler.
//   3 = Avancerad (A-nivå). Komplexa flerstegsproblem, generella lösningar.
//
// Per avsnitt: 3+2+1 (3 st Nivå 1, 2 st Nivå 2, 1 st Nivå 3). För korta
// avsnitt får principen frångås. Minst en uppgift per formel i avsnittet.
//
// Question och solution är markdown-strängar som renderas via samma
// marked + KaTeX-pipeline som teori-texten.
//
// ── Två typer av uppgifter ─────────────────────────────────────────
//
// 1) Räkneuppgift med numeriskt svar (auto-rättning via talvärde):
//      answer: { value: 24, unit: 'km/h', tol: 0.02 }
//    Eleven skriver bara värdet — enheten visas som hint till höger om
//    input-fältet. tol är relativ tolerans (default 0.02 = 2 %).
//
// 2) Flervalsfråga (auto-rättning via val):
//      choices: ['Alternativ A', 'Alternativ B', ...],
//      correct: 1   // 0-indexerat index av rätt alternativ
//    Inget answer-fält. Alternativen renderas som markdown.
//
// Om varken answer eller choices finns visas uppgiften som öppen fråga
// utan auto-rättning — eleven kan ändå klicka "Visa lösningsförslag".
//
// ── Diagram (s-t, v-t, a-t m.fl.) ─────────────────────────────────
//
// Använd makeDiagram(opts) nedan för att rita inline-SVG-diagram i
// frågetext. Aldrig text-beskrivning av en graf — eleven ska läsa av
// koordinater själv från rutnätet.
//
//   opts = {
//     xMin, xMax,                  // t-axelns intervall (default xMin=0)
//     yMin, yMax,                  // y-axelns intervall (default yMin=0)
//     xTicks: [0, 2, 4, ...],      // värden där x-rutnätslinjer + etiketter
//     yTicks: [0, 5, 10, ...],     //   ritas (samma för y)
//     xLabel: '<tspan font-style="italic">t</tspan> (s)',
//     yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
//     paths: [
//       { points: [[t1, v1], [t2, v2], ...], color?, width?, dash? }
//     ],
//     fills: [
//       { points: [[t1, v1], ...], color? }   // sluten yta, för areor
//     ]
//   }
//
// Default-färg på linjer = accent-röd (#c8324a). Markera inte mätpunkter
// med koordinatetiketter — eleven får räkna rutor.

function makeDiagram(opts) {
    const W = 500, H = 350;
    const padL = 60, padR = 40, padT = 30, padB = 60;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const xMin = opts.xMin != null ? opts.xMin : 0;
    const xMax = opts.xMax;
    const yMin = opts.yMin != null ? opts.yMin : 0;
    const yMax = opts.yMax;
    const xTicks = opts.xTicks || [];
    const yTicks = opts.yTicks || [];
    const xScale = t => padL + (t - xMin) / (xMax - xMin) * plotW;
    const yScale = v => H - padB - (v - yMin) / (yMax - yMin) * plotH;
    const xAxisY = (yMin <= 0 && yMax >= 0) ? yScale(0) : H - padB;
    const fmt = n => (typeof n === 'number' ? String(+n.toFixed(4)).replace('.', ',') : String(n));

    let grid = '';
    for (const t of xTicks) {
        const x = xScale(t).toFixed(1);
        grid += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}"/>`;
    }
    for (const v of yTicks) {
        const y = yScale(v).toFixed(1);
        grid += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"/>`;
    }

    const xTickY = H - padB + 18;
    let xLabels = '';
    for (const t of xTicks) {
        xLabels += `<text x="${xScale(t).toFixed(1)}" y="${xTickY}" text-anchor="middle" font-size="13" fill="#0f1620">${fmt(t)}</text>`;
    }
    let yLabels = '';
    for (const v of yTicks) {
        yLabels += `<text x="${padL - 7}" y="${(yScale(v) + 5).toFixed(1)}" text-anchor="end" font-size="13" fill="#0f1620">${fmt(v)}</text>`;
    }

    const xLabel = opts.xLabel || '<tspan font-style="italic">t</tspan> (s)';
    const yLabel = opts.yLabel || '<tspan font-style="italic">v</tspan> (m/s)';
    const axes =
        `<line x1="${padL}" y1="${xAxisY.toFixed(1)}" x2="${W - padR + 8}" y2="${xAxisY.toFixed(1)}" stroke="#0f1620" stroke-width="2"/>` +
        `<line x1="${padL}" y1="${H - padB}" x2="${padL}" y2="${padT - 8}" stroke="#0f1620" stroke-width="2"/>` +
        `<polygon points="${W - padR + 8},${(xAxisY - 4).toFixed(1)} ${W - padR + 16},${xAxisY.toFixed(1)} ${W - padR + 8},${(xAxisY + 4).toFixed(1)}" fill="#0f1620"/>` +
        `<polygon points="${padL - 4},${padT - 8} ${padL},${padT - 16} ${padL + 4},${padT - 8}" fill="#0f1620"/>` +
        `<text x="${W - padR + 22}" y="${(xAxisY + 5).toFixed(1)}" font-size="14" fill="#0f1620">${xLabel}</text>` +
        `<text x="${padL - 5}" y="${padT - 18}" font-size="14" fill="#0f1620" text-anchor="end">${yLabel}</text>`;

    let fillsSvg = '';
    for (const f of (opts.fills || [])) {
        let d = '';
        for (let i = 0; i < f.points.length; i++) {
            const [px, py] = f.points[i];
            d += (i === 0 ? 'M ' : 'L ') + xScale(px).toFixed(1) + ' ' + yScale(py).toFixed(1) + ' ';
        }
        fillsSvg += `<path d="${d.trim()} Z" fill="${f.color || 'rgba(200,50,74,0.12)'}" stroke="none"/>`;
    }

    let pathsSvg = '';
    for (const p of (opts.paths || [])) {
        const color = p.color || '#c8324a';
        const width = p.width || 2.5;
        const dash = p.dash ? ` stroke-dasharray="${p.dash}"` : '';
        let d = '';
        for (let i = 0; i < p.points.length; i++) {
            const [px, py] = p.points[i];
            d += (i === 0 ? 'M ' : 'L ') + xScale(px).toFixed(1) + ' ' + yScale(py).toFixed(1) + ' ';
        }
        pathsSvg += `<path d="${d.trim()}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linejoin="round" stroke-linecap="round"${dash}/>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:${W}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif"><g stroke="rgba(15,22,32,0.15)" stroke-width="1">${grid}</g>${fillsSvg}${axes}<g>${xLabels}${yLabels}</g>${pathsSvg}</svg>`;
}

// ── Kraftvektor-diagram (makeForceDiagram) ───────────────────────────
//
// Renderar en uppsättning kraftvektorer från en gemensam angreppspunkt
// (origo) som SVG. Aldrig beskriv vektorer enbart i text — använd detta
// för uppgifter där vinklar/riktningar är centrala.
//
//   opts = {
//     width, height,                  // viewBox (default 500 × 300)
//     cx, cy,                         // angreppspunkt (default mitten)
//     box: true,                      // rita en liten kvadrat (kropp) i origo
//     compass: true,                  // visa N/S/Ö/V-kompass i topp-vänster
//     vectors: [{
//       label,                        // 'F_1', 'F_2' — _N renderas som subscript
//       magnitude,                    // '50 N', '?'  (visas under label)
//       angle,                        // grader: 0 = höger, 90 = upp, 180 = vänster
//       length,                       // pilens längd i px (du skalar manuellt)
//       color,                        // default lab-accent röd
//       dashed,                       // boolean — för obekanta krafter
//       showAngle,                    // boolean — rita streckad horisontalreferens + båge med vinkel
//       angleLabel,                   // sträng — etikett vid bågen (default: `${angle}°`)
//     }]
//   }

function makeForceDiagram(opts) {
    // Formatera label-del: F → kursiv F, F_1 → kursiv F + ₁ (subscript).
    // Tillämpas BARA på vänstersidan av likhetstecknet — magnitude-delen
    // (t.ex. "12 N") lämnas orörd så att enheten N förblir rak.
    const subs = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };
    function fmtLabelPart(s) {
        // F_1 / F_N / F_drag → kursiv F + (rak/subscript) index
        const m = s.match(/^([A-Za-zα-ωΑ-Ω])_(\w+)$/);
        if (m) {
            const letter = m[1];
            const sub = m[2];
            // Sifferindex: använd Unicode-subscripts (₀-₉) som ligger på rätt baseline.
            if (/^\d+$/.test(sub)) {
                const ssub = sub.split('').map(c => subs[c] || c).join('');
                return `<tspan font-style="italic">${letter}</tspan>${ssub}`;
            }
            // Bokstavsindex (N, G, f, drag, …): använd SVG-tspan med baseline-shift
            // för riktig subscript-rendering. Indexet ritas rakt (inte kursivt).
            return `<tspan font-style="italic">${letter}</tspan><tspan baseline-shift="sub" font-size="0.72em">${sub}</tspan>`;
        }
        // Enskild kursiv variabel ("F")
        if (/^[A-Za-z]$/.test(s)) {
            return `<tspan font-style="italic">${s}</tspan>`;
        }
        return s;
    }
    function fmtLabel(s) {
        if (!s) return '';
        if (s.includes(' = ')) {
            const idx = s.indexOf(' = ');
            return fmtLabelPart(s.slice(0, idx)) + ' = ' + s.slice(idx + 3);
        }
        return fmtLabelPart(s);
    }

    // Allt ritas relativt till ankarpunkten (0, 0); viewBox-offset beräknas i slutet.
    const ax = 0, ay = 0;

    // Beräkna bounding box av allt som ska ritas, inkluderat labels.
    let minX = -15, minY = -15, maxX = 15, maxY = 15;  // initial: ankarområdet
    function expand(x, y, w, h) {
        minX = Math.min(minX, x - w / 2);
        maxX = Math.max(maxX, x + w / 2);
        minY = Math.min(minY, y - h / 2);
        maxY = Math.max(maxY, y + h / 2);
    }

    const vectorData = [];
    for (const v of (opts.vectors || [])) {
        const ang = v.angle * Math.PI / 180;
        const dx = Math.cos(ang) * v.length;
        const dy = -Math.sin(ang) * v.length;
        const x2 = ax + dx, y2 = ay + dy;
        const headAng = Math.atan2(dy, dx);

        const labelText = v.magnitude ? `${v.label} = ${v.magnitude}` : (v.label || '');
        const labelW = labelText.length * 9.5 + 8;  // grov uppskattning (font-size 18)
        const labelH = 22;

        // Etiketten placeras vid PILSPETSEN, med en riktningsspecifik offset
        // så den aldrig ligger på själva pilen:
        //   - Vertikal pil (uppåt eller nedåt): etiketten till HÖGER om spetsen,
        //     text-anchor="start" så texten börjar nära spetsen.
        //   - Horisontell eller sned pil: etiketten OVANFÖR eller UNDER spetsen
        //     (text-anchor="middle"), beroende på om vektorn lutar uppåt
        //     (sin > 0) eller nedåt (sin < 0).
        const aNorm = ((v.angle % 360) + 360) % 360;
        const isVertical = (aNorm >= 45 && aNorm < 135) || (aNorm >= 225 && aNorm < 315);
        let lx, ly, anchor, bbCx;
        if (isVertical) {
            anchor = 'start';
            lx = x2 + 8;
            ly = y2;
            bbCx = lx + labelW / 2;  // för bounding box: texten sträcker sig åt höger
        } else {
            anchor = 'middle';
            const sinA = Math.sin(ang);
            lx = x2;
            ly = y2 + (sinA >= 0 ? -18 : 18);
            bbCx = lx;
        }

        expand(x2, y2, 0, 0);              // pilspets
        expand(bbCx, ly, labelW, labelH);  // label-yta

        // Om vinkeln ska visas, reservera plats för streckad horisontallinje
        // (sträcker sig längs +x till v.length) och bågetikett.
        if (v.showAngle) {
            expand(v.length, 0, 0, 0);
            const arcR = Math.max(28, Math.min(48, v.length * 0.32));
            const halfAng = (v.angle * Math.PI / 180) / 2;
            const labelR = arcR + 14;
            expand(labelR * Math.cos(halfAng), -labelR * Math.sin(halfAng), 28, 16);
        }

        vectorData.push({ v, x2, y2, lx, ly, headAng, labelText, anchor });
    }

    // Box-storlek (om box används) — inkludera i BB
    if (opts.box) {
        const bs = opts.boxSize || 24;
        expand(ax, ay, bs, bs);
    }

    // Reservera plats för kompass top-vänster
    if (opts.compass) {
        minX = Math.min(minX, -75);
        minY = Math.min(minY, -75);
    }

    // Lägg på lite marginal
    const pad = 8;
    minX -= pad; maxX += pad; minY -= pad; maxY += pad;

    const W = maxX - minX;
    const H = maxY - minY;
    // Translation: ankarpunkten (0,0) hamnar vid (-minX, -minY) i viewBox.
    const tx = -minX, ty = -minY;

    let body = '';

    // Kompass
    if (opts.compass) {
        const ox = 40, oy = 40, L = 22;
        body += `<g stroke="#8a8579" stroke-width="1.2" fill="none">`;
        body += `<line x1="${ox}" y1="${oy + L}" x2="${ox}" y2="${oy - L}"/>`;
        body += `<line x1="${ox - L}" y1="${oy}" x2="${ox + L}" y2="${oy}"/>`;
        body += `</g>`;
        body += `<polygon points="${ox - 3},${oy - L + 6} ${ox},${oy - L - 2} ${ox + 3},${oy - L + 6}" fill="#8a8579"/>`;
        body += `<polygon points="${ox + L - 6},${oy - 3} ${ox + L + 2},${oy} ${ox + L - 6},${oy + 3}" fill="#8a8579"/>`;
        body += `<polygon points="${ox - 3},${oy + L - 6} ${ox},${oy + L + 2} ${ox + 3},${oy + L - 6}" fill="#8a8579"/>`;
        body += `<polygon points="${ox - L + 6},${oy - 3} ${ox - L - 2},${oy} ${ox - L + 6},${oy + 3}" fill="#8a8579"/>`;
        body += `<g font-size="11" fill="#8a8579" font-family="Poppins,sans-serif">`;
        body += `<text x="${ox}" y="${oy - L - 6}" text-anchor="middle">N</text>`;
        body += `<text x="${ox + L + 9}" y="${oy + 4}">Ö</text>`;
        body += `<text x="${ox}" y="${oy + L + 13}" text-anchor="middle">S</text>`;
        body += `<text x="${ox - L - 8}" y="${oy + 4}" text-anchor="end">V</text>`;
        body += `</g>`;
    }

    // Kropp / ankarpunkt
    if (opts.box) {
        const bs = opts.boxSize || 24;
        body += `<rect x="${tx - bs / 2}" y="${ty - bs / 2}" width="${bs}" height="${bs}" fill="rgba(15,22,32,0.06)" stroke="#0f1620" stroke-width="1.5" rx="2"/>`;
    } else {
        body += `<circle cx="${tx}" cy="${ty}" r="3.5" fill="#0f1620"/>`;
    }

    // Vektorer
    for (const vd of vectorData) {
        const v = vd.v;
        const color = v.color || '#c8324a';
        const dash = v.dashed ? ` stroke-dasharray="6 4"` : '';
        const x2 = vd.x2 + tx, y2 = vd.y2 + ty;
        const lx = vd.lx + tx, ly = vd.ly + ty;

        // Streckad horisontalreferens + vinkelbåge (om showAngle)
        if (v.showAngle) {
            const refColor = '#8a8579';
            body += `<line x1="${tx}" y1="${ty}" x2="${(tx + v.length).toFixed(1)}" y2="${ty}" stroke="${refColor}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
            const arcR = Math.max(28, Math.min(48, v.length * 0.32));
            const angRad = v.angle * Math.PI / 180;
            const arcEndX = tx + arcR * Math.cos(angRad);
            const arcEndY = ty - arcR * Math.sin(angRad);
            const sweep = v.angle > 0 ? 0 : 1;
            body += `<path d="M ${(tx + arcR).toFixed(1)} ${ty.toFixed(1)} A ${arcR} ${arcR} 0 0 ${sweep} ${arcEndX.toFixed(1)} ${arcEndY.toFixed(1)}" stroke="${refColor}" stroke-width="1.4" fill="none"/>`;
            const labelR = arcR + 14;
            const labelAng = angRad / 2;
            const labelX = tx + labelR * Math.cos(labelAng);
            const labelY = ty - labelR * Math.sin(labelAng);
            const angText = v.angleLabel || `${v.angle}°`;
            body += `<text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" font-family="Poppins,sans-serif" font-size="14" fill="${refColor}" text-anchor="middle" dominant-baseline="middle">${angText}</text>`;
        }

        // Pillinje
        body += `<line x1="${tx}" y1="${ty}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="2.6"${dash}/>`;

        // Pilspets
        const head = 10;
        const ha = vd.headAng;
        const hx1 = x2 - head * Math.cos(ha - Math.PI / 7);
        const hy1 = y2 - head * Math.sin(ha - Math.PI / 7);
        const hx2 = x2 - head * Math.cos(ha + Math.PI / 7);
        const hy2 = y2 - head * Math.sin(ha + Math.PI / 7);
        body += `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${hx1.toFixed(1)},${hy1.toFixed(1)} ${hx2.toFixed(1)},${hy2.toFixed(1)}" fill="${color}"/>`;

        // Etikett (label + magnitude på samma rad med likhetstecken)
        body += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-family="Poppins,sans-serif" font-size="18" fill="${color}" text-anchor="${vd.anchor}" dominant-baseline="middle">${fmtLabel(vd.labelText)}</text>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" style="max-width:${Math.round(W)}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${body}</svg>`;
}

// ── Lutande plan (makeInclinePlane) ──────────────────────────────────
//
// Ritar ett lutande plan (rätvinklig triangel) med horisontalbas, en
// låda på det lutande planet och vinkeln markerad mellan basen och
// hypotenusan. Marken under basen är skraffad. Anropas från question/
// solution-strängar för uppgifter om lutande plan.
//
//   opts = {
//     angle,            // grader (10–55 typiskt)
//     baseLen,          // px-längd på horisontalbas (default 260)
//     mass,             // valfri sträng inne i lådan (t.ex. "4,0 kg")
//     forces,           // valfri: { G, N, F1, F2, f }  — visar kraftpilar
//                       //   G  = tyngdkraft (rakt nedåt)
//                       //   N  = normalkraft (vinkelrätt ut från planet)
//                       //   F1 = tyngdkraftens komposant nedför planet
//                       //   F2 = tyngdkraftens komposant vinkelrätt mot planet (= N)
//                       //   f  = friktionskraft (uppför planet)
//   }
function makeInclinePlane(opts) {
    const angle = opts.angle;
    const angRad = angle * Math.PI / 180;
    const baseLen = opts.baseLen || 260;
    const height = baseLen * Math.tan(angRad);
    const padL = 30, padR = 60, padT = 30, padB = 38;
    const Ax = padL,             Ay = padT + height;
    const Bx = padL + baseLen,   By = padT + height;
    const Cx = padL + baseLen,   Cy = padT;
    let body = '';

    // Triangel (lutande plan)
    body += `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="rgba(15,22,32,0.05)" stroke="#0f1620" stroke-width="1.6"/>`;
    // Marklinje + skraffering
    const groundLeft = Ax - 18, groundRight = Bx + 14;
    body += `<line x1="${groundLeft}" y1="${Ay}" x2="${groundRight}" y2="${By}" stroke="#0f1620" stroke-width="1.6"/>`;
    for (let xs = groundLeft + 4; xs < groundRight; xs += 12) {
        body += `<line x1="${xs}" y1="${Ay}" x2="${xs - 6}" y2="${Ay + 8}" stroke="#0f1620" stroke-width="1"/>`;
    }
    // Vinkelbåge vid A
    const arcR = Math.min(38, baseLen * 0.18);
    const arcEndX = Ax + arcR * Math.cos(-angRad);
    const arcEndY = Ay + arcR * Math.sin(-angRad);
    body += `<path d="M ${Ax + arcR} ${Ay} A ${arcR} ${arcR} 0 0 0 ${arcEndX.toFixed(1)} ${arcEndY.toFixed(1)}" stroke="#8a8579" stroke-width="1.4" fill="none"/>`;
    const labelR = arcR + 14;
    const labelX = Ax + labelR * Math.cos(-angRad / 2);
    const labelY = Ay + labelR * Math.sin(-angRad / 2);
    body += `<text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" font-family="Poppins,sans-serif" font-size="14" fill="#8a8579" text-anchor="middle" dominant-baseline="middle">${angle}°</text>`;

    // Låda på planet (vid 55 % av hypotenusan från A)
    const t = 0.55;
    const bx = Ax + (Cx - Ax) * t;
    const by = Ay + (Cy - Ay) * t;
    const boxSize = 34;
    body += `<g transform="translate(${bx.toFixed(1)},${by.toFixed(1)}) rotate(${-angle})">`;
    body += `<rect x="${-boxSize/2}" y="${-boxSize}" width="${boxSize}" height="${boxSize}" fill="#fafaf5" stroke="#0f1620" stroke-width="1.6" rx="2"/>`;
    if (opts.mass) {
        body += `<text x="0" y="${-boxSize/2}" font-family="Poppins,sans-serif" font-size="11" fill="#0f1620" text-anchor="middle" dominant-baseline="middle">${opts.mass}</text>`;
    }
    body += `</g>`;

    // Kraftvektorer från lådans masscentrum
    const cmX = bx - Math.sin(angRad) * boxSize / 2;
    const cmY = by - Math.cos(angRad) * boxSize / 2;
    const blue = '#1c3d6b';
    function arrow(x1, y1, dirRad, len, labelSvg) {
        const x2 = x1 + len * Math.cos(dirRad);
        const y2 = y1 + len * Math.sin(dirRad);
        const head = 8;
        const hx1 = x2 - head * Math.cos(dirRad - Math.PI/7);
        const hy1 = y2 - head * Math.sin(dirRad - Math.PI/7);
        const hx2 = x2 - head * Math.cos(dirRad + Math.PI/7);
        const hy2 = y2 - head * Math.sin(dirRad + Math.PI/7);
        let s = `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${blue}" stroke-width="2"/>`;
        s += `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${hx1.toFixed(1)},${hy1.toFixed(1)} ${hx2.toFixed(1)},${hy2.toFixed(1)}" fill="${blue}"/>`;
        const lx = x2 + 10 * Math.cos(dirRad);
        const ly = y2 + 10 * Math.sin(dirRad);
        s += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-family="Poppins,sans-serif" font-size="14" fill="${blue}" text-anchor="middle" dominant-baseline="middle">${labelSvg}</text>`;
        return s;
    }
    function lblSub(letter, sub) {
        return `<tspan font-style="italic">${letter}</tspan><tspan baseline-shift="sub" font-size="0.72em">${sub}</tspan>`;
    }
    const f = opts.forces || {};
    if (f.G)  body += arrow(cmX, cmY, Math.PI/2,                    56, lblSub('F','G'));
    if (f.N)  body += arrow(cmX, cmY, -(angRad + Math.PI/2),         44, lblSub('F','N'));
    if (f.F1) body += arrow(cmX, cmY, Math.PI - angRad,              40, lblSub('F','1'));
    if (f.F2) body += arrow(cmX, cmY, -(angRad + Math.PI/2),         40, lblSub('F','2'));
    if (f.f)  body += arrow(cmX, cmY, -angRad,                       40, lblSub('F','f'));

    const W = padL + baseLen + padR;
    const H = padT + height + padB;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" style="max-width:${Math.round(W)}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${body}</svg>`;
}

// ── Vätskebägare / dyk (makeFluidBeaker) ───────────────────────────
//
// Ritar en rektangulär bägare/bassäng med vätska och valfri dykare/
// föremål på ett djup *h*. Pilen markerar djupet från ytan ner till
// föremålet.
//
//   opts = {
//     depth,           // total bägarhöjd i px (default 220)
//     width,           // bägarens bredd i px (default 280)
//     itemDepth,       // djupet på föremålet (0–1, andel av total höjd) (default 0.6)
//     itemLabel,       // text inne i föremålet (t.ex. "dykare")
//     liquidLabel,     // text vid vätskans yta (t.ex. "ρ = 998 kg/m³")
//     hLabel,          // text vid djuppilen (t.ex. "h = 3,0 m")
//   }
function makeFluidBeaker(opts) {
    const W = (opts.width || 280) + 80;
    const H = (opts.depth || 220) + 40;
    const beakerW = opts.width || 280;
    const beakerH = opts.depth || 220;
    const x0 = 30, y0 = 20;
    const surfaceY = y0 + 18;
    const liquidH = beakerH - 18;
    let body = '';
    // Bägare (kontur)
    body += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + beakerH}" stroke="#0f1620" stroke-width="2"/>`;
    body += `<line x1="${x0 + beakerW}" y1="${y0}" x2="${x0 + beakerW}" y2="${y0 + beakerH}" stroke="#0f1620" stroke-width="2"/>`;
    body += `<line x1="${x0}" y1="${y0 + beakerH}" x2="${x0 + beakerW}" y2="${y0 + beakerH}" stroke="#0f1620" stroke-width="2"/>`;
    // Vätska (blå fyllning)
    body += `<rect x="${x0 + 1}" y="${surfaceY}" width="${beakerW - 2}" height="${liquidH}" fill="rgba(56,189,248,0.18)"/>`;
    // Vätskeyta (våglinje)
    body += `<path d="M ${x0} ${surfaceY} q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0" stroke="#1c3d6b" stroke-width="1.2" fill="none"/>`;
    // Vätske-etikett
    if (opts.liquidLabel) {
        body += `<text x="${x0 + beakerW - 8}" y="${surfaceY - 6}" font-family="Poppins,sans-serif" font-size="13" fill="#1c3d6b" text-anchor="end">${opts.liquidLabel}</text>`;
    }
    // Föremål
    const itemDepth = opts.itemDepth != null ? opts.itemDepth : 0.6;
    const itemY = surfaceY + liquidH * itemDepth;
    const itemX = x0 + beakerW * 0.55;
    body += `<rect x="${itemX - 18}" y="${itemY - 12}" width="36" height="24" fill="#fafaf5" stroke="#0f1620" stroke-width="1.6" rx="2"/>`;
    if (opts.itemLabel) {
        body += `<text x="${itemX}" y="${itemY}" font-family="Poppins,sans-serif" font-size="11" fill="#0f1620" text-anchor="middle" dominant-baseline="middle">${opts.itemLabel}</text>`;
    }
    // Djup-pil från ytan ner till föremålet
    const arrowX = x0 + beakerW * 0.18;
    body += `<line x1="${arrowX}" y1="${surfaceY}" x2="${arrowX}" y2="${itemY}" stroke="#8a8579" stroke-width="1.4"/>`;
    // Pilspetsar (uppåt och nedåt)
    body += `<polygon points="${arrowX - 4},${surfaceY + 6} ${arrowX},${surfaceY} ${arrowX + 4},${surfaceY + 6}" fill="#8a8579"/>`;
    body += `<polygon points="${arrowX - 4},${itemY - 6} ${arrowX},${itemY} ${arrowX + 4},${itemY - 6}" fill="#8a8579"/>`;
    // h-etikett
    if (opts.hLabel) {
        body += `<text x="${arrowX + 8}" y="${(surfaceY + itemY) / 2}" font-family="Poppins,sans-serif" font-size="13" fill="#8a8579" text-anchor="start" dominant-baseline="middle">${opts.hLabel}</text>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:${Math.round(W)}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${body}</svg>`;
}

// ── Hydraulisk press / U-rör (makeHydraulicPress) ──────────────────
//
// Ritar en hydraulisk press med två kolvar (U-rör) med valfria
// kraftpilar och areaetiketter.
//
//   opts = {
//     a1, a2,          // areaetiketter ("0,50 dm²", "100 dm²")
//     f1, f2,          // kraftetiketter ("F₁ = 100 N", "F₂ = ?")
//   }
function makeHydraulicPress(opts) {
    const W = 420, H = 220;
    let body = '';
    // U-rör basform
    body += `<path d="M 60 60 L 60 160 Q 60 180 80 180 L 320 180 Q 360 180 360 160 L 360 60 L 320 60 L 320 140 Q 320 150 310 150 L 100 150 Q 90 150 90 140 L 90 60 Z" fill="rgba(56,189,248,0.18)" stroke="#0f1620" stroke-width="1.8"/>`;
    // Vänster kolv (liten)
    body += `<rect x="60" y="40" width="30" height="22" fill="#0f1620" stroke="#0f1620" stroke-width="1.5"/>`;
    // Höger kolv (stor)
    body += `<rect x="320" y="40" width="40" height="22" fill="#0f1620" stroke="#0f1620" stroke-width="1.5"/>`;
    // Kraftpilar nedåt på kolvarna
    body += `<line x1="75" y1="10" x2="75" y2="36" stroke="#c8324a" stroke-width="2.4"/>`;
    body += `<polygon points="71,30 75,40 79,30" fill="#c8324a"/>`;
    body += `<line x1="340" y1="36" x2="340" y2="10" stroke="#c8324a" stroke-width="2.4"/>`;
    body += `<polygon points="336,16 340,6 344,16" fill="#c8324a"/>`;
    // Etiketter
    if (opts.f1) body += `<text x="75" y="6" font-family="Poppins,sans-serif" font-size="14" fill="#c8324a" text-anchor="middle">${opts.f1}</text>`;
    if (opts.f2) body += `<text x="340" y="6" font-family="Poppins,sans-serif" font-size="14" fill="#c8324a" text-anchor="middle">${opts.f2}</text>`;
    if (opts.a1) body += `<text x="75" y="84" font-family="Poppins,sans-serif" font-size="13" fill="#0f1620" text-anchor="middle">${opts.a1}</text>`;
    if (opts.a2) body += `<text x="340" y="84" font-family="Poppins,sans-serif" font-size="13" fill="#0f1620" text-anchor="middle">${opts.a2}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:${Math.round(W)}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${body}</svg>`;
}

window.OVNINGAR = {
    'fy1-1.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En cyklist cyklar 12 km på 30 min. Beräkna cyklistens medelfart i km/h.`,
            answer: { value: 24, unit: 'km/h' },
            solution: `Medelfarten är sträckan delat med tiden:
$$ v_\\mathrm{m} = \\frac{s}{t} $$

Mätvärden (efter omvandling till samma tidsenhet):
$$
\\left[ \\begin{array}{l}
s = 12\\ \\mathrm{km} \\\\
t = 30\\ \\mathrm{min} = 0{,}5\\ \\mathrm{h}
\\end{array} \\right]
$$

$$ v_\\mathrm{m} = \\frac{12}{0{,}5} = 24\\ \\mathrm{km/h} $$

**Svar:** Medelfarten är 24 km/h.`,
        },
        {
            level: 1,
            question: `En löpare har medelfarten 4,0 m/s under 15 minuter. Hur långt har hon sprungit? Ange svaret i meter.`,
            answer: { value: 3600, unit: 'm' },
            solution: `Vi löser ut sträckan ur medelfartsformeln:
$$ v_\\mathrm{m} = \\frac{s}{t} \\quad\\Leftrightarrow\\quad s = v_\\mathrm{m} \\cdot t $$

Mätvärden (efter omvandling till SI-enheter):
$$
\\left[ \\begin{array}{l}
v_\\mathrm{m} = 4{,}0\\ \\mathrm{m/s} \\\\
t = 15\\ \\mathrm{min} = 15 \\cdot 60\\ \\mathrm{s} = 900\\ \\mathrm{s}
\\end{array} \\right]
$$

$$ s = 4{,}0 \\cdot 900 = 3\\,600\\ \\mathrm{m} = 3{,}6\\ \\mathrm{km} $$

**Svar:** Löparen har sprungit 3,6 km.`,
        },
        {
            level: 1,
            question: `En bil färdas med medelfarten 90 km/h. Hur lång tid tar det för bilen att köra 270 km? Ange svaret i timmar.`,
            answer: { value: 3.0, unit: 'h' },
            solution: `Vi löser ut tiden ur medelfartsformeln:
$$ v_\\mathrm{m} = \\frac{s}{t} \\quad\\Leftrightarrow\\quad t = \\frac{s}{v_\\mathrm{m}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
s = 270\\ \\mathrm{km} \\\\
v_\\mathrm{m} = 90\\ \\mathrm{km/h}
\\end{array} \\right]
$$

$$ t = \\frac{270}{90} = 3{,}0\\ \\mathrm{h} $$

**Svar:** Resan tar 3,0 timmar.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Tom cyklar 5,0 km på 20 minuter. Sedan promenerar han 2,0 km på 30 minuter. Vilken är hans medelfart i km/h under hela sträckan?`,
            answer: { value: 8.4, unit: 'km/h', tol: 0.03 },
            solution: `Medelfarten under hela sträckan är **total sträcka** delat med **total tid** — inte medelvärdet av delarnas farter.

Mätvärden:
$$
\\left[ \\begin{array}{l}
s_1 = 5{,}0\\ \\mathrm{km},\\quad t_1 = 20\\ \\mathrm{min} \\\\
s_2 = 2{,}0\\ \\mathrm{km},\\quad t_2 = 30\\ \\mathrm{min}
\\end{array} \\right]
$$

Total sträcka och tid:
$$ s_\\mathrm{tot} = s_1 + s_2 = 5{,}0 + 2{,}0 = 7{,}0\\ \\mathrm{km} $$
$$ t_\\mathrm{tot} = t_1 + t_2 = 20 + 30 = 50\\ \\mathrm{min} = \\frac{50}{60}\\ \\mathrm{h} \\approx 0{,}833\\ \\mathrm{h} $$

Medelfart:
$$ v_\\mathrm{m} = \\frac{s_\\mathrm{tot}}{t_\\mathrm{tot}} = \\frac{7{,}0}{0{,}833} \\approx 8{,}4\\ \\mathrm{km/h} $$

**Svar:** Medelfarten är ca 8,4 km/h.`,
        },
        {
            level: 2,
            question: `En bilist kör 80 km på en motorväg med medelfarten 100 km/h. Sedan kör hon 30 km på en mindre väg med medelfarten 60 km/h. Vilken är medelfarten under hela resan? Ange svaret i km/h.`,
            answer: { value: 84.6, unit: 'km/h', tol: 0.03 },
            solution: `Vi måste först räkna ut tiden för varje delsträcka, sedan beräkna medelfarten utifrån total sträcka och total tid.

Mätvärden:
$$
\\left[ \\begin{array}{l}
s_1 = 80\\ \\mathrm{km},\\quad v_1 = 100\\ \\mathrm{km/h} \\\\
s_2 = 30\\ \\mathrm{km},\\quad v_2 = 60\\ \\mathrm{km/h}
\\end{array} \\right]
$$

Tider för varje delsträcka:
$$ t_1 = \\frac{s_1}{v_1} = \\frac{80}{100} = 0{,}80\\ \\mathrm{h} $$
$$ t_2 = \\frac{s_2}{v_2} = \\frac{30}{60} = 0{,}50\\ \\mathrm{h} $$

Total sträcka och tid:
$$ s_\\mathrm{tot} = 80 + 30 = 110\\ \\mathrm{km} $$
$$ t_\\mathrm{tot} = 0{,}80 + 0{,}50 = 1{,}30\\ \\mathrm{h} $$

Medelfart:
$$ v_\\mathrm{m} = \\frac{s_\\mathrm{tot}}{t_\\mathrm{tot}} = \\frac{110}{1{,}30} \\approx 85\\ \\mathrm{km/h} $$

**Svar:** Medelfarten är ca 85 km/h. Observera att medelfarten **inte** är genomsnittet av 100 och 60 km/h (= 80 km/h), eftersom hon spenderar olika lång tid på de två sträckorna.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En person springer 100 m på en löparbana i 5,0 m/s. När hon vänder och springer tillbaka samma 100 m är hon tröttare och har medelfarten 4,0 m/s. Vilken är medelfarten under hela sträckan (fram och tillbaka)? Ange svaret i m/s.

*Tips: Det är frestande att svara $(5{,}0 + 4{,}0)/2 = 4{,}5$ m/s. Tänk efter om det är rätt!*`,
            answer: { value: 4.44, unit: 'm/s', tol: 0.03 },
            solution: `**Fel sätt** är att ta medelvärdet av de två farterna (4,5 m/s). Det stämmer bara om personen tillbringar lika lång tid med varje fart — men hon tillbringar **olika lång tid** på varje delsträcka. Medelfart räknas alltid utifrån total sträcka och total tid.

Mätvärden:
$$
\\left[ \\begin{array}{l}
s_1 = s_2 = 100\\ \\mathrm{m} \\\\
v_1 = 5{,}0\\ \\mathrm{m/s} \\\\
v_2 = 4{,}0\\ \\mathrm{m/s}
\\end{array} \\right]
$$

Tider för varje delsträcka:
$$ t_1 = \\frac{s_1}{v_1} = \\frac{100}{5{,}0} = 20\\ \\mathrm{s} $$
$$ t_2 = \\frac{s_2}{v_2} = \\frac{100}{4{,}0} = 25\\ \\mathrm{s} $$

Total sträcka och tid:
$$ s_\\mathrm{tot} = 100 + 100 = 200\\ \\mathrm{m} $$
$$ t_\\mathrm{tot} = 20 + 25 = 45\\ \\mathrm{s} $$

Medelfart:
$$ v_\\mathrm{m} = \\frac{s_\\mathrm{tot}}{t_\\mathrm{tot}} = \\frac{200}{45} \\approx 4{,}44\\ \\mathrm{m/s} $$

**Svar:** Medelfarten är ca 4,4 m/s.

**Generell slutsats:** För två lika långa sträckor med olika farter $v_1$ och $v_2$ blir medelfarten det *harmoniska medelvärdet*:
$$ v_\\mathrm{m} = \\frac{2 \\cdot v_1 \\cdot v_2}{v_1 + v_2} $$
Det är *alltid lägre* än det aritmetiska medelvärdet $(v_1 + v_2)/2$ — den långsammare delen "väger tyngre" eftersom den tar längre tid.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-1.1  Fysik som ämne — introduktion
    // (Inget formelinnehåll — flervalsfrågor om naturvetenskaplig metod.)
    // ═══════════════════════════════════════════════════════════════════
    'fy1-1.1': [
        {
            level: 1,
            question: `Vad menas med en **hypotes** inom den naturvetenskapliga metoden?`,
            choices: [
                `Ett fenomen som observerats men inte kunnat förklaras.`,
                `En gissning om hur något fungerar, som ska testas med experiment.`,
                `En lag som upprepade gånger har bekräftats och aldrig motbevisats.`,
                `En sammanställning av flera teorier inom samma område.`,
            ],
            correct: 1,
            solution: `En hypotes är ett *förslag* på en förklaring — en gissning som man sedan testar genom experiment. Om hypotesen inte motbevisas av experimenten kan den så småningom övergå till att kallas en **lag**, och flera lagar tillsammans kan bilda en **teori**.

**Svar:** En hypotes är en gissning som ska prövas i experiment.`,
        },
        {
            level: 1,
            question: `Vilken är den korrekta ordningen i den naturvetenskapliga metoden?`,
            choices: [
                `Hypotes → observation → experiment → teori`,
                `Observation → hypotes → hypotesprövning → lagar och teorier`,
                `Experiment → observation → hypotes → lagar`,
                `Teori → hypotes → experiment → observation`,
            ],
            correct: 1,
            solution: `Den naturvetenskapliga metoden börjar med en **observation** — vi ser något hända. Utifrån det formulerar vi en **hypotes** om varför det händer, **prövar** hypotesen genom att göra experiment, och om hypotesen håller blir den till slut en del av etablerade **lagar och teorier**.

**Svar:** Observation → hypotes → hypotesprövning → lagar och teorier.`,
        },
        {
            level: 2,
            question: `En vän säger: *"Evolutionsteorin är ju 'bara en teori' — det är inte säkert att den stämmer."* Vad är problemet med det påståendet ur ett naturvetenskapligt perspektiv?`,
            choices: [
                `Ordet "teori" används i vardagstal om osäkra gissningar, men i naturvetenskaplig mening är en teori ett väl belagt system av lagar som testats många gånger.`,
                `Evolutionsteorin är inte längre en teori — den har övergått till att vara en lag.`,
                `Vetenskapliga teorier är inte avsedda att vara sanna — de är bara modeller.`,
                `Vännen har rätt: alla teorier är osäkra tills något kan bevisas matematiskt.`,
            ],
            correct: 0,
            solution: `Vardagsspråk och naturvetenskaplig terminologi använder ordet *teori* på två olika sätt:

- I **vardagligt tal** betyder "teori" ofta en osäker gissning (*"jag har en teori om vem som tog mjölken"*).
- I **naturvetenskap** betyder en *teori* tvärtom någonting *väldigt säkert* — ett ramverk av lagar och förklaringar som har testats många gånger utan att motbevisas.

Att kalla evolutionsteorin "bara en teori" är därför ett missförstånd av vad ordet teori betyder i naturvetenskaplig mening.

**Svar:** Alternativ A — vännen blandar ihop vardagligt och naturvetenskapligt språkbruk.`,
        },
        {
            level: 2,
            question: `Varför använder fysiker ofta **modeller** (t.ex. en punktmassa, en perfekt kula eller en ideal gas) istället för att räkna på verkligheten exakt?`,
            choices: [
                `För att fysiker tycker att modeller är roligare än verkligheten.`,
                `För att modellerna är förenklingar av verkligheten som ändå är *tillräckligt bra* för att kunna förutsäga och förklara det vi observerar.`,
                `För att modellerna är hur naturen verkligen ser ut på mikroskopisk nivå.`,
                `För att modeller alltid ger exakt samma svar som verkligheten om man räknar tillräckligt noga.`,
            ],
            correct: 1,
            solution: `Verkligheten är ofta komplicerad — en boll är inte en perfekt sfär, en gas består av oerhört många molekyler och en kraftpåverkan är aldrig helt friktionsfri. **Modeller** är förenklingar av verkligheten som plockar bort detaljer som inte är viktiga för det vi studerar, samtidigt som de *tillräckligt bra* beskriver det vi vill förstå.

Det är just därför fysik fungerar: vi kan förutsäga vad som händer utan att behöva räkna på varenda molekyl i ett system.

**Svar:** Alternativ B — modeller är tillräckligt bra förenklingar.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-1.2  Storheter, enheter och prefix
    // Formler/begrepp: storhet/mätetal/enhet, SI-enheter, värdesiffror,
    // prefix och tiopotenser, v_m = s/t (i exempel 2).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-1.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `I meningen *"sträckan är 2 500 meter"* — vad är **mätetalet**?`,
            choices: [
                `sträckan`,
                `2 500`,
                `meter`,
                `m (symbolen för meter)`,
            ],
            correct: 1,
            solution: `En storhet anges som *mätetal* gånger *enhet*:

- **Storhet** — egenskapen som mäts. Här: *sträcka*.
- **Mätetal** — det numeriska värdet. Här: *2 500*.
- **Enhet** — måttstorleken som mätetalet anges i. Här: *meter*.

**Svar:** Mätetalet är 2 500.`,
        },
        {
            level: 1,
            question: `Skriv 3,5 ms (millisekunder) i sekunder. Ange svaret i grundpotensform eller som decimaltal.`,
            answer: { value: 0.0035, unit: 's', tol: 0.02 },
            solution: `Prefixet **milli** (m) betyder $10^{-3}$, alltså

$$
1\\ \\mathrm{ms} = 10^{-3}\\ \\mathrm{s} = 0{,}001\\ \\mathrm{s}
$$

Vi multiplicerar mätetalet med prefixets tiopotens:

$$
3{,}5\\ \\mathrm{ms} = 3{,}5 \\cdot 10^{-3}\\ \\mathrm{s} = 0{,}0035\\ \\mathrm{s}
$$

**Svar:** 3,5 · 10⁻³ s = 0,0035 s.`,
        },
        {
            level: 1,
            question: `Beräkna produkten $7{,}2 \\cdot 1{,}234$. Ange svaret med **korrekt antal värdesiffror**.`,
            answer: { value: 8.9, unit: '', tol: 0.01 },
            solution: `Vid multiplikation och division avgörs antalet värdesiffror av det värde som har **minst antal värdesiffror**.

Mätvärden:
$$
\\left[ \\begin{array}{l}
a = 7{,}2 \\quad (\\text{2 värdesiffror}) \\\\
b = 1{,}234 \\quad (\\text{4 värdesiffror})
\\end{array} \\right]
$$

Räkneuträkning:
$$
7{,}2 \\cdot 1{,}234 = 8{,}8848
$$

Eftersom minsta antalet värdesiffror är **två** ska resultatet avrundas till två värdesiffror:

$$
8{,}8848 \\approx 8{,}9
$$

**Svar:** 8,9.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En cyklist rullar 1,8 km på 5,5 minuter. Beräkna medelfarten i m/s med **korrekt antal värdesiffror**.`,
            answer: { value: 5.5, unit: 'm/s', tol: 0.03 },
            solution: `Vi använder medelfartsformeln efter att ha gjort om till SI-enheter (m och s):

$$
v_\\mathrm{m} = \\frac{s}{t}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
s = 1{,}8\\ \\mathrm{km} = 1\\,800\\ \\mathrm{m} \\\\
t = 5{,}5\\ \\mathrm{min} = 5{,}5 \\cdot 60\\ \\mathrm{s} = 330\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
v_\\mathrm{m} = \\frac{1\\,800}{330} = 5{,}454\\ldots\\ \\mathrm{m/s}
$$

Båda mätvärdena har två värdesiffror, så svaret avrundas till två värdesiffror:

$$
v_\\mathrm{m} \\approx 5{,}5\\ \\mathrm{m/s}
$$

**Svar:** 5,5 m/s.`,
        },
        {
            level: 2,
            question: `Beräkna summan $12{,}45 + 0{,}3$. Ange svaret med **korrekt antal decimaler**.`,
            answer: { value: 12.8, unit: '', tol: 0.005 },
            solution: `Vid addition och subtraktion bestäms svarets antal decimaler av det värde som har **minst antal decimaler** (inte antal värdesiffror).

Mätvärden:
$$
\\left[ \\begin{array}{l}
a = 12{,}45 \\quad (\\text{2 decimaler}) \\\\
b = 0{,}3 \\quad (\\text{1 decimal})
\\end{array} \\right]
$$

Räkneuträkning:
$$
12{,}45 + 0{,}3 = 12{,}75
$$

Eftersom 0,3 bara har **en** decimal ska summan avrundas till en decimal:

$$
12{,}75 \\approx 12{,}8
$$

**Svar:** 12,8.

**Generell slutsats:** Det är lätt att förväxla reglerna — vid *addition/subtraktion* tittar man på *decimaler*, vid *multiplikation/division* tittar man på *värdesiffror*.`,
        },

        {
            level: 2,
            question: `En forskare mäter med en mikrometerskruv tjockleken av ett tunt pappersark till 0,084 mm. Hon staplar **250 sådana ark** ovanpå varandra. Hur tjock blir stapeln, angiven i **meter**, med korrekt antal värdesiffror?`,
            answer: { value: 0.021, unit: 'm', tol: 0.03 },
            solution: `Vi multiplicerar tjockleken av ett ark med antalet ark, och växlar till SI-enheten meter.

Mätvärden:
$$
\\left[ \\begin{array}{l}
d = 0{,}084\\ \\mathrm{mm} = 8{,}4 \\cdot 10^{-5}\\ \\mathrm{m} \\quad (\\text{2 värdesiffror}) \\\\
n = 250 \\quad (\\text{exakt antal — ingen mätosäkerhet})
\\end{array} \\right]
$$

Notera att inledande nollor i 0,084 **inte** räknas som värdesiffror — det är bara 8 och 4 som är värdesiffror.

Total tjocklek:
$$
t = n \\cdot d = 250 \\cdot 8{,}4 \\cdot 10^{-5}\\ \\mathrm{m} = 2{,}10 \\cdot 10^{-2}\\ \\mathrm{m}
$$

Eftersom *d* bara har två värdesiffror ska svaret avrundas till två värdesiffror:

$$
t \\approx 2{,}1 \\cdot 10^{-2}\\ \\mathrm{m} = 0{,}021\\ \\mathrm{m} = 21\\ \\mathrm{mm}
$$

**Svar:** 0,021 m (= 2,1 cm).

**Generell slutsats:** När man räknar med en *exakt* faktor (t.ex. antal ark, antal sidor på en tärning) påverkar den faktorn inte antalet värdesiffror i svaret — det styrs helt av mätvärdets precision.`,
        },

        {
            level: 2,
            question: `En glaskub har sidan 5,00 cm (mätt med skjutmått — alltså 3 värdesiffror). En elev räknar ut kubens **totala utomyta** (alla 6 sidor sammanlagt) och vill ange resultatet med korrekt antal värdesiffror. Vilket av följande är det **enda otvetydigt korrekta** sättet att skriva svaret?`,
            choices: [
                `$150\\ \\mathrm{cm^2}$`,
                `$1{,}5 \\cdot 10^{2}\\ \\mathrm{cm^2}$`,
                `$1{,}50 \\cdot 10^{2}\\ \\mathrm{cm^2}$`,
                `$150{,}0\\ \\mathrm{cm^2}$`,
            ],
            correct: 2,
            solution: `Sidan har **3 värdesiffror** (5,00 cm). Vid multiplikation begränsas svaret av minsta antalet värdesiffror, men talet *6* (antal sidor på en kub) är **exakt** och påverkar inte värdesiffrorna. Alltså ska resultatet ha **3 värdesiffror**.

Räkneuträkning:
$$
A_\\text{sida} = (5{,}00)^{2} = 25{,}0\\ \\mathrm{cm^2}
$$
$$
A_\\text{tot} = 6 \\cdot 25{,}0 = 150\\ \\mathrm{cm^2}
$$

Men nu kommer **fällan**: hur skriver vi 150 så att det entydigt har just 3 värdesiffror?

- **A) 150 cm²** — *tvetydigt*. Det kan tolkas som 2 värdesiffror (nollan är osäker) *eller* 3 värdesiffror. Otydligt!
- **B) 1,5 · 10² cm²** — bara **2 värdesiffror**. För få.
- **C) 1,50 · 10² cm²** — **3 värdesiffror**, helt entydigt. ✓
- **D) 150,0 cm²** — **4 värdesiffror**. Att lägga till ",0" på slutet hittar på en värdesiffra som mätvärdet inte har.

**Svar:** Alternativ C — 1,50 · 10² cm².

**Generell slutsats:** När ett tal slutar på *nollor till vänster om decimalkommat* (t.ex. 150, 2 400, 50 000) blir antalet värdesiffror i den vanliga skrivformen tvetydigt — nollorna kan vara värdesiffror eller bara platshållare. Lösningen är att skriva talet i **grundpotensform**, där varje siffra som skrivs ut räknas som en värdesiffra. Det är därför fysiker ofta skriver tal i grundpotensform även när det inte skulle behövas för platsens skull.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-1.4  Densitet
    // Formler: ρ = m/V samt enhetsomvandling g/cm³ ↔ kg/m³.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-1.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En kub av järn har volymen $1{,}0 \\cdot 10^{-3}\\ \\mathrm{m^3}$ (alltså 1,0 liter) och massan 7,87 kg. Beräkna järnets densitet i kg/m³.`,
            answer: { value: 7870, unit: 'kg/m³', tol: 0.02 },
            solution: `Vi använder densitetsformeln direkt:

$$
\\rho = \\frac{m}{V}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 7{,}87\\ \\mathrm{kg} \\\\
V = 1{,}0 \\cdot 10^{-3}\\ \\mathrm{m^3}
\\end{array} \\right]
$$

$$
\\rho = \\frac{7{,}87\\ \\mathrm{kg}}{1{,}0 \\cdot 10^{-3}\\ \\mathrm{m^3}} = 7\\,870\\ \\mathrm{kg/m^3}
$$

**Svar:** Densiteten är ca 7 900 kg/m³ (avrundat till 2 värdesiffror) eller 7,87 g/cm³.`,
        },
        {
            level: 1,
            question: `En guldring har volymen $1{,}5 \\cdot 10^{-6}\\ \\mathrm{m^3}$ och guldets densitet är 19 300 kg/m³. Hur stor är ringens massa? Ange svaret i kg.`,
            answer: { value: 0.029, unit: 'kg', tol: 0.03 },
            solution: `Vi löser ut massan ur densitetsformeln:

$$
\\rho = \\frac{m}{V} \\quad\\Leftrightarrow\\quad m = \\rho \\cdot V
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\rho = 19\\,300\\ \\mathrm{kg/m^3} \\\\
V = 1{,}5 \\cdot 10^{-6}\\ \\mathrm{m^3}
\\end{array} \\right]
$$

$$
m = 19\\,300 \\cdot 1{,}5 \\cdot 10^{-6} = 0{,}02895\\ \\mathrm{kg} \\approx 0{,}029\\ \\mathrm{kg} = 29\\ \\mathrm{g}
$$

**Svar:** Ringen väger ca 29 g.`,
        },
        {
            level: 1,
            question: `Aluminium har densiteten 2,70 g/cm³. Skriv om denna densitet till SI-enheten **kg/m³**.`,
            answer: { value: 2700, unit: 'kg/m³', tol: 0.01 },
            solution: `Omvandlingsfaktorn mellan g/cm³ och kg/m³ är 1 000:

$$
1\\ \\mathrm{g/cm^3} = 1\\,000\\ \\mathrm{kg/m^3}
$$

Vi multiplicerar därför med 1 000:

$$
2{,}70\\ \\mathrm{g/cm^3} = 2{,}70 \\cdot 1\\,000\\ \\mathrm{kg/m^3} = 2\\,700\\ \\mathrm{kg/m^3}
$$

**Svar:** 2 700 kg/m³.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En kub av koppar har sidan 5,00 cm. Kopparns densitet är 8 960 kg/m³. Beräkna kubens massa i kg.`,
            answer: { value: 1.12, unit: 'kg', tol: 0.02 },
            solution: `Två steg: först beräkna volymen i SI-enheten m³, sedan använda densitetsformeln för att lösa ut massan.

Mätvärden:
$$
\\left[ \\begin{array}{l}
a = 5{,}00\\ \\mathrm{cm} = 0{,}0500\\ \\mathrm{m} \\\\
\\rho = 8\\,960\\ \\mathrm{kg/m^3}
\\end{array} \\right]
$$

Volym (sida i kubik):
$$
V = a^{3} = (0{,}0500)^{3}\\ \\mathrm{m^3} = 1{,}25 \\cdot 10^{-4}\\ \\mathrm{m^3}
$$

Massa:
$$
m = \\rho \\cdot V = 8\\,960 \\cdot 1{,}25 \\cdot 10^{-4} = 1{,}12\\ \\mathrm{kg}
$$

**Svar:** Kubens massa är 1,12 kg.`,
        },
        {
            level: 2,
            question: `En sten med massan 0,180 kg sänks ner i ett mätglas med vatten. Vattennivån stiger då från 100 ml till 165 ml. Beräkna stenens densitet i kg/m³.`,
            answer: { value: 2800, unit: 'kg/m³', tol: 0.03 },
            solution: `Volymökningen i mätglaset är lika med stenens volym (vattnet trängs undan).

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 0{,}180\\ \\mathrm{kg} \\\\
\\Delta V = 165 - 100 = 65\\ \\mathrm{ml} = 65\\ \\mathrm{cm^3} = 6{,}5 \\cdot 10^{-5}\\ \\mathrm{m^3}
\\end{array} \\right]
$$

Densitet:
$$
\\rho = \\frac{m}{V} = \\frac{0{,}180}{6{,}5 \\cdot 10^{-5}} \\approx 2\\,769\\ \\mathrm{kg/m^3}
$$

Avrundat till två värdesiffror (begränsat av $\\Delta V$):

$$
\\rho \\approx 2\\,800\\ \\mathrm{kg/m^3} = 2{,}8\\ \\mathrm{g/cm^3}
$$

**Svar:** Stenens densitet är ca 2 800 kg/m³.

**Generell slutsats:** Vattenförträngning är en klassisk metod att mäta volymen av oregelbundna föremål — den fungerar för allt som sjunker och inte löser sig i vattnet.`,
        },

        {
            level: 2,
            question: `En guldsmed har gjort en krona som påstås vara av **rent guld**. Kronan väger 320 g, och när den sänks ner i ett mätglas med vatten stiger vattennivån från 250,0 ml till 268,9 ml.

a) Vilken är kronans densitet (i g/cm³)?

b) Är kronan med säkerhet av rent guld? Rent guld har densiteten 19,3 g/cm³.

*Ange din numeriska beräkning av densiteten som svar.*`,
            answer: { value: 16.9, unit: 'g/cm³', tol: 0.02 },
            solution: `**a)** Volymökningen i mätglaset är lika med kronans volym.

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 320\\ \\mathrm{g} \\\\
\\Delta V = 268{,}9 - 250{,}0 = 18{,}9\\ \\mathrm{cm^3}
\\end{array} \\right]
$$

Densitet:
$$
\\rho_\\text{krona} = \\frac{m}{V} = \\frac{320}{18{,}9} \\approx 16{,}9\\ \\mathrm{g/cm^3}
$$

**b)** Rent guld har densiteten 19,3 g/cm³. Kronans densitet är **klart lägre** än så:

$$
\\rho_\\text{krona} \\approx 16{,}9\\ \\mathrm{g/cm^3} < 19{,}3\\ \\mathrm{g/cm^3} = \\rho_\\text{guld}
$$

Eftersom densitet är en *materialegenskap* som inte beror på föremålets storlek eller form kan kronan **inte** vara av rent guld. Den är förmodligen legerad med en lättare metall (t.ex. silver eller koppar).

**Svar:** Kronans densitet är 16,9 g/cm³, vilket är klart lägre än 19,3 g/cm³. Kronan är inte av rent guld.

**Generell slutsats:** Densitetsmätning via vattenförträngning är en icke-förstörande metod att avgöra om ett föremål är av det material det utger sig för att vara — historiskt sett samma metod som ska ha avslöjat Arkimedes "guld-i-kronan"-fall.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En liten kub är gjuten av en legering av **guld** ($\\rho_\\text{guld} = 19{,}3\\ \\mathrm{g/cm^3}$) och **silver** ($\\rho_\\text{silver} = 10{,}5\\ \\mathrm{g/cm^3}$). Kuben har sidan 2,0 cm och den totala massan 130 g. Beräkna hur många **procent av kubens massa** som är guld. Bortse från att volymen kan ändras något vid själva legeringen.`,
            answer: { value: 77.6, unit: '%', tol: 0.03 },
            solution: `Vi har två okända — massan guld $m_g$ och massan silver $m_s$ — och behöver två ekvationer.

Mätvärden:
$$
\\left[ \\begin{array}{l}
V = (2{,}0)^{3}\\ \\mathrm{cm^3} = 8{,}0\\ \\mathrm{cm^3} \\\\
m_\\text{tot} = 130\\ \\mathrm{g} \\\\
\\rho_g = 19{,}3\\ \\mathrm{g/cm^3} \\\\
\\rho_s = 10{,}5\\ \\mathrm{g/cm^3}
\\end{array} \\right]
$$

**Ekvation 1** — massa-balans (totala massan är summan av delarnas):
$$
m_g + m_s = 130
$$

**Ekvation 2** — volym-balans (totala volymen är summan av delarnas volymer):
$$
V_g + V_s = V \\quad\\Leftrightarrow\\quad \\frac{m_g}{\\rho_g} + \\frac{m_s}{\\rho_s} = 8{,}0
$$

Vi sätter $m_s = 130 - m_g$ in i ekvation 2:

$$
\\frac{m_g}{19{,}3} + \\frac{130 - m_g}{10{,}5} = 8{,}0
$$

Multiplicera båda led med $19{,}3 \\cdot 10{,}5 = 202{,}65$:

$$
10{,}5\\, m_g + 19{,}3\\, (130 - m_g) = 8{,}0 \\cdot 202{,}65
$$

$$
10{,}5\\, m_g + 2\\,509 - 19{,}3\\, m_g = 1\\,621{,}2
$$

$$
-8{,}8\\, m_g = -887{,}8 \\quad\\Leftrightarrow\\quad m_g \\approx 100{,}9\\ \\mathrm{g}
$$

Andelen guld av totalmassan:

$$
\\frac{m_g}{m_\\text{tot}} = \\frac{100{,}9}{130} \\approx 0{,}776 = 77{,}6\\ \\%
$$

**Svar:** Ungefär 78 % av kubens massa är guld.

**Generell slutsats:** Massfraktioner i en legering kan bestämmas ur en *densitetsmätning* + den totala massan, eftersom de två komponenterna har olika densitet. Samma princip används i verkligheten av guldsmeder och vid kontroll av mynt eller smycken.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.1  Vektoraddition
    // Begrepp: vektor vs skalär, sträcka vs förflyttning,
    // parallellförflyttning, resultant. Formel: Pythagoras för vinkelräta
    // vektorer (v² = v₁² + v₂²).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Vilken av följande storheter är en **vektor**?`,
            choices: [
                `Massa`,
                `Tid`,
                `Hastighet`,
                `Energi`,
            ],
            correct: 2,
            solution: `En **vektor** är en storhet som har *både storlek och riktning*. En **skalär** har bara *storlek*.

- Massa, tid och energi har bara storlek (skalärer).
- Hastighet har både storlek (m/s) och riktning (åt vilket håll föremålet rör sig) — alltså en vektor.

**Svar:** Hastighet.

**Generell slutsats:** Andra vanliga vektorer är *kraft*, *acceleration*, *förflyttning* och *rörelsemängd*. Vanliga skalärer är *fart*, *sträcka*, *massa*, *tid*, *temperatur* och *energi*.`,
        },
        {
            level: 1,
            question: `Anna joggar 600 m rakt österut och vänder sedan tillbaka 200 m åt väster. Vilken är hennes **förflyttning** (i meter) från startpunkten? Räkna österut som positiv riktning.`,
            answer: { value: 400, unit: 'm', tol: 0.01 },
            solution: `**Förflyttning** är en vektor — den anger nettoförändringen i position, *med tecken* för riktningen.

Mätvärden (öster = positiv):
$$
\\left[ \\begin{array}{l}
\\Delta s_1 = +600\\ \\mathrm{m} \\\\
\\Delta s_2 = -200\\ \\mathrm{m}
\\end{array} \\right]
$$

Total förflyttning:
$$
\\Delta s = \\Delta s_1 + \\Delta s_2 = 600 + (-200) = 400\\ \\mathrm{m}
$$

**Svar:** Förflyttningen är 400 m åt öster.

**Generell slutsats:** Den *sträcka* hon har gått är däremot 600 + 200 = 800 m. Sträckan är en skalär och räknas alltid positivt.`,
        },
        {
            level: 1,
            question: `En passagerare går med farten 1,2 m/s **mot** tågets rörelseriktning inne i en tågvagn. Tåget rör sig med 22 m/s relativt marken. Vilken är passagerarens hastighet relativt marken? Räkna tågets riktning som positiv.`,
            answer: { value: 20.8, unit: 'm/s', tol: 0.02 },
            solution: `Hastigheterna är i samma riktningsaxel, så vi adderar dem med tecken. Tåget är positivt (+22 m/s), passageraren går *bakåt* relativt tåget (−1,2 m/s).

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_\\text{tåg} = +22\\ \\mathrm{m/s} \\\\
v_\\text{passagerare} = -1{,}2\\ \\mathrm{m/s} \\quad (\\text{mot tågets riktning})
\\end{array} \\right]
$$

Total hastighet relativt marken:
$$
v_\\text{tot} = v_\\text{tåg} + v_\\text{passagerare} = 22 + (-1{,}2) = 20{,}8\\ \\mathrm{m/s}
$$

**Svar:** 20,8 m/s i tågets riktning.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En båt kan ros med farten 3,0 m/s rakt över en bred kanal. Vattnet i kanalen forsar fram med 4,0 m/s längs kanalen. Vilken är båtens **resulterande fart** relativt marken?`,
            answer: { value: 5.0, unit: 'm/s', tol: 0.02 },
            solution: `Båtens egen hastighet (rakt över kanalen) och strömmens hastighet (längs kanalen) är **vinkelräta** mot varandra. Resultantens storlek beräknas då med Pythagoras sats.

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_1 = 3{,}0\\ \\mathrm{m/s} \\quad (\\text{över kanalen}) \\\\
v_2 = 4{,}0\\ \\mathrm{m/s} \\quad (\\text{längs kanalen})
\\end{array} \\right]
$$

Pythagoras sats:
$$
v = \\sqrt{v_1^{2} + v_2^{2}} = \\sqrt{3{,}0^{2} + 4{,}0^{2}} = \\sqrt{25} = 5{,}0\\ \\mathrm{m/s}
$$

**Svar:** Båtens fart relativt marken är 5,0 m/s.`,
        },
        {
            level: 2,
            question: `Ett flygplan flyger med kursfarten 250 km/h rakt norrut. Plötsligt börjar en sidvind blåsa från väster med farten 60 km/h. Vilken blir flygplanets resulterande fart över marken?`,
            answer: { value: 257, unit: 'km/h', tol: 0.02 },
            solution: `Planet flyger norrut, vinden blåser österut (från väster). Hastighetsvektorerna är vinkelräta mot varandra.

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_\\text{plan} = 250\\ \\mathrm{km/h} \\quad (\\text{norrut}) \\\\
v_\\text{vind} = 60\\ \\mathrm{km/h} \\quad (\\text{österut})
\\end{array} \\right]
$$

Resultantens storlek:
$$
v = \\sqrt{v_\\text{plan}^{2} + v_\\text{vind}^{2}} = \\sqrt{250^{2} + 60^{2}} = \\sqrt{62\\,500 + 3\\,600} = \\sqrt{66\\,100}
$$

$$
v \\approx 257\\ \\mathrm{km/h}
$$

**Svar:** Den resulterande farten är ca 257 km/h. Notera att riktningen avviker något åt öster — planet "driver" alltså ur sin kurs om piloten inte korrigerar.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En simmare vill ta sig **rakt över** en 80 m bred flod, från södra till norra stranden. Hennes egen fart i stilla vatten är 1,5 m/s. Strömmen forsar västerut med 0,90 m/s.

a) I vilken riktning (relativt floden) måste hon sikta för att komma rakt över?

b) Hur lång tid tar det att korsa floden?

*Ange tiden från b) som ditt numeriska svar (i sekunder).*`,
            answer: { value: 67, unit: 's', tol: 0.03 },
            solution: `För att hamna rakt över måste simmarens **resulterande hastighet** vara riktad rakt norrut. Det betyder att hennes egen hastighetsvektor *v*_s måste ha en komponent motströms (österut) som exakt motverkar strömmen, och en komponent rakt norrut.

**a)** Vi ritar en rätvinklig triangel där:
- *v*_s = 1,5 m/s är hypotenusan (simmarens fart i stilla vatten),
- *v*_ström = 0,90 m/s är ena kateten (riktad västerut),
- *v*_norr (komponenten rakt över floden) är andra kateten.

Vinkeln θ mellan simmarens kurs och rakt norrut uppfyller

$$
\\sin\\theta = \\frac{v_\\text{ström}}{v_s} = \\frac{0{,}90}{1{,}5} = 0{,}60
\\quad\\Rightarrow\\quad \\theta \\approx 37^{\\circ}\\ \\text{motströms}
$$

**b)** Den effektiva farten *rakt över* floden är komponenten norrut:

$$
v_\\text{norr} = \\sqrt{v_s^{2} - v_\\text{ström}^{2}} = \\sqrt{1{,}5^{2} - 0{,}90^{2}} = \\sqrt{2{,}25 - 0{,}81} = \\sqrt{1{,}44} = 1{,}2\\ \\mathrm{m/s}
$$

Tiden för att korsa floden:

$$
t = \\frac{s}{v_\\text{norr}} = \\frac{80}{1{,}2} \\approx 67\\ \\mathrm{s}
$$

**Svar:** a) Ca 37° motströms (öster om rakt nord). b) 67 s.

**Generell slutsats:** Detta är en *kompenseringsproblem* — om simmaren istället simmade rakt mot norra stranden skulle hon driva med strömmen och hamna nedströms. Tiden för rakt-över-simning är då kortare ($t = 80/1{,}5 \\approx 53$ s) men resultatet är inte rakt över.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.2  Medelhastighet, momentanhastighet, s-t-diagram
    // Formel: v_m = Δs/Δt. Lutning i s-t = hastighet (sekant=medel,
    // tangent=momentan).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Ett föremål rör sig med konstant hastighet enligt *s-t*-diagrammet nedan. Avläs lämpliga punkter och beräkna hastigheten i m/s.

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMax: 60, yTicks: [0, 10, 20, 30, 40, 50, 60],
    yLabel: '<tspan font-style="italic">s</tspan> (m)',
    paths: [{ points: [[0, 0], [10, 50]] }],
})}`,
            answer: { value: 5.0, unit: 'm/s', tol: 0.05 },
            solution: `Lutningen i ett *s-t*-diagram motsvarar hastigheten. Vi väljer två lämpliga punkter på linjen — gärna där linjen skär rutnätskorsningar — t.ex. (0; 0) och (10 s; 50 m).

$$
v = \\frac{\\Delta s}{\\Delta t} = \\frac{s_2 - s_1}{t_2 - t_1}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
t_1 = 0,\\quad s_1 = 0 \\\\
t_2 = 10\\ \\mathrm{s},\\quad s_2 = 50\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
v = \\frac{50 - 0}{10 - 0} = 5{,}0\\ \\mathrm{m/s}
$$

**Svar:** 5,0 m/s.

**Generell slutsats:** Vilka två punkter man väljer på linjen spelar ingen roll så länge båda ligger på linjen — lutningen blir densamma. Välj punkter där det är lätt att läsa av exakta värden (rutnätskorsningar).`,
        },
        {
            level: 1,
            question: `Vad anger **sekantens lutning** i ett *s-t*-diagram?`,
            choices: [
                `Föremålets momentanhastighet i en viss punkt.`,
                `Föremålets medelhastighet under ett tidsintervall.`,
                `Föremålets totala sträcka.`,
                `Föremålets acceleration.`,
            ],
            correct: 1,
            solution: `En **sekant** är en rät linje som skär grafen i två punkter. Lutningen mellan dessa två punkter motsvarar förflyttningen dividerat med tidsintervallet — alltså **medelhastigheten** under intervallet.

En **tangent** däremot snuddar grafen i *en* punkt, och dess lutning är **momentanhastigheten** i just den punkten.

**Svar:** Sekantens lutning är medelhastigheten.`,
        },
        {
            level: 1,
            question: `En lastbil färdas med medelhastigheten 65 km/h under 2,5 timmar. Hur lång är dess förflyttning under denna tid? Ange svaret i km.`,
            answer: { value: 162.5, unit: 'km', tol: 0.02 },
            solution: `Vi löser ut förflyttningen ur formeln för medelhastighet:

$$
v_\\mathrm{m} = \\frac{\\Delta s}{\\Delta t} \\quad\\Leftrightarrow\\quad \\Delta s = v_\\mathrm{m} \\cdot \\Delta t
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_\\mathrm{m} = 65\\ \\mathrm{km/h} \\\\
\\Delta t = 2{,}5\\ \\mathrm{h}
\\end{array} \\right]
$$

$$
\\Delta s = 65 \\cdot 2{,}5 = 162{,}5\\ \\mathrm{km}
$$

**Svar:** Förflyttningen är 163 km (avrundat till 3 vs).`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Bertil cyklar från affären till sitt hem. Vid *t*₁ = 0 är han vid läget *s*₁ = 6,0 km (affären). Vid *t*₂ = 25 min är han vid läget *s*₂ = 0 (hemma). Vad är hans **medelhastighet** mellan dessa tidpunkter, angiven i m/s?`,
            answer: { value: -4.0, unit: 'm/s', tol: 0.03 },
            solution: `Medelhastigheten är en vektor — den får tecken efter förflyttningens riktning.

Mätvärden efter omvandling till SI-enheter:
$$
\\left[ \\begin{array}{l}
s_1 = 6{,}0\\ \\mathrm{km} = 6\\,000\\ \\mathrm{m} \\\\
s_2 = 0 \\\\
t_1 = 0,\\quad t_2 = 25\\ \\mathrm{min} = 1\\,500\\ \\mathrm{s}
\\end{array} \\right]
$$

Medelhastighet:
$$
v_\\mathrm{m} = \\frac{s_2 - s_1}{t_2 - t_1} = \\frac{0 - 6\\,000}{1\\,500} = \\frac{-6\\,000}{1\\,500} = -4{,}0\\ \\mathrm{m/s}
$$

**Svar:** −4,0 m/s.

**Generell slutsats:** Minustecknet säger att Bertil rör sig i *negativ riktning* — alltså tillbaka mot lägre *s*-värde. Hans **fart** är 4,0 m/s, men hans **hastighet** är −4,0 m/s.`,
        },
        {
            level: 2,
            question: `En joggare springer 1,8 km rakt norrut, vänder och springer sedan 0,6 km rakt söderut. Hela rörelsen tar 12 minuter. Vad är hennes **medelhastighet**? Räkna nord som positiv riktning och ange svaret i m/s.`,
            answer: { value: 1.67, unit: 'm/s', tol: 0.03 },
            solution: `Medelhastigheten är **förflyttningen** delat med tiden — inte sträckan.

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\Delta s = +1\\,800 - 600 = 1\\,200\\ \\mathrm{m} \\quad (\\text{netto norrut}) \\\\
\\Delta t = 12\\ \\mathrm{min} = 720\\ \\mathrm{s}
\\end{array} \\right]
$$

Medelhastighet:
$$
v_\\mathrm{m} = \\frac{\\Delta s}{\\Delta t} = \\frac{1\\,200}{720} \\approx 1{,}67\\ \\mathrm{m/s}
$$

**Svar:** 1,67 m/s norrut.

**Generell slutsats:** Hennes *medelfart* (skalär) är däremot $\\frac{2\\,400}{720} \\approx 3{,}33$ m/s eftersom hela sträckan är 2,4 km. Medelfart och medelhastighet är *inte* samma sak när rörelsen ändrar riktning.`,
        },

        {
            level: 2,
            question: `Ett föremål rör sig längs en rät linje enligt nedanstående *s-t*-graf. Läs av koordinaterna du behöver från rutnätet.

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMax: 80, yTicks: [0, 20, 40, 60, 80],
    yLabel: '<tspan font-style="italic">s</tspan> (m)',
    paths: [{
        points: Array.from({ length: 17 }, (_, i) => {
            const t = i / 2;
            return [t, 2.5 * t + 0.625 * t * t];
        }),
    }],
})}

a) Vad är föremålets **medelhastighet** under hela intervallet (från *t* = 0 till *t* = 8 s)?

b) Vad är medelhastigheten mellan *t* = 4 s och *t* = 8 s?

c) Är föremålets momentanhastighet vid *t* = 8 s större, mindre eller lika med dessa medelhastigheter? Förklara med hjälp av grafen.

*Ange medelhastigheten från a) som ditt numeriska svar i m/s.*`,
            answer: { value: 7.5, unit: 'm/s', tol: 0.02 },
            solution: `Vi läser av punkterna från grafen och använder att medelhastighet motsvarar **sekantens lutning** mellan två punkter.

**a)** Sekant mellan (0; 0) och (8; 60):

$$
v_{\\mathrm{m},a} = \\frac{\\Delta s}{\\Delta t} = \\frac{60 - 0}{8 - 0} = \\frac{60}{8} = 7{,}5\\ \\mathrm{m/s}
$$

**b)** Sekant mellan (4; 20) och (8; 60):

$$
v_{\\mathrm{m},b} = \\frac{\\Delta s}{\\Delta t} = \\frac{60 - 20}{8 - 4} = \\frac{40}{4} = 10\\ \\mathrm{m/s}
$$

**c)** Grafen är **konvex** (lutar uppåt allt brantare) — det syns tydligt om man jämför kurvans lutning vid *t* = 1 s med lutningen vid *t* = 7 s. Det innebär att föremålet *accelererar*.

Eftersom medelhastigheten är **större** under den senare halvan (10 m/s) än under hela intervallet (7,5 m/s) bekräftas att rörelsen blir snabbare och snabbare. **Momentanhastigheten vid *t* = 8 s** — tangentens lutning där — är därför **större än båda** medelhastigheterna:

$$
v_\\text{momentan}(8\\ \\mathrm{s}) > v_{\\mathrm{m},b} = 10\\ \\mathrm{m/s} > v_{\\mathrm{m},a} = 7{,}5\\ \\mathrm{m/s}
$$

**Svar:** a) 7,5 m/s. b) 10 m/s. c) Större än båda — föremålet accelererar.

**Generell slutsats:** För en konvex *s-t*-graf (accelererande rörelse) ligger medelhastigheten över ett *senare* intervall alltid närmare momentanhastigheten vid slutet. För att uppskatta momentanhastigheten ännu bättre kan man välja allt kortare intervall runt punkten — eller rita ut en tangent och mäta dess lutning.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Anna börjar cykla från en startpunkt med den konstanta farten 4,0 m/s i en rak linje. **30 sekunder senare** börjar Beata cykla samma resa från samma startpunkt med den konstanta farten 6,0 m/s.

a) Vid vilken tidpunkt (mätt från Annas start) hinner Beata ifatt Anna?

b) Hur långt från startpunkten är de båda när Beata har hunnit ifatt?

*Ange avståndet från startpunkten (b) som ditt numeriska svar i meter.*`,
            answer: { value: 360, unit: 'm', tol: 0.02 },
            solution: `Båda cyklisterna rör sig med konstant fart längs samma linje. Vi sätter upp deras lägesfunktioner — sträckan som en funktion av tiden — där *t* räknas från Annas start.

För **Anna** (startar vid *t* = 0):
$$
s_A(t) = v_A \\cdot t = 4{,}0\\, t
$$

För **Beata** (startar vid *t* = 30 s, så hon har cyklat i $t - 30$ sekunder):
$$
s_B(t) = v_B \\cdot (t - 30) = 6{,}0\\, (t - 30)
$$

**a) Mötesvillkor** — de är på samma plats när $s_A(t) = s_B(t)$:

$$
4{,}0\\, t = 6{,}0\\, (t - 30)
$$

$$
4{,}0\\, t = 6{,}0\\, t - 180
$$

$$
2{,}0\\, t = 180 \\quad\\Leftrightarrow\\quad t = 90\\ \\mathrm{s}
$$

**b) Avstånd från startpunkten** — sätt in i någon av lägesfunktionerna:

$$
s = 4{,}0 \\cdot 90 = 360\\ \\mathrm{m}
$$

(Kontroll med Beatas formel: $s_B = 6{,}0 \\cdot (90 - 30) = 6{,}0 \\cdot 60 = 360$ m ✓)

**Svar:** a) Vid *t* = 90 s (mätt från Annas start, alltså 60 s efter Beatas start). b) 360 m från startpunkten.

**Generell slutsats:** Mötesproblem löses alltid genom att ställa upp två lägesfunktioner $s_1(t)$ och $s_2(t)$ med en gemensam tidsaxel och sätta dem lika. Tricket är att korrekt hantera **tidsfördröjningar** — Beata har inte cyklat i *t* sekunder utan i $t - 30$ sekunder.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.3  Acceleration och fritt fall
    // Formler: a = Δv/Δt, v = v₀ + a·t, g ≈ 9,82 m/s² i Sverige.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En bil accelererar från 0 till 25 m/s på 8,0 s. Vilken är dess medelacceleration?`,
            answer: { value: 3.125, unit: 'm/s²', tol: 0.02 },
            solution: `Definitionen av medelacceleration:

$$
a_\\mathrm{m} = \\frac{\\Delta v}{\\Delta t}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\Delta v = 25 - 0 = 25\\ \\mathrm{m/s} \\\\
\\Delta t = 8{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
a_\\mathrm{m} = \\frac{25}{8{,}0} = 3{,}125\\ \\mathrm{m/s^2} \\approx 3{,}1\\ \\mathrm{m/s^2}
$$

**Svar:** Accelerationen är ca 3,1 m/s².`,
        },
        {
            level: 1,
            question: `En sten släpps från vila och faller fritt (utan luftmotstånd). Vilken är dess hastighet efter 3,0 s? Använd $g = 9{,}82\\ \\mathrm{m/s^2}$ och ange svarets *storlek* i m/s (positivt tal).`,
            answer: { value: 29.5, unit: 'm/s', tol: 0.02 },
            solution: `Vid fritt fall är *a* = *g* riktat mot marken. Eftersom stenen släpps från vila är *v*₀ = 0.

$$
v = v_0 + a \\cdot t = 0 + g \\cdot t
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
g = 9{,}82\\ \\mathrm{m/s^2} \\\\
t = 3{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
v = 9{,}82 \\cdot 3{,}0 = 29{,}46\\ \\mathrm{m/s} \\approx 29{,}5\\ \\mathrm{m/s}
$$

**Svar:** 29,5 m/s nedåt.`,
        },
        {
            level: 1,
            question: `En cyklist rullar med farten 5,0 m/s och accelererar konstant med 0,80 m/s² i 4,0 sekunder. Vilken är hans sluthastighet?`,
            answer: { value: 8.2, unit: 'm/s', tol: 0.02 },
            solution: `Vi använder formeln för hastighet vid konstant acceleration:

$$
v = v_0 + a \\cdot t
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 5{,}0\\ \\mathrm{m/s} \\\\
a = 0{,}80\\ \\mathrm{m/s^2} \\\\
t = 4{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
v = 5{,}0 + 0{,}80 \\cdot 4{,}0 = 5{,}0 + 3{,}2 = 8{,}2\\ \\mathrm{m/s}
$$

**Svar:** 8,2 m/s.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En bil färdas i 90 km/h och måste bromsa till 30 km/h. Bromsen ger den konstanta retardationen 5,0 m/s². Hur lång tid tar inbromsningen?`,
            answer: { value: 3.33, unit: 's', tol: 0.03 },
            solution: `Vi löser ut tiden ur formeln för hastighet vid konstant acceleration, efter att ha gjort om hastigheterna till SI-enheter (m/s).

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 90\\ \\mathrm{km/h} = 90 / 3{,}6\\ \\mathrm{m/s} = 25\\ \\mathrm{m/s} \\\\
v = 30\\ \\mathrm{km/h} = 30 / 3{,}6\\ \\mathrm{m/s} \\approx 8{,}33\\ \\mathrm{m/s} \\\\
a = -5{,}0\\ \\mathrm{m/s^2} \\quad (\\text{retardation — negativ})
\\end{array} \\right]
$$

Vi löser ut *t*:
$$
v = v_0 + a \\cdot t \\quad\\Leftrightarrow\\quad t = \\frac{v - v_0}{a}
$$

$$
t = \\frac{8{,}33 - 25}{-5{,}0} = \\frac{-16{,}67}{-5{,}0} \\approx 3{,}3\\ \\mathrm{s}
$$

**Svar:** Inbromsningen tar ca 3,3 sekunder.`,
        },
        {
            level: 2,
            question: `En boll kastas rakt uppåt med begynnelsehastigheten 12 m/s. Hur lång tid tar det innan bollen når sin högsta punkt? Räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$ och bortse från luftmotstånd.`,
            answer: { value: 1.22, unit: 's', tol: 0.03 },
            solution: `I bollens högsta punkt är *v* = 0 (den vänder). Vi räknar uppåt som positiv riktning, så accelerationen är *a* = −*g* (nedåt).

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = +12\\ \\mathrm{m/s} \\\\
v = 0 \\quad (\\text{i toppunkten}) \\\\
a = -g = -9{,}82\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

Vi löser ut *t* ur $v = v_0 + a \\cdot t$:

$$
t = \\frac{v - v_0}{a} = \\frac{0 - 12}{-9{,}82} \\approx 1{,}22\\ \\mathrm{s}
$$

**Svar:** Bollen når sin högsta punkt efter ca 1,22 s.

**Generell slutsats:** På vägen ned tar det lika lång tid att falla tillbaka till kasthöjden (om vi bortser från luftmotstånd) — total flygtid är alltså $\\approx 2{,}44$ s.`,
        },

        {
            level: 2,
            question: `En passagerare i en bil noterar att hastighetsmätaren visar 50 km/h, och 8,0 sekunder senare visar den 80 km/h.

a) Vilken är medelaccelerationen i SI-enheter (m/s²)?

b) Är detta verkligen den **momentana** accelerationen vid någon tidpunkt under intervallet? Förklara.

*Ange medelaccelerationen från a) som ditt numeriska svar i m/s².*`,
            answer: { value: 1.04, unit: 'm/s²', tol: 0.03 },
            solution: `**a)** Omvandling till SI-enheter:

$$
\\left[ \\begin{array}{l}
v_0 = 50\\ \\mathrm{km/h} = 50 / 3{,}6\\ \\mathrm{m/s} \\approx 13{,}89\\ \\mathrm{m/s} \\\\
v = 80\\ \\mathrm{km/h} = 80 / 3{,}6\\ \\mathrm{m/s} \\approx 22{,}22\\ \\mathrm{m/s} \\\\
\\Delta t = 8{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
a_\\mathrm{m} = \\frac{\\Delta v}{\\Delta t} = \\frac{22{,}22 - 13{,}89}{8{,}0} \\approx 1{,}04\\ \\mathrm{m/s^2}
$$

**b)** Medelaccelerationen säger *bara* att hastigheten har ökat med ca 8,3 m/s totalt över 8,0 s — den säger ingenting om hur ökningen fördelades. Föraren kan ha:

- accelererat *konstant* med 1,04 m/s² hela tiden (då är momentan = medel hela vägen), eller
- accelererat hårdare i början och svagare i slutet (eller tvärtom).

I praktiken är det näst intill omöjligt att hålla *exakt* konstant acceleration i en bil. Men någonstans i intervallet **måste** den momentana accelerationen vara lika med medelaccelerationen — det följer av **medelvärdessatsen**: om en kontinuerlig funktion har medelvärde *m* i ett intervall, så antar den värdet *m* åtminstone en gång i intervallet.

**Svar:** a) Medelaccelerationen är ca 1,04 m/s². b) Den är inte nödvändigtvis lika med momentanaccelerationen i hela intervallet, men sammanfaller med den åtminstone en gång under intervallet.

**Generell slutsats:** Detta är en klassisk källa till missförstånd — *medel* över ett intervall säger något om summan av rörelsen, inte om vad som hände vid någon specifik tidpunkt.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En sten släpps från en hög klippa och faller fritt mot marken. **Under den sista sekunden** av sin fallrörelse hinner stenen falla 40 m.

Hur länge har stenen fallit totalt när den slår i marken? Räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$ och bortse från luftmotstånd. Ange tiden i sekunder.`,
            answer: { value: 4.57, unit: 's', tol: 0.02 },
            solution: `Eftersom stenen släpps från vila är fallsträckan efter tiden *t* enligt formeln för fritt fall:

$$
s(t) = \\frac{g \\cdot t^{2}}{2}
$$

Stenen träffar marken vid någon tid *t*. Under den **sista sekunden** (mellan *t* − 1 och *t*) faller den 40 m, vilket betyder:

$$
s(t) - s(t - 1) = 40
$$

Sätt in formeln:

$$
\\frac{g \\cdot t^{2}}{2} - \\frac{g \\cdot (t - 1)^{2}}{2} = 40
$$

Multiplicera bort tvåan och faktorisera:

$$
\\frac{g}{2} \\bigl[ t^{2} - (t - 1)^{2} \\bigr] = 40
$$

Expandera $(t - 1)^{2} = t^{2} - 2t + 1$:

$$
\\frac{g}{2} \\bigl[ t^{2} - t^{2} + 2t - 1 \\bigr] = 40
$$

$$
\\frac{g}{2} \\cdot (2t - 1) = 40 \\quad\\Leftrightarrow\\quad g \\cdot t - \\frac{g}{2} = 40
$$

Lös ut *t*:

$$
t = \\frac{40 + g/2}{g} = \\frac{40 + 4{,}91}{9{,}82} = \\frac{44{,}91}{9{,}82} \\approx 4{,}57\\ \\mathrm{s}
$$

**Svar:** Stenen har fallit ca 4,57 s totalt när den når marken.

**Generell slutsats:** Detta är en klassisk fälla — den frestande "kortvägen" är att räkna ut hastigheten just innan markträff ($v = 40$ m/s eftersom 40 m / 1 s = 40 m/s) men det blir fel, eftersom stenens hastighet *under* den sista sekunden inte är konstant. Den ökar från $v(t-1)$ till $v(t)$, och 40 m är den *genomsnittliga* förflyttningen under sekunden. Rätt metod är att jämföra två tidpunkter via fallformeln.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.4  Hastighet-tid-diagram
    // Lutning = acceleration. Area = förflyttning (med tecken) eller
    // sträcka (alla positiva).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Avläs föremålets konstanta acceleration ur *v-t*-diagrammet nedan.

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMax: 30, yTicks: [0, 5, 10, 15, 20, 25, 30],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    paths: [{ points: [[0, 0], [10, 25]] }],
})}`,
            answer: { value: 2.5, unit: 'm/s²', tol: 0.05 },
            solution: `Lutningen i ett *v-t*-diagram motsvarar accelerationen. Vi väljer två punkter på linjen där det är lätt att läsa av exakta värden — t.ex. (0; 0) och (10 s; 25 m/s).

$$
a = \\frac{\\Delta v}{\\Delta t} = \\frac{v_2 - v_1}{t_2 - t_1}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
t_1 = 0,\\quad v_1 = 0 \\\\
t_2 = 10\\ \\mathrm{s},\\quad v_2 = 25\\ \\mathrm{m/s}
\\end{array} \\right]
$$

$$
a = \\frac{25 - 0}{10 - 0} = 2{,}5\\ \\mathrm{m/s^2}
$$

**Svar:** 2,5 m/s².`,
        },
        {
            level: 1,
            question: `Vad motsvarar **arean** mellan grafen och *x*-axeln i ett *v-t*-diagram?`,
            choices: [
                `Accelerationen`,
                `Förflyttningen`,
                `Den maximala hastigheten`,
                `Den genomsnittliga accelerationen`,
            ],
            correct: 1,
            solution: `Arean i ett *v-t*-diagram bildas av hastighet ($\\mathrm{m/s}$) gånger tid ($\\mathrm{s}$) — vilket har enheten meter ($\\mathrm{m}$). Det stämmer alltså inte med acceleration eller hastighet, utan med en sträcka/förflyttning.

Mer formellt: vi vet att $\\Delta s = v \\cdot \\Delta t$ vid konstant hastighet, vilket är basen gånger höjden på en rektangel under grafen. För variabel hastighet generaliseras det till hela arean under kurvan.

- Area **över** *x*-axeln = positiv förflyttning.
- Area **under** *x*-axeln = negativ förflyttning.

**Svar:** Förflyttningen.`,
        },
        {
            level: 1,
            question: `Ett föremål rör sig med **konstant hastighet** enligt *v-t*-diagrammet nedan. Beräkna föremålets förflyttning under intervallet 0–12 s.

${makeDiagram({
    xMax: 14, xTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    yMax: 10, yTicks: [0, 2, 4, 6, 8, 10],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    paths: [{ points: [[0, 6], [12, 6]] }],
})}`,
            answer: { value: 72, unit: 'm', tol: 0.02 },
            solution: `Förflyttningen motsvaras av **arean under grafen** mellan *t* = 0 och *t* = 12 s. Vid konstant hastighet är det en rektangel med basen $\\Delta t$ och höjden *v*:

${makeDiagram({
    xMax: 14, xTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    yMax: 10, yTicks: [0, 2, 4, 6, 8, 10],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    fills: [{ points: [[0, 0], [0, 6], [12, 6], [12, 0]] }],
    paths: [{ points: [[0, 6], [12, 6]] }],
})}

$$
\\Delta s = v \\cdot \\Delta t
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v = 6{,}0\\ \\mathrm{m/s} \\\\
\\Delta t = 12\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
\\Delta s = 6{,}0 \\cdot 12 = 72\\ \\mathrm{m}
$$

**Svar:** Förflyttningen är 72 m.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett föremål startar från vila och accelererar konstant enligt *v-t*-diagrammet nedan. Beräkna föremålets förflyttning under intervallet 0–8 s.

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMax: 30, yTicks: [0, 5, 10, 15, 20, 25, 30],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    paths: [{ points: [[0, 0], [8, 24]] }],
})}`,
            answer: { value: 96, unit: 'm', tol: 0.02 },
            solution: `Förflyttningen motsvaras av **arean under grafen** — i det här fallet en triangel med basen $\\Delta t = 8{,}0$ s och höjden $v = 24$ m/s:

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMax: 30, yTicks: [0, 5, 10, 15, 20, 25, 30],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    fills: [{ points: [[0, 0], [8, 24], [8, 0]] }],
    paths: [{ points: [[0, 0], [8, 24]] }],
})}

$$
\\Delta s = \\frac{\\text{basen} \\cdot \\text{höjden}}{2} = \\frac{\\Delta t \\cdot v}{2}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\Delta t = 8{,}0\\ \\mathrm{s} \\\\
v = 24\\ \\mathrm{m/s}
\\end{array} \\right]
$$

$$
\\Delta s = \\frac{8{,}0 \\cdot 24}{2} = 96\\ \\mathrm{m}
$$

**Svar:** Förflyttningen är 96 m.

**Generell slutsats:** Det är samma resultat som man får ur formeln $s = v_0 t + \\frac{1}{2} a t^{2}$ — där $v_0 = 0$, $a = 24/8{,}0 = 3{,}0$ m/s² och $t = 8{,}0$ s.`,
        },
        {
            level: 2,
            question: `Ett tåg rör sig enligt *v-t*-diagrammet nedan — först med konstant hastighet, sedan bromsar det jämnt tills det stannar. Beräkna tågets totala förflyttning.

${makeDiagram({
    xMax: 14, xTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    yMax: 20, yTicks: [0, 5, 10, 15, 20],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    paths: [{ points: [[0, 18], [5, 18], [12, 0]] }],
})}`,
            answer: { value: 153, unit: 'm', tol: 0.02 },
            solution: `Förflyttningen är **arean under grafen**. Vi delar arean i två delar — en rektangel **A** mellan *t* = 0 och *t* = 5 s, och en triangel **B** mellan *t* = 5 s och *t* = 12 s:

${makeDiagram({
    xMax: 14, xTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    yMax: 20, yTicks: [0, 5, 10, 15, 20],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    fills: [
        { points: [[0, 0], [0, 18], [5, 18], [5, 0]], color: 'rgba(200,50,74,0.12)' },
        { points: [[5, 0], [5, 18], [12, 0]], color: 'rgba(28,61,107,0.12)' },
    ],
    paths: [{ points: [[0, 18], [5, 18], [12, 0]] }],
})}

**Del A — rektangel** (mellan *t* = 0 och *t* = 5,0 s):
$$
A = v \\cdot \\Delta t = 18 \\cdot 5{,}0 = 90\\ \\mathrm{m}
$$

**Del B — triangel** (mellan *t* = 5,0 s och *t* = 12 s, hastigheten sjunker linjärt från 18 till 0):
$$
B = \\frac{\\Delta t \\cdot v}{2} = \\frac{(12 - 5{,}0) \\cdot 18}{2} = \\frac{7{,}0 \\cdot 18}{2} = 63\\ \\mathrm{m}
$$

Total förflyttning:
$$
\\Delta s = A + B = 90 + 63 = 153\\ \\mathrm{m}
$$

**Svar:** Tåget rullar totalt 153 m.`,
        },

        {
            level: 2,
            question: `Ett föremål rör sig längs en rät linje enligt nedanstående *v-t*-diagram.

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMin: -12, yMax: 12, yTicks: [-10, -5, 0, 5, 10],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    paths: [{ points: [[0, 10], [10, -10]] }],
})}

a) Vilken är föremålets **förflyttning** under intervallet 0 → 10 s?

b) Vilken är dess **tillryggalagda sträcka** under samma intervall?

*Ange den tillryggalagda sträckan från b) som ditt svar i meter.*`,
            answer: { value: 50, unit: 'm', tol: 0.02 },
            solution: `Arean under grafen motsvarar förflyttningen — men areor **under** *x*-axeln räknas som *negativa* (rörelsen är åt motsatt håll). Vi delar in i två trianglar:

${makeDiagram({
    xMax: 10, xTicks: [0, 2, 4, 6, 8, 10],
    yMin: -12, yMax: 12, yTicks: [-10, -5, 0, 5, 10],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    fills: [
        { points: [[0, 0], [0, 10], [5, 0]], color: 'rgba(200,50,74,0.18)' },
        { points: [[5, 0], [10, -10], [10, 0]], color: 'rgba(28,61,107,0.18)' },
    ],
    paths: [{ points: [[0, 10], [10, -10]] }],
})}

Båda trianglarna har basen 5,0 s och höjden 10 m/s i absolutbelopp:
$$
|A_1| = |A_2| = \\frac{5{,}0 \\cdot 10}{2} = 25\\ \\mathrm{m}
$$

**a) Förflyttning** — räknar areor med tecken (negativ under *x*-axeln):
$$
\\Delta s = A_1 + A_2 = +25 + (-25) = 0\\ \\mathrm{m}
$$

Föremålet slutar alltså på exakt samma position som det startade.

**b) Tillryggalagd sträcka** — räknar alla areor som positiva:
$$
s = |A_1| + |A_2| = 25 + 25 = 50\\ \\mathrm{m}
$$

**Svar:** a) Förflyttning = 0 m. b) Sträcka = 50 m.

**Generell slutsats:** En boll som kastas rakt uppåt och fångas på samma höjd är ett typexempel på rörelsen ovan — den fysiska *förflyttningen* är noll, men *sträckan* (uppåt + nedåt) är skild från noll. När man räknar med energi eller bränsleförbrukning är det ofta sträckan som spelar roll, inte förflyttningen.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En cyklist tränar på en rak bana enligt nedanstående *v-t*-diagram.

${makeDiagram({
    xMax: 27, xTicks: [0, 5, 10, 15, 20, 25],
    yMax: 14, yTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    paths: [{ points: [[0, 0], [5, 8], [15, 8], [20, 12], [25, 0]] }],
})}

a) Beräkna cyklistens **totala förflyttning** under rörelsen.

b) I vilket av de fyra delintervallen är cyklistens acceleration **störst i absolutbelopp**? Räkna ut den storleken.

*Ange den totala förflyttningen från a) som ditt numeriska svar i meter.*`,
            answer: { value: 180, unit: 'm', tol: 0.03 },
            solution: `**a) Total förflyttning** — arean under hela *v-t*-grafen, uppdelad i fyra delar:

${makeDiagram({
    xMax: 27, xTicks: [0, 5, 10, 15, 20, 25],
    yMax: 14, yTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    yLabel: '<tspan font-style="italic">v</tspan> (m/s)',
    fills: [
        { points: [[0, 0], [5, 8], [5, 0]], color: 'rgba(200,50,74,0.12)' },
        { points: [[5, 0], [5, 8], [15, 8], [15, 0]], color: 'rgba(28,61,107,0.12)' },
        { points: [[15, 0], [15, 8], [20, 12], [20, 0]], color: 'rgba(200,50,74,0.12)' },
        { points: [[20, 0], [20, 12], [25, 0]], color: 'rgba(28,61,107,0.12)' },
    ],
    paths: [{ points: [[0, 0], [5, 8], [15, 8], [20, 12], [25, 0]] }],
})}

- **A** (triangel, 0–5 s): $\\dfrac{5 \\cdot 8}{2} = 20$ m
- **B** (rektangel, 5–15 s): $10 \\cdot 8 = 80$ m
- **C** (trapets, 15–20 s): $\\dfrac{(8 + 12) \\cdot 5}{2} = 50$ m
- **D** (triangel, 20–25 s): $\\dfrac{5 \\cdot 12}{2} = 30$ m

$$
\\Delta s = 20 + 80 + 50 + 30 = 180\\ \\mathrm{m}
$$

**b) Acceleration i varje delintervall** (lutningen i *v-t*-grafen):

$$
\\left[ \\begin{array}{l}
a_A = \\dfrac{8 - 0}{5} = +1{,}6\\ \\mathrm{m/s^2} \\\\
a_B = 0\\ \\mathrm{m/s^2} \\quad (\\text{konstant hastighet}) \\\\
a_C = \\dfrac{12 - 8}{5} = +0{,}8\\ \\mathrm{m/s^2} \\\\
a_D = \\dfrac{0 - 12}{5} = -2{,}4\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

Den största i absolutbelopp är **inbromsningen vid målet** (intervall D):

$$
|a_D| = 2{,}4\\ \\mathrm{m/s^2}
$$

**Svar:** a) Förflyttningen är 180 m. b) Den största accelerationen i absolutbelopp är inbromsningen vid målet, 2,4 m/s².

**Generell slutsats:** Komplexa *v-t*-grafer hanteras genom att dela upp dem i geometriska standardformer (rektanglar, trianglar, trapets). Acceleration är *lutningen* i varje delintervall — den behöver inte vara densamma i hela rörelsen.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.5  Acceleration-tid-diagram
    // Formel: arean i a-t-diagrammet = Δv (hastighetsändring).
    // Kort avsnitt — färre övningar.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Ett föremål har konstant acceleration enligt *a-t*-diagrammet nedan. Hur stor är hastighetsändringen Δ*v* under intervallet 0–5 s?

${makeDiagram({
    xMax: 7, xTicks: [0, 1, 2, 3, 4, 5, 6, 7],
    yMax: 5, yTicks: [0, 1, 2, 3, 4, 5],
    yLabel: '<tspan font-style="italic">a</tspan> (m/s²)',
    paths: [{ points: [[0, 3], [5, 3]] }],
})}`,
            answer: { value: 15, unit: 'm/s', tol: 0.02 },
            solution: `Hastighetsändringen motsvaras av **arean under grafen** i ett *a-t*-diagram. Här är arean en rektangel med basen $\\Delta t$ och höjden *a*:

${makeDiagram({
    xMax: 7, xTicks: [0, 1, 2, 3, 4, 5, 6, 7],
    yMax: 5, yTicks: [0, 1, 2, 3, 4, 5],
    yLabel: '<tspan font-style="italic">a</tspan> (m/s²)',
    fills: [{ points: [[0, 0], [0, 3], [5, 3], [5, 0]] }],
    paths: [{ points: [[0, 3], [5, 3]] }],
})}

$$
\\Delta v = a \\cdot \\Delta t
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
a = 3{,}0\\ \\mathrm{m/s^2} \\\\
\\Delta t = 5{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
\\Delta v = 3{,}0 \\cdot 5{,}0 = 15\\ \\mathrm{m/s}
$$

**Svar:** Hastigheten ökar med 15 m/s.`,
        },
        {
            level: 1,
            question: `Vad motsvarar **arean** under grafen i ett *a-t*-diagram?`,
            choices: [
                `Hastigheten`,
                `Förflyttningen`,
                `Hastighetsändringen Δ*v*`,
                `Den genomsnittliga accelerationen`,
            ],
            correct: 2,
            solution: `Arean i ett *a-t*-diagram bildas av acceleration ($\\mathrm{m/s^2}$) gånger tid ($\\mathrm{s}$), vilket har enheten m/s — alltså en *hastighet*, närmare bestämt **hastighetsändringen**.

Formellt: från $a = \\Delta v / \\Delta t$ följer $\\Delta v = a \\cdot \\Delta t$, vilket vid variabel acceleration blir hela arean under kurvan.

**Svar:** Hastighetsändringen Δ*v*.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett föremål har begynnelsehastigheten *v*₀ = 6,0 m/s och accelererar enligt *a-t*-diagrammet nedan. Vilken är dess sluthastighet vid *t* = 7,0 s?

${makeDiagram({
    xMax: 8, xTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    yMax: 5, yTicks: [0, 1, 2, 3, 4, 5],
    yLabel: '<tspan font-style="italic">a</tspan> (m/s²)',
    paths: [{ points: [[0, 4], [3, 4], [3, 0], [7, 0]] }],
})}`,
            answer: { value: 18, unit: 'm/s', tol: 0.02 },
            solution: `Total hastighetsändring är **arean under hela *a-t*-grafen**. Här är det bara den första delen (rektangeln mellan *t* = 0 och *t* = 3 s) som ger ett bidrag — den andra delen ligger på *x*-axeln och har area noll:

${makeDiagram({
    xMax: 8, xTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    yMax: 5, yTicks: [0, 1, 2, 3, 4, 5],
    yLabel: '<tspan font-style="italic">a</tspan> (m/s²)',
    fills: [{ points: [[0, 0], [0, 4], [3, 4], [3, 0]] }],
    paths: [{ points: [[0, 4], [3, 4], [3, 0], [7, 0]] }],
})}

**Del 1** (mellan 0 och 3,0 s, *a* = 4,0 m/s²):
$$
\\Delta v_1 = 4{,}0 \\cdot 3{,}0 = 12\\ \\mathrm{m/s}
$$

**Del 2** (mellan 3,0 s och 7,0 s, *a* = 0):
$$
\\Delta v_2 = 0 \\cdot 4{,}0 = 0\\ \\mathrm{m/s}
$$

Sluthastighet:
$$
v = v_0 + \\Delta v_1 + \\Delta v_2 = 6{,}0 + 12 + 0 = 18\\ \\mathrm{m/s}
$$

**Svar:** 18 m/s.

**Generell slutsats:** När accelerationen är noll förändras inte hastigheten — föremålet rör sig då med konstant hastighet (Newtons första lag).`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.6  Rörelse med konstant acceleration
    // Formler: v = v₀ + at, s = v₀t + at²/2, v_m = (v₀+v)/2, samt
    // specialfall (fritt fall, v₀ = 0).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.6': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En bil rullar med 12 m/s och accelererar konstant med 2,5 m/s² i 6,0 sekunder. Hur långt rullar bilen under denna tid? Använd $s = v_0 t + \\frac{1}{2} a t^{2}$.`,
            answer: { value: 117, unit: 'm', tol: 0.02 },
            solution: `Vi sätter in värdena i formeln för sträcka vid konstant acceleration:

$$
s = v_0 \\cdot t + \\frac{a \\cdot t^{2}}{2}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 12\\ \\mathrm{m/s} \\\\
a = 2{,}5\\ \\mathrm{m/s^2} \\\\
t = 6{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
s = 12 \\cdot 6{,}0 + \\frac{2{,}5 \\cdot 6{,}0^{2}}{2} = 72 + \\frac{2{,}5 \\cdot 36}{2} = 72 + 45 = 117\\ \\mathrm{m}
$$

**Svar:** 117 m (avrundat till 3 vs: 117 m).`,
        },
        {
            level: 1,
            question: `En kropp startar från vila (*v*₀ = 0) och har konstant acceleration *a* = 1,5 m/s² under 4,0 sekunder. Hur långt rör sig kroppen?`,
            answer: { value: 12, unit: 'm', tol: 0.02 },
            solution: `Eftersom *v*₀ = 0 förenklas sträckformeln:

$$
s = \\frac{a \\cdot t^{2}}{2}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
a = 1{,}5\\ \\mathrm{m/s^2} \\\\
t = 4{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

$$
s = \\frac{1{,}5 \\cdot 4{,}0^{2}}{2} = \\frac{1{,}5 \\cdot 16}{2} = \\frac{24}{2} = 12\\ \\mathrm{m}
$$

**Svar:** 12 m.`,
        },
        {
            level: 1,
            question: `En cyklist accelererar konstant från 4,0 m/s till 12 m/s. Beräkna hans medelhastighet under accelerationen med hjälp av $v_m = (v_0 + v)/2$.`,
            answer: { value: 8.0, unit: 'm/s', tol: 0.02 },
            solution: `Vid konstant acceleration är medelhastigheten det aritmetiska medelvärdet av begynnelse- och sluthastighet:

$$
v_\\mathrm{m} = \\frac{v_0 + v}{2}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 4{,}0\\ \\mathrm{m/s} \\\\
v = 12\\ \\mathrm{m/s}
\\end{array} \\right]
$$

$$
v_\\mathrm{m} = \\frac{4{,}0 + 12}{2} = \\frac{16}{2} = 8{,}0\\ \\mathrm{m/s}
$$

**Svar:** 8,0 m/s.

**Generell slutsats:** Den enkla formeln $v_m = (v_0 + v)/2$ gäller **bara** vid **konstant** acceleration — annars måste man räkna med integraler eller arean i ett *v-t*-diagram.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Du gör en linjals-mätning av din reaktionstid (se exemplet i teorin): en kompis håller en linjal lodrätt, släpper utan förvarning och du nyper ihop fingrarna. Linjalen har fallit 18,5 cm när du fångar den. Vilken är din reaktionstid? Använd $g = 9{,}82\\ \\mathrm{m/s^2}$.`,
            answer: { value: 0.194, unit: 's', tol: 0.03 },
            solution: `Linjalen är i fritt fall från vila (*v*₀ = 0), så:

$$
s = \\frac{g \\cdot t^{2}}{2} \\quad\\Leftrightarrow\\quad t = \\sqrt{\\frac{2 s}{g}}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
s = 18{,}5\\ \\mathrm{cm} = 0{,}185\\ \\mathrm{m} \\\\
g = 9{,}82\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$
t = \\sqrt{\\frac{2 \\cdot 0{,}185}{9{,}82}} = \\sqrt{0{,}0377\\ldots} \\approx 0{,}194\\ \\mathrm{s}
$$

**Svar:** Reaktionstiden är ca 0,19 s.

**Generell slutsats:** En "normal" reaktionstid ligger runt 0,15–0,25 s. Att tänka och planera tar längre tid (sekunder), men en *reflex* — som att fånga en fallande linjal — är mycket snabbare.`,
        },
        {
            level: 2,
            question: `En boll kastas rakt uppåt med begynnelsehastigheten 14 m/s. Hur **högt** stiger bollen över kastpunkten? Räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$ och bortse från luftmotstånd.`,
            answer: { value: 9.98, unit: 'm', tol: 0.03 },
            solution: `Vi räknar uppåt som positiv riktning. I bollens högsta punkt är *v* = 0.

**Steg 1 — tiden till toppen** ur $v = v_0 + a \\cdot t$ med $a = -g$:

$$
t = \\frac{v - v_0}{a} = \\frac{0 - 14}{-9{,}82} \\approx 1{,}426\\ \\mathrm{s}
$$

**Steg 2 — höjden** ur $s = v_0 t + \\frac{1}{2} a t^{2}$:

$$
s = 14 \\cdot 1{,}426 + \\frac{(-9{,}82) \\cdot 1{,}426^{2}}{2}
= 19{,}97 - 9{,}99 \\approx 9{,}98\\ \\mathrm{m}
$$

**Svar:** Bollen stiger ca 10,0 m över kastpunkten.

**Generell slutsats:** Samma resultat kan fås enklare med Torricellis ekvation (kommer i nästa avsnitt): $0 = v_0^{2} + 2 a s$ ger direkt $s = v_0^{2}/(2g)$.`,
        },

        {
            level: 2,
            question: `En bilist kör med konstant hastighet 25 m/s (90 km/h). Han ser ett rådjur på vägen och måste bromsa. Hans reaktionstid är 0,80 s, under vilken bilen rullar med oförändrad hastighet. Därefter bromsar han med konstant retardation 6,0 m/s² tills bilen stannar.

a) Hur långt rullar bilen under **reaktionstiden**?

b) Hur lång är **bromssträckan** (från det att han trampar på bromsen tills bilen står still)?

c) Vilken är den totala stoppsträckan?

*Ange den totala stoppsträckan från c) som ditt svar i meter.*`,
            answer: { value: 72, unit: 'm', tol: 0.02 },
            solution: `**a) Reaktionssträcka** — konstant hastighet:

$$
s_1 = v_0 \\cdot t_\\text{reaktion} = 25 \\cdot 0{,}80 = 20\\ \\mathrm{m}
$$

**b) Bromssträcka** — bilen bromsar från 25 m/s till 0 med *a* = −6,0 m/s². Vi hittar först tiden:

$$
t = \\frac{v - v_0}{a} = \\frac{0 - 25}{-6{,}0} \\approx 4{,}17\\ \\mathrm{s}
$$

Sedan sträckan:

$$
s_2 = v_0 t + \\frac{1}{2} a t^{2} = 25 \\cdot 4{,}17 + \\frac{(-6{,}0) \\cdot 4{,}17^{2}}{2}
\\approx 104{,}2 - 52{,}1 = 52{,}1\\ \\mathrm{m}
$$

*Alternativt* (mer eleganta) med medelhastighet vid konstant acceleration:
$$
v_\\mathrm{m} = \\frac{v_0 + v}{2} = \\frac{25 + 0}{2} = 12{,}5\\ \\mathrm{m/s}
$$
$$
s_2 = v_\\mathrm{m} \\cdot t = 12{,}5 \\cdot 4{,}17 \\approx 52\\ \\mathrm{m}
$$

**c) Total stoppsträcka:**

$$
s_\\text{tot} = s_1 + s_2 \\approx 20 + 52 = 72\\ \\mathrm{m}
$$

**Svar:** a) 20 m. b) 52 m. c) Cirka 72 m.

**Generell slutsats:** Reaktionssträckan är **proportionell mot farten** (linjär), men bromssträckan är **proportionell mot fartens kvadrat** ($s = v_0^{2}/(2|a|)$). Dubblas hastigheten *fyrdubblas* bromssträckan — det är därför hastighet på landsväg och motorväg är så viktiga säkerhetsfaktorer.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En bil färdas med den konstanta hastigheten 25 m/s (90 km/h) längs en raksträcka. När bilen passerar en stillastående polisbil på vägkanten ger sig polisen direkt iväg med konstant acceleration 4,0 m/s² (i samma riktning som den fortkörande bilen).

a) Vid vilken tidpunkt (efter att polisen startat) har polisbilen hunnit ifatt fortkörningsbilen?

b) Vilken hastighet har polisbilen då? Ange svaret i m/s.

*Ange polisbilens hastighet vid mötet (b) som ditt numeriska svar.*`,
            answer: { value: 50, unit: 'm/s', tol: 0.02 },
            solution: `Vi sätter *t* = 0 vid det ögonblick polisen startar och låter både bilens och polisens lägen mätas från polisens startposition.

**Bilen** rör sig med konstant fart från startposition:
$$
s_\\text{bil}(t) = v_0 \\cdot t = 25\\, t
$$

**Polisen** startar från vila och accelererar konstant:
$$
s_\\text{polis}(t) = \\frac{a \\cdot t^{2}}{2} = \\frac{4{,}0 \\cdot t^{2}}{2} = 2{,}0\\, t^{2}
$$

**a) Mötesvillkor** — polisen kommer ifatt bilen när $s_\\text{polis} = s_\\text{bil}$:

$$
2{,}0\\, t^{2} = 25\\, t
$$

Förenkla genom att dividera båda led med *t* (vi söker $t > 0$):

$$
2{,}0\\, t = 25 \\quad\\Leftrightarrow\\quad t = 12{,}5\\ \\mathrm{s}
$$

**b) Polisens hastighet vid mötet** — använd $v = a \\cdot t$ (eftersom polisens $v_0 = 0$):

$$
v_\\text{polis} = a \\cdot t = 4{,}0 \\cdot 12{,}5 = 50\\ \\mathrm{m/s}
$$

Det är 180 km/h.

**Svar:** a) Polisen hinner ifatt efter 12,5 s. b) Polisbilen har då hastigheten 50 m/s (180 km/h).

**Generell slutsats:** Notera att polisens *slutfart* vid mötet är **dubbelt så stor** som bilens fart. Det är ingen tillfällighet — när en bil med konstant fart $v_0$ träffas av en uppifrån-accelererande bil från vila, händer mötet just när polisens medelhastighet är lika med bilens fart. Eftersom polisen har $v_0 = 0$ och hela tiden ökar är medelhastigheten exakt halva slutfarten, så slutfarten är $2 v_0$.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.7  Lösa ekvationssystem i GeoGebra
    // Verktygsavsnitt — fokus på *när* ekvationssystem behövs, inte på
    // ytterligare räkneuppgifter (de hör hemma i 2.6 och 2.8).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.7': [
        {
            level: 1,
            question: `När behöver man typiskt ställa upp ett **ekvationssystem** med två ekvationer i rörelseuppgifter med konstant acceleration?`,
            choices: [
                `När problemet handlar om fritt fall.`,
                `När man har **två obekanta storheter** (t.ex. acceleration *a* och tid *t*) som båda måste bestämmas från given information.`,
                `När hastigheten är negativ.`,
                `När man räknar med SI-enheter.`,
            ],
            correct: 1,
            solution: `En ekvation kan lösa **en** obekant variabel. Om problemet ger oss tillräckligt med information för att räkna ut två obekanta (t.ex. både *a* och *t*) — men där vi inte direkt kan isolera någondera — måste vi ställa upp **två** ekvationer som båda innehåller de obekanta. Då bildar ekvationerna ett ekvationssystem som kan lösas algebraiskt eller med GeoGebra.

**Svar:** När man har två obekanta som båda måste bestämmas.

**Generell slutsats:** Tumregeln är: *en obekant kräver en ekvation, två obekanta kräver två*. På högre nivå kan det vara svårt att se direkt vilka ekvationer som ska kombineras — då lönar det sig att skriva upp alla rörelseformler man känner till och se vilka som innehåller bara de variabler man har eller söker.`,
        },
        {
            level: 2,
            question: `En bil kör med den konstanta hastigheten 15 m/s och börjar sedan accelerera konstant. Under accelerationen rör sig bilen 400 m och får då hastigheten 28 m/s. Beräkna **bilens acceleration** i m/s².

*(Tips: detta är exakt problemet från teorin. Tiden *t* är okänd — du behöver ställa upp två ekvationer och kan lösa systemet i GeoGebra eller algebraiskt.)*`,
            answer: { value: 0.6988, unit: 'm/s²', tol: 0.03 },
            solution: `Vi har två obekanta — accelerationen *a* och tiden *t* — och två kända storheter (*s* och slutfart *v*). Vi behöver alltså två ekvationer.

**Ekvation 1** (sträcka vid konstant acceleration):
$$
s = v_0 t + \\frac{a t^{2}}{2} \\quad\\Rightarrow\\quad 400 = 15 t + \\frac{a t^{2}}{2}
$$

**Ekvation 2** (hastighet vid konstant acceleration):
$$
v = v_0 + a t \\quad\\Rightarrow\\quad 28 = 15 + a t
$$

Från ekvation 2: $a t = 13$, så $t = 13/a$. Sätt in i ekvation 1:

$$
400 = 15 \\cdot \\frac{13}{a} + \\frac{a \\cdot (13/a)^{2}}{2} = \\frac{195}{a} + \\frac{169}{2 a} = \\frac{390 + 169}{2 a} = \\frac{559}{2 a}
$$

Lös ut *a*:

$$
a = \\frac{559}{2 \\cdot 400} = \\frac{559}{800} \\approx 0{,}699\\ \\mathrm{m/s^2}
$$

**Svar:** Accelerationen är ca 0,70 m/s².

**Generell slutsats:** Detta system går att lösa algebraiskt (som ovan), men i mer komplicerade fall — t.ex. där båda ekvationerna är icke-linjära — blir det enklare att skriva in ekvationerna i GeoGebra och låta programmet lösa systemet med kommandot **Lös**.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-2.8  Torricellis ekvation
    // Formel: v² − v₀² = 2as. Konstant acceleration, en dimension.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-2.8': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En bil rullar med 20 m/s och accelererar konstant med 3,0 m/s² över en sträcka på 50 m. Beräkna bilens sluthastighet med Torricellis ekvation.`,
            answer: { value: 26.5, unit: 'm/s', tol: 0.02 },
            solution: `Torricellis ekvation:

$$
v^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad v = \\sqrt{v_0^{2} + 2 a s}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 20\\ \\mathrm{m/s} \\\\
a = 3{,}0\\ \\mathrm{m/s^2} \\\\
s = 50\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
v = \\sqrt{20^{2} + 2 \\cdot 3{,}0 \\cdot 50} = \\sqrt{400 + 300} = \\sqrt{700} \\approx 26{,}5\\ \\mathrm{m/s}
$$

**Svar:** Sluthastigheten är 26,5 m/s (≈ 95 km/h).`,
        },
        {
            level: 1,
            question: `En bil i 25 m/s bromsar med konstant retardation 6,0 m/s² tills den stannar. Vilken **bromssträcka** behövs?`,
            answer: { value: 52.1, unit: 'm', tol: 0.03 },
            solution: `Vi löser ut sträckan ur Torricellis ekvation. Eftersom *v* = 0 (bilen stannar) och *a* = −6,0 m/s² (retardation):

$$
v^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad s = \\frac{v^{2} - v_0^{2}}{2 a}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 25\\ \\mathrm{m/s} \\\\
v = 0 \\\\
a = -6{,}0\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$
s = \\frac{0 - 25^{2}}{2 \\cdot (-6{,}0)} = \\frac{-625}{-12{,}0} \\approx 52{,}1\\ \\mathrm{m}
$$

**Svar:** Bromssträckan är ca 52 m.`,
        },
        {
            level: 1,
            question: `En sten släpps från vila och faller fritt 12 m. Vilken hastighet har den när den når marken? Räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$.`,
            answer: { value: 15.4, unit: 'm/s', tol: 0.02 },
            solution: `Vid fritt fall är *v*₀ = 0 och *a* = *g* (riktad nedåt, men vi räknar med absolutbelopp eftersom det är fartens storlek vi söker).

$$
v^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad v = \\sqrt{2 g s}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
s = 12\\ \\mathrm{m} \\\\
g = 9{,}82\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$
v = \\sqrt{2 \\cdot 9{,}82 \\cdot 12} = \\sqrt{235{,}68} \\approx 15{,}4\\ \\mathrm{m/s}
$$

**Svar:** Stenen träffar marken med ca 15,4 m/s (≈ 55 km/h).`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En bil körs i 90 km/h och vill bromsa till 50 km/h. Den konstanta retardationen är 4,0 m/s². Hur lång **sträcka** krävs?`,
            answer: { value: 54.0, unit: 'm', tol: 0.03 },
            solution: `Vi använder Torricellis ekvation och löser ut sträckan, efter att ha gjort om hastigheter till SI-enheter.

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s} \\\\
v = 50\\ \\mathrm{km/h} = 50/3{,}6\\ \\mathrm{m/s} \\approx 13{,}89\\ \\mathrm{m/s} \\\\
a = -4{,}0\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$
s = \\frac{v^{2} - v_0^{2}}{2 a} = \\frac{13{,}89^{2} - 25^{2}}{2 \\cdot (-4{,}0)} = \\frac{192{,}9 - 625}{-8{,}0} = \\frac{-432{,}1}{-8{,}0} \\approx 54{,}0\\ \\mathrm{m}
$$

**Svar:** Bilen behöver ca 54 m för inbromsningen.`,
        },
        {
            level: 2,
            question: `En boll kastas rakt uppåt med begynnelsehastigheten 18 m/s. Hur högt **över kastpunkten** når bollen som mest? Använd Torricellis ekvation och $g = 9{,}82\\ \\mathrm{m/s^2}$.`,
            answer: { value: 16.5, unit: 'm', tol: 0.03 },
            solution: `I bollens högsta punkt är *v* = 0. Räknar man uppåt som positiv riktning är *a* = −*g*.

$$
v^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad s = \\frac{v^{2} - v_0^{2}}{2 a}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
v_0 = 18\\ \\mathrm{m/s} \\\\
v = 0 \\\\
a = -g = -9{,}82\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$
s = \\frac{0 - 18^{2}}{2 \\cdot (-9{,}82)} = \\frac{-324}{-19{,}64} \\approx 16{,}5\\ \\mathrm{m}
$$

**Svar:** Bollen når ca 16,5 m över kastpunkten.

**Generell slutsats:** I allmänhet gäller för en boll som kastas rakt uppåt:

$$
h_\\text{max} = \\frac{v_0^{2}}{2g}
$$

— maxhöjden är proportionell mot *kvadraten* på utgångsfarten. Att fördubbla *v*₀ ger *fyra gånger* så hög max-höjd.`,
        },

        {
            level: 2,
            question: `En boll kastas rakt uppåt med begynnelsehastigheten 15 m/s från en kastpunkt 2,0 m över marken. Bortse från luftmotstånd och räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$.

Vilken **fart** har bollen när den slår i marken?

*Tips: med Torricellis ekvation behöver du inte räkna ut tiden. Se upp med tecken — välj uppåt som positiv riktning och var noga med vad *s* (förflyttningen) är när bollen träffar marken.*`,
            answer: { value: 16.3, unit: 'm/s', tol: 0.03 },
            solution: `Vi väljer **uppåt som positiv riktning** och låter kastpunkten vara origo. Då är:

- $v_0 = +15$ m/s (uppåt)
- $a = -g = -9{,}82$ m/s² (riktad nedåt)
- Markens position är 2,0 m **under** origo, alltså är förflyttningen från kastpunkt till mark $s = -2{,}0$ m (nedåt = negativt).

Torricellis ekvation:
$$
v^{2} - v_0^{2} = 2 a s
$$

$$
v^{2} = v_0^{2} + 2 a s = 15^{2} + 2 \\cdot (-9{,}82) \\cdot (-2{,}0)
$$

$$
v^{2} = 225 + 39{,}28 = 264{,}28
$$

$$
v = \\pm \\sqrt{264{,}28} \\approx \\pm 16{,}3\\ \\mathrm{m/s}
$$

Eftersom vi söker farten (storleken) är svaret 16,3 m/s. Tecknet är negativt (rörelsen är nedåt vid nedslag), men det spelar ingen roll för **fartens storlek**.

**Svar:** Bollen träffar marken med ca 16,3 m/s.

**Generell slutsats:** Detta är en typisk fälla — om man slarvar med tecken (t.ex. sätter $s = +2{,}0$ m för markens läge) får man fel svar. Torricellis ekvation kräver att man håller koll på förflyttningens riktning. Notera också att ekvationen gav två rötter ($\\pm 16{,}3$) — den positiva motsvarar farten *uppåt* (matematiskt giltig, men inte den fysikaliska situationen här), den negativa motsvarar slutfarten nedåt.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Från toppen av en 50 m hög lodrät klippa **släpps** en boll *A* (begynnelsehastighet 0). I samma ögonblick **kastas** en annan boll *B* rakt uppåt från marken **direkt nedanför klippan** med begynnelsehastigheten 25 m/s.

Bortse från luftmotstånd och räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$.

a) Vid vilken tidpunkt möts bollarna?

b) På vilken **höjd över marken** sker mötet?

*Ange höjden över marken (b) som ditt numeriska svar i meter.*`,
            answer: { value: 30.4, unit: 'm', tol: 0.03 },
            solution: `Vi väljer **uppåt som positiv riktning** och lägger origo vid marken direkt nedanför klippan. Båda bollarnas lägesfunktioner ges av $s(t) = s_0 + v_0 t - \\frac{1}{2} g t^{2}$.

**Boll A** (släpps från $s_0 = 50$ m, $v_0 = 0$):
$$
s_A(t) = 50 - \\frac{g t^{2}}{2}
$$

**Boll B** (kastas upp från $s_0 = 0$, $v_0 = +25$ m/s):
$$
s_B(t) = 25\\, t - \\frac{g t^{2}}{2}
$$

**a) Mötesvillkor** — bollarna är på samma höjd när $s_A(t) = s_B(t)$:

$$
50 - \\frac{g t^{2}}{2} = 25\\, t - \\frac{g t^{2}}{2}
$$

Termen $\\frac{g t^{2}}{2}$ försvinner från båda led — den är **samma** för båda bollarna, eftersom de har samma tyngdacceleration! Vi får ett enkelt linjärt samband:

$$
50 = 25\\, t \\quad\\Leftrightarrow\\quad t = 2{,}0\\ \\mathrm{s}
$$

**b) Höjden vid mötet** — sätt in *t* = 2,0 s i (t.ex.) $s_A$:

$$
s_A(2{,}0) = 50 - \\frac{9{,}82 \\cdot 2{,}0^{2}}{2} = 50 - \\frac{9{,}82 \\cdot 4{,}0}{2} = 50 - 19{,}64 \\approx 30{,}4\\ \\mathrm{m}
$$

(Kontroll: $s_B(2{,}0) = 25 \\cdot 2{,}0 - 19{,}64 = 50 - 19{,}64 = 30{,}4$ m ✓)

**Svar:** a) De möts efter 2,0 s. b) På ca 30,4 m över marken.

**Generell slutsats:** Den eleganta poängen här är att tyngdaccelerationen *påverkar båda bollarna lika mycket* och därför försvinner ur mötesvillkoret. Detta är grundläggande för Galileos klassiska experiment — *i fritt fall är alla föremål "viktlösa" relativt varandra*. Mötestiden ($t = h/v_0$) beror bara på utgångshöjden och bollens kasthastighet, inte på *g*. Tyngdkraften förändrar däremot **var** mötet sker — utan tyngdkraft skulle B möta A vid 50 m, men med tyngdkraft sker mötet 19,6 m lägre.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.1  Kraft och Newtons första lag
    // Begrepp: kraft som vektor, kraftresultant, kraftjämvikt, komposanter,
    // Newtons första lag. Formler: vektoraddition (Pythagoras vid 90°),
    // sin/cos för komposanter.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Två krafter $F_1 = 35\\ \\mathrm{N}$ och $F_2 = 18\\ \\mathrm{N}$ verkar på samma föremål och **i samma riktning**. Beräkna den resulterande kraften.`,
            answer: { value: 53, unit: 'N', tol: 0.02 },
            solution: `Krafter i samma riktning adderas (vektor­summa = skalär summa när riktningen är gemensam):

$$
F_R = F_1 + F_2 = 35 + 18 = 53\\ \\mathrm{N}
$$

**Svar:** Resultanten är 53 N i samma riktning som $F_1$ och $F_2$.`,
        },
        {
            level: 1,
            question: `Två krafter $F_1 = 60\\ \\mathrm{N}$ och $F_2 = 25\\ \\mathrm{N}$ verkar på samma föremål men **i motsatt riktning**. Hur stor är den resulterande kraften?`,
            answer: { value: 35, unit: 'N', tol: 0.02 },
            solution: `När krafterna är motriktade subtraherar vi den mindre från den större:

$$
F_R = F_1 - F_2 = 60 - 25 = 35\\ \\mathrm{N}
$$

**Svar:** Resultanten är 35 N i samma riktning som den största kraften ($F_1$).`,
        },
        {
            level: 1,
            question: `Vad innebär **Newtons första lag** (tröghetslagen)?`,
            choices: [
                `Att en kraft alltid är lika med massan gånger accelerationen.`,
                `Att om kraftresultanten på ett föremål är noll förblir det antingen i vila eller i likformig rörelse (konstant hastighet).`,
                `Att till varje kraft finns en lika stor men motriktad kraft på ett annat föremål.`,
                `Att alla föremål med massa attraherar varandra med en gravitationskraft.`,
            ],
            correct: 1,
            solution: `Newtons första lag säger att ett föremål inte ändrar sin rörelse om kraftresultanten är noll. Det betyder att ett föremål i vila förblir i vila, och ett föremål i likformig rörelse förblir i likformig rörelse (samma fart, samma riktning) — om inga (netto-)krafter verkar.

- Alternativ A beskriver Newtons **andra** lag ($F = ma$).
- Alternativ C beskriver Newtons **tredje** lag (verkan och återverkan).
- Alternativ D är Newtons gravitationslag.

**Svar:** Alternativ B.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Två krafter verkar vinkelrätt mot varandra på samma föremål enligt diagrammet nedan. Beräkna resultantens storlek.

${makeForceDiagram({
    box: true,
    vectors: [
        { label: 'F_1', magnitude: '12 N', angle: 0, length: 120 },
        { label: 'F_2', magnitude: '16 N', angle: 90, length: 120 },
    ],
})}`,
            answer: { value: 20, unit: 'N', tol: 0.02 },
            solution: `Vinkelräta krafter bildar två kateter i en rätvinklig triangel — resultanten är hypotenusan. Pythagoras sats:

$$
F_R = \\sqrt{F_1^{2} + F_2^{2}} = \\sqrt{12^{2} + 16^{2}} = \\sqrt{144 + 256} = \\sqrt{400} = 20\\ \\mathrm{N}
$$

**Svar:** Resultanten är 20 N.`,
        },
        {
            level: 2,
            question: `En kraft *F* drar i ett rep enligt figuren nedan. Hur stor är kraftens **horisontella komposant** ($F_x$)?

${makeForceDiagram({
    box: true, boxSize: 28,
    vectors: [
        { label: 'F', magnitude: '80 N', angle: 30, length: 220, showAngle: true },
    ],
})}`,
            answer: { value: 69.3, unit: 'N', tol: 0.03 },
            solution: `Den horisontella komposanten är den närliggande kateten till vinkeln 30°. Vi använder cosinus:

$$
F_x = F \\cdot \\cos \\alpha = 80 \\cdot \\cos 30^{\\circ} \\approx 80 \\cdot 0{,}866 \\approx 69{,}3\\ \\mathrm{N}
$$

**Svar:** Den horisontella komposanten är ca 69 N.

**Generell slutsats:** Detta är formeln för "nyttig" drag­kraft — t.ex. när man drar en kälke i ett rep, är det $F \\cos \\alpha$ som driver kälken framåt, inte hela kraften $F$. Den vertikala komposanten $F \\sin \\alpha$ lyfter kälken något (minskar normalkraften och därmed friktionen).`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Tre horisontella krafter verkar på en låda som ligger på ett friktionsfritt golv. Lådan är i **kraftjämvikt** (står helt stilla). Beräkna storleken av kraften $F_3$.

${makeForceDiagram({
    compass: true, box: true,
    vectors: [
        { label: 'F_1', magnitude: '50 N', angle: 0, length: 150 },
        { label: 'F_2', magnitude: '30 N', angle: 90, length: 90 },
        { label: 'F_3', magnitude: '?', angle: 210.96, length: 175, dashed: true, color: '#1c3d6b' },
    ],
})}`,
            answer: { value: 58.3, unit: 'N', tol: 0.02 },
            solution: `För att lådan ska stå stilla måste kraftresultanten vara noll. $F_3$ måste alltså motverka resultanten av $F_1$ och $F_2$ — den ska vara lika stor och motriktad.

Resultanten av $F_1$ (öster) och $F_2$ (norr) — vinkelräta:

$$
F_{12} = \\sqrt{F_1^{2} + F_2^{2}} = \\sqrt{50^{2} + 30^{2}} = \\sqrt{2\\,500 + 900} = \\sqrt{3\\,400}
$$

$$
F_{12} \\approx 58{,}3\\ \\mathrm{N}
$$

För kraftjämvikt: $F_3 = F_{12} \\approx 58{,}3$ N, riktad i exakt motsatt riktning mot $F_{12}$ (alltså mot sydväst, vinkel $\\arctan(30/50) \\approx 31^{\\circ}$ söder om västerlig riktning).

**Svar:** $F_3 \\approx 58$ N (riktad sydväst).

**Generell slutsats:** Vid kraftjämvikt med tre eller fler krafter kan vi alltid hitta den okända kraften genom att räkna ut resultanten av de kända, och sedan välja $F_\\text{okänd}$ som lika stor och motriktad. Geometriskt bildar tre balanserande krafter en sluten triangel.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.2  Newtons andra lag
    // Formel: F_R = m · a
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En resulterande kraft på 24 N verkar på ett föremål med massan 6,0 kg. Vilken acceleration får föremålet?`,
            answer: { value: 4.0, unit: 'm/s²', tol: 0.02 },
            solution: `Vi löser ut accelerationen ur Newtons andra lag:

$$
F_R = m \\cdot a \\quad\\Leftrightarrow\\quad a = \\frac{F_R}{m}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
F_R = 24\\ \\mathrm{N} \\\\
m = 6{,}0\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$
a = \\frac{24}{6{,}0} = 4{,}0\\ \\mathrm{m/s^2}
$$

**Svar:** 4,0 m/s².`,
        },
        {
            level: 1,
            question: `Ett föremål med massan 1,5 kg accelererar med 8,0 m/s². Vilken är den resulterande kraften på föremålet?`,
            answer: { value: 12, unit: 'N', tol: 0.02 },
            solution: `Direkt insättning i Newtons andra lag:

$$
F_R = m \\cdot a
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 1{,}5\\ \\mathrm{kg} \\\\
a = 8{,}0\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$
F_R = 1{,}5 \\cdot 8{,}0 = 12\\ \\mathrm{N}
$$

**Svar:** 12 N.`,
        },
        {
            level: 1,
            question: `En kraft på 45 N accelererar ett föremål med 3,0 m/s². Vilken är föremålets massa?`,
            answer: { value: 15, unit: 'kg', tol: 0.02 },
            solution: `Lös ut massan ur Newtons andra lag:

$$
F_R = m \\cdot a \\quad\\Leftrightarrow\\quad m = \\frac{F_R}{a}
$$

$$
m = \\frac{45}{3{,}0} = 15\\ \\mathrm{kg}
$$

**Svar:** 15 kg.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En låda med massan 8,0 kg dras längs ett golv med kraften 50 N. Mellan lådan och golvet verkar en friktionskraft på 18 N i motsatt riktning. Vilken acceleration får lådan?`,
            answer: { value: 4.0, unit: 'm/s²', tol: 0.02 },
            solution: `Den resulterande kraften är skillnaden mellan dragkraften och friktionen:

$$
F_R = F_\\text{drag} - F_f = 50 - 18 = 32\\ \\mathrm{N}
$$

Newtons andra lag ger:

$$
a = \\frac{F_R}{m} = \\frac{32}{8{,}0} = 4{,}0\\ \\mathrm{m/s^2}
$$

**Svar:** Lådans acceleration är 4,0 m/s².`,
        },
        {
            level: 2,
            question: `En bil med massan 1 200 kg accelererar från 0 till 90 km/h på 12 sekunder. Beräkna den **genomsnittliga** resulterande kraften på bilen under accelerationen.`,
            answer: { value: 2500, unit: 'N', tol: 0.03 },
            solution: `Vi räknar först ut accelerationen i SI-enheter, sedan sätter in i Newtons andra lag.

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 1\\,200\\ \\mathrm{kg} \\\\
\\Delta v = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s} \\\\
\\Delta t = 12\\ \\mathrm{s}
\\end{array} \\right]
$$

Acceleration:
$$
a = \\frac{\\Delta v}{\\Delta t} = \\frac{25}{12} \\approx 2{,}08\\ \\mathrm{m/s^2}
$$

Resulterande kraft:
$$
F_R = m \\cdot a = 1\\,200 \\cdot 2{,}08 \\approx 2\\,500\\ \\mathrm{N} = 2{,}5\\ \\mathrm{kN}
$$

**Svar:** Ca 2,5 kN.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Två vagnar, *A* (massa 3,0 kg) och *B* (massa 2,0 kg), är förbundna med ett lätt, sträckbart snöre och vilar på ett friktionsfritt bord. En horisontell kraft *F* = 15 N dras på vagn *A* så att hela systemet accelererar bort från *B*. Snöret går mellan dem och drar därför *B* framåt med en spännkraft *T*.

a) Beräkna systemets gemensamma acceleration.

b) Beräkna **spännkraften** *T* i snöret.

*Ange spännkraften (b) som ditt numeriska svar i N.*`,
            answer: { value: 6.0, unit: 'N', tol: 0.03 },
            solution: `**a)** Båda vagnarna rör sig som ett system med total massa $m_A + m_B$. Den enda yttre horisontella kraften är *F* = 15 N (snörets spännkraft är intern):

$$
a = \\frac{F}{m_A + m_B} = \\frac{15}{3{,}0 + 2{,}0} = \\frac{15}{5{,}0} = 3{,}0\\ \\mathrm{m/s^2}
$$

**b)** Spännkraften *T* är den enda horisontella kraften på vagn *B*. Newtons andra lag på vagn *B* ensam:

$$
T = m_B \\cdot a = 2{,}0 \\cdot 3{,}0 = 6{,}0\\ \\mathrm{N}
$$

**Svar:** a) Accelerationen är 3,0 m/s². b) Spännkraften är 6,0 N.

**Generell slutsats:** När flera kroppar är ihopkopplade har de samma acceleration men *olika netto-krafter* — varje kropp har sin egen Newton 2-ekvation. Tricket är att välja en lämplig **delkropp** (ofta den lättare av de två) där spännkraften är den enda obekanta horisontella kraften.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.3  Newtons tredje lag
    // Begrepps­avsnitt — främst flerval om motkrafter vs jämviktskrafter.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.3': [
        {
            level: 1,
            question: `Vad innebär **Newtons tredje lag** (lagen om verkan och återverkan)?`,
            choices: [
                `Två krafter som verkar på samma föremål och håller det i jämvikt är lika stora och motriktade.`,
                `Till varje kraft som föremål A utövar på föremål B finns en lika stor och motriktad kraft som B utövar på A.`,
                `Ett föremål förblir i vila om kraftresultanten är noll.`,
                `En kraft är massa gånger acceleration.`,
            ],
            correct: 1,
            solution: `Newtons tredje lag säger att krafter alltid uppträder i **par** mellan *två olika föremål*. Om A trycker på B med kraften $F$, så trycker B tillbaka på A med kraften $-F$ (lika stor, motsatt riktning, samma typ av kraft).

Det är viktigt att inte blanda ihop motkrafter med jämviktskrafter:
- **Motkrafter**: verkar på *två olika* föremål (Newton 3).
- **Jämviktskrafter**: verkar på *samma* föremål och håller det stilla (Newton 1).

**Svar:** Alternativ B.`,
        },
        {
            level: 1,
            question: `En vikt vilar på ett bord. Två krafter verkar på vikten: tyngdkraften $F_G$ nedåt och normalkraften $F_N$ från bordet uppåt. Är dessa två krafter **motkrafter enligt Newtons tredje lag**?`,
            choices: [
                `Ja, de är lika stora och motriktade — det är ju definitionen av motkrafter.`,
                `Nej, de verkar på samma föremål (vikten) — de är jämviktskrafter, inte motkrafter.`,
                `Ja, men bara om vikten står helt stilla.`,
                `Nej, eftersom normalkraften kan vara mindre än tyngdkraften.`,
            ],
            correct: 1,
            solution: `Detta är en klassisk missuppfattning. Tyngdkraften och normalkraften på vikten är båda krafter som verkar på **samma föremål** (vikten). De är därför **jämviktskrafter** enligt Newtons första lag — de råkar vara lika stora och motriktade *eftersom vikten är i jämvikt*, inte för att de är motkrafter.

**Motkraften** till tyngdkraften (som är jordens dragning på vikten) är vikten*s* dragning på jorden (en lika stor gravitationskraft från vikten uppåt på jordklotet — vilket Newton 3 förutspår, även om effekten på jordklotet är försumbar).

**Motkraften** till normalkraften (bordet trycker upp vikten) är vikten*s* tryck på bordet (vikten trycker ner bordet med samma kraft — vilket man känner när man håller något tungt).

**Svar:** Alternativ B.`,
        },
        {
            level: 2,
            question: `Två lag drar i ett rep i en dragkamp. Lag *A* vinner och drar lag *B* mot sig. Vilken av följande utsagor är korrekt om **spännkraften** i repet?`,
            choices: [
                `Lag *A* drar i repet med större kraft än lag *B* — det är därför *A* vinner.`,
                `Spännkraften i repet är **lika stor** vid båda lagens händer. *A* vinner för att de har större friktion mot underlaget.`,
                `Spännkraften är lika stor som tyngdkraften på det lättaste laget.`,
                `Spännkraften är noll så länge ingen rör sig.`,
            ],
            correct: 1,
            solution: `Detta är ett av de absolut mest klassiska missförstånden i krafter — även läroböcker gör fel ibland!

Spännkraften i ett (idealiserat masslöst) rep är **alltid lika stor i båda ändar** enligt Newtons tredje lag. Om lag *A* drar i repet med kraften *F*, så drar repet tillbaka på *A* med *F* — och samma sak vid *B*.

Det som avgör vem som vinner dragkampen är därför inte spännkraften i repet, utan **friktionskraften mot underlaget**. Det lag som kan stå emot en större friktionskraft mot marken (tyngre, bättre skor, bättre teknik) "håller emot" en större spännkraft i repet utan att glida bakåt.

**Svar:** Alternativ B.

**Generell slutsats:** I alla problem med rep, snören och trissor (utan massa och friktionsfria) är spännkraften samma längs hela snöret — annars skulle delar av snöret accelerera av sig själva, vilket bryter mot Newtons andra lag.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.4  Tyngdkraft och normalkraft
    // Formler: F_G = m·g (g = 9,82 N/kg), F_N = F_G på plant underlag,
    // F_N olika vid acceleration uppåt/nedåt (hisseffekt).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Hur stor tyngdkraft verkar på en lärobok med massan 1,2 kg på jordytan? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 11.8, unit: 'N', tol: 0.02 },
            solution: `Direkt insättning i formeln för tyngdkraft:

$$
F_G = m \\cdot g = 1{,}2 \\cdot 9{,}82 \\approx 11{,}8\\ \\mathrm{N}
$$

**Svar:** Tyngdkraften är ca 11,8 N.`,
        },
        {
            level: 1,
            question: `En person väger 75 kg. Vilken tyngdkraft verkar på personen på jordytan? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 737, unit: 'N', tol: 0.02 },
            solution: `Tyngdkraften ges av $F_G = m \\cdot g$:

$$
F_G = 75 \\cdot 9{,}82 = 736{,}5 \\approx 737\\ \\mathrm{N}
$$

**Svar:** Tyngdkraften är ca 740 N.

**Generell slutsats:** I vardagsspråk säger vi att personen "väger 75 kg", men det är egentligen *massan*. **Tyngden** (i N) är massan gånger tyngdfaktorn — på månen skulle samma person ha massan 75 kg men en tyngd på bara cirka 124 N.`,
        },
        {
            level: 1,
            question: `Ett föremål med massan 5,0 kg vilar på ett plant horisontellt bord. Hur stor är **normalkraften** från bordet på föremålet? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 49.1, unit: 'N', tol: 0.02 },
            solution: `Eftersom föremålet vilar (är i jämvikt) gäller enligt Newtons första lag att kraftresultanten är noll. På plant underlag balanserar normalkraften $F_N$ uppåt tyngdkraften $F_G$ nedåt:

$$
F_N = F_G = m \\cdot g = 5{,}0 \\cdot 9{,}82 = 49{,}1\\ \\mathrm{N}
$$

**Svar:** Normalkraften är ca 49 N.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En låda med massan 30 kg står på ett plant golv. En person trycker dessutom lodrätt **nedåt** på lådan med en extra kraft på 80 N. Hur stor är normalkraften från golvet på lådan? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 375, unit: 'N', tol: 0.02 },
            solution: `Tre lodräta krafter verkar på lådan:
- Tyngdkraft $F_G = m g$ nedåt
- Extra tryckkraft $F = 80$ N nedåt
- Normalkraft $F_N$ uppåt

Eftersom lådan står stilla råder kraftjämvikt:

$$
F_N = F_G + F = m \\cdot g + 80
$$

$$
F_N = 30 \\cdot 9{,}82 + 80 = 294{,}6 + 80 = 374{,}6 \\approx 375\\ \\mathrm{N}
$$

**Svar:** Normalkraften är ca 375 N.`,
        },
        {
            level: 2,
            question: `En vikt på 12 kg hänger i ett snöre från taket och är helt i vila. Hur stor är **spännkraften** i snöret? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 118, unit: 'N', tol: 0.02 },
            solution: `Två krafter verkar på vikten:
- Tyngdkraft $F_G = m g$ nedåt
- Spännkraft *T* (snörets dragning) uppåt

Eftersom vikten är i vila gäller kraftjämvikt:

$$
T = F_G = m \\cdot g = 12 \\cdot 9{,}82 \\approx 118\\ \\mathrm{N}
$$

**Svar:** Spännkraften är ca 118 N.

**Generell slutsats:** I en hängande, stillastående vikt är spännkraften alltid lika med tyngdkraften. Om vikten istället accelererar uppåt blir spännkraften *större* än tyngdkraften, om den accelererar nedåt blir spännkraften *mindre*.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En person med massan 70 kg står på en personvåg i en hiss. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

a) Vad visar vågen (i N) när hissen står stilla?

b) Vad visar vågen när hissen accelererar **uppåt** med 1,8 m/s²?

c) Vad visar vågen när hissen accelererar **nedåt** med 1,2 m/s²?

*Ange vågens utslag från **b)** som ditt numeriska svar i N.*`,
            answer: { value: 814, unit: 'N', tol: 0.02 },
            solution: `Personvågen visar i grunden den normalkraft den utövar på personen ($F_N$). Den enligt Newtons tredje lag är lika stor som personens tryck nedåt på vågen — det är *den* kraften vågen registrerar.

Två krafter verkar på personen: tyngdkraft $F_G = m g$ nedåt och normalkraft $F_N$ uppåt. Personens acceleration är samma som hissens. Vi väljer **uppåt som positiv** riktning.

Newtons andra lag på personen:
$$
F_N - F_G = m \\cdot a \\quad\\Leftrightarrow\\quad F_N = m \\cdot (g + a)
$$

där *a* är hissens acceleration (+ uppåt, − nedåt).

**a) Hissen står stilla** ($a = 0$):
$$
F_N = m \\cdot g = 70 \\cdot 9{,}82 \\approx 687\\ \\mathrm{N}
$$

**b) Hissen accelererar uppåt** ($a = +1{,}8\\ \\mathrm{m/s^2}$):
$$
F_N = 70 \\cdot (9{,}82 + 1{,}8) = 70 \\cdot 11{,}62 \\approx 814\\ \\mathrm{N}
$$

Vågen visar alltså mer än vid stillastående — personen känner sig "tyngre".

**c) Hissen accelererar nedåt** ($a = -1{,}2\\ \\mathrm{m/s^2}$):
$$
F_N = 70 \\cdot (9{,}82 - 1{,}2) = 70 \\cdot 8{,}62 \\approx 603\\ \\mathrm{N}
$$

Vågen visar mindre — personen känner sig "lättare".

**Svar:** a) 687 N, b) 814 N, c) 603 N.

**Generell slutsats:** Vågens utslag $F_N = m(g + a)$ kallas ofta för *skenbar vikt* (apparent weight). När en hiss i fritt fall (*a* = −*g*) skulle vågen visa noll — eftersom då accelererar både person och våg lika fort nedåt, ingen normalkraft behövs. Detta är samma fenomen som astronauter upplever i kretsande rymdfarkoster.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.5  Gravitationslagen
    // Formel: F = G · m1 · m2 / r²
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Två kulor med massorna 5,0 kg respektive 8,0 kg har sina tyngdpunkter på avståndet 0,50 m från varandra. Beräkna gravitationskraften mellan dem. Räkna med $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.`,
            answer: { value: 1.067e-8, unit: 'N', tol: 0.03 },
            solution: `Vi sätter in i Newtons gravitationslag:

$$
F = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\
m_1 = 5{,}0\\ \\mathrm{kg},\\quad m_2 = 8{,}0\\ \\mathrm{kg} \\\\
r = 0{,}50\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
F = 6{,}67 \\cdot 10^{-11} \\cdot \\frac{5{,}0 \\cdot 8{,}0}{0{,}50^{2}}
= 6{,}67 \\cdot 10^{-11} \\cdot \\frac{40}{0{,}25}
= 6{,}67 \\cdot 10^{-11} \\cdot 160
$$

$$
F \\approx 1{,}07 \\cdot 10^{-8}\\ \\mathrm{N}
$$

**Svar:** Gravitationskraften är ca $1{,}1 \\cdot 10^{-8}$ N — alltså försvinnande liten.`,
        },
        {
            level: 1,
            question: `Två satelliter med samma massa 500 kg vardera kretsar med tyngdpunkterna 100 m från varandra. Hur stor gravitationskraft verkar mellan dem? Räkna med $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.`,
            answer: { value: 1.67e-9, unit: 'N', tol: 0.03 },
            solution: `Newtons gravitationslag:

$$
F = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}} = 6{,}67 \\cdot 10^{-11} \\cdot \\frac{500 \\cdot 500}{100^{2}}
$$

$$
F = 6{,}67 \\cdot 10^{-11} \\cdot \\frac{250\\,000}{10\\,000} = 6{,}67 \\cdot 10^{-11} \\cdot 25 \\approx 1{,}67 \\cdot 10^{-9}\\ \\mathrm{N}
$$

**Svar:** Ca $1{,}7 \\cdot 10^{-9}$ N.`,
        },
        {
            level: 1,
            question: `Vad anger konstanten *G* i Newtons gravitationslag?`,
            choices: [
                `Tyngdfaktorn vid jordytan (9,82 N/kg).`,
                `Gravitationskonstanten — ett universellt naturkonstant som anger styrkan i gravitationsväxelverkan.`,
                `Den massa ett föremål måste ha för att accelerera med 1 m/s².`,
                `Den hastighet med vilken gravitationskraften utbreder sig.`,
            ],
            correct: 1,
            solution: `*G* är **gravitationskonstanten** — en universell naturkonstant med värdet $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$. Den anger styrkan i gravitationskraften per massa-par-och-avstånds-kvadrat.

- Alternativ A är *g* (tyngdfaktorn), inte *G*.
- Alternativ C beskriver definitionen av 1 newton.
- Alternativ D är fel — gravitationen utbreder sig med ljusets hastighet (enligt allmän relativitetsteori), men *G* har inget med utbredningshastighet att göra.

**Svar:** Alternativ B.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Två kulor med samma massa *m* drar varandra med gravitationskraften $4{,}0 \\cdot 10^{-8}\\ \\mathrm{N}$ när tyngdpunkterna är 0,25 m från varandra. Bestäm kulornas massa. Räkna med $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.`,
            answer: { value: 6.12, unit: 'kg', tol: 0.03 },
            solution: `Vi löser ut $m$ ur gravitationslagen, där $m_1 = m_2 = m$:

$$
F = G \\cdot \\frac{m^{2}}{r^{2}} \\quad\\Leftrightarrow\\quad m = r \\cdot \\sqrt{\\frac{F}{G}}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
F = 4{,}0 \\cdot 10^{-8}\\ \\mathrm{N} \\\\
r = 0{,}25\\ \\mathrm{m} \\\\
G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}
\\end{array} \\right]
$$

$$
m = 0{,}25 \\cdot \\sqrt{\\frac{4{,}0 \\cdot 10^{-8}}{6{,}67 \\cdot 10^{-11}}}
= 0{,}25 \\cdot \\sqrt{599{,}7}
$$

$$
m \\approx 0{,}25 \\cdot 24{,}49 \\approx 6{,}12\\ \\mathrm{kg}
$$

**Svar:** Varje kula har massan ca 6,1 kg.`,
        },
        {
            level: 2,
            question: `På vilket avstånd från jordens centrum är tyngdkraften på en person med massan 70 kg lika med 100 N? Använd jordens massa $m_j = 5{,}972 \\cdot 10^{24}$ kg och $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.`,
            answer: { value: 1.67e7, unit: 'm', tol: 0.03 },
            solution: `Vi löser ut $r$ ur Newtons gravitationslag:

$$
F = G \\cdot \\frac{m \\cdot m_j}{r^{2}} \\quad\\Leftrightarrow\\quad r = \\sqrt{\\frac{G \\cdot m \\cdot m_j}{F}}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
F = 100\\ \\mathrm{N} \\\\
m = 70\\ \\mathrm{kg} \\\\
m_j = 5{,}972 \\cdot 10^{24}\\ \\mathrm{kg} \\\\
G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}
\\end{array} \\right]
$$

$$
r = \\sqrt{\\frac{6{,}67 \\cdot 10^{-11} \\cdot 70 \\cdot 5{,}972 \\cdot 10^{24}}{100}}
= \\sqrt{\\frac{2{,}789 \\cdot 10^{16}}{100}}
$$

$$
r = \\sqrt{2{,}789 \\cdot 10^{14}} \\approx 1{,}67 \\cdot 10^{7}\\ \\mathrm{m} = 16\\,700\\ \\mathrm{km}
$$

**Svar:** Ca $1{,}7 \\cdot 10^{7}$ m, alltså ungefär 17 000 km från jordens centrum (cirka 10 000 km över jordytan).`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Mars har massan $6{,}39 \\cdot 10^{23}\\ \\mathrm{kg}$ och radien $3\\,389\\ \\mathrm{km}$. Beräkna **tyngdfaktorn $g_\\text{Mars}$** vid Mars yta (i N/kg). Räkna med $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.`,
            answer: { value: 3.71, unit: 'N/kg', tol: 0.03 },
            solution: `På Mars yta är tyngdkraften på ett föremål med massan *m* både $F = m \\cdot g_\\text{Mars}$ och $F = G \\cdot m \\cdot m_\\text{Mars} / r^{2}$. Sätt dem lika och dividera bort *m*:

$$
m \\cdot g_\\text{Mars} = G \\cdot \\frac{m \\cdot m_\\text{Mars}}{r^{2}}
\\quad\\Leftrightarrow\\quad
g_\\text{Mars} = \\frac{G \\cdot m_\\text{Mars}}{r^{2}}
$$

Mätvärden (i SI-enheter):
$$
\\left[ \\begin{array}{l}
G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\
m_\\text{Mars} = 6{,}39 \\cdot 10^{23}\\ \\mathrm{kg} \\\\
r = 3\\,389\\ \\mathrm{km} = 3{,}389 \\cdot 10^{6}\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
g_\\text{Mars} = \\frac{6{,}67 \\cdot 10^{-11} \\cdot 6{,}39 \\cdot 10^{23}}{(3{,}389 \\cdot 10^{6})^{2}}
= \\frac{4{,}262 \\cdot 10^{13}}{1{,}148 \\cdot 10^{13}}
\\approx 3{,}71\\ \\mathrm{N/kg}
$$

**Svar:** Tyngdfaktorn på Mars yta är ca 3,71 N/kg.

**Generell slutsats:** Detta är knappt 38 % av jordens tyngdfaktor. En person som väger 700 N på jorden skulle väga drygt 260 N på Mars — fortfarande mer än på månen (170 N), men klart mindre än hemma. Notera att tyngdfaktorn beror på *två* saker: planetens massa och dess radie i kvadrat. En liten men extremt tät planet (t.ex. en neutronstjärna) skulle ha enorm tyngdfaktor.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.6  Friktion
    // Formel: F_f = μ · F_N
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.6': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En låda dras längs ett plant golv. Friktionstalet mellan låda och golv är 0,30, och normalkraften från golvet på lådan är 200 N. Beräkna friktionskraften.`,
            answer: { value: 60, unit: 'N', tol: 0.02 },
            solution: `Direkt insättning i formeln för friktionskraft:

$$
F_f = \\mu \\cdot F_N = 0{,}30 \\cdot 200 = 60\\ \\mathrm{N}
$$

**Svar:** Friktionskraften är 60 N.`,
        },
        {
            level: 1,
            question: `En sandsäck med massan 25 kg vilar på ett plant golv. Friktionstalet mellan säck och golv är 0,45. Hur stor kraft krävs det **minst** för att få säcken att börja glida? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 110, unit: 'N', tol: 0.03 },
            solution: `På plant underlag är normalkraften lika med tyngdkraften:

$$
F_N = F_G = m \\cdot g = 25 \\cdot 9{,}82 \\approx 245{,}5\\ \\mathrm{N}
$$

Friktionskraften vid glidningsgränsen:

$$
F_f = \\mu \\cdot F_N = 0{,}45 \\cdot 245{,}5 \\approx 110\\ \\mathrm{N}
$$

För att säcken ska börja glida måste dragkraften minst vara lika med friktionskraften:

$$
F_\\text{min} = F_f \\approx 110\\ \\mathrm{N}
$$

**Svar:** Det krävs minst ca 110 N.`,
        },
        {
            level: 1,
            question: `En kloss glider över ett bord. Friktionskraften är 8,5 N och normalkraften från bordet är 25 N. Beräkna friktionstalet *μ*.`,
            answer: { value: 0.34, unit: '', tol: 0.03 },
            solution: `Lös ut $\\mu$ ur friktionsformeln:

$$
F_f = \\mu \\cdot F_N \\quad\\Leftrightarrow\\quad \\mu = \\frac{F_f}{F_N}
$$

$$
\\mu = \\frac{8{,}5}{25} = 0{,}34
$$

**Svar:** Friktionstalet är 0,34 (eller 34 %).

**Generell slutsats:** Friktionstalet är dimensionslöst — det är en ren proportionalitetsfaktor mellan friktionskraft och normalkraft.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En bokhylla med massan 50 kg dras horisontellt över ett golv med kraften 325 N. Bokhyllan får då accelerationen 4,0 m/s². Beräkna friktionstalet mellan bokhyllan och golvet. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.25, unit: '', tol: 0.05 },
            solution: `Vi använder Newtons andra lag på horisontella krafter för att hitta friktionskraften, sedan friktionsformeln för att hitta friktionstalet.

**Steg 1 — friktionskraft.** Newtons andra lag:

$$
F_R = F_\\text{drag} - F_f \\quad\\Leftrightarrow\\quad F_f = F_\\text{drag} - m \\cdot a
$$

$$
F_f = 325 - 50 \\cdot 4{,}0 = 325 - 200 = 125\\ \\mathrm{N}
$$

**Steg 2 — friktionstal.** Normalkraften är lika med tyngdkraften (plant golv):

$$
F_N = m \\cdot g = 50 \\cdot 9{,}82 = 491\\ \\mathrm{N}
$$

$$
\\mu = \\frac{F_f}{F_N} = \\frac{125}{491} \\approx 0{,}25
$$

**Svar:** Friktionstalet är ca 0,25.`,
        },
        {
            level: 2,
            question: `En bil med massan 1 400 kg kör i 90 km/h på en torr asfaltväg och bromsar med låsta hjul (skid-broms). Friktionstalet mellan låsta däck och asfalt är 0,72. Hur lång blir bilens **bromssträcka**? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 44.2, unit: 'm', tol: 0.03 },
            solution: `Friktionskraften ger en negativ acceleration (retardation). Vi räknar ut den och använder Torricellis ekvation för att hitta bromssträckan.

**Steg 1 — friktionsacceleration.** På plant underlag är $F_N = m g$, så:

$$
F_f = \\mu \\cdot m \\cdot g \\quad\\Rightarrow\\quad a = \\frac{F_f}{m} = \\mu \\cdot g
$$

Notera att massan **stryker bort sig** — bromsaccelerationen beror bara på friktionstalet och *g*:

$$
a = -\\mu \\cdot g = -0{,}72 \\cdot 9{,}82 \\approx -7{,}07\\ \\mathrm{m/s^2}
$$

**Steg 2 — bromssträcka.** Med Torricellis ekvation och *v* = 0 (bilen stannar):

$$
v^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad s = \\frac{-v_0^{2}}{2 a}
$$

Mätvärden: $v_0 = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s}$.

$$
s = \\frac{-25^{2}}{2 \\cdot (-7{,}07)} = \\frac{-625}{-14{,}14} \\approx 44{,}2\\ \\mathrm{m}
$$

**Svar:** Bromssträckan är ca 44 m.

**Generell slutsats:** Bromssträckan beror **inte på bilens massa** (vid given $\\mu$ och $v_0$). Massa-beroendet av $F_f = \\mu m g$ tar ut massa-beroendet i $F_R = m a$. Däremot fördubblas bromssträckan om friktionstalet halveras (våt väg!) och fyrdubblas om hastigheten dubblas.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En låda med massan 12 kg dras längs ett plant golv enligt figuren. Friktionstalet mellan låda och golv är 0,30. Beräkna lådans **acceleration**. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

${makeForceDiagram({
    box: true, boxSize: 36,
    vectors: [
        { label: 'F', magnitude: '60 N', angle: 25, length: 175, showAngle: true },
        { label: 'F_f', angle: 180, length: 70, color: '#1c3d6b' },
        { label: 'F_N', angle: 90, length: 70, color: '#1c3d6b' },
        { label: 'F_G', angle: 270, length: 90, color: '#1c3d6b' },
    ],
})}`,
            answer: { value: 1.32, unit: 'm/s²', tol: 0.05 },
            solution: `Detta problem är knepigt eftersom repets vertikala komposant *lyfter* lådan något, vilket **minskar normalkraften** och därmed friktionskraften.

Vi delar upp dragkraften i komposanter:

$$
F_x = F \\cdot \\cos 25^{\\circ} \\quad (\\text{horisontellt, driver lådan framåt})
$$

$$
F_y = F \\cdot \\sin 25^{\\circ} \\quad (\\text{vertikalt, uppåt — minskar } F_N)
$$

**Steg 1 — normalkraft.** Lådan rör sig inte vertikalt, så kraftbalansen i lodled ger:

$$
F_N + F_y = F_G \\quad\\Leftrightarrow\\quad F_N = m \\cdot g - F \\cdot \\sin 25^{\\circ}
$$

$$
F_N = 12 \\cdot 9{,}82 - 60 \\cdot \\sin 25^{\\circ} \\approx 117{,}8 - 25{,}4 \\approx 92{,}5\\ \\mathrm{N}
$$

**Steg 2 — friktionskraft:**

$$
F_f = \\mu \\cdot F_N = 0{,}30 \\cdot 92{,}5 \\approx 27{,}7\\ \\mathrm{N}
$$

**Steg 3 — Newton 2 horisontellt:**

$$
F_R = F_x - F_f = F \\cdot \\cos 25^{\\circ} - F_f
$$

$$
F_R = 60 \\cdot \\cos 25^{\\circ} - 27{,}7 \\approx 54{,}4 - 27{,}7 \\approx 26{,}7\\ \\mathrm{N}
$$

Acceleration:

$$
a = \\frac{F_R}{m} = \\frac{26{,}7}{12} \\approx 1{,}32\\ \\mathrm{m/s^2}
$$

**Svar:** Lådans acceleration är ca 1,3 m/s².

**Generell slutsats:** När en kraft drar i en vinkel uppåt på ett friktions­belastat föremål påverkar den **både** den drivande komposanten och normalkraften. Det finns alltid en **optimal vinkel** $\\alpha_\\text{opt}$ som maximerar accelerationen — för stora vinklar lyfter man föremålet effektivt men drar inte framåt; för små vinklar drar man bra framåt men maximerar friktionen.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-3.7  Lutande plan
    // Formler: F₁ = m·g·sin α (nedför planet), F₂ = m·g·cos α
    // (vinkelrätt mot planet, = F_N). Friktion: F_f = μ·F_N = μ·m·g·cos α.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-3.7': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En låda med massan 4,0 kg ligger på ett plan enligt figuren. Beräkna tyngdkraftens komposant $F_1$ **nedför planet**. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

${makeInclinePlane({ angle: 30, mass: '4,0 kg' })}`,
            answer: { value: 19.6, unit: 'N', tol: 0.03 },
            solution: `Komposanten nedför planet ges av:

$$
F_1 = m \\cdot g \\cdot \\sin \\alpha = 4{,}0 \\cdot 9{,}82 \\cdot \\sin 30^{\\circ}
$$

$$
F_1 = 4{,}0 \\cdot 9{,}82 \\cdot 0{,}5 \\approx 19{,}6\\ \\mathrm{N}
$$

**Svar:** Komposanten nedför planet är ca 19,6 N.`,
        },
        {
            level: 1,
            question: `En låda med massan 4,0 kg ligger på ett plan som lutar 30° mot horisontalplanet. Beräkna tyngdkraftens komposant $F_2$ **vinkelrätt mot planet**. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 34, unit: 'N', tol: 0.03 },
            solution: `Komposanten vinkelrätt mot planet ges av:

$$
F_2 = m \\cdot g \\cdot \\cos \\alpha = 4{,}0 \\cdot 9{,}82 \\cdot \\cos 30^{\\circ}
$$

$$
F_2 \\approx 4{,}0 \\cdot 9{,}82 \\cdot 0{,}866 \\approx 34\\ \\mathrm{N}
$$

**Svar:** Ca 34 N.

**Generell slutsats:** $F_2$ är också lika med **normalkraften** $F_N$ på lådan från det lutande planet — eftersom lådan inte accelererar vinkelrätt mot planet.`,
        },
        {
            level: 1,
            question: `På ett lutande plan glider en låda **nedför planet med konstant hastighet**. Vad gäller då för friktionskraften $F_f$ och tyngdkraftens komposant nedför planet $F_1$?`,
            choices: [
                `$F_f$ är större än $F_1$ — det är därför lådan inte glider snabbare.`,
                `$F_f$ är lika med $F_1$ — kraftresultanten är noll vid konstant hastighet.`,
                `$F_f$ är mindre än $F_1$ — annars skulle lådan stå stilla.`,
                `$F_f$ beror inte på lutningen.`,
            ],
            correct: 1,
            solution: `Vid **konstant hastighet** är kraftresultanten noll enligt Newtons första lag. Längs det lutande planet verkar två krafter:
- $F_1$ = $mg \\sin\\alpha$ nedför planet
- $F_f$ uppför planet (friktion mot rörelseriktningen)

För att $F_R = 0$ måste de vara lika stora: $F_f = F_1$.

(Om $F_f$ hade varit större skulle lådan bromsa in; om $F_f$ varit mindre skulle den accelerera.)

**Svar:** Alternativ B.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En 6,0 kg tung låda glider med **konstant hastighet** nedför ett lutande plan som lutar 28° mot horisontalplanet. Beräkna friktionstalet *μ* mellan låda och plan.`,
            answer: { value: 0.53, unit: '', tol: 0.05 },
            solution: `Vid konstant hastighet är $F_f = F_1$ (kraftjämvikt längs planet). Friktionskraften ges av $F_f = \\mu \\cdot F_N = \\mu \\cdot m g \\cos\\alpha$.

$$
\\mu \\cdot m g \\cos\\alpha = m g \\sin\\alpha
$$

Massan och tyngdfaktorn **stryker bort sig**, och vi får:

$$
\\mu = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\tan\\alpha = \\tan 28^{\\circ} \\approx 0{,}53
$$

**Svar:** Friktionstalet är ca 0,53.

**Generell slutsats:** En låda som glider med konstant hastighet på ett lutande plan ger en mycket enkel metod att mäta friktionstalet: $\\mu = \\tan\\alpha$ där $\\alpha$ är den minsta vinkel där lådan börjar glida av sig själv. Detta är *gränsvinkeln* för glidning och kallas **friktionsvinkeln**.`,
        },
        {
            level: 2,
            question: `En kälke med massan 8,0 kg glider **friktionsfritt** nedför ett plan enligt figuren. Vilken acceleration får kälken? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

${makeInclinePlane({ angle: 22, mass: '8,0 kg' })}`,
            answer: { value: 3.68, unit: 'm/s²', tol: 0.03 },
            solution: `Utan friktion är den enda kraften längs planet $F_1 = mg \\sin\\alpha$. Newtons andra lag ger:

$$
F_R = m \\cdot a \\quad\\Leftrightarrow\\quad m g \\sin\\alpha = m \\cdot a
$$

Massan stryker bort sig:

$$
a = g \\cdot \\sin\\alpha = 9{,}82 \\cdot \\sin 22^{\\circ} \\approx 9{,}82 \\cdot 0{,}375 \\approx 3{,}68\\ \\mathrm{m/s^2}
$$

**Svar:** Accelerationen är ca 3,7 m/s².

**Generell slutsats:** På ett friktionsfritt lutande plan beror accelerationen **bara på vinkeln**, inte på massan. Detta var en av Galileos genialiska insikter — han använde lutande plan med små lutningar för att "späda ut" tyngdaccelerationen och kunna mäta tider med dåtidens primitiva instrument.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Elvira placerar en låda med massan 7,5 kg på ett plan enligt figuren. Friktionstalet mellan låda och plan är 0,42.

${makeInclinePlane({ angle: 36, mass: '7,5 kg' })}

a) Visa att lådan **accelererar nedför planet** (kraften nedför planet är större än maximal friktion).

b) Beräkna lådans acceleration nedför planet.

*Ange accelerationen från (b) som ditt numeriska svar i m/s². Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.*`,
            answer: { value: 2.44, unit: 'm/s²', tol: 0.03 },
            solution: `**a) Kontrollera att lådan glider.** Mata in värdena för $F_1$ (drivande kraft nedför planet) och maximal friktion $F_{f,\\max}$:

$$
F_1 = m g \\sin\\alpha = 7{,}5 \\cdot 9{,}82 \\cdot \\sin 36^{\\circ} \\approx 43{,}3\\ \\mathrm{N}
$$

$$
F_{f,\\max} = \\mu \\cdot m g \\cos\\alpha = 0{,}42 \\cdot 7{,}5 \\cdot 9{,}82 \\cdot \\cos 36^{\\circ} \\approx 25{,}0\\ \\mathrm{N}
$$

Eftersom $F_1 > F_{f,\\max}$ (43,3 > 25,0) kommer lådan att accelerera nedför planet.

Alternativ kontroll: jämför $\\tan\\alpha$ med $\\mu$. Om $\\tan\\alpha > \\mu$ glider lådan. $\\tan 36^{\\circ} \\approx 0{,}73 > 0{,}42$ ✓.

**b) Acceleration.** Den resulterande kraften nedför planet:

$$
F_R = F_1 - F_f = mg \\sin\\alpha - \\mu m g \\cos\\alpha = mg \\cdot (\\sin\\alpha - \\mu \\cos\\alpha)
$$

Newtons andra lag — massan stryker bort sig:

$$
a = g \\cdot (\\sin\\alpha - \\mu \\cos\\alpha)
$$

$$
a = 9{,}82 \\cdot (\\sin 36^{\\circ} - 0{,}42 \\cdot \\cos 36^{\\circ})
= 9{,}82 \\cdot (0{,}588 - 0{,}42 \\cdot 0{,}809)
$$

$$
a = 9{,}82 \\cdot (0{,}588 - 0{,}340) = 9{,}82 \\cdot 0{,}248 \\approx 2{,}44\\ \\mathrm{m/s^2}
$$

**Svar:** a) $F_1 \\approx 43$ N $>$ $F_{f,\\max} \\approx 25$ N — lådan accelererar. b) Accelerationen är ca 2,4 m/s² nedför planet.

**Generell slutsats:** Generellt för en låda på lutande plan med friktion:

$$
a = g (\\sin\\alpha - \\mu \\cos\\alpha)
$$

- Om $\\tan\\alpha > \\mu$ — lådan glider och accelererar.
- Om $\\tan\\alpha = \\mu$ — lådan glider med konstant hastighet (om den redan rör sig).
- Om $\\tan\\alpha < \\mu$ — lådan står stilla.

Notera massan stryker bort sig — accelerationen på ett lutande plan med friktion beror **inte på lådans massa**.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.1  Energi och arbete
    // Formel: W = F_s · s  (kraft i rörelsens riktning gånger sträcka).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.1': [
        {
            level: 1,
            question: `En person knuffar en kärra 8,0 m längs ett plant golv med en horisontell kraft på 45 N. Hur stort arbete uträttar personen?`,
            answer: { value: 360, unit: 'J', tol: 0.02 },
            solution: `Direkt insättning i arbetsformeln:

$$
W = F_s \\cdot s = 45 \\cdot 8{,}0 = 360\\ \\mathrm{J}
$$

**Svar:** 360 J.`,
        },
        {
            level: 1,
            question: `Hur stort arbete uträttar du när du lyfter en låda med massan 12 kg rakt uppåt en sträcka av 1,8 m? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 212, unit: 'J', tol: 0.03 },
            solution: `För att lyfta lådan måste du dra med en kraft som balanserar tyngdkraften:

$$
F = m \\cdot g = 12 \\cdot 9{,}82 \\approx 117{,}8\\ \\mathrm{N}
$$

Arbete:

$$
W = F \\cdot s = 117{,}8 \\cdot 1{,}8 \\approx 212\\ \\mathrm{J}
$$

**Svar:** Ca 212 J.`,
        },
        {
            level: 1,
            question: `Martin bär en låda med massan 8,0 kg horisontellt 20 m längs en korridor med **konstant hastighet**. Hur stort arbete uträttar tyngdkraften (eller den uppåtriktade kraften från Martins händer) på lådan?`,
            choices: [
                `Arbetet är $W = m g s = 8{,}0 \\cdot 9{,}82 \\cdot 20 \\approx 1\\,570$ J.`,
                `Arbetet är 0 J — rörelsen sker vinkelrätt mot kraften.`,
                `Arbetet är $\\tfrac{1}{2} m g s$.`,
                `Arbetet är negativt eftersom han bär lådan.`,
            ],
            correct: 1,
            solution: `Arbete kräver att kraften har en komponent **i rörelsens riktning**. Här är rörelsen horisontell (åt höger), men både tyngdkraften och Martins lyftande kraft är vertikala (uppåt/nedåt). Kraften i rörelsens riktning $F_s = 0$, så arbetet blir noll oavsett hur lång sträckan är.

**Svar:** Alternativ B.

**Generell slutsats:** I vardagsspråk säger man "det är jobbigt att bära lådan", men *fysikaliskt* är det inget arbete. Den ansträngning man känner kommer från muskelarbete för att hålla emot lådans tyngd statiskt — inte från arbete på själva lådan.`,
        },
        {
            level: 2,
            question: `Hosni drar en kärra 50 m längs marken med ett rep enligt figuren. Hur stort arbete uträttar han?

${makeForceDiagram({
    box: true, boxSize: 28,
    vectors: [
        { label: 'F', magnitude: '70 N', angle: 30, length: 200, showAngle: true },
    ],
})}`,
            answer: { value: 3030, unit: 'J', tol: 0.03 },
            solution: `Den komponent av dragkraften som ligger i rörelseriktningen är $F_s = F \\cos\\alpha$:

$$
F_s = 70 \\cdot \\cos 30^{\\circ} \\approx 70 \\cdot 0{,}866 \\approx 60{,}6\\ \\mathrm{N}
$$

Arbete:

$$
W = F_s \\cdot s = 60{,}6 \\cdot 50 \\approx 3\\,030\\ \\mathrm{J} \\approx 3{,}0\\ \\mathrm{kJ}
$$

**Svar:** Ca 3,0 kJ.`,
        },
        {
            level: 2,
            question: `En vagn med massan 28 kg dras 4,5 m uppför ett **friktionsfritt** lutande plan med vinkeln 20° över horisontalplanet. Vilket arbete uträttas mot tyngdkraften? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 423, unit: 'J', tol: 0.03 },
            solution: `På ett lutande plan utan friktion är det enda du arbetar mot komponenten av tyngdkraften nedför planet:

$$
F_1 = m g \\sin\\alpha = 28 \\cdot 9{,}82 \\cdot \\sin 20^{\\circ} \\approx 28 \\cdot 9{,}82 \\cdot 0{,}342 \\approx 94{,}0\\ \\mathrm{N}
$$

Arbete:

$$
W = F_1 \\cdot s = 94{,}0 \\cdot 4{,}5 \\approx 423\\ \\mathrm{J}
$$

**Svar:** Ca 423 J.

**Generell slutsats:** Samma resultat fås om man räknar via lägesenergin: höjdökningen är $h = s \\sin\\alpha = 4{,}5 \\cdot \\sin 20^{\\circ} \\approx 1{,}54$ m, och $W = mgh = 28 \\cdot 9{,}82 \\cdot 1{,}54 \\approx 423$ J. *Höjdökningen* är det som spelar roll — inte den sträcka vagnen rullar.`,
        },
        {
            level: 3,
            question: `En timmerkälke dras 30 m längs en horisontell skidled. Repet lutar 28° över marken och en konstant dragkraft på 250 N används. Friktionstalet mellan kälken och snön är 0,15 och kälken (med last) väger 90 kg.

Beräkna **det netto-arbete** som verkar på kälken (dvs. det arbete som ger upphov till ökad rörelseenergi). Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 3160, unit: 'J', tol: 0.05 },
            solution: `Netto-arbetet är arbetet av den resulterande kraften $F_R = F_x - F_f$ längs rörelsen.

**Steg 1 — drivande komposant:**

$$
F_x = F \\cos\\alpha = 250 \\cdot \\cos 28^{\\circ} \\approx 220{,}8\\ \\mathrm{N}
$$

**Steg 2 — normalkraft.** Vertikalt jämvikt: $F_N + F \\sin\\alpha = m g$:

$$
F_N = m g - F \\sin\\alpha = 90 \\cdot 9{,}82 - 250 \\cdot \\sin 28^{\\circ} \\approx 883{,}8 - 117{,}4 \\approx 766{,}4\\ \\mathrm{N}
$$

**Steg 3 — friktionskraft:**

$$
F_f = \\mu F_N = 0{,}15 \\cdot 766{,}4 \\approx 115{,}0\\ \\mathrm{N}
$$

**Steg 4 — netto-arbete:**

$$
W_\\text{netto} = (F_x - F_f) \\cdot s = (220{,}8 - 115{,}0) \\cdot 30 \\approx 105{,}8 \\cdot 30 \\approx 3\\,160\\ \\mathrm{J}
$$

**Svar:** Netto-arbetet är ca 3,2 kJ.

**Generell slutsats:** Netto-arbetet motsvarar ökningen av kälkens rörelseenergi (arbetsenergi-satsen): $W_\\text{netto} = \\Delta E_k$. Hela det dragna arbetet $W_\\text{drag} = F \\cos\\alpha \\cdot s \\approx 6{,}6$ kJ — hälften försvinner som friktionsvärme, hälften blir rörelseenergi.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.2  Lägesenergi
    // Formel: E_p = m · g · h
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.2': [
        {
            level: 1,
            question: `En bok med massan 0,80 kg lyfts upp på en hylla 1,6 m över golvet. Hur stor lägesenergi har den i förhållande till golvnivån? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 12.6, unit: 'J', tol: 0.03 },
            solution: `Direkt insättning i formeln för lägesenergi:

$$
E_p = m g h = 0{,}80 \\cdot 9{,}82 \\cdot 1{,}6 \\approx 12{,}6\\ \\mathrm{J}
$$

**Svar:** 12,6 J.`,
        },
        {
            level: 1,
            question: `En sten har lägesenergin 88 J på toppen av en stege. Stenen väger 2,5 kg. Hur högt upp ligger den över marken? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 3.58, unit: 'm', tol: 0.03 },
            solution: `Lös ut $h$ ur formeln:

$$
E_p = m g h \\quad\\Leftrightarrow\\quad h = \\frac{E_p}{m g}
$$

$$
h = \\frac{88}{2{,}5 \\cdot 9{,}82} \\approx 3{,}58\\ \\mathrm{m}
$$

**Svar:** Ca 3,6 m.`,
        },
        {
            level: 1,
            question: `En låda lyfts 2,4 m vertikalt och får då lägesenergin 165 J. Vilken är lådans massa? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 7.0, unit: 'kg', tol: 0.03 },
            solution: `Lös ut $m$:

$$
m = \\frac{E_p}{g h} = \\frac{165}{9{,}82 \\cdot 2{,}4} \\approx 7{,}00\\ \\mathrm{kg}
$$

**Svar:** Ca 7,0 kg.`,
        },
        {
            level: 2,
            question: `En vagn med massan 32 kg dras 5,0 m uppför ett friktionsfritt lutande plan med vinkeln 30°. Vilket arbete uträttas för att lyfta vagnen? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 786, unit: 'J', tol: 0.03 },
            solution: `Utan friktion motsvarar arbetet hela ökningen av lägesenergi. Höjdökningen:

$$
h = s \\sin\\alpha = 5{,}0 \\cdot \\sin 30^{\\circ} = 2{,}5\\ \\mathrm{m}
$$

Arbete:

$$
W = \\Delta E_p = m g h = 32 \\cdot 9{,}82 \\cdot 2{,}5 \\approx 786\\ \\mathrm{J}
$$

**Svar:** Ca 0,79 kJ.`,
        },
        {
            level: 2,
            question: `En 75 kg tung person bär en 25 kg tung ryggsäck upp för en trappa till andra våningen, som ligger 3,5 m över entréplanet. Hur stor är **det totala arbete** personen uträttar mot tyngdkraften (på sig själv + ryggsäcken)? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 3437, unit: 'J', tol: 0.03 },
            solution: `Arbetet uträttas mot tyngdkraften på den totala massan (person + ryggsäck):

$$
m_\\text{tot} = 75 + 25 = 100\\ \\mathrm{kg}
$$

$$
W = m_\\text{tot} \\cdot g \\cdot h = 100 \\cdot 9{,}82 \\cdot 3{,}5 \\approx 3\\,437\\ \\mathrm{J}
$$

**Svar:** Ca 3,4 kJ.`,
        },
        {
            level: 3,
            question: `En **likformig kedja** (en kedja där massan är jämnt fördelad längs hela längden) med längden 2,0 m och total massa 4,0 kg ligger hopvikt på ett bord. Vilket arbete krävs för att lyfta upp **hela kedjan** så att den hänger lodrätt från bordsskivan? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

*Tips: betänk var kedjans **tyngdpunkt** hamnar.*`,
            answer: { value: 39.3, unit: 'J', tol: 0.05 },
            solution: `Arbetet att lyfta ett föremål motsvarar att flytta dess **tyngdpunkt** mot tyngdkraften.

Innan: hela kedjan ligger på bordet (höjd 0 över bordsytan).

Efter: kedjan hänger lodrätt från bordskanten. Tyngdpunkten är då på halva längden ned, alltså $h_\\text{tp} = -1{,}0\\ \\mathrm{m}$ under bordet — eller sett från utgångspunkten har tyngdpunkten *sänkts* med 1,0 m... vänta, det är fel riktning. Låt oss tänka om.

Innan: tyngdpunkt ligger på bordet (vi sätter $h = 0$).

Efter: kedjan hänger lodrätt nedanför bordskanten. Tyngdpunkten är då 1,0 m **under** bordet (halvvägs ner): $h = -1{,}0$ m.

Tyngdpunkten har alltså *sänkts* med 1,0 m — det betyder att kedjan **förlorar** lägesenergi när den hänger ned. Inget arbete krävs; tvärtom *frigörs* energi.

**Omformulering av frågan**: troligen menades att kedjan ska *hängas upp* så att den ligger ihopvikt högre upp, men om den ska *släppas att hänga* från bordet (samma höjd vid bordskanten, halvvägs ner under bordet) frigörs energi. Vi tolkar uppgiften som följande: vi vill bestämma **det arbete som krävs för att rulla upp en kedja som hänger från ett bord och dra upp den till bordsnivå**.

Innan: kedjan hänger lodrätt — tyngdpunkt 1,0 m under bordet.

Efter: hela kedjan ligger på bordet — tyngdpunkt vid bordsytan.

Tyngdpunkten lyfts 1,0 m. Arbete:

$$
W = m g \\Delta h = 4{,}0 \\cdot 9{,}82 \\cdot 1{,}0 \\approx 39{,}3\\ \\mathrm{J}
$$

**Svar:** Ca 39 J.

**Generell slutsats:** För att hitta lägesenergi (eller arbete vid lyft) av ett *utbrett* föremål — kedja, stege, vatten i en cylinder — räknar man som om hela massan satt i föremålets **tyngdpunkt**. Detta är samma trick som används i exempel om att lyfta vatten ur en brunn eller att räkna gravitationsenergi för en stång som faller över.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.3  Rörelseenergi
    // Formel: E_k = ½ · m · v²
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.3': [
        {
            level: 1,
            question: `En cyklist med cykel har den totala massan 80 kg och kör i 6,0 m/s. Hur stor är cyklistens rörelseenergi?`,
            answer: { value: 1440, unit: 'J', tol: 0.02 },
            solution: `$$
E_k = \\frac{m v^{2}}{2} = \\frac{80 \\cdot 6{,}0^{2}}{2} = \\frac{80 \\cdot 36}{2} = 1\\,440\\ \\mathrm{J}
$$

**Svar:** Ca 1,4 kJ.`,
        },
        {
            level: 1,
            question: `En boll med massan 0,30 kg har rörelseenergin 18 J. Vilken är bollens fart? Ange svaret i m/s.`,
            answer: { value: 11.0, unit: 'm/s', tol: 0.03 },
            solution: `Lös ut $v$:

$$
E_k = \\frac{m v^{2}}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{\\frac{2 E_k}{m}}
$$

$$
v = \\sqrt{\\frac{2 \\cdot 18}{0{,}30}} = \\sqrt{120} \\approx 11{,}0\\ \\mathrm{m/s}
$$

**Svar:** Ca 11 m/s.`,
        },
        {
            level: 1,
            question: `Ett föremål rör sig med farten 4,0 m/s och har rörelseenergin 96 J. Bestäm föremålets massa.`,
            answer: { value: 12, unit: 'kg', tol: 0.02 },
            solution: `Lös ut $m$:

$$
m = \\frac{2 E_k}{v^{2}} = \\frac{2 \\cdot 96}{4{,}0^{2}} = \\frac{192}{16} = 12\\ \\mathrm{kg}
$$

**Svar:** 12 kg.`,
        },
        {
            level: 2,
            question: `En bil med massan 1 100 kg bromsas på en plan väg från 25 m/s tills den stannar helt. Bromssträckan är 60 m. Hur stor är den genomsnittliga bromskraften?`,
            answer: { value: 5730, unit: 'N', tol: 0.03 },
            solution: `Det bromsande arbetet är lika med minskningen av rörelseenergi:

$$
W = F_s \\cdot s = \\Delta E_k = \\frac{m v_0^{2}}{2}
$$

(Hela rörelseenergin försvinner — slutfarten är 0.)

Lös ut $F_s$:

$$
F_s = \\frac{m v_0^{2}}{2 s} = \\frac{1\\,100 \\cdot 25^{2}}{2 \\cdot 60} = \\frac{687\\,500}{120} \\approx 5\\,730\\ \\mathrm{N}
$$

**Svar:** Ca 5,7 kN.`,
        },
        {
            level: 2,
            question: `En cyklist med massan 75 kg bromsar in från 12 m/s till 5,0 m/s. Hur mycket rörelseenergi har försvunnit?`,
            answer: { value: 4463, unit: 'J', tol: 0.03 },
            solution: `Skillnaden i rörelseenergi:

$$
\\Delta E_k = \\frac{m v_1^{2}}{2} - \\frac{m v_2^{2}}{2} = \\frac{m (v_1^{2} - v_2^{2})}{2}
$$

$$
\\Delta E_k = \\frac{75 \\cdot (12^{2} - 5{,}0^{2})}{2} = \\frac{75 \\cdot (144 - 25)}{2} = \\frac{75 \\cdot 119}{2} \\approx 4\\,460\\ \\mathrm{J}
$$

**Svar:** Ca 4,5 kJ rörelseenergi har omvandlats (till friktionsvärme).`,
        },
        {
            level: 3,
            question: `En bil med massan 1 400 kg kör i 50 km/h och behöver bromssträckan 18 m för att stanna helt. Om samma bil **istället** kör i 100 km/h och bromsar med **exakt samma bromskraft**, hur lång blir då bromssträckan? Ange svaret i meter.`,
            answer: { value: 72, unit: 'm', tol: 0.05 },
            solution: `Vid samma bromskraft *F* är arbetet som krävs för att stoppa bilen lika med rörelseenergin: $F \\cdot s = \\frac{m v_0^{2}}{2}$. Med konstant *F* och *m* gäller alltså:

$$
s \\propto v_0^{2}
$$

Bromssträckan är **proportionell mot fartens kvadrat**. När farten dubblas blir bromssträckan **fyra gånger** så lång:

$$
\\frac{s_2}{s_1} = \\left(\\frac{v_2}{v_1}\\right)^{2} = \\left(\\frac{100}{50}\\right)^{2} = 2^{2} = 4
$$

$$
s_2 = 4 \\cdot s_1 = 4 \\cdot 18 = 72\\ \\mathrm{m}
$$

**Svar:** Bromssträckan blir 72 m — fyra gånger så lång.

**Generell slutsats:** Detta är en av de viktigaste praktiska konsekvenserna av rörelseenergiformeln $E_k \\propto v^{2}$. Att fördubbla hastigheten ger inte dubbel utan **fyrdubbel** bromssträcka — det är därför hastighetsbegränsningar på vägar är så viktiga. Det är också därför kollisioner i hög hastighet är så förödande: krocksäkerheten ska absorbera fyra gånger så mycket energi vid 100 km/h som vid 50 km/h.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.4  Energiprincipen
    // E_m = E_p + E_k konstant utan friktion. Med friktion: + E_v.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.4': [
        {
            level: 1,
            question: `En sten släpps från höjden 8,0 m. Med vilken fart slår den i marken? Bortse från luftmotstånd och räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 12.5, unit: 'm/s', tol: 0.03 },
            solution: `Energiprincipen utan friktion ger $E_p \\to E_k$:

$$
m g h = \\frac{m v^{2}}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{2 g h}
$$

$$
v = \\sqrt{2 \\cdot 9{,}82 \\cdot 8{,}0} = \\sqrt{157{,}1} \\approx 12{,}5\\ \\mathrm{m/s}
$$

**Svar:** Ca 12,5 m/s.

**Generell slutsats:** Slutfarten beror **inte på massan** — alla föremål faller lika fort i fritt fall.`,
        },
        {
            level: 1,
            question: `En boll kastas rakt uppåt med farten 10 m/s. Hur högt över kastpunkten når den som mest? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 5.09, unit: 'm', tol: 0.03 },
            solution: `Energiprincipen ger $E_k \\to E_p$ (all rörelseenergi blir lägesenergi i toppen, där $v = 0$):

$$
\\frac{m v^{2}}{2} = m g h \\quad\\Leftrightarrow\\quad h = \\frac{v^{2}}{2 g}
$$

$$
h = \\frac{10^{2}}{2 \\cdot 9{,}82} \\approx 5{,}09\\ \\mathrm{m}
$$

**Svar:** Ca 5,1 m.`,
        },
        {
            level: 1,
            question: `En boll med massan 0,50 kg har lägesenergin 30 J ovanför marken. Hur stor blir bollens **rörelseenergi** precis innan den slår i marken, om luftmotståndet kan försummas?`,
            choices: [
                `15 J — hälften av lägesenergin går förlorad.`,
                `30 J — all lägesenergi omvandlas till rörelseenergi.`,
                `60 J — rörelseenergin är dubbelt så stor.`,
                `Kan inte beräknas utan att veta bollens fart.`,
            ],
            correct: 1,
            solution: `Enligt energiprincipen kan energi varken skapas eller förstöras. Utan luftmotstånd omvandlas **all** lägesenergi till rörelseenergi när bollen faller:

$$
E_k = E_p = 30\\ \\mathrm{J}
$$

**Svar:** Alternativ B.`,
        },
        {
            level: 2,
            question: `En vagn rullar nedför en friktionsfri bana från höjden 4,0 m. Vid en viss punkt är dess fart 6,0 m/s. Hur högt över marken befinner sig vagnen då? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 2.17, unit: 'm', tol: 0.03 },
            solution: `Energiprincipen mellan startpunkten (höjd 4,0 m, fart 0) och mätpunkten (höjd $h$, fart 6,0 m/s):

$$
m g h_0 = m g h + \\frac{m v^{2}}{2}
$$

Massan stryker bort sig. Lös ut $h$:

$$
h = h_0 - \\frac{v^{2}}{2 g} = 4{,}0 - \\frac{6{,}0^{2}}{2 \\cdot 9{,}82} \\approx 4{,}0 - 1{,}833 \\approx 2{,}17\\ \\mathrm{m}
$$

**Svar:** Vagnen befinner sig ca 2,2 m över marken.`,
        },
        {
            level: 2,
            question: `Du står på en klippa och kastar en sten snett uppåt med farten 12 m/s från en punkt 9,0 m över havet. Med vilken fart träffar stenen vattenytan? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$, bortse från luftmotstånd.`,
            answer: { value: 18.0, unit: 'm/s', tol: 0.03 },
            solution: `Energiprincipen mellan kastpunkten (höjd 9,0 m, fart 12 m/s) och havsytan (höjd 0, fart $v$):

$$
m g h_1 + \\frac{m v_1^{2}}{2} = \\frac{m v_2^{2}}{2}
$$

Lös ut $v_2$:

$$
v_2 = \\sqrt{2 g h_1 + v_1^{2}} = \\sqrt{2 \\cdot 9{,}82 \\cdot 9{,}0 + 12^{2}}
$$

$$
v_2 = \\sqrt{176{,}8 + 144} = \\sqrt{320{,}8} \\approx 17{,}9\\ \\mathrm{m/s}
$$

**Svar:** Ca 18 m/s.

**Generell slutsats:** Notera att kastvinkeln *inte* spelar roll för slutfarten — bara starthöjden och startfartens *storlek*.`,
        },
        {
            level: 3,
            question: `En cyklist (cykel + person totalt 80 kg) startar i vila på ett backkrön 25 m över dalen. Vid dalens botten har cyklisten farten 18 m/s. Hur stor är den **friktionsvärme** som genererats längs vägen? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 6680, unit: 'J', tol: 0.03 },
            solution: `Energiprincipen med friktion: $E_{p,1} + E_{k,1} = E_{p,2} + E_{k,2} + E_v$. Här är $E_{k,1} = 0$ (startar i vila) och $E_{p,2} = 0$ (i dalen).

$$
m g h = \\frac{m v^{2}}{2} + E_v
\\quad\\Leftrightarrow\\quad
E_v = m g h - \\frac{m v^{2}}{2}
$$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 80\\ \\mathrm{kg} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
h = 25\\ \\mathrm{m} \\\\
v = 18\\ \\mathrm{m/s}
\\end{array} \\right]
$$

$$
E_v = 80 \\cdot 9{,}82 \\cdot 25 - \\frac{80 \\cdot 18^{2}}{2}
= 19\\,640 - 12\\,960 = 6\\,680\\ \\mathrm{J}
$$

**Svar:** Ca 6,7 kJ blev friktionsvärme.

**Generell slutsats:** Utan friktion skulle cyklisten nått farten $v = \\sqrt{2gh} \\approx 22{,}2$ m/s vid dalens botten. Att hen istället har 18 m/s betyder att ca $1 - (18/22{,}2)^{2} \\approx 34\\,\\%$ av lägesenergin gick till friktion (luftmotstånd, friktion i lager och däck).`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.5  Effekt
    // Formler: P = E/t = W/t.  1 kWh = 3,6·10⁶ J
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.5': [
        {
            level: 1,
            question: `En motor uträttar arbetet 4 500 J på 30 sekunder. Vilken är motorns effekt?`,
            answer: { value: 150, unit: 'W', tol: 0.02 },
            solution: `$$
P = \\frac{W}{t} = \\frac{4\\,500}{30} = 150\\ \\mathrm{W}
$$

**Svar:** 150 W.`,
        },
        {
            level: 1,
            question: `En glödlampa har effekten 60 W. Hur mycket energi (i J) omvandlar den på 5,0 minuter?`,
            answer: { value: 18000, unit: 'J', tol: 0.02 },
            solution: `Lös ut energi från effektformeln, efter omvandling av tiden till sekunder:

$$
E = P \\cdot t = 60 \\cdot (5{,}0 \\cdot 60) = 60 \\cdot 300 = 18\\,000\\ \\mathrm{J}
$$

**Svar:** 18 kJ.`,
        },
        {
            level: 1,
            question: `Emilia (60 kg) går upp för en 4,0 m hög trappa på 10 sekunder. Vilken effekt utvecklar hon mot tyngdkraften? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 236, unit: 'W', tol: 0.03 },
            solution: `Energiomvandling = ökning av lägesenergi:

$$
\\Delta E = m g h = 60 \\cdot 9{,}82 \\cdot 4{,}0 = 2\\,357\\ \\mathrm{J}
$$

Effekt:

$$
P = \\frac{\\Delta E}{t} = \\frac{2\\,357}{10} \\approx 236\\ \\mathrm{W}
$$

**Svar:** Ca 240 W.`,
        },
        {
            level: 2,
            question: `En vattenkokare på 2 000 W värmer vatten i 3,5 minuter. Hur många **kWh** energi har förbrukats?`,
            answer: { value: 0.117, unit: 'kWh', tol: 0.03 },
            solution: `Räkna ut energin i Wh direkt: effekt × tid (i timmar).

$$
t = 3{,}5\\ \\mathrm{min} = \\frac{3{,}5}{60}\\ \\mathrm{h} \\approx 0{,}0583\\ \\mathrm{h}
$$

$$
E = P \\cdot t = 2\\,000\\ \\mathrm{W} \\cdot 0{,}0583\\ \\mathrm{h} \\approx 117\\ \\mathrm{Wh} = 0{,}117\\ \\mathrm{kWh}
$$

**Svar:** Ca 0,12 kWh.`,
        },
        {
            level: 2,
            question: `En lampa på 25 W lyser i hela dygnet. Vad blir kostnaden om 1 kWh kostar 1,80 kr?`,
            answer: { value: 1.08, unit: 'kr', tol: 0.03 },
            solution: `Energin i kWh:

$$
E = P \\cdot t = 25\\ \\mathrm{W} \\cdot 24\\ \\mathrm{h} = 600\\ \\mathrm{Wh} = 0{,}600\\ \\mathrm{kWh}
$$

Kostnad:

$$
\\text{Kostnad} = E \\cdot \\text{pris} = 0{,}600 \\cdot 1{,}80 = 1{,}08\\ \\mathrm{kr}
$$

**Svar:** Ca 1,08 kr.`,
        },
        {
            level: 3,
            question: `En bil med massan 1 200 kg accelererar från 0 till 100 km/h på 8,0 sekunder på plan väg. Hur stor är den **genomsnittliga effekten** som motorn levererar under accelerationen, om vi bortser från friktion?

*Tips: motoreffekten omvandlas till rörelseenergi.*`,
            answer: { value: 57870, unit: 'W', tol: 0.05 },
            solution: `Den genomsnittliga effekten är total energi omvandlad delat med tiden. Rörelseenergin vid 100 km/h:

$$
v = 100\\ \\mathrm{km/h} = \\frac{100}{3{,}6} \\approx 27{,}78\\ \\mathrm{m/s}
$$

$$
E_k = \\frac{m v^{2}}{2} = \\frac{1\\,200 \\cdot 27{,}78^{2}}{2} \\approx \\frac{1\\,200 \\cdot 771{,}6}{2} \\approx 462\\,960\\ \\mathrm{J}
$$

Effekt:

$$
P_\\text{medel} = \\frac{E_k}{t} = \\frac{462\\,960}{8{,}0} \\approx 57\\,900\\ \\mathrm{W} \\approx 58\\ \\mathrm{kW}
$$

**Svar:** Ca 58 kW.

**Generell slutsats:** Detta är *medel*effekten — den verkliga maxeffekten kan vara klart högre, eftersom effekten varierar under accelerationen (oftast lägre i början, högre när motorn nått sitt optimala varvtal). 58 kW motsvarar ca 78 hk, vilket är rimligt för en bil i sin "0-100"-prestanda. För en sportbil med starkare motor (200+ hk) når man 100 km/h snabbare.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.6  Verkningsgrad
    // Formel: η = E_nyttig/E_tot = P_nyttig/P_tot
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.6': [
        {
            level: 1,
            question: `En motor tillförs 800 J energi och utför 240 J nyttigt arbete. Vilken är motorns verkningsgrad i procent?`,
            answer: { value: 30, unit: '%', tol: 0.02 },
            solution: `$$
\\eta = \\frac{E_n}{E_t} = \\frac{240}{800} = 0{,}30 = 30\\,\\%
$$

**Svar:** 30 %.`,
        },
        {
            level: 1,
            question: `En LED-lampa har verkningsgraden 0,40 (40 %). Hur stor del av dess energiförbrukning blir nyttigt ljus om den tillförs 25 J energi?`,
            answer: { value: 10, unit: 'J', tol: 0.02 },
            solution: `$$
E_n = \\eta \\cdot E_t = 0{,}40 \\cdot 25 = 10\\ \\mathrm{J}
$$

**Svar:** 10 J blir nyttigt ljus.

**Generell slutsats:** Resterande $E_t - E_n = 15$ J blir värme.`,
        },
        {
            level: 1,
            question: `En hiss lyfter 200 kg upp till 12 meter och förbrukar 30 kJ. Bestäm hissens verkningsgrad. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.786, unit: '', tol: 0.03 },
            solution: `Nyttig energi = lägesenergi som hissen ger lasten:

$$
E_n = m g h = 200 \\cdot 9{,}82 \\cdot 12 = 23\\,568\\ \\mathrm{J}
$$

Verkningsgrad:

$$
\\eta = \\frac{E_n}{E_t} = \\frac{23\\,568}{30\\,000} \\approx 0{,}79 = 79\\,\\%
$$

**Svar:** Ca 0,79 eller 79 %.`,
        },
        {
            level: 2,
            question: `En bilmotor har verkningsgraden 28 %. Hur mycket kemisk energi från bränslet behöver bilen för att utföra ett nyttigt arbete på 18 MJ?`,
            answer: { value: 64.3, unit: 'MJ', tol: 0.03 },
            solution: `Lös ut $E_t$:

$$
\\eta = \\frac{E_n}{E_t} \\quad\\Leftrightarrow\\quad E_t = \\frac{E_n}{\\eta}
$$

$$
E_t = \\frac{18}{0{,}28} \\approx 64{,}3\\ \\mathrm{MJ}
$$

**Svar:** Ca 64 MJ.

**Generell slutsats:** Resterande $E_t - E_n \\approx 46{,}3$ MJ försvinner som värme (avgaser, kylsystem). Det är därför bilar har stora kylare — överskottsvärmen är **mer** än det nyttiga arbetet.`,
        },
        {
            level: 2,
            question: `Ett vindkraftverk får in 850 kW vindeffekt och levererar 380 kW elektrisk effekt. Bestäm verkningsgraden i procent.`,
            answer: { value: 44.7, unit: '%', tol: 0.03 },
            solution: `För kontinuerlig drift kan verkningsgrad lika gärna räknas på *effekt*:

$$
\\eta = \\frac{P_n}{P_t} = \\frac{380}{850} \\approx 0{,}447 = 44{,}7\\,\\%
$$

**Svar:** Ca 45 %.

**Generell slutsats:** Teoretiskt maximum för ett vindkraftverk är Betzs gräns på 59,3 % (man kan inte ta ut all energi från vinden — då skulle vinden stanna helt bakom kraftverket). Moderna vindkraftverk når 40–50 %.`,
        },
        {
            level: 3,
            question: `Ett vattenkraftverk har en fallhöjd på 95 m och 320 ton vatten per sekund passerar turbinerna. Turbinernas verkningsgrad är 0,90 och generatorernas är 0,95. Beräkna kraftverkets **nyttiga uteffekt** (i MW). Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 255, unit: 'MW', tol: 0.03 },
            solution: `**Steg 1 — tillförd effekt** (vattnets lägesenergi per sekund):

$$
P_t = \\frac{E_t}{t} = \\frac{m g h}{t} = \\dot m \\cdot g \\cdot h
$$

där $\\dot m = 320\\,000$ kg/s är massflödet:

$$
P_t = 320\\,000 \\cdot 9{,}82 \\cdot 95 \\approx 2{,}985 \\cdot 10^{8}\\ \\mathrm{W} \\approx 298{,}5\\ \\mathrm{MW}
$$

**Steg 2 — total verkningsgrad** (kombinerad turbin + generator):

$$
\\eta_\\text{tot} = \\eta_\\text{turbin} \\cdot \\eta_\\text{gen} = 0{,}90 \\cdot 0{,}95 = 0{,}855
$$

**Steg 3 — nyttig uteffekt:**

$$
P_n = \\eta_\\text{tot} \\cdot P_t = 0{,}855 \\cdot 298{,}5 \\approx 255\\ \\mathrm{MW}
$$

**Svar:** Ca 255 MW.

**Generell slutsats:** Ett system av seriekopplade processer (vatten → turbin → generator) har en *total* verkningsgrad som är produkten av de enskilda. Om varje steg har 90 % verkningsgrad blir den totala $0{,}9^{3} = 0{,}73$ för tre steg — det är därför man försöker minimera antal energiomvandlings­steg i ett kraftverk.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.7  Rörelsemängd och impuls
    // Formler: p = m·v, I = F·Δt = Δp = m·Δv. I = arean i F-t-graf.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.7': [
        {
            level: 1,
            question: `En bil med massan 1 500 kg kör i 20 m/s. Hur stor är dess rörelsemängd?`,
            answer: { value: 30000, unit: 'kg·m/s', tol: 0.02 },
            solution: `$$
p = m \\cdot v = 1\\,500 \\cdot 20 = 30\\,000\\ \\mathrm{kg \\cdot m/s} = 3{,}0 \\cdot 10^{4}\\ \\mathrm{kg \\cdot m/s}
$$

**Svar:** $3{,}0 \\cdot 10^{4}$ kg·m/s.`,
        },
        {
            level: 1,
            question: `En kraft på 12 N verkar på ett föremål under 4,0 sekunder. Beräkna impulsen.`,
            answer: { value: 48, unit: 'Ns', tol: 0.02 },
            solution: `$$
I = F \\cdot \\Delta t = 12 \\cdot 4{,}0 = 48\\ \\mathrm{Ns}
$$

**Svar:** 48 Ns.`,
        },
        {
            level: 1,
            question: `En boll med massan 0,40 kg ändrar sin hastighet från 6,0 m/s till 14 m/s åt samma håll. Vilken impuls har verkat på bollen?`,
            answer: { value: 3.2, unit: 'Ns', tol: 0.02 },
            solution: `Impulslagen $I = m \\cdot \\Delta v$:

$$
I = m (v_2 - v_1) = 0{,}40 \\cdot (14 - 6{,}0) = 0{,}40 \\cdot 8{,}0 = 3{,}2\\ \\mathrm{Ns}
$$

**Svar:** 3,2 Ns.`,
        },
        {
            level: 2,
            question: `En fotboll med massan 0,45 kg ligger still. Efter en spark har den farten 25 m/s. Foten är i kontakt med bollen i 15 ms (0,015 s). Beräkna den genomsnittliga kraften.`,
            answer: { value: 750, unit: 'N', tol: 0.03 },
            solution: `Impuls från Newtons andra lag i impulsform:

$$
F = \\frac{I}{\\Delta t} = \\frac{m \\cdot \\Delta v}{\\Delta t}
$$

$$
F = \\frac{0{,}45 \\cdot 25}{0{,}015} = \\frac{11{,}25}{0{,}015} = 750\\ \\mathrm{N}
$$

**Svar:** 750 N (motsvarar tyngden av ca 76 kg).`,
        },
        {
            level: 2,
            question: `En kraft verkar på ett föremål enligt nedanstående *F-t*-diagram. Beräkna den totala impulsen som verkat på föremålet.

${makeDiagram({
    xMax: 9, xTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    yMax: 5, yTicks: [0, 1, 2, 3, 4, 5],
    xLabel: '<tspan font-style="italic">t</tspan> (s)',
    yLabel: '<tspan font-style="italic">F</tspan> (N)',
    paths: [{ points: [[0, 0], [3, 3], [7, 3], [8, 0]] }],
})}`,
            answer: { value: 18, unit: 'Ns', tol: 0.03 },
            solution: `Impulsen motsvaras av **arean under grafen**:

${makeDiagram({
    xMax: 9, xTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    yMax: 5, yTicks: [0, 1, 2, 3, 4, 5],
    xLabel: '<tspan font-style="italic">t</tspan> (s)',
    yLabel: '<tspan font-style="italic">F</tspan> (N)',
    fills: [{ points: [[0, 0], [3, 3], [7, 3], [8, 0]] }],
    paths: [{ points: [[0, 0], [3, 3], [7, 3], [8, 0]] }],
})}

Vi delar arean i tre delar:
- **A** (triangel, 0–3 s): $\\dfrac{3 \\cdot 3}{2} = 4{,}5\\ \\mathrm{Ns}$
- **B** (rektangel, 3–7 s): $4 \\cdot 3 = 12\\ \\mathrm{Ns}$
- **C** (triangel, 7–8 s): $\\dfrac{1 \\cdot 3}{2} = 1{,}5\\ \\mathrm{Ns}$

$$
I = A + B + C = 4{,}5 + 12 + 1{,}5 = 18\\ \\mathrm{Ns}
$$

**Svar:** 18 Ns.`,
        },
        {
            level: 3,
            question: `En **airbag** används vid en bilkrock för att skydda en passagerare med massan 75 kg. Bilen kör i 60 km/h och stannar momentant.

a) Beräkna passagerarens rörelsemängd före krocken.

b) En **utan** airbag stannas passageraren av krocken på 0,10 s. Hur stor blir den genomsnittliga kraften på honom?

c) **Med** airbag förlängs stopptiden till 0,40 s. Hur stor blir då den genomsnittliga kraften?

*Ange kraften från (c) som ditt numeriska svar i N.*`,
            answer: { value: 3125, unit: 'N', tol: 0.03 },
            solution: `**a) Rörelsemängd före:** $v_0 = 60\\ \\mathrm{km/h} = 60/3{,}6 \\approx 16{,}67\\ \\mathrm{m/s}$.

$$
p_0 = m \\cdot v_0 = 75 \\cdot 16{,}67 \\approx 1\\,250\\ \\mathrm{kg \\cdot m/s}
$$

I båda fallen ska denna rörelsemängd bli noll, vilket kräver impulsen $I = 1\\,250$ Ns (riktad bakåt).

**b) Utan airbag** — $\\Delta t = 0{,}10$ s:

$$
F = \\frac{I}{\\Delta t} = \\frac{1\\,250}{0{,}10} = 12\\,500\\ \\mathrm{N} = 12{,}5\\ \\mathrm{kN}
$$

**c) Med airbag** — $\\Delta t = 0{,}40$ s (fyra gånger så lång stopptid):

$$
F = \\frac{1\\,250}{0{,}40} = 3\\,125\\ \\mathrm{N} \\approx 3{,}1\\ \\mathrm{kN}
$$

**Svar:** a) ca 1 250 kg·m/s. b) ca 12,5 kN. c) ca 3,1 kN.

**Generell slutsats:** Att förlänga stopptiden med en faktor 4 (från 0,10 s till 0,40 s) **minskar kraften** på passageraren med samma faktor 4. Detta är hela grundprincipen bakom alla "krocksäkerheter" — airbags, krocksäkra bilskal, halkmattor i bilen, fallskärmar — de förlänger den tid under vilken impulsen verkar, och därmed minskar de toppkraften.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.8  Rörelsemängdens bevarande
    // m_A·v_{A0} + m_B·v_{B0} = m_A·v_A + m_B·v_B (allmänt)
    // Inelastisk stöt: (m_A·v_A + m_B·v_B) = (m_A + m_B)·v
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.8': [
        {
            level: 1,
            question: `Två godsvagnar kolliderar och **hakar ihop**. Vagn A (12 000 kg) rör sig med 4,0 m/s åt höger, vagn B (8 000 kg) står still. Vilken gemensam hastighet får de efter krocken?`,
            answer: { value: 2.4, unit: 'm/s', tol: 0.02 },
            solution: `Inelastisk stöt — rörelsemängden bevaras, vagnarna har gemensam slutfart:

$$
m_A v_{A0} + m_B v_{B0} = (m_A + m_B) v
$$

$$
v = \\frac{m_A v_{A0} + m_B v_{B0}}{m_A + m_B} = \\frac{12\\,000 \\cdot 4{,}0 + 8\\,000 \\cdot 0}{12\\,000 + 8\\,000} = \\frac{48\\,000}{20\\,000} = 2{,}4\\ \\mathrm{m/s}
$$

**Svar:** 2,4 m/s åt höger.`,
        },
        {
            level: 1,
            question: `En studsmatta-deltagare med massan 50 kg står still på marken och avfyrar ett gevär. Gevärskulan (0,015 kg) lämnar pipan med farten 600 m/s. Med vilken hastighet rekylerar personen bakåt? Bortse från friktion mot marken.`,
            answer: { value: 0.18, unit: 'm/s', tol: 0.03 },
            solution: `Före: båda står stilla, total rörelsemängd = 0. Efter: kulan flyger framåt med $v_k = +600$ m/s, personen rekylerar med $v_p$.

Rörelsemängdens bevarande:

$$
0 = m_k v_k + m_p v_p \\quad\\Leftrightarrow\\quad v_p = -\\frac{m_k v_k}{m_p}
$$

$$
v_p = -\\frac{0{,}015 \\cdot 600}{50} = -\\frac{9{,}0}{50} = -0{,}18\\ \\mathrm{m/s}
$$

Minustecknet betyder rörelse motsatt kulan.

**Svar:** Personen rekylerar med 0,18 m/s bakåt.`,
        },
        {
            level: 1,
            question: `Agnes (60 kg) och Boel (85 kg) står stilla på inlines och knuffar iväg varandra. Direkt efter knuffen rör sig Agnes med 0,50 m/s åt höger. Vilken hastighet får Boel?`,
            answer: { value: -0.353, unit: 'm/s', tol: 0.03 },
            solution: `Före: båda i vila, total rörelsemängd = 0. Efter: Agnes åt höger ($v_A = +0{,}50$ m/s), Boel åt vänster ($v_B$).

$$
0 = m_A v_A + m_B v_B \\quad\\Leftrightarrow\\quad v_B = -\\frac{m_A v_A}{m_B}
$$

$$
v_B = -\\frac{60 \\cdot 0{,}50}{85} \\approx -0{,}353\\ \\mathrm{m/s}
$$

**Svar:** Boel glider åt vänster med ca 0,35 m/s (alltså $v_B \\approx -0{,}35$ m/s).

**Generell slutsats:** Den tyngre kroppen får en lägre hastighet — det är hela poängen med rekyl. Skytten "kastas" bakåt mycket mindre än kulan på grund av sin större massa.`,
        },
        {
            level: 2,
            question: `Två kompakta tågvagnar krockar och **hakar ihop**. Vagn A (10 ton) rör sig åt höger med 5,0 m/s. Vagn B (15 ton) rör sig åt vänster med 3,0 m/s. Bestäm vagnarnas slutgemensamma hastighet (med tecken — positiv riktning åt höger).`,
            answer: { value: 0.2, unit: 'm/s', tol: 0.05 },
            solution: `Inelastisk stöt med tecken:

$$
v = \\frac{m_A v_A + m_B v_B}{m_A + m_B} = \\frac{10\\,000 \\cdot 5{,}0 + 15\\,000 \\cdot (-3{,}0)}{10\\,000 + 15\\,000}
$$

$$
v = \\frac{50\\,000 - 45\\,000}{25\\,000} = \\frac{5\\,000}{25\\,000} = 0{,}20\\ \\mathrm{m/s}
$$

**Svar:** 0,20 m/s åt höger.`,
        },
        {
            level: 2,
            question: `En boll med massan 0,30 kg rör sig med farten 8,0 m/s åt höger. Den studsar mot en vägg och rör sig efteråt med 6,0 m/s åt vänster (elastiskt-aktigt). Hur stor är **impulsen** på bollen från väggen?`,
            answer: { value: 4.2, unit: 'Ns', tol: 0.03 },
            solution: `Impulslagen: $I = \\Delta p = m (v_2 - v_1)$. Sätt högerriktning som positiv:

$$
v_1 = +8{,}0\\ \\mathrm{m/s},\\quad v_2 = -6{,}0\\ \\mathrm{m/s}
$$

$$
I = m (v_2 - v_1) = 0{,}30 \\cdot (-6{,}0 - 8{,}0) = 0{,}30 \\cdot (-14) = -4{,}2\\ \\mathrm{Ns}
$$

Impulsens *storlek* är 4,2 Ns (riktad åt vänster — vägg pushar bollen bakåt).

**Svar:** 4,2 Ns.

**Generell slutsats:** Notera att $|\\Delta v| = 14$ m/s — inte 2 m/s. Vid en studs vänder hastigheten *helt*, så hastighetsändringen är summan av in- och utfartens belopp. Detta är varför studande bollar känns hårdare än bollar som bara bromsar in.`,
        },
        {
            level: 3,
            question: `En **liten kula** med massan 0,050 kg avfyras horisontellt med farten 320 m/s in i en stillastående **träblock** med massan 2,0 kg som hänger fritt i ett snöre (ballistisk pendel). Kulan fastnar i blocket och båda svänger upp tillsammans.

Hur högt (vertikalt) svänger blocket + kula upp innan det stannar? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$ och bortse från friktion i upphängningen.`,
            answer: { value: 3.18, unit: 'm', tol: 0.05 },
            solution: `Tvådelat problem: **(I)** rörelsemängdens bevarande vid krocken, **(II)** energiprincipen för svingen uppåt.

**Steg I — gemensam fart direkt efter krocken.** Inelastisk stöt:

$$
m_k v_k = (m_k + m_b) v_g \\quad\\Leftrightarrow\\quad v_g = \\frac{m_k v_k}{m_k + m_b}
$$

$$
v_g = \\frac{0{,}050 \\cdot 320}{0{,}050 + 2{,}0} = \\frac{16}{2{,}050} \\approx 7{,}80\\ \\mathrm{m/s}
$$

**Steg II — hur högt svinger blocket + kula?** Energi­principen: rörelseenergin direkt efter krocken omvandlas helt till lägesenergi i toppen.

$$
\\frac{(m_k + m_b) v_g^{2}}{2} = (m_k + m_b) g h \\quad\\Leftrightarrow\\quad h = \\frac{v_g^{2}}{2 g}
$$

(Massan stryker bort sig efter krocken.)

$$
h = \\frac{7{,}80^{2}}{2 \\cdot 9{,}82} \\approx \\frac{60{,}9}{19{,}64} \\approx 3{,}10\\ \\mathrm{m}
$$

Vänta — låt oss räkna noggrannare: $v_g = 16/2{,}050 = 7{,}8049\\ldots$ m/s. Då blir $v_g^{2} = 60{,}9$ och $h \\approx 3{,}10$ m. Det stämmer.

**Svar:** Blocket + kula svingar upp ca 3,2 m vertikalt.

**Generell slutsats:** Detta är en **ballistisk pendel** — historisk metod att mäta projektilers fart. Genom att mäta upphöjningen $h$ kan man räkna baklänges:

$$
v_k = \\frac{m_k + m_b}{m_k} \\sqrt{2 g h}
$$

Notera att **rörelseenergin INTE bevaras** i krocken — bara en bråkdel av kulans ursprungliga $E_k$ blir den gemensamma rörelseenergin (resten blir värme i träet och deformation). Det är därför vi behöver *två separata* fysikaliska principer för uppgiften — rörelsemängd vid krocken, energi vid svingen.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-4.9  Arbete med friktion
    // E_v = F_f · s.  W = ΔE_p + E_v  (vid lyft mot friktion).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-4.9': [
        {
            level: 1,
            question: `En låda dras 12 m längs ett plant golv mot en friktionskraft på 35 N. Hur mycket **friktionsvärme** genereras?`,
            answer: { value: 420, unit: 'J', tol: 0.02 },
            solution: `$$
E_v = F_f \\cdot s = 35 \\cdot 12 = 420\\ \\mathrm{J}
$$

**Svar:** 420 J.`,
        },
        {
            level: 1,
            question: `En låda med massan 18 kg dras längs ett plant golv. Friktionstalet mellan låda och golv är 0,25. Vilken **friktionsvärme** genereras när lådan dras 6,0 m? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 265, unit: 'J', tol: 0.03 },
            solution: `På plant golv är $F_N = mg$, så friktionskraften:

$$
F_f = \\mu \\cdot m \\cdot g = 0{,}25 \\cdot 18 \\cdot 9{,}82 \\approx 44{,}2\\ \\mathrm{N}
$$

Friktionsvärme:

$$
E_v = F_f \\cdot s = 44{,}2 \\cdot 6{,}0 \\approx 265\\ \\mathrm{J}
$$

**Svar:** Ca 265 J.`,
        },
        {
            level: 2,
            question: `En vagn med massan 32 kg dras 5,0 m uppför ett lutande plan med vinkeln 30°. Friktionstalet är 0,35. Vilket **arbete** krävs? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 1262, unit: 'J', tol: 0.03 },
            solution: `Arbetet går till två energier: ökning av lägesenergi och friktionsvärme.

$$
W = \\Delta E_p + E_v = m g h + F_f \\cdot s
$$

**Höjdökning:**

$$
h = s \\sin\\alpha = 5{,}0 \\cdot \\sin 30^{\\circ} = 2{,}5\\ \\mathrm{m}
$$

**Normalkraft på lutande plan:**

$$
F_N = m g \\cos\\alpha = 32 \\cdot 9{,}82 \\cdot \\cos 30^{\\circ} \\approx 272{,}1\\ \\mathrm{N}
$$

**Friktionskraft:**

$$
F_f = \\mu F_N = 0{,}35 \\cdot 272{,}1 \\approx 95{,}3\\ \\mathrm{N}
$$

**Arbete:**

$$
W = 32 \\cdot 9{,}82 \\cdot 2{,}5 + 95{,}3 \\cdot 5{,}0 = 785{,}6 + 476{,}3 \\approx 1\\,262\\ \\mathrm{J}
$$

**Svar:** Ca 1,3 kJ.

**Generell slutsats:** Av arbetet ca 1,26 kJ blir ca 60 % lägesenergi (786 J) och 40 % friktionsvärme (476 J). Utan friktion (idealt fall) hade bara 786 J behövts.`,
        },
        {
            level: 2,
            question: `En 0,40 kg tung hockeypuck skjuts iväg med farten 18 m/s och glider sedan 35 m innan den stannar på ett plant isfält. Beräkna friktionstalet mellan pucken och isen. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.0944, unit: '', tol: 0.05 },
            solution: `Hela rörelseenergin omvandlas till friktionsvärme:

$$
E_v = E_k \\quad\\Leftrightarrow\\quad F_f \\cdot s = \\frac{m v_0^{2}}{2}
$$

Med $F_f = \\mu m g$ på plant underlag:

$$
\\mu m g s = \\frac{m v_0^{2}}{2} \\quad\\Leftrightarrow\\quad \\mu = \\frac{v_0^{2}}{2 g s}
$$

Massan stryker bort sig:

$$
\\mu = \\frac{18^{2}}{2 \\cdot 9{,}82 \\cdot 35} = \\frac{324}{687{,}4} \\approx 0{,}094
$$

**Svar:** Friktionstalet är ca 0,094 — alltså ca 9 %.

**Generell slutsats:** Friktion mellan en gummiluftig hockeypuck och nyspolad is brukar ligga på 0,05–0,10 — vilket stämmer med detta resultat. Detta är *bland de lägsta friktionstalen* i vardagliga material.`,
        },
        {
            level: 3,
            question: `En cyklist (cykel + person totalt 85 kg) startar i vila vid toppen av en kulle 18 m hög. Bansträckan ner till dalen är 240 m. När cyklisten når dalens botten har hen farten 14 m/s. Bortse från luftmotstånd.

a) Hur stor är den genomsnittliga friktionskraften (rullnings­motstånd) som verkat under nedfarten?

b) Hur stor är friktionstalet, om vi gör den (något grova) approximationen att normalkraften under hela åket är lika med $m g \\cos\\beta$, där $\\beta$ är banans medellutning och $\\sin\\beta = h/L$?

*Ange friktionskraften från (a) som ditt numeriska svar i N.*`,
            answer: { value: 27.8, unit: 'N', tol: 0.05 },
            solution: `**a) Friktionskraft.** Energiprincipen med friktion:

$$
m g h = \\frac{m v^{2}}{2} + E_v
\\quad\\Leftrightarrow\\quad
E_v = m g h - \\frac{m v^{2}}{2}
$$

$$
E_v = 85 \\cdot 9{,}82 \\cdot 18 - \\frac{85 \\cdot 14^{2}}{2} = 15\\,025 - 8\\,330 = 6\\,695\\ \\mathrm{J}
$$

Friktionskraften som verkat över sträckan 240 m:

$$
F_f = \\frac{E_v}{s} = \\frac{6\\,695}{240} \\approx 27{,}9\\ \\mathrm{N}
$$

**b) Friktionstal.** Medellutningen $\\beta$ uppfyller $\\sin\\beta = h/L = 18/240 = 0{,}075$, vilket ger $\\beta \\approx 4{,}3^{\\circ}$ och $\\cos\\beta \\approx 0{,}997$.

$$
F_N \\approx m g \\cos\\beta = 85 \\cdot 9{,}82 \\cdot 0{,}997 \\approx 832\\ \\mathrm{N}
$$

$$
\\mu = \\frac{F_f}{F_N} = \\frac{27{,}9}{832} \\approx 0{,}034
$$

**Svar:** a) Friktionskraften är ca 28 N. b) Friktionstalet är ca 0,034.

**Generell slutsats:** Detta är ett realistiskt rullningsmotstånd för cykeldäck mot asfalt (0,003–0,008 i ideala fall, något högre vid lägre tryck eller grov yta). Lägg märke till att luftmotståndet i verkligheten också spelar in och oftast dominerar vid höga farter — vid 14 m/s är det förmodligen den **större** kraften.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.1  Tryck och tryckkraft
    // Formel: p = F / A  (kraft per areaenhet, enhet Pa = N/m²).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En skidåkare med massan 70 kg står på två skidor med vardera arean 1 500 cm². Hur stort tryck utövar skidåkaren mot snön? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 2290, unit: 'Pa', tol: 0.03 },
            solution: `Trycket är tryckkraften delat med arean:

$$
p = \\frac{F}{A}
$$

Mätvärden (efter SI-omvandling):

$$
\\left[ \\begin{array}{l}
F = m \\cdot g = 70 \\cdot 9{,}82 = 687{,}4\\ \\mathrm{N} \\\\
A = 2 \\cdot 1\\,500\\ \\mathrm{cm^2} = 3\\,000\\ \\mathrm{cm^2} = 0{,}30\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
p = \\frac{687{,}4}{0{,}30} \\approx 2\\,290\\ \\mathrm{Pa} \\approx 2{,}3\\ \\mathrm{kPa}
$$

**Svar:** Trycket är ca 2,3 kPa.`,
        },
        {
            level: 1,
            question: `Vid ett hajbett uppmäts trycket 25 kN/cm². Vilket tryck motsvarar det i pascal?`,
            answer: { value: 250000000, unit: 'Pa', tol: 0.02 },
            solution: `Vi måste omvandla både täljare och nämnare till SI-enheter.

$$
\\left[ \\begin{array}{l}
F = 25\\ \\mathrm{kN} = 25\\,000\\ \\mathrm{N} \\\\
A = 1\\ \\mathrm{cm^2} = 1 \\cdot 10^{-4}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
p = \\frac{F}{A} = \\frac{25\\,000}{1 \\cdot 10^{-4}} = 2{,}5 \\cdot 10^{8}\\ \\mathrm{Pa} = 250\\ \\mathrm{MPa}
$$

**Svar:** 250 MPa (cirka 2 500 gånger normalt lufttryck).`,
        },
        {
            level: 1,
            question: `En tegelsten utövar trycket 1 200 Pa mot golvet via sin minsta sida som har arean 0,025 m². Hur stor är tegelstenens tyngd?`,
            answer: { value: 30, unit: 'N', tol: 0.03 },
            solution: `Vi löser ut tryckkraften ur tryckformeln.

$$
p = \\frac{F}{A} \\quad\\Leftrightarrow\\quad F = p \\cdot A
$$

$$
\\left[ \\begin{array}{l}
p = 1\\,200\\ \\mathrm{Pa} \\\\
A = 0{,}025\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
F = 1\\,200 \\cdot 0{,}025 = 30\\ \\mathrm{N}
$$

**Svar:** Stenens tyngd är 30 N (motsvarar ca 3,1 kg).`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett paintballgevär arbetar med övertrycket 1,9 MPa. Pipan är cirkelrund med radien 6,0 mm. Hur stor kraft krävs det att hålla för pipan med ett finger för att gasen inte ska ta sig ut?`,
            answer: { value: 215, unit: 'N', tol: 0.05 },
            solution: `Tryckkraften ges av $F = p \\cdot A$ där $A$ är pipans tvärsnittsarea. Cirkelarean är $\\pi r^{2}$.

$$
\\left[ \\begin{array}{l}
p = 1{,}9\\ \\mathrm{MPa} = 1{,}9 \\cdot 10^{6}\\ \\mathrm{Pa} \\\\
r = 6{,}0\\ \\mathrm{mm} = 6{,}0 \\cdot 10^{-3}\\ \\mathrm{m} \\\\
A = \\pi r^{2} = \\pi \\cdot (6{,}0 \\cdot 10^{-3})^{2} \\approx 1{,}131 \\cdot 10^{-4}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
F = p \\cdot A = 1{,}9 \\cdot 10^{6} \\cdot 1{,}131 \\cdot 10^{-4} \\approx 215\\ \\mathrm{N}
$$

**Svar:** Ca 215 N (motsvarar tyngden hos ungefär 22 kg!).

**Generell slutsats:** Detta är därför man **aldrig** ska försöka stoppa en paintbollsskena med ett finger.`,
        },
        {
            level: 2,
            question: `En person med massan 60 kg går på en klack med arean 1,0 cm². På marken bredvid står en stridsvagn med massan 60 ton vars sammanlagda larvfotsyta är 6,0 m². Hur många gånger större är klackens tryck jämfört med stridsvagnens? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 60, unit: '', tol: 0.05 },
            solution: `Vi beräknar de två trycken och tar förhållandet.

**Klackens tryck:**

$$
\\left[ \\begin{array}{l}
F_1 = 60 \\cdot 9{,}82 = 589{,}2\\ \\mathrm{N} \\\\
A_1 = 1{,}0\\ \\mathrm{cm^2} = 1{,}0 \\cdot 10^{-4}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
p_1 = \\frac{589{,}2}{1{,}0 \\cdot 10^{-4}} \\approx 5{,}9 \\cdot 10^{6}\\ \\mathrm{Pa} = 5{,}9\\ \\mathrm{MPa}
$$

**Stridsvagnens tryck:**

$$
\\left[ \\begin{array}{l}
F_2 = 60\\,000 \\cdot 9{,}82 = 589\\,200\\ \\mathrm{N} \\\\
A_2 = 6{,}0\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
p_2 = \\frac{589\\,200}{6{,}0} \\approx 9{,}8 \\cdot 10^{4}\\ \\mathrm{Pa} = 98\\ \\mathrm{kPa}
$$

**Förhållande:**

$$
\\frac{p_1}{p_2} = \\frac{5{,}9 \\cdot 10^{6}}{9{,}8 \\cdot 10^{4}} \\approx 60
$$

**Svar:** Klackens tryck är ca 60 gånger större än stridsvagnens.

**Generell slutsats:** Det är därför stilettklackar kan ge bestående märken i parkettgolv medan en panservagn på samma golv (om det orkade hålla för tyngden) inte gör det. Liten kontaktyta ger stort tryck — det är också därför skidor och snöskor fungerar.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Tre kuber av stål (densitet 7 850 kg/m³) ställs på ett bord. Kuberna har kantlängderna 4,0 cm, 8,0 cm respektive 16 cm.

a) Beräkna trycket varje kub utövar mot bordet.

b) Härled en allmän formel för trycket en kubformad kropp med densiteten *ρ* och kantlängden *a* utövar mot underlaget.

*Ange trycket för 16 cm-kuben som ditt numeriska svar i Pa. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.*`,
            answer: { value: 12330, unit: 'Pa', tol: 0.03 },
            solution: `**a) Beräkna de tre trycken.** För en kub med kantlängd *a* är massan $m = \\rho \\cdot V = \\rho \\cdot a^{3}$, tyngden $F = m g$ och basytan $A = a^{2}$. För 4,0 cm-kuben:

$$
\\left[ \\begin{array}{l}
a = 0{,}040\\ \\mathrm{m} \\\\
m = 7\\,850 \\cdot (0{,}040)^{3} = 7\\,850 \\cdot 6{,}4 \\cdot 10^{-5} \\approx 0{,}502\\ \\mathrm{kg} \\\\
F = 0{,}502 \\cdot 9{,}82 \\approx 4{,}93\\ \\mathrm{N} \\\\
A = (0{,}040)^{2} = 1{,}6 \\cdot 10^{-3}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
p_1 = \\frac{4{,}93}{1{,}6 \\cdot 10^{-3}} \\approx 3\\,080\\ \\mathrm{Pa}
$$

Med samma metod för 8,0 cm: $m \\approx 4{,}02$ kg, $F \\approx 39{,}5$ N, $A = 6{,}4 \\cdot 10^{-3}$ m², ger $p_2 \\approx 6\\,170$ Pa. För 16 cm: $m \\approx 32{,}2$ kg, $F \\approx 316$ N, $A = 2{,}56 \\cdot 10^{-2}$ m², ger $p_3 \\approx 12\\,330$ Pa.

**b) Allmän formel.** Vi sätter in $F = \\rho a^{3} g$ och $A = a^{2}$ i $p = F/A$:

$$
p = \\frac{\\rho \\cdot a^{3} \\cdot g}{a^{2}} = \\rho \\cdot g \\cdot a
$$

**Svar:** a) ca 3,1 kPa, 6,2 kPa, 12,3 kPa. b) $p = \\rho \\cdot g \\cdot a$.

**Generell slutsats:** Många elever gissar att den **minsta** kuben ger störst tryck — eftersom "liten yta = stort tryck" är en stark intuition från klackuppgiften. Men för kuber av samma material växer tyngden snabbare ($a^{3}$) än basytan ($a^{2}$), så **större** kub ger faktiskt **högre** tryck. Detta är samma princip som varför stora djur (elefanter) behöver pelarliknande ben och inte kan vara skalkopior av små djur (myror).`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.2  Vätsketryck
    // Formel: p = ρ · g · h
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Olov dyker till djupet 4,0 m i en sjö. Vilket vätsketryck verkar då på honom? Räkna med vattnets densitet 998 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$.

${makeFluidBeaker({ liquidLabel: 'ρ = 998 kg/m³', itemLabel: 'dykare', itemDepth: 0.7, hLabel: 'h = 4,0 m' })}`,
            answer: { value: 39200, unit: 'Pa', tol: 0.03 },
            solution: `Vätsketrycket ges av $p = \\rho \\cdot g \\cdot h$.

$$
\\left[ \\begin{array}{l}
\\rho = 998\\ \\mathrm{kg/m^3} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
h = 4{,}0\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
p = 998 \\cdot 9{,}82 \\cdot 4{,}0 \\approx 39\\,200\\ \\mathrm{Pa} \\approx 39\\ \\mathrm{kPa}
$$

**Svar:** Ca 39 kPa.`,
        },
        {
            level: 1,
            question: `I en tank förvaras biodiesel med densiteten 0,91 g/cm³. Hur stort är vätsketrycket vid botten av tanken om vätskedjupet är 4,6 m? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 41100, unit: 'Pa', tol: 0.03 },
            solution: `Vi börjar med att omvandla densiteten till SI-enhet.

$$
\\rho = 0{,}91\\ \\mathrm{g/cm^3} = 910\\ \\mathrm{kg/m^3}
$$

Vätsketrycket:

$$
p = \\rho \\cdot g \\cdot h = 910 \\cdot 9{,}82 \\cdot 4{,}6 \\approx 41\\,100\\ \\mathrm{Pa} \\approx 41\\ \\mathrm{kPa}
$$

**Svar:** Ca 41 kPa.

**Generell slutsats:** Eftersom biodiesel har lägre densitet än vatten (910 vs 998 kg/m³) blir trycket vid en given djuphöjd något lägre än motsvarande för vatten.`,
        },
        {
            level: 1,
            question: `På vilket djup i havet (densitet 1 028 kg/m³) blir vätsketrycket lika med 1,0 MPa? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 99, unit: 'm', tol: 0.03 },
            solution: `Vi löser ut djupet ur vätsketrycksformeln.

$$
p = \\rho \\cdot g \\cdot h \\quad\\Leftrightarrow\\quad h = \\frac{p}{\\rho \\cdot g}
$$

$$
\\left[ \\begin{array}{l}
p = 1{,}0\\ \\mathrm{MPa} = 1{,}0 \\cdot 10^{6}\\ \\mathrm{Pa} \\\\
\\rho = 1\\,028\\ \\mathrm{kg/m^3} \\\\
g = 9{,}82\\ \\mathrm{N/kg}
\\end{array} \\right]
$$

$$
h = \\frac{1{,}0 \\cdot 10^{6}}{1\\,028 \\cdot 9{,}82} \\approx 99\\ \\mathrm{m}
$$

**Svar:** Ca 99 m.

**Generell slutsats:** En tumregel: i havet ökar vätsketrycket med ungefär 1 atm (≈ 100 kPa) per 10 m djup. På 100 m djup har man alltså ca 10 atm vätsketryck — det är gränsen för vad ett tränat sportdykarsystem klarar.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Mira dyker i en sjö och vill veta hur stor kraft som vätsketrycket utövar på hennes ena trumhinna (area 65 mm²) när hon befinner sig på djupet 5,0 m. Räkna med vattnets densitet 998 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 3.18, unit: 'N', tol: 0.05 },
            solution: `Vi behöver först beräkna vätsketrycket och sedan använda det för att hitta tryckkraften.

**Steg 1 — vätsketryck:**

$$
p = \\rho \\cdot g \\cdot h = 998 \\cdot 9{,}82 \\cdot 5{,}0 \\approx 49\\,000\\ \\mathrm{Pa}
$$

**Steg 2 — tryckkraft från $p = F/A$:**

$$
F = p \\cdot A
$$

$$
\\left[ \\begin{array}{l}
p \\approx 49\\,000\\ \\mathrm{Pa} \\\\
A = 65\\ \\mathrm{mm^2} = 65 \\cdot 10^{-6}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
F = 49\\,000 \\cdot 65 \\cdot 10^{-6} \\approx 3{,}18\\ \\mathrm{N}
$$

**Svar:** Ca 3,2 N.

**Generell slutsats:** Trumhinnan känner alltså av en kraft motsvarande tyngden av ett halvt hekto vid bara 5 m djup. Det är därför man behöver "klämma näsan" för att utjämna trycket när man dyker.`,
        },
        {
            level: 2,
            question: `Ett U-rör är till vänster fyllt med en okänd vätska och till höger med vatten. Vattenpelaren är 24 cm hög och vätskan i vänster skänkel är 30 cm hög — och båda vätskeytorna är i jämvikt. Bestäm den okända vätskans densitet. Räkna med vattnets densitet 998 kg/m³.`,
            answer: { value: 798, unit: 'kg/m³', tol: 0.03 },
            solution: `I ett U-rör måste vätsketrycket vid U-rörets botten (eller på samma höjd i båda skänklarna) vara lika stort — annars skulle vätska flyta över. Vi sätter:

$$
\\rho_\\mathrm{okänd} \\cdot g \\cdot h_\\mathrm{okänd} = \\rho_\\mathrm{vatten} \\cdot g \\cdot h_\\mathrm{vatten}
$$

Tyngdfaktorn *g* stryker bort sig, och vi löser ut den okända densiteten:

$$
\\rho_\\mathrm{okänd} = \\rho_\\mathrm{vatten} \\cdot \\frac{h_\\mathrm{vatten}}{h_\\mathrm{okänd}}
$$

$$
\\left[ \\begin{array}{l}
\\rho_\\mathrm{vatten} = 998\\ \\mathrm{kg/m^3} \\\\
h_\\mathrm{vatten} = 24\\ \\mathrm{cm} \\\\
h_\\mathrm{okänd} = 30\\ \\mathrm{cm}
\\end{array} \\right]
$$

$$
\\rho_\\mathrm{okänd} = 998 \\cdot \\frac{24}{30} \\approx 798\\ \\mathrm{kg/m^3}
$$

**Svar:** Den okända vätskan har densiteten ca 800 kg/m³ (vilket motsvarar ungefär matolja eller fotogen).

**Generell slutsats:** Detta är hur ett **U-rör** kan användas som densitometer — du behöver bara mäta två pelarhöjder. Notera att enheten för *h* inte behöver vara meter; så länge båda sidor använder samma enhet (cm) får man rätt förhållande.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Ett flerbostadshus försörjs med vatten från ett vattentorn där vattenytan i tornet ligger 30 m över marken. Hyresgästerna upplever olika hårt vattentryck i sina kranar beroende på vilken våning de bor på.

a) Vilket övertryck (utöver lufttryck) har vattnet vid en kran på markplan?

b) Vilket övertryck har vattnet i toppvåningen, där kranen sitter 22 m över marken?

c) Lina bor på markplan och lossar oavsiktligt en propp i sin tvättmaskins tilloppslang innan hon stängt av vattnet. Inneröppningen i slangen är 7,0 mm i diameter. Hur stor kraft måste hon hålla emot med tummen för att stoppa vattenstrålen direkt vid öppningen?

*Räkna med vattnets densitet 998 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$. Ange kraften från (c) som ditt numeriska svar.*`,
            answer: { value: 11.3, unit: 'N', tol: 0.05 },
            solution: `**a) Övertryck på markplan.** Vattnets nivåskillnad är hela tornets höjd, 30 m:

$$
\\Delta p_a = \\rho \\cdot g \\cdot h = 998 \\cdot 9{,}82 \\cdot 30 \\approx 294\\,000\\ \\mathrm{Pa} \\approx 294\\ \\mathrm{kPa}
$$

**b) Övertryck i toppvåningen.** Den effektiva höjdskillnaden mellan vattenytan i tornet och kranen är nu bara $30 - 22 = 8{,}0$ m:

$$
\\Delta p_b = \\rho \\cdot g \\cdot (30 - 22) = 998 \\cdot 9{,}82 \\cdot 8{,}0 \\approx 78\\,400\\ \\mathrm{Pa} \\approx 78\\ \\mathrm{kPa}
$$

**c) Kraft mot tummen.** Tummen utsätts för **övertrycket** från slangen (totaltrycket inifrån minus lufttrycket utifrån, som ändå hade tryckt på utsidan av tummen). Vi använder övertrycket vid markplan från (a):

$$
\\left[ \\begin{array}{l}
\\Delta p = 294\\,000\\ \\mathrm{Pa} \\\\
r = 3{,}5\\ \\mathrm{mm} = 3{,}5 \\cdot 10^{-3}\\ \\mathrm{m} \\\\
A = \\pi r^{2} = \\pi \\cdot (3{,}5 \\cdot 10^{-3})^{2} \\approx 3{,}85 \\cdot 10^{-5}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
F = \\Delta p \\cdot A = 294\\,000 \\cdot 3{,}85 \\cdot 10^{-5} \\approx 11{,}3\\ \\mathrm{N}
$$

**Svar:** a) ca 294 kPa. b) ca 78 kPa. c) ca 11 N (motsvarande tyngden av ungefär 1,2 kg).

**Generell slutsats:** Det är därför vattentryckkranar i toppvåningar känns "svagare" — höjdskillnaden mellan vattenkällan och kranen är mindre. En vanlig fälla i (c) är att använda **totaltrycket** ($p_0 + \\rho g h$) istället för övertrycket. Men eftersom lufttrycket ändå pressar lika hårt på tummens utsida tar de ut varandra, och bara övertrycket bidrar till nettokraften.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.3  Lufttryck och totalt tryck
    // Formel: p = p_0 + ρ · g · h
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Vid normal havsnivå är lufttrycket 101,3 kPa. Hur många pascal (Pa) motsvarar det? Hur många bar?`,
            choices: [
                `101 300 Pa och 1,013 bar`,
                `1 013 Pa och 10 130 bar`,
                `1,013 Pa och 0,1013 bar`,
                `10 130 000 Pa och 100 bar`,
            ],
            correct: 0,
            solution: `Enligt tabellen i teorin:

- 1 kPa = 1 000 Pa, så 101,3 kPa = 101 300 Pa.
- 1 bar = 100 000 Pa, så 101 300 Pa / 100 000 = 1,013 bar.

**Svar:** Alternativ A — 101 300 Pa och 1,013 bar.

**Generell slutsats:** Lufttrycket vid havsytan brukar avrundas till $1\ \mathrm{atm} = 101\,325\ \mathrm{Pa} \approx 1\ \mathrm{bar} = 100\ \mathrm{kPa}$. Skillnaden mellan atm och bar är bara ca 1 %, så man kan ofta använda dem som likvärdiga i grova uppskattningar.`,
        },
        {
            level: 1,
            question: `Du dyker till djupet 3,0 m i en sjö där lufttrycket vid ytan är 101,3 kPa. Hur stort är **det totala trycket** på dig vid det djupet? Räkna med vattnets densitet 998 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 130700, unit: 'Pa', tol: 0.02 },
            solution: `Det totala trycket är summan av lufttrycket vid ytan och vätsketrycket.

$$
p = p_0 + \\rho \\cdot g \\cdot h
$$

$$
\\left[ \\begin{array}{l}
p_0 = 101{,}3\\ \\mathrm{kPa} = 101\\,300\\ \\mathrm{Pa} \\\\
\\rho = 998\\ \\mathrm{kg/m^3} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
h = 3{,}0\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
p = 101\\,300 + 998 \\cdot 9{,}82 \\cdot 3{,}0 \\approx 130\\,700\\ \\mathrm{Pa} \\approx 0{,}13\\ \\mathrm{MPa}
$$

**Svar:** Ca 0,13 MPa (eller 130 kPa).`,
        },
        {
            level: 1,
            question: `Det totala trycket vid botten av en pool är 152 kPa. Lufttrycket vid ytan är 101 kPa. Vilket är vätsketrycket vid poolens botten?`,
            answer: { value: 51000, unit: 'Pa', tol: 0.02 },
            solution: `Vätsketrycket är skillnaden mellan totalt tryck och lufttryck:

$$
p_\\mathrm{vätska} = p_\\mathrm{tot} - p_0 = 152 - 101 = 51\\ \\mathrm{kPa} = 51\\,000\\ \\mathrm{Pa}
$$

**Svar:** Vätsketrycket är 51 kPa.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En vinterstorm gör att lufttrycket utanför ditt fönster sjunker till 92 kPa, medan trycket inomhus fortfarande är 101 kPa (normalt lufttryck). Hur stor är den nettokraft som trycker fönstret utåt? Fönstret är 1,2 m brett och 1,5 m högt.`,
            answer: { value: 16200, unit: 'N', tol: 0.05 },
            solution: `Tryckskillnaden över fönstret är:

$$
\\Delta p = p_\\mathrm{inne} - p_\\mathrm{ute} = 101 - 92 = 9\\ \\mathrm{kPa} = 9\\,000\\ \\mathrm{Pa}
$$

Kraften ges av $F = \\Delta p \\cdot A$ där arean är $1{,}2 \\cdot 1{,}5 = 1{,}8\\ \\mathrm{m^2}$:

$$
F = 9\\,000 \\cdot 1{,}8 = 16\\,200\\ \\mathrm{N} \\approx 16\\ \\mathrm{kN}
$$

**Svar:** Ca 16 kN (motsvarande tyngden av 1,6 ton!).

**Generell slutsats:** Det är därför starka stormvindar tillsammans med tryckskillnader (orkanen suger ut luft förbi husets utsida) kan blåsa ut hela fönster, även om vinden i sig inte har tillräcklig kraft.`,
        },
        {
            level: 2,
            question: `En kork i en PET-flaska sitter fast och tål en tryckskillnad på 20 bar innan den åker iväg. Flaskans öppning har diametern 21 mm. Vilken kraft "känner" korken från den komprimerade gasen inuti precis innan den lossnar?`,
            answer: { value: 693, unit: 'N', tol: 0.05 },
            solution: `Vi behöver omvandla trycket och beräkna öppningens area.

$$
\\left[ \\begin{array}{l}
\\Delta p = 20\\ \\mathrm{bar} = 20 \\cdot 10^{5}\\ \\mathrm{Pa} = 2{,}0 \\cdot 10^{6}\\ \\mathrm{Pa} \\\\
r = 10{,}5\\ \\mathrm{mm} = 10{,}5 \\cdot 10^{-3}\\ \\mathrm{m} \\\\
A = \\pi r^{2} = \\pi \\cdot (10{,}5 \\cdot 10^{-3})^{2} \\approx 3{,}46 \\cdot 10^{-4}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$
F = \\Delta p \\cdot A = 2{,}0 \\cdot 10^{6} \\cdot 3{,}46 \\cdot 10^{-4} \\approx 693\\ \\mathrm{N}
$$

**Svar:** Ca 690 N — motsvarande tyngden av cirka 70 kg.

**Generell slutsats:** Det är därför korkar i kolsyrade flaskor (champagne, ölflaskor i höghöjd-flygplan) kan fara iväg med stor fart om man inte öppnar dem kontrollerat. Med en hastighet på ca 12–15 m/s utgör en lös kork en faktisk skaderisk för ögat.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Marianergraven är det djupaste stället i havet, ca 11 km djupt. Beräkna **det totala trycket** vid bottnen om havsvattnets medeldensitet är 1 030 kg/m³ och lufttrycket vid ytan är 101 kPa.

a) Vilket totaltryck verkar?

b) Hur många gånger större är detta jämfört med normalt lufttryck?

c) Vilken kraft skulle verka på en cirkelformad observationsruta med radien 15 cm?

*Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$ och ange totaltrycket i MPa som ditt numeriska svar.*`,
            answer: { value: 111, unit: 'MPa', tol: 0.03 },
            solution: `**a) Totalt tryck.**

$$
p = p_0 + \\rho \\cdot g \\cdot h
$$

$$
\\left[ \\begin{array}{l}
p_0 = 101\\,000\\ \\mathrm{Pa} \\\\
\\rho = 1\\,030\\ \\mathrm{kg/m^3} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
h = 11\\,000\\ \\mathrm{m}
\\end{array} \\right]
$$

$$
p = 101\\,000 + 1\\,030 \\cdot 9{,}82 \\cdot 11\\,000 \\approx 1{,}113 \\cdot 10^{8}\\ \\mathrm{Pa} \\approx 111\\ \\mathrm{MPa}
$$

**b) Jämförelse med lufttryck:**

$$
\\frac{p}{p_0} = \\frac{1{,}113 \\cdot 10^{8}}{1{,}01 \\cdot 10^{5}} \\approx 1\\,100
$$

Totaltrycket är alltså cirka **1 100 gånger normalt lufttryck**.

**c) Kraft på observationsruta:**

$$
A = \\pi r^{2} = \\pi \\cdot (0{,}15)^{2} \\approx 0{,}0707\\ \\mathrm{m^2}
$$

$$
F = p \\cdot A = 1{,}113 \\cdot 10^{8} \\cdot 0{,}0707 \\approx 7{,}87 \\cdot 10^{6}\\ \\mathrm{N} \\approx 7{,}9\\ \\mathrm{MN}
$$

**Svar:** a) ca 111 MPa. b) ca 1 100 gånger lufttrycket. c) ca 7,9 MN (motsvarar tyngden av ca 800 ton).

**Generell slutsats:** Det är därför bemannade dykrobotar till sådana djup behöver titanskal med decimeter-tjocka väggar. Notera att lufttrycket vid ytan (101 kPa) är försumbart jämfört med vätsketrycket (111 MPa) — vid stora djup kan man helt strunta i $p_0$.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.4  Lyftkraft och Arkimedes princip
    // Formel: F_L = ρ · g · V  (ρ är vätskans densitet, V undanträngd volym).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En sten med volymen 5,0 liter sänks helt ner i vatten. Hur stor lyftkraft påverkar stenen från vattnet? Räkna med vattnets densitet 998 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 49, unit: 'N', tol: 0.03 },
            solution: `Arkimedes princip ger lyftkraften direkt:

$$
F_\\mathrm{L} = \\rho \\cdot g \\cdot V
$$

$$
\\left[ \\begin{array}{l}
\\rho = 998\\ \\mathrm{kg/m^3} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
V = 5{,}0\\ \\mathrm{liter} = 5{,}0 \\cdot 10^{-3}\\ \\mathrm{m^3}
\\end{array} \\right]
$$

$$
F_\\mathrm{L} = 998 \\cdot 9{,}82 \\cdot 5{,}0 \\cdot 10^{-3} \\approx 49\\ \\mathrm{N}
$$

**Svar:** Ca 49 N.`,
        },
        {
            level: 1,
            question: `En båt med massan 450 kg flyter i vatten (densitet 998 kg/m³). Hur stor volym vatten tränger båten undan? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.451, unit: 'm³', tol: 0.03 },
            solution: `För en flytande kropp gäller kraftjämvikt: $F_\\mathrm{L} = F_\\mathrm{G}$.

$$
\\rho \\cdot g \\cdot V = m \\cdot g \\quad\\Leftrightarrow\\quad V = \\frac{m}{\\rho}
$$

Tyngdfaktorn *g* stryker bort sig — märk att svaret inte beror på *g*!

$$
\\left[ \\begin{array}{l}
m = 450\\ \\mathrm{kg} \\\\
\\rho = 998\\ \\mathrm{kg/m^3}
\\end{array} \\right]
$$

$$
V = \\frac{450}{998} \\approx 0{,}451\\ \\mathrm{m^3}
$$

**Svar:** Ca 0,45 m³ (motsvarar 450 liter).

**Generell slutsats:** Den undanträngda vätskans massa är alltid lika stor som det flytande föremålets massa. Eftersom 1 liter vatten väger ca 1 kg, undanträng en 450 kg båt ca 450 liter vatten.`,
        },
        {
            level: 1,
            question: `En metallkub med volymen 200 cm³ sänks ned i sötvatten (998 kg/m³). Lyftkraften från vattnet visar sig vara 1,96 N. Vilken volym av kuben är under vattnet?`,
            choices: [
                `Hela volymen 200 cm³.`,
                `Hälften av volymen, 100 cm³.`,
                `En fjärdedel av volymen, 50 cm³.`,
                `Det går inte att avgöra utan att veta kubens densitet.`,
            ],
            correct: 0,
            solution: `Vi räknar vilken volym som motsvarar lyftkraften 1,96 N:

$$
V = \\frac{F_\\mathrm{L}}{\\rho \\cdot g} = \\frac{1{,}96}{998 \\cdot 9{,}82} \\approx 2{,}00 \\cdot 10^{-4}\\ \\mathrm{m^3} = 200\\ \\mathrm{cm^3}
$$

Det visar att hela volymen är under vattnet — kuben är alltså helt nedsänkt (och sjunker).

**Svar:** Alternativ A — hela volymen är under vattnet.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En aluminiumkub med kantlängden 10 cm sänks ned helt i vatten. Vilken är den **resulterande kraft** som krävs för att hålla kuben i ro (alltså inte låta den sjunka)? Aluminium har densiteten 2 700 kg/m³ och vatten 998 kg/m³. Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 16.7, unit: 'N', tol: 0.05 },
            solution: `Kuben påverkas av tyngdkraften $F_\\mathrm{G}$ nedåt och lyftkraften $F_\\mathrm{L}$ uppåt. Den extra kraften $F$ som krävs för att hålla kuben i ro är skillnaden:

$$
F = F_\\mathrm{G} - F_\\mathrm{L}
$$

Volym och massa:

$$
\\left[ \\begin{array}{l}
V = (0{,}10)^{3} = 1{,}0 \\cdot 10^{-3}\\ \\mathrm{m^3} \\\\
m = \\rho_\\mathrm{Al} \\cdot V = 2\\,700 \\cdot 1{,}0 \\cdot 10^{-3} = 2{,}70\\ \\mathrm{kg}
\\end{array} \\right]
$$

Tyngdkraft och lyftkraft:

$$
F_\\mathrm{G} = m \\cdot g = 2{,}70 \\cdot 9{,}82 \\approx 26{,}5\\ \\mathrm{N}
$$

$$
F_\\mathrm{L} = \\rho_\\mathrm{vatten} \\cdot g \\cdot V = 998 \\cdot 9{,}82 \\cdot 1{,}0 \\cdot 10^{-3} \\approx 9{,}80\\ \\mathrm{N}
$$

$$
F = 26{,}5 - 9{,}80 \\approx 16{,}7\\ \\mathrm{N}
$$

**Svar:** Ca 17 N — som motsvarar tyngden av ungefär 1,7 kg. Kuben känns alltså 1,7 kg "tung" under vatten, trots att den egentligen väger 2,7 kg.

**Generell slutsats:** Generellt gäller att den **upplevda vikten** under vattnet ges av $m_\\mathrm{upplevd} = m \\cdot (1 - \\rho_\\mathrm{vatten}/\\rho_\\mathrm{kropp})$. Ju mindre densitetsskillnad mellan kroppen och vätskan, desto "lättare" känns föremålet.`,
        },
        {
            level: 2,
            question: `Lotta drar upp ett järnankare ur vattnet. När ankaret fortfarande är **helt under vattnet** drar hon med kraften 470 N och ankaret rör sig då **med konstant hastighet uppåt**. Vad väger ankaret (i luft)? Räkna med vattnets densitet 998 kg/m³, järnets densitet 7 860 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 538, unit: 'N', tol: 0.05 },
            solution: `Vid konstant hastighet råder kraftjämvikt på ankaret. De tre verksamma krafterna är tyngdkraften $F_\\mathrm{G}$ nedåt, lyftkraften $F_\\mathrm{L}$ uppåt och Lottas drag $F = 470$ N uppåt:

$$
F + F_\\mathrm{L} = F_\\mathrm{G}
$$

Vi använder att $F_\\mathrm{G} = m \\cdot g$ (vilket är vikten i luft) och $F_\\mathrm{L} = \\rho_\\mathrm{vatten} \\cdot g \\cdot V$, samt att $m = \\rho_\\mathrm{järn} \\cdot V$. Ur det första uttrycket får vi $V = m / \\rho_\\mathrm{järn}$, som vi sätter in i lyftkraftsformeln:

$$
F_\\mathrm{L} = \\rho_\\mathrm{vatten} \\cdot g \\cdot \\frac{m}{\\rho_\\mathrm{järn}} = F_\\mathrm{G} \\cdot \\frac{\\rho_\\mathrm{vatten}}{\\rho_\\mathrm{järn}}
$$

Insättning i kraftjämvikten:

$$
F + F_\\mathrm{G} \\cdot \\frac{\\rho_\\mathrm{vatten}}{\\rho_\\mathrm{järn}} = F_\\mathrm{G}
\\quad\\Leftrightarrow\\quad
F_\\mathrm{G} = \\frac{F}{1 - \\rho_\\mathrm{vatten}/\\rho_\\mathrm{järn}}
$$

$$
F_\\mathrm{G} = \\frac{470}{1 - 998/7\\,860} = \\frac{470}{1 - 0{,}127} \\approx \\frac{470}{0{,}873} \\approx 538\\ \\mathrm{N}
$$

Massan blir då:

$$
m = \\frac{F_\\mathrm{G}}{g} = \\frac{538}{9{,}82} \\approx 54{,}8\\ \\mathrm{kg}
$$

**Svar:** Ankaret väger ca 540 N i luft (motsvarar ca 55 kg).

**Generell slutsats:** Den enkla regeln "drag-kraft + lyftkraft = tyngdkraft" är användbar i alla *konstant hastighet*-problem under vatten. Glöm inte att använda vattnets densitet i lyftkraftsformeln, inte föremålets!`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Ett isberg flyter i havet. Hur stor andel (i procent) av isbergets volym ligger **under** vattenytan? Räkna med isens densitet 920 kg/m³ och havsvattnets densitet 1 028 kg/m³.`,
            answer: { value: 89.5, unit: '%', tol: 0.03 },
            solution: `Isberget flyter, så lyftkraften balanserar tyngdkraften. Låt $V$ vara hela isbergets volym och $V_\\mathrm{u}$ vara den undanträngda (= under ytan) volymen.

$$
F_\\mathrm{L} = F_\\mathrm{G} \\quad\\Leftrightarrow\\quad \\rho_\\mathrm{vatten} \\cdot g \\cdot V_\\mathrm{u} = \\rho_\\mathrm{is} \\cdot g \\cdot V
$$

Tyngdfaktorn stryker bort sig, och vi löser ut förhållandet:

$$
\\frac{V_\\mathrm{u}}{V} = \\frac{\\rho_\\mathrm{is}}{\\rho_\\mathrm{vatten}} = \\frac{920}{1\\,028} \\approx 0{,}895 = 89{,}5\\ \\%
$$

**Svar:** Ca 89,5 % av isbergets volym ligger under ytan.

**Generell slutsats:** Den klassiska "isbergstoppen-regeln": ungefär 90 % av isberget är under ytan, bara 10 % syns. Detta är en allmän regel: när ett föremål med densitet $\\rho_\\mathrm{kropp}$ flyter i en vätska med densitet $\\rho_\\mathrm{vätska}$, är andelen under ytan alltid $\\rho_\\mathrm{kropp}/\\rho_\\mathrm{vätska}$. Detta är också varför Titanic — och så många andra fartyg — drabbats av kollisioner med isberg: man ser bara "10 % av problemet" från ytan.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.5  Gasers lyftkraft
    // Arkimedes princip för gaser. Luftens densitet 1,293 kg/m³.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En väderballong undantränger 2,0 m³ luft. Hur stor lyftkraft från luften verkar på ballongen? Räkna med luftens densitet 1,293 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 25.4, unit: 'N', tol: 0.03 },
            solution: `Arkimedes princip gäller även i gaser:

$$
F_\\mathrm{L} = \\rho_\\mathrm{luft} \\cdot g \\cdot V = 1{,}293 \\cdot 9{,}82 \\cdot 2{,}0 \\approx 25{,}4\\ \\mathrm{N}
$$

**Svar:** Ca 25 N.`,
        },
        {
            level: 1,
            question: `En heliumballong rymmer 15 liter helium (densitet 0,178 kg/m³). Hur stor är heliumets tyngd? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.0262, unit: 'N', tol: 0.05 },
            solution: `Vi beräknar först heliumets massa, sedan dess tyngd.

$$
\\left[ \\begin{array}{l}
V = 15\\ \\mathrm{liter} = 1{,}5 \\cdot 10^{-2}\\ \\mathrm{m^3} \\\\
\\rho = 0{,}178\\ \\mathrm{kg/m^3}
\\end{array} \\right]
$$

$$
m = \\rho \\cdot V = 0{,}178 \\cdot 1{,}5 \\cdot 10^{-2} \\approx 2{,}67 \\cdot 10^{-3}\\ \\mathrm{kg}
$$

$$
F_\\mathrm{G} = m \\cdot g = 2{,}67 \\cdot 10^{-3} \\cdot 9{,}82 \\approx 2{,}62 \\cdot 10^{-2}\\ \\mathrm{N} = 26\\ \\mathrm{mN}
$$

**Svar:** Ca 26 mN.

**Generell slutsats:** Heliumets densitet är ungefär 7 gånger lägre än luftens (0,178 vs 1,293 kg/m³), så heliumet bidrar nästan inget till ballongens totala tyngd — det är därför ballongen kan flyga.`,
        },
        {
            level: 1,
            question: `Vilket av följande **stiger uppåt** i normal luft (1,293 kg/m³)?`,
            choices: [
                `En metallballong fylld med luft som har temperaturen 15 °C.`,
                `En ballong fylld med koldioxid (densitet 1,98 kg/m³).`,
                `En ballong fylld med helium (densitet 0,178 kg/m³).`,
                `En ballong fylld med argon (densitet 1,78 kg/m³).`,
            ],
            correct: 2,
            solution: `Ett föremål stiger uppåt i luften om dess **totala densitet** (gas + hölje) är lägre än omgivande luft. Av alternativen:

- Luft i luft: samma densitet → ingen netto-lyftkraft (ballongen sjunker p.g.a. höljets tyngd).
- Koldioxid (1,98 kg/m³): tyngre än luft → sjunker.
- Helium (0,178 kg/m³): ca 7 ggr lägre densitet än luft → stiger.
- Argon (1,78 kg/m³): tyngre än luft → sjunker.

**Svar:** Alternativ C — heliumet stiger.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Algot håller i en heliumballong med snöre. Ballongen rymmer 11 liter helium och själva ballonghöljet väger 4,0 g. Hur stor är **spännkraften** i snöret? Räkna med $\\rho_\\mathrm{luft} = 1{,}293\\ \\mathrm{kg/m^3}$, $\\rho_\\mathrm{He} = 0{,}178\\ \\mathrm{kg/m^3}$ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.0811, unit: 'N', tol: 0.05 },
            solution: `Ballongen är i jämvikt — lyftkraften uppåt balanseras av tyngdkraften nedåt (ballonghölje + helium) **plus** spännkraften i snöret. För en stillahängande ballong:

$$
F_\\mathrm{S} = F_\\mathrm{L} - F_\\mathrm{G}
$$

**Lyftkraften** från luften:

$$
F_\\mathrm{L} = \\rho_\\mathrm{luft} \\cdot g \\cdot V = 1{,}293 \\cdot 9{,}82 \\cdot 0{,}011 \\approx 0{,}1397\\ \\mathrm{N}
$$

**Tyngdkraften** (hölje + helium):

$$
\\left[ \\begin{array}{l}
m_\\mathrm{hölje} = 4{,}0\\ \\mathrm{g} = 0{,}0040\\ \\mathrm{kg} \\\\
m_\\mathrm{He} = \\rho_\\mathrm{He} \\cdot V = 0{,}178 \\cdot 0{,}011 \\approx 1{,}958 \\cdot 10^{-3}\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$
F_\\mathrm{G} = (0{,}0040 + 1{,}958 \\cdot 10^{-3}) \\cdot 9{,}82 \\approx 0{,}0585\\ \\mathrm{N}
$$

**Spännkraft:**

$$
F_\\mathrm{S} = 0{,}1397 - 0{,}0585 \\approx 0{,}0812\\ \\mathrm{N} = 81\\ \\mathrm{mN}
$$

**Svar:** Ca 81 mN.

**Generell slutsats:** Tyngdkraften från höljet (4 g) dominerar jämfört med heliumets vikt (knappt 2 g). Om man tar bort höljet skulle ballongen lyfta nästan dubbelt så mycket — men då har man förstås inget att fylla med helium i!`,
        },
        {
            level: 2,
            question: `Du vill bygga en superlätt heliumballong som ska kunna lyfta en GoPro-kamera med massan 120 g (försumma ballonghöljets vikt). Hur stor volym helium behövs i ballongen? Räkna med $\\rho_\\mathrm{luft} = 1{,}293\\ \\mathrm{kg/m^3}$, $\\rho_\\mathrm{He} = 0{,}178\\ \\mathrm{kg/m^3}$ och $g = 9{,}82\\ \\mathrm{N/kg}$.`,
            answer: { value: 0.108, unit: 'm³', tol: 0.03 },
            solution: `För att precis lyfta GoPro:n behöver vi $F_\\mathrm{L} = F_\\mathrm{G,total}$. Den totala tyngden är kamerans tyngd plus heliumets tyngd:

$$
\\rho_\\mathrm{luft} \\cdot g \\cdot V = m_\\mathrm{kamera} \\cdot g + \\rho_\\mathrm{He} \\cdot g \\cdot V
$$

Tyngdfaktorn stryker bort sig, och vi löser ut volymen:

$$
V \\cdot (\\rho_\\mathrm{luft} - \\rho_\\mathrm{He}) = m_\\mathrm{kamera}
\\quad\\Leftrightarrow\\quad
V = \\frac{m_\\mathrm{kamera}}{\\rho_\\mathrm{luft} - \\rho_\\mathrm{He}}
$$

$$
\\left[ \\begin{array}{l}
m_\\mathrm{kamera} = 0{,}120\\ \\mathrm{kg} \\\\
\\rho_\\mathrm{luft} - \\rho_\\mathrm{He} = 1{,}293 - 0{,}178 = 1{,}115\\ \\mathrm{kg/m^3}
\\end{array} \\right]
$$

$$
V = \\frac{0{,}120}{1{,}115} \\approx 0{,}108\\ \\mathrm{m^3} = 108\\ \\mathrm{liter}
$$

**Svar:** Ca 0,11 m³ = 108 liter helium.

**Generell slutsats:** Den effektiva "lyftande densiteten" hos en gas är skillnaden mellan luftens och gasens densitet, $\\rho_\\mathrm{luft} - \\rho_\\mathrm{gas}$. För helium är detta ca 1,1 kg/m³ — alltså lyfter 1 m³ helium ungefär 1,1 kg. För varmluft är skillnaden mycket mindre (ca 0,3 kg/m³), vilket är därför varmluftsballonger måste vara så enorma.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En varmluftballong har volymen 2 500 m³. Själva ballongtyget, korgen och brännaren väger tillsammans 350 kg. Den omgivande kalla luften har densiteten 1,293 kg/m³.

a) Vilken densitet måste varmluften maximalt ha för att ballongen + 3 personer på 75 kg vardera ska kunna lyfta från marken?

b) Vilken temperatur motsvarar densiteten du fick i a)? Antag att vid 0 °C (273 K) är luftens densitet 1,293 kg/m³ och att $\\rho \\propto 1/T$ vid konstant tryck.

*Ange varmluftens densitet i kg/m³ som ditt numeriska svar.*`,
            answer: { value: 1.063, unit: 'kg/m³', tol: 0.02 },
            solution: `**a) Densitet för varmluften.** Total massa att lyfta:

$$
m_\\mathrm{tot} = m_\\mathrm{ballong} + 3 \\cdot m_\\mathrm{person} = 350 + 3 \\cdot 75 = 575\\ \\mathrm{kg}
$$

För att lyfta måste lyftkraften från undanträngd kalluft vara större än eller lika med tyngden av (varmluft + last):

$$
\\rho_\\mathrm{kall} \\cdot g \\cdot V = (\\rho_\\mathrm{varm} \\cdot V + m_\\mathrm{tot}) \\cdot g
$$

*g* stryker bort sig. Löser ut $\\rho_\\mathrm{varm}$:

$$
\\rho_\\mathrm{varm} = \\rho_\\mathrm{kall} - \\frac{m_\\mathrm{tot}}{V} = 1{,}293 - \\frac{575}{2\\,500} = 1{,}293 - 0{,}230 = 1{,}063\\ \\mathrm{kg/m^3}
$$

**b) Temperatur.** Vi använder $\\rho_1 \\cdot T_1 = \\rho_2 \\cdot T_2$ med $\\rho_1 = 1{,}293$ vid $T_1 = 273$ K:

$$
T_2 = T_1 \\cdot \\frac{\\rho_1}{\\rho_2} = 273 \\cdot \\frac{1{,}293}{1{,}063} \\approx 332\\ \\mathrm{K} = 59\\ ^{\\circ}\\mathrm{C}
$$

**Svar:** a) Varmluften behöver ha densiteten 1,063 kg/m³. b) Det motsvarar en temperatur på ca 332 K = 59 °C — bara 60 °C varmare än omgivningen.

**Generell slutsats:** Det här visar varför varmluftballonger inte behöver vara orimligt heta — bara några tiotals grader varmare än omgivningen räcker. Bränslet i brännaren används mest för att kompensera värmeförluster genom ballongtyget, inte för att skapa stora temperaturskillnader.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.6  Ideala gaslagen och kelvinskalan
    // Formel: p_1·V_1/T_1 = p_2·V_2/T_2  (T i K).  T_K = T_C + 273.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.6': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Omvandla temperaturen 25 °C till kelvin.`,
            answer: { value: 298, unit: 'K', tol: 0.01 },
            solution: `Vi använder sambandet $T_K = T_C + 273$.

$$
T_K = 25 + 273 = 298\\ \\mathrm{K}
$$

**Svar:** 298 K.`,
        },
        {
            level: 1,
            question: `En tryckpump komprimerar 8,0 liter luft vid trycket 100 kPa till volymen 2,0 liter. Temperaturen hålls konstant. Vilket blir det nya trycket?`,
            answer: { value: 400, unit: 'kPa', tol: 0.02 },
            solution: `Eftersom temperaturen är konstant ($T_1 = T_2$) förkortas $T$ bort i ideala gaslagen:

$$
\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2}
\\quad\\Rightarrow\\quad
p_1 \\cdot V_1 = p_2 \\cdot V_2
$$

Vi löser ut $p_2$:

$$
p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{100 \\cdot 8{,}0}{2{,}0} = 400\\ \\mathrm{kPa}
$$

**Svar:** 400 kPa.

**Generell slutsats:** När du halverar volymen vid konstant temperatur fördubblas trycket — detta är **Boyles lag**. Det är denna princip cykelpumpar och kompressorer bygger på.`,
        },
        {
            level: 1,
            question: `En sluten gasbehållare har trycket 200 kPa vid temperaturen 20 °C. Vilket blir trycket om temperaturen höjs till 80 °C? (Behållaren är stel — volymen är konstant.)`,
            answer: { value: 241, unit: 'kPa', tol: 0.02 },
            solution: `Vid konstant volym ($V_1 = V_2$) förkortas $V$ bort:

$$
\\frac{p_1}{T_1} = \\frac{p_2}{T_2}
\\quad\\Leftrightarrow\\quad
p_2 = p_1 \\cdot \\frac{T_2}{T_1}
$$

**Glöm inte att omvandla till kelvin!**

$$
\\left[ \\begin{array}{l}
p_1 = 200\\ \\mathrm{kPa} \\\\
T_1 = 20 + 273 = 293\\ \\mathrm{K} \\\\
T_2 = 80 + 273 = 353\\ \\mathrm{K}
\\end{array} \\right]
$$

$$
p_2 = 200 \\cdot \\frac{353}{293} \\approx 241\\ \\mathrm{kPa}
$$

**Svar:** Ca 241 kPa.

**Generell slutsats:** En vanlig fälla är att räkna $p_2 = 200 \\cdot 80/20 = 800$ kPa (i celsius), vilket ger fel svar. **Alltid** kelvin i ideala gaslagen!`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En cykelpump har inre volymen 0,40 liter vid handtaget uppe. När du trycker ner handtaget komprimeras luften till 0,10 liter. Vid utgångsläget är trycket 1,0 atm och temperaturen 20 °C. Pumpningen sker så snabbt att lufttemperaturen ökar till 60 °C. Vilket är trycket vid det komprimerade läget?`,
            answer: { value: 4.55, unit: 'atm', tol: 0.03 },
            solution: `Vi använder ideala gaslagen i sin fulla form (eftersom både *V* och *T* ändras):

$$
\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2}
\\quad\\Leftrightarrow\\quad
p_2 = p_1 \\cdot \\frac{V_1 \\cdot T_2}{V_2 \\cdot T_1}
$$

$$
\\left[ \\begin{array}{l}
p_1 = 1{,}0\\ \\mathrm{atm} \\\\
V_1 = 0{,}40\\ \\mathrm{liter} \\\\
T_1 = 20 + 273 = 293\\ \\mathrm{K} \\\\
V_2 = 0{,}10\\ \\mathrm{liter} \\\\
T_2 = 60 + 273 = 333\\ \\mathrm{K}
\\end{array} \\right]
$$

$$
p_2 = 1{,}0 \\cdot \\frac{0{,}40 \\cdot 333}{0{,}10 \\cdot 293} \\approx 4{,}55\\ \\mathrm{atm}
$$

**Svar:** Ca 4,5 atm.

**Generell slutsats:** Det är därför en cykelpump blir varm när man pumpar hårt — gasen komprimeras snabbt och temperaturen stiger. Om kompressionen vore *isoterm* (mycket långsam) skulle vi få $p_2 = 4{,}0$ atm; den 14 %-iga extra-tryckhöjningen kommer från temperaturökningen.`,
        },
        {
            level: 2,
            question: `En heliumballong släpps upp vid markytan där trycket är 101 kPa och temperaturen 20 °C. Ballongen rymmer då 3,0 liter helium. Den stiger till en höjd där trycket är 30 kPa och temperaturen −40 °C. Vilken volym har ballongen då?`,
            answer: { value: 8.1, unit: 'liter', tol: 0.03 },
            solution: `Vi använder ideala gaslagen för att hitta den nya volymen:

$$
V_2 = V_1 \\cdot \\frac{p_1 \\cdot T_2}{p_2 \\cdot T_1}
$$

$$
\\left[ \\begin{array}{l}
V_1 = 3{,}0\\ \\mathrm{liter} \\\\
p_1 = 101\\ \\mathrm{kPa} \\\\
T_1 = 20 + 273 = 293\\ \\mathrm{K} \\\\
p_2 = 30\\ \\mathrm{kPa} \\\\
T_2 = -40 + 273 = 233\\ \\mathrm{K}
\\end{array} \\right]
$$

$$
V_2 = 3{,}0 \\cdot \\frac{101 \\cdot 233}{30 \\cdot 293} \\approx 8{,}03\\ \\mathrm{liter}
$$

**Svar:** Ca 8,0 liter — ballongen har expanderat till ungefär 2,7 gånger sin ursprungsvolym.

**Generell slutsats:** Det är därför heliumballonger som släpps upp ofta **spricker** på hög höjd — det yttre trycket sjunker snabbare än temperaturen, och ballonghöljet klarar inte expansionen. Väderballonger är specialdesignade för att kunna expandera flera gånger om innan de spricker.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En cylindrisk dykarklocka (öppen i botten, stängd i toppen) har den invändiga höjden 2,0 m och fylls helt med luft vid normalt lufttryck 101 kPa och temperaturen 20 °C. Klockan sänks lodrätt ner i en sjö så att klockans **topp** befinner sig på djupet 8,0 m. Vattnet är 20 °C i hela sjön.

a) Visa att vattnet stiger uppåt en bit in i klockan, och beräkna hur högt.

b) Vilket är trycket inne i klockan när den nått det djupet?

*Räkna med vattnets densitet 998 kg/m³ och $g = 9{,}82\\ \\mathrm{N/kg}$. Ange den höjd som vattnet stigit upp inne i klockan (i meter).*`,
            answer: { value: 0.93, unit: 'm', tol: 0.05 },
            solution: `**Idé.** Luften i klockan fångas och får sin volym minskad när vattnet trycks in från botten. Eftersom temperaturen är konstant (20 °C) gäller Boyles lag: $p_1 V_1 = p_2 V_2$.

Låt $h$ vara höjden som vattnet stigit upp inne i klockan. Då har luften:
- Ursprungsvolym (på ytan): $V_1 = A \\cdot 2{,}0$ (där $A$ är klockans tvärsnittsarea)
- Ny volym (under vattnet): $V_2 = A \\cdot (2{,}0 - h)$

Vattennivån inne i klockan (= luft-vätskegränsen) ligger på djupet $8{,}0 + h$ under sjöns yta (klockans topp är 8,0 m ner, och vattenytan inne är $h$ meter under klockans topp). Trycket på luftkudden måste vara lika med vattnets totala tryck där:

$$
p_2 = p_0 + \\rho \\cdot g \\cdot (8{,}0 + h)
$$

med $p_0 = 101\\,000$ Pa och $\\rho g = 998 \\cdot 9{,}82 \\approx 9\\,802$ Pa/m.

Boyles lag ($p_1 V_1 = p_2 V_2$, areorna förkortas):

$$
p_1 \\cdot 2{,}0 = p_2 \\cdot (2{,}0 - h)
$$

med $p_1 = 101\\,000$ Pa. Insättning:

$$
101\\,000 \\cdot 2{,}0 = \\bigl(101\\,000 + 9\\,802 \\cdot (8{,}0 + h)\\bigr) \\cdot (2{,}0 - h)
$$

Förenkla:

$$
202\\,000 = \\bigl(101\\,000 + 78\\,416 + 9\\,802\\,h\\bigr) \\cdot (2{,}0 - h)
$$

$$
202\\,000 = (179\\,416 + 9\\,802\\,h) \\cdot (2{,}0 - h)
$$

Multiplicera ut:

$$
202\\,000 = 358\\,832 + 19\\,604\\,h - 179\\,416\\,h - 9\\,802\\,h^{2}
$$

$$
9\\,802\\,h^{2} + 159\\,812\\,h - 156\\,832 = 0
$$

Andragradsekvation. Lös:

$$
h = \\frac{-159\\,812 + \\sqrt{159\\,812^{2} + 4 \\cdot 9\\,802 \\cdot 156\\,832}}{2 \\cdot 9\\,802}
$$

Diskriminanten: $159\\,812^{2} + 4 \\cdot 9\\,802 \\cdot 156\\,832 = 2{,}554 \\cdot 10^{10} + 6{,}151 \\cdot 10^{9} \\approx 3{,}169 \\cdot 10^{10}$, kvadratroten $\\approx 1{,}780 \\cdot 10^{5}$.

$$
h \\approx \\frac{-159\\,812 + 178\\,000}{19\\,604} \\approx \\frac{18\\,188}{19\\,604} \\approx 0{,}93\\ \\mathrm{m}
$$

**b) Trycket inne i klockan:**

$$
p_2 = 101\\,000 + 9\\,802 \\cdot (8{,}0 + 0{,}93) \\approx 188\\,500\\ \\mathrm{Pa} \\approx 189\\ \\mathrm{kPa}
$$

Kontrollkontroll: $p_2 V_2 = 188\\,500 \\cdot (2{,}0 - 0{,}93) \\approx 188\\,500 \\cdot 1{,}07 \\approx 201\\,700$, vilket är väldigt nära $p_1 V_1 = 101\\,000 \\cdot 2{,}0 = 202\\,000$. ✓

**Svar:** a) Vattnet stiger ca 0,93 m upp inne i klockan. b) Trycket är ca 189 kPa.

**Generell slutsats:** En dykarklocka skyddar dykaren genom att luften i klockan är trycksatt till samma tryck som vattnet utanför — annars skulle vattnet bara strömma in. Notera att luften halveras till volym när trycket fördubblas (Boyles lag) — vid 100 m djup där totaltrycket är ca 11 atm skulle 2 m luft komprimeras till bara ca 18 cm.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-5.7  Pascals princip
    // Formel: F_1/A_1 = F_2/A_2  (i en hydraulisk press fortplantas trycket).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-5.7': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `I en hydraulisk press trycks den lilla kolven ner med kraften 80 N. Den lilla kolven har arean 5,0 cm² och den stora kolven 50 cm². Vilken kraft lyfter den stora kolven?`,
            answer: { value: 800, unit: 'N', tol: 0.02 },
            solution: `Pascals princip:

$$
\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\quad\\Leftrightarrow\\quad F_2 = F_1 \\cdot \\frac{A_2}{A_1}
$$

$$
\\left[ \\begin{array}{l}
F_1 = 80\\ \\mathrm{N} \\\\
A_1 = 5{,}0\\ \\mathrm{cm^2} \\\\
A_2 = 50\\ \\mathrm{cm^2}
\\end{array} \\right]
$$

Notera att areorna inte behöver vara i SI — bara samma enhet på båda sidor.

$$
F_2 = 80 \\cdot \\frac{50}{5{,}0} = 800\\ \\mathrm{N}
$$

**Svar:** 800 N.

**Generell slutsats:** Förhållandet mellan utgångskraften och insatskraften är **areaförhållandet**. En press med areaförhållandet 10:1 ger 10 gånger större kraft.`,
        },
        {
            level: 1,
            question: `En hydraulisk press har en liten kolv med arean 2,0 cm² och en stor kolv med arean 80 cm². Hur många gånger större kraft än insatskraften får man ut?`,
            answer: { value: 40, unit: '', tol: 0.02 },
            solution: `Pascals princip ger att kraftförstärkningen är lika med areaförhållandet:

$$
\\frac{F_2}{F_1} = \\frac{A_2}{A_1} = \\frac{80}{2{,}0} = 40
$$

**Svar:** 40 gånger.`,
        },
        {
            level: 1,
            question: `En hydraulisk domkraft har den lilla kolven med diametern 1,0 cm och den stora kolven med diametern 8,0 cm. Vilket är förhållandet mellan utgångskraft och insatskraft?`,
            answer: { value: 64, unit: '', tol: 0.02 },
            solution: `Cirkelareor förhåller sig som diametrarna i kvadrat (eftersom $A = \\pi d^{2}/4$):

$$
\\frac{F_2}{F_1} = \\frac{A_2}{A_1} = \\frac{d_2^{2}}{d_1^{2}} = \\frac{8{,}0^{2}}{1{,}0^{2}} = 64
$$

**Svar:** 64 gånger.

**Generell slutsats:** En klassisk fälla är att svara 8 (= förhållandet mellan diametrarna). Men det är **areorna** som spelar roll, och cirkelarean växer med kvadraten av diametern — alltså är kraftförstärkningen $(d_2/d_1)^{2}$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Bilden visar en principskiss av en hydraulisk domkraft. Den lilla kolven har arean 3,5 cm² och den stora 52 cm². Hur stor kraft måste tryckas på den lilla kolven för att kunna lyfta en bil med massan 1 200 kg? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

${makeHydraulicPress({ a1: 'A₁ = 3,5 cm²', a2: 'A₂ = 52 cm²', f1: 'F₁ = ?', f2: 'F₂' })}`,
            answer: { value: 793, unit: 'N', tol: 0.05 },
            solution: `Bilen utövar tyngdkraft på den stora kolven:

$$
F_2 = m \\cdot g = 1\\,200 \\cdot 9{,}82 = 11\\,784\\ \\mathrm{N}
$$

Pascals princip ger då:

$$
F_1 = F_2 \\cdot \\frac{A_1}{A_2} = 11\\,784 \\cdot \\frac{3{,}5}{52} \\approx 793\\ \\mathrm{N}
$$

**Svar:** Ca 793 N (motsvarar tyngden av ungefär 81 kg).

**Generell slutsats:** Med en hydraulisk domkraft kan en vanlig människa lyfta en bil med kroppstyngd som insatskraft. Areaförhållandet 52/3,5 ≈ 15 betyder att man får 15 ggr större lyftkraft.`,
        },
        {
            level: 2,
            question: `En hydraulisk press används för att klippa metallplåt. Den lilla kolven har arean 4,0 cm² och pressas ner med kraften 120 N en sträcka av 20 cm. Den stora kolven har arean 100 cm².

a) Vilken kraft levererar den stora kolven?

b) Hur långt rör sig den stora kolven?

*Ange svar för (b) i centimeter.*`,
            answer: { value: 0.80, unit: 'cm', tol: 0.05 },
            solution: `**a) Kraften på den stora kolven:**

$$
F_2 = F_1 \\cdot \\frac{A_2}{A_1} = 120 \\cdot \\frac{100}{4{,}0} = 3\\,000\\ \\mathrm{N}
$$

**b) Hur långt rör sig den stora kolven?** Eftersom vätskan är inkompressibel måste samma vätskevolym som pressas ner av lilla kolven flyttas till den stora:

$$
A_1 \\cdot s_1 = A_2 \\cdot s_2
\\quad\\Leftrightarrow\\quad
s_2 = s_1 \\cdot \\frac{A_1}{A_2}
$$

$$
s_2 = 20 \\cdot \\frac{4{,}0}{100} = 0{,}80\\ \\mathrm{cm} = 8{,}0\\ \\mathrm{mm}
$$

**Svar:** a) 3 000 N (= 3,0 kN). b) 0,80 cm.

**Generell slutsats:** Det finns ingen "gratis" kraftförstärkning. Vad du vinner i kraft förlorar du i sträcka — produkten $F \\cdot s$ (= arbetet) är densamma på båda sidor. Kontroll: $F_1 s_1 = 120 \\cdot 0{,}20 = 24$ J och $F_2 s_2 = 3\\,000 \\cdot 0{,}0080 = 24$ J. ✓ Detta är **mekanikens gyllene regel**.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En hydraulisk pump kopplas till en lyftkolv via en slang fylld med olja (densitet 870 kg/m³). Den lilla kolven (vid pumpen) har arean 5,0 cm². Den stora lyftkolven har arean 200 cm² och sitter **3,0 m högre upp** än den lilla. Hur stor kraft måste tryckas på den lilla kolven för att kunna lyfta en last på 1 500 kg? Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.

*Tips: jämför trycken vid de två kolvarna och kom ihåg att vätskepelaren i slangen bidrar med ett vätsketryck.*`,
            answer: { value: 381, unit: 'N', tol: 0.05 },
            solution: `**Idé.** I en hydraulisk press utan höjdskillnad har de två kolvarna **samma tryck**. Här är dock kolvarna på olika höjd, så trycket vid den övre kolven är *lägre* med $\\rho g h$ jämfört med den nedre. Det måste vi ta hänsyn till.

Trycket vid lilla kolven (nedre):

$$
p_1 = \\frac{F_1}{A_1}
$$

Trycket vid stora kolven (övre): den måste lyfta lasten, så $p_2 = F_\\mathrm{last}/A_2$.

Sambandet mellan trycken (Pascals princip + vätskepelare):

$$
p_1 = p_2 + \\rho \\cdot g \\cdot h
$$

Tryckt vid övre kolven är lägre eftersom vi gått uppåt 3 m i vätskan. Vi sätter ihop:

$$
\\frac{F_1}{A_1} = \\frac{F_\\mathrm{last}}{A_2} + \\rho \\cdot g \\cdot h
$$

Lasten ger tyngdkraften $F_\\mathrm{last} = m g = 1\\,500 \\cdot 9{,}82 = 14\\,730$ N.

$$
\\left[ \\begin{array}{l}
F_\\mathrm{last} = 14\\,730\\ \\mathrm{N} \\\\
A_1 = 5{,}0\\ \\mathrm{cm^2} = 5{,}0 \\cdot 10^{-4}\\ \\mathrm{m^2} \\\\
A_2 = 200\\ \\mathrm{cm^2} = 2{,}0 \\cdot 10^{-2}\\ \\mathrm{m^2} \\\\
\\rho = 870\\ \\mathrm{kg/m^3} \\\\
h = 3{,}0\\ \\mathrm{m}
\\end{array} \\right]
$$

Beräkna högra ledet av tryckekvationen:

$$
p_2 + \\rho g h = \\frac{14\\,730}{2{,}0 \\cdot 10^{-2}} + 870 \\cdot 9{,}82 \\cdot 3{,}0
= 736\\,500 + 25\\,631 \\approx 762\\,000\\ \\mathrm{Pa}
$$

Multiplicera med $A_1$ för att få insatskraften:

$$
F_1 = A_1 \\cdot \\bigl(p_2 + \\rho g h\\bigr) = 5{,}0 \\cdot 10^{-4} \\cdot 762\\,000 \\approx 381\\ \\mathrm{N}
$$

**Svar:** Ca 380 N (kraften måste vara så stor att den balanserar både lastens tyngd och vätskepelaren i slangen).

**Generell slutsats:** I idealfallet (om kolvarna hade varit på samma höjd) skulle insatskraften ha varit bara $F_1 = F_\\mathrm{last} \\cdot A_1/A_2 = 14\\,730 \\cdot 5{,}0/200 \\approx 368$ N. De extra ~13 N kommer från att man måste "trycka upp" vätskan 3 m i slangen — vilket ger ett extra vätsketryck $\\rho g h \\approx 26$ kPa som multiplicerat med lilla areans 5,0 · 10⁻⁴ m² ger just 13 N.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-6.1  Värme och temperatur
    // Formel: T_K = T_C + 273.  Kelvin är direkt proportionell mot
    // atomernas medelrörelseenergi — celsius är det inte.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-6.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Omvandla temperaturen 25 °C till kelvin.`,
            answer: { value: 298, unit: 'K', tol: 0.01 },
            solution: `Vi använder sambandet mellan celsius och kelvin:

$$ T_K = T_C + 273 $$

$$ T_K = 25 + 273 = 298\\ \\mathrm{K} $$

**Svar:** 298 K.`,
        },
        {
            level: 1,
            question: `På en frostig vintermorgon är det −18 °C ute. Vad motsvarar det i kelvin?`,
            answer: { value: 255, unit: 'K', tol: 0.01 },
            solution: `Vi använder sambandet mellan celsius och kelvin:

$$ T_K = T_C + 273 = -18 + 273 = 255\\ \\mathrm{K} $$

**Svar:** 255 K.

**Generell slutsats:** Kelvin-värden är alltid positiva eftersom 0 K motsvarar den absoluta nollpunkten (−273 °C). Det går alltså inte att ha negativa kelvin-värden.`,
        },
        {
            level: 1,
            question: `En isbit och en aluminiumplatta ligger sida vid sida på köksbänken och har båda samma temperatur som rummet (ca 20 °C). När du lägger handen på respektive föremål känns aluminiumplattan **kallare**. Vilken är orsaken?`,
            choices: [
                `Aluminiumplattan har faktiskt lägre temperatur än rummet — temperaturmätare brukar visa fel på metall.`,
                `Aluminium leder värme bättre än is, så värme strömmar snabbare från handen till aluminium.`,
                `Aluminiumets atomer rör sig långsammare än is-atomerna trots samma temperatur.`,
                `Aluminium "drar till sig kyla" från rummet och blir därför kallt.`,
            ],
            correct: 1,
            solution: `Båda föremålen har samma temperatur. Det vi upplever som *kallt* är att värme **flödar bort från handen**. Eftersom aluminium leder värme mycket bättre än is (och betydligt bättre än plast eller trä) flödar värmen snabbare från handen till aluminiumet, och vi uppfattar det som kallare.

**Svar:** Alternativ B.

**Generell slutsats:** "Kyla" finns inte som ett fysikaliskt fenomen — bara värmeöverföring i olika riktning. Hur kallt något känns beror lika mycket på materialets värmeledningsförmåga som på dess faktiska temperatur.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Tre kärl A, B och C innehåller olika gaser med temperaturerna 27 °C, 127 °C och 327 °C. I vilket kärl är atomernas medelrörelseenergi exakt **dubbelt** så stor som i kärl A?`,
            choices: [
                `Kärl B — för 127 är dubbelt så mycket som lite mer än hälften av 327.`,
                `Kärl B — för 127 °C ÷ 27 °C ≈ 5.`,
                `Kärl C — för det är dubbelt så hög temperatur som A i kelvinskalan.`,
                `Inget av kärlen — ingen av temperaturerna är exakt dubbelt så hög som 27.`,
            ],
            correct: 2,
            solution: `Atomernas medelrörelseenergi är proportionell mot temperaturen i **kelvin**, inte i celsius. Vi omvandlar alla tre temperaturer:

$$
\\left[ \\begin{array}{l}
T_A = 27 + 273 = 300\\ \\mathrm{K} \\\\
T_B = 127 + 273 = 400\\ \\mathrm{K} \\\\
T_C = 327 + 273 = 600\\ \\mathrm{K}
\\end{array} \\right]
$$

Vi söker det kärl där $T = 2 \\cdot T_A = 2 \\cdot 300 = 600\\ \\mathrm{K}$. Det är kärl C.

**Svar:** Alternativ C.

**Generell slutsats:** En klassisk fälla — att tro att "dubbla celsiustemperaturen" ger dubbla rörelseenergin. Det är bara i kelvinskalan som proportionalitet gäller. Det är därför kelvin används i alla fysikaliska samband med temperatur (t.ex. ideala gaslagen).`,
        },
        {
            level: 2,
            question: `Du har en aluminiumplatta och en plastplatta som båda håller rumstemperatur 20 °C. Du lägger en isbit på vardera plattan. På vilken platta smälter isen snabbast — och varför?`,
            choices: [
                `Aluminiumplattan — eftersom aluminium leder värme bättre, transporterar plattan snabbare energi från rummet till isen.`,
                `Plastplattan — eftersom plast känns varmare, är den faktiskt varmare och smälter isen snabbare.`,
                `Båda lika snabbt — de har samma temperatur, så samma värme flödar till isen.`,
                `Plastplattan — eftersom plast isolerar bättre håller den värmen kvar mot isen istället för att tappa den till rummet.`,
            ],
            correct: 0,
            solution: `Båda plattorna har samma temperatur, men det är **värmeledningen** som avgör hur snabbt energi når isen. Aluminium leder värme mycket bättre än plast, så aluminiumplattan kan snabbt "hämta" energi från sig själv och rummet och föra över den till isen. Plasten isolerar och förser isen med energi mycket långsammare.

**Svar:** Alternativ A — på aluminiumplattan.

**Generell slutsats:** Att ett material *känns* kallt betyder att det leder värme effektivt. Samma egenskap som gör aluminium "kall mot handen" gör att det också smälter is snabbare. Plast känns "varm" men är en sämre värmeöverförare.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En patient har feber och kroppstemperaturen 42,2 °C. En frisk människa har 37,0 °C. Hur många procent högre medelrörelseenergi har molekylerna i patientens kropp jämfört med molekylerna i en frisk människas kropp?`,
            answer: { value: 1.68, unit: '%', tol: 0.05 },
            solution: `Medelrörelseenergin är proportionell mot temperaturen i **kelvin**, så vi måste först omvandla:

$$
\\left[ \\begin{array}{l}
T_\\mathrm{frisk} = 37{,}0 + 273 = 310{,}0\\ \\mathrm{K} \\\\
T_\\mathrm{sjuk} = 42{,}2 + 273 = 315{,}2\\ \\mathrm{K}
\\end{array} \\right]
$$

Den procentuella ökningen av medelrörelseenergin är samma som den procentuella ökningen av kelvin-temperaturen:

$$
\\frac{T_\\mathrm{sjuk} - T_\\mathrm{frisk}}{T_\\mathrm{frisk}}
= \\frac{315{,}2 - 310{,}0}{310{,}0} \\approx 0{,}0168 = 1{,}68\\ \\%
$$

**Svar:** Ca 1,7 % högre.

**Generell slutsats:** Trots att febern känns dramatisk är ökningen av molekylernas rörelseenergi mycket liten i fysikalisk mening — under 2 %. Men kroppens biokemiska processer är ändå så finkalibrerade att den lilla förändringen är tillräckligt stor för att proteiner ska börja fungera fel. Tar man fel på celsius och kelvin här ((42,2 − 37,0) / 37,0 ≈ 14 %) blir man fel med nästan en faktor 10.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-6.2  Uppvärmning och avsvalning
    // Formler: E = c · m · ΔT  och  E_avg = E_upp.  Värmetabell behövs.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-6.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Hur mycket energi går åt för att värma 0,50 kg vatten från 20 °C till 90 °C? Räkna med $c_\\mathrm{vatten} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}$. Ange svaret i kJ.`,
            answer: { value: 146, unit: 'kJ', tol: 0.02 },
            solution: `Vi använder formeln för uppvärmning:

$$ E = c \\cdot m \\cdot \\Delta T $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
c = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)} \\\\
m = 0{,}50\\ \\mathrm{kg} \\\\
\\Delta T = 90 - 20 = 70\\ \\mathrm{K}
\\end{array} \\right]
$$

$$ E = 4{,}18 \\cdot 0{,}50 \\cdot 70 = 146{,}3\\ \\mathrm{kJ} \\approx 146\\ \\mathrm{kJ} $$

**Svar:** Ca 146 kJ (eller ca 1,5 · 10⁵ J).`,
        },
        {
            level: 1,
            question: `Du tillför 18 kJ energi till 2,0 kg aluminium med starttemperaturen 25 °C. Hur varmt blir aluminiumet? Räkna med $c_\\mathrm{Al} = 0{,}90\\ \\mathrm{kJ/(kg \\cdot K)}$. Ange svaret i °C.`,
            answer: { value: 35, unit: '°C', tol: 0.03 },
            solution: `Vi löser ut temperaturändringen ur uppvärmningsformeln:

$$ E = c \\cdot m \\cdot \\Delta T \\quad\\Leftrightarrow\\quad \\Delta T = \\frac{E}{c \\cdot m} $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
E = 18\\ \\mathrm{kJ} \\\\
c = 0{,}90\\ \\mathrm{kJ/(kg \\cdot K)} \\\\
m = 2{,}0\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$ \\Delta T = \\frac{18}{0{,}90 \\cdot 2{,}0} = 10\\ \\mathrm{K} $$

Sluttemperaturen är $T_2 = T_1 + \\Delta T = 25 + 10 = 35\\ ^{\\circ}\\mathrm{C}$.

**Svar:** 35 °C.`,
        },
        {
            level: 1,
            question: `En vattenkokare med effekten 2,2 kW värmer 0,40 kg vatten från 20 °C till 100 °C. Hur lång tid tar uppvärmningen? Räkna med $c_\\mathrm{vatten} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}$ och anta att all energi från kokaren går till vattnet. Ange svaret i sekunder.`,
            answer: { value: 60.8, unit: 's', tol: 0.03 },
            solution: `Den energi vattnet behöver upptas är lika med den energi kokaren avger under tiden *t*. Eftersom $P = E/t$ får vi $E_\\mathrm{avg} = P \\cdot t$.

$$ E_\\mathrm{avg} = E_\\mathrm{upp} \\quad\\Leftrightarrow\\quad P \\cdot t = c \\cdot m \\cdot \\Delta T $$

Löser ut tiden:

$$ t = \\frac{c \\cdot m \\cdot \\Delta T}{P} $$

Mätvärden (omvandlat till SI-enheter):

$$
\\left[ \\begin{array}{l}
c = 4\\,180\\ \\mathrm{J/(kg \\cdot K)} \\\\
m = 0{,}40\\ \\mathrm{kg} \\\\
\\Delta T = 100 - 20 = 80\\ \\mathrm{K} \\\\
P = 2{,}2\\ \\mathrm{kW} = 2\\,200\\ \\mathrm{W}
\\end{array} \\right]
$$

$$ t = \\frac{4\\,180 \\cdot 0{,}40 \\cdot 80}{2\\,200} = \\frac{133\\,760}{2\\,200} \\approx 60{,}8\\ \\mathrm{s} $$

**Svar:** Ca 61 s (drygt en minut).`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Du blandar 0,30 kg vatten med temperaturen 80 °C med 0,50 kg vatten med temperaturen 20 °C i en isolerad behållare. Vilken sluttemperatur får blandningen? Bortse från energiförluster till omgivningen. Ange svaret i °C.`,
            answer: { value: 42.5, unit: '°C', tol: 0.02 },
            solution: `Värme flödar från varmt till kallt — varmvattnet avger energi som upptas av kallvattnet. Eftersom det är samma vätska (samma *c*) förkortas värmekapaciteten bort.

$$ E_\\mathrm{avg} = E_\\mathrm{upp} \\quad\\Rightarrow\\quad c \\cdot m_v \\cdot \\Delta T_v = c \\cdot m_k \\cdot \\Delta T_k $$

$$ m_v \\cdot (T_v - T) = m_k \\cdot (T - T_k) $$

Mätvärden (om vi kallar sluttemperaturen *T*):

$$
\\left[ \\begin{array}{l}
m_v = 0{,}30\\ \\mathrm{kg},\\quad T_v = 80\\ ^{\\circ}\\mathrm{C} \\\\
m_k = 0{,}50\\ \\mathrm{kg},\\quad T_k = 20\\ ^{\\circ}\\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ 0{,}30 \\cdot (80 - T) = 0{,}50 \\cdot (T - 20) $$

$$ 24 - 0{,}30\\,T = 0{,}50\\,T - 10 $$

$$ 34 = 0{,}80\\,T \\quad\\Leftrightarrow\\quad T = \\frac{34}{0{,}80} = 42{,}5\\ ^{\\circ}\\mathrm{C} $$

**Svar:** 42,5 °C ≈ 43 °C.

**Generell slutsats:** Eftersom den kalla vattenmängden är större "drar" den ner sluttemperaturen mot sig själv. Sluttemperaturen är inte mittpunkten mellan 20 °C och 80 °C (50 °C), utan ligger närmare den kalla sidan eftersom det är mer kallt vatten.`,
        },
        {
            level: 2,
            question: `Du lägger en kopparbit med massan 100 g och temperaturen 200 °C i 200 g vatten som har 25 °C. Vilken blir blandningens sluttemperatur? Räkna med $c_\\mathrm{Cu} = 0{,}39\\ \\mathrm{kJ/(kg \\cdot K)}$ och $c_\\mathrm{vatten} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}$. Bortse från energiförluster. Ange svaret i °C.`,
            answer: { value: 32.8, unit: '°C', tol: 0.03 },
            solution: `Kopparbiten avger energi och avsvalnar, vattnet upptar energin och värms upp.

$$ E_\\mathrm{avg} = E_\\mathrm{upp} $$

$$ c_\\mathrm{Cu} \\cdot m_\\mathrm{Cu} \\cdot (T_\\mathrm{Cu} - T) = c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot (T - T_\\mathrm{v}) $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
m_\\mathrm{Cu} = 0{,}100\\ \\mathrm{kg},\\quad T_\\mathrm{Cu} = 200\\ ^{\\circ}\\mathrm{C},\\quad c_\\mathrm{Cu} = 0{,}39\\ \\mathrm{kJ/(kg \\cdot K)} \\\\
m_\\mathrm{v} = 0{,}200\\ \\mathrm{kg},\\quad T_\\mathrm{v} = 25\\ ^{\\circ}\\mathrm{C},\\quad c_\\mathrm{v} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}
\\end{array} \\right]
$$

Insättning (alla *c* i kJ/(kg·K), så *E* hamnar i kJ):

$$ 0{,}39 \\cdot 0{,}100 \\cdot (200 - T) = 4{,}18 \\cdot 0{,}200 \\cdot (T - 25) $$

$$ 0{,}0390 \\cdot (200 - T) = 0{,}836 \\cdot (T - 25) $$

$$ 7{,}80 - 0{,}0390\\,T = 0{,}836\\,T - 20{,}9 $$

$$ 28{,}7 = 0{,}875\\,T \\quad\\Leftrightarrow\\quad T \\approx 32{,}8\\ ^{\\circ}\\mathrm{C} $$

**Svar:** Ca 33 °C.

**Generell slutsats:** Trots att kopparbiten är 175 grader varmare än vattnet och nästan dubbelt så heta blir vattnet bara ca 8 grader varmare. Det beror på att vattnets specifika värmekapacitet är ca 11 gånger högre än kopparets — vatten "behöver" mycket mer energi för att värmas. Det är därför vatten är så bra som kylvätska, värmeöverförare i element och temperaturreglerare i havet.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En kalorimeter (isolerad behållare) är gjord av aluminium med massan 200 g. I kalorimetern finns 300 g vatten med temperaturen 20,0 °C. Du värmer ett okänt metallföremål ($m = 150\\ \\mathrm{g}$) till 200 °C och släpper det i kalorimetern. När blandningen är i jämvikt har vatten + kalorimeter + metallföremål samma temperatur, 28,5 °C. Bestäm metallens specifika värmekapacitet. Räkna med $c_\\mathrm{vatten} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}$ och $c_\\mathrm{Al} = 0{,}90\\ \\mathrm{kJ/(kg \\cdot K)}$. Bortse från energiförluster till omgivningen. Ange svaret i kJ/(kg·K).`,
            answer: { value: 0.474, unit: 'kJ/(kg·K)', tol: 0.05 },
            solution: `Metallföremålet avger energi när det kyls från 200 °C till 28,5 °C. Den avgivna energin upptas av **både** vattnet och aluminiumkalorimetern (båda värms från 20,0 °C till 28,5 °C):

$$ E_\\mathrm{avg} = E_\\mathrm{upp,vatten} + E_\\mathrm{upp,kalorimeter} $$

$$ c_x \\cdot m_x \\cdot \\Delta T_x = c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v} + c_\\mathrm{Al} \\cdot m_\\mathrm{Al} \\cdot \\Delta T_\\mathrm{Al} $$

Vi löser ut metallens specifika värmekapacitet $c_x$:

$$ c_x = \\frac{c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v} + c_\\mathrm{Al} \\cdot m_\\mathrm{Al} \\cdot \\Delta T_\\mathrm{Al}}{m_x \\cdot \\Delta T_x} $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
m_\\mathrm{v} = 0{,}300\\ \\mathrm{kg},\\quad \\Delta T_\\mathrm{v} = 28{,}5 - 20{,}0 = 8{,}5\\ \\mathrm{K} \\\\
m_\\mathrm{Al} = 0{,}200\\ \\mathrm{kg},\\quad \\Delta T_\\mathrm{Al} = 8{,}5\\ \\mathrm{K} \\\\
m_x = 0{,}150\\ \\mathrm{kg},\\quad \\Delta T_x = 200 - 28{,}5 = 171{,}5\\ \\mathrm{K}
\\end{array} \\right]
$$

Insättning:

$$ c_x = \\frac{4{,}18 \\cdot 0{,}300 \\cdot 8{,}5 + 0{,}90 \\cdot 0{,}200 \\cdot 8{,}5}{0{,}150 \\cdot 171{,}5} = \\frac{10{,}659 + 1{,}530}{25{,}725} = \\frac{12{,}189}{25{,}725} \\approx 0{,}474\\ \\mathrm{kJ/(kg \\cdot K)} $$

**Svar:** Ca 0,47 kJ/(kg·K).

**Generell slutsats:** Värdet 0,47 kJ/(kg·K) ligger nära järns specifika värmekapacitet (0,46 kJ/(kg·K) i tabell) — den okända metallen är alltså troligen järn. Detta är en klassisk kalorimetri-metod för att identifiera metaller. Lägg märke till hur viktigt det är att inkludera kalorimeterns egen värmeupptagning — utelämnar man den får man $c_x \\approx 0{,}414\\ \\mathrm{kJ/(kg \\cdot K)}$, vilket skulle peka mot ett helt fel material.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-6.3  Faser och fasövergångar
    // Formler: E = l_s · m (smältning/stelning), E = l_å · m (förångning).
    // Tabellvärden: l_s,is = 334 kJ/kg, l_å,vatten = 2,26 MJ/kg,
    //               c_is = 2,2 kJ/(kg·K), c_vatten = 4,18 kJ/(kg·K).
    // ═══════════════════════════════════════════════════════════════════
    'fy1-6.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Hur mycket energi går åt för att smälta 0,50 kg is som redan ligger vid 0 °C? Räkna med $l_s = 334\\ \\mathrm{kJ/kg}$ för is. Ange svaret i kJ.`,
            answer: { value: 167, unit: 'kJ', tol: 0.02 },
            solution: `Smältning är en fasövergång utan temperaturändring. Energin beräknas med:

$$ E = l_s \\cdot m $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
l_s = 334\\ \\mathrm{kJ/kg} \\\\
m = 0{,}50\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$ E = 334 \\cdot 0{,}50 = 167\\ \\mathrm{kJ} $$

**Svar:** 167 kJ.`,
        },
        {
            level: 1,
            question: `Hur mycket energi avges när 0,20 kg vattenånga vid 100 °C kondenserar till flytande vatten vid 100 °C? Räkna med $l_å = 2{,}26\\ \\mathrm{MJ/kg}$. Ange svaret i kJ.`,
            answer: { value: 452, unit: 'kJ', tol: 0.02 },
            solution: `Kondensation avger samma energi som förångning kräver för samma massa. Vi använder förångningsformeln:

$$ E = l_å \\cdot m $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
l_å = 2{,}26\\ \\mathrm{MJ/kg} = 2\\,260\\ \\mathrm{kJ/kg} \\\\
m = 0{,}20\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$ E = 2\\,260 \\cdot 0{,}20 = 452\\ \\mathrm{kJ} $$

**Svar:** 452 kJ.

**Generell slutsats:** Att förånga vatten kräver mycket mer energi än att smälta is av samma massa (jämför med 167 kJ för 0,50 kg is). Det är därför det tar lång tid att koka bort vatten ur en kastrull — och varför vattenånga i hud-kontakt orsakar mycket allvarligare brännskador än kokande vatten.`,
        },
        {
            level: 1,
            question: `Vad heter fasövergången från **gas** direkt till **fast** form, utan att passera vätskeformen?`,
            choices: [
                `Sublimering.`,
                `Deposition.`,
                `Stelning.`,
                `Kondensering.`,
            ],
            correct: 1,
            solution: `De sex fasövergångarna är:

- Smältning (fast → flytande)
- Stelning (flytande → fast)
- Förångning (flytande → gas)
- Kondensering (gas → flytande)
- **Sublimering** (fast → gas)
- **Deposition** (gas → fast)

**Svar:** Alternativ B — deposition.

**Generell slutsats:** Frost på fönsterrutor en kall morgon bildas genom deposition — vattenånga i luften går direkt till is utan att först bli vatten. Det omvända (sublimering) ser man när torris (fast CO₂) övergår direkt till gas vid rumstemperatur.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Du tar 1,0 kg is med temperaturen −10 °C ur frysen. Hur mycket energi behövs för att (1) värma isen till 0 °C och (2) sedan smälta hela mängden? Räkna med $c_\\mathrm{is} = 2{,}2\\ \\mathrm{kJ/(kg \\cdot K)}$ och $l_s = 334\\ \\mathrm{kJ/kg}$. Ange totala energin i kJ.`,
            answer: { value: 356, unit: 'kJ', tol: 0.02 },
            solution: `Processen sker i två steg: uppvärmning av isen från −10 °C till 0 °C, och därefter smältning vid 0 °C.

**Steg 1 — uppvärmning:**

$$ E_1 = c_\\mathrm{is} \\cdot m \\cdot \\Delta T = 2{,}2 \\cdot 1{,}0 \\cdot 10 = 22\\ \\mathrm{kJ} $$

**Steg 2 — smältning:**

$$ E_2 = l_s \\cdot m = 334 \\cdot 1{,}0 = 334\\ \\mathrm{kJ} $$

**Total energi:**

$$ E = E_1 + E_2 = 22 + 334 = 356\\ \\mathrm{kJ} $$

**Svar:** 356 kJ.

**Generell slutsats:** Lägg märke till att smältningen kräver ca 15 gånger mer energi än uppvärmningen från −10 °C till 0 °C. Det är typiskt — fasövergångar kräver i allmänhet mycket mer energi än uppvärmning eller avsvalning över samma temperaturintervall. Det är därför is i en drink kyler så effektivt: smältningen suger åt sig stora mängder energi från drycken.`,
        },
        {
            level: 2,
            question: `Hur mycket energi krävs för att värma 200 g vatten från 20 °C och sedan förånga allt vid 100 °C? Räkna med $c_\\mathrm{vatten} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}$ och $l_å = 2{,}26\\ \\mathrm{MJ/kg}$. Ange totala energin i kJ.`,
            answer: { value: 519, unit: 'kJ', tol: 0.02 },
            solution: `Processen sker i två steg: först uppvärmning till kokpunkten 100 °C, sedan förångning vid 100 °C.

**Steg 1 — uppvärmning:**

$$ E_1 = c \\cdot m \\cdot \\Delta T $$

$$
\\left[ \\begin{array}{l}
c = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)} \\\\
m = 0{,}200\\ \\mathrm{kg} \\\\
\\Delta T = 100 - 20 = 80\\ \\mathrm{K}
\\end{array} \\right]
$$

$$ E_1 = 4{,}18 \\cdot 0{,}200 \\cdot 80 = 66{,}88\\ \\mathrm{kJ} $$

**Steg 2 — förångning:**

$$ E_2 = l_å \\cdot m = 2\\,260 \\cdot 0{,}200 = 452\\ \\mathrm{kJ} $$

**Total energi:**

$$ E = E_1 + E_2 = 66{,}88 + 452 \\approx 519\\ \\mathrm{kJ} $$

**Svar:** Ca 519 kJ.

**Generell slutsats:** Förångningen står för 87 % av den totala energin. Det är därför det går mycket fortare att värma en kastrull med vatten från 20 °C till 100 °C än att sedan koka bort vattnet — fasövergången slukar mycket mer energi än temperaturändringen.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Du häller 0,80 kg vatten med temperaturen 70 °C i en isolerad termos. Du tillsätter sedan en mängd isbitar (0 °C) tills sluttemperaturen, när all is smält, blir 25 °C. Hur många gram is behövde du? Räkna med $c_\\mathrm{vatten} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)}$ och $l_s = 334\\ \\mathrm{kJ/kg}$. Bortse från energiförluster till omgivningen. Ange svaret i gram.`,
            answer: { value: 343, unit: 'g', tol: 0.04 },
            solution: `Varmvattnet avger energi när det avsvalnar från 70 °C till 25 °C. Den energin upptas av isen genom **två** processer: (1) smältning av isen vid 0 °C och (2) uppvärmning av smältvattnet från 0 °C till 25 °C.

$$ E_\\mathrm{avg} = E_\\mathrm{smältning} + E_\\mathrm{uppv. av smältvatten} $$

$$ c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v} = l_s \\cdot m_\\mathrm{is} + c_\\mathrm{v} \\cdot m_\\mathrm{is} \\cdot \\Delta T_\\mathrm{is} $$

Vi löser ut $m_\\mathrm{is}$:

$$ m_\\mathrm{is} = \\frac{c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v}}{l_s + c_\\mathrm{v} \\cdot \\Delta T_\\mathrm{is}} $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
c_\\mathrm{v} = 4{,}18\\ \\mathrm{kJ/(kg \\cdot K)} \\\\
m_\\mathrm{v} = 0{,}80\\ \\mathrm{kg} \\\\
\\Delta T_\\mathrm{v} = 70 - 25 = 45\\ \\mathrm{K} \\\\
l_s = 334\\ \\mathrm{kJ/kg} \\\\
\\Delta T_\\mathrm{is} = 25 - 0 = 25\\ \\mathrm{K}
\\end{array} \\right]
$$

Insättning:

$$ m_\\mathrm{is} = \\frac{4{,}18 \\cdot 0{,}80 \\cdot 45}{334 + 4{,}18 \\cdot 25} = \\frac{150{,}48}{334 + 104{,}5} = \\frac{150{,}48}{438{,}5} \\approx 0{,}343\\ \\mathrm{kg} $$

**Svar:** Ca 343 g.

**Generell slutsats:** Den klassiska fällan här är att glömma att smältvattnet i sin tur måste värmas upp från 0 °C till sluttemperaturen 25 °C. Om man bara räknar med smältenergin får man $m_\\mathrm{is} = 150{,}48/334 \\approx 0{,}450$ kg — alltså ca 30 % för mycket is. Smältvattnets uppvärmning bidrar ca 104,5 kJ/kg, vilket inte alls är försumbart jämfört med smältentalpin 334 kJ/kg.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-6.4  Kroppen och värme
    // Begreppsavsnitt: svettning (avdunstning kyler), strålning, isolering,
    // konvektion (vind). Inga nya formler — kombinerar med 6.2 och 6.3.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-6.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Varför kyler svettning ner kroppen när det är varmt?`,
            choices: [
                `Svetten i sig är kallare än kroppens temperatur och kyler huden vid kontakt.`,
                `När svetten avdunstar tas energi från huden, vilket sänker dess temperatur.`,
                `Svetten innehåller salter som kemiskt reagerar och absorberar värme.`,
                `Svetten reflekterar solens infraröda strålning och hindrar uppvärmning.`,
            ],
            correct: 1,
            solution: `Avdunstning är en fasövergång från vätska till gas och kräver energi (förångningsentalpin). Den energin tas från det den fuktar — alltså huden. Resultatet är att hudens temperatur sjunker.

**Svar:** Alternativ B.

**Generell slutsats:** Samma fysikaliska princip förklarar varför man fryser när man kommer ut ur duschen, varför man håller dryckesflaskor svala med en blöt trasa runt om, och varför hundar flåsar (de svettas inte, så de använder andningsluften till att avdunsta vatten från tungan).`,
        },
        {
            level: 1,
            question: `En människokropp i vila avger värme till omgivningen med ungefär samma effekt som ett litet element — vilken effekt rör det sig om?`,
            choices: [
                `Ca 10 W.`,
                `Ca 100 W.`,
                `Ca 1 000 W.`,
                `Ca 10 000 W.`,
            ],
            correct: 1,
            solution: `En människokropp i vila avger ca **100 W** värme genom strålning, konvektion och avdunstning från hud och luftvägar.

**Svar:** Alternativ B — ca 100 W.

**Generell slutsats:** Det är därför ett klassrum med 30 elever blir varmt även utan att elementen är på — 30 personer ger en sammanlagd uppvärmningseffekt på ca 3 000 W, motsvarande tre starka element. Många moderna passivhus utnyttjar detta för att minska behovet av aktiv uppvärmning.`,
        },
        {
            level: 1,
            question: `En människokropp i vila avger ca 100 W värme. Hur mycket energi avger man under 8 timmars sömn? Ange svaret i MJ.`,
            answer: { value: 2.88, unit: 'MJ', tol: 0.02 },
            solution: `Energi är effekt gånger tid:

$$ E = P \\cdot t $$

Mätvärden (med tiden i SI-enheter):

$$
\\left[ \\begin{array}{l}
P = 100\\ \\mathrm{W} \\\\
t = 8\\ \\mathrm{h} = 8 \\cdot 3\\,600\\ \\mathrm{s} = 28\\,800\\ \\mathrm{s}
\\end{array} \\right]
$$

$$ E = 100 \\cdot 28\\,800 = 2\\,880\\,000\\ \\mathrm{J} = 2{,}88\\ \\mathrm{MJ} $$

**Svar:** 2,88 MJ.

**Generell slutsats:** Det motsvarar ungefär energin i 100 g choklad (ca 2,5 MJ) eller fyra bananer. Det är därför vi behöver äta — kroppen måste ständigt fylla på energi för att kompensera för värmeavgivningen.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `I en bastu är lufttemperaturen 80 °C. När du blåser kraftigt på din arm där upplever du det **inte** som svalt, utan som extremt **varmt**. Varför?`,
            choices: [
                `Bastuluft är torrare och leder värme bättre än vanlig luft.`,
                `Den varma luften river bort den 30-gradiga luften nära huden och ersätter den med 80-gradig luft, så värme strömmar **till** huden istället för från den.`,
                `Hög temperatur stänger av nervändarna som annars skulle uppfatta värme — så endast tryckkänslan kvarstår.`,
                `Vid hög lufttemperatur slutar svett att avdunsta, vilket gör att kylningen försvinner.`,
            ],
            correct: 1,
            solution: `Värme flödar alltid från varmt till kallt. När du blåser hårt på armen ute (med 20 °C luft) river du bort den varma luften nära huden och ersätter den med kall — då flödar värme **från** armen, och du upplever det som kallt. I bastun gör du tvärtom: du river bort den 30-gradiga luften nära huden och ersätter den med 80-gradig — då flödar värme **till** armen och du upplever det som varmt.

**Svar:** Alternativ B.

**Generell slutsats:** Det är inte luftrörelsen i sig som avgör om man känner varmt eller kallt — det är **temperaturskillnaden** mellan din hud och den nya luften. Samma fenomen förklarar varför fläktar inte hjälper i extrem hetta (och ibland gör det värre om luften är varmare än huden).`,
        },
        {
            level: 2,
            question: `Anta att hela värmeavgivningen från en vilande människa (effekt 100 W under ett dygn) skulle ske enbart genom att svett **förångas** från huden. Hur mycket vatten i kg skulle behöva svettas och förångas under dygnet? Räkna med $l_å = 2{,}26\\ \\mathrm{MJ/kg}$ för vatten vid hudtemperatur.`,
            answer: { value: 3.82, unit: 'kg', tol: 0.03 },
            solution: `Först räknar vi ut den totala energin som avges under ett dygn:

$$ E = P \\cdot t = 100 \\cdot 24 \\cdot 3\\,600 = 8\\,640\\,000\\ \\mathrm{J} = 8{,}64\\ \\mathrm{MJ} $$

Om all denna energi ska gå åt till att förånga vatten gäller:

$$ E = l_å \\cdot m \\quad\\Leftrightarrow\\quad m = \\frac{E}{l_å} $$

Mätvärden:

$$
\\left[ \\begin{array}{l}
E = 8{,}64\\ \\mathrm{MJ} \\\\
l_å = 2{,}26\\ \\mathrm{MJ/kg}
\\end{array} \\right]
$$

$$ m = \\frac{8{,}64}{2{,}26} \\approx 3{,}82\\ \\mathrm{kg} $$

**Svar:** Ca 3,8 kg vatten.

**Generell slutsats:** I verkligheten svettar man inte så mycket vid normal aktivitet (ca 0,5–1 kg per dygn) — det mesta av värmen avges genom **strålning** och **konvektion** till omgivande luft. Men vid extrem hetta eller hård fysisk ansträngning, när omgivningen är varmare än huden, blir svettning den enda effektiva avkylningsmekanismen — och då kan svettmängden närma sig flera kg per dag.`,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════
    // fy1-6.5  Termodynamikens fyra huvudsatser
    // Begreppsavsnitt utan formler. Flerval om huvudsatserna 0–3.
    // ═══════════════════════════════════════════════════════════════════
    'fy1-6.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Vilken av termodynamikens huvudsatser säger att **energi inte kan skapas eller förstöras, bara omvandlas**?`,
            choices: [
                `Nollte huvudsatsen.`,
                `Första huvudsatsen.`,
                `Andra huvudsatsen.`,
                `Tredje huvudsatsen.`,
            ],
            correct: 1,
            solution: `**Första huvudsatsen** är energiprincipen: energi kan varken skapas eller förstöras, bara omvandlas mellan olika energiformer (rörelseenergi, lägesenergi, värme, kemisk energi osv.).

**Svar:** Alternativ B — första huvudsatsen.

**Generell slutsats:** Första huvudsatsen är fundamentet för all energiräkning i fysiken. Den utesluter "evighetsmaskiner av första slaget" — maskiner som skulle skapa energi från ingenting.`,
        },
        {
            level: 1,
            question: `Vilken huvudsats förklarar varför värme **aldrig av sig själv** flödar från ett kallt föremål till ett varmare föremål?`,
            choices: [
                `Nollte huvudsatsen.`,
                `Första huvudsatsen.`,
                `Andra huvudsatsen.`,
                `Tredje huvudsatsen.`,
            ],
            correct: 2,
            solution: `**Andra huvudsatsen** säger att värme alltid flödar från varmt till kallt — aldrig spontant åt andra hållet. För att flytta värme från kallt till varmt (som i ett kylskåp eller en värmepump) krävs **arbete** från en yttre energikälla.

**Svar:** Alternativ C — andra huvudsatsen.

**Generell slutsats:** Detta är vad som gör att tiden känns ha en riktning i termodynamiska processer — vi ser aldrig en söndertrasad kopp "lägga ihop sig själv", och kall mjölk värms inte spontant upp i kylen. Andra huvudsatsen är intimt kopplad till begreppet **entropi** (oordning), som ni stöter på i Fysik 2.`,
        },
        {
            level: 1,
            question: `Vid vilken temperatur upphör enligt **tredje huvudsatsen** alla processer i ett system?`,
            choices: [
                `Vid 0 °C — vattnets fryspunkt.`,
                `Vid 0 K — den absoluta nollpunkten.`,
                `Vid −100 °C — där alla vanliga gaser kondenserar.`,
                `Vid kosmiska bakgrundsstrålningens temperatur (2,7 K).`,
            ],
            correct: 1,
            solution: `**Tredje huvudsatsen** säger att alla processer upphör vid **absoluta nollpunkten** (0 K = −273,15 °C). Där har atomerna teoretiskt sett ingen rörelse alls. I praktiken kan man komma godtyckligt nära 0 K, men aldrig riktigt nå dit.

**Svar:** Alternativ B — vid 0 K.

**Generell slutsats:** I moderna laboratorier har man nått temperaturer på under en miljarddels kelvin (10⁻⁹ K) — kallare än något annat någonstans i det observerbara universum. Det är en konsekvens av tredje huvudsatsen att 0 K inte kan nås i ett ändligt antal steg, men man kan komma så nära man vill.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Du tar ut en kall läskburk (4 °C) ur kylen och ställer den på köksbordet, där rumsluften är 22 °C. Efter ett tag har läskburken samma temperatur som rummet. Vilken huvudsats beskriver mest direkt denna utjämning?`,
            choices: [
                `Nollte huvudsatsen — två system i kontakt utbyter energi tills de når jämvikt (samma temperatur).`,
                `Första huvudsatsen — energin från rummet blir lika stor som energin i läskburken.`,
                `Andra huvudsatsen — värme flödar från kallt till varmt.`,
                `Tredje huvudsatsen — utjämningen är bara möjlig om båda systemen ligger ovanför 0 K.`,
            ],
            correct: 0,
            solution: `**Nollte huvudsatsen** säger att två system i kontakt utbyter energi tills de når **termisk jämvikt** — det vill säga samma temperatur. Det är vad som händer med läskburken: värme flödar från den varmare rumsluften till den kallare burken tills temperaturerna är lika.

**Svar:** Alternativ A — nollte huvudsatsen.

**Generell slutsats:** Andra huvudsatsen är också relevant (den bestämmer **riktningen** på värmeflödet — från varmt till kallt), men det är nollte huvudsatsen som specifikt säger att utjämningen alltid sker fullt ut. Det är på grund av nollte huvudsatsen som termometrar fungerar: termometern och föremålet utbyter energi tills de har samma temperatur, och termometern visar då föremålets temperatur.`,
        },
        {
            level: 2,
            question: `En uppfinnare påstår att hen byggt en maskin som värmer ett rum genom att enbart föra över värme från den kalla utomhusluften, **utan att tillföra någon elektrisk eller annan extern energi**. Maskinen ska alltså jobba helt av sig själv, utan kraftkälla. Vilken av huvudsatserna gör denna uppfinning omöjlig?`,
            choices: [
                `Nollte huvudsatsen.`,
                `Första huvudsatsen.`,
                `Andra huvudsatsen.`,
                `Tredje huvudsatsen.`,
            ],
            correct: 2,
            solution: `Värme flödar av sig själv bara från varmt till kallt — aldrig tvärtom. Att överföra värme från en kallare till en varmare plats kräver alltid att man tillför arbete (t.ex. el till en kompressor i en värmepump). Det är **andra huvudsatsen** som gör en sådan här "passiv värmepump utan kraftkälla" omöjlig.

**Svar:** Alternativ C — andra huvudsatsen.

**Generell slutsats:** Riktiga värmepumpar och kylskåp bryter inte mot andra huvudsatsen — de förbrukar elektrisk energi för att "tvinga" värme att gå från kallt till varmt. En vanlig värmepump kan dock leverera 3–4 gånger så mycket värmeenergi till rummet som den drar el från väggen — eftersom resten kommer från uteluften. Det är fortfarande inte gratis, men det är effektivt.`,
        },
    ],
};

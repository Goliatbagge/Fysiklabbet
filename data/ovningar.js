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

// ── Kopplingsschema (makeCircuit) ────────────────────────────────────
//
// Renderar ett kopplingsschema som inline-SVG i svensk lärobokstil
// (IEC-symboler: resistor = rektangel, batteri = lång+kort streck,
// lampa = cirkel med kryss, voltmeter/amperemeter = V/A i cirkel).
//
// Kretsen är en rektangel. Komponenter sitter på topp-ledningen i
// serie (vänster → höger). Batteriet sitter mitt på underledningen.
// En av komponenterna i serien kan vara av typen 'parallel' med en
// lista av branches — varje branch är en lista av komponenter som
// ritas som en parallell-gren stackad nedanför topp-ledningen.
//
//   opts = {
//     width?,                         // total bredd, default beräknas från innehåll
//     source: {                       // spänningskälla på underledningen (mitten)
//       label?, value?                // 'U' / '12 V' → "U = 12 V"
//     },
//     components: [
//       { type: 'resistor',  label?, value? },     // R₁ = 10 Ω
//       { type: 'bulb',      label?, value? },     // L₁
//       { type: 'switch',    open?: true },        // strömbrytare
//       { type: 'ammeter',   label?: 'A' },        // i serie
//       { type: 'voltmeter', label?: 'V' },        // direkt på ledningen (sällan)
//       { type: 'parallel', branches: [
//         [ { type: 'bulb', label: 'L_1' } ],
//         [ { type: 'resistor', label: 'R_2', value: '5 Ω' } ]
//       ]}
//     ]
//   }
//
// Begränsning: max ETT parallel-element i components-arrayen. För mer
// komplexa topologier (Kirchhoff-bryggor) krävs egen inline-SVG.

function makeCircuit(opts) {
    // segW väljs efter krets-topologi:
    //   - Ren seriekrets: 72 px → kompakt, lagom luft mellan komponenter
    //   - Med parallel-sektion: 88 px → mer luft så förgreningsnoderna
    //     inte ligger trångt mot intilliggande seriekomponenter
    // (Sätts efter att parallel-sektionen detekterats nedan.)
    const padX = 26;
    const padTop = 38;
    const padBot = 50;
    const branchGapY = 58;
    const stroke = '#0f1620';
    const wireW = 1.8;

    // Label-formatering. Variabler (U, R, I, Q, F) renderas kursivt.
    // Etiketter som identifierar enskilda komponenter (L för lampa,
    // A för amperemeter, V för voltmeter) är INTE fysikaliska
    // variabler — de står rakt. Vilken konvention som gäller bestäms
    // per komponenttyp i UPRIGHT_LABEL nedan.
    const subs = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };
    const UPRIGHT_LABEL = { bulb: true, ammeter: true, voltmeter: true, switch: true };
    function fmtVar(s, upright) {
        const italicOpen = upright ? '' : '<tspan font-style="italic">';
        const italicClose = upright ? '' : '</tspan>';
        const m = s.match(/^([A-Za-zα-ωΑ-Ω])_(\w+)$/);
        if (m) {
            const letter = m[1], sub = m[2];
            if (/^\d+$/.test(sub)) {
                const ssub = sub.split('').map(c => subs[c] || c).join('');
                return `${italicOpen}${letter}${italicClose}${ssub}`;
            }
            return `${italicOpen}${letter}${italicClose}<tspan baseline-shift="sub" font-size="0.72em">${sub}</tspan>`;
        }
        if (/^[A-Za-z]$/.test(s)) return `${italicOpen}${s}${italicClose}`;
        return s;
    }
    function fmtLabel(c, upright) {
        if (!c) return '';
        const lbl = c.label ? fmtVar(c.label, upright) : '';
        const val = c.value || '';
        if (lbl && val) return `${lbl} = ${val}`;
        return lbl || val;
    }

    // Symbol-rendering — varje funktion ritar centrerad på (x, y).
    // Symboler är 36 px breda och fyllda med vitt för att maska över
    // topp-ledningens linje som dras under.
    function symResistor(x, y) {
        return `<rect x="${x - 20}" y="${y - 8}" width="40" height="16" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/>`;
    }
    function symBulb(x, y) {
        const r = 12;
        const d = r * 0.707;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/>` +
               `<line x1="${x - d}" y1="${y - d}" x2="${x + d}" y2="${y + d}" stroke="${stroke}" stroke-width="${wireW}"/>` +
               `<line x1="${x - d}" y1="${y + d}" x2="${x + d}" y2="${y - d}" stroke="${stroke}" stroke-width="${wireW}"/>`;
    }
    function symSwitch(x, y, open) {
        const d = 2.5;
        const ly = open ? y - 12 : y;
        return `<rect x="${x - 16}" y="${y - 14}" width="32" height="${open ? 18 : 6}" fill="#fff" stroke="none"/>` +
               `<circle cx="${x - 12}" cy="${y}" r="${d}" fill="${stroke}"/>` +
               `<circle cx="${x + 12}" cy="${y}" r="${d}" fill="${stroke}"/>` +
               `<line x1="${x - 12}" y1="${y}" x2="${x + 12}" y2="${ly}" stroke="${stroke}" stroke-width="${wireW}"/>`;
    }
    function symMeter(x, y, letter) {
        const r = 13;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/>` +
               `<text x="${x}" y="${y + 5}" font-size="15" font-weight="600" fill="${stroke}" text-anchor="middle">${letter}</text>`;
    }
    // Batteri-strecken sitter vid x ± batGapH (gap = batGapH * 2 mellan dem).
    // Underledningen ska BRYTAS i detta gap — batteriet är visuellt ett gap
    // i strömkretsen (IEC-standard). Underledningen ritas i två segment
    // som slutar/börjar vid streckens position.
    const batGapH = 4;
    function symBatteryH(x, y) {
        return `<line x1="${x - batGapH}" y1="${y - 14}" x2="${x - batGapH}" y2="${y + 14}" stroke="${stroke}" stroke-width="2.6"/>` +
               `<line x1="${x + batGapH}" y1="${y - 8}" x2="${x + batGapH}" y2="${y + 8}" stroke="${stroke}" stroke-width="2.6"/>`;
    }
    function drawComp(c, x, y) {
        switch (c.type) {
            case 'resistor':  return symResistor(x, y);
            case 'bulb':      return symBulb(x, y);
            case 'switch':    return symSwitch(x, y, c.open);
            case 'ammeter':   return symMeter(x, y, 'A');
            case 'voltmeter': return symMeter(x, y, 'V');
            default:          return '';
        }
    }
    function drawDot(x, y) {
        return `<circle cx="${x}" cy="${y}" r="2.6" fill="${stroke}"/>`;
    }
    function drawWire(x1, y1, x2, y2) {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${wireW}" stroke-linecap="square"/>`;
    }
    function drawText(x, y, t, anchor) {
        return `<text x="${x}" y="${y}" font-size="16" fill="${stroke}" text-anchor="${anchor || 'middle'}">${t}</text>`;
    }

    // Layout: hitta ev. parallel-sektion
    const comps = opts.components || [];
    let pIdx = -1, nBr = 1, maxBrLen = 1;
    for (let i = 0; i < comps.length; i++) {
        if (comps[i].type === 'parallel') {
            pIdx = i;
            nBr = comps[i].branches.length;
            for (const br of comps[i].branches) maxBrLen = Math.max(maxBrLen, br.length);
            break;
        }
    }
    const segW = pIdx >= 0 ? 88 : 72;  // bredare slotbredd när parallel-zon finns
    const before = pIdx >= 0 ? pIdx : comps.length;
    const after = pIdx >= 0 ? comps.length - 1 - pIdx : 0;
    const pSlots = pIdx >= 0 ? maxBrLen : 0;
    const totalSlots = before + pSlots + after;

    // Halv-bredd för komponenttyper (utan parallel-inset).
    function halfWBase(c) {
        if (!c) return 0;
        switch (c.type) {
            case 'parallel': return segW / 2;
            case 'resistor': return 20;
            case 'bulb': return 12;
            case 'switch': return 16;
            case 'ammeter':
            case 'voltmeter': return 14;
            default: return 20;
        }
    }

    // Parallel-zonens "naturliga" bredd bestäms av den bredaste grenen
    // (antalet komponenter × inre slotbredd + kantmarginal). Om slot-
    // bredden för parallel-zonen (pSlots × segW) är bredare än naturlig,
    // krympas parallel-zonen så luften vid kanterna blir lika med inre.
    const branchSegW = 60;
    const branchEdgeMargin = 36;
    let parallelInset = 0;
    let parallelNaturalW = 0;
    if (pIdx >= 0) {
        let maxBranchInnerW = 0;
        for (const br of comps[pIdx].branches) {
            if (br.length === 0) continue;
            const firstHalf = halfWBase(br[0]);
            const lastHalf = halfWBase(br[br.length - 1]);
            const inner = (br.length - 1) * branchSegW + firstHalf + lastHalf;
            maxBranchInnerW = Math.max(maxBranchInnerW, inner);
        }
        parallelNaturalW = maxBranchInnerW + 2 * branchEdgeMargin;
        const slotPW = pSlots * segW;
        parallelInset = Math.max(0, (slotPW - parallelNaturalW) / 2);
    }

    // Ren parallellkrets (inga seriekomponenter före/efter parallell-zonen):
    // ramens sidoräls ska sammanfalla med parallell-sektionens noder, så att
    // batteriet sitter DIREKT i bottenledningen mellan grenarna — inga döda
    // ledningsslingor ut mot ramkanten. Kretsar med seriekomponenter (t.ex.
    // R₃ i serie med en parallellkoppling) behåller den bredare ramen.
    const isPureParallel = pIdx >= 0 && before === 0 && after === 0;

    // W krymps med 2*parallelInset eftersom parallel-zonen blir smalare.
    let W = opts.width != null ? opts.width : Math.max(300, padX * 2 + totalSlots * segW + 56 - 2 * parallelInset);
    const topY = padTop;
    // botY: i parallellkretsar ska luften ner till batteriledningen vara
    // lika stor som mellanrummet mellan grenarna (branchGapY) — annars blir
    // det onödigt mycket "luft" under understa grenen. Ren seriekrets (ingen
    // parallel-sektion) behåller sin tidigare rektangelhöjd (110 px).
    const botY = pIdx >= 0
        ? padTop + nBr * branchGapY
        : padTop + 110;
    const H = botY + padBot;
    let railLeft = padX + 4;
    let railRight = W - padX - 4;
    if (isPureParallel) {
        // Räls = parallell-sektionens noder. Bredden = grenarnas naturliga
        // bredd (komponenter + branchEdgeMargin på var sida). Batteriet
        // hamnar i mitten (bx = W/2) precis mellan rälsarna.
        railRight = railLeft + parallelNaturalW;
        W = railRight + padX + 4;
    }

    // halfW för bounding-box-centrering. Parallel-elementets effektiva
    // halv-bredd är efter inset-krympningen.
    function halfW(c) {
        if (c && c.type === 'parallel') return segW / 2 - parallelInset;
        return halfWBase(c);
    }

    // Slot-positioner längs topp-ledningen — startX väljs så att kretsens
    // content-bounding-box (yttersta vänsterkant till yttersta högerkant)
    // centreras över railLeft–railRight, inte komponenternas geometriska
    // centroider. Annars hamnar parallel-sektionens förgreningsnoder
    // ojämnt fördelade mot ramen.
    const totalCompW = totalSlots > 1 ? (totalSlots - 1) * segW : 0;
    const leftHalf = halfW(comps[0]);
    const rightHalf = halfW(comps[comps.length - 1]);
    const startX = (railLeft + railRight - totalCompW + leftHalf - rightHalf) / 2;
    // Komponenter EFTER parallel-zonen (sista slot pIdx+pSlots-1) skiftar
    // åt vänster med 2*parallelInset eftersom parallel-zonen tog mindre
    // plats än sin slot-allokering. OBS: pStartX/pEndX själva använder
    // sx(before) och sx(before+pSlots-1) — de är INOM parallel-zonen och
    // ska INTE skiftas, annars kollapsar parallel-zonen dubbelt.
    const sx = i => {
        let pos = startX + i * segW;
        if (pIdx >= 0 && i > pIdx + pSlots - 1) pos -= 2 * parallelInset;
        return pos;
    };

    let body = '';

    // Batteriets x-position behövs i förväg så underledningen kan brytas
    // i gapet mellan + och − strecket.
    const hasSource = !!opts.source;
    const bx = hasSource ? W / 2 : null;

    // 1. Yttre ram: topp, botten (bryts vid batteriet), vänster, höger
    body += drawWire(railLeft, topY, railRight, topY);
    if (hasSource) {
        body += drawWire(railLeft, botY, bx - batGapH, botY);
        body += drawWire(bx + batGapH, botY, railRight, botY);
    } else {
        body += drawWire(railLeft, botY, railRight, botY);
    }
    body += drawWire(railLeft, topY, railLeft, botY);
    body += drawWire(railRight, topY, railRight, botY);

    // 2. Seriekomponenter före parallel-sektionen (topp-ledning)
    for (let i = 0; i < before; i++) {
        const x = sx(i);
        body += drawComp(comps[i], x, topY);
        const lbl = fmtLabel(comps[i], UPRIGHT_LABEL[comps[i].type]);
        if (lbl) body += drawText(x, topY - 16, lbl);
    }

    // 3. Parallel-sektion
    if (pIdx >= 0) {
        const par = comps[pIdx];
        // pStartX/pEndX dras in med parallelInset så förgreningsnoderna
        // hamnar precis vid branchEdgeMargin från första/sista komponent
        // i den bredaste grenen.
        let pStartX = sx(before) - segW / 2 + parallelInset;
        let pEndX = sx(before + pSlots - 1) + segW / 2 - parallelInset;
        if (isPureParallel) { pStartX = railLeft; pEndX = railRight; }
        for (let bi = 0; bi < nBr; bi++) {
            const branch = par.branches[bi];
            const by = bi === 0 ? topY : topY + branchGapY * bi;
            if (bi > 0) {
                // Vertikala anslutningar från topp-ledningen ner till denna gren
                body += drawWire(pStartX, topY, pStartX, by);
                body += drawWire(pEndX, topY, pEndX, by);
                // Horisontell ledning för denna gren
                body += drawWire(pStartX, by, pEndX, by);
                if (bi === 1) {
                    body += drawDot(pStartX, topY);
                    body += drawDot(pEndX, topY);
                }
            }
            // Rita branch-komponenter med fast inre slot-bredd (60 px),
            // centrerat över parallel-bredden. Annars sprids komponenterna
            // ut över hela parallel-bredden vilket ger glesa "tomma" rader.
            const branchSegW = 60;
            const branchCenterX = (pStartX + pEndX) / 2;
            const firstBranchX = branchCenterX - (branch.length - 1) * branchSegW / 2;
            for (let j = 0; j < branch.length; j++) {
                const cx = firstBranchX + j * branchSegW;
                body += drawComp(branch[j], cx, by);
                const lbl = fmtLabel(branch[j], UPRIGHT_LABEL[branch[j].type]);
                if (lbl) {
                    if (bi === 0) body += drawText(cx, by - 16, lbl);
                    else body += drawText(cx, by + 26, lbl);
                }
            }
        }
    }

    // 4. Seriekomponenter efter parallel-sektionen
    if (after > 0) {
        for (let i = 0; i < after; i++) {
            const x = sx(before + pSlots + i);
            const c = comps[pIdx + 1 + i];
            body += drawComp(c, x, topY);
            const lbl = fmtLabel(c, UPRIGHT_LABEL[c.type]);
            if (lbl) body += drawText(x, topY - 16, lbl);
        }
    }

    // 5. Batteri mitt på underledningen (bx är förberäknad ovan).
    // Batterietiketten är typiskt 'U' eller 'U = 12 V' — variabel → kursiv.
    if (hasSource) {
        body += symBatteryH(bx, botY);
        const lbl = fmtLabel(opts.source, false);
        if (lbl) body += drawText(bx, botY + 34, lbl);
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:${W}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${body}</svg>`;
}

// makeBridge(opts) — ritar en bryggkoppling (Wheatstone-stil) i samma
// lärobokstil som makeCircuit. Två spänningsdelargrenar mellan vänster nod
// (A = hela vänsterrälsen) och höger nod (B = högerrälsen), med ett batteri
// över dem på toppledningen. Mittnoderna P (övre grenen) och Q (undre grenen)
// märks ut med punkt + bokstav. Använd för potentialvandring, "potential/
// spänning mellan P och Q" och bryggproblem — där serie/parallell-förenkling
// INTE räcker.
//
// opts = {
//   source: { label:'U', value:'12 V' },                       // batteri på toppen
//   upper:  [ {type:'resistor',label:'R_1',value:'25 Ω'}, {…R_2} ],  // gren A–P–B
//   lower:  [ {…R_3}, {…R_4} ],                                 // gren A–Q–B
//   bridge: {type:'resistor'|'voltmeter'|'wire', …} | null,     // mellan P och Q
//   pLabel: 'P', qLabel: 'Q',
//   ground: 'A' | 'B' | null,    // jordningssymbol (0 V) i nedre vänster/höger hörn
//   width: number                // valfri (default 330)
// }
function makeBridge(opts) {
    const stroke = '#0f1620';
    const wireW = 1.8;
    const batGapH = 4;
    const subs = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };
    const UPRIGHT = { bulb: true, ammeter: true, voltmeter: true, switch: true };
    function fmtVar(s, upright) {
        const io = upright ? '' : '<tspan font-style="italic">';
        const ic = upright ? '' : '</tspan>';
        const m = s.match(/^([A-Za-zα-ωΑ-Ω])_(\w+)$/);
        if (m) {
            const letter = m[1], sub = m[2];
            if (/^\d+$/.test(sub)) return `${io}${letter}${ic}${sub.split('').map(c => subs[c] || c).join('')}`;
            return `${io}${letter}${ic}<tspan baseline-shift="sub" font-size="0.72em">${sub}</tspan>`;
        }
        if (/^[A-Za-z]$/.test(s)) return `${io}${s}${ic}`;
        return s;
    }
    function fmtLabel(c, upright) {
        if (!c) return '';
        const lbl = c.label ? fmtVar(c.label, upright) : '';
        const val = c.value || '';
        if (lbl && val) return `${lbl} = ${val}`;
        return lbl || val;
    }
    function symResistor(x, y)  { return `<rect x="${x - 20}" y="${y - 8}" width="40" height="16" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/>`; }
    function symResistorV(x, y) { return `<rect x="${x - 8}" y="${y - 20}" width="16" height="40" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/>`; }
    function symBulb(x, y) { const r = 12, d = r * 0.707; return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/><line x1="${x - d}" y1="${y - d}" x2="${x + d}" y2="${y + d}" stroke="${stroke}" stroke-width="${wireW}"/><line x1="${x - d}" y1="${y + d}" x2="${x + d}" y2="${y - d}" stroke="${stroke}" stroke-width="${wireW}"/>`; }
    function symMeter(x, y, letter) { const r = 13; return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${stroke}" stroke-width="${wireW}"/><text x="${x}" y="${y + 5}" font-size="15" font-weight="600" fill="${stroke}" text-anchor="middle">${letter}</text>`; }
    function symBatteryH(x, y) { return `<line x1="${x - batGapH}" y1="${y - 14}" x2="${x - batGapH}" y2="${y + 14}" stroke="${stroke}" stroke-width="2.6"/><line x1="${x + batGapH}" y1="${y - 8}" x2="${x + batGapH}" y2="${y + 8}" stroke="${stroke}" stroke-width="2.6"/>`; }
    function wire(x1, y1, x2, y2) { return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${wireW}" stroke-linecap="square"/>`; }
    function dot(x, y) { return `<circle cx="${x}" cy="${y}" r="2.6" fill="${stroke}"/>`; }
    function text(x, y, t, anchor) { return `<text x="${x}" y="${y}" font-size="16" fill="${stroke}" text-anchor="${anchor || 'middle'}">${t}</text>`; }
    function gnd(x, y) {
        return wire(x, y, x, y + 14) +
               `<line x1="${x - 11}" y1="${y + 14}" x2="${x + 11}" y2="${y + 14}" stroke="${stroke}" stroke-width="${wireW}"/>` +
               `<line x1="${x - 7}" y1="${y + 18}" x2="${x + 7}" y2="${y + 18}" stroke="${stroke}" stroke-width="${wireW}"/>` +
               `<line x1="${x - 3}" y1="${y + 22}" x2="${x + 3}" y2="${y + 22}" stroke="${stroke}" stroke-width="${wireW}"/>`;
    }
    function drawComp(c, x, y, vertical) {
        if (!c) return '';
        switch (c.type) {
            case 'resistor':  return vertical ? symResistorV(x, y) : symResistor(x, y);
            case 'bulb':      return symBulb(x, y);
            case 'ammeter':   return symMeter(x, y, 'A');
            case 'voltmeter': return symMeter(x, y, 'V');
            default:          return '';
        }
    }

    const W = opts.width != null ? opts.width : 330;
    const xL = 46, xR = W - 46, xM = (xL + xR) / 2;
    const yT = 42, yU = 104, yLo = 176;
    const grd = opts.ground || null;
    const H = yLo + (grd ? 56 : 40);

    let b = '';
    // Vänster- och högerräls (noderna A respektive B)
    b += wire(xL, yT, xL, yLo);
    b += wire(xR, yT, xR, yLo);
    // Toppledning med batteri
    if (opts.source) {
        b += wire(xL, yT, xM - batGapH, yT);
        b += wire(xM + batGapH, yT, xR, yT);
        b += symBatteryH(xM, yT);
        const lbl = fmtLabel(opts.source, false);
        if (lbl) b += text(xM, yT - 16, lbl);
    } else {
        b += wire(xL, yT, xR, yT);
    }
    // Övre grenen (A–P–B) och undre grenen (A–Q–B, sammanfaller med nedre kant)
    b += wire(xL, yU, xR, yU);
    b += wire(xL, yLo, xR, yLo);
    const xU0 = (xL + xM) / 2, xU1 = (xM + xR) / 2;
    const u = opts.upper || [], lo = opts.lower || [];
    if (u[0]) { b += drawComp(u[0], xU0, yU); const l = fmtLabel(u[0], UPRIGHT[u[0].type]); if (l) b += text(xU0, yU - 15, l); }
    if (u[1]) { b += drawComp(u[1], xU1, yU); const l = fmtLabel(u[1], UPRIGHT[u[1].type]); if (l) b += text(xU1, yU - 15, l); }
    if (lo[0]) { b += drawComp(lo[0], xU0, yLo); const l = fmtLabel(lo[0], UPRIGHT[lo[0].type]); if (l) b += text(xU0, yLo + 26, l); }
    if (lo[1]) { b += drawComp(lo[1], xU1, yLo); const l = fmtLabel(lo[1], UPRIGHT[lo[1].type]); if (l) b += text(xU1, yLo + 26, l); }
    // Bryggan mellan P och Q (valfri komponent; saknas = öppen, t.ex. ideal voltmeter)
    if (opts.bridge) {
        b += wire(xM, yU, xM, yLo);
        const mid = (yU + yLo) / 2;
        b += drawComp(opts.bridge, xM, mid, true);
        const l = fmtLabel(opts.bridge, UPRIGHT[opts.bridge.type]);
        if (l) b += text(xM + 22, mid + 5, l, 'start');
    }
    // Mittnoderna P och Q
    b += dot(xM, yU) + dot(xM, yLo);
    b += text(xM - 11, yU - 9, opts.pLabel || 'P', 'end');
    b += text(xM - 11, yLo + 18, opts.qLabel || 'Q', 'end');
    // Jordning (0 V)
    if (grd === 'A') { b += gnd(xL, yLo); b += text(xL, yLo + 48, '0 V'); }
    else if (grd === 'B') { b += gnd(xR, yLo); b += text(xR, yLo + 48, '0 V'); }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:${W}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${b}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════
//  MEKANIK-FIGURER (Fysik 2, kapitel 1)
//
//  Inline-SVG-helpers som ILLUSTRERAR mekanikuppgifter: kaströrelse,
//  kraftmoment/hävstång, tippande kroppar, cirkulär rörelse, konisk
//  pendel, gunga och loop. Samma pappersstil som makeForceDiagram:
//  vit botten, bläck #0f1620, accent-röd #c8324a för krafter/hastighet,
//  grå #8a8579 för hjälp- och måttlinjer, Poppins. ALDRIG title case.
//
//  REGEL: en uppgift om en rumslig/geometrisk uppställning (kast, kurva,
//  hävstång, lutning, pendel) ska ha en figur — beskriv den inte bara i
//  text. Avslöja aldrig svaret i figuren (okänd vinkel/kraft ritas inte
//  ut med sitt värde). Se OVNINGAR.md, "Figurer ska ritas, inte beskrivas".
//
//  ⚠️ ETIKETTER FÅR INTE LIGGA PÅ LINJER/FIGURDELAR. Värden och
//  beteckningar offsettas vinkelrätt UT från den arm/balk/linje de hör
//  till — aldrig ovanpå den. Den vita halon (sceneText) är ett skyddsnät
//  för korsningar med TUNNA hjälplinjer, inte en ursäkt att lägga text på
//  en tjock arm/kontur. Se särskilt upp med diagonala armar/stegar där en
//  enkel lodrät offset annars hamnar mitt på linjen.
// ═══════════════════════════════════════════════════════════════════

const SCENE_INK = '#0f1620';
const SCENE_ACCENT = '#c8324a';
const SCENE_MUTED = '#8a8579';
const SCENE_BLUE = '#1c3d6b';
const SCENE_SUBS = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };

function sceneWrap(W, H, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(+W).toFixed(1)} ${(+H).toFixed(1)}" style="max-width:${Math.round(W)}px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif">${body}</svg>`;
}

// Kursiv variabel + subscript: 'F_G' → kursiv F + rak nedsänkt G,
// 'v_0' → v₀, 'mg' → kursivt. Enheter/tal lämnas orörda.
function sceneVar(s) {
    s = String(s);
    const m = s.match(/^([A-Za-zα-ωΑ-Ω])_(\w+)$/);
    if (m) {
        const letter = m[1], sub = m[2];
        if (/^\d+$/.test(sub)) return `<tspan font-style="italic">${letter}</tspan>${sub.split('').map(c => SCENE_SUBS[c] || c).join('')}`;
        return `<tspan font-style="italic">${letter}</tspan><tspan baseline-shift="sub" font-size="0.72em">${sub}</tspan>`;
    }
    if (/^[A-Za-zα-ωΑ-Ω]+$/.test(s)) return `<tspan font-style="italic">${s}</tspan>`;
    return s;
}

// Hela etiketten: variabeldelen före ' = ' kursiveras, resten (värde +
// enhet) lämnas rak. 'F_G = 25 N' → kursiv F, sub G, " = 25 N".
function sceneQty(s) {
    s = String(s);
    const i = s.indexOf(' = ');
    if (i >= 0) return sceneVar(s.slice(0, i)) + ' = ' + s.slice(i + 3);
    return sceneVar(s);
}

function sceneText(x, y, t, o) {
    o = o || {};
    // Vit halo bakom texten (paint-order: stroke) så etiketter alltid är
    // läsbara även när de ligger över en linje/kurva. Stäng av med halo:false.
    const halo = o.halo === false ? '' : ` stroke="#fff" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`;
    return `<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-family="Poppins,sans-serif" font-size="${o.size || 14}" fill="${o.color || SCENE_INK}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="${o.baseline || 'middle'}"${o.weight ? ` font-weight="${o.weight}"` : ''}${halo}>${t}</text>`;
}

// Pil från (x1,y1) till (x2,y2). o.color, o.width, o.dash, o.head.
function sceneArrow(x1, y1, x2, y2, o) {
    o = o || {};
    const color = o.color || SCENE_ACCENT;
    const w = o.width || 2.4;
    const dash = o.dash ? ` stroke-dasharray="${o.dash}"` : '';
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const head = o.head || 9;
    const hx1 = x2 - head * Math.cos(ang - Math.PI / 7);
    const hy1 = y2 - head * Math.sin(ang - Math.PI / 7);
    const hx2 = x2 - head * Math.cos(ang + Math.PI / 7);
    const hy2 = y2 - head * Math.sin(ang + Math.PI / 7);
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}"${dash} stroke-linecap="round"/>` +
           `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${hx1.toFixed(1)},${hy1.toFixed(1)} ${hx2.toFixed(1)},${hy2.toFixed(1)}" fill="${color}"/>`;
}

// Måttlinje med dubbelpil (grå) + etikett. Vid lodräta mått roteras
// etiketten 90° så den får plats i smalt utrymme.
function sceneDim(x1, y1, x2, y2, label, o) {
    o = o || {};
    const color = SCENE_MUTED, head = 6;
    const ang = Math.atan2(y2 - y1, x2 - x1);
    function hd(x, y, a) {
        const a1 = a - Math.PI / 7, a2 = a + Math.PI / 7;
        return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(x - head*Math.cos(a1)).toFixed(1)},${(y - head*Math.sin(a1)).toFixed(1)} ${(x - head*Math.cos(a2)).toFixed(1)},${(y - head*Math.sin(a2)).toFixed(1)}" fill="${color}"/>`;
    }
    let s = `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="1.3"/>`;
    s += hd(x1, y1, ang + Math.PI) + hd(x2, y2, ang);
    const vertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    if (vertical && o.rotate !== false) {
        const lx = (x1 + x2) / 2 + (o.offX != null ? o.offX : -7);
        const ly = (y1 + y2) / 2;
        s += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" transform="rotate(-90 ${lx.toFixed(1)} ${ly.toFixed(1)})" font-family="Poppins,sans-serif" font-size="13" fill="${color}" text-anchor="middle" dominant-baseline="middle" stroke="#fff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">${label}</text>`;
    } else {
        const mx = (x1 + x2) / 2 + (o.offX || 0);
        const my = (y1 + y2) / 2 + (o.offY != null ? o.offY : -7);
        s += sceneText(mx, my, label, { color, size: 13 });
    }
    return s;
}

// Skraffad marklinje från x0 till x1 på höjd y (mark nedanför).
function sceneGround(x0, x1, y) {
    let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${SCENE_INK}" stroke-width="1.6"/>`;
    for (let xs = x0 + 6; xs < x1; xs += 12) {
        s += `<line x1="${xs}" y1="${y}" x2="${xs - 7}" y2="${y + 8}" stroke="${SCENE_INK}" stroke-width="1"/>`;
    }
    return s;
}

// Vinkelbåge med etikett kring (cx,cy), radie r, från a0 till a1 (rad,
// SVG-konvention med y nedåt). Grå hjälpfärg.
function sceneAngleArc(cx, cy, r, a0, a1, label) {
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
    const sweep = a1 > a0 ? 1 : 0;
    let s = `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.4" fill="none"/>`;
    const am = (a0 + a1) / 2, lr = r + 13;
    if (label) s += sceneText(cx + lr * Math.cos(am), cy + lr * Math.sin(am), label, { color: SCENE_MUTED, size: 13 });
    return s;
}

// ── Kaströrelse (makeProjectile) ─────────────────────────────────────
//
// Ritar en kastbana (parabel) i pappersstil. Två lägen:
//   kind: 'angle'      — sned kast från marken med given utgångsvinkel.
//   kind: 'horizontal' — vågrätt kast från plattform/klippa/torn.
//
//   opts = {
//     width,                 // default 480
//     kind,                  // 'angle' | 'horizontal'
//     // --- kind 'angle' ---
//     angle,                 // utgångsvinkel i grader
//     v0Label,               // 'v_0 = 18 m/s' (variabeln kursiveras)
//     apex,                  // true → markera stighöjd (streckad lodlinje)
//     apexLabel,             // default 'y_max'
//     rangeLabel,            // måttlinje under hela kastvidden (t.ex. 'x_max')
//     wall: { atFracX, hFrac, label },  // hinder: andel av kastvidd / av stighöjd
//     // --- kind 'horizontal' ---
//     platformH,             // klippans/tornets höjd i px (default 150)
//     heightLabel,           // 'h = 10 m' (lodrät måttlinje vänster)
//     distLabel,             // 'x = ?' (vågrät måttlinje längs marken)
//     objLabel,              // valfri etikett vid startpunkten
//   }
function makeProjectile(opts) {
    const W = opts.width || 480;
    const padR = 40;
    let body = '';

    if (opts.kind === 'horizontal') {
        const platformH = opts.platformH || 150;
        const topY = 34;
        const cliffLeft = 58, cliffRight = 108;
        const R = W - cliffRight - padR - 10;
        const groundY = topY + platformH;
        const H = groundY + 46;
        // klippa/torn
        body += `<rect x="${cliffLeft}" y="${topY}" width="${cliffRight - cliffLeft}" height="${platformH}" fill="rgba(15,22,32,0.06)" stroke="${SCENE_INK}" stroke-width="1.6"/>`;
        body += sceneGround(36, W - padR, groundY);
        // kastbana y = topY + platformH * t²
        let d = '';
        const N = 30;
        for (let i = 0; i <= N; i++) {
            const t = i / N, x = cliffRight + R * t, y = topY + platformH * t * t;
            d += (i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
        }
        body += `<path d="${d.trim()}" stroke="${SCENE_ACCENT}" stroke-width="2.2" fill="none" stroke-dasharray="6 4"/>`;
        // startpunkt + vågrät hastighetspil
        body += `<circle cx="${cliffRight}" cy="${topY}" r="6" fill="${SCENE_INK}"/>`;
        body += sceneArrow(cliffRight, topY, cliffRight + 54, topY, { color: SCENE_ACCENT });
        if (opts.v0Label) body += sceneText(cliffRight + 58, topY - 11, sceneQty(opts.v0Label), { color: SCENE_ACCENT, anchor: 'start', size: 15 });
        if (opts.objLabel) body += sceneText(cliffRight - 4, topY - 14, opts.objLabel, { anchor: 'end', size: 12 });
        // nedslag
        const landX = cliffRight + R;
        body += `<circle cx="${landX.toFixed(1)}" cy="${groundY}" r="3.5" fill="${SCENE_ACCENT}"/>`;
        // höjdmått (lodrätt) vänster om klippan
        if (opts.heightLabel) {
            const hx = 44;
            body += `<line x1="${hx - 2}" y1="${topY}" x2="${cliffLeft}" y2="${topY}" stroke="${SCENE_MUTED}" stroke-width="1" stroke-dasharray="4 3"/>`;
            body += sceneDim(hx, topY, hx, groundY, opts.heightLabel, {});
        }
        // avståndsmått (vågrätt) längs marken
        if (opts.distLabel) {
            const dy = groundY + 24;
            body += `<line x1="${cliffRight}" y1="${groundY}" x2="${cliffRight}" y2="${dy + 4}" stroke="${SCENE_MUTED}" stroke-width="0.8" stroke-dasharray="3 3"/>`;
            body += `<line x1="${landX.toFixed(1)}" y1="${groundY}" x2="${landX.toFixed(1)}" y2="${dy + 4}" stroke="${SCENE_MUTED}" stroke-width="0.8" stroke-dasharray="3 3"/>`;
            body += sceneDim(cliffRight, dy, landX, dy, opts.distLabel, {});
        }
        return sceneWrap(W, H, body);
    }

    // kind 'angle'
    const padL = 46;
    const angle = opts.angle != null ? opts.angle : 35;
    const aRad = angle * Math.PI / 180;
    const R = W - padL - padR;
    let Hpx = R * Math.tan(aRad) / 4;
    Hpx = Math.max(40, Math.min(170, Hpx));
    const padTtop = 36;
    const groundY = padTtop + Hpx;
    const H = groundY + 48;
    const launchX = padL, landX = padL + R;
    // bana
    let d = '';
    const N = 40;
    for (let i = 0; i <= N; i++) {
        const t = i / N, x = padL + R * t, y = groundY - 4 * Hpx * t * (1 - t);
        d += (i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
    }
    body += sceneGround(padL - 8, landX + 28, groundY);
    body += `<path d="${d.trim()}" stroke="${SCENE_ACCENT}" stroke-width="2.2" fill="none" stroke-dasharray="6 4"/>`;
    // hinder/mur
    if (opts.wall) {
        const wx = padL + R * opts.wall.atFracX;
        const wallTop = groundY - (opts.wall.hFrac || 0.4) * Hpx;
        body += `<rect x="${(wx - 5).toFixed(1)}" y="${wallTop.toFixed(1)}" width="10" height="${(groundY - wallTop).toFixed(1)}" fill="rgba(15,22,32,0.10)" stroke="${SCENE_INK}" stroke-width="1.4"/>`;
        if (opts.wall.label) body += sceneText(wx, wallTop - 9, sceneQty(opts.wall.label), { size: 12, color: SCENE_INK });
    }
    // hastighetspil + vinkelbåge vid utgång
    body += sceneArrow(launchX, groundY, launchX + 62 * Math.cos(aRad), groundY - 62 * Math.sin(aRad), { color: SCENE_ACCENT });
    body += sceneAngleArc(launchX, groundY, 28, 0, -aRad, opts.angleLabel || (angle + '°'));
    if (opts.v0Label) {
        const lx = launchX + 62 * Math.cos(aRad) + 6, ly = groundY - 62 * Math.sin(aRad) - 8;
        body += sceneText(lx, ly, sceneQty(opts.v0Label), { color: SCENE_ACCENT, anchor: 'start', size: 15 });
    }
    body += `<circle cx="${launchX}" cy="${groundY}" r="5" fill="${SCENE_INK}"/>`;
    body += `<circle cx="${landX.toFixed(1)}" cy="${groundY}" r="3.5" fill="${SCENE_ACCENT}"/>`;
    // stighöjd
    if (opts.apex) {
        const apX = padL + R / 2, apY = padTtop;
        body += `<line x1="${apX.toFixed(1)}" y1="${apY}" x2="${apX.toFixed(1)}" y2="${groundY}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
        body += `<circle cx="${apX.toFixed(1)}" cy="${apY}" r="3" fill="${SCENE_ACCENT}"/>`;
        body += sceneText(apX + 7, (apY + groundY) / 2, sceneQty(opts.apexLabel || 'y_max'), { color: SCENE_MUTED, anchor: 'start', size: 13 });
    }
    // kastvidd
    if (opts.rangeLabel) {
        const dy = groundY + 26;
        body += sceneDim(launchX, dy, landX, dy, sceneQty(opts.rangeLabel), {});
    }
    return sceneWrap(W, H, body);
}

// ── Konisk pendel (makeConicalPendulum) ──────────────────────────────
//
// Sidvy av konisk pendel: tak, tråd i vinkel, kula som sveper i cirkel
// (ritad som ellips, bakre halvan streckad). Visar valfritt trådlängd l,
// vinkel, banradie r, höjd h under fästet och krafter (F_S längs tråden,
// F_G nedåt).
//
//   opts = {
//     width,                 // default 420
//     angle,                 // trådens vinkel mot vertikalen (grader)
//     stringLen,             // trådlängd i px (default 175)
//     angleLabel,            // default '${angle}°'; sätt null för att dölja
//     lLabel,                // 'l = 1,5 m' längs tråden
//     rLabel,                // 'r = ...' (ritar streckad banradie)
//     hLabel,                // 'h = ...' (höjd under fästet, längs lodlinjen)
//     massLabel,             // text vid kulan (t.ex. 'm')
//     forces,                // true → rita F_S längs tråden + F_G nedåt
//   }
function makeConicalPendulum(opts) {
    const W = opts.width || 420;
    const angle = opts.angle != null ? opts.angle : 30;
    const aRad = angle * Math.PI / 180;
    const Lpx = opts.stringLen || 175;
    const cx = W * 0.45;
    const pivotY = 30;
    const ballX = cx + Lpx * Math.sin(aRad);
    const ballY = pivotY + Lpx * Math.cos(aRad);
    const rx = Lpx * Math.sin(aRad), ry = Math.max(10, rx * 0.26);
    const H = ballY + ry + (opts.forces ? 74 : 40);
    let body = '';
    // tak
    body += `<line x1="${cx - 74}" y1="${pivotY}" x2="${cx + 74}" y2="${pivotY}" stroke="${SCENE_INK}" stroke-width="1.6"/>`;
    for (let xs = cx - 68; xs < cx + 74; xs += 12) body += `<line x1="${xs}" y1="${pivotY}" x2="${xs - 7}" y2="${pivotY - 8}" stroke="${SCENE_INK}" stroke-width="1"/>`;
    // lodlinje (streckad) = höjden h
    body += `<line x1="${cx}" y1="${pivotY}" x2="${cx}" y2="${ballY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    // cirkelbana som ellips: bakre (övre) halvan streckad, främre (nedre) hel
    body += `<path d="M ${(cx - rx).toFixed(1)} ${ballY.toFixed(1)} A ${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 0 ${(cx + rx).toFixed(1)} ${ballY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" fill="none" stroke-dasharray="5 4"/>`;
    body += `<path d="M ${(cx - rx).toFixed(1)} ${ballY.toFixed(1)} A ${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 1 ${(cx + rx).toFixed(1)} ${ballY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" fill="none"/>`;
    // banradie (streckad) + etikett
    if (opts.rLabel) {
        body += `<line x1="${cx}" y1="${ballY.toFixed(1)}" x2="${ballX.toFixed(1)}" y2="${ballY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="4 3"/>`;
        body += sceneText((cx + ballX) / 2, ballY + 14, sceneQty(opts.rLabel), { color: SCENE_MUTED, size: 13 });
    }
    // tråd
    body += `<line x1="${cx}" y1="${pivotY}" x2="${ballX.toFixed(1)}" y2="${ballY.toFixed(1)}" stroke="${SCENE_INK}" stroke-width="1.6"/>`;
    body += `<circle cx="${cx}" cy="${pivotY}" r="3" fill="${SCENE_INK}"/>`;
    // vinkel
    if (opts.angleLabel !== null) {
        const strAng = Math.atan2(Math.cos(aRad), Math.sin(aRad));
        body += sceneAngleArc(cx, pivotY, 30, strAng, Math.PI / 2, opts.angleLabel || (angle + '°'));
    }
    // trådlängd (en bit nedanför mitten längs tråden)
    if (opts.lLabel) { const t = 0.58; body += sceneText(cx + (ballX - cx) * t - 9, pivotY + (ballY - pivotY) * t, sceneQty(opts.lLabel), { color: SCENE_INK, anchor: 'end', size: 13 }); }
    // höjd h (en bit ovanför mitten längs lodlinjen, så den inte krockar med l)
    if (opts.hLabel) { const t = 0.42; body += sceneText(cx - 8, pivotY + (ballY - pivotY) * t, sceneQty(opts.hLabel), { color: SCENE_MUTED, anchor: 'end', size: 13 }); }
    // kula
    body += `<circle cx="${ballX.toFixed(1)}" cy="${ballY.toFixed(1)}" r="9" fill="${SCENE_INK}"/>`;
    if (opts.massLabel) body += sceneText(ballX + 15, ballY, sceneVar(opts.massLabel), { anchor: 'start' });
    // krafter
    if (opts.forces) {
        const tdx = cx - ballX, tdy = pivotY - ballY, tm = Math.hypot(tdx, tdy), tl = 54;
        body += sceneArrow(ballX, ballY, ballX + tdx / tm * tl, ballY + tdy / tm * tl, { color: SCENE_ACCENT });
        body += sceneText(ballX + tdx / tm * tl - 6, ballY + tdy / tm * tl - 9, sceneVar('F_S'), { color: SCENE_ACCENT, anchor: 'end' });
        body += sceneArrow(ballX, ballY, ballX, ballY + 52, { color: SCENE_ACCENT });
        body += sceneText(ballX + 9, ballY + 52, sceneVar('F_G'), { color: SCENE_ACCENT, anchor: 'start' });
    }
    return sceneWrap(W, H, body);
}

// ── Hävstång / gungbräda / överhäng (makeLever) ──────────────────────
//
// Vågrät balk på stöd (kil eller kant) med laster (hängande vikter eller
// kraftpilar), tyngdpunkt och måttlinjer.
//
//   opts = {
//     width,                 // default 460
//     pivot: { posFrac, type },  // stöd: 'wedge' (kil) | 'edge' (kant/brygga)
//     loads: [ { posFrac, label, kind, up } ],  // kind: 'weight'|'force'
//     cog: { posFrac, label },   // tyngdpunkt (nedåtpil)
//     dims: [ { fromFrac, toFrac, label, row } ],  // måttlinjer ovanför balken
//   }
function makeLever(opts) {
    const W = opts.width || 460;
    const padL = 38, padR = 38;
    const beamY = 78;
    const x0 = padL, x1 = W - padR, span = x1 - x0;
    const frac = f => x0 + span * f;
    const beamTh = 10, beamBottom = beamY + beamTh / 2;
    const piv = opts.pivot || { posFrac: 0.5, type: 'wedge' };
    const pivX = frac(piv.posFrac);
    let body = '', H = beamBottom + 80;

    if (piv.type === 'edge') {
        const blockLeft = x0 - 6, blockH = 48, blockTop = beamBottom;
        body += `<rect x="${blockLeft}" y="${blockTop}" width="${(pivX - blockLeft).toFixed(1)}" height="${blockH}" fill="rgba(15,22,32,0.06)" stroke="${SCENE_INK}" stroke-width="1.4"/>`;
        body += sceneGround(blockLeft, pivX, blockTop + blockH);
        body += `<circle cx="${pivX.toFixed(1)}" cy="${beamBottom}" r="2.6" fill="${SCENE_INK}"/>`;
        H = blockTop + blockH + 30;
    } else {
        const tw = 16, th = 22;
        body += `<polygon points="${pivX.toFixed(1)},${beamBottom} ${(pivX - tw).toFixed(1)},${beamBottom + th} ${(pivX + tw).toFixed(1)},${beamBottom + th}" fill="rgba(15,22,32,0.06)" stroke="${SCENE_INK}" stroke-width="1.4"/>`;
        body += sceneGround(pivX - tw - 14, pivX + tw + 14, beamBottom + th);
        H = beamBottom + th + 34;
    }
    // balk
    body += `<rect x="${x0}" y="${beamY - beamTh / 2}" width="${span}" height="${beamTh}" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.6" rx="2"/>`;
    // tyngdpunkt
    if (opts.cog) {
        const cgX = frac(opts.cog.posFrac);
        body += `<circle cx="${cgX.toFixed(1)}" cy="${beamY}" r="3" fill="${SCENE_INK}"/>`;
        body += sceneArrow(cgX, beamY + 5, cgX, beamY + 46, { color: SCENE_ACCENT });
        if (opts.cog.label) body += sceneText(cgX + 8, beamY + 46, sceneQty(opts.cog.label), { color: SCENE_ACCENT, anchor: 'start', size: 13 });
        H = Math.max(H, beamY + 70);
    }
    // laster
    for (const ld of (opts.loads || [])) {
        const lx = frac(ld.posFrac);
        if (ld.kind === 'force') {
            const dir = ld.up ? -1 : 1, y1f = beamY - dir * 6;
            body += sceneArrow(lx, y1f, lx, y1f + dir * 44, { color: SCENE_ACCENT });
            if (ld.label) body += sceneText(lx + 9, y1f + dir * 44, sceneQty(ld.label), { color: SCENE_ACCENT, anchor: 'start', size: 13 });
            H = Math.max(H, beamY + 74);
        } else {
            const bw = 30, bh = 22, topY = beamBottom;
            body += `<line x1="${lx.toFixed(1)}" y1="${topY}" x2="${lx.toFixed(1)}" y2="${topY + 12}" stroke="${SCENE_INK}" stroke-width="1.3"/>`;
            body += `<rect x="${(lx - bw / 2).toFixed(1)}" y="${topY + 12}" width="${bw}" height="${bh}" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.4" rx="2"/>`;
            if (ld.label) body += sceneText(lx, topY + 12 + bh / 2, ld.label, { size: 11 });
            H = Math.max(H, topY + 12 + bh + 30);
        }
    }
    // måttlinjer ovanför balken
    for (const dm of (opts.dims || [])) {
        const ax = frac(dm.fromFrac), bx = frac(dm.toFrac);
        const yy = beamY - 30 - (dm.row || 0) * 20;
        body += `<line x1="${ax.toFixed(1)}" y1="${yy}" x2="${ax.toFixed(1)}" y2="${beamY - 6}" stroke="${SCENE_MUTED}" stroke-width="0.8" stroke-dasharray="3 3"/>`;
        body += `<line x1="${bx.toFixed(1)}" y1="${yy}" x2="${bx.toFixed(1)}" y2="${beamY - 6}" stroke="${SCENE_MUTED}" stroke-width="0.8" stroke-dasharray="3 3"/>`;
        body += sceneDim(ax, yy, bx, yy, sceneQty(dm.label), {});
    }
    return sceneWrap(W, H, body);
}

// ── Tippande/vältande kropp (makeTippingBox) ─────────────────────────
//
// Rätblock på mark. Visar tyngdpunkt + tyngdkraft, valfri vågrät
// tryckkraft högst upp, friktion vid basen, mått på bredd/höjd och en
// rotationspil kring vältkanten. Kan ritas upprätt (tilt 0) eller lutad.
//
//   opts = {
//     boxW, boxH,            // px-mått (boxH > boxW = hög/smal)
//     tilt,                  // graders lutning kring nedre högra hörnet (default 0)
//     weightLabel,           // default 'F_G'
//     push: { label },       // vågrät tryckkraft; pilspetsen träffar övre vänstra hörnet
//     friction,              // true → friktionspil vid basen (pekar vänster)
//     wLabel, hLabel,        // måttetiketter för bredd/höjd
//     tipArrow,              // true → krökt pil kring vältkanten
//     gravityLine,           // true → streckad lodlinje från tyngdpunkt till mark
//   }
function makeTippingBox(opts) {
    const bw = opts.boxW || 84, bh = opts.boxH || 120;
    const tilt = opts.tilt || 0, t = tilt * Math.PI / 180;
    const c = Math.cos(t), s = Math.sin(t);
    const R = (x, y) => [x * c - y * s, x * s + y * c];     // medurs kring pivot (nedre höger)
    const LR = R(0, 0), LL = R(-bw, 0), UL = R(-bw, -bh), UR = R(0, -bh), COG = R(-bw / 2, -bh / 2);
    const wlen = 46;
    const pts = [LR, LL, UL, UR, COG, [COG[0], 0], [COG[0], COG[1] + wlen]];
    let pushStart = null, pushEnd = null, fricStart = null, fricEnd = null;
    if (opts.push) { pushEnd = [UL[0], UL[1]]; pushStart = [UL[0] - 56, UL[1]]; pts.push(pushStart, [pushStart[0] - 14, pushStart[1] - 14]); }
    if (opts.friction) { fricStart = [(LL[0] + LR[0]) / 2, -7]; fricEnd = [fricStart[0] - 52, -7]; pts.push(fricEnd, [fricEnd[0] - 24, -7]); }
    let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    for (const p of pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); }
    const padX = 54, padTop = 36, padBot = 40;
    const offX = padX - minX, offY = padTop - minY;
    const W = (maxX - minX) + padX * 2, H = (maxY - minY) + padTop + padBot;
    const T = p => [p[0] + offX, p[1] + offY];
    const groundY = offY;
    const lr = T(LR), ll = T(LL), ul = T(UL), ur = T(UR), cg = T(COG);
    let body = '';
    body += sceneGround(8, W - 8, groundY);
    // lådan
    body += `<polygon points="${lr[0].toFixed(1)},${lr[1].toFixed(1)} ${ll[0].toFixed(1)},${ll[1].toFixed(1)} ${ul[0].toFixed(1)},${ul[1].toFixed(1)} ${ur[0].toFixed(1)},${ur[1].toFixed(1)}" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.8"/>`;
    // lodlinje från tyngdpunkt
    if (opts.gravityLine) body += `<line x1="${cg[0].toFixed(1)}" y1="${cg[1].toFixed(1)}" x2="${cg[0].toFixed(1)}" y2="${groundY}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    // tyngdpunkt + tyngdkraft
    body += `<circle cx="${cg[0].toFixed(1)}" cy="${cg[1].toFixed(1)}" r="3.2" fill="${SCENE_INK}"/>`;
    body += sceneArrow(cg[0], cg[1], cg[0], cg[1] + wlen, { color: SCENE_ACCENT });
    body += sceneText(cg[0] + 9, cg[1] + wlen, sceneVar(opts.weightLabel || 'F_G'), { color: SCENE_ACCENT, anchor: 'start' });
    // vältkant (pivot, nedre höger)
    body += `<circle cx="${lr[0].toFixed(1)}" cy="${lr[1].toFixed(1)}" r="3.4" fill="${SCENE_ACCENT}"/>`;
    // tryckkraft
    if (opts.push) { const ps = T(pushStart), pe = T(pushEnd); body += sceneArrow(ps[0], ps[1], pe[0], pe[1], { color: SCENE_ACCENT }); if (opts.push.label) body += sceneText(ps[0], ps[1] - 11, sceneQty(opts.push.label), { color: SCENE_ACCENT, anchor: 'middle', size: 14 }); }
    // friktion
    if (opts.friction) { const fs = T(fricStart), fe = T(fricEnd); body += sceneArrow(fs[0], fs[1] - 1, fe[0], fe[1] - 1, { color: SCENE_ACCENT }); body += sceneText(fe[0] - 6, fe[1] - 11, sceneVar('F_f'), { color: SCENE_ACCENT, anchor: 'end' }); }
    // rotationspil kring vältkanten
    if (opts.tipArrow) {
        const r0 = 26;
        body += `<path d="M ${(lr[0] - r0).toFixed(1)} ${(lr[1] - 6).toFixed(1)} A ${r0} ${r0} 0 0 1 ${(lr[0] - 4).toFixed(1)} ${(lr[1] - r0 - 2).toFixed(1)}" stroke="${SCENE_BLUE}" stroke-width="1.8" fill="none"/>`;
        body += `<polygon points="${(lr[0] - 4).toFixed(1)},${(lr[1] - r0 - 2).toFixed(1)} ${(lr[0] - 11).toFixed(1)},${(lr[1] - r0 + 3).toFixed(1)} ${(lr[0] + 3).toFixed(1)},${(lr[1] - r0 + 1).toFixed(1)}" fill="${SCENE_BLUE}"/>`;
    }
    // mått: bredd (under basen) och höjd (vänster sida) — bara upprätt
    if (opts.wLabel && tilt === 0) { const dy = groundY + 22; body += sceneDim(ll[0], dy, lr[0], dy, sceneQty(opts.wLabel), {}); }
    if (opts.hLabel && tilt === 0) { const dx = ul[0] - 16; body += sceneDim(dx, ul[1], dx, ll[1], sceneQty(opts.hLabel), {}); }
    return sceneWrap(W, H, body);
}

// ── Kraftmoment-arm / skiftnyckel (makeTorqueArm) ────────────────────
//
// Vridpunkt (mutter/gångjärn) med en styv arm i given vinkel och en
// kraft i armens ände. Valfri streckad vågrät hävarm (utan värde).
//
//   opts = {
//     width,                 // default 360
//     armAngle,              // armens vinkel över horisontalplanet (grader)
//     armLen,                // px (default 200)
//     armLabel,              // 'l = 0,18 m' längs armen
//     force: { angle, label, len },  // kraft i änden; angle: 0=höger,90=upp,-90=ned
//     pivotLabel,            // text under vridpunkten
//     leverHint,             // true → streckad lodlinje från änden till hävarmsnivå
//   }
function makeTorqueArm(opts) {
    const W = opts.width || 360;
    const armLen = opts.armLen || 200;
    const armAngle = opts.armAngle || 0;
    const aRad = armAngle * Math.PI / 180;
    const f = opts.force || { angle: -90, len: 64, label: 'F' };
    const fLen = f.len || 64;
    const fRad = (f.angle != null ? f.angle : -90) * Math.PI / 180;
    // lokalt: vridpunkt i origo, arm uppåt-höger (y nedåt → -sin)
    const ex = armLen * Math.cos(aRad), ey = -armLen * Math.sin(aRad);
    const fex = ex + fLen * Math.cos(fRad), fey = ey - fLen * Math.sin(fRad);
    // arm-längd-etiketten offsettas VINKELRÄTT ut från armen (uppåt/åt sidan)
    // så den aldrig hamnar ovanpå den tjocka armlinjen.
    const labOff = 18, lblX = ex / 2 - Math.sin(aRad) * labOff, lblY = ey / 2 - Math.cos(aRad) * labOff;
    const lblW = opts.armLabel ? String(opts.armLabel).length * 6.5 : 0;
    const pts = [[0, 0], [ex, ey], [fex, fey], [fex + 40, fey], [ex, 0], [lblX - lblW / 2, lblY], [lblX + lblW / 2, lblY]];
    let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    for (const p of pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); }
    const padX = 44, padY = 40;
    const offX = padX - minX, offY = padY - minY;
    const Wv = Math.max(W, (maxX - minX) + padX * 2), Hv = (maxY - minY) + padY * 2;
    const px = offX, py = offY, exA = ex + offX, eyA = ey + offY, fexA = fex + offX, feyA = fey + offY;
    let body = '';
    // streckad hävarmshjälp (lodrät) från änden ned till vridpunktens nivå
    if (opts.leverHint) {
        body += `<line x1="${exA.toFixed(1)}" y1="${eyA.toFixed(1)}" x2="${exA.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
        body += `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${exA.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
    }
    // arm
    body += `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${exA.toFixed(1)}" y2="${eyA.toFixed(1)}" stroke="${SCENE_INK}" stroke-width="7" stroke-linecap="round"/>`;
    // vinkelbåge
    if (armAngle > 0) body += sceneAngleArc(px, py, 32, 0, -aRad, opts.angleLabel || (armAngle + '°'));
    // vridpunkt
    body += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="6" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="2"/>`;
    body += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2" fill="${SCENE_INK}"/>`;
    if (opts.pivotLabel) body += sceneText(px, py + 18, opts.pivotLabel, { size: 12 });
    // arm-längd (vinkelrätt offsettad — aldrig på armlinjen)
    if (opts.armLabel) body += sceneText(lblX + offX, lblY + offY, sceneQty(opts.armLabel), { color: SCENE_INK, size: 13 });
    // kraft
    body += sceneArrow(exA, eyA, fexA, feyA, { color: SCENE_ACCENT });
    if (f.label) { const aN = ((f.angle % 360) + 360) % 360; const isV = (aN >= 45 && aN < 135) || (aN >= 225 && aN < 315); body += sceneText(fexA + (isV ? 8 : 0), feyA + (isV ? 0 : (Math.sin(fRad) >= 0 ? -10 : 14)), sceneQty(f.label), { color: SCENE_ACCENT, anchor: isV ? 'start' : 'middle', size: 14 }); }
    return sceneWrap(Wv, Hv, body);
}

// ── Cirkelbana ovanifrån (makeCircularPath) ──────────────────────────
//
// Topvy av en cirkulär bana med ett föremål (bil eller punkt), banradie,
// tangentiell hastighet och valfri centripetalpil mot centrum.
//
//   opts = {
//     width, height,         // default 320 × 300
//     r,                     // banradie i px (default 110)
//     angleDeg,              // föremålets vinkelläge (0=höger, 90=topp)
//     radiusLabel, vLabel,   // 'r = 50 m', 'v = 20 m/s'
//     showFc, fcLabel,       // centripetalpil mot centrum (t.ex. 'a_C', 'F_C')
//     point,                 // true → rita punkt i stället för bil
//     objLabel,              // valfri etikett vid föremålet
//   }
function makeCircularPath(opts) {
    const r = opts.r || 110;
    const a = (opts.angleDeg != null ? opts.angleDeg : 0) * Math.PI / 180;
    // centrum i origo; objektet vid vinkeln a (0 = höger, 90 = topp)
    const ox = r * Math.cos(a), oy = -r * Math.sin(a);
    const tang = a + Math.PI / 2;
    const vlen = opts.vLen || 56;
    const vx = ox + vlen * Math.cos(tang), vy = oy - vlen * Math.sin(tang);
    let fcx = null, fcy = null;
    if (opts.showFc) { fcx = ox + (0 - ox) * 0.36; fcy = oy + (0 - oy) * 0.36; }
    // grov etikettbredd (utan taggar) för att räkna viewBox så inget klipps
    const estW = s => String(s).replace(/<[^>]+>/g, '').length * 7.2 + 8;
    const pts = [[-r, 0], [r, 0], [0, -r], [0, r], [ox, oy], [vx, vy]];
    if (fcx != null) pts.push([fcx, fcy]);
    if (opts.vLabel) { const w = estW(opts.vLabel); pts.push([vx + 6 + w, vy - 8], [vx + 6, vy - 8]); }
    if (opts.radiusLabel) { const w = estW(opts.radiusLabel); pts.push([ox / 2 - w / 2, oy / 2 - 9], [ox / 2 + w / 2, oy / 2 - 9]); }
    if (opts.showFc && opts.fcLabel !== false) { const w = estW(opts.fcLabel || 'F_C'); pts.push([(ox + fcx) / 2 + 10 + w, (oy + fcy) / 2 + 2]); }
    if (opts.objLabel) { const w = estW(opts.objLabel); pts.push([ox - w / 2, oy - 24], [ox + w / 2, oy - 24]); }
    let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    for (const p of pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); }
    const pad = 18;
    const offX = pad - minX, offY = pad - minY;
    const W = (maxX - minX) + pad * 2, H = (maxY - minY) + pad * 2;
    const cx = offX, cy = offY;
    const OX = ox + offX, OY = oy + offY, VX = vx + offX, VY = vy + offY;
    let body = '';
    body += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="none" stroke="${SCENE_MUTED}" stroke-width="2"${opts.dashTrack ? ' stroke-dasharray="7 6"' : ''}/>`;
    body += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3" fill="${SCENE_INK}"/>`;
    body += `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${OX.toFixed(1)}" y2="${OY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="4 3"/>`;
    if (opts.radiusLabel) body += sceneText((cx + OX) / 2, (cy + OY) / 2 - 9, sceneQty(opts.radiusLabel), { color: SCENE_MUTED, size: 13 });
    if (opts.showFc) {
        const FX = OX + (cx - OX) * 0.36, FY = OY + (cy - OY) * 0.36;
        body += sceneArrow(OX, OY, FX, FY, { color: SCENE_ACCENT });
        if (opts.fcLabel !== false) body += sceneText((OX + FX) / 2 + 10, (OY + FY) / 2 + 2, sceneVar(opts.fcLabel || 'F_C'), { color: SCENE_ACCENT, anchor: 'start', size: 14 });
    }
    if (opts.point) body += `<circle cx="${OX.toFixed(1)}" cy="${OY.toFixed(1)}" r="6" fill="${SCENE_INK}"/>`;
    else body += `<g transform="translate(${OX.toFixed(1)},${OY.toFixed(1)}) rotate(${(-tang * 180 / Math.PI).toFixed(1)})"><rect x="-17" y="-9" width="34" height="18" rx="3" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.5"/><line x1="6" y1="-9" x2="6" y2="9" stroke="${SCENE_INK}" stroke-width="1"/></g>`;
    body += sceneArrow(OX, OY, VX, VY, { color: SCENE_BLUE });
    if (opts.vLabel) body += sceneText(VX + 6, VY - 8, sceneQty(opts.vLabel), { color: SCENE_BLUE, anchor: 'start', size: 14 });
    if (opts.objLabel) body += sceneText(OX, OY - 24, opts.objLabel, { size: 12 });
    return sceneWrap(W, H, body);
}

// ── Backkrön (makeCrest) ─────────────────────────────────────────────
//
// Sidvy av ett konvext backkrön med en bil i högsta punkten, streckad
// krökningsradie till centrum nedanför, samt krafterna N (upp) och F_G
// (ned). Valfri tangentiell hastighet.
//
//   opts = { width, r, rLabel, vLabel, forces (default true) }
function makeCrest(opts) {
    const W = opts.width || 360;
    const r = opts.r || 150;
    const cx = W / 2, topY = (opts.forces === false) ? 46 : 74, cy = topY + r;
    const half = Math.min(0.72, (W / 2 - 26) / r);
    const aL = -Math.PI / 2 - half, aR = -Math.PI / 2 + half;
    let body = '';
    const lx = cx + r * Math.cos(aL), ly = cy + r * Math.sin(aL);
    const rx = cx + r * Math.cos(aR), ry = cy + r * Math.sin(aR);
    body += `<path d="M ${lx.toFixed(1)} ${ly.toFixed(1)} A ${r} ${r} 0 0 1 ${rx.toFixed(1)} ${ry.toFixed(1)}" stroke="${SCENE_INK}" stroke-width="2.2" fill="none"/>`;
    // krökningsradie (streckad) nedre delen + centrumpunkt
    body += `<line x1="${cx}" y1="${topY + 30}" x2="${cx}" y2="${cy.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    body += `<circle cx="${cx}" cy="${cy.toFixed(1)}" r="2.6" fill="${SCENE_MUTED}"/>`;
    if (opts.rLabel) body += sceneText(cx + 8, (topY + cy) / 2 + 12, sceneQty(opts.rLabel), { color: SCENE_MUTED, anchor: 'start', size: 13 });
    // bil
    body += `<g transform="translate(${cx},${topY})"><rect x="-20" y="-13" width="40" height="13" rx="3" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.5"/><circle cx="-11" cy="0" r="4" fill="${SCENE_INK}"/><circle cx="11" cy="0" r="4" fill="${SCENE_INK}"/></g>`;
    const fy = topY - 8;
    if (opts.forces !== false) {
        body += sceneArrow(cx, fy, cx, fy - 48, { color: SCENE_ACCENT });
        body += sceneText(cx + 9, fy - 48, sceneVar('N'), { color: SCENE_ACCENT, anchor: 'start' });
        body += sceneArrow(cx, fy, cx, fy + 50, { color: SCENE_ACCENT });
        body += sceneText(cx + 9, fy + 50, sceneVar('F_G'), { color: SCENE_ACCENT, anchor: 'start' });
    }
    if (opts.vLabel) {
        body += sceneArrow(cx, fy, cx + 58, fy, { color: SCENE_BLUE });
        body += sceneText(cx + 62, fy - 9, sceneQty(opts.vLabel), { color: SCENE_BLUE, anchor: 'start', size: 13 });
    }
    return sceneWrap(W, topY + r + 28, body);
}

// ── Doserad (bankad) kurva (makeBankedCurve) ─────────────────────────
//
// Tvärsnitt av en doserad vägbana som lutar vinkeln α, med en bil på
// banan, normalkraft N vinkelrätt mot banan, F_G nedåt och streckad
// horisontalreferens. Valfri pil "mot centrum".
//
//   opts = { width, height, angle, angleLabel, forces (default true), showCenter }
function makeBankedCurve(opts) {
    const W = opts.width || 380, H = opts.height || 240;
    const ang = opts.angle != null ? opts.angle : 25;
    const aRad = ang * Math.PI / 180;
    const padL = 42, padR = 40;
    const baseY = H - 56;
    const x0 = padL + 8, y0 = baseY;
    const roadLen = W - padL - padR - 16;
    const x1 = x0 + roadLen * Math.cos(aRad), y1 = y0 - roadLen * Math.sin(aRad);
    let body = '';
    body += `<polygon points="${x0},${y0} ${x1.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y0}" fill="rgba(15,22,32,0.05)" stroke="none"/>`;
    body += `<line x1="${x0}" y1="${y0}" x2="${x1.toFixed(1)}" y2="${y0}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    body += `<line x1="${x0}" y1="${y0}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${SCENE_INK}" stroke-width="2.2"/>`;
    body += sceneAngleArc(x0, y0, 36, 0, -aRad, opts.angleLabel || (ang + '°'));
    const t = 0.62;
    const carCx = x0 + (x1 - x0) * t, carCy = y0 + (y1 - y0) * t;
    body += `<g transform="translate(${carCx.toFixed(1)},${carCy.toFixed(1)}) rotate(${(-ang).toFixed(1)})"><rect x="-22" y="-16" width="44" height="16" rx="3" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.5"/><circle cx="-12" cy="0" r="4.5" fill="${SCENE_INK}"/><circle cx="12" cy="0" r="4.5" fill="${SCENE_INK}"/></g>`;
    const cmx = carCx - 8 * Math.sin(aRad), cmy = carCy - 8 * Math.cos(aRad) - 8;
    if (opts.forces !== false) {
        const nx = cmx + (-Math.sin(aRad)) * 56, ny = cmy + (-Math.cos(aRad)) * 56;
        body += sceneArrow(cmx, cmy, nx, ny, { color: SCENE_ACCENT });
        body += sceneText(nx - 6, ny - 9, sceneVar('N'), { color: SCENE_ACCENT, anchor: 'end' });
        body += sceneArrow(cmx, cmy, cmx, cmy + 54, { color: SCENE_ACCENT });
        body += sceneText(cmx + 9, cmy + 54, sceneVar('F_G'), { color: SCENE_ACCENT, anchor: 'start' });
    }
    if (opts.showCenter) {
        body += sceneArrow(x0 + 52, y0 + 26, x0, y0 + 26, { color: SCENE_BLUE, width: 2 });
        body += sceneText(x0 + 56, y0 + 26, 'mot centrum', { color: SCENE_BLUE, anchor: 'start', size: 12 });
    }
    return sceneWrap(W, H, body);
}

// ── Vertikal loop (makeLoop) ─────────────────────────────────────────
//
// Berg- och dalbane-loop (cirkel) med vagn i toppen och/eller botten,
// streckad radie, valfria krafter i toppen (F_G ned) och fart-pil.
//
//   opts = {
//     width, r,              // default 300, 92
//     rLabel,                // 'r = 4,0 m'
//     cartTop, cartBottom,   // visa vagn i topp/botten (botten default true)
//     topForces,             // F_G nedåt i toppen
//     vTop,                  // fart-etikett i toppen (vågrät pil)
//     heightLabel,           // lodrätt mått för loopens höjd (2r)
//   }
function makeLoop(opts) {
    const W = opts.width || 300;
    const r = opts.r || 92;
    const cx = W / 2, topY = 36, cy = topY + r, groundY = cy + r;
    let body = '';
    body += sceneGround(28, W - 28, groundY);
    body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${SCENE_INK}" stroke-width="2.4"/>`;
    body += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${topY}" stroke="${SCENE_MUTED}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    body += `<circle cx="${cx}" cy="${cy}" r="2.6" fill="${SCENE_MUTED}"/>`;
    if (opts.rLabel) body += sceneText(cx + 8, (topY + cy) / 2, sceneQty(opts.rLabel), { color: SCENE_MUTED, anchor: 'start', size: 13 });
    const cart = (x, y, flip) => `<g transform="translate(${x},${y})"><rect x="-18" y="${flip ? 0 : -13}" width="36" height="13" rx="2" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="1.5"/></g>`;
    if (opts.cartTop) {
        body += cart(cx, topY, true);
        if (opts.topForces) { body += sceneArrow(cx, topY + 14, cx, topY + 14 + 46, { color: SCENE_ACCENT }); body += sceneText(cx + 9, topY + 14 + 46, sceneVar('F_G'), { color: SCENE_ACCENT, anchor: 'start' }); }
        if (opts.vTop) { body += sceneArrow(cx, topY - 2, cx - 54, topY - 2, { color: SCENE_BLUE }); body += sceneText(cx - 58, topY - 12, sceneQty(opts.vTop), { color: SCENE_BLUE, anchor: 'end', size: 13 }); }
    }
    if (opts.cartBottom !== false) body += cart(cx, groundY, false);
    if (opts.heightLabel) {
        const dx = cx - r - 16;
        body += `<line x1="${dx - 4}" y1="${topY}" x2="${cx}" y2="${topY}" stroke="${SCENE_MUTED}" stroke-width="0.8" stroke-dasharray="3 3"/>`;
        body += `<line x1="${dx - 4}" y1="${groundY}" x2="${cx}" y2="${groundY}" stroke="${SCENE_MUTED}" stroke-width="0.8" stroke-dasharray="3 3"/>`;
        body += sceneDim(dx, topY, dx, groundY, sceneQty(opts.heightLabel), {});
    }
    return sceneWrap(W, groundY + 34, body);
}

// ── Gunga / pendel (makeSwing) ───────────────────────────────────────
//
// Pendel/gunga: fäste i tak, rep till lägsta punkten, streckad svängbåge.
// Valfritt utgångsläge i vinkel, fallhöjd h och krafter i lägsta punkten
// (F_S uppåt längs repet, F_G nedåt).
//
//   opts = {
//     width, ropeLen,        // default 360, 175
//     angle,                 // utgångsvinkel mot lodlinjen (grader, åt vänster)
//     angleLabel,            // default '${angle}°'; sätt null för att dölja vinkeln
//     hLabel,                // fallhöjd (lodrätt mått)
//     ropeLabel,             // 'l = 4,0 m' längs repet
//     forces,                // F_S upp + F_G ned i lägsta punkten
//   }
function makeSwing(opts) {
    const W = opts.width || 360;
    const Lpx = opts.ropeLen || 175;
    const cx = W * 0.52, pivotY = 26, lowY = pivotY + Lpx;
    const hasAngle = opts.angle != null;
    const ang = hasAngle ? opts.angle : 0;
    const aRad = ang * Math.PI / 180;
    const relX = cx - Lpx * Math.sin(aRad), relY = pivotY + Lpx * Math.cos(aRad);
    let body = '';
    // tak
    body += `<line x1="${cx - 70}" y1="${pivotY}" x2="${cx + 70}" y2="${pivotY}" stroke="${SCENE_INK}" stroke-width="1.6"/>`;
    for (let xs = cx - 64; xs < cx + 70; xs += 12) body += `<line x1="${xs}" y1="${pivotY}" x2="${xs - 7}" y2="${pivotY - 8}" stroke="${SCENE_INK}" stroke-width="1"/>`;
    body += `<circle cx="${cx}" cy="${pivotY}" r="3" fill="${SCENE_INK}"/>`;
    // svängbåge (streckad)
    if (hasAngle) body += `<path d="M ${relX.toFixed(1)} ${relY.toFixed(1)} A ${Lpx} ${Lpx} 0 0 1 ${(cx + Lpx * Math.sin(aRad)).toFixed(1)} ${relY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.3" fill="none" stroke-dasharray="5 4"/>`;
    // utgångsläge: streckat rep + kula
    if (hasAngle) {
        body += `<line x1="${cx}" y1="${pivotY}" x2="${relX.toFixed(1)}" y2="${relY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1.4" stroke-dasharray="5 4"/>`;
        body += `<circle cx="${relX.toFixed(1)}" cy="${relY.toFixed(1)}" r="8" fill="none" stroke="${SCENE_INK}" stroke-width="1.4"/>`;
        if (opts.angleLabel !== null) { const rdir = Math.atan2(relY - pivotY, relX - cx); body += sceneAngleArc(cx, pivotY, 30, rdir, Math.PI / 2, opts.angleLabel || (ang + '°')); }
    }
    // rep till lägsta punkten + kula
    body += `<line x1="${cx}" y1="${pivotY}" x2="${cx}" y2="${lowY}" stroke="${SCENE_INK}" stroke-width="1.6"/>`;
    body += `<circle cx="${cx}" cy="${lowY}" r="9" fill="${SCENE_INK}"/>`;
    if (opts.ropeLabel) body += sceneText(cx - 9, (pivotY + lowY) / 2, sceneQty(opts.ropeLabel), { color: SCENE_INK, anchor: 'end', size: 13 });
    // fallhöjd
    if (opts.hLabel && hasAngle) {
        const hx = Math.min(relX, cx) - 26;
        body += `<line x1="${relX.toFixed(1)}" y1="${relY.toFixed(1)}" x2="${hx - 4}" y2="${relY.toFixed(1)}" stroke="${SCENE_MUTED}" stroke-width="1" stroke-dasharray="4 3"/>`;
        body += `<line x1="${cx}" y1="${lowY}" x2="${hx - 4}" y2="${lowY}" stroke="${SCENE_MUTED}" stroke-width="1" stroke-dasharray="4 3"/>`;
        body += sceneDim(hx, relY, hx, lowY, sceneQty(opts.hLabel), {});
    }
    // krafter i lägsta punkten
    if (opts.forces) {
        body += sceneArrow(cx, lowY - 5, cx, lowY - 5 - 54, { color: SCENE_ACCENT });
        body += sceneText(cx + 9, lowY - 5 - 54, sceneVar('F_S'), { color: SCENE_ACCENT, anchor: 'start' });
        body += sceneArrow(cx, lowY + 5, cx, lowY + 5 + 50, { color: SCENE_ACCENT });
        body += sceneText(cx + 9, lowY + 5 + 50, sceneVar('F_G'), { color: SCENE_ACCENT, anchor: 'start' });
    }
    return sceneWrap(W, lowY + (opts.forces ? 72 : 30), body);
}

// ── Stege mot vägg (makeLadder) ──────────────────────────────────────
//
// Stege lutad mot en lodrät vägg, med vinkel mot marken och valfria
// krafter (F_G i mitten, N_mark + F_f vid foten, N_vägg vid toppen).
// Rita UTAN krafter i frågan (eleven ska själv identifiera dem) och MED
// krafter i lösningen.
//
//   opts = { width, angle, ladderLen, lenLabel, angleLabel, forces (default false) }
function makeLadder(opts) {
    const W = opts.width || 360;
    const ang = opts.angle != null ? opts.angle : 65;
    const aRad = ang * Math.PI / 180;
    const Lpx = opts.ladderLen || 220;
    const padB = 38;
    const footX = 54;
    const topX = footX + Lpx * Math.cos(aRad);
    const groundY = Lpx * Math.sin(aRad) + 50;
    const topY = groundY - Lpx * Math.sin(aRad);
    let body = '';
    // vägg (lodrät) med skraffering åt höger
    body += `<line x1="${topX.toFixed(1)}" y1="${topY - 18}" x2="${topX.toFixed(1)}" y2="${groundY}" stroke="${SCENE_INK}" stroke-width="2"/>`;
    for (let ys = topY - 10; ys < groundY; ys += 12) body += `<line x1="${topX.toFixed(1)}" y1="${ys}" x2="${(topX + 8).toFixed(1)}" y2="${ys - 7}" stroke="${SCENE_INK}" stroke-width="1"/>`;
    // mark
    body += sceneGround(footX - 30, topX + 6, groundY);
    // stege
    body += `<line x1="${footX}" y1="${groundY}" x2="${topX.toFixed(1)}" y2="${topY.toFixed(1)}" stroke="${SCENE_INK}" stroke-width="3.5" stroke-linecap="round"/>`;
    // vinkel vid foten
    body += sceneAngleArc(footX, groundY, 34, 0, -aRad, opts.angleLabel || (ang + '°'));
    // längd
    if (opts.lenLabel) { const mx = (footX + topX) / 2, my = (groundY + topY) / 2, o = 18; body += sceneText(mx - Math.sin(aRad) * o, my - Math.cos(aRad) * o, sceneQty(opts.lenLabel), { color: SCENE_INK, anchor: 'end', size: 13 }); }
    // krafter
    if (opts.forces) {
        const midX = (footX + topX) / 2, midY = (groundY + topY) / 2;
        body += sceneArrow(midX, midY, midX, midY + 50, { color: SCENE_ACCENT });
        body += sceneText(midX + 9, midY + 50, sceneVar('F_G'), { color: SCENE_ACCENT, anchor: 'start' });
        body += sceneArrow(footX, groundY, footX, groundY - 52, { color: SCENE_ACCENT });
        body += sceneText(footX - 9, groundY - 52, sceneVar('N_mark'), { color: SCENE_ACCENT, anchor: 'end' });
        body += sceneArrow(footX, groundY, footX + 50, groundY, { color: SCENE_ACCENT });
        body += sceneText(footX + 54, groundY - 9, sceneVar('F_f'), { color: SCENE_ACCENT, anchor: 'start' });
        body += sceneArrow(topX, topY, topX - 50, topY, { color: SCENE_ACCENT });
        body += sceneText(topX - 54, topY - 9, sceneVar('N_vägg'), { color: SCENE_ACCENT, anchor: 'end' });
    }
    return sceneWrap(W, groundY + padB, body);
}

// ── Urtavla (makeClock) ──────────────────────────────────────────────
//
// Enkel analog urtavla med tim- och minutvisare. Vinklar i grader
// medurs från 12-läget (0 = rakt upp).
//
//   opts = { size, hour, minute }   // grader medurs; 12:00 → hour 0, minute 0
function makeClock(opts) {
    const sz = opts.size || 150, c = sz / 2, R = c - 10;
    const hand = (deg, len, w) => {
        const a = (deg - 90) * Math.PI / 180;
        return `<line x1="${c}" y1="${c}" x2="${(c + len * Math.cos(a)).toFixed(1)}" y2="${(c + len * Math.sin(a)).toFixed(1)}" stroke="${SCENE_INK}" stroke-width="${w}" stroke-linecap="round"/>`;
    };
    let body = `<circle cx="${c}" cy="${c}" r="${R}" fill="#fafaf5" stroke="${SCENE_INK}" stroke-width="2"/>`;
    for (let i = 0; i < 12; i++) {
        const a = (i * 30 - 90) * Math.PI / 180;
        const r1 = R - 4, r2 = R - (i % 3 === 0 ? 11 : 7);
        body += `<line x1="${(c + r1 * Math.cos(a)).toFixed(1)}" y1="${(c + r1 * Math.sin(a)).toFixed(1)}" x2="${(c + r2 * Math.cos(a)).toFixed(1)}" y2="${(c + r2 * Math.sin(a)).toFixed(1)}" stroke="${SCENE_INK}" stroke-width="${i % 3 === 0 ? 2 : 1}"/>`;
    }
    body += hand(opts.hour || 0, R * 0.52, 3.4);
    body += hand(opts.minute || 0, R * 0.78, 2.2);
    body += `<circle cx="${c}" cy="${c}" r="3" fill="${SCENE_ACCENT}"/>`;
    return sceneWrap(sz, sz, body);
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

    'fy1-7.6': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Vilken typ av koppling visas i schemat?

${makeCircuit({
    source: { label: 'U' },
    components: [
        { type: 'bulb', label: 'L_1' },
        { type: 'bulb', label: 'L_2' },
        { type: 'bulb', label: 'L_3' },
    ],
})}`,
            choices: [
                `Seriekoppling.`,
                `Parallellkoppling.`,
                `Blandkoppling.`,
                `Kortslutning.`,
            ],
            correct: 0,
            solution: `Alla tre lampor sitter på rad i samma ledning — det finns bara **en väg** för strömmen att gå. Det är definitionen av en **seriekoppling**.

**Svar:** Alternativ A — seriekoppling.

**Generell slutsats:** Skulle någon av de tre lamporna gå sönder bryts hela kretsen och alla tre lampor slocknar. Det är en av seriekopplingens viktiga egenskaper — och en av anledningarna till att gamla julgransljus var så frustrerande: en trasig lampa släckte hela slingan.`,
        },
        {
            level: 1,
            question: `I schemat nedan vill du mäta strömmen genom lampan. Var ska amperemetern kopplas in?

${makeCircuit({
    source: { label: 'U' },
    components: [
        { type: 'bulb', label: 'L_1' },
    ],
})}`,
            choices: [
                `I serie med lampan (på samma ledning som lampan).`,
                `Parallellt med lampan (kopplad över lampan).`,
                `Direkt över batteriets poler.`,
                `Det spelar ingen roll var i kretsen den sitter.`,
            ],
            correct: 0,
            solution: `En amperemeter mäter strömmen som går **genom** sig själv. För att mäta strömmen genom lampan måste exakt den strömmen passera även amperemetern — alltså ska den kopplas **i serie** med lampan:

${makeCircuit({
    source: { label: 'U' },
    components: [
        { type: 'ammeter', label: 'A' },
        { type: 'bulb', label: 'L_1' },
    ],
})}

För att amperemetern inte ska påverka strömmen i kretsen ska den ha **låg resistans**.

**Svar:** Alternativ A — i serie med lampan.

**Generell slutsats:** Voltmeter och amperemeter är spegelvända: amperemetern kopplas i serie och ska ha låg resistans, voltmetern parallellt och ska ha hög resistans. Båda mätarna är konstruerade för att störa kretsen så lite som möjligt.`,
        },
        {
            level: 1,
            question: `Tre lampor är seriekopplade till ett batteri med spänningen $U = 9{,}0\\ \\mathrm{V}$. Över lampa 1 mäter du spänningen $U_1 = 2{,}5\\ \\mathrm{V}$ och över lampa 2 spänningen $U_2 = 3{,}0\\ \\mathrm{V}$. Hur stor är spänningen $U_3$ över lampa 3?

${makeCircuit({
    source: { label: 'U', value: '9,0 V' },
    components: [
        { type: 'bulb', label: 'L_1' },
        { type: 'bulb', label: 'L_2' },
        { type: 'bulb', label: 'L_3' },
    ],
})}`,
            answer: { value: 3.5, unit: 'V' },
            solution: `I en seriekoppling delas batterispänningen upp på lamporna:

$$ U = U_1 + U_2 + U_3 $$

Lös ut $U_3$:

$$ U_3 = U - U_1 - U_2 $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 9{,}0\\ \\mathrm{V} \\\\
U_1 = 2{,}5\\ \\mathrm{V} \\\\
U_2 = 3{,}0\\ \\mathrm{V}
\\end{array} \\right]
$$

Insättning:

$$ U_3 = 9{,}0 - 2{,}5 - 3{,}0 = 3{,}5\\ \\mathrm{V} $$

**Svar:** $U_3 = 3{,}5\\ \\mathrm{V}$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `I kretsen nedan delar strömmen från batteriet upp sig i två parallella grenar med resistorerna $R_1$ och $R_2$. Strömmen genom $R_1$ är $I_1 = 0{,}40\\ \\mathrm{A}$ och strömmen genom $R_2$ är $I_2 = 0{,}30\\ \\mathrm{A}$. Hur stor är strömmen $I_3$ genom $R_3$?

${makeCircuit({
    source: { label: 'U' },
    components: [
        { type: 'resistor', label: 'R_3' },
        { type: 'parallel', branches: [
            [{ type: 'resistor', label: 'R_1' }],
            [{ type: 'resistor', label: 'R_2' }],
        ] },
    ],
})}`,
            answer: { value: 0.70, unit: 'A' },
            solution: `Vid en förgreningspunkt gäller **Kirchhoffs första lag**: summan av strömmarna som går in i en punkt är lika med summan av strömmarna som går ut.

I den vänstra noden samlas strömmarna $I_1$ och $I_2$ från grenarna och fortsätter som $I_3$ genom $R_3$:

$$ I_3 = I_1 + I_2 $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
I_1 = 0{,}40\\ \\mathrm{A} \\\\
I_2 = 0{,}30\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ I_3 = 0{,}40 + 0{,}30 = 0{,}70\\ \\mathrm{A} $$

**Svar:** $I_3 = 0{,}70\\ \\mathrm{A}$.

**Generell slutsats:** Eftersom $R_3$ sitter i serie med hela parallellsektionen passerar **all** ström från batteriet genom $R_3$. Det är samma ström som batteriet levererar — Kirchhoffs första lag är bara ett sätt att uttrycka att laddning inte kan försvinna eller skapas i en förgrening.`,
        },
        {
            level: 2,
            question: `I kretsen nedan är tre lampor parallellkopplade till ett batteri. Vad händer med lampa 1 och lampa 2 om lampa 3 går sönder?

${makeCircuit({
    source: { label: 'U' },
    components: [{ type: 'parallel', branches: [
        [{ type: 'bulb', label: 'L_1' }],
        [{ type: 'bulb', label: 'L_2' }],
        [{ type: 'bulb', label: 'L_3' }],
    ] }],
})}`,
            choices: [
                `De slocknar också, eftersom hela kretsen bryts.`,
                `De lyser oförändrat, eftersom de fortfarande är direkt anslutna till batteriet.`,
                `De lyser svagare, eftersom strömmen från batteriet minskar.`,
                `De lyser starkare, eftersom strömmen som gick genom lampa 3 omfördelas.`,
            ],
            correct: 1,
            solution: `Varje gren i en parallellkoppling är **direkt ansluten** mellan batteriets poler. Spänningen över varje lampa är därför densamma som batterispänningen *U*, oavsett vad som händer i de andra grenarna.

När lampa 3 går sönder bryts enbart den grenens ledning. Lampornas 1 och 2 spänning och resistans är oförändrade, så enligt Ohms lag är även strömmen genom dem oförändrad — de **lyser exakt som förut**.

**Svar:** Alternativ B — de lyser oförändrat.

**Generell slutsats:** Detta är den fundamentala skillnaden mot seriekoppling, där en trasig lampa släcker hela kretsen. Eluttagen i ett hem är parallellkopplade just därför — om en lampa går sönder ska inte hela rummets belysning slockna. Den totala strömmen från batteriet minskar dock, eftersom en gren har försvunnit.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Fyra likadana lampor är kopplade enligt schemat: lampa 1 sitter ensam i den övre grenen, lamporna 2, 3 och 4 sitter i serie i den undre grenen. Båda grenarna är direkt kopplade mellan batteriets poler.

${makeCircuit({
    source: { label: 'U' },
    components: [{ type: 'parallel', branches: [
        [{ type: 'bulb', label: 'L_1' }],
        [{ type: 'bulb', label: 'L_2' }, { type: 'bulb', label: 'L_3' }, { type: 'bulb', label: 'L_4' }],
    ] }],
})}

**a)** Vilken eller vilka lampor lyser starkast?

**b)** Vilken eller vilka lampor lyser svagast?

**c)** Lampa 3 går sönder. Vad händer med lampa 1?`,
            solution: `**a)** Lamporna är likadana — varje lampa har samma resistans *R*. Eftersom båda grenarna är parallella ligger samma spänning *U* över dem.

Övre grenen har bara lampa 1: total resistans *R*, ström $I_1 = U/R$.

Undre grenen har tre lampor i serie: total resistans $3R$, ström $I_{2{-}4} = U/(3R) = I_1/3$.

Lampa 1 får alltså tre gånger så stark ström som lamporna 2, 3 och 4. Eftersom likadana lampor lyser starkare ju starkare ström de får, lyser **lampa 1 starkast**.

**Svar a):** Lampa 1.

**b)** Lamporna 2, 3 och 4 sitter i samma gren och har samma ström — de lyser lika starkt. Den strömmen är en tredjedel av lampa 1:s ström, så de lyser **svagast tillsammans**.

**Svar b):** Lamporna 2, 3 och 4 (alla lika svagt).

**c)** När lampa 3 går sönder bryts hela den undre grenen — ingen ström kan längre gå genom lamporna 2, 3 och 4. Den övre grenen påverkas inte: lampa 1 sitter fortfarande direkt mellan batteriets poler och får samma spänning som tidigare. Strömmen genom lampa 1 är därför oförändrad, och **lampa 1 lyser exakt som förut**.

**Svar c):** Lampa 1 lyser oförändrat.

**Generell slutsats:** Parallella grenar är oberoende av varandra — det som händer i en gren påverkar inte spänningen över de andra. Om en gren bryts försvinner bara den grenens bidrag till totalströmmen, men de övriga grenarna fortsätter som om inget hänt. Det är därför parallellkoppling är så vanlig i elnät: man vill inte att en trasig komponent ska påverka resten.`,
        },
    ],

    'fy1-7.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Stav A är negativt laddad och stav B är positivt laddad. Vad händer när de närmas varandra?`,
            choices: [
                `De attraherar varandra (dras mot varandra).`,
                `De repellerar varandra (stöts ifrån varandra).`,
                `Ingen kraft uppstår eftersom laddningarna tar ut varandra.`,
                `De repellerar först och attraherar sedan.`,
            ],
            correct: 0,
            solution: `Stavarna har **olika** tecken på sin laddning (en negativ, en positiv). Olika laddningar drar mot varandra med en attraherande kraft.

**Svar:** Alternativ A — de attraherar varandra.

**Generell slutsats:** Lika laddning repellerar, olika laddning attraherar. Det är samma regel som för magneter (lika poler stöts ifrån) — men här handlar det om elektrisk laddning, inte magnetism.`,
        },
        {
            level: 1,
            question: `Vilket påstående om ledare och isolatorer är korrekt?`,
            choices: [
                `I en ledare rör sig ledningselektronerna lätt genom materialet.`,
                `I en isolator rör sig elektronerna lätt genom materialet.`,
                `I en ledare sitter alla elektroner hårt bundna till atomerna.`,
                `En halvledare leder alltid ström bättre än en metall.`,
            ],
            correct: 0,
            solution: `I en **ledare** (t.ex. metall) finns ledningselektroner som rör sig lätt genom materialet — därför leder ledare ström bra. I en **isolator** (glas, plast, trä) är elektronerna hårt bundna och rör sig inte lätt.

**Svar:** Alternativ A.

**Generell slutsats:** En **halvledare** (kisel, selen) är ett mellanting — isolator vid låg temperatur, ledare vid hög. Den leder alltså *inte* alltid bättre än en metall.`,
        },
        {
            level: 1,
            question: `En liten plastkula är negativt laddad med $Q = 4{,}0\\ \\mathrm{nC}$. Hur många överskottselektroner har kulan? Elementarladdningen är $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 2.5e10, unit: 'st' },
            solution: `Antalet överskottselektroner *n* fås genom att dividera kulans laddning *Q* med elektronens laddning $q_e$:

$$ n = \\frac{Q}{q_e} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q = 4{,}0\\ \\mathrm{nC} = 4{,}0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ n = \\frac{4{,}0 \\cdot 10^{-9}}{1{,}602 \\cdot 10^{-19}} = 2{,}50 \\cdot 10^{10}\\ \\text{st} $$

**Svar:** Kulan har cirka $2{,}5 \\cdot 10^{10}$ överskottselektroner (25 miljarder).`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Två lika stora metallkulor har laddningarna $Q_1 = +6{,}0\\ \\mathrm{nC}$ och $Q_2 = -2{,}0\\ \\mathrm{nC}$. Kulorna får vidröra varandra och skiljs sedan åt. Hur stor laddning har varje kula efteråt?`,
            answer: { value: 2.0, unit: 'nC' },
            solution: `När två **lika stora** ledande kulor vidrör varandra fördelar sig den sammanlagda laddningen jämnt mellan dem. Varje kula får då medelvärdet av de ursprungliga laddningarna:

$$ Q = \\frac{Q_1 + Q_2}{2} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q_1 = +6{,}0\\ \\mathrm{nC} \\\\
Q_2 = -2{,}0\\ \\mathrm{nC}
\\end{array} \\right]
$$

Insättning:

$$ Q = \\frac{+6{,}0 + (-2{,}0)}{2} = \\frac{+4{,}0}{2} = +2{,}0\\ \\mathrm{nC} $$

**Svar:** Varje kula har laddningen $+2{,}0\\ \\mathrm{nC}$ efteråt.

**Generell slutsats:** Den totala laddningen bevaras ($+4{,}0\\ \\mathrm{nC}$ före och efter) — laddning kan inte skapas eller förstöras, bara omfördelas. Jämn fördelning gäller bara när kulorna är lika stora.`,
        },
        {
            level: 2,
            question: `En ballong gnuggas mot håret och får då ett överskott på $3{,}0 \\cdot 10^{10}$ elektroner. Hur stor laddning får ballongen? Svara i nC. Elementarladdningen är $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 4.8, unit: 'nC' },
            solution: `Laddningen *Q* är antalet överskottselektroner *n* multiplicerat med elektronens laddning $q_e$:

$$ Q = n \\cdot q_e $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
n = 3{,}0 \\cdot 10^{10}\\ \\text{st} \\\\
q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ Q = 3{,}0 \\cdot 10^{10} \\cdot 1{,}602 \\cdot 10^{-19} = 4{,}806 \\cdot 10^{-9}\\ \\mathrm{C} \\approx 4{,}8\\ \\mathrm{nC} $$

**Svar:** Ballongens laddning är ungefär $-4{,}8\\ \\mathrm{nC}$ (negativ, eftersom det är ett överskott av elektroner).

**Generell slutsats:** Detta är omvändningen av $n = Q/q_e$. Tecknet på laddningen avgörs av om föremålet har överskott (negativ) eller underskott (positiv) av elektroner.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Två lika stora metallkulor har laddningarna $Q_1 = +5{,}0\\ \\mathrm{nC}$ och $Q_2 = -3{,}0\\ \\mathrm{nC}$. De får vidröra varandra och skiljs sedan åt. Hur många elektroner har då flyttat från den ena kulan till den andra? Elementarladdningen är $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 2.5e10, unit: 'st' },
            solution: `Först bestämmer vi sluttillståndet. Lika stora ledande kulor delar laddningen jämnt:

$$ Q = \\frac{Q_1 + Q_2}{2} = \\frac{+5{,}0 + (-3{,}0)}{2} = +1{,}0\\ \\mathrm{nC} $$

Båda kulorna har alltså $+1{,}0\\ \\mathrm{nC}$ efteråt. Nu ser vi hur mycket varje kula ändrades:

$$
\\left[ \\begin{array}{l}
\\text{Kula 1: } +5{,}0 \\to +1{,}0\\ \\mathrm{nC} \\quad (\\text{blev } 4{,}0\\ \\mathrm{nC}\\ \\text{mer negativ}) \\\\
\\text{Kula 2: } -3{,}0 \\to +1{,}0\\ \\mathrm{nC} \\quad (\\text{blev } 4{,}0\\ \\mathrm{nC}\\ \\text{mer positiv})
\\end{array} \\right]
$$

Kula 1 blev mer negativ → den **tog emot** elektroner. Kula 2 blev mer positiv → den **lämnade ifrån sig** elektroner. Den laddning som flyttades motsvarar $\\Delta Q = 4{,}0\\ \\mathrm{nC}$. Antalet elektroner är då

$$ n = \\frac{\\Delta Q}{q_e} = \\frac{4{,}0 \\cdot 10^{-9}}{1{,}602 \\cdot 10^{-19}} = 2{,}50 \\cdot 10^{10}\\ \\text{st} $$

**Svar:** Cirka $2{,}5 \\cdot 10^{10}$ elektroner flyttade från kula 2 till kula 1.

**Generell slutsats:** Det är *elektroner* som rör sig, aldrig protoner. En kula blir mindre positiv genom att ta emot elektroner, inte genom att "skicka iväg" positiv laddning. Att räkna ut den flyttade laddningen $\\Delta Q$ — inte sluttillståndet — är nyckeln.`,
        },
        {
            level: 3,
            question: `Två små kulor med laddningarna $Q_1$ och $Q_2$ hänger på avståndet $10\\ \\mathrm{cm}$ från varandra och **attraherar** varandra med kraften $14{,}4\\ \\mathrm{\\mu N}$. Kulorna får sedan vidröra varandra och placeras åter på $10\\ \\mathrm{cm}$ avstånd — nu **repellerar** de varandra med kraften $8{,}1\\ \\mathrm{\\mu N}$. Bestäm de ursprungliga laddningarna $Q_1$ och $Q_2$. ($k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$)`,
            solution: `Detta går inte att lösa med ren insättning — vi måste ställa upp två samband och lösa ett ekvationssystem.

**Efter beröringen** delar de två lika stora kulorna laddningen jämnt, så var och en får $\\dfrac{Q_1 + Q_2}{2}$. Att de nu repellerar med $8{,}1\\ \\mathrm{\\mu N}$ ger via Coulombs lag

$$ F_2 = k \\cdot \\frac{\\left(\\frac{Q_1+Q_2}{2}\\right)^2}{r^2} \\quad\\Rightarrow\\quad \\frac{Q_1+Q_2}{2} = \\sqrt{\\frac{F_2 \\cdot r^2}{k}} = \\sqrt{\\frac{8{,}1 \\cdot 10^{-6} \\cdot 0{,}10^2}{8{,}99 \\cdot 10^9}} = 3{,}0 \\cdot 10^{-9}\\ \\mathrm{C} $$

**Summan** blir alltså $Q_1 + Q_2 = 6{,}0\\ \\mathrm{nC}$.

**Före beröringen** attraherade kulorna varandra → laddningarna hade *olika* tecken, så produkten $Q_1 \\cdot Q_2$ är negativ. Coulombs lag ger produktens storlek:

$$ F_1 = k \\cdot \\frac{|Q_1 \\cdot Q_2|}{r^2} \\quad\\Rightarrow\\quad |Q_1 \\cdot Q_2| = \\frac{F_1 \\cdot r^2}{k} = \\frac{14{,}4 \\cdot 10^{-6} \\cdot 0{,}10^2}{8{,}99 \\cdot 10^9} = 1{,}6 \\cdot 10^{-17}\\ \\mathrm{C^2} = 16\\ (\\mathrm{nC})^2 $$

Eftersom tecknen är olika: $Q_1 \\cdot Q_2 = -16\\ (\\mathrm{nC})^2$.

**Ekvationssystemet** (i nC) har alltså summan $6$ och produkten $-16$. Talen $Q_1$ och $Q_2$ är rötter till

$$ x^2 - 6x - 16 = 0 \\quad\\Rightarrow\\quad x = \\frac{6 \\pm \\sqrt{36 + 64}}{2} = \\frac{6 \\pm 10}{2} $$

vilket ger $x = 8$ eller $x = -2$.

**Svar:** Laddningarna var $+8{,}0\\ \\mathrm{nC}$ och $-2{,}0\\ \\mathrm{nC}$.

**Generell slutsats:** Det avgörande är att läsa av *tecknet* ur kraftriktningen (attraktion → produkt negativ, repulsion → produkt positiv) och att inse att beröringen ger medelladdningen. Då blir summa och produkt kända, och laddningarna är rötterna till $x^2 - (\\text{summa})x + (\\text{produkt}) = 0$.`,
        },
    ],

    'fy1-7.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Två små laddade kulor har laddningarna $Q_1 = 8{,}0\\ \\mathrm{nC}$ och $Q_2 = 5{,}0\\ \\mathrm{nC}$ och placeras $20\\ \\mathrm{cm}$ från varandra. Hur stor är den elektriska kraften mellan dem? Coulombs konstant är $k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$.`,
            answer: { value: 9.0, unit: 'μN' },
            solution: `Vi ställer upp Coulombs lag:

$$ F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} $$

Mätvärden (laddningar och avstånd i SI-enheter):
$$
\\left[ \\begin{array}{l}
Q_1 = 8{,}0\\ \\mathrm{nC} = 8{,}0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
Q_2 = 5{,}0\\ \\mathrm{nC} = 5{,}0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
r = 20\\ \\mathrm{cm} = 0{,}20\\ \\mathrm{m} \\\\
k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}
\\end{array} \\right]
$$

Insättning:

$$ F = 8{,}99 \\cdot 10^9 \\cdot \\frac{8{,}0 \\cdot 10^{-9} \\cdot 5{,}0 \\cdot 10^{-9}}{0{,}20^2} = 8{,}99 \\cdot 10^{-6}\\ \\mathrm{N} \\approx 9{,}0\\ \\mathrm{\\mu N} $$

**Svar:** Kraften är ungefär $9{,}0\\ \\mathrm{\\mu N}$.

**Generell slutsats:** Glöm inte att omvandla nC till C ($10^{-9}$) och cm till m innan insättning — en av de vanligaste felkällorna i Coulomb-uppgifter är enheter som inte omvandlats.`,
        },
        {
            level: 1,
            question: `Två laddningar $Q_1 = 2{,}0\\ \\mathrm{nC}$ och $Q_2 = 5{,}0\\ \\mathrm{nC}$ påverkar varandra med kraften $F = 9{,}0\\ \\mathrm{\\mu N}$. Hur långt från varandra befinner de sig? Svara i cm.`,
            answer: { value: 10, unit: 'cm' },
            solution: `Vi utgår från Coulombs lag och löser ut avståndet *r*:

$$ F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} \\quad\\Leftrightarrow\\quad r = \\sqrt{\\frac{k \\cdot Q_1 \\cdot Q_2}{F}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q_1 = 2{,}0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
Q_2 = 5{,}0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
F = 9{,}0\\ \\mathrm{\\mu N} = 9{,}0 \\cdot 10^{-6}\\ \\mathrm{N} \\\\
k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}
\\end{array} \\right]
$$

Insättning:

$$ r = \\sqrt{\\frac{8{,}99 \\cdot 10^9 \\cdot 2{,}0 \\cdot 10^{-9} \\cdot 5{,}0 \\cdot 10^{-9}}{9{,}0 \\cdot 10^{-6}}} = 0{,}10\\ \\mathrm{m} = 10\\ \\mathrm{cm} $$

**Svar:** Avståndet är ungefär $10\\ \\mathrm{cm}$.

**Generell slutsats:** Eftersom avståndet står i kvadrat i nämnaren måste vi dra roten ur till slut. Att lösa ut *r* är ett vanligt extra steg jämfört med att bara räkna ut kraften direkt.`,
        },
        {
            level: 1,
            question: `Laddningen $Q_1 = 2\\ \\mathrm{nC}$ och laddningen $Q_2 = 8\\ \\mathrm{nC}$ påverkar varandra elektriskt. Vad gäller för krafterna på de två laddningarna?`,
            choices: [
                `Kraften är fyra gånger så stor på $Q_2$, eftersom den laddningen är fyra gånger så stor.`,
                `Kraften är lika stor på båda laddningarna, men riktad åt motsatt håll.`,
                `Kraften är större på $Q_1$, eftersom den är mindre och därför lättare att påverka.`,
                `Det går inte att avgöra utan att veta avståndet mellan dem.`,
            ],
            correct: 1,
            solution: `Enligt **Newtons tredje lag** är kraften som $Q_1$ utövar på $Q_2$ exakt lika stor som kraften $Q_2$ utövar på $Q_1$ — fast åt motsatt håll. Det spelar ingen roll att den ena laddningen är större.

Det syns också direkt i Coulombs lag: i uttrycket $F = k \\cdot Q_1 \\cdot Q_2 / r^2$ ingår *båda* laddningarna i samma produkt, så det blir ett och samma kraftvärde för paret.

**Svar:** Alternativ B — lika stor kraft på båda, motsatt riktad.

**Generell slutsats:** Samma princip som i gravitationen: jorden drar i dig med samma kraft som du drar i jorden, trots den enorma masskillnaden. En större laddning ger inte en större kraft på "den andra parten".`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Två laddade kulor påverkar varandra med en viss elektrisk kraft. Avståndet mellan dem fördubblas samtidigt som den ena kulans laddning tredubblas. Hur många gånger så stor blir den nya kraften jämfört med den ursprungliga?`,
            answer: { value: 0.75, unit: 'gånger' },
            solution: `Vi saknar mätvärden och löser uppgiften generellt. Den ursprungliga kraften är

$$ F_1 = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} $$

Den ena laddningen tredubblas ($Q_1 \\to 3Q_1$) och avståndet fördubblas ($r \\to 2r$). Den nya kraften blir

$$ F_2 = k \\cdot \\frac{(3 Q_1) \\cdot Q_2}{(2r)^2} = k \\cdot \\frac{3 \\cdot Q_1 \\cdot Q_2}{4 r^2} = \\frac{3}{4} \\cdot k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} = \\frac{3}{4} F_1 $$

**Svar:** Kraften blir $\\tfrac{3}{4} = 0{,}75$ gånger så stor (alltså mindre än förut).

**Generell slutsats:** Laddningen ökar kraften linjärt (faktor 3), men avståndet slår igenom i kvadrat (faktor $2^2 = 4$ i nämnaren). Avståndets kvadratiska beroende "vinner" här, så kraften minskar trots att laddningen ökade.`,
        },
        {
            level: 2,
            question: `En liten kula med massan $m = 0{,}50\\ \\mathrm{g}$ och laddningen $Q_1 = 30\\ \\mathrm{nC}$ befinner sig $5{,}0\\ \\mathrm{cm}$ från en fast laddning $Q_2 = 40\\ \\mathrm{nC}$. Vilken acceleration får den rörliga kulan i det ögonblicket? Bortse från tyngdkraften.`,
            answer: { value: 8.6, unit: 'm/s²' },
            solution: `Vi beräknar först den elektriska kraften med Coulombs lag:

$$ F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q_1 = 30 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
Q_2 = 40 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
r = 5{,}0\\ \\mathrm{cm} = 0{,}050\\ \\mathrm{m} \\\\
k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}
\\end{array} \\right]
$$

$$ F = 8{,}99 \\cdot 10^9 \\cdot \\frac{30 \\cdot 10^{-9} \\cdot 40 \\cdot 10^{-9}}{0{,}050^2} = 4{,}32 \\cdot 10^{-3}\\ \\mathrm{N} $$

Accelerationen fås ur **Newtons andra lag** $F = m \\cdot a$, löst för *a*:

$$ a = \\frac{F}{m} = \\frac{4{,}32 \\cdot 10^{-3}}{0{,}50 \\cdot 10^{-3}} = 8{,}6\\ \\mathrm{m/s^2} $$

**Svar:** Kulan får accelerationen ungefär $8{,}6\\ \\mathrm{m/s^2}$.

**Generell slutsats:** Den elektriska kraften driver rörelsen, men accelerationen beror också på massan. Glöm inte att massan i gram måste bli kilogram ($0{,}50\\ \\mathrm{g} = 0{,}50 \\cdot 10^{-3}\\ \\mathrm{kg}$).`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Tre laddningar sitter på en rät linje. I mitten sitter $Q_2 = +4{,}0\\ \\mathrm{nC}$. På avståndet $2{,}0\\ \\mathrm{cm}$ till vänster om den sitter $Q_1 = +6{,}0\\ \\mathrm{nC}$, och på avståndet $3{,}0\\ \\mathrm{cm}$ till höger sitter $Q_3 = -5{,}0\\ \\mathrm{nC}$. Bestäm storleken på den resulterande elektriska kraften på mittladdningen $Q_2$.`,
            answer: { value: 740, unit: 'μN' },
            solution: `Mittladdningen $Q_2$ påverkas av två krafter — en från varje grannladdning. Vi bestämmer storlek och riktning för var och en.

**Kraften från $Q_1$ (till vänster):** $Q_1$ och $Q_2$ är båda positiva → de repellerar. $Q_2$ knuffas alltså **åt höger**, bort från $Q_1$.

$$ F_1 = k \\cdot \\frac{Q_1 \\cdot Q_2}{r_1^2} = 8{,}99 \\cdot 10^9 \\cdot \\frac{6{,}0 \\cdot 10^{-9} \\cdot 4{,}0 \\cdot 10^{-9}}{0{,}020^2} = 5{,}39 \\cdot 10^{-4}\\ \\mathrm{N} $$

**Kraften från $Q_3$ (till höger):** $Q_2$ är positiv och $Q_3$ negativ → de attraherar. $Q_2$ dras alltså **åt höger**, mot $Q_3$.

$$ F_3 = k \\cdot \\frac{Q_2 \\cdot Q_3}{r_3^2} = 8{,}99 \\cdot 10^9 \\cdot \\frac{4{,}0 \\cdot 10^{-9} \\cdot 5{,}0 \\cdot 10^{-9}}{0{,}030^2} = 2{,}00 \\cdot 10^{-4}\\ \\mathrm{N} $$

Båda krafterna pekar **åt samma håll** (åt höger), så den resulterande kraften är summan:

$$ F = F_1 + F_3 = 5{,}39 \\cdot 10^{-4} + 2{,}00 \\cdot 10^{-4} = 7{,}39 \\cdot 10^{-4}\\ \\mathrm{N} \\approx 740\\ \\mathrm{\\mu N} $$

**Svar:** Den resulterande kraften är ungefär $740\\ \\mathrm{\\mu N}$ (eller $0{,}74\\ \\mathrm{mN}$), riktad åt höger.

**Generell slutsats:** I superpositionsuppgifter måste man först avgöra varje krafts *riktning* med tecken-regeln (lika repellerar, olika attraherar) och sedan addera. Här pekade båda åt samma håll och adderades. Hade de pekat åt motsatt håll skulle man istället subtraherat — och den största kraften bestämt nettoriktningen.`,
        },
        {
            level: 3,
            question: `På en rät linje sitter laddningen $Q_1 = +4{,}0\\ \\mathrm{nC}$ i origo och laddningen $Q_2 = +9{,}0\\ \\mathrm{nC}$ på avståndet $50\\ \\mathrm{cm}$ till höger. Var på linjen mellan laddningarna ska en tredje laddning placeras för att den **inte ska påverkas av någon resulterande elektrisk kraft**? Ange avståndet från $Q_1$.`,
            answer: { value: 20, unit: 'cm' },
            solution: `Den tredje laddningen *q* påverkas av en kraft från var och en av de andra. Nettokraften är noll där de två krafterna är **lika stora och motriktade**. Eftersom $Q_1$ och $Q_2$ båda är positiva pekar deras krafter på *q* åt motsatt håll någonstans *mellan* dem — där finns nollpunkten.

Kalla avståndet från $Q_1$ till punkten *x*. Avståndet till $Q_2$ är då $(d - x)$ där $d = 50\\ \\mathrm{cm}$. Kraftjämvikt med Coulombs lag (*q* och *k* finns i båda led och stryks):

$$ k \\cdot \\frac{Q_1 \\cdot q}{x^2} = k \\cdot \\frac{Q_2 \\cdot q}{(d-x)^2} \\quad\\Rightarrow\\quad \\frac{Q_1}{x^2} = \\frac{Q_2}{(d-x)^2} $$

Vi kastar om och drar roten ur båda led:

$$ \\frac{(d-x)^2}{x^2} = \\frac{Q_2}{Q_1} \\quad\\Rightarrow\\quad \\frac{d-x}{x} = \\sqrt{\\frac{Q_2}{Q_1}} = \\sqrt{\\frac{9{,}0}{4{,}0}} = 1{,}5 $$

$$ d - x = 1{,}5x \\quad\\Rightarrow\\quad d = 2{,}5x \\quad\\Rightarrow\\quad x = \\frac{50}{2{,}5} = 20\\ \\mathrm{cm} $$

**Svar:** $20\\ \\mathrm{cm}$ från den mindre laddningen ($Q_1$).

**Generell slutsats:** Nollpunkten ligger *närmare den mindre laddningen* — dess svagare fält behöver kortare avstånd för att hinna ikapp den starkares. Insikten är att sätta krafterna lika och dra roten ur; laddningen *q* och konstanten *k* stryks och spelar ingen roll.`,
        },
    ],

    'fy1-7.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En laddning på $Q = 12\\ \\mathrm{C}$ passerar ett tvärsnitt i en ledare under tiden $t = 4{,}0\\ \\mathrm{s}$. Hur stor är strömmen genom ledaren?`,
            answer: { value: 3.0, unit: 'A' },
            solution: `Strömmen är laddningen som passerar per tidsenhet:

$$ I = \\frac{Q}{t} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q = 12\\ \\mathrm{C} \\\\
t = 4{,}0\\ \\mathrm{s}
\\end{array} \\right]
$$

Insättning:

$$ I = \\frac{12}{4{,}0} = 3{,}0\\ \\mathrm{A} $$

**Svar:** Strömmen är $3{,}0\\ \\mathrm{A}$.`,
        },
        {
            level: 1,
            question: `Genom en lampa går strömmen $I = 0{,}50\\ \\mathrm{A}$ under $2{,}0$ minuter. Hur stor laddning har då passerat genom lampan? Svara i coulomb.`,
            answer: { value: 60, unit: 'C' },
            solution: `Vi löser ut laddningen *Q* ur formeln för ström:

$$ I = \\frac{Q}{t} \\quad\\Leftrightarrow\\quad Q = I \\cdot t $$

Mätvärden (tiden omvandlad till sekunder):
$$
\\left[ \\begin{array}{l}
I = 0{,}50\\ \\mathrm{A} \\\\
t = 2{,}0\\ \\mathrm{min} = 2{,}0 \\cdot 60\\ \\mathrm{s} = 120\\ \\mathrm{s}
\\end{array} \\right]
$$

Insättning:

$$ Q = 0{,}50 \\cdot 120 = 60\\ \\mathrm{C} $$

**Svar:** Laddningen är $60\\ \\mathrm{C}$.

**Generell slutsats:** Tiden måste vara i sekunder för att svaret ska bli i coulomb. Glömmer man att omvandla minuter till sekunder blir svaret 60 gånger för litet.`,
        },
        {
            level: 1,
            question: `I kretsen nedan delar strömmen från batteriet upp sig i två grenar. Strömmen ut från batteriet är $I = 0{,}90\\ \\mathrm{A}$ och genom den vänstra grenen ($R_1$) går strömmen $I_1 = 0{,}55\\ \\mathrm{A}$. Hur stor är strömmen $I_2$ genom den högra grenen ($R_2$)?

${makeCircuit({
    source: { label: 'U' },
    components: [{ type: 'parallel', branches: [
        [{ type: 'resistor', label: 'R_1' }],
        [{ type: 'resistor', label: 'R_2' }],
    ] }],
})}`,
            answer: { value: 0.35, unit: 'A' },
            solution: `Vid förgreningspunkten gäller **Kirchhoffs första lag**: summan av strömmarna in i punkten är lika med summan av strömmarna ut.

Hela strömmen *I* från batteliet delar upp sig i $I_1$ och $I_2$:

$$ I = I_1 + I_2 \\quad\\Leftrightarrow\\quad I_2 = I - I_1 $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
I = 0{,}90\\ \\mathrm{A} \\\\
I_1 = 0{,}55\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ I_2 = 0{,}90 - 0{,}55 = 0{,}35\\ \\mathrm{A} $$

**Svar:** Strömmen genom den högra grenen är $I_2 = 0{,}35\\ \\mathrm{A}$.

**Generell slutsats:** Strömmen kan aldrig "försvinna" eller "fastna" i en förgrening — allt som går in måste komma ut. Grenströmmarna adderas till huvudströmmen.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett uppladdningsbart batteri är märkt $2{,}0\\ \\mathrm{Ah}$ (amperetimmar). Det driver en lampa som drar strömmen $0{,}25\\ \\mathrm{A}$. Hur länge räcker batteriet innan det är urladdat? Svara i timmar.`,
            answer: { value: 8.0, unit: 'h' },
            solution: `Märkningen $2{,}0\\ \\mathrm{Ah}$ betyder att batteriet kan leverera laddningen $Q = 2{,}0\\ \\mathrm{Ah}$. Vi löser ut tiden *t* ur strömformeln:

$$ I = \\frac{Q}{t} \\quad\\Leftrightarrow\\quad t = \\frac{Q}{I} $$

Här kan vi räkna med laddningen i Ah och strömmen i A direkt, eftersom $\\mathrm{Ah} / \\mathrm{A} = \\mathrm{h}$:

$$
\\left[ \\begin{array}{l}
Q = 2{,}0\\ \\mathrm{Ah} \\\\
I = 0{,}25\\ \\mathrm{A}
\\end{array} \\right]
$$

$$ t = \\frac{2{,}0}{0{,}25} = 8{,}0\\ \\mathrm{h} $$

**Svar:** Batteriet räcker i $8{,}0$ timmar.

**Generell slutsats:** Enheten amperetimme är skräddarsydd för just den här beräkningen — ett batteri på "X Ah" levererar strömmen 1 A i X timmar, eller 0,5 A i 2X timmar, osv. Man behöver inte omvandla till coulomb om både laddning (Ah) och ström (A) hålls i samma "system".`,
        },
        {
            level: 2,
            question: `Genom en ledare går strömmen $0{,}50\\ \\mathrm{A}$. Hur många elektroner passerar ett tvärsnitt i ledaren under $1{,}0\\ \\mathrm{s}$? Elementarladdningen är $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 3.1e18, unit: 'st' },
            solution: `Vi beräknar först laddningen *Q* som passerar under sekunden:

$$ I = \\frac{Q}{t} \\quad\\Leftrightarrow\\quad Q = I \\cdot t = 0{,}50 \\cdot 1{,}0 = 0{,}50\\ \\mathrm{C} $$

Antalet elektroner *n* fås genom att dividera laddningen med elektronens laddning $q_e$:

$$ n = \\frac{Q}{q_e} $$

$$
\\left[ \\begin{array}{l}
Q = 0{,}50\\ \\mathrm{C} \\\\
q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}
\\end{array} \\right]
$$

$$ n = \\frac{0{,}50}{1{,}602 \\cdot 10^{-19}} = 3{,}12 \\cdot 10^{18}\\ \\text{st} \\approx 3{,}1 \\cdot 10^{18}\\ \\text{st} $$

**Svar:** Ungefär $3{,}1 \\cdot 10^{18}$ elektroner.

**Generell slutsats:** Även en ganska blygsam ström motsvarar ett enormt antal elektroner per sekund — laddningen hos en enda elektron är extremt liten.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett uppladdningsbart batteri är märkt $2{,}4\\ \\mathrm{Ah}$. Det laddas ur helt på exakt ett dygn med konstant ström. Hur många elektroner passerar i genomsnitt genom kretsen varje sekund? ($1\\ \\mathrm{Ah} = 3\\,600\\ \\mathrm{C}$, $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$)`,
            answer: { value: 6.2e17, unit: 'st' },
            solution: `**Steg 1 — total laddning i coulomb.** Märkningen $2{,}4\\ \\mathrm{Ah}$ omvandlas till coulomb:

$$ Q = 2{,}4\\ \\mathrm{Ah} = 2{,}4 \\cdot 3\\,600\\ \\mathrm{C} = 8\\,640\\ \\mathrm{C} $$

**Steg 2 — strömmen.** Urladdningen sker under ett dygn, $t = 24 \\cdot 3\\,600\\ \\mathrm{s} = 86\\,400\\ \\mathrm{s}$. Strömmen blir

$$ I = \\frac{Q}{t} = \\frac{8\\,640}{86\\,400} = 0{,}10\\ \\mathrm{A} $$

**Steg 3 — elektroner per sekund.** Under en sekund passerar laddningen $Q_1 = I \\cdot t_1 = 0{,}10 \\cdot 1{,}0 = 0{,}10\\ \\mathrm{C}$. Antalet elektroner är

$$ n = \\frac{Q_1}{q_e} = \\frac{0{,}10}{1{,}602 \\cdot 10^{-19}} = 6{,}24 \\cdot 10^{17}\\ \\text{st} \\approx 6{,}2 \\cdot 10^{17}\\ \\text{st} $$

**Svar:** Ungefär $6{,}2 \\cdot 10^{17}$ elektroner per sekund.

**Generell slutsats:** Uppgiften kopplar ihop tre samband: enhetsomvandlingen $\\mathrm{Ah} \\to \\mathrm{C}$, strömdefinitionen $I = Q/t$ och elektronräkningen $n = Q/q_e$. Den vanligaste fällan är att blanda ihop *total* laddning (hela urladdningen) med laddningen *per sekund*.`,
        },
        {
            level: 3,
            question: `Diagrammet visar strömmen genom en ledare som funktion av tiden. Bestäm den totala laddning som passerat ett tvärsnitt under de första 10 sekunderna, och hur många elektroner det motsvarar. ($q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$)

${makeDiagram({
    xMax: 10, yMax: 2.5,
    xTicks: [0, 2, 4, 6, 8, 10], yTicks: [0, 1, 2],
    xLabel: '<tspan font-style="italic">t</tspan> (s)',
    yLabel: '<tspan font-style="italic">I</tspan> (A)',
    paths: [{ points: [[0, 0], [4, 2], [10, 2]] }],
})}`,
            answer: { value: 1.0e20, unit: 'st' },
            solution: `Strömmen är *inte* konstant, så vi kan inte använda $Q = I \\cdot t$ med ett enda strömvärde. Eftersom $I = \\dfrac{Q}{t}$ motsvarar laddningen **arean under** *I-t*-grafen — precis som sträckan är arean under en *v-t*-graf.

${makeDiagram({
    xMax: 10, yMax: 2.5,
    xTicks: [0, 2, 4, 6, 8, 10], yTicks: [0, 1, 2],
    xLabel: '<tspan font-style="italic">t</tspan> (s)',
    yLabel: '<tspan font-style="italic">I</tspan> (A)',
    paths: [{ points: [[0, 0], [4, 2], [10, 2]] }],
    fills: [
        { points: [[0, 0], [4, 2], [4, 0]] },
        { points: [[4, 0], [4, 2], [10, 2], [10, 0]] },
    ],
})}

Vi delar upp arean i en triangel (0–4 s) och en rektangel (4–10 s):

$$
\\left[ \\begin{array}{l}
\\text{Triangel: } \\tfrac{1}{2} \\cdot 4{,}0 \\cdot 2{,}0 = 4{,}0\\ \\mathrm{C} \\\\
\\text{Rektangel: } 6{,}0 \\cdot 2{,}0 = 12\\ \\mathrm{C}
\\end{array} \\right]
$$

$$ Q = 4{,}0 + 12 = 16\\ \\mathrm{C} $$

Antalet elektroner blir sedan

$$ n = \\frac{Q}{q_e} = \\frac{16}{1{,}602 \\cdot 10^{-19}} = 9{,}99 \\cdot 10^{19} \\approx 1{,}0 \\cdot 10^{20}\\ \\text{st} $$

**Svar:** Laddningen är $16\\ \\mathrm{C}$, vilket motsvarar ungefär $1{,}0 \\cdot 10^{20}$ elektroner.

**Generell slutsats:** Fällan är att gripa efter $Q = I \\cdot t$ — men med vilket *I*? När strömmen varierar är laddningen arean under grafen. Samma princip som att sträcka = area under *v-t*-graf och $\\Delta v$ = area under *a-t*-graf.`,
        },
    ],

    'fy1-7.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En laddning $Q = 2{,}0\\ \\mathrm{C}$ förs genom spänningen $U = 12\\ \\mathrm{V}$. Hur stor elektrisk energi omsätts?`,
            answer: { value: 24, unit: 'J' },
            solution: `Sambandet mellan spänning, energi och laddning är $U = E/Q$. Vi löser ut energin *E*:

$$ U = \\frac{E}{Q} \\quad\\Leftrightarrow\\quad E = Q \\cdot U $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q = 2{,}0\\ \\mathrm{C} \\\\
U = 12\\ \\mathrm{V}
\\end{array} \\right]
$$

Insättning:

$$ E = 2{,}0 \\cdot 12 = 24\\ \\mathrm{J} $$

**Svar:** Den omsatta energin är $24\\ \\mathrm{J}$.`,
        },
        {
            level: 1,
            question: `När laddningen $Q = 0{,}50\\ \\mathrm{C}$ förs mellan två punkter omsätts energin $E = 6{,}0\\ \\mathrm{J}$. Hur stor är spänningen mellan punkterna?`,
            answer: { value: 12, unit: 'V' },
            solution: `Spänning är energi per laddning:

$$ U = \\frac{E}{Q} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
E = 6{,}0\\ \\mathrm{J} \\\\
Q = 0{,}50\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ U = \\frac{6{,}0}{0{,}50} = 12\\ \\mathrm{V} $$

**Svar:** Spänningen är $12\\ \\mathrm{V}$.

**Generell slutsats:** Spänning kan tolkas som "energi per coulomb". $1\\ \\mathrm{V} = 1\\ \\mathrm{J/C}$ — en volt betyder att varje coulomb laddning bär med sig en joule energi.`,
        },
        {
            level: 1,
            question: `En laddning förs mellan polerna på ett $9{,}0\\ \\mathrm{V}$-batteri och energin $E = 4{,}5\\ \\mathrm{J}$ omsätts. Hur stor var laddningen?`,
            answer: { value: 0.50, unit: 'C' },
            solution: `Vi löser ut laddningen *Q* ur sambandet $U = E/Q$:

$$ U = \\frac{E}{Q} \\quad\\Leftrightarrow\\quad Q = \\frac{E}{U} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
E = 4{,}5\\ \\mathrm{J} \\\\
U = 9{,}0\\ \\mathrm{V}
\\end{array} \\right]
$$

Insättning:

$$ Q = \\frac{4{,}5}{9{,}0} = 0{,}50\\ \\mathrm{C} $$

**Svar:** Laddningen var $0{,}50\\ \\mathrm{C}$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Vilken hastighet får en elektron som accelereras från vila genom spänningen $U = 200\\ \\mathrm{V}$? Elektronens massa är $m = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}$ och dess laddning $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 8.4e6, unit: 'm/s' },
            solution: `Den elektriska energin som elektronen får ($E = Q \\cdot U$) omvandlas helt till rörelseenergi ($E_k = m v^2 / 2$):

$$ Q \\cdot U = \\frac{m \\cdot v^2}{2} $$

Vi löser ut hastigheten *v*:

$$ v = \\sqrt{\\frac{2 \\cdot Q \\cdot U}{m}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Q = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C} \\\\
U = 200\\ \\mathrm{V} \\\\
m = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}
\\end{array} \\right]
$$

Insättning:

$$ v = \\sqrt{\\frac{2 \\cdot 1{,}602 \\cdot 10^{-19} \\cdot 200}{9{,}11 \\cdot 10^{-31}}} = 8{,}4 \\cdot 10^6\\ \\mathrm{m/s} $$

**Svar:** Elektronen får hastigheten ungefär $8{,}4 \\cdot 10^6\\ \\mathrm{m/s}$.

**Generell slutsats:** Bakom uppgiften ligger energiomvandling: elektrisk energi $\\to$ rörelseenergi. Eftersom hastigheten finns i kvadrat måste man dra roten ur till sist. Notera hur snabbt elektronen blir — flera miljoner meter per sekund redan vid blygsamma 200 V.`,
        },
        {
            level: 2,
            question: `En elektron har accelererats från vila till hastigheten $v = 3{,}0 \\cdot 10^6\\ \\mathrm{m/s}$. Genom vilken spänning har den accelererats? ($m = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}$, $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$)`,
            answer: { value: 26, unit: 'V' },
            solution: `Vi utgår från att den elektriska energin blivit rörelseenergi och löser nu istället ut spänningen *U*:

$$ Q \\cdot U = \\frac{m \\cdot v^2}{2} \\quad\\Leftrightarrow\\quad U = \\frac{m \\cdot v^2}{2 \\cdot Q} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg} \\\\
v = 3{,}0 \\cdot 10^6\\ \\mathrm{m/s} \\\\
Q = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ U = \\frac{9{,}11 \\cdot 10^{-31} \\cdot (3{,}0 \\cdot 10^6)^2}{2 \\cdot 1{,}602 \\cdot 10^{-19}} = 25{,}6\\ \\mathrm{V} \\approx 26\\ \\mathrm{V} $$

**Svar:** Elektronen har accelererats genom ungefär $26\\ \\mathrm{V}$.

**Generell slutsats:** Detta är omvändningen av föregående uppgift. Glöm inte att kvadrera *hela* hastigheten inklusive tiopotensen: $(3{,}0 \\cdot 10^6)^2 = 9{,}0 \\cdot 10^{12}$.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En elektron och en proton accelereras båda från vila genom **samma** spänning. Hur många gånger så snabb blir elektronen jämfört med protonen? Elektronens massa är $m_e = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}$ och protonens $m_p = 1{,}673 \\cdot 10^{-27}\\ \\mathrm{kg}$. (Partiklarna har lika stor laddning, fast med olika tecken.)`,
            answer: { value: 43, unit: 'gånger' },
            solution: `Eftersom partiklarna har lika stor laddning *Q* och accelereras genom samma spänning *U*, får de **lika mycket** rörelseenergi:

$$ Q \\cdot U = \\frac{m \\cdot v^2}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{\\frac{2 \\cdot Q \\cdot U}{m}} $$

Eftersom $Q$ och $U$ är desamma för båda, beror hastigheten bara på massan: $v \\propto \\dfrac{1}{\\sqrt{m}}$. Vi bildar kvoten mellan elektronens och protonens hastighet — då försvinner det gemensamma $2QU$:

$$ \\frac{v_e}{v_p} = \\frac{\\sqrt{2QU / m_e}}{\\sqrt{2QU / m_p}} = \\sqrt{\\frac{m_p}{m_e}} $$

Insättning:

$$ \\frac{v_e}{v_p} = \\sqrt{\\frac{1{,}673 \\cdot 10^{-27}}{9{,}11 \\cdot 10^{-31}}} = \\sqrt{1\\,836} = 42{,}8\\ldots \\approx 43 $$

**Svar:** Elektronen blir ungefär $43$ gånger så snabb som protonen.

**Generell slutsats:** Samma energi ger inte samma hastighet — den lätta partikeln blir mycket snabbare. Tricket är att bilda kvoten *innan* man sätter in värden, så att den okända spänningen och laddningen stryks bort. Då behövs inget värde på *U* alls.`,
        },
    ],

    'fy1-7.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En resistor med resistansen $R = 220\\ \\mathrm{\\Omega}$ genomflyts av strömmen $I = 0{,}050\\ \\mathrm{A}$. Hur stor är spänningen över resistorn?`,
            answer: { value: 11, unit: 'V' },
            solution: `Vi använder **Ohms lag**:

$$ U = R \\cdot I $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
R = 220\\ \\mathrm{\\Omega} \\\\
I = 0{,}050\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ U = 220 \\cdot 0{,}050 = 11\\ \\mathrm{V} $$

**Svar:** Spänningen är $11\\ \\mathrm{V}$.`,
        },
        {
            level: 1,
            question: `Över en lampa ligger spänningen $U = 6{,}0\\ \\mathrm{V}$ och genom den går strömmen $I = 0{,}40\\ \\mathrm{A}$. Hur stor är lampans resistans?`,
            answer: { value: 15, unit: 'Ω' },
            solution: `Vi löser ut resistansen *R* ur Ohms lag:

$$ U = R \\cdot I \\quad\\Leftrightarrow\\quad R = \\frac{U}{I} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 6{,}0\\ \\mathrm{V} \\\\
I = 0{,}40\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ R = \\frac{6{,}0}{0{,}40} = 15\\ \\mathrm{\\Omega} $$

**Svar:** Lampans resistans är $15\\ \\mathrm{\\Omega}$.`,
        },
        {
            level: 1,
            question: `En resistor på $R = 50\\ \\mathrm{\\Omega}$ kopplas till spänningen $U = 12\\ \\mathrm{V}$. Hur stor blir strömmen genom resistorn?`,
            answer: { value: 0.24, unit: 'A' },
            solution: `Vi löser ut strömmen *I* ur Ohms lag:

$$ U = R \\cdot I \\quad\\Leftrightarrow\\quad I = \\frac{U}{R} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 12\\ \\mathrm{V} \\\\
R = 50\\ \\mathrm{\\Omega}
\\end{array} \\right]
$$

Insättning:

$$ I = \\frac{12}{50} = 0{,}24\\ \\mathrm{A} $$

**Svar:** Strömmen är $0{,}24\\ \\mathrm{A}$.

**Generell slutsats:** Ohms lag kan lösas ut åt tre håll — $U = R \\cdot I$, $R = U/I$ och $I = U/R$. Vilken form du behöver beror på vad som efterfrågas.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En kopparledare är $25\\ \\mathrm{m}$ lång och har tvärsnittsarean $1{,}5\\ \\mathrm{mm^2}$. Kopparens resistivitet är $\\rho = 1{,}7 \\cdot 10^{-8}\\ \\mathrm{\\Omega \\cdot m}$. Bestäm ledarens resistans.`,
            answer: { value: 0.28, unit: 'Ω' },
            solution: `Resistansen i en ledare beror på resistivitet, längd och tvärsnittsarea:

$$ R = \\rho \\cdot \\frac{l}{A} $$

Mätvärden (arean omvandlad till m²):
$$
\\left[ \\begin{array}{l}
\\rho = 1{,}7 \\cdot 10^{-8}\\ \\mathrm{\\Omega \\cdot m} \\\\
l = 25\\ \\mathrm{m} \\\\
A = 1{,}5\\ \\mathrm{mm^2} = 1{,}5 \\cdot 10^{-6}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

Insättning:

$$ R = 1{,}7 \\cdot 10^{-8} \\cdot \\frac{25}{1{,}5 \\cdot 10^{-6}} = 0{,}283\\ \\mathrm{\\Omega} \\approx 0{,}28\\ \\mathrm{\\Omega} $$

**Svar:** Ledarens resistans är ungefär $0{,}28\\ \\mathrm{\\Omega}$.

**Generell slutsats:** Den knepiga omvandlingen är arean: $1\\ \\mathrm{mm^2} = 10^{-6}\\ \\mathrm{m^2}$ (inte $10^{-3}$!), eftersom $\\mathrm{mm^2} = (10^{-3}\\ \\mathrm{m})^2 = 10^{-6}\\ \\mathrm{m^2}$. Koppar har låg resistivitet, därför är resistansen liten trots 25 meter ledare.`,
        },
        {
            level: 2,
            question: `En $10\\ \\mathrm{m}$ lång nikromtråd med tvärsnittsarean $0{,}20\\ \\mathrm{mm^2}$ kopplas till spänningen $1{,}5\\ \\mathrm{V}$. Hur stor ström går genom tråden? Nikromens resistivitet är $\\rho = 1{,}1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}$.`,
            answer: { value: 27, unit: 'mA' },
            solution: `Vi beräknar först trådens resistans:

$$ R = \\rho \\cdot \\frac{l}{A} $$

$$
\\left[ \\begin{array}{l}
\\rho = 1{,}1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m} \\\\
l = 10\\ \\mathrm{m} \\\\
A = 0{,}20\\ \\mathrm{mm^2} = 0{,}20 \\cdot 10^{-6}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$ R = 1{,}1 \\cdot 10^{-6} \\cdot \\frac{10}{0{,}20 \\cdot 10^{-6}} = 55\\ \\mathrm{\\Omega} $$

Sedan ger Ohms lag strömmen:

$$ I = \\frac{U}{R} = \\frac{1{,}5}{55} = 0{,}0273\\ \\mathrm{A} \\approx 27\\ \\mathrm{mA} $$

**Svar:** Strömmen är ungefär $27\\ \\mathrm{mA}$ (eller $0{,}027\\ \\mathrm{A}$).

**Generell slutsats:** Uppgiften kräver två formler i följd: först $R = \\rho l / A$ för att hitta trådens resistans, sedan Ohms lag för strömmen. Nikrom har hög resistivitet — därför används det just i värmetrådar.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En värmetråd av nikrom ska ha resistansen $R = 24\\ \\mathrm{\\Omega}$. Tråden har en cirkulär tvärsnittsyta med diametern $d = 0{,}40\\ \\mathrm{mm}$, och nikromens resistivitet är $\\rho = 1{,}1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}$. Hur lång måste tråden vara?`,
            answer: { value: 2.7, unit: 'm' },
            solution: `**Steg 1 — tvärsnittsarean.** Tråden är cirkulär, så arean fås ur diametern via radien $r = d/2$:

$$ A = \\pi \\cdot r^2 = \\pi \\cdot \\left(\\frac{d}{2}\\right)^2 = \\pi \\cdot (0{,}20 \\cdot 10^{-3})^2 = 1{,}26 \\cdot 10^{-7}\\ \\mathrm{m^2} $$

**Steg 2 — lös ut längden.** Vi utgår från formeln för resistans i ledare och löser ut *l*:

$$ R = \\rho \\cdot \\frac{l}{A} \\quad\\Leftrightarrow\\quad l = \\frac{R \\cdot A}{\\rho} $$

$$
\\left[ \\begin{array}{l}
R = 24\\ \\mathrm{\\Omega} \\\\
A = 1{,}26 \\cdot 10^{-7}\\ \\mathrm{m^2} \\\\
\\rho = 1{,}1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}
\\end{array} \\right]
$$

$$ l = \\frac{24 \\cdot 1{,}26 \\cdot 10^{-7}}{1{,}1 \\cdot 10^{-6}} = 2{,}74\\ \\mathrm{m} \\approx 2{,}7\\ \\mathrm{m} $$

**Svar:** Tråden måste vara ungefär $2{,}7\\ \\mathrm{m}$ lång.

**Generell slutsats:** Två fällor lurar här. Dels måste arean räknas ut ur *diametern* (halvera till radie först, kvadrera sedan). Dels ska $\\rho l / A = R$ lösas ut för *l*. Diametern $0{,}40\\ \\mathrm{mm}$ ger radien $0{,}20\\ \\mathrm{mm} = 0{,}20 \\cdot 10^{-3}\\ \\mathrm{m}$.`,
        },
        {
            level: 3,
            question: `En metalltråd har resistansen $R_0 = 5{,}0\\ \\mathrm{\\Omega}$. Tråden dras ut (sträcks) till **tre gånger** sin ursprungliga längd. Materialets volym är oförändrad. Hur stor blir trådens nya resistans?`,
            answer: { value: 45, unit: 'Ω' },
            solution: `Den naiva gissningen "tre gånger längre → tre gånger så stor resistans" är **fel** — den missar att tvärsnittsarean ändras när tråden sträcks.

Volymen $V = A \\cdot l$ är konstant. När längden tredubblas ($l \\to 3l$) måste arean krympa till en tredjedel ($A \\to A/3$) för att produkten $A \\cdot l$ ska vara oförändrad.

Sätt in i formeln för resistans i ledare:

$$ R = \\rho \\cdot \\frac{l}{A} \\quad\\Rightarrow\\quad R_\\text{ny} = \\rho \\cdot \\frac{3l}{A/3} = 9 \\cdot \\rho \\cdot \\frac{l}{A} = 9 R_0 $$

$$ R_\\text{ny} = 9 \\cdot 5{,}0 = 45\\ \\mathrm{\\Omega} $$

**Svar:** Den nya resistansen är $45\\ \\mathrm{\\Omega}$.

**Generell slutsats:** När en tråd sträcks med konstant volym ändras resistansen med **kvadraten** på längdfaktorn: $n$ gånger längre ger $n^2$ gånger så stor resistans. Längdökningen och areaminskningen samverkar — båda höjer resistansen.`,
        },
    ],

    'fy1-7.7': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Tre resistorer seriekopplas enligt schemat. Bestäm kretsens ersättningsresistans $R_\\mathrm{tot}$.

${makeCircuit({
    source: { label: 'U' },
    components: [
        { type: 'resistor', label: 'R_1', value: '10 Ω' },
        { type: 'resistor', label: 'R_2', value: '15 Ω' },
        { type: 'resistor', label: 'R_3', value: '25 Ω' },
    ],
})}`,
            answer: { value: 50, unit: 'Ω' },
            solution: `Vid **seriekoppling** är ersättningsresistansen summan av de enskilda resistanserna:

$$ R_\\mathrm{tot} = R_1 + R_2 + R_3 $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
R_1 = 10\\ \\mathrm{\\Omega} \\\\
R_2 = 15\\ \\mathrm{\\Omega} \\\\
R_3 = 25\\ \\mathrm{\\Omega}
\\end{array} \\right]
$$

Insättning:

$$ R_\\mathrm{tot} = 10 + 15 + 25 = 50\\ \\mathrm{\\Omega} $$

**Svar:** Ersättningsresistansen är $50\\ \\mathrm{\\Omega}$.

**Generell slutsats:** I en seriekoppling blir totalresistansen alltid *större* än den största enskilda resistorn — strömmen tvingas igenom alla i tur och ordning.`,
        },
        {
            level: 1,
            question: `Två resistorer på vardera $12\\ \\mathrm{\\Omega}$ parallellkopplas enligt schemat. Bestäm ersättningsresistansen.

${makeCircuit({
    source: { label: 'U' },
    components: [{ type: 'parallel', branches: [
        [{ type: 'resistor', label: 'R_1', value: '12 Ω' }],
        [{ type: 'resistor', label: 'R_2', value: '12 Ω' }],
    ] }],
})}`,
            answer: { value: 6.0, unit: 'Ω' },
            solution: `Vid **parallellkoppling** gäller att inversen av ersättningsresistansen är summan av inverserna:

$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{12} + \\frac{1}{12} = \\frac{2}{12} = \\frac{1}{6} $$

$$ R_\\mathrm{tot} = 6{,}0\\ \\mathrm{\\Omega} $$

**Svar:** Ersättningsresistansen är $6{,}0\\ \\mathrm{\\Omega}$.

**Generell slutsats:** Två *lika* stora resistorer i parallellkoppling ger alltid halva resistansen. I parallellkoppling blir totalresistansen alltid *mindre* än den minsta grenen — strömmen får fler vägar att välja på.`,
        },
        {
            level: 1,
            question: `En $20\\ \\mathrm{\\Omega}$-resistor och en $60\\ \\mathrm{\\Omega}$-resistor parallellkopplas enligt schemat. Bestäm ersättningsresistansen.

${makeCircuit({
    source: { label: 'U' },
    components: [{ type: 'parallel', branches: [
        [{ type: 'resistor', label: 'R_1', value: '20 Ω' }],
        [{ type: 'resistor', label: 'R_2', value: '60 Ω' }],
    ] }],
})}`,
            answer: { value: 15, unit: 'Ω' },
            solution: `Vi använder formeln för parallellkoppling:

$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{20} + \\frac{1}{60} $$

Vi sätter på gemensam nämnare (60):

$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{3}{60} + \\frac{1}{60} = \\frac{4}{60} = \\frac{1}{15} $$

$$ R_\\mathrm{tot} = 15\\ \\mathrm{\\Omega} $$

**Svar:** Ersättningsresistansen är $15\\ \\mathrm{\\Omega}$.

**Generell slutsats:** Glöm inte sista steget — formeln ger $1/R_\\mathrm{tot}$, så du måste invertera till slut för att få $R_\\mathrm{tot}$. En vanlig miss är att svara $1/15\\ \\mathrm{\\Omega}$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En okänd resistor parallellkopplas med en $30\\ \\mathrm{\\Omega}$-resistor. Tillsammans ger de ersättningsresistansen $12\\ \\mathrm{\\Omega}$. Hur stor är den okända resistorn?

${makeCircuit({
    source: { label: 'U' },
    components: [{ type: 'parallel', branches: [
        [{ type: 'resistor', label: 'R_1', value: '30 Ω' }],
        [{ type: 'resistor', label: 'R_2', value: '?' }],
    ] }],
})}`,
            answer: { value: 20, unit: 'Ω' },
            solution: `Vi utgår från parallellkopplingsformeln och löser ut den okända termen $1/R_2$:

$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\quad\\Leftrightarrow\\quad \\frac{1}{R_2} = \\frac{1}{R_\\mathrm{tot}} - \\frac{1}{R_1} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
R_\\mathrm{tot} = 12\\ \\mathrm{\\Omega} \\\\
R_1 = 30\\ \\mathrm{\\Omega}
\\end{array} \\right]
$$

Insättning (gemensam nämnare 60):

$$ \\frac{1}{R_2} = \\frac{1}{12} - \\frac{1}{30} = \\frac{5}{60} - \\frac{2}{60} = \\frac{3}{60} = \\frac{1}{20} $$

$$ R_2 = 20\\ \\mathrm{\\Omega} $$

**Svar:** Den okända resistorn är $20\\ \\mathrm{\\Omega}$.

**Generell slutsats:** Eftersom totalresistansen ($12\\ \\mathrm{\\Omega}$) måste vara mindre än varje enskild gren, kan vi direkt sluta oss till att den okända resistorn är större än $12\\ \\mathrm{\\Omega}$ — en bra rimlighetskontroll.`,
        },
        {
            level: 2,
            question: `Två resistorer $R_1 = 15\\ \\mathrm{\\Omega}$ och $R_2 = 45\\ \\mathrm{\\Omega}$ seriekopplas till ett batteri med spänningen $U = 12\\ \\mathrm{V}$. Hur stor ström går ut från batteriet?

${makeCircuit({
    source: { label: 'U', value: '12 V' },
    components: [
        { type: 'resistor', label: 'R_1', value: '15 Ω' },
        { type: 'resistor', label: 'R_2', value: '45 Ω' },
    ],
})}`,
            answer: { value: 0.20, unit: 'A' },
            solution: `Vi beräknar först kretsens ersättningsresistans. Resistorerna sitter i serie:

$$ R_\\mathrm{tot} = R_1 + R_2 = 15 + 45 = 60\\ \\mathrm{\\Omega} $$

Strömmen ut från batteriet fås sedan ur Ohms lag:

$$ I = \\frac{U}{R_\\mathrm{tot}} = \\frac{12}{60} = 0{,}20\\ \\mathrm{A} $$

**Svar:** Strömmen ut från batteriet är $0{,}20\\ \\mathrm{A}$.

**Generell slutsats:** Två steg: bestäm först totalresistansen, använd sedan Ohms lag på *hela* kretsen. I en seriekoppling är denna ström dessutom densamma genom båda resistorerna.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Två resistorer ger tillsammans ersättningsresistansen $40\\ \\mathrm{\\Omega}$ när de seriekopplas, men bara $7{,}5\\ \\mathrm{\\Omega}$ när de parallellkopplas. Hur stora är de två resistanserna?`,
            solution: `Vi kallar resistanserna $R_1$ och $R_2$ och ställer upp ett ekvationssystem ur de två villkoren.

**Seriekoppling:**
$$ R_1 + R_2 = 40 \\qquad (1) $$

**Parallellkoppling:** med formeln $\\dfrac{1}{R_\\mathrm{tot}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} = \\dfrac{R_1 + R_2}{R_1 \\cdot R_2}$ får vi $R_\\mathrm{tot} = \\dfrac{R_1 \\cdot R_2}{R_1 + R_2}$, alltså

$$ \\frac{R_1 \\cdot R_2}{R_1 + R_2} = 7{,}5 $$

Sätt in $R_1 + R_2 = 40$ från (1):

$$ \\frac{R_1 \\cdot R_2}{40} = 7{,}5 \\quad\\Leftrightarrow\\quad R_1 \\cdot R_2 = 300 \\qquad (2) $$

Vi har nu summan ($40$) och produkten ($300$) av de två talen. De är rötter till andragradsekvationen

$$ x^2 - 40x + 300 = 0 $$

$$ x = \\frac{40 \\pm \\sqrt{40^2 - 4 \\cdot 300}}{2} = \\frac{40 \\pm \\sqrt{400}}{2} = \\frac{40 \\pm 20}{2} $$

vilket ger $x = 30$ eller $x = 10$.

**Svar:** Resistanserna är $10\\ \\mathrm{\\Omega}$ och $30\\ \\mathrm{\\Omega}$.

**Generell slutsats:** När man känner *summan* och *produkten* av två tal är de alltid rötterna till $x^2 - (\\text{summa})x + (\\text{produkt}) = 0$. Kontroll: $10 + 30 = 40$ ✓ och $\\dfrac{10 \\cdot 30}{40} = \\dfrac{300}{40} = 7{,}5$ ✓.`,
        },
    ],

    'fy1-7.8': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Studera kopplingsschemat. Vilka resistorer är parallellkopplade?

${makeCircuit({
    source: { label: 'U', value: '24 V' },
    components: [
        { type: 'resistor', label: 'R_1', value: '4,0 Ω' },
        { type: 'parallel', branches: [
            [{ type: 'resistor', label: 'R_2', value: '12 Ω' }],
            [{ type: 'resistor', label: 'R_3', value: '6,0 Ω' }],
        ] },
    ],
})}`,
            choices: [
                `$R_1$ och $R_2$.`,
                `$R_2$ och $R_3$.`,
                `$R_1$, $R_2$ och $R_3$ — alla tre.`,
                `Inga är parallella, alla sitter i serie.`,
            ],
            correct: 1,
            solution: `$R_2$ och $R_3$ sitter i två separata grenar mellan samma två förgreningspunkter — strömmen kan välja väg genom den ena *eller* den andra. Det är definitionen av en **parallellkoppling**.

$R_1$ sitter däremot ensam på huvudledningen *före* förgreningen, alltså i **serie** med hela parallelldelen.

**Svar:** Alternativ B — $R_2$ och $R_3$.

**Generell slutsats:** Knepet är att hitta förgreningspunkterna (noderna). Komponenter mellan *samma* par av noder är parallella; komponenter som strömmen måste passera i tur och ordning är i serie.`,
        },
        {
            level: 1,
            question: `I schemat nedan sitter $R_2 = 12\\ \\mathrm{\\Omega}$ och $R_3 = 6{,}0\\ \\mathrm{\\Omega}$ parallellkopplade. Bestäm ersättningsresistansen $R_{2,3}$ för enbart parallelldelen.

${makeCircuit({
    source: { label: 'U', value: '24 V' },
    components: [
        { type: 'resistor', label: 'R_1', value: '4,0 Ω' },
        { type: 'parallel', branches: [
            [{ type: 'resistor', label: 'R_2', value: '12 Ω' }],
            [{ type: 'resistor', label: 'R_3', value: '6,0 Ω' }],
        ] },
    ],
})}`,
            answer: { value: 4.0, unit: 'Ω' },
            solution: `Vi använder parallellkopplingsformeln på $R_2$ och $R_3$:

$$ \\frac{1}{R_{2,3}} = \\frac{1}{R_2} + \\frac{1}{R_3} = \\frac{1}{12} + \\frac{1}{6{,}0} = \\frac{1}{12} + \\frac{2}{12} = \\frac{3}{12} = \\frac{1}{4} $$

$$ R_{2,3} = 4{,}0\\ \\mathrm{\\Omega} $$

**Svar:** Parallelldelens ersättningsresistans är $4{,}0\\ \\mathrm{\\Omega}$.

**Generell slutsats:** I komplexa kretsar börjar man alltid med att "klumpa ihop" parallelldelarna till en enda ersättningsresistans. Sedan kan kretsen behandlas som en enkel seriekoppling.`,
        },
        {
            level: 1,
            question: `I samma krets har parallelldelen ($R_2$ och $R_3$) ersättningsresistansen $4{,}0\\ \\mathrm{\\Omega}$, och den sitter i serie med $R_1 = 4{,}0\\ \\mathrm{\\Omega}$. Bestäm kretsens totala resistans $R_\\mathrm{tot}$.`,
            answer: { value: 8.0, unit: 'Ω' },
            solution: `Parallelldelen kan nu ersättas med en enda resistor på $4{,}0\\ \\mathrm{\\Omega}$, som sitter i **serie** med $R_1$. Seriekopplade resistanser adderas:

$$ R_\\mathrm{tot} = R_1 + R_{2,3} = 4{,}0 + 4{,}0 = 8{,}0\\ \\mathrm{\\Omega} $$

**Svar:** Kretsens totala resistans är $8{,}0\\ \\mathrm{\\Omega}$.

**Generell slutsats:** När parallelldelen väl är ihopklumpad blir hela kretsen en ren seriekoppling: $R_1$ i serie med ersättningsresistansen.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Bestäm huvudströmmen *I* som går ut från batteriet i kretsen nedan.

${makeCircuit({
    source: { label: 'U', value: '24 V' },
    components: [
        { type: 'resistor', label: 'R_1', value: '4,0 Ω' },
        { type: 'parallel', branches: [
            [{ type: 'resistor', label: 'R_2', value: '12 Ω' }],
            [{ type: 'resistor', label: 'R_3', value: '6,0 Ω' }],
        ] },
    ],
})}`,
            answer: { value: 3.0, unit: 'A' },
            solution: `**Steg 1 — parallelldelen.** Klumpa ihop $R_2$ och $R_3$:

$$ \\frac{1}{R_{2,3}} = \\frac{1}{12} + \\frac{1}{6{,}0} = \\frac{3}{12} \\quad\\Rightarrow\\quad R_{2,3} = 4{,}0\\ \\mathrm{\\Omega} $$

**Steg 2 — totala resistansen.** Den sitter i serie med $R_1$:

$$ R_\\mathrm{tot} = R_1 + R_{2,3} = 4{,}0 + 4{,}0 = 8{,}0\\ \\mathrm{\\Omega} $$

**Steg 3 — Ohms lag på hela kretsen.**

$$ I = \\frac{U}{R_\\mathrm{tot}} = \\frac{24}{8{,}0} = 3{,}0\\ \\mathrm{A} $$

**Svar:** Huvudströmmen är $3{,}0\\ \\mathrm{A}$.

**Generell slutsats:** Huvudströmmen är hela strömmen som går genom $R_1$ — den delar sedan upp sig mellan $R_2$ och $R_3$ i förgreningen.`,
        },
        {
            level: 2,
            question: `I kretsen nedan är huvudströmmen $I = 3{,}0\\ \\mathrm{A}$ (genom $R_1$). Bestäm spänningen $U_{2,3}$ över parallelldelen.

${makeCircuit({
    source: { label: 'U', value: '24 V' },
    components: [
        { type: 'resistor', label: 'R_1', value: '4,0 Ω' },
        { type: 'parallel', branches: [
            [{ type: 'resistor', label: 'R_2', value: '12 Ω' }],
            [{ type: 'resistor', label: 'R_3', value: '6,0 Ω' }],
        ] },
    ],
})}`,
            answer: { value: 12, unit: 'V' },
            solution: `Batterispänningen delas upp på $R_1$ och parallelldelen. Vi beräknar först delspänningen över $R_1$ med Ohms lag (hela huvudströmmen går genom $R_1$):

$$ U_1 = R_1 \\cdot I = 4{,}0 \\cdot 3{,}0 = 12\\ \\mathrm{V} $$

Resten av batterispänningen ligger över parallelldelen:

$$ U_{2,3} = U - U_1 = 24 - 12 = 12\\ \\mathrm{V} $$

**Svar:** Spänningen över parallelldelen är $12\\ \\mathrm{V}$.

**Generell slutsats:** Spänningen "förbrukas" längs vägen. Det som inte faller över $R_1$ blir kvar över parallelldelen. Denna spänning ligger dessutom över *både* $R_2$ och $R_3$, eftersom parallellkopplade komponenter har samma spänning.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Bestäm strömmen $I_3$ genom resistorn $R_3$ i kretsen nedan.

${makeCircuit({
    source: { label: 'U', value: '24 V' },
    components: [
        { type: 'resistor', label: 'R_1', value: '4,0 Ω' },
        { type: 'parallel', branches: [
            [{ type: 'resistor', label: 'R_2', value: '12 Ω' }],
            [{ type: 'resistor', label: 'R_3', value: '6,0 Ω' }],
        ] },
    ],
})}`,
            answer: { value: 2.0, unit: 'A' },
            solution: `Vi måste arbeta oss fram till spänningen över $R_3$ innan vi kan få dess ström.

**Steg 1 — totala resistansen.** Parallelldelen: $\\dfrac{1}{R_{2,3}} = \\dfrac{1}{12} + \\dfrac{1}{6{,}0} = \\dfrac{3}{12}$, så $R_{2,3} = 4{,}0\\ \\mathrm{\\Omega}$. I serie med $R_1$:

$$ R_\\mathrm{tot} = 4{,}0 + 4{,}0 = 8{,}0\\ \\mathrm{\\Omega} $$

**Steg 2 — huvudströmmen.**

$$ I = \\frac{U}{R_\\mathrm{tot}} = \\frac{24}{8{,}0} = 3{,}0\\ \\mathrm{A} $$

**Steg 3 — spänningen över parallelldelen.**

$$ U_{2,3} = U - R_1 \\cdot I = 24 - 4{,}0 \\cdot 3{,}0 = 12\\ \\mathrm{V} $$

**Steg 4 — strömmen genom $R_3$.** Denna spänning ligger över $R_3$, så Ohms lag ger

$$ I_3 = \\frac{U_{2,3}}{R_3} = \\frac{12}{6{,}0} = 2{,}0\\ \\mathrm{A} $$

**Svar:** Strömmen genom $R_3$ är $2{,}0\\ \\mathrm{A}$.

**Generell slutsats:** Kontroll med Kirchhoffs första lag: $I_2 = U_{2,3}/R_2 = 12/12 = 1{,}0\\ \\mathrm{A}$, och $I_2 + I_3 = 1{,}0 + 2{,}0 = 3{,}0\\ \\mathrm{A} = I$ ✓. Den mindre resistorn ($R_3$) drar den större strömmen — strömmen tar helst den "lättaste" vägen.`,
        },
        {
            level: 3,
            question: `I bryggkopplingen nedan ligger spänningen $U = 12\\ \\mathrm{V}$ över kretsen. En voltmeter är inkopplad mellan punkterna P och Q. Vilken spänning visar voltmetern?

${makeBridge({
    source: { label: 'U', value: '12 V' },
    upper: [ { type: 'resistor', label: 'R_1', value: '50 Ω' }, { type: 'resistor', label: 'R_2', value: '30 Ω' } ],
    lower: [ { type: 'resistor', label: 'R_3', value: '15 Ω' }, { type: 'resistor', label: 'R_4', value: '60 Ω' } ],
    bridge: { type: 'voltmeter', label: 'V' },
})}`,
            answer: { value: 5.1, unit: 'V' },
            solution: `En ideal voltmeter släpper inte igenom någon ström, så de två grenarna fungerar som *oberoende spänningsdelare*. Kretsen kan **inte** förenklas med vanlig serie/parallell — vi måste bestämma potentialen i P och Q var för sig.

**Övre grenen** ($R_1$ och $R_2$ i serie):
$$ I_\\text{övre} = \\frac{U}{R_1 + R_2} = \\frac{12}{50 + 30} = 0{,}15\\ \\mathrm{A} $$
Spänningen över $R_2$ (från P till den högra noden) är $U_{R_2} = 0{,}15 \\cdot 30 = 4{,}5\\ \\mathrm{V}$. P ligger alltså $4{,}5\\ \\mathrm{V}$ över högernoden.

**Undre grenen** ($R_3$ och $R_4$ i serie):
$$ I_\\text{undre} = \\frac{U}{R_3 + R_4} = \\frac{12}{15 + 60} = 0{,}16\\ \\mathrm{A} $$
Spänningen över $R_4$ (från Q till högra noden) är $U_{R_4} = 0{,}16 \\cdot 60 = 9{,}6\\ \\mathrm{V}$. Q ligger $9{,}6\\ \\mathrm{V}$ över högernoden.

**Spänningen mellan P och Q** är skillnaden mellan deras nivåer över den gemensamma högernoden:

$$ U_{PQ} = |4{,}5 - 9{,}6| = 5{,}1\\ \\mathrm{V} $$

**Svar:** Voltmetern visar $5{,}1\\ \\mathrm{V}$.

**Generell slutsats:** Det här är en **bryggkoppling**. Fällan är att försöka klumpa ihop motstånden i serie/parallell — det går inte, eftersom P och Q inte är samma punkt. Behandla i stället grenarna som två separata spänningsdelare och jämför mittpunkternas potential.`,
        },
    ],

    'fy1-7.9': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En apparat drar strömmen $I = 2{,}0\\ \\mathrm{A}$ vid spänningen $U = 230\\ \\mathrm{V}$. Vilken elektrisk effekt har apparaten?`,
            answer: { value: 460, unit: 'W' },
            solution: `Effekten fås ur sambandet

$$ P = U \\cdot I $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 230\\ \\mathrm{V} \\\\
I = 2{,}0\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ P = 230 \\cdot 2{,}0 = 460\\ \\mathrm{W} $$

**Svar:** Effekten är $460\\ \\mathrm{W}$.`,
        },
        {
            level: 1,
            question: `En resistor på $R = 6{,}0\\ \\mathrm{\\Omega}$ kopplas till spänningen $U = 12\\ \\mathrm{V}$. Vilken effekt utvecklas i resistorn?`,
            answer: { value: 24, unit: 'W' },
            solution: `Här känner vi spänningen *U* och resistansen *R*, så vi väljer effektformeln med just dessa storheter:

$$ P = \\frac{U^2}{R} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 12\\ \\mathrm{V} \\\\
R = 6{,}0\\ \\mathrm{\\Omega}
\\end{array} \\right]
$$

Insättning:

$$ P = \\frac{12^2}{6{,}0} = \\frac{144}{6{,}0} = 24\\ \\mathrm{W} $$

**Svar:** Effekten är $24\\ \\mathrm{W}$.

**Generell slutsats:** Det finns tre effektformler — $P = U \\cdot I$, $P = R \\cdot I^2$ och $P = U^2/R$. Välj den som passar de storheter du *har*, så slipper du räkna ut mellansteg.`,
        },
        {
            level: 1,
            question: `Genom en resistor på $R = 8{,}0\\ \\mathrm{\\Omega}$ går strömmen $I = 0{,}50\\ \\mathrm{A}$. Vilken effekt utvecklas i resistorn?`,
            answer: { value: 2.0, unit: 'W' },
            solution: `Här känner vi resistansen *R* och strömmen *I*, så vi använder effektformeln med dessa:

$$ P = R \\cdot I^2 $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
R = 8{,}0\\ \\mathrm{\\Omega} \\\\
I = 0{,}50\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ P = 8{,}0 \\cdot 0{,}50^2 = 8{,}0 \\cdot 0{,}25 = 2{,}0\\ \\mathrm{W} $$

**Svar:** Effekten är $2{,}0\\ \\mathrm{W}$.

**Generell slutsats:** Glöm inte att strömmen ska kvadreras: $0{,}50^2 = 0{,}25$, inte $0{,}50$. Det är en vanlig miss.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En glödlampa är märkt $60\\ \\mathrm{W}$ och ansluts till spänningen $230\\ \\mathrm{V}$. Hur stor ström drar lampan?`,
            answer: { value: 0.26, unit: 'A' },
            solution: `Vi löser ut strömmen *I* ur effektformeln:

$$ P = U \\cdot I \\quad\\Leftrightarrow\\quad I = \\frac{P}{U} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
P = 60\\ \\mathrm{W} \\\\
U = 230\\ \\mathrm{V}
\\end{array} \\right]
$$

Insättning:

$$ I = \\frac{60}{230} = 0{,}26\\ \\mathrm{A} $$

**Svar:** Lampan drar ungefär $0{,}26\\ \\mathrm{A}$.

**Generell slutsats:** "Märkeffekt" gäller vid den angivna märkspänningen. En $60\\ \\mathrm{W}$-lampa avsedd för $230\\ \\mathrm{V}$ drar alltså $0{,}26\\ \\mathrm{A}$ — kopplas den till en lägre spänning ändras både ström och effekt.`,
        },
        {
            level: 2,
            question: `En vattenkokare har effekten $2{,}0\\ \\mathrm{kW}$ och används i $5{,}0$ minuter. Hur mycket energi förbrukar den? Svara i kilojoule (kJ).`,
            answer: { value: 600, unit: 'kJ' },
            solution: `Effekt är energi per tid, $P = E/t$. Vi löser ut energin *E*:

$$ P = \\frac{E}{t} \\quad\\Leftrightarrow\\quad E = P \\cdot t $$

Mätvärden (i SI-enheter):
$$
\\left[ \\begin{array}{l}
P = 2{,}0\\ \\mathrm{kW} = 2\\,000\\ \\mathrm{W} \\\\
t = 5{,}0\\ \\mathrm{min} = 5{,}0 \\cdot 60\\ \\mathrm{s} = 300\\ \\mathrm{s}
\\end{array} \\right]
$$

Insättning:

$$ E = 2\\,000 \\cdot 300 = 600\\,000\\ \\mathrm{J} = 600\\ \\mathrm{kJ} $$

**Svar:** Vattenkokaren förbrukar $600\\ \\mathrm{kJ}$.

**Generell slutsats:** Effekt (W) säger hur snabbt energi omsätts; energi (J) är effekt gånger tid. Både effekt och tid måste vara i SI-enheter (W och s) för att svaret ska bli i joule.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En värmeslinga av nikrom är $5{,}0\\ \\mathrm{m}$ lång och har tvärsnittsarean $0{,}50\\ \\mathrm{mm^2}$. Slingan kopplas till spänningen $230\\ \\mathrm{V}$. Vilken effekt utvecklas i slingan? Nikromens resistivitet är $\\rho = 1{,}1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}$.`,
            answer: { value: 4.8, unit: 'kW' },
            solution: `**Steg 1 — slingans resistans.** Vi använder formeln för resistans i ledare:

$$ R = \\rho \\cdot \\frac{l}{A} $$

$$
\\left[ \\begin{array}{l}
\\rho = 1{,}1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m} \\\\
l = 5{,}0\\ \\mathrm{m} \\\\
A = 0{,}50\\ \\mathrm{mm^2} = 0{,}50 \\cdot 10^{-6}\\ \\mathrm{m^2}
\\end{array} \\right]
$$

$$ R = 1{,}1 \\cdot 10^{-6} \\cdot \\frac{5{,}0}{0{,}50 \\cdot 10^{-6}} = 11\\ \\mathrm{\\Omega} $$

**Steg 2 — effekten.** Nu känner vi spänningen och resistansen:

$$ P = \\frac{U^2}{R} = \\frac{230^2}{11} = 4\\,809\\ \\mathrm{W} \\approx 4{,}8\\ \\mathrm{kW} $$

**Svar:** Effekten är ungefär $4{,}8\\ \\mathrm{kW}$.

**Generell slutsats:** Uppgiften binder ihop två kapitelavsnitt: först geometrin ($R = \\rho l / A$), sedan effekten ($P = U^2/R$). En kort, tunn nikromtråd ger lagom resistans för att utveckla stor värmeeffekt — precis principen bakom element och brödrostar.`,
        },
        {
            level: 3,
            question: `En doppvärmare med resistansen $28\\ \\mathrm{\\Omega}$ kopplas till spänningen $230\\ \\mathrm{V}$ och sänks ner i $1{,}5\\ \\mathrm{liter}$ vatten som håller $20\\ \\mathrm{°C}$. Hur lång tid tar det att värma vattnet till $100\\ \\mathrm{°C}$? Anta att all elektrisk energi går till vattnet. Vattnets specifika värmekapacitet är $c = 4{,}18 \\cdot 10^3\\ \\mathrm{J/(kg \\cdot K)}$, och $1{,}0\\ \\mathrm{liter}$ vatten väger $1{,}0\\ \\mathrm{kg}$.`,
            answer: { value: 270, unit: 's' },
            solution: `Tre olika samband måste kopplas ihop: elektrisk effekt, energi-per-tid och värmeenergi.

**Steg 1 — doppvärmarens effekt** (vi känner *U* och *R*):
$$ P = \\frac{U^2}{R} = \\frac{230^2}{28} = 1\\,889\\ \\mathrm{W} $$

**Steg 2 — energin som krävs för att värma vattnet** ($Q = m c \\Delta T$ från värmeläran):
$$ Q = m \\cdot c \\cdot \\Delta T = 1{,}5 \\cdot 4{,}18 \\cdot 10^3 \\cdot (100 - 20) = 5{,}02 \\cdot 10^5\\ \\mathrm{J} $$

**Steg 3 — tiden.** Effekt är energi per tid, $P = E/t$, så
$$ t = \\frac{Q}{P} = \\frac{5{,}02 \\cdot 10^5}{1\\,889} = 266\\ \\mathrm{s} \\approx 270\\ \\mathrm{s} $$

**Svar:** Det tar ungefär $270\\ \\mathrm{s}$ (drygt 4 minuter).

**Generell slutsats:** Uppgiften binder ihop tre olika områden — elektrisk effekt ($P = U^2/R$), energidefinitionen ($E = P t$) och värmelära ($Q = mc\\Delta T$). Bryggan mellan dem är att den elektriska energin omvandlas till värme i vattnet.`,
        },
    ],

    'fy1-7.10': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `På en laddning $Q = 5{,}0\\ \\mathrm{nC}$ som befinner sig i ett elektriskt fält verkar den elektriska kraften $F = 2{,}0 \\cdot 10^{-4}\\ \\mathrm{N}$. Hur stark är den elektriska fältstyrkan i punkten?`,
            answer: { value: 4.0e4, unit: 'N/C' },
            solution: `Elektrisk fältstyrka definieras som kraft per laddningsenhet:

$$ \\mathbb{E} = \\frac{F}{Q} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
F = 2{,}0 \\cdot 10^{-4}\\ \\mathrm{N} \\\\
Q = 5{,}0\\ \\mathrm{nC} = 5{,}0 \\cdot 10^{-9}\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ \\mathbb{E} = \\frac{2{,}0 \\cdot 10^{-4}}{5{,}0 \\cdot 10^{-9}} = 4{,}0 \\cdot 10^4\\ \\mathrm{N/C} $$

**Svar:** Fältstyrkan är $4{,}0 \\cdot 10^4\\ \\mathrm{N/C}$.

**Generell slutsats:** Skilj på $\\mathbb{E}$ (fältstyrka, enhet N/C) och *E* (energi, enhet J). De skrivs med samma bokstav men är helt olika storheter.`,
        },
        {
            level: 1,
            question: `I ett elektriskt fält med fältstyrkan $\\mathbb{E} = 3{,}0 \\cdot 10^4\\ \\mathrm{N/C}$ placeras en laddning $Q = 2{,}0\\ \\mathrm{nC}$. Hur stor elektrisk kraft verkar på laddningen?`,
            answer: { value: 60, unit: 'μN' },
            solution: `Vi löser ut kraften *F* ur definitionen av fältstyrka:

$$ \\mathbb{E} = \\frac{F}{Q} \\quad\\Leftrightarrow\\quad F = \\mathbb{E} \\cdot Q $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\mathbb{E} = 3{,}0 \\cdot 10^4\\ \\mathrm{N/C} \\\\
Q = 2{,}0\\ \\mathrm{nC} = 2{,}0 \\cdot 10^{-9}\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ F = 3{,}0 \\cdot 10^4 \\cdot 2{,}0 \\cdot 10^{-9} = 6{,}0 \\cdot 10^{-5}\\ \\mathrm{N} = 60\\ \\mathrm{\\mu N} $$

**Svar:** Kraften är $60\\ \\mathrm{\\mu N}$ (eller $6{,}0 \\cdot 10^{-5}\\ \\mathrm{N}$).

**Generell slutsats:** Fältstyrkan beskriver fältet *oberoende* av vilken laddning man placerar i det. Kraften på en faktisk laddning fås först när man multiplicerar fältstyrkan med laddningen.`,
        },
        {
            level: 1,
            question: `Bestäm den elektriska fältstyrkan i en punkt $10\\ \\mathrm{cm}$ från medelpunkten på en liten kula med laddningen $Q = 15\\ \\mathrm{nC}$. Coulombs konstant är $k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$.`,
            answer: { value: 1.3e4, unit: 'N/C', tol: 0.05 },
            solution: `Fältstyrkan från ett laddat klot fås ur

$$ \\mathbb{E} = k \\cdot \\frac{Q}{r^2} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2} \\\\
Q = 15\\ \\mathrm{nC} = 15 \\cdot 10^{-9}\\ \\mathrm{C} \\\\
r = 10\\ \\mathrm{cm} = 0{,}10\\ \\mathrm{m}
\\end{array} \\right]
$$

Insättning:

$$ \\mathbb{E} = 8{,}99 \\cdot 10^9 \\cdot \\frac{15 \\cdot 10^{-9}}{0{,}10^2} = 1{,}3 \\cdot 10^4\\ \\mathrm{N/C} $$

**Svar:** Fältstyrkan är ungefär $1{,}3 \\cdot 10^4\\ \\mathrm{N/C}$.

**Generell slutsats:** Notera likheten med Coulombs lag — men här ingår bara *en* laddning, eftersom fältstyrkan beskriver fältet i punkten innan någon andra laddning placerats där.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Fältstyrkan $5{,}0\\ \\mathrm{cm}$ från medelpunkten på en laddad kula är $1{,}8 \\cdot 10^5\\ \\mathrm{N/C}$. Hur stor är kulans laddning?`,
            answer: { value: 50, unit: 'nC' },
            solution: `Vi utgår från fältstyrkan från ett klot och löser ut laddningen *Q*:

$$ \\mathbb{E} = k \\cdot \\frac{Q}{r^2} \\quad\\Leftrightarrow\\quad Q = \\frac{\\mathbb{E} \\cdot r^2}{k} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\mathbb{E} = 1{,}8 \\cdot 10^5\\ \\mathrm{N/C} \\\\
r = 5{,}0\\ \\mathrm{cm} = 0{,}050\\ \\mathrm{m} \\\\
k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}
\\end{array} \\right]
$$

Insättning:

$$ Q = \\frac{1{,}8 \\cdot 10^5 \\cdot 0{,}050^2}{8{,}99 \\cdot 10^9} = 5{,}0 \\cdot 10^{-8}\\ \\mathrm{C} = 50\\ \\mathrm{nC} $$

**Svar:** Kulans laddning är ungefär $50\\ \\mathrm{nC}$.

**Generell slutsats:** Här måste man lösa ut *Q* ur formeln och komma ihåg att avståndet står i kvadrat — det är $r^2 = 0{,}050^2 = 0{,}0025$ som ska in, inte $0{,}050$.`,
        },
        {
            level: 2,
            question: `En liten kula har laddningen $Q = 20\\ \\mathrm{nC}$. I en punkt $8{,}0\\ \\mathrm{cm}$ från kulan placeras en testladdning $q = 3{,}0\\ \\mathrm{nC}$. Hur stor elektrisk kraft verkar på testladdningen?`,
            answer: { value: 84, unit: 'μN' },
            solution: `**Steg 1 — fältstyrkan i punkten** (från kulans laddning *Q*):

$$ \\mathbb{E} = k \\cdot \\frac{Q}{r^2} = 8{,}99 \\cdot 10^9 \\cdot \\frac{20 \\cdot 10^{-9}}{0{,}080^2} = 2{,}81 \\cdot 10^4\\ \\mathrm{N/C} $$

**Steg 2 — kraften på testladdningen** (fältstyrka gånger testladdning):

$$ F = \\mathbb{E} \\cdot q = 2{,}81 \\cdot 10^4 \\cdot 3{,}0 \\cdot 10^{-9} = 8{,}4 \\cdot 10^{-5}\\ \\mathrm{N} = 84\\ \\mathrm{\\mu N} $$

**Svar:** Kraften på testladdningen är ungefär $84\\ \\mathrm{\\mu N}$.

**Generell slutsats:** Att räkna fältstyrka först och sedan kraft ger samma svar som Coulombs lag direkt ($F = k Q q / r^2$) — men "fält-tänket" är kraftfullt när flera laddningar bidrar, eftersom man då adderar fält i stället för att para ihop alla laddningar.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Två laddningar ligger på en rät linje. Punkten P ligger mellan dem. På avståndet $3{,}0\\ \\mathrm{cm}$ till vänster om P sitter $Q_1 = +9{,}0\\ \\mathrm{nC}$, och på avståndet $2{,}0\\ \\mathrm{cm}$ till höger om P sitter $Q_2 = -4{,}0\\ \\mathrm{nC}$. Bestäm den resulterande elektriska fältstyrkan i P.`,
            answer: { value: 1.8e5, unit: 'N/C' },
            solution: `Varje laddning ger upphov till ett fält i P. Vi bestämmer storlek och riktning för vart och ett.

**Fältet från $Q_1$ (positiv, till vänster):** fältlinjer går *ut från* plus, alltså pekar fältet i P **åt höger**.

$$ \\mathbb{E}_1 = k \\cdot \\frac{Q_1}{r_1^2} = 8{,}99 \\cdot 10^9 \\cdot \\frac{9{,}0 \\cdot 10^{-9}}{0{,}030^2} = 8{,}99 \\cdot 10^4\\ \\mathrm{N/C} $$

**Fältet från $Q_2$ (negativ, till höger):** fältlinjer går *in i* minus, alltså pekar fältet i P **åt höger** (mot $Q_2$).

$$ \\mathbb{E}_2 = k \\cdot \\frac{Q_2}{r_2^2} = 8{,}99 \\cdot 10^9 \\cdot \\frac{4{,}0 \\cdot 10^{-9}}{0{,}020^2} = 8{,}99 \\cdot 10^4\\ \\mathrm{N/C} $$

Båda fälten pekar **åt höger**, så de adderas:

$$ \\mathbb{E} = \\mathbb{E}_1 + \\mathbb{E}_2 = 8{,}99 \\cdot 10^4 + 8{,}99 \\cdot 10^4 = 1{,}8 \\cdot 10^5\\ \\mathrm{N/C} $$

**Svar:** Den resulterande fältstyrkan i P är ungefär $1{,}8 \\cdot 10^5\\ \\mathrm{N/C}$, riktad åt höger (mot den negativa laddningen).

**Generell slutsats:** Mellan en positiv och en negativ laddning pekar *båda* fälten åt samma håll (från plus mot minus) — därför adderas de. Att avgöra riktningen med regeln "ut från plus, in i minus" är hela poängen med superposition.`,
        },
        {
            level: 3,
            question: `Två lika stora laddningar $Q = 5{,}0\\ \\mathrm{nC}$ placeras i två hörn (A och C) av en kvadrat med sidan $4{,}0\\ \\mathrm{cm}$. Bestäm den elektriska fältstyrkans **storlek** i hörnet B, som ligger intill båda de laddade hörnen. ($k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$)`,
            answer: { value: 4.0e4, unit: 'N/C' },
            solution: `Varje laddning ger ett fält i B. Eftersom A och C är *grannhörn* till B ligger båda på avståndet $4{,}0\\ \\mathrm{cm}$ (kvadratens sida) från B, och de två fälten blir lika stora:

$$ \\mathbb{E}_1 = \\mathbb{E}_2 = k \\cdot \\frac{Q}{a^2} = 8{,}99 \\cdot 10^9 \\cdot \\frac{5{,}0 \\cdot 10^{-9}}{0{,}040^2} = 2{,}81 \\cdot 10^4\\ \\mathrm{N/C} $$

**Riktningarna är vinkelräta mot varandra:** fältet från A pekar längs sidan A→B, fältet från C längs sidan C→B, och dessa två sidor möts i rät vinkel i hörnet B. Den resulterande fältstyrkan fås därför med Pythagoras sats — inte genom enkel addition:

$$ \\mathbb{E} = \\sqrt{\\mathbb{E}_1^2 + \\mathbb{E}_2^2} = \\mathbb{E}_1 \\cdot \\sqrt{2} = 2{,}81 \\cdot 10^4 \\cdot \\sqrt{2} = 4{,}0 \\cdot 10^4\\ \\mathrm{N/C} $$

**Svar:** Fältstyrkan i hörnet B är ungefär $4{,}0 \\cdot 10^4\\ \\mathrm{N/C}$.

**Generell slutsats:** Fält (och krafter) är **vektorer** — ligger de inte längs samma linje måste de adderas geometriskt. Står de vinkelrätt blir det Pythagoras; i andra fall delar man upp i $x$- och $y$-komposanter var för sig.`,
        },
    ],

    'fy1-7.11': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Mellan två parallella plattor på avståndet $d = 2{,}0\\ \\mathrm{cm}$ ligger spänningen $U = 100\\ \\mathrm{V}$. Hur stark är den elektriska fältstyrkan mellan plattorna?`,
            answer: { value: 5.0e3, unit: 'V/m' },
            solution: `Mellan två plattor är fältet homogent och fältstyrkan ges av

$$ \\mathbb{E} = \\frac{U}{d} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 100\\ \\mathrm{V} \\\\
d = 2{,}0\\ \\mathrm{cm} = 0{,}020\\ \\mathrm{m}
\\end{array} \\right]
$$

Insättning:

$$ \\mathbb{E} = \\frac{100}{0{,}020} = 5{,}0 \\cdot 10^3\\ \\mathrm{V/m} $$

**Svar:** Fältstyrkan är $5{,}0 \\cdot 10^3\\ \\mathrm{V/m}$.

**Generell slutsats:** Mellan plattor är fältet *homogent* — lika starkt överallt. Enheten V/m är likvärdig med N/C.`,
        },
        {
            level: 1,
            question: `Fältstyrkan mellan två plattor som sitter $5{,}0\\ \\mathrm{cm}$ från varandra är $3{,}0 \\cdot 10^4\\ \\mathrm{V/m}$. Bestäm spänningen mellan plattorna. Svara i kV.`,
            answer: { value: 1.5, unit: 'kV' },
            solution: `Vi löser ut spänningen *U*:

$$ \\mathbb{E} = \\frac{U}{d} \\quad\\Leftrightarrow\\quad U = \\mathbb{E} \\cdot d $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
\\mathbb{E} = 3{,}0 \\cdot 10^4\\ \\mathrm{V/m} \\\\
d = 5{,}0\\ \\mathrm{cm} = 0{,}050\\ \\mathrm{m}
\\end{array} \\right]
$$

Insättning:

$$ U = 3{,}0 \\cdot 10^4 \\cdot 0{,}050 = 1\\,500\\ \\mathrm{V} = 1{,}5\\ \\mathrm{kV} $$

**Svar:** Spänningen är $1{,}5\\ \\mathrm{kV}$ (eller $1\\,500\\ \\mathrm{V}$).`,
        },
        {
            level: 1,
            question: `Mellan två plattor ligger spänningen $U = 600\\ \\mathrm{V}$ och fältstyrkan är $2{,}0 \\cdot 10^4\\ \\mathrm{V/m}$. Hur stort är plattavståndet? Svara i cm.`,
            answer: { value: 3.0, unit: 'cm' },
            solution: `Vi löser ut plattavståndet *d*:

$$ \\mathbb{E} = \\frac{U}{d} \\quad\\Leftrightarrow\\quad d = \\frac{U}{\\mathbb{E}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 600\\ \\mathrm{V} \\\\
\\mathbb{E} = 2{,}0 \\cdot 10^4\\ \\mathrm{V/m}
\\end{array} \\right]
$$

Insättning:

$$ d = \\frac{600}{2{,}0 \\cdot 10^4} = 0{,}030\\ \\mathrm{m} = 3{,}0\\ \\mathrm{cm} $$

**Svar:** Plattavståndet är $3{,}0\\ \\mathrm{cm}$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Mellan två plattor på avståndet $4{,}0\\ \\mathrm{cm}$ ligger spänningen $200\\ \\mathrm{V}$. En liten laddning $Q = 5{,}0\\ \\mathrm{nC}$ placeras i fältet mellan plattorna. Hur stor elektrisk kraft verkar på laddningen?`,
            answer: { value: 25, unit: 'μN' },
            solution: `**Steg 1 — fältstyrkan mellan plattorna:**

$$ \\mathbb{E} = \\frac{U}{d} = \\frac{200}{0{,}040} = 5{,}0 \\cdot 10^3\\ \\mathrm{V/m} $$

**Steg 2 — kraften på laddningen** (fältstyrka gånger laddning):

$$ F = \\mathbb{E} \\cdot Q = 5{,}0 \\cdot 10^3 \\cdot 5{,}0 \\cdot 10^{-9} = 2{,}5 \\cdot 10^{-5}\\ \\mathrm{N} = 25\\ \\mathrm{\\mu N} $$

**Svar:** Kraften på laddningen är $25\\ \\mathrm{\\mu N}$.

**Generell slutsats:** I ett homogent fält är kraften lika stor *överallt* mellan plattorna — den beror inte på var laddningen befinner sig, bara på fältstyrkan och laddningen.`,
        },
        {
            level: 2,
            question: `En laddning $Q = 8{,}0\\ \\mathrm{nC}$ mellan två plattor som sitter $5{,}0\\ \\mathrm{cm}$ från varandra påverkas av den elektriska kraften $F = 1{,}2 \\cdot 10^{-4}\\ \\mathrm{N}$. Hur stor är spänningen mellan plattorna?`,
            answer: { value: 750, unit: 'V' },
            solution: `**Steg 1 — fältstyrkan** ur kraft och laddning:

$$ \\mathbb{E} = \\frac{F}{Q} = \\frac{1{,}2 \\cdot 10^{-4}}{8{,}0 \\cdot 10^{-9}} = 1{,}5 \\cdot 10^4\\ \\mathrm{V/m} $$

**Steg 2 — spänningen** ur fältstyrka och plattavstånd:

$$ U = \\mathbb{E} \\cdot d = 1{,}5 \\cdot 10^4 \\cdot 0{,}050 = 750\\ \\mathrm{V} $$

**Svar:** Spänningen mellan plattorna är $750\\ \\mathrm{V}$.

**Generell slutsats:** Uppgiften använder två olika uttryck för samma fältstyrka: $\\mathbb{E} = F/Q$ (definitionen) och $\\mathbb{E} = U/d$ (mellan plattor). Genom att räkna ut $\\mathbb{E}$ från det ena kan man ta sig vidare till det andra.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En elektron befinner sig mellan två plattor som sitter $2{,}0\\ \\mathrm{cm}$ från varandra med spänningen $500\\ \\mathrm{V}$. Elektronen släpps från vila vid den negativa plattan. Vilken hastighet har den när den når den positiva plattan? ($q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$, $m_e = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}$)`,
            answer: { value: 1.3e7, unit: 'm/s', tol: 0.05 },
            solution: `Vi följer kedjan fält $\\to$ kraft $\\to$ acceleration $\\to$ hastighet.

**Steg 1 — fältstyrkan:**
$$ \\mathbb{E} = \\frac{U}{d} = \\frac{500}{0{,}020} = 2{,}5 \\cdot 10^4\\ \\mathrm{V/m} $$

**Steg 2 — kraften på elektronen:**
$$ F = \\mathbb{E} \\cdot q_e = 2{,}5 \\cdot 10^4 \\cdot 1{,}602 \\cdot 10^{-19} = 4{,}0 \\cdot 10^{-15}\\ \\mathrm{N} $$

**Steg 3 — accelerationen** (Newtons andra lag):
$$ a = \\frac{F}{m_e} = \\frac{4{,}0 \\cdot 10^{-15}}{9{,}11 \\cdot 10^{-31}} = 4{,}4 \\cdot 10^{15}\\ \\mathrm{m/s^2} $$

**Steg 4 — sluthastigheten.** Elektronen accelererar likformigt sträckan $d = 0{,}020\\ \\mathrm{m}$ från vila. Med $v^2 = 2 a d$:

$$ v = \\sqrt{2 a d} = \\sqrt{2 \\cdot 4{,}4 \\cdot 10^{15} \\cdot 0{,}020} = 1{,}3 \\cdot 10^7\\ \\mathrm{m/s} $$

**Svar:** Elektronen når hastigheten ungefär $1{,}3 \\cdot 10^7\\ \\mathrm{m/s}$.

**Generell slutsats:** Det går att kontrollera via energi: $q_e U = \\tfrac{1}{2} m_e v^2$ ger samma svar direkt, eftersom hela "fält-vägen" bara är ett annat sätt att beskriva att den elektriska energin $q_e U$ blir rörelseenergi. Den långa vägen visar *varför* det fungerar.`,
        },
        {
            level: 3,
            question: `En elektron skjuts in horisontellt med hastigheten $v_0 = 2{,}0 \\cdot 10^7\\ \\mathrm{m/s}$ mitt emellan två vågräta plattor. Plattorna är $L = 6{,}0\\ \\mathrm{cm}$ långa och sitter $d = 2{,}0\\ \\mathrm{cm}$ från varandra med spänningen $U = 80\\ \\mathrm{V}$ över sig. Hur stor blir elektronens vertikala avböjning när den lämnar plattorna? ($q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$, $m_e = 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}$)`,
            answer: { value: 3.2, unit: 'mm' },
            solution: `Det här är en **projektilrörelse**: vågrätt en konstant hastighet, lodrätt en accelererad rörelse driven av den elektriska kraften — precis som ett vågrätt kast i ett gravitationsfält. De två rörelserna behandlas var för sig.

**Lodrätt — accelerationen.** Fältet mellan plattorna och kraften på elektronen:
$$ \\mathbb{E} = \\frac{U}{d} = \\frac{80}{0{,}020} = 4\\,000\\ \\mathrm{V/m} $$
$$ a = \\frac{F}{m_e} = \\frac{\\mathbb{E} \\cdot q_e}{m_e} = \\frac{4\\,000 \\cdot 1{,}602 \\cdot 10^{-19}}{9{,}11 \\cdot 10^{-31}} = 7{,}03 \\cdot 10^{14}\\ \\mathrm{m/s^2} $$

**Vågrätt — tiden mellan plattorna** (konstant hastighet $v_0$):
$$ t = \\frac{L}{v_0} = \\frac{0{,}060}{2{,}0 \\cdot 10^7} = 3{,}0 \\cdot 10^{-9}\\ \\mathrm{s} $$

**Lodrät avböjning** under denna tid (start från vila i lodled, $y = \\tfrac{1}{2} a t^2$):
$$ y = \\frac{1}{2} a t^2 = \\frac{1}{2} \\cdot 7{,}03 \\cdot 10^{14} \\cdot (3{,}0 \\cdot 10^{-9})^2 = 3{,}2 \\cdot 10^{-3}\\ \\mathrm{m} = 3{,}2\\ \\mathrm{mm} $$

**Svar:** Avböjningen är ungefär $3{,}2\\ \\mathrm{mm}$.

**Generell slutsats:** Eftersom $3{,}2\\ \\mathrm{mm} < d/2 = 10\\ \\mathrm{mm}$ hinner elektronen ut utan att träffa en platta. Nyckeln är att se rörelsen som ett kast: vågrätt och lodrätt är *oberoende*, och tiden i fältet bestäms av den vågräta rörelsen. Samma princip styr bildröret i gamla TV-apparater och bläckstråleskrivare.`,
        },
    ],

    'fy1-7.12': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `I en krets är potentialen i punkt A $V_A = +12\\ \\mathrm{V}$ och i punkt B $V_B = -4{,}0\\ \\mathrm{V}$. Hur stor är spänningen mellan punkterna A och B?`,
            answer: { value: 16, unit: 'V' },
            solution: `Spänning är skillnaden i potential mellan två punkter, och kan aldrig vara negativ — därför absolutbeloppet:

$$ U = |V_A - V_B| $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
V_A = +12\\ \\mathrm{V} \\\\
V_B = -4{,}0\\ \\mathrm{V}
\\end{array} \\right]
$$

Insättning:

$$ U = |+12 - (-4{,}0)| = |16| = 16\\ \\mathrm{V} $$

**Svar:** Spänningen mellan A och B är $16\\ \\mathrm{V}$.

**Generell slutsats:** Var noga med dubbla tecknet: $12 - (-4{,}0) = 12 + 4{,}0 = 16$. Spänning är *skillnaden* i potential — två punkter kan ha helt olika potential men ändå ha en blygsam spänning emellan sig om de ligger nära varandra på "potentialskalan".`,
        },
        {
            level: 1,
            question: `Vilket av följande påståenden om elektrisk potential är korrekt?`,
            choices: [
                `Strömmen går från en punkt med högre potential till en punkt med lägre potential.`,
                `Strömmen går från en punkt med lägre potential till en punkt med högre potential.`,
                `Potentialen i en jordad punkt är alltid 230 V.`,
                `Elektrisk potential och spänning är exakt samma storhet.`,
            ],
            correct: 0,
            solution: `Strömmen går från **högre** till **lägre** potential — precis som vatten rinner från högre till lägre höjd. Potentialen är som en "elektrisk höjd".

Övriga alternativ är fel: en jordad punkt har potentialen **0 V** (inte 230 V), och potential har tecken (positiv/negativ/noll) medan spänning är den icke-negativa *skillnaden* mellan två potentialer.

**Svar:** Alternativ A.

**Generell slutsats:** Potential (*V*) är en egenskap hos en *enskild punkt* (relativt en nollnivå), medan spänning (*U*) alltid handlar om *två* punkter. Spänning $= |V_A - V_B|$.`,
        },
        {
            level: 1,
            question: `Minuspolen på ett $9{,}0\\ \\mathrm{V}$-batteri är jordad, så att den har potentialen $0\\ \\mathrm{V}$. Vilken potential har då pluspolen?`,
            answer: { value: 9.0, unit: 'V' },
            solution: `Vi startar i den jordade minuspolen ($V = 0$) och potentialvandrar genom batteriet **från minuspol till pluspol**. Då *ökar* potentialen med batteriets spänning:

$$ V_+ = 0 + U = 0 + 9{,}0 = +9{,}0\\ \\mathrm{V} $$

**Svar:** Pluspolen har potentialen $+9{,}0\\ \\mathrm{V}$.

**Generell slutsats:** Att gå från minus till plus *inuti* batteriet höjer potentialen — det är batteriet som "pumpar upp" laddningarna till högre elektrisk potential.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `I en krets är punkt B jordad, så att $V_B = 0$. Punkt A ligger på andra sidan av en $3{,}0\\ \\mathrm{\\Omega}$-resistor som genomflyts av strömmen $4{,}0\\ \\mathrm{A}$. När man potentialvandrar från B till A går man **mot** strömmens riktning. Bestäm potentialen $V_A$.`,
            answer: { value: 12, unit: 'V' },
            solution: `Vi startar i den jordade punkten B ($V_B = 0$) och går till A. Att gå genom en resistor **mot** strömmen *ökar* potentialen med resistorns spänning $R \\cdot I$ (Ohms lag):

$$ V_A = V_B + R \\cdot I $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
V_B = 0 \\\\
R = 3{,}0\\ \\mathrm{\\Omega} \\\\
I = 4{,}0\\ \\mathrm{A}
\\end{array} \\right]
$$

Insättning:

$$ V_A = 0 + 3{,}0 \\cdot 4{,}0 = +12\\ \\mathrm{V} $$

**Svar:** Potentialen i A är $+12\\ \\mathrm{V}$.

**Generell slutsats:** Tumregeln vid potentialvandring genom en resistor: går du **mot** strömmen ökar potentialen, går du **med** strömmen minskar den. Storleken på ändringen är alltid $R \\cdot I$.`,
        },
        {
            level: 2,
            question: `I en sluten krets sitter en $2{,}0\\ \\mathrm{\\Omega}$-resistor och en $4{,}0\\ \\mathrm{\\Omega}$-resistor i serie tillsammans med två batterier: ett $12\\ \\mathrm{V}$-batteri som driver strömmen och ett $3{,}0\\ \\mathrm{V}$-batteri som motverkar den. Bestäm strömmen i kretsen.`,
            answer: { value: 1.5, unit: 'A' },
            solution: `Vi går ett helt varv i kretsen. Enligt **Kirchhoffs andra lag** är summan av alla potentialändringar noll:

$$ \\sum \\Delta V = 0 $$

Längs varvet ökar potentialen med det drivande batteriet ($+12\\ \\mathrm{V}$), minskar med det motverkande batteriet ($-3{,}0\\ \\mathrm{V}$) och minskar genom de båda resistorerna (med strömmen). Detta ger

$$ +12 - 3{,}0 - 2{,}0 \\cdot I - 4{,}0 \\cdot I = 0 $$

$$ 9{,}0 - 6{,}0 \\, I = 0 \\quad\\Leftrightarrow\\quad I = \\frac{9{,}0}{6{,}0} = 1{,}5\\ \\mathrm{A} $$

**Svar:** Strömmen i kretsen är $1{,}5\\ \\mathrm{A}$.

**Generell slutsats:** När två batterier motverkar varandra är det *nettospänningen* ($12 - 3{,}0 = 9{,}0\\ \\mathrm{V}$) som driver strömmen genom den totala resistansen. Kirchhoffs andra lag ger detta automatiskt om man håller koll på tecknen.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Tre punkter A, B och C ligger längs en krets. Punkt B är jordad ($V_B = 0$). Från B till A potentialvandrar man genom en $4{,}0\\ \\mathrm{\\Omega}$-resistor **mot** strömmen $2{,}5\\ \\mathrm{A}$. Från B till C potentialvandrar man genom en $8{,}0\\ \\mathrm{\\Omega}$-resistor **med** samma ström $2{,}5\\ \\mathrm{A}$. Bestäm spänningen mellan punkt A och punkt C.`,
            answer: { value: 30, unit: 'V' },
            solution: `Vi bestämmer potentialen i A och C var för sig, med start i den jordade punkten B.

**Potentialen i A.** Från B går man **mot** strömmen genom $4{,}0\\ \\mathrm{\\Omega}$ → potentialen *ökar* med $R \\cdot I$:

$$ V_A = 0 + 4{,}0 \\cdot 2{,}5 = +10\\ \\mathrm{V} $$

**Potentialen i C.** Från B går man **med** strömmen genom $8{,}0\\ \\mathrm{\\Omega}$ → potentialen *minskar* med $R \\cdot I$:

$$ V_C = 0 - 8{,}0 \\cdot 2{,}5 = -20\\ \\mathrm{V} $$

**Spänningen mellan A och C** är skillnaden i potential (med absolutbelopp):

$$ U = |V_A - V_C| = |+10 - (-20)| = |30| = 30\\ \\mathrm{V} $$

**Svar:** Spänningen mellan A och C är $30\\ \\mathrm{V}$.

**Generell slutsats:** Trots att ingen *enskild* komponent har $30\\ \\mathrm{V}$ över sig, är spänningen mellan A och C ändå $30\\ \\mathrm{V}$ — de ligger på var sin sida om jordningen, en på $+10\\ \\mathrm{V}$ och en på $-20\\ \\mathrm{V}$. Det är skillnaden i potential som räknas, inte värdet hos någon enskild komponent.`,
        },
        {
            level: 3,
            question: `I kretsen nedan är den högra noden jordad ($0\\ \\mathrm{V}$). Bestäm spänningen mellan punkterna P och Q. Tips: bestäm först potentialen i P respektive Q genom att potentialvandra från jordningen.

${makeBridge({
    source: { label: 'U', value: '24 V' },
    upper: [ { type: 'resistor', label: 'R_1', value: '20 Ω' }, { type: 'resistor', label: 'R_2', value: '40 Ω' } ],
    lower: [ { type: 'resistor', label: 'R_3', value: '40 Ω' }, { type: 'resistor', label: 'R_4', value: '20 Ω' } ],
    ground: 'B',
})}`,
            answer: { value: 8.0, unit: 'V' },
            solution: `Den jordade högra noden har potentialen $0\\ \\mathrm{V}$. Vi potentialvandrar därifrån till P respektive Q. Båda grenarna ligger över samma batterispänning $24\\ \\mathrm{V}$.

**Övre grenen** ($R_1 = 20\\ \\mathrm{\\Omega}$, $R_2 = 40\\ \\mathrm{\\Omega}$ i serie):
$$ I_\\text{övre} = \\frac{24}{20 + 40} = 0{,}40\\ \\mathrm{A} $$
Från jordningen (0 V) genom $R_2$ **mot** strömmen upp till P → potentialen ökar:
$$ V_P = 0 + R_2 \\cdot I_\\text{övre} = 40 \\cdot 0{,}40 = +16\\ \\mathrm{V} $$

**Undre grenen** ($R_3 = 40\\ \\mathrm{\\Omega}$, $R_4 = 20\\ \\mathrm{\\Omega}$ i serie):
$$ I_\\text{undre} = \\frac{24}{40 + 20} = 0{,}40\\ \\mathrm{A} $$
Från jordningen genom $R_4$ mot strömmen till Q:
$$ V_Q = 0 + R_4 \\cdot I_\\text{undre} = 20 \\cdot 0{,}40 = +8{,}0\\ \\mathrm{V} $$

**Spänningen mellan P och Q** är skillnaden i potential:
$$ U_{PQ} = |V_P - V_Q| = |16 - 8{,}0| = 8{,}0\\ \\mathrm{V} $$

**Svar:** Spänningen mellan P och Q är $8{,}0\\ \\mathrm{V}$ (P ligger på högre potential än Q).

**Generell slutsats:** I en bryggkoppling har P och Q olika potential trots att grenarna ligger över *samma* spänning — det är skillnaden i hur spänningen *delas* i de två grenarna som ger spänningen mellan mittpunkterna. Potentialvandring från jordningen håller reda på tecknen.`,
        },
    ],

    'fy1-7.13': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En Faradays bur (ett slutet metallhölje) placeras i ett yttre elektriskt fält. Vad gäller för det resulterande elektriska fältet **inuti** buren?`,
            choices: [
                `Fältet inuti blir starkare än det yttre fältet.`,
                `Fältet inuti är noll — det resulterande fältet släcks ut.`,
                `Fältet inuti är ungefär hälften av det yttre fältet.`,
                `Fältet inuti är lika starkt som det yttre och kvarstår.`,
            ],
            correct: 1,
            solution: `Inuti en Faradays bur är det resulterande elektriska fältet **noll**. Ledningselektronerna i metallen omfördelas och skapar ett eget fält som exakt tar ut det yttre fältet inne i buren.

**Svar:** Alternativ B — fältet inuti är noll.

**Generell slutsats:** Det är därför känslig elektronik kan skärmas av med ett metallhölje, och varför du inte får mobiltäckning i en hiss eller ett tjockt metallrum.`,
        },
        {
            level: 1,
            question: `Varför är man oftast säker inuti en bil vid åskväder?`,
            choices: [
                `Gummidäcken isolerar bilen från marken så att blixten inte kan nå in.`,
                `Bilens metallkaross fungerar som en Faradays bur och håller det elektriska fältet borta från kupén.`,
                `Bilens metall leder bort all laddning till motorn där den blir ofarlig.`,
                `Bensinen i tanken absorberar blixtens energi.`,
            ],
            correct: 1,
            solution: `Bilens metallkaross fungerar som en **Faradays bur**: laddningarna fördelar sig på karossens utsida och inuti kupén blir det resulterande fältet noll. Då går strömmen i karossen, inte genom passagerarna.

**Svar:** Alternativ B.

**Generell slutsats:** Att det skulle bero på gummidäcken är en **vanlig missuppfattning**. Däcken är på tok för tunna för att isolera mot en blixt som redan färdats kilometer genom luft — det är karossen, inte däcken, som skyddar.`,
        },
        {
            level: 1,
            question: `Var samlas överskottsladdningarna på en laddad, ihålig metallbur?`,
            choices: [
                `Jämnt fördelade genom hela metallmaterialet.`,
                `På burens insida.`,
                `På burens utsida.`,
                `I burens geometriska mittpunkt.`,
            ],
            correct: 2,
            solution: `Lika laddningar repellerar varandra och strävar därför så långt ifrån varandra som möjligt. På en ledare innebär det att överskottsladdningarna hamnar på **utsidan**.

**Svar:** Alternativ C — på utsidan.

**Generell slutsats:** Det är just därför inget fält uppstår inuti buren: laddningen sitter ytterst, och dess bidrag inuti tar ut varandra. Hänger man föremål på burens insida påverkas de inte, medan föremål på utsidan stöts ut av fältet.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Vad menas med **spetsurladdning**?`,
            choices: [
                `Att laddningar koncentreras i en spetsig del av en ledare så att den lokala fältstyrkan blir så hög att luften runt spetsen laddas och en urladdning sker.`,
                `Att en spetsig ledare alltid stöter bort blixtnedslag helt och hållet.`,
                `Att en metallspets blir så varm av strömmen att den smälter.`,
                `Att laddningen fördelar sig jämnt och försvinner längs en spetsig ledare.`,
            ],
            correct: 0,
            solution: `Vid en spets koncentreras laddningarna, vilket gör den lokala elektriska fältstyrkan mycket hög. Blir den tillräckligt stark sker en **urladdning** till luftmolekylerna, som då laddas.

**Svar:** Alternativ A.

**Generell slutsats:** Samma fenomen kallas också **Sankt Elmseld** och kan ses som ett svagt blått sken kring masttoppar och åskledarspetsar vid åskväder. Det är en urladdning av fotoner, inte samma sak som en åskblixt.`,
        },
        {
            level: 2,
            question: `En mobiltelefon läggs i en helt sluten metalllåda och tappar då all mottagning. Vilken förklaring stämmer bäst?`,
            choices: [
                `Metallen drar till sig radiovågornas energi och laddar telefonens batteri.`,
                `Metalllådan fungerar som en Faradays bur och skärmar av de elektromagnetiska fälten utifrån.`,
                `Metallen blir magnetisk och raderar telefonens signal.`,
                `Telefonen stänger av sig själv eftersom det är mörkt i lådan.`,
            ],
            correct: 1,
            solution: `Metalllådan är en **Faradays bur**. De elektromagnetiska fälten (radiovågorna) som bär telefonsignalen kan inte tränga in i ett slutet metallhölje, så telefonen tappar kontakten med basstationen.

**Svar:** Alternativ B.

**Generell slutsats:** Samma princip används medvetet i avskärmade rum för känsliga mätningar och i skyddspåsar för kontaktlösa bankkort. Det är fälten utifrån som stängs ute — inte något som händer *med* själva telefonen.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Hur kommer det sig, rent fysikaliskt, att det resulterande elektriska fältet inuti en Faradays bur blir noll?`,
            choices: [
                `Metallen absorberar det yttre fältet och omvandlar det till värme.`,
                `Ledningselektronerna omfördelas så att burens ena sida blir negativ och den andra positiv, vilket skapar ett lika stort men motriktat fält inuti som tar ut det yttre fältet.`,
                `Det yttre fältet kan av princip aldrig nå fram till en metallyta.`,
                `Metallen reflekterar fältet rakt tillbaka utåt, ungefär som en spegel reflekterar ljus.`,
            ],
            correct: 1,
            solution: `När det yttre fältet läggs på rör sig de fria ledningselektronerna **mot** fältet. Den ena sidan av buren får då ett elektronöverskott (blir negativ) och den andra ett underskott (blir positiv). Dessa omfördelade laddningar bygger upp ett **eget, motriktat fält** inuti buren. Omfördelningen fortsätter tills det inre fältet är *exakt lika stort* som det yttre — då tar de ut varandra och det resulterande fältet blir noll.

**Svar:** Alternativ B.

**Generell slutsats:** Detta sker nästan ögonblickligen (med ljusets hastighet) och kallas **influens**. Poängen är att utsläckningen inte är passiv "absorption" utan ett aktivt, självreglerande svar: ju starkare yttre fält, desto mer omfördelas laddningarna — alltid precis lagom för att nolla fältet inuti.`,
        },
    ],

    'fy1-7.14': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Två horisontella plattor sitter $5{,}0\\ \\mathrm{mm}$ från varandra och över dem ligger spänningen $1{,}0\\ \\mathrm{kV}$. Hur stark är den elektriska fältstyrkan mellan plattorna?`,
            answer: { value: 2.0e5, unit: 'V/m' },
            solution: `Mellan plattorna är fältet homogent:

$$ \\mathbb{E} = \\frac{U}{d} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
U = 1{,}0\\ \\mathrm{kV} = 1\\,000\\ \\mathrm{V} \\\\
d = 5{,}0\\ \\mathrm{mm} = 5{,}0 \\cdot 10^{-3}\\ \\mathrm{m}
\\end{array} \\right]
$$

Insättning:

$$ \\mathbb{E} = \\frac{1\\,000}{5{,}0 \\cdot 10^{-3}} = 2{,}0 \\cdot 10^5\\ \\mathrm{V/m} $$

**Svar:** Fältstyrkan är $2{,}0 \\cdot 10^5\\ \\mathrm{V/m}$.

**Generell slutsats:** Det är detta fält som i Millikans försök ger oljedropparna en uppåtriktad elektrisk kraft. Glöm inte att $\\mathrm{mm} \\to \\mathrm{m}$ är faktorn $10^{-3}$.`,
        },
        {
            level: 1,
            question: `En oljedroppe svävar i jämvikt i ett elektriskt fält med fältstyrkan $\\mathbb{E} = 4{,}0 \\cdot 10^5\\ \\mathrm{V/m}$. Droppens massa är $m = 2{,}0 \\cdot 10^{-14}\\ \\mathrm{kg}$. Hur stor är droppens laddning? ($g = 9{,}82\\ \\mathrm{N/kg}$)`,
            answer: { value: 4.9e-19, unit: 'C' },
            solution: `Eftersom droppen svävar måste den uppåtriktade elektriska kraften vara lika stor som den nedåtriktade tyngdkraften:

$$ F_\\mathrm{e} = F_\\mathrm{G} \\quad\\Leftrightarrow\\quad Q \\cdot \\mathbb{E} = m \\cdot g $$

Vi löser ut laddningen *Q*:

$$ Q = \\frac{m \\cdot g}{\\mathbb{E}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 2{,}0 \\cdot 10^{-14}\\ \\mathrm{kg} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
\\mathbb{E} = 4{,}0 \\cdot 10^5\\ \\mathrm{V/m}
\\end{array} \\right]
$$

Insättning:

$$ Q = \\frac{2{,}0 \\cdot 10^{-14} \\cdot 9{,}82}{4{,}0 \\cdot 10^5} = 4{,}9 \\cdot 10^{-19}\\ \\mathrm{C} $$

**Svar:** Droppens laddning är ungefär $4{,}9 \\cdot 10^{-19}\\ \\mathrm{C}$.

**Generell slutsats:** Hela Millikans metod bygger på denna kraftbalans: när droppen står still vet vi att $F_\\mathrm{e} = F_\\mathrm{G}$, och då kan laddningen räknas ut.`,
        },
        {
            level: 1,
            question: `En oljedroppe i Millikans försök har laddningen $Q = 4{,}8 \\cdot 10^{-19}\\ \\mathrm{C}$. Hur många överskottselektroner har droppen? Elementarladdningen är $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 3, unit: 'st' },
            solution: `Antalet elektroner *n* fås genom att dividera droppens laddning med elementarladdningen:

$$ n = \\frac{Q}{q_e} = \\frac{4{,}8 \\cdot 10^{-19}}{1{,}602 \\cdot 10^{-19}} = 2{,}99\\ldots \\approx 3\\ \\text{st} $$

**Svar:** Droppen har $3$ överskottselektroner.

**Generell slutsats:** Svaret blir (nästan) ett heltal — det var precis det Millikan upptäckte. Laddningen är alltid en hel multipel av elementarladdningen $1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$, aldrig något "mitt emellan".`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Mellan två horisontella plattor $4{,}0\\ \\mathrm{mm}$ från varandra läggs spänningen $1{,}5\\ \\mathrm{kV}$. En oljedroppe med massan $m = 1{,}8 \\cdot 10^{-14}\\ \\mathrm{kg}$ svävar i jämvikt mellan plattorna. Bestäm droppens laddning. ($g = 9{,}82\\ \\mathrm{N/kg}$)`,
            answer: { value: 4.7e-19, unit: 'C' },
            solution: `Vid jämvikt är elektrisk kraft och tyngdkraft lika stora. Med $\\mathbb{E} = U/d$ blir kraftbalansen:

$$ F_\\mathrm{e} = F_\\mathrm{G} \\quad\\Leftrightarrow\\quad Q \\cdot \\frac{U}{d} = m \\cdot g $$

Vi löser ut laddningen *Q*:

$$ Q = \\frac{m \\cdot g \\cdot d}{U} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 1{,}8 \\cdot 10^{-14}\\ \\mathrm{kg} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
d = 4{,}0\\ \\mathrm{mm} = 4{,}0 \\cdot 10^{-3}\\ \\mathrm{m} \\\\
U = 1{,}5\\ \\mathrm{kV} = 1\\,500\\ \\mathrm{V}
\\end{array} \\right]
$$

Insättning:

$$ Q = \\frac{1{,}8 \\cdot 10^{-14} \\cdot 9{,}82 \\cdot 4{,}0 \\cdot 10^{-3}}{1\\,500} = 4{,}7 \\cdot 10^{-19}\\ \\mathrm{C} $$

**Svar:** Droppens laddning är ungefär $4{,}7 \\cdot 10^{-19}\\ \\mathrm{C}$.

**Generell slutsats:** Formeln $Q = m g d / U$ är bara kraftbalansen $Q \\mathbb{E} = mg$ med $\\mathbb{E}$ utbytt mot $U/d$. Man behöver alltså inte räkna ut fältstyrkan separat — men det går lika bra att göra det i två steg.`,
        },
        {
            level: 2,
            question: `Mellan två horisontella plattor $5{,}0\\ \\mathrm{mm}$ från varandra läggs spänningen $2{,}0\\ \\mathrm{kV}$. En oljedroppe med massan $m = 1{,}3 \\cdot 10^{-14}\\ \\mathrm{kg}$ svävar i jämvikt. Hur många överskottselektroner har droppen? ($g = 9{,}82\\ \\mathrm{N/kg}$, $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$)`,
            answer: { value: 2, unit: 'st' },
            solution: `**Steg 1 — droppens laddning** ur kraftbalansen $Q \\cdot U/d = m g$:

$$ Q = \\frac{m \\cdot g \\cdot d}{U} = \\frac{1{,}3 \\cdot 10^{-14} \\cdot 9{,}82 \\cdot 5{,}0 \\cdot 10^{-3}}{2\\,000} = 3{,}2 \\cdot 10^{-19}\\ \\mathrm{C} $$

**Steg 2 — antalet elektroner:**

$$ n = \\frac{Q}{q_e} = \\frac{3{,}2 \\cdot 10^{-19}}{1{,}602 \\cdot 10^{-19}} = 1{,}99\\ldots \\approx 2\\ \\text{st} $$

**Svar:** Droppen har $2$ överskottselektroner.

**Generell slutsats:** Att svaret hamnar så nära ett heltal är inget sammanträffande — det är hela poängen med försöket. Droppens laddning *måste* vara ett helt antal elementarladdningar.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Mellan två horisontella plattor $6{,}0\\ \\mathrm{mm}$ från varandra svävar en oljedroppe med massan $m = 3{,}3 \\cdot 10^{-15}\\ \\mathrm{kg}$ i jämvikt. Droppen har 2 överskottselektroner. Vilken spänning ligger över plattorna? ($g = 9{,}82\\ \\mathrm{N/kg}$, $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$)`,
            answer: { value: 610, unit: 'V' },
            solution: `**Steg 1 — droppens laddning.** Med 2 överskottselektroner är

$$ Q = n \\cdot q_e = 2 \\cdot 1{,}602 \\cdot 10^{-19} = 3{,}204 \\cdot 10^{-19}\\ \\mathrm{C} $$

**Steg 2 — kraftbalansen, löst för spänningen.** Vid jämvikt gäller $F_\\mathrm{e} = F_\\mathrm{G}$, dvs. $Q \\cdot \\dfrac{U}{d} = m \\cdot g$. Vi löser ut *U*:

$$ U = \\frac{m \\cdot g \\cdot d}{Q} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 3{,}3 \\cdot 10^{-15}\\ \\mathrm{kg} \\\\
g = 9{,}82\\ \\mathrm{N/kg} \\\\
d = 6{,}0\\ \\mathrm{mm} = 6{,}0 \\cdot 10^{-3}\\ \\mathrm{m} \\\\
Q = 3{,}204 \\cdot 10^{-19}\\ \\mathrm{C}
\\end{array} \\right]
$$

Insättning:

$$ U = \\frac{3{,}3 \\cdot 10^{-15} \\cdot 9{,}82 \\cdot 6{,}0 \\cdot 10^{-3}}{3{,}204 \\cdot 10^{-19}} = 607\\ \\mathrm{V} \\approx 610\\ \\mathrm{V} $$

**Svar:** Spänningen över plattorna är ungefär $610\\ \\mathrm{V}$.

**Generell slutsats:** Detta är försöket "baklänges": i stället för att mäta upp spänningen och räkna ut laddningen, utgår vi från en känd laddning (2 elektroner) och frågar vilken spänning som krävs för jämvikt. Nyckeln är att först omvandla antalet elektroner till en laddning med $Q = n \\cdot q_e$.`,
        },
        {
            level: 3,
            question: `En oljedroppe svävar i jämvikt mellan två vågräta plattor som sitter $8{,}0\\ \\mathrm{mm}$ från varandra med spänningen $5{,}0\\ \\mathrm{kV}$. Droppen har 4 överskottselektroner. Oljans densitet är $\\rho = 900\\ \\mathrm{kg/m^3}$. Bestäm oljedroppens radie. Anta att droppen är klotformad ($V = \\tfrac{4}{3}\\pi r^3$). ($q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$, $g = 9{,}82\\ \\mathrm{N/kg}$)`,
            answer: { value: 2.2, unit: 'μm' },
            solution: `**Steg 1 — droppens laddning** (4 elementarladdningar):
$$ Q = 4 \\cdot q_e = 4 \\cdot 1{,}602 \\cdot 10^{-19} = 6{,}41 \\cdot 10^{-19}\\ \\mathrm{C} $$

**Steg 2 — droppens massa ur jämvikten.** Vid svävning balanserar elektrisk kraft tyngdkraften, och $\\mathbb{E} = U/d$:
$$ Q \\cdot \\frac{U}{d} = m \\cdot g \\quad\\Rightarrow\\quad m = \\frac{Q \\cdot U}{d \\cdot g} = \\frac{6{,}41 \\cdot 10^{-19} \\cdot 5\\,000}{0{,}0080 \\cdot 9{,}82} = 4{,}08 \\cdot 10^{-14}\\ \\mathrm{kg} $$

**Steg 3 — radien ur massa och densitet.** Massan är densitet gånger klotvolym:
$$ m = \\rho \\cdot \\frac{4}{3}\\pi r^3 \\quad\\Rightarrow\\quad r = \\sqrt[3]{\\frac{3m}{4\\pi\\rho}} $$
$$ r = \\sqrt[3]{\\frac{3 \\cdot 4{,}08 \\cdot 10^{-14}}{4\\pi \\cdot 900}} = \\sqrt[3]{1{,}08 \\cdot 10^{-17}} = 2{,}2 \\cdot 10^{-6}\\ \\mathrm{m} = 2{,}2\\ \\mathrm{\\mu m} $$

**Svar:** Oljedroppens radie är ungefär $2{,}2\\ \\mathrm{\\mu m}$.

**Generell slutsats:** Uppgiften kombinerar Millikans jämvikt, fältet mellan plattor *och* sambandet mellan massa, densitet och klotvolym — och kräver till sist en kubikrot. Det var just genom att bestämma droppens storlek (via dess falltid) som Millikan kunde få fram massan och därmed elementarladdningen.`,
        },
    ],

    'fy1-8.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Två rymdskepp närmar sig varandra, vardera med farten $0{,}60c$. Det ena skeppet skickar en ljuspuls mot det andra. Med vilken hastighet uppmäter det mottagande skeppet ljuspulsen?`,
            choices: [
                `$1{,}2c$ — skeppens farter ($0{,}60c + 0{,}60c$) adderas till ljusets.`,
                `$c$ — ljusets hastighet är densamma oavsett hur källa och observatör rör sig.`,
                `$1{,}6c$ — det egna skeppets fart ($0{,}60c$) adderas till ljusets ($c$).`,
                `$0{,}60c$ — ljuset bromsas till skeppens fart.`,
            ],
            correct: 1,
            solution: `Ljusets hastighet i vakuum är **alltid** $c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$, oavsett hur ljuskällan eller observatören rör sig. Det mottagande skeppet mäter alltså ljuspulsen till $c$ — varken mer eller mindre.

**Svar:** Alternativ B — $c$.

**Generell slutsats:** Det här är relativitetsteorins grundpostulat och bekräftades av Michelson–Morleys experiment. Hastigheter "adderas" inte på vanligt vis när ljus är inblandat — annars hade svaret blivit $1{,}2c$, vilket är fel. Just att $c$ är konstant tvingar fram tidsdilatation och längdkontraktion.`,
        },
        {
            level: 1,
            question: `En rymdfarkost rör sig förbi jorden med farten $0{,}60c$. Ett förlopp ombord tar $t_0 = 10\\ \\mathrm{s}$ (egentid). Hur lång tid tar samma förlopp sett från jorden? ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 12.5, unit: 's' },
            solution: `Tiden sett utifrån fås ur tidsdilatationsformeln:

$$ t = \\frac{t_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}} $$

Här är $t_0$ egentiden (ombord) och $v = 0{,}60c$. Eftersom $v$ anges i andelar av $c$ förkortas $c$ bort:

$$
\\left[ \\begin{array}{l}
t_0 = 10\\ \\mathrm{s} \\\\
\\dfrac{v^2}{c^2} = (0{,}60)^2 = 0{,}36
\\end{array} \\right]
$$

$$ t = \\frac{10}{\\sqrt{1 - 0{,}36}} = \\frac{10}{\\sqrt{0{,}64}} = \\frac{10}{0{,}80} = 12{,}5\\ \\mathrm{s} $$

**Svar:** Förloppet tar $12{,}5\\ \\mathrm{s}$ sett från jorden.

**Generell slutsats:** Den utomstående mäter alltid en *längre* tid ($t > t_0$) — "rörliga klockor går långsammare". Egentiden $t_0$ är den kortaste möjliga och mäts av den som följer med förloppet.`,
        },
        {
            level: 1,
            question: `Hur mycket energi motsvarar massan $1{,}0\\ \\mathrm{g}$ enligt Einsteins samband $E = m \\cdot c^2$? ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 9.0e13, unit: 'J' },
            solution: `Vi sätter in i $E = m \\cdot c^2$:

$$
\\left[ \\begin{array}{l}
m = 1{,}0\\ \\mathrm{g} = 1{,}0 \\cdot 10^{-3}\\ \\mathrm{kg} \\\\
c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}
\\end{array} \\right]
$$

$$ E = 1{,}0 \\cdot 10^{-3} \\cdot (2{,}998 \\cdot 10^8)^2 = 9{,}0 \\cdot 10^{13}\\ \\mathrm{J} $$

**Svar:** Energin är ungefär $9{,}0 \\cdot 10^{13}\\ \\mathrm{J}$.

**Generell slutsats:** Eftersom $c^2$ är ett enormt tal motsvarar även en pytteliten massa en gigantisk energi — $9 \\cdot 10^{13}\\ \\mathrm{J}$ räcker för att försörja ett villahushåll med el i flera tusen år. Det är denna princip som ligger bakom kärnkraft och solens energiproduktion.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En rymdfarkost är $120\\ \\mathrm{m}$ lång när den mäts i vila. Hur lång är farkosten sett från jorden när den passerar med farten $0{,}80c$? ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 72, unit: 'm' },
            solution: `Längden i rörelsens riktning krymper enligt längdkontraktionsformeln:

$$ l = l_0 \\cdot \\sqrt{1 - \\frac{v^2}{c^2}} $$

där $l_0 = 120\\ \\mathrm{m}$ är vilolängden och $v = 0{,}80c$:

$$
\\left[ \\begin{array}{l}
l_0 = 120\\ \\mathrm{m} \\\\
\\dfrac{v^2}{c^2} = (0{,}80)^2 = 0{,}64
\\end{array} \\right]
$$

$$ l = 120 \\cdot \\sqrt{1 - 0{,}64} = 120 \\cdot \\sqrt{0{,}36} = 120 \\cdot 0{,}60 = 72\\ \\mathrm{m} $$

**Svar:** Farkosten är $72\\ \\mathrm{m}$ lång sett från jorden.

**Generell slutsats:** Kontraktionen sker **bara i rörelsens riktning** — farkostens bredd och höjd är oförändrade. Den som är *ombord* mäter däremot alltid vilolängden $120\\ \\mathrm{m}$; ingen ombord märker att något krympt.`,
        },
        {
            level: 2,
            question: `En proton har vilomassan $m_0 = 1{,}67 \\cdot 10^{-27}\\ \\mathrm{kg}$. Vad blir protonens (relativistiska) massa när den accelererats till farten $0{,}80c$? ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 2.8e-27, unit: 'kg' },
            solution: `Massan sett utifrån växer enligt

$$ m = \\frac{m_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}} $$

Med $v = 0{,}80c$:

$$
\\left[ \\begin{array}{l}
m_0 = 1{,}67 \\cdot 10^{-27}\\ \\mathrm{kg} \\\\
\\dfrac{v^2}{c^2} = (0{,}80)^2 = 0{,}64
\\end{array} \\right]
$$

$$ m = \\frac{1{,}67 \\cdot 10^{-27}}{\\sqrt{1 - 0{,}64}} = \\frac{1{,}67 \\cdot 10^{-27}}{0{,}60} = 2{,}8 \\cdot 10^{-27}\\ \\mathrm{kg} $$

**Svar:** Protonens massa blir ungefär $2{,}8 \\cdot 10^{-27}\\ \\mathrm{kg}$ — knappt dubbelt så stor som vilomassan.

**Generell slutsats:** Att massan ökar med farten är just därför inget föremål med vilomassa kan nå $c$: ju närmare $c$, desto större massa och desto mer kraft krävs för att accelerera vidare — vid $v = c$ skulle massan bli oändlig. Effekten är bekräftad i partikelacceleratorer.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En myon skapas högt uppe i atmosfären och rör sig rakt nedåt mot marken med farten $0{,}995c$. Myonens medellivslängd är $t_0 = 2{,}2\\ \\mathrm{\\mu s}$ (egentid, mätt i myonens eget system). Hur långt hinner myonen i **markens** referensram innan den i genomsnitt sönderfaller? ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 6.6, unit: 'km' },
            solution: `Det avgörande är att veta *vilken* tid som ska användas i vilken referensram — det är här de flesta går vilse.

**Den naiva (felaktiga) räkningen** behandlar $2{,}2\\ \\mathrm{\\mu s}$ som om den gällde i markens system:

$$ d_\\text{naiv} = v \\cdot t_0 = 0{,}995 \\cdot 2{,}998 \\cdot 10^8 \\cdot 2{,}2 \\cdot 10^{-6} \\approx 660\\ \\mathrm{m} $$

Då skulle myonen aldrig nå marken (den bildas på flera kilometers höjd). Men $2{,}2\\ \\mathrm{\\mu s}$ är **egentiden** — myonens *egen* klocka. I markens system går myonens klocka långsammare, så förloppet tar längre tid:

$$ t = \\frac{t_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}} = \\frac{2{,}2 \\cdot 10^{-6}}{\\sqrt{1 - 0{,}995^2}} = \\frac{2{,}2 \\cdot 10^{-6}}{\\sqrt{0{,}009975}} = \\frac{2{,}2 \\cdot 10^{-6}}{0{,}0999} = 2{,}2 \\cdot 10^{-5}\\ \\mathrm{s} $$

Sträckan i markens system blir då

$$ d = v \\cdot t = 0{,}995 \\cdot 2{,}998 \\cdot 10^8 \\cdot 2{,}2 \\cdot 10^{-5} \\approx 6\\,600\\ \\mathrm{m} = 6{,}6\\ \\mathrm{km} $$

**Svar:** Myonen hinner ungefär $6{,}6\\ \\mathrm{km}$ — tio gånger längre än den naiva räkningen, tillräckligt för att nå marken.

**Generell slutsats:** Samma resultat fås från myonens *eget* system via **längdkontraktion**: där lever myonen bara $2{,}2\\ \\mathrm{\\mu s}$, men avståndet ner till marken är kontraherat med samma faktor (cirka 10), så $6{,}6\\ \\mathrm{km}$ krymper till $\\approx 660\\ \\mathrm{m}$ som myonen hinner med. Båda referensramarna är överens om att myonen når marken — de är bara oeniga om *varför* (utdragen tid kontra hopkrympt avstånd). Att myoner från atmosfären verkligen detekteras vid marken är ett av de starkaste experimentella bevisen för relativitetsteorin.`,
        },
    ],

    'fy1-9.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Protonerna i en atomkärna är positivt laddade och borde repellera varandra. Vilken kraft håller ändå ihop kärnan?`,
            choices: [
                `Den starka kärnkraften.`,
                `Gravitationskraften mellan nukleonerna.`,
                `Den elektromagnetiska kraften.`,
                `Tröghetskraften från kärnans rotation.`,
            ],
            correct: 0,
            solution: `Den **starka kärnkraften** (stark växelverkan) håller ihop protoner och neutroner i kärnan. Den är mycket starkare än den elektriska frånstötningen, men verkar bara på extremt korta avstånd (ungefär $10^{-15}\\ \\mathrm{m}$).

**Svar:** Alternativ A — den starka kärnkraften.

**Generell slutsats:** Gravitationen mellan så små massor är försvinnande svag, och den elektromagnetiska kraften *stöter isär* protonerna. Att den starka kraften bara når så kort gör att riktigt stora kärnor blir instabila och sönderfaller — där "vinner" frånstötningen på avstånd.`,
        },
        {
            level: 1,
            question: `Uran-238 har atomnumret $Z = 92$. Hur många neutroner finns i kärnan?`,
            answer: { value: 146, unit: 'st' },
            solution: `Masstalet *A* är det totala antalet nukleoner (protoner + neutroner), och atomnumret *Z* är antalet protoner. Antalet neutroner är skillnaden:

$$ N = A - Z = 238 - 92 = 146 $$

**Svar:** Kärnan har $146$ neutroner.

**Generell slutsats:** I beteckningen $_{Z}^{A}\\mathrm{X}$ står masstalet uppe och atomnumret nere. Neutronantalet skrivs sällan ut — det räknas alltid som $A - Z$.`,
        },
        {
            level: 1,
            question: `Vad kännetecknar två **isotoper** av samma grundämne?`,
            choices: [
                `Samma antal protoner men olika antal neutroner.`,
                `Samma antal neutroner men olika antal protoner.`,
                `Olika antal protoner och olika antal elektroner.`,
                `Samma masstal men olika atomnummer.`,
            ],
            correct: 0,
            solution: `Isotoper av ett grundämne har **samma atomnummer** *Z* (samma antal protoner — annars vore det ett annat grundämne) men **olika masstal** *A*, eftersom de har olika antal neutroner.

**Svar:** Alternativ A.

**Generell slutsats:** Väte har t.ex. tre isotoper: protium ($^1\\mathrm{H}$, 0 neutroner), deuterium ($^2\\mathrm{H}$, 1 neutron) och tritium ($^3\\mathrm{H}$, 2 neutroner) — alla med $Z = 1$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En atomkärna innehåller 26 protoner och 30 neutroner. Vilket masstal har kärnan?`,
            answer: { value: 56, unit: '' },
            solution: `Masstalet är det totala antalet nukleoner:

$$ A = (\\text{antal protoner}) + (\\text{antal neutroner}) = 26 + 30 = 56 $$

**Svar:** Masstalet är $56$.

**Generell slutsats:** Atomnumret $Z = 26$ avslöjar dessutom grundämnet — det är **järn** (Fe). Kärnan skrivs $_{26}^{56}\\mathrm{Fe}$. Just denna kärna är bland de mest stabila som finns.`,
        },
        {
            level: 2,
            question: `Hur stor är den totala positiva elektriska laddningen i en järnkärna, som har 26 protoner? Elementarladdningen är $1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$.`,
            answer: { value: 4.2e-18, unit: 'C' },
            solution: `Varje proton bär en elementarladdning, så kärnans laddning är antalet protoner gånger elementarladdningen:

$$ Q = Z \\cdot q_e $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
Z = 26 \\\\
q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}
\\end{array} \\right]
$$

$$ Q = 26 \\cdot 1{,}602 \\cdot 10^{-19} = 4{,}2 \\cdot 10^{-18}\\ \\mathrm{C} $$

**Svar:** Kärnans laddning är ungefär $4{,}2 \\cdot 10^{-18}\\ \\mathrm{C}$.

**Generell slutsats:** Neutronerna bidrar inte — de är oladdade. Det är atomnumret *Z* (protonantalet) som ensamt bestämmer kärnans laddning.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Två protoner i en atomkärna befinner sig $2{,}0\\ \\mathrm{fm}$ ($2{,}0 \\cdot 10^{-15}\\ \\mathrm{m}$) från varandra. Hur stor är den elektriska frånstötningen mellan dem? ($k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$, $q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$)`,
            answer: { value: 58, unit: 'N' },
            solution: `Protonerna har båda laddningen $q_e$. Den elektriska kraften ges av Coulombs lag:

$$ F = k \\cdot \\frac{q_e^2}{r^2} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2} \\\\
q_e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C} \\\\
r = 2{,}0 \\cdot 10^{-15}\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ F = 8{,}99 \\cdot 10^9 \\cdot \\frac{(1{,}602 \\cdot 10^{-19})^2}{(2{,}0 \\cdot 10^{-15})^2} = 58\\ \\mathrm{N} $$

**Svar:** Frånstötningen är ungefär $58\\ \\mathrm{N}$.

**Generell slutsats:** Tänk på hur ofattbart stor den kraften är — $58\\ \\mathrm{N}$ (som att lyfta ett 6 kg paket) mellan **två enskilda protoner**! Just därför *måste* det finnas en ännu starkare kraft som håller ihop kärnan: den **starka kärnkraften**. Den här uppgiften visar kvantitativt varför den behövs — den elektriska frånstötningen på kärnavstånd är enorm.`,
        },
    ],

    'fy1-9.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Kärnan i Helium-3 har massdefekten $\\Delta m = 0{,}00829\\ \\mathrm{u}$. Beräkna kärnans bindningsenergi. Svara i MeV. ($1\\ \\mathrm{u} = 931{,}49\\ \\mathrm{MeV}$)`,
            answer: { value: 7.7, unit: 'MeV' },
            solution: `Massdefekten motsvarar bindningsenergin. Med omvandlingsfaktorn $1\\ \\mathrm{u} = 931{,}49\\ \\mathrm{MeV}$ kan vi gå direkt från massdefekt i u till energi i MeV:

$$ E = \\Delta m \\cdot 931{,}49 = 0{,}00829 \\cdot 931{,}49 = 7{,}72\\ \\mathrm{MeV} $$

**Svar:** Bindningsenergin är ungefär $7{,}7\\ \\mathrm{MeV}$.

**Generell slutsats:** Faktorn $931{,}49\\ \\mathrm{MeV/u}$ kommer från $E = mc^2$ tillämpat på $1\\ \\mathrm{u}$ — den sparar steget att omvandla till kg och joule när man räknar med kärnmassor.`,
        },
        {
            level: 1,
            question: `En kärnreaktion frigör energin $2{,}5\\ \\mathrm{MeV}$. Hur många joule är det? ($1\\ \\mathrm{eV} = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$)`,
            answer: { value: 4.0e-13, unit: 'J' },
            solution: `Vi omvandlar megaelektronvolt till joule. $1\\ \\mathrm{MeV} = 10^6\\ \\mathrm{eV}$, och varje eV är $1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$:

$$ E = 2{,}5 \\cdot 10^6 \\cdot 1{,}602 \\cdot 10^{-19} = 4{,}0 \\cdot 10^{-13}\\ \\mathrm{J} $$

**Svar:** Energin är ungefär $4{,}0 \\cdot 10^{-13}\\ \\mathrm{J}$.

**Generell slutsats:** Elektronvolt är en behändig enhet för de pyttesmå energierna hos enskilda partiklar och kärnor — joule-talet blir annars opraktiskt litet.`,
        },
        {
            level: 1,
            question: `En kärna har massdefekten $\\Delta m = 5{,}0 \\cdot 10^{-30}\\ \\mathrm{kg}$. Beräkna bindningsenergin i joule. ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 4.5e-13, unit: 'J' },
            solution: `Bindningsenergin fås ur Einsteins samband med massdefekten i kilogram:

$$ E = \\Delta m \\cdot c^2 = 5{,}0 \\cdot 10^{-30} \\cdot (2{,}998 \\cdot 10^8)^2 = 4{,}5 \\cdot 10^{-13}\\ \\mathrm{J} $$

**Svar:** Bindningsenergin är ungefär $4{,}5 \\cdot 10^{-13}\\ \\mathrm{J}$.

**Generell slutsats:** Detta är samma sak som föregående uppgift fast utan genvägen — när massdefekten redan står i kg använder man $E = \\Delta m c^2$ direkt. Omvandlar man svaret till MeV får man $\\approx 2{,}8\\ \\mathrm{MeV}$.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Kärnan i Helium-4 består av 2 protoner och 2 neutroner. Beräkna kärnans bindningsenergi i MeV.
$$
\\left[ \\begin{array}{l}
m_\\text{proton} = 1{,}00728\\ \\mathrm{u} \\\\
m_\\text{neutron} = 1{,}00866\\ \\mathrm{u} \\\\
m_\\text{kärna}(\\mathrm{He}\\text{-}4) = 4{,}00150\\ \\mathrm{u} \\\\
1\\ \\mathrm{u} = 931{,}49\\ \\mathrm{MeV}
\\end{array} \\right]
$$`,
            answer: { value: 28.3, unit: 'MeV' },
            solution: `Vi jämför massan hos de fria byggstenarna med massan hos den sammansatta kärnan.

**Byggstenarnas massa:**
$$ m_\\text{partiklar} = 2 \\cdot 1{,}00728 + 2 \\cdot 1{,}00866 = 4{,}03188\\ \\mathrm{u} $$

**Massdefekten** (byggstenarna minus kärnan):
$$ \\Delta m = m_\\text{partiklar} - m_\\text{kärna} = 4{,}03188 - 4{,}00150 = 0{,}03038\\ \\mathrm{u} $$

**Bindningsenergin:**
$$ E = \\Delta m \\cdot 931{,}49 = 0{,}03038 \\cdot 931{,}49 = 28{,}3\\ \\mathrm{MeV} $$

**Svar:** Bindningsenergin är ungefär $28{,}3\\ \\mathrm{MeV}$.

**Generell slutsats:** Den sammansatta kärnan väger *mindre* än sina lösa byggstenar — den "saknade" massan har blivit bindningsenergi. Det är denna energi som skulle krävas för att slita isär kärnan helt.`,
        },
        {
            level: 2,
            question: `En kärna med masstal $A = 56$ har den totala bindningsenergin $492\\ \\mathrm{MeV}$. Beräkna bindningsenergin **per nukleon**.`,
            answer: { value: 8.8, unit: 'MeV' },
            solution: `Bindningsenergin per nukleon är den totala bindningsenergin delad med antalet nukleoner (= masstalet):

$$ \\frac{E}{A} = \\frac{492}{56} = 8{,}79\\ \\mathrm{MeV/nukleon} $$

**Svar:** Bindningsenergin per nukleon är ungefär $8{,}8\\ \\mathrm{MeV/nukleon}$.

**Generell slutsats:** Bindningsenergi *per nukleon* är ett bättre mått på hur stabil en kärna är än den totala bindningsenergin. Den når sitt maximum (ca $8{,}8\\ \\mathrm{MeV}$) just kring järn ($A = 56$) — därför frigör både fusion av lätta kärnor och fission av tunga kärnor energi: båda rör sig "mot järn".`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Solen strålar ut energi med effekten $P = 3{,}8 \\cdot 10^{26}\\ \\mathrm{W}$. Hur stor massa omvandlas till energi i solen varje sekund? ($c \\approx 2{,}998 \\cdot 10^8\\ \\mathrm{m/s}$)`,
            answer: { value: 4.2e9, unit: 'kg/s' },
            solution: `Effekt är energi per tid, så energin som strålar ut under en sekund är

$$ E = P \\cdot t = 3{,}8 \\cdot 10^{26} \\cdot 1{,}0 = 3{,}8 \\cdot 10^{26}\\ \\mathrm{J} $$

Den energin kommer från massa som omvandlats enligt $E = m c^2$. Vi löser ut massan:

$$ m = \\frac{E}{c^2} = \\frac{3{,}8 \\cdot 10^{26}}{(2{,}998 \\cdot 10^8)^2} = 4{,}2 \\cdot 10^9\\ \\mathrm{kg} $$

**Svar:** Solen omvandlar ungefär $4{,}2 \\cdot 10^9\\ \\mathrm{kg}$ massa till energi varje sekund.

**Generell slutsats:** Det är drygt fyra miljoner ton i sekunden — men solen är så enormt massiv att den ändå räcker i miljarder år. Insikten är att kombinera effektdefinitionen ($P = E/t$) med massa–energi-sambandet ($E = mc^2$): massförlusten per tid blir $m/t = P/c^2$.`,
        },
    ],

    'fy1-9.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Vid vilket sönderfall sänder kärnan ut en heliumkärna ($_2^4\\mathrm{He}$)?`,
            choices: [
                `α-sönderfall.`,
                `β⁻-sönderfall.`,
                `β⁺-sönderfall.`,
                `γ-sönderfall.`,
            ],
            correct: 0,
            solution: `Vid **α-sönderfall** sänds en heliumkärna $_2^4\\mathrm{He}$ (två protoner och två neutroner) ut. Masstalet minskar då med 4 och atomnumret med 2.

**Svar:** Alternativ A — α-sönderfall.

**Generell slutsats:** Vid β-sönderfall sänds en elektron eller positron ut (masstalet oförändrat), och vid γ-sönderfall en foton (varken masstal eller atomnummer ändras).`,
        },
        {
            level: 1,
            question: `Polonium-210 har atomnumret $Z = 84$ och α-sönderfaller. Vilket **masstal** har dotterkärnan?`,
            answer: { value: 206, unit: '' },
            solution: `Vid α-sönderfall sänds $_2^4\\mathrm{He}$ ut, så masstalet minskar med 4:

$$ _{84}^{210}\\mathrm{Po} \\rightarrow {_{82}^{206}}\\mathrm{Pb} + {_2^4}\\mathrm{He} $$

$$ A_\\text{dotter} = 210 - 4 = 206 $$

**Svar:** Dotterkärnan har masstalet $206$.

**Generell slutsats:** Atomnumret minskar samtidigt med 2 ($84 \\to 82$), så dotterkärnan är bly-206. Kontrollera alltid att masstal *och* atomnummer balanserar på båda sidor om pilen.`,
        },
        {
            level: 1,
            question: `Vid ett β⁻-sönderfall omvandlas en neutron till en proton (plus en elektron och en neutrino). Hur ändras atomnumret *Z*?`,
            choices: [
                `Det ökar med 1.`,
                `Det minskar med 1.`,
                `Det minskar med 2.`,
                `Det är oförändrat.`,
            ],
            correct: 0,
            solution: `Vid β⁻-sönderfall blir en neutron en proton. Antalet protoner ökar då med 1, alltså **ökar atomnumret med 1**. Masstalet *A* är oförändrat (en nukleon byter bara typ).

$$ _Z^A\\mathrm{X} \\rightarrow {_{Z+1}^{A}}\\mathrm{Y} + {_{-1}^{0}}\\mathrm{e} + \\nu $$

**Svar:** Alternativ A — det ökar med 1.

**Generell slutsats:** Vid β⁺-sönderfall är det tvärtom: en proton blir en neutron, så atomnumret *minskar* med 1.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Natrium-22 har atomnumret $Z = 11$ och β⁺-sönderfaller. Vilket **atomnummer** har dotterkärnan?`,
            answer: { value: 10, unit: '' },
            solution: `Vid β⁺-sönderfall omvandlas en proton till en neutron, så atomnumret minskar med 1 (masstalet är oförändrat):

$$ _{11}^{22}\\mathrm{Na} \\rightarrow {_{10}^{22}}\\mathrm{Ne} + {_1^0}\\mathrm{e} + \\nu $$

$$ Z_\\text{dotter} = 11 - 1 = 10 $$

**Svar:** Dotterkärnan har atomnumret $10$ (neon).

**Generell slutsats:** Kontroll av balansen: masstal $22 = 22 + 0$ ✓, atomnummer $11 = 10 + 1 + 0$ ✓ (positronen räknas som laddning $+1$). Just balanseringen är hela poängen med sönderfallsformler.`,
        },
        {
            level: 2,
            question: `Radium-226 α-sönderfaller till radon-222. Beräkna energin som frigörs vid sönderfallet. Svara i MeV.
$$
\\left[ \\begin{array}{l}
m(\\mathrm{Ra}\\text{-}226) = 226{,}02541\\ \\mathrm{u} \\\\
m(\\mathrm{Rn}\\text{-}222) = 222{,}01758\\ \\mathrm{u} \\\\
m(\\mathrm{He}\\text{-}4) = 4{,}00260\\ \\mathrm{u} \\\\
1\\ \\mathrm{u} = 931{,}49\\ \\mathrm{MeV}
\\end{array} \\right]
$$`,
            answer: { value: 4.9, unit: 'MeV' },
            solution: `Den frigjorda energin kommer från massdefekten — skillnaden mellan moderkärnans massa och produkternas sammanlagda massa:

$$ \\Delta m = m(\\mathrm{Ra}) - \\big(m(\\mathrm{Rn}) + m(\\mathrm{He})\\big) $$

$$ \\Delta m = 226{,}02541 - (222{,}01758 + 4{,}00260) = 0{,}00523\\ \\mathrm{u} $$

Energin fås med omvandlingsfaktorn:

$$ E = 0{,}00523 \\cdot 931{,}49 = 4{,}87\\ \\mathrm{MeV} \\approx 4{,}9\\ \\mathrm{MeV} $$

**Svar:** Det frigörs ungefär $4{,}9\\ \\mathrm{MeV}$.

**Generell slutsats:** Vid α- och γ-sönderfall kan man räkna med atommassorna direkt eftersom antalet elektroner balanserar (här 88 på vänster sida = 86 + 2 på höger). Vid β-sönderfall ändras elektronantalet, och då måste man vara mer noggrann med elektronmassorna.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `Uran-238 ($Z = 92$) sönderfaller i en lång kedja av α- och β⁻-sönderfall och slutar till sist som den stabila kärnan bly-206 ($Z = 82$). Hur många α-sönderfall och hur många β⁻-sönderfall sker totalt i hela kedjan?`,
            solution: `Det här går inte att lösa stegvis utan att känna varje mellansteg — i stället ställer vi upp två ekvationer, en för masstalet och en för atomnumret, och utnyttjar att bara α-sönderfall ändrar masstalet.

**Masstalet** ändras bara av α-sönderfall (varje α minskar *A* med 4; β⁻ ändrar inte *A*). Total minskning:

$$ \\Delta A = 238 - 206 = 32 \\quad\\Rightarrow\\quad 4 \\cdot n_\\alpha = 32 \\quad\\Rightarrow\\quad n_\\alpha = 8 $$

**Atomnumret** ändras av båda: varje α minskar *Z* med 2, varje β⁻ ökar *Z* med 1. Total ändring:

$$ \\Delta Z = 82 - 92 = -10 $$
$$ -2 \\cdot n_\\alpha + 1 \\cdot n_\\beta = -10 $$

Sätt in $n_\\alpha = 8$:

$$ -16 + n_\\beta = -10 \\quad\\Rightarrow\\quad n_\\beta = 6 $$

**Svar:** Kedjan innehåller $8$ α-sönderfall och $6$ β⁻-sönderfall.

**Generell slutsats:** Nyckeln är att **frikoppla de två obekanta**: masstalet beror *bara* på antalet α, så $n_\\alpha$ kan lösas ensamt först. Därefter ger atomnumret $n_\\beta$. Detta är den verkliga sönderfallskedjan för uran-238, som via radium och radon slutar i bly.`,
        },
    ],

    'fy1-9.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Ett radioaktivt preparat har aktiviteten $800\\ \\mathrm{Bq}$ och halveringstiden $8{,}0$ dagar. Hur stor är aktiviteten efter $24$ dagar?`,
            answer: { value: 100, unit: 'Bq' },
            solution: `Tiden $24$ dagar motsvarar $24 / 8{,}0 = 3$ halveringstider. Aktivitetslagen ger

$$ A = A_0 \\cdot 0{,}5^{\\,t / T_{1/2}} = 800 \\cdot 0{,}5^{\\,24/8{,}0} = 800 \\cdot 0{,}5^{3} = 800 \\cdot 0{,}125 = 100\\ \\mathrm{Bq} $$

**Svar:** Aktiviteten är $100\\ \\mathrm{Bq}$.

**Generell slutsats:** Efter varje halveringstid halveras aktiviteten: $800 \\to 400 \\to 200 \\to 100$. När tiden är ett *helt* antal halveringstider kan man halvera sig fram i huvudet.`,
        },
        {
            level: 1,
            question: `En radioaktiv isotop har halveringstiden $T_{1/2} = 5{,}0\\ \\mathrm{s}$. Beräkna sönderfallskonstanten *λ*.`,
            answer: { value: 0.14, unit: '1/s' },
            solution: `Sönderfallskonstanten hänger ihop med halveringstiden enligt

$$ \\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0{,}693}{5{,}0} = 0{,}14\\ \\mathrm{s^{-1}} $$

**Svar:** Sönderfallskonstanten är ungefär $0{,}14\\ \\mathrm{s^{-1}}$.

**Generell slutsats:** Ju kortare halveringstid, desto större sönderfallskonstant — preparatet sönderfaller snabbare. $\\ln 2 \\approx 0{,}693$.`,
        },
        {
            level: 1,
            question: `Hur stor **andel** av ett radioaktivt preparat återstår efter $4$ halveringstider? Svara i procent.`,
            answer: { value: 6.25, unit: '%' },
            solution: `Efter varje halveringstid återstår hälften. Efter 4 halveringstider:

$$ \\frac{N}{N_0} = 0{,}5^{4} = 0{,}0625 = 6{,}25\\ \\% $$

**Svar:** Ungefär $6{,}25\\ \\%$ återstår.

**Generell slutsats:** Halveringarna ger $100 \\to 50 \\to 25 \\to 12{,}5 \\to 6{,}25\\ \\%$. Redan efter 10 halveringstider återstår bara en tusendel ($0{,}5^{10} \\approx 0{,}001$) — det är därför kol-14-metoden tar slut kring 50 000 år.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett preparat med Cesium-137 ($T_{1/2} = 30\\ \\mathrm{år}$) har i dag aktiviteten $2{,}0\\ \\mathrm{MBq}$. Hur stor är aktiviteten om $50$ år?`,
            answer: { value: 0.63, unit: 'MBq' },
            solution: `Här är tiden inte ett helt antal halveringstider, så vi använder aktivitetslagen direkt:

$$ A = A_0 \\cdot 0{,}5^{\\,t / T_{1/2}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
A_0 = 2{,}0\\ \\mathrm{MBq} \\\\
t = 50\\ \\mathrm{år} \\\\
T_{1/2} = 30\\ \\mathrm{år}
\\end{array} \\right]
$$

$$ A = 2{,}0 \\cdot 0{,}5^{\\,50/30} = 2{,}0 \\cdot 0{,}5^{1{,}667} = 2{,}0 \\cdot 0{,}315 = 0{,}63\\ \\mathrm{MBq} $$

**Svar:** Aktiviteten är ungefär $0{,}63\\ \\mathrm{MBq}$.

**Generell slutsats:** Exponenten $t/T_{1/2}$ behöver inte vara ett heltal — räknaren hanterar $0{,}5^{1{,}667}$. Tiden och halveringstiden måste dock anges i *samma* enhet (här år), annars blir exponenten fel.`,
        },
        {
            level: 2,
            question: `Ett radioaktivt preparat har aktiviteten $1{,}0 \\cdot 10^6\\ \\mathrm{Bq}$ och sönderfallskonstanten $\\lambda = 2{,}0 \\cdot 10^{-8}\\ \\mathrm{s^{-1}}$. Hur många radioaktiva kärnor innehåller preparatet?`,
            answer: { value: 5.0e13, unit: 'st' },
            solution: `Aktiviteten är proportionell mot antalet kärnor: $A = \\lambda \\cdot N$. Vi löser ut antalet kärnor *N*:

$$ N = \\frac{A}{\\lambda} = \\frac{1{,}0 \\cdot 10^6}{2{,}0 \\cdot 10^{-8}} = 5{,}0 \\cdot 10^{13}\\ \\text{st} $$

**Svar:** Preparatet innehåller ungefär $5{,}0 \\cdot 10^{13}$ radioaktiva kärnor.

**Generell slutsats:** Aktiviteten ($10^6$ sönderfall per sekund) känns hög, men eftersom varje enskild kärna sönderfaller så sällan ($\\lambda$ är pyttelitet) krävs det enormt många kärnor för att ge den aktiviteten.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett radioaktivt prov har aktiviteten $5\\,000\\ \\mathrm{Bq}$. Exakt $8{,}0$ timmar senare har aktiviteten sjunkit till $1\\,400\\ \\mathrm{Bq}$. Bestäm provets halveringstid.`,
            answer: { value: 4.4, unit: 'h' },
            solution: `Aktivitetslagen gäller, men nu är det halveringstiden $T_{1/2}$ som är obekant och sitter i exponenten — då måste vi logaritmera.

$$ A = A_0 \\cdot 0{,}5^{\\,t / T_{1/2}} \\quad\\Rightarrow\\quad \\frac{A}{A_0} = 0{,}5^{\\,t / T_{1/2}} $$

Sätt in mätvärdena:

$$ \\frac{1\\,400}{5\\,000} = 0{,}280 = 0{,}5^{\\,8{,}0 / T_{1/2}} $$

Logaritmera båda led och använd logaritmlagen $\\lg(a^x) = x \\lg a$:

$$ \\lg 0{,}280 = \\frac{8{,}0}{T_{1/2}} \\cdot \\lg 0{,}5 $$

Lös ut $T_{1/2}$:

$$ T_{1/2} = \\frac{8{,}0 \\cdot \\lg 0{,}5}{\\lg 0{,}280} = \\frac{8{,}0 \\cdot (-0{,}301)}{-0{,}553} = 4{,}4\\ \\mathrm{h} $$

**Svar:** Halveringstiden är ungefär $4{,}4$ timmar.

**Generell slutsats:** När den obekanta storheten sitter i exponenten räcker det inte med insättning — man måste logaritmera. Rimlighetskontroll: aktiviteten gick från 5000 till 1400 Bq (drygt en tredjedel kvar) på 8 timmar, vilket är knappt två halveringstider ($0{,}5^{1{,}8} \\approx 0{,}29$) — stämmer med $T_{1/2} \\approx 4{,}4\\ \\mathrm{h}$.`,
        },
        {
            level: 3,
            question: `En strålkälla av Kobolt-60 har aktiviteten $8{,}0 \\cdot 10^9\\ \\mathrm{Bq}$. Hur många **gram** Kobolt-60 innehåller källan? Kobolt-60 har halveringstiden $T_{1/2} = 5{,}27\\ \\mathrm{år}$ och molmassan $60\\ \\mathrm{g/mol}$. ($N_\\mathrm{A} = 6{,}022 \\cdot 10^{23}\\ \\mathrm{mol^{-1}}$, $1\\ \\mathrm{år} = 3{,}156 \\cdot 10^7\\ \\mathrm{s}$)`,
            answer: { value: 1.9e-4, unit: 'g' },
            solution: `Aktiviteten anger *sönderfall per sekund*, men frågan gäller en *massa*. Bryggan går via antalet atomkärnor: aktivitet → antal kärnor → substansmängd → massa. Det är inte ett räknesteg utan en kedja av tre samband.

**Steg 1 — sönderfallskonstanten** (halveringstiden måste vara i sekunder):
$$ T_{1/2} = 5{,}27 \\cdot 3{,}156 \\cdot 10^7 = 1{,}663 \\cdot 10^8\\ \\mathrm{s} $$
$$ \\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0{,}693}{1{,}663 \\cdot 10^8} = 4{,}17 \\cdot 10^{-9}\\ \\mathrm{s^{-1}} $$

**Steg 2 — antalet radioaktiva kärnor** ur $A = \\lambda N$:
$$ N = \\frac{A}{\\lambda} = \\frac{8{,}0 \\cdot 10^9}{4{,}17 \\cdot 10^{-9}} = 1{,}92 \\cdot 10^{18}\\ \\text{kärnor} $$

**Steg 3 — massan** via Avogadros tal och molmassan:
$$ m = \\frac{N}{N_\\mathrm{A}} \\cdot M = \\frac{1{,}92 \\cdot 10^{18}}{6{,}022 \\cdot 10^{23}} \\cdot 60 = 1{,}9 \\cdot 10^{-4}\\ \\mathrm{g} $$

**Svar:** Källan innehåller ungefär $1{,}9 \\cdot 10^{-4}\\ \\mathrm{g}$ (cirka $0{,}19\\ \\mathrm{mg}$) Kobolt-60.

**Generell slutsats:** Det slående resultatet är hur **liten** massa som ger en så hög aktivitet — knappt en femtedels milligram sönderfaller åtta miljarder gånger i sekunden. Det avancerade ligger inte i någon enskild formel utan i att *koppla ihop* kärnfysik (aktivitet, halveringstid) med kemins substansmängd (Avogadros tal). En vanlig fälla är att glömma omvandla halveringstiden till sekunder innan $\\lambda$ beräknas.`,
        },
    ],

    'fy1-9.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En kroppsvävnad med massan $2{,}0\\ \\mathrm{kg}$ absorberar strålningsenergin $0{,}80\\ \\mathrm{J}$. Beräkna den absorberade dosen.`,
            answer: { value: 0.40, unit: 'Gy' },
            solution: `Absorberad dos är absorberad energi per kilogram vävnad:

$$ D = \\frac{E}{m} = \\frac{0{,}80}{2{,}0} = 0{,}40\\ \\mathrm{Gy} $$

**Svar:** Den absorberade dosen är $0{,}40\\ \\mathrm{Gy}$.

**Generell slutsats:** $1\\ \\mathrm{Gy} = 1\\ \\mathrm{J/kg}$. Gränsen för akut strålsjuka går vid ungefär $1\\ \\mathrm{Gy}$.`,
        },
        {
            level: 1,
            question: `En person får den absorberade dosen $0{,}20\\ \\mathrm{Gy}$ från α-strålning, som har kvalitetsfaktorn $Q = 20$. Beräkna den ekvivalenta dosen.`,
            answer: { value: 4.0, unit: 'Sv' },
            solution: `Den ekvivalenta dosen tar hänsyn till hur skadligt strålslaget är via kvalitetsfaktorn *Q*:

$$ H = D \\cdot Q = 0{,}20 \\cdot 20 = 4{,}0\\ \\mathrm{Sv} $$

**Svar:** Den ekvivalenta dosen är $4{,}0\\ \\mathrm{Sv}$.

**Generell slutsats:** α-strålning är mycket skadlig *inuti* kroppen ($Q = 20$), medan β- och γ-strålning har $Q = 1$. Samma absorberade dos (Gy) ger alltså 20 gånger så stor ekvivalent dos (Sv) för α som för γ.`,
        },
        {
            level: 1,
            question: `Vilken typ av joniserande strålning har **lägst genomtränglighet** och stoppas redan av ett pappersark eller av kläder?`,
            choices: [
                `α-strålning.`,
                `β-strålning.`,
                `γ-strålning.`,
                `Alla tre stoppas lika lätt.`,
            ],
            correct: 0,
            solution: `**α-strålning** (heliumkärnor) har lägst genomtränglighet och stoppas av ett pappersark eller kläder. Den är därför relativt ofarlig *utanför* kroppen — men farlig om man andas in eller får i sig ett α-preparat, eftersom den då avger all sin energi på ett litet område.

**Svar:** Alternativ A — α-strålning.

**Generell slutsats:** Genomträngligheten ökar i ordningen α < β < γ. β stoppas av tunn metall, medan γ kräver tjockt bly.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En person med massan $70\\ \\mathrm{kg}$ får den absorberade dosen $2{,}0\\ \\mathrm{mGy}$. Hur mycket strålningsenergi har personen absorberat totalt?`,
            answer: { value: 0.14, unit: 'J' },
            solution: `Vi löser ut energin *E* ur formeln för absorberad dos:

$$ D = \\frac{E}{m} \\quad\\Leftrightarrow\\quad E = D \\cdot m $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
D = 2{,}0\\ \\mathrm{mGy} = 2{,}0 \\cdot 10^{-3}\\ \\mathrm{Gy} \\\\
m = 70\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$ E = 2{,}0 \\cdot 10^{-3} \\cdot 70 = 0{,}14\\ \\mathrm{J} $$

**Svar:** Personen har absorberat ungefär $0{,}14\\ \\mathrm{J}$.

**Generell slutsats:** Energimängden är förvånansvärt liten i joule — strålningens fara ligger inte i värmemängden utan i att den *joniserar* och skadar DNA på molekylär nivå.`,
        },
        {
            level: 2,
            question: `En person får den ekvivalenta dosen $8{,}0\\ \\mathrm{mSv}$ från α-strålning, som har kvalitetsfaktorn $Q = 20$. Hur stor var den absorberade dosen?`,
            answer: { value: 0.40, unit: 'mGy' },
            solution: `Vi löser ut den absorberade dosen *D* ur formeln för ekvivalent dos:

$$ H = D \\cdot Q \\quad\\Leftrightarrow\\quad D = \\frac{H}{Q} = \\frac{8{,}0\\ \\mathrm{mSv}}{20} = 0{,}40\\ \\mathrm{mGy} $$

**Svar:** Den absorberade dosen var $0{,}40\\ \\mathrm{mGy}$.

**Generell slutsats:** Eftersom $Q = 20$ för α räcker en liten absorberad dos (Gy) för att ge en relativt stor ekvivalent dos (Sv). Hade det varit γ-strålning ($Q = 1$) hade absorberad och ekvivalent dos haft samma mätetal.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En person (massa $60\\ \\mathrm{kg}$) får i sig ett α-preparat med aktiviteten $5\\,000\\ \\mathrm{Bq}$. Varje α-partikel har energin $5{,}0\\ \\mathrm{MeV}$, och all energi absorberas i kroppen. Hur stor **ekvivalent dos** får personen under en timme? ($Q = 20$ för α, $1\\ \\mathrm{eV} = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$)`,
            answer: { value: 4.8, unit: 'μSv' },
            solution: `Vi måste bygga oss fram från aktiviteten till en absorberad energi, sedan till dos och slutligen ekvivalent dos.

**Steg 1 — antal sönderfall på en timme.** Aktiviteten är $5\\,000$ sönderfall per sekund:

$$ n = A \\cdot t = 5\\,000 \\cdot 3\\,600 = 1{,}8 \\cdot 10^7\\ \\text{sönderfall} $$

**Steg 2 — total absorberad energi.** Varje α-partikel bär $5{,}0\\ \\mathrm{MeV} = 5{,}0 \\cdot 10^6 \\cdot 1{,}602 \\cdot 10^{-19} = 8{,}01 \\cdot 10^{-13}\\ \\mathrm{J}$:

$$ E = n \\cdot E_\\alpha = 1{,}8 \\cdot 10^7 \\cdot 8{,}01 \\cdot 10^{-13} = 1{,}44 \\cdot 10^{-5}\\ \\mathrm{J} $$

**Steg 3 — absorberad dos:**

$$ D = \\frac{E}{m} = \\frac{1{,}44 \\cdot 10^{-5}}{60} = 2{,}4 \\cdot 10^{-7}\\ \\mathrm{Gy} $$

**Steg 4 — ekvivalent dos:**

$$ H = D \\cdot Q = 2{,}4 \\cdot 10^{-7} \\cdot 20 = 4{,}8 \\cdot 10^{-6}\\ \\mathrm{Sv} = 4{,}8\\ \\mathrm{\\mu Sv} $$

**Svar:** Personen får den ekvivalenta dosen ungefär $4{,}8\\ \\mathrm{\\mu Sv}$.

**Generell slutsats:** Uppgiften binder ihop tre områden — aktivitet (sönderfall per sekund), energiomvandling (MeV → J) och stråldos ($D = E/m$, $H = DQ$). Det som gör α-strålning så lömsk *inuti* kroppen är just att varje partikel lämnar all sin energi i vävnaden och att $Q = 20$.`,
        },
    ],

    'fy2-1.1': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En kraft på $25\\ \\mathrm{N}$ verkar vinkelrätt mot en skiftnyckel $0{,}18\\ \\mathrm{m}$ från muttern. Beräkna kraftmomentet kring muttern.

${makeTorqueArm({ armAngle: 0, armLabel: 'l = 0,18 m', force: { angle: -90, label: 'F = 25 N', len: 72 }, pivotLabel: 'mutter' })}`,
            answer: { value: 4.5, unit: 'Nm' },
            solution: `Kraftmomentet är kraft gånger hävarm:

$$ M = F \\cdot l $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
F = 25\\ \\mathrm{N} \\\\
l = 0{,}18\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ M = 25 \\cdot 0{,}18 = 4{,}5\\ \\mathrm{Nm} $$

**Svar:** Kraftmomentet är $4{,}5\\ \\mathrm{Nm}$.

**Generell slutsats:** Hävarmen är det *vinkelräta* avståndet mellan kraftens riktningslinje och vridpunkten. Här verkar kraften vinkelrätt mot skaftet, så hela längden $0{,}18\\ \\mathrm{m}$ är hävarm.`,
        },
        {
            level: 1,
            question: `Hur stor kraft måste verka vinkelrätt $0{,}30\\ \\mathrm{m}$ från ett gångjärn för att ge kraftmomentet $18\\ \\mathrm{Nm}$?`,
            answer: { value: 60, unit: 'N' },
            solution: `Vi löser ut kraften *F* ur formeln för kraftmoment:

$$ M = F \\cdot l \\quad\\Leftrightarrow\\quad F = \\frac{M}{l} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
M = 18\\ \\mathrm{Nm} \\\\
l = 0{,}30\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ F = \\frac{18}{0{,}30} = 60\\ \\mathrm{N} $$

**Svar:** Kraften måste vara $60\\ \\mathrm{N}$.

**Generell slutsats:** Ju längre hävarm, desto mindre kraft krävs för samma moment — därför är det lättare att öppna en dörr långt ut från gångjärnet än nära det.`,
        },
        {
            level: 1,
            question: `Ett barn som väger $25\\ \\mathrm{kg}$ sitter $2{,}4\\ \\mathrm{m}$ från vridpunkten på en gungbräda. Hur långt från vridpunkten ska en vuxen på $75\\ \\mathrm{kg}$ sitta för att brädan ska vara i momentjämvikt?

${makeLever({ pivot: { posFrac: 0.5, type: 'wedge' }, loads: [{ posFrac: 0.12, kind: 'weight', label: '25 kg' }, { posFrac: 0.64, kind: 'weight', label: '75 kg' }], dims: [{ fromFrac: 0.12, toFrac: 0.5, label: '2,4 m' }, { fromFrac: 0.5, toFrac: 0.64, label: '?', row: 1 }] })}`,
            answer: { value: 0.80, unit: 'm' },
            solution: `Vid momentjämvikt är momentet medurs lika med momentet moturs. Med tyngdkraften $F = m \\cdot g$ blir villkoret (tyngdfaktorn *g* finns i båda led och stryks):

$$ m_\\text{barn} \\cdot l_\\text{barn} = m_\\text{vuxen} \\cdot l_\\text{vuxen} \\quad\\Leftrightarrow\\quad l_\\text{vuxen} = \\frac{m_\\text{barn} \\cdot l_\\text{barn}}{m_\\text{vuxen}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m_\\text{barn} = 25\\ \\mathrm{kg} \\\\
l_\\text{barn} = 2{,}4\\ \\mathrm{m} \\\\
m_\\text{vuxen} = 75\\ \\mathrm{kg}
\\end{array} \\right]
$$

$$ l_\\text{vuxen} = \\frac{25 \\cdot 2{,}4}{75} = 0{,}80\\ \\mathrm{m} $$

**Svar:** Den vuxne ska sitta $0{,}80\\ \\mathrm{m}$ från vridpunkten.

**Generell slutsats:** Den tyngre måste sitta närmare vridpunkten — kortare hävarm kompenserar för större tyngd så att momenten balanserar.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En $0{,}80\\ \\mathrm{m}$ lång arm lutar $35^\\circ$ över horisontalplanet och är fäst i sin nedre ände. Vid den övre änden verkar en kraft på $120\\ \\mathrm{N}$ rakt nedåt. Beräkna kraftmomentet kring den nedre änden.

${makeTorqueArm({ armAngle: 35, armLabel: 'L = 0,80 m', force: { angle: -90, label: 'F = 120 N', len: 66 }, leverHint: true })}`,
            answer: { value: 79, unit: 'Nm' },
            solution: `Hävarmen är **inte** armens längd, utan det vinkelräta avståndet från vridpunkten till kraftens (lodräta) riktningslinje. Det är den vågräta sträckan ut till övre änden:

$$ l = L \\cdot \\cos 35^\\circ $$

Kraftmomentet blir då

$$ M = F \\cdot l = F \\cdot L \\cdot \\cos 35^\\circ $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
F = 120\\ \\mathrm{N} \\\\
L = 0{,}80\\ \\mathrm{m} \\\\
\\alpha = 35^\\circ
\\end{array} \\right]
$$

$$ M = 120 \\cdot 0{,}80 \\cdot \\cos 35^\\circ = 79\\ \\mathrm{Nm} $$

**Generell slutsats:** När kraften inte är vinkelrät mot armen måste man projicera fram den vinkelräta hävarmen med trigonometri. En lodrät kraft "ser" bara det vågräta avståndet till vridpunkten.

**Svar:** Kraftmomentet är ungefär $79\\ \\mathrm{Nm}$.`,
        },
        {
            level: 2,
            question: `En $4{,}0\\ \\mathrm{m}$ lång jämntjock planka väger $12\\ \\mathrm{kg}$ och vilar på en stödpunkt $1{,}5\\ \\mathrm{m}$ från vänster ände. Var (avstånd från stödpunkten) ska en vikt på $8{,}0\\ \\mathrm{kg}$ placeras för att plankan ska vara i jämvikt?

${makeLever({ pivot: { posFrac: 0.375, type: 'wedge' }, cog: { posFrac: 0.5, label: 'F_G' }, loads: [{ posFrac: 0.16, kind: 'weight', label: '8,0 kg' }], dims: [{ fromFrac: 0, toFrac: 0.375, label: '1,5 m' }, { fromFrac: 0.375, toFrac: 1, label: '2,5 m' }, { fromFrac: 0.16, toFrac: 0.375, label: 'd = ?', row: 1 }] })}`,
            answer: { value: 0.75, unit: 'm' },
            solution: `Plankans egen tyngd verkar i dess **tyngdpunkt**, mitt på plankan — alltså $2{,}0\\ \\mathrm{m}$ från vänster ände, vilket är $2{,}0 - 1{,}5 = 0{,}5\\ \\mathrm{m}$ till höger om stödpunkten. Det ger ett moment som vill tippa plankan åt höger.

För jämvikt måste vikten placeras till **vänster** om stödpunkten och ge ett lika stort motverkande moment. Momentbalans (tyngdfaktorn *g* stryks):

$$ m_\\text{vikt} \\cdot d = m_\\text{planka} \\cdot 0{,}5 $$

$$ d = \\frac{m_\\text{planka} \\cdot 0{,}5}{m_\\text{vikt}} = \\frac{12 \\cdot 0{,}5}{8{,}0} = 0{,}75\\ \\mathrm{m} $$

**Svar:** Vikten ska placeras $0{,}75\\ \\mathrm{m}$ från stödpunkten (på motsatt sida mot plankans tyngdpunkt).

**Generell slutsats:** En jämntjock plankas hela tyngd kan tänkas verka i tyngdpunkten (mitten). Att hitta tyngdpunktens läge relativt vridpunkten är ofta första steget i momentuppgifter med utbredda kroppar.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En $5{,}0\\ \\mathrm{m}$ lång stege som väger $15\\ \\mathrm{kg}$ lutar mot en vägg med vinkeln $65^\\circ$ mot marken. Friktionen mellan stege och vägg är försumbar, men friktionen mot marken är tillräcklig för att stegen ska stå still. Hur stor är friktionskraften från marken? ($g = 9{,}82\\ \\mathrm{N/kg}$)

${makeLadder({ angle: 65, lenLabel: 'L = 5,0 m' })}`,
            answer: { value: 34, unit: 'N' },
            solution: `Det räcker inte med en formel — vi måste kombinera **momentjämvikt** och **kraftjämvikt** och se vilka krafter som verkar.

Fyra krafter verkar på stegen: tyngdkraften $F_G = mg$ nedåt i mitten, markens normalkraft $N_\\text{mark}$ uppåt vid foten, markens friktion $F_f$ vågrätt vid foten, och väggens normalkraft $N_\\text{vägg}$ vågrätt vid toppen (väggen är friktionsfri, så den kan bara trycka vinkelrätt utåt).

${makeLadder({ angle: 65, lenLabel: 'L = 5,0 m', forces: true })}

**Momentjämvikt kring stegens fot** (då försvinner $N_\\text{mark}$ och *f*, som verkar i vridpunkten). Väggkraften har hävarmen $L\\sin 65^\\circ$ (höjden till toppen); tyngdkraften har hävarmen $\\tfrac{L}{2}\\cos 65^\\circ$ (vågrätt avstånd till mitten):

$$ N_\\text{vägg} \\cdot L\\sin 65^\\circ = mg \\cdot \\tfrac{L}{2}\\cos 65^\\circ \\quad\\Rightarrow\\quad N_\\text{vägg} = \\frac{mg}{2\\tan 65^\\circ} $$

**Kraftjämvikt i vågrätt led:** friktionen balanserar väggkraften, $F_f = N_\\text{vägg}$. Alltså

$$ F_f = \\frac{mg}{2\\tan 65^\\circ} = \\frac{15 \\cdot 9{,}82}{2 \\cdot \\tan 65^\\circ} = 34\\ \\mathrm{N} $$

**Svar:** Friktionskraften från marken är ungefär $34\\ \\mathrm{N}$.

**Generell slutsats:** Den avgörande insikten är att *två* jämviktsvillkor måste gälla samtidigt: summan av momenten = 0 *och* summan av krafterna = 0. Genom att lägga vridpunkten vid foten försvinner två okända krafter, och momentekvationen ger väggkraften direkt — som i sin tur måste balanseras av friktionen. Stegens längd *L* stryks ur ekvationen.`,
        },
    ],

    'fy2-1.2': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Var ligger tyngdpunkten hos ett homogent, symmetriskt föremål — till exempel en kub eller en jämntjock linjal?`,
            choices: [
                `I den geometriska mittpunkten.`,
                `I ett av hörnen.`,
                `Vid föremålets tyngsta yta.`,
                `Alltid utanför själva föremålet.`,
            ],
            correct: 0,
            solution: `För ett **homogent och symmetriskt** föremål ligger tyngdpunkten i den geometriska mittpunkten — det är där föremålets sammanlagda tyngd kan tänkas verka.

**Svar:** Alternativ A — i den geometriska mittpunkten.

**Generell slutsats:** För *ojämnt* formade föremål kan tyngdpunkten ligga utanför materialet — t.ex. mitt i hålet på en ring eller en bumerang.`,
        },
        {
            level: 1,
            question: `Ett föremål hänger upp i en punkt som ligger **ovanför** dess tyngdpunkt. Vilken typ av jämvikt råder?`,
            choices: [
                `Stabil jämvikt.`,
                `Labil jämvikt.`,
                `Indifferent jämvikt.`,
                `Ingen jämvikt — föremålet faller.`,
            ],
            correct: 0,
            solution: `När upphängningspunkten ligger **ovanför** tyngdpunkten råder **stabil jämvikt**: vid en liten störning lyfts tyngdpunkten, och föremålet pendlar tillbaka till sitt ursprungsläge.

**Svar:** Alternativ A — stabil jämvikt.

**Generell slutsats:** Labil jämvikt = upphängd *under* tyngdpunkten (välter vid minsta störning, t.ex. en linjal balanserad på fingret). Indifferent = upphängd *i* tyngdpunkten (stannar i vilket läge som helst, t.ex. ett hjul på sin axel).`,
        },
        {
            level: 1,
            question: `En låda är $0{,}60\\ \\mathrm{m}$ bred och $0{,}80\\ \\mathrm{m}$ hög med tyngdpunkten i mitten. Den börjar tippas åt sidan kring sin nedre kant. Vid vilken lutningsvinkel välter lådan?

${makeTippingBox({ boxW: 84, boxH: 112, tipArrow: true, gravityLine: true, wLabel: '0,60 m', hLabel: '0,80 m' })}`,
            answer: { value: 37, unit: '°' },
            solution: `Lådan välter när tyngdkraftens lodräta riktningslinje genom tyngdpunkten passerar tippkanten. Tyngdpunkten ligger $\\tfrac{0{,}60}{2} = 0{,}30\\ \\mathrm{m}$ in från kanten (i sidled) och $\\tfrac{0{,}80}{2} = 0{,}40\\ \\mathrm{m}$ upp. Den kritiska vinkeln *v* uppfyller

$$ \\tan v = \\frac{0{,}30}{0{,}40} = 0{,}75 $$

$$ v = \\arctan(0{,}75) = 37^\\circ $$

**Svar:** Lådan välter om den lutas mer än cirka $37^\\circ$.

**Generell slutsats:** En bred och låg låda (stor bredd, liten höjd) tål större lutning innan den välter. Det är därför en racerbil byggs bred och låg medan en hög, smal bokhylla välter lätt.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `Ett skåp väger $25\\ \\mathrm{kg}$, är $1{,}8\\ \\mathrm{m}$ högt och $0{,}50\\ \\mathrm{m}$ brett, med tyngdpunkten i mitten. Hur stor vågrät kraft måste man trycka med högst upp på skåpet för att precis börja välta det kring den främre nederkanten? ($g = 9{,}82\\ \\mathrm{N/kg}$)

${makeTippingBox({ boxW: 44, boxH: 150, push: { label: 'F' }, wLabel: '0,50 m', hLabel: '1,8 m' })}`,
            answer: { value: 34, unit: 'N' },
            solution: `Vid vältgränsen råder momentjämvikt kring den främre nederkanten. Tryckkraften *F* verkar högst upp (hävarm = höjden $h$) och tyngdkraften $mg$ verkar i tyngdpunkten (hävarm = halva bredden $w/2$):

$$ F \\cdot h = mg \\cdot \\frac{w}{2} \\quad\\Leftrightarrow\\quad F = \\frac{mg \\cdot w/2}{h} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 25\\ \\mathrm{kg},\\quad g = 9{,}82\\ \\mathrm{N/kg} \\\\
w = 0{,}50\\ \\mathrm{m} \\;\\Rightarrow\\; w/2 = 0{,}25\\ \\mathrm{m} \\\\
h = 1{,}8\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ F = \\frac{25 \\cdot 9{,}82 \\cdot 0{,}25}{1{,}8} = 34\\ \\mathrm{N} $$

**Svar:** Det krävs en kraft på ungefär $34\\ \\mathrm{N}$.

**Generell slutsats:** Ju högre upp man trycker (större hävarm) desto mindre kraft krävs. Tyngdkraftens vältmotstånd ges av halva bredden — bredare bas → svårare att välta.`,
        },
        {
            level: 2,
            question: `En $6{,}0\\ \\mathrm{m}$ lång jämntjock bräda väger $20\\ \\mathrm{kg}$ och sticker ut $2{,}0\\ \\mathrm{m}$ över en bryggkant. Hur långt ut på den utstickande delen kan en vikt på $15\\ \\mathrm{kg}$ placeras innan brädan tippar?

${makeLever({ pivot: { posFrac: 0.667, type: 'edge' }, cog: { posFrac: 0.5, label: 'F_G' }, loads: [{ posFrac: 0.88, kind: 'weight', label: '15 kg' }], dims: [{ fromFrac: 0.667, toFrac: 1, label: '2,0 m' }, { fromFrac: 0.667, toFrac: 0.88, label: 'd = ?', row: 1 }] })}`,
            answer: { value: 1.3, unit: 'm', tol: 0.03 },
            solution: `Brädan tippar kring bryggkanten. Brädans tyngdpunkt sitter i mitten, $3{,}0\\ \\mathrm{m}$ från varje ände. Eftersom $4{,}0\\ \\mathrm{m}$ av brädan ligger på bryggan ligger tyngdpunkten $4{,}0 - 3{,}0 = 1{,}0\\ \\mathrm{m}$ **innanför** kanten. Brädans tyngd ger därför ett *kvarhållande* moment kring kanten.

Vikten på den utstickande delen (avstånd *d* från kanten) ger ett *tippande* moment. Brädan tippar när momenten är lika (tyngdfaktorn *g* stryks):

$$ m_\\text{vikt} \\cdot d = m_\\text{bräda} \\cdot 1{,}0 \\quad\\Leftrightarrow\\quad d = \\frac{m_\\text{bräda} \\cdot 1{,}0}{m_\\text{vikt}} = \\frac{20 \\cdot 1{,}0}{15} = 1{,}3\\ \\mathrm{m} $$

**Svar:** Vikten kan placeras högst ungefär $1{,}3\\ \\mathrm{m}$ ut innan brädan tippar.

**Generell slutsats:** Eftersom $1{,}3\\ \\mathrm{m} < 2{,}0\\ \\mathrm{m}$ (överhängets längd) tippar brädan innan vikten når änden. Nyckeln är att brädans egen tyngd, samlad i tyngdpunkten innanför kanten, motverkar tippningen.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En låda är ett rätblock som väger $60\\ \\mathrm{kg}$, är $0{,}80\\ \\mathrm{m}$ bred och $1{,}5\\ \\mathrm{m}$ hög, med tyngdpunkten i mitten. Friktionstalet mot golvet är $0{,}50$. Man trycker med en växande vågrät kraft högst upp på lådan. **Kommer lådan att glida eller tippa först — och vid vilken kraft sker det?** ($g = 9{,}82\\ \\mathrm{N/kg}$)

${makeTippingBox({ boxW: 80, boxH: 150, push: { label: 'F' }, friction: true, wLabel: '0,80 m', hLabel: '1,5 m' })}`,
            answer: { value: 157, unit: 'N' },
            solution: `Insikten är att det finns **två** möjliga sätt för lådan att börja röra sig — den gör det som kräver *minst* kraft. Vi beräknar gränskraften för vardera och jämför.

**Glidning** sker när tryckkraften överstiger den maximala friktionskraften:

$$ F_\\text{glid} = \\mu \\cdot mg = 0{,}50 \\cdot 60 \\cdot 9{,}82 = 295\\ \\mathrm{N} $$

**Tippning** kring främre nederkanten sker när tryckkraftens moment (hävarm = höjden) övervinner tyngdkraftens (hävarm = halva bredden):

$$ F_\\text{tipp} \\cdot h = mg \\cdot \\frac{w}{2} \\quad\\Leftrightarrow\\quad F_\\text{tipp} = \\frac{mg \\cdot w/2}{h} = \\frac{60 \\cdot 9{,}82 \\cdot 0{,}40}{1{,}5} = 157\\ \\mathrm{N} $$

Eftersom $F_\\text{tipp} = 157\\ \\mathrm{N} < F_\\text{glid} = 295\\ \\mathrm{N}$ nås tippgränsen först.

**Svar:** Lådan **tippar** först, vid en kraft på ungefär $157\\ \\mathrm{N}$.

**Generell slutsats:** En hög och smal låda tippar lättare än den glider; en låg och bred (eller ett högt friktionstal) glider lättare än den tippar. Man måste räkna ut *båda* gränskrafterna och jämföra — det går inte att gissa vilken som inträffar först.`,
        },
    ],

    'fy2-1.3': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Ett hjul snurrar med frekvensen $5{,}0\\ \\mathrm{Hz}$. Beräkna periodtiden (tiden för ett varv).`,
            answer: { value: 0.20, unit: 's' },
            solution: `Period och frekvens är varandras invers:

$$ T = \\frac{1}{f} = \\frac{1}{5{,}0} = 0{,}20\\ \\mathrm{s} $$

**Svar:** Periodtiden är $0{,}20\\ \\mathrm{s}$.

**Generell slutsats:** Frekvensen $5{,}0\\ \\mathrm{Hz}$ betyder 5 varv per sekund, så ett varv tar $\\tfrac{1}{5}$ sekund.`,
        },
        {
            level: 1,
            question: `En motor går med $1\\,500$ varv per minut. Beräkna vinkelhastigheten ω i rad/s.`,
            answer: { value: 157, unit: 'rad/s' },
            solution: `Vi omvandlar först varv per minut till frekvens (varv per sekund):

$$ f = \\frac{1\\,500}{60} = 25\\ \\mathrm{Hz} $$

Vinkelhastigheten är sedan

$$ \\omega = 2\\pi \\cdot f = 2\\pi \\cdot 25 = 157\\ \\mathrm{rad/s} $$

**Svar:** Vinkelhastigheten är ungefär $157\\ \\mathrm{rad/s}$.

**Generell slutsats:** Ett varv motsvarar $2\\pi$ radianer, så vinkelhastigheten är $2\\pi$ gånger frekvensen. Glöm inte omvandlingen varv/min → Hz (dela med 60).`,
        },
        {
            level: 1,
            question: `En punkt sitter $0{,}25\\ \\mathrm{m}$ från centrum på ett hjul som roterar med vinkelhastigheten $\\omega = 12\\ \\mathrm{rad/s}$. Vilken fart har punkten?

${makeCircularPath({ width: 260, height: 240, r: 92, angleDeg: 52, radiusLabel: 'r = 0,25 m', vLabel: 'v = ?', point: true, dashTrack: true })}`,
            answer: { value: 3.0, unit: 'm/s' },
            solution: `Farten i cirkelbanan är vinkelhastigheten gånger banradien:

$$ v = \\omega \\cdot r = 12 \\cdot 0{,}25 = 3{,}0\\ \\mathrm{m/s} $$

**Svar:** Farten är $3{,}0\\ \\mathrm{m/s}$.

**Generell slutsats:** Alla punkter på hjulet har samma *vinkelhastighet* ω, men *farten* växer med avståndet till centrum — ytterkanten rör sig snabbast.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En LP-skiva snurrar med $45$ varv per minut. Vilken fart har en punkt $12\\ \\mathrm{cm}$ från skivans centrum?`,
            answer: { value: 0.57, unit: 'm/s' },
            solution: `Vi behöver vinkelhastigheten, som kräver frekvensen i Hz:

$$ f = \\frac{45}{60} = 0{,}75\\ \\mathrm{Hz} \\quad\\Rightarrow\\quad \\omega = 2\\pi f = 2\\pi \\cdot 0{,}75 = 4{,}71\\ \\mathrm{rad/s} $$

Farten blir sedan

$$ v = \\omega \\cdot r = 4{,}71 \\cdot 0{,}12 = 0{,}57\\ \\mathrm{m/s} $$

**Svar:** Farten är ungefär $0{,}57\\ \\mathrm{m/s}$.

**Generell slutsats:** Kedjan är varv/min → Hz → ω → v. Alternativt kan man gå direkt via $v = \\dfrac{2\\pi r}{T}$ med $T = 1/f$.`,
        },
        {
            level: 2,
            question: `En satellit rör sig i en cirkulär bana runt jorden med farten $7{,}8\\ \\mathrm{km/s}$ och har omloppstiden $90$ minuter. Hur stor är banans radie? Svara i meter.`,
            answer: { value: 6.7e6, unit: 'm' },
            solution: `Farten i en cirkelbana är omkretsen delad med omloppstiden:

$$ v = \\frac{2\\pi r}{T} \\quad\\Leftrightarrow\\quad r = \\frac{v \\cdot T}{2\\pi} $$

Mätvärden (i SI-enheter):
$$
\\left[ \\begin{array}{l}
v = 7{,}8\\ \\mathrm{km/s} = 7\\,800\\ \\mathrm{m/s} \\\\
T = 90\\ \\mathrm{min} = 90 \\cdot 60 = 5\\,400\\ \\mathrm{s}
\\end{array} \\right]
$$

$$ r = \\frac{7\\,800 \\cdot 5\\,400}{2\\pi} = 6{,}7 \\cdot 10^6\\ \\mathrm{m} $$

**Svar:** Banradien är ungefär $6{,}7 \\cdot 10^6\\ \\mathrm{m}$ (drygt $6\\,700\\ \\mathrm{km}$).

**Generell slutsats:** Det avgörande är att omvandla alla storheter till SI-enheter (km/s → m/s, min → s) innan insättning. Svaret stämmer med en låg satellitbana — jordens radie är ca $6{,}4 \\cdot 10^6\\ \\mathrm{m}$, så satelliten är några hundra km upp.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `På en analog klocka pekar minutvisaren och timvisaren åt exakt samma håll klockan 12:00. Hur lång tid tar det innan de pekar åt samma håll igen? Svara i minuter.

${makeClock({ size: 150, hour: 0, minute: 0 })}`,
            answer: { value: 65.5, unit: 'min' },
            solution: `Det går inte att gissa "1 timme" — timvisaren har då redan flyttat sig. Vi tänker i **vinkelhastigheter** och frågar när minutvisaren har hunnit ikapp timvisaren ett helt varv.

Minutvisaren går ett varv på $60\\ \\mathrm{min}$, timvisaren ett varv på $12 \\cdot 60 = 720\\ \\mathrm{min}$. Deras vinkelhastigheter (i varv per minut):

$$ \\omega_\\text{min} = \\frac{1}{60}, \\qquad \\omega_\\text{tim} = \\frac{1}{720} $$

Visarna pekar åt samma håll igen när minutvisaren tagit in exakt **ett helt varv** på timvisaren. Den relativa vinkelhastigheten är

$$ \\omega_\\text{rel} = \\omega_\\text{min} - \\omega_\\text{tim} = \\frac{1}{60} - \\frac{1}{720} = \\frac{12 - 1}{720} = \\frac{11}{720}\\ \\text{varv/min} $$

Tiden för ett helt relativt varv blir

$$ t = \\frac{1\\ \\text{varv}}{\\omega_\\text{rel}} = \\frac{720}{11} = 65{,}5\\ \\mathrm{min} $$

**Svar:** Det tar $\\dfrac{720}{11} \\approx 65{,}5\\ \\mathrm{min}$ (cirka $1$ h $5$ min $27$ s).

**Generell slutsats:** Det här är ett "ikapp"-problem av samma slag som när två löpare på en bana möts eller hinner ikapp varandra — man arbetar med *skillnaden* i (vinkel)hastighet. Visarna möts alltså 11 gånger per 12 timmar, inte 12.`,
        },
    ],

    'fy2-1.4': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En bil tar en kurva med radien $50\\ \\mathrm{m}$ i farten $20\\ \\mathrm{m/s}$. Hur stor är centripetalaccelerationen?

${makeCircularPath({ r: 110, radiusLabel: 'r = 50 m', vLabel: 'v = 20 m/s', showFc: true, fcLabel: 'a_C', dashTrack: true })}`,
            answer: { value: 8.0, unit: 'm/s²' },
            solution: `Centripetalaccelerationen ges av

$$ a_C = \\frac{v^2}{r} = \\frac{20^2}{50} = \\frac{400}{50} = 8{,}0\\ \\mathrm{m/s^2} $$

**Svar:** Centripetalaccelerationen är $8{,}0\\ \\mathrm{m/s^2}$.

**Generell slutsats:** Accelerationen är riktad **in mot** kurvans centrum, fast farten är konstant — det är riktningen på hastigheten som ändras.`,
        },
        {
            level: 1,
            question: `En boll som väger $0{,}50\\ \\mathrm{kg}$ snurrar i en cirkel med radien $1{,}2\\ \\mathrm{m}$ med farten $6{,}0\\ \\mathrm{m/s}$. Beräkna centripetalkraften.

${makeCircularPath({ width: 280, height: 260, r: 100, radiusLabel: 'r = 1,2 m', vLabel: 'v = 6,0 m/s', showFc: true, fcLabel: 'F_C', point: true, dashTrack: true })}`,
            answer: { value: 15, unit: 'N' },
            solution: `Centripetalkraften ges av

$$ F_C = \\frac{m \\cdot v^2}{r} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 0{,}50\\ \\mathrm{kg} \\\\
v = 6{,}0\\ \\mathrm{m/s} \\\\
r = 1{,}2\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ F_C = \\frac{0{,}50 \\cdot 6{,}0^2}{1{,}2} = \\frac{18}{1{,}2} = 15\\ \\mathrm{N} $$

**Svar:** Centripetalkraften är $15\\ \\mathrm{N}$.

**Generell slutsats:** Centripetalkraften är ingen egen kraft — den är resultanten av de verkliga krafterna (här spännkraften i snöret) och är alltid riktad in mot centrum.`,
        },
        {
            level: 1,
            question: `En vikt på $0{,}20\\ \\mathrm{kg}$ snurrar i en cirkel med radien $0{,}80\\ \\mathrm{m}$ och perioden $0{,}50\\ \\mathrm{s}$. Beräkna centripetalkraften.`,
            answer: { value: 25, unit: 'N' },
            solution: `När perioden är given används formen med *T*:

$$ F_C = \\frac{4\\pi^2 \\cdot m \\cdot r}{T^2} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
m = 0{,}20\\ \\mathrm{kg} \\\\
r = 0{,}80\\ \\mathrm{m} \\\\
T = 0{,}50\\ \\mathrm{s}
\\end{array} \\right]
$$

$$ F_C = \\frac{4\\pi^2 \\cdot 0{,}20 \\cdot 0{,}80}{0{,}50^2} = 25\\ \\mathrm{N} $$

**Svar:** Centripetalkraften är ungefär $25\\ \\mathrm{N}$.

**Generell slutsats:** $F_C = \\dfrac{mv^2}{r} = \\dfrac{4\\pi^2 m r}{T^2}$ — välj formen efter om du har farten *v* eller perioden *T*.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En bil som väger $1\\,200\\ \\mathrm{kg}$ kör över ett backkrön med krökningsradien $60\\ \\mathrm{m}$ i farten $72\\ \\mathrm{km/h}$. Hur stor är normalkraften från vägen på bilen i krönets högsta punkt? ($g = 9{,}82\\ \\mathrm{N/kg}$)

${makeCrest({ r: 160, rLabel: 'r = 60 m' })}`,
            answer: { value: 3800, unit: 'N' },
            solution: `I krönets högsta punkt pekar centripetalkraften **nedåt** (mot krökningens centrum). Två krafter verkar: tyngdkraften $mg$ nedåt och normalkraften $N$ uppåt. Deras resultant är centripetalkraften:

$$ mg - N = \\frac{mv^2}{r} \\quad\\Leftrightarrow\\quad N = mg - \\frac{mv^2}{r} $$

Mätvärden ($v = 72\\ \\mathrm{km/h} = 20\\ \\mathrm{m/s}$):
$$
\\left[ \\begin{array}{l}
m = 1\\,200\\ \\mathrm{kg},\\quad g = 9{,}82\\ \\mathrm{N/kg} \\\\
v = 20\\ \\mathrm{m/s},\\quad r = 60\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ N = 1\\,200 \\cdot 9{,}82 - \\frac{1\\,200 \\cdot 20^2}{60} = 11\\,784 - 8\\,000 = 3\\,800\\ \\mathrm{N} $$

**Svar:** Normalkraften är ungefär $3\\,800\\ \\mathrm{N}$.

**Generell slutsats:** På krönet känns bilen *lättare* ($N < mg$) eftersom en del av tyngdkraften "går åt" till att kröka banan. Kör man tillräckligt fort ($v = \\sqrt{gr}$) blir $N = 0$ och bilen lyfter.`,
        },
        {
            level: 2,
            question: `En bil kör i en plan (oluttad) kurva med radien $90\\ \\mathrm{m}$. Friktionstalet mellan däck och väg är $0{,}50$. Vilken är den högsta fart bilen kan ha utan att slira ut ur kurvan? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeCircularPath({ r: 110, radiusLabel: 'r = 90 m', vLabel: 'v = ?', showFc: true, fcLabel: 'F_f', dashTrack: true })}`,
            answer: { value: 21, unit: 'm/s' },
            solution: `Det är **friktionskraften** som utgör centripetalkraften och håller bilen kvar i kurvan. Vid högsta farten är friktionen maximal, $F_f = \\mu mg$:

$$ F_f = \\mu mg = \\frac{mv^2}{r} $$

Massan stryks. Vi löser ut farten:

$$ v = \\sqrt{\\mu \\cdot g \\cdot r} = \\sqrt{0{,}50 \\cdot 9{,}82 \\cdot 90} = 21\\ \\mathrm{m/s} $$

**Svar:** Högsta farten är ungefär $21\\ \\mathrm{m/s}$ (drygt $75\\ \\mathrm{km/h}$).

**Generell slutsats:** Maxfarten beror *inte* på bilens massa (den stryks bort) — bara på friktionstalet och radien. Halt väglag (lågt μ) eller tvär kurva (litet *r*) sänker maxfarten.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `För att bilar ska klara en kurva även på halt underlag **doseras** vägen — vägbanan lutas in mot kurvans centrum. Vilken doseringsvinkel ska en kurva med radien $110\\ \\mathrm{m}$ ha för att en bil i farten $90\\ \\mathrm{km/h}$ ska klara den helt utan friktion? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeBankedCurve({ angle: 24, angleLabel: 'α', forces: false, showCenter: true })}`,
            answer: { value: 30, unit: '°' },
            solution: `Utan friktion finns bara två krafter på bilen: tyngdkraften $mg$ rakt ned och normalkraften $N$ vinkelrätt mot den lutande vägbanan. Insikten är att normalkraften måste **delas upp** i komposanter — och att dess vågräta komposant ensam ska utgöra centripetalkraften.

${makeBankedCurve({ angle: 24, angleLabel: 'α', forces: true })}

**Vågrätt** (in mot centrum): $\\;N \\sin\\alpha = \\dfrac{mv^2}{r}$

**Lodrätt** (jämvikt, bilen åker inte uppåt/nedåt): $\\;N \\cos\\alpha = mg$

Dividerar vi den första ekvationen med den andra försvinner både $N$ och $m$:

$$ \\frac{N\\sin\\alpha}{N\\cos\\alpha} = \\frac{mv^2/r}{mg} \\quad\\Leftrightarrow\\quad \\tan\\alpha = \\frac{v^2}{r \\cdot g} $$

Mätvärden ($v = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s}$):

$$ \\tan\\alpha = \\frac{25^2}{110 \\cdot 9{,}82} = \\frac{625}{1\\,080} = 0{,}579 \\quad\\Rightarrow\\quad \\alpha = 30^\\circ $$

**Svar:** Kurvan ska doseras med ungefär $30^\\circ$.

**Generell slutsats:** Den avgörande insikten är att dela upp normalkraften i komposanter och inse att den lodräta komposanten bär tyngden medan den vågräta krökar banan. Genom att dividera ekvationerna stryks både normalkraften och massan — doseringsvinkeln beror bara på fart och radie.`,
        },
    ],

    'fy2-1.5': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En konisk pendel har trådlängden $1{,}5\\ \\mathrm{m}$, och tråden bildar vinkeln $25^\\circ$ mot vertikalen. Beräkna periodtiden. ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 25, lLabel: 'l = 1,5 m', massLabel: 'm' })}`,
            answer: { value: 2.3, unit: 's' },
            solution: `Vi använder formeln för den koniska pendelns periodtid:

$$ T = 2\\pi\\sqrt{\\frac{l \\cdot \\cos\\alpha}{g}} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
l = 1{,}5\\ \\mathrm{m} \\\\
\\alpha = 25^\\circ \\\\
g = 9{,}82\\ \\mathrm{m/s^2}
\\end{array} \\right]
$$

$$ T = 2\\pi\\sqrt{\\frac{1{,}5 \\cdot \\cos 25^\\circ}{9{,}82}} = 2{,}3\\ \\mathrm{s} $$

**Svar:** Periodtiden är ungefär $2{,}3\\ \\mathrm{s}$.

**Generell slutsats:** I en konisk pendel sveper vikten runt i en vågrät cirkel medan tråden bildar en konform. Notera att massan inte ingår i formeln.`,
        },
        {
            level: 1,
            question: `På ett nöjesfält finns en slänggunga där stolarna hänger i $6{,}0\\ \\mathrm{m}$ långa kedjor. När den snurrar bildar kedjorna vinkeln $35^\\circ$ mot vertikalen. Hur lång tid tar ett varv? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 35, lLabel: 'l = 6,0 m' })}`,
            answer: { value: 4.4, unit: 's' },
            solution: `Slänggungan är en konisk pendel:

$$ T = 2\\pi\\sqrt{\\frac{l \\cdot \\cos\\alpha}{g}} = 2\\pi\\sqrt{\\frac{6{,}0 \\cdot \\cos 35^\\circ}{9{,}82}} = 4{,}4\\ \\mathrm{s} $$

**Svar:** Ett varv tar ungefär $4{,}4\\ \\mathrm{s}$.

**Generell slutsats:** Ju större vinkel (snabbare rotation), desto mindre $\\cos\\alpha$ och desto kortare periodtid — slänggungan snurrar fortare ju mer kedjorna sticker ut.`,
        },
        {
            level: 1,
            question: `En konisk pendel har periodtiden $2{,}0\\ \\mathrm{s}$. Vilken frekvens (antal varv per sekund) har rörelsen?`,
            answer: { value: 0.50, unit: 'Hz' },
            solution: `Frekvensen är inversen av periodtiden:

$$ f = \\frac{1}{T} = \\frac{1}{2{,}0} = 0{,}50\\ \\mathrm{Hz} $$

**Svar:** Frekvensen är $0{,}50\\ \\mathrm{Hz}$.

**Generell slutsats:** Sambandet $f = 1/T$ gäller för all periodisk rörelse — pendlar, rotation och vågor.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En konisk pendel har trådlängden $2{,}0\\ \\mathrm{m}$ och tråden bildar vinkeln $40^\\circ$ mot vertikalen. Bestäm farten hos pendelvikten i cirkelbanan. ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 40, lLabel: 'l = 2,0 m', rLabel: 'r' })}`,
            answer: { value: 3.3, unit: 'm/s' },
            solution: `Vi behöver banradien *r* och periodtiden *T*, sedan $v = \\dfrac{2\\pi r}{T}$.

**Banradien** är den vågräta delen av trådlängden:
$$ r = l \\cdot \\sin\\alpha = 2{,}0 \\cdot \\sin 40^\\circ = 1{,}29\\ \\mathrm{m} $$

**Periodtiden:**
$$ T = 2\\pi\\sqrt{\\frac{l\\cos\\alpha}{g}} = 2\\pi\\sqrt{\\frac{2{,}0 \\cdot \\cos 40^\\circ}{9{,}82}} = 2{,}48\\ \\mathrm{s} $$

**Farten:**
$$ v = \\frac{2\\pi r}{T} = \\frac{2\\pi \\cdot 1{,}29}{2{,}48} = 3{,}3\\ \\mathrm{m/s} $$

**Svar:** Farten är ungefär $3{,}3\\ \\mathrm{m/s}$.

**Generell slutsats:** Trådlängden delas upp geometriskt: $r = l\\sin\\alpha$ (vågrätt) och höjden $h = l\\cos\\alpha$ (lodrätt). Här behövdes radien för fartberäkningen.`,
        },
        {
            level: 2,
            question: `En konisk pendel med trådlängden $1{,}0\\ \\mathrm{m}$ har periodtiden $1{,}8\\ \\mathrm{s}$. Vilken vinkel bildar tråden mot vertikalen? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 34, lLabel: 'l = 1,0 m', angleLabel: 'α' })}`,
            answer: { value: 36, unit: '°' },
            solution: `Vi löser ut $\\cos\\alpha$ ur periodformeln:

$$ T = 2\\pi\\sqrt{\\frac{l\\cos\\alpha}{g}} \\quad\\Leftrightarrow\\quad \\cos\\alpha = \\frac{g \\cdot T^2}{4\\pi^2 \\cdot l} $$

Mätvärden:
$$
\\left[ \\begin{array}{l}
g = 9{,}82\\ \\mathrm{m/s^2} \\\\
T = 1{,}8\\ \\mathrm{s} \\\\
l = 1{,}0\\ \\mathrm{m}
\\end{array} \\right]
$$

$$ \\cos\\alpha = \\frac{9{,}82 \\cdot 1{,}8^2}{4\\pi^2 \\cdot 1{,}0} = 0{,}806 \\quad\\Rightarrow\\quad \\alpha = \\arccos(0{,}806) = 36^\\circ $$

**Svar:** Tråden bildar ungefär $36^\\circ$ mot vertikalen.

**Generell slutsats:** Här satt den okända vinkeln inuti en cosinus. Man löser ut $\\cos\\alpha$ algebraiskt först och tar sedan $\\arccos$ — rutinmässigt med räknare.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En konisk pendel har trådlängden $1{,}5\\ \\mathrm{m}$. Vid vilken periodtid blir spännkraften i tråden **exakt dubbelt så stor** som tyngdkraften på pendelvikten? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 45, lLabel: 'l = 1,5 m', angleLabel: null, forces: true })}`,
            answer: { value: 1.7, unit: 's', tol: 0.03 },
            solution: `Insikten är att spännkraften $F_S$ måste delas upp i komposanter, och att den **lodräta** komposanten ensam bär upp tyngden (vikten åker varken upp eller ner):

$$ F_S \\cos\\alpha = mg $$

Villkoret $F_S = 2mg$ insatt ger

$$ 2mg \\cdot \\cos\\alpha = mg \\quad\\Leftrightarrow\\quad \\cos\\alpha = \\frac{1}{2} \\quad\\Rightarrow\\quad \\alpha = 60^\\circ $$

Massan stryks — vinkeln bestäms helt av kraftvillkoret. Nu sätter vi in $\\cos\\alpha = 0{,}5$ i periodformeln:

$$ T = 2\\pi\\sqrt{\\frac{l\\cos\\alpha}{g}} = 2\\pi\\sqrt{\\frac{1{,}5 \\cdot 0{,}5}{9{,}82}} = 1{,}7\\ \\mathrm{s} $$

**Svar:** Vid periodtiden ungefär $1{,}7\\ \\mathrm{s}$ är spännkraften dubbelt så stor som tyngdkraften.

**Generell slutsats:** Nyckeln är att kraftvillkoret ($F_S = 2mg$) via den lodräta jämvikten $F_S\\cos\\alpha = mg$ *bestämmer vinkeln* — först därefter kan periodtiden räknas ut. Massan behövdes aldrig.`,
        },
    ],

    'fy2-1.6': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En boll sparkas från marken med utgångsfarten $18\\ \\mathrm{m/s}$ och vinkeln $30^\\circ$ mot horisontalplanet. Hur lång blir kastvidden? (Bortse från luftmotstånd, $g = 9{,}82\\ \\mathrm{m/s^2}$.)

${makeProjectile({ kind: 'angle', angle: 30, v0Label: 'v_0 = 18 m/s', rangeLabel: 'x_max = ?' })}`,
            answer: { value: 29, unit: 'm' },
            solution: `Eftersom bollen startar och landar i samma höjd kan vi använda formeln för kastvidd:

$$ x_{\\max} = \\frac{v_0^2 \\cdot \\sin(2\\alpha)}{g} = \\frac{18^2 \\cdot \\sin(2 \\cdot 30^\\circ)}{9{,}82} = \\frac{324 \\cdot \\sin 60^\\circ}{9{,}82} = 29\\ \\mathrm{m} $$

**Svar:** Kastvidden är ungefär $29\\ \\mathrm{m}$.

**Generell slutsats:** Kastvidden är störst vid $45^\\circ$ (då $\\sin 2\\alpha = 1$). Formeln gäller bara när start- och landningshöjd är desamma.`,
        },
        {
            level: 1,
            question: `Samma boll sparkas från marken med utgångsfarten $18\\ \\mathrm{m/s}$ och vinkeln $30^\\circ$. Hur hög blir bollens stighöjd (högsta punkt)? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeProjectile({ kind: 'angle', angle: 30, v0Label: 'v_0 = 18 m/s', apex: true, apexLabel: 'y_max = ?' })}`,
            answer: { value: 8.2, unit: 'm' },
            solution: `Stighöjden ges av

$$ y_{\\max} = \\frac{v_0^2 \\cdot \\sin^2\\alpha}{2g} = \\frac{18^2 \\cdot \\sin^2 30^\\circ}{2 \\cdot 9{,}82} = \\frac{324 \\cdot 0{,}25}{19{,}64} = 8{,}2\\ \\mathrm{m} $$

**Svar:** Stighöjden är ungefär $8{,}2\\ \\mathrm{m}$.

**Generell slutsats:** I högsta punkten är hastigheten i *y*-led noll ($v_y = 0$); bollen rör sig då enbart vågrätt med $v_x = v_0\\cos\\alpha$.`,
        },
        {
            level: 1,
            question: `Kalle springer rakt ut från kanten på ett $10\\ \\mathrm{m}$ högt hopptorn med den vågräta farten $4{,}0\\ \\mathrm{m/s}$. Hur långt ut från tornet landar han i vattnet? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeProjectile({ kind: 'horizontal', platformH: 150, v0Label: 'v_0 = 4,0 m/s', heightLabel: 'h = 10 m', distLabel: 'x = ?', objLabel: 'Kalle' })}`,
            answer: { value: 5.7, unit: 'm' },
            solution: `Detta är ett vågrätt kast. Vi bestämmer först falltiden ur rörelsen i *y*-led (han startar med $v_y = 0$):

$$ y = \\frac{g t^2}{2} \\quad\\Leftrightarrow\\quad t = \\sqrt{\\frac{2y}{g}} = \\sqrt{\\frac{2 \\cdot 10}{9{,}82}} = 1{,}43\\ \\mathrm{s} $$

I *x*-led är farten konstant, så den vågräta sträckan blir

$$ x = v_0 \\cdot t = 4{,}0 \\cdot 1{,}43 = 5{,}7\\ \\mathrm{m} $$

**Svar:** Han landar ungefär $5{,}7\\ \\mathrm{m}$ ut från tornet.

**Generell slutsats:** Rörelsen i *x*-led och *y*-led är oberoende av varandra. Falltiden bestäms helt av höjden — den vågräta farten påverkar bara *hur långt* han hinner under den tiden.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En boll kastas vågrätt med farten $12\\ \\mathrm{m/s}$ från höjden $8{,}0\\ \\mathrm{m}$. Med vilken fart träffar den marken? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeProjectile({ kind: 'horizontal', platformH: 140, v0Label: 'v_0 = 12 m/s', heightLabel: 'h = 8,0 m' })}`,
            answer: { value: 17, unit: 'm/s', tol: 0.03 },
            solution: `Sluthastigheten är resultanten av den (konstanta) vågräta farten och den (växande) lodräta farten. Vi behöver först falltiden:

$$ t = \\sqrt{\\frac{2y}{g}} = \\sqrt{\\frac{2 \\cdot 8{,}0}{9{,}82}} = 1{,}28\\ \\mathrm{s} $$

Hastigheterna vid nedslaget:
$$
\\left[ \\begin{array}{l}
v_x = 12\\ \\mathrm{m/s}\\ (\\text{konstant}) \\\\
v_y = g \\cdot t = 9{,}82 \\cdot 1{,}28 = 12{,}5\\ \\mathrm{m/s}
\\end{array} \\right]
$$

Pythagoras sats ger farten:

$$ v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{12^2 + 12{,}5^2} = 17\\ \\mathrm{m/s} $$

**Svar:** Bollen träffar marken med ungefär $17\\ \\mathrm{m/s}$.

**Generell slutsats:** Farten är hypotenusan i en triangel med komposanterna $v_x$ och $v_y$ som kateter. Den vågräta farten ($v_x$) ändras aldrig under kastet.`,
        },
        {
            level: 2,
            question: `Från en klippa $20\\ \\mathrm{m}$ över vattnet kastas en sten **vågrätt**. Stenen ska landa $15\\ \\mathrm{m}$ ut från klippans fot. Vilken utgångsfart krävs? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeProjectile({ kind: 'horizontal', platformH: 150, v0Label: 'v_0 = ?', heightLabel: 'h = 20 m', distLabel: 'x = 15 m' })}`,
            answer: { value: 7.4, unit: 'm/s' },
            solution: `Falltiden bestäms av höjden (rörelsen i *y*-led, $v_y = 0$ från start):

$$ t = \\sqrt{\\frac{2y}{g}} = \\sqrt{\\frac{2 \\cdot 20}{9{,}82}} = 2{,}02\\ \\mathrm{s} $$

Under den tiden ska stenen hinna $15\\ \\mathrm{m}$ i vågrätt led med konstant fart:

$$ x = v_0 \\cdot t \\quad\\Leftrightarrow\\quad v_0 = \\frac{x}{t} = \\frac{15}{2{,}02} = 7{,}4\\ \\mathrm{m/s} $$

**Svar:** Utgångsfarten måste vara ungefär $7{,}4\\ \\mathrm{m/s}$.

**Generell slutsats:** Höjden bestämmer "hur lång tid stenen har på sig"; därefter ger den önskade vågräta sträckan den fart som krävs. Två oberoende rörelser kopplas ihop via den gemensamma tiden.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En fotbollsspelare sparkar bollen från marken med utgångsfarten $20\\ \\mathrm{m/s}$ och vinkeln $35^\\circ$. På avståndet $30\\ \\mathrm{m}$ står en $2{,}5\\ \\mathrm{m}$ hög mur. Hur högt över marken befinner sig bollen när den når muren — och går den över? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeProjectile({ kind: 'angle', angle: 35, v0Label: 'v_0 = 20 m/s', wall: { atFracX: 0.78, hFrac: 0.37, label: '2,5 m' } })}`,
            answer: { value: 4.5, unit: 'm' },
            solution: `Här går det **inte** att använda kastviddsformeln — vi måste behandla rörelsen i *x*- och *y*-led var för sig och ta reda på höjden vid en *specifik* vågrät position.

**Steg 1 — tiden att nå muren** (vågrät rörelse, konstant fart):
$$ x = v_0\\cos\\alpha \\cdot t \\;\\Leftrightarrow\\; t = \\frac{x}{v_0\\cos\\alpha} = \\frac{30}{20 \\cdot \\cos 35^\\circ} = 1{,}83\\ \\mathrm{s} $$

**Steg 2 — höjden vid den tiden** (lodrät rörelse):
$$ y = v_0\\sin\\alpha \\cdot t - \\frac{g t^2}{2} = 20\\sin 35^\\circ \\cdot 1{,}83 - \\frac{9{,}82 \\cdot 1{,}83^2}{2} $$
$$ y = 21{,}0 - 16{,}5 = 4{,}5\\ \\mathrm{m} $$

Eftersom $4{,}5\\ \\mathrm{m} > 2{,}5\\ \\mathrm{m}$ går bollen över muren med god marginal.

**Svar:** Bollen är ungefär $4{,}5\\ \\mathrm{m}$ över marken vid muren och går alltså **över** den (med drygt $2\\ \\mathrm{m}$ till godo).

**Generell slutsats:** Tricket är att den vågräta rörelsen ger *tiden* att nå muren, och att den tiden sedan sätts in i höjdformeln. När man frågar efter höjden vid en bestämd punkt (mur, nät, ribba) duger inga färdiga vidd-/höjdformler — man måste följa de två rörelserna separat.`,
        },
    ],

    'fy2-1.7': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `En gunga släpps från vila och faller så att tyngdpunkten sjunker $1{,}5\\ \\mathrm{m}$ tills den når banans lägsta punkt. Vilken fart har gungan där? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeSwing({ angle: 48, hLabel: 'h = 1,5 m', angleLabel: null })}`,
            answer: { value: 5.4, unit: 'm/s' },
            solution: `Vi använder energiprincipen — lägesenergin omvandlas till rörelseenergi:

$$ mgh = \\frac{mv^2}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{2gh} $$

Massan stryks. Insättning:

$$ v = \\sqrt{2 \\cdot 9{,}82 \\cdot 1{,}5} = 5{,}4\\ \\mathrm{m/s} $$

**Svar:** Farten i lägsta punkten är ungefär $5{,}4\\ \\mathrm{m/s}$.

**Generell slutsats:** Farten beror bara på fallhöjden, inte på massan eller banans form (om friktion försummas). Detta är samma $v = \\sqrt{2gh}$ som för fritt fall.`,
        },
        {
            level: 1,
            question: `I lägsta punkten av en gungbana (radie $3{,}0\\ \\mathrm{m}$) rör sig en gungare som väger $60\\ \\mathrm{kg}$ med farten $5{,}0\\ \\mathrm{m/s}$. Hur stor är centripetalkraften?

${makeSwing({ ropeLabel: 'r = 3,0 m', forces: true })}`,
            answer: { value: 500, unit: 'N' },
            solution: `Centripetalkraften ges av

$$ F_C = \\frac{m v^2}{r} = \\frac{60 \\cdot 5{,}0^2}{3{,}0} = \\frac{1\\,500}{3{,}0} = 500\\ \\mathrm{N} $$

**Svar:** Centripetalkraften är $500\\ \\mathrm{N}$.

**Generell slutsats:** I lägsta punkten är centripetalkraften riktad **uppåt** (in mot banans centrum) och utgörs av spännkraften minus tyngdkraften.`,
        },
        {
            level: 1,
            question: `En berg- och dalbanevagn åker i en vertikal loop med radien $4{,}0\\ \\mathrm{m}$. Vilken är den minsta farten i loopens **högsta** punkt för att vagnen inte ska tappa kontakten med banan? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeLoop({ r: 92, rLabel: 'r = 4,0 m', cartTop: true, topForces: true, vTop: 'v = ?' })}`,
            answer: { value: 6.3, unit: 'm/s' },
            solution: `I gränsfallet är normalkraften (eller spännkraften) noll i högsta punkten, så tyngdkraften ensam utgör centripetalkraften:

$$ mg = \\frac{mv^2}{r} \\quad\\Leftrightarrow\\quad v = \\sqrt{gr} = \\sqrt{9{,}82 \\cdot 4{,}0} = 6{,}3\\ \\mathrm{m/s} $$

**Svar:** Den minsta farten i högsta punkten är ungefär $6{,}3\\ \\mathrm{m/s}$.

**Generell slutsats:** $v = \\sqrt{gr}$ är den klassiska villkorsfarten i toppen av en loop — går vagnen långsammare faller den inåt och tappar banan.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `En person som väger $70\\ \\mathrm{kg}$ gungar i en gunga med $4{,}0\\ \\mathrm{m}$ långa rep. Hon släpps från vila från en höjd $1{,}2\\ \\mathrm{m}$ över banans lägsta punkt. Hur stor är den totala spännkraften i repen i lägsta punkten? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeSwing({ angle: 40, hLabel: 'h = 1,2 m', ropeLabel: 'l = 4,0 m', angleLabel: null, forces: true })}`,
            answer: { value: 1100, unit: 'N' },
            solution: `Vi kombinerar **energiprincipen** (för farten) med **cirkulär rörelse** (för kraften).

**Steg 1 — farten i lägsta punkten** ur energiprincipen:
$$ v^2 = 2gh = 2 \\cdot 9{,}82 \\cdot 1{,}2 = 23{,}6\\ \\mathrm{m^2/s^2} $$

**Steg 2 — krafterna i lägsta punkten.** Spännkraften $F_S$ uppåt och tyngdkraften $mg$ nedåt ger tillsammans centripetalkraften uppåt:
$$ F_S - mg = \\frac{mv^2}{r} \\quad\\Leftrightarrow\\quad F_S = \\frac{mv^2}{r} + mg $$
$$ F_S = \\frac{70 \\cdot 23{,}6}{4{,}0} + 70 \\cdot 9{,}82 = 412 + 687 = 1\\,100\\ \\mathrm{N} $$

**Svar:** Spännkraften i lägsta punkten är ungefär $1\\,100\\ \\mathrm{N}$.

**Generell slutsats:** I lägsta punkten måste repet både bära tyngden *och* kröka banan — därför är $F_S > mg$. Energiprincipen ger farten, centripetalsambandet ger kraften.`,
        },
        {
            level: 2,
            question: `En berg- och dalbana har en vertikal loop med radien $8{,}0\\ \\mathrm{m}$. Vilken minsta fart måste vagnen ha vid loopens **botten** för att precis klara hela loopen? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeLoop({ r: 88, rLabel: 'r = 8,0 m', cartTop: true, cartBottom: true, heightLabel: '2r' })}`,
            answer: { value: 20, unit: 'm/s' },
            solution: `Vi arbetar i två steg: villkoret i toppen ger minsta toppfarten, och energiprincipen kopplar topp och botten.

**Steg 1 — minsta fart i toppen** (tyngdkraften = centripetalkraft):
$$ v_\\text{topp}^2 = gr $$

**Steg 2 — energiprincipen mellan botten och toppen.** Vagnen stiger höjden $2r$ (loopens diameter):
$$ \\frac{v_\\text{botten}^2}{2} = \\frac{v_\\text{topp}^2}{2} + g \\cdot 2r \\quad\\Leftrightarrow\\quad v_\\text{botten}^2 = v_\\text{topp}^2 + 4gr = gr + 4gr = 5gr $$

$$ v_\\text{botten} = \\sqrt{5gr} = \\sqrt{5 \\cdot 9{,}82 \\cdot 8{,}0} = 20\\ \\mathrm{m/s} $$

**Svar:** Vagnen måste ha minst ungefär $20\\ \\mathrm{m/s}$ vid loopens botten.

**Generell slutsats:** Det fina sambandet $v_\\text{botten} = \\sqrt{5gr}$ följer av att toppfarten ($\\sqrt{gr}$) plus energin för att lyfta vagnen $2r$ tillsammans bestämmer bottenfarten.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En pendelkula som väger $200\\ \\mathrm{g}$ hänger i en $1{,}2\\ \\mathrm{m}$ lång tråd. Kulan dras ut i sidled till vinkeln α mot lodlinjen och släpps. Tråden tål en spännkraft på högst $3{,}0\\ \\mathrm{N}$. Vilken är den största vinkeln α man kan släppa kulan ifrån utan att tråden brister? ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeSwing({ angle: 42, angleLabel: 'α', ropeLabel: 'l = 1,2 m', forces: true })}`,
            answer: { value: 43, unit: '°' },
            solution: `Tråden är som mest belastad i banans **lägsta punkt** (där farten är störst). Där måste spännkraften både bära tyngden och kröka banan. Vi måste alltså koppla ihop **energiprincipen** (farten) med **cirkulär dynamik** (kraften) och uttrycka allt i vinkeln α.

**Farten i lägsta punkten.** Kulan faller höjden $h = l(1 - \\cos\\alpha)$ från släppläget till botten. Energiprincipen ger
$$ v^2 = 2gh = 2gl(1 - \\cos\\alpha) $$

**Spännkraften i lägsta punkten.** Här gäller $F_S - mg = \\dfrac{mv^2}{r}$ med $r = l$:
$$ F_S = mg + \\frac{m \\cdot 2gl(1-\\cos\\alpha)}{l} = mg + 2mg(1-\\cos\\alpha) = mg\\,(3 - 2\\cos\\alpha) $$

Trådlängden *l* försvann. Sätt $F_S = 3{,}0\\ \\mathrm{N}$ och lös ut vinkeln ($mg = 0{,}200 \\cdot 9{,}82 = 1{,}964\\ \\mathrm{N}$):

$$ 3{,}0 = 1{,}964\\,(3 - 2\\cos\\alpha) \\;\\Rightarrow\\; 3 - 2\\cos\\alpha = 1{,}527 \\;\\Rightarrow\\; \\cos\\alpha = 0{,}736 $$

$$ \\alpha = \\arccos(0{,}736) = 43^\\circ $$

**Svar:** Kulan kan släppas från högst ungefär $43^\\circ$ utan att tråden brister.

**Generell slutsats:** Det eleganta resultatet $F_S = mg(3 - 2\\cos\\alpha)$ kombinerar tre idéer: fallhöjden uttryckt med trigonometri ($l(1-\\cos\\alpha)$), energiprincipen för farten, och kraftekvationen för cirkelrörelse i lägsta punkten. Släpps kulan rakt ut ($\\alpha = 90^\\circ$) blir $F_S = 3mg$.`,
        },
    ],

    'fy2-1.8': [
        // ── Nivå 1 (E) ───────────────────────────────────────────────
        {
            level: 1,
            question: `Med en konisk pendel kan man bestämma tyngdaccelerationen. Pendeln sveper i en cirkel $0{,}90\\ \\mathrm{m}$ under takfästet med periodtiden $1{,}9\\ \\mathrm{s}$. Vilket värde på *g* ger detta?

${makeConicalPendulum({ angle: 28, hLabel: 'h = 0,90 m', angleLabel: null })}`,
            answer: { value: 9.8, unit: 'm/s²' },
            solution: `Den koniska pendelns g-bestämning bygger på sambandet

$$ g = \\frac{4\\pi^2 \\cdot h}{T^2} $$

där *h* är cirkelbanans höjd under upphängningspunkten. Insättning:

$$ g = \\frac{4\\pi^2 \\cdot 0{,}90}{1{,}9^2} = 9{,}8\\ \\mathrm{m/s^2} $$

**Svar:** $g \\approx 9{,}8\\ \\mathrm{m/s^2}$.

**Generell slutsats:** Det fina med metoden är att bara höjden *h* och periodtiden *T* behövs — pendelns massa och banans radie behöver inte mätas.`,
        },
        {
            level: 1,
            question: `Hur långt under takfästet sveper en konisk pendel om periodtiden är $2{,}0\\ \\mathrm{s}$? Använd $g = 9{,}82\\ \\mathrm{m/s^2}$.

${makeConicalPendulum({ angle: 30, hLabel: 'h = ?', angleLabel: null })}`,
            answer: { value: 0.99, unit: 'm' },
            solution: `Vi löser ut höjden *h* ur g-sambandet:

$$ g = \\frac{4\\pi^2 h}{T^2} \\quad\\Leftrightarrow\\quad h = \\frac{g \\cdot T^2}{4\\pi^2} = \\frac{9{,}82 \\cdot 2{,}0^2}{4\\pi^2} = 0{,}99\\ \\mathrm{m} $$

**Svar:** Cirkelbanan ligger ungefär $0{,}99\\ \\mathrm{m}$ under takfästet.

**Generell slutsats:** Höjden *h* är den lodräta delen av tråden ($h = l\\cos\\alpha$), inte trådlängden — det är den som bestämmer periodtiden.`,
        },
        {
            level: 1,
            question: `En konisk pendel sveper $1{,}2\\ \\mathrm{m}$ under takfästet. Beräkna periodtiden. ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 32, hLabel: 'h = 1,2 m', angleLabel: null })}`,
            answer: { value: 2.2, unit: 's' },
            solution: `Eftersom höjden $h = l\\cos\\alpha$ kan periodformeln skrivas $T = 2\\pi\\sqrt{h/g}$:

$$ T = 2\\pi\\sqrt{\\frac{h}{g}} = 2\\pi\\sqrt{\\frac{1{,}2}{9{,}82}} = 2{,}2\\ \\mathrm{s} $$

**Svar:** Periodtiden är ungefär $2{,}2\\ \\mathrm{s}$.

**Generell slutsats:** Detta är samma samband som $g = 4\\pi^2 h/T^2$, bara löst för *T* i stället för *g*.`,
        },

        // ── Nivå 2 (C) ───────────────────────────────────────────────
        {
            level: 2,
            question: `I en laboration mäter en grupp tiden för $10$ varv med en konisk pendel till $21\\ \\mathrm{s}$, och cirkelbanans höjd under fästet till $1{,}1\\ \\mathrm{m}$. Vilket värde på *g* får de?

${makeConicalPendulum({ angle: 27, hLabel: 'h = 1,1 m', angleLabel: null })}`,
            answer: { value: 9.8, unit: 'm/s²' },
            solution: `Först bestämmer vi periodtiden (tiden för ett varv):

$$ T = \\frac{21}{10} = 2{,}1\\ \\mathrm{s} $$

Sedan g-sambandet:

$$ g = \\frac{4\\pi^2 \\cdot h}{T^2} = \\frac{4\\pi^2 \\cdot 1{,}1}{2{,}1^2} = 9{,}8\\ \\mathrm{m/s^2} $$

**Svar:** De får $g \\approx 9{,}8\\ \\mathrm{m/s^2}$ — mycket nära det sanna värdet $9{,}82\\ \\mathrm{m/s^2}$.

**Generell slutsats:** Att mäta tiden för $10$ varv och dela med $10$ minskar slumpmässiga mätfel i tidtagningen — ett standardgrepp i laborationer.`,
        },
        {
            level: 2,
            question: `En konisk pendel har trådlängden $1{,}8\\ \\mathrm{m}$ och tråden bildar $40^\\circ$ mot vertikalen. Beräkna periodtiden via banans höjd. ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 40, lLabel: 'l = 1,8 m', hLabel: 'h' })}`,
            answer: { value: 2.4, unit: 's' },
            solution: `Cirkelbanans höjd under fästet är trådens lodräta del:

$$ h = l\\cos\\alpha = 1{,}8 \\cdot \\cos 40^\\circ = 1{,}38\\ \\mathrm{m} $$

Periodtiden blir

$$ T = 2\\pi\\sqrt{\\frac{h}{g}} = 2\\pi\\sqrt{\\frac{1{,}38}{9{,}82}} = 2{,}4\\ \\mathrm{s} $$

**Svar:** Periodtiden är ungefär $2{,}4\\ \\mathrm{s}$.

**Generell slutsats:** Här kopplas geometrin ($h = l\\cos\\alpha$) ihop med periodformeln. Det ger samma svar som $T = 2\\pi\\sqrt{l\\cos\\alpha / g}$ direkt.`,
        },

        // ── Nivå 3 (A) ───────────────────────────────────────────────
        {
            level: 3,
            question: `En konisk pendel har massan $0{,}25\\ \\mathrm{kg}$ och trådlängden $2{,}0\\ \\mathrm{m}$. När den snurrar mäts spännkraften i tråden till $2{,}8\\ \\mathrm{N}$. Bestäm pendelns periodtid. ($g = 9{,}82\\ \\mathrm{m/s^2}$)

${makeConicalPendulum({ angle: 32, lLabel: 'l = 2,0 m', angleLabel: null, forces: true })}`,
            answer: { value: 2.7, unit: 's' },
            solution: `Spännkraften ger oss vinkeln — och vinkeln ger oss periodtiden. Vi måste alltså först dela upp spännkraften i komposanter.

**Steg 1 — vinkeln ur den lodräta jämvikten.** Spännkraftens lodräta komposant bär tyngden:
$$ F_S \\cos\\alpha = mg \\quad\\Leftrightarrow\\quad \\cos\\alpha = \\frac{mg}{F_S} = \\frac{0{,}25 \\cdot 9{,}82}{2{,}8} = 0{,}877 $$

(Det ger $\\alpha = 28{,}8^\\circ$, men vi behöver bara $\\cos\\alpha$ vidare.)

**Steg 2 — periodtiden.** Banans höjd är $h = l\\cos\\alpha$, så
$$ T = 2\\pi\\sqrt{\\frac{l\\cos\\alpha}{g}} = 2\\pi\\sqrt{\\frac{2{,}0 \\cdot 0{,}877}{9{,}82}} = 2{,}7\\ \\mathrm{s} $$

**Svar:** Periodtiden är ungefär $2{,}7\\ \\mathrm{s}$.

**Generell slutsats:** Insikten är att den uppmätta spännkraften, via den lodräta jämvikten $F_S\\cos\\alpha = mg$, *bestämmer vinkeln* — och först därefter kan periodtiden beräknas. Att kontrollera spännkraften mot tyngdkraften ($F_S > mg$ alltid, eftersom den även måste kröka banan) är en bra rimlighetskontroll.`,
        },
    ],
};

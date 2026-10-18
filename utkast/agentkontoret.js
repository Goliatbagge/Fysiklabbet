/*
 * agentkontoret.js — Fysiklabbets agenter i ett pixelkontor
 *
 * Spelar upp en riktig dag ur window.AGENTKONTOR (byggd av
 * .claude/bygg-agentkontor.js ur sessionstranskript, git log och jobbloggar).
 *
 * Uppbyggnad
 *   1. Värld: 48 × 29 rutor à 16 px. Väggar, rum och möbler ritas procedurellt
 *      i en lågupplöst duk (768 × 464) som skalas upp med skarpa pixlar.
 *      Text (namnskyltar, pratbubblor, rumsskyltar) ritas ovanpå i skärmens
 *      egen upplösning så att den blir läsbar på en projektor.
 *   2. Figurer: varje agent har ett utseende, en hemplats och en kö av
 *      handlingar (gå, säga, arbeta, anropa). Gången planeras med A* i rutnätet.
 *   3. Uppspelning: en simulerad klocka (sekunder efter midnatt) delar ut
 *      dagens händelser när klockan når dem. Klockan går långsamt när något
 *      rör sig, fortare när agenter bara arbetar och spolar när allt är tyst.
 */
(function () {
  'use strict';

  const DATA = window.AGENTKONTOR || { dagar: {} };
  const T = 16, COLS = 48, ROWS = 29, W = COLS * T, H = ROWS * T;

  // =========================================================================
  // 1. Färger och hjälpfunktioner
  // =========================================================================
  const P = {
    vaggTopp: '#2a2130', vaggKant: '#43364a', vaggFront: '#7c6352', vaggFrontMork: '#5f4a3d', list: '#3b2c27',
    tra1: '#b8804f', tra2: '#a9713f', tra3: '#c48d5b', traFog: '#8c5a33',
    ljustTra1: '#d6b083', ljustTra2: '#c9a173', ljustTraFog: '#a88259',
    rodMatta: '#7d3a3f', rodMatta2: '#6f3136', gronMatta: '#4f6b4a', gronMatta2: '#46613f',
    metall: '#5d6470', metall2: '#525864', metallFog: '#3f444d',
    lila: '#4a3b5e', lila2: '#43355a', linoleum: '#8fa3a8', linoleum2: '#839aa0',
    kakel: '#d9ccb0', kakel2: '#cbbd9f', teal: '#3f6f6f', teal2: '#386464',
    schack1: '#e8e0d0', schack2: '#b9ad99',
    bord: '#8a5a36', bordMork: '#6a4226', bordLjus: '#a06b43',
    skarm: '#1c2530', skarmLjus: '#7fd0ff',
  };
  function hash(x, y) { let h = x * 374761393 + y * 668265263; h = (h ^ (h >> 13)) * 1274126177; return ((h ^ (h >> 16)) >>> 0) / 4294967295; }
  const tid = s => { s = ((s % 86400) + 86400) % 86400; return String(Math.floor(s / 3600)).padStart(2, '0') + ':' + String(Math.floor(s / 60) % 60).padStart(2, '0'); };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // =========================================================================
  // 2. Kartan
  // =========================================================================
  // Rum (rutkoordinater, innermått). golv = mönsterfunktion.
  const RUM = [
    { id: 'nyhet', namn: 'Nyhetsredaktionen', x: 1, y: 2, w: 11, h: 9, golv: 'tra' },
    { id: 'utgivare', namn: 'Utgivaren', x: 13, y: 2, w: 8, h: 9, golv: 'rod' },
    { id: 'sprak', namn: 'Språkrummet', x: 22, y: 2, w: 7, h: 9, golv: 'gron' },
    { id: 'server', namn: 'Serverrummet · main', x: 30, y: 2, w: 7, h: 9, golv: 'metall' },
    { id: 'studio', namn: 'Sociala medier', x: 38, y: 2, w: 9, h: 9, golv: 'lila' },
    { id: 'korridor', namn: 'Öppna kontoret', x: 1, y: 12, w: 46, h: 5, golv: 'ljustTra' },
    { id: 'labb', namn: 'Utvecklingslabbet', x: 1, y: 18, w: 15, h: 10, golv: 'linoleum' },
    { id: 'atelje', namn: 'Bildateljén', x: 17, y: 18, w: 5, h: 10, golv: 'ljustTra' },
    { id: 'post', namn: 'Postrummet', x: 23, y: 18, w: 7, h: 10, golv: 'kakel' },
    { id: 'mote', namn: 'Mötesrummet', x: 31, y: 18, w: 7, h: 10, golv: 'teal' },
    { id: 'lounge', namn: 'Lounge', x: 39, y: 18, w: 8, h: 10, golv: 'schack' },
  ];
  const grid = [];      // 0 = golv, 1 = vägg, 2 = möbel
  const golvTyp = [];
  for (let y = 0; y < ROWS; y++) { grid.push(new Array(COLS).fill(1)); golvTyp.push(new Array(COLS).fill(null)); }
  for (const r of RUM) for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) { grid[y][x] = 0; golvTyp[y][x] = r.golv; }
  // Dörrar: [x, y, golv]
  const DORRAR = [[6, 11], [7, 11], [16, 11], [17, 11], [25, 11], [33, 11], [34, 11], [42, 11], [43, 11],
    [8, 17], [9, 17], [19, 17], [26, 17], [34, 17], [42, 17], [43, 17]];
  for (const [x, y] of DORRAR) { grid[y][x] = 0; golvTyp[y][x] = 'dorr'; }

  // Möbler: statiska ritas en gång, dynamiska varje bildruta.
  const MOBLER = [];
  function mobel(typ, x, y, w, h, extra) {
    const m = Object.assign({ typ, x, y, w, h, block: true }, extra || {});
    MOBLER.push(m);
    if (m.block) for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) if (grid[yy] && grid[yy][xx] === 0) grid[yy][xx] = 2;
    return m;
  }
  // Nyhetsredaktionen
  mobel('nyhetsskarm', 1, 2, 5, 1, { dyn: true });
  mobel('hylla', 8, 2, 4, 1);
  mobel('skrivbord', 4, 5, 3, 1, { dator: true, agare: 'nyhetsagent' });
  mobel('glob', 9, 6, 1, 1);
  mobel('vaxt', 1, 9, 1, 1); mobel('vaxt', 11, 9, 1, 1);
  mobel('matta', 3, 8, 5, 2, { block: false, farg: '#5b6c8f' });
  // Utgivaren
  mobel('hylla', 13, 2, 4, 1); mobel('arkivskap', 19, 2, 2, 1);
  mobel('skrivbord', 15, 5, 3, 1, { dator: true, stampel: true, agare: 'utgivare' });
  mobel('vaxt', 13, 9, 1, 1);
  // Språkrummet
  mobel('hylla', 22, 2, 3, 1); mobel('hylla', 26, 2, 3, 1);
  mobel('fatolj', 24, 6, 2, 1, { agare: 'korrekturlasare' });
  mobel('lampa', 27, 6, 1, 1, { dyn: true });
  mobel('matta', 23, 8, 4, 2, { block: false, farg: '#7a5d3a' });
  // Serverrummet
  mobel('rack', 30, 2, 1, 3, { dyn: true }); mobel('rack', 32, 2, 1, 3, { dyn: true });
  mobel('rack', 35, 2, 2, 3, { dyn: true, main: true });
  mobel('rack', 30, 8, 1, 2, { dyn: true });
  // Sociala medier
  mobel('skrivbord', 39, 5, 3, 1, { dator: true, farg: '#3b5bdb', agare: 'facebook-agent' });
  mobel('skrivbord', 43, 5, 3, 1, { dator: true, farg: '#d6336c', agare: 'instagram-agent' });
  mobel('ringljus', 41, 8, 1, 1, { dyn: true });
  mobel('vaxt', 46, 2, 1, 1); mobel('soffa', 44, 9, 3, 1);
  // Öppna kontoret
  mobel('skrivbord', 2, 13, 3, 1, { dator: true, larare: true, agare: 'larare' });
  for (let i = 0; i < 4; i++) mobel('skrivbord', 8 + i * 4, 13, 3, 1, { dator: true, claude: i });
  mobel('klocka', 22, 11, 2, 1, { block: false, dyn: true });
  mobel('byggmaskin', 25, 13, 2, 2, { dyn: true });
  mobel('sluss', 29, 12, 4, 1, { dyn: true });
  mobel('sajtskarm', 35, 12, 6, 1, { dyn: true });
  mobel('vaxt', 1, 16, 1, 1); mobel('vaxt', 46, 16, 1, 1); mobel('vaxt', 46, 12, 1, 1);
  // Utvecklingslabbet
  mobel('whiteboard', 1, 18, 4, 1);
  mobel('skrivbord', 2, 21, 3, 1, { dator: true, agare: 'pedagog' });
  mobel('skrivbord', 7, 21, 3, 1, { ritbord: true, agare: 'grafik' });
  mobel('skrivbord', 12, 21, 3, 1, { dator: true, stor: true, agare: 'webbdesigner' });
  mobel('testbank', 4, 25, 4, 1, { dyn: true, agare: 'testare' });
  mobel('hylla', 11, 18, 5, 1); mobel('vaxt', 15, 27, 1, 1);
  // Bildateljén
  mobel('staffli', 19, 21, 1, 1, { dyn: true });
  mobel('fargbord', 17, 25, 2, 1);
  // Postrummet
  mobel('postfack', 23, 18, 3, 1);
  mobel('skrivbord', 23, 21, 3, 1, { dator: true, agare: 'nyhetsbrev' });
  mobel('skrivbord', 27, 21, 3, 1, { dator: true, headset: true, agare: 'svarsagent' });
  mobel('brevlada', 28, 26, 1, 1);
  // Mötesrummet
  mobel('motesbord', 32, 21, 5, 3);
  mobel('tavla', 35, 18, 3, 1, { dyn: true });
  mobel('vaxt', 37, 27, 1, 1);
  // Lounge
  mobel('kok', 39, 18, 3, 1);
  mobel('kaffe', 44, 18, 1, 1); mobel('kyl', 45, 18, 2, 1);
  mobel('soffa', 40, 25, 4, 1); mobel('matta', 40, 22, 4, 3, { block: false, farg: '#8a4f6a', rund: true });
  mobel('vaxt', 46, 27, 1, 1); mobel('pingis', 44, 22, 3, 2);

  // Platser som figurerna går till (ruta där figuren står + riktning).
  const PLATS = {
    nyhetsskarm: [3, 3, 'upp'], utgivareHylla: [15, 3, 'upp'], spraketHylla: [23, 3, 'upp'],
    main: [35, 5, 'upp'], rack: [31, 5, 'upp'], sluss: [30, 13, 'upp'], bygg: [26, 15, 'upp'],
    whiteboard: [3, 19, 'upp'], staffli: [19, 22, 'upp'], postfack: [24, 19, 'upp'],
    mote: [[31, 22, 'hoger'], [33, 20, 'ned'], [35, 20, 'ned'], [37, 22, 'vanster'], [33, 24, 'upp'], [35, 24, 'upp']],
    kaffe: [44, 19, 'upp'], soffa: [41, 24, 'ned'], studioLjus: [41, 7, 'ned'],
    sajt: [38, 13, 'upp'],
  };
  // Claudes platser i öppna kontoret, reservplatser i mötesrummet.
  const CLAUDE_PLATSER = [[9, 14, 'upp'], [13, 14, 'upp'], [17, 14, 'upp'], [21, 14, 'upp'], ...PLATS.mote];

  // =========================================================================
  // 3. Figurer
  // =========================================================================
  const AGENTER = {
    larare: { namn: 'Läraren', roll: 'Människan i loopen', hem: [3, 14, 'upp'],
      text: 'Ger uppdragen, bedömer resultatet och är den enda som skickar mejl, svarar besökare och trycker på skicka för nyhetsbrevet. Agenterna skriver utkast, läraren beslutar.',
      fakta: [['Arbetar', 'När det finns tid mellan lektionerna']],
      look: { hud: '#e7b98f', har: '#5b3a24', stil: 'kort', troja: '#3f7d5c', byxa: '#2e3440', skagg: true } },
    nyhetsagent: { namn: 'Nyhetsredaktören', roll: 'Dagens fysiknyhet', hem: [5, 6, 'upp'], fil: 'nyhetsagent.md', modell: 'Opus',
      text: 'Väcks av schemaläggaren varje natt. Letar dagens nyhet hos Phys.org, Nature, Physics World och Quanta, läser originalstudien och skriver en artikel för gymnasieelever på svenska.',
      look: { hud: '#f1c9a5', har: '#c0392b', stil: 'lang', troja: '#2f5d9e', byxa: '#2b2f3a', glasogon: false } },
    utgivare: { namn: 'Utgivaren', roll: 'Ansvarig utgivare', hem: [16, 6, 'upp'], fil: 'utgivare.md', modell: 'Sonnet',
      text: 'Oberoende slutgranskning innan en nyhet publiceras. Läser studiens sammanfattning och metoddel, kontrollerar varje siffra och varje citat och fäller GODKÄND, RÄTTA FÖRST eller STOPPAD.',
      look: { hud: '#d9a47c', har: '#dcdcdc', stil: 'flint', troja: '#3a3a4a', byxa: '#22222a', slips: '#b03a3a', glasogon: true } },
    korrekturlasare: { namn: 'Korrekturläsaren', roll: 'Språkgranskning', hem: [25, 7, 'upp'], fil: 'korrekturlasare.md', modell: 'Sonnet',
      text: 'Läser meningarna högt för sig själv: anglicismer, felböjda verb, personifierade döda ting och klichéer. Rättar aldrig fakta och ändrar aldrig något utan att först visa vad som ska bytas.',
      look: { hud: '#f3d2b3', har: '#8e5b2e', stil: 'knut', troja: '#8b5fbf', byxa: '#3a2f45', glasogon: true } },
    pedagog: { namn: 'Pedagogen', roll: 'Fysikgranskning', hem: [3, 22, 'upp'], fil: 'pedagog.md', modell: 'Sonnet',
      text: 'Fysiklärare i teamet. Granskar att fysiken stämmer i genomgångar, uppgifter och simuleringar, och att en gymnasieelev kan följa resonemanget.',
      look: { hud: '#c98e6a', har: '#2b2b2b', stil: 'kort', troja: '#f2f2f2', rock: true, byxa: '#34495e', glasogon: false } },
    grafik: { namn: 'Grafikern', roll: 'Figurer och scener', hem: [8, 22, 'upp'], fil: 'grafik.md', modell: 'Sonnet',
      text: 'Ritar figurer, kraftpilar och simuleringsscener i SVG, Canvas och Three.js, efter husets regler för etiketter, kurvor och vinkelbågar.',
      look: { hud: '#f0c8a0', har: '#e67e22', stil: 'lang', troja: '#16a085', byxa: '#2c3e50', basker: '#c0392b' } },
    webbdesigner: { namn: 'Webbdesignern', roll: 'Gränssnitt', hem: [13, 22, 'upp'], fil: 'webbdesigner.md', modell: 'Sonnet',
      text: 'Formger simuleringarnas gränssnitt: reglage, fullskärm, mobilvy och läsbarhet.',
      look: { hud: '#8d5a3b', har: '#1d1d1d', stil: 'lockar', troja: '#f1c40f', byxa: '#2d3436' } },
    testare: { namn: 'Testaren', roll: 'Kvalitetskontroll', hem: [6, 26, 'upp'], fil: 'testare.md', modell: 'Haiku',
      text: 'Provkör simuleringarna efter varje ändring och letar fel i fysik, gränssnitt och mobilvy.',
      look: { hud: '#f5d0b0', har: '#6d4c41', stil: 'keps', keps: '#27ae60', troja: '#95a5a6', byxa: '#34495e' } },
    'image-creator': { namn: 'Bildmakaren', roll: 'AI-bilder', hem: [19, 23, 'upp'], fil: 'image-creator.md', modell: 'Sonnet',
      text: 'Tar fram bilder med Googles Gemini när det inte finns någon fri bild att använda, till exempel till en nyhetsartikel.',
      look: { hud: '#e8b48a', har: '#7b1fa2', stil: 'lang', troja: '#ff8a65', byxa: '#4a4a4a', basker: '#222' } },
    nyhetsbrev: { namn: 'Nyhetsbrevsredaktören', roll: 'Veckobrevet', hem: [24, 22, 'upp'], fil: 'nyhetsbrev.md', modell: 'Molnrutin',
      text: 'Skriver veckans nyhetsbrev som en schemalagd rutin i molnet. Lägger upp ett utkast i EmailOctopus, men skickar aldrig något själv.',
      look: { hud: '#f6d5b8', har: '#f4d03f', stil: 'knut', troja: '#e67e22', byxa: '#5d4037' } },
    svarsagent: { namn: 'Svarsagenten', roll: 'Svar till besökare', hem: [28, 22, 'upp'], fil: 'svarsagent.md', modell: 'Opus',
      text: 'Skriver utkast till svar på mejl och på kommentarer i Facebook och Instagram. Publicerar aldrig något: utkastet går till läraren.',
      look: { hud: '#d7a27a', har: '#3e2723', stil: 'kort', troja: '#5c6bc0', byxa: '#263238', headset: true } },
    'facebook-agent': { namn: 'Facebook', roll: 'Kanalansvarig', hem: [40, 6, 'upp'], fil: 'facebook-agent.md', modell: 'Opus',
      text: 'Äger Facebooksidans riktlinjer. De dagliga inläggen (13.03 om dagens nyhet, 19.33 om nyheter på sajten) görs av schemalagda jobb som följer riktlinjerna.',
      look: { hud: '#f0c29a', har: '#34495e', stil: 'kort', troja: '#3b5bdb', byxa: '#1e2a4a' } },
    'instagram-agent': { namn: 'Instagram', roll: 'Kanalansvarig', hem: [44, 6, 'upp'], fil: 'instagram-agent.md', modell: 'Opus',
      text: 'Äger Instagramkontots riktlinjer. Inläggen går ut 13.18 och 19.48 som schemalagda jobb, ofta med en inspelad film ur simuleringen.',
      look: { hud: '#e9b995', har: '#111', stil: 'lang', troja: '#d6336c', byxa: '#3d1f3a' } },
    sitemap: { namn: 'Sitemap-roboten', roll: 'GitHub Actions', hem: [33, 8, 'ned'], robot: '#6aa7ff',
      text: 'Kör varje timme på GitHub. Bygger om RSS-flödet och webbplatskartan när en datumgrindad nyhet blir synlig, så att Google hittar den.' },
    vakt: { namn: 'SoMe-vakten', roll: 'Bevakning', hem: [45, 3, 'ned'], robot: '#5fd08a',
      text: 'Kontrollerar klockan 14 och 21 att dagens inlägg gått ut på Facebook och Instagram. Kör om jobb som fallit och larmar om det ändå saknas.' },
    servervakt: { namn: 'Servervakten', roll: 'Utvecklingsservern', hem: [34, 9, 'vanster'], robot: '#f0a04b',
      text: 'Tittar var femte minut att utvecklingsservern på datorn svarar, så att sidorna alltid kan provas innan de pushas.' },
  };
  const CLAUDE = {
    namn: 'Claude', roll: 'Huvudagent', fil: 'CLAUDE.md', modell: 'Opus',
    text: 'Tar emot lärarens uppdrag, läser projektets regler i CLAUDE.md och delegerar delar till specialisterna. Kör verifierarna, sparar och pushar till main. Flera Claude kan arbeta samtidigt i var sin session.',
    look: { hud: '#f2c7a2', har: '#6b3f2a', stil: 'kort', troja: '#d97757', byxa: '#3a2c2a' },
  };
  const HJALP = { namn: 'Hjälpagent', roll: 'Tillfällig agent', modell: 'Opus',
    text: 'En tillfällig agent som Claude skickar ut för en avgränsad utredning, till exempel att söka igenom kodbasen eller läsa in material, parallellt med huvudarbetet.',
    look: { hud: '#f2c7a2', har: '#6b3f2a', stil: 'kort', troja: '#e9a68a', byxa: '#5a4a48', liten: true } };
  const AGENT_FARG = {
    nyhetsagent: '#6aa7ff', utgivare: '#ef5f5f', korrekturlasare: '#b58cf0', pedagog: '#5fd08a', grafik: '#2ec4b6',
    webbdesigner: '#f1c40f', testare: '#95a5a6', 'image-creator': '#ff8a65', nyhetsbrev: '#e67e22', svarsagent: '#7c8cff',
    'facebook-agent': '#4c6ef5', 'instagram-agent': '#ff6fae', claude: '#e8845f', larare: '#6fcf97', hjalp: '#e9a68a',
    sitemap: '#6aa7ff', vakt: '#5fd08a', servervakt: '#f0a04b', 'general-purpose': '#e9a68a',
  };

  const figurer = [];
  function tileCenter(tx, ty) { return { x: tx * T + T / 2, y: ty * T + T - 3 }; }
  function skapaFigur(id, def, plats, extra) {
    const p = tileCenter(plats[0], plats[1]);
    const f = Object.assign({
      id, def, namn: def.namn, x: p.x, y: p.y, dir: plats[2] || 'ned', hem: plats, ko: [], cur: null, vag: null,
      bubbla: null, status: '', synlig: true, fas: Math.random() * 10, ledigSedan: 0, alpha: 1, poff: 0,
    }, extra || {});
    figurer.push(f);
    return f;
  }
  const F = {};
  function nollstallFigurer() {
    figurer.length = 0;
    for (const k of Object.keys(F)) delete F[k];
    for (const [id, def] of Object.entries(AGENTER)) F[id] = skapaFigur(id, def, def.hem);
  }

  // =========================================================================
  // 4. Vägplanering (A* i rutnätet)
  // =========================================================================
  function ledig(x, y) { return x >= 0 && y >= 0 && x < COLS && y < ROWS && grid[y][x] === 0; }
  function narmasteLediga(x, y) {
    if (ledig(x, y)) return [x, y];
    for (let r = 1; r < 6; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (ledig(x + dx, y + dy)) return [x + dx, y + dy];
    return [x, y];
  }
  function hittaVag(sx, sy, mx, my) {
    [mx, my] = narmasteLediga(mx, my);
    [sx, sy] = narmasteLediga(sx, sy);
    const key = (x, y) => y * COLS + x;
    const oppna = [[sx, sy]], fran = new Map(), g = new Map([[key(sx, sy), 0]]);
    const f = new Map([[key(sx, sy), Math.abs(sx - mx) + Math.abs(sy - my)]]);
    const stangd = new Set();
    let varv = 0;
    while (oppna.length && varv++ < 4000) {
      let bi = 0;
      for (let i = 1; i < oppna.length; i++) if (f.get(key(...oppna[i])) < f.get(key(...oppna[bi]))) bi = i;
      const [cx, cy] = oppna.splice(bi, 1)[0];
      if (cx === mx && cy === my) {
        const v = [[cx, cy]]; let k = key(cx, cy);
        while (fran.has(k)) { const p = fran.get(k); v.unshift(p); k = key(...p); }
        return v;
      }
      stangd.add(key(cx, cy));
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, ny = cy + dy;
        if (!ledig(nx, ny) || stangd.has(key(nx, ny))) continue;
        const ng = g.get(key(cx, cy)) + 1;
        if (ng < (g.has(key(nx, ny)) ? g.get(key(nx, ny)) : Infinity)) {
          fran.set(key(nx, ny), [cx, cy]); g.set(key(nx, ny), ng);
          f.set(key(nx, ny), ng + Math.abs(nx - mx) + Math.abs(ny - my));
          if (!oppna.some(o => o[0] === nx && o[1] === ny)) oppna.push([nx, ny]);
        }
      }
    }
    return [[mx, my]];
  }

  // =========================================================================
  // 5. Handlingar
  // =========================================================================
  const GANG = 62;                // världspixlar per sekund
  let fart = 1;                   // uppspelningshastighet
  let simT = 0;                   // sekunder efter midnatt
  let realNu = 0;

  function ga(f, plats, dir, amb) { f.ko.push({ a: 'ga', tx: plats[0], ty: plats[1], dir: dir || plats[2], amb }); }
  function saga(f, text, ms, farg, amb) { f.ko.push({ a: 'saga', text, ms: ms || 1900, farg, amb }); }
  function arbeta(f, tillSim, text, minMs) { f.ko.push({ a: 'arbeta', till: tillSim, text, minMs: minMs || 900 }); }
  function gor(f, fn) { f.ko.push({ a: 'gor', fn }); }
  function vanta(f, ms) { f.ko.push({ a: 'vanta', ms }); }
  function forsvinn(f) { f.ko.push({ a: 'forsvinn' }); }
  function status(f, text) { gor(f, () => { f.status = text; }); }
  function bubbla(f, text, ms, farg) { f.bubbla = { text, till: realNu + Math.max((ms || 2200) / 1000 / fart, lasTid(text)), farg }; }
  // Pratbubblan står kvar så länge att publiken hinner läsa den (visas på
  // projektor): minst 4 s verklig tid, längre för långa repliker. Handlingen
  // i kön tar inte lika lång tid; bubblan dröjer bara kvar. Vid hög
  // uppspelningsfart kortas dröjet så att bubblorna inte hopar sig.
  function lasTid(text) { return Math.max(4, 2.2 + 0.075 * String(text).length) / Math.max(1, fart / 2); }

  function startaHandling(f, h) {
    f.cur = h; h.start = realNu;
    // En figur med lång kö arbetar ikapp: allt går fortare tills kön krympt.
    h.k = fart * (1 + Math.min(3, Math.max(0, f.ko.filter(x => !x.amb).length - 1) * 0.6));
    if (h.a === 'ga') {
      const sx = Math.floor(f.x / T), sy = Math.floor(f.y / T);
      f.vag = hittaVag(sx, sy, h.tx, h.ty).slice(1).map(([x, y]) => tileCenter(x, y));
      if (!f.vag.length) f.vag = [tileCenter(...narmasteLediga(h.tx, h.ty))];
    } else if (h.a === 'saga') {
      f.bubbla = { text: h.text, till: realNu + Math.max(h.ms / 1000 / h.k, lasTid(h.text)), farg: h.farg };
    } else if (h.a === 'arbeta') {
      if (h.text) f.status = h.text;
    }
  }
  function uppdateraFigur(f, dt) {
    if (!f.cur && f.ko.length) startaHandling(f, f.ko.shift());
    const h = f.cur;
    f.gar = false;
    if (!h) {
      if (!f.ledigSedan) f.ledigSedan = realNu;
      const hemP = tileCenter(f.hem[0], f.hem[1]);
      const hemma = Math.abs(f.x - hemP.x) < 1 && Math.abs(f.y - hemP.y) < 1;
      if (f.tillfallig && realNu - f.ledigSedan > 1.2 / fart && !f.vantarPaSlut) { forsvinn(f); return; }
      if (!hemma && realNu - f.ledigSedan > 1.4 / fart) { ga(f, f.hem, null, true); f.status = ''; return; }
      if (hemma) { f.dir = f.hem[2] || f.dir; if (!f.tillfallig && !f.vantarPaSlut) f.status = ''; }
      // Kaffe ibland, när det är dag och lugnt.
      if (hemma && !f.def.robot && f.id !== 'larare' && !f.tillfallig && dagtid() && Math.random() < dt * 0.004 * fart) {
        ga(f, [PLATS.kaffe[0] + Math.floor(Math.random() * 3) - 1, PLATS.kaffe[1] + 1, 'upp'], null, true);
        saga(f, 'Kaffe', 1300, null, true);
      }
      return;
    }
    f.ledigSedan = 0;
    if (h.a === 'ga') {
      let steg = GANG * h.k * dt;
      while (steg > 0 && f.vag.length) {
        const m = f.vag[0], dx = m.x - f.x, dy = m.y - f.y, d = Math.hypot(dx, dy);
        if (Math.abs(dx) > Math.abs(dy)) f.dir = dx > 0 ? 'hoger' : 'vanster'; else if (d > 0.01) f.dir = dy > 0 ? 'ned' : 'upp';
        if (d <= steg) { f.x = m.x; f.y = m.y; f.vag.shift(); steg -= d; }
        else { f.x += dx / d * steg; f.y += dy / d * steg; steg = 0; }
      }
      f.gar = true;
      if (!f.vag.length) { if (h.dir) f.dir = h.dir; f.cur = null; }
    } else if (h.a === 'saga') {
      if (realNu - h.start >= 1.5 * h.ms / 1000 / h.k) f.cur = null;
    } else if (h.a === 'vanta') {
      if (realNu - h.start >= h.ms / 1000 / h.k) f.cur = null;
    } else if (h.a === 'arbeta') {
      f.arbetar = true;
      if (simT >= h.till && realNu - h.start >= h.minMs / 1000 / h.k) { f.arbetar = false; f.cur = null; }
    } else if (h.a === 'gor') {
      f.cur = null; h.fn();
    } else if (h.a === 'forsvinn') {
      f.poff = 1; f.cur = null; f.borta = true;
    }
  }

  // =========================================================================
  // 6. Effekter i kontoret
  // =========================================================================
  const effekt = {
    sluss: null,          // { lampor:[{namn, till, fel}], start }
    bygg: 0,              // realtid då maskinen slutar snurra
    main: 0,              // realtid då main blinkar
    sajt: 0, sajtText: '',
    klocka: 0,            // schemaläggaren ringer
    larm: 0,
    staffli: 0, ringljus: 0, tavla: 0,
    paket: [],            // flygande commit-paket
  };

  // =========================================================================
  // 7. Uppspelning
  // =========================================================================
  let dagId = null, handelser = [], nasta = 0, spelar = true;
  let kpi = null;
  const sessioner = new Map();   // sess -> { figur, jobb, rubrik }
  const loggRader = [];

  function dagtid() { const h = simT / 3600; return h > 7 && h < 18.5; }

  function slaIhop(h) {
    // Flera verifierarkörningar i rad i samma session blir ett besök vid slussen.
    const ut = [];
    for (const e of h) {
      const f = ut[ut.length - 1];
      if (e.typ === 'verifiera') {
        let prev = null;
        for (let i = ut.length - 1; i >= 0; i--) { if (ut[i].sess === e.sess) { prev = ut[i]; break; } }
        if (prev && prev.typ === 'verifiera' && e.s - prev.sSist < 240) {
          prev.korningar.push({ skript: e.skript, fel: e.fel }); prev.sSist = e.s; continue;
        }
        ut.push({ ...e, korningar: [{ skript: e.skript, fel: e.fel }], sSist: e.s });
        continue;
      }
      if (e.typ === 'webblasare' && f && f.sess === e.sess && f.typ === 'webblasare') continue;
      ut.push(e);
    }
    return ut;
  }

  function valjDag(id) {
    dagId = id;
    const d = DATA.dagar[id];
    handelser = slaIhop((d && d.h) || []);
    hoppa(0, true);
    uppdateraTidslinje();
  }

  function tomKpi() { return { nyheter: 0, utgivare: 0, delegeringar: 0, verifieringar: 0, roda: 0, commits: 0, pushar: 0, inlagg: 0 }; }

  function hoppa(s, fran0) {
    simT = s;
    nollstallFigurer();
    sessioner.clear();
    loggRader.length = 0;
    kpi = tomKpi();
    effekt.sluss = null; effekt.paket.length = 0;
    // Räkna ikapp: resultat och logg för allt som redan hänt, och sessioner
    // som pågår vid den valda tiden får sin figur på plats direkt.
    nasta = 0;
    const pagar = new Map();
    while (nasta < handelser.length && handelser[nasta].s < s) {
      const e = handelser[nasta++];
      raknaKpi(e);
      const r = loggText(e);
      if (r) loggRader.push(r);
      if (e.sess) {
        if (e.typ === 'start') pagar.set(e.sess, e);
        else if (e.typ === 'slut') pagar.delete(e.sess);
        else if (!pagar.has(e.sess)) pagar.set(e.sess, { sess: e.sess, jobb: 'uppdrag', rubrik: 'Uppdrag från läraren' });
      }
    }
    for (const e of pagar.values()) oppnaSession(e, true);
    ritaLogg(true); ritaKpi(); ritaJustNu();
  }

  function raknaKpi(e) {
    if (!kpi) return;
    if (e.typ === 'slut' && e.jobb === 'nyhet') kpi.nyheter++;
    if (e.typ === 'slut' && /^(fb|ig)-/.test(e.jobb) && e.varaktighet > 90) kpi.inlagg++;
    if (e.typ === 'delegera' || e.typ === 'hjalp') kpi.delegeringar++;
    if (e.typ === 'delegera' && e.agent === 'utgivare') kpi.utgivare++;
    if (e.typ === 'verifiera') for (const k of e.korningar) { kpi.verifieringar += k.skript.length; if (k.fel) kpi.roda++; }
    if (e.typ === 'commit' || e.typ === 'nyhetsbrev' || e.typ === 'moln' || e.typ === 'robot') kpi.commits++;
    if (e.typ === 'push') kpi.pushar++;
  }

  // ---- Sessioner --------------------------------------------------------
  function sessionsFigur(e) {
    const s = sessioner.get(e.sess);
    if (s) return s.figur;
    return oppnaSession({ sess: e.sess, jobb: 'uppdrag', rubrik: 'Uppdrag från läraren' }, true).figur;
  }
  function ledigClaudePlats() {
    const upptagna = new Set(figurer.filter(f => f.claude && !f.borta).map(f => f.hem.join(',')));
    for (const p of CLAUDE_PLATSER) if (!upptagna.has(p.join(','))) return p;
    return CLAUDE_PLATSER[Math.floor(Math.random() * CLAUDE_PLATSER.length)];
  }
  function oppnaSession(e, direkt) {
    let figur;
    const j = e.jobb;
    if (j === 'nyhet') figur = F.nyhetsagent;
    else if (/^fb-/.test(j)) figur = F['facebook-agent'];
    else if (/^ig-/.test(j)) figur = F['instagram-agent'];
    else if (j === 'some-rapport') figur = F['facebook-agent'];
    else {
      const plats = ledigClaudePlats();
      const n = figurer.filter(f => f.claude && !f.borta).length;
      figur = skapaFigur('claude-' + e.sess, CLAUDE, plats, { claude: true, tillfallig: true, vantarPaSlut: true, namn: n ? 'Claude ' + (n + 1) : 'Claude' });
      if (!direkt) { figur.poff = 1; }
    }
    const s = { figur, jobb: j, rubrik: e.rubrik };
    sessioner.set(e.sess, s);
    figur.status = e.rubrik || '';
    figur.vantarPaSlut = true;   // behåller sin status tills sessionen är slut
    if (direkt) return s;

    if (j === 'uppdrag') {
      const L = F.larare;
      ga(L, [figur.hem[0], figur.hem[1] + 1, 'upp']);
      saga(L, e.rubrik === 'Uppdrag från läraren' ? 'Jag har ett nytt uppdrag till dig' : 'Nytt uppdrag: ' + e.rubrik, 2600, '#3f7d5c');
      gor(L, () => bubbla(figur, 'Jag tar det!', 1500));
      vanta(L, 500);
      ga(L, L.hem);
    } else {
      effekt.klocka = realNu + 2.6 / fart;
      const vad = j === 'nyhet' ? 'Dags för dagens fysiknyhet' : /lansering/.test(j) ? 'Dags att berätta om nytt på sajten' : j === 'some-rapport' ? 'Dags för månadsrapporten' : 'Dags för dagens inlägg';
      saga(figur, vad, 2000);
      if (/^(fb|ig)-/.test(j)) { ga(figur, PLATS.studioLjus); gor(figur, () => { effekt.ringljus = realNu + 3 / fart; }); }
    }
    return s;
  }
  function stangSession(e) {
    const s = sessioner.get(e.sess);
    if (!s) return;
    sessioner.delete(e.sess);
    const f = s.figur;
    const klar = () => gor(f, () => { f.vantarPaSlut = false; f.status = ''; });
    if (e.jobb === 'nyhet') {
      ga(f, f.hem); saga(f, 'Dagens nyhet är publicerad!', 2200, '#2f5d9e'); klar();
    } else if (/^(fb|ig)-/.test(e.jobb)) {
      if (e.varaktighet > 90) saga(f, e.jobb[0] === 'f' ? 'Inlägget är ute på Facebook' : 'Inlägget är ute på Instagram', 2000);
      else saga(f, 'Jobbet avbröts', 2000, '#b03a3a');
      ga(f, f.hem); klar();
    } else {
      saga(f, 'Klart!', 1300); klar();
    }
  }

  // ---- Varje händelsetyp ------------------------------------------------
  const HEM_BORD = id => { const h = AGENTER[id] && AGENTER[id].hem; return h ? [h[0], h[1] + 1, 'upp'] : [24, 15, 'upp']; };

  function utfor(e) {
    raknaKpi(e);
    const rad = loggText(e);
    if (rad) loggRader.push(rad);
    switch (e.typ) {
      case 'start': oppnaSession(e); break;
      case 'slut': stangSession(e); break;
      case 'kalla': {
        const f = sessionsFigur(e);
        if (f === F.nyhetsagent) { ga(f, PLATS.nyhetsskarm); saga(f, 'Läser nyhetsflödena', 1600); }
        else saga(f, 'Läser källor på nätet', 1400);
        status(f, 'Läser källor');
        break;
      }
      case 'webblasare': {
        const f = sessionsFigur(e);
        saga(f, /agent$/.test(f.id) ? 'Loggar in och skriver inlägget' : 'Provar sidan i webbläsaren', 1400);
        break;
      }
      case 'delegera': delegera(e); break;
      case 'hjalp': hjalp(e); break;
      case 'verifiera': verifiera(e); break;
      case 'bygg': {
        const f = sessionsFigur(e);
        ga(f, PLATS.bygg);
        gor(f, () => { effekt.bygg = realNu + 2.2 / fart; });
        saga(f, 'Bygger ' + e.vad, 1700);
        break;
      }
      case 'bild': {
        const f = sessionsFigur(e);
        ga(f, [PLATS.staffli[0] - 1, PLATS.staffli[1] + 1, 'hoger']);
        gor(f, () => { effekt.staffli = realNu + 3 / fart; bubbla(F['image-creator'], 'Fin motiv!', 1500); });
        saga(f, 'Genererar en bild med Gemini', 1800);
        break;
      }
      case 'commit': {
        const f = sessionsFigur(e);
        saga(f, 'Sparar: ' + e.text, 2200, '#8a5a36');
        gor(f, () => { f.paket = true; });
        break;
      }
      case 'push': {
        const f = sessionsFigur(e);
        ga(f, PLATS.main);
        gor(f, () => { f.paket = false; effekt.main = realNu + 2 / fart; effekt.sajt = realNu + 4 / fart; effekt.sajtText = 'uppdaterad ' + tid(simT); });
        saga(f, 'Pushar till main', 1400, '#c0392b');
        break;
      }
      case 'skill': {
        const f = sessionsFigur(e);
        const namn = { 'brev-till-octopus': 'Lägger upp nyhetsbrevet i EmailOctopus', 'granska-fysik': 'Kör fysikgranskningen', 'ny-simulering': 'Följer receptet för ny simulering', 'some-rapport': 'Skriver månadsrapporten' }[e.namn] || ('Följer instruktionen ' + e.namn);
        if (e.namn === 'brev-till-octopus') ga(f, PLATS.postfack);
        saga(f, namn, 1800);
        break;
      }
      case 'vakt': {
        const V = F.vakt;
        if (e.larm) { effekt.larm = realNu + 5 / fart; saga(V, 'LARM: ' + e.text, 3200, '#b03a3a'); }
        else { saga(V, e.text, 1800); }
        break;
      }
      case 'robot': {
        const R = F.sitemap;
        ga(R, PLATS.rack); saga(R, 'Bygger om RSS och sitemap', 1800); ga(R, PLATS.main);
        gor(R, () => { effekt.main = realNu + 2 / fart; effekt.sajt = realNu + 3 / fart; effekt.sajtText = 'nytt flöde ' + tid(simT); });
        break;
      }
      case 'nyhetsbrev': case 'moln': {
        const f = e.typ === 'nyhetsbrev' ? F.nyhetsbrev : skapaFigur('moln-' + e.s, CLAUDE, [33, 12, 'ned'], { tillfallig: true, namn: 'Claude i molnet', poff: 1 });
        if (e.typ === 'nyhetsbrev') { ga(f, PLATS.postfack); saga(f, e.text, 2400); }
        else saga(f, e.text, 2400);
        ga(f, PLATS.main);
        gor(f, () => { effekt.main = realNu + 2 / fart; effekt.sajt = realNu + 4 / fart; effekt.sajtText = 'uppdaterad ' + tid(simT); });
        break;
      }
    }
    ritaLogg(); ritaKpi();
  }

  function delegera(e) {
    const f = sessionsFigur(e);
    const agentId = e.agent;
    const A = F[agentId] || F[agentId + '-agent'];
    if (!A) { saga(f, e.text, 1800); return; }
    const kort = e.text || 'Kan du titta på det här?';
    ga(f, [A.hem[0] + (A.hem[0] > 40 ? -1 : 1), A.hem[1], A.hem[0] > 40 ? 'hoger' : 'vanster']);
    saga(f, kort, 2300);
    gor(f, () => {
      A.status = kort;
      A.ko.length = 0;
      bubbla(A, 'Jag tar det', 1400);
      const arbetsplats = { pedagog: PLATS.whiteboard, utgivare: PLATS.utgivareHylla, korrekturlasare: PLATS.spraketHylla }[agentId];
      if (arbetsplats) ga(A, arbetsplats);
      arbeta(A, e.s + e.dur, kort, 1600);
      if (arbetsplats) ga(A, A.hem);
      // Resultatet lämnas till den som frågade. Svarsagentens utkast går
      // dessutom till läraren, som är den enda som skickar.
      const mottagare = agentId === 'svarsagent' ? F.larare : f;
      gor(A, () => {
        // Dit mottagaren är just nu, inte till dess skrivbord.
        const mx = Math.floor(mottagare.x / T), my = Math.floor(mottagare.y / T);
        const [lx, ly] = ledig(mx + 1, my) ? [mx + 1, my] : ledig(mx - 1, my) ? [mx - 1, my] : ledig(mx, my + 1) ? [mx, my + 1] : [mx, my - 1];
        A.ko.unshift({ a: 'ga', tx: lx, ty: ly, dir: lx > mx ? 'vanster' : lx < mx ? 'hoger' : ly > my ? 'upp' : 'ned' });
      });
      let svar = 'Klart, här är min granskning';
      let farg;
      if (agentId === 'utgivare') { svar = e.utslag ? 'Utslag: ' + e.utslag : 'Granskningen är klar'; farg = e.utslag === 'GODKÄND' ? '#1e8449' : e.utslag ? '#b03a3a' : undefined; }
      if (agentId === 'svarsagent') svar = 'Här är ett utkast. Du skickar.';
      if (agentId === 'korrekturlasare') svar = 'Språket är granskat';
      if (agentId === 'pedagog') svar = 'Fysiken är granskad';
      if (agentId === 'grafik') svar = 'Figurerna är klara';
      saga(A, svar, 2300, farg);
      gor(A, () => {
        const r = { s: simT, text: `${A.namn}: ${svar.replace(/^Utslag: /, '')}`, farg: AGENT_FARG[agentId] };
        loggRader.push(r); ritaLogg();
      });
      ga(A, A.hem);
    });
    ga(f, f.hem);
    status(f, 'Väntar på ' + A.namn.toLowerCase());
  }

  // Hjälpagenterna sätter sig i mötesrummet och, när det är fullt, i loungen.
  const HJALP_PLATSER = [...PLATS.mote, [32, 25, 'upp'], [36, 25, 'upp'], [40, 20, 'upp'], [42, 23, 'ned'], [44, 25, 'upp'], [41, 26, 'upp'], [45, 21, 'ned']];
  function hjalp(e) {
    const f = sessionsFigur(e);
    const hx = Math.floor(f.x / T), hy = Math.floor(f.y / T);
    const upptagna = new Set(figurer.filter(x => x.def === HJALP && !x.borta && x.malPlats).map(x => x.malPlats.join(',')));
    const plats = HJALP_PLATSER.find(p => !upptagna.has(p.join(','))) || HJALP_PLATSER[Math.floor(Math.random() * HJALP_PLATSER.length)];
    const H1 = skapaFigur('hjalp-' + e.s + '-' + Math.random(), HJALP, [hx, hy, 'ned'], { tillfallig: true, vantarPaSlut: true, poff: 1, status: e.text, malPlats: plats });
    // Flera hjälpagenter i en skur: Claude säger det bara en gång.
    if (!f.senastHjalp || e.s - f.senastHjalp > 90) saga(f, 'Hjälpagent: ' + e.text, 1800);
    else bubbla(H1, e.text, 1600);
    f.senastHjalp = e.s;
    ga(H1, plats);
    arbeta(H1, e.s + e.dur, e.text, 1500);
    ga(H1, [hx, hy + 1, 'upp']);
    saga(H1, 'Klart!', 1100);
    gor(H1, () => { H1.vantarPaSlut = false; H1.malPlats = null; });
  }

  function verifiera(e) {
    const f = sessionsFigur(e);
    ga(f, PLATS.sluss);
    gor(f, () => {
      const lampor = [];
      let t = realNu;
      for (const k of e.korningar) {
        k.skript.forEach((namn, i) => {
          const fel = k.fel && i === k.skript.length - 1;
          lampor.push({ namn, tand: t + (i + 1) * 0.28 / fart, fel });
        });
        t += (k.skript.length + 2) * 0.28 / fart;
      }
      effekt.sluss = { lampor, slut: t + 1.6 / fart };
    });
    const antal = e.korningar.reduce((n, k) => n + k.skript.length, 0);
    const roda = e.korningar.filter(k => k.fel).length;
    vanta(f, Math.min(4000, 300 + antal * 280));
    if (roda) {
      const rattat = !e.korningar[e.korningar.length - 1].fel;
      saga(f, rattat ? 'Rött först, rättat och grönt nu' : 'Rött! Måste rätta', 1800, rattat ? '#1e8449' : '#b03a3a');
    } else saga(f, antal > 1 ? `${antal} kontroller, alla gröna` : 'Grönt', 1300, '#1e8449');
  }

  // ---- Loggtext ---------------------------------------------------------
  function sessNamn(e) {
    const s = sessioner.get(e.sess);
    return s ? s.figur.namn : 'Claude';
  }
  function loggText(e) {
    const f = AGENT_FARG;
    switch (e.typ) {
      case 'start':
        if (e.jobb === 'nyhet') return { s: e.s, text: 'Schemaläggaren väcker nyhetsredaktören', farg: f.nyhetsagent };
        if (/^fb-/.test(e.jobb)) return { s: e.s, text: 'Schemalagt jobb: ' + e.rubrik, farg: f['facebook-agent'] };
        if (/^ig-/.test(e.jobb)) return { s: e.s, text: 'Schemalagt jobb: ' + e.rubrik, farg: f['instagram-agent'] };
        return { s: e.s, text: e.rubrik === 'Uppdrag från läraren' ? 'Läraren ger Claude ett nytt uppdrag' : 'Läraren ger Claude ett uppdrag: ' + e.rubrik, farg: f.larare };
      case 'slut':
        if (e.jobb === 'nyhet') return { s: e.s, text: 'Dagens nyhet är publicerad', farg: f.nyhetsagent };
        if (/^(fb|ig)-/.test(e.jobb)) return { s: e.s, text: e.varaktighet > 90 ? (e.jobb[0] === 'f' ? 'Inlägget är ute på Facebook' : 'Inlägget är ute på Instagram') : 'Jobbet för ' + (e.jobb[0] === 'f' ? 'Facebook' : 'Instagram') + ' avbröts', farg: e.varaktighet > 90 ? f[e.jobb[0] === 'f' ? 'facebook-agent' : 'instagram-agent'] : '#ef5f5f' };
        return null;
      case 'delegera': {
        const A = AGENTER[e.agent] || AGENTER[e.agent + '-agent'];
        return { s: e.s, text: `${sessNamn(e)} ber ${A ? A.namn.toLowerCase() : e.agent}: ${e.text}`, farg: f[e.agent] || '#ccc' };
      }
      case 'hjalp': return { s: e.s, text: `${sessNamn(e)} skickar ut en hjälpagent: ${e.text}`, farg: f.hjalp };
      case 'verifiera': {
        const antal = e.korningar.reduce((n, k) => n + k.skript.length, 0);
        const roda = e.korningar.filter(k => k.fel).length;
        return { s: e.s, text: `Verifieringsslussen: ${antal} ${antal === 1 ? 'kontroll' : 'kontroller'}${roda ? `, ${roda} röd${roda > 1 ? 'a' : ''}` : ', alla gröna'}`, farg: roda ? '#ef5f5f' : '#5fd08a' };
      }
      case 'bygg': return { s: e.s, text: 'Bygger ' + e.vad, farg: '#c9a173' };
      case 'bild': return { s: e.s, text: 'En bild genereras med Gemini', farg: f['image-creator'] };
      case 'commit': return { s: e.s, text: 'Sparar: ' + e.text, farg: '#c9a173' };
      case 'push': return { s: e.s, text: 'Pushar till main, sajten uppdateras', farg: '#f0a04b' };
      case 'skill': return { s: e.s, text: `${sessNamn(e)} följer instruktionen ${e.namn}`, farg: '#b58cf0' };
      case 'vakt': return { s: e.s, text: (e.larm ? 'LARM: ' : 'SoMe-vakten: ') + e.text, farg: e.larm ? '#ef5f5f' : f.vakt };
      case 'robot': return { s: e.s, text: 'Sitemap-roboten: ' + e.text, farg: f.sitemap };
      case 'nyhetsbrev': return { s: e.s, text: 'Nyhetsbrevsrutinen i molnet: ' + e.text, farg: f.nyhetsbrev };
      case 'moln': return { s: e.s, text: 'Claude i molnet: ' + e.text, farg: f.claude };
      case 'kalla': return sessioner.get(e.sess) && sessioner.get(e.sess).jobb === 'nyhet' ? { s: e.s, text: 'Nyhetsredaktören läser källor', farg: f.nyhetsagent } : null;
      default: return null;
    }
  }

  // =========================================================================
  // 8. Rita världen
  // =========================================================================
  const bg = document.createElement('canvas'); bg.width = W; bg.height = H;
  const varld = document.createElement('canvas'); varld.width = W; varld.height = H;
  const bx = bg.getContext('2d'), vx = varld.getContext('2d');

  function rect(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }

  function ritaGolv(c) {
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const g = golvTyp[y][x]; if (!g) continue;
      const px = x * T, py = y * T, r = hash(x, y);
      if (g === 'tra' || g === 'dorr' || g === 'ljustTra') {
        const lj = g !== 'tra';
        const a = lj ? P.ljustTra1 : P.tra1, b = lj ? P.ljustTra2 : P.tra2, fog = lj ? P.ljustTraFog : P.traFog;
        for (let i = 0; i < 4; i++) {
          rect(c, px, py + i * 4, T, 4, (hash(x + i * 7, y) > 0.5) ? a : b);
          rect(c, px, py + i * 4 + 3, T, 1, fog);
          const skarv = Math.floor(hash(x * 3 + i, y * 5) * 16);
          if ((x + i) % 3 === 0) rect(c, px + skarv, py + i * 4, 1, 3, fog);
        }
        if (!lj && r > 0.93) rect(c, px + 5, py + 6, 2, 1, P.tra3);
      } else if (g === 'rod' || g === 'gron' || g === 'teal') {
        const a = P[g + 'Matta'] || P[g], b = P[g + 'Matta2'] || P[g + '2'];
        rect(c, px, py, T, T, a);
        for (let i = 0; i < T; i += 4) for (let j = 0; j < T; j += 4) if ((i + j) % 8 === 0) rect(c, px + i, py + j, 2, 2, b);
      } else if (g === 'metall') {
        rect(c, px, py, T, T, (x + y) % 2 ? P.metall : P.metall2);
        rect(c, px, py, T, 1, P.metallFog); rect(c, px, py, 1, T, P.metallFog);
        rect(c, px + 3, py + 3, 1, 1, '#6d7480'); rect(c, px + 12, py + 12, 1, 1, '#6d7480');
      } else if (g === 'lila') {
        rect(c, px, py, T, T, P.lila); if (r > 0.6) rect(c, px + Math.floor(r * 12), py + Math.floor(r * 30) % 14, 2, 1, P.lila2);
      } else if (g === 'linoleum') {
        rect(c, px, py, T, T, (x + y) % 2 ? P.linoleum : P.linoleum2);
      } else if (g === 'kakel') {
        rect(c, px, py, T, T, P.kakel); rect(c, px, py + 7, T, 1, P.kakel2); rect(c, px + 7, py, 1, T, P.kakel2);
      } else if (g === 'schack') {
        rect(c, px, py, 8, 8, P.schack1); rect(c, px + 8, py, 8, 8, P.schack2); rect(c, px, py + 8, 8, 8, P.schack2); rect(c, px + 8, py + 8, 8, 8, P.schack1);
      }
    }
    // Färgstänk i ateljén
    const stank = ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#2ecc71'];
    for (let i = 0; i < 14; i++) rect(c, 17 * T + hash(i, 1) * 80, 18 * T + hash(i, 2) * 150, 2, 2, stank[i % 5]);
  }

  function ritaVaggar(c) {
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 1) continue;
      const px = x * T, py = y * T;
      const golvUnder = y + 1 < ROWS && grid[y + 1][x] !== 1;
      rect(c, px, py, T, T, P.vaggTopp);
      rect(c, px, py, T, 2, P.vaggKant);
      if (golvUnder) {
        // Väggens framsida mot rummet under, med list.
        rect(c, px, py + 5, T, 11, y <= 1 ? P.vaggFront : P.vaggFrontMork);
        rect(c, px, py + 14, T, 2, P.list);
      }
    }
    // Ytterväggen: en rad till framsida (y = 1) med fönster.
    for (let x = 1; x < COLS - 1; x++) {
      if (grid[2][x] === 1) continue;
      const px = x * T;
      rect(c, px, T, T, T, P.vaggFront); rect(c, px, T * 2 - 2, T, 2, P.list);
    }
  }

  // Fönster: dynamiska (himlen följer klockan).
  const FONSTER = [];
  for (const r of RUM) if (r.y === 2) for (let x = r.x + 1; x < r.x + r.w - 1; x += 3) FONSTER.push(x);

  function ritaHimmel(c) {
    const h = simT / 3600;
    let himmel = '#86c5ec';
    if (h < 5 || h > 21.5) himmel = '#141a3a'; else if (h < 7) himmel = '#e7a36b'; else if (h > 19.5) himmel = '#d9855f';
    for (const x of FONSTER) {
      if (golvTyp[2][x] == null || MOBLER.some(m => m.y === 2 && x >= m.x && x < m.x + m.w && (m.typ === 'hylla' || m.typ === 'nyhetsskarm' || m.typ === 'arkivskap' || m.typ === 'rack'))) continue;
      const px = x * T + 2, py = T + 2;
      rect(c, px - 1, py - 1, 14, 11, '#4a372c');
      rect(c, px, py, 12, 9, himmel);
      if (himmel === '#141a3a') { rect(c, px + 3, py + 2, 1, 1, '#fff'); rect(c, px + 8, py + 5, 1, 1, '#cfd8ff'); }
      else rect(c, px + 1, py + 1, 3, 1, 'rgba(255,255,255,.55)');
      rect(c, px + 5, py, 1, 9, '#4a372c');
    }
  }

  // ---- Möbler -------------------------------------------------------------
  function ritaMobel(c, m, dyn) {
    const px = m.x * T, py = m.y * T, w = m.w * T, h = m.h * T;
    switch (m.typ) {
      case 'matta':
        if (m.rund) { c.fillStyle = m.farg; c.beginPath(); c.ellipse(px + w / 2, py + h / 2, w / 2, h / 2, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 1; c.beginPath(); c.ellipse(px + w / 2, py + h / 2, w / 2 - 4, h / 2 - 4, 0, 0, 7); c.stroke(); }
        else { rect(c, px, py, w, h, m.farg); rect(c, px + 2, py + 2, w - 4, 1, 'rgba(255,255,255,.2)'); rect(c, px + 2, py + h - 3, w - 4, 1, 'rgba(255,255,255,.2)'); }
        break;
      case 'skrivbord': {
        const topp = m.farg || P.bord;
        rect(c, px, py + 3, w, 10, topp === P.bord ? P.bord : topp);
        rect(c, px, py + 3, w, 2, m.farg ? 'rgba(255,255,255,.25)' : P.bordLjus);
        rect(c, px, py + 12, w, 4, P.bordMork);
        rect(c, px + 1, py + 15, 2, 1, '#2a1a10'); rect(c, px + w - 3, py + 15, 2, 1, '#2a1a10');
        if (m.dator) {
          const sw = m.stor ? 18 : 12, sx = px + w / 2 - sw / 2;
          rect(c, sx, py - 6, sw, 10, '#1b1b22');
          rect(c, sx + 1, py - 5, sw - 2, 7, P.skarm);
          rect(c, px + w / 2 - 1, py + 4, 2, 2, '#1b1b22');
          rect(c, px + w / 2 - 6, py + 8, 12, 2, '#d8d8d8');
        }
        if (m.ritbord) { rect(c, px + 6, py - 2, 30, 9, '#f4f1ea'); rect(c, px + 10, py + 1, 12, 1, '#2ec4b6'); rect(c, px + 14, py + 3, 1, 3, '#e74c3c'); rect(c, px + 24, py + 1, 8, 5, '#dfe6e9'); }
        if (m.stampel) { rect(c, px + 3, py + 5, 5, 3, '#b03a3a'); rect(c, px + 4, py + 3, 3, 2, '#5a3a2a'); rect(c, px + w - 10, py + 5, 7, 5, '#f4f1ea'); }
        if (m.headset) { c.strokeStyle = '#222'; c.lineWidth = 1.5; c.beginPath(); c.arc(px + 7, py + 7, 3, Math.PI, 0); c.stroke(); }
        if (m.larare) { rect(c, px + 3, py + 5, 6, 4, '#f4f1ea'); rect(c, px + 4, py + 6, 4, 1, '#999'); rect(c, px + w - 8, py + 4, 4, 5, '#c0392b'); rect(c, px + w - 7, py + 3, 2, 1, '#eee'); }
        if (m.claude != null) { rect(c, px + 3, py + 6, 5, 3, '#f4f1ea'); }
        // Stol framför bordet
        rect(c, px + w / 2 - 5, py + h + 6, 10, 7, '#3d3d4a'); rect(c, px + w / 2 - 5, py + h + 6, 10, 2, '#555566');
        break;
      }
      case 'hylla': {
        rect(c, px, py - 10, w, h + 10, '#6b4226'); rect(c, px + 1, py - 9, w - 2, 1, '#8a5a36');
        const bok = ['#c0392b', '#2980b9', '#27ae60', '#f39c12', '#8e44ad', '#16a085', '#d35400', '#ecf0f1'];
        for (let rad = 0; rad < 2; rad++) {
          let x = px + 2; const y = py - 8 + rad * 12;
          rect(c, px + 1, y + 10, w - 2, 1, '#4a2c18');
          while (x < px + w - 3) { const bw = 2 + Math.floor(hash(x, y) * 2); rect(c, x, y + 1 + Math.floor(hash(y, x) * 3), bw, 9 - Math.floor(hash(y, x) * 3), bok[Math.floor(hash(x, y + 3) * 8)]); x += bw + 1; }
        }
        break;
      }
      case 'arkivskap':
        rect(c, px, py - 10, w, h + 10, '#7f8c8d'); for (let i = 0; i < 3; i++) { rect(c, px + 2, py - 8 + i * 8, w - 4, 6, '#95a5a6'); rect(c, px + w / 2 - 2, py - 6 + i * 8, 4, 1, '#34495e'); }
        break;
      case 'vaxt':
        rect(c, px + 4, py + 9, 8, 6, '#a0522d'); rect(c, px + 4, py + 9, 8, 1, '#c0703f');
        c.fillStyle = '#2e8b57'; c.beginPath(); c.arc(px + 8, py + 5, 6, 0, 7); c.fill();
        c.fillStyle = '#3cb371'; c.beginPath(); c.arc(px + 6, py + 3, 3, 0, 7); c.fill(); c.beginPath(); c.arc(px + 11, py + 6, 3, 0, 7); c.fill();
        break;
      case 'glob':
        rect(c, px + 6, py + 11, 4, 4, '#6b4226'); c.fillStyle = '#3a7bd5'; c.beginPath(); c.arc(px + 8, py + 6, 5, 0, 7); c.fill();
        rect(c, px + 5, py + 4, 3, 2, '#5fb85f'); rect(c, px + 9, py + 7, 2, 2, '#5fb85f');
        break;
      case 'fatolj':
        rect(c, px, py - 2, w, h + 2, '#8e3b46'); rect(c, px + 3, py + 2, w - 6, h - 5, '#a84b57'); rect(c, px, py - 2, w, 3, '#6d2b35');
        break;
      case 'soffa':
        rect(c, px, py - 3, w, h + 3, '#34495e'); rect(c, px + 2, py + 2, w - 4, h - 5, '#4a6278'); rect(c, px, py - 3, w, 4, '#2c3e50');
        break;
      case 'kok':
        rect(c, px, py - 10, w, h + 10, '#d5d8dc'); rect(c, px, py + 2, w, 4, '#aab0b6'); rect(c, px + 10, py - 6, 14, 6, '#99a3ad'); rect(c, px + 40, py - 8, 8, 3, '#7f8c8d');
        break;
      case 'kaffe':
        rect(c, px + 1, py - 8, 14, 20, '#2d3436'); rect(c, px + 4, py - 5, 8, 4, '#636e72'); rect(c, px + 6, py + 5, 4, 4, '#f5f6fa'); rect(c, px + 11, py - 6, 2, 2, '#e74c3c');
        break;
      case 'kyl':
        rect(c, px + 2, py - 12, w - 4, h + 12, '#ecf0f1'); rect(c, px + 2, py - 2, w - 4, 1, '#bdc3c7'); rect(c, px + w - 8, py - 9, 2, 5, '#95a5a6');
        break;
      case 'pingis':
        rect(c, px, py, w, h, '#1e7a4c'); rect(c, px, py + h / 2 - 1, w, 2, '#f5f6fa'); rect(c, px + w / 2, py, 1, h, '#e8e8e8'); rect(c, px + 1, py + 1, w - 2, 1, '#f5f6fa');
        break;
      case 'motesbord':
        rect(c, px + 4, py + 2, w - 8, h - 6, '#7a4b2a'); rect(c, px + 4, py + 2, w - 8, 3, '#96603a');
        for (const [sx, sy] of [[px - 2, py + 18], [px + w - 6, py + 18], [px + 18, py - 6], [px + 50, py - 6], [px + 18, py + h - 2], [px + 50, py + h - 2]]) rect(c, sx, sy, 8, 8, '#3d3d4a');
        break;
      case 'whiteboard':
        rect(c, px + 2, py - 12, w - 4, 20, '#ecf0f1'); rect(c, px + 1, py - 13, w - 2, 1, '#95a5a6'); rect(c, px + 1, py + 8, w - 2, 2, '#95a5a6');
        rect(c, px + 7, py - 8, 3, 1, '#2c3e50'); rect(c, px + 12, py - 8, 16, 1, '#2980b9'); rect(c, px + 7, py - 4, 22, 1, '#2c3e50'); rect(c, px + 32, py - 9, 18, 10, 'rgba(192,57,43,.15)');
        c.strokeStyle = '#c0392b'; c.lineWidth = 1; c.beginPath(); c.moveTo(px + 33, py); c.quadraticCurveTo(px + 41, py - 14, px + 49, py); c.stroke();
        break;
      case 'postfack':
        rect(c, px, py - 12, w, h + 12, '#8d6e63');
        for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { rect(c, px + 2 + i * 10, py - 10 + j * 10, 8, 8, '#5d4037'); if (hash(i, j) > 0.4) rect(c, px + 3 + i * 10, py - 8 + j * 10, 6, 3, '#f5f5f5'); }
        break;
      case 'brevlada':
        rect(c, px + 3, py - 2, 10, 14, '#f1c40f'); rect(c, px + 3, py - 2, 10, 3, '#d4ac0d'); rect(c, px + 5, py + 3, 6, 1, '#7d6608');
        break;
      case 'fargbord':
        rect(c, px, py + 2, w, 10, '#a1887f'); for (let i = 0; i < 5; i++) rect(c, px + 3 + i * 5, py + 4, 3, 3, ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#2ecc71'][i]);
        break;
      // ---- dynamiska ----
      case 'nyhetsskarm': {
        rect(c, px, py - 12, w, 20, '#1b1b22'); rect(c, px + 2, py - 10, w - 4, 16, '#0e2238');
        const k = Math.floor(realNu * 4 * fart) % 40;
        rect(c, px + 4, py - 8, 26, 2, '#6aa7ff'); rect(c, px + 4, py - 4, 40, 1, '#4b6d99'); rect(c, px + 4, py - 1, 30, 1, '#4b6d99');
        for (let i = 0; i < 6; i++) rect(c, px + 4 + ((i * 13 - k + 80) % 72), py + 3, 8, 1, i % 2 ? '#f0a04b' : '#9fd3ff');
        break;
      }
      case 'rack': {
        rect(c, px, py - 12, w, h + 12, '#23262d'); rect(c, px + 1, py - 11, w - 2, 1, '#3a3f4a');
        const rader = Math.floor((h + 10) / 4);
        for (let i = 0; i < rader; i++) {
          rect(c, px + 2, py - 9 + i * 4, w - 4, 3, '#2f333c');
          const blink = hash(m.x + i, Math.floor(realNu * 3 * fart + i)) > 0.5;
          rect(c, px + w - 5, py - 8 + i * 4, 2, 1, blink ? '#5fd08a' : '#1f5a36');
          if (m.main) rect(c, px + 3, py - 8 + i * 4, 2, 1, realNu < effekt.main && blink ? '#ffb347' : '#6b4a1d');
        }
        if (m.main) {
          const glod = realNu < effekt.main;
          rect(c, px + 4, py + h - 6, w - 8, 5, glod ? '#f0a04b' : '#3a2a18');
        }
        break;
      }
      case 'ringljus': {
        const pa = realNu < effekt.ringljus;
        c.strokeStyle = pa ? '#fff6d8' : '#8d8d9a'; c.lineWidth = 2; c.beginPath(); c.arc(px + 8, py - 4, 6, 0, 7); c.stroke();
        rect(c, px + 7, py + 2, 2, 12, '#333'); rect(c, px + 4, py + 13, 8, 2, '#333'); rect(c, px + 6, py - 6, 4, 5, '#111');
        break;
      }
      case 'lampa': {
        rect(c, px + 7, py - 6, 2, 20, '#333'); rect(c, px + 3, py - 10, 10, 5, '#f5d76e');
        break;
      }
      case 'klocka': {
        const cx = px + 16, cy = py + 8, ringer = realNu < effekt.klocka;
        const skak = ringer ? Math.sin(realNu * 40) * 1.2 : 0;
        c.fillStyle = '#f4f1ea'; c.beginPath(); c.arc(cx + skak, cy, 7, 0, 7); c.fill();
        c.strokeStyle = ringer ? '#e74c3c' : '#3b2c27'; c.lineWidth = 1.5; c.stroke();
        const tim = (simT / 3600) % 12, min = (simT / 60) % 60;
        c.strokeStyle = '#1b1b22'; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(cx + skak, cy); c.lineTo(cx + skak + Math.sin(tim / 12 * 2 * Math.PI) * 3.8, cy - Math.cos(tim / 12 * 2 * Math.PI) * 3.8); c.stroke();
        c.beginPath(); c.moveTo(cx + skak, cy); c.lineTo(cx + skak + Math.sin(min / 60 * 2 * Math.PI) * 5.5, cy - Math.cos(min / 60 * 2 * Math.PI) * 5.5); c.stroke();
        if (ringer) { rect(c, cx - 11, cy - 7, 2, 2, '#e74c3c'); rect(c, cx + 10, cy - 7, 2, 2, '#e74c3c'); }
        break;
      }
      case 'byggmaskin': {
        const aktiv = realNu < effekt.bygg;
        rect(c, px, py - 8, w, h + 8, '#5d6d7e'); rect(c, px + 2, py - 6, w - 4, 10, '#34495e');
        const v = aktiv ? realNu * 8 * fart : 0;
        for (const [gx, gy] of [[px + 9, py + 12], [px + 22, py + 16]]) {
          c.save(); c.translate(gx, gy); c.rotate(v); c.fillStyle = '#b0b8c0';
          for (let i = 0; i < 6; i++) { c.rotate(Math.PI / 3); c.fillRect(-1, -6, 2, 3); }
          c.beginPath(); c.arc(0, 0, 4, 0, 7); c.fill(); c.fillStyle = '#5d6d7e'; c.beginPath(); c.arc(0, 0, 1.5, 0, 7); c.fill(); c.restore();
        }
        rect(c, px + 4, py - 4, 4, 2, aktiv ? '#5fd08a' : '#1f5a36'); rect(c, px + 10, py - 4, 4, 2, aktiv && Math.sin(realNu * 20) > 0 ? '#f0a04b' : '#6b4a1d');
        break;
      }
      case 'sluss': {
        rect(c, px, py - 10, w, h + 10, '#2c2433'); rect(c, px + 1, py - 9, w - 2, 1, '#4a3d57');
        const s = effekt.sluss;
        const lampor = 20;
        for (let i = 0; i < lampor; i++) {
          const lx = px + 4 + (i % 10) * (w - 8) / 10, ly = py - 6 + Math.floor(i / 10) * 7;
          let col = '#3d3446';
          if (s && realNu < s.slut) {
            const n = s.lampor.length, idx = Math.floor(i * n / lampor);
            const l = s.lampor[Math.min(idx, n - 1)];
            if (i < Math.min(lampor, n * Math.ceil(lampor / Math.max(n, 1))) && realNu >= l.tand) col = l.fel ? '#ef5f5f' : '#5fd08a';
          }
          rect(c, lx, ly, 4, 4, col);
        }
        rect(c, px + w / 2 - 6, py + 5, 12, 3, '#6b5b7b');
        break;
      }
      case 'sajtskarm': {
        const glod = realNu < effekt.sajt;
        rect(c, px, py - 12, w, 22, '#1b1b22'); rect(c, px + 2, py - 10, w - 4, 18, glod ? '#f7f2e8' : '#e9e1d2');
        rect(c, px + 4, py - 8, w - 8, 3, '#2a2130');
        rect(c, px + 6, py - 3, 20, 2, '#c0392b'); rect(c, px + 6, py + 1, 32, 1, '#7f8c8d'); rect(c, px + 6, py + 4, 26, 1, '#7f8c8d');
        rect(c, px + w - 30, py - 3, 22, 9, '#dfe6e9'); rect(c, px + w - 28, py - 1, 18, 1, '#3498db');
        if (glod) { rect(c, px, py - 12, w, 1, '#f0a04b'); rect(c, px, py + 9, w, 1, '#f0a04b'); }
        break;
      }
      case 'staffli': {
        const aktiv = realNu < effekt.staffli;
        rect(c, px + 2, py - 12, 2, 26, '#8d6e63'); rect(c, px + 12, py - 12, 2, 26, '#8d6e63');
        rect(c, px - 2, py - 14, 20, 16, '#fbf8f1');
        const t = aktiv ? (realNu * 2 * fart) % 1 : 1;
        rect(c, px + 1, py - 10, 14 * Math.max(0.15, t), 4, '#6aa7ff'); rect(c, px + 3, py - 5, 10 * t, 3, '#f0a04b'); rect(c, px + 7, py - 8, 3, 3, '#ffd166');
        break;
      }
      case 'testbank': {
        rect(c, px, py + 2, w, 11, '#7f8c8d'); rect(c, px, py + 2, w, 2, '#95a5a6');
        rect(c, px + 4, py - 6, 6, 11, '#111'); rect(c, px + 5, py - 5, 4, 8, '#6aa7ff');
        rect(c, px + 16, py - 5, 14, 10, '#111'); rect(c, px + 17, py - 4, 12, 8, '#5fd08a');
        rect(c, px + 36, py - 7, 20, 12, '#111'); rect(c, px + 37, py - 6, 18, 9, Math.sin(realNu * 2) > 0 ? '#f7f2e8' : '#e9e1d2');
        break;
      }
      case 'tavla': {
        rect(c, px + 2, py - 12, w - 4, 20, '#243b2f'); rect(c, px + 1, py - 13, w - 2, 1, '#8d6e63');
        rect(c, px + 6, py - 8, 18, 1, '#e8f5e9'); rect(c, px + 6, py - 4, 30, 1, '#e8f5e9'); rect(c, px + 6, py, 12, 1, '#f0a04b');
        break;
      }
    }
  }

  function ritaBakgrund() {
    bx.fillStyle = '#1a141f'; bx.fillRect(0, 0, W, H);
    ritaGolv(bx);
    for (const m of MOBLER) if (m.typ === 'matta') ritaMobel(bx, m);
    ritaVaggar(bx);
    for (const m of MOBLER) if (!m.dyn && m.typ !== 'matta') ritaMobel(bx, m);
  }

  // ---- Figurer ------------------------------------------------------------
  function ritaPerson(c, f) {
    const L = f.def.look, x = Math.round(f.x), y = Math.round(f.y);
    const liten = L.liten ? 0.8 : 1;
    c.save();
    if (f.alpha < 1) c.globalAlpha = f.alpha;
    c.translate(x, y); if (liten !== 1) c.scale(liten, liten);
    const g = f.gar ? Math.floor((realNu * 8 * fart + f.fas) % 2) : 0;
    const d = f.dir;
    // Skugga
    c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(0, 0, 5.5, 2, 0, 0, 7); c.fill();
    // Ben
    const byxa = L.byxa;
    if (d === 'vanster' || d === 'hoger') {
      rect(c, -2 + (g ? 1 : -1), -6, 2, 6, byxa); rect(c, 0 + (g ? -1 : 1), -6, 2, 6, byxa);
      rect(c, -2 + (g ? 1 : -1), -1, 3, 1, '#1b1b1b'); rect(c, (g ? -1 : 1), -1, 3, 1, '#1b1b1b');
    } else {
      rect(c, -3, -6 - (g ? 1 : 0), 2, 6, byxa); rect(c, 1, -6 - (g ? 0 : 1), 2, 6, byxa);
      rect(c, -3, -1 - (g ? 1 : 0), 2, 1, '#1b1b1b'); rect(c, 1, -1 - (g ? 0 : 1), 2, 1, '#1b1b1b');
    }
    // Kropp
    const troja = L.troja;
    rect(c, -4, -13, 8, 8, troja);
    rect(c, -4, -13, 8, 1, 'rgba(255,255,255,.25)');
    if (L.rock) { rect(c, -4, -13, 2, 9, '#ffffff'); rect(c, 2, -13, 2, 9, '#ffffff'); rect(c, -1, -12, 2, 6, '#5dade2'); }
    if (L.slips && d !== 'upp') rect(c, -1, -12, 2, 5, L.slips);
    if (f.claude || f.def === HJALP) { if (d !== 'upp') { rect(c, -1, -11, 2, 1, '#fff3e8'); rect(c, 0, -12, 1, 3, '#fff3e8'); } }
    // Armar
    const armSving = f.gar ? (g ? 1 : -1) : 0;
    if (d === 'vanster' || d === 'hoger') rect(c, d === 'vanster' ? -1 + armSving : -1 - armSving, -12, 2, 6, troja);
    else { rect(c, -6, -12 + armSving, 2, 6, troja); rect(c, 4, -12 - armSving, 2, 6, troja); rect(c, -6, -7 + armSving, 2, 1, L.hud); rect(c, 4, -7 - armSving, 2, 1, L.hud); }
    // Arbetar: armar framåt och tangentknatter
    if (f.arbetar && d === 'upp') { rect(c, -6, -10, 2, 3, troja); rect(c, 4, -10 - (Math.floor(realNu * 10) % 2), 2, 3, troja); }
    // Huvud
    rect(c, -4, -21, 8, 8, L.hud);
    rect(c, -4, -14, 8, 1, 'rgba(0,0,0,.12)');
    // Ansikte
    if (d === 'ned') { rect(c, -2, -18, 1, 2, '#1b1b1b'); rect(c, 1, -18, 1, 2, '#1b1b1b'); rect(c, -1, -15, 2, 1, '#b5655a'); }
    else if (d === 'vanster') { rect(c, -3, -18, 1, 2, '#1b1b1b'); }
    else if (d === 'hoger') { rect(c, 2, -18, 1, 2, '#1b1b1b'); }
    if (L.glasogon && d !== 'upp') { if (d === 'ned') { rect(c, -3, -18, 3, 2, 'rgba(20,20,20,.0)'); c.strokeStyle = '#1b1b1b'; c.lineWidth = 0.8; c.strokeRect(-3.5, -18.5, 3, 2.5); c.strokeRect(0.5, -18.5, 3, 2.5); } else rect(c, d === 'vanster' ? -4 : 1, -18, 3, 1, '#1b1b1b'); }
    // Hår
    const har = L.har;
    switch (L.stil) {
      case 'kort': rect(c, -4, -22, 8, 3, har); if (d === 'upp') rect(c, -4, -22, 8, 6, har); else { rect(c, -4, -20, 1, 2, har); rect(c, 3, -20, 1, 2, har); } break;
      case 'lang': rect(c, -5, -22, 10, 3, har); if (d === 'upp') rect(c, -5, -22, 10, 9, har); else { rect(c, -5, -20, 2, 7, har); rect(c, 3, -20, 2, 7, har); } break;
      case 'knut': rect(c, -4, -22, 8, 3, har); rect(c, -2, -25, 4, 3, har); if (d === 'upp') rect(c, -4, -22, 8, 6, har); break;
      case 'lockar': for (let i = 0; i < 5; i++) rect(c, -5 + i * 2, -23 + (i % 2), 2, 3, har); if (d === 'upp') rect(c, -4, -21, 8, 5, har); break;
      case 'flint': rect(c, -5, -19, 1, 3, har); rect(c, 4, -19, 1, 3, har); if (d === 'upp') rect(c, -4, -18, 8, 3, har); break;
      case 'keps': rect(c, -4, -23, 8, 3, L.keps); rect(c, d === 'vanster' ? -7 : d === 'hoger' ? 3 : -3, -21, 4, 1, L.keps); rect(c, -4, -20, 1, 2, har); rect(c, 3, -20, 1, 2, har); break;
    }
    if (L.basker) { rect(c, -5, -24, 9, 3, L.basker); rect(c, 0, -25, 2, 1, L.basker); }
    if (L.headset) { rect(c, -5, -20, 1, 4, '#222'); rect(c, 4, -20, 1, 4, '#222'); rect(c, -4, -23, 8, 1, '#222'); if (d !== 'upp') rect(c, -4, -16, 3, 1, '#222'); }
    if (L.skagg && d === 'ned') rect(c, -3, -15, 6, 2, '#6b4a33');
    // Paket (commit) i famnen
    if (f.paket) { rect(c, -4, -12, 8, 6, '#c9a173'); rect(c, -4, -10, 8, 1, '#8c6a43'); rect(c, -1, -12, 2, 6, '#8c6a43'); }
    c.restore();
  }

  function ritaRobot(c, f) {
    const x = Math.round(f.x), y = Math.round(f.y), col = f.def.robot;
    const bob = Math.round(Math.sin(realNu * 4 + f.fas) * 1);
    c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(x, y, 5, 2, 0, 0, 7); c.fill();
    rect(c, x - 5, y - 12 + bob, 10, 9, '#cfd6de'); rect(c, x - 5, y - 12 + bob, 10, 1, '#fff');
    rect(c, x - 4, y - 19 + bob, 8, 6, '#dfe6ec'); rect(c, x - 3, y - 18 + bob, 6, 4, '#1b2330');
    const larm = f.id === 'vakt' && realNu < effekt.larm;
    const ogon = larm && Math.sin(realNu * 16) > 0 ? '#ef5f5f' : col;
    rect(c, x - 2, y - 17 + bob, 1, 2, ogon); rect(c, x + 1, y - 17 + bob, 1, 2, ogon);
    rect(c, x, y - 22 + bob, 1, 3, '#8a94a0'); rect(c, x - 1, y - 23 + bob, 3, 2, larm ? ogon : col);
    rect(c, x - 3, y - 3, 2, 3, '#8a94a0'); rect(c, x + 1, y - 3, 2, 3, '#8a94a0');
    rect(c, x - 3, y - 9 + bob, 6, 2, col);
    if (larm) { c.fillStyle = 'rgba(239,95,95,.25)'; c.beginPath(); c.arc(x, y - 12, 14 + Math.sin(realNu * 16) * 3, 0, 7); c.fill(); }
  }

  function ritaVarld() {
    vx.drawImage(bg, 0, 0);
    ritaHimmel(vx);
    for (const m of MOBLER) if (m.dyn) ritaMobel(vx, m);
    // Arbetande figurer lyser upp sin skärm.
    for (const m of MOBLER) {
      if (m.typ !== 'skrivbord' || !m.dator) continue;
      const hem = m.agare ? F[m.agare] : figurer.find(f => f.claude && !f.borta && f.hem[0] === m.x + 1 && f.hem[1] === m.y + 1);
      const aktiv = hem && (hem.arbetar || hem.status) && Math.hypot(hem.x - (m.x * T + m.w * T / 2), hem.y - (m.y * T + T * 2)) < 12;
      if (aktiv) {
        const sw = m.stor ? 18 : 12, sx = m.x * T + m.w * T / 2 - sw / 2, sy = m.y * T;
        rect(vx, sx + 1, sy - 5, sw - 2, 7, P.skarmLjus);
        for (let i = 0; i < 3; i++) rect(vx, sx + 2, sy - 4 + i * 2, (hash(i, Math.floor(realNu * 6)) * (sw - 5)) + 1, 1, '#1c3d57');
      }
    }
    const synliga = figurer.filter(f => !f.borta || f.poff > 0).sort((a, b) => a.y - b.y);
    for (const f of synliga) { if (f.def.robot) ritaRobot(vx, f); else ritaPerson(vx, f); }
    // Poff när en figur dyker upp eller försvinner.
    for (const f of figurer) if (f.poff > 0) {
      const r = (1 - f.poff) * 14 + 3;
      vx.strokeStyle = `rgba(255,236,200,${f.poff})`; vx.lineWidth = 1.5;
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; vx.beginPath(); vx.moveTo(f.x + Math.cos(a) * r * 0.5, f.y - 10 + Math.sin(a) * r * 0.5); vx.lineTo(f.x + Math.cos(a) * r, f.y - 10 + Math.sin(a) * r); vx.stroke(); }
    }
    // Natt
    const h = simT / 3600;
    let morker = 0;
    if (h < 5) morker = 0.5; else if (h < 7.5) morker = 0.5 * (7.5 - h) / 2.5; else if (h > 21) morker = 0.5; else if (h > 18.5) morker = 0.5 * (h - 18.5) / 2.5;
    if (morker > 0) {
      vx.fillStyle = `rgba(14,12,40,${morker})`; vx.fillRect(0, 0, W, H);
      vx.globalCompositeOperation = 'lighter';
      for (const f of figurer) if (!f.borta && (f.status || f.arbetar || f.cur)) {
        const gr = vx.createRadialGradient(f.x, f.y - 10, 2, f.x, f.y - 10, 34);
        gr.addColorStop(0, `rgba(255,200,120,${0.35 * morker / 0.5})`); gr.addColorStop(1, 'rgba(255,200,120,0)');
        vx.fillStyle = gr; vx.fillRect(f.x - 34, f.y - 44, 68, 68);
      }
      vx.globalCompositeOperation = 'source-over';
    }
  }

  // =========================================================================
  // 9. Skärmduken: skalning + text
  // =========================================================================
  const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');
  let skala = 1, dpr = 1;
  function storlek() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr));
    skala = Math.min(canvas.width / W, canvas.height / H);
  }
  let offX = 0, offY = 0;

  // Text i scenen sätts i Poppins: pixeltypsnittet blir oläsligt i små
  // storlekar ("g" läses som "s"), och det här ska synas på en projektor.
  const FONT = "'Poppins', system-ui, sans-serif";
  // Textförstoring i scenen, så att allt går att läsa på en projektor.
  const TXT = 1.6;
  function font(vikt, fs) { ctx.font = `${vikt} ${Math.round(fs)}px ${FONT}`; }

  function radbryt(text, maxB, maxRader) {
    const ord = String(text).split(' ');
    const rader = []; let rad = '';
    for (const o of ord) { const t = rad ? rad + ' ' + o : o; if (ctx.measureText(t).width > maxB && rad) { rader.push(rad); rad = o; } else rad = t; }
    if (rad) rader.push(rad);
    if (rader.length > maxRader) { rader.length = maxRader; rader[maxRader - 1] = rader[maxRader - 1].replace(/\s*\S*$/, '') + ' …'; }
    return rader;
  }
  // Enkel krockhantering: en ruta som överlappar en redan placerad flyttas
  // uppåt tills den är fri.
  function placera(ruta, upptagna) {
    for (let varv = 0; varv < 12; varv++) {
      const krock = upptagna.find(u => ruta.x < u.x + u.w && ruta.x + ruta.w > u.x && ruta.y < u.y + u.h && ruta.y + ruta.h > u.y);
      if (!krock) break;
      ruta.y = krock.y - ruta.h - 2 * dpr;
    }
    ruta.y = Math.max(2 * dpr, ruta.y);
    upptagna.push(ruta);
    return ruta;
  }

  function skylt(text, x, y, fs, bg, fg, kant) {
    font(700, fs);
    const w = ctx.measureText(text).width, p = 4 * dpr;
    ctx.fillStyle = bg; ctx.fillRect(Math.round(x - p), Math.round(y - p * 0.6), Math.round(w + 2 * p), Math.round(fs * 1.25 + p * 0.6));
    if (kant) { ctx.fillStyle = kant; ctx.fillRect(Math.round(x - p), Math.round(y + fs * 1.25 - 2 * dpr), Math.round(w + 2 * p), Math.round(2 * dpr)); }
    ctx.fillStyle = fg; ctx.fillText(text, x, y);
    return w;
  }

  function ritaOverlay() {
    const s = skala;
    const vx2 = x => offX + x * s, vy2 = y => offY + y * s;
    ctx.textBaseline = 'top';
    // På en smal skärm ryms inte alla skyltar: då visas bara namnen på dem
    // som pratar eller arbetar, och rums- och maskinskyltarna döljs.
    const smal = canvas.width / dpr < 720;
    if (!smal) {
    // Rumsskyltar, nere till vänster i varje rum.
    const fsRum = Math.max(10, TXT * 4.6 * s);
    ctx.save();
    for (const r of RUM) {
      const t = r.namn.toUpperCase();
      skylt(t, vx2(r.x * T + 4), vy2((r.y + r.h) * T - 10), fsRum, 'rgba(20,14,26,.74)', '#f3e3c3');
    }
    // Skyltar på maskinerna i öppna kontoret.
    const fsMask = Math.max(9, TXT * 3.9 * s);
    const maskiner = [['SCHEMALÄGGAREN', 23 * T, 12 * T + 3], ['VERIFIERINGSSLUSSEN', 31 * T, 13 * T + 1], ['BYGGET', 26 * T, 15 * T + 2], ['SAJTEN', 38 * T, 13 * T + 1]];
    const slussAktiv = effekt.sluss && realNu < effekt.sluss.slut && effekt.sluss.lampor.some(l => realNu >= l.tand);
    const sajtAktiv = realNu < effekt.sajt;
    for (const [t, x, y] of maskiner) {
      if ((t === 'VERIFIERINGSSLUSSEN' && slussAktiv) || (t === 'SAJTEN' && sajtAktiv)) continue;
      font(700, fsMask);
      const w = ctx.measureText(t).width;
      skylt(t, vx2(x) - w / 2, vy2(y), fsMask, 'rgba(240,160,75,.92)', '#1b1422');
    }
    ctx.restore();
    }

    const upptagna = [];
    const krockar = r => upptagna.some(u => r.x < u.x + u.w && r.x + r.w > u.x && r.y < u.y + u.h && r.y + r.h > u.y);
    const fsNamn = Math.max(10 * dpr, TXT * 4.4 * s), fsB = Math.max(11 * dpr, TXT * 5 * s);
    const synliga = figurer.filter(f => !f.borta && (!smal || f.arbetar || (f.bubbla && realNu < f.bubbla.till) || (f.cur && !f.cur.amb))).sort((a, b) => b.y - a.y);
    const pratar = f => f.bubbla && realNu < f.bubbla.till;
    const namnRuta = f => {
      font(600, fsNamn);
      const w = ctx.measureText(f.namn).width + 10 * dpr, h = fsNamn * 1.35 + 2 * dpr;
      return { x: vx2(f.x) - w / 2, y: vy2(f.y - (f.def.look && f.def.look.liten ? 21 : 26)) - h, w, h };
    };
    // Den som pratar får företräde: namnskylt och bubbla placeras först, som
    // en enhet. Övriga namnskyltar flyttas undan, och får de inte plats döljs
    // de tills bubblan försvunnit.
    const namnRutor = new Map(), bubbelRutor = [];
    for (const f of synliga.filter(pratar)) {
      const nr = placera(namnRuta(f), upptagna);
      namnRutor.set(f, nr);
      font(600, fsB);
      const pad = 6 * dpr, lh = fsB * 1.3;
      const rader = radbryt(f.bubbla.text, smal ? 150 * dpr : Math.max(190 * dpr, 64 * s), 4);
      const w = Math.max(...rader.map(t => ctx.measureText(t).width)) + pad * 2;
      const h = rader.length * lh + pad * 1.2;
      const ax = vx2(f.x);
      const r = placera({ x: clamp(ax - w / 2, 4 * dpr, canvas.width - w - 4 * dpr), y: nr.y - h - 7 * dpr, w, h }, upptagna);
      bubbelRutor.push({ f, r, rader, pad, lh, ax, nr });
    }
    for (const f of synliga.filter(f => !pratar(f))) {
      const r = namnRuta(f);
      let ok = !krockar(r);
      if (!ok) { r.y -= r.h + 2 * dpr; ok = !krockar(r); }
      if (ok) { upptagna.push(r); namnRutor.set(f, r); }
    }
    for (const [f, r] of namnRutor) {
      const farg = f.claude || f.def === HJALP || f.def === CLAUDE ? AGENT_FARG.claude : (AGENT_FARG[f.id] || '#ddd');
      ctx.fillStyle = 'rgba(20,14,26,.82)'; ctx.fillRect(Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h));
      ctx.fillStyle = farg; ctx.fillRect(Math.round(r.x), Math.round(r.y + r.h - 2 * dpr), Math.round(r.w), Math.round(2 * dpr));
      font(600, fsNamn); ctx.fillStyle = '#fff'; ctx.fillText(f.namn, r.x + 5 * dpr, r.y + 1 * dpr);
      if (f.arbetar) {
        const n = Math.floor(realNu * 3) % 4;
        for (let i = 0; i < 3; i++) { ctx.fillStyle = i < n ? '#f0a04b' : 'rgba(240,160,75,.3)'; ctx.fillRect(r.x + r.w + 4 * dpr + i * 5 * dpr, r.y + r.h / 2 - 2 * dpr, 3 * dpr, 3 * dpr); }
      }
    }
    for (const { f, r, rader, pad, lh, ax, nr } of bubbelRutor) {
      const kant = f.bubbla.farg || '#2a2130';
      ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = kant; ctx.lineWidth = 2 * dpr;
      ctx.beginPath(); ctx.roundRect(r.x, r.y, r.w, r.h, 6 * dpr); ctx.fill(); ctx.stroke();
      // Pilen ner mot den egna namnskylten.
      const px = clamp(ax, r.x + 8 * dpr, r.x + r.w - 8 * dpr), spets = Math.min(nr.y - 1 * dpr, r.y + r.h + 7 * dpr);
      ctx.beginPath(); ctx.moveTo(px - 5 * dpr, r.y + r.h - 1); ctx.lineTo(px, spets); ctx.lineTo(px + 5 * dpr, r.y + r.h - 1); ctx.closePath();
      ctx.fillStyle = '#fffaf0'; ctx.fill();
      ctx.beginPath(); ctx.moveTo(px - 5 * dpr, r.y + r.h); ctx.lineTo(px, spets); ctx.lineTo(px + 5 * dpr, r.y + r.h); ctx.stroke();
      ctx.fillStyle = f.bubbla.farg && f.bubbla.farg !== '#2a2130' ? f.bubbla.farg : '#231a2b';
      font(600, fsB);
      rader.forEach((t, i) => ctx.fillText(t, r.x + pad, r.y + pad * 0.6 + i * lh));
    }
    // Slussens senast tända kontroll
    const sl = effekt.sluss;
    if (sl && realNu < sl.slut) {
      const tanda = sl.lampor.filter(l => realNu >= l.tand);
      const sista = tanda[tanda.length - 1];
      if (sista) {
        const fs = Math.max(10, TXT * 4.4 * s);
        const t = (sista.fel ? 'Rött: ' : 'Grönt: ') + sista.namn;
        font(700, fs);
        const w = ctx.measureText(t).width;
        skylt(t, vx2(31 * T) - w / 2, vy2(13 * T + 1), fs, sista.fel ? '#c0392b' : '#1e8449', '#fff');
      }
    }
    // Sajtskärmen blinkar till efter en push.
    if (realNu < effekt.sajt) {
      const fs = Math.max(10, TXT * 4.4 * s);
      const t = 'fysiklabbet.se ' + effekt.sajtText;
      font(700, fs);
      const w = ctx.measureText(t).width;
      skylt(t, vx2(38 * T) - w / 2, vy2(13 * T + 1), fs, '#f0a04b', '#1b1422');
    }
  }

  function rita() {
    ritaVarld();
    ctx.fillStyle = '#0d0b12'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    offX = (canvas.width - W * skala) / 2; offY = (canvas.height - H * skala) / 2;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(varld, offX, offY, W * skala, H * skala);
    ritaOverlay();
  }

  // =========================================================================
  // 10. Sidopanelen
  // =========================================================================
  const $ = id => document.getElementById(id);
  const KPI_DEF = [['nyheter', 'nyhet publicerad', 'nyheter publicerade'], ['utgivare', 'utgivarbeslut', 'utgivarbeslut'], ['delegeringar', 'uppdrag till agenter', 'uppdrag till agenter'], ['verifieringar', 'automatiska kontroller', 'automatiska kontroller'],
    ['roda', 'röd kontroll', 'röda kontroller'], ['commits', 'sparad ändring', 'sparade ändringar'], ['pushar', 'push till main', 'pushar till main'], ['inlagg', 'inlägg i sociala medier', 'inlägg i sociala medier']];
  let senasteKpi = {};
  function ritaKpi() {
    const el = $('kpi');
    if (!el.children.length) el.innerHTML = KPI_DEF.map(([k]) => `<div><b data-k="${k}">0</b><span data-t="${k}"></span></div>`).join('');
    for (const [k, en, fl] of KPI_DEF) {
      const b = el.querySelector(`[data-k="${k}"]`), v = kpi ? kpi[k] : 0;
      if (senasteKpi[k] !== v) { b.textContent = v; if (senasteKpi[k] != null && v > senasteKpi[k]) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); } }
      el.querySelector(`[data-t="${k}"]`).textContent = v === 1 ? en : fl;
    }
    senasteKpi = Object.assign({}, kpi);
  }
  let loggRitade = 0;
  function ritaLogg(helt) {
    const ul = $('logg');
    if (helt) { ul.innerHTML = ''; loggRitade = 0; }
    const nya = loggRader.slice(loggRitade);
    loggRitade = loggRader.length;
    for (const r of nya) {
      const li = document.createElement('li');
      if (!helt) li.className = 'ny';
      li.innerHTML = `<span class="prick" style="background:${r.farg || '#888'}"></span><span><time>${tid(r.s)}</time>${esc(r.text)}</span>`;
      li.addEventListener('click', () => hoppa(Math.max(0, r.s - 5)));
      ul.prepend(li);
    }
    while (ul.children.length > 250) ul.lastChild.remove();
  }
  let justNuSig = '';
  function ritaJustNu() {
    const akt = figurer.filter(f => !f.borta && f.status).map(f => ({ namn: f.namn, text: f.status, farg: f.claude || f.def === HJALP ? AGENT_FARG.claude : AGENT_FARG[f.id] }));
    const sig = akt.map(a => a.namn + a.text).join('|');
    if (sig === justNuSig) return;
    justNuSig = sig;
    $('justNu').innerHTML = akt.length
      ? akt.slice(0, 7).map(a => `<li><span class="prick" style="background:${a.farg || '#888'}"></span><span><b>${esc(a.namn)}</b><small>${esc(a.text)}</small></span></li>`).join('')
      : '<li class="nu-tom">Tyst i kontoret. Klockan spolar fram till nästa händelse.</li>';
  }

  // ---- Tidslinjen -----------------------------------------------------------
  const tl = $('tlCanvas'), tlc = tl.getContext('2d');
  let tlBg = null;
  function tlFarg(e) {
    if (e.typ === 'verifiera') return e.korningar.some(k => k.fel) ? '#ef5f5f' : '#5fd08a';
    if (e.typ === 'delegera' || e.typ === 'hjalp') return AGENT_FARG[e.agent] || '#e9a68a';
    if (e.typ === 'push') return '#f0a04b';
    if (e.typ === 'start') return e.jobb === 'nyhet' ? AGENT_FARG.nyhetsagent : /^fb/.test(e.jobb) ? AGENT_FARG['facebook-agent'] : /^ig/.test(e.jobb) ? AGENT_FARG['instagram-agent'] : AGENT_FARG.larare;
    if (e.typ === 'vakt') return e.larm ? '#ef5f5f' : AGENT_FARG.vakt;
    if (e.typ === 'nyhetsbrev') return AGENT_FARG.nyhetsbrev;
    return null;
  }
  function uppdateraTidslinje() {
    const r = tl.getBoundingClientRect();
    const d = Math.min(2, window.devicePixelRatio || 1);
    tl.width = Math.max(1, Math.round(r.width * d)); tl.height = Math.max(1, Math.round(r.height * d));
    tlBg = document.createElement('canvas'); tlBg.width = tl.width; tlBg.height = tl.height;
    const c = tlBg.getContext('2d'), w = tl.width, h = tl.height, pad = 10 * d;
    c.fillStyle = '#1f1a29'; c.fillRect(0, 0, w, h);
    // Natt skuggas
    const xs = s => pad + (w - 2 * pad) * s / 86400;
    c.fillStyle = 'rgba(14,12,40,.55)'; c.fillRect(xs(0), 0, xs(6.5 * 3600) - xs(0), h); c.fillRect(xs(20.5 * 3600), 0, xs(86400) - xs(20.5 * 3600), h);
    c.font = `600 ${10 * d}px 'Poppins', sans-serif`; c.fillStyle = '#a99bb8'; c.textBaseline = 'bottom';
    for (let t = 0; t <= 24; t += 3) { const x = xs(t * 3600); c.fillRect(x, h - 14 * d, 1, 4 * d); c.fillText(String(t).padStart(2, '0'), x - 6 * d, h - 1); }
    for (const e of handelser) {
      const col = tlFarg(e); if (!col) continue;
      const x = xs(e.s); c.fillStyle = col;
      const stor = e.typ === 'start' || e.typ === 'push' || (e.typ === 'vakt' && e.larm);
      c.fillRect(Math.round(x), stor ? 5 * d : 9 * d, Math.max(1, 2 * d), stor ? 20 * d : 12 * d);
    }
  }
  function ritaTidslinje() {
    if (!tlBg) return;
    const d = tl.width / tl.getBoundingClientRect().width || 1, w = tl.width, pad = 10 * d;
    tlc.drawImage(tlBg, 0, 0);
    const x = pad + (w - 2 * pad) * simT / 86400;
    tlc.fillStyle = '#fff'; tlc.fillRect(x - 1 * d, 0, 2 * d, tl.height);
    tlc.beginPath(); tlc.moveTo(x - 5 * d, 0); tlc.lineTo(x + 5 * d, 0); tlc.lineTo(x, 6 * d); tlc.fill();
  }
  $('tidslinje').addEventListener('click', ev => {
    const r = tl.getBoundingClientRect(), pad = 10;
    const s = clamp((ev.clientX - r.left - pad) / (r.width - 2 * pad), 0, 1) * 86400;
    hoppa(s);
  });

  // ---- Klick på figur -------------------------------------------------------
  function figurVid(ev) {
    const r = canvas.getBoundingClientRect();
    const mx = ((ev.clientX - r.left) * dpr - offX) / skala, my = ((ev.clientY - r.top) * dpr - offY) / skala;
    let bast = null, bd = 14;
    for (const f of figurer) { if (f.borta) continue; const d = Math.hypot(f.x - mx, f.y - 11 - my); if (d < bd) { bd = d; bast = f; } }
    return bast;
  }
  canvas.addEventListener('mousemove', ev => canvas.classList.toggle('pekare', !!figurVid(ev)));
  canvas.addEventListener('click', ev => {
    const f = figurVid(ev); const kort = $('kort');
    if (!f) { kort.classList.remove('synlig'); return; }
    const d = f.def;
    $('kortNamn').textContent = f.namn;
    $('kortRoll').textContent = d.roll || '';
    $('kortText').textContent = d.text || '';
    const fakta = [];
    if (d.fil) fakta.push(['Instruktioner', `<code>${d.fil === 'CLAUDE.md' ? 'CLAUDE.md' : '.claude/agents/' + d.fil}</code>`]);
    if (d.modell) fakta.push(['Modell', esc(d.modell)]);
    if (f.status) fakta.push(['Just nu', esc(f.status)]);
    const antal = handelser.filter(e => (e.typ === 'delegera' || e.typ === 'hjalp') && (e.agent === f.id || e.agent + '-agent' === f.id) && e.s <= simT).length;
    if (!d.robot && f.id in AGENTER && f.id !== 'larare') fakta.push(['Uppdrag i dag', String(antal)]);
    $('kortFakta').innerHTML = fakta.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('');
    const sr = $('scen').getBoundingClientRect(), cr = canvas.getBoundingClientRect();
    const px = (offX + f.x * skala) / dpr + (cr.left - sr.left), py = (offY + f.y * skala) / dpr + (cr.top - sr.top);
    kort.style.left = clamp(px + 18, 8, sr.width - 300) + 'px';
    kort.style.top = clamp(py - 120, 8, sr.height - 230) + 'px';
    kort.classList.add('synlig');
  });
  $('kortStang').addEventListener('click', () => $('kort').classList.remove('synlig'));

  // ---- Kontroller -----------------------------------------------------------
  const dagar = Object.keys(DATA.dagar || {}).sort();
  const veckodag = d => new Date(d + 'T12:00:00').toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
  $('dagval').innerHTML = dagar.slice().reverse().map(d => `<option value="${d}">${veckodag(d)}</option>`).join('');
  $('dagval').addEventListener('change', e => { valjDag(e.target.value); });
  function satSpela(v) {
    spelar = v;
    $('spelaIkon').innerHTML = v ? '<rect x="3" y="2" width="3.5" height="12"/><rect x="9.5" y="2" width="3.5" height="12"/>' : '<path d="M3 2l11 6-11 6z"/>';
    $('spela').setAttribute('aria-label', v ? 'Pausa' : 'Spela');
  }
  $('spela').addEventListener('click', () => satSpela(!spelar));
  $('hastighet').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    fart = Number(b.dataset.v);
    for (const x of $('hastighet').children) x.classList.toggle('aktiv', x === b);
  });
  $('nasta').addEventListener('click', () => {
    const e = handelser[nasta];
    if (e) hoppa(Math.max(simT, e.s - 3));
  });
  $('omKnapp').addEventListener('click', () => $('omDialog').showModal());
  $('helskarm').addEventListener('click', () => {
    const app = $('app');
    if (document.fullscreenElement) document.exitFullscreen(); else if (app.requestFullscreen) app.requestFullscreen();
  });
  document.addEventListener('fullscreenchange', () => setTimeout(() => { storlek(); uppdateraTidslinje(); }, 60));
  document.addEventListener('keydown', e => {
    if (e.target.closest('select, input, dialog')) return;
    if (e.code === 'Space') { e.preventDefault(); satSpela(!spelar); }
    if (e.key === 'ArrowRight') $('nasta').click();
  });
  window.addEventListener('resize', () => { storlek(); uppdateraTidslinje(); });

  // =========================================================================
  // 11. Huvudslingan
  // =========================================================================
  let senast = performance.now();
  let panelTid = 0;
  function steg(nu) {
    const dt = Math.min(0.25, (nu - senast) / 1000); senast = nu;
    realNu += dt;
    if (spelar) {
      // Hur fort går klockan? Långsamt när något rör sig, fortare när agenter
      // bara arbetar, och den spolar när kontoret är tyst.
      let rorelse = false, arbete = false, ko = 0;
      for (const f of figurer) {
        if (f.borta) continue;
        if (f.cur && !f.cur.amb && (f.cur.a === 'ga' || f.cur.a === 'saga' || f.cur.a === 'vanta')) rorelse = true;
        if (f.cur && f.cur.a === 'arbeta') arbete = true;
        // Den som arbetar väntar på klockan; dess kö räknas inte som eftersläp.
        if (!(f.cur && f.cur.a === 'arbeta')) ko += f.ko.filter(h => !h.amb).length;
      }
      const nastaS = nasta < handelser.length ? handelser[nasta].s : 86400;
      let takt = rorelse || ko > 2 ? 12 : arbete ? 150 : 1500;
      if (ko > 6) takt = 0;
      let nyT = simT + takt * fart * dt;
      if (!rorelse && !arbete && ko === 0 && nyT > nastaS) nyT = nastaS;
      simT = Math.min(86399, nyT);
      while (nasta < handelser.length && handelser[nasta].s <= simT) utfor(handelser[nasta++]);
      for (const f of figurer) uppdateraFigur(f, dt);
    }
    for (const f of figurer) {
      if (f.poff > 0) { f.poff = Math.max(0, f.poff - dt * 2.2 * fart); }
      if (f.borta) f.alpha = 0; else f.alpha = 1;
    }
    for (let i = figurer.length - 1; i >= 0; i--) if (figurer[i].borta && figurer[i].poff <= 0) figurer.splice(i, 1);
    rita();
    ritaTidslinje();
    $('klockTid').textContent = tid(simT);
    panelTid += dt;
    if (panelTid > 0.25) { panelTid = 0; ritaJustNu(); }
    requestAnimationFrame(steg);
  }

  function starta() {
    ritaBakgrund();
    storlek();
    if (!dagar.length) {
      $('logg').innerHTML = '<li class="nu-tom">Inget data. Kör node .claude/bygg-agentkontor.js</li>';
    } else {
      // Adressen kan välja dag, klockslag och hastighet, till exempel
      // agentkontoret.html?dag=2026-09-30&t=13:00&fart=2 inför en demonstration.
      const q = new URLSearchParams(location.search);
      const d = dagar.includes(q.get('dag')) ? q.get('dag') : dagar[dagar.length - 1];
      $('dagval').value = d;
      valjDag(d);
      const t = (q.get('t') || '').match(/^(\d{1,2})[:.](\d\d)$/);
      if (t) hoppa((+t[1]) * 3600 + (+t[2]) * 60);
      const fq = q.get('fart');
      if (fq) { const b = [...$('hastighet').children].find(x => x.dataset.v === fq); if (b) b.click(); }
    }
    $('klockDag').textContent = dagId ? veckodag(dagId) : '';
    $('dagval').addEventListener('change', () => { $('klockDag').textContent = veckodag(dagId); });
    $('kpiDag').textContent = DATA.genererad ? 'Loggarna lästes in ' + DATA.genererad + '.' : '';
    requestAnimationFrame(steg);
    window.__agentkontor = { hoppa, figurer, lage: () => ({ simT, realNu, figurer: figurer.length, ko: figurer.reduce((n, f) => n + f.ko.length, 0), upptagna: figurer.filter(f => f.cur || f.ko.length).map(f => f.id + ':' + (f.cur ? f.cur.a + (f.cur.till ? '@' + f.cur.till : '') : '-') + ':' + f.ko.map(h => h.a).join(',')) }) };
  }
  (document.fonts && document.fonts.load ? Promise.all([document.fonts.load("600 12px 'Poppins'"), document.fonts.load("700 12px 'Poppins'"), document.fonts.load("12px 'Press Start 2P'")]).catch(() => {}) : Promise.resolve()).then(starta);
})();

/* Slumpa grupper — gruppgenerator för klassrummet (slumpa-grupper.html).
 *
 * Bygger på lärarens tidigare app Slumpify (React + Firebase), omskriven till
 * ett fristående skript i sajtens stil och utan inloggning. Allt körs i
 * webbläsaren; inga namn lämnar datorn.
 *
 * Sektioner:
 *   1. Tillstånd och lagring  — klasslistor, inställningar och senaste
 *                               indelning i localStorage (en nyckel, LAGER).
 *   2. Gruppindelning         — antal grupper, slumpning (Fisher–Yates) och
 *                               villkoren tillsammans/isär (union–find).
 *   3. Vänsterpanelen         — klasslista, närvaro, tillfälliga elever.
 *   4. Högerpanelen           — gruppstorlek, villkor, slumpknappen.
 *   5. Arket med grupperna    — kort, slumpanimation, flytta/byta elever
 *                               (dra med mus, tryck två gånger på pekskärm).
 *   6. Filer och export       — spara/öppna .json, textfil, kopiera, skriv ut.
 *
 * Filformatet (.json): { format: 'fysiklabbet-slumpa-grupper', version: 1,
 *   sparad, klass?: { id, namn, elever: [{id, namn}], villkor: [...] },
 *   grupper?: [{ namn, elever: [{id, namn}] }] }. Även en ren textfil med ett
 *   namn per rad går att öppna; den blir en ny klasslista.
 */
(function () {
  'use strict';

  /* ================= 1. Tillstånd och lagring ================= */

  const LAGER = 'slumpaGrupper.v1';
  const FORMAT = 'fysiklabbet-slumpa-grupper';
  const FARGER = ['#1c3d6b', '#c8324a', '#3f7a34', '#a5641a', '#6b4c9a', '#2a7178', '#8a4b2f', '#4a5568', '#b23a7a', '#5a6b1f'];

  const idag = () => new Date().toISOString().slice(0, 10);
  const nyttId = (p) => (p || 'e') + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

  let S = {
    listor: [],            // [{ id, namn, elever: [{id, namn}], villkor: [...], uppdaterad }]
    vald: null,            // id för vald lista
    inst: { lage: 'storlek', storlek: 4, antal: 6, avrunda: 'storre' },
    narvaro: { datum: idag(), borta: {} },   // borta[listId] = [elevId]; nollställs varje ny dag
    tillfalliga: {},       // tillfalliga[listId] = [{id, namn}], bara i dag
    tillfVillkor: [],      // villkor som gäller bara nästa slumpning
    grupper: null,         // [{ id, elever: [{id, namn}] }]
    varningar: [],
  };

  function las() {
    try {
      const d = JSON.parse(localStorage.getItem(LAGER) || 'null');
      if (!d) return;
      if (Array.isArray(d.listor)) S.listor = d.listor;
      if (d.vald) S.vald = d.vald;
      if (d.inst) S.inst = Object.assign(S.inst, d.inst);
      if (d.narvaro && d.narvaro.datum === idag()) {
        S.narvaro = d.narvaro;
        S.tillfalliga = d.tillfalliga || {};
      }
      if (Array.isArray(d.grupper)) S.grupper = d.grupper;
    } catch (e) { /* tom eller blockerad lagring: börja om */ }
    if (!S.listor.some(l => l.id === S.vald)) S.vald = S.listor[0] ? S.listor[0].id : null;
  }
  function spara() {
    try {
      localStorage.setItem(LAGER, JSON.stringify({
        listor: S.listor, vald: S.vald, inst: S.inst,
        narvaro: S.narvaro, tillfalliga: S.tillfalliga, grupper: S.grupper,
      }));
    } catch (e) { /* privat fönster: verktyget fungerar ändå, men minns inget */ }
  }

  const lista = () => S.listor.find(l => l.id === S.vald) || null;
  const borta = () => (S.vald && S.narvaro.borta[S.vald]) || [];
  const tillf = () => (S.vald && S.tillfalliga[S.vald]) || [];
  function narvarande() {
    const l = lista();
    if (!l) return [];
    const b = new Set(borta());
    return l.elever.filter(e => !b.has(e.id)).concat(tillf());
  }
  function namnPa(id) {
    const l = lista();
    const e = (l ? l.elever : []).concat(tillf()).find(x => x.id === id);
    return e ? e.namn : '?';
  }

  /* ================= 2. Gruppindelning ================= */

  function blanda(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Antal grupper ur inställningarna. "Hellre större" avrundar antalet grupper
  // nedåt (några får en elev extra), "hellre mindre" avrundar uppåt.
  function antalGrupper(n) {
    if (n <= 0) return 0;
    const i = S.inst;
    let k;
    if (i.lage === 'antal') k = i.antal;
    else if (i.avrunda === 'mindre') k = Math.ceil(n / i.storlek);
    else {
      // Större grupper får bli högst en elev större än valt. Annars blir 7
      // elever med fyra per grupp en enda grupp med sju, och då hellre 4 + 3.
      k = Math.floor(n / i.storlek);
      if (k < 1 || Math.ceil(n / k) > i.storlek + 1) k = Math.ceil(n / i.storlek);
    }
    return Math.max(1, Math.min(n, k));
  }

  // Gruppstorlekarna, största först: 25 elever i 6 grupper → [5, 4, 4, 4, 4, 4].
  function storlekar(n, k) {
    const bas = Math.floor(n / k), extra = n % k;
    return Array.from({ length: k }, (_, i) => bas + (i < extra ? 1 : 0));
  }

  // Villkoren bland de närvarande. Tillsammans-par slås ihop till kluster med
  // union–find; isär-par blir en uppslagstabell. Samma par med båda typerna är
  // en konflikt, och då slumpas utan villkor.
  function slumpaMedVillkor(elever, k, villkor) {
    const varn = [];
    const ids = new Set(elever.map(e => e.id));
    const aktiva = villkor.filter(v => ids.has(v.a) && ids.has(v.b));
    const parTyp = new Map();
    for (const v of aktiva) {
      const nyckel = [v.a, v.b].sort().join('|');
      if (parTyp.has(nyckel) && parTyp.get(nyckel) !== v.typ) {
        varn.push(`${namnPa(v.a)} och ${namnPa(v.b)} har både villkoret tillsammans och isär. Villkoren struntades i den här gången.`);
        return { grupper: delaUtan(elever, k), varn };
      }
      parTyp.set(nyckel, v.typ);
    }

    const forald = new Map(elever.map(e => [e.id, e.id]));
    const rot = (x) => { while (forald.get(x) !== x) { forald.set(x, forald.get(forald.get(x))); x = forald.get(x); } return x; };
    for (const v of aktiva) if (v.typ === 'ihop') forald.set(rot(v.a), rot(v.b));
    const kluster = new Map();
    for (const e of elever) {
      const r = rot(e.id);
      if (!kluster.has(r)) kluster.set(r, []);
      kluster.get(r).push(e);
    }
    const isar = new Map();
    for (const v of aktiva) if (v.typ === 'isar') {
      if (!isar.has(v.a)) isar.set(v.a, new Set());
      if (!isar.has(v.b)) isar.set(v.b, new Set());
      isar.get(v.a).add(v.b); isar.get(v.b).add(v.a);
    }

    const mal = storlekar(elever.length, k);
    const maxStorlek = mal[0];
    let lista = blanda([...kluster.values()].map(blanda));
    lista.sort((x, y) => y.length - x.length);   // stabil sortering: slumpad ordning inom samma storlek
    for (const c of lista) if (c.length > maxStorlek) {
      varn.push(`${c.map(e => e.namn).join(', ')} ska arbeta tillsammans men ryms inte i en grupp med ${maxStorlek} elever. De hamnar ändå i samma grupp, som blir större.`);
    }

    const grupper = Array.from({ length: k }, () => []);
    let kunde = true;
    for (const c of lista) {
      const undvik = new Set();
      c.forEach(e => (isar.get(e.id) || []).forEach(x => undvik.add(x)));
      let giltiga = grupper.map((g, i) => i).filter(i => !grupper[i].some(e => undvik.has(e.id)));
      if (!giltiga.length) { kunde = false; giltiga = grupper.map((g, i) => i); }
      // Fyll i första hand grupper som har plats kvar för hela klustret.
      const ryms = giltiga.filter(i => grupper[i].length + c.length <= mal[i]);
      const kand = ryms.length ? ryms : giltiga;
      const minst = Math.min(...kand.map(i => grupper[i].length));
      const basta = kand.filter(i => grupper[i].length === minst);
      grupper[basta[Math.floor(Math.random() * basta.length)]].push(...c);
    }
    if (!kunde) varn.push('Alla villkor om att hållas isär gick inte att uppfylla med så här få grupper.');
    return { grupper: blanda(grupper.filter(g => g.length).map(blanda)), varn };
  }

  function delaUtan(elever, k) {
    const b = blanda(elever), ut = [];
    let i = 0;
    for (const s of storlekar(elever.length, k)) { ut.push(b.slice(i, i + s)); i += s; }
    return ut;
  }

  /* ================= Små hjälpare ================= */

  function h(tag, attr, ...barn) {
    const el = document.createElement(tag);
    if (attr) for (const [k, v] of Object.entries(attr)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;   // bara egna, fasta ikoner
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const b of barn.flat()) if (b != null && b !== false) el.append(b.nodeType ? b : document.createTextNode(b));
    return el;
  }
  const svg = (d, w) => `<svg width="${w || 16}" height="${w || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IK = {
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    minus: svg('<path d="M5 12h14"/>'),
    penna: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>'),
    sopor: svg('<path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/>'),
    kryss: svg('<path d="M6 6l12 12M18 6 6 18"/>', 14),
    ihop: svg('<path d="M9 15 15 9"/><path d="M11 6.5 13 4.5a4 4 0 0 1 5.7 5.7l-2 2"/><path d="M13 17.5 11 19.5a4 4 0 0 1-5.7-5.7l2-2"/>', 14),
    isar: svg('<path d="M11 6.5 13 4.5a4 4 0 0 1 5.7 5.7l-2 2"/><path d="M13 17.5 11 19.5a4 4 0 0 1-5.7-5.7l2-2"/><path d="M4 4l16 16"/>', 14),
    slump: svg('<path d="M3 7h3.5c2 0 3.2 1 4.3 2.7l2.4 4.6C14.3 16 15.5 17 17.5 17H21"/><path d="M3 17h3.5c1.3 0 2.3-.5 3.1-1.3"/><path d="M14.4 8.3C15.2 7.5 16.2 7 17.5 7H21"/><path d="m18 4 3 3-3 3"/><path d="m18 14 3 3-3 3"/>', 20),
    skarm: svg('<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/>'),
    skarmUt: svg('<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/>'),
    fil: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),
    lista: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>'),
    text: svg('<path d="M4 6h16M4 12h16M4 18h10"/>'),
    kopiera: svg('<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/>'),
    skriv: svg('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'),
    grupper: svg('<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.6-3.4 2.8-5.5 5.5-5.5s4.9 2.1 5.5 5.5"/><path d="M14.5 14.6c.8-.5 1.6-.7 2.5-.7 2.3 0 4 1.8 4.5 4.6"/>', 64),
  };

  function ord(n, en, flera) { return n === 1 ? en : flera; }
  function talOrd(n) { return ['noll', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'][n] || String(n); }

  let toastTimer;
  function toast(txt) {
    const t = document.getElementById('toast');
    t.innerHTML = '';
    t.append(h('span', { class: 'tk', html: svg('<path d="m5 12 5 5 9-10"/>', 13).replace('stroke="currentColor"', 'stroke="#fff"') }), h('span', { text: txt }));
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('on'), 2600);
  }

  /* ================= 3. Vänsterpanelen ================= */

  const V = document.getElementById('vanster');
  function ritaVanster() {
    V.innerHTML = '';
    const l = lista();
    const sek = h('div', { class: 'sec' });
    sek.append(h('div', { class: 'sec-h' }, h('h2', { text: 'Klass' })));
    if (!S.listor.length) {
      sek.append(h('div', { class: 'tom' },
        h('p', { text: 'Börja med att skriva in eller klistra in namnen i klassen. Listan sparas i den här webbläsaren.' }),
        h('button', { class: 'primary', type: 'button', onclick: () => oppnaListDialog(null), html: IK.plus + '<span>Ny klasslista</span>' }),
        h('p', { class: 'hint', style: 'margin-top:12px' }, 'Har du en sparad fil? ', h('button', { class: 'lank', type: 'button', text: 'Öppna den', onclick: () => document.getElementById('filval').click() }), '.')));
      V.append(sek);
      return;
    }
    const sel = h('select', { 'aria-label': 'Välj klasslista', onchange: (e) => byttLista(e.target.value) },
      S.listor.map(x => h('option', { value: x.id, selected: x.id === S.vald, text: x.namn })));
    sek.append(h('div', { class: 'row' }, sel,
      h('button', { class: 'ib', type: 'button', title: 'Ny klasslista', 'aria-label': 'Ny klasslista', html: IK.plus, onclick: () => oppnaListDialog(null) }),
      h('button', { class: 'ib', type: 'button', title: 'Redigera listan', 'aria-label': 'Redigera listan', html: IK.penna, onclick: () => oppnaListDialog(l) }),
      h('button', { class: 'ib fara', type: 'button', title: 'Ta bort listan', 'aria-label': 'Ta bort listan', html: IK.sopor, onclick: taBortLista })));
    V.append(sek);

    const n = narvarande().length, tot = l.elever.length + tillf().length;
    const nv = h('div', { class: 'sec' });
    nv.append(h('div', { class: 'sec-h' }, h('h2', { text: 'Närvaro' }), h('span', { class: 'cnt', text: `${n} av ${tot} här` })));
    nv.append(h('div', { class: 'row', style: 'gap:12px' },
      h('button', { class: 'lank', type: 'button', text: 'Alla är här', onclick: () => { S.narvaro.borta[S.vald] = []; andratNarvaro(); } }),
      h('button', { class: 'lank', type: 'button', text: 'Ingen är här', onclick: () => { S.narvaro.borta[S.vald] = l.elever.map(e => e.id); andratNarvaro(); } })));
    const b = new Set(borta());
    const ul = h('ul', { class: 'elever' });
    for (const e of l.elever.slice().sort((x, y) => x.namn.localeCompare(y.namn, 'sv'))) {
      const har = !b.has(e.id);
      ul.append(h('li', null, h('label', { class: 'elev' + (har ? '' : ' borta') },
        h('input', { type: 'checkbox', checked: har, onchange: (ev) => vaxla(e.id, ev.target.checked) }),
        h('span', { class: 'nm', text: e.namn }))));
    }
    for (const e of tillf()) {
      ul.append(h('li', null, h('div', { class: 'elev' },
        h('input', { type: 'checkbox', checked: true, disabled: true }),
        h('span', { class: 'nm', text: e.namn }), h('span', { class: 'tag', text: 'i dag' }),
        h('button', { class: 'x', type: 'button', title: 'Ta bort', 'aria-label': 'Ta bort ' + e.namn, html: IK.kryss, onclick: () => taBortTillf(e.id) }))));
    }
    nv.append(ul);
    const inp = h('input', { class: 'inp', type: 'text', placeholder: 'Lägg till någon för i dag', 'aria-label': 'Lägg till en elev för i dag', autocomplete: 'off' });
    const lagg = () => {
      const t = inp.value.trim();
      if (!t) return;
      (S.tillfalliga[S.vald] = tillf()).push({ id: nyttId('t'), namn: t });
      andratNarvaro();
      const nytt = V.querySelector('.tillfallig .inp');
      if (nytt) nytt.focus();
    };
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); lagg(); } });
    nv.append(h('div', { class: 'tillfallig' }, inp, h('button', { class: 'ib', type: 'button', title: 'Lägg till', 'aria-label': 'Lägg till', html: IK.plus, onclick: lagg })));
    V.append(nv);
  }

  function vaxla(id, har) {
    const set = new Set(borta());
    if (har) set.delete(id); else set.add(id);
    S.narvaro.borta[S.vald] = [...set];
    andratNarvaro();
  }
  function taBortTillf(id) {
    S.tillfalliga[S.vald] = tillf().filter(e => e.id !== id);
    S.tillfVillkor = S.tillfVillkor.filter(v => v.a !== id && v.b !== id);
    andratNarvaro();
  }
  function andratNarvaro() { S.narvaro.datum = idag(); spara(); ritaVanster(); ritaHoger(); }

  function byttLista(id) {
    S.vald = id;
    S.tillfVillkor = [];
    S.grupper = null; S.varningar = [];
    spara(); ritaAllt();
  }
  function taBortLista() {
    const l = lista();
    if (!l || !confirm(`Ta bort klasslistan ${l.namn}? Det går inte att ångra, så spara den gärna som fil först.`)) return;
    S.listor = S.listor.filter(x => x.id !== l.id);
    delete S.narvaro.borta[l.id]; delete S.tillfalliga[l.id];
    S.vald = S.listor[0] ? S.listor[0].id : null;
    S.grupper = null; S.varningar = [];
    spara(); ritaAllt();
  }

  // Dialogen för ny/redigerad lista. Namnen skrivs en per rad; vid redigering
  // behåller oförändrade namn sitt id, så att villkor och närvaro följer med.
  const D = document.getElementById('listDialog');
  const dNamn = document.getElementById('listNamn'), dElever = document.getElementById('listElever'), dAntal = document.getElementById('listAntal');
  let redigerar = null;
  const radNamn = () => dElever.value.split(/\r?\n/).map(s => s.replace(/\t/g, ' ').trim()).filter(Boolean);
  function rakna() { const n = radNamn().length; dAntal.textContent = `${n} ${ord(n, 'elev', 'elever')}`; }
  dElever.addEventListener('input', rakna);
  function oppnaListDialog(l) {
    redigerar = l;
    document.getElementById('listDialogRubrik').textContent = l ? 'Redigera klasslistan' : 'Ny klasslista';
    dNamn.value = l ? l.namn : '';
    dElever.value = l ? l.elever.map(e => e.namn).join('\n') : '';
    rakna();
    if (D.showModal) D.showModal(); else D.setAttribute('open', '');
    (l ? dElever : dNamn).focus();
  }
  document.getElementById('listAvbryt').addEventListener('click', () => D.close());
  document.getElementById('listForm').addEventListener('submit', (e) => {
    const namn = dNamn.value.trim(), rader = radNamn();
    if (!namn || !rader.length) { e.preventDefault(); (namn ? dElever : dNamn).focus(); return; }
    if (redigerar) {
      const kvar = redigerar.elever.slice();
      const elever = rader.map(n => {
        const i = kvar.findIndex(x => x.namn === n);
        return i >= 0 ? kvar.splice(i, 1)[0] : { id: nyttId(), namn: n };
      });
      const ids = new Set(elever.map(x => x.id));
      redigerar.namn = namn;
      redigerar.elever = elever;
      redigerar.villkor = (redigerar.villkor || []).filter(v => ids.has(v.a) && ids.has(v.b));
      redigerar.uppdaterad = Date.now();
      toast('Klasslistan är sparad');
    } else {
      const l = { id: nyttId('k'), namn, elever: rader.map(n => ({ id: nyttId(), namn: n })), villkor: [], uppdaterad: Date.now() };
      S.listor.push(l);
      S.vald = l.id;
      S.grupper = null; S.varningar = [];
      toast(`${namn} är skapad med ${rader.length} ${ord(rader.length, 'elev', 'elever')}`);
    }
    S.listor.sort((a, b) => a.namn.localeCompare(b.namn, 'sv', { numeric: true }));
    spara(); ritaAllt();
  });

  /* ================= 4. Högerpanelen ================= */

  const H = document.getElementById('hoger');
  let villkorForm = false;
  function ritaHoger() {
    H.innerHTML = '';
    const i = S.inst, n = narvarande().length;

    const sek = h('div', { class: 'sec' });
    sek.append(h('div', { class: 'sec-h' }, h('h2', { text: 'Grupperna' })));
    sek.append(h('div', { class: 'seg', role: 'group', 'aria-label': 'Ange gruppstorlek som' },
      h('button', { type: 'button', class: i.lage === 'storlek' ? 'on' : '', text: 'Elever per grupp', onclick: () => satt({ lage: 'storlek' }) }),
      h('button', { type: 'button', class: i.lage === 'antal' ? 'on' : '', text: 'Antal grupper', onclick: () => satt({ lage: 'antal' }) })));
    const varde = i.lage === 'antal' ? i.antal : i.storlek;
    const min = i.lage === 'antal' ? 1 : 2, max = 30;
    const steg = (d) => satt(i.lage === 'antal' ? { antal: Math.min(max, Math.max(min, i.antal + d)) } : { storlek: Math.min(max, Math.max(min, i.storlek + d)) });
    sek.append(h('div', { class: 'stepper' },
      h('button', { type: 'button', 'aria-label': 'Minska', html: IK.minus, disabled: varde <= min, onclick: () => steg(-1) }),
      h('div', { class: 'val', 'aria-live': 'polite' }, h('b', { text: String(varde) }), h('span', { text: i.lage === 'antal' ? ord(varde, 'grupp', 'grupper') : 'per grupp' })),
      h('button', { type: 'button', 'aria-label': 'Öka', html: IK.plus, disabled: varde >= max, onclick: () => steg(1) })));
    if (i.lage === 'storlek') {
      sek.append(h('span', { class: 'lbl', text: 'Om det inte går jämnt ut' }));
      sek.append(h('div', { class: 'radio' },
        h('label', null, h('input', { type: 'radio', name: 'avr', checked: i.avrunda === 'storre', onchange: () => satt({ avrunda: 'storre' }) }), 'Hellre några större grupper'),
        h('label', null, h('input', { type: 'radio', name: 'avr', checked: i.avrunda === 'mindre', onchange: () => satt({ avrunda: 'mindre' }) }), 'Hellre några mindre grupper')));
    }
    sek.append(h('p', { class: 'forhands', html: forhandsText(n) }));
    H.append(sek);

    // Villkor
    const l = lista();
    const vs = h('div', { class: 'sec' });
    const alla = l ? (l.villkor || []).map(v => Object.assign({ alltid: true }, v)).concat(S.tillfVillkor) : [];
    vs.append(h('div', { class: 'sec-h' }, h('h2', { text: 'Villkor' }),
      l && !villkorForm ? h('button', { class: 'lank', type: 'button', text: 'Lägg till', disabled: l.elever.length + tillf().length < 2, onclick: () => { villkorForm = true; ritaHoger(); } }) : null));
    if (alla.length) {
      vs.append(h('ul', { class: 'villkor' }, alla.map(v => h('li', null,
        h('span', { class: 'ik ' + v.typ, html: v.typ === 'ihop' ? IK.ihop : IK.isar }),
        h('span', { class: 'txt' }, `${namnPa(v.a)} och ${namnPa(v.b)}`,
          h('small', { text: (v.typ === 'ihop' ? 'Tillsammans' : 'Hålls isär') + (v.alltid ? ', alltid' : ', bara nästa slumpning') })),
        h('button', { class: 'x', type: 'button', title: 'Ta bort villkoret', 'aria-label': 'Ta bort villkoret', html: IK.kryss, onclick: () => taBortVillkor(v) })))));
    } else if (!villkorForm) {
      vs.append(h('p', { class: 'hint', style: 'margin:0', text: 'Ska två elever arbeta tillsammans eller hållas isär? Lägg till ett villkor, så tas hänsyn till det när grupperna slumpas.' }));
    }
    if (villkorForm && l) vs.append(byggVillkorForm(l));
    H.append(vs);

    // Slumpa
    const sl = h('div', { class: 'sec' });
    sl.append(h('button', { class: 'primary slumpa', type: 'button', id: 'slumpaKnapp', disabled: n < 2, html: IK.slump + '<span>' + (S.grupper ? 'Slumpa om' : 'Slumpa grupper') + '</span>', onclick: slumpa }));
    if (n < 2) sl.append(h('p', { class: 'hint', style: 'text-align:center', text: l ? 'Minst två elever behöver vara här.' : 'Skapa en klasslista först.' }));
    H.append(sl);
  }

  function forhandsText(n) {
    if (n < 2) return 'Grupperna visas här när minst två elever är markerade som närvarande.';
    const k = antalGrupper(n), st = storlekar(n, k);
    const stor = st[0], liten = st[st.length - 1];
    let delar;
    if (stor === liten) delar = `${talOrd(k)} ${ord(k, 'grupp', 'grupper')} med ${talOrd(stor)} ${ord(stor, 'elev', 'elever')}`;
    else {
      const ns = st.filter(x => x === stor).length, nl = k - ns;
      delar = `${talOrd(k)} grupper: ${talOrd(ns)} med ${talOrd(stor)} elever och ${talOrd(nl)} med ${talOrd(liten)}`;
    }
    return `<b>${n} elever</b> blir ${delar}.`;
  }

  function satt(andring) { Object.assign(S.inst, andring); spara(); ritaHoger(); }

  function byggVillkorForm(l) {
    const elever = l.elever.concat(tillf()).slice().sort((x, y) => x.namn.localeCompare(y.namn, 'sv'));
    const opt = (ph) => [h('option', { value: '', text: ph })].concat(elever.map(e => h('option', { value: e.id, text: e.namn })));
    const a = h('select', { 'aria-label': 'Första eleven' }, opt('Välj en elev'));
    const b = h('select', { 'aria-label': 'Andra eleven' }, opt('Välj en elev till'));
    let typ = 'ihop', alltid = true;
    const segTyp = h('div', { class: 'seg', role: 'group', 'aria-label': 'Typ av villkor' });
    const segTid = h('div', { class: 'seg', role: 'group', 'aria-label': 'Hur länge villkoret gäller' });
    const ritaSeg = () => {
      segTyp.innerHTML = ''; segTid.innerHTML = '';
      segTyp.append(h('button', { type: 'button', class: typ === 'ihop' ? 'on' : '', text: 'Tillsammans', onclick: () => { typ = 'ihop'; ritaSeg(); } }),
                    h('button', { type: 'button', class: typ === 'isar' ? 'on' : '', text: 'Hålls isär', onclick: () => { typ = 'isar'; ritaSeg(); } }));
      segTid.append(h('button', { type: 'button', class: alltid ? 'on' : '', text: 'Alltid', onclick: () => { alltid = true; ritaSeg(); } }),
                    h('button', { type: 'button', class: !alltid ? 'on' : '', text: 'Bara nästa gång', onclick: () => { alltid = false; ritaSeg(); } }));
    };
    ritaSeg();
    const lagg = () => {
      if (!a.value || !b.value) { (a.value ? b : a).focus(); return; }
      if (a.value === b.value) { b.focus(); return; }
      const nyckel = [a.value, b.value].sort().join('|');
      const finns = (l.villkor || []).concat(S.tillfVillkor).some(v => [v.a, v.b].sort().join('|') === nyckel);
      if (finns) { toast('De två har redan ett villkor'); return; }
      const v = { id: nyttId('v'), a: a.value, b: b.value, typ };
      const tillfalligElev = a.value.startsWith('t') && tillf().some(e => e.id === a.value) || b.value.startsWith('t') && tillf().some(e => e.id === b.value);
      if (alltid && !tillfalligElev) { (l.villkor = l.villkor || []).push(v); l.uppdaterad = Date.now(); }
      else S.tillfVillkor.push(v);
      villkorForm = false; spara(); ritaHoger();
    };
    return h('div', { class: 'vform' }, a, b, segTyp, segTid,
      h('div', { class: 'knappar' },
        h('button', { class: 'ghost', type: 'button', text: 'Avbryt', onclick: () => { villkorForm = false; ritaHoger(); } }),
        h('button', { class: 'primary', type: 'button', text: 'Lägg till', onclick: lagg })));
  }

  function taBortVillkor(v) {
    const l = lista();
    if (l && l.villkor) l.villkor = l.villkor.filter(x => x.id !== v.id);
    S.tillfVillkor = S.tillfVillkor.filter(x => x.id !== v.id);
    spara(); ritaHoger();
  }

  /* ================= 5. Arket med grupperna ================= */

  const A = document.getElementById('ark');
  const minskadRorelse = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let slumpar = false;

  function slumpa() {
    const elever = narvarande();
    if (elever.length < 2 || slumpar) return;
    const l = lista();
    const k = antalGrupper(elever.length);
    const res = slumpaMedVillkor(elever, k, ((l && l.villkor) || []).concat(S.tillfVillkor));
    S.tillfVillkor = [];
    S.grupper = res.grupper.map(g => ({ id: nyttId('g'), elever: g }));
    S.varningar = res.varn;
    vald = null;
    spara();
    ritaHoger();
    if (window.innerWidth <= 980) A.scrollIntoView({ behavior: minskadRorelse ? 'auto' : 'smooth', block: 'start' });
    if (minskadRorelse) { ritaArk(true); return; }

    // Slumpanimation: namnen snurrar runt i korten en stund innan de landar.
    slumpar = true;
    const storl = S.grupper.map(g => g.elever.length);
    const t0 = performance.now();
    const snurra = () => {
      const t = performance.now() - t0;
      if (t > 750) { slumpar = false; ritaArk(true); return; }
      const b = blanda(elever);
      let i = 0;
      ritaArk(false, storl.map(s => { const g = b.slice(i, i + s); i += s; return g; }));
      setTimeout(snurra, 55 + t / 14);
    };
    snurra();
  }

  function ritaArk(landa, snurrGrupper) {
    A.innerHTML = '';
    const l = lista();
    if (!S.grupper || !S.grupper.length) {
      A.append(h('div', { class: 'ark-tom' }, h('div', null,
        h('div', { html: IK.grupper }),
        h('h3', { text: l ? 'Redo att slumpa' : 'Inga grupper än' }),
        h('p', { text: l ? 'Välj gruppstorlek till höger och tryck på Slumpa grupper. Grupperna visas här.' : 'Skapa en klasslista till vänster, eller öppna en fil som du sparat tidigare.' }))));
      return;
    }
    const antal = S.grupper.reduce((s, g) => s + g.elever.length, 0);
    A.append(h('div', { class: 'ark-h' },
      h('h2', { text: l ? l.namn : 'Grupper' }),
      h('span', { class: 'info', text: `${S.grupper.length} ${ord(S.grupper.length, 'grupp', 'grupper')}, ${antal} elever` }),
      h('div', { class: 'ark-knappar' }, iStorskarm()
        ? [h('button', { class: 'ghost', type: 'button', title: 'Slumpa nya grupper', html: IK.slump.replace('width="20" height="20"', 'width="16" height="16"') + '<span>Slumpa om</span>', onclick: slumpa }),
           h('button', { class: 'ghost', type: 'button', title: 'Tillbaka till vanlig vy', html: IK.skarmUt + '<span>Avsluta</span>', onclick: storskarm })]
        : [h('button', { class: 'ghost', type: 'button', title: 'Visa grupperna på hela skärmen', html: IK.skarm + '<span>Storskärm</span>', onclick: storskarm }),
           h('button', { class: 'ghost', type: 'button', title: 'Ta bort grupperna', text: 'Rensa', onclick: () => { S.grupper = null; S.varningar = []; spara(); ritaArk(); ritaHoger(); } })])));
    if (S.varningar.length && !snurrGrupper) A.append(h('div', { class: 'varning', role: 'note' }, S.varningar.map(v => h('p', { text: v }))));

    const nat = h('div', { class: 'grupper' + (snurrGrupper ? ' snurr' : '') });
    const lista_ = snurrGrupper || S.grupper.map(g => g.elever);
    lista_.forEach((elever, gi) => {
      const g = S.grupper[gi];
      const kort = h('div', { class: 'grupp' + (landa ? ' in' : ''), style: `--g:${FARGER[gi % FARGER.length]};` + (landa ? `animation-delay:${gi * 60}ms` : ''), 'data-g': gi });
      kort.append(h('div', { class: 'grupp-h' },
        h('span', { class: 'nr', text: String(gi + 1) }),
        h('span', { class: 'gn', text: 'Grupp ' + (gi + 1) }),
        h('span', { class: 'gc', text: `${elever.length} ${ord(elever.length, 'elev', 'elever')}` })));
      const ul = h('ul', { class: 'namn' });
      elever.forEach((e, ei) => ul.append(h('li', { text: e.namn, 'data-g': gi, 'data-e': ei, tabindex: snurrGrupper ? null : '0', class: vald && vald.g === gi && vald.e === ei ? 'vald' : null })));
      kort.append(ul);
      nat.append(kort);
      if (!snurrGrupper) g.id = g.id || nyttId('g');
    });
    A.append(nat);
    if (iStorskarm()) passaStorskarm(nat);
    if (!snurrGrupper) {
      A.append(h('p', { class: 'tips', text: 'Dra ett namn till en annan grupp, eller släpp det på ett namn så byter de plats. På en pekskärm trycker du först på namnet och sedan dit det ska.' }));
      if (vald) A.querySelectorAll('.grupp').forEach(k => { if (+k.dataset.g !== vald.g) k.classList.add('kan-ta-emot'); });
    }
  }

  // Flytta eller byta. mal = { g, e } (e saknas när man släpper på ett kort).
  function flytta(fran, mal) {
    if (!mal || (mal.g === fran.g && (mal.e == null || mal.e === fran.e))) return false;
    const G = S.grupper;
    if (mal.e != null) {
      const x = G[fran.g].elever[fran.e];
      G[fran.g].elever[fran.e] = G[mal.g].elever[mal.e];
      G[mal.g].elever[mal.e] = x;
    } else {
      const [x] = G[fran.g].elever.splice(fran.e, 1);
      G[mal.g].elever.push(x);
      if (!G[fran.g].elever.length) G.splice(fran.g, 1);
    }
    S.varningar = [];
    spara();
    return true;
  }

  function malVid(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el || !A.contains(el)) return null;
    const li = el.closest('.namn li');
    if (li) return { g: +li.dataset.g, e: +li.dataset.e, el: li };
    const k = el.closest('.grupp');
    if (k) return { g: +k.dataset.g, el: k };
    return null;
  }

  // Dra med mus/penna; tryck-tryck på pekskärm (och som tangentbordsväg).
  let vald = null, drag = null, senastTyp = 'mouse';
  A.addEventListener('pointerdown', (e) => {
    senastTyp = e.pointerType;
    const li = e.target.closest('.namn li');
    if (!li || slumpar || e.button !== 0 || e.pointerType === 'touch') return;
    e.preventDefault();
    drag = { fran: { g: +li.dataset.g, e: +li.dataset.e }, li, x: e.clientX, y: e.clientY, igang: false, spok: null, mal: null };
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (!drag.igang) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
      drag.igang = true;
      drag.li.classList.add('dras');
      drag.spok = h('div', { class: 'spok', text: drag.li.textContent });
      document.body.append(drag.spok);
    }
    drag.spok.style.left = e.clientX + 'px';
    drag.spok.style.top = e.clientY + 'px';
    const m = malVid(e.clientX, e.clientY);
    if (drag.mal && drag.mal.el) drag.mal.el.classList.remove('mal');
    drag.mal = m && !(m.g === drag.fran.g && (m.e == null || m.e === drag.fran.e)) ? m : null;
    if (drag.mal) drag.mal.el.classList.add('mal');
  });
  window.addEventListener('pointerup', (e) => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.spok) d.spok.remove();
    if (!d.igang) { klick(d.fran); return; }
    const m = malVid(e.clientX, e.clientY);
    vald = null;
    flytta(d.fran, m);
    ritaArk();
  });
  // Pekskärm: bara tryck, så att sidan fortfarande går att skrolla.
  A.addEventListener('click', (e) => {
    if (slumpar) return;
    const li = e.target.closest('.namn li');
    const k = e.target.closest('.grupp');
    if (li && senastTyp === 'touch') klick({ g: +li.dataset.g, e: +li.dataset.e });
    else if (!li && k && vald) { const v = vald; vald = null; flytta(v, { g: +k.dataset.g }); ritaArk(); }
  });
  A.addEventListener('keydown', (e) => {
    const li = e.target.closest('.namn li');
    if (li && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); klick({ g: +li.dataset.g, e: +li.dataset.e }); }
    if (e.key === 'Escape' && vald) { vald = null; ritaArk(); }
  });
  function klick(p) {
    if (vald && vald.g === p.g && vald.e === p.e) vald = null;
    else if (vald) { const v = vald; vald = null; flytta(v, p); }
    else vald = p;
    ritaArk();
    if (vald) { const el = A.querySelector(`.namn li[data-g="${p.g}"][data-e="${p.e}"]`); if (el) el.focus({ preventScroll: true }); }
  }

  // Storskärm: grupperna ska fylla skärmen, centrerade. Prövar varje
  // kolumnantal och väljer det som ger störst text, med hänsyn till den
  // största gruppen och det bredaste namnet. Måtten nedan (i em av
  // textstorleken f) hör ihop med .ark.fs-reglerna i slumpa-grupper.html;
  // ändras paddingen där ska talen här följa med.
  const iStorskarm = () => (document.fullscreenElement || document.webkitFullscreenElement) === A;
  let matCtx;
  function bredd(txt, vikt) {
    matCtx = matCtx || document.createElement('canvas').getContext('2d');
    matCtx.font = vikt + ' 100px "DM Sans", system-ui, sans-serif';
    return matCtx.measureText(txt).width / 100;
  }
  function passaStorskarm(nat) {
    const k = S.grupper.length;
    const alla = S.grupper.flatMap(g => g.elever);
    const maxN = Math.max(1, ...S.grupper.map(g => g.elever.length));
    const namnB = Math.max(...alla.map(e => bredd(e.namn, 400)));
    const huvB = 1.5 + 0.5 + bredd('Grupp ' + k, 600) + 1.4;   // antalet elever visas inte på storskärm
    const enhetB = Math.max(namnB + 2.75, huvB) * 1.05;   // kortets bredd i em
    const enhetH = 3.25 + 2.2 * maxN;                      // kortets höjd i em
    // Mät ytan utan förra passningens maxbredd, annars krymper den för varje
    // gång (vid resize) och korten bryts om till fler rader än beräknat.
    nat.style.removeProperty('--maxw');
    // clientWidth avrundar till hela pixlar, ibland uppåt: 1804,8 blev 1805
    // och tre kort bröts om till två rader. Mät exakt och lämna en pixel.
    const yta = nat.getBoundingClientRect();
    const W = Math.floor(yta.width) - 1, H = Math.floor(yta.height) - 1;
    const gap = Math.round(Math.min(32, Math.max(14, W * 0.014)));
    let bast = { f: 0 };
    for (let c = 1; c <= k; c++) {
      const r = Math.ceil(k / c);
      const cw = (W - (c - 1) * gap) / c, ch = (H - (r - 1) * gap) / r;
      const f = Math.min((cw - 4) / enhetB, (ch - 6) / enhetH, 76);
      // Störst text vinner, men en layout som bara fyller halva höjden får
      // stryka på foten: sex grupper på en rad med ett tomt band över och
      // under ser sämre ut än 3 × 2 med nästan lika stor text.
      const fyllnad = Math.min(1, (r * Math.min(ch, enhetH * f + 6) + (r - 1) * gap) / H);
      const poang = f * Math.pow(fyllnad, 0.35);
      if (poang > (bast.poang || 0) + 0.01) bast = { f, c, cw, ch, poang };
    }
    // Korten blir lagom breda för sitt innehåll (med lite luft) i stället
    // för att sträckas ut, och lika höga, så att raderna blir jämna.
    const satt = (f) => {
      const kortB = Math.floor(Math.min(bast.cw, Math.max(enhetB * f * 1.6, f * 10)));
      const kortH = Math.floor(Math.min(bast.ch, enhetH * f + 6));
      nat.style.setProperty('--f', f + 'px');
      nat.style.setProperty('--gap', gap + 'px');
      nat.style.setProperty('--cw', kortB + 'px');
      nat.style.setProperty('--ch', kortH + 'px');
      // Begränsa radens bredd så att flexen bryter efter exakt c kort.
      nat.style.setProperty('--maxw', Math.min(W, bast.c * kortB + (bast.c - 1) * gap + 1) + 'px');
    };
    // Uppskattningen ovan kan slå fel på någon pixel (teckensnitt, rundning).
    // Krymp då texten tills inget spiller över, varken ytan eller ett kort.
    let f = Math.max(12, Math.floor(bast.f));
    for (let i = 0; i < 24; i++) {
      satt(f);
      const spiller = nat.scrollHeight > nat.clientHeight + 1 ||
        [...nat.children].some(k => k.scrollHeight > k.clientHeight + 1 || k.scrollWidth > k.clientWidth + 1);
      if (!spiller || f <= 12) break;
      f = Math.max(12, Math.floor(f * 0.96));
    }
  }
  function bytteStorskarm() { A.classList.toggle('fs', iStorskarm()); vald = null; if (S.grupper) ritaArk(); }
  document.addEventListener('fullscreenchange', bytteStorskarm);
  document.addEventListener('webkitfullscreenchange', bytteStorskarm);
  let fsTimer;
  window.addEventListener('resize', () => {
    if (!iStorskarm()) return;
    clearTimeout(fsTimer);
    fsTimer = setTimeout(() => { const n = A.querySelector('.grupper'); if (n) passaStorskarm(n); }, 80);
  });

  function storskarm() {
    const el = A;
    if (iStorskarm()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    const f = el.requestFullscreen || el.webkitRequestFullscreen;
    if (f) f.call(el);
  }

  /* ================= 6. Filer och export ================= */

  const filnamn = (s) => s.replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, ' ').trim();
  function ladda(namn, typ, innehall) {
    const blob = new Blob([innehall], { type: typ });
    const a = h('a', { href: URL.createObjectURL(blob), download: namn });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function klassData(l) {
    return { id: l.id, namn: l.namn, elever: l.elever.map(e => ({ id: e.id, namn: e.namn })), villkor: (l.villkor || []).map(v => ({ id: v.id, a: v.a, b: v.b, typ: v.typ })) };
  }
  function sparaGrupperFil() {
    const l = lista();
    if (!S.grupper) { if (l) sparaListaFil(); return; }
    const data = { format: FORMAT, version: 1, sparad: new Date().toISOString() };
    if (l) data.klass = klassData(l);
    data.grupper = S.grupper.map((g, i) => ({ namn: 'Grupp ' + (i + 1), elever: g.elever.map(e => ({ id: e.id, namn: e.namn })) }));
    ladda(filnamn(`Grupper ${l ? l.namn + ' ' : ''}${idag()}.json`), 'application/json', JSON.stringify(data, null, 2));
    toast('Grupperna är sparade som fil');
  }
  function sparaListaFil() {
    const l = lista();
    if (!l) return;
    ladda(filnamn(`Klasslista ${l.namn}.json`), 'application/json',
      JSON.stringify({ format: FORMAT, version: 1, sparad: new Date().toISOString(), klass: klassData(l) }, null, 2));
    toast('Klasslistan är sparad som fil');
  }
  function somText() {
    const l = lista();
    const rader = [(l ? l.namn + ', ' : '') + new Date().toLocaleDateString('sv-SE'), ''];
    S.grupper.forEach((g, i) => { rader.push('Grupp ' + (i + 1)); g.elever.forEach(e => rader.push('  ' + e.namn)); rader.push(''); });
    return rader.join('\n').trimEnd() + '\n';
  }
  async function kopieraText() {
    const t = somText();
    try { await navigator.clipboard.writeText(t); }
    catch (e) {
      const ta = h('textarea', { style: 'position:fixed;opacity:0' }); ta.value = t;
      document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    toast('Grupperna är kopierade. Klistra in dem där du vill.');
  }

  const meny = document.getElementById('sparaMeny'), merBtn = document.getElementById('merBtn');
  function ritaMeny() {
    const g = !!S.grupper, l = !!lista();
    const rad = (ik, t, s, fn, av) => h('button', { type: 'button', role: 'menuitem', disabled: !av, onclick: () => { stangMeny(); fn(); } },
      h('span', { html: ik }), h('span', null, h('span', { class: 'mt', text: t }), h('span', { class: 'ms', text: s })));
    meny.innerHTML = '';
    meny.append(
      rad(IK.fil, 'Spara grupperna som fil', 'Grupperna och klasslistan. Öppna filen igen för att fortsätta.', sparaGrupperFil, g),
      rad(IK.lista, 'Spara klasslistan som fil', 'För att flytta listan till en annan dator.', sparaListaFil, l),
      h('hr'),
      rad(IK.text, 'Spara som textfil', 'Grupperna som vanlig text (.txt).', () => { ladda(filnamn(`Grupper ${lista() ? lista().namn + ' ' : ''}${idag()}.txt`), 'text/plain;charset=utf-8', somText()); toast('Textfilen är sparad'); }, g),
      rad(IK.kopiera, 'Kopiera som text', 'Klistra in i ett mejl, ett dokument eller en lärplattform.', kopieraText, g),
      rad(IK.skriv, 'Skriv ut', 'Bara grupperna, tre kort i bredd.', () => window.print(), g));
  }
  function stangMeny() { meny.classList.remove('open'); merBtn.setAttribute('aria-expanded', 'false'); }
  merBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (meny.classList.contains('open')) { stangMeny(); return; }
    ritaMeny(); meny.classList.add('open'); merBtn.setAttribute('aria-expanded', 'true');
  });
  document.addEventListener('click', (e) => { if (!meny.contains(e.target)) stangMeny(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') stangMeny(); });
  document.getElementById('sparaBtn').addEventListener('click', () => {
    if (S.grupper) sparaGrupperFil();
    else if (lista()) sparaListaFil();
    else toast('Det finns inget att spara än');
  });

  // Öppna fil: .json från verktyget, eller en textfil med ett namn per rad.
  const filval = document.getElementById('filval');
  document.getElementById('oppnaBtn').addEventListener('click', () => filval.click());
  filval.addEventListener('change', async () => {
    const f = filval.files && filval.files[0];
    filval.value = '';
    if (!f) return;
    let txt;
    try { txt = await f.text(); } catch (e) { alert('Filen gick inte att läsa.'); return; }
    let data = null;
    try { data = JSON.parse(txt); } catch (e) { /* inte JSON: läs som namnlista */ }
    if (data && data.format === FORMAT) oppnaData(data);
    else if (!data) {
      const namn = txt.split(/\r?\n/).map(s => s.replace(/\t/g, ' ').trim()).filter(Boolean);
      if (!namn.length) { alert('Filen innehåller inga namn.'); return; }
      oppnaListDialog(null);
      dNamn.value = f.name.replace(/\.[^.]+$/, '');
      dElever.value = namn.join('\n');
      rakna();
    } else alert('Filen kommer inte från Slumpa grupper och går inte att öppna här.');
  });

  function oppnaData(d) {
    if (d.klass && Array.isArray(d.klass.elever)) {
      const k = d.klass;
      const ny = {
        id: k.id || nyttId('k'), namn: String(k.namn || 'Klasslista'),
        elever: k.elever.filter(e => e && e.namn).map(e => ({ id: String(e.id || nyttId()), namn: String(e.namn) })),
        villkor: (k.villkor || []).filter(v => v && v.a && v.b && (v.typ === 'ihop' || v.typ === 'isar')).map(v => ({ id: v.id || nyttId('v'), a: v.a, b: v.b, typ: v.typ })),
        uppdaterad: Date.now(),
      };
      const i = S.listor.findIndex(l => l.id === ny.id);
      if (i >= 0) S.listor[i] = ny; else S.listor.push(ny);
      S.listor.sort((a, b) => a.namn.localeCompare(b.namn, 'sv', { numeric: true }));
      S.vald = ny.id;
      S.tillfVillkor = [];
    }
    if (Array.isArray(d.grupper) && d.grupper.length) {
      S.grupper = d.grupper.map(g => ({ id: nyttId('g'), elever: (g.elever || []).filter(e => e && e.namn).map(e => ({ id: String(e.id || nyttId()), namn: String(e.namn) })) })).filter(g => g.elever.length);
      S.varningar = [];
    } else S.grupper = null;
    vald = null;
    spara(); ritaAllt(true);
    toast(S.grupper ? 'Grupperna är öppnade' : 'Klasslistan är öppnad');
  }

  /* ================= Start ================= */

  function ritaAllt(landa) { ritaVanster(); ritaHoger(); ritaArk(landa); }
  las();
  ritaAllt(true);
})();

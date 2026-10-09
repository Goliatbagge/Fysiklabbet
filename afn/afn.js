/* ÄFN – renderar förstasida, sektionssidor och artikelsidor ur artiklar.js. */
(function () {
  'use strict';

  const SEKTIONSORDNING = ['Nyheter', 'Lokalt', 'Sverige', 'Världen', 'Politik', 'Ekonomi', 'Vetenskap',
    'Teknik', 'Hälsa', 'Sport', 'Nöje', 'Kultur', 'Mat', 'Resor', 'Djur', 'Debatt'];

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Inline-format: **fet** och *kursiv*, efter escaping.
  const inl = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  const slug = (s) => String(s).toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/é/g, 'e').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const hash = (s) => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

  /* ---------- Data ---------- */
  const NU = Date.now();
  const artiklar = (window.AFN_ARTIKLAR || []).filter((a) => a && a.rubrik);
  const sedda = {};
  artiklar.forEach((a, i) => {
    a.kategori = a.kategori || 'Nyheter';
    let id = a.id || slug(a.rubrik).slice(0, 70).replace(/-+$/, '') || 'artikel';
    const bas = id; let n = 2;
    while (sedda[id]) id = bas + '-' + n++;
    sedda[id] = true; a.id = id;
    const h = hash(id);
    // Utan angiven tid: publicerad strax före sidvisningen, i den ordning artiklarna står.
    a._tid = a.publicerad ? new Date(a.publicerad) : new Date(NU - (3 + i * 11 + (h % 9)) * 60000);
    if (a.uppdaterad) a._uppd = new Date(a.uppdaterad);
    else if (h % 3 === 0) {
      const u = a._tid.getTime() + (6 + (h % 35)) * 60000;
      if (u < NU) a._uppd = new Date(u);
    }
  });
  const efterTid = artiklar.slice().sort((x, y) => y._tid - x._tid);

  const kategorier = [];
  SEKTIONSORDNING.forEach((k) => { if (artiklar.some((a) => a.kategori === k)) kategorier.push(k); });
  artiklar.forEach((a) => { if (!kategorier.includes(a.kategori)) kategorier.push(a.kategori); });

  /* ---------- Tid ---------- */
  const klock = (d) => String(d.getHours()).padStart(2, '0') + '.' + String(d.getMinutes()).padStart(2, '0');
  const sammaDag = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  function datumText(d) {
    const idag = new Date(NU); const igar = new Date(NU - 864e5);
    if (sammaDag(d, idag)) return 'i dag ' + klock(d);
    if (sammaDag(d, igar)) return 'i går ' + klock(d);
    return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + klock(d);
  }
  function relativ(d) {
    const min = Math.round((NU - d) / 60000);
    if (min < 1) return 'Nyss';
    if (min < 60) return min + ' min';
    return datumText(d).replace(/^i dag /, '');
  }
  const lastid = (a) => Math.max(1, Math.round((String(a.brodtext || '') + ' ' + (a.ingress || '')).split(/\s+/).length / 200));

  /* ---------- Byggblock ---------- */
  const lank = (a) => '?artikel=' + encodeURIComponent(a.id);
  const sektLank = (k) => '?sektion=' + encodeURIComponent(slug(k));
  const plus = (a) => (a.plus ? '<span class="plus-badge">ÄFN+</span>' : '');
  const etikett = (a) => (a.etikett ? '<span class="etikett">' + esc(a.etikett.replace(/:?\s*$/, '')) + ':</span> ' : '');
  const rubrikHtml = (a) => plus(a) + etikett(a) + inl(a.rubrik);
  const vinjett = (a) => esc(a.vinjett || a.kategori);

  function bild(a, ladda) {
    if (!a.bild) return '';
    const pos = a.bildFokus ? ' style="object-position:' + esc(a.bildFokus) + '"' : '';
    return '<div class="bildram"><img src="' + esc(a.bild) + '" alt="' + esc(a.bildtext || '') + '"' + pos +
      (ladda === 'direkt' ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></div>';
  }
  function metaRad(a) {
    const min = (NU - a._tid) / 60000;
    return '<div class="meta">' + (min < 30 ? '<span class="ny">' + relativ(a._tid) + '</span>' : relativ(a._tid)) +
      ' · ' + esc(a.kategori) + '</div>';
  }
  function hero(a) {
    return '<a class="hero' + (a.bild ? '' : ' utan-bild') + '" href="' + lank(a) + '">' + bild(a, 'direkt') +
      '<div class="hero-text"><div class="vinjett">' + vinjett(a) + '</div>' +
      '<h2 class="rubrik">' + rubrikHtml(a) + '</h2>' +
      (a.ingress ? '<p class="ingress">' + inl(a.ingress) + '</p>' : '') + metaRad(a) + '</div></a>';
  }
  function kort(a, extra) {
    return '<a class="kort' + (a.bild ? '' : ' utan-bild') + (extra ? ' ' + extra : '') + '" href="' + lank(a) + '">' +
      bild(a) + '<div class="vinjett">' + vinjett(a) + '</div><h3 class="rubrik">' + rubrikHtml(a) + '</h3>' +
      (a.ingress && (extra === 'stor' || !a.bild) ? '<p class="ingress">' + inl(a.ingress) + '</p>' : '') + metaRad(a) + '</a>';
  }
  function senasteRuta(antal) {
    return '<section class="ruta"><h3><span class="prick"></span>Senaste nytt</h3><ul class="senaste-lista">' +
      efterTid.slice(0, antal).map((a) => '<li><a href="' + lank(a) + '"><time>' + klock(a._tid) + '</time><span>' +
        esc(a.rubrik) + '</span></a></li>').join('') + '</ul></section>';
  }
  function mestLastRuta(utom) {
    const lista = artiklar.filter((a) => a !== utom).sort((x, y) => hash(x.id + 'läst') - hash(y.id + 'läst')).slice(0, 5);
    if (!lista.length) return '';
    return '<section class="ruta"><h3>Mest läst</h3><ol class="mest-lista">' +
      lista.map((a, i) => '<li><a href="' + lank(a) + '"><span class="nr">' + (i + 1) + '</span><span class="t">' +
        esc(a.rubrik) + '</span></a></li>').join('') + '</ol></section>';
  }
  const annons = '<div class="annons"><div class="annons-etikett">Annons</div><div class="annons-innehall">' +
    '<b>Kvantkaffe</b><span>Kaffet som är både bryggt och obryggt – tills du öppnar burken.</span><i>Beställ nu</i></div></div>';
  const plusRuta = '<div class="plus-ruta"><b>Läs allt på ÄFN+</b><p>Granskningar, avslöjanden och nyheter som ingen annan har.</p>' +
    '<button data-toast="Tyvärr – ÄFN+ är fullbokat just nu.">Bli medlem</button></div>';

  // Ett dubbelbrett första kort bara när raderna då går jämnt ut i tre kolumner.
  const storPasse = (g) => g.length >= 2 && (g.length - 2) % 3 === 0 && !!g[0].bild;

  /* ---------- Sidor ---------- */
  function forstasida() {
    if (!artiklar.length) return '<div class="tomt">Inga nyheter publicerade ännu.</div>';
    const topp = artiklar.find((a) => a.topp) || artiklar[0];
    const ovriga = artiklar.filter((a) => a !== topp);
    const duo = ovriga.slice(0, 2);
    const resten = ovriga.slice(2);

    let html = '<div class="front"><div class="front-main">' + hero(topp);
    if (duo.length) html += '<div class="duo">' + duo.map((a) => kort(a)).join('') + '</div>';

    kategorier.forEach((k) => {
      const grupp = resten.filter((a) => a.kategori === k);
      if (!grupp.length) return;
      html += '<section class="band"><div class="band-rubrik"><h2><a href="' + sektLank(k) + '">' + esc(k) + '</a></h2>' +
        '<a class="fler" href="' + sektLank(k) + '">Fler nyheter ›</a></div><div class="rutnat">' +
        grupp.map((a, i) => kort(a, i === 0 && storPasse(grupp) ? 'stor' : '')).join('') + '</div></section>';
    });
    html += '</div><aside class="front-aside">' + senasteRuta(8) + mestLastRuta() + annons + plusRuta + '</aside></div>';
    return html;
  }

  function sektionssida(k) {
    const lista = efterTid.filter((a) => a.kategori === k);
    document.title = k + ' | ÄFN';
    return '<div class="sektionshuvud"><h1>' + esc(k) + '</h1></div>' +
      (lista.length ? '<div class="rutnat">' + lista.map((a, i) => kort(a, i === 0 && storPasse(lista) ? 'stor' : '')).join('') + '</div>'
        : '<div class="tomt">Inga artiklar i ' + esc(k) + ' just nu.</div>');
  }

  function figur(src, text, foto) {
    return '<figure class="art-bild"><div class="bild-yta"><img src="' + esc(src) + '" alt="' + esc(text || '') + '" loading="lazy" decoding="async"></div>' +
      ((text || foto) ? '<figcaption>' + inl(text || '') + (foto ? ' <span class="foto">Foto: ' + esc(foto) + '</span>' : '') + '</figcaption>' : '') + '</figure>';
  }

  function brodtext(t) {
    if (Array.isArray(t)) t = t.join('\n\n');
    return String(t || '').replace(/\r/g, '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean).map((b) => {
      let m;
      if ((m = b.match(/^##\s+([\s\S]*)$/))) return '<h2>' + inl(m[1]) + '</h2>';
      if ((m = b.match(/^>\s*([\s\S]*)$/))) return '<blockquote>' + inl(m[1].replace(/\n>\s*/g, ' ')) + '</blockquote>';
      if ((m = b.match(/^\[bild:\s*([^|\]]+?)\s*(?:\|([^|\]]*))?(?:\|([^\]]*))?\]$/i))) return figur(m[1], (m[2] || '').trim(), (m[3] || '').trim());
      return '<p>' + inl(b).replace(/\n/g, '<br>') + '</p>';
    });
  }

  function faktaruta(f) {
    if (!f) return '';
    const punkter = f.punkter || f;
    return '<aside class="fakta"><h4>' + esc(f.rubrik || 'Fakta') + '</h4><ul>' +
      [].concat(punkter).map((p) => '<li>' + inl(p) + '</li>').join('') + '</ul></aside>';
  }

  const ikonDela = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';
  const ikonLank = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>';

  function initialer(namn) {
    return String(namn).split(/\s+/).filter(Boolean).slice(0, 2).map((d) => d[0].toUpperCase()).join('');
  }

  function artikelsida(a) {
    document.title = a.rubrik + ' | ÄFN';
    const reporter = a.reporter || 'ÄFN Nyheter';
    const block = brodtext(a.brodtext);
    if (a.fakta) {
      // Faktarutan efter tredje blocket, men aldrig direkt under en mellanrubrik.
      let i = Math.min(3, block.length);
      while (i < block.length && block[i - 1].startsWith('<h2')) i++;
      block.splice(i, 0, faktaruta(a.fakta));
    }
    const relaterade = artiklar.filter((x) => x !== a)
      .sort((x, y) => (y.kategori === a.kategori) - (x.kategori === a.kategori) || hash(x.id + a.id) - hash(y.id + a.id)).slice(0, 4);

    return '<div class="artikel-sida"><article class="artikel">' +
      '<div class="vinjett"><a href="' + sektLank(a.kategori) + '">' + esc(a.kategori) + '</a>' +
      (a.vinjett && a.vinjett !== a.kategori ? ' · ' + esc(a.vinjett) : '') + '</div>' +
      '<h1>' + rubrikHtml(a) + '</h1>' +
      (a.ingress ? '<p class="ingress">' + inl(a.ingress) + '</p>' : '') +
      '<div class="byline-rad"><div class="byline"><span class="avatar">' +
        (a.reporterBild ? '<img src="' + esc(a.reporterBild) + '" alt="">' : esc(initialer(reporter))) + '</span>' +
        '<div><div class="byline-namn">' + esc(reporter) + '<small>' + esc(a.reportertitel || 'Reporter') + '</small></div>' +
        '<div class="tider">Publicerad ' + datumText(a._tid) + (a._uppd ? ' · Uppdaterad ' + datumText(a._uppd) : '') +
        ' · Lästid ' + lastid(a) + ' min</div></div></div>' +
      '<div class="dela"><button data-dela>' + ikonDela + 'Dela</button><button data-kopiera>' + ikonLank + 'Kopiera länk</button></div></div>' +
      (a.bild ? figur(a.bild, a.bildtext, a.foto) : '') +
      '<div class="brodtext">' + block.join('') + '</div>' +
      '<div class="amnen"><span>Ämnen:</span><a href="' + sektLank(a.kategori) + '">' + esc(a.kategori) + '</a>' +
        [].concat(a.amnen || []).map((t) => '<a href="' + sektLank(a.kategori) + '">' + esc(t) + '</a>').join('') + '</div>' +
      (relaterade.length ? '<section class="las-ocksa"><div class="band-rubrik"><h2>Läs också</h2></div><div class="rutnat">' +
        relaterade.map((x) => kort(x)).join('') + '</div></section>' : '') +
      '</article><aside class="artikel-aside"><div class="sticky">' + senasteRuta(6) + mestLastRuta(a) + annons + '</div></aside></div>';
  }

  /* ---------- Ram: datum, meny, just nu-remsa ---------- */
  const params = new URLSearchParams(location.search);
  const artikelId = params.get('artikel');
  const sektionSlug = params.get('sektion');
  const aktivSektion = sektionSlug ? kategorier.find((k) => slug(k) === sektionSlug) : null;

  $('#datum').textContent = new Date(NU).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  $('#sektioner').innerHTML = '<a href="./"' + (!artikelId && !sektionSlug ? ' class="aktiv"' : '') + '>Start</a>' +
    kategorier.map((k) => '<a href="' + sektLank(k) + '"' + (aktivSektion === k ? ' class="aktiv"' : '') + '>' + esc(k) + '</a>').join('');

  const tickerArtiklar = efterTid.slice(0, 7);
  if (tickerArtiklar.length) {
    const t = tickerArtiklar.map((a) => '<a href="' + lank(a) + '"><b>' + klock(a._tid) + '</b>' + esc(a.rubrik) + '</a>').join('');
    $('#ticker').innerHTML = t + t;
    $('#ticker').style.animationDuration = Math.max(30, tickerArtiklar.length * 9) + 's';
  } else {
    $('#ticker-rad').hidden = true;
  }

  /* ---------- Välj sida ---------- */
  const main = $('#innehall');
  if (artikelId) {
    const a = artiklar.find((x) => x.id === artikelId);
    main.innerHTML = a ? artikelsida(a)
      : '<div class="tomt">Artikeln finns inte längre. <a href="./" style="color:var(--rod);font-weight:700">Till startsidan</a></div>';
  } else if (sektionSlug) {
    main.innerHTML = aktivSektion ? sektionssida(aktivSektion) : '<div class="tomt">Sektionen finns inte.</div>';
  } else {
    main.innerHTML = forstasida();
  }

  /* ---------- Knappar ---------- */
  let toastTimer;
  function toast(text) {
    const el = $('#toast');
    el.textContent = text; el.classList.add('syns');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('syns'), 2600);
  }
  async function kopiera() {
    try { await navigator.clipboard.writeText(location.href); toast('Länken är kopierad'); }
    catch (e) { toast('Kunde inte kopiera – markera adressen i adressfältet'); }
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-toast],[data-dela],[data-kopiera]');
    if (!t) return;
    if (t.hasAttribute('data-toast')) toast(t.getAttribute('data-toast'));
    else if (t.hasAttribute('data-kopiera')) kopiera();
    else if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(() => {});
    else kopiera();
  });
})();

/*
 * Fysiklabbet — automatisk begreppslänkning.
 *
 * Gör svåra ord i en text klickbara (Wikipedia-stil) och länkar dem till
 * begreppsordlistan (begrepp.html?ord=<id>). Vid hovring/tangentbordsfokus
 * visas en liten förhandsvisning med begreppets korta förklaring.
 *
 * Kräver att data/begrepp.js laddats först (window.BEGREPP).
 *
 * Användning:
 *   window.BEGREPPSLANK.linkify(element)   → länkar och returnerar en array
 *                                            med id:n för de begrepp som
 *                                            faktiskt hittades i texten
 *   window.BEGREPPSLANK.matchIds(text)     → id:n som förekommer i en sträng
 *   window.BEGREPPSLANK.byId(id)           → begreppsposten
 *
 * Principer:
 *   – Bara FÖRSTA förekomsten av varje begrepp länkas i ett och samma
 *     element. Att länka varje "supraledare" i en artikel blir en blå soppa.
 *   – Matchningen sker på HELA ord (aldrig inuti en sammansättning), är
 *     skiftlägesokänslig och tillåter svenskt genitiv-s ("kvasarens" träffar
 *     formen "kvasaren"). Originaltextens skiftläge behålls i länken.
 *   – Rubriker, citat, bildtexter, kod och redan länkad text hoppas över.
 *     Ett element med klassen `no-begrepp` (eller attributet data-no-begrepp)
 *     lämnas också orört.
 *   – Popovern är helt genomsläpplig för muspekaren (pointer-events: none),
 *     så den kan aldrig komma i vägen för en klickning.
 *
 * Måste köras FÖRE bionisk läsning (applyBionic) — den styckar orden i
 * <span>-taggar, och då hittar ordlistan dem inte längre.
 */
(function () {
    'use strict';

    var SKIP_TAGS = {
        SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, A: 1, BUTTON: 1, TEXTAREA: 1,
        H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, FIGCAPTION: 1, CITE: 1
    };
    // Citat återges ordagrant — lägg inga länkar inuti dem.
    var SKIP_CLASS = /(^|\s)(article-quote|no-begrepp|begrepp-lank)(\s|$)/;

    var idx = null;

    function escapeRe(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Bygger uppslagstabell + en enda stor regex av alla böjningsformer.
    // Längsta formen först, så att "terahertzstrålning" vinner över
    // "terahertz" och "exciterat tillstånd" över "exciterat".
    function buildIndex() {
        var list = window.BEGREPP || [];
        var byForm = Object.create(null);
        var byId = Object.create(null);
        var forms = [];

        list.forEach(function (b) {
            if (!b || !b.id) return;
            byId[b.id] = b;
            (b.former || []).forEach(function (f) {
                var key = String(f).toLowerCase().replace(/\s+/g, ' ').trim();
                if (!key || byForm[key]) return;
                byForm[key] = b;
                forms.push(key);
            });
        });

        forms.sort(function (a, b) { return b.length - a.length; });

        var re = null;
        if (forms.length) {
            var pattern = forms.map(function (f) {
                return escapeRe(f).replace(/ /g, '[\\s\\u00a0]+');
            }).join('|');
            try {
                // Ordgränser med \p{L} — JS:s \b fungerar inte för å, ä, ö.
                // s? fångar svenskt genitiv ("kvasarens", "spinnets").
                re = new RegExp(
                    '(?<![\\p{L}\\p{N}_])(?:' + pattern + ')s?(?![\\p{L}\\p{N}_])',
                    'giu'
                );
            } catch (e) {
                // Äldre webbläsare utan stöd för lookbehind: hoppa över
                // länkningen helt hellre än att krascha sidan.
                re = null;
            }
        }
        return { list: list, byForm: byForm, byId: byId, re: re };
    }

    function index() {
        if (!idx) idx = buildIndex();
        return idx;
    }

    // Slår upp vilket begrepp en träffad textbit hör till. Provar först
    // ordagrant, sedan utan genitiv-s.
    function lookup(matched) {
        var b = index().byForm;
        var key = matched.toLowerCase().replace(/[\s ]+/g, ' ');
        return b[key] || b[key.replace(/s$/, '')] || null;
    }

    function skipNode(node, root) {
        for (var p = node.parentElement; p && p !== root; p = p.parentElement) {
            if (SKIP_TAGS[p.tagName]) return true;
            if (p.className && typeof p.className === 'string'
                && SKIP_CLASS.test(p.className)) return true;
            if (p.hasAttribute && p.hasAttribute('data-no-begrepp')) return true;
        }
        return false;
    }

    // Länkar första förekomsten av varje känt begrepp inuti `root`.
    // Returnerar id:n i den ordning de dyker upp i texten.
    function linkify(root, options) {
        var ix = index();
        if (!root || !ix.re) return [];
        if (root.querySelector('.begrepp-lank')) {
            // Redan länkat (t.ex. vid omrendering) — returnera det som finns.
            return Array.prototype.map.call(
                root.querySelectorAll('.begrepp-lank'),
                function (a) { return a.getAttribute('data-ord'); }
            ).filter(function (v, i, arr) { return arr.indexOf(v) === i; });
        }

        var opts = options || {};
        var skipIds = opts.skip || [];
        var used = Object.create(null);
        skipIds.forEach(function (id) { used[id] = true; });
        var order = [];

        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!node.nodeValue || !/\S/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
                return skipNode(node, root) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        });
        var nodes = [];
        for (var n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);

        nodes.forEach(function (tn) {
            var text = tn.nodeValue;
            ix.re.lastIndex = 0;
            var frag = null, last = 0, m;
            while ((m = ix.re.exec(text))) {
                var b = lookup(m[0]);
                if (!b || used[b.id]) continue;
                used[b.id] = true;
                order.push(b.id);

                if (!frag) frag = document.createDocumentFragment();
                if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));

                var a = document.createElement('a');
                a.className = 'begrepp-lank';
                a.href = 'begrepp.html?ord=' + encodeURIComponent(b.id);
                a.setAttribute('data-ord', b.id);
                a.title = b.term + ' — läs förklaringen i ordlistan';
                a.textContent = m[0];
                frag.appendChild(a);

                last = m.index + m[0].length;
            }
            if (frag) {
                if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
                tn.parentNode.replaceChild(frag, tn);
            }
        });

        return order;
    }

    // Vilka begrepp förekommer i en ren textsträng? (Används av ordlistan för
    // att visa vilka artiklar ett begrepp dyker upp i.)
    function matchIds(text) {
        var ix = index();
        if (!ix.re || !text) return [];
        var seen = Object.create(null);
        var out = [];
        ix.re.lastIndex = 0;
        var m;
        while ((m = ix.re.exec(String(text)))) {
            var b = lookup(m[0]);
            if (!b || seen[b.id]) continue;
            seen[b.id] = true;
            out.push(b.id);
        }
        return out;
    }

    /* ── Förhandsvisning (popover) ──────────────────────────────────────
       Visas vid hovring med mus och vid tangentbordsfokus. Den är
       pointer-events: none, så den kan aldrig fånga en klickning eller
       ställa sig i vägen — klick på ordet går alltid vidare till
       ordlistan. */

    var pop = null, popTimer = null, popFor = null;

    function ensurePop() {
        if (pop) return pop;
        pop = document.createElement('div');
        pop.className = 'begrepp-popover';
        pop.setAttribute('role', 'tooltip');
        pop.innerHTML =
            '<span class="begrepp-popover-label">Ur ordlistan</span>' +
            '<span class="begrepp-popover-term"></span>' +
            '<span class="begrepp-popover-kort"></span>' +
            '<span class="begrepp-popover-more">Läs hela förklaringen →</span>';
        document.body.appendChild(pop);
        return pop;
    }

    function placePop(el) {
        var r = el.getBoundingClientRect();
        var p = pop.getBoundingClientRect();
        var margin = 12;
        var left = r.left + r.width / 2 - p.width / 2;
        left = Math.max(margin, Math.min(left, window.innerWidth - p.width - margin));
        var top = r.bottom + 10;
        if (top + p.height > window.innerHeight - margin) {
            var above = r.top - p.height - 10;
            if (above > margin) top = above;
            else top = Math.max(margin, window.innerHeight - p.height - margin);
        }
        pop.style.left = Math.round(left) + 'px';
        pop.style.top = Math.round(top) + 'px';
    }

    function showPop(el) {
        var b = index().byId[el.getAttribute('data-ord')];
        if (!b) return;
        ensurePop();
        pop.querySelector('.begrepp-popover-term').textContent = b.term;
        pop.querySelector('.begrepp-popover-kort').textContent = b.kort || '';
        pop.classList.add('is-visible');
        popFor = el;
        placePop(el);
    }

    function hidePop() {
        clearTimeout(popTimer);
        popFor = null;
        if (pop) pop.classList.remove('is-visible');
    }

    function initPopover() {
        if (document.body.hasAttribute('data-begrepp-pop')) return;
        document.body.setAttribute('data-begrepp-pop', '1');

        var canHover = !window.matchMedia || window.matchMedia('(hover: hover)').matches;

        document.addEventListener('mouseover', function (e) {
            if (!canHover) return;
            var el = e.target.closest && e.target.closest('.begrepp-lank');
            if (!el || el === popFor) return;
            clearTimeout(popTimer);
            popTimer = setTimeout(function () { showPop(el); }, 130);
        });
        document.addEventListener('mouseout', function (e) {
            var el = e.target.closest && e.target.closest('.begrepp-lank');
            if (el) hidePop();
        });
        document.addEventListener('focusin', function (e) {
            var el = e.target.closest && e.target.closest('.begrepp-lank');
            if (el) showPop(el);
        });
        document.addEventListener('focusout', function (e) {
            var el = e.target.closest && e.target.closest('.begrepp-lank');
            if (el) hidePop();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') hidePop();
        });
        // Fast positionering följer inte med sidan — göm vid skroll.
        window.addEventListener('scroll', function () { if (popFor) hidePop(); }, true);
        window.addEventListener('resize', function () { if (popFor) hidePop(); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPopover);
    } else {
        initPopover();
    }

    window.BEGREPPSLANK = {
        linkify: linkify,
        matchIds: matchIds,
        byId: function (id) { return index().byId[id] || null; },
        all: function () { return index().list; },
        hidePopover: hidePop
    };
})();

/* i18n/nb/sidor/fysik2-tomtebloss-app.js — norska (bokmål) för simuleringen
 * Tomtebloss och centrifug (minisim-typerna tomtebloss och centrifug i stort
 * format). Sammansatta strängar i minisim.js går via I18N.t. */
(function () {
    I18N.add({
        // Sidhuvud och metadata
        'Tomtebloss och centrifug — Fysiklabbet': 'Stjerneskudd og sentrifuge — Fysiklabbet',
        'Tomtebloss och centrifug — Fysik nivå 2': 'Stjerneskudd og sentrifuge — Fysikk nivå 2',
        'Tänd ett tomtebloss i en skruvdragare eller slunga vattnet ur en tvättsvamp i en centrifug — gnistorna och dropparna lämnar cirkelbanan tangentiellt, precis som Newtons första lag säger.':
            'Tenn et stjerneskudd i en skrudrill eller slynge vannet ut av en vaskesvamp i en sentrifuge. Gnistene og dråpene forlater sirkelbanen tangentielt, akkurat som Newtons første lov sier.',
        'Tomtebloss och centrifug': 'Stjerneskudd og sentrifuge',
        'Cirkulär rörelse': 'Sirkelbevegelse',
        'Två klassiska demonstrationer av samma princip: fäst ett tomtebloss i en skruvdragare och tänd det i mörkret, eller lägg en blöt tvättsvamp i en centrifug. När rotationen startar lämnar gnistorna och vattendropparna inte banan rakt ut — de fortsätter':
            'To klassiske demonstrasjoner av det samme prinsippet: fest et stjerneskudd i en skrudrill og tenn det i mørket, eller legg en våt vaskesvamp i en sentrifuge. Når rotasjonen starter, forlater ikke gnistene og vanndråpene banen rett utover, men fortsetter',
        'tangentiellt': 'tangentielt',
        'i rörelsens riktning, precis som Newtons första lag säger. Växla fritt mellan de två försöken, ställ varvtalet, pausa och frys bilden eller se förloppet i ultrarapid.':
            'i bevegelsesretningen, akkurat som Newtons første lov sier. Bytt fritt mellom de to forsøkene, still inn turtallet, sett på pause og frys bildet, eller se forløpet i sakte film.',
        'Välj demonstration': 'Velg demonstrasjon',
        'Tomtebloss i skruvdragare': 'Stjerneskudd i skrudrill',
        'Tvättsvamp i centrifug': 'Vaskesvamp i sentrifuge',

        // Förklaringen under simuleringen
        'Varför tangentiellt?': 'Hvorfor tangentielt?',
        'Newtons första lag (tröghetslagen) säger att en kropp fortsätter rakt fram med konstant hastighet om ingen resulterande kraft verkar på den. Så länge gnistan sitter kvar på tomteblosset — eller droppen i svampen — tvingas den runt i cirkelbanan av centripetalkraften. I samma ögonblick som den släpper försvinner den kraften, och gnistan eller droppen behåller den hastighet den hade just då: riktad längs banans tangent. Strålen av gnistor blir därför en tangent till cirkeln, inte en stråle rakt ut från centrum.':
            'Newtons første lov (treghetsloven) sier at et legeme fortsetter rett frem med konstant hastighet hvis ingen resultantkraft virker på det. Så lenge gnisten sitter fast på stjerneskuddet, eller dråpen i svampen, tvinges den rundt i sirkelbanen av sentripetalkraften. I samme øyeblikk som den slipper, forsvinner denne kraften, og gnisten eller dråpen beholder den hastigheten den hadde akkurat da: rettet langs tangenten til banen. Strålen av gnister blir derfor en tangent til sirkelen, ikke en stråle rett ut fra sentrum.',
        'Hela teorin, med formler för centripetalkraft och centripetalacceleration, finns i genomgången':
            'Hele teorien, med formler for sentripetalkraft og sentripetalakselerasjon, finnes i gjennomgangen',
        'Cirkulär rörelse (Fysik nivå 2, 1.4)': 'Sirkelbevegelse (Fysikk nivå 2, 1.4)',
        '© 2025 Fysiklabbet. Skapad för gymnasieelever.': '© 2025 Fysiklabbet. Laget for elever i videregående skole.',

        // Simuleringarna (minisim.js)
        'Ett tomtebloss fäst i en skruvdragare, i mörker. När skruvdragaren roterar lämnar gnistorna cirkelbanan tangentiellt i rörelsens riktning.':
            'Et stjerneskudd festet i en skrudrill, i mørket. Når skrudrillen roterer, forlater gnistene sirkelbanen tangentielt i bevegelsesretningen.',
        'En blöt tvättsvamp i en roterande centrifugkorg, sedd rakt uppifrån. När centrifugen roterar lämnar vattendropparna cirkelbanan tangentiellt i rörelsens riktning.':
            'En våt vaskesvamp i en roterende sentrifugekurv, sett rett ovenfra. Når sentrifugen roterer, forlater vanndråpene sirkelbanen tangentielt i bevegelsesretningen.',
        'Tänd tomteblosset': 'Tenn stjerneskuddet',
        'Starta skruvdragaren': 'Start skrudrillen',
        'Stoppa skruvdragaren': 'Stopp skrudrillen',
        'Nytt tomtebloss': 'Nytt stjerneskudd',
        'Blöt svampen': 'Fukt svampen',
        'Starta centrifugen': 'Start sentrifugen',
        'Stoppa centrifugen': 'Stopp sentrifugen',
        'Ljud på/av': 'Lyd på/av',
        'Varvtal': 'Turtall',
        'Varvtal: 0 varv/s': 'Turtall: 0 omdreininger/s',
        'Varvtal: {v} varv/s': 'Turtall: {v} omdreininger/s',
        'Varvtal: {v} varv/s · Vatten: {p} %': 'Turtall: {v} omdreininger/s · Vann: {p} %',
        '{v} varv/s': '{v} omdreininger/s',
        'Skruvdragarens varvtal i varv per sekund': 'Turtallet til skrudrillen i omdreininger per sekund',
        'Centrifugens varvtal i varv per sekund': 'Turtallet til sentrifugen i omdreininger per sekund'
    });
})();

/* shared/app.js - Lógica de la versión de prueba: pestañas Inicio y Descargar.
   Cada página define antes: window.PAGE_CONFIG = { mode: 'web' | 'app', school: 'little' | 'arboleda', root: '' | '../' } */
(function () {
    'use strict';

    /* ---- Colegios (para agregar otro, súmalo aquí y crea su carpeta) ---- */
    var SCHOOLS = {
        little:   { key: 'little',   name: 'Little Seeds Montessori',       short: 'Little Seeds', color: '#1D8FE1', folder: 'little',   icon: 'icons/little-192.png',   tagline: 'Etapa inicial · Semillero Montessori' },
        arboleda: { key: 'arboleda', name: 'Colegio Integral La Arboleda',  short: 'La Arboleda',  color: '#006A7A', folder: 'arboleda', icon: 'icons/arboleda-192.png', tagline: 'Educación integral' }
    };
    var ORDER = ['little', 'arboleda'];

    var PAGE = Object.assign({ mode: 'web', school: null, root: '' }, window.PAGE_CONFIG || {});
    var IS_APP = PAGE.mode === 'app' && !!SCHOOLS[PAGE.school];

    var UA = navigator.userAgent || '';
    var IS_IOS = /iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var IS_ANDROID = /Android/i.test(UA);
    var IN_APP_BROWSER = /FBAN|FBAV|Instagram|WhatsApp|Line\/|MicroMessenger|TikTok|; wv\)/i.test(UA);
    var IS_STANDALONE = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;

    var state = {
        tab: 'inicio',
        modo: IS_APP ? PAGE.school : 'little',          // 'little' | 'arboleda' | 'ambas'
        platform: IS_IOS ? 'ios' : 'android'
    };
    var deferredPrompt = null;

    /* ---- Utilidades ---- */
    function $(id) { return document.getElementById(id); }
    function icon(key) { return PAGE.root + SCHOOLS[key].icon; }
    function pageUrl(key) { return new URL(PAGE.root + SCHOOLS[key].folder + '/', window.location.href).href; }
    function installUrl(key, modo) { return pageUrl(key) + '?tab=descargar&modo=' + modo; }
    function toast(msg) {
        var t = $('toast'); t.textContent = msg; t.style.display = 'block';
        clearTimeout(toast._t); toast._t = setTimeout(function () { t.style.display = 'none'; }, 3500);
    }
    function copyText(text) {
        function fallback() {
            var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); toast('Enlace copiado'); } catch (e) { toast('Copia el enlace manualmente'); }
            document.body.removeChild(ta);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { toast('Enlace copiado'); }, fallback);
        } else { fallback(); }
    }

    /* ---- Cabecera ---- */
    function renderHeader() {
        var h = $('brand');
        if (IS_APP) {
            var s = SCHOOLS[PAGE.school];
            document.documentElement.style.setProperty('--brand', s.color);
            h.innerHTML = '<img src="' + icon(s.key) + '" alt=""><div><b>' + s.name + '</b><small>' + (IS_STANDALONE ? 'App instalada' : 'Versión de prueba') + '</small></div>';
        } else {
            h.innerHTML = '<img src="' + icon('little') + '" alt=""><img src="' + icon('arboleda') + '" alt=""><div><b>Little Seeds · La Arboleda</b><small>Versión de prueba de descargas</small></div>';
        }
    }

    /* ---- Pestaña INICIO ---- */
    function renderInicio() {
        var el = $('inicio'), html = '';
        if (IS_APP) {
            var s = SCHOOLS[PAGE.school];
            html += '<h1>Bienvenido a ' + s.short + '</h1>';
            html += '<div class="card row"><img src="' + icon(s.key) + '" alt=""><div><b>' + s.name + '</b><small>' + s.tagline + '</small></div></div>';
            html += '<p>Esta es la app de <b>' + s.short + '</b>. En la pestaña Descargar puedes instalarla o instalar también la del otro colegio.</p>';
            html += '<button type="button" class="btn" style="--c:' + s.color + '" data-act="go" data-val="' + s.key + '">Ir a Descargar</button>';
        } else {
            html += '<h1>Bienvenidos</h1><p>Elige tu colegio para descargar su app.</p>';
            ORDER.forEach(function (k) {
                var s = SCHOOLS[k];
                html += '<div class="card"><div class="row"><img src="' + icon(k) + '" alt=""><div><b>' + s.name + '</b><small>' + s.tagline + '</small></div></div>' +
                        '<button type="button" class="btn" style="--c:' + s.color + '" data-act="go" data-val="' + k + '">Descargar app de ' + s.short + '</button></div>';
            });
            html += '<p class="small">¿Tienes hijos en los dos colegios? <button type="button" class="linklike" data-act="go" data-val="ambas">Descargar las dos apps</button></p>';
        }
        el.innerHTML = html;
    }

    /* ---- Pestaña DESCARGAR ---- */
    function optionBtn(id, title, sub, imgs) {
        return '<button type="button" class="opt" data-act="modo" data-val="' + id + '" aria-pressed="' + (state.modo === id) + '">' +
               '<div class="imgs">' + imgs + '</div><div><b>' + title + '</b><span>' + sub + '</span></div></button>';
    }
    function im(k) { return '<img src="' + icon(k) + '" alt="">'; }

    function installHere(key) {
        var s = SCHOOLS[key], html = '';
        if (IN_APP_BROWSER) {
            html += '<div class="warn">Estás dentro de otra app (WhatsApp, Facebook, Instagram…). Desde ahí no se puede instalar. ' +
                    'Copia el enlace y ábrelo en <b>' + (IS_IOS ? 'Safari' : 'Chrome') + '</b>.</div>' +
                    '<button type="button" class="btn ghost" data-act="copy" data-val="' + pageUrl(key) + '">Copiar enlace</button>';
        }
        if (state.platform === 'android') {
            html += '<button type="button" class="btn" style="--c:' + s.color + '" data-act="install">📲 Instalar app de ' + s.short + '</button>';
            html += '<p class="small">' + (deferredPrompt ? 'Toca el botón y acepta el aviso del navegador.' :
                    'Si no aparece el aviso: toca el menú ⋮ de Chrome y elige <b>Instalar app</b> (o <b>Agregar a la pantalla principal</b>).') + '</p>';
        } else {
            html += '<ol>' +
                    '<li>Abre esta página en <b>Safari</b>.</li>' +
                    '<li>Toca el botón <b>Compartir</b> (cuadrado con flecha ↑) o los tres puntos <b>•••</b> de la barra.</li>' +
                    '<li>Elige <b>Agregar a pantalla de inicio</b> (desliza la lista si no la ves).</li>' +
                    '<li>Toca <b>Agregar</b>. Verás el ícono de <b>' + s.short + '</b> en tu pantalla.</li></ol>';
        }
        return html;
    }

    function openOther(key, modo) {
        var s = SCHOOLS[key];
        if (IS_STANDALONE) {
            return '<p class="small">Desde una app instalada no se puede instalar otra. Copia este enlace y ábrelo en <b>' +
                   (IS_IOS ? 'Safari' : 'Chrome') + '</b>:</p><div class="urlbox">' + pageUrl(key) + '</div>' +
                   '<button type="button" class="btn ghost" data-act="copy" data-val="' + pageUrl(key) + '">Copiar enlace</button>';
        }
        return '<p class="small">Cada colegio se instala desde su propia página.</p>' +
               '<a class="btn" style="--c:' + s.color + '" href="' + installUrl(key, modo) + '">Instalar app de ' + s.short + ' →</a>';
    }

    function panel(key, modo) {
        var s = SCHOOLS[key], here = IS_APP && PAGE.school === key, body;
        if (here && IS_STANDALONE) body = '<p class="ok">✅ Ya estás usando la app de ' + s.short + '.</p>';
        else if (here) body = installHere(key);
        else body = openOther(key, modo);
        return '<article class="panel" style="--c:' + s.color + '"><div class="row"><img src="' + icon(key) + '" alt=""><div><b>' + s.name + '</b>' +
               '<small>' + (here ? 'Esta página' : 'Otra app') + '</small></div></div>' + body + '</article>';
    }

    function renderDescargar() {
        var el = $('descargar'), html = '';
        html += '<h2>Descargar la app</h2><p>¿Qué app necesitas?</p><div class="opts">';
        html += optionBtn('little', 'Solo Little Seeds', 'Mi hijo/a está en Little', im('little'));
        html += optionBtn('arboleda', 'Solo La Arboleda', 'Mi hijo/a está en La Arboleda', im('arboleda'));
        html += optionBtn('ambas', 'Las dos apps', 'Tengo hijos en los dos colegios', im('little') + im('arboleda'));
        html += '</div>';

        html += '<div class="seg" role="group" aria-label="Tipo de teléfono">' +
                '<button type="button" data-act="platform" data-val="android" aria-pressed="' + (state.platform === 'android') + '">🤖 Android</button>' +
                '<button type="button" data-act="platform" data-val="ios" aria-pressed="' + (state.platform === 'ios') + '">🍎 iPhone / iPad</button></div>';

        var keys = state.modo === 'ambas' ? ORDER.slice() : [state.modo];
        if (state.modo === 'ambas') {
            if (IS_APP) keys.sort(function (a) { return a === PAGE.school ? -1 : 1; });   // primero la de esta página
            html += '<p class="small">Las dos apps se instalan <b>una por una</b>: instala la primera y luego abre la segunda.</p>';
        }
        keys.forEach(function (k) { html += panel(k, state.modo === 'ambas' ? 'ambas' : k); });
        el.innerHTML = html;
    }

    /* ---- Pestañas ---- */
    function showTab(tab) {
        state.tab = tab;
        $('inicio').hidden = tab !== 'inicio';
        $('descargar').hidden = tab !== 'descargar';
        var btns = document.querySelectorAll('.tabs button');
        for (var i = 0; i < btns.length; i++) {
            var on = btns[i].getAttribute('data-val') === tab;
            btns[i].className = on ? 'on' : '';
            btns[i].setAttribute('aria-selected', on);
        }
        if (tab === 'descargar') renderDescargar();
        window.scrollTo(0, 0);
    }

    function installAndroid() {
        if (!deferredPrompt) { toast('Usa el menú ⋮ de Chrome → Instalar app'); return; }
        var p = deferredPrompt; deferredPrompt = null;
        p.prompt();
        p.userChoice.then(function (c) {
            if (c && c.outcome === 'accepted') toast('✅ App instalada');
            renderDescargar();
        });
    }

    /* ---- Eventos ---- */
    document.addEventListener('click', function (e) {
        var t = e.target.closest('[data-act]'), tabBtn = e.target.closest('.tabs button');
        if (tabBtn) { showTab(tabBtn.getAttribute('data-val')); return; }
        if (!t) return;
        var act = t.getAttribute('data-act'), val = t.getAttribute('data-val');
        if (act === 'go') { state.modo = IS_APP && val !== 'ambas' ? PAGE.school : val; showTab('descargar'); }
        else if (act === 'modo') { state.modo = val; renderDescargar(); }
        else if (act === 'platform') { state.platform = val; renderDescargar(); }
        else if (act === 'install') { installAndroid(); }
        else if (act === 'copy') { copyText(val); }
    });
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault(); deferredPrompt = e;
        if (state.tab === 'descargar') renderDescargar();
    });
    window.addEventListener('appinstalled', function () { deferredPrompt = null; toast('✅ App instalada'); });

    /* ---- Inicio ---- */
    var q = new URLSearchParams(window.location.search);
    var m = q.get('modo');
    if (IS_APP) { state.modo = (m === 'ambas') ? 'ambas' : PAGE.school; }
    else if (m === 'little' || m === 'arboleda' || m === 'ambas') { state.modo = m; }
    var openDownload = q.get('tab') === 'descargar';
    if (q.has('tab') || q.has('modo')) {
        /* URL limpia: es la que iOS guarda al "Agregar a pantalla de inicio" */
        try { history.replaceState(null, '', window.location.pathname + window.location.hash); } catch (e) {}
    }

    renderHeader();
    renderInicio();
    showTab(openDownload ? 'descargar' : 'inicio');
})();

/* shared/js/config.js - Configuración central.
   Cada página define antes de cargar este archivo:
     window.PAGE_CONFIG = { mode: 'web' | 'app', school: 'seeds' | 'arboleda', root: '' | '../' }
   - web  (index.html)           -> página unida con los dos colegios
   - app  (little/ , arboleda/)  -> un solo colegio fijo, instalable como app
   Para agregar un colegio nuevo: súmalo en SCHOOL_APP_PROFILES y crea su carpeta con su data.js, manifest.json e index.html. */

const PAGE = Object.assign({ mode: 'web', school: null, root: '' }, window.PAGE_CONFIG || {});
const ASSET_BASE = PAGE.root;                 // prefijo para llegar a /media/ desde cualquier página
const IS_APP_PAGE = PAGE.mode === 'app';
const IS_APP_LOCKED_MODE = IS_APP_PAGE;       // en apps el colegio no se puede cambiar

/* Contenedor del contenido: lo llenan little/data.js y arboleda/data.js */
const INSTITUTIONS_DATA = {};

const IS_STANDALONE_DISPLAY = (
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true
);

/* ---- Colegios: carpeta de la app, manifest, nombre y colores ---- */
const SCHOOL_APP_PROFILES = {
    seeds: {
        key: 'seeds',
        folder: 'little',
        querySlug: 'little',
        name: 'Little Seeds Montessori',
        appName: 'Little Seeds',
        shortName: 'Little Seeds',
        logo: ASSET_BASE + 'media/lit.png',
        themeColor: '#1D8FE1'
    },
    arboleda: {
        key: 'arboleda',
        folder: 'arboleda',
        querySlug: 'arboleda',
        name: 'Colegio Integral La Arboleda',
        appName: 'La Arboleda',
        shortName: 'La Arboleda',
        logo: ASSET_BASE + 'media/arb.png',
        themeColor: '#006A7A'
    }
};

/* ---- Google Calendar ---- */
const GOOGLE_CALENDAR_CONFIG = {
    enabled: true,
    apiKey: 'TU_GOOGLE_API_KEY_AQUI',
    calendars: {
        seeds: 'ID_CALENDARIO_LITTLE_SEEDS@group.calendar.google.com',
        arboleda: 'ID_CALENDARIO_LA_ARBOLEDA@group.calendar.google.com'
    }
};

/* ---- Colegio inicial ---- */
function schoolFromParam(v) {
    v = (v || '').toLowerCase();
    if (v === 'arboleda') return 'arboleda';
    if (v === 'little' || v === 'seeds') return 'seeds';
    return null;
}

const INITIAL_INSTITUTION = IS_APP_PAGE
    ? (PAGE.school === 'arboleda' ? 'arboleda' : 'seeds')
    : (schoolFromParam(new URLSearchParams(window.location.search).get('inst')) || 'seeds');

/* ---- Compatibilidad: instalaciones antiguas (ícono que apuntaba a la raíz con ?colegio=)
        se redirigen a la carpeta de su colegio ---- */
(function redirectLegacyInstalls() {
    if (IS_APP_PAGE) return;
    const qs = new URLSearchParams(window.location.search);
    let school = schoolFromParam(qs.get('colegio'));
    if (!school && IS_STANDALONE_DISPLAY) school = schoolFromParam(qs.get('inst'));
    if (!school && IS_STANDALONE_DISPLAY) {
        try {
            const st = localStorage.getItem('pwa_installed_school_inst');
            school = (st === 'arboleda') ? 'arboleda' : 'seeds';
        } catch (e) { school = 'seeds'; }
    }
    if (school) {
        window.location.replace(PAGE.root + SCHOOL_APP_PROFILES[school].folder + '/');
    }
})();

/* shared/js/app.js - Lógica de la página (compartida por la web unida y las apps) */

/* ==========================================================================
   MODO DE PÁGINA (viene de shared/js/config.js)
   web = página unida | app = /little/ o /arboleda/ (colegio fijo)
   ========================================================================== */
function applyInstalledAppLockClasses(instKey) {
    document.body.classList.remove('app-inst-seeds', 'app-inst-arboleda');
    document.body.classList.toggle('app-mode', IS_APP_PAGE);
    document.body.classList.toggle('pwa-installed-mode', IS_APP_PAGE && IS_STANDALONE_DISPLAY);
    if (IS_APP_PAGE) {
        document.body.classList.add(`app-inst-${instKey}`);
    }
}

applyInstalledAppLockClasses(INITIAL_INSTITUTION);

let enterMainSiteHandler = null;

/* ==========================================================================
   CONTROL DE ANTESALA LIQUID GLASS Y VIDEO (ante.mp4)
   ========================================================================== */
(function initAntesala() {
    const overlay = document.getElementById('antesalaOverlay');
    const sparklesBox = document.getElementById('antesalaSparkles');
    const glassPanel = document.getElementById('antesalaGlassPanel');
    const btnBienvenidos = document.getElementById('btnBienvenidos');
    const videoStage = document.getElementById('antesalaVideoStage');
    const videoPlayer = document.getElementById('anteVideoPlayer');
    const btnCerrarVideo = document.getElementById('btnCerrarVideo');

    if (IS_APP_LOCKED_MODE) {
        if (overlay) overlay.remove();
        if (videoStage) videoStage.remove();
        return;
    }

    if (!overlay || !btnBienvenidos) return;

    const colors = ['#35C2D6', '#FFD015', '#F4649A', '#6CC02E', '#1D8FE1'];
    for (let i = 0; i < 14; i++) {
        const dot = document.createElement('span');
        dot.className = 'sparkle-dot';
        const size = 26 + Math.round(Math.random() * 44);
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.left = Math.round(Math.random() * 94) + '%';
        dot.style.top = Math.round(Math.random() * 94) + '%';
        dot.style.background = colors[i % colors.length];
        dot.style.setProperty('--dur', (6 + Math.random() * 4).toFixed(1) + 's');
        dot.style.setProperty('--delay', (Math.random() * 3).toFixed(1) + 's');
        sparklesBox.appendChild(dot);
    }

    function enterMainSite() {
        if (videoPlayer) videoPlayer.pause();
        if (videoStage) videoStage.classList.remove('is-playing');
        overlay.classList.add('fade-out');
        setTimeout(() => {
            if (overlay && overlay.parentNode) overlay.remove();
            if (videoStage && videoStage.parentNode) videoStage.remove();
        }, 520);
    }

    enterMainSiteHandler = enterMainSite;

    btnBienvenidos.addEventListener('click', () => {
        if (glassPanel) glassPanel.classList.add('panel-hidden');
        if (videoStage) videoStage.classList.add('is-playing');
        if (videoPlayer) {
            videoPlayer.muted = false;
            videoPlayer.currentTime = 0;
            const playPromise = videoPlayer.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    videoPlayer.muted = true;
                    videoPlayer.play().catch(enterMainSite);
                });
            }
        } else {
            enterMainSite();
        }
    });

    if (videoPlayer) {
        videoPlayer.addEventListener('ended', enterMainSite);
        videoPlayer.addEventListener('error', enterMainSite);
    }
    if (btnCerrarVideo) {
        btnCerrarVideo.addEventListener('click', enterMainSite);
    }
})();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const videoStage = document.getElementById('antesalaVideoStage');
        if (videoStage && videoStage.classList.contains('is-playing') && typeof enterMainSiteHandler === 'function') {
            enterMainSiteHandler();
            return;
        }
        closeBlogModal();
        closeAppDownloadModal();
    }
});

let activeInstitution = INITIAL_INSTITUTION;
let activeTab = 'inicio';
let activeTrimFilter = 'all';
let mapZoomLevel = 1;

const BLOG_GRADE_FILTERS = {
    seeds: ['Todos', 'Maternal 1 y 2', 'Nursery', 'Pre-kinder', 'Kinder', 'Preparatoria'],
    arboleda: ['Todos', 'Primero primaria', 'Segundo primaria']
};
let activeBlogGradeFilter = 'Todos';
let currentModalPhotos = [];
let currentCarouselIndex = 0;

function buildBlogTitleHtml(instKey) {
    if (instKey === 'arboleda') {
        return `Blog Educativo • ${ARBOLEDA_TITLE_HTML}`;
    }
    return `Blog Educativo • ${LITTLE_SEEDS_TITLE_HTML}`;
}

function switchInstitution(instKey) {
    if (IS_APP_LOCKED_MODE && instKey !== INITIAL_INSTITUTION) {
        return;
    }
    activeInstitution = instKey === 'arboleda' ? 'arboleda' : 'seeds';
    activeBlogGradeFilter = 'Todos';

    const data = INSTITUTIONS_DATA[activeInstitution];
    const isArb = activeInstitution === 'arboleda';

    document.body.classList.toggle('theme-arboleda', isArb);
    if (IS_APP_LOCKED_MODE) {
        applyInstalledAppLockClasses(activeInstitution);
    }

    document.getElementById('selector-seeds').classList.toggle('is-active', !isArb);
    document.getElementById('selector-arboleda').classList.toggle('is-active', isArb);

    document.getElementById('header-brand-title').innerHTML = data.titleHtml;
    document.getElementById('hero-logo-display').innerHTML = `<img src="${data.logo}" alt="${data.name}">`;
    document.getElementById('hero-kicker').textContent = data.kicker;
    document.getElementById('hero-title').innerHTML = data.titleHtml;
    document.getElementById('hero-motto').textContent = data.motto;
    document.getElementById('hero-description').textContent = data.description;
    document.getElementById('hero-grades-list').innerHTML = data.grades.map(g => `<span class="grade-tag">${g}</span>`).join('');

    document.getElementById('mission-text').textContent = data.mission;
    document.getElementById('vision-text').textContent = data.vision;
    document.getElementById('values-text').textContent = data.values;

    document.getElementById('bridge-kicker').textContent = data.bridgeKicker;
    document.getElementById('bridge-title').textContent = data.bridgeTitle;
    document.getElementById('bridge-text').textContent = data.bridgeText;
    document.getElementById('bridge-btn').textContent = data.bridgeBtn;

    const contactDescEl = document.getElementById('contact-card-desc');
    if (contactDescEl) {
        contactDescEl.innerHTML = IS_APP_LOCKED_MODE
            ? `Atendemos familias interesadas en <strong>${escapeHtml(data.name)}</strong>.`
            : `Atendemos familias interesadas tanto en <strong>Little Seeds Montessori</strong> como en <strong>Colegio Integral La Arboleda</strong>.`;
    }

    const footerNameEl = document.getElementById('footer-brand-name');
    if (footerNameEl) {
        footerNameEl.textContent = IS_APP_LOCKED_MODE
            ? data.name
            : 'Little Seeds Montessori & Colegio Integral La Arboleda';
    }

    document.getElementById('map-inst-label').textContent = data.name;

    document.getElementById('niveles-heading').innerHTML = `Niveles Educativos • ${data.titleHtml}`;
    document.getElementById('niveles-subheading').textContent = data.nivelesSub;

    const gridContainer = document.getElementById('levels-cards-grid');
    gridContainer.className = 'growth-pathway-wrapper';
    const stepClass = isArb ? 'steps-2' : 'steps-5';

    gridContainer.innerHTML = `
        <svg class="growth-arrow-svg" viewBox="0 0 1200 320" preserveAspectRatio="none" aria-hidden="true">
            <defs>
                <linearGradient id="growthArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${isArb ? '#006A7A' : '#35C2D6'}" stop-opacity="0.35" />
                    <stop offset="50%" stop-color="${isArb ? '#2E9F19' : '#FFD015'}" stop-opacity="0.55" />
                    <stop offset="100%" stop-color="${isArb ? '#FDC101' : '#6CC02E'}" stop-opacity="0.75" />
                </linearGradient>
            </defs>
            <path d="M 30 275 Q 320 265, 580 190 T 1135 65" fill="none" stroke="url(#growthArrowGrad)" stroke-width="18" stroke-linecap="round" />
            <polygon points="1125,38 1185,55 1142,102" fill="${isArb ? '#2E9F19' : '#6CC02E'}" opacity="0.82" />
        </svg>

        <div class="growth-steps-row ${stepClass}">
            ${data.levels.map((lvl, idx) => `
                <div class="level-card" onclick="openLevelModal(${idx})">
                    <div>
                        <div class="level-step-pill">
                            <span class="level-age" style="margin-bottom:0;">${lvl.age || lvl.stage || ''}</span>
                            <span class="level-step-num">${lvl.step || String(idx + 1).padStart(2, '0')}</span>
                        </div>
                        <h3>${lvl.name}</h3>
                        <p>${lvl.desc || lvl.summary || ''}</p>
                    </div>
                    <button type="button" class="btn-outline" style="margin-top: 14px; width: 100%; padding: 8px 12px; font-size: 12.5px;">Ver detalle</button>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('areas-heading').textContent = data.areasTitle;
    document.getElementById('areas-subheading').textContent = data.areasSub;
    document.getElementById('areas-badges-list').innerHTML = data.areas.map((a, idx) => {
        const areaName = typeof a === 'string' ? a : a.name;
        return `<button type="button" class="area-badge" onclick="openAreaModal(${idx})">${areaName}</button>`;
    }).join('');

    document.getElementById('cal-heading').innerHTML = `Calendario Escolar 2027 • ${data.titleHtml}`;
    renderCalendarCards();

    document.getElementById('modelo-banner-title').textContent = data.modeloTitle;
    document.getElementById('modelo-banner-desc').textContent = data.modeloDesc;
    document.getElementById('modelo-pillars-grid').innerHTML = data.pillars.map(p => `
        <div class="card">
            <div class="icon-circle">${p.icon}</div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        </div>
    `).join('');

    document.getElementById('blog-title').innerHTML = buildBlogTitleHtml(activeInstitution);
    renderBlogCards(data.blog);

    const formInstSelect = document.getElementById('form-inst');
    if (formInstSelect) {
        if (IS_APP_LOCKED_MODE) {
            formInstSelect.innerHTML = `<option value="${activeInstitution}">${escapeHtml(data.name)}</option>`;
        } else {
            formInstSelect.innerHTML = `
                <option value="seeds">Little Seeds Montessori</option>
                <option value="arboleda">Colegio Integral La Arboleda</option>
            `;
        }
        formInstSelect.value = activeInstitution;
    }
    updateFormGradeOptions();

    updateSchoolAppBranding(activeInstitution);
}

function toggleOtherInstitution() {
    if (IS_APP_LOCKED_MODE) return;
    switchInstitution(activeInstitution === 'seeds' ? 'arboleda' : 'seeds');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterCalendar(trim) {
    activeTrimFilter = trim;
    document.querySelectorAll('#tab-calendario .filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.getAttribute('data-trim') === trim);
    });
    renderCalendarCards();
}

/* ==========================================================================
   INTEGRACIÓN DINÁMICA CON GOOGLE CALENDAR (CON FOTOS Y TRIMESTRES)
   ========================================================================== */
const dynamicCalendarCache = {
    seeds: null,
    arboleda: null
};

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function detectTrimesterFromDate(dateObj) {
    const month = dateObj.getMonth();
    if (month <= 3) return 'T1';
    if (month <= 7) return 'T2';
    return 'T3';
}

function formatSpanishCalendarDate(rawStart) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dateStr = rawStart.date || rawStart.dateTime;
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr + 'T12:00:00');
    return {
        label: `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
        trim: detectTrimesterFromDate(d)
    };
}

function extractEventPhotoUrl(ev) {
    if (Array.isArray(ev.attachments)) {
        const imgAttachment = ev.attachments.find(att =>
            (att.mimeType && att.mimeType.startsWith('image/')) ||
            (att.fileUrl && att.fileUrl.includes('drive.google.com'))
        );
        if (imgAttachment) {
            const match = (imgAttachment.fileId || imgAttachment.fileUrl || '').match(/[-\w]{25,}/);
            if (match) {
                return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
            }
        }
    }
    if (ev.description) {
        const driveMatch = ev.description.match(/https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([-\w]{25,})/);
        if (driveMatch) {
            return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
        }
        const directImg = ev.description.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/i);
        if (directImg) return directImg[0];
    }
    return null;
}

function cleanEventDescription(desc) {
    if (!desc) return 'Actividad programada en nuestro calendario escolar.';
    return desc
        .replace(/<[^>]*>/g, ' ')
        .replace(/https:\/\/drive\.google\.com\/[^\s]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

async function fetchGoogleCalendarEvents(instKey) {
    const calId = GOOGLE_CALENDAR_CONFIG.calendars[instKey];
    const apiKey = GOOGLE_CALENDAR_CONFIG.apiKey;

    if (!GOOGLE_CALENDAR_CONFIG.enabled || !apiKey || apiKey.includes('TU_GOOGLE') || !calId || calId.includes('ID_CALENDARIO')) {
        return null;
    }

    const timeMin = new Date('2027-01-01T00:00:00Z').toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?key=${encodeURIComponent(apiKey)}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=50`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al leer Google Calendar');
    const json = await response.json();

    return (json.items || []).map(item => {
        const parsedDate = formatSpanishCalendarDate(item.start);
        return {
            trim: parsedDate.trim,
            date: parsedDate.label,
            title: item.summary || 'Actividad Escolar',
            desc: cleanEventDescription(item.description),
            photo: extractEventPhotoUrl(item)
        };
    });
}

function openCalendarEventPhoto(instKey, eventIndex) {
    const list = dynamicCalendarCache[instKey] || INSTITUTIONS_DATA[instKey].calendar;
    const ev = list[eventIndex];
    if (!ev) return;

    document.getElementById('modal-tag').textContent = ev.date;
    document.getElementById('modal-title').textContent = ev.title;
    document.getElementById('modal-body').innerHTML = `
        ${ev.photo ? `
            <div style="margin: 12px 0; border-radius: 14px; overflow: hidden; border: 2px solid var(--primary); background: #f8fafc;">
                <img src="${ev.photo}" alt="${escapeHtml(ev.title)}" style="width: 100%; max-height: 55vh; object-fit: cover; display: block;">
            </div>
        ` : ''}
        <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.6;">${escapeHtml(ev.desc)}</p>
    `;
    document.getElementById('modal-close-btn').textContent = 'Cerrar evento';
    document.getElementById('blog-modal').classList.remove('hidden');
}

function openLevelModal(idx) {
    const data = INSTITUTIONS_DATA[activeInstitution];
    const lvl = data && data.levels ? data.levels[idx] : null;
    if (!lvl) return;

    const ageText = lvl.age || lvl.stage || '';
    const fullText = lvl.longDesc || lvl.detail || lvl.desc || lvl.summary || '';

    document.getElementById('modal-tag').textContent = `${data.name}${ageText ? ' • ' + ageText : ''}`;
    document.getElementById('modal-title').textContent = lvl.name;
    document.getElementById('modal-body').innerHTML = `
        <p style="font-size: 15px; line-height: 1.7; color: var(--text-main); margin-bottom: 18px;">${escapeHtml(fullText)}</p>
        <button type="button" class="btn-outline" style="width: 100%;" onclick="closeBlogModal(); switchTab('inscripcion');">
            Solicitar Inscripción 2027 para este grado →
        </button>
    `;
    document.getElementById('modal-close-btn').textContent = 'Cerrar';
    document.getElementById('blog-modal').classList.remove('hidden');
}

// =========================================================================
// LÓGICA DEL MODAL DE ÁREAS: TEXTO ARRIBA + CARRUSEL DE FOTOS ABAJO
// =========================================================================
let currentAreaPhotos = [];
let currentAreaPhotoIndex = 0;

function renderAreaModalCarousel() {
    const holder = document.getElementById('area-modal-carousel-holder');
    if (!holder || !Array.isArray(currentAreaPhotos) || currentAreaPhotos.length === 0) return;

    const item = currentAreaPhotos[currentAreaPhotoIndex];
    const src = typeof item === 'string' ? item : (item.src || '');
    const caption = typeof item === 'string' ? '' : (item.caption || '');

    holder.innerHTML = `
        <div class="area-carousel-wrap">
            <div class="area-carousel-stage">
                <img
                    src="${escapeHtml(src)}"
                    alt="${escapeHtml(caption || 'Foto del área')}"
                    onerror="this.style.display='none'"
                >
                <span class="area-car-badge">${currentAreaPhotoIndex + 1} / ${currentAreaPhotos.length}</span>
                ${currentAreaPhotos.length > 1 ? `
                    <button type="button" class="area-car-arrow prev" onclick="stepAreaPhoto(-1)" aria-label="Foto anterior">&#10094;</button>
                    <button type="button" class="area-car-arrow next" onclick="stepAreaPhoto(1)" aria-label="Foto siguiente">&#10095;</button>
                ` : ''}
            </div>
            <div class="area-carousel-bar">
                <span class="area-car-caption">${escapeHtml(caption)}</span>
                <div class="area-car-dots">
                    ${currentAreaPhotos.map((_, idx) => `
                        <button
                            type="button"
                            class="area-car-dot ${idx === currentAreaPhotoIndex ? 'active' : ''}"
                            onclick="selectAreaPhoto(${idx})"
                            aria-label="Ir a foto ${idx + 1}"
                        ></button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function stepAreaPhoto(delta) {
    if (!currentAreaPhotos.length) return;
    currentAreaPhotoIndex = (currentAreaPhotoIndex + delta + currentAreaPhotos.length) % currentAreaPhotos.length;
    renderAreaModalCarousel();
}

function selectAreaPhoto(idx) {
    if (!currentAreaPhotos.length) return;
    currentAreaPhotoIndex = idx;
    renderAreaModalCarousel();
}

function openAreaModal(idx) {
    const data = INSTITUTIONS_DATA && INSTITUTIONS_DATA[activeInstitution] ? INSTITUTIONS_DATA[activeInstitution] : null;
    const area = data && Array.isArray(data.areas) ? data.areas[idx] : null;
    if (!area) return;

    const areaName = typeof area === 'string' ? area : (area.name || 'Área Curricular');
    const paragraphsList = Array.isArray(area.paragraphs) && area.paragraphs.length > 0
        ? area.paragraphs
        : (area.desc ? [area.desc] : ['Formación integral y vivencial enfocada en el desarrollo de cada estudiante.']);

    currentAreaPhotos = Array.isArray(area.photos)
        ? area.photos
        : (area.image ? [{ src: area.image, caption: areaName }] : []);
    currentAreaPhotoIndex = 0;

    const instLabel = activeInstitution === 'arboleda'
        ? 'Colegio Integral La Arboleda'
        : 'Little Seeds Montessori';

    document.getElementById('modal-tag').textContent = `${instLabel} • Área Curricular`;
    document.getElementById('modal-title').textContent = areaName;
    document.getElementById('modal-body').innerHTML = `
        <div class="area-modal-text">
            ${paragraphsList.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        </div>
        ${currentAreaPhotos.length > 0 ? '<div id="area-modal-carousel-holder"></div>' : ''}
    `;
    document.getElementById('modal-close-btn').textContent = 'Cerrar';
    document.getElementById('blog-modal').classList.remove('hidden');

    if (currentAreaPhotos.length > 0) {
        renderAreaModalCarousel();
    }
}

async function renderCalendarCards() {
    const instKey = activeInstitution;
    const gridEl = document.getElementById('calendar-events-grid');
    const statusEl = document.getElementById('cal-sync-status');

    let sourceEvents = dynamicCalendarCache[instKey];

    if (!sourceEvents) {
        if (statusEl && GOOGLE_CALENDAR_CONFIG.enabled && !GOOGLE_CALENDAR_CONFIG.apiKey.includes('TU_GOOGLE')) {
            statusEl.textContent = '🔄 Sincronizando eventos con Google Calendar...';
        }
        try {
            const fetched = await fetchGoogleCalendarEvents(instKey);
            if (fetched && fetched.length > 0) {
                dynamicCalendarCache[instKey] = fetched;
                sourceEvents = fetched;
                if (statusEl) statusEl.textContent = '✅ Calendario sincronizado en vivo';
            } else {
                sourceEvents = INSTITUTIONS_DATA[instKey].calendar;
                if (statusEl) statusEl.textContent = '';
            }
        } catch (err) {
            sourceEvents = INSTITUTIONS_DATA[instKey].calendar;
            if (statusEl) statusEl.textContent = '';
        }
    }

    const filtered = activeTrimFilter === 'all'
        ? sourceEvents
        : sourceEvents.filter(e => e.trim === activeTrimFilter);

    if (filtered.length === 0) {
        gridEl.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 32px;">
                <p style="font-size: 15px; color: var(--text-muted); font-weight: 700;">No hay actividades programadas para este trimestre todavía.</p>
            </div>
        `;
        return;
    }

    gridEl.innerHTML = filtered.map((ev) => {
        const realIndex = sourceEvents.indexOf(ev);
        return `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span class="cal-date-tag">${escapeHtml(ev.date)}</span>
                    ${ev.photo ? `
                        <div onclick="openCalendarEventPhoto('${instKey}', ${realIndex})" style="margin: 10px 0 12px; border-radius: 12px; overflow: hidden; border: 2px solid var(--primary); cursor: pointer; position: relative;">
                            <img src="${escapeHtml(ev.photo)}" alt="${escapeHtml(ev.title)}" style="width: 100%; height: 170px; object-fit: cover; display: block;" onerror="this.parentElement.style.display='none'">
                            <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(15,23,42,0.78); color: #fff; font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px;">🔍 Ver foto</span>
                        </div>
                    ` : ''}
                    <h3>${escapeHtml(ev.title)}</h3>
                    <p>${escapeHtml(ev.desc)}</p>
                </div>
                ${ev.photo ? `
                    <button type="button" class="btn-outline" style="margin-top: 14px; width: 100%; padding: 8px 12px; font-size: 12.5px;" onclick="openCalendarEventPhoto('${instKey}', ${realIndex})">Ver detalle y foto</button>
                ` : ''}
            </div>
        `;
    }).join('');
}

function renderCarouselSlide() {
    const imgEl = document.getElementById('carousel-active-img');
    const capEl = document.getElementById('carousel-active-caption');
    const countEl = document.getElementById('carousel-counter');
    if (!imgEl || !currentModalPhotos.length) return;

    const item = currentModalPhotos[currentCarouselIndex];
    imgEl.src = item.src;
    imgEl.alt = item.caption || 'Foto de actividad';
    if (capEl) capEl.textContent = item.caption || '';
    if (countEl) countEl.textContent = `${currentCarouselIndex + 1} / ${currentModalPhotos.length}`;
}

function stepBlogCarousel(delta) {
    if (!currentModalPhotos.length) return;
    currentCarouselIndex = (currentCarouselIndex + delta + currentModalPhotos.length) % currentModalPhotos.length;
    renderCarouselSlide();
}

function openBlogModal(idx) {
    const post = INSTITUTIONS_DATA[activeInstitution].blog[idx];
    if (!post) return;

    document.getElementById('modal-tag').textContent = post.grade ? `${post.tag} • ${post.grade}` : post.tag;
    document.getElementById('modal-title').textContent = post.title;

    let html = (post.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join('');
    if (Array.isArray(post.orderedList)) {
        html += '<ol class="blog-modal-list">' + post.orderedList.map(item => {
            if (typeof item === 'string') {
                return `<li>${escapeHtml(item)}</li>`;
            }
            const textPart = item.text ? `<div>${item.text}</div>` : '';
            const imagePart = item.image ? `
                <figure style="margin: 10px 0 6px; border-radius: 12px; overflow: hidden; border: 1.5px solid #e2e8f0; background: #f8fafc;">
                    <img src="${escapeHtml(item.image)}"
                         alt="${escapeHtml(item.caption || '')}"
                         onerror="this.parentElement.style.display='none'"
                         style="width: 100%; max-height: 240px; object-fit: cover; display: block;">
                    ${item.caption ? `<figcaption style="padding: 6px 10px; font-size: 12px; color: #64748b;">${escapeHtml(item.caption)}</figcaption>` : ''}
                </figure>
            ` : '';
            return `<li>${textPart}${imagePart}</li>`;
        }).join('') + '</ol>';
    }
    if (post.closingNote) {
        html += `<p style="font-weight:800; color:var(--primary); margin-top:12px;">${escapeHtml(post.closingNote)}</p>`;
    }

    currentModalPhotos = Array.isArray(post.photos) ? post.photos : [];
    currentCarouselIndex = 0;

    if (currentModalPhotos.length > 0) {
        const first = currentModalPhotos[0];
        html += `
            <div class="modal-carousel" id="blog-carousel-box">
                <div class="modal-carousel-stage">
                    ${currentModalPhotos.length > 1 ? `<button type="button" class="carousel-nav-btn prev" onclick="stepBlogCarousel(-1)" aria-label="Anterior">‹</button>` : ''}
                    <img id="carousel-active-img" src="${escapeHtml(first.src)}" alt="${escapeHtml(first.caption || post.title)}" onerror="document.getElementById('blog-carousel-box').style.display='none'">
                    ${currentModalPhotos.length > 1 ? `<button type="button" class="carousel-nav-btn next" onclick="stepBlogCarousel(1)" aria-label="Siguiente">›</button>` : ''}
                </div>
                <div class="modal-carousel-footer">
                    <span id="carousel-active-caption">${escapeHtml(first.caption || '')}</span>
                    <span id="carousel-counter" style="color: var(--primary);">1 / ${currentModalPhotos.length}</span>
                </div>
            </div>
        `;
    }

    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal-close-btn').textContent = 'Cerrar artículo';
    document.getElementById('blog-modal').classList.remove('hidden');
}

function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) modal.classList.add('hidden');
}

function renderBlogFilterBar() {
    const bar = document.getElementById('blog-filter-bar');
    if (!bar) return;

    const options = BLOG_GRADE_FILTERS[activeInstitution] || ['Todos'];
    if (!options.includes(activeBlogGradeFilter)) {
        activeBlogGradeFilter = 'Todos';
    }

    bar.innerHTML = options.map(grade => `
        <button
            type="button"
            class="filter-chip ${activeBlogGradeFilter === grade ? 'active' : ''}"
            onclick="filterBlogByGrade('${grade.replace(/'/g, "\\'")}')"
        >
            ${escapeHtml(grade)}
        </button>
    `).join('');
}

function filterBlogByGrade(grade) {
    activeBlogGradeFilter = grade;
    renderBlogCards(INSTITUTIONS_DATA[activeInstitution]?.blog || []);
}

function renderBlogCards(posts = []) {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    renderBlogFilterBar();

    const indexed = posts.map((post, idx) => ({ post, idx }));
    const filtered = activeBlogGradeFilter === 'Todos'
        ? indexed
        : indexed.filter(({ post }) => (post.grade || 'Todos') === activeBlogGradeFilter);

    if (!filtered.length) {
        grid.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 32px;">
                <p style="font-size: 15px; color: var(--text-muted); font-weight: 700;">No hay publicaciones para "${escapeHtml(activeBlogGradeFilter)}" todavía.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(({ post, idx }) => `
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <span class="kicker">${escapeHtml(post.tag || 'Artículo')}${post.grade ? ' • ' + escapeHtml(post.grade) : ''}</span>
                <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 8px;">${escapeHtml(post.title)}</h3>
                <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 16px;">${escapeHtml(post.summary || '')}</p>
            </div>
            <button type="button" class="btn-outline" style="width: 100%; padding: 9px 14px; font-size: 13px;" onclick="openBlogModal(${idx})">Leer artículo</button>
        </div>
    `).join('');
}

function updateFormGradeOptions() {
    const inst = document.getElementById('form-inst').value;
    const grades = INSTITUTIONS_DATA[inst].grades;
    document.getElementById('form-grade').innerHTML = grades.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
}

function submitAdmissionForm(e) {
    e.preventDefault();
    const student = document.getElementById('form-student').value.trim();
    const instKey = document.getElementById('form-inst').value;
    const instName = INSTITUTIONS_DATA[instKey].name;
    const grade = document.getElementById('form-grade').value;
    document.getElementById('form-feedback').textContent = `✅ Solicitud recibida para ${student} (${instName} - ${grade}). Nos comunicaremos pronto.`;
    showToast('✅ Solicitud de inscripción 2027 registrada');
    e.target.reset();
    document.getElementById('form-inst').value = instKey;
    updateFormGradeOptions();
}

function changeMapZoom(delta) {
    mapZoomLevel = Math.min(1.75, Math.max(0.85, mapZoomLevel + delta));
    document.getElementById('campus-map-svg').style.transform = `scale(${mapZoomLevel})`;
}

function copyLocationText() {
    const textToCopy = `${INSTITUTIONS_DATA[activeInstitution].name} - 16 Avenida A 1-05, Sector B1, Ciudad San Cristóbal, Zona 8 de Mixco - Tel: (502) 2393-5249 - WhatsApp: +502 5893 6495`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy);
    } else {
        const helper = document.createElement('textarea');
        helper.value = textToCopy;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
    }
    showToast('📋 ¡Ubicación copiada al portapapeles!');
}

let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById('appToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

/* ==========================================================================
   2 PWAs INDEPENDIENTES CON MANIFIESTOS ESTÁTICOS SEPARADOS
   (manifest-little.json y manifest-arboleda.json)
   ========================================================================== */
let deferredInstallPrompt = null;

function getSchoolAppConfig(instKey = activeInstitution) {
    const key = instKey === 'arboleda' ? 'arboleda' : 'seeds';
    const profile = SCHOOL_APP_PROFILES[key];
    /* URL de la app de ese colegio: /little/ o /arboleda/ */
    const appUrl = new URL(`${PAGE.root}${profile.folder}/`, window.location.href).href;
    return { ...profile, baseUrl: appUrl, appUrl };
}

function updateManifestAndMetaForSchool(instKey = activeInstitution) {
    const cfg = getSchoolAppConfig(instKey);
    /* En /little/ y /arboleda/ el <head> (manifest, ícono, título) es estático y ya es el correcto.
       En la web unida solo se ajusta el color de la barra del navegador. */
    if (!IS_APP_PAGE) {
        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) themeMeta.setAttribute('content', cfg.themeColor);
    } else {
        document.title = cfg.name;
    }
}

function updateSchoolAppBranding(instKey = activeInstitution) {
    const cfg = getSchoolAppConfig(instKey);
    updateManifestAndMetaForSchool(cfg.key);

    const navBtn = document.getElementById('nav-app-blog-btn');
    if (navBtn) navBtn.textContent = `📲 App ${cfg.shortName}`;

    const heroBtn = document.getElementById('hero-app-blog-btn');
    if (heroBtn) heroBtn.textContent = `📲 Descargar App ${cfg.shortName}`;

    const blogBtn = document.getElementById('blog-app-download-btn');
    if (blogBtn) blogBtn.textContent = `📲 Descargar App ${cfg.shortName}`;

    const modal = document.getElementById('app-download-modal');
    if (modal && !modal.classList.contains('hidden')) {
        renderAppPlatformSelector();
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
});

async function triggerAndroidInstall() {
    const cfg = getSchoolAppConfig(activeInstitution);
    updateManifestAndMetaForSchool(cfg.key);
    if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        if (choice && choice.outcome === 'accepted') {
            closeAppDownloadModal();
            showToast(`✅ App de ${cfg.name} instalada en tu dispositivo`);
            return;
        }
    }
    showToast(`ℹ️ Toca los 3 puntos (⋮) del navegador y elige "Instalar aplicación"`);
}

function selectInstitutionFromAppModal(instKey) {
    if (IS_APP_LOCKED_MODE) return;
    switchInstitution(instKey);
    renderAppPlatformSelector();
}

function openAppDownloadModal() {
    if (IS_STANDALONE_DISPLAY) return;
    const modal = document.getElementById('app-download-modal');
    if (!modal) return;
    updateSchoolAppBranding(activeInstitution);
    modal.classList.remove('hidden');
    renderAppPlatformSelector();
}

function closeAppDownloadModal() {
    const modal = document.getElementById('app-download-modal');
    if (!modal) return;
    modal.classList.add('hidden');
}

/* Desde la web unida: lleva a la página de la app del colegio (/little/ o /arboleda/) */
function goToAppInstall(platform) {
    const cfg = getSchoolAppConfig(activeInstitution);
    window.location.href = `${cfg.appUrl}?instalar=${platform}`;
}

function pickInstallPlatform(platform) {
    if (IS_APP_PAGE) {
        renderAppSteps(platform);
    } else {
        goToAppInstall(platform);
    }
}

function renderAppPlatformSelector() {
    const body = document.getElementById('app-download-body');
    if (!body) return;

    const cfg = getSchoolAppConfig(activeInstitution);
    const isSeeds = activeInstitution !== 'arboleda';

    const schoolSwitchHtml = IS_APP_PAGE ? '' : `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
            <button type="button" onclick="selectInstitutionFromAppModal('seeds')" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:10px; border-radius:14px; border: 2px solid ${isSeeds ? '#1D8FE1' : '#cbd5e1'}; background: ${isSeeds ? '#eff6ff' : '#f8fafc'}; color: #0f172a; font-weight: 800; font-size: 12.5px; cursor: pointer;">
                <img src="${ASSET_BASE}media/lit.png" alt="Little Seeds" style="width:24px; height:24px; object-fit:contain;">
                Little Seeds
            </button>
            <button type="button" onclick="selectInstitutionFromAppModal('arboleda')" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:10px; border-radius:14px; border: 2px solid ${!isSeeds ? '#006A7A' : '#cbd5e1'}; background: ${!isSeeds ? '#ecfeff' : '#f8fafc'}; color: #0f172a; font-weight: 800; font-size: 12.5px; cursor: pointer;">
                <img src="${ASSET_BASE}media/arb.png" alt="La Arboleda" style="width:24px; height:24px; object-fit:contain;">
                La Arboleda
            </button>
        </div>`;

    const introText = IS_APP_PAGE
        ? `Se instalará la aplicación oficial de <strong>${escapeHtml(cfg.name)}</strong>. Elige tu dispositivo:`
        : `Te llevaremos a la página de la app de <strong>${escapeHtml(cfg.name)}</strong>, donde se instala de forma independiente. Puedes instalar también la del otro colegio como una segunda app seleccionándolo arriba. Elige tu dispositivo:`;

    body.innerHTML = `
        ${schoolSwitchHtml}
        <div class="app-school-badge">
            <img src="${escapeHtml(cfg.logo)}" alt="${escapeHtml(cfg.name)}">
            <div>
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--primary);">App Web Independiente</div>
                <div style="font-size: 15px; font-weight: 900; color: #0f172a;">${escapeHtml(cfg.name)}</div>
            </div>
        </div>
        <h3 style="font-size: 19px; font-weight: 900; margin: 4px 0 8px;">
            Instalar App de ${escapeHtml(cfg.shortName)}
        </h3>
        <p style="font-size: 13.5px; color: #475569; margin-bottom: 16px;">
            ${introText}
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button type="button" onclick="pickInstallPlatform('android')" style="padding: 16px 12px; border-radius: 16px; border: 2.5px solid #16a34a; background: #f0fdf4; color: #14532d; font-weight: 900; font-size: 15px; cursor: pointer;">
                🤖 Android
            </button>
            <button type="button" onclick="pickInstallPlatform('ios')" style="padding: 16px 12px; border-radius: 16px; border: 2.5px solid #1d8fe1; background: #eff6ff; color: #1e3a8a; font-weight: 900; font-size: 15px; cursor: pointer;">
                🍎 iOS (iPhone / iPad)
            </button>
        </div>
    `;
}

function renderAppSteps(platform) {
    const body = document.getElementById('app-download-body');
    if (!body) return;

    const cfg = getSchoolAppConfig(activeInstitution);
    updateManifestAndMetaForSchool(cfg.key);

    const isAndroid = platform === 'android';
    const title = isAndroid
        ? `Instalar ${cfg.shortName} en Android`
        : `Instalar ${cfg.shortName} en iOS`;
    const badgeColor = isAndroid ? '#16a34a' : '#1d8fe1';

    const stepsHtml = isAndroid
        ? `
            <ol style="padding-left: 20px; margin: 0 0 18px; font-size: 14px; line-height: 1.65; color: #334155;">
                <li>Toca el botón verde <strong>"Instalar App ${escapeHtml(cfg.shortName)}"</strong> de abajo.</li>
                <li>Si no abre el aviso automático, toca los <strong>tres puntos (⋮)</strong> arriba a la derecha en Chrome y elige <strong>Instalar aplicación</strong> o <strong>Agregar a la pantalla principal</strong>.</li>
                <li>¡Listo! Tendrás el ícono oficial de <strong>${escapeHtml(cfg.shortName)}</strong> en tu celular.</li>
            </ol>
        `
        : `
            <ol style="padding-left: 20px; margin: 0 0 18px; font-size: 14px; line-height: 1.65; color: #334155;">
                <li>Asegúrate de estar en <strong>Safari</strong> (no dentro del navegador de WhatsApp, Facebook o Instagram) y en esta página de <strong>${escapeHtml(cfg.shortName)}</strong>.</li>
                <li>En la barra inferior de Safari, toca el ícono <strong>Compartir</strong> (el cuadro con una flecha hacia arriba ⬆️).</li>
                <li>Desliza hacia abajo en el menú y selecciona <strong>Agregar a inicio</strong>.</li>
                <li>Toca <strong>Agregar</strong> arriba a la derecha. ¡Listo! Se instalará la app exclusiva de <strong>${escapeHtml(cfg.shortName)}</strong>.</li>
            </ol>
        `;

    const primaryActionBtn = isAndroid
        ? `<button type="button" onclick="triggerAndroidInstall()" style="width: 100%; padding: 13px 16px; border-radius: 13px; border: none; background: ${badgeColor}; color: #ffffff; font-weight: 800; cursor: pointer; font-size: 14.5px;">
                📲 Instalar App ${escapeHtml(cfg.shortName)}
           </button>`
        : '';

    body.innerHTML = `
        <div class="app-school-badge">
            <img src="${escapeHtml(cfg.logo)}" alt="${escapeHtml(cfg.name)}">
            <div>
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${badgeColor};">${isAndroid ? 'Android' : 'iOS (iPhone / iPad)'}</div>
                <div style="font-size: 14.5px; font-weight: 900; color: #0f172a;">${escapeHtml(cfg.name)}</div>
            </div>
        </div>
        <h3 style="font-size: 19px; font-weight: 900; margin: 4px 0 12px;">
            ${title}
        </h3>
        ${stepsHtml}
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${primaryActionBtn}
            <button type="button" onclick="renderAppPlatformSelector()" style="padding: 10px 14px; border-radius: 12px; border: 1px solid #cbd5e1; background: #ffffff; color: #334155; font-weight: 700; cursor: pointer; font-size: 13px;">
                ← Cambiar plataforma (Android / iOS)
            </button>
        </div>
    `;
}

/* Si se llega a /little/ o /arboleda/ desde el botón "Descargar App" de la web unida,
   abre directo la guía de instalación (?instalar=ios | android). */
function handleInstallQueryParam() {
    if (!IS_APP_PAGE || IS_STANDALONE_DISPLAY) return;
    const platform = (new URLSearchParams(window.location.search).get('instalar') || '').toLowerCase();
    if (platform !== 'ios' && platform !== 'android') return;
    openAppDownloadModal();
    renderAppSteps(platform);
    /* Deja la URL limpia: es la que iOS guarda al "Agregar a inicio" */
    try { history.replaceState(null, '', window.location.pathname + window.location.hash); } catch (e) {}
}

window.addEventListener('DOMContentLoaded', function() {
    switchInstitution(INITIAL_INSTITUTION);
    switchTab('inicio');
    handleInstallQueryParam();
});

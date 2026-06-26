// ═══════════════════════════════════════════════════════════════
//  GALERIA CAMG
// ═══════════════════════════════════════════════════════════════

const museumData = [
  {
    id: '202526',
    label: '2025/26',
    year: '2026',
    items: [
      { type: 'photo', src: 'assets/images/gallery/2025.26/bark-no-campeonato-do-mundo-de-sub-20.webp',
        title: 'Bark no Campeonato do Mundo de Sub-20' },
      { type: 'photo', src: 'assets/images/gallery/2025.26/joao-e-tomas-no-nacional-de-sub-16.webp',
        title: 'João e Tomás no Nacional de Sub-16' },
      { type: 'photo', src: 'assets/images/gallery/2025.26/olimpico-jovem-nacional.webp',
        title: 'Olímpico Jovem Nacional' },
      ...Array.from({ length: 10 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/tacapassovite_${String(i + 1).padStart(2, '0')}.webp`,
        title: 'Taça Passovite - Almeirim' })),
      { type: 'photo', src: 'assets/images/gallery/2025.26/DSC01335.webp', title: 'Equipa Jovem' },
      { type: 'photo', src: 'assets/images/gallery/2025.26/galeria_2-1024x683.webp', title: '200 Metros' },
      { type: 'photo', src: 'assets/images/gallery/2025.26/DSC01524.webp', title: 'Meeting Fernando Alves' },
      { type: 'photo', src: 'assets/images/gallery/2025.26/702677456.webp', title: 'Tiago Sucena' },
      ...Array.from({ length: 11 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/equipas-sub-16-conquistam-3-lugar-distrital_${String(i + 1).padStart(2, '0')}.webp`,
        title: 'Equipas Sub-16 Conquistam 3º Lugar Distrital' })),
    ],
  },
  {
    id: '12meetingfa',
    label: '12º Meeting Fernando Alves',
    year: '2026',
    items: [
      { type: 'youtube', id: '3uGbSJC2WzU', title: 'Resumo do Meeting' },
      ...Array.from({ length: 11 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/12mfa_${String(i + 1).padStart(2, '0')}.webp`,
        title: '12º Meeting Fernando Alves' })),
    ]
  },
  {
    id: '9meetingjovem',
    label: '9º Meeting Jovem',
    year: '2026',
    items: [
      { type: 'youtube', id: 'R2Oj7gshaNA', title: 'Resumo do Meeting' },
      ...Array.from({ length: 12 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/9mj_${String(i + 1).padStart(2, '0')}.webp`,
        title: '9º Meeting Jovem' })),
  { type: 'photo', src: 'assets/images/gallery/2025.26/9mj_all_01.webp', title: '9º Meeting Jovem' },
  { type: 'photo', src: 'assets/images/gallery/2025.26/9mj_all_02.webp', title: '9º Meeting Jovem', size: 'large' },
    ]
  },
  {
    id: '36milhacristal',
    label: '36ª Milha Cristal',
    year: '2026',
    items: [
      ...Array.from({ length: 55 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/36mc_${String(i + 1).padStart(2, '0')}.webp`,
        title: '36ª Milha Cristal' })),
    ]
  },
];

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
let flatItems = [];
let lbIndex = 0;
let isOpen = false;
let lbZoom = 1;
let lbPanX = 0, lbPanY = 0;
let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let dragStartPanX = 0, dragStartPanY = 0;
let lbMediaImg = null;

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  buildGallery('all');
  updateHeroStats();
  initLightbox();
  initScrollReveal();
});

function updateHeroStats() {
  let fotos = 0, videos = 0;
  museumData.forEach(col => {
    col.items.forEach(it => {
      if (it.type === 'photo') fotos++;
      else videos++;
    });
  });
  document.getElementById('statFotos').querySelector('span').textContent = fotos;
  document.getElementById('statVideos').querySelector('span').textContent = videos;
  document.getElementById('statColecoes').querySelector('span').textContent = museumData.length;
}

// ═══════════════════════════════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════════════════════════════
function initScrollReveal() {
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.col-section').forEach(s => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(24px)';
      s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      obs.observe(s);
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  FILTERS
// ═══════════════════════════════════════════════════════════════
function buildFilters() {
  const inner = document.querySelector('.filters-inner');
  museumData.forEach(col => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = col.id;
    btn.textContent = col.label;
    inner.appendChild(btn);
  });

  inner.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    inner.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGallery(btn.dataset.filter);
    initScrollReveal();
  });
}

// ═══════════════════════════════════════════════════════════════
//  BUILD GALLERY
// ═══════════════════════════════════════════════════════════════
function buildGallery(filter) {
  const wrap = document.getElementById('museumGallery');
  wrap.innerHTML = '';

  const cols = filter === 'all' ? museumData : museumData.filter(c => c.id === filter);
  let globalIdx = 0;
  flatItems = [];

  cols.forEach(col => {
    const section = document.createElement('section');
    section.className = 'col-section';
    section.dataset.colId = col.id;

    section.innerHTML = `
      <div class="col-header">
        <div class="col-header-left">
          <span class="col-year">${col.year}</span>
          <h2 class="col-label">${col.label}</h2>
        </div>
        <span class="col-count">${col.items.length} ${col.items.length === 1 ? 'item' : 'itens'}</span>
      </div>
      <div class="col-grid"></div>
    `;

    const grid = section.querySelector('.col-grid');

    col.items.forEach(item => {
      const idx = globalIdx++;
      flatItems.push({ item, colLabel: col.label });

      const card = document.createElement('div');
      card.className = `museum-card${item.type === 'youtube' ? ' is-video' : ''}`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Abrir: ${item.title}`);

      let thumbHTML = '';
      if (item.type === 'photo') {
        thumbHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
      } else {
        thumbHTML = `
          <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${item.title}" loading="lazy">
          <div class="yt-badge"><svg viewBox="0 0 68 48" width="48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/><path d="M45 24 27 14v20" fill="#fff"/></svg></div>`;
      }

      card.innerHTML = `
        <div class="card-media">${thumbHTML}</div>
        <div class="card-overlay">
          <span class="card-type-tag">${item.type === 'photo' ? '📷 Fotografia' : '▶ YouTube'}</span>
          <h3>${item.title}</h3>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx); });

      grid.appendChild(card);
    });

    wrap.appendChild(section);
  });

  window._galleryFlat = flatItems;
}

// ═══════════════════════════════════════════════════════════════
//  LIGHTBOX
// ═══════════════════════════════════════════════════════════════
function initLightbox() {
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);

  document.getElementById('lbPrev').addEventListener('click', () => navigate(-1));
  document.getElementById('lbNext').addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
  });

  // Mouse wheel navigation
  document.getElementById('lightbox').addEventListener('wheel', e => {
    if (!isOpen) return;
    if (lbZoom > 1) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      navigate(e.deltaX > 0 ? 1 : -1);
    }
  }, { passive: false });

  // Touch swipe
  let tx = 0, ty = 0;
  const lb = document.getElementById('lightbox');
  lb.addEventListener('touchstart', e => {
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      navigate(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  // Mouse drag to navigate
  const stage = document.querySelector('.lb-stage');
  stage.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  // Pinch zoom
  let lastDist = 0;
  lb.addEventListener('touchmove', e => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      if (lastDist) setZoom(lbZoom * (dist / lastDist));
      lastDist = dist;
    }
  }, { passive: false });
  lb.addEventListener('touchend', () => { lastDist = 0; }, { passive: true });
}

function openLightbox(idx) {
  lbIndex = idx;
  isOpen = true;
  lbZoom = 1;
  lbPanX = 0;
  lbPanY = 0;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
  renderLightbox();
}

function closeLightbox() {
  isOpen = false;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
  document.getElementById('lbMedia').innerHTML = '';
  lbZoom = 1;
  lbPanX = 0;
  lbPanY = 0;
  lbMediaImg = null;
}

function navigate(dir) {
  lbIndex = (lbIndex + dir + flatItems.length) % flatItems.length;
  lbZoom = 1;
  lbPanX = 0;
  lbPanY = 0;
  renderLightbox();
}

function renderLightbox() {
  const { item } = flatItems[lbIndex];
  const media = document.getElementById('lbMedia');
  media.innerHTML = '';

  const spinner = document.createElement('div');
  spinner.className = 'lb-spinner';
  media.appendChild(spinner);

  if (item.type === 'photo') {
    const img = document.createElement('img');
    img.className = 'lb-loading';
    img.alt = item.title;
    img.addEventListener('load', () => {
      img.classList.remove('lb-loading');
      img.classList.add('lb-loaded');
      spinner.style.display = 'none';
    });
    img.addEventListener('error', () => { spinner.style.display = 'none'; });
    img.src = item.src;
    lbMediaImg = img;
    media.appendChild(img);
  } else {
    spinner.style.display = 'none';
    const fr = document.createElement('iframe');
    fr.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0`;
    fr.allow = 'autoplay; fullscreen';
    fr.allowFullscreen = true;
    media.appendChild(fr);
  }

  document.getElementById('lbTitle').textContent = item.title;
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${flatItems.length}`;
}

// ═══════════════════════════════════════════════════════════════
//  ZOOM & PAN
// ═══════════════════════════════════════════════════════════════
function setZoom(zoom) {
  lbZoom = Math.max(1, Math.min(5, zoom));
  applyTransform();
}

function applyTransform() {
  if (!lbMediaImg) return;
  if (lbZoom > 1) {
    lbMediaImg.style.transform = `translate(${lbPanX}px, ${lbPanY}px) scale(${lbZoom})`;
    lbMediaImg.style.cursor = 'grab';
  } else {
    lbMediaImg.style.transform = '';
    lbMediaImg.style.cursor = '';
  }
}

document.querySelector('.lb-stage').addEventListener('wheel', e => {
  if (!isOpen || !lbMediaImg) return;
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    setZoom(lbZoom * (e.deltaY > 0 ? 0.9 : 1.1));
  }
}, { passive: false });

function onDragStart(e) {
  if (!isOpen) return;
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartPanX = lbPanX;
  dragStartPanY = lbPanY;
  if (lbMediaImg) lbMediaImg.style.cursor = 'grabbing';
}

function onDragMove(e) {
  if (!isDragging || !isOpen) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  if (lbZoom > 1) {
    lbPanX = dragStartPanX + dx;
    lbPanY = dragStartPanY + dy;
    applyTransform();
  }
}

function onDragEnd(e) {
  if (!isDragging || !isOpen) return;
  isDragging = false;
  if (lbMediaImg) lbMediaImg.style.cursor = '';

  if (lbZoom <= 1) {
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 80) navigate(dx < 0 ? 1 : -1);
  }
}

// ═══════════════════════════════════════════════════════════════
//  GALERIA CAMG — Dados e lógica
//  Adiciona fotos e vídeos aqui. O JS trata de tudo o resto.
// ═══════════════════════════════════════════════════════════════

/**
 * museumData — Array de COLEÇÕES
 * Cada coleção tem:
 *   id        — slug único (sem espaços)
 *   label     — nome da coleção mostrado na galeria e nos filtros
 *   year      — ano (mostrado no header da coleção)
 *   items     — array de itens (fotos ou vídeos)
 *
 * Cada ITEM pode ser:
 *   type: 'photo'
 *     src   — caminho da imagem
 *     title — título
 *     desc  — descrição (opcional)
 *     size  — 'large' | 'medium' | '' (opcional, para layout)
 *
 *   type: 'video'
 *     src   — caminho do ficheiro de vídeo  (mp4, etc.)
 *     title, desc iguais ao photo
 *
 *   type: 'youtube'
 *     id    — ID do vídeo YouTube (ex: 'dQw4w9WgXcQ')
 *     title, desc iguais ao photo
 */
const museumData = [
  {
    id: '202526',
    label: '2025/26',
    year: '2026',
    items: [
      { type: 'photo', src: 'assets/images/gallery/2025.26/DSC01335.JPG', title: 'Equipa Jovem', },
      { type: 'photo', src: 'assets/images/gallery/2025.26/galeria_2-1024x683.jpg', title: '200 Metros', },
      { type: 'photo', src: 'assets/images/gallery/2025.26/DSC01524.JPG', title: 'Meeting Fernando Alves', },
      { type: 'photo', src: 'assets/images/gallery/2025.26/702677456.jpg', title: 'Tiago Sucena', },
    ],
  },

  {
    id: '12meetingfa',
    label: '12º Meeting Fernando Alves',
    year: '2026',
    items: [
      { type: 'youtube', id: '3uGbSJC2WzU', title: 'Resumo do Meeting',},
      ...Array.from({ length: 11 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/12mfa_${String(i + 1).padStart(2, '0')}.jpg`,
        title: '12º Meeting Fernando Alves',
      })),
    ]
  },

  {
    id: '9meetingjovem',
    label: '9º Meeting Jovem',
    year: '2026',
    items: [
      { type: 'youtube', id: 'R2Oj7gshaNA', title: 'Resumo do Meeting',},
      ...Array.from({ length: 12 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/9mj_${String(i + 1).padStart(2, '0')}.jpg`,
        title: '9º Meeting Jovem',
      })),
      { type: 'photo', src: 'assets/images/gallery/2025.26/9mj_all_01.jpg', title: '9º Meeting Jovem',},
      { type: 'photo', src: 'assets/images/gallery/2025.26/9mj_all_02.jpg', title: '9º Meeting Jovem', size: 'large',},
    ]
  },

  {
    id: '36milhacristal',
    label: '36ª Milha Cristal',
    year: '2026',
    items: [
      { type: 'youtube', id: 'R2Oj7gshaNA', title: 'Resumo do Meeting',},
      ...Array.from({ length: 55 }, (_, i) => ({
        type: 'photo',
        src: `assets/images/gallery/2025.26/36mc_${String(i + 1).padStart(2, '0')}.jpg`,
        title: '36ª Milha Cristal',
      })),
    ]
  },

  // ── Adiciona mais coleções aqui ──────────────────────────────
  // {
  //   id: 'campeonato-regional',
  //   label: 'Campeonato Regional',
  //   year: '2024',
  //   items: [
  //     { type: 'photo', src: 'assets/images/gallery/foto.jpg', title: 'Sprint', desc: '...' },
  //     { type: 'video', src: 'assets/videos/corrida.mp4',      title: 'Corrida', desc: '...' },
  //     { type: 'youtube', id: 'YOUTUBE_ID',                    title: 'Vídeo', desc: '...' },
  //   ]
  // },
];


// ═══════════════════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  buildGallery('all');
  updateHeroStats();
  initLightbox();
});

function updateHeroStats() {
  let fotos = 0, videos = 0;
  museumData.forEach(col => {
    col.items.forEach(it => {
      if (it.type === 'photo') fotos++;
      else videos++;
    });
  });
  document.getElementById('statFotos').querySelector('span').textContent    = fotos;
  document.getElementById('statVideos').querySelector('span').textContent   = videos;
  document.getElementById('statColecoes').querySelector('span').textContent = museumData.length;
}

function buildFilters() {
  const inner = document.querySelector('.filters-inner');
  museumData.forEach(col => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn';
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
  });
}

function buildGallery(filter) {
  const wrap = document.getElementById('museumGallery');
  wrap.innerHTML = '';

  const cols = filter === 'all' ? museumData : museumData.filter(c => c.id === filter);

  // Índice global para o lightbox
  let globalIdx = 0;
  const flatItems = [];

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
      card.className = `museum-card ${item.size || ''} ${item.type === 'youtube' || item.type === 'video' ? 'is-video' : ''}`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Abrir: ${item.title}`);

      // Thumbnail
      let thumbHTML = '';
      if (item.type === 'photo') {
        thumbHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
      } else if (item.type === 'video') {
        thumbHTML = `<video src="${item.src}" muted preload="metadata"></video>`;
      } else if (item.type === 'youtube') {
        thumbHTML = `
          <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${item.title}" loading="lazy">
          <div class="yt-badge"><svg viewBox="0 0 68 48" width="48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/><path d="M45 24 27 14v20" fill="#fff"/></svg></div>
        `;
      }

      card.innerHTML = `
        <div class="card-media">${thumbHTML}</div>
        <div class="card-overlay">
          <div class="card-overlay-inner">
            <span class="card-type-tag">${item.type === 'photo' ? '📷' : item.type === 'youtube' ? '▶ YouTube' : '🎬 Vídeo'}</span>
            <h3>${item.title}</h3>
            ${item.desc ? `<p>${item.desc}</p>` : ''}
            <span class="card-cta">Abrir →</span>
          </div>
        </div>
      `;

      card.addEventListener('click',   () => openLightbox(idx, flatItems));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx, flatItems); });

      grid.appendChild(card);
    });

    wrap.appendChild(section);
  });

  // Guarda para o lightbox
  window._galleryFlat = flatItems;
}


// ═══════════════════════════════════════════════════════════════
//  LIGHTBOX
// ═══════════════════════════════════════════════════════════════
let lbCurrent = 0;

function initLightbox() {
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lbNext').addEventListener('click', () => moveLightbox(1));

  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') moveLightbox(1);
    if (e.key === 'ArrowLeft')  moveLightbox(-1);
  });

  // Swipe mobile
  let tx = 0;
  const lb = document.getElementById('lightbox');
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) moveLightbox(dx < 0 ? 1 : -1);
  });
}

function openLightbox(idx, flatItems) {
  lbCurrent = idx;
  renderLightbox(flatItems || window._galleryFlat);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  // Para vídeos/iframes ao fechar
  document.getElementById('lbMedia').innerHTML = '';
}

function moveLightbox(dir) {
  const flat = window._galleryFlat;
  lbCurrent = (lbCurrent + dir + flat.length) % flat.length;
  renderLightbox(flat);
}

function renderLightbox(flat) {
  const { item, colLabel } = flat[lbCurrent];
  const media = document.getElementById('lbMedia');
  media.innerHTML = '';

  if (item.type === 'photo') {
    const img = document.createElement('img');
    img.src = item.src; img.alt = item.title;
    media.appendChild(img);

  } else if (item.type === 'video') {
    const v = document.createElement('video');
    v.src = item.src; v.controls = true; v.autoplay = true;
    media.appendChild(v);

  } else if (item.type === 'youtube') {
    const fr = document.createElement('iframe');
    fr.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0`;
    fr.allow = 'autoplay; fullscreen';
    fr.allowFullscreen = true;
    media.appendChild(fr);
  }

  document.getElementById('lbTitle').textContent   = item.title;
  document.getElementById('lbDesc').textContent    = item.desc || '';
  document.getElementById('lbTag').textContent     = colLabel;
  document.getElementById('lbCounter').textContent = `${lbCurrent + 1} / ${flat.length}`;

  // Strip de miniaturas
  const strip = document.getElementById('lbStrip');
  strip.innerHTML = '';
  flat.forEach(({ item: it }, i) => {
    const th = document.createElement('div');
    th.className = 'lb-thumb' + (i === lbCurrent ? ' active' : '');

    let tSrc = it.type === 'photo'   ? it.src
             : it.type === 'youtube' ? `https://img.youtube.com/vi/${it.id}/default.jpg`
             : '';
    if (tSrc) {
      const img = document.createElement('img'); img.src = tSrc; img.alt = it.title;
      th.appendChild(img);
    } else {
      th.textContent = '🎬';
    }

    th.addEventListener('click', () => { lbCurrent = i; renderLightbox(flat); });
    strip.appendChild(th);
  });

  // Scroll para a miniatura ativa
  const activeThumb = strip.querySelector('.lb-thumb.active');
  if (activeThumb) activeThumb.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}
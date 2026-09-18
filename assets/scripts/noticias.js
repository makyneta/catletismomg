document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('.news-grid');
  if (!grid) return;

  const existingCards = Array.from(grid.querySelectorAll('.news-card')).map(card => ({
    title: (card.querySelector('h4') || card.querySelector('h3') || {}).textContent || '',
    slug: (card.querySelector('a') || {}).getAttribute('href') || '',
    href: (card.querySelector('a') || {}).getAttribute('href') || '#',
    image: (card.querySelector('img') || {}).getAttribute('src') || 'assets/images/news/default.webp',
    summary: (card.querySelector('p') || {}).textContent || ''
  }));

  try {
    const dbNews = (window.CAMG_SUPABASE && window.CAMG_SUPABASE.getNews)
      ? await window.CAMG_SUPABASE.getNews({ season: '2026/27' })
      : [];

    const localNews = (() => {
      try { return JSON.parse(localStorage.getItem('camg_news_db') || '[]'); } catch { return []; }
    })();

    const combined = [...(dbNews || []), ...localNews].filter(Boolean);
    const deduped = [];
    const seen = new Set();

    [...combined, ...existingCards].forEach(item => {
      const slug = item.slug || item.page_path || item.title || '';
      const key = slug.toLowerCase().trim();
      if (!key || seen.has(key)) return;
      seen.add(key);
      deduped.push(item);
    });

    if (!deduped.length) return;

    const latest = deduped.sort((a, b) => {
      const ta = a.published_at || a.created_at || 0;
      const tb = b.published_at || b.created_at || 0;
      return new Date(tb) - new Date(ta);
    });

    grid.innerHTML = latest.map(item => {
      const title = item.title || 'Nova notícia';
      const summary = item.summary || item.content || 'Nova publicação do CAMG.';
      const href = item.page_path || item.href || item.slug ? (item.page_path || item.href || `noticia/${item.season || '2026/27'}/${item.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`) : '#';
      const image = item.image_url || item.image || 'assets/images/news/default.webp';
      const shortSummary = summary.replace(/\s+/g, ' ').trim().slice(0, 140) + (summary.length > 140 ? '…' : '');

      return `
        <div class="news-card">
          <div class="img">
            <img src="${image}" alt="${title}" loading="lazy">
          </div>
          <div class="body">
            <h4>${title}</h4>
            <p>${shortSummary}</p>
            <a href="${href}" class="card-link">Ler notícia</a>
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.warn('Não foi possível carregar notícias dinâmicas:', e);
  }
});

(function () {
  const DEFAULT_CONFIG = {
    url: 'https://kcisuhgmubqyjpuexaar.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjaXN1aGdtdWJxeWpwdWV4YWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NDI1MTksImV4cCI6MjEwNTMxODUxOX0.8b_A6BXzjtiXmWlwb5QcWSSvnXnNZr_KpzwVwAuF5EI',
    defaultSeason: '2026/27'
  };

  const config = Object.assign({}, DEFAULT_CONFIG, window.CAMG_SUPABASE_CONFIG || {});

  function makePayload(article) {
    return {
      id: article.id || undefined,
      slug: (article.slug || article.title || 'nova-noticia').toLowerCase().trim().replace(/[^a-z0-9\-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
      title: article.title || 'Nova notícia',
      summary: article.summary || '',
      image_url: article.image_url || '',
      content: article.content || '',
      season: article.season || config.defaultSeason,
      status: article.status || 'published',
      category: article.category || 'geral',
      featured: Boolean(article.featured),
      published_at: article.published_at || new Date().toISOString(),
      author_role: article.author_role || 'admin',
      page_path: article.page_path || ''
    };
  }

  function localNews() {
    try {
      return JSON.parse(localStorage.getItem('camg_news_db') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveLocalNews(items) {
    localStorage.setItem('camg_news_db', JSON.stringify(items));
  }

  function localUsers() {
    try {
      return JSON.parse(localStorage.getItem('camg_users_db') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveLocalUsers(items) {
    localStorage.setItem('camg_users_db', JSON.stringify(items));
  }

  function localGallery() {
    try {
      return JSON.parse(localStorage.getItem('camg_gallery_db') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveLocalGallery(items) {
    localStorage.setItem('camg_gallery_db', JSON.stringify(items));
  }

  function isConfigured() {
    return !!config.url && !config.url.includes('SEU-PROJETO') && !!config.anonKey && !config.anonKey.includes('SUA_');
  }

  function getClient() {
    if (!isConfigured()) return null;
    if (!window.supabase) return null;
    return window.supabase.createClient(config.url, config.anonKey);
  }

  async function getNews(filters) {
    const client = getClient();
    const season = (filters && filters.season) || config.defaultSeason;

    if (!client) {
      const items = localNews().filter(item => !season || item.season === season);
      return items.sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0));
    }

    try {
      let query = client.from('news').select('*');
      if (filters && filters.season) query = query.eq('season', filters.season);
      if (filters && filters.status) query = query.eq('status', filters.status);
      const { data, error } = await query.order('published_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      const items = localNews().filter(item => !season || item.season === season);
      return items.sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0));
    }
  }

  async function saveNews(article) {
    const payload = makePayload(article);
    const client = getClient();

    if (!client) {
      const items = localNews();
      const index = items.findIndex(item => item.slug === payload.slug || item.id === payload.id);
      if (index >= 0) items[index] = payload;
      else items.unshift(payload);
      saveLocalNews(items);
      return payload;
    }

    try {
      const { data, error } = await client.from('news').upsert(payload, { onConflict: 'slug' }).select();
      if (error) throw error;
      return (data && data[0]) || payload;
    } catch (e) {
      const items = localNews();
      const index = items.findIndex(item => item.slug === payload.slug || item.id === payload.id);
      if (index >= 0) items[index] = payload;
      else items.unshift(payload);
      saveLocalNews(items);
      return payload;
    }
  }

  async function getUsers() {
    const client = getClient();
    if (!client) {
      return localUsers();
    }

    try {
      const { data, error } = await client.from('admin_users').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return localUsers();
    }
  }

  async function addUser(user) {
    const payload = {
      email: (user.email || '').trim().toLowerCase(),
      password: user.password || '',
      role: user.role || 'admin',
      is_active: user.is_active !== false,
      created_at: new Date().toISOString()
    };

    const client = getClient();
    if (!client) {
      const items = localUsers();
      const index = items.findIndex(item => item.email.toLowerCase() === payload.email);
      if (index >= 0) items[index] = payload;
      else items.unshift(payload);
      saveLocalUsers(items);
      return payload;
    }

    try {
      const { data, error } = await client.from('admin_users').upsert(payload, { onConflict: 'email' }).select();
      if (error) throw error;
      return (data && data[0]) || payload;
    } catch (e) {
      const items = localUsers();
      const index = items.findIndex(item => item.email.toLowerCase() === payload.email);
      if (index >= 0) items[index] = payload;
      else items.unshift(payload);
      saveLocalUsers(items);
      return payload;
    }
  }

  async function deleteUser(email) {
    const targetEmail = (email || '').trim().toLowerCase();
    if (!targetEmail) return null;

    const client = getClient();
    const updatedLocal = localUsers().filter(item => item.email && item.email.toLowerCase() !== targetEmail);
    saveLocalUsers(updatedLocal);

    if (!client) {
      return true;
    }

    try {
      const { error } = await client.from('admin_users').delete().eq('email', targetEmail);
      if (error) throw error;
      return true;
    } catch (e) {
      return false;
    }
  }

  async function loginByEmail(email, password) {
    const targetEmail = (email || '').trim().toLowerCase();
    const targetPassword = password || '';

    if (!targetEmail || !targetPassword) return null;

    const client = getClient();
    if (!client) {
      const all = localUsers();
      return all.find(user => user.email && user.email.toLowerCase() === targetEmail && user.password === targetPassword && user.is_active !== false) || null;
    }

    try {
      const { data, error } = await client.from('admin_users').select('*').eq('email', targetEmail).eq('password', targetPassword).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (e) {
      const all = localUsers();
      return all.find(user => user.email && user.email.toLowerCase() === targetEmail && user.password === targetPassword && user.is_active !== false) || null;
    }
  }

  async function getGalleryItems(filters) {
    const client = getClient();
    if (!client) {
      let items = localGallery();
      if (filters && filters.season) items = items.filter(item => item.season === filters.season);
      return items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    try {
      let query = client.from('gallery_images').select('*');
      if (filters && filters.season) query = query.eq('season', filters.season);
      if (filters && filters.category) query = query.eq('category', filters.category);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      let items = localGallery();
      if (filters && filters.season) items = items.filter(item => item.season === filters.season);
      return items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }
  }

  async function saveGalleryItem(item) {
    const payload = {
      id: item.id || `gallery-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      title: item.title || 'Imagem da galeria',
      alt: item.alt || item.title || 'Imagem da galeria',
      description: item.description || '',
      image_url: item.image_url || '',
      season: item.season || config.defaultSeason,
      category: item.category || 'geral',
      author_role: item.author_role || 'admin',
      created_at: item.created_at || new Date().toISOString()
    };

    const client = getClient();
    if (!client) {
      const items = localGallery();
      const index = items.findIndex(img => img.id === payload.id || img.image_url === payload.image_url || img.title === payload.title);
      if (index >= 0) items[index] = payload;
      else items.unshift(payload);
      saveLocalGallery(items);
      return payload;
    }

    try {
      const { data, error } = await client.from('gallery_images').upsert(payload, { onConflict: 'id' }).select();
      if (error) throw error;
      return (data && data[0]) || payload;
    } catch (e) {
      const items = localGallery();
      const index = items.findIndex(img => img.id === payload.id || img.image_url === payload.image_url || img.title === payload.title);
      if (index >= 0) items[index] = payload;
      else items.unshift(payload);
      saveLocalGallery(items);
      return payload;
    }
  }

  async function deleteNews(idOrSlug) {
    if (!idOrSlug) return false;
    const client = getClient();
    if (!client) {
      const items = localNews().filter(item => item.id !== idOrSlug && item.slug !== idOrSlug);
      saveLocalNews(items);
      return true;
    }

    try {
      const { error } = await client.from('news').delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
      if (error) throw error;
      return true;
    } catch (e) {
      const items = localNews().filter(item => item.id !== idOrSlug && item.slug !== idOrSlug);
      saveLocalNews(items);
      return false;
    }
  }

  async function deleteGalleryItem(id) {
    if (!id) return false;
    const client = getClient();
    if (!client) {
      const items = localGallery().filter(item => item.id !== id);
      saveLocalGallery(items);
      return true;
    }

    try {
      const { error } = await client.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      const items = localGallery().filter(item => item.id !== id);
      saveLocalGallery(items);
      return false;
    }
  }

  function buildNewsCard(article) {
    const slug = article.slug || 'nova-noticia';
    const season = article.season || config.defaultSeason;
    const pagePath = article.page_path || `noticia/${season}/${slug}`;
    const title = article.title || 'Nova notícia';
    const summary = article.summary || '';
    const image = article.image_url || 'assets/images/news/default.webp';

    return `
      <div class="news-card">
        <div class="img">
          <img src="${image}" alt="${title}">
        </div>
        <div class="body">
          <h4>${title}</h4>
          <p>${summary}</p>
          <a href="${pagePath}" class="card-link">Ler notícia</a>
        </div>
      </div>
    `;
  }

  window.CAMG_SUPABASE = {
    config,
    isConfigured,
    getNews,
    saveNews,
    getUsers,
    addUser,
    deleteUser,
    deleteNews,
    loginByEmail,
    getGalleryItems,
    saveGalleryItem,
    deleteGalleryItem,
    buildNewsCard
  };
})();

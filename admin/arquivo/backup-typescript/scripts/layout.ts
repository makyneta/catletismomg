document.addEventListener('DOMContentLoaded', () => {
  const isGitHubPages: boolean = location.hostname.includes('github.io');
  const base: string = isGitHubPages ? '/' + location.pathname.split('/')[1] : '';
  function url(path: string): string { return base + path; }

  const headerHTML: string = `
    <nav id="mainNav">
      <a href="${url('/')}" class="nav-logo">
        <img src="${url('/assets/images/logo.png')}" alt="Logo CAMG">
        <div class="nav-logo-text"><strong></strong><small></small></div>
      </a>
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="fullscreen-menu" id="fullscreenMenu" aria-hidden="true">
      <div class="menu-inner">
        <ul class="menu-list">
          <li class="has-sub">
            <button class="sub-toggle"><span class="link-num">01</span><span class="link-label">Clube</span><span class="arrow">&#8599;</span></button>
            <ul class="submenu">
              <li><a href="${url('/clube/sobre.html')}">Sobre o Clube</a></li>
              <li><a href="${url('/clube/corpos-sociais.html')}">Corpos Sociais</a></li>
              <li><a href="${url('/clube/campeoes-nacionais.html')}">Campeões Nacionais</a></li>
              <li><a href="${url('/clube/estatisticas.html')}">Estatísticas</a></li>
            </ul>
          </li>
          <li class="has-sub">
            <button class="sub-toggle"><span class="link-num">02</span><span class="link-label">Inscrição</span><span class="arrow">&#8599;</span></button>
            <ul class="submenu">
              <li><a href="${url('/inscricao/regulamento.html')}" target="_blank">Regulamento</a></li>
              <li><a href="${url('/inscricao/inscrever.html')}" target="_blank">Inscrever</a></li>
            </ul>
          </li>
          <li class="has-sub">
            <button class="sub-toggle"><span class="link-num">03</span><span class="link-label">Provas</span><span class="arrow">&#8599;</span></button>
            <ul class="submenu">
              <li><a href="#" id="btn-calendario">Calendário</a></li>
              <li><a href="${url('/provas/meeting-fernando-alves.html')}" target="_blank">Meeting Fernando Alves</a></li>
              <li><a href="${url('/provas/volta-aos-7-vidrala.html')}" target="_blank">Volta aos 7 — Vidrala</a></li>
              <li><a href="${url('/provas/milha-de-cristal.html')}" target="_blank">Milha de Cristal</a></li>
            </ul>
          </li>
          <li><a href="${url('/noticias.html')}" class="simple-link"><span class="link-num">04</span><span class="link-label">Notícias</span></a></li>
          <li><a href="${url('/galeria.html')}" class="simple-link"><span class="link-num">05</span><span class="link-label">Galeria</span></a></li>
          <li><a href="${url('/contacto.html')}" class="simple-link"><span class="link-num">06</span><span class="link-label">Contacto</span></a></li>
          <li><a href="${url('/clube/newsletter.html')}" class="simple-link"><span class="link-num">07</span><span class="link-label">Newsletter</span></a></li>
          <li><a href="${url('/admin/login.html')}" class="simple-link"><span class="link-num">08</span><span class="link-label">Admin</span></a></li>
        </ul>
        <div class="menu-footer">
          <p>Clube Atletismo de Marinha Grande</p>
          <p>© 2026 CAMG</p>
        </div>
      </div>
    </div>
  `;

  const footerHTML: string = `
    <footer>
      <div class="footer-bottom">
        <p>© 2026 Clube Atletismo de Marinha Grande. Todos os direitos reservados.</p>
        <p>Website desenvolvido por <a href="https://makyneta.github.io" target="_blank">Makyneta Unipessoal, Lda.</a></p>
      </div>
    </footer>
  `;

  if (!document.querySelector('nav')) {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
  if (!document.querySelector('footer')) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  const menuToggle     = document.getElementById('menuToggle') as HTMLButtonElement;
  const fullscreenMenu = document.getElementById('fullscreenMenu') as HTMLDivElement;

  function openMenu(): void {
    fullscreenMenu.classList.add('active');
    menuToggle.classList.add('active');
    document.body.classList.add('menu-open');
    fullscreenMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu(): void {
    fullscreenMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
    fullscreenMenu.setAttribute('aria-hidden', 'true');
  }

  menuToggle.addEventListener('click', () => {
    fullscreenMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  fullscreenMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  fullscreenMenu.querySelectorAll('.sub-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = (btn as HTMLButtonElement).parentElement as HTMLLIElement;
      const isOpen: boolean = li.classList.contains('open');
      fullscreenMenu.querySelectorAll('.has-sub').forEach(el => el.classList.remove('open'));
      if (!isOpen) li.classList.add('open');
    });
  });

  const btnCalendario = document.getElementById('btn-calendario');
  if (btnCalendario) {
    btnCalendario.addEventListener('click', function (e: Event) {
      e.preventDefault();
      const WORKER_URL: string = 'https://adal-calendario.makynetastudios.workers.dev/';
      fetch(WORKER_URL)
        .then(res => res.json() as Promise<{ url: string }>)
        .then(data => window.open(data.url, '_blank'))
        .catch(() => window.open('https://www.adal.pt/calendario.php', '_blank'));
    });
  }

  const currentPath: string = location.pathname;
  document.querySelectorAll('.fullscreen-menu a').forEach(link => {
    if (link instanceof HTMLAnchorElement && link.href && link.pathname === currentPath) link.classList.add('active');
  });
});

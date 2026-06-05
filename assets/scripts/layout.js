document.addEventListener('DOMContentLoaded', function () {

  const isGitHubPages = location.hostname.includes('github.io');
  const base = isGitHubPages ? '/' + location.pathname.split('/')[1] : '';
  function url(path) { return base + path; }

  const headerHTML = `
    <nav id="mainNav">
      <a href="${url('/')}" class="nav-logo">
        <img src="${url('/assets/images/logo.png')}" alt="Logo CAMG">
        <div class="nav-logo-text">
          <strong></strong>
          <small></small>
        </div>
      </a>
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="fullscreen-menu" id="fullscreenMenu" aria-hidden="true">
      <div class="menu-inner">
        <ul class="menu-list">
          <li class="has-sub">
            <button class="sub-toggle">
              <span class="link-num">01</span>
              <span class="link-label">Clube</span>
              <span class="arrow">&#8599;</span>
            </button>
            <ul class="submenu">
              <li><a href="${url('/sobre')}">Sobre o Clube</a></li>
              <li><a href="${url('/corpos-sociais')}">Corpos Sociais</a></li>
              <li><a href="${url('/campeoes')}">Campeões Nacionais</a></li>
              <li><a href="${url('/estatisticas')}">Estatísticas</a></li>
            </ul>
          </li>
          <li class="has-sub">
            <button class="sub-toggle">
              <span class="link-num">02</span>
              <span class="link-label">Inscrição</span>
              <span class="arrow">&#8599;</span>
            </button>
            <ul class="submenu">
              <li><a href="${url('/regulamento')}" target="_blank">Regulamento</a></li>
              <li><a href="${url('/inscrever')}" target="_blank">Inscrever</a></li>
            </ul>
          </li>
          <li class="has-sub">
            <button class="sub-toggle">
              <span class="link-num">03</span>
              <span class="link-label">Provas</span>
              <span class="arrow">&#8599;</span>
            </button>
            <ul class="submenu">
              <li><a href="#" id="btn-calendario">Calendário</a></li>
              <li><a href="${url('/meeting/fernando-alves')}" target="_blank">Meeting Fernando Alves</a></li>
              <li><a href="${url('/volta-aos-7-vidrala')}" target="_blank">Volta aos 7 — Vidrala</a></li>
              <li><a href="${url('/milha-de-cristal')}" target="_blank">Milha de Cristal</a></li>
            </ul>
          </li>
          <li>
            <a href="${url('/noticias')}" class="simple-link">
              <span class="link-num">04</span>
              <span class="link-label">Notícias</span>
            </a>
          </li>
          <li>
            <a href="${url('/galeria')}" class="simple-link">
              <span class="link-num">05</span>
              <span class="link-label">Galeria</span>
            </a>
          </li>
          <li>
            <a href="${url('/contacto')}" class="simple-link">
              <span class="link-num">06</span>
              <span class="link-label">Contacto</span>
            </a>
          </li>
          <li>
            <a href="${url('/newsletter')}" class="simple-link">
              <span class="link-num">07</span>
              <span class="link-label">Newsletter</span>
            </a>
          </li>
          <li>
            <a href="${url('/admin')}" class="simple-link">
              <span class="link-num">08</span>
              <span class="link-label">Admin</span>
            </a>
          </li>
        </ul>
        <div class="menu-footer">
          <p>Clube Atletismo de Marinha Grande</p>
          <p>© 2026 CAMG</p>
        </div>
      </div>
    </div>
  `;

  const footerHTML = `
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

  const menuToggle     = document.getElementById('menuToggle');
  const fullscreenMenu = document.getElementById('fullscreenMenu');

  function openMenu() {
    fullscreenMenu.classList.add('active');
    menuToggle.classList.add('active');
    document.body.classList.add('menu-open');
    fullscreenMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
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
      const li = btn.parentElement;
      const isOpen = li.classList.contains('open');
      fullscreenMenu.querySelectorAll('.has-sub').forEach(el => el.classList.remove('open'));
      if (!isOpen) li.classList.add('open');
    });
  });

  const btnCalendario = document.getElementById('btn-calendario');
  if (btnCalendario) {
    btnCalendario.addEventListener('click', function (e) {
      e.preventDefault();
      const WORKER_URL = 'https://adal-calendario.makynetastudios.workers.dev/';
      fetch(WORKER_URL)
        .then(res => res.json())
        .then(data => window.open(data.url, '_blank'))
        .catch(() => window.open('https://www.adal.pt/calendario.php', '_blank'));
    });
  }

  const currentPath = location.pathname;
  document.querySelectorAll('.fullscreen-menu a').forEach(link => {
    if (link.href && link.pathname === currentPath) link.classList.add('active');
  });

});
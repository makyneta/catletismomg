document.addEventListener('DOMContentLoaded', function () {

  // ── BASE PATH ───────────────────────────────────────────────
  // Deteta automaticamente o repositório, funciona em localhost e em produção.
  // Ex: makyneta.github.io/catletismomg  →  base = "/catletismomg"
  // Ex: localhost / ficheiro local        →  base = ""
  const isGitHubPages = location.hostname.includes('github.io');
  const base = isGitHubPages ? '/' + location.pathname.split('/')[1] : '';

  // Helper: constrói o URL correto a partir da raiz do repo
  function url(path) {
    return base + path;
  }

  // ── PROFUNDIDADE DA PÁGINA ──────────────────────────────────
  // Se a página está numa sub-pasta (ex: pages/sobre.html),
  // os assets também precisam do caminho correto.
  // Usamos o base para tudo — os assets já devem usar caminhos absolutos.

  // ── HEADER ─────────────────────────────────────────────────
  const headerHTML = `
    <nav>
      <a href="${url('/')}" class="nav-logo">
        <img src="${url('/assets/images/logo.png')}" alt="Logo CAMG">
        <div class="nav-logo-text">
          <strong>CAMG</strong>
          <small>Atletismo</small>
        </div>
      </a>

      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">
        <span></span><span></span><span></span>
      </button>

      <ul id="navMenu">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Clube</a>
          <div class="dropdown-menu">
            <a href="${url('/sobre')}">Sobre</a>
            <a href="${url('/corpos-sociais')}">Corpos Sociais</a>
            <a href="${url('/estatisticas')}">Estatísticas</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Inscrição</a>
          <div class="dropdown-menu">
            <a href="${url('/regulamento')}" target="_blank">Regulamento</a>
            <a href="${url('/inscrever')}" target="_blank">Inscrever</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Provas</a>
          <div class="dropdown-menu">
            <a href="#" id="btn-calendario">Calendário</a>
            <a href="${url('/meeting/fernando-alves')}" target="_blank">Meeting Fernando Alves</a>
            <a href="${url('/meeting/jovem')}" target="_blank">Meeting Jovem</a>
          </div>
        </li>
        <li><a href="${url('/noticias')}">Notícias</a></li>
        <li><a href="${url('/galeria')}">Galeria</a></li>
        <li><a href="${url('/contacto')}">Contacto</a></li>
      </ul>
    </nav>
  `;

  // ── FOOTER ─────────────────────────────────────────────────
  const footerHTML = `
    <footer>
      <div class="footer-bottom">
        <p>© 2026 Clube Atletismo de Marinha Grande. Todos os direitos reservados.</p>
        <p>Website desenvolvido por <a href="https://makyneta.github.io" target="_blank">Makyneta Unipessoal, Lda.</a></p>
      </div>
    </footer>
  `;

  // ── INJEÇÃO ────────────────────────────────────────────────
  if (!document.querySelector('nav')) {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
  if (!document.querySelector('footer')) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // ── HAMBURGER ──────────────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const navMenu    = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ── DROPDOWNS ──────────────────────────────────────────────
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');

    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) dropdown.classList.add('active');
    });
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) dropdown.classList.remove('active');
    });

    if (toggle) {
      toggle.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });

  // ── LINK ATIVO ─────────────────────────────────────────────
  // Marca o link da página atual como ativo no menu
  const currentPath = location.pathname;
  document.querySelectorAll('#navMenu a').forEach(link => {
    if (link.href && link.pathname === currentPath) {
      link.classList.add('active');
    }
  });

});


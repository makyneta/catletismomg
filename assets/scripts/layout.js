document.addEventListener('DOMContentLoaded', function () {

  const isGitHubPages = location.hostname.includes('github.io');
  const base = isGitHubPages ? '/' + location.pathname.split('/')[1] : '';
  function url(path) { return base + path; }

  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@400;700;900&display=swap';
  document.head.appendChild(fontLink);

  var faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(faLink);

  const headerHTML = `
    <nav id="mainNav">
      <a href="${url('/')}" class="nav-logo">
        <img src="${url('/assets/images/logo.png')}" alt="Logo CAMG">
        <div class="nav-logo-text">
          <strong></strong>
          <small></small>
        </div>
      </a>
      <ul class="nav-links">
        <li>
          <a role="button" tabindex="0">Clube <span class="arrow-down">&#9662;</span></a>
          <ul class="dropdown">
            <li><a href="${url('/clube/sobre')}">Sobre o Clube</a></li>
            <li><a href="${url('/clube/corpos-sociais')}">Corpos Sociais</a></li>
            <li><a href="${url('/clube/campeoes-nacionais')}">Campeões Nacionais</a></li>
            <li><a href="${url('/clube/estatisticas')}">Estatísticas</a></li>
            <li><a href="${url('/newsletter')}">Newsletter</a></li>
          </ul>
        </li>
        <li>
          <a role="button" tabindex="0">Inscrição <span class="arrow-down">&#9662;</span></a>
          <ul class="dropdown">
            <li><a href="${url('/inscricao/regulamento')}" target="_blank">Regulamento</a></li>
            <li><a href="${url('/inscricao/inscrever')}" target="_blank">Inscrever</a></li>
          </ul>
        </li>
        <li>
          <a role="button" tabindex="0">Provas <span class="arrow-down">&#9662;</span></a>
          <ul class="dropdown">
            <li><a href="#" id="btn-calendario-desktop">Calendário</a></li>
            <li><a href="${url('/provas/meeting-fernando-alves')}" target="_blank">Meeting Fernando Alves</a></li>
            <li><a href="${url('/provas/volta-aos-7-vidrala')}" target="_blank">Volta aos 7</a></li>
            <li><a href="${url('/provas/milha-de-cristal')}" target="_blank">Milha de Cristal</a></li>
          </ul>
        </li>
        <li><a href="${url('/noticias')}">Notícias</a></li>
        <li><a href="${url('/galeria')}">Galeria</a></li>
        <li><a href="${url('/')}">Sócio</a></li>
        <li><a href="${url('/contacto')}">Contacto</a></li>
      </ul>
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
              <li><a href="${url('/clube/sobre')}">Sobre o Clube</a></li>
              <li><a href="${url('/clube/corpos-sociais')}">Corpos Sociais</a></li>
              <li><a href="${url('/clube/campeoes-nacionais')}">Campeões Nacionais</a></li>
              <li><a href="${url('/clube/estatisticas')}">Estatísticas</a></li>
              <li><a href="${url('/newsletter')}">Newsletter</a></li>
            </ul>
          </li>
          <li class="has-sub">
            <button class="sub-toggle">
              <span class="link-num">02</span>
              <span class="link-label">Inscrição</span>
              <span class="arrow">&#8599;</span>
            </button>
            <ul class="submenu">
              <li><a href="${url('/inscricao/regulamento')}" target="_blank">Regulamento</a></li>
              <li><a href="${url('/inscricao/inscrever')}" target="_blank">Inscrever</a></li>
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
              <li><a href="${url('/provas/meeting-fernando-alves')}" target="_blank">Meeting Fernando Alves</a></li>
              <li><a href="${url('/provas/volta-aos-7-vidrala')}" target="_blank">Volta aos 7 — Vidrala</a></li>
              <li><a href="${url('/provas/milha-de-cristal')}" target="_blank">Milha de Cristal</a></li>
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
            <a href="${url('/')}" class="simple-link">
              <span class="link-num">06</span>
              <span class="link-label">Sócio</span>
            </a>
          </li>
          <li>
            <a href="${url('/contacto')}" class="simple-link">
              <span class="link-num">07</span>
              <span class="link-label">Contacto</span>
            </a>
          </li>
        </ul>
        <div class="menu-footer">
          <p>© Makyneta Unipessoal, Lda.</p>
        </div>
      </div>
    </div>
  `;

  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <p class="footer-tagline">"Juntos, fazemos do atletismo mais do que um desporto — uma família."</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/camg_atletismo" target="_blank" rel="noopener" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/catletismomg" target="_blank" rel="noopener" aria-label="Facebook">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.youtube.com/@catletismomg" target="_blank" rel="noopener" aria-label="YouTube">
            <i class="fa-brands fa-youtube"></i>
          </a>
        </div>
        <p class="footer-copy"><a href="https://makyneta.github.io" target="_blank" rel="noopener">© Makyneta Unipessoal, Lda.</a></p>
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

  function setupCalendario(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var WORKER_URL = 'https://adal-calendario.makynetastudios.workers.dev/';
        fetch(WORKER_URL)
          .then(function(r) { return r.json(); })
          .then(function(d) { window.open(d.url, '_blank'); })
          .catch(function() { window.open('https://www.adal.pt/calendario.php', '_blank'); });
      });
    }
  }
  setupCalendario('btn-calendario');
  setupCalendario('btn-calendario-desktop');

  const currentPath = location.pathname;
  document.querySelectorAll('.nav-links a, .fullscreen-menu a').forEach(link => {
    if (link.href && link.pathname === currentPath) link.classList.add('active');
  });

});

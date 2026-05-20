document.addEventListener('DOMContentLoaded', function() {
  const headerHTML = `
    <nav>
      <a href="index.html" class="nav-logo">
        <img src="assets/images/logo.png" alt="Logo CAMG">
        <div class="nav-logo-text">
          <strong>CAMG</strong>
          <small>Atletismo</small>
        </div>
      </a>
      <button class="menu-toggle" id="menuToggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul id="navMenu">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Clube</a>
          <div class="dropdown-menu">
            <a href="sobre.html">Sobre</a>
            <a href="corpos-sociais.html">Corpos Sociais</a>
            <a href="noticias.html">Notícias</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Regulamento_Preços</a>
          <div class="dropdown-menu">
            <a href="assets/pdf/Regulamento_Época_2025-26_Formação.pdf" target="_blank">Regulamento</a>
            <a href="https://app.clube.pt/CAMG/Processes/CreatePreRegistration">Increver</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Competições</a>
          <div class="dropdown-menu">
            <a href="https://meetingfernandoalves.alfaloc.pt">11º Meeting FA</a>
            <a href="meeting.html">12º Meeting FA</a>
          </div>
        </li>
        <li><a href="galeria.html">Galeria</a></li>
        <li><a href="contacto.html">Contacto</a></li>
      </ul>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h4>Clube Atletismo de Marinha Grande</h4>
          <p>Excelência, Disciplina e Paixão pelo Atletismo desde 1995</p>
        </div>
        <div class="footer-section">
          <h4>Contacto</h4>
          <p>📞 +351 928 119 160<br>✉️ catletismomg@gmail.com</p>
        </div>
        <div class="footer-section">
          <h4>Redes Sociais</h4>
          <p><a href="https://instagram.com/camg_atletismo" target="_blank">Instagram</a> | <a href="https://facebook.com/catletismomg" target="_blank">Facebook</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Clube Atletismo de Marinha Grande. Todos os direitos reservados.</p>
        <p>Website desenvolvido por <a href="https://makyneta.github.io" target="_blank">Makyneta Unipessoal, Lda.</a></p>
      </div>
    </footer>
  `;

  if (document.querySelector('nav') === null) {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  if (document.querySelector('footer') === null) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Menu toggle mobile
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('#navMenu a:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Dropdown hover functionality
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    // Abrir ao hover (desktop)
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        dropdown.classList.add('active');
      }
    });
    
    // Fechar ao sair (desktop)
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        dropdown.classList.remove('active');
      }
    });
    
    // Click para mobile
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown') && !e.target.closest('.dropdown-toggle')) {
      dropdowns.forEach(d => {
        d.classList.remove('active');
      });
    }
  });
});
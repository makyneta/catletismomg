  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

    document.getElementById('btn-calendario').addEventListener('click', function(e) {
    e.preventDefault();

    // ⬇️ Substitui pelo URL do teu Worker copiado no Passo 3
    const WORKER_URL = 'https://adal-calendario.SEU-NOME.workers.dev';

    fetch(WORKER_URL)
      .then(res => res.json())
      .then(data => window.open(data.url, '_blank'))
      .catch(() => window.open('https://www.adal.pt/calendario.php', '_blank'));
  });
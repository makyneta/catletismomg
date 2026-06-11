const menuToggle = document.getElementById('menuToggle') as HTMLButtonElement;
const navMenu = document.getElementById('navMenu') as HTMLDivElement;

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

document.getElementById('btn-calendario')!.addEventListener('click', function (e: Event) {
  e.preventDefault();

  const WORKER_URL: string = 'https://adal-calendario.SEU-NOME.workers.dev';

  fetch(WORKER_URL)
    .then(res => res.json() as Promise<{ url: string }>)
    .then(data => window.open(data.url, '_blank'))
    .catch(() => window.open('https://www.adal.pt/calendario.php', '_blank'));
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.sidebar-nav a');

  window.addEventListener('scroll', () => {
    let current: string = '';

    sections.forEach(section => {
      const sectionTop: number = section.offsetTop;
      const sectionHeight: number = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const sidebar = document.querySelector('aside');
  const toggleBtn = document.getElementById('sidebarToggle') as HTMLButtonElement | null;
  const overlay = document.getElementById('sidebarOverlay') as HTMLDivElement | null;

  if (toggleBtn && sidebar) {
    const toggleMenu = (e?: Event): void => {
      if (e) e.stopPropagation();
      sidebar.classList.toggle('active');
      toggleBtn.classList.toggle('active');
    };

    const closeMenu = (): void => {
      sidebar.classList.remove('active');
      toggleBtn.classList.remove('active');
    };

    toggleBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    document.addEventListener('click', (e: MouseEvent) => {
      if (!sidebar.contains(e.target as Node) && sidebar.classList.contains('active')) {
        closeMenu();
      }
    });

    const menuLinks = sidebar.querySelectorAll('.sidebar-nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});

function copyCode(elementId: string): void {
  const copyText: string = document.getElementById(elementId)!.innerText;
  const button: HTMLButtonElement = (window as unknown as Record<string, unknown>).event?.target as HTMLButtonElement;

  navigator.clipboard.writeText(copyText).then(() => {
    const originalText: string = button.innerText;
    button.innerText = 'Copiado! ✓';
    button.style.backgroundColor = '#10B981';
    button.style.color = '#FFF';

    setTimeout(() => {
      button.innerText = originalText;
      button.style.backgroundColor = '';
      button.style.color = '';
    }, 2000);
  }).catch((err: unknown) => {
    alert('Falha ao copiar código: ' + err);
  });
}

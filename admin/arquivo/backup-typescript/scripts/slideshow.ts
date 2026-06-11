(function () {
  const SLIDE_DURATION: number = 1500;
  const PAUSE_ON_HOVER: boolean = false;

  document.addEventListener('DOMContentLoaded', () => {
    const hero     = document.querySelector('.hero') as HTMLElement | null;
    const slides   = document.querySelectorAll('.slide');
    const dotsWrap = document.getElementById('heroDots') as HTMLDivElement;
    const progFill = document.getElementById('progressFill') as HTMLDivElement;

    if (!slides.length || !dotsWrap || !progFill) return;

    const total: number = slides.length;
    let current: number = 0;
    let elapsed: number = 0;
    let lastTs: number | null = null;
    let rafId: number | null = null;
    let paused: boolean = false;

    slides.forEach((_, i: number) => {
      const btn = document.createElement('button');
      btn.className    = 'hero-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.addEventListener('click', () => {
        goTo(i);
        elapsed = 0;
        lastTs  = null;
      });
      dotsWrap.appendChild(btn);
    });

    const dots = dotsWrap.querySelectorAll('.hero-dot');

    function goTo(n: number): void {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');

      current = (n + total) % total;

      slides[current].classList.add('active');
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    function loop(ts: number): void {
      if (!paused) {
        if (lastTs !== null) {
          elapsed += ts - lastTs;
        }
        lastTs = ts;

        const pct: number = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        progFill.style.width = pct + '%';

        if (elapsed >= SLIDE_DURATION) {
          goTo(current + 1);
          elapsed = 0;
          lastTs  = null;
        }
      } else {
        lastTs = null;
      }

      rafId = requestAnimationFrame(loop);
    }

    if (PAUSE_ON_HOVER && hero) {
      hero.addEventListener('mouseenter', () => { paused = true; });
      hero.addEventListener('mouseleave', () => { paused = false; });
    }

    document.addEventListener('visibilitychange', () => {
      paused = document.hidden;
    });

    rafId = requestAnimationFrame(loop);
  });
})();

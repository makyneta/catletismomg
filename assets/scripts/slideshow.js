/**
 * CAMG — Hero Slideshow
 * Slideshow automático com barra de progresso e navegação por dots.
 *
 * Configuração:
 *   SLIDE_DURATION  — duração de cada slide em milissegundos (padrão: 5000)
 *   PAUSE_ON_HOVER  — pausa quando o rato está sobre a hero (padrão: true)
 *
 * Para adicionar slides: basta adicionar mais <div class="slide"><img src="..."></div>
 * no HTML — o script deteta-os automaticamente.
 */

(function () {
  'use strict';

  const SLIDE_DURATION = 2500; // ms por slide
  const PAUSE_ON_HOVER = false;

  document.addEventListener('DOMContentLoaded', () => {
    const hero       = document.querySelector('.hero');
    const slides     = document.querySelectorAll('.slide');
    const dotsWrap   = document.getElementById('heroDots');
    const progFill   = document.getElementById('progressFill');

    if (!slides.length || !dotsWrap || !progFill) return;

    const total = slides.length;
    let current = 0;
    let elapsed = 0;
    let lastTs  = null;
    let rafId   = null;
    let paused  = false;

    /* ── Criar dots ───────────────────────────────────── */
    slides.forEach((_, i) => {
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

    /* ── Ir para slide N ──────────────────────────────── */
    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');

      current = (n + total) % total;

      slides[current].classList.add('active');
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    /* ── Loop com requestAnimationFrame ──────────────── */
    function loop(ts) {
      if (!paused) {
        if (lastTs !== null) {
          elapsed += ts - lastTs;
        }
        lastTs = ts;

        const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        progFill.style.width = pct + '%';

        if (elapsed >= SLIDE_DURATION) {
          goTo(current + 1);
          elapsed = 0;
          lastTs  = null;
        }
      } else {
        lastTs = null; // reset para não acumular tempo em pausa
      }

      rafId = requestAnimationFrame(loop);
    }

    /* ── Pausa ao hover ───────────────────────────────── */
    if (PAUSE_ON_HOVER && hero) {
      hero.addEventListener('mouseenter', () => { paused = true; });
      hero.addEventListener('mouseleave', () => { paused = false; });
    }

    /* ── Pausa quando a aba fica inativa ─────────────── */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        paused = true;
      } else {
        paused = false;
      }
    });

    /* ── Iniciar ──────────────────────────────────────── */
    rafId = requestAnimationFrame(loop);
  });

})();
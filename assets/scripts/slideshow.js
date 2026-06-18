(function () {
  'use strict';

  const SLIDE_DURATION = 5000;

  document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    const total = slides.length;
    let current = 0;

    function goTo(n) {
      slides[current].classList.remove('active');
      current = (n + total) % total;
      slides[current].classList.add('active');
    }

    setInterval(() => goTo(current + 1), SLIDE_DURATION);
  });

})();

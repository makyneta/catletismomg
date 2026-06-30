(function () {
  var cards = document.querySelectorAll('#ncGallery .nc-card');
  var images = [];
  var lbIndex = 0;

  cards.forEach(function (card, idx) {
    images.push(card.querySelector('img'));
    card.addEventListener('click', function () { openLB(idx); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openLB(idx);
    });
  });

  document.getElementById('statFotos').querySelector('span').textContent = images.length;

  function openLB(idx) {
    lbIndex = idx;
    document.getElementById('ncLightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderLB();
  }

  function closeLB() {
    document.getElementById('ncLightbox').classList.remove('open');
    document.body.style.overflow = '';
  }

  function navLB(dir) {
    lbIndex = (lbIndex + dir + images.length) % images.length;
    renderLB();
  }

  function renderLB() {
    var img = images[lbIndex];
    document.getElementById('ncLbImg').src = img.src;
    document.getElementById('ncLbImg').alt = img.alt;
    document.getElementById('ncLbCounter').textContent = (lbIndex + 1) + ' / ' + images.length;
  }

  document.getElementById('ncLbClose').addEventListener('click', closeLB);
  document.getElementById('ncLbBackdrop').addEventListener('click', closeLB);
  document.getElementById('ncLbPrev').addEventListener('click', function () { navLB(-1); });
  document.getElementById('ncLbNext').addEventListener('click', function () { navLB(1); });

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('ncLightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') navLB(1);
    if (e.key === 'ArrowLeft') navLB(-1);
  });
})();

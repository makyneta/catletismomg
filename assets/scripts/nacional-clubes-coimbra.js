(function () {
  var BASE = 'assets/images/nacional-clubes-coimbra-2026/';
  var files = [
    "_MG_0029.jpg","_MG_0057.jpg","_MG_0186.jpg","_MG_0189.jpg","_MG_0193.jpg",
    "_MG_0211.jpg","_MG_0212.jpg","_MG_0214.jpg","_MG_0266.jpg","_MG_0288.jpg",
    "_MG_0289.jpg","_MG_0293.jpg","_MG_0295.jpg","_MG_0298.jpg","_MG_0301.jpg",
    "_MG_0312.jpg","_MG_0316.jpg","_MG_0329.jpg","_MG_0412.jpg","_MG_0415.jpg",
    "_MG_0417.jpg","_MG_0418.jpg","_MG_0436.jpg","_MG_0440.jpg","_MG_0442.jpg",
    "_MG_0445.jpg","_MG_0449.jpg","_MG_0451.jpg","_MG_0458.jpg","_MG_0460.jpg",
    "_MG_0462.jpg","_MG_0469.jpg","_MG_0471.jpg","_MG_0474.jpg","_MG_0476.jpg",
    "_MG_0483.jpg","_MG_0490.jpg","_MG_0492.jpg","_MG_0500.jpg","_MG_0504.jpg",
    "_MG_0506.jpg","_MG_0509.jpg","_MG_0529.jpg","_MG_0544.jpg","_MG_0593.jpg",
    "_MG_0604.jpg","_MG_0636.jpg","_MG_0653.jpg","_MG_0669.jpg","_MG_0672.jpg",
    "_MG_0677.jpg","_MG_0681.jpg","_MG_0686.jpg","_MG_0697.jpg","_MG_0713.jpg",
    "_MG_0716.jpg","_MG_0723.jpg","_MG_0726.jpg","_MG_0728.jpg","_MG_0730.jpg",
    "_MG_0732.jpg","_MG_0745.jpg","_MG_0765.jpg","_MG_0767.jpg","_MG_0768.jpg",
    "_MG_0807.jpg","_MG_0817.jpg","_MG_0831.jpg","_MG_0841.jpg","_MG_0846.jpg",
    "_MG_0858.jpg","_MG_0859.jpg","_MG_1027.jpg","_MG_1041.jpg","_MG_1042.jpg",
    "_MG_1060.jpg","_MG_1067.jpg","_MG_1078.jpg","_MG_1098.jpg","_MG_1316.jpg",
    "_MG_1318.jpg","_MG_1321.jpg","_MG_1333.jpg","_MG_1344.jpg","_MG_1347.jpg",
    "_MG_1348.jpg","_MG_1351.jpg","_MG_1360.jpg","_MG_1371.jpg","_MG_1374.jpg",
    "_MG_1428.jpg","_MG_1530.jpg","_MG_1538.jpg","_MG_1542.jpg","_MG_1543.jpg",
    "_MG_1547.jpg","_MG_1551.jpg","_MG_1559.jpg","_MG_1576.jpg","_MG_1589.jpg",
    "_MG_1612.jpg","_MG_1734.jpg","_MG_1813.jpg","_MG_1887.jpg","_MG_1888.jpg",
    "_MG_2312.jpg","_MG_2354.jpg","_MG_2360.jpg","_MG_2372.jpg","_MG_2374.jpg",
    "_MG_2375.jpg","_MG_2383.jpg","_MG_2391.jpg","_MG_2417.jpg","_MG_2448.jpg",
    "_MG_2451.jpg","_MG_2455.jpg","_MG_2456.jpg","_MG_2490.jpg","_MG_2491.jpg",
    "_MG_2518.jpg","_MG_2548.jpg","_MG_2553.jpg","_MG_2565.jpg","_MG_2590.jpg",
    "_MG_2593.jpg","_MG_2599.jpg","_MG_2600.jpg","_MG_2602.jpg","_MG_2609.jpg",
    "_MG_2610.jpg","_MG_2611.jpg","_MG_2617.jpg","_MG_2619.jpg","_MG_2624.jpg",
    "_MG_2647.jpg","_MG_2651.jpg","_MG_2658.jpg","_MG_2660.jpg","_MG_2670.jpg",
    "_MG_2673.jpg","_MG_2676.jpg","_MG_2678.jpg","_MG_2690.jpg","_MG_2691.jpg",
    "_MG_2711.jpg","_MG_2722.jpg","_MG_2725.jpg","_MG_2728.jpg","_MG_2769.jpg",
    "_MG_2784.jpg","_MG_2785.jpg","_MG_2788.jpg","_MG_2791.jpg","_MG_2794.jpg",
    "_MG_2797.jpg","_MG_2801.jpg","_MG_2814.jpg","_MG_2816.jpg","_MG_2821.jpg",
    "_MG_2829.jpg","_MG_2831.jpg","_MG_2833.jpg","_MG_3045.jpg","_MG_3047.jpg",
    "_MG_3054.jpg","_MG_3057.jpg","_MG_3062.jpg","_MG_3204.jpg","_MG_3206.jpg",
    "_MG_3209.jpg","_MG_3214.jpg","_MG_3217.jpg","_MG_3220.jpg","_MG_9847.jpg",
    "_MG_9853.jpg","_MG_9856.jpg","_MG_9859.jpg","_MG_9878.jpg","_MG_9988.jpg"
  ];

  var images = [];
  var lbIndex = 0;

  function buildGallery() {
    images = [];
    var wrap = document.getElementById('ncGallery');
    wrap.innerHTML = '';

    if (!files.length) {
      wrap.innerHTML = '<div class="nc-loading">Nenhuma fotografia disponivel.</div>';
      return;
    }

    var grid = document.createElement('div');
    grid.className = 'nc-grid';
    wrap.appendChild(grid);

    files.forEach(function (f, idx) {
      var src = BASE + f;
      var card = document.createElement('div');
      card.className = 'nc-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', f);

      var img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = 'Nacional de Clubes 2026 - Coimbra';
      img.src = src;
      card.appendChild(img);

      var overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = '<span>Nacional de Clubes 2026</span>';
      card.appendChild(overlay);

      images.push(f);
      card.addEventListener('click', function () { openLB(idx); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') openLB(idx);
      });

      grid.appendChild(card);
    });

    document.getElementById('statFotos').querySelector('span').textContent = images.length;
  }

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
    var f = images[lbIndex];
    var img = document.getElementById('ncLbImg');
    img.src = BASE + f;
    img.alt = 'Nacional de Clubes 2026 - Coimbra';
    document.getElementById('ncLbCounter').textContent = (lbIndex + 1) + ' / ' + images.length;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ncGallery').innerHTML = '<div class="nc-loading">A carregar fotografias...</div>';

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

    buildGallery();
  });
})();

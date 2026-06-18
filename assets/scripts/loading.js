(function () {

  var msgs = [
    'A preparar a pista…',
    'A aquecer os atletas…',
    'Quase pronto…',
    'Nos blocos de partida…',
  ];

  var loader = document.createElement('div');
  loader.id = 'camg-loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');
  loader.setAttribute('aria-label', 'A carregar');

  loader.innerHTML =
    '<div class="loader-logo">' +
      '<img src="assets/images/logo.png" alt="Logo CAMG">' +
    '</div>' +
    '<div class="loader-track">' +
      '<div class="loader-track-fill" id="loaderBar"></div>' +
    '</div>' +
    '<p class="loader-club">Clube Atletismo · Marinha Grande</p>' +
    '<p class="loader-msg" id="loaderMsg">' + msgs[0] + '</p>';

  document.documentElement.appendChild(loader);

  var bar   = document.getElementById('loaderBar');
  var msgEl = document.getElementById('loaderMsg');
  var progress = 0;
  var msgIdx   = 0;

  var tick = setInterval(function () {
    var step = progress < 60 ? 8 : progress < 85 ? 3 : 1;
    progress = Math.min(progress + step, 92);
    if (bar) bar.style.width = progress + '%';

    if (progress % 28 === 0 && msgEl) {
      msgIdx = (msgIdx + 1) % msgs.length;
      msgEl.style.opacity = '0';
      setTimeout(function () {
        if (msgEl) { msgEl.textContent = msgs[msgIdx]; msgEl.style.opacity = '1'; }
      }, 200);
    }
  }, 80);

  function dismiss() {
    clearInterval(tick);
    if (bar) bar.style.width = '100%';

    setTimeout(function () {
      if (loader) {
        loader.classList.add('hide');
        loader.addEventListener('transitionend', function () {
          if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        }, { once: true });
      }
    }, 280);
  }

  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
    setTimeout(dismiss, 6000);
  }

})();

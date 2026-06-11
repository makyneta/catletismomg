(function () {
  const msgs: string[] = [
    'A preparar a pista…',
    'A aquecer os atletas…',
    'Quase pronto…',
    'Nos blocos de partida…',
  ];

  const loaderHTML: string = `
    <div id="camg-loader" role="status" aria-live="polite" aria-label="A carregar">
      <div class="loader-logo">
        <img
          src="assets/images/logo.png"
          alt="Logo CAMG"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="loader-logo-fallback" style="display:none">🏅</div>
      </div>
      <div class="loader-track">
        <div class="loader-track-fill" id="loaderBar"></div>
      </div>
      <div class="loader-runner-wrap">
        <span class="loader-runner">🏃</span>
      </div>
      <p class="loader-club">Clube Atletismo · Marinha Grande</p>
      <p class="loader-msg" id="loaderMsg">${msgs[0]}</p>
      <div class="loader-lines">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;

  document.write(loaderHTML);

  const bar   = document.getElementById('loaderBar') as HTMLDivElement | null;
  const msgEl = document.getElementById('loaderMsg') as HTMLParagraphElement | null;
  let progress: number = 0;
  let msgIdx: number   = 0;

  const tick: ReturnType<typeof setInterval> = setInterval(() => {
    const step: number = progress < 60 ? 8 : progress < 85 ? 3 : 1;
    progress = Math.min(progress + step, 92);
    if (bar) bar.style.width = progress + '%';

    if (progress % 28 === 0 && msgEl) {
      msgIdx = (msgIdx + 1) % msgs.length;
      msgEl.style.opacity = '0';
      setTimeout(() => {
        if (msgEl) { msgEl.textContent = msgs[msgIdx]; msgEl.style.opacity = '1'; }
      }, 200);
    }
  }, 80);

  function dismiss(): void {
    clearInterval(tick);
    if (bar) bar.style.width = '100%';

    setTimeout(() => {
      const loader = document.getElementById('camg-loader');
      if (loader) {
        loader.classList.add('hide');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
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

// ═══════════════════════════════════════════════════════════════
//  loading.js — CAMG Page Loader
//  ⚠️  NÃO uses defer neste script — tem de correr antes do body
//  <script src="assets/scripts/loading.js"></script>
// ═══════════════════════════════════════════════════════════════

(function () {

  // Mensagens que rodam enquanto carrega
  const msgs = [
    'A preparar a pista…',
    'A aquecer os atletas…',
    'Quase pronto…',
    'Nos blocos de partida…',
  ];

  // Injeta o loader ANTES de tudo o resto renderizar
  const loaderHTML = `
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

  // Escreve diretamente no documento (antes do DOMContentLoaded)
  document.write(loaderHTML);

  // ── Progresso simulado ──────────────────────────────────────
  const bar    = document.getElementById('loaderBar');
  const msgEl  = document.getElementById('loaderMsg');
  let progress = 0;
  let msgIdx   = 0;

  const tick = setInterval(() => {
    // Velocidade variável: rápida no início, abranda perto do fim
    const step = progress < 60 ? 8 : progress < 85 ? 3 : 1;
    progress = Math.min(progress + step, 92); // fica em 92 até a página carregar de verdade
    if (bar) bar.style.width = progress + '%';

    // Roda mensagens
    if (progress % 28 === 0 && msgEl) {
      msgIdx = (msgIdx + 1) % msgs.length;
      msgEl.style.opacity = '0';
      setTimeout(() => {
        if (msgEl) { msgEl.textContent = msgs[msgIdx]; msgEl.style.opacity = '1'; }
      }, 200);
    }
  }, 80);

  // ── Esconde quando tudo estiver carregado ───────────────────
  function dismiss() {
    clearInterval(tick);
    if (bar) bar.style.width = '100%';

    // Pequena pausa para o utilizador ver os 100%
    setTimeout(() => {
      const loader = document.getElementById('camg-loader');
      if (loader) {
        loader.classList.add('hide');
        // Remove do DOM após a transição para não bloquear nada
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      }
    }, 280);
  }

  // Dispara no load completo (imagens, CSS, tudo)
  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
    // Fallback: remove sempre após 6 segundos mesmo que algo falhe
    setTimeout(dismiss, 6000);
  }

})();
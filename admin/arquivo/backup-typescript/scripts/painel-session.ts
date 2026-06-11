if (sessionStorage.getItem('camg_autenticado') !== 'true') {
  window.location.href = 'login.html';
}

let timeoutLimpezaClipboard: ReturnType<typeof setTimeout> | null = null;

function encerrarSessaoPro(): void {
  sessionStorage.removeItem('camg_autenticado');
  window.location.href = 'login.html';
}

function controlarVisibilidade(botao: HTMLButtonElement): void {
  const containerLinha = botao.closest('.vault-row') as HTMLElement;
  const campoTexto = containerLinha.querySelector('.vault-input-display') as HTMLInputElement;

  if (campoTexto.type === 'password') {
    campoTexto.type = 'text';
    campoTexto.style.letterSpacing = '0.05em';
    containerLinha.classList.add('revealed');
    botao.innerText = 'Ocultar';
  } else {
    campoTexto.type = 'password';
    campoTexto.style.letterSpacing = '0.35em';
    containerLinha.classList.remove('revealed');
    botao.innerText = 'Ver';
  }
}

function ejecutarCopia(conteudo: string, botao: HTMLButtonElement): void {
  navigator.clipboard.writeText(conteudo).then(() => {
    const labelOriginal: string = botao.innerText;
    botao.innerText = 'Copiado';
    botao.style.borderColor = 'var(--status-green)';
    botao.style.color = 'var(--status-green)';

    setTimeout(() => {
      botao.innerText = labelOriginal;
      botao.style.borderColor = 'var(--border-subtle)';
      botao.style.color = 'var(--text-main)';
    }, 1500);

    if (timeoutLimpezaClipboard) clearTimeout(timeoutLimpezaClipboard);

    timeoutLimpezaClipboard = setTimeout(() => {
      navigator.clipboard.writeText(' ').then(() => {
        console.log('[Segurança] Área de transferência limpa automaticamente após 1m50s.');
      }).catch((err: unknown) => console.warn('Erro ao limpar cache temporário:', err));
    }, 110000);
  }).catch((err: unknown) => {
    console.error('Falha no subsistema de cópia nativa: ', err);
  });
}

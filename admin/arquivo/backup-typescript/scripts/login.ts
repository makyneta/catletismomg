const CHAVES_AUTORIZADAS: string[] = [
  'camg1995',
  'camg',
  'Camg1995',
];

function autenticarUtilizador(): void {
  const inputChave = (document.getElementById('masterKey') as HTMLInputElement).value;
  const erroContainer = document.getElementById('authError') as HTMLDivElement;

  if (CHAVES_AUTORIZADAS.includes(inputChave)) {
    sessionStorage.setItem('camg_autenticado', 'true');
    window.location.href = 'painel.html';
  } else {
    erroContainer.style.display = 'block';
    (document.getElementById('masterKey') as HTMLInputElement).value = '';
  }
}

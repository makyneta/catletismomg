interface FormspreeError {
  message: string;
}

interface FormspreeResponse {
  ok: boolean;
  errors?: FormspreeError[];
}

document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('ctt-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status') as HTMLDivElement | null;
  const btn    = document.getElementById('form-btn') as HTMLButtonElement | null;

  if (form && status && btn) {
    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();

      btn.disabled = true;
      btn.innerText = 'A enviar...';
      status.className = 'form-status';
      status.innerText = '';

      const formData: FormData = new FormData(form);
      const data: Record<string, unknown> = Object.fromEntries(formData);

      try {
        const response: Response = await fetch(form.action, {
          method: form.method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          status.classList.add('success');
          status.innerText = '🏆 Mensagem enviada com sucesso! Obrigado pelo contacto.';
          form.reset();
        } else {
          const responseData: FormspreeResponse = await response.json() as FormspreeResponse;
          if (responseData.errors) {
            status.innerText = responseData.errors.map(error => error.message).join(', ');
          } else {
            status.innerText = '❌ Ocorreu um problema ao enviar. Por favor, tenta novamente.';
          }
          status.classList.add('error');
        }
      } catch (_error: unknown) {
        status.classList.add('error');
        status.innerText = '❌ Erro de ligação. Verifica a tua internet.';
      } finally {
        btn.disabled = false;
        btn.innerText = 'Enviar Mensagem';
      }
    });
  }
});

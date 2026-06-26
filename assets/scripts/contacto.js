document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ctt-form");
  const status = document.getElementById("form-status");
  const btn = document.getElementById("form-btn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.textContent = "A enviar...";
      status.className = "form-status";
      status.textContent = "";

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.classList.add("success");
          status.textContent = "Mensagem enviada com sucesso! Obrigado pelo contacto.";
          form.reset();
        } else {
          status.classList.add("error");
          status.textContent = "Ocorreu um problema ao enviar. Tente novamente.";
        }
      } catch (error) {
        status.classList.add("error");
        status.textContent = "Erro de ligacao. Verifique a sua internet.";
      } finally {
        btn.disabled = false;
        btn.textContent = "Enviar Mensagem";
      }
    });
  }
});

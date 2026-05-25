document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ctt-form");
  const status = document.getElementById("form-status");
  const btn = document.getElementById("form-btn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Impede o redirecionamento para o Formspree
      
      // Feedback visual de carregamento
      btn.disabled = true;
      btn.innerText = "A enviar...";
      status.className = "form-status"; 
      status.innerText = "";

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Sucesso
          status.classList.add("success");
          status.innerText = "🏆 Mensagem enviada com sucesso! Obrigado pelo contacto.";
          form.reset(); // Limpa os campos do formulário
        } else {
          // Erro retornado pelo servidor
          const responseData = await response.json();
          if (responseData.hasOwnProperty('errors')) {
            status.innerText = responseData.errors.map(error => error.message).join(", ");
          } else {
            status.innerText = "❌ Ocorreu um problema ao enviar. Por favor, tenta novamente.";
          }
          status.classList.add("error");
        }
      } catch (error) {
        // Erro de rede/conexão
        status.classList.add("error");
        status.innerText = "❌ Erro de ligação. Verifica a tua internet.";
      } finally {
        // Restaura o botão
        btn.disabled = false;
        btn.innerText = "Enviar Mensagem";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const championPhotos = document.querySelectorAll(".champion-photo");

  // Abrir o Lightbox ao clicar na imagem
  championPhotos.forEach(photo => {
    photo.addEventListener("click", () => {
      lightboxImg.src = photo.src; // Copia o caminho da imagem clicada
      lightboxImg.alt = photo.alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Bloqueia o scroll da página de fundo
    });
  });

  // Função para fechar o Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Reativa o scroll da página
    setTimeout(() => {
      lightboxImg.src = ""; // Limpa a imagem após a animação para poupar memória
    }, 300);
  };

  // Fechar ao clicar no botão (X)
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // Fechar ao clicar em qualquer zona escura do fundo
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        closeLightbox();
      }
    });
  }

  // Fechar ao carregar na tecla ESC do teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});
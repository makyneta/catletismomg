document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('image-lightbox') as HTMLDivElement;
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const closeBtn = document.querySelector('.lightbox-close') as HTMLButtonElement | null;
  const championPhotos = document.querySelectorAll('.champion-photo') as NodeListOf<HTMLImageElement>;

  championPhotos.forEach(photo => {
    photo.addEventListener('click', () => {
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = (): void => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== lightboxImg) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});

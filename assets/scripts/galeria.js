const galleryData = [
  {
    src: 'assets/images/gallery/DSC01290.JPG',
    title: '9º Meeting Jovem',
  },
  {
    src: 'assets/images/gallery/DSC01335.JPG',
    title: 'Equipa Jovem',
  },
  {
    src: 'assets/images/gallery/DSC01524.JPG',
    title: '12º Meeting Fernando Alves',
  },
  {
    src: 'assets/images/gallery/galeria_2-1024x683.jpg',
    title: '200 Metros',
  }
];

let currentImageIndex = 0;

function openModal(index) {
  currentImageIndex = index;
  updateModalContent();
  document.getElementById('imageModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('imageModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateModalContent() {
  const image = galleryData[currentImageIndex];
  document.getElementById('modalImage').src = image.src;
  document.getElementById('modalTitle').textContent = image.title;
  document.getElementById('modalDescription').textContent = image.description;
  document.getElementById('imageCounter').textContent = `${currentImageIndex + 1} de ${galleryData.length}`;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryData.length;
  updateModalContent();
}

function previousImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
  updateModalContent();
}

// Navegação por teclado
document.addEventListener('keydown', function(event) {
  const modal = document.getElementById('imageModal');
  if (!modal.classList.contains('active')) return;

  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'ArrowLeft') previousImage();
  if (event.key === 'Escape') closeModal();
});

// Fechar ao clicar fora
document.getElementById('imageModal').addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});
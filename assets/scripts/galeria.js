  const images = [
    { src: 'https://via.placeholder.com/800x600/1a7a2e/ffffff?text=Treinos+Diários', title: 'Treinos Diários' },
    { src: 'https://via.placeholder.com/800x600/0f5a1e/ffffff?text=Competições', title: 'Competições' },
    { src: 'https://via.placeholder.com/800x600/8b0000/ffffff?text=Pódios', title: 'Pódios e Medalhas' },
    { src: 'https://via.placeholder.com/800x600/f0e800/111111?text=Equipa', title: 'Equipa CAMG' },
    { src: 'https://via.placeholder.com/800x600/1a7a2e/ffffff?text=Instalações', title: 'Instalações Modernas' },
    { src: 'https://via.placeholder.com/800x600/0f5a1e/ffffff?text=Eventos', title: 'Eventos Especiais' },
    { src: 'https://via.placeholder.com/800x600/8b0000/ffffff?text=Treino+Força', title: 'Treino de Força' },
    { src: 'https://via.placeholder.com/800x600/1a7a2e/ffffff?text=Saltos', title: 'Modalidades de Salto' },
    { src: 'https://via.placeholder.com/800x600/f0e800/111111?text=Lançamentos', title: 'Lançamentos' }
  ];

  function openModal(index) {
    document.getElementById('modalImage').src = images[index].src;
    document.getElementById('modalTitle').textContent = images[index].title;
    document.getElementById('imageModal').classList.add('active');
  }

  function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
  }

  document.getElementById('imageModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeModal();
    }
  });
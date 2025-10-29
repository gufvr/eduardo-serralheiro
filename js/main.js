function abrirImagem(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modalImg.src = src;
  modal.classList.remove("hidden");

  setTimeout(() => modalImg.classList.add("scale-100"), 10);
}

function fecharImagem() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modalImg.classList.remove("scale-100");
  setTimeout(() => modal.classList.add("hidden"), 300);
}
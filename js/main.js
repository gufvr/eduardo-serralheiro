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

const WA_NUMBER = "5515997171374";

function abrirWhatsApp(mensagem = null) {
  const textoBase =
    mensagem || "👋 Olá! Vi seu site e gostaria de um orçamento.";
  const url = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(
    textoBase
  )}`;
  window.open(url, "_blank");
}

const mensagemPadrao =
  "👋 Olá! Gostei muito do seu site e do trabalho que você faz.\nGostaria de solicitar um orçamento e entender melhor as opções disponíveis";

["whatsappHeaderBtn", "whatsappMobileBtn", "floatWhats"].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      abrirWhatsApp(mensagemPadrao);
    });
  }
});

const form = document.getElementById("orcamentoForm");
const telefoneInput = document.getElementById("telefone");

const regexNumeros = /^\d+$/;

telefoneInput.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
  if (valor.length > 11) valor = valor.slice(0, 11);

  let formatado = valor;
  if (valor.length > 6) {
    formatado = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    formatado = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
  } else if (valor.length > 0) {
    formatado = `(${valor}`;
  }

  e.target.value = formatado;
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = telefoneInput.value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    const numerosSomente = telefone.replace(/\D/g, "");
    if (!regexNumeros.test(numerosSomente)) {
      alert("O campo 'Telefone' deve conter apenas números!");
      telefoneInput.focus();
      return;
    }

    const mensagemExtra = `👋 Olá! Vi seu site e gostaria de um orçamento.\n\n📋Nome completo: ${
      nome || "-"
    }\n📱Telefone: ${telefone || "-"}\n🧑‍🏭Serviço: ${
      servico || "-"
    }\n📝Mensagem: ${mensagem || "-"}`;

    abrirWhatsApp(mensagemExtra);
  });

  const limparBtn = document.getElementById("limparBtn");
  if (limparBtn) {
    limparBtn.addEventListener("click", () => form.reset());
  }
}

function abrirImagem(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modalImg.src = src;
  modal.classList.remove("hidden");

  setTimeout(() => modalImg.classList.add("scale-100"), 10);
}
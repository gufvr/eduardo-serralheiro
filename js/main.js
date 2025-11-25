let lastScroll = 0;
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    header.style.transform = "translateY(-100%)";
    header.style.opacity = "0";
    header.style.boxShadow = "none";
  } else {
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";

    if (currentScroll > 20) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  lastScroll = currentScroll;
});


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
  const textoBase = mensagem || "👋 Olá! Vi seu site e gostaria de um orçamento.";
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

const regexNumeros = /^\d{10,11}$/;

telefoneInput.addEventListener("input", (event) => {
  const input = event.target;

  let pos = input.selectionStart;

  let numeros = input.value.replace(/\D/g, "");

  if (numeros.length > 11) numeros = numeros.slice(0, 11);

  const formatado = formatarTelefone(numeros);

  const diff = formatado.length - input.value.length;

  input.value = formatado;

  input.selectionStart = input.selectionEnd = pos + diff;

});

function formatarTelefone(v) {
  if (v.length === 0) return "";
  if (v.length <= 2) return `(${v}`;
  if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
}

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
    limparBtn.addEventListener("click", () => {
      form.reset();
    });
  }
}


const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

themeToggle?.addEventListener("click", () => {
  const isDark = html.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);

  localStorage.setItem("theme", newTheme);
});

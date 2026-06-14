document.addEventListener("DOMContentLoaded", () => {
  // ----- Elementos do formulário -----
  const formulario = document.getElementById("formularioCadastro");
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoTelefone = document.getElementById("telefone");
  const botoesNivel = document.querySelectorAll(".botao-nivel");
  let nivelSelecionado = null;

  // ----- Seleção do nível de parentesco -----
  botoesNivel.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoesNivel.forEach((b) =>
        b.classList.remove(
          "ativo-familiar",
          "ativo-amigos",
          "ativo-conhecidos",
        ),
      );

      nivelSelecionado = botao.dataset.nivel;

      const classePorNivel = {
        Familiar: "ativo-familiar",
        Amigos: "ativo-amigos",
        Conhecidos: "ativo-conhecidos",
      };

      botao.classList.add(classePorNivel[nivelSelecionado]);
      document.getElementById("erroNivel").style.display = "none";
      document.getElementById("grupoNivel").classList.remove("campo-invalido");
    });
  });

  // ----- Máscara automática para o telefone -----
  campoTelefone.addEventListener("input", () => {
    let numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 10)
      numeros = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    else if (numeros.length > 6)
      numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    else if (numeros.length > 2)
      numeros = numeros.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");

    campoTelefone.value = numeros;
  });

  // ----- Valida um campo e exibe erro se necessário -----
  function validarCampo(campo, idErro, verificar) {
    const grupo = campo.closest(".grupo-campo");
    const mensagemErro = document.getElementById(idErro);

    if (!verificar(campo.value)) {
      grupo.classList.add("campo-invalido");
      mensagemErro.style.display = "block";
      return false;
    }

    grupo.classList.remove("campo-invalido");
    mensagemErro.style.display = "none";
    return true;
  }

  // ----- Limpa o erro enquanto o usuário digita -----
  function limparErroAoDigitar(campo, idErro) {
    campo.addEventListener("input", () => {
      campo.closest(".grupo-campo").classList.remove("campo-invalido");
      document.getElementById(idErro).style.display = "none";
    });
  }

  limparErroAoDigitar(campoNome, "erroNome");
  limparErroAoDigitar(campoEmail, "erroEmail");
  limparErroAoDigitar(campoTelefone, "erroTelefone");

  // ----- Envio do formulário -----
  // → async porque Armazenamento.adicionar agora faz uma requisição HTTP
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    let formularioValido = true;

    formularioValido =
      validarCampo(
        campoNome,
        "erroNome",
        (valor) => valor.trim().length >= 3,
      ) && formularioValido;
    formularioValido =
      validarCampo(campoEmail, "erroEmail", (valor) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
      ) && formularioValido;
    formularioValido =
      validarCampo(
        campoTelefone,
        "erroTelefone",
        (valor) => valor.replace(/\D/g, "").length >= 10,
      ) && formularioValido;

    if (!nivelSelecionado) {
      document.getElementById("grupoNivel").classList.add("campo-invalido");
      document.getElementById("erroNivel").style.display = "block";
      formularioValido = false;
    }

    if (!formularioValido) return;

    try {
      // → await: espera o POST chegar no JSON Server antes de continuar
      await Armazenamento.adicionar({
        nome: campoNome.value.trim(),
        email: campoEmail.value.trim().toLowerCase(),
        telefone: campoTelefone.value.trim(),
        nivel: nivelSelecionado,
      });

      exibirToast("✓ Contato cadastrado com sucesso!", "sucesso");

      formulario.reset();
      botoesNivel.forEach((b) =>
        b.classList.remove(
          "ativo-familiar",
          "ativo-amigos",
          "ativo-conhecidos",
        ),
      );
      nivelSelecionado = null;
      campoNome.focus();
    } catch {
      exibirToast("Erro ao salvar. O servidor está rodando?", "erro");
    }
  });

  // ----- Botão Cancelar -----
  document.getElementById("botaoCancelar").addEventListener("click", () => {
    formulario.reset();
    botoesNivel.forEach((b) =>
      b.classList.remove("ativo-familiar", "ativo-amigos", "ativo-conhecidos"),
    );
    nivelSelecionado = null;
    document
      .querySelectorAll(".grupo-campo")
      .forEach((grupo) => grupo.classList.remove("campo-invalido"));
  });

  campoNome.focus();
});

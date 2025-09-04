// Função para carregar dados do usuário
async function carregarPerfil() {
  const token = localStorage.getItem("token"); // pega token do localStorage

  if (!token) {
    document.getElementById("mensagem").textContent =
      "Usuário não autenticado!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // envia token
      },
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(erro);
    }

    const user = await resposta.json();

    // Preenche os campos com os dados retornados
    document.getElementById("nome").value = user.name || "";
    document.getElementById("email").value = user.email || "";
  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("mensagem").textContent =
      "Erro ao carregar perfil: " + erro.message;
    document.getElementById("mensagem").style.color = "red";
  }

  const btnAtualizar = document.getElementById("upd-btn");
  const btnDeletar = document.getElementById("btn-delete");

  btnAtualizar.addEventListener("click", async () => {
    const name = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value;

    const dadosParaAtualizar = {};
    if (name) {
      dadosParaAtualizar.name = name;
    }
    if (email) {
      dadosParaAtualizar.email = email;
    }
    if (password) {
      dadosParaAtualizar.password = password;
    }
    if (
      !dadosParaAtualizar.name &&
      !dadosParaAtualizar.email &&
      !dadosParaAtualizar.password
    ) {
      document.getElementById("mensagem").textContent =
        "Nenhum campo para atualizar";
      document.getElementById("mensagem").style.color = "red";
    }

    try {
      const resposta = await fetch("http://localhost:3000/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Autorization: "Bearer " + token,
        },
        body: JSON.stringify(dadosParaAtualizar),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }

      const user = await resposta.json();
    } catch (erro) {
      console.error("Erro:", erro);
      document.getElementById("mensagem").textContent ="Erro ao atualizar perfil: " + erro.message;
      document.getElementById("mensagem").style.color = "red";
    }
  });

  btnDeletar.addEventListener("click", async () => {
    try {
      const resposta = await fetch("http://localhost:3000/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Autorization: "Bearer " + token,
        },
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }
      document.getElementById("mensagem").textContent = "Usuario deletado!";
      document.getElementById("mensagem").style.color = "green";

      window.location.href = "login.html";
    } catch (error) {
      console.error("Erro:", error);
      document.getElementById("mensagem").textContent =
        "Erro ao deletar usuario: " + error.message;
      document.getElementById("mensagem").style.color = "red";
    }
  });
}

// Carrega o perfil assim que a página é aberta
window.addEventListener("DOMContentLoaded", carregarPerfil);

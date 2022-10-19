const buttonRedefinir = document.querySelector(".buttonRedefinir");
const buttonAcessar = document.querySelector(".buttonAcessar");

//Evento do botão de redefinir senha
buttonRedefinir?.addEventListener("click", (e) => {
  e.preventDefault();
  validateRedefinir();
});

//Evento do botão de acessar
buttonAcessar?.addEventListener("click", (e) => {
  e.preventDefault();
  validateLogin();
});


// Função responsável por validar os campos antes de fazer a redefinição da senha
async function validateRedefinir() {
  const inputSenhaAtual = document.querySelector(".senha_atual");
  const inputNovaSenha = document.querySelector(".nova_senha");
  const inputConfSenha = document.querySelector(".conf_senha");
  const senhaAtual = inputSenhaAtual.value;
  const novaSenha = inputNovaSenha.value;
  const confSenha = inputConfSenha.value;

  const bodyAlert = document.querySelector(".alertRedefinir");
  if (!senhaAtual) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                              <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                            É obrigatório o preenchimento do campo "senha atual"!
                           </div>`;

    return;
  }

  if (!novaSenha) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                              <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                             É obrigatório o preenchimento do campo "nova senha"!
                            </div>`;
    return;
  }

  if (!confSenha) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                             <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                             É obrigatório o preenchimento do campo "confirmar nova senha"!
                            </div>`;
    return;
  }

  const data = new FormData();
  data.append("senha_atual", senhaAtual);

  const passWord = await fetch(`/usuario/verify/password`, {
    method: "POST",
    body: data,
  });

  verinfoPassword = await passWord.json();

  if (verinfoPassword == false) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                              <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                             Senha atual inválida!
                            </div>`;
    return;
  }

  if (novaSenha != confSenha) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                              <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                             Nova senha e confirmar nova senha são incompatíveis!
                            </div>`;
    return;
  }

  sendRedefinir(novaSenha);
}

//Função responsável por enviar a nova senha para rota de redefinir
async function sendRedefinir(novaSenha) {
  const infoUser = await fetch(`/get/info/user`);
  const verInfoUser = await infoUser.json();

  // Insere na rota de cadastro de usuário os dados recebidos no form
  const data = new FormData();
  data.append("nova_senha", novaSenha);

  let permissao = verInfoUser.PERMISSAO;

  const newPassword = await fetch(`/${permissao}/configuracao`, {
    method: "POST",
    body: data,
  });

  const response = await newPassword.text();

  //Redireciona o usuário para a tela de login quando a redefinição da senha for concluída
  if (response == 1) {
    window.location = "/";
  }
}

//Método responsável por validar os campos do login de acesso
async function validateLogin() {
  const bodyAlert = document.querySelector(".alertAcessar");
  const verUser = document.querySelector(".userLogin");
  const verSenha = document.querySelector(".senhaLogin");
  let email = verUser.value;
  let senha = verSenha.value;

  if (!email) {
    bodyAlert.innerHTML = `<div class="msgStatusLogin">
                             <img class="IconeAlertLogin" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                               É obrigatório preencher o campo "e-mail"!
                            </div>`;
    return;
  }

  if (!senha) {
    bodyAlert.innerHTML = `<div class="msgStatusLogin">
                              <img class="IconeAlertLogin" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                                É obrigatório preencher o campo "senha"!
                            </div>`;
    return;
  }

  const getUser = await fetch(`/get/search/info/user/${email}`);
  const obUser = await getUser.json();

  if (obUser == false) {
    bodyAlert.innerHTML = `<div class="msgStatusLogin">
                              <img class="IconeAlertLogin" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                                Usuário ou senha inválidos!
                            </div>`;
    return;
  }

  if (obUser.ATIVO != 1) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                              <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Usuário ou senha inválidos!
                            </div>`;
    return;
  }

  const data = new FormData();
  data.append("email", email);
  data.append("senha", senha);
  const infoPassword = await fetch(`/verify/password/login`, {
    method: "POST",
    body: data,
  });
  const verinfoPassword = await infoPassword.json();

  if (verinfoPassword == false) {
    bodyAlert.innerHTML = `<div class="msgStatusRedefinir">
                             <img class="IconeAlertRedefinir" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Usuário ou senha inválidos!
                            </div>`;
    return;
  }

  redirectHome(obUser, data);
}

//Função responsável por redirecionar o usuário para a home correta
async function redirectHome(obUser, data) {
  let permissao = obUser["PERMISSAO"];
  const newLogin = await fetch(`/`, {
    method: "POST",
    body: data,
  });

  response = await newLogin.text();
  if (response == 1) {
    window.location = `/${obUser.PERMISSAO}/acervo`;
  }
}

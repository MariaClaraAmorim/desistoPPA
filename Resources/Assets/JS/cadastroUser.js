const buttonCadastrarUser = document.querySelector(".buttonCadastrarUsuario");
const bodyStatus = document.querySelector(".statusNewUser");
const bodyStatusSuccess = document.querySelector(".statusNewUserSuccess");
const CampoNome = document.getElementById("nome");
const CampoEmail = document.getElementById("email");
const CampoSenha = document.getElementById("senha");
const CampoConf_Senha = document.getElementById("conf_senha");
const CampoSetor = document.getElementById("setor-user");
const CampoPermissao = document.getElementById("permissao-user");
const form = document.getElementById("novoUserForm");

// Evento do botão de enviar
buttonCadastrarUser.addEventListener("click", async (e) => {
  e.preventDefault();
  validateCadastroNewUser();
});

//Evento do botão de Enter
form.addEventListener("keypress", async (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    validateCadastroNewUser();
  }
});

//Função responsável por validar e insere os dados do form na rota de cadastro de usuário
async function validateCadastroNewUser() {
  // Valida se o campo "nome" foi preenchido
  if (!CampoNome.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Preenchimento obrigatório do campo nome!
    </div>`;
    return;
  }

  // Valida se o campo "email" foi preenchido
  if (!CampoEmail.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
      <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
      Preenchimento obrigatório do campo e-mail!
      </div>`;
    return;
  }

  if (!CampoSenha.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Preenchimento obrigatório do campo senha!
    </div>`;
    return;
  }

  if (!CampoConf_Senha.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Preenchimento obrigatório do campo de confirmar senha!
    </div>`;
    return;
  }

  // Valida se os campos "setor" e "permissão" foram preenchidos
  if ((CampoSetor.value == 0) & (CampoPermissao.value == 0)) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Preenchimento obrigatório dos campos de setor e permissão!
    </div>`;
    return;
  }

  // Valida se o campo "setor" foi preenchido
  if (CampoSetor.value == 0) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Preenchimento obrigatório do campo de setor!
    </div>`;
    return;
  }

  // Valida se o campo "permissão" foi preenchido
  if (CampoPermissao.value == 0) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Preenchimento obrigatório do campo de permissão!
    </div>`;
    return;
  }

  // Verifica se já existe um usuário cadastrado com o usuário informado
  let email = CampoEmail.value;
  const obUser = await fetch(`/buscar/usuario/cadastrado/${email}`);
  const responseObUser = await obUser.json();

  if (responseObUser) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Já existe um usuário cadastrado com esse e-mail!
    </div>`;
    return;
  }

  //Verifica se a Senha e o a confirmação da tem o mesmo conteúdo
  let senha = CampoSenha.value;
  let conf_senha = CampoConf_Senha.value;
  if (senha != conf_senha) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
    <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
    Senha e confirmar senha incompatíveis!
    </div>`;
    return;
  }

  // Insere na rota de cadastro de usuário os dados recebidos no form
  const data = new FormData();
  data.append("nome", CampoNome.value);
  data.append("email", CampoEmail.value);
  data.append("senha", senha);
  data.append("setor", CampoSetor.value);
  data.append("permissao", CampoPermissao.value);
  const infoUser = await getInfoUser();

  let permissao = infoUser.PERMISSAO;
  if (permissao != "usuario") {
      const newUser = await fetch(`/admin/cadastrar/usuarios`, {
        method: "POST",
        body: data,
      });
      response = await newUser.text();

    // Atualiza a página quando o cadastro for concluído
    if (response == 1 || response == "true") {
      bodyStatus.innerHTML = ``;
      bodyStatusSuccess.innerHTML = `<div class="statusNewUserCad">
        <img class="IconeAlertSuccess" src="/Resources/Assets/Imagens/IconeAlertSucess.png" alt="">
        Usuário cadastrado com sucesso!
        </div>`;

      setTimeout(() => {
        bodyStatusSuccess.innerHTML = ``;
        location.reload();
      }, 1500);
    }
  }
}

//Método responsável por buscar as informações do usuário logado
async function getInfoUser() {
  const verInfoUser = await fetch(`/get/info/user`);
  const response = await verInfoUser.json();

  return response;
}

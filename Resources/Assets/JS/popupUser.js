const btnRendefinirInfoUser = document.querySelectorAll(".icone-redefinir");
const btnDeleteUser = document.querySelectorAll(".iconeInativo");
const btnModPermission = document.querySelectorAll(
  ".icone-modificar-permissao"
);

// Método responsável por verificar o evento de click no botão de redefinir senha de um usuário
btnRendefinirInfoUser?.forEach((element) => {
  element.addEventListener("click", () => {
    openFormRedefinirSenha(element);
  });
});

// Método responsável por verificar o evento de click no botão de excluir um usuário
btnDeleteUser?.forEach((element) => {
  element.addEventListener("click", () => {
    openFormDeleteUser(element);
  });
});

// Método responsável por verificar o evento de click no botão de redefinir a permissão do usuário
btnModPermission?.forEach((element) => {
  element.addEventListener("click", () => {
    openFormModPermission(element);
  });
});

// Função responsável por criar o popup de redefinir a permissão do usuário
async function openFormModPermission(obUser) {
  const name_user = obUser.getAttribute("data-name-user");
  const id_user = obUser.getAttribute("data-id-user");

  //CORPO DO POPUP DE REDEFINIR SENHA DO USUÁRIO
  const html = `<div class="popupPermissionAdmin">
                    <div class="popup-close-delete">
                      <img class="cancelExclusão" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                    <div class="tituloPermission">Informe sua senha para modificar a permissão desse usuário! </div>
                    <br>
                    <div class="statusRedefinir"></div>
                    <div class="input-redefinir">
                      <div class="senhaAdmin">
                        <img class="logosCadPopup" src="/Resources/Assets/Imagens/IconPassword.png" alt="Ícone de senha" />
                        <input type="password" id="senhaAdmin" name="senhaAdmin" class="form-controlPopup" placeholder="Senha do admin" required />
                      </div>
                    </div>

                    <select name="permissao" id="select-permission">
                      <option id="permission-admin" value="1">Admin</option>
                      <option id="user-permission" value="2">Usuário</option>
                    </select>

                    <button type="submit" class="btnModPermissionUser">Redefinir</button>
              </div>`;

  templates = createModal("modal-popup", html);
  closePopup(templates["modal"], templates["style"]);

  const selectPermission = document.getElementById("select-permission");

  let infoUser = await getInfoOneUser(id_user);
  let permissao = infoUser.PERMISSAO;

  if (permissao == "usuario") {
    const selectUser = document.getElementById("user-permission");
    selectUser.setAttribute("selected", "selected");
  }

  const senhaAdmin = document.getElementById("senhaAdmin");

  const data = new FormData();
  data.append("idUser", id_user);

  const btn = document.querySelector(".btnModPermissionUser");
  btn?.addEventListener("click", async () => {
    const validate = await validateSenhaAdmin(senhaAdmin);
    if (validate !== false) {
      data.append("id_new_permission", selectPermission.value);
      const infoUser = await getInfoUser();
      if (infoUser.PERMISSAO == "admin") {
        modifyUserPermission(
          templates["modal"],
          templates["style"],
          infoUser,
          data,
          id_user
        );
      }
    }
  });
}

/**
 * Método responsável por inserir o ID do usuário na rota que altera sua permissão
 */
async function modifyUserPermission(modal, style, infoUser, data, id_user) {
  // Verifica se o Admin quer alterar a próprio permissão
  if (infoUser.ID == id_user) {
      let confirmar = confirm(
        "Você deseja realmente alterar sua própria permissão de acesso?"
      );

    if (confirmar) {

      const alterar = await fetch(`/admin/modify/permission/user`, {
        method: "POST",
        body: data,
      });

      let response = await alterar.json();

      if (response.status == true) {
        location.reload();
        modal.style.display = "none";
      }
    } else {
      modal.style.display = "none";
    }

    // Verifica se o admin quer alterar a permissão de um usuário, que não seja a sua
  } else {
    const alterar = await fetch(`/admin/modify/permission/user`, {
      method: "POST",
      body: data,
    });

    let response = await alterar.json();

    if (response.status == true) {
      location.reload();
      modal.style.display = "none";
    }
  }
}

// Função responsável por validar se o campo senha do admin foi prenchido corretamente
async function validateSenhaAdmin(senhaAdmin) {
  const bodyStatus = document.querySelector(".statusRedefinir");
  if (!senhaAdmin.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de alerta">
                              Preenchimento obrigatório do campo senha do admin!
                            </div>`;

    return false;
  }

  const senhaAdm = senhaAdmin.value;
  const dataSenha = new FormData();
  dataSenha.append("senha_atual", senhaAdm);

  const req = await fetch(`/usuario/verify/password`, {
    method: "POST",
    body: dataSenha,
  });

  const response = await req.text();
  if (response == "false" || response == 1) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Senha do Admin inválida!
                            </div>`;

    return false;
  }
}

// Função responsável por criar o popup de excluir usuário
async function openFormDeleteUser(element) {
  const id_user = element.getAttribute("data-id-user");
  const nome_user = element.getAttribute("data-name-user");

  const html = ` <div id="popupExcluir">
                  <div class="popup">

                  <tituloExcluir><b>Excluir Usuário</b>

                    <div class="popup-close-delete">
                      <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                    </tituloExcluir>
                    <div class="content">
                       Você realmente deseja excluir o usuário <b>${nome_user}</b> de ID <b>${id_user}</b>?
                    </div>

                    <button type="submit" class="btnExcluirByPopup">Excluir</button>
                  </div>
                </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const buttonDelete = document.querySelector(".btnExcluirByPopup");

  buttonDelete?.addEventListener("click", () => {
    deleteUser(templates["modal"], templates["style"], id_user);
  });
}

/**
 * Método responsável por inserir o ID do usuário na rota que deixa ele inativo
 */
async function deleteUser(modal, style, id_user) {
  const infoUser = await getInfoUser();

  // Verifica se o Admin quer excluir o próprio usuário
  if (infoUser.ID == id_user) {
    let confirmar = confirm(
      "Você deseja realmente excluir seu próprio usuário?"
    );

    if (confirmar) {
      const excluir = await fetch(`/admin/excluir/usuario/${id_user}`);

      let response = await excluir.json();

      if (response.status == true) {
        location.reload();
        modal.style.display = "none";
      }
    }else {
      modal.style.display = "none";
    }

    // Verifica se o admin quer excluir um usuário, que não seja o seu
  } else {
    const excluir = await fetch(`/admin/excluir/usuario/${id_user}`);

    let response = await excluir.json();

    if (response.status == true) {
      location.reload();
      modal.style.display = "none";
    }
  }
}

function openFormRedefinirSenha(obUser) {
  const name_user = obUser.getAttribute("data-name-user");
  const id_user = obUser.getAttribute("data-id-user");

  //CORPO DO POPUP DE REDEFINIR SENHA DO USUÁRIO
  const html = `<div class="popupRedefinirSenhaUser">
                    <div class="popup-close-delete">
                      <img class="cancelExclusão" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                    <div>Informe sua senha para redefinir a senha do usuário selecionado! </div>
                    <br>
                    <div class="statusRedefinir"></div>
                    <div class="input-redefinir">
                      <div class="senhaAdmin">
                        <img class="logosCadPopup" src="/Resources/Assets/Imagens/IconPassword.png" alt="Ícone de senha" />
                        <input type="password" id="senhaAdmin" name="senhaAdmin" class="form-controlPopup" placeholder="Senha do admin" required />
                      </div>
                    </div>
                    <div class="input-redefinir">
                      <div class="newSenhaUser">
                        <img class="logosCadPopup2" src="/Resources/Assets/Imagens/IconPassword.png" alt="Ícone de senha" />
                        <input type="password" id="newSenhaUser" name="senha" class="form-controlPopup" placeholder="Nova senha do usuário" required />
                      </div>
                    </div>
                    <div class="input-redefinir">
                      <div class="ConfNewSenhaUser">
                        <img class="logosCadPopup3" src="/Resources/Assets/Imagens/IconPassword.png" alt="Ícone de senha" />
                        <input type="password" id="ConfNewSenhaUser" name="senha" class="form-controlPopup" placeholder="Confirmar nova senha do usuário" required />
                      </div>
                    </div>

                    <button type="submit" class="btnRedefinirPassWordUser">Redefinir</button>
              </div>`;

  templates = createModal("modal-popup", html);
  closePopup(templates["modal"], templates["style"]);

  const data = new FormData();
  data.append("idUser", id_user);

  const senhaAdmin = document.getElementById("senhaAdmin");
  const newSenhaUser = document.getElementById("newSenhaUser");
  const confNewSenha = document.getElementById("ConfNewSenhaUser");

  const btn = document.querySelector(".btnRedefinirPassWordUser");
  btn?.addEventListener("click", async () => {
    const validate = await validateCampos(
      senhaAdmin,
      newSenhaUser,
      confNewSenha
    );
    if (validate !== false) {
      data.append("nova_senha", newSenhaUser.value);
      resetUserPassword(templates["modal"], templates["style"], data);
    }
  });
}

// Função responsável por validar se os campos foram prenchidos corretamente
async function validateCampos(senhaAdmin, newSenhaUser, confNewSenha) {
  const bodyStatus = document.querySelector(".statusRedefinir");
  if (!senhaAdmin.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Preenchimento obrigatório do campo senha do admin!
                            </div>`;

    return false;
  }

  if (!newSenhaUser.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Preenchimento obrigatório do campo no senha do usuário!
                            </div>`;

    return false;
  }

  if (!confNewSenha.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Preenchimento obrigatório do campo confirmar nova senha do usuário!
                            </div>`;

    return false;
  }

  if (newSenhaUser.value !== confNewSenha.value) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Campos Nova senha e confirmar nova senha do usuário são incompatíveis!
                            </div>`;

    return false;
  }

  const senhaAdm = senhaAdmin.value;
  const dataSenha = new FormData();
  dataSenha.append("senha_atual", senhaAdm);

  const req = await fetch(`/usuario/verify/password`, {
    method: "POST",
    body: dataSenha,
  });

  const response = await req.text();
  if (response == "false" || response == 1) {
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
                              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
                              Senha do Admin inválida!
                            </div>`;

    return false;
  }
}

/**
 * Método responsável por insere as informações do usuário da rota de edição
 */
async function resetUserPassword(modal, style, data) {
  const reset = await fetch(`/admin/configuracao`, {
    method: "POST",
    body: data,
  });

  if ((await reset.json()) == true) {
    location.reload();
    modal.style.display = "none";
  }
}

// Função responsável por criar o modal do popup
function createModal(selector, html) {
  const style = {
    position: "fixed",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    "z-index": "100",
    backgroundColor: "rgba(0, 0, 0, .5)",
  };

  const modal = document.querySelector(`#${selector}`);

  Object.assign(modal.style, style);

  modal.innerHTML = html;

  templates = new Array();
  (templates["modal"] = modal), (templates["style"] = style);

  return templates;
}

// Função responsável por fechar o Form de exclusão
function closePopup(modal, style) {
  const closeFormDelete = document.querySelector(".popup-close-delete");

  closeFormDelete.addEventListener("click", async () => {
    modal.style.display = "none";
  });
}

//Método responsável por buscar as informações do usuário logado
async function getInfoUser() {
  const verInfoUser = await fetch(`/get/info/user`);
  const response = await verInfoUser.json();

  return response;
}

// Método responsável por buscar as informações de um usuário específico
async function getInfoOneUser(id_user) {
  const verInfoUser = await fetch(`/admin/info/one/user/${id_user}`);
  const response = await verInfoUser.json();

  return response;
}

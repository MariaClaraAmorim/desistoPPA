const btnEmprestar = document.querySelector(".botaoemprestimo");

// Método responsábel por verificar o evento de click no botão de emprestar
btnEmprestar?.addEventListener("click", () => {
  openFormEmprestarLivro(btnEmprestar);
});

// Função responsável por criar o popup de excluir livro
async function openFormEmprestarLivro(element) {
  const id_livro = element.getAttribute("data-id-livro");
  const nome_livro = element.getAttribute("data-nome-livro");

  const infoUser = await getInfoUser();
  let permissao = infoUser.PERMISSAO;

  let optionsUsers;
  if (permissao == "admin") {
    const infoUsers = await fetch(`/admin/info/all/user`);
    const users = await infoUsers.json();

    optionsUsers = users.map((user) => {
      let id_user_bd = user.ID;
      let name_user = user.NOME;

      return `<option value="${id_user_bd}">${name_user}</option>`;
    });
  } else {
    optionsUsers = `<option value="${infoUser.ID}">${infoUser.NOME}</option>`;
  }

  const html = ` <div id="popupExcluir">
                  <div id="popup-emprestar" class="popupEmpres">

                  <div class="title-popup-emprestimo"><b>Emprestar Livro</b>
                    <div class="popup-close-delete">
                      <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                  </div>
                    <div class="statusError"></div>
                    <div class="content-livro">
                    <label class="titleBookSelect" for="nome">Livro:</label>
                      <input class="titleBook" placeholder="${nome_livro}" disabled="disabled"></input>
                    </div>

                    <!-- Input com calendario com data emprestimo e devolução do livro -->
                          <div class="data">
                            <div class="dataEmprestimo">
                              <label class="titleSelect" for="inicio">Data Emprestimo:</label>
                              <br>
                              <input class="emprestimo date " type="date" name="inicio" id="data-inicio" 
                                required/>
                              <br>
                            </div>

                              <div class="dataDevolucao">
                                <label class="titleSelect" for="fim">Data Devolução:</label>
                                  <br>
                                  <input class="devolucao_date" type="date" name="fim" id="data-fim"/>
                                  <br>

                                  <p id="alerta" hidden class="alerta">Selecione uma data válida</p>
                                  <br>
                              </div>
                              <!-- Fim input calendario -->
                                <br>
                          </div>

                            <label class="titleSelect" id="emprestar-para">Emprestar livro para:</label>
                            <select name="users" id="user-ativos">
                            
                            <option value="0" >Selecione um usuário</option>
                              ${optionsUsers}
                            </select>
                            <div id="obs-emprestimo">
                              <!-- Label de observação -->
                                <label class="titleSelectObs" for="observacao_emprestimo">Observação:</label>
                              <br>
                                <textarea style="resize: none" value="{{observacao}}" name="observacao-emprestimo" id="observacao-emprestimo"
                                  maxlength="500"></textarea>
                            </div>
                        
                    <!-- Botão de envio do formulario -->
                     <div class="buttonEmprestimo">
                       <button type="button" id="botao-concluir-emprestimo">Realizar emprestimo</button>
                     </div>
                  </div>
                </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const btnEmprestar = document.getElementById("botao-concluir-emprestimo");

  btnEmprestar?.addEventListener("click", () => {
    const id_user_emprestar = document.getElementById("user-ativos").value;
    const dataEmprestimo = document.querySelector("#data-inicio").value;
    const dataDevolucao = document.querySelector("#data-fim").value;
    const obs = document.getElementById("observacao-emprestimo").value;

    const validate = validateFields(
      id_user_emprestar,
      dataEmprestimo,
      dataDevolucao
    );
    if (validate !== false) {
      lendBook(
        dataEmprestimo,
        dataDevolucao,
        id_user_emprestar,
        obs,
        permissao
      );
    }
  });
}

async function lendBook(
  dataEmprestimo,
  dataDevolucao,
  id_user,
  obs,
  permissao
) {
  const id_livro = btnEmprestar.getAttribute("data-id-livro");

  const data = new FormData();
  data.append("id_livro", id_livro);
  data.append("id_user", id_user);
  data.append("dataEmprestimo", dataEmprestimo);
  data.append("dataDevolucao", dataDevolucao);
  data.append("obs", obs);

  const lendBook = await fetch(`/${permissao}/emprestar`, {
    method: "POST",
    body: data,
  });

  const response = await lendBook.json();
  if (response.status == true) {
    location.reload();
  }
}

// Função responsável por validar se os campos de empréstimo foram preenchidos corretamente
function validateFields(id_user_emprestar, dataEmprestimo, dataDevolucao) {
  const contentError = document.querySelector(".statusError");

  if (!dataEmprestimo) {
    contentError.innerHTML = `<div class="msgAlert">
                                       <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Icone de Atenção">
                                       <div>É obrigatório o preenchimento do campo data empréstimo!</div>
                                     </div>`;
    return false;
  }

  if (!dataDevolucao) {
    contentError.innerHTML = `<div class="msgAlert">
                                       <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Icone de Atenção">
                                       <div>É obrigatório o preenchimento do campo data devolução!</div>
                                     </div>`;
    return false;
  }

  if (id_user_emprestar == 0) {
    contentError.innerHTML = `<div class="msgAlert">
                                       <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Icone de Atenção">
                                       <div>É obrigatório o preenchimento do campo emprestar livro para!</div>
                                     </div>`;
    return false;
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

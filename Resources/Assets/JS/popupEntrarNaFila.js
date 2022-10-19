const btnEntrarNaFila = document.querySelector(".botao-entrar-na-fila");

// Método responsábel por verificar o evento de click no botão de emprestar
btnEntrarNaFila?.addEventListener("click", () => {
  openFormIrPraFilaDeEspera(btnEntrarNaFila);
});

// Função responsável por criar o popup de excluir livro
async function openFormIrPraFilaDeEspera(element) {
  const id_livro = element.getAttribute("data-id-livro");
  const nome_livro = element.getAttribute("data-nome-livro");

  //ROTA QUE BUSCA OS USUÁRIO NA FILA PARA PEGAR UM LIVRO
  const infoUsers = await fetch(`/usuario/info/row/book/${id_livro}`);
  const users = await infoUsers.json();

  let optionsUsers;
  if (users.length == 0) {
    optionsUsers = `<option disabled="disabled">
    A fila de espera desse livro está vazia
    </option>`;
  } else {
    optionsUsers = users.map((user) => {
      let id_user_bd = user.ID_COLABORADOR;
      let name_user = user.NOME;

      return `<option disabled="disabled">${name_user}</option>`;
    });
  }

  //ROTA QUE BUSCA COM QUE ESTÁ O LIVRO ATUALMENTE
  const infoBook = await fetch(`/usuario/info/one/book/${id_livro}`);
  const verInfoBook = await infoBook.json();
  const user_with_book = verInfoBook.NOME;

  const html = ` <div id="popupExcluir">
                  <div id="popupEmpres" class="popup-entrar-na-fila">

                  <div class="title-popup-emprestimo"><b>Entra na fila de espera</b>
                    <div class="popup-close-delete">
                      <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                  </div>
                    <div class="statusError"></div>
                    <div class="content-livro">
                    <label class="titleBookSelect" for="nome">Livro:</label>
                      <input class="titleBook" placeholder="${nome_livro}" disabled="disabled"></input>
                    </div>

                    <label class="titleFila" for="usuario:">Livro está emprestado para:</label>
                    <br>
                    <button class="usuario-com-livro" name="usuario" disabled="disabled">${user_with_book}</button>
                    <br>

                    <label class="titleSelect" id="usuarioFila">Usuário(s) na fila:</label>
                    <select name="users" id="user-ativos">
                            
                    <option value="0">Lista Fila</option>
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
                       <button type="button" id="botao-concluir-entrar-na-fila">Entrar na fila de espera</button>
                     </div>
                  </div>
                </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const btnEmprestar = document.getElementById("botao-concluir-entrar-na-fila");

  btnEmprestar?.addEventListener("click", () => {
    sendRow();
  });
}

// Método responsável por fazer um usuário na fila de espera de um livro
async function sendRow() {
  const id_livro = btnEntrarNaFila.getAttribute("data-id-livro");
  const obs = document.getElementById("observacao-emprestimo").value;

  const data = new FormData();
  data.append("id_livro", id_livro);
  data.append("obs", obs);

  const infoUser = await getInfoUser();
  let permissao = infoUser.PERMISSAO;
  const entrarNaFila = await fetch(`/${permissao}/entrar/na/fila`, {
    method: "POST",
    body: data,
  });

  const response = await entrarNaFila.json();

  if (response.status == true) {
    location.reload();
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

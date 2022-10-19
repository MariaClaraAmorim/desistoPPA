const buttonOpenPupopFila = document.querySelectorAll(".t-row");
const btnDeleteBook = document.querySelectorAll("#popup-excluir-livro");
const btnRendefinirInfoUser = document.querySelectorAll(".icone-redefinir");
const btnDeleteCategoria = document.querySelectorAll(".popup-delete-categoria");

// Método responsável por inicializar as funções de excluir categoria
btnDeleteCategoria?.forEach((element) => {
  element.addEventListener("click", () => {
    openFormDeleteCategoria(element);
  });
});

// Método responsável por verificar o evento de click no botão de redefinir senha de um usuário
btnRendefinirInfoUser?.forEach((element) => {
  element.addEventListener("click", () => {
    openFormRedefinirSenha(element);
  });
});

//Método responsável por verificar o evento de click no botão de excluir registro da fila de espera
buttonOpenPupopFila?.forEach((element) => {
  element.addEventListener("click", (event) => {
    const e = event.target;
    if (!e.dataset.remover) return;
    openFormDeleteRegFila(e);
  });
});

// Método responsável por inicializar as funções de excluir livro
btnDeleteBook?.forEach((element) => {
  element.addEventListener("click", () => {
    openFormDeleteBook(element);
  });
});

// Função responsável por criar o body do popup de remover livro da fila de espera
function openFormDeleteCategoria(element) {
  const id_categoria = element.getAttribute("data-id-categoria");
  const nome_categoria = element.getAttribute("data-name-categoria");

  const html = ` <div id="popupExcluir">
                  <div class="popup">

                  <tituloExcluir><b>Excluir Categoria</b>

                    <div class="popup-close-delete">
                      <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                    </tituloExcluir>
                    <div class="content">
                       Você realmente deseja excluir a categoria <b>${nome_categoria}</b>?
                    </div>

                    <button type="submit" class="btnExcluirByPopup">Excluir</button>
                  </div>
                </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const buttonDeleteUser = document.querySelector(".btnExcluirByPopup");
  buttonDeleteUser?.addEventListener("click", async () => {
    deleteCategoria(templates["modal"], templates["style"], id_categoria);
  });
}

/**
 * Método responsável por inserir o ID da categoria na rota de excluir
 */
async function deleteCategoria(modal, style, id_categoria) {
  const excluir = await fetch(`/admin/excluir/categoria/${id_categoria}`);

  response = await excluir.json();
  if (response.status == true) {
    location.reload();
    modal.style.display = "none";
  }
}

// Função responsável por criar o popup de excluir livro
function openFormDeleteBook(element) {
  const id_livro = element.getAttribute("data-id-livro");
  const nome_livro = element.getAttribute("data-livro");

  const html = ` <div id="popupExcluir">
                  <div class="popup">

                  <tituloExcluir><b>Excluir Livro</b>

                    <div class="popup-close-delete">
                      <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                    </tituloExcluir>
                    <div class="content">
                       Você realmente deseja excluir o livro <b>${nome_livro}</b> de ID <b>${id_livro}</b>?
                    </div>

                    <button type="submit" class="btnExcluirByPopup">Excluir</button>
                  </div>
                </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const buttonDelete = document.querySelector(".btnExcluirByPopup");

  buttonDelete?.addEventListener("click", () => {
    deleteBook(templates["modal"], templates["style"], id_livro);
  });
}

/**
 * Método responsável por inserir o ID do livro na rota que deixa ele inativo
 */
async function deleteBook(modal, style, id_livro) {
  const excluir = await fetch(`/admin/excluir/livro/${id_livro}`);

  if ((await excluir.json()) == true) {
    location.reload();
    modal.style.display = "none";
  }
}

// Função responsável por criar o body do popup de remover livro da fila de espera
function openFormDeleteRegFila(element) {
  const id_fila = element.getAttribute("data-id-fila");
  const id_livro = element.getAttribute("data-id-livro");
  const nome_livro = element.getAttribute("data-livro");

  const html = ` <div id="popupExcluir">
                  <div class="popup">

                  <tituloExcluir><b>Excluir Livro da fila de espera</b>

                    <div class="popup-close-delete">
                      <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
                    </div>
                    </tituloExcluir>
                    <div class="content">
                       Você realmente deseja excluir o livro <b>${nome_livro}</b> da fila de espera?
                    </div>

                    <button type="submit" class="btnExcluirByPopup">Excluir</button>
                  </div>
                </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const buttonDeleteUser = document.querySelector(".btnExcluirByPopup");
  buttonDeleteUser?.addEventListener("click", async () => {
    deleteBookTheFila(templates["modal"], templates["style"], id_fila);
  });
}

/**
 * Método responsável por inserir na rota de mover livro da fila de espera o ID da fila
 */
async function deleteBookTheFila(modal, style, id_fila) {
  const infoUser = await getInfoUser();
  let permissao = infoUser.PERMISSAO;

  const excluir = await fetch(`/${permissao}/excluir/livro/fila/${id_fila}`);

  if ((await excluir.json()) == true) {
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

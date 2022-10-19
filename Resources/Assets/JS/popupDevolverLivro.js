const buttonDevolver = document.querySelector(".btn-devolver-livro");

buttonDevolver?.addEventListener("click", () => {
  openFormDevolverLivr(buttonDevolver);
});

function openFormDevolverLivr(buttonDevolver) {
  const id_livro = buttonDevolver.getAttribute("data-id-livro");
  const nome_livro = buttonDevolver.getAttribute("data-nome-livro");

  html = ` <div id="popupExcluir">
            <div class="popup">

            <tituloExcluir><b>Avaliar e Devolver livro</b>

              <div class="popup-close-delete">
                <img class="cancelExclusao" src="/Resources/Assets/Imagens/IconeCancel.png">
              </div>
              </tituloExcluir>
              <div class="content">
                 É necessário avaliar o livro <b>"${nome_livro}"</b> para fazer a devolução
              </div>

              <form  method="post" data-codigo="{{id_chamado}}" class="form-avaliacao">
              <div class="custom-checkbox">
                <input type="radio" id="radio_1" name="avaliacao" id="avaliacao_checkbox" value="10">
                <label for="radio_1">1. <img class="iconesAvaliar" src="/Resources/Assets/Imagens/IconeOtimo.png"
                    alt="Emoji de ótimo"> Ótimo</label>
              </div>
              <div class="custom-checkbox">
                <input type="radio" id="radio_2" name="avaliacao" id="avaliacao_checkbox" value="8">
                <label for="radio_2">2. <img class="iconesAvaliar" src="/Resources/Assets/Imagens/IconeBom.png"
                    alt="Emoji de Bom"> Bom</label>
              </div>
              <div class="custom-checkbox">
                <input type="radio" id="radio_3" name="avaliacao" id="avaliacao_checkbox" value="6">
                <label for="radio_3">3. <img class="iconesAvaliar" src="/Resources/Assets/Imagens/IconeRegular.png"
                    alt="Emoji de Regular"> Regular</label>
              </div>
              <div class="custom-checkbox">
                <input type="radio" id="radio_4" name="avaliacao" id="avaliacao_checkbox" value="4">
                <label for="radio_4">4. <img class="iconesAvaliar" src="/Resources/Assets/Imagens/IconeRuim.png"
                    alt="Emoji de Ruim"> Ruim</label>
              </div>
              <div class="custom-checkbox">
                <input type="radio" id="radio_5" name="avaliacao" id="avaliacao_checkbox" value="2">
                <label for="radio_5">5. <img class="iconesAvaliarPessimo" src="/Resources/Assets/Imagens/IconePéssimo.png"
                    alt="Emoji de péssimo"> Péssimo</label>
              </div>
            </form>

              <!-- Botão de envio do formulario -->
              <button type="submit" class="btnDevolverByPopup">Devolver</button>
            </div>
          </div>`;

  templates = createModal("modal-popup", html);

  closePopup(templates["modal"], templates["style"]);

  const btnDevolver = document.querySelector(".btnDevolverByPopup");

  btnDevolver?.addEventListener("click", async () => {
    devolverLivro(id_livro);
  });
}

//Método responsável por devolver e avaliar livro
async function devolverLivro(id_livro) {
  let notaSelecionada = document.querySelector("input[type='radio']:checked");

  if (notaSelecionada) {
    let nota = notaSelecionada.value;

    const reqDelvolver = await fetch(
      `/usuario/give/back/book/${id_livro}/${nota}`
    );
    const response = await reqDelvolver.json();

    const infoUser = await getInfoUser();
    if (response.status == true) {
      location.reload();
    }
  } else {
    alert("Por favor, selecione uma nota");
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

/**
 * @type {HTMLFormElement}
 */
const formEdit = document.getElementById("cadastrarLivro");
let fields = {};

// Object com campo de validação
const formValidate = {
  titulo(value) {
    return !!value;
  },
  sinopse(value) {
    return !!value;
  },
  subtitulo(value) {
    return !!value;
  },
  autor(value) {
    return !!value;
  },
  editora(value) {
    return !!value;
  },
  categoria(value) {
    const categoria = parseInt(value);
    return !!categoria;
  },
  ano(value) {
    return !!value;
  },
  isbn10(value) {
    return !!value;
  },
  isbn13(value) {
    return !!value;
  },
  observacao(value) {
    return !!value;
  },
  file(value) {
    return !!value;
  },
};

// Método que inicia as funções de mapeamento e cadastro
formEdit.onsubmit = (event) => {
  event.preventDefault();
  const formValide = validateForm(formEdit);
  const errorMessage = getErrorByName();
  showErrorMessage(errorMessage, ".statusError");
  let isbnValide = validateFields();
  event.preventDefault();

  if (isbnValide && formValide) {
    sendNewBook();
  }
};

// Função responsável por validar e mapear o form
function validateForm(form) {
  const contentInputs = form.elements;
  let result = true;

  for (let index = 0; index < contentInputs.length; index++) {
    const element = contentInputs[index];
    const name = element.name;
    fields[name] = element.value;

    // Verifica se é um arquivo
    if (name == "file") {
      const file = element.files[0];
      fields[name] = file;
    }

    if (name in formValidate) {
      result = formValidate[name](element.value);
    }
  }

  return result;
}

//Função responsável por enviar as informações do novo livro para a rota de cadastro
async function sendNewBook() {
  const data = new FormData();
  Object.entries(fields).forEach(([index, value]) => {
    data.append(index, value);
  });

  const req = await fetch(`/admin/cadastrar/livro`, {
    method: "POST",
    body: data,
  });

  const response = await req.text();

  // Atualiza a página quando o cadastro for concluído
  if (response == 1 || response == "true") {

    const bodyStatus = document.querySelector(".statusError");
    bodyStatus.innerHTML = ``;
    bodyStatus.innerHTML = `<div class="statusNewUserCad">
      <img class="IconeAlertSuccess" src="/Resources/Assets/Imagens/IconeAlertSucess.png" alt="">
      Usuário cadastrado com sucesso!
      </div>`;

    setTimeout(() => {
      bodyStatus.innerHTML = ``;
      location.reload();
    }, 1500);
  }
}

//Função responsável por validar se todos obrigatórios foram preenchidos corretamente
function validateFields() {
  // Valida se o campo título foi preenchido
  if (!fields["titulo"]) {
    return false;
  }

  // Valida se o campo sinopse foi preenchido
  if (!fields["sinopse"]) {
    return false;
  }

  // Valida se o campo autor foi preenchido
  if (!fields["autor"]) {
    return false;
  }

  // Valida se o campo editora foi preenchido
  if (!fields["editora"]) {
    return false;
  }

  // Valida se o campo edição foi preenchido
  if (!fields["edicao"]) {
    return false;
  }

  // Valida se o campo ano foi preenchido
  if (!fields["ano"]) {
    return false;
  }

  // Valida se pelo menos 1 campo isbn foi preenchido
  if (!fields["isbn10"] && !fields["isbn13"]) {
    return false;
  }

  // Valida se o campo categoria foi preenchido
  if (fields["categoria"] == 0) {
    return false;
  }

  // Valida se o campo categoria foi preenchido
  if (!fields["file"]) {
    return false;
  }

  return true;
}

//Função responsável por criar a mensagem de erro caso os campos obrigatórios não sejam preenchidos
function getErrorByName() {
  // Exibe a mensagem de erro caso o campo título não seja preenchido
  if (!fields["titulo"]) {
    return `<div class="msgAlert">
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Icone de Atenção">
              <div>É obrigatório o preenchimento do campo título!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo sinopse não seja preenchido
  if (!fields["sinopse"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo sinopse!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo autor não seja preenchido
  if (!fields["autor"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo autor do livro!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo editora não seja preenchido
  if (!fields["editora"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo editora!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo edicao não seja preenchido
  if (!fields["edicao"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo edicao!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo ano não seja preenchido
  if (!fields["ano"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo ano!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo ISBN não seja preenchido
  if (!fields["isbn10"] && !fields["isbn13"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento de no mínimo 1 ISBN!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo categoria não seja preenchido
  if (fields["categoria"] == 0) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo categoria!</div>
            </div>`;
  }

  // Exibe a mensagem de erro caso o campo de anexo não seja preenchido
  if (!fields["file"]) {
    return `<div>
              <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="Ícone de atenção">
              <div>É obrigatório o preenchimento do campo upload capa livro!</div>
            </div>`;
  }

  return "";
}

// Função responsável por exibir a mensagem de erro
function showErrorMessage(message, elementIdentifier) {
  const errorElement = document.querySelector(elementIdentifier);
  errorElement.innerHTML = message;
}

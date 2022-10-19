const campoTitulo = document.getElementById("titulo"),
  campoSinopse = document.getElementById("sinopse"),
  campoSubtitulo = document.getElementById("subtitulo"),
  campoAutor = document.getElementById("autor"),
  campoEditora = document.getElementById("editora"),
  campoEdicao = document.getElementById("edicao"),
  campoAno = document.getElementById("ano"),
  campoIsbn10 = document.getElementById("isbn10"),
  campoIsbn13 = document.getElementById("isbn13"),
  campoObs = document.getElementById("observacao"),
  campoCategoria = document.getElementById("categoria");

/**
 * @type {HTMLFormElement}
 */
const formEdit = document.getElementById("EditarLivro");
let fields = {};

// Object com campo de validação
const formValidate = {
  titulo(value) {
    return true;
  },
  sinopse(value) {
    return true;
  },
  subtitulo(value) {
    return true;
  },
  autor(value) {
    return true;
  },
  editora(value) {
    return true;
  },
  categoria(value) {
    return true;
  },
  ano(value) {
    return true;
  },
  isbn10(value) {
    return true;
  },
  isbn13(value) {
    return true;
  },
  observacao(value) {
    return true;
  },
};

// Método que inicia as funções de mapeamento e cadastro
formEdit.onsubmit = (event) => {
  event.preventDefault();
  const formValide = validateForm(formEdit);
  showErrorByName();
  let isbnValide = validateIsbn();
  event.preventDefault();

  if (isbnValide && formValide) {
    setEditBook();
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
      result = result && formValidate[name](element.value);
    }
  }
  return result;
}

//Função responsável por enserir na rota de edição as informações do livro
async function setEditBook() {
  const id_livro = formEdit.getAttribute("data-id-livro");

  const data = new FormData();
  Object.entries(fields).forEach(([index, value]) => {
    data.append(index, value);
  });

  const req = await fetch(`/admin/editar/livro/${id_livro}`, {
    method: "POST",
    body: data,
  });

  const response = await req.text();
  console.log(response);
  if (response == "true") {
    location.reload();
  }
}

//Função responsável por exibir a mensagem de erro, caso o campo ISBN não seja preenchido
function showErrorByName() {
  const status = document.querySelector(".statusError");

  if (!fields["isbn10"] && !fields["isbn13"]) {
    status.innerHTML =
      "É obrigatório o preenchimento de pelo menos um campo ISBN!";
  }
}

//Função responsável por verificar se pelo menos um campo ISBN foi preenchido
function validateIsbn() {
  if (!fields["isbn10"] && !fields["isbn13"]) {
    return false;
  }

  return true;
}

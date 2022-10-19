const buttonCadastrarCategoria = document.querySelector(
  ".buttonCadastrarCategoria"
);
const form = document.getElementById("newCategoria");
const campoSetor = document.getElementById("select-setor");
const bodyStatus = document.querySelector(".statusNewCategoria");

// Evento do botão de enviar
buttonCadastrarCategoria.addEventListener("click", async (e) => {
  e.preventDefault();
  validateCadastroNewCategoria();
});

//Evento do botão de Enter
form.addEventListener("keypress", async (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    validateCadastroNewCategoria();
  }
});

//Função responsável por validar e insere os dados do form na rota de cadastro de categoria
async function validateCadastroNewCategoria() {
  // Verifica se já existe uma categoria cadastrada com o nome informado
  let categoria = form.value;
  let setor = campoSetor.value;

  //Finaliza o código se o campo categoria não foi preenchido
  if (!categoria) {
    bodyStatus.innerHTML = `
        <div class="statusNewCategoriaCad">
          <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
            É obrigatório o preenchimento do campo "nova categoria"!
        </div>`;
    return;
  }

  //Finaliza o código se o campo setor da categoria não foi preenchido
  if (setor == 0) {
    bodyStatus.innerHTML = `
          <div class="statusNewCategoriaCad">
            <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
              É obrigatório o preenchimento do campo "setor da categoria"!
          </div>`;
    return;
  }

  const data = new FormData();
  data.append("nome_categoria", categoria);

  //Verifica se a categoria já existe
  const obCategoria = await fetch(`/buscar/categoria/cadastrada`, {
    method: "POST",
    body: data,
  });

  const responseObCategoria = await obCategoria.json();

  if (responseObCategoria) {
    bodyStatus.innerHTML = `
        <div class="statusNewCategoriaCad">
            <img class="IconeAlert" src="/Resources/Assets/Imagens/IconAlert.png" alt="">
            Já existe uma categoria cadastrada com esse nome!
        </div>`;
    return;
  }

  // Insere na rota de cadastro de categoria os dados recebidos no form
  const infoUser = await getInfoUser();
  // const data =
  data.append("new_categoria", categoria);
  data.append("setor_categoria", setor);
  let permissao = infoUser.PERMISSAO;

  if (permissao != "usuario") {
    const newCategoria = await fetch(`/admin/cadastrar/categoria`, {
      method: "POST",
      body: data,
    });

    response = await newCategoria.text();
    
    //Atualiza a página quando o cadastro for concluído
    if (response == 1) {
      location.reload();
    }
  }
}

//Método responsável por buscar as informações do usuário logado
async function getInfoUser() {
  const verInfoUser = await fetch(`/get/info/user`);
  const response = await verInfoUser.json();

  return response;
}

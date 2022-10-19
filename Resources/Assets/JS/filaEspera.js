const buttonTypeFila = document.querySelector("#filtro-fila-espera");
const bodyMsg = document.querySelector("#semLivroNaFila");

// Método responsável por atualizar a tabela de fila de espera através da escolha de um filtro
buttonTypeFila?.addEventListener("change", async () => {
  getRegsFilaByFilter(buttonTypeFila.value);
});

// Função responsável por verificar qual tipo de filtro foi escolhido e executa a função correta
async function getRegsFilaByFilter(tipo) {
  if (tipo === "my-fila") {
    const myRegs = await getRegsMyFila();
    if (myRegs) {
      getRegsBooks(myRegs);
    } else {
      let table = document.querySelector(".t-row");
      bodyMsg.innerHTML = "";
      table.innerHTML = `<div class="semLivroNaFila">
                           Não existe nenhum livro na sua fila de espera
                        </div>`;
    }
  } else {
    const registrosFila = await getAllRegsFila();
    if (registrosFila) {
      getRegsBooks(registrosFila);
    } else {
      let table = document.querySelector(".t-row");
      bodyMsg.innerHTML = "";
      table.innerHTML = `<div class="semLivroNaFila">
                           Não existe nenhum livro na fila de espera
                        </div>`;
    }
  }
}

/**
 * Método responsável por criar o body de uma tabela
 * @param {*} registros
 */
async function getRegsBooks(registros) {
  let table = document.querySelector(".t-row");
  table.innerHTML = "";

  // Executa um forEach no array e retorna cada linha na tabela
  table.innerHTML = registros
    .map((registro) => {
      //FORMATAÇÃO DA DATA
      let dataBanco = registro.DATA_ENTRADA_FILA;
      let data = new Date(dataBanco);
      let dataFormatada = data.toLocaleDateString("pt-BR", { timeZone: "UTC" });


      return `
      <!-- Itens da página Fila de espera -->
      <tr class="table-row-fila">
      <td style="width: 12%">${registro.ID_FILA}</td>
      <td style="width: 10%">${registro.NOME}</td>
      <td >${registro.HORA_ENTRADA_FILA}</td>
      <td style="width: 10%">${dataFormatada}</td>
      <td style="width: 8%">${registro.ID_LIVRO}</td>
      <td style="width: 15%">${registro.TITULO}</td>
      <td style="width: 10%">${registro.AUTORES}</td>
      <td >${registro.EDITORA}</td>
      <td style="width: 3%">${registro.ANO}</td>
        <!-- Abre o popup de remover livro da fila de espera -->
        <td style="width: 10%">
          <div class="delete">
              <img class="iconeDeleteFila" data-remover="remover" data-livro="${registro.TITULO}" 
                data-id-fila="${registro.ID_FILA}" data-id-livro="${registro.ID_LIVRO}"
                src="/Resources/Assets/Imagens/IconDelete.png" alt="">
          </div>
        </td>
      </tr>`;
    })
    .join("");
}

// Função responsável por busca os registros da fila de espera do usuário logado
async function getRegsMyFila() {
  const getMyRegsFila = await fetch(`/usuario/my/fila/espera`);
  const myRegs = await getMyRegsFila.json();

  return myRegs;
}

// Função responsável por busca os registros da fila de espera de todos os usuários
async function getAllRegsFila() {
  const getAllRegsFila = await fetch(`/usuario/all/fila/espera`);
  const allRegs = await getAllRegsFila.json();

  return allRegs;
}

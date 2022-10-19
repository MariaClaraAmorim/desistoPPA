// FUnção reponsável por cria a função que perquisar os livro pelo nome
async function search_book() {
  const btnSearch = document.getElementById("search");
  let nome_search = btnSearch.value.toLowerCase();

  const livros = await getAllBooks();

  const user = await getInfoUser();
  const permissao = user.PERMISSAO;

  const infoLivro = livros
    .map((livro) => {
      if (livro.EMPRESTIMO == 0) {
        btn = `Empréstimo`;
        tag = `<div class="tag-book-emprestar">
                  <img class="IconeTickDisp" src="/Resources/Assets/Imagens/IconeDisp.png" alt="">
                </div>`;
      } else {
        tag = `<div class="tag-book-entrar-na-fila">
                 <img class="IconeTickEmp" src="/Resources/Assets/Imagens/IconeEmp.png" alt="">
               </div>`;
        btn = `Ir fila`;
      }

      rota = `/${permissao}/detalhes/livro/${livro.ID}`;
      let nome_livro = livro.TITULO;
      if (nome_livro.length >= 25) {
        nome_livro = nome_livro.slice(0, 25);
        nome_livro = nome_livro + "...";
      }

      let capa_livro;
      if (livro.IMG_LIVRO) {
        capa_livro = livro.IMG_LIVRO;
      } else {
        capa_livro = `/usuario/get/book/cover/${livro.ID}`;
      }

      return `<a style="text-decoration:none; " href="${rota}">
                <li value="${livro.ID}" class="books">
                  <div class="content-book"> 
                    <span>
                      ${tag}
                      <img class="capa-livro" src="${capa_livro}">
                    </span>
                    <span id="nome-livro" title="${livro.TITULO}">${nome_livro}</span>
                    <button class="btn-status-book">${btn}</button>
                  </div>
                </li>
              </a>`;
    })
    .join("");

  const list = document.getElementById("list");
  list.innerHTML = infoLivro;

  const contentAcervo = document.querySelector(".content");
  const allContent = contentAcervo;

  if (!nome_search) {
    list.innerHTML = "";
    contentAcervo.removeAttribute("hidden");
    return;
  } else {
    contentAcervo.setAttribute("hidden", "");
  }

  let x = document.getElementsByClassName("books");
  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(nome_search)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}

// Método responsável por buscar as informações de todos os livos
async function getAllBooks() {
  const infoLivros = await fetch(`/admin/info/books`);
  const livros = await infoLivros.json();

  return livros;
}

//Método responsável por buscar as informações do usuário logado
async function getInfoUser() {
  const verInfoUser = await fetch(`/get/info/user`);
  const response = await verInfoUser.json();

  return response;
}

const input = document.getElementById("btn-pesquisar");
const btnSearchProduct = document.querySelector(".searchbutton");

btnSearchProduct.addEventListener("click", (e) => {
  e.preventDefault();

  searchProduct();
});

// Função responsável por buscar um produto no banco de dados
async function searchProduct() {
  // Nome do produto que será pesquisado
  let product = input.value;

  // Receber os dados do formulário
  const data = new FormData();
  data.append("product", product);

  // Fazer a requisição para o arquivo pesquisar.php
  const request = await fetch("/search/product", {
    method: "POST",
    body: data,
  });

  // const response = await request.text();
  const response = await request.json();

  console.log(response);
}

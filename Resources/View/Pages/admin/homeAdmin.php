<?php
session_start();
if (isset($_SESSION['adm'])){

  echo '';
} else{
  header('location:index.html');
}
  ?>

<link rel="stylesheet" href="assets/global.css" />
<link rel="stylesheet" href="/Resources/Assets/Css/admin/homeAdmin.css" />

<main class="main">
  <h1 class="title">Seja bem-vindo <?php echo $_SESSION['adm']. '' ?>, o que você deseja?</h1>
  <div class="actions">
  <a href="/admin/cadastrarProduto">
      <button class="btn">Cadastrar novos produtos</button>
    </a>
    <a href="cadastroAdm.html">
      <button class="btn">Cadastrar outros Administradores</button>
    </a>
    <a href="/requisicoesAdmin">
      <button class="btn">Requisições</button>
    </a>

    <a href="/estoque">
      <button class="btn">Estoque</button>
    </a>
    <a href="listas.php">
      <button class="btn">Listas</button>
    </a>
    
  </div>
</main>

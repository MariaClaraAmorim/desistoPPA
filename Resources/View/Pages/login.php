<?php
include_once 'banco.php';

if (isset($_POST['username']) && isset($_POST['password'])){
 
  $usuario =$_POST['username'];
  $senha =$_POST['password'];

//VERIFICAÇÃO DE EXISTÊNCIA DO USUÁRIO
$sql_log=mysqli_query($conn,"SELECT * FROM usuarios WHERE cpf = '$usuario' AND senha = '$senha'");
  $num = mysqli_num_rows($sql_log);

  if ($num == 1){
   while($percorrer = mysqli_fetch_array($sql_log)){
     $nivel = $percorrer['nivel'];
     $nome = $percorrer['nome_user'];

      session_start(); //inicia sessão

     if($nivel == 1){
      $_SESSION['adm'] = $nome;
      header('location:homeAdmin.php');
     } else{
        $_SESSION['normal'] = $nome;
        header('location:homeUser.php');
     }

   }

  }else{
    echo 'Dados inválidos! CPF ou senha incorretos';
  }

}

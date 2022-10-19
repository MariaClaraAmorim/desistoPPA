<?php

namespace App\Controller\Pages\Admin;

use App\Utils\View;

class CadastrarProduto extends Page
{
  
  public static function getCadastrarProduto()
  {

    // $user = $request->user;
    $user = "Admin";
    $content = View::render('/Pages/admin/cadastrarProduto',[
    ]);

    return parent::getPage('Cadastrar Produto', $content, true, $user);
  }
}
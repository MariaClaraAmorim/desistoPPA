<?php

namespace App\Controller\Pages\Admin;

use App\Utils\View;

class Estoque extends Page
{

  public static function getEstoque()
  {

    // $user = $request->user;
    $user = "Admin";
    $content = View::render('/Pages/admin/estoque', []);

    return parent::getPage('Estoque', $content, true, $user);
  }

}

<?php

namespace App\Controller\Pages\Usuario;

use App\Utils\View;

class Resultados extends Page
{
  /**
   * Método responsável por renderizar a home
   */
  public static function getResultados($request)
  {
    // $user = $request->user;
    $user = "Maria Clara";

    $content = View::render('/Pages/usuario/resultados', []);

    return parent::getPage('Resultados', $content, true, $user);
  }
}

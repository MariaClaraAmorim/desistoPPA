<?php

namespace App\Http\Middleware;

class RequireSessionAdminOrUser
{
  /**
   * Método responsável por executar o middleware
   * @param  Request $request
   * @param  Closure next
   * @return Response
   */
  public function handle($request, $next)
  {
    $permissao = $request->user->PERMISSAO;

    //VALIDA SE É UM USUÁRIO COMUM
    if ($permissao == 'usuario' || $permissao == 'admin') {

      return $next($request);
    } else {
      echo 'URL não encontrada';
    }
  }
}

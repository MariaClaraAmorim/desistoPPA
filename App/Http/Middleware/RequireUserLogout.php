<?php

namespace App\Http\Middleware;

use \App\Session\Usuario\Login as SessionLogin;

class RequireUserLogout
{
    /**
     * MÉTODO RESPONSAVEL POR EXECUTAR O MIDDLEWARE
     * @param   Request $request
     * @param   Closure   next
     * @return  Response
     */
    public function handle($request, $next)
    {        
        $user = $request->user;

        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if (SessionLogin::isLogged()) {
            $request->getRouter()->redirect('/'. $user->PERMISSAO. '/acervo');
        }
        
        //CONTINUA A EXECUÇÃO
        return $next($request);
    }
}

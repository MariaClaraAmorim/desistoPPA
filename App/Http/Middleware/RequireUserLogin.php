<?php

namespace App\Http\Middleware;

use \App\Session\Usuario\Login as SessionLogin;

class RequireUserLogin
{
    /**
     * MÉTODO RESPONSAVEL POR EXECUTAR O MIDDLEWARE
     * @param   Request $request
     * @param   Closure   next
     * @return  Response
     */
    public function handle($request, $next)
    {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if (!SessionLogin::isLogged()) {
            $request->getRouter()->redirect('/');
        }

        //CONTINUA A EXECUÇÃO
        return $next($request);
    }
}

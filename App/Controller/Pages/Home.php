<?php

namespace App\Controller\Pages;

use \App\Utils\View;

class Home extends Page
{
    /**
     * Método responsável por renderizar o conteúdo da página de home
     */
    public static function getHomeUser($request)
    {
        // INFORMAÇÕES DO USUÁRIO LOGADO
        $user = $request->user;

        //RENDERIZA O CONTEÚDO
        $content = view::render('Pages/usuario/home', []);

        //RETORNA O CONTEÚDO DA PÁGINA
        return parent::getPage('Sistema de Almoxarifado', $content, true, $user, true);
    }



    /**
     * Método responsável por renderizar o conteúdo da página de home do admin
     */
    public static function getHomeAdmin($request)
    {
        // INFORMAÇÕES DO USUÁRIO LOGADO
        // $user = $request->user;

        $user = "admin";

        //RENDERIZA O CONTEÚDO
        $content = view::render('Pages/admin/home', []);

        //RETORNA O CONTEÚDO DA PÁGINA
        return parent::getPage('Sistema de Almoxarifado', $content, true, $user, true);
    }
}

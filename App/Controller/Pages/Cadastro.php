<?php

namespace App\Controller\Pages;

use \App\Utils\View;

class Cadastro extends Page
{

    /**
     * Método responsável por retornar a renderização da página de login
     * @param Request $request
     * @return string
     */
    public static function getCadastro($request)
    {
        $user = $request->user;

        //CONTEUDO DA PÁGINA DE LOGIN
        $content = View::render('/Pages/cadastro', []);

        //RETORNA A PÁGINA COMPLETA
        return parent::getPage('Sistema de Almoxarifado', $content, false, $user);
    }
}

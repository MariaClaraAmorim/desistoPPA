<?php

namespace App\Controller\Pages;

use \App\Utils\View;
use \App\Model\Entity\User as EntityUser;
use App\Session\Usuario\Login as UsuarioLogin;

class Configuracao extends Page
{
    public static function getRedefinirSenha($request)
    {
        $user = $request->user;

        //CONTEUDO DA PÁGINA DE LOGIN
        $content = View::render('Pages/configuracao', []);

        //RETORNA A PÁGINA COMPLETA
        return parent::getPage('Sistema de Almoxarifado', $content, false, $user);
    }

    /**
     * Método responsável por cadastrar um novo chamado no banco de dados
     * @param Request $request
     * @return string
     */
    public static function setRedefinirSenha($request)
    {
        //POST VARS
        $postVars = $request->getPostVars();

        $user = $request->user;

        //NOVA INSTÂNCIA DE CHAMADOS
        $obUser              = new EntityUser;
        $obUser->NOVA_SENHA  = password_hash($postVars['nova_senha'], PASSWORD_DEFAULT);
        $obUser->ID_USER     = $postVars['idUser'];
        $obUser->updatePassword($request);

        //VALIDA SE É O USUÁRIO LOGADO OU O ADMIN, TENTANDO REDEFINIR A SENHA
        if (!$postVars['idUser'] || $postVars['idUser'] == $user->ID) {
            //DESTROI A SESSÃO DE LOGIN
            UsuarioLogin::logout();
        }

        return true;
    }
}

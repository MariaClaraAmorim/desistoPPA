<?php

namespace App\Controller\Pages;

use App\Model\Entity\User;
use \App\Utils\View;
use \App\Session\Usuario\Login as SessionLogin;

class Login extends Page
{
    /**
     * MÉTODO RESPONSAVEL POR RETORNAR A RENDERIZAÇÃO DA PÁGINA
     * @param Request $request
     * @param string $errorMessage
     * @return string
     */

    public static function getLogin($request)
    {
        $user = $request->user;

        //CONTEUDO DA PÁGINA DE LOGIN
        $content = View::render('/Pages/login', [
            'email' => '',
            'senha' => ''
        ]);

        //RETORNA A PÁGINA COMPLETA
        return parent::getPage('Sistema de Almoxarifado', $content, false, $user);
    }
    
    /**
     * MÉTODO RESPONSAVEL POR DEFINIR O LOGIN DE USUARIO
     * @param Request $request
     */
    public static function setLogin($request)
    {
        //POST VARS
        $postVars = $request->getPostVars();
        $email    = $postVars['email'];
        $senha    = $postVars['senha'];

        //BUSCA USUARIO PELO E-MAIL
        $obUser   = User::getUserByEmail($email);

        //CRIA A SESSÃO DE LOGIN
        SessionLogin::login($obUser);

        return true;
    }

    /**
     * Método responsável por validar a criptográfia da senha
     */
    public static function validatePassword($request, $senha, $user)
    {
        $postVars = $request->getPostVars();
        $senha = $postVars['senha_atual'];

        $user = $request->user;

        //VERIFICA A SENHA DO USUÁRIO
        if (password_verify($senha, $user->SENHA)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Método responsável por buscar as informações de um usuário através do email
     */
    public static function getSearchUser($request, $email)
    {
        return $obUser = User::getUserByEmail($email);
    }

    /**
     * Método responsável por validar a cripotográfia da senha
     */
    public static function validatePasswordLogin($request)
    {
        $postVars = $request->getPostVars();
        $email = $postVars['email'];
        $senha = $postVars['senha'];

        //BUSCAR AS INFORMAÇÕES DO USUÁRIO PELO USER
        $obUser = User::getUserByEmail($email);

        //VERIFICA A SENHA DO USUÁRIO
        if (password_verify($senha, $obUser->SENHA)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * MÉTODO RESPONSAVEL POR DESLOGAR O USUARIO
     *@param Request $request   
     */
    public static function setLogout($request)
    {
        //DESTROI A SESSAO DE LOGIN
        SessionLogin::logout();

        //REDIRECIONA O USUARIO PARA A HOME DO USUARIO
        $request->getRouter()->redirect('/');
    }
}

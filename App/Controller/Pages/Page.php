<?php

namespace App\Controller\Pages;

use App\Utils\View;

class Page
{
    /**
     * Método responsável por retornar o conteúdo (view) da nossa página genérica
     * @return  string  
     */
    public static function getPage($title, $content, $template = true, $user, $acervo = null)
    {
        if ($template === true) {

            $header = self::getHeader($user->NOME);
            $footer = self::getFooter();

            if ($user->PERMISSAO == 'admin') {
                $aside = self::getAsideAdmin($acervo);
            } else if ($user->PERMISSAO == 'usuario') {
                $aside = self::getAsideUsuario($acervo);
            }
        } else {
            $header = '';
            $footer = '';
            $aside = '';
        }

        return View::render('Pages/page', [
            'title' => $title,
            'header' => $header,
            'content' => $content,
            'footer' => $footer,
            'aside'  => $aside

        ]);
    }
    private static function getHeader($usuario)
    {
        return View::render('Templates/header', [
            'usuario' => $usuario
        ]);
    }
    private static function getFooter()
    {
        return View::render('Templates/footer', [
            'data' => date('Y')
        ]);
    }

    private static function getAsideUsuario($acervo)
    {
        // Botão de pequisar livro
        if ($acervo) {
            $btnSearchBook = View::render('Templates/admin/btnSearchBook', []);
        } else {
            $btnSearchBook = '';
        }

        return View::render('Templates/usuario/aside',[
            'btnSearchBook' => $btnSearchBook
        ]);
    }

    private static function getAsideAdmin($acervo)
    {
        // Botão de pequisar livro
        if ($acervo) {
            $btnSearchBook = View::render('Templates/admin/btnSearchBook', []);
        } else {
            $btnSearchBook = '';
        }

        return View::render('Templates/admin/aside', [
            'btnSearchBook' => $btnSearchBook
        ]);
    }
}

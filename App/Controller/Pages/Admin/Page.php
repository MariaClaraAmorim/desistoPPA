<?php

namespace App\Controller\Pages\Admin;

use App\Utils\View;

class Page
{
    /**
     * Método responsável por retornar o conteúdo (view) da nossa página genérica
     * @param string $title
     * @param string $content
     * @return  string  
     */
    public static function getPage($title, $content, $template = true,$user)
    {
        if ($template === true) {

            $header = self::getHeader($user->NOME);
            $footer = self::getFooter();
        } else {
            $header = '';
            $footer = '';
        }

        return View::render('Pages/page', [
            'title'  => $title,
            'header' => $header,
            'content'=> $content,
            'footer' => $footer
        ]);
    }


    private static function getHeader($usuario)
    {
        return View::render('Templates/header',[
            'usuario' => $usuario
        ]);
    }
    private static function getFooter()
    {
        return View::render('Templates/footer',[
            'data' => date('Y')
        ]);
    }
}

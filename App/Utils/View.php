<?php

namespace App\Utils;

class View
{

    /**
     * VARIAVEIS PADRÕES DA VIEW
     * @var array 
     */
    private static $vars = [];

    /**
     * MÉTODO RESPONSAVEL POR DEFINIR OS DADOS INICIAIS DA CLASSE
     * @param array $VARS
     */

    public static function init($vars = [])
    {
        self::$vars = $vars;
    }

    /** METODO RESPONSAVEL POR RETORNAR O CONTEUDO DE UMA VIEW
     * @param string view
     * @return string
     */
    private static function  getContentView($view)
    {
        $file = __DIR__ . '/../../Resources/View/' . $view . '.html';
        return file_exists($file) ? file_get_contents($file) : '';
    }
    /** METODO RESPONSAVEL POR RETORNAR O CONTEUDO RENDERIZADO DE UMA VIEW
     * @param string $view
     * @param array $vars (string/numeric)
     * @return string
     */
    public static function render($view, $vars = [])
    {
        //Conteudo da view
        $ContentView = self::getContentView($view);
        //MERGE DE VARIAVEIS DA VIEW
        $vars = array_merge(self::$vars, $vars);

        //Chave do array de variaveis
        $keys = array_keys($vars);
        $keys = array_map(function ($item) {
            return '{{' . $item . '}}';
        }, $keys);

        //RETORNAR O CONTEUDO RENDERIZADO
        return str_replace($keys, array_values($vars), $ContentView);
    }
}

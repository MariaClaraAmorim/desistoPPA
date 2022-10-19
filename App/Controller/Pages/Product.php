<?php

namespace App\Controller\Pages;

use \App\Utils\View;

use App\Repositories\ProductRepository;

class Product
{
    public static function searchProduct($request)
    {

        $itens = '';

        // POSTVARS
        $postVars = $request->getPostVars();
        $nameProduct = $postVars['product'];

        // Busca um Produto
        $product = ProductRepository::findProductByName($nameProduct);

        // VERIFICA SE O PRODUTO FOI ENCONTRADO
        if (!$product) {
            throw new \Exception("Produto não encontrado!", 1);
        }

        // RETORNA O PRODUTO
        return $product[0];

        //Renderiza os resultados no item da página home
        $itens .= view::render('pages/Usuario/itens/itemHome', [

            'id_product'   => $product-> ID,
            'qtd_Produto'  => $product-> QUANTIDADE,
            'nome_produto' => $product-> Produto

        ]);

        // $products = [
        //     [
        //         "id" => 1,
        //         "name" => "Resma Papel A4",
        //         "qtd" => "3",
        //         "hours_request" => "17:30",
        //         "date_request" => "06/10/2022",
        //         "status" => "success"
        //     ],
        //     [
        //         "id" => 2,
        //         "name" => "Caneta Azul Bic",
        //         "qtd" => "3",
        //         "hours_request" => "17:30",
        //         "date_request" => "06/10/2022",
        //         "status" => "success"
        //     ],
        //     [
        //         "id" => 3,
        //         "name" => "Régua",
        //         "qtd" => "3",
        //         "hours_request" => "17:30",
        //         "date_request" => "06/10/2022",
        //         "status" => "success"
        //     ]
        // ];

        // foreach ($products as $product) {
        //     if ($product['name'] === $nameProduct) {
        //         return [
        //             'product' => $product
        //         ];
        //     }
        // }
    }
}

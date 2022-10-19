<?php

use App\Controller\Pages\Admin\CadastrarProduto;

use App\Http\Response;

$obRouter->get('/cadastrarProduto', [
    function ($request) {
        return new Response(200, CadastrarProduto::getCadastrarProduto($request));
    }
]);

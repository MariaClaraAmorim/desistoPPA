<?php

use App\Controller\Pages\Admin\CadastrarProduto;
use App\Controller\Pages\Admin\Estoque;
use App\Controller\Pages\Admin\Requisicoes;
use App\Http\Response;

$obRouter->get('/admin/requisicoes', [
    function ($request) {
        return new Response(200, Requisicoes::getRequisicoesAdmin($request));
    }
]);

$obRouter->get('/admin/cadastrarProduto', [
    function ($request) {
        return new Response(200, CadastrarProduto::getCadastrarProduto($request));
    }
]);

$obRouter->get('/admin/estoque', [
    function ($request) {
        return new Response(200, Estoque::getEstoque($request));
    }
]);

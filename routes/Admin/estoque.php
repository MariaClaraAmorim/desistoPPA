<?php

use App\Controller\Pages\Admin\Estoque;

use App\Http\Response;

$obRouter->get('/estoque', [
    function ($request) {
        return new Response(200, Estoque::getEstoque($request));
    }
]);

$obRouter->get('/estoque/editar', [
    function ($request) {
        return new Response(200, Estoque::getEstoqueEditar($request));
    }
]);

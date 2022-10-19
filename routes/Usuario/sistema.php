<?php

use App\Controller\Pages\Usuario\Requisicoes;
use App\Controller\Pages\Usuario\Resultados;
use App\Http\Response;

$obRouter->get('/usuario/requisicoes', [
    function ($request) {
        return new Response(200, Requisicoes::getRequisicoes($request));
    }
]);

// $obRouter->get('/usuario/carrinho', [
//     function ($request) {
//         return new Response(200, ::getCarrinho($request));
//     }
// ]);

$obRouter->get('/usuario/resultados', [ 
    function ($request) {
        return new Response(200, Resultados::getResultados($request));
    }
]);


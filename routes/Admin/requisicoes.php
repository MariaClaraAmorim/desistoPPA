<?php

use App\Controller\Pages\Admin\Requisicoes;
use App\Http\Response;

$obRouter->get('/requisicoesAdmin', [
    function ($request) {
        return new Response(200, Requisicoes::getRequisicoesAdmin($request));
    }
]);

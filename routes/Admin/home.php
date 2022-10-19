<?php

use App\Controller\Pages\Admin\Home;

use App\Http\Response;

$obRouter->get('/homeAdmin', [
    function ($request) {
        return new Response(200, Home::getHomeAdmin($request));
    }
]);

<?php

use \App\Http\Response;

use App\Controller\Pages\Home;
use App\Controller\Pages\HomeAdmin;

// ROTA DE USUARIO LOGIN
$obRouter->get('/usuario/home', [
  // 'middleware' => [
  //     'required-user-login',
  //     'required-session-user'
  // ],
  function ($request) {
    return new Response(200, Home::getHomeUser($request));
  }
]);

// ROTA DE ADMINISTRADOR LOGIN
$obRouter->get('/admin/home', [
  // 'middleware' => [
  //     'required-user-login',
  //     'required-session-admin'
  // ],
  function ($request) {
    return new Response(200, Home::getHomeAdmin($request));
  }
]);

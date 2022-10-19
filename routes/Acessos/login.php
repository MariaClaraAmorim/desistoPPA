<?php

use \App\Http\Response;
use \App\Controller\Pages;
use App\Controller\Pages\Configuracao;
use App\Controller\Pages\Login;

//ROTA DE LOGIN
$obRouter->get('/', [
  'middleware' => [
    // 'required-user-logout'
  ],
  function ($request) {
    return new Response(200, Pages\Login::getLogin($request));
  }
]);

//ROTA DE LOGIN(POST)
$obRouter->post('/', [
  'middleware' => [
    // 'required-user-logout'
  ],
  function ($request) {
    return new Response(200, Pages\Login::setLogin($request));
  }
]);

//ROTA DE CADASTRO(POST)
$obRouter->post('/cadastro', [
  'middleware' => [
    // 'required-user-logout'
  ],
  function ($request) {
    return new Response(200, Pages\Cadastro::getCadastro($request));
  }
]);

//ROTA DE CADASTRO
$obRouter->get('/cadastro', [
  'middleware' => [
    // 'required-user-logout'
  ],
  function ($request) {
    return new Response(200, Pages\Cadastro::getCadastro($request));
  }
]);




//ROTA LOGOUT
$obRouter->get('/logout', [
  'middleware' => [
    'required-user-login'
  ],
  function ($request) {
    return new Response(200, Pages\Login::setLogout($request));
  }
]);

//ROTA DE CONFIGURAÇÃO
$obRouter->get('/configuracao', [
  // 'middleware' => [
  //   'required-user-login',
  //   'required-session-user'
  // ],
  function ($request) {
    return new Response(200, Configuracao::getRedefinirSenha($request));
  }
]);

//ROTA DE CONFIGURAÇÃO
$obRouter->post('/configuracao', [
  // 'middleware' => [
  //   'required-user-login',
  //   'required-session-user'
  // ],
  function ($request) {
    return new Response(200, Configuracao::setRedefinirSenha($request));
  }
]);


//ROTA QUE INFORMA SE A SENHA INFORMADA È COMPATIVEL COM A DO BANCO
$obRouter->post('/usuario/verify/password', [
  'middleware' => [
    'required-user-login',
    'required-admin-or-user',
    'api'
  ],
  function ($request, $senha, $user) {  
    return new Response(200, Login::validatePassword($request, $senha, $user), 'application/json');
  }
]);

//ROTA QUE INFORMA SE A SENHA INFORMADA È COMPATIVEL COM A DO BANCO NO LOGIN
$obRouter->post('/verify/password/login', [
  function ($request) {
    return new Response(200, Login::validatePasswordLogin($request), 'application/json');
  }
]);

// ROTA QUE INFORMA SE A SENHA INFORMADA É COMPATIVEL COM A DO BANCO
$obRouter->get('/get/search/info/user/{email}', [
  'middleware' => [
    'api'
  ],
  function ($request,$email) {   
    return new Response(200, Login::getSearchUser($request,$email), 'application/json');
  }
]);

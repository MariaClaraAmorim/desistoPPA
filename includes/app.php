<?php

require __DIR__ . '/../vendor/autoload.php';

use \App\Utils\View;
use \WilliamCosta\DotEnv\Environment;

use \App\Http\Middleware\Queue as MiddlewareQueue;
use App\Database\Database as Database;

//CARREGA VARIAVEIS DE AMBIENTE
$envPath = realpath(dirname(__FILE__, 2));
Environment::load($envPath);



//DEFINE AS CONFIGURAÇOES DO BANCO DE DADOS
Database::config(
  getenv('DB_HOST'),
  getenv('DB_NAME'),
  getenv('DB_USER'),
  getenv('DB_PASS'),
  getenv('DB_PORT')
);

//DEFINE A CONSTANTE DE URL
define('URL', getenv('URL'));

//DEFINE O VALOR PADRAO DAS VARIAVEIS
View::init([
  'URL' => URL
]);
//DEFINE O MAPEAMENTO DER MIDDLEWARE
MiddlewareQueue::setMap([
  'maintenance'           => \App\Http\Middleware\Maintenance::class,
  'required-user-logout'  => \App\Http\Middleware\RequireUserLogout::class,
  'required-user-login'   => \App\Http\Middleware\RequireUserLogin::class,
  'required-session-user' => \App\Http\Middleware\RequireSessionUser::class,
  'required-session-admin'=> \App\Http\Middleware\RequireSessionAdmin::class,
  'required-admin-or-user'=> \App\Http\Middleware\RequireSessionAdminOrUser::class,
  'api'                   => \App\Http\Middleware\Api::class,
  'authenticateUser'      => \App\Http\Middleware\AuthenticateUser::class,
]);

//DEFINE O MAPEAMENTO DE MIDDLEWARE PADRÕES(EXECUTADOS EM TODAS AS ROTAS)
MiddlewareQueue::setDefault([
  'authenticateUser',
  'maintenance'
]);
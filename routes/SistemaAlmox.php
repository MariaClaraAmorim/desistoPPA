<?php

// //INCLUI A ROTA DE HOME
include __DIR__ . '/Acessos/home.php';

// //INCLUI A ROTA DE LOGIN
include __DIR__ . '/Acessos/login.php';

//INCLUI AS ROTAS DO USUARIO
include __DIR__ . '/Usuario/sistema.php';

//INCLUI AS ROTAS DO ADMINISTRADOR
include __DIR__ . '/Admin/sistema.php';



//INCLUI A ROTA DE EMPRESTAR
include __DIR__ . '/usuario/historico.php';

//INCLUI A ROTA DE FILA DE ESPERA
include __DIR__ . '/usuario/filaespera.php';

//INCLUI A ROTA DE CONFIGURAÇAO
include __DIR__ . '/usuario/configuracao.php';

//INCLUI A ROTA DE CADASTRAR USUÁRIO
include __DIR__ . '/admin/cadastrarUser.php';

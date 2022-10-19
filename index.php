<?php

require __DIR__ . '/includes/app.php';

use \App\Http\Router;


//INICIA AS ROTAS 
$obRouter = new Router(URL);


// //INCLUI AS ROTAS DAS PÁGINAS DE ADMIN
// include __DIR__ . '/routes/Admin.php';

// //INCLUI AS ROTAS DAS PÁGINAS DE USUARIO
// include __DIR__ . '/routes/Usuario.php';

// //INCLUI A ROTA DA PÁGINA DE LOGIN
// include __DIR__ . '/routes/login.php';

// //INCLUI A ROTA DA PÁGINA DE CADASTRO
// include __DIR__ . '/routes/cadastro.php';

include __DIR__ . '/routes/Usuario.php';



include __DIR__ .'/routes/SistemaAlmox.php';


//IMPRIME O REPONSE DA ROTA  
$obRouter->run()
    ->sendResponse();

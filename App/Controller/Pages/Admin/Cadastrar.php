<?php

namespace App\Controller\Pages\Admin;

use App\Model\Entity\Cadastrar as EntityCadastrar;
use App\Model\Entity\Livro;
use App\Model\Entity\User;
use App\Repositories\LivroRepository;
use App\Repositories\UserRepository;
use App\Utils\View;

use Exception;

class Cadastrar extends Page
{
  /**
   * Método responsável por renderizar a página que mostra as opções de cadastro
   */
  public static function getCadastrar($request)
  {
    $user = $request->user;

    //RENDERIZA O CONTEÚDO
    $content = view::render('Pages/admin/cadastrar/cadastrar');

    //RETORNA O CONTEÚDO DA PÁGINA
    return parent::getPage('Dantas | Web Biblioteca', $content, true, $user);
  }

  /**
   * Método responsável por verificar se uma categoria existe, através do nome dela
   */
  public static function getCategoriaExistente($request)
  {
    $postVars = $request->getPostVars();

    $nome = $postVars['nome_categoria'];

    //Busca uma categoria
    $obCategoria = EntityCadastrar::getCategoriaByName($nome);

    //RETORNA A CATEGORIA
    return $obCategoria;
  }

  /**
   * Método responsável por cadastrar uma nova categoria
   */
  public static function setCadastrarCategoria($request)
  {
    //POST VARS
    $postVars = $request->getPostVars();
    
    // VERIFICA QUAL O SETOR CORRETO DA CATEGORIA
    if ($postVars['setor_categoria'] == 1) {
      $setor = 'RH';
    } else if ($postVars['setor_categoria'] == 2) {
      $setor = 'TI';
    }

    //NOVA INSTÂNCIA DE USUÁRIO
    $obUser                = new Livro;
    $obUser->NEW_CATEGORIA = $postVars['new_categoria'];
    $obUser->SETOR         = $setor;
    $obUser->cadastrarCategoria();

    return true;
  }

  /**
   * Método responsável por renderiza a página de cadastrar livro
   */
  public static function getCadastrarLivro($request)
  {
    // INFORMAÇÕES DO USUÁRIO LOGADO
    $user = $request->user;

    // $compCategoria = Livros::getCompCategoria();

    // RENDERIZA O CONTEÚDO 
    $content = view::render('Pages/admin/cadastrar/cadastrarlivro', [
      // 'compCategoria' => $compCategoria
    ]);

    //RETORNA O CONTEÚDO DA PÁGINA
    return parent::getPage('Dantas | Web Biblioteca ', $content, true, $user);
  }

  /**
   * Método responsável por inserir as informações do novo livro na função de cadastrar
   */
  public static function cadastrarLivro($request)
  {
    //POSTVARS
    $postVars =  $request->getPostVars();

    // Array com os tipos de anexos permitidos
    $tipos = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

    //CONTEÚDO DO ANEXO
    $tmp_name  = $_FILES['file']['tmp_name'];
    $type      = $_FILES['file']['type'];

    if ($_FILES) {
      if (in_array($type, $tipos)) {
        $binary    = file_get_contents($tmp_name);
      } else {
        throw new Exception('Não é possível fazer upload de arquivo com a extensão' . $type);
      }
    }

    //Cria uma nova instância de livro
    $obLivro = new Livro();
    $obLivro->TITULO       = $postVars['titulo'];
    $obLivro->SINOPSE      = $postVars['sinopse'];
    $obLivro->SUBTITULO    = $postVars['subtitulo'];
    $obLivro->AUTOR        = $postVars['autor'];
    $obLivro->ANO          = $postVars['ano'];
    $obLivro->EDICAO       = $postVars['edicao'];
    $obLivro->EDITORA      = $postVars['editora'];
    $obLivro->ISBN10       = $postVars['isbn10'];
    $obLivro->ISBN13       = $postVars['isbn13'];
    $obLivro->ID_CATEGORIA = $postVars['categoria'];
    $obLivro->OBS          = $postVars['obs'];
    $obLivro->CAPA         = $binary;
    $obLivro->cadastrarLivros();

    return true;
  }

  /**
   * Método responsável por buscar as categorias ativas
   */
  public static function itensCadCategoria()
  {
    $itens = '';

    //Cria o PDO de sql que busca todas as categorias ativas
    $results = LivroRepository::findCategorias();

    // TRANSFORMA A VARIÁVEL EM OBJECT
    while ($obCategoria = $results->fetchObject()) {

      $itens .= View::render('/Pages/admin/itens/itemCategoria', [
        'id_categoria' => $obCategoria->ID,
        'categoria'    => $obCategoria->DESCRICAO
      ]);
    }

    //RETORNA OS ITENS
    return $itens;
  }


  /**
   * Método responsável por renderiza a página de cadastrar categoria
   */
  public static function getCadastrarCategoria($request)
  {
    // INFORMAÇÕES DO USUÁRIO LOGADO
    $user = $request->user;

    //RENDERIZA O CONTEÚDO
    $content = view::render('Pages/admin/cadastrar/cadastrarCategoria', [
      'itens' => self::itensCadCategoria(),
      ''
    ]);

    //RETORNA O CONTEÚDO DA PÁGINA
    return parent::getPage('Dantas | Web Biblioteca ', $content, true, $user);
  }

  /**
   * Método responsável por buscas os itens da página de cadastro de usuários
   */
  public static function itensCadUsers()
  {
    $itens = '';

    //Cria o PDO de sql que busca todos os usuários ativos
    $results = UserRepository::findUsers();

    // TRANSFORMA A VARIÁVEL EM OBJECT
    while ($obUser = $results->fetchObject()) {
      $itens .= View::render('Pages/admin/itens/itemUser', [
        'id'   => $obUser->ID,
        'nome' => $obUser->NOME
      ]);
    }

    //RETORNA OS ITENS
    return $itens;
  }

  /**
   * Método responsável por renderiza a página de cadastro de usuário
   */
  public static function getCadastrarUser($request)
  {
    //INFORMAÇÕES DO USUÁRIO LOGADO
    $user = $request->user;

    //RENDERIZA O CONTEÚDO 
    $content = view::render('Pages/admin/cadastrar/cadastrarUser', [
      'itens' => self::itensCadUsers()
    ]);

    //RETORNA O CONTEÚDO DA PÁGINA
    return parent::getPage('Dantas | Web Biblioteca ', $content, true, $user);
  }


  /**
   * Método responsável por inserir na função de cadastro as informações do novo usuário
   */
  public static function cadastrarNewUser($request)
  {
    //POST VARS
    $postVars = $request->getPostVars();

    //Define o nome das permissões baseado em um número informaodo no form de cadastro
    if ($postVars['permissao'] == 1) {
      $permissao = 'admin';
    } else {
      $permissao = 'usuario';
    }

    //Define o nome das permissões baseado em um número informaodo no form de cadastro
    if ($postVars['setor'] == 1) {
      $setor = 'RH';
    } else {
      $setor = 'TI';
    }

    //NOVA INSTÂNCIA DE USUÁRIO
    $obUser            = new User;
    $obUser->NOME      = $postVars['nome'];
    $obUser->EMAIL     = $postVars['email'];
    $obUser->SENHA     = password_hash($postVars['senha'], PASSWORD_DEFAULT);
    $obUser->SETOR     = $setor;
    $obUser->PERMISSAO = $permissao;
    $obUser->cadastrarUser();

    return true;
  }

  /**
   * Método responsável por verificar se um usuário existe, através do email
   */
  public static function getUserExistente($request, $email)
  {
    //Busca as informações de um usuário
    $obUser = User::getUserByEmail($email);

    return $obUser;
  }
}

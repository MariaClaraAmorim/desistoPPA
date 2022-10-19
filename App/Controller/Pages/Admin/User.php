<?php

namespace App\Controller\Pages\Admin;

use App\Model\Entity\User as EntityUser;
use App\Repositories\UserRepository;
use App\Utils\View;

class User
{
  /**
   * Método responsável por retornar as informações do usuário logado
   */
  public static function getInfoUser($request)
  {
    //RETORNA AS INFORMACÕES DO USUÁRIO LOGADO
    return $request->user;
  }

  /**
   * Método responsável por deletar um usuário do banco
   */
  public static function getDeleteUser($request, $id_user)
  {
    $obUser          = new EntityUser;
    $obUser->ID_USER = $id_user;
    $obUser->deleteUser();

    return ["status" => true];
  }

  /**
   * Método responsável por buscar as informais de um usuário específico
   */
  public static function getInfoOneUser($request, $id_user)
  {
    $obUser = UserRepository::findUser($id_user);

    return $obUser;
  }

  /**
   * Método responsável por alterar a permissão de um usuário do banco
   */
  public static function getModifyPermissionUser($request)
  {
    $postVars = $request->getPostVars();

    if ($postVars['id_new_permission'] == 1) {
      $permissao = "admin";
    } else {
      $permissao = "usuario";
    }

    $obUser            = new EntityUser;
    $obUser->ID_USER   = $postVars['idUser'];
    $obUser->PERMISSAO = $permissao;
    $obUser->modifyPermissionUser();

    return ["status" => true];
  }

  /**
   * Método responsável por buscar as informações de todos os usuários ativos
   */
  public static function compUsers($request)
  {
    //Cria o PDO de sql que busca todos os usuários ativos
    $results = UserRepository::findUsers();

    // TRANSFORMA A VARIÁVEL EM OBJECT
    while ($obUser = $results->fetchObject()) {
      $itens[] = $obUser;
    }

    //RETORNA OS ITENS
    return $itens;
  }
}

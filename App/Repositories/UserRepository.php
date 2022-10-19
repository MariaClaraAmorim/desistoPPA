<?php

namespace App\Repositories;

use App\Database\Database;

class UserRepository
{
  private static $tableColaboradores = "COLABORADORES";

  /**
   * Método responsável por buscar o object Usuário
   */
  public static function findUser($id_user)
  {
    $results = (new Database(self::$tableColaboradores))->select("ID = $id_user  AND ATIVO = 1");

    return $results->fetchObject();
  }
  
  /**
   * Método reponsável por criar o PDO que busca as informações dos usuário
   */
  public static function findUsers()
  {
    $query = self::getQueryUser();

    $results = (new Database)->execute($query);

    return $results;
  }

  /**
   * Método responsável por criar a query que busca as informações dos usuários ativos
   */
  public static function getQueryUser()
  {
    return "SELECT DISTINCT
            * FROM COLABORADORES c 
            WHERE c.ATIVO = 1";
  }
}

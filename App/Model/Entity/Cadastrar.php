<?php

namespace App\Model\Entity;

use App\Database\Database;

class Cadastrar
{

  private static $tableUsers = 'COLABORADORES';
  private static $tableCategoria = 'CATEGORIA';

  /**
   * Método responsável por retornar uma categoria com base em seu nome
   */
  public static function getCategoriaByName($nome)
  {
    return (new Database(self::$tableCategoria))->select("DESCRICAO = '${nome}'")->fetchObject(self::class);
  }
}
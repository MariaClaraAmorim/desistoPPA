<?php

namespace App\Repositories;

use App\Database\Database;

class ProductRepository
{

  // CONDIÇÃO PARA BUSCAR UM PRODUTO
  public static function whereOneProduct($product)
  {
    return "c.NOME_PRODUTO = '${product}'";
  }

  /**
   * Método responsável por buscar um produto no banco
   */
  public static function findProductByName($product)
  {
    $where = self::whereOneProduct($product);

    // QUERY
    $query = self::getQueryProduct($where);

    // PDO de sql de buscar produto no banco
    $results = (new Database())->execute($query);

    // TRANFORMA O PDO de sql em object
    while ($obProduct = $results->fetchObject()) {

      $itens[] = $obProduct;
    }

    // RETORNA OS ITENS
    return $itens;
  }


  /**
   * Método responsável por criar a query que busca as informações dos produtos
   */
  public static function getQueryProduct($where)
  {
    return "SELECT DISTINCT
            * FROM CDPRODUTOS c 
            WHERE ${where}";
  }
}

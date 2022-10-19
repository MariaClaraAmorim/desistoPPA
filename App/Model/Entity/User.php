<?php

namespace App\Model\Entity;

use \App\Database\Database;

class User
{
  public $ID;
  public $NOME;
  public $EMAIL;
  public $SENHA;

  /** Nome da tabela no Banco de Dados */
  private static $tableColaboradores = "COLABORADORES";

  /**
   * Método responsável por inserir os dados de um novo usuário no banco
   */
  public function cadastrarUser()
  {
    $this->ID = (new Database(self::$tableColaboradores))->insert([
      'NOME'       => $this->NOME,
      'EMAIL'      => $this->EMAIL,
      'SETOR'      => $this->SETOR,
      'SENHA'      => $this->SENHA,
      'PERMISSAO'  => $this->PERMISSAO,
      'ATIVO'      => '1'
    ], 'ID');

    return true;
  }

  /**
   * Método responsável por tornar um usuário do banco inátivo
   */
  public function deleteUser()
  {
    return (new Database(self::$tableColaboradores))->update('ID = '.$this->ID_USER, [
      'ATIVO' => 0
    ], 'ID');
  }

   /**
   * Método responsável por modificar a permissão de um usuário do banco
   */
  public function modifyPermissionUser()
  {
    return (new Database(self::$tableColaboradores))->update('ID = '.$this->ID_USER, [
      'PERMISSAO' => $this->PERMISSAO
    ], 'ID');
  }


  /**
   * MÉTODO RESPONSÁVEL POR ATUALIZAR A SENHA DO USUÁRIO LOGADO NO BANCO
   * @return  boolean
   */
  public function updatePassword($request)
  {
    if ($this->ID_USER) {
      $id_user = $this->ID_USER;
    } else {
      $user = $request->user;
      $id_user = $user->ID;
    }

    return (new Database(self::$tableColaboradores))->update('ID = ' . $id_user, [
      'SENHA' => $this->NOVA_SENHA
    ], 'ID');
  }
  /**
   * MÉTODO RESPONSÁVEL POR EXCLUIR OS DADOS NO BANCO
   * @return  boolean
   */
  public function excluir()
  {
    return (new Database(self::$tableColaboradores))->delete('ID = ' . $this->ID,);
  }

  /**
   * MÉTODO RESPONSAVEL POR RETORNAR UMA INSTANCIA CON BASE NO ID
   * @param  Integer $id
   * @return  User
   */
  public static function getUserById($id)
  {
    return self::getUsers('ID = ' . $id)->fetchObject(self::class);
  }

  /**
   *Método responsável por retornar um usuário com base em seu e-mail
   * @param  string $email
   * @return  User
   */
  public static function getUserByEmail($email)
  {
    return (new Database(self::$tableColaboradores))->select("EMAIL = '${email}'")->fetchObject(self::class);
  }

  /**
   * Método responsável por retornar usuários
   * @param string $where
   * @param string $order
   * @param string $limit
   * @param string $fields
   * @return PDOStatement
   */
  public static function getUsers($where = null, $order = null, $limit = null, $fields = '*')
  {
    return (new Database(self::$tableColaboradores))->select($where, $order, $limit, $fields);
  }
}

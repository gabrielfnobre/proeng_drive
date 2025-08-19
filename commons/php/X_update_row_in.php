<?php
    /**
     * X_update_row_in.php
     *
     * Este script atualiza o valor de uma coluna específica de uma tabela MySQL,
     * usando a função updateMyOccurence de updateMyOccurence.php.
     *
     * Fluxo principal:
     * 1. Recebe parâmetros de conexão e atualização via POST:
     *    - host: endereço do host do banco de dados
     *    - user: usuário do banco de dados
     *    - password: senha do banco de dados
     *    - db_name: nome do banco de dados
     *    - table: nome da tabela a ser atualizada
     *    - pk_column: coluna usada para identificar a linha a ser atualizada (chave primária)
     *    - pk_value: valor da coluna para identificar a linha
     *    - update_column: coluna a ser atualizada
     *    - update_value: novo valor para a coluna
     *    - column_order: coluna para ordenação (opcional)
     *    - asc_or_desc: direção da ordenação (opcional, padrão 'DESC')
     * 2. Estabelece conexão com o banco de dados.
     * 3. Executa a função updateMyOccurence para atualizar o valor.
     * 4. Retorna true se for bem-sucedido, false se falhar.
     * 5. Fecha a conexão com o banco de dados.
     *
     * Dependências:
     * - dbConnect.php: Função para conectar ao banco de dados.
     * - dbDisconnect.php: Função para desconectar do banco de dados.
     * - updateMyOccurence.php: Função para atualizar valor na tabela.
     *
     * Saída:
     * - true se a atualização for bem-sucedida.
     * - false em caso de erro.
     */

    session_start();
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';
    require_once 'updateMyOccurence.php';

    $host_db      = $_POST['host'];
    $user_db      = $_POST['user'];
    $password_db  = $_POST['password'];
    $dbname_db    = $_POST['db_name'];
    $table        = $_POST['table'];
    $pk_column    = isset($_POST['pk_column']) ? $_POST['pk_column'] : null;
    $pk_value     = isset($_POST['pk_value']) ? $_POST['pk_value'] : null;
    $update_column= isset($_POST['update_column']) ? $_POST['update_column'] : null;
    $update_value = isset($_POST['update_value']) ? $_POST['update_value'] : null;
    $column_order = isset($_POST['column_order']) ? $_POST['column_order'] : $pk_column;
    $asc_or_desc  = isset($_POST['asc_or_desc']) ? $_POST['asc_or_desc'] : 'DESC';

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    if(is_string($conn)){
        $error = '<b>Erro em ' . __DIR__ . '\\updateMyOccurence.php:</b> ao tentar conectar usando dbConnect.php.<br>';
        echo $error;
        exit;
    }

    if($conn){
        $conn->set_charset("utf8mb4");
        $result = updateMyOccurence($conn, $table, $pk_column, $pk_value, $update_column, $update_value, $column_order, $asc_or_desc);
        echo $result ? 'true' : 'false';
    } else {
        echo 'false';
    }

    dbDisconnect($conn);
?>
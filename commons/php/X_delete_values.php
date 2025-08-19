<?php
    /**
     * X_delete_values.php
     *
     * Este script deleta valores de linhas específicas de uma tabela MySQL,
     * usando a função deleteValuesFrom do arquivo deleteValues.php.
     *
     * Fluxo principal:
     * 1. Recebe parâmetros de conexão e deleção via POST:
     *    - host: endereço do host do banco de dados
     *    - user: usuário do banco de dados
     *    - password: senha do banco de dados
     *    - db_name: nome do banco de dados
     *    - table: nome da tabela de onde deletar
     *    - columns: array de nomes das colunas para condição
     *    - values: array de valores correspondentes às colunas
     * 2. Estabelece conexão com o banco de dados.
     * 3. Executa a função deleteValuesFrom para deletar os valores.
     * 4. Retorna true se for bem-sucedido, false se falhar.
     * 5. Fecha a conexão com o banco de dados.
     *
     * Dependências:
     * - dbConnect.php: Função para conectar ao banco de dados.
     * - dbDisconnect.php: Função para desconectar do banco de dados.
     * - deleteValues.php: Função para deletar valores da tabela.
     *
     * Saída:
     * - true se a deleção for bem-sucedida.
     * - false em caso de erro.
     */

    session_start();
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';
    require_once 'deleteValues.php';

    $host_db    = $_POST['host'];
    $user_db    = $_POST['user'];
    $password_db= $_POST['password'];
    $dbname_db  = $_POST['db_name'];
    $table      = $_POST['table'];
    $columns    = isset($_POST['columns']) && is_array($_POST['columns']) ? $_POST['columns'] : [];
    $values     = isset($_POST['values']) && is_array($_POST['values']) ? $_POST['values'] : [];

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    if(is_string($conn)){
        $error = '<b>Erro em ' . __DIR__ . '\\deleteValues.php:</b> ao tentar conectar usando dbConnect.php.<br>';
        echo $error;
        exit;
    }

    if($conn){
        $conn->set_charset("utf8mb4");
        $result = deleteValuesFrom($conn, $table, $columns, $values);
        echo $result ? 'true' : 'false';
    } else {
        echo 'false';
    }

    dbDisconnect($conn);
?>
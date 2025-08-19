<?php
    /**
     * X_search_for_a_single_record_using_order_column.php
     *
     * Este script recupera um único registro de uma tabela MySQL,
     * usando um token de sessão para autenticação e identificação do registro,
     * e permite ordenar o resultado por uma coluna específica e direção (ASC/DESC).
     *
     * Fluxo principal:
     * 1. Recebe parâmetros de conexão e identificação via POST:
     *    - host: endereço do host do banco de dados
     *    - user: usuário do banco de dados
     *    - password: senha do banco de dados
     *    - db_name: nome do banco de dados
     *    - session_name: nome da sessão para recuperar o token
     *    - table: nome da tabela onde o registro será buscado
     *    - column: coluna a ser comparada com o token
     *    - order_column: coluna para ordenar o resultado
     *    - asc_or_desc: (opcional) direção da ordenação ('ASC' ou 'DESC', padrão 'DESC')
     * 2. Estabelece conexão com o banco de dados.
     * 3. Recupera o token da sessão.
     * 4. Busca o registro na tabela onde a coluna especificada corresponde ao token, ordenando conforme solicitado.
     * 5. Retorna os dados do usuário em formato JSON.
     * 6. Fecha a conexão com o banco de dados.
     *
     * Dependências:
     * - getSessionToken.php: Função para obter o token da sessão.
     * - dbConnect.php / dbDisconnect.php: Funções para conectar/desconectar do banco de dados.
     * - searchForASingleRecordUsingOrderColumn.php: Função para buscar o registro.
     *
     * Saída:
     * - JSON com os dados do usuário, ou mensagem de erro em caso de falha.
     */
    session_start();
    require_once 'getSessionToken.php';
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';
    require_once 'searchForASingleRecordUsingOrderColumn.php';

    header('Content-Type: application/json; charset=utf-8');

    $host_db      = isset($_POST['host']) ? $_POST['host'] : '';
    $user_db      = isset($_POST['user']) ? $_POST['user'] : '';
    $password_db  = isset($_POST['password']) ? $_POST['password'] : '';
    $dbname_db    = isset($_POST['db_name']) ? $_POST['db_name'] : '';
    $table        = isset($_POST['table']) ? $_POST['table'] : '';
    $column       = isset($_POST['column']) ? $_POST['column'] : '';
    $singular_value = isset($_POST['singular_value']) ? $_POST['singular_value'] : '';
    $order_column = isset($_POST['order_column']) ? $_POST['order_column'] : '';
    $asc_or_desc  = isset($_POST['asc_or_desc']) ? $_POST['asc_or_desc'] : 'DESC';

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);

    $row = searchForASingleRecordUsingOrderColumn($conn, $table, $column, $singular_value, $order_column, $asc_or_desc);
    echo json_encode($row);

    dbDisconnect($conn);
?>
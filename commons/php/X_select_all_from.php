<?php
    /**
     * X_select_all_from.php
     *
     * This script returns all occurrences from a specific table in a MySQL database,
     * allowing the user to choose which columns to view. If no array of columns is provided,
     * all columns will be returned.
     *
     * Main flow:
     * 1. Receives connection and query parameters via POST:
     *    - host: database host address
     *    - user: database username
     *    - password: database password
     *    - db_name: database name
     *    - table: name of the table to be queried
     *    - set_columns: (optional) array of columns to be returned, returns all if not provided or empty
     * 2. Establishes a connection to the database.
     * 3. Executes the SELECT query to return all occurrences from the table, filtering columns as requested.
     * 4. Returns the result as a JSON array if there are records.
     * 5. Returns false if there are no records or if a connection/query error occurs.
     * 6. Closes the database connection.
     *
     * Dependencies:
     * - dbConnect.php: Function to connect to the database.
     * - dbDisconnect.php: Function to disconnect from the database.
     *
     * Output:
     * - JSON array with the found records.
     * - false if there are no records or in case of error.
     */

    session_start();
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';

    $host_db = $_POST['host'];
    $user_db = $_POST['user'];
    $password_db = $_POST['password'];
    $dbname_db = $_POST['db_name'];
    $table = $_POST['table'];
    
    $order_by_col = isset($_POST['order_by']) ? $_POST['order_by'] : "ID";
    $order_by_col = str_replace("`", "", $order_by_col); // sanitização mínima

    if (!empty($_POST['casting_integer']) && $_POST['casting_integer'] === 'true') {
        $order_by = "CAST(`$order_by_col` AS UNSIGNED)";
    } elseif (!empty($_POST['casting_date']) && $_POST['casting_date'] === 'true') {
        $order_by = "STR_TO_DATE(TRIM(`$order_by_col`), '%d/%m/%Y')";
    } else {
        $order_by = "`$order_by_col`";
    }


    $sorting_by = isset($_POST['sorting_by']) ? $_POST['sorting_by'] : "ASC";
    $set_columns = isset($_POST['set_columns']) && is_array($_POST['set_columns']) && count($_POST['set_columns']) > 0
        ? array_map(function($col) { return "`" . str_replace("`", "", $col) . "`"; }, $_POST['set_columns'])
        : ['*'];
    $columns_sql = implode(', ', $set_columns);

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    if(is_string($conn)){
        $error = '<b>Error in ' . __DIR__ . '\\selectAllFrom.php:</b> when try call a connection by db_connect.php.<br>';
        echo $error;
        return false;
    }

    if($conn){
        $conn->set_charset("utf8mb4");
        $sql = "SELECT $columns_sql FROM `$table` ORDER BY $order_by $sorting_by;";
        $result = $conn->query($sql);

        if($result && $result->num_rows > 0){
            $rows = [];
            while($row = $result->fetch_assoc()){
                $rows[] = $row;
            }
            echo json_encode($rows);
        } else {
            echo 'false';
        }
    } else {
        echo 'false';
    }

    dbDisconnect($conn);
?>
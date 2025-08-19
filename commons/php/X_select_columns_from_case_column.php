<?php
    /**
     * X_select_columns_from_case_column.php
     *
     * This script retrieves all records from a specified table in a MySQL database
     * where either of two columns matches the provided values, and returns the results
     * ordered by a specified column.
     *
     * Main Flow:
     * 1. Receives connection and query parameters via POST:
     *    - host: database host address
     *    - user: database username
     *    - password: database password
     *    - db_name: database name
     *    - table: table name to select from
     *    - column: first column to compare
     *    - value: value to match in the first column
     *    - column2: second column to compare
     *    - value2: value to match in the second column
     *    - column_order: column name to order the results by (ascending)
     *    - set_columns: (optional) array of columns to select, defaults to * if not provided or empty
     * 2. Establishes a connection to the database.
     * 3. Executes a SELECT query with the specified conditions and ordering.
     * 4. Returns the result set as a JSON array if records are found.
     * 5. Returns false if no records are found or if there is a connection/query error.
     * 6. Closes the database connection.
     *
     * Dependencies:
     * - dbConnect.php: Function to connect to the database.
     * - dbDisconnect.php: Function to disconnect from the database.
     *
     * Output:
     * - JSON array of records if found.
     * - false if no records are found or on error.
     */

    session_start();
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';

    $host_db = $_POST['host'];
    $user_db = $_POST['user'];
    $password_db = $_POST['password'];
    $dbname_db = $_POST['db_name'];
    $table = $_POST['table'];
    $column1 = $_POST['column1'];
    $value1 = $_POST['value1'];
    $column2 = $_POST['column2'];
    $value2 = $_POST['value2'];
    $sorting_by = isset($_POST['sorting_by']) ? $_POST['sorting_by'] : "ASC";
    
    $order_by_col = isset($_POST['order_by']) ? $_POST['order_by'] : "ID";
    $order_by_col = str_replace("`", "", $order_by_col);

    if (!empty($_POST['casting_integer']) && $_POST['casting_integer'] === 'true') {
        $order_by = "CAST(`$order_by_col` AS UNSIGNED)";
    } elseif (!empty($_POST['casting_date']) && $_POST['casting_date'] === 'true') {
        $order_by = "STR_TO_DATE(TRIM(`$order_by_col`), '%d/%m/%Y')";
    } else {
        $order_by = "`$order_by_col`";
    }

    $set_columns = isset($_POST['set_columns']) && is_array($_POST['set_columns']) && count($_POST['set_columns']) > 0
        ? array_map(function($col) { return "`" . str_replace("`", "", $col) . "`"; }, $_POST['set_columns'])
        : ['*'];
    $columns_sql = implode(', ', $set_columns);

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    if(is_string($conn)){
        $error = '<b>Error in ' . __DIR__ . '\\selectAllFrom.php:</b> when try call a connection by db_connect.php.<br>';
        echo $error;
    }

    if($conn){
        $conn->set_charset("utf8mb4");
        $sql = "SELECT $columns_sql FROM `$table` WHERE `$column1` LIKE '%$value1%' AND `$column2` LIKE '%$value2%' ORDER BY $order_by $sorting_by;";
        $result = $conn->query($sql);

        //validation that prevines a wrong sql command
        if($result && $result->num_rows > 0){
            $rows = [];
            while($row = $result->fetch_assoc()){
                $rows[] = $row;
            }
            echo json_encode($rows);
        } else {
            return false;
        }

    } else {
        return false;
    }

    dbDisconnect($conn);
?>
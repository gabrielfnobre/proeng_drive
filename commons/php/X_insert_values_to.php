<?php
    /**
     * X_insert_values_to.php
     *
     * This script inserts values into specific columns of a MySQL table,
     * using the insertValuesTo function from the insertValuesTo.php file.
     *
     * Main flow:
     * 1. Receives connection and insertion parameters via POST:
     *    - host: database host address
     *    - user: database user
     *    - password: database password
     *    - db_name: database name
     *    - table: name of the table to insert into
     *    - columns: array of column names to be filled
     *    - values: array of values corresponding to the columns
     * 2. Establishes a connection to the database.
     * 3. Executes the insertValuesTo function to insert the values.
     * 4. Returns true if successful, false if failed.
     * 5. Closes the database connection.
     *
     * Dependencies:
     * - dbConnect.php: Function to connect to the database.
     * - dbDisconnect.php: Function to disconnect from the database.
     * - insertValuesTo.php: Function to insert values into the table.
     *
     * Output:
     * - true if the insertion is successful.
     * - false if there is an error.
     */

    session_start();
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';
    require_once 'insertValuesTo.php';

    $host_db    = $_POST['host'];
    $user_db    = $_POST['user'];
    $password_db= $_POST['password'];
    $dbname_db  = $_POST['db_name'];
    $table      = $_POST['table'];
    $columns    = isset($_POST['columns']) && is_array($_POST['columns']) ? $_POST['columns'] : [];
    $values     = isset($_POST['values']) && is_array($_POST['values']) ? $_POST['values'] : [];

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    if(is_string($conn)){
        $error = '<b>Error in ' . __DIR__ . '\\insertValuesTo.php:</b> when try call a connection by db_connect.php.<br>';
        echo $error;
        exit;
    }

    if($conn){
        $conn->set_charset("utf8mb4");
        $result = insertValuesTo($conn, $table, $columns, $values);
        echo $result ? 'true' : 'false';
    } else {
        echo 'false';
    }

    dbDisconnect($conn);
?>
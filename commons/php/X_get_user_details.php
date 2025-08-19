<?php
    /**
     * X_get_user_details.php
     *
     * This script retrieves user details from a MySQL database,
     * using a session token for authentication and record identification.
     *
     * Main flow:
     * 1. Receives connection and identification parameters via POST:
     *    - host: database host address
     *    - user: database user
     *    - password: database password
     *    - db_name: database name
     *    - session_name: session name to retrieve the token
     *    - table: table name where the user will be searched
     *    - column: column to be compared with the token
     * 2. Establishes a connection to the database.
     * 3. Retrieves the session token.
     * 4. Searches for a record in the table where the specified column matches the token.
     * 5. Returns the user data in JSON format.
     * 6. Closes the database connection.
     *
     * Dependencies:
     * - getSessionToken.php: Function to obtain the session token.
     * - dbConnect.php / dbDisconnect.php: Functions to connect/disconnect from the database.
     * - searchForASingleRecordUsingOrderColumn.php: Function to search for a specific record.
     *
     * Output:
     * - JSON with the user data, or an error message in case of failure.
     */
    session_start();
    require_once 'getSessionToken.php';
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';
    require_once 'searchForASingleRecord.php';

    header('Content-Type: application/json; charset=utf-8');

    $host_db = $_POST['host'];
    $user_db = $_POST['user'];
    $password_db = $_POST['password'];
    $dbname_db = $_POST['db_name'];
    $session_name = $_POST['session_name'];
    $table = $_POST['table'];
    $column = $_POST['column'];

    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    
    $token = getSessionToken($session_name) == null ? false : getSessionToken($session_name);
    if(!$token){
        $error = '<b>(#0) Error in ' . __DIR__ . '\\get_user_details.php:</b> when try get a session token.<br>';
        echo $error;
        return $error;
    }
    $row = searchForASingleRecord($conn, $table, $column, $token);
    echo json_encode($row);
    dbDisconnect($conn);
?>
<?php
    /**
     * X_is_this_my_session.php
     *
     * This script checks if a given session is currently open and valid for a specific user or value in the database.
     *
     * Main Flow:
     * 1. Receives connection and identification parameters via POST:
     *    - host: database host address
     *    - user: database username
     *    - password: database password
     *    - db_name: database name
     *    - session_name: the session name to retrieve the token
     *    - table: the table to search in
     *    - column: the column to compare with the value
     *    - value: the value to check in the specified column
     *    - column_order: the column used for ordering (optional)
     *    - asc_or_desc: order direction, ASC or DESC (optional, default DESC)
     * 2. Establishes a connection to the database.
     * 3. Checks if a session ID exists for the given session name.
     * 4. Retrieves the session token.
     * 5. Checks if a record exists in the table where the column matches the value, using the specified order.
     * 6. Returns a message indicating whether the session is open or not.
     * 7. Closes the database connection.
     *
     * Dependencies:
     * - getSessionToken.php: Function to get the session token.
     * - haveASessionID.php: Function to check if a session ID exists.
     * - dbConnect.php / dbDisconnect.php: Functions to connect/disconnect to the database.
     * - isExistingMyOccurence.php: Function to check if a record exists.
     *
     * Output:
     * - "have session opened" if the session and record exist.
     * - "no have session" if the session or record does not exist.
     * - Error message if there is a problem retrieving the session token.
     */
    session_start();
    require_once 'getSessionToken.php';
    require_once 'haveASessionID.php';
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';
    require_once 'isExistingMyOccurence.php';

    $host_db      = $_POST['host'];
    $user_db      = $_POST['user'];
    $password_db  = $_POST['password'];
    $dbname_db    = $_POST['db_name'];
    $name_session = $_POST['session_name'];
    $session_name = $_POST['session_name'];
    $table        = $_POST['table'];
    $column       = $_POST['column'];
    $value        = $_POST['value'];
    $column_order  = $_POST['column_order'];
    $asc_or_desc  = isset($_POST['asc_or_desc']) ? $_POST['asc_or_desc'] : 'DESC';
        
    $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
    
    if(haveASessionID($name_session)){
        $token = getSessionToken($session_name) == null ? false : getSessionToken($session_name);
        if(!$token){
            $error = '<b>(#0) Error in ' . __DIR__ . '\\isThisMySession.php:</b> when try get a session token.<br>';
            echo $error;
            return $error;
        }
        
        if(isExistingMyOccurence($conn, $table, $column, $value, $column_order, $asc_or_desc)){
            echo 'have session opened';
        } else {
            echo 'no have session';
        }

        dbDisconnect($conn);
    } else {
        echo 'no have session';
        dbDisconnect($conn);
    }
?>
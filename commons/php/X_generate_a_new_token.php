<?php
    /**
     * X_generate_a_new_token.php
     *
     * This script generates a new unique token using the generateANewToken function from generateANewToken.php.
     *
     * Main flow:
     * 1. Receives parameters via POST:
     *    - host: database host address
     *    - user: database user
     *    - password: database password
     *    - db_name: database name
     *    - table: table name where to check uniqueness
     *    - column: column where to check the token
     *    - value: value to be checked (usually the token)
     *    - column_order: column for ordering (optional)
     *    - asc_or_desc: order direction ('ASC' or 'DESC', optional)
     * 2. Calls the generateANewToken function to generate the token.
     * 3. Returns the generated token or an error message.
     *
     * Dependencies:
     * - generateANewToken.php: Function to generate a unique token.
     *
     * Output:
     * - Generated token or error message.
     */

    require_once 'generateANewToken.php';

    $host_db      = isset($_POST['host']) ? $_POST['host'] : '';
    $user_db      = isset($_POST['user']) ? $_POST['user'] : '';
    $password_db  = isset($_POST['password']) ? $_POST['password'] : '';
    $dbname_db    = isset($_POST['db_name']) ? $_POST['db_name'] : '';
    $table        = isset($_POST['table']) ? $_POST['table'] : '';
    $column       = isset($_POST['column']) ? $_POST['column'] : '';
    $value        = isset($_POST['value']) ? $_POST['value'] : '';
    $column_order = isset($_POST['column_order']) ? $_POST['column_order'] : '';
    $asc_or_desc  = isset($_POST['asc_or_desc']) ? $_POST['asc_or_desc'] : 'DESC';

    // The $conn parameter is not needed in the initial call, it will be created inside the function
    $token = generateANewToken($host_db, $user_db, $password_db, $dbname_db, null, $table, $column, $value, $column_order, $asc_or_desc);

    echo $token;
?>
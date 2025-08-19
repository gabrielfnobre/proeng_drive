<?php
    require_once 'isExistingMyOccurence.php';
    require_once 'dbConnect.php';
    require_once 'dbDisconnect.php';

    /**
     * Generates a new random token and ensures its uniqueness in a specified database table.
     *
     * This function creates a cryptographically secure random token and checks if it already exists
     * in the given table and column. If the generated token is not unique, the function will attempt
     * to generate a new one. If a unique token cannot be generated, an error message is returned.
     *
     * @param string $host_db      The database host.
     * @param string $user_db      The database username.
     * @param string $password_db  The database password.
     * @param string $dbname_db    The database name.
     * @param mysqli $conn         The database connection object.
     * @param string $table        The table in which to check for token uniqueness.
     * @param string $column       The column in which to check for the token.
     * @param string $value        The value to check for in the specified column.
     * @param string $column_order The column to use for ordering the results.
     * @param string $asc_or_desc  The order direction ('ASC' or 'DESC'). Default is 'DESC'.
     * @return string              The generated unique token, or an error message if unsuccessful.
     */
    
    function generateANewToken($host_db, $user_db, $password_db, $dbname_db, $conn, $table, $column, $value, $column_order, $asc_or_desc = 'DESC'){
        $conn = dbConnect($host_db, $user_db, $password_db, $dbname_db);
        $token = bin2hex(random_bytes(32));

        if(isExistingMyOccurence($conn, $table, $column, $value, $column_order, $asc_or_desc)){
            dbDisconnect($conn);
            generateANewToken($host_db, $user_db, $password_db, $dbname_db, $conn, $table, $column, $value, $column_order,  $asc_or_desc);
        } else {
            dbDisconnect($conn);
            return $token;
        }
    }
?>
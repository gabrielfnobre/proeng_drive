<?php
    /**
     * Creates and returns a connection to a MySQL database using the specified parameters.
     *
     * @param string $host_db      The MySQL server hostname or IP address.
     * @param string $user_db      The username for authenticating with the database.
     * @param string $password_db  The password for the specified database user.
     * @param string $dbname_db    The name of the database to connect to.
     * @return mysqli|string       Returns a mysqli connection object on success, or a string containing the error message on failure.
     */
    
    function dbConnect($host_db, $user_db, $password_db, $dbname_db){
        $host = $host_db;
        $user = $user_db;
        $password = $password_db;
        $dbname = $dbname_db;
        $port = 3306;
        
        $conn = new mysqli($host, $user, $password, $dbname, $port);
        
        if($conn->connect_error){
            return $conn->connect_error;
        } else {
            return $conn;
        }
    }
?>
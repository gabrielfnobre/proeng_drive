<?php
    /**
     * Retrieves a single record from a specified table where a given column matches a provided value.
     *
     * @param mysqli $conn         The MySQLi connection object.
     * @param string $table        The name of the table to query.
     * @param string $column       The column to match the value against.
     * @param mixed  $singular_value The value to search for in the specified column.
     *
     * @return array|false         Returns the matching row as an associative array if found, or false if no match is found.
     */

    function searchForASingleRecord($conn, $table, $column, $singular_value){
        if($conn){
            $conn->set_charset("utf8mb4");
            $sql= "SELECT * FROM `$table` WHERE `$column` LIKE '$singular_value'";
            $result = $conn->query($sql);
            
            //validation that prevines a wrong sql command
            if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                return $row;
            } else {
                return false;
            }
    
        } else {
            return false;
        }
    }
?>
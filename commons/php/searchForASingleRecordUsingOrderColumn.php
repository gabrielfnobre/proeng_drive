<?php
    /**
     * Retrieves a single record from a specified table where a given column matches a provided value,
     * ordering the results by a specified column and direction.
     *
     * @param mysqli $conn           The MySQLi connection object.
     * @param string $table          The name of the table to query.
     * @param string $column         The column to match the value against.
     * @param mixed  $singular_value The value to search for in the specified column.
     * @param string $order_column   The column to use for ordering the results.
     * @param string $asc_or_desc    (Optional) The order direction, either 'ASC' or 'DESC'. Default is 'DESC'.
     *
     * @return array|false           Returns the matching row as an associative array if found, or false if no match is found.
     */

    function searchForASingleRecordUsingOrderColumn($conn, $table, $column, $singular_value, $order_column, $asc_or_desc = 'DESC'){
        if($conn){
            $conn->set_charset("utf8mb4");
            $sql= "SELECT * FROM `$table` WHERE `$column` LIKE '%$singular_value%' ORDER BY `$order_column` $asc_or_desc LIMIT 1;";
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
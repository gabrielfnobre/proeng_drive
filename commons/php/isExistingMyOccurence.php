<?php
    /**
     * Determines whether a specific value exists in a given column of a table, 
     * with the option to order the search by a specified column and direction.
     *
     * @param mysqli $conn           The active MySQLi connection object.
     * @param string $table          The name of the table to query.
     * @param string $column         The column to search for the value.
     * @param string $value          The value to look for in the specified column.
     * @param string $column_order   The column by which to order the results.
     * @param string $asc_or_desc    (Optional) The sort direction: 'ASC' for ascending or 'DESC' for descending. Default is 'DESC'.
     * @param mysqli $conn         The MySQLi connection object.
     * @param string $table        The name of the table to search in.
     * @param string $column       The column to match the value against.
     * @param string $value        The value to search for in the specified column.
     * @param string $columnOrder  The column to use for ordering the results.
     * @param string $asc_or_desc  (Optional) The order direction, either 'ASC' or 'DESC'. Default is 'DESC'.
     * @return bool                Returns true if the occurrence exists, false otherwise.
     */

    function isExistingMyOccurence($conn, $table, $column, $value, $column_order, $asc_or_desc = 'DESC'){
        if($conn instanceof mysqli){
            $conn->set_charset("utf8mb4");
            $sql= "SELECT * FROM `$table` WHERE `$column` = '$value' ORDER BY `$column_order` $asc_or_desc LIMIT 1;";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0){
                return true;
            } else {
                return false;
            }
    
        } else {
            return false;
        }
    }
?>
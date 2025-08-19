<?php
    require_once 'isExistingMyOccurence.php';

    /**
     * Updates a specific column value for a record in a given table, identified by its primary key column and value.
     * The update is performed only if the record exists, as determined by the isExistingMyOccurence() function.
     * The update targets the first record found according to the specified order column and direction.
     *
     * @param mysqli $conn           The MySQLi connection object.
     * @param string $table          The name of the table to update.
     * @param string $pk_column      The primary key column name used to identify the record.
     * @param mixed  $pk_value       The value of the primary key to match.
     * @param string $update_column  The column to be updated.
     * @param mixed  $update_value   The new value to set for the update column.
     * @param string $column_order   The column name to order the records by.
     * @param string $asc_or_desc    (Optional) The order direction, either 'ASC' or 'DESC'. Default is 'DESC'.
     *
     * @return bool                  Returns true if the update was successful, or false otherwise.
     */
    function updateMyOccurence($conn, $table, $pk_column, $pk_value, $update_column, $update_value, $column_order, $asc_or_desc='DESC'){
        if(isExistingMyOccurence($conn, $table, $pk_column, $pk_value, $column_order, $asc_or_desc)){
            $conn->set_charset("utf8mb4");
            $sql = "UPDATE `$table` SET `$update_column` = ? WHERE `$pk_column` = ? ORDER BY `$column_order` $asc_or_desc LIMIT 1";
            
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $update_value, $pk_value);
        
            if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        
            $stmt->close();
        } else {
            return false;
        }
    }
?>
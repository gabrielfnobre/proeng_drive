<?php
    /**
     * Retrieves a single record from a specified table where all provided column-value pairs match.
     *
     * This function allows you to specify any number of search conditions by passing pairs of column names and their corresponding values.
     * All conditions are combined using logical AND, so only rows matching every column-value pair will be considered.
     *
     * Example usage:
     *   searchForASingleRecordUsingMultipleParameters($conn, 'users', 'email', 'user@example.com', 'status', 'active');
     *
     * @param mysqli $conn   The MySQLi connection object.
     * @param string $table  The name of the table to query.
     * @param mixed  ...$array_of_columns_and_values  A variable-length list of column-value pairs (e.g., column1, value1, column2, value2, ...).
     *                                                The number of arguments after $table must be even.
     *
     * @return array|false   Returns the matching row as an associative array if found, or false if no match is found.
     */

    function searchForASingleRecordUsingMultipleParameters($conn, $table, ...$array_of_columns_and_values){
        if($conn){
            $preparedSearch = '';
            
            for($i = 0; $i < count($array_of_columns_and_values);$i++){
                // The database can store data in UTF-8, but MySQL commands may not handle special characters properly.
                // Therefore, we use iconv and preg_replace to remove accents and special characters from the input before sending SQL commands.
                $wordNoAccent = preg_replace('/[^a-zA-Z0-9_\-\/@$&§\.\s]/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $array_of_columns_and_values[$i]));
                if($i == 0){
                    $preparedSearch .= "`$wordNoAccent`";
                } else if($i % 2 != 0){
                    $preparedSearch .= " = '$wordNoAccent'";
                } else {
                    $preparedSearch .= " AND `$wordNoAccent`";
                }
            }

            $conn->set_charset("utf8mb4");
            $sql= "SELECT * FROM `$table` WHERE $preparedSearch;";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0) {
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
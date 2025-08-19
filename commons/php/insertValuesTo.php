<?php
    /**
     * Inserts one or more values into one or more columns of a table.
     *
     * You can pass just one column and one value, or multiple columns and values, both as arrays.
     * Example usage:
     *   insertValuesTo($conn, 'usuarios', ['nome', 'email'], ['João', 'joao@email.com']);
     *   insertValuesTo($conn, 'produtos', 'nome', 'Camiseta');
     *
     * @param mysqli $conn         MySQLi connection object.
     * @param string $table        Table name.
     * @param array|string $columns Name(s) of the column(s) (string or array of strings).
     * @param array|string $values  Corresponding value(s) (string or array of values).
     *
     * @return bool                Returns true if the insert was successful, false otherwise.
     */
    function insertValuesTo($conn, $table, $columns, $values) {
        if (!$conn) return false;

        // Ensure both are arrays
        if (!is_array($columns)) $columns = [$columns];
        if (!is_array($values)) $values = [$values];

        // Check if the number of columns and values match
        if (count($columns) !== count($values) || count($columns) == 0) {
            return false;
        }

        $conn->set_charset("utf8mb4");

        // Build the query dynamically
        $columns_sql = implode('`, `', $columns);
        $placeholders = implode(', ', array_fill(0, count($values), '?'));

        $sql = "INSERT INTO `$table` (`$columns_sql`) VALUES ($placeholders)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) return false;

        // Build the types dynamically (assume all as string 's' for simplicity)
        $types = str_repeat('s', count($values));
        $stmt->bind_param($types, ...$values);

        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }
?>
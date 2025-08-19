<?php
    /**
     * Disconnects from the database.
     *
     * @param mysqli $conn A mysqli connection object.
     * @return bool Returns true if the disconnection was successful, or false on failure.
     */
    
    function dbDisconnect($conn){
        if($conn != null && $conn instanceof mysqli){
            mysqli_close($conn);
            return true;
        }
        return false;
    }
?>
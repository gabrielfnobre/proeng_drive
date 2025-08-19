<?php
    /**
     * Determines whether a session ID cookie with the specified name exists.
     *
     * @param string $name_session The name of the session cookie to check for.
     * @return bool True if the session cookie is set, false otherwise.
     */

    function haveASessionID($name_session){
        if(!isset($_COOKIE[$name_session])){
            return false;
        } else {
            return true;
        }
    }
?>
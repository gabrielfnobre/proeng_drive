<?php
    /**
     * Get the value of a session token from a cookie.
     *
     * This function checks if a cookie with the given session name exists and returns its value.
     *
     * @param string $session_name The name of the session cookie to retrieve.
     * @return string|null The session token if the cookie exists, or null if it does not.
     */
    
    function getSessionToken($session_name){
        if(!isset($_COOKIE[$session_name])){
            return null;
        } else {
            $token = $_COOKIE[$session_name];
            return $token;
        }
    }
?>



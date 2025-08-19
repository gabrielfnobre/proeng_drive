<?php
    /**
     * Initializes a user session using a custom token and session name, supporting persistent login for up to 30 days.
     *
     * This function manages session initialization based on a provided token and session name. If the token is empty or null,
     * the function returns false and does not start a session. If the session cookie for the given name does not exist,
     * a new session is created and the cookie is set. If the session cookie already exists, the session is reset and the cookie is updated.
     *
     * @param string $token        The unique token to associate with the session.
     * @param string $name_session The name to use for the session cookie.
     * @return bool                Returns true if the session was initialized successfully, or false on failure.
     */

    function initializeASession($token, $name_session){
        $expires = 30 * 24 * 60 * 60;

        if($token == null || $token == ''){
            
            return false;
        }

        if (!isset($_COOKIE[$name_session])) {
            session_unset();
            session_destroy();
            
            setcookie(session_name($name_session), session_id($token), $expires, "/");
            session_set_cookie_params($expires);
            session_start();
            
            
            return true;
        } else {
            session_unset();
            session_destroy();
            
            setcookie(session_name($name_session), session_id($token), $expires, "/");
            session_set_cookie_params($expires);
            session_start();
            
            return true;
        }
        return false;
    }
?>
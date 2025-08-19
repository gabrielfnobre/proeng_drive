<?php
    /**
     * Terminates the current user session and removes the associated session cookie.
     *
     * This function is intended to securely log out a user by clearing all session data,
     * destroying the session, and deleting the session cookie from the user's browser.
     *
     * @param string $session_name The name of the session cookie to be deleted.
     * @return void
     */
    
    function finalizeASession($session_name){
        session_unset();
        session_destroy();
        setcookie($session_name, "", -3600, "/", "", true, true);
        echo 'Session was ended!';
    }
?>
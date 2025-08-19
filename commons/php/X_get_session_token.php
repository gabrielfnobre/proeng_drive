<?php
    /**
     * X_get_session_token.php
     *
     * This script returns the value of the session token stored in a cookie,
     * using the getSessionToken function from getSessionToken.php.
     *
     * Main flow:
     * 1. Receives the session name via POST:
     *    - name_session: name of the session cookie
     * 2. Calls the getSessionToken function to obtain the token value.
     * 3. Returns the token if it exists, or null if it does not.
     *
     * Dependencies:
     * - getSessionToken.php: Function to get the session token.
     *
     * Output:
     * - Session token or null.
     */

    require_once 'getSessionToken.php';

    $name_session = isset($_POST['name_session']) ? $_POST['name_session'] : '';

    $token = getSessionToken($name_session);

    echo $token !== null ? $token : 'null';
?>
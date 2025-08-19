<?php
    /**
     * X_have_a_session.php
     *
     * This script checks if a session cookie with the provided name exists,
     * using the haveASessionID function from haveASessionID.php.
     *
     * Main flow:
     * 1. Receives the session name via POST:
     *    - name_session: name of the session cookie
     * 2. Calls the haveASessionID function to check if the cookie exists.
     * 3. Returns 'true' if it exists, 'false' otherwise.
     *
     * Dependencies:
     * - haveASessionID.php: Function to check for the existence of the session cookie.
     *
     * Output:
     * - 'true' if the session cookie exists, 'false' otherwise.
     */

    require_once 'haveASessionID.php';

    $name_session = isset($_POST['name_session']) ? $_POST['name_session'] : '';

    $hasSession = haveASessionID($name_session);

    echo $hasSession ? 'true' : 'false';
?>
<?php
    /**
     * X_initialize_a_session.php
     *
     * This script initializes a user session using a custom token and session name,
     * utilizing the initializeASession function from the initializeASession.php file.
     *
     * Main flow:
     * 1. Receives parameters via POST:
     *    - token: unique token for the session
     *    - name_session: name of the session cookie
     * 2. Calls the initializeASession function to initialize the session.
     * 3. Returns 'true' if the session was successfully initialized, 'false' otherwise.
     *
     * Dependencies:
     * - initializeASession.php: Function to initialize the session.
     *
     * Output:
     * - 'true' if the session was successfully initialized.
     * - 'false' in case of failure.
     */

    require_once 'initializeASession.php';

    $token        = isset($_POST['token']) ? $_POST['token'] : '';
    $name_session = isset($_POST['name_session']) ? $_POST['name_session'] : '';

    $result = initializeASession($token, $name_session);

    echo $result ? 'true' : 'false';
?>
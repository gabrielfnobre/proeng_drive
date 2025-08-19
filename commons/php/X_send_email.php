<?php
    /**
     * X_send_email.php
     *
     * This script sends an email using the sendEmail function from sendEmail.php.
     *
     * Main flow:
     * 1. Receives email parameters via POST:
     *    - name: recipient's name
     *    - email: recipient's email
     *    - subject: email subject
     *    - body: email body (HTML)
     *    - user: sender's email (SMTP)
     *    - user_name: sender's name (SMTP)
     *    - password: SMTP password
     *    - host: SMTP host
     *    - port: SMTP port
     *    - image_assignature: (optional) path to signature image
     * 2. Calls the sendEmail function to send the email.
     * 3. Returns a success or error message.
     *
     * Dependencies:
     * - sendEmail.php: Function to send email via SMTP.
     */

    require_once 'sendEmail.php';

    // Receive parameters from POST
    $name              = isset($_POST['name']) ? $_POST['name'] : '';
    $email             = isset($_POST['email']) ? $_POST['email'] : '';
    $subject           = isset($_POST['subject']) ? $_POST['subject'] : '';
    $bodyMensageInHTML = isset($_POST['body']) ? $_POST['body'] : '';
    $user              = isset($_POST['user']) ? $_POST['user'] : '';
    $user_name         = isset($_POST['user_name']) ? $_POST['user_name'] : '';
    $password          = isset($_POST['password']) ? $_POST['password'] : '';
    $host              = isset($_POST['host']) ? $_POST['host'] : '';
    $port              = isset($_POST['port']) ? $_POST['port'] : '';
    $image_assignature = isset($_POST['image_assignature']) ? $_POST['image_assignature'] : false;

    // Call the function to send the email
    sendEmail(
        $name,
        $email,
        $subject,
        $bodyMensageInHTML,
        $user,
        $user_name,
        $password,
        $host,
        $port,
        $image_assignature
    );
?>
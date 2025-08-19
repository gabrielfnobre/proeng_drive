<?php
    require_once(__DIR__ . '/../../libs/PHPMailer-master/src/Exception.php');
    require_once(__DIR__ . '/../../libs/PHPMailer-master/src/PHPMailer.php');
    require_once(__DIR__ . '/../../libs/PHPMailer-master/src/SMTP.php');
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    /**
     * Sends an email using SMTP with the specified parameters.
     *
     * @param string $name                The recipient's name.
     * @param string $email               The recipient's email address.
     * @param string $subject             The subject of the email.
     * @param string $bodyMensageInHTML   The HTML content of the email body.
     * @param string $user                The sender's email address.
     * @param string $user_name           The sender's display name.
     * @param string $password            The SMTP server password.
     * @param string $host                The SMTP server host.
     * @param string $port                The SMTP server port.
     * @param string|false $image_assignature (Optional) Path to an image to embed as a signature. Default is false.
     *
     * @return void
     *
     * This function uses PHPMailer to send an email via SMTP. It allows specifying the recipient,
     * subject, HTML body, sender credentials, SMTP server details, and an optional embedded image signature.
     */
    function sendEmail($name, $email, $subject, $bodyMensageInHTML, $user, $user_name, $password, $host, $port, $image_assignature=false){

        if($name == '' || $email == '' || $subject == '' || $bodyMensageInHTML== ''){
            echo "Mensages of email are incomplete!";
        } else {
            $mail = new PHPMailer(true);
            try {
                // Server Configures
                $mail->isSMTP();
                $mail->Host = $host;
                $mail->Username = $user;
                $mail->Password = $password;
                $mail->SMTPAuth = true;
                $mail->CharSet = 'UTF-8';
                // $mail->SMTPSecure = true;
                $mail->Port = $port;
                $mail->isHTML(true);
                
                //Set the sender
                $mail->setFrom($user, $user_name);
                
                //Set the receiver
                $mail->addAddress($email, $name);
                
                //MENSAGE CONTENT...
                $mail->Subject = $subject;
                $mail->Body = "$bodyMensageInHTML";
                
                //For body client email doesn't accept HTML responses
                $mail->AltBody = "$bodyMensageInHTML";

                // Para garantir que a imagem de assinatura apareça centralizada, com altura máxima de 100px,
                // mostrando toda a imagem sem cortar ou repetir, vamos ajustar o <img> com CSS apropriado.
                // A imagem será centralizada e exibida em seu tamanho natural até o limite de 100px de altura.

                $cid = null;
                if ($image_assignature && is_string($image_assignature)) {
                    $imagePath = $image_assignature;
                    $cid = pathinfo($imagePath, PATHINFO_FILENAME); // Usa o nome do arquivo como cid
                    $mail->addEmbeddedImage(__DIR__.'/../../'.$imagePath, $cid);
                } else {
                    $imagePath = '../../universal/images/email_pattern.png';
                    $cid = 'email_pattern';
                    $mail->addEmbeddedImage($imagePath, $cid);
                }

                // Adiciona a imagem ao final do corpo do email, centralizada e com altura máxima de 100px
                $imgTag = '<div style="width:100%;text-align:start;margin-top:16px;margin-bottom:8px;">'
                        . '<img src="cid:' . $cid . '" style="max-height:100px; height:100px; width:100px; display:inline-block;">'
                        . '</div>';
                $mail->Body .= $imgTag;
                
                $mail->send();
            
                echo "Mensage was sended sucessfull!";
            }
            catch (Exception $e){
                echo "Error while sending mensage: " . $e;
            }
        }
    }
    

?>
<?php

class EmailSender {
    private $to;
    private $subject;
    private $message;
    private $headers;

    public function __construct($to, $subject, $message, $email) {
        $this->to = $to;
        $this->subject = $subject;
        $this->message = $message;
        $this->headers = "From: $email";
    }

    public function sendEmail() {
        $success = mail($this->to, $this->subject, $this->message, $this->headers);
        if ($success) {
            header('Location: https://amatores.com');
            exit;
        } else {
            header('Location: https://amatores.com/#contact=Error=messaggio non inviato, contattami nel mio numero : +39 3775911088');
            exit;
        }
    }
}

if(isset($_POST['sendEmail'])){
    $to = "amoroso.franz1@gmail.com";
    $subject = "Portafolio/Amoroso";
    $message = $_POST['msg'];
    $email = $_POST['email'];

    $emailSender = new EmailSender($to, $subject, $message, $email);
    $emailSender->sendEmail();
}
?>


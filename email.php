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
            // Invio email riuscito
            header('Location: https://amatores.com');
            exit;
        } else {
            // Invio email fallito
            header('Location: https://amatores.com/#contact=Error=messaggio non inviato, contattami nel mio numero : +39 3775911088');
            var_dump(error_get_last()); // Visualizza l'ultimo errore
            exit;
        }
    }
}


    // Controlla se i campi email e messaggio sono stati forniti
    if (isset($_POST['email']) && isset($_POST['msg'])) {

        // Imposta destinatario, oggetto e corpo del messaggio
        $to = "info@amatores.com";
        $subject = "Portafolio/Amoroso";
        $message = $_POST['msg'];
        $email = $_POST['email'];

        // Controlla se l'email fornita è valida
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

            // Invia l'email
            $headers = "From: $email\r\n";
            if (mail($to, $subject, $message, $headers)) {
                echo "Email inviata con successo!";
            } else {
                echo "Errore durante l'invio dell'email.";
            }

        } else {
            echo "Indirizzo email non valido.";
        }
    } else {
        echo "I campi email e messaggio sono obbligatori.";
    }


?>

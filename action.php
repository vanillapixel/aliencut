<?php
if(isset($_POST['email'])) {

    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $subject = $_POST['subject']; // required
    $telephone = $_POST['telephone']; // not required
    $message = $_POST['message']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "info@aliencut.com";
    $email_subject = $subject;
 
    function died($error) {
        // your error code can go here
        echo "Sembra che qualcosa sia andato storto. ";
        echo "Di seguito troverai gli errori che abbiamo rilevato.<br /><br />";
        echo $error."<br /><br />";
        echo "Torna indietro e controlla gli errori.<br /><br />";
        die();
    }
 
 
    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['message'])) {
        died('C\'è stato un problema con l\'invio della email. Riprova');       
    }
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= "L'indirizzo email non sembra essere valido.<br />";
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'Nome non valido<br />';
  }
 
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'Cognome non valido<br />';
  }
 
  if(strlen($message) < 2) {
    $error_message .= 'Messaggio troppo corto!<br />';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Messaggio inviato dal sito Alien Cut \n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "Nome: ".clean_string($first_name)."\n";
    $email_message .= "Cognome: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telefono: ".clean_string($telephone)."\n";
    $email_message .= "Messaggio: ".clean_string($message)."\n";
 
// create email headers
$headers = 'Da: '.$email_from."\r\n".
'Rispondi a: '.$email_from."\r\n" .
@mail($email_to, $email_subject, $email_message, $headers);  
  mail($email_from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
?>
 
<!-- include your own success html here -->
 
Grazie per averci scritto. Cercheremo di risponderti al piu' presto!
 
<?php
 
}
?>

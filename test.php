<?php $to = "info@aliencut.com";
  $from = "info@aliencut.com";


  $fname = $_POST['first_name']; // required
    $lname = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $subject = $_POST['subject']; // required
    $telephone = $_POST['telephone']; // not required
    $message = $_POST['message']; // required

     //Get uploaded file data using $_FILES array
    $tmp_name = $_FILES['attachment']['tmp_name']; // get the temporary file name of the file on the server
    $name     = $_FILES['attachment']['name']; // get the name of the file
    $size     = $_FILES['attachment']['size']; // get size of the file for size validation
    $type     = $_FILES['attachment']['type']; // get type of the file
    $error     = $_FILES['attachment']['error']; // get the error (if any)
 
    //validate form field for attaching the file
    if($error > 0)
    {
        die('Upload error or No files uploaded');
    }

     //read from the uploaded file & base64_encode content
    $handle = fopen($tmp_name, "r"); // set the file handle only for reading the file
    $content = fread($handle, $size); // reading the file
    fclose($handle);                 // close upon completion
 
    $encoded_content = chunk_split(base64_encode($content));
    $boundary = md5("random"); // define boundary with a md5 hashed value
 
    //header
    $headers = "MIME-Version: 1.0\r\n"; // Defining the MIME version
    $headers .= "From:".$from."\r\n"; // Sender Email
    $headers .= "Reply-To: ".$reply_to_email."\r\n"; // Email address to reach back
    $headers .= "Content-Type: multipart/mixed;"; // Defining Content-Type
    $headers .= "boundary = $boundary\r\n"; //Defining the Boundary
    
    $body_text = " \n\n\t First name: " . "<strong>" . $fname . "</strong>";
    $body_text .= " \n\n\t Last name: " . "<strong>" . $lname . "</strong>";
    $body_text .= " \n\n\t Email: " . "<strong>" .$email_from . "</strong>";
    $body_text .= " \n\n\t Telephone: " . "<strong>" .$telephone . "</strong>";
    $body_text .= " \n\n\t Subject: " . "<strong>" .$subject . "</strong>";
    $body_text .= " \n\n\t Message: " . "<br><br><strong>" .$message . "</strong>";

    //plain text
    $body = "--$boundary\r\n";

    $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($body_text));
    
    //attachment
    $body .= "--$boundary\r\n";
    $body .="Content-Type: $type; name=".$name."\r\n";
    $body .="Content-Disposition: attachment; filename=".$name."\r\n";
    $body .="Content-Transfer-Encoding: base64\r\n";
    $body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
    $body .= $encoded_content; // Attaching the encoded file with email
    
    

  if (mail($to, $lname, $body, $headers)) {     echo '<label class="success">Sent your <b>e-mail.</b></label>';
 } else {     echo '<label class="error">Something went wrong! please try again.</label>';
 }
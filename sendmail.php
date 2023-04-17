<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/Exception.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('en', 'phpmailer/language/');
  $mail->IsHTML(true);

  $mail->setFrom('dmytrobohomaz@outlook.com', 'EMPLOYER');
  $mail->addAddress('dmytrobohomaz@outlook.com');
  $mail->Subject = 'WORK';

  $body = '<h1>NEW MESSAGE</h1>';

  if(trim(!empty($_POST['name']))){
    $body = '<p><strong>Name:</strong>'.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['email']))){
    $body = '<p><strong>E-mail:</strong>'.$_POST['email'].'</p>';
  }
  if(trim(!empty($_POST['number']))){
    $body = '<p><strong>Phone Number:</strong>'.$_POST['number'].'</p>';
  }
  if(trim(!empty($_POST['message']))){
    $body = '<p><strong>Message:</strong>'.$_POST['message'].'</p>';
  }

  $mail->Body = $body;

  if (!$mail->send()) {
    $message = 'ERROR';
  }else{
    $message = 'COMPLEAT';
  }

  $response = ['message' => $message];
  
  header('Content-type: application/json');
  echo json_encode($response);
?>
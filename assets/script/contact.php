	<?php
		$name = strip_tags($_POST['name']); 
		$emailFrom = strip_tags(strtolower($_POST['email'])); 
		$emailFrom2 = str_replace('@','%40',$emailFrom); 
		$emailTo = "nicolasambroise@hotmail.com";
		
		$subject = "Nico Website Contact - ".strip_tags(stripslashes($_POST['subject'])); 
		$message = strip_tags(stripslashes($_POST['message'])); 
		
		$body = "Name: ".$name."\n";
		$body .= "Email: ".$emailFrom."\n";
		$body .= "Subject: ".$subject."\n";
		$body .= "Message: ".$message."\n";
	
		$headers = "From: ".$emailFrom."\n";
		
		if (preg_match("#^[a-z0-9._-]+%40[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $emailFrom2) && $body != ''){
			$success = mail($emailTo, $subject, $body, $headers);
			if ($success){
				unset($_POST);
				echo "<script>alert('Message envoyé');window.location='http://www.nicolasambroise.com';</script>"; 
			} 
		} else {
			echo "<script>alert('Erreur envoi du message');</script>"; 
		}
	?>
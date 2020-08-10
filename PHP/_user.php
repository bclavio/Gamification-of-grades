<?php

// Include code from another file
require('_mysql.php');

// Store parsed data to variables
$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];

// Validate user
$userNum = userToNum($conn,$user);

// Validate timestamp
if (!empty($timestamp)){

	// Write timestamp to login history
	mysqli_query($conn,
	"
		INSERT INTO p6App_LogIn (userNum, timestamp)
			VALUES ('".$userNum."', '".$timestamp."')
	");
}

$results = mysqli_query($conn,"SELECT * FROM p6App_Users WHERE PID='".$userNum."'");

// Check if data exists
if (mysqli_num_rows($results) > 0){
	$list = mysqli_fetch_assoc($results);
	
	// If test has started, echo answers and start time
	if (!empty($list["begStamp"])){
		echo $list["begStamp"].";";
		echo $list["answers"].";";
		
		// If test has ended, echo end time, grade, and results
		if (!empty($list["endStamp"])){			
			echo $list["endStamp"].";";
			echo $list["grade"].";";
			echo $list["results"].";";
		}
	}
}

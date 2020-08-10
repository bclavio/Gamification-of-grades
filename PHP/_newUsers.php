<?php require('_mysql.php');

for ($l = 0; $l < 60; $l++){
	do {
		$user = generateID();
	} while(!empty(mysqli_query($conn,"SELECT * FROM p6App_Users WHERE user='".$user."';")) != 1);

	mysqli_query($conn,
		"INSERT INTO p6App_Users (user)
			VALUES ('".$user."')
	");
}


function generateID(){
	$numList = '1234567890';
	$charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$str = '';

	for ($i = 0; $i < 6; $i++){
		if ($i < 2)
			$str .= $charList[rand(0, strlen($charList) - 1)];
		else
			$str .= $numList[rand(0, strlen($numList) - 1)];
	}

	return $str;
}

<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$userNum = userToNum($conn,$user);

$results = mysqli_query($conn,"SELECT begStamp FROM p6App_Users WHERE PID='".$userNum."'");

if (mysqli_num_rows($results) > 0 && empty(mysqli_fetch_assoc($results)["begStamp"])){
	mysqli_query($conn,"UPDATE p6App_Users SET begStamp='".$timestamp."' WHERE PID='".$userNum."'");
	
	$str = "0";
	for ($i = 0; $i < 19; $i++){
		$str .= ",0";
	}
	echo $str;
	mysqli_query($conn,"UPDATE p6App_Users SET answers='".$str."' WHERE PID='".$userNum."'");
}


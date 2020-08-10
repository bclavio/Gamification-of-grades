<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$x = $_REQUEST['x'];
$y = $_REQUEST['y'];
$width = $_REQUEST['width'];
$height = $_REQUEST['height'];
//$object = $_REQUEST['object']; // assignment|paper|badge|tree
//$index = $_REQUEST['index'];
$userNum = userToNum($conn,$user);

if (
	mysqli_query($conn,
	"
		INSERT INTO p6App_ClickCanvas (userNum, timestamp, x, y, width, height)
			VALUES ('".$userNum."', '".$timestamp."', '".$x."', '".$y."', '".$width."', '".$height."')
	")
)
	echo "Success";
else
	echo "Error: " . mysqli_error($conn);

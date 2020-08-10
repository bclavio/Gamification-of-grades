<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$event = $_REQUEST['event']; // wheel|drag|scrollBar
$userNum = userToNum($conn,$user);

mysqli_query($conn,
"
INSERT INTO p6App_Scroll (userNum, timestamp, event)
    VALUES ('".$userNum."', '".$timestamp."', '".$event."')
");

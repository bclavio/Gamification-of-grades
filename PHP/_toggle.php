<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$event = $_REQUEST['event']; // show|hide
$object = $_REQUEST['object']; // correct|incorrect
$userNum = userToNum($conn,$user);

mysqli_query($conn,
"
INSERT INTO p6App_Toggle (userNum, timestamp, event, object)
    VALUES ('".$userNum."', '".$timestamp."', '".$event."', '".$object."')
");

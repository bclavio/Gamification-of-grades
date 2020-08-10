<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$event = $_REQUEST['event']; // copy|paste|cut
$clipboard = $_REQUEST['clipboard'];
$userNum = userToNum($conn,$user);

mysqli_query($conn,
"
INSERT INTO p6App_Clipboard (userNum, timestamp, event,clipboard)
    VALUES ('".$userNum."', '".$timestamp."', '".$event."', '".$clipboard."')
");

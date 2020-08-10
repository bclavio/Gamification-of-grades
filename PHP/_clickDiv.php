<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$object = $_REQUEST['object']; // scrollBar|scrollBtn|progressBar|assignment
$index = $_REQUEST['index'];
$userNum = userToNum($conn,$user);

echo $object;
mysqli_query($conn,
"
INSERT INTO p6App_ClickDivs (userNum, timestamp, object, indexNum)
    VALUES ('".$userNum."', '".$timestamp."', '".$object."', '".$index."')
");

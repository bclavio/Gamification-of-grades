<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$index = $_REQUEST['index'];
$answer = $_REQUEST['answer'];
$event = $_REQUEST['event']; // submit|cancel|clear|corrected
$userNum = userToNum($conn,$user);

mysqli_query($conn,
"
INSERT INTO p6App_Answers (userNum, timestamp, assignmentNum, answer, event)
    VALUES ('".$userNum."', '".$timestamp."', '".$index."', '".$answer."', '".$event."')
");

function strToArray($str){
	if (empty($str))
		return Array();
	return explode(',', $str);
}

function arrayToStr($arr){
	if (empty($arr))
		return "";
	return implode(',', $arr);
}

$sql = mysqli_query($conn,"SELECT answers FROM p6App_Users WHERE PID='".$userNum."'");
$answerList = strToArray(mysqli_fetch_array($sql)['answers']);
$answerList[$index] = $answer;
mysqli_query($conn,"UPDATE p6App_Users SET answers='".arrayToStr($answerList)."' WHERE PID='".$userNum."'");

if (strcmp($event,"corrected") == 0){
	$sql = mysqli_query($conn,"SELECT results FROM p6App_Users WHERE PID='".$userNum."'");
	$resultList = strToArray(mysqli_fetch_array($sql)['results']);

	$resultList[$index] = -2;

	mysqli_query($conn,"UPDATE p6App_Users SET results='".arrayToStr($resultList)."' WHERE PID='".$userNum."'");
}

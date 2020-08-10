<?php require('_mysql.php');

$user = $_REQUEST['user'];
$timestamp = $_REQUEST['timestamp'];
$grade = $_REQUEST['grade'];
$qualitative = $_REQUEST['qualitative'];
$answers = $_REQUEST['answers'];
$results = $_REQUEST['results'];
$userNum = userToNum($conn,$user);

$sql = mysqli_query($conn,"SELECT endStamp FROM p6App_Users WHERE PID='".$userNum."'");
if (mysqli_num_rows($sql) > 0){
	if (empty(mysqli_fetch_assoc($sql)["endStamp"])){
		if ($qualitative != 1)
			$group = (getTotal($conn,1,0) > getTotal($conn,0,0) ? 0 : 1 );
		else{
			$group = (getTotal($conn,1,1) > getTotal($conn,0,1) ? 0 : 1 );
			mysqli_query($conn,"UPDATE p6App_Users SET qualitative='1' WHERE PID='".$userNum."'");
		}

		echo $group.";";
		mysqli_query($conn,"UPDATE p6App_Users SET endStamp='".$timestamp."' WHERE PID='".$userNum."'");
		mysqli_query($conn,"UPDATE p6App_Users SET grade='".$grade."' WHERE PID='".$userNum."'");
		mysqli_query($conn,"UPDATE p6App_Users SET testGroup='".$group."' WHERE PID='".$userNum."'");
		mysqli_query($conn,"UPDATE p6App_Users SET answers='".$answers."' WHERE PID='".$userNum."'");
		mysqli_query($conn,"UPDATE p6App_Users SET results='".$results."' WHERE PID='".$userNum."'");
	}
	else{
		$sql = mysqli_query($conn,"SELECT testGroup FROM p6App_Users WHERE PID='".$userNum."'");
		$list = mysqli_fetch_array($sql);
		echo $list['testGroup'];
	}
}

function getTotal($conn,$i,$test) {
	$sql = mysqli_query($conn,"SELECT COUNT(*) AS total FROM p6App_Users WHERE testGroup='".$i."' AND qualitative='".$test."';");
	$userList = mysqli_fetch_array($sql);
	return $userList['total'];
}

<?php require('_mysql.php');

$table = "p6App_Clipboard";
if(empty(mysqli_query($conn, "SELECT * FROM ".$table))) {
	$sql = "CREATE TABLE ".$table." (
				PID INT unsigned auto_increment,
				userNum INT unsigned not null,
				timeStamp BIGINT unsigned not null,
				event ENUM('copy','paste','cut') not null,
				clipboard TEXT,
				PRIMARY KEY (PID)
			)";

	if (mysqli_query($conn, $sql))
		echo "Table ".$table." created successfully";
	else
		echo "Error: " . mysqli_error($conn);
}
else
	echo "Table ".$table." already exists";

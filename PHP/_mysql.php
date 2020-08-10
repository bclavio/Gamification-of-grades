<?php

/*
 * MySQL connection
 * Server, User and Password removed due to security reasons
 */

$conn = mysqli_connect(/* ... */);

// If connection was unsuccessful, terminate script and echo the error
if (!$conn)
	die("Connection failed: ".mysqli_connect_error());

mysqli_query($conn,/* ... */);

function userToNum($conn,$user){
	// Validates user and returns the index ID of the user, in the database, if valid
	
	// Get index ID of user by user ID
	$results = mysqli_query($conn,"SELECT PID FROM p6App_Users WHERE user='".$user."';");

	// If data was found, user ID is valid
	if (mysqli_num_rows($results) > 0){
		// Echo user ID
		echo $user.";";
		// Returns index ID of user
		return mysqli_fetch_assoc($results)["PID"];
	}
	else{
		// Terminates the script and echo "invalid"
		die("invalid;");
	}
}

<?php require('_mysql.php');

$results = mysqli_query($conn,"SELECT user FROM p6App_Users;");

if (mysqli_num_rows($results) > 0) {
    while($row = mysqli_fetch_assoc($results)) {
        echo $row["user"]."<br/>";
    }
}
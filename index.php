<html>
<head>
<title>Comhub</title>
</head>
<body>
	<h1>My User Web Root</h1>
<p>
<?php
	
	require_once __DIR__.'/login.php';

	$conn = new mysqli($hn, $un, $pw, $db);
	if ($conn->connect_error) mysql_fatal_error($conn->connect_error);
	
	$query = "SELECT * FROM complaint";
	$result = $conn->query($query);

	if (!$result) mysql_fatal_error($conn->error);

	$rows = $result->num_rows;

	for ($j = 0; $j < $rows ; ++$j)
	{
		$result->data_seek($j);
		$row = $result->fetch_array(MYSQLI_ASSOC);
		echo 'Name: '	. $row['name']	. '<br>';
	}

	$result->close();
	$conn->close();

function mysql_fatal_error($msg)
{
	$msg2 = mysql_error();
	echo <<< _END
The task was not completed. The error message was:
<p> $msg: $msg2</p>
Please click the back button and try again._END
_END;
die();
}

?>
</p>
</body>
</html>


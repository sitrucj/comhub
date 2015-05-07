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
	if ($conn->connect_error) die($conn->connect_error);
	
	$query = "SELECT * FROM complaint";
	$result = $conn->query($query);

	if (!$result) die($conn->error);

	$rows = $result->num_rows;

	for ($j = 0; $j < $rows ; ++$j)
	{
		$result->data_seek($j);
		$row = $result->fetch_array(MYSQLI_ASSOC);
		echo 'Name: '	. $row['name']	. '<br>';
	}

	$result->close();
	$conn->close();
?>
</p>
</body>
</html>


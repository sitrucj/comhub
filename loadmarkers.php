<?php
	
	require_once __DIR__.'/login.php';

	// Start XML file, create parent node

	$dom = new DOMDocument("1.0");
	$node = $dom->createElement("markers");
	$parnode = $dom->appendChild($node);

	//connect to mysql server
	$conn = new mysqli($hn, $un, $pw, $db);
	if ($conn->connect_error) mysql_fatal_error($conn->connect_error);

	// Set the active MySQL database
	$conn->select_db($db);
	

	// Select all the rows in the markers table
	$query = "SELECT * FROM complaint WHERE 1";
	$result = $conn->query($query);
	if (!$result) mysql_fatal_error($conn->error);

	header("Content-type: text/xml");

	// Iterate through the rows, adding XML nodes for each

	while ($row = @mysqli_fetch_assoc($result)){
	  // ADD TO XML DOCUMENT NODE
	  $node = $dom->createElement("marker");
	  $newnode = $parnode->appendChild($node);
	  $newnode->setAttribute("name",$row['name']);
	  $newnode->setAttribute("type", $row['type']);
	  $newnode->setAttribute("details", $row['details']);
	  $newnode->setAttribute("lat", $row['lat']);
	  $newnode->setAttribute("lng", $row['lng']);
	}

	echo $dom->saveXML();

function mysql_fatal_error($msg)
{
	$msg2 = mysqli_error();
	echo <<< _END
The task was not completed. The error message was:
<p> $msg: $msg2</p>
Please click the back button and try again._END
_END;
die();
}

?>
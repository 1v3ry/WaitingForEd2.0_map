<?
include('constants.php');
header('Content-type: application/json');
$mysqli = mysqli_connect(HOST, USER, PASSWORD, DB);
$result = $mysqli->query("SELECT * FROM submits ORDER BY id");
echo "[";
while($row = $result->fetch_array(MYSQLI_ASSOC))
{
	if($row["id"] != 1){echo ",";}
	echo "{"."\"alias\":\"".htmlspecialchars($row["alias"])."\", \"lat\":".$row["lat"].", \"lon\":".$row["lon"].", \"text\":\"".htmlspecialchars ($row["text"])."\", \"time\":\"".$row["time"]."\",\"images\":[";
	$files = preg_split("/;/",$row["images"]);
	foreach($files as $key => $value)
	{
		if($key != 0){echo ",";}
		echo "\"".$value."\"";
	}
	echo "]}";
}
echo "]";
mysqli_close($mysqli);
?>
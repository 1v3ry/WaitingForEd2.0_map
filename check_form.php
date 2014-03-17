<?
if($_GET["do"] == "file")
{
	header('Content-type: application/json');
	echo "{\"status\":\"";
	$mime = false;
	for($i = 0; $i < count($_FILES["photos"]["tmp_name"]); $i++)
	{
		if($_FILES["photos"]["type"][$i] != 'image/jpeg' AND $_FILES["photos"]["type"][$i] != 'image/png' AND $_FILES["photos"]["type"][$i] != 'image/gif'AND $_FILES["photos"]["type"][$i] != 'image/tiff') {$mime = true;}
	}
	if($mime == true)
	{
		echo "Your photo(s) must be of the type JPEG, PNG, GIF of TIFF.\\n";
	}
	echo "\", \"request\":";
	echo $_SERVER['CONTENT_LENGTH'];
	echo "}";
}
else
{
	header('Content-type: application/json');
	echo "{\"status\":\"";
	$mime = false;
	if(!$_POST["alias"]) {echo "Please specify an alias.\\n";}
	if($_POST["user_lat"] == 0 || $_POST["user_lon"] == 0) {echo "Please choose your location.\\n";}
	if(!$_FILES["photos"]) {echo "Please submit at least one photo.\\n";}
	for($i = 0; $i < count($_FILES["photos"]["tmp_name"]); $i++)
	{
		if($_FILES["photos"]["type"][$i] != 'image/jpeg' AND $_FILES["photos"]["type"][$i] != 'image/png' AND $_FILES["photos"]["type"][$i] != 'image/gif'AND $_FILES["photos"]["type"][$i] != 'image/tiff') {$mime = true;}
	}
	if($mime == true)
	{
		echo "Your photo(s) must be of the type JPEG, PNG, GIF of TIFF.\\n";
	}
	echo "\", \"request\":";
	echo $_SERVER['CONTENT_LENGTH'];
	echo "}";
}
?>
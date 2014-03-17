<?
$conn = mysql_connect("localhost", "web1216", "philosophie");
mysql_select_db("web1216_usr_1", $conn);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html" charset="UTF-8" />
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<title>#WaitingForEd - map</title>
		<link rel="SHORTCUT ICON" href="icon.ico"/>
		<link href="styles.css" rel="stylesheet" type="text/css"/>
		<link href="jquery/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css"/>
		<script src="openlayers/OpenLayers.js"></script>
		<script src="jquery/js/jquery-1.10.2.js"></script>
		<script src="jquery/js/jquery-ui-1.10.4.custom.js"></script>
		<script src="jquery/js/jquery-ui-1.10.4.custom.min.js"></script>
		<script type='text/javascript' src='map.js'></script>
		<script type='text/javascript'>
		</script>
	</head>
	<body onload='initialize_map();'>
<!--	HEADER		-->
		<div id='header'>
			<span id='submits_nr'>
				<? 
					echo number_format(mysql_num_rows(mysql_query("SELECT * FROM submits")));
				?>
			</span>
			<span style='width:30px;'>
				WAITING FOR ED
			</span>
		</div>
		<div id='logo'></div>
    	<div id="submit_plus" onclick='showhideform();'></div>
    	
<!--	FORM		-->	
    	<form id='submit_form' enctype="multipart/form-data" method="post">
    		<div id='submit_error'></div>
			<input type='text' id='alias' name='alias'  placeholder='Alias' required/>
			<input type='file' id='photos' name='photos[]' accept='image/gif,image/jpeg,image/png,image/tiff' maxlength='12058624' onchange="check_form();" multiple required/>
			<span id='filesize_container'>0 MB<div id='filesize'></div>14 MB</span>
			<script type='text/javascript'>
				$("#filesize").progressbar({value:0, max: 14680064});
			</script>

			<textarea name='text' placeholder='Your message to the world. (optional)'></textarea>
			<input type='button' value='SET 
LOCATION' id="set_location_button" onclick='if(mobile){showhideform(); alert("Tap anywhere on the map to set your location."); map.events.register("touchend", map, man_set_user_location);}else{map.events.register("click", map, man_set_user_location); this.style.color = "black"; this.style.backgroundColor = "white"; document.getElementById("map").style.cursor = "crosshair";}'> <input type='button' value="AUTO 
DETECT" id="auto_location_button" onclick='if(navigator.geolocation){navigator.geolocation.getCurrentPosition(auto_set_user_location, location_error, {timeout:2000}); this.style.color = "black"; this.style.backgroundColor = "white";}else{alert("Your browser does not support geolocation.");}'>
			<span id='location_set'>&#10008;</span>
			<input type='reset'>
			<input type='submit' id="submit_button" onclick='submit_form(); return false;'>
		</form>
		
<!--	MAP			-->	
		<div id='map'></div>
		
<!--	NOSCRIPT	-->
		<noscript>
			Please activate javascript to properly display this webpage.
		</noscript>
	</body>
</html>
<?
mysql_close($conn);
?>
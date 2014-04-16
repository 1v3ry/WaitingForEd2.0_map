<?
include('constants.php');
$mysqli = mysqli_connect(HOST, USER, PASSWORD, DB);
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
					$result = $mysqli->query("SELECT * FROM submits");
					echo number_format($result->num_rows);
					$result->close();
				?>
			</span>
			<span>
				WAITING FOR ED
			</span>
		</div>
		<div id='logo'><img src='' height='0px' width='0px' alt='W - whistleblower power - truth is coming and it cannot be stopped!' title='logo'/></div>
    	<div id="submit_plus" onclick='showhideform();'><img src='' height='0px' width='0px' alt='white plus in a circle - add yourself!' title='submit_plus'/></div> <!-- the 0px imgs are for screen readers-->

<!--	PHOTO-PANORAMA		-->
		<div id='panorama_photo_container'>
			<div id='panorama_photo_container_helper'>
				<div id='panorama_photo_close' onclick='hidephoto();'>x CLOSE</div>
				<div id='panorama_photo_container_helper2'>
					<img id='panorama_photo' src=''/>
					<div>
						You can use this url to link this photo in social media:
						<a id='site_url' href=''></a>
						<span>
							NO, WE WON'T USE BIG-DATA LIKE-BUTTONS!1!!
						</span>
					</div>
				</div>
			</div>
		</div>
    	
<!--	FORM				-->	
    	<form id='submit_form' enctype="multipart/form-data" method="post">
    		<div id='submit_error'></div>
			<input type='text' id='alias' name='alias'  placeholder='Alias' required/>
			<input type='file' id='photos' name='photos[]' accept='image/gif,image/jpeg,image/png,image/tiff' maxlength='12058624' onchange="check_form();" multiple required/>
			<span id='filesize_container'>0 MB<div id='filesize'></div>14 MB</span>
			<script type='text/javascript'>
				$("#filesize").progressbar({value:0, max: 14680064});
	
			</script>

			<textarea name='text' placeholder='Your message to the world. (optional)'></textarea>
				<div id='location_container'>
			<input type='button' value='SET LOCATION' id="set_location_button" onclick='if(mobile){showhideform(); alert("Tap anywhere on the map to set your location."); map.events.register("touchend", map, man_set_user_location);}else{map.events.register("click", map, man_set_user_location); this.style.color = "black"; this.style.backgroundColor = "white"; document.getElementById("map").style.cursor = "crosshair";}'>
			<input type='button' value="AUTO DETECT" id="auto_location_button" onclick='if(navigator.geolocation){navigator.geolocation.getCurrentPosition(auto_set_user_location, location_error, {timeout:2000}); this.style.color = "black"; this.style.backgroundColor = "white";}else{alert("Your browser does not support geolocation.");}'>
				</div>
			<span id='location_set'>&#10008;</span>
			<input type='reset' id='reset' value='reset'>
			<input type='button' value='submit' id="submit_button" onclick='submit_form();'><br/>
			<div id='upload_data_note'>By uploading your data you agree to the storage and usage of your data only in the context of this website.</div>
		</form>
		
<!--	MAP					-->	
		<div id='map'></div>
		<div id='map_attribution'>&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="#" onclick="showhideimprint();">Imprint</a></div>

<!--	IMPRINT				-->	
		<div id='imprint'>
			<span id='license'>This work is licensed as public domain.<br/>
			Special thanks go to the <a href='https://jqueryui.com' target='_blank'>jQuery user interface</a>, <a href='https://www.openstreetmap.org/' target='_blank'>openstreetmap</a> and <a href='' target='_blank'>openlayers</a>.<br/><br/>
			The code is available at <a href='https://github.com/1v3ry/WaitingForEd2.0_map' target='_blank'>https://github.com/1v3ry/WaitingForEd2.0_map</a>.</span>
			<span id='address'><span class='headline'>Host & Admin</span><br/>Oliver Sch&ouml;nefeld<br/>Ferdinand-Jost-Str. 45<br/>04299 Leipzig; Germany<br/>&#9993; <a href='mailto:oliver.schoenefeld@me.com'>MAIL</a> < <a href='http://pgp.mit.edu:11371/pks/lookup?op=get&search=0xB2B9A8393D2A593C' title='0xB2B9A8393D2A593C' target='_blank'>PGP</a></span>
			<span id='address'><span class='headline'>Content</span><br>Andy Mangelmann<br/>Nachtigallenweg 28<br/>47638 Straelen; Germany<br/>+49 157/88649509</span>
		</div>

<!--	NOSCRIPT			-->
		<noscript>
			Please activate javascript to properly display this webpage.
		</noscript>
	</body>
</html>
<?
mysqli_close($mysqli);
?>
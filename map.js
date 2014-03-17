var zoom = 0;
var user_lat = 0;
var user_lon = 0;
var map;
var markers = new OpenLayers.Layer.Markers( "Markers" );
var user_location_marker;
var map_e = '';
var user_location_icon = new OpenLayers.Icon('location.png', new OpenLayers.Size(40,40), new OpenLayers.Pixel(-20, -40));

var element = document.createElement('div')
if("ontouchstart" in  element)
{
	var mobile = true;
}
else
{
	var mobile = false;
}
element.remove();

function auto_set_user_location(pos)
{
	if(user_lat != 0 && user_lon != 0)
	{
		markers.removeMarker(user_location_marker);
	}
	user_lat = pos.coords.latitude;
	user_lon = pos.coords.longitude;
	var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var position       = new OpenLayers.LonLat(user_lon,user_lat).transform( fromProjection, toProjection);
	user_location_marker = new OpenLayers.Marker(position, user_location_icon);
	markers.addMarker(user_location_marker);
	user_lat = parseFloat(user_location_marker.lonlat.lat);
	user_lon = parseFloat(user_location_marker.lonlat.lon);
	map.setCenter(position);
	document.getElementById('location_set').style.color = "#00CC00";
	document.getElementById('location_set').innerHTML = "&#10004;";
	document.getElementById('auto_location_button').style.color = "white";
	document.getElementById('auto_location_button').style.backgroundColor = "black";
}

function man_set_user_location(pos)
{
	if(user_lat != 0 && user_lon != 0)
	{
		markers.removeMarker(user_location_marker);
	}
	if(mobile)
	{
 		user_lat = parseFloat(map.getLonLatFromPixel({x:pos.changedTouches[0].clientX,y:pos.changedTouches[0].clientY}).lat);
		user_lon = parseFloat(map.getLonLatFromPixel({x:pos.changedTouches[0].clientX,y:pos.changedTouches[0].clientY}).lon);
		map.events.unregister("touchend", map, man_set_user_location);
 	}
 	else
 	{
		user_lat = parseFloat(map.getLonLatFromPixel(pos.xy).lat);
		user_lon = parseFloat(map.getLonLatFromPixel(pos.xy).lon);
		map.events.unregister("click", map, man_set_user_location);
	}
	document.getElementById('location_set').style.color = "#00CC00";
	document.getElementById('location_set').innerHTML = "&#10004;";
	document.getElementById('set_location_button').style.color = "white";
	document.getElementById('set_location_button').style.backgroundColor = "black";
	document.getElementById("map").style.cursor = "default";
	user_location_marker = new OpenLayers.Marker(new OpenLayers.LonLat(user_lon,user_lat), user_location_icon);
	markers.addMarker(user_location_marker);
	map.setCenter(new OpenLayers.LonLat(user_lon,user_lat));
}

function location_error(e)
{
	if(e.code == 2 || e.code == 3)
	{
		alert("Your location can't be determined.");
		document.getElementById('auto_location_button').style.color = "white";
		document.getElementById('auto_location_button').style.backgroundColor = "black";
	}
}

function showhideform()
{
	if(document.getElementById("submit_form").style.display != "block")
	{
		$("#submit_form").show("slide", {direction:"up", easing: "easeOutBounce"}, 500);
		$("#submit_plus").addClass("active", {easing: "easeInQuart"}, 500);
	}
	else
	{
		$("#submit_form").hide("slide", {direction:"up", easing: "easeOutQuart"}, 500);
		$("#submit_plus").removeClass("active", {easing: "easeOutQuart"}, 500);
	}
}

function initialize_map()
{
	if(mobile)
    {
    	var controls = new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            });
    }
    else
    {
    	var controls = new OpenLayers.Control.PanZoomBar();
    }
    map = new OpenLayers.Map('map', 
    	{ controls: 
    		[
    			controls,
    			new OpenLayers.Control.Navigation(),
    			new OpenLayers.Control.Attribution(),
    		]
    	});
        var mapnik         = new OpenLayers.Layer.OSM();
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(user_lon,user_lat).transform( fromProjection, toProjection);
    map.addLayer(mapnik);
    map.addLayer(markers);
    map.setCenter(position, zoom);
}

function check_form()
{
	if(document.getElementById('filesize').lastChild.className.lastIndexOf(' error') != -1)
	{
		document.getElementById('filesize').lastChild.innerHTML ='';
		document.getElementById('filesize').lastChild.className = document.getElementById('filesize').lastChild.className.substring(0,document.getElementById('filesize').lastChild.className.lastIndexOf(' error'));
	}
	$("#filesize").progressbar( "option", "value", false );
	var ajaxRequest;  // The variable that makes Ajax possible!	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e){
				// Something went wrong
				alert('Your browser broke!');
				return false;
			}
		}
	}

	var data = new FormData(document.getElementById('submit_form'));
	data.append('user_lat', user_lat);
	data.append('user_lon', user_lon);
	ajaxRequest.open('POST', 'check_form.php?do=file', true);
	ajaxRequest.send(data);

	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
		{
			var response = JSON.parse(ajaxRequest.responseText);
			if(response.request < 14680064)
			{
				$("#filesize").progressbar( "option", "value",  response.request);
			}
			else
			{
				$("#filesize").progressbar( "option", "value", 14680064);
				document.getElementById('filesize').lastChild.innerHTML ='The maximum upload size is exceeded.';
				document.getElementById('filesize').lastChild.className += ' error';
				error = true;
			}
			if(response.status != '')
			{
				alert(response.status);
				$("#filesize").progressbar( "option", "value", 14680064);
				document.getElementById('filesize').lastChild.className += ' error';
				error = true;			
			}
		}
	}
}

function submit_form()
{
	document.getElementById('submit_error').innerHTML = '';
	var request_length = $("filesize").progressbar( "option", "value" );
	if(document.getElementById('alias').value == '')
	{
		document.getElementById('submit_error').innerHTML += 'Please provide an alias.<br/>';
	}
	if(request_length == 0 || document.getElementById('photos').value == '')
	{
		document.getElementById('submit_error').innerHTML += 'Please select a photo.<br/>';
	}
	if(request_length == 14680064)
	{
		document.getElementById('submit_error').innerHTML += 'The maximum upload size is exceeded.<br/>';
	}
	if(user_lat == 0 || user_lon == 0)
	{
		document.getElementById('submit_error').innerHTML += 'Please select your location.<br/>';
	}
	switch(document.getElementById('photos').substr(this.lastIndexOf("."), this.length))
	{
		case 'jpeg': break;
		case 'jpg': break;
		case 'png': break;
		case 'gif': break;
		case 'tiff': break;
		default: document.getElementById('submit_error').innerHTML += 'Your photo(s) must be of the type JPEG, PNG, GIF of TIFF.<br/>'; break;
	}
	if(document.getElementById('submit_error').innerHTML != '')
	{
		document.getElementById('submit_error').innerHTML += '<br/><br/><font size="0.9em">Click <a href="#" onclick="$(\'#submit_error\').hide(\'fade\', null, 500); return false;">here</a> to close me.</font>';
		$('#submit_error').show("fade", null, 500);
		return false;
	}
	
	var ajaxRequest;  // The variable that makes Ajax possible!	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e){
				// Something went wrong
				alert('Your browser broke!');
				return false;
			}
		}
	}

	var data = new FormData(document.getElementById('submit_form'));
	data.append('user_lat', user_lat);
	data.append('user_lon', user_lon);
	ajaxRequest.open('POST', 'check_form.php?do=file', true);
	ajaxRequest.send(data);
}

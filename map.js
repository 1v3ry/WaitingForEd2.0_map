var user_lat = 0;
var user_lon = 0;
var map;
var markers = new OpenLayers.Layer.Markers( "Markers" );
var user_location_marker;
var map_e = '';
var user_location_icon = new OpenLayers.Icon('location.png', new OpenLayers.Size(40,40), new OpenLayers.Pixel(-20, -40));

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
	map.setCenter(position, 3);
	document.getElementById('location_set').style.color = "#00CC00";
	document.getElementById('location_set').innerHTML = "&#10004;";
	document.getElementById('auto_location_button').style.color = "white";
	document.getElementById('auto_location_button').style.backgroundColor = "black";
}

function man_set_user_location()
{
	if(user_lat != 0 && user_lon != 0)
	{
		markers.removeMarker(user_location_marker);
	}
	var position = document.getElementsByClassName('olControlMousePosition')[0].innerHTML.split(";");
	user_lat = parseFloat(position[1]);
	user_lon = parseFloat(position[0]);
	document.getElementById('location_set').style.color = "#00CC00";
	document.getElementById('location_set').innerHTML = "&#10004;";
	document.getElementById('set_location_button').style.color = "white";
	document.getElementById('set_location_button').style.backgroundColor = "black";
	document.getElementById("map").style.cursor = "default";
	user_location_marker = new OpenLayers.Marker(new OpenLayers.LonLat(user_lon,user_lat), user_location_icon);
	markers.addMarker(user_location_marker);
	map.setCenter(new OpenLayers.LonLat(user_lon,user_lat), 3);
	map.events.unregister("click", map, man_set_user_location);
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
	}
	else
	{
		$("#submit_form").hide("slide", {direction:"up", easing: "easeOutQuart"}, 500);
	}
}

function initialize_map()
{
	map = new OpenLayers.Map("map");
        var mapnik         = new OpenLayers.Layer.OSM();
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(user_lon,user_lat).transform( fromProjection, toProjection);
        var zoom           = 0; 
    map.addControl(new OpenLayers.Control.PanZoomBar());
    map.addControl(
                new OpenLayers.Control.MousePosition({
                    autoActivae: true,
                    separator: ';',
                    numDigits: 9,
                    emptyString: 'out'
                })
            );
    map.addLayer(mapnik);
    map.addLayer(markers);
    map.setCenter(position, zoom);
}

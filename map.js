var user_lat = 0;
var user_lon = 0;
var map = '';
var map_e = '';

function set_user_location(pos)
{
		user_lat = Math.round(pos.coords.latitude);
		user_lon = Math.round(pos.coords.longitude);
		var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(user_lon,user_lat).transform( fromProjection, toProjection);
        var zoom           = 3; 
        map.setCenter(position, zoom);
}

function location_error(e)
{
	if(e.code == 2 || e.code == 3)
	{
		alert("Your location can't be determined.");
	}
	else
	{
		alert("Please activate location-services for the best experience.");
	}
}

function initialize_map()
{
	map = new OpenLayers.Map("map");
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(set_user_location, location_error, {timeout:2000});
	}
        var mapnik         = new OpenLayers.Layer.OSM();
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(user_lon,user_lat).transform( fromProjection, toProjection);
        var zoom           = 0; 
    map.addControl(new OpenLayers.Control.PanZoomBar());
    map.addLayer(mapnik);
    map.setCenter(position, zoom);
//     document.getElementById("OpenLayers_Control_PanZoomBar_20").style.top = "50%";
//     document.getElementById("OpenLayers_Control_Attribution_7").style.right = "5%";
//     document.getElementById("OpenLayers_Control_Attribution_7").style.bottom = "5%";
}

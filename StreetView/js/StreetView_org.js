    //https://developers.google.com/maps/documentation/javascript/examples/streetview-simple
		var panorama;
		var addLatLng;
		var showPanoData;
		var panorama;
    var map;
 
    //Default map center location - TMB (747 St. Helens)
    var myLat=47.255938;
    var myLon=-122.441586;

    function initialize() {
      if (window.location != null && window.location.search.length > 1) {
        //Split URL sent by user for variables
        var urlParameters = window.location.search.substring(1);
        var params = urlParameters.split('&');

        var pairs = {};
        for (var i = 0, len = params.length; i < len; i++) {
          var pair = params[i].split('=');
          pairs[pair[0]] = pair[1];
        }

        myLat = pairs.lat;
        myLon = pairs.lon;
      }

      addLatLng = new google.maps.LatLng(myLat, myLon);
      //Create Street View
      //google.maps.StreetViewLocationRequest
      var service = new google.maps.StreetViewService();
      //service.getPanoramaByLocation(addLatLng, 50, showPanoData);  //search for a Street View panorama - get camera info - https://developers.google.com/maps/documentation/javascript/reference#StreetViewPov
      service.getPanorama({location: addLatLng, preference: 'nearest', radius: 50, source: 'outdoor'}, showPanoData);
    }

  	function showPanoData(panoData, status) {
  	  //console.error(status);
  	  //https://developers.google.com/maps/documentation/javascript/streetview
  	  if (status != google.maps.StreetViewStatus.OK) {
  	    //alert("Sorry, Street View data not found for this location.");
  	    console.error("Sorry, Street View data not found for this location. | ", status);
  	    if (status == 'ZERO_RESULTS'){alert("Sorry, Street View data not found for this location.")};
  	    return;
  	  }
  	  var angle = computeAngle(addLatLng, panoData.location.latLng);
  	  //https://developers.google.com/maps/documentation/javascript/reference#StreetViewPanoramaOptions
      var panorama = new google.maps.StreetViewPanorama(
  	    document.getElementById('pano'), {
  	      position: addLatLng,
  	      pov: {
  	        heading: angle,
  	        pitch: 10
  	      },
          imageDateControl: true
  	    });

      map = new google.maps.Map(document.getElementById('map'), {  //create map
        center: addLatLng,
        zoom: 16
      });

      //Add marker to Street View (panorama)
      var marker = new google.maps.Marker({
        position: addLatLng,
        map: panorama,
        icon: 'images/marker-icon.png',
        title: 'Site'
      });

  	  map.setStreetView(panorama); //connect map & streetview (adds animated figure to map)

  	}

	function computeAngle(endLatLng, startLatLng) {
      var DEGREE_PER_RADIAN = 57.2957795;
      var RADIAN_PER_DEGREE = 0.017453;

      var dlat = endLatLng.lat() - startLatLng.lat();
      var dlng = endLatLng.lng() - startLatLng.lng();
      // We multiply dlng with cos(endLat), since the two points are very closeby,
      // so we assume their cos values are approximately equal.
      var yaw = Math.atan2(dlng * Math.cos(endLatLng.lat() * RADIAN_PER_DEGREE), dlat)
             * DEGREE_PER_RADIAN;
      return wrapAngle(yaw);
   }

   function wrapAngle(angle) {
		if (angle >= 360) {
		    angle -= 360;
		} else if (angle < 0) {
		    angle += 360;
		}
		return angle;
    }

  //Resize map & streetview panels on page resize
   window.onresize = function(){
     initialize(); //refresh page
   }

var panorama,addLatLng,map,myLat=47.255938,myLon=-122.441586;function initialize(){if(null!=window.location&&1<window.location.search.length){for(var a=window.location.search.substring(1).split("&"),c={},b=0,d=a.length;b<d;b++){var e=a[b].split("=");c[e[0]]=e[1]}myLat=c.lat;myLon=c.lon}addLatLng=new google.maps.LatLng(myLat,myLon);(new google.maps.StreetViewService).getPanorama({location:addLatLng,preference:"nearest",radius:50,source:"outdoor"},showPanoData)}
function showPanoData(a,c){if(c!=google.maps.StreetViewStatus.OK)console.error("Sorry, Street View data not found for this location. | ",c),"ZERO_RESULTS"==c&&alert("Sorry, Street View data not found for this location.");else{var b=computeAngle(addLatLng,a.location.latLng);b=new google.maps.StreetViewPanorama(document.getElementById("pano"),{position:addLatLng,pov:{heading:b,pitch:10},imageDateControl:!0});map=new google.maps.Map(document.getElementById("map"),{center:addLatLng,zoom:16});new google.maps.Marker({position:addLatLng,
map:b,icon:"images/marker-icon.png",title:"Site"});map.setStreetView(b)}}function computeAngle(a,c){var b=a.lat()-c.lat(),d=a.lng()-c.lng();b=57.2957795*Math.atan2(d*Math.cos(.017453*a.lat()),b);return wrapAngle(b)}function wrapAngle(a){360<=a?a-=360:0>a&&(a+=360);return a}window.onresize=function(){initialize()};
var map;

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(7.317238425217869, 8),
    zoom:2,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
initialize();
google.maps.event.addDomListener(window, 'load', initialize);
initialize();

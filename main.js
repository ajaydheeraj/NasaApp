var apiURL = "https://communities.socrata.com/resource/ds82-x5sg.json?";
var mData;
var markers = [];
var fireballProperties = [];

var img1 = "http://i.imgur.com/pDNjBJs.png?2";
var img2 = "http://i.imgur.com/NKlYKuD.png?1";
var img3 = "http://i.imgur.com/F3emGw3.png?1";
var img4 = "http://i.imgur.com/XKJm639.png?1";

var getSocrata = function(year){
	var addOn = makeCommand(year);
	$.ajax({
	url: apiURL + addOn,
	type: "GET",
	}).done(function(data){
		mData = data;
		markLocations(data);
	})
}

var markLocations = function(data){
	
	for(var i = 0; i < data.length; i ++){
		
		meteorObj = data[i];

		var geolocation = meteorObj.geolocation;
		var lat = parseInt(geolocation.latitude);
		var lng = parseInt(geolocation.longitude);
		var myLatLng = {lat : lat, lng: lng};
	
		var energy = Number(meteorObj.calculated_total_impact_energy_kt);
		if(energy < 0.25){
			var icon = {
				"url": img1,
			}
		}
		else if(energy < 1){
			var icon = {
				"url":img2,
			}
		}
		else if(energy < 3){
			var icon = {
				"url":img3,
			}
		}
		else{
			var icon = {
				"url":img4,
			}
		}
		
		var marker = new google.maps.Marker({
	 		position: myLatLng,
	 		map: map,
	 		title: 'Fireball ' + i,
	 		icon: icon,
	 		scale: 100,
		});

		for(var prop in meteorObj){
			marker[prop] = meteorObj[prop]
		}

		google.maps.event.addListener(marker, 'click', function () {
   			$("#info").empty();
			var html = "";
			html += "<h2> Energy Radiated in Joules: " + this.total_radiated_energy_j + "</h2>";
			html += "<h2> Energy Radiated in Tons of TNT: " + Math.floor(this.total_radiated_energy_j/4184000000) + "</h2>";
			$("#info").append(html);
		});
		
		markers.push(marker);
	}
}

var makeCommand = function(year){
	if(year != null){
		var yearString = '\'' + year + "-01-01\'";
		var nextYear = year + 1;
		var nextYearString = '\'' + nextYear + "-01-01\'";
		var query = "$where=date_time_peak_brightness_ut > " + yearString + " AND date_time_peak_brightness_ut < " + nextYearString;
	}
	else{
		query = "";
	}
	return query;
}

var clearMarkers = function(){
	for(var i = 0; i < markers.length; i ++){
  		markers[i].setMap(null);
  		//markers2[i].setMap(null);
	}
}

var changeYear = function(year){
	clearMarkers();
	getSocrata(year);
	//getMeteor(year);
}

getSocrata(2012);

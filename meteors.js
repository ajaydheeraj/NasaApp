var meteorAPI = "https://data.nasa.gov/resource/gh4g-9sfh.json?";
var mData2;
var markers2 = [];
var meteorProperties = [];

var mImg1 = "http://i.imgur.com/UPv6Qvx.png?1";
var mImg2 = "http://i.imgur.com/glfsIGF.png?1";
var mImg3 = "http://i.imgur.com/bU8Y7dD.png?1";
var mImg4 = "http://i.imgur.com/zVg8jZU.png?1";

var getMeteor = function(year){
	var addOn = makeMeteorCommand(year);
	$.ajax({
	url: meteorAPI + addOn,
	type: "GET",
	}).done(function(data){
		mData2 = data;
		markMeteorLocations(data);
	})

}

var makeMeteorCommand = function(year){
	if(year != null){
		var query = "$where=year>\'" + year + "\' AND year < \'" + (year+1) + "\'";
	}
	else{
		var query = "";
	}
	return query;
}

var markMeteorLocations = function(data){
	for(var i = 0; i < data.length; i ++){
		var meteorObj = data[i];
		var geolocation = meteorObj.geolocation;
		var lat = parseInt(geolocation.latitude);
		var lng = parseInt(geolocation.longitude);
		var myLatLng = {lat : lat, lng: lng};
		var icon;
		var mass = meteorObj.mass/1000
		console.log(mass);

		if(mass < 10){
			icon = mImg1;
		}
		else if(mass < 50){
			icon = mImg2;
		}
		else if(mass < 100){
			icon = mImg3;
		}
		else{
			icon = mImg4;
		}

		var marker = new google.maps.Marker({
	 		position: myLatLng,
	 		map: map,
	 		title: 'Meteor ' + i,
	 		icon: icon,
	 		scale: 100,
		});

		for(var prop in meteorObj){
			marker[prop] = meteorObj[prop]
		}

		google.maps.event.addListener(marker, 'click', function () {
   			$("#info").empty();
			var html = "";
			html += "<h2> Name: " + this["name"] + "</h2>";
			html += "<h2> Mass in Kilograms: " + Math.floor(this.mass/1000) + "</h2>";
			$("#info").append(html);
		});

		markers2.push(marker);
	}
}

var clearMeteorMarkers = function(){
	getMeteor(2012);
	for(var i = 0; i < markers2.length; i ++){
  		markers2[i].setMap(null);
  	}
}

var changeMeteorYear = function(year){
	clearMeteorMarkers();
	getMeteor(year);
}

getMeteor(2012);

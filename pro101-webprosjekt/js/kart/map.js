var map, directionsService, directionsDisplay;
var fjerdingenLoc = {
  lat: 59.916191,
  lng: 10.759697
};
var brenneriveienLoc = {
  lat: 59.920379,
  lng: 10.752820
};
var kvadraturenLoc = {
  lat: 59.911020,
  lng: 10.746049
};
var vulkanLoc = {
  lat: 59.923163,
  lng: 10.752284
};

function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 59.917933,
      lng: 10.750229
    },
    zoom: 15,
    styles: style
  });
  var markerIcon = {
    url: 'img/campus-marker.png',
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(32, 65)
  };
  new MarkerWithLabel({
    map: map,
    animation: google.maps.Animation.DROP,
    position: kvadraturenLoc,
    icon: markerIcon,
    labelContent: 'Kvadraturen',
    labelAnchor: new google.maps.Point(50, 30),
    labelClass: "map-label", // your desired CSS class
    labelInBackground: true
  });
  new MarkerWithLabel({
    map: map,
    animation: google.maps.Animation.DROP,
    position: brenneriveienLoc,
    icon: markerIcon,
    labelContent: 'Brenneriveien',
    labelAnchor: new google.maps.Point(55, 30),
    labelClass: "map-label", // your desired CSS class
    labelInBackground: true
  });
  new MarkerWithLabel({
    map: map,
    animation: google.maps.Animation.DROP,
    position: vulkanLoc,
    icon: markerIcon,
    labelContent: 'Vulkan',
    labelAnchor: new google.maps.Point(35, 30),
    labelClass: "map-label", // your desired CSS class
    labelInBackground: true
  });
  new MarkerWithLabel({
    map: map,
    animation: google.maps.Animation.DROP,
    position: fjerdingenLoc,
    icon: markerIcon,
    labelContent: 'Fjerdingen',
    labelAnchor: new google.maps.Point(45, 30),
    labelClass: "map-label", // your desired CSS class
    labelInBackground: true
  });

  directionsDisplay.setMap(map);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: getTravelMode()
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function getTravelMode() {
  let radioWalk = document.getElementById("radioWalk");
  let radioBike = document.getElementById("radioBike");
  let RadioTransit = document.getElementById("RadioTransit");
  if (radioWalk.checked) {
    return "WALKING";
  } else if (radioBike.checked) {
    return "WALKING";
  } else {
    return "TRANSIT";
  }
}
google.maps.event.addDomListener(window, 'load', initMap);

function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}
let mode = gup("mode", window.location.href);
console.log(mode);
if (mode === "transit") {
  $('#transitMode').button('toggle');
} else if (mode === "bike") {
  $('#bikeMode').button('toggle');
}


let destination = gup("destination", window.location.href);
let destinationDropDown = document.getElementById("end");
switch(destination) {
  case "vulkan" : destinationDropDown.value = "Vulkan 19, Oslo";
  break;
  case "brenneriveien" : destinationDropDown.value = "Brenneriveien 9, Oslo";
  break;
  case "kvadraturen" : destinationDropDown.value = "Prinsens Gate 7, Oslo";
  break;
  case "fjerdingen" : destinationDropDown.value = "Christian Kroghs Gate 32, Oslo";
  break;
}

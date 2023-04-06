// Set the map view to the whole world
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });
  
  // Add a marker to a random location on the map
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(getRandomLonLat()))
  });
  
  var markerSource = new ol.source.Vector({
    features: [marker]
  });
  
  var markerLayer = new ol.layer.Vector({
    source: markerSource,
    style: new ol.style.Style({
      image: new ol.style.Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })
    })
  });
  
  map.addLayer(markerLayer);
  
  // When the marker is clicked, show the guess form
  var overlay = new ol.Overlay({
    element: document.getElementById('guess-form')
  });
  
  map.on('click', function(event) {
    var feature = map.getFeaturesAtPixel(event.pixel)[0];
    if (feature === marker) {
      overlay.setPosition(event.coordinate);
      document.getElementById('guess-form').classList.remove('hidden');
    } else {
      overlay.setPosition(undefined);
      document.getElementById('guess-form').classList.add('hidden');
    }
  });
  
  // When the guess is submitted,
  document.getElementById('guess-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var guess = document.getElementById('guess-latlng').value.split(',');
    var guessLat = parseFloat(guess[0].trim());
    var guessLng = parseFloat(guess[1].trim());
    
    var actualLatLon = ol.proj.toLonLat(marker.getGeometry().getCoordinates());
    var actualLat = actualLatLon[1];
    var actualLng = actualLatLon[0];
    
    var distance = getDistanceFromLatLonInKm(guessLat, guessLng, actualLat, actualLng);
    
    alert('Your guess is ' + distance.toFixed(2) + ' kilometers away!');
    });
    
    // Helper function to get a random latitude and longitude
    function getRandomLonLat() {
    var lon = Math.random() * 360 - 180;
    var lat = Math.random() * 170 - 85;
    return [lon, lat];
    }
    
    // Helper function to calculate the distance between two points on a sphere
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
    }
    
    function deg2rad(deg) {
    return deg * (Math.PI / 180)
    }  
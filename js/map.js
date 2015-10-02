var GoogleMap = function(){
    // Create a map object and specify the DOM element for display.
    this.map = new google.maps.Map(document.getElementById('map'));
    this.geocoder = new google.maps.Geocoder();
    this.infowindow = new google.maps.InfoWindow();
    this.markers = {};
    this.initMap();
};

GoogleMap.prototype.initMap = function(){
    var self = this;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            self.map.setCenter(pos);
            self.map.setZoom(13);
        }, null);
    }
    else{
        self.map.center({lat: -34.397, lng: 150.644});
        self.map.zoom(8);
    }
};

GoogleMap.prototype.addMarkersSaved = function(locations){
    for(var i in locations){
        var location = locations[i];
        this.drawMarker({lat: location.location.H, lng: location.location.L}, location.name);
    }
};

GoogleMap.prototype.addMarker = function(place, newLocation, callback){
    var self = this,
        location = null;
    self.geocoder.geocode( { 'address': place}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK){
            if(results.length > 1){
                console.log(results);
                return;
            }
            location = results[0].geometry.location;
            newLocation['location'] = location;
            console.log(location);
            self.drawMarker(location, place);
            callback();
        }
    });

};

GoogleMap.prototype.deleteMarker = function(place){
    this.showHideMarker(place, null);
    delete this.markers[place];
};


GoogleMap.prototype.drawMarker = function(position, place){

    var self = this,
        marker = new google.maps.Marker({
            position: position,
            map: this.map,
            title: place
        });

    this.markers[place] = marker;
    marker.addListener('click', function(){
        self.infowindow.setContent(place);
        self.infowindow.open(self.map, this);
    });
};

GoogleMap.prototype.showHideMarker = function(place, map){
    this.markers[place].setMap(map);
};

GoogleMap.prototype.showAllMarkers = function(){
    for(var marker in this.markers)
        this.showHideMarker(marker, this.map);
};


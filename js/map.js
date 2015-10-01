var GoogleMap = function(){
    // Create a map object and specify the DOM element for display.
    this.map = new google.maps.Map(document.getElementById('map'));
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
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

GoogleMap.prototype.addMarker = function(place){
    var self = this;
    self.geocoder.geocode( { 'address': place}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK){
            self.drawMarker(results[0].geometry.location);
        }
    });
};

GoogleMap.prototype.deleteMarker = function(index){
    this.showHideMarker(index, null);
    this.markers.splice(index, 1);
};


GoogleMap.prototype.drawMarker = function(position){
    var marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Hello World!'
    });
    this.markers.push(marker);
};

GoogleMap.prototype.showHideMarker = function(index, map){
    this.markers[index].setMap(map);
};


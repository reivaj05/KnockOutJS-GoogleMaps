(function() {
    if (!localStorage.locations) {
        var locations = [];
        localStorage.locations = JSON.stringify(locations);
    }
}());

var ViewModel = function(){
    var self = this;
    self.locations = ko.observableArray(JSON.parse(localStorage.locations));
    self.locationLabel = ko.observable('');
    self.showAddLocationForm = ko.observable(false);
    self.map = new GoogleMap();

    self.init = function(){
        self.locations().forEach(function(location){
            self.map.addMarker(location.name);
        });
    };

    self.editLocation = function(){
        console.log('editLocation');
    };
    self.removeLocation = function(){
        self.locations.remove(this);
        self.updateLocations();
    };
    self.addLocation = function(){
        self.locations.push({
            name: self.locationLabel()
        });
        self.updateLocations();
        self.updateShowAddLocationForm();
    };

    self.updateLocations = function(){
        localStorage.locations = JSON.stringify(self.locations());
        self.init();
    };

    self.updateShowAddLocationForm = function(){
        self.locationLabel('');
        self.showAddLocationForm(!self.showAddLocationForm());
    };

    self.init();


};

ko.applyBindings(new ViewModel());
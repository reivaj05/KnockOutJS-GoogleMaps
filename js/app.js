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
    self.oldValue = '';

    self.init = function(){
        self.locations().forEach(function(location){
            self.map.addMarker(location.name);
        });
    };

    self.editLocation = function(){
        self.oldValue = this;
        self.locationLabel(this.name);
        self.updateShowAddLocationForm();
    };
    self.removeLocation = function(){
        self.locations.remove(this);
        self.updateLocations();
        self.map.deleteMarker(this.name);
    };
    // Find a better and cleaner way to add and edit locations
    self.addLocation = function(){
        var value = self.locationLabel(),
            index = self.locations.indexOf(self.oldValue);

        if(index >= 0){
            self.locations.splice(index, 1, {name: value});
            self.map.deleteMarker(self.oldValue.name);
            self.oldValue = '';
        }
        else{
            self.locations.push({
                name: value
            });
        }
        self.map.addMarker(value);
        self.locationLabel('');
        self.updateLocations();
    };

    self.updateLocations = function(){
        localStorage.locations = JSON.stringify(self.locations());
    };

    self.updateShowAddLocationForm = function(){
        self.showAddLocationForm(!self.showAddLocationForm());
    };

    self.init();


};

ko.applyBindings(new ViewModel());
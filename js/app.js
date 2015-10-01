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

    self.editLocation = function(){
        console.log('editLocation');
    };
    self.removeLocation = function(){
        self.locations.remove(this);
        self.updateLocations();
    };
    self.addLocation = function(){
        self.locations.push({
            location: self.locationLabel()
        });
        self.updateLocations();
        self.updateShowAddLocationForm();
    };

    self.updateLocations = function(){
        localStorage.locations = JSON.stringify(self.locations());
    };

    self.updateShowAddLocationForm = function(){
        self.locationLabel('');
        self.showAddLocationForm(!self.showAddLocationForm());
    };

    


};

ko.applyBindings(new ViewModel());
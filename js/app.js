(function() {
    if (!localStorage.locations) {
        var locations = [];
        localStorage.locations = JSON.stringify(locations);
    }
}());

var ViewModel = function(){
    var self = this;
    self.locations = ko.observableArray(JSON.parse(localStorage.locations));
    self.showAddLocationForm = ko.observable(false);

    self.editLocation = function(){
        console.log('editLocation');
    };
    self.removeLocation = function(){
        self.locations.remove(this);
        self.updateLocations();
    };
    self.addLocation = function(){
        console.log('addLocation');
    };

    self.updateLocations = function(){
        localStorage.locations = JSON.stringify(self.locations());
    };

    self.updateShowAddLocationForm = function(){
        self.showAddLocationForm(!self.showAddLocationForm());
    };

    


};

ko.applyBindings(new ViewModel());
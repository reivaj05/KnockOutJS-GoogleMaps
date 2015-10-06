(function() {
    if (!localStorage.locations) {
        var locations = [];
        localStorage.locations = JSON.stringify(locations);
    }
}());
// TODO separate logic to edit and edit locations
var ViewModel = function(){
    var self = this;
    self.locationsSaved = JSON.parse(localStorage.locations);
    self.locations = ko.observableArray(self.locationsSaved);
    self.availableLocations = ko.observableArray([]);
    self.locationLabel = ko.observable('');
    self.searchInput = ko.observable('');
    self.showAddLocationForm = ko.observable(false);
    self.instagramResults = ko.observableArray([]);
    self.foursquareResults = ko.observableArray([]);
    self.map = new GoogleMap(self.instagramResults, self.foursquareResults);
    self.oldValue = '';

    self.init = function(){
        self.map.addMarkersSaved(self.locationsSaved);
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
    // TODO fix editing form and toggle behaviuor properly
    self.addLocation = function(){
        var value = self.locationLabel(),
            index = self.locations.indexOf(self.oldValue),
            newLocation = { name: value };
        if(index >= 0){
            self.locations.splice(index, 1, newLocation);
            self.map.deleteMarker(self.oldValue.name);
            self.oldValue = '';
        }
        else{
            self.locations.push(newLocation);
        }
        self.map.addMarker(value, newLocation, self.availableLocations, self.locations, index, self.updateLocations);
        self.locationLabel('');
    };

    self.updateLocations = function(){
        self.locationsSaved = self.locations();
        localStorage.locations = JSON.stringify(self.locationsSaved);
    };

    self.updateShowAddLocationForm = function(){
        self.showAddLocationForm(!self.showAddLocationForm());
    };

    self.filterResults = function(){
        var value = self.searchInput().toLowerCase();
        if(value === ''){
            self.map.showAllMarkers();
            self.locations(self.locationsSaved);
        }
        else{
            self.locations(self.locationsSaved.filter(function(location){
                var startsWith = location.name.toLowerCase().startsWith(value);
                self.map.showHideMarker(location.name, startsWith ? self.map.map : null);
                return startsWith;
            }));
        }
        return true;
    };

    self.showLocationInfo = function(data){
        var place = data.name;
        self.map.setMapInfo(place, self.map.getMarker(place));
    };

    self.showInstagramResults = ko.computed(function(){
        return self.instagramResults().length > 0;
    });

    self.showFoursquareResults = ko.computed(function(){
        return self.foursquareResults().length > 0;
    });

    self.placeSelected = ko.computed(function(){
        if (self.instagramResults().length > 0)
            return 'Instagram pictures taken in "'+self.map.currentMarker.title+'":';
    });

    self.placeFoursquareSelected = ko.computed(function(){
        if (self.foursquareResults().length > 0)
            return 'FourSquare places founded near from "'+self.map.currentMarker.title+'":';
    });

    self.init();


};

ko.applyBindings(new ViewModel());
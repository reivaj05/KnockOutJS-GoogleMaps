(function() {
    if (!localStorage.locations) {
        var locations = ["item1", "item2", "item3", "item4"];
        localStorage.attendance = JSON.stringify(locations);
    }
}());

var ViewModel = function(){
    var self = this;
    self.locations = ko.observableArray(JSON.parse(localStorage.attendance));

    self.editLocation = function(){
        console.log('editLocation');
    };
    self.removeLocation = function(){
        console.log('removeLocation');
    };
    self.addLocation = function(){
        console.log('addLocation');
    };


};

ko.applyBindings(new ViewModel());
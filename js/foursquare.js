var Foursquare = function(foursquareResults){
    this.foursquareResults = foursquareResults;
    this.searchUrl = 'https://api.foursquare.com/v2/venues/search';
};

Foursquare.prototype.getResults = function(marker){
    var pos =  marker.position,
        lat = pos.H,
        lng = pos.L,
        self = this;
    $.ajax({
        method: 'GET',
        type: 'jsonp',
        url: this.searchUrl,
        data: {
            ll: lat+','+lng,
            client_id: KEYS['CLIENT_ID_FOURSQUARE'],
            client_secret: KEYS['CLIENT_SECRET_FOURSQUARE'],
            v: '20151001',
            m: 'swarm'
        },
    })
    .done(function(data) {
        self.foursquareResults([]);
        console.log(data);
        var results = data.response.venues;
        for(var i in results){
            var result = results[i];
            var formattedResult = {
                name: result.name,
                link: result.url,
                twitter: result.contact.twitter,
                phone: result.contact.formattedPhone,
                checkinsCount: result.stats.checkinsCount,
                address : result.location.formattedAddress[0],
                cp : result.location.formattedAddress[1],
                country : result.location.formattedAddress[2]
            };
            self.foursquareResults.push(formattedResult);
        }
    })
    .fail(function(){
        self.foursquareResults([]);
        alert('There was an error trying to get places from foursquare');
    });
};
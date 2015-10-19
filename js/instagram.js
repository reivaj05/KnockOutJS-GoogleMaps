var Instagram = function(instagramResults){
    this.instagramResults = instagramResults;
};

Instagram.prototype.getResults = function(marker){
    var pos =  marker.position,
        lat = pos.lat(),
        lng = pos.lng(),
        self = this;
    $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'https://api.instagram.com/v1/media/search',
        data: {
            client_id: KEYS['CLIENT_ID_INSTAGRAM'],
            lat: lat,
            lng: lng,
            distance: 100
        },
    })
    .done(function(data) {
        self.instagramResults([]);
        var results = data.data;
        for(var i in results){
            var result = results[i];
            if(result.type === 'image'){
                var formattedResult = {
                    image: result.images.thumbnail.url,
                    link: result.link
                };
                self.instagramResults.push(formattedResult);
            }
        }
    })
    .fail(function(){
        self.instagramResults([]);
        alert('There was an error trying to get pictures from Instagram');
    });
};
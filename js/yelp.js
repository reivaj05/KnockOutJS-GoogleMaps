var Yelp = function(yelpResults){
    this.yelpResults = yelpResults;
};

Yelp.prototype.getResults = function(place, marker){
    var pos =  marker.position,
        lat = pos.H,
        lng = pos.L,
        self = this;
    // $.ajax({
    //     method: 'GET',
    //     url: 'http://api.yelp.com/v2/search/',
    //     data: {
    //         oauth_consumer_key: KEYS['CONSUMER_KEY_YELP'],
    //         oauth_token: KEYS['OAUTH_TOKEN_YELP'],
    //         ll: lat+','+lng
    //     },
    // })
    // .done(function(data) {
    //     self.yelpResults([]);
    //     console.log(data);
    //     // var results = data.data;
    //     // for(var i in results){
    //     //     var result = results[i];
    //     //     if(result.type === 'image'){
    //     //         var formattedResult = {
    //     //             caption: result.caption ? result.caption.text.slice(0,100)+' ...' : place,
    //     //             image: result.images.thumbnail.url,
    //     //             link: result.link
    //     //         };
    //     //         self.yelpResults.push(formattedResult);
    //     //     }
    //     // }
    // })
    // .fail(function(){
    //     self.yelpResults([]);
    //     alert('There was an error trying to get pictures from yelp');
    // });
};
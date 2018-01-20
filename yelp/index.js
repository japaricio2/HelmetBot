var request = require('request');
var yelpFusion = require('yelp-fusion');
var keys = require('../config').yelp;
var client = yelpFusion.client(keys.apiKey);


var yelp = {
  search: function(query, longitude, latitude, callback) {
    client.search({
      term: query,
      longitude: longitude,
      latitude: latitude,
      radius: 16090,
      sort_by: 'distance',
      limit: 20
    })
    .then(function(response) {
      var businesses = response.jsonBody.businesses;
      callback(businesses);
    })
    .catch(function(error) {
      console.log('------------------------- Caught Error in Yelp Promise -------------------------')
      console.log(error);
      console.log('------------------------- Caught Error in Yelp Promise -------------------------')
    });
  }

}

module.exports = yelp;
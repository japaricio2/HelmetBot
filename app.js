var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var shortid = require('shortid')

// Helpers
var telegram = require('./telegram');
var yelp = require('./yelp');

// Express App Config
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/h/', function(req, res) {
  res.render('home');
});

app.post('/h/search', function(req, res) {
  setInterval(proccessUpdate(req.body), 350);
});

app.listen(3002, function() {
  console.log('HelmetBot listening on Port 3002');
});

var proccessUpdate = function(update) {
  if(update) {
    var inlineQuery = update.inline_query;
    console.log('------------------- inlineQuery -------------------')
    console.log(inlineQuery);
    console.log('------------------- inlineQuery -------------------\n')
  
    if(inlineQuery && inlineQuery.query) {
      // handle inline query
      var query = inlineQuery.query;
      var longitude = inlineQuery.location.longitude;
      var latitude = inlineQuery.location.latitude;
      var inlineQueryId = inlineQuery.id;
      var results = [];
  
      yelp.search(query, longitude, latitude, function(businesses) {
        // ONE RESULT VENUE
        business = Array.from(businesses);
        businesses.forEach(function(business, index) {
          // business.name;
          var inlineQueryResultVenue = {
            type: 'venue',
            id: 1 + index,
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude,
            title: business.name,
            address: business.location.address1,
            thumb_url: business.image_url,
            thumb_width: 64,
            thumb_height: 64,
          }
          console.log(inlineQueryResultVenue);
          results.push(inlineQueryResultVenue);
        });
        // make request telegram answerInlineQuery endpoint
        telegram.answerInlineQuery(inlineQueryId, results);
      });
    }   
  }
 
}
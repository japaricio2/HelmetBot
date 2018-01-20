var keys = require('../config').telegram;
var request = require('request');


var telegram = {
  answerInlineQuery: function(inlineQueryId, resultsArr) {
    request.post(
      {
        url:'https://api.telegram.org/bot' + keys.token + '/answerInlineQuery',
        form: {
          'inline_query_id': inlineQueryId,
          'results': JSON.stringify(resultsArr)
        }
      },
      function(error, response, body) {
      console.log('--------------- telegram error response ---------------')
      console.log(error);
      console.log(body);
      console.log('--------------- telegram error response ---------------')
    });
  }
}

module.exports = telegram;
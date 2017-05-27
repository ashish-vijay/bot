const express = require('express');
const twit = require('twit');
const {twitterauth} = require('./config.js');

var app = express();
var twitter = new twit(twitterauth);
var port = process.env.PORT || 3000;

var retweet = function() {
  var params = {
    q: '#node.js'
  };
  twitter.get('/search/tweets', params, function(err, data) {
    if(!err){
      var tweetCount = data.statuses.length;
      for(var i = 0; i < tweetCount; i++) {
        console.log(data.statuses[i].id_str);
        var retweetId = data.statuses[i].id_str;
        twitter.post('/statuses/retweet/:id', {
          id: retweetId,
          }, function(err, response) {
              if(response) {
                console.log('Retweeted');
              }
              else if(err) {
                console.log('Can\'t retweet', err);
              }
            });
      }
    }
    else {
        console.log('Error in search', err);
    }
  });
};

retweet();
setInterval(retweet, 5000);

app.listen(port, function() {
  console.log(`Server is up on port ${port}`);
});

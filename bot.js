const express = require('express');
const twit = require('twit');
const {twitterauth} = require('./config.js');

var app = express();
var port = process.env.PORT || 3000;
var twitter = new twit(twitterauth);
var stream = twitter.stream('user');

var retweeted_id = [];

var retweet = function() {
  var params = {
    q: '#haveabook',
    resul_type: 'recent'
  };
  twitter.get('/search/tweets', params, function(err, data) {
    try{
      var tweetCount = data.statuses.length;
      for(var i = 0; i < tweetCount; i++) {
        var retweetId = data.statuses[i].id_str;
        twitter.post('/statuses/retweet/:id', {
          id: retweetId,
          }, function(err, response) {
              if(!err) {
                console.log('Retweeted');
                retweeted_id.push(data.statuses[i].id_str);
              }
              if(err) {
                console.log('Already retweeted, id : ' + retweetId);
              }
            });
      }
    }
    catch(err) {
        console.log('Error in search', err);
    }
  });
};

stream.on('follow', followed);

function followed(event) {
    console.log('Follow Event is running');
    var
      name = event.source.name,
      screenName = event.source.screen_name;
    tweetNow('@' + screenName + '\“So many books, so little time.\”');
};

function tweetNow(tweetText) {
    var tweet = {
        status: tweetText
    }
    twitter.post('statuses/update', tweet, function(err, data) {
      if(err){
        console.log("Error in Follow Tweet");
      }
      else{
        console.log("Follow Tweet Working Successfully");
      }
    });
}

retweet();
setInterval(retweet, 300000);

app.listen(port, function() {
  console.log(`Server is up on port ${port} at : ` + new Date().getTime());
});

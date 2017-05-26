var consumer_key = (process.env.consumer_key).toString();
var consumer_secret = (process.env.consumer_secret).toString();
var access_token = (process.env.access_token).toString();
var access_token_secret = (process.env.token_secret).toString();

var twitterauth = {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret
}
module.exports = {twitterauth};

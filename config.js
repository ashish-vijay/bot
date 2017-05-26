var consumer_key = process.env.consumer_key;
var consumer_secret = process.env.consumer_secret;
var access_token = process.env.access_token;
var access_token_secret = process.env.token_secret;

var twitterauth = {
  consumer_key: consumer_key.toString(),
  consumer_secret: consumer_secret.toString(),
  access_token: access_token.toString(),
  access_token_secret: access_token_secret.toString()
}
module.exports = {twitterauth};

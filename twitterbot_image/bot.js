// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

// For reading image files
var fs = require('fs');

// Start once
tweeter();

// Once every N milliseconds
// setInterval(tweeter, 60*5*1000);

// Here is the bot!
function tweeter() {
  // Read the file made by Processing
  var b64content = fs.readFileSync('images/cat.jpeg', { encoding: 'base64' })

  // Upload the media
  T.post('media/upload', { media_data: b64content }, uploaded);

  function uploaded(err, data, response) {

    // Now we can reference the media and post a tweet
    // with the media attached
    var mediaIdStr = data.media_id_string;
    var params = { status: 'this is test from yining', media_ids: [mediaIdStr] }
    // Post tweet
    T.post('statuses/update', params, tweeted);
  };

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };

}

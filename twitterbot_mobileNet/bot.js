// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node')
var mobilenet = require('@tensorflow-models/mobilenet');

// import * as mobilenet from '@tensorflow-models/mobilenet';
// const mobilenet = require('@tensorflow-models/mobilenet')
global.fetch = require('node-fetch')

// Pulling all my twitter account info from another file
var config = require('./config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

// For reading image files
var fs = require('fs');

loadModel();

// // Classify the image.
// const predictions = await model.classify(img);
// // Start once
// tweeter();

// Once every N milliseconds
// setInterval(tweeter, 60*5*1000);

async function loadModel() {
  // Load the model.
  // mobilenet.path = `https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json`
  // const model = await mobilenet.load();
  // console.log('model: ', model);

  const path = "mobilenet/model.json"
  const mn = new mobilenet.MobileNet(1, 1);
  mn.path = `file://${path}`
  await mn.load()
}

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

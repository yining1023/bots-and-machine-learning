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

const tf = require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet');
require('@tensorflow/tfjs-node')

const jpeg = require('jpeg-js');

const NUMBER_OF_CHANNELS = 3

const readImage = path => {
  const buf = fs.readFileSync(path)
  const pixels = jpeg.decode(buf, true)
  return pixels
}

const imageByteArray = (image, numChannels) => {
  const pixels = image.data
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values
}

const imageToInput = (image, numChannels) => {
  const values = imageByteArray(image, numChannels)
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, 'int32');

  return input
}

const loadModel = async() => {
  const mn = new mobilenet.MobileNet(1, 1);
  mn.path = 'file://models/mobilenet/model.json'
  await mn.load()
  return mn
}

const start = async() => {
  const image = readImage('images/cat.jpeg')
  const input = imageToInput(image, NUMBER_OF_CHANNELS)
  const mn_model = await loadModel()
  const predictions = await mn_model.classify(input)
  console.log('classification results:', predictions);
  tweeter(JSON.stringify(predictions));
}

start();

// Here is the bot!
function tweeter(predictions) {
  // Read the file made by Processing
  var b64content = fs.readFileSync('images/cat.jpeg', { encoding: 'base64' })

  // Upload the media
  T.post('media/upload', { media_data: b64content }, uploaded);

  function uploaded(err, data, response) {

    // Now we can reference the media and post a tweet
    // with the media attached
    var mediaIdStr = data.media_id_string;
    var params = { status: predictions, media_ids: [mediaIdStr] }
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

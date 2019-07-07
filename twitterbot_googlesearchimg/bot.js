// Install the following packages via npm:
// 1. npm install request
// 2. npm install images-scraper
// 3. npm install twit


// For reading image files
var fs = require('fs');

// Pulling all my twitter account info from another file
var config = require('./config.js');
var request = require("request");

// Pull in the animal data
var animals = require('./animals.json');

// Making a Twit object for connection to the API
var Twit = require('twit');
var T = new Twit(config);

// use Google image-scraper
var Scraper = require ('images-scraper')
var bing = new Scraper.Bing();

let searchTerm = 'panda';
let fileName;


const getImage = async () => {

  bing.list({
    keyword: searchTerm,
    num: 1,
    detail: true
  })
  .then(function (data) {
    
    let imgSrc = data[0].url;
    console.log(imgSrc);
  
    downloadImage(imgSrc, searchTerm, function(){
    console.log('Image downloaded');
    tweeter(fileName);
  });
  
  }).catch(function(err) {
    console.log('err',err);
  })
  
  
  var downloadImage = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      let imgType = res.headers['content-type'].split("/")[1];
      fileName = filename + "." + imgType;
      request(uri).pipe(fs.createWriteStream(fileName)).on('close', callback);

      return fileName;      
    });
  };

}

getImage();

// Here is the bot!
function tweeter(image) {

  // Read the file made by Processing
  var b64content = fs.readFileSync(image, { encoding: 'base64' })


  // Upload the media
  T.post('media/upload', { media_data: b64content }, uploaded);
  function uploaded(err, data, response) {
    // Now we can reference the media and post a tweet
    // with the media attached
    var mediaIdStr = data.media_id_string;
    var params = { status: searchTerm, media_ids: [mediaIdStr] }
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

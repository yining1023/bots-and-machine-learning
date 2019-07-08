let myMobileNet;
let myVideo;
let myDiv;

function preload() {
  myMobileNet = ml5.imageClassifier('MobileNet');
  myVideo = createCapture(VIDEO);
}

function setup() {
  myMobileNet.classify(myVideo, gotResults);
  myDiv = createDiv('...');
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    myDiv.html(`Label: ${results[0].label}, Confidence: ${results[0].confidence}`);
    setTimeout(() => myMobileNet.classify(myVideo, gotResults), 1000);
  }
}

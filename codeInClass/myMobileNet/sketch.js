let myMobileNet;
let myImg;

function preload() {
  myMobileNet = ml5.imageClassifier('MobileNet');
  myImg = loadImage('./myanimal.png');
}

function setup() {
  myMobileNet.classify(myImg, gotResults);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    createDiv(`${results[0].label} ${results[0].confidence}`);
  }
}


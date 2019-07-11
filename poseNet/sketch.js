let video;
let myPoseNet;
let noseX, noseY;

function setup() {
  video = createCapture(VIDEO);
  video.hide();
  createCanvas(600, 400);
  myPoseNet = ml5.poseNet(video, modelReady);
  fill(255, 0, 0);
  noStroke();
}

function draw() {
  image(video, 0, 0);
  ellipse(noseX, noseY, 50, 50);
}

function modelReady() {
  console.log('model ready');
  myPoseNet.on('pose', function(results) {
    // console.log(results);
    if (results && results[0] && results[0].pose && results[0].pose.nose) {
      noseX = results[0].pose.nose.x;
      noseY = results[0].pose.nose.y;
    }
  })
}

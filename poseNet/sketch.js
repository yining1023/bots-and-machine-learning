let video;
let myPoseNet;
let noseX, noseY;
let headX, headY;

function setup() {
  video = createCapture(VIDEO);
  video.hide();
  createCanvas(600, 400);
  myPoseNet = ml5.poseNet(video, modelReady);
  noStroke();
}

function draw() {
  image(video, 0, 0);
  fill(0, 0, 255);
  rect(headX - 100, headY - 25, 200, 100);
  // ellipse(noseX, noseY, 50, 50);
  // rect(noseX - 25, noseY - 25, 50, 50);
  // A design for a simple flower
  fill(255, 0, 0);
  translate(noseX, noseY);
  for (let i = 0; i < 6; i ++) {
    ellipse(0, 30, 30, 60);
    rotate(PI/3);
  }
}

function modelReady() {
  console.log('model ready');
  myPoseNet.on('pose', function(results) {
    // console.log(results);
    if (results && results[0] && results[0].pose && results[0].pose.nose) {
      noseX = results[0].pose.nose.x;
      noseY = results[0].pose.nose.y;
      headX = noseX;
      headY = noseY - 200;
    }
  })
}

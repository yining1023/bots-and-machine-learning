const url = "http://192.168.43.127:8000/query";
// const url = "http://localhost:8000/query";
let video;
let transferBTN;
let myCanvas;

function setup() {
  video = createCapture(VIDEO);
  video.hide();
  myCanvas = createCanvas(600, 400);
  transferBTN = createButton('Transfer');
  transferBTN.mousePressed(im2Txt);
}

function draw() {
  image(video, 0, 0);
}

function im2Txt() {
  if (myCanvas && myCanvas.elt) {
    const imageData = myCanvas.elt.toDataURL('image/jpeg', 1.0);
    console.log('imageData: ', imageData);
    const body = {
      image: imageData
    }
    httpPost(url, 'json', body, (output) => {
      console.log(output);
      createDiv(output.caption);
    });
  }
}

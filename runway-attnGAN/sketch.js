const url = "http://192.168.43.127:8000/query";
// const url = "http://localhost:8000/query";
let myInput;
let transferBTN;
let myImg;

function setup() {
  myInput = createInput();
  createCanvas(600, 600);
  transferBTN = createButton('Transfer');
  transferBTN.mousePressed(txt2img);
}

function draw() {
  if (myImg) image(myImg, 0, 0, 600, 600);
}

function txt2img() {
  if (myInput && myInput.value()) {
    console.log('myInput.value(): ', myInput.value())
    const body = {
      caption: myInput.value()
    }
    httpPost(url, 'json', body, (output) => {
      console.log(output);
      // createImg(output.result);
      myImg = loadImage(output.result);
    });
  }
}

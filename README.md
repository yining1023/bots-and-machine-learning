## Bots and Machine Learning

Syllabus for Bots and Machine Learning at The School of Machines, Making & Make Believe

## Get started
To run each examples, open your terminal, type in the following commands:
```
$ git clone https://github.com/yining1023/bots-and-machine-learning.git
$ cd bots-and-machine-learning
$ python -m SimpleHTTPServer     # $ python3 -m http.server (if you are using python 3)
```
Go to `localhost:8000` in your browser, you will see a directory list like this:
- bodypix/
- bodypix-parts/
- codeInClass/
- ImageClassification/
- KNNImageClassification/
- p5+arduino/
- p5+arduino+mobileNet/
- poseNet/
- README.md
- runway-attnGAN/
- runway-im2txt/
- teachableMachineImage/
- teachableMachineSound/
- twitterbot/

Click into each topic, you will see the example for each topic.

### 1. Twitter bot
Tweet text and image
[Code](./twitterbot/twitterbot_image)

### 2. Image Classifier
Presentation: [Slides](https://docs.google.com/presentation/d/1s0iT382Pl1DMGKb5xhk7_V3DlW1QQHfHs4snNoS_sIU/edit?usp=sharing)
- What’s Artificial Intelligence, Machine Learning, Deep learning?
- Supervised Learning, Unsupervised Learning, Reinforcement Learning
- Machine Learning output types: Regression, Classification, Clustering, Sequence prediction
- Existing Machine Learning use cases and creative projects
- Machine Learning tools / libraries: Tensorflow, Keras
- Introduction to ml5.js, tf.js, examples, experiments, datasets

Image Classifier with ml5.js
[Code](./ImageClassification)

### 3. Twiiter bot + MobileNet
Nodejs + tfjs-node: Twitter bot tweet the mobileNet result of an image
[Code](./twitterbot/twitterbot_mobileNet)

### 4. KNN Image Classifition
[Code](./KNNImageClassification)
- KNN Image Classifier Video
- KNN Image Classifier Video + Sound
- KNN Image Classifier Video + Square

### 5. Serial communication between arduino and p5.js
-  p5+arduino [Code](./p5+arduino)
-  p5+arduino+mobileNet [Code](./p5+arduino+mobileNet)

### 6. PoseNet, BodyPix
- PoseNet [Code](./posenet)
- BodyPix [Code](./bodypix)
- BodyPix with colorful body parts [Code](./bodypix-parts)

### 7. Teachable Machine
- Image classifier [Code](./teachableMachineImage)
- Sound classifier [Code](./teachableMachineSound)
- Poses classifier [Code](./teachableMachinePoses)

### 8. Runway
- im2txt [Code](./runway-im2txt)
- AttnGAN [Code](./runway-attnGAN)

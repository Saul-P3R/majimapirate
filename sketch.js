let bodyPose;
let video;
let poses = [];
let connections;
let img, img2, img3, img4;

function preload() {
  bodyPose = ml5.bodyPose({ flipped: true });
  img = loadImage("assets/pirate-part-1.jpg");
  img2 = loadImage("assets/pirate-part-2.jpg");
  img3 = loadImage("assets/pirate-part-3.jpg");
  img4 = loadImage("assets/pirate-part-4.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let index1 = pose.keypoints[9];   // muñeca izquierda
    let index2 = pose.keypoints[10];  // muñeca derecha
    let index3 = pose.keypoints[11];  // cadera izquierda
    let index4 = pose.keypoints[12];  // cadera derecha

    if (index1.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(index1.x, index1.y, 10);

      if (index1.x < width / 2 && index1.y < height / 2) {
        image(img, index1.x, index1.y, 200, 200);
      }
    }

    if (index2.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(index2.x, index2.y, 10);

      if (index2.x > width / 2 && index2.y < height / 2) {
        image(img4, index2.x, index2.y, 200, 200);
      }
    }

    // Parámetros para imágenes inferiores totalmente juntas
    let imgWidth = 200;
    let centerX = width / 2;

    if (index3.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(index3.x, index3.y, 10);
      // Imagen izquierda sin espacio
      image(img2, centerX - imgWidth, height - 250, imgWidth, 200);
    }

    if (index4.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(index4.x, index4.y, 10);
      // Imagen derecha sin espacio
      image(img3, centerX, height - 250, imgWidth, 200);
    }
  }
}

function mousePressed() {
  console.log(poses);
}



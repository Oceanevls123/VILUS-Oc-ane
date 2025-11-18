let imgDessin = [];
let compteur = 0;
let gomme = 0;
let imgMasque = [];
let newFeuille;
let pinceau;
let colorPicker;
let x;
let y;
let size = 50;
let brushOpacity = 150; // opacité du pinceau rotatif
let pinceauRotatif = 0;
let reset = 0;

function preload() {
  for (let i = 1; i < 16; i++) {
    imgMasque[i - 1] = loadImage('images/masque/masque (' + i + ').png');
  }
  for (let i = 1; i < 6; i++) {
    imgDessin[i - 1] = loadImage('images/brushes/brush (' + i + ').png');
  }
}

function setup() {
  console 
  background(255);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  frameRate(67);
  textSize(50);
  
  textAlign(windowHeight, windowWidth);
 text('Pour commencer appuyer sur "r"', 150, 150)
 
  // redimensionner les images
  for (let i = 0; i < imgMasque.length; i++) {
    imgMasque[i].resize(0, height/2);
  }
  for (let i = 0; i < imgDessin.length; i++) {
    imgDessin[i].resize(0, height / 2);
  }

  x = width / 2;
  y = height / 2;

  // création d'un masque
  newFeuille = createGraphics(width, height);
  initMasque();
  newFeuille.background(255) 
newFeuille.blendMode(REMOVE); 
newFeuille.imageMode(CENTER)

  // ==== création d’un color picker fonctionnel ====
  let header = select('header');
  if (!header) {
    header = createElement('div');
    header.id('header');
   
  }

  colorPicker = createColorPicker('deeppink');
  colorPicker.parent(header);
  colorPicker.style('width', '60px');
  colorPicker.style('height', '30px');
}

function draw() {
  
  // Animation légère de fond avec les brushs
  let x1 = noise(2300 + frameCount * 0.234) * width;
  let y1 = noise(2 + frameCount * 0.134) * height;
  tint(40, 105, 191, 45);
  image(imgDessin[1], x1, y1, 0, 70);

  let x2 = noise(2977 + frameCount * 0.02) * width;
  let y2 = noise(2 + frameCount * 0.65) * height;
  tint(140, 29, 86, 40);
  image(imgDessin[2], x2, y2);

  let x3 = noise(34 + frameCount * 0.1) * width;
  let y3 = noise(2 + frameCount * 0.4563) * height;
  tint(222, 117, 75, 12);
  image(imgDessin[4], x3, y3);

  noFill();
  noTint();

  // afficher le masque
  image(newFeuille, width / 2, height / 2);

  // pinceau rotatif autour de la souris
  push();
  translate(mouseX, mouseY);
  rotate(frameCount);
  tint(214, 96, 69, brushOpacity);
  image(imgDessin[pinceauRotatif], 0, 0, size, size);
  pop();

  reset++;
  if (reset > 300) {
    initMasque();
  }
}

// === dessin manuel ===
function mouseDragged() {
  tint(colorPicker.color());
  image(imgDessin[compteur], mouseX, mouseY, size, size);
}

// === changement de pinceau ===
function mousePressed() {
  compteur += 1;
  if (compteur > imgDessin.length - 1) {
    compteur = 0;
  }
}

// === gestion des touches ===
function keyPressed() {
  console.log(key);

  if (key == "ArrowUp") {
    size += 12;
  }

  if (key == "ArrowDown") {
    size -= 12;
    if (size < 10) size = 10;
  }

  if (key == "ArrowRight") {
    brushOpacity += 15;
    if (brushOpacity > 255) brushOpacity = 255;
  }

  if (key == "ArrowLeft") {
    brushOpacity -= 15;
    if (brushOpacity < 0) brushOpacity = 0;
  }

  if (key == "p" || key == "P") {
    pinceauRotatif++;
    if (pinceauRotatif >= imgDessin.length) pinceauRotatif = 0;
  }

  if (key == "g" || key == "G") {
    if (gomme == 1) {
      gomme = 0;
      blendMode(BLEND);
    } else {
      gomme = 1;
      blendMode(REMOVE);
    }
  }

  if (key == "r" || key == "R") {
    initMasque();
  }
}

// === fonction reset du masque ===
function initMasque() {
  newFeuille.blendMode(BLEND);
  newFeuille.background(255);
  newFeuille.blendMode(REMOVE);
  newFeuille.imageMode(CENTER);
  newFeuille.image(random(imgMasque), width / 2, height / 2);
  reset = 0;
}

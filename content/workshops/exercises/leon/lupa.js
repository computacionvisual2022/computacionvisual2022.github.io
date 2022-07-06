let lupaShader;
let img;


function preload() {
  lupaShader = readShader('/workshops/exercises/leon/lupa.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/workshops/exercises/leon/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lupaShader);
  emitResolution(lupaShader);
  emitMousePosition(lupaShader);
  lupaShader.setUniform('texture', img);

}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
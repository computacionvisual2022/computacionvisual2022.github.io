let lumaShader;
let img;
let grey_scale;
let hSv;
let hSl;
let aver;

function preload() {
  lumaShader = readShader('/workshops/exercises/leon/luma.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/workshops/exercises/leon/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
  lumaShader.setUniform('texture', img);

  hsv = createCheckbox('hsv', false);
  hsv.position(110, 10);
  hsv.style('color', 'white');
  hsv.input(() => lumaShader.setUniform('hSv', hsv.checked()));
  lumaShader.setUniform('texture', img);

  hsl = createCheckbox('hsl', false);
  hsl.position(210, 10);
  hsl.style('color', 'white');
  hsl.input(() => lumaShader.setUniform('hSl', hsl.checked()));
  lumaShader.setUniform('texture', img);

  av = createCheckbox('average', false);
  av.position(310, 10);
  av.style('color', 'white');
  av.input(() => lumaShader.setUniform('aver', av.checked()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
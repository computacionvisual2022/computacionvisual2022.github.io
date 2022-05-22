const ROWS = 20;
const COLS = 20;
const LENGTH = 20;
let quadrille;
let row0, col0, row1, col1, row2, col2;
let v0color, v1color, v2color;

function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  quadrille = createQuadrille(20, 20);
  v0color = createColorPicker(color('red'));
  v1color = createColorPicker(color('green'));
  v2color = createColorPicker(color('blue'));
  v0color.position(10, 10);
  v1color.position(80, 10);
  v2color.position(150, 10);
  v0color.input(() => { quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, v0color.color(), v1color.color(), v2color.color()) });
  v1color.input(() => { quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, v0color.color(), v1color.color(), v2color.color()) });
  v2color.input(() => { quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, v0color.color(), v1color.color(), v2color.color()) });
  randomize();
}

function draw() {
  background('#060621');
  drawQuadrille(quadrille, { cellLength: LENGTH, outlineWeight: 1, outline: 'green', board: true });
  tri();
}

function tri() {
  push();
  stroke('cyan');
  strokeWeight(3);
  noFill();
  triangle(col0 * LENGTH + LENGTH / 2, row0 * LENGTH + LENGTH / 2, col1 * LENGTH + LENGTH / 2, row1 * LENGTH + LENGTH / 2, col2 * LENGTH + LENGTH / 2, row2 * LENGTH + LENGTH / 2);
  pop();
}

function keyPressed() {
  randomize();
}

function randomize() {
  row0 = int(random(0, ROWS));
  col0 = int(random(0, COLS));
  row1 = int(random(0, ROWS));
  col1 = int(random(0, COLS));
  row2 = int(random(0, ROWS));
  col2 = int(random(0, COLS));
  quadrille.clear();
  quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, v0color.color(), v1color.color(), v2color.color());
}
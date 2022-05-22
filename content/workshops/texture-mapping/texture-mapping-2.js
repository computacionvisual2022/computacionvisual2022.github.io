let texture1;
function preload() {
   texture1 = loadImage('/workshops/texture-mapping/textures/dirt.png');
}

function setup() {
   createCanvas(100, 100, WEBGL);
   textureWrap(MIRROR);
}

function draw() {
   background(0);

   let dX = mouseX;
   let dY = mouseY;

   let u = lerp(1.0, 2.0, dX);
   let v = lerp(1.0, 2.0, dY);

   scale(width / 2);

   texture(texture1);

   beginShape(TRIANGLES);
   vertex(-1, -1, 0, 0, 0);
   vertex(1, -1, 0, u, 0);
   vertex(1, 1, 0, u, v);

   vertex(1, 1, 0, u, v);
   vertex(-1, 1, 0, 0, v);
   vertex(-1, -1, 0, 0, 0);
   endShape();
}
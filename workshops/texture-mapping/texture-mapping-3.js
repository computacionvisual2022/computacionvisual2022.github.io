let textureImage, textureImage1, textureImage2, textureImage3, textureImage4;
let textureCanvas, triangleCanvas;

let triangleEdge = {
   p1: { x: 0, y: 0 },
   p2: { x: 0, y: 0 },
   p3: { x: 0, y: 0 }
};

function preload() {
   textureImage1 = loadImage('/workshops/texture-mapping/textures/dirt.png');
   textureImage2 = loadImage('/workshops/texture-mapping/textures/grass.png');
   textureImage3 = loadImage('/workshops/texture-mapping/textures/pavement.png');
   textureImage4 = loadImage('/workshops/texture-mapping/textures/sand.png');
   textureImage = textureImage1;
};

function setup() {
   textureIndicator = createDiv('Textura:');
   textureIndicator.position(15, 485);

   textureSelect = createSelect();
   textureSelect.position(70, 485);
   textureSelect.option('Tierra');
   textureSelect.option('Hierba');
   textureSelect.option('Adoquinado');
   textureSelect.option('Arena');

   createCanvas(500, 500);
   pixelDensity(1);

   triangleCanvas = createGraphics(512, 512);
   triangleCanvas.pixelDensity(1);

   textureCanvas = createGraphics(512, 512);
   textureCanvas.pixelDensity(1);

   randomize();
}

function draw() {
   clear();
   triangleCanvas.clear();

   switch (textureSelect.value()) {
      case 'Hierba': textureImage = textureImage2; break;
      case 'Adoquinado': textureImage = textureImage3; break;
      case 'Arena': textureImage = textureImage4; break;
      default: textureImage = textureImage1; break;
   }

   textureCanvas.image(textureImage, 0, 0, 512, 512);

   triangleCanvas = mappingTextureTriangle(
      textureCanvas, triangleCanvas,
      triangleEdge.p1, triangleEdge.p2, triangleEdge.p3
   );

   triangle(
      triangleEdge.p1.x, triangleEdge.p1.y,
      triangleEdge.p2.x, triangleEdge.p2.y,
      triangleEdge.p3.x, triangleEdge.p3.y
   );

   image(triangleCanvas, 0, 0);
}

function mappingTextureTriangle(textureCanvas, triangleCanvas, p1, p2, p3) {
   let bbox = {
      top: { x: Math.min(p1.x, p2.x, p3.x), y: Math.min(p1.y, p2.y, p3.y) },
      right: { x: Math.max(p1.x, p2.x, p3.x), y: Math.max(p1.y, p2.y, p3.y) }
   };

   textureCanvas.loadPixels();
   triangleCanvas.loadPixels();

   let x, y;
   for (y = bbox.top.y; y <= bbox.right.y; y++) {
      for (x = bbox.top.x; x <= bbox.right.x; x++) {
         let alpha = f_ab(x, y, p2, p3) / f_ab(p1.x, p1.y, p2, p3);
         let theta = f_ab(x, y, p3, p1) / f_ab(p2.x, p2.y, p3, p1);
         let gamma = f_ab(x, y, p1, p2) / f_ab(p3.x, p3.y, p1, p2);

         if (alpha >= 0 && alpha <= 1 && theta >= 0 && theta <= 1 && gamma >= 0 && gamma <= 1) {
            let k = (x + y * textureCanvas.width) * 4;
            let red = textureCanvas.pixels[k];
            let green = textureCanvas.pixels[k + 1];
            let blue = textureCanvas.pixels[k + 2];

            triangleCanvas.set(x, y, color(red, green, blue));
         }
      }
   }

   textureCanvas.updatePixels();
   triangleCanvas.updatePixels();
   return triangleCanvas;
}

function f_ab(x, y, pa, pb) {
   return (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
}

function keyPressed() {
   randomize();
}

function randomize() {
   triangleEdge.p1.x = int(random(0, textureCanvas.width));
   triangleEdge.p1.y = int(random(0, textureCanvas.height));
   triangleEdge.p2.x = int(random(0, textureCanvas.width));
   triangleEdge.p2.y = int(random(0, textureCanvas.height));
   triangleEdge.p3.x = int(random(0, textureCanvas.width));
   triangleEdge.p3.y = int(random(0, textureCanvas.height));
}
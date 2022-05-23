let texture1, texture2, texture3, texture4, textureSelect, textureWrapSelect;
let sliderX, sliderY;
let textureWrapValues, textureWrapOptions = ['CLAMP', 'MIRROR', 'REPEAT'];

function preload() {
   texture1 = loadImage('/workshops/texture-mapping/textures/dirt.png');
   texture2 = loadImage('/workshops/texture-mapping/textures/grass.png');
   texture3 = loadImage('/workshops/texture-mapping/textures/pavement.png');
   texture4 = loadImage('/workshops/texture-mapping/textures/sand.png');
}

function setup() {
   textureWrapValues = [CLAMP, MIRROR, REPEAT];

   sliderXIndicator = createDiv('Eje X');
   sliderXIndicator.position(15, 10);

   sliderYIndicator = createDiv('Eje Y');
   sliderYIndicator.position(15, 35);

   sliderX = createSlider(0, 4096, 512);
   sliderX.position(60, 10);
   sliderX.style('width', '430px');

   sliderY = createSlider(0, 4096, 512);
   sliderY.position(60, 35);
   sliderY.style('width', '430px');

   textureIndicator = createDiv('Textura:');
   textureIndicator.position(15, 465);

   textureSelect = createSelect();
   textureSelect.position(70, 465);
   textureSelect.option('Tierra');
   textureSelect.option('Hierba');
   textureSelect.option('Adoquinado');
   textureSelect.option('Arena');

   textureWrapXIndicator = createDiv('Modo de ajuste X:');
   textureWrapXIndicator.position(15, 485);
   textureWrapXSelect = createSelect();
   textureWrapXSelect.position(140, 485);
   textureWrapXSelect.option('CLAMP');
   textureWrapXSelect.option('REPEAT');
   textureWrapXSelect.option('MIRROR');

   textureWrapYIndicator = createDiv('Modo de ajuste Y:');
   textureWrapYIndicator.position(230, 485);
   textureWrapYSelect = createSelect();
   textureWrapYSelect.position(350, 485);
   textureWrapYSelect.option('CLAMP');
   textureWrapYSelect.option('REPEAT');
   textureWrapYSelect.option('MIRROR');

   createCanvas(500, 500, WEBGL);
}

function draw() {
   background(210, 210, 207);
   loadTextureWrap();

   let u = lerp(1.0, 2.0, sliderX.value());
   let v = lerp(1.0, 2.0, sliderY.value());

   scale(width / 2);
   loadTexture();

   beginShape(TRIANGLES);
   vertex(-0.9, -0.2, 0, 0, 0);
   vertex(0.5, -0.5, 0, u, 0);
   vertex(0.8, 0.8, 0, u, v);

   endShape();
}

function loadTexture() {
   switch (textureSelect.value()) {
      case 'Hierba': texture(texture2); break;
      case 'Adoquinado': texture(texture3); break;
      case 'Arena': texture(texture4); break;
      default: texture(texture1); break;
   }
}

function loadTextureWrap() {
   let isBreak = false;

   for (let i = 0; i < textureWrapOptions.length; i++) {
      for (let j = 0; j < textureWrapOptions.length; j++) {
         if (textureWrapXSelect.value() == textureWrapOptions[i] &&
            textureWrapYSelect.value() == textureWrapOptions[j]) {
            textureWrap(textureWrapValues[i], textureWrapValues[j]);
            isBreak = true;
            break;
         }

         if (isBreak) { break; }
      }
   }
}
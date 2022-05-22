let texture1, texture2, texture3, texture4;

function preload() {
   texture1 = loadImage('/workshops/texture-mapping/textures/dirt.png');
   texture2 = loadImage('/workshops/texture-mapping/textures/grass.png');
   texture3 = loadImage('/workshops/texture-mapping/textures/pavement.png');
   texture4 = loadImage('/workshops/texture-mapping/textures/sand.png');
}

function setup() {
   primitive3dStroke = createCheckbox('stroke', false);
   primitive3dStroke.position(10, 35);

   primitive3dSelect = createSelect();
   primitive3dSelect.position(10, 10);
   primitive3dSelect.option('Cubo');
   primitive3dSelect.option('Esfera');
   primitive3dSelect.option('Elipse');
   primitive3dSelect.option('Cilindro');
   primitive3dSelect.option('Cono');
   primitive3dSelect.option('Toroide');

   createCanvas(500, 500, WEBGL);
   pg1 = createGraphics(250, 250, WEBGL);
   pg2 = createGraphics(250, 250, WEBGL);
   pg3 = createGraphics(250, 250, WEBGL);
   pg4 = createGraphics(250, 250, WEBGL);
}

function draw() {
   background(255);
   noStroke();
  
   push();
      drawTexture(pg1, primitive3dSelect.value(), texture1, 255);
      drawTexture(pg2, primitive3dSelect.value(), texture2, 255);
      drawTexture(pg3, primitive3dSelect.value(), texture3, 255);
      drawTexture(pg4, primitive3dSelect.value(), texture4, 255);

      image(pg1, -250, -250, 250, 250);
      image(pg2, 0, -250, 250, 250);
      image(pg3, -250, 0, 250, 250);
      image(pg4, 0, 0, 250, 250);
   pop();
}

function drawTexture(pg, primitive3d, texture, backgroundColor, rateSize) {
   pg.push();
      pg.clear();

      if(!primitive3dStroke.checked()) { pg.noStroke(); }      
      pg.background(backgroundColor);
      pg.rotateZ(frameCount * 0.01);
      pg.rotateX(frameCount * 0.01);
      pg.rotateY(frameCount * 0.01);
      pg.texture(texture);

      if(primitive3d == 'Cubo') { pg.box(width / 4.5); }
      else if(primitive3d == 'Esfera') { pg.sphere(width / 6); }
      else if(primitive3d == 'Elipse') { pg.ellipsoid(width / 10, width / 6, width / 6); }
      else if(primitive3d == 'Cilindro') { pg.cylinder(width / 10, width / 4); }
      else if(primitive3d == 'Cono') { pg.cone(width / 6, width / 4); }
      else if(primitive3d == 'Toroide') { pg.torus(width / 7, width / 15); }
      else { pg.sphere(width / rateSize); }
   pg.pop();
}
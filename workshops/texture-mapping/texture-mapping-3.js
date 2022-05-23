new p5((p)=> {
const ROWS = 25;
const COLS = 25;
const LENGTH = 20;
const TLENGTH = 512;
let quadrille, basetriangle;
let row0, col0, row1, col1, row2, col2;

let strip = 1;
let texture;

p.preload = () =>{
  texture = p.loadImage('/workshops/texture-mapping/textures/grass.png');
};

p.setup = () => {
  
  p.createCanvas(500, 500);
  p.pixelDensity(1);
  p.randomize();
};

p.draw = () => {
 
  basetriangle = p.createGraphics(p.width, p.height);
  basetriangle.pixelDensity(1);
  p.background('255');

  /*p.image(texture, 0, 0, p.width, p.height);
  p.loadPixels();

  /*
  for (let y = 0; y < p.height; y++){
    for(let x = i * strip; x < p.width; x += strip){
       if(let k = (x + y * p.width) * 4;
       let red = p.pixels[k];
       let green = p.pixels[k + 1];
       let blue = p.pixels[k + 2];

       for(let j = 0; j < strip; j++){
          for(let alpha = 0; alpha <= 1; alpha += 0.1){
            for(let beta = 0; beta <= 1; beta += 0.1){
              for(let gamma = 0; gamma <= 1; gamma += 0.1){
                if((x = (alpha*row0 + beta*row1 + gamma*row2)) and (y = (alpha*col0 + beta*col1 + gamma*col2)) and ((alpha + beta + gamma) = 1 ))
                basetriangle.set(x + j, y, p.color(red, green, blue));
              }
            }
          }
       } 
     }    
  }

  p.updatePixels();
  basetriangle.updatePixels();*/
};

p.keyPressed = () => {
  p.randomize();
};

p.randomize = () => {
  row0 = p.int(p.random(0, texture.width));
  col0 = p.int(p.random(0, texture.height));
  row1 = p.int(p.random(0, texture.width));
  col1 = p.int(p.random(0, texture.height));
  row2 = p.int(p.random(0, texture.width));
  col2 = p.int(p.random(0, texture.height));
  p.triangle(row0, col0, row1, col1, row2, col2);
};
}, "texture-mapping-3");
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
  basetriangle = p.createGraphics(512, 512 );
  basetriangle.pixelDensity(1);
  texture = p.createGraphics(512,512);
  texture.pixelDensity(1);
};

p.draw = () => {
  
  basetriangle.clear();
  p.background('255');
  basetriangle.loadPixels();
  texture.loadPixels();

  
  for (let y = 0; y < texture.height; y++){
    for(let x = 0; x < texture.width; x ++){
       let k = (x + y * texture.width) * 4;
       let red = texture.pixels[k];
       let green = texture.pixels[k + 1];
       let blue = texture.pixels[k + 2];

       
          for(let alpha = 0; alpha <= 1; alpha += 0.1){
            for(let beta = 0; beta <= 1; beta += 0.1){
              for(let gamma = 0; gamma <= 1; gamma += 0.1){
                
                if((x == (alpha*row0 + beta*row1 + gamma*row2)) && (y == (alpha*col0 + beta*col1 + gamma*col2)) && ((alpha + beta + gamma) == 1 ))
                basetriangle.set(x, y, p.color(red, green, blue));
                
              }
            }
          }
      
     }    
  }

  texture.updatePixels();
  basetriangle.updatePixels();
  p.image(basetriangle,0,0,512,512);
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
  //p.triangle(row0, col0, row1, col1, row2, col2);
};
}, "texture-mapping-3");
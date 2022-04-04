new p5((p) => {
   let frames = [], nFrames = 8, strip = 2;
   let baseImage, barMask, x1 = -400, isMoving = true;

   p.preload = () => {
      for (let i = 0; i < nFrames; i++)
         frames.push(p.loadImage(`/workshops/barrier-grid/frame${i}.jpg`));
   }

   p.setup = () => {
      p.createCanvas(400, 225);
      p.pixelDensity(1);

      // Create Base Image
      baseImage = p.createGraphics(400, 225);
      baseImage.pixelDensity(1);

      for (let i = 0; i < nFrames; i++) {
         frames[i].loadPixels();

         for (let y = 0; y <= frames[0].height; y++) {
            for (let x = i * strip; x <= frames[0].width; x += 16) {
               baseImage.set(x, y, frames[i].get(x, y));
               baseImage.set(x + 1, y, frames[i].get(x + 1, y));
            }
         }
      }

      baseImage.updatePixels();

      // Create Bar Mask
      barMask = p.createGraphics(400, 225);
      barMask.pixelDensity(1);

      barMask.loadPixels();
      for (let x = 0; x < 40 * nFrames; x += 16) {
         for (let y = 0; y <= frames[0].height; y++) {
            for (let x = 0; x <= frames[0].width; x += 16) {
               for (let w = 0; w < strip * nFrames - 1; w++)
                  barMask.set(x + w, y, p.color('black'));
            }
         }
      }

      barMask.updatePixels();
   };
   
   p.draw = () => {
      p.image(baseImage, 0, 0);
      p.image(barMask, x1, 0);

      if (isMoving) {
         if (x1 > 550) { x1 = -400 }
         else { x1 = x1 + 1; }
      }
   }

   p.mousePressed = () => { isMoving = !isMoving; }

}, "barrier-grid");
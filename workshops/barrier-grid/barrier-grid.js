new p5((p) => {
   let gif, gifFrames, baseImage, barMask, strip = 1, xSpeed = 0.5, nFrames, xMove, isMoving = true;
   let input, button;

   p.preload = () => {
      gif = p.loadImage('/workshops/barrier-grid/batman_running.gif');
      gifFrames = gif;
   }

   p.setup = () => {
      p.createCanvas(730, 250);
      p.pixelDensity(1);
      p.createFileInput(handleFile);
      input = p.createInput();
      button = p.createButton('submit');
      button.mousePressed(loadFileFromUrl);
   };

   p.draw = () => {
      if (gifFrames) {
         // Create Base Image
         baseImage = p.createGraphics(p.width / 2, p.height);
         baseImage.pixelDensity(1);
         nFrames = gifFrames.numFrames();
         p.background(255);
         p.print(gifFrames.numFrames());

         for (let i = 0; i < nFrames; i++) {
            gifFrames.setFrame(i);
            p.image(gifFrames, 0, 0, p.width / 2, p.height);
            p.loadPixels();

            for (let y = 0; y < p.height; y++) {
               for (let x = i * strip; x < p.width / 2; x += strip * nFrames) {
                  let k = (x + y * p.width) * 4;
                  let red = p.pixels[k];
                  let green = p.pixels[k + 1];
                  let blue = p.pixels[k + 2];

                  for (let j = 0; j < strip; j++)
                     baseImage.set(x + j, y, p.color(red, green, blue));
               }
            }

            p.updatePixels();
         }

         baseImage.updatePixels();

         // Create Bar Mask
         barMask = p.createGraphics(p.width / 2, p.height);
         barMask.pixelDensity(1);
         barMask.loadPixels();

         for (let x = 0; x <= p.width / 2; x += strip * nFrames) {
            for (let y = 0; y <= p.height; y++) {
               for (let w = 0; w < strip * nFrames - strip; w++)
                  barMask.set(x + w, y, p.color('black'));
            }
         }

         barMask.updatePixels();
         p.background(255);
         xMove = -p.width / 2;
         gifFrames = null;
      }

      // Draw base image
      if (baseImage) {
         p.image(baseImage, 0, 0, p.width / 2, p.height);
         p.line(p.width / 2, 0, p.width / 2, p.height);
      }

      // Draw and move bar mask
      if (barMask) {
         p.image(barMask, xMove, 0);
         if (isMoving) {
            if (xMove > p.width / 2) { xMove = -p.width / 2; }
            else if (strip == 1) { xMove += strip * xSpeed; }
            else { xMove += strip * Math.ceil(xSpeed); }
         }
      }

      if (gif) { p.image(gif, p.width / 2, 0, p.width / 2, p.height) }
   }

   // Función para cargar el archivo GIF
   const handleFile = async (file) => {
      gif = null, gifFrames = null; baseImage = null; barMask = false; isMoving = true, currentFrame = 0;
      if (file.type === 'image' && file.subtype === 'gif') {
         gif = await p.loadImage(file.data);
         gifFrames = gif;
      }

      else { gifFrames = null; }
   }

   const loadFileFromUrl = async () => {
      gif = await p.loadImage(input.value());
      gifFrames = gif;
   }

   p.mousePressed = () => { isMoving = !isMoving; }

}, "barrier-grid");
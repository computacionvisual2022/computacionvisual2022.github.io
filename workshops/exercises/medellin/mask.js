let widthCanvas = 425, heightCanvas = 246, widthPhotoRoll = 140;

const coloringBrightness = (img, name) => {
   return (p) => {
      let names = ['original', 'luma', 'component average', 'hsv', 'hsl'];
      const kernels = {
         blur:
            [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16]
         ,
         emboss: [
            [-2, -1, 0, -1, 1, 1, 0, 1, 2]
         ],
         identity: [
            [0, 0, 0, 0, 1, 0, 0, 0, 0]
         ],
         leftSobel: [
            [1, 0, -1, 2, 0, -2, 1, 0, -1]
         ],
         rightSobel: [
            [-1, 0, 1, -2, 0, 2, -1, 0, 1]
         ],
         topSobel: [
            [1, 2, 1, 0, 0, 0, -1, -2, -1]
         ],
         bottomSobel: [
            [-1, -2, -1, 0, 0, 0, 1, 2, 1]
         ],
         outline1: [
            [1, 0, -1, 0, 0, 0, -1, 0, 1]
         ],
         outline2: [
            [0, -1, 0, -1, 4, -1, 0, -1, 0]
         ],
         outline3: [
            [-1, -1, -1, -1, 8, -1, -1, -1, -1]
         ],
         sharpen: [
            [0, -1, 0, -1, 5, -1, 0, -1, 0]
         ]
      }

      let code = names.findIndex((n) => n == name);
      let cbShader;
      let canvas, font, isResizing = false;

      p.preload = () => {
         cbShader = p.readShader('/workshops/exercises/medellin/coloring_brightness.frag', { varyings: Tree.texcoords2 });
         // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
         img = p.loadImage(img);
         font = p.loadFont('/workshops/exercises/medellin/Ubuntu-Regular.ttf');
      }

      p.setup = () => {
         canvas = p.createCanvas(widthCanvas, heightCanvas, p.WEBGL);
         canvas.mousePressed(p.setColoringBrightness);
         // canvas.doubleClicked(p.resizing);
         canvas.elt.style.position = 'absolute';
         canvas.elt.style.left = `${widthPhotoRoll + 16}px`;
         if (name != 'original') canvas.elt.style.top = '262px';
         p.noStroke();
         p.textureMode(p.NORMAL);
         p.shader(cbShader);
         cbShader.setUniform('coloring_brightness', code);
         cbShader.setUniform('texture', img);
         p.textFont(font);
         p.textSize(p.width / 14);
      }

      p.draw = () => {
         p.background(0);
         p.quad(-p.width / 2, -p.height / 2, p.width / 2, -p.height / 2, p.width / 2, p.height / 2, -p.width / 2, p.height / 2);
         p.text(names[code], -p.width / 2 + 10, p.height / 2 - 10);
      }

      p.resizing = () => {
         if (isResizing) {
            // canvas.elt.style.top = `8px`;
            if (name != 'original') canvas.elt.style.top = '262px';
            canvas.elt.style.left = `${widthPhotoRoll + 16}px`;
            canvas.elt.style.width = `${widthCanvas}px`;
            canvas.elt.style.height = `${heightCanvas}px`;
            canvas.elt.style.zIndex = 1;
         }

         else {
            canvas.elt.style.top = `8px`;
            canvas.elt.style.left = '8px';
            canvas.elt.style.width = `${573}px`;
            canvas.elt.style.height = `${500}px`;
            canvas.elt.style.zIndex = 5;
         }

         isResizing = !isResizing;
         p.draw();
      }

      p.setColoringBrightness = () => {
         code = ++code % 5;
         cbShader.setUniform('coloring_brightness', code);
      }

      p.setImageTexture = (imageUrl) => {
         cbShader.setUniform('texture', imageUrl);
      }
   }
}

const photoRoll = (p) => {
   let images = [], imagesUrl = [
      '/workshops/exercises/medellin/fire_breathing.jpg',
      '/workshops/exercises/medellin/sun.jpg',
      '/workshops/exercises/medellin/volcano.jpg',
      '/workshops/exercises/medellin/foundry.jpg',
      '/workshops/exercises/medellin/marge_and_homer_kissing.jpg'
   ];

   p.preload = () => {
      for (let imageUrl of imagesUrl)
         images.push(p.createImg(imageUrl, 'image'));
   }

   p.setup = () => {
      canvas = p.createCanvas(widthPhotoRoll, 500, p.WEBGL);

      let nImage = 5, posImageX = 4, posImageY = 4;
      for (let image of images) {
         image.position(posImageX, posImageY);
         posImageY += ((p.height - (nImage - 1) * 4) / 5) + 4;

         image.elt.style.width = `${widthPhotoRoll}px`;
         image.elt.style.height = `${(p.height - (nImage - 1) * 4) / nImage}px`;
         image.elt.style.borderRadius = '10px';

         image.mouseOver(() => image.elt.style.opacity = 0.85);
         image.mouseOut(() => image.elt.style.opacity = 1);
         image.mousePressed(() => { s1.setImageTexture(image), s2.setImageTexture(image) });
         image.elt.style.border = '4px solid white';
      }
   }

   p.draw = () => {
      p.background(255);
   }

   p.changeImage = () => {
      s1.setImageTexture(imagesUrl[1]);
   }
}

let s1 = new p5(coloringBrightness('/workshops/exercises/medellin/fire_breathing.jpg', 'original'), 'coloringBrightness1');
let s2 = new p5(coloringBrightness('/workshops/exercises/medellin/fire_breathing.jpg', 'luma'), 'coloringBrightness2');
new p5(photoRoll, 'photoRoll');
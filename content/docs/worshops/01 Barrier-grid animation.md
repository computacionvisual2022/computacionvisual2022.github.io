# Animación de rejilla de barrera

## Introducción 
<div style="text-align: justify">
La animación de rejilla de barrera es un efecto de animación creado al mover una superposición transparente a rayas a través de una composición de imágenes entrelazadas llamada kinegrama. Como los espacios en blanco del patrón son transparentes, a medida que la superposición se desliza a alta velocidad por el Kinegrama, se hacen visibles diferentes secciones del mismo. El cerebro relaciona esta sucesión de imágenes que aparecen juntas, creando la ilusión de movimiento fluido.[1]
</div>

## Contexto
<div style="text-align: justify">
En un paseo por la historia podemos ver toda una serie de momentos y artilugios claves relacionados a los campos de la ciencia y el arte que nos entregaron la posibilidad de dilucidar lo que es una imagen en movimiento. Empecemos por entender que es la persistencia retiniana, pues es un fenómeno que afirma que una imagen permanece en la retina una décima de segundo más después de ser vista, para luego desaparecer por completo, según este hallazgo podemos ver la realidad cómo una secuencia de imágenes ininterrumpidas, si no existiera veríamos la realidad como una sucesión de imágenes estáticas e independientes.[2]
</div>

### Taumatrópo

![Foto del Taumatrópo](/assets/taumatropo.jpg) [3]

<div style="text-align: justify">
Un primer paso podríamos decir que es el Taumátropo, un “juguete” inventado en 1824. Consistente en un disco con dos imágenes diferentes a ambos lados y un pedazo de cuerda que permitía girar el disco a una gran velocidad produciendo el efecto de unión de ambas imágenes. El anterior artefacto estaba dirigido a demostrar la persistencia retiniana, pero acabó sentando las bases para otros artefactos más complejos, cómo el Zoótropo, una máquina compuesta por un tambor circular con unas rejillas abiertas, por las cuáles el espectador podía ver el interior del mismo dónde habían dibujos en tiras que, al girar, creaban la ilusión de movimiento [4].
</div>

### Zoótropo

![Foto del Zoótropo](/assets/zootropo.jpg) [5]

### Motograph
<div>
<img src='/assets/motograph1.png' alt='Foto de motograph1' width='400' width='300'/>
</div>
<div style="text-align: justify">
El 14 de marzo de 1896 se una técnica que se usó unos dos años después para la publicación más antigua conocida que usaba una hoja de líneas para crear la ilusión de movimiento en las imágenes. El libro de imágenes en movimiento Motograph fue publicado en Londres a principios de 1898. Venía con una "transparencia" con rayas negras para agregar la ilusión de movimiento a las imágenes del libro. Una diferencia importante con nuestra ilusión objetivo se trata de que la imagen del fondo no se trataba de un kinegrama, sino de una imagen normal. [6] 
</div>
<div>
<img src='/assets/motograph2.png' alt='Foto de motograph2' width='400' width='300'/>
<img src='/assets/motograph3.png' alt='Foto de motograph3' width='400' width='300'/>
</div> 
[7]

### Los autoestereogramas de Auguste Berthier
<div style="text-align: justify">
En mayo de 1896, Auguste Berthier publicó un artículo sobre la historia de las imágenes estereoscópicas en la revista científica francesa Le Cosmos , que incluía su método para crear un autoestereograma. Las tiras alternas de la imagen izquierda y derecha de un negativo estereoscópico tradicional debían recomponerse como una imagen entrelazada, preferiblemente durante la impresión de la imagen en papel. La imagen entrelazada junto con un paralaje de barrera permitía que cada ojo viese sólo una parte de la imagen estereoscópica. [6]
</div>
<div>
<img src='/assets/Berthier.jpg' alt='Estereograma de Berthier' width='400' width='300'/>
</div>
[6]

### Los autoestereogramas animados de Eugène Estanave
<div style="text-align: justify">
Estanave solicitó la patente francesa para un dispositivo de estereofotografía y estereoscopía utilizando hojas de líneas. Incluía sus imágenes "cambiantes" que aplicaban el principio del "signo cambiante" de Ives a la fotografía animada, por ejemplo, el retrato de una mujer con los ojos abiertos o cerrados según el ángulo de visión. El 3 de febrero de 1910 solicitó una adición a su patente para incluir fotografía estereoscópica animada. Este sistema utilizaba hojas de líneas con líneas verticales y horizontales, y combinaba cuatro imágenes: dos pares estereoscópicos de dos momentos diferentes. El 1 de agosto de 1908 Estanave obtuvo la patente francesa para una placa fotográfica autoestereoscópica. Esta placa fue expuesta y revelada para crear una imagen estereoscópica positiva, evitando el problema de alinear la fotografía entrelazada con una pantalla de líneas.[6] 
<div>

### Ombro-Cinema
<div>
<img src='/assets/ombro-cinema.jpg' alt='ombro-cinema' width='400' width='300'/>
</div>

<div style="text-align: justify">
Los juguetes de Ombro-Cinéma funcionaban con rollos de papel giratorios con secuencias de imágenes impresas como animaciones entrelazadas de dos fotogramas: delgadas franjas verticales espaciadas regularmente de un fotograma de la animación se alternaban con franjas del siguiente fotograma, alternativamente ocultas por negro espaciado regular. rayas verticales en un panel de visualización transparente. En algunas versiones, las rayas en el panel de visualización se disfrazaron como una cerca de estacas. Los juguetes de Ombro-Cinema tenían un chasis de madera o cartón con un bastidor y una manivela para desplazar la imagen por el panel de visualización. [6]
<div>

<div style="text-align: justify">
Aparecerían más elementos y artefactos con mecanismos similares, tras de todos estos veríamos al mundo asombrarse ante el Kinetoscopio, que con el paso de frames o imagénes fijas a alta velocidad logran el efecto de movimiento. Con la aparición de Collin Ord y su Magic Moving Images o kinegramas que se componen de dos elementos, el primero son los dibujos, fotogramas o patrones de gráficos llamados a adquirir el movimiento, el segundo es una pantalla transparente de plástico con franjas y rayas que hacen la función de lentes que en movimiento se logra el efecto buscado.
</div>

## Resultados
{{< details title="p5-instance-div markdown" open=false >}}
```js
{{</* p5-instance-div id="lilac-chaser" >}}
   new p5((p) => {
   let gif, gifFrames, baseImage, barMask, strip = 1, xSpeed = 0.5, nFrames, xMove, isMoving = true;

   p.preload = () => {
      gif = p.loadImage('/workshops/barrier-grid/batman_running.gif');
      gifFrames = gif;
   }

   p.setup = () => {
      p.createCanvas(730, 250);
      p.pixelDensity(1);     
   };

   p.draw = async() => {
      if (gifFrames) {
         // Create Base Image
         baseImage = p.createGraphics(p.width / 2, p.height);
         baseImage.pixelDensity(1);
         nFrames = gifFrames.numFrames();
         p.background(255);

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

   p.mousePressed = () => { isMoving = !isMoving; }
}, "barrier-grid");
{{</p5-instance-div */>}}
```
{{< /details >}}

{{< p5-div sketch="/workshops/barrier-grid/barrier-grid.js" >}}

## Conclusiones y trabajos futuros
<div style="text-align: justify">
A medida en que ahondamos en la creación de kinegramas podemos evidenciar ciertos aspectos que permiten mejorar la ilusión óptica, principalmente el uso del fondo en color blanco permite al espectador mantener un frame en su retina mientras se le presenta el siguiente, al usar colores distintos la percepción de la ilusión pierde un poco el efecto que se quiere lograr.  
El uso en una cantidad elevada de frames por kinegrama hace que las barras de la rejilla sean más gruesas y por lo tanto no se percibe de la manera correcta la imagen a la que se quiere dar movimiento.
En el futuro tenemos proyectado realizar e implementar kinegramas con diferentes patrones en la rejilla, cómo circulos en la parte visible y los frames plasmados en el mismo tipo de patrón para crear mayores efectos de movimiento y buscando lograr una mayor precisión.
</div>

## Bibliografía
[1]
[Sarcone](https://www.giannisarcone.com/Kinegrams.html) 

[2]
[Persistence](https://es.wikipedia.org/wiki/Persistencia_de_la_visi%C3%B3n)

[3]
[Taumatrópo](https://museovirtual.filmoteca.unam.mx/temas-cine/juguetes-opticos/taumatropo/)

[4]
[Lenticular](https://www.3dlenticularfactory.com/es/blog-post/De-las-sombras-chinescas-a-los-kinegramas-un-paseo-por-la-historia-del-lenticular)

[5]
[Zoótropo](https://en.wikipedia.org/wiki/Zoetrope)  

[6]
[Wikipedia](https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography#Kinegram)

[7]
[Mothograph_Video]  (https://youtu.be/ZIJSdiwWwgo)  

  

[#]
[Enlace](https://computacionvisual2022.github.io/docs/worshops/01-Barrier-grid-animation/)  
{{< p5-iframe sketch="/workshops/exercises/medellin/coloring_brightness.js"
   lib1="/workshops/exercises/medellin/p5.treegl.js"
   width="593" height="524"
>}}

{{< p5-iframe sketch="/workshops/exercises/medellin/test.js"
   width="593" height="524"
>}}

new p5((p) => {
   p.setup = () => {
      p.createCanvas(200, 200);
   }

   p.draw = () => {
      p.background(0);
      p.quad(-p.width / 2, -p.height / 2, p.width / 2, -p.height / 2, p.width / 2, p.height / 2, -p.width / 2, p.height / 2);
   }
}, 's1');


new p5((p) => {
   p.setup = () => {
      p.createCanvas(200, 200);
   }

   p.draw = () => {
      p.background(0);
      p.quad(-p.width / 2, -p.height / 2, p.width / 2, -p.height / 2, p.width / 2, p.height / 2, -p.width / 2, p.height / 2);
   }
}, 's2');

// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.
// Brush controls
let color;
let thick;
let depth;
let thickIndicator;
let brushSelect;
let alphaActivated;
let easycam;
let state;
let depthIndicator;
let escorzo;
let points;
let record;

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function setup() {
   const canvas = createCanvas(600, 450, WEBGL);
   // easycam stuff
   let state = {
      distance: 250,           // scalar
      center: [0, 0, 0],       // vector
      rotation: [0, 0, 0, 1],  // quaternion
   };

   alphaActivated = createCheckbox('alpha', false);
   alphaActivated.position(30, 70)
   brushSelect = createSelect();
   brushSelect.position(30, 40);
   brushSelect.option('Esférica');
   brushSelect.option('Cúbica');
   brushSelect.option('Toroidal');
   brushSelect.option('Cilíndrica');
   brushSelect.option('Cónica');
   easycam = createEasyCam();
   easycam.state_reset = state;   // state to use on reset (double-click/tap)
   easycam.setState(state, 2000); // now animate to that state
   escorzo = true;
   perspective();
   // brush stuff
   points = [];
   depth = createSlider(0, 1, 0.05, 0.05);
   depth.position(10, 10);
   depth.style('width', '580px');
   color = createColorPicker('#ed225d');
   color.position(width - 70, 40);
   thick = 1;
   thickIndicator = createDiv('Grosor: ' + thick);
   thickIndicator.position(30, 90);
   depthIndicator = createDiv('Profundidad: ' + depth.value());
   depthIndicator.position(30, 110);
}

let axesPrevious, axesInitial = [0, 0, 0, 0, 0, 0];
let sensibilityRotation = 0.1;
let sensibilityZoom = 1;

const spaceNavigator = async () => {
   let gp = navigator.getGamepads()[0];

   if (gp != null) {
      if (!equals(axesPrevious, gp.axes)) {
         axesPrevious = gp.axes;
         easycam.rotateX(gp.axes[3] * sensibilityRotation);
         easycam.rotateY(gp.axes[4] * sensibilityRotation);
         easycam.rotateZ(gp.axes[5] * sensibilityRotation);
      }
      if (gp.buttons[0].value > 0 || gp.buttons[0].pressed == true) {
         // console.log('Left button');
         if (thick > 0) { thick -= 0.1; }
      }

      else if (gp.buttons[1].value > 0 || gp.buttons[1].pressed == true) {
         // console.log('Right button');
         thick += 0.1;
      }
   }
}
function draw() {
   spaceNavigator();
   update();
   background(120);
   push();
   strokeWeight(0.8);
   stroke('magenta');
   grid({ dotted: false });
   pop();
   axes();

   depthIndicator.html('Profundidad: ' + depth.value(), false);
   thickIndicator.html('Grosor: ' + thick, false);

   for (const point of points) {
      push();
      translate(point.worldPosition);
      brush(point);
      pop();
   }
}

function update() {
   let dx = abs(mouseX - pmouseX);
   let dy = abs(mouseY - pmouseY);
   speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
   if (record) {
      points.push({
         worldPosition: treeLocation([mouseX, mouseY, depth.value()], { from: 'SCREEN', to: 'WORLD' }),
         color: color.color(),
         thick: thick,
         brush: brushSelect.value(),
         speed: speed,
         alpha: alphaActivated.checked()
      });
   }
}

function brush(point) {
   push();
   noStroke();
   let fillColor = point.color;
   // alpha channel according to gesture speed
   if (point.alpha) { fillColor.setAlpha(127 * (1 + point.speed)); }
   fill(fillColor);
   if (point.brush === 'Esférica') { sphere(point.thick) }
   else if (point.brush === 'Cúbica') { box(point.thick); }
   else if (point.brush === 'Toroidal') { torus(point.thick, point.thick / 4); }
   else if (point.brush === 'Cilíndrica') { cylinder(point.thick); }
   else if (point.brush === 'Cónica') { cone(point.thick); }
   pop();
}

function keyPressed() {
   if (key === 'r' || key === 'R') {
      record = !record;
   }

   else if (key === 'p' || key === 'P') {
      escorzo = !escorzo;
      escorzo ? perspective() : ortho();
   }

   else if (key == 'c' || key === 'C') {
      points = [];
   }

   else if (keyCode == ESCAPE) {
      record = false;
   }

   else if (keyCode == LEFT_ARROW) {
      if (thick > 0) {
         let aux = Number(thick) - 0.1;
         thick = aux.toFixed(1);
      }
   }

   else if (keyCode == RIGHT_ARROW) {
      let aux = Number(thick) + 0.1;
      thick = aux.toFixed(1);
   }
}

function mouseWheel(event) {
   //comment to enable page scrolling
   return false;
}
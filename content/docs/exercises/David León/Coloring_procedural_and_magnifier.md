# Image processing

exercise 1

include the blue channel in the uv visualization.

{{< p5-iframe sketch="/workshops/exercises/leon/uv.js"
   lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
   width="323" height="323"
>}}
 [4]
 
{{< details title="uv.js" open=false >}}
```js
{{</* p5-instance-div id="lilac-chaser" >}}
let uvShader;

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/workshops/exercises/leon/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  noStroke();
  // see: https://p5js.org/reference/#/p5/shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}

function draw() {
  background(0);
  // clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  // https://p5js.org/reference/#/p5/quad
  // It's worth noting (not mentioned in the api docs) that the quad
  // command also adds the texture coordinates to each of its vertices.
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
{{</p5-instance-div*/>}}
```
{{< /details >}}

{{< details title="uv.frag" open=false >}}
```js
{{</* p5-instance-div id="lilac-chaser" >}}
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2, 1.0 , 0.0);
}
{{</p5-instance-div*/>}}
```
{{< /details >}}
 exercise 2

 Use other shapes different than the quad as screen filters.

{{< p5-iframe sketch="/workshops/exercises/leon/uvcopy.js"
   lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
   width="323" height="323"
>}}
[4]

{{< details title="uvcopy.js" open=false >}}
```js
{{</* p5-instance-div id="lilac-chaser" >}}
let uvShader;

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/workshops/exercises/leon/uvcopy.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  noStroke();
  // see: https://p5js.org/reference/#/p5/shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}

function draw() {
  background(0);
  // clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  // https://p5js.org/reference/#/p5/quad
  // It's worth noting (not mentioned in the api docs) that the quad
  // command also adds the texture coordinates to each of its vertices.
  triangle(-1, -1, 1, -1, 1, 1);
}

{{</p5-instance-div*/>}}
```
{{< /details >}}

{{< details title="uvcopy.frag" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}

precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2, 1.0 , 0.0);
}
{{</p5-instance-div*/>}}
```
{{< /details >}}

exercise 3

Coloring brightness tools


{{< p5-iframe sketch="/workshops/exercises/leon/luma.js"
   lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
   width="740" height="523"
>}}  
[1]
[2]

{{< details title="luma.js" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
let lumaShader;
let img;
let grey_scale;
let hSv;
let hSl;
let aver;

function preload() {
  lumaShader = readShader('/workshops/exercises/leon/luma.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/workshops/exercises/leon/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
  lumaShader.setUniform('texture', img);

  hsv = createCheckbox('hsv', false);
  hsv.position(110, 10);
  hsv.style('color', 'white');
  hsv.input(() => lumaShader.setUniform('hSv', hsv.checked()));
  lumaShader.setUniform('texture', img);

  hsl = createCheckbox('hsl', false);
  hsl.position(210, 10);
  hsl.style('color', 'white');
  hsl.input(() => lumaShader.setUniform('hSl', hsl.checked()));
  lumaShader.setUniform('texture', img);

  av = createCheckbox('average', false);
  av.position(310, 10);
  av.style('color', 'white');
  av.input(() => lumaShader.setUniform('aver', av.checked()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
{{</p5-instance-div*/>}}
```
{{< /details >}}

{{< details title="luma.frag" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform bool aver;
uniform bool hSl;
uniform bool hSv;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

// returns component average of given texel
float average(vec3 texel) {
   return (texel.r + texel.g + texel.b) / 3.0;
}

// returns HSV v-component of a given texel
float hsv(vec3 texel) {
   return max(texel.r, max(texel.g, texel.b));
}

// returns HSL l-component of a given texel
float hsl(vec3 texel) {
   float cmax = max(texel.r, max(texel.g, texel.b));
   float cmin = min(texel.r, min(texel.g, texel.b));
   return (cmax + cmin) / 2.0;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  if(hSv){
  gl_FragColor = hSv ? vec4((vec3(hsv(texel.rgb))), 1.0) : texel;}

  else if(grey_scale){
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;}

  else if(hSl){
    gl_FragColor = hSl ? vec4((vec3(hsl(texel.rgb))), 1.0) : texel;}
  
  else if(aver){
    gl_FragColor = aver ? vec4((vec3(average(texel.rgb))), 1.0) : texel;}
  
  else
    gl_FragColor = texel;

  
}
{{</p5-instance-div*/>}}
```
{{< /details >}}

En la parte superior de la imagen encontraras unos checkbuttons, al hacer clic en ellos puedes ver la representacion que escojas de la imagen, ya sea luma, hsl, hsv o average. Si das clic en varios siempre se mostrara la ultima representación escogida.

Procedural texturing

Procedural 1

{{< p5-iframe sketch="/workshops/exercises/leon/procedural.js"
   lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
   width="420" height="430"
>}}

{{< details title="procedural.js" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/workshops/exercises/leon/procedural.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 1);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cylinder(100, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
{{</p5-instance-div*/>}}
```
{{< /details >}}


{{< details title="procedural.frag" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;       

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,1.0);
    //st = rotateTilePattern(st);

    // Make more interesting combinations
    //st = tile(st,2.0);
    // st = rotate2D(st,-PI*u_time*0.25);
       st = rotateTilePattern(st*u_zoom);
    // st = rotate2D(st,PI*u_time*0.25);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}

{{</p5-instance-div*/>}}
```
{{< /details >}}
 
 El anterior es el ejemplo dado por el profesor en la página oficial del curso.

Procedural 2

{{< p5-iframe sketch="/workshops/exercises/leon/proc2.js"
   lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
   width="420" height="430"
>}}

{{< details title="proc2.js" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/workshops/exercises/leon/proc2.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 1);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cone(150, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

{{</p5-instance-div*/>}}
```
{{< /details >}}

{{< details title="proc2.frag" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.
//
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

uniform vec2 u_resolution;
uniform float u_zoom;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st,u_zoom);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.25);

    // Draw a square
    color = vec3(box(st,vec2(0.7),0.01));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
{{</p5-instance-div*/>}}
```
{{< /details >}}
El anterior es mi patron escogido para realizar mi Procedural texture sobre un cono.

lupa

{{< p5-iframe sketch="/workshops/exercises/leon/lupa.js"
   lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
   width="740" height="523"
>}}
[3]

{{< details title="lupa.js" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
let lupaShader;
let img;


function preload() {
  lupaShader = readShader('/workshops/exercises/leon/lupa.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/workshops/exercises/leon/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lupaShader);
  emitResolution(lupaShader);
  emitMousePosition(lupaShader);
  lupaShader.setUniform('texture', img);

}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}

{{</p5-instance-div*/>}}
```
{{< /details >}}

{{< details title="lupa.frag" open=false >}}
```js
{{</*p5-instance-div id="lilac-chaser" >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform vec3 u_resolution;
uniform vec4 u_mouse;


// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;



void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  vec2 center = u_mouse.xy/u_resolution.xy;
  const float radius=2.;
  const float depth=radius/2.;

  float ax = ((uv.x - center.x) * (uv.x - center.x)) / (0.2*0.2) + ((uv.y - center.y) * (uv.y - center.y)) / (0.2/ (  u_resolution.x / u_resolution.y )) ;
  float dx = 0.0 + (-depth/radius)*ax + (depth/(radius*radius))*ax*ax;
  float f =  (ax + dx );
  if (ax > radius) f = ax;
  vec2 magnifierArea = center + (uv-center)*f/ax;
  gl_FragColor = vec4(texel(texture, vec2(1,-1) * magnifierArea ).rgb, 1.);
  //gl_FragColor = texel;

  
}


{{</p5-instance-div*/>}}
```
{{< /details >}}

Por alguna razón el magnifier no me funcionó, quise intentar implementarlo con la funcion "emitMousePosition", pero no supe realmente cómo implementarlo. 

## Bibliography

[1]
[HSL & HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) 

[2]
[Component Average](https://sighack.com/post/averaging-rgb-colors-the-right-way) 

[3]
[The book of Shaders](https://thebookofshaders.com/09/) 

[3]
[Shadertoy](https://www.shadertoy.com/view/llsSz7) 

[4]
[Visual Computing](https://visualcomputing.github.io/docs/shaders/texturing/) 
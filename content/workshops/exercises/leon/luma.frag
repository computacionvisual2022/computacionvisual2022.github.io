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
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

uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;

  vec3 color = vec3(abs(vUv - 0.4) * 1.5  * (2.0 - distort), 1.0);
  
  gl_FragColor = vec4(color ,0.9);
}

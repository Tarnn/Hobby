import { TRAIL_SIZE } from './palette';
import { HILL_HEIGHT, HILL_R2 } from './terrain';

const f = (n: number) => (Number.isInteger(n) ? `${n}.0` : `${n}`);

/** 2D simplex noise (Ashima Arts / Ian McEwan, MIT). */
export const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`;

/** Mirror of terrainHeight() in ./terrain.ts — keep in lockstep. */
export const TERRAIN_GLSL = /* glsl */ `
uniform vec2 uHill;

float terrainHeight(vec2 p){
  float h = sin(p.x * 0.11 + 0.6) * 0.32
          + cos(p.y * 0.085 + p.x * 0.04) * 0.28
          + sin(p.x * 0.045 - p.y * 0.06) * 0.45;
  vec2 d = p - uHill;
  h += ${f(HILL_HEIGHT)} * exp(-dot(d, d) / ${f(HILL_R2)});
  vec2 d2 = p - (uHill + vec2(-30.0, -18.0));
  h += 1.6 * exp(-dot(d2, d2) / 162.0);
  float relief = 1.0 - smoothstep(-14.0, -2.0, p.y);
  h *= 0.3 + 0.7 * relief;
  float far = 1.0 - smoothstep(-95.0, -48.0, p.y);
  h += far * (4.0 + sin(p.x * 0.045 + 1.3) * 3.0 + sin(p.x * 0.11) * 1.2);
  return h;
}
`;

/** Wind field + pointer-trail push shared by grass and flowers. */
export const FIELD_GLSL = /* glsl */ `
#define TRAIL_SIZE ${TRAIL_SIZE}
#define PUSH_RADIUS 1.25

uniform float uTime;
uniform float uWind;
uniform vec4 uTrail[TRAIL_SIZE];

vec2 windAt(vec2 p, float t){
  float n = snoise(p * 0.06 + vec2(t * 0.22, t * 0.07));
  float gust = sin(dot(p, vec2(0.16, 0.07)) - t * 1.25) * 0.5 + 0.5;
  gust *= gust;
  float s = (0.28 + n * 0.3 + gust * 0.7) * uWind;
  return normalize(vec2(1.0, 0.3)) * s;
}

vec2 pushAt(vec2 p){
  vec2 acc = vec2(0.0);
  for (int i = 0; i < TRAIL_SIZE; i++) {
    vec4 tr = uTrail[i];
    if (tr.w < 0.001) continue;
    vec2 d = p - tr.xz;
    float dist = length(d);
    float fall = 1.0 - smoothstep(0.0, PUSH_RADIUS * (1.0 + tr.y), dist);
    acc += (d / max(dist, 0.001)) * fall * tr.w;
  }
  float len = length(acc);
  return len > 1.0 ? acc / len : acc;
}

// Constant-curvature bend: keeps blade length while leaning by |bend| rad.
vec3 bendOffset(vec2 bend, float height, float t){
  float theta = clamp(length(bend), 0.001, 1.5);
  vec2 dir = bend / max(length(bend), 0.0001);
  float horiz = height / theta * (1.0 - cos(theta * t));
  float vert = height / theta * sin(theta * t);
  return vec3(dir.x * horiz, vert, dir.y * horiz);
}
`;

/** Distance fog toward the horizon color. Requires uFogNear/uFogFar/uFog. */
export const FOG_GLSL = /* glsl */ `
uniform vec3 uFog;
uniform float uFogNear;
uniform float uFogFar;

vec3 applyFog(vec3 col, vec3 worldPos){
  float d = distance(worldPos, cameraPosition);
  float k = pow(smoothstep(uFogNear, uFogFar, d), 0.8);
  return mix(col, uFog, k);
}
`;

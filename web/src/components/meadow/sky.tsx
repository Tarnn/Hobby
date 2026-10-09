'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { NOISE_GLSL } from './glsl';
import type { SharedUniforms } from './palette';

const vertexShader = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = clip.xyww; // pin to the far plane
}
`;

const fragmentShader = /* glsl */ `
${NOISE_GLSL}
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uGlow;
uniform vec3 uSun;
uniform vec3 uCloud;
uniform vec3 uFog;
uniform vec3 uSunDir;
uniform float uSunSize;
uniform float uGlowStrength;
uniform float uCloudAmount;
uniform float uStars;
uniform float uClock;

varying vec3 vDir;

float hash13(vec3 p3){
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec3 d = normalize(vDir);
  float y = d.y;
  float hz = pow(1.0 - clamp(y, 0.0, 1.0), 3.2);
  vec3 col = mix(uZenith, uHorizon, hz);

  float sd = dot(d, uSunDir);
  float glow = pow(max(sd, 0.0), 6.0) * uGlowStrength;
  col += uGlow * glow * (0.35 + 0.65 * hz);

  // Stars (fade in at night, never near the horizon haze).
  if (uStars > 0.001) {
    vec3 sp = d * 130.0;
    vec3 cell = floor(sp);
    float h = hash13(cell);
    vec3 off = vec3(hash13(cell + 7.1), hash13(cell + 3.7), hash13(cell + 1.3)) - 0.5;
    float dist = length(fract(sp) - 0.5 - off * 0.6);
    float star = step(0.986, h) * (1.0 - smoothstep(0.0, 0.16, dist));
    float twinkle = 0.55 + 0.45 * sin(uClock * (1.5 + h * 3.0) + h * 80.0);
    col += vec3(0.9, 0.95, 1.0) * star * twinkle * uStars * smoothstep(0.06, 0.4, y);
  }

  // Clouds: fbm projected onto a dome, drifting slowly.
  vec2 cp = d.xz / (y + 0.14) * 1.3 + vec2(uClock * 0.012, uClock * 0.004);
  float c = fbm(cp * 0.55);
  float band = smoothstep(0.03, 0.2, y) * (1.0 - smoothstep(0.5, 0.85, y));
  float cloud = smoothstep(0.12, 0.66, c) * band * uCloudAmount;
  vec3 cloudCol = uCloud + uGlow * glow * 0.6;

  // Sun / moon disc + halo, partly veiled by clouds.
  float disc = smoothstep(cos(uSunSize), cos(uSunSize * 0.82), sd);
  float halo = pow(max(sd, 0.0), 900.0) * 0.35
             + pow(max(sd, 0.0), 120.0) * 0.16 * uGlowStrength;
  col = mix(col, uSun, disc * (1.0 - cloud * 0.6));
  col += uSun * halo;
  col = mix(col, cloudCol, cloud * 0.85);

  // Below the horizon the sky meets the fog color seamlessly.
  col = mix(col, uFog, 1.0 - smoothstep(-0.06, 0.015, y));

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export function Sky({ uniforms }: { uniforms: SharedUniforms }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(400, 48, 24), []);
  useLayoutEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [uniforms],
  );
  useLayoutEffect(() => () => material.dispose(), [material]);

  // The dome travels with the camera so it always reads as infinitely far.
  useFrame(({ camera }) => {
    ref.current?.position.copy(camera.position);
  });

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      material={material}
      renderOrder={-1}
      frustumCulled={false}
    />
  );
}

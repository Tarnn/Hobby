'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { TERRAIN_GLSL } from './glsl';
import type { SharedUniforms } from './palette';

const vertexShader = /* glsl */ `
${TERRAIN_GLSL}
uniform float uClock;
uniform float uFireflies;
uniform float uPixelRatio;
attribute vec4 aSeed; // x, height, z, phase
varying float vGlow;

void main(){
  float ph = aSeed.w * 6.2831;
  vec3 p = vec3(aSeed.x, 0.0, aSeed.z);
  p.x += sin(uClock * 0.31 + ph) * 0.9 + sin(uClock * 0.83 + ph * 2.0) * 0.25;
  p.z += cos(uClock * 0.27 + ph * 1.3) * 0.9;
  p.y = terrainHeight(p.xz) + aSeed.y + sin(uClock * 0.55 + ph * 0.7) * 0.35;
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float blink = smoothstep(0.15, 1.0, sin(uClock * 1.6 + ph * 3.0) * 0.5 + 0.5);
  vGlow = blink * uFireflies;
  gl_PointSize = (95.0 * uPixelRatio) / -mv.z * (0.55 + blink * 0.6);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uFirefly;
varying float vGlow;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float core = pow(1.0 - smoothstep(0.0, 0.5, d), 2.4);
  gl_FragColor = vec4(uFirefly * core * vGlow * 1.8, core * vGlow);
  #include <colorspace_fragment>
}
`;

export function Fireflies({
  uniforms,
  count,
}: {
  uniforms: SharedUniforms;
  count: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const seed = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      seed.set(
        [
          (Math.random() * 2 - 1) * 13,
          0.55 + Math.random() * 2.1,
          4.5 - Math.random() * 24,
          Math.random(),
        ],
        i * 4,
      );
    }
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    // `position` is required by three; the shader derives the real one.
    g.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(count * 3), 3),
    );
    return g;
  }, [count]);
  useLayoutEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  );
  useLayoutEffect(() => () => material.dispose(), [material]);

  // Skip the draw entirely in daylight.
  useFrame(() => {
    if (ref.current) ref.current.visible = uniforms.uFireflies.value > 0.01;
  });

  return (
    <points
      ref={ref}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}

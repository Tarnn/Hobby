'use client';

import { useLayoutEffect, useMemo } from 'react';

import * as THREE from 'three';

import { FIELD_GLSL, FOG_GLSL, NOISE_GLSL, TERRAIN_GLSL } from './glsl';
import type { SharedUniforms } from './palette';

const vertexShader = /* glsl */ `
${NOISE_GLSL}
${TERRAIN_GLSL}
${FIELD_GLSL}

attribute vec4 aBlade; // x, z, facing angle, random
attribute vec2 aSize;  // height, width

varying float vT;
varying float vRand;
varying float vBend;
varying vec3 vWorld;

void main(){
  float t = position.y;
  vec2 base = aBlade.xy;
  float r = aBlade.z;
  vec2 facing = vec2(cos(r), sin(r));
  vec2 side = vec2(-facing.y, facing.x);

  vec2 wind = windAt(base, uTime);
  float flutter = sin(uTime * 2.6 + aBlade.w * 40.0) * 0.07 * uWind;
  vec2 push = pushAt(base);
  vec2 bend = facing * (0.16 + aBlade.w * 0.24 + flutter) + wind + push * 1.45;

  vec3 world = vec3(base.x, terrainHeight(base), base.y);
  world += bendOffset(bend, aSize.x, t);
  world.xz += side * position.x * aSize.y;

  vT = t;
  vRand = aBlade.w;
  vBend = length(push) + length(wind) * 0.4;
  vWorld = world;
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
}
`;

const fragmentShader = /* glsl */ `
${FOG_GLSL}
uniform vec3 uGrassBase;
uniform vec3 uGrassTip;
uniform vec3 uGrassTipAlt;
uniform vec3 uSheen;
uniform vec3 uSun;
uniform vec3 uSunDir;
uniform float uBacklight;

varying float vT;
varying float vRand;
varying float vBend;
varying vec3 vWorld;

void main(){
  vec3 tip = mix(uGrassTip, uGrassTipAlt, smoothstep(0.15, 0.95, vRand));
  vec3 col = mix(uGrassBase, tip, smoothstep(0.0, 0.95, vT));
  col *= 0.5 + 0.5 * smoothstep(0.0, 0.6, vT);            // root occlusion
  col = mix(col, uSheen, smoothstep(0.3, 1.1, vBend) * vT * 0.32); // wind sheen
  vec3 V = normalize(vWorld - cameraPosition);
  float back = pow(max(dot(V, uSunDir), 0.0), 5.0);
  col += uSun * back * vT * vT * uBacklight;              // translucency
  gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  #include <colorspace_fragment>
}
`;

function bladeGeometry(segments: number) {
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const w = 0.5 * Math.pow(1 - t, 0.85);
    positions.push(-w, t, 0, w, t, 0);
  }
  positions.push(0, 1, 0);
  for (let i = 0; i < segments - 1; i++) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const last = (segments - 1) * 2;
  indices.push(last, last + 1, segments * 2);
  return { positions: new Float32Array(positions), indices };
}

type GrassProps = {
  uniforms: SharedUniforms;
  count: number;
  segments: number;
  /** Horizontal half-extent per unit of distance (frustum width + margin). */
  spread: number;
  cameraZ: number;
};

export function Grass({
  uniforms,
  count,
  segments,
  spread,
  cameraZ,
}: GrassProps) {
  const geometry = useMemo(() => {
    const g = new THREE.InstancedBufferGeometry();
    const { positions, indices } = bladeGeometry(segments);
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setIndex(indices);

    const blade = new Float32Array(count * 4);
    const size = new Float32Array(count * 2);
    const near = cameraZ - 0.4;
    for (let i = 0; i < count; i++) {
      // Denser near the camera, where blades are large on screen.
      const z = near - Math.pow(Math.random(), 1.6) * 48;
      const dist = cameraZ - z;
      const halfW = dist * spread + 2.2;
      const far = 1 + Math.max(0, dist - 5) * 0.045;
      blade[i * 4] = (Math.random() * 2 - 1) * halfW;
      blade[i * 4 + 1] = z;
      blade[i * 4 + 2] = Math.random() * Math.PI * 2;
      blade[i * 4 + 3] = Math.random();
      size[i * 2] = (0.4 + Math.random() * 0.42) * (0.92 + far * 0.1);
      size[i * 2 + 1] = (0.055 + Math.random() * 0.035) * far;
    }
    g.setAttribute('aBlade', new THREE.InstancedBufferAttribute(blade, 4));
    g.setAttribute('aSize', new THREE.InstancedBufferAttribute(size, 2));
    g.instanceCount = count;
    return g;
  }, [count, segments, spread, cameraZ]);

  useLayoutEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      }),
    [uniforms],
  );
  useLayoutEffect(() => () => material.dispose(), [material]);

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

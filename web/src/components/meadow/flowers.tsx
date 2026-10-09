'use client';

import { useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';

import * as THREE from 'three';

import { FIELD_GLSL, FOG_GLSL, NOISE_GLSL, TERRAIN_GLSL } from './glsl';
import type { SharedUniforms } from './palette';

const PETALS = [
  '#f27aa1',
  '#ff8c6b',
  '#7d95ff',
  '#ffd45a',
  '#fff4ee',
  '#c58cff',
];
const PLANT_SLOTS = 64;

const vertexShader = /* glsl */ `
${NOISE_GLSL}
${TERRAIN_GLSL}
${FIELD_GLSL}
uniform float uClock;
attribute vec4 aFlower; // x, z, stem height, random
attribute vec3 aColor;
attribute float aBorn;  // uClock when planted; < -100 for wild flowers
varying vec2 vUv;
varying vec3 vColor;
varying float vRand;
varying vec3 vWorld;

// No pow(): GLSL pow() is undefined for negative bases.
float easeOutBack(float x){
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float t = x - 1.0;
  return 1.0 + c3 * t * t * t + c1 * t * t;
}

void main(){
  // Unused plant slots: emit a degenerate vertex outside the clip volume.
  if (aBorn > 1e5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  vec2 base = aFlower.xy;
  float grow = aBorn < -100.0 ? 1.0 : easeOutBack(clamp((uClock - aBorn) / 0.9, 0.0, 1.0));
  vec2 bend = windAt(base, uTime) + pushAt(base) * 1.45 + vec2(0.08, 0.05);
  vec3 head = vec3(base.x, terrainHeight(base), base.y)
            + bendOffset(bend, aFlower.z * max(grow, 0.0), 1.0);
  vec4 mv = viewMatrix * vec4(head, 1.0);
  // Planted flowers bloom bigger so they stand out from the wild ones.
  float boost = aBorn < -100.0 ? 1.0 : 2.0;
  float size = (0.05 + aFlower.w * 0.03) * boost * max(grow, 0.0);
  mv.xy += position.xy * size * 2.0;
  gl_Position = projectionMatrix * mv;
  vUv = position.xy * 2.0;
  vColor = aColor;
  vRand = aFlower.w;
  vWorld = head;
}
`;

const fragmentShader = /* glsl */ `
${FOG_GLSL}
uniform float uFlowerLight;
uniform vec3 uHorizon;
varying vec2 vUv;
varying vec3 vColor;
varying float vRand;
varying vec3 vWorld;

void main(){
  float r = length(vUv);
  float a = atan(vUv.y, vUv.x);
  float petals = 0.6 + 0.4 * cos(a * 5.0 + vRand * 6.2831);
  if (r > petals) discard;
  vec3 col = vColor * (0.78 + 0.22 * (1.0 - r));
  col = mix(col, vec3(1.0, 0.86, 0.35), 1.0 - smoothstep(0.14, 0.24, r)); // pollen
  col *= uFlowerLight;
  col += uHorizon * (1.0 - uFlowerLight) * 0.12;
  gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  #include <colorspace_fragment>
}
`;

export type FlowersHandle = {
  plant: (x: number, z: number, clock: number, stem: number) => void;
};

type FlowersProps = {
  uniforms: SharedUniforms;
  count: number;
  spread: number;
  cameraZ: number;
  ref?: React.Ref<FlowersHandle>;
};

export function Flowers({
  uniforms,
  count,
  spread,
  cameraZ,
  ref,
}: FlowersProps) {
  const nextSlot = useRef(0);
  const total = count + PLANT_SLOTS;

  const geometry = useMemo(() => {
    const g = new THREE.InstancedBufferGeometry();
    const quad = new THREE.PlaneGeometry(1, 1);
    g.setAttribute('position', quad.attributes.position);
    g.setIndex(quad.index);

    const flower = new Float32Array(total * 4);
    const color = new Float32Array(total * 3);
    const born = new Float32Array(total).fill(-1000);
    const c = new THREE.Color();
    for (let i = 0; i < total; i++) {
      const planted = i >= count;
      const z = cameraZ - 4 - Math.pow(Math.random(), 1.2) * 26;
      const halfW = (cameraZ - z) * spread + 1;
      // Planted slots start collapsed at the origin with zero size.
      flower.set(
        planted
          ? [0, 0, 0, Math.random()]
          : [
              (Math.random() * 2 - 1) * halfW,
              z,
              0.42 + Math.random() * 0.32,
              Math.random(),
            ],
        i * 4,
      );
      c.set(PETALS[Math.floor(Math.random() * PETALS.length)]);
      color.set([c.r, c.g, c.b], i * 3);
      if (planted) born[i] = 1e6; // far future => grow = 0 until planted
    }
    g.setAttribute('aFlower', new THREE.InstancedBufferAttribute(flower, 4));
    g.setAttribute('aColor', new THREE.InstancedBufferAttribute(color, 3));
    g.setAttribute('aBorn', new THREE.InstancedBufferAttribute(born, 1));
    g.instanceCount = total;
    return g;
  }, [count, total, spread, cameraZ]);
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

  useImperativeHandle(
    ref,
    () => ({
      plant(x, z, clock, stem) {
        const i = count + (nextSlot.current++ % PLANT_SLOTS);
        const flower = geometry.getAttribute(
          'aFlower',
        ) as THREE.InstancedBufferAttribute;
        const born = geometry.getAttribute(
          'aBorn',
        ) as THREE.InstancedBufferAttribute;
        flower.setXYZW(i, x, z, stem, Math.random());
        born.setX(i, clock);
        flower.needsUpdate = true;
        born.needsUpdate = true;
      },
    }),
    [geometry, count],
  );

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

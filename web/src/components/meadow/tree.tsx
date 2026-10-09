'use client';

import { useLayoutEffect, useMemo } from 'react';

import * as THREE from 'three';

import { FOG_GLSL } from './glsl';
import type { SharedUniforms } from './palette';

// Seeded PRNG so the tree keeps the same silhouette on every visit.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Canopy volumes (relative to the trunk base): [x, y, z, radius]
const BLOBS: [number, number, number, number][] = [
  [0, 3.75, 0, 1.65],
  [-1.35, 3.35, 0.25, 1.2],
  [1.4, 3.45, -0.2, 1.25],
  [0.35, 4.55, 0.15, 1.3],
  [-0.75, 4.3, -0.5, 1.1],
  [0.95, 4.2, 0.6, 1.05],
  [-0.1, 3.05, 0.8, 1.0],
  [2.1, 3.0, 0.2, 0.75],
  [-2.05, 2.95, -0.1, 0.7],
];
const CANOPY_CENTER = new THREE.Vector3(0, 3.8, 0);

const leafVertex = /* glsl */ `
uniform float uTime;
uniform float uWind;
attribute vec3 aOffset;
attribute vec4 aLeaf; // normal.xyz (outward), random
attribute float aScale;
varying vec2 vUv;
varying vec3 vNormalW;
varying float vRand;
varying vec3 vWorld;
varying float vHeight;

void main(){
  vec3 center = (modelMatrix * vec4(aOffset, 1.0)).xyz;
  float sway = sin(uTime * 1.1 + aOffset.x * 0.9 + aOffset.y * 0.6) * 0.05
             + sin(uTime * 2.3 + aLeaf.w * 20.0) * 0.015;
  center.x += sway * uWind * (aOffset.y - 2.0);
  vec4 mv = viewMatrix * vec4(center, 1.0);
  float a = aLeaf.w * 6.2831;
  mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
  mv.xy += rot * position.xy * aScale;
  gl_Position = projectionMatrix * mv;
  vUv = position.xy * 2.0;
  vNormalW = normalize(mat3(modelMatrix) * aLeaf.xyz);
  vRand = aLeaf.w;
  vWorld = center;
  vHeight = aOffset.y;
}
`;

const leafFragment = /* glsl */ `
${FOG_GLSL}
uniform vec3 uTreeDark;
uniform vec3 uTreeLight;
uniform vec3 uGlow;
uniform vec3 uSunDir;
uniform float uBacklight;
varying vec2 vUv;
varying vec3 vNormalW;
varying float vRand;
varying vec3 vWorld;
varying float vHeight;

void main(){
  float ang = atan(vUv.y, vUv.x);
  float r = length(vUv);
  float edge = 0.93 + sin(ang * 3.0 + vRand * 31.0) * 0.06;
  if (r > edge) discard;
  // Key light from above and slightly toward the viewer, so the canopy
  // reads as a lit dome even when the sun sits behind it.
  vec3 key = normalize(vec3(uSunDir.x * 0.5, 0.85, 0.4));
  float lambert = dot(vNormalW, key) * 0.5 + 0.5;
  float up = smoothstep(2.4, 5.6, vHeight);
  vec3 col = mix(uTreeDark, uTreeLight, clamp(lambert * 0.8 + up * 0.25 - 0.17 + vRand * 0.07, 0.0, 1.0));
  col *= 0.85 + 0.15 * (1.0 - r);
  // Rim light when the sun sits behind the canopy (golden hour).
  vec3 V = normalize(vWorld - cameraPosition);
  float back = pow(max(dot(V, uSunDir), 0.0), 3.0);
  float rim = smoothstep(0.1, 0.9, 1.0 - max(dot(vNormalW, -V), 0.0));
  col += uGlow * back * rim * 0.6 * uBacklight;
  gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  #include <colorspace_fragment>
}
`;

const barkVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vWorld;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const barkFragment = /* glsl */ `
${FOG_GLSL}
uniform vec3 uTrunk;
uniform vec3 uSunDir;
varying vec3 vNormalW;
varying vec3 vWorld;
void main(){
  float l = dot(normalize(vNormalW), uSunDir) * 0.35 + 0.65;
  gl_FragColor = vec4(applyFog(uTrunk * l, vWorld), 1.0);
  #include <colorspace_fragment>
}
`;

function buildBark() {
  const parts: THREE.BufferGeometry[] = [];
  const trunk = new THREE.CylinderGeometry(0.13, 0.28, 3.6, 10, 10, true);
  trunk.translate(0, 1.8, 0);
  const pos = trunk.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    pos.setX(i, pos.getX(i) + Math.sin(y * 0.9) * 0.12);
  }
  trunk.computeVertexNormals();
  parts.push(trunk);

  const branches: [number, number, number, number][] = [
    // [angleZ, angleY, length, startY]
    [0.85, 0.3, 1.7, 2.6],
    [-0.9, -0.4, 1.6, 2.8],
    [0.4, 2.2, 1.3, 3.1],
    [-0.35, 1.0, 1.2, 3.3],
  ];
  branches.forEach(([az, ay, len, y0]) => {
    const b = new THREE.CylinderGeometry(0.04, 0.09, len, 6, 1, true);
    b.translate(0, len / 2, 0);
    b.rotateZ(az);
    b.rotateY(ay);
    b.translate(Math.sin(y0 * 0.9) * 0.12, y0, 0);
    parts.push(b);
  });

  // Manual merge (positions + normals + indices) to keep a single draw call.
  let vertexCount = 0;
  let indexCount = 0;
  parts.forEach((p) => {
    vertexCount += p.attributes.position.count;
    indexCount += p.index!.count;
  });
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const indices = new Uint32Array(indexCount);
  let vo = 0;
  let io = 0;
  parts.forEach((p) => {
    positions.set(p.attributes.position.array as Float32Array, vo * 3);
    normals.set(p.attributes.normal.array as Float32Array, vo * 3);
    const idx = p.index!.array;
    for (let i = 0; i < idx.length; i++) indices[io + i] = idx[i] + vo;
    vo += p.attributes.position.count;
    io += idx.length;
    p.dispose();
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  g.setIndex(new THREE.BufferAttribute(indices, 1));
  return g;
}

function buildCanopy(count: number) {
  const rand = mulberry32(7);
  const g = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  g.setAttribute('position', quad.attributes.position);
  g.setIndex(quad.index);

  const offsets = new Float32Array(count * 3);
  const leaf = new Float32Array(count * 4);
  const scale = new Float32Array(count);
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  const totalWeight = BLOBS.reduce((s, b) => s + b[3] ** 2, 0);

  for (let i = 0; i < count; i++) {
    // Pick a blob proportional to its surface area.
    let pick = rand() * totalWeight;
    let blob = BLOBS[0];
    for (const b of BLOBS) {
      pick -= b[3] ** 2;
      if (pick <= 0) {
        blob = b;
        break;
      }
    }
    // Biased toward the blob surface so the silhouette stays fluffy.
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const rr = blob[3] * Math.pow(rand(), 0.3);
    p.set(
      blob[0] + s * Math.cos(th) * rr,
      blob[1] + u * rr * 0.85,
      blob[2] + s * Math.sin(th) * rr,
    );
    n.copy(p).sub(CANOPY_CENTER).normalize();
    offsets.set([p.x, p.y, p.z], i * 3);
    leaf.set([n.x, n.y, n.z, rand()], i * 4);
    scale[i] = 0.34 + rand() * 0.3;
  }
  g.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
  g.setAttribute('aLeaf', new THREE.InstancedBufferAttribute(leaf, 4));
  g.setAttribute('aScale', new THREE.InstancedBufferAttribute(scale, 1));
  g.instanceCount = count;
  return g;
}

type TreeProps = {
  uniforms: SharedUniforms;
  position: [number, number, number];
  scale?: number;
  leaves: number;
};

export function Tree({ uniforms, position, scale = 1, leaves }: TreeProps) {
  const bark = useMemo(buildBark, []);
  const canopy = useMemo(() => buildCanopy(leaves), [leaves]);
  useLayoutEffect(
    () => () => {
      bark.dispose();
      canopy.dispose();
    },
    [bark, canopy],
  );

  const barkMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: barkVertex,
        fragmentShader: barkFragment,
        side: THREE.DoubleSide,
      }),
    [uniforms],
  );
  const leafMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: leafVertex,
        fragmentShader: leafFragment,
        side: THREE.DoubleSide,
      }),
    [uniforms],
  );
  useLayoutEffect(
    () => () => {
      barkMaterial.dispose();
      leafMaterial.dispose();
    },
    [barkMaterial, leafMaterial],
  );

  return (
    <group position={position} scale={scale}>
      <mesh geometry={bark} material={barkMaterial} position-y={-0.15} />
      <mesh geometry={canopy} material={leafMaterial} frustumCulled={false} />
    </group>
  );
}

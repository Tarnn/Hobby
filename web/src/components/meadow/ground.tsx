'use client';

import { useLayoutEffect, useMemo } from 'react';

import * as THREE from 'three';

import { FOG_GLSL, NOISE_GLSL, TERRAIN_GLSL } from './glsl';
import type { SharedUniforms } from './palette';

const vertexShader = /* glsl */ `
${NOISE_GLSL}
${TERRAIN_GLSL}
varying vec3 vWorld;
varying float vNoise;

void main(){
  vec3 world = (modelMatrix * vec4(position, 1.0)).xyz;
  world.y = terrainHeight(world.xz);
  vNoise = snoise(world.xz * 0.18) * 0.5 + snoise(world.xz * 0.6) * 0.25;
  vWorld = world;
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
}
`;

const fragmentShader = /* glsl */ `
${FOG_GLSL}
uniform vec3 uGround;
uniform vec3 uGroundDark;
uniform vec3 uGrassTip;
uniform vec3 uHorizon;
varying vec3 vWorld;
varying float vNoise;

void main(){
  // Beyond the blades the ground stands in for grass seen from afar, so it
  // brightens toward the tip color with distance.
  float d = distance(vWorld, cameraPosition);
  vec3 col = mix(uGroundDark, uGround, 0.5 + vNoise);
  col = mix(col, mix(uGround, uGrassTip, 0.35), smoothstep(14.0, 50.0, d));
  // Distant ridges pick up a little atmospheric haze before full fog.
  col = mix(col, uHorizon, smoothstep(0.0, 9.0, vWorld.y - 3.5) * 0.25);
  gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  #include <colorspace_fragment>
}
`;

export function Ground({
  uniforms,
  detail,
}: {
  uniforms: SharedUniforms;
  detail: number;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(280, 170, detail * 2, detail);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, -72);
    return g;
  }, [detail]);
  useLayoutEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () => new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader }),
    [uniforms],
  );
  useLayoutEffect(() => () => material.dispose(), [material]);

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

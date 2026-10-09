import * as THREE from 'three';

import type { TimeOfDay } from '@/lib/time-of-day';

type Vec3 = [number, number, number];

export type ScenePalette = {
  // Sky
  zenith: string;
  horizon: string;
  glow: string;
  sun: string;
  sunSize: number;
  glowStrength: number;
  cloud: string;
  cloudAmount: number;
  stars: number;
  /** Direction to the sun / moon (desktop framing, tree on the right). */
  sunDir: Vec3;
  /** Portrait framing: keeps the disc clear of the centered copy. */
  sunDirMobile: Vec3;
  // Atmosphere
  fog: string;
  fogNear: number;
  fogFar: number;
  // Grass
  grassBase: string;
  grassTip: string;
  grassTipAlt: string;
  sheen: string;
  backlight: number;
  wind: number;
  // Ground + tree
  ground: string;
  groundDark: string;
  treeDark: string;
  treeLight: string;
  trunk: string;
  // Life
  flowerLight: number;
  fireflies: number;
  firefly: string;
};

export const PALETTES: Record<TimeOfDay, ScenePalette> = {
  morning: {
    zenith: '#5e98d6',
    horizon: '#d6e6f0',
    glow: '#fff1d2',
    sun: '#fffaf0',
    sunSize: 0.03,
    glowStrength: 0.5,
    cloud: '#ffffff',
    cloudAmount: 0.75,
    stars: 0,
    sunDir: [0.55, 0.48, -1],
    sunDirMobile: [0.3, 0.32, -1],
    fog: '#cfe0ea',
    fogNear: 16,
    fogFar: 150,
    grassBase: '#173d14',
    grassTip: '#8cc94a',
    grassTipAlt: '#b9d95c',
    sheen: '#eaf7c6',
    backlight: 0.25,
    wind: 1,
    ground: '#4f8a2a',
    groundDark: '#274f17',
    treeDark: '#1f3a17',
    treeLight: '#5f8a3a',
    trunk: '#3b2f22',
    flowerLight: 1,
    fireflies: 0,
    firefly: '#e9ff8a',
  },
  golden: {
    zenith: '#5f3558',
    horizon: '#f0a872',
    glow: '#ff9d4f',
    sun: '#fff0cf',
    sunSize: 0.038,
    glowStrength: 0.9,
    cloud: '#f5b08f',
    cloudAmount: 0.42,
    stars: 0.06,
    sunDir: [0.25, 0.115, -1],
    sunDirMobile: [0.15, 0.11, -1],
    fog: '#df9c74',
    fogNear: 18,
    fogFar: 150,
    grassBase: '#1a2209',
    grassTip: '#b39a3c',
    grassTipAlt: '#7d9433',
    sheen: '#f5d08a',
    backlight: 0.45,
    wind: 0.85,
    ground: '#55561f',
    groundDark: '#2a2b10',
    treeDark: '#14120a',
    treeLight: '#4a4220',
    trunk: '#2a1f17',
    flowerLight: 0.92,
    fireflies: 0.35,
    firefly: '#ffd98a',
  },
  night: {
    zenith: '#0a1430',
    horizon: '#1f3263',
    glow: '#3f5896',
    sun: '#dfe6f7',
    sunSize: 0.026,
    glowStrength: 0.3,
    cloud: '#4b5b8c',
    cloudAmount: 0.3,
    stars: 1,
    sunDir: [0.45, 0.36, -1],
    sunDirMobile: [0.32, 0.2, -1],
    fog: '#17264c',
    fogNear: 10,
    fogFar: 120,
    grassBase: '#030c12',
    grassTip: '#1f5f5a',
    grassTipAlt: '#2b6b55',
    sheen: '#7fd1c0',
    backlight: 0.12,
    wind: 0.65,
    ground: '#0b2226',
    groundDark: '#040e11',
    treeDark: '#040d10',
    treeLight: '#15302f',
    trunk: '#0a1214',
    flowerLight: 0.3,
    fireflies: 1,
    firefly: '#d8ff74',
  },
};

// ---------------------------------------------------------------------------
// Shared uniforms: every meadow material spreads these same { value } objects,
// so lerping them once per frame recolors the whole scene.

const COLOR_KEYS = [
  'zenith',
  'horizon',
  'glow',
  'sun',
  'cloud',
  'fog',
  'grassBase',
  'grassTip',
  'grassTipAlt',
  'sheen',
  'ground',
  'groundDark',
  'treeDark',
  'treeLight',
  'trunk',
  'firefly',
] as const;

const NUMBER_KEYS = [
  'sunSize',
  'glowStrength',
  'cloudAmount',
  'stars',
  'fogNear',
  'fogFar',
  'backlight',
  'wind',
  'flowerLight',
  'fireflies',
] as const;

type ColorKey = (typeof COLOR_KEYS)[number];
type NumberKey = (typeof NUMBER_KEYS)[number];

const uniformName = (key: string) => `u${key[0].toUpperCase()}${key.slice(1)}`;

export const TRAIL_SIZE = 12;

export function createSharedUniforms() {
  const u: Record<string, THREE.IUniform> = {
    uTime: { value: 0 },
    uClock: { value: 0 },
    uSunDir: { value: new THREE.Vector3(0.3, 0.3, -1).normalize() },
    uHill: { value: new THREE.Vector2(9, -26) },
    uTrail: {
      value: Array.from({ length: TRAIL_SIZE }, () => new THREE.Vector4()),
    },
    uPixelRatio: { value: 1 },
  };
  COLOR_KEYS.forEach((k) => (u[uniformName(k)] = { value: new THREE.Color() }));
  NUMBER_KEYS.forEach((k) => (u[uniformName(k)] = { value: 0 }));
  return u;
}

export type SharedUniforms = ReturnType<typeof createSharedUniforms>;

type ResolvedPalette = {
  colors: Record<ColorKey, THREE.Color>;
  numbers: Record<NumberKey, number>;
  sunDir: THREE.Vector3;
};

const resolved = new Map<string, ResolvedPalette>();

function resolve(tod: TimeOfDay, mobile: boolean): ResolvedPalette {
  const key = `${tod}:${mobile}`;
  const hit = resolved.get(key);
  if (hit) return hit;
  const p = PALETTES[tod];
  const colors = {} as Record<ColorKey, THREE.Color>;
  COLOR_KEYS.forEach((k) => (colors[k] = new THREE.Color(p[k])));
  const numbers = {} as Record<NumberKey, number>;
  NUMBER_KEYS.forEach((k) => (numbers[k] = p[k]));
  const sunDir = new THREE.Vector3(
    ...(mobile ? p.sunDirMobile : p.sunDir),
  ).normalize();
  const value = { colors, numbers, sunDir };
  resolved.set(key, value);
  return value;
}

/**
 * Eases the shared uniforms toward a palette. `k` is the lerp factor for this
 * frame (1 = snap). Returns true once everything has effectively converged.
 */
export function stepPalette(
  u: SharedUniforms,
  tod: TimeOfDay,
  mobile: boolean,
  k: number,
) {
  const target = resolve(tod, mobile);
  let settled = true;
  COLOR_KEYS.forEach((key) => {
    const c = u[uniformName(key)].value as THREE.Color;
    const t = target.colors[key];
    c.lerp(t, k);
    if (Math.abs(c.r - t.r) + Math.abs(c.g - t.g) + Math.abs(c.b - t.b) > 0.002)
      settled = false;
  });
  NUMBER_KEYS.forEach((key) => {
    const uni = u[uniformName(key)];
    const t = target.numbers[key];
    uni.value += (t - uni.value) * k;
    if (Math.abs(uni.value - t) > 0.002 * Math.max(1, Math.abs(t)))
      settled = false;
  });
  const dir = u.uSunDir.value as THREE.Vector3;
  dir.lerp(target.sunDir, k).normalize();
  if (dir.distanceTo(target.sunDir) > 0.002) settled = false;
  return settled;
}

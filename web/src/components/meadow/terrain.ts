import * as THREE from 'three';

// Terrain is analytic so the exact same function runs in GLSL (vertex
// displacement) and here (tree placement + pointer raycasts). Keep the two
// implementations in lockstep — see TERRAIN_GLSL in ./glsl.ts.

export const HILL_HEIGHT = 3.2;
export const HILL_R2 = 2 * 7.5 * 7.5;

/** Where the lone tree's hill sits for each framing. */
export const HILL_DESKTOP = new THREE.Vector2(9, -26);
export const HILL_MOBILE = new THREE.Vector2(3.2, -29);

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export function terrainHeight(x: number, z: number, hill: THREE.Vector2) {
  let h =
    Math.sin(x * 0.11 + 0.6) * 0.32 +
    Math.cos(z * 0.085 + x * 0.04) * 0.28 +
    Math.sin(x * 0.045 - z * 0.06) * 0.45;

  const dx = x - hill.x;
  const dz = z - hill.y;
  h += HILL_HEIGHT * Math.exp(-(dx * dx + dz * dz) / HILL_R2);

  const dx2 = x - (hill.x - 30);
  const dz2 = z - (hill.y - 18);
  h += 1.6 * Math.exp(-(dx2 * dx2 + dz2 * dz2) / 162);

  // Calm, nearly flat foreground; full relief from ~14 units out.
  const relief = 1 - smoothstep(-14, -2, z);
  h *= 0.3 + 0.7 * relief;

  // Distant ridgeline for depth.
  const far = 1 - smoothstep(-95, -48, z);
  h += far * (4 + Math.sin(x * 0.045 + 1.3) * 3 + Math.sin(x * 0.11) * 1.2);
  return h;
}

const _p = new THREE.Vector3();

/** First intersection of a ray with the terrain (march + bisection). */
export function intersectTerrain(
  ray: THREE.Ray,
  hill: THREE.Vector2,
  maxDistance = 70,
): THREE.Vector3 | null {
  let prev = 0;
  let t = 0.2;
  while (t < maxDistance) {
    ray.at(t, _p);
    if (_p.y <= terrainHeight(_p.x, _p.z, hill)) {
      let lo = prev;
      let hi = t;
      for (let i = 0; i < 10; i++) {
        const mid = (lo + hi) / 2;
        ray.at(mid, _p);
        if (_p.y <= terrainHeight(_p.x, _p.z, hill)) hi = mid;
        else lo = mid;
      }
      return ray.at(hi, new THREE.Vector3());
    }
    prev = t;
    t += 0.15 + t * 0.04;
  }
  return null;
}

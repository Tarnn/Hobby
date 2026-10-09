'use client';

import {
  Component,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { Fireflies } from './fireflies';
import { Flowers, type FlowersHandle } from './flowers';
import { Grass } from './grass';
import { Ground } from './ground';
import {
  createSharedUniforms,
  stepPalette,
  type SharedUniforms,
  TRAIL_SIZE,
} from './palette';
import { Sky } from './sky';
import {
  HILL_DESKTOP,
  HILL_MOBILE,
  intersectTerrain,
  terrainHeight,
} from './terrain';
import { Tree } from './tree';

import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import type { TimeOfDay } from '@/lib/time-of-day';

const CAMERA_Z = 6;
const EYE_HEIGHT = 1.05;

/** Pointer state shared between DOM listeners and the render loop. */
type Input = {
  ndc: THREE.Vector2;
  inside: boolean;
  moved: boolean;
  plants: THREE.Vector2[];
};

type Quality = {
  mobile: boolean;
  blades: number;
  segments: number;
  flowers: number;
  leaves: number;
  fireflies: number;
  groundDetail: number;
  maxDpr: number;
};

function detectQuality(): Quality {
  const mobile =
    window.matchMedia('(max-width: 767px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const lowEnd = cores <= 4;
  if (mobile) {
    return {
      mobile: true,
      blades: lowEnd ? 16000 : 26000,
      segments: 4,
      flowers: 70,
      leaves: 1700,
      fireflies: 70,
      groundDetail: 70,
      maxDpr: 1.5,
    };
  }
  return {
    mobile: false,
    blades: lowEnd ? 42000 : 72000,
    segments: 5,
    flowers: 160,
    leaves: 2600,
    fireflies: 130,
    groundDetail: 110,
    maxDpr: 1.75,
  };
}

// ---------------------------------------------------------------------------

type DirectorProps = {
  uniforms: SharedUniforms;
  input: React.RefObject<Input>;
  flowers: React.RefObject<FlowersHandle | null>;
  tod: TimeOfDay;
  quality: Quality;
  reduced: boolean;
  hill: THREE.Vector2;
  /** Lets DOM listeners request a frame in render-on-demand mode. */
  wake: React.RefObject<(() => void) | null>;
  /** Called once the first frame has been drawn (fades the canvas in). */
  onReady: () => void;
};

/** Per-frame brain: palette easing, camera rig, pointer trail, planting. */
function Director({
  uniforms,
  input,
  flowers,
  tod,
  quality,
  reduced,
  hill,
  wake,
  onReady,
}: DirectorProps) {
  const { camera, invalidate, gl } = useThree();
  const first = useRef(true);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const trail = useRef(
    Array.from({ length: TRAIL_SIZE }, () => ({ x: 0, z: 0, w: 0, r: 0 })),
  );
  const trailHead = useRef(1);
  const lastPush = useRef(new THREE.Vector2(1e9, 1e9));
  const live = useRef({ x: 0, z: 0, w: 0 });
  const parallax = useRef(new THREE.Vector2());
  const baseY = EYE_HEIGHT + terrainHeight(0, CAMERA_Z, hill);
  const lookY = quality.mobile ? 7 : 3.4;

  // Re-render on demand when the palette target changes (reduced motion).
  useEffect(() => invalidate(), [tod, invalidate]);
  useEffect(() => {
    wake.current = invalidate;
    return () => {
      wake.current = null;
    };
  }, [wake, invalidate]);

  const announced = useRef(false);

  useFrame((state, rawDelta) => {
    if (!announced.current) {
      announced.current = true;
      // Next browser frame: the first WebGL frame is on screen by then.
      requestAnimationFrame(onReady);
    }
    const dt = Math.min(rawDelta, 1 / 20);
    const u = uniforms;
    u.uClock.value += dt;
    if (!reduced) u.uTime.value += dt;
    u.uPixelRatio.value = gl.getPixelRatio();

    // Palette easing (snap on the very first frame).
    const k = first.current ? 1 : 1 - Math.exp(-dt * 2.2);
    first.current = false;
    const settled = stepPalette(u, tod, quality.mobile, k);

    // Camera: gentle pointer parallax + a slow rise as the hero scrolls away.
    const inp = input.current;
    // Reduced motion: a still camera (no parallax, no scroll drift).
    const drift = !reduced && !quality.mobile;
    const scroll = reduced
      ? 0
      : Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const targetPx = inp.inside && drift ? inp.ndc.x : 0;
    const targetPy = inp.inside && drift ? inp.ndc.y : 0;
    const pk = reduced ? 1 : 1 - Math.exp(-dt * 1.8);
    parallax.current.x += (targetPx - parallax.current.x) * pk;
    parallax.current.y += (targetPy - parallax.current.y) * pk;
    camera.position.set(
      parallax.current.x * 0.35,
      baseY + parallax.current.y * 0.1 + scroll * 1.6,
      CAMERA_Z,
    );
    camera.lookAt(parallax.current.x * 0.6, lookY - scroll * 0.6, -20);

    // Pointer → ground hit → live push + decaying trail.
    let hit: THREE.Vector3 | null = null;
    if (inp.inside) {
      raycaster.setFromCamera(inp.ndc, camera);
      hit = intersectTerrain(raycaster.ray, hill, 40);
    }
    const lk = 1 - Math.exp(-dt * 6);
    if (hit) {
      live.current.x = hit.x;
      live.current.z = hit.z;
      live.current.w += (1 - live.current.w) * lk;
      const dx = hit.x - lastPush.current.x;
      const dz = hit.z - lastPush.current.y;
      if (dx * dx + dz * dz > 0.35 * 0.35) {
        const slot = trail.current[trailHead.current];
        slot.x = hit.x;
        slot.z = hit.z;
        slot.w = 0.9;
        slot.r = 0;
        lastPush.current.set(hit.x, hit.z);
        trailHead.current = 1 + (trailHead.current % (TRAIL_SIZE - 1));
      }
    } else {
      live.current.w += (0 - live.current.w) * lk;
    }

    // Planting: a click drops a flower and splashes the grass outward.
    while (inp.plants.length) {
      const ndc = inp.plants.shift()!;
      raycaster.setFromCamera(ndc, camera);
      const p = intersectTerrain(raycaster.ray, hill, 36);
      if (!p) continue;
      // Planted stems out-grow the blades so the bloom clears the grass.
      flowers.current?.plant(
        p.x,
        p.z,
        u.uClock.value,
        0.95 + Math.random() * 0.2,
      );
      const slot = trail.current[trailHead.current];
      Object.assign(slot, { x: p.x, z: p.z, w: 1, r: 0.6 });
      trailHead.current = 1 + (trailHead.current % (TRAIL_SIZE - 1));
    }

    const trailU = u.uTrail.value as THREE.Vector4[];
    trailU[0].set(live.current.x, 0, live.current.z, live.current.w);
    let trailActive = live.current.w > 0.002;
    for (let i = 1; i < TRAIL_SIZE; i++) {
      const s = trail.current[i];
      s.w *= Math.exp(-dt * 1.1);
      if (s.w < 0.002) s.w = 0;
      else trailActive = true;
      trailU[i].set(s.x, s.r, s.z, s.w);
    }

    // In demand mode keep frames coming only while something is changing.
    if (reduced && (!settled || trailActive || inp.moved)) invalidate();
    inp.moved = false;
  });

  return null;
}

// ---------------------------------------------------------------------------

/** If WebGL fails at runtime, fall back silently to the CSS sky beneath. */
class WebGLBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Visitors who asked to save data get the poster instead of three.js. */
function prefersSavedData() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return (
    nav.connection?.saveData === true ||
    window.matchMedia('(prefers-reduced-data: reduce)').matches
  );
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

type MeadowProps = {
  /** Element whose area counts as "touching the grass" (the hero section). */
  surface: React.RefObject<HTMLElement | null>;
};

export default function Meadow({ surface }: MeadowProps) {
  const tod = useTimeOfDay() ?? 'night';
  const container = useRef<HTMLDivElement>(null);
  const flowers = useRef<FlowersHandle>(null);
  const wake = useRef<(() => void) | null>(null);
  const input = useRef<Input>({
    ndc: new THREE.Vector2(),
    inside: false,
    moved: false,
    plants: [],
  });
  const uniforms = useMemo(createSharedUniforms, []);
  const [quality, setQuality] = useState<Quality | null>(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.25);
  const [aspect, setAspect] = useState(16 / 9);
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const q = detectQuality();
    setQuality(q);
    setDpr(Math.min(window.devicePixelRatio || 1, q.maxDpr));
    setWebgl(!prefersSavedData() && hasWebGL());
    setAspect(window.innerWidth / Math.max(1, window.innerHeight));
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Pause rendering entirely once the hero is scrolled out of view.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: '80px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rebuild the blade distribution only when the aspect changes a lot.
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = window.innerWidth / Math.max(1, window.innerHeight);
        setAspect((prev) => (Math.abs(next / prev - 1) > 0.3 ? next : prev));
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Pointer tracking at the window level: the canvas itself never blocks
  // the hero copy or buttons.
  useEffect(() => {
    const toNdc = (e: PointerEvent) => {
      const el = container.current;
      const area = surface.current;
      if (!el || !area) return null;
      const r = el.getBoundingClientRect();
      const a = area.getBoundingClientRect();
      const inside =
        e.clientX >= a.left &&
        e.clientX <= a.right &&
        e.clientY >= a.top &&
        e.clientY <= a.bottom;
      return {
        inside,
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: -((e.clientY - r.top) / r.height) * 2 + 1,
      };
    };
    const onMove = (e: PointerEvent) => {
      const p = toNdc(e);
      if (!p) return;
      // Touch has no hover: release the push as soon as the finger lifts.
      const lifted = e.type === 'pointerup' && e.pointerType !== 'mouse';
      input.current.inside = p.inside && !lifted;
      input.current.ndc.set(p.x, p.y);
      input.current.moved = true;
      wake.current?.();
    };
    const onLeave = () => {
      input.current.inside = false;
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !surface.current?.contains(target)) return;
      if (target.closest('a, button, input, textarea, select, [role="radio"]'))
        return;
      const p = toNdc(e as PointerEvent);
      if (!p?.inside) return;
      input.current.plants.push(new THREE.Vector2(p.x, p.y));
      input.current.moved = true;
      wake.current?.();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onMove, { passive: true });
    window.addEventListener('pointercancel', onLeave, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onMove);
      window.removeEventListener('pointercancel', onLeave);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, [surface]);

  const hill = quality?.mobile ? HILL_MOBILE : HILL_DESKTOP;
  useEffect(() => {
    (uniforms.uHill.value as THREE.Vector2).copy(hill);
  }, [hill, uniforms]);

  const fov = quality?.mobile ? 62 : 45;
  // Horizontal half-extent of the frustum per unit distance, plus margin.
  const spread =
    Math.tan(THREE.MathUtils.degToRad(fov / 2)) * Math.max(aspect, 0.45) * 1.2;

  if (!quality || !webgl) {
    return <div ref={container} className="absolute inset-0" />;
  }

  const treeY = terrainHeight(hill.x, hill.y, hill) - 0.05;

  return (
    <div
      ref={container}
      className="absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
      // Stays transparent over the poster until the first frame is drawn.
      style={{ opacity: ready ? 1 : 0 }}
    >
      <WebGLBoundary>
        <Canvas
          flat
          dpr={dpr}
          frameloop={!visible ? 'never' : reduced ? 'demand' : 'always'}
          camera={{
            fov,
            near: 0.1,
            far: 1000,
            position: [0, EYE_HEIGHT, CAMERA_Z],
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ pointerEvents: 'none' }}
          aria-hidden
        >
          <PerformanceMonitor
            onDecline={() => setDpr(1)}
            onIncline={() =>
              setDpr(Math.min(window.devicePixelRatio || 1, quality.maxDpr))
            }
          />
          <Director
            uniforms={uniforms}
            input={input}
            flowers={flowers}
            tod={tod}
            quality={quality}
            reduced={reduced}
            hill={hill}
            wake={wake}
            onReady={() => setReady(true)}
          />
          <Sky uniforms={uniforms} />
          <Ground uniforms={uniforms} detail={quality.groundDetail} />
          <Tree
            uniforms={uniforms}
            position={[hill.x, treeY, hill.y]}
            scale={quality.mobile ? 1.15 : 1.25}
            leaves={quality.leaves}
          />
          <Grass
            uniforms={uniforms}
            count={quality.blades}
            segments={quality.segments}
            spread={spread}
            cameraZ={CAMERA_Z}
          />
          <Flowers
            ref={flowers}
            uniforms={uniforms}
            count={quality.flowers}
            spread={spread}
            cameraZ={CAMERA_Z}
          />
          <Fireflies uniforms={uniforms} count={quality.fireflies} />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}

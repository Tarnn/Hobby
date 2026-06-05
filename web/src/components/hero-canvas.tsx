'use client';

import { useEffect, useMemo, useRef } from 'react';

import { Points, PointMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useIsMobile } from '@/hooks/useIsMobile';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const tilt = useRef<THREE.Group>(null);
  // Track pointer at the window level (the canvas itself is pointer-events:none).
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a soft sphere shell
      const r = 2.2 + Math.pow(Math.random(), 0.6) * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      // Slow continuous rotation
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.012;
    }
    if (tilt.current) {
      // Cloud leans toward the cursor (eased) for an interactive parallax
      const px = pointer.current.x;
      const py = pointer.current.y;
      tilt.current.rotation.y +=
        (px * 0.5 - tilt.current.rotation.y) * delta * 2;
      tilt.current.rotation.x +=
        (-py * 0.4 - tilt.current.rotation.x) * delta * 2;
      tilt.current.position.x +=
        (px * 0.5 - tilt.current.position.x) * delta * 2;
      tilt.current.position.y +=
        (py * 0.4 - tilt.current.position.y) * delta * 2;
    }
  });

  return (
    <group ref={tilt}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2b9bf4"
          size={0.034}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  const count = isMobile ? 650 : 1500;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      frameloop="always"
      performance={{ min: 0.5 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ pointerEvents: 'none' }}
    >
      <ParticleField count={count} />
    </Canvas>
  );
}

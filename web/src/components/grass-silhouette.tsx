// Deterministic grass silhouette (portrait window, 404 page). Integer PRNG
// keeps the path identical on server and client (no hydration drift).
function prng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const BLADES = (() => {
  const rand = prng(42);
  const n = (v: number) => v.toFixed(2);
  return Array.from({ length: 46 }, (_, i) => {
    const x = (i / 45) * 100 + (rand() - 0.5) * 2.4;
    const h = 34 + rand() * 46;
    const lean = (rand() - 0.5) * 10;
    return `M${n(x - 1.6)} 100 Q${n(x + lean * 0.4)} ${n(100 - h * 0.6)} ${n(x + lean)} ${n(100 - h)} Q${n(x + lean * 0.3 + 0.6)} ${n(100 - h * 0.55)} ${n(x + 1.6)} 100Z`;
  }).join(' ');
})();

/** Meadow grass edge in `--grass-silhouette`; stretch it with className. */
export function GrassSilhouette({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      style={{ color: 'var(--grass-silhouette)' }}
    >
      <path d={BLADES} fill="currentColor" />
      <rect y="92" width="100" height="8" fill="currentColor" />
    </svg>
  );
}

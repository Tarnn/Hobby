// Can this device run the WebGL meadow well? Cheap checks only, run before
// three.js is downloaded. Visitors who fail get the pre-rendered poster.
export function canRunMeadow(): boolean {
  if (typeof window === 'undefined') return false;
  // scripts/posters.mjs renders stills with software WebGL on purpose.
  if (new URLSearchParams(window.location.search).get('meadow') === 'force') {
    return true;
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 2) return false;

  try {
    const canvas = document.createElement('canvas');
    // Refuses a context when the GPU path is software or blocklisted.
    const opts = { failIfMajorPerformanceCaveat: true };
    const gl = (canvas.getContext('webgl2', opts) ||
      canvas.getContext('webgl', opts)) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(
      renderer,
    );
  } catch {
    return false;
  }
}

/** Run `fn` once the page has loaded and the main thread is idle. */
export function whenIdle(fn: () => void, timeout = 2000): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = () => {
    if (cancelled) return;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => !cancelled && fn(), {
        timeout,
      });
    } else {
      timer = setTimeout(() => !cancelled && fn(), 200);
    }
  };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener('load', run);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timer) clearTimeout(timer);
  };
}

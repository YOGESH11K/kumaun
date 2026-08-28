export type QualityLevel = "high" | "medium" | "low";

export type Capability = {
  level: QualityLevel;
  webgl: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  pixelRatio: number;
  isTouch: boolean;
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function detectLevel(isMobile: boolean, reducedMotion: boolean): QualityLevel {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  let score = cores * (memory ? memory : 4);

  if (isMobile) score *= 0.6;
  if (reducedMotion) score *= 0.7;

  if (score >= 12 && !isMobile) return "high";
  if (score >= 5) return "medium";
  return "low";
}

/**
 * Runs once on the client after mount to decide quality level,
 * WebGL availability, and reduced-motion preference.
 */
export function getCapability(): Capability {
  const isTouch =
    (typeof window !== "undefined" && "ontouchstart" in window) ||
    navigator.maxTouchPoints > 0;
  const isMobile = isTouch && window.innerWidth < 900;
  const reducedMotion =
    typeof window.matchMedia !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const webgl = detectWebGL();

  let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  if (isMobile) pixelRatio = Math.min(pixelRatio, 1.5);
  if (reducedMotion) pixelRatio = Math.min(pixelRatio, 1);

  return {
    level: webgl ? detectLevel(isMobile, reducedMotion) : "low",
    webgl,
    reducedMotion,
    isMobile,
    pixelRatio,
    isTouch,
  };
}

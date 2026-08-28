/**
 * Central image resolution.
 *
 * Slots are referenced by their base path, e.g. "/images/mukteshwar/ridge-overview".
 * If a real photograph (".jpg") has been dropped into the matching slot, we serve
 * the JPG (available via next/image optimization). Otherwise we fall back to the
 * generated SVG cinematic placeholder.
 *
 * To use a real photo for a slot, place "<name>.jpg" in the folder and add the
 * base path to REAL_JPG below. Each photo is used for exactly one slot.
 */
export type ImageSource = {
  /** final resolvable URL, e.g. "/images/mukteshwar/ridge-overview.jpg" */
  src: string;
  /** true when this slot uses a real photograph */
  isPhoto: boolean;
};

/** Slots backed by a real JPG photograph (each used once). */
const REAL_JPG: ReadonlySet<string> = new Set([
  "/images/landscapes/hero-panorama",
  "/images/mukteshwar/ridge-overview",
  "/images/saliyakote-malla/village-lane",
  "/images/saliyakote-talla/village-road",
  "/images/sundarkhal/forest-valley",
  "/images/dharapani/valley-village",
  "/images/nainital/lake-hills",
  "/images/saliyakote-talla/mountain-scenery",
  "/images/mukteshwar/sunrise-peaks",
  "/images/nainital/naina-temple",
  "/images/mukteshwar/orchard",
  "/images/experiences/mountain-silence",
  "/images/experiences/forest-light",
]);

/** Resolve a base path to its final URL (JPG if available, else SVG placeholder). */
export function resolveImage(base: string): ImageSource {
  if (REAL_JPG.has(base)) return { src: `${base}.jpg`, isPhoto: true };
  return { src: `${base}.svg`, isPhoto: false };
}

/** Shortcut returning just the final URL string. */
export function img(base: string): string {
  return resolveImage(base).src;
}

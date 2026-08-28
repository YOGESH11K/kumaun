/* eslint-disable @typescript-eslint/no-require-imports */
// Generates cinematic SVG placeholder images so the site renders beautifully
// before real photographs are added. Owner replaces files under /public/images.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "images");

// Each spec: gradient palette (sky -> horizon), mountain layers, extra flavour
const SPECS = {
  "mukteshwar/ridge-overview": {
    sky: ["#2f5d7d", "#7fa6bd", "#cfe0e8"],
    layers: ["#1d4d38", "#36634a", "#6b8b6a"],
    peak: true,
    snow: true,
  },
  "mukteshwar/temple-cliff": {
    sky: ["#40546b", "#8aa3b5", "#d6e2e8"],
    layers: ["#22412f", "#3c5f45", "#6e8a67"],
    peak: true,
  },
  "mukteshwar/forest-pine": {
    sky: ["#1f3d30", "#3f5f4a", "#7f9b80"],
    layers: ["#122b20", "#1f4231", "#3e6048"],
    pines: true,
  },
  "mukteshwar/orchard": {
    sky: ["#b0894f", "#d7b98f", "#f0e2c6"],
    layers: ["#3f6b47", "#5c8455", "#86a06a"],
    orchard: true,
  },
  "mukteshwar/sunrise-peaks": {
    sky: ["#7a4a3d", "#d9905f", "#f3cf9f"],
    layers: ["#2c3a3f", "#4a5660", "#7d8a8a"],
    peak: true,
    snow: true,
  },
  "saliyakote-malla/village-lane": {
    sky: ["#35566b", "#7fa3b4", "#d3e0e0"],
    layers: ["#2c4a3a", "#4a6b4a", "#7a8f6a"],
    village: true,
  },
  "saliyakote-malla/fields": {
    sky: ["#5c7b62", "#8fa878", "#d8d9a8"],
    layers: ["#33513a", "#557448", "#7e9358"],
    fields: true,
  },
  "saliyakote-malla/mountain-view": {
    sky: ["#41677e", "#8fb0bf", "#dbe6e6"],
    layers: ["#2b4a3c", "#4a6e50", "#7b9170"],
    peak: true,
    snow: true,
  },
  "saliyakote-malla/forest": {
    sky: ["#2a4a3a", "#4a7048", "#87955e"],
    layers: ["#142c20", "#26452f", "#41603c"],
    pines: true,
  },
  "saliyakote-malla/local-life": {
    sky: ["#3b5566", "#7fa09c", "#cdd9c4"],
    layers: ["#2b4632", "#4c6744", "#758b58"],
    village: true,
  },
  "saliyakote-malla/sunrise-peaks": {
    sky: ["#6e4337", "#c88958", "#efcf9a"],
    layers: ["#28343c", "#46535c", "#7c8c8c"],
    peak: true,
    snow: true,
  },
  "saliyakote-talla/village-road": {
    sky: ["#2f5368", "#74a09a", "#cfe0c8"],
    layers: ["#245040", "#3f6b4a", "#6f8f5c"],
    village: true,
  },
  "saliyakote-talla/greenery": {
    sky: ["#3a6b52", "#78a071", "#cfe0a8"],
    layers: ["#1f4632", "#35683f", "#5b8550"],
    fields: true,
  },
  "saliyakote-talla/houses": {
    sky: ["#31586b", "#7ba79a", "#d4e2c0"],
    layers: ["#27493a", "#41694a", "#6f8b5c"],
    village: true,
  },
  "saliyakote-talla/sunset": {
    sky: ["#6d3d3a", "#c9805a", "#efc88a"],
    layers: ["#2b3538", "#4a5650", "#7a8878"],
    peak: true,
  },
  "saliyakote-talla/mountain-scenery": {
    sky: ["#2e5266", "#6e98a8", "#cfe0da"],
    layers: ["#23443c", "#3f6548", "#6f8f5a"],
    peak: true,
  },
  "sundarkhal/forest-valley": {
    sky: ["#264c40", "#4f7a58", "#9db370"],
    layers: ["#142e23", "#27492f", "#47633e"],
    pines: true,
  },
  "sundarkhal/valley-village": {
    sky: ["#2f5b50", "#6f9a70", "#cfe08e"],
    layers: ["#1e4230", "#37633f", "#5c8550"],
    village: true,
  },
  "sundarkhal/roads": {
    sky: ["#3a5f5e", "#7f9f8e", "#d4e2c0"],
    layers: ["#26503f", "#416d47", "#6f8f5a"],
    village: true,
  },
  "sundarkhal/greenery": {
    sky: ["#3f7258", "#82a768", "#dce8a8"],
    layers: ["#1e4c33", "#3a6b3f", "#5f8a4e"],
    fields: true,
  },
  "sundarkhal/mountain-views": {
    sky: ["#b3794a", "#d8ae7c", "#f0e0b6"],
    layers: ["#2b4a3f", "#4a6e52", "#7b9170"],
    peak: true,
  },
  "dharapani/valley-village": {
    sky: ["#2d5a4e", "#6f9a70", "#d0df9a"],
    layers: ["#1d4330", "#35653f", "#5c8a50"],
    village: true,
  },
  "dharapani/greenery": {
    sky: ["#37694f", "#72a267", "#cfe2a0"],
    layers: ["#1d4f37", "#356f42", "#5c8f4e"],
    fields: true,
  },
  "dharapani/surrounding-mountains": {
    sky: ["#2d5568", "#6f9caa", "#d3e1dc"],
    layers: ["#23463e", "#3f6950", "#6e8f62"],
    peak: true,
  },
  "dharapani/local-life": {
    sky: ["#31604b", "#6f9670", "#cfdf9e"],
    layers: ["#1c4330", "#35653f", "#5c8a50"],
    village: true,
  },
  "nainital/lake-hills": {
    sky: ["#34516b", "#6f96b3", "#c6dae6"],
    layers: ["#28423f", "#476456", "#6e8866"],
    lake: true,
  },
  "nainital/naina-temple": {
    sky: ["#3a5b73", "#7f9cb4", "#d2e0e8"],
    layers: ["#293f43", "#48605c", "#6f8466"],
    village: true,
  },
  "nainital/mall-road": {
    sky: ["#3b5f78", "#87a7ba", "#d9e4e6"],
    layers: ["#26433f", "#466158", "#6d8a68"],
    lake: true,
  },
  "nainital/snow-view": {
    sky: ["#35536b", "#6f96ae", "#c4d9e2"],
    layers: ["#2a4540", "#49645a", "#718b66"],
    peak: true,
    snow: true,
  },
  "nainital/tiffin-top": {
    sky: ["#3c5f6e", "#84a5ac", "#d6e4de"],
    layers: ["#273f42", "#465c58", "#6f8568"],
    peak: true,
  },
  "landscapes/hero-panorama": {
    sky: ["#173a4f", "#4f7a9a", "#b7ccd8"],
    layers: ["#123526", "#1f4d38", "#3c6e50", "#6f9468"],
    peak: true,
    snow: true,
  },
  "experiences/mountain-morning": {
    sky: ["#6e4238", "#c68a5a", "#eed09c"],
    layers: ["#2a3940", "#4a5a58", "#7e9278"],
    peak: true,
  },
  "experiences/mountain-silence": {
    sky: ["#2f4f5e", "#6f94a6", "#cfe0d8"],
    layers: ["#23433c", "#40634c", "#71915f"],
    peak: true,
    snow: true,
  },
  "experiences/forest-light": {
    sky: ["#244631", "#4f7250", "#a3b877"],
    layers: ["#12281f", "#274527", "#42603a"],
    pines: true,
  },
  "experiences/village-calm": {
    sky: ["#3d5d63", "#84a58f", "#d4e0c0"],
    layers: ["#26463a", "#41654a", "#6f8f5e"],
    village: true,
  },
  "experiences/himalayan-sky": {
    sky: ["#14213f", "#2f4a6e", "#6f93b8"],
    layers: ["#1a2e38", "#3a4f56", "#6b7f74"],
    peak: true,
    snow: true,
  },
  "experiences/why-mornings": {
    sky: ["#e8d8b0", "#f0e6c8", "#fff8e8"],
    layers: ["#5c7c56", "#82a06a", "#b2b888"],
    peak: true,
  },
};

function mountainPath(w, h, baseY, amp, octaves, seed) {
  let pts = `M0 ${h}\nL0 ${baseY}\n`;
  const steps = 40;
  let x = 0;
  let y = baseY;
  for (let i = 0; i <= steps; i++) {
    x = (w / steps) * i;
    let n = 0;
    let a = 1;
    for (let o = 0; o < octaves; o++) {
      n += Math.sin(i * (2.5 + o * 3.1) + seed + o * 17) * a;
      a *= 0.5;
    }
    y = baseY - n * amp;
    pts += `L${x.toFixed(1)} ${y.toFixed(1)}\n`;
  }
  pts += `L${w} ${h}\nZ`;
  return pts;
}

function pinePath(x, y, s, shade) {
  const trunk = `<rect x="${x - s * 0.06}" y="${y - s * 0.3}" width="${s * 0.12}" height="${s * 0.3}" fill="#1a2f24"/>`;
  let layersPoly = "";
  const cols = 3;
  for (let i = 0; i < cols; i++) {
    const w = s * (0.6 + i * 0.18);
    const h = s * (0.32);
    const cx = x;
    const topY = y - s * 0.3 - i * h * 0.62;
    layersPoly += `<polygon points="${cx},${topY} ${cx - w / 2},${topY + h} ${cx + w / 2},${topY + h}" fill="${shade}" opacity="${0.95 - i * 0.18}"/>`;
  }
  return trunk + layersPoly;
}

function buildSvg(spec, title) {
  const w = 1280;
  const h = 900;
  const sky = spec.sky;
  let stops = "";
  sky.forEach((c, i) => {
    stops += `<stop offset="${(i / (sky.length - 1)) * 100}%" stop-color="${c}"/>`;
  });

  const layers = spec.layers;
  let mountains = "";
  if (layers.length) {
    layers.forEach((c, i) => {
      const baseY = h * (0.45 + i * 0.14);
      const amp = h * (0.16 - i * 0.03);
      const d = mountainPath(w, h * (1 - i * 0.02), baseY, amp, 3 + i, i * 40);
      mountains += `<path d="${d}" fill="${c}" opacity="${0.92 - i * 0.14}"/>`;
    });
  }

  // snow caps on the highest layer
  let snow = "";
  if (spec.snow && layers.length) {
    const d = mountainPath(w, h * 1.0, h * 0.43, h * 0.17, 3, 0);
    const clipId = "capclip";
    snow += `<clipPath id="${clipId}"><path d="${d}"/></clipPath>`;
    snow += `<path d="${d}" fill="#eef6f4" clip-path="url(#${clipId})" opacity="0.9" transform="translate(0,-60) scale(1,1)"/>`;
    // brighten tops
    snow += `<path d="M0 ${h * 0.4} L${w / 2} ${h * 0.26} L${w} ${h * 0.4} L${w} ${h * 0.34} L${w / 2} ${h * 0.2} L0 ${h * 0.34} Z" fill="#f8fcfb" opacity="0.55"/>`;
  }

  // pines
  let pines = "";
  if (spec.pines) {
    const shades = ["#0f2419", "#163122", "#1d4230", "#26523a"];
    for (let i = 0; i < 70; i++) {
      const px = (i * 311) % w;
      const base = h * (0.8 + ((i * 137) % 100) / 500);
      const s = 40 + ((i * 53) % 70);
      const shade = shades[i % shades.length];
      pines += pinePath(px, base, s, shade);
    }
  }

  // forest tree dots on lower layers
  let ridges = "";
  layers.forEach((c, i) => {
    if (i === 0) return;
    const baseY = h * (0.58 + i * 0.14);
    const d = mountainPath(w, h, baseY, h * 0.12, 4, i * 90);
    ridges += `<path d="${d}" fill="${c}" opacity="0.3"/>`;
  });

  // lake (optional)
  let lake = "";
  if (spec.lake) {
    lake = `<ellipse cx="${w / 2}" cy="${h * 0.68}" rx="${w * 0.34}" ry="${h * 0.1}" fill="#8fb6c9"/>`;
    lake += `<ellipse cx="${w / 2}" cy="${h * 0.66}" rx="${w * 0.24}" ry="${h * 0.06}" fill="#a9c6d6" opacity="0.7"/>`;
  }

  // sun / glow
  let glow = "";
  const sunColor = spec.peaksnow ? "#fff" : "#f2d9a8";
  glow = `<circle cx="${w * 0.76}" cy="${h * 0.2}" r="90" fill="${spec.golden ? "#e9d5a8" : "#f6ecd2"}" opacity="0.5"/>`;
  glow += `<circle cx="${w * 0.76}" cy="${h * 0.2}" r="40" fill="#fff8e6" opacity="0.9"/>`;

  const label = title.replace(/-/g, " ").toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#162b1f"/>
      <stop offset="100%" stop-color="#0a1810"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  ${glow}
  ${snow}
  ${mountains}
  ${ridges}
  ${pines}
  ${lake}
  <rect y="${h * 0.92}" width="${w}" height="${h * 0.08}" fill="url(#ground)"/>
  <text x="40" y="${h - 40}" font-family="Georgia,serif" font-size="30" letter-spacing="4" fill="#ffffff" opacity="0.75">${label}</text>
</svg>`;
}

Object.entries(SPECS).forEach(([key, spec]) => {
  const file = path.join(ROOT, `${key}.svg`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const title = key.split("/").pop().replace(/-/g, " ");
  fs.writeFileSync(file, buildSvg(spec, title));
  console.log("wrote", key);
});

console.log("Placeholders generated.");

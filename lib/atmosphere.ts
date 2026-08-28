import type { AtmosphereMode } from "@/components/providers/ExperienceProvider";

export type AtmospherePalette = {
  fog: string;
  fogNear: number;
  fogFar: number;
  hemisphereSky: string;
  hemisphereGround: string;
  sunIntensity: number;
  sunColor: string;
  ambient: string;
  ambientIntensity: number;
  skyTop: string;
  skyBottom: string;
  cloudOpacity: number;
  starOpacity: number;
  particles: string;
  markerGlow: string;
};

export const atmospherePalettes: Record<AtmosphereMode, AtmospherePalette> = {
  morning: {
    fog: "#cfe0d8",
    fogNear: 18,
    fogFar: 78,
    hemisphereSky: "#cfe6ec",
    hemisphereGround: "#2a3f30",
    sunIntensity: 1.6,
    sunColor: "#ffd9a3",
    ambient: "#ffffff",
    ambientIntensity: 0.55,
    skyTop: "#a7c8de",
    skyBottom: "#f0e8d8",
    cloudOpacity: 0.85,
    starOpacity: 0,
    particles: "#f6f2e8",
    markerGlow: "#ffd9a3",
  },
  day: {
    fog: "#cfe0da",
    fogNear: 22,
    fogFar: 90,
    hemisphereSky: "#aecbda",
    hemisphereGround: "#2c4434",
    sunIntensity: 2.0,
    sunColor: "#fff2d8",
    ambient: "#ffffff",
    ambientIntensity: 0.65,
    skyTop: "#7aa7c4",
    skyBottom: "#e4efe8",
    cloudOpacity: 0.9,
    starOpacity: 0,
    particles: "#ffffff",
    markerGlow: "#ffe9b8",
  },
  golden: {
    fog: "#e8cfa8",
    fogNear: 16,
    fogFar: 70,
    hemisphereSky: "#f0c890",
    hemisphereGround: "#3a2f24",
    sunIntensity: 2.4,
    sunColor: "#ffad5c",
    ambient: "#ffffff",
    ambientIntensity: 0.5,
    skyTop: "#c98a55",
    skyBottom: "#f6d9a6",
    cloudOpacity: 0.8,
    starOpacity: 0,
    particles: "#ffe4b0",
    markerGlow: "#ffb86a",
  },
  evening: {
    fog: "#8a7a8a",
    fogNear: 14,
    fogFar: 62,
    hemisphereSky: "#7a6e96",
    hemisphereGround: "#241f2c",
    sunIntensity: 1.2,
    sunColor: "#c97b9a",
    ambient: "#c8c8d8",
    ambientIntensity: 0.4,
    skyTop: "#3f4768",
    skyBottom: "#c88a7a",
    cloudOpacity: 0.7,
    starOpacity: 0.15,
    particles: "#e6d3d3",
    markerGlow: "#e0a0c0",
  },
  night: {
    fog: "#0d1520",
    fogNear: 12,
    fogFar: 70,
    hemisphereSky: "#16233a",
    hemisphereGround: "#0a0f14",
    sunIntensity: 0.0,
    sunColor: "#cfe0ff",
    ambient: "#9ab0e0",
    ambientIntensity: 0.35,
    skyTop: "#050a18",
    skyBottom: "#16233a",
    cloudOpacity: 0.35,
    starOpacity: 1,
    particles: "#dfe8ff",
    markerGlow: "#9fc0ff",
  },
};

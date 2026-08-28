"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { atmospherePalettes } from "@/lib/atmosphere";
import type { AtmosphereMode } from "@/components/providers/ExperienceProvider";
import { CloudLayer, StarField } from "./MountainScene";

/**
 * Drives the whole scene's atmosphere: fog, hemisphere/sun lights and
 * a gradient sky dome. Cross-fades when the user switches modes.
 */
export function AtmosphereController({
  mode,
  quality = "high",
}: {
  mode: AtmosphereMode;
  quality?: "high" | "medium" | "low";
}) {
  const { scene } = useThree();
  const sun = useRef<THREE.DirectionalLight>(null!);
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const amb = useRef<THREE.AmbientLight>(null!);
  const current = useRef<AtmosphereMode>(mode);

  const palette = atmospherePalettes[mode];

  const clouds = useMemo(() => {
    if (quality === "low") return 3;
    return quality === "medium" ? 5 : 7;
  }, [quality]);

  const stars = useMemo(
    () => (quality === "low" ? 120 : 320),
    [quality]
  );

  // gradient sky dome
  const skyGeo = useMemo(() => new THREE.SphereGeometry(200, 24, 16), []);
  const skyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          top: { value: new THREE.Color(palette.skyTop) },
          bottom: { value: new THREE.Color(palette.skyBottom) },
          offset: { value: 20 },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 top;
          uniform vec3 bottom;
          uniform float offset;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
            vec3 color = mix(bottom, top, max(pow(max(h, 0.0), 0.5), 0.0));
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // fade between palettes
  const target = useMemo(() => atmospherePalettes[mode], [mode]);
  const currentVals = useRef<Record<string, number>>({});
  const currentColors = useRef<Record<string, THREE.Color>>({});
  const colorsList = useMemo(
    () =>
      Object.keys(target).filter(
        (k) => k.includes("Color") || k.includes("Sun") || k.includes("Ground") || k.includes("Sky") || k.includes("Top") || k.includes("Bottom") || k.includes("Hemisphere") || k.includes("Ambient")
      ),
    []
  );

  useEffect(() => {
    scene.fog = new THREE.Fog(palette.fog, palette.fogNear, palette.fogFar);
    current.current = mode;
  }, [mode, palette, scene]);

  useFrame((_, delta) => {
    const p = atmospherePalettes[mode];
    const fade = Math.min(1, delta * 3);

    // fog
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(new THREE.Color(p.fog), fade);
      scene.fog.near += (p.fogNear - scene.fog.near) * fade;
      scene.fog.far += (p.fogFar - scene.fog.far) * fade;
    }

    // lights
    if (sun.current) {
      sun.current.color.lerp(new THREE.Color(p.sunColor), fade);
      sun.current.intensity += (p.sunIntensity - sun.current.intensity) * fade;
    }
    if (hemi.current) {
      hemi.current.color.lerp(new THREE.Color(p.hemisphereSky), fade);
      hemi.current.groundColor.lerp(new THREE.Color(p.hemisphereGround), fade);
      hemi.current.intensity += (0.9 - hemi.current.intensity) * fade;
    }
    if (amb.current) {
      amb.current.color.lerp(new THREE.Color(p.ambient), fade);
      amb.current.intensity +=
        (p.ambientIntensity - amb.current.intensity) * fade;
    }

    // sky dome
    if (skyMat.uniforms) {
      skyMat.uniforms.top.value.lerp(new THREE.Color(p.skyTop), fade);
      skyMat.uniforms.bottom.value.lerp(new THREE.Color(p.skyBottom), fade);
    }
  });

  return (
    <group>
      <mesh geometry={skyGeo} material={skyMat} />
      <hemisphereLight
        ref={hemi}
        args={[palette.hemisphereSky, palette.hemisphereGround, 0.9]}
      />
      <ambientLight ref={amb} intensity={palette.ambientIntensity} color={palette.ambient} />
      <directionalLight
        ref={sun}
        position={[40, 60, 20]}
        intensity={palette.sunIntensity}
        color={palette.sunColor}
        castShadow={quality !== "low"}
      />
      <CloudLayer count={clouds} opacity={palette.cloudOpacity} />
      <StarField count={stars} opacity={palette.starOpacity} />
    </group>
  );
}
